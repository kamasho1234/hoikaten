/**
 * 津市の保育所等の空き状況を取り込む
 *
 * 実行: npm run vacancy:fetch:tsu
 *
 * ## この自治体の特徴
 * - 記号（〇＝若干名の空きがある状況、－＝現時点において空きが無い状況）
 * - 種類ごとに表が分かれていて、種類名は表のすぐ上に書いてあるだけ
 * - 基準日はPDFの右下に「8月1日入所調整直後の状況」とあるだけなので、
 *   年はページの更新日から補う
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "tsu";
const MUNICIPALITY_NAME = "津市";
const SOURCE_NAME = "津市「保育所等の空き状況」";
const INDEX_URL = "https://www.info.city.tsu.mie.jp/kosodateouen/kodomowoazukeru/1002742.html";
const AGE_COUNT = 6;
const UA = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";

const COL_WARD = 0;
const COL_NAME = 1;
const COL_AGE0 = 3;

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const EXTRACTOR = path.join(process.cwd(), "scripts", "tsu-pdf-extract.py");

function fail(message: string): never {
  console.error(`\n[中断] ${message}`);
  process.exit(1);
}

function todayJst(): string {
  const jst = new Date(Date.now() + 9 * 60 * 60 * 1000);
  return jst.toISOString().slice(0, 10);
}

function squeeze(s: string): string {
  return (s ?? "").replace(/[\s　]/g, "");
}

function shapeOf(mark: string): string {
  if (/^[○◯〇]$/.test(mark)) return "〇";
  if (/^[-‐‑‒–—―ー－]$/.test(mark)) return "－";
  return mark;
}

type PdfResult = {
  asOf: [number, number];
  legend: { mark: string; label: string }[];
  markCounts: Record<string, number>;
  tables: { caption: string; rows: string[][] }[];
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

  const pdfs = [...html.matchAll(/<a[^>]+href="([^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => ({ url: new URL(m[1], INDEX_URL).toString(), text: squeeze(m[2]) }))
    .filter((l) => l.text.includes("空き状況"));
  if (pdfs.length !== 1) fail(`空き状況のPDFが${pdfs.length}件見つかりました（1件のはず）`);
  const [pdfLink] = pdfs;
  console.log(`PDF: ${pdfLink.url}`);

  // 基準日の年はPDFに書かれていないので、ページの更新日から補う
  const updated = squeeze(html.replace(/<[^>]+>/g, "\n"))
    .split("更新日")
    .slice(1)
    .map((s) => s.match(/^(\d{4})年(\d{1,2})月(\d{1,2})日/))
    .find((m) => m !== null && m !== undefined);
  if (!updated) fail("ページの更新日を読み取れませんでした");
  const [updatedYear, updatedMonth] = updated.slice(1, 3).map(Number);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "tsu-vacancy-"));
  try {
    const r = await fetch(pdfLink.url, { headers: { "User-Agent": UA } });
    if (!r.ok) fail(`PDFの取得に失敗しました（${r.status}）: ${pdfLink.url}`);
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.subarray(0, 4).toString() !== "%PDF") fail(`PDFではありません: ${pdfLink.url}`);
    const file = path.join(tmpDir, "tsu.pdf");
    fs.writeFileSync(file, buf);

    let pdf: PdfResult;
    try {
      pdf = JSON.parse(runPython([EXTRACTOR, file])) as PdfResult;
    } catch (err) {
      fail(`抽出結果を読めません: ${String(err)}`);
    }

    // 年末に翌年1月ぶんが載ると月が戻るので、そのときは次の年になる
    const [asOfMonth, asOfDay] = pdf.asOf;
    const year = updatedYear + (asOfMonth < updatedMonth - 6 ? 1 : 0);
    const asOf = `${year}-${String(asOfMonth).padStart(2, "0")}-${String(asOfDay).padStart(2, "0")}`;
    if (asOf > todayJst()) fail(`基準日（${asOf}）が今日より先になっています`);
    console.log(`基準日: ${asOf}（ページの更新日 ${updatedYear}年${updatedMonth}月）`);

    const symbolLegend = pdf.legend.map((l) => ({
      mark: shapeOf(l.mark),
      label: l.label,
      open: !/空きが(?:無い|ない)/.test(l.label),
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
    let noClass = 0;

    for (const table of pdf.tables) {
      const category = table.caption;
      if (!category) fail("表の題が空です");
      if (!categories.includes(category)) categories.push(category);
      // 地域は縦結合。表ごとに先頭から引き継ぐ
      let ward = "";

      for (const row of table.rows) {
        const name = squeeze(row[COL_NAME]);
        if (!name) fail(`${category}: 施設名が空の行があります`);
        if (seen.has(name)) fail(`施設名が重複しています: ${name}`);
        seen.add(name);

        const area = squeeze(row[COL_WARD]);
        if (area) ward = area;
        if (!ward) fail(`${name}: 地域が分かりません`);
        if (!wards.includes(ward)) wards.push(ward);

        const symbols: (string | null)[] = [];
        for (let age = 0; age < AGE_COUNT; age++) {
          const raw = squeeze(row[COL_AGE0 + age] ?? "");
          if (raw === "") {
            noClass += 1;
            symbols.push(null);
            continue;
          }
          const mark = legendByShape.get(shapeOf(raw));
          if (!mark) fail(`${name}: 凡例にない記号です: 「${raw}」`);
          marks.set(mark, (marks.get(mark) ?? 0) + 1);
          symbols.push(mark);
        }
        if (symbols.every((s) => s === null)) fail(`${name}: 全てのクラスが空です`);

        facilities.push({
          id: name,
          name,
          w: wards.indexOf(ward),
          c: categories.indexOf(category),
          vacancy: new Array(AGE_COUNT).fill(null),
          symbols,
        });
      }
    }

    if (facilities.length < 50) fail(`施設が${facilities.length}件しか取れていません`);
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
      sourceFiles: { vacancy: pdfLink.url },
      metrics: ["symbol"],
      subtitle: `${asOfMonth}月1日入所の調整が終わった直後の空き状況`,
      notes: [
        "津市は空き状況を人数ではなく記号で公表しています。当サイトでも公式の記号のまま載せています。",
        "この表は参考情報であり、保育士等の配置状況などの事情により空き状況が変わることがあります。",
        "認定こども園の1号枠（幼稚園的利用枠）の空き状況は、各施設に直接お問い合わせください。",
        "年齢はその年度の4月1日時点のものです。設けていないクラスは「—」にしています。",
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
    console.log(`  ${facilities.length}施設 / ${wards.length}地域 / ${categories.length}種類`);
    console.log(`  設けていないクラス: ${noClass}`);
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
