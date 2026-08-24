/**
 * 宇都宮市の教育・保育施設等の受入れ状況を取り込む
 *
 * 実行: npm run vacancy:fetch:utsunomiya
 *
 * ## この自治体の特徴
 * - 記号（○＝4名以上、△＝1〜3名、×＝0名、／＝利用できません）。凡例はPDFの表に入っている
 * - 「令和8年9月ぶんの受入れ状況（令和8年7月24日現在）」のように対象月と基準日が別
 * - 年度ページ → 月別ページ → PDF の3段でたどる。**年度が変わるとページのIDが変わる**ので
 *   文言でたどること
 * - NO.が1から欠けずに続くので、それと記号の数の2通りで検算できる
 * - 送迎保育ステーション事業は施設一覧ではないので載せない
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "utsunomiya";
const MUNICIPALITY_NAME = "宇都宮市";
const SOURCE_NAME = "宇都宮市「教育・保育施設等受入れ状況一覧」";
const INDEX_URL =
  "https://www.city.utsunomiya.lg.jp/kosodate/kosodate/1035002/hoiku/nyusho/index.html";
const AGE_COUNT = 6;
const MIN_FACILITIES = 150;
const UA = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const EXTRACTOR = path.join(process.cwd(), "scripts", "utsunomiya-pdf-extract.py");

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
  return (s ?? "").replace(/<[^>]+>/g, "").replace(/[\s　]/g, "");
}

/** 記号の形をそろえる（◯〇○、✕×、/／ の書き分けを吸収する） */
function shapeOf(mark: string): string {
  if (/^[○◯〇]$/.test(mark)) return "○";
  if (/^[×✕✖]$/.test(mark)) return "×";
  if (/^[／/]$/.test(mark)) return "／";
  return mark;
}

type PdfRow = {
  no: number;
  kubun: string;
  name: string;
  town: string;
  marks: string[];
  closed: boolean;
};

type PdfResult = {
  asOf: [number, number, number];
  target: [number, number];
  legend: { mark: string; label: string; guide: string }[];
  notes: string[];
  markCounts: Record<string, number>;
  closed: string[];
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

type Link = { url: string; text: string };

async function getLinks(url: string): Promise<Link[]> {
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) fail(`${url} が ${res.status} を返しました`);
  const html = await res.text();
  return [...html.matchAll(/<a[^>]+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi)].map((m) => ({
    url: new URL(m[1], url).toString(),
    text: toHalfWidth(squeeze(m[2])),
  }));
}

async function main() {
  console.log(`${MUNICIPALITY_NAME}の受入れ状況を取り込みます`);
  console.log(`公式ページ: ${INDEX_URL}\n`);

  // 1段目: 「令和N年度教育・保育施設等受入れ状況一覧」のうち年度がいちばん新しいもの
  const years = (await getLinks(INDEX_URL))
    .map((l) => {
      const m = l.text.match(/^令和(\d+)年度教育・保育施設等受入れ状況一覧$/);
      return m ? { ...l, reiwa: Number(m[1]) } : null;
    })
    .filter((v): v is NonNullable<typeof v> => v !== null);
  if (years.length === 0) fail("年度の一覧ページが見つかりません。ページの構成が変わった可能性があります。");
  const year = years.reduce((a, b) => (b.reiwa > a.reiwa ? b : a));
  console.log(`年度: ${year.text}`);

  // 2段目: 月別ページ。4月だけ「4月1次」「4月2次」があるので次数の大きいほうを採る
  const months = (await getLinks(year.url))
    .map((l) => {
      const m = l.text.match(/受入れ状況一覧（(\d+)月(?:(\d+)次)?）$/);
      if (!m) return null;
      const month = Number(m[1]);
      const stage = m[2] ? Number(m[2]) : 0;
      // 年度は4月始まりなので、1〜3月は翌年ぶんとして後ろに並べる
      const order = (month >= 4 ? month : month + 12) * 10 + stage;
      return { ...l, month, stage, order };
    })
    .filter((v): v is NonNullable<typeof v> => v !== null);
  if (months.length === 0) fail(`月別のページが見つかりません: ${year.url}`);
  const month = months.reduce((a, b) => (b.order > a.order ? b : a));
  console.log(`最新: ${month.text}`);

  // 3段目: PDF
  const pdfs = (await getLinks(month.url)).filter(
    (l) => /\.pdf$/i.test(l.url) && l.text.includes("受入れ状況一覧")
  );
  if (pdfs.length !== 1) {
    fail(`PDFのリンクが${pdfs.length}件あります（1件のはず）: ${month.url}`);
  }
  const pdfUrl = pdfs[0].url;
  console.log(`  ${pdfUrl}\n`);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "utsunomiya-vacancy-"));
  try {
    const r = await fetch(pdfUrl, { headers: { "User-Agent": UA } });
    if (!r.ok) fail(`PDFの取得に失敗しました（${r.status}）: ${pdfUrl}`);
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.subarray(0, 4).toString() !== "%PDF") fail(`PDFではありません: ${pdfUrl}`);
    const file = path.join(tmpDir, "utsunomiya.pdf");
    fs.writeFileSync(file, buf);

    let pdf: PdfResult;
    try {
      pdf = JSON.parse(runPython([EXTRACTOR, file])) as PdfResult;
    } catch (err) {
      fail(`抽出結果を読めません: ${String(err)}`);
    }

    // PDFの中の対象月がリンクの文言と合っているか
    const [targetReiwa, targetMonth] = pdf.target;
    if (targetMonth !== month.month) {
      fail(
        `PDFの対象月（令和${targetReiwa}年${targetMonth}月）がリンクの文言（${month.month}月）と違います`
      );
    }

    const [reiwa, asOfMonth, day] = pdf.asOf;
    const asOf = `${2018 + reiwa}-${String(asOfMonth).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    if (!/^\d{4}-\d{2}-\d{2}$/.test(asOf)) fail(`基準日を組み立てられません: ${asOf}`);
    if (asOf > todayJst()) fail(`基準日（${asOf}）が今日より先になっています`);
    const targetYear = 2018 + targetReiwa;
    console.log(`基準日: ${asOf}（${targetYear}年${targetMonth}月ぶんの受入れ状況）`);

    // 凡例。「受入れがありません」「利用できません」は空きなし
    const symbolLegend = pdf.legend.map((l) => {
      const label = l.guide && l.guide !== "-" ? `${l.label}（${l.guide}）` : l.label;
      return {
        mark: shapeOf(l.mark),
        label,
        open: !/(ありません|できません)/.test(l.label),
      };
    });
    if (symbolLegend.length < 3) fail(`凡例が${symbolLegend.length}件しか取れていません`);
    if (!symbolLegend.some((l) => l.open)) fail("空きありの記号が凡例にありません");
    console.log(`凡例: ${symbolLegend.map((l) => `${l.mark}＝${l.label}`).join(" / ")}`);
    const legendByShape = new Map(symbolLegend.map((l) => [shapeOf(l.mark), l.mark]));

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
    const seenName = new Set<string>();
    let closedCells = 0;

    for (const row of pdf.rows) {
      const name = squeeze(row.name);
      if (!name) fail(`施設名が空の行があります（NO. ${row.no}）`);
      if (seenName.has(name)) fail(`施設名が重複しています: ${name}`);
      seenName.add(name);

      let c = categories.indexOf(row.kubun);
      if (c < 0) {
        categories.push(row.kubun);
        c = categories.length - 1;
      }

      const symbols: (string | null)[] = [];
      for (let age = 0; age < AGE_COUNT; age++) {
        const raw = squeeze(row.marks[age] ?? "");
        const mark = legendByShape.get(shapeOf(raw));
        if (mark) {
          marks.set(mark, (marks.get(mark) ?? 0) + 1);
          symbols.push(mark);
          continue;
        }
        // 休園中の施設だけは記号の代わりに「※休園中」が入り、隣の欄が空になる
        if (row.closed) {
          closedCells += 1;
          symbols.push(null);
          continue;
        }
        fail(`${name}: ${age}歳児が凡例にない値です: 「${raw}」`);
      }
      if (symbols.every((s) => s === null)) fail(`${name}: 全てのクラスが空です`);

      facilities.push({
        id: String(row.no),
        name,
        w: null,
        c,
        vacancy: new Array(AGE_COUNT).fill(null),
        symbols,
      });
    }

    if (facilities.length < MIN_FACILITIES) {
      fail(`施設が${facilities.length}件しか取れていません（${MIN_FACILITIES}件以上のはず）`);
    }

    // 検算: 記号の数がPDFの文字と合うか
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

    const notes = [
      `宇都宮市は空き状況を人数ではなく記号で公表しています。当サイトでも公式の記号のまま載せています。これは${targetYear}年${targetMonth}月ぶんの受入れ状況（${asOf}時点）です。`,
      ...pdf.notes,
      ...(pdf.closed.length > 0
        ? [`公式の表で休園中とされている施設があります（${pdf.closed.join("、")}）。該当のクラスは「—」にしています。`]
        : []),
      "公式の表にある送迎保育ステーション事業（朝と夕にお子さんを預かり、送迎バスで在籍園へ送る事業）は保育施設の一覧ではないため、このページには載せていません。",
      "設けていないクラスは「—」にしています。",
    ];

    const dataset = {
      municipalitySlug: MUNICIPALITY_SLUG,
      municipalityName: MUNICIPALITY_NAME,
      asOf,
      fetchedAt: todayJst(),
      sourceName: SOURCE_NAME,
      sourceUrl: month.url,
      sourceFiles: { vacancy: pdfUrl },
      metrics: ["symbol"],
      subtitle: `${targetYear}年${targetMonth}月ぶんの受入れ状況`,
      notes,
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
    console.log(`  ${facilities.length}施設`);
    console.log(`  休園中で空にした欄: ${closedCells}`);
    console.log(
      `  類型ごとの数: ${categories
        .map((name, i) => `${name} ${facilities.filter((f) => f.c === i).length}`)
        .join(" / ")}`
    );
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
