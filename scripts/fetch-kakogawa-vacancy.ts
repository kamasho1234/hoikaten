/**
 * 加古川市の認可保育所等の保育対応可能状況を取り込む
 *
 * 実行: npm run vacancy:fetch:kakogawa
 *
 * ## この自治体の特徴
 * - 人数ではなく記号（☆＝調整の余地あり、□＝調整できる場合あり、
 *   ▲＝入所が難しい、／＝受入ができない年齢）
 * - **0〜2歳の施設は3歳児の欄から先が「連携施設：〜」の備考**になっている。
 *   備考が始まったところから先はクラスがないものとして「—」にする
 * - 利用申込可能年齢の列があるので、それより下の歳児も「—」にする
 *   （公式の表にはそこに凡例にない文字が入っていることがある）
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "kakogawa";
const MUNICIPALITY_NAME = "加古川市";
const SOURCE_NAME = "加古川市「認可保育所等の保育対応可能状況（概況）」";
const INDEX_URL =
  "https://www.city.kakogawa.lg.jp/soshikikarasagasu/kodomo/hoikuka/kosodate_kyoiku/1495801635664.html";
const AGE_COUNT = 6;
const UA = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";

const COL_NAME = 1;
const COL_TARGET_AGE = 3;
const COL_AGE0 = 4;
/** 3歳児以降の欄に入る備考の書き出し */
const NOTE_PREFIXES = ["連携施設", "本園"];

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const EXTRACTOR = path.join(process.cwd(), "scripts", "kakogawa-pdf-extract.py");

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

function stripTags(html: string): string {
  return html.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").replace(/[\s　]+/g, " ").trim();
}

/** 「２か月～」「１歳児～」から、いちばん下のクラスの歳児を返す */
function lowestAge(raw: string): number | null {
  const t = toHalfWidth(squeeze(raw)).replace(/[～〜~]$/, "");
  if (/^\d+(か月|ヶ月|ヵ月|カ月)$/.test(t)) return 0;
  const m = t.match(/^(\d+)歳児?$/);
  return m ? Number(m[1]) : null;
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
  console.log(`${MUNICIPALITY_NAME}の保育対応可能状況を取り込みます`);
  console.log(`公式ページ: ${INDEX_URL}\n`);

  const res = await fetch(INDEX_URL, { headers: { "User-Agent": UA } });
  if (!res.ok) fail(`公式ページが ${res.status} を返しました`);
  const html = await res.text();

  // 「令和8年7月27日現在令和8年度9月入所の保育対応可能状況」
  const links = [...html.matchAll(/<a[^>]+href="([^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => ({ url: new URL(m[1], INDEX_URL).toString(), text: toHalfWidth(stripTags(m[2])) }))
    .map((l) => {
      const m = squeeze(l.text).match(/令和(\d+)年(\d+)月(\d+)日現在.*保育対応可能状況/);
      if (!m) return null;
      const year = 2018 + Number(m[1]);
      const month = Number(m[2]);
      const day = Number(m[3]);
      return { ...l, reiwa: Number(m[1]), year, month, day, sortKey: year * 10000 + month * 100 + day };
    })
    .filter((v): v is NonNullable<typeof v> => v !== null);
  if (links.length === 0) fail("保育対応可能状況のPDFが見つかりません。ページの構成が変わった可能性があります。");
  const latest = links.reduce((a, b) => (b.sortKey > a.sortKey ? b : a));
  console.log(`最新: ${latest.text}\n  ${latest.url}`);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "kakogawa-vacancy-"));
  try {
    const r = await fetch(latest.url, { headers: { "User-Agent": UA } });
    if (!r.ok) fail(`PDFの取得に失敗しました（${r.status}）: ${latest.url}`);
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.subarray(0, 4).toString() !== "%PDF") fail(`PDFではありません: ${latest.url}`);
    const file = path.join(tmpDir, "kakogawa.pdf");
    fs.writeFileSync(file, buf);

    let pdf: PdfResult;
    try {
      pdf = JSON.parse(runPython([EXTRACTOR, file])) as PdfResult;
    } catch (err) {
      fail(`抽出結果を読めません: ${String(err)}`);
    }

    const [ay, am, ad] = pdf.asOf;
    if (ay !== latest.reiwa || am !== latest.month || ad !== latest.day) {
      fail(
        `PDFの基準日（令和${ay}年${am}月${ad}日）がリンクの文言（令和${latest.reiwa}年${latest.month}月${latest.day}日）と違います`
      );
    }
    const asOf = `${latest.year}-${String(am).padStart(2, "0")}-${String(ad).padStart(2, "0")}`;
    if (asOf > todayJst()) fail(`基準日（${asOf}）が今日より先になっています`);
    const [, targetMonth] = pdf.target;
    console.log(`基準日: ${asOf} / 対象: ${targetMonth}月入所の申込み`);

    // 「令和8年度8月調整を行った結果、」という前置きは月ごとに変わるので、
    // 記号の意味そのものだけを凡例に残し、いつの調整かは注記に書く
    let adjusted = "";
    const symbolLegend = pdf.legend.map((l) => {
      const prefix = l.label.match(/^令和\d+年度(\d+)月調整を行った結果、/);
      if (prefix) adjusted = prefix[1];
      return {
        mark: l.mark,
        label: l.label.replace(/^令和\d+年度\d+月調整を行った結果、/, ""),
        open: !/入所が難しい/.test(l.label),
      };
    });
    console.log(`凡例: ${symbolLegend.map((l) => `${l.mark}＝${l.label}`).join(" / ")}`);
    const known = new Set(symbolLegend.map((l) => l.mark));

    const facilities: {
      id: string;
      name: string;
      w: null;
      vacancy: (number | null)[];
      symbols: (string | null)[];
    }[] = [];
    const marks = new Map<string, number>();
    const seen = new Set<string>();
    let noClass = 0;
    let outOfRange = 0;

    for (const row of pdf.rows) {
      const name = squeeze(row[COL_NAME]);
      if (!name) fail("施設名が空の行があります");
      if (seen.has(name)) fail(`施設名が重複しています: ${name}`);
      seen.add(name);

      const low = lowestAge(row[COL_TARGET_AGE]);
      if (low === null) fail(`${name}: 利用申込可能年齢を読めません: 「${row[COL_TARGET_AGE]}」`);

      // 備考が始まったところから先は、そのクラスがない
      let limit = AGE_COUNT;
      for (let age = 0; age < AGE_COUNT; age++) {
        const raw = squeeze(row[COL_AGE0 + age] ?? "");
        if (NOTE_PREFIXES.some((prefix) => raw.startsWith(prefix))) {
          limit = age;
          break;
        }
      }

      const symbols: (string | null)[] = [];
      for (let age = 0; age < AGE_COUNT; age++) {
        const raw = squeeze(row[COL_AGE0 + age] ?? "");
        if (age >= limit) {
          noClass += 1;
          symbols.push(null);
          continue;
        }
        if (age < low) {
          // 利用申込可能年齢より下。公式の表には凡例にない文字が入っていることがある
          if (raw !== "" && !known.has(raw)) outOfRange += 1;
          noClass += 1;
          symbols.push(null);
          continue;
        }
        if (raw === "") fail(`${name}: ${age}歳の欄が空です`);
        if (!known.has(raw)) fail(`${name}: 凡例にない記号です: 「${raw}」`);
        marks.set(raw, (marks.get(raw) ?? 0) + 1);
        symbols.push(raw);
      }
      if (symbols.every((s) => s === null)) fail(`${name}: 全てのクラスが対象外です`);

      facilities.push({
        id: name,
        name,
        w: null,
        vacancy: new Array(AGE_COUNT).fill(null),
        symbols,
      });
    }

    if (facilities.length < 50) fail(`施設が${facilities.length}件しか取れていません`);
    for (const [mark, count] of marks) {
      const inText = pdf.markCounts[mark] ?? 0;
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
    if (previous?.asOf === asOf && previous?.sourceFiles?.vacancy === latest.url) {
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
      subtitle: `${targetMonth}月入所の申込みに向けた保育対応可能状況`,
      notes: [
        "加古川市は空き状況を人数ではなく記号で公表しています。当サイトでも公式の記号のまま載せています。",
        adjusted
          ? `${adjusted}月の利用調整を行った結果にもとづくものです。入所申込みの参考のためのもので、入所希望順位や希望する保育所等の変更を求めるものではありません。`
          : "入所申込みの参考のためのもので、入所希望順位や希望する保育所等の変更を求めるものではありません。",
        "年齢はその年度の4月1日時点のものです。受け入れができない歳児や、公式の表で連携施設などの案内になっているところは「—」にしています。",
        "地域型保育事業所は、連携施設の受入枠に制限があるため、翌年度に希望の連携施設へ優先入所できない場合があります。",
      ],
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
    console.log(`  受け入れのない歳児: ${noClass}（うち凡例にない文字が入っていた欄 ${outOfRange}）`);
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
