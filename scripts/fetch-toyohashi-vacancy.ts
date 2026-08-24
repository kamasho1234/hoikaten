/**
 * 豊橋市の保育園・認定こども園の空き状況を取り込む
 *
 * 実行: npm run vacancy:fetch:toyohashi
 *
 * ## この自治体の特徴
 * - 記号（×＝0人、△＝1〜2人、○＝3〜5人、◎＝6人以上）。凡例は本文にある
 * - **保育園ぶんと認定こども園ぶんでPDFが分かれていて、基準日も別**。
 *   川崎市と同じく古いほうを全体の時点にして、両方を注記に書く
 * - 各PDFに表が2つ（私立・公立）あり、**見出しの1列目が区分名**になっている
 * - PDFのファイル名が日本語＋日付なので、リンクは案内ページから取る
 *   （旧URL /58151.htm はサイト改編で404のまま。保育課のページから辿る）
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "toyohashi";
const MUNICIPALITY_NAME = "豊橋市";
const SOURCE_NAME = "豊橋市「各園の受入可能月齢・受入可能人数」";
/** 「令和8年度（2026年度）入園について」。ここに空き状況のPDFが並ぶ */
const INDEX_URL = "https://www.city.toyohashi.lg.jp/63210.htm";
const AGE_COUNT = 6;
const MIN_FACILITIES = 50;
const UA = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const EXTRACTOR = path.join(process.cwd(), "scripts", "toyohashi-pdf-extract.py");

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

/** 記号の形をそろえる */
function shapeOf(mark: string): string {
  if (/^[○◯〇]$/.test(mark)) return "○";
  if (/^[×✕✖]$/.test(mark)) return "×";
  return mark;
}

type PdfResult = {
  asOf: [number, number, number];
  target: [number, number];
  legend: { mark: string; label: string }[];
  markCounts: Record<string, number>;
  slashes: number;
  rows: { kubun: string; name: string; roman: string; ageLimit: string; marks: (string | null)[] }[];
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
  console.log(`${MUNICIPALITY_NAME}の受入可能人数を取り込みます`);
  console.log(`公式ページ: ${INDEX_URL}\n`);

  const res = await fetch(INDEX_URL, { headers: { "User-Agent": UA } });
  if (!res.ok) fail(`公式ページが ${res.status} を返しました`);
  const html = await res.text();

  // 「【保育園】10月入園　受入可能月齢・受入可能人数0818.pdf」のようなリンク
  const links = [...html.matchAll(/<a[^>]+href="([^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => ({
      // ファイル名が日本語なので、URLとして組み立て直す（そのままでは扱えないことがある）
      url: new URL(m[1], INDEX_URL).toString(),
      text: toHalfWidth(squeeze(m[2])),
    }))
    .map((l) => {
      const m = l.text.match(/^【(保育園|認定こども園)】(\d+)月入園受入可能月齢・受入可能人数/);
      return m ? { ...l, kind: m[1], month: Number(m[2]) } : null;
    })
    .filter((v): v is NonNullable<typeof v> => v !== null);
  if (links.length !== 2) {
    fail(
      `受入可能人数のPDFが${links.length}件です（保育園ぶんと認定こども園ぶんの2件のはず）。ページの構成が変わった可能性があります。`
    );
  }
  const months = new Set(links.map((l) => l.month));
  if (months.size !== 1) {
    fail(`2つのPDFの入園月が違います（${[...months].join(" / ")}）`);
  }
  const targetMonth = [...months][0];

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "toyohashi-vacancy-"));
  try {
    const parsed: { kind: string; url: string; pdf: PdfResult }[] = [];
    for (const link of links) {
      console.log(`PDF（${link.kind}）: ${link.text}`);
      const r = await fetch(link.url, { headers: { "User-Agent": UA } });
      if (!r.ok) fail(`PDFの取得に失敗しました（${r.status}）: ${link.url}`);
      const buf = Buffer.from(await r.arrayBuffer());
      if (buf.subarray(0, 4).toString() !== "%PDF") fail(`PDFではありません: ${link.url}`);
      const file = path.join(tmpDir, `${link.kind}.pdf`);
      fs.writeFileSync(file, buf);
      try {
        parsed.push({ kind: link.kind, url: link.url, pdf: JSON.parse(runPython([EXTRACTOR, file])) });
      } catch (err) {
        fail(`抽出結果を読めません（${link.kind}）: ${String(err)}`);
      }
    }

    // 入園月がリンクの文言と合っているか
    for (const { kind, pdf } of parsed) {
      if (pdf.target[1] !== targetMonth) {
        fail(`${kind}のPDFの入園月（${pdf.target[1]}月）がリンクの文言（${targetMonth}月）と違います`);
      }
    }

    // 基準日はPDFごとに違う。古いほうを全体の時点にして、両方を注記に書く
    const dates = parsed.map(({ kind, pdf }) => {
      const [reiwa, month, day] = pdf.asOf;
      const text = `${2018 + reiwa}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      return { kind, text, label: `${month}月${day}日` };
    });
    const asOf = dates.map((d) => d.text).sort()[0];
    if (asOf > todayJst()) fail(`基準日（${asOf}）が今日より先になっています`);
    const targetYear = 2018 + parsed[0].pdf.target[0];
    console.log(
      `基準日: ${dates.map((d) => `${d.kind} ${d.text}`).join(" / ")} → ${asOf}（${targetYear}年${targetMonth}月入園ぶん）`
    );

    // 凡例は2つのPDFで同じはず
    const legendKey = (pdf: PdfResult) =>
      pdf.legend.map((l) => `${shapeOf(l.mark)}=${l.label}`).join("|");
    if (new Set(parsed.map(({ pdf }) => legendKey(pdf))).size !== 1) {
      fail("2つのPDFで記号の凡例が違います");
    }
    const symbolLegend = parsed[0].pdf.legend.map((l) => ({
      mark: shapeOf(l.mark),
      label: l.label,
      open: !/^0人$/.test(toHalfWidth(l.label)),
    }));
    if (symbolLegend.length < 3) fail(`凡例が${symbolLegend.length}件しか取れていません`);
    if (!symbolLegend.some((l) => l.open)) fail("空きありの記号が凡例にありません");
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
    let slashes = 0;

    for (const { pdf } of parsed) {
      slashes += pdf.slashes;
      for (const row of pdf.rows) {
        const name = squeeze(row.name);
        if (!name) fail("施設名が空の行があります");
        if (seen.has(name)) fail(`施設名が重複しています: ${name}`);
        seen.add(name);

        let c = categories.indexOf(row.kubun);
        if (c < 0) {
          categories.push(row.kubun);
          c = categories.length - 1;
        }

        const symbols: (string | null)[] = [];
        for (let age = 0; age < AGE_COUNT; age++) {
          const raw = row.marks[age];
          // 斜線が引かれていた欄は Python 側で null になっている
          if (raw === null) {
            noClass += 1;
            symbols.push(null);
            continue;
          }
          const mark = legendByShape.get(shapeOf(squeeze(raw)));
          if (!mark) fail(`${name}: ${age}歳児が凡例にない記号です: 「${raw}」`);
          marks.set(mark, (marks.get(mark) ?? 0) + 1);
          symbols.push(mark);
        }
        if (symbols.every((s) => s === null)) fail(`${name}: 全てのクラスがありません`);

        facilities.push({
          id: name,
          name,
          w: null,
          c,
          vacancy: new Array(AGE_COUNT).fill(null),
          symbols,
        });
      }
    }

    if (facilities.length < MIN_FACILITIES) {
      fail(`施設が${facilities.length}件しか取れていません（${MIN_FACILITIES}件以上のはず）`);
    }
    if (noClass !== slashes) {
      fail(`斜線の欄の数が合いません（PDF ${slashes} / 取り込み ${noClass}）`);
    }

    // 検算1: 記号と斜線の合計が施設数×クラス数になるか
    const total = [...marks.values()].reduce((a, b) => a + b, 0);
    if (total + noClass !== facilities.length * AGE_COUNT) {
      fail(
        `欄の数が合いません（記号${total}＋斜線${noClass} / 施設${facilities.length}×${AGE_COUNT}）`
      );
    }

    // 検算2: 記号の数が2つのPDFの文字と合うか
    const inTextAll = new Map<string, number>();
    for (const { pdf } of parsed) {
      for (const [m, v] of Object.entries(pdf.markCounts)) {
        const key = shapeOf(m);
        inTextAll.set(key, (inTextAll.get(key) ?? 0) + v);
      }
    }
    for (const [mark, count] of marks) {
      const inText = inTextAll.get(shapeOf(mark)) ?? 0;
      if (count !== inText) {
        fail(`「${mark}」の数が合いません（PDFの文字 ${inText}個 / 取り込み ${count}個）`);
      }
    }
    console.log("記号の数はPDFの文字と一致し、欄の数も施設数×クラス数と合いました");

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

    const notes = [
      `豊橋市は空き状況を人数ではなく記号で公表しています。当サイトでも公式の記号のまま載せています。これは${targetYear}年${targetMonth}月入園申込ぶんです。`,
      `基準日は保育園と認定こども園で分かれています（${dates
        .map((d) => `${d.kind}は${d.label}`)
        .join("、")}時点）。このページでは古いほうの${asOf}を全体の時点として表示しています。`,
      "そのクラスがないらんは「—」にしています（公式の表では斜線です）。",
    ];

    const dataset = {
      municipalitySlug: MUNICIPALITY_SLUG,
      municipalityName: MUNICIPALITY_NAME,
      asOf,
      fetchedAt: todayJst(),
      sourceName: SOURCE_NAME,
      sourceUrl: INDEX_URL,
      sourceFiles: Object.fromEntries(parsed.map(({ kind, url }) => [kind, url])),
      metrics: ["symbol"],
      subtitle: `${targetYear}年${targetMonth}月入園申込ぶんの受入可能人数`,
      notes,
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
    console.log(`  ${facilities.length}施設`);
    console.log(`  そのクラスがないらん（斜線）: ${noClass}`);
    console.log(
      `  区分ごとの数: ${categories
        .map((name, i) => `${name} ${facilities.filter((f) => f.c === i).length}`)
        .join(" / ")}`
    );
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
