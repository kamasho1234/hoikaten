/**
 * 南城市の保育施設入所状況を取り込む
 *
 * 実行: npm run vacancy:fetch:nanjo
 *
 * ## この自治体の特徴
 * - **空き状況・入所人数・入所待ち人数**を人数で公表している（定員と受入可能人数も載る）
 * - 1施設が5行（定員・受入可能人数・入所人数・入所待ち人数・空き状況）
 * - 入所待ち人数は第1〜第4希望のいずれかにその施設を希望している人数なので、
 *   施設ごとに足すと市全体の合計より多くなる（園ごとの競争率としては読めない）
 * - 1号認定（教育のみ）の行は保育の空き状況ではないので落とす。
 *   PDFの合計も「大里こども園（1号）を除く」と書かれている
 * - 地域（佐敷・大里・玉城・知念など）で絞り込める
 * - 月ごとにPDFが積み上がるので、リンクの題「R8.8.1入所状況」から最新を選ぶ
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "nanjo";
const MUNICIPALITY_NAME = "南城市";
const SOURCE_NAME = "南城市「市内の教育・保育施設空き状況」";
const INDEX_URL =
  "https://www.city.nanjo.okinawa.jp/kosodate/hoiku/1579081520/1748407255/1768982268/";
const AGE_COUNT = 6;
const MIN_FACILITIES = 25;
const UA = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const EXTRACTOR = path.join(process.cwd(), "scripts", "nanjo-pdf-extract.py");

function fail(message: string): never {
  console.error(`\n[中断] ${message}`);
  process.exit(1);
}

function todayJst(): string {
  const jst = new Date(Date.now() + 9 * 60 * 60 * 1000);
  return jst.toISOString().slice(0, 10);
}

function squeeze(s: string): string {
  return (s ?? "").replace(/<[^>]+>/g, "").replace(/[\s　]/g, "");
}

function toHalfWidth(s: string): string {
  return s.replace(/[０-９]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xfee0));
}

function reiwaToYear(reiwa: number): number {
  return reiwa + 2018;
}

type Counts = (number | null)[];
type PdfResult = {
  asOf: [number, number, number];
  notes: string[];
  totals: Record<string, Counts>;
  rows: {
    kind: string;
    name: string;
    area: string;
    capacity: Counts;
    acceptable: Counts;
    enrolled: Counts;
    waiting: Counts;
    vacancy: Counts;
  }[];
};

function runPython(args: string[]): string {
  const candidates = process.env.PYTHON ? [process.env.PYTHON] : ["python3", "python"];
  let lastError = "";
  for (const bin of candidates) {
    try {
      return execFileSync(bin, args, { encoding: "utf-8", maxBuffer: 128 * 1024 * 1024 });
    } catch (err) {
      const e = err as { code?: string; stderr?: string; message?: string };
      if (e.code === "ENOENT") {
        lastError = `${bin} が見つかりません`;
        continue;
      }
      fail(`PDFの抽出に失敗しました（${bin}）: ${e.stderr || e.message}`);
    }
  }
  fail(`Pythonを実行できません（${lastError}）。pdfplumber が入った python が必要です。`);
}

async function main() {
  console.log(`${MUNICIPALITY_NAME}の空き状況を取り込みます`);
  console.log(`公式ページ: ${INDEX_URL}\n`);

  const res = await fetch(INDEX_URL, { headers: { "User-Agent": UA }, redirect: "follow" });
  if (!res.ok) fail(`公式ページが ${res.status} を返しました`);
  const html = await res.text();

  // リンクの題が「R8.8.1入所状況」
  const links = [...html.matchAll(/<a[^>]+href="([^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => ({
      url: new URL(m[1], res.url || INDEX_URL).toString(),
      text: toHalfWidth(squeeze(m[2])),
    }))
    .map((l) => {
      const m = /R(\d+)\.(\d+)\.(\d+)入所状況/.exec(l.text);
      return { ...l, key: m ? Number(m[1]) * 10000 + Number(m[2]) * 100 + Number(m[3]) : 0 };
    })
    .filter((l) => l.key > 0)
    .sort((a, b) => b.key - a.key);
  if (links.length === 0) fail("入所状況のPDFが見つかりません");
  const link = links[0];
  console.log(`PDF: ${link.text}\n  ${link.url}`);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "nanjo-vacancy-"));
  try {
    const r = await fetch(link.url, { headers: { "User-Agent": UA } });
    if (!r.ok) fail(`PDFの取得に失敗しました（${r.status}）: ${link.url}`);
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.subarray(0, 4).toString() !== "%PDF") fail(`PDFではありません: ${link.url}`);
    const file = path.join(tmpDir, "nanjo.pdf");
    fs.writeFileSync(file, buf);

    let pdf: PdfResult;
    try {
      pdf = JSON.parse(runPython([EXTRACTOR, file])) as PdfResult;
    } catch (err) {
      fail(`抽出結果を読めません: ${String(err)}`);
    }

    const [reiwa, month, day] = pdf.asOf;
    const asOf = `${reiwaToYear(reiwa)}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    if (!/^\d{4}-\d{2}-\d{2}$/.test(asOf)) fail(`時点の日付を組み立てられません: ${asOf}`);
    if (asOf > todayJst()) fail(`時点の日付（${asOf}）が今日より先になっています`);
    // リンクの題の日付とPDFの中の日付が合っているか
    if (link.key !== reiwa * 10000 + month * 100 + day) {
      fail(`リンクの題（${link.text}）とPDFの中の日付（${asOf}）が違います`);
    }
    console.log(`時点: ${asOf}`);

    const wards: string[] = [];
    const categories: string[] = [];
    const facilities: {
      id: string;
      name: string;
      w: number;
      c: number;
      vacancy: Counts;
      waiting: Counts;
      enrolled: Counts;
    }[] = [];
    const seen = new Set<string>();
    let vacancyTotal = 0;

    const excluded: string[] = [];
    for (const row of pdf.rows) {
      const name = squeeze(row.name);
      if (!name) fail("施設名が空の行があります");
      // 1号認定（教育のみ）の枠は保育の空き状況ではないので載せない。
      // PDFの合計も「大里こども園（1号）を除く」と書かれている
      if (/[（(]1号[）)]/.test(name)) {
        excluded.push(name);
        continue;
      }
      if (seen.has(name)) fail(`施設名が重複しています: ${name}`);
      seen.add(name);

      const area = squeeze(row.area);
      if (!area) fail(`${name}: 地域が空です`);
      let w = wards.indexOf(area);
      if (w < 0) {
        wards.push(area);
        w = wards.length - 1;
      }

      const kind = squeeze(row.kind);
      if (!kind) fail(`${name}: 区分が空です`);
      let c = categories.indexOf(kind);
      if (c < 0) {
        categories.push(kind);
        c = categories.length - 1;
      }

      for (const [label, counts] of [
        ["空き状況", row.vacancy],
        ["入所待ち人数", row.waiting],
        ["入所人数", row.enrolled],
      ] as [string, Counts][]) {
        if (counts.length !== AGE_COUNT) fail(`${name} ${label}: 年齢が${counts.length}個です`);
        for (const value of counts) {
          if (value === null) continue;
          if (!Number.isInteger(value) || value < 0 || value > 999) {
            fail(`${name} ${label}: 人数が想定の範囲にありません（${value}）`);
          }
        }
      }
      vacancyTotal += row.vacancy.reduce((a: number, b) => a + (b ?? 0), 0);

      facilities.push({
        id: name,
        name,
        w,
        c,
        vacancy: row.vacancy,
        waiting: row.waiting,
        enrolled: row.enrolled,
      });
    }

    if (facilities.length < MIN_FACILITIES) {
      fail(`施設が${facilities.length}件しか取れていません（${MIN_FACILITIES}件以上のはず）`);
    }

    // 検算: 空き状況と入所人数は、施設ごとの合計がPDFの合計行と合うはず。
    // 入所待ち人数は第1〜第4希望で重複して数えられているので合わない
    for (const [key, pick] of [
      ["空き状況", (f: (typeof facilities)[number]) => f.vacancy],
      ["入所人数", (f: (typeof facilities)[number]) => f.enrolled],
    ] as [string, (f: (typeof facilities)[number]) => Counts][]) {
      const expected = pdf.totals[key];
      if (!expected) fail(`合計の行に「${key}」がありません`);
      for (let age = 0; age < AGE_COUNT; age++) {
        const sum = facilities.reduce((acc, f) => acc + (pick(f)[age] ?? 0), 0);
        if (sum !== (expected[age] ?? 0)) {
          fail(`${key}の${age}歳児が合計と合いません（合計 ${expected[age]} / 取り込み ${sum}）`);
        }
      }
    }
    const waitingSum = facilities.reduce(
      (acc, f) => acc + f.waiting.reduce((a: number, b) => a + (b ?? 0), 0),
      0
    );
    const waitingTotal = (pdf.totals["入所待ち人数"] ?? []).reduce(
      (a: number, b) => a + (b ?? 0),
      0
    );
    if (waitingSum < waitingTotal) {
      fail(
        `入所待ち人数の合計（${waitingSum}）が市全体の数（${waitingTotal}）より少なくなっています`
      );
    }
    console.log(
      `空き状況と入所人数がPDFの合計行と一致しました（${facilities.length}施設 / 空き ${vacancyTotal}人）`
    );

    const previous = fs.existsSync(OUT_PATH)
      ? (JSON.parse(fs.readFileSync(OUT_PATH, "utf-8")) as { asOf?: string; facilities?: unknown[]; sourceFiles?: Record<string, string> })
      : null;
    if (previous?.facilities && facilities.length < previous.facilities.length * 0.9) {
      fail(`施設数が大きく減っています（前回 ${previous.facilities.length}件 → 今回 ${facilities.length}件）`);
    }
    // 自治体は基準日を変えずに資料を差し替えることがある。
    // 取り込み元のURLも同じときだけ、書き換えを見送る
    if (previous?.asOf === asOf && previous?.sourceFiles?.vacancy === link.url) {
      console.log(`公式データの時点が前回と同じ（${asOf}）のため更新はありません。`);
      return;
    }

    const notes = [
      `南城市が公開しているのは${asOf}時点の入所状況です。空き状況のほか、入所人数と入所待ち人数も載っています。`,
      ...pdf.notes,
      ...(excluded.length
        ? [
            `公式の表には1号認定（教育のみ）の枠も載っていますが（${excluded.join("、")}）、保育の空き状況ではないため当サイトには載せていません。公式の合計も1号認定を除いた数です。`,
          ]
        : []),
      "公式の表で空らんになっている年齢は「—」にしています。その年齢のクラスがないことを表しています。",
    ];

    const dataset = {
      municipalitySlug: MUNICIPALITY_SLUG,
      municipalityName: MUNICIPALITY_NAME,
      prefecture: "沖縄県",
      asOf,
      fetchedAt: todayJst(),
      sourceName: SOURCE_NAME,
      sourceUrl: INDEX_URL,
      sourceFiles: { vacancy: link.url },
      metrics: ["vacancy", "waiting", "enrolled"],
      subtitle: "市内の教育・保育施設の空き状況",
      waitingCaveat:
        "入所待ち人数は、第1希望から第4希望のいずれかにその施設を希望している人数です。ひとりが複数の施設に数えられるので、園ごとの競争率としては読めません。",
      notes,
      wards,
      categories,
      facilities,
    };

    const { facilities: _f, ...meta } = dataset;
    const metaJson = JSON.stringify(meta, null, 2);
    const metaHead = metaJson.slice(0, metaJson.lastIndexOf("}")).trimEnd();
    const bodyJson = facilities.map((f) => `    ${JSON.stringify(f)}`).join(",\n");
    const out = `${metaHead},\n  "facilities": [\n${bodyJson}\n  ]\n}\n`;
    try {
      JSON.parse(out);
    } catch (err) {
      fail(`生成したJSONが不正です: ${String(err)}`);
    }
    fs.mkdirSync(path.dirname(OUT_PATH), { recursive: true });
    fs.writeFileSync(OUT_PATH, out, "utf-8");

    console.log(`書き出しました: ${path.relative(process.cwd(), OUT_PATH)}`);
    console.log(`  ${facilities.length}施設 / ${wards.join("・")}`);
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

main().catch((err) => fail(String(err)));
