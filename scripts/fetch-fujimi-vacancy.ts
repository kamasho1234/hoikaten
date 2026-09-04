/**
 * 富士見市の保育施設の受入可能状況を取り込む
 *
 * 実行: npm run vacancy:fetch:fujimi
 *
 * ## この自治体の特徴
 * - 空きは人数。値は3種類で、**意味はページ本文に明記されている**
 *   （「保無 ⇒保育未実施、 --- ⇒空きなし」）
 * - いちばん下に合計の行があるので、行ごと・列ごとの両方で検算できる
 * - 過去の月ぶんのPDFも並んでいるので、リンクの文言から最新を選ぶ
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "fujimi";
const MUNICIPALITY_NAME = "富士見市";
const SOURCE_NAME = "富士見市「各施設の受入可能状況」";
const INDEX_URL =
  "https://www.city.fujimi.saitama.jp/kosodate_kyoiku/kosodate_oen/yochien_hoikusho/hoikusho/hoikusyonyusyo/akijoukyou.html";
const AGE_COUNT = 6;
const MIN_FACILITIES = 30;
const UA = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const EXTRACTOR = path.join(process.cwd(), "scripts", "fujimi-pdf-extract.py");

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

type PdfResult = {
  asOf: [number, number];
  totals: { byAge: (number | null)[]; total: number | null };
  notOffered: number;
  rows: { name: string; counts: (number | null)[]; total: number | null }[];
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
  console.log(`${MUNICIPALITY_NAME}の受入可能状況を取り込みます`);
  console.log(`公式ページ: ${INDEX_URL}\n`);

  const res = await fetch(INDEX_URL, { headers: { "User-Agent": UA } });
  if (!res.ok) fail(`公式ページが ${res.status} を返しました`);
  const html = await res.text();

  // 「令和8年8月利用調整終了時点」。過去の月のぶんも並んでいる
  const links = [...html.matchAll(/<a[^>]+href="([^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => ({ url: new URL(m[1], INDEX_URL).toString(), text: toHalfWidth(squeeze(m[2])) }))
    .map((l) => {
      const m = l.text.match(/令和(\d+)年(\d+)月(?:(\S*?)利用調整|利用調整)終了時点/);
      if (!m) return null;
      const [reiwa, month] = m.slice(1, 3).map(Number);
      // 年度は4月始まりなので1〜3月は後ろに並べる
      return { ...l, reiwa, month, sortKey: reiwa * 100 + (month >= 4 ? month : month + 12) };
    })
    .filter((v): v is NonNullable<typeof v> => v !== null);
  if (links.length === 0)
    fail("受入可能状況のPDFが見つかりません。ページの構成が変わった可能性があります。");
  const latest = links.reduce((a, b) => (b.sortKey > a.sortKey ? b : a));
  console.log(`最新: ${latest.text}\n  ${latest.url}`);

  // ページ本文に書かれている値の意味を確かめる（勝手に決めつけないため）
  const plain = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
  if (!plain.includes("保無") || !plain.includes("保育未実施")) {
    fail("ページに「保無 ⇒保育未実施」の説明が見つかりません。値の意味が変わった可能性があります。");
  }

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "fujimi-vacancy-"));
  try {
    const r = await fetch(latest.url, { headers: { "User-Agent": UA } });
    if (!r.ok) fail(`PDFの取得に失敗しました（${r.status}）: ${latest.url}`);

    // 基準日は「令和8年8月調整終了時点」までしか分からないので、PDFの公開日も見ておく
    const lastModified = r.headers.get("last-modified");
    if (!lastModified) fail("PDFの Last-Modified ヘッダがありません。時点を決められません。");
    const modified = new Date(lastModified);
    if (Number.isNaN(modified.getTime())) fail(`Last-Modified を読めません: 「${lastModified}」`);
    const asOf = new Date(modified.getTime() + 9 * 60 * 60 * 1000).toISOString().slice(0, 10);
    if (asOf > todayJst()) fail(`PDFの公開日（${asOf}）が今日より先になっています`);

    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.subarray(0, 4).toString() !== "%PDF") fail(`PDFではありません: ${latest.url}`);
    const file = path.join(tmpDir, "fujimi.pdf");
    fs.writeFileSync(file, buf);

    let pdf: PdfResult;
    try {
      pdf = JSON.parse(runPython([EXTRACTOR, file])) as PdfResult;
    } catch (err) {
      fail(`抽出結果を読めません: ${String(err)}`);
    }

    const [adjustReiwa, adjustMonth] = pdf.asOf;
    if (adjustReiwa !== latest.reiwa || adjustMonth !== latest.month) {
      fail(
        `PDFの調整月（令和${adjustReiwa}年${adjustMonth}月）がリンクの文言（令和${latest.reiwa}年${latest.month}月）と違います`
      );
    }
    const adjustYear = 2018 + adjustReiwa;
    console.log(`PDFの公開日: ${asOf}（${adjustYear}年${adjustMonth}月の利用調整が終わった時点）`);

    const facilities: {
      id: string;
      name: string;
      w: null;
      c: null;
      vacancy: (number | null)[];
    }[] = [];
    const seen = new Set<string>();
    const sums = new Array(AGE_COUNT).fill(0);
    let notOffered = 0;

    for (const row of pdf.rows) {
      const name = squeeze(row.name);
      if (!name) fail("施設名が空の行があります");
      if (seen.has(name)) fail(`施設名が重複しています: ${name}`);
      seen.add(name);

      let rowTotal = 0;
      for (let age = 0; age < AGE_COUNT; age++) {
        const v = row.counts[age];
        if (v === null) {
          notOffered += 1;
          continue;
        }
        if (v < 0) fail(`${name}: ${age}歳児の人数が負の数です`);
        rowTotal += v;
        sums[age] += v;
      }
      if (row.counts.every((v) => v === null)) fail(`${name}: 全てのクラスが保育未実施です`);

      // 検算1: 行ごとの和がその行の合計欄と合うか
      if (row.total !== null && rowTotal !== row.total) {
        fail(`${name}: 合計が合いません（欄 ${row.total} / 足し算 ${rowTotal}）`);
      }

      facilities.push({ id: name, name, w: null, c: null, vacancy: row.counts });
    }

    if (facilities.length < MIN_FACILITIES) {
      fail(`施設が${facilities.length}件しか取れていません（${MIN_FACILITIES}件以上のはず）`);
    }
    if (notOffered !== pdf.notOffered) {
      fail(`保育未実施のらんの数が合いません（PDF ${pdf.notOffered} / 取り込み ${notOffered}）`);
    }

    // 検算2: 列ごとの和がいちばん下の合計の行と合うか
    for (let age = 0; age < AGE_COUNT; age++) {
      const t = pdf.totals.byAge[age];
      if (t === null) fail(`合計の行の${age}歳児が数ではありません`);
      if (sums[age] !== t) {
        fail(`${age}歳児の合計が合いません（合計行 ${t} / 足し算 ${sums[age]}）`);
      }
    }
    const total = sums.reduce((a: number, b: number) => a + b, 0);
    if (pdf.totals.total !== null && total !== pdf.totals.total) {
      fail(`総合計が合いません（合計行 ${pdf.totals.total} / 足し算 ${total}）`);
    }
    console.log(`行ごと・列ごと・総合計の3通りで数が合いました（空き ${total}人）`);

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
    if (
      previous?.asOf === asOf &&
      previous?.sourceFiles?.vacancy === latest.url &&
      JSON.stringify(previous?.facilities ?? null) === JSON.stringify(facilities)
    ) {
      console.log(`PDFの公開日が前回と同じ（${asOf}）のため更新はありません。`);
      return;
    }

    const notes = [
      `富士見市は${adjustYear}年${adjustMonth}月の利用調整が終わった時点の受入可能状況を公表しています。`,
      "公式の表では、空きがない場合は「---」、そのクラスの保育をしていない場合は「保無（保育未実施）」と書かれています。当サイトでは前者を0人、後者を「—」にしています。",
      "この表は入所選考終了時点までのものであり、内定辞退や急な退園等は反映していません。",
      "富士見市はこの表に基準日を書いていないため、公式サイトでPDFが公開された日を時点として表示しています。",
    ];

    const dataset = {
      municipalitySlug: MUNICIPALITY_SLUG,
      municipalityName: MUNICIPALITY_NAME,
      asOf,
      fetchedAt: todayJst(),
      sourceName: SOURCE_NAME,
      sourceUrl: INDEX_URL,
      sourceFiles: { vacancy: latest.url },
      metrics: ["vacancy"],
      subtitle: `${adjustYear}年${adjustMonth}月の利用調整が終わった時点の空き`,
      notes,
      wards: [],
      categories: [],
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
    console.log(`  保育未実施のらん: ${notOffered}`);
    console.log(`  年齢ごとの空き: ${sums.join(" / ")}（合計 ${total}）`);
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

main().catch((err) => fail(String(err)));
