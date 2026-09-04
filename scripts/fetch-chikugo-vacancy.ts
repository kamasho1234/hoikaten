/**
 * 筑後市の保育所等の空き状況を取り込む
 *
 * 実行: npm run vacancy:fetch:chikugo
 *
 * ## この自治体の特徴
 * - **空きの表し方が4通りある**
 *   - ○ … 3人以上空きあり（文字）
 *   - △ … 1〜2人空きあり（文字）
 *   - **灰色の塗りつぶし** … 空きなし → 当サイトでは「✕」に置き換えて表示
 *   - **灰色の塗りつぶし＋斜線** … 受入れなし → 「—」にする
 * - 塗りつぶしの色は空きなしも受入れなしも同じなので、斜線の有無で分ける（Python側）
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "chikugo";
const MUNICIPALITY_NAME = "筑後市";
const SOURCE_NAME = "筑後市「保育所・認定こども園（保育部分）・小規模保育施設 空き状況」";
const INDEX_URL = "https://www.city.chikugo.lg.jp/kosodate/_6015/_6022/_25938.html";
const AGE_COUNT = 6;
const MIN_FACILITIES = 15;
const UA = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";

/** 公式の表で灰色に塗られている「空きなし」を、この記号に置き換えて表示する */
const FILLED_MARK = "✕";

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const EXTRACTOR = path.join(process.cwd(), "scripts", "chikugo-pdf-extract.py");

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

/** 記号の形をそろえる */
function shapeOf(mark: string): string {
  if (/^[○◯〇]$/.test(mark)) return "○";
  if (/^[×✕✖]$/.test(mark)) return "✕";
  return mark;
}

type PdfResult = {
  asOf: [number, number, number];
  target: number | null;
  legend: { mark: string | null; label: string }[];
  notes: string[];
  markCounts: Record<string, number>;
  fills: number;
  diagonals: number;
  rows: { kubun: string; name: string; marks: (string | null)[] }[];
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
    .map((m) => ({ url: new URL(m[1], INDEX_URL).toString(), text: toHalfWidth(squeeze(m[2])) }))
    .filter((l) => l.text.includes("空き状況"));
  if (links.length !== 1) {
    fail(`空き状況のPDFのリンクが${links.length}件あります（1件のはず）`);
  }
  const link = links[0];
  console.log(`PDF: ${link.text}\n  ${link.url}`);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "chikugo-vacancy-"));
  try {
    const r = await fetch(link.url, { headers: { "User-Agent": UA } });
    if (!r.ok) fail(`PDFの取得に失敗しました（${r.status}）: ${link.url}`);
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.subarray(0, 4).toString() !== "%PDF") fail(`PDFではありません: ${link.url}`);
    const file = path.join(tmpDir, "chikugo.pdf");
    fs.writeFileSync(file, buf);

    let pdf: PdfResult;
    try {
      pdf = JSON.parse(runPython([EXTRACTOR, file])) as PdfResult;
    } catch (err) {
      fail(`抽出結果を読めません: ${String(err)}`);
    }

    const [year, month, day] = pdf.asOf;
    const asOf = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    if (!/^\d{4}-\d{2}-\d{2}$/.test(asOf)) fail(`更新日を組み立てられません: ${asOf}`);
    if (asOf > todayJst()) fail(`更新日（${asOf}）が今日より先になっています`);
    console.log(`更新日: ${asOf}${pdf.target ? `（${pdf.target}月入所選考後）` : ""}`);

    // 文字の記号（○△）と、塗りつぶしの「空きなし」を凡例にする。
    // 「受入れなし」は当サイトでは「—」にするので凡例には入れない
    const symbolLegend: { mark: string; label: string; open: boolean }[] = [];
    let filledLabel = "空きなし";
    for (const item of pdf.legend) {
      if (item.mark) {
        symbolLegend.push({
          mark: shapeOf(item.mark),
          label: item.label,
          open: /空きあり$/.test(item.label),
        });
      } else if (/^空き/.test(item.label)) {
        filledLabel = item.label;
      }
    }
    if (symbolLegend.length < 2) fail(`凡例が${symbolLegend.length}件しか取れていません`);
    if (!symbolLegend.some((l) => l.open)) fail("空きありの記号が凡例にありません");
    symbolLegend.push({ mark: FILLED_MARK, label: filledLabel, open: false });
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
    const seen = new Set<string>();
    let notOffered = 0;
    let filled = 0;

    for (const row of pdf.rows) {
      const name = squeeze(row.name);
      if (!name) fail("施設名が空の行があります");
      if (seen.has(name)) fail(`施設名が重複しています: ${name}`);
      seen.add(name);

      const kubun = row.kubun || "その他";
      let c = categories.indexOf(kubun);
      if (c < 0) {
        categories.push(kubun);
        c = categories.length - 1;
      }

      const symbols: (string | null)[] = [];
      for (let age = 0; age < AGE_COUNT; age++) {
        const raw = row.marks[age];
        // 斜線（受入れなし）は Python 側で null になっている
        if (raw === null) {
          notOffered += 1;
          symbols.push(null);
          continue;
        }
        // 空文字は塗りつぶし（空きなし）。記号に置き換えて表示する
        if (raw === "") {
          filled += 1;
          marks.set(FILLED_MARK, (marks.get(FILLED_MARK) ?? 0) + 1);
          symbols.push(FILLED_MARK);
          continue;
        }
        const mark = legendByShape.get(shapeOf(squeeze(raw)));
        if (!mark) fail(`${name}: ${age}歳が凡例にない記号です: 「${raw}」`);
        marks.set(mark, (marks.get(mark) ?? 0) + 1);
        symbols.push(mark);
      }
      if (symbols.every((s) => s === null)) fail(`${name}: 全てのクラスが受入れなしです`);

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
    if (notOffered !== pdf.diagonals) {
      fail(`斜線の欄の数が合いません（PDF ${pdf.diagonals} / 取り込み ${notOffered}）`);
    }
    if (filled !== pdf.fills) {
      fail(`塗りつぶしの欄の数が合いません（PDF ${pdf.fills} / 取り込み ${filled}）`);
    }

    // 検算1: 記号と斜線の合計が施設数×クラス数になるか
    const total = [...marks.values()].reduce((a, b) => a + b, 0);
    if (total + notOffered !== facilities.length * AGE_COUNT) {
      fail(
        `欄の数が合いません（記号${total}＋受入れなし${notOffered} / 施設${facilities.length}×${AGE_COUNT}）`
      );
    }

    // 検算2: 印字された記号（○△）の数がPDFの文字と合うか
    for (const [mark, count] of marks) {
      if (mark === FILLED_MARK) continue; // 塗りつぶしは文字がないので数えられない
      const inText = Object.entries(pdf.markCounts)
        .filter(([m]) => shapeOf(m) === shapeOf(mark))
        .reduce((acc, [, v]) => acc + v, 0);
      if (count !== inText) {
        fail(`「${mark}」の数が合いません（PDFの文字 ${inText}個 / 取り込み ${count}個）`);
      }
    }
    console.log("記号の数はPDFの文字と一致し、欄の数も施設数×クラス数と合いました");

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
      `筑後市は空き状況を人数ではなく記号で公表しています。これは${asOf}に更新されたものです。`,
      ...pdf.notes,
      `公式の表では、空きがない欄は灰色に塗られ、受け入れのない欄は灰色の上に斜線が引かれています。当サイトでは前者を「${FILLED_MARK}」（${filledLabel}）、後者を「—」にしています。`,
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
      subtitle: pdf.target
        ? `${pdf.target}月入所の選考後の空き状況`
        : "入所選考後の空き状況",
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
    console.log(`  受入れなし（斜線）: ${notOffered} / 空きなし（塗りつぶし）: ${filled}`);
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
