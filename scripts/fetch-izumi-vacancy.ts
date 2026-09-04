/**
 * 和泉市の保育所等の受け入れ予定人数を取り込む
 *
 * 実行: npm run vacancy:fetch:izumi
 *
 * ## この自治体の特徴
 * - 空きが人数で載っている
 * - 設けていないクラスは空欄ではなくセルに斜線が引いてある
 * - 夜間保育園だけ0歳から5歳がひとつの欄にまとまっていて年齢別に分かれていない
 *   （vacancyTotal で持つ）
 * - 区分（公立・民間）は縦書きで、行ごとにセルが切れている
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "izumi";
const MUNICIPALITY_NAME = "和泉市";
const SOURCE_NAME = "和泉市「保育所・認定こども園等の受け入れ予定人数」";
const INDEX_URL =
  "https://www.city.osaka-izumi.lg.jp/kakukano/kosodatekenkobu/kodomomirai/gyoumu/hoikuyou/nyuuennkankei/1510885432372.html";
const AGE_COUNT = 6;
const UA = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const EXTRACTOR = path.join(process.cwd(), "scripts", "izumi-pdf-extract.py");

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
  division: string;
  name: string;
  values: (string | null)[] | null;
  total: string | null;
};

type PdfResult = {
  target: [number, number];
  asOf: [number, number, number];
  rows: PdfRow[];
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

function toCount(raw: string, where: string): number {
  const n = Number(toHalfWidth(raw));
  if (!Number.isInteger(n) || n < 0) fail(`${where}: 人数を読めません: 「${raw}」`);
  return n;
}

async function main() {
  console.log(`${MUNICIPALITY_NAME}の受け入れ予定人数を取り込みます`);
  console.log(`公式ページ: ${INDEX_URL}\n`);

  const res = await fetch(INDEX_URL, { headers: { "User-Agent": UA } });
  if (!res.ok) fail(`公式ページが ${res.status} を返しました`);
  const html = await res.text();

  // 「令和8年度9月選考受入予定人数（令和8年7月31日現在）」
  // 令和8年10月ぶんから「年度」が「年」になり、「現在」が「時点」になった。
  // どちらの書き方でも拾えるようにしておく
  const links = [...html.matchAll(/<a[^>]+href="([^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => ({ url: new URL(m[1], INDEX_URL).toString(), text: toHalfWidth(squeeze(m[2])) }))
    .map((l) => {
      const m = l.text.match(/令和(\d+)年度?(\d+)月選考受入予定人数/);
      if (!m) return null;
      const [reiwa, month] = m.slice(1, 3).map(Number);
      return { ...l, reiwa, month, sortKey: reiwa * 100 + month };
    })
    .filter((v): v is NonNullable<typeof v> => v !== null);
  if (links.length === 0)
    fail("受け入れ予定人数のPDFが見つかりません。ページの構成が変わった可能性があります。");
  const latest = links.reduce((a, b) => (b.sortKey > a.sortKey ? b : a));
  console.log(`最新: ${latest.text}\n  ${latest.url}`);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "izumi-vacancy-"));
  try {
    const r = await fetch(latest.url, { headers: { "User-Agent": UA } });
    if (!r.ok) fail(`PDFの取得に失敗しました（${r.status}）: ${latest.url}`);
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.subarray(0, 4).toString() !== "%PDF") fail(`PDFではありません: ${latest.url}`);
    const file = path.join(tmpDir, "izumi.pdf");
    fs.writeFileSync(file, buf);

    let pdf: PdfResult;
    try {
      pdf = JSON.parse(runPython([EXTRACTOR, file])) as PdfResult;
    } catch (err) {
      fail(`抽出結果を読めません: ${String(err)}`);
    }

    const [targetReiwa, targetMonth] = pdf.target;
    if (targetReiwa !== latest.reiwa || targetMonth !== latest.month) {
      fail(
        `PDFの表題（令和${targetReiwa}年度${targetMonth}月）がリンクの文言（${latest.text}）と違います`
      );
    }
    const [reiwa, month, day] = pdf.asOf;
    const asOf = `${2018 + reiwa}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    if (asOf > todayJst()) fail(`基準日（${asOf}）が今日より先になっています`);
    console.log(`基準日: ${asOf} / 対象: ${targetMonth}月選考`);

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
    let noClass = 0;
    let total = 0;

    for (const row of pdf.rows) {
      const name = squeeze(row.name);
      if (!name) fail("施設名が空の行があります");
      if (seen.has(name)) fail(`施設名が重複しています: ${name}`);
      seen.add(name);
      if (!row.division) fail(`${name}: 区分が分かりません`);
      if (!categories.includes(row.division)) categories.push(row.division);

      const facility = {
        id: name,
        name,
        w: null,
        c: categories.indexOf(row.division),
        vacancy: new Array(AGE_COUNT).fill(null) as (number | null)[],
      };

      if (row.values === null) {
        // 年齢別に分かれていない施設。合計だけを持つ
        if (row.total === null) fail(`${name}: まとまった人数を読めません`);
        const count = toCount(row.total, name);
        total += count;
        facilities.push({ ...facility, vacancyTotal: count });
        continue;
      }

      row.values.forEach((value, age) => {
        if (value === null) {
          noClass += 1;
          return;
        }
        const count = toCount(value, `${name}の${age}歳`);
        total += count;
        facility.vacancy[age] = count;
      });
      if (facility.vacancy.every((v) => v === null)) fail(`${name}: 全てのクラスが空です`);
      facilities.push(facility);
    }

    if (facilities.length < 30) fail(`施設が${facilities.length}件しか取れていません`);

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

    const dataset = {
      municipalitySlug: MUNICIPALITY_SLUG,
      municipalityName: MUNICIPALITY_NAME,
      asOf,
      fetchedAt: todayJst(),
      sourceName: SOURCE_NAME,
      sourceUrl: INDEX_URL,
      sourceFiles: { vacancy: latest.url },
      metrics: ["vacancy"],
      subtitle: `${targetMonth}月選考の受け入れ予定人数`,
      notes: [
        "受け入れ予定人数は参考の人数です。入所している児童の状況や職員の人数などにより変動する場合があります。",
        "空き状況がゼロの保育施設も申込できます。辞退などにより空きが生じ、利用調整を行う可能性があります。",
        "夜間保育園は年齢別ではなく、まとめた人数で公表されています。",
        "設けていないクラスは「—」にしています。",
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
