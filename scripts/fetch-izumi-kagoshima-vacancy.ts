/**
 * 出水市（鹿児島県）の保育所等空き状況を取り込む
 *
 * 実行: npm run vacancy:fetch:izumi-kagoshima
 *
 * ## この自治体の特徴
 * - 大阪府の和泉市と slug がぶつかるので、こちらは izumi-kagoshima
 * - 公式ページに月ごとのPDFが積み上がるので、日付がいちばん新しいものを選ぶ
 * - **空欄はそのクラスを設けていないこと**を表す（小規模保育は2歳児まで）
 * - 行ごとに「合計」があるので、年齢を足したものと突き合わせられる
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "izumi-kagoshima";
const MUNICIPALITY_NAME = "出水市";
const PREFECTURE = "鹿児島県";
const SOURCE_NAME = "出水市「保育所等空き状況」";
const INDEX_URL = "https://www.city.kagoshima-izumi.lg.jp/page/page_06291.html";
const AGE_COUNT = 6;
const MIN_FACILITIES = 18;
const UA = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);

function fail(message: string): never {
  console.error(`\n[中断] ${message}`);
  process.exit(1);
}

function todayJst(): string {
  const jst = new Date(Date.now() + 9 * 60 * 60 * 1000);
  return jst.toISOString().slice(0, 10);
}

function stripTags(html: string): string {
  return html.replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/[\s　]+/g, "");
}

function toHalfWidth(s: string): string {
  return s.replace(/[０-９．]/g, (c) =>
    c === "．" ? "." : String.fromCharCode(c.charCodeAt(0) - 0xfee0),
  );
}

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

type PdfRow = {
  no: number;
  kubun: string;
  name: string;
  values: (number | null)[];
  total: number;
};

async function main(): Promise<void> {
  console.log(`${MUNICIPALITY_NAME}の空き状況を取り込みます`);
  console.log(`公式ページ: ${INDEX_URL}\n`);

  const res = await fetch(INDEX_URL, { headers: { "User-Agent": UA }, redirect: "follow" });
  if (!res.ok) fail(`公式ページが ${res.status} を返しました`);
  const html = await res.text();

  // 「令和8年度空き状況（R8.8.20時点）(PDF/204KB)」
  const links = [...html.matchAll(/<a[^>]+href="([^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => ({ url: new URL(m[1], INDEX_URL).toString(), text: toHalfWidth(stripTags(m[2])) }))
    .map((l) => {
      const m = l.text.match(/空き状況（R(\d+)\.(\d{1,2})\.(\d{1,2})時点/);
      if (!m) return null;
      const [ry, mm, dd] = m.slice(1, 4).map(Number);
      return { ...l, ry, mm, dd, sortKey: (ry + 2018) * 10000 + mm * 100 + dd };
    })
    .filter((v): v is NonNullable<typeof v> => v !== null);
  if (links.length === 0) {
    fail("空き状況のPDFが見つかりません。ページの構成が変わった可能性があります。");
  }
  const latest = links.reduce((a, b) => (b.sortKey > a.sortKey ? b : a));
  console.log(`PDF: ${latest.text}\n  ${latest.url}`);

  const pdfRes = await fetch(latest.url, { headers: { "User-Agent": UA } });
  if (!pdfRes.ok) fail(`PDFが ${pdfRes.status} を返しました`);
  const tmp = path.join(os.tmpdir(), `izumi-kagoshima-${process.pid}.pdf`);
  fs.writeFileSync(tmp, Buffer.from(await pdfRes.arrayBuffer()));

  let parsed: { asOf: number[]; rows: PdfRow[] };
  try {
    parsed = JSON.parse(
      runPython([path.join("scripts", "izumi-kagoshima-pdf-extract.py"), tmp]),
    ) as typeof parsed;
  } finally {
    fs.rmSync(tmp, { force: true });
  }

  const [ry, rm, rd] = parsed.asOf;
  const asOf = `${ry + 2018}-${String(rm).padStart(2, "0")}-${String(rd).padStart(2, "0")}`;
  if (asOf > todayJst()) fail(`時点（${asOf}）が今日より先になっています`);
  if (rm !== latest.mm || rd !== latest.dd) {
    fail(
      `PDFの中の日付（${rm}月${rd}日）が、リンクの文字（${latest.mm}月${latest.dd}日）と違います`,
    );
  }
  console.log(`時点: ${asOf}`);

  const categories: string[] = [];
  const facilities: {
    id: string;
    name: string;
    w: null;
    c: number;
    vacancy: (number | null)[];
  }[] = [];
  const seen = new Set<string>();
  let total = 0;

  for (const row of parsed.rows) {
    if (seen.has(row.name)) fail(`施設名が重複しています: ${row.name}`);
    seen.add(row.name);
    if (!categories.includes(row.kubun)) categories.push(row.kubun);
    if (row.values.length !== AGE_COUNT) {
      fail(`${row.name}: 年齢の欄が${row.values.length}個です`);
    }
    total += row.total;
    facilities.push({
      id: row.name,
      name: row.name,
      w: null,
      c: categories.indexOf(row.kubun),
      vacancy: row.values,
    });
  }

  if (facilities.length < MIN_FACILITIES) {
    fail(`施設が${facilities.length}件しか取れていません（${MIN_FACILITIES}件以上のはず）`);
  }
  console.log(`${facilities.length}施設 ／ 受入可能枠${total}人 ／ 区分 ${categories.join("・")}`);

  const previous = fs.existsSync(OUT_PATH)
    ? (JSON.parse(fs.readFileSync(OUT_PATH, "utf-8")) as { asOf?: string; facilities?: unknown[]; sourceFiles?: Record<string, string> })
    : null;
  if (previous?.facilities && facilities.length < previous.facilities.length * 0.9) {
    fail(
      `施設数が大きく減っています（前回 ${previous.facilities.length}件 → 今回 ${facilities.length}件）`,
    );
  }
  // 自治体は基準日を変えずに資料を差し替えることがある。
  // 取り込み元の一式も同じときだけ、書き換えを見送る
  if (
    previous?.asOf === asOf &&
    JSON.stringify(previous?.sourceFiles ?? {}) === JSON.stringify({ vacancy: latest.url })
  ) {
    console.log(`公式データの時点が前回と同じ（${asOf}）のため更新はありません。`);
    return;
  }

  const notes = [
    `出水市が公表しているのは新規入所の受入可能枠で、${asOf}時点のものです。`,
    "市は「調査日現在のものとなっており、入所を確約するものではありません」「職員の急な退職・採用、児童の転出入によって調査日以降に受入可能枠が大きく増減することがあります」としています。",
    "認定こども園の受入可能枠は保育部分の人数です。教育部分の枠は各園にお問い合わせください。",
    "設けていないクラスは「—」にしています。小規模保育事業所と事業所内保育事業所は2歳児までです。",
    "年齢は令和8年4月1日現在のものです。",
  ];

  const dataset = {
    municipalitySlug: MUNICIPALITY_SLUG,
    municipalityName: MUNICIPALITY_NAME,
    prefecture: PREFECTURE,
    asOf,
    fetchedAt: todayJst(),
    sourceName: SOURCE_NAME,
    sourceUrl: INDEX_URL,
    sourceFiles: { vacancy: latest.url },
    metrics: ["vacancy"],
    subtitle: "新規入所の受入可能枠",
    notes,
    wards: [] as string[],
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
}

main().catch((err) => fail(String(err)));
