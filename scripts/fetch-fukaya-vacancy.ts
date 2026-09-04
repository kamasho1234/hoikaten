/**
 * 深谷市の保育施設の受入可能人数を取り込む
 *
 * 実行: npm run vacancy:fetch:fukaya
 *
 * ## この自治体の特徴
 * - 空きが人数で載っていて、行ごとに合計も入っているので検算に使える
 * - 区分は縦書きの縦結合。「認定こども園」のように2列に分けて書いてある枠がある
 * - 基準日はPDFに書かれていないので、ページの更新日を使う
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "fukaya";
const MUNICIPALITY_NAME = "深谷市";
const SOURCE_NAME = "深谷市「保育施設児童受入可能人数」";
const INDEX_URL =
  "https://www.city.fukaya.saitama.jp/soshiki/kodomomirai/hoiku/tanto/oshirase/1428297146855.html";
const AGE_COUNT = 6;
const UA = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";

const COL_DIVISION = 0;
const COL_NAME = 1;
const COL_AGE0 = 2;
const COL_TOTAL = 8;

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const EXTRACTOR = path.join(process.cwd(), "scripts", "fukaya-pdf-extract.py");

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
  return (s ?? "").replace(/<[^>]+>/g, "").replace(/[\s　]/g, "");
}

type PdfResult = {
  target: [number, number];
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
  console.log(`${MUNICIPALITY_NAME}の受入可能人数を取り込みます`);
  console.log(`公式ページ: ${INDEX_URL}\n`);

  const res = await fetch(INDEX_URL, { headers: { "User-Agent": UA } });
  if (!res.ok) fail(`公式ページが ${res.status} を返しました`);
  const html = await res.text();
  const flat = toHalfWidth(squeeze(html.replace(/<[^>]+>/g, "\n")));

  // ページの見出しは「令和8年9月入園保育施設児童受入可能人数」
  const titleMatch = flat.match(/令和(\d+)年(\d+)月入園保育施設児童受入可能人数/);
  if (!titleMatch) fail("ページの見出しから対象月を読み取れませんでした");
  const [titleReiwa, titleMonth] = titleMatch.slice(1, 3).map(Number);

  const pdfs = [...html.matchAll(/<a[^>]+href="([^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => ({ url: new URL(m[1], INDEX_URL).toString(), text: toHalfWidth(squeeze(m[2])) }))
    .filter((l) => /保育施設受入可能人数/.test(l.text));
  if (pdfs.length !== 1) fail(`受入可能人数のPDFが${pdfs.length}件見つかりました（1件のはず）`);
  const [pdfLink] = pdfs;
  console.log(`PDF: ${pdfLink.url}`);

  // 基準日がPDFに書かれていないので、ページの更新日を使う
  const updatedMatch = flat.match(/更新日：(\d{4})年(\d{1,2})月(\d{1,2})日/);
  if (!updatedMatch) fail("ページの更新日を読み取れませんでした");
  const [year, month, day] = updatedMatch.slice(1, 4).map(Number);
  const asOf = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  if (asOf > todayJst()) fail(`更新日（${asOf}）が今日より先になっています`);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "fukaya-vacancy-"));
  try {
    const r = await fetch(pdfLink.url, { headers: { "User-Agent": UA } });
    if (!r.ok) fail(`PDFの取得に失敗しました（${r.status}）: ${pdfLink.url}`);
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.subarray(0, 4).toString() !== "%PDF") fail(`PDFではありません: ${pdfLink.url}`);
    const file = path.join(tmpDir, "fukaya.pdf");
    fs.writeFileSync(file, buf);

    let pdf: PdfResult;
    try {
      pdf = JSON.parse(runPython([EXTRACTOR, file])) as PdfResult;
    } catch (err) {
      fail(`抽出結果を読めません: ${String(err)}`);
    }

    const [targetReiwa, targetMonth] = pdf.target;
    if (targetReiwa !== titleReiwa || targetMonth !== titleMonth) {
      fail(
        `PDFの表題（令和${targetReiwa}年${targetMonth}月）がページの見出し（令和${titleReiwa}年${titleMonth}月）と違います`
      );
    }
    console.log(`更新日: ${asOf} / 対象: ${targetMonth}月入園`);

    const categories: string[] = [];
    const facilities: {
      id: string;
      name: string;
      w: null;
      c: number;
      vacancy: (number | null)[];
    }[] = [];
    const seen = new Set<string>();
    let division = "";
    let total = 0;

    for (const row of pdf.rows) {
      const name = squeeze(row[COL_NAME]);
      if (!name) fail("施設名が空の行があります");
      if (seen.has(name)) fail(`施設名が重複しています: ${name}`);
      seen.add(name);

      // 区分は縦書きの縦結合。値のある行から次の値まで引き継ぐ
      const value = squeeze(row[COL_DIVISION]);
      if (value) division = value;
      if (!division) fail(`${name}: 区分が分かりません`);
      if (!categories.includes(division)) categories.push(division);

      const vacancy: (number | null)[] = [];
      for (let age = 0; age < AGE_COUNT; age++) {
        const raw = squeeze(row[COL_AGE0 + age] ?? "");
        const n = Number(raw);
        if (raw === "" || !Number.isInteger(n) || n < 0) {
          fail(`${name}: ${age}歳の欄を読めません: 「${raw}」`);
        }
        vacancy.push(n);
      }

      // 行ごとに合計が入っているので突き合わせる
      const sum = vacancy.reduce((acc: number, v) => acc + (v ?? 0), 0);
      const printed = Number(squeeze(row[COL_TOTAL] ?? ""));
      if (!Number.isInteger(printed) || sum !== printed) {
        fail(`${name}: 合計が合いません（PDFの印字 ${row[COL_TOTAL]} / 足し算 ${sum}）`);
      }
      total += sum;

      facilities.push({
        id: name,
        name,
        w: null,
        c: categories.indexOf(division),
        vacancy,
      });
    }

    if (facilities.length < 40) fail(`施設が${facilities.length}件しか取れていません`);
    console.log(`行ごとの合計はPDFの印字と一致しました（全体で${total}人）`);

    const previous = fs.existsSync(OUT_PATH)
      ? (JSON.parse(fs.readFileSync(OUT_PATH, "utf-8")) as { asOf?: string; facilities?: unknown[]; sourceFiles?: Record<string, string> })
      : null;
    if (previous?.facilities && facilities.length < previous.facilities.length * 0.9) {
      fail(
        `施設数が大きく減っています（前回 ${previous.facilities.length}件 → 今回 ${facilities.length}件）`
      );
    }
    // 自治体は基準日を変えずに資料を差し替えることがある。
    // 取り込み元のURLも同じときだけ、書き換えを見送る
    if (previous?.asOf === asOf && previous?.sourceFiles?.vacancy === pdfLink.url) {
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
      sourceFiles: { vacancy: pdfLink.url },
      metrics: ["vacancy"],
      subtitle: `${targetMonth}月入園の受入可能人数`,
      notes: [
        "人数は目安であり、事情により変更する場合があります。",
        "年度途中入園の受入可能人数は、入園希望月の前月5日に公表されます。",
      ],
      wards: [],
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
    console.log(`  ${facilities.length}施設 / ${categories.length}区分`);
    console.log(`  空きの合計: ${total}人`);
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

main().catch((err) => fail(String(err)));
