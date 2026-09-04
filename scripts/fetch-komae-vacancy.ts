/**
 * 狛江市の保育施設の空き枠状況を取り込む
 *
 * 実行: npm run vacancy:fetch:komae
 *
 * ## この自治体の特徴
 * - **空き状況は市のサイトではなく「こまえ子育てねっと」で公開**されている。
 *   入口のページは記事IDへ meta refresh で飛ばすだけなので、その行き先を追う
 * - ページもPDFのリンク文言も Shift_JIS なので、charset を見てデコードする
 * - 1ページに「認可保育所」「認定こども園」「小規模保育事業」「事業所内保育事業」の
 *   4つの表が並び、見出しの左端がそのまま施設の種類になっている
 * - 「-」はそのクラスを設けていないこと。行ごとに「合計」列があるので1行ずつ検算する
 * - 認証保育所と家庭福祉員は別のPDF（市に申し込む施設ではない）なので取り込まない
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "komae";
const MUNICIPALITY_NAME = "狛江市";
const SOURCE_NAME = "こまえ子育てねっと「保育施設空き情報」";
const INDEX_URL = "https://komae-kosodate.net/hoiku-aki-info.html";
const AGE_COUNT = 6;

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const EXTRACTOR = path.join(process.cwd(), "scripts", "komae-pdf-extract.py");

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
  // 施設名に全角の四分アキ（U+2003）が入るので空白としてまとめて落とす
  return (s ?? "").replace(/[\s 　]/g, "");
}

const UA = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";

/** こまえ子育てねっとは Shift_JIS。meta の charset を見てデコードする */
async function fetchText(url: string): Promise<string> {
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) fail(`${url} が ${res.status} を返しました`);
  const buf = Buffer.from(await res.arrayBuffer());
  const ascii = buf.toString("latin1");
  const m = ascii.match(/charset=["']?([\w-]+)/i);
  const charset = (m?.[1] ?? "utf-8").toLowerCase();
  const label =
    charset === "shift_jis" || charset === "sjis" || charset === "x-sjis" ? "shift_jis" : charset;
  try {
    return new TextDecoder(label).decode(buf);
  } catch {
    fail(`${url}: 文字コード ${charset} を読めません`);
  }
}

type PdfResult = { asOf: number[]; tables: { head: string[]; rows: string[][] }[] };

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
  console.log(`${MUNICIPALITY_NAME}の空き枠状況を取り込みます`);
  console.log(`公式ページ: ${INDEX_URL}\n`);

  // 入口のページは <meta http-equiv="refresh"> で記事のページへ飛ばすだけ
  const entry = await fetchText(INDEX_URL);
  const refresh = entry.match(/http-equiv="refresh"[^>]*URL=([^"'>]+)/i);
  const articleUrl = refresh ? new URL(refresh[1].trim(), INDEX_URL).toString() : INDEX_URL;
  if (articleUrl !== INDEX_URL) console.log(`記事ページ: ${articleUrl}`);
  const html = await fetchText(articleUrl);

  // 「令和8年8月1日付空き状況（認可保育所等と地域型保育事業）」
  const links = [...html.matchAll(/<a[^>]+href="([^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => ({ url: new URL(m[1], articleUrl).toString(), text: toHalfWidth(stripTags(m[2])) }))
    .map((l) => {
      const m = l.text.match(/^令和(\d+)年(\d+)月(\d+)日付空き状況（認可保育所等と地域型保育事業）/);
      if (!m) return null;
      const year = reiwaToYear(Number(m[1]));
      const month = Number(m[2]);
      return { ...l, year, month, sortKey: year * 100 + month };
    })
    .filter((v): v is NonNullable<typeof v> => v !== null);
  if (links.length === 0) {
    fail("認可保育所等の空き状況PDFが見つかりません。ページの構成が変わった可能性があります。");
  }
  const latest = links.reduce((a, b) => (b.sortKey > a.sortKey ? b : a));
  console.log(`最新: ${latest.text}\n  ${latest.url}`);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "komae-vacancy-"));
  try {
    const r = await fetch(latest.url, { headers: { "User-Agent": UA } });
    if (!r.ok) fail(`PDFの取得に失敗しました（${r.status}）: ${latest.url}`);
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.subarray(0, 4).toString() !== "%PDF") fail(`PDFではありません: ${latest.url}`);
    const file = path.join(tmpDir, "komae.pdf");
    fs.writeFileSync(file, buf);

    let pdf: PdfResult;
    try {
      pdf = JSON.parse(runPython([EXTRACTOR, file])) as PdfResult;
    } catch (err) {
      fail(`抽出結果を読めません: ${String(err)}`);
    }

    const [ry, am, ad] = pdf.asOf;
    if (reiwaToYear(ry) !== latest.year || am !== latest.month) {
      fail(`PDFの日付（令和${ry}年${am}月）がリンクの文言（${latest.year}年${latest.month}月）と違います。`);
    }
    const asOf = `${reiwaToYear(ry)}-${String(am).padStart(2, "0")}-${String(ad).padStart(2, "0")}`;
    console.log(`基準日: ${asOf}`);

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

    for (const table of pdf.tables) {
      const head = table.head.map((h) => toHalfWidth(squeeze(h)));
      // 見出しの左端がそのまま施設の種類
      const category = squeeze(table.head[0] ?? "");
      if (!category) fail(`施設の種類が分かりません: ${table.head.join(" / ")}`);
      const ageIdx = Array.from({ length: AGE_COUNT }, (_, i) => head.indexOf(`${i}歳児`));
      if (ageIdx.some((i) => i < 0)) fail(`年齢の見出しが見つかりません: ${table.head.join(" / ")}`);
      const totalIdx = head.indexOf("合計");
      if (totalIdx < 0) fail(`「合計」の列が見つかりません: ${table.head.join(" / ")}`);
      if (!categories.includes(category)) categories.push(category);

      for (const row of table.rows) {
        const name = squeeze(row[0] ?? "");
        if (!name) continue;

        const vacancy = ageIdx.map((c) => {
          const t = toHalfWidth(squeeze(row[c] ?? ""));
          // 「-」はそのクラスを設けていない
          if (t === "" || t === "-" || t === "－" || t === "―") return null;
          if (!/^\d+$/.test(t)) fail(`${name}: 人数として読めません: 「${row[c]}」`);
          return Number(t);
        });
        const totalRaw = toHalfWidth(squeeze(row[totalIdx] ?? ""));
        if (!/^\d+$/.test(totalRaw)) fail(`${name}: 合計を読めません: 「${row[totalIdx]}」`);
        const sum = vacancy.reduce((a: number, v) => a + (v ?? 0), 0);
        if (Number(totalRaw) !== sum) fail(`${name}: 合計${totalRaw}と年齢ごとの和${sum}が合いません`);
        vacancy.forEach((v, age) => {
          builtByAge[age] += v ?? 0;
        });

        const id = `${category}-${name}`;
        if (seenId.has(id)) fail(`施設名が重複しています: ${id}`);
        seenId.add(id);
        facilities.push({ id, name, w: null, c: categories.indexOf(category), vacancy });
      }
    }

    if (facilities.length < 20) fail(`施設が${facilities.length}件しか取れていません`);

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
    if (previous?.asOf === asOf && previous?.sourceFiles?.vacancy === latest.url) {
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
      subtitle: `${latest.year}年${latest.month}月${ad}日付の空き枠`,
      notes: [
        "狛江市が公表している空き枠の数です。今後の退園などで変わることがあります。",
        "「—」はそのクラスを設けていない施設です。小規模保育事業・事業所内保育事業は2歳児までです。",
        "認証保育所と家庭福祉員（保育ママ）は別の一覧で公表されているため、この一覧には含めていません。",
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
    console.log("  1施設ずつ「年齢の和＝合計列」を確かめました");
    console.log("");
    for (const [i, cat] of categories.entries()) {
      console.log(`  ${cat} ${facilities.filter((f) => f.c === i).length}施設`);
    }
    console.log("");
    console.log("  年齢 | 空き");
    builtByAge.forEach((v, age) => console.log(`  ${age}歳児 | ${v}`));
    console.log(`  合計 | ${builtByAge.reduce((a, b) => a + b, 0)}`);
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

main().catch((err) => fail(String(err)));
