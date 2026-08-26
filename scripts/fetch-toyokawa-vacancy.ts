/**
 * 豊川市の保育施設途中入所空き状況を取り込む
 *
 * 実行: npm run vacancy:fetch:toyokawa
 *
 * ## この自治体の特徴
 * - 凡例は「○空きあり」だけ。「-」は空きなし
 * - 0〜2歳しか受け入れない施設は3〜5歳の欄がそもそも無い（クラスなし）
 * - **空きの記号ではなく「※１」だけが入っている欄がある**（東上・萩の0歳児）。
 *   ※１は給食についての注記で、空きの有無は書かれていない。
 *   勝手に空きあり・なしを決めず、印のまま持って凡例で断る
 * - 区分は縦書きの結合セルで文字の並びが崩れる（宗像市と同じ作り）
 * - PDFの中の日付は「（7月24日現在）」で年がない。題の年度から年を決める
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "toyokawa";
const MUNICIPALITY_NAME = "豊川市";
const SOURCE_NAME = "豊川市「令和8年度保育施設年度途中入所空き状況について」";
const INDEX_URL = "https://www.city.toyokawa.lg.jp/soshiki/kodomokenkou/hoiku/2/3/5/6725.html";
const AGE_COUNT = 6;
const MIN_FACILITIES = 40;
const UA = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const EXTRACTOR = path.join(process.cwd(), "scripts", "toyokawa-pdf-extract.py");

const CLOSED_MARK = "-";

function fail(message: string): never {
  console.error(`\n[中断] ${message}`);
  process.exit(1);
}

function todayJst(): string {
  const jst = new Date(Date.now() + 9 * 60 * 60 * 1000);
  return jst.toISOString().slice(0, 10);
}

function squeeze(s: string): string {
  return (s ?? "").replace(/<[^>]+>/g, "").replace(/[\s　]/g, "");
}

function toHalfWidth(s: string): string {
  return s.replace(/[０-９]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xfee0));
}

function reiwaToYear(reiwa: number): number {
  return reiwa + 2018;
}

type PdfResult = {
  fiscal: number;
  asOf: [number, number];
  openMark: string;
  notes: string[];
  openInText: number;
  closedInText: number;
  blanks: number;
  rows: {
    kind: string;
    name: string;
    school: string;
    owner: string;
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
  console.log(`${MUNICIPALITY_NAME}の空き状況を取り込みます`);
  console.log(`公式ページ: ${INDEX_URL}\n`);

  const res = await fetch(INDEX_URL, { headers: { "User-Agent": UA }, redirect: "follow" });
  if (!res.ok) fail(`公式ページが ${res.status} を返しました`);
  const html = await res.text();

  const links = [...html.matchAll(/<a[^>]+href="([^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => ({
      url: new URL(m[1], res.url || INDEX_URL).toString(),
      text: toHalfWidth(squeeze(m[2])),
    }))
    .map((l) => {
      const m = /空き状況[（(]令和(\d+)年(\d+)月(\d+)日現在/.exec(l.text);
      return { ...l, key: m ? Number(m[1]) * 10000 + Number(m[2]) * 100 + Number(m[3]) : 0 };
    })
    .filter((l) => l.key > 0)
    .sort((a, b) => b.key - a.key);
  if (links.length === 0) fail("空き状況のPDFが見つかりません");
  const link = links[0];
  console.log(`PDF: ${link.text}\n  ${link.url}`);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "toyokawa-vacancy-"));
  try {
    const r = await fetch(link.url, { headers: { "User-Agent": UA } });
    if (!r.ok) fail(`PDFの取得に失敗しました（${r.status}）: ${link.url}`);
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.subarray(0, 4).toString() !== "%PDF") fail(`PDFではありません: ${link.url}`);
    const file = path.join(tmpDir, "toyokawa.pdf");
    fs.writeFileSync(file, buf);

    let pdf: PdfResult;
    try {
      pdf = JSON.parse(runPython([EXTRACTOR, file])) as PdfResult;
    } catch (err) {
      fail(`抽出結果を読めません: ${String(err)}`);
    }

    // PDFの中には月日しかないので、題の年度から年を決める
    const [month, day] = pdf.asOf;
    const year = month >= 4 ? reiwaToYear(pdf.fiscal) : reiwaToYear(pdf.fiscal) + 1;
    const asOf = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    if (!/^\d{4}-\d{2}-\d{2}$/.test(asOf)) fail(`時点の日付を組み立てられません: ${asOf}`);
    if (asOf > todayJst()) fail(`時点の日付（${asOf}）が今日より先になっています`);
    // リンクの題の日付とPDFの中の日付が合っているか
    if (link.key !== pdf.fiscal * 10000 + month * 100 + day) {
      fail(`リンクの題（${link.text}）とPDFの中の日付（${asOf}）が違います`);
    }
    console.log(`時点: ${asOf} ／ ${reiwaToYear(pdf.fiscal)}年度の途中入所分`);

    const openMark = squeeze(pdf.openMark);
    if (!openMark) fail("空きありの記号が読み取れませんでした");

    const wards: string[] = [];
    const categories: string[] = [];
    const facilities: {
      id: string;
      name: string;
      w: number;
      c: number;
      vacancy: (number | null)[];
      symbols: (string | null)[];
      note?: string;
    }[] = [];
    const seen = new Set<string>();
    const noteMarks = new Set<string>();
    let openCells = 0;
    let closedCells = 0;
    let noteCells = 0;
    let notOffered = 0;

    for (const row of pdf.rows) {
      const name = squeeze(row.name);
      if (!name) fail("施設名が空の行があります");
      if (seen.has(name)) fail(`施設名が重複しています: ${name}`);
      seen.add(name);

      const school = squeeze(row.school);
      if (!school) fail(`${name}: 小学校区が空です`);
      let w = wards.indexOf(school);
      if (w < 0) {
        wards.push(school);
        w = wards.length - 1;
      }

      const kind = squeeze(row.kind);
      if (!kind) fail(`${name}: 区分が空です`);
      let c = categories.indexOf(kind);
      if (c < 0) {
        categories.push(kind);
        c = categories.length - 1;
      }

      const symbols: (string | null)[] = [];
      for (let age = 0; age < AGE_COUNT; age++) {
        const raw = row.marks[age];
        if (raw === null) {
          notOffered += 1;
          symbols.push(null);
          continue;
        }
        const mark = squeeze(raw);
        if (mark === openMark) {
          openCells += 1;
        } else if (mark === CLOSED_MARK) {
          closedCells += 1;
        } else if (/^※\d+$/.test(mark)) {
          // 空きの記号ではなく注の番号だけが入っている欄
          noteCells += 1;
          noteMarks.add(mark);
        } else {
          fail(`${name}: ${age}歳児が想定の記号ではありません（「${mark}」）`);
        }
        symbols.push(mark);
      }

      // 設置・経営主体は公式の表の書き方をそのまま出す
      facilities.push({
        id: name,
        name,
        w,
        c,
        vacancy: new Array(AGE_COUNT).fill(null),
        symbols,
        note: `設置・経営主体: ${squeeze(row.owner)}`,
      });
    }

    if (facilities.length < MIN_FACILITIES) {
      fail(`施設が${facilities.length}件しか取れていません（${MIN_FACILITIES}件以上のはず）`);
    }
    // 検算1: 記号の数がPDFの文字の数と合うか
    if (openCells !== pdf.openInText) {
      fail(`「${openMark}」の数が合いません（PDFの文字 ${pdf.openInText}個 / 取り込み ${openCells}個）`);
    }
    if (closedCells !== pdf.closedInText) {
      fail(`「${CLOSED_MARK}」の数が合いません（PDFの文字 ${pdf.closedInText}個 / 取り込み ${closedCells}個）`);
    }
    // 検算2: 空らんの数がPDFと合うか
    if (notOffered !== pdf.blanks) {
      fail(`空らんの数が合いません（PDF ${pdf.blanks} / 取り込み ${notOffered}）`);
    }
    // 検算3: 欄の数が施設数×年齢数になるか
    const cells = openCells + closedCells + noteCells + notOffered;
    if (cells !== facilities.length * AGE_COUNT) {
      fail(`欄の数が合いません（${cells} / 施設${facilities.length}×${AGE_COUNT}）`);
    }
    if (openCells === 0) fail("空きありの記号がひとつもありません（読み取りに失敗している可能性があります）");
    console.log(
      `${facilities.length}施設 ／ ${openMark}${openCells}・${CLOSED_MARK}${closedCells}・注の番号${noteCells}・クラスなし${notOffered}`,
    );

    const symbolLegend = [
      { mark: openMark, label: "空きあり", open: true },
      { mark: CLOSED_MARK, label: "空きなし", open: false },
      ...[...noteMarks].sort().map((mark) => ({
        mark,
        label: `注の番号のみ（空きの有無は公式の表に書かれていません）`,
        open: false,
      })),
    ];

    const previous = fs.existsSync(OUT_PATH)
      ? (JSON.parse(fs.readFileSync(OUT_PATH, "utf-8")) as { asOf?: string; facilities?: unknown[] })
      : null;
    if (previous?.facilities && facilities.length < previous.facilities.length * 0.9) {
      fail(`施設数が大きく減っています（前回 ${previous.facilities.length}件 → 今回 ${facilities.length}件）`);
    }
    if (previous?.asOf === asOf) {
      console.log(`公式データの時点が前回と同じ（${asOf}）のため更新はありません。`);
      return;
    }

    const notes = [
      `豊川市は空き状況を人数ではなく記号で公表しています。これは${reiwaToYear(pdf.fiscal)}年度の途中入所分で、${asOf}時点のものです。`,
      `公式の凡例にあるのは「${openMark}空きあり」だけです。「${CLOSED_MARK}」は空きなしを表します。`,
      ...(noteCells > 0
        ? [
            `公式の表で「${[...noteMarks].sort().join("」「")}」とだけ書かれている年齢は、空きの有無が示されていません。印をそのまま出しています。`,
          ]
        : []),
      "公式の表で欄そのものがない年齢は「—」にしています。その年齢のクラスがないことを表しています。",
      ...pdf.notes.map((n) => squeeze(n)),
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
      subtitle: `${reiwaToYear(pdf.fiscal)}年度の途中入所の空き状況`,
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
    console.log(`  ${facilities.length}施設 / ${wards.length}校区 / ${categories.join("・")}`);
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

main().catch((err) => fail(String(err)));
