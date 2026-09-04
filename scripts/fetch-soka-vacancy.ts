/**
 * 草加市の保育所等の空き状況を取り込む
 *
 * 実行: npm run vacancy:fetch:soka
 *
 * ## この自治体の特徴
 * - 空きは人数。**数字＝空き人数、斜線＝そのクラスがない、空らん＝空きなし（0人）**
 * - 合計の行がないので、検算は「欄の数＝施設数×6クラス」と斜線の数で行う
 * - 区分は4つ。**認定こども園だけ縦書き2列で文字が混ざる**ので、
 *   既知の区分名と文字の集合で照合して正規化する（Python側）
 * - 宇佐美家庭保育室は表の外の別セクションにあり、年齢別に分かれていないので載せない
 * - 毎月24日ごろに選考後の空き状況が公表される
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "soka";
const MUNICIPALITY_NAME = "草加市";
const SOURCE_NAME = "草加市「保育所等 空き状況一覧」";
const INDEX_URL =
  "https://www.city.soka.saitama.jp/cont/s1603/020/010/010/PAGE000000000000083943.html";
const AGE_COUNT = 6;
const MIN_FACILITIES = 60;
const UA = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const EXTRACTOR = path.join(process.cwd(), "scripts", "soka-pdf-extract.py");

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

type PdfResult = {
  asOf: [number, number, number];
  target: number;
  notes: string[];
  outside: string[];
  slashes: number;
  blanks: number;
  numbers: number;
  rows: { kubun: string; name: string; counts: (number | null)[] }[];
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

  // 「令和8年度8月入園選考後保育所等空き状況一覧（PDF：164KB）」
  const links = [...html.matchAll(/<a[^>]+href="([^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => ({ url: new URL(m[1], INDEX_URL).toString(), text: toHalfWidth(squeeze(m[2])) }))
    .map((l) => {
      const m = l.text.match(/令和(\d+)年度(\d+)月入園選考後.*空き状況/);
      if (!m) return null;
      const [reiwa, month] = m.slice(1, 3).map(Number);
      // 年度は4月始まりなので1〜3月は後ろに並べる
      return { ...l, reiwa, month, sortKey: reiwa * 100 + (month >= 4 ? month : month + 12) };
    })
    .filter((v): v is NonNullable<typeof v> => v !== null);
  if (links.length === 0)
    fail("空き状況のPDFが見つかりません。ページの構成が変わった可能性があります。");
  const latest = links.reduce((a, b) => (b.sortKey > a.sortKey ? b : a));
  console.log(`最新: ${latest.text}\n  ${latest.url}`);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "soka-vacancy-"));
  try {
    const r = await fetch(latest.url, { headers: { "User-Agent": UA } });
    if (!r.ok) fail(`PDFの取得に失敗しました（${r.status}）: ${latest.url}`);
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.subarray(0, 4).toString() !== "%PDF") fail(`PDFではありません: ${latest.url}`);
    const file = path.join(tmpDir, "soka.pdf");
    fs.writeFileSync(file, buf);

    let pdf: PdfResult;
    try {
      pdf = JSON.parse(runPython([EXTRACTOR, file])) as PdfResult;
    } catch (err) {
      fail(`抽出結果を読めません: ${String(err)}`);
    }

    if (pdf.target !== latest.month) {
      fail(`PDFの入園月（${pdf.target}月）がリンクの文言（${latest.month}月）と違います`);
    }
    const [reiwa, asOfMonth, day] = pdf.asOf;
    const asOf = `${2018 + reiwa}-${String(asOfMonth).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    if (!/^\d{4}-\d{2}-\d{2}$/.test(asOf)) fail(`基準日を組み立てられません: ${asOf}`);
    if (asOf > todayJst()) fail(`基準日（${asOf}）が今日より先になっています`);
    const targetYear = 2018 + latest.reiwa + (latest.month >= 4 ? 0 : 1);
    console.log(`基準日: ${asOf}（${targetYear}年${latest.month}月入園の選考後）`);

    const categories: string[] = [];
    const facilities: {
      id: string;
      name: string;
      w: null;
      c: number;
      vacancy: (number | null)[];
    }[] = [];
    const seen = new Set<string>();
    const sums = new Array(AGE_COUNT).fill(0);
    let noClass = 0;

    for (const row of pdf.rows) {
      const name = squeeze(row.name);
      if (!name) fail("施設名が空の行があります");
      if (seen.has(name)) fail(`施設名が重複しています: ${name}`);
      seen.add(name);

      let c = categories.indexOf(row.kubun);
      if (c < 0) {
        categories.push(row.kubun);
        c = categories.length - 1;
      }

      for (let age = 0; age < AGE_COUNT; age++) {
        const v = row.counts[age];
        if (v === null) {
          noClass += 1;
          continue;
        }
        if (v < 0) fail(`${name}: ${age}歳の人数が負の数です`);
        sums[age] += v;
      }
      if (row.counts.every((v) => v === null)) fail(`${name}: 全てのクラスがありません`);

      facilities.push({ id: name, name, w: null, c, vacancy: row.counts });
    }

    if (facilities.length < MIN_FACILITIES) {
      fail(`施設が${facilities.length}件しか取れていません（${MIN_FACILITIES}件以上のはず）`);
    }
    if (noClass !== pdf.slashes) {
      fail(`斜線の欄の数が合いません（PDF ${pdf.slashes} / 取り込み ${noClass}）`);
    }

    // 検算: 合計の行がないので、欄の数がぴったり合うことで担保する
    const cells = pdf.numbers + pdf.slashes + pdf.blanks;
    if (cells !== facilities.length * AGE_COUNT) {
      fail(
        `欄の数が合いません（数字${pdf.numbers}＋斜線${pdf.slashes}＋空らん${pdf.blanks}＝${cells} / 施設${facilities.length}×${AGE_COUNT}）`
      );
    }
    const total = sums.reduce((a: number, b: number) => a + b, 0);
    console.log(
      `欄の数が施設数×クラス数と合いました（数字${pdf.numbers}・斜線${pdf.slashes}・空らん${pdf.blanks}）`
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
    if (previous?.asOf === asOf && previous?.sourceFiles?.vacancy === latest.url) {
      console.log(`公式データの時点が前回と同じ（${asOf}）のため更新はありません。`);
      return;
    }

    const notes = [
      `草加市は毎月の入園選考のあとに空き状況を公表しています。これは${targetYear}年${latest.month}月入園の選考後のもので、${asOf}時点です。`,
      ...pdf.notes,
      "公式の表では、そのクラスがないらんに斜線が引かれています。当サイトではそのらんを「—」にしています。空らんは空きがない（0人）ことを示しています。",
      ...(pdf.outside.length > 0
        ? [
            `公式の表とは別に家庭保育室（${pdf.outside.join(
              "、"
            )}）の欄がありますが、年齢別に分かれていないため当サイトでは掲載していません。`,
          ]
        : []),
    ];

    const dataset = {
      municipalitySlug: MUNICIPALITY_SLUG,
      municipalityName: MUNICIPALITY_NAME,
      asOf,
      fetchedAt: todayJst(),
      sourceName: SOURCE_NAME,
      sourceUrl: INDEX_URL,
      sourceFiles: { vacancy: latest.url },
      metrics: ["vacancy"],
      subtitle: `${targetYear}年${latest.month}月入園の選考後の空き状況`,
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
    console.log(`  ${facilities.length}施設`);
    console.log(`  そのクラスがないらん（斜線）: ${noClass}`);
    console.log(`  年齢ごとの空き人数: ${sums.join(" / ")}（合計 ${total}）`);
    console.log(
      `  区分ごとの数: ${categories
        .map((name, i) => `${name} ${facilities.filter((f) => f.c === i).length}`)
        .join(" / ")}`
    );
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

main().catch((err) => fail(String(err)));
