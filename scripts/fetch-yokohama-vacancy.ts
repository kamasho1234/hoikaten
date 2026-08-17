/**
 * 横浜市の保育所等の空き状況を公式CSVから取り込む
 *
 * 実行: npx tsx scripts/fetch-yokohama-vacancy.ts
 *
 * 出典: 横浜市「保育所等の入所状況」
 *   https://www.city.yokohama.lg.jp/kosodate-kyoiku/hoiku-yoji/shisetsu/riyou/info/nyusho-jokyo.html
 *   受入可能数・入所待ち人数・入所児童数の3種のCSVが毎月1日時点で公開される。
 *
 * 設計上の注意:
 * - CSVのファイル名に規則性がない（"1013_20260731.csv" と "202608-jidou.csv" が混在）ため、
 *   ファイル名ではなく **1行目の見出し**（例:「【令和８年８月１日時点】受入可能数」）で種別を判別する。
 * - CSVはShift-JIS。
 * - 年齢別の値の "-" は「そのクラスの受入自体がない」を意味するので null で保持し、0（空きなし）と区別する。
 * - 公式のページ構造が変わったときに壊れたデータを本番へ流さないよう、
 *   少しでも想定と違えば **書き込まずに exit 1** する（古いJSONをそのまま残す）。
 */

import fs from "node:fs";
import path from "node:path";

const INDEX_URL =
  "https://www.city.yokohama.lg.jp/kosodate-kyoiku/hoiku-yoji/shisetsu/riyou/info/nyusho-jokyo.html";
const SOURCE_NAME = "横浜市「保育所等の入所状況」";
const MUNICIPALITY_SLUG = "yokohama";
const MUNICIPALITY_NAME = "横浜市";
const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", "yokohama.json");

/** 0歳児〜5歳児の6区分 */
const AGE_COUNT = 6;
/** CSVの列数（末尾がカンマで終わるため空要素を含めて13） */
const COLUMN_COUNT = 13;
/** 年齢別の値が始まる列インデックス */
const AGE_COLUMN_OFFSET = 4;
/** 合計欄の列インデックス */
const TOTAL_COLUMN = 10;

type Kind = "vacancy" | "waiting" | "enrolled";

const KIND_LABEL: Record<Kind, string> = {
  vacancy: "受入可能数",
  waiting: "入所待ち人数",
  enrolled: "入所児童数",
};

const KINDS: Kind[] = ["vacancy", "waiting", "enrolled"];

interface Row {
  ward: string;
  name: string;
  id: string;
  values: (number | null)[];
}

interface ParsedCsv {
  asOf: string;
  url: string;
  rows: Row[];
}

function fail(message: string): never {
  console.error(`\n[中断] ${message}`);
  console.error("既存のJSONは変更していません。");
  process.exit(1);
}

/** 全角数字を半角へ */
function toHankakuDigits(s: string): string {
  return s.replace(/[０-９]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xfee0));
}

/** 「【令和８年８月１日時点】受入可能数」→ "2026-08-01" */
function parseAsOf(headerLine: string): string {
  const normalized = toHankakuDigits(headerLine).replace("令和元年", "令和1年");
  const m = normalized.match(/令和(\d+)年(\d+)月(\d+)日/);
  if (!m) {
    fail(`1行目から「令和○年○月○日」を読み取れませんでした: ${headerLine}`);
  }
  const year = 2018 + Number(m[1]);
  const month = String(Number(m[2])).padStart(2, "0");
  const day = String(Number(m[3])).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/** 実行日（JST） */
function todayJst(): string {
  const now = new Date();
  const jst = new Date(now.getTime() + 9 * 60 * 60 * 1000);
  return jst.toISOString().slice(0, 10);
}

function detectKind(headerLine: string): Kind | null {
  if (headerLine.includes("入所待ち人数")) return "waiting";
  if (headerLine.includes("受入可能数")) return "vacancy";
  if (headerLine.includes("入所児童数")) return "enrolled";
  return null;
}

async function fetchText(url: string): Promise<string> {
  const res = await fetch(url);
  if (!res.ok) fail(`取得に失敗しました (HTTP ${res.status}): ${url}`);
  return await res.text();
}

/** Shift-JISのCSVを取得して行配列にする */
async function fetchCsvLines(url: string): Promise<string[]> {
  const res = await fetch(url);
  if (!res.ok) fail(`CSVの取得に失敗しました (HTTP ${res.status}): ${url}`);
  const buffer = await res.arrayBuffer();
  const text = new TextDecoder("shift_jis").decode(buffer);
  return text.split(/\r?\n/).filter((line) => line.trim() !== "");
}

function extractCsvUrls(html: string): string[] {
  const matches = [...html.matchAll(/href="([^"]*nyusho-jokyo\.files\/[^"]*\.csv)"/gi)];
  const urls = matches.map((m) => new URL(m[1], INDEX_URL).toString());
  return [...new Set(urls)];
}

function parseCsv(lines: string[], kind: Kind, url: string): ParsedCsv {
  if (lines.length < 3) {
    fail(`${KIND_LABEL[kind]}: 行数が少なすぎます (${lines.length}行): ${url}`);
  }

  const asOf = parseAsOf(lines[0]);

  // 2行目は列見出し
  const header = lines[1].split(",");
  if (header[0].trim() !== "施設所在区" || header[3].trim() !== "施設番号") {
    fail(
      `${KIND_LABEL[kind]}: 2行目の列見出しが想定と異なります: ${lines[1]}`
    );
  }

  const rows: Row[] = [];
  for (let i = 2; i < lines.length; i++) {
    const lineNo = i + 1;
    const cols = lines[i].split(",");
    if (cols.length !== COLUMN_COUNT) {
      fail(
        `${KIND_LABEL[kind]}: ${lineNo}行目の列数が${COLUMN_COUNT}ではありません (${cols.length}列): ${lines[i]}`
      );
    }

    const values: (number | null)[] = [];
    for (let age = 0; age < AGE_COUNT; age++) {
      const raw = cols[AGE_COLUMN_OFFSET + age].trim();
      // "-"（半角）と "－"（全角）はクラスなし
      if (raw === "-" || raw === "－") {
        values.push(null);
        continue;
      }
      const n = Number(raw);
      if (!Number.isInteger(n) || n < 0) {
        fail(
          `${KIND_LABEL[kind]}: ${lineNo}行目の${age}歳児の値が想定外です: "${raw}"`
        );
      }
      values.push(n);
    }

    // 公式の合計欄と年齢別の和を突き合わせる（パースのズレを検出する）
    const totalRaw = cols[TOTAL_COLUMN].trim();
    const total = Number(totalRaw);
    const sum = values.reduce<number>((acc, v) => acc + (v ?? 0), 0);
    if (!Number.isInteger(total) || total !== sum) {
      fail(
        `${KIND_LABEL[kind]}: ${lineNo}行目の合計欄(${totalRaw})と年齢別の和(${sum})が一致しません: ${lines[i]}`
      );
    }

    const id = cols[3].trim();
    const name = cols[2].trim();
    const ward = cols[0].trim();
    if (!id || !name || !ward) {
      fail(`${KIND_LABEL[kind]}: ${lineNo}行目に空の施設所在区/施設名/施設番号があります: ${lines[i]}`);
    }

    rows.push({ ward, name, id, values });
  }

  return { asOf, url, rows };
}

async function main() {
  console.log("横浜市の保育所空き状況を取り込みます");
  console.log(`公式ページ: ${INDEX_URL}`);

  // --- 1. 公式ページからCSVのリンクを抽出 ---
  const html = await fetchText(INDEX_URL);
  const csvUrls = extractCsvUrls(html);
  console.log(`\nCSVリンク: ${csvUrls.length}本`);
  csvUrls.forEach((u) => console.log(`  ${u}`));

  if (csvUrls.length < KINDS.length) {
    fail(
      `CSVリンクが${KINDS.length}本見つかりませんでした（${csvUrls.length}本）。公式ページの構造が変わった可能性があります。`
    );
  }

  // --- 2. ダウンロードして1行目の見出しで種別を判別 ---
  const parsed: Partial<Record<Kind, ParsedCsv>> = {};
  for (const url of csvUrls) {
    const lines = await fetchCsvLines(url);
    const kind = detectKind(lines[0]);
    if (!kind) {
      console.log(`  種別を判別できないCSVのためスキップ: ${lines[0]} (${url})`);
      continue;
    }
    if (parsed[kind]) {
      fail(`「${KIND_LABEL[kind]}」のCSVが複数見つかりました: ${url}`);
    }
    parsed[kind] = parseCsv(lines, kind, url);
    console.log(
      `  ${KIND_LABEL[kind]}: ${parsed[kind]!.rows.length}施設 (${parsed[kind]!.asOf}時点)`
    );
  }

  for (const kind of KINDS) {
    if (!parsed[kind]) {
      fail(`「${KIND_LABEL[kind]}」のCSVが見つかりませんでした。`);
    }
  }

  const vacancy = parsed.vacancy!;
  const waiting = parsed.waiting!;
  const enrolled = parsed.enrolled!;

  // --- 3. 3ファイルの整合性を検証 ---
  const asOfSet = new Set([vacancy.asOf, waiting.asOf, enrolled.asOf]);
  if (asOfSet.size !== 1) {
    fail(
      `3つのCSVの時点が食い違っています: 受入可能数=${vacancy.asOf} / 入所待ち人数=${waiting.asOf} / 入所児童数=${enrolled.asOf}`
    );
  }
  const asOf = vacancy.asOf;

  const waitingById = new Map(waiting.rows.map((r) => [r.id, r]));
  const enrolledById = new Map(enrolled.rows.map((r) => [r.id, r]));

  if (
    waitingById.size !== waiting.rows.length ||
    enrolledById.size !== enrolled.rows.length ||
    new Set(vacancy.rows.map((r) => r.id)).size !== vacancy.rows.length
  ) {
    fail("施設番号に重複があります。");
  }

  if (
    waitingById.size !== vacancy.rows.length ||
    enrolledById.size !== vacancy.rows.length
  ) {
    fail(
      `3つのCSVの施設数が一致しません: 受入可能数=${vacancy.rows.length} / 入所待ち人数=${waitingById.size} / 入所児童数=${enrolledById.size}`
    );
  }

  // --- 4. 施設番号で結合 ---
  const wards: string[] = [];
  const facilities = vacancy.rows.map((row) => {
    const w = waitingById.get(row.id);
    const e = enrolledById.get(row.id);
    if (!w || !e) {
      fail(`施設番号 ${row.id}（${row.name}）が3つのCSVすべてには存在しません。`);
    }
    if (w.name !== row.name || e.name !== row.name) {
      fail(
        `施設番号 ${row.id} の施設名が3つのCSVで一致しません: "${row.name}" / "${w.name}" / "${e.name}"`
      );
    }
    let wardIndex = wards.indexOf(row.ward);
    if (wardIndex === -1) {
      wards.push(row.ward);
      wardIndex = wards.length - 1;
    }
    return {
      id: row.id,
      name: row.name,
      w: wardIndex,
      vacancy: row.values,
      waiting: w.values,
      enrolled: e.values,
    };
  });

  // --- 5. 既存JSONと比較 ---
  let previous: { asOf?: string; facilities?: unknown[] } | null = null;
  if (fs.existsSync(OUT_PATH)) {
    try {
      previous = JSON.parse(fs.readFileSync(OUT_PATH, "utf-8"));
    } catch {
      previous = null;
    }
  }

  if (previous?.facilities && Array.isArray(previous.facilities)) {
    const before = previous.facilities.length;
    if (facilities.length < before * 0.9) {
      fail(
        `施設数が大きく減っています（前回 ${before}件 → 今回 ${facilities.length}件）。取得内容を確認してください。`
      );
    }
  }

  if (previous?.asOf === asOf) {
    console.log(`\n公式データの時点が前回と同じ（${asOf}）のため更新はありません。`);
    return;
  }

  // --- 6. 書き出し ---
  const dataset = {
    municipalitySlug: MUNICIPALITY_SLUG,
    municipalityName: MUNICIPALITY_NAME,
    asOf,
    fetchedAt: todayJst(),
    sourceName: SOURCE_NAME,
    sourceUrl: INDEX_URL,
    sourceFiles: {
      vacancy: vacancy.url,
      waiting: waiting.url,
      enrolled: enrolled.url,
    },
    // 横浜市は3つとも公開している数少ない自治体。UIはこれを見て表示を出し分ける
    metrics: ["vacancy", "waiting", "enrolled"],
    notes: [
      "横浜市の注記のとおり、掲載されている人数はシステムで機械的に抽出されているため、実際の人数と異なる場合があります。",
    ],
    waitingCaveat:
      "入所待ち人数は横浜市の定義で「園ごとの申請数」です。1人が複数園を希望すると希望した各園に計上されるため、実際に入園を待っている人数や競争倍率とは一致しません。申込がどれだけ集中しているかの目安としてご覧ください。",
    wards,
    categories: [],
    facilities,
  };

  // 施設1件を1行にして出力する（1,200件超あるため、既定の整形ではファイルが肥大する）
  const { facilities: _facilities, ...meta } = dataset;
  const metaJson = JSON.stringify(meta, null, 2);
  const head = metaJson.slice(0, metaJson.lastIndexOf("}")).trimEnd();
  const body = facilities.map((f) => `    ${JSON.stringify(f)}`).join(",\n");
  const json = `${head},\n  "facilities": [\n${body}\n  ]\n}\n`;

  // 組み立てたJSONが壊れていないことを確認してから書く
  try {
    JSON.parse(json);
  } catch (err) {
    fail(`生成したJSONが不正です: ${String(err)}`);
  }

  fs.mkdirSync(path.dirname(OUT_PATH), { recursive: true });
  fs.writeFileSync(OUT_PATH, json, "utf-8");

  // --- 7. 出力内容のサマリー ---
  const ageTotals = (key: "vacancy" | "waiting" | "enrolled") =>
    Array.from({ length: AGE_COUNT }, (_, age) =>
      facilities.reduce((acc, f) => acc + (f[key][age] ?? 0), 0)
    );
  const vacancyTotals = ageTotals("vacancy");
  const waitingTotals = ageTotals("waiting");
  const enrolledTotals = ageTotals("enrolled");

  console.log(`\n書き出しました: ${path.relative(process.cwd(), OUT_PATH)}`);
  console.log(`  データ時点: ${asOf}`);
  console.log(`  施設数: ${facilities.length}`);
  console.log(`  区数: ${wards.length}（${wards.join("・")}）`);
  console.log("\n  年齢 | 空き枠 | 入所待ち | 在籍");
  for (let age = 0; age < AGE_COUNT; age++) {
    console.log(
      `  ${age}歳児 | ${vacancyTotals[age]} | ${waitingTotals[age]} | ${enrolledTotals[age]}`
    );
  }
  console.log(
    `  合計 | ${vacancyTotals.reduce((a, b) => a + b, 0)} | ${waitingTotals.reduce((a, b) => a + b, 0)} | ${enrolledTotals.reduce((a, b) => a + b, 0)}`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
