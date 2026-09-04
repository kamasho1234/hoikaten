/**
 * 箕面市の保育施設の空き状況を取り込む
 *
 * 実行: npm run vacancy:fetch:minoh
 *
 * ## この自治体の特徴
 * - 記号（〇＝3名以上、△＝1・2名、×＝空きなし）。凡例は1ページ目にある
 * - 地区ごとに表が分かれる（市内北部／西部／中部／東部）。
 *   **1ページ目に注記と北部の表が同居している**ので1ページ目も読む
 * - **空らんの裏付けが施設名にある**。「（0歳から2歳のみ）」「（3歳から）」のように
 *   受入年齢が書いてあり、空らんの位置と一致する。1つでも合わなければ止める
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "minoh";
const MUNICIPALITY_NAME = "箕面市";
const SOURCE_NAME = "箕面市「保育施設の空き状況」";
const INDEX_URL = "https://www.city.minoh.lg.jp/infancy/hoikusho/akizyoukyou.html";
const AGE_COUNT = 6;
const MIN_FACILITIES = 35;
const UA = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const EXTRACTOR = path.join(process.cwd(), "scripts", "minoh-pdf-extract.py");

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
  if (/^[○◯〇]$/.test(mark)) return "〇";
  if (/^[×✕✖]$/.test(mark)) return "×";
  return mark;
}

type PdfResult = {
  asOf: [number, number, number];
  legend: { mark: string; label: string }[];
  wards: string[];
  markCounts: Record<string, number>;
  blanks: number;
  rows: { ward: string; name: string; marks: (string | null)[] }[];
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

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "minoh-vacancy-"));
  try {
    const r = await fetch(link.url, { headers: { "User-Agent": UA } });
    if (!r.ok) fail(`PDFの取得に失敗しました（${r.status}）: ${link.url}`);
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.subarray(0, 4).toString() !== "%PDF") fail(`PDFではありません: ${link.url}`);
    const file = path.join(tmpDir, "minoh.pdf");
    fs.writeFileSync(file, buf);

    let pdf: PdfResult;
    try {
      pdf = JSON.parse(runPython([EXTRACTOR, file])) as PdfResult;
    } catch (err) {
      fail(`抽出結果を読めません: ${String(err)}`);
    }

    const [reiwa, month, day] = pdf.asOf;
    const asOf = `${2018 + reiwa}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    if (!/^\d{4}-\d{2}-\d{2}$/.test(asOf)) fail(`基準日を組み立てられません: ${asOf}`);
    if (asOf > todayJst()) fail(`基準日（${asOf}）が今日より先になっています`);
    console.log(`基準日: ${asOf}`);

    const symbolLegend = pdf.legend.map((l) => ({
      mark: shapeOf(l.mark),
      label: l.label,
      open: /空き枠がある保育施設$/.test(l.label),
    }));
    if (symbolLegend.length < 3) fail(`凡例が${symbolLegend.length}件しか取れていません`);
    if (!symbolLegend.some((l) => l.open)) fail("空きありの記号が凡例にありません");
    console.log(`凡例: ${symbolLegend.map((l) => `${l.mark}＝${l.label}`).join(" / ")}`);
    const legendByShape = new Map(symbolLegend.map((l) => [shapeOf(l.mark), l.mark]));

    if (pdf.wards.length < 2) fail(`地区が${pdf.wards.length}件しか取れていません`);
    // 「市内北部の保育施設」→「市内北部」
    const wards = pdf.wards.map((w) => w.replace(/の保育施設$/, ""));
    console.log(`地区: ${wards.join(" / ")}`);

    const facilities: {
      id: string;
      name: string;
      w: number;
      c: null;
      vacancy: (number | null)[];
      symbols: (string | null)[];
    }[] = [];
    const marks = new Map<string, number>();
    const seen = new Set<string>();
    let blanks = 0;

    for (const row of pdf.rows) {
      const name = squeeze(row.name);
      if (!name) fail("施設名が空の行があります");
      if (seen.has(name)) fail(`施設名が重複しています: ${name}`);
      seen.add(name);

      const w = pdf.wards.indexOf(row.ward);
      if (w < 0) fail(`${name}: 地区が一覧にありません: 「${row.ward}」`);

      const symbols: (string | null)[] = [];
      for (let age = 0; age < AGE_COUNT; age++) {
        const raw = row.marks[age];
        // 空らん＝その年齢の受け入れがない（施設名の受入年齢と照合済み）
        if (raw === null) {
          blanks += 1;
          symbols.push(null);
          continue;
        }
        const mark = legendByShape.get(shapeOf(squeeze(raw)));
        if (!mark) fail(`${name}: ${age}歳が凡例にない記号です: 「${raw}」`);
        marks.set(mark, (marks.get(mark) ?? 0) + 1);
        symbols.push(mark);
      }
      if (symbols.every((s) => s === null)) fail(`${name}: 全てのクラスが空です`);

      facilities.push({
        id: name,
        name,
        w,
        c: null,
        vacancy: new Array(AGE_COUNT).fill(null),
        symbols,
      });
    }

    if (facilities.length < MIN_FACILITIES) {
      fail(`施設が${facilities.length}件しか取れていません（${MIN_FACILITIES}件以上のはず）`);
    }
    if (blanks !== pdf.blanks) {
      fail(`空らんの数が合いません（PDF ${pdf.blanks} / 取り込み ${blanks}）`);
    }

    // 検算1: 記号と空らんの合計が施設数×クラス数になるか
    const total = [...marks.values()].reduce((a, b) => a + b, 0);
    if (total + blanks !== facilities.length * AGE_COUNT) {
      fail(
        `欄の数が合いません（記号${total}＋空らん${blanks} / 施設${facilities.length}×${AGE_COUNT}）`
      );
    }

    // 検算2: 記号の数がPDFの文字と合うか
    for (const [mark, count] of marks) {
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
      `箕面市は空き状況を人数ではなく記号で公表しています。当サイトでも公式の記号のまま載せています。これは${asOf}時点のものです。`,
      "施設名の括弧の中に、公立か民間かや受け入れる年齢が書かれています（公式の表記のまま載せています）。その年齢の受け入れがないらんは「—」にしています。",
      "空き枠のある施設への入園を保証するものではありません。利用の可否は利用調整を経て決まります。",
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
      subtitle: `${asOf.slice(0, 4)}年${Number(asOf.slice(5, 7))}月${Number(asOf.slice(8, 10))}日現在の空き状況`,
      notes,
      wards,
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
    console.log(`  ${facilities.length}施設`);
    console.log(`  受け入れのないらん: ${blanks}`);
    console.log(
      `  地区ごとの数: ${wards
        .map((name, i) => `${name} ${facilities.filter((f) => f.w === i).length}`)
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
