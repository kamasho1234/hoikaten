/**
 * 秋田市の教育・保育施設等の受入可能状況を取り込む
 *
 * 実行: npm run vacancy:fetch:akita
 *
 * ## この自治体の特徴
 * - 公式がExcel（オープンデータ）で出しているので、列のずれを心配しなくてよい
 * - 空きは人数。**保育を実施していない歳児は0ではなく斜線**なので、
 *   セルの罫線を見て「—」と0を切り分ける
 * - 「網掛部分は受入できません」という注記があるので、塗りつぶされた欄は
 *   人数が分からないものとして扱い、どの施設のことかを注記に出す
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "akita";
const MUNICIPALITY_NAME = "秋田市";
const SOURCE_NAME = "秋田市「保育施設の受入可能状況」";
const INDEX_URL =
  "https://www.city.akita.lg.jp/kurashi/kosodate/1005999/1009962/1026753.html";
const AGE_COUNT = 6;
const UA = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";

/** 公式の略称と、当サイトで見せる呼び方 */
const KIND_LABEL: Record<string, string> = {
  小保育: "小規模保育事業",
  事業保育: "事業所内保育事業",
};

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const EXTRACTOR = path.join(process.cwd(), "scripts", "akita-xlsx-extract.py");

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

type XlsxResult = {
  asOf: [number, number, number];
  title: string;
  notes: string[];
  rows: {
    ward: string;
    kind: string;
    name: string;
    values: (number | string | null)[];
    slashed: boolean[];
    shaded: boolean[];
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
      fail(`Excelの読み取りに失敗しました（${bin}）: ${e.stderr || e.message}`);
    }
  }
  fail(`Pythonを実行できません（${lastError}）。openpyxl が入った python が必要です。`);
}

async function main() {
  console.log(`${MUNICIPALITY_NAME}の受入可能状況を取り込みます`);
  console.log(`公式ページ: ${INDEX_URL}\n`);

  const res = await fetch(INDEX_URL, { headers: { "User-Agent": UA } });
  if (!res.ok) fail(`公式ページが ${res.status} を返しました`);
  const html = await res.text();

  // 「令和8年8月10日審査後受入可能状況 （Excel 18.6 KB）」
  const links = [...html.matchAll(/<a[^>]+href="([^"]+\.xlsx)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => ({ url: new URL(m[1], INDEX_URL).toString(), text: toHalfWidth(stripTags(m[2])) }))
    .map((l) => {
      const m = squeeze(l.text).match(/令和(\d+)年(\d+)月(\d+)日審査後受入可能状況/);
      if (!m) return null;
      const year = 2018 + Number(m[1]);
      const month = Number(m[2]);
      const day = Number(m[3]);
      return { ...l, year, month, day, sortKey: year * 10000 + month * 100 + day };
    })
    .filter((v): v is NonNullable<typeof v> => v !== null);
  if (links.length === 0) fail("受入可能状況のExcelが見つかりません。ページの構成が変わった可能性があります。");
  const latest = links.reduce((a, b) => (b.sortKey > a.sortKey ? b : a));
  const screened = `${latest.year}-${String(latest.month).padStart(2, "0")}-${String(latest.day).padStart(2, "0")}`;
  console.log(`最新: ${latest.text}\n  ${latest.url}`);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "akita-vacancy-"));
  try {
    const r = await fetch(latest.url, { headers: { "User-Agent": UA } });
    if (!r.ok) fail(`Excelの取得に失敗しました（${r.status}）: ${latest.url}`);
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.subarray(0, 2).toString() !== "PK") fail(`Excelではありません: ${latest.url}`);
    const file = path.join(tmpDir, "akita.xlsx");
    fs.writeFileSync(file, buf);

    let book: XlsxResult;
    try {
      book = JSON.parse(runPython([EXTRACTOR, file])) as XlsxResult;
    } catch (err) {
      fail(`読み取り結果を扱えません: ${String(err)}`);
    }

    const [ay, am, ad] = book.asOf;
    const asOf = `${2018 + ay}-${String(am).padStart(2, "0")}-${String(ad).padStart(2, "0")}`;
    if (asOf > todayJst()) fail(`基準日（${asOf}）が今日より先になっています`);
    // 審査日より後に公表されるので、基準日が審査日より前なら取り違えている
    if (asOf < screened) fail(`基準日（${asOf}）がリンクの審査日（${screened}）より前になっています`);
    console.log(`基準日: ${asOf}（${latest.month}月${latest.day}日の審査後）`);

    const wards: string[] = [];
    const categories: string[] = [];
    const facilities: {
      id: string;
      name: string;
      w: number;
      c: number;
      vacancy: (number | null)[];
    }[] = [];
    const closed: string[] = [];
    const seen = new Set<string>();
    let noClass = 0;
    let total = 0;

    for (const row of book.rows) {
      const name = squeeze(row.name);
      const ward = squeeze(row.ward);
      const rawKind = squeeze(row.kind);
      if (!ward) fail(`${name}: 地区が空です`);
      if (!rawKind) fail(`${name}: サービス種類が空です`);
      if (seen.has(name)) fail(`事業所名が重複しています: ${name}`);
      seen.add(name);

      const kind = KIND_LABEL[rawKind] ?? rawKind;
      if (!wards.includes(ward)) wards.push(ward);
      if (!categories.includes(kind)) categories.push(kind);

      const vacancy: (number | null)[] = [];
      let hasClosed = false;
      for (let age = 0; age < AGE_COUNT; age++) {
        if (row.slashed[age]) {
          // 斜線＝保育を実施していない
          noClass += 1;
          vacancy.push(null);
          continue;
        }
        if (row.shaded[age]) {
          // 網掛＝受入できません。0（空きなし）とは意味が違うので数に混ぜない
          hasClosed = true;
          vacancy.push(null);
          continue;
        }
        const raw = row.values[age];
        if (typeof raw !== "number" || !Number.isInteger(raw) || raw < 0) {
          fail(`${name}: ${age}歳の欄を読めません: 「${raw}」`);
        }
        total += raw;
        vacancy.push(raw);
      }
      if (hasClosed) closed.push(name);

      facilities.push({
        id: name,
        name,
        w: wards.indexOf(ward),
        c: categories.indexOf(kind),
        vacancy,
      });
    }

    if (facilities.length < 80) fail(`施設が${facilities.length}件しか取れていません`);

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
      "秋田市が公表している受入可能数（空き人数）です。2号・3号認定（保育を必要とする方）の状況です。",
      "退所や施設の受入体制の変更などにより、受入可能状況が変わることがあります。",
      "年齢はその年度の4月1日時点のものです。保育を実施していない歳児は「—」にしています。",
      "1号認定（教育利用）や、表に載っていない施設の受入可能状況は各施設にお問い合わせください。",
    ];
    if (closed.length > 0) {
      notes.push(
        `次の施設には、公式の表で「受入できません」とされている欄があります。当サイトでは人数が分からないものとして「—」にしています: ${closed.join("、")}`
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
      subtitle: "審査後の受入可能状況",
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
    console.log(`  ${facilities.length}施設 / ${wards.length}地区 / ${categories.length}種類`);
    console.log(`  空きの合計: ${total}人`);
    console.log(`  保育を実施していない歳児: ${noClass}`);
    if (closed.length > 0) console.log(`  受入できない欄のある施設: ${closed.length}件`);
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

main().catch((err) => fail(String(err)));
