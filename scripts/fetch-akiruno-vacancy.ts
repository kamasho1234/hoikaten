/**
 * あきる野市の保育施設受入可能数を取り込む
 *
 * 実行: npm run vacancy:fetch:akiruno
 *
 * ## この自治体の特徴
 * - 人数（受入可能数）で公表。区分ごとに「小 計」、いちばん下に「合 計」があるので
 *   両方を検算に使える
 * - 「―」はそのクラスがないことを表す（受入可能数0とは別）
 * - いちばん左の「公立」「私立」の区分は、どの行までを指すのかを機械的に決められないので
 *   取り込まない（罫線に太さの差がなく、セルも結合されていない）
 * - PDFのURLに月が入る（R8.9.pdf）ので、ページのリンクから最新のものを選ぶ
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "akiruno";
const MUNICIPALITY_NAME = "あきる野市";
const SOURCE_NAME = "あきる野市「認可保育所 受入可能数一覧」";
const INDEX_URL = "https://www.city.akiruno.tokyo.jp/0000016485.html";
const AGE_COUNT = 6;
const MIN_FACILITIES = 20;
const UA = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const EXTRACTOR = path.join(process.cwd(), "scripts", "akiruno-pdf-extract.py");

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

function reiwaToYear(reiwa: number): number {
  return reiwa + 2018;
}

type PdfResult = {
  asOf: [number, number, number];
  target: [number, number];
  total: (number | null)[];
  groups: {
    subtotal: (number | null)[];
    rows: { name: string; counts: (number | null)[] }[];
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

  const res = await fetch(INDEX_URL, { headers: { "User-Agent": UA }, redirect: "follow" });
  if (!res.ok) fail(`公式ページが ${res.status} を返しました`);
  const html = await res.text();

  // ファイル名が「R8.9.pdf」のように年月になっている
  const links = [...html.matchAll(/href="([^"]*R(\d+)\.(\d+)\.pdf)"/gi)].map((m) => ({
    url: new URL(m[1], res.url || INDEX_URL).toString(),
    key: Number(m[2]) * 100 + Number(m[3]),
  }));
  if (links.length === 0) fail("受入可能数のPDF（R年.月.pdf）が見つかりません");
  links.sort((a, b) => b.key - a.key);
  const link = links[0];
  console.log(`PDF: ${link.url}`);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "akiruno-vacancy-"));
  try {
    const r = await fetch(link.url, { headers: { "User-Agent": UA } });
    if (!r.ok) fail(`PDFの取得に失敗しました（${r.status}）: ${link.url}`);
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.subarray(0, 4).toString() !== "%PDF") fail(`PDFではありません: ${link.url}`);
    const file = path.join(tmpDir, "akiruno.pdf");
    fs.writeFileSync(file, buf);

    let pdf: PdfResult;
    try {
      pdf = JSON.parse(runPython([EXTRACTOR, file])) as PdfResult;
    } catch (err) {
      fail(`抽出結果を読めません: ${String(err)}`);
    }

    const [reiwa, month, day] = pdf.asOf;
    const asOf = `${reiwaToYear(reiwa)}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    if (!/^\d{4}-\d{2}-\d{2}$/.test(asOf)) fail(`時点の日付を組み立てられません: ${asOf}`);
    if (asOf > todayJst()) fail(`時点の日付（${asOf}）が今日より先になっています`);
    // ファイル名の年月とPDFの中の年月が合っているか
    if (link.key !== pdf.target[0] * 100 + pdf.target[1]) {
      fail(
        `ファイル名（R${Math.floor(link.key / 100)}.${link.key % 100}）とPDFの中の月（令和${pdf.target[0]}年${pdf.target[1]}月）が違います`
      );
    }
    const targetLabel = `${reiwaToYear(pdf.target[0])}年${pdf.target[1]}月`;
    console.log(`時点: ${asOf} ／ 対象: ${targetLabel}`);

    const facilities: {
      id: string;
      name: string;
      w: null;
      c: null;
      vacancy: (number | null)[];
    }[] = [];
    const seen = new Set<string>();
    let vacancyTotal = 0;

    for (const group of pdf.groups) {
      // 検算1: 区分ごとの「小 計」と合うか
      for (let age = 0; age < AGE_COUNT; age++) {
        const sum = group.rows.reduce((acc, r) => acc + (r.counts[age] ?? 0), 0);
        if (sum !== (group.subtotal[age] ?? 0)) {
          fail(`小計の${age}歳が合いません（小計 ${group.subtotal[age]} / 取り込み ${sum}）`);
        }
      }

      for (const row of group.rows) {
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

        facilities.push({ id: name, name, w: null, c: null, vacancy: row.counts });
      }
    }

    if (facilities.length < MIN_FACILITIES) {
      fail(`施設が${facilities.length}件しか取れていません（${MIN_FACILITIES}件以上のはず）`);
    }

    // 検算2: いちばん下の「合 計」と合うか
    for (let age = 0; age < AGE_COUNT; age++) {
      const sum = facilities.reduce((acc, f) => acc + (f.vacancy[age] ?? 0), 0);
      if (sum !== (pdf.total[age] ?? 0)) {
        fail(`合計の${age}歳が合いません（合計 ${pdf.total[age]} / 取り込み ${sum}）`);
      }
    }
    console.log(
      `区分ごとの「小 計」といちばん下の「合 計」の両方と一致しました（${facilities.length}施設 / 空き ${vacancyTotal}人）`
    );

    const previous = fs.existsSync(OUT_PATH)
      ? (JSON.parse(fs.readFileSync(OUT_PATH, "utf-8")) as { asOf?: string; facilities?: unknown[] })
      : null;
    if (previous?.facilities && facilities.length < previous.facilities.length * 0.9) {
      fail(`施設数が大きく減っています（前回 ${previous.facilities.length}件 → 今回 ${facilities.length}件）`);
    }
    if (previous?.asOf === asOf) {
      console.log(`公式データの時点が前回と同じ（${asOf}）のため更新はありません。`);
      return;
    }

    const notes = [
      `あきる野市が公開しているのは${targetLabel}の保育施設受入可能数で、${asOf}時点のものです。`,
      "公式の表で「―」になっている年齢は「—」にしています。その年齢のクラスがないことを表しています。",
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
      subtitle: `${targetLabel}の受入可能数`,
      notes,
      wards: [],
      categories: [],
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
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

main().catch((err) => fail(String(err)));
