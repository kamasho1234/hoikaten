/**
 * 関市の保育園等の空き状況を取り込む
 *
 * 実行: npm run vacancy:fetch:seki
 *
 * ## この自治体の特徴
 * - **1施設につき小さな表が1つ**あり、それが左右2列・縦にいくつも並ぶ。
 *   ふつうの「1行1施設」の表ではないので、
 *   「空き状況」という語を手がかりに表を1つずつ拾っている
 * - 区分（【公立保育園】【私立保育園】など）は左右それぞれの列に見出しが立つので、
 *   **同じ列の見出し**を採らないと公立と私立が入れ替わる
 * - **0歳と1歳をまとめて1つの欄にしている園がある**（南ヶ丘保育園など）。
 *   罫線からセルの左右を求め、またぐ年齢すべてに同じ記号を配っている
 * - 記号は ○＝3人以上／▲＝1〜2人ほど／×＝受入不可
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "seki";
const MUNICIPALITY_NAME = "関市";
const PREFECTURE = "岐阜県";
const SOURCE_NAME = "関市「保育園等入園の空き状況について」";
const INDEX_URL = "https://www.city.seki.lg.jp/0000020287.html";
const AGE_COUNT = 6;
const MIN_FACILITIES = 18;
const UA = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const EXTRACTOR = path.join(process.cwd(), "scripts", "seki-pdf-extract.py");

const LEGEND = [
  { mark: "〇", label: "3人以上の受入可能人数", open: true },
  { mark: "▲", label: "1〜2人ほどの受入可能人数", open: true },
  { mark: "×", label: "受入不可", open: false },
];

function fail(message: string): never {
  console.error(`\n[中断] ${message}`);
  process.exit(1);
}

function todayJst(): string {
  const jst = new Date(Date.now() + 9 * 60 * 60 * 1000);
  return jst.toISOString().slice(0, 10);
}

function squeeze(s: string): string {
  return (s ?? "").replace(/<[^>]+>/g, "").replace(/[\s　]/g, "");
}

function toHalfWidth(s: string): string {
  return s.replace(/[０-９]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xfee0));
}

function reiwaToYear(reiwa: number): number {
  return reiwa + 2018;
}

type PdfRow = { kind: string; name: string; marks: (string | null)[]; mergedCells: number };
type PdfResult = {
  text: string;
  markCounts: Record<string, number>;
  blanks: number;
  rows: PdfRow[];
};

function runPython(args: string[]): string {
  const candidates = process.env.PYTHON ? [process.env.PYTHON] : ["python3", "python"];
  let lastError = "";
  for (const bin of candidates) {
    try {
      return execFileSync(bin, args, { encoding: "utf-8", maxBuffer: 128 * 1024 * 1024 });
    } catch (err) {
      lastError = String((err as { stderr?: string })?.stderr ?? err);
    }
  }
  fail(`Pythonの実行に失敗しました: ${lastError}`);
}

async function main(): Promise<void> {
  const r0 = await fetch(INDEX_URL, { headers: { "User-Agent": UA } });
  if (!r0.ok) fail(`ページの取得に失敗しました（${r0.status}）: ${INDEX_URL}`);
  const html = await r0.text();

  type Link = { url: string; text: string; key: number };
  const links: Link[] = [];
  for (const m of html.matchAll(/<a\s[^>]*href="([^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/gi)) {
    const text = toHalfWidth(squeeze(m[2]));
    // 「令和8年度10月空き状況」
    const t = /令和(\d+)年度(\d{1,2})月空き状況/.exec(text);
    if (!t) continue;
    const year = Number(t[1]);
    const month = Number(t[2]);
    // 年度の並び（4月始まり）で比べる
    links.push({
      url: new URL(m[1], INDEX_URL).toString(),
      text,
      key: year * 100 + (month >= 4 ? month : month + 12),
    });
  }
  if (links.length === 0) fail("空き状況のPDFが見つかりません");
  links.sort((a, b) => b.key - a.key);
  const link = links[0];
  console.log(`PDF: ${link.text}\n  ${link.url}`);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "seki-vacancy-"));
  try {
    const r = await fetch(link.url, {
      headers: { "User-Agent": UA, Referer: INDEX_URL },
    });
    if (!r.ok) fail(`PDFの取得に失敗しました（${r.status}）: ${link.url}`);
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.subarray(0, 4).toString() !== "%PDF") fail(`PDFではありません: ${link.url}`);
    const file = path.join(tmpDir, "seki.pdf");
    fs.writeFileSync(file, buf);

    let pdf: PdfResult;
    try {
      pdf = JSON.parse(runPython([EXTRACTOR, file])) as PdfResult;
    } catch (err) {
      fail(`抽出結果を読めません: ${String(err)}`);
    }

    // 時点は資料の見出し「令和８年１０月入園申込（R８.９.１現在）」
    const plain = toHalfWidth(squeeze(pdf.text));
    const mAsOf = /R(\d+)\.(\d{1,2})\.(\d{1,2})現在/.exec(plain);
    if (!mAsOf) fail("資料から時点（R◯.◯.◯現在）を読めません");
    const asOf = `${reiwaToYear(Number(mAsOf[1]))}-${String(Number(mAsOf[2])).padStart(2, "0")}-${String(
      Number(mAsOf[3]),
    ).padStart(2, "0")}`;
    if (asOf > todayJst()) fail(`時点の日付（${asOf}）が今日より先になっています`);

    const mTarget = /令和(\d+)年(\d{1,2})月入園申込/.exec(plain);
    if (!mTarget) fail("資料から対象の入園月を読めません");
    const targetLabel = `${reiwaToYear(Number(mTarget[1]))}年${Number(mTarget[2])}月`;
    console.log(`時点: ${asOf} ／ 対象: ${targetLabel}入園`);

    const known = new Set(LEGEND.map((l) => l.mark));
    const categories: string[] = [];
    const facilities: {
      id: string;
      name: string;
      w: null;
      c: number;
      vacancy: (number | null)[];
      symbols: (string | null)[];
      note?: string;
    }[] = [];
    const seen = new Set<string>();
    const marks = new Map<string, number>();
    let blanks = 0;
    let merged = 0;

    for (const row of pdf.rows) {
      const name = squeeze(row.name);
      if (!name) fail("施設名が空の行があります");
      if (seen.has(name)) fail(`施設名が重複しています: ${name}`);
      seen.add(name);

      const kind = squeeze(row.kind);
      if (!kind) fail(`${name}: 区分が空です`);
      let c = categories.indexOf(kind);
      if (c < 0) {
        categories.push(kind);
        c = categories.length - 1;
      }

      const symbols: (string | null)[] = [];
      for (let age = 0; age < AGE_COUNT; age++) {
        const raw = row.marks[age];
        if (raw === null) {
          blanks += 1;
          symbols.push(null);
          continue;
        }
        // 資料は「○」（丸）で書かれているので、当サイトの表記「〇」に寄せる
        const mark = squeeze(raw) === "○" ? "〇" : squeeze(raw);
        if (!known.has(mark)) fail(`${name}: ${age}歳児が凡例にない記号です（「${mark}」）`);
        marks.set(mark, (marks.get(mark) ?? 0) + 1);
        symbols.push(mark);
      }
      if (symbols.every((s) => s === null)) fail(`${name}: 記号が1つもありません`);

      merged += row.mergedCells;
      facilities.push({
        id: name,
        name,
        w: null,
        c,
        vacancy: new Array(AGE_COUNT).fill(null),
        symbols,
        ...(row.mergedCells > 0
          ? { note: "公式の表でいくつかの年齢が1つの欄にまとめられているため、同じ記号にしています。" }
          : {}),
      });
    }

    if (facilities.length < MIN_FACILITIES) {
      fail(`施設が${facilities.length}件しか取れていません（${MIN_FACILITIES}件以上のはず）`);
    }
    // 検算1: 記号の数がPDFの読み取りと合うか（「○」は「〇」に寄せたぶんを足し戻す）
    const pdfCounts = new Map<string, number>();
    for (const [mark, count] of Object.entries(pdf.markCounts)) {
      const key = mark === "○" ? "〇" : mark;
      pdfCounts.set(key, (pdfCounts.get(key) ?? 0) + count);
    }
    for (const [mark, count] of marks) {
      if (count !== pdfCounts.get(mark)) {
        fail(`「${mark}」の数が合いません（PDF ${pdfCounts.get(mark)} / 取り込み ${count}）`);
      }
    }
    // 検算2: 空らんの数がPDFと合うか
    if (blanks !== pdf.blanks) {
      fail(`空らんの数が合いません（PDF ${pdf.blanks} / 取り込み ${blanks}）`);
    }
    // 検算3: 欄の数が施設数×年齢数になるか
    const total = [...marks.values()].reduce((a, b) => a + b, 0) + blanks;
    if (total !== facilities.length * AGE_COUNT) {
      fail(`欄の数が合いません（${total} / 施設${facilities.length}×${AGE_COUNT}）`);
    }
    console.log(
      `${facilities.length}施設 ／ ${[...marks].map(([m, n]) => `${m}${n}`).join("・")}・クラスなし${blanks}` +
        (merged > 0 ? ` ／ まとめて公表されている欄 ${merged}件` : ""),
    );

    const previous = fs.existsSync(OUT_PATH)
      ? (JSON.parse(fs.readFileSync(OUT_PATH, "utf-8")) as {
          asOf?: string;
          facilities?: unknown[];
        })
      : null;
    if (previous?.facilities && facilities.length < previous.facilities.length * 0.9) {
      fail(
        `施設数が大きく減っています（前回 ${previous.facilities.length}件 → 今回 ${facilities.length}件）`,
      );
    }
    if (previous?.asOf === asOf) {
      console.log(`公式データの時点が前回と同じ（${asOf}）のため更新はありません。`);
      return;
    }

    const notes = [
      `関市は空き状況を人数ではなく記号で公表しています。これは${targetLabel}入園申込にあたる分で、${asOf}時点のものです。`,
      `公式の凡例は ${LEGEND.map((l) => `「${l.mark}」${l.label}`).join("、")} です。`,
      "公式の表で記号が無い年齢は「—」にしています。受入ができないときは「×」と書かれるので、記号が無いのはその年齢のクラスを設けていないことを表します。",
      "年齢は令和8年4月1日時点の年齢が基準になります。入園希望者は、事前に各保育園へ相談するよう市が案内しています。",
      "認定こども園の幼稚園部分については、直接園にお尋ねください。",
      ...(merged > 0
        ? [
            "公式の表でいくつかの園は複数の年齢を1つの欄にまとめて公表しているため、その欄に含まれる年齢すべてに同じ記号を入れています。",
          ]
        : []),
    ];

    const dataset = {
      municipalitySlug: MUNICIPALITY_SLUG,
      municipalityName: MUNICIPALITY_NAME,
      prefecture: PREFECTURE,
      asOf,
      fetchedAt: todayJst(),
      sourceName: SOURCE_NAME,
      sourceUrl: INDEX_URL,
      sourceFiles: { vacancy: link.url },
      metrics: ["symbol"],
      subtitle: `${targetLabel}入園申込にあたる空き状況`,
      notes,
      wards: [] as string[],
      categories,
      symbolLegend: LEGEND,
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
    console.log(`  ${facilities.length}施設 / ${categories.join("・")}`);
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

main().catch((err) => fail(String(err)));
