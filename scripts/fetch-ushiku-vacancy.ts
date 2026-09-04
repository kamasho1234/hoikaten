/**
 * 牛久市の入園受入見込人数を取り込む
 *
 * 実行: npm run vacancy:fetch:ushiku
 *
 * ## この自治体の特徴
 * - 人数（受入見込人数）で公表。区分（公立保育園・私立保育園・認定こども園・
 *   小規模保育園）で絞り込める
 * - **月ごとに記事のページが分かれる**ので、募集の一覧から
 *   「令和8年度10月入園受入見込人数」のいちばん新しい記事をたどる
 * - 各行の「募集計」といちばん下の「合 計」の両方で検算できる
 * - 時点はPDFの右上に「2026/8/19」の形で入っている
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "ushiku";
const MUNICIPALITY_NAME = "牛久市";
const SOURCE_NAME = "牛久市「入園受入見込人数」";
// 月ごとに記事が分かれるので、募集ページからいちばん新しい記事をたどる
const INDEX_URL =
  "https://www.city.ushiku.lg.jp/oyako-kosodate-kyoiku/kosodate/hoikuen/hoikuen-moshikomi-boshu/page000431.html";
const AGE_COUNT = 6;
const MIN_FACILITIES = 15;
const UA = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const EXTRACTOR = path.join(process.cwd(), "scripts", "ushiku-pdf-extract.py");

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

type PdfResult = {
  asOf: [number, number, number];
  target: [number, number];
  totals: (number | null)[];
  notes: string[];
  rows: { kind: string; name: string; counts: (number | null)[] }[];
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

  const res = await fetch(INDEX_URL, { headers: { "User-Agent": UA }, redirect: "follow" });
  if (!res.ok) fail(`公式ページが ${res.status} を返しました`);
  const html = await res.text();

  const articles = [...html.matchAll(/<a[^>]+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => ({
      url: new URL(m[1], res.url || INDEX_URL).toString(),
      text: toHalfWidth(squeeze(m[2])),
    }))
    .map((l) => {
      const m = /令和(\d+)年度(\d+)月入園受入見込人数/.exec(l.text);
      return { ...l, key: m ? Number(m[1]) * 100 + Number(m[2]) : 0 };
    })
    .filter((l) => l.key > 0)
    .sort((a, b) => b.key - a.key);
  if (articles.length === 0) fail("「令和N年度M月入園受入見込人数」の記事が見つかりません");
  const article = articles[0];
  console.log(`記事: ${article.text}
  ${article.url}`);

  const articleRes = await fetch(article.url, { headers: { "User-Agent": UA }, redirect: "follow" });
  if (!articleRes.ok) fail(`記事のページが ${articleRes.status} を返しました`);
  const articleHtml = await articleRes.text();
  const pdfUrls = [
    ...new Set(
      [...articleHtml.matchAll(/href="([^"]+\.pdf)"/gi)].map((m) =>
        new URL(m[1], articleRes.url || article.url).toString()
      )
    ),
  ];
  if (pdfUrls.length !== 1) fail(`記事のPDFが${pdfUrls.length}種類あります（1種類のはず）`);
  const link = { url: pdfUrls[0], text: article.text, key: article.key };
  console.log(`PDF: ${link.url}`);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "ushiku-vacancy-"));
  try {
    const r = await fetch(link.url, { headers: { "User-Agent": UA } });
    if (!r.ok) fail(`PDFの取得に失敗しました（${r.status}）: ${link.url}`);
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.subarray(0, 4).toString() !== "%PDF") fail(`PDFではありません: ${link.url}`);
    const file = path.join(tmpDir, "ushiku.pdf");
    fs.writeFileSync(file, buf);

    let pdf: PdfResult;
    try {
      pdf = JSON.parse(runPython([EXTRACTOR, file])) as PdfResult;
    } catch (err) {
      fail(`抽出結果を読めません: ${String(err)}`);
    }

    const [year, month, day] = pdf.asOf;
    const asOf = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    if (!/^\d{4}-\d{2}-\d{2}$/.test(asOf)) fail(`時点の日付を組み立てられません: ${asOf}`);
    if (asOf > todayJst()) fail(`時点の日付（${asOf}）が今日より先になっています`);
    const targetLabel = `${reiwaToYear(pdf.target[0])}年度${pdf.target[1]}月`;
    if (link.key !== pdf.target[0] * 100 + pdf.target[1]) {
      fail(
        `記事の題（${link.text}）とPDFの中の月（令和${pdf.target[0]}年度${pdf.target[1]}月）が違います`
      );
    }
    console.log(`時点: ${asOf} ／ 対象: ${targetLabel}入所`);

    const categories: string[] = [];
    const facilities: {
      id: string;
      name: string;
      w: null;
      c: number;
      vacancy: (number | null)[];
    }[] = [];
    const seen = new Set<string>();
    let vacancyTotal = 0;

    for (const row of pdf.rows) {
      const name = squeeze(row.name);
      if (!name) fail("施設名が空の行があります");
      if (seen.has(name)) fail(`施設名が重複しています: ${name}`);
      seen.add(name);

      for (const value of row.counts) {
        if (value === null) continue;
        if (!Number.isInteger(value) || value < 0 || value > 99) {
          fail(`${name}: 人数が想定の範囲にありません（${value}）`);
        }
        vacancyTotal += value;
      }

      const kind = squeeze(row.kind);
      if (!kind) fail(`${name}: 区分が空です`);
      let c = categories.indexOf(kind);
      if (c < 0) {
        categories.push(kind);
        c = categories.length - 1;
      }

      facilities.push({ id: name, name, w: null, c, vacancy: row.counts });
    }

    if (facilities.length < MIN_FACILITIES) {
      fail(`施設が${facilities.length}件しか取れていません（${MIN_FACILITIES}件以上のはず）`);
    }

    // 検算: 年齢ごとの合計がPDFの「合 計」の行と合うか
    for (let age = 0; age < AGE_COUNT; age++) {
      const sum = facilities.reduce((acc, f) => acc + (f.vacancy[age] ?? 0), 0);
      if (sum !== (pdf.totals[age] ?? 0)) {
        fail(`${age}歳児が合計と合いません（合計 ${pdf.totals[age]} / 取り込み ${sum}）`);
      }
    }
    console.log(
      `年齢ごとの合計がPDFの「合 計」の行と一致しました（${facilities.length}施設 / 受入見込 ${vacancyTotal}人）`
    );

    const previous = fs.existsSync(OUT_PATH)
      ? (JSON.parse(fs.readFileSync(OUT_PATH, "utf-8")) as { asOf?: string; facilities?: unknown[]; sourceFiles?: Record<string, string> })
      : null;
    if (previous?.facilities && facilities.length < previous.facilities.length * 0.9) {
      fail(`施設数が大きく減っています（前回 ${previous.facilities.length}件 → 今回 ${facilities.length}件）`);
    }
    // 自治体は基準日を変えずに資料を差し替えることがある。
    // 取り込み元のURLも同じときだけ、書き換えを見送る
    if (
      previous?.asOf === asOf &&
      previous?.sourceFiles?.vacancy === link.url &&
      JSON.stringify(previous?.facilities ?? null) === JSON.stringify(facilities)
    ) {
      console.log(`公式データの時点が前回と同じ（${asOf}）のため更新はありません。`);
      return;
    }

    const notes = [
      `牛久市が公開しているのは${targetLabel}入園の受入見込人数で、${asOf}時点のものです。`,
      ...pdf.notes,
    ];

    const dataset = {
      municipalitySlug: MUNICIPALITY_SLUG,
      municipalityName: MUNICIPALITY_NAME,
      asOf,
      fetchedAt: todayJst(),
      sourceName: SOURCE_NAME,
      sourceUrl: INDEX_URL,
      sourceFiles: { vacancy: link.url },
      metrics: ["vacancy"],
      subtitle: `${targetLabel}入園の受入見込人数`,
      notes,
      wards: [],
      categories,
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
    console.log(`  ${categories.join("・")}`);
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

main().catch((err) => fail(String(err)));
