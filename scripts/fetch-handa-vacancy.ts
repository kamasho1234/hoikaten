/**
 * 半田市の施設別空き状況を取り込む
 *
 * 実行: npm run vacancy:fetch:handa
 *
 * ## この自治体の特徴
 * - 公式ページのHTMLの表をそのまま読む（PDFではない）
 * - 凡例が本文にはっきり書かれている
 *   「×は定員を満たしていることを示しています」＝空き0
 *   「空欄はその年齢の受け入れを行っていないことを示しています」＝クラスなし
 * - 同じページに「園一覧」（受入年齢つき）と「施設別空き状況」の2つの表がある。
 *   **園一覧の受入年齢と、空き状況の空らんが合うかを検算に使う**
 * - 園の名前の書き方が2つの表で違う（「岩滑こども園※1」と「岩滑こども園（長時間利用）」、
 *   「認定こども園亀崎幼稚園」と「亀崎幼稚園」）ので、注の番号と括弧を落として照合する
 * - 「×」に U+00D7 と U+2715 が混ざっている
 */

import fs from "node:fs";
import path from "node:path";

const MUNICIPALITY_SLUG = "handa";
const MUNICIPALITY_NAME = "半田市";
const SOURCE_NAME = "半田市「令和8年度保育所等入園申込随時募集案内」";
const SOURCE_URL = "https://www.city.handa.lg.jp/kosodate/hoikuen-youchien/1002100/1010914.html";
const AGE_COUNT = 6;
const MIN_FACILITIES = 20;
const UA = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);

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
    .replace(/<[^>]+>/g, " ")
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

function toHalfWidth(s: string): string {
  return s.replace(/[０-９]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xfee0));
}

/** 表に出てくる「×」のゆれをそろえる */
function shapeOf(mark: string): string {
  if (/^[×✕✖]$/.test(mark)) return CLOSED_MARK;
  return mark;
}

/** 2つの表で書き方が違うので、注の番号と括弧書きを落として照合する */
function keyOf(name: string): string {
  return squeeze(name)
    .replace(/※\d+/g, "")
    .replace(/[（(][^）)]*[）)]/g, "");
}

/** 「0歳～5歳」「3歳～5歳」「0歳～2歳」から、受け入れている年齢クラスを出す */
function agesOf(accept: string): number[] | null {
  const text = toHalfWidth(squeeze(accept));
  const m = /^(\d+)歳[～〜~](\d+)歳$/.exec(text);
  if (!m) return null;
  const start = Number(m[1]);
  const end = Number(m[2]);
  if (start > end || end >= AGE_COUNT) return null;
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
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

  const asOfMatch = /令和(\d+)年(\d+)月(\d+)日現在の受入可能数/.exec(flat);
  if (!asOfMatch) fail("「令和N年M月D日現在の受入可能数」を読み取れませんでした");
  const asOf = `${Number(asOfMatch[1]) + 2018}-${asOfMatch[2].padStart(2, "0")}-${asOfMatch[3].padStart(2, "0")}`;
  if (asOf > todayJst()) fail(`時点の日付（${asOf}）が今日より先になっています`);

  const targetMatch = /令和(\d+)年(\d+)月入園募集時点の施設別の空き状況/.exec(flat);
  if (!targetMatch) fail("「令和N年M月入園募集時点の施設別の空き状況」を読み取れませんでした");
  const targetLabel = `${Number(targetMatch[1]) + 2018}年${Number(targetMatch[2])}月`;

  // 凡例が本文から消えていないかを確かめる。消えていたら読み方が変わった合図
  if (!/[×✕]は定員を満たしていることを示しています/.test(flat)) {
    fail("「×は定員を満たしていることを示しています」が本文にありません");
  }
  if (!/空欄はその年齢の受け入れを行っていないことを示しています/.test(flat)) {
    fail("「空欄はその年齢の受け入れを行っていないことを示しています」が本文にありません");
  }

  const tables = parseTables(html);

  // 園一覧（受入年齢つき）
  const listTable = tables.find(
    (t) => t[0]?.includes("施設名") && t[0]?.some((h) => h.startsWith("受入年齢")),
  );
  if (!listTable) fail("「園一覧」の表が見つかりません");
  const listHead = listTable[0];
  const colListName = listHead.indexOf("施設名");
  const colAccept = listHead.findIndex((h) => h.startsWith("受入年齢"));
  const accepts = new Map<string, number[]>();
  for (const values of listTable.slice(1)) {
    const name = values[colListName];
    if (!name) continue;
    const ages = agesOf(values[colAccept]);
    if (ages === null) fail(`${name}: 受入年齢を読み取れません（「${values[colAccept]}」）`);
    const key = keyOf(name);
    if (accepts.has(key)) fail(`園一覧に同じ名前が2回出てきます: ${name}`);
    accepts.set(key, ages);
  }
  if (accepts.size < MIN_FACILITIES) fail(`園一覧が${accepts.size}件しかありません`);

  // 施設別空き状況
  const vacancyTable = tables.find(
    (t) => t[0]?.[0] === "園名" && t[0]?.[1] === "0歳児" && t[0]?.length === AGE_COUNT + 1,
  );
  if (!vacancyTable) fail("「施設別空き状況」の表が見つかりません");
  for (let age = 0; age < AGE_COUNT; age++) {
    if (vacancyTable[0][1 + age] !== `${age}歳児`) {
      fail(`年齢の見出しが想定と違います: ${vacancyTable[0].join(",")}`);
    }
  }

  const facilities: {
    id: string;
    name: string;
    w: null;
    vacancy: (number | null)[];
  }[] = [];
  const seen = new Set<string>();
  const usedKeys = new Set<string>();
  let openSum = 0;
  let closedCells = 0;
  let notOffered = 0;

  for (const values of vacancyTable.slice(1)) {
    const name = values[0];
    if (!name) continue;
    if (values.length !== AGE_COUNT + 1) {
      fail(`${name}: 欄が${values.length - 1}個です（${AGE_COUNT}個のはず）`);
    }
    if (seen.has(name)) fail(`施設名が重複しています: ${name}`);
    seen.add(name);

    // 園一覧と照合する。書き方が違うので、片方がもう片方を含む形も認める
    const key = keyOf(name);
    const matched = [...accepts.keys()].filter(
      (k) => k === key || k.includes(key) || key.includes(k),
    );
    if (matched.length !== 1) {
      fail(`${name}: 園一覧の中で対応する園が${matched.length}件です（1件のはず）`);
    }
    if (usedKeys.has(matched[0])) fail(`${name}: 園一覧の同じ園に2回対応づきました`);
    usedKeys.add(matched[0]);
    const ages = accepts.get(matched[0])!;

    const vacancy: (number | null)[] = [];
    for (let age = 0; age < AGE_COUNT; age++) {
      const raw = shapeOf(toHalfWidth(values[1 + age]));
      if (raw === "") {
        // 空らんはその年齢の受け入れをしていない園。園一覧の受入年齢と合うはず
        if (ages.includes(age)) {
          fail(`${name}: ${age}歳が空らんですが、園一覧では受け入れる年齢になっています`);
        }
        notOffered += 1;
        vacancy.push(null);
        continue;
      }
      if (!ages.includes(age)) {
        fail(`${name}: 園一覧の受入年齢の外の${age}歳に「${raw}」が入っています`);
      }
      if (raw === CLOSED_MARK) {
        closedCells += 1;
        vacancy.push(0);
        continue;
      }
      if (!/^\d+$/.test(raw)) fail(`${name}: ${age}歳が数でも「×」でもありません（「${raw}」）`);
      const n = Number(raw);
      if (n <= 0 || n > 99) fail(`${name}: ${age}歳の人数が想定の範囲外です（「${raw}」）`);
      openSum += n;
      vacancy.push(n);
    }

    facilities.push({ id: name, name, w: null, vacancy });
  }

  if (facilities.length < MIN_FACILITIES) {
    fail(`施設が${facilities.length}件しか取れていません（${MIN_FACILITIES}件以上のはず）`);
  }
  // 検算1: 園一覧の園がすべて空き状況の表にも出てきたか
  if (usedKeys.size !== accepts.size) {
    const missing = [...accepts.keys()].filter((k) => !usedKeys.has(k));
    fail(`園一覧にあって空き状況の表にない園があります: ${missing.join("、")}`);
  }
  // 検算2: 欄の数が施設数×年齢数になるか
  const cells = closedCells + notOffered;
  const numberCells = facilities.reduce(
    (a, f) => a + f.vacancy.filter((v) => v !== null && v > 0).length,
    0,
  );
  if (cells + numberCells !== facilities.length * AGE_COUNT) {
    fail(`欄の数が合いません（${cells + numberCells} / 施設${facilities.length}×${AGE_COUNT}）`);
  }
  if (openSum === 0) fail("受入可能数がひとつもありません（読み取りに失敗している可能性があります）");
  console.log(
    `${facilities.length}施設 ／ 受入可能${openSum}人・定員充足${closedCells}欄・受け入れなし${notOffered}欄`,
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
    `${targetLabel}入園募集時点の受入可能数です。${asOf}時点のものです。`,
    "公式が「×」（定員を満たしている）としている年齢は0にしています。",
    "公式の表で空らんになっている年齢は「—」にしています。その年齢の受け入れをしていないことを表しています。",
    "認定こども園は長時間利用児（保育園と同じ使い方）の分です。",
    "空き状況は変わることがあります。申し込む前に公式ページで確かめてください。",
  ];

  const dataset = {
    municipalitySlug: MUNICIPALITY_SLUG,
    municipalityName: MUNICIPALITY_NAME,
    asOf,
    fetchedAt: todayJst(),
    sourceName: SOURCE_NAME,
    sourceUrl: SOURCE_URL,
    metrics: ["vacancy"],
    subtitle: `${targetLabel}入園募集時点の受入可能数`,
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
