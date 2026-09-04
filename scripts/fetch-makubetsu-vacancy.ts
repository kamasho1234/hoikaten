/**
 * 幕別町の認可保育所等の空き状況を取り込む
 *
 * 実行: npm run vacancy:fetch:makubetsu
 *
 * ## この自治体の特徴
 * - 公式ページに月ごとのPDFが積み上がる。「最新」と書かれた行の日付でいちばん新しいものを選ぶ
 * - 空きは記号（〇 1名以上の空きあり／× 空きなし）
 * - **1施設が2行組**（上が現在入所者数、下が空き状況）。認定こども園は
 *   「保育」と「教育」でさらに2組になるので、保育のほうだけを採る
 * - 町は「各保育所の保育士配置の状況などにより、受け入れ可能数は変動いたしますので、
 *   定員から入所者数を差し引いた数が受け入れ可能数とは限りません」としている
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "makubetsu";
const MUNICIPALITY_NAME = "幕別町";
const PREFECTURE = "北海道";
const SOURCE_NAME = "幕別町「認可保育所等 入所状況・空き状況」";
const INDEX_URL = "https://www.town.makubetsu.lg.jp/kenko/ninshinshussan/azukeru/1110.html";
const AGE_COUNT = 6;
const MIN_FACILITIES = 6;
const UA = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);

const LEGEND = [
  { mark: "〇", label: "1名以上の空きあり", open: true },
  { mark: "×", label: "空きなし", open: false },
];

function fail(message: string): never {
  console.error(`\n[中断] ${message}`);
  process.exit(1);
}

function todayJst(): string {
  const jst = new Date(Date.now() + 9 * 60 * 60 * 1000);
  return jst.toISOString().slice(0, 10);
}

function stripTags(html: string): string {
  return html.replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/[\s　]+/g, "");
}

function toHalfWidth(s: string): string {
  return s.replace(/[０-９．]/g, (c) =>
    c === "．" ? "." : String.fromCharCode(c.charCodeAt(0) - 0xfee0),
  );
}

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

type PdfRow = { name: string; kind: string | null; marks: (string | null)[] };

async function main(): Promise<void> {
  console.log(`${MUNICIPALITY_NAME}の空き状況を取り込みます`);
  console.log(`公式ページ: ${INDEX_URL}\n`);

  const res = await fetch(INDEX_URL, { headers: { "User-Agent": UA }, redirect: "follow" });
  if (!res.ok) fail(`公式ページが ${res.status} を返しました`);
  const html = await res.text();

  // ページの上のほうに「最新 令和8年8月1日現在」というリンクが2本ある
  // （1本目が認可保育所・幼稚園等、2本目が認可外）。**1本目を使う**。
  // 下には月ごとの控えが並ぶが、そちらは「R8.4月」のような書き方で年度と月が
  // 混ざりやすいので使わない
  const dated = [...html.matchAll(/<a[^>]+href="([^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => ({ url: new URL(m[1], INDEX_URL).toString(), text: toHalfWidth(stripTags(m[2])) }))
    .map((l) => {
      const m = l.text.match(/^令和(\d+)年(\d{1,2})月(\d{1,2})日現在$/);
      if (!m) return null;
      const [ry, mm, dd] = m.slice(1, 4).map(Number);
      return { ...l, sortKey: (ry + 2018) * 10000 + mm * 100 + dd };
    })
    .filter((v): v is NonNullable<typeof v> => v !== null);
  if (dated.length === 0) {
    fail("「令和N年M月D日現在」のリンクが見つかりません。ページの構成が変わった可能性があります。");
  }
  // 認可外はファイル名に「へき」が入る
  const links = dated.filter((l) => !decodeURIComponent(l.url).includes("へき"));
  if (links.length === 0) fail("認可保育所ぶんのPDFが見つかりません");
  const latest = links.reduce((a, b) => (b.sortKey > a.sortKey ? b : a));
  console.log(`PDF: ${latest.text}\n  ${latest.url}`);

  const pdfRes = await fetch(latest.url, { headers: { "User-Agent": UA } });
  if (!pdfRes.ok) fail(`PDFが ${pdfRes.status} を返しました`);
  const tmp = path.join(os.tmpdir(), `makubetsu-${process.pid}.pdf`);
  fs.writeFileSync(tmp, Buffer.from(await pdfRes.arrayBuffer()));

  let parsed: { asOf: number[]; rows: PdfRow[] };
  try {
    parsed = JSON.parse(
      runPython([path.join("scripts", "makubetsu-pdf-extract.py"), tmp]),
    ) as typeof parsed;
  } finally {
    fs.rmSync(tmp, { force: true });
  }

  const [ry, rm, rd] = parsed.asOf;
  const asOf = `${ry + 2018}-${String(rm).padStart(2, "0")}-${String(rd).padStart(2, "0")}`;
  if (asOf > todayJst()) fail(`時点（${asOf}）が今日より先になっています`);
  console.log(`時点: ${asOf}`);

  const known = new Set(LEGEND.map((l) => l.mark));
  const facilities: {
    id: string;
    name: string;
    w: null;
    vacancy: (number | null)[];
    symbols: (string | null)[];
  }[] = [];
  const seen = new Set<string>();
  const counts = new Map<string, number>();

  for (const row of parsed.rows) {
    if (seen.has(row.name)) fail(`施設名が重複しています: ${row.name}`);
    seen.add(row.name);
    if (row.marks.length !== AGE_COUNT) fail(`${row.name}: 記号が${row.marks.length}個です`);
    for (const mark of row.marks) {
      if (mark === null) continue;
      if (!known.has(mark)) fail(`${row.name}: 凡例にない記号です（「${mark}」）`);
      counts.set(mark, (counts.get(mark) ?? 0) + 1);
    }
    facilities.push({
      id: row.name,
      name: row.name,
      w: null,
      vacancy: new Array(AGE_COUNT).fill(null),
      symbols: row.marks,
    });
  }

  if (facilities.length < MIN_FACILITIES) {
    fail(`施設が${facilities.length}件しか取れていません（${MIN_FACILITIES}件以上のはず）`);
  }
  console.log(`${facilities.length}施設 ／ ${[...counts].map(([m, n]) => `${m}${n}`).join("・")}`);

  const previous = fs.existsSync(OUT_PATH)
    ? (JSON.parse(fs.readFileSync(OUT_PATH, "utf-8")) as { asOf?: string; facilities?: unknown[]; sourceFiles?: Record<string, string> })
    : null;
  if (previous?.facilities && facilities.length < previous.facilities.length * 0.9) {
    fail(
      `施設数が大きく減っています（前回 ${previous.facilities.length}件 → 今回 ${facilities.length}件）`,
    );
  }
  // 自治体は基準日を変えずに資料を差し替えることがある。
  // 取り込み元の一式も同じときだけ、書き換えを見送る
  if (
    previous?.asOf === asOf &&
    JSON.stringify(previous?.sourceFiles ?? {}) === JSON.stringify({ vacancy: latest.url }) &&
    JSON.stringify(previous?.facilities ?? null) === JSON.stringify(facilities)
  ) {
    console.log(`公式データの時点が前回と同じ（${asOf}）のため更新はありません。`);
    return;
  }

  const notes = [
    `幕別町は空きを人数ではなく記号で公表しています。${asOf}時点のものです。`,
    `公式の凡例は ${LEGEND.map((l) => `「${l.mark}」${l.label}`).join("、")} です。`,
    "町は「各保育所の保育士配置の状況などにより、受け入れ可能数は変動いたしますので、定員から入所者数を差し引いた数が受け入れ可能数とは限りません」としています。",
    "認定こども園は保育と教育で欄が分かれています。当サイトでは保育のほうを載せています。",
    "設けていないクラスは「—」にしています。",
    "町は認可外保育所の一覧も別に公表しています。このページには載せていません。",
  ];

  const dataset = {
    municipalitySlug: MUNICIPALITY_SLUG,
    municipalityName: MUNICIPALITY_NAME,
    prefecture: PREFECTURE,
    asOf,
    fetchedAt: todayJst(),
    sourceName: SOURCE_NAME,
    sourceUrl: INDEX_URL,
    sourceFiles: { vacancy: latest.url },
    metrics: ["symbol"],
    subtitle: "認可保育所等の空き状況",
    notes,
    wards: [] as string[],
    categories: [] as string[],
    symbolLegend: LEGEND,
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
}

main().catch((err) => fail(String(err)));
