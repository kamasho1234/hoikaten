/**
 * 枚方市の保育所（園）等の受入れ枠を取り込む
 *
 * 実行: npm run vacancy:fetch:hirakata
 *
 * ## この自治体の特徴
 * - その月の利用調整で受け入れる枠を人数で公表している（予定）
 * - **クラスを設けていないところは灰色に塗られている**だけで文字がないので、
 *   塗りの矩形とセルの位置を突き合わせて0人と切り分ける
 * - エリアは「北・中・南・東」と「小規模保育事業実施施設等」が同じ欄に入る。
 *   小規模のほうは小エリアに北・中・南・東が入るので、そちらを地区として使う
 * - 基準日が公表されていないので、PDFの更新日時を時点として使う
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "hirakata";
const MUNICIPALITY_NAME = "枚方市";
const SOURCE_NAME = "枚方市「保育所（園）等の利用調整の受入れ枠等について」";
const INDEX_URL = "https://www.city.hirakata.osaka.jp/0000046030.html";
const AGE_COUNT = 6;
const UA = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";

/** エリアの欄に入る、地区ではない区分 */
const SMALL_SCALE = "小規模保育事業実施施設等";
const DEFAULT_CATEGORY = "保育所（園）等";

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const EXTRACTOR = path.join(process.cwd(), "scripts", "hirakata-pdf-extract.py");

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

type PdfResult = {
  target: [number, number];
  wordSum: number;
  rows: {
    area: string;
    subarea: string;
    name: string;
    stages: { text: string; painted: boolean }[];
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
  console.log(`${MUNICIPALITY_NAME}の受入れ枠を取り込みます`);
  console.log(`公式ページ: ${INDEX_URL}\n`);

  const res = await fetch(INDEX_URL, { headers: { "User-Agent": UA } });
  if (!res.ok) fail(`公式ページが ${res.status} を返しました`);
  const html = await res.text();

  // 「令和8年度 9月受入れ枠（予定）」。年度途中ぶんの一覧とは分ける
  const links = [...html.matchAll(/<a[^>]+href="([^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => ({ url: new URL(m[1], INDEX_URL).toString(), text: toHalfWidth(stripTags(m[2])) }))
    .map((l) => {
      const m = squeeze(l.text).match(/令和(\d+)年度(\d+)月受入れ枠/);
      if (!m) return null;
      const reiwa = Number(m[1]);
      const month = Number(m[2]);
      return { ...l, reiwa, month, sortKey: reiwa * 100 + month };
    })
    .filter((v): v is NonNullable<typeof v> => v !== null);
  if (links.length === 0) fail("受入れ枠のPDFが見つかりません。ページの構成が変わった可能性があります。");
  const latest = links.reduce((a, b) => (b.sortKey > a.sortKey ? b : a));
  console.log(`最新: ${latest.text}\n  ${latest.url}`);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "hirakata-vacancy-"));
  try {
    const r = await fetch(latest.url, { headers: { "User-Agent": UA } });
    if (!r.ok) fail(`PDFの取得に失敗しました（${r.status}）: ${latest.url}`);
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.subarray(0, 4).toString() !== "%PDF") fail(`PDFではありません: ${latest.url}`);

    // 基準日が書かれていないので、PDFが差し替えられた日を時点として使う
    const lastModified = r.headers.get("last-modified");
    if (!lastModified) fail("PDFの更新日時（Last-Modified）が返ってきませんでした");
    const modified = new Date(lastModified);
    if (Number.isNaN(modified.getTime())) fail(`PDFの更新日時を読めません: ${lastModified}`);
    const asOf = new Date(modified.getTime() + 9 * 60 * 60 * 1000).toISOString().slice(0, 10);
    if (asOf > todayJst()) fail(`PDFの更新日（${asOf}）が今日より先になっています`);

    const file = path.join(tmpDir, "hirakata.pdf");
    fs.writeFileSync(file, buf);

    let pdf: PdfResult;
    try {
      pdf = JSON.parse(runPython([EXTRACTOR, file])) as PdfResult;
    } catch (err) {
      fail(`抽出結果を読めません: ${String(err)}`);
    }

    const [targetReiwa, targetMonth] = pdf.target;
    if (targetReiwa !== latest.reiwa || targetMonth !== latest.month) {
      fail(
        `PDFの表題（令和${targetReiwa}年${targetMonth}月）がリンクの文言（令和${latest.reiwa}年度${latest.month}月）と違います`
      );
    }
    console.log(`更新日: ${asOf} / 対象: ${targetMonth}月の受入れ枠`);

    const wards: string[] = [];
    const categories: string[] = [];
    const facilities: {
      id: string;
      name: string;
      w: number;
      c: number;
      vacancy: (number | null)[];
    }[] = [];
    const seen = new Set<string>();
    let noClass = 0;
    let total = 0;

    for (const row of pdf.rows) {
      const name = squeeze(row.name);
      if (!name) fail("園名が空の行があります");
      if (seen.has(name)) fail(`園名が重複しています: ${name}`);
      seen.add(name);

      const area = squeeze(row.area);
      const subarea = squeeze(row.subarea);
      if (!area) fail(`${name}: エリアが分かりません`);
      // 小規模はエリアの欄が種別になっていて、地区は小エリアのほうに入る
      const isSmall = area === SMALL_SCALE;
      const ward = isSmall ? subarea : area;
      const category = isSmall ? SMALL_SCALE : DEFAULT_CATEGORY;
      if (!ward) fail(`${name}: 地区が分かりません`);
      if (!wards.includes(ward)) wards.push(ward);
      if (!categories.includes(category)) categories.push(category);

      const vacancy: (number | null)[] = [];
      for (let age = 0; age < AGE_COUNT; age++) {
        const stage = row.stages[age];
        const raw = squeeze(stage.text);
        if (stage.painted) {
          // 灰色に塗られている＝そのクラスを設けていない
          if (raw !== "") fail(`${name}: ${age}歳児は設定なしのはずなのに「${raw}」が入っています`);
          noClass += 1;
          vacancy.push(null);
          continue;
        }
        if (raw === "") {
          vacancy.push(0);
          continue;
        }
        const n = Number(toHalfWidth(raw));
        if (!Number.isInteger(n) || n < 0) fail(`${name}: ${age}歳児の欄を読めません: 「${raw}」`);
        total += n;
        vacancy.push(n);
      }
      if (vacancy.every((v) => v === null)) fail(`${name}: 全てのクラスが設定なしです`);

      facilities.push({
        id: name,
        name,
        w: wards.indexOf(ward),
        c: categories.indexOf(category),
        vacancy,
      });
    }

    if (facilities.length < 60) fail(`施設が${facilities.length}件しか取れていません`);
    if (total !== pdf.wordSum) {
      fail(`受入れ枠の合計が合いません（PDFの印字 ${pdf.wordSum} / 取り込み ${total}）`);
    }
    console.log(`受入れ枠の合計${total}人はPDFの印字と一致しました`);

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
      subtitle: `${targetMonth}月の受入れ枠（予定）`,
      notes: [
        `${targetMonth}月の利用調整で受け入れる枠の予定です。保育士の退職などで体制が整わなくなった場合は受け入れできないことがあります。`,
        "時点は公式PDFが差し替えられた日です（枚方市は基準日を公表していません）。",
        "公式の表で灰色に塗られている「設定がないクラス」は「—」にしています。",
        "年齢はその年度の4月1日時点のものです。",
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
    console.log(`  ${facilities.length}施設 / ${wards.length}地区 / ${categories.length}種類`);
    console.log(`  受入れ枠の合計: ${total}人`);
    console.log(`  設定がないクラス: ${noClass}`);
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

main().catch((err) => fail(String(err)));
