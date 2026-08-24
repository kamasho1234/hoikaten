/**
 * 稲沢市の認可保育園等の空き状況を取り込む
 *
 * 実行: npm run vacancy:fetch:inazawa
 *
 * ## この自治体の特徴
 * - 記号（×＝空き0人、△＝空き1人〜3人、〇＝空き4人以上）
 * - **受入予定数は5歳から0歳の逆順**なので、読むときにひっくり返す
 * - 種類ごとに表が4つに分かれ、種類名（【公立保育園】など）は表のすぐ上にあるだけ
 * - 施設ごとに2行あり、2行目は電話番号と1号認定（幼稚園部分）の行。
 *   当サイトが載せるのは保育認定のぶんなので2行目は取り込まない
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "inazawa";
const MUNICIPALITY_NAME = "稲沢市";
const SOURCE_NAME = "稲沢市「認可保育園等の空き状況」";
const INDEX_URL = "https://www.city.inazawa.aichi.jp/kosodate/0000004010.html";
const AGE_COUNT = 6;
const UA = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";

const COL_NAME = 0;
const COL_AGE0 = 3;

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const EXTRACTOR = path.join(process.cwd(), "scripts", "inazawa-pdf-extract.py");

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

function shapeOf(mark: string): string {
  if (/^[○◯〇]$/.test(mark)) return "〇";
  if (/^[×✕✖]$/.test(mark)) return "×";
  return mark;
}

type PdfResult = {
  asOf: [number, number, number];
  legend: { mark: string; label: string }[];
  markCounts: Record<string, number>;
  tables: { caption: string; rows: string[][] }[];
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

  // リンクの文言は「令和8年8月1日現在」だけ。過去の月のぶんも並んでいる
  const links = [...html.matchAll(/<a[^>]+href="([^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => ({ url: new URL(m[1], INDEX_URL).toString(), text: toHalfWidth(squeeze(m[2])) }))
    .map((l) => {
      const m = l.text.match(/^令和(\d+)年(\d+)月(\d+)日現在$/);
      if (!m) return null;
      const [reiwa, month, day] = m.slice(1, 4).map(Number);
      return { ...l, reiwa, month, day, sortKey: reiwa * 10000 + month * 100 + day };
    })
    .filter((v): v is NonNullable<typeof v> => v !== null);
  if (links.length === 0)
    fail("空き状況のPDFが見つかりません。ページの構成が変わった可能性があります。");
  const latest = links.reduce((a, b) => (b.sortKey > a.sortKey ? b : a));
  console.log(`最新: ${latest.text}\n  ${latest.url}`);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "inazawa-vacancy-"));
  try {
    const r = await fetch(latest.url, { headers: { "User-Agent": UA } });
    if (!r.ok) fail(`PDFの取得に失敗しました（${r.status}）: ${latest.url}`);
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.subarray(0, 4).toString() !== "%PDF") fail(`PDFではありません: ${latest.url}`);
    const file = path.join(tmpDir, "inazawa.pdf");
    fs.writeFileSync(file, buf);

    let pdf: PdfResult;
    try {
      pdf = JSON.parse(runPython([EXTRACTOR, file])) as PdfResult;
    } catch (err) {
      fail(`抽出結果を読めません: ${String(err)}`);
    }

    const [reiwa, month, day] = pdf.asOf;
    if (reiwa !== latest.reiwa || month !== latest.month || day !== latest.day) {
      fail(
        `PDFの基準日（令和${reiwa}年${month}月${day}日）がリンクの文言（${latest.text}）と違います`
      );
    }
    const asOf = `${2018 + reiwa}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    if (asOf > todayJst()) fail(`基準日（${asOf}）が今日より先になっています`);
    console.log(`基準日: ${asOf}`);

    const symbolLegend = pdf.legend.map((l) => ({
      mark: shapeOf(l.mark),
      label: l.label,
      open: !/空き0人$/.test(l.label),
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
    let noClass = 0;

    for (const table of pdf.tables) {
      // 「【公立保育園】」の括弧を外す
      const category = table.caption.replace(/^【|】$/g, "");
      if (!category) fail("表の題が空です");
      if (!categories.includes(category)) categories.push(category);

      for (const row of table.rows) {
        const name = squeeze(row[COL_NAME]);
        if (!name) fail(`${category}: 施設名が空の行があります`);
        if (seen.has(name)) fail(`施設名が重複しています: ${name}`);
        seen.add(name);

        const symbols: (string | null)[] = [];
        for (let age = 0; age < AGE_COUNT; age++) {
          // 公式の表は5歳から0歳の順に並んでいる
          const column = COL_AGE0 + (AGE_COUNT - 1 - age);
          const raw = squeeze(row[column] ?? "");
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
        if (symbols.every((s) => s === null)) fail(`${name}: 全てのクラスが空です`);

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

    if (facilities.length < 25) fail(`施設が${facilities.length}件しか取れていません`);
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
      subtitle: `${month}月1日現在の受入予定数`,
      notes: [
        "稲沢市は空き状況を人数ではなく記号で公表しています。当サイトでも公式の記号のまま載せています。",
        "1日時点の空き状況のため、申し込みをする時点では既に空きがない場合があります。1日より後の空き状況は各園にお問い合わせください。",
        "認定こども園の1号認定（幼稚園部分）の空き状況は載せていません。",
        "年齢はその年度の4月1日時点のものです。設けていないクラスは「—」にしています。",
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
