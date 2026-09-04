/**
 * 廿日市市の認可保育施設空き状況を取り込む
 *
 * 実行: npm run vacancy:fetch:hatsukaichi
 *
 * ## この自治体の特徴
 * - 記号は ●＝4人以上、▲＝1〜3人、×＝0人、―＝利用できません。
 *   **凡例はPDFではなくページのHTMLの表にある**ので、そこから読む
 * - 地域（廿日市・佐伯・吉和・大野・宮島）で絞り込める
 * - 施設名に「※建替等予定あり」「【市HP】」が改行で付くことがある
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "hatsukaichi";
const MUNICIPALITY_NAME = "廿日市市";
const SOURCE_NAME = "廿日市市「認可保育施設の空き状況」";
const INDEX_URL = "https://www.city.hatsukaichi.hiroshima.jp/site/kosodate/39183.html";
const AGE_COUNT = 6;
const MIN_FACILITIES = 30;
const UA = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const EXTRACTOR = path.join(process.cwd(), "scripts", "hatsukaichi-pdf-extract.py");

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

/** タグと空白と実体参照を落として、中身だけを取り出す */
function textOf(html: string): string {
  return toHalfWidth(
    html
      .replace(/<[^>]+>/g, "")
      .replace(/&nbsp;/g, " ")
      .replace(/&times;/g, "×")
      .replace(/&amp;/g, "&")
      .replace(/&#x?([0-9a-fA-F]+);/g, (_, code: string) =>
        String.fromCodePoint(Number(code.startsWith("x") ? `0${code}` : code))
      )
      .replace(/[\s　]/g, "")
  );
}

/** 記号の形をそろえる */
function shapeOf(mark: string): string {
  if (/^[○◯〇]$/.test(mark)) return "○";
  if (/^[×✕✖]$/.test(mark)) return "×";
  if (/^[―－—]$/.test(mark)) return "―";
  return mark;
}

function reiwaToYear(reiwa: number): number {
  return reiwa + 2018;
}

type PdfResult = {
  asOf: [number, number, number];
  target: [number, number];
  markCounts: Record<string, number>;
  blanks: number;
  rows: { area: string; name: string; extra: string[]; marks: (string | null)[] }[];
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

  // 凡例はページのHTMLの表（記号／説明／受け入れの目安）にある
  const legendTable = [...html.matchAll(/<table[\s\S]*?<\/table>/gi)]
    .map((t) => t[0])
    .find((t) => textOf(t).startsWith("記号説明"));
  if (!legendTable) fail("凡例の表（記号／説明／受け入れの目安）が見つかりません");
  const legendRows = [...legendTable.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi)]
    .map((r) => [...r[1].matchAll(/<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/gi)].map((c) => textOf(c[1])))
    .filter((cells) => cells.length >= 3 && cells[0] !== "記号");
  const symbolLegend = legendRows.map((cells) => ({
    mark: shapeOf(cells[0]),
    label: cells[2] === "―" ? cells[1] : cells[2],
    open: cells[2] !== "0人" && cells[2] !== "―",
  }));
  if (symbolLegend.length !== 4) fail(`凡例が${symbolLegend.length}件です（4件のはず）`);
  if (!symbolLegend.some((l) => l.open)) fail("受け入れの可能性がある記号が凡例にありません");
  console.log(`凡例: ${symbolLegend.map((l) => `${l.mark}＝${l.label}`).join(" / ")}`);
  const known = new Map(symbolLegend.map((l) => [shapeOf(l.mark), l.mark]));

  const links = [...html.matchAll(/<a[^>]+href="([^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => ({
      url: new URL(m[1], res.url || INDEX_URL).toString(),
      text: toHalfWidth(squeeze(m[2])),
    }))
    .filter((l) => l.text.includes("認可保育施設空き状況"));
  if (links.length !== 1) fail(`認可保育施設空き状況のPDFが${links.length}件あります（1件のはず）`);
  const link = links[0];
  console.log(`PDF: ${link.text}\n  ${link.url}`);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "hatsukaichi-vacancy-"));
  try {
    const r = await fetch(link.url, { headers: { "User-Agent": UA } });
    if (!r.ok) fail(`PDFの取得に失敗しました（${r.status}）: ${link.url}`);
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.subarray(0, 4).toString() !== "%PDF") fail(`PDFではありません: ${link.url}`);
    const file = path.join(tmpDir, "hatsukaichi.pdf");
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
    console.log(`時点: ${asOf} ／ 対象: ${targetLabel}入園調整後`);

    const wards: string[] = [];
    const facilities: {
      id: string;
      name: string;
      w: number;
      c: null;
      vacancy: (number | null)[];
      symbols: (string | null)[];
    }[] = [];
    const marks = new Map<string, number>();
    const seen = new Set<string>();
    const extras: string[] = [];
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

      const symbols: (string | null)[] = [];
      for (let age = 0; age < AGE_COUNT; age++) {
        const raw = row.marks[age];
        if (raw === null || raw === "") {
          blanks += 1;
          symbols.push(null);
          continue;
        }
        const mark = known.get(shapeOf(squeeze(raw)));
        if (!mark) fail(`${name}: ${age}歳が凡例にない記号です（「${raw}」）`);
        marks.set(mark, (marks.get(mark) ?? 0) + 1);
        symbols.push(mark);
      }

      const extra = row.extra.map((e) => squeeze(e)).filter((e) => e.startsWith("※"));
      if (extra.length) extras.push(`${name}${extra.join("")}`);

      facilities.push({
        id: name,
        name,
        w,
        c: null,
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
      `廿日市市は空き状況を人数ではなく記号で公表しています。これは${targetLabel}入園の調整が終わったあとのもので、${asOf}時点のものです。`,
      "空き状況は、保育士の配置や保育園の状況などにより随時変化します。表の空き状況にかかわらず、入りたい順番や毎日通える範囲を考えて希望する園を選んでください。",
      "公式の表で空らんになっている年齢は「—」にしています。その年齢のクラスがないことを表しています。",
      ...(extras.length ? [`公式の表には次の但し書きが添えられています。${extras.join(" / ")}`] : []),
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
      subtitle: `${targetLabel}入園調整後の空き状況`,
      notes,
      wards,
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
    console.log(`  ${facilities.length}施設 / ${wards.join("・")}`);
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

main().catch((err) => fail(String(err)));
