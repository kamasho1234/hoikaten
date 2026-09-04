/**
 * 長野市の認可保育施設の空き状況を取り込む
 *
 * 実行: npm run vacancy:fetch:nagano
 *
 * ## この自治体の特徴
 * - 空きは人数ではなく記号（◎＝3人以上、○＝1人または2人、×＝0人）
 * - 基準日がPDFに書かれていないので、PDFの更新日時（Last-Modified）を時点として使う
 * - 表は「保育園（北部）」「保育園（南部）」「地域型保育事業」「認定こども園」の4つに分かれる。
 *   地域型は備考の「小」「事」で小規模保育事業と事業所内保育事業に分かれる
 * - 1歳児と2歳児をひとつのクラスで見る施設は欄が結合されているので、両方に同じ記号を配る
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "nagano";
const MUNICIPALITY_NAME = "長野市";
const SOURCE_NAME = "長野市「認可保育施設 空き状況」";
const INDEX_URL = "https://www.city.nagano.nagano.jp/n117000/kosodate/p001543.html";
const AGE_COUNT = 6;
const UA = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";

const COL_NAME = 0;
const COL_TARGET_AGE = 4;
const COL_AGE0 = 5;
const COL_NOTE = 11;

/** 備考の記号と施設の種類 */
const NOTE_CATEGORY: Record<string, string> = {
  小: "小規模保育事業",
  事: "事業所内保育事業",
};

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const EXTRACTOR = path.join(process.cwd(), "scripts", "nagano-pdf-extract.py");

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

function shapeOf(mark: string): string {
  if (/^[○◯〇]$/.test(mark)) return "○";
  if (/^[×✕✖]$/.test(mark)) return "×";
  return mark;
}

function stripTags(html: string): string {
  return html.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").replace(/[\s　]+/g, " ").trim();
}

/**
 * 受入年齢の欄から、いちばん下のクラスの歳児を返す。
 * 「満2歳～」は1歳児クラスの途中で2歳になる子のことなので1歳児から
 */
function lowestAge(raw: string): number | null {
  const t = toHalfWidth(squeeze(raw)).replace(/[～〜~]$/, "");
  if (/^\d+(?:か月|ヶ月|ヵ月|週目)$/.test(t)) return 0;
  const full = t.match(/^(\d+)歳(?:\d+(?:か月|ヶ月|ヵ月))?$/);
  if (full) return Number(full[1]);
  const cls = t.match(/^(\d+)歳児$/);
  if (cls) return Number(cls[1]);
  const man = t.match(/^満(\d+)歳$/);
  if (man) return Math.max(0, Number(man[1]) - 1);
  return null;
}

type PdfResult = {
  target: [number, number];
  legend: { mark: string; label: string }[];
  markCounts: Record<string, number>;
  sections: { name: string; rows: { values: string[]; widths: (number | null)[] }[] }[];
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

  // 「保育施設令和8年9月受入予定人数（PDF：248KB）」「保育施設令和8年4月（2次）受入予定人数」
  const links = [...html.matchAll(/<a[^>]+href="([^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => ({ url: new URL(m[1], INDEX_URL).toString(), text: toHalfWidth(stripTags(m[2])) }))
    .map((l) => {
      const m = squeeze(l.text).match(/令和(\d+)年(\d+)月(?:（(\d+)次）)?受入予定人数/);
      if (!m) return null;
      const year = 2018 + Number(m[1]);
      const month = Number(m[2]);
      const round = m[3] ? Number(m[3]) : 1;
      return { ...l, reiwa: Number(m[1]), year, month, sortKey: year * 1000 + month * 10 + round };
    })
    .filter((v): v is NonNullable<typeof v> => v !== null);
  if (links.length === 0) fail("受入予定人数のPDFが見つかりません。ページの構成が変わった可能性があります。");
  const latest = links.reduce((a, b) => (b.sortKey > a.sortKey ? b : a));
  console.log(`最新: ${latest.text}\n  ${latest.url}`);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "nagano-vacancy-"));
  try {
    const r = await fetch(latest.url, { headers: { "User-Agent": UA } });
    if (!r.ok) fail(`PDFの取得に失敗しました（${r.status}）: ${latest.url}`);
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.subarray(0, 4).toString() !== "%PDF") fail(`PDFではありません: ${latest.url}`);

    // 長野市は基準日を書いていないので、PDFが差し替わった日を時点として使う
    const lastModified = r.headers.get("last-modified");
    if (!lastModified) fail("PDFの更新日時（Last-Modified）が返ってきませんでした");
    const modified = new Date(lastModified);
    if (Number.isNaN(modified.getTime())) fail(`PDFの更新日時を読めません: ${lastModified}`);
    const asOf = new Date(modified.getTime() + 9 * 60 * 60 * 1000).toISOString().slice(0, 10);
    if (asOf > todayJst()) fail(`PDFの更新日（${asOf}）が今日より先になっています`);

    const file = path.join(tmpDir, "nagano.pdf");
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
        `PDFの表題（令和${targetReiwa}年${targetMonth}月入所）がリンクの文言（令和${latest.reiwa}年${latest.month}月）と違います`
      );
    }
    console.log(`更新日: ${asOf} / 対象: ${targetMonth}月入所`);

    const symbolLegend = pdf.legend.map((l) => ({
      mark: shapeOf(l.mark),
      label: l.label,
      open: !/^0人$/.test(l.label),
    }));
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
    let merged = 0;
    let noClass = 0;

    for (const section of pdf.sections) {
      // 「保育園（北部）」「保育園（南部）」はどちらも保育園
      const sectionCategory = section.name.replace(/（[^（）]*）$/, "");
      for (const row of section.rows) {
        const name = squeeze(row.values[COL_NAME]);
        if (!name) fail(`${section.name}: 施設名が空の行があります`);
        if (seen.has(name)) fail(`施設名が重複しています: ${name}`);
        seen.add(name);

        const note = squeeze(row.values[COL_NOTE]);
        const category = NOTE_CATEGORY[note] ?? sectionCategory;
        if (!categories.includes(category)) categories.push(category);

        const low = lowestAge(row.values[COL_TARGET_AGE]);
        if (low === null) fail(`${name}: 受入年齢を読めません: 「${row.values[COL_TARGET_AGE]}」`);

        // 標準の欄の幅。1歳児と2歳児が結合された欄はこの倍になる
        const unit = Math.min(...row.widths.filter((w): w is number => w !== null));
        const symbols: (string | null)[] = new Array(AGE_COUNT).fill(null);
        let age = 0;
        for (let i = 0; i < AGE_COUNT; i++) {
          const width = row.widths[i];
          if (width === null) continue; // 結合された欄の右半分。左でまとめて配る
          const span = Math.max(1, Math.round(width / unit));
          if (age + span > AGE_COUNT) fail(`${name}: 欄の幅が合いません`);
          const rawCell = squeeze(row.values[COL_AGE0 + i]);
          if (rawCell === "") {
            noClass += span;
            age += span;
            continue;
          }
          const mark = legendByShape.get(shapeOf(rawCell));
          if (!mark) fail(`${name}: 凡例にない記号です: 「${rawCell}」`);
          if (span > 1) merged += span - 1;
          for (let k = 0; k < span; k++) {
            symbols[age + k] = mark;
            marks.set(mark, (marks.get(mark) ?? 0) + 1);
          }
          age += span;
        }
        if (age !== AGE_COUNT) fail(`${name}: 歳児の欄が${age}個しかありません`);

        const filled = symbols.map((s, i) => (s === null ? -1 : i)).filter((i) => i >= 0);
        if (filled.length === 0) fail(`${name}: 全てのクラスが空です`);
        if (filled[0] < low) {
          fail(`${name}: 受入年齢は${low}歳児からなのに、${filled[0]}歳児に記号が入っています`);
        }

        facilities.push({
          id: name,
          name,
          w: null,
          c: categories.indexOf(category),
          vacancy: new Array(AGE_COUNT).fill(null),
          symbols,
        });
      }
    }

    if (facilities.length < 80) fail(`施設が${facilities.length}件しか取れていません`);
    // 記号の数をPDFの文字と照合する。結合された欄は両方の歳児に配るぶんだけ増える
    for (const [mark, count] of marks) {
      const inText = Object.entries(pdf.markCounts)
        .filter(([m]) => shapeOf(m) === shapeOf(mark))
        .reduce((acc, [, v]) => acc + v, 0);
      if (count < inText || count > inText + merged) {
        fail(`「${mark}」の数が合いません（PDFの文字 ${inText}個 / 取り込み ${count}個）`);
      }
    }
    const total = [...marks.values()].reduce((a, b) => a + b, 0);
    const inTextTotal = Object.values(pdf.markCounts).reduce((a, b) => a + b, 0);
    if (total !== inTextTotal + merged) {
      fail(`記号の総数が合いません（PDFの文字 ${inTextTotal}個 + 結合 ${merged}個 / 取り込み ${total}個）`);
    }
    console.log(`記号の数はPDFの文字と一致しました（結合された欄で配ったぶん ${merged}個を含む）`);

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
      subtitle: `${targetMonth}月入所の空き状況`,
      notes: [
        "長野市は空き状況を人数ではなく記号で公表しています。当サイトでも公式の記号のまま載せています。",
        "時点は公式PDFが差し替えられた日です（長野市は基準日を公表していません）。",
        "空きがあっても入所を確約するものではありません。保育士の配置や在籍児童の退所により変わることがあります。",
        "認定こども園・幼稚園の教育利用（1号認定）の空き状況は載せていません。各施設にお問い合わせください。",
        "年齢はその年度の4月1日時点のものです。受け入れていない歳児は「—」にしています。",
      ],
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
    console.log(`  ${facilities.length}施設 / ${categories.length}種類`);
    console.log(`  受け入れていない歳児: ${noClass}`);
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
