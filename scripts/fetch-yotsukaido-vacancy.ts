/**
 * 四街道市の受入可能人数・入所児童数・入所待ち児童数を取り込む
 *
 * 実行: npm run vacancy:fetch:yotsukaido
 *
 * ## この自治体の特徴
 * - 3つの表がHTMLで公開されていて、**空き・在籍・入所待ちが全て揃う**
 *   - 受入可能人数（別ページ）
 *   - 入所・入園状況（＝在籍）
 *   - 入所待ち児童数
 * - どの表も「合計」の列があるので、年齢ごとの和と突き合わせて検算できる
 * - 「-」はその年齢のクラスがないことを表す。3つの表で位置が揃うことも確かめる
 * - 受入可能人数の表の題は「令和8年9月1日…」で、これは入所日であって時点ではない。
 *   時点はどちらのページも更新日（同じ日）を使う
 */

import fs from "node:fs";
import path from "node:path";

const MUNICIPALITY_SLUG = "yotsukaido";
const MUNICIPALITY_NAME = "四街道市";
const SOURCE_NAME = "四街道市「各保育施設等の受入可能人数」「入所・入園状況及び入所待ち児童数」";
/** 受入可能人数のページ */
const VACANCY_URL = "https://www.city.yotsukaido.chiba.jp/kosodate/azukeru/ykodomo202110.html";
/** 入所・入園状況と入所待ち児童数のページ */
const STATUS_URL = "https://www.city.yotsukaido.chiba.jp/kosodate/azukeru/nyuusyotaikiichiran.html";
const AGE_COUNT = 6;
const MIN_FACILITIES = 30;
const UA = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);

/** その年齢のクラスがないことを表す印 */
const NO_CLASS = "-";

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
  return unescapeHtml(s ?? "").replace(/[\s　]/g, "");
}

/** 全角の数字・英字を半角にする（施設名に全角英字が混ざる） */
function toHalfWidth(s: string): string {
  return s.replace(/[０-９Ａ-Ｚａ-ｚ]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xfee0));
}

/** ダッシュのゆれをそろえる */
function shapeOf(v: string): string {
  return /^[-－―—‐]$/.test(v) ? NO_CLASS : v;
}

type Table = { name: string; values: (number | null)[]; total: number }[];

function parseTables(html: string): string[][][] {
  return [...html.matchAll(/<table[\s\S]*?<\/table>/gi)].map((t) =>
    [...t[0].matchAll(/<tr[\s\S]*?<\/tr>/gi)].map((r) =>
      [...r[0].matchAll(/<t[dh][\s\S]*?<\/t[dh]>/gi)].map((c) => squeeze(c[0])),
    ),
  );
}

/** 「施設名／0歳児…5歳児／合計」の表を読んで、合計の列で検算する */
function readTable(rows: string[][], label: string): Table {
  const head = rows[0];
  if (head.length !== AGE_COUNT + 2) {
    fail(`${label}: 列が${head.length}個です（${AGE_COUNT + 2}個のはず）`);
  }
  for (let age = 0; age < AGE_COUNT; age++) {
    const want = [`${age}歳児`, `${age}歳`];
    if (!want.includes(head[1 + age])) {
      fail(`${label}: 年齢の見出しが想定と違います（${head.join(",")}）`);
    }
  }
  if (head[AGE_COUNT + 1] !== "合計") {
    fail(`${label}: 最後の列が「合計」ではありません（${head.join(",")}）`);
  }

  const out: Table = [];
  for (const row of rows.slice(1)) {
    const name = toHalfWidth(row[0]);
    if (!name) continue;
    if (row.length !== AGE_COUNT + 2) {
      fail(`${label} ${name}: 列が${row.length}個です`);
    }

    const values: (number | null)[] = [];
    let sum = 0;
    for (let age = 0; age < AGE_COUNT; age++) {
      const raw = shapeOf(toHalfWidth(row[1 + age]));
      if (raw === NO_CLASS) {
        values.push(null);
        continue;
      }
      if (!/^\d+$/.test(raw)) fail(`${label} ${name}: ${age}歳児が数ではありません（「${raw}」）`);
      const n = Number(raw);
      if (n < 0 || n > 999) fail(`${label} ${name}: ${age}歳児の人数が想定の範囲外です（${n}）`);
      values.push(n);
      sum += n;
    }

    const totalRaw = toHalfWidth(row[AGE_COUNT + 1]);
    if (!/^\d+$/.test(totalRaw)) fail(`${label} ${name}: 合計が数ではありません（「${totalRaw}」）`);
    const total = Number(totalRaw);
    // 合計の列と年齢ごとの和が合うか
    if (sum !== total) {
      fail(`${label} ${name}: 合計が合いません（印字 ${total} / 年齢ごとの和 ${sum}）`);
    }

    out.push({ name, values, total });
  }
  if (out.length === 0) fail(`${label}: 施設の行を取り出せませんでした`);
  return out;
}

/** ページの「更新：YYYY年M月D日」を読む */
function updatedOf(html: string, label: string): string {
  const m = /更新[：:](\d{4})年(\d{1,2})月(\d{1,2})日/.exec(toHalfWidth(squeeze(html)));
  if (!m) fail(`${label}: 「更新：YYYY年M月D日」を読み取れませんでした`);
  return `${m[1]}-${m[2].padStart(2, "0")}-${m[3].padStart(2, "0")}`;
}

async function main() {
  console.log(`${MUNICIPALITY_NAME}の空き状況を取り込みます`);
  console.log(`公式ページ: ${VACANCY_URL}\n`);

  const [vacancyRes, statusRes] = await Promise.all([
    fetch(VACANCY_URL, { headers: { "User-Agent": UA }, redirect: "follow" }),
    fetch(STATUS_URL, { headers: { "User-Agent": UA }, redirect: "follow" }),
  ]);
  if (!vacancyRes.ok) fail(`受入可能人数のページが ${vacancyRes.status} を返しました`);
  if (!statusRes.ok) fail(`入所状況のページが ${statusRes.status} を返しました`);
  const vacancyHtml = await vacancyRes.text();
  const statusHtml = await statusRes.text();

  const asOf = updatedOf(vacancyHtml, "受入可能人数のページ");
  const statusAsOf = updatedOf(statusHtml, "入所状況のページ");
  if (asOf !== statusAsOf) {
    fail(`2つのページの更新日が違います（受入可能人数 ${asOf} / 入所状況 ${statusAsOf}）`);
  }
  if (asOf > todayJst()) fail(`更新日（${asOf}）が今日より先になっています`);

  // 受入可能人数の表の題は「令和8年9月1日各保育施設等の受入可能人数一覧」
  const targetMatch = /令和(\d+)年(\d+)月(\d+)日各保育施設等の受入可能人数/.exec(
    toHalfWidth(squeeze(vacancyHtml)),
  );
  if (!targetMatch) fail("「令和N年M月D日各保育施設等の受入可能人数」を読み取れませんでした");
  const targetLabel = `${Number(targetMatch[1]) + 2018}年${Number(targetMatch[2])}月${Number(targetMatch[3])}日`;

  const vacancyTables = parseTables(vacancyHtml).filter((t) => t[0]?.[0] === "施設名");
  if (vacancyTables.length !== 1) {
    fail(`受入可能人数の表が${vacancyTables.length}個です（1個のはず）`);
  }
  const vacancy = readTable(vacancyTables[0], "受入可能人数");

  // 入所状況のページには「入所・入園状況」と「入所待ち児童数」の2つの表がある
  const statusTables = parseTables(statusHtml).filter((t) => t[0]?.[0]?.startsWith("保育所"));
  if (statusTables.length !== 2) {
    fail(`入所状況のページの表が${statusTables.length}個です（2個のはず）`);
  }
  const enrolled = readTable(statusTables[0], "入所・入園状況");
  const waiting = readTable(statusTables[1], "入所待ち児童数");

  if (vacancy.length !== enrolled.length || vacancy.length !== waiting.length) {
    fail(
      `3つの表で施設数が違います（受入可能 ${vacancy.length} / 在籍 ${enrolled.length} / 入所待ち ${waiting.length}）`,
    );
  }

  const facilities: {
    id: string;
    name: string;
    w: null;
    vacancy: (number | null)[];
    waiting: (number | null)[];
    enrolled: (number | null)[];
  }[] = [];
  const seen = new Set<string>();
  let openSum = 0;
  let waitingSum = 0;
  let enrolledSum = 0;
  let notOffered = 0;

  for (let i = 0; i < vacancy.length; i++) {
    const v = vacancy[i];
    const e = enrolled[i];
    const w = waiting[i];
    // 3つの表は同じ並びのはず
    if (v.name !== e.name || v.name !== w.name) {
      fail(`${i + 1}番目の施設名が3つの表で違います（${v.name} / ${e.name} / ${w.name}）`);
    }
    if (seen.has(v.name)) fail(`施設名が重複しています: ${v.name}`);
    seen.add(v.name);

    for (let age = 0; age < AGE_COUNT; age++) {
      // 「-」（クラスなし）の位置も3つの表で揃うはず
      const nulls = [v.values[age], e.values[age], w.values[age]].filter((x) => x === null).length;
      if (nulls !== 0 && nulls !== 3) {
        fail(`${v.name}: ${age}歳児の「${NO_CLASS}」が3つの表で揃っていません`);
      }
      if (nulls === 3) notOffered += 1;
    }

    openSum += v.total;
    enrolledSum += e.total;
    waitingSum += w.total;
    facilities.push({
      id: v.name,
      name: v.name,
      w: null,
      vacancy: v.values,
      waiting: w.values,
      enrolled: e.values,
    });
  }

  if (facilities.length < MIN_FACILITIES) {
    fail(`施設が${facilities.length}件しか取れていません（${MIN_FACILITIES}件以上のはず）`);
  }
  if (openSum === 0) fail("受入可能人数がひとつもありません（読み取りに失敗している可能性があります）");
  console.log(
    `${facilities.length}施設 ／ 受入可能${openSum}人・在籍${enrolledSum}人・入所待ち${waitingSum}人・クラスなし${notOffered}欄`,
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
    `${targetLabel}入所に向けた受入可能人数です。在籍と入所待ちは${asOf}時点のもので、どちらのページも同じ日に更新されています。`,
    `公式の表で「${NO_CLASS}」になっている年齢は「—」にしています。その年齢のクラスがないことを表します。`,
    "受入可能人数は施設の運営の状況や在園児の退所により変わることがあります。",
  ];

  const dataset = {
    municipalitySlug: MUNICIPALITY_SLUG,
    municipalityName: MUNICIPALITY_NAME,
    asOf,
    fetchedAt: todayJst(),
    sourceName: SOURCE_NAME,
    sourceUrl: VACANCY_URL,
    sourceFiles: { status: STATUS_URL },
    metrics: ["vacancy", "waiting", "enrolled"],
    subtitle: `${targetLabel}入所の受入可能人数`,
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
  console.log(`  ${facilities.length}施設`);
}

main().catch((err) => fail(String(err)));
