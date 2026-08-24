/**
 * 飯塚市の保育施設の空き状況を取り込む
 *
 * 実行: npm run vacancy:fetch:iizuka
 *
 * ## この自治体の特徴
 * - 記号は「○」と「×」だけ。**凡例がなく、記号の意味が公表されていない**。
 *   佐賀市と同じく意味を推測して補うことはせず、記号だけをそのまま載せる
 * - **基準日が書かれていない**。しかもページの【更新日】はPDFの内容と合わない
 *   （9月入所用のPDFに対してページの更新日は7月1日）。
 *   そのためPDFの **HTTPヘッダの Last-Modified** を時点として使い、注記に書く
 * - 空欄がないので、記号の総数が施設数×6クラスとぴったり合う
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "iizuka";
const MUNICIPALITY_NAME = "飯塚市";
const SOURCE_NAME = "飯塚市「飯塚市内保育施設（保育部門【2・3号】）の空き状況」";
const INDEX_URL = "https://www.city.iizuka.lg.jp/site/kosodate/1072.html";
const AGE_COUNT = 6;
const MIN_FACILITIES = 30;
const UA = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";

/** 意味が公表されていないので、この説明を全部の記号に付ける */
const UNKNOWN_LABEL = "飯塚市は記号の意味を公表していません";
/** 空きがあるとみなす記号。記号の向きだけで決めており、人数は分からない */
const OPEN_MARKS = ["○", "△"];

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const EXTRACTOR = path.join(process.cwd(), "scripts", "iizuka-pdf-extract.py");

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
  target: [number, number, number];
  notes: string[];
  markCounts: Record<string, number>;
  rows: { name: string; address: string; tel: string; marks: string[] }[];
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

  const links = [...html.matchAll(/<a[^>]+href="([^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => ({ url: new URL(m[1], INDEX_URL).toString(), text: toHalfWidth(squeeze(m[2])) }))
    .map((l) => {
      const m = l.text.match(/空き状況（(\d+)月(\d+)日入所申込用/);
      return m ? { ...l, month: Number(m[1]), day: Number(m[2]) } : null;
    })
    .filter((v): v is NonNullable<typeof v> => v !== null);
  if (links.length !== 1) {
    fail(`空き状況のPDFのリンクが${links.length}件あります（1件のはず）`);
  }
  const link = links[0];
  console.log(`PDF: ${link.text}\n  ${link.url}`);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "iizuka-vacancy-"));
  try {
    const r = await fetch(link.url, { headers: { "User-Agent": UA } });
    if (!r.ok) fail(`PDFの取得に失敗しました（${r.status}）: ${link.url}`);

    // 基準日がどこにも書かれていないので、PDFの公開日（サーバーの最終更新日時）を使う
    const lastModified = r.headers.get("last-modified");
    if (!lastModified) fail("PDFの Last-Modified ヘッダがありません。時点を決められません。");
    const modified = new Date(lastModified);
    if (Number.isNaN(modified.getTime())) fail(`Last-Modified を読めません: 「${lastModified}」`);
    const asOf = new Date(modified.getTime() + 9 * 60 * 60 * 1000).toISOString().slice(0, 10);
    if (asOf > todayJst()) fail(`PDFの公開日（${asOf}）が今日より先になっています`);

    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.subarray(0, 4).toString() !== "%PDF") fail(`PDFではありません: ${link.url}`);
    const file = path.join(tmpDir, "iizuka.pdf");
    fs.writeFileSync(file, buf);

    let pdf: PdfResult;
    try {
      pdf = JSON.parse(runPython([EXTRACTOR, file])) as PdfResult;
    } catch (err) {
      fail(`抽出結果を読めません: ${String(err)}`);
    }

    // PDFの中の「令和N年M月D日入所申込用」がリンクの文言と合っているか
    const [targetReiwa, targetMonth, targetDay] = pdf.target;
    if (targetMonth !== link.month || targetDay !== link.day) {
      fail(
        `PDFの入所日（${targetMonth}月${targetDay}日）がリンクの文言（${link.month}月${link.day}日）と違います`
      );
    }
    const targetYear = 2018 + targetReiwa;
    console.log(`PDFの公開日: ${asOf}（${targetYear}年${targetMonth}月${targetDay}日入所申込用）`);

    const facilities: {
      id: string;
      name: string;
      w: null;
      c: null;
      vacancy: (number | null)[];
      symbols: (string | null)[];
    }[] = [];
    const marks = new Map<string, number>();
    const seen = new Set<string>();

    for (const row of pdf.rows) {
      const name = squeeze(row.name);
      if (!name) fail("施設名が空の行があります");
      if (seen.has(name)) fail(`施設名が重複しています: ${name}`);
      seen.add(name);

      const symbols: (string | null)[] = [];
      for (let age = 0; age < AGE_COUNT; age++) {
        const raw = shapeOf(squeeze(row.marks[age] ?? ""));
        if (!raw) fail(`${name}: ${age}歳児の欄が空です`);
        marks.set(raw, (marks.get(raw) ?? 0) + 1);
        symbols.push(raw);
      }

      facilities.push({
        id: name,
        name,
        w: null,
        c: null,
        vacancy: new Array(AGE_COUNT).fill(null),
        symbols,
      });
    }

    if (facilities.length < MIN_FACILITIES) {
      fail(`施設が${facilities.length}件しか取れていません（${MIN_FACILITIES}件以上のはず）`);
    }

    // 検算1: 記号の総数が施設数×クラス数になるか（この表には空欄がない）
    const total = [...marks.values()].reduce((a, b) => a + b, 0);
    if (total !== facilities.length * AGE_COUNT) {
      fail(`記号の総数が合いません（${total}個 / 施設${facilities.length}×${AGE_COUNT}クラス）`);
    }

    // 検算2: 記号の数がPDFの文字と合うか
    for (const [mark, count] of marks) {
      const inText = Object.entries(pdf.markCounts)
        .filter(([m]) => shapeOf(m) === shapeOf(mark))
        .reduce((acc, [, v]) => acc + v, 0);
      if (count !== inText) {
        fail(`「${mark}」の数が合いません（PDFの文字 ${inText}個 / 取り込み ${count}個）`);
      }
    }
    console.log("記号の数はPDFの文字と一致し、総数も施設数×クラス数と合いました");

    // 記号の意味は公表されていないので、説明は付けられない
    const symbolLegend = [...marks.keys()]
      .sort((a, b) => (marks.get(b) ?? 0) - (marks.get(a) ?? 0))
      .map((mark) => ({ mark, label: UNKNOWN_LABEL, open: OPEN_MARKS.includes(mark) }));
    if (!symbolLegend.some((l) => l.open)) {
      fail(`空きありとみなせる記号がありません（出てきた記号: ${[...marks.keys()].join(" ")}）`);
    }
    console.log(`記号: ${[...marks].map(([k, v]) => `${k}=${v}`).join(" / ")}`);

    const previous = fs.existsSync(OUT_PATH)
      ? (JSON.parse(fs.readFileSync(OUT_PATH, "utf-8")) as { asOf?: string; facilities?: unknown[] })
      : null;
    if (previous?.facilities && facilities.length < previous.facilities.length * 0.9) {
      fail(
        `施設数が大きく減っています（前回 ${previous.facilities.length}件 → 今回 ${facilities.length}件）`
      );
    }
    if (previous?.asOf === asOf) {
      console.log(`PDFの公開日が前回と同じ（${asOf}）のため更新はありません。`);
      return;
    }

    const notes = [
      `飯塚市は空き状況を人数ではなく記号（${[...marks.keys()].join("・")}）で公表しています。当サイトでも公式の記号のまま載せています。これは${targetYear}年${targetMonth}月${targetDay}日入所申込用のものです。`,
      "飯塚市は記号の意味（何人分の空きなのか）を公表していません。当サイトでは意味を推測して補うことはせず、記号だけをそのまま載せています。",
      "飯塚市はこの表に基準日を書いていないため、公式サイトでPDFが公開された日を時点として表示しています。",
      ...pdf.notes,
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
      subtitle: `${targetYear}年${targetMonth}月${targetDay}日入所申込用の空き状況`,
      notes,
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
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

main().catch((err) => fail(String(err)));
