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
  /**
   * 候補が複数あるときにどれを使うか。既定は先頭。
   * "latest" は「令和8年度10月入園」のような文言から年度と月を読み、
   * いちばん新しいものを選ぶ（月は4月始まりで数える）
   */
  pick?: "first" | "last" | "latest";
  /** このPDFから読んだ施設に付ける類型（「公立保育園」など） */
  category?: string;
};

type Config = {
  slug: string;
  name: string;
  sourceName: string;
  indexUrl: string;
  /**
   * indexUrl から記事のページを1段たどるときの条件。
   * 記事のIDが毎月変わる自治体（菊陽町）は、固定のURLを持つと必ず404になる。
   * 一覧のページを indexUrl にして、この形に当たるリンクへ進む。
   * 候補が複数あるときは、いちばん新しい年月のものを選ぶ。
   */
  indexLink?: { pattern: string };
  /** 公式ページからPDFを1本選ぶ条件。省略時は indexUrl 自体が対象の文書 */
  pdf?: PdfSpec;
  /** 公立・私立などでPDFが分かれている自治体は、こちらに並べる */
  pdfs?: PdfSpec[];
  layout?: "auto-table" | "one-table" | "age-sections" | "html-tables";
  columns?: Record<string, unknown>;
  /** 都道府県名。src/lib/data に点数の基準が無い自治体で要る */
  prefecture?: string;
  metrics?: string[];
  symbolLegend?: SymbolLegend[];
  subtitle?: string;
  notes?: string[];
  categories?: string[];
  /**
   * 基準日の読み取り。
   * source は "pdf"（PDF本文）／"page"（公式ページ本文）／"file"（PDFの公開日）。
   * "file" は資料にもページにも基準日が書かれていない自治体のためのもので、
   * サーバーが返す Last-Modified を日本時間の日付にして使う。
   * checkMonth を付けると、pattern で拾った年月と公開日の年月が一致するかを確かめ、
   * 古い資料を新しいものと思い込む事故を防ぐ。
   */
  asOf: {
    source?: "pdf" | "page" | "file";
    pattern?: string;
    order?: "ymd" | "mdy";
    checkMonth?: boolean;
    /** 「翌月1日入所ぶん」のように、基準日が今日より先になる資料で使う */
    allowFuture?: boolean;
  };
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

async function download(
  url: string,
  dest: string,
): Promise<{ buf: Buffer; lastModified: string | null }> {
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) fail(`${url} が ${res.status} を返しました`);
  const buf = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(dest, buf);
  return { buf, lastModified: res.headers.get("last-modified") };
}

/** Last-Modified を日本時間の「YYYY-MM-DD」にする */
function lastModifiedToJst(header: string): string {
  const at = new Date(header);
  if (Number.isNaN(at.getTime())) fail(`資料の公開日を読めません:「${header}」`);
  return new Date(at.getTime() + 9 * 60 * 60 * 1000).toISOString().slice(0, 10);
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
  let indexUrl = conf.indexUrl;

  const getHtml = async (url: string): Promise<string> => {
    const res = await fetch(url, { headers: { "User-Agent": UA } });
    if (!res.ok) fail(`公式ページが ${res.status} を返しました: ${url}`);
    return decodeHtml(Buffer.from(await res.arrayBuffer()));
  };

  // 記事のIDが毎月変わる自治体では、一覧のページから記事へ1段たどる
  if (conf.indexLink) {
    const listHtml = await getHtml(indexUrl);
    const wanted = new RegExp(conf.indexLink.pattern);
    const hits: Array<{ url: string; label: string }> = [];
    for (const m of listHtml.matchAll(/<a[^>]+href="([^"]+)"[^>]*>([\s\S]{0,300}?)<\/a>/gi)) {
      const label = stripTags(m[2]).replace(/\s+/g, " ").trim();
      if (wanted.test(label) || wanted.test(m[1])) {
        const url = new URL(m[1], indexUrl).toString();
        if (!hits.some((h) => h.url === url)) hits.push({ url, label });
      }
    }
    if (hits.length === 0) {
      fail(`一覧のページに「${conf.indexLink.pattern}」に当たるリンクがありません: ${indexUrl}`);
    }
    // 「令和8年10月入所申込分」のように年月が入るので、いちばん新しいものを選ぶ
    const score = (label: string): number => {
      const m = /令和(\d+)年(?:度)?\s*(\d{1,2})月/.exec(toHankaku(label));
      if (!m) return 0;
      const month = Number(m[2]);
      return Number(m[1]) * 100 + (month >= 4 ? month : month + 12);
    };
    const best = hits.reduce((a, b) => (score(b.label) > score(a.label) ? b : a));
    if (hits.length > 1) {
      console.log(`  （一覧に候補が${hits.length}本あったので「${best.label.slice(0, 28)}」を使います）`);
    }
    indexUrl = best.url;
    console.log(`記事のページ: ${indexUrl}`);
  }

  // 公式ページからPDFを選ぶときは、先にページを取る（基準日もここから拾えるようにする）
  if (specs.some((spec) => spec.linkPattern) || conf.indexLink) {
    indexHtml = await getHtml(indexUrl);
    pageText = stripTags(indexHtml);
  }

  const pickPdf = (spec: PdfSpec): string => {
    if (spec.url) return new URL(spec.url, indexUrl).toString();
    if (!spec.linkPattern) return indexUrl;
    // 須崎市のように download.php?fid=... でPDFを配る自治体があるので、
    // 拡張子だけでなく「リンクの文字が(PDF：〇KB)で終わる」形も拾う
    const re = /<a[^>]+href="([^"]+)"[^>]*>([\s\S]{0,600}?)<\/a>/gi;
    const wanted = new RegExp(spec.linkPattern);
    const hits: Array<{ url: string; label: string }> = [];
    for (const m of indexHtml.matchAll(re)) {
      const label = stripTags(m[2]).replace(/\s+/g, "");
      const looksPdf = /\.pdf(\?|$|#)/i.test(m[1]) || /（?PDF[：:]/i.test(label);
      if (!looksPdf) continue;
      if (wanted.test(label) || wanted.test(m[1])) {
        hits.push({ url: new URL(m[1], indexUrl).toString(), label });
      }
    }
    if (hits.length === 0) fail(`「${spec.linkPattern}」に当たるPDFのリンクが見つかりません`);
    if (spec.pick === "latest") {
      // 「令和8年度10月入園」のような文言から年度と月を取り、いちばん新しいものを選ぶ。
      // 月は年度の並び（4月〜翌3月）で数える
      const score = (label: string): number => {
        const m = toHankaku(label).match(/令和(\d+)年度?\s*(\d{1,2})月/);
        if (!m) return -1;
        const month = Number(m[2]);
        return Number(m[1]) * 100 + (month >= 4 ? month : month + 12);
      };
      const best = hits.reduce((a, b) => (score(b.label) > score(a.label) ? b : a));
      console.log(`  （「${spec.linkPattern}」の候補が${hits.length}本あったので「${best.label.slice(0, 24)}」を使います）`);
      return best.url;
    }
    if (hits.length > 1) {
      const which = spec.pick === "last" ? "最後" : "先頭";
      console.log(`  （「${spec.linkPattern}」の候補が${hits.length}本あったので${which}を使います）`);
    }
    return spec.pick === "last" ? hits[hits.length - 1].url : hits[0].url;
  };

  const rows: Array<Record<string, unknown>> = [];
  const sourceFiles: Record<string, string> = {};
  let docText = "";
  /** この自治体の資料の公開日（Last-Modified）。asOf.source が "file" のときに使う */
  let firstLastModified: string | null = null;

  for (const [i, spec] of specs.entries()) {
    const url = isHtml
      ? spec.url
        ? new URL(spec.url, indexUrl).toString()
        : indexUrl
      : pickPdf(spec);
    console.log(`${isHtml ? "表のあるページ" : "PDF"}: ${url}`);

    const suffix = isHtml ? "html" : "pdf";
    const tmp = path.join(os.tmpdir(), `hoikaten-${slug}-${i}-${Date.now()}.${suffix}`);
    const { buf: doc, lastModified } = await download(url, tmp);
    // 資料の公開日は、自治体ごとに最初の1本のものを使う
    if (firstLastModified === null) firstLastModified = lastModified;
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

  // 資料にもページにも基準日がない自治体は、資料が公開された日を時点にする
  if (conf.asOf.source === "file") {
    if (!firstLastModified) fail("資料に Last-Modified がなく、時点を決められません");
    const published = lastModifiedToJst(firstLastModified);
    if (conf.asOf.checkMonth) {
      if (!conf.asOf.pattern) fail("checkMonth を使うには asOf.pattern が要ります");
      const m = toHankaku(docText || pageText).match(new RegExp(conf.asOf.pattern));
      if (!m) fail("年月の確かめに使う文言が資料に見つかりません");
      const year = Number(m[1]) < 1000 ? 2018 + Number(m[1]) : Number(m[1]);
      const stated = `${year}-${String(Number(m[2])).padStart(2, "0")}`;
      if (stated !== published.slice(0, 7)) {
        fail(`資料に書かれた年月（${stated}）と公開日（${published}）が合いません`);
      }
    }
    if (published > todayJst()) fail(`資料の公開日（${published}）が今日より先になっています`);
    console.log(`基準日: ${published}（資料の公開日）/ 施設: ${rows.length}件`);
    await writeDataset(conf, published, rows, sourceFiles, indexUrl);
    return;
  }

  // HTMLの表を読むときは、PDF本文がないのでページ本文から基準日を拾う
  const source = conf.asOf.source === "page" || isHtml ? pageText : docText;
  if (!conf.asOf.pattern) fail("asOf.pattern がありません");
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
  // 「翌月1日入所ぶん」を出す自治体では、基準日がその入所日になる（恵庭市・中野区）。
  // asOf.allowFuture を書いた設定だけ、今日より先の日付を通す。
  // それでも半年より先は読み違いなので止める
  if (asOf > todayJst()) {
    if (!conf.asOf.allowFuture) fail(`基準日（${asOf}）が今日より先になっています`);
    const ahead = Math.round(
      (Date.parse(`${asOf}T00:00:00Z`) - Date.parse(`${todayJst()}T00:00:00Z`)) / 86400000,
    );
    if (ahead > 180) fail(`基準日（${asOf}）が今日より${ahead}日も先になっています`);
    console.log(`（基準日は${ahead}日先の入所日です）`);
  }
  console.log(`基準日: ${asOf} / 施設: ${rows.length}件`);
  await writeDataset(conf, asOf, rows, sourceFiles, indexUrl);
}

async function writeDataset(
  conf: Config,
  asOf: string,
  rows: Array<Record<string, unknown>>,
  sourceFiles: Record<string, string>,
  /** 出典として載せるページ。indexLink をたどった自治体では、たどった先になる */
  sourceUrl: string,
): Promise<void> {
  const categories = conf.categories ?? [];
  // 区ごとに分けて公表する自治体では、抽出側が行に区名を付けてくる
  const wards: string[] = [];
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
    let w: number | null = null;
    if (typeof r.ward === "string" && r.ward) {
      const idx = wards.indexOf(r.ward);
      w = idx >= 0 ? idx : wards.push(r.ward) - 1;
    }
    const out: Record<string, unknown> = {
      id: dup ? `${name}#${dup + 1}` : name,
      name,
      w,
      c,
      vacancy,
    };
    if (r.symbols) out.symbols = r.symbols;
    // 入所待ち人数など、同じ表の別の行から取れる指標
    for (const key of ["waiting", "enrolled"] as const) {
      const v = r[key];
      if (Array.isArray(v)) {
        if (v.length !== AGE_COUNT) fail(`${name} の${key}の年齢数が ${v.length} です`);
        out[key] = v;
      }
    }
    return out;
  });

  const dataset = {
    municipalitySlug: conf.slug,
    municipalityName: conf.name,
    // 点数の基準を持たない自治体は、これが無いと一覧で「その他」に入ってしまう
    ...(conf.prefecture ? { prefecture: conf.prefecture } : {}),
    asOf,
    fetchedAt: todayJst(),
    sourceName: conf.sourceName,
    sourceUrl,
    sourceFiles,
    metrics: conf.metrics ?? ["vacancy"],
    ...(conf.subtitle ? { subtitle: conf.subtitle } : {}),
    notes: conf.notes ?? [],
    wards,
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
