/**
 * 呉市の入所可能施設（保育所・認定こども園等）を取り込む
 *
 * 実行: npm run vacancy:fetch:kure
 *
 * ## この自治体の特徴
 * - 記号（〇＝申込できます、×＝入所できません）の2つだけ。空欄はない
 * - 地区が縦結合。2つの地区をまとめた枠はセルの中で改行して並べてある
 * - 区分（公・私・認・幼・小・事）の意味はPDFの最後の表に書いてある
 * - 更新日はPDFではなくリンクの文言にしか書かれていない
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "kure";
const MUNICIPALITY_NAME = "呉市";
const SOURCE_NAME = "呉市「保育施設等空き状況」";
const INDEX_URL = "https://kure-kosodate.com/news/720.html";
const AGE_COUNT = 6;
const UA = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";

const COL_AREA = 0;
const COL_DIVISION = 1;
const COL_NAME = 2;
const COL_AGE0 = 3;

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const EXTRACTOR = path.join(process.cwd(), "scripts", "kure-pdf-extract.py");

function fail(message: string): never {
  console.error(`\n[中断] ${message}`);
  process.exit(1);
}

function todayJst(): string {
  const jst = new Date(Date.now() + 9 * 60 * 60 * 1000);
  return jst.toISOString().slice(0, 10);
}

function toHalfWidth(s: string): string {
  return s.replace(/[０-９]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xfee0));
}

function squeeze(s: string): string {
  return (s ?? "").replace(/[\s　]/g, "");
}

function shapeOf(mark: string): string {
  if (/^[○◯〇]$/.test(mark)) return "〇";
  if (/^[×✕✖]$/.test(mark)) return "×";
  return mark;
}

function stripTags(html: string): string {
  return html.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").replace(/[\s　]+/g, " ").trim();
}

type PdfResult = {
  target: [number, number];
  reception: [number, number, number];
  legend: { mark: string; label: string }[];
  divisions: Record<string, string>;
  markCounts: Record<string, number>;
  rows: (string | string[])[][];
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

  // 「令和8年10月保育施設空き状況一覧(８月２４日更新分)」
  const links = [...html.matchAll(/<a[^>]+href="([^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => ({ url: new URL(m[1], INDEX_URL).toString(), text: toHalfWidth(stripTags(m[2])) }))
    .map((l) => {
      const m = squeeze(l.text).match(
        /令和(\d+)年(\d+)月保育施設空き状況一覧\((\d+)月(\d+)日更新分\)/
      );
      if (!m) return null;
      const [reiwa, month, updatedMonth, updatedDay] = m.slice(1, 5).map(Number);
      return { ...l, reiwa, month, updatedMonth, updatedDay, sortKey: reiwa * 100 + month };
    })
    .filter((v): v is NonNullable<typeof v> => v !== null);
  if (links.length === 0)
    fail("空き状況のPDFが見つかりません。ページの構成が変わった可能性があります。");
  const latest = links.reduce((a, b) => (b.sortKey > a.sortKey ? b : a));
  console.log(`最新: ${latest.text}\n  ${latest.url}`);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "kure-vacancy-"));
  try {
    const r = await fetch(latest.url, { headers: { "User-Agent": UA } });
    if (!r.ok) fail(`PDFの取得に失敗しました（${r.status}）: ${latest.url}`);
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.subarray(0, 4).toString() !== "%PDF") fail(`PDFではありません: ${latest.url}`);
    const file = path.join(tmpDir, "kure.pdf");
    fs.writeFileSync(file, buf);

    let pdf: PdfResult;
    try {
      pdf = JSON.parse(runPython([EXTRACTOR, file])) as PdfResult;
    } catch (err) {
      fail(`抽出結果を読めません: ${String(err)}`);
    }

    const [targetReiwa, targetMonth] = pdf.target;
    if (targetReiwa !== latest.reiwa || targetMonth !== latest.month) {
      fail(
        `PDFの表題（令和${targetReiwa}年${targetMonth}月）がリンクの文言（令和${latest.reiwa}年${latest.month}月）と違います`
      );
    }
    // 更新日はリンクの文言にしか書かれていない。年は受付開始日から補う。
    // ふつうは受付が始まった年と同じ年に更新される（令和8年8月25日受付開始 → 9月4日更新）。
    // 年をまたぐのは、年末に翌年ぶんの受付が始まったとき（令和8年12月受付開始 → 令和9年1月更新）。
    // そのときだけ更新の月が受付開始の月より小さくなるので、1年足す
    const [receptionReiwa, receptionMonth] = pdf.reception;
    const year = 2018 + receptionReiwa + (latest.updatedMonth < receptionMonth ? 1 : 0);
    const asOf = `${year}-${String(latest.updatedMonth).padStart(2, "0")}-${String(
      latest.updatedDay
    ).padStart(2, "0")}`;
    if (asOf > todayJst()) fail(`更新日（${asOf}）が今日より先になっています`);
    // 更新日が受付期間から半年以上離れていたら、年の当て方を間違えている
    const receptionDate = new Date(Date.UTC(2018 + receptionReiwa, receptionMonth - 1, 1));
    const asOfDate = new Date(`${asOf}T00:00:00Z`);
    const monthsApart = Math.abs(
      (asOfDate.getUTCFullYear() - receptionDate.getUTCFullYear()) * 12 +
        (asOfDate.getUTCMonth() - receptionDate.getUTCMonth()),
    );
    if (monthsApart > 6) {
      fail(
        `更新日（${asOf}）が受付開始（令和${receptionReiwa}年${receptionMonth}月）から` +
          `${monthsApart}か月離れています。年の当て方が違う可能性があります`,
      );
    }
    console.log(`更新日: ${asOf} / 対象: ${targetMonth}月入所`);

    const symbolLegend = pdf.legend.map((l) => ({
      mark: shapeOf(l.mark),
      label: l.label,
      open: !/ません$/.test(l.label),
    }));
    console.log(`凡例: ${symbolLegend.map((l) => `${l.mark}＝${l.label}`).join(" / ")}`);
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

    for (const row of pdf.rows) {
      const name = squeeze(String(row[COL_NAME]));
      if (!name) fail("施設名が空の行があります");
      if (seen.has(name)) fail(`施設名が重複しています: ${name}`);
      seen.add(name);

      // 地区は縦結合。値のある行から次の値まで引き継ぐ。
      // 2つの地区をまとめた枠はセルの中で改行してあるので、そのまま並べる
      const lines = (row[COL_AREA] as string[]).map(squeeze).filter(Boolean);
      if (lines.length > 0) ward = lines.join("・");
      if (!ward) fail(`${name}: 地区が分かりません`);
      if (!wards.includes(ward)) wards.push(ward);

      const division = squeeze(String(row[COL_DIVISION]));
      const category = pdf.divisions[division];
      if (!category) fail(`${name}: 区分「${division}」が説明にありません`);
      if (!categories.includes(category)) categories.push(category);

      const symbols: (string | null)[] = [];
      for (let age = 0; age < AGE_COUNT; age++) {
        const raw = squeeze(String(row[COL_AGE0 + age] ?? ""));
        const mark = legendByShape.get(shapeOf(raw));
        if (!mark) fail(`${name}: 凡例にない記号です: 「${raw}」`);
        marks.set(mark, (marks.get(mark) ?? 0) + 1);
        symbols.push(mark);
      }

      facilities.push({
        id: name,
        name,
        w: wards.indexOf(ward),
        c: categories.indexOf(category),
        vacancy: new Array(AGE_COUNT).fill(null),
        symbols,
      });
    }

    if (facilities.length < 60) fail(`施設が${facilities.length}件しか取れていません`);
    for (const [mark, count] of marks) {
      const inText = Object.entries(pdf.markCounts)
        .filter(([m]) => shapeOf(m) === shapeOf(mark))
        .reduce((acc, [, v]) => acc + v, 0);
      if (count !== inText) {
        fail(`「${mark}」の数が合いません（PDFの文字 ${inText}個 / 取り込み ${count}個）`);
      }
    }
    console.log("記号の数はPDFの文字と一致しました");

    const previous = fs.existsSync(OUT_PATH)
      ? (JSON.parse(fs.readFileSync(OUT_PATH, "utf-8")) as { asOf?: string; facilities?: unknown[] })
      : null;
    if (previous?.facilities && facilities.length < previous.facilities.length * 0.9) {
      fail(
        `施設数が大きく減っています（前回 ${previous.facilities.length}件 → 今回 ${facilities.length}件）`
      );
    }
    if (previous?.asOf === asOf) {
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
      subtitle: `${targetMonth}月入所の申込ができる施設`,
      notes: [
        "呉市は空き状況を人数ではなく記号で公表しています。当サイトでも公式の記号のまま載せています。",
        "受け入れできる人数には限りがあるため、申込状況によっては入所できない場合があります。申込多数の場合は市で利用施設を調整するため、できるだけ第4希望まで書くよう公式が案内しています。",
        "1号認定（幼稚園、認定こども園の幼稚園部分）の空き状況は施設に直接確認してください。",
        "年齢はその年度の4月1日時点のものです。",
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
