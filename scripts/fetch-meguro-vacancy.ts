/**
 * 目黒区の保育施設空き状況を取り込む
 *
 * 実行: npm run vacancy:fetch:meguro
 *
 * ## データの出どころ
 * 目黒区はBODIK（自治体共同のオープンデータ基盤）に月2回CSVを登録している（CC-BY 4.0）。
 * 区の公式ページにはPDFしかないため、CSVはBODIKのAPIから取る。
 *
 * **東京都オープンデータカタログにも同じデータが載っているが、そちらはハーベストが遅れる**
 * （本家に7月23日分があるのにカタログ側は6月22日分が最新、ということが実際にあった）。
 * かならずBODIK本家（data.bodik.jp）のAPIを見ること。
 *
 * ## 横浜市との違い
 * - 公開されているのは空き数だけ（入所待ち人数・在籍児童数はない）
 * - 区に分かれていない代わりに施設類型がある
 * - 家庭福祉員だけは年齢別に分かれず「0歳・1歳・2歳」の合算で公表される
 * - CSVが Shift_JIS
 *
 * ## 安全装置
 * 想定と1つでも違えば書き込まずに exit 1 する。
 * 公式の構造変更で壊れたデータを公開するより、古いデータのまま止まる方が安全。
 */

import fs from "node:fs";
import path from "node:path";

const MUNICIPALITY_SLUG = "meguro";
const MUNICIPALITY_NAME = "目黒区";
const SOURCE_NAME = "目黒区「区内保育施設の空き状況（例月）」";
/** 区の公式ページ（掲載元。実データはBODIKから取る） */
const SOURCE_PAGE =
  "https://www.city.meguro.tokyo.jp/hoiku/kosodatekyouiku/hoikuennado/akijokyo.html";
/** BODIKのデータセット。スラッグは安定しているのでIDではなくこれを使う */
const DATASET_ID = "131105_available_child_care";
const API = `https://data.bodik.jp/api/3/action/package_show?id=${DATASET_ID}`;

const OUT_PATH = path.join(
  process.cwd(),
  "src",
  "lib",
  "vacancy",
  `${MUNICIPALITY_SLUG}.json`
);

/** CSVの列。この並びが変わったら中断する */
const EXPECTED_HEADER = [
  "利用調整日",
  "保育施設名",
  "施設類型",
  "0歳・1歳・2歳",
  "0歳児",
  "1歳児",
  "2歳児",
  "3歳児",
  "4歳児",
  "5歳児",
  "延長保育",
  "緯度",
  "経度",
];
const AGE_COUNT = 6;
/** 年齢別の列（0歳児〜5歳児）の位置 */
const AGE_START = 4;
const COL_MERGED_012 = 3;

function fail(message: string): never {
  console.error(`\n[中断] ${message}`);
  process.exit(1);
}

function todayJst(): string {
  const now = new Date();
  const jst = new Date(now.getTime() + 9 * 60 * 60 * 1000);
  return jst.toISOString().slice(0, 10);
}

/** "2026/7/23" → "2026-07-23" */
function toIsoDate(s: string): string | null {
  const m = s.trim().match(/^(\d{4})\/(\d{1,2})\/(\d{1,2})$/);
  if (!m) return null;
  return `${m[1]}-${m[2].padStart(2, "0")}-${m[3].padStart(2, "0")}`;
}

/** 空文字は null（クラスなし）。数値でなければ中断 */
function parseCell(raw: string, where: string): number | null {
  const s = raw.trim();
  if (s === "") return null;
  if (!/^\d+$/.test(s)) fail(`数値でない値があります（${where}）: ${JSON.stringify(raw)}`);
  return Number(s);
}

async function main() {
  console.log(`${MUNICIPALITY_NAME}の保育施設空き状況を取り込みます`);
  console.log(`データセット: https://data.bodik.jp/dataset/${DATASET_ID}\n`);

  // --- 1. BODIKのAPIから最新のCSVを見つける ---
  const res = await fetch(API);
  if (!res.ok) fail(`BODIKのAPIが ${res.status} を返しました`);
  const json = (await res.json()) as {
    success?: boolean;
    result?: {
      resources?: { name?: string; url?: string; format?: string }[];
    };
  };
  if (!json.success || !json.result) fail("BODIKのAPIが success を返しませんでした。");

  const resources = json.result.resources ?? [];
  // ファイル名の末尾が YYYYMMDD.csv になっている。この日付が新しいものを使う
  const dated = resources
    .map((r) => {
      const m = String(r.url ?? "").match(/(\d{8})\.csv$/);
      return m ? { url: r.url as string, key: m[1], name: r.name ?? "" } : null;
    })
    .filter((r): r is { url: string; key: string; name: string } => r !== null)
    .filter((r) => /^20\d{6}$/.test(r.key)) // 明らかに壊れたファイル名を除く
    .sort((a, b) => b.key.localeCompare(a.key));

  if (dated.length === 0) {
    fail(
      `日付つきのCSVが1件も見つかりません（リソース ${resources.length}件）。命名規則が変わった可能性があります。`
    );
  }
  const latest = dated[0];
  console.log(`最新のリソース: ${latest.name}`);
  console.log(`  ${latest.url}\n`);

  // --- 2. CSVを取得（Shift_JIS） ---
  const csvRes = await fetch(latest.url);
  if (!csvRes.ok) fail(`CSVの取得に失敗しました（${csvRes.status}）: ${latest.url}`);
  const buf = Buffer.from(await csvRes.arrayBuffer());
  const text = new TextDecoder("shift_jis", { fatal: false }).decode(buf);
  if (text.includes("�")) {
    fail("CSVをShift_JISとして読めませんでした。文字コードが変わった可能性があります。");
  }

  const lines = text.split(/\r?\n/).filter((l) => l.trim() !== "");
  if (lines.length < 2) fail(`CSVの行数が足りません（${lines.length}行）。`);

  // このCSVは引用符を使わない。使われ始めたら素朴な分割では壊れるので中断する
  if (text.includes('"')) {
    fail("CSVに引用符が含まれています。分割方法を見直してください。");
  }

  const header = lines[0].split(",").map((s) => s.trim());
  if (header.length !== EXPECTED_HEADER.length) {
    fail(`列数が ${EXPECTED_HEADER.length} ではありません（${header.length}列）。`);
  }
  EXPECTED_HEADER.forEach((expected, i) => {
    if (header[i] !== expected) {
      fail(`${i + 1}列目の見出しが「${expected}」ではありません: 「${header[i]}」`);
    }
  });

  // --- 3. パース ---
  const rows = lines.slice(1).map((l) => l.split(","));
  rows.forEach((r, i) => {
    if (r.length !== EXPECTED_HEADER.length) {
      fail(`${i + 2}行目の列数が ${r.length} です（${EXPECTED_HEADER.length}列であるべき）。`);
    }
  });

  const dates = new Set(rows.map((r) => r[0].trim()));
  if (dates.size !== 1) {
    fail(`利用調整日が1種類ではありません: ${[...dates].join(", ")}`);
  }
  const asOf = toIsoDate([...dates][0]);
  if (!asOf) fail(`利用調整日を日付として読めません: ${[...dates][0]}`);

  // 施設類型。公式が空欄にしているもの（家庭福祉員）は当サイトで埋めず、分類なしとして扱う
  const categories = [
    ...new Set(rows.map((r) => r[2].trim()).filter((s) => s !== "")),
  ];

  const seenNames = new Set<string>();
  const facilities = rows.map((r, i) => {
    const name = r[1].trim();
    if (name === "") fail(`${i + 2}行目の施設名が空です。`);
    if (seenNames.has(name)) {
      // 施設名をIDにしているため、重複すると施設を取り違える
      fail(`施設名が重複しています: ${name}`);
    }
    seenNames.add(name);

    const type = r[2].trim();
    const vacancy = Array.from({ length: AGE_COUNT }, (_, age) =>
      parseCell(r[AGE_START + age], `${name} の${age}歳児`)
    );
    const merged = parseCell(r[COL_MERGED_012], `${name} の0〜2歳合算`);

    // 年齢別と合算のどちらかしか入らないはず。両方あると二重計上になる
    const hasAge = vacancy.some((v) => v !== null);
    if (hasAge && merged !== null) {
      fail(`${name} は年齢別と0〜2歳合算の両方に値があります。集計方法を確認してください。`);
    }
    if (!hasAge && merged === null) {
      fail(`${name} は年齢別も0〜2歳合算も空です。`);
    }

    const lat = Number(r[11]);
    const lng = Number(r[12]);
    if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
      fail(`${name} の緯度経度が数値ではありません: ${r[11]}, ${r[12]}`);
    }

    return {
      id: name,
      name,
      w: null,
      c: type === "" ? null : categories.indexOf(type),
      vacancy,
      ...(merged !== null ? { vacancyTotal: merged } : {}),
      lat,
      lng,
    };
  });

  // --- 4. 前回との比較 ---
  let previous: { asOf?: string; facilities?: unknown[]; sourceFiles?: Record<string, string> } | null = null;
  if (fs.existsSync(OUT_PATH)) {
    try {
      previous = JSON.parse(fs.readFileSync(OUT_PATH, "utf-8"));
    } catch {
      previous = null;
    }
  }
  if (previous?.facilities) {
    const before = previous.facilities.length;
    if (facilities.length < before * 0.9) {
      fail(
        `施設数が大きく減っています（前回 ${before}件 → 今回 ${facilities.length}件）。取得内容を確認してください。`
      );
    }
  }
  // 自治体は基準日を変えずに資料を差し替えることがある。
  // 取り込み元の一式も同じときだけ、書き換えを見送る
  if (
    previous?.asOf === asOf &&
    JSON.stringify(previous?.sourceFiles ?? {}) === JSON.stringify({ vacancy: latest.url }) &&
    JSON.stringify(previous?.facilities ?? null) === JSON.stringify(facilities)
  ) {
    console.log(`公式データの時点が前回と同じ（${asOf}）のため更新はありません。`);
    return;
  }

  // --- 5. 書き出し ---
  const dataset = {
    municipalitySlug: MUNICIPALITY_SLUG,
    municipalityName: MUNICIPALITY_NAME,
    asOf,
    fetchedAt: todayJst(),
    sourceName: SOURCE_NAME,
    sourceUrl: SOURCE_PAGE,
    sourceFiles: { vacancy: latest.url },
    // 目黒区が公開しているのは空き数だけ。入所待ち人数・在籍児童数はない
    metrics: ["vacancy"],
    notes: [
      "目黒区の注記のとおり、空き状況はあくまでも予定です。状況が変わることもあります。",
      "データは目黒区がオープンデータ（CC BY 4.0）として公開しているCSVをそのまま集計したものです。",
    ],
    wards: [],
    categories,
    facilities,
  };

  const { facilities: _facilities, ...meta } = dataset;
  const metaJson = JSON.stringify(meta, null, 2);
  const head = metaJson.slice(0, metaJson.lastIndexOf("}")).trimEnd();
  const body = facilities.map((f) => `    ${JSON.stringify(f)}`).join(",\n");
  const out = `${head},\n  "facilities": [\n${body}\n  ]\n}\n`;

  try {
    JSON.parse(out);
  } catch (err) {
    fail(`生成したJSONが不正です: ${String(err)}`);
  }

  fs.mkdirSync(path.dirname(OUT_PATH), { recursive: true });
  fs.writeFileSync(OUT_PATH, out, "utf-8");

  // --- 6. サマリー ---
  const ageTotals = Array.from({ length: AGE_COUNT }, (_, age) =>
    facilities.reduce((acc, f) => acc + (f.vacancy[age] ?? 0), 0)
  );
  const mergedTotal = facilities.reduce((acc, f) => acc + (f.vacancyTotal ?? 0), 0);

  console.log(`書き出しました: ${path.relative(process.cwd(), OUT_PATH)}`);
  console.log(`  データ時点: ${asOf}`);
  console.log(`  施設数: ${facilities.length}`);
  console.log(`  施設類型: ${categories.length}種（${categories.join("・")}）`);
  console.log(`  分類なし（公式が施設類型を空にしている施設）: ${facilities.filter((f) => f.c === null).length}件`);
  console.log("");
  console.log("  年齢 | 空き枠");
  ageTotals.forEach((v, age) => console.log(`  ${age}歳児 | ${v}`));
  console.log(`  0〜2歳合算のみ | ${mergedTotal}`);
  console.log(
    `  合計 | ${ageTotals.reduce((a, b) => a + b, 0) + mergedTotal}`
  );
}

main().catch((err) => fail(String(err)));
