/**
 * 小樽市の保育所・認定こども園（保育部分）の空き状況を取り込む
 *
 * 実行: npm run vacancy:fetch:otaru
 *
 * ## この自治体の特徴
 * - 空きは人数ではなく記号。公式の凡例は「×＝空きなし」「△＝翌月以降受入れ余地あり」で、
 *   **空らんは「定員に余裕がある」**という意味を持つ（凡例に明記されている）
 * - 当サイトでは空らんのままだと「情報なし」に見えてしまうので、
 *   太宰府市・松本市と同じく **「〇」に置き換えて表示し、注記で断る**
 * - **そのクラスを設けていない欄には斜線が引かれている。**
 *   空らんと取り違えると意味が正反対になるので、
 *   欄の中の線分の数で見分けている（scripts/otaru-pdf-extract.py）
 * - 資料には入所待ち児童数も併記されているが、空らんの欄には数が書かれていない。
 *   0人なのか非公表なのか資料からは決められないので、待ち人数は取り込まない
 *   （[[feedback_factcheck_absolute]]）
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "otaru";
const MUNICIPALITY_NAME = "小樽市";
const PREFECTURE = "北海道";
const SOURCE_NAME = "小樽市「保育所等の空き状況について」";
const INDEX_URL = "https://www.city.otaru.lg.jp/docs/2020111000476/";
const AGE_COUNT = 6;
const MIN_FACILITIES = 25;
const UA = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const EXTRACTOR = path.join(process.cwd(), "scripts", "otaru-pdf-extract.py");

/** 空らんの代わりに出す記号 */
const OPEN_MARK = "〇";

const LEGEND = [
  { mark: OPEN_MARK, label: "定員に余裕あり（公式の表では空らん）", open: true },
  { mark: "△", label: "翌月以降受入れ余地あり", open: true },
  { mark: "×", label: "空きなし", open: false },
];

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

type PdfRow = { name: string; cells: (string | null)[] };

type PdfResult = {
  text: string;
  markCounts: Record<string, number>;
  hatches: number;
  blanks: number;
  leftoverMarks: string[];
  rows: PdfRow[];
};

function runPython(args: string[]): string {
  const candidates = process.env.PYTHON ? [process.env.PYTHON] : ["python3", "python"];
  let lastError = "";
  for (const bin of candidates) {
    try {
      return execFileSync(bin, args, { encoding: "utf-8", maxBuffer: 128 * 1024 * 1024 });
    } catch (err) {
      lastError = String((err as { stderr?: string })?.stderr ?? err);
    }
  }
  fail(`Pythonの実行に失敗しました: ${lastError}`);
}

/** 「令和8年8月26日」を YYYY-MM-DD にする */
function readAsOf(source: string): string | null {
  const m = /令和(\d+)年(\d{1,2})月(\d{1,2})日/.exec(toHalfWidth(squeeze(source)));
  if (!m) return null;
  return `${reiwaToYear(Number(m[1]))}-${String(Number(m[2])).padStart(2, "0")}-${String(
    Number(m[3]),
  ).padStart(2, "0")}`;
}

async function main(): Promise<void> {
  const r0 = await fetch(INDEX_URL, { headers: { "User-Agent": UA } });
  if (!r0.ok) fail(`ページの取得に失敗しました（${r0.status}）: ${INDEX_URL}`);
  const html = await r0.text();

  const links: { url: string; text: string }[] = [];
  for (const m of html.matchAll(/<a\s[^>]*href="([^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/gi)) {
    const text = squeeze(m[2]);
    if (text.includes("空き状況")) {
      links.push({ url: new URL(m[1], INDEX_URL).toString(), text });
    }
  }
  if (links.length !== 1) fail(`空き状況のPDFが${links.length}本見つかりました（1本のはず）`);
  const link = links[0];
  console.log(`PDF: ${link.text}\n  ${link.url}`);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "otaru-vacancy-"));
  try {
    const r = await fetch(link.url, { headers: { "User-Agent": UA } });
    if (!r.ok) fail(`PDFの取得に失敗しました（${r.status}）: ${link.url}`);
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.subarray(0, 4).toString() !== "%PDF") fail(`PDFではありません: ${link.url}`);
    const file = path.join(tmpDir, "otaru.pdf");
    fs.writeFileSync(file, buf);

    let pdf: PdfResult;
    try {
      pdf = JSON.parse(runPython([EXTRACTOR, file])) as PdfResult;
    } catch (err) {
      fail(`抽出結果を読めません: ${String(err)}`);
    }

    const asOf = readAsOf(pdf.text);
    if (!asOf) fail("資料から時点（令和◯年◯月◯日）を読めません");
    if (asOf > todayJst()) fail(`時点の日付（${asOf}）が今日より先になっています`);
    console.log(`時点: ${asOf}`);

    // 表の外に残る記号は凡例の「×」「△」の2つだけのはず
    if (pdf.leftoverMarks.length > 2) {
      fail(
        `表の外に記号が${pdf.leftoverMarks.length}個あります（凡例の2個のはず）: ${pdf.leftoverMarks.join("")}`,
      );
    }

    const known = new Set(LEGEND.map((l) => l.mark));
    const facilities: {
      id: string;
      name: string;
      w: null;
      vacancy: (number | null)[];
      symbols: (string | null)[];
    }[] = [];
    const seen = new Set<string>();
    const marks = new Map<string, number>();
    let hatches = 0;
    let blanks = 0;

    for (const row of pdf.rows) {
      const name = squeeze(row.name);
      if (!name) fail("施設名が空の行があります");
      if (seen.has(name)) fail(`施設名が重複しています: ${name}`);
      seen.add(name);

      const symbols: (string | null)[] = [];
      for (let age = 0; age < AGE_COUNT; age++) {
        const raw = row.cells[age];
        if (raw === null) {
          // 斜線＝そのクラスを設けていない
          hatches += 1;
          symbols.push(null);
          continue;
        }
        // 空らん＝定員に余裕あり。凡例に沿って「〇」に置き換える
        const mark = raw === "" ? OPEN_MARK : squeeze(raw) === "○" ? "〇" : squeeze(raw);
        if (raw === "") blanks += 1;
        if (!known.has(mark)) fail(`${name}: ${age}歳児が凡例にない記号です（「${mark}」）`);
        marks.set(mark, (marks.get(mark) ?? 0) + 1);
        symbols.push(mark);
      }
      if (symbols.every((s) => s === null)) fail(`${name}: すべての年齢が斜線になっています`);

      facilities.push({
        id: name,
        name,
        w: null,
        vacancy: new Array(AGE_COUNT).fill(null),
        symbols,
      });
    }

    if (facilities.length < MIN_FACILITIES) {
      fail(`施設が${facilities.length}件しか取れていません（${MIN_FACILITIES}件以上のはず）`);
    }
    // 検算1: 斜線と空らんの数がPDFの読み取りと合うか
    if (hatches !== pdf.hatches) fail(`斜線の数が合いません（PDF ${pdf.hatches} / 取り込み ${hatches}）`);
    if (blanks !== pdf.blanks) fail(`空らんの数が合いません（PDF ${pdf.blanks} / 取り込み ${blanks}）`);
    // 検算2: 記号の数がPDFの読み取りと合うか（空らんから作った「〇」を除く）
    for (const [mark, count] of marks) {
      if (mark === OPEN_MARK) continue;
      if (count !== pdf.markCounts[mark]) {
        fail(`「${mark}」の数が合いません（PDF ${pdf.markCounts[mark]} / 取り込み ${count}）`);
      }
    }
    if ((marks.get(OPEN_MARK) ?? 0) !== blanks) {
      fail(`空らんから作った「${OPEN_MARK}」の数が空らんの数と合いません`);
    }
    // 検算3: 欄の数が施設数×年齢数になるか
    const total = [...marks.values()].reduce((a, b) => a + b, 0) + hatches;
    if (total !== facilities.length * AGE_COUNT) {
      fail(`欄の数が合いません（${total} / 施設${facilities.length}×${AGE_COUNT}）`);
    }
    console.log(
      `${facilities.length}施設 ／ ${[...marks].map(([m, n]) => `${m}${n}`).join("・")}・クラスなし${hatches}`,
    );

    const previous = fs.existsSync(OUT_PATH)
      ? (JSON.parse(fs.readFileSync(OUT_PATH, "utf-8")) as {
          asOf?: string;
          facilities?: unknown[];
        })
      : null;
    if (previous?.facilities && facilities.length < previous.facilities.length * 0.9) {
      fail(
        `施設数が大きく減っています（前回 ${previous.facilities.length}件 → 今回 ${facilities.length}件）`,
      );
    }
    if (previous?.asOf === asOf) {
      console.log(`公式データの時点が前回と同じ（${asOf}）のため更新はありません。`);
      return;
    }

    const notes = [
      `小樽市は空き状況を人数ではなく記号で公表しています。これは${asOf}時点のものです。`,
      `公式の凡例は「×」空きなし、「△」翌月以降受入れ余地あり です。あわせて「空欄の施設は定員に余裕がありますが、必ず入所できるとは限りません」とされているため、当サイトでは空らんを「${OPEN_MARK}」に置き換えて載せています。`,
      "公式の表で斜線が引かれている年齢は「—」にしています。その年齢のクラスを設けていないことを表します。",
      "空き状況は保育所等を選ぶときの目安となるもので、各保育所、認定こども園での保育士配置の状況、入所児童の状況などにより受け入れ可能人数は変動するため、空きがある施設でも必ず入所できるとは限りません。",
      "空き状況の有無に関わらず、入所申し込みは可能です。入所の決定は先着順ではありません。申し込みをされた方の中で利用調整を行い、優先度の高い方から入所が決定します。",
      "クラス年齢は、年度当初4月1日時点の年齢です。",
      "公式の資料には入所待ち児童数も併記されていますが、空らんの欄には数が書かれておらず0人か非公表かを決められないため、当サイトでは載せていません。",
    ];

    const dataset = {
      municipalitySlug: MUNICIPALITY_SLUG,
      municipalityName: MUNICIPALITY_NAME,
      prefecture: PREFECTURE,
      asOf,
      fetchedAt: todayJst(),
      sourceName: SOURCE_NAME,
      sourceUrl: INDEX_URL,
      sourceFiles: { vacancy: link.url },
      metrics: ["symbol"],
      notes,
      wards: [] as string[],
      symbolLegend: LEGEND,
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
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

main().catch((err) => fail(String(err)));
