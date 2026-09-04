/**
 * 大仙市の認可保育施設 受入状況を取り込む
 *
 * 実行: npm run vacancy:fetch:daisen
 *
 * ## この自治体の特徴
 * - 市のサイトはトップから保育のページへ導線が無く、記事のIDで直に開く形
 *   （/archive/0000000696）。リンクの文字で最新のPDFを選ぶ
 * - 認可と認可外で別々のPDFがある。当サイトが載せるのは認可のほう
 * - 空きは記号（○受入可能／△受入可能1〜3名程度／×受入不可）
 * - 備考に受入年齢が書かれる園があり、そこは3歳以上の欄が空になる
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "daisen";
const MUNICIPALITY_NAME = "大仙市";
const PREFECTURE = "秋田県";
const SOURCE_NAME = "大仙市「認可保育施設 受入状況一覧」";
const INDEX_URL = "https://www.city.daisen.lg.jp/archive/0000000696";
const AGE_COUNT = 6;
const MIN_FACILITIES = 20;
const UA = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);

const LEGEND = [
  { mark: "○", label: "受入可能", open: true },
  { mark: "△", label: "受入可能（1〜3名程度）", open: true },
  { mark: "×", label: "受入不可", open: false },
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

type PdfRow = {
  no: number;
  area: string | null;
  kind: string;
  name: string;
  marks: (string | null)[];
  note: string;
};

async function main(): Promise<void> {
  console.log(`${MUNICIPALITY_NAME}の受入状況を取り込みます`);
  console.log(`公式ページ: ${INDEX_URL}\n`);

  const res = await fetch(INDEX_URL, { headers: { "User-Agent": UA }, redirect: "follow" });
  if (!res.ok) fail(`公式ページが ${res.status} を返しました`);
  const html = await res.text();

  // 「受入可能児童数（R8.9.1）[PDF]」。認可外は「【認可外】」が付く
  const links = [...html.matchAll(/<a[^>]+href="([^"]+)"[^>]*>([\s\S]{0,120}?)<\/a>/gi)]
    .map((m) => ({ url: new URL(m[1], INDEX_URL).toString(), text: stripTags(m[2]) }))
    .filter((l) => l.text.includes("受入可能児童数") && !l.text.includes("認可外"))
    .map((l) => {
      const m = l.text.match(/R(\d+)\.(\d{1,2})\.(\d{1,2})/);
      if (!m) return null;
      const [ry, mm, dd] = m.slice(1, 4).map(Number);
      return { ...l, ry, mm, dd, sortKey: (ry + 2018) * 10000 + mm * 100 + dd };
    })
    .filter((v): v is NonNullable<typeof v> => v !== null);
  if (links.length === 0) {
    fail("認可の受入可能児童数のPDFが見つかりません。ページの構成が変わった可能性があります。");
  }
  const latest = links.reduce((a, b) => (b.sortKey > a.sortKey ? b : a));
  console.log(`PDF: ${latest.text}`);

  const pdfRes = await fetch(latest.url, { headers: { "User-Agent": UA } });
  if (!pdfRes.ok) fail(`PDFが ${pdfRes.status} を返しました`);
  const tmp = path.join(os.tmpdir(), `daisen-${process.pid}.pdf`);
  fs.writeFileSync(tmp, Buffer.from(await pdfRes.arrayBuffer()));

  let parsed: { asOf: number[]; rows: PdfRow[] };
  try {
    parsed = JSON.parse(
      runPython([path.join("scripts", "daisen-pdf-extract.py"), tmp]),
    ) as typeof parsed;
  } finally {
    fs.rmSync(tmp, { force: true });
  }

  const [ry, rm, rd] = parsed.asOf;
  const asOf = `${ry + 2018}-${String(rm).padStart(2, "0")}-${String(rd).padStart(2, "0")}`;
  if (asOf > todayJst()) fail(`時点（${asOf}）が今日より先になっています`);
  if (rm !== latest.mm || rd !== latest.dd) {
    fail(
      `PDFの中の日付（${rm}月${rd}日）が、リンクの文字（${latest.mm}月${latest.dd}日）と違います`,
    );
  }
  console.log(`時点: ${asOf}`);

  const known = new Set(LEGEND.map((l) => l.mark));
  const facilities: {
    id: string;
    name: string;
    w: number | null;
    vacancy: (number | null)[];
    symbols: (string | null)[];
    note?: string;
  }[] = [];
  const wards: string[] = [];
  const seen = new Set<string>();
  const counts = new Map<string, number>();
  let area: string | null = null;

  for (const row of parsed.rows) {
    if (row.area) area = row.area;
    if (seen.has(row.name)) fail(`施設名が重複しています: ${row.name}`);
    seen.add(row.name);
    if (row.marks.length !== AGE_COUNT) fail(`${row.name}: 記号が${row.marks.length}個です`);
    for (const mark of row.marks) {
      if (mark === null) continue;
      if (!known.has(mark)) fail(`${row.name}: 凡例にない記号です（「${mark}」）`);
      counts.set(mark, (counts.get(mark) ?? 0) + 1);
    }
    let w: number | null = null;
    if (area) {
      if (!wards.includes(area)) wards.push(area);
      w = wards.indexOf(area);
    }
    facilities.push({
      id: row.name,
      name: row.name,
      w,
      vacancy: new Array(AGE_COUNT).fill(null),
      symbols: row.marks,
      ...(row.note ? { note: `市の備考: ${row.note}` } : {}),
    });
  }

  if (facilities.length < MIN_FACILITIES) {
    fail(`施設が${facilities.length}件しか取れていません（${MIN_FACILITIES}件以上のはず）`);
  }
  console.log(
    `${facilities.length}施設 ／ ${[...counts].map(([m, n]) => `${m}${n}`).join("・")} ／ 地域 ${wards.length}`,
  );

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
    `大仙市は空きを人数ではなく記号で公表しています。${asOf}時点のものです。`,
    `公式の凡例は ${LEGEND.map((l) => `「${l.mark}」${l.label}`).join("、")} です。`,
    "市は「入所を保証するものではありません」「多くの方から同様に申込みがあった場合、優先度の高い児童から入所の調整を行います」としています。",
    "市は「保育士等の職員の配置により、年齢別の定数が随時変動するため、受入可能状況も変わります」としています。",
    "設けていないクラスは「—」にしています。受入年齢が限られる園は、市の備考を施設ごとに載せています。",
    "市は認可外保育施設の受入可能児童数も別に公表しています。このページには載せていません。",
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
    subtitle: "認可保育施設の受入状況",
    notes,
    wards,
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
