/**
 * 出雲市の保育所入所可能状況を取り込む
 *
 * 実行: npm run vacancy:fetch:izumo
 *
 * ## この自治体の特徴
 * - **記号と入所未決定者の両方**を公表している珍しい自治体
 *   - 入所可能状況 … ◎*＝10名以上、◎＝5〜9名、○＝3〜4名、△＝1〜2名
 *   - 入所未決定者 … 第1希望別の人数
 * - **空きなしを表す記号がない**。空欄になる
 * - 空欄の読み方は入所未決定者の欄で見分ける
 *   - 入所未決定者に数字がある年齢 → クラスがある → 空欄は「空きなし」
 *   - 入所未決定者が空欄の年齢 → そのクラスがない → 「—」
 *
 * ## slug について
 * 自治体データ側（src/lib/data/izumo.ts）の slug が `izumo` なのでそれに合わせている。
 * 和泉市（大阪）は `izumi` で別物
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "izumo";
const MUNICIPALITY_NAME = "出雲市";
const SOURCE_NAME = "出雲市「保育所入所可能状況」";
const INDEX_URL = "https://www.city.izumo.shimane.jp/www/contents/1662431111618/index.html";
const AGE_COUNT = 6;
const MIN_FACILITIES = 40;
const UA = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";

/** 空きなしを表す記号が公式にないので、当サイトではこれを使う */
const NO_VACANCY_MARK = "×";

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const EXTRACTOR = path.join(process.cwd(), "scripts", "izumo-pdf-extract.py");

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
  legend: { mark: string; label: string }[];
  notes: string[];
  printed: { marks: Record<string, number>; numbers: number };
  rows: {
    name: string;
    capacity: string;
    marks: (string | null)[];
    waits: (number | null)[];
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
  console.log(`${MUNICIPALITY_NAME}の入所可能状況を取り込みます`);
  console.log(`公式ページ: ${INDEX_URL}\n`);

  const res = await fetch(INDEX_URL, { headers: { "User-Agent": UA } });
  if (!res.ok) fail(`公式ページが ${res.status} を返しました`);
  const html = await res.text();

  const links = [...html.matchAll(/<a[^>]+href="([^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => ({ url: new URL(m[1], INDEX_URL).toString(), text: toHalfWidth(squeeze(m[2])) }))
    // 外国語版が並ぶので、日本語の「保育所入所可能状況」だけを選ぶ
    .filter((l) => /^保育所入所可能状況/.test(l.text));
  if (links.length !== 1) {
    fail(`保育所入所可能状況のPDFが${links.length}件あります（1件のはず）`);
  }
  const link = links[0];
  console.log(`PDF: ${link.text}\n  ${link.url}`);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "izumo-vacancy-"));
  try {
    const r = await fetch(link.url, { headers: { "User-Agent": UA } });
    if (!r.ok) fail(`PDFの取得に失敗しました（${r.status}）: ${link.url}`);
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.subarray(0, 4).toString() !== "%PDF") fail(`PDFではありません: ${link.url}`);
    const file = path.join(tmpDir, "izumo.pdf");
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
    console.log(`時点: ${asOf} ／ 対象: ${pdf.target}月以降の入所`);

    // 公式の凡例（空きのある記号）に、当サイトで足す「空きなし」を加える
    const symbolLegend = pdf.legend.map((l) => ({
      mark: squeeze(l.mark),
      label: squeeze(l.label),
      open: true,
    }));
    if (symbolLegend.length < 3) fail(`凡例が${symbolLegend.length}件しか取れていません`);
    symbolLegend.push({ mark: NO_VACANCY_MARK, label: "空きなし", open: false });
    console.log(`凡例: ${symbolLegend.map((l) => `${l.mark}＝${l.label}`).join(" / ")}`);
    const known = new Set(pdf.legend.map((l) => squeeze(l.mark)));

    const facilities: {
      id: string;
      name: string;
      w: null;
      c: null;
      vacancy: (number | null)[];
      symbols: (string | null)[];
      waiting: (number | null)[];
    }[] = [];
    const marks = new Map<string, number>();
    const seen = new Set<string>();
    let noVacancy = 0;
    let notOffered = 0;
    let waitingTotal = 0;
    let waitingCells = 0;

    for (const row of pdf.rows) {
      const name = squeeze(row.name);
      if (!name) fail("施設名が空の行があります");
      if (seen.has(name)) fail(`施設名が重複しています: ${name}`);
      seen.add(name);

      const symbols: (string | null)[] = [];
      const waiting: (number | null)[] = [];
      for (let age = 0; age < AGE_COUNT; age++) {
        const wait = row.waits[age];
        const mark = row.marks[age];

        if (typeof wait === "number") {
          waiting.push(wait);
          waitingTotal += wait;
          waitingCells += 1;
        } else {
          waiting.push(null);
        }

        if (mark) {
          const m = squeeze(mark);
          if (!known.has(m)) fail(`${name}: ${age}歳が凡例にない記号です（「${m}」）`);
          marks.set(m, (marks.get(m) ?? 0) + 1);
          symbols.push(m);
          continue;
        }
        // 記号がない。入所未決定者の欄に数字があればクラスはあるので「空きなし」
        if (typeof wait === "number") {
          noVacancy += 1;
          marks.set(NO_VACANCY_MARK, (marks.get(NO_VACANCY_MARK) ?? 0) + 1);
          symbols.push(NO_VACANCY_MARK);
        } else {
          notOffered += 1;
          symbols.push(null);
        }
      }
      if (symbols.every((s) => s === null)) fail(`${name}: 全ての年齢にクラスがありません`);

      facilities.push({
        id: name,
        name,
        w: null,
        c: null,
        vacancy: new Array(AGE_COUNT).fill(null),
        symbols,
        waiting,
      });
    }

    if (facilities.length < MIN_FACILITIES) {
      fail(`施設が${facilities.length}件しか取れていません（${MIN_FACILITIES}件以上のはず）`);
    }

    // 検算1: 記号の数がPDFの印字と合うか（空きなしは印字がないので除く）
    for (const [mark, count] of marks) {
      if (mark === NO_VACANCY_MARK) continue;
      const inText = pdf.printed.marks[mark] ?? 0;
      if (count !== inText) {
        fail(`「${mark}」の数が合いません（PDFの印字 ${inText}個 / 取り込み ${count}個）`);
      }
    }
    // 検算2: 入所未決定者の欄の数がPDFの印字と合うか
    if (waitingCells !== pdf.printed.numbers) {
      fail(
        `入所未決定者の欄の数が合いません（PDFの数字 ${pdf.printed.numbers}個 / 取り込み ${waitingCells}個）`
      );
    }
    // 検算3: 記号＋クラスなしが施設数×年齢数になるか
    const total = [...marks.values()].reduce((a, b) => a + b, 0);
    if (total + notOffered !== facilities.length * AGE_COUNT) {
      fail(
        `欄の数が合いません（記号${total}＋クラスなし${notOffered} / 施設${facilities.length}×${AGE_COUNT}）`
      );
    }
    console.log(
      `記号と入所未決定者の数はPDFの印字と一致し、欄の数も施設数×年齢数と合いました`
    );

    const previous = fs.existsSync(OUT_PATH)
      ? (JSON.parse(fs.readFileSync(OUT_PATH, "utf-8")) as { asOf?: string; facilities?: unknown[] })
      : null;
    if (previous?.facilities && facilities.length < previous.facilities.length * 0.9) {
      fail(
        `施設数が大きく減っています（前回 ${previous.facilities.length}件 → 今回 ${facilities.length}件）`
      );
    }
    if (previous?.asOf === asOf) {
      console.log(`公式データの時点が前回と同じ（${asOf}）のため更新はありません。`);
      return;
    }

    const notes = [
      `出雲市は空きを人数ではなく記号で公表しています。これは${pdf.target}月以降の入所を希望する方向けのもので、${asOf}時点のものです。`,
      "この情報は見込みです。職員体制などの都合により、このとおりに決定できない場合があります。",
      `公式の表には空きなしを表す記号がなく、空欄になっています。当サイトでは、そのクラスがある年齢の空欄を「${NO_VACANCY_MARK}」（空きなし）、クラスがない年齢を「—」にしています。`,
      "入所未決定者は、申込をされて決まっていない人の人数です（転園希望の方も含みます）。第1希望者数の内訳で、第2希望以降は反映されていません。",
      "認定保育所・企業主導型保育施設は市の利用調整の対象外のため、当サイトには載せていません。入所の相談は直接その施設へお問い合わせください。",
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
      subtitle: `${pdf.target}月以降の入所可能状況`,
      notes,
      wards: [],
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
    console.log(`  ${facilities.length}施設`);
    console.log(`  空きあり ${total - noVacancy} / 空きなし ${noVacancy} / クラスなし ${notOffered}`);
    console.log(`  入所未決定者 ${waitingTotal}人`);
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

main().catch((err) => fail(String(err)));
