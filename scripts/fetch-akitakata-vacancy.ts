/**
 * 安芸高田市の保育施設空き状況を取り込む
 *
 * 実行: npm run vacancy:fetch:akitakata
 *
 * ## この自治体の特徴
 * - **空き状況の表を1枚の画像（JPEG）で公開している。**文字を持たないので機械では読めない。
 *   画像を拡大して目視で書き起こし、このファイルに表として持っている
 * - 空きは記号（○＝空きあり、△＝残りわずか、×＝空きなし）。
 *   灰色に塗られた升目はそのクラスを設けていないことを表す
 * - 認可外保育所（そらはる保育園）は当サイトの対象外なので載せていない
 * - 地区（吉田町・八千代町など）を wards に、公立／私立を categories に入れる
 */

import fs from "node:fs";
import path from "node:path";

const MUNICIPALITY_SLUG = "akitakata";
const MUNICIPALITY_NAME = "安芸高田市";
const PREFECTURE = "広島県";
const SOURCE_NAME = "安芸高田市「保育施設空き状況」";
const INDEX_URL = "https://www.akitakata.jp/ja/shisei/section/kosodate/n124/";
const AGE_COUNT = 6;
const UA = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);

/** 書き起こしたときの画像。差し替わったら中断する */
const IMAGE_URL =
  "https://www.akitakata.jp/akitakata-media/filer_public/f5/bf/f5bfebdb-0f19-41f3-885f-758f43aa9e4d/20268chouseigo-shisetsu-aki-joukyou.jpg";
// 画像はCDNで再圧縮されており、User-Agent によって大きさが変わる。
// この数は上の UA で取ったときの大きさ
const IMAGE_BYTES = 1182606;
/** 書き起こしたときのページの更新日。ここが変わったら表も変わっている */
const UPDATED = "2026年08月24日";
/** 画像の見出しに書かれている、どの締切ぶんの調整結果か */
const TARGET_LABEL = "8月10日締切分の入所調整後";

const CATEGORIES = ["公立", "私立"];

/**
 * 画像から書き起こした空き状況。null は灰色の升目（そのクラスを設けていない）。
 * 並びは市の表のまま。
 */
const TABLE: { ward: string; category: number; name: string; s: (string | null)[] }[] = [
  { ward: "吉田町", category: 0, name: "吉田保育所", s: [null, "○", "○", "○", "○", "○"] },
  { ward: "吉田町", category: 0, name: "みつや保育所", s: ["○", "○", "○", null, null, null] },
  { ward: "吉田町", category: 1, name: "可愛保育園", s: ["×", "△", "△", "△", "○", "○"] },
  { ward: "吉田町", category: 1, name: "入江保育園", s: ["△", "△", "○", "○", "○", "○"] },
  { ward: "八千代町", category: 1, name: "やちよ保育園", s: ["△", "△", "○", "△", "△", "○"] },
  { ward: "甲田町", category: 1, name: "甲田いづみこども園", s: ["○", "○", "○", "○", "○", "△"] },
  { ward: "向原町", category: 1, name: "向原こばと園", s: ["○", "○", "○", "○", "○", "○"] },
  { ward: "美土里町", category: 0, name: "みどりの森保育所", s: ["○", "○", "○", "○", "○", "○"] },
  { ward: "高宮町", category: 0, name: "ふなさ保育園", s: ["○", "○", "△", "○", "○", "○"] },
  { ward: "高宮町", category: 0, name: "くるはら保育園", s: ["○", "○", "○", "○", "○", "○"] },
];

/** 市が施設ごとに付けている注記 */
const FACILITY_NOTES: Record<string, string> = {
  吉田保育所:
    "市の注記では、吉田保育所は3歳以上の児童が主な入所対象です。1歳児・2歳児クラスは、3歳以上の兄弟と同時入所を希望する場合か、みつや保育所が満員の場合に利用できます。",
  みつや保育所: "市の注記では、みつや保育所は3歳未満の児童のみが入所対象です。",
};

function fail(message: string): never {
  console.error(`\n[中断] ${message}`);
  process.exit(1);
}

function todayJst(): string {
  const jst = new Date(Date.now() + 9 * 60 * 60 * 1000);
  return jst.toISOString().slice(0, 10);
}

function stripTags(html: string): string {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/[\s　]+/g, "");
}

async function main(): Promise<void> {
  console.log(`${MUNICIPALITY_NAME}の空き状況を取り込みます`);
  console.log(`公式ページ: ${INDEX_URL}\n`);

  const res = await fetch(INDEX_URL, { headers: { "User-Agent": UA }, redirect: "follow" });
  if (!res.ok) fail(`公式ページが ${res.status} を返しました`);
  const html = await res.text();
  const flat = stripTags(html);

  // 「2026年08月24日 更新」から基準日を取る。市は画像に年を書いていないため、
  // 締切日（8月10日）ではなくページの更新日を基準日にする
  const m = flat.match(/(\d{4})年(\d{2})月(\d{2})日更新/);
  if (!m) fail("ページに「YYYY年MM月DD日 更新」が見つかりません。構成が変わった可能性があります。");
  const asOf = `${m[1]}-${m[2]}-${m[3]}`;
  if (asOf > todayJst()) fail(`更新日（${asOf}）が今日より先になっています`);
  const updated = `${m[1]}年${m[2]}月${m[3]}日`;
  if (updated !== UPDATED) {
    fail(
      `公式の表が新しくなっています。画像を読み直してから取り込んでください。\n` +
        `  書き起こしたとき: ${UPDATED}\n  いまページにある: ${updated}`
    );
  }
  console.log(`基準日: ${asOf}（ページの更新日）`);

  // 画像が差し替わっていないか、URLと中身の大きさの両方で確かめる
  const images = [...html.matchAll(/<img[^>]+src="([^"]+)"/gi)]
    .map((x) => new URL(x[1], INDEX_URL).toString())
    .filter((u) => /aki-joukyou/i.test(u));
  if (images.length !== 1) fail(`空き状況の画像が${images.length}枚あります（1枚のはず）`);
  // ページに出ているのは縮小版なので、元の画像のURLに直してから確かめる
  const original = images[0].replace(
    /filer_public_thumbnails\/filer_public\/(.+?)\.jpg__[^/]*\.jpg$/,
    "filer_public/$1.jpg"
  );
  if (original !== IMAGE_URL) {
    fail(
      `画像が差し替わっています。表を読み直してから取り込んでください。\n` +
        `  書き起こしたとき: ${IMAGE_URL}\n  いまページにある: ${original}`
    );
  }
  const imgRes = await fetch(IMAGE_URL, { headers: { "User-Agent": UA } });
  if (!imgRes.ok) fail(`画像の取得に失敗しました（${imgRes.status}）: ${IMAGE_URL}`);
  const buf = Buffer.from(await imgRes.arrayBuffer());
  if (buf.length !== IMAGE_BYTES) {
    fail(
      `画像の中身が変わっています（${IMAGE_BYTES} → ${buf.length} バイト）: ${IMAGE_URL}\n` +
        `表を読み直し、TABLE と UPDATED と IMAGE_BYTES を書き換えてから取り込んでください。`
    );
  }
  console.log(`書き起こしたときと同じ画像です（${buf.length} バイト）`);

  const symbolLegend = [
    { mark: "○", label: "空きあり", open: true },
    { mark: "△", label: "残りわずか", open: true },
    { mark: "×", label: "空きなし", open: false },
  ];
  const known = new Set(symbolLegend.map((l) => l.mark));

  const wards: string[] = [];
  const facilities: {
    id: string;
    name: string;
    w: number;
    c: number;
    vacancy: (number | null)[];
    symbols: (string | null)[];
    note?: string;
  }[] = [];
  const seen = new Set<string>();

  for (const row of TABLE) {
    if (seen.has(row.name)) fail(`施設名が重複しています: ${row.name}`);
    seen.add(row.name);
    if (!wards.includes(row.ward)) wards.push(row.ward);
    if (row.s.length !== AGE_COUNT) fail(`${row.name}: 記号が${row.s.length}個です`);
    for (const mark of row.s) {
      if (mark !== null && !known.has(mark)) fail(`${row.name}: 凡例にない記号です「${mark}」`);
    }
    facilities.push({
      id: row.name,
      name: row.name,
      w: wards.indexOf(row.ward),
      c: row.category,
      vacancy: new Array(AGE_COUNT).fill(null),
      symbols: row.s,
      ...(FACILITY_NOTES[row.name] ? { note: FACILITY_NOTES[row.name] } : {}),
    });
  }

  const dataset = {
    municipalitySlug: MUNICIPALITY_SLUG,
    municipalityName: MUNICIPALITY_NAME,
    prefecture: PREFECTURE,
    asOf,
    fetchedAt: todayJst(),
    sourceName: SOURCE_NAME,
    sourceUrl: INDEX_URL,
    sourceFiles: { vacancy: IMAGE_URL },
    metrics: ["symbol"],
    subtitle: `${TARGET_LABEL}の空き状況`,
    notes: [
      "安芸高田市は空きを人数ではなく記号で公表しています。当サイトでも公式の記号のまま載せています。",
      "市は空き状況を画像で公開しているため、当サイトでは画像を拡大して書き写しています。市が画像を差し替えたときは取り込みを止めて、書き写しをやり直します。",
      "市は画像に年を書いていないため、ページの更新日を基準日にしています。",
      "市は「空き状況表は、あくまで目安です。保育士の体制などにより状況が変わる場合があります」としています。",
      "市は「空きありの表示は、確実な入所を保証するものではありません。同時期の入所希望者数が多い場合などに、調整の結果不承諾になる可能性があります」としています。",
      "クラスは4月1日時点の年齢による区分です。",
      "市は認可外保育所（そらはる保育園）の空き状況も同じ表で公表していますが、当サイトは認可施設を扱うため載せていません。",
      "市の表で灰色に塗られているクラスは「—」にしています。そのクラスを設けていないことを表します。",
    ],
    wards,
    categories: CATEGORIES,
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
  console.log(`  ${facilities.length}施設 / ${wards.length}地区`);
}

main().catch((err) => fail(String(err)));
