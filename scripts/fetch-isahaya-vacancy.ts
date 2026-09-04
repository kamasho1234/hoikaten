/**
 * 諫早市の保育施設空き状況の目安を取り込む
 *
 * 実行: npm run vacancy:fetch:isahaya
 *
 * ## この自治体の特徴
 * - **空欄が「受け入れ可能」**という、ほかの自治体と逆の書き方
 *   - 空欄 … 受け入れ可能 → 当サイトでは「○」に置き換える
 *   - `×` … 受け入れができない
 *   - `※` … 状況によって受け入れられない
 * - 「求職活動」の列があり、**空欄なら求職活動を理由とする入所ができる**。
 *   年齢の欄ではないので、可能な施設の数を注記に書く
 * - 掲載先が市の公式サイトではなく、市が運営する子育てサイト
 *   「いさはや子育てネット」（isahayakosodate.jp）
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "isahaya";
const MUNICIPALITY_NAME = "諫早市";
const SOURCE_NAME = "諫早市「保育施設空き状況の目安」（いさはや子育てネット）";
const INDEX_URL = "https://isahayakosodate.jp/service/03_nursery/2022100500011.html";
const AGE_COUNT = 6;
const MIN_FACILITIES = 45;
const UA = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";

/** 空欄（受け入れ可能）を、当サイトではこの記号にする */
const OPEN_MARK = "○";

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const EXTRACTOR = path.join(process.cwd(), "scripts", "isahaya-pdf-extract.py");

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
  target: number;
  notes: string[];
  markCounts: Record<string, number>;
  blanks: number;
  rows: {
    area: string;
    name: string;
    address: string;
    marks: string[];
    job: string;
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
  console.log(`${MUNICIPALITY_NAME}の空き状況を取り込みます`);
  console.log(`公式ページ: ${INDEX_URL}\n`);

  const res = await fetch(INDEX_URL, { headers: { "User-Agent": UA } });
  if (!res.ok) fail(`公式ページが ${res.status} を返しました`);
  const html = await res.text();

  const links = [...html.matchAll(/<a[^>]+href="([^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => ({
      url: new URL(m[1], INDEX_URL).toString(),
      text: toHalfWidth(squeeze(m[2])),
    }))
    .filter((l) => l.text.includes("空き状況の目安"));
  if (links.length !== 1) {
    fail(`空き状況の目安のPDFが${links.length}件あります（1件のはず）`);
  }
  const link = links[0];
  console.log(`PDF: ${link.text}\n  ${link.url}`);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "isahaya-vacancy-"));
  try {
    const r = await fetch(link.url, { headers: { "User-Agent": UA } });
    if (!r.ok) fail(`PDFの取得に失敗しました（${r.status}）: ${link.url}`);
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.subarray(0, 4).toString() !== "%PDF") fail(`PDFではありません: ${link.url}`);
    const file = path.join(tmpDir, "isahaya.pdf");
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
    console.log(`時点: ${asOf} ／ 対象: ${pdf.target}月入園`);

    const symbolLegend = [
      { mark: OPEN_MARK, label: "受け入れ可能", open: true },
      { mark: "※", label: "状況によって受け入れられない", open: false },
      { mark: "×", label: "受け入れができない", open: false },
    ];

    const wards: string[] = [];
    const facilities: {
      id: string;
      name: string;
      w: number;
      c: null;
      vacancy: (number | null)[];
      symbols: (string | null)[];
    }[] = [];
    const marks = new Map<string, number>();
    const seen = new Set<string>();
    let jobOk = 0;

    for (const row of pdf.rows) {
      const name = squeeze(row.name);
      if (!name) fail("施設名が空の行があります");
      if (seen.has(name)) fail(`施設名が重複しています: ${name}`);
      seen.add(name);

      const area = squeeze(row.area);
      if (!area) fail(`${name}: 提供区域が空です`);
      let w = wards.indexOf(area);
      if (w < 0) {
        wards.push(area);
        w = wards.length - 1;
      }

      const symbols: (string | null)[] = [];
      for (let age = 0; age < AGE_COUNT; age++) {
        const raw = squeeze(row.marks[age] ?? "");
        // 空欄＝受け入れ可能
        const mark = raw === "" ? OPEN_MARK : raw === "✕" ? "×" : raw;
        if (!symbolLegend.some((l) => l.mark === mark)) {
          fail(`${name}: ${age}歳児が凡例にない記号です（「${raw}」）`);
        }
        marks.set(mark, (marks.get(mark) ?? 0) + 1);
        symbols.push(mark);
      }

      if (!squeeze(row.job)) jobOk += 1;

      facilities.push({
        id: name,
        name,
        w,
        c: null,
        vacancy: new Array(AGE_COUNT).fill(null),
        symbols,
      });
    }

    if (facilities.length < MIN_FACILITIES) {
      fail(`施設が${facilities.length}件しか取れていません（${MIN_FACILITIES}件以上のはず）`);
    }

    // 検算1: ×と※の数がPDFの印字と合うか
    for (const mark of ["×", "※"]) {
      const inText = Object.entries(pdf.markCounts)
        .filter(([m]) => (m === "✕" ? "×" : m) === mark)
        .reduce((acc, [, v]) => acc + v, 0);
      const count = marks.get(mark) ?? 0;
      if (count !== inText) {
        fail(`「${mark}」の数が合いません（PDFの印字 ${inText}個 / 取り込み ${count}個）`);
      }
    }
    // 検算2: ○にした数がPDFの空欄の数と合うか
    if ((marks.get(OPEN_MARK) ?? 0) !== pdf.blanks) {
      fail(
        `空欄の数が合いません（PDF ${pdf.blanks}個 / 取り込み ${marks.get(OPEN_MARK)}個）`
      );
    }
    // 検算3: 全部の欄が施設数×年齢数になるか
    const total = [...marks.values()].reduce((a, b) => a + b, 0);
    if (total !== facilities.length * AGE_COUNT) {
      fail(`欄の数が合いません（${total} / 施設${facilities.length}×${AGE_COUNT}）`);
    }
    console.log(
      `記号と空欄の数がPDFと一致しました（受け入れ可能${marks.get(OPEN_MARK)}／※${marks.get("※")}／×${marks.get("×")}）`
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
    if (
      previous?.asOf === asOf &&
      previous?.sourceFiles?.vacancy === link.url &&
      JSON.stringify(previous?.facilities ?? null) === JSON.stringify(facilities)
    ) {
      console.log(`公式データの時点が前回と同じ（${asOf}）のため更新はありません。`);
      return;
    }

    const notes = [
      `諫早市が公開しているのは${pdf.target}月入園の空き状況の目安で、${asOf}時点のものです。`,
      `公式の表は、受け入れができない年齢に「×」、状況によって受け入れられない年齢に「※」を書き、受け入れ可能な年齢は空欄にしています。当サイトでは分かりやすさのため、空欄を「${OPEN_MARK}」に置き換えて表示しています。`,
      ...pdf.notes.filter((n) => !n.includes("「×」を表示") && !n.includes("「※」を表示")),
      `求職活動を理由とする入所ができるのは、${facilities.length}施設のうち${jobOk}施設です。どの施設かは公式の表の「求職活動」の列でご確認ください。`,
    ];

    const dataset = {
      municipalitySlug: MUNICIPALITY_SLUG,
      municipalityName: MUNICIPALITY_NAME,
      asOf,
      fetchedAt: todayJst(),
      sourceName: SOURCE_NAME,
      sourceUrl: INDEX_URL,
      sourceFiles: { vacancy: link.url },
      metrics: ["symbol"],
      subtitle: `${pdf.target}月入園の空き状況の目安`,
      notes,
      wards,
      categories: [],
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
    console.log(`  ${facilities.length}施設 / ${wards.length}区域 / 求職活動可 ${jobOk}施設`);
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

main().catch((err) => fail(String(err)));
