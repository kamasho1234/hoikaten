/**
 * 宜野湾市の認可保育施設の空き状況を取り込む
 *
 * 実行: npm run vacancy:fetch:ginowan
 *
 * ## この自治体の特徴
 * - 人数で公表。中学校区（宜野湾・普天間・真志喜・嘉数）で絞り込める
 * - 校区の名前が縦書きで行をまたいでばらばらに入るので、抽出側でつなぎ直している
 * - 施設名に「※分園を含む」「【大山小学校 隣接】」が添えられている施設がある
 * - 同じページに複数の時点のPDFが並ぶので、いちばん新しい日付のものを選ぶ
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "ginowan";
const MUNICIPALITY_NAME = "宜野湾市";
const SOURCE_NAME = "宜野湾市「認可保育施設の空き状況・入所待ち児童数」";
const INDEX_URL = "https://www.city.ginowan.lg.jp/soshiki/kodomo/2/ninkahoikuen/17501.html";
const AGE_COUNT = 6;
const MIN_FACILITIES = 45;
const UA = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const EXTRACTOR = path.join(process.cwd(), "scripts", "ginowan-pdf-extract.py");

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
  asOf: [number, number, number];
  target: [number, number];
  notes: string[];
  totals: number[];
  rows: { name: string; extra: string[]; counts: (number | null)[]; ward: string }[];
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
    .filter((l) => l.text.includes("空き状況"))
    // 「【令和8年8月24日時点】」の日付でいちばん新しいものを選ぶ
    .map((l) => {
      const m = /【令和(\d+)年(\d+)月(\d+)日時点】/.exec(l.text);
      return { ...l, key: m ? Number(m[1]) * 10000 + Number(m[2]) * 100 + Number(m[3]) : 0 };
    })
    .sort((a, b) => b.key - a.key);
  if (links.length === 0) fail("空き状況のPDFが見つかりません");
  if (links[0].key === 0) fail(`リンクの題から時点を読み取れません: ${links[0].text}`);
  const link = links[0];
  console.log(`PDF: ${link.text}\n  ${link.url}`);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "ginowan-vacancy-"));
  try {
    const r = await fetch(link.url, { headers: { "User-Agent": UA } });
    if (!r.ok) fail(`PDFの取得に失敗しました（${r.status}）: ${link.url}`);
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.subarray(0, 4).toString() !== "%PDF") fail(`PDFではありません: ${link.url}`);
    const file = path.join(tmpDir, "ginowan.pdf");
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
    const fromLink = `${reiwaToYear(Math.floor(link.key / 10000))}-${String(Math.floor((link.key % 10000) / 100)).padStart(2, "0")}-${String(link.key % 100).padStart(2, "0")}`;
    if (fromLink !== asOf) {
      fail(`リンクの題の時点（${fromLink}）とPDFの中の時点（${asOf}）が違います`);
    }
    const targetLabel = `${reiwaToYear(pdf.target[0])}年${pdf.target[1]}月`;
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
    const extras: string[] = [];
    let vacancyTotal = 0;

    for (const row of pdf.rows) {
      const name = squeeze(row.name);
      if (!name) fail("施設名が空の行があります");
      if (seen.has(name)) fail(`施設名が重複しています: ${name}`);
      seen.add(name);

      const ward = squeeze(row.ward);
      if (!ward) fail(`${name}: 校区が空です`);
      let w = wards.indexOf(ward);
      if (w < 0) {
        wards.push(ward);
        w = wards.length - 1;
      }

      for (const value of row.counts) {
        if (value === null) continue;
        if (!Number.isInteger(value) || value < 0 || value > 99) {
          fail(`${name}: 人数が想定の範囲にありません（${value}）`);
        }
        vacancyTotal += value;
      }

      const extra = row.extra.map((e) => squeeze(e)).filter(Boolean);
      if (extra.length) extras.push(`${name}${extra.join("")}`);

      facilities.push({ id: name, name, w, c: null, vacancy: row.counts });
    }

    if (facilities.length < MIN_FACILITIES) {
      fail(`施設が${facilities.length}件しか取れていません（${MIN_FACILITIES}件以上のはず）`);
    }

    // 検算: 年齢ごとの合計がPDFの「計」の行と合うか
    for (let age = 0; age < AGE_COUNT; age++) {
      const sum = facilities.reduce((acc, f) => acc + (f.vacancy[age] ?? 0), 0);
      if (sum !== pdf.totals[age]) {
        fail(`${age}才が合計と合いません（合計 ${pdf.totals[age]} / 取り込み ${sum}）`);
      }
    }
    console.log(
      `年齢ごとの合計がPDFの「計」の行と一致しました（${facilities.length}施設 / ${wards.length}校区 / 空き ${vacancyTotal}人）`
    );

    const previous = fs.existsSync(OUT_PATH)
      ? (JSON.parse(fs.readFileSync(OUT_PATH, "utf-8")) as { asOf?: string; facilities?: unknown[] })
      : null;
    if (previous?.facilities && facilities.length < previous.facilities.length * 0.9) {
      fail(`施設数が大きく減っています（前回 ${previous.facilities.length}件 → 今回 ${facilities.length}件）`);
    }
    if (previous?.asOf === asOf) {
      console.log(`公式データの時点が前回と同じ（${asOf}）のため更新はありません。`);
      return;
    }

    const notes = [
      `宜野湾市が公開しているのは${targetLabel}入所に向けた空き状況で、${asOf}時点のものです。`,
      ...pdf.notes,
      "公式の表で空らんになっている年齢は「—」にしています。その年齢のクラスがないことを表しています。",
      ...(extras.length ? [`公式の表には次の但し書きが添えられています。${extras.join(" / ")}`] : []),
    ];

    const dataset = {
      municipalitySlug: MUNICIPALITY_SLUG,
      municipalityName: MUNICIPALITY_NAME,
      asOf,
      fetchedAt: todayJst(),
      sourceName: SOURCE_NAME,
      sourceUrl: INDEX_URL,
      sourceFiles: { vacancy: link.url },
      metrics: ["vacancy"],
      subtitle: `${targetLabel}入所に向けた空き状況`,
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
    console.log(`  ${wards.join("・")}`);
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

main().catch((err) => fail(String(err)));
