/**
 * 蓮田市の保育所等の空き状況を取り込む
 *
 * 実行: npm run vacancy:fetch:hasuda
 *
 * ## この自治体の特徴
 * - PDFではなく**ページの中のHTMLの表**で公表している。区分ごとに表が分かれ、
 *   その直前の見出し（h2/h3）が区分の名前になる（認定こども園／保育所／
 *   小規模保育事業所）
 * - 人数で公表。「-」はそのクラスがないことを表す
 * - 小規模保育事業所の表は0〜2歳の3列だけ
 * - 時点は本文の「8月1日時点」。年が書かれていないのでページの更新日の年を使う
 */

import fs from "node:fs";
import path from "node:path";

const MUNICIPALITY_SLUG = "hasuda";
const MUNICIPALITY_NAME = "蓮田市";
const SOURCE_NAME = "蓮田市「保育所等の空き状況について」";
const INDEX_URL = "https://www.city.hasuda.saitama.jp/kodomo/kosodate/hoikuen/r8akizyoukyou.html";
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

async function main() {
  console.log(`${MUNICIPALITY_NAME}の空き状況を取り込みます`);
  console.log(`公式ページ: ${INDEX_URL}\n`);

  const res = await fetch(INDEX_URL, { headers: { "User-Agent": UA }, redirect: "follow" });
  if (!res.ok) fail(`公式ページが ${res.status} を返しました`);
  const html = await res.text();
  const flat = toHalfWidth(html.replace(/<[^>]+>/g, "").replace(/[\s　]/g, ""));

  const updated = /更新日[：:](\d{4})年(\d{1,2})月(\d{1,2})日/.exec(flat);
  if (!updated) fail("ページから更新日を読み取れませんでした");

  // 「8月1日時点の市内保育施設の空き状況」。年が書かれていないので更新日の年を使う
  const point = /(\d{1,2})月(\d{1,2})日時点/.exec(flat);
  if (!point) fail("「M月D日時点」を読み取れませんでした");
  if (Number(point[1]) !== Number(updated[2])) {
    fail(`時点の月（${point[1]}月）と更新日の月（${updated[2]}月）が違います`);
  }
  const asOf = `${updated[1]}-${point[1].padStart(2, "0")}-${point[2].padStart(2, "0")}`;
  if (asOf > todayJst()) fail(`時点の日付（${asOf}）が今日より先になっています`);
  console.log(`時点: ${asOf}`);

  // 表の直前にある見出しを区分の名前として使う
  const parts = html.split(/<table/i);
  if (parts.length < 2) fail("表が見つかりません");

  const categories: string[] = [];
  const facilities: {
    id: string;
    name: string;
    w: null;
    c: number;
    vacancy: (number | null)[];
  }[] = [];
  const seen = new Set<string>();
  let vacancyTotal = 0;

  for (let index = 1; index < parts.length; index++) {
    const before = parts[index - 1];
    const headings = [...before.matchAll(/<h[23][^>]*>([\s\S]*?)<\/h[23]>/gi)].map((m) =>
      textOf(m[1])
    );
    const kind = headings.length ? headings[headings.length - 1] : "";
    if (!kind || kind.length > 20) fail(`${index}つ目の表の見出しが見つかりません（「${kind}」）`);

    const table = `<table${parts[index].split(/<\/table>/i)[0]}</table>`;
    const rows = [...table.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi)].map((r) =>
      [...r[1].matchAll(/<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/gi)].map((c) => textOf(c[1]))
    );
    if (rows.length < 2) continue;

    const head = rows[0];
    if (head[0] !== "施設名称") fail(`${kind}: 見出しが想定と違います（${head.join(" / ")}）`);
    const ages: { column: number; age: number }[] = [];
    for (let column = 1; column < head.length; column++) {
      const m = /^(\d)歳児$/.exec(head[column]);
      if (!m) fail(`${kind}: 年齢の見出しが想定と違います（${head.join(" / ")}）`);
      ages.push({ column, age: Number(m[1]) });
    }
    if (ages.length === 0) fail(`${kind}: 年齢の見出しがありません`);

    let c = categories.indexOf(kind);
    if (c < 0) {
      categories.push(kind);
      c = categories.length - 1;
    }

    for (const values of rows.slice(1)) {
      const name = values[0];
      if (!name) continue;
      if (seen.has(name)) fail(`施設名が重複しています: ${name}`);
      seen.add(name);

      const vacancy: (number | null)[] = new Array(AGE_COUNT).fill(null);
      for (const { column, age } of ages) {
        const value = values[column] ?? "";
        // 「-」はそのクラスがないことを表す
        if (value === "" || /^[-－—―ー]$/.test(value)) continue;
        if (!/^\d+$/.test(value)) fail(`${name}: ${age}歳児が数字ではありません（「${value}」）`);
        const count = Number(value);
        if (count > 99) fail(`${name}: ${age}歳児の人数が多すぎます（${count}）`);
        vacancyTotal += count;
        vacancy[age] = count;
      }

      if (vacancy.every((v) => v === null)) fail(`${name}: 全ての年齢が空らんです`);
      facilities.push({ id: name, name, w: null, c, vacancy });
    }
  }

  if (facilities.length < MIN_FACILITIES) {
    fail(`施設が${facilities.length}件しか取れていません（${MIN_FACILITIES}件以上のはず）`);
  }
  console.log(
    `${facilities.length}施設を読み取りました（${categories.join("・")} / 空き ${vacancyTotal}人）`
  );

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
    JSON.stringify(previous?.sourceFiles ?? {}) === JSON.stringify({ vacancy: INDEX_URL }) &&
    JSON.stringify(previous?.facilities ?? null) === JSON.stringify(facilities)
  ) {
    console.log(`公式データの時点が前回と同じ（${asOf}）のため更新はありません。`);
    return;
  }

  const notes = [
    `蓮田市が公開しているのは${asOf}時点の市内保育施設の空き状況です。`,
    "認定こども園の教育部分の空き状況については各園へお問合せください。",
    "公式の表で「-」になっている年齢は「—」にしています。その年齢のクラスがないことを表しています。",
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
    subtitle: "市内保育施設の空き状況",
    notes,
    wards: [],
    categories,
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
