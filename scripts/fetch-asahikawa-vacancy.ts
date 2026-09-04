/**
 * 旭川市の認可保育所等の受入可能人数を取り込む
 *
 * 実行: npm run vacancy:fetch:asahikawa
 *
 * ## この自治体の特徴
 * - 記号（○＝3人以上、△＝1〜2人、×＝0人）。利用調整の受入可能人数から
 *   入所決定者を差し引いた残りを表している
 * - **0歳の欄が生年月日で2つに分かれている**。当サイトの0歳児クラスは
 *   その年度の4月1日時点で0歳の子なので、そちらの欄だけを載せて注記で断る
 * - 園名の頭に付く【保】【認】【小】【事】が施設の種類
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "asahikawa";
const MUNICIPALITY_NAME = "旭川市";
const SOURCE_NAME = "旭川市「市内認可保育所等の受入可能人数」";
const INDEX_URL = "https://www.city.asahikawa.hokkaido.jp/800/808/811/d055633.html";
const AGE_COUNT = 6;
const UA = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";

const COL_WARD = 0;
const COL_NAME = 1;
const COL_AGE0 = 3;
/** 0歳の欄は2つある。当サイトが使うのは「その年度に0歳になる子」のほう（右側） */
const ZERO_COLUMNS = 2;
const ZERO_INDEX = 1;

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const EXTRACTOR = path.join(process.cwd(), "scripts", "asahikawa-pdf-extract.py");

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
  if (/^[○◯〇]$/.test(mark)) return "○";
  if (/^[×✕✖]$/.test(mark)) return "×";
  return mark;
}

function stripTags(html: string): string {
  return html.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").replace(/[\s　]+/g, " ").trim();
}

type PdfResult = {
  asOf: [number, number, number];
  legend: { mark: string; label: string }[];
  kinds: { mark: string; label: string }[];
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
  console.log(`${MUNICIPALITY_NAME}の受入可能人数を取り込みます`);
  console.log(`公式ページ: ${INDEX_URL}\n`);

  const res = await fetch(INDEX_URL, { headers: { "User-Agent": UA } });
  if (!res.ok) fail(`公式ページが ${res.status} を返しました`);
  const html = await res.text();

  const links = [...html.matchAll(/<a[^>]+href="([^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => ({ url: new URL(m[1], INDEX_URL).toString(), text: toHalfWidth(stripTags(m[2])) }))
    .filter((l) => squeeze(l.text).includes("受入可能人数"));
  if (links.length === 0) fail("受入可能人数のPDFが見つかりません。ページの構成が変わった可能性があります。");
  // 同じPDFが複数のリンクから貼られていることがあるので、URLで重複を除く
  const unique = [...new Map(links.map((l) => [l.url, l])).values()];
  if (unique.length > 1) fail(`受入可能人数のPDFが${unique.length}件見つかりました。どれが最新か決められません。`);
  const latest = unique[0];
  console.log(`最新: ${latest.text}\n  ${latest.url}`);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "asahikawa-vacancy-"));
  try {
    const r = await fetch(latest.url, { headers: { "User-Agent": UA } });
    if (!r.ok) fail(`PDFの取得に失敗しました（${r.status}）: ${latest.url}`);
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.subarray(0, 4).toString() !== "%PDF") fail(`PDFではありません: ${latest.url}`);
    const file = path.join(tmpDir, "asahikawa.pdf");
    fs.writeFileSync(file, buf);

    let pdf: PdfResult;
    try {
      pdf = JSON.parse(runPython([EXTRACTOR, file])) as PdfResult;
    } catch (err) {
      fail(`抽出結果を読めません: ${String(err)}`);
    }

    const [ay, am, ad] = pdf.asOf;
    const asOf = `${2018 + ay}-${String(am).padStart(2, "0")}-${String(ad).padStart(2, "0")}`;
    if (asOf > todayJst()) fail(`基準日（${asOf}）が今日より先になっています`);
    console.log(`基準日: ${asOf}`);

    const symbolLegend = pdf.legend.map((l) => ({
      mark: shapeOf(l.mark),
      label: l.label,
      open: !/^0人$/.test(l.label),
    }));
    console.log(`凡例: ${symbolLegend.map((l) => `${l.mark}＝${l.label}`).join(" / ")}`);
    const legendByShape = new Map(symbolLegend.map((l) => [shapeOf(l.mark), l.mark]));
    const kindLabels = new Map(pdf.kinds.map((k) => [k.mark, k.label]));

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
    let droppedZero = 0;

    for (const row of pdf.rows) {
      const rawName = squeeze(row[COL_NAME]);
      if (!rawName) fail("園名が空の行があります");
      const kindMark = rawName.match(/^【(.)】/)?.[1];
      if (!kindMark) fail(`園名の頭に施設の種類がありません: 「${rawName}」`);
      const kind = kindLabels.get(kindMark);
      if (!kind) fail(`凡例にない施設の種類です: 「${kindMark}」（${rawName}）`);
      const name = rawName.replace(/^【.】/, "");
      if (!name) fail(`園名が記号だけです: 「${rawName}」`);
      if (seen.has(name)) fail(`園名が重複しています: ${name}`);
      seen.add(name);
      if (!categories.includes(kind)) categories.push(kind);

      const ward = squeeze(row[COL_WARD]);
      if (!ward) fail(`${name}: 地区が分かりません`);
      if (!wards.includes(ward)) wards.push(ward);

      const symbols: (string | null)[] = [];
      for (let age = 0; age < AGE_COUNT; age++) {
        // 0歳は2列あるので、2列目（その年度に0歳になる子）を使い、もう一方は使わない
        const column = age === 0 ? COL_AGE0 + ZERO_INDEX : COL_AGE0 + ZERO_COLUMNS + age - 1;
        const raw = squeeze(row[column] ?? "");
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
      // 使わなかったほうの0歳の欄も数えておき、記号の総数の検算に足す
      if (squeeze(row[COL_AGE0] ?? "") !== "") droppedZero += 1;

      facilities.push({
        id: name,
        name,
        w: wards.indexOf(ward),
        c: categories.indexOf(kind),
        vacancy: new Array(AGE_COUNT).fill(null),
        symbols,
      });
    }

    if (facilities.length < 70) fail(`施設が${facilities.length}件しか取れていません`);
    const total = [...marks.values()].reduce((a, b) => a + b, 0);
    const inTextTotal = Object.values(pdf.markCounts).reduce((a, b) => a + b, 0);
    if (total + droppedZero !== inTextTotal) {
      fail(
        `記号の総数が合いません（PDFの文字 ${inTextTotal}個 / 取り込み ${total}個 + 使わなかった0歳の欄 ${droppedZero}個）`
      );
    }
    console.log(`記号の数はPDFの文字と一致しました（使わなかった0歳の欄 ${droppedZero}個を含む）`);

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
      subtitle: "直近の利用調整のあとの受入可能人数",
      notes: [
        "旭川市は空き状況を人数ではなく記号で公表しています。当サイトでも公式の記号のまま載せています。",
        "利用調整における受入可能人数から入所決定者を差し引いた人数です。次回の利用調整での受入人数は各園の体制により決まるため、必ず入所できるというわけではありません。",
        "「×」の園でも、利用が決まった児童の辞退などにより次回の利用調整で受入可能になることがあります。",
        "公式の表では0歳の欄が生まれた月で2つに分かれています。当サイトでは、その年度の4月1日時点で0歳になる子の欄を載せています。",
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
    console.log(`  ${facilities.length}施設 / ${wards.length}地区 / ${categories.length}種類`);
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
