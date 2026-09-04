/**
 * 川西市の保育施設の入所（園）可能人数を取り込む
 *
 * 実行: npm run vacancy:fetch:kawanishi
 *
 * ## この自治体の特徴
 * - 空きが人数で載っている。空欄はそのクラスを設けていない
 * - **歳児の並びが5歳から0歳の逆順**なので、読むときにひっくり返す
 * - 区分は縦書きで、こども園のところだけ「公立」と2列になっている
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "kawanishi";
const MUNICIPALITY_NAME = "川西市";
const SOURCE_NAME = "川西市「市内認可保育施設の空き状況」";
const INDEX_URL = "https://www.city.kawanishi.hyogo.jp/kurashi/kosodate/hoikusyo/1000639.html";
const AGE_COUNT = 6;
const UA = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";

const COL_DIVISION = 0;
const COL_NAME = 1;
const COL_AGE0 = 2;

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const EXTRACTOR = path.join(process.cwd(), "scripts", "kawanishi-pdf-extract.py");

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
  return (s ?? "").replace(/[\s　]/g, "");
}

function stripTags(html: string): string {
  return html.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").replace(/[\s　]+/g, " ").trim();
}

type PdfResult = {
  target: number;
  asOf: [number, number];
  wordSum: number;
  rows: string[][];
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

  // 「令和8年9月入所選考用空き状況（令和8年8月1日時点）」
  const links = [...html.matchAll(/<a[^>]+href="([^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => ({ url: new URL(m[1], INDEX_URL).toString(), text: toHalfWidth(stripTags(m[2])) }))
    .map((l) => {
      const m = squeeze(l.text).match(/令和(\d+)年(\d+)月入所選考用空き状況/);
      if (!m) return null;
      const reiwa = Number(m[1]);
      const month = Number(m[2]);
      return { ...l, reiwa, month, sortKey: reiwa * 100 + month };
    })
    .filter((v): v is NonNullable<typeof v> => v !== null);
  if (links.length === 0) fail("空き状況のPDFが見つかりません。ページの構成が変わった可能性があります。");
  const latest = links.reduce((a, b) => (b.sortKey > a.sortKey ? b : a));
  console.log(`最新: ${latest.text}\n  ${latest.url}`);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "kawanishi-vacancy-"));
  try {
    const r = await fetch(latest.url, { headers: { "User-Agent": UA } });
    if (!r.ok) fail(`PDFの取得に失敗しました（${r.status}）: ${latest.url}`);
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.subarray(0, 4).toString() !== "%PDF") fail(`PDFではありません: ${latest.url}`);
    const file = path.join(tmpDir, "kawanishi.pdf");
    fs.writeFileSync(file, buf);

    let pdf: PdfResult;
    try {
      pdf = JSON.parse(runPython([EXTRACTOR, file])) as PdfResult;
    } catch (err) {
      fail(`抽出結果を読めません: ${String(err)}`);
    }

    if (pdf.target !== latest.month) {
      fail(`PDFの表題（${pdf.target}月入所選考用）がリンクの文言（${latest.month}月）と違います`);
    }
    // PDFには「8月1日時点」としか書かれていないので、年はリンクの令和年から補う
    const [asOfMonth, asOfDay] = pdf.asOf;
    const year = 2018 + latest.reiwa;
    const asOf = `${year}-${String(asOfMonth).padStart(2, "0")}-${String(asOfDay).padStart(2, "0")}`;
    if (asOf > todayJst()) fail(`時点（${asOf}）が今日より先になっています`);
    console.log(`時点: ${asOf} / 対象: ${pdf.target}月入所選考`);

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

    for (const row of pdf.rows) {
      const name = squeeze(row[COL_NAME]);
      if (!name) fail("施設名が空の行があります");
      if (seen.has(name)) fail(`施設名が重複しています: ${name}`);
      seen.add(name);

      const division = squeeze(row[COL_DIVISION]);
      if (!division) fail(`${name}: 区分が分かりません`);
      if (!categories.includes(division)) categories.push(division);

      const vacancy: (number | null)[] = [];
      for (let age = 0; age < AGE_COUNT; age++) {
        // 公式の表は5歳から0歳の順に並んでいる
        const column = COL_AGE0 + (AGE_COUNT - 1 - age);
        const raw = squeeze(row[column] ?? "");
        if (raw === "") {
          noClass += 1;
          vacancy.push(null);
          continue;
        }
        const n = Number(toHalfWidth(raw));
        if (!Number.isInteger(n) || n < 0) fail(`${name}: ${age}歳の欄を読めません: 「${raw}」`);
        total += n;
        vacancy.push(n);
      }
      if (vacancy.every((v) => v === null)) fail(`${name}: 全てのクラスが空です`);

      facilities.push({
        id: name,
        name,
        w: null,
        c: categories.indexOf(division),
        vacancy,
      });
    }

    if (facilities.length < 30) fail(`施設が${facilities.length}件しか取れていません`);
    if (total !== pdf.wordSum) {
      fail(`空きの合計が合いません（PDFの印字 ${pdf.wordSum} / 取り込み ${total}）`);
    }
    console.log(`空きの合計${total}人はPDFの印字と一致しました`);

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

    const dataset = {
      municipalitySlug: MUNICIPALITY_SLUG,
      municipalityName: MUNICIPALITY_NAME,
      asOf,
      fetchedAt: todayJst(),
      sourceName: SOURCE_NAME,
      sourceUrl: INDEX_URL,
      sourceFiles: { vacancy: latest.url },
      metrics: ["vacancy"],
      subtitle: `${pdf.target}月入所選考のための空き人数`,
      notes: [
        `${pdf.target}月入所選考に向けて公表された、2号・3号認定の入所（園）可能人数です。`,
        "保育士配置の状況などにより、表のとおりの人数が入所できない場合があります。選考の締切時点では退園などにより変わる可能性があります。",
        "生後6か月未満の児童は、0歳児クラスに空きがある場合でも施設の状況により入所できないことがあります。",
        "年齢はその年度の4月1日時点のものです。設けていないクラスは「—」にしています。",
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
