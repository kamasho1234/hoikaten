/**
 * 越谷市の保育施設入所の受入可能状況を取り込む
 *
 * 実行: npm run vacancy:fetch:koshigaya
 *
 * ## この自治体の特徴
 * - **空きを人数ではなく記号で公表している**（○＝3名以上、△＝1〜2名程度、
 *   空欄＝受入れなし、＊＝翌月から募集予定）。記号のまま持って記号のまま見せる
 * - 表面が保育所・認定こども園、裏面が小規模・家庭的保育（2歳児まで）
 * - 区分は縦書きで、表によって1列だったり2列だったりする。
 *   施設名の列より左をつないで区分として扱う
 * - **「※新規受入停止中※」のような但し書き**が記号のかわりに入ることがある。
 *   記号として扱えないので「—」にして、そういう欄があることを注記に出す
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "koshigaya";
const MUNICIPALITY_NAME = "越谷市";
const SOURCE_NAME = "越谷市「保育施設入所の受入可能状況」";
const INDEX_URL =
  "https://www.city.koshigaya.saitama.jp/kurashi_shisei/kosodate/hoikusho/nyusyo.html";
const AGE_COUNT = 6;

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const EXTRACTOR = path.join(process.cwd(), "scripts", "koshigaya-pdf-extract.py");

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

function stripTags(html: string): string {
  return html.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").replace(/[\s　]+/g, " ").trim();
}

function squeeze(s: string): string {
  return (s ?? "").replace(/[\s　]/g, "");
}

function normalizeMark(mark: string): string {
  const t = squeeze(mark);
  if (/^[○◯〇]$/.test(t)) return "○";
  if (/^[△▲]$/.test(t)) return "△";
  if (/^[＊*]$/.test(t)) return "＊";
  return t;
}

type PdfTable = { head: string[]; rows: string[][] };
type PdfResult = { target: number[]; asOf: number[]; legend: string; tables: PdfTable[] };

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
  console.log(`${MUNICIPALITY_NAME}の受入可能状況を取り込みます`);
  console.log(`公式ページ: ${INDEX_URL}\n`);

  const ua = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";
  const res = await fetch(INDEX_URL, { headers: { "User-Agent": ua } });
  if (!res.ok) fail(`公式ページが ${res.status} を返しました`);
  const html = await res.text();

  // 「【10月】保育施設入所の受入可能状況（令和8年8月18日現在）（PDF：234KB）」
  const links = [...html.matchAll(/<a[^>]+href="([^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => ({ url: new URL(m[1], INDEX_URL).toString(), text: toHalfWidth(stripTags(m[2])) }))
    .map((l) => {
      const m = l.text.match(/^【(\d+)月】保育施設入所の受入可能状況（令和(\d+)年(\d+)月(\d+)日現在）/);
      if (!m) return null;
      const month = Number(m[1]);
      const asOfYear = reiwaToYear(Number(m[2]));
      // 対象月は基準日の年度内。1〜3月は翌年になる
      const year = month < Number(m[3]) ? asOfYear + 1 : asOfYear;
      return {
        ...l,
        month,
        year,
        asOf: `${asOfYear}-${String(m[3]).padStart(2, "0")}-${String(m[4]).padStart(2, "0")}`,
        sortKey: year * 100 + month,
      };
    })
    .filter((v): v is NonNullable<typeof v> => v !== null);
  if (links.length === 0) fail("受入可能状況のPDFが見つかりません。ページの構成が変わった可能性があります。");
  const latest = links.reduce((a, b) => (b.sortKey > a.sortKey ? b : a));
  console.log(`最新: ${latest.text}\n  ${latest.url}`);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "koshigaya-vacancy-"));
  try {
    const r = await fetch(latest.url, { headers: { "User-Agent": ua } });
    if (!r.ok) fail(`PDFの取得に失敗しました（${r.status}）: ${latest.url}`);
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.subarray(0, 4).toString() !== "%PDF") fail(`PDFではありません: ${latest.url}`);
    const file = path.join(tmpDir, "koshigaya.pdf");
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
    const [ry, am, ad] = pdf.asOf;
    const asOf = `${reiwaToYear(ry)}-${String(am).padStart(2, "0")}-${String(ad).padStart(2, "0")}`;
    if (asOf !== latest.asOf) {
      fail(`PDFの基準日（${asOf}）がリンクの文言（${latest.asOf}）と違います。`);
    }
    console.log(`基準日: ${asOf} / 対象: ${latest.year}年${latest.month}月入所`);

    // 「・受入可能数 ○=３名以上の受入れ △=１～２名程度の受入れ 空欄=受入れなし 募集なし」
    const legendFlat = toHalfWidth(squeeze(pdf.legend));
    const legendMatch = legendFlat.match(/[○◯〇]=(.+?)[△▲]=(.+?)空欄=(.+)$/);
    if (!legendMatch) fail(`記号の凡例を読み取れませんでした: ${pdf.legend}`);
    const symbolLegend = [
      { mark: "○", label: legendMatch[1], open: true },
      { mark: "△", label: legendMatch[2], open: true },
      { mark: "＊", label: `${latest.month}月から募集予定`, open: true },
    ];
    const blankLabel = legendMatch[3];
    console.log(`凡例: ${symbolLegend.map((l) => `${l.mark}＝${l.label}`).join(" / ")}`);

    const categories: string[] = [];
    const facilities: {
      id: string;
      name: string;
      w: null;
      c: number;
      vacancy: (number | null)[];
      symbols: (string | null)[];
    }[] = [];
    const seenCode = new Set<string>();
    const marks = new Map<string, number>();
    /** 「※新規受入停止中※」のような但し書きが入っていた欄があったか */
    let hasNoteCell = false;

    for (const table of pdf.tables) {
      const head = table.head.map((h) => toHalfWidth(squeeze(h)));
      const nameIdx = head.indexOf("保育施設等の名称");
      const codeIdx = head.indexOf("コード");
      if (nameIdx < 0 || codeIdx < 0) continue;
      const ageIdx = Array.from({ length: AGE_COUNT }, (_, age) => head.indexOf(`${age}歳児`));
      if (ageIdx[0] < 0) continue;
      let category = "";

      for (const row of table.rows) {
        // 施設名より左の列（縦書きの区分）をつなげる。
        // 「保育所」「公立」のように2列に分かれているので、変わったところだけ足していく
        const parts = row
          .slice(0, nameIdx)
          .map((c) => squeeze(c))
          .filter((c) => c && !c.startsWith("＊") && !c.startsWith("※"));
        if (parts.length > 0) {
          // 大分類（保育所・認定こども園）は列が変わっても残るので、覚えている値に足す
          const joined = parts.join("・");
          category = joined === category ? category : joined;
        }

        const name = squeeze(row[nameIdx] ?? "");
        const code = toHalfWidth(squeeze(row[codeIdx] ?? ""));
        if (!name || !/^\d+$/.test(code)) continue;
        if (!category) fail(`${name}: 区分が分かりません`);
        if (seenCode.has(code)) fail(`施設のコードが重複しています: ${code}`);
        seenCode.add(code);

        const symbols = ageIdx.map((c) => {
          if (c < 0) return null;
          const value = normalizeMark(row[c] ?? "");
          // 空欄は受入れなし。クラスがないという意味ではない
          if (value === "") return null;
          if (symbolLegend.some((l) => l.mark === value)) {
            marks.set(value, (marks.get(value) ?? 0) + 1);
            return value;
          }
          // 「※新規受入停止中※」のような但し書き。記号として扱えないので出さない
          hasNoteCell = true;
          return null;
        });

        if (!categories.includes(category)) categories.push(category);
        facilities.push({
          id: `${code}-${name}`,
          name,
          w: null,
          c: categories.indexOf(category),
          vacancy: new Array(AGE_COUNT).fill(null),
          symbols,
        });
      }
    }

    if (facilities.length < 60) fail(`施設が${facilities.length}件しか取れていません`);
    for (const item of symbolLegend) {
      if (!marks.has(item.mark)) {
        console.log(`  [注意] 凡例にある「${item.mark}」は今回の表に出てきませんでした`);
      }
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
      subtitle: `${latest.year}年${latest.month}月入所の受入可能状況`,
      notes: [
        "越谷市は空きを人数ではなく記号で公表しています。当サイトでも公式の記号のまま載せています。",
        `記号のないクラスは${blankLabel}です。ただし在所児の転園などにより受け入れできる場合があります。`,
        ...(hasNoteCell
          ? ["一部のクラスには「新規受入停止中」などの但し書きが入っています。公式の一覧でご確認ください。"]
          : []),
        "小規模保育・家庭的保育は2歳児までの施設です。",
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
    console.log("");
    for (const [i, cat] of categories.entries()) {
      console.log(`  ${cat} ${facilities.filter((f) => f.c === i).length}施設`);
    }
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
