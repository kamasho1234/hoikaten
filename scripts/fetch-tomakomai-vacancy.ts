/**
 * 苫小牧市の保育施設の空き状況（入所予報）を取り込む
 *
 * 実行: npm run vacancy:fetch:tomakomai
 *
 * ## この自治体の特徴
 * - **公式は空きの状況を絵文字で表している**（😄＝入所人員に空きがある、
 *   😊＝入所人員に空きが出る可能性がある、−＝入所人員を満たしている）。
 *   当サイトは絵文字を使わない方針なので **○／△／✕ に置き換えて載せる**。
 *   意味は公式の説明をそのまま使い、置き換えたことを注記に書く
 * - 4ページで種別が分かれている（保育所／認定こども園（保育部分）／小規模保育施設）
 * - 「令和8年9月ぶんの予報（8月1日時点）」なので対象月と基準日が別
 * - 年度ページのURLに年度が入る（aki08.html）ので、年度が変わったら気づけるようにする
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "tomakomai";
const MUNICIPALITY_NAME = "苫小牧市";
const SOURCE_NAME = "苫小牧市「市内認可保育所等入所予報」";
const INDEX_BASE =
  "https://www.city.tomakomai.hokkaido.jp/kenko/kosodate/kanrenshisetsu/kyokahoikujo/";
const AGE_COUNT = 6;
const MIN_FACILITIES = 40;
const UA = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";

/** 公式の絵文字を、当サイトで使う記号に置き換える */
const REPLACEMENTS: { from: string[]; to: string }[] = [
  { from: ["😄"], to: "○" },
  { from: ["😊"], to: "△" },
  { from: ["-", "−", "ー", "―"], to: "✕" },
];

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const EXTRACTOR = path.join(process.cwd(), "scripts", "tomakomai-pdf-extract.py");

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

/** 公式の絵文字を当サイトの記号に置き換える。置き換えられない値は null */
function replaceMark(raw: string): string | null {
  for (const rule of REPLACEMENTS) {
    if (rule.from.includes(raw)) return rule.to;
  }
  return null;
}

type PdfResult = {
  target: number;
  asOf: [number, number, number];
  legend: { mark: string; label: string }[];
  notes: string[];
  categories: string[];
  markCounts: Record<string, number>;
  rows: { category: string; name: string; address: string; marks: (string | null)[] }[];
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

async function getHtml(url: string): Promise<string | null> {
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) return null;
  return res.text();
}

async function main() {
  console.log(`${MUNICIPALITY_NAME}の入所予報を取り込みます`);

  // 年度ページのURLに年度が入っている（aki08.html＝令和8年度）。
  // 新しい年度のページが出ていたらそちらを使う
  const jst = new Date(Date.now() + 9 * 60 * 60 * 1000);
  const fiscalYear = jst.getUTCMonth() + 1 >= 4 ? jst.getUTCFullYear() : jst.getUTCFullYear() - 1;
  const currentReiwa = fiscalYear - 2018;

  let indexUrl = "";
  let html = "";
  for (const reiwa of [currentReiwa + 1, currentReiwa]) {
    const url = `${INDEX_BASE}aki${String(reiwa).padStart(2, "0")}.html`;
    const body = await getHtml(url);
    if (body) {
      indexUrl = url;
      html = body;
      break;
    }
  }
  if (!html) fail(`年度のページが見つかりません（${INDEX_BASE}akiNN.html）`);
  console.log(`公式ページ: ${indexUrl}\n`);

  const links = [...html.matchAll(/<a[^>]+href="([^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => ({ url: new URL(m[1], indexUrl).toString(), text: toHalfWidth(squeeze(m[2])) }))
    .map((l) => {
      const m = l.text.match(/令和(\d+)年(\d+)月市内認可保育所等入所予報/);
      if (!m) return null;
      const [reiwa, month] = m.slice(1, 3).map(Number);
      // 年度は4月始まりなので、1〜3月は後ろに並べる
      return { ...l, reiwa, month, sortKey: reiwa * 100 + (month >= 4 ? month : month + 12) };
    })
    .filter((v): v is NonNullable<typeof v> => v !== null);
  if (links.length === 0)
    fail("入所予報のPDFが見つかりません。ページの構成が変わった可能性があります。");
  const latest = links.reduce((a, b) => (b.sortKey > a.sortKey ? b : a));
  console.log(`最新: ${latest.text}\n  ${latest.url}`);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "tomakomai-vacancy-"));
  try {
    const r = await fetch(latest.url, { headers: { "User-Agent": UA } });
    if (!r.ok) fail(`PDFの取得に失敗しました（${r.status}）: ${latest.url}`);
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.subarray(0, 4).toString() !== "%PDF") fail(`PDFではありません: ${latest.url}`);
    const file = path.join(tmpDir, "tomakomai.pdf");
    fs.writeFileSync(file, buf);

    let pdf: PdfResult;
    try {
      pdf = JSON.parse(runPython([EXTRACTOR, file])) as PdfResult;
    } catch (err) {
      fail(`抽出結果を読めません: ${String(err)}`);
    }

    if (pdf.target !== latest.month) {
      fail(`PDFの対象月（${pdf.target}月）がリンクの文言（${latest.month}月）と違います`);
    }
    const [reiwa, asOfMonth, day] = pdf.asOf;
    const asOf = `${2018 + reiwa}-${String(asOfMonth).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    if (!/^\d{4}-\d{2}-\d{2}$/.test(asOf)) fail(`基準日を組み立てられません: ${asOf}`);
    if (asOf > todayJst()) fail(`基準日（${asOf}）が今日より先になっています`);
    const targetYear = 2018 + latest.reiwa;
    console.log(`基準日: ${asOf}（${targetYear}年${pdf.target}月ぶんの予報）`);

    // 凡例の絵文字を当サイトの記号に置き換える。意味は公式の説明のまま
    const symbolLegend = pdf.legend.map((l) => {
      const mark = replaceMark(l.mark);
      if (!mark) fail(`凡例の記号を置き換えられません: 「${l.mark}」`);
      return { mark, label: l.label, open: /ある$/.test(l.label) };
    });
    if (symbolLegend.length !== REPLACEMENTS.length) {
      fail(`凡例が${symbolLegend.length}件です（${REPLACEMENTS.length}件のはず）`);
    }
    if (!symbolLegend.some((l) => l.open)) fail("空きありの記号が凡例にありません");
    console.log(
      `凡例（置き換え後）: ${symbolLegend.map((l) => `${l.mark}＝${l.label}`).join(" / ")}`
    );
    const allowed = new Set(symbolLegend.map((l) => l.mark));

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

    for (const row of pdf.rows) {
      const name = squeeze(row.name);
      if (!name) fail("施設名が空の行があります");
      if (seen.has(name)) fail(`施設名が重複しています: ${name}`);
      seen.add(name);

      let c = categories.indexOf(row.category);
      if (c < 0) {
        categories.push(row.category);
        c = categories.length - 1;
      }

      const symbols: (string | null)[] = [];
      for (let age = 0; age < AGE_COUNT; age++) {
        const raw = row.marks[age];
        // Python 側でクラスなし（結合セル・斜線）と判断した欄
        if (raw === null) {
          noClass += 1;
          symbols.push(null);
          continue;
        }
        const mark = replaceMark(squeeze(raw));
        if (!mark || !allowed.has(mark)) {
          fail(`${name}: ${age}歳児が凡例にない値です: 「${raw}」`);
        }
        marks.set(mark, (marks.get(mark) ?? 0) + 1);
        symbols.push(mark);
      }
      if (symbols.every((s) => s === null)) fail(`${name}: 全てのクラスが空です`);

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

    // 検算1: 記号とクラスなしの合計が施設数×クラス数になるか
    const total = [...marks.values()].reduce((a, b) => a + b, 0);
    if (total + noClass !== facilities.length * AGE_COUNT) {
      fail(
        `欄の数が合いません（記号${total}＋クラスなし${noClass} / 施設${facilities.length}×${AGE_COUNT}）`
      );
    }

    // 検算2: 置き換え前の絵文字の数がPDFの文字と合うか
    for (const rule of REPLACEMENTS) {
      const inText = Object.entries(pdf.markCounts)
        .filter(([m]) => rule.from.includes(m))
        .reduce((acc, [, v]) => acc + v, 0);
      const count = marks.get(rule.to) ?? 0;
      if (count !== inText) {
        fail(
          `「${rule.from[0]}」（→${rule.to}）の数が合いません（PDFの文字 ${inText}個 / 取り込み ${count}個）`
        );
      }
    }
    console.log("記号の数はPDFの文字と一致し、欄の数も施設数×クラス数と合いました");

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

    const notes = [
      `苫小牧市は空きの状況を人数ではなく記号で公表しています。これは${targetYear}年${pdf.target}月ぶんの予報（${asOf}時点）です。`,
      `公式の表では空きの状況が絵文字で表されていますが、当サイトでは ${symbolLegend
        .map((l) => `「${l.mark}」（${l.label}）`)
        .join("、")} に置き換えて表示しています。記号の意味は公式の説明のままです。`,
      ...pdf.notes,
      "設けていないクラスは「—」にしています。",
    ];

    const dataset = {
      municipalitySlug: MUNICIPALITY_SLUG,
      municipalityName: MUNICIPALITY_NAME,
      asOf,
      fetchedAt: todayJst(),
      sourceName: SOURCE_NAME,
      sourceUrl: indexUrl,
      sourceFiles: { vacancy: latest.url },
      metrics: ["symbol"],
      subtitle: `${targetYear}年${pdf.target}月ぶんの入所予報`,
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
    console.log(`  設けていないクラス: ${noClass}`);
    console.log(
      `  種別ごとの数: ${categories
        .map((name, i) => `${name} ${facilities.filter((f) => f.c === i).length}`)
        .join(" / ")}`
    );
    console.log("");
    console.log("  記号の出てきた数（置き換え後）");
    for (const item of symbolLegend) {
      console.log(`  ${item.mark}（${item.label}） ${marks.get(item.mark) ?? 0}`);
    }
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

main().catch((err) => fail(String(err)));
