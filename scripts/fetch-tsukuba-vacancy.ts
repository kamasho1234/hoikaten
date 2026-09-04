/**
 * つくば市の保育施設の空き状況を取り込む
 *
 * 実行: npm run vacancy:fetch:tsukuba
 *
 * ## この自治体の特徴
 * - 空きは人数（「募集数」）。在籍数も一緒に公表している
 * - 「令和8年9月入所用」のように翌々月ぶんの募集数なので、基準日とは別に subtitle で補う
 * - PDFのファイル名が毎月変わるため、リンクの文言で最新を決める
 * - 4月だけ「1次」「2次」があるので、同じ年月なら2次を優先する
 * - いちばん下に合計の行があるので、行ごと・列ごと・総合計の3通りで検算できる
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "tsukuba";
const MUNICIPALITY_NAME = "つくば市";
const SOURCE_NAME = "つくば市「保育施設空き情報」";
const INDEX_URL =
  "https://www.city.tsukuba.lg.jp/soshikikarasagasu/kodomobuyojihoikuka/gyomuannai/2/1005950.html";
const AGE_COUNT = 6;
const MIN_FACILITIES = 100;
const UA = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const EXTRACTOR = path.join(process.cwd(), "scripts", "tsukuba-pdf-extract.py");

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

type PdfRow = {
  no: number;
  kubun: string;
  name: string;
  enrolled: (number | null)[];
  vacancy: (number | null)[];
  totalEnrolled: number;
  totalVacancy: number;
};

type PdfResult = {
  asOf: [number, number, number];
  admission: [number, number];
  legend: string;
  notes: string[];
  rows: PdfRow[];
  totals: {
    enrolled: (number | null)[];
    vacancy: (number | null)[];
    totalEnrolled: number;
    totalVacancy: number;
  };
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

/** 「公立：公立保育所、私立：私立保育所、…」を短縮名→正式名の対応にする */
function parseLegend(legend: string): Map<string, string> {
  const map = new Map<string, string>();
  for (const part of legend.split(/[、,]/)) {
    const m = part.match(/^\s*(.+?)\s*[：:]\s*(.+?)\s*$/);
    if (!m) continue;
    map.set(m[1], m[2]);
  }
  if (map.size === 0) fail(`区分の凡例を読めませんでした: 「${legend}」`);
  return map;
}

async function main() {
  console.log(`${MUNICIPALITY_NAME}の空き状況を取り込みます`);
  console.log(`公式ページ: ${INDEX_URL}\n`);

  const res = await fetch(INDEX_URL, { headers: { "User-Agent": UA } });
  if (!res.ok) fail(`公式ページが ${res.status} を返しました`);
  const html = await res.text();

  // 「令和8年9月入所空き状況」。ファイル名は毎月変わるので文言で決める。
  // 4月だけ「1次」「2次」があるので、同じ年月なら次数の大きいほうを採る。
  const links = [...html.matchAll(/<a[^>]+href="([^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => ({ url: new URL(m[1], INDEX_URL).toString(), text: toHalfWidth(squeeze(m[2])) }))
    .map((l) => {
      const m = l.text.match(/令和(\d+)年(\d+)月入所(?:(\d+)次)?空き状況/);
      if (!m) return null;
      const [reiwa, month] = m.slice(1, 3).map(Number);
      const stage = m[3] ? Number(m[3]) : 0;
      return { ...l, reiwa, month, stage, sortKey: (reiwa * 100 + month) * 10 + stage };
    })
    .filter((v): v is NonNullable<typeof v> => v !== null);
  if (links.length === 0)
    fail("空き状況のPDFが見つかりません。ページの構成が変わった可能性があります。");
  const latest = links.reduce((a, b) => (b.sortKey > a.sortKey ? b : a));
  console.log(`最新: ${latest.text}\n  ${latest.url}`);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "tsukuba-vacancy-"));
  try {
    const r = await fetch(latest.url, { headers: { "User-Agent": UA } });
    if (!r.ok) fail(`PDFの取得に失敗しました（${r.status}）: ${latest.url}`);
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.subarray(0, 4).toString() !== "%PDF") fail(`PDFではありません: ${latest.url}`);
    const file = path.join(tmpDir, "tsukuba.pdf");
    fs.writeFileSync(file, buf);

    let pdf: PdfResult;
    try {
      pdf = JSON.parse(runPython([EXTRACTOR, file])) as PdfResult;
    } catch (err) {
      fail(`抽出結果を読めません: ${String(err)}`);
    }

    // PDFの中の「令和N年M月入所用」がリンクの文言と合っているか
    const [admReiwa, admMonth] = pdf.admission;
    if (admReiwa !== latest.reiwa || admMonth !== latest.month) {
      fail(
        `PDFの入所月（令和${admReiwa}年${admMonth}月）がリンクの文言` +
          `（令和${latest.reiwa}年${latest.month}月）と違います`
      );
    }

    const [reiwa, month, day] = pdf.asOf;
    const asOf = `${2018 + reiwa}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    if (!/^\d{4}-\d{2}-\d{2}$/.test(asOf)) fail(`基準日を組み立てられません: ${asOf}`);
    if (asOf > todayJst()) fail(`基準日（${asOf}）が今日より先になっています`);
    const admissionYear = 2018 + admReiwa;
    console.log(`基準日: ${asOf}（${admissionYear}年${admMonth}月入所用）`);

    // 区分は凡例に出てくるものだけを認める
    const legendMap = parseLegend(pdf.legend);
    console.log(
      `区分: ${[...legendMap].map(([short, full]) => `${short}＝${full}`).join(" / ")}`
    );

    const categories: string[] = [];
    const facilities: {
      id: string;
      name: string;
      w: null;
      c: number;
      vacancy: (number | null)[];
      enrolled: (number | null)[];
    }[] = [];
    const seenName = new Set<string>();
    const seenNo = new Set<number>();
    const sumVacancy = new Array(AGE_COUNT).fill(0);
    const sumEnrolled = new Array(AGE_COUNT).fill(0);
    let noClass = 0;

    for (const row of pdf.rows) {
      const name = squeeze(row.name);
      if (!name) fail(`施設名が空の行があります（園番号 ${row.no}）`);
      if (seenName.has(name)) fail(`施設名が重複しています: ${name}`);
      seenName.add(name);
      if (seenNo.has(row.no)) fail(`園番号が重複しています: ${row.no}`);
      seenNo.add(row.no);

      const full = legendMap.get(row.kubun);
      if (!full) fail(`${name}: 凡例にない区分です: 「${row.kubun}」`);
      let c = categories.indexOf(full);
      if (c < 0) {
        categories.push(full);
        c = categories.length - 1;
      }

      let rowVacancy = 0;
      let rowEnrolled = 0;
      for (let age = 0; age < AGE_COUNT; age++) {
        const v = row.vacancy[age];
        const e = row.enrolled[age];
        // 設けていないクラスは在籍数・募集数の両方が「-」になる
        if ((v === null) !== (e === null)) {
          fail(`${name}: ${age}歳児の在籍数と募集数で「-」の付き方が違います`);
        }
        if (v === null) {
          noClass += 1;
          continue;
        }
        if (v < 0 || e === null || e < 0) fail(`${name}: ${age}歳児の人数が負の数です`);
        rowVacancy += v;
        rowEnrolled += e;
        sumVacancy[age] += v;
        sumEnrolled[age] += e;
      }
      if (row.vacancy.every((v) => v === null)) fail(`${name}: 全てのクラスが「-」です`);

      // 検算1: 行ごとの和がその行の合計欄と合うか
      if (rowVacancy !== row.totalVacancy) {
        fail(`${name}: 募集数の合計が合いません（欄 ${row.totalVacancy} / 足し算 ${rowVacancy}）`);
      }
      if (rowEnrolled !== row.totalEnrolled) {
        fail(`${name}: 在籍数の合計が合いません（欄 ${row.totalEnrolled} / 足し算 ${rowEnrolled}）`);
      }

      facilities.push({
        id: String(row.no),
        name,
        w: null,
        c,
        vacancy: row.vacancy,
        enrolled: row.enrolled,
      });
    }

    if (facilities.length < MIN_FACILITIES) {
      fail(`施設が${facilities.length}件しか取れていません（${MIN_FACILITIES}件以上のはず）`);
    }

    // 検算2: 列ごとの和がいちばん下の合計の行と合うか
    for (let age = 0; age < AGE_COUNT; age++) {
      const tv = pdf.totals.vacancy[age];
      const te = pdf.totals.enrolled[age];
      if (tv === null || te === null) fail(`合計の行の${age}歳児が「-」になっています`);
      if (sumVacancy[age] !== tv) {
        fail(`${age}歳児の募集数が合計の行と合いません（合計行 ${tv} / 足し算 ${sumVacancy[age]}）`);
      }
      if (sumEnrolled[age] !== te) {
        fail(`${age}歳児の在籍数が合計の行と合いません（合計行 ${te} / 足し算 ${sumEnrolled[age]}）`);
      }
    }

    // 検算3: 総合計
    const totalVacancy = sumVacancy.reduce((a, b) => a + b, 0);
    const totalEnrolled = sumEnrolled.reduce((a, b) => a + b, 0);
    if (totalVacancy !== pdf.totals.totalVacancy) {
      fail(
        `募集数の総合計が合いません（合計行 ${pdf.totals.totalVacancy} / 足し算 ${totalVacancy}）`
      );
    }
    if (totalEnrolled !== pdf.totals.totalEnrolled) {
      fail(
        `在籍数の総合計が合いません（合計行 ${pdf.totals.totalEnrolled} / 足し算 ${totalEnrolled}）`
      );
    }
    console.log("行ごと・列ごと・総合計の3通りで数が合いました");

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

    const notes = [
      `つくば市は入所月の前々月ごろに「${admissionYear}年${admMonth}月入所用」の募集数を公表しています。この数は${asOf}時点のものです。`,
      ...pdf.notes,
      `区分は ${[...legendMap].map(([short, full]) => `${short}＝${full}`).join("、")} です。`,
      "設けていないクラスは「—」にしています。",
    ];

    const dataset = {
      municipalitySlug: MUNICIPALITY_SLUG,
      municipalityName: MUNICIPALITY_NAME,
      asOf,
      fetchedAt: todayJst(),
      sourceName: SOURCE_NAME,
      sourceUrl: INDEX_URL,
      sourceFiles: { vacancy: latest.url },
      metrics: ["vacancy", "enrolled"],
      subtitle: `${admissionYear}年${admMonth}月入所用の募集数`,
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
    console.log(`  設けていないクラス: ${noClass}`);
    console.log(`  募集数の合計: ${totalVacancy}／在籍数の合計: ${totalEnrolled}`);
    console.log(`  区分ごとの数: ${categories
      .map((name, i) => `${name} ${facilities.filter((f) => f.c === i).length}`)
      .join(" / ")}`);
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

main().catch((err) => fail(String(err)));
