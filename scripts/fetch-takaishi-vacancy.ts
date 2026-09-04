/**
 * 高石市の保育施設の受け入れ可能枠を取り込む
 *
 * 実行: npm run vacancy:fetch:takaishi
 *
 * ## この自治体の特徴
 * - 空きを人数ではなく記号（○＝4枠以上、△＝1〜3枠、×＝受け入れなし）で公表している
 * - PDFの施設名が縦書きで、字が1字ずつ縦に並ぶ。罫線で升目を作って拾い直している
 * - 施設の類型は公表していないので categories は持たない
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "takaishi";
const MUNICIPALITY_NAME = "高石市";
const PREFECTURE = "大阪府";
const SOURCE_NAME = "高石市「受け入れ可能枠一覧表」";
const INDEX_URL =
  "https://www.city.takaishi.lg.jp/kakuka/kyouiku/kosodatesien_ka/hoiku/ukeire.html";
const AGE_COUNT = 6;
const UA = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const EXTRACTOR = path.join(process.cwd(), "scripts", "takaishi-pdf-extract.py");

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
  if (/^[○◯〇]$/.test(mark)) return "○";
  if (/^[×✕✖]$/.test(mark)) return "×";
  return mark;
}

type PdfResult = {
  asOf: [number, number, number];
  legend: { mark: string; label: string }[];
  markCounts: Record<string, number>;
  rows: { name: string; marks: (string | null)[] }[];
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
  console.log(`${MUNICIPALITY_NAME}の受け入れ可能枠を取り込みます`);
  console.log(`公式ページ: ${INDEX_URL}\n`);

  const res = await fetch(INDEX_URL, { headers: { "User-Agent": UA } });
  if (!res.ok) fail(`公式ページが ${res.status} を返しました`);
  const html = await res.text();

  const pdfs = [...html.matchAll(/<a[^>]+href="([^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => ({ url: new URL(m[1], INDEX_URL).toString(), text: squeeze(m[2]) }))
    .filter((l) => /受け?入れ可能枠一覧表/.test(l.text));
  if (pdfs.length !== 1) fail(`受け入れ可能枠のPDFが${pdfs.length}件見つかりました（1件のはず）`);
  const [pdfLink] = pdfs;
  console.log(`PDF: ${pdfLink.url}`);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "takaishi-vacancy-"));
  try {
    const r = await fetch(pdfLink.url, { headers: { "User-Agent": UA } });
    if (!r.ok) fail(`PDFの取得に失敗しました（${r.status}）: ${pdfLink.url}`);
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.subarray(0, 4).toString() !== "%PDF") fail(`PDFではありません: ${pdfLink.url}`);
    const file = path.join(tmpDir, "takaishi.pdf");
    fs.writeFileSync(file, buf);

    let pdf: PdfResult;
    try {
      pdf = JSON.parse(runPython([EXTRACTOR, file])) as PdfResult;
    } catch (err) {
      fail(`抽出結果を読めません: ${String(err)}`);
    }

    const [reiwa, month, day] = pdf.asOf;
    const asOf = `${2018 + reiwa}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    if (asOf > todayJst()) fail(`基準日（${asOf}）が今日より先になっています`);
    console.log(`基準日: ${asOf}`);

    // リンクの文字（「令和8年9月1日現在」）とPDFの中の日付が合っているか照らす
    const inLink = pdfLink.text.match(/令和(\d+)年(\d{1,2})月(\d{1,2})日現在/);
    if (inLink) {
      const fromLink = `${2018 + Number(inLink[1])}-${String(Number(inLink[2])).padStart(2, "0")}-${String(Number(inLink[3])).padStart(2, "0")}`;
      if (fromLink !== asOf) {
        fail(`リンクの文字の日付（${fromLink}）とPDFの中の日付（${asOf}）が違います`);
      }
    }

    const symbolLegend = pdf.legend.map((l) => ({
      mark: shapeOf(l.mark),
      label: l.label,
      open: !/受け?入れなし|なし/.test(l.label),
    }));
    console.log(`凡例: ${symbolLegend.map((l) => `${l.mark}＝${l.label}`).join(" / ")}`);
    const known = new Set(symbolLegend.map((l) => l.mark));

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

    for (const row of pdf.rows) {
      const name = squeeze(row.name);
      if (seen.has(name)) fail(`施設名が重複しています: ${name}`);
      seen.add(name);

      const symbols = row.marks.map((raw) => {
        if (raw === null) return null;
        const mark = shapeOf(raw);
        if (!known.has(mark)) fail(`${name}: 凡例にない記号です: 「${raw}」`);
        marks.set(mark, (marks.get(mark) ?? 0) + 1);
        return mark;
      });

      facilities.push({
        id: name,
        name,
        w: null,
        c: null,
        vacancy: new Array(AGE_COUNT).fill(null),
        symbols,
      });
    }

    if (facilities.length < 8) fail(`施設が${facilities.length}件しか取れていません`);

    for (const [mark, count] of marks) {
      const inText = Object.entries(pdf.markCounts)
        .filter(([m]) => shapeOf(m) === mark)
        .reduce((acc, [, v]) => acc + v, 0);
      if (count !== inText) {
        fail(`「${mark}」の数が合いません（PDFの文字 ${inText}個 / 取り込み ${count}個）`);
      }
    }
    console.log("記号の数はPDFの文字と一致しました");

    const previous = fs.existsSync(OUT_PATH)
      ? (JSON.parse(fs.readFileSync(OUT_PATH, "utf-8")) as {
          asOf?: string;
          facilities?: unknown[];
          sourceFiles?: Record<string, string>;
        })
      : null;
    if (previous?.facilities && facilities.length < previous.facilities.length * 0.9) {
      fail(
        `施設数が大きく減っています（前回 ${previous.facilities.length}件 → 今回 ${facilities.length}件）`
      );
    }
    if (
      previous?.asOf === asOf &&
      previous?.sourceFiles?.vacancy === pdfLink.url &&
      JSON.stringify(previous?.facilities ?? null) === JSON.stringify(facilities)
    ) {
      console.log(`公式データの時点が前回と同じ（${asOf}）のため更新はありません。`);
      return;
    }

    const dataset = {
      municipalitySlug: MUNICIPALITY_SLUG,
      municipalityName: MUNICIPALITY_NAME,
      prefecture: PREFECTURE,
      asOf,
      fetchedAt: todayJst(),
      sourceName: SOURCE_NAME,
      sourceUrl: INDEX_URL,
      sourceFiles: { vacancy: pdfLink.url },
      metrics: ["symbol"],
      subtitle: "施設ごとの年齢別の受け入れ可能枠",
      notes: [
        "高石市は空きを人数ではなく記号で公表しています。当サイトでも公式の記号のまま載せています。",
        "市は「受け入れ枠は利用者の退園や、各施設の人員体制などにより変動します」としています。",
        "市は「空きがあっても入所を保証するものではありません」「空いていない施設も申請可能です」としています。",
        "この表は保育所部分の状況です。幼稚園部分は各施設に直接お問い合わせください。",
        "市は「入所可否は利用調整を経て決定いたします」としています。",
        "市は「障がいや疾患などをお持ちの場合は、安全な保育を実施するためにお子さまの状況を調査いたします。各施設の人員体制や施設環境が整わない場合は受け入れが困難な場合があります」としています。",
        "市の表で空欄になっているクラスは「—」にしています。そのクラスを設けていないことを表します。",
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
    console.log(`  ${facilities.length}施設`);
    for (const item of symbolLegend) {
      console.log(`  ${item.mark}（${item.label}） ${marks.get(item.mark) ?? 0}`);
    }
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

main().catch((err) => fail(String(err)));
