/**
 * 松江市の保育所等の入所可能枠数を取り込む
 *
 * 実行: npm run vacancy:fetch:matsue
 *
 * ## この自治体の特徴
 * - **橋北地区と橋南地区で2つのPDF**に分かれている。両方を読んで1つにまとめる
 * - 施設は**公民館区**でまとめられている（25区）。これを区として持つ
 * - 値は空き枠数（人数）。**`-` は空き枠が0**（凡例には出てこないが、合計欄と
 *   施設の性質から分かる）。**斜線が引いてある欄は「年齢に入所定員がない」**ので「—」にする。
 *   `未定` は「空き枠数が未定」でこれも「—」にする
 * - **合計の列がある**ので、年齢ごとの数を足して照合できる（Python側で全施設ぶん確認）
 * - 時点は「8月25日時点」のように年が入っていないので、対象月から年を決める
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "matsue";
const MUNICIPALITY_NAME = "松江市";
const SOURCE_NAME = "松江市「入所可能枠数情報」";
const INDEX_URL =
  "https://www.city.matsue.lg.jp/soshikikarasagasu/kosodatebu_hoikushoyoutienka/2_1/3/hoikusyoannai/20267.html";
const AGE_COUNT = 6;
const MIN_FACILITIES = 60;
const UA = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const EXTRACTOR = path.join(process.cwd(), "scripts", "matsue-pdf-extract.py");

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
  asOf: [number, number];
  target: [number, number];
  legend: string[];
  printed: { sum: number; count: number; slash: number };
  rows: {
    area: string;
    ward: string;
    name: string;
    marks: (string | null)[];
    total: string | null;
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
  console.log(`${MUNICIPALITY_NAME}の入所可能枠数を取り込みます`);
  console.log(`公式ページ: ${INDEX_URL}\n`);

  const res = await fetch(INDEX_URL, { headers: { "User-Agent": UA } });
  if (!res.ok) fail(`公式ページが ${res.status} を返しました`);
  const html = await res.text();

  const links = [...html.matchAll(/<a[^>]+href="([^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => ({ url: new URL(m[1], INDEX_URL).toString(), text: toHalfWidth(squeeze(m[2])) }))
    .filter((l) => /^(橋北|橋南)地区/.test(l.text));
  if (links.length !== 2) {
    fail(`橋北・橋南のPDFが${links.length}件あります（2件のはず）`);
  }
  for (const link of links) console.log(`PDF: ${link.text}\n  ${link.url}`);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "matsue-vacancy-"));
  try {
    const files: string[] = [];
    for (const [index, link] of links.entries()) {
      const r = await fetch(link.url, { headers: { "User-Agent": UA } });
      if (!r.ok) fail(`PDFの取得に失敗しました（${r.status}）: ${link.url}`);
      const buf = Buffer.from(await r.arrayBuffer());
      if (buf.subarray(0, 4).toString() !== "%PDF") fail(`PDFではありません: ${link.url}`);
      const file = path.join(tmpDir, `matsue-${index}.pdf`);
      fs.writeFileSync(file, buf);
      files.push(file);
    }

    let pdf: PdfResult;
    try {
      pdf = JSON.parse(runPython([EXTRACTOR, ...files])) as PdfResult;
    } catch (err) {
      fail(`抽出結果を読めません: ${String(err)}`);
    }

    // 時点には年が入っていない。対象月より後の月なら前の年とみなす
    const [targetReiwa, targetMonth] = pdf.target;
    const [asOfMonth, asOfDay] = pdf.asOf;
    const asOfYear = reiwaToYear(targetReiwa) - (asOfMonth > targetMonth ? 1 : 0);
    const asOf = `${asOfYear}-${String(asOfMonth).padStart(2, "0")}-${String(asOfDay).padStart(2, "0")}`;
    if (!/^\d{4}-\d{2}-\d{2}$/.test(asOf)) fail(`時点の日付を組み立てられません: ${asOf}`);
    if (asOf > todayJst()) fail(`時点の日付（${asOf}）が今日より先になっています`);
    const targetLabel = `${reiwaToYear(targetReiwa)}年${targetMonth}月`;
    console.log(`時点: ${asOf} ／ 対象: ${targetLabel}入所`);

    const wards: string[] = [];
    const facilities: {
      id: string;
      name: string;
      w: number;
      c: null;
      vacancy: (number | null)[];
    }[] = [];
    const seen = new Set<string>();
    const areas = new Set<string>();
    let total = 0;
    let notOffered = 0;
    let undecided = 0;

    for (const row of pdf.rows) {
      const name = squeeze(row.name);
      if (!name) fail("施設名が空の行があります");
      if (seen.has(name)) fail(`施設名が重複しています: ${name}`);
      seen.add(name);
      areas.add(row.area);

      const ward = squeeze(row.ward);
      if (!ward) fail(`${name}: 公民館区が空です`);
      let w = wards.indexOf(ward);
      if (w < 0) {
        wards.push(ward);
        w = wards.length - 1;
      }

      const vacancy: (number | null)[] = [];
      let rowSum = 0;
      for (let age = 0; age < AGE_COUNT; age++) {
        const raw = row.marks[age];
        const value = raw === null ? "" : squeeze(raw);
        if (/^\d+$/.test(value)) {
          vacancy.push(Number(value));
          rowSum += Number(value);
          continue;
        }
        // 「-」は空き枠が0。斜線が引いてあって値のない欄はクラスがない
        if (value === "-" || value === "－") {
          vacancy.push(0);
          continue;
        }
        if (value === "未定") {
          undecided += 1;
          vacancy.push(null);
          continue;
        }
        if (value !== "") {
          fail(`${name}: ${age}歳の値を読めません（「${value}」）`);
        }
        notOffered += 1;
        vacancy.push(null);
      }

      // 検算: 行ごとの合計がPDFの合計の欄と合うか
      const printedTotal = row.total === null ? "" : squeeze(row.total);
      if (!/^\d+$/.test(printedTotal)) {
        fail(`${name}: 合計の欄を読めません（「${printedTotal}」）`);
      }
      if (rowSum !== Number(printedTotal)) {
        fail(`${name}: 合計が合いません（PDF ${printedTotal} / 足し算 ${rowSum}）`);
      }
      total += rowSum;

      facilities.push({ id: name, name, w, c: null, vacancy });
    }

    if (facilities.length < MIN_FACILITIES) {
      fail(`施設が${facilities.length}件しか取れていません（${MIN_FACILITIES}件以上のはず）`);
    }
    if (areas.size !== 2) fail(`地区が${areas.size}件です（橋北・橋南の2件のはず）`);

    // 検算: PDFに印字されている数字の合計と照合する
    if (total !== pdf.printed.sum) {
      fail(`空き枠数の合計が合いません（PDFの数字 ${pdf.printed.sum} / 取り込み ${total}）`);
    }
    // 検算: クラスがない欄の数が、PDFに引かれている斜線の数と合うか
    if (notOffered !== pdf.printed.slash) {
      fail(`斜線の欄の数が合いません（PDF ${pdf.printed.slash} / 取り込み ${notOffered}）`);
    }
    console.log(
      `各施設の合計はPDFの合計欄と一致し、全体の合計（${total}枠）と斜線の数（${notOffered}）も印字と一致しました`
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
    // 取り込み元の一式も同じときだけ、書き換えを見送る
    if (
      previous?.asOf === asOf &&
      JSON.stringify(previous?.sourceFiles ?? {}) === JSON.stringify({ vacancy: links[0].url, vacancy2: links[1].url })
    ) {
      console.log(`公式データの時点が前回と同じ（${asOf}）のため更新はありません。`);
      return;
    }

    const notes = [
      `松江市が公開しているのは${targetLabel}入所の空き枠数で、${asOf}時点のものです。`,
      "松江市は橋北地区と橋南地区に分けて公表しています。当サイトでは両方をまとめ、公民館区で絞り込めるようにしています。",
      "公式の表で斜線が引かれている欄は、その年齢に入所定員がないことを表しています。当サイトでは「—」にしています。",
      "公式の表の「-」は、定員のある年齢で空き枠がないことを表しています（合計の欄と合わせて読むと分かります）。当サイトでは0としています。",
      "空き枠数は入所申込の締切日までのあいだに変わることがあります。",
    ];

    const dataset = {
      municipalitySlug: MUNICIPALITY_SLUG,
      municipalityName: MUNICIPALITY_NAME,
      asOf,
      fetchedAt: todayJst(),
      sourceName: SOURCE_NAME,
      sourceUrl: INDEX_URL,
      sourceFiles: { vacancy: links[0].url, vacancy2: links[1].url },
      metrics: ["vacancy"],
      subtitle: `${targetLabel}入所の空き枠数`,
      notes,
      wards,
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
    console.log(`  ${facilities.length}施設 / ${wards.length}公民館区 / 空き${total}枠`);
    console.log(`  クラスがない欄: ${notOffered}${undecided ? ` / 未定: ${undecided}` : ""}`);
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

main().catch((err) => fail(String(err)));
