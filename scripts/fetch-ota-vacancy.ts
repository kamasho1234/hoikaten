/**
 * 大田区の認可保育園等の欠員（空き）を取り込む
 *
 * 実行: npm run vacancy:fetch:ota
 *
 * ## 他の自治体との違い
 * - **PDFが1本だけ**。川崎市（7区）・さいたま市（10区）のように区ごとに分かれていない
 * - **全4ページが同じ14列の表**で、ページごとに見出し行が繰り返される
 * - **`×` が「受け入れがない年齢のクラス」で、空欄が「空きなし」**。
 *   さいたま市とは逆なので取り違えないこと
 * - **番号が1から連番**なので、取りこぼしがないことを検算できる（合計行はない）
 * - 数値の意味は「翌月の利用調整のための欠員」。川崎市と同じく現時点の空きではない
 *
 * ## 安全装置
 * 想定と1つでも違えば書き込まずに exit 1 する。
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "ota";
const MUNICIPALITY_NAME = "大田区";
const SOURCE_NAME = "大田区「保育園別・クラス年齢別欠員リスト」";
/** 最新号もバックナンバーページに並ぶ。ファイル名に規則性がないのでリンクの文言で選ぶ */
const INDEX_URL =
  "https://www.city.ota.tokyo.jp/seikatsu/kodomo/hoiku/akijyoho/aki-backnumber.html";
const LINK_BASE = "https://www.city.ota.tokyo.jp/seikatsu/kodomo/hoiku/akijyoho/";
const AGE_COUNT = 6;
/** 前回より施設がこの割合を下回ったら、取り込みミスとみなして中断する */
const MIN_FACILITY_RATIO = 0.9;

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
/** 所在地と電話は空き状況には出さないが、施設リンクを調べるときに使うので別に残す */
const RESEARCH_PATH = path.join(
  process.cwd(),
  "scripts",
  "vacancy-research",
  MUNICIPALITY_SLUG,
  "facilities_from_pdf.json"
);
const EXTRACTOR = path.join(process.cwd(), "scripts", "ota-pdf-extract.py");

function fail(message: string): never {
  console.error(`\n[中断] ${message}`);
  process.exit(1);
}

function todayJst(): string {
  const now = new Date();
  const jst = new Date(now.getTime() + 9 * 60 * 60 * 1000);
  return jst.toISOString().slice(0, 10);
}

/** 令和8年 → 2026年 */
function reiwaToYear(reiwa: number): number {
  return 2018 + reiwa;
}

function stripTags(html: string): string {
  return html
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** 全角数字を半角にする */
function toHalfWidth(s: string): string {
  return s.replace(/[０-９]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xfee0));
}

type PdfResult = {
  pageCount: number;
  asOf: number[][];
  target: number[][];
  notes: string[];
  header: string[];
  rows: string[][];
};

/** python / python3 のどちらで動くかは環境による */
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
  console.log(`${MUNICIPALITY_NAME}の保育園の欠員を取り込みます`);
  console.log(`公式ページ: ${INDEX_URL}\n`);

  // --- 1. バックナンバーページから最新の欠員リストを選ぶ ---
  const res = await fetch(INDEX_URL, {
    headers: { "User-Agent": "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)" },
  });
  if (!res.ok) fail(`公式ページが ${res.status} を返しました`);
  const html = await res.text();

  const links = [...html.matchAll(/<a[^>]+href="([^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/gi)].map((m) => ({
    url: m[1].startsWith("http") ? m[1] : LINK_BASE + m[1].replace(/^\.\//, ""),
    text: toHalfWidth(stripTags(m[2])),
  }));
  // 「令和8年8月欠員リスト（PDF：159KB）」の形。二次募集ぶんは「令和8年4月（二次1回目）」のように月が同じ
  const dated = links
    .map((link) => {
      const m = link.text.match(/令和(\d+)年(\d+)月/);
      if (!m) return null;
      if (!/欠員/.test(link.text)) return null;
      const year = reiwaToYear(Number(m[1]));
      const month = Number(m[2]);
      return { ...link, year, month, key: year * 100 + month };
    })
    .filter((v): v is NonNullable<typeof v> => v !== null);
  if (dated.length === 0) {
    fail("欠員リストのリンクが1本も見つかりません。ページの構成が変わった可能性があります。");
  }
  const latest = dated.reduce((a, b) => (b.key > a.key ? b : a));
  console.log(`最新の欠員リスト: ${latest.text}`);
  console.log(`  ${latest.url}\n`);

  // --- 2. PDFを一時ディレクトリに落とす ---
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "ota-vacancy-"));
  try {
    const pdfRes = await fetch(latest.url, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)" },
    });
    if (!pdfRes.ok) fail(`PDFの取得に失敗しました（${pdfRes.status}）: ${latest.url}`);
    const buf = Buffer.from(await pdfRes.arrayBuffer());
    if (buf.subarray(0, 4).toString() !== "%PDF") fail(`PDFではありません: ${latest.url}`);
    const file = path.join(tmpDir, "ota.pdf");
    fs.writeFileSync(file, buf);

    // --- 3. pdfplumberで表を抜く ---
    const raw = runPython([EXTRACTOR, file]);
    let pdf: PdfResult;
    try {
      pdf = JSON.parse(raw) as PdfResult;
    } catch (err) {
      fail(`抽出結果を読めません: ${String(err)}`);
    }

    // --- 4. 基準日と対象月 ---
    if (pdf.asOf.length !== 1) {
      fail(`PDFに基準日が${pdf.asOf.length}種類あります: ${JSON.stringify(pdf.asOf)}`);
    }
    const [ry, rm, rd] = pdf.asOf[0];
    const asOf = `${reiwaToYear(ry)}-${String(rm).padStart(2, "0")}-${String(rd).padStart(2, "0")}`;
    if (pdf.target.length !== 1) {
      fail(`PDFに対象月が${pdf.target.length}種類あります: ${JSON.stringify(pdf.target)}`);
    }
    const [ty, tm] = pdf.target[0];
    const targetYear = reiwaToYear(ty);
    if (targetYear !== latest.year || tm !== latest.month) {
      fail(
        `PDFの対象月（${targetYear}年${tm}月）がリンクの文言（${latest.year}年${latest.month}月）と違います。`
      );
    }
    console.log(`基準日: ${asOf} / 対象: ${targetYear}年${tm}月の利用調整`);

    // --- 5. 行を開く ---
    const H = (name: string) => {
      const i = pdf.header.indexOf(name);
      if (i < 0) fail(`見出しに「${name}」がありません`);
      return i;
    };
    const iNo = H("番号");
    const iType = H("種別");
    const iName = H("保育所");
    const iStart = H("開始");
    const iAddress = H("所在地");
    const iTel = H("電話");
    const AGE_HEADERS = ["０歳", "１歳", "２歳", "３歳", "４歳", "５歳"];
    const ageIndexes = AGE_HEADERS.map(H);

    const facilities: {
      id: string;
      name: string;
      w: null;
      c: number;
      vacancy: (number | null)[];
    }[] = [];
    const research: {
      id: string;
      name: string;
      category: string;
      startAge: string;
      address: string;
      tel: string;
    }[] = [];
    const categories: string[] = [];
    const numbers: number[] = [];

    for (const row of pdf.rows) {
      const no = row[iNo];
      const name = row[iName];
      const type = row[iType];
      if (!name) fail(`番号${no}に施設名がありません`);
      if (!type) fail(`番号${no}に種別がありません`);
      if (!categories.includes(type)) categories.push(type);
      numbers.push(Number(no));

      const vacancy = ageIndexes.map((i) => {
        const v = i < row.length ? row[i] : "";
        // × は黒塗り（受け入れがない年齢のクラス）。空欄は「空きなし」で0
        if (v === "×" || v === "✕" || v === "☓") return null;
        if (v === "") return 0;
        if (/^\d+$/.test(v)) return Number(v);
        fail(`番号${no}（${name}）の年齢欄が読めません: 「${v}」`);
      });
      while (vacancy.length < AGE_COUNT) vacancy.push(null);

      facilities.push({ id: no, name, w: null, c: categories.indexOf(type), vacancy });
      research.push({
        id: no,
        name,
        category: type,
        startAge: row[iStart] ?? "",
        address: row[iAddress] ?? "",
        tel: row[iTel] ?? "",
      });
    }

    // --- 6. 検算 ---
    if (facilities.length === 0) fail("施設が1件も取れていません。");
    // 番号は1から連番。欠番や重複があれば行を取りこぼしている
    const sorted = [...numbers].sort((a, b) => a - b);
    const expected = Array.from({ length: sorted.length }, (_, i) => i + 1);
    if (sorted.join(",") !== expected.join(",")) {
      const missing = expected.filter((n) => !sorted.includes(n));
      fail(
        `番号が1〜${sorted.length}の連番になっていません（欠番: ${missing.slice(0, 10).join(",") || "なし"} / 最大: ${sorted[sorted.length - 1]}）。行を取りこぼしている可能性があります。`
      );
    }
    console.log(`番号 1〜${sorted.length} の連番を確認しました（${pdf.pageCount}ページ）`);

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

    // --- 7. 書き出し ---
    const dataset = {
      municipalitySlug: MUNICIPALITY_SLUG,
      municipalityName: MUNICIPALITY_NAME,
      asOf,
      fetchedAt: todayJst(),
      sourceName: SOURCE_NAME,
      sourceUrl: INDEX_URL,
      sourceFiles: { 欠員リスト: latest.url },
      metrics: ["vacancy"],
      subtitle: `${targetYear}年${tm}月の利用調整に使われる欠員`,
      notes: [
        `大田区が公開しているのは「${targetYear}年${tm}月の利用調整のための欠員」です。現時点の空き数ではありません。`,
        "「—」はその年齢のクラスを設けていないことを示します（出典では黒塗り）。0は空きがないことを示します。",
        ...pdf.notes.filter((n) => /退園|空きがない|年齢クラス|小規模/.test(n)),
        "大田区はこの数値をPDFで公開しています。当サイトは表をそのまま読み取って掲載しています。",
      ],
      wards: [] as string[],
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

    // --- 8. サマリー ---
    const ageTotals = Array.from({ length: AGE_COUNT }, (_, age) =>
      facilities.reduce((acc, f) => acc + (f.vacancy[age] ?? 0), 0)
    );
    console.log(`\n書き出しました: ${path.relative(process.cwd(), OUT_PATH)}`);
    console.log(`  所在地と電話: ${path.relative(process.cwd(), RESEARCH_PATH)}`);
    console.log(`  データ時点: ${asOf}`);
    console.log(`  施設数: ${facilities.length}`);
    console.log("");
    categories.forEach((cat, i) => {
      const list = facilities.filter((f) => f.c === i);
      const sum = list.reduce((acc, f) => acc + f.vacancy.reduce((s: number, v) => s + (v ?? 0), 0), 0);
      console.log(`  ${cat.padEnd(6, "　")} ${String(list.length).padStart(3)}施設 / 空き${sum}`);
    });
    console.log("");
    console.log("  年齢 | 空き枠");
    ageTotals.forEach((v, age) => console.log(`  ${age}歳児 | ${v}`));
    console.log(`  合計 | ${ageTotals.reduce((a, b) => a + b, 0)}`);
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

main().catch((err) => fail(String(err)));
