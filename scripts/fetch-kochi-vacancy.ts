/**
 * 高知市の教育・保育施設の欠員補充状況を取り込む
 *
 * 実行: npm run vacancy:fetch:kochi
 *
 * ## この自治体の特徴
 * - 欠員は人数で公表されている。空欄は0人、保育実施年齢の外はクラスなし
 * - **人数の代わりに「※」が入る欄がある**（備考に「4歳ゆとりあり」「要問合せ」）。
 *   人数が公表されていないので null にして、どの施設のことかを注記に出す
 * - 地区は縦結合。空なら1つ上の行から引き継ぐ
 * - 通し番号（No.）が1から連番で振られているので、取りこぼしの検算に使える
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "kochi";
const MUNICIPALITY_NAME = "高知市";
const SOURCE_NAME = "高知市「教育・保育施設一覧表（欠員補充状況一覧表）」";
const INDEX_URL = "https://www.city.kochi.kochi.jp/soshiki/34/ketsuinhojuu.html";
const AGE_COUNT = 6;
const UA = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";

const COL_WARD = 0;
const COL_NO = 1;
const COL_NAME = 2;
const COL_KIND = 3;
const COL_TARGET_AGE = 7;
const COL_AGE0 = 9;
const COL_NOTE = 15;

/** 人数の代わりに入る印。備考に意味が書かれている */
const UNKNOWN_MARK = "※";

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const EXTRACTOR = path.join(process.cwd(), "scripts", "kochi-pdf-extract.py");

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
  return (s ?? "").replace(/[\s　]/g, "");
}

function stripTags(html: string): string {
  return html.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").replace(/[\s　]+/g, " ").trim();
}

/** 「0歳～5歳」「0歳～5歳注６」から [下限, 上限] を取る */
function targetAges(raw: string): [number, number] | null {
  const t = toHalfWidth(squeeze(raw)).replace(/注[０-９\d一二三四五六七八九十]+$/, "");
  const m = t.match(/^(\d+)歳[～〜~](\d+)歳$/);
  if (!m) return null;
  const low = Number(m[1]);
  const high = Number(m[2]);
  if (low > high || high >= AGE_COUNT) return null;
  return [low, high];
}

type PdfResult = {
  target: [number, number];
  asOf: [number, number, number];
  wordSum: number;
  rows: string[][];
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
  console.log(`${MUNICIPALITY_NAME}の欠員補充状況を取り込みます`);
  console.log(`公式ページ: ${INDEX_URL}\n`);

  const res = await fetch(INDEX_URL, { headers: { "User-Agent": UA } });
  if (!res.ok) fail(`公式ページが ${res.status} を返しました`);
  const html = await res.text();

  // 「令和8年10月欠員補充状況一覧表」
  const links = [...html.matchAll(/<a[^>]+href="([^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => ({ url: new URL(m[1], INDEX_URL).toString(), text: toHalfWidth(stripTags(m[2])) }))
    .map((l) => {
      const m = squeeze(l.text).match(/令和(\d+)年(\d+)月欠員補充状況/);
      if (!m) return null;
      const reiwa = Number(m[1]);
      const month = Number(m[2]);
      return { ...l, reiwa, month, sortKey: reiwa * 100 + month };
    })
    .filter((v): v is NonNullable<typeof v> => v !== null);
  if (links.length === 0) fail("欠員補充状況のPDFが見つかりません。ページの構成が変わった可能性があります。");
  const latest = links.reduce((a, b) => (b.sortKey > a.sortKey ? b : a));
  console.log(`最新: ${latest.text}\n  ${latest.url}`);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "kochi-vacancy-"));
  try {
    const r = await fetch(latest.url, { headers: { "User-Agent": UA } });
    if (!r.ok) fail(`PDFの取得に失敗しました（${r.status}）: ${latest.url}`);
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.subarray(0, 4).toString() !== "%PDF") fail(`PDFではありません: ${latest.url}`);
    const file = path.join(tmpDir, "kochi.pdf");
    fs.writeFileSync(file, buf);

    let pdf: PdfResult;
    try {
      pdf = JSON.parse(runPython([EXTRACTOR, file])) as PdfResult;
    } catch (err) {
      fail(`抽出結果を読めません: ${String(err)}`);
    }

    const [targetReiwa, targetMonth] = pdf.target;
    if (targetReiwa !== latest.reiwa || targetMonth !== latest.month) {
      fail(
        `PDFの表題（令和${targetReiwa}年${targetMonth}月）がリンクの文言（令和${latest.reiwa}年${latest.month}月）と違います`
      );
    }
    const [ay, am, ad] = pdf.asOf;
    const asOf = `${2018 + ay}-${String(am).padStart(2, "0")}-${String(ad).padStart(2, "0")}`;
    if (asOf > todayJst()) fail(`最終更新日（${asOf}）が今日より先になっています`);
    console.log(`最終更新日: ${asOf} / 対象: ${targetMonth}月からの利用`);

    const wards: string[] = [];
    const categories: string[] = [];
    const facilities: {
      id: string;
      name: string;
      w: number;
      c: number;
      vacancy: (number | null)[];
    }[] = [];
    const unknowns: string[] = [];
    const seen = new Set<string>();
    const numbers: number[] = [];
    let ward = "";
    let noClass = 0;
    let total = 0;

    for (const row of pdf.rows) {
      const name = squeeze(row[COL_NAME]);
      if (!name) continue;
      const rawWard = squeeze(row[COL_WARD]);
      if (rawWard) ward = rawWard;
      if (!ward) fail(`${name}: 地区が分かりません`);
      if (!wards.includes(ward)) wards.push(ward);

      const kind = squeeze(row[COL_KIND]);
      if (!kind) fail(`${name}: 施設種別が空です`);
      if (!categories.includes(kind)) categories.push(kind);

      const no = Number(toHalfWidth(squeeze(row[COL_NO])));
      if (!Number.isInteger(no)) fail(`${name}: 通し番号を読めません: 「${row[COL_NO]}」`);
      numbers.push(no);

      const ages = targetAges(row[COL_TARGET_AGE]);
      if (!ages) fail(`${name}: 保育実施年齢を読めません: 「${row[COL_TARGET_AGE]}」`);
      const [low, high] = ages;

      if (seen.has(name)) fail(`施設名が重複しています: ${name}`);
      seen.add(name);

      const vacancy: (number | null)[] = [];
      let hasUnknown = false;
      for (let age = 0; age < AGE_COUNT; age++) {
        const raw = squeeze(row[COL_AGE0 + age] ?? "");
        const inRange = age >= low && age <= high;
        if (!inRange) {
          if (raw !== "") fail(`${name}: ${low}歳〜${high}歳の施設なのに、${age}歳に「${raw}」が入っています`);
          noClass += 1;
          vacancy.push(null);
          continue;
        }
        if (raw === "") {
          vacancy.push(0);
          continue;
        }
        if (raw === UNKNOWN_MARK) {
          // 人数が公表されていない欄。0（空きなし）と混ぜてはいけない
          hasUnknown = true;
          vacancy.push(null);
          continue;
        }
        const n = Number(toHalfWidth(raw));
        if (!Number.isInteger(n) || n < 0) fail(`${name}: ${age}歳の欄を読めません: 「${raw}」`);
        total += n;
        vacancy.push(n);
      }
      if (hasUnknown) {
        const note = squeeze(row[COL_NOTE]).replace(/^※/, "");
        if (!note) fail(`${name}: 「${UNKNOWN_MARK}」の意味が備考に書かれていません`);
        unknowns.push(`${name}（${note}）`);
      }

      facilities.push({
        id: `${no}`,
        name,
        w: wards.indexOf(ward),
        c: categories.indexOf(kind),
        vacancy,
      });
    }

    if (facilities.length < 100) fail(`施設が${facilities.length}件しか取れていません`);
    // 通し番号が1から連番なら、行を取りこぼしていない
    const sorted = [...numbers].sort((a, b) => a - b);
    for (let i = 0; i < sorted.length; i++) {
      if (sorted[i] !== i + 1) fail(`通し番号が連番になっていません（${i + 1}が見つかりません）`);
    }
    // 欄の位置がずれていないか、PDFに印字された数字の合計と突き合わせる
    if (total !== pdf.wordSum) {
      fail(`欠員の合計が合いません（PDFの印字 ${pdf.wordSum} / 取り込み ${total}）`);
    }
    console.log(`通し番号は1〜${sorted.length}の連番、欠員の合計${total}人はPDFの印字と一致しました`);

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
      `${targetMonth}月からの利用に向けた欠員（空き）の数です。募集人数は目安で、利用調整までに変わることがあります。`,
      "欠員があっても利用できない場合や、欠員がなくても利用できる場合があります。",
      "年齢はその年度の4月1日時点のものです。保育を実施していない歳児は「—」にしています。",
    ];
    if (unknowns.length > 0) {
      notes.push(
        `次の施設には、人数の代わりに「${UNKNOWN_MARK}」が入っている欄があります。当サイトでは人数が分からないものとして「—」にしています（かっこ内は公式の備考）: ${unknowns.join("、")}`
      );
    }

    const dataset = {
      municipalitySlug: MUNICIPALITY_SLUG,
      municipalityName: MUNICIPALITY_NAME,
      asOf,
      fetchedAt: todayJst(),
      sourceName: SOURCE_NAME,
      sourceUrl: INDEX_URL,
      sourceFiles: { vacancy: latest.url },
      metrics: ["vacancy"],
      subtitle: `${targetMonth}月からの利用に係る欠員補充状況`,
      notes,
      wards,
      categories,
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
    console.log(`  ${facilities.length}施設 / ${wards.length}地区 / ${categories.length}種別`);
    console.log(`  欠員の合計: ${total}人`);
    console.log(`  保育を実施していない歳児: ${noClass}`);
    if (unknowns.length > 0) {
      console.log(`  人数が公表されていない施設: ${unknowns.length}件`);
    }
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

main().catch((err) => fail(String(err)));
