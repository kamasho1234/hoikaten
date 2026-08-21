/**
 * 中央区（東京都）の認可保育所等の空き状況を取り込む
 *
 * 実行: npm run vacancy:fetch:chuo
 *
 * ## この自治体の特徴
 * - 公式ページのHTMLの表に人数がそのまま載っている（PDFも同じ内容で出ている）
 * - **0歳児の欄が「57日」と「7か月」の2つに分かれている**。
 *   受入開始の月齢ごとの枠なので、当サイトでは足して0歳児の空きとする。
 *   枠を分けていない施設は2つの欄がひとつに結合されている（colspan）
 * - 「－」は受け入れをしていないという意味
 * - ページの最後に区全体の合計表があるので、それと突き合わせて検算する
 */

import fs from "node:fs";
import path from "node:path";

const MUNICIPALITY_SLUG = "chuo";
const MUNICIPALITY_NAME = "中央区";
const SOURCE_NAME = "中央区「保育園空き情報」";
const INDEX_URL =
  "https://www.city.chuo.lg.jp/a0021/kosodate/kosodate/hoikuen/hoiku/ninkahoiku/akijoho.html";
const AGE_COUNT = 6;
const UA = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";

/** 表の見出し。0歳児だけ受入月齢で2つに分かれている */
const HEAD_FACILITY = ["保育施設", "57日", "7か月", "1歳児", "2歳児", "3歳児", "4歳児", "5歳児", "延長"];
const HEAD_SUMMARY = ["区分", "57日", "7か月", "1歳児", "2歳児", "3歳児", "4歳児", "5歳児"];
const SUMMARY_ROW = "利用調整後の空き数";
const NOT_ACCEPTED = "－";

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
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&times;/g, "×")
    .replace(/[\s　]+/g, " ")
    .trim();
}

/** ひとつの行を、colspan を広げたセルの並びにする。span は結合されていた幅 */
function parseRow(html: string): { text: string; span: number; first: boolean }[] {
  const cells: { text: string; span: number; first: boolean }[] = [];
  for (const m of html.matchAll(/<t[hd]([^>]*)>([\s\S]*?)<\/t[hd]>/gi)) {
    const span = Number(m[1].match(/colspan\s*=\s*"?(\d+)/i)?.[1] ?? 1);
    const text = squeeze(stripTags(m[2]));
    for (let i = 0; i < span; i++) cells.push({ text, span, first: i === 0 });
  }
  return cells;
}

type Table = { heading: string; rows: { text: string; span: number; first: boolean }[][] };

/** 見出し（h2〜h5）と表を、出てくる順に対応づける */
function parseTables(html: string): Table[] {
  const marks: { pos: number; kind: "h" | "t"; body: string }[] = [];
  for (const m of html.matchAll(/<h[2-5][^>]*>([\s\S]*?)<\/h[2-5]>/gi)) {
    marks.push({ pos: m.index ?? 0, kind: "h", body: stripTags(m[1]) });
  }
  for (const m of html.matchAll(/<table[\s\S]*?<\/table>/gi)) {
    marks.push({ pos: m.index ?? 0, kind: "t", body: m[0] });
  }
  marks.sort((a, b) => a.pos - b.pos);

  const tables: Table[] = [];
  let heading = "";
  for (const mark of marks) {
    if (mark.kind === "h") {
      heading = squeeze(mark.body);
      continue;
    }
    const rows = [...mark.body.matchAll(/<tr[\s\S]*?<\/tr>/gi)].map((m) => parseRow(m[0]));
    tables.push({ heading, rows });
  }
  return tables;
}

/** 「1-2.私立保育所」から番号を落とす */
function categoryOf(heading: string): string {
  return heading.replace(/^[0-9０-９]+(?:[-－][0-9０-９]+)?[.．]?/, "");
}

async function main() {
  console.log(`${MUNICIPALITY_NAME}の空き情報を取り込みます`);
  console.log(`公式ページ: ${INDEX_URL}\n`);

  const res = await fetch(INDEX_URL, { headers: { "User-Agent": UA } });
  if (!res.ok) fail(`公式ページが ${res.status} を返しました`);
  const html = await res.text();

  const posted = toHalfWidth(html).match(/掲載日：(\d{4})年(\d{1,2})月(\d{1,2})日/);
  if (!posted) fail("掲載日を読み取れませんでした");
  const asOf = `${posted[1]}-${posted[2].padStart(2, "0")}-${posted[3].padStart(2, "0")}`;
  if (asOf > todayJst()) fail(`掲載日（${asOf}）が今日より先になっています`);

  const target = squeeze(toHalfWidth(html)).match(/令和(\d+)年(\d+)月入園利用調整の結果/);
  if (!target) fail("どの月の利用調整かを読み取れませんでした");
  const targetMonth = Number(target[2]);
  console.log(`掲載日: ${asOf} / 対象: ${targetMonth}月入園の利用調整後`);

  // 「9月入園利用調整後の空き状況（PDF：182KB）」
  const pdf = [...html.matchAll(/<a[^>]+href="([^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => ({ url: new URL(m[1], INDEX_URL).toString(), text: squeeze(stripTags(m[2])) }))
    .find((l) => l.text.includes(`${targetMonth}月入園利用調整後の空き状況`));

  const tables = parseTables(html);
  if (tables.length < 3) fail(`表が${tables.length}件しか見つかりません`);

  const categories: string[] = [];
  const facilities: { id: string; name: string; w: null; c: number; vacancy: (number | null)[] }[] = [];
  const seen = new Set<string>();
  const byAge = new Array(AGE_COUNT).fill(0);
  let summary: number[] | null = null;
  let noClass = 0;
  let splitZero = 0;

  for (const table of tables) {
    if (table.rows.length < 2) continue;
    const head = table.rows[0].map((c) => c.text);

    if (head.length === HEAD_SUMMARY.length && head.every((h, i) => h === HEAD_SUMMARY[i])) {
      // 区全体の合計表。0歳児は「57日」と「7か月」を足す
      const row = table.rows.find((r) => r[0].text === SUMMARY_ROW);
      if (!row) fail(`合計表に「${SUMMARY_ROW}」の行がありません`);
      const nums = row.slice(1).map((c) => Number(toHalfWidth(c.text)));
      if (nums.some((n) => !Number.isInteger(n))) fail(`合計表の数を読めません: ${row.map((c) => c.text)}`);
      summary = [nums[0] + nums[1], ...nums.slice(2)];
      continue;
    }

    if (head.length !== HEAD_FACILITY.length || !head.every((h, i) => h === HEAD_FACILITY[i])) {
      continue; // 空き状況の表ではない
    }

    const category = categoryOf(table.heading);
    if (!category) fail(`見出しから施設の種類を取り出せません: 「${table.heading}」`);
    if (!categories.includes(category)) categories.push(category);

    for (const raw of table.rows.slice(1)) {
      // 公式の表には、いちばん右の「延長」の欄が抜けている行がある。
      // 延長は使わないので、記号でないことを確かめたうえで空の欄を足す
      const row = [...raw];
      if (row.length === HEAD_FACILITY.length - 1 && !/^[○◯〇△×]$/.test(row[row.length - 1].text)) {
        row.push({ text: "", span: 1, first: true });
      }
      if (row.length !== HEAD_FACILITY.length) {
        fail(`${category}: 欄が${raw.length}個の行があります: ${raw.map((c) => c.text).join(",")}`);
      }
      const name = row[0].text;
      if (!name) fail(`${category}: 施設名が空の行があります`);
      if (seen.has(name)) fail(`施設名が重複しています: ${name}`);
      seen.add(name);

      const vacancy: (number | null)[] = [];
      // 0歳児は「57日」と「7か月」の2欄。結合されているときは1つの値として扱う
      const zero = row.slice(1, 3);
      const parts = zero[0].span > 1 ? [zero[0]] : zero;
      if (zero[0].span === 1) splitZero += 1;
      if (parts.every((c) => c.text === NOT_ACCEPTED)) {
        noClass += 1;
        vacancy.push(null);
      } else {
        let sum = 0;
        for (const part of parts) {
          if (part.text === NOT_ACCEPTED) continue;
          const n = Number(toHalfWidth(part.text));
          if (!Number.isInteger(n) || n < 0) fail(`${name}: 0歳児の欄を読めません: 「${part.text}」`);
          sum += n;
        }
        vacancy.push(sum);
      }

      for (let age = 1; age < AGE_COUNT; age++) {
        const raw = row[age + 2].text;
        if (raw === NOT_ACCEPTED) {
          noClass += 1;
          vacancy.push(null);
          continue;
        }
        const n = Number(toHalfWidth(raw));
        if (!Number.isInteger(n) || n < 0) fail(`${name}: ${age}歳児の欄を読めません: 「${raw}」`);
        vacancy.push(n);
      }
      if (vacancy.every((v) => v === null)) fail(`${name}: 全てのクラスが「${NOT_ACCEPTED}」です`);
      vacancy.forEach((v, age) => (byAge[age] += v ?? 0));

      facilities.push({
        id: name,
        name,
        w: null,
        c: categories.indexOf(category),
        vacancy,
      });
    }
  }

  if (facilities.length < 80) fail(`施設が${facilities.length}件しか取れていません`);
  if (!summary) fail("区全体の合計表が見つかりませんでした");
  for (let age = 0; age < AGE_COUNT; age++) {
    if (byAge[age] !== summary[age]) {
      fail(`${age}歳児の合計が公式の合計表と合いません（公式 ${summary[age]} / 取り込み ${byAge[age]}）`);
    }
  }
  const total = byAge.reduce((a, b) => a + b, 0);
  console.log(`歳児ごとの合計は公式の合計表と一致しました（全体で${total}）`);

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

  const dataset = {
    municipalitySlug: MUNICIPALITY_SLUG,
    municipalityName: MUNICIPALITY_NAME,
    asOf,
    fetchedAt: todayJst(),
    sourceName: SOURCE_NAME,
    sourceUrl: INDEX_URL,
    sourceFiles: { vacancy: pdf?.url ?? INDEX_URL },
    metrics: ["vacancy"],
    subtitle: `${targetMonth}月入園の利用調整が終わった時点の空き数`,
    notes: [
      `${targetMonth}月入園の利用調整が終わった時点の空き数です。退園や内定辞退があると数が変わります。`,
      "0歳児は公式の表で受入開始の月齢ごとに「57日」「7か月」の2つに分かれています。当サイトでは足して0歳児の空きとしています。",
      "公式の表で「－」となっているところは、その施設がそのクラスの受け入れをしていないという意味なので「—」にしています。",
      "月極延長保育の空き状況は載せていません。公式ページをご覧ください。",
      "年齢はその年度の4月1日時点のものです。",
    ],
    wards: [],
    categories,
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
  console.log(`  ${facilities.length}施設 / ${categories.length}種類`);
  console.log(`  0歳児の枠を分けている施設: ${splitZero}`);
  console.log(`  受け入れをしていないクラス: ${noClass}`);
  console.log(`  空きの合計: ${total}`);
}

main().catch((err) => fail(String(err)));
