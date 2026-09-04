/**
 * 福山市の保育所等の空き状況を取り込む
 *
 * 実行: npm run vacancy:fetch:fukuyama
 *
 * ## この自治体の特徴
 * - **空きは記号**（○＝空きあり、△＝空きわずか、×＝空きなし）
 * - 凡例にない「-」は、その施設が受け入れていないクラスに付いている
 * - 1ページに左右2段。罫線が少なく表としては取り出せないので、
 *   行のテキストから「施設名 区分 記号6つ」の並びを拾う
 * - 地域の欄は縦に結合されていて施設との対応が取れないため、持たない
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "fukuyama";
const MUNICIPALITY_NAME = "福山市";
const SOURCE_NAME = "福山市「保育所等空き状況」";
const INDEX_URL = "https://www.city.fukuyama.hiroshima.jp/soshiki/hoikushisetsu/347755.html";
const AGE_COUNT = 6;
const UA = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";

/** 区分の欄に出てくる書き方。この語を境に施設名と記号を切り分ける */
const KINDS = ["認定", "公立", "私立", "小規模", "地域", "事業所内", "家庭的", "企業"];

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const EXTRACTOR = path.join(process.cwd(), "scripts", "fukuyama-pdf-extract.py");

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

/** 表と凡例とで丸の字体が違うことがあるので、凡例の書き方にそろえる */
function shapeOf(mark: string): string {
  if (/^[○◯〇]$/.test(mark)) return "○";
  if (/^[×✕✖]$/.test(mark)) return "×";
  return mark;
}

function stripTags(html: string): string {
  return html.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").replace(/[\s　]+/g, " ").trim();
}

type PdfResult = {
  target: [number, number];
  asOf: [number, number, number];
  legend: { mark: string; label: string }[];
  markCounts: Record<string, number>;
  lines: string[];
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

  // 「保育所等空き状況（2026年10月入所審査用） [PDFファイル／390KB]」
  const links = [...html.matchAll(/<a[^>]+href="([^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => ({ url: new URL(m[1], INDEX_URL).toString(), text: toHalfWidth(stripTags(m[2])) }))
    .map((l) => {
      const m = squeeze(l.text).match(/保育所等空き状況（(\d{4})年度?(\d+)月入所審査用）/);
      if (!m) return null;
      const year = Number(m[1]);
      const month = Number(m[2]);
      return { ...l, year, month, sortKey: year * 100 + month };
    })
    .filter((v): v is NonNullable<typeof v> => v !== null);
  if (links.length === 0) fail("空き状況のPDFが見つかりません。ページの構成が変わった可能性があります。");
  const latest = links.reduce((a, b) => (b.sortKey > a.sortKey ? b : a));
  console.log(`最新: ${latest.text}\n  ${latest.url}`);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "fukuyama-vacancy-"));
  try {
    const r = await fetch(latest.url, { headers: { "User-Agent": UA } });
    if (!r.ok) fail(`PDFの取得に失敗しました（${r.status}）: ${latest.url}`);
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.subarray(0, 4).toString() !== "%PDF") fail(`PDFではありません: ${latest.url}`);
    const file = path.join(tmpDir, "fukuyama.pdf");
    fs.writeFileSync(file, buf);

    let pdf: PdfResult;
    try {
      pdf = JSON.parse(runPython([EXTRACTOR, file])) as PdfResult;
    } catch (err) {
      fail(`抽出結果を読めません: ${String(err)}`);
    }

    const [ty, tm] = pdf.target;
    if (ty !== latest.year || tm !== latest.month) {
      fail(`PDFの表題（${ty}年度${tm}月）がリンクの文言（${latest.year}年度${latest.month}月）と違います`);
    }
    const [ay, am, ad] = pdf.asOf;
    const asOf = `${ay}-${String(am).padStart(2, "0")}-${String(ad).padStart(2, "0")}`;
    console.log(`基準日: ${asOf} / 対象: ${latest.year}年度${latest.month}月入所審査`);

    const order = ["○", "◯", "〇", "△", "×"];
    const symbolLegend = pdf.legend
      .filter((l) => order.includes(l.mark))
      .sort((a, b) => order.indexOf(a.mark) - order.indexOf(b.mark))
      .map((l) => ({ mark: l.mark, label: l.label, open: !/なし$/.test(l.label) }));
    if (symbolLegend.length < 3) fail(`記号の凡例が足りません: ${JSON.stringify(pdf.legend)}`);
    console.log(`凡例: ${symbolLegend.map((l) => `${l.mark}＝${l.label}`).join(" / ")}`);
    const legendByShape = new Map(symbolLegend.map((l) => [shapeOf(l.mark), l.mark]));

    // 「いちご幼稚園 認定 × △ × × × ×」の並びを拾う。1行に左右2施設ぶん入る
    const pattern = new RegExp(
      `([^\\s].*?)\\s+(${KINDS.join("|")})\\s+((?:[○◯〇△×✕\\-]\\s*){${AGE_COUNT}})`,
      "g"
    );

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
    let noClass = 0;

    for (const line of pdf.lines) {
      if (line.includes("・・・") || line.includes("希望することは可能")) continue;
      for (const m of line.matchAll(pattern)) {
        // 行の先頭に付く「（1/2）」のような印や地域名は名前から外す
        const name = squeeze(m[1]).replace(/^[（(]\d+\/\d+[）)]/, "");
        const kind = m[2];
        if (!name) continue;
        if (!categories.includes(kind)) categories.push(kind);
        if (seen.has(name)) fail(`施設名が重複しています: ${name}`);
        seen.add(name);

        const cells = squeeze(m[3]).split("");
        if (cells.length !== AGE_COUNT) fail(`${name}: 記号が${cells.length}個しかありません`);
        const symbols: (string | null)[] = [];
        for (const cell of cells) {
          // 凡例にない「-」は、その施設が受け入れていないクラス
          if (/^[-‐－―]$/.test(cell)) {
            noClass += 1;
            symbols.push(null);
            continue;
          }
          const mark = legendByShape.get(shapeOf(cell));
          if (!mark) fail(`${name}: 凡例にない記号です: 「${cell}」`);
          marks.set(mark, (marks.get(mark) ?? 0) + 1);
          symbols.push(mark);
        }
        if (symbols.filter((s) => s !== null).length === 0) {
          fail(`${name}: 全てのクラスが「-」です`);
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
    }

    if (facilities.length < 80) fail(`施設が${facilities.length}件しか取れていません`);
    for (const item of symbolLegend) {
      if (!marks.has(item.mark)) fail(`凡例にある「${item.mark}」が表に1つも出てきません`);
    }
    // 記号の数がPDFの文字と合っているか
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
      subtitle: `${latest.year}年度${latest.month}月入所審査用の空き状況`,
      notes: [
        "福山市は空きを人数ではなく記号で公表しています。当サイトでも公式の記号のまま載せています。",
        "○や△が付いていても、必ず入所できるわけではありません。空きを上回る申し込みがあった場合など、審査の結果入所できないことがあります。",
        "×が付いているところも、入所決定の取下げや在園児の退所等により審査が可能になることがあります。",
        "公式の表で「-」と書かれているクラスは「—」にしています。",
        "公式のPDFには地域の欄がありますが、縦に結合された欄で施設ごとの対応が取れないため、当サイトでは載せていません。",
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
    console.log(`  ${facilities.length}施設 / ${categories.length}区分（${categories.join("・")}）`);
    console.log(`  「-」だったクラス: ${noClass}`);
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
