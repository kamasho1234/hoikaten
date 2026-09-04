/**
 * 中津市の認可保育施設 受入可能枠を取り込む
 *
 * 実行: npm run vacancy:fetch:nakatsu
 *
 * ## この自治体の特徴
 * - 人数（受入可能枠）で公表。2・3号認定（保育を必要とする枠）だけの数で、
 *   1号認定は載っていない
 * - いちばん下に「合 計」の行があるので検算に使える
 * - 施設に通し番号が振られているので、1から連番になっているかも確かめる
 * - 施設類型のカッコが全角と半角で混ざっているのでそろえる
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "nakatsu";
const MUNICIPALITY_NAME = "中津市";
const SOURCE_NAME = "中津市「認可保育施設 受入可能枠一覧【2・3号】」";
const INDEX_URL = "https://www.city-nakatsu.jp/doc/2020100100088/";
const AGE_COUNT = 6;
const MIN_FACILITIES = 30;
const UA = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const EXTRACTOR = path.join(process.cwd(), "scripts", "nakatsu-pdf-extract.py");

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

/** 「保育所（公立)」のようにカッコが混ざるのでそろえる */
function normalizeKind(kind: string): string {
  return kind.replace(/\(/g, "（").replace(/\)/g, "）");
}

function reiwaToYear(reiwa: number): number {
  return reiwa + 2018;
}

type PdfResult = {
  asOf: [number, number, number];
  target: number;
  notes: string[];
  totals: number[];
  rows: { no: number; name: string; kind: string; counts: (number | null)[] }[];
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

  const links = [...html.matchAll(/<a[^>]+href="([^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => ({
      url: new URL(m[1], res.url || INDEX_URL).toString(),
      text: toHalfWidth(squeeze(m[2])),
    }))
    .filter((l) => l.text.includes("受入可能枠一覧"));
  if (links.length !== 1) fail(`受入可能枠一覧のPDFが${links.length}件あります（1件のはず）`);
  const link = links[0];
  console.log(`PDF: ${link.text}\n  ${link.url}`);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "nakatsu-vacancy-"));
  try {
    const r = await fetch(link.url, { headers: { "User-Agent": UA } });
    if (!r.ok) fail(`PDFの取得に失敗しました（${r.status}）: ${link.url}`);
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.subarray(0, 4).toString() !== "%PDF") fail(`PDFではありません: ${link.url}`);
    const file = path.join(tmpDir, "nakatsu.pdf");
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
    console.log(`時点: ${asOf} ／ 対象: ${pdf.target}月利用調整後`);

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

      const kind = normalizeKind(squeeze(row.kind));
      if (!kind) fail(`${name}: 施設類型が空です`);
      let c = categories.indexOf(kind);
      if (c < 0) {
        categories.push(kind);
        c = categories.length - 1;
      }

      for (const value of row.counts) {
        if (value === null) continue;
        if (!Number.isInteger(value) || value < 0 || value > 99) {
          fail(`${name}: 人数が想定の範囲にありません（${value}）`);
        }
        vacancyTotal += value;
      }

      facilities.push({ id: name, name, w: null, c, vacancy: row.counts });
    }

    if (facilities.length < MIN_FACILITIES) {
      fail(`施設が${facilities.length}件しか取れていません（${MIN_FACILITIES}件以上のはず）`);
    }

    // 検算1: 通し番号が1から連番になっているか
    for (let index = 0; index < pdf.rows.length; index++) {
      if (pdf.rows[index].no !== index + 1) {
        fail(`通し番号が飛んでいます（${index + 1}番目が${pdf.rows[index].no}番）`);
      }
    }
    // 検算2: 年齢ごとの合計がPDFの合計行と合うか
    for (let age = 0; age < AGE_COUNT; age++) {
      const sum = facilities.reduce((acc, f) => acc + (f.vacancy[age] ?? 0), 0);
      if (sum !== pdf.totals[age]) {
        fail(`${age}歳児が合計と合いません（合計 ${pdf.totals[age]} / 取り込み ${sum}）`);
      }
    }
    console.log(
      `通し番号は1〜${facilities.length}の連番で、年齢ごとの合計もPDFの合計行と一致しました（空き ${vacancyTotal}人）`
    );

    const previous = fs.existsSync(OUT_PATH)
      ? (JSON.parse(fs.readFileSync(OUT_PATH, "utf-8")) as { asOf?: string; facilities?: unknown[]; sourceFiles?: Record<string, string> })
      : null;
    if (previous?.facilities && facilities.length < previous.facilities.length * 0.9) {
      fail(`施設数が大きく減っています（前回 ${previous.facilities.length}件 → 今回 ${facilities.length}件）`);
    }
    // 自治体は基準日を変えずに資料を差し替えることがある。
    // 取り込み元のURLも同じときだけ、書き換えを見送る
    if (previous?.asOf === asOf && previous?.sourceFiles?.vacancy === link.url) {
      console.log(`公式データの時点が前回と同じ（${asOf}）のため更新はありません。`);
      return;
    }

    const notes = [
      `中津市が公開しているのは${pdf.target}月の利用調整が終わったあとの受入可能枠で、${asOf}時点のものです。2号・3号認定（保育を必要とする枠）の数です。`,
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
      subtitle: `${pdf.target}月利用調整後の受入可能枠`,
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
    console.log(`  ${facilities.length}施設 / ${categories.length}類型`);
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

main().catch((err) => fail(String(err)));
