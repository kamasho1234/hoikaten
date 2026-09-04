/**
 * 市原市の保育所等の空き状況を取り込む
 *
 * 実行: npm run vacancy:fetch:ichihara
 *
 * ## この自治体の特徴
 * - 空きは人数ではなく記号（○＝3人以上、△＝1,2人、×＝空きなし）
 * - **公式ページがAngularのSPA**で、HTMLにはPDFのリンクが入っていない。
 *   ページの中身はAzure Blobに置かれていて、記事ID（articleId）を prefix にした
 *   コンテナの一覧からファイルを列挙できる。そこから「空き状況」を含むPDFのうち
 *   いちばん新しいものを選ぶ。
 * - **PDFに日付が入っていない**（表題は「（令和N年M月入所審査後）」だけ）。
 *   時点はファイルの更新日（Last-Modified）を使い、その旨を注記に書く。
 * - 空らんはその年齢の受け入れがないことを示すが、公式は空らんの意味を書いていない。
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "ichihara";
const MUNICIPALITY_NAME = "市原市";
const SOURCE_NAME = "市原市「保育所(園)等の空き状況等」";
const ARTICLE_ID = "60237a82ece4651c88c18b34";
const INDEX_URL = `https://www.city.ichihara.chiba.jp/article?articleId=${ARTICLE_ID}`;
const BLOB_BASE = "https://prdurbanosichapp1.blob.core.windows.net/common-article";
const LIST_URL = `${BLOB_BASE}?restype=container&comp=list&prefix=${ARTICLE_ID}/&maxresults=500`;
const AGE_COUNT = 6;
const MIN_FACILITIES = 50;
const UA = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const EXTRACTOR = path.join(process.cwd(), "scripts", "ichihara-pdf-extract.py");

function fail(message: string): never {
  console.error(`\n[中断] ${message}`);
  process.exit(1);
}

function todayJst(): string {
  const jst = new Date(Date.now() + 9 * 60 * 60 * 1000);
  return jst.toISOString().slice(0, 10);
}

function squeeze(s: string): string {
  return (s ?? "").replace(/[\s　]/g, "");
}

/** 記号の形をそろえる（○/〇/◯、×/✕ の混在に備える） */
function shapeOf(mark: string): string {
  if (/^[○◯〇]$/.test(mark)) return "○";
  if (/^[×✕✖]$/.test(mark)) return "×";
  return mark;
}

function reiwaToYear(reiwa: number): number {
  return reiwa + 2018;
}

type PdfResult = {
  target: [number, number];
  legend: { mark: string; label: string }[];
  notes: string[];
  markCounts: Record<string, number>;
  blanks: number;
  rows: { kubun: string; name: string; marks: (string | null)[] }[];
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

  const res = await fetch(LIST_URL, { headers: { "User-Agent": UA } });
  if (!res.ok) fail(`ファイルの一覧が ${res.status} を返しました`);
  const xml = await res.text();

  // <Blob><Name>..</Name><Url>..</Url><Properties><Last-Modified>..</Last-Modified>
  const blobs = [...xml.matchAll(/<Blob>([\s\S]*?)<\/Blob>/g)]
    .map((m) => {
      const body = m[1];
      const name = /<Name>([\s\S]*?)<\/Name>/.exec(body)?.[1] ?? "";
      const url = /<Url>([\s\S]*?)<\/Url>/.exec(body)?.[1] ?? "";
      const modified = /<Last-Modified>([\s\S]*?)<\/Last-Modified>/.exec(body)?.[1] ?? "";
      return { name: decodeURIComponent(name), url, modified: new Date(modified) };
    })
    .filter((b) => b.name.endsWith(".pdf") && b.name.includes("空き状況"));
  if (blobs.length === 0) fail("「空き状況」を含むPDFが1つも見つかりません");

  blobs.sort((a, b) => b.modified.getTime() - a.modified.getTime());
  const latest = blobs[0];
  const fileName = latest.name.split("/").pop() ?? latest.name;
  const asOf = new Date(latest.modified.getTime() + 9 * 60 * 60 * 1000).toISOString().slice(0, 10);
  console.log(`PDF: ${fileName}（更新日 ${asOf}）`);

  if (asOf > todayJst()) fail(`ファイルの更新日（${asOf}）が今日より先になっています`);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "ichihara-vacancy-"));
  try {
    const r = await fetch(latest.url, { headers: { "User-Agent": UA } });
    if (!r.ok) fail(`PDFの取得に失敗しました（${r.status}）: ${latest.url}`);
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.subarray(0, 4).toString() !== "%PDF") fail(`PDFではありません: ${latest.url}`);
    const file = path.join(tmpDir, "ichihara.pdf");
    fs.writeFileSync(file, buf);

    let pdf: PdfResult;
    try {
      pdf = JSON.parse(runPython([EXTRACTOR, file])) as PdfResult;
    } catch (err) {
      fail(`抽出結果を読めません: ${String(err)}`);
    }

    const targetLabel = `${reiwaToYear(pdf.target[0])}年${pdf.target[1]}月`;
    console.log(`対象: ${targetLabel}入所審査後`);

    const symbolLegend = pdf.legend.map((l) => ({
      mark: shapeOf(l.mark),
      label: l.label,
      open: /空きあり$/.test(l.label),
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
    let blanks = 0;

    for (const row of pdf.rows) {
      const name = squeeze(row.name);
      if (!name) fail("施設名が空の行があります");
      if (seen.has(name)) fail(`施設名が重複しています: ${name}`);
      seen.add(name);

      const kubun = row.kubun || "その他";
      let c = categories.indexOf(kubun);
      if (c < 0) {
        categories.push(kubun);
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
        const mark = legendByShape.get(shapeOf(squeeze(raw)));
        if (!mark) fail(`${name}: ${age}歳が凡例にない記号です: 「${raw}」`);
        marks.set(mark, (marks.get(mark) ?? 0) + 1);
        symbols.push(mark);
      }
      if (symbols.every((s) => s === null)) fail(`${name}: 全ての年齢が空らんです`);

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
    if (blanks !== pdf.blanks) {
      fail(`空らんの数が合いません（PDF ${pdf.blanks} / 取り込み ${blanks}）`);
    }

    // 検算1: 記号と空らんの合計が施設数×年齢数になるか
    const total = [...marks.values()].reduce((a, b) => a + b, 0);
    if (total + blanks !== facilities.length * AGE_COUNT) {
      fail(
        `欄の数が合いません（記号${total}＋空らん${blanks} / 施設${facilities.length}×${AGE_COUNT}）`
      );
    }

    // 検算2: 記号の数がPDFに印字された文字と合うか
    for (const [mark, count] of marks) {
      const inText = Object.entries(pdf.markCounts)
        .filter(([m]) => shapeOf(m) === shapeOf(mark))
        .reduce((acc, [, v]) => acc + v, 0);
      if (count !== inText) {
        fail(`「${mark}」の数が合いません（PDFの文字 ${inText}個 / 取り込み ${count}個）`);
      }
    }
    console.log("記号の数はPDFの文字と一致し、欄の数も施設数×年齢数と合いました");

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
      `市原市は空き状況を人数ではなく記号で公表しています。これは${targetLabel}入所の審査後のもので、${asOf}に公開されました。`,
      ...pdf.notes.filter((n) => !n.includes("お問い合わせ")),
      "公式の表には日付が入っていないため、公開されたファイルの更新日を時点としています。",
      "公式の表で空らんになっている年齢は「—」にしています。空らんの意味は公表されていませんが、その年齢の受け入れがないことを表していると考えられます。",
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
      subtitle: `${targetLabel}入所の審査後の空き状況`,
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
    console.log(`  ${facilities.length}施設 / 空らん ${blanks}`);
    console.log(
      `  分類ごとの数: ${categories
        .map((name, i) => `${name} ${facilities.filter((f) => f.c === i).length}`)
        .join(" / ")}`
    );
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

main().catch((err) => fail(String(err)));
