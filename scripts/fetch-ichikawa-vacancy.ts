/**
 * 市川市の公立・私立保育園等の空き状況を取り込む
 *
 * 実行: npm run vacancy:fetch:ichikawa
 *
 * ## この自治体の特徴
 * - **募集人員が負の数になることがある**（「-2」＝定員を2人超えて受け入れている）。
 *   空き枠としては0なので0にし、定員超過だった施設を注記に出す
 * - 行政区域が2段（北部地区・中部地区・南部地区／大柏・宮久保…）。
 *   **1段目には「小規模保育所」のように施設の種類が入る**ので、
 *   1段目を施設類型、2段目を地域として扱う
 * - どちらの段も縦に結合されていて、変わるときだけ値が入る
 * - 空欄はそのクラスの受け入れがない
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "ichikawa";
const MUNICIPALITY_NAME = "市川市";
const SOURCE_NAME = "市川市「公立・私立保育園等の空き状況」";
const INDEX_URL = "https://www.city.ichikawa.lg.jp/page/3705.html";
const AGE_COUNT = 6;
/** 1段目のうち、地区ではなく施設の種類を表すもの */
const AREA_LABELS = ["北部地区", "中部地区", "南部地区"];

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const EXTRACTOR = path.join(process.cwd(), "scripts", "ichikawa-pdf-extract.py");

function fail(message: string): never {
  console.error(`\n[中断] ${message}`);
  process.exit(1);
}

function todayJst(): string {
  const jst = new Date(Date.now() + 9 * 60 * 60 * 1000);
  return jst.toISOString().slice(0, 10);
}

function reiwaToYear(reiwa: number): number {
  return 2018 + reiwa;
}

function toHalfWidth(s: string): string {
  return s.replace(/[０-９]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xfee0));
}

function stripTags(html: string): string {
  return html.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();
}

function squeeze(s: string): string {
  return (s ?? "").replace(/[\s　]/g, "");
}

type PdfTable = { head: string[]; rows: string[][] };
type PdfResult = { asOf: number[][]; tables: PdfTable[] };

function runPython(args: string[]): string {
  const candidates = process.env.PYTHON ? [process.env.PYTHON] : ["python3", "python"];
  let lastError = "";
  for (const bin of candidates) {
    try {
      return execFileSync(bin, args, { encoding: "utf-8", maxBuffer: 64 * 1024 * 1024 });
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

  const ua = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";
  const res = await fetch(INDEX_URL, { headers: { "User-Agent": ua } });
  if (!res.ok) fail(`公式ページが ${res.status} を返しました`);
  const html = await res.text();

  const links = [...html.matchAll(/<a[^>]+href="([^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => ({ url: new URL(m[1], INDEX_URL).toString(), text: toHalfWidth(stripTags(m[2])) }))
    .filter((l) => /公立・私立保育施設等の空き状況|公立・私立保育園等の空き状況/.test(l.text));
  if (links.length !== 1) {
    fail(`空き状況のPDFリンクが${links.length}本あります（1本のはず）: ${links.map((l) => l.text).join(" / ")}`);
  }
  const latest = links[0];
  console.log(`最新: ${latest.text}\n  ${latest.url}`);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "ichikawa-vacancy-"));
  try {
    const r = await fetch(latest.url, { headers: { "User-Agent": ua } });
    if (!r.ok) fail(`PDFの取得に失敗しました（${r.status}）: ${latest.url}`);
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.subarray(0, 4).toString() !== "%PDF") fail(`PDFではありません: ${latest.url}`);
    const file = path.join(tmpDir, "ichikawa.pdf");
    fs.writeFileSync(file, buf);

    let pdf: PdfResult;
    try {
      pdf = JSON.parse(runPython([EXTRACTOR, file])) as PdfResult;
    } catch (err) {
      fail(`抽出結果を読めません: ${String(err)}`);
    }

    if (pdf.asOf.length !== 1) fail(`PDFに基準日が${pdf.asOf.length}種類あります`);
    const [ay, am, ad] = pdf.asOf[0];
    const asOf = `${reiwaToYear(ay)}-${String(am).padStart(2, "0")}-${String(ad).padStart(2, "0")}`;
    console.log(`基準日: ${asOf}`);

    const wards: string[] = [];
    const categories: string[] = [];
    const facilities: {
      id: string;
      name: string;
      w: number;
      c: number;
      vacancy: (number | null)[];
    }[] = [];
    const seenId = new Set<string>();
    const overCapacity: string[] = [];
    const notesInTable: string[] = [];
    let group = "";
    let area = "";

    for (const table of pdf.tables) {
      const head = table.head.map((h) => squeeze(h));
      const nameIdx = head.indexOf("保育園名");
      const capacityIdx = head.indexOf("定員");
      if (nameIdx < 0 || capacityIdx < 0) fail(`見出しが想定と違います: ${table.head.join(" / ")}`);
      // 年齢の見出しは2行目に入る
      const ageIdx = Array.from({ length: AGE_COUNT }, (_, i) =>
        table.rows[0].findIndex((c) => toHalfWidth(squeeze(c)) === `${i}歳`)
      );
      if (ageIdx.some((i) => i < 0)) fail(`年齢の見出しが足りません: ${table.rows[0].join(" / ")}`);

      for (const row of table.rows.slice(1)) {
        // 1段目・2段目とも縦に結合されていて、変わるときだけ値が入る
        if (squeeze(row[0] ?? "")) group = squeeze(row[0]);
        if (squeeze(row[1] ?? "")) area = squeeze(row[1]);
        const name = (row[nameIdx] ?? "").replace(/[　\s]+/g, "").trim();
        if (!name) continue;
        // **ページの下の注記が保育園名の列にまぎれる**。定員が入っていないので見分けられる
        const capacity = squeeze(row[capacityIdx] ?? "");
        if (!/^\d+$/.test(toHalfWidth(capacity))) {
          notesInTable.push(name);
          continue;
        }
        if (!group || !area) fail(`${name}: 行政区域が分かりません`);

        // 1段目が「北部地区」などなら地区、そうでなければ施設の種類（小規模保育所など）
        const isArea = AREA_LABELS.includes(group);
        const category = isArea ? "保育園" : group;
        if (!wards.includes(area)) wards.push(area);
        if (!categories.includes(category)) categories.push(category);

        const vacancy: (number | null)[] = [];
        for (const [age, col] of ageIdx.entries()) {
          const raw = squeeze(row[col] ?? "");
          if (raw === "") {
            vacancy.push(null);
            continue;
          }
          const t = toHalfWidth(raw).replace(/[−ー–—]/g, "-");
          if (!/^-?\d+$/.test(t)) fail(`${name}: ${age}歳児を人数として読めません: 「${raw}」`);
          const n = Number(t);
          if (n < 0) {
            // 定員を超えて受け入れている。空き枠としては0
            overCapacity.push(`${name}（${age}歳児 ${n}）`);
            vacancy.push(0);
            continue;
          }
          vacancy.push(n);
        }

        const id = `${area}-${name}`;
        if (seenId.has(id)) fail(`施設名が重複しています: ${id}`);
        seenId.add(id);
        facilities.push({
          id,
          name,
          w: wards.indexOf(area),
          c: categories.indexOf(category),
          vacancy,
        });
      }
    }

    if (facilities.length < 150) fail(`施設が${facilities.length}件しか取れていません`);

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
    if (previous?.asOf === asOf && previous?.sourceFiles?.vacancy === latest.url) {
      console.log(`公式データの時点が前回と同じ（${asOf}）のため更新はありません。`);
      return;
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
      notes: [
        "市川市が「暫定」として公表している募集人員です。",
        `公式の表では定員を超えて受け入れているクラスが負の数で書かれています（${overCapacity.length}クラス）。当サイトでは空き枠としては0人なので0で示しています。`,
        "行政区域の1段目に「小規模保育所」のような施設の種類が入るため、当サイトではそれを施設類型として扱っています。",
      ],
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

    const ageTotals = Array.from({ length: AGE_COUNT }, (_, age) =>
      facilities.reduce((acc, f) => acc + (f.vacancy[age] ?? 0), 0)
    );
    console.log(`書き出しました: ${path.relative(process.cwd(), OUT_PATH)}`);
    console.log(`  データ時点: ${asOf}`);
    console.log(`  定員を超えて受け入れているクラス（0にした）: ${overCapacity.length}件`);
    console.log(`  保育園名の列に入っていた注記（施設ではないので除外）: ${notesInTable.length}件`);
    console.log("");
    console.log(`  地域 ${wards.length}件 / 類型 ${categories.join("・")}`);
    console.log("");
    console.log("  年齢 | 空き");
    ageTotals.forEach((v, age) => console.log(`  ${age}歳児 | ${v}`));
    console.log(`  合計 | ${ageTotals.reduce((a, b) => a + b, 0)}`);
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

main().catch((err) => fail(String(err)));
