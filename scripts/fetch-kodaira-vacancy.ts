/**
 * 小平市の認可保育園等の募集予定人数を取り込む
 *
 * 実行: npm run vacancy:fetch:kodaira
 *
 * ## この自治体の特徴
 * - **1ページに表が5つ**。認可保育園は左右2段組で2つ、そのほかに小規模保育・
 *   家庭的保育事業・認定こども園の表が並ぶ
 * - **施設の種類は表の上の見出し**だが、家庭的保育事業のように
 *   直前の行に前の表の最終行がくっついていることがあるので、見出しは行の末尾から拾う
 * - 認定こども園の表は**保育所部分と幼稚園部分が別の列**に入る（2列とも園名）
 * - **施設名に均等割付の空白が入る**（「上 宿」「小 川 西」）ので詰める
 * - 「―」は定員の設定がなく申し込めないクラス、0は募集なし
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "kodaira";
const MUNICIPALITY_NAME = "小平市";
const SOURCE_NAME = "小平市「認可保育園等の募集予定人数」";
const INDEX_URL = "https://www.city.kodaira.tokyo.jp/kurashi/032/032381.html";
const AGE_COUNT = 6;

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const EXTRACTOR = path.join(process.cwd(), "scripts", "kodaira-pdf-extract.py");

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

/** 「―」は定員の設定がないクラス */
function parseValue(raw: string, where: string): number | null {
  const t = toHalfWidth(squeeze(raw));
  if (t === "" || t === "-" || t === "－" || t === "―" || t === "ー") return null;
  if (/^\d+$/.test(t)) return Number(t);
  fail(`${where}: 人数として読めません: 「${raw}」`);
}

type PdfTable = { section: string; head: string[]; rows: string[][] };
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

/** 見出しの行から施設の種類だけを取り出す */
const KNOWN_SECTIONS = [
  "認可保育園",
  "小規模保育事業",
  "家庭的保育事業",
  "認定こども園（２・３号認定）",
  "認定こども園(2・3号認定)",
];

function categoryOf(section: string): string {
  const s = squeeze(section);
  // 直前の行に前の表の最終行がくっつくことがあるので、末尾から探す
  for (const label of KNOWN_SECTIONS) {
    const key = squeeze(label);
    if (s.endsWith(key)) return key.replace(/[（(].*$/, "");
  }
  for (const label of KNOWN_SECTIONS) {
    const key = squeeze(label);
    if (s.includes(key)) return key.replace(/[（(].*$/, "");
  }
  fail(`施設の種類が分かりません: 「${section}」`);
}

async function main() {
  console.log(`${MUNICIPALITY_NAME}の募集予定人数を取り込みます`);
  console.log(`公式ページ: ${INDEX_URL}\n`);

  const ua = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";
  const res = await fetch(INDEX_URL, { headers: { "User-Agent": ua } });
  if (!res.ok) fail(`公式ページが ${res.status} を返しました`);
  const html = await res.text();

  // 「令和8年度9月の募集予定人数（PDF 126.8KB）」。4月は1次・2次がある
  const links = [...html.matchAll(/<a[^>]+href="([^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => ({ url: new URL(m[1], INDEX_URL).toString(), text: toHalfWidth(stripTags(m[2])) }))
    .map((l) => {
      const m = l.text.match(/令和(\d+)年度(\d+)月(?:(\d)次)?の募集予定人数/);
      if (!m) return null;
      const fiscalYear = reiwaToYear(Number(m[1]));
      const month = Number(m[2]);
      const year = month <= 3 ? fiscalYear + 1 : fiscalYear;
      const round = Number(m[3] ?? 1);
      return { ...l, year, month, round, sortKey: year * 10000 + month * 100 + round };
    })
    .filter((v): v is NonNullable<typeof v> => v !== null);
  if (links.length === 0) fail("募集予定人数のPDFが見つかりません。ページの構成が変わった可能性があります。");
  const latest = links.reduce((a, b) => (b.sortKey > a.sortKey ? b : a));
  console.log(`最新: ${latest.text}\n  ${latest.url}`);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "kodaira-vacancy-"));
  try {
    const r = await fetch(latest.url, { headers: { "User-Agent": ua } });
    if (!r.ok) fail(`PDFの取得に失敗しました（${r.status}）: ${latest.url}`);
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.subarray(0, 4).toString() !== "%PDF") fail(`PDFではありません: ${latest.url}`);
    const file = path.join(tmpDir, "kodaira.pdf");
    fs.writeFileSync(file, buf);

    let pdf: PdfResult;
    try {
      pdf = JSON.parse(runPython([EXTRACTOR, file])) as PdfResult;
    } catch (err) {
      fail(`抽出結果を読めません: ${String(err)}`);
    }

    if (pdf.target.length !== 1) fail(`PDFに対象月が${pdf.target.length}種類あります`);
    const [ty, tm] = pdf.target[0];
    if (tm !== latest.month) {
      fail(`PDFの対象月（${tm}月）がリンクの文言（${latest.month}月）と違います。`);
    }
    if (pdf.asOf.length !== 1) fail(`PDFに基準日が${pdf.asOf.length}種類あります`);
    const [am, ad] = pdf.asOf[0];
    // 基準日には年が書かれていない。対象月の前月ぶんなので対象年をそのまま使う
    const asOf = `${latest.year}-${String(am).padStart(2, "0")}-${String(ad).padStart(2, "0")}`;
    console.log(`基準日: ${asOf} / 対象: 令和${ty}年度${tm}月`);

    const categories: string[] = [];
    const facilities: {
      id: string;
      name: string;
      w: null;
      c: number;
      vacancy: (number | null)[];
    }[] = [];
    const seenId = new Set<string>();

    for (const table of pdf.tables) {
      const category = categoryOf(table.section);
      if (!categories.includes(category)) categories.push(category);
      const head = table.head.map((h) => squeeze(h));
      const ageIdx = Array.from({ length: AGE_COUNT }, (_, i) =>
        head.findIndex((h) => toHalfWidth(h) === `${i}歳`)
      );
      if (ageIdx[0] < 0) fail(`年齢の見出しが見つかりません: ${table.head.join(" / ")}`);
      // 年齢の列より左が施設名。いちばん右の列を使う（左の列は公私の印）
      const nameIdx = ageIdx[0] - 1;
      if (nameIdx < 0) fail(`施設名の列が分かりません: ${table.head.join(" / ")}`);

      for (const row of table.rows) {
        const name = squeeze(row[nameIdx] ?? "");
        if (!name) continue;
        if (name === "施設名") continue;

        const vacancy = ageIdx.map((c) =>
          c < 0 ? null : parseValue(row[c] ?? "", `小平市 ${name}`)
        );
        const id = `${category}-${name}`;
        if (seenId.has(id)) fail(`施設名が重複しています: ${id}`);
        seenId.add(id);
        facilities.push({ id, name, w: null, c: categories.indexOf(category), vacancy });
      }
    }

    if (facilities.length < 50) fail(`施設が${facilities.length}件しか取れていません`);

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
      subtitle: `${latest.year}年${latest.month}月の募集予定人数`,
      notes: [
        "小平市の注記のとおり、今後の退園などで空き人数は変わることがあります。空きが0の施設に内定が出ることもあるので、通える範囲で希望する順にお申し込みください。",
        "「—」は定員の設定がなく申し込めないクラスです。",
        "家庭的保育施設を利用する場合は保育短時間認定となり、土曜日保育は行っていません。",
        "認定こども園は認可保育園と異なる点があるため、見学や園児募集要項をご確認ください。",
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
    console.log("");
    for (const [i, cat] of categories.entries()) {
      console.log(`  ${cat} ${facilities.filter((f) => f.c === i).length}施設`);
    }
    console.log("");
    console.log("  年齢 | 募集予定");
    ageTotals.forEach((v, age) => console.log(`  ${age}歳児 | ${v}`));
    console.log(`  合計 | ${ageTotals.reduce((a, b) => a + b, 0)}`);
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

main().catch((err) => fail(String(err)));
