/**
 * 茨木市の保育所等の空き状況を取り込む
 *
 * 実行: npm run vacancy:fetch:ibaraki
 *
 * ## この自治体の特徴
 * - 記号（〇＝4枠以上、△＝1〜3枠、×＝受け入れなし）
 * - **「ー」が「受け入れ対象歳児ではない」と凡例に書かれている**ので、
 *   そこは「—」（クラスなし）として持てる
 * - 待機児童保育事業だけ「※」（状況に応じて随時選考）が入り、
 *   いくつかの歳児にまたがって結合されている
 * - 公立・私立と表の見出し（保育所・認定こども園など）を組み合わせて種類にする
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "ibaraki";
const MUNICIPALITY_NAME = "茨木市";
const SOURCE_NAME = "茨木市「保育所等の空き状況」";
const INDEX_URL =
  "https://www.city.ibaraki.osaka.jp/kikou/kodomoikusei/jigyou/menu/hoikushokankei/oshirase/48347.html";
const AGE_COUNT = 6;
const UA = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";

/** 「受け入れ対象歳児ではない」を表す印。当サイトでは「—」にする */
const NO_CLASS = "－";

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const EXTRACTOR = path.join(process.cwd(), "scripts", "ibaraki-pdf-extract.py");

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

/** 字体の揺れを揃える */
function shapeOf(mark: string): string {
  if (/^[〇○◯]$/.test(mark)) return "○";
  if (/^[×✕✖]$/.test(mark)) return "×";
  if (/^[ー－‐‑–—\-]$/.test(mark)) return NO_CLASS;
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
  sections: {
    name: string;
    rows: { public: string; no: string; name: string; stages: { text: string; joined: boolean }[] }[];
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

  // 「令和8年9月選考空き状況一覧表（令和8年7月24日時点）」
  const links = [...html.matchAll(/<a[^>]+href="([^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => ({ url: new URL(m[1], INDEX_URL).toString(), text: toHalfWidth(stripTags(m[2])) }))
    .map((l) => {
      const m = squeeze(l.text).match(/令和(\d+)年(\d+)月(?:選考)?空き状況一覧表/);
      if (!m) return null;
      const reiwa = Number(m[1]);
      const month = Number(m[2]);
      return { ...l, reiwa, month, sortKey: reiwa * 100 + month };
    })
    .filter((v): v is NonNullable<typeof v> => v !== null);
  if (links.length === 0) fail("空き状況のPDFが見つかりません。ページの構成が変わった可能性があります。");
  const latest = links.reduce((a, b) => (b.sortKey > a.sortKey ? b : a));
  console.log(`最新: ${latest.text}\n  ${latest.url}`);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "ibaraki-vacancy-"));
  try {
    const r = await fetch(latest.url, { headers: { "User-Agent": UA } });
    if (!r.ok) fail(`PDFの取得に失敗しました（${r.status}）: ${latest.url}`);
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.subarray(0, 4).toString() !== "%PDF") fail(`PDFではありません: ${latest.url}`);
    const file = path.join(tmpDir, "ibaraki.pdf");
    fs.writeFileSync(file, buf);

    let pdf: PdfResult;
    try {
      pdf = JSON.parse(runPython([EXTRACTOR, file])) as PdfResult;
    } catch (err) {
      fail(`抽出結果を読めません: ${String(err)}`);
    }

    const [targetReiwa, targetMonth] = pdf.target;
    if (targetReiwa !== latest.reiwa || targetMonth !== latest.month) {
      fail(
        `PDFの表題（令和${targetReiwa}年${targetMonth}月）がリンクの文言（令和${latest.reiwa}年${latest.month}月）と違います`
      );
    }
    const [ay, am, ad] = pdf.asOf;
    const asOf = `${2018 + ay}-${String(am).padStart(2, "0")}-${String(ad).padStart(2, "0")}`;
    if (asOf > todayJst()) fail(`基準日（${asOf}）が今日より先になっています`);
    console.log(`基準日: ${asOf} / 対象: ${targetMonth}月入所の選考`);

    // 「受け入れ対象歳児ではない」は記号としては載せず「—」にする
    const symbolLegend = pdf.legend
      .map((l) => ({ mark: shapeOf(l.mark), label: l.label, open: /枠$/.test(l.label) }))
      .filter((l) => l.mark !== NO_CLASS);
    if (symbolLegend.length < 3) fail(`記号の凡例が${symbolLegend.length}件しかありません`);
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
    let joined = 0;

    for (const section of pdf.sections) {
      for (const row of section.rows) {
        const name = squeeze(row.name);
        if (!name) fail(`${section.name}: 施設名が空の行があります`);
        if (seen.has(name)) fail(`施設名が重複しています: ${name}`);
        seen.add(name);

        const publicOrPrivate = squeeze(row.public);
        if (!publicOrPrivate) fail(`${name}: 公立か私立かが分かりません`);
        const category = `${publicOrPrivate}${squeeze(section.name)}`;
        if (!categories.includes(category)) categories.push(category);

        const symbols: (string | null)[] = [];
        for (let age = 0; age < AGE_COUNT; age++) {
          const stage = row.stages[age];
          const raw = squeeze(stage.text);
          if (raw === "") fail(`${name}: ${age}歳の欄が空です`);
          const shape = shapeOf(raw);
          if (shape === NO_CLASS) {
            noClass += 1;
            symbols.push(null);
            continue;
          }
          const mark = legendByShape.get(shape);
          if (!mark) fail(`${name}: 凡例にない記号です: 「${raw}」`);
          if (stage.joined) joined += 1;
          marks.set(mark, (marks.get(mark) ?? 0) + 1);
          symbols.push(mark);
        }
        if (symbols.every((s) => s === null)) fail(`${name}: 全てのクラスが対象外です`);

        facilities.push({
          id: name,
          name,
          w: null,
          c: categories.indexOf(category),
          vacancy: new Array(AGE_COUNT).fill(null),
          symbols,
        });
      }
    }

    if (facilities.length < 80) fail(`施設が${facilities.length}件しか取れていません`);
    // 結合された欄を配ったぶんだけ、取り込みのほうが多くなる
    for (const [mark, count] of marks) {
      const inText = Object.entries(pdf.markCounts)
        .filter(([m]) => shapeOf(m) === shapeOf(mark))
        .reduce((acc, [, v]) => acc + v, 0);
      if (count < inText || count > inText + joined) {
        fail(`「${mark}」の数が合いません（PDFの文字 ${inText}個 / 取り込み ${count}個）`);
      }
    }
    const total = [...marks.values()].reduce((a, b) => a + b, 0);
    const inTextTotal = Object.entries(pdf.markCounts)
      .filter(([m]) => shapeOf(m) !== NO_CLASS)
      .reduce((acc, [, v]) => acc + v, 0);
    if (total !== inTextTotal + joined) {
      fail(`記号の総数が合いません（PDFの文字 ${inTextTotal}個 + 結合 ${joined}個 / 取り込み ${total}個）`);
    }
    console.log(`記号の数はPDFの文字と一致しました（結合された欄で配ったぶん ${joined}個を含む）`);

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
    if (
      previous?.asOf === asOf &&
      previous?.sourceFiles?.vacancy === latest.url &&
      JSON.stringify(previous?.facilities ?? null) === JSON.stringify(facilities)
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
      sourceFiles: { vacancy: latest.url },
      metrics: ["symbol"],
      subtitle: `${targetMonth}月入所の選考に向けた空き状況`,
      notes: [
        "茨木市は空き状況を人数ではなく記号で公表しています。当サイトでも公式の記号のまま載せています。",
        "基準日時点のもので、各施設の保育体制や保育士の配置状況により受け入れができなくなることがあります。",
        "入所の可否は利用調整を経て決まります。施設への直接の問い合わせは控えるよう公式が案内しています。",
        "年齢はその年度の4月1日時点のものです。「受け入れ対象歳児ではない」とされている歳児は「—」にしています。",
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
    console.log(`  ${facilities.length}施設 / ${categories.length}種類`);
    console.log(`  受け入れ対象歳児ではない欄: ${noClass}`);
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
