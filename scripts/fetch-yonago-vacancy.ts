/**
 * 米子市の保育施設等入所可能児童数を取り込む
 *
 * 実行: npm run vacancy:fetch:yonago
 *
 * ## この自治体の特徴
 * - 数値で公表。空らんがなく、入所できない年齢も0で書かれている
 * - 区分（保育所・認定こども園・小規模保育事業所・事業所内保育事業所）と
 *   公私（公立・私立）が別の列にある。両方をつないで施設の種類にする
 * - **翌月1日からの入所可能数**を前の月の下旬に公開する。
 *   PDFの「令和N年M月D日現在」が時点で、これは公開日に近い
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "yonago";
const MUNICIPALITY_NAME = "米子市";
const SOURCE_NAME = "米子市「保育施設等入所可能児童数一覧」";
const INDEX_URL = "https://www.city.yonago.lg.jp/21679.htm";
const AGE_COUNT = 6;
const MIN_FACILITIES = 40;
const UA = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const EXTRACTOR = path.join(process.cwd(), "scripts", "yonago-pdf-extract.py");

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
  notes: string[];
  printed: { sum: number; count: number };
  rows: {
    kubun: string;
    koshi: string;
    name: string;
    counts: number[];
    note: string;
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
  console.log(`${MUNICIPALITY_NAME}の入所可能児童数を取り込みます`);
  console.log(`公式ページ: ${INDEX_URL}\n`);

  const res = await fetch(INDEX_URL, { headers: { "User-Agent": UA } });
  if (!res.ok) fail(`公式ページが ${res.status} を返しました`);
  const html = await res.text();

  const links = [...html.matchAll(/<a[^>]+href="([^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => ({ url: new URL(m[1], INDEX_URL).toString(), text: toHalfWidth(squeeze(m[2])) }))
    .filter((l) => l.text.includes("入所可能児童数一覧"));
  if (links.length !== 1) {
    fail(`入所可能児童数一覧のPDFが${links.length}件あります（1件のはず）`);
  }
  const link = links[0];
  console.log(`PDF: ${link.text}\n  ${link.url}`);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "yonago-vacancy-"));
  try {
    const r = await fetch(link.url, { headers: { "User-Agent": UA } });
    if (!r.ok) fail(`PDFの取得に失敗しました（${r.status}）: ${link.url}`);
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.subarray(0, 4).toString() !== "%PDF") fail(`PDFではありません: ${link.url}`);
    const file = path.join(tmpDir, "yonago.pdf");
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
    const targetLabel = `${reiwaToYear(pdf.target[0])}年${pdf.target[1]}月`;
    console.log(`時点: ${asOf} ／ 対象: ${targetLabel}1日からの入所`);

    const categories: string[] = [];
    const facilities: {
      id: string;
      name: string;
      w: null;
      c: number;
      vacancy: (number | null)[];
    }[] = [];
    const seen = new Set<string>();
    const conditions: string[] = [];
    let total = 0;

    for (const row of pdf.rows) {
      const name = squeeze(row.name);
      if (!name) fail("施設名が空の行があります");
      if (seen.has(name)) fail(`施設名が重複しています: ${name}`);
      seen.add(name);

      // 「保育所（公立）」のように区分と公私をつないで種類にする
      const kubun = squeeze(row.kubun);
      const koshi = squeeze(row.koshi);
      const category = koshi ? `${kubun}（${koshi}）` : kubun;
      let c = categories.indexOf(category);
      if (c < 0) {
        categories.push(category);
        c = categories.length - 1;
      }

      const vacancy: (number | null)[] = [];
      for (let age = 0; age < AGE_COUNT; age++) {
        const value = row.counts[age];
        if (typeof value !== "number" || !Number.isFinite(value) || value < 0) {
          fail(`${name}: ${age}歳児の値がおかしいです（${value}）`);
        }
        vacancy.push(value);
        total += value;
      }

      const note = squeeze(row.note);
      if (note) conditions.push(`${name}: ${note}`);

      facilities.push({ id: name, name, w: null, c, vacancy });
    }

    if (facilities.length < MIN_FACILITIES) {
      fail(`施設が${facilities.length}件しか取れていません（${MIN_FACILITIES}件以上のはず）`);
    }

    // 検算1: 人数の合計がPDFに印字された数字の合計と合うか
    if (total !== pdf.printed.sum) {
      fail(`人数の合計が合いません（PDFの数字 ${pdf.printed.sum} / 取り込み ${total}）`);
    }
    // 検算2: 印字された数字の個数が施設数×年齢数になるか（空らんがない前提の確認）
    if (pdf.printed.count !== facilities.length * AGE_COUNT) {
      fail(
        `欄の数が合いません（PDFの数字 ${pdf.printed.count}個 / 施設${facilities.length}×${AGE_COUNT}）`
      );
    }
    console.log(
      `人数の合計（${total}人）と欄の数（${pdf.printed.count}）がPDFの印字と一致しました`
    );

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
      previous?.sourceFiles?.vacancy === link.url &&
      JSON.stringify(previous?.facilities ?? null) === JSON.stringify(facilities)
    ) {
      console.log(`公式データの時点が前回と同じ（${asOf}）のため更新はありません。`);
      return;
    }

    const notes = [
      `米子市が公開しているのは${targetLabel}1日からの入所可能な児童数（予定）で、${asOf}時点のものです。`,
      ...pdf.notes.filter((n) => !n.includes("入所可能な児童数（予定）の一覧")),
      "各連携施設からの入所を除いた入所可能人数です。",
      ...(conditions.length
        ? [`次の施設には入所の条件があります。${conditions.join(" / ")}`]
        : []),
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
      subtitle: `${targetLabel}1日からの入所可能児童数`,
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
    console.log(`  ${facilities.length}施設 / 入所可能${total}人 / 条件つき ${conditions.length}件`);
    console.log(
      `  種類ごとの数: ${categories
        .map((name, i) => `${name} ${facilities.filter((f) => f.c === i).length}`)
        .join(" / ")}`
    );
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

main().catch((err) => fail(String(err)));
