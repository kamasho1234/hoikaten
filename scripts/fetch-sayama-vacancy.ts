/**
 * 狭山市の入所審査用空き状況を取り込む
 *
 * 実行: npm run vacancy:fetch:sayama
 *
 * ## この自治体の特徴
 * - 記号は 〇＝空きあり、△＝若干名の空きあり。**空白＝空きなし**
 *   （当サイトでは分かりやすさのため「×」に置き換える）
 * - 空白は「空きなし」と「そのクラスがない」の両方に使われているので、
 *   **「対象年齢」の欄から受け入れる年齢を割り出して見分ける**。
 *   「産休明け～」「11か月～」は0〜5歳、「11か月～2歳」は0〜2歳、「3歳～」は3〜5歳
 * - PDFのファイル名が月ごとに変わるので、リンクの題から最新の月を選ぶ
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "sayama";
const MUNICIPALITY_NAME = "狭山市";
const SOURCE_NAME = "狭山市「保育所(園)、認定こども園(保育部分)、地域型保育事業所の空き状況」";
const INDEX_URL =
  "https://www.city.sayama.saitama.jp/kosodate/homeciao/azukeru/hoikusho/hoiku-akir8.html";
const AGE_COUNT = 6;
const MIN_FACILITIES = 35;
const UA = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";

/** 公式の表で空白（空きなし）の欄を、当サイトではこの記号にする */
const NONE_MARK = "×";

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const EXTRACTOR = path.join(process.cwd(), "scripts", "sayama-pdf-extract.py");

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

/** 記号の形をそろえる */
function shapeOf(mark: string): string {
  if (/^[○◯〇]$/.test(mark)) return "○";
  if (/^[×✕✖]$/.test(mark)) return "×";
  return mark;
}

/**
 * 「対象年齢」の書き方から、受け入れる年齢クラスを割り出す。
 * 「産休明け～」「11か月～」「3か月～」→ 0〜5歳
 * 「11か月～2歳」「産休明け～2歳」→ 0〜2歳
 * 「3歳～」→ 3〜5歳
 * 「1歳～」→ 1〜5歳
 */
function agesOf(accept: string): number[] | null {
  const text = toHalfWidth(accept);
  let start: number;
  if (/^(産休明け|\d+か月)/.test(text)) {
    // 「産休明け～」「11か月～」はどちらも0歳児クラスから
    start = 0;
  } else {
    const m = /^(\d+)歳/.exec(text);
    if (!m) return null;
    start = Number(m[1]);
  }
  const toMatch = /～(\d+)歳/.exec(text);
  const end = toMatch ? Number(toMatch[1]) : AGE_COUNT - 1;
  if (Number.isNaN(start) || start > end || end >= AGE_COUNT) return null;
  const ages: number[] = [];
  for (let age = start; age <= end; age++) ages.push(age);
  return ages;
}

type PdfResult = {
  target: number;
  legend: { mark: string; label: string }[];
  notes: string[];
  markCounts: Record<string, number>;
  blanks: number;
  rows: { kind: string; name: string; capacity: string; acceptAge: string; marks: string[] }[];
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

  const updated = /更新日[：:](\d{4})年(\d{1,2})月(\d{1,2})日/.exec(toHalfWidth(squeeze(html)));
  if (!updated) fail("ページから更新日を読み取れませんでした");
  const asOf = `${updated[1]}-${updated[2].padStart(2, "0")}-${updated[3].padStart(2, "0")}`;
  if (asOf > todayJst()) fail(`更新日（${asOf}）が今日より先になっています`);

  // 「2026年10月入所審査用空き状況」のリンクから、いちばん新しい月を選ぶ
  const links = [...html.matchAll(/<a[^>]+href="([^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => ({
      url: new URL(m[1], res.url || INDEX_URL).toString(),
      text: toHalfWidth(squeeze(m[2])),
    }))
    .map((l) => {
      const m = /(\d{4})年(\d{1,2})月入所審査用空き状況/.exec(l.text);
      return { ...l, key: m ? Number(m[1]) * 100 + Number(m[2]) : 0 };
    })
    .filter((l) => l.key > 0)
    .sort((a, b) => b.key - a.key);
  if (links.length === 0) fail("入所審査用空き状況のPDFが見つかりません");
  const link = links[0];
  console.log(`PDF: ${link.text}\n  ${link.url}`);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "sayama-vacancy-"));
  try {
    const r = await fetch(link.url, { headers: { "User-Agent": UA } });
    if (!r.ok) fail(`PDFの取得に失敗しました（${r.status}）: ${link.url}`);
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.subarray(0, 4).toString() !== "%PDF") fail(`PDFではありません: ${link.url}`);
    const file = path.join(tmpDir, "sayama.pdf");
    fs.writeFileSync(file, buf);

    let pdf: PdfResult;
    try {
      pdf = JSON.parse(runPython([EXTRACTOR, file])) as PdfResult;
    } catch (err) {
      fail(`抽出結果を読めません: ${String(err)}`);
    }

    if (link.key % 100 !== pdf.target) {
      fail(`リンクの題（${link.text}）とPDFの中の月（${pdf.target}月）が違います`);
    }
    const targetLabel = `${Math.floor(link.key / 100)}年${pdf.target}月`;
    console.log(`時点: ${asOf}（ページの更新日） ／ 対象: ${targetLabel}入所審査`);

    const symbolLegend = pdf.legend.map((l) => ({
      mark: shapeOf(squeeze(l.mark)),
      label: squeeze(l.label),
      open: true,
    }));
    if (symbolLegend.length !== 2) fail(`凡例が${symbolLegend.length}件です（2件のはず）`);
    symbolLegend.push({ mark: NONE_MARK, label: "空きなし", open: false });
    console.log(`凡例: ${symbolLegend.map((l) => `${l.mark}＝${l.label}`).join(" / ")}`);
    const known = new Map(symbolLegend.map((l) => [shapeOf(l.mark), l.mark]));

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
    let outside = 0;

    for (const row of pdf.rows) {
      const name = squeeze(row.name);
      if (!name) fail("施設名が空の行があります");
      if (seen.has(name)) fail(`施設名が重複しています: ${name}`);
      seen.add(name);

      const kind = squeeze(row.kind);
      if (!kind) fail(`${name}: 区分が空です`);
      let c = categories.indexOf(kind);
      if (c < 0) {
        categories.push(kind);
        c = categories.length - 1;
      }

      const accept = squeeze(row.acceptAge);
      const ages = agesOf(accept);
      if (ages === null) fail(`${name}: 対象年齢を読み取れません（「${accept}」）`);

      const symbols: (string | null)[] = [];
      for (let age = 0; age < AGE_COUNT; age++) {
        const raw = squeeze(row.marks[age] ?? "");
        if (!ages.includes(age)) {
          // 対象年齢の外なので、そのクラスがない
          if (raw !== "") fail(`${name}: 対象年齢（${accept}）の外の${age}歳に「${raw}」があります`);
          outside += 1;
          symbols.push(null);
          continue;
        }
        // 対象年齢の中の空白は「空きなし」
        const mark = raw === "" ? NONE_MARK : known.get(shapeOf(raw));
        if (!mark) fail(`${name}: ${age}歳が凡例にない記号です（「${raw}」）`);
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

    // 検算1: 記号の数がPDFの印字と合うか（×に置き換えたぶんは別に数える）
    for (const [mark, count] of marks) {
      if (mark === NONE_MARK) continue;
      const inText = Object.entries(pdf.markCounts)
        .filter(([m]) => shapeOf(m) === shapeOf(mark))
        .reduce((acc, [, v]) => acc + v, 0);
      if (count !== inText) {
        fail(`「${mark}」の数が合いません（PDFの印字 ${inText}個 / 取り込み ${count}個）`);
      }
    }
    // 検算2: 空白の数（PDF）＝×に置き換えたぶん＋対象年齢の外のぶん
    const none = marks.get(NONE_MARK) ?? 0;
    if (none + outside !== pdf.blanks) {
      fail(`空白の数が合いません（PDF ${pdf.blanks} / 空きなし${none}＋対象年齢の外${outside}）`);
    }
    // 検算3: 記号と「—」の合計が施設数×年齢数になるか
    const total = [...marks.values()].reduce((a, b) => a + b, 0);
    if (total + outside !== facilities.length * AGE_COUNT) {
      fail(`欄の数が合いません（記号${total}＋対象年齢の外${outside} / 施設${facilities.length}×${AGE_COUNT}）`);
    }
    console.log(
      `記号の数はPDFの印字と一致し、空白${pdf.blanks}個を「空きなし${none}」と「クラスなし${outside}」に分けられました`
    );

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
      `狭山市は空き状況を人数ではなく記号で公表しています。これは${targetLabel}入所審査用のもので、公式ページが${asOf}に更新されたものです。`,
      ...pdf.notes,
      `公式の表では、空きがない年齢を空白にしています。当サイトでは分かりやすさのため「${NONE_MARK}」に置き換えて表示しています。`,
      "受け入れる年齢は施設によって違います（産休明けから、11か月から、3歳からなど）。公式の表の「対象年齢」の欄をもとに、受け入れのない年齢は「—」にしています。",
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
      subtitle: `${targetLabel}入所審査用の空き状況`,
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
    console.log(`  ${facilities.length}施設 / ${categories.join("・")}`);
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

main().catch((err) => fail(String(err)));
