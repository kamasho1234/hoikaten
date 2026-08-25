/**
 * 白井市の保育所等空き状況を取り込む
 *
 * 実行: npm run vacancy:fetch:shiroi
 *
 * ## この自治体の特徴
 * - **在園児数・空き状況・保留者数の3つ**を人数で公表している
 * - 保留者数は第一希望の園で数えたもの。第二希望以降で保留になっている人は
 *   その園の数に入らないので、園ごとの競争率としては読めない
 * - 幼稚園の（再掲）行は別の施設の内訳なので取り込まない
 * - 「送迎ステーション」は園単位の枠を持たない拠点だが、
 *   年齢ごとの空き状況が示されているのでそのまま載せる
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "shiroi";
const MUNICIPALITY_NAME = "白井市";
const SOURCE_NAME = "白井市「保育所等空き状況」";
const INDEX_URL =
  "https://www.city.shiroi.chiba.jp/soshiki/kenko/hoikuka/jik028/jik032/1568677414193.html";
const AGE_COUNT = 6;
const MIN_FACILITIES = 10;
const UA = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const EXTRACTOR = path.join(process.cwd(), "scripts", "shiroi-pdf-extract.py");

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
  target: [number, number];
  notes: string[];
  totals: Record<string, Counts>;
  rows: { name: string; enrolled: Counts; vacancy: Counts; waiting: Counts }[];
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

  const links = [...html.matchAll(/<a[^>]+href="([^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => ({
      url: new URL(m[1], res.url || INDEX_URL).toString(),
      text: toHalfWidth(squeeze(m[2])),
    }))
    .filter((l) => l.text.includes("空き状況"));
  if (links.length !== 1) fail(`空き状況のPDFが${links.length}件あります（1件のはず）`);
  const link = links[0];
  console.log(`PDF: ${link.text}\n  ${link.url}`);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "shiroi-vacancy-"));
  try {
    const r = await fetch(link.url, { headers: { "User-Agent": UA } });
    if (!r.ok) fail(`PDFの取得に失敗しました（${r.status}）: ${link.url}`);
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.subarray(0, 4).toString() !== "%PDF") fail(`PDFではありません: ${link.url}`);
    const file = path.join(tmpDir, "shiroi.pdf");
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
    const targetLabel = `${reiwaToYear(pdf.target[0])}年度${pdf.target[1]}月`;
    console.log(`時点: ${asOf} ／ 対象: ${targetLabel}入所希望`);

    const facilities: {
      id: string;
      name: string;
      w: null;
      c: null;
      vacancy: Counts;
      waiting: Counts;
      enrolled: Counts;
    }[] = [];
    const seen = new Set<string>();
    let vacancyTotal = 0;

    for (const row of pdf.rows) {
      const name = squeeze(row.name);
      if (!name) fail("施設名が空の行があります");
      if (seen.has(name)) fail(`施設名が重複しています: ${name}`);
      seen.add(name);

      for (const [label, counts] of [
        ["在園児数", row.enrolled],
        ["空き状況", row.vacancy],
        ["保留者数", row.waiting],
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
        w: null,
        c: null,
        vacancy: row.vacancy,
        waiting: row.waiting,
        enrolled: row.enrolled,
      });
    }

    if (facilities.length < MIN_FACILITIES) {
      fail(`施設が${facilities.length}件しか取れていません（${MIN_FACILITIES}件以上のはず）`);
    }

    // 検算: 年齢ごとの合計がPDFの合計行と合うか（3つの指標すべて）
    for (const [kind, pick] of [
      ["在園児数", (f: (typeof facilities)[number]) => f.enrolled],
      ["空き状況", (f: (typeof facilities)[number]) => f.vacancy],
      ["保留者数", (f: (typeof facilities)[number]) => f.waiting],
    ] as [string, (f: (typeof facilities)[number]) => Counts][]) {
      const expected = pdf.totals[kind];
      if (!expected) fail(`合計の行に「${kind}」がありません`);
      for (let age = 0; age < AGE_COUNT; age++) {
        const sum = facilities.reduce((acc, f) => acc + (pick(f)[age] ?? 0), 0);
        if (sum !== expected[age]) {
          fail(`${kind}の${age}歳児が合計と合いません（合計 ${expected[age]} / 取り込み ${sum}）`);
        }
      }
    }
    console.log("在園児数・空き状況・保留者数のどれも、年齢ごとの合計がPDFの合計行と一致しました");

    const previous = fs.existsSync(OUT_PATH)
      ? (JSON.parse(fs.readFileSync(OUT_PATH, "utf-8")) as { asOf?: string; facilities?: unknown[] })
      : null;
    if (previous?.facilities && facilities.length < previous.facilities.length * 0.9) {
      fail(`施設数が大きく減っています（前回 ${previous.facilities.length}件 → 今回 ${facilities.length}件）`);
    }
    if (previous?.asOf === asOf) {
      console.log(`公式データの時点が前回と同じ（${asOf}）のため更新はありません。`);
      return;
    }

    const notes = [
      `白井市が公開しているのは${targetLabel}入所希望者向けの参考資料で、${asOf}時点のものです。在園児数・空き状況・保留者数の3つが載っています。`,
      ...pdf.notes,
      "「送迎ステーション」は園単位の枠を持たない拠点ですが、年齢ごとの空き状況が示されているのでそのまま載せています。",
    ];

    const dataset = {
      municipalitySlug: MUNICIPALITY_SLUG,
      municipalityName: MUNICIPALITY_NAME,
      asOf,
      fetchedAt: todayJst(),
      sourceName: SOURCE_NAME,
      sourceUrl: INDEX_URL,
      sourceFiles: { vacancy: link.url },
      metrics: ["vacancy", "waiting", "enrolled"],
      subtitle: `${targetLabel}入所希望者向けの空き状況`,
      waitingCaveat:
        "保留者数は第一希望の園で数えたものです。第二希望以降でその園を希望して保留になっている人は入っていないので、園ごとの競争率としては読めません。",
      notes,
      wards: [],
      categories: [],
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
    console.log(`  ${facilities.length}施設 / 空き ${vacancyTotal}人`);
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

main().catch((err) => fail(String(err)));
