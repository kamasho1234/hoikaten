/**
 * 豊後高田市の保育園の空き情報を取り込む
 *
 * 実行: npm run vacancy:fetch:bungotakada
 *
 * ## この自治体の特徴
 * - 公式ページのHTMLの表をそのまま読む。0歳〜5歳の人数と合計を出している
 * - **2つの園（香々地保育園・あすなろほいくえん）だけ、年齢別ではなく
 *   横に結合した1つの欄に「若干名」と書かれている。**
 *   人数が分からないので年齢別は「—」にし、施設の備考にそのまま残す
 * - 合計欄があるので、年齢別の和と突き合わせて読み違いを見つける
 */

import fs from "node:fs";
import path from "node:path";

const MUNICIPALITY_SLUG = "bungotakada";
const MUNICIPALITY_NAME = "豊後高田市";
const PREFECTURE = "大分県";
const SOURCE_NAME = "豊後高田市「豊後高田市内の保育園の空き情報」";
const SOURCE_URL = "https://www.city.bungotakada.oita.jp/site/kosodate-kyoiku/1546.html";
const AGE_COUNT = 6;
const MIN_FACILITIES = 6;
const UA = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);

/** 年齢別の内訳がなく、横に結合した欄に書かれる言葉 */
const FEW = "若干名";

function fail(message: string): never {
  console.error(`\n[中断] ${message}`);
  process.exit(1);
}

function todayJst(): string {
  const jst = new Date(Date.now() + 9 * 60 * 60 * 1000);
  return jst.toISOString().slice(0, 10);
}

function text(html: string): string {
  return html
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#(\d+);/g, (_, d) => String.fromCharCode(Number(d)))
    .replace(/&amp;/g, "&")
    .replace(/[\s　]/g, "");
}

function toHalfWidth(s: string): string {
  return s.replace(/[０-９]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xfee0));
}

/** セルを、中身と colspan の組で返す */
function cells(rowHtml: string): { value: string; span: number }[] {
  return [...rowHtml.matchAll(/<t[dh]([^>]*)>([\s\S]*?)<\/t[dh]>/gi)].map((m) => {
    const span = /colspan="?(\d+)"?/i.exec(m[1]);
    return { value: toHalfWidth(text(m[2])), span: span ? Number(span[1]) : 1 };
  });
}

async function main(): Promise<void> {
  console.log(`${MUNICIPALITY_NAME}の空き状況を取り込みます`);
  console.log(`公式ページ: ${SOURCE_URL}\n`);

  const res = await fetch(SOURCE_URL, { headers: { "User-Agent": UA }, redirect: "follow" });
  if (!res.ok) fail(`公式ページが ${res.status} を返しました`);
  const html = await res.text();
  const flat = toHalfWidth(text(html));

  const updated = /更新日[：:](\d{4})年(\d{1,2})月(\d{1,2})日/.exec(flat);
  if (!updated) fail("「更新日：YYYY年M月D日」を読み取れませんでした");
  const asOf = `${updated[1]}-${updated[2].padStart(2, "0")}-${updated[3].padStart(2, "0")}`;
  if (asOf > todayJst()) fail(`更新日（${asOf}）が今日より先になっています`);

  const target = /令和(\d+)年(\d{1,2})月空き情報/.exec(flat);
  if (!target) fail("「令和N年M月空き情報」の見出しを読み取れませんでした");
  const targetLabel = `${Number(target[1]) + 2018}年${Number(target[2])}月`;

  const table = /<table[\s\S]*?<\/table>/i.exec(html);
  if (!table) fail("空き状況の表が見つかりません");
  const rows = [...table[0].matchAll(/<tr[\s\S]*?<\/tr>/gi)].map((r) => cells(r[0]));

  const head = rows[0]?.map((c) => c.value) ?? [];
  if (head[0] !== "保育園名" || head.length !== AGE_COUNT + 2) {
    fail(`見出しが想定と違います: ${head.join(",")}`);
  }
  for (let age = 0; age < AGE_COUNT; age++) {
    if (head[1 + age] !== `${age}歳`) fail(`年齢の見出しが想定と違います: ${head.join(",")}`);
  }
  if (head[AGE_COUNT + 1] !== "合計") fail(`合計の見出しがありません: ${head.join(",")}`);

  const facilities: {
    id: string;
    name: string;
    w: null;
    vacancy: (number | null)[];
    note?: string;
  }[] = [];
  const seen = new Set<string>();
  let fewCount = 0;
  let total = 0;

  for (const row of rows.slice(1)) {
    const name = row[0]?.value;
    if (!name) continue;
    if (seen.has(name)) fail(`施設名が重複しています: ${name}`);
    seen.add(name);

    // 年齢別の内訳がなく、横に結合した1つの欄になっている園
    if (row.length === 2 && row[1].span >= AGE_COUNT) {
      if (row[1].value !== FEW) {
        fail(`${name}: 結合された欄が「${FEW}」ではありません（「${row[1].value}」）`);
      }
      fewCount += 1;
      facilities.push({
        id: name,
        name,
        w: null,
        vacancy: new Array(AGE_COUNT).fill(null),
        note: `市は年齢別に分けず「${FEW}」とだけ公表しています`,
      });
      continue;
    }

    if (row.length !== AGE_COUNT + 2) {
      fail(`${name}: 欄が${row.length - 1}個です（${AGE_COUNT + 1}個のはず）`);
    }
    const vacancy: (number | null)[] = [];
    for (let age = 0; age < AGE_COUNT; age++) {
      const raw = row[1 + age].value;
      if (!/^\d+$/.test(raw)) fail(`${name}: ${age}歳の欄が数字ではありません（「${raw}」）`);
      vacancy.push(Number(raw));
    }
    // 合計欄と突き合わせる。ずれていたら読み違えている
    const sumRaw = row[AGE_COUNT + 1].value;
    if (!/^\d+$/.test(sumRaw)) fail(`${name}: 合計欄が数字ではありません（「${sumRaw}」）`);
    const sum = vacancy.reduce((a: number, b) => a + (b ?? 0), 0);
    if (sum !== Number(sumRaw)) {
      fail(`${name}: 年齢別の和（${sum}）が公式の合計（${sumRaw}）と合いません`);
    }
    total += sum;
    facilities.push({ id: name, name, w: null, vacancy });
  }

  if (facilities.length < MIN_FACILITIES) {
    fail(`施設が${facilities.length}件しか取れていません（${MIN_FACILITIES}件以上のはず）`);
  }
  console.log(`${facilities.length}施設 ／ 空き合計${total}人・「${FEW}」${fewCount}件`);

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
    JSON.stringify(previous?.sourceFiles ?? {}) === JSON.stringify({ vacancy: SOURCE_URL })
  ) {
    console.log(`公式データの時点が前回と同じ（${asOf}）のため更新はありません。`);
    return;
  }

  const notes = [
    `これは${targetLabel}入所ぶんの空き情報で、${asOf}に更新されたものです。`,
    `香々地保育園とあすなろほいくえんは、市が年齢別に分けず「${FEW}」とだけ公表しています。年齢別は「—」にし、施設の備考に残しています。`,
    "市は「空き状況は、公開日時点の情報です。実際の空き状況は変わることがあります」としています（園児の退園、保育士の確保による増、保育士の離職による減など）。",
  ];

  const dataset = {
    municipalitySlug: MUNICIPALITY_SLUG,
    municipalityName: MUNICIPALITY_NAME,
    prefecture: PREFECTURE,
    asOf,
    fetchedAt: todayJst(),
    sourceName: SOURCE_NAME,
    sourceUrl: SOURCE_URL,
    sourceFiles: { vacancy: SOURCE_URL },
    metrics: ["vacancy"],
    subtitle: `${targetLabel}入所ぶんの空き情報`,
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
