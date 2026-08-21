/**
 * 八千代市の保育園等の空き状況を取り込む
 *
 * 実行: npm run vacancy:fetch:yachiyo
 *
 * ## この自治体の特徴
 * - **空きは記号**（○＝4人以上、△＝1〜3人、×＝空きなし）。PDFではなくページの表に載る
 * - 施設が設けていないクラスは「-」。空白になっている行もあるので、どちらもクラスなしとして扱う
 * - 表の左端に区分（公立保育園・私立保育園・認定こども園・小規模保育事業所）が
 *   縦結合で入る。これを施設類型として持つ
 */

import fs from "node:fs";
import path from "node:path";

const MUNICIPALITY_SLUG = "yachiyo";
const MUNICIPALITY_NAME = "八千代市";
const SOURCE_NAME = "八千代市「保育園等空き状況一覧」";
const INDEX_URL = "https://www.city.yachiyo.lg.jp/soshiki/31/3266.html";
const AGE_COUNT = 6;
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

function toHalfWidth(s: string): string {
  return s.replace(/[０-９]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xfee0));
}

/** ゼロ幅スペースが混ざっているセルがあるので、空白と一緒に落とす */
function squeeze(s: string): string {
  return (s ?? "").replace(/[\s　​﻿]/g, "");
}

function decode(html: string): string {
  return html
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&times;/g, "×")
    .replace(/&hellip;/g, "…")
    .replace(/&amp;/g, "&")
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/[\s　]+/g, " ")
    .trim();
}

/** rowspan・colspan を埋めながら table を二次元配列にする */
function parseTable(html: string): string[][] {
  const rows: string[][] = [];
  const pending = new Map<number, { text: string; left: number }>();
  for (const rowMatch of html.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi)) {
    const cells: string[] = [];
    const carry = [...pending.entries()].sort((a, b) => a[0] - b[0]);
    const putCarry = () => {
      for (const [col, held] of carry) {
        if (col === cells.length) {
          cells.push(held.text);
          held.left -= 1;
          if (held.left <= 0) pending.delete(col);
        }
      }
    };
    putCarry();
    for (const cellMatch of rowMatch[1].matchAll(/<t[hd]([^>]*)>([\s\S]*?)<\/t[hd]>/gi)) {
      const attrs = cellMatch[1];
      const text = decode(cellMatch[2]);
      const rowspan = Number(attrs.match(/rowspan\s*=\s*"?(\d+)/i)?.[1] ?? 1);
      const colspan = Number(attrs.match(/colspan\s*=\s*"?(\d+)/i)?.[1] ?? 1);
      for (let i = 0; i < colspan; i++) {
        const col = cells.length;
        cells.push(text);
        if (rowspan > 1) pending.set(col, { text, left: rowspan - 1 });
      }
      putCarry();
    }
    rows.push(cells);
  }
  return rows;
}

async function main() {
  console.log(`${MUNICIPALITY_NAME}の空き状況を取り込みます`);
  console.log(`公式ページ: ${INDEX_URL}\n`);

  const res = await fetch(INDEX_URL, { headers: { "User-Agent": UA } });
  if (!res.ok) fail(`公式ページが ${res.status} を返しました`);
  const html = await res.text();
  const body = decode(html.replace(/<script[\s\S]*?<\/script>/gi, ""));

  // 「令和８年８月１日現在の保育園等空き状況をお知らせします。」
  const asOfMatch = toHalfWidth(body).match(/令和(\d+)年(\d+)月(\d+)日現在の保育園等空き状況/);
  if (!asOfMatch) fail("基準日をページから読み取れませんでした");
  const asOf = `${2018 + Number(asOfMatch[1])}-${asOfMatch[2].padStart(2, "0")}-${asOfMatch[3].padStart(2, "0")}`;
  console.log(`基準日: ${asOf}`);

  // 「○…4人以上空きあり　△…1～3人の空きあり　×…空きなし」
  const legendMatch = toHalfWidth(body).match(/○…(\S+?)\s+△…(\S+?)\s+×…(\S+)/);
  if (!legendMatch) fail("記号の凡例をページから読み取れませんでした");
  const symbolLegend = [
    { mark: "○", label: legendMatch[1], open: true },
    { mark: "△", label: legendMatch[2], open: true },
    { mark: "×", label: legendMatch[3], open: false },
  ];
  console.log(`凡例: ${symbolLegend.map((l) => `${l.mark}＝${l.label}`).join(" / ")}`);
  const knownMarks = new Set(symbolLegend.map((l) => l.mark));

  const tables = [...html.matchAll(/<table[^>]*>([\s\S]*?)<\/table>/gi)];
  if (tables.length !== 1) fail(`ページに表が${tables.length}個あります`);
  const rows = parseTable(tables[0][1]);

  // 見出しは2行。「保育園名／定員／クラス年齢」と「0歳児〜5歳児」
  const headIndex = rows.findIndex((r) => r.some((c) => squeeze(c) === "保育園名"));
  if (headIndex < 0) fail("見出しの行が見つかりません");
  const ageHead = rows[headIndex + 1];
  if (!ageHead) fail("年齢の見出し行が見つかりません");
  // 施設の行は「区分／保育園名／定員／0歳児〜5歳児」の9列
  const nameCol = rows[headIndex].findIndex((c) => squeeze(c) === "保育園名");
  const zeroCol = nameCol + 2;
  for (let age = 0; age < AGE_COUNT; age++) {
    if (toHalfWidth(squeeze(ageHead[zeroCol + age] ?? "")) !== `${age}歳児`) {
      fail(`年齢の並びが変わりました: ${ageHead.slice(zeroCol, zeroCol + AGE_COUNT).join(" ")}`);
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
  const marks = new Map<string, number>();
  const seen = new Set<string>();

  for (const row of rows.slice(headIndex + 2)) {
    if (row.length < zeroCol + AGE_COUNT) continue;
    const kind = squeeze(row[0]);
    const name = decode(row[nameCol]).replace(/[​﻿]/g, "").trim();
    if (!kind || !name) continue;
    const capacity = toHalfWidth(squeeze(row[nameCol + 1] ?? ""));
    if (!/^\d+$/.test(capacity)) fail(`${name}: 定員として読めません: 「${row[nameCol + 1]}」`);
    if (seen.has(name)) fail(`施設名が重複しています: ${name}`);
    seen.add(name);
    if (!categories.includes(kind)) categories.push(kind);

    const symbols: (string | null)[] = [];
    for (let age = 0; age < AGE_COUNT; age++) {
      const raw = squeeze(row[zeroCol + age] ?? "");
      // 「-」はそのクラスを設けていない。空欄になっている行もある
      if (raw === "" || raw === "-" || raw === "－" || raw === "ー") {
        symbols.push(null);
        continue;
      }
      if (!knownMarks.has(raw)) fail(`${name}: 凡例にない記号です: 「${row[zeroCol + age]}」`);
      marks.set(raw, (marks.get(raw) ?? 0) + 1);
      symbols.push(raw);
    }
    if (symbols.every((s) => s === null)) fail(`${name}: 全てのクラスが空です`);

    facilities.push({
      id: name,
      name,
      w: null,
      c: categories.indexOf(kind),
      vacancy: new Array(AGE_COUNT).fill(null),
      symbols,
    });
  }

  if (facilities.length < 40) fail(`施設が${facilities.length}件しか取れていません`);
  for (const item of symbolLegend) {
    if (!marks.has(item.mark)) fail(`凡例にある「${item.mark}」が表に1つも出てきません`);
  }

  // 表を読み違えていないか、ページの本文に出てくる記号の数と突き合わせる
  const tableText = decode(tables[0][1]).replace(/[\s　​]/g, "");
  for (const item of symbolLegend) {
    const inHtml = [...tableText].filter((c) => c === item.mark).length;
    const got = marks.get(item.mark) ?? 0;
    if (inHtml !== got) {
      fail(`「${item.mark}」の数が合いません（表の文字 ${inHtml}個 / 取り込み ${got}個）`);
    }
  }
  console.log(`記号の数は表の文字と一致しました`);

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
    subtitle: "保育園等の空き状況",
    notes: [
      "八千代市は空きを人数ではなく記号で公表しています。当サイトでも公式の記号のまま載せています。",
      "空きがあっても申込状況等によっては、必ず入園できるわけではありません。",
      "急な退園や保育士の配置状況等により、空き状況が変わることがあります。",
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
  console.log(`  ${facilities.length}施設 / ${categories.length}類型（${categories.join("・")}）`);
  console.log("");
  console.log("  記号の出てきた数");
  for (const item of symbolLegend) {
    console.log(`  ${item.mark}（${item.label}） ${marks.get(item.mark) ?? 0}`);
  }
}

main().catch((err) => fail(String(err)));
