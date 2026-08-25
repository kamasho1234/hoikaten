/**
 * 土浦市の保育施設 受入見込児童数を取り込む
 *
 * 実行: npm run vacancy:fetch:tsuchiura
 *
 * ## この自治体の特徴
 * - 人数（受入見込児童数）で公表している。0人でも申込みはできる
 * - 1ページに区分ごとの小さな表がタイル状に並ぶ（公立保育所／私立保育所／
 *   認定こども園／地域型保育／企業主導型）
 * - **企業主導型は「直接各施設にお申込みください」とあり市の入所調整の対象外**なので
 *   取り込まず、件数だけ注記に書く
 * - クラスのない年齢の欄に注記の文が重ねて印字されている箇所がある
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "tsuchiura";
const MUNICIPALITY_NAME = "土浦市";
const SOURCE_NAME = "土浦市「保育施設空き状況」";
const INDEX_URL =
  "https://www.city.tsuchiura.lg.jp/kosodate-kyoiku/hoiku-gakko/yochien-kodomoen-hoikuen/hoikujo/page006565.html";
const AGE_COUNT = 6;
const MIN_FACILITIES = 40;
const UA = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const EXTRACTOR = path.join(process.cwd(), "scripts", "tsuchiura-pdf-extract.py");

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
  asOf: [number, number, number];
  target: [number, number];
  notes: string[];
  overlaidNotes: string[];
  skipped: number;
  printedNumbers: number;
  groups: { heading: string; rows: { name: string; kind: string; counts: (number | null)[] }[] }[];
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
    .filter((l) => l.text.includes("保育施設空き状況"));
  if (links.length === 0) fail("保育施設空き状況のPDFが見つかりません");
  // 同じPDFが2か所から貼られているので、URLで重複を除く
  const urls = [...new Set(links.map((l) => l.url))];
  if (urls.length !== 1) fail(`空き状況のPDFが${urls.length}種類あります（1種類のはず）`);
  const link = { url: urls[0], text: links[0].text };
  console.log(`PDF: ${link.text}\n  ${link.url}`);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "tsuchiura-vacancy-"));
  try {
    const r = await fetch(link.url, { headers: { "User-Agent": UA } });
    if (!r.ok) fail(`PDFの取得に失敗しました（${r.status}）: ${link.url}`);
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.subarray(0, 4).toString() !== "%PDF") fail(`PDFではありません: ${link.url}`);
    const file = path.join(tmpDir, "tsuchiura.pdf");
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
    const targetLabel = `${reiwaToYear(pdf.target[0])}年${pdf.target[1]}月`;
    console.log(`時点: ${asOf} ／ 対象: ${targetLabel}入所`);

    const categories: string[] = [];
    const facilities: {
      id: string;
      name: string;
      w: null;
      c: number;
      vacancy: (number | null)[];
    }[] = [];
    const seen = new Set<string>();
    let numbers = 0;
    let blanks = 0;
    let vacancyTotal = 0;

    for (const group of pdf.groups) {
      // 「認定こども園(教育認定は、園に直接お問い合わせください。)」のような但し書きを落とす
      const kind = squeeze(group.heading).replace(/[（(].*$/, "");
      if (!kind) fail(`区分の名前が空です（「${group.heading}」）`);
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

        const vacancy: (number | null)[] = [];
        for (let age = 0; age < AGE_COUNT; age++) {
          const value = row.counts[age];
          if (value === null || value === undefined) {
            blanks += 1;
            vacancy.push(null);
            continue;
          }
          if (!Number.isInteger(value) || value < 0 || value > 99) {
            fail(`${name}: ${age}歳の人数が想定の範囲にありません（${value}）`);
          }
          numbers += 1;
          vacancyTotal += value;
          vacancy.push(value);
        }

        facilities.push({ id: name, name, w: null, c, vacancy });
      }
    }

    if (facilities.length < MIN_FACILITIES) {
      fail(`施設が${facilities.length}件しか取れていません（${MIN_FACILITIES}件以上のはず）`);
    }

    // 検算1: 取り込んだ数値の個数が、PDFの年齢欄に印字されている数字の個数と合うか
    if (numbers !== pdf.printedNumbers) {
      fail(`数値の個数が合いません（PDFの印字 ${pdf.printedNumbers}個 / 取り込み ${numbers}個）`);
    }
    // 検算2: 数値と空らんの合計が施設数×年齢数になるか
    if (numbers + blanks !== facilities.length * AGE_COUNT) {
      fail(`欄の数が合いません（数値${numbers}＋空らん${blanks} / 施設${facilities.length}×${AGE_COUNT}）`);
    }
    console.log(
      `数値の個数はPDFの印字と一致し、欄の数も施設数×年齢数と合いました（合計${vacancyTotal}人）`
    );

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
      `土浦市が公開しているのは${targetLabel}入所用の受入見込児童数で、${asOf}時点のものです。`,
      ...pdf.notes,
      ...(pdf.overlaidNotes.length ? [squeeze(pdf.overlaidNotes.join(""))] : []),
      "公式の表で空らんになっている年齢は「—」にしています。その年齢のクラスがないことを表しています。",
      ...(pdf.skipped
        ? [
            `公式の表には企業主導型保育施設${pdf.skipped}か所も載っていますが、市の入所調整の対象外で申込みは各施設へ直接行うため、ここには載せていません。`,
          ]
        : []),
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
      subtitle: `${targetLabel}入所用の受入見込人数`,
      notes,
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
    console.log(`  ${facilities.length}施設 / ${categories.join("・")} / 空らん ${blanks}`);
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

main().catch((err) => fail(String(err)));
