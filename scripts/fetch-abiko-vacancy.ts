/**
 * 我孫子市の保育施設の空き状況を取り込む
 *
 * 実行: npm run vacancy:fetch:abiko
 *
 * ## この自治体の特徴
 * - PDFではなくページの表そのものに載っている
 * - 記号（〇＝4人以上空きあり、△＝1人から3人空きあり、×＝空きなし）
 * - 「/」はそのクラスを設けていない（小規模保育事業所と企業主導型は0〜2歳）
 * - 種類ごとに見出しの行が入り、その行の1列目が種類名
 */

import fs from "node:fs";
import path from "node:path";

const MUNICIPALITY_SLUG = "abiko";
const MUNICIPALITY_NAME = "我孫子市";
const SOURCE_NAME = "我孫子市「保育施設の空き状況」";
const INDEX_URL =
  "https://www.city.abiko.chiba.jp/kosodate/children/preschool/nursery/vacancy/hoikuen_aki.html";
const AGE_COUNT = 6;
const NO_CLASS = "/";
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

function squeeze(s: string): string {
  return (s ?? "")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/[\s　]/g, "");
}

function shapeOf(mark: string): string {
  if (/^[○◯〇]$/.test(mark)) return "〇";
  if (/^[×✕✖]$/.test(mark)) return "×";
  return mark;
}

async function main() {
  console.log(`${MUNICIPALITY_NAME}の空き状況を取り込みます`);
  console.log(`公式ページ: ${INDEX_URL}\n`);

  const res = await fetch(INDEX_URL, { headers: { "User-Agent": UA } });
  if (!res.ok) fail(`公式ページが ${res.status} を返しました`);
  const html = await res.text();
  const flat = squeeze(html.replace(/<[^>]+>/g, "\n"));

  // 「令和8年10月入園空き状況」
  const targetMatch = flat.match(/令和(\d+)年(\d+)月入園空き状況/);
  if (!targetMatch) fail("対象月を読み取れませんでした");
  const [, , targetMonth] = targetMatch.map(Number);

  // 基準日は書かれていないのでページの更新日を使う
  const updatedMatch = flat.match(/更新日：(\d{4})年(\d{1,2})月(\d{1,2})日/);
  if (!updatedMatch) fail("ページの更新日を読み取れませんでした");
  const [year, month, day] = updatedMatch.slice(1, 4).map(Number);
  const asOf = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  if (asOf > todayJst()) fail(`更新日（${asOf}）が今日より先になっています`);
  console.log(`更新日: ${asOf} / 対象: ${targetMonth}月入園`);

  // 「〇：4人以上空きあり、△：1人から3人空きあり、×…空きなし」。区切りが：と…で揺れる
  const symbolLegend = [...flat.matchAll(/([〇○◯△×✕])[：…]([^、。\n]*?空き(?:あり|なし))/g)].map(
    (m) => ({
      mark: shapeOf(m[1]),
      label: m[2],
      open: !/なし$/.test(m[2]),
    })
  );
  if (symbolLegend.length !== 3) fail(`記号の凡例を読み取れませんでした（${symbolLegend.length}件）`);
  console.log(`凡例: ${symbolLegend.map((l) => `${l.mark}＝${l.label}`).join(" / ")}`);
  const legendByShape = new Map(symbolLegend.map((l) => [shapeOf(l.mark), l.mark]));

  const tables = html.match(/<table[\s\S]*?<\/table>/gi) ?? [];
  if (tables.length !== 1) fail(`表が${tables.length}個見つかりました（1個のはず）`);
  const rows = (tables[0].match(/<tr[\s\S]*?<\/tr>/gi) ?? []).map((row) =>
    [...row.matchAll(/<(t[hd])[^>]*>([\s\S]*?)<\/\1>/gi)].map((c) => ({
      head: c[1].toLowerCase() === "th",
      text: squeeze(c[2]),
    }))
  );
  if (rows.length < 20) fail(`表の行が${rows.length}行しかありません`);

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
  let category = "";
  let noClass = 0;

  for (const row of rows) {
    if (row.length !== 1 + AGE_COUNT) fail(`列が${row.length}個の行があります`);
    const [first, ...values] = row;

    if (first.head) {
      // 種類の見出し。「公立保育園 0歳 1歳 …」
      const heads = values.map((v) => v.text);
      if (heads.join(",") !== [...Array(AGE_COUNT).keys()].map((i) => `${i}歳`).join(",")) {
        fail(`歳児の見出しが${heads}になっています`);
      }
      category = first.text;
      if (!category) fail("種類の見出しが空です");
      if (!categories.includes(category)) categories.push(category);
      continue;
    }

    const name = first.text;
    if (!name) fail("施設名が空の行があります");
    if (!category) fail(`${name}: 種類の見出しより前に出てきました`);
    if (seen.has(name)) fail(`施設名が重複しています: ${name}`);
    seen.add(name);

    const symbols: (string | null)[] = [];
    for (const value of values) {
      if (value.text === NO_CLASS) {
        noClass += 1;
        symbols.push(null);
        continue;
      }
      const mark = legendByShape.get(shapeOf(value.text));
      if (!mark) fail(`${name}: 凡例にない記号です: 「${value.text}」`);
      marks.set(mark, (marks.get(mark) ?? 0) + 1);
      symbols.push(mark);
    }

    facilities.push({
      id: name,
      name,
      w: null,
      c: categories.indexOf(category),
      vacancy: new Array(AGE_COUNT).fill(null),
      symbols,
    });
  }

  if (facilities.length < 25) fail(`施設が${facilities.length}件しか取れていません`);
  // ページに出てくる記号の数と突き合わせる（凡例のぶんは1つずつ引く）
  for (const [mark, count] of marks) {
    const inText =
      [...flat].filter((c) => shapeOf(c) === shapeOf(mark)).length -
      symbolLegend.filter((l) => shapeOf(l.mark) === shapeOf(mark)).length;
    if (count !== inText) {
      fail(`「${mark}」の数が合いません（ページの文字 ${inText}個 / 取り込み ${count}個）`);
    }
  }
  console.log("記号の数はページの文字と一致しました");

  const previous = fs.existsSync(OUT_PATH)
    ? (JSON.parse(fs.readFileSync(OUT_PATH, "utf-8")) as { asOf?: string; facilities?: unknown[] })
    : null;
  if (previous?.facilities && facilities.length < previous.facilities.length * 0.9) {
    fail(
      `施設数が大きく減っています（前回 ${previous.facilities.length}件 → 今回 ${facilities.length}件）`
    );
  }
  if (previous?.asOf === asOf) {
    console.log(`公式データの時点が前回と同じ（${asOf}）のため更新はありません。`);
    return;
  }

  const dataset = {
    municipalitySlug: MUNICIPALITY_SLUG,
    municipalityName: MUNICIPALITY_NAME,
    asOf,
    fetchedAt: todayJst(),
    sourceName: SOURCE_NAME,
    sourceUrl: INDEX_URL,
    sourceFiles: { vacancy: INDEX_URL },
    metrics: ["symbol"],
    subtitle: `${targetMonth}月入園の空き状況`,
    notes: [
      "我孫子市は空き状況を人数ではなく記号で公表しています。当サイトでも公式の記号のまま載せています。",
      "空きがあっても入園を保証するものではありません。多くの方の申請が予想されるため、保育の必要性や緊急性の高い家庭からの入園になります。",
      "私立保育園・認定こども園・小規模保育事業所は退園などに伴い入園状況が変わることがあるため、最新の状況は各園にお問い合わせください。公立保育園は毎月1日の空き状況のみが公表されています。",
      "転入予定のない他市区町村にお住まいの方の入園については、我孫子市民が優先されます。",
      "年齢はその年度の4月1日現在の満年齢です。設けていないクラスは「—」にしています。",
    ],
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
  console.log(`  ${facilities.length}施設 / ${categories.length}種類`);
  console.log(`  設けていないクラス: ${noClass}`);
  console.log("");
  console.log("  記号の出てきた数");
  for (const item of symbolLegend) {
    console.log(`  ${item.mark}（${item.label}） ${marks.get(item.mark) ?? 0}`);
  }
}

main().catch((err) => fail(String(err)));
