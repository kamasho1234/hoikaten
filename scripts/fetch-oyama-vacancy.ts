/**
 * 小山市の保育施設の空き状況を取り込む
 *
 * 実行: npm run vacancy:fetch:oyama
 *
 * ## この自治体の特徴
 * - 記号（〇＝4名以上の空き、△＝1名以上の空き、×＝空きなし、ー＝利用なし、調整中＝確認中）
 * - 凡例がPDFの中に表として入っている
 * - **PDFに基準日が書かれていない**ので、公式ページの【更新日】を時点として使う
 * - PDFは左右2段組。左段に公立保育所と私立保育園、右段に認定こども園
 * - 記号の総数が施設数×6クラスとぴったり合う（空欄がない）
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "oyama";
const MUNICIPALITY_NAME = "小山市";
const SOURCE_NAME = "小山市「保育園（所）・認定こども園の空き状況」";
const INDEX_URL =
  "https://www.city.oyama.tochigi.jp/kosodate-nicomaru/azukeru/page008962.html";
const AGE_COUNT = 6;
const MIN_FACILITIES = 40;
const UA = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const EXTRACTOR = path.join(process.cwd(), "scripts", "oyama-pdf-extract.py");

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

/** 記号の形をそろえる */
function shapeOf(mark: string): string {
  if (/^[○◯〇]$/.test(mark)) return "〇";
  if (/^[×✕✖]$/.test(mark)) return "×";
  if (/^[ー―－-]$/.test(mark)) return "ー";
  return mark;
}

type PdfResult = {
  target: number;
  legend: { mark: string; label: string }[];
  notes: string[];
  markCounts: Record<string, number>;
  rows: { kubun: string; name: string; marks: string[] }[];
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

  // 公式は基準日を書いていないので、ページの【更新日】を時点として使う
  const updated = html.match(
    /【更新日】\s*<span>\s*(\d{4})年(\d{1,2})月(\d{1,2})日\s*<\/span>/
  );
  if (!updated) fail("ページの更新日を読み取れませんでした。ページの構成が変わった可能性があります。");
  const asOf = `${updated[1]}-${String(Number(updated[2])).padStart(2, "0")}-${String(
    Number(updated[3])
  ).padStart(2, "0")}`;
  if (asOf > todayJst()) fail(`更新日（${asOf}）が今日より先になっています`);

  const links = [...html.matchAll(/<a[^>]+href="([^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => ({ url: new URL(m[1], INDEX_URL).toString(), text: toHalfWidth(squeeze(m[2])) }))
    .map((l) => {
      const m = l.text.match(/令和(\d+)年(\d+)月.*空き状況/);
      if (!m) return null;
      const [reiwa, month] = m.slice(1, 3).map(Number);
      return { ...l, reiwa, month, sortKey: reiwa * 100 + month };
    })
    .filter((v): v is NonNullable<typeof v> => v !== null);
  if (links.length === 0)
    fail("空き状況のPDFが見つかりません。ページの構成が変わった可能性があります。");
  const latest = links.reduce((a, b) => (b.sortKey > a.sortKey ? b : a));
  console.log(`最新: ${latest.text}\n  ${latest.url}`);
  console.log(`ページの更新日: ${asOf}`);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "oyama-vacancy-"));
  try {
    const r = await fetch(latest.url, { headers: { "User-Agent": UA } });
    if (!r.ok) fail(`PDFの取得に失敗しました（${r.status}）: ${latest.url}`);
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.subarray(0, 4).toString() !== "%PDF") fail(`PDFではありません: ${latest.url}`);
    const file = path.join(tmpDir, "oyama.pdf");
    fs.writeFileSync(file, buf);

    let pdf: PdfResult;
    try {
      pdf = JSON.parse(runPython([EXTRACTOR, file])) as PdfResult;
    } catch (err) {
      fail(`抽出結果を読めません: ${String(err)}`);
    }

    // PDFの「N月入所向け」がリンクの文言と合っているか
    if (pdf.target !== latest.month) {
      fail(`PDFの入所月（${pdf.target}月）がリンクの文言（${latest.month}月）と違います`);
    }
    const targetYear = 2018 + latest.reiwa;
    console.log(`対象: ${targetYear}年${pdf.target}月入所向け`);

    // 凡例。「空きなし」「利用なし」「調整中」は空きありとみなさない
    const symbolLegend = pdf.legend.map((l) => ({
      mark: shapeOf(l.mark),
      label: l.label,
      open: /空き$/.test(l.label),
    }));
    if (symbolLegend.length < 3) fail(`凡例が${symbolLegend.length}件しか取れていません`);
    if (!symbolLegend.some((l) => l.open)) fail("空きありの記号が凡例にありません");
    console.log(`凡例: ${symbolLegend.map((l) => `${l.mark}＝${l.label}`).join(" / ")}`);
    const legendByShape = new Map(symbolLegend.map((l) => [shapeOf(l.mark), l.mark]));

    const categories: string[] = [];
    const facilities: {
      id: string;
      name: string;
      w: null;
      c: number;
      vacancy: (number | null)[];
      symbols: (string | null)[];
    }[] = [];
    const marks = new Map<string, number>();
    const seen = new Set<string>();

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

      const symbols: (string | null)[] = [];
      for (let age = 0; age < AGE_COUNT; age++) {
        const raw = squeeze(row.marks[age] ?? "");
        const mark = legendByShape.get(shapeOf(raw));
        if (!mark) fail(`${name}: ${age}歳が凡例にない記号です: 「${raw}」`);
        marks.set(mark, (marks.get(mark) ?? 0) + 1);
        symbols.push(mark);
      }

      facilities.push({
        id: name,
        name,
        w: null,
        c,
        vacancy: new Array(AGE_COUNT).fill(null),
        symbols,
      });
    }

    if (facilities.length < MIN_FACILITIES) {
      fail(`施設が${facilities.length}件しか取れていません（${MIN_FACILITIES}件以上のはず）`);
    }

    // 検算1: 記号の総数が施設数×クラス数になるか（この表には空欄がない）
    const total = [...marks.values()].reduce((a, b) => a + b, 0);
    if (total !== facilities.length * AGE_COUNT) {
      fail(
        `記号の総数が合いません（${total}個 / 施設${facilities.length}×${AGE_COUNT}クラス＝${
          facilities.length * AGE_COUNT
        }）`
      );
    }

    // 検算2: 記号の数がPDFの文字と合うか
    for (const [mark, count] of marks) {
      const inText = Object.entries(pdf.markCounts)
        .filter(([m]) => shapeOf(m) === shapeOf(mark))
        .reduce((acc, [, v]) => acc + v, 0);
      if (count !== inText) {
        fail(`「${mark}」の数が合いません（PDFの文字 ${inText}個 / 取り込み ${count}個）`);
      }
    }
    console.log("記号の数はPDFの文字と一致し、総数も施設数×クラス数と合いました");

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
      console.log(`公式ページの更新日が前回と同じ（${asOf}）のため更新はありません。`);
      return;
    }

    const notes = [
      `小山市は空き状況を人数ではなく記号で公表しています。当サイトでも公式の記号のまま載せています。これは${targetYear}年${pdf.target}月入所向けのものです。`,
      "小山市はこの表に基準日を書いていないため、公式ページの更新日を時点として表示しています。",
      ...pdf.notes,
      "年齢区分は入所年度の4月1日時点の年齢です。",
    ];

    const dataset = {
      municipalitySlug: MUNICIPALITY_SLUG,
      municipalityName: MUNICIPALITY_NAME,
      asOf,
      fetchedAt: todayJst(),
      sourceName: SOURCE_NAME,
      sourceUrl: INDEX_URL,
      sourceFiles: { vacancy: latest.url },
      metrics: ["symbol"],
      subtitle: `${targetYear}年${pdf.target}月入所向けの空き状況`,
      notes,
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
    console.log(`  ${facilities.length}施設`);
    console.log(
      `  区分ごとの数: ${categories
        .map((name, i) => `${name} ${facilities.filter((f) => f.c === i).length}`)
        .join(" / ")}`
    );
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
