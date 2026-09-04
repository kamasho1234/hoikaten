/**
 * 港区の区立・私立保育園の空き状況を取り込む
 *
 * 実行: npm run vacancy:fetch:minato
 *
 * ## この自治体の特徴
 * - **HTMLの表で公開している**（台東区に次いで2例め）。PDFを介さずに読める
 * - **h2が施設類型**（認可保育園／認定こども園／小規模保育施設／港区保育室）、
 *   **h3が地区**（芝／麻布／赤坂／高輪／芝浦港南）という素直な作り
 * - **1つの表に空き状況と定員が並ぶ**（6列＋6列）。当サイトが載せるのは空き数だが、
 *   **定員は列ずれの検算に使える**（空きが定員を超えることはない）。
 *   ただし「定員がーなら空きもー」は成り立たない。分園がある園は定員と空きが別の行に載る
 * - 末尾に「元麻布保育園（医療的ケア児・障害児クラス）」だけ年齢別がなく空き・定員が1つずつ。
 *   同名の園が麻布地区の認可保育園にもあるので、名前を分けて別の施設として持つ
 * - 「ー」はそのクラスを設けていない、0は空きなし
 */

import fs from "node:fs";
import path from "node:path";

const MUNICIPALITY_SLUG = "minato";
const MUNICIPALITY_NAME = "港区";
const SOURCE_NAME = "港区「区立・私立保育園空き状況」";
const SOURCE_URL = "https://www.city.minato.tokyo.jp/kodomo/kodomo/kodomo/hoikuen/aki.html";
const AGE_COUNT = 6;
/** h3に出る地区。ここにないものが出たら構成が変わったとみなす */
const WARDS = ["芝地区", "麻布地区", "赤坂地区", "高輪地区", "芝浦港南地区"];

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

function text(html: string): string {
  return html
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
}

/** 「ー」はそのクラスを設けていない、数字は人数 */
function parseValue(v: string, where: string): number | null {
  const t = toHalfWidth(v.replace(/[\s　]/g, ""));
  if (t === "" || t === "ー" || t === "－" || t === "-" || t === "―") return null;
  if (/^\d+$/.test(t)) return Number(t);
  fail(`${where}: 人数として読めません: 「${v}」`);
}

/** セル1つ。merged は「左のセルから結合されて続いている」位置を表す */
type Cell = { text: string; merged: boolean };

type Block =
  | { kind: "h2"; text: string }
  | { kind: "h3"; text: string }
  | { kind: "table"; rows: Cell[][] };

/** 見出しと表を、ページに出てくる順のまま拾う */
function readBlocks(html: string): Block[] {
  const out: Block[] = [];
  const re = /<(h2|h3)[^>]*>([\s\S]*?)<\/\1>|<table[^>]*>([\s\S]*?)<\/table>/gi;
  for (const m of html.matchAll(re)) {
    if (m[1]) {
      out.push({ kind: m[1].toLowerCase() as "h2" | "h3", text: text(m[2]) });
    } else {
      const rows = [...m[3].matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi)].map((r) => {
        const cells: Cell[] = [];
        for (const c of r[1].matchAll(/<t[dh]([^>]*)>([\s\S]*?)<\/t[dh]>/gi)) {
          // **4歳・5歳が合同クラスの園は colspan="2" で1つのセルになっている**。
          // 列の位置がずれないよう、続きの位置を merged として埋める
          const span = Number(c[1].match(/colspan="?(\d+)"?/i)?.[1] ?? 1);
          cells.push({ text: text(c[2]), merged: false });
          for (let i = 1; i < span; i++) cells.push({ text: "", merged: true });
        }
        return cells;
      });
      out.push({ kind: "table", rows });
    }
  }
  return out;
}

async function main() {
  console.log(`${MUNICIPALITY_NAME}の空き状況を取り込みます`);
  console.log(`公式ページ: ${SOURCE_URL}\n`);

  const res = await fetch(SOURCE_URL, {
    headers: { "User-Agent": "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)" },
  });
  if (!res.ok) fail(`公式ページが ${res.status} を返しました`);
  const html = await res.text();
  const start = html.indexOf("ここから本文です");
  if (start < 0) fail("本文の始まりが分かりません。ページの構成が変わった可能性があります。");
  const body = html.slice(start);

  const plain = text(body);
  // 「更新日：2026年8月17日」が公式の更新日。表そのものには基準日が書かれていない
  const um = html.match(/更新日：(\d{4})年(\d{1,2})月(\d{1,2})日/);
  if (!um) fail("更新日が読み取れません");
  const asOf = `${um[1]}-${um[2].padStart(2, "0")}-${um[3].padStart(2, "0")}`;
  const tmm = plain.match(/令和([０-９\d]+)年([０-９\d]+)月入所に向けた空き状況/);
  if (!tmm) fail("対象月（令和X年Y月入所に向けた空き状況）が読み取れません");
  const targetYear = 2018 + Number(toHalfWidth(tmm[1]));
  const targetMonth = Number(toHalfWidth(tmm[2]));
  console.log(`更新日: ${asOf} / 対象: ${targetYear}年${targetMonth}月入所`);

  const wards: string[] = [];
  const categories: string[] = [];
  const facilities: {
    id: string;
    name: string;
    w: number | null;
    c: number;
    vacancy: (number | null)[];
    vacancyTotal?: number;
  }[] = [];
  const seen = new Map<string, number>();
  let category: string | null = null;
  let ward: string | null = null;
  let capacityChecks = 0;
  const mergedClasses: string[] = [];

  for (const block of readBlocks(body)) {
    if (block.kind === "h2") {
      // 「よくある質問」などページ末尾の見出しに入ったら表の並びは終わり
      if (/よくある質問|このページを見た人|最近チェック|お問い合わせ|Pick up/.test(block.text)) {
        category = null;
        continue;
      }
      // 「元麻布保育園（医療的ケア児・障害児クラス）」は見出しが園名そのものなので、
      // 施設類型としてはクラス名だけにする
      category = block.text.replace(/^.+（(医療的ケア児[^）]*)）$/, "$1");
      ward = null;
      continue;
    }
    if (block.kind === "h3") {
      if (!WARDS.includes(block.text)) fail(`見覚えのない地区の見出しです: ${block.text}`);
      ward = block.text;
      continue;
    }
    if (category === null) continue;

    const rows = block.rows;
    if (rows.length < 2) fail(`${category}${ward ?? ""}: 表の行が足りません`);
    // 見出しは「空き状況」「定員」が colspan="6" なので、結合の続きを除いて比べる
    const head = rows[0].filter((c) => !c.merged).map((c) => c.text.replace(/[\s　]/g, ""));
    if (head[0] !== "保育園名" || head[1] !== "空き状況" || head[2] !== "定員") {
      fail(`${category}${ward ?? ""}: 表の見出しが違います: ${rows[0].map((c) => c.text).join(" / ")}`);
    }

    // 年齢の行（0歳…5歳が空き・定員で2回）。医療的ケア児クラスの表にはこれがない
    const ageRow = rows[1].map((c) => toHalfWidth(c.text.replace(/[\s　]/g, "")));
    const expected = [...Array(AGE_COUNT).keys(), ...Array(AGE_COUNT).keys()].map((i) => `${i}歳`);
    const hasAges = ageRow.length === AGE_COUNT * 2 && ageRow.every((v, i) => v === expected[i]);
    const dataRows = hasAges ? rows.slice(2) : rows.slice(1);

    if (!categories.includes(category)) categories.push(category);
    const c = categories.indexOf(category);
    let w: number | null = null;
    if (ward) {
      if (!wards.includes(ward)) wards.push(ward);
      w = wards.indexOf(ward);
    }

    for (const row of dataRows) {
      const name = row[0]?.text.trim();
      if (!name) continue;

      if (hasAges) {
        if (row.length !== AGE_COUNT * 2 + 1) {
          fail(
            `${name}: セルが${row.length}個あります（13個のはず）: ${row.map((cc) => cc.text).join(" / ")}`
          );
        }
        // 結合セルの続きの位置は、その学年だけの数字が公表されていないので null にする
        const readCells = (cells: Cell[], label: string) =>
          cells.map((cc) => (cc.merged ? null : parseValue(cc.text, `港区 ${name}${label}`)));
        const vacancy = readCells(row.slice(1, 1 + AGE_COUNT), "");
        const capacity = readCells(row.slice(1 + AGE_COUNT), "（定員）");
        const mergedAges = row
          .slice(1, 1 + AGE_COUNT)
          .map((cc, age) => (cc.merged ? age : -1))
          .filter((age) => age >= 0);
        if (mergedAges.length > 0) {
          mergedClasses.push(`${name}（${mergedAges.map((a) => `${a}歳児`).join("・")}）`);
        }
        // 定員との突き合わせ。列がずれれば必ずどちらかに引っかかる
        for (let age = 0; age < AGE_COUNT; age++) {
          const v = vacancy[age];
          const cap = capacity[age];
          // **「定員がーなら空きもー」は成り立たない**。分園がある園（まちの保育園 六本木）は
          // 3〜5歳の定員が分園の行に、空きが本園の行に載る。公式の書き方をそのまま残す
          if (cap !== null && v !== null) {
            if (v > cap) fail(`${name}: ${age}歳児の空き${v}が定員${cap}を超えています`);
            capacityChecks++;
          }
        }
        // 同じ名前の園が別の類型にも出るときは類型を添えて区別する
        const key = seen.has(name) ? `${name}（${category}）` : name;
        seen.set(name, (seen.get(name) ?? 0) + 1);
        facilities.push({ id: key, name: key, w, c, vacancy });
      } else {
        // この表も空き・定員が colspan="6"（全学年をまとめた1つの数字）
        const cells = row.filter((cc) => !cc.merged);
        if (cells.length !== 3) {
          fail(`${name}: セルが${cells.length}個あります（3個のはず）: ${row.map((cc) => cc.text).join(" / ")}`);
        }
        const v = parseValue(cells[1].text, `港区 ${name}`);
        const cap = parseValue(cells[2].text, `港区 ${name}（定員）`);
        if (v !== null && cap !== null) {
          if (v > cap) fail(`${name}: 空き${v}が定員${cap}を超えています`);
          capacityChecks++;
        }
        // 「元麻布保育園（医療的ケア児・障害児クラス）」のように、
        // 同名の園が認可保育園にもある。見出しをそのまま名前にして分ける
        const key = seen.has(name) ? category : name;
        // 同名の園がすでにあるなら、その園の地区を引き継ぐ（公式はこの節に地区を書いていない）
        const inherited = facilities.find((f) => f.name === name)?.w ?? null;
        facilities.push({
          id: key,
          name: key,
          w: seen.has(name) ? inherited : w,
          c,
          vacancy: new Array(AGE_COUNT).fill(null),
          vacancyTotal: v ?? 0,
        });
        seen.set(name, (seen.get(name) ?? 0) + 1);
      }
    }
  }

  if (facilities.length < 80) fail(`施設が${facilities.length}件しか取れていません`);
  const ids = new Set(facilities.map((f) => f.id));
  if (ids.size !== facilities.length) fail("施設IDが重複しています");

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
    subtitle: `${targetYear}年${targetMonth}月入所に向けた空き状況`,
    notes: [
      "港区の注記のとおり、空き状況は変更になる場合があります。",
      "港区外にお住まいの方は申込に制限があります。詳しくは「保育園入園のごあんない」をご覧ください。",
      "認定こども園は保育認定（2・3号認定）の空き状況です。教育標準時間認定（1号認定）は別に募集しています。",
      "元麻布保育園の医療的ケア児・障害児クラスは、公式が年齢別に分けずに公表しているため合算値で載せています。",
      ...(mergedClasses.length > 0
        ? [
            `次の園は複数の学年をまとめたクラスで、公式が学年ごとに分けずに公表しています。当サイトでは若い方の学年にまとめて載せ、残りは「—」としています: ${mergedClasses.join("、")}`,
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
  const merged = facilities.reduce((acc, f) => acc + (f.vacancyTotal ?? 0), 0);
  console.log(`書き出しました: ${path.relative(process.cwd(), OUT_PATH)}`);
  console.log(`  データ時点: ${asOf}`);
  console.log(`  空き≦定員の突き合わせ: ${capacityChecks}クラスすべて矛盾なし`);
  console.log(`  学年をまとめたクラス: ${mergedClasses.length}件${mergedClasses.length ? `（${mergedClasses.join("、")}）` : ""}`);
  console.log("");
  for (const [i, cat] of categories.entries()) {
    const list = facilities.filter((f) => f.c === i);
    const v = list.reduce(
      (a, f) => a + f.vacancy.reduce((x: number, y) => x + (y ?? 0), 0) + (f.vacancyTotal ?? 0),
      0
    );
    console.log(`  ${cat} ${list.length}施設 / 空き${v}`);
  }
  console.log("");
  for (const [i, wd] of wards.entries()) {
    console.log(`  ${wd} ${facilities.filter((f) => f.w === i).length}施設`);
  }
  console.log("");
  console.log("  年齢 | 空き");
  ageTotals.forEach((v, age) => console.log(`  ${age}歳児 | ${v}`));
  console.log(`  年齢別なしの合算 | ${merged}`);
  console.log(`  合計 | ${ageTotals.reduce((a, b) => a + b, 0) + merged}`);
}

main().catch((err) => fail(String(err)));
