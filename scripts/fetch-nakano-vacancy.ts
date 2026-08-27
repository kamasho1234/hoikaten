/**
 * 中野区の認可保育施設等の入園募集予定人数（空き状況）を取り込む
 *
 * 実行: npm run vacancy:fetch:nakano
 *
 * ## この自治体の特徴
 * - **表の1行目がそのまま施設類型の見出し**（区立保育園／私立保育園／認定こども園／
 *   地域型保育事業）。本文から見出しを拾わなくてよい
 * - **「なし」がクラスの設定なし、0が空きなし**と文字で書き分けられている。
 *   さいたま市・大田区・江東区のように空欄の意味を図形で見分ける必要がない
 * - 地域型保育事業は0〜2歳のみ（列数が6列）。3〜5歳は null で持つ
 * - 私立保育園はページをまたぐので**同じ見出しの表が複数**出てくる
 * - 地区で分けていないので wards は空。**施設コードが無い**ので施設名をIDにする
 *
 * ## 空き数の意味
 * 「定員数から利用調整後の在園児を引いた人数」。翌月1日入園ぶんの募集予定人数として
 * 公開されるので、subtitle でそのことを明示する。
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "nakano";
const MUNICIPALITY_NAME = "中野区";
const SOURCE_NAME = "中野区「認可保育施設等の空き状況・入所の申込み状況」";
const INDEX_URL =
  "https://www.city.tokyo-nakano.lg.jp/kosodate/kosodatesite_ohirune/mokuteki/hoikuen/hoikuen/nyuuen/akijyokyo.html";
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
const EXTRACTOR = path.join(process.cwd(), "scripts", "nakano-pdf-extract.py");

function fail(message: string): never {
  console.error(`\n[中断] ${message}`);
  process.exit(1);
}

function todayJst(): string {
  const now = new Date();
  const jst = new Date(now.getTime() + 9 * 60 * 60 * 1000);
  return jst.toISOString().slice(0, 10);
}

function stripTags(html: string): string {
  return html.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();
}

function toHalfWidth(s: string): string {
  return s.replace(/[０-９]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xfee0));
}

type PdfTable = {
  section: string;
  /** kind は「区分」列（区立／私立）の位置。「●認可保育所」を分けるのに使う */
  columns: { name: number; kind: number | null; ages: number[] };
  rows: string[][];
};
type PdfResult = { target: number[][]; tables: PdfTable[] };

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

/** 「なし」はそのクラスの設定なし、数字は空き数 */
function parseValue(v: string, where: string): number | null {
  const t = toHalfWidth((v ?? "").replace(/\s/g, ""));
  if (t === "なし" || t === "" || t === "-" || t === "－") return null;
  if (/^\d+$/.test(t)) return Number(t);
  fail(`${where}: 空き数として読めません: 「${v}」`);
}

/**
 * 見出しと「区分」列から施設類型を決める。
 *
 * **2026年10月分から見出しの作りが変わった。** 以前は表の中に「区立保育園」「私立保育園」と
 * 分かれて書いてあったが、いまは表の外の「●認可保育所」ひとつにまとまり、
 * 区立と私立は行ごとの「区分」列（区 立／私 立）で分かれている。
 * そのため見出しだけでは決められず、区分と組み合わせる。
 */
function categoryOf(section: string, kind: string, where: string): string {
  const s = section.replace(/[\s●]/g, "");
  const k = kind.replace(/\s/g, "");
  if (s.startsWith("認可保育所") || s.startsWith("区立保育園") || s.startsWith("私立保育園")) {
    if (s.startsWith("区立保育園")) return "区立保育園";
    if (s.startsWith("私立保育園")) return "私立保育園";
    if (k.startsWith("区")) return "区立保育園";
    if (k.startsWith("公")) return "公設民営保育園";
    if (k.startsWith("私")) return "私立保育園";
    fail(`${where}: 認可保育所の区分を判別できません: 「${kind}」`);
  }
  if (s.includes("認定こども園")) return "認定こども園";
  if (s.includes("小規模保育")) return "小規模保育事業";
  if (s.includes("家庭的保育")) return "家庭的保育事業";
  if (s.includes("事業所内保育")) return "事業所内保育事業";
  fail(`${where}: 施設類型を判別できません: 「${section}」`);
}

async function main() {
  console.log(`${MUNICIPALITY_NAME}の入園募集予定人数を取り込みます`);
  console.log(`公式ページ: ${INDEX_URL}\n`);

  const ua = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";
  const res = await fetch(INDEX_URL, { headers: { "User-Agent": ua } });
  if (!res.ok) fail(`公式ページが ${res.status} を返しました`);
  const html = await res.text();

  // 「2026年8月空き状況（PDF形式：195KB）」。最新号だけリンク文言が空のことがあるので、
  // **ファイル名の日付（20260902.pdf / 202607_akijyoukyou.pdf）も見て**並べ替える
  const links = [...html.matchAll(/<a[^>]+href="([^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => {
      const url = new URL(m[1], INDEX_URL).toString();
      const text = toHalfWidth(stripTags(m[2]));
      const fromText = text.match(/(\d{4})年\s*(\d{1,2})月/);
      const file = decodeURIComponent(url.split("/").pop() ?? "");
      const fromFile = file.match(/(20\d{2})[.\-_]?(\d{2})/);
      const year = Number(fromText?.[1] ?? fromFile?.[1] ?? 0);
      const month = Number(fromText?.[2] ?? fromFile?.[2] ?? 0);
      if (!year || !month || month > 12) return null;
      // 4月は一次・二次があるので「2次」を後ろに置く
      const round = /2次/.test(text) || /_2|\.2/.test(file) ? 2 : 1;
      return { url, text, file, year, month, round, sortKey: year * 10000 + month * 100 + round };
    })
    .filter((v): v is NonNullable<typeof v> => v !== null);
  if (links.length === 0) fail("空き状況のPDFリンクが見つかりません。ページの構成が変わった可能性があります。");
  const latest = links.reduce((a, b) => (b.sortKey > a.sortKey ? b : a));
  console.log(`最新: ${latest.text || latest.file}\n  ${latest.url}`);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "nakano-vacancy-"));
  try {
    const pdfRes = await fetch(latest.url, { headers: { "User-Agent": ua } });
    if (!pdfRes.ok) fail(`PDFの取得に失敗しました（${pdfRes.status}）: ${latest.url}`);
    const buf = Buffer.from(await pdfRes.arrayBuffer());
    if (buf.subarray(0, 4).toString() !== "%PDF") fail(`PDFではありません: ${latest.url}`);
    const file = path.join(tmpDir, "nakano.pdf");
    fs.writeFileSync(file, buf);

    const raw = runPython([EXTRACTOR, file]);
    let pdf: PdfResult;
    try {
      pdf = JSON.parse(raw) as PdfResult;
    } catch (err) {
      fail(`抽出結果を読めません: ${String(err)}`);
    }

    if (pdf.target.length !== 1) fail(`PDFに対象日が${pdf.target.length}種類あります`);
    const [ty, tm, td] = pdf.target[0];
    if (ty !== latest.year || tm !== latest.month) {
      fail(`PDFの対象月（${ty}年${tm}月）がリンク・ファイル名（${latest.year}年${latest.month}月）と違います。`);
    }
    // 中野区は基準日を書かず「◯年◯月◯日入園」とだけ示す。入園日をデータ時点として扱う
    const asOf = `${ty}-${String(tm).padStart(2, "0")}-${String(td).padStart(2, "0")}`;
    console.log(`対象: ${ty}年${tm}月${td}日入園ぶんの募集予定人数`);

    const categories: string[] = [];
    const facilities: { id: string; name: string; w: null; c: number; vacancy: (number | null)[] }[] =
      [];
    const research: { id: string; name: string; category: string; section: string }[] = [];
    const seen = new Set<string>();
    /** 区分の欄が空の行は、直前の行と同じ区分として読む */
    let lastKind = "";

    for (const t of pdf.tables) {
      for (const row of t.rows) {
        const name = (row[t.columns.name] ?? "").trim();
        if (!name) continue;
        // 見出しが繰り返し入ることがあるので弾く
        if (name === t.section || /^名称$/.test(name)) continue;

        // 区分は行ごと。**同じ表に区立と私立が混ざる**ので、行を読むたびに決める。
        //
        // 区分の欄は3通りの入り方をする。
        //   1. 「区 立」「私 立」… そのまま読める
        //   2. 「私」だけ／「立」だけ … **縦書きの2文字が上下の行に分かれて入る**
        //   3. 空 … 罫線で上の行にまとめられている
        // 区分として意味があるのは先頭の1文字（区／公／私）なので、
        // **その文字で始まるときだけ覚え直し、「立」や空の行は直前の区分を引き継ぐ。**
        const rawKind = (t.columns.kind === null ? "" : (row[t.columns.kind] ?? "")).replace(/\s/g, "");
        if (/^[区公私]/.test(rawKind)) lastKind = rawKind;
        const category = categoryOf(t.section, lastKind, `見出し「${t.section}」`);
        if (!categories.includes(category)) categories.push(category);

        const values = t.columns.ages.map((i) => parseValue(row[i] ?? "", `${category} ${name}`));
        const vacancy: (number | null)[] =
          values.length === AGE_COUNT
            ? values
            : [...values, ...new Array(AGE_COUNT - values.length).fill(null)];

        if (seen.has(name)) fail(`施設名が重複しています: ${name}`);
        seen.add(name);
        facilities.push({ id: name, name, w: null, c: categories.indexOf(category), vacancy });
        research.push({ id: name, name, category, section: t.section });
      }
    }

    if (facilities.length === 0) fail("施設が1件も取れていません。");
    console.log(`施設 ${facilities.length}件 / 区分 ${categories.join("・")}`);

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
      sourceFiles: { 空き状況: latest.url },
      metrics: ["vacancy"],
      subtitle: `${ty}年${tm}月${td}日入園ぶんの募集予定人数`,
      notes: [
        `中野区が公開しているのは「${ty}年${tm}月${td}日に入園できる枠の募集予定人数」です。現時点の空き数ではありません。`,
        "空き数は定員数から利用調整後の在園児を引いた人数で、入所辞退・退園等により変動します。",
        "「—」はそのクラスの設定がないことを示します。0は空きがないことを示します。",
        "空きが0の園でも申込書の希望園に記入でき、記入した園は利用調整の対象になります。",
        "地域型保育事業（小規模・家庭的）は0〜2歳児のみの受け入れです。",
        "中野区はこの数値をPDFで公開しています。当サイトは表をそのまま読み取って掲載しています。",
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
      console.log(`  ${c.padEnd(14, "　")} ${String(list.length).padStart(3)}施設 / 空き${sum}`);
    });
    console.log("");
    console.log("  年齢 | 空き数");
    ageTotals.forEach((v, age) => console.log(`  ${age}歳児 | ${v}`));
    console.log(`  合計 | ${ageTotals.reduce((a, b) => a + b, 0)}`);
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

main().catch((err) => fail(String(err)));
