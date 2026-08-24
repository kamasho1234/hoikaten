/**
 * 東海市の保育所等の空き状況を取り込む
 *
 * 実行: npm run vacancy:fetch:tokai
 *
 * ## この自治体の特徴
 * - 記号（○＝空きあり、×＝空きなし、－＝保育実施なし）。凡例は本文にある
 * - **区分ごとに見出しの行が繰り返される**（公立保育園／私立保育所／認定こども園／
 *   小規模保育事業）。区分の列は縦書きで1文字ずつ分断されるので、見出しの行から取る
 * - **PDFの中に基準日がない**。リンクの文言（7月21日時点）にあるのでそこから読む
 * - PDFのファイル名に日付が入る（akijoukyou.20260721.pdf）
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "tokai";
const MUNICIPALITY_NAME = "東海市";
const SOURCE_NAME = "東海市「保育所等空き状況」";
const INDEX_URL =
  "https://www.city.tokai.aichi.jp/kosodate/1002180/1010882/1010892/1010899.html";
const AGE_COUNT = 6;
const MIN_FACILITIES = 25;
const UA = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const EXTRACTOR = path.join(process.cwd(), "scripts", "tokai-pdf-extract.py");

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
  if (/^[○◯〇]$/.test(mark)) return "○";
  if (/^[×✕✖]$/.test(mark)) return "×";
  if (/^[－―-]$/.test(mark)) return "－";
  return mark;
}

type PdfResult = {
  target: [number, number] | null;
  legend: { mark: string; label: string }[];
  categories: string[];
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

  // 「令和8年度保育所等空き状況(7月21日時点)」。基準日はここにしかない
  const links = [...html.matchAll(/<a[^>]+href="([^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => ({ url: new URL(m[1], INDEX_URL).toString(), text: toHalfWidth(squeeze(m[2])) }))
    .map((l) => {
      const m = l.text.match(/令和(\d+)年度保育所等空き状況\((\d+)月(\d+)日時点\)/);
      if (!m) return null;
      const [reiwa, month, day] = m.slice(1, 4).map(Number);
      // 年度は4月始まりなので1〜3月は後ろに並べる
      return {
        ...l,
        reiwa,
        month,
        day,
        sortKey: reiwa * 10000 + (month >= 4 ? month : month + 12) * 100 + day,
      };
    })
    .filter((v): v is NonNullable<typeof v> => v !== null);
  if (links.length === 0)
    fail("空き状況のPDFが見つかりません。ページの構成が変わった可能性があります。");
  const latest = links.reduce((a, b) => (b.sortKey > a.sortKey ? b : a));
  console.log(`最新: ${latest.text}\n  ${latest.url}`);

  // 年度と月から西暦を出す（年度は4月始まり）
  const year = 2018 + latest.reiwa + (latest.month >= 4 ? 0 : 1);
  const asOf = `${year}-${String(latest.month).padStart(2, "0")}-${String(latest.day).padStart(2, "0")}`;
  if (asOf > todayJst()) fail(`基準日（${asOf}）が今日より先になっています`);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "tokai-vacancy-"));
  try {
    const r = await fetch(latest.url, { headers: { "User-Agent": UA } });
    if (!r.ok) fail(`PDFの取得に失敗しました（${r.status}）: ${latest.url}`);
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.subarray(0, 4).toString() !== "%PDF") fail(`PDFではありません: ${latest.url}`);
    const file = path.join(tmpDir, "tokai.pdf");
    fs.writeFileSync(file, buf);

    let pdf: PdfResult;
    try {
      pdf = JSON.parse(runPython([EXTRACTOR, file])) as PdfResult;
    } catch (err) {
      fail(`抽出結果を読めません: ${String(err)}`);
    }

    if (!pdf.target) fail("PDFから入所月を読み取れませんでした");
    const [targetReiwa, targetMonth] = pdf.target;
    const targetYear = 2018 + targetReiwa;
    console.log(`基準日: ${asOf}（${targetYear}年${targetMonth}月〜入所分）`);

    const symbolLegend = pdf.legend.map((l) => ({
      mark: shapeOf(l.mark),
      label: l.label,
      open: /あり$/.test(l.label),
    }));
    if (symbolLegend.length < 3) fail(`凡例が${symbolLegend.length}件しか取れていません`);
    if (!symbolLegend.some((l) => l.open)) fail("空きありの記号が凡例にありません");
    console.log(`凡例: ${symbolLegend.map((l) => `${l.mark}＝${l.label}`).join(" / ")}`);
    const legendByShape = new Map(symbolLegend.map((l) => [shapeOf(l.mark), l.mark]));
    // 「保育実施なし」は当サイトでは「—」にする
    const notOfferedMark = symbolLegend.find((l) => /実施なし$/.test(l.label))?.mark ?? null;

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
    const allNotOffered: string[] = [];
    let notOffered = 0;

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
        const raw = shapeOf(squeeze(row.marks[age] ?? ""));
        const mark = legendByShape.get(raw);
        if (!mark) fail(`${name}: ${age}歳児が凡例にない記号です: 「${row.marks[age]}」`);
        marks.set(mark, (marks.get(mark) ?? 0) + 1);
        // 「保育実施なし」はそのクラスがないことなので「—」にする
        if (notOfferedMark !== null && mark === notOfferedMark) {
          notOffered += 1;
          symbols.push(null);
          continue;
        }
        symbols.push(mark);
      }
      // 全てのクラスが「保育実施なし」の施設もある（開園前や休園中とみられる）
      if (symbols.every((s) => s === null)) allNotOffered.push(name);

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

    // 検算1: 記号の数が施設数×クラス数になるか（空らんはない）
    const total = [...marks.values()].reduce((a, b) => a + b, 0);
    if (total !== facilities.length * AGE_COUNT) {
      fail(`記号の数が合いません（${total}個 / 施設${facilities.length}×${AGE_COUNT}クラス）`);
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
    console.log("記号の数はPDFの文字と一致し、施設数×クラス数とも合いました");

    // 「保育実施なし」は凡例から外す（当サイトでは「—」で表すため）
    const shownLegend = symbolLegend.filter((l) => l.mark !== notOfferedMark);

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
      `東海市は空き状況を人数ではなく記号で公表しています。当サイトでも公式の記号のまま載せています。これは${targetYear}年${targetMonth}月からの入所ぶんで、${asOf}時点のものです。`,
      `公式の表で「${notOfferedMark ?? "－"}（保育実施なし）」となっているらんは、当サイトでは「—」にしています。`,
      ...(allNotOffered.length > 0
        ? [
            `すべての年齢が「保育実施なし」になっている施設があります（${allNotOffered.join(
              "、"
            )}）。公式の表のとおりに載せています。`,
          ]
        : []),
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
      subtitle: `${targetYear}年${targetMonth}月からの入所ぶんの空き状況`,
      notes,
      wards: [],
      categories,
      symbolLegend: shownLegend,
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
    console.log(`  保育実施なしのらん: ${notOffered}`);
    if (allNotOffered.length > 0) {
      console.log(`  すべての年齢が保育実施なしの施設: ${allNotOffered.join(" / ")}`);
    }
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
