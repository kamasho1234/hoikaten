/**
 * 取手市の保育施設空き状況を取り込む
 *
 * 実行: npm run vacancy:fetch:toride
 *
 * ## この自治体の特徴
 * - PDFではなく**ページの中のHTMLの表**で公表している。区分ごとに表が分かれ、
 *   その直前の見出し（h2/h3）が区分の名前になる（公立保育所／私立保育園／
 *   事業所内保育施設／認定こども園）
 * - **受入れ見込みのあるクラスに丸印がつくだけ**で、空らんは受入れ見込みなし。
 *   当サイトでは分かりやすさのため空らんを「×」に置き換える
 * - 「-」はそのクラスがないことを表す
 * - 認定こども園の受入れ見込みは保育所部の状況
 */

import fs from "node:fs";
import path from "node:path";

const MUNICIPALITY_SLUG = "toride";
const MUNICIPALITY_NAME = "取手市";
const SOURCE_NAME = "取手市「保育施設空き状況」";
const INDEX_URL =
  "https://www.city.toride.ibaraki.jp/kosodate/kurashi/kosodate/hoikujo/akijokyo.html";
const AGE_COUNT = 6;
const MIN_FACILITIES = 20;
const UA = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";

/** 受入れ見込みのある印 */
const OPEN_MARK = "○";
/** 公式の表で空らん（受入れ見込みなし）の欄を、当サイトではこの記号にする */
const NONE_MARK = "×";

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

  // 「令和8年8月21日現在の保育施設空き状況をお知らせします」
  const point = /令和(\d+)年(\d{1,2})月(\d{1,2})日現在の保育施設空き状況/.exec(flat);
  if (!point) fail("「令和N年M月D日現在の保育施設空き状況」を読み取れませんでした");
  const asOf = `${Number(point[1]) + 2018}-${point[2].padStart(2, "0")}-${point[3].padStart(2, "0")}`;
  if (asOf > todayJst()) fail(`時点の日付（${asOf}）が今日より先になっています`);

  const updated = /更新日[：:](\d{4})年(\d{1,2})月(\d{1,2})日/.exec(flat);
  if (!updated) fail("ページから更新日を読み取れませんでした");
  console.log(`時点: ${asOf}（更新日 ${updated[1]}年${updated[2]}月${updated[3]}日）`);

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
    symbols: (string | null)[];
  }[] = [];
  const seen = new Set<string>();
  let open = 0;
  let none = 0;
  let missing = 0;

  for (let index = 1; index < parts.length; index++) {
    const headings = [...parts[index - 1].matchAll(/<h[234][^>]*>([\s\S]*?)<\/h[234]>/gi)].map((m) =>
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
    if (head[0] !== "施設名") continue;
    if (head.length !== AGE_COUNT + 1) fail(`${kind}: 列数が${head.length}です`);
    for (let age = 0; age < AGE_COUNT; age++) {
      if (head[age + 1] !== `${age}歳児`) fail(`${kind}: 年齢の見出しが想定と違います`);
    }

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

      const symbols: (string | null)[] = [];
      for (let age = 0; age < AGE_COUNT; age++) {
        const value = values[age + 1] ?? "";
        // 「-」はそのクラスがない
        if (/^[-－—―ー]$/.test(value)) {
          missing += 1;
          symbols.push(null);
          continue;
        }
        if (value === "") {
          // 空らん＝受入れ見込みなし
          none += 1;
          symbols.push(NONE_MARK);
          continue;
        }
        if (!/^[○◯〇]$/.test(value)) {
          fail(`${name}: ${age}歳児が想定の印ではありません（「${value}」）`);
        }
        open += 1;
        symbols.push(OPEN_MARK);
      }

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

  if (facilities.length < MIN_FACILITIES) {
    fail(`施設が${facilities.length}件しか取れていません（${MIN_FACILITIES}件以上のはず）`);
  }
  if (open + none + missing !== facilities.length * AGE_COUNT) {
    fail(
      `欄の数が合いません（丸印${open}＋空らん${none}＋クラスなし${missing} / 施設${facilities.length}×${AGE_COUNT}）`
    );
  }
  if (open === 0) fail("丸印がひとつもありません（読み取りに失敗している可能性があります）");
  console.log(
    `${facilities.length}施設を読み取りました（丸印${open}／受入れ見込みなし${none}／クラスなし${missing}）`
  );

  const symbolLegend = [
    { mark: OPEN_MARK, label: "受入れ見込みあり", open: true },
    { mark: NONE_MARK, label: "受入れ見込みなし", open: false },
  ];

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
    `取手市が公開しているのは${asOf}時点の保育施設空き状況です。受入れ見込みのあるクラスに丸印がついています。`,
    "保育士の配置状況や急な退所等により、受入れ状況が変動することがあります。入所判定会議時に最終的な受入れ可能数が確定するため、この表のとおり受け入れができない場合があります。",
    `公式の表では、受入れ見込みのない年齢を空らんにしています。当サイトでは分かりやすさのため「${NONE_MARK}」に置き換えて表示しています。`,
    "認定こども園の受入れ見込みは保育所部の状況です。幼稚園部の空き状況は各園にお問い合わせください。",
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
    metrics: ["symbol"],
    subtitle: "保育施設の受入れ見込み",
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
  console.log(`  ${categories.join("・")}`);
}

main().catch((err) => fail(String(err)));
