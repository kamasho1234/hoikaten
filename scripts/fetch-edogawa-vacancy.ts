/**
 * 江戸川区の認可保育施設の募集数を取り込む
 *
 * 実行: npm run vacancy:fetch:edogawa
 *
 * ## この自治体の特徴
 * - **1施設が2行**（受入可能数・募集数）。掲載するのは募集数のほう
 * - **「4歳・5歳」が1列**だが、募集数の行だけ4歳と5歳が分かれて入る
 * - **最終ページは「区立延長保育」の別枠**で、通常保育と同じ施設名がもう一度出てくる。
 *   IDは地区と施設名を組にして一意にする
 * - **表の末尾に合計行がある**ので、通常保育（区立延長保育を除く）の積み上げと突き合わせて検算する
 *
 * ## 安全装置
 * 想定と1つでも違えば書き込まずに exit 1 する。
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "edogawa";
const MUNICIPALITY_NAME = "江戸川区";
const SOURCE_NAME = "江戸川区「認可私立保育施設・区立保育園の定員と募集数」";
const INDEX_URL =
  "https://www.city.edogawa.tokyo.jp/e048/kosodate/kosodate/hoiku/nitijou/hoikuen/teiin_to_bosyusu.html";
const ORIGIN = "https://www.city.edogawa.tokyo.jp";
const AGE_COUNT = 6;
const MIN_FACILITY_RATIO = 0.9;
/** 出典の凡例: 施設区分：区⇒区立保育園、私⇒私立保育園、小⇒小規模保育、事⇒事業所内保育、こ⇒認定こども園 */
const KIND_LABELS: Record<string, string> = {
  区: "区立保育園",
  私: "私立保育園",
  小: "小規模保育",
  事: "事業所内保育",
  こ: "認定こども園",
};

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const RESEARCH_PATH = path.join(
  process.cwd(),
  "scripts",
  "vacancy-research",
  MUNICIPALITY_SLUG,
  "facilities_from_pdf.json"
);
const EXTRACTOR = path.join(process.cwd(), "scripts", "edogawa-pdf-extract.py");

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

type PdfFacility = {
  ward: string;
  kind: string;
  name: string;
  ages: (number | null)[];
  total: number | null;
  capacity: (number | null)[];
  capacityTotal: number | null;
};
type PdfResult = {
  pageCount: number;
  asOf: number[][];
  target: number[][];
  facilities: PdfFacility[];
  totals: PdfFacility[];
};

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
  console.log(`${MUNICIPALITY_NAME}の認可保育施設の募集数を取り込みます`);
  console.log(`公式ページ: ${INDEX_URL}\n`);

  // --- 1. ページから最新のPDFを選ぶ ---
  const res = await fetch(INDEX_URL, {
    headers: { "User-Agent": "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)" },
  });
  if (!res.ok) fail(`公式ページが ${res.status} を返しました`);
  const html = await res.text();

  const links = [...html.matchAll(/<a[^>]+href="([^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => ({
      url: m[1].startsWith("http") ? m[1] : ORIGIN + (m[1].startsWith("/") ? m[1] : `/${m[1]}`),
      text: toHalfWidth(stripTags(m[2])),
    }))
    .map((l) => {
      // 「令和8年9月入園分(令和8年8月1日現在）（PDF：828KB）」
      const m = l.text.match(/令和(\d+)年(\d+)月入園/);
      if (!m) return null;
      const year = reiwaToYear(Number(m[1]));
      const month = Number(m[2]);
      return { ...l, year, month, sortKey: year * 100 + month };
    })
    .filter((v): v is NonNullable<typeof v> => v !== null);
  if (links.length === 0) fail("入園分のPDFリンクが見つかりません。ページの構成が変わった可能性があります。");
  const latest = links.reduce((a, b) => (b.sortKey > a.sortKey ? b : a));
  console.log(`最新: ${latest.text}\n  ${latest.url}`);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "edogawa-vacancy-"));
  try {
    const pdfRes = await fetch(latest.url, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)" },
    });
    if (!pdfRes.ok) fail(`PDFの取得に失敗しました（${pdfRes.status}）: ${latest.url}`);
    const buf = Buffer.from(await pdfRes.arrayBuffer());
    if (buf.subarray(0, 4).toString() !== "%PDF") fail(`PDFではありません: ${latest.url}`);
    const file = path.join(tmpDir, "edogawa.pdf");
    fs.writeFileSync(file, buf);

    const raw = runPython([EXTRACTOR, file]);
    let pdf: PdfResult;
    try {
      pdf = JSON.parse(raw) as PdfResult;
    } catch (err) {
      fail(`抽出結果を読めません: ${String(err)}`);
    }

    // --- 2. 基準日と対象月 ---
    if (pdf.asOf.length !== 1) fail(`PDFに基準日が${pdf.asOf.length}種類あります`);
    const [ay, am, ad] = pdf.asOf[0];
    const asOf = `${ay}-${String(am).padStart(2, "0")}-${String(ad).padStart(2, "0")}`;
    if (pdf.target.length !== 1) fail(`PDFに対象月が${pdf.target.length}種類あります`);
    const [ty, tm] = pdf.target[0];
    const targetYear = reiwaToYear(ty);
    if (targetYear !== latest.year || tm !== latest.month) {
      fail(`PDFの対象月（${targetYear}年${tm}月）がリンクの文言（${latest.year}年${latest.month}月）と違います。`);
    }
    console.log(`基準日: ${asOf} / 対象: ${targetYear}年${tm}月入園の募集`);

    // --- 3. 検算（合計行との照合） ---
    if (pdf.totals.length !== 1) fail(`合計行が${pdf.totals.length}件です（1件のはず）`);
    const normal = pdf.facilities.filter((f) => f.ward !== "区立延長保育");
    const acc = Array.from({ length: AGE_COUNT }, (_, i) =>
      normal.reduce((sum, f) => sum + (f.ages[i] ?? 0), 0)
    );
    const expected = pdf.totals[0].ages.map((v) => v ?? 0);
    if (acc.join(",") !== expected.join(",")) {
      fail(`合計が合いません。積み上げ=${acc.join(",")} / PDFの合計行=${expected.join(",")}`);
    }
    console.log(`合計行と一致しました（通常保育 ${normal.length}施設・${acc.join("/")}）`);

    // --- 4. 施設に組み立てる ---
    const wards: string[] = [];
    const categories: string[] = [];
    const facilities: { id: string; name: string; w: number; c: number; vacancy: (number | null)[] }[] = [];
    const research: { id: string; name: string; ward: string; category: string; capacity: (number | null)[] }[] = [];
    const seen = new Set<string>();

    for (const f of pdf.facilities) {
      if (!f.name) fail(`施設名が空の行があります: ${JSON.stringify(f)}`);
      if (!f.ward) fail(`${f.name}: 地区がありません`);
      const label = KIND_LABELS[f.kind];
      if (!label) fail(`${f.name}: 施設区分「${f.kind}」が凡例にありません`);
      if (!wards.includes(f.ward)) wards.push(f.ward);
      if (!categories.includes(label)) categories.push(label);
      // 区立延長保育には通常保育と同じ施設名が出てくるので、地区と組にして一意にする
      const id = `${f.ward}/${f.name}`;
      if (seen.has(id)) fail(`施設IDが重複しています: ${id}`);
      seen.add(id);
      facilities.push({
        id,
        name: f.name,
        w: wards.indexOf(f.ward),
        c: categories.indexOf(label),
        vacancy: f.ages,
      });
      research.push({ id, name: f.name, ward: f.ward, category: label, capacity: f.capacity });
    }

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
        JSON.stringify(previous?.sourceFiles ?? {}) === JSON.stringify({ 定員と募集数: latest.url })
      ) {
        console.log(`\n基準日が前回と同じ（${asOf}）なので書き換えません。`);
        return;
      }
    }

    // --- 5. 書き出し ---
    const dataset = {
      municipalitySlug: MUNICIPALITY_SLUG,
      municipalityName: MUNICIPALITY_NAME,
      asOf,
      fetchedAt: todayJst(),
      sourceName: SOURCE_NAME,
      sourceUrl: INDEX_URL,
      sourceFiles: { 定員と募集数: latest.url },
      metrics: ["vacancy"],
      subtitle: `${targetYear}年${tm}月入園ぶんの募集数`,
      notes: [
        `江戸川区が公開しているのは「${targetYear}年${tm}月に入園できる枠の募集数」です。現時点の空き数ではありません。`,
        "「—」はそのクラスを設けていないことを示します。0は募集数が0であることを示します。",
        "募集数が0の保育施設も申し込みができます（公表後に空きが出ることがあります）。",
        "「区立延長保育」は通常の保育とは別枠の募集です。同じ園が通常の枠と延長保育の枠の両方に出てきます。",
        "江戸川区はこの数値をPDFで公開しています。当サイトは表をそのまま読み取って掲載しています。",
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
    console.log(`  施設数: ${facilities.length}`);
    console.log(`  区分: ${categories.join("・")}`);
    console.log("");
    wards.forEach((w, i) => {
      const list = facilities.filter((f) => f.w === i);
      const sum = list.reduce((a, f) => a + f.vacancy.reduce((s: number, v) => s + (v ?? 0), 0), 0);
      console.log(`  ${w.padEnd(12, "　")} ${String(list.length).padStart(3)}施設 / 募集${sum}`);
    });
    console.log("");
    console.log("  年齢 | 募集数");
    ageTotals.forEach((v, age) => console.log(`  ${age}歳児 | ${v}`));
    console.log(`  合計 | ${ageTotals.reduce((a, b) => a + b, 0)}`);
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

main().catch((err) => fail(String(err)));
