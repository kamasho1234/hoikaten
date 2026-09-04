/**
 * 山形市の保育施設の受入可能予定人数を取り込む
 *
 * 実行: npm run vacancy:fetch:yamagata
 *
 * ## この自治体の特徴
 * - 1ページに**4つの表**（認可保育所／認定こども園／小規模保育事業／家庭的保育事業）
 * - **家庭的保育事業（保育ママ）は0〜2歳児がひとまとめ**で年齢別ではないため、
 *   年齢ごとの数は持たず vacancyTotal に入れる（目黒区の家庭福祉員と同じ扱い）
 * - 空らんは空きなし（0人）
 * - どの表にも「◯◯計」の行があるので、**年齢ごとの合計を照合できる**
 * - 本文の「（年齢は令和８年４月１日現在の年齢となります）」はクラス年齢の基準日で、
 *   データの時点ではない（Python側でかっこの中を落としてから日付を探している）
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "yamagata";
const MUNICIPALITY_NAME = "山形市";
const SOURCE_NAME = "山形市「認可保育施設受入可能予定人数」";
const INDEX_URL =
  "https://www.city.yamagata-yamagata.lg.jp/kosodatekyoiku/hoiku/1007241/1016951.html";
const AGE_COUNT = 6;
const MIN_FACILITIES = 70;
const UA = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const EXTRACTOR = path.join(process.cwd(), "scripts", "yamagata-pdf-extract.py");

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
    grouped: boolean;
    rows: { name: string; marks: string[] }[];
    totals: string[];
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
  console.log(`${MUNICIPALITY_NAME}の受入可能予定人数を取り込みます`);
  console.log(`公式ページ: ${INDEX_URL}\n`);

  const res = await fetch(INDEX_URL, { headers: { "User-Agent": UA } });
  if (!res.ok) fail(`公式ページが ${res.status} を返しました`);
  const html = await res.text();

  const links = [...html.matchAll(/<a[^>]+href="([^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => ({ url: new URL(m[1], INDEX_URL).toString(), text: toHalfWidth(squeeze(m[2])) }))
    .filter((l) => l.text.includes("受入可能予定人数"));
  if (links.length === 0) fail("受入可能予定人数のPDFが見つかりません");
  // 複数の月が並ぶことがあるので、月の数字がいちばん大きいものを選ぶ
  const withMonth = links.map((l) => ({
    ...l,
    month: Number(/(\d+)月/.exec(l.text)?.[1] ?? 0),
  }));
  withMonth.sort((a, b) => b.month - a.month);
  const link = withMonth[0];
  console.log(`PDF: ${link.text}\n  ${link.url}`);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "yamagata-vacancy-"));
  try {
    const r = await fetch(link.url, { headers: { "User-Agent": UA } });
    if (!r.ok) fail(`PDFの取得に失敗しました（${r.status}）: ${link.url}`);
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.subarray(0, 4).toString() !== "%PDF") fail(`PDFではありません: ${link.url}`);
    const file = path.join(tmpDir, "yamagata.pdf");
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
    console.log(`時点: ${asOf} ／ 対象: ${targetLabel}`);
    if (pdf.target[1] !== link.month) {
      fail(`PDFの月（${pdf.target[1]}月）とリンクの月（${link.month}月）が違います`);
    }

    const categories: string[] = [];
    const facilities: {
      id: string;
      name: string;
      w: null;
      c: number;
      vacancy: (number | null)[];
      vacancyTotal?: number;
    }[] = [];
    const seen = new Set<string>();
    let total = 0;
    let grouped = 0;

    for (const group of pdf.groups) {
      const category = squeeze(group.category);
      if (!category) fail("分類が空の表があります");
      let c = categories.indexOf(category);
      if (c < 0) {
        categories.push(category);
        c = categories.length - 1;
      }

      const width = group.grouped ? 1 : AGE_COUNT;
      const sums = new Array(width).fill(0);

      for (const row of group.rows) {
        const name = squeeze(row.name);
        if (!name) fail(`${category}: 施設名が空の行があります`);
        if (seen.has(name)) fail(`施設名が重複しています: ${name}`);
        seen.add(name);

        const values: number[] = [];
        for (let i = 0; i < width; i++) {
          const value = squeeze(row.marks[i] ?? "");
          if (value === "") {
            values.push(0);
            continue;
          }
          if (!/^\d+$/.test(value)) {
            fail(`${name}: ${i}番目の値を読めません（「${value}」）`);
          }
          values.push(Number(value));
        }
        for (let i = 0; i < width; i++) sums[i] += values[i];
        total += values.reduce((a, b) => a + b, 0);

        if (group.grouped) {
          // 0〜2歳児がひとまとめ。年齢別には持てないので合計だけを入れる
          grouped += 1;
          facilities.push({
            id: name,
            name,
            w: null,
            c,
            vacancy: new Array(AGE_COUNT).fill(null),
            vacancyTotal: values[0],
          });
        } else {
          facilities.push({ id: name, name, w: null, c, vacancy: values });
        }
      }

      // 検算: 表の「◯◯計」の行と足し算を照合する
      for (let i = 0; i < width; i++) {
        const printed = squeeze(group.totals[i] ?? "");
        const expected = printed === "" ? 0 : Number(printed);
        if (!Number.isFinite(expected)) {
          fail(`${category}: 合計の行の${i}番目を読めません（「${printed}」）`);
        }
        if (sums[i] !== expected) {
          fail(`${category}: ${i}番目の合計が合いません（PDF ${expected} / 足し算 ${sums[i]}）`);
        }
      }
    }

    if (facilities.length < MIN_FACILITIES) {
      fail(`施設が${facilities.length}件しか取れていません（${MIN_FACILITIES}件以上のはず）`);
    }
    console.log(`どの表も「◯◯計」の行と足し算が一致しました（全体で${total}人）`);

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
      `山形市が公開しているのは${targetLabel}の受入可能予定人数で、${asOf}時点のものです。年齢はその年度の4月1日現在のものです。`,
      ...pdf.notes.filter((n) => !n.includes("現在") && !n.includes("施設名")),
      "家庭的保育事業（保育ママ）は0〜2歳児をまとめて公表しているため、年齢ごとの内訳は分かりません。施設全体の人数だけを載せています。",
      "公式の表で空らんになっている欄は受入可能人数が0人です。",
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
      subtitle: `${targetLabel}の受入可能予定人数`,
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
    console.log(`  ${facilities.length}施設 / 受入可能${total}人（うち0〜2歳まとめ ${grouped}施設）`);
    console.log(
      `  分類ごとの数: ${categories
        .map((name, i) => `${name} ${facilities.filter((f) => f.c === i).length}`)
        .join(" / ")}`
    );
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

main().catch((err) => fail(String(err)));
