/**
 * 沼津市の保育園等の空き状況を取り込む
 *
 * 実行: npm run vacancy:fetch:numazu
 *
 * ## この自治体の特徴
 * - PDFではなく**ページのHTMLの表**で公開している
 * - 見出し（保育所／認定こども園／小規模保育事業／幼稚園）ごとに表が並ぶ。
 *   保育所と認定こども園は公立・私立で表が2つに分かれている
 * - **幼稚園の表には空き情報がない**（所在地と電話番号だけ）ので取り込まない
 * - 値は記号ではなく言葉。「若干名」＝空きあり、「無」＝空きなし、
 *   「設置無（※）」＝その歳児のクラスを設置していない（本文の※で説明されている）
 * - 小規模保育事業の表は0歳児〜2歳児の3列だけ
 */

import fs from "node:fs";
import path from "node:path";

const MUNICIPALITY_SLUG = "numazu";
const MUNICIPALITY_NAME = "沼津市";
const SOURCE_NAME = "沼津市子育てポータルサイト「保育園等の募集情報」";
const INDEX_URL =
  "https://www.city.numazu.shizuoka.jp/kurashi/kyoiku/kosodate/azukeru/bosyumap.htm";
const AGE_COUNT = 6;
const MIN_FACILITIES = 35;
const UA = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";

/** 空きの表し方。公式は記号ではなく言葉で書いている */
const OPEN = "若干名";
const CLOSED = "無";
/** その歳児のクラスを設置していない */
const NOT_SET = /^設置無/;

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);

function fail(message: string): never {
  console.error(`\n[中断] ${message}`);
  process.exit(1);
}

function todayJst(): string {
  const jst = new Date(Date.now() + 9 * 60 * 60 * 1000);
  return jst.toISOString().slice(0, 10);
}

function stripTags(s: string): string {
  return s.replace(/<[^>]+>/g, " ");
}

function decode(s: string): string {
  return s
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)));
}

function squeeze(s: string): string {
  return decode(stripTags(s ?? "")).replace(/[\s　]/g, "");
}

function toHalfWidth(s: string): string {
  return s.replace(/[０-９]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xfee0));
}

type Table = { heading: string; head: string[]; rows: string[][] };

/** ページから、見出しつきの表を出てくる順に取り出す */
function readTables(html: string): Table[] {
  const out: Table[] = [];
  let heading = "";
  const pattern = /<h[2-4][^>]*>([\s\S]*?)<\/h[2-4]>|<table[\s\S]*?<\/table>/gi;
  for (const m of html.matchAll(pattern)) {
    const chunk = m[0];
    if (!/^<table/i.test(chunk)) {
      const text = squeeze(m[1] ?? "");
      if (text) heading = text;
      continue;
    }
    const rows = [...chunk.matchAll(/<tr[\s\S]*?<\/tr>/gi)].map((r) =>
      [...r[0].matchAll(/<t[hd][\s\S]*?<\/t[hd]>/gi)].map((c) => squeeze(c[0]))
    );
    if (rows.length < 2) continue;
    out.push({ heading, head: rows[0], rows: rows.slice(1) });
  }
  return out;
}

async function main() {
  console.log(`${MUNICIPALITY_NAME}の空き状況を取り込みます`);
  console.log(`公式ページ: ${INDEX_URL}\n`);

  const res = await fetch(INDEX_URL, { headers: { "User-Agent": UA } });
  if (!res.ok) fail(`公式ページが ${res.status} を返しました`);
  const html = await res.text();
  const flat = toHalfWidth(squeeze(html));

  // 「各施設の空き情報は、令和8年8月1日現在（9月選考）のものです。」
  const m = /令和(\d+)年(\d+)月(\d+)日現在[（(](\d+)月選考/.exec(flat);
  if (!m) fail("「令和N年M月D日現在（M月選考）」を読み取れませんでした");
  const asOf = `${Number(m[1]) + 2018}-${m[2].padStart(2, "0")}-${m[3].padStart(2, "0")}`;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(asOf)) fail(`時点の日付を組み立てられません: ${asOf}`);
  if (asOf > todayJst()) fail(`時点の日付（${asOf}）が今日より先になっています`);
  const targetMonth = Number(m[4]);
  console.log(`時点: ${asOf} ／ 対象: ${targetMonth}月選考`);

  const tables = readTables(html);
  if (tables.length < 4) fail(`表が${tables.length}個しかありません`);

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
  let notSet = 0;
  let usedTables = 0;

  for (const table of tables) {
    // 年齢の見出しを持つ表だけを見る（幼稚園の表は所在地と電話番号だけ）
    const ages = table.head.filter((h) => /^\d歳児$/.test(h));
    if (ages.length === 0 || table.head[0] !== "園名") continue;
    if (ages.length !== table.head.length - 1) {
      fail(`${table.heading}: 見出しが想定と違います（${table.head.join("／")}）`);
    }
    usedTables += 1;

    const category = table.heading;
    if (!category) fail("見出しのない表があります");
    let c = categories.indexOf(category);
    if (c < 0) {
      categories.push(category);
      c = categories.length - 1;
    }

    for (const row of table.rows) {
      const name = row[0];
      if (!name) continue;
      if (seen.has(name)) fail(`園名が重複しています: ${name}`);
      seen.add(name);
      if (row.length !== table.head.length) {
        fail(`${name}: 欄の数が${row.length}です（${table.head.length}のはず）`);
      }

      const symbols: (string | null)[] = new Array(AGE_COUNT).fill(null);
      for (let i = 0; i < ages.length; i++) {
        const age = Number(ages[i][0]);
        const value = row[i + 1];
        if (NOT_SET.test(value)) {
          notSet += 1;
          continue;
        }
        if (value !== OPEN && value !== CLOSED) {
          fail(`${name}: ${age}歳児の値を読めません（「${value}」）`);
        }
        marks.set(value, (marks.get(value) ?? 0) + 1);
        symbols[age] = value;
      }
      if (symbols.every((s) => s === null)) fail(`${name}: 全ての年齢にクラスがありません`);

      facilities.push({
        id: name,
        name,
        w: null,
        c,
        vacancy: new Array(AGE_COUNT).fill(null),
        symbols,
      });
    }
  }

  if (usedTables < 4) fail(`空き状況の表が${usedTables}個しかありません`);
  if (facilities.length < MIN_FACILITIES) {
    fail(`施設が${facilities.length}件しか取れていません（${MIN_FACILITIES}件以上のはず）`);
  }

  // 検算: ページに出てくる「若干名」「無」「設置無」の数と照合する
  const bodyOnly = html.slice(html.indexOf("<table"));
  const printedOpen = (bodyOnly.match(new RegExp(`>\\s*${OPEN}\\s*<`, "g")) ?? []).length;
  const printedNotSet = (bodyOnly.match(/>\s*設置無/g) ?? []).length;
  if ((marks.get(OPEN) ?? 0) !== printedOpen) {
    fail(`「${OPEN}」の数が合いません（ページ ${printedOpen} / 取り込み ${marks.get(OPEN)}）`);
  }
  if (notSet !== printedNotSet) {
    fail(`「設置無」の数が合いません（ページ ${printedNotSet} / 取り込み ${notSet}）`);
  }
  console.log(
    `「${OPEN}」${marks.get(OPEN)}件・「${CLOSED}」${marks.get(CLOSED)}件・設置無${notSet}件がページの表記と一致しました`
  );

  const symbolLegend = [
    { mark: OPEN, label: "若干名の空きあり", open: true },
    { mark: CLOSED, label: "空きなし", open: false },
  ];

  const previous = fs.existsSync(OUT_PATH)
    ? (JSON.parse(fs.readFileSync(OUT_PATH, "utf-8")) as { asOf?: string; facilities?: unknown[]; sourceFiles?: Record<string, string> })
    : null;
  if (previous?.facilities && facilities.length < previous.facilities.length * 0.9) {
    fail(
      `施設数が大きく減っています（前回 ${previous.facilities.length}件 → 今回 ${facilities.length}件）`
    );
  }
  // 自治体は基準日を変えずに資料を差し替えることがある。
  // 取り込み元の一式も同じときだけ、書き換えを見送る
  if (
    previous?.asOf === asOf &&
    JSON.stringify(previous?.sourceFiles ?? {}) === JSON.stringify({ vacancy: INDEX_URL }) &&
    JSON.stringify(previous?.facilities ?? null) === JSON.stringify(facilities)
  ) {
    console.log(`公式データの時点が前回と同じ（${asOf}）のため更新はありません。`);
    return;
  }

  const notes = [
    `沼津市は空き状況を人数ではなく「${OPEN}」「${CLOSED}」で公表しています。これは${asOf}時点（${targetMonth}月選考）のものです。`,
    "年齢はその年度の4月1日現在の年齢（クラス年齢）です。年度途中に誕生日がきてもクラス年齢は変わりません。",
    "入園内定者の辞退や在園児の退園、保育士の確保などにより、空き情報は変わることがあります。",
    "公式の表で「設置無」となっている年齢は「—」にしています。その歳児のクラスを設置していないことを表しています。",
    "認定こども園の空き情報は保育園部のみのものです。幼稚園部については各施設にお問い合わせください。",
  ];

  const dataset = {
    municipalitySlug: MUNICIPALITY_SLUG,
    municipalityName: MUNICIPALITY_NAME,
    asOf,
    fetchedAt: todayJst(),
    sourceName: SOURCE_NAME,
    sourceUrl: INDEX_URL,
    sourceFiles: { vacancy: INDEX_URL },
    metrics: ["symbol"],
    subtitle: `${targetMonth}月選考の空き状況`,
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
  console.log(`  ${facilities.length}施設 / 設置無 ${notSet}`);
  console.log(
    `  種類ごとの数: ${categories
      .map((name, i) => `${name} ${facilities.filter((f) => f.c === i).length}`)
      .join(" / ")}`
  );
}

main().catch((err) => fail(String(err)));
