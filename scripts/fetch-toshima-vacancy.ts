/**
 * 豊島区の保育園欠員状況を取り込む
 *
 * 実行: npm run vacancy:fetch:toshima
 *
 * ## この自治体の特徴
 * - **本文の【区立保育園】【私立保育園】【地域型保育事業】【居宅訪問型保育事業】が施設類型**。
 *   表の上端より上にある直近の見出しで判定する（私立は2ページにまたがり見出しが無いページがある）
 * - **№が連番**なので、類型ごとに1から通しで並んでいることを検算に使う
 * - 列数は類型で違う（区立12列・私立11列・地域型8列）。地域型と居宅訪問型は0〜2歳のみ
 * - 数値はそのまま欠員数。空欄はそのクラスの受け入れがない
 * - 地区で分けていないので wards は空。施設コードが無いので施設名をIDにする
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "toshima";
const MUNICIPALITY_NAME = "豊島区";
const SOURCE_NAME = "豊島区「保育園欠員状況」";
const INDEX_URL =
  "https://www.city.toshima.lg.jp/260/kosodate/kosodate/hoikuen/nyuen/1809261402.html";
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
const EXTRACTOR = path.join(process.cwd(), "scripts", "toshima-pdf-extract.py");

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
  section: string;
  columns: {
    no: number | null;
    name: number;
    address: number | null;
    ages: number[];
  };
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

/**
 * 空欄はそのクラスの受け入れなし、数字は欠員数。
 *
 * **居宅訪問型保育事業は欠員数の代わりに「調整中」と書かれる**（利用者の自宅で保育するため
 * 園のような空き枠の概念がない）。数値が無いものとして null にする。
 */
function parseValue(v: string, where: string): number | null {
  const t = toHalfWidth((v ?? "").replace(/\s/g, "")).replace(/,/g, "");
  if (t === "" || t === "-" || t === "－" || t === "調整中") return null;
  if (/^\d+$/.test(t)) return Number(t);
  fail(`${where}: 欠員数として読めません: 「${v}」`);
}

async function main() {
  console.log(`${MUNICIPALITY_NAME}の募集見込数を取り込みます`);
  console.log(`公式ページ: ${INDEX_URL}\n`);

  const ua = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";
  const res = await fetch(INDEX_URL, { headers: { "User-Agent": ua } });
  if (!res.ok) fail(`公式ページが ${res.status} を返しました`);
  const indexHtml = await res.text();

  // **一覧ページからは月ごとのページへ1段たどる**
  //（「保育園欠員状況（令和8年9月入園選考分）」→ そのページにPDFがある）
  const monthPages = [...indexHtml.matchAll(/<a[^>]+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => ({ href: m[1], text: toHalfWidth(stripTags(m[2])) }))
    .map((l) => {
      const m = l.text.match(/保育園欠員状況（令和(\d+)年(\d+)月(?:(\d)次)?入園選考分/);
      if (!m) return null;
      const year = reiwaToYear(Number(m[1]));
      const month = Number(m[2]);
      const round = Number(m[3] ?? 1);
      return { ...l, year, month, round, sortKey: year * 10000 + month * 100 + round };
    })
    .filter((v): v is NonNullable<typeof v> => v !== null);
  if (monthPages.length === 0) fail("欠員状況の月別ページが見つかりません。ページの構成が変わった可能性があります。");
  const latestPage = monthPages.reduce((a, b) => (b.sortKey > a.sortKey ? b : a));
  const monthUrl = new URL(latestPage.href, INDEX_URL).toString();
  console.log(`月別ページ: ${latestPage.text}\n  ${monthUrl}`);

  const monthRes = await fetch(monthUrl, { headers: { "User-Agent": ua } });
  if (!monthRes.ok) fail(`月別ページが ${monthRes.status} を返しました`);
  const html = await monthRes.text();

  // 「欠員状況（令和8年9月入園選考分・令和8年8月3日更新分）」。
  // 終了した号には【終了】が付くので除く。4月は1次・2次があるので次数も見る
  const links = [...html.matchAll(/<a[^>]+href="([^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => ({
      url: new URL(m[1], monthUrl).toString(),
      text: toHalfWidth(stripTags(m[2])),
    }))
    .map((l) => {
      const m = l.text.match(/欠員状況（令和(\d+)年(\d+)月(?:(\d)次)?入園選考分/);
      if (!m) return null;
      if (/【終了】/.test(l.text)) return null;
      const year = reiwaToYear(Number(m[1]));
      const month = Number(m[2]);
      const round = Number(m[3] ?? 1);
      return { ...l, year, month, round, sortKey: year * 10000 + month * 100 + round };
    })
    .filter((v): v is NonNullable<typeof v> => v !== null);
  if (links.length === 0) fail("欠員状況のPDFリンクが見つかりません。ページの構成が変わった可能性があります。");
  const latest = links.reduce((a, b) => (b.sortKey > a.sortKey ? b : a));
  console.log(`最新: ${latest.text}\n  ${latest.url}`);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "toshima-vacancy-"));
  try {
    const pdfRes = await fetch(latest.url, { headers: { "User-Agent": ua } });
    if (!pdfRes.ok) fail(`PDFの取得に失敗しました（${pdfRes.status}）: ${latest.url}`);
    const buf = Buffer.from(await pdfRes.arrayBuffer());
    if (buf.subarray(0, 4).toString() !== "%PDF") fail(`PDFではありません: ${latest.url}`);
    const file = path.join(tmpDir, "toshima.pdf");
    fs.writeFileSync(file, buf);

    const raw = runPython([EXTRACTOR, file]);
    let pdf: PdfResult;
    try {
      pdf = JSON.parse(raw) as PdfResult;
    } catch (err) {
      fail(`抽出結果を読めません: ${String(err)}`);
    }

    if (pdf.asOf.length !== 1) fail(`PDFに更新日が${pdf.asOf.length}種類あります`);
    const [ay, am, ad] = pdf.asOf[0];
    const asOf = `${reiwaToYear(ay)}-${String(am).padStart(2, "0")}-${String(ad).padStart(2, "0")}`;
    if (pdf.target.length !== 1) fail(`PDFに対象月が${pdf.target.length}種類あります`);
    const [ty, tm] = pdf.target[0];
    if (reiwaToYear(ty) !== latest.year || tm !== latest.month) {
      fail(`PDFの対象月（${reiwaToYear(ty)}年${tm}月）がリンクの文言（${latest.year}年${latest.month}月）と違います。`);
    }
    console.log(`更新日: ${asOf} / 対象: ${reiwaToYear(ty)}年${tm}月入園選考分`);

    const categories: string[] = [];
    const facilities: { id: string; name: string; w: null; c: number; vacancy: (number | null)[] }[] =
      [];
    const research: { id: string; name: string; category: string; address: string }[] = [];
    const seen = new Set<string>();
    // 類型ごとに № が1から通しで並ぶ。飛びや重複がないかを検算に使う
    const numbersBySection = new Map<string, number[]>();

    for (const t of pdf.tables) {
      const category = t.section.replace(/\s/g, "");
      if (!category) fail("施設類型の見出しが読めません");
      if (!categories.includes(category)) categories.push(category);

      for (const row of t.rows) {
        const name = (row[t.columns.name] ?? "").trim();
        if (!name) continue;
        const values = t.columns.ages.map((i) => parseValue(row[i] ?? "", `${category} ${name}`));
        // 0〜2歳しかない類型は3〜5歳を「クラスなし」で埋める
        const vacancy: (number | null)[] =
          values.length === AGE_COUNT
            ? values
            : [...values, ...new Array(AGE_COUNT - values.length).fill(null)];

        if (t.columns.no !== null) {
          const raw = toHalfWidth((row[t.columns.no] ?? "").replace(/\s/g, ""));
          if (/^\d+$/.test(raw)) {
            const list = numbersBySection.get(category) ?? [];
            list.push(Number(raw));
            numbersBySection.set(category, list);
          }
        }

        if (seen.has(name)) fail(`施設名が重複しています: ${name}`);
        seen.add(name);
        facilities.push({
          id: name,
          name,
          w: null,
          c: categories.indexOf(category),
          vacancy,
        });
        research.push({
          id: name,
          name,
          category,
          address: t.columns.address === null ? "" : (row[t.columns.address] ?? "").trim(),
        });
      }
    }

    if (facilities.length === 0) fail("施設が1件も取れていません。");

    // --- № が1からの連番になっているか（行の取りこぼし・重複の検出） ---
    for (const [category, numbers] of numbersBySection) {
      const sorted = [...numbers].sort((a, b) => a - b);
      const expected = Array.from({ length: sorted.length }, (_, i) => i + 1);
      if (sorted.length !== expected.length || sorted.some((v, i) => v !== expected[i])) {
        fail(`${category}: № が1からの連番になっていません（${sorted.join(",")}）`);
      }
      const count = facilities.filter((f) => categories[f.c] === category).length;
      if (count !== numbers.length) {
        fail(`${category}: 施設数(${count})と №の数(${numbers.length}) が合いません`);
      }
    }
    console.log(
      `№の連番チェック: ${[...numbersBySection].map(([k, v]) => `${k}=1〜${v.length}`).join(" / ")}`
    );
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
        JSON.stringify(previous?.sourceFiles ?? {}) === JSON.stringify({ 欠員状況: latest.url }) &&
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
      sourceFiles: { 欠員状況: latest.url },
      metrics: ["vacancy"],
      subtitle: `${reiwaToYear(ty)}年${tm}月入園選考ぶんの欠員数`,
      notes: [
        `豊島区が公開しているのは「${reiwaToYear(ty)}年${tm}月入園の選考に使う欠員数」です。現時点の空き数ではありません。`,
        "更新時点で判明している内定辞退や退園を反映した数値で、予告なく変更されることがあります。",
        "「—」はそのクラスの受け入れがないことを示します。0は欠員がないことを示します。",
        "地域型保育事業と居宅訪問型保育事業は0〜2歳児のみの受け入れです。",
        "私立保育園・地域型保育事業の延長保育の欠員は各園にお問い合わせください。",
        "居宅訪問型保育事業は利用者の自宅で保育するため、欠員数は「調整中」として公表されます（当サイトでは「—」と表示しています）。",
        "豊島区はこの数値をPDFで公開しています。当サイトは表をそのまま読み取って掲載しています。",
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
      console.log(`  ${c.padEnd(12, "　")} ${String(list.length).padStart(3)}施設 / 欠員${sum}`);
    });
    console.log("");
    console.log("  年齢 | 欠員数");
    ageTotals.forEach((v, age) => console.log(`  ${age}歳児 | ${v}`));
    console.log(`  合計 | ${ageTotals.reduce((a, b) => a + b, 0)}`);
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

main().catch((err) => fail(String(err)));
