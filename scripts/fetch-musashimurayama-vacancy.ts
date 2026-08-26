/**
 * 武蔵村山市の保育所等募集状況を取り込む
 *
 * 実行: npm run vacancy:fetch:musashimurayama
 *
 * ## この自治体の特徴
 * - PDFではなく**ページの中のHTMLの表**で公表している
 * - 人数（募集人数）で公表。「―」「ー」はそのクラスがないことを表す
 * - 「令和8年9月入所 募集状況（8月8日現在）」の見出しがタグで細かく割れているので、
 *   タグを外してつないでから読む
 */

import fs from "node:fs";
import path from "node:path";

const MUNICIPALITY_SLUG = "musashimurayama";
const MUNICIPALITY_NAME = "武蔵村山市";
const SOURCE_NAME = "武蔵村山市「保育所等募集状況一覧表」";
const INDEX_URL = "https://www.city.musashimurayama.lg.jp/kosodate/azukeru/1012423/1003790.html";
const AGE_COUNT = 6;
const MIN_FACILITIES = 12;
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

function toHalfWidth(s: string): string {
  return s.replace(/[０-９]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xfee0));
}

/** タグと空白と実体参照を落として、中身だけを取り出す */
function textOf(html: string): string {
  return toHalfWidth(
    html
      .replace(/<[^>]+>/g, "")
      .replace(/&nbsp;/g, " ")
      .replace(/&amp;/g, "&")
      .replace(/[\s　]/g, "")
  );
}

function reiwaToYear(reiwa: number): number {
  return reiwa + 2018;
}

async function main() {
  console.log(`${MUNICIPALITY_NAME}の空き状況を取り込みます`);
  console.log(`公式ページ: ${INDEX_URL}\n`);

  const res = await fetch(INDEX_URL, { headers: { "User-Agent": UA }, redirect: "follow" });
  if (!res.ok) fail(`公式ページが ${res.status} を返しました`);
  const html = await res.text();
  const flat = toHalfWidth(html.replace(/<[^>]+>/g, "").replace(/[\s　]/g, ""));

  const updated = /更新日令和(\d+)年(\d{1,2})月(\d{1,2})日/.exec(flat);
  if (!updated) fail("ページから更新日を読み取れませんでした");

  // 「令和8年9月入所募集状況（8月8日現在）」
  const point = /令和(\d+)年(\d{1,2})月入所募集状況[（(](\d{1,2})月(\d{1,2})日現在[）)]/.exec(flat);
  if (!point) fail("「令和N年M月入所募集状況（M月D日現在）」を読み取れませんでした");

  const updatedYear = reiwaToYear(Number(updated[1]));
  const pointMonth = Number(point[3]);
  // 現在の日付は更新日と同じ月のはず（年をまたぐ場合は更新日の年をそのまま使う）
  if (pointMonth !== Number(updated[2])) {
    fail(`「${pointMonth}月${point[4]}日現在」と更新日（${updated[2]}月）が食い違っています`);
  }
  const asOf = `${updatedYear}-${String(pointMonth).padStart(2, "0")}-${point[4].padStart(2, "0")}`;
  if (asOf > todayJst()) fail(`時点の日付（${asOf}）が今日より先になっています`);
  const targetLabel = `${reiwaToYear(Number(point[1]))}年${point[2]}月`;
  console.log(`時点: ${asOf} ／ 対象: ${targetLabel}入所`);

  const tables = [...html.matchAll(/<table[\s\S]*?<\/table>/gi)].map((t) => t[0]);
  if (tables.length !== 1) fail(`表が${tables.length}個あります（1個のはず）`);

  const rows = [...tables[0].matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi)].map((r) =>
    [...r[1].matchAll(/<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/gi)].map((c) => textOf(c[1]))
  );
  if (rows.length < 2) fail("表に行がありません");

  const head = rows[0];
  if (head.length !== AGE_COUNT + 1) fail(`列数が${head.length}です（${AGE_COUNT + 1}列のはず）`);
  if (head[0] !== "保育所名") fail(`見出しが想定と違います: ${head.join(" / ")}`);
  for (let age = 0; age < AGE_COUNT; age++) {
    if (head[age + 1] !== `${age}歳`) fail(`年齢の見出しが想定と違います: ${head.join(" / ")}`);
  }

  const facilities: {
    id: string;
    name: string;
    w: null;
    c: null;
    vacancy: (number | null)[];
  }[] = [];
  const seen = new Set<string>();
  let vacancyTotal = 0;

  for (const values of rows.slice(1)) {
    if (values.length !== AGE_COUNT + 1) {
      fail(`列数が${values.length}の行があります（${AGE_COUNT + 1}列のはず）`);
    }
    const name = values[0];
    if (!name) fail("施設名が空の行があります");
    if (seen.has(name)) fail(`施設名が重複しています: ${name}`);
    seen.add(name);

    const vacancy: (number | null)[] = [];
    for (let age = 0; age < AGE_COUNT; age++) {
      const value = values[age + 1];
      // 「―」「ー」はそのクラスがないことを表す
      if (value === "" || /^[-－—―ー]$/.test(value)) {
        vacancy.push(null);
        continue;
      }
      if (!/^\d+$/.test(value)) fail(`${name}: ${age}歳が数字ではありません（「${value}」）`);
      const count = Number(value);
      if (count > 99) fail(`${name}: ${age}歳の人数が多すぎます（${count}）`);
      vacancyTotal += count;
      vacancy.push(count);
    }

    if (vacancy.every((v) => v === null)) fail(`${name}: 全ての年齢が空らんです`);
    facilities.push({ id: name, name, w: null, c: null, vacancy });
  }

  if (facilities.length < MIN_FACILITIES) {
    fail(`施設が${facilities.length}件しか取れていません（${MIN_FACILITIES}件以上のはず）`);
  }
  console.log(`${facilities.length}施設を読み取りました（募集人数の合計 ${vacancyTotal}人）`);

  const previous = fs.existsSync(OUT_PATH)
    ? (JSON.parse(fs.readFileSync(OUT_PATH, "utf-8")) as { asOf?: string; facilities?: unknown[] })
    : null;
  if (previous?.facilities && facilities.length < previous.facilities.length * 0.9) {
    fail(`施設数が大きく減っています（前回 ${previous.facilities.length}件 → 今回 ${facilities.length}件）`);
  }
  if (previous?.asOf === asOf) {
    console.log(`公式データの時点が前回と同じ（${asOf}）のため更新はありません。`);
    return;
  }

  const notes = [
    `武蔵村山市が公開しているのは${targetLabel}入所の募集人数で、${asOf}時点のものです。`,
    "募集状況については随時変更となりますので、最新の状況は子ども育成課へお問い合わせください。",
    "公式の表で「―」になっている年齢は「—」にしています。その年齢のクラスがないことを表しています。",
  ];

  const dataset = {
    municipalitySlug: MUNICIPALITY_SLUG,
    municipalityName: MUNICIPALITY_NAME,
    asOf,
    fetchedAt: todayJst(),
    sourceName: SOURCE_NAME,
    sourceUrl: INDEX_URL,
    sourceFiles: { vacancy: INDEX_URL },
    metrics: ["vacancy"],
    subtitle: `${targetLabel}入所の募集人数`,
    notes,
    wards: [],
    categories: [],
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
