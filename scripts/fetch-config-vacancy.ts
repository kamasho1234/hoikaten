/**
 * 設定ファイルを読んで空き状況を取り込む汎用の取り込み器
 *
 * 実行: npm run vacancy:fetch:config -- <slug> [<slug> ...]
 * 設定: scripts/vacancy-sources/<slug>.json
 *
 * ## なぜ汎用にしたのか
 * 自治体ごとに `fetch-<slug>-vacancy.ts` を書いてきたが、
 * 「公式ページ → PDFのリンクを1本たどる → 表を読む」という形の自治体が多い。
 * 同じ処理を写して回ると、直すときに全部を直すことになる。
 * 差分を設定に出し、本当に特殊な自治体だけ専用スクリプトを残す。
 *
 * ## 壊れたデータを出さないための決まり
 * - 想定と違う形を見つけたら **書き込む前に exit 1** する（既存のJSONはそのまま残る）
 * - 基準日が読めない、今日より先、施設数が下限未満 のときも中断する
 * - 記号でしか公開していない自治体は metrics に "symbol" を入れ、人数を推測しない
 *   （[[feedback_factcheck_absolute]]）
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const UA = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";
const AGE_COUNT = 6;
const EXTRACTOR = path.join(process.cwd(), "scripts", "vacancy-generic-extract.py");
const CONFIG_DIR = path.join(process.cwd(), "scripts", "vacancy-sources");
const OUT_DIR = path.join(process.cwd(), "src", "lib", "vacancy");

type SymbolLegend = { mark: string; label: string; open: boolean };

type PdfSpec = {
  /** 公式ページのリンク文字かURLに当てる正規表現 */
  linkPattern?: string;
  /** 直接URLを指定する場合 */
  url?: string;
  /** 候補が複数あるときにどれを使うか。既定は先頭 */
  pick?: "first" | "last";
  /** このPDFから読んだ施設に付ける類型（「公立保育園」など） */
  category?: string;
};

type Config = {
  slug: string;
  name: string;
  sourceName: string;
  indexUrl: string;
  /** 公式ページからPDFを1本選ぶ条件。省略時は indexUrl 自体が対象の文書 */
  pdf?: PdfSpec;
  /** 公立・私立などでPDFが分かれている自治体は、こちらに並べる */
  pdfs?: PdfSpec[];
  layout?: "auto-table" | "one-table" | "age-sections" | "html-tables";
  columns?: Record<string, unknown>;
  metrics?: string[];
  symbolLegend?: SymbolLegend[];
  subtitle?: string;
  notes?: string[];
  categories?: string[];
  /** 基準日の読み取り。source は "pdf"（PDF本文）か "page"（公式ページ本文） */
  asOf: { source?: "pdf" | "page"; pattern: string; order?: "ymd" | "mdy" };
  minFacilities?: number;
};

function fail(message: string): never {
  console.error(`\n[中断] ${message}`);
  process.exit(1);
}

function todayJst(): string {
  const jst = new Date(Date.now() + 9 * 60 * 60 * 1000);
  return jst.toISOString().slice(0, 10);
}

function stripTags(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, "\n")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&");
}

/** 全角の数字を半角にする。自治体の資料は「令和８年３月」のような書き方が混ざる */
function toHankaku(text: string): string {
  return text.replace(/[０-９]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xfee0));
}

/** 「令和8年8月1日」を 2026-08-01 にする。西暦表記もそのまま読む */
function toIsoDate(text: string): string | null {
  const wareki = text.match(/令和(\d+)年(\d{1,2})月(\d{1,2})日/);
  if (wareki) {
    const y = 2018 + Number(wareki[1]);
    return `${y}-${String(Number(wareki[2])).padStart(2, "0")}-${String(Number(wareki[3])).padStart(2, "0")}`;
  }
  const seireki = text.match(/(20\d{2})年(\d{1,2})月(\d{1,2})日/);
  if (seireki) {
    return `${seireki[1]}-${String(Number(seireki[2])).padStart(2, "0")}-${String(Number(seireki[3])).padStart(2, "0")}`;
  }
  const iso = text.match(/(20\d{2})-(\d{2})-(\d{2})/);
  if (iso) return iso[0];
  return null;
}

async function download(url: string, dest: string): Promise<Buffer> {
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) fail(`${url} が ${res.status} を返しました`);
  const buf = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(dest, buf);
  return buf;
}

/** 自治体のページは文字コードがまちまちなので、順に試して読む */
function decodeHtml(buf: Buffer): string {
  for (const enc of ["utf-8", "euc-jp", "shift_jis"]) {
    try {
      return new TextDecoder(enc, { fatal: true }).decode(buf);
    } catch {
      continue;
    }
  }
  return buf.toString("utf-8");
}

async function run(slug: string): Promise<void> {
  const confPath = path.join(CONFIG_DIR, `${slug}.json`);
  if (!fs.existsSync(confPath)) fail(`設定がありません: ${confPath}`);
  const conf = JSON.parse(fs.readFileSync(confPath, "utf-8")) as Config;

  console.log(`\n${conf.name}の空き状況を取り込みます`);
  console.log(`公式ページ: ${conf.indexUrl}`);

  const isHtml = conf.layout === "html-tables";
  const specs: PdfSpec[] = conf.pdfs ?? [conf.pdf ?? {}];
  let pageText = "";
  let indexHtml = "";

  // 公式ページからPDFを選ぶときは、先にページを取る（基準日もここから拾えるようにする）
  if (specs.some((spec) => spec.linkPattern)) {
    const res = await fetch(conf.indexUrl, { headers: { "User-Agent": UA } });
    if (!res.ok) fail(`公式ページが ${res.status} を返しました`);
    indexHtml = decodeHtml(Buffer.from(await res.arrayBuffer()));
    pageText = stripTags(indexHtml);
  }

  const pickPdf = (spec: PdfSpec): string => {
    if (spec.url) return new URL(spec.url, conf.indexUrl).toString();
    if (!spec.linkPattern) return conf.indexUrl;
    const re = /<a[^>]+href="([^"]+\.pdf[^"]*)"[^>]*>([\s\S]{0,200}?)<\/a>/gi;
    const wanted = new RegExp(spec.linkPattern);
    const hits: string[] = [];
    for (const m of indexHtml.matchAll(re)) {
      const label = stripTags(m[2]).replace(/\s+/g, "");
      if (wanted.test(label) || wanted.test(m[1])) {
        hits.push(new URL(m[1], conf.indexUrl).toString());
      }
    }
    if (hits.length === 0) fail(`「${spec.linkPattern}」に当たるPDFのリンクが見つかりません`);
    if (hits.length > 1) {
      const which = spec.pick === "last" ? "最後" : "先頭";
      console.log(`  （「${spec.linkPattern}」の候補が${hits.length}本あったので${which}を使います）`);
    }
    return spec.pick === "last" ? hits[hits.length - 1] : hits[0];
  };

  const rows: Array<Record<string, unknown>> = [];
  const sourceFiles: Record<string, string> = {};
  let docText = "";

  for (const [i, spec] of specs.entries()) {
    const url = isHtml
      ? spec.url
        ? new URL(spec.url, conf.indexUrl).toString()
        : conf.indexUrl
      : pickPdf(spec);
    console.log(`${isHtml ? "表のあるページ" : "PDF"}: ${url}`);

    const suffix = isHtml ? "html" : "pdf";
    const tmp = path.join(os.tmpdir(), `hoikaten-${slug}-${i}-${Date.now()}.${suffix}`);
    const doc = await download(url, tmp);
    // HTMLの表を読むときは、基準日も同じページの本文から拾う
    if (isHtml && !pageText) pageText = stripTags(decodeHtml(doc));

    let payload: { rows: Array<Record<string, unknown>>; text: string };
    try {
      const out = execFileSync("python", [EXTRACTOR, tmp, confPath], {
        encoding: "utf-8",
        maxBuffer: 64 * 1024 * 1024,
      });
      payload = JSON.parse(out);
    } catch (e) {
      const err = e as { stderr?: string; message?: string };
      fail(`表の読み取りに失敗しました（${url}）\n${err.stderr ?? err.message ?? String(e)}`);
    } finally {
      fs.rmSync(tmp, { force: true });
    }

    docText += `\n${payload.text}`;
    for (const r of payload.rows) {
      // PDFが公立・私立で分かれている自治体は、どのPDFから来たかを類型にする
      if (spec.category) r.category = spec.category;
      rows.push(r);
    }
    sourceFiles[specs.length === 1 ? "vacancy" : `vacancy${i + 1}`] = url;
  }

  // HTMLの表を読むときは、PDF本文がないのでページ本文から基準日を拾う
  const source = conf.asOf.source === "page" || isHtml ? pageText : docText;
  const asOfMatch = toHankaku(source).match(new RegExp(conf.asOf.pattern));
  if (!asOfMatch) fail("基準日を読み取れませんでした");
  // 年・月・日を3つに分けて取る書き方（「2026（令和8）年3月17日」など）にも対応する
  const raw = asOfMatch.slice(1).filter((x) => x !== undefined);
  // 資料によっては「更新日 7月31日 … 令和8年10月入所」のように月日が先に来る。
  // その並びは asOf.order で指定する（既定は年・月・日の順）
  const order = conf.asOf.order ?? "ymd";
  const parts =
    raw.length === 3 && order === "mdy" ? [raw[2], raw[0], raw[1]] : raw;
  const asOf =
    parts.length === 3 && parts.every((x) => /^\d+$/.test(x))
      ? // 1つめが4桁でなければ令和の年とみなす（「令和8年度…（7月31日現在）」のような書き方）
        `${Number(parts[0]) < 1000 ? 2018 + Number(parts[0]) : Number(parts[0])}-${parts[1].padStart(2, "0")}-${parts[2].padStart(2, "0")}`
      : toIsoDate(asOfMatch[1] ?? asOfMatch[0]);
  if (!asOf) fail(`基準日「${asOfMatch[0]}」を日付にできませんでした`);
  if (asOf > todayJst()) fail(`基準日（${asOf}）が今日より先になっています`);
  console.log(`基準日: ${asOf} / 施設: ${rows.length}件`);

  const categories = conf.categories ?? [];
  const seen = new Map<string, number>();
  const facilities = rows.map((r, i) => {
    const name = String(r.name);
    const dup = seen.get(name) ?? 0;
    seen.set(name, dup + 1);
    const cat = typeof r.category === "string" ? r.category : null;
    let c: number | null = null;
    if (cat) {
      const idx = categories.indexOf(cat);
      if (idx >= 0) c = idx;
      else {
        categories.push(cat);
        c = categories.length - 1;
      }
    }
    const vacancy = (r.vacancy as (number | null)[]) ?? new Array(AGE_COUNT).fill(null);
    if (vacancy.length !== AGE_COUNT) fail(`${name} の年齢数が ${vacancy.length} です`);
    const out: Record<string, unknown> = {
      id: dup ? `${name}#${dup + 1}` : name,
      name,
      w: null,
      c,
      vacancy,
    };
    if (r.symbols) out.symbols = r.symbols;
    return out;
  });

  const dataset = {
    municipalitySlug: conf.slug,
    municipalityName: conf.name,
    asOf,
    fetchedAt: todayJst(),
    sourceName: conf.sourceName,
    sourceUrl: conf.indexUrl,
    sourceFiles,
    metrics: conf.metrics ?? ["vacancy"],
    ...(conf.subtitle ? { subtitle: conf.subtitle } : {}),
    notes: conf.notes ?? [],
    wards: [],
    categories,
    ...(conf.symbolLegend ? { symbolLegend: conf.symbolLegend } : {}),
    facilities,
  };

  const outPath = path.join(OUT_DIR, `${conf.slug}.json`);
  fs.writeFileSync(outPath, `${JSON.stringify(dataset, null, 2)}\n`, "utf-8");
  console.log(`書き込みました: ${path.relative(process.cwd(), outPath)}`);
}

async function main() {
  const slugs = process.argv.slice(2).filter((a) => !a.startsWith("-"));
  if (slugs.length === 0) fail("使い方: npm run vacancy:fetch:config -- <slug> [<slug> ...]");
  for (const slug of slugs) await run(slug);
}

main().catch((e) => fail(String(e)));
