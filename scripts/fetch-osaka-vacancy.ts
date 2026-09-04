/**
 * 大阪市の保育施設等の空き情報を取り込む
 *
 * 実行: npm run vacancy:fetch:osaka
 *
 * ## データの出どころ
 * 大阪市の空き情報は区ごとのページに分かれていて、市全体をまとめたファイルは案内されていない。
 * ただし市が公開している**「保育施設等 空き情報マップ」が読んでいるCSV**が市内全域ぶんで、
 * 緯度経度・区・施設種別・0〜5歳の空き数がそろっている。これを使う。
 *
 * ## この自治体の特徴
 * - 数値の意味は「翌月利用ぶんの利用可能人数」。川崎市と同じ性質
 * - **クラスがないことを表す記号が区ごとにばらばら**（空欄・「-」・「―」・「×」）。
 *   いずれも受け入れがないという意味なので、まとめて「—」として扱う
 * - 施設種別は保育所・認定こども園・地域型の3つ
 * - 分園が別の行で載る（本園と担当する年齢が分かれている）
 *
 * ## 安全装置
 * 24区そろっているか、施設数が急に減っていないか、施設名が重複していないかを見る。
 * 1つでも想定と違えば書き込まずに中断する。
 */

import fs from "node:fs";
import path from "node:path";

const MUNICIPALITY_SLUG = "osaka";
const MUNICIPALITY_NAME = "大阪市";
const SOURCE_NAME = "大阪市「大阪市内保育施設等の空き情報」";
const SOURCE_PAGE = "https://www.city.osaka.lg.jp/kodomo/page/0000293428.html";
const MAP_PAGE = "https://www.city.osaka.lg.jp/contents/wdu110/sukusuku/map.html";
const CSV_URL = "https://www.city.osaka.lg.jp/contents/wdu110/sukusuku/sukusukudata.csv";
const AGE_COUNT = 6;
const WARD_COUNT = 24;

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);

/** CSVの列の並び。変わったら中断する */
const EXPECTED_HEADER = [
  "緯度",
  "経度",
  "施設名",
  "ふりがな",
  "住所",
  "",
  "区",
  "電話番号　",
  "施設情報",
  "施設種別",
  "0歳児",
  "1歳児",
  "2歳児",
  "3歳児",
  "4歳児",
  "5歳児",
  "月",
  "指定園",
  "新制度未移行園",
  "ソート",
  "月",
];

function fail(message: string): never {
  console.error(`\n[中断] ${message}`);
  process.exit(1);
}

function todayJst(): string {
  const jst = new Date(Date.now() + 9 * 60 * 60 * 1000);
  return jst.toISOString().slice(0, 10);
}

function stripTags(html: string): string {
  return html.replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();
}

/** 引用符に対応した最低限のCSVパーサ */
function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let quoted = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (quoted) {
      if (ch === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          quoted = false;
        }
      } else {
        field += ch;
      }
      continue;
    }
    if (ch === '"') {
      quoted = true;
    } else if (ch === ",") {
      row.push(field);
      field = "";
    } else if (ch === "\r") {
      // 何もしない
    } else if (ch === "\n") {
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else {
      field += ch;
    }
  }
  if (field !== "" || row.length > 0) {
    row.push(field);
    rows.push(row);
  }
  return rows;
}

/**
 * 空き数を読む。
 * **クラスがないことを表す記号は区によって違う**（空欄・「-」・「―」・「×」）。
 * 「※2」のように注記番号が入ることもある。いずれも人数ではないので null にする。
 */
function parseValue(v: string): { value: number | null; note: string | null } {
  const t = (v ?? "").replace(/[\s　]/g, "");
  if (t === "") return { value: null, note: null };
  if (/^\d+$/.test(t)) return { value: Number(t), note: null };
  if (["-", "－", "―", "×", "✕", "✖"].includes(t)) return { value: null, note: null };
  return { value: null, note: t };
}

async function main() {
  console.log(`${MUNICIPALITY_NAME}の空き情報を取り込みます`);
  console.log(`公式ページ: ${SOURCE_PAGE}\n`);

  const ua = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";
  const pageRes = await fetch(SOURCE_PAGE, { headers: { "User-Agent": ua } });
  if (!pageRes.ok) fail(`公式ページが ${pageRes.status} を返しました`);
  const pageText = stripTags(await pageRes.text());

  // 「令和8年8月現在（令和8年9月利用）の…」「地図情報は、8月1日現在の空き情報」
  const tm = pageText.match(/令和(\d+)年(\d+)月現在（令和(\d+)年(\d+)月利用）/);
  if (!tm) fail("「令和X年Y月現在（令和A年B月利用）」が読み取れません");
  const asOfYear = 2018 + Number(tm[1]);
  const asOfMonth = Number(tm[2]);
  const targetYear = 2018 + Number(tm[3]);
  const targetMonth = Number(tm[4]);
  const dm = pageText.match(/地図情報は、(\d+)月(\d+)日現在の空き情報/);
  if (!dm) fail("「地図情報は、X月Y日現在の空き情報」が読み取れません");
  if (Number(dm[1]) !== asOfMonth) {
    fail(`地図情報の月（${dm[1]}月）が「令和${tm[1]}年${asOfMonth}月現在」と違います`);
  }
  const asOf = `${asOfYear}-${String(asOfMonth).padStart(2, "0")}-${dm[2].padStart(2, "0")}`;
  console.log(`基準日: ${asOf} / 対象: ${targetYear}年${targetMonth}月利用`);

  // 地図ページが実際にこのCSVを読んでいることを確かめる
  const mapRes = await fetch(MAP_PAGE, { headers: { "User-Agent": ua } });
  if (!mapRes.ok) fail(`地図ページが ${mapRes.status} を返しました`);
  const mapHtml = await mapRes.text();
  const csvName = path.basename(new URL(CSV_URL).pathname);
  if (!mapHtml.includes(csvName)) {
    fail(`地図ページが ${csvName} を読み込んでいません。データの置き場所が変わった可能性があります。`);
  }

  const csvRes = await fetch(CSV_URL, { headers: { "User-Agent": ua } });
  if (!csvRes.ok) fail(`CSVの取得に失敗しました（${csvRes.status}）: ${CSV_URL}`);
  const csvText = new TextDecoder("utf-8").decode(await csvRes.arrayBuffer()).replace(/^﻿/, "");
  const rows = parseCsv(csvText).filter((r) => r.some((c) => c.trim() !== ""));
  if (rows.length < 100) fail(`CSVの行が${rows.length}行しかありません`);

  const header = rows[0];
  if (header.length !== EXPECTED_HEADER.length || header.some((h, i) => h !== EXPECTED_HEADER[i])) {
    fail(`CSVの列が想定と違います:\n  期待: ${EXPECTED_HEADER.join(",")}\n  実際: ${header.join(",")}`);
  }

  const wards: string[] = [];
  const categories: string[] = [];
  const facilities: {
    id: string;
    name: string;
    w: number;
    c: number;
    vacancy: (number | null)[];
    lat?: number;
    lng?: number;
  }[] = [];
  const seenName = new Set<string>();
  const noteFacilities: string[] = [];

  for (const row of rows.slice(1)) {
    const name = row[2].replace(/[　\s]+/g, " ").trim();
    if (!name) continue;
    const ward = row[6].trim();
    const category = row[9].trim();
    if (!ward) fail(`${name}: 区が空です`);
    if (!category) fail(`${name}: 施設種別が空です`);
    if (!wards.includes(ward)) wards.push(ward);
    if (!categories.includes(category)) categories.push(category);

    // **ソート番号は一意ではない**（表示順のための番号で、別の区の施設と重なることがある）。
    // 施設名は市内で重複しないので、区と合わせてIDにする
    const id = `${ward}-${name}`;
    if (seenName.has(id)) fail(`施設名が重複しています: ${id}`);
    seenName.add(id);

    const vacancy: (number | null)[] = [];
    for (let age = 0; age < AGE_COUNT; age++) {
      const { value, note } = parseValue(row[10 + age]);
      if (note) noteFacilities.push(`${name}（${age}歳児「${note}」）`);
      vacancy.push(value);
    }

    const lat = Number(row[0]);
    const lng = Number(row[1]);
    facilities.push({
      id,
      name,
      w: wards.indexOf(ward),
      c: categories.indexOf(category),
      vacancy,
      ...(Number.isFinite(lat) && Number.isFinite(lng) ? { lat, lng } : {}),
    });
  }

  if (wards.length !== WARD_COUNT) {
    fail(`区が${wards.length}個しかありません（大阪市は${WARD_COUNT}区）: ${wards.join("、")}`);
  }
  if (facilities.length < 500) fail(`施設が${facilities.length}件しか取れていません`);

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
    JSON.stringify(previous?.sourceFiles ?? {}) === JSON.stringify({ vacancy: CSV_URL }) &&
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
    sourceUrl: SOURCE_PAGE,
    sourceFiles: { vacancy: CSV_URL },
    metrics: ["vacancy"],
    subtitle: `${targetYear}年${targetMonth}月利用の利用可能人数`,
    notes: [
      `大阪市の注記のとおり、これは各区が掲載した時点での${targetYear}年${targetMonth}月の利用可能人数です。区のページでは時点修正されていることがあり、必ずしも一致しません。`,
      "クラスの受け入れがないことを表す記号は区によって書き方が違います（空欄・「-」・「―」・「×」）。当サイトではまとめて「—」で示しています。",
      ...(noteFacilities.length > 0
        ? [
            `次の施設は人数のかわりに注記番号が入っています。区のページをご確認ください: ${noteFacilities.join("、")}`,
          ]
        : []),
    ],
    wards,
    categories,
    facilities,
  };

  const { facilities: _f, ...meta } = dataset;
  const metaJson = JSON.stringify(meta, null, 2);
  const head = metaJson.slice(0, metaJson.lastIndexOf("}")).trimEnd();
  const bodyJson = facilities.map((f) => `    ${JSON.stringify(f)}`).join(",\n");
  const out = `${head},\n  "facilities": [\n${bodyJson}\n  ]\n}\n`;
  try {
    JSON.parse(out);
  } catch (err) {
    fail(`生成したJSONが不正です: ${String(err)}`);
  }
  fs.mkdirSync(path.dirname(OUT_PATH), { recursive: true });
  fs.writeFileSync(OUT_PATH, out, "utf-8");

  const ageTotals = Array.from({ length: AGE_COUNT }, (_, age) =>
    facilities.reduce((acc, f) => acc + (f.vacancy[age] ?? 0), 0)
  );
  console.log(`書き出しました: ${path.relative(process.cwd(), OUT_PATH)}`);
  console.log(`  データ時点: ${asOf}`);
  console.log(`  施設数: ${facilities.length} / 区: ${wards.length} / 種別: ${categories.join("・")}`);
  console.log(`  緯度経度あり: ${facilities.filter((f) => f.lat !== undefined).length}件`);
  console.log("");
  console.log("  年齢 | 空き");
  ageTotals.forEach((v, age) => console.log(`  ${age}歳児 | ${v}`));
  console.log(`  合計 | ${ageTotals.reduce((a, b) => a + b, 0)}`);
}

main().catch((err) => fail(String(err)));
