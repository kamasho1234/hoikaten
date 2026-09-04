/**
 * 延岡市の認可保育所・認定こども園等の受入れ状況を取り込む
 *
 * 実行: npm run vacancy:fetch:nobeoka
 *
 * ## この自治体の特徴
 * - 空きは記号。**凡例がPDFになく、掲載ページの本文に書かれている**ので
 *   ページのHTMLから凡例を読み取る
 *   ○＝5人以上の空き、△＝1〜4人の空き、×＝空きなし、―＝クラス設定なし
 * - **都城市とまったく同じ様式**（宮崎県内で様式をそろえているらしい）。
 *   ただし都城市は「－＝空きなし・×＝受入不可」で、延岡市は「×＝空きなし・―＝クラス設定なし」と
 *   記号の割り当てが逆になっている。**同じ見た目でも意味が違う**ので凡例を必ず読む
 * - 地区（川中・岡富・恒富など10地区）で絞り込める
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "nobeoka";
const MUNICIPALITY_NAME = "延岡市";
const SOURCE_NAME = "延岡市「認可保育所・認定こども園等の受入れ状況一覧」";
const INDEX_URL = "https://www.city.nobeoka.miyazaki.jp/soshiki/30/7394.html";
const AGE_COUNT = 6;
const MIN_FACILITIES = 35;
const UA = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";

/** クラス設定なしの記号。そのクラスがないので「—」にする */
const NOT_OFFERED = "―";

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const EXTRACTOR = path.join(process.cwd(), "scripts", "nobeoka-pdf-extract.py");

function fail(message: string): never {
  console.error(`\n[中断] ${message}`);
  process.exit(1);
}

function todayJst(): string {
  const jst = new Date(Date.now() + 9 * 60 * 60 * 1000);
  return jst.toISOString().slice(0, 10);
}

function stripTags(s: string): string {
  return s.replace(/<[^>]+>/g, " ");
}

function decode(s: string): string {
  return s
    .replace(/&nbsp;/g, " ")
    // 自治体のページは「×」を &times; で書いていることがある。落とすと凡例が読めない
    .replace(/&times;/g, "×")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#x([0-9a-fA-F]+);/g, (_, code) => String.fromCodePoint(parseInt(code, 16)))
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)));
}

function squeeze(s: string): string {
  return decode(stripTags(s ?? "")).replace(/[\s　]/g, "");
}

function toHalfWidth(s: string): string {
  return s.replace(/[０-９]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xfee0));
}

/** 記号の形をそろえる */
function shapeOf(mark: string): string {
  if (/^[○◯〇]$/.test(mark)) return "○";
  if (/^[×✕✖]$/.test(mark)) return "×";
  if (/^[－\-—―]$/.test(mark)) return NOT_OFFERED;
  return mark;
}

function reiwaToYear(reiwa: number): number {
  return reiwa + 2018;
}

type PdfResult = {
  asOf: [number, number, number];
  target: [number, number] | null;
  markCounts: Record<string, number>;
  blanks: number;
  rows: {
    area: string;
    kind: string;
    name: string;
    address: string;
    marks: (string | null)[];
  }[];
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
  console.log(`${MUNICIPALITY_NAME}の受入れ状況を取り込みます`);
  console.log(`公式ページ: ${INDEX_URL}\n`);

  const res = await fetch(INDEX_URL, { headers: { "User-Agent": UA } });
  if (!res.ok) fail(`公式ページが ${res.status} を返しました`);
  const html = await res.text();

  // 凡例はPDFではなくページ本文にある。
  // 区切りが自治体によって違う（都城市は「：」、延岡市は「・・・」）ので両方に対応する
  // 「「○」・・・5人以上の空き 「△」・・・1～4人の空き 「×」・・・空きなし 「―」・・・クラス設定なし」
  const flatHtml = toHalfWidth(squeeze(html));
  const legendPairs = [...flatHtml.matchAll(/「(.)」[：:・]+([^「]{2,20}?)(?=「|注意事項|$)/g)]
    .map((m) => ({ mark: m[1], label: m[2].trim() }))
    .filter((l) => /^[○◯〇△×✕－\-—―空]$/.test(l.mark) || l.mark === "空欄");
  const legendMap = new Map<string, string>();
  for (const item of legendPairs) {
    const mark = shapeOf(item.mark);
    if (!legendMap.has(mark)) legendMap.set(mark, item.label);
  }
  if (legendMap.size < 3) {
    fail(`ページから凡例を${legendMap.size}件しか読み取れませんでした`);
  }
  console.log(
    `凡例（ページ本文から）: ${[...legendMap].map(([m, l]) => `${m}＝${l}`).join(" / ")}`
  );

  const links = [...html.matchAll(/<a[^>]+href="([^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => ({ url: new URL(m[1], INDEX_URL).toString(), text: toHalfWidth(squeeze(m[2])) }))
    // 延岡市のリンク文字列は「入所状況一覧（R8.8.1現在）」
    .filter((l) => l.text.includes("入所状況一覧") || l.text.includes("空き状況一覧"));
  if (links.length !== 1) {
    fail(`入所状況一覧のPDFが${links.length}件あります（1件のはず）`);
  }
  const link = links[0];
  console.log(`PDF: ${link.text}\n  ${link.url}`);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "nobeoka-vacancy-"));
  try {
    const r = await fetch(link.url, { headers: { "User-Agent": UA } });
    if (!r.ok) fail(`PDFの取得に失敗しました（${r.status}）: ${link.url}`);
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.subarray(0, 4).toString() !== "%PDF") fail(`PDFではありません: ${link.url}`);
    const file = path.join(tmpDir, "nobeoka.pdf");
    fs.writeFileSync(file, buf);

    let pdf: PdfResult;
    try {
      pdf = JSON.parse(runPython([EXTRACTOR, file])) as PdfResult;
    } catch (err) {
      fail(`抽出結果を読めません: ${String(err)}`);
    }

    const [reiwa, month, day] = pdf.asOf;
    const asOf = `${reiwaToYear(reiwa)}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    if (!/^\d{4}-\d{2}-\d{2}$/.test(asOf)) fail(`時点の日付を組み立てられません: ${asOf}`);
    if (asOf > todayJst()) fail(`時点の日付（${asOf}）が今日より先になっています`);
    console.log(`時点: ${asOf}`);

    // 「×（受入不可）」は当サイトでは「—」にするので凡例には入れない
    const symbolLegend: { mark: string; label: string; open: boolean }[] = [];
    let notOfferedLabel = "受入不可";
    for (const [mark, label] of legendMap) {
      if (mark === NOT_OFFERED) {
        notOfferedLabel = label;
        continue;
      }
      symbolLegend.push({ mark, label, open: /空き$/.test(label) });
    }
    if (!symbolLegend.some((l) => l.open)) fail("空きありの記号が凡例にありません");

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
    let notOffered = 0;

    for (const row of pdf.rows) {
      const name = squeeze(row.name);
      if (!name) fail("施設名が空の行があります");
      if (seen.has(name)) fail(`施設名が重複しています: ${name}`);
      seen.add(name);

      const area = squeeze(row.area);
      if (!area) fail(`${name}: 地区が空です`);
      let w = wards.indexOf(area);
      if (w < 0) {
        wards.push(area);
        w = wards.length - 1;
      }

      const kind = squeeze(row.kind) || "その他";
      let c = categories.indexOf(kind);
      if (c < 0) {
        categories.push(kind);
        c = categories.length - 1;
      }

      const symbols: (string | null)[] = [];
      for (let age = 0; age < AGE_COUNT; age++) {
        const raw = row.marks[age];
        if (raw === null || raw === "") {
          // 「空欄＝今後掲載予定」
          notOffered += 1;
          symbols.push(null);
          continue;
        }
        const mark = shapeOf(squeeze(raw));
        if (mark === NOT_OFFERED) {
          notOffered += 1;
          symbols.push(null);
          continue;
        }
        if (!legendMap.has(mark)) fail(`${name}: ${age}歳が凡例にない記号です（「${raw}」）`);
        marks.set(mark, (marks.get(mark) ?? 0) + 1);
        symbols.push(mark);
      }
      if (symbols.every((s) => s === null)) fail(`${name}: 全ての年齢が受入不可です`);

      facilities.push({
        id: name,
        name,
        w,
        c,
        vacancy: new Array(AGE_COUNT).fill(null),
        symbols,
      });
    }

    if (facilities.length < MIN_FACILITIES) {
      fail(`施設が${facilities.length}件しか取れていません（${MIN_FACILITIES}件以上のはず）`);
    }

    // 検算1: 記号の数がPDFの印字と合うか
    for (const [mark, count] of marks) {
      const inText = Object.entries(pdf.markCounts)
        .filter(([m]) => shapeOf(m) === mark)
        .reduce((acc, [, v]) => acc + v, 0);
      if (count !== inText) {
        fail(`「${mark}」の数が合いません（PDFの印字 ${inText}個 / 取り込み ${count}個）`);
      }
    }
    // 検算2: 記号と受入不可の合計が施設数×年齢数になるか
    const total = [...marks.values()].reduce((a, b) => a + b, 0);
    if (total + notOffered !== facilities.length * AGE_COUNT) {
      fail(
        `欄の数が合いません（記号${total}＋受入不可${notOffered} / 施設${facilities.length}×${AGE_COUNT}）`
      );
    }
    console.log("記号の数はPDFの印字と一致し、欄の数も施設数×年齢数と合いました");

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
    if (previous?.asOf === asOf && previous?.sourceFiles?.vacancy === link.url) {
      console.log(`公式データの時点が前回と同じ（${asOf}）のため更新はありません。`);
      return;
    }

    const notes = [
      `延岡市は空き状況を人数ではなく記号で公表しています。これは${asOf}時点の受入れ状況です。`,
      `公式の表の「${NOT_OFFERED}」（${notOfferedLabel}）は「—」にしています。そのクラスを設けていないことを表しています。`,
      "記載内容は保育士の配置等の状況により変わることがあります。最新の情報は各施設にお問い合わせください。",
      "この表は目安であり、入所を約束するものではありません。「×」のついた施設でも児童の退所等により空きが出ることがあります。",
    ];

    const dataset = {
      municipalitySlug: MUNICIPALITY_SLUG,
      municipalityName: MUNICIPALITY_NAME,
      asOf,
      fetchedAt: todayJst(),
      sourceName: SOURCE_NAME,
      sourceUrl: INDEX_URL,
      sourceFiles: { vacancy: link.url },
      metrics: ["symbol"],
      subtitle: "認可保育所・認定こども園等の受入れ状況",
      notes,
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
    console.log(`  ${facilities.length}施設 / ${wards.length}地区 / 受入不可 ${notOffered}`);
    console.log(
      `  種類ごとの数: ${categories
        .map((name, i) => `${name} ${facilities.filter((f) => f.c === i).length}`)
        .join(" / ")}`
    );
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

main().catch((err) => fail(String(err)));
