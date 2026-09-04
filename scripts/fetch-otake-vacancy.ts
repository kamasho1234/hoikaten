/**
 * 大竹市の保育所（園）・認定こども園・小規模保育園の空き状況を取り込む
 *
 * 実行: npm run vacancy:fetch:otake
 *
 * ## この自治体の特徴
 * - 空きは人数ではなく記号（〇＝5人以上／△＝1〜4人／×＝0人）
 * - 地区（大竹・小方・玖波）ごとに3つの表が縦に並ぶ。地区は wards に持つ
 * - **玖波保育所だけ1歳と2歳が1つのセルにまとまっている**。
 *   罫線からセルの左右を求め、またぐ年齢すべてに同じ記号を配っている
 *   （scripts/otake-pdf-extract.py）
 * - 施設名が長い園はセルが2行分の高さになり、名前だけ上下2行に分かれる。
 *   記号のある行を代表点にして名前を寄せている
 * - 時点はリンクの題と資料の題にある「令和8年8月19日時点」から読む
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "otake";
const MUNICIPALITY_NAME = "大竹市";
const PREFECTURE = "広島県";
const SOURCE_NAME = "大竹市「保育所（園）・認定こども園・小規模保育園空き状況一覧」";
const INDEX_URL = "https://www.city.otake.hiroshima.jp/kosodate_info/scene/2/8479.html";
const AGE_COUNT = 6;
const MIN_FACILITIES = 7;
const UA = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const EXTRACTOR = path.join(process.cwd(), "scripts", "otake-pdf-extract.py");

/** 公式の凡例。資料の本文にそのまま書かれている */
const LEGEND = [
  { mark: "〇", label: "受け入れの可能性あり（5人以上）", open: true },
  { mark: "△", label: "若干の受け入れの可能性あり（1〜4人）", open: true },
  { mark: "×", label: "受け入れなし（0人）", open: false },
];

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

type PdfRow = {
  district: string;
  name: string;
  kind: string;
  marks: (string | null)[];
  mergedCells: number;
};

type PdfResult = {
  asOfText: string;
  markCounts: Record<string, number>;
  blanks: number;
  rows: PdfRow[];
};

function runPython(args: string[]): string {
  const candidates = process.env.PYTHON ? [process.env.PYTHON] : ["python3", "python"];
  let lastError = "";
  for (const bin of candidates) {
    try {
      return execFileSync(bin, args, { encoding: "utf-8", maxBuffer: 128 * 1024 * 1024 });
    } catch (err) {
      lastError = String((err as { stderr?: string })?.stderr ?? err);
    }
  }
  fail(`Pythonの実行に失敗しました: ${lastError}`);
}

/** 「令和8年8月19日時点」を YYYY-MM-DD にする */
function readAsOf(source: string): string | null {
  const m = /令和(\d+)年(\d{1,2})月(\d{1,2})日時点/.exec(toHalfWidth(squeeze(source)));
  if (!m) return null;
  const y = reiwaToYear(Number(m[1]));
  return `${y}-${String(Number(m[2])).padStart(2, "0")}-${String(Number(m[3])).padStart(2, "0")}`;
}

async function main(): Promise<void> {
  const r0 = await fetch(INDEX_URL, { headers: { "User-Agent": UA } });
  if (!r0.ok) fail(`ページの取得に失敗しました（${r0.status}）: ${INDEX_URL}`);
  const html = await r0.text();

  const links: { url: string; text: string }[] = [];
  for (const m of html.matchAll(/<a\s[^>]*href="([^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/gi)) {
    const text = squeeze(m[2]);
    if (text.includes("空き状況一覧")) {
      links.push({ url: new URL(m[1], INDEX_URL).toString(), text });
    }
  }
  if (links.length === 0) fail("空き状況一覧のPDFが見つかりません");
  if (links.length > 1) {
    console.log(`空き状況一覧のリンクが${links.length}本あります。いちばん上のものを使います。`);
  }
  const link = links[0];
  console.log(`PDF: ${link.text}\n  ${link.url}`);

  // 時点はリンクの題から読む（資料の題にも同じ日付が入っている）
  const asOfFromLink = readAsOf(link.text);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "otake-vacancy-"));
  try {
    const r = await fetch(link.url, { headers: { "User-Agent": UA } });
    if (!r.ok) fail(`PDFの取得に失敗しました（${r.status}）: ${link.url}`);
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.subarray(0, 4).toString() !== "%PDF") fail(`PDFではありません: ${link.url}`);
    const file = path.join(tmpDir, "otake.pdf");
    fs.writeFileSync(file, buf);

    let pdf: PdfResult;
    try {
      pdf = JSON.parse(runPython([EXTRACTOR, file])) as PdfResult;
    } catch (err) {
      fail(`抽出結果を読めません: ${String(err)}`);
    }

    const asOf = asOfFromLink ?? readAsOf(pdf.asOfText);
    if (!asOf) fail("時点（令和◯年◯月◯日時点）をリンクの題からも資料からも読めません");
    if (asOf > todayJst()) fail(`時点の日付（${asOf}）が今日より先になっています`);
    console.log(`時点: ${asOf}`);

    const known = new Set(LEGEND.map((l) => l.mark));
    const wards: string[] = [];
    const categories: string[] = [];
    const facilities: {
      id: string;
      name: string;
      w: number;
      c: number;
      vacancy: (number | null)[];
      symbols: (string | null)[];
      note?: string;
    }[] = [];
    const seen = new Set<string>();
    const marks = new Map<string, number>();
    let blanks = 0;
    let merged = 0;

    for (const row of pdf.rows) {
      const name = squeeze(row.name);
      if (!name) fail("施設名が空の行があります");
      if (seen.has(name)) fail(`施設名が重複しています: ${name}`);
      seen.add(name);

      const district = squeeze(row.district);
      if (!district) fail(`${name}: 地区が空です`);
      let w = wards.indexOf(district);
      if (w < 0) {
        wards.push(district);
        w = wards.length - 1;
      }

      const kind = squeeze(row.kind);
      if (!kind) fail(`${name}: 区分が空です`);
      let c = categories.indexOf(kind);
      if (c < 0) {
        categories.push(kind);
        c = categories.length - 1;
      }

      const symbols: (string | null)[] = [];
      for (let age = 0; age < AGE_COUNT; age++) {
        const raw = row.marks[age];
        if (raw === null) {
          blanks += 1;
          symbols.push(null);
          continue;
        }
        // 資料は「○」（丸）で書かれているので、当サイトの表記「〇」に寄せる
        const mark = squeeze(raw) === "○" ? "〇" : squeeze(raw);
        if (!known.has(mark)) fail(`${name}: ${age}歳児が凡例にない記号です（「${mark}」）`);
        marks.set(mark, (marks.get(mark) ?? 0) + 1);
        symbols.push(mark);
      }
      if (symbols.every((s) => s === null)) fail(`${name}: 記号が1つもありません`);

      merged += row.mergedCells;
      facilities.push({
        id: name,
        name,
        w,
        c,
        vacancy: new Array(AGE_COUNT).fill(null),
        symbols,
        ...(row.mergedCells > 0
          ? { note: "1歳児と2歳児は1つの欄にまとめて公表されているため、同じ記号にしています。" }
          : {}),
      });
    }

    if (facilities.length < MIN_FACILITIES) {
      fail(`施設が${facilities.length}件しか取れていません（${MIN_FACILITIES}件以上のはず）`);
    }
    // 検算1: 記号の数がPDFの読み取りと合うか（「○」は「〇」に寄せたぶんを足し戻す）
    const pdfCounts = new Map<string, number>();
    for (const [mark, count] of Object.entries(pdf.markCounts)) {
      const key = mark === "○" ? "〇" : mark;
      pdfCounts.set(key, (pdfCounts.get(key) ?? 0) + count);
    }
    for (const [mark, count] of marks) {
      if (count !== pdfCounts.get(mark)) {
        fail(`「${mark}」の数が合いません（PDF ${pdfCounts.get(mark)}個 / 取り込み ${count}個）`);
      }
    }
    // 検算2: 空らんの数がPDFと合うか
    if (blanks !== pdf.blanks) {
      fail(`空らんの数が合いません（PDF ${pdf.blanks} / 取り込み ${blanks}）`);
    }
    // 検算3: 欄の数が施設数×年齢数になるか
    const total = [...marks.values()].reduce((a, b) => a + b, 0) + blanks;
    if (total !== facilities.length * AGE_COUNT) {
      fail(`欄の数が合いません（${total} / 施設${facilities.length}×${AGE_COUNT}）`);
    }
    console.log(
      `${facilities.length}施設 ／ ${[...marks].map(([m, n]) => `${m}${n}`).join("・")}・クラスなし${blanks}` +
        (merged > 0 ? ` ／ まとめて公表されている欄 ${merged}件` : ""),
    );

    const previous = fs.existsSync(OUT_PATH)
      ? (JSON.parse(fs.readFileSync(OUT_PATH, "utf-8")) as {
          asOf?: string;
          facilities?: unknown[];
          sourceFiles?: Record<string, string>;
        })
      : null;
    if (previous?.facilities && facilities.length < previous.facilities.length * 0.9) {
      fail(
        `施設数が大きく減っています（前回 ${previous.facilities.length}件 → 今回 ${facilities.length}件）`,
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
      `大竹市は空き状況を人数ではなく記号で公表しています。これは${asOf}時点のものです。`,
      `公式の凡例は ${LEGEND.map((l) => `「${l.mark}」${l.label}`).join("、")} です。`,
      "公式の表で記号が無い年齢は「—」にしています。受け入れがないときは「×」と書かれるので、記号が無いのはその年齢のクラスを設けていないことを表します。",
      "令和8年4月1日現在の年齢でのクラスになります。",
      "0歳児については、フルムーンインターナショナルこども園おおたけは入所日時点で生後57日から、こぐま園は10か月から利用できます。",
      "市は「空き状況は、施設の状況などにより随時変化しますので、「×」となっていても入所（園）できる場合があります」としています。",
      ...(merged > 0
        ? ["玖波保育所は1歳児と2歳児が1つの欄にまとめて公表されているため、両方に同じ記号を入れています。"]
        : []),
    ];

    const dataset = {
      municipalitySlug: MUNICIPALITY_SLUG,
      municipalityName: MUNICIPALITY_NAME,
      prefecture: PREFECTURE,
      asOf,
      fetchedAt: todayJst(),
      sourceName: SOURCE_NAME,
      sourceUrl: INDEX_URL,
      sourceFiles: { vacancy: link.url },
      metrics: ["symbol"],
      subtitle: "翌月入所調整後の入所（園）可能状況",
      notes,
      wards,
      categories,
      symbolLegend: LEGEND,
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
    console.log(`  ${facilities.length}施設 / ${wards.join("・")} / ${categories.join("・")}`);
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

main().catch((err) => fail(String(err)));
