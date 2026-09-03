/**
 * 伊豆市の認定こども園・保育園の空き状況を取り込む
 *
 * 実行: npm run vacancy:fetch:izu
 *
 * ## この自治体の特徴
 * - **Excel（xlsx）で公表している。**認定こども園と保育園で表が分かれ、
 *   その間に空の行が入る
 * - 空きは人数ではなく記号（◎余裕あり5人以上／〇若干名3〜4人／△残りわずか1〜2人）。
 *   これに加えて「要相談」が入る。市は「園の状況によっては受入れが可能な場合もあります」
 *   としているので、公式の言葉のまま出す
 * - **「空き」の意味が独特**で、市は「［9月入園受入可能枠］から［9月入園内定者］を
 *   引いた空き状況」と書いている。見出しの下にそれを出す
 * - 表題に対象月（令和8年10月入園）が入る。基準日は書かれていないので、
 *   Excelの公開日（Last-Modified）を時点として使う
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "izu";
const MUNICIPALITY_NAME = "伊豆市";
const PREFECTURE = "静岡県";
const SOURCE_NAME = "伊豆市「市内認定こども園・保育園空き状況」";
const INDEX_URL = "https://www.city.izu.shizuoka.jp/kosodate_kyoiku/2/1/5728.html";
const AGE_COUNT = 6;
const MIN_FACILITIES = 5;
const UA = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);

const LEGEND = [
  { mark: "◎", label: "余裕あり（5人以上）", open: true },
  { mark: "〇", label: "若干名（3〜4人）", open: true },
  { mark: "△", label: "残りわずか（1〜2人）", open: true },
  { mark: "要相談", label: "園の状況によっては受入れが可能な場合もあります", open: false },
];

function fail(message: string): never {
  console.error(`\n[中断] ${message}`);
  process.exit(1);
}

function todayJst(): string {
  const jst = new Date(Date.now() + 9 * 60 * 60 * 1000);
  return jst.toISOString().slice(0, 10);
}

function squeeze(s: unknown): string {
  return String(s ?? "").replace(/[\s　]/g, "");
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
      fail(`Excelの抽出に失敗しました（${bin}）: ${e.stderr || e.message}`);
    }
  }
  fail(`Pythonを実行できません（${lastError}）。openpyxl が入った python が必要です。`);
}

function toHalfWidth(s: string): string {
  return s.replace(/[０-９]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xfee0));
}

async function main(): Promise<void> {
  console.log(`${MUNICIPALITY_NAME}の空き状況を取り込みます`);
  console.log(`公式ページ: ${INDEX_URL}\n`);

  const res = await fetch(INDEX_URL, { headers: { "User-Agent": UA }, redirect: "follow" });
  if (!res.ok) fail(`公式ページが ${res.status} を返しました`);
  const html = await res.text();

  const links = [...html.matchAll(/<a[^>]+href="([^"]+\.xlsx?)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => ({
      url: new URL(m[1], INDEX_URL).toString(),
      text: toHalfWidth(squeeze(m[2].replace(/<[^>]+>/g, ""))),
    }))
    .filter((l) => l.text.includes("空き状況"));
  if (links.length !== 1) {
    fail(
      `空き状況のExcelが${links.length}本あります（1本のはず）: ${links.map((l) => l.text).join(" / ")}`,
    );
  }
  console.log(`Excel: ${links[0].text}\n  ${links[0].url}`);

  const xlsxRes = await fetch(links[0].url, { headers: { "User-Agent": UA } });
  if (!xlsxRes.ok) fail(`Excelが ${xlsxRes.status} を返しました`);
  const lastModified = xlsxRes.headers.get("last-modified");
  if (!lastModified) fail("Excelの公開日（Last-Modified）が取れませんでした");
  const published = new Date(lastModified);
  const jst = new Date(published.getTime() + 9 * 60 * 60 * 1000);
  const asOf = jst.toISOString().slice(0, 10);
  if (asOf > todayJst()) fail(`公開日（${asOf}）が今日より先になっています`);

  const tmp = path.join(os.tmpdir(), `izu-${process.pid}.xlsx`);
  fs.writeFileSync(tmp, Buffer.from(await xlsxRes.arrayBuffer()));
  let parsed: { target: number[]; rows: { category: string; name: string; values: string[] }[] };
  try {
    parsed = JSON.parse(runPython([path.join("scripts", "izu-xlsx-extract.py"), tmp])) as typeof parsed;
  } finally {
    fs.rmSync(tmp, { force: true });
  }
  const targetLabel = `${parsed.target[0] + 2018}年${parsed.target[1]}月`;

  const known = new Set(LEGEND.map((l) => l.mark));
  const categories: string[] = [];
  const facilities: {
    id: string;
    name: string;
    w: null;
    c: number;
    vacancy: (number | null)[];
    symbols: (string | null)[];
  }[] = [];
  const seen = new Set<string>();
  const counts = new Map<string, number>();
  for (const row of parsed.rows) {
    if (!categories.includes(row.category)) categories.push(row.category);
    if (seen.has(row.name)) fail(`施設名が重複しています: ${row.name}`);
    seen.add(row.name);
    if (row.values.length !== AGE_COUNT) {
      fail(`${row.name}: 年齢の欄が${row.values.length}個です`);
    }
    const symbols: (string | null)[] = [];
    for (const raw of row.values) {
      const text = squeeze(raw);
      if (!text) {
        symbols.push(null);
        continue;
      }
      const mark = text.replace(/^※/, "");
      if (!known.has(mark)) fail(`${row.name}: 凡例にない記号です（「${raw}」）`);
      counts.set(mark, (counts.get(mark) ?? 0) + 1);
      symbols.push(mark);
    }
    facilities.push({
      id: row.name,
      name: row.name,
      w: null,
      c: categories.indexOf(row.category),
      vacancy: new Array(AGE_COUNT).fill(null),
      symbols,
    });
  }

  if (facilities.length < MIN_FACILITIES) {
    fail(`施設が${facilities.length}件しか取れていません（${MIN_FACILITIES}件以上のはず）`);
  }
  console.log(
    `${facilities.length}施設 ／ ${[...counts].map(([k, v]) => `${k}${v}`).join("・")} ／ ${categories.join("・")}`,
  );

  const previous = fs.existsSync(OUT_PATH)
    ? (JSON.parse(fs.readFileSync(OUT_PATH, "utf-8")) as { asOf?: string; facilities?: unknown[] })
    : null;
  if (previous?.facilities && facilities.length < previous.facilities.length * 0.9) {
    fail(
      `施設数が大きく減っています（前回 ${previous.facilities.length}件 → 今回 ${facilities.length}件）`,
    );
  }
  if (previous?.asOf === asOf) {
    console.log(`公式データの時点が前回と同じ（${asOf}）のため更新はありません。`);
    return;
  }

  const notes = [
    `伊豆市は空きを人数ではなく記号で公表しています。これは${targetLabel}入園ぶんです。`,
    `公式の凡例は ${LEGEND.slice(0, 3).map((l) => `「${l.mark}」${l.label}`).join("、")} です。`,
    "市は「この表は、前月入園の受入可能枠から前月入園の内定者を引いた空き状況です」としています。いまの空き数そのものではありません。",
    "「要相談」は市の表記のままです。市は「園の状況によっては受入れが可能な場合もあります」「申し込んでいただくことは可能です」としています。",
    "市の資料に基準日が書かれていないため、当サイトでは資料が公開された日を時点として載せています。",
    "市は「保育士の配置状況や在園児の状況等により、空き状況は変動します」「空きのある園への入所を約束するものではありません」としています。",
  ];

  const dataset = {
    municipalitySlug: MUNICIPALITY_SLUG,
    municipalityName: MUNICIPALITY_NAME,
    prefecture: PREFECTURE,
    asOf,
    fetchedAt: todayJst(),
    sourceName: SOURCE_NAME,
    sourceUrl: INDEX_URL,
    sourceFiles: { vacancy: links[0].url },
    metrics: ["symbol"],
    subtitle: `${targetLabel}入園ぶんの空き状況`,
    notes,
    wards: [] as string[],
    categories,
    symbolLegend: LEGEND.filter((l) => counts.has(l.mark)),
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
