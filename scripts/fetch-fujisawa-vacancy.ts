/**
 * 藤沢市のクラス別空き状況を取り込む
 *
 * 実行: npm run vacancy:fetch:fujisawa
 *
 * ## この自治体の特徴
 * - **空きを人数ではなく記号で公表している**（〇＝定員に空きがある、―＝空きがない、
 *   ※＝定員上は空きがあるが施設の都合で受け入れできなかった）。記号のまま持って記号のまま見せる
 * - 凡例はPDFの1ページめの本文にある
 * - 見出しの左端がそのまま施設の種類（公立・法人立・小規模保育事業）
 * - 小規模保育事業の表は2歳児クラスまで
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "fujisawa";
const MUNICIPALITY_NAME = "藤沢市";
const SOURCE_NAME = "藤沢市「クラス別空き状況」";
const INDEX_URL =
  "https://www.city.fujisawa.kanagawa.jp/hoiku/kenko/kosodate/hoikuen/nyushojokyo.html";
const AGE_COUNT = 6;

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const EXTRACTOR = path.join(process.cwd(), "scripts", "fujisawa-pdf-extract.py");

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
  return html.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").replace(/[\s　]+/g, " ").trim();
}

function squeeze(s: string): string {
  return (s ?? "").replace(/[\s　]/g, "");
}

/** 丸と横棒は書き方がまちまちなので1つにそろえる */
function normalizeMark(mark: string): string {
  const t = squeeze(mark);
  if (/^[○◯〇]$/.test(t)) return "〇";
  if (/^[-－―‐‒–—ー−]$/.test(t)) return "―";
  if (/^[※*]$/.test(t)) return "※";
  return t;
}

type PdfTable = { head: string[]; rows: string[][] };
type PdfResult = {
  target: number[];
  asOf: number[] | null;
  legend: string[];
  tables: PdfTable[];
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

async function main() {
  console.log(`${MUNICIPALITY_NAME}の空き状況を取り込みます`);
  console.log(`公式ページ: ${INDEX_URL}\n`);

  const ua = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";
  const res = await fetch(INDEX_URL, { headers: { "User-Agent": ua } });
  if (!res.ok) fail(`公式ページが ${res.status} を返しました`);
  const html = await res.text();

  // 「令和8年9月クラス別空き状況（令和8年8月20日時点）.pdf（PDF：256KB）」
  const links = [...html.matchAll(/<a[^>]+href="([^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => ({ url: new URL(m[1], INDEX_URL).toString(), text: toHalfWidth(stripTags(m[2])) }))
    .map((l) => {
      const m = l.text.match(/^令和(\d+)年(\d+)月クラス別空き状況/);
      if (!m) return null;
      const fiscalYear = reiwaToYear(Number(m[1]));
      const month = Number(m[2]);
      const year = month <= 3 ? fiscalYear + 1 : fiscalYear;
      const asOf = l.text.match(/（令和(\d+)年(\d+)月(\d+)日時点）/);
      return { ...l, year, month, asOf, sortKey: year * 100 + month };
    })
    .filter((v): v is NonNullable<typeof v> => v !== null);
  if (links.length === 0) fail("空き状況のPDFが見つかりません。ページの構成が変わった可能性があります。");
  const latest = links.reduce((a, b) => (b.sortKey > a.sortKey ? b : a));
  console.log(`最新: ${latest.text}\n  ${latest.url}`);
  if (!latest.asOf) fail("リンクの文言から時点を読み取れませんでした");
  const asOf = [
    reiwaToYear(Number(latest.asOf[1])),
    String(latest.asOf[2]).padStart(2, "0"),
    String(latest.asOf[3]).padStart(2, "0"),
  ].join("-");

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "fujisawa-vacancy-"));
  try {
    const r = await fetch(latest.url, { headers: { "User-Agent": ua } });
    if (!r.ok) fail(`PDFの取得に失敗しました（${r.status}）: ${latest.url}`);
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.subarray(0, 4).toString() !== "%PDF") fail(`PDFではありません: ${latest.url}`);
    const file = path.join(tmpDir, "fujisawa.pdf");
    fs.writeFileSync(file, buf);

    let pdf: PdfResult;
    try {
      pdf = JSON.parse(runPython([EXTRACTOR, file])) as PdfResult;
    } catch (err) {
      fail(`抽出結果を読めません: ${String(err)}`);
    }

    const [ty, tm] = pdf.target;
    if (tm !== latest.month) {
      fail(`PDFの対象月（${tm}月）がリンクの文言（${latest.month}月）と違います。`);
    }
    console.log(`基準日: ${asOf} / 対象: 令和${ty}年${tm}月`);

    // 凡例の行（「〇 ・・・ クラス定員に空きがある（…）」）を記号と意味に分ける
    const symbolLegend = pdf.legend
      .map((line) => {
        const matched = line.match(/^([〇○◯―－※*])\s*・・・\s*(.+)$/);
        if (!matched) return null;
        const mark = normalizeMark(matched[1]);
        // 括弧の中は長い補足なので、意味の要点だけを取る
        const label = squeeze(matched[2].replace(/[（(].*$/, ""));
        return { mark, label, open: mark !== "―" };
      })
      .filter((v): v is { mark: string; label: string; open: boolean } => v !== null);
    if (symbolLegend.length < 2) fail("記号の凡例を読み取れませんでした");
    console.log(`凡例: ${symbolLegend.map((l) => `${l.mark}＝${l.label}`).join(" / ")}`);

    const categories: string[] = [];
    const facilities: {
      id: string;
      name: string;
      w: null;
      c: number;
      vacancy: (number | null)[];
      symbols: (string | null)[];
    }[] = [];
    const seenId = new Set<string>();
    const marks = new Map<string, number>();

    for (const table of pdf.tables) {
      const head = table.head.map((h) => toHalfWidth(squeeze(h)));
      const category = head[0];
      if (!category) fail(`施設の種類が分かりません: ${table.head.join(" / ")}`);
      const ageIdx = Array.from({ length: AGE_COUNT }, (_, age) =>
        head.indexOf(`${age}歳児クラス`)
      );
      if (ageIdx[0] < 0) fail(`年齢の見出しが見つかりません: ${table.head.join(" / ")}`);
      if (!categories.includes(category)) categories.push(category);

      for (const row of table.rows) {
        const name = squeeze(row[0] ?? "");
        if (!name) continue;
        // ページをまたぐと見出しの行がもう一度出てくる
        if (name === category || squeeze(row[1] ?? "") === "住所") continue;

        const symbols = ageIdx.map((c) => {
          // 小規模保育事業の表には3歳以上の列がない
          if (c < 0) return null;
          const mark = normalizeMark(row[c] ?? "");
          if (mark === "") return null;
          if (!symbolLegend.some((l) => l.mark === mark)) {
            fail(`${name}: 凡例にない記号です: 「${row[c]}」`);
          }
          marks.set(mark, (marks.get(mark) ?? 0) + 1);
          return mark;
        });

        const id = `${category}-${name}`;
        if (seenId.has(id)) fail(`施設名が重複しています: ${id}`);
        seenId.add(id);
        facilities.push({
          id,
          name,
          w: null,
          c: categories.indexOf(category),
          vacancy: new Array(AGE_COUNT).fill(null),
          symbols,
        });
      }
    }

    if (facilities.length < 90) fail(`施設が${facilities.length}件しか取れていません`);
    for (const item of symbolLegend) {
      if (!marks.has(item.mark)) {
        console.log(`  [注意] 凡例にある「${item.mark}」は今回の表に出てきませんでした`);
      }
    }

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
      metrics: ["symbol"],
      subtitle: `${latest.year}年${latest.month}月入所の調整を行った時点の空き状況`,
      notes: [
        "藤沢市は空きを人数ではなく記号で公表しています。当サイトでも公式の記号のまま載せています。",
        "退園や内定辞退、施設の都合などにより、次の月の入所審査の時点では空き状況が変わっていることがあります。",
        "「※」は定員上は空きがあるものの、保育士不足や施設の改修などの事情で受け入れができなかったクラスです。最新の状況は希望する施設に直接お問い合わせください。",
        "「—」はそのクラスを設けていない施設です。小規模保育事業などは2歳児クラスまでです。",
      ],
      wards: [],
      categories,
      symbolLegend,
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
    console.log("");
    for (const [i, cat] of categories.entries()) {
      console.log(`  ${cat} ${facilities.filter((f) => f.c === i).length}施設`);
    }
    console.log("");
    console.log("  記号の出てきた数");
    for (const item of symbolLegend) {
      console.log(`  ${item.mark}（${item.label}） ${marks.get(item.mark) ?? 0}`);
    }
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

main().catch((err) => fail(String(err)));
