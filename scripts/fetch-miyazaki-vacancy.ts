/**
 * 宮崎市の認可保育所・認定こども園等の空き状況を取り込む
 *
 * 実行: npm run vacancy:fetch:miyazaki
 *
 * ## この自治体の特徴
 * - **記号が表の左端**に来る（0歳〜5歳／備考／区域／種類／施設名…の順）
 * - 空きは記号（○＝5人以上、△＝1〜4人、×＝空きなし、－＝受入不可）
 * - 施設種類は「保」「認」「小」「事」の1文字。凡例のとおりに読み替える
 * - 区域は縦結合。空なら1つ上の行から引き継ぐ
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "miyazaki";
const MUNICIPALITY_NAME = "宮崎市";
const SOURCE_NAME = "宮崎市「認可保育所・認定こども園等の空き状況一覧」";
const INDEX_URL = "https://www.city.miyazaki.miyazaki.jp/education/nursery/access/113114.html";
const AGE_COUNT = 6;
const UA = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";

const COL_ZERO = 0;
/** 年齢の6列の次が備考。「※R6.4.2～11.30生のみ」のような条件が入る */
const COL_NOTE = 6;
const COL_WARD = 7;
const COL_KIND = 8;
const COL_NAME = 9;

/** 受入不可の印。クラスなしとして扱う */
const NO_CLASS_MARKS = ["－", "-", "‐", "―", "ー"];

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const EXTRACTOR = path.join(process.cwd(), "scripts", "miyazaki-pdf-extract.py");

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

/**
 * 表と凡例とで丸の字体が違うことがあるので、凡例の書き方にそろえる。
 *
 * **記号に「※」が付くことがある**（「△※」など）。これは記号そのものではなく、
 * 同じ行の備考欄（「※R6.4.2～11.30生のみ」）に条件が書いてあるという目印。
 * 記号としては「△」なので ※ を落として読み、条件のほうは施設の備考に入れる。
 */
function shapeOf(mark: string): string {
  const m = mark.replace(/[※*＊]/g, "");
  if (/^[○◯〇]$/.test(m)) return "○";
  if (/^[×✕✖]$/.test(m)) return "×";
  return m;
}

function stripTags(html: string): string {
  return html.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").replace(/[\s　]+/g, " ").trim();
}

type PdfResult = {
  target: [number, number];
  asOf: [number, number, number];
  legend: { mark: string; label: string }[];
  kinds: Record<string, string>;
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
  console.log(`${MUNICIPALITY_NAME}の空き状況を取り込みます`);
  console.log(`公式ページ: ${INDEX_URL}\n`);

  const res = await fetch(INDEX_URL, { headers: { "User-Agent": UA } });
  if (!res.ok) fail(`公式ページが ${res.status} を返しました`);
  const html = await res.text();

  // 「【令和8年9月※7月27日時点】令和8年度保育施設空き状況一覧 (PDF 183KB）」
  const links = [...html.matchAll(/<a[^>]+href="([^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => ({ url: new URL(m[1], INDEX_URL).toString(), text: toHalfWidth(stripTags(m[2])) }))
    .map((l) => {
      const t = squeeze(l.text);
      const m = t.match(/【令和(\d+)年(\d+)月[^】]*】.*保育施設空き状況一覧/);
      if (!m || t.includes("企業主導型")) return null;
      const fiscalYear = reiwaToYear(Number(m[1]));
      const month = Number(m[2]);
      const year = month <= 3 ? fiscalYear + 1 : fiscalYear;
      return { ...l, reiwa: Number(m[1]), year, month, sortKey: year * 100 + month };
    })
    .filter((v): v is NonNullable<typeof v> => v !== null);
  if (links.length === 0) fail("空き状況一覧のPDFが見つかりません。ページの構成が変わった可能性があります。");
  const latest = links.reduce((a, b) => (b.sortKey > a.sortKey ? b : a));
  console.log(`最新: ${latest.text}\n  ${latest.url}`);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "miyazaki-vacancy-"));
  try {
    const r = await fetch(latest.url, { headers: { "User-Agent": UA } });
    if (!r.ok) fail(`PDFの取得に失敗しました（${r.status}）: ${latest.url}`);
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.subarray(0, 4).toString() !== "%PDF") fail(`PDFではありません: ${latest.url}`);
    const file = path.join(tmpDir, "miyazaki.pdf");
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

    const order = ["○", "◯", "〇", "△", "×"];
    const symbolLegend = pdf.legend
      .filter((l) => order.includes(l.mark))
      .sort((a, b) => order.indexOf(a.mark) - order.indexOf(b.mark))
      .map((l) => ({ mark: l.mark, label: l.label, open: !/空きなし/.test(l.label) }));
    if (symbolLegend.length < 3) fail(`記号の凡例が足りません: ${JSON.stringify(pdf.legend)}`);
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
    const unknownKinds = new Set<string>();
    let ward = "";
    let noClass = 0;

    for (const row of pdf.rows) {
      if (row.length < COL_NAME + 1) continue;
      const name = squeeze(row[COL_NAME]);
      const kindCode = squeeze(row[COL_KIND]).replace(/※/g, "");
      if (!name || name === "施設名" || !kindCode || kindCode === "種類") continue;

      const rawWard = squeeze(row[COL_WARD]);
      if (rawWard) ward = rawWard;
      if (!ward) fail(`${name}: 区域が分かりません`);
      if (!wards.includes(ward)) wards.push(ward);

      const kind = pdf.kinds[kindCode] ?? kindCode;
      if (!pdf.kinds[kindCode]) unknownKinds.add(kindCode);
      if (!categories.includes(kind)) categories.push(kind);

      const id = `${ward}-${name}`;
      if (seen.has(id)) fail(`施設が重複しています: ${id}`);
      seen.add(id);

      const symbols: (string | null)[] = [];
      for (let age = 0; age < AGE_COUNT; age++) {
        const rawCell = squeeze(row[COL_ZERO + age] ?? "");
        if (rawCell === "" || NO_CLASS_MARKS.includes(rawCell)) {
          noClass += 1;
          symbols.push(null);
          continue;
        }
        const mark = legendByShape.get(shapeOf(rawCell));
        if (!mark) fail(`${ward} ${name}: 凡例にない記号です: 「${rawCell}」`);
        marks.set(mark, (marks.get(mark) ?? 0) + 1);
        symbols.push(mark);
      }
      if (symbols.filter((s) => s !== null).length === 0) {
        fail(`${ward} ${name}: 全てのクラスが空です`);
      }

      // 備考。「※R6.4.2～11.30生のみ」のように、記号だけでは分からない条件が書いてある。
      // **記号に ※ が付いている施設は必ずここを読ませる**必要があるので、備考として持たせる
      const note = squeeze(row[COL_NOTE] ?? "").replace(/^[※*＊]+/, "").trim();

      facilities.push({
        id,
        name,
        w: wards.indexOf(ward),
        c: categories.indexOf(kind),
        vacancy: new Array(AGE_COUNT).fill(null),
        symbols,
        ...(note ? { note } : {}),
      });
    }

    if (facilities.length < 100) fail(`施設が${facilities.length}件しか取れていません`);
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
    if (unknownKinds.size > 0) {
      console.log(`  凡例に読み替えのない施設種類（記号のまま使いました）: ${[...unknownKinds].join("、")}`);
    }

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
      sourceFiles: { vacancy: latest.url },
      metrics: ["symbol"],
      subtitle: `${latest.year}年${latest.month}月入所の空き状況`,
      notes: [
        "宮崎市は空きを人数ではなく記号で公表しています。当サイトでも公式の記号のまま載せています。",
        "○や△の付いた施設でも受け入れ状況が変わることがあります。×の付いた施設でも退所等により空きが出ることがあります。",
        "受入可能状況は目安であり、入所を約束するものではありません。",
        "年齢はその年度の4月1日時点のものです。",
        "公式の表で「－（受入不可）」となっているクラスは「—」にしています。",
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
    console.log(`  ${facilities.length}施設 / ${wards.length}区域 / ${categories.length}類型`);
    console.log(`  受入不可のクラス: ${noClass}`);
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
