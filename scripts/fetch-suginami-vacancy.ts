/**
 * 杉並区の認可保育施設の募集予定人数を取り込む
 *
 * 実行: npm run vacancy:fetch:suginami
 *
 * ## この自治体の特徴
 * - **所在地グループ（7つ）ごとにページが分かれた1本のPDF**。3ページ目から表が始まる
 * - **園コードがある**ので施設IDに使える
 * - **区分（私立・区立・小規模・事業所・家庭的）は結合セル**で先頭行にしか入らないため引き継ぐ
 * - `－` は募集なし。空欄もそのクラスを設けていないものとして扱う
 * - 合計行が無いので、**取り込んだ値をテキスト抽出の別経路と突き合わせて検算する**
 *
 * ## 安全装置
 * 想定と1つでも違えば書き込まずに exit 1 する。
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "suginami";
const MUNICIPALITY_NAME = "杉並区";
const SOURCE_NAME = "杉並区「認可保育所等（所在地別）募集予定人数」";
const INDEX_URL = "https://www.city.suginami.tokyo.jp/s058/1068.html";
const ORIGIN = "https://www.city.suginami.tokyo.jp";
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
const EXTRACTOR = path.join(process.cwd(), "scripts", "suginami-pdf-extract.py");

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

type PdfGroup = {
  area: string;
  columns: { kubun: number; month: number; no: number; code: number; name: number; ages: number[] };
  rows: string[][];
};
type PdfResult = { asOf: number[][]; target: number[][]; groups: PdfGroup[] };

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

/** 「－」「空欄」はそのクラスの募集なし、数字は募集人数 */
function parseValue(v: string, where: string): number | null {
  const t = (v ?? "").replace(/\s/g, "");
  if (t === "" || t === "－" || t === "-" || t === "ー") return null;
  if (/^\d+$/.test(t)) return Number(t);
  fail(`${where}: 募集人数として読めません: 「${v}」`);
}

/** 所在地グループ名から先頭の丸数字と空白を落とす */
function cleanArea(s: string): string {
  return s.replace(/^[➊-➐\s]+/, "").trim();
}

async function main() {
  console.log(`${MUNICIPALITY_NAME}の認可保育施設の募集予定人数を取り込みます`);
  console.log(`公式ページ: ${INDEX_URL}\n`);

  const res = await fetch(INDEX_URL, {
    headers: { "User-Agent": "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)" },
  });
  if (!res.ok) fail(`公式ページが ${res.status} を返しました`);
  const html = await res.text();

  // 「令和8年9月入所認可保育所等（所在地別）募集予定人数（8年7月31日現在）（PDF：1,028KB）」
  const links = [...html.matchAll(/<a[^>]+href="([^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => ({
      url: m[1].startsWith("http") ? m[1] : ORIGIN + (m[1].startsWith("/") ? m[1] : `/${m[1]}`),
      text: toHalfWidth(stripTags(m[2])),
    }))
    .map((l) => {
      const m = l.text.match(/令和(\d+)年\s*(\d+)月入所\s*認可保育(?:所|施設)等/);
      if (!m) return null;
      // 二次募集など同じ月のものが複数あるので、通常の（所在地別）だけを採る
      if (!/所在地別/.test(l.text)) return null;
      if (/二次|一次/.test(l.text)) return null;
      const year = reiwaToYear(Number(m[1]));
      const month = Number(m[2]);
      return { ...l, year, month, sortKey: year * 100 + month };
    })
    .filter((v): v is NonNullable<typeof v> => v !== null);
  if (links.length === 0) fail("募集予定人数のPDFリンクが見つかりません。ページの構成が変わった可能性があります。");
  const latest = links.reduce((a, b) => (b.sortKey > a.sortKey ? b : a));
  console.log(`最新: ${latest.text}\n  ${latest.url}`);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "suginami-vacancy-"));
  try {
    const pdfRes = await fetch(latest.url, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)" },
    });
    if (!pdfRes.ok) fail(`PDFの取得に失敗しました（${pdfRes.status}）: ${latest.url}`);
    const buf = Buffer.from(await pdfRes.arrayBuffer());
    if (buf.subarray(0, 4).toString() !== "%PDF") fail(`PDFではありません: ${latest.url}`);
    const file = path.join(tmpDir, "suginami.pdf");
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
    if (pdf.target.length !== 1) fail(`PDFに募集月が${pdf.target.length}種類あります`);
    const [ty, tm] = pdf.target[0];
    if (reiwaToYear(ty) !== latest.year || tm !== latest.month) {
      fail(`PDFの募集月（${reiwaToYear(ty)}年${tm}月）がリンクの文言（${latest.year}年${latest.month}月）と違います。`);
    }
    console.log(`基準日: ${asOf} / 対象: ${reiwaToYear(ty)}年${tm}月入所の募集`);

    const wards: string[] = [];
    const categories: string[] = [];
    const facilities: { id: string; name: string; w: number; c: number; vacancy: (number | null)[] }[] = [];
    const research: { id: string; name: string; area: string; category: string; month: string; no: string }[] = [];
    const seen = new Set<string>();

    for (const g of pdf.groups) {
      const area = cleanArea(g.area);
      if (!area) fail(`所在地グループ名を読めません: ${JSON.stringify(g.area)}`);
      // 区分は縦に結合されたセルで、値は区間の途中の行にしか入らない
      // （「私立」が6行目、「区立」が28行目…のように出る）。
      // 値が現れた行を区切りにして、直前の区切りの次から次の値の直前までを同じ区分とみなす
      const marks = g.rows
        .map((r, i) => ({ i, v: (r[g.columns.kubun] ?? "").trim() }))
        .filter((x) => x.v);
      if (marks.length === 0) fail(`${area}: 区分が1つも読めません`);
      const kubunByRow: string[] = new Array(g.rows.length).fill("");
      let start = 0;
      for (const [mi, mark] of marks.entries()) {
        const end = mi + 1 < marks.length ? marks[mi + 1].i - 1 : g.rows.length - 1;
        for (let i = start; i <= end; i++) kubunByRow[i] = mark.v;
        start = end + 1;
      }
      for (const [ri, row] of g.rows.entries()) {
        const kubun = kubunByRow[ri];
        const code = row[g.columns.code] ?? "";
        if (!/^\d+$/.test(code)) continue; // 注記などの行
        const name = (row[g.columns.name] ?? "").trim();
        if (!name) fail(`${area}: 園コード${code}に保育所名がありません`);
        if (!kubun) fail(`${area} ${name}: 区分が分かりません`);
        if (!wards.includes(area)) wards.push(area);
        if (!categories.includes(kubun)) categories.push(kubun);

        const vacancy = g.columns.ages.map((i) => parseValue(row[i] ?? "", `${area} ${name}`));
        if (seen.has(code)) fail(`園コードが重複しています: ${code}（${name}）`);
        seen.add(code);
        facilities.push({
          id: code,
          name,
          w: wards.indexOf(area),
          c: categories.indexOf(kubun),
          vacancy,
        });
        research.push({
          id: code,
          name,
          area,
          category: kubun,
          month: row[g.columns.month] ?? "",
          no: row[g.columns.no] ?? "",
        });
      }
    }

    if (facilities.length === 0) fail("施設が1件も取れていません。");
    console.log(`施設 ${facilities.length}件 / 所在地グループ ${wards.length}件 / 区分 ${categories.join("・")}`);

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
        JSON.stringify(previous?.sourceFiles ?? {}) === JSON.stringify({ 募集予定人数: latest.url }) &&
        JSON.stringify(previous?.facilities ?? null) === JSON.stringify(facilities)
      ) {
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
      sourceFiles: { 募集予定人数: latest.url },
      metrics: ["vacancy"],
      subtitle: `${reiwaToYear(ty)}年${tm}月入所ぶんの募集予定人数`,
      notes: [
        `杉並区が公開しているのは「${reiwaToYear(ty)}年${tm}月に入所できる枠の募集予定人数」です。現時点の空き数ではありません。`,
        "「—」はそのクラスの募集がないことを示します。0は募集予定人数が0であることを示します。",
        "募集予定人数のほかに、在園児の退園により新たに空きが生じた場合も利用調整の対象になります。",
        "所在地のまとまり（7グループ）は出典の並びをそのまま使っています。",
        "杉並区はこの数値をPDFで公開しています。当サイトは表をそのまま読み取って掲載しています。",
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
    console.log(`\n書き出しました: ${path.relative(process.cwd(), OUT_PATH)}`);
    console.log(`  データ時点: ${asOf}`);
    console.log("");
    wards.forEach((w, i) => {
      const list = facilities.filter((f) => f.w === i);
      const sum = list.reduce((a, f) => a + f.vacancy.reduce((s: number, v) => s + (v ?? 0), 0), 0);
      console.log(`  ${w.slice(0, 22).padEnd(24, "　")} ${String(list.length).padStart(3)}施設 / 募集${sum}`);
    });
    console.log("");
    console.log("  年齢 | 募集人数");
    ageTotals.forEach((v, age) => console.log(`  ${age}歳児 | ${v}`));
    console.log(`  合計 | ${ageTotals.reduce((a, b) => a + b, 0)}`);
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

main().catch((err) => fail(String(err)));
