/**
 * 栃木市の保育園等の受入可能数を取り込む
 *
 * 実行: npm run vacancy:fetch:tochigi
 *
 * ## この自治体の特徴
 * - 記号（○＝3名以上受入可、△＝1〜2名受入可）。**空らんは「受入なし」**と凡例に明記
 * - 空らんのままでは当サイトの「—」（クラスなし）と区別が付かないので、
 *   **「✕」（受入なし）に置き換えて表示**し、そのことを注記に書く
 * - 番号は途中で1に戻る（区分ごとの通し番号）が、区分名が表にないので持たない
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// 「栃木県」と区別するため、自治体データ側の slug は tochigi-city になっている
const MUNICIPALITY_SLUG = "tochigi-city";
const MUNICIPALITY_NAME = "栃木市";
const SOURCE_NAME = "栃木市「保育園、認定こども園、小規模保育施設の受け入れ可能状況」";
const INDEX_URL = "https://www.city.tochigi.lg.jp/site/kosodatekyouiku/85506.html";
const AGE_COUNT = 6;
const MIN_FACILITIES = 25;
const UA = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";

/** 公式の表で空らんになっている「受入なし」を、この記号に置き換えて表示する */
const EMPTY_MARK = "✕";

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const EXTRACTOR = path.join(process.cwd(), "scripts", "tochigi-pdf-extract.py");

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
  if (/^[×✕✖]$/.test(mark)) return "✕";
  return mark;
}

type PdfResult = {
  target: [number, number];
  legend: { mark: string; label: string }[];
  emptyLabel: string;
  markCounts: Record<string, number>;
  blanks: number;
  rows: { no: string; name: string; marks: string[] }[];
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
  console.log(`${MUNICIPALITY_NAME}の受入可能数を取り込みます`);
  console.log(`公式ページ: ${INDEX_URL}\n`);

  const res = await fetch(INDEX_URL, { headers: { "User-Agent": UA } });
  if (!res.ok) fail(`公式ページが ${res.status} を返しました`);
  const html = await res.text();

  const links = [...html.matchAll(/<a[^>]+href="([^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => ({ url: new URL(m[1], INDEX_URL).toString(), text: toHalfWidth(squeeze(m[2])) }))
    .map((l) => {
      const m = l.text.match(/令和(\d+)年度(\d+)月入園受入可能数/);
      if (!m) return null;
      const [reiwa, month] = m.slice(1, 3).map(Number);
      // 年度は4月始まりなので1〜3月は後ろに並べる
      return { ...l, reiwa, month, sortKey: reiwa * 100 + (month >= 4 ? month : month + 12) };
    })
    .filter((v): v is NonNullable<typeof v> => v !== null);
  if (links.length === 0)
    fail("受入可能数のPDFが見つかりません。ページの構成が変わった可能性があります。");
  const latest = links.reduce((a, b) => (b.sortKey > a.sortKey ? b : a));
  console.log(`最新: ${latest.text}\n  ${latest.url}`);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "tochigi-vacancy-"));
  try {
    const r = await fetch(latest.url, { headers: { "User-Agent": UA } });
    if (!r.ok) fail(`PDFの取得に失敗しました（${r.status}）: ${latest.url}`);

    // 基準日が書かれていないので、PDFの公開日（サーバーの最終更新日時）を使う
    const lastModified = r.headers.get("last-modified");
    if (!lastModified) fail("PDFの Last-Modified ヘッダがありません。時点を決められません。");
    const modified = new Date(lastModified);
    if (Number.isNaN(modified.getTime())) fail(`Last-Modified を読めません: 「${lastModified}」`);
    const asOf = new Date(modified.getTime() + 9 * 60 * 60 * 1000).toISOString().slice(0, 10);
    if (asOf > todayJst()) fail(`PDFの公開日（${asOf}）が今日より先になっています`);

    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.subarray(0, 4).toString() !== "%PDF") fail(`PDFではありません: ${latest.url}`);
    const file = path.join(tmpDir, "tochigi.pdf");
    fs.writeFileSync(file, buf);

    let pdf: PdfResult;
    try {
      pdf = JSON.parse(runPython([EXTRACTOR, file])) as PdfResult;
    } catch (err) {
      fail(`抽出結果を読めません: ${String(err)}`);
    }

    const [targetReiwa, targetMonth] = pdf.target;
    if (targetReiwa !== latest.reiwa || targetMonth !== latest.month) {
      fail(
        `PDFの入園月（令和${targetReiwa}年度${targetMonth}月）がリンクの文言（令和${latest.reiwa}年度${latest.month}月）と違います`
      );
    }
    const targetYear = 2018 + targetReiwa + (targetMonth >= 4 ? 0 : 1);
    console.log(`PDFの公開日: ${asOf}（${targetYear}年${targetMonth}月入園ぶん）`);

    const symbolLegend = pdf.legend.map((l) => ({
      mark: shapeOf(l.mark),
      label: l.label,
      open: /受入可$/.test(l.label),
    }));
    if (symbolLegend.length < 2) fail(`凡例が${symbolLegend.length}件しか取れていません`);
    if (!symbolLegend.some((l) => l.open)) fail("受入可の記号が凡例にありません");
    symbolLegend.push({ mark: EMPTY_MARK, label: pdf.emptyLabel, open: false });
    console.log(`凡例: ${symbolLegend.map((l) => `${l.mark}＝${l.label}`).join(" / ")}`);
    const legendByShape = new Map(symbolLegend.map((l) => [shapeOf(l.mark), l.mark]));

    const facilities: {
      id: string;
      name: string;
      w: null;
      c: null;
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

      const symbols: (string | null)[] = [];
      for (let age = 0; age < AGE_COUNT; age++) {
        const raw = squeeze(row.marks[age] ?? "");
        // 空らんは公式の凡例どおり「受入なし」。記号に置き換えて表示する
        if (raw === "") {
          blanks += 1;
          marks.set(EMPTY_MARK, (marks.get(EMPTY_MARK) ?? 0) + 1);
          symbols.push(EMPTY_MARK);
          continue;
        }
        const mark = legendByShape.get(shapeOf(raw));
        if (!mark) fail(`${name}: ${age}歳が凡例にない記号です: 「${raw}」`);
        marks.set(mark, (marks.get(mark) ?? 0) + 1);
        symbols.push(mark);
      }

      facilities.push({
        id: name,
        name,
        w: null,
        c: null,
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

    // 検算1: 記号の総数が施設数×クラス数になるか
    const total = [...marks.values()].reduce((a, b) => a + b, 0);
    if (total !== facilities.length * AGE_COUNT) {
      fail(`欄の数が合いません（${total}個 / 施設${facilities.length}×${AGE_COUNT}クラス）`);
    }

    // 検算2: 印字された記号（○△）の数がPDFの文字と合うか
    for (const [mark, count] of marks) {
      if (mark === EMPTY_MARK) continue; // 空らんは文字がないので数えられない
      const inText = Object.entries(pdf.markCounts)
        .filter(([m]) => shapeOf(m) === shapeOf(mark))
        .reduce((acc, [, v]) => acc + v, 0);
      if (count !== inText) {
        fail(`「${mark}」の数が合いません（PDFの文字 ${inText}個 / 取り込み ${count}個）`);
      }
    }
    console.log("記号の数はPDFの文字と一致し、欄の数も施設数×クラス数と合いました");

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
      previous?.sourceFiles?.vacancy === latest.url &&
      JSON.stringify(previous?.facilities ?? null) === JSON.stringify(facilities)
    ) {
      console.log(`PDFの公開日が前回と同じ（${asOf}）のため更新はありません。`);
      return;
    }

    const notes = [
      `栃木市は受け入れの可否を人数ではなく記号で公表しています。これは${targetYear}年${targetMonth}月入園ぶんです。`,
      `公式の表では受け入れがない場合はらんが空になっています（凡例に「空欄：${pdf.emptyLabel}」と書かれています）。当サイトでは「${EMPTY_MARK}」（${pdf.emptyLabel}）として表示しています。`,
      "栃木市はこの表に基準日を書いていないため、公式サイトでPDFが公開された日を時点として表示しています。",
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
      subtitle: `${targetYear}年${targetMonth}月入園ぶんの受入可能数`,
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
