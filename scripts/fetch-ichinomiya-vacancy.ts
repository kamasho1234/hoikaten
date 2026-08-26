/**
 * 一宮市の保育施設空き状況（通年入所）を取り込む
 *
 * 実行: npm run vacancy:fetch:ichinomiya
 *
 * ## この自治体の特徴
 * - 公式ページのHTMLの表をそのまま読む（PDFではない）
 * - **記号と人数が混ざる**。「〇」は6名以上の空き、数字はその人数の募集人数、
 *   「×」は募集なし。人数が分からない「〇」があるので記号として持つ
 * - 「受入可能年齢」の列があるので、園が受け入れていない年齢が分かる。
 *   受け入れていない年齢は「×」と印字されているが、空きなしではなく
 *   クラスなしなので null にする
 * - **備考に「0〜2歳で空き2人」のような年齢をまたぐ枠が書かれている**施設がある。
 *   年齢別の数を足すと実際の枠より多くなるので、備考は施設ごとに持って必ず見せる
 */

import fs from "node:fs";
import path from "node:path";

const MUNICIPALITY_SLUG = "ichinomiya";
const MUNICIPALITY_NAME = "一宮市";
const SOURCE_NAME = "一宮市「保育施設空き状況（通年入所）」";
const SOURCE_URL =
  "https://www.city.ichinomiya.aichi.jp/kodomokatei/hoiku/1000155/1010629/1062184.html";
const AGE_COUNT = 6;
const MIN_FACILITIES = 80;
const UA = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);

/** 公式の表の列 */
const COL_NAME = 0;
const COL_CATEGORY = 1;
const COL_TOWN = 2;
const COL_ACCEPT = 3;
const COL_AGE0 = 5;
const COL_NOTE = 11;
const COLUMN_COUNT = 13;

const OPEN_MARK = "〇";
const CLOSED_MARK = "×";

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
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&times;/g, "×")
    .replace(/&#(\d+);/g, (_, d) => String.fromCharCode(Number(d)))
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCharCode(parseInt(h, 16)))
    .replace(/&amp;/g, "&");
}

function squeeze(s: string): string {
  return unescapeHtml(s ?? "").replace(/[\s　]/g, "");
}

/** 表の中に出てくる記号のゆれをそろえる */
function shapeOf(mark: string): string {
  if (/^[○◯〇]$/.test(mark)) return OPEN_MARK;
  if (/^[×✕✖]$/.test(mark)) return CLOSED_MARK;
  return mark;
}

function toHalfWidth(s: string): string {
  return s.replace(/[０-９]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xfee0));
}

/**
 * 「10カ月～5歳」「産休明け～2歳」「3歳～5歳」「2歳」から、
 * 受け入れている年齢クラス（0〜5）を出す
 */
function agesOf(accept: string): number[] | null {
  const text = toHalfWidth(accept);
  const [fromText, toText] = text.split("～");
  let start: number;
  if (/^(産休明け|\d+カ月|\d+か月|\d+ヶ月)/.test(fromText)) {
    // 「産休明け」も「10カ月」も0歳児クラスから受け入れる
    start = 0;
  } else {
    const m = /^(\d+)歳/.exec(fromText);
    if (!m) return null;
    start = Number(m[1]);
  }
  let end: number;
  if (toText === undefined) {
    // 「2歳」のように1つの年齢だけを書いている場合
    end = start;
  } else {
    const m = /^(\d+)歳/.exec(toText);
    if (!m) return null;
    end = Number(m[1]);
  }
  if (!Number.isInteger(start) || !Number.isInteger(end)) return null;
  if (start > end || end >= AGE_COUNT) return null;
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

async function main() {
  console.log(`${MUNICIPALITY_NAME}の空き状況を取り込みます`);
  console.log(`公式ページ: ${SOURCE_URL}\n`);

  const res = await fetch(SOURCE_URL, { headers: { "User-Agent": UA }, redirect: "follow" });
  if (!res.ok) fail(`公式ページが ${res.status} を返しました`);
  const html = await res.text();

  const updated = /更新日[\s\S]{0,40}?(\d{4})年(\d{1,2})月(\d{1,2})日/.exec(unescapeHtml(html));
  if (!updated) fail("「更新日 YYYY年M月D日」を読み取れませんでした");
  const asOf = `${updated[1]}-${updated[2].padStart(2, "0")}-${updated[3].padStart(2, "0")}`;
  if (asOf > todayJst()) fail(`更新日（${asOf}）が今日より先になっています`);

  const targetMatch = /(\d{4})年(\d{1,2})月入所の空き状況/.exec(unescapeHtml(html));
  if (!targetMatch) fail("「YYYY年M月入所の空き状況」を読み取れませんでした");
  const targetLabel = `${targetMatch[1]}年${targetMatch[2]}月`;

  // 「表の「〇」は、6名以上の空きがあります。」から凡例を確かめる
  const openMatch = /表の「[○◯〇]」は、\s*(\d+)名以上の空き/.exec(unescapeHtml(html).replace(/\s+/g, ""));
  if (!openMatch) fail("「表の〇は、N名以上の空きがあります」を読み取れませんでした");
  const openThreshold = Number(openMatch[1]);

  const tableMatch = /<table[\s\S]*?<\/table>/i.exec(html);
  if (!tableMatch) fail("表が見つかりません");
  const rows = [...tableMatch[0].matchAll(/<tr[\s\S]*?<\/tr>/gi)].map((r) =>
    [...r[0].matchAll(/<t[dh][\s\S]*?<\/t[dh]>/gi)].map((c) => squeeze(c[0])),
  );
  if (rows.length < MIN_FACILITIES) fail(`表の行が${rows.length}行しかありません`);
  if (rows.some((r) => r.length !== COLUMN_COUNT)) {
    fail(`列数が${COLUMN_COUNT}でない行があります`);
  }

  const head = rows[0];
  if (head[COL_NAME] !== "施設名" || head[COL_TOWN] !== "町名") {
    fail(`見出しが想定と違います: ${head.join(",")}`);
  }
  if (!head[COL_ACCEPT].startsWith("受入可能年齢")) {
    fail(`「受入可能年齢」の列が見つかりません: ${head.join(",")}`);
  }
  for (let age = 0; age < AGE_COUNT; age++) {
    if (head[COL_AGE0 + age] !== `${age}歳`) fail(`年齢の見出しが想定と違います: ${head.join(",")}`);
  }
  if (head[COL_NOTE] !== "備考") fail(`「備考」の列が見つかりません: ${head.join(",")}`);

  const wards: string[] = [];
  const categories: string[] = [];
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
  const numbers = new Set<number>();
  let openCells = 0;
  let closedCells = 0;
  let notOffered = 0;
  let noteCount = 0;

  for (const values of rows.slice(1)) {
    const name = values[COL_NAME];
    if (!name) fail("施設名が空の行があります");
    if (seen.has(name)) fail(`施設名が重複しています: ${name}`);
    seen.add(name);

    const town = values[COL_TOWN];
    if (!town) fail(`${name}: 町名が空です`);
    let w = wards.indexOf(town);
    if (w < 0) {
      wards.push(town);
      w = wards.length - 1;
    }

    const category = values[COL_CATEGORY];
    if (!category) fail(`${name}: 施設カテゴリが空です`);
    let c = categories.indexOf(category);
    if (c < 0) {
      categories.push(category);
      c = categories.length - 1;
    }

    const ages = agesOf(values[COL_ACCEPT]);
    if (ages === null) fail(`${name}: 受入可能年齢を読み取れません（「${values[COL_ACCEPT]}」）`);

    const symbols: (string | null)[] = [];
    for (let age = 0; age < AGE_COUNT; age++) {
      const raw = shapeOf(toHalfWidth(values[COL_AGE0 + age]));
      if (!raw) fail(`${name}: ${age}歳の欄が空です`);
      if (!ages.includes(age)) {
        // 受け入れていない年齢は「×」と印字されるが、空きなしではなくクラスなし
        if (raw !== CLOSED_MARK) {
          fail(
            `${name}: 受入可能年齢（${values[COL_ACCEPT]}）の外の${age}歳に「${raw}」が入っています`,
          );
        }
        notOffered += 1;
        symbols.push(null);
        continue;
      }
      if (raw === OPEN_MARK) {
        openCells += 1;
      } else if (raw === CLOSED_MARK) {
        closedCells += 1;
      } else if (/^\d+$/.test(raw)) {
        // 「〇」は6名以上とされているが、ちょうど6名は数字で書かれることもある
        const n = Number(raw);
        if (n <= 0 || n > 99) {
          fail(`${name}: ${age}歳の人数が想定の範囲外です（「${raw}」）`);
        }
        numbers.add(n);
      } else {
        fail(`${name}: ${age}歳が想定の記号ではありません（「${raw}」）`);
      }
      symbols.push(raw);
    }

    const note = values[COL_NOTE] || undefined;
    if (note) noteCount += 1;

    facilities.push({
      id: name,
      name,
      w,
      c,
      vacancy: new Array(AGE_COUNT).fill(null),
      symbols,
      ...(note ? { note } : {}),
    });
  }

  if (facilities.length < MIN_FACILITIES) {
    fail(`施設が${facilities.length}件しか取れていません（${MIN_FACILITIES}件以上のはず）`);
  }
  // 検算: 記号・人数・クラスなしの合計が施設数×年齢数になるか
  const numberCells = facilities.reduce(
    (a, f) => a + f.symbols.filter((s) => s !== null && /^\d+$/.test(s)).length,
    0,
  );
  const cells = openCells + closedCells + numberCells + notOffered;
  if (cells !== facilities.length * AGE_COUNT) {
    fail(`欄の数が合いません（${cells} / 施設${facilities.length}×${AGE_COUNT}）`);
  }
  if (openCells === 0) fail("「〇」がひとつもありません（読み取りに失敗している可能性があります）");
  console.log(
    `${facilities.length}施設 ／ 〇${openCells}・人数${numberCells}・×${closedCells}・クラスなし${notOffered}・備考${noteCount}`,
  );

  // 凡例。人数はそのまま出るので、出てきた人数の分だけ作る
  const symbolLegend = [
    { mark: OPEN_MARK, label: `${openThreshold}名以上の空き`, open: true },
    ...[...numbers]
      .sort((a, b) => a - b)
      .map((n) => ({ mark: String(n), label: `${n}名の空き`, open: true })),
    { mark: CLOSED_MARK, label: "募集なし", open: false },
  ];

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
    `一宮市は募集人数を表で公表しています。これは${targetLabel}入所分で、${asOf}時点のものです。`,
    `「${OPEN_MARK}」は${openThreshold}名以上の空き、数字はその人数の募集人数、「${CLOSED_MARK}」は募集なしを表します。`,
    "年齢は2026年4月1日現在の満年齢です。",
    "公式の表で受入可能年齢の外にあたる年齢は「—」にしています。その年齢のクラスがないことを表しています。",
    "備考に「0〜2歳で空き2人」とある施設は、年齢をまたいだ枠です。年齢ごとの数を足した人数は入れません。",
    "募集人数は申込期間の最終日の前日まで変わることがあります。申し込む前に公式ページで確かめてください。",
    "広域保育（受託）で乳児を受け入れられる園は限られています。公式ページの「広域」の欄を見てください。",
  ];

  const dataset = {
    municipalitySlug: MUNICIPALITY_SLUG,
    municipalityName: MUNICIPALITY_NAME,
    asOf,
    fetchedAt: todayJst(),
    sourceName: SOURCE_NAME,
    sourceUrl: SOURCE_URL,
    metrics: ["symbol"],
    subtitle: `${targetLabel}入所分の空き状況`,
    notes,
    wards,
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
  console.log(`  ${facilities.length}施設 / ${wards.length}町 / ${categories.join("・")}`);
}

main().catch((err) => fail(String(err)));
