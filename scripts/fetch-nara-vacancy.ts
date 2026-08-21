/**
 * 奈良市の保育所等の受入可能数を取り込む
 *
 * 実行: npm run vacancy:fetch:nara
 *
 * ## この自治体の特徴
 * - **空きは記号**（○＝4人以上、△＝1〜3人、×＝受入れなし）
 * - **1つのPDFに直近1年半ぶんが入っている**ので、表題の年月がいちばん新しいページを使う
 * - 凡例に説明のない「◎」がまれに出てくる。記号のまま載せるが、
 *   意味が分からないので空きありとしては数えない
 * - 施設名は1文字ずつ空きが入る（「都 南 保 育 園」）
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "nara";
const MUNICIPALITY_NAME = "奈良市";
const SOURCE_NAME = "奈良市「保育所等における受入可能数の結果」";
const INDEX_URL = "https://www.city.nara.lg.jp/site/kosodate/10822.html";
const PDF_URL = "https://www.city.nara.lg.jp/kosodate/ukeire/ukeire.pdf";
const AGE_COUNT = 6;
const UA = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";

/** 凡例にない記号。意味が公表されていないので、記号のまま載せて空きありには数えない */
const UNKNOWN_MARK = "◎";
const UNKNOWN_LABEL = "公式に説明のない記号";

const COL_KIND = 0;
const COL_NAME = 1;
const COL_ZERO = 2;

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const EXTRACTOR = path.join(process.cwd(), "scripts", "nara-pdf-extract.py");

function fail(message: string): never {
  console.error(`\n[中断] ${message}`);
  process.exit(1);
}

function todayJst(): string {
  const jst = new Date(Date.now() + 9 * 60 * 60 * 1000);
  return jst.toISOString().slice(0, 10);
}

function reiwaToYear(reiwa: number): number {
  return 2018 + reiwa;
}

function toHalfWidth(s: string): string {
  return s.replace(/[０-９]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xfee0));
}

function squeeze(s: string): string {
  return (s ?? "").replace(/[\s　]/g, "");
}

/** 凡例と表とで記号の字が違う（○と〇、×と✕）ので、比べるときだけそろえる */
function normalizeMark(mark: string): string {
  const t = squeeze(mark);
  if (/^[○◯〇]$/.test(t)) return "○";
  if (/^[△▲]$/.test(t)) return "△";
  if (/^[×✕✖ｘx]$/i.test(t)) return "×";
  if (t === UNKNOWN_MARK) return UNKNOWN_MARK;
  return t;
}

type PdfResult = {
  target: [number, number];
  pages: [number, number];
  legend: { mark: string; label: string }[];
  rows: string[][];
};

function runPython(args: string[]): string {
  const candidates = process.env.PYTHON ? [process.env.PYTHON] : ["python3", "python"];
  let lastError = "";
  for (const bin of candidates) {
    try {
      return execFileSync(bin, args, { encoding: "utf-8", maxBuffer: 64 * 1024 * 1024 });
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
  console.log(`${MUNICIPALITY_NAME}の受入可能数を取り込みます`);
  console.log(`公式ページ: ${INDEX_URL}\n`);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "nara-vacancy-"));
  try {
    const r = await fetch(PDF_URL, { headers: { "User-Agent": UA } });
    if (!r.ok) fail(`PDFの取得に失敗しました（${r.status}）: ${PDF_URL}`);
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.subarray(0, 4).toString() !== "%PDF") fail(`PDFではありません: ${PDF_URL}`);
    const file = path.join(tmpDir, "nara.pdf");
    fs.writeFileSync(file, buf);

    let pdf: PdfResult;
    try {
      pdf = JSON.parse(runPython([EXTRACTOR, file])) as PdfResult;
    } catch (err) {
      fail(`抽出結果を読めません: ${String(err)}`);
    }

    const [reiwa, month] = pdf.target;
    const year = reiwaToYear(reiwa);
    // 「令和8年8月分の受入可能数の結果」なので、その月の1日を時点として持つ
    const asOf = `${year}-${String(month).padStart(2, "0")}-01`;
    console.log(`対象: ${year}年${month}月分（PDFの${pdf.pages[0]}〜${pdf.pages[1]}ページ）`);

    const symbolLegend = pdf.legend.map((l) => ({
      mark: normalizeMark(l.mark),
      label: l.label.replace(/園です$/, "").replace(/[。、]+$/, ""),
      open: normalizeMark(l.mark) !== "×",
    }));
    // 空きの多い順に並べる
    const order = ["○", "△", "×"];
    symbolLegend.sort((a, b) => order.indexOf(a.mark) - order.indexOf(b.mark));
    if (symbolLegend.length < 3) fail(`記号の凡例が足りません: ${JSON.stringify(pdf.legend)}`);
    console.log(`凡例: ${symbolLegend.map((l) => `${l.mark}＝${l.label}`).join(" / ")}`);
    const knownMarks = new Set(symbolLegend.map((l) => l.mark));

    const categories: string[] = [];
    const facilities: {
      id: string;
      name: string;
      w: null;
      c: number;
      vacancy: (number | null)[];
      symbols: (string | null)[];
    }[] = [];
    const marks = new Map<string, number>();
    const seen = new Set<string>();
    let kind = "";
    let unknown = 0;
    let noClass = 0;

    for (const row of pdf.rows) {
      if (row.length < COL_ZERO + AGE_COUNT) continue;
      const name = squeeze(row[COL_NAME]);
      if (!name) continue;
      if (name === "保育所名") {
        // ページごとに出てくる見出しの行。年齢の並びだけ確かめる
        for (let age = 0; age < AGE_COUNT; age++) {
          if (toHalfWidth(squeeze(row[COL_ZERO + age] ?? "")) !== `${age}歳`) {
            fail(`年齢の並びが変わりました: ${row.slice(COL_ZERO, COL_ZERO + AGE_COUNT).join(" ")}`);
          }
        }
        continue;
      }

      // 区分は縦結合。2ページめは「私立（続き）」と書かれる
      const rawKind = squeeze(row[COL_KIND]).replace(/[（(].*?[）)]/g, "");
      if (rawKind) kind = rawKind;
      if (!kind) fail(`${name}: 区分が分かりません`);
      if (!categories.includes(kind)) categories.push(kind);

      if (seen.has(name)) fail(`保育所名が重複しています: ${name}`);
      seen.add(name);

      const symbols: (string | null)[] = [];
      for (let age = 0; age < AGE_COUNT; age++) {
        const raw = normalizeMark(row[COL_ZERO + age] ?? "");
        if (raw === "") {
          noClass += 1;
          symbols.push(null);
          continue;
        }
        if (raw === UNKNOWN_MARK) unknown += 1;
        else if (!knownMarks.has(raw)) fail(`${name}: 凡例にない記号です: 「${row[COL_ZERO + age]}」`);
        marks.set(raw, (marks.get(raw) ?? 0) + 1);
        symbols.push(raw);
      }
      if (symbols.every((s) => s === null)) fail(`${name}: 全てのクラスが空です`);

      facilities.push({
        id: name,
        name,
        w: null,
        c: categories.indexOf(kind),
        vacancy: new Array(AGE_COUNT).fill(null),
        symbols,
      });
    }

    if (facilities.length < 50) fail(`施設が${facilities.length}件しか取れていません`);
    for (const item of symbolLegend) {
      if (!marks.has(item.mark)) fail(`凡例にある「${item.mark}」が表に1つも出てきません`);
    }
    // 説明のない記号が出ていたら、凡例のいちばん下に足しておく
    if (unknown > 0) {
      symbolLegend.push({ mark: UNKNOWN_MARK, label: UNKNOWN_LABEL, open: false });
    }

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

    const notes = [
      "奈良市は受入可能数を人数ではなく記号で公表しています。当サイトでも公式の記号のまま載せています。",
      `${year}年${month}月分の申込みは締め切られています。来月以降も受入れがないということではありません。`,
      "その園が受け入れていないクラスは「—」にしています。",
    ];
    if (unknown > 0) {
      notes.push(
        `公式の表に凡例のない「${UNKNOWN_MARK}」が${unknown}件あります。意味が公表されていないため、記号のまま載せたうえで、空きのある施設としては数えていません。`
      );
    }

    const dataset = {
      municipalitySlug: MUNICIPALITY_SLUG,
      municipalityName: MUNICIPALITY_NAME,
      asOf,
      fetchedAt: todayJst(),
      sourceName: SOURCE_NAME,
      sourceUrl: INDEX_URL,
      sourceFiles: { vacancy: PDF_URL },
      metrics: ["symbol"],
      subtitle: `${year}年${month}月分の受入可能数の結果`,
      notes,
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
    console.log(`  ${facilities.length}施設 / ${categories.length}区分（${categories.join("・")}）`);
    console.log(`  受け入れのないクラス: ${noClass}`);
    console.log("");
    console.log("  記号の出てきた数");
    for (const item of symbolLegend) {
      console.log(`  ${item.mark}（${item.label}） ${marks.get(item.mark) ?? 0}`);
    }
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

main().catch((err) => fail(String(err)));
