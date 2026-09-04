/**
 * 和光市の保育施設の募集人数を取り込む
 *
 * 実行: npm run vacancy:fetch:wako
 *
 * ## この自治体の特徴
 * - 公表しているのは「その月の選考で受け入れる募集人数」。
 *   横浜市のような「いまの空き」とは意味が違うので、見出しの下にそれを出す
 * - 1つのPDFに表が2つ（0〜2歳児と3〜5歳児）で、**1つの表に年齢が3つ横に並ぶ**
 * - 年齢ごとに「保育園計」「小規模計」「市内合計」の行があり、
 *   施設を足したものと突き合わせられる
 * - **その年齢にその施設が無い行は施設名の欄ごと空になる**ので、
 *   年齢ごとに出てくる施設が違う。当サイトでは載っていない年齢を「—」にする
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "wako";
const MUNICIPALITY_NAME = "和光市";
const PREFECTURE = "埼玉県";
const SOURCE_NAME = "和光市「保育所等募集人数」";
const INDEX_URL =
  "https://www.city.wako.lg.jp/kosodate/1000009/1009701/1003770/1003771/1003775.html";
const AGE_COUNT = 6;
const MIN_FACILITIES = 30;
const UA = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);

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
  return s.replace(/[０-９]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xfee0));
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

type PdfResult = {
  asOf: number[];
  target: number[];
  rows: { name: string; values: Record<string, number> }[];
  totals: Record<string, Record<string, number>>;
};

async function main(): Promise<void> {
  console.log(`${MUNICIPALITY_NAME}の募集人数を取り込みます`);
  console.log(`公式ページ: ${INDEX_URL}\n`);

  const res = await fetch(INDEX_URL, { headers: { "User-Agent": UA }, redirect: "follow" });
  if (!res.ok) fail(`公式ページが ${res.status} を返しました`);
  const html = await res.text();

  // 「2026年（令和8年）10月選考募集人数（PDF41.4KB）」
  const links = [...html.matchAll(/<a[^>]+href="([^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => ({ url: new URL(m[1], INDEX_URL).toString(), text: toHalfWidth(stripTags(m[2])) }))
    .map((l) => {
      const m = l.text.match(/(\d{4})年（令和\d+年）(\d{1,2})月選考募集人数/);
      if (!m) return null;
      const year = Number(m[1]);
      const month = Number(m[2]);
      return { ...l, year, month, sortKey: year * 100 + month };
    })
    .filter((v): v is NonNullable<typeof v> => v !== null);
  if (links.length === 0) {
    fail("選考募集人数のPDFが見つかりません。ページの構成が変わった可能性があります。");
  }
  const latest = links.reduce((a, b) => (b.sortKey > a.sortKey ? b : a));
  console.log(`PDF: ${latest.text}\n  ${latest.url}`);

  const pdfRes = await fetch(latest.url, { headers: { "User-Agent": UA } });
  if (!pdfRes.ok) fail(`PDFが ${pdfRes.status} を返しました`);
  const tmp = path.join(os.tmpdir(), `wako-${process.pid}.pdf`);
  fs.writeFileSync(tmp, Buffer.from(await pdfRes.arrayBuffer()));

  let parsed: PdfResult;
  try {
    parsed = JSON.parse(runPython([path.join("scripts", "wako-pdf-extract.py"), tmp])) as PdfResult;
  } finally {
    fs.rmSync(tmp, { force: true });
  }

  const [ry, rm, rd] = parsed.asOf;
  const asOf = `${ry + 2018}-${String(rm).padStart(2, "0")}-${String(rd).padStart(2, "0")}`;
  if (asOf > todayJst()) fail(`時点（${asOf}）が今日より先になっています`);
  const targetLabel = `${parsed.target[0] + 2018}年${parsed.target[1]}月`;
  if (parsed.target[1] !== latest.month) {
    fail(`PDFの対象月（${parsed.target[1]}月）がリンクの文字（${latest.month}月）と違います`);
  }
  console.log(`時点: ${asOf} ／ 対象: ${targetLabel}選考`);

  const facilities: {
    id: string;
    name: string;
    w: null;
    vacancy: (number | null)[];
  }[] = [];
  const seen = new Set<string>();
  const built = Array.from({ length: AGE_COUNT }, () => 0);

  for (const row of parsed.rows) {
    if (seen.has(row.name)) fail(`施設名が重複しています: ${row.name}`);
    seen.add(row.name);
    const vacancy: (number | null)[] = [];
    for (let age = 0; age < AGE_COUNT; age++) {
      const v = row.values[String(age)];
      if (v === undefined) {
        vacancy.push(null);
        continue;
      }
      vacancy.push(v);
      built[age] += v;
    }
    if (vacancy.every((v) => v === null)) fail(`${row.name}: どの年齢にも数がありません`);
    facilities.push({ id: row.name, name: row.name, w: null, vacancy });
  }

  if (facilities.length < MIN_FACILITIES) {
    fail(`施設が${facilities.length}件しか取れていません（${MIN_FACILITIES}件以上のはず）`);
  }

  // 年齢ごとの「計」の行と突き合わせる
  for (let age = 0; age < AGE_COUNT; age++) {
    const t = parsed.totals[String(age)];
    if (!t) fail(`${age}歳児の「計」の行が見つかりません。検算ができないので中断します。`);
    // 「市内合計」があればそれ、無ければ節ごとの計を足す
    const declared =
      t["市内合計"] ?? Object.entries(t).reduce((a, [k, v]) => (k.endsWith("計") ? a + v : a), 0);
    if (declared !== built[age]) {
      fail(`${age}歳児: 公式の計が${declared}なのに積み上げが${built[age]}です`);
    }
  }
  console.log(`${facilities.length}施設 ／ 募集${built.reduce((a, b) => a + b, 0)}人（計の行と一致）`);

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
    `和光市が公表しているのは${targetLabel}選考の募集人数で、${asOf}時点のものです。「いまの空き」ではなく、その月の選考で受け入れる枠の数です。`,
    "市は「募集人数が生じていない保育施設についても、申込後に退所や転所により新たに空きが生じる場合がありますので、募集人数の状況にかかわらず、希望する施設はすべてお申し込みください」としています。",
    "市の資料に載っていない年齢は「—」にしています。その施設がそのクラスを設けていないことを表します。",
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
    metrics: ["vacancy"],
    subtitle: `${targetLabel}選考の募集人数`,
    notes,
    wards: [] as string[],
    categories: [] as string[],
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
