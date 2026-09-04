/**
 * 四日市市の認可保育施設の空き状況を取り込む
 *
 * 実行: npm run vacancy:fetch:yokkaichi
 *
 * ## この自治体の特徴
 * - **空きは記号**（○＝空きあり、△＝空く可能性があり、×＝空きなし）
 * - **満1歳からの施設は0歳児と1歳児の欄がひとつに結合されている**。
 *   満1歳の児童を0歳児として数え、1歳児と同じクラスで保育するため。
 *   セルの幅を見て、結合されていれば同じ記号を両方の歳児に配る
 * - 類型は縦結合。空なら1つ上の行から引き継ぐ
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "yokkaichi";
const MUNICIPALITY_NAME = "四日市市";
const SOURCE_NAME = "四日市市「認可保育施設の空き状況」";
const INDEX_URL = "https://www.city.yokkaichi.lg.jp/www/contents/1748227353748/index.html";
const AGE_COUNT = 6;
const UA = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";

const COL_KIND = 0;
const COL_NAME = 1;
const COL_ZERO = 2;

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const EXTRACTOR = path.join(process.cwd(), "scripts", "yokkaichi-pdf-extract.py");

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

function shapeOf(mark: string): string {
  if (/^[○◯〇]$/.test(mark)) return "○";
  if (/^[×✕✖]$/.test(mark)) return "×";
  return mark;
}

function stripTags(html: string): string {
  return html.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").replace(/[\s　]+/g, " ").trim();
}

type PdfRow = { values: string[]; widths: (number | null)[]; columns: number };
type PdfResult = {
  target: [number, number];
  asOf: [number, number, number];
  legend: { mark: string; label: string }[];
  markCounts: Record<string, number>;
  rows: PdfRow[];
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

  // 「令和8年9月入所の保育施設の空き状況」
  const links = [...html.matchAll(/<a[^>]+href="([^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => ({ url: new URL(m[1], INDEX_URL).toString(), text: toHalfWidth(stripTags(m[2])) }))
    .map((l) => {
      const m = squeeze(l.text).match(/令和(\d+)年(\d+)月入所の保育施設の空き状況/);
      if (!m) return null;
      const fiscalYear = reiwaToYear(Number(m[1]));
      const month = Number(m[2]);
      const year = month <= 3 ? fiscalYear + 1 : fiscalYear;
      return { ...l, reiwa: Number(m[1]), year, month, sortKey: year * 100 + month };
    })
    .filter((v): v is NonNullable<typeof v> => v !== null);
  if (links.length === 0) fail("空き状況のPDFが見つかりません。ページの構成が変わった可能性があります。");
  const latest = links.reduce((a, b) => (b.sortKey > a.sortKey ? b : a));
  console.log(`最新: ${latest.text}\n  ${latest.url}`);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "yokkaichi-vacancy-"));
  try {
    const r = await fetch(latest.url, { headers: { "User-Agent": UA } });
    if (!r.ok) fail(`PDFの取得に失敗しました（${r.status}）: ${latest.url}`);
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.subarray(0, 4).toString() !== "%PDF") fail(`PDFではありません: ${latest.url}`);
    const file = path.join(tmpDir, "yokkaichi.pdf");
    fs.writeFileSync(file, buf);

    let pdf: PdfResult;
    try {
      pdf = JSON.parse(runPython([EXTRACTOR, file])) as PdfResult;
    } catch (err) {
      fail(`抽出結果を読めません: ${String(err)}`);
    }

    const [tr, tm] = pdf.target;
    if (tr !== latest.reiwa || tm !== latest.month) {
      fail(
        `PDFの表題（令和${tr}年${tm}月）がリンクの文言（令和${latest.reiwa}年${latest.month}月）と違います`
      );
    }
    const [ar, am, ad] = pdf.asOf;
    const asOf = `${reiwaToYear(ar)}-${String(am).padStart(2, "0")}-${String(ad).padStart(2, "0")}`;
    console.log(`基準日: ${asOf} / 対象: ${latest.year}年${latest.month}月入所`);

    const order = ["○", "◯", "〇", "△", "×"];
    const symbolLegend = pdf.legend
      .filter((l) => order.includes(l.mark))
      .sort((a, b) => order.indexOf(a.mark) - order.indexOf(b.mark))
      .map((l) => ({ mark: l.mark, label: l.label, open: !/空きなし/.test(l.label) }));
    if (symbolLegend.length < 3) fail(`記号の凡例が足りません: ${JSON.stringify(pdf.legend)}`);
    console.log(`凡例: ${symbolLegend.map((l) => `${l.mark}＝${l.label}`).join(" / ")}`);
    const legendByShape = new Map(symbolLegend.map((l) => [shapeOf(l.mark), l.mark]));

    // ふつうのセル1つぶんの幅。いちばん多く出てくる幅を基準にする
    const widthCount = new Map<number, number>();
    for (const row of pdf.rows) {
      for (const w of row.widths.slice(COL_ZERO)) {
        if (w) widthCount.set(w, (widthCount.get(w) ?? 0) + 1);
      }
    }
    const unitWidth = [...widthCount.entries()].sort((a, b) => b[1] - a[1])[0]?.[0];
    if (!unitWidth) fail("セルの幅を読み取れませんでした");

    const categories: string[] = [];
    const facilities: {
      id: string;
      name: string;
      w: null;
      c: number;
      vacancy: (number | null)[];
      symbols: (string | null)[];
    }[] = [];
    const marks = new Map<string, number>();
    const seen = new Set<string>();
    let kind = "";
    let merged = 0;
    let noClass = 0;

    for (const row of pdf.rows) {
      const values = row.values;
      // 表は3通りある。列の数から、名前の欄とどの歳児が並んでいるかを決める
      let firstAge: number;
      let nameCol: number;
      let zeroCol: number;
      let ageCount: number;
      if (row.columns === 2 + AGE_COUNT) {
        firstAge = 0;
        nameCol = COL_NAME;
        zeroCol = COL_ZERO;
        ageCount = AGE_COUNT;
      } else if (row.columns === 7) {
        // 幼稚園型認定こども園（3歳児から）。類型の欄が縦書きで、名前が左端に来る
        firstAge = 3;
        nameCol = 0;
        zeroCol = 4;
        ageCount = 3;
      } else if (row.columns === 6) {
        // 地域型保育事業所（0〜2歳児）
        firstAge = 0;
        nameCol = COL_NAME;
        zeroCol = COL_ZERO;
        ageCount = 3;
      } else {
        continue;
      }
      const name = squeeze(values[nameCol]);
      if (!name || name === "施設名") continue;

      const rawKind = squeeze(values[COL_KIND]);
      if (rawKind && rawKind !== "類型") kind = rawKind;
      // 3歳児からの表は類型の欄が縦書きで読み取れない。公式の注記どおりに補う
      if (row.columns === 7) kind = "幼稚園型認定こども園";
      if (!kind) fail(`${name}: 類型が分かりません`);
      // 「幼稚園型」と「幼稚園型認定こども園」のように、途中までしか入っていない行がある
      const longer = categories.find((c) => c !== kind && c.startsWith(kind));
      if (longer) kind = longer;
      const shorter = categories.find((c) => c !== kind && kind.startsWith(c));
      if (shorter) categories[categories.indexOf(shorter)] = kind;
      if (!categories.includes(kind)) categories.push(kind);
      if (seen.has(name)) fail(`施設名が重複しています: ${name}`);
      seen.add(name);

      const symbols: (string | null)[] = new Array(AGE_COUNT).fill(null);
      for (let i = 0; i < ageCount; i++) {
        const age = firstAge + i;
        const rawCell = squeeze(values[zeroCol + i] ?? "");
        const width = row.widths[zeroCol + i];
        if (rawCell === "") {
          if (symbols[age] === null) noClass += 1;
          continue;
        }
        const mark = legendByShape.get(shapeOf(rawCell));
        if (!mark) fail(`${name}: 凡例にない記号です: 「${rawCell}」`);
        marks.set(mark, (marks.get(mark) ?? 0) + 1);
        symbols[age] = mark;
        // 0歳児と1歳児がひとつの欄になっている施設は、同じ記号を両方に配る
        if (width && width > unitWidth * 1.5 && age + 1 < AGE_COUNT) {
          symbols[age + 1] = mark;
          merged += 1;
          noClass -= 1;
        }
      }
      if (symbols.filter((s) => s !== null).length === 0) {
        fail(`${name}: 全てのクラスが空です`);
      }

      facilities.push({
        id: name,
        name,
        w: null,
        c: categories.indexOf(kind),
        vacancy: new Array(AGE_COUNT).fill(null),
        symbols,
      });
    }

    if (facilities.length < 50) fail(`施設が${facilities.length}件しか取れていません`);
    for (const item of symbolLegend) {
      if (!marks.has(item.mark)) fail(`凡例にある「${item.mark}」が表に1つも出てきません`);
    }
    // 記号の数がPDFの文字と合っているか（結合した欄は1つとして数える）
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
      subtitle: `${latest.year}年${latest.month}月入所の空き状況`,
      notes: [
        "四日市市は空きを人数ではなく記号で公表しています。当サイトでも公式の記号のまま載せています。",
        "在園児の退所や入所辞退、保育士の配置状況等により空き状況は変わることがあります。空きがあっても入所を約束するものではありません。",
        "施設名に「（満1歳から）」とある施設は、公式の表で0歳児と1歳児の欄がひとつにまとまっています。当サイトでは同じ記号を両方の歳児に載せています。",
        "年齢はその年度の4月1日時点を基準としたクラス年齢です。",
        "認定こども園の「教育認定」の空き状況は、各施設へ直接お問い合わせください。",
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
    console.log(`  ${facilities.length}施設 / ${categories.length}類型（${categories.join("・")}）`);
    console.log(`  0歳児と1歳児がひとつの欄だった施設: ${merged}`);
    console.log(`  空欄だった歳児: ${noClass}`);
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
