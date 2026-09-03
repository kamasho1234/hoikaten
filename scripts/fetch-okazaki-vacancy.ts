/**
 * 岡崎市の保育園・認定こども園の空き状況を取り込む
 *
 * 実行: npm run vacancy:fetch:okazaki
 *
 * ## この自治体の特徴
 * - 空きは人数ではなく記号（〇＝空きあり（4名以上）／△＝空き若干名／×＝空きなし）
 * - 資料は2ページ。1ページ目が空き状況、2ページ目が園名・区分・電話・住所
 * - **どちらにも FURIGANA 列があり、これが施設の一意キーになる**。
 *   1ページ目の受入園の欄は名前が2行にまたがることがあり
 *   （「じぶんみらい保育園／日名南」）、行の帯で切ると隣の施設と混ざる。
 *   FURIGANA は名前が何行でも1施設1行なので、これを行の代表点にする
 * - 空き状況一覧は毎月入れ替わる。申込受付中の月は入園案内のページに、
 *   受付が終わった月は「申込受付が終了した入園月の空き状況一覧」のページに移る。
 *   **両方のページからリンクを集めて、いちばん新しい入園月を選ぶ**
 * - 資料にもページにも「◯月◯日時点」の記載がないので、
 *   時点は **PDFの公開日（Last-Modified）** を使う
 * - 区分は「公立」「私立」「公立こ」「私立こ」「小規模」。
 *   「こ」の意味は資料に説明がなく、園名も「みやこ幼稚園」のように
 *   こども園と限らないので、**公式の表記のまま持つ**（[[feedback_factcheck_absolute]]）
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "okazaki";
const MUNICIPALITY_NAME = "岡崎市";
const PREFECTURE = "愛知県";
const SOURCE_NAME = "岡崎市「保育園・認定こども園 空き状況一覧」";
/** 申込受付中の月の一覧が貼られるページ */
const INDEX_URL =
  "https://www.city.okazaki.lg.jp/kosodate/kosodate/1012221/1012226/1003637.html";
/** 受付が終わった月の一覧が移されるページ */
const ARCHIVE_URL =
  "https://www.city.okazaki.lg.jp/kosodate/kosodate/1012221/1012226/1003640.html";
const AGE_COUNT = 6;
const MIN_FACILITIES = 55;
const UA = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const EXTRACTOR = path.join(process.cwd(), "scripts", "okazaki-pdf-extract.py");

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

/** 「ケ／ヶ」「カ／ヵ」のような1文字の表記ゆれを吸収する */
function normalizeName(s: string): string {
  return squeeze(s).replace(/ヶ/g, "ケ").replace(/ヵ/g, "カ").replace(/ｹ/g, "ケ");
}

function reiwaToYear(reiwa: number): number {
  return reiwa + 2018;
}

/** 年度の並び（4月始まり）で月を比べられるようにする */
function monthOrder(month: number): number {
  return month >= 4 ? month : month + 12;
}

type PdfRow = {
  furigana: string;
  short: string;
  name: string;
  category: string;
  marks: (string | null)[];
};

type PdfResult = {
  target: [number, number] | null;
  legend: { mark: string; label: string }[];
  notes: string[];
  markCounts: Record<string, number>;
  blanks: number;
  nameMismatch: [string, string][];
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

async function getText(url: string): Promise<string> {
  const r = await fetch(url, { headers: { "User-Agent": UA } });
  if (!r.ok) fail(`ページの取得に失敗しました（${r.status}）: ${url}`);
  return await r.text();
}

type Link = { url: string; text: string; key: number; year: number; month: number };

function collectLinks(html: string, base: string): Link[] {
  const out: Link[] = [];
  for (const m of html.matchAll(/<a\s[^>]*href="([^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/gi)) {
    const text = toHalfWidth(squeeze(m[2]));
    // 「令和8年度10月入園空き状況一覧」「令和8年11月1日入園空き状況一覧」の両方に当てる
    const t = /令和(\d+)年度?(\d{1,2})月(?:1日)?入園空き状況/.exec(text);
    if (!t) continue;
    const year = Number(t[1]);
    const month = Number(t[2]);
    out.push({
      url: new URL(m[1], base).toString(),
      text,
      key: year * 100 + monthOrder(month),
      year,
      month,
    });
  }
  return out;
}

async function main(): Promise<void> {
  const links: Link[] = [];
  for (const page of [INDEX_URL, ARCHIVE_URL]) {
    const html = await getText(page);
    links.push(...collectLinks(html, page));
  }
  if (links.length === 0) fail("空き状況一覧のPDFが見つかりません");
  links.sort((a, b) => b.key - a.key);
  const link = links[0];
  console.log(`PDF: ${link.text}\n  ${link.url}`);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "okazaki-vacancy-"));
  try {
    const r = await fetch(link.url, { headers: { "User-Agent": UA } });
    if (!r.ok) fail(`PDFの取得に失敗しました（${r.status}）: ${link.url}`);
    const lastModified = r.headers.get("last-modified");
    if (!lastModified) fail("PDFの公開日（Last-Modified）が分かりません");
    const published = new Date(lastModified);
    if (Number.isNaN(published.getTime())) fail(`公開日を読めません: ${lastModified}`);
    // 日本時間に直してから日付にする
    const asOf = new Date(published.getTime() + 9 * 60 * 60 * 1000).toISOString().slice(0, 10);
    if (asOf > todayJst()) fail(`時点の日付（${asOf}）が今日より先になっています`);

    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.subarray(0, 4).toString() !== "%PDF") fail(`PDFではありません: ${link.url}`);
    const file = path.join(tmpDir, "okazaki.pdf");
    fs.writeFileSync(file, buf);

    let pdf: PdfResult;
    try {
      pdf = JSON.parse(runPython([EXTRACTOR, file])) as PdfResult;
    } catch (err) {
      fail(`抽出結果を読めません: ${String(err)}`);
    }

    // リンクの題とPDFの中の入園月が合っているか
    if (!pdf.target) fail("PDFから入園月を読めません");
    if (pdf.target[0] !== link.year || pdf.target[1] !== link.month) {
      fail(
        `リンクの題（${link.text}）とPDFの中の入園月（令和${pdf.target[0]}年${pdf.target[1]}月）が違います`,
      );
    }
    const targetLabel = `${reiwaToYear(link.year)}年${link.month}月`;
    console.log(`時点: ${asOf}（PDFの公開日） ／ 対象: ${targetLabel}入園`);

    // 凡例
    const symbolLegend = pdf.legend.map((l) => {
      const label = squeeze(l.label);
      return { mark: squeeze(l.mark), label, open: !label.includes("なし") };
    });
    if (symbolLegend.length !== 3) fail(`凡例が${symbolLegend.length}件です（3件のはず）`);
    if (!symbolLegend.some((l) => l.open)) fail("空きありの記号が凡例にありません");
    console.log(`凡例: ${symbolLegend.map((l) => `${l.mark}＝${l.label}`).join(" / ")}`);
    const known = new Set(symbolLegend.map((l) => l.mark));

    // 短縮名と正式名の照合。表記ゆれ（ケ／ヶ）だけは許す
    const unresolved = pdf.nameMismatch.filter(
      ([short, full]) => !normalizeName(full).includes(normalizeName(short)),
    );
    if (unresolved.length > 0) {
      fail(
        `1ページ目の名前が2ページ目の園名と結びつきません: ${unresolved
          .map(([s, f]) => `「${s}」→「${f}」`)
          .join("、")}`,
      );
    }
    if (pdf.nameMismatch.length > 0) {
      console.log(
        `名前の表記ゆれ ${pdf.nameMismatch.length}件を吸収しました（${pdf.nameMismatch
          .map(([s, f]) => `${s}／${f}`)
          .join("、")}）`,
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
    }[] = [];
    const seen = new Set<string>();
    const marks = new Map<string, number>();
    let blanks = 0;
    const allBlank: string[] = [];

    for (const row of pdf.rows) {
      const name = squeeze(row.name);
      if (!name) fail(`施設名が空の行があります（FURIGANA: ${row.furigana}）`);
      if (seen.has(name)) fail(`施設名が重複しています: ${name}`);
      seen.add(name);

      const kind = squeeze(row.category);
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
        const mark = squeeze(raw);
        if (!known.has(mark)) fail(`${name}: ${age}歳児が凡例にない記号です（「${mark}」）`);
        marks.set(mark, (marks.get(mark) ?? 0) + 1);
        symbols.push(mark);
      }
      if (symbols.every((s) => s === null)) allBlank.push(name);

      facilities.push({
        id: row.furigana,
        name,
        w: null,
        c,
        vacancy: new Array(AGE_COUNT).fill(null),
        symbols,
      });
    }

    // 記号が1つも無い園は休園中のはず。それ以外なら読み違えを疑う
    const unexpectedBlank = allBlank.filter((n) => !n.includes("休園"));
    if (unexpectedBlank.length > 0) {
      fail(`記号が1つも無い園があります: ${unexpectedBlank.join("、")}`);
    }
    if (allBlank.length > 0) console.log(`記号なし（休園中）: ${allBlank.join("、")}`);

    if (facilities.length < MIN_FACILITIES) {
      fail(`施設が${facilities.length}件しか取れていません（${MIN_FACILITIES}件以上のはず）`);
    }
    // 検算1: 記号の数がPDFの読み取りと合うか
    for (const [mark, count] of marks) {
      if (count !== pdf.markCounts[mark]) {
        fail(`「${mark}」の数が合いません（PDF ${pdf.markCounts[mark]}個 / 取り込み ${count}個）`);
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
      `${facilities.length}施設 ／ ${[...marks].map(([m, n]) => `${m}${n}`).join("・")}・クラスなし${blanks}`,
    );

    const previous = fs.existsSync(OUT_PATH)
      ? (JSON.parse(fs.readFileSync(OUT_PATH, "utf-8")) as {
          asOf?: string;
          facilities?: unknown[];
        })
      : null;
    if (previous?.facilities && facilities.length < previous.facilities.length * 0.9) {
      fail(
        `施設数が大きく減っています（前回 ${previous.facilities.length}件 → 今回 ${facilities.length}件）`,
      );
    }
    if (previous?.asOf === asOf) {
      console.log(`公式データの時点が前回と同じ（${asOf}）のため更新はありません。`);
      return;
    }

    const notes = [
      `岡崎市は空き状況を人数ではなく記号で公表しています。これは${targetLabel}入園分で、${asOf}に公表されたものです。`,
      `公式の凡例は ${symbolLegend.map((l) => `「${l.mark}」${l.label}`).join("、")} です。`,
      "公式の表で記号が無い年齢は「—」にしています。認定こども園の2号認定のように、その年齢のクラスを設けていない場合です。",
      "区分は公式の一覧の表記のままです。",
      "空き状況一覧は入園月の前々月の5日頃（土曜・日曜・祝日により変更あり）に公表されます。",
      ...pdf.notes.map((n) => squeeze(n)),
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
      subtitle: `${targetLabel}入園分の空き状況`,
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
