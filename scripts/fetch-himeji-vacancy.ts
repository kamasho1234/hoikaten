/**
 * 姫路市の保育所・認定こども園の空き状況を取り込む
 *
 * 実行: npm run vacancy:fetch:himeji
 *
 * ## この自治体の特徴
 * - **空きは記号**（○＝3名以上、△＝1〜2名）。空欄の意味は公式に書かれていない
 * - 表に**利用年齢**の列があるので、その施設が設けていないクラスと
 *   「記号が付いていないクラス」を切り分けられる。
 *   利用年齢の外に記号が出ていたら列の取り違えとみなして中断する
 * - 校区が入っているので、地区として持てる
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "himeji";
const MUNICIPALITY_NAME = "姫路市";
const SOURCE_NAME = "姫路市「保育所・認定こども園 入所空き状況一覧」";
const INDEX_URL = "https://www.city.himeji.lg.jp/kurashi/0000012959.html";
const AGE_COUNT = 6;
const UA = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";

/** 公式の表で空欄になっているクラス。記号ではないので当サイトの表記 */
const BLANK_MARK = "－";
const BLANK_LABEL = "空きの記号なし";

/** 表の列。見出しは抽出側で確かめている */
const COL_NAME = 0;
const COL_WARD = 1;
const COL_AGES = 2;
const COL_ZERO = 3;

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const EXTRACTOR = path.join(process.cwd(), "scripts", "himeji-pdf-extract.py");

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

function stripTags(html: string): string {
  return html.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").replace(/[\s　]+/g, " ").trim();
}

/**
 * 「6か月から5歳」「産休明けから5歳」「1歳から5歳」「1歳6か月から5歳」を
 * [下限, 上限]（歳）にする。月齢・週齢だけの書き方は0歳クラスからという意味で、
 * 「1歳6か月」のように歳が付いていればその歳のクラスから
 */
function parseAgeRange(raw: string): [number, number] | null {
  const t = toHalfWidth(squeeze(raw));
  const high = t.match(/から(\d+)歳$/);
  if (!high) return null;
  const months = "(?:か月|ヵ月|ヶ月|カ月|ケ月|週)";
  let low: number;
  const withYear = t.match(new RegExp(`^(?:満)?(\\d+)歳(?:\\d+${months})?から`));
  if (/^産休明け/.test(t)) low = 0;
  else if (withYear) low = Number(withYear[1]);
  else if (new RegExp(`^(?:満)?\\d+${months}から`).test(t)) low = 0;
  else return null;
  const top = Number(high[1]);
  if (low < 0 || top > 5 || low > top) return null;
  return [low, top];
}

type PdfResult = {
  target: [number, number];
  legend: { mark: string; label: string }[];
  rows: string[][];
};

function runPython(args: string[]): string {
  const candidates = process.env.PYTHON ? [process.env.PYTHON] : ["python3", "python"];
  let lastError = "";
  for (const bin of candidates) {
    try {
      return execFileSync(bin, args, { encoding: "utf-8", maxBuffer: 64 * 1024 * 1024 });
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

  // 「令和8年度保育所・認定こども園9月入所空き状況一覧 (pdf、945.93KB)」
  const links = [...html.matchAll(/<a[^>]+href="([^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => ({ url: new URL(m[1], INDEX_URL).toString(), text: toHalfWidth(stripTags(m[2])) }))
    .map((l) => {
      const m = l.text.match(/令和(\d+)年度.*?(\d+)月入所空き状況一覧/);
      if (!m) return null;
      const fiscalYear = reiwaToYear(Number(m[1]));
      const month = Number(m[2]);
      const year = month <= 3 ? fiscalYear + 1 : fiscalYear;
      return { ...l, year, month, sortKey: year * 100 + month };
    })
    .filter((v): v is NonNullable<typeof v> => v !== null);
  if (links.length === 0) fail("空き状況一覧のPDFが見つかりません。ページの構成が変わった可能性があります。");
  const latest = links.reduce((a, b) => (b.sortKey > a.sortKey ? b : a));
  console.log(`最新: ${latest.text}\n  ${latest.url}`);

  // 「令和8年度保育所・認定こども園9月入所の空き状況一覧を掲載しています（8月14日公表）」
  const body = stripTags(html.replace(/<script[\s\S]*?<\/script>/gi, ""));
  const publishedMatch = toHalfWidth(body).match(/（(\d+)月(\d+)日公表）/);
  if (!publishedMatch) fail("公表日をページから読み取れませんでした");
  // 公表は入所月の前月。年をまたぐときは1つ前の年になる
  const pm = Number(publishedMatch[1]);
  const asOfYear = pm > latest.month ? latest.year - 1 : latest.year;
  const asOf = `${asOfYear}-${publishedMatch[1].padStart(2, "0")}-${publishedMatch[2].padStart(2, "0")}`;

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "himeji-vacancy-"));
  try {
    const r = await fetch(latest.url, { headers: { "User-Agent": UA } });
    if (!r.ok) fail(`PDFの取得に失敗しました（${r.status}）: ${latest.url}`);
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.subarray(0, 4).toString() !== "%PDF") fail(`PDFではありません: ${latest.url}`);
    const file = path.join(tmpDir, "himeji.pdf");
    fs.writeFileSync(file, buf);

    let pdf: PdfResult;
    try {
      pdf = JSON.parse(runPython([EXTRACTOR, file])) as PdfResult;
    } catch (err) {
      fail(`抽出結果を読めません: ${String(err)}`);
    }

    const [, tm] = pdf.target;
    if (tm !== latest.month) {
      fail(`PDFの対象月（${tm}月）がリンクの文言（${latest.month}月）と違います。`);
    }
    console.log(`公表日: ${asOf} / 対象: ${latest.year}年${latest.month}月入所`);

    // 凡例は空きの多い順に並べ替えてから使う（「3名以上」が先）
    const symbolLegend = [...pdf.legend]
      .sort((a, b) => (a.mark === "○" || a.mark === "◯" || a.mark === "〇" ? -1 : 1))
      .map((l) => ({ mark: l.mark, label: l.label, open: true }));
    symbolLegend.push({ mark: BLANK_MARK, label: BLANK_LABEL, open: false });
    console.log(`凡例: ${symbolLegend.map((l) => `${l.mark}＝${l.label}`).join(" / ")}`);
    const knownMarks = new Set(pdf.legend.map((l) => l.mark));

    const wards: string[] = [];
    const facilities: {
      id: string;
      name: string;
      w: number;
      c: null;
      vacancy: (number | null)[];
      symbols: (string | null)[];
    }[] = [];
    const marks = new Map<string, number>();
    const seen = new Set<string>();

    for (const row of pdf.rows) {
      const name = squeeze(row[COL_NAME]);
      if (!name) continue;
      const ward = squeeze(row[COL_WARD]);
      if (!ward) fail(`${name}: 校区が空です`);
      const ages = parseAgeRange(row[COL_AGES]);
      if (!ages) fail(`${name}: 利用年齢を読めません: 「${row[COL_AGES]}」`);
      if (seen.has(name)) fail(`施設名が重複しています: ${name}`);
      seen.add(name);

      const [low, high] = ages;
      const symbols: (string | null)[] = [];
      for (let age = 0; age < AGE_COUNT; age++) {
        const raw = squeeze(row[COL_ZERO + age] ?? "");
        const inRange = age >= low && age <= high;
        if (raw === "") {
          const mark = inRange ? BLANK_MARK : null;
          if (mark) marks.set(mark, (marks.get(mark) ?? 0) + 1);
          symbols.push(mark);
          continue;
        }
        if (!inRange) {
          fail(
            `${name}: 利用年齢は${low}歳から${high}歳なのに、${age}歳の欄に「${raw}」が入っています。` +
              `列の取り違えの可能性があります。`
          );
        }
        if (!knownMarks.has(raw)) fail(`${name}: 凡例にない記号です: 「${raw}」`);
        marks.set(raw, (marks.get(raw) ?? 0) + 1);
        symbols.push(raw);
      }

      if (!wards.includes(ward)) wards.push(ward);
      facilities.push({
        id: name,
        name,
        w: wards.indexOf(ward),
        c: null,
        vacancy: new Array(AGE_COUNT).fill(null),
        symbols,
      });
    }

    if (facilities.length < 100) fail(`施設が${facilities.length}件しか取れていません`);
    for (const item of symbolLegend) {
      if (!marks.has(item.mark)) fail(`凡例にある「${item.mark}」が表に1つも出てきません`);
    }
    wards.sort((a, b) => a.localeCompare(b, "ja"));
    for (const f of facilities) {
      f.w = wards.indexOf(squeeze(pdf.rows.find((r) => squeeze(r[COL_NAME]) === f.name)![COL_WARD]));
    }

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
      subtitle: `${latest.year}年${latest.month}月入所の空き状況`,
      notes: [
        "姫路市は空きを人数ではなく記号で公表しています。当サイトでも公式の記号のまま載せています。",
        `${BLANK_MARK}は、公式の表で空欄になっているクラスです。姫路市は空欄の意味を明記していません。`,
        "年齢は令和8年3月31日時点の年齢が基準です。施設ごとの利用年齢に合わせて、受け入れのないクラスは「—」にしています。",
        "保育施設の事情等により空き状況が変わることがあります。利用の可否は利用調整を経て決まります。",
      ],
      wards,
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
    console.log(`  ${facilities.length}施設 / ${wards.length}校区`);
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
