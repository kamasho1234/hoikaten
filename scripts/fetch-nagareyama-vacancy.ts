/**
 * 流山市の市内認可保育施設の空き状況を取り込む
 *
 * 実行: npm run vacancy:fetch:nagareyama
 *
 * ## この自治体の特徴
 * - **空きを人数ではなく記号で公表している**（●＝3人以上、△＝1〜2人、空欄＝空きなし）。
 *   記号のまま持って記号のまま見せる
 * - **1ページに3段**（公立保育所／私立保育所／小規模保育）。段ごとに
 *   「区分／コード／施設名称／定員／0歳〜5歳」が並び、右の段は2歳児まで
 * - 区分は縦書きで段の先頭に1回だけ入るので、段ごとに覚えておく
 * - 施設のコードが振られているので、重複していないことを確かめる
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "nagareyama";
const MUNICIPALITY_NAME = "流山市";
const SOURCE_NAME = "流山市「保育施設の空き状況」";
const INDEX_URL = "https://www.city.nagareyama.chiba.jp/life/1001107/1001162/1051419.html";
const AGE_COUNT = 6;

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const EXTRACTOR = path.join(process.cwd(), "scripts", "nagareyama-pdf-extract.py");

function fail(message: string): never {
  console.error(`\n[中断] ${message}`);
  process.exit(1);
}

function todayJst(): string {
  const jst = new Date(Date.now() + 9 * 60 * 60 * 1000);
  return jst.toISOString().slice(0, 10);
}

function reiwaToYear(reiwa: number): number {
  return 2018 + reiwa;
}

function toHalfWidth(s: string): string {
  return s.replace(/[０-９]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xfee0));
}

function stripTags(html: string): string {
  return html.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").replace(/[\s　]+/g, " ").trim();
}

function squeeze(s: string): string {
  return (s ?? "").replace(/[\s　]/g, "");
}

function normalizeMark(mark: string): string {
  const t = squeeze(mark);
  if (/^[●○◯〇]$/.test(t)) return "●";
  if (/^[△▲]$/.test(t)) return "△";
  return t;
}

type PdfTable = { head: string[]; sub: string[]; rows: string[][] };
type PdfResult = { target: number[]; legend: string; tables: PdfTable[] };

function runPython(args: string[]): string {
  const candidates = process.env.PYTHON ? [process.env.PYTHON] : ["python3", "python"];
  let lastError = "";
  for (const bin of candidates) {
    try {
      return execFileSync(bin, args, { encoding: "utf-8", maxBuffer: 64 * 1024 * 1024 });
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

  const ua = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";
  const res = await fetch(INDEX_URL, { headers: { "User-Agent": ua } });
  if (!res.ok) fail(`公式ページが ${res.status} を返しました`);
  const html = await res.text();

  // 「令和8年9月入所審査　市内認可保育施設の空き状況一覧（一般枠） （PDF 196.0 KB）」
  const links = [...html.matchAll(/<a[^>]+href="([^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => ({ url: new URL(m[1], INDEX_URL).toString(), text: toHalfWidth(stripTags(m[2])) }))
    .map((l) => {
      const m = l.text.match(/^令和(\d+)年(\d+)月入所審査.*（一般枠）/);
      if (!m) return null;
      const fiscalYear = reiwaToYear(Number(m[1]));
      const month = Number(m[2]);
      const year = month <= 3 ? fiscalYear + 1 : fiscalYear;
      return { ...l, year, month, sortKey: year * 100 + month };
    })
    .filter((v): v is NonNullable<typeof v> => v !== null);
  if (links.length === 0) fail("空き状況のPDFが見つかりません。ページの構成が変わった可能性があります。");
  const latest = links.reduce((a, b) => (b.sortKey > a.sortKey ? b : a));
  console.log(`最新: ${latest.text}\n  ${latest.url}`);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "nagareyama-vacancy-"));
  try {
    const r = await fetch(latest.url, { headers: { "User-Agent": ua } });
    if (!r.ok) fail(`PDFの取得に失敗しました（${r.status}）: ${latest.url}`);
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.subarray(0, 4).toString() !== "%PDF") fail(`PDFではありません: ${latest.url}`);
    const file = path.join(tmpDir, "nagareyama.pdf");
    fs.writeFileSync(file, buf);

    let pdf: PdfResult;
    try {
      pdf = JSON.parse(runPython([EXTRACTOR, file])) as PdfResult;
    } catch (err) {
      fail(`抽出結果を読めません: ${String(err)}`);
    }

    const [ty, tm] = pdf.target;
    if (tm !== latest.month) {
      fail(`PDFの対象月（${tm}月）がリンクの文言（${latest.month}月）と違います。`);
    }
    // 審査の時点しか書かれていないので、対象月の前月1日を時点として扱う
    const asOf = new Date(Date.UTC(latest.year, latest.month - 2, 1)).toISOString().slice(0, 10);
    console.log(`対象: 令和${ty}年${tm}月入所審査`);

    // 「（凡例） ●：3人以上空きあり △：1～2人空きあり 空欄：空きなし」
    const legendFlat = squeeze(pdf.legend);
    const legendMatch = legendFlat.match(/([●○◯〇])：(.+?)([△▲])：(.+?)空欄：(.+)$/);
    if (!legendMatch) fail(`記号の凡例を読み取れませんでした: ${pdf.legend}`);
    const symbolLegend = [
      { mark: "●", label: legendMatch[2], open: true },
      { mark: "△", label: legendMatch[4], open: true },
    ];
    const blankLabel = legendMatch[5];
    console.log(
      `凡例: ${symbolLegend.map((l) => `${l.mark}＝${l.label}`).join(" / ")} / 空欄＝${blankLabel}`
    );

    const categories: string[] = [];
    const facilities: {
      id: string;
      name: string;
      w: null;
      c: number;
      vacancy: (number | null)[];
      symbols: (string | null)[];
    }[] = [];
    const seenId = new Set<string>();
    const seenCode = new Set<string>();
    const marks = new Map<string, number>();

    for (const table of pdf.tables) {
      const head = table.head.map((h) => squeeze(h));
      const sub = table.sub.map((h) => toHalfWidth(squeeze(h)));
      // 段の先頭（「区分」の列）を見つけて、段ごとに列の並びを決める
      const sectionStarts = head.flatMap((h, i) => (h === "区分" ? [i] : []));
      if (sectionStarts.length === 0) fail(`「区分」の列が見つかりません: ${table.head.join(" / ")}`);

      for (const [sectionIndex, start] of sectionStarts.entries()) {
        const end =
          sectionIndex + 1 < sectionStarts.length ? sectionStarts[sectionIndex + 1] : head.length;
        const ageIdx = Array.from({ length: AGE_COUNT }, (_, age) =>
          sub.findIndex((h, i) => i > start && i < end && h === `${age}歳`)
        );
        if (ageIdx[0] < 0) continue;
        // 施設名は「区分」「コード」の次
        const nameIdx = start + 2;
        const codeIdx = start + 1;
        let category = "";

        for (const row of table.rows) {
          const mark = squeeze(row[start] ?? "");
          if (mark) category = mark;
          const name = squeeze(row[nameIdx] ?? "");
          const code = toHalfWidth(squeeze(row[codeIdx] ?? ""));
          if (!name || !/^\d+$/.test(code)) continue;
          if (!category) fail(`${name}: 区分が分かりません`);
          if (seenCode.has(code)) fail(`施設のコードが重複しています: ${code}`);
          seenCode.add(code);

          const symbols = ageIdx.map((c) => {
            // 右の段（小規模保育）には3歳以上の列がない
            if (c < 0) return null;
            const value = normalizeMark(row[c] ?? "");
            // 空欄は「空きなし」。クラスがないという意味ではない
            if (value === "") return null;
            if (!symbolLegend.some((l) => l.mark === value)) {
              fail(`${name}: 凡例にない記号です: 「${row[c]}」`);
            }
            marks.set(value, (marks.get(value) ?? 0) + 1);
            return value;
          });

          if (!categories.includes(category)) categories.push(category);
          const id = `${code}-${name}`;
          if (seenId.has(id)) fail(`施設名が重複しています: ${id}`);
          seenId.add(id);
          facilities.push({
            id,
            name,
            w: null,
            c: categories.indexOf(category),
            vacancy: new Array(AGE_COUNT).fill(null),
            symbols,
          });
        }
      }
    }

    if (facilities.length < 50) fail(`施設が${facilities.length}件しか取れていません`);
    for (const item of symbolLegend) {
      if (!marks.has(item.mark)) fail(`凡例にある「${item.mark}」が表に1つも出てきません`);
    }

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
      metrics: ["symbol"],
      subtitle: `${latest.year}年${latest.month}月入所審査の空き状況`,
      notes: [
        "流山市は空きを人数ではなく記号で公表しています。当サイトでも公式の記号のまま載せています。",
        `記号のないクラスは${blankLabel}です。`,
        "小規模保育では0歳児から2歳児が対象です。",
        "この一覧は一般枠のものです。要配慮児童の先行審査は別に公表されています。",
      ],
      wards: [],
      categories,
      symbolLegend,
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
    console.log("");
    for (const [i, cat] of categories.entries()) {
      console.log(`  ${cat} ${facilities.filter((f) => f.c === i).length}施設`);
    }
    console.log("");
    console.log("  記号の出てきた数");
    for (const item of symbolLegend) {
      console.log(`  ${item.mark}（${item.label}） ${marks.get(item.mark) ?? 0}`);
    }
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

main().catch((err) => fail(String(err)));
