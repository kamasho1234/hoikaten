/**
 * 明石市の保育施設の受入予定児童数を取り込む
 *
 * 実行: npm run vacancy:fetch:akashi
 *
 * ## この自治体の特徴
 * - **空きは記号**（○＝5名以上、△＝3〜4名、▲＝1〜2名、×＝受入れ無し）
 * - その園にないクラスは空欄
 * - 過去ぶんも同じページに並ぶので、選考月がいちばん新しいものを選ぶ
 * - 検算は、表の部分に印字された記号の数と突き合わせる
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "akashi";
const MUNICIPALITY_NAME = "明石市";
const SOURCE_NAME = "明石市「受入予定児童数一覧表」";
const INDEX_URL =
  "https://www.city.akashi.lg.jp/kodomo/ikusei_shitsu/kodomo-kyoiku/kosodate/hoikujo/ukeireyoteijidou.html";
const AGE_COUNT = 6;
const UA = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";

const COL_NAME = 0;
const COL_ZERO = 1;

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const EXTRACTOR = path.join(process.cwd(), "scripts", "akashi-pdf-extract.py");

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

function squeeze(s: string): string {
  return (s ?? "").replace(/[\s　]/g, "");
}

function stripTags(html: string): string {
  return html.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").replace(/[\s　]+/g, " ").trim();
}

type PdfResult = {
  target: [number, number, number];
  asOf: [number, number, number];
  legend: { mark: string; label: string }[];
  markCounts: Record<string, number>;
  rows: string[][];
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
  console.log(`${MUNICIPALITY_NAME}の受入予定児童数を取り込みます`);
  console.log(`公式ページ: ${INDEX_URL}\n`);

  const res = await fetch(INDEX_URL, { headers: { "User-Agent": UA } });
  if (!res.ok) fail(`公式ページが ${res.status} を返しました`);
  const html = await res.text();

  // 「2026年度10月選考受入予定児童数一覧表(令和8年8月時点)（PDF：674KB）」
  const links = [...html.matchAll(/<a[^>]+href="([^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => ({ url: new URL(m[1], INDEX_URL).toString(), text: toHalfWidth(stripTags(m[2])) }))
    .map((l) => {
      // 「2026年度10月選考」（年度）と「2026年1月選考」（西暦）が混ざる。
      // 「2024年度(2025年)1月選考」のように括弧で西暦を書いていることもある
      const m = l.text.match(
        /^(\d{4})年(度)?(?:[（(](\d{4})年[）)])?(\d+)月(?:\d次)?選考受入予定児童数一覧表\(令和(\d+)年(\d+)月時点\)/
      );
      if (!m) return null;
      const month = Number(m[4]);
      const stated = m[3] ? Number(m[3]) : null;
      const base = Number(m[1]);
      const year = stated ?? (m[2] && month <= 3 ? base + 1 : base);
      return { ...l, year, month, sortKey: year * 100 + month };
    })
    .filter((v): v is NonNullable<typeof v> => v !== null);
  if (links.length === 0) fail("受入予定児童数一覧表のPDFが見つかりません。ページの構成が変わった可能性があります。");
  const latest = links.reduce((a, b) => (b.sortKey > a.sortKey ? b : a));
  console.log(`最新: ${latest.text}\n  ${latest.url}`);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "akashi-vacancy-"));
  try {
    const r = await fetch(latest.url, { headers: { "User-Agent": UA } });
    if (!r.ok) fail(`PDFの取得に失敗しました（${r.status}）: ${latest.url}`);
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.subarray(0, 4).toString() !== "%PDF") fail(`PDFではありません: ${latest.url}`);
    const file = path.join(tmpDir, "akashi.pdf");
    fs.writeFileSync(file, buf);

    let pdf: PdfResult;
    try {
      pdf = JSON.parse(runPython([EXTRACTOR, file])) as PdfResult;
    } catch (err) {
      fail(`抽出結果を読めません: ${String(err)}`);
    }

    const [ty, tm] = pdf.target;
    if (ty !== latest.year || tm !== latest.month) {
      fail(
        `PDFの表題（${ty}年${tm}月）がリンクの文言（${latest.year}年${latest.month}月）と違います`
      );
    }
    const [ry, am, ad] = pdf.asOf;
    const asOf = `${reiwaToYear(ry)}-${String(am).padStart(2, "0")}-${String(ad).padStart(2, "0")}`;
    console.log(`基準日: ${asOf} / 対象: ${latest.year}年${latest.month}月選考`);

    const symbolLegend = pdf.legend.map((l) => ({
      mark: l.mark,
      label: l.label,
      open: !/^[×✕]$/.test(l.mark),
    }));
    console.log(`凡例: ${symbolLegend.map((l) => `${l.mark}＝${l.label}`).join(" / ")}`);
    const knownMarks = new Set(symbolLegend.map((l) => l.mark));

    const facilities: {
      id: string;
      name: string;
      w: null;
      c: null;
      vacancy: (number | null)[];
      symbols: (string | null)[];
    }[] = [];
    const marks = new Map<string, number>();
    const seen = new Set<string>();
    let noClass = 0;

    for (const row of pdf.rows) {
      if (row.length < COL_ZERO + AGE_COUNT) continue;
      const name = squeeze(row[COL_NAME]);
      if (!name || name === "園名") continue;
      // 見出しの2行め（0歳〜5歳）は園名の欄が空なので、ここには来ない
      if (toHalfWidth(squeeze(row[COL_ZERO])) === "0歳") continue;
      if (seen.has(name)) fail(`園名が重複しています: ${name}`);
      seen.add(name);

      const symbols: (string | null)[] = [];
      for (let age = 0; age < AGE_COUNT; age++) {
        const raw = squeeze(row[COL_ZERO + age] ?? "");
        if (raw === "") {
          noClass += 1;
          symbols.push(null);
          continue;
        }
        if (!knownMarks.has(raw)) fail(`${name}: 凡例にない記号です: 「${raw}」`);
        marks.set(raw, (marks.get(raw) ?? 0) + 1);
        symbols.push(raw);
      }
      if (symbols.every((s) => s === null)) fail(`${name}: 全てのクラスが空です`);

      facilities.push({
        id: name,
        name,
        w: null,
        c: null,
        vacancy: new Array(AGE_COUNT).fill(null),
        symbols,
      });
    }

    if (facilities.length < 100) fail(`施設が${facilities.length}件しか取れていません`);
    // 表の部分に印字されている記号の数と突き合わせる
    for (const item of symbolLegend) {
      const got = marks.get(item.mark) ?? 0;
      const inText = pdf.markCounts[item.mark] ?? 0;
      if (got !== inText) {
        fail(`「${item.mark}」の数が合いません（PDFの文字 ${inText}個 / 取り込み ${got}個）`);
      }
    }
    console.log("記号の数はPDFの文字と一致しました");

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
      subtitle: `${latest.year}年${latest.month}月選考の受入予定`,
      notes: [
        "明石市は受入予定を人数ではなく記号で公表しています。当サイトでも公式の記号のまま載せています。",
        "受入予定児童数は施設の状況に応じて増減します。受入予定に関わらず、希望する施設はすべて申し込むよう明石市は案内しています。",
        "その園にないクラスは「—」にしています。",
      ],
      wards: [],
      categories: [],
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
    console.log(`  ${facilities.length}施設 / その園にないクラス ${noClass}`);
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
