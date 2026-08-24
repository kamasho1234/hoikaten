/**
 * 佐賀市の保育施設空き状況を取り込む
 *
 * 実行: npm run vacancy:fetch:saga
 *
 * ## データの出どころ
 * 佐賀市はBODIK（自治体共同のオープンデータ基盤）に毎月1日ぶんのCSVを登録している。
 * 市の公式ページ（旧 /main/3808.html）はサイト改編で404になっており、
 * いまは所在が分からないため、BODIKのデータセットを出典として載せる。
 *
 * ## 記号の意味が公表されていない
 * CSVにもXLSXにもデータセットの説明にも、**○△×の意味（何人分の空きか）が書かれていない**。
 * ユーザー判断で「意味なしで記号だけ載せる」方針にしたので、
 * 凡例の説明は「佐賀市は記号の意味を公表していません」とし、注記でもそのことを書く。
 * ○と△の違いを当サイトの推測で埋めることはしない。
 *
 * ## 安全装置
 * 想定と1つでも違えば書き込まずに exit 1 する。
 */

import fs from "node:fs";
import path from "node:path";

const MUNICIPALITY_SLUG = "saga";
const MUNICIPALITY_NAME = "佐賀市";
const SOURCE_NAME = "佐賀市「佐賀市保育施設空き状況」（オープンデータ）";
const DATASET_ID = "412015_hoikusisetsuakijyoukyou";
const SOURCE_PAGE = `https://data.bodik.jp/dataset/${DATASET_ID}`;
const API = `https://data.bodik.jp/api/3/action/package_show?id=${DATASET_ID}`;

const EXPECTED_HEADER = ["ID", "名称", "0歳", "1歳", "2歳", "3歳", "4歳", "5歳", "更新日"];
const COL_ID = 0;
const COL_NAME = 1;
const COL_AGE0 = 2;
const AGE_COUNT = 6;
const COL_UPDATED = 8;
const MIN_FACILITIES = 80;
const UA = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";

/** 意味が公表されていないので、この説明を全部の記号に付ける */
const UNKNOWN_LABEL = "佐賀市は記号の意味を公表していません";
/** 空きがあるとみなす記号。記号の向きだけで決めており、人数の目安は分からない */
const OPEN_MARKS = ["○", "△"];

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);

function fail(message: string): never {
  console.error(`\n[中断] ${message}`);
  process.exit(1);
}

function todayJst(): string {
  const jst = new Date(Date.now() + 9 * 60 * 60 * 1000);
  return jst.toISOString().slice(0, 10);
}

function squeeze(s: string): string {
  return (s ?? "").replace(/[\s　]+/g, " ").trim();
}

/** 記号の形をそろえる */
function shapeOf(mark: string): string {
  if (/^[○◯〇]$/.test(mark)) return "○";
  if (/^[×✕✖]$/.test(mark)) return "×";
  if (/^[-ー―－]$/.test(mark)) return "-";
  return mark;
}

async function main() {
  console.log(`${MUNICIPALITY_NAME}の空き状況を取り込みます`);
  console.log(`データセット: ${SOURCE_PAGE}\n`);

  const res = await fetch(API, { headers: { "User-Agent": UA } });
  if (!res.ok) fail(`BODIKのAPIが ${res.status} を返しました`);
  const json = (await res.json()) as {
    success?: boolean;
    result?: { resources?: { name?: string; url?: string; format?: string }[] };
  };
  if (!json.success || !json.result) fail("BODIKのAPIが success を返しませんでした。");

  const resources = json.result.resources ?? [];
  // リソース名が「佐賀市_保育施設空き状況（R8.8.1.）.csv」のようになっている
  const dated = resources
    .map((r) => {
      const name = squeeze(r.name ?? "");
      if (!/csv$/i.test(String(r.format ?? "")) && !/\.csv$/i.test(String(r.url ?? "")))
        return null;
      const m = name.match(/R(\d+)\.(\d+)\.(\d+)/);
      if (!m || !r.url) return null;
      const [reiwa, month, day] = m.slice(1, 4).map(Number);
      return {
        url: r.url,
        name,
        reiwa,
        month,
        day,
        sortKey: reiwa * 10000 + month * 100 + day,
      };
    })
    .filter((v): v is NonNullable<typeof v> => v !== null)
    .sort((a, b) => b.sortKey - a.sortKey);

  if (dated.length === 0) {
    fail(
      `日付つきのCSVが1件も見つかりません（リソース ${resources.length}件）。命名規則が変わった可能性があります。`
    );
  }
  const latest = dated[0];
  console.log(`最新のリソース: ${latest.name}`);
  console.log(`  ${latest.url}\n`);

  const csvRes = await fetch(latest.url, { headers: { "User-Agent": UA } });
  if (!csvRes.ok) fail(`CSVの取得に失敗しました（${csvRes.status}）: ${latest.url}`);
  const buf = Buffer.from(await csvRes.arrayBuffer());
  const text = new TextDecoder("utf-8", { fatal: false }).decode(buf).replace(/^﻿/, "");
  if (text.includes("�")) {
    fail("CSVをUTF-8として読めませんでした。文字コードが変わった可能性があります。");
  }
  if (text.includes('"')) {
    fail("CSVに引用符が含まれています。分割方法を見直してください。");
  }

  const lines = text.split(/\r?\n/).filter((l) => l.trim() !== "");
  if (lines.length < 2) fail(`CSVの行数が足りません（${lines.length}行）。`);

  const header = lines[0].split(",").map((s) => s.trim());
  if (header.length !== EXPECTED_HEADER.length) {
    fail(`列数が ${EXPECTED_HEADER.length} ではありません（${header.length}列）。`);
  }
  EXPECTED_HEADER.forEach((expected, i) => {
    if (header[i] !== expected) {
      fail(`${i + 1}列目の見出しが「${header[i]}」です（「${expected}」のはず）。`);
    }
  });

  const facilities: {
    id: string;
    name: string;
    w: null;
    c: null;
    vacancy: (number | null)[];
    symbols: (string | null)[];
  }[] = [];
  const marks = new Map<string, number>();
  const seenId = new Set<string>();
  const seenName = new Set<string>();
  const updatedDays = new Set<string>();

  for (const line of lines.slice(1)) {
    const values = line.split(",").map((s) => s.trim());
    if (values.length !== EXPECTED_HEADER.length) {
      fail(`列数が${values.length}の行があります: 「${line.slice(0, 60)}」`);
    }
    const id = values[COL_ID];
    const name = squeeze(values[COL_NAME]);
    if (!id) fail(`IDが空の行があります: 「${line.slice(0, 60)}」`);
    if (!name) fail(`名称が空の行があります（ID ${id}）`);
    if (seenId.has(id)) fail(`IDが重複しています: ${id}`);
    if (seenName.has(name)) fail(`名称が重複しています: ${name}`);
    seenId.add(id);
    seenName.add(name);
    updatedDays.add(values[COL_UPDATED]);

    const symbols: (string | null)[] = [];
    for (let age = 0; age < AGE_COUNT; age++) {
      const raw = shapeOf(values[COL_AGE0 + age]);
      if (!raw) fail(`${name}: ${age}歳の欄が空です`);
      marks.set(raw, (marks.get(raw) ?? 0) + 1);
      symbols.push(raw);
    }

    facilities.push({
      id,
      name,
      w: null,
      c: null,
      vacancy: new Array(AGE_COUNT).fill(null),
      symbols,
    });
  }

  if (facilities.length < MIN_FACILITIES) {
    fail(`施設が${facilities.length}件しか取れていません（${MIN_FACILITIES}件以上のはず）`);
  }

  // 更新日は全行同じはず。バラバラなら意味が変わるので止める
  if (updatedDays.size !== 1) {
    fail(`更新日が${updatedDays.size}種類あります（${[...updatedDays].join(" / ")}）`);
  }
  const updated = [...updatedDays][0];
  const m = updated.match(/^(\d{4})\/(\d{1,2})\/(\d{1,2})$/);
  if (!m) fail(`更新日の形が想定と違います: 「${updated}」`);
  const asOf = `${m[1]}-${String(Number(m[2])).padStart(2, "0")}-${String(Number(m[3])).padStart(2, "0")}`;
  if (asOf > todayJst()) fail(`更新日（${asOf}）が今日より先になっています`);

  // リソース名の日付（R8.8.1.）とCSVの更新日が合っているか
  const fromName = `${2018 + latest.reiwa}-${String(latest.month).padStart(2, "0")}-${String(
    latest.day
  ).padStart(2, "0")}`;
  if (fromName !== asOf) {
    fail(`リソース名の日付（${fromName}）とCSVの更新日（${asOf}）が違います`);
  }
  console.log(`データの時点: ${asOf}`);

  // 検算: 記号の総数が施設数×クラス数になるか（このCSVには空欄がない）
  const total = [...marks.values()].reduce((a, b) => a + b, 0);
  if (total !== facilities.length * AGE_COUNT) {
    fail(
      `記号の総数が合いません（${total}個 / 施設${facilities.length}×${AGE_COUNT}クラス）`
    );
  }
  console.log(`記号の総数は施設数×クラス数と合いました（${total}）`);

  // 出てきた記号を凡例にする。意味は公表されていないので説明は付けられない
  const symbolLegend = [...marks.keys()]
    .sort((a, b) => (marks.get(b) ?? 0) - (marks.get(a) ?? 0))
    .map((mark) => ({ mark, label: UNKNOWN_LABEL, open: OPEN_MARKS.includes(mark) }));
  if (!symbolLegend.some((l) => l.open)) {
    fail(`空きありとみなせる記号がありません（出てきた記号: ${[...marks.keys()].join(" ")}）`);
  }
  console.log(`記号: ${[...marks].map(([k, v]) => `${k}=${v}`).join(" / ")}`);

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

  const notes = [
    `佐賀市は空き状況を人数ではなく記号（${[...marks.keys()].join("・")}）で公表しています。当サイトでも公式の記号のまま載せています。これは${asOf}時点のものです。`,
    "佐賀市は記号の意味（何人分の空きなのか、「○」と「△」がどう違うのか）を公表していません。当サイトでは意味を推測して補うことはせず、記号だけをそのまま載せています。",
    "このデータは佐賀市がオープンデータとして毎月1日ぶんを公開しているものです。市の公式ページはサイト改編で場所が変わっており、出典としてはデータの公開元を載せています。",
  ];

  const dataset = {
    municipalitySlug: MUNICIPALITY_SLUG,
    municipalityName: MUNICIPALITY_NAME,
    asOf,
    fetchedAt: todayJst(),
    sourceName: SOURCE_NAME,
    sourceUrl: SOURCE_PAGE,
    sourceFiles: { vacancy: latest.url },
    metrics: ["symbol"],
    subtitle: `${asOf.slice(5, 7).replace(/^0/, "")}月1日時点の空き状況`,
    notes,
    wards: [],
    categories: [],
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
