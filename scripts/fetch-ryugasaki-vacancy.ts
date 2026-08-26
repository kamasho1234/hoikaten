/**
 * 龍ケ崎市の保育施設空き状況を取り込む
 *
 * 実行: npm run vacancy:fetch:ryugasaki
 *
 * ## この自治体の特徴
 * - 公式ページのHTMLの表をそのまま読む
 * - **凡例に「(空白)：空き無し」と書かれている**。多くの自治体と逆で、
 *   空らんが「クラスなし」ではなく「空き無し」を表す
 * - 「－」が受け入れ対象歳児でない（＝その年齢のクラスがない）
 * - **凡例は「△」と書いているが、表では「▲」が使われている**。
 *   1対1で対応するので同じものとして扱い、注記で断る
 * - 区分（公立・私立・私立認定こども園・私立地域型）は rowspan で結合されていて、
 *   区分のある行は8列、続きの行は7列になる
 */

import fs from "node:fs";
import path from "node:path";

const MUNICIPALITY_SLUG = "ryugasaki";
const MUNICIPALITY_NAME = "龍ケ崎市";
const SOURCE_NAME = "龍ケ崎市「令和8年度保育施設空き状況」";
const SOURCE_URL =
  "https://www.city.ryugasaki.ibaraki.jp/fukushi/kosodate/azukeru/hoiku/R8-hoikumousikomi.html";
const AGE_COUNT = 6;
const MIN_FACILITIES = 15;
const UA = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);

/**
 * 公式は空らんで「空き無し」を表しているが、こちらは記号として持つ必要がある。
 * 公式にない記号を作らずに済むよう、凡例の言葉をそのまま印として使う
 */
const NO_VACANCY_LABEL = "空き無し";

function fail(message: string): never {
  console.error(`\n[中断] ${message}`);
  process.exit(1);
}

function todayJst(): string {
  const jst = new Date(Date.now() + 9 * 60 * 60 * 1000);
  return jst.toISOString().slice(0, 10);
}

function unescapeHtml(s: string): string {
  return s
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#(\d+);/g, (_, d) => String.fromCharCode(Number(d)))
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCharCode(parseInt(h, 16)))
    .replace(/&amp;/g, "&");
}

function squeeze(s: string): string {
  return unescapeHtml(s ?? "")
    .replace(/[\s　 ]/g, "")
    .trim();
}

function toHalfWidth(s: string): string {
  return s.replace(/[０-９]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xfee0));
}

/** 表と凡例で記号の書き方が揺れるのでそろえる */
function shapeOf(mark: string): string {
  if (/^[○◯〇]$/.test(mark)) return "〇";
  // 凡例は「△」だが表では「▲」が使われている
  if (/^[△▲]$/.test(mark)) return "▲";
  // 凡例は「－」(全角ハイフン)、表は「ー」(長音)
  if (/^[－ー―—‐-]$/.test(mark)) return "－";
  return mark;
}

function parseTables(html: string): string[][][] {
  return [...html.matchAll(/<table[\s\S]*?<\/table>/gi)].map((t) =>
    [...t[0].matchAll(/<tr[\s\S]*?<\/tr>/gi)].map((r) =>
      [...r[0].matchAll(/<t[dh][\s\S]*?<\/t[dh]>/gi)].map((c) => squeeze(c[0])),
    ),
  );
}

async function main() {
  console.log(`${MUNICIPALITY_NAME}の空き状況を取り込みます`);
  console.log(`公式ページ: ${SOURCE_URL}\n`);

  const res = await fetch(SOURCE_URL, { headers: { "User-Agent": UA }, redirect: "follow" });
  if (!res.ok) fail(`公式ページが ${res.status} を返しました`);
  const html = await res.text();
  const flat = toHalfWidth(squeeze(html));

  // 「令和8年度9月入所受け入れ可能状況（7月27日更新）」
  const headMatch = /令和(\d+)年度(\d+)月入所受け入れ可能状況[（(](\d+)月(\d+)日更新[）)]/.exec(flat);
  if (!headMatch) {
    fail("「令和N年度M月入所受け入れ可能状況（M月D日更新）」を読み取れませんでした");
  }
  const fiscal = Number(headMatch[1]);
  const targetMonth = Number(headMatch[2]);
  const updatedMonth = Number(headMatch[3]);
  const updatedDay = Number(headMatch[4]);
  // 更新日には年が書かれていない。年度と月から決める（4〜12月は年度の年）
  const year = updatedMonth >= 4 ? fiscal + 2018 : fiscal + 2019;
  const asOf = `${year}-${String(updatedMonth).padStart(2, "0")}-${String(updatedDay).padStart(2, "0")}`;
  if (asOf > todayJst()) fail(`更新日（${asOf}）が今日より先になっています`);
  const targetLabel = `${fiscal + 2018}年度${targetMonth}月`;
  console.log(`時点: ${asOf} ／ 対象: ${targetLabel}入所`);

  // 「〇：4枠以上　△：1～3枠　(空白)：空き無し　－：受け入れ対象歳児でない」
  const openMatch = /([〇○◯])：(\d+)枠以上/.exec(flat);
  const someMatch = /([△▲])：(\d+)～(\d+)枠/.exec(flat);
  const blankMatch = /[（(]空白[）)]：([^　\s]+?)－/.exec(flat);
  const noClassMatch = /([－ー―])：(受け入れ対象歳児でない)/.exec(flat);
  if (!openMatch || !someMatch || !blankMatch || !noClassMatch) {
    fail("記号の凡例（〇・△・(空白)・－）を読み取れませんでした");
  }
  const openMark = shapeOf(openMatch[1]);
  const someMark = shapeOf(someMatch[1]);
  const noClassMark = shapeOf(noClassMatch[1]);
  const blankLabel = blankMatch[1];
  if (blankLabel !== NO_VACANCY_LABEL) {
    fail(`「(空白)」の説明が「${NO_VACANCY_LABEL}」ではありません（「${blankLabel}」）`);
  }

  const symbolLegend = [
    { mark: openMark, label: `${openMatch[2]}枠以上`, open: true },
    { mark: someMark, label: `${someMatch[2]}〜${someMatch[3]}枠`, open: true },
    { mark: NO_VACANCY_LABEL, label: "空き無し（公式の表では空欄）", open: false },
  ];
  console.log(`凡例: ${symbolLegend.map((l) => `${l.mark}＝${l.label}`).join(" / ")}`);

  const table = parseTables(html).find((t) => t[0]?.[1] === "保育所名");
  if (!table) fail("空き状況の表が見つかりません");
  for (let age = 0; age < AGE_COUNT; age++) {
    if (table[0][2 + age] !== `${age}歳児`) {
      fail(`年齢の見出しが想定と違います: ${table[0].join(",")}`);
    }
  }

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
  const marks = new Map<string, number>();
  let notOffered = 0;
  let kindCarry = "";

  for (const row of table.slice(1)) {
    // 区分のある行は8列、続きの行は7列（rowspanで結合されている）
    let name: string;
    let ageCells: string[];
    if (row.length === AGE_COUNT + 2) {
      kindCarry = row[0];
      name = row[1];
      ageCells = row.slice(2);
    } else if (row.length === AGE_COUNT + 1) {
      name = row[0];
      ageCells = row.slice(1);
    } else {
      fail(`列が${row.length}個の行があります（${AGE_COUNT + 1}か${AGE_COUNT + 2}のはず）`);
    }
    if (!name) continue;
    if (!kindCarry) fail(`${name}: 区分が分かりません`);
    if (seen.has(name)) fail(`施設名が重複しています: ${name}`);
    seen.add(name);

    let c = categories.indexOf(kindCarry);
    if (c < 0) {
      categories.push(kindCarry);
      c = categories.length - 1;
    }

    const symbols: (string | null)[] = [];
    for (let age = 0; age < AGE_COUNT; age++) {
      const raw = ageCells[age];
      if (raw === "") {
        // 公式は空らんで「空き無し」を表す
        marks.set(NO_VACANCY_LABEL, (marks.get(NO_VACANCY_LABEL) ?? 0) + 1);
        symbols.push(NO_VACANCY_LABEL);
        continue;
      }
      const mark = shapeOf(raw);
      if (mark === noClassMark) {
        notOffered += 1;
        symbols.push(null);
        continue;
      }
      if (mark !== openMark && mark !== someMark) {
        fail(`${name}: ${age}歳児が凡例にない記号です（「${raw}」）`);
      }
      marks.set(mark, (marks.get(mark) ?? 0) + 1);
      symbols.push(mark);
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

  if (facilities.length < MIN_FACILITIES) {
    fail(`施設が${facilities.length}件しか取れていません（${MIN_FACILITIES}件以上のはず）`);
  }
  // 検算: 欄の数が施設数×年齢数になるか
  const total = [...marks.values()].reduce((a, b) => a + b, 0) + notOffered;
  if (total !== facilities.length * AGE_COUNT) {
    fail(`欄の数が合いません（${total} / 施設${facilities.length}×${AGE_COUNT}）`);
  }
  if (!marks.has(openMark) && !marks.has(someMark)) {
    fail("空きありの記号がひとつもありません（読み取りに失敗している可能性があります）");
  }
  console.log(
    `${facilities.length}施設 ／ ${[...marks].map(([m, n]) => `${m}${n}`).join("・")}・クラスなし${notOffered}`,
  );

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
    `龍ケ崎市は空き状況を人数ではなく記号で公表しています。これは${targetLabel}入所分で、${asOf}時点のものです。`,
    `公式の凡例は「${openMark}」${openMatch[2]}枠以上、「△」${someMatch[2]}〜${someMatch[3]}枠、「(空白)」空き無し、「${noClassMark}」受け入れ対象歳児でない、です。`,
    `公式の表で空欄になっている年齢は「${NO_VACANCY_LABEL}」と出しています。多くの自治体と違い、空欄がクラスなしではなく空きが無いことを表します。`,
    `公式の凡例は「△」ですが、表では「${someMark}」が使われています。1対1で対応するので同じものとして扱っています。`,
    `「${noClassMark}」の年齢は「—」にしています。受け入れ対象の歳児でないことを表します。`,
    "受け入れ可能な施設に申し込んでも入所が決まるとは限りません。掲載されている空き状況は目安です。",
    "認定こども園の空き状況は保育所利用の分です。幼稚園利用は各施設に問い合わせてください。",
  ];

  const dataset = {
    municipalitySlug: MUNICIPALITY_SLUG,
    municipalityName: MUNICIPALITY_NAME,
    asOf,
    fetchedAt: todayJst(),
    sourceName: SOURCE_NAME,
    sourceUrl: SOURCE_URL,
    metrics: ["symbol"],
    subtitle: `${targetLabel}入所分の受け入れ可能状況`,
    notes,
    wards: [] as string[],
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
  console.log(`  ${facilities.length}施設 / ${categories.join("・")}`);
}

main().catch((err) => fail(String(err)));
