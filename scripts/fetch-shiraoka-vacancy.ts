/**
 * 白岡市の保育所空き状況を取り込む
 *
 * 実行: npm run vacancy:fetch:shiraoka
 *
 * ## この自治体の特徴
 * - PDFではなく**ページの中のHTMLの表**で公表している
 * - 人数で公表。空らんは、そのクラスがない施設のもの
 * - **「1(1)」のように括弧つきの数がある**。括弧の中は仮内定者の人数で、
 *   空き人数ではない。空きの数だけを取り、仮内定者は注記に回す
 * - 時点は見出しの「【8月1日時点】」。年が書かれていないので、
 *   ページの更新日の年を使い、月がずれていないかを確かめる
 */

import fs from "node:fs";
import path from "node:path";

const MUNICIPALITY_SLUG = "shiraoka";
const MUNICIPALITY_NAME = "白岡市";
const SOURCE_NAME = "白岡市「保育所の空き状況」";
const INDEX_URL =
  "https://www.city.shiraoka.lg.jp/soshiki/kenkofukushibu/kodomohoikuka/2/2/935.html";
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
  return s
    .replace(/[０-９]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xfee0))
    .replace(/[（）]/g, (c) => (c === "（" ? "(" : ")"));
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

async function main() {
  console.log(`${MUNICIPALITY_NAME}の空き状況を取り込みます`);
  console.log(`公式ページ: ${INDEX_URL}\n`);

  const res = await fetch(INDEX_URL, { headers: { "User-Agent": UA }, redirect: "follow" });
  if (!res.ok) fail(`公式ページが ${res.status} を返しました`);
  const html = await res.text();
  const flat = toHalfWidth(html.replace(/<[^>]+>/g, "").replace(/[\s　]/g, ""));

  const updated = /更新日[：:](\d{4})年(\d{1,2})月(\d{1,2})日/.exec(flat);
  if (!updated) fail("ページから更新日を読み取れませんでした");

  // 見出しの「【8月1日時点】」には年がないので、更新日の年を当てる
  const point = /【(\d{1,2})月(\d{1,2})日時点】/.exec(flat);
  if (!point) fail("「【M月D日時点】」を読み取れませんでした");
  // 更新日は「08月」、見出しは「8月」のように書き方が違うので数で比べる
  if (Number(point[1]) !== Number(updated[2])) {
    fail(`時点の月（${point[1]}月）と更新日の月（${updated[2]}月）が違います`);
  }
  const asOf = `${updated[1]}-${point[1].padStart(2, "0")}-${point[2].padStart(2, "0")}`;
  if (asOf > todayJst()) fail(`時点の日付（${asOf}）が今日より先になっています`);
  console.log(`時点: ${asOf}（ページの更新日 ${updated[1]}年${updated[2]}月${updated[3]}日）`);

  const tables = [...html.matchAll(/<table[\s\S]*?<\/table>/gi)].map((m) => m[0]);
  if (tables.length !== 1) fail(`表が${tables.length}個あります（1個のはず）`);

  const rows = [...tables[0].matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi)].map((m) =>
    [...m[1].matchAll(/<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/gi)].map((c) => textOf(c[1]))
  );
  if (rows.length < 2) fail("表に行がありません");

  const head = rows[0];
  if (head.length !== AGE_COUNT + 1) fail(`列数が${head.length}です（${AGE_COUNT + 1}列のはず）`);
  if (head[0] !== "保育所") fail(`見出しが想定と違います: ${head.join(" / ")}`);
  for (let age = 0; age < AGE_COUNT; age++) {
    if (head[age + 1] !== `${age}歳児`) fail(`年齢の見出しが想定と違います: ${head.join(" / ")}`);
  }

  const facilities: {
    id: string;
    name: string;
    w: null;
    c: null;
    vacancy: (number | null)[];
  }[] = [];
  const seen = new Set<string>();
  const provisional: string[] = [];
  let numbers = 0;
  let blanks = 0;
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
      if (value === "") {
        blanks += 1;
        vacancy.push(null);
        continue;
      }
      // 「1(1)」は 空き1人・仮内定者1人
      const m = /^(\d+)(?:\((\d+)\))?$/.exec(value);
      if (!m) fail(`${name}: ${age}歳児が数字ではありません（「${value}」）`);
      if (m[2]) provisional.push(`${name}の${age}歳児に仮内定者${m[2]}人`);
      const count = Number(m[1]);
      if (count > 99) fail(`${name}: ${age}歳児の人数が多すぎます（${count}）`);
      numbers += 1;
      vacancyTotal += count;
      vacancy.push(count);
    }

    if (vacancy.every((v) => v === null)) fail(`${name}: 全ての年齢が空らんです`);
    facilities.push({ id: name, name, w: null, c: null, vacancy });
  }

  if (facilities.length < MIN_FACILITIES) {
    fail(`施設が${facilities.length}件しか取れていません（${MIN_FACILITIES}件以上のはず）`);
  }
  if (numbers + blanks !== facilities.length * AGE_COUNT) {
    fail(`欄の数が合いません（数値${numbers}＋空らん${blanks} / 施設${facilities.length}×${AGE_COUNT}）`);
  }
  console.log(`${facilities.length}施設を読み取りました（空き合計 ${vacancyTotal}人）`);

  const previous = fs.existsSync(OUT_PATH)
    ? (JSON.parse(fs.readFileSync(OUT_PATH, "utf-8")) as { asOf?: string; facilities?: unknown[]; sourceFiles?: Record<string, string> })
    : null;
  if (previous?.facilities && facilities.length < previous.facilities.length * 0.9) {
    fail(`施設数が大きく減っています（前回 ${previous.facilities.length}件 → 今回 ${facilities.length}件）`);
  }
  // 自治体は基準日を変えずに資料を差し替えることがある。
  // 取り込み元の一式も同じときだけ、書き換えを見送る
  if (
    previous?.asOf === asOf &&
    JSON.stringify(previous?.sourceFiles ?? {}) === JSON.stringify({ vacancy: INDEX_URL })
  ) {
    console.log(`公式データの時点が前回と同じ（${asOf}）のため更新はありません。`);
    return;
  }

  const notes = [
    `白岡市が公開しているのは${asOf}時点の空き状況です。`,
    "急な退所等により空き状況が変わる場合もあります。",
    "公式の表で空らんになっている年齢は「—」にしています。その年齢のクラスがないことを表しています。",
    ...(provisional.length
      ? [
          `公式の表では、空き人数のうしろの括弧の中に仮内定者の人数が書かれています（${provisional.join("、")}）。仮内定者より優先度が高い場合は内定となる可能性があります。当サイトでは括弧の外の空き人数だけを載せています。`,
        ]
      : []),
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
    subtitle: "市内認可保育所の空き状況",
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
