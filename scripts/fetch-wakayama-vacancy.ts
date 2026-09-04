/**
 * 和歌山市の保育所・認定こども園の空き状況を取り込む
 *
 * 実行: npm run vacancy:fetch:wakayama
 *
 * ## この自治体の特徴
 * - 公式ページのHTMLの表に記号（〇＝空き有り、▲＝若干名、×＝空きなし）が載っている
 * - 「-」はそのクラスを設けていない
 * - 保育所のページと認定こども園のページに分かれていて、
 *   それぞれの表の caption（「私立保育所」など）が施設の種類になる
 */

import fs from "node:fs";
import path from "node:path";

const MUNICIPALITY_SLUG = "wakayama";
const MUNICIPALITY_NAME = "和歌山市";
const SOURCE_NAME = "和歌山市「保育施設・幼稚園の空き状況」";
const INDEX_URL =
  "https://www.city.wakayama.wakayama.jp/kurashi/kosodate/1001104/1032937/index.html";
/** 保育所のページと認定こども園のページ */
const PAGES = [
  "https://www.city.wakayama.wakayama.jp/kurashi/kosodate/1001104/1032937/1008482.html",
  "https://www.city.wakayama.wakayama.jp/kurashi/kosodate/1001104/1032937/1032939.html",
];
const AGE_COUNT = 6;
const UA = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";

const NO_CLASS = /^[-－‐‑–—ー]$/;

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

function squeeze(s: string): string {
  return (s ?? "").replace(/[\s　]/g, "");
}

function stripTags(html: string): string {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&times;/g, "×")
    .replace(/&amp;/g, "&")
    .replace(/[\s　]+/g, " ")
    .trim();
}

function shapeOf(mark: string): string {
  return /^[○◯〇]$/.test(mark) ? "○" : mark;
}

type Page = {
  url: string;
  updated: string;
  target: number;
  legend: { mark: string; label: string }[];
  tables: { caption: string; rows: string[][] }[];
};

async function readPage(url: string): Promise<Page> {
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) fail(`公式ページが ${res.status} を返しました: ${url}`);
  const html = await res.text();
  const spaced = toHalfWidth(stripTags(html));
  const text = squeeze(spaced);

  const updated = text.match(/更新日令和(\d+)年(\d+)月(\d+)日/);
  if (!updated) fail(`更新日を読み取れませんでした: ${url}`);
  const target = text.match(/令和\d+年度(\d+)月の空き状況/);
  if (!target) fail(`対象月を読み取れませんでした: ${url}`);

  // 「〇・・・空き有り ▲・・・若干名 ×・・・空きなし」。
  // 空白を潰すと次の見出し（表のcaption）とつながるので、潰す前の文字列から読む
  const legend = [...spaced.matchAll(/([〇○◯▲△×✕])[・･]{2,}([^\s・･]{2,8})/g)].map((m) => ({
    mark: m[1],
    label: m[2],
  }));
  if (legend.length < 3) fail(`記号の凡例を読み取れませんでした（${legend.length}件）: ${url}`);

  const tables = [...html.matchAll(/<table[\s\S]*?<\/table>/gi)].map((m) => {
    const caption = squeeze(stripTags(m[0].match(/<caption[^>]*>([\s\S]*?)<\/caption>/i)?.[1] ?? ""));
    const rows = [...m[0].matchAll(/<tr[\s\S]*?<\/tr>/gi)].map((r) =>
      [...r[0].matchAll(/<t[hd][\s\S]*?<\/t[hd]>/gi)].map((c) => squeeze(stripTags(c[0])))
    );
    return { caption, rows };
  });

  return {
    url,
    updated: `${2018 + Number(updated[1])}-${updated[2].padStart(2, "0")}-${updated[3].padStart(2, "0")}`,
    target: Number(target[1]),
    legend,
    tables,
  };
}

async function main() {
  console.log(`${MUNICIPALITY_NAME}の空き状況を取り込みます`);
  console.log(`公式ページ: ${INDEX_URL}\n`);

  const pages: Page[] = [];
  for (const url of PAGES) pages.push(await readPage(url));

  const targets = new Set(pages.map((p) => p.target));
  if (targets.size !== 1) fail(`ページごとに対象月が違います: ${[...targets].join(" / ")}`);
  const targetMonth = pages[0].target;
  // ページごとに更新日が違うことがあるので、古いほうを時点とする
  const asOf = pages.map((p) => p.updated).sort()[0];
  if (asOf > todayJst()) fail(`更新日（${asOf}）が今日より先になっています`);
  console.log(`更新日: ${pages.map((p) => p.updated).join(" / ")} / 対象: ${targetMonth}月`);

  const legendMap = new Map<string, string>();
  for (const page of pages) {
    for (const item of page.legend) {
      const mark = shapeOf(item.mark);
      const known = legendMap.get(mark);
      if (known && known !== item.label) fail(`「${mark}」の意味が揺れています（${known} / ${item.label}）`);
      legendMap.set(mark, item.label);
    }
  }
  const order = ["○", "▲", "×"];
  const symbolLegend = [...legendMap.entries()]
    .sort((a, b) => order.indexOf(a[0]) - order.indexOf(b[0]))
    .map(([mark, label]) => ({ mark, label, open: !/なし$/.test(label) }));
  if (symbolLegend.some((l) => order.indexOf(l.mark) < 0)) {
    fail(`知らない記号が凡例に出てきました: ${symbolLegend.map((l) => l.mark).join("")}`);
  }
  console.log(`凡例: ${symbolLegend.map((l) => `${l.mark}＝${l.label}`).join(" / ")}`);

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
  const unknown: string[] = [];
  let noClass = 0;

  const expectedHead = ["施設名", ...Array.from({ length: AGE_COUNT }, (_, i) => `${i}歳児`)];
  for (const page of pages) {
    for (const table of page.tables) {
      if (table.rows.length < 2) continue;
      const head = table.rows[0].map((c) => toHalfWidth(c));
      if (head.length !== expectedHead.length || !head.every((h, i) => h === expectedHead[i])) {
        continue; // 空き状況の表ではない
      }
      const category = table.caption;
      if (!category) fail(`表に caption がありません: ${page.url}`);
      if (!categories.includes(category)) categories.push(category);

      for (const row of table.rows.slice(1)) {
        if (row.length !== expectedHead.length) {
          fail(`${category}: 欄が${row.length}個の行があります: ${row.join(",")}`);
        }
        const name = row[0];
        if (!name) fail(`${category}: 施設名が空の行があります`);
        if (seen.has(name)) fail(`施設名が重複しています: ${name}`);
        seen.add(name);

        const symbols: (string | null)[] = [];
        for (let age = 0; age < AGE_COUNT; age++) {
          const raw = row[age + 1];
          if (raw === "" || NO_CLASS.test(raw)) {
            noClass += 1;
            symbols.push(null);
            continue;
          }
          const mark = shapeOf(raw);
          if (!legendMap.has(mark)) {
            // 凡例にない記号がまれに入っている。意味が分からないので「—」にし、
            // どの施設のことかを注記に出す
            unknown.push(`${name}（${raw}）`);
            noClass += 1;
            symbols.push(null);
            continue;
          }
          marks.set(mark, (marks.get(mark) ?? 0) + 1);
          symbols.push(mark);
        }
        if (symbols.every((s) => s === null)) fail(`${name}: 全てのクラスが「—」です`);

        facilities.push({
          id: name,
          name,
          w: null,
          c: categories.indexOf(category),
          vacancy: new Array(AGE_COUNT).fill(null),
          symbols,
        });
      }
    }
  }

  if (facilities.length < 50) fail(`施設が${facilities.length}件しか取れていません`);
  if (unknown.length > facilities.length * 0.05) {
    fail(`凡例にない記号が${unknown.length}件もあります: ${unknown.slice(0, 5).join("、")}`);
  }

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
    JSON.stringify(previous?.sourceFiles ?? {}) === JSON.stringify(Object.fromEntries(PAGES.map((url, i) => [i === 0 ? "vacancy" : `vacancy${i + 1}`, url]))) &&
    JSON.stringify(previous?.facilities ?? null) === JSON.stringify(facilities)
  ) {
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
    sourceFiles: Object.fromEntries(PAGES.map((url, i) => [i === 0 ? "vacancy" : `vacancy${i + 1}`, url])),
    metrics: ["symbol"],
    subtitle: `${targetMonth}月の空き状況`,
    notes: [
      "和歌山市は空き状況を人数ではなく記号で公表しています。当サイトでも公式の記号のまま載せています。",
      "空き状況は常に変動しているので、目安としてご覧ください。保育の必要度の高い方から順に決まるため、空きがあっても入園できるとは限りません。",
      "空きがある場合でも園の職員体制や保育室の状況により受け入れできないことがあり、空きがない場合でも退園する方があれば入園できることがあります。",
      "年齢はその年度の4月1日時点のものです。設けていないクラスは「—」にしています。",
      "幼稚園（1号認定）の空き状況は載せていません。公式ページをご覧ください。",
      ...(unknown.length > 0
        ? [
            `次の施設には、公式の表で凡例にない記号が入っている欄があります。意味が分からないため当サイトでは「—」にしています（かっこ内は公式の記号）: ${unknown.join("、")}`,
          ]
        : []),
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
  console.log(`  ${facilities.length}施設 / ${categories.length}種類（${categories.join("、")}）`);
  console.log(`  設けていないクラス: ${noClass}（うち凡例にない記号 ${unknown.length}）`);
  console.log("");
  console.log("  記号の出てきた数");
  for (const item of symbolLegend) {
    console.log(`  ${item.mark}（${item.label}） ${marks.get(item.mark) ?? 0}`);
  }
}

main().catch((err) => fail(String(err)));
