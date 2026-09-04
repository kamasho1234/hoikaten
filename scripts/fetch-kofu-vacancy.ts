/**
 * 甲府市の保育所等の募集人員を取り込む
 *
 * 実行: npm run vacancy:fetch:kofu
 *
 * ## この自治体の特徴
 * - 1ページに3つの表（保育所（園）／認定こども園／地域型保育事業所）
 * - **合計の列と、表の中の「公立計」「私立計」「◯◯合計」の行がある**ので検算に使える
 * - 空らんはその年齢のクラスがないことを表す
 *   （地域型保育事業所は0〜2歳児クラスのみ、幼稚園型の認定こども園は3歳児クラス以上）
 * - 掲載は入所申込の受付期間中（前の月の下旬）。ページに掲載予定の日時が書いてある
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "kofu";
const MUNICIPALITY_NAME = "甲府市";
const SOURCE_NAME = "甲府市「保育所等募集人員一覧表」";
const INDEX_URL = "https://www.city.kofu.yamanashi.jp/jidohoiku/h3004bosyu1zi.html";
const AGE_COUNT = 6;
const MIN_FACILITIES = 50;
const UA = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const EXTRACTOR = path.join(process.cwd(), "scripts", "kofu-pdf-extract.py");

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
  groups: {
    category: string;
    rows: { name: string; marks: string[]; total: string }[];
    totals: { label: string; marks: string[]; total: string }[];
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
  console.log(`${MUNICIPALITY_NAME}の募集人員を取り込みます`);
  console.log(`公式ページ: ${INDEX_URL}\n`);

  const res = await fetch(INDEX_URL, { headers: { "User-Agent": UA } });
  if (!res.ok) fail(`公式ページが ${res.status} を返しました`);
  const html = await res.text();

  const links = [...html.matchAll(/<a[^>]+href="([^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => ({ url: new URL(m[1], INDEX_URL).toString(), text: toHalfWidth(squeeze(m[2])) }))
    .filter((l) => l.text.includes("募集人員一覧表"));
  if (links.length !== 1) {
    fail(
      links.length === 0
        ? "募集人員一覧表のPDFが見つかりません（掲載前の可能性があります）"
        : `募集人員一覧表のPDFが${links.length}件あります（1件のはず）`
    );
  }
  const link = links[0];
  console.log(`PDF: ${link.text.slice(0, 60)}\n  ${link.url}`);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "kofu-vacancy-"));
  try {
    const r = await fetch(link.url, { headers: { "User-Agent": UA } });
    if (!r.ok) fail(`PDFの取得に失敗しました（${r.status}）: ${link.url}`);
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.subarray(0, 4).toString() !== "%PDF") fail(`PDFではありません: ${link.url}`);
    const file = path.join(tmpDir, "kofu.pdf");
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
    const targetLabel = `${reiwaToYear(pdf.target[0])}年度${pdf.target[1]}月`;
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
    let total = 0;
    let notOffered = 0;

    for (const group of pdf.groups) {
      const category = squeeze(group.category);
      if (!category) fail("種類が空の表があります");
      let c = categories.indexOf(category);
      if (c < 0) {
        categories.push(category);
        c = categories.length - 1;
      }

      const sums = new Array(AGE_COUNT).fill(0);
      for (const row of group.rows) {
        const name = squeeze(row.name);
        if (!name) fail(`${category}: 施設名が空の行があります`);
        if (seen.has(name)) fail(`施設名が重複しています: ${name}`);
        seen.add(name);

        const vacancy: (number | null)[] = [];
        let rowSum = 0;
        for (let age = 0; age < AGE_COUNT; age++) {
          const value = squeeze(row.marks[age] ?? "");
          if (value === "") {
            notOffered += 1;
            vacancy.push(null);
            continue;
          }
          if (!/^\d+$/.test(value)) {
            fail(`${name}: ${age}歳児クラスの値を読めません（「${value}」）`);
          }
          vacancy.push(Number(value));
          rowSum += Number(value);
          sums[age] += Number(value);
        }
        if (vacancy.every((v) => v === null)) fail(`${name}: 全ての年齢が空らんです`);

        // 検算: 行ごとの合計がPDFの合計の欄と合うか
        const printed = squeeze(row.total);
        if (!/^\d+$/.test(printed)) fail(`${name}: 合計の欄を読めません（「${printed}」）`);
        if (rowSum !== Number(printed)) {
          fail(`${name}: 合計が合いません（PDF ${printed} / 足し算 ${rowSum}）`);
        }
        total += rowSum;

        facilities.push({ id: name, name, w: null, c, vacancy });
      }

      // 検算: 表の「◯◯合計」の行と足し算を照合する（「公立計」など一部の行は対象外）
      const whole = group.totals.find((t) => t.label.includes("合計"));
      if (!whole) fail(`${category}: 「合計」の行が見つかりません`);
      for (let age = 0; age < AGE_COUNT; age++) {
        const printed = squeeze(whole.marks[age] ?? "");
        const expected = printed === "" ? 0 : Number(printed);
        if (!Number.isFinite(expected)) {
          fail(`${category}: 合計の行の${age}歳児を読めません（「${printed}」）`);
        }
        if (sums[age] !== expected) {
          fail(`${category}: ${age}歳児の合計が合いません（PDF ${expected} / 足し算 ${sums[age]}）`);
        }
      }
    }

    if (facilities.length < MIN_FACILITIES) {
      fail(`施設が${facilities.length}件しか取れていません（${MIN_FACILITIES}件以上のはず）`);
    }
    console.log(
      `どの表も行ごとの合計と「◯◯合計」の行が一致しました（全体で${total}人）`
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
    if (previous?.asOf === asOf && previous?.sourceFiles?.vacancy === link.url) {
      console.log(`公式データの時点が前回と同じ（${asOf}）のため更新はありません。`);
      return;
    }

    const notes = [
      `甲府市が公開しているのは${targetLabel}入所の募集人員で、${asOf}時点のものです。`,
      ...pdf.notes,
      "公式の表で空らんになっている年齢は「—」にしています。その年齢のクラスがないことを表しています。",
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
      subtitle: `${targetLabel}入所の募集人員`,
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
    console.log(`  ${facilities.length}施設 / 募集${total}人 / クラスのない欄 ${notOffered}`);
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
