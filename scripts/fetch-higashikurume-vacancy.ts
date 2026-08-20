/**
 * 東久留米市の認可保育施設の空き状況（受入れ予定数）を取り込む
 *
 * 実行: npm run vacancy:fetch:higashikurume
 *
 * ## この自治体の特徴
 * - 1ページめが認可保育所（0〜5歳）、2ページめが小規模保育施設・家庭的保育施設（0〜2歳）
 * - **空欄は受入予定がないこと**。市の認可保育所一覧ではどの園も「保育年齢：0歳〜5歳」と
 *   書かれていて、空欄の年齢もクラス自体はあるため0として読む
 *   （小規模・家庭的の表はそもそも3〜5歳の列がないので、そちらは「クラスなし」）
 * - 合計行はないので、行ごとに「年齢の和＝計」を確かめる。あわせて同じページで公開している
 *   施設別入所申込者数のPDFから**区分ごとの施設数**を数えて突き合わせ、取りこぼしを防ぐ
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "higashikurume";
const MUNICIPALITY_NAME = "東久留米市";
const SOURCE_NAME = "東久留米市「認可保育施設空き状況」";
const INDEX_URL = "https://www.city.higashikurume.lg.jp/kurashi/kosodate/hoiku/1003562.html";
const AGE_COUNT = 6;

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const EXTRACTOR = path.join(process.cwd(), "scripts", "higashikurume-pdf-extract.py");

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

type PdfTable = { head: string[]; rows: string[][] };
type PdfResult = {
  asOf: number[][];
  target: number[][];
  tables: PdfTable[];
  /** 入所申込者数のPDFから数えた、区分ごとの施設数 */
  sectionCounts: number[];
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

type Link = { url: string; text: string; year: number; month: number; sortKey: number };

function findLink(html: string, pattern: RegExp, what: string): Link {
  const links = [...html.matchAll(/<a[^>]+href="([^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => ({ url: new URL(m[1], INDEX_URL).toString(), text: toHalfWidth(stripTags(m[2])) }))
    .map((l) => {
      const m = l.text.match(pattern);
      if (!m) return null;
      const year = reiwaToYear(Number(m[1]));
      const month = Number(m[2]);
      return { ...l, year, month, sortKey: year * 100 + month };
    })
    .filter((v): v is Link => v !== null);
  if (links.length === 0) fail(`${what}のPDFが見つかりません。ページの構成が変わった可能性があります。`);
  return links.reduce((a, b) => (b.sortKey > a.sortKey ? b : a));
}

async function main() {
  console.log(`${MUNICIPALITY_NAME}の空き状況を取り込みます`);
  console.log(`公式ページ: ${INDEX_URL}\n`);

  const ua = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";
  const res = await fetch(INDEX_URL, { headers: { "User-Agent": ua } });
  if (!res.ok) fail(`公式ページが ${res.status} を返しました`);
  const html = await res.text();

  // 「令和8年9月1日付　認可保育施設空き状況表 （PDF 163.7 KB）」
  const latest = findLink(html, /^令和(\d+)年(\d+)月\d+日付\s*認可保育施設空き状況表/, "空き状況");
  // 「令和8年8月1日付　認可保育施設別入所申込者数」。施設数の突き合わせにだけ使う
  const applicants = findLink(html, /^令和(\d+)年(\d+)月\d+日付\s*認可保育施設別入所申込者数/, "入所申込者数");
  console.log(`最新: ${latest.text}\n  ${latest.url}`);
  console.log(`検算用: ${applicants.text}\n  ${applicants.url}`);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "higashikurume-vacancy-"));
  try {
    const files: string[] = [];
    for (const [name, link] of [
      ["vacancy", latest],
      ["applicants", applicants],
    ] as const) {
      const r = await fetch(link.url, { headers: { "User-Agent": ua } });
      if (!r.ok) fail(`PDFの取得に失敗しました（${r.status}）: ${link.url}`);
      const buf = Buffer.from(await r.arrayBuffer());
      if (buf.subarray(0, 4).toString() !== "%PDF") fail(`PDFではありません: ${link.url}`);
      const file = path.join(tmpDir, `${name}.pdf`);
      fs.writeFileSync(file, buf);
      files.push(file);
    }

    let pdf: PdfResult;
    try {
      pdf = JSON.parse(runPython([EXTRACTOR, ...files])) as PdfResult;
    } catch (err) {
      fail(`抽出結果を読めません: ${String(err)}`);
    }

    if (pdf.target.length !== 1) fail(`PDFに対象日が${pdf.target.length}種類あります`);
    const [tyy, tm] = pdf.target[0];
    if (reiwaToYear(tyy) !== latest.year || tm !== latest.month) {
      fail(`PDFの対象月（令和${tyy}年${tm}月）がリンクの文言（${latest.year}年${latest.month}月）と違います。`);
    }
    if (pdf.asOf.length !== 1) fail(`PDFに基準日が${pdf.asOf.length}種類あります`);
    const [ry, am, ad] = pdf.asOf[0];
    const asOf = `${reiwaToYear(ry)}-${String(am).padStart(2, "0")}-${String(ad).padStart(2, "0")}`;
    console.log(`基準日: ${asOf} / 対象: ${latest.year}年${latest.month}月1日付`);

    const categories: string[] = [];
    const facilities: {
      id: string;
      name: string;
      w: null;
      c: number;
      vacancy: (number | null)[];
    }[] = [];
    const seenId = new Set<string>();
    const builtByAge = Array.from({ length: AGE_COUNT }, () => 0);
    /** 区分ごとの施設数。入所申込者数のPDFと突き合わせる */
    const countByCategory: number[] = [];

    for (const table of pdf.tables) {
      const head = table.head.map((h) => toHalfWidth(squeeze(h)));
      const ageIdx = Array.from({ length: AGE_COUNT }, (_, i) => head.indexOf(`${i}歳`));
      if (ageIdx[0] < 0) fail(`年齢の見出しが見つかりません: ${table.head.join(" / ")}`);
      const totalIdx = head.indexOf("計");
      if (totalIdx < 0) fail(`「計」の列が見つかりません: ${table.head.join(" / ")}`);
      const nameIdx = ageIdx[0] - 1;
      if (nameIdx < 1) fail(`施設名の列が分かりません: ${table.head.join(" / ")}`);
      let kind = "";

      for (const row of table.rows) {
        const first = squeeze(row[0] ?? "");
        if (first) {
          kind = first;
          countByCategory.push(0);
        }
        // 施設名は「わらべ/東久留米」のように改行が入る
        const name = squeeze(row[nameIdx] ?? "");
        if (!name) continue;
        if (!kind) fail(`${name}: 施設の区分が分かりません`);

        const vacancy = ageIdx.map((c) => {
          // 3〜5歳の列がない表（小規模・家庭的）はクラスなし
          if (c < 0) return null;
          const t = toHalfWidth(squeeze(row[c] ?? ""));
          // 空欄は受入予定なし。市の一覧ではどの認可保育所も0歳から5歳まで受け入れている
          if (t === "") return 0;
          if (!/^\d+$/.test(t)) fail(`${name}: 人数として読めません: 「${row[c]}」`);
          return Number(t);
        });
        const totalRaw = toHalfWidth(squeeze(row[totalIdx] ?? ""));
        if (!/^\d+$/.test(totalRaw)) fail(`${name}: 計を読めません: 「${row[totalIdx]}」`);
        const sum = vacancy.reduce((a: number, v) => a + (v ?? 0), 0);
        if (Number(totalRaw) !== sum) fail(`${name}: 計${totalRaw}と年齢ごとの和${sum}が合いません`);
        vacancy.forEach((v, age) => {
          builtByAge[age] += v ?? 0;
        });

        const category = KIND_LABEL[kind] ?? kind;
        if (!categories.includes(category)) categories.push(category);
        const id = `${category}-${name}`;
        if (seenId.has(id)) fail(`施設名が重複しています: ${id}`);
        seenId.add(id);
        countByCategory[countByCategory.length - 1] += 1;
        facilities.push({ id, name, w: null, c: categories.indexOf(category), vacancy });
      }
    }

    // 別のPDF（施設別入所申込者数）で数えた区分ごとの施設数と突き合わせる
    if (countByCategory.join("/") !== pdf.sectionCounts.join("/")) {
      fail(
        `区分ごとの施設数が入所申込者数のPDFと違います（空き状況 ${countByCategory.join("/")} / 申込者数 ${pdf.sectionCounts.join("/")}）`
      );
    }
    if (facilities.length < 30) fail(`施設が${facilities.length}件しか取れていません`);

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
      sourceFiles: { vacancy: latest.url, applicants: applicants.url },
      metrics: ["vacancy"],
      subtitle: `${latest.year}年${latest.month}月1日付の受入れ予定数`,
      notes: [
        "東久留米市の注記のとおり、この表はクラス定員と総定員における在園児童をもとに作られています。今後の退所や保育園での体制、定員の弾力化により受入予定数が大きく変わることがあります。",
        "「—」は小規模保育施設・家庭的保育施設で、そのクラスを設けていないことを表します。認可保育所はどの園も0歳から5歳まで受け入れています。",
        "施設別の入所申込者数も同じページで公開されています。",
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

    console.log(`書き出しました: ${path.relative(process.cwd(), OUT_PATH)}`);
    console.log(`  区分ごとの施設数が入所申込者数のPDFと一致（${countByCategory.join("/")}）`);
    console.log("");
    for (const [i, cat] of categories.entries()) {
      console.log(`  ${cat} ${facilities.filter((f) => f.c === i).length}施設`);
    }
    console.log("");
    console.log("  年齢 | 受入予定");
    builtByAge.forEach((v, age) => console.log(`  ${age}歳児 | ${v}`));
    console.log(`  合計 | ${builtByAge.reduce((a, b) => a + b, 0)}`);
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

/** 表の区分をそのまま出すと施設の種類として伝わらないものを言い換える */
const KIND_LABEL: Record<string, string> = {
  公立: "認可保育所（公立）",
  公設民営: "認可保育所（公設民営）",
  私立: "認可保育所（私立）",
};

main().catch((err) => fail(String(err)));
