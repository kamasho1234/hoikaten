/**
 * 日野市の保育施設の入所可能人数を取り込む
 *
 * 実行: npm run vacancy:fetch:hino
 *
 * ## この自治体の特徴
 * - 一覧は月ごとの子ページにぶら下がるPDF。トップの一覧から新しい月のページを1段たどる
 * - 列は「地区／区分／施設名／0歳…5歳／合計」。**地区と区分はどちらも縦に結合**されていて、
 *   変わるときだけ値が入る
 * - **各行に「合計」列がある**ので、年齢別の積み上げと1施設ずつ突き合わせて検算できる
 * - 「-」はそのクラスの受け入れがない、0は空きなし
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "hino";
const MUNICIPALITY_NAME = "日野市";
const SOURCE_NAME = "日野市「保育施設入所可能人数」";
const INDEX_URL = "https://www.city.hino.lg.jp/kosodate/1028734/1029177/1029282/index.html";
const AGE_COUNT = 6;

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const EXTRACTOR = path.join(process.cwd(), "scripts", "hino-pdf-extract.py");

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

function stripTags(html: string): string {
  return html.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();
}

function squeeze(s: string): string {
  return (s ?? "").replace(/[\s　]/g, "");
}

/** 「-」はそのクラスの受け入れがない */
function parseValue(raw: string, where: string): number | null {
  const t = toHalfWidth(squeeze(raw));
  if (t === "" || t === "-" || t === "－" || t === "―") return null;
  if (/^\d+$/.test(t)) return Number(t);
  fail(`${where}: 人数として読めません: 「${raw}」`);
}

type PdfTable = { head: string[]; rows: string[][] };
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

async function main() {
  console.log(`${MUNICIPALITY_NAME}の入所可能人数を取り込みます`);
  console.log(`公式ページ: ${INDEX_URL}\n`);

  const ua = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";
  const res = await fetch(INDEX_URL, { headers: { "User-Agent": ua } });
  if (!res.ok) fail(`公式ページが ${res.status} を返しました`);
  const html = await res.text();

  // 「令和8年9月保育施設入所可能人数」の月別ページを1段たどる。4月は2次募集がある
  const monthly = [...html.matchAll(/<a[^>]+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => ({ url: new URL(m[1], INDEX_URL).toString(), text: toHalfWidth(stripTags(m[2])) }))
    .map((l) => {
      const m = l.text.match(/令和(\d+)年度?(\d+)月保育施設入所可能人数/);
      if (!m) return null;
      const year = reiwaToYear(Number(m[1]));
      const month = Number(m[2]);
      return { ...l, year, month, sortKey: year * 100 + month };
    })
    .filter((v): v is NonNullable<typeof v> => v !== null);
  if (monthly.length === 0) fail("月別の入所可能人数ページが見つかりません。ページの構成が変わった可能性があります。");
  const latestPage = monthly.reduce((a, b) => (b.sortKey > a.sortKey ? b : a));
  console.log(`最新: ${latestPage.text}\n  ${latestPage.url}`);

  const pageRes = await fetch(latestPage.url, { headers: { "User-Agent": ua } });
  if (!pageRes.ok) fail(`月別ページが ${pageRes.status} を返しました`);
  const pageHtml = await pageRes.text();
  const pdfs = [...pageHtml.matchAll(/<a[^>]+href="([^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => ({ url: new URL(m[1], latestPage.url).toString(), text: toHalfWidth(stripTags(m[2])) }))
    .filter((l) => /入所可能人数/.test(l.text));
  if (pdfs.length !== 1) {
    fail(`入所可能人数のPDFが${pdfs.length}本あります（1本のはず）: ${pdfs.map((p) => p.text).join(" / ")}`);
  }
  const latest = pdfs[0];
  console.log(`  ${latest.text}\n    ${latest.url}`);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "hino-vacancy-"));
  try {
    const r = await fetch(latest.url, { headers: { "User-Agent": ua } });
    if (!r.ok) fail(`PDFの取得に失敗しました（${r.status}）: ${latest.url}`);
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.subarray(0, 4).toString() !== "%PDF") fail(`PDFではありません: ${latest.url}`);
    const file = path.join(tmpDir, "hino.pdf");
    fs.writeFileSync(file, buf);

    let pdf: PdfResult;
    try {
      pdf = JSON.parse(runPython([EXTRACTOR, file])) as PdfResult;
    } catch (err) {
      fail(`抽出結果を読めません: ${String(err)}`);
    }

    if (pdf.target.length !== 1) fail(`PDFに対象月が${pdf.target.length}種類あります`);
    const [ty, tm] = pdf.target[0];
    if (reiwaToYear(ty) !== latestPage.year || tm !== latestPage.month) {
      fail(`PDFの対象月（${reiwaToYear(ty)}年${tm}月）がページの文言と違います。`);
    }
    if (pdf.asOf.length !== 1) fail(`PDFに基準日が${pdf.asOf.length}種類あります`);
    const [am, ad] = pdf.asOf[0];
    // 基準日は「7/25時点」と月日だけ。対象月の前月ぶんなので対象年をそのまま使う
    const asOf = `${latestPage.year}-${String(am).padStart(2, "0")}-${String(ad).padStart(2, "0")}`;
    console.log(`基準日: ${asOf} / 対象: ${latestPage.year}年${latestPage.month}月入所`);

    const wards: string[] = [];
    const categories: string[] = [];
    const facilities: {
      id: string;
      name: string;
      w: number;
      c: number;
      vacancy: (number | null)[];
    }[] = [];
    const seenId = new Set<string>();
    let rowTotalChecks = 0;
    let area = "";
    let category = "";

    for (const table of pdf.tables) {
      const head = table.head.map((h) => squeeze(h));
      const kubunIdx = head.indexOf("区分");
      const nameIdx = head.indexOf("施設名");
      if (kubunIdx < 0 || nameIdx < 0) fail(`見出しが想定と違います: ${table.head.join(" / ")}`);
      const ageIdx = Array.from({ length: AGE_COUNT }, (_, i) =>
        head.findIndex((h) => toHalfWidth(h) === `${i}歳`)
      );
      if (ageIdx.some((i) => i < 0)) fail(`年齢の見出しが足りません: ${table.head.join(" / ")}`);
      const totalIdx = head.indexOf("合計");
      // 地区は区分の左の列
      const areaIdx = kubunIdx - 1;

      for (const row of table.rows) {
        // 地区と区分はどちらも縦に結合されていて、変わるときだけ値が入る
        if (areaIdx >= 0 && squeeze(row[areaIdx] ?? "")) area = squeeze(row[areaIdx]);
        if (squeeze(row[kubunIdx] ?? "")) category = squeeze(row[kubunIdx]);
        const name = (row[nameIdx] ?? "").replace(/[　\s]+/g, "").trim();
        if (!name) continue;
        if (squeeze(name) === "施設名") continue;
        if (!area) fail(`${name}: 地区が分かりません`);
        if (!category) fail(`${name}: 区分が分かりません`);
        if (!wards.includes(area)) wards.push(area);
        if (!categories.includes(category)) categories.push(category);

        const vacancy = ageIdx.map((c) => parseValue(row[c] ?? "", `日野市 ${name}`));
        if (totalIdx >= 0) {
          const declared = parseValue(row[totalIdx] ?? "", `日野市 ${name}（合計）`);
          const sum = vacancy.reduce((a: number, v) => a + (v ?? 0), 0);
          if (declared !== null && declared !== sum) {
            fail(`${name}: 「合計」が${declared}なのに年齢別の合計が${sum}です`);
          }
          if (declared !== null) rowTotalChecks++;
        }

        const id = `${area}-${name}`;
        if (seenId.has(id)) fail(`施設名が重複しています: ${id}`);
        seenId.add(id);
        facilities.push({
          id,
          name,
          w: wards.indexOf(area),
          c: categories.indexOf(category),
          vacancy,
        });
      }
    }

    if (facilities.length < 30) fail(`施設が${facilities.length}件しか取れていません`);

    const previous = fs.existsSync(OUT_PATH)
      ? (JSON.parse(fs.readFileSync(OUT_PATH, "utf-8")) as { asOf?: string; facilities?: unknown[]; sourceFiles?: Record<string, string> })
      : null;
    if (previous?.facilities && facilities.length < previous.facilities.length * 0.9) {
      fail(
        `施設数が大きく減っています（前回 ${previous.facilities.length}件 → 今回 ${facilities.length}件）`
      );
    }
    // 自治体は基準日を変えずに資料を差し替えることがある。
    // 取り込み元のURLも同じときだけ、書き換えを見送る
    if (
      previous?.asOf === asOf &&
      previous?.sourceFiles?.vacancy === latest.url &&
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
      sourceUrl: latestPage.url,
      sourceFiles: { vacancy: latest.url },
      metrics: ["vacancy"],
      subtitle: `${latestPage.year}年${latestPage.month}月入所の入所可能人数`,
      notes: [
        "日野市が公表している入所可能人数です。その後の入退所により変わることがあります。",
        "「—」はそのクラスの受け入れがないことを示します。",
      ],
      wards,
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
    console.log(`書き出しました: ${path.relative(process.cwd(), OUT_PATH)}`);
    console.log(`  行の「合計」との突き合わせ: ${rowTotalChecks}件すべて一致`);
    console.log("");
    for (const [i, wd] of wards.entries()) {
      console.log(`  ${wd} ${facilities.filter((f) => f.w === i).length}施設`);
    }
    console.log("");
    for (const [i, cat] of categories.entries()) {
      console.log(`  ${cat} ${facilities.filter((f) => f.c === i).length}施設`);
    }
    console.log("");
    console.log("  年齢 | 入所可能");
    ageTotals.forEach((v, age) => console.log(`  ${age}歳児 | ${v}`));
    console.log(`  合計 | ${ageTotals.reduce((a, b) => a + b, 0)}`);
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

main().catch((err) => fail(String(err)));
