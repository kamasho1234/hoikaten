/**
 * 上尾市の保育施設の入所可能予定数を取り込む
 *
 * 実行: npm run vacancy:fetch:ageo
 *
 * ## この自治体の特徴
 * - **1ページに左右2段**。左が認可保育所（0〜5歳）、右が小規模保育施設（0〜2歳）で、
 *   どちらの段にも「NO.／保育所名／年齢」の並びがある
 * - **合計行がない**ので、通し番号（左段の続きが右段）が飛んでいないことを検算に使う
 * - 右段の下に年齢と生年月日の対応表が入り込むが、番号がないので施設として数えない
 * - 施設名は「上 尾 西」のように均等割りされているので詰める
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "ageo";
const MUNICIPALITY_NAME = "上尾市";
const SOURCE_NAME = "上尾市「保育施設 入所可能予定数」";
const INDEX_URL = "https://www.city.ageo.lg.jp/page/405057.html";
const AGE_COUNT = 6;

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const EXTRACTOR = path.join(process.cwd(), "scripts", "ageo-pdf-extract.py");

/** 段ごとの施設の種類。表の上の見出しに「認可保育所　小規模保育施設」と並ぶ */
const CATEGORIES = ["認可保育所", "小規模保育施設"];

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

type PdfResult = { target: number[]; asOf: number[]; head: string[]; rows: string[][] };

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
  console.log(`${MUNICIPALITY_NAME}の入所可能予定数を取り込みます`);
  console.log(`公式ページ: ${INDEX_URL}\n`);

  const ua = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";
  const res = await fetch(INDEX_URL, { headers: { "User-Agent": ua } });
  if (!res.ok) fail(`公式ページが ${res.status} を返しました`);
  const html = await res.text();

  // 「令和8年度9月　保育施設　入所可能予定数 [PDFファイル／235KB]」
  const links = [...html.matchAll(/<a[^>]+href="([^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => ({ url: new URL(m[1], INDEX_URL).toString(), text: toHalfWidth(stripTags(m[2])) }))
    .map((l) => {
      const m = l.text.match(/^令和(\d+)年度(\d+)月\s*保育施設\s*入所可能予定数/);
      if (!m) return null;
      const fiscalYear = reiwaToYear(Number(m[1]));
      const month = Number(m[2]);
      const year = month <= 3 ? fiscalYear + 1 : fiscalYear;
      return { ...l, year, month, sortKey: year * 100 + month };
    })
    .filter((v): v is NonNullable<typeof v> => v !== null);
  if (links.length === 0) {
    fail("入所可能予定数のPDFが見つかりません。ページの構成が変わった可能性があります。");
  }
  const latest = links.reduce((a, b) => (b.sortKey > a.sortKey ? b : a));
  console.log(`最新: ${latest.text}\n  ${latest.url}`);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "ageo-vacancy-"));
  try {
    const r = await fetch(latest.url, { headers: { "User-Agent": ua } });
    if (!r.ok) fail(`PDFの取得に失敗しました（${r.status}）: ${latest.url}`);
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.subarray(0, 4).toString() !== "%PDF") fail(`PDFではありません: ${latest.url}`);
    const file = path.join(tmpDir, "ageo.pdf");
    fs.writeFileSync(file, buf);

    let pdf: PdfResult;
    try {
      pdf = JSON.parse(runPython([EXTRACTOR, file])) as PdfResult;
    } catch (err) {
      fail(`抽出結果を読めません: ${String(err)}`);
    }

    const [ty, tm] = pdf.target;
    if (tm !== latest.month) {
      fail(`PDFの対象月（${tm}月）がリンクの文言（${latest.month}月）と違います。`);
    }
    const [ry, am, ad] = pdf.asOf;
    const asOf = `${reiwaToYear(ry)}-${String(am).padStart(2, "0")}-${String(ad).padStart(2, "0")}`;
    console.log(`基準日: ${asOf} / 対象: 令和${ty}年度${tm}月`);

    // 見出しから、左右それぞれの段の列を割り出す
    const head = pdf.head.map((h) => toHalfWidth(squeeze(h)));
    const numberCols = head.flatMap((h, i) => (h === "NO." ? [i] : []));
    if (numberCols.length !== 2) fail(`「NO.」の列が${numberCols.length}か所あります（2か所を想定）`);

    // 施設名の列は「保育」「所名」のように割れることがあるので、
    // 番号の右から年齢の左までをまとめて名前として扱う
    type Column = { number: number; nameFrom: number; nameTo: number; ages: number[] };
    const columns: Column[] = numberCols.map((numberCol, index) => {
      const end = index + 1 < numberCols.length ? numberCols[index + 1] : head.length;
      const ages = Array.from({ length: AGE_COUNT }, (_, age) =>
        head.findIndex((h, i) => i > numberCol && i < end && h === `${age}才`)
      );
      if (ages[0] < 0) fail(`${index + 1}段目の年齢の列が見つかりません`);
      const nameTo = ages[0];
      if (nameTo - numberCol < 2) fail(`${index + 1}段目の施設名の列が見つかりません`);
      return { number: numberCol, nameFrom: numberCol + 1, nameTo, ages };
    });

    const facilities: {
      id: string;
      name: string;
      w: null;
      c: number;
      vacancy: (number | null)[];
    }[] = [];
    const seenNumbers = new Set<number>();
    /** 本園・分園などで同じ番号を分け合っている施設 */
    const shared: number[] = [];
    const seenId = new Set<string>();
    const builtByAge = Array.from({ length: AGE_COUNT }, () => 0);

    for (const row of pdf.rows) {
      for (const [index, column] of columns.entries()) {
        const numberRaw = toHalfWidth(squeeze(row[column.number] ?? ""));
        // 番号のない行は、年齢と生年月日の対応表などの飾り
        if (!/^\d+$/.test(numberRaw)) continue;
        const number = Number(numberRaw);
        const name = squeeze(row.slice(column.nameFrom, column.nameTo).join(""));
        if (!name) fail(`No.${number}: 施設名が読み取れません`);
        // **本園と分園に同じ番号が振られている**ことがある（No.17のプラムハウス）。
        // 重複そのものは公式どおりなので通し、名前まで同じときだけ止める
        if (seenNumbers.has(number)) shared.push(number);
        seenNumbers.add(number);

        const vacancy = column.ages.map((c) => {
          // 小規模保育施設の段には3歳以上の列がない
          if (c < 0) return null;
          const t = toHalfWidth(squeeze(row[c] ?? ""));
          if (t === "") return null;
          if (!/^\d+$/.test(t)) fail(`${name}: 人数として読めません: 「${row[c]}」`);
          return Number(t);
        });
        vacancy.forEach((v, age) => {
          builtByAge[age] += v ?? 0;
        });

        const category = CATEGORIES[index];
        const id = `${number}-${name}`;
        if (seenId.has(id)) fail(`施設名が重複しています: ${id}`);
        seenId.add(id);
        facilities.push({ id, name, w: null, c: index, vacancy });
        void category;
      }
    }

    // 合計行がないので、通し番号が1から抜けなく並んでいることを確かめる
    const numbers = [...seenNumbers].sort((a, b) => a - b);
    if (numbers.length === 0) fail("施設を1件も読み取れませんでした");
    const missing = Array.from(
      { length: numbers[numbers.length - 1] },
      (_, i) => i + 1
    ).filter((n) => !seenNumbers.has(n));
    if (missing.length > 0) {
      fail(`施設の番号が飛んでいます（${missing.join("、")}）。読み落としがあります`);
    }
    if (facilities.length < 50) fail(`施設が${facilities.length}件しか取れていません`);

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
      subtitle: `${latest.year}年${latest.month}月入所の入所可能予定数`,
      notes: [
        "上尾市の注記のとおり、この数は入所可能数を見込んだものです。今後の入所・退所・転園や保育士の採用および配置状況などにより変わることがあります。",
        "クラス年齢は令和8年4月1日時点の年齢で決まります。",
        "認定こども園も認可保育所の欄に含まれています。小規模保育施設は2歳児までです。",
      ],
      wards: [],
      categories: CATEGORIES,
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
    console.log(`  施設の番号が1〜${numbers[numbers.length - 1]}まで抜けなく並んでいます`);
    if (shared.length > 0) {
      console.log(`  本園と分園で番号を分け合っている施設: No.${[...new Set(shared)].join("、No.")}`);
    }
    console.log("");
    for (const [i, cat] of CATEGORIES.entries()) {
      console.log(`  ${cat} ${facilities.filter((f) => f.c === i).length}施設`);
    }
    console.log("");
    console.log("  年齢 | 入所可能");
    builtByAge.forEach((v, age) => console.log(`  ${age}歳児 | ${v}`));
    console.log(`  合計 | ${builtByAge.reduce((a, b) => a + b, 0)}`);
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

main().catch((err) => fail(String(err)));
