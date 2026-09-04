/**
 * 春日部市の保育施設の空き状況を取り込む
 *
 * 実行: npm run vacancy:fetch:kasukabe
 *
 * ## この自治体の特徴
 * - **空きを人数ではなく記号で公表している**（○＝3名以上、△＝若干名または調整中、×＝受入なし）。
 *   記号から人数は決められないので、記号のまま持って記号のまま見せる
 * - 凡例はPDFではなくページの「表の見方」に書かれているので、そこから読む
 * - **4歳の列が2つに割れている**表がある（公立の「ゆり組」「ばら組」）。
 *   同じ年齢の列はまとめ、いちばん空きの多い記号を採る
 * - 空欄はそのクラスを設けていないこと
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "kasukabe";
const MUNICIPALITY_NAME = "春日部市";
const SOURCE_NAME = "春日部市「保育施設などの空き状況」";
const INDEX_URL =
  "https://www.city.kasukabe.lg.jp/kosodate_kyoiku_bunka/kasukabecosodateoensite/kodomowoazukeru_hoikushisetsu_jidoclubnado/1/11012.html";
const AGE_COUNT = 6;

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const EXTRACTOR = path.join(process.cwd(), "scripts", "kasukabe-pdf-extract.py");

/** 表ごとの施設の種類。ページの説明のとおり、上が公立、下がそれ以外 */
const CATEGORIES = ["公立保育所", "私立保育園・認定こども園・地域型保育施設"];

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
  return html
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/[\s　]+/g, " ")
    .trim();
}

function squeeze(s: string): string {
  return (s ?? "").replace(/[\s　]/g, "");
}

/** 丸や罰の書き方はまちまちなので1つにそろえる */
function normalizeMark(mark: string): string {
  const t = squeeze(mark);
  if (/^[○◯〇]$/.test(t)) return "○";
  if (/^[△▲]$/.test(t)) return "△";
  if (/^[×✕✖x]$/i.test(t)) return "×";
  return t;
}

type PdfTable = { head: string[]; rows: string[][] };
type PdfResult = { asOf: number[]; target: number[]; tables: PdfTable[] };

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

  const ua = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";
  const res = await fetch(INDEX_URL, { headers: { "User-Agent": ua } });
  if (!res.ok) fail(`公式ページが ${res.status} を返しました`);
  const html = await res.text();
  const flat = squeeze(stripTags(html));

  // 「表の見方 受入可能数○＝3名以上の受入が可能 △＝若干名の受入または調整中 ×＝受入なし」
  const legendSource = flat.match(
    /表の見方[^○◯〇]*[○◯〇]＝(.+?)[△▲]＝(.+?)×＝(.+?)(公立|認定こども園|保育施設)/
  );
  if (!legendSource) fail("記号の凡例を読み取れませんでした。ページの説明が変わった可能性があります。");
  const symbolLegend = [
    { mark: "○", label: squeeze(legendSource[1]), open: true },
    { mark: "△", label: squeeze(legendSource[2]), open: true },
    { mark: "×", label: squeeze(legendSource[3]), open: false },
  ];
  console.log(`凡例: ${symbolLegend.map((l) => `${l.mark}＝${l.label}`).join(" / ")}`);

  // 「保育施設などの空き状況 (PDFファイル: 113.6KB)」
  const link = [...html.matchAll(/<a[^>]+href="([^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => ({ url: new URL(m[1], INDEX_URL).toString(), text: stripTags(m[2]) }))
    .find((l) => l.text.startsWith("保育施設などの空き状況"));
  if (!link) fail("空き状況のPDFが見つかりません。ページの構成が変わった可能性があります。");
  console.log(`最新: ${link.text}\n  ${link.url}`);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "kasukabe-vacancy-"));
  try {
    const r = await fetch(link.url, { headers: { "User-Agent": ua } });
    if (!r.ok) fail(`PDFの取得に失敗しました（${r.status}）: ${link.url}`);
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.subarray(0, 4).toString() !== "%PDF") fail(`PDFではありません: ${link.url}`);
    const file = path.join(tmpDir, "kasukabe.pdf");
    fs.writeFileSync(file, buf);

    let pdf: PdfResult;
    try {
      pdf = JSON.parse(runPython([EXTRACTOR, file])) as PdfResult;
    } catch (err) {
      fail(`抽出結果を読めません: ${String(err)}`);
    }

    const [ty, tm] = pdf.target;
    const [ry, am, ad] = pdf.asOf;
    const asOf = `${reiwaToYear(ry)}-${String(am).padStart(2, "0")}-${String(ad).padStart(2, "0")}`;
    console.log(`基準日: ${asOf} / 対象: 令和${ty}年度${tm}月入所の選考後`);

    const facilities: {
      id: string;
      name: string;
      w: null;
      c: number;
      vacancy: (number | null)[];
      symbols: (string | null)[];
    }[] = [];
    const seenId = new Set<string>();
    const marks = new Map<string, number>();
    /** 同じ年齢の列が複数ある表があったか（公立の「ゆり組」「ばら組」） */
    let hasSplitClass = false;

    if (pdf.tables.length !== CATEGORIES.length) {
      fail(`表が${pdf.tables.length}個あります（${CATEGORIES.length}個を想定）`);
    }

    for (const [index, table] of pdf.tables.entries()) {
      const head = table.head.map((h) => toHalfWidth(squeeze(h)));
      // 同じ年齢の列が複数あることがあるので、年齢ごとに列をまとめて持つ
      const ageCols = Array.from({ length: AGE_COUNT }, (_, age) =>
        head.flatMap((h, i) => (h === `${age}歳` ? [i] : []))
      );
      if (ageCols[0].length === 0) fail(`年齢の見出しが見つかりません: ${table.head.join(" / ")}`);
      if (ageCols.some((cols) => cols.length > 1)) hasSplitClass = true;
      const nameIdx = head.findIndex((h) => h.startsWith("保育施設等名称"));
      if (nameIdx < 0) fail(`施設名の列が分かりません: ${table.head.join(" / ")}`);

      for (const row of table.rows) {
        const name = squeeze(row[nameIdx] ?? "");
        if (!name) continue;
        if (name.startsWith("保育施設等名称") || name === "生年月日") continue;

        const symbols = ageCols.map((cols) => {
          // その年齢の列に入っている記号を集め、いちばん空きの多いものを採る
          const found = cols
            .map((c) => normalizeMark(row[c] ?? ""))
            .filter((m) => m !== "");
          for (const mark of found) {
            if (!["○", "△", "×"].includes(mark)) {
              fail(`${name}: 記号として読めません: 「${mark}」`);
            }
          }
          if (found.length === 0) return null;
          const best = symbolLegend.find((l) => found.includes(l.mark))?.mark ?? found[0];
          marks.set(best, (marks.get(best) ?? 0) + 1);
          return best;
        });

        const category = CATEGORIES[index];
        const id = `${category}-${name}`;
        if (seenId.has(id)) fail(`施設名が重複しています: ${id}`);
        seenId.add(id);
        facilities.push({
          id,
          name,
          w: null,
          c: index,
          vacancy: new Array(AGE_COUNT).fill(null),
          symbols,
        });
      }
    }

    if (facilities.length < 40) fail(`施設が${facilities.length}件しか取れていません`);
    for (const item of symbolLegend) {
      if (!marks.has(item.mark)) fail(`凡例にある「${item.mark}」が表に1つも出てきません`);
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
    if (
      previous?.asOf === asOf &&
      previous?.sourceFiles?.vacancy === link.url &&
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
      sourceFiles: { vacancy: link.url },
      metrics: ["symbol"],
      subtitle: `${reiwaToYear(ty)}年度${tm}月入所の選考後の空き状況`,
      notes: [
        "春日部市は空きを人数ではなく記号で公表しています。当サイトでも公式の記号のまま載せています。",
        "各施設の保育士配置や入退所の状況により、受け入れ可能数は変わることがあります。",
        ...(hasSplitClass
          ? ["公立保育所には4歳児クラスが2つに分かれている園があります。その場合はどちらか空きの多いほうの記号を載せています。"]
          : []),
        "0歳児は園によって受け入れ可能な月齢が異なります。",
        "認定こども園の教育部分は施設に直接お申し込みください。",
      ],
      wards: [],
      categories: CATEGORIES,
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
    for (const [i, cat] of CATEGORIES.entries()) {
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
