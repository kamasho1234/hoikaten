/**
 * 千葉市の認定こども園・保育園等の受入状況を取り込む
 *
 * 実行: npm run vacancy:fetch:chiba
 *
 * ## この自治体の特徴
 * - **空きは記号**（◎＝余裕あり、○＝数名、△＝若干名、×＝空きなし）
 * - ExcelとPDFの両方が出ているので、Excelを読んで**PDFの記号の数と突き合わせる**
 * - **凡例にない「0」の記載がある**。小規模保育事業の3歳以上のように、
 *   その園にないクラスに使われているので「—」として持ち、注記でそのことを断る
 * - 0歳〜2歳がひとつに結合されているセルがある（家庭的保育事業など）。
 *   結合の範囲いっぱいに同じ記号を配る
 * - 区や分類が空欄の行がある。埋めずに「記載なし」のまま持つ
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "chiba";
const MUNICIPALITY_NAME = "千葉市";
const SOURCE_NAME = "千葉市「認定こども園・保育園等受入状況一覧」";
const INDEX_URL = "https://www.city.chiba.jp/kodomomirai/yojikyoiku/unei/akizyoukyou.html";
const AGE_COUNT = 6;
const UA = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";

/** 公式の表で「0」と書かれているクラス。その園が受け入れていないクラスに使われている */
const NO_CLASS_MARK = "0";

const COL_CODE = 0;
const COL_WARD = 1;
const COL_KIND = 2;
const COL_NAME = 3;
const COL_ZERO = 5;

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const EXTRACTOR = path.join(process.cwd(), "scripts", "chiba-vacancy-extract.py");

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

function squeeze(s: string): string {
  return (s ?? "").replace(/[\s　]/g, "");
}

function stripTags(html: string): string {
  return html.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").replace(/[\s　]+/g, " ").trim();
}

type Extracted = {
  asOf: [number, number, number];
  merged: number;
  legend: { mark: string; label: string }[];
  rows: string[][];
  missingInPdf: string[];
  pdfMarkCounts: Record<string, number>;
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
      fail(`ファイルの読み取りに失敗しました（${bin}）: ${e.stderr || e.message}`);
    }
  }
  fail(`Pythonを実行できません（${lastError}）。openpyxl と pdfplumber が入った python が必要です。`);
}

async function download(url: string, file: string, kind: "pdf" | "xlsx") {
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) fail(`${kind === "pdf" ? "PDF" : "Excel"}の取得に失敗しました（${res.status}）: ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  const head = buf.subarray(0, 4).toString("binary");
  if (kind === "pdf" && head !== "%PDF") fail(`PDFではありません: ${url}`);
  if (kind === "xlsx" && head.slice(0, 2) !== "PK") fail(`Excelではありません: ${url}`);
  fs.writeFileSync(file, buf);
}

async function main() {
  console.log(`${MUNICIPALITY_NAME}の受入状況を取り込みます`);
  console.log(`公式ページ: ${INDEX_URL}\n`);

  const res = await fetch(INDEX_URL, { headers: { "User-Agent": UA } });
  if (!res.ok) fail(`公式ページが ${res.status} を返しました`);
  const html = await res.text();

  // 「20260803ukeirejoukyouitiran.xlsx」のように日付がファイル名に入る
  const files = [...html.matchAll(/href="([^"]*ukeirejoukyouitiran\.(pdf|xlsx))"/gi)].map((m) => ({
    url: new URL(m[1], INDEX_URL).toString(),
    ext: m[2].toLowerCase(),
    date: m[1].match(/(\d{8})ukeirejoukyouitiran/)?.[1] ?? "",
  }));
  const latestDate = files.map((f) => f.date).sort().at(-1);
  if (!latestDate) fail("受入状況一覧のファイルが見つかりません。ページの構成が変わった可能性があります。");
  const excelLink = files.find((f) => f.ext === "xlsx" && f.date === latestDate);
  const pdfLink = files.find((f) => f.ext === "pdf" && f.date === latestDate);
  if (!excelLink || !pdfLink) fail(`ExcelとPDFが揃っていません（${latestDate}）`);
  console.log(`最新: ${latestDate}\n  ${excelLink.url}\n  ${pdfLink.url}`);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "chiba-vacancy-"));
  try {
    const excelFile = path.join(tmpDir, "chiba.xlsx");
    const pdfFile = path.join(tmpDir, "chiba.pdf");
    await download(excelLink.url, excelFile, "xlsx");
    await download(pdfLink.url, pdfFile, "pdf");

    let data: Extracted;
    try {
      data = JSON.parse(runPython([EXTRACTOR, excelFile, pdfFile])) as Extracted;
    } catch (err) {
      fail(`抽出結果を読めません: ${String(err)}`);
    }

    const [ry, am, ad] = data.asOf;
    const asOf = `${reiwaToYear(ry)}-${String(am).padStart(2, "0")}-${String(ad).padStart(2, "0")}`;
    // ファイル名の日付と表題の日付が合っているか
    if (asOf.replace(/-/g, "") !== latestDate) {
      fail(`表題の日付（${asOf}）がファイル名（${latestDate}）と違います`);
    }
    console.log(`基準日: ${asOf}`);

    const symbolLegend = data.legend.map((l) => ({
      mark: l.mark,
      label: l.label,
      open: l.mark !== "×",
    }));
    console.log(`凡例: ${symbolLegend.map((l) => `${l.mark}＝${l.label}`).join(" / ")}`);
    const knownMarks = new Set(symbolLegend.map((l) => l.mark));

    const wards: string[] = [];
    const categories: string[] = [];
    const facilities: {
      id: string;
      name: string;
      w: number | null;
      c: number | null;
      vacancy: (number | null)[];
      symbols: (string | null)[];
    }[] = [];
    const marks = new Map<string, number>();
    const seenCode = new Set<string>();
    let noClassCells = 0;

    for (const row of data.rows) {
      const code = squeeze(row[COL_CODE]);
      const name = (row[COL_NAME] ?? "").replace(/[\s　]+/g, " ").trim();
      if (!code || !name) continue;
      if (seenCode.has(code)) fail(`施設コードが重複しています: ${code}（${name}）`);
      seenCode.add(code);

      const ward = squeeze(row[COL_WARD]);
      const kind = squeeze(row[COL_KIND]);
      if (ward && !wards.includes(ward)) wards.push(ward);
      if (kind && !categories.includes(kind)) categories.push(kind);

      const symbols: (string | null)[] = [];
      for (let age = 0; age < AGE_COUNT; age++) {
        const raw = squeeze(row[COL_ZERO + age] ?? "");
        if (raw === NO_CLASS_MARK) {
          noClassCells += 1;
          symbols.push(null);
          continue;
        }
        if (raw === "") fail(`${name}: ${age}歳の欄が空です`);
        if (!knownMarks.has(raw)) fail(`${name}: 凡例にない記号です: 「${raw}」`);
        marks.set(raw, (marks.get(raw) ?? 0) + 1);
        symbols.push(raw);
      }
      if (symbols.every((s) => s === null)) fail(`${name}: 全てのクラスが「0」です`);

      facilities.push({
        id: code,
        name,
        w: ward ? wards.indexOf(ward) : null,
        c: kind ? categories.indexOf(kind) : null,
        vacancy: new Array(AGE_COUNT).fill(null),
        symbols,
      });
    }

    if (facilities.length < 300) fail(`施設が${facilities.length}件しか取れていません`);

    // 結合セルを配ったぶんを差し引くと、PDFに印字されている記号の数と一致するはず
    for (const item of symbolLegend) {
      const got = marks.get(item.mark) ?? 0;
      const inPdf = data.pdfMarkCounts[item.mark] ?? 0;
      if (got < inPdf) {
        fail(`「${item.mark}」の数が足りません（PDF ${inPdf}個 / 取り込み ${got}個）`);
      }
      if (got > inPdf + data.merged * 2) {
        fail(`「${item.mark}」の数が多すぎます（PDF ${inPdf}個 / 取り込み ${got}個）`);
      }
    }
    console.log(
      `記号の数はPDFと一致（結合セル ${data.merged}件ぶんの差を許容）: ` +
        symbolLegend.map((l) => `${l.mark}${marks.get(l.mark) ?? 0}`).join(" / ")
    );
    if (data.missingInPdf.length > 3) {
      fail(
        `PDFに見当たらない施設が${data.missingInPdf.length}件あります: ${data.missingInPdf.slice(0, 5).join("、")}`
      );
    }
    if (data.missingInPdf.length > 0) {
      console.log(
        `  PDF側で名前の文字が入れ替わっていて照合できなかった施設: ${data.missingInPdf.join("、")}`
      );
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
    // 取り込み元の一式も同じときだけ、書き換えを見送る
    if (
      previous?.asOf === asOf &&
      JSON.stringify(previous?.sourceFiles ?? {}) === JSON.stringify({ vacancy: excelLink.url, vacancyPdf: pdfLink.url })
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
      sourceFiles: { vacancy: excelLink.url, vacancyPdf: pdfLink.url },
      metrics: ["symbol"],
      subtitle: "認定こども園・保育園等の受入可能状況",
      notes: [
        "千葉市は空きを人数ではなく記号で公表しています。当サイトでも公式の記号のまま載せています。",
        "公式の表で「0」と書かれているクラス（小規模保育事業の3歳以上など）は、当サイトでは「—」として扱っています。",
        "×（空きなし）であっても、各園の状況で受け入れが発生する場合があります。",
        "事業所内保育事業に載っている受入可能状況は、地域枠のものです。",
        "公式の表で区や分類が空欄の施設は、当サイトでも空欄のままにしています。",
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
    console.log(`  ${facilities.length}施設 / ${wards.length}区 / ${categories.length}分類`);
    console.log(`  「0」と書かれていたクラス: ${noClassCells}`);
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
