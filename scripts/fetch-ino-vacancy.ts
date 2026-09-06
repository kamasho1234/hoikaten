/**
 * いの町の保育施設の空き状況を取り込む
 *
 * 実行: npm run vacancy:fetch:ino
 *
 * ## この自治体の特徴
 * - 空き状況は町の子育てサイト「いの町子育てパーフェクトページ」でPDFとして出している。
 *   そのページの文字コードは Shift_JIS
 * - PDFに罫線が1本も無く、列は文字の位置だけで決まる（Python側で座標から読む）
 * - 値は人数か「若干名」。「若干名」は人数が分からないので、数ではなく記号として持つ
 * - 斜線（何も書かれていないセル）は受入なし、「×」は空きなし
 * - 地域型保育事業所は「0歳児〜2歳児」を1つにまとめて出しているので、
 *   年齢別に割らず合計（vacancyTotal）として持つ
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "ino";
const MUNICIPALITY_NAME = "いの町";
const PREFECTURE = "高知県";
const SOURCE_NAME = "いの町「保育施設空き状況」（いの町子育てパーフェクトページ）";
const INDEX_URL = "https://www.town.ino.kochi.jp/sukoyaka/hoiku_situation.html";
const AGE_COUNT = 6;
const UA = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";

const AGE_LABELS = ["0歳児", "1歳児", "2歳児", "3歳児", "4歳児", "5歳児"];
const MERGED_LABEL = "0歳児〜2歳児";

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const EXTRACTOR = path.join(process.cwd(), "scripts", "ino-pdf-extract.py");

function fail(message: string): never {
  console.error(`\n[中断] ${message}`);
  process.exit(1);
}

function todayJst(): string {
  const jst = new Date(Date.now() + 9 * 60 * 60 * 1000);
  return jst.toISOString().slice(0, 10);
}

type PdfResult = {
  asOf: [number, number, number];
  forMonth: [number, number] | null;
  rows: { category: string; name: string; values: Record<string, string> }[];
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
  // このページは Shift_JIS
  const html = new TextDecoder("shift_jis").decode(await res.arrayBuffer());

  const pdfs = [...html.matchAll(/<a[^>]+href="([^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => ({
      url: new URL(m[1], INDEX_URL).toString(),
      text: m[2].replace(/<[^>]+>/g, "").replace(/[\s　]/g, ""),
    }))
    .filter((l) => /保育施設空き状況/.test(l.text));
  if (pdfs.length !== 1) fail(`空き状況のPDFが${pdfs.length}件見つかりました（1件のはず）`);
  const [pdfLink] = pdfs;
  console.log(`PDF: ${pdfLink.url}`);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "ino-vacancy-"));
  try {
    const r = await fetch(pdfLink.url, { headers: { "User-Agent": UA } });
    if (!r.ok) fail(`PDFの取得に失敗しました（${r.status}）: ${pdfLink.url}`);
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.subarray(0, 4).toString() !== "%PDF") fail(`PDFではありません: ${pdfLink.url}`);
    const file = path.join(tmpDir, "ino.pdf");
    fs.writeFileSync(file, buf);

    let pdf: PdfResult;
    try {
      pdf = JSON.parse(runPython([EXTRACTOR, file])) as PdfResult;
    } catch (err) {
      fail(`抽出結果を読めません: ${String(err)}`);
    }

    const [reiwa, month, day] = pdf.asOf;
    const asOf = `${2018 + reiwa}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    if (asOf > todayJst()) fail(`基準日（${asOf}）が今日より先になっています`);
    console.log(`基準日: ${asOf}`);
    const forMonth = pdf.forMonth ? `令和${pdf.forMonth[0]}年${pdf.forMonth[1]}月入園ぶん` : null;

    const symbolLegend = [
      { mark: "若干名", label: "若干名の空きあり（人数は町が公表していません）", open: true },
      { mark: "×", label: "空きなし", open: false },
    ];

    const categories: string[] = [];
    const facilities: {
      id: string;
      name: string;
      w: null;
      c: number;
      vacancy: (number | null)[];
      symbols?: (string | null)[];
      vacancyTotal?: number;
      note?: string;
    }[] = [];
    const seen = new Set<string>();

    for (const row of pdf.rows) {
      if (seen.has(row.name)) fail(`施設名が重複しています: ${row.name}`);
      seen.add(row.name);
      if (!categories.includes(row.category)) categories.push(row.category);

      const vacancy: (number | null)[] = new Array(AGE_COUNT).fill(null);
      const symbols: (string | null)[] = new Array(AGE_COUNT).fill(null);
      let total: number | undefined;
      let note: string | undefined;

      for (const [label, raw] of Object.entries(row.values)) {
        if (label === MERGED_LABEL) {
          // 地域型保育事業所は0〜2歳をまとめて出している
          if (/^\d+$/.test(raw)) {
            total = Number(raw);
            note = `町は0歳児から2歳児をまとめて${total}人の空きとして公表しています。年齢別の内訳はありません。`;
          } else if (raw === "若干名") {
            note = "町は0歳児から2歳児をまとめて「若干名」の空きとして公表しています。";
          } else if (raw === "×") {
            note = "町は0歳児から2歳児をまとめて「空きなし」として公表しています。";
          } else {
            fail(`${row.name}: 読めない値です「${raw}」`);
          }
          continue;
        }
        const age = AGE_LABELS.indexOf(label);
        if (age < 0) fail(`${row.name}: 知らない年齢の見出しです「${label}」`);
        if (/^\d+$/.test(raw)) {
          vacancy[age] = Number(raw);
        } else if (raw === "若干名" || raw === "×") {
          symbols[age] = raw;
        } else {
          fail(`${row.name}: 読めない値です「${raw}」`);
        }
      }

      facilities.push({
        id: row.name,
        name: row.name,
        w: null,
        c: categories.indexOf(row.category),
        vacancy,
        // この自治体は「若干名」を記号として持つので、
        // 記号が1つも無い施設でも symbols の枠は持たせる（検算の決まりに合わせる）
        symbols,
        ...(total !== undefined ? { vacancyTotal: total } : {}),
        ...(note ? { note } : {}),
      });
    }

    if (facilities.length < 8) fail(`施設が${facilities.length}件しか取れていません`);
    console.log(`施設 ${facilities.length}件 / ${categories.length}類型`);

    const previous = fs.existsSync(OUT_PATH)
      ? (JSON.parse(fs.readFileSync(OUT_PATH, "utf-8")) as {
          asOf?: string;
          facilities?: unknown[];
          sourceFiles?: Record<string, string>;
        })
      : null;
    if (previous?.facilities && facilities.length < previous.facilities.length * 0.9) {
      fail(
        `施設数が大きく減っています（前回 ${previous.facilities.length}件 → 今回 ${facilities.length}件）`
      );
    }
    if (
      previous?.asOf === asOf &&
      previous?.sourceFiles?.vacancy === pdfLink.url &&
      JSON.stringify(previous?.facilities ?? null) === JSON.stringify(facilities)
    ) {
      console.log(`公式データの時点が前回と同じ（${asOf}）のため更新はありません。`);
      return;
    }

    const dataset = {
      municipalitySlug: MUNICIPALITY_SLUG,
      municipalityName: MUNICIPALITY_NAME,
      prefecture: PREFECTURE,
      asOf,
      fetchedAt: todayJst(),
      sourceName: SOURCE_NAME,
      sourceUrl: INDEX_URL,
      sourceFiles: { vacancy: pdfLink.url },
      metrics: ["vacancy", "symbol"],
      subtitle: forMonth ? `${forMonth}の年度途中入園の空き状況` : "年度途中入園の空き状況",
      notes: [
        "町は空き数を人数で出していますが、人数の代わりに「若干名」と書かれているクラスがあります。人数が分からないので、そこは「若干名」のまま載せています。",
        "町の表で斜線が引かれているクラス（何も書かれていないクラス）は「—」にしています。受入がないことを表します。",
        "町は「×となっているクラスでも、在園児童の転園等により入園可能となることがあります」としています。",
        "町は「現在空きのあるクラスでも、申込状況等により入園できない場合があります」「児童の状況や、職員の配置状況により募集ができなくなることがあります」としています。",
        "町は「申込書の利用希望園は、空き状況にかかわらずご記入いただいて差し支えありません」としています。",
        "地域型保育事業所は0歳児から2歳児をまとめて公表しているため、年齢別の内訳はありません。",
        "この表は町の子育てサイト「いの町子育てパーフェクトページ」で公開されています。",
      ],
      wards: [],
      categories,
      symbolLegend,
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
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

main().catch((err) => fail(String(err)));
