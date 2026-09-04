/**
 * 刈谷市の保育園等の空き枠情報を取り込む
 *
 * 実行: npm run vacancy:fetch:kariya
 *
 * ## この自治体の特徴
 * - **0〜2歳児クラスしか公表していない**。刈谷市は3歳児クラス以上を幼児園等が受け持っていて、
 *   「3歳児クラス以上は幼児園等に十分な空き枠があります」と注記されている。
 *   そのため3〜5歳は「—」になる
 * - 空きは記号（〇＝5枠以上、▲＝残りわずか、×＝なし）
 * - **当月1日時点で確定した翌月1日の空き状況**を載せているので、
 *   時点の日付が今日より先になる（翌月1日）
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "kariya";
const MUNICIPALITY_NAME = "刈谷市";
const SOURCE_NAME = "刈谷市「空き枠情報」";
const INDEX_URL =
  "https://www.city.kariya.lg.jp/kosodatenavi/1014910/1011895/1015435/1015441.html";
const AGE_COUNT = 6;
/** 公表されているのは0〜2歳児クラスだけ */
const PUBLISHED_AGES = 3;
const MIN_FACILITIES = 15;
const UA = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const EXTRACTOR = path.join(process.cwd(), "scripts", "kariya-pdf-extract.py");

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

/** 記号の形をそろえる */
function shapeOf(mark: string): string {
  if (/^[○◯〇]$/.test(mark)) return "○";
  if (/^[×✕✖]$/.test(mark)) return "×";
  return mark;
}

function reiwaToYear(reiwa: number): number {
  return reiwa + 2018;
}

/** その月の1日から数えて翌月の1日 */
function nextMonthFirst(date: string): string {
  const [y, m] = date.split("-").map(Number);
  const year = m === 12 ? y + 1 : y;
  const month = m === 12 ? 1 : m + 1;
  return `${year}-${String(month).padStart(2, "0")}-01`;
}

type PdfResult = {
  asOf: [number, number, number];
  legend: { mark: string; label: string }[];
  notes: string[];
  markCounts: Record<string, number>;
  rows: { name: string; marks: string[]; capacity: string }[];
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
  console.log(`${MUNICIPALITY_NAME}の空き枠情報を取り込みます`);
  console.log(`公式ページ: ${INDEX_URL}\n`);

  const res = await fetch(INDEX_URL, { headers: { "User-Agent": UA } });
  if (!res.ok) fail(`公式ページが ${res.status} を返しました`);
  const html = await res.text();

  const links = [...html.matchAll(/<a[^>]+href="([^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => ({ url: new URL(m[1], INDEX_URL).toString(), text: squeeze(m[2]) }))
    .filter((l) => l.text.includes("空き枠情報"));
  if (links.length !== 1) {
    fail(`空き枠情報のPDFが${links.length}件あります（1件のはず）`);
  }
  const link = links[0];
  console.log(`PDF: ${link.text}\n  ${link.url}`);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "kariya-vacancy-"));
  try {
    const r = await fetch(link.url, { headers: { "User-Agent": UA } });
    if (!r.ok) fail(`PDFの取得に失敗しました（${r.status}）: ${link.url}`);
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.subarray(0, 4).toString() !== "%PDF") fail(`PDFではありません: ${link.url}`);
    const file = path.join(tmpDir, "kariya.pdf");
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
    // 当月1日時点で確定した翌月1日の空き状況なので、時点が今日より先になる
    if (asOf > todayJst()) {
      const expected = nextMonthFirst(todayJst().slice(0, 8) + "01");
      if (asOf !== expected) {
        fail(`時点の日付（${asOf}）が今日より先で、翌月1日（${expected}）とも違います`);
      }
      console.log(`時点は翌月1日（${asOf}）です。公開はそれより前に行われます`);
    }
    console.log(`時点: ${asOf}`);

    const symbolLegend = pdf.legend.map((l) => ({
      mark: shapeOf(squeeze(l.mark)),
      label: squeeze(l.label),
      open: !/^なし$/.test(squeeze(l.label)),
    }));
    if (symbolLegend.length < 3) fail(`凡例が${symbolLegend.length}件しか取れていません`);
    if (!symbolLegend.some((l) => l.open)) fail("空きありの記号が凡例にありません");
    console.log(`凡例: ${symbolLegend.map((l) => `${l.mark}＝${l.label}`).join(" / ")}`);
    const legendByShape = new Map(symbolLegend.map((l) => [shapeOf(l.mark), l.mark]));

    const facilities: {
      id: string;
      name: string;
      w: null;
      c: null;
      vacancy: (number | null)[];
      symbols: (string | null)[];
    }[] = [];
    const marks = new Map<string, number>();
    const seen = new Set<string>();

    for (const row of pdf.rows) {
      const name = squeeze(row.name);
      if (!name) fail("園名が空の行があります");
      if (seen.has(name)) fail(`園名が重複しています: ${name}`);
      seen.add(name);

      const symbols: (string | null)[] = new Array(AGE_COUNT).fill(null);
      for (let age = 0; age < PUBLISHED_AGES; age++) {
        const raw = squeeze(row.marks[age] ?? "");
        const mark = legendByShape.get(shapeOf(raw));
        if (!mark) fail(`${name}: ${age}歳児クラスが凡例にない記号です: 「${raw}」`);
        marks.set(mark, (marks.get(mark) ?? 0) + 1);
        symbols[age] = mark;
      }

      facilities.push({
        id: name,
        name,
        w: null,
        c: null,
        vacancy: new Array(AGE_COUNT).fill(null),
        symbols,
      });
    }

    if (facilities.length < MIN_FACILITIES) {
      fail(`施設が${facilities.length}件しか取れていません（${MIN_FACILITIES}件以上のはず）`);
    }

    // 検算1: 記号の数が施設数×公表されている年齢数になるか
    const total = [...marks.values()].reduce((a, b) => a + b, 0);
    if (total !== facilities.length * PUBLISHED_AGES) {
      fail(`記号の数が合いません（${total} / 施設${facilities.length}×${PUBLISHED_AGES}）`);
    }

    // 検算2: 記号の数がPDFの印字と合うか
    for (const [mark, count] of marks) {
      const inText = Object.entries(pdf.markCounts)
        .filter(([m]) => shapeOf(m) === shapeOf(mark))
        .reduce((acc, [, v]) => acc + v, 0);
      if (count !== inText) {
        fail(`「${mark}」の数が合いません（PDFの印字 ${inText}個 / 取り込み ${count}個）`);
      }
    }
    console.log(`記号の数はPDFの印字と一致しました（${total}個）`);

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
    if (previous?.asOf === asOf && previous?.sourceFiles?.vacancy === link.url) {
      console.log(`公式データの時点が前回と同じ（${asOf}）のため更新はありません。`);
      return;
    }

    const notes = [
      `刈谷市は空き枠を人数ではなく記号で公表しています。これは${asOf}時点のものです。`,
      "刈谷市が公表しているのは0歳児から2歳児のクラスだけです。3歳児クラス以上は幼児園等が受け持っているため、当サイトでは「—」にしています。",
      ...pdf.notes.map((n) => (n.endsWith("。") ? n : `${n}…`)),
    ];

    const dataset = {
      municipalitySlug: MUNICIPALITY_SLUG,
      municipalityName: MUNICIPALITY_NAME,
      asOf,
      fetchedAt: todayJst(),
      sourceName: SOURCE_NAME,
      sourceUrl: INDEX_URL,
      sourceFiles: { vacancy: link.url },
      metrics: ["symbol"],
      subtitle: "0〜2歳児クラスの空き枠",
      notes,
      wards: [],
      categories: [],
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
    console.log(`  ${facilities.length}施設（0〜2歳児クラスのみ）`);
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

main().catch((err) => fail(String(err)));
