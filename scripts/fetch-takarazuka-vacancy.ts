/**
 * 宝塚市の認可保育施設の空き状況を取り込む
 *
 * 実行: npm run vacancy:fetch:takarazuka
 *
 * ## この自治体の特徴
 * - 空きが人数で載っていて、「－」はそのクラスを設けていない
 * - 行ごとの「保育所計」と、いちばん下の「年齢計」の両方があるので、
 *   縦と横の両方で突き合わせて検算できる
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "takarazuka";
const MUNICIPALITY_NAME = "宝塚市";
const SOURCE_NAME = "宝塚市「各認可保育施設の空き状況」";
const INDEX_URL =
  "https://www.city.takarazuka.hyogo.jp/1060680/1060698/1061552/1061560/gakkoshisetsu/1000105/1027922/index.html";
const AGE_COUNT = 6;
const UA = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";

const COL_NAME = 0;
const COL_AGE0 = 1;
const COL_TOTAL = 7;
const NO_CLASS = "－";

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const EXTRACTOR = path.join(process.cwd(), "scripts", "takarazuka-pdf-extract.py");

function fail(message: string): never {
  console.error(`\n[中断] ${message}`);
  process.exit(1);
}

function todayJst(): string {
  const jst = new Date(Date.now() + 9 * 60 * 60 * 1000);
  return jst.toISOString().slice(0, 10);
}

function toHalfWidth(s: string): string {
  return s.replace(/[０-９]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xfee0));
}

function squeeze(s: string): string {
  return (s ?? "").replace(/[\s　]/g, "");
}

function stripTags(html: string): string {
  return html.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").replace(/[\s　]+/g, " ").trim();
}

/** 「－」は null、数字はその数 */
function parseCount(raw: string, where: string): number | null {
  const text = squeeze(raw);
  if (text === "" || /^[－\-‐‑–—ー]$/.test(text)) return null;
  const n = Number(toHalfWidth(text));
  if (!Number.isInteger(n) || n < 0) fail(`${where}を読めません: 「${raw}」`);
  return n;
}

type PdfResult = {
  asOf: [number, number, number];
  totalRow: string[];
  rows: string[][];
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

  const res = await fetch(INDEX_URL, { headers: { "User-Agent": UA } });
  if (!res.ok) fail(`公式ページが ${res.status} を返しました`);
  const html = await res.text();

  // 「各認可保育施設の空き状況 （PDF 148.9 KB）」。指定保育所ぶんの一覧とは分ける
  const links = [...html.matchAll(/<a[^>]+href="([^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => ({ url: new URL(m[1], INDEX_URL).toString(), text: squeeze(stripTags(m[2])) }))
    .filter((l) => l.text.startsWith("各認可保育施設の空き状況"));
  if (links.length === 0) fail("空き状況のPDFが見つかりません。ページの構成が変わった可能性があります。");
  if (links.length > 1) fail(`空き状況のPDFが${links.length}件見つかりました。どれが最新か決められません。`);
  const latest = links[0];
  console.log(`最新: ${latest.text}\n  ${latest.url}`);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "takarazuka-vacancy-"));
  try {
    const r = await fetch(latest.url, { headers: { "User-Agent": UA } });
    if (!r.ok) fail(`PDFの取得に失敗しました（${r.status}）: ${latest.url}`);
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.subarray(0, 4).toString() !== "%PDF") fail(`PDFではありません: ${latest.url}`);
    const file = path.join(tmpDir, "takarazuka.pdf");
    fs.writeFileSync(file, buf);

    let pdf: PdfResult;
    try {
      pdf = JSON.parse(runPython([EXTRACTOR, file])) as PdfResult;
    } catch (err) {
      fail(`抽出結果を読めません: ${String(err)}`);
    }

    const [ay, am, ad] = pdf.asOf;
    const asOf = `${2018 + ay}-${String(am).padStart(2, "0")}-${String(ad).padStart(2, "0")}`;
    if (asOf > todayJst()) fail(`基準日（${asOf}）が今日より先になっています`);
    console.log(`基準日: ${asOf}`);

    const facilities: { id: string; name: string; w: null; vacancy: (number | null)[] }[] = [];
    const seen = new Set<string>();
    const byAge = new Array(AGE_COUNT).fill(0);
    let noClass = 0;
    let total = 0;

    for (const row of pdf.rows) {
      const name = squeeze(row[COL_NAME]);
      if (!name) fail("施設名が空の行があります");
      if (seen.has(name)) fail(`施設名が重複しています: ${name}`);
      seen.add(name);

      const vacancy: (number | null)[] = [];
      let sum = 0;
      for (let age = 0; age < AGE_COUNT; age++) {
        const value = parseCount(row[COL_AGE0 + age] ?? "", `${name}の${age}歳の欄`);
        if (value === null) {
          noClass += 1;
          vacancy.push(null);
          continue;
        }
        sum += value;
        byAge[age] += value;
        vacancy.push(value);
      }
      if (vacancy.every((v) => v === null)) fail(`${name}: 全てのクラスが「${NO_CLASS}」です`);

      // 行の「保育所計」と歳児の合計が合うか
      const printed = parseCount(row[COL_TOTAL] ?? "", `${name}の保育所計`);
      if (printed === null) fail(`${name}: 保育所計が空です`);
      if (printed !== sum) {
        fail(`${name}: 保育所計が合いません（公式 ${printed} / 歳児の合計 ${sum}）`);
      }
      total += sum;

      facilities.push({ id: name, name, w: null, vacancy });
    }

    if (facilities.length < 30) fail(`施設が${facilities.length}件しか取れていません`);
    // いちばん下の「年齢計」と、歳児ごとの合計が合うか
    for (let age = 0; age < AGE_COUNT; age++) {
      const printed = parseCount(pdf.totalRow[COL_AGE0 + age] ?? "", `年齢計の${age}歳`);
      if (printed !== byAge[age]) {
        fail(`${age}歳の年齢計が合いません（公式 ${printed} / 取り込み ${byAge[age]}）`);
      }
    }
    const printedTotal = parseCount(pdf.totalRow[COL_TOTAL] ?? "", "年齢計の保育所計");
    if (printedTotal !== total) {
      fail(`全体の合計が合いません（公式 ${printedTotal} / 取り込み ${total}）`);
    }
    console.log(`行ごとの「保育所計」と「年齢計」の両方が一致しました（全体で${total}）`);

    const previous = fs.existsSync(OUT_PATH)
      ? (JSON.parse(fs.readFileSync(OUT_PATH, "utf-8")) as { asOf?: string; facilities?: unknown[] })
      : null;
    if (previous?.facilities && facilities.length < previous.facilities.length * 0.9) {
      fail(
        `施設数が大きく減っています（前回 ${previous.facilities.length}件 → 今回 ${facilities.length}件）`
      );
    }
    if (previous?.asOf === asOf) {
      console.log(`公式データの時点が前回と同じ（${asOf}）のため更新はありません。`);
      return;
    }

    const dataset = {
      municipalitySlug: MUNICIPALITY_SLUG,
      municipalityName: MUNICIPALITY_NAME,
      asOf,
      fetchedAt: todayJst(),
      sourceName: SOURCE_NAME,
      sourceUrl: INDEX_URL,
      sourceFiles: { vacancy: latest.url },
      metrics: ["vacancy"],
      subtitle: "各認可保育施設の空き状況",
      notes: [
        "宝塚市が公表している認可保育施設の空き人数です。",
        "前月末の急な退所や内定のキャンセルにより、空きが出ている場合があります。",
        "年齢はその年度が始まる前（3月31日時点）の年齢で、4月1日時点のクラス年齢と同じです。",
        `公式の表で「${NO_CLASS}」となっているところは、そのクラスを設けていないという意味なので「—」にしています。`,
      ],
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
    console.log(`  ${facilities.length}施設 / 空きの合計 ${total}人`);
    console.log(`  設けていないクラス: ${noClass}`);
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

main().catch((err) => fail(String(err)));
