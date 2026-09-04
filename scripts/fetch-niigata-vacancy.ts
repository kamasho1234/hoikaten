/**
 * 新潟市の保育園等の空き状況を取り込む
 *
 * 実行: npm run vacancy:fetch:niigata
 *
 * ## この自治体の特徴
 * - **8区ぶんが1ページの表に入っている**（PDFではない）。区の見出し（h3）と表が交互に並ぶ
 * - 空きは記号（○＝4名以上、△＝1〜3名、×＝空き無し、ー＝受入対応なし）。
 *   凡例もページの表になっている
 * - **申請番号が区ごとに連番**なので、抜けがないかを番号で確かめられる
 */

import fs from "node:fs";
import path from "node:path";

const MUNICIPALITY_SLUG = "niigata";
const MUNICIPALITY_NAME = "新潟市";
const SOURCE_NAME = "新潟市「保育園等空き状況」";
const INDEX_URL =
  "https://www.city.niigata.lg.jp/kosodate/ninshin/life_stage/azuketai/ninnkahoikushisetsu/hoiku_akizyokyo.html";
const AGE_COUNT = 6;
const UA = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";

/** 「ー」は受入対応なし。記号ではなくクラスなしとして持つ */
const NO_CLASS_MARKS = ["ー", "－", "-", "‐", "―"];

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

function squeeze(s: string): string {
  return (s ?? "").replace(/[\s　​]/g, "");
}

function decode(html: string): string {
  return html
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&times;/g, "×")
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

  // 「10月入園空き状況（令和8年8月18日現在）」
  const title = toHalfWidth(decode(html)).match(
    /(\d+)月入園空き状況（令和(\d+)年(\d+)月(\d+)日現在）/
  );
  if (!title) fail("見出しから対象月と作成日を読み取れませんでした");
  const targetMonth = Number(title[1]);
  const asOf = `${reiwaToYear(Number(title[2]))}-${title[3].padStart(2, "0")}-${title[4].padStart(2, "0")}`;
  const asOfMonth = Number(title[3]);
  const targetYear = targetMonth < asOfMonth ? reiwaToYear(Number(title[2])) + 1 : reiwaToYear(Number(title[2]));
  console.log(`作成日: ${asOf} / 対象: ${targetYear}年${targetMonth}月入園`);

  // 表と、その直前の見出し（h3）を組にする
  const blocks = [...html.matchAll(/<h3[^>]*>([\s\S]*?)<\/h3>|<table[^>]*>([\s\S]*?)<\/table>/gi)];
  const legendTable = blocks.find((b) => b[2] && /入園できる可能性/.test(b[2]));
  if (!legendTable) fail("凡例の表が見つかりません");

  const symbolLegend: { mark: string; label: string; open: boolean }[] = [];
  for (const row of parseTable(legendTable[2])) {
    const mark = squeeze(row[0] ?? "");
    const full = decode(row[1] ?? "");
    if (!mark || !full) continue;
    if (NO_CLASS_MARKS.includes(mark)) continue;
    // 「作成日現在では入園できる可能性があります。（4名以上の空き）」の括弧の中を見出しに使う
    const label = squeeze(full.match(/[（(]([^）)]*空き[^）)]*)[）)]/)?.[1] ?? full);
    symbolLegend.push({ mark, label, open: !/空き無し|空きなし/.test(label) });
  }
  if (symbolLegend.length < 3) fail(`記号の凡例を読み取れませんでした（${symbolLegend.length}件）`);
  console.log(`凡例: ${symbolLegend.map((l) => `${l.mark}＝${l.label}`).join(" / ")}`);
  const knownMarks = new Set(symbolLegend.map((l) => l.mark));

  const wards: string[] = [];
  const categories: string[] = [];
  const facilities: {
    id: string;
    name: string;
    w: number;
    c: number;
    vacancy: (number | null)[];
    symbols: (string | null)[];
  }[] = [];
  const marks = new Map<string, number>();
  const seen = new Set<string>();
  let ward = "";
  let noClass = 0;
  // 申請番号は市全体の通し番号。区をまたいで続く
  let expected = 0;

  for (const block of blocks) {
    if (block[1] !== undefined) {
      // 「北区入園状況」
      const heading = squeeze(decode(block[1]));
      const m = heading.match(/^(.+?区)入園状況$/);
      ward = m ? m[1] : "";
      continue;
    }
    const tableHtml = block[2];
    // セルの中で「申請」と「番号」が改行で割れていることがある
    if (!tableHtml || !squeeze(decode(tableHtml)).includes("申請番号")) continue;
    if (!ward) fail("区の見出しが見つからないまま表が出てきました");

    const rows = parseTable(tableHtml);
    const header = rows.find((r) => squeeze(r[0] ?? "") === "申請番号");
    if (!header) fail(`${ward}: 見出しの行が見つかりません`);
    const nameCol = header.findIndex((c) => squeeze(c) === "園名");
    const kindCol = header.findIndex((c) => squeeze(c).includes("公立"));
    const zeroCol = header.findIndex((c) => toHalfWidth(squeeze(c)) === "0歳");
    if (nameCol < 0 || kindCol < 0 || zeroCol < 0) {
      fail(`${ward}: 見出しの並びが変わりました: ${header.join(" ")}`);
    }
    for (let age = 0; age < AGE_COUNT; age++) {
      if (toHalfWidth(squeeze(header[zeroCol + age] ?? "")) !== `${age}歳`) {
        fail(`${ward}: 年齢の並びが変わりました: ${header.slice(zeroCol, zeroCol + AGE_COUNT).join(" ")}`);
      }
    }

    const wardStart = expected;
    for (const row of rows) {
      if (row === header) continue;
      if (row.length < zeroCol + AGE_COUNT) continue;
      const numberRaw = toHalfWidth(squeeze(row[0] ?? ""));
      const name = decode(row[nameCol] ?? "").replace(/[\s　]+/g, "");
      if (!numberRaw || !name) continue;
      // 見出しや注記の行は申請番号が数字にならないので飛ばす。
      // 施設の行を取りこぼしたときは、このあとの連番の確かめで気づける
      if (!/^\d+$/.test(numberRaw)) continue;
      // 申請番号は区ごとに1から続く
      expected += 1;
      if (Number(numberRaw) !== expected) {
        fail(`${ward}: 申請番号が飛んでいます（${expected}番のはずが${numberRaw}番: ${name}）`);
      }

      const kind = squeeze(row[kindCol] ?? "");
      if (!kind) fail(`${ward} ${name}: 公立・私立の区分が空です`);
      if (!categories.includes(kind)) categories.push(kind);
      if (!wards.includes(ward)) wards.push(ward);

      const id = `${ward}-${numberRaw}`;
      if (seen.has(id)) fail(`施設が重複しています: ${id}`);
      seen.add(id);

      const symbols: (string | null)[] = [];
      for (let age = 0; age < AGE_COUNT; age++) {
        const raw = squeeze(row[zeroCol + age] ?? "");
        if (raw === "" || NO_CLASS_MARKS.includes(raw)) {
          noClass += 1;
          symbols.push(null);
          continue;
        }
        if (!knownMarks.has(raw)) fail(`${ward} ${name}: 凡例にない記号です: 「${row[zeroCol + age]}」`);
        marks.set(raw, (marks.get(raw) ?? 0) + 1);
        symbols.push(raw);
      }
      if (symbols.every((s) => s === null)) fail(`${ward} ${name}: 全てのクラスが空です`);

      facilities.push({
        id,
        name,
        w: wards.indexOf(ward),
        c: categories.indexOf(kind),
        vacancy: new Array(AGE_COUNT).fill(null),
        symbols,
      });
    }
    console.log(`  ${ward}: ${expected - wardStart}施設`);
  }

  if (facilities.length < 200) fail(`施設が${facilities.length}件しか取れていません`);
  if (wards.length !== 8) fail(`区が${wards.length}個しかありません: ${wards.join("・")}`);
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
    JSON.stringify(previous?.sourceFiles ?? {}) === JSON.stringify({ vacancy: INDEX_URL }) &&
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
    sourceFiles: { vacancy: INDEX_URL },
    metrics: ["symbol"],
    subtitle: `${targetYear}年${targetMonth}月入園の空き状況`,
    notes: [
      "新潟市は空きを人数ではなく記号で公表しています。当サイトでも公式の記号のまま載せています。",
      "×（空き無し）でも、次回募集以降に退園者等で空く場合があります。",
      "受入対応していないクラス（公式の表で「ー」のところ）は「—」にしています。",
    ],
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
  console.log(`  ${facilities.length}施設 / ${wards.length}区 / 受入対応のないクラス ${noClass}`);
  console.log("");
  console.log("  記号の出てきた数");
  for (const item of symbolLegend) {
    console.log(`  ${item.mark}（${item.label}） ${marks.get(item.mark) ?? 0}`);
  }
}

main().catch((err) => fail(String(err)));
