/**
 * 尼崎市の保育施設等受入状況を取り込む
 *
 * 実行: npm run vacancy:fetch:amagasaki
 *
 * ## この自治体の特徴
 * - 記号は「×」0人、「△」1〜3人、「〇」4人以上。凡例が本文にはっきり書かれている
 * - **受入可能人数が0人なら「×」と書かれる**ので、空らんは0人ではなく
 *   その年齢の受け入れがないことを表す
 * - 本園と分園の施設名が1つのセルに2行で入っていることがある
 *   （「尼崎ひまわり保育園／〃 分園」）。分園は幼児だけを受けるなど、
 *   本園と受ける年齢が違う
 * - 「○」に U+25CB と U+3007 が混ざっている
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "amagasaki";
const MUNICIPALITY_NAME = "尼崎市";
const SOURCE_NAME = "尼崎市「保育施設等の受入状況(空き状況)」";
const INDEX_URL =
  "https://www.city.amagasaki.hyogo.jp/kosodate-kyoiku/service/hoikusyo/1040683.html";
const AGE_COUNT = 6;
const MIN_FACILITIES = 140;
const UA = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const EXTRACTOR = path.join(process.cwd(), "scripts", "amagasaki-pdf-extract.py");

/** 類型の記号。凡例の注記から読み取れるが、読めなかったときのために形も見る */
const TYPE_LABELS: Record<string, string> = {
  保: "保育所（園）",
  認: "認定こども園（1号認定を除く）",
  小: "小規模保育事業",
};
const OWNER_LABELS: Record<string, string> = { 公: "公立", 私: "私立" };

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
  target: [number, number, number];
  legend: { mark: string; label: string }[];
  notes: string[];
  markCounts: Record<string, number>;
  marksInText: Record<string, number>;
  blanks: number;
  rows: {
    area: string;
    type: string;
    owner: string;
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
  console.log(`${MUNICIPALITY_NAME}の空き状況を取り込みます`);
  console.log(`公式ページ: ${INDEX_URL}\n`);

  const res = await fetch(INDEX_URL, { headers: { "User-Agent": UA }, redirect: "follow" });
  if (!res.ok) fail(`公式ページが ${res.status} を返しました`);
  const html = await res.text();
  const flat = toHalfWidth(squeeze(html));

  // ページ本文の「（令和8年8月25日現在）」が、この一覧の時点
  const asOfMatch = /保育施設等受入状況[（(]令和(\d+)年(\d+)月(\d+)日現在[）)]/.exec(flat);
  if (!asOfMatch) fail("「保育施設等受入状況（令和N年M月D日現在）」を読み取れませんでした");
  const asOf = `${reiwaToYear(Number(asOfMatch[1]))}-${asOfMatch[2].padStart(2, "0")}-${asOfMatch[3].padStart(2, "0")}`;
  if (asOf > todayJst()) fail(`時点の日付（${asOf}）が今日より先になっています`);

  const links = [...html.matchAll(/<a[^>]+href="([^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => ({
      url: new URL(m[1], res.url || INDEX_URL).toString(),
      text: toHalfWidth(squeeze(m[2])),
    }))
    .filter((l) => /保育施設等受入状況/.test(l.text));
  if (links.length === 0) fail("受入状況のPDFが見つかりません");
  const link = links[0];
  console.log(`PDF: ${link.text}\n  ${link.url}`);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "amagasaki-vacancy-"));
  try {
    const r = await fetch(link.url, { headers: { "User-Agent": UA } });
    if (!r.ok) fail(`PDFの取得に失敗しました（${r.status}）: ${link.url}`);
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.subarray(0, 4).toString() !== "%PDF") fail(`PDFではありません: ${link.url}`);
    const file = path.join(tmpDir, "amagasaki.pdf");
    fs.writeFileSync(file, buf);

    let pdf: PdfResult;
    try {
      pdf = JSON.parse(runPython([EXTRACTOR, file])) as PdfResult;
    } catch (err) {
      fail(`抽出結果を読めません: ${String(err)}`);
    }

    const targetLabel = `${reiwaToYear(pdf.target[0])}年${pdf.target[1]}月${pdf.target[2]}日`;
    console.log(`時点: ${asOf} ／ 対象: ${targetLabel}`);

    const symbolLegend = pdf.legend.map((l) => ({
      mark: squeeze(l.mark),
      label: squeeze(l.label),
      open: !/^0人$/.test(squeeze(l.label)),
    }));
    if (symbolLegend.length !== 3) fail(`凡例が${symbolLegend.length}件です（3件のはず）`);
    if (!symbolLegend.some((l) => l.open)) fail("空きありの記号が凡例にありません");
    console.log(`凡例: ${symbolLegend.map((l) => `${l.mark}＝${l.label}`).join(" / ")}`);
    const known = new Set(symbolLegend.map((l) => l.mark));

    const wards: string[] = [];
    const categories: string[] = [];
    const facilities: {
      id: string;
      name: string;
      w: number;
      c: number;
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
      const address = squeeze(row.address);
      if (!address) fail(`${name}: 所在地が空です`);
      // 「きらきら保育園」のように同じ名前の別の園があるので、所在地を足して一意にする
      const id = `${name}｜${address}`;
      if (seen.has(id)) fail(`施設名と所在地が重複しています: ${id}`);
      seen.add(id);

      const area = squeeze(row.area);
      if (!area) fail(`${name}: 地区が空です`);
      let w = wards.indexOf(area);
      if (w < 0) {
        wards.push(area);
        w = wards.length - 1;
      }

      const typeMark = squeeze(row.type);
      const ownerMark = squeeze(row.owner);
      const typeLabel = TYPE_LABELS[typeMark];
      const ownerLabel = OWNER_LABELS[ownerMark];
      if (!typeLabel) fail(`${name}: 類型「${typeMark}」が分かりません`);
      if (!ownerLabel) fail(`${name}: 設置「${ownerMark}」が分かりません`);
      const category = `${ownerLabel}${typeLabel}`;
      let c = categories.indexOf(category);
      if (c < 0) {
        categories.push(category);
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
        if (!known.has(mark)) fail(`${name}: ${age}歳が凡例にない記号です（「${mark}」）`);
        marks.set(mark, (marks.get(mark) ?? 0) + 1);
        symbols.push(mark);
      }

      facilities.push({
        id,
        name,
        w,
        c,
        vacancy: new Array(AGE_COUNT).fill(null),
        symbols,
        note: `所在地: ${address}`,
      });
    }

    if (facilities.length < MIN_FACILITIES) {
      fail(`施設が${facilities.length}件しか取れていません（${MIN_FACILITIES}件以上のはず）`);
    }
    // 検算1: 記号の数が、表の中の文字を数えた数と合うか
    for (const [mark, count] of marks) {
      if (count !== pdf.marksInText[mark]) {
        fail(`「${mark}」の数が合いません（表の文字 ${pdf.marksInText[mark]}個 / 取り込み ${count}個）`);
      }
    }
    if (Object.keys(pdf.marksInText).length !== marks.size) {
      fail(`表の中に凡例にない記号があります（${Object.keys(pdf.marksInText).join("、")}）`);
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
      `${facilities.length}施設 ／ ${[...marks].map(([m, n]) => `${m}${n}`).join("・")}・クラスなし${notOffered}`,
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
      `尼崎市は空き状況を人数ではなく記号で公表しています。これは${targetLabel}の受入状況で、${asOf}時点のものです。`,
      `公式の凡例は ${symbolLegend.map((l) => `「${l.mark}」${l.label}`).join("、")} です。`,
      `公式の表で空らんになっている年齢は「—」にしています。受入可能人数が0人なら「${zeroMark}」と書かれるので、空らんはその年齢の受け入れがないことを表します。`,
      "分園は本園と受け入れる年齢が違うことがあります。",
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
      subtitle: `${targetLabel}の受入状況`,
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
    console.log(`  ${facilities.length}施設 / ${wards.length}地区 / ${categories.length}類型`);
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

main().catch((err) => fail(String(err)));
