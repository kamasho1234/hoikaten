/**
 * 静岡市のこども園等の入園選考後の状況を取り込む
 *
 * 実行: npm run vacancy:fetch:shizuoka
 *
 * ## この自治体の特徴
 * - 数字ではなく記号（◎十分余裕あり／○余裕あり／△残りわずか／－受入枠なし／
 *   ※直接園にお問い合わせください）
 * - 「その月の選考の受入可能数から内定者数を引いた数」なので、翌月以降の
 *   受入可能数とは必ずしも一致しない。その旨を注記に入れる
 * - 表の中で「－」と「-」、「○」と「〇」の字体が混ざっているので、凡例のほうに揃える
 * - 園名の末尾の★は市立、◆は新設園。当サイトでは園名から外し、注記で断る
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "shizuoka";
const MUNICIPALITY_NAME = "静岡市";
const SOURCE_NAME = "静岡市「こども園等の入園選考後の状況」";
const INDEX_URL = "https://www.city.shizuoka.lg.jp/s5783/s002044.html";
const AGE_COUNT = 6;
const UA = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";

const COL_KIND = 0;
const COL_NAME = 1;
const COL_AGE0 = 3;

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const EXTRACTOR = path.join(process.cwd(), "scripts", "shizuoka-pdf-extract.py");

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
  return (s ?? "").replace(/[\s　]/g, "");
}

/** 字体の揺れを揃える */
function shapeOf(mark: string): string {
  if (/^[○◯〇]$/.test(mark)) return "○";
  if (/^[－\-‐‑–—ー]$/.test(mark)) return "－";
  return mark;
}

function stripTags(html: string): string {
  return html.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").replace(/[\s　]+/g, " ").trim();
}

type PdfResult = {
  target: [number, number];
  legend: { mark: string; label: string }[];
  markCounts: Record<string, number>;
  sections: { ward: string; rows: string[][] }[];
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
  console.log(`${MUNICIPALITY_NAME}の入園選考後の状況を取り込みます`);
  console.log(`公式ページ: ${INDEX_URL}\n`);

  const res = await fetch(INDEX_URL, { headers: { "User-Agent": UA } });
  if (!res.ok) fail(`公式ページが ${res.status} を返しました`);
  const html = await res.text();

  // 「認定こども園・保育園等の令和8年9月入園選考後の状況（PDF：326KB）」
  const links = [...html.matchAll(/<a[^>]+href="([^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => ({ url: new URL(m[1], INDEX_URL).toString(), text: toHalfWidth(stripTags(m[2])) }))
    .map((l) => {
      const m = squeeze(l.text).match(/令和(\d+)年(\d+)月入園(?:(一次|二次))?選考後の状況/);
      if (!m) return null;
      const reiwa = Number(m[1]);
      const month = Number(m[2]);
      const round = m[3] === "二次" ? 2 : 1;
      return { ...l, reiwa, month, sortKey: reiwa * 1000 + month * 10 + round };
    })
    .filter((v): v is NonNullable<typeof v> => v !== null);
  if (links.length === 0) fail("入園選考後の状況のPDFが見つかりません。ページの構成が変わった可能性があります。");
  const latest = links.reduce((a, b) => (b.sortKey > a.sortKey ? b : a));
  console.log(`最新: ${latest.text}\n  ${latest.url}`);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "shizuoka-vacancy-"));
  try {
    const r = await fetch(latest.url, { headers: { "User-Agent": UA } });
    if (!r.ok) fail(`PDFの取得に失敗しました（${r.status}）: ${latest.url}`);
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.subarray(0, 4).toString() !== "%PDF") fail(`PDFではありません: ${latest.url}`);

    // 基準日が書かれていないので、PDFが差し替えられた日を時点として使う
    const lastModified = r.headers.get("last-modified");
    if (!lastModified) fail("PDFの更新日時（Last-Modified）が返ってきませんでした");
    const modified = new Date(lastModified);
    if (Number.isNaN(modified.getTime())) fail(`PDFの更新日時を読めません: ${lastModified}`);
    const asOf = new Date(modified.getTime() + 9 * 60 * 60 * 1000).toISOString().slice(0, 10);
    if (asOf > todayJst()) fail(`PDFの更新日（${asOf}）が今日より先になっています`);

    const file = path.join(tmpDir, "shizuoka.pdf");
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
        `PDFの表題（令和${targetReiwa}年${targetMonth}月）がリンクの文言（令和${latest.reiwa}年${latest.month}月）と違います`
      );
    }
    console.log(`更新日: ${asOf} / 対象: ${targetMonth}月入園の選考後`);

    const symbolLegend = pdf.legend.map((l) => ({
      mark: shapeOf(l.mark),
      label: l.label,
      // 「受入枠なし」と「直接園にお問い合わせください」は空きありとは数えない
      open: !/受入枠なし|お問い合わせ/.test(l.label),
    }));
    console.log(`凡例: ${symbolLegend.map((l) => `${l.mark}＝${l.label}`).join(" / ")}`);
    const legendByShape = new Map(symbolLegend.map((l) => [shapeOf(l.mark), l.mark]));

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
    let noClass = 0;
    let cityRun = 0;
    let brandNew = 0;

    for (const section of pdf.sections) {
      const ward = squeeze(section.ward);
      if (!ward) fail("区名が空です");
      if (!wards.includes(ward)) wards.push(ward);
      // 施設の種類は縦結合。ページ（区）をまたいで引き継がない
      let kind = "";

      for (const row of section.rows) {
        const rawName = squeeze(row[COL_NAME]);
        if (!rawName) fail(`${ward}: 園名が空の行があります`);
        if (/★$/.test(rawName)) cityRun += 1;
        if (/◆$/.test(rawName)) brandNew += 1;
        const name = rawName.replace(/[★◆]+$/, "");
        if (!name) fail(`${ward}: 園名が記号だけの行があります: 「${rawName}」`);

        const rawKind = squeeze(row[COL_KIND]);
        if (rawKind) kind = rawKind;
        if (!kind) fail(`${name}: 施設の種類が分かりません`);
        if (!categories.includes(kind)) categories.push(kind);

        const id = `${ward}/${name}`;
        if (seen.has(id)) fail(`同じ区に同じ名前の園があります: ${id}`);
        seen.add(id);

        const symbols: (string | null)[] = [];
        for (let age = 0; age < AGE_COUNT; age++) {
          const raw = squeeze(row[COL_AGE0 + age] ?? "");
          if (raw === "") {
            noClass += 1;
            symbols.push(null);
            continue;
          }
          const mark = legendByShape.get(shapeOf(raw));
          if (!mark) fail(`${name}: 凡例にない記号です: 「${raw}」`);
          marks.set(mark, (marks.get(mark) ?? 0) + 1);
          symbols.push(mark);
        }
        if (symbols.filter((s) => s !== null).length === 0) fail(`${name}: 全てのクラスが空です`);

        facilities.push({
          id,
          name,
          w: wards.indexOf(ward),
          c: categories.indexOf(kind),
          vacancy: new Array(AGE_COUNT).fill(null),
          symbols,
        });
      }
    }

    if (facilities.length < 180) fail(`施設が${facilities.length}件しか取れていません`);
    for (const [mark, count] of marks) {
      const inText = Object.entries(pdf.markCounts)
        .filter(([m]) => shapeOf(m) === shapeOf(mark))
        .reduce((acc, [, v]) => acc + v, 0);
      if (count !== inText) {
        fail(`「${mark}」の数が合いません（PDFの文字 ${inText}個 / 取り込み ${count}個）`);
      }
    }
    console.log("記号の数はPDFの文字と一致しました");

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
      console.log(`公式データの時点が前回と同じ（${asOf}）のため更新はありません。`);
      return;
    }

    const dataset = {
      municipalitySlug: MUNICIPALITY_SLUG,
      municipalityName: MUNICIPALITY_NAME,
      asOf,
      fetchedAt: todayJst(),
      sourceName: SOURCE_NAME,
      sourceUrl: INDEX_URL,
      sourceFiles: { vacancy: latest.url },
      metrics: ["symbol"],
      subtitle: `${targetMonth}月入園の選考後に残った空き枠`,
      notes: [
        "静岡市は空き状況を人数ではなく記号で公表しています。当サイトでも公式の記号のまま載せています。",
        `${targetMonth}月入園選考の受入可能数から内定者数を引いた数をもとにしたものです。内定者の辞退や在園児の退園、保育士の状況により、翌月以降の受入可能数とは必ずしも一致しません。`,
        "時点は公式PDFが差し替えられた日です（静岡市は基準日を公表していません）。",
        "公式の表では市立の園に「★」、新設園に「◆」が付いています。当サイトでは園名から外しています。",
        "年齢はその年度の4月1日時点のものです。設けていないクラスは「—」にしています。",
      ],
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
    console.log(`  ${facilities.length}施設 / ${wards.length}区 / ${categories.length}種類`);
    console.log(`  市立 ${cityRun}件 / 新設 ${brandNew}件`);
    console.log(`  設けていないクラス: ${noClass}`);
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
