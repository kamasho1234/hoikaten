/**
 * 帯広市の保育所等の空き状況を取り込む
 *
 * 実行: npm run vacancy:fetch:obihiro
 *
 * ## この自治体の特徴
 * - 記号（○＝空きあり、△＝わずかに空きあり、−＝空きなし、／＝利用不可）
 * - 「／」は文字ではなくセルいっぱいの斜線で描いてあるのでPython側で見分けている
 * - 区分は「認可保育所（公立）」の次が「（私立）」のように、
 *   2つめからは「認可保育所」が省かれている
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "obihiro";
const MUNICIPALITY_NAME = "帯広市";
const SOURCE_NAME = "帯広市「保育所等の空き状況一覧」";
const INDEX_URL = "https://www.city.obihiro.hokkaido.jp/kyoiku/kosodate/hoiku/1010107.html";
const AGE_COUNT = 6;
const UA = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";

const COL_DIVISION = 0;
const COL_NAME = 1;
const COL_AGE0 = 3;

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const EXTRACTOR = path.join(process.cwd(), "scripts", "obihiro-pdf-extract.py");

function fail(message: string): never {
  console.error(`\n[中断] ${message}`);
  process.exit(1);
}

function todayJst(): string {
  const jst = new Date(Date.now() + 9 * 60 * 60 * 1000);
  return jst.toISOString().slice(0, 10);
}

function squeeze(s: string): string {
  return (s ?? "").replace(/[\s　]/g, "");
}

function shapeOf(mark: string): string {
  if (/^[○◯〇]$/.test(mark)) return "○";
  if (/^[-‐‑‒–—―ー－−]$/.test(mark)) return "−";
  return mark;
}

type PdfResult = {
  target: [number, number];
  asOf: [number, number, number];
  legend: { mark: string; label: string }[];
  markCounts: Record<string, number>;
  slashes: number;
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

  // 「令和8年10月入所の保育所等 空き状況（令和8年8月14日現在）」
  const links = [...html.matchAll(/<a[^>]+href="([^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => ({ url: new URL(m[1], INDEX_URL).toString(), text: squeeze(m[2]) }))
    .map((l) => {
      const m = l.text.match(/令和(\d+)年(\d+)月入所の保育所等空き状況/);
      if (!m) return null;
      const [reiwa, month] = m.slice(1, 3).map(Number);
      return { ...l, reiwa, month, sortKey: reiwa * 100 + month };
    })
    .filter((v): v is NonNullable<typeof v> => v !== null);
  if (links.length === 0)
    fail("空き状況のPDFが見つかりません。ページの構成が変わった可能性があります。");
  const latest = links.reduce((a, b) => (b.sortKey > a.sortKey ? b : a));
  console.log(`最新: ${latest.text}\n  ${latest.url}`);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "obihiro-vacancy-"));
  try {
    const r = await fetch(latest.url, { headers: { "User-Agent": UA } });
    if (!r.ok) fail(`PDFの取得に失敗しました（${r.status}）: ${latest.url}`);
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.subarray(0, 4).toString() !== "%PDF") fail(`PDFではありません: ${latest.url}`);
    const file = path.join(tmpDir, "obihiro.pdf");
    fs.writeFileSync(file, buf);

    let pdf: PdfResult;
    try {
      pdf = JSON.parse(runPython([EXTRACTOR, file])) as PdfResult;
    } catch (err) {
      fail(`抽出結果を読めません: ${String(err)}`);
    }

    const [targetReiwa, targetMonth] = pdf.target;
    if (targetReiwa !== latest.reiwa || targetMonth !== latest.month) {
      fail(
        `PDFの表題（令和${targetReiwa}年${targetMonth}月）がリンクの文言（令和${latest.reiwa}年${latest.month}月）と違います`
      );
    }
    const [reiwa, month, day] = pdf.asOf;
    const asOf = `${2018 + reiwa}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    if (asOf > todayJst()) fail(`時点（${asOf}）が今日より先になっています`);
    console.log(`時点: ${asOf} / 対象: ${targetMonth}月入所`);

    const symbolLegend = pdf.legend.map((l) => ({
      mark: shapeOf(l.mark),
      label: l.label,
      open: /空きあり$/.test(l.label),
    }));
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
    // 「（私立）」のように括弧で始まる区分に前置する言葉（＝認可保育所）
    let prefix = "";
    let division = "";

    for (const row of pdf.rows) {
      const name = squeeze(row[COL_NAME]);
      if (!name) fail("施設名が空の行があります");
      if (seen.has(name)) fail(`施設名が重複しています: ${name}`);
      seen.add(name);

      // 区分は縦結合。「※保育枠のみ」などの注記は落として注意書きに回す
      const raw = squeeze(row[COL_DIVISION]).split("※")[0];
      if (raw) {
        if (raw.startsWith("（")) {
          // 「認可保育所（公立）」に続く「（私立）」「（夜間）」は認可保育所のこと
          if (!prefix) fail(`${name}: 「${raw}」の前に来るはずの区分が分かりません`);
          division = `${prefix}${raw}`;
        } else {
          prefix = raw.replace(/（.*$/, "");
          division = raw;
        }
      }
      if (!division) fail(`${name}: 区分が分かりません`);
      if (!categories.includes(division)) categories.push(division);

      const symbols: (string | null)[] = [];
      for (let age = 0; age < AGE_COUNT; age++) {
        const value = squeeze(row[COL_AGE0 + age] ?? "");
        const mark = legendByShape.get(shapeOf(value));
        if (!mark) fail(`${name}: 凡例にない記号です: 「${value}」`);
        marks.set(mark, (marks.get(mark) ?? 0) + 1);
        symbols.push(mark);
      }

      facilities.push({
        id: name,
        name,
        w: null,
        c: categories.indexOf(division),
        vacancy: new Array(AGE_COUNT).fill(null),
        symbols,
      });
    }

    if (facilities.length < 35) fail(`施設が${facilities.length}件しか取れていません`);
    for (const [mark, count] of marks) {
      // 「／」は文字ではなく斜線なので、PDFの文字ではなく斜線の数と突き合わせる
      const inText =
        mark === "／"
          ? pdf.slashes
          : Object.entries(pdf.markCounts)
              .filter(([m]) => shapeOf(m) === shapeOf(mark))
              .reduce((acc, [, v]) => acc + v, 0);
      if (count !== inText) {
        fail(`「${mark}」の数が合いません（PDF ${inText}個 / 取り込み ${count}個）`);
      }
    }
    console.log("記号の数はPDFと一致しました");

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
      previous?.sourceFiles?.vacancy === latest.url &&
      JSON.stringify(previous?.facilities ?? null) === JSON.stringify(facilities)
    ) {
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
      metrics: ["symbol"],
      subtitle: `${targetMonth}月入所の空き状況`,
      notes: [
        "帯広市は空き状況を人数ではなく記号で公表しています。当サイトでも公式の記号のまま載せています。",
        "この表は園における今後の児童の状況や保育士の配置状況などを考慮した受入予測であり、日々変動します。「空きあり」と表示されていても入所を保障するものではありません。",
        "空きがない園でも申請時に希望することはできます。施設選択の参考としてご覧ください。",
        "認定こども園は保育枠のみの状況です。",
        "年齢はその年度の4月1日時点のものです。",
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
    console.log(`  ${facilities.length}施設 / ${categories.length}区分`);
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
