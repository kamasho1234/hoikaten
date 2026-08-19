/**
 * 文京区の認可保育所等の募集予定人数・申込者数を取り込む
 *
 * 実行: npm run vacancy:fetch:bunkyo
 *
 * ## この自治体の特徴
 * - **募集予定人数と締切後申込者数の両方を公開している**（横浜市に次いで2例め）。
 *   申込者数は waiting として持ち、UIで「1枠あたりの申込数」を出せる
 * - **1ページに表が2つ**（左＝募集予定人数、右＝申込者数）。行の並びが同じなので行位置で対応づける
 * - **エリア（駅周辺）と施設区分（区立／私立）は縦書きの結合セル**
 * - **空欄は「募集を行っていないクラス」**。0という数値は出てこない
 * - **末尾に合計行がある**ので、積み上げと突き合わせて検算できる
 *
 * ## 申込者数の読み方
 * 「締切後申込者数（第1〜10希望合計）」＝その園を希望に書いた人の数。
 * 1人が複数園を書けるので、実際の競争倍率ではなく申込の集中度を示す。横浜市と同じ性質。
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "bunkyo";
const MUNICIPALITY_NAME = "文京区";
const SOURCE_NAME = "文京区「募集人数一覧表」";
const INDEX_URL = "https://www.city.bunkyo.lg.jp/b023/p001773.html";
const AGE_COUNT = 6;
const MIN_FACILITY_RATIO = 0.9;

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const RESEARCH_PATH = path.join(
  process.cwd(),
  "scripts",
  "vacancy-research",
  MUNICIPALITY_SLUG,
  "facilities_from_pdf.json"
);
const EXTRACTOR = path.join(process.cwd(), "scripts", "bunkyo-pdf-extract.py");

function fail(message: string): never {
  console.error(`\n[中断] ${message}`);
  process.exit(1);
}

function todayJst(): string {
  const now = new Date();
  const jst = new Date(now.getTime() + 9 * 60 * 60 * 1000);
  return jst.toISOString().slice(0, 10);
}

function reiwaToYear(reiwa: number): number {
  return 2018 + reiwa;
}

function stripTags(html: string): string {
  return html.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();
}

function toHalfWidth(s: string): string {
  return s.replace(/[０-９]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xfee0));
}

type PdfPage = {
  columns: {
    area: number;
    kubun: number;
    no: number;
    name: number;
    ages: number[];
    subAges: number[] | null;
  };
  areaByRow: string[];
  kubunByRow: string[];
  rows: string[][];
  subRows: string[][];
};
type PdfResult = { asOf: number[][]; target: number[][]; pages: PdfPage[] };

function runPython(args: string[]): string {
  const candidates = process.env.PYTHON ? [process.env.PYTHON] : ["python3", "python"];
  let lastError = "";
  for (const bin of candidates) {
    try {
      return execFileSync(bin, args, { encoding: "utf-8", maxBuffer: 64 * 1024 * 1024 });
    } catch (err) {
      const e = err as { code?: string; stderr?: string; message?: string };
      if (e.code === "ENOENT") {
        lastError = `${bin} が見つかりません`;
        continue;
      }
      fail(`PDFの抽出に失敗しました（${bin}）: ${e.stderr || e.message}`);
    }
  }
  fail(`Pythonを実行できません（${lastError}）。pdfplumber が入った python が必要です。`);
}

/** 空欄は募集を行っていないクラス、数字は人数 */
function parseValue(v: string, where: string): number | null {
  const t = toHalfWidth((v ?? "").replace(/\s/g, "")).replace(/,/g, "");
  if (t === "" || t === "-" || t === "－") return null;
  if (/^\d+$/.test(t)) return Number(t);
  fail(`${where}: 人数として読めません: 「${v}」`);
}

/**
 * 施設区分。PDFは記号で書かれているものがあるので、注記にある正式名称に直す。
 * ☆＝事業所内保育所（区民枠の募集数）、★＝家庭的保育事業。
 */
function categoryOf(raw: string): string {
  const s = (raw ?? "").replace(/[\s　]/g, "");
  if (s === "☆") return "事業所内保育所";
  if (s === "★") return "家庭的保育事業";
  if (s === "公設委託") return "公設委託";
  return s;
}

async function main() {
  console.log(`${MUNICIPALITY_NAME}の募集予定人数・申込者数を取り込みます`);
  console.log(`公式ページ: ${INDEX_URL}\n`);

  const ua = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";
  const res = await fetch(INDEX_URL, { headers: { "User-Agent": ua } });
  if (!res.ok) fail(`公式ページが ${res.status} を返しました`);
  const html = await res.text();

  // 「2026年9月募集予定人数・申込者数一覧（PDF：602KB）」。4月は1次・2次がある
  const links = [...html.matchAll(/<a[^>]+href="([^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => ({
      url: new URL(m[1], INDEX_URL).toString(),
      text: toHalfWidth(stripTags(m[2])),
    }))
    .map((l) => {
      const m = l.text.match(/(\d{4})年(\d+)月(?:(\d)次)?募集予定人数/);
      if (!m) return null;
      const year = Number(m[1]);
      const month = Number(m[2]);
      const round = Number(m[3] ?? 1);
      return { ...l, year, month, round, sortKey: year * 10000 + month * 100 + round };
    })
    .filter((v): v is NonNullable<typeof v> => v !== null);
  if (links.length === 0) fail("募集予定人数のPDFリンクが見つかりません。ページの構成が変わった可能性があります。");
  const latest = links.reduce((a, b) => (b.sortKey > a.sortKey ? b : a));
  console.log(`最新: ${latest.text}\n  ${latest.url}`);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "bunkyo-vacancy-"));
  try {
    const pdfRes = await fetch(latest.url, { headers: { "User-Agent": ua } });
    if (!pdfRes.ok) fail(`PDFの取得に失敗しました（${pdfRes.status}）: ${latest.url}`);
    const buf = Buffer.from(await pdfRes.arrayBuffer());
    if (buf.subarray(0, 4).toString() !== "%PDF") fail(`PDFではありません: ${latest.url}`);
    const file = path.join(tmpDir, "bunkyo.pdf");
    fs.writeFileSync(file, buf);

    const raw = runPython([EXTRACTOR, file]);
    let pdf: PdfResult;
    try {
      pdf = JSON.parse(raw) as PdfResult;
    } catch (err) {
      fail(`抽出結果を読めません: ${String(err)}`);
    }

    if (pdf.asOf.length !== 1) fail(`PDFに基準日が${pdf.asOf.length}種類あります`);
    const [ay, am, ad] = pdf.asOf[0];
    const asOf = `${reiwaToYear(ay)}-${String(am).padStart(2, "0")}-${String(ad).padStart(2, "0")}`;
    if (pdf.target.length !== 1) fail(`PDFに対象月が${pdf.target.length}種類あります`);
    const [ty, tm] = pdf.target[0];
    if (reiwaToYear(ty) !== latest.year || tm !== latest.month) {
      fail(`PDFの対象月（${reiwaToYear(ty)}年${tm}月）がリンクの文言（${latest.year}年${latest.month}月）と違います。`);
    }
    console.log(`基準日: ${asOf} / 対象: ${reiwaToYear(ty)}年${tm}月入所`);

    const wards: string[] = [];
    const categories: string[] = [];
    const facilities: {
      id: string;
      name: string;
      w: number;
      c: number;
      vacancy: (number | null)[];
      waiting: (number | null)[];
    }[] = [];
    const research: { id: string; name: string; area: string; category: string; no: string }[] = [];
    const seen = new Set<string>();
    const builtVacancy = new Array(AGE_COUNT).fill(0);
    const declaredVacancy = new Array(AGE_COUNT).fill(0);
    let totalRows = 0;

    for (const p of pdf.pages) {
      const c = p.columns;
      for (const [ri, row] of p.rows.entries()) {
        const name = (row[c.name] ?? "").trim();
        const kubunRaw = (p.kubunByRow[ri] ?? "").replace(/[\s　]/g, "");
        const values = c.ages.map((i) => parseValue(row[i] ?? "", `文京区 ${name || kubunRaw}`));

        // 「合 計」の行は施設ではなく検算用（区分の列に入る）
        if (kubunRaw === "合計" || name.replace(/[\s　]/g, "") === "合計") {
          values.forEach((v, i) => {
            declaredVacancy[i] += v ?? 0;
          });
          totalRows++;
          continue;
        }
        if (!name) continue;

        const area = (p.areaByRow[ri] ?? "").replace(/[\s　]/g, "");
        if (!area) fail(`${name}: エリアが分かりません`);
        const category = categoryOf(kubunRaw);
        if (!category) fail(`${name}: 施設区分が分かりません`);
        if (!wards.includes(area)) wards.push(area);
        if (!categories.includes(category)) categories.push(category);

        // 申込者数は右の表の同じ行位置にある
        const subRow = c.subAges && p.subRows[ri] ? p.subRows[ri] : null;
        const waiting = c.subAges
          ? c.subAges.map((i) => parseValue(subRow?.[i] ?? "", `文京区 ${name}（申込者数）`))
          : new Array(AGE_COUNT).fill(null);

        values.forEach((v, i) => {
          builtVacancy[i] += v ?? 0;
        });

        const id = name;
        if (seen.has(id)) fail(`施設名が重複しています: ${id}`);
        seen.add(id);
        facilities.push({
          id,
          name,
          w: wards.indexOf(area),
          c: categories.indexOf(category),
          vacancy: values,
          waiting,
        });
        research.push({ id, name, area, category, no: (row[c.no] ?? "").trim() });
      }
    }

    if (facilities.length === 0) fail("施設が1件も取れていません。");
    if (totalRows === 0) fail("合計行が見つかりません。検算できないため中断します。");
    if (builtVacancy.some((v, i) => v !== declaredVacancy[i])) {
      fail(`募集予定人数の積み上げ [${builtVacancy}] が合計行 [${declaredVacancy}] と一致しません`);
    }
    console.log(`合計行との突き合わせ: 一致（${declaredVacancy.join("/")}）`);
    console.log(
      `施設 ${facilities.length}件 / エリア ${wards.length}件 / 区分 ${categories.join("・")}`
    );

    let previous: { asOf?: string; facilities?: unknown[] } | null = null;
    if (fs.existsSync(OUT_PATH)) {
      previous = JSON.parse(fs.readFileSync(OUT_PATH, "utf-8"));
      const before = previous?.facilities?.length ?? 0;
      if (before > 0 && facilities.length < before * MIN_FACILITY_RATIO) {
        fail(`施設数が前回（${before}件）の${MIN_FACILITY_RATIO * 100}%を下回りました（${facilities.length}件）。`);
      }
      if (previous?.asOf === asOf) {
        console.log(`\n基準日が前回と同じ（${asOf}）なので書き換えません。`);
        return;
      }
    }

    const dataset = {
      municipalitySlug: MUNICIPALITY_SLUG,
      municipalityName: MUNICIPALITY_NAME,
      asOf,
      fetchedAt: todayJst(),
      sourceName: SOURCE_NAME,
      sourceUrl: INDEX_URL,
      sourceFiles: { 募集予定人数・申込者数: latest.url },
      metrics: ["vacancy", "waiting"],
      subtitle: `${reiwaToYear(ty)}年${tm}月入所ぶんの募集予定人数`,
      waitingCaveat:
        "申込者数は第1〜10希望の合計です。1人が複数の園を希望に書けるため、実際の競争倍率ではなく申込がどれだけ集中しているかの目安になります。",
      notes: [
        `文京区が公開しているのは「${reiwaToYear(ty)}年${tm}月に入所できる枠の予定人数」です。現時点の空き数ではありません。`,
        "募集予定人数は選考会議の直前まで退園情報等を反映するため変動することがあります。",
        "「—」はそのクラスの募集を行っていないことを示します。",
        "申込者数は締切後の第1〜10希望の合計です。",
        "「事業所内保育所」は区民枠の募集数です。「家庭的保育事業」は空きが出ても応募がない場合、他の年齢にも枠を拡大して選考します。",
        "エリアの分けかたは出典の一覧（駅周辺順）をそのまま使っています。",
        "文京区はこの数値をPDFで公開しています。当サイトは表をそのまま読み取って掲載しています。",
      ],
      wards,
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
    fs.mkdirSync(path.dirname(RESEARCH_PATH), { recursive: true });
    fs.writeFileSync(
      RESEARCH_PATH,
      `${JSON.stringify({ asOf, sourceUrl: latest.url, facilities: research }, null, 1)}\n`,
      "utf-8"
    );

    const ageTotals = Array.from({ length: AGE_COUNT }, (_, age) =>
      facilities.reduce((a, f) => a + (f.vacancy[age] ?? 0), 0)
    );
    const waitTotals = Array.from({ length: AGE_COUNT }, (_, age) =>
      facilities.reduce((a, f) => a + (f.waiting[age] ?? 0), 0)
    );
    console.log(`\n書き出しました: ${path.relative(process.cwd(), OUT_PATH)}`);
    console.log(`  データ時点: ${asOf}`);
    console.log("");
    categories.forEach((cat, i) => {
      const list = facilities.filter((f) => f.c === i);
      const sum = list.reduce((a, f) => a + f.vacancy.reduce((s: number, v) => s + (v ?? 0), 0), 0);
      console.log(`  ${cat.padEnd(8, "　")} ${String(list.length).padStart(3)}施設 / 募集${sum}`);
    });
    console.log("");
    console.log("  年齢 | 募集 | 申込");
    ageTotals.forEach((v, age) => console.log(`  ${age}歳児 | ${v} | ${waitTotals[age]}`));
    console.log(
      `  合計 | ${ageTotals.reduce((a, b) => a + b, 0)} | ${waitTotals.reduce((a, b) => a + b, 0)}`
    );
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

main().catch((err) => fail(String(err)));
