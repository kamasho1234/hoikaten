/**
 * 野洲市の保育所等の空き状況を取り込む
 *
 * 実行: npm run vacancy:fetch:yasu
 *
 * ## この自治体の特徴
 * - 記号は ○＝入所できる可能性があります、△＝若干数程度の空きあり、
 *   ×＝現在空きはありません（申込みはできる）
 * - **PDFにもページの更新日にも時点が書かれていない**。
 *   時点はリンクの文字（「（8月21日時点)」）にしか出てこないので、
 *   そこから月日を取り、PDFのタイトルの「令和８年度」と組み合わせて日付にする
 *   （ページの更新日は3月10日のまま止まっている）
 * - 記号の文字が凡例と表で違う（○ U+25CB と 〇 U+3007、× U+00D7 と ✕ U+2715）
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "yasu";
const MUNICIPALITY_NAME = "野洲市";
const SOURCE_NAME = "野洲市「野洲市内の保育所（園）等の空き状況」";
const INDEX_URL = "https://www.city.yasu.lg.jp/soshiki/kodomo/hoikuen/1703569301167.html";
const AGE_COUNT = 6;
const MIN_FACILITIES = 12;
const UA = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const EXTRACTOR = path.join(process.cwd(), "scripts", "yasu-pdf-extract.py");

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
  fiscalYear: number;
  target: number;
  legend: { mark: string; label: string }[];
  notes: string[];
  markCounts: Record<string, number>;
  blanks: number;
  rows: { name: string; marks: (string | null)[] }[];
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

  // 時点はリンクの文字にしか書かれていない
  const point = /[（(](\d{1,2})月(\d{1,2})日時点[）)]/.exec(link.text);
  if (!point) fail(`リンクの文字から「（M月D日時点)」を読み取れませんでした: ${link.text}`);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "yasu-vacancy-"));
  try {
    const r = await fetch(link.url, { headers: { "User-Agent": UA } });
    if (!r.ok) fail(`PDFの取得に失敗しました（${r.status}）: ${link.url}`);
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.subarray(0, 4).toString() !== "%PDF") fail(`PDFではありません: ${link.url}`);
    const file = path.join(tmpDir, "yasu.pdf");
    fs.writeFileSync(file, buf);

    let pdf: PdfResult;
    try {
      pdf = JSON.parse(runPython([EXTRACTOR, file])) as PdfResult;
    } catch (err) {
      fail(`抽出結果を読めません: ${String(err)}`);
    }

    // 年度は4月に始まるので、1〜3月なら年度＋1年になる
    const month = Number(point[1]);
    const day = Number(point[2]);
    if (month < 1 || month > 12 || day < 1 || day > 31) {
      fail(`時点の月日が想定の範囲にありません（${month}月${day}日）`);
    }
    const year = reiwaToYear(pdf.fiscalYear) + (month <= 3 ? 1 : 0);
    const asOf = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    if (asOf > todayJst()) fail(`時点の日付（${asOf}）が今日より先になっています`);
    console.log(`時点: ${asOf}（リンクの文字から） ／ 対象: ${pdf.target}月入所`);

    const symbolLegend = pdf.legend.map((l) => ({
      mark: shapeOf(squeeze(l.mark)),
      label: squeeze(l.label),
      open: !squeeze(l.label).startsWith("現在空きはありません"),
    }));
    if (symbolLegend.length !== 3) fail(`凡例が${symbolLegend.length}件です（3件のはず）`);
    if (!symbolLegend.some((l) => l.open)) fail("空きありの記号が凡例にありません");
    console.log(`凡例: ${symbolLegend.map((l) => `${l.mark}＝${l.label}`).join(" / ")}`);
    const known = new Map(symbolLegend.map((l) => [shapeOf(l.mark), l.mark]));

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
    let blanks = 0;

    for (const row of pdf.rows) {
      const name = squeeze(row.name);
      if (!name) fail("施設名が空の行があります");
      if (seen.has(name)) fail(`施設名が重複しています: ${name}`);
      seen.add(name);

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

    // 検算1: 記号の数がPDFの印字と合うか（形をそろえて数える）
    for (const [mark, count] of marks) {
      const inText = Object.entries(pdf.markCounts)
        .filter(([m]) => shapeOf(m) === shapeOf(mark))
        .reduce((acc, [, v]) => acc + v, 0);
      if (count !== inText) {
        fail(`「${mark}」の数が合いません（PDFの印字 ${inText}個 / 取り込み ${count}個）`);
      }
    }
    // 検算2: 空らんの数がPDFと合うか
    if (blanks !== pdf.blanks) fail(`空らんの数が合いません（PDF ${pdf.blanks} / 取り込み ${blanks}）`);
    // 検算3: 記号と空らんの合計が施設数×年齢数になるか
    const total = [...marks.values()].reduce((a, b) => a + b, 0);
    if (total + blanks !== facilities.length * AGE_COUNT) {
      fail(`欄の数が合いません（記号${total}＋空らん${blanks} / 施設${facilities.length}×${AGE_COUNT}）`);
    }
    console.log("記号の数はPDFの印字と一致し、欄の数も施設数×年齢数と合いました");

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
      `野洲市は空き状況を人数ではなく記号で公表しています。これは${pdf.target}月入所の受付にあわせたもので、${asOf}時点のものです。`,
      "退所や保育士の配置により状況は変動します。",
      ...pdf.notes,
      "公式の表で空らんになっている年齢は「—」にしています。その年齢のクラスがないことを表しています。",
    ];

    const dataset = {
      municipalitySlug: MUNICIPALITY_SLUG,
      municipalityName: MUNICIPALITY_NAME,
      prefecture: "滋賀県",
      asOf,
      fetchedAt: todayJst(),
      sourceName: SOURCE_NAME,
      sourceUrl: INDEX_URL,
      sourceFiles: { vacancy: link.url },
      metrics: ["symbol"],
      subtitle: `${pdf.target}月入所の空き状況のめやす`,
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
    console.log(`  ${facilities.length}施設 / 空らん ${blanks}`);
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

main().catch((err) => fail(String(err)));
