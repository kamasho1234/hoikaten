/**
 * 門真市の教育・保育施設等の空き状況と申込み人数を取り込む
 *
 * 実行: npm run vacancy:fetch:kadoma
 *
 * ## この自治体の特徴
 * - **1ページ目が空き状況（記号）、2ページ目が申込み人数（数）**で施設の並びが同じ。
 *   両方を持てるので metrics は ["symbol","waiting"]
 * - 記号は ○＝4人以上、△＝1〜3人、×＝0人
 * - **「-」の意味が凡例に書かれている**（「利用定員の設定なし」）ので、
 *   その年齢のクラスがないことを推し量らずに済む
 * - 1ページ目の施設名には「★」（1号認定の定員を別途設けている施設）が付き、
 *   2ページ目には付かない。照合するときは外す
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "kadoma";
const MUNICIPALITY_NAME = "門真市";
const SOURCE_NAME = "門真市「教育・保育施設等の空き状況・申込み人数」";
const INDEX_URL =
  "https://www.city.kadoma.osaka.jp/sukusuku/kakuka/hoikuyotien/1/akizyoukyouitiran/6_2/38657.html";
const AGE_COUNT = 6;
const MIN_FACILITIES = 25;
const UA = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const EXTRACTOR = path.join(process.cwd(), "scripts", "kadoma-pdf-extract.py");

/** 1号認定の定員を別途設けている施設に付く印 */
const ONE_GO_MARK = "★";

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

type Row = { kind: string; name: string; cells: (string | number)[] };
type PdfResult = {
  asOf: [number, number, number];
  target: [number, number];
  legend: { mark: string; label: string }[];
  noClassMark: string;
  noClassLabel: string;
  notes: string[];
  markCounts: Record<string, number>;
  vacancyRows: Row[];
  appliedRows: Row[];
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

  const res = await fetch(INDEX_URL, { headers: { "User-Agent": UA }, redirect: "follow" });
  if (!res.ok) fail(`公式ページが ${res.status} を返しました`);
  const html = await res.text();

  const links = [...html.matchAll(/<a[^>]+href="([^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => ({
      url: new URL(m[1], res.url || INDEX_URL).toString(),
      text: toHalfWidth(squeeze(m[2])),
    }))
    .map((l) => {
      const m = /【令和(\d+)\(\d+\)年(\d+)月入所】教育・保育施設等の空き状況/.exec(l.text);
      return { ...l, key: m ? Number(m[1]) * 100 + Number(m[2]) : 0 };
    })
    .filter((l) => l.key > 0)
    .sort((a, b) => b.key - a.key);
  if (links.length === 0) fail("空き状況のPDFが見つかりません");
  const link = links[0];
  console.log(`PDF: ${link.text}\n  ${link.url}`);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "kadoma-vacancy-"));
  try {
    const r = await fetch(link.url, { headers: { "User-Agent": UA } });
    if (!r.ok) fail(`PDFの取得に失敗しました（${r.status}）: ${link.url}`);
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.subarray(0, 4).toString() !== "%PDF") fail(`PDFではありません: ${link.url}`);
    const file = path.join(tmpDir, "kadoma.pdf");
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
    // リンクの題の入所月とPDFの中の入所月が合っているか
    if (link.key !== pdf.target[0] * 100 + pdf.target[1]) {
      fail(`リンクの題（${link.text}）とPDFの中の入所月が違います`);
    }
    const targetLabel = `${reiwaToYear(pdf.target[0])}年${pdf.target[1]}月`;
    console.log(`時点: ${asOf} ／ 対象: ${targetLabel}入所`);

    const symbolLegend = pdf.legend.map((l) => ({
      mark: squeeze(l.mark),
      label: squeeze(l.label),
      open: !/0人$/.test(squeeze(l.label)),
    }));
    if (symbolLegend.length !== 3) fail(`凡例が${symbolLegend.length}件です（3件のはず）`);
    if (!symbolLegend.some((l) => l.open)) fail("空きありの記号が凡例にありません");
    const noClassMark = squeeze(pdf.noClassMark);
    const noClassLabel = squeeze(pdf.noClassLabel);
    if (!noClassMark || !noClassLabel) fail("「利用定員の設定なし」の記号が読み取れませんでした");
    console.log(
      `凡例: ${symbolLegend.map((l) => `${l.mark}＝${l.label}`).join(" / ")} ／ ${noClassMark}＝${noClassLabel}`,
    );
    const known = new Set(symbolLegend.map((l) => l.mark));

    // 2つの表の施設が同じ並びで対応しているか
    if (pdf.vacancyRows.length !== pdf.appliedRows.length) {
      fail(
        `空き状況が${pdf.vacancyRows.length}施設、申込み人数が${pdf.appliedRows.length}施設で数が合いません`,
      );
    }

    const categories: string[] = [];
    const facilities: {
      id: string;
      name: string;
      w: null;
      c: number;
      vacancy: (number | null)[];
      symbols: (string | null)[];
      waiting: (number | null)[];
      note?: string;
    }[] = [];
    const seen = new Set<string>();
    const marks = new Map<string, number>();
    let notOffered = 0;
    let waitingSum = 0;
    let waitingOnNoClass = 0;

    for (let i = 0; i < pdf.vacancyRows.length; i++) {
      const row = pdf.vacancyRows[i];
      const applied = pdf.appliedRows[i];
      const rawName = squeeze(row.name);
      if (!rawName) fail("施設名が空の行があります");
      const oneGo = rawName.startsWith(ONE_GO_MARK);
      const name = oneGo ? rawName.slice(ONE_GO_MARK.length) : rawName;
      // 申込み人数の表は同じ並びで、施設名に「★」が付かない
      if (squeeze(applied.name) !== name) {
        fail(`${i + 1}番目の施設名が2つの表で違います（「${name}」と「${applied.name}」）`);
      }
      if (row.kind !== applied.kind) {
        fail(`${name}: 分類が2つの表で違います（「${row.kind}」と「${applied.kind}」）`);
      }
      if (seen.has(name)) fail(`施設名が重複しています: ${name}`);
      seen.add(name);

      const kind = squeeze(row.kind);
      if (!kind) fail(`${name}: 分類が空です`);
      let c = categories.indexOf(kind);
      if (c < 0) {
        categories.push(kind);
        c = categories.length - 1;
      }

      const symbols: (string | null)[] = [];
      const waiting: (number | null)[] = [];
      for (let age = 0; age < AGE_COUNT; age++) {
        const raw = squeeze(String(row.cells[age]));
        const applications = applied.cells[age];
        if (typeof applications !== "number" || !Number.isInteger(applications)) {
          fail(`${name}: ${age}歳児の申込み人数が数ではありません（${applications}）`);
        }

        if (raw === noClassMark) {
          notOffered += 1;
          symbols.push(null);
          // 定員がない年齢なので申込みも無いはず。あったら数えて注記に出す
          if (applications > 0) waitingOnNoClass += 1;
          waiting.push(null);
          continue;
        }
        if (!known.has(raw)) fail(`${name}: ${age}歳児が凡例にない記号です（「${raw}」）`);
        marks.set(raw, (marks.get(raw) ?? 0) + 1);
        symbols.push(raw);
        waitingSum += applications;
        waiting.push(applications);
      }

      facilities.push({
        id: name,
        name,
        w: null,
        c,
        vacancy: new Array(AGE_COUNT).fill(null),
        symbols,
        waiting,
        ...(oneGo ? { note: "1号認定（教育認定）の利用定員を別に設けている施設です。" } : {}),
      });
    }

    if (facilities.length < MIN_FACILITIES) {
      fail(`施設が${facilities.length}件しか取れていません（${MIN_FACILITIES}件以上のはず）`);
    }
    // 検算1: 記号の数がPDFの読み取りと合うか
    for (const [mark, count] of marks) {
      if (count !== pdf.markCounts[mark]) {
        fail(`「${mark}」の数が合いません（PDF ${pdf.markCounts[mark]}個 / 取り込み ${count}個）`);
      }
    }
    if (notOffered !== (pdf.markCounts[noClassMark] ?? 0)) {
      fail(
        `「${noClassMark}」の数が合いません（PDF ${pdf.markCounts[noClassMark] ?? 0} / 取り込み ${notOffered}）`,
      );
    }
    // 検算2: 欄の数が施設数×年齢数になるか
    const total = [...marks.values()].reduce((a, b) => a + b, 0) + notOffered;
    if (total !== facilities.length * AGE_COUNT) {
      fail(`欄の数が合いません（${total} / 施設${facilities.length}×${AGE_COUNT}）`);
    }
    console.log(
      `${facilities.length}施設 ／ ${[...marks].map(([m, n]) => `${m}${n}`).join("・")}・${noClassMark}${notOffered}／ 申込み${waitingSum}人`,
    );
    if (waitingOnNoClass > 0) {
      console.log(`  定員のない年齢に申込みがある欄が${waitingOnNoClass}件あります`);
    }

    const previous = fs.existsSync(OUT_PATH)
      ? (JSON.parse(fs.readFileSync(OUT_PATH, "utf-8")) as { asOf?: string; facilities?: unknown[] })
      : null;
    if (previous?.facilities && facilities.length < previous.facilities.length * 0.9) {
      fail(`施設数が大きく減っています（前回 ${previous.facilities.length}件 → 今回 ${facilities.length}件）`);
    }
    if (previous?.asOf === asOf) {
      console.log(`公式データの時点が前回と同じ（${asOf}）のため更新はありません。`);
      return;
    }

    const notes = [
      `門真市は空き状況を記号で、申込み人数を数で公表しています。これは${targetLabel}入所分で、${asOf}時点のものです。`,
      `公式の凡例は ${symbolLegend.map((l) => `「${l.mark}」${l.label}`).join("、")} です。`,
      `公式の表で「${noClassMark}」になっている年齢は「—」にしています。公式の凡例に「${noClassLabel}」と書かれています。`,
      "「入所待ち」として出しているのは、公式の「申込み人数」です。",
      ...(waitingOnNoClass > 0
        ? [`定員のない年齢に申込み人数が入っている欄が${waitingOnNoClass}件あります。`]
        : []),
      ...pdf.notes.map((n) => squeeze(n)),
    ];

    const dataset = {
      municipalitySlug: MUNICIPALITY_SLUG,
      municipalityName: MUNICIPALITY_NAME,
      asOf,
      fetchedAt: todayJst(),
      sourceName: SOURCE_NAME,
      sourceUrl: INDEX_URL,
      sourceFiles: { vacancy: link.url },
      metrics: ["symbol", "waiting"],
      subtitle: `${targetLabel}入所分の空き状況と申込み人数`,
      notes,
      wards: [] as string[],
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
    console.log(`  ${facilities.length}施設 / ${categories.join("・")}`);
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

main().catch((err) => fail(String(err)));
