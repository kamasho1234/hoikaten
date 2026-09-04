/**
 * 水戸市の保育所等の受入れ見込み状況と申込み状況を取り込む
 *
 * 実行: npm run vacancy:fetch:mito
 *
 * ## この自治体の特徴
 * - **受入れ見込みは記号**（×＝0人、△＝1〜4人、○＝5人〜）だが、
 *   **申込み人数は実数**で出している。記号は記号のまま、申込みは人数として持つ
 * - **施設ごとに2行**。上段が受入れ見込みの記号、下段が申込み人数（第一希望のみ）
 * - 見出しは1ページめだけで、2ページめ以降は施設の行から始まる
 * - 申込み人数は第一希望だけを数えたもので、広域利用を希望する児童は除かれている
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "mito";
const MUNICIPALITY_NAME = "水戸市";
const SOURCE_NAME = "水戸市「受入れ見込み状況及び申込み状況」";
const INDEX_URL = "https://www.city.mito.lg.jp/site/kosodate/3294.html";
const AGE_COUNT = 6;

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const EXTRACTOR = path.join(process.cwd(), "scripts", "mito-pdf-extract.py");

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

function normalizeMark(mark: string): string {
  const t = squeeze(mark);
  if (/^[○◯〇]$/.test(t)) return "○";
  if (/^[△▲]$/.test(t)) return "△";
  if (/^[×✕✖x]$/i.test(t)) return "×";
  return t;
}

type PdfResult = {
  target: number[];
  asOf: number[];
  legend: string;
  head: string[];
  sub: string[];
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
  console.log(`${MUNICIPALITY_NAME}の受入れ見込み状況を取り込みます`);
  console.log(`公式ページ: ${INDEX_URL}\n`);

  const ua = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";
  const res = await fetch(INDEX_URL, { headers: { "User-Agent": ua } });
  if (!res.ok) fail(`公式ページが ${res.status} を返しました`);
  const html = await res.text();

  // 「令和8年度9月受入れ見込み状況及び申込み状況 [PDFファイル／205KB]」
  const links = [...html.matchAll(/<a[^>]+href="([^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => ({ url: new URL(m[1], INDEX_URL).toString(), text: toHalfWidth(stripTags(m[2])) }))
    .map((l) => {
      const m = l.text.match(/^令和(\d+)年度(\d+)月受入れ見込み状況/);
      if (!m) return null;
      const fiscalYear = reiwaToYear(Number(m[1]));
      const month = Number(m[2]);
      const year = month <= 3 ? fiscalYear + 1 : fiscalYear;
      return { ...l, year, month, sortKey: year * 100 + month };
    })
    .filter((v): v is NonNullable<typeof v> => v !== null);
  if (links.length === 0) fail("受入れ見込み状況のPDFが見つかりません。ページの構成が変わった可能性があります。");
  const latest = links.reduce((a, b) => (b.sortKey > a.sortKey ? b : a));
  console.log(`最新: ${latest.text}\n  ${latest.url}`);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "mito-vacancy-"));
  try {
    const r = await fetch(latest.url, { headers: { "User-Agent": ua } });
    if (!r.ok) fail(`PDFの取得に失敗しました（${r.status}）: ${latest.url}`);
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.subarray(0, 4).toString() !== "%PDF") fail(`PDFではありません: ${latest.url}`);
    const file = path.join(tmpDir, "mito.pdf");
    fs.writeFileSync(file, buf);

    let pdf: PdfResult;
    try {
      pdf = JSON.parse(runPython([EXTRACTOR, file])) as PdfResult;
    } catch (err) {
      fail(`抽出結果を読めません: ${String(err)}`);
    }

    const [, tm] = pdf.target;
    if (tm !== latest.month) {
      fail(`PDFの対象月（${tm}月）がリンクの文言（${latest.month}月）と違います。`);
    }
    const [ry, am, ad] = pdf.asOf;
    const asOf = `${reiwaToYear(ry)}-${String(am).padStart(2, "0")}-${String(ad).padStart(2, "0")}`;
    console.log(`基準日: ${asOf} / 対象: ${latest.year}年${latest.month}月`);

    // 「×＝0人、△＝1～4人、○＝5人～の受入れを見込んでいます」
    const legendFlat = toHalfWidth(squeeze(pdf.legend));
    const legendMatch = legendFlat.match(/×＝(.+?)、[△▲]＝(.+?)、[○◯〇]＝(.+?)の受入れ/);
    if (!legendMatch) fail(`記号の凡例を読み取れませんでした: ${pdf.legend}`);
    const symbolLegend = [
      { mark: "○", label: `${legendMatch[3]}の受入れ見込み`, open: true },
      { mark: "△", label: `${legendMatch[2]}の受入れ見込み`, open: true },
      { mark: "×", label: `${legendMatch[1]}の受入れ見込み`, open: false },
    ];
    console.log(`凡例: ${symbolLegend.map((l) => `${l.mark}＝${l.label}`).join(" / ")}`);

    const sub = pdf.sub.map((h) => toHalfWidth(squeeze(h)));
    const ageIdx = Array.from({ length: AGE_COUNT }, (_, age) => sub.indexOf(`${age}歳`));
    if (ageIdx.some((i) => i < 0)) fail(`年齢の見出しが見つかりません: ${pdf.sub.join(" / ")}`);
    const head = pdf.head.map((h) => squeeze(h));
    const nameIdx = head.indexOf("施設名");
    if (nameIdx < 0) fail(`施設名の列が分かりません: ${pdf.head.join(" / ")}`);

    const facilities: {
      id: string;
      name: string;
      w: null;
      c: null;
      vacancy: (number | null)[];
      waiting: (number | null)[];
      symbols: (string | null)[];
    }[] = [];
    const seenId = new Set<string>();
    const marks = new Map<string, number>();
    let waitingTotal = 0;

    for (let i = 0; i < pdf.rows.length; i++) {
      const row = pdf.rows[i];
      // 施設名に「※令和12年度末で廃止予定」のような但し書きが続くことがある
      const name = squeeze(row[nameIdx] ?? "").replace(/※.*$/, "");
      if (!name) continue;
      if (name === "施設名") continue;

      const symbols = ageIdx.map((c) => {
        const value = normalizeMark(row[c] ?? "");
        if (value === "") return null;
        if (!symbolLegend.some((l) => l.mark === value)) {
          fail(`${name}: 凡例にない記号です: 「${row[c]}」`);
        }
        marks.set(value, (marks.get(value) ?? 0) + 1);
        return value;
      });

      // 次の行が申込み人数（施設名が空の行）
      const next = pdf.rows[i + 1];
      const isApplicantRow = next && squeeze(next[nameIdx] ?? "") === "";
      const waiting = ageIdx.map((c) => {
        if (!isApplicantRow) return null;
        const t = toHalfWidth(squeeze(next[c] ?? ""));
        if (t === "") return null;
        if (!/^\d+$/.test(t)) fail(`${name}: 申込み人数として読めません: 「${next[c]}」`);
        return Number(t);
      });
      if (isApplicantRow) i++;
      waitingTotal += waiting.reduce((a: number, v) => a + (v ?? 0), 0);

      const id = name;
      if (seenId.has(id)) fail(`施設名が重複しています: ${id}`);
      seenId.add(id);
      facilities.push({
        id,
        name,
        w: null,
        c: null,
        vacancy: new Array(AGE_COUNT).fill(null),
        waiting,
        symbols,
      });
    }

    if (facilities.length < 60) fail(`施設が${facilities.length}件しか取れていません`);
    for (const item of symbolLegend) {
      if (!marks.has(item.mark)) fail(`凡例にある「${item.mark}」が表に1つも出てきません`);
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
      metrics: ["symbol", "waiting"],
      subtitle: `${latest.year}年${latest.month}月の受入れ見込みと申込み状況`,
      waitingCaveat:
        "申込み人数は第一希望として申し込んでいる方の数です。広域利用を希望している児童は含まれていません。",
      notes: [
        "水戸市は受入れ見込みを人数ではなく記号で公表しています。当サイトでも公式の記号のまま載せています。",
        "この表の人数は、前の月の受入れ状況や当月の退所予定から見込んだものです。このとおりに受け入れができない場合があります。",
        "受入れ見込みが「×」でも、在所児の退所や転所などにより受け入れできる場合があります。希望があればお申し込みください。",
        "児童の年齢は令和8年4月1日時点の年齢です。満3歳児入園は3歳の欄をご覧ください。",
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
    console.log(`  ${facilities.length}施設 / 申込み人数の合計 ${waitingTotal}`);
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
