/**
 * 久留米市の保育所・認定こども園等（保育部分）の受入可能状況を取り込む
 *
 * 実行: npm run vacancy:fetch:kurume
 *
 * ## この自治体の特徴
 * - 表に入る記号は**○（3人以上受入可）と△（1〜2人受入可）だけ**で、
 *   受入なしは空欄になる。空欄を「－」という印として持ち、注記で断る
 * - **対象年齢の列がある**ので、その施設が受け入れていない歳児と切り分けられる
 * - 類型は縦結合。空なら1つ上の行から引き継ぐ
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "kurume";
const MUNICIPALITY_NAME = "久留米市";
const SOURCE_NAME = "久留米市「保育所・認定こども園（保育部分）の受入可能状況」";
const INDEX_URL =
  "https://www.city.kurume.fukuoka.jp/1060manabi/2010kosodate/3090hoikusho/hoikuakijyoukyou.html";
const AGE_COUNT = 6;
const UA = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";

const NONE_MARK = "－";
const NONE_LABEL = "受入なし";

const COL_KIND = 0;
const COL_NAME = 1;
const COL_TARGET_AGE = 3;
const COL_ZERO = 4;

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const EXTRACTOR = path.join(process.cwd(), "scripts", "kurume-pdf-extract.py");

function fail(message: string): never {
  console.error(`\n[中断] ${message}`);
  process.exit(1);
}

function todayJst(): string {
  const jst = new Date(Date.now() + 9 * 60 * 60 * 1000);
  return jst.toISOString().slice(0, 10);
}

function reiwaToYear(reiwa: number): number {
  return 2018 + reiwa;
}

function toHalfWidth(s: string): string {
  return s.replace(/[０-９]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xfee0));
}

function squeeze(s: string): string {
  return (s ?? "").replace(/[\s　]/g, "");
}

function shapeOf(mark: string): string {
  return /^[○◯〇]$/.test(mark) ? "○" : mark;
}

function stripTags(html: string): string {
  return html.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").replace(/[\s　]+/g, " ").trim();
}

/**
 * 対象年齢の欄から [下限, 上限] を返す。
 * 空欄は産後9週から（公式の注記より）なので0歳児から5歳児まで
 */
function targetAges(raw: string): [number, number] | null {
  const t = toHalfWidth(squeeze(raw)).replace(/[～〜~]/g, "~");
  if (t === "") return [0, 5];
  const parts = t.split("~");
  const parseOne = (s: string): number | null => {
    if (/^生後\d+(ヶ月|か月|ヵ月|カ月)$/.test(s)) return 0;
    const m = s.match(/^(\d+)(?:・(\d+))?歳児$/);
    if (m) return Number(m[1]);
    return null;
  };
  const low = parseOne(parts[0]);
  if (low === null) return null;
  // 「1・2歳児」のように中黒でつなぐ書き方は、その範囲まで
  const both = parts[0].match(/^(\d+)・(\d+)歳児$/);
  if (both) return [Number(both[1]), Number(both[2])];
  if (parts.length === 1) {
    // 「5歳児」だけならその歳児のみ、「生後4ヶ月」だけなら5歳児まで
    return /歳児$/.test(parts[0]) ? [low, low] : [low, 5];
  }
  if (parts[1] === "") return [low, 5];
  const high = parseOne(parts[1]);
  if (high === null) return null;
  return [low, high];
}

type PdfResult = {
  target: [number, number];
  asOf: [number, number, number];
  legend: { mark: string; label: string }[];
  markCounts: Record<string, number>;
  rows: string[][];
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
  console.log(`${MUNICIPALITY_NAME}の受入可能状況を取り込みます`);
  console.log(`公式ページ: ${INDEX_URL}\n`);

  const res = await fetch(INDEX_URL, { headers: { "User-Agent": UA } });
  if (!res.ok) fail(`公式ページが ${res.status} を返しました`);
  const html = await res.text();

  // 「令和8年度入所受入可能状況一覧（令和8年8月3日）(268キロバイト)」
  const links = [...html.matchAll(/<a[^>]+href="([^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => ({ url: new URL(m[1], INDEX_URL).toString(), text: toHalfWidth(stripTags(m[2])) }))
    .map((l) => {
      const m = squeeze(l.text).match(/受入可能状況一覧（令和(\d+)年(\d+)月(\d+)日）/);
      if (!m) return null;
      const year = reiwaToYear(Number(m[1]));
      return {
        ...l,
        year,
        month: Number(m[2]),
        day: Number(m[3]),
        sortKey: year * 10000 + Number(m[2]) * 100 + Number(m[3]),
      };
    })
    .filter((v): v is NonNullable<typeof v> => v !== null);
  if (links.length === 0) fail("受入可能状況のPDFが見つかりません。ページの構成が変わった可能性があります。");
  const latest = links.reduce((a, b) => (b.sortKey > a.sortKey ? b : a));
  console.log(`最新: ${latest.text}\n  ${latest.url}`);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "kurume-vacancy-"));
  try {
    const r = await fetch(latest.url, { headers: { "User-Agent": UA } });
    if (!r.ok) fail(`PDFの取得に失敗しました（${r.status}）: ${latest.url}`);
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.subarray(0, 4).toString() !== "%PDF") fail(`PDFではありません: ${latest.url}`);
    const file = path.join(tmpDir, "kurume.pdf");
    fs.writeFileSync(file, buf);

    let pdf: PdfResult;
    try {
      pdf = JSON.parse(runPython([EXTRACTOR, file])) as PdfResult;
    } catch (err) {
      fail(`抽出結果を読めません: ${String(err)}`);
    }

    const [ay, am, ad] = pdf.asOf;
    if (reiwaToYear(ay) !== latest.year || am !== latest.month || ad !== latest.day) {
      fail(
        `PDFの更新日（令和${ay}年${am}月${ad}日）がリンクの文言（${latest.year}年${latest.month}月${latest.day}日）と違います`
      );
    }
    const asOf = `${latest.year}-${String(latest.month).padStart(2, "0")}-${String(latest.day).padStart(2, "0")}`;
    const [, targetMonth] = pdf.target;
    console.log(`更新日: ${asOf} / 対象: ${targetMonth}月入所`);

    const symbolLegend = pdf.legend
      .map((l) => ({ mark: shapeOf(l.mark), label: l.label, open: true }))
      .sort((a, b) => (a.mark === "○" ? -1 : 1));
    symbolLegend.push({ mark: NONE_MARK, label: NONE_LABEL, open: false });
    console.log(`凡例: ${symbolLegend.map((l) => `${l.mark}＝${l.label}`).join(" / ")}`);
    const legendByShape = new Map(
      symbolLegend.filter((l) => l.mark !== NONE_MARK).map((l) => [shapeOf(l.mark), l.mark])
    );

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
    let kind = "";
    let noClass = 0;

    for (const row of pdf.rows) {
      const name = squeeze(row[COL_NAME]);
      if (!name || name === "施設名称") continue;
      const rawKind = squeeze(row[COL_KIND]);
      if (rawKind) kind = rawKind;
      if (!kind) fail(`${name}: 類型が分かりません`);
      if (!categories.includes(kind)) categories.push(kind);

      const ages = targetAges(row[COL_TARGET_AGE]);
      if (!ages) fail(`${name}: 対象年齢を読めません: 「${row[COL_TARGET_AGE]}」`);
      const [low, high] = ages;

      if (seen.has(name)) fail(`施設名が重複しています: ${name}`);
      seen.add(name);

      const symbols: (string | null)[] = [];
      for (let age = 0; age < AGE_COUNT; age++) {
        const rawCell = squeeze(row[COL_ZERO + age] ?? "");
        const inRange = age >= low && age <= high;
        if (rawCell === "") {
          // 対象年齢の中なら「受入なし」、外ならその施設にないクラス
          if (inRange) {
            marks.set(NONE_MARK, (marks.get(NONE_MARK) ?? 0) + 1);
            symbols.push(NONE_MARK);
          } else {
            noClass += 1;
            symbols.push(null);
          }
          continue;
        }
        if (!inRange) {
          fail(`${name}: 対象年齢は${low}歳児から${high}歳児なのに、${age}歳児に「${rawCell}」が入っています`);
        }
        const mark = legendByShape.get(shapeOf(rawCell));
        if (!mark) fail(`${name}: 凡例にない記号です: 「${rawCell}」`);
        marks.set(mark, (marks.get(mark) ?? 0) + 1);
        symbols.push(mark);
      }
      if (symbols.filter((s) => s !== null).length === 0) {
        fail(`${name}: 全てのクラスが空です`);
      }

      facilities.push({
        id: name,
        name,
        w: null,
        c: categories.indexOf(kind),
        vacancy: new Array(AGE_COUNT).fill(null),
        symbols,
      });
    }

    if (facilities.length < 60) fail(`施設が${facilities.length}件しか取れていません`);
    // ○と△の数がPDFの文字と合っているか
    for (const [mark, count] of marks) {
      if (mark === NONE_MARK) continue;
      const inText = Object.entries(pdf.markCounts)
        .filter(([m]) => shapeOf(m) === shapeOf(mark))
        .reduce((acc, [, v]) => acc + v, 0);
      if (count !== inText) {
        fail(`「${mark}」の数が合いません（PDFの文字 ${inText}個 / 取り込み ${count}個）`);
      }
    }
    console.log("記号の数はPDFの文字と一致しました");

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

    const dataset = {
      municipalitySlug: MUNICIPALITY_SLUG,
      municipalityName: MUNICIPALITY_NAME,
      asOf,
      fetchedAt: todayJst(),
      sourceName: SOURCE_NAME,
      sourceUrl: INDEX_URL,
      sourceFiles: { vacancy: latest.url },
      metrics: ["symbol"],
      subtitle: `${targetMonth}月入所の受入可能状況`,
      notes: [
        "久留米市は受入可能状況を人数ではなく記号で公表しています。当サイトでも公式の記号のまま載せています。",
        `公式の表で空欄になっているところは「受入なし」という意味なので、当サイトでは「${NONE_MARK}」で表しています。`,
        "現時点の受入状況であり、入所を保証するものではありません。選考の結果により入所が決まります。",
        "年齢はその年度の4月1日時点のものです。対象年齢の記載のない施設は産後9週（生後2か月）からです。",
        "対象年齢の外の歳児は「—」にしています。",
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
    console.log(`  ${facilities.length}施設 / ${categories.length}類型`);
    console.log(`  対象年齢の外だった歳児: ${noClass}`);
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
