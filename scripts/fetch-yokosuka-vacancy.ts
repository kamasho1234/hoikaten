/**
 * 横須賀市の保育施設等の空き状況を取り込む
 *
 * 実行: npm run vacancy:fetch:yokosuka
 *
 * ## この自治体の特徴
 * - 行政センター別の区域（追浜地区・田浦地区など）が付いているので、区のある自治体と
 *   同じように地区ごとの集計を出せる
 * - 区分は1文字の記号（保・認・小・事・家）。表の下の凡例のとおりに読み替える
 * - **空欄は空き人数なし**（表に「※空欄は空き人数無しを表しています」と書かれている）
 * - 人数のうしろに「※」が付くことがあり、表の下の但し書きに対応する。
 *   数だけを採り、但し書きはそのまま注記に載せる
 * - 最後の「合計」行と積み上げを突き合わせる
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "yokosuka";
const MUNICIPALITY_NAME = "横須賀市";
const SOURCE_NAME = "横須賀市「保育施設等空き状況一覧」";
const INDEX_URL = "https://www.city.yokosuka.kanagawa.jp/2645/hoikuen_aki/index.html";
const AGE_COUNT = 6;

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const EXTRACTOR = path.join(process.cwd(), "scripts", "yokosuka-pdf-extract.py");

/** 表の下の凡例のとおりに読み替える */
const KIND_LABEL: Record<string, string> = {
  保: "認可保育園",
  認: "認定こども園",
  小: "小規模保育事業",
  家: "家庭的保育事業",
  事: "事業所内保育事業",
};

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

type PdfResult = {
  asOf: number[];
  target: number[];
  head: string[];
  sub: string[];
  rows: string[][];
  notes: string[];
};

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

  // 「令和8年9月入園保育施設等の空き状況(8月1日更新)（PDF：219KB）」
  const links = [...html.matchAll(/<a[^>]+href="([^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => ({ url: new URL(m[1], INDEX_URL).toString(), text: toHalfWidth(stripTags(m[2])) }))
    .map((l) => {
      const m = l.text.match(/^令和(\d+)年(\d+)月入園保育施設等の空き状況/);
      if (!m) return null;
      const fiscalYear = reiwaToYear(Number(m[1]));
      const month = Number(m[2]);
      // 年度の表記なので1〜3月は翌年
      const year = month <= 3 ? fiscalYear + 1 : fiscalYear;
      return { ...l, year, month, sortKey: year * 100 + month };
    })
    .filter((v): v is NonNullable<typeof v> => v !== null);
  if (links.length === 0) fail("空き状況のPDFが見つかりません。ページの構成が変わった可能性があります。");
  const latest = links.reduce((a, b) => (b.sortKey > a.sortKey ? b : a));
  console.log(`最新: ${latest.text}\n  ${latest.url}`);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "yokosuka-vacancy-"));
  try {
    const r = await fetch(latest.url, { headers: { "User-Agent": ua } });
    if (!r.ok) fail(`PDFの取得に失敗しました（${r.status}）: ${latest.url}`);
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.subarray(0, 4).toString() !== "%PDF") fail(`PDFではありません: ${latest.url}`);
    const file = path.join(tmpDir, "yokosuka.pdf");
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
    console.log(`基準日: ${asOf} / 対象: 令和${ty}年${tm}月入園`);

    // 年齢の列は見出しの2行目に並ぶ
    const sub = pdf.sub.map((h) => toHalfWidth(squeeze(h)));
    const ageIdx = Array.from({ length: AGE_COUNT }, (_, i) => sub.indexOf(`${i}歳`));
    if (ageIdx.some((i) => i < 0)) fail(`年齢の見出しが見つかりません: ${pdf.sub.join(" / ")}`);
    const head = pdf.head.map((h) => squeeze(h));
    const wardIdx = head.findIndex((h) => h.startsWith("行政センター"));
    const kindIdx = head.findIndex((h) => h.startsWith("区分"));
    const nameIdx = head.findIndex((h) => h.startsWith("保育施設等名"));
    if (wardIdx < 0 || kindIdx < 0 || nameIdx < 0) fail(`見出しが想定と違います: ${pdf.head.join(" / ")}`);

    const parseValue = (raw: string, where: string): number => {
      // 「1 ※」のように但し書きの印が付くことがある
      const t = toHalfWidth(squeeze(raw)).replace(/※/g, "");
      // 空欄は空き人数なし
      if (t === "") return 0;
      if (!/^\d+$/.test(t)) fail(`${where}: 人数として読めません: 「${raw}」`);
      return Number(t);
    };

    const wards: string[] = [];
    const categories: string[] = [];
    const facilities: {
      id: string;
      name: string;
      w: number;
      c: number;
      vacancy: number[];
    }[] = [];
    const seenId = new Set<string>();
    const builtByAge = Array.from({ length: AGE_COUNT }, () => 0);
    let declared: number[] | null = null;
    let declaredTotal: number | null = null;
    let ward = "";

    for (const row of pdf.rows) {
      const first = squeeze(row[wardIdx] ?? "");
      if (first === "合計") {
        declared = ageIdx.map((c) => parseValue(row[c] ?? "", "横須賀市 合計行"));
        // 合計行では年齢の右隣に総数が入る
        declaredTotal = parseValue(row[ageIdx[AGE_COUNT - 1] + 1] ?? "", "横須賀市 合計行（総数）");
        continue;
      }
      if (first) ward = first;

      const name = squeeze(row[nameIdx] ?? "");
      if (!name) continue;
      if (name === "保育施設等名") continue;
      if (!ward) fail(`${name}: 区域が分かりません`);

      const kindMark = squeeze(row[kindIdx] ?? "");
      const category = KIND_LABEL[kindMark];
      if (!category) fail(`${name}: 区分の記号が分かりません: 「${kindMark}」`);

      const vacancy = ageIdx.map((c) => parseValue(row[c] ?? "", `横須賀市 ${name}`));
      vacancy.forEach((v, age) => {
        builtByAge[age] += v;
      });

      if (!wards.includes(ward)) wards.push(ward);
      if (!categories.includes(category)) categories.push(category);
      const id = `${ward}-${name}`;
      if (seenId.has(id)) fail(`施設名が重複しています: ${id}`);
      seenId.add(id);
      facilities.push({
        id,
        name,
        w: wards.indexOf(ward),
        c: categories.indexOf(category),
        vacancy,
      });
    }

    if (!declared || declaredTotal === null) {
      fail("「合計」の行が見つかりません。検算ができないので中断します。");
    }
    if (declared.join("/") !== builtByAge.join("/")) {
      fail(`合計行が ${declared.join("/")} なのに積み上げが ${builtByAge.join("/")} です`);
    }
    const built = builtByAge.reduce((a, b) => a + b, 0);
    if (declaredTotal !== built) {
      fail(`合計行の総数 ${declaredTotal} と積み上げ ${built} が合いません`);
    }
    if (facilities.length < 70) fail(`施設が${facilities.length}件しか取れていません`);

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

    // 表の下の但し書きは、園ごとの条件が書かれていることがあるのでそのまま載せる
    const extraNotes = pdf.notes.filter(
      (n) => !n.includes("クラス年齢は") && !n.includes("募集枠の追加")
    );

    const dataset = {
      municipalitySlug: MUNICIPALITY_SLUG,
      municipalityName: MUNICIPALITY_NAME,
      asOf,
      fetchedAt: todayJst(),
      sourceName: SOURCE_NAME,
      sourceUrl: INDEX_URL,
      sourceFiles: { vacancy: latest.url },
      metrics: ["vacancy"],
      subtitle: `${latest.year}年${latest.month}月入園の空き人数`,
      notes: [
        "横須賀市の注記のとおり、募集枠の追加により締切りまでに空き状況が変わることがあります。",
        "クラス年齢は令和8年4月1日時点の年齢です。",
        "小規模保育事業と家庭的保育事業は2歳児までの施設です。",
        ...extraNotes,
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

    console.log(`書き出しました: ${path.relative(process.cwd(), OUT_PATH)}`);
    console.log(`  合計行との突き合わせ: 一致（${builtByAge.join("/")}／総数 ${built}）`);
    console.log("");
    console.log(`  ${facilities.length}施設 / ${wards.length}地区`);
    for (const [i, cat] of categories.entries()) {
      console.log(`  ${cat} ${facilities.filter((f) => f.c === i).length}施設`);
    }
    console.log("");
    console.log("  年齢 | 空き");
    builtByAge.forEach((v, age) => console.log(`  ${age}歳児 | ${v}`));
    console.log(`  合計 | ${built}`);
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

main().catch((err) => fail(String(err)));
