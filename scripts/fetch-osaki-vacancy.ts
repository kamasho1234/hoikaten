/**
 * 大崎市の保育施設空き状況を取り込む
 *
 * 実行: npm run vacancy:fetch:osaki
 *
 * ## この自治体の特徴
 * - 記号は ○＝空きあり、△＝空き枠3以下、×＝空きなし
 * - **「入所対象児」の列**（「生後2ヶ月以上2歳児」「3歳児以上就学前」など）から
 *   受け入れる年齢が上下とも決まるので、**空らんを完全に検算できる**
 * - 区分と地域の列は罫線が無く、グループの真ん中の行に1回だけ字が置かれている。
 *   どの行までがそのグループか表から決められないので取り込んでいない
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "osaki";
const MUNICIPALITY_NAME = "大崎市";
const SOURCE_NAME = "大崎市「市内保育施設の空き状況」";
const INDEX_URL =
  "https://www.city.osaki.miyagi.jp/shisei/soshikikarasagasu/minseibu/kosodateshienka/3/6/1_1/15978.html";
const AGE_COUNT = 6;
const MIN_FACILITIES = 40;
const UA = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const EXTRACTOR = path.join(process.cwd(), "scripts", "osaki-pdf-extract.py");

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

/**
 * 「生後2ヶ月以上2歳児」「3歳児以上就学前」「生後57日目以上就学前」から、
 * 受け入れる年齢クラスの範囲を出す
 */
function agesOf(accept: string): [number, number] | null {
  const text = toHalfWidth(squeeze(accept));
  const m = /^(.+?)以上(.+)$/.exec(text);
  if (!m) return null;
  const [, fromText, toText] = m;

  let start: number;
  if (/^生後\d+(ヶ月|か月|カ月|日目)$/.test(fromText)) {
    // 月齢・日齢で書かれているものはどれも0歳児クラスから
    start = 0;
  } else {
    const f = /^(\d+)歳児$/.exec(fromText);
    if (!f) return null;
    start = Number(f[1]);
  }

  let end: number;
  if (toText === "就学前") {
    end = AGE_COUNT - 1;
  } else {
    const t = /^(\d+)歳児$/.exec(toText);
    if (!t) return null;
    end = Number(t[1]);
  }

  if (!Number.isInteger(start) || !Number.isInteger(end)) return null;
  if (start > end || end >= AGE_COUNT) return null;
  return [start, end];
}

type PdfResult = {
  asOf: [number, number, number];
  target: [number, number, number];
  legend: { mark: string; label: string }[];
  notes: string[];
  markCounts: Record<string, number>;
  blanks: number;
  rows: {
    name: string;
    capacity: string;
    accept: string;
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
      const m = /保育施設空き状況[（(]令和(\d+)年(\d+)月(\d+)日現在/.exec(l.text);
      return { ...l, key: m ? Number(m[1]) * 10000 + Number(m[2]) * 100 + Number(m[3]) : 0 };
    })
    .filter((l) => l.key > 0)
    .sort((a, b) => b.key - a.key);
  if (links.length === 0) fail("空き状況のPDFが見つかりません");
  const link = links[0];
  console.log(`PDF: ${link.text}\n  ${link.url}`);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "osaki-vacancy-"));
  try {
    const r = await fetch(link.url, { headers: { "User-Agent": UA } });
    if (!r.ok) fail(`PDFの取得に失敗しました（${r.status}）: ${link.url}`);
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.subarray(0, 4).toString() !== "%PDF") fail(`PDFではありません: ${link.url}`);
    const file = path.join(tmpDir, "osaki.pdf");
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
    // リンクの題の日付とPDFの中の日付が合っているか
    if (link.key !== reiwa * 10000 + month * 100 + day) {
      fail(`リンクの題（${link.text}）とPDFの中の日付（${asOf}）が違います`);
    }
    const targetLabel = `${reiwaToYear(pdf.target[0])}年度${pdf.target[1]}月${pdf.target[2]}日`;
    console.log(`時点: ${asOf} ／ 対象: ${targetLabel}入所選考後`);

    const symbolLegend = pdf.legend.map((l) => ({
      mark: squeeze(l.mark),
      label: squeeze(l.label),
      open: !squeeze(l.label).endsWith("なし"),
    }));
    if (symbolLegend.length !== 3) fail(`凡例が${symbolLegend.length}件です（3件のはず）`);
    if (!symbolLegend.some((l) => l.open)) fail("空きありの記号が凡例にありません");
    console.log(`凡例: ${symbolLegend.map((l) => `${l.mark}＝${l.label}`).join(" / ")}`);
    const known = new Set(symbolLegend.map((l) => l.mark));

    const facilities: {
      id: string;
      name: string;
      w: null;
      vacancy: (number | null)[];
      symbols: (string | null)[];
      note: string;
    }[] = [];
    const seen = new Set<string>();
    const marks = new Map<string, number>();
    let notOffered = 0;

    for (const row of pdf.rows) {
      const name = squeeze(row.name);
      if (!name) fail("施設名が空の行があります");
      if (seen.has(name)) fail(`施設名が重複しています: ${name}`);
      seen.add(name);

      const ages = agesOf(row.accept);
      if (ages === null) fail(`${name}: 入所対象児を読み取れません（「${row.accept}」）`);
      const [start, end] = ages;

      const symbols: (string | null)[] = [];
      for (let age = 0; age < AGE_COUNT; age++) {
        const raw = row.marks[age];
        const inRange = age >= start && age <= end;
        if (raw === null) {
          // 入所対象児の範囲の中が空らんになっていたら読み取りを疑う
          if (inRange) {
            fail(
              `${name}: ${age}歳児が空らんですが、入所対象児（${row.accept}）には入っています`,
            );
          }
          notOffered += 1;
          symbols.push(null);
          continue;
        }
        if (!inRange) {
          fail(
            `${name}: 入所対象児（${row.accept}）の外の${age}歳児に「${raw}」が入っています`,
          );
        }
        const mark = squeeze(raw);
        if (!known.has(mark)) fail(`${name}: ${age}歳児が凡例にない記号です（「${mark}」）`);
        marks.set(mark, (marks.get(mark) ?? 0) + 1);
        symbols.push(mark);
      }

      const capacity = squeeze(row.capacity);
      facilities.push({
        id: name,
        name,
        w: null,
        vacancy: new Array(AGE_COUNT).fill(null),
        symbols,
        note: `入所対象児: ${row.accept}${capacity ? ` ／ 定員（全学齢）: ${capacity}` : ""}`,
      });
    }

    if (facilities.length < MIN_FACILITIES) {
      fail(`施設が${facilities.length}件しか取れていません（${MIN_FACILITIES}件以上のはず）`);
    }
    // 検算1: 記号の数がPDFの印字と合うか
    for (const [mark, count] of marks) {
      if (count !== pdf.markCounts[mark]) {
        fail(`「${mark}」の数が合いません（PDF ${pdf.markCounts[mark]}個 / 取り込み ${count}個）`);
      }
    }
    // 検算2: 空らんの数がPDFと合うか
    if (notOffered !== pdf.blanks) {
      fail(`空らんの数が合いません（PDF ${pdf.blanks} / 取り込み ${notOffered}）`);
    }
    // 検算3: 欄の数が施設数×年齢数になるか
    const total = [...marks.values()].reduce((a, b) => a + b, 0) + notOffered;
    if (total !== facilities.length * AGE_COUNT) {
      fail(`欄の数が合いません（${total} / 施設${facilities.length}×${AGE_COUNT}）`);
    }
    console.log(
      `${facilities.length}施設 ／ ${[...marks].map(([m, n]) => `${m}${n}`).join("・")}・クラスなし${notOffered}（入所対象児と全て一致）`,
    );

    const previous = fs.existsSync(OUT_PATH)
      ? (JSON.parse(fs.readFileSync(OUT_PATH, "utf-8")) as { asOf?: string; facilities?: unknown[]; sourceFiles?: Record<string, string> })
      : null;
    if (previous?.facilities && facilities.length < previous.facilities.length * 0.9) {
      fail(`施設数が大きく減っています（前回 ${previous.facilities.length}件 → 今回 ${facilities.length}件）`);
    }
    // 自治体は基準日を変えずに資料を差し替えることがある。
    // 取り込み元のURLも同じときだけ、書き換えを見送る
    if (previous?.asOf === asOf && previous?.sourceFiles?.vacancy === link.url) {
      console.log(`公式データの時点が前回と同じ（${asOf}）のため更新はありません。`);
      return;
    }

    const zeroMark = symbolLegend.find((l) => !l.open)?.mark ?? "×";
    const notes = [
      `大崎市は空き状況を人数ではなく記号で公表しています。これは${targetLabel}入所選考後のもので、${asOf}時点のものです。`,
      `公式の凡例は ${symbolLegend.map((l) => `「${l.mark}」${l.label}`).join("、")} です。`,
      `公式の表で空らんになっている年齢は「—」にしています。空きがなければ「${zeroMark}」と書かれ、施設ごとの「入所対象児」とも一つずつ照らし合わせています。`,
      "施設ごとの「入所対象児」と「定員（全学齢）」は公式の表に載っているものをそのまま出しています。",
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
      subtitle: `${targetLabel}入所選考後の空き状況`,
      notes,
      wards: [] as string[],
      categories: [] as string[],
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
