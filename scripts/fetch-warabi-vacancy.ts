/**
 * 蕨市の保育園の空き状況を取り込む
 *
 * 実行: npm run vacancy:fetch:warabi
 *
 * ## この自治体の特徴
 * - 空きを人数で公表している。**空き0人は「×」と書かれる**ので、
 *   空らんは0人ではなくその年齢のクラスがないことを表す
 * - 表が2つ。「認可保育園」（0〜5歳）と「小規模保育園」（0〜2歳）で、
 *   表の左上のセルがそのまま区分の名前になっている
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "warabi";
const MUNICIPALITY_NAME = "蕨市";
const SOURCE_NAME = "蕨市「保育園入園受付後の保育園空き状況」";
const INDEX_URL = "https://www.city.warabi.saitama.jp/kosodate/hoiku/hoikuen/1005483.html";
const AGE_COUNT = 6;
const MIN_FACILITIES = 20;
const UA = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const EXTRACTOR = path.join(process.cwd(), "scripts", "warabi-pdf-extract.py");

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

type PdfResult = {
  target: [number, number];
  asOf: [number, number, number];
  closedMark: string;
  notes: string[];
  closed: number;
  blanks: number;
  groups: { kind: string; rows: { name: string; counts: (number | null)[] }[] }[];
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
    .filter((l) => /保育園空き状況/.test(l.text));
  if (links.length === 0) fail("空き状況のPDFが見つかりません");
  const link = links[0];
  console.log(`PDF: ${link.text}\n  ${link.url}`);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "warabi-vacancy-"));
  try {
    const r = await fetch(link.url, { headers: { "User-Agent": UA } });
    if (!r.ok) fail(`PDFの取得に失敗しました（${r.status}）: ${link.url}`);
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.subarray(0, 4).toString() !== "%PDF") fail(`PDFではありません: ${link.url}`);
    const file = path.join(tmpDir, "warabi.pdf");
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
    // 公式ページの題にも同じ時点が入っている（「（8月1日時点）」）
    const pageDate = /[（(](\d+)月(\d+)日時点[）)]/.exec(toHalfWidth(squeeze(html)));
    if (pageDate && (Number(pageDate[1]) !== month || Number(pageDate[2]) !== day)) {
      fail(`公式ページの題（${pageDate[0]}）とPDFの中の日付（${asOf}）が違います`);
    }
    const targetLabel = `${reiwaToYear(pdf.target[0])}年${pdf.target[1]}月`;
    console.log(`時点: ${asOf} ／ 対象: ${targetLabel}の利用調整後`);

    const categories: string[] = [];
    const facilities: {
      id: string;
      name: string;
      w: null;
      c: number;
      vacancy: (number | null)[];
    }[] = [];
    const seen = new Set<string>();
    const sums = new Array(AGE_COUNT).fill(0);
    let notOffered = 0;

    for (const group of pdf.groups) {
      const kind = squeeze(group.kind);
      if (!kind) fail("区分の名前が空です");
      let c = categories.indexOf(kind);
      if (c < 0) {
        categories.push(kind);
        c = categories.length - 1;
      }

      for (const row of group.rows) {
        const name = squeeze(row.name);
        if (!name) fail(`${kind}: 施設名が空の行があります`);
        if (seen.has(name)) fail(`施設名が重複しています: ${name}`);
        seen.add(name);

        const counts = row.counts;
        if (counts.length !== AGE_COUNT) fail(`${name}: 年齢の欄が${counts.length}個です`);
        for (let age = 0; age < AGE_COUNT; age++) {
          const v = counts[age];
          if (v === null) {
            notOffered += 1;
            continue;
          }
          if (!Number.isInteger(v) || v < 0 || v > 99) {
            fail(`${name}: ${age}歳の人数が想定の範囲外です（${v}）`);
          }
          sums[age] += v;
        }

        facilities.push({ id: name, name, w: null, c, vacancy: counts });
      }
    }

    if (facilities.length < MIN_FACILITIES) {
      fail(`施設が${facilities.length}件しか取れていません（${MIN_FACILITIES}件以上のはず）`);
    }
    // 検算1: 「×」（空き0人）の数がPDFと合うか
    const zeros = facilities.reduce(
      (a, f) => a + f.vacancy.filter((v) => v === 0).length,
      0,
    );
    if (zeros !== pdf.closed) {
      fail(`「${squeeze(pdf.closedMark)}」の数が合いません（PDF ${pdf.closed} / 取り込み ${zeros}）`);
    }
    // 検算2: 空らんの数がPDFと合うか
    if (notOffered !== pdf.blanks) {
      fail(`空らんの数が合いません（PDF ${pdf.blanks} / 取り込み ${notOffered}）`);
    }
    // 検算3: 欄の数が施設数×年齢数になるか
    const cells = facilities.reduce((a, f) => a + f.vacancy.length, 0);
    if (cells !== facilities.length * AGE_COUNT) {
      fail(`欄の数が合いません（${cells} / 施設${facilities.length}×${AGE_COUNT}）`);
    }
    const openSum = sums.reduce((a: number, b: number) => a + b, 0);
    if (openSum === 0) fail("空き人数がひとつもありません（読み取りに失敗している可能性があります）");
    console.log(
      `${facilities.length}施設 ／ 空き${openSum}人・空き0人${zeros}欄・クラスなし${notOffered}欄`,
    );

    const previous = fs.existsSync(OUT_PATH)
      ? (JSON.parse(fs.readFileSync(OUT_PATH, "utf-8")) as { asOf?: string; facilities?: unknown[]; sourceFiles?: Record<string, string> })
      : null;
    if (previous?.facilities && facilities.length < previous.facilities.length * 0.9) {
      fail(`施設数が大きく減っています（前回 ${previous.facilities.length}件 → 今回 ${facilities.length}件）`);
    }
    // 自治体は基準日を変えずに資料を差し替えることがある。
    // 取り込み元のURLも同じときだけ、書き換えを見送る
    if (
      previous?.asOf === asOf &&
      previous?.sourceFiles?.vacancy === link.url &&
      JSON.stringify(previous?.facilities ?? null) === JSON.stringify(facilities)
    ) {
      console.log(`公式データの時点が前回と同じ（${asOf}）のため更新はありません。`);
      return;
    }

    const notes = [
      `${targetLabel}の利用調整を行った後の空き状況です。${asOf}時点のものです。`,
      `公式が「${squeeze(pdf.closedMark)}」（空き0人）としている年齢は0にしています。`,
      `公式の表で空らんになっている年齢は「—」にしています。空きが0人なら「${squeeze(pdf.closedMark)}」と書かれるので、空らんはその年齢のクラスがないことを表します。`,
      ...pdf.notes.map((n) => squeeze(n)),
    ];

    const dataset = {
      municipalitySlug: MUNICIPALITY_SLUG,
      municipalityName: MUNICIPALITY_NAME,
      asOf,
      fetchedAt: todayJst(),
      sourceName: SOURCE_NAME,
      sourceUrl: INDEX_URL,
      sourceFiles: { vacancy: link.url },
      metrics: ["vacancy"],
      subtitle: `${targetLabel}の利用調整後の空き状況`,
      notes,
      wards: [] as string[],
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
    console.log(`  ${facilities.length}施設 / ${categories.join("・")}`);
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

main().catch((err) => fail(String(err)));
