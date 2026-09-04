/**
 * 周南市の保育所等の空き状況を取り込む
 *
 * 実行: npm run vacancy:fetch:shunan
 *
 * ## この自治体の特徴
 * - 記号は ×＝受入無し、△＝若干名受入可能、〇＝3名以上受入可能
 * - **0歳児の欄に受け入れ月齢が併記される**（「×6ヵ月～」など）。
 *   記号と月齢を分けて取り、月齢は注記に載せる
 * - 空らんは、地域型保育など上の年齢のクラスがない施設のもの
 * - 地域（徳山・新南陽・熊毛・鹿野）で絞り込める
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "shunan";
const MUNICIPALITY_NAME = "周南市";
const SOURCE_NAME = "周南市「市内の保育所、認定こども園(保育所部分)、地域型保育施設の空き状況」";
const INDEX_URL = "https://www.city.shunan.lg.jp/soshiki/30/104334.html";
const AGE_COUNT = 6;
const MIN_FACILITIES = 25;
const UA = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const EXTRACTOR = path.join(process.cwd(), "scripts", "shunan-pdf-extract.py");

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

/** 記号の形をそろえる */
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
  markCounts: Record<string, number>;
  rows: {
    area: string;
    public: string;
    name: string;
    marks: (string | null)[];
    months: string | null;
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

  const links = [...html.matchAll(/<a[^>]+href="([^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => ({ url: new URL(m[1], res.url || INDEX_URL).toString(), text: toHalfWidth(squeeze(m[2])) }))
    .filter((l) => l.text.includes("空き状況"));
  if (links.length === 0) fail("空き状況のPDFが見つかりません");
  // 月が複数並ぶことがあるので、いちばん大きい月を選ぶ
  const withMonth = links.map((l) => ({ ...l, month: Number(/(\d+)月入所/.exec(l.text)?.[1] ?? 0) }));
  withMonth.sort((a, b) => b.month - a.month);
  const link = withMonth[0];
  console.log(`PDF: ${link.text}\n  ${link.url}`);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "shunan-vacancy-"));
  try {
    const r = await fetch(link.url, { headers: { "User-Agent": UA } });
    if (!r.ok) fail(`PDFの取得に失敗しました（${r.status}）: ${link.url}`);
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.subarray(0, 4).toString() !== "%PDF") fail(`PDFではありません: ${link.url}`);
    const file = path.join(tmpDir, "shunan.pdf");
    fs.writeFileSync(file, buf);

    let pdf: PdfResult;
    try {
      pdf = JSON.parse(runPython([EXTRACTOR, file])) as PdfResult;
    } catch (err) {
      fail(`抽出結果を読めません: ${String(err)}`);
    }

    const [year, month, day] = pdf.asOf;
    const asOf = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    if (!/^\d{4}-\d{2}-\d{2}$/.test(asOf)) fail(`時点の日付を組み立てられません: ${asOf}`);
    if (asOf > todayJst()) fail(`時点の日付（${asOf}）が今日より先になっています`);
    const targetLabel = `${reiwaToYear(pdf.target[0])}年${pdf.target[1]}月`;
    console.log(`時点: ${asOf} ／ 対象: ${targetLabel}1日入所`);

    const symbolLegend = pdf.legend.map((l) => ({
      mark: shapeOf(squeeze(l.mark)),
      label: squeeze(l.label),
      open: /受入可能$/.test(squeeze(l.label)),
    }));
    if (symbolLegend.length < 3) fail(`凡例が${symbolLegend.length}件しか取れていません`);
    if (!symbolLegend.some((l) => l.open)) fail("受入可能の記号が凡例にありません");
    console.log(`凡例: ${symbolLegend.map((l) => `${l.mark}＝${l.label}`).join(" / ")}`);
    const known = new Map(symbolLegend.map((l) => [shapeOf(l.mark), l.mark]));

    const wards: string[] = [];
    const categories: string[] = [];
    const facilities: {
      id: string;
      name: string;
      w: number;
      c: number;
      vacancy: (number | null)[];
      symbols: (string | null)[];
    }[] = [];
    const marks = new Map<string, number>();
    const seen = new Set<string>();
    const monthNotes: string[] = [];
    let blanks = 0;

    for (const row of pdf.rows) {
      const name = squeeze(row.name);
      if (!name) fail("施設名が空の行があります");
      if (seen.has(name)) fail(`施設名が重複しています: ${name}`);
      seen.add(name);

      const area = squeeze(row.area);
      if (!area) fail(`${name}: 地域が空です`);
      let w = wards.indexOf(area);
      if (w < 0) {
        wards.push(area);
        w = wards.length - 1;
      }

      const kind = squeeze(row.public) || "その他";
      let c = categories.indexOf(kind);
      if (c < 0) {
        categories.push(kind);
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
        const mark = known.get(shapeOf(squeeze(raw)));
        if (!mark) fail(`${name}: ${age}歳児が凡例にない記号です（「${raw}」）`);
        marks.set(mark, (marks.get(mark) ?? 0) + 1);
        symbols.push(mark);
      }
      if (symbols.every((s) => s === null)) fail(`${name}: 全ての年齢が空らんです`);

      const months = squeeze(row.months ?? "");
      if (months) monthNotes.push(`${name}: ${months}`);

      facilities.push({
        id: name,
        name,
        w,
        c,
        vacancy: new Array(AGE_COUNT).fill(null),
        symbols,
      });
    }

    if (facilities.length < MIN_FACILITIES) {
      fail(`施設が${facilities.length}件しか取れていません（${MIN_FACILITIES}件以上のはず）`);
    }

    // 検算1: 記号の数がPDFの印字と合うか
    for (const [mark, count] of marks) {
      const inText = Object.entries(pdf.markCounts)
        .filter(([m]) => shapeOf(m) === shapeOf(mark))
        .reduce((acc, [, v]) => acc + v, 0);
      if (count !== inText) {
        fail(`「${mark}」の数が合いません（PDFの印字 ${inText}個 / 取り込み ${count}個）`);
      }
    }
    // 検算2: 記号と空らんの合計が施設数×年齢数になるか
    const total = [...marks.values()].reduce((a, b) => a + b, 0);
    if (total + blanks !== facilities.length * AGE_COUNT) {
      fail(
        `欄の数が合いません（記号${total}＋空らん${blanks} / 施設${facilities.length}×${AGE_COUNT}）`
      );
    }
    console.log("記号の数はPDFの印字と一致し、欄の数も施設数×年齢数と合いました");

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
    if (
      previous?.asOf === asOf &&
      previous?.sourceFiles?.vacancy === link.url &&
      JSON.stringify(previous?.facilities ?? null) === JSON.stringify(facilities)
    ) {
      console.log(`公式データの時点が前回と同じ（${asOf}）のため更新はありません。`);
      return;
    }

    const notes = [
      `周南市は空き状況を人数ではなく記号で公表しています。これは${targetLabel}1日入所のもので、${asOf}時点のものです。`,
      ...pdf.notes,
      "公式の表で空らんになっている年齢は「—」にしています。その年齢のクラスがないことを表しています。",
      ...(monthNotes.length
        ? [`0歳児の受け入れ月齢が示されている施設があります。${monthNotes.join(" / ")}`]
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
      metrics: ["symbol"],
      subtitle: `${targetLabel}1日入所の空き状況`,
      notes,
      wards,
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
    console.log(`  ${facilities.length}施設 / ${wards.length}地域 / 空らん ${blanks}`);
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

main().catch((err) => fail(String(err)));
