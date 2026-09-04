/**
 * 高松市の保育施設等の入所可能状況を取り込む
 *
 * 実行: npm run vacancy:fetch:takamatsu
 *
 * ## この自治体の特徴
 * - **空きは記号**（○＝3名以上、△＝要件や条件により若干名、×＝受入は難しい）
 * - その施設にないクラスは空欄
 * - エリア（小学校区のまとまり）の列は縦結合で、値がブロックの真ん中の行にしか
 *   入らないため、どの施設がどのエリアかを機械では決められない。地区としては持たない
 * - 施設ごとに番号が振られているので、重なりがないかを番号で確かめられる
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "takamatsu";
const MUNICIPALITY_NAME = "高松市";
const SOURCE_NAME = "高松市「保育施設等入所可能状況一覧表」";
const INDEX_URL =
  "https://www.city.takamatsu.kagawa.jp/kurashi/kosodate/youchien_hoiku/kodomoen/hoiku/nyusho.html";
const AGE_COUNT = 6;
const UA = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";

const COL_AREA = 0;
const COL_KIND = 1;
const COL_ORG = 2;
const COL_NO = 3;
const COL_NAME = 4;
const COL_ZERO = 10;
const COL_NOTE = 16;

/** 表の見出しにある略記。凡例のとおりに読み替える */
const KIND_LABELS: Record<string, string> = {
  保: "保育所",
  こ: "こども園",
  小: "小規模",
};

/** 公私立の欄も1文字なので、言い方を補う */
const ORG_LABELS: Record<string, string> = { 公: "公立", 私: "私立" };

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const EXTRACTOR = path.join(process.cwd(), "scripts", "takamatsu-pdf-extract.py");

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
  console.log(`${MUNICIPALITY_NAME}の入所可能状況を取り込みます`);
  console.log(`公式ページ: ${INDEX_URL}\n`);

  const res = await fetch(INDEX_URL, { headers: { "User-Agent": UA } });
  if (!res.ok) fail(`公式ページが ${res.status} を返しました`);
  const html = await res.text();

  // 「高松市内保育施設等入所可能状況一覧表（令和8年9月入所）（PDF：245KB）」
  const links = [...html.matchAll(/<a[^>]+href="([^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => ({ url: new URL(m[1], INDEX_URL).toString(), text: toHalfWidth(stripTags(m[2])) }))
    .map((l) => {
      const m = l.text.match(/入所可能状況一覧表（令和(\d+)年(\d+)月入所）/);
      if (!m) return null;
      const fiscalYear = reiwaToYear(Number(m[1]));
      const month = Number(m[2]);
      const year = month <= 3 ? fiscalYear + 1 : fiscalYear;
      return { ...l, reiwa: Number(m[1]), year, month, sortKey: year * 100 + month };
    })
    .filter((v): v is NonNullable<typeof v> => v !== null);
  if (links.length === 0) fail("入所可能状況一覧表のPDFが見つかりません。ページの構成が変わった可能性があります。");
  const latest = links.reduce((a, b) => (b.sortKey > a.sortKey ? b : a));
  console.log(`最新: ${latest.text}\n  ${latest.url}`);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "takamatsu-vacancy-"));
  try {
    const r = await fetch(latest.url, { headers: { "User-Agent": UA } });
    if (!r.ok) fail(`PDFの取得に失敗しました（${r.status}）: ${latest.url}`);
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.subarray(0, 4).toString() !== "%PDF") fail(`PDFではありません: ${latest.url}`);
    const file = path.join(tmpDir, "takamatsu.pdf");
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

    const symbolLegend = pdf.legend.map((l) => ({
      mark: l.mark,
      label: l.label,
      open: !/難しい/.test(l.label),
    }));
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
    let noClass = 0;
    const emptyRows: string[] = [];

    for (const row of pdf.rows) {
      const kindCode = squeeze(row[COL_KIND]);
      const number = toHalfWidth(squeeze(row[COL_NO]));
      const name = squeeze(row[COL_NAME]);
      if (kindCode.includes("保育所）")) continue;
      if (!name || !/^\d+$/.test(number)) continue;

      const org = squeeze(row[COL_ORG]);
      const kindLabel = KIND_LABELS[kindCode];
      if (!kindLabel) fail(`${name}: 知らない種別です: 「${kindCode}」`);
      // 「公立の保育所」のように、種別と公私立を合わせて類型にする
      const orgLabel = org ? ORG_LABELS[org] : "";
      if (org && !orgLabel) fail(`${name}: 知らない公私立の書き方です: 「${org}」`);
      const kind = orgLabel ? `${orgLabel}${kindLabel}` : kindLabel;
      if (!categories.includes(kind)) categories.push(kind);

      if (seen.has(number)) fail(`施設の番号が重複しています: ${number}（${name}）`);
      seen.add(number);

      const symbols: (string | null)[] = [];
      for (let age = 0; age < AGE_COUNT; age++) {
        const rawCell = squeeze(row[COL_ZERO + age] ?? "");
        if (rawCell === "") {
          noClass += 1;
          symbols.push(null);
          continue;
        }
        const mark = legendByShape.get(shapeOf(rawCell));
        if (!mark) fail(`${name}: 凡例にない記号です: 「${rawCell}」`);
        marks.set(mark, (marks.get(mark) ?? 0) + 1);
        symbols.push(mark);
      }
      // 休園中の施設は全ての欄が空になる（備考に理由が書かれている）
      if (symbols.filter((s) => s !== null).length === 0) {
        const note = squeeze(row[COL_NOTE] ?? "");
        emptyRows.push(note ? `${name}（${note}）` : name);
        continue;
      }

      facilities.push({
        id: number,
        name,
        w: null,
        c: categories.indexOf(kind),
        vacancy: new Array(AGE_COUNT).fill(null),
        symbols,
      });
    }

    if (facilities.length < 80) fail(`施設が${facilities.length}件しか取れていません`);
    for (const item of symbolLegend) {
      if (!marks.has(item.mark)) fail(`凡例にある「${item.mark}」が表に1つも出てきません`);
    }
    // 表の部分に印字されている数と突き合わせる
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
      subtitle: `${latest.year}年${latest.month}月入所の入所可能状況`,
      notes: [
        "高松市は入所可能状況を人数ではなく記号で公表しています。当サイトでも公式の記号のまま載せています。",
        "利用調整における受入れ見込みです。今後の施設の受入れ体制の変化などにより、実際の受入れと異なる場合があります。",
        "クラス年齢はその年度の4月1日時点の年齢です。",
        "公式のPDFには小学校区をまとめた「エリア」の欄がありますが、縦に結合された欄で施設ごとの対応が取れないため、当サイトでは載せていません。",
        "その施設にないクラスは「—」にしています。",
      "休園中など、全ての欄が空の施設は載せていません。",
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
    console.log(`  その施設にないクラス: ${noClass}`);
    if (emptyRows.length > 0) {
      console.log(`  全ての欄が空だった施設（載せていません）: ${emptyRows.join("、")}`);
    }
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
