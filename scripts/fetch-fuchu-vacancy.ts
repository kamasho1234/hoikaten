/**
 * 府中市（東京都）の保育所等の受入予定人数を取り込む
 *
 * 実行: npm run vacancy:fetch:fuchu
 *
 * ## この自治体の特徴
 * - 列は「保育所等名／0歳児…5歳児／計」の素直な作り
 * - **施設の種類（公立・私立ほか）は左端の縦書き**で、変わるときだけ値が入る
 * - **各行に「計」の列がある**ので、年齢別の積み上げと1施設ずつ突き合わせて検算できる
 * - 「-」はそのクラスの受け入れがない、0は受入予定なし
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "fuchu";
const MUNICIPALITY_NAME = "府中市";
const SOURCE_NAME = "府中市「保育所等の受入予定人数（空き情報）」";
const INDEX_URL = "https://www.city.fuchu.tokyo.jp/kosodate/shussan/hoikujo/ukeireyotei.html";
const AGE_COUNT = 6;

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const EXTRACTOR = path.join(process.cwd(), "scripts", "fuchu-pdf-extract.py");

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

/**
 * 「-」はそのクラスの受け入れがない。
 * **「0（1）」の括弧内はすくすく保育（障害児等保育）のクラスの人数**（公式の注記(3)）。
 * 一般の受入予定人数は括弧の外の数なので、そちらを採り、括弧内は注記に回す。
 */
function parseValue(raw: string, where: string): { value: number | null; special: number | null } {
  const t = toHalfWidth(squeeze(raw));
  if (t === "" || t === "-" || t === "－" || t === "―") return { value: null, special: null };
  if (/^\d+$/.test(t)) return { value: Number(t), special: null };
  const m = t.match(/^(\d+)[（(](\d+)[)）]$/);
  if (m) return { value: Number(m[1]), special: Number(m[2]) };
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
  console.log(`${MUNICIPALITY_NAME}の受入予定人数を取り込みます`);
  console.log(`公式ページ: ${INDEX_URL}\n`);

  const ua = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";
  const res = await fetch(INDEX_URL, { headers: { "User-Agent": ua } });
  if (!res.ok) fail(`公式ページが ${res.status} を返しました`);
  const html = await res.text();

  // 「令和8年度9月入所受入予定人数 （PDF：152KB）」。4月は1次・2次・あっせんがあるので除く
  const links = [...html.matchAll(/<a[^>]+href="([^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => ({ url: new URL(m[1], INDEX_URL).toString(), text: toHalfWidth(stripTags(m[2])) }))
    .map((l) => {
      const m = l.text.match(/^令和(\d+)年度(\d+)月入所受入予定人数/);
      if (!m) return null;
      const fiscalYear = reiwaToYear(Number(m[1]));
      const month = Number(m[2]);
      const year = month <= 3 ? fiscalYear + 1 : fiscalYear;
      return { ...l, year, month, sortKey: year * 100 + month };
    })
    .filter((v): v is NonNullable<typeof v> => v !== null);
  if (links.length === 0) fail("受入予定人数のPDFが見つかりません。ページの構成が変わった可能性があります。");
  const latest = links.reduce((a, b) => (b.sortKey > a.sortKey ? b : a));
  console.log(`最新: ${latest.text}\n  ${latest.url}`);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "fuchu-vacancy-"));
  try {
    const r = await fetch(latest.url, { headers: { "User-Agent": ua } });
    if (!r.ok) fail(`PDFの取得に失敗しました（${r.status}）: ${latest.url}`);
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.subarray(0, 4).toString() !== "%PDF") fail(`PDFではありません: ${latest.url}`);
    const file = path.join(tmpDir, "fuchu.pdf");
    fs.writeFileSync(file, buf);

    let pdf: PdfResult;
    try {
      pdf = JSON.parse(runPython([EXTRACTOR, file])) as PdfResult;
    } catch (err) {
      fail(`抽出結果を読めません: ${String(err)}`);
    }

    if (pdf.target.length !== 1) fail(`PDFに入所月が${pdf.target.length}種類あります`);
    const [ty, tm] = pdf.target[0];
    if (reiwaToYear(ty) !== latest.year && reiwaToYear(ty) + 1 !== latest.year) {
      fail(`PDFの年度（令和${ty}年度）がリンクの文言（${latest.year}年${latest.month}月）と合いません。`);
    }
    if (tm !== latest.month) {
      fail(`PDFの入所月（${tm}月）がリンクの文言（${latest.month}月）と違います。`);
    }
    if (pdf.asOf.length !== 1) fail(`PDFに基準日が${pdf.asOf.length}種類あります`);
    const [ay, am, ad] = pdf.asOf[0];
    const asOf = `${reiwaToYear(ay)}-${String(am).padStart(2, "0")}-${String(ad).padStart(2, "0")}`;
    console.log(`基準日: ${asOf} / 対象: ${latest.year}年${latest.month}月入所`);

    const categories: string[] = [];
    const facilities: {
      id: string;
      name: string;
      w: null;
      c: number;
      vacancy: (number | null)[];
    }[] = [];
    const seenId = new Set<string>();
    let rowTotalChecks = 0;
    const specialClasses: string[] = [];
    let category = "";

    for (const table of pdf.tables) {
      const head = table.head.map((h) => squeeze(h));
      const nameIdx = head.findIndex((h) => h === "保育所等名");
      if (nameIdx < 0) fail(`保育所等名の列が分かりません: ${table.head.join(" / ")}`);
      const ageIdx = Array.from({ length: AGE_COUNT }, (_, i) =>
        head.findIndex((h) => toHalfWidth(h) === `${i}歳児`)
      );
      if (ageIdx.some((i) => i < 0)) fail(`年齢の見出しが足りません: ${table.head.join(" / ")}`);
      const totalIdx = head.indexOf("計");

      for (const row of table.rows) {
        // 施設の種類は左端の縦書き。変わるときだけ値が入る
        if (squeeze(row[0] ?? "")) category = squeeze(row[0]);
        const name = (row[nameIdx + 1] ?? "").replace(/[　\s]+/g, "").trim();
        if (!name) continue;
        if (squeeze(name) === "計" || squeeze(name) === "合計") continue;
        if (!category) fail(`${name}: 施設の種類が分かりません`);
        if (!categories.includes(category)) categories.push(category);

        const vacancy: (number | null)[] = [];
        let specialSum = 0;
        for (const [age, c] of ageIdx.entries()) {
          const p = parseValue(row[c] ?? "", `府中市 ${name}`);
          if (p.special !== null) {
            specialSum += p.special;
            specialClasses.push(`${name}（${age}歳児 ${p.special}人）`);
          }
          vacancy.push(p.value);
        }
        if (totalIdx >= 0) {
          const t = parseValue(row[totalIdx] ?? "", `府中市 ${name}（計）`);
          const sum = vacancy.reduce((a: number, v) => a + (v ?? 0), 0);
          // 「計」にはすくすく保育のぶんも入っている
          const expected = sum + specialSum;
          if (t.value !== null && t.value !== expected) {
            fail(`${name}: 「計」が${t.value}なのに年齢別の合計が${expected}です`);
          }
          if (t.value !== null) rowTotalChecks++;
        }

        const id = `${category}-${name}`;
        if (seenId.has(id)) fail(`施設名が重複しています: ${id}`);
        seenId.add(id);
        facilities.push({ id, name, w: null, c: categories.indexOf(category), vacancy });
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
      sourceUrl: INDEX_URL,
      sourceFiles: { vacancy: latest.url },
      metrics: ["vacancy"],
      subtitle: `${latest.year}年${latest.month}月入所の受入予定人数`,
      notes: [
        "府中市が公表している受入予定人数です。今後の状況により変わることがあります。",
        "「—」はそのクラスの受け入れがないことを示します。",
        "受入予定人数が表示されていない場合でも申し込むことはできます。",
        ...(specialClasses.length > 0
          ? [
              `次のクラスにはすくすく保育（障害児等保育）の枠が別にあります。当サイトの人数には含めていません: ${specialClasses.join("、")}`,
            ]
          : []),
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
    console.log(`書き出しました: ${path.relative(process.cwd(), OUT_PATH)}`);
    console.log(`  行の「計」との突き合わせ: ${rowTotalChecks}件すべて一致`);
    console.log(`  すくすく保育（障害児等保育）の枠: ${specialClasses.length}クラス`);
    console.log("");
    for (const [i, cat] of categories.entries()) {
      console.log(`  ${cat} ${facilities.filter((f) => f.c === i).length}施設`);
    }
    console.log("");
    console.log("  年齢 | 受入予定");
    ageTotals.forEach((v, age) => console.log(`  ${age}歳児 | ${v}`));
    console.log(`  合計 | ${ageTotals.reduce((a, b) => a + b, 0)}`);
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

main().catch((err) => fail(String(err)));
