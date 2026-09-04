/**
 * 鹿児島市の認可保育所等（2・3号）の空き状況を取り込む
 *
 * 実行: npm run vacancy:fetch:kagoshima
 *
 * ## この自治体の特徴
 * - **空きは記号**（○＝受け入れが可能、×＝受入が困難）の2つだけ
 * - その施設にないクラスは空欄
 * - 地区は縦結合。空なら1つ上の行から引き継ぐ
 * - 施設名の頭に「☆」が付くことがある（幼保連携型認定こども園へ移行予定の保育所）
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "kagoshima";
const MUNICIPALITY_NAME = "鹿児島市";
const SOURCE_NAME = "鹿児島市「保育施設空き状況一覧」";
const INDEX_URL =
  "https://www.city.kagoshima.lg.jp/kosodate/hoiku/kosodate/kosodate/hoikusho/hoikusho/hoikusisetuaki.html";
const AGE_COUNT = 6;
const UA = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";

const COL_WARD = 0;
const COL_KIND = 1;
const COL_NAME = 2;
const COL_ZERO = 7;

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const EXTRACTOR = path.join(process.cwd(), "scripts", "kagoshima-pdf-extract.py");

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

/** 表と凡例とで丸の字体が違う（○と〇）ので、凡例の書き方にそろえる */
function shapeOf(mark: string): string {
  if (/^[○◯〇]$/.test(mark)) return "○";
  if (/^[×✕✖]$/.test(mark)) return "×";
  return mark;
}

function stripTags(html: string): string {
  return html.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").replace(/[\s　]+/g, " ").trim();
}

type PdfResult = {
  target: [number, number];
  asOf: [number, number];
  legend: { mark: string; label: string }[];
  markCounts: Record<string, number>;
  rows: string[][];
};

function runPython(args: string[]): string {
  const candidates = process.env.PYTHON ? [process.env.PYTHON] : ["python3", "python"];
  let lastError = "";
  for (const bin of candidates) {
    try {
      return execFileSync(bin, args, { encoding: "utf-8", maxBuffer: 128 * 1024 * 1024 });
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

  const res = await fetch(INDEX_URL, { headers: { "User-Agent": UA } });
  if (!res.ok) fail(`公式ページが ${res.status} を返しました`);
  const html = await res.text();

  // 「令和8年度7月期選考（令和8年9月利用分）認可保育所等（2・3号）空き状況一覧※令和8年7月24日現在」
  const links = [...html.matchAll(/<a[^>]+href="([^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => ({ url: new URL(m[1], INDEX_URL).toString(), text: toHalfWidth(stripTags(m[2])) }))
    .map((l) => {
      const m = l.text.match(
        /令和(\d+)年度(\d+)月期選考（令和(\d+)年(\d+)月利用分）認可保育所等（2・3号）空き状況一覧/
      );
      if (!m) return null;
      const useYear = reiwaToYear(Number(m[3]));
      const useMonth = Number(m[4]);
      return {
        ...l,
        reiwa: Number(m[1]),
        term: Number(m[2]),
        useYear,
        useMonth,
        sortKey: useYear * 100 + useMonth,
      };
    })
    .filter((v): v is NonNullable<typeof v> => v !== null);
  if (links.length === 0) fail("空き状況一覧のPDFが見つかりません。ページの構成が変わった可能性があります。");
  const latest = links.reduce((a, b) => (b.sortKey > a.sortKey ? b : a));
  console.log(`最新: ${latest.text}\n  ${latest.url}`);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "kagoshima-vacancy-"));
  try {
    const r = await fetch(latest.url, { headers: { "User-Agent": UA } });
    if (!r.ok) fail(`PDFの取得に失敗しました（${r.status}）: ${latest.url}`);
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.subarray(0, 4).toString() !== "%PDF") fail(`PDFではありません: ${latest.url}`);
    const file = path.join(tmpDir, "kagoshima.pdf");
    fs.writeFileSync(file, buf);

    let pdf: PdfResult;
    try {
      pdf = JSON.parse(runPython([EXTRACTOR, file])) as PdfResult;
    } catch (err) {
      fail(`抽出結果を読めません: ${String(err)}`);
    }

    const [tr, tt] = pdf.target;
    if (tr !== latest.reiwa || tt !== latest.term) {
      fail(
        `PDFの表題（令和${tr}年度${tt}月期）がリンクの文言（令和${latest.reiwa}年度${latest.term}月期）と違います`
      );
    }
    // 基準日は月日だけ。利用月の前月より前に出るので、年をまたぐときは1つ前の年になる
    const [am, ad] = pdf.asOf;
    const asOfYear = am > latest.useMonth ? latest.useYear - 1 : latest.useYear;
    const asOf = `${asOfYear}-${String(am).padStart(2, "0")}-${String(ad).padStart(2, "0")}`;
    console.log(`基準日: ${asOf} / 対象: ${latest.useYear}年${latest.useMonth}月利用分`);

    const symbolLegend = pdf.legend.map((l) => ({
      mark: l.mark,
      // 「…可能な年齢には」の言い方なので、末尾の「な」を落として読みやすくする
      label: l.label.replace(/な$/, ""),
      open: !/困難/.test(l.label),
    }));
    // 空きのある記号を先に並べる
    symbolLegend.sort((a, b) => Number(b.open) - Number(a.open));
    console.log(`凡例: ${symbolLegend.map((l) => `${l.mark}＝${l.label}`).join(" / ")}`);
    // 表に出てくる字体を凡例の記号に読み替える
    const legendByShape = new Map(symbolLegend.map((l) => [shapeOf(l.mark), l.mark]));

    const wards: string[] = [];
    const categories: string[] = [];
    const facilities: {
      id: string;
      name: string;
      w: number;
      c: number;
      vacancy: (number | null)[];
      symbols: (string | null)[];
    }[] = [];
    const marks = new Map<string, number>();
    const seen = new Set<string>();
    let ward = "";
    let noClass = 0;

    for (const row of pdf.rows) {
      const rawWard = squeeze(row[COL_WARD]);
      const kind = squeeze(row[COL_KIND]);
      // 施設名の頭に付く「☆」は、認定こども園へ移行予定という印
      const name = squeeze(row[COL_NAME]).replace(/^[☆★]/, "");
      if (rawWard === "地区" || kind === "区分") continue;
      if (!name || !kind) continue;

      if (rawWard) ward = rawWard;
      if (!ward) fail(`${name}: 地区が分かりません`);
      if (!wards.includes(ward)) wards.push(ward);
      if (!categories.includes(kind)) categories.push(kind);

      const id = `${ward}-${name}`;
      if (seen.has(id)) fail(`施設が重複しています: ${id}`);
      seen.add(id);

      const symbols: (string | null)[] = [];
      for (let age = 0; age < AGE_COUNT; age++) {
        const rawCell = squeeze(row[COL_ZERO + age] ?? "");
        if (rawCell === "") {
          noClass += 1;
          symbols.push(null);
          continue;
        }
        const raw = legendByShape.get(shapeOf(rawCell));
        if (!raw) fail(`${ward} ${name}: 凡例にない記号です: 「${rawCell}」`);
        marks.set(raw, (marks.get(raw) ?? 0) + 1);
        symbols.push(raw);
      }
      if (symbols.filter((s) => s !== null).length === 0) {
        fail(`${ward} ${name}: 全てのクラスが空です`);
      }

      facilities.push({
        id,
        name,
        w: wards.indexOf(ward),
        c: categories.indexOf(kind),
        vacancy: new Array(AGE_COUNT).fill(null),
        symbols,
      });
    }

    if (facilities.length < 150) fail(`施設が${facilities.length}件しか取れていません`);
    for (const item of symbolLegend) {
      if (!marks.has(item.mark)) fail(`凡例にある「${item.mark}」が表に1つも出てきません`);
    }
    // 表の部分に印字されている数と突き合わせる（○と〇のような字の違いはまとめて見る）
    const inText = new Map<string, number>();
    for (const [mark, count] of Object.entries(pdf.markCounts)) {
      const key = shapeOf(mark);
      inText.set(key, (inText.get(key) ?? 0) + count);
    }
    for (const [mark, count] of marks) {
      const key = shapeOf(mark);
      if (count !== (inText.get(key) ?? 0)) {
        fail(`「${mark}」の数が合いません（PDFの文字 ${inText.get(key) ?? 0}個 / 取り込み ${count}個）`);
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
      subtitle: `${latest.useYear}年${latest.useMonth}月利用分の空き状況`,
      notes: [
        "鹿児島市は空きを人数ではなく記号で公表しています。当サイトでも公式の記号のまま載せています。",
        "調査時点の空き状況です。園の状況（職員配置・保育室の面積等）や退所等により変わることがあります。",
        "空きがある場合でも、保育の必要性の高い方から順に利用が決まります。空きがない場合でも、退所等により受け入れが可能になることがあります。",
        "幼稚園型認定こども園は満3歳児からの受け入れです。満3歳児で申し込む場合は「2歳児」の空き状況をご覧ください。",
        "その施設にないクラスは「—」にしています。",
      ],
      wards,
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
    console.log(`  ${facilities.length}施設 / ${wards.length}地区 / ${categories.length}区分`);
    console.log(`  その施設にないクラス: ${noClass}`);
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
