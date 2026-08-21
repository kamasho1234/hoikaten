/**
 * 岐阜市の認可保育施設の空き情報を取り込む
 *
 * 実行: npm run vacancy:fetch:gifu
 *
 * ## この自治体の特徴
 * - **空きは記号**（✖＝空きなし、△＝1名空き、〇＝2名以上空き）だが、
 *   **在籍人数は実数**で出している。記号は記号のまま、在籍は人数として持つ
 * - **施設ごとに小さな表**が左右2列に並ぶ。1つの施設は
 *   「年齢／0歳〜5歳」「在籍人数／…」「空き状況／…」の3行
 * - 地区の見出し（「＜中央地区＞」）が表の先頭の行に入るので、地区ごとの集計も出せる
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "gifu";
const MUNICIPALITY_NAME = "岐阜市";
const SOURCE_NAME = "岐阜市「認可保育施設の空き情報」";
const INDEX_URL = "https://www.city.gifu.lg.jp/kosodate/hoiku/1012359/1012413/1003695.html";
const AGE_COUNT = 6;

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const EXTRACTOR = path.join(process.cwd(), "scripts", "gifu-pdf-extract.py");

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
  if (/^[○◯〇]$/.test(t)) return "〇";
  if (/^[△▲]$/.test(t)) return "△";
  if (/^[×✕✖x]$/i.test(t)) return "✖";
  return t;
}

type PdfResult = { target: number[]; asOf: number[]; legend: string; rows: string[][] };

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
  console.log(`${MUNICIPALITY_NAME}の空き情報を取り込みます`);
  console.log(`公式ページ: ${INDEX_URL}\n`);

  const ua = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";
  const res = await fetch(INDEX_URL, { headers: { "User-Agent": ua } });
  if (!res.ok) fail(`公式ページが ${res.status} を返しました`);
  const html = await res.text();

  // 「令和8年9月入所の空き状況 （PDF 336.3KB）」
  const links = [...html.matchAll(/<a[^>]+href="([^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => ({ url: new URL(m[1], INDEX_URL).toString(), text: toHalfWidth(stripTags(m[2])) }))
    .map((l) => {
      const m = l.text.match(/^令和(\d+)年(\d+)月入所の空き状況/);
      if (!m) return null;
      const fiscalYear = reiwaToYear(Number(m[1]));
      const month = Number(m[2]);
      const year = month <= 3 ? fiscalYear + 1 : fiscalYear;
      return { ...l, year, month, sortKey: year * 100 + month };
    })
    .filter((v): v is NonNullable<typeof v> => v !== null);
  if (links.length === 0) fail("空き状況のPDFが見つかりません。ページの構成が変わった可能性があります。");
  const latest = links.reduce((a, b) => (b.sortKey > a.sortKey ? b : a));
  console.log(`最新: ${latest.text}\n  ${latest.url}`);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "gifu-vacancy-"));
  try {
    const r = await fetch(latest.url, { headers: { "User-Agent": ua } });
    if (!r.ok) fail(`PDFの取得に失敗しました（${r.status}）: ${latest.url}`);
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.subarray(0, 4).toString() !== "%PDF") fail(`PDFではありません: ${latest.url}`);
    const file = path.join(tmpDir, "gifu.pdf");
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
    console.log(`基準日: ${asOf} / 対象: ${latest.year}年${latest.month}月`);

    // 「【空き状況】 ✖ ： 空きなし 、△ ： １名空き 、 〇 ： ２名以上空き」
    const legendFlat = toHalfWidth(squeeze(pdf.legend));
    const legendMatch = legendFlat.match(/[×✕✖x]：(.+?)、[△▲]：(.+?)、[○◯〇]：(.+)$/i);
    if (!legendMatch) fail(`記号の凡例を読み取れませんでした: ${pdf.legend}`);
    const symbolLegend = [
      { mark: "〇", label: legendMatch[3], open: true },
      { mark: "△", label: legendMatch[2], open: true },
      { mark: "✖", label: legendMatch[1], open: false },
    ];
    console.log(`凡例: ${symbolLegend.map((l) => `${l.mark}＝${l.label}`).join(" / ")}`);

    const wards: string[] = [];
    const facilities: {
      id: string;
      name: string;
      w: number;
      c: null;
      vacancy: (number | null)[];
      enrolled: (number | null)[];
      symbols: (string | null)[];
    }[] = [];
    const seenId = new Set<string>();
    const marks = new Map<string, number>();
    let ward = "";

    // 施設は「年齢」「在籍人数」「空き状況」の3行1組。左右2つ並ぶので、
    // 「年齢」が出てくる列ごとに1施設として読む
    for (let i = 0; i < pdf.rows.length; i++) {
      const row = pdf.rows[i];
      const first = squeeze(row[0] ?? "");
      // 「＜中央地区＞」のような地区の見出し
      const wardMatch = first.match(/^＜(.+?)＞$/);
      if (wardMatch) {
        ward = wardMatch[1];
        continue;
      }

      const ageCols = row.flatMap((c, index) => (squeeze(c) === "年齢" ? [index] : []));
      if (ageCols.length === 0) continue;
      const nameRow = pdf.rows[i - 1];
      const enrolledRow = pdf.rows[i + 1];
      const symbolRow = pdf.rows[i + 2];
      if (!nameRow || !enrolledRow || !symbolRow) continue;
      if (squeeze(enrolledRow[ageCols[0]] ?? "") !== "在籍人数") continue;
      if (squeeze(symbolRow[ageCols[0]] ?? "") !== "空き状況") continue;

      for (const start of ageCols) {
        // 施設名は1つ上の行の、同じ位置か少し左
        const name = squeeze(
          nameRow.slice(Math.max(0, start - 1), start + 2).join("")
        );
        if (!name) continue;
        if (!ward) fail(`${name}: 地区が分かりません`);

        const symbols: (string | null)[] = [];
        const enrolled: (number | null)[] = [];
        for (let age = 0; age < AGE_COUNT; age++) {
          const c = start + 1 + age;
          const markRaw = normalizeMark(symbolRow[c] ?? "");
          if (markRaw === "") {
            symbols.push(null);
          } else if (symbolLegend.some((l) => l.mark === markRaw)) {
            marks.set(markRaw, (marks.get(markRaw) ?? 0) + 1);
            symbols.push(markRaw);
          } else {
            fail(`${name}: 凡例にない記号です: 「${symbolRow[c]}」`);
          }
          const enrolledRaw = toHalfWidth(squeeze(enrolledRow[c] ?? ""));
          if (enrolledRaw === "") {
            enrolled.push(null);
          } else if (/^\d+$/.test(enrolledRaw)) {
            enrolled.push(Number(enrolledRaw));
          } else {
            fail(`${name}: 在籍人数として読めません: 「${enrolledRow[c]}」`);
          }
        }

        if (!wards.includes(ward)) wards.push(ward);
        const id = `${ward}-${name}`;
        if (seenId.has(id)) fail(`施設名が重複しています: ${id}`);
        seenId.add(id);
        facilities.push({
          id,
          name,
          w: wards.indexOf(ward),
          c: null,
          vacancy: new Array(AGE_COUNT).fill(null),
          enrolled,
          symbols,
        });
      }
      i += 2;
    }

    if (facilities.length < 60) fail(`施設が${facilities.length}件しか取れていません`);
    for (const item of symbolLegend) {
      if (!marks.has(item.mark)) fail(`凡例にある「${item.mark}」が表に1つも出てきません`);
    }

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
      metrics: ["symbol", "enrolled"],
      subtitle: `${latest.year}年${latest.month}月入所申込の空き状況`,
      notes: [
        "岐阜市は空きを人数ではなく記号で公表しています。当サイトでも公式の記号のまま載せています。在籍人数は公式が出している実数です。",
        "年齢は令和8年4月1日時点の年齢を基準にクラス編成されます。",
        "岐阜大学保育園ほほえみ・わらべ保育所・ぎふっこ保育園は事業所内保育施設のため、地域枠の分だけを載せています（従業員枠は含みません）。",
        "最新の状況は各施設にお尋ねください。",
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
    console.log(`  ${facilities.length}施設 / ${wards.length}地区`);
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
