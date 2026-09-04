/**
 * 福島市の認可保育施設の受入予定数を取り込む
 *
 * 実行: npm run vacancy:fetch:fukushima
 *
 * ## この自治体の特徴
 * - 空きは人数ではなく記号（×＝0人、▲＝1〜2人、△＝3〜5人、〇＝6〜10人）
 * - 年齢の欄は上下2段で、上が受入予定数の記号、下が申込み人数。
 *   申込み人数は第6希望まで含めた数で、公式も「実数合計とは合致しない」としているため取り込まない
 * - 罫線の行と施設の行が合わないので、Python側で**記号の行を基準に施設名をつないで**いる
 * - 毎月25日ごろに翌々月分が公開される。PDFのファイル名が更新日（YYYYMMDD.pdf）
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "fukushima";
const MUNICIPALITY_NAME = "福島市";
const SOURCE_NAME = "福島市「認可保育施設の受入予定数」";
const INDEX_URL = "https://www.city.fukushima.fukushima.jp/kosodate-portal/5735.html";
const AGE_COUNT = 6;
const MIN_FACILITIES = 60;
const UA = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const EXTRACTOR = path.join(process.cwd(), "scripts", "fukushima-pdf-extract.py");

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

/** 記号の形をそろえる（○/〇/◯、×/✕ の混在に備える） */
function shapeOf(mark: string): string {
  if (/^[○◯〇]$/.test(mark)) return "○";
  if (/^[×✕✖]$/.test(mark)) return "×";
  return mark;
}

function reiwaToYear(reiwa: number): number {
  return reiwa + 2018;
}

type PdfResult = {
  asOf: [number, number, number];
  target: [number, number];
  legend: { mark: string; label: string }[];
  notes: string[];
  taken: Record<string, number>;
  printed: Record<string, number>;
  rows: { kubun: string; name: string; marks: (string | null)[] }[];
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
  console.log(`${MUNICIPALITY_NAME}の受入予定数を取り込みます`);
  console.log(`公式ページ: ${INDEX_URL}\n`);

  const res = await fetch(INDEX_URL, { headers: { "User-Agent": UA } });
  if (!res.ok) fail(`公式ページが ${res.status} を返しました`);
  const html = await res.text();

  const links = [...html.matchAll(/<a[^>]+href="([^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => ({ url: new URL(m[1], INDEX_URL).toString(), text: toHalfWidth(squeeze(m[2])) }))
    .filter((l) => l.text.includes("受入予定数"));
  if (links.length === 0) fail("受入予定数のPDFが見つかりません");
  // 複数の月が並ぶことがあるので、ファイル名の日付がいちばん新しいものを選ぶ
  const withDate = links.map((l) => ({
    ...l,
    stamp: Number(/(\d{8})\.pdf$/.exec(l.url)?.[1] ?? 0),
  }));
  withDate.sort((a, b) => b.stamp - a.stamp);
  const link = withDate[0];
  console.log(`PDF: ${link.text}\n  ${link.url}`);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "fukushima-vacancy-"));
  try {
    const r = await fetch(link.url, { headers: { "User-Agent": UA } });
    if (!r.ok) fail(`PDFの取得に失敗しました（${r.status}）: ${link.url}`);
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.subarray(0, 4).toString() !== "%PDF") fail(`PDFではありません: ${link.url}`);
    const file = path.join(tmpDir, "fukushima.pdf");
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
    console.log(`時点: ${asOf} ／ 対象: ${targetLabel}`);

    const symbolLegend = pdf.legend.map((l) => ({
      mark: shapeOf(l.mark),
      label: squeeze(l.label),
      open: !/^0人$/.test(toHalfWidth(squeeze(l.label))),
    }));
    if (symbolLegend.length < 3) fail(`凡例が${symbolLegend.length}件しか取れていません`);
    if (!symbolLegend.some((l) => l.open)) fail("空きありの記号が凡例にありません");
    console.log(`凡例: ${symbolLegend.map((l) => `${l.mark}＝${l.label}`).join(" / ")}`);
    const legendByShape = new Map(symbolLegend.map((l) => [shapeOf(l.mark), l.mark]));

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
    let blanks = 0;

    for (const row of pdf.rows) {
      const name = squeeze(row.name);
      if (!name) fail("施設名が空の行があります");
      if (seen.has(name)) fail(`施設名が重複しています: ${name}`);
      seen.add(name);

      const kubun = squeeze(row.kubun);
      let c = categories.indexOf(kubun);
      if (c < 0) {
        categories.push(kubun);
        c = categories.length - 1;
      }

      const symbols: (string | null)[] = [];
      for (let age = 0; age < AGE_COUNT; age++) {
        const raw = row.marks[age];
        if (raw === null || raw === "") {
          blanks += 1;
          symbols.push(null);
          continue;
        }
        const mark = legendByShape.get(shapeOf(squeeze(raw)));
        if (!mark) fail(`${name}: ${age}歳が凡例にない記号です: 「${raw}」`);
        marks.set(mark, (marks.get(mark) ?? 0) + 1);
        symbols.push(mark);
      }
      if (symbols.every((s) => s === null)) fail(`${name}: 全ての年齢が空らんです`);

      facilities.push({
        id: name,
        name,
        w: null,
        c,
        vacancy: new Array(AGE_COUNT).fill(null),
        symbols,
      });
    }

    if (facilities.length < MIN_FACILITIES) {
      fail(`施設が${facilities.length}件しか取れていません（${MIN_FACILITIES}件以上のはず）`);
    }

    // 検算1: 記号と空らんの合計が施設数×年齢数になるか
    const total = [...marks.values()].reduce((a, b) => a + b, 0);
    if (total + blanks !== facilities.length * AGE_COUNT) {
      fail(
        `欄の数が合いません（記号${total}＋空らん${blanks} / 施設${facilities.length}×${AGE_COUNT}）`
      );
    }

    // 検算2: 記号の数がPDFに印字された数と合うか
    for (const [mark, count] of marks) {
      const inText = Object.entries(pdf.printed)
        .filter(([m]) => shapeOf(m) === shapeOf(mark))
        .reduce((acc, [, v]) => acc + v, 0);
      if (count !== inText) {
        fail(`「${mark}」の数が合いません（PDFの印字 ${inText}個 / 取り込み ${count}個）`);
      }
    }
    console.log(`記号の数はPDFの印字と一致し（${total}個）、欄の数も施設数×年齢数と合いました`);

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
      `福島市は空き状況を人数ではなく記号で公表しています。これは${targetLabel}の受入予定数で、${asOf}時点のものです。`,
      ...pdf.notes.filter(
        (n) => !n.includes("申込み人数") && !n.includes("希望施設の変更") && !n.includes("施設一覧")
      ),
      "公式の表で空らんになっている年齢は「—」にしています。その年齢の受け入れがないことを表しています。",
      "公式の表には申込み人数も載っていますが、第6希望まで含めた数で実数とは一致しないため、当サイトでは取り込んでいません。",
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
      subtitle: `${targetLabel}の受入予定数`,
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
    console.log(`  ${facilities.length}施設 / クラスのない欄 ${blanks}`);
    console.log(
      `  分類ごとの数: ${categories
        .map((name, i) => `${name} ${facilities.filter((f) => f.c === i).length}`)
        .join(" / ")}`
    );
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

main().catch((err) => fail(String(err)));
