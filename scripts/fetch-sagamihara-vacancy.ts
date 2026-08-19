/**
 * 相模原市の認定こども園・認可保育所等の利用可能人数を取り込む
 *
 * 実行: npm run vacancy:fetch:sagamihara
 *
 * ## この自治体の特徴
 * - **空欄は「クラスがない」ではなく「0人」**。相模原市の注意事項に
 *   「利用可能人数が空欄の場合は、利用可能人数は0人です」と明記されている。
 *   ただし**小規模保育事業者・事業所内保育事業者は制度上0〜2歳児が対象**なので、
 *   3歳児以上は0ではなく「クラスなし」として扱う
 * - 「若干名」と書かれる欄がある。人数が分からないので載せず、注記に出す
 * - 施設類型は括弧が全角・半角で揺れるので正規化する
 * - **管轄（緑・中央・南の子育て支援センター）の列は縦書きで、機械では復元できない**。
 *   区で分けずに載せ、区は公式PDFで確認してもらう
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "sagamihara";
const MUNICIPALITY_NAME = "相模原市";
const SOURCE_NAME = "相模原市「認定こども園・認可保育所等施設利用可能人数」";
const INDEX_URL =
  "https://www.city.sagamihara.kanagawa.jp/kosodate/1026602/kosodate/1026606/hoikuen/1006706.html";
const AGE_COUNT = 6;
/** 制度上0〜2歳児だけを受け入れる類型 */
const AGE_0_TO_2 = ["小規模保育事業者", "事業所内保育事業者", "家庭的保育事業者"];

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const EXTRACTOR = path.join(process.cwd(), "scripts", "sagamihara-pdf-extract.py");

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

/** 括弧の全角・半角を全角にそろえる */
function normalizeCategory(s: string): string {
  return squeeze(s).replace(/\(/g, "（").replace(/\)/g, "）");
}

type PdfTable = { headerRow: number; head: string[]; rows: string[][] };
type PdfResult = { asOf: number[][]; updated: number[][]; tables: PdfTable[] };

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
  console.log(`${MUNICIPALITY_NAME}の利用可能人数を取り込みます`);
  console.log(`公式ページ: ${INDEX_URL}\n`);

  const ua = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";
  const res = await fetch(INDEX_URL, { headers: { "User-Agent": ua } });
  if (!res.ok) fail(`公式ページが ${res.status} を返しました`);
  const html = await res.text();

  // 「令和8年度相模原市…施設利用可能人数（令和8年8月6日現在）（PDF 758.3 KB）」
  // 1次募集・2次募集は年度あたまの案内なので除く
  const links = [...html.matchAll(/<a[^>]+href="([^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => ({ url: new URL(m[1], INDEX_URL).toString(), text: toHalfWidth(stripTags(m[2])) }))
    .map((l) => {
      if (/募集】/.test(l.text)) return null;
      const m = l.text.match(/施設利用可能人数（令和(\d+)年(\d+)月(\d+)日現在）/);
      if (!m) return null;
      const year = reiwaToYear(Number(m[1]));
      const month = Number(m[2]);
      const day = Number(m[3]);
      return { ...l, year, month, day, sortKey: year * 10000 + month * 100 + day };
    })
    .filter((v): v is NonNullable<typeof v> => v !== null);
  if (links.length === 0) fail("利用可能人数のPDFリンクが見つかりません。ページの構成が変わった可能性があります。");
  const latest = links.reduce((a, b) => (b.sortKey > a.sortKey ? b : a));
  console.log(`最新: ${latest.text}\n  ${latest.url}`);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "sagamihara-vacancy-"));
  try {
    const r = await fetch(latest.url, { headers: { "User-Agent": ua } });
    if (!r.ok) fail(`PDFの取得に失敗しました（${r.status}）: ${latest.url}`);
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.subarray(0, 4).toString() !== "%PDF") fail(`PDFではありません: ${latest.url}`);
    const file = path.join(tmpDir, "sagamihara.pdf");
    fs.writeFileSync(file, buf);

    let pdf: PdfResult;
    try {
      pdf = JSON.parse(runPython([EXTRACTOR, file])) as PdfResult;
    } catch (err) {
      fail(`抽出結果を読めません: ${String(err)}`);
    }

    // PDFの表紙にある「令和８年８月１日現在」がデータの時点。
    // リンクの日付は更新日なので別物
    if (pdf.asOf.length !== 1) fail(`PDFに基準日が${pdf.asOf.length}種類あります`);
    const [ay, am, ad] = pdf.asOf[0];
    const asOf = `${reiwaToYear(ay)}-${String(am).padStart(2, "0")}-${String(ad).padStart(2, "0")}`;
    if (pdf.updated.length === 1) {
      const [uy, um, ud] = pdf.updated[0];
      if (reiwaToYear(uy) !== latest.year || um !== latest.month || ud !== latest.day) {
        fail(
          `PDFの更新日（${reiwaToYear(uy)}年${um}月${ud}日）がリンクの文言（${latest.year}年${latest.month}月${latest.day}日）と違います。`
        );
      }
    }
    console.log(`基準日: ${asOf}（更新: ${latest.year}年${latest.month}月${latest.day}日）`);

    const categories: string[] = [];
    const facilities: {
      id: string;
      name: string;
      w: null;
      c: number;
      vacancy: (number | null)[];
    }[] = [];
    const seenId = new Set<string>();
    const unknownCounts: string[] = [];

    for (const table of pdf.tables) {
      const head = table.head;
      const idx = {
        kubun: head.findIndex((h) => squeeze(h) === "施設類型"),
        place: head.findIndex((h) => squeeze(h) === "所在地"),
        name: head.findIndex((h) => squeeze(h) === "施設・事業者名"),
      };
      if (idx.kubun < 0 || idx.name < 0) fail(`見出しが想定と違います: ${head.join(" / ")}`);
      const ageIdx = Array.from({ length: AGE_COUNT }, (_, i) =>
        head.findIndex((h) => toHalfWidth(squeeze(h)).startsWith(`${i}歳児`))
      );
      if (ageIdx.some((i) => i < 0)) fail(`年齢の見出しが足りません: ${head.join(" / ")}`);

      let category = "";
      let place = "";
      for (const row of table.rows) {
        // 施設類型と所在地は縦に結合されていて、変わるときだけ値が入る
        if (squeeze(row[idx.kubun] ?? "")) category = normalizeCategory(row[idx.kubun]);
        if (idx.place >= 0 && squeeze(row[idx.place] ?? "")) place = squeeze(row[idx.place]);
        const name = (row[idx.name] ?? "").replace(/[　\s]+/g, " ").trim();
        if (!name) continue;
        if (squeeze(name) === "施設・事業者名") continue;
        if (!category) fail(`${name}: 施設類型が分かりません`);
        if (!categories.includes(category)) categories.push(category);

        const only02 = AGE_0_TO_2.includes(category);
        const vacancy: (number | null)[] = [];
        for (let age = 0; age < AGE_COUNT; age++) {
          const raw = squeeze(row[ageIdx[age]] ?? "");
          if (raw === "") {
            // 公式の注記「空欄の場合は0人」。ただし0〜2歳児だけの類型は3歳以上のクラスがない
            vacancy.push(only02 && age >= 3 ? null : 0);
            continue;
          }
          const t = toHalfWidth(raw);
          if (/^\d+$/.test(t)) {
            vacancy.push(Number(t));
            continue;
          }
          // 「若干名」は人数が分からないので載せない
          unknownCounts.push(`${name}（${age}歳児「${raw}」）`);
          vacancy.push(null);
        }

        const id = place ? `${place}-${name}` : name;
        if (seenId.has(id)) fail(`施設名が重複しています: ${id}`);
        seenId.add(id);
        facilities.push({ id, name, w: null, c: categories.indexOf(category), vacancy });
      }
    }

    if (facilities.length < 150) fail(`施設が${facilities.length}件しか取れていません`);

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

    const dataset = {
      municipalitySlug: MUNICIPALITY_SLUG,
      municipalityName: MUNICIPALITY_NAME,
      asOf,
      fetchedAt: todayJst(),
      sourceName: SOURCE_NAME,
      sourceUrl: INDEX_URL,
      sourceFiles: { vacancy: latest.url },
      metrics: ["vacancy"],
      notes: [
        "相模原市の注意事項のとおり、利用可能人数は現在の予定数です。実際に利用できる人数は変わることがあります。",
        "公式の表で空欄になっている欄は「0人」の意味です。今後退所者が出れば利用できるようになる場合があります。",
        "小規模保育事業者・事業所内保育事業者は0〜2歳児が対象のため、3歳児以上は「—」にしています。",
        "管轄（緑・中央・南の子育て支援センター）は公式PDFでは縦書きで示されており、機械では正しく読み取れないため、当サイトでは区で分けていません。",
        ...(unknownCounts.length > 0
          ? [`次の欄は「若干名」などと書かれていて人数が分からないため、「—」にしています: ${unknownCounts.join("、")}`]
          : []),
      ],
      wards: [],
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
    console.log(`書き出しました: ${path.relative(process.cwd(), OUT_PATH)}`);
    console.log(`  データ時点: ${asOf}`);
    console.log(`  「若干名」など人数が分からない欄: ${unknownCounts.length}件`);
    console.log("");
    for (const [i, cat] of categories.entries()) {
      console.log(`  ${cat} ${facilities.filter((f) => f.c === i).length}施設`);
    }
    console.log("");
    console.log("  年齢 | 利用可能");
    ageTotals.forEach((v, age) => console.log(`  ${age}歳児 | ${v}`));
    console.log(`  合計 | ${ageTotals.reduce((a, b) => a + b, 0)}`);
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

main().catch((err) => fail(String(err)));
