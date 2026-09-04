/**
 * 鳥取市の保育園等の空き状況を取り込む
 *
 * 実行: npm run vacancy:fetch:tottori
 *
 * ## この自治体の特徴
 * - **空きは文字ではなくセルの色で表される**（記号も人数も印字されていない）
 *   - 黄色 … 受入れ可能 → 当サイトでは「○」
 *   - グレー … 受入れが難しい又は受入れできない → 「×」
 *   - 白 … その年齢のクラスがない → 「—」
 * - `＊` は「空き待ちしている児童がいる」印。色とは別に付くので、
 *   記号には混ぜず注記でまとめて説明する
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "tottori";
const MUNICIPALITY_NAME = "鳥取市";
const SOURCE_NAME = "鳥取市「保育園等の空き状況一覧」";
const INDEX_URL = "https://www.city.tottori.lg.jp/site/kosodate/4819.html";
const AGE_COUNT = 6;
const MIN_FACILITIES = 50;
const UA = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";

/** 公式の表の色を、当サイトで見せる記号に置き換える */
const MARK_OF: Record<string, string> = { yellow: "○", gray: "×" };

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const EXTRACTOR = path.join(process.cwd(), "scripts", "tottori-pdf-extract.py");

function fail(message: string): never {
  console.error(`\n[中断] ${message}`);
  process.exit(1);
}

function todayJst(): string {
  const jst = new Date(Date.now() + 9 * 60 * 60 * 1000);
  return jst.toISOString().slice(0, 10);
}

function squeeze(s: string): string {
  return (s ?? "").replace(/<[^>]+>/g, "").replace(/[\s　]/g, "");
}

function reiwaToYear(reiwa: number): number {
  return reiwa + 2018;
}

type PdfResult = {
  asOf: [number, number, number];
  target: [number, number];
  legend: { yellow: string; gray: string };
  notes: string[];
  counts: { yellow: number; gray: number; white: number };
  stars: number;
  rows: {
    kubun: string;
    name: string;
    place: string;
    marks: { color: string; star: boolean }[];
  }[];
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

  const links = [...html.matchAll(/<a[^>]+href="([^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => ({ url: new URL(m[1], INDEX_URL).toString(), text: squeeze(m[2]) }))
    .filter((l) => l.text.includes("空き状況"));
  if (links.length !== 1) {
    fail(`空き状況のPDFのリンクが${links.length}件あります（1件のはず）`);
  }
  const link = links[0];
  console.log(`PDF: ${link.text}\n  ${link.url}`);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "tottori-vacancy-"));
  try {
    const r = await fetch(link.url, { headers: { "User-Agent": UA } });
    if (!r.ok) fail(`PDFの取得に失敗しました（${r.status}）: ${link.url}`);
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.subarray(0, 4).toString() !== "%PDF") fail(`PDFではありません: ${link.url}`);
    const file = path.join(tmpDir, "tottori.pdf");
    fs.writeFileSync(file, buf);

    let pdf: PdfResult;
    try {
      pdf = JSON.parse(runPython([EXTRACTOR, file])) as PdfResult;
    } catch (err) {
      fail(`抽出結果を読めません: ${String(err)}`);
    }

    const [reiwa, month, day] = pdf.asOf;
    const asOf = `${reiwaToYear(reiwa)}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    if (!/^\d{4}-\d{2}-\d{2}$/.test(asOf)) fail(`時点の日付を組み立てられません: ${asOf}`);
    if (asOf > todayJst()) fail(`時点の日付（${asOf}）が今日より先になっています`);
    const targetLabel = `${reiwaToYear(pdf.target[0])}年${pdf.target[1]}月`;
    console.log(`時点: ${asOf} ／ 対象: ${targetLabel}途中入所`);

    const symbolLegend = [
      { mark: MARK_OF.yellow, label: squeeze(pdf.legend.yellow), open: true },
      { mark: MARK_OF.gray, label: squeeze(pdf.legend.gray), open: false },
    ];
    for (const item of symbolLegend) {
      if (!item.label) fail("凡例の言葉が空です");
    }
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
    const marks = new Map<string, number>();
    const seen = new Set<string>();
    let blanks = 0;
    let stars = 0;

    for (const row of pdf.rows) {
      const name = squeeze(row.name);
      if (!name) fail("園名が空の行があります");
      if (seen.has(name)) fail(`園名が重複しています: ${name}`);
      seen.add(name);

      const kubun = squeeze(row.kubun);
      let c = categories.indexOf(kubun);
      if (c < 0) {
        categories.push(kubun);
        c = categories.length - 1;
      }

      const symbols: (string | null)[] = [];
      for (let age = 0; age < AGE_COUNT; age++) {
        const cell = row.marks[age];
        if (!cell) fail(`${name}: ${age}歳児の欄がありません`);
        if (cell.star) stars += 1;
        if (cell.color === "white") {
          blanks += 1;
          symbols.push(null);
          continue;
        }
        const mark = MARK_OF[cell.color];
        if (!mark) fail(`${name}: ${age}歳児の色を読めません（${cell.color}）`);
        marks.set(mark, (marks.get(mark) ?? 0) + 1);
        symbols.push(mark);
      }
      if (symbols.every((s) => s === null)) fail(`${name}: 全ての年齢にクラスがありません`);

      facilities.push({
        id: name,
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

    // 検算1: 色ごとの数がPDFの塗りの数と合うか
    if ((marks.get(MARK_OF.yellow) ?? 0) !== pdf.counts.yellow) {
      fail(`黄色の数が合いません（PDF ${pdf.counts.yellow} / 取り込み ${marks.get(MARK_OF.yellow)}）`);
    }
    if ((marks.get(MARK_OF.gray) ?? 0) !== pdf.counts.gray) {
      fail(`グレーの数が合いません（PDF ${pdf.counts.gray} / 取り込み ${marks.get(MARK_OF.gray)}）`);
    }
    if (blanks !== pdf.counts.white) {
      fail(`白の数が合いません（PDF ${pdf.counts.white} / 取り込み ${blanks}）`);
    }

    // 検算2: 記号と白の合計が施設数×年齢数になるか
    const total = [...marks.values()].reduce((a, b) => a + b, 0);
    if (total + blanks !== facilities.length * AGE_COUNT) {
      fail(
        `欄の数が合いません（記号${total}＋白${blanks} / 施設${facilities.length}×${AGE_COUNT}）`
      );
    }
    console.log(
      `色の数はPDFの塗りと一致し、欄の数も施設数×年齢数と合いました（○${marks.get(MARK_OF.yellow)}／×${marks.get(MARK_OF.gray)}／—${blanks}）`
    );

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
    if (previous?.asOf === asOf && previous?.sourceFiles?.vacancy === link.url) {
      console.log(`公式データの時点が前回と同じ（${asOf}）のため更新はありません。`);
      return;
    }

    const notes = [
      `鳥取市は空き状況を人数ではなく色で公表しています。これは${targetLabel}途中入所の調整後のもので、${asOf}時点のものです。`,
      `公式の表では受入れ可能な欄が黄色、難しい欄がグレーに塗られています。当サイトでは前者を「${MARK_OF.yellow}」、後者を「${MARK_OF.gray}」にしています。`,
      "公式の表で色の付いていない欄は、その年齢のクラスがないことを表しています。当サイトでは「—」にしています。",
      `公式の表には、空き待ちしている児童がいる欄に「＊」が付いています（${targetLabel}分では${stars}か所）。当サイトでは記号に反映していないため、詳しくは公式の表をご覧ください。`,
      "今後の施設の状況や児童の退所・入所により、各月の入所調整時には変わることがあります。",
    ];

    const dataset = {
      municipalitySlug: MUNICIPALITY_SLUG,
      municipalityName: MUNICIPALITY_NAME,
      asOf,
      fetchedAt: todayJst(),
      sourceName: SOURCE_NAME,
      sourceUrl: INDEX_URL,
      sourceFiles: { vacancy: link.url },
      metrics: ["symbol"],
      subtitle: `${targetLabel}途中入所の調整後の空き状況`,
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
    console.log(`  ${facilities.length}施設 / 空き待ちの印 ${stars}か所`);
    console.log(
      `  区分ごとの数: ${categories
        .map((name, i) => `${name} ${facilities.filter((f) => f.c === i).length}`)
        .join(" / ")}`
    );
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

main().catch((err) => fail(String(err)));
