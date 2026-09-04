/**
 * 鎌ケ谷市の保育園等の空き状況を取り込む
 *
 * 実行: npm run vacancy:fetch:kamagaya
 *
 * ## この自治体の特徴
 * - PDFではなく**ページの中のHTMLの表**で公表している。表は3つあり、
 *   1つ目が空き状況（記号）、2つ目が受入状況（在園児数）、3つ目が待機児童数
 * - 記号は ○＝3人以上空き、△＝1人から2人の空きあり、×＝空きなし
 * - 区分（公立・私立・小規模など）が rowspan で入っているため、
 *   グループの先頭の行だけ列がひとつ多くなる
 * - 受入状況（在園児数）の表も並んでいるが、**空き状況の表と施設名の書き方が違う**
 *   （「ふじのこ」と「ふじのこ保育園」、「みちるKids園」と「みちるkids園」）。
 *   確実に結びつけられないので在園児数は取り込まない
 */

import fs from "node:fs";
import path from "node:path";

const MUNICIPALITY_SLUG = "kamagaya";
const MUNICIPALITY_NAME = "鎌ケ谷市";
const SOURCE_NAME = "鎌ケ谷市「保育園・認定こども園・小規模保育事業空き状況、受入状況」";
const INDEX_URL =
  "https://www.city.kamagaya.chiba.jp/kosodate-kyouiku/kosodate/hoikuen-youchientou/hoikuen_ukeirejyou.html";
const AGE_COUNT = 6;
const MIN_FACILITIES = 20;
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

/** タグと空白と実体参照を落として、中身だけを取り出す */
function textOf(html: string): string {
  return toHalfWidth(
    html
      .replace(/<[^>]+>/g, "")
      .replace(/&nbsp;/g, " ")
      .replace(/&amp;/g, "&")
      .replace(/[\s　]/g, "")
  );
}

/** 記号の形をそろえる */
function shapeOf(mark: string): string {
  if (/^[○◯〇]$/.test(mark)) return "○";
  if (/^[×✕✖]$/.test(mark)) return "×";
  return mark;
}

type Row = { kind: string; name: string; values: string[] };

/** 表を「区分・施設名・年齢ごとの値」に読み替える */
function readTable(table: string, label: string): { rows: Row[]; extra: number } {
  const raw = [...table.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi)].map((r) =>
    [...r[1].matchAll(/<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/gi)].map((c) => textOf(c[1]))
  );
  if (raw.length < 2) fail(`${label}: 表に行がありません`);

  const head = raw[0];
  const ages: number[] = [];
  for (let column = 0; column < head.length; column++) {
    const m = /^(\d)歳児?$/.exec(head[column]);
    if (m) ages.push(column);
  }
  if (ages.length !== AGE_COUNT) fail(`${label}: 年齢の見出しが${ages.length}個です`);
  // 見出しでの年齢の位置。データ行は区分が入るぶんだけ右にずれることがある
  const base = ages[0];
  const nameColumn = base - 2 >= 0 ? base - 2 : 0;

  const rows: Row[] = [];
  let kind = "";
  let extra = 0;
  for (const values of raw.slice(1)) {
    const shift = values.length - head.length;
    if (shift !== 0 && shift !== 1) {
      fail(`${label}: 列数が${values.length}の行があります（${head.length}か${head.length + 1}のはず）`);
    }
    if (shift === 1) {
      kind = values[0];
      extra += 1;
    }
    if (!kind) fail(`${label}: 区分が分かりません`);
    const name = values[nameColumn + shift];
    if (!name) continue;
    // 受入状況の表には「計」「合計」の行が混ざる
    if (name === "計" || name === "小計" || name === "合計") continue;
    rows.push({
      kind,
      name,
      values: ages.map((column) => values[column + shift] ?? ""),
    });
  }
  if (!rows.length) fail(`${label}: 施設の行を取り出せませんでした`);
  return { rows, extra };
}

async function main() {
  console.log(`${MUNICIPALITY_NAME}の空き状況を取り込みます`);
  console.log(`公式ページ: ${INDEX_URL}\n`);

  const res = await fetch(INDEX_URL, { headers: { "User-Agent": UA }, redirect: "follow" });
  if (!res.ok) fail(`公式ページが ${res.status} を返しました`);
  const html = await res.text();
  const flat = toHalfWidth(html.replace(/<[^>]+>/g, "").replace(/[\s　]/g, ""));

  const updated = /更新日[：:](\d{4})年(\d{1,2})月(\d{1,2})日/.exec(flat);
  if (!updated) fail("ページから更新日を読み取れませんでした");
  const asOf = `${updated[1]}-${updated[2].padStart(2, "0")}-${updated[3].padStart(2, "0")}`;
  if (asOf > todayJst()) fail(`更新日（${asOf}）が今日より先になっています`);
  console.log(`時点: ${asOf}（ページの更新日）`);

  // 凡例は本文に「○ 3人以上空き」のように1行ずつ並んでいる
  const symbolLegend = html
    .split(/<[^>]+>/)
    .map((part) => toHalfWidth(part.replace(/&nbsp;/g, " ").replace(/[\s　]/g, "")))
    .map((part) => /^([○◯〇△×✕])(.{2,12})$/.exec(part))
    .filter((m): m is RegExpExecArray => m !== null)
    .map((m) => ({ mark: shapeOf(m[1]), label: m[2], open: m[2] !== "空きなし" }));
  if (symbolLegend.length !== 3) fail(`凡例が${symbolLegend.length}件です（3件のはず）`);
  if (!symbolLegend.some((l) => l.open)) fail("空きありの記号が凡例にありません");
  console.log(`凡例: ${symbolLegend.map((l) => `${l.mark}＝${l.label}`).join(" / ")}`);
  const known = new Map(symbolLegend.map((l) => [shapeOf(l.mark), l.mark]));

  const tables = [...html.matchAll(/<table[\s\S]*?<\/table>/gi)].map((t) => t[0]);
  if (tables.length < 2) fail(`表が${tables.length}個しかありません（2個以上のはず）`);

  const vacancyTable = readTable(tables[0], "空き状況");

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
  let blanks = 0;

  for (let index = 0; index < vacancyTable.rows.length; index++) {
    const row = vacancyTable.rows[index];
    if (seen.has(row.name)) fail(`施設名が重複しています: ${row.name}`);
    seen.add(row.name);

    let c = categories.indexOf(row.kind);
    if (c < 0) {
      categories.push(row.kind);
      c = categories.length - 1;
    }

    const symbols: (string | null)[] = [];
    for (let age = 0; age < AGE_COUNT; age++) {
      const raw = row.values[age];
      if (raw === "" || /^[-－—―ー]$/.test(raw)) {
        blanks += 1;
        symbols.push(null);
      } else {
        const mark = known.get(shapeOf(raw));
        if (!mark) fail(`${row.name}: ${age}歳児が凡例にない記号です（「${raw}」）`);
        marks.set(mark, (marks.get(mark) ?? 0) + 1);
        symbols.push(mark);
      }
    }

    if (symbols.every((s) => s === null)) fail(`${row.name}: 全ての年齢が空らんです`);
    facilities.push({
      id: row.name,
      name: row.name,
      w: null,
      c,
      vacancy: new Array(AGE_COUNT).fill(null),
      symbols,
    });
  }

  if (facilities.length < MIN_FACILITIES) {
    fail(`施設が${facilities.length}件しか取れていません（${MIN_FACILITIES}件以上のはず）`);
  }
  const total = [...marks.values()].reduce((a, b) => a + b, 0);
  if (total + blanks !== facilities.length * AGE_COUNT) {
    fail(`欄の数が合いません（記号${total}＋空らん${blanks} / 施設${facilities.length}×${AGE_COUNT}）`);
  }
  console.log(
    `${facilities.length}施設を読み取りました（記号${total}個、空らん${blanks}個、区分${categories.length}種）`
  );

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
    JSON.stringify(previous?.sourceFiles ?? {}) === JSON.stringify({ vacancy: INDEX_URL })
  ) {
    console.log(`公式データの時点が前回と同じ（${asOf}）のため更新はありません。`);
    return;
  }

  const notes = [
    `鎌ケ谷市は空きを人数ではなく記号で公表しています。公式ページが${asOf}に更新されたものです。`,
    "公式ページには受入状況（在園児数）の表も並んでいますが、空き状況の表と施設名の書き方が違い（「ふじのこ」と「ふじのこ保育園」など）確実に結びつけられないため、当サイトでは載せていません。",
    "公式の表で空らんになっている年齢は「—」にしています。その年齢のクラスがないことを表しています。",
  ];

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
    notes,
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
}

main().catch((err) => fail(String(err)));
