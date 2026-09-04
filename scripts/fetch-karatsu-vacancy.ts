/**
 * 唐津市の教育・保育施設空き状況を取り込む
 *
 * 実行: npm run vacancy:fetch:karatsu
 *
 * ## この自治体の特徴
 * - 記号は ○＝受入可能、×＝受入不可、－＝保育を提供していない
 * - **同じ「空き状況一覧」という名前でPDFが2つ並ぶ**
 *   - 1号認定（教育部門）用 … 3歳・4歳・5歳のみ
 *   - 2号・3号認定（保育部門）用 … 0歳〜5歳
 *   リンクの文字列では区別できないので、**上から順に試して
 *   0歳の見出しがあるほう（保育部門）を使う**
 * - 月ごとに過去分も並ぶ。いちばん上の見出し（最新の日付）の下にあるPDFを見る
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "karatsu";
const MUNICIPALITY_NAME = "唐津市";
const SOURCE_NAME = "唐津市「教育・保育施設空き状況一覧表」";
const INDEX_URL = "https://www.city.karatsu.lg.jp/site/kosodate/1086.html";
const AGE_COUNT = 6;
const MIN_FACILITIES = 40;
const UA = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";

/** 保育を提供していない印。そのクラスがないので「—」にする */
const NOT_OFFERED = "－";

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const EXTRACTOR = path.join(process.cwd(), "scripts", "karatsu-pdf-extract.py");

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
  if (/^[－\-—]$/.test(mark)) return NOT_OFFERED;
  return mark;
}

function reiwaToYear(reiwa: number): number {
  return reiwa + 2018;
}

type PdfResult = {
  asOf: [number, number, number];
  notes: string[];
  markCounts: Record<string, number>;
  rows: {
    area: string;
    name: string;
    kind: string;
    public: boolean;
    capacity: string;
    marks: string[];
  }[];
};

function runPython(args: string[]): { ok: true; out: string } | { ok: false; message: string } {
  const candidates = process.env.PYTHON ? [process.env.PYTHON] : ["python3", "python"];
  let lastError = "";
  for (const bin of candidates) {
    try {
      return { ok: true, out: execFileSync(bin, args, { encoding: "utf-8", maxBuffer: 128 * 1024 * 1024 }) };
    } catch (err) {
      const e = err as { code?: string; stderr?: string; message?: string; status?: number };
      if (e.code === "ENOENT") {
        lastError = `${bin} が見つかりません`;
        continue;
      }
      // 抽出スクリプトが中断した（想定と違うPDF）
      return { ok: false, message: (e.stderr || e.message || "").trim() };
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

  // 見出し（令和N年M月D日現在）と、その下のPDFを順に拾う。
  // いちばん上の見出しが最新
  const chunks = [...html.matchAll(/<h[2-4][^>]*>([\s\S]*?)<\/h[2-4]>|<a[^>]+href="([^"]+\.pdf)"/gi)];
  let latestHeading = "";
  const candidates: string[] = [];
  for (const m of chunks) {
    if (m[1] !== undefined) {
      const text = toHalfWidth(squeeze(m[1]));
      if (/^令和\d+年\d+月\d+日現在$/.test(text)) {
        if (latestHeading) break; // 2つ目の日付の見出しに来たら終わり
        latestHeading = text;
      }
      continue;
    }
    if (latestHeading && m[2]) {
      candidates.push(new URL(m[2], INDEX_URL).toString());
    }
  }
  if (!latestHeading) fail("「令和N年M月D日現在」の見出しが見つかりません");
  if (candidates.length === 0) fail(`${latestHeading}の下にPDFが見つかりません`);
  console.log(`最新の見出し: ${latestHeading}（PDFが${candidates.length}件）`);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "karatsu-vacancy-"));
  try {
    // 0歳の見出しがあるほう（保育部門）を探す
    let pdf: PdfResult | null = null;
    let usedUrl = "";
    const reasons: string[] = [];
    for (const [index, url] of candidates.entries()) {
      const r = await fetch(url, { headers: { "User-Agent": UA } });
      if (!r.ok) {
        reasons.push(`${url} が ${r.status}`);
        continue;
      }
      const buf = Buffer.from(await r.arrayBuffer());
      if (buf.subarray(0, 4).toString() !== "%PDF") {
        reasons.push(`${url} はPDFではありません`);
        continue;
      }
      const file = path.join(tmpDir, `karatsu-${index}.pdf`);
      fs.writeFileSync(file, buf);

      const got = runPython([EXTRACTOR, file]);
      if (!got.ok) {
        reasons.push(`${url}: ${got.message.split("\n").pop()}`);
        continue;
      }
      try {
        pdf = JSON.parse(got.out) as PdfResult;
        usedUrl = url;
        break;
      } catch (err) {
        reasons.push(`${url}: 抽出結果を読めません（${String(err)}）`);
      }
    }
    if (!pdf) {
      fail(`0歳〜5歳のPDF（保育部門）が見つかりません。\n  ${reasons.join("\n  ")}`);
    }
    console.log(`PDF（保育部門）: ${usedUrl}`);

    const [reiwa, month, day] = pdf.asOf;
    const asOf = `${reiwaToYear(reiwa)}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    if (!/^\d{4}-\d{2}-\d{2}$/.test(asOf)) fail(`時点の日付を組み立てられません: ${asOf}`);
    // 唐津市は「令和8年9月1日時点」のように翌月1日の見込みを前の月に出す
    if (asOf > todayJst()) {
      const [y, m] = asOf.split("-").map(Number);
      const today = todayJst();
      const [ty, tm] = today.split("-").map(Number);
      const nextMonth = tm === 12 ? { y: ty + 1, m: 1 } : { y: ty, m: tm + 1 };
      if (!(asOf.endsWith("-01") && y === nextMonth.y && m === nextMonth.m)) {
        fail(`時点の日付（${asOf}）が今日より先で、翌月1日とも違います`);
      }
      console.log(`時点は翌月1日（${asOf}）です。公開はそれより前に行われます`);
    }
    console.log(`時点: ${asOf}`);

    const symbolLegend = [
      { mark: "○", label: "受入可能", open: true },
      { mark: "×", label: "受入不可", open: false },
    ];

    const wards: string[] = [];
    const categories: string[] = [];
    const facilities: {
      id: string;
      name: string;
      w: number;
      c: number;
      vacancy: (number | null)[];
      symbols: (string | null)[];
    }[] = [];
    const marks = new Map<string, number>();
    const seen = new Set<string>();
    let notOffered = 0;

    for (const row of pdf.rows) {
      const name = squeeze(row.name);
      if (!name) fail("施設名が空の行があります");
      if (seen.has(name)) fail(`施設名が重複しています: ${name}`);
      seen.add(name);

      const area = squeeze(row.area);
      if (!area) fail(`${name}: 地区が空です`);
      let w = wards.indexOf(area);
      if (w < 0) {
        wards.push(area);
        w = wards.length - 1;
      }

      // 「保育所（公立）」のように類型と公私をつなぐ
      const kind = squeeze(row.kind) || "その他";
      const category = row.public ? `${kind}（公立）` : kind;
      let c = categories.indexOf(category);
      if (c < 0) {
        categories.push(category);
        c = categories.length - 1;
      }

      const symbols: (string | null)[] = [];
      for (let age = 0; age < AGE_COUNT; age++) {
        const mark = shapeOf(squeeze(row.marks[age] ?? ""));
        if (mark === NOT_OFFERED) {
          notOffered += 1;
          symbols.push(null);
          continue;
        }
        if (!symbolLegend.some((l) => l.mark === mark)) {
          fail(`${name}: ${age}歳が凡例にない記号です（「${row.marks[age]}」）`);
        }
        marks.set(mark, (marks.get(mark) ?? 0) + 1);
        symbols.push(mark);
      }
      if (symbols.every((s) => s === null)) fail(`${name}: 全ての年齢で保育を提供していません`);

      facilities.push({
        id: name,
        name,
        w,
        c,
        vacancy: new Array(AGE_COUNT).fill(null),
        symbols,
      });
    }

    if (facilities.length < MIN_FACILITIES) {
      fail(`施設が${facilities.length}件しか取れていません（${MIN_FACILITIES}件以上のはず）`);
    }

    // 検算1: 記号の数がPDFの印字と合うか
    for (const [mark, count] of marks) {
      const inText = Object.entries(pdf.markCounts)
        .filter(([m]) => shapeOf(m) === mark)
        .reduce((acc, [, v]) => acc + v, 0);
      if (count !== inText) {
        fail(`「${mark}」の数が合いません（PDFの印字 ${inText}個 / 取り込み ${count}個）`);
      }
    }
    // 検算2: 記号と保育なしの合計が施設数×年齢数になるか
    const total = [...marks.values()].reduce((a, b) => a + b, 0);
    if (total + notOffered !== facilities.length * AGE_COUNT) {
      fail(
        `欄の数が合いません（記号${total}＋保育なし${notOffered} / 施設${facilities.length}×${AGE_COUNT}）`
      );
    }
    console.log("記号の数はPDFの印字と一致し、欄の数も施設数×年齢数と合いました");

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
      previous?.sourceFiles?.vacancy === usedUrl &&
      JSON.stringify(previous?.facilities ?? null) === JSON.stringify(facilities)
    ) {
      console.log(`公式データの時点が前回と同じ（${asOf}）のため更新はありません。`);
      return;
    }

    const notes = [
      `唐津市は空き状況を人数ではなく記号で公表しています。これは${asOf}時点のもので、原則として月に一度（7日頃）更新されます。`,
      ...pdf.notes.filter((n) => !n.includes("利用定員は")),
      `公式の表の「${NOT_OFFERED}」（保育を提供していないため申請できない）は「—」にしています。`,
      "この一覧は2号・3号認定（保育を必要とする方）向けのものです。1号認定（教育部門）の空き状況は別に公表されています。",
    ];

    const dataset = {
      municipalitySlug: MUNICIPALITY_SLUG,
      municipalityName: MUNICIPALITY_NAME,
      // 唐津市は利用調整基準を公表しておらず点数の基準を持たないので、ここで都道府県を示す
      prefecture: "佐賀県",
      asOf,
      fetchedAt: todayJst(),
      sourceName: SOURCE_NAME,
      sourceUrl: INDEX_URL,
      sourceFiles: { vacancy: usedUrl },
      metrics: ["symbol"],
      subtitle: "2号・3号認定の空き状況",
      notes,
      wards,
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
    console.log(`  ${facilities.length}施設 / ${wards.length}地区 / 保育なし ${notOffered}`);
    console.log(
      `  類型ごとの数: ${categories
        .map((name, i) => `${name} ${facilities.filter((f) => f.c === i).length}`)
        .join(" / ")}`
    );
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

main().catch((err) => fail(String(err)));
