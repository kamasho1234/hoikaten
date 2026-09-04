/**
 * 戸田市の保育施設の空き状況を取り込む
 *
 * 実行: npm run vacancy:fetch:toda
 *
 * ## この自治体の特徴
 * - 空きが人数で載っている。行ごとの合計と列ごとの合計が両方入っている
 * - 設けていないクラスは空欄ではなくセルに斜線が引いてある
 * - 認可保育施設と小規模保育等でPDFが分かれているので、2つを合わせて1つにする
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "toda";
const MUNICIPALITY_NAME = "戸田市";
const SOURCE_NAME = "戸田市「保育施設等の空き状況」";
const INDEX_URL = "https://www.city.toda.saitama.jp/site/dacco/hoikuen-06akijoukyo.html";
const AGE_COUNT = 6;
const UA = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const EXTRACTOR = path.join(process.cwd(), "scripts", "toda-pdf-extract.py");

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
  ages: number[];
  rows: { name: string; values: (string | null)[]; total: string }[];
  totals: (string | null)[];
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

/** 表の中に出てくる注記の番号。集めて出典欄に載せる */
const footnoteMarks = new Set<string>();

/**
 * 人数を読む。
 * **数の後ろに注記の印が付くことがある**（「2 ※１」など）。
 * 印は数の意味を変えるものではなく、施設への予告や案内を指しているので、
 * 数はそのまま採り、印は集めて注記に回す。
 */
function toCount(raw: string, where: string): number {
  let t = toHalfWidth(raw).trim();
  const note = t.match(/[※＊*]\s*([0-9０-９一二三四五六七八九]+)/);
  if (note) {
    footnoteMarks.add(`※${toHalfWidth(note[1])}`);
    t = t.replace(/[※＊*]\s*[0-9０-９一二三四五六七八九]+/g, "").trim();
  }
  const n = Number(t);
  if (!Number.isInteger(n) || n < 0) fail(`${where}: 人数を読めません: 「${raw}」`);
  return n;
}

async function main() {
  console.log(`${MUNICIPALITY_NAME}の空き状況を取り込みます`);
  console.log(`公式ページ: ${INDEX_URL}\n`);

  const res = await fetch(INDEX_URL, { headers: { "User-Agent": UA } });
  if (!res.ok) fail(`公式ページが ${res.status} を返しました`);
  const html = await res.text();

  // 「2026年（令和8年）8月1日現在の空き状況（認可保育施設）」
  const links = [...html.matchAll(/<a[^>]+href="([^"]+\.(?:pdf|PDF))"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => ({ url: new URL(m[1], INDEX_URL).toString(), text: toHalfWidth(squeeze(m[2])) }))
    .map((l) => {
      const m = l.text.match(/(\d{4})年（令和\d+年）(\d+)月(\d+)日現在の空き状況（(.+?)）/);
      if (!m) return null;
      const [year, month, day] = m.slice(1, 4).map(Number);
      return {
        ...l,
        year,
        month,
        day,
        kind: m[4],
        sortKey: year * 10000 + month * 100 + day,
      };
    })
    .filter((v): v is NonNullable<typeof v> => v !== null);
  if (links.length === 0)
    fail("空き状況のPDFが見つかりません。ページの構成が変わった可能性があります。");

  const newest = Math.max(...links.map((l) => l.sortKey));
  const latest = links.filter((l) => l.sortKey === newest);
  if (latest.length !== 2) fail(`最新のPDFが${latest.length}件あります（認可と小規模の2件のはず）`);
  const asOf = `${latest[0].year}-${String(latest[0].month).padStart(2, "0")}-${String(
    latest[0].day
  ).padStart(2, "0")}`;
  if (asOf > todayJst()) fail(`基準日（${asOf}）が今日より先になっています`);
  console.log(`基準日: ${asOf}`);
  for (const l of latest) console.log(`  ${l.kind}: ${l.url}`);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "toda-vacancy-"));
  try {
    const categories: string[] = [];
    const facilities: {
      id: string;
      name: string;
      w: null;
      c: number;
      vacancy: (number | null)[];
    }[] = [];
    const seen = new Set<string>();
    let noClass = 0;
    let total = 0;

    for (const link of latest) {
      const r = await fetch(link.url, { headers: { "User-Agent": UA } });
      if (!r.ok) fail(`PDFの取得に失敗しました（${r.status}）: ${link.url}`);
      const buf = Buffer.from(await r.arrayBuffer());
      if (buf.subarray(0, 4).toString() !== "%PDF") fail(`PDFではありません: ${link.url}`);
      const file = path.join(tmpDir, `${link.kind}.pdf`);
      fs.writeFileSync(file, buf);

      let pdf: PdfResult;
      try {
        pdf = JSON.parse(runPython([EXTRACTOR, file])) as PdfResult;
      } catch (err) {
        fail(`抽出結果を読めません（${link.kind}）: ${String(err)}`);
      }

      const [reiwa, month, day] = pdf.asOf;
      const pdfAsOf = `${2018 + reiwa}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      if (pdfAsOf !== asOf) {
        fail(`${link.kind}: PDFの基準日（${pdfAsOf}）がリンクの文言（${asOf}）と違います`);
      }

      categories.push(link.kind);
      const category = categories.indexOf(link.kind);
      const columnTotals = new Array(pdf.ages.length).fill(0);

      for (const row of pdf.rows) {
        const name = squeeze(row.name);
        if (!name) fail(`${link.kind}: 施設名が空の行があります`);
        if (seen.has(name)) fail(`施設名が重複しています: ${name}`);
        seen.add(name);

        const vacancy: (number | null)[] = new Array(AGE_COUNT).fill(null);
        noClass += AGE_COUNT - pdf.ages.length;
        let sum = 0;
        pdf.ages.forEach((age, index) => {
          const value = row.values[index];
          if (value === null) {
            noClass += 1;
            return;
          }
          const count = toCount(value, `${name}の${age}才`);
          vacancy[age] = count;
          sum += count;
          columnTotals[index] += count;
        });

        // 行ごとに合計が入っているので突き合わせる
        const printed = toCount(row.total, `${name}の合計`);
        if (sum !== printed) {
          fail(`${name}: 合計が合いません（PDFの印字 ${printed} / 足し算 ${sum}）`);
        }
        total += sum;

        if (vacancy.every((v) => v === null)) fail(`${name}: 全てのクラスが空です`);
        facilities.push({ id: name, name, w: null, c: category, vacancy });
      }

      // いちばん下の列ごとの合計とも突き合わせる
      pdf.ages.forEach((age, index) => {
        const printed = pdf.totals[index];
        if (printed === null) fail(`${link.kind}: ${age}才の合計が空です`);
        const count = toCount(printed, `${link.kind}の${age}才の合計`);
        if (columnTotals[index] !== count) {
          fail(
            `${link.kind}: ${age}才の合計が合いません（PDFの印字 ${count} / 足し算 ${columnTotals[index]}）`
          );
        }
      });
      console.log(`  ${link.kind}: ${pdf.rows.length}施設・行と列の合計が一致しました`);
    }

    if (facilities.length < 50) fail(`施設が${facilities.length}件しか取れていません`);

    const previous = fs.existsSync(OUT_PATH)
      ? (JSON.parse(fs.readFileSync(OUT_PATH, "utf-8")) as { asOf?: string; facilities?: unknown[]; sourceFiles?: Record<string, string> })
      : null;
    if (previous?.facilities && facilities.length < previous.facilities.length * 0.9) {
      fail(
        `施設数が大きく減っています（前回 ${previous.facilities.length}件 → 今回 ${facilities.length}件）`
      );
    }
    // 自治体は基準日を変えずに資料を差し替えることがある。
    // 取り込み元の一式も同じときだけ、書き換えを見送る
    if (
      previous?.asOf === asOf &&
      JSON.stringify(previous?.sourceFiles ?? {}) === JSON.stringify(Object.fromEntries(latest.map((l) => [l.kind, l.url])))
    ) {
      console.log(`公式データの時点が前回と同じ（${asOf}）のため更新はありません。`);
      return;
    }

    const dataset = {
      municipalitySlug: MUNICIPALITY_SLUG,
      municipalityName: MUNICIPALITY_NAME,
      asOf,
      fetchedAt: todayJst(),
      sourceName: SOURCE_NAME,
      sourceUrl: INDEX_URL,
      sourceFiles: Object.fromEntries(latest.map((l) => [l.kind, l.url])),
      metrics: ["vacancy"],
      subtitle: "毎月1日現在の空き状況",
      notes: [
        "空きがあっても、利用調整の結果、入園できないことがあります。",
        "小規模保育施設等は0才から2才までの受け入れです。",
        "設けていないクラスは「—」にしています。",
        ...(footnoteMarks.size
          ? [
              `公式の表には注記の印（${[...footnoteMarks].sort().join("・")}）が付いた欄があります。` +
                "印は人数の意味を変えるものではないので、当サイトでは人数だけを載せています。" +
                "印の内容は市の資料でご確認ください。",
            ]
          : []),
      ],
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
    console.log(`  ${facilities.length}施設 / ${categories.length}区分`);
    console.log(`  空きの合計: ${total}人`);
    console.log(`  設けていないクラス: ${noClass}`);
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

main().catch((err) => fail(String(err)));
