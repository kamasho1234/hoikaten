/**
 * 新宿区の認可保育園等の募集見込数を取り込む
 *
 * 実行: npm run vacancy:fetch:shinjuku
 *
 * ## この自治体の特徴
 * - **区分が縦書きで数行にまたがる**（「区立」「認可」「保」「育園」で "区立認可保育園"）。
 *   結合セルではないので、抽出側がラベルのブロックを連結し、ラベル間の中点で区間を割っている
 * - **末尾に合計行がある**ので、積み上げと突き合わせて検算できる
 * - **空欄はそのクラスの受け入れがない**、0は募集見込みが0人
 * - 地区で分けていないので wards は空。施設コードが無いので施設名をIDにする
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "shinjuku";
const MUNICIPALITY_NAME = "新宿区";
const SOURCE_NAME = "新宿区「認可保育園・認証保育所等の空き状況・申込み状況」";
const INDEX_URL = "https://www.city.shinjuku.lg.jp/kodomo/file04_07_00034.html";
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
const EXTRACTOR = path.join(process.cwd(), "scripts", "shinjuku-pdf-extract.py");

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

type PdfTable = {
  columns: { kubun: number; name: number; ages: number[] };
  kubunByRow: string[];
  rows: string[][];
};
type PdfResult = { asOf: number[][]; target: number[][]; tables: PdfTable[] };

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

/** 空欄はそのクラスの受け入れなし、数字は募集見込数 */
function parseValue(v: string, where: string): number | null {
  const t = toHalfWidth((v ?? "").replace(/\s/g, "")).replace(/,/g, "");
  if (t === "" || t === "-" || t === "－") return null;
  if (/^\d+$/.test(t)) return Number(t);
  fail(`${where}: 募集見込数として読めません: 「${v}」`);
}

async function main() {
  console.log(`${MUNICIPALITY_NAME}の募集見込数を取り込みます`);
  console.log(`公式ページ: ${INDEX_URL}\n`);

  const ua = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";
  const res = await fetch(INDEX_URL, { headers: { "User-Agent": ua } });
  if (!res.ok) fail(`公式ページが ${res.status} を返しました`);
  const html = await res.text();

  // 「保育園・子ども園・保育ルーム等：令和8年9月入園募集見込み数（クラス別）一覧」
  const links = [...html.matchAll(/<a[^>]+href="([^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => ({
      url: new URL(m[1], INDEX_URL).toString(),
      text: toHalfWidth(stripTags(m[2])),
    }))
    .map((l) => {
      const m = l.text.match(/令和(\d+)年(\d+)月入園\s*(?:\((\d)次\)|（(\d)次）)?\s*募集見込み?数/);
      if (!m) return null;
      const year = reiwaToYear(Number(m[1]));
      const month = Number(m[2]);
      const round = Number(m[3] ?? m[4] ?? 1);
      return { ...l, year, month, round, sortKey: year * 10000 + month * 100 + round };
    })
    .filter((v): v is NonNullable<typeof v> => v !== null);
  if (links.length === 0) fail("募集見込数のPDFリンクが見つかりません。ページの構成が変わった可能性があります。");
  const latest = links.reduce((a, b) => (b.sortKey > a.sortKey ? b : a));
  console.log(`最新: ${latest.text}\n  ${latest.url}`);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "shinjuku-vacancy-"));
  try {
    const pdfRes = await fetch(latest.url, { headers: { "User-Agent": ua } });
    if (!pdfRes.ok) fail(`PDFの取得に失敗しました（${pdfRes.status}）: ${latest.url}`);
    const buf = Buffer.from(await pdfRes.arrayBuffer());
    if (buf.subarray(0, 4).toString() !== "%PDF") fail(`PDFではありません: ${latest.url}`);
    const file = path.join(tmpDir, "shinjuku.pdf");
    fs.writeFileSync(file, buf);

    const raw = runPython([EXTRACTOR, file]);
    let pdf: PdfResult;
    try {
      pdf = JSON.parse(raw) as PdfResult;
    } catch (err) {
      fail(`抽出結果を読めません: ${String(err)}`);
    }

    if (pdf.asOf.length !== 1) fail(`PDFに公開日が${pdf.asOf.length}種類あります`);
    const [ay, am, ad] = pdf.asOf[0];
    const asOf = `${reiwaToYear(ay)}-${String(am).padStart(2, "0")}-${String(ad).padStart(2, "0")}`;
    if (pdf.target.length !== 1) fail(`PDFに対象月が${pdf.target.length}種類あります`);
    const [ty, tm] = pdf.target[0];
    if (reiwaToYear(ty) !== latest.year || tm !== latest.month) {
      fail(`PDFの対象月（${reiwaToYear(ty)}年${tm}月）がリンクの文言（${latest.year}年${latest.month}月）と違います。`);
    }
    console.log(`公開日: ${asOf} / 対象: ${reiwaToYear(ty)}年${tm}月入園`);

    const categories: string[] = [];
    const facilities: { id: string; name: string; w: null; c: number; vacancy: (number | null)[] }[] =
      [];
    const research: { id: string; name: string; category: string }[] = [];
    const seen = new Set<string>();
    const built = new Array(AGE_COUNT).fill(0);
    let declared: number[] | null = null;

    for (const t of pdf.tables) {
      for (const [ri, row] of t.rows.entries()) {
        const name = (row[t.columns.name] ?? "").trim();
        const lead = (row[t.columns.kubun] ?? "").replace(/\s/g, "");
        const values = t.columns.ages.map((i) => parseValue(row[i] ?? "", `新宿区 ${name || lead}`));

        // 「合計」の行は施設ではなく検算用
        if (lead === "合計" || name === "合計") {
          declared = values.map((v) => v ?? 0);
          continue;
        }
        if (!name) continue;

        const category = (t.kubunByRow[ri] ?? "").trim();
        if (!category) fail(`${name}: 区分が分かりません`);
        if (!categories.includes(category)) categories.push(category);

        values.forEach((v, i) => {
          built[i] += v ?? 0;
        });
        if (seen.has(name)) fail(`施設名が重複しています: ${name}`);
        seen.add(name);
        facilities.push({
          id: name,
          name,
          w: null,
          c: categories.indexOf(category),
          vacancy: values,
        });
        research.push({ id: name, name, category });
      }
    }

    if (facilities.length === 0) fail("施設が1件も取れていません。");
    if (!declared) fail("合計行が見つかりません。検算できないため中断します。");
    if (built.some((v, i) => v !== declared![i])) {
      fail(`積み上げ [${built}] が合計行 [${declared}] と一致しません`);
    }
    console.log(`合計行との突き合わせ: 一致（${declared.join("/")}）`);
    console.log(`施設 ${facilities.length}件 / 区分 ${categories.join("・")}`);

    let previous: { asOf?: string; facilities?: unknown[]; sourceFiles?: Record<string, string> } | null = null;
    if (fs.existsSync(OUT_PATH)) {
      previous = JSON.parse(fs.readFileSync(OUT_PATH, "utf-8"));
      const before = previous?.facilities?.length ?? 0;
      if (before > 0 && facilities.length < before * MIN_FACILITY_RATIO) {
        fail(`施設数が前回（${before}件）の${MIN_FACILITY_RATIO * 100}%を下回りました（${facilities.length}件）。`);
      }
      // 自治体は基準日を変えずに資料を差し替えることがある。
      // 取り込み元の一式も同じときだけ、書き換えを見送る
      if (
        previous?.asOf === asOf &&
        JSON.stringify(previous?.sourceFiles ?? {}) === JSON.stringify({ 募集見込数: latest.url }) &&
        JSON.stringify(previous?.facilities ?? null) === JSON.stringify(facilities)
      ) {
        console.log(`\n公開日が前回と同じ（${asOf}）なので書き換えません。`);
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
      sourceFiles: { 募集見込数: latest.url },
      metrics: ["vacancy"],
      subtitle: `${reiwaToYear(ty)}年${tm}月入園ぶんの募集見込数`,
      notes: [
        `新宿区が公開しているのは「${reiwaToYear(ty)}年${tm}月に入園できる枠の見込みの人数」です。現時点の空き数ではありません。`,
        "募集見込数は前月1日現在の在園児童の状況等をもとにした見込みで、退園等によって変わることがあります。",
        "募集見込数が0人でも、空きが発生したときは利用調整が行われ内定となることがあります。",
        "「—」はそのクラスの受け入れがないことを示します。0歳児クラスは園により受入月齢が異なります。",
        "新宿区はこの数値をPDFで公開しています。当サイトは表をそのまま読み取って掲載しています。",
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
    fs.mkdirSync(path.dirname(RESEARCH_PATH), { recursive: true });
    fs.writeFileSync(
      RESEARCH_PATH,
      `${JSON.stringify({ asOf, sourceUrl: latest.url, facilities: research }, null, 1)}\n`,
      "utf-8"
    );

    const ageTotals = Array.from({ length: AGE_COUNT }, (_, age) =>
      facilities.reduce((a, f) => a + (f.vacancy[age] ?? 0), 0)
    );
    console.log(`\n書き出しました: ${path.relative(process.cwd(), OUT_PATH)}`);
    console.log(`  データ時点: ${asOf}`);
    console.log("");
    categories.forEach((c, i) => {
      const list = facilities.filter((f) => f.c === i);
      const sum = list.reduce((a, f) => a + f.vacancy.reduce((s: number, v) => s + (v ?? 0), 0), 0);
      console.log(`  ${c.padEnd(12, "　")} ${String(list.length).padStart(3)}施設 / 見込${sum}`);
    });
    console.log("");
    console.log("  年齢 | 募集見込数");
    ageTotals.forEach((v, age) => console.log(`  ${age}歳児 | ${v}`));
    console.log(`  合計 | ${ageTotals.reduce((a, b) => a + b, 0)}`);
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

main().catch((err) => fail(String(err)));
