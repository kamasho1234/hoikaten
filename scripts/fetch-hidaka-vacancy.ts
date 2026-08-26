/**
 * 日高市の保育所等の空き状況を取り込む
 *
 * 実行: npm run vacancy:fetch:hidaka
 *
 * ## この自治体の特徴
 * - 公式ページのHTMLの表をそのまま読む
 * - **空きを記号ではなく言葉で公表している**（「空きあり」「若干名」「空きなし」
 *   「受け入れ枠なし」「受け入れ停止」）
 * - 注釈に「「空きあり」は5人以上、「若干名」は4人以下」と書かれている
 * - 「受け入れ枠なし」はその年齢の枠がないことなので「—」にする
 * - 「受け入れ停止」は閉所を控えた園が受け入れを止めているもので、
 *   空きなしとは意味が違うのでそのまま出す
 */

import fs from "node:fs";
import path from "node:path";

const MUNICIPALITY_SLUG = "hidaka";
const MUNICIPALITY_NAME = "日高市";
const SOURCE_NAME = "日高市「保育所等の空き状況」";
const SOURCE_URL =
  "https://www.city.hidaka.lg.jp/soshiki/fukushikodomo/kosodateoen/hoiku/kosodate/shiritai/yochienhoikujonado/17319.html";
const AGE_COUNT = 6;
const MIN_FACILITIES = 10;
const UA = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);

/** その年齢の枠がないことを表す言葉。これだけは「—」にする */
const NO_CLASS = "受け入れ枠なし";
/** 空きがないことを表す言葉 */
const NO_VACANCY = "空きなし";

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

function toHalfWidth(s: string): string {
  return s.replace(/[０-９]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xfee0));
}

async function main() {
  console.log(`${MUNICIPALITY_NAME}の空き状況を取り込みます`);
  console.log(`公式ページ: ${SOURCE_URL}\n`);

  const res = await fetch(SOURCE_URL, { headers: { "User-Agent": UA }, redirect: "follow" });
  if (!res.ok) fail(`公式ページが ${res.status} を返しました`);
  const html = await res.text();
  const flat = toHalfWidth(squeeze(html));

  const updated = /更新日[：:](\d{4})年(\d{1,2})月(\d{1,2})日/.exec(flat);
  if (!updated) fail("「更新日：YYYY年M月D日」を読み取れませんでした");
  const asOf = `${updated[1]}-${updated[2].padStart(2, "0")}-${updated[3].padStart(2, "0")}`;
  if (asOf > todayJst()) fail(`更新日（${asOf}）が今日より先になっています`);

  const targetMatch = /令和(\d+)年(\d+)月入所選考における空き状況/.exec(flat);
  if (!targetMatch) fail("「令和N年M月入所選考における空き状況」を読み取れませんでした");
  const targetLabel = `${Number(targetMatch[1]) + 2018}年${Number(targetMatch[2])}月`;

  // 「「空きあり」は5人以上、「若干名」は4人以下の空き状況となります。」
  const legendMatch = /「([^」]+)」は(\d+)人以上、「([^」]+)」は(\d+)人以下の空き状況/.exec(flat);
  if (!legendMatch) fail("「「空きあり」は5人以上、「若干名」は4人以下」の注釈が見つかりません");
  const symbolLegend = [
    { mark: legendMatch[1], label: `${legendMatch[2]}人以上の空き`, open: true },
    { mark: legendMatch[3], label: `${legendMatch[4]}人以下の空き`, open: true },
    { mark: NO_VACANCY, label: "空きなし", open: false },
  ];

  const tables = [...html.matchAll(/<table[\s\S]*?<\/table>/gi)].map((t) =>
    [...t[0].matchAll(/<tr[\s\S]*?<\/tr>/gi)].map((r) =>
      [...r[0].matchAll(/<t[dh][\s\S]*?<\/t[dh]>/gi)].map((c) => squeeze(c[0])),
    ),
  );
  const table = tables.find((t) => t[0]?.[0] === "施設名" && t[0]?.length === AGE_COUNT + 1);
  if (!table) fail("空き状況の表が見つかりません");
  for (let age = 0; age < AGE_COUNT; age++) {
    if (table[0][1 + age] !== `${age}歳`) {
      fail(`年齢の見出しが想定と違います: ${table[0].join(",")}`);
    }
  }

  const facilities: {
    id: string;
    name: string;
    w: null;
    vacancy: (number | null)[];
    symbols: (string | null)[];
  }[] = [];
  const seen = new Set<string>();
  const words = new Map<string, number>();
  let notOffered = 0;

  for (const values of table.slice(1)) {
    const name = values[0];
    if (!name) continue;
    if (values.length !== AGE_COUNT + 1) {
      fail(`${name}: 欄が${values.length - 1}個です（${AGE_COUNT}個のはず）`);
    }
    if (seen.has(name)) fail(`施設名が重複しています: ${name}`);
    seen.add(name);

    const symbols: (string | null)[] = [];
    for (let age = 0; age < AGE_COUNT; age++) {
      const word = values[1 + age];
      if (!word) fail(`${name}: ${age}歳の欄が空です`);
      if (word === NO_CLASS) {
        notOffered += 1;
        symbols.push(null);
        continue;
      }
      words.set(word, (words.get(word) ?? 0) + 1);
      symbols.push(word);
    }

    facilities.push({
      id: name,
      name,
      w: null,
      vacancy: new Array(AGE_COUNT).fill(null),
      symbols,
    });
  }

  if (facilities.length < MIN_FACILITIES) {
    fail(`施設が${facilities.length}件しか取れていません（${MIN_FACILITIES}件以上のはず）`);
  }
  // 凡例に無い言葉（「受け入れ停止」など）も公式の表記のまま出す。
  // ただし意味が分かるように、本文からその言葉の説明を探しておく
  for (const word of words.keys()) {
    if (symbolLegend.some((l) => l.mark === word)) continue;
    symbolLegend.push({
      mark: word,
      label: "公式の表記のまま（意味は下の注記を見てください）",
      open: false,
    });
  }
  // 検算: 欄の数が施設数×年齢数になるか
  const total = [...words.values()].reduce((a, b) => a + b, 0) + notOffered;
  if (total !== facilities.length * AGE_COUNT) {
    fail(`欄の数が合いません（${total} / 施設${facilities.length}×${AGE_COUNT}）`);
  }
  if (!words.has(symbolLegend[0].mark) && !words.has(symbolLegend[1].mark)) {
    fail("空きありの表記がひとつもありません（読み取りに失敗している可能性があります）");
  }
  console.log(
    `${facilities.length}施設 ／ ${[...words].map(([w, n]) => `${w}${n}`).join("・")}・枠なし${notOffered}`,
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

  // 本文の注釈（「（注釈1）…」）をそのまま持つ
  const remarks = [...flat.matchAll(/[（(]注釈\d+[）)]([^。]+。)/g)].map((m) => m[1]);
  const notes = [
    `日高市は空きを人数ではなく言葉で公表しています。これは${targetLabel}入所選考における空き状況で、${asOf}時点のものです。`,
    `「${NO_CLASS}」の年齢は「—」にしています。その年齢の枠がないことを表します。`,
    ...remarks,
  ];

  const dataset = {
    municipalitySlug: MUNICIPALITY_SLUG,
    municipalityName: MUNICIPALITY_NAME,
    prefecture: "埼玉県",
    asOf,
    fetchedAt: todayJst(),
    sourceName: SOURCE_NAME,
    sourceUrl: SOURCE_URL,
    metrics: ["symbol"],
    subtitle: `${targetLabel}入所選考における空き状況`,
    notes,
    wards: [] as string[],
    categories: [] as string[],
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
  console.log(`  ${facilities.length}施設`);
}

main().catch((err) => fail(String(err)));
