/**
 * 西東京市の認可保育所等の欠員状況を取り込む
 *
 * 実行: npm run vacancy:fetch:nishitokyo
 *
 * ## この自治体の特徴
 * - **HTMLの表で公開している**（台東区・港区に次いで3例め）
 * - ページには表が3つある。**定員変更のお知らせの表が先頭に来る**ので、
 *   「園名／0歳児…5歳児／合計」の並びを持つ表だけを施設の表として扱う
 * - **認可保育所の表には「合計」列がある**ので、年齢別の積み上げと1施設ずつ突き合わせられる
 * - 地域型保育事業の表は0〜2歳児のみ。**施設によって「0から2歳児」1列だけのものがある**
 *   （たけのこ保育室）ので、その場合は合算値として持つ
 * - 「―」はそのクラスの受け入れがない、0は欠員なし
 */

import fs from "node:fs";
import path from "node:path";

const MUNICIPALITY_SLUG = "nishitokyo";
const MUNICIPALITY_NAME = "西東京市";
const SOURCE_NAME = "西東京市「認可保育所等の欠員状況」";
const SOURCE_URL =
  "https://www.city.nishitokyo.lg.jp/kosodate/hoikuen/hoikushisetuketuinn/hoiku-ketsuin.html";
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

function text(html: string): string {
  return html
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
}

function squeeze(s: string): string {
  return (s ?? "").replace(/[\s　]/g, "");
}

/** 「―」はそのクラスの受け入れがない */
function parseValue(raw: string, where: string): number | null {
  const t = toHalfWidth(squeeze(raw));
  if (t === "" || t === "-" || t === "－" || t === "―" || t === "ー") return null;
  if (/^\d+$/.test(t)) return Number(t);
  fail(`${where}: 人数として読めません: 「${raw}」`);
}

type Table = { caption: string; rows: string[][] };

function parseTables(html: string): Table[] {
  const out: Table[] = [];
  for (const m of html.matchAll(/<table[^>]*>([\s\S]*?)<\/table>/gi)) {
    const inner = m[1];
    const cap = inner.match(/<caption[^>]*>([\s\S]*?)<\/caption>/i);
    const rows = [...inner.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi)].map((r) =>
      [...r[1].matchAll(/<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/gi)].map((c) => text(c[1]))
    );
    if (rows.length < 2) continue;
    out.push({ caption: cap ? text(cap[1]) : "", rows });
  }
  return out;
}

async function main() {
  console.log(`${MUNICIPALITY_NAME}の欠員状況を取り込みます`);
  console.log(`公式ページ: ${SOURCE_URL}\n`);

  const res = await fetch(SOURCE_URL, {
    headers: { "User-Agent": "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)" },
  });
  if (!res.ok) fail(`公式ページが ${res.status} を返しました`);
  const html = await res.text();

  const plain = toHalfWidth(text(html));
  // 「令和8年9月利用調整における欠員状況（令和8年8月1日時点）」
  const m = plain.match(/令和(\d+)年(\d+)月利用調整における欠員状況（令和(\d+)年(\d+)月(\d+)日時点）/);
  if (!m) fail("「令和X年Y月利用調整における欠員状況（令和A年B月C日時点）」が読み取れません");
  const targetYear = reiwaToYear(Number(m[1]));
  const targetMonth = Number(m[2]);
  const asOf = `${reiwaToYear(Number(m[3]))}-${m[4].padStart(2, "0")}-${m[5].padStart(2, "0")}`;
  console.log(`基準日: ${asOf} / 対象: ${targetYear}年${targetMonth}月の利用調整`);

  const categories: string[] = [];
  const facilities: {
    id: string;
    name: string;
    w: null;
    c: number;
    vacancy: (number | null)[];
    vacancyTotal?: number;
  }[] = [];
  const seenId = new Set<string>();
  let rowTotalChecks = 0;

  for (const table of parseTables(html)) {
    // 先頭行の見出しで施設の表かどうかを見分ける。
    // 定員変更のお知らせの表は「施設名／変更前／変更後」なので外れる
    const head = table.rows[0].map((c) => squeeze(c));
    const nameIdx = head.findIndex((h) => h === "園名" || h === "施設名");
    if (nameIdx < 0) continue;
    const ageIdx = Array.from({ length: AGE_COUNT }, (_, i) =>
      head.findIndex((h) => toHalfWidth(h) === `${i}歳児`)
    );
    const mergedIdx = head.findIndex((h) => /^0から2歳児$/.test(toHalfWidth(h)));
    if (ageIdx[0] < 0 && mergedIdx < 0) continue;
    const totalIdx = head.findIndex((h) => h === "合計");

    // 認可保育所の表は6歳児ぶん、地域型は0〜2歳児だけ
    const category = ageIdx[3] >= 0 ? "認可保育所" : "地域型保育事業";
    if (!categories.includes(category)) categories.push(category);

    // 表の途中で見出し行が入ることがある（「0歳児／1歳児／2歳児」）
    let localAge = ageIdx;
    let localMerged = mergedIdx;
    for (const row of table.rows.slice(1)) {
      const cells = row.map((c) => squeeze(c));
      const maybeHead = Array.from({ length: 3 }, (_, i) =>
        cells.findIndex((h) => toHalfWidth(h) === `${i}歳児`)
      );
      if (maybeHead.every((i) => i >= 0)) {
        // 見出し行。ここから下は年齢の列位置が変わる
        localAge = Array.from({ length: AGE_COUNT }, (_, i) =>
          cells.findIndex((h) => toHalfWidth(h) === `${i}歳児`)
        );
        localMerged = -1;
        continue;
      }

      const name = (row[nameIdx] ?? "").replace(/[　\s]+/g, "").trim();
      if (!name) continue;
      if (squeeze(name) === "合計") continue;

      let vacancy: (number | null)[] = new Array(AGE_COUNT).fill(null);
      let vacancyTotal: number | undefined;
      if (localMerged >= 0 && localAge[0] < 0) {
        // 「0から2歳児」1列だけの施設
        const v = parseValue(row[localMerged] ?? "", `西東京市 ${name}`);
        vacancyTotal = v ?? 0;
      } else {
        vacancy = localAge.map((i) => (i < 0 ? null : parseValue(row[i] ?? "", `西東京市 ${name}`)));
        // 「合計」列があれば積み上げと突き合わせる
        if (totalIdx >= 0) {
          const declared = parseValue(row[totalIdx] ?? "", `西東京市 ${name}（合計）`);
          const sum = vacancy.reduce((a: number, v) => a + (v ?? 0), 0);
          if (declared !== null && declared !== sum) {
            fail(`${name}: 「合計」が${declared}なのに年齢別の合計が${sum}です`);
          }
          if (declared !== null) rowTotalChecks++;
        }
      }

      const id = `${category}-${name}`;
      if (seenId.has(id)) fail(`施設名が重複しています: ${id}`);
      seenId.add(id);
      facilities.push({
        id,
        name,
        w: null,
        c: categories.indexOf(category),
        vacancy,
        ...(vacancyTotal !== undefined ? { vacancyTotal } : {}),
      });
    }
  }

  if (facilities.length < 40) fail(`施設が${facilities.length}件しか取れていません`);

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
    JSON.stringify(previous?.sourceFiles ?? {}) === JSON.stringify({ vacancy: SOURCE_URL })
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
    sourceUrl: SOURCE_URL,
    sourceFiles: { vacancy: SOURCE_URL },
    metrics: ["vacancy"],
    subtitle: `${targetYear}年${targetMonth}月の利用調整における欠員状況`,
    notes: [
      "西東京市の注記のとおり、欠員の状況は日々変わります。欠員がある保育所等を希望しても必ず入所できるとは限りません。",
      "欠員があれば利用調整は毎月行われます。",
      "一部の地域型保育事業は0〜2歳児をまとめた枠数で公表されています。",
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

  const ageTotals = Array.from({ length: AGE_COUNT }, (_, age) =>
    facilities.reduce((acc, f) => acc + (f.vacancy[age] ?? 0), 0)
  );
  const merged = facilities.reduce((acc, f) => acc + (f.vacancyTotal ?? 0), 0);
  console.log(`書き出しました: ${path.relative(process.cwd(), OUT_PATH)}`);
  console.log(`  行の「合計」との突き合わせ: ${rowTotalChecks}件すべて一致`);
  console.log("");
  for (const [i, cat] of categories.entries()) {
    console.log(`  ${cat} ${facilities.filter((f) => f.c === i).length}施設`);
  }
  console.log("");
  console.log("  年齢 | 欠員");
  ageTotals.forEach((v, age) => console.log(`  ${age}歳児 | ${v}`));
  console.log(`  0〜2歳合算のみ | ${merged}`);
  console.log(`  合計 | ${ageTotals.reduce((a, b) => a + b, 0) + merged}`);
}

main().catch((err) => fail(String(err)));
