/**
 * 江東区の認可保育所等の募集人員一覧を取り込む
 *
 * 実行: npm run vacancy:fetch:koto
 *
 * ## この自治体の特徴
 * - **地区ごとにページが分かれた1本のPDF**（白河・富岡／小松橋・東陽／豊洲①②／亀戸・大島①／
 *   大島②・砂町・南砂）。施設コード・所在地・電話まで載っている
 * - **「斜線は定員設定なし、空欄は空き（募集）予定なし」**。どちらも文字としては空なので、
 *   抽出側が**セルに斜めの curve があるか**で見分けている（斜線→null、空欄→0）
 * - **各行に合計列がある**ので、年齢別の和と突き合わせて検算できる
 * - 区分は 区＝区立／公＝公設民営／私＝私立／小A＝小規模認可（A型）／
 *   認＝認定こども園（幼保連携型）／地＝認定こども園（地方裁量型）
 *
 * ## 安全装置
 * 合計列と1行でも合わなければ書き込まずに exit 1 する。
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "koto";
const MUNICIPALITY_NAME = "江東区";
const SOURCE_NAME = "江東区「入所募集人員一覧表」";
// 空き人員一覧のページ。**URLに年度が入っていて毎年変わる**
// （akijyouhou-r8-back.html → akijyohou_r8_5kara.html のように、予告なく差し替わって 404 になった）。
// 直リンクだけに頼ると年度替わりで必ず止まるので、**404 のときは保育園の一覧ページから探し直す**。
const INDEX_URL = "https://www.city.koto.lg.jp/280308/kodomo/hoiku/ninka/akijyohou_r8_5kara.html";
/** INDEX_URL が落ちたときにリンクを探しにいくページ */
const FALLBACK_INDEX_URL = "https://www.city.koto.lg.jp/kodomo/hoiku/ninka/index.html";
const AGE_COUNT = 6;
const MIN_FACILITY_RATIO = 0.9;

/** PDFの記号と、当サイトで表示する施設類型の対応 */
const CATEGORY_BY_MARK: Record<string, string> = {
  区: "区立",
  公: "公設民営",
  私: "私立",
  小A: "小規模認可（A型）",
  認: "認定こども園（幼保連携型）",
  地: "認定こども園（地方裁量型）",
};

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const RESEARCH_PATH = path.join(
  process.cwd(),
  "scripts",
  "vacancy-research",
  MUNICIPALITY_SLUG,
  "facilities_from_pdf.json"
);
const EXTRACTOR = path.join(process.cwd(), "scripts", "koto-pdf-extract.py");

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
  area: string;
  columns: {
    name: number;
    kubun: number;
    code: number;
    address: number | null;
    tel: number | null;
    ages: number[];
    total: number | null;
    minAge: number | null;
  };
  areaByRow: string[];
  rows: string[][];
  noClass: boolean[][];
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
 * 募集人数を読む。
 * 斜線（定員設定なし）は null、空欄は0（募集予定なし）、数字はその数。
 */
function parseValue(v: string, noClass: boolean, where: string): number | null {
  const t = toHalfWidth((v ?? "").replace(/\s/g, ""));
  if (noClass) {
    if (t !== "") fail(`${where}: 斜線のセルに値があります: 「${v}」`);
    return null;
  }
  if (t === "") return 0;
  if (/^\d+$/.test(t)) return Number(t);
  fail(`${where}: 募集人数として読めません: 「${v}」`);
}

function categoryOf(mark: string, where: string): string {
  const key = mark.replace(/\s/g, "").replace(/Ａ/g, "A");
  const hit = CATEGORY_BY_MARK[key];
  if (!hit) fail(`${where}: 区分の記号を判別できません: 「${mark}」`);
  return hit;
}

async function main() {
  console.log(`${MUNICIPALITY_NAME}の入所募集人員一覧を取り込みます`);
  console.log(`公式ページ: ${INDEX_URL}\n`);

  const ua = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";
  let indexUrl = INDEX_URL;
  let res = await fetch(indexUrl, { headers: { "User-Agent": ua } });
  if (!res.ok) {
    // 年度が変わってURLが差し替わったとき。一覧ページから「空き人員一覧」のリンクを拾い直す
    console.log(`公式ページが ${res.status} でした。一覧ページから探し直します: ${FALLBACK_INDEX_URL}`);
    const listRes = await fetch(FALLBACK_INDEX_URL, { headers: { "User-Agent": ua } });
    if (!listRes.ok) fail(`一覧ページも ${listRes.status} を返しました`);
    const listHtml = await listRes.text();
    const found = [...listHtml.matchAll(/<a[^>]+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi)]
      .map((m) => ({ url: new URL(m[1], FALLBACK_INDEX_URL).toString(), text: stripTags(m[2]) }))
      .find((a) => a.text.includes("空き人員一覧"));
    if (!found) fail("一覧ページに「空き人員一覧」へのリンクが見つかりません。サイトの作りが変わった可能性があります。");
    indexUrl = found.url;
    console.log(`見つかりました: ${found.text}
  ${indexUrl}
`);
    res = await fetch(indexUrl, { headers: { "User-Agent": ua } });
    if (!res.ok) fail(`探し直したページも ${res.status} を返しました: ${indexUrl}`);
  }
  const html = await res.text();

  // 「令和8年度9月募集予定人員一覧（クラス年齢は令和8年4月1日現在の年齢です。）」。
  // **見出しの「令和8年度」は年度とずれることがある**（「令和8年度1月」の中身は
  // 令和7年度＝2026年1月分）。**括弧内の「クラス年齢は令和X年4月1日現在」のXが年度**なので、
  // そちらを年度として使い、4〜12月はその年・1〜3月は翌年として並べ替える。
  // 4月は一次・二次があるので次数も見る。
  const links = [...html.matchAll(/<a[^>]+href="([^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => ({
      url: new URL(m[1], indexUrl).toString(),
      text: toHalfWidth(stripTags(m[2])),
    }))
    .map((l) => {
      const m = l.text.match(/令和(\d+)年度\s*(\d+)月(?:(.)次)?募集予定人員一覧/);
      if (!m) return null;
      const month = Number(m[2]);
      const round = m[3] ? (m[3] === "二" ? 2 : 1) : 1;
      const cls = l.text.match(/クラス年齢は令和(\d+)年4月1日現在/);
      // 括弧書きが無い号は見出しの年度をそのまま年度とみなす
      const fiscalYear = reiwaToYear(Number(cls ? cls[1] : m[1]));
      const year = month >= 4 ? fiscalYear : fiscalYear + 1;
      return { ...l, year, month, round, sortKey: year * 10000 + month * 100 + round };
    })
    .filter((v): v is NonNullable<typeof v> => v !== null);
  if (links.length === 0) fail("募集予定人員一覧のPDFリンクが見つかりません。ページの構成が変わった可能性があります。");
  const latest = links.reduce((a, b) => (b.sortKey > a.sortKey ? b : a));
  console.log(`最新: ${latest.text}\n  ${latest.url}`);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "koto-vacancy-"));
  try {
    const pdfRes = await fetch(latest.url, { headers: { "User-Agent": ua } });
    if (!pdfRes.ok) fail(`PDFの取得に失敗しました（${pdfRes.status}）: ${latest.url}`);
    const buf = Buffer.from(await pdfRes.arrayBuffer());
    if (buf.subarray(0, 4).toString() !== "%PDF") fail(`PDFではありません: ${latest.url}`);
    const file = path.join(tmpDir, "koto.pdf");
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
    if (pdf.target.length !== 1) fail(`PDFに対象月が${pdf.target.length}種類あります`);
    const [ty, tm] = pdf.target[0];
    if (tm !== latest.month) {
      fail(`PDFの対象月（${tm}月）がリンクの文言（${latest.month}月）と違います。`);
    }
    console.log(`基準日: ${asOf} / 対象: ${reiwaToYear(ty)}年${tm}月入所の募集`);

    const wards: string[] = [];
    const categories: string[] = [];
    const facilities: {
      id: string;
      name: string;
      w: number;
      c: number;
      vacancy: (number | null)[];
    }[] = [];
    const research: {
      id: string;
      name: string;
      area: string;
      category: string;
      address: string;
      tel: string;
      minAge: string;
    }[] = [];
    const seen = new Set<string>();
    let rowChecks = 0;

    for (const t of pdf.tables) {
      const c = t.columns;
      for (const [ri, row] of t.rows.entries()) {
        const code = (row[c.code] ?? "").replace(/\s/g, "");
        if (!code) continue; // 注記などの行
        const name = (row[c.name] ?? "").trim();
        if (!name) fail(`${t.area}: 施設コード${code}に施設名がありません`);
        // 地区は縦書きセルなので「白　　河」のように字間が空く。空白を落として使う
        const area = (t.areaByRow[ri] ?? "").replace(/[\s　]/g, "") || t.area;
        if (!area) fail(`${t.area} ${name}: 地区が分かりません`);
        const category = categoryOf(row[c.kubun] ?? "", `${area} ${name}`);

        if (!wards.includes(area)) wards.push(area);
        if (!categories.includes(category)) categories.push(category);

        const flags = t.noClass[ri] ?? new Array(c.ages.length).fill(false);
        const vacancy = c.ages.map((col, i) =>
          parseValue(row[col] ?? "", flags[i] ?? false, `${area} ${name}`)
        );

        // --- 各行の合計列との突き合わせ ---
        if (c.total !== null) {
          const declared = toHalfWidth((row[c.total] ?? "").replace(/\s/g, ""));
          const sum = vacancy.reduce((a: number, v) => a + (v ?? 0), 0);
          const want = declared === "" ? 0 : Number(declared);
          if (!Number.isFinite(want)) fail(`${area} ${name}: 合計欄を読めません: 「${row[c.total]}」`);
          if (sum !== want) {
            fail(`${area} ${name}: 年齢別の和(${sum})が合計欄(${want})と一致しません`);
          }
          rowChecks++;
        }

        const id = toHalfWidth(code);
        if (seen.has(id)) fail(`施設コードが重複しています: ${id}（${name}）`);
        seen.add(id);
        facilities.push({
          id,
          name,
          w: wards.indexOf(area),
          c: categories.indexOf(category),
          vacancy,
        });
        research.push({
          id,
          name,
          area,
          category,
          address: c.address === null ? "" : (row[c.address] ?? "").trim(),
          tel: c.tel === null ? "" : (row[c.tel] ?? "").trim(),
          minAge: c.minAge === null ? "" : (row[c.minAge] ?? "").trim(),
        });
      }
    }

    if (facilities.length === 0) fail("施設が1件も取れていません。");
    console.log(`合計欄との突き合わせ: ${rowChecks}行すべて一致`);
    console.log(`施設 ${facilities.length}件 / 地区 ${wards.length}件 / 区分 ${categories.join("・")}`);

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
        JSON.stringify(previous?.sourceFiles ?? {}) === JSON.stringify({ 募集人員一覧表: latest.url })
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
      sourceFiles: { 募集人員一覧表: latest.url },
      metrics: ["vacancy"],
      subtitle: `${reiwaToYear(ty)}年${tm}月入所ぶんの募集人員`,
      notes: [
        `江東区が公開しているのは「${reiwaToYear(ty)}年${tm}月に入所できる枠の募集人員」です。現時点の空き数ではありません。`,
        "「—」はそのクラスの定員設定がないことを示します。0は募集予定がないことを示します。",
        "クラス年齢は年度初め（4月1日）現在の満年齢です。",
        "小規模認可（A型）は0〜2歳児のみの受け入れです。",
        `地区の分けかたは出典の一覧表（${wards.length}地区）をそのまま使っています。`,
        "江東区はこの数値をPDFで公開しています。当サイトは表をそのまま読み取って掲載しています。",
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
      console.log(`  ${w.slice(0, 14).padEnd(16, "　")} ${String(list.length).padStart(3)}施設 / 募集${sum}`);
    });
    console.log("");
    categories.forEach((c, i) => {
      const list = facilities.filter((f) => f.c === i);
      console.log(`  ${c.padEnd(20, "　")} ${String(list.length).padStart(3)}施設`);
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
