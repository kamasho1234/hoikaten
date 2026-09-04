/**
 * 立川市の保育施設の募集人数を取り込む
 *
 * 実行: npm run vacancy:fetch:tachikawa
 *
 * ## この自治体の特徴
 * - **1ページに表が5つ**。認可保育園は左右2段組で2つ、ほかに認定こども園・
 *   家庭的保育・小規模保育の表が並ぶ
 * - **施設の種類の見出しが前の表の行の右端に置かれる**（小平市と同じ形）ので、
 *   数行さかのぼって行の末尾が種類名で終わるものを見出しとみなす
 * - 施設名に均等割付の空白が入る（「羽 衣」「上 砂」）ので詰める。
 *   また「柴崎にじのいろ（旧：柴崎）」のように旧名が改行で続くことがある
 * - **人数のかわりに「施設にご確認ください」と書かれる**クラスがある。「—」にして注記に出す
 * - 空欄は募集なし
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "tachikawa";
const MUNICIPALITY_NAME = "立川市";
const SOURCE_NAME = "立川市「保育施設ごとの募集人数一覧」";
const INDEX_URL =
  "https://www.city.tachikawa.lg.jp/kosodate/m-kosodate/1004946/1005097/1005184.html";
const AGE_COUNT = 6;

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const EXTRACTOR = path.join(process.cwd(), "scripts", "tachikawa-pdf-extract.py");

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

type PdfTable = { section: string; head: string[]; rows: string[][] };
type PdfResult = { target: number[][]; tables: PdfTable[] };

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

const KNOWN_SECTIONS = ["認可保育園", "認定こども園", "家庭的保育", "小規模保育", "事業所内保育"];

function categoryOf(section: string): string {
  const s = squeeze(section);
  for (const label of KNOWN_SECTIONS) {
    // 「認定こども園（２・３号認定）」のように括弧が続くことがある
    const m = s.match(new RegExp(`${label}(（[^）]*）)?$`));
    if (m) return label;
  }
  fail(`施設の種類が分かりません: 「${section}」`);
}

async function main() {
  console.log(`${MUNICIPALITY_NAME}の募集人数を取り込みます`);
  console.log(`公式ページ: ${INDEX_URL}\n`);

  const ua = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";
  const res = await fetch(INDEX_URL, { headers: { "User-Agent": ua } });
  if (!res.ok) fail(`公式ページが ${res.status} を返しました`);
  const html = await res.text();

  // 「令和8年度9月の募集人数 （PDF 164.0 KB）」。4月は一次・二次がある
  const links = [...html.matchAll(/<a[^>]+href="([^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => ({ url: new URL(m[1], INDEX_URL).toString(), text: toHalfWidth(stripTags(m[2])) }))
    .map((l) => {
      const m = l.text.match(/令和(\d+)年度(\d+)月(?:(一|二)次)?の募集人数/);
      if (!m) return null;
      const fiscalYear = reiwaToYear(Number(m[1]));
      const month = Number(m[2]);
      const year = month <= 3 ? fiscalYear + 1 : fiscalYear;
      const round = m[3] === "二" ? 2 : 1;
      return { ...l, year, month, round, sortKey: year * 10000 + month * 100 + round };
    })
    .filter((v): v is NonNullable<typeof v> => v !== null);
  if (links.length === 0) fail("募集人数のPDFが見つかりません。ページの構成が変わった可能性があります。");
  const latest = links.reduce((a, b) => (b.sortKey > a.sortKey ? b : a));
  console.log(`最新: ${latest.text}\n  ${latest.url}`);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "tachikawa-vacancy-"));
  try {
    const r = await fetch(latest.url, { headers: { "User-Agent": ua } });
    if (!r.ok) fail(`PDFの取得に失敗しました（${r.status}）: ${latest.url}`);
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.subarray(0, 4).toString() !== "%PDF") fail(`PDFではありません: ${latest.url}`);
    const file = path.join(tmpDir, "tachikawa.pdf");
    fs.writeFileSync(file, buf);

    let pdf: PdfResult;
    try {
      pdf = JSON.parse(runPython([EXTRACTOR, file])) as PdfResult;
    } catch (err) {
      fail(`抽出結果を読めません: ${String(err)}`);
    }

    if (pdf.target.length !== 1) fail(`PDFに対象月が${pdf.target.length}種類あります`);
    const [ty, tm] = pdf.target[0];
    if (tm !== latest.month) {
      fail(`PDFの対象月（${tm}月）がリンクの文言（${latest.month}月）と違います。`);
    }
    // 募集人数の一覧には基準日がなく、対象の月だけが書かれている
    const asOf = `${latest.year}-${String(latest.month).padStart(2, "0")}-01`;
    console.log(`対象: 令和${ty}年度${tm}月期`);

    const categories: string[] = [];
    const facilities: {
      id: string;
      name: string;
      w: null;
      c: number;
      vacancy: (number | null)[];
    }[] = [];
    const seenId = new Set<string>();
    const askFacility: string[] = [];

    for (const table of pdf.tables) {
      const category = categoryOf(table.section);
      if (!categories.includes(category)) categories.push(category);
      const head = table.head.map((h) => squeeze(h));
      const nameIdx = head.findIndex((h) => h === "施設名");
      if (nameIdx < 0) fail(`施設名の列が分かりません: ${table.head.join(" / ")}`);
      const ageIdx = Array.from({ length: AGE_COUNT }, (_, i) =>
        head.findIndex((h) => toHalfWidth(h) === `${i}歳`)
      );
      if (ageIdx[0] < 0) fail(`年齢の見出しが見つかりません: ${table.head.join(" / ")}`);

      for (const row of table.rows) {
        // 「柴崎にじのいろ\n(旧：柴崎)」のように旧名が改行で続く
        const name = squeeze((row[nameIdx] ?? "").split("\n")[0]);
        if (!name) continue;
        if (name === "施設名") continue;

        const vacancy: (number | null)[] = new Array(AGE_COUNT).fill(null);
        for (const [age, c] of ageIdx.entries()) {
          if (c < 0) continue;
          const raw = squeeze(row[c] ?? "");
          if (raw === "" || raw === "-" || raw === "－" || raw === "―") continue;
          const t = toHalfWidth(raw);
          if (/^\d+$/.test(t)) {
            vacancy[age] = Number(t);
            continue;
          }
          // 「施設にご確認ください」のような案内が入る
          askFacility.push(`${name}（${age}歳児「${raw}」）`);
        }

        const id = `${category}-${name}`;
        if (seenId.has(id)) fail(`施設名が重複しています: ${id}`);
        seenId.add(id);
        facilities.push({ id, name, w: null, c: categories.indexOf(category), vacancy });
      }
    }

    if (facilities.length < 40) fail(`施設が${facilities.length}件しか取れていません`);

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

    const dataset = {
      municipalitySlug: MUNICIPALITY_SLUG,
      municipalityName: MUNICIPALITY_NAME,
      asOf,
      fetchedAt: todayJst(),
      sourceName: SOURCE_NAME,
      sourceUrl: INDEX_URL,
      sourceFiles: { vacancy: latest.url },
      metrics: ["vacancy"],
      subtitle: `${latest.year}年${latest.month}月期の募集人数`,
      notes: [
        "立川市が公表している募集人数です。空欄は募集がないことを示します。",
        "認定こども園は保育を必要とする2号・3号認定の人数です。",
        ...(askFacility.length > 0
          ? [
              `次のクラスは公式の表で「施設にご確認ください」と書かれているため「—」にしています: ${askFacility.join("、")}`,
            ]
          : []),
      ],
      wards: [],
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
    console.log(`  「施設にご確認ください」の欄: ${askFacility.length}件`);
    console.log("");
    for (const [i, cat] of categories.entries()) {
      console.log(`  ${cat} ${facilities.filter((f) => f.c === i).length}施設`);
    }
    console.log("");
    console.log("  年齢 | 募集");
    ageTotals.forEach((v, age) => console.log(`  ${age}歳児 | ${v}`));
    console.log(`  合計 | ${ageTotals.reduce((a, b) => a + b, 0)}`);
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

main().catch((err) => fail(String(err)));
