/**
 * 綾瀬市の入所見込み状況（認可保育施設）を取り込む
 *
 * 実行: npm run vacancy:fetch:ayase
 *
 * ## この自治体の特徴
 * - 記号は4つ。◎＝5人以上、○＝入所見込みあり、△＝若干名、×＝入所見込みなし
 * - **入所見込みが無いときは「×」と書かれる**ので、空らんは0人ではなく
 *   その年齢のクラスがないことを表す
 * - 公立・私立は空き状況の表になく、認可保育施設一覧のページから取る
 * - 一覧の施設名にはふりがなの括弧が付く（「綾南（りょうなん）保育園」）
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "ayase";
const MUNICIPALITY_NAME = "綾瀬市";
const SOURCE_NAME = "綾瀬市「入所見込み状況(認可保育施設)」";
const INDEX_URL =
  "https://www.city.ayase.kanagawa.jp/kosodate/nenreidesagasu/yochien_hoikuen_shogakkonyugakuzen/3/1/22859.html";
/** 公立・私立が載っている認可保育施設一覧のページ */
const LIST_URL =
  "https://www.city.ayase.kanagawa.jp/kosodate/nenreidesagasu/yochien_hoikuen_shogakkonyugakuzen/3/1/22227.html";
const AGE_COUNT = 6;
const MIN_FACILITIES = 12;
const UA = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const EXTRACTOR = path.join(process.cwd(), "scripts", "ayase-pdf-extract.py");

function fail(message: string): never {
  console.error(`\n[中断] ${message}`);
  process.exit(1);
}

function todayJst(): string {
  const jst = new Date(Date.now() + 9 * 60 * 60 * 1000);
  return jst.toISOString().slice(0, 10);
}

function unescapeHtml(s: string): string {
  return s
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#(\d+);/g, (_, d) => String.fromCharCode(Number(d)))
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCharCode(parseInt(h, 16)))
    .replace(/&amp;/g, "&");
}

function squeeze(s: string): string {
  return unescapeHtml(s ?? "").replace(/[\s　]/g, "");
}

function toHalfWidth(s: string): string {
  return s.replace(/[０-９]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xfee0));
}

function reiwaToYear(reiwa: number): number {
  return reiwa + 2018;
}

/** 一覧の施設名にはふりがなの括弧が付くので落として照合する */
function keyOf(name: string): string {
  return squeeze(name).replace(/[（(][^）)]*[）)]/g, "");
}

type PdfResult = {
  target: [number, number];
  asOf: [number, number, number];
  legend: { mark: string; label: string }[];
  notes: string[];
  markCounts: Record<string, number>;
  marksInText: Record<string, number>;
  blanks: number;
  rows: { name: string; marks: (string | null)[] }[];
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

/** 認可保育施設一覧のページから、施設名ごとの公立・私立を取る */
async function fetchOwners() {
  const res = await fetch(LIST_URL, { headers: { "User-Agent": UA }, redirect: "follow" });
  if (!res.ok) fail(`認可保育施設一覧のページが ${res.status} を返しました`);
  const html = await res.text();
  const owners = new Map<string, string>();
  for (const t of html.matchAll(/<table[\s\S]*?<\/table>/gi)) {
    const rows = [...t[0].matchAll(/<tr[\s\S]*?<\/tr>/gi)].map((r) =>
      [...r[0].matchAll(/<t[dh][\s\S]*?<\/t[dh]>/gi)].map((c) => squeeze(c[0])),
    );
    if (rows.length === 0) continue;
    const head = rows[0];
    const colName = head.indexOf("施設名");
    const colOwner = head.findIndex((h) => h.includes("公立") && h.includes("私立"));
    if (colName < 0 || colOwner < 0) continue;
    for (const values of rows.slice(1)) {
      const name = values[colName];
      const owner = values[colOwner];
      if (!name || !owner) continue;
      owners.set(keyOf(name), owner);
    }
  }
  if (owners.size < MIN_FACILITIES) fail(`認可保育施設一覧が${owners.size}件しかありません`);
  return owners;
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
      const m = /入所見込み状況表[（(]令和(\d+)年(\d+)月(\d+)日時点/.exec(l.text);
      return { ...l, key: m ? Number(m[1]) * 10000 + Number(m[2]) * 100 + Number(m[3]) : 0 };
    })
    .filter((l) => l.key > 0)
    .sort((a, b) => b.key - a.key);
  if (links.length === 0) fail("入所見込み状況表のPDFが見つかりません");
  const link = links[0];
  console.log(`PDF: ${link.text}\n  ${link.url}`);

  const owners = await fetchOwners();

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "ayase-vacancy-"));
  try {
    const r = await fetch(link.url, { headers: { "User-Agent": UA } });
    if (!r.ok) fail(`PDFの取得に失敗しました（${r.status}）: ${link.url}`);
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.subarray(0, 4).toString() !== "%PDF") fail(`PDFではありません: ${link.url}`);
    const file = path.join(tmpDir, "ayase.pdf");
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
    // リンクの題の日付とPDFの中の日付が合っているか
    if (link.key !== reiwa * 10000 + month * 100 + day) {
      fail(`リンクの題（${link.text}）とPDFの中の日付（${asOf}）が違います`);
    }
    const targetLabel = `${reiwaToYear(pdf.target[0])}年度${pdf.target[1]}月`;
    console.log(`時点: ${asOf} ／ 対象: ${targetLabel}入所`);

    const symbolLegend = pdf.legend.map((l) => ({
      mark: squeeze(l.mark),
      label: squeeze(l.label),
      open: !squeeze(l.label).endsWith("なし"),
    }));
    if (symbolLegend.length !== 4) fail(`凡例が${symbolLegend.length}件です（4件のはず）`);
    if (!symbolLegend.some((l) => l.open)) fail("空きありの記号が凡例にありません");
    console.log(`凡例: ${symbolLegend.map((l) => `${l.mark}＝${l.label}`).join(" / ")}`);
    const known = new Set(symbolLegend.map((l) => l.mark));

    const categories: string[] = [];
    const facilities: {
      id: string;
      name: string;
      w: null;
      c: number;
      vacancy: (number | null)[];
      symbols: (string | null)[];
    }[] = [];
    const seen = new Set<string>();
    const marks = new Map<string, number>();
    let notOffered = 0;

    for (const row of pdf.rows) {
      const name = squeeze(row.name);
      if (!name) fail("施設名が空の行があります");
      if (seen.has(name)) fail(`施設名が重複しています: ${name}`);
      seen.add(name);

      // 認可保育施設一覧と照合して公立・私立を決める
      const owner = owners.get(keyOf(name));
      if (!owner) fail(`${name}: 認可保育施設一覧に見つかりません`);
      let c = categories.indexOf(owner);
      if (c < 0) {
        categories.push(owner);
        c = categories.length - 1;
      }

      const symbols: (string | null)[] = [];
      for (let age = 0; age < AGE_COUNT; age++) {
        const raw = row.marks[age];
        if (raw === null) {
          notOffered += 1;
          symbols.push(null);
          continue;
        }
        const mark = squeeze(raw);
        if (!known.has(mark)) fail(`${name}: ${age}歳が凡例にない記号です（「${mark}」）`);
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
    // 検算1: 記号の数が、表の中の文字を数えた数と合うか
    for (const [mark, count] of marks) {
      if (count !== pdf.marksInText[mark]) {
        fail(`「${mark}」の数が合いません（表の文字 ${pdf.marksInText[mark]}個 / 取り込み ${count}個）`);
      }
    }
    // 検算2: 空らんの数がPDFと合うか
    if (notOffered !== pdf.blanks) {
      fail(`空らんの数が合いません（PDF ${pdf.blanks} / 取り込み ${notOffered}）`);
    }
    // 検算3: 欄の数が施設数×年齢数になるか
    const total = [...marks.values()].reduce((a, b) => a + b, 0) + notOffered;
    if (total !== facilities.length * AGE_COUNT) {
      fail(`欄の数が合いません（${total} / 施設${facilities.length}×${AGE_COUNT}）`);
    }
    console.log(
      `${facilities.length}施設 ／ ${[...marks].map(([m, n]) => `${m}${n}`).join("・")}・クラスなし${notOffered}`,
    );

    const previous = fs.existsSync(OUT_PATH)
      ? (JSON.parse(fs.readFileSync(OUT_PATH, "utf-8")) as { asOf?: string; facilities?: unknown[]; sourceFiles?: Record<string, string> })
      : null;
    if (previous?.facilities && facilities.length < previous.facilities.length * 0.9) {
      fail(`施設数が大きく減っています（前回 ${previous.facilities.length}件 → 今回 ${facilities.length}件）`);
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

    const zeroMark = symbolLegend.find((l) => !l.open)?.mark ?? "×";
    const notes = [
      `綾瀬市は空き状況を人数ではなく記号で公表しています。これは${targetLabel}入所分で、${asOf}時点のものです。`,
      `公式の凡例は ${symbolLegend.map((l) => `「${l.mark}」${l.label}`).join("、")} です。`,
      `公式の表で空らんになっている年齢は「—」にしています。入所見込みが無ければ「${zeroMark}」と書かれるので、空らんはその年齢のクラスがないことを表します。`,
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
      metrics: ["symbol"],
      subtitle: `${targetLabel}入所分の入所見込み状況`,
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
