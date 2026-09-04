/**
 * 川越市の保育園等の募集空き状況を取り込む
 *
 * 実行: npm run vacancy:fetch:kawagoe
 *
 * ## この自治体の特徴
 * - 空きは**人数（募集人数）**。翌月入園ぶんの募集枠を毎月出している
 * - 1ページに**左右2段**。どちらも「区分／保育園名／対象年齢／0歳児〜5歳児／計」
 * - **施設ごとの「計」・地区ごとの小計・いちばん下の施設合計**があるので、
 *   3段階で検算できる
 * - **対象年齢**の列があるので、その園にないクラス（空欄）と0人を切り分けられる
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "kawagoe";
const MUNICIPALITY_NAME = "川越市";
const SOURCE_NAME = "川越市「保育園等の空き状況（募集人数）」";
const INDEX_URL = "https://www.city.kawagoe.saitama.jp/kosodate/azukeru/1004356/1004359.html";
const AGE_COUNT = 6;
const UA = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";

/**
 * 区分の欄は縦書きなので「小 規 模」が「小規」だけになることがある。
 * 公式に出てくる書き方に寄せてまとめる
 */
const KNOWN_KINDS = ["公立", "法人", "認こ", "小規模", "事業所内"];

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const EXTRACTOR = path.join(process.cwd(), "scripts", "kawagoe-pdf-extract.py");

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

function squeeze(s: string): string {
  return (s ?? "").replace(/[\s　]/g, "");
}

function stripTags(html: string): string {
  return html.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").replace(/[\s　]+/g, " ").trim();
}

/**
 * 「8ヶ月」「2ヶ月～2歳」「1歳」「8ヶ月～1歳」を [下限, 上限]（歳）にする。
 * 月齢だけなら0歳クラスから、上限が書いていなければ5歳まで
 */
function parseAgeRange(raw: string): [number, number] | null {
  const t = toHalfWidth(squeeze(raw)).replace(/[～〜~]/g, "~");
  const [lowRaw, highRaw] = t.split("~");
  if (!lowRaw) return null;
  const lowYear = lowRaw.match(/^(\d+)歳$/);
  const lowMonth = lowRaw.match(/^(\d+)(?:ヶ月|か月|ヵ月|カ月|ケ月|月)$/);
  let low: number;
  if (lowYear) low = Number(lowYear[1]);
  else if (lowMonth) low = 0;
  else return null;
  let high = 5;
  if (highRaw) {
    const m = highRaw.match(/^(\d+)歳$/);
    if (!m) return null;
    high = Number(m[1]);
  }
  if (low < 0 || high > 5 || low > high) return null;
  return [low, high];
}

type PdfResult = {
  target: [number, number];
  asOf: [number, number, number];
  rows: string[][];
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
  console.log(`${MUNICIPALITY_NAME}の募集空き状況を取り込みます`);
  console.log(`公式ページ: ${INDEX_URL}\n`);

  const res = await fetch(INDEX_URL, { headers: { "User-Agent": UA } });
  if (!res.ok) fail(`公式ページが ${res.status} を返しました`);
  const html = await res.text();

  // 「令和8年9月募集空き状況表 （PDF 205.7KB）」
  const links = [...html.matchAll(/<a[^>]+href="([^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => ({ url: new URL(m[1], INDEX_URL).toString(), text: toHalfWidth(stripTags(m[2])) }))
    .map((l) => {
      const m = l.text.match(/^令和(\d+)年(\d+)月募集空き状況表/);
      if (!m) return null;
      const fiscalYear = reiwaToYear(Number(m[1]));
      const month = Number(m[2]);
      const year = month <= 3 ? fiscalYear + 1 : fiscalYear;
      return { ...l, year, month, sortKey: year * 100 + month };
    })
    .filter((v): v is NonNullable<typeof v> => v !== null);
  if (links.length === 0) fail("募集空き状況表のPDFが見つかりません。ページの構成が変わった可能性があります。");
  const latest = links.reduce((a, b) => (b.sortKey > a.sortKey ? b : a));
  console.log(`最新: ${latest.text}\n  ${latest.url}`);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "kawagoe-vacancy-"));
  try {
    const r = await fetch(latest.url, { headers: { "User-Agent": UA } });
    if (!r.ok) fail(`PDFの取得に失敗しました（${r.status}）: ${latest.url}`);
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.subarray(0, 4).toString() !== "%PDF") fail(`PDFではありません: ${latest.url}`);
    const file = path.join(tmpDir, "kawagoe.pdf");
    fs.writeFileSync(file, buf);

    let pdf: PdfResult;
    try {
      pdf = JSON.parse(runPython([EXTRACTOR, file])) as PdfResult;
    } catch (err) {
      fail(`抽出結果を読めません: ${String(err)}`);
    }

    const [, tm] = pdf.target;
    if (tm !== latest.month) {
      fail(`PDFの対象月（${tm}月）がリンクの文言（${latest.month}月）と違います。`);
    }
    const [ry, am, ad] = pdf.asOf;
    const asOf = `${reiwaToYear(ry)}-${String(am).padStart(2, "0")}-${String(ad).padStart(2, "0")}`;
    console.log(`基準日: ${asOf} / 対象: ${latest.year}年${latest.month}月募集`);

    // 見出しの行から、左右それぞれの段の列位置を決める
    const header = pdf.rows.find((r) => r.filter((c) => squeeze(c) === "保育園名").length >= 2);
    if (!header) fail("見出しの行が見つかりません");
    const nameCols = header.flatMap((c, i) => (squeeze(c) === "保育園名" ? [i] : []));
    if (nameCols.length !== 2) fail(`「保育園名」の列が${nameCols.length}個あります`);
    for (const nameCol of nameCols) {
      if (squeeze(header[nameCol + 1] ?? "") !== "対象年齢") {
        fail(`${nameCol}列めの右が「対象年齢」ではありません: 「${header[nameCol + 1]}」`);
      }
      for (let age = 0; age < AGE_COUNT; age++) {
        if (toHalfWidth(squeeze(header[nameCol + 2 + age] ?? "")) !== `${age}歳児`) {
          fail(`年齢の並びが変わりました: ${header.slice(nameCol + 2, nameCol + 8).join(" ")}`);
        }
      }
      if (squeeze(header[nameCol + 8] ?? "") !== "計") {
        fail(`「計」の列が見つかりません: 「${header[nameCol + 8]}」`);
      }
    }

    const categories: string[] = [];
    const facilities: {
      id: string;
      name: string;
      w: null;
      c: number | null;
      vacancy: (number | null)[];
    }[] = [];
    const seen = new Set<string>();
    const ageTotals = new Array(AGE_COUNT).fill(0);
    const subtotals = new Array(AGE_COUNT).fill(0);
    let closed = 0;
    // 区分は縦結合なので、空なら同じ段の1つ上の行から引き継ぐ
    const lastKind = new Map<number, string>();

    const num = (raw: string): number | null => {
      const t = toHalfWidth(squeeze(raw));
      if (t === "") return null;
      if (!/^\d+$/.test(t)) return NaN;
      return Number(t);
    };

    // 施設合計の行より下は、保育ステーションの送迎など表の外の話になる
    let afterTotal = false;
    for (const row of pdf.rows) {
      if (row === header || afterTotal) continue;
      const isTotalRow = row.some((c) => squeeze(c) === "施設合計");
      if (isTotalRow) afterTotal = true;
      for (const nameCol of nameCols) {
        const name = squeeze(row[nameCol] ?? "");
        // 施設合計の上にもう一度、年齢の見出しの行が出てくる
        if (toHalfWidth(squeeze(row[nameCol + 2] ?? "")) === "0歳児") continue;
        const values = Array.from({ length: AGE_COUNT }, (_, age) =>
          num(row[nameCol + 2 + age] ?? "")
        );
        const totalRaw = row[nameCol + 8] ?? "";
        if (values.some((v) => Number.isNaN(v))) {
          fail(`人数として読めない欄があります（${name || "名前なし"}）: ${row.slice(nameCol + 2, nameCol + 8).join(" / ")}`);
        }
        const filled = values.filter((v) => v !== null) as number[];
        const sum = filled.reduce((a, b) => a + b, 0);

        if (!name) {
          // 名前がなくて数字だけの行は、地区の小計かいちばん下の施設合計
          if (filled.length === 0) continue;
          if (isTotalRow) {
            for (let age = 0; age < AGE_COUNT; age++) {
              const v = values[age];
              if (v === null) fail(`施設合計の${age}歳が空です`);
              if (v !== ageTotals[age]) {
                fail(`施設合計の${age}歳が合いません（公式 ${v} / 積み上げ ${ageTotals[age]}）`);
              }
            }
            const officialTotal = num(totalRaw);
            const stacked = ageTotals.reduce((a: number, b: number) => a + b, 0);
            if (officialTotal !== stacked) {
              fail(`施設合計が合いません（公式 ${officialTotal} / 積み上げ ${stacked}）`);
            }
            console.log(`施設合計と一致: ${stacked}人（年齢別 ${ageTotals.join(" / ")}）`);
          } else {
            for (let age = 0; age < AGE_COUNT; age++) subtotals[age] += values[age] ?? 0;
          }
          continue;
        }

        // 「Ⓒ地区 小計」のように名前の欄に小計と書かれている行は施設ではない
        if (name.includes("小計") || name.includes("合計")) continue;

        const rawKind = squeeze(row[nameCol - 1] ?? "");
        let kind = lastKind.get(nameCol) ?? "";
        if (rawKind) {
          const known = KNOWN_KINDS.find((k) => k.startsWith(rawKind) || rawKind.startsWith(k));
          if (!known) fail(`${name}: 知らない区分です: 「${rawKind}」`);
          kind = known;
        }
        if (!kind) fail(`${name}: 区分が分かりません`);
        lastKind.set(nameCol, kind);
        if (!categories.includes(kind)) categories.push(kind);

        const ages = parseAgeRange(row[nameCol + 1] ?? "");
        if (!ages) fail(`${name}: 対象年齢を読めません: 「${row[nameCol + 1]}」`);
        const [low, high] = ages;

        if (seen.has(name)) fail(`保育園名が重複しています: ${name}`);
        seen.add(name);

        // 休園中・建替え中の園は全部の欄が空になる
        if (filled.length === 0) {
          closed += 1;
          facilities.push({
            id: name,
            name,
            w: null,
            c: categories.indexOf(kind),
            vacancy: new Array(AGE_COUNT).fill(null),
          });
          continue;
        }

        for (let age = 0; age < AGE_COUNT; age++) {
          const inRange = age >= low && age <= high;
          if (values[age] === null && inRange) {
            fail(`${name}: 対象年齢は${low}歳から${high}歳なのに、${age}歳の欄が空です`);
          }
          if (values[age] !== null && !inRange) {
            fail(
              `${name}: 対象年齢は${low}歳から${high}歳なのに、${age}歳の欄に「${values[age]}」が入っています`
            );
          }
        }

        const officialTotal = num(totalRaw);
        if (officialTotal === null || Number.isNaN(officialTotal)) {
          fail(`${name}: 「計」を読めません: 「${totalRaw}」`);
        }
        if (officialTotal !== sum) {
          fail(`${name}: 「計」が合いません（公式 ${officialTotal} / 年齢の和 ${sum}）`);
        }
        for (let age = 0; age < AGE_COUNT; age++) ageTotals[age] += values[age] ?? 0;

        facilities.push({
          id: name,
          name,
          w: null,
          c: categories.indexOf(kind),
          vacancy: values,
        });
      }
    }

    if (facilities.length < 50) fail(`施設が${facilities.length}件しか取れていません`);
    // 地区ごとの小計の合計も、施設の積み上げと合うはず
    for (let age = 0; age < AGE_COUNT; age++) {
      if (subtotals[age] !== ageTotals[age]) {
        fail(`${age}歳の小計の合計が合いません（小計 ${subtotals[age]} / 積み上げ ${ageTotals[age]}）`);
      }
    }
    console.log(`地区ごとの小計とも一致: ${subtotals.join(" / ")}`);

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
      subtitle: `${latest.year}年${latest.month}月募集の空き状況`,
      notes: [
        "川越市が出しているのは、翌月入園ぶんの募集人数です。退園や園の状況等によって増減することがあります。",
        "その園が受け入れていないクラス（公式の表で空欄のところ）は「—」にしています。",
        "休園中・建て替え中の園は、全てのクラスが「—」になります。",
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

    console.log(`書き出しました: ${path.relative(process.cwd(), OUT_PATH)}`);
    console.log(
      `  ${facilities.length}施設 / ${categories.length}区分（${categories.join("・")}） / 募集人数の合計 ${ageTotals.reduce((a: number, b: number) => a + b, 0)}`
    );
    if (closed > 0) console.log(`  全てのクラスが空欄だった園: ${closed}件（休園中・建て替え中）`);
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

main().catch((err) => fail(String(err)));
