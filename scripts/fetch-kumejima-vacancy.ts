/**
 * 久米島町の保育所等の空き状況を取り込む
 *
 * 実行: npm run vacancy:fetch:kumejima
 *
 * ## この自治体の特徴
 * - 月ごとに記事が増えるので、一覧から「空き状況及び待機児童数」の記事を
 *   いちばん新しいものだけたどる
 * - **町の資料には0歳児〜4歳児しかない**（5歳児の欄が無い）。
 *   当サイトは0〜5歳の6つで見せるので、5歳児は「—」にし、注記でそれを伝える
 * - 施設ごとに「定数」と「空き」の2行組。載せるのは空きのほう
 * - 末尾の「計」の行と積み上げを突き合わせる
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "kumejima";
const MUNICIPALITY_NAME = "久米島町";
const PREFECTURE = "沖縄県";
const SOURCE_NAME = "久米島町「保育所等の空き状況及び待機児童数」";
/** 記事の一覧（子育て・教育） */
const INDEX_URL = "https://www.town.kumejima.okinawa.jp/categories/iryo/boshi/";
const AGE_COUNT = 6;
const MIN_FACILITIES = 4;
const UA = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);

function fail(message: string): never {
  console.error(`\n[中断] ${message}`);
  process.exit(1);
}

function todayJst(): string {
  const jst = new Date(Date.now() + 9 * 60 * 60 * 1000);
  return jst.toISOString().slice(0, 10);
}

function stripTags(html: string): string {
  return html.replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/[\s　]+/g, "");
}

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

type PdfResult = {
  asOf: number[];
  ages: string[];
  rows: { name: string; values: (number | null)[]; total: number }[];
  totals: (number | null)[];
};

async function main(): Promise<void> {
  console.log(`${MUNICIPALITY_NAME}の空き状況を取り込みます`);
  console.log(`公式ページ: ${INDEX_URL}\n`);

  const res = await fetch(INDEX_URL, { headers: { "User-Agent": UA }, redirect: "follow" });
  if (!res.ok) fail(`公式ページが ${res.status} を返しました`);
  const html = await res.text();

  // 「【最新】8月保育所等の空き状況及び待機児童数」
  const articles = [...html.matchAll(/<a[^>]+href="([^"]+)"[^>]*>([\s\S]{0,120}?)<\/a>/gi)]
    .map((m) => ({ url: new URL(m[1], INDEX_URL).toString(), text: stripTags(m[2]) }))
    .filter((a) => a.text.includes("空き状況") && a.text.includes("待機児童数"));
  if (articles.length === 0) {
    fail("空き状況の記事が見つかりません。ページの構成が変わった可能性があります。");
  }
  // 「【最新】」が付いた記事があればそれ。無ければ先頭
  const article = articles.find((a) => a.text.includes("最新")) ?? articles[0];
  console.log(`記事: ${article.text.slice(0, 40)}\n  ${article.url}`);

  const pageRes = await fetch(article.url, { headers: { "User-Agent": UA } });
  if (!pageRes.ok) fail(`記事のページが ${pageRes.status} を返しました`);
  const pageHtml = await pageRes.text();
  const pdfs = [...pageHtml.matchAll(/<a[^>]+href="([^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => ({ url: new URL(m[1], article.url).toString(), text: stripTags(m[2]) }))
    .filter((p) => p.text.includes("空き状況"));
  if (pdfs.length !== 1) {
    fail(`記事のPDFが${pdfs.length}本あります（1本のはず）: ${pdfs.map((p) => p.text).join(" / ")}`);
  }
  console.log(`PDF: ${pdfs[0].text}\n  ${pdfs[0].url}`);

  const pdfRes = await fetch(pdfs[0].url, { headers: { "User-Agent": UA } });
  if (!pdfRes.ok) fail(`PDFが ${pdfRes.status} を返しました`);
  const tmp = path.join(os.tmpdir(), `kumejima-${process.pid}.pdf`);
  fs.writeFileSync(tmp, Buffer.from(await pdfRes.arrayBuffer()));

  let parsed: PdfResult;
  try {
    parsed = JSON.parse(
      runPython([path.join("scripts", "kumejima-pdf-extract.py"), tmp]),
    ) as PdfResult;
  } finally {
    fs.rmSync(tmp, { force: true });
  }

  const [ry, rm, rd] = parsed.asOf;
  const asOf = `${ry + 2018}-${String(rm).padStart(2, "0")}-${String(rd).padStart(2, "0")}`;
  if (asOf > todayJst()) fail(`時点（${asOf}）が今日より先になっています`);
  console.log(`時点: ${asOf}`);

  const ageCount = parsed.ages.length;
  if (ageCount >= AGE_COUNT) {
    fail(`年齢の欄が${ageCount}個あります。5歳児が加わったなら読み方を見直してください。`);
  }

  const facilities: {
    id: string;
    name: string;
    w: null;
    vacancy: (number | null)[];
  }[] = [];
  const seen = new Set<string>();
  const built = Array.from({ length: ageCount }, () => 0);

  for (const row of parsed.rows) {
    if (seen.has(row.name)) fail(`施設名が重複しています: ${row.name}`);
    seen.add(row.name);
    const vacancy: (number | null)[] = new Array(AGE_COUNT).fill(null);
    row.values.forEach((v, age) => {
      if (v === null) return;
      vacancy[age] = v;
      built[age] += v;
    });
    facilities.push({ id: row.name, name: row.name, w: null, vacancy });
  }

  if (facilities.length < MIN_FACILITIES) {
    fail(`施設が${facilities.length}件しか取れていません（${MIN_FACILITIES}件以上のはず）`);
  }
  const declared = parsed.totals.map((v) => v ?? 0);
  if (declared.join("/") !== built.join("/")) {
    fail(`「計」の行が ${declared.join("/")} なのに積み上げが ${built.join("/")} です`);
  }
  console.log(
    `${facilities.length}施設 ／ 空き${built.reduce((a, b) => a + b, 0)}人（計の行と一致）`,
  );

  const previous = fs.existsSync(OUT_PATH)
    ? (JSON.parse(fs.readFileSync(OUT_PATH, "utf-8")) as { asOf?: string; facilities?: unknown[]; sourceFiles?: Record<string, string> })
    : null;
  if (previous?.facilities && facilities.length < previous.facilities.length * 0.9) {
    fail(
      `施設数が大きく減っています（前回 ${previous.facilities.length}件 → 今回 ${facilities.length}件）`,
    );
  }
  // 自治体は基準日を変えずに資料を差し替えることがある。
  // 取り込み元の一式も同じときだけ、書き換えを見送る
  if (
    previous?.asOf === asOf &&
    JSON.stringify(previous?.sourceFiles ?? {}) === JSON.stringify({ vacancy: pdfs[0].url }) &&
    JSON.stringify(previous?.facilities ?? null) === JSON.stringify(facilities)
  ) {
    console.log(`公式データの時点が前回と同じ（${asOf}）のため更新はありません。`);
    return;
  }

  const notes = [
    `久米島町の認可保育園・公立保育所・地域型保育（家庭的保育事業所）の空き状況です（${asOf}時点）。`,
    `**町の資料には${parsed.ages[0]}から${parsed.ages[ageCount - 1]}までしかありません。**5歳児の欄は「—」にしています。`,
    "町は「空き状況は在園児の退所、保育士の離職または確保などにより絶えず変化しますので、大まかな目安としてご覧ください」としています。",
    "資料には「受入可能数と内定状況を考慮した人数となっています」「職員の数に応じて受け入れができない場合もあります」と書かれています。",
    "設けていないクラスは「—」にしています。家庭的保育事業所は2歳児までです。",
  ];

  const dataset = {
    municipalitySlug: MUNICIPALITY_SLUG,
    municipalityName: MUNICIPALITY_NAME,
    prefecture: PREFECTURE,
    asOf,
    fetchedAt: todayJst(),
    sourceName: SOURCE_NAME,
    sourceUrl: article.url,
    sourceFiles: { vacancy: pdfs[0].url },
    metrics: ["vacancy"],
    subtitle: "保育所等の空き状況",
    notes,
    wards: [] as string[],
    categories: [] as string[],
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
}

main().catch((err) => fail(String(err)));
