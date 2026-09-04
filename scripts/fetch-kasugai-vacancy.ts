/**
 * 春日井市の入園受入可能人数を取り込む
 *
 * 実行: npm run vacancy:fetch:kasugai
 *
 * ## この自治体の特徴
 * - 記号（〇＝5人以上の空き、△＝4名以下の空き、×＝空きなし）。凡例は本文にある
 * - **注記が同じセルに入って罫線が途切れ、行が融合する**（西部保育園）。
 *   Python側でセルの抽出に頼らず座標で読むことで外している
 * - そのクラスがない欄には斜線
 * - **記号が列の境目に印字されていて、どの歳児のものか決められないものがある**
 *   （外之原保育園の△）。その欄は「—」にして注記に書く
 * - 「〇」（U+3007）と「○」（U+25CB）が混ざっている
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "kasugai";
const MUNICIPALITY_NAME = "春日井市";
const SOURCE_NAME = "春日井市「保育園等空き状況一覧（園種別）」";
const INDEX_URL =
  "https://www.city.kasugai.lg.jp/kosodate/hoikuen/hoikuen/1002326/1026096.html";
const AGE_COUNT = 6;
const MIN_FACILITIES = 60;
/** 記号の位置が決められない欄がこれより多ければ、読み方を見直すべきなので止める */
const MAX_UNASSIGNED = 3;
const UA = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const EXTRACTOR = path.join(process.cwd(), "scripts", "kasugai-pdf-extract.py");

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

/** 「〇」（U+3007）と「○」（U+25CB）が混ざっているので形をそろえる */
function shapeOf(mark: string): string {
  if (/^[○◯〇]$/.test(mark)) return "〇";
  if (/^[×✕✖]$/.test(mark)) return "×";
  return mark;
}

type PdfResult = {
  target: [number, number];
  legend: { mark: string; label: string }[];
  notes: string[];
  markCounts: Record<string, number>;
  slashes: number;
  missing: { name: string; age: number }[];
  unassigned: { name: string; mark: string; x: number }[];
  printed: number;
  rows: { kubun: string; no: string; name: string; school: string; marks: (string | null)[] }[];
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

  // 「(園種別)9月入園受入可能人数」。中学校区べつのPDFもあるので園種別のほうを使う
  const links = [...html.matchAll(/<a[^>]+href="([^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => ({ url: new URL(m[1], INDEX_URL).toString(), text: toHalfWidth(squeeze(m[2])) }))
    .map((l) => {
      const m = l.text.match(/^\(園種別\)(\d+)月入園受入可能人数/);
      return m ? { ...l, month: Number(m[1]) } : null;
    })
    .filter((v): v is NonNullable<typeof v> => v !== null);
  if (links.length !== 1) {
    fail(`園種別のPDFのリンクが${links.length}件あります（1件のはず）`);
  }
  const link = links[0];
  console.log(`PDF: ${link.text}\n  ${link.url}`);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "kasugai-vacancy-"));
  try {
    const r = await fetch(link.url, { headers: { "User-Agent": UA } });
    if (!r.ok) fail(`PDFの取得に失敗しました（${r.status}）: ${link.url}`);

    // 基準日が書かれていないので、PDFの公開日（サーバーの最終更新日時）を使う
    const lastModified = r.headers.get("last-modified");
    if (!lastModified) fail("PDFの Last-Modified ヘッダがありません。時点を決められません。");
    const modified = new Date(lastModified);
    if (Number.isNaN(modified.getTime())) fail(`Last-Modified を読めません: 「${lastModified}」`);
    const asOf = new Date(modified.getTime() + 9 * 60 * 60 * 1000).toISOString().slice(0, 10);
    if (asOf > todayJst()) fail(`PDFの公開日（${asOf}）が今日より先になっています`);

    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.subarray(0, 4).toString() !== "%PDF") fail(`PDFではありません: ${link.url}`);
    const file = path.join(tmpDir, "kasugai.pdf");
    fs.writeFileSync(file, buf);

    let pdf: PdfResult;
    try {
      pdf = JSON.parse(runPython([EXTRACTOR, file])) as PdfResult;
    } catch (err) {
      fail(`抽出結果を読めません: ${String(err)}`);
    }

    const [targetReiwa, targetMonth] = pdf.target;
    if (targetMonth !== link.month) {
      fail(`PDFの入園月（${targetMonth}月）がリンクの文言（${link.month}月）と違います`);
    }
    const targetYear = 2018 + targetReiwa;
    console.log(`PDFの公開日: ${asOf}（${targetYear}年${targetMonth}月入園ぶん）`);

    const symbolLegend = pdf.legend.map((l) => ({
      mark: shapeOf(l.mark),
      label: l.label,
      open: /空き$/.test(l.label) && !/なし$/.test(l.label),
    }));
    if (symbolLegend.length < 3) fail(`凡例が${symbolLegend.length}件しか取れていません`);
    if (!symbolLegend.some((l) => l.open)) fail("空きありの記号が凡例にありません");
    console.log(`凡例: ${symbolLegend.map((l) => `${l.mark}＝${l.label}`).join(" / ")}`);
    const legendByShape = new Map(symbolLegend.map((l) => [shapeOf(l.mark), l.mark]));

    if (pdf.unassigned.length > MAX_UNASSIGNED) {
      fail(
        `記号の位置が決められない欄が${pdf.unassigned.length}個あります（${MAX_UNASSIGNED}個までのはず）。読み方を見直してください。`
      );
    }

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
        // 斜線か、記号の位置を決められなかった欄は Python 側で null になっている
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
      if (symbols.every((s) => s === null)) fail(`${name}: 全てのクラスが空です`);

      facilities.push({
        id: name,
        name,
        w: null,
        c,
        vacancy: new Array(AGE_COUNT).fill(null),
        symbols,
      });
    }

    if (facilities.length < MIN_FACILITIES) {
      fail(`施設が${facilities.length}件しか取れていません（${MIN_FACILITIES}件以上のはず）`);
    }

    // 検算1: 記号と「—」の合計が施設数×クラス数になるか
    const total = [...marks.values()].reduce((a, b) => a + b, 0);
    if (total + noClass !== facilities.length * AGE_COUNT) {
      fail(
        `欄の数が合いません（記号${total}＋「—」${noClass} / 施設${facilities.length}×${AGE_COUNT}）`
      );
    }

    // 検算2: PDFに印字された記号の数が、取り込んだ数＋位置を決められなかった数と合うか
    if (pdf.printed !== total + pdf.unassigned.length) {
      fail(
        `記号の数が合いません（PDFに印字 ${pdf.printed}個 / 取り込み ${total}個＋位置不明 ${pdf.unassigned.length}個）`
      );
    }
    console.log(
      `記号の数が合いました（印字${pdf.printed}＝取り込み${total}＋位置不明${pdf.unassigned.length}）`
    );

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
      console.log(`PDFの公開日が前回と同じ（${asOf}）のため更新はありません。`);
      return;
    }

    const unassignedNames = [...new Set(pdf.unassigned.map((u) => u.name))];
    const notes = [
      `春日井市は空き状況を人数ではなく記号で公表しています。当サイトでも公式の記号のまま載せています。これは${targetYear}年${targetMonth}月入園ぶんです。`,
      ...pdf.notes,
      ...(unassignedNames.length > 0
        ? [
            `公式の表で、記号が歳児の欄の境目に印字されていてどの歳児のものか決められないものがあります（${unassignedNames.join(
              "、"
            )}）。当サイトでは決めつけずに、その欄を「—」にしています。`,
          ]
        : []),
      "設けていないクラスは「—」にしています（公式の表では斜線です）。",
      "春日井市はこの表に基準日を書いていないため、公式サイトでPDFが公開された日を時点として表示しています。",
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
      subtitle: `${targetYear}年${targetMonth}月入園ぶんの受入可能人数`,
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
    console.log(`  「—」にした欄: ${noClass}（うち斜線 ${pdf.slashes}）`);
    console.log(
      `  園種別ごとの数: ${categories
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
