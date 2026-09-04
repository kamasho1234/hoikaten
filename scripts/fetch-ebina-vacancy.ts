/**
 * 海老名市の保育所途中入所の受入予定数を取り込む
 *
 * 実行: npm run vacancy:fetch:ebina
 *
 * ## この自治体の特徴
 * - 受入予定数は人数。いちばん下に合計の行があるので列ごとに検算できる
 * - **空らんが2種類ある**。セルに斜線があれば「その年齢の受け入れをしていない」、
 *   斜線がなければ「受入予定数が0」。斜線の意味は公式に書かれていないが、
 *   小規模保育の3〜5歳・幼稚園の0〜2歳・廃園予定の園の低年齢に付いており、
 *   施設案内と突き合わせて確かめた（門沢橋保育園は令和10年3月に廃園）
 * - 入所待ち人数（延べ）も公表しているが**年齢別ではない**ので、当サイトでは持たない
 * - PDFのファイル名も文言も更新のたびに変わる。リンクの文言から月と時点を読む
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "ebina";
const MUNICIPALITY_NAME = "海老名市";
const SOURCE_NAME = "海老名市「保育所途中入所における受入予定数」";
const INDEX_URL = "https://www.city.ebina.kanagawa.jp/guide/kosodate/hoikuen/1014723.html";
const AGE_COUNT = 6;
const MIN_FACILITIES = 40;
const UA = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const EXTRACTOR = path.join(process.cwd(), "scripts", "ebina-pdf-extract.py");

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

/** 年度と月から西暦の年を出す（年度は4月始まり） */
function yearOf(fiscalReiwa: number, month: number): number {
  return 2018 + fiscalReiwa + (month >= 4 ? 0 : 1);
}

type PdfResult = {
  target: [number, number];
  notes: string[];
  totals: number[];
  slashes: number;
  zeros: number;
  rows: { name: string; counts: (number | null)[]; waiting: number | null }[];
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
  console.log(`${MUNICIPALITY_NAME}の受入予定数を取り込みます`);
  console.log(`公式ページ: ${INDEX_URL}\n`);

  const res = await fetch(INDEX_URL, { headers: { "User-Agent": UA } });
  if (!res.ok) fail(`公式ページが ${res.status} を返しました`);
  const html = await res.text();

  // 「令和8年度10月入所受入予定数（8月24日時点）」。時点は最新のぶんにしか付かない
  const links = [...html.matchAll(/<a[^>]+href="([^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => ({ url: new URL(m[1], INDEX_URL).toString(), text: toHalfWidth(squeeze(m[2])) }))
    .map((l) => {
      const m = l.text.match(/令和(\d+)年度(\d+)月入所受入予定数/);
      if (!m) return null;
      const [reiwa, month] = m.slice(1, 3).map(Number);
      const asOfMatch = l.text.match(/（(\d+)月(\d+)日時点）/);
      return {
        ...l,
        reiwa,
        month,
        asOfMonth: asOfMatch ? Number(asOfMatch[1]) : null,
        asOfDay: asOfMatch ? Number(asOfMatch[2]) : null,
        // 年度の途中で年をまたぐので、4月始まりの並びにする
        sortKey: reiwa * 100 + (month >= 4 ? month : month + 12),
      };
    })
    .filter((v): v is NonNullable<typeof v> => v !== null);
  if (links.length === 0)
    fail("受入予定数のPDFが見つかりません。ページの構成が変わった可能性があります。");
  const latest = links.reduce((a, b) => (b.sortKey > a.sortKey ? b : a));
  console.log(`最新: ${latest.text}\n  ${latest.url}`);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "ebina-vacancy-"));
  try {
    const r = await fetch(latest.url, { headers: { "User-Agent": UA } });
    if (!r.ok) fail(`PDFの取得に失敗しました（${r.status}）: ${latest.url}`);

    // 時点はリンクの文言から取る。付いていなければPDFの公開日（Last-Modified）を使う
    let asOf: string;
    let asOfFrom: string;
    if (latest.asOfMonth !== null && latest.asOfDay !== null) {
      const year = yearOf(latest.reiwa, latest.asOfMonth);
      asOf = `${year}-${String(latest.asOfMonth).padStart(2, "0")}-${String(latest.asOfDay).padStart(2, "0")}`;
      asOfFrom = "リンクの文言";
    } else {
      const lastModified = r.headers.get("last-modified");
      if (!lastModified) {
        fail("リンクに時点がなく、PDFの Last-Modified もありません。時点を決められません。");
      }
      const modified = new Date(lastModified);
      if (Number.isNaN(modified.getTime())) fail(`Last-Modified を読めません: 「${lastModified}」`);
      asOf = new Date(modified.getTime() + 9 * 60 * 60 * 1000).toISOString().slice(0, 10);
      asOfFrom = "PDFの公開日";
    }
    if (asOf > todayJst()) fail(`時点（${asOf}）が今日より先になっています`);

    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.subarray(0, 4).toString() !== "%PDF") fail(`PDFではありません: ${latest.url}`);
    const file = path.join(tmpDir, "ebina.pdf");
    fs.writeFileSync(file, buf);

    let pdf: PdfResult;
    try {
      pdf = JSON.parse(runPython([EXTRACTOR, file])) as PdfResult;
    } catch (err) {
      fail(`抽出結果を読めません: ${String(err)}`);
    }

    const [targetReiwa, targetMonth] = pdf.target;
    if (targetMonth !== latest.month) {
      fail(`PDFの入所月（${targetMonth}月）がリンクの文言（${latest.month}月）と違います`);
    }
    const targetYear = yearOf(targetReiwa, targetMonth);
    console.log(`時点: ${asOf}（${asOfFrom}）／${targetYear}年${targetMonth}月入所ぶん`);

    const facilities: {
      id: string;
      name: string;
      w: null;
      c: null;
      vacancy: (number | null)[];
    }[] = [];
    const seen = new Set<string>();
    const sums = new Array(AGE_COUNT).fill(0);
    let noClass = 0;

    for (const row of pdf.rows) {
      const name = squeeze(row.name);
      if (!name) fail("施設名が空の行があります");
      if (seen.has(name)) fail(`施設名が重複しています: ${name}`);
      seen.add(name);

      for (let age = 0; age < AGE_COUNT; age++) {
        const v = row.counts[age];
        if (v === null) {
          noClass += 1;
          continue;
        }
        if (v < 0) fail(`${name}: ${age}歳の人数が負の数です`);
        sums[age] += v;
      }
      if (row.counts.every((v) => v === null)) fail(`${name}: 全てのクラスが受け入れなしです`);

      facilities.push({ id: name, name, w: null, c: null, vacancy: row.counts });
    }

    if (facilities.length < MIN_FACILITIES) {
      fail(`施設が${facilities.length}件しか取れていません（${MIN_FACILITIES}件以上のはず）`);
    }
    if (noClass !== pdf.slashes) {
      fail(`斜線の欄の数が合いません（PDF ${pdf.slashes} / 取り込み ${noClass}）`);
    }

    // 検算: 列ごとの和がいちばん下の合計の行と合うか
    for (let age = 0; age < AGE_COUNT; age++) {
      if (sums[age] !== pdf.totals[age]) {
        fail(`${age}歳の合計が合いません（合計行 ${pdf.totals[age]} / 足し算 ${sums[age]}）`);
      }
    }
    const total = sums.reduce((a: number, b: number) => a + b, 0);
    console.log(`列ごとの合計が公式の合計の行と一致しました（受入予定数 ${total}）`);

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
      console.log(`公式データの時点が前回と同じ（${asOf}）のため更新はありません。`);
      return;
    }

    const notes = [
      `海老名市は${targetYear}年${targetMonth}月入所ぶんの受入予定数を公表しています。これは${asOf}時点のものです。`,
      ...pdf.notes,
      "公式の表では、その年齢の受け入れをしていないらん（クラスがない、または募集を止めている）に斜線が引かれています。当サイトではそのらんを「—」にしています。空らんは受入予定数が0です。",
      "公式の表には施設ごとの入所待ち人数（延べ）も載っていますが、年齢別に分かれていないため当サイトでは掲載していません。",
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
      subtitle: `${targetYear}年${targetMonth}月入所ぶんの受入予定数`,
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
    console.log(`  受け入れをしていないらん（斜線）: ${noClass}`);
    console.log(`  年齢ごとの受入予定数: ${sums.join(" / ")}`);
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

main().catch((err) => fail(String(err)));
