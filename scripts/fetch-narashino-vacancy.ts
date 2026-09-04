/**
 * 習志野市の保育所等の空き状況を取り込む
 *
 * 実行: npm run vacancy:fetch:narashino
 *
 * ## この自治体の特徴
 * - **空きを人数ではなく記号で公表している**（○＝3人以上、△＝1〜2人、×＝空きなし）。
 *   記号から人数を決めつけることはできないので、**記号のまま持って記号のまま見せる**。
 *   このため metrics は "symbol" だけで、空き人数の合計は出さない
 * - 空き状況はPDFではなくページの表に直接書かれている
 * - 施設の種類（市立保育所・私立保育所など）は、表の左端に変わる行だけ入る
 * - 「―」はそのクラスを設けていないこと
 */

import fs from "node:fs";
import path from "node:path";

const MUNICIPALITY_SLUG = "narashino";
const MUNICIPALITY_NAME = "習志野市";
const SOURCE_NAME = "習志野市「保育所等空き状況」";
const INDEX_URL =
  "https://www.city.narashino.lg.jp/soshiki/kodomo_hoiku/gyomu/hoikugakko/akireigetu.html";
const AGE_COUNT = 6;

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);

function fail(message: string): never {
  console.error(`\n[中断] ${message}`);
  process.exit(1);
}

function todayJst(): string {
  const jst = new Date(Date.now() + 9 * 60 * 60 * 1000);
  return jst.toISOString().slice(0, 10);
}

function reiwaToYear(reiwa: number): number {
  return 2018 + reiwa;
}

function toHalfWidth(s: string): string {
  return s.replace(/[０-９]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xfee0));
}

function stripTags(html: string): string {
  return html
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/[\s　]+/g, " ")
    .trim();
}

function squeeze(s: string): string {
  return (s ?? "").replace(/[\s　]/g, "");
}

/** 丸は「○」「◯」「〇」と書き方がまちまちなので、1つにそろえる */
function normalizeMark(mark: string): string {
  const t = squeeze(mark);
  if (/^[○◯〇]$/.test(t)) return "○";
  if (/^[△▲]$/.test(t)) return "△";
  if (/^[×✕✖x]$/i.test(t)) return "×";
  if (/^[-－―‐‒–—ー−]$/.test(t)) return "―";
  return t;
}

async function main() {
  console.log(`${MUNICIPALITY_NAME}の空き状況を取り込みます`);
  console.log(`公式ページ: ${INDEX_URL}\n`);

  const ua = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";
  const res = await fetch(INDEX_URL, { headers: { "User-Agent": ua } });
  if (!res.ok) fail(`公式ページが ${res.status} を返しました`);
  const html = await res.text();

  const flat = toHalfWidth(stripTags(html)).replace(/\s/g, "");
  const target = flat.match(/令和(\d+)年(\d+)月保育所等空き状況/);
  if (!target) fail("対象月を読み取れませんでした。ページの構成が変わった可能性があります。");
  const year = reiwaToYear(Number(target[1]));
  const month = Number(target[2]);
  const asOfMatch = flat.match(/令和(\d+)年(\d+)月(\d+)日現在/);
  if (!asOfMatch) fail("基準日を読み取れませんでした");
  const asOf = [
    reiwaToYear(Number(asOfMatch[1])),
    String(asOfMatch[2]).padStart(2, "0"),
    String(asOfMatch[3]).padStart(2, "0"),
  ].join("-");
  console.log(`基準日: ${asOf} / 対象: ${year}年${month}月入所`);

  // 「○：3人以上空きあり △：1～2人空きあり ×：空きなし」を凡例として読む
  const legendSource = flat.match(/([○◯〇]：[^×]+?)([△▲]：[^×]+?)(×：[^令]+?)令和/);
  if (!legendSource) fail("記号の凡例を読み取れませんでした。ページの説明が変わった可能性があります。");
  const symbolLegend = [
    { mark: "○", label: squeeze(legendSource[1]).replace(/^[○◯〇]：/, ""), open: true },
    { mark: "△", label: squeeze(legendSource[2]).replace(/^[△▲]：/, ""), open: true },
    { mark: "×", label: squeeze(legendSource[3]).replace(/^×：/, ""), open: false },
  ];
  console.log(`凡例: ${symbolLegend.map((l) => `${l.mark}＝${l.label}`).join(" / ")}`);

  const tables = html.match(/<table[\s\S]*?<\/table>/gi) ?? [];
  if (tables.length !== 1) fail(`ページに表が${tables.length}個あります（1個を想定）`);
  const rows = tables[0].match(/<tr[\s\S]*?<\/tr>/gi) ?? [];
  if (rows.length < 10) fail(`表の行が${rows.length}行しかありません`);

  const categories: string[] = [];
  const facilities: {
    id: string;
    name: string;
    w: null;
    c: number;
    vacancy: (number | null)[];
    symbols: (string | null)[];
  }[] = [];
  const seenId = new Set<string>();
  const marks = new Map<string, number>();
  let category = "";

  for (const row of rows) {
    const cells = (row.match(/<t[dh][^>]*>[\s\S]*?<\/t[dh]>/gi) ?? []).map((c) => stripTags(c));
    // 見出しの2行（「名称／定員／年齢区分」と「0歳児…」）は読み飛ばす
    if (cells.length < 8) continue;
    if (squeeze(cells[0]) === "名称") continue;

    // 種類が入る行は列が1つ多い
    const hasCategory = cells.length >= AGE_COUNT + 3;
    if (hasCategory) category = squeeze(cells[0]);
    const name = squeeze(cells[hasCategory ? 1 : 0]);
    const ageCells = cells.slice(cells.length - AGE_COUNT);
    if (!name) continue;
    if (!category) fail(`${name}: 施設の種類が分かりません`);

    const symbols = ageCells.map((raw) => {
      const mark = normalizeMark(raw);
      // 「―」と空欄はそのクラスを設けていない
      if (mark === "" || mark === "―") return null;
      if (!["○", "△", "×"].includes(mark)) {
        fail(`${name}: 記号として読めません: 「${raw}」`);
      }
      marks.set(mark, (marks.get(mark) ?? 0) + 1);
      return mark;
    });

    if (!categories.includes(category)) categories.push(category);
    const id = `${category}-${name}`;
    if (seenId.has(id)) fail(`施設名が重複しています: ${id}`);
    seenId.add(id);
    facilities.push({
      id,
      name,
      w: null,
      c: categories.indexOf(category),
      // 人数は公開されていないので空にしておく（記号は symbols に持つ）
      vacancy: new Array(AGE_COUNT).fill(null),
      symbols,
    });
  }

  if (facilities.length < 30) fail(`施設が${facilities.length}件しか取れていません`);
  // 凡例にある記号がひとつも出てこないときは、読み方がずれている
  for (const item of symbolLegend) {
    if (!marks.has(item.mark)) fail(`凡例にある「${item.mark}」が表に1つも出てきません`);
  }

  const previous = fs.existsSync(OUT_PATH)
    ? (JSON.parse(fs.readFileSync(OUT_PATH, "utf-8")) as { asOf?: string; facilities?: unknown[]; sourceFiles?: Record<string, string> })
    : null;
  if (previous?.facilities && facilities.length < previous.facilities.length * 0.9) {
    fail(
      `施設数が大きく減っています（前回 ${previous.facilities.length}件 → 今回 ${facilities.length}件）`
    );
  }
  // 自治体は基準日を変えずに資料を差し替えることがある。
  // 取り込み元の一式も同じときだけ、書き換えを見送る
  if (
    previous?.asOf === asOf &&
    JSON.stringify(previous?.sourceFiles ?? {}) === JSON.stringify({ vacancy: INDEX_URL })
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
    sourceFiles: { vacancy: INDEX_URL },
    metrics: ["symbol"],
    subtitle: `${year}年${month}月入所の空き状況`,
    notes: [
      "習志野市は空きを人数ではなく記号で公表しています。当サイトでも公式の記号のまま載せています。",
      "私立保育所は保育士の配置状況などにより空き状況が変わることがあります。",
      "「—」はそのクラスを設けていない施設です。",
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
  console.log("");
  for (const [i, cat] of categories.entries()) {
    console.log(`  ${cat} ${facilities.filter((f) => f.c === i).length}施設`);
  }
  console.log("");
  console.log("  記号の出てきた数");
  for (const item of symbolLegend) {
    console.log(`  ${item.mark}（${item.label}） ${marks.get(item.mark) ?? 0}`);
  }
}

main().catch((err) => fail(String(err)));
