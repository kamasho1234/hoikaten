/**
 * 稲城市の認可保育所等の空き状況を取り込む
 *
 * 実行: npm run vacancy:fetch:inagi
 *
 * ## この自治体の特徴
 * - **施設ごとに3行**。「受入定員数」「空き数」「待機人数（延べ）」が縦に並ぶ
 * - 地区（平尾・向陽台・若葉台など）が公表されているので、区のある自治体と同じように
 *   地区ごとの集計を出せる。地区名は縦書きで3行に1文字ずつ入るのでつなげて読む
 * - どの行にも「合計」列があるので1行ずつ検算でき、末尾の「合 計」の3行とも突き合わせる
 * - **待機人数は延べ人数**。その園を希望園のどこかに入れている人の数で、
 *   国の定義の待機児童数とは違う（市の注記のとおり）
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "inagi";
const MUNICIPALITY_NAME = "稲城市";
const SOURCE_NAME = "稲城市「認可保育所・保育ママの空き状況」";
const INDEX_URL = "https://www.city.inagi.tokyo.jp/kosodate/kosodate/1010153/1004356/1004362.html";
const AGE_COUNT = 6;

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const EXTRACTOR = path.join(process.cwd(), "scripts", "inagi-pdf-extract.py");

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

type PdfResult = { target: number[]; head: string[]; rows: string[][] };

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

  // 「認可保育所等空き状況（令和8年8月利用選考会議終了時点） （PDF 237.9 KB）」
  const links = [...html.matchAll(/<a[^>]+href="([^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => ({ url: new URL(m[1], INDEX_URL).toString(), text: toHalfWidth(stripTags(m[2])) }))
    .map((l) => {
      const m = l.text.match(/^認可保育所等空き状況（令和(\d+)年(\d+)月利用選考会議終了時点）/);
      if (!m) return null;
      const year = reiwaToYear(Number(m[1]));
      const month = Number(m[2]);
      return { ...l, year, month, sortKey: year * 100 + month };
    })
    .filter((v): v is NonNullable<typeof v> => v !== null);
  if (links.length === 0) fail("空き状況のPDFが見つかりません。ページの構成が変わった可能性があります。");
  const latest = links.reduce((a, b) => (b.sortKey > a.sortKey ? b : a));
  console.log(`最新: ${latest.text}\n  ${latest.url}`);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "inagi-vacancy-"));
  try {
    const r = await fetch(latest.url, { headers: { "User-Agent": ua } });
    if (!r.ok) fail(`PDFの取得に失敗しました（${r.status}）: ${latest.url}`);
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.subarray(0, 4).toString() !== "%PDF") fail(`PDFではありません: ${latest.url}`);
    const file = path.join(tmpDir, "inagi.pdf");
    fs.writeFileSync(file, buf);

    let pdf: PdfResult;
    try {
      pdf = JSON.parse(runPython([EXTRACTOR, file])) as PdfResult;
    } catch (err) {
      fail(`抽出結果を読めません: ${String(err)}`);
    }

    const [ty, tm] = pdf.target;
    if (reiwaToYear(ty) !== latest.year || tm !== latest.month) {
      fail(`PDFの対象月（令和${ty}年${tm}月）がリンクの文言（${latest.year}年${latest.month}月）と違います。`);
    }
    // 選考会議の終了時点なので、その月の1日を基準日として扱う
    const asOf = `${latest.year}-${String(latest.month).padStart(2, "0")}-01`;
    console.log(`対象: ${latest.year}年${latest.month}月利用選考会議終了時点`);

    const head = pdf.head.map((h) => toHalfWidth(squeeze(h)));
    const ageIdx = Array.from({ length: AGE_COUNT }, (_, i) => head.indexOf(`${i}歳`));
    if (ageIdx.some((i) => i < 0)) fail(`年齢の見出しが見つかりません: ${pdf.head.join(" / ")}`);
    const totalIdx = head.indexOf("合計");
    if (totalIdx < 0) fail(`「合計」の列が見つかりません: ${pdf.head.join(" / ")}`);
    const wardIdx = head.indexOf("地区");
    const nameIdx = head.indexOf("保育所名");
    const kindIdx = head.indexOf("区分");
    if (wardIdx < 0 || nameIdx < 0 || kindIdx < 0) fail(`見出しが想定と違います: ${pdf.head.join(" / ")}`);

    const parseRow = (row: string[], where: string): (number | null)[] =>
      ageIdx.map((c) => {
        const t = toHalfWidth(squeeze(row[c] ?? ""));
        // 空欄はそのクラスを設けていない（0〜2歳だけの園がある）
        if (t === "") return null;
        if (!/^[\d,]+$/.test(t)) fail(`${where}: 人数として読めません: 「${row[c]}」`);
        return Number(t.replace(/,/g, ""));
      });

    /** 行の「合計」列と年齢の和を突き合わせる */
    const checkTotal = (row: string[], values: (number | null)[], where: string) => {
      const t = toHalfWidth(squeeze(row[totalIdx] ?? "")).replace(/,/g, "");
      if (!/^\d+$/.test(t)) fail(`${where}: 合計を読めません: 「${row[totalIdx]}」`);
      const sum = values.reduce((a: number, v) => a + (v ?? 0), 0);
      if (Number(t) !== sum) fail(`${where}: 合計${t}と年齢ごとの和${sum}が合いません`);
    };

    const wards: string[] = [];
    const facilities: {
      id: string;
      name: string;
      w: number | null;
      c: null;
      vacancy: (number | null)[];
      waiting: (number | null)[];
    }[] = [];
    const seenId = new Set<string>();
    const builtVacancy = Array.from({ length: AGE_COUNT }, () => 0);
    const builtWaiting = Array.from({ length: AGE_COUNT }, () => 0);
    let builtCapacity = 0;
    let declaredVacancy: number[] | null = null;
    let declaredWaiting: number[] | null = null;
    let declaredCapacity = 0;

    const rows = pdf.rows;
    for (let i = 0; i < rows.length; i++) {
      const kind = squeeze(rows[i][kindIdx] ?? "");
      // 3行1組の先頭は「受入定員数」
      if (kind !== "受入定員数") {
        if (kind === "") continue;
        fail(`3行1組の並びが想定と違います: 「${kind}」`);
      }
      const vacancyRow = rows[i + 1];
      const waitingRow = rows[i + 2];
      if (!vacancyRow || !waitingRow) fail("空き数・待機人数の行が足りません");
      if (squeeze(vacancyRow[kindIdx] ?? "") !== "空き数") fail(`「空き数」の行が見つかりません（${i + 1}行目）`);
      if (!squeeze(waitingRow[kindIdx] ?? "").startsWith("待機人数")) {
        fail(`「待機人数」の行が見つかりません（${i + 2}行目）`);
      }

      // 施設名・地区は3行のどれに入るか決まっていないのでつなげて読む
      const group = [rows[i], vacancyRow, waitingRow];
      const name = squeeze(group.map((r) => r[nameIdx] ?? "").join(""));
      const ward = squeeze(group.map((r) => r[wardIdx] ?? "").join(""));
      i += 2;

      const capacityValues = parseRow(rows[i - 2], `稲城市 ${name || "合計"}（受入定員数）`);
      checkTotal(rows[i - 2], capacityValues, `稲城市 ${name || "合計"}（受入定員数）`);
      const vacancy = parseRow(vacancyRow, `稲城市 ${name || "合計"}（空き数）`);
      checkTotal(vacancyRow, vacancy, `稲城市 ${name || "合計"}（空き数）`);
      const waiting = parseRow(waitingRow, `稲城市 ${name || "合計"}（待機人数）`);
      checkTotal(waitingRow, waiting, `稲城市 ${name || "合計"}（待機人数）`);
      const capacity = capacityValues.reduce((a: number, v) => a + (v ?? 0), 0);

      if (ward === "合計" || name === "合計") {
        declaredVacancy = vacancy.map((v) => v ?? 0);
        declaredWaiting = waiting.map((v) => v ?? 0);
        declaredCapacity = capacity;
        continue;
      }
      if (!name) fail("施設名を読み取れませんでした");
      if (!ward) fail(`${name}: 地区を読み取れませんでした`);

      // 空きは定員を超えない
      for (const [age, v] of vacancy.entries()) {
        const cap = capacityValues[age];
        if (v !== null && cap !== null && v > cap) {
          fail(`${name}の${age}歳児: 空き${v}が受入定員${cap}を超えています`);
        }
      }
      vacancy.forEach((v, age) => {
        builtVacancy[age] += v ?? 0;
      });
      waiting.forEach((v, age) => {
        builtWaiting[age] += v ?? 0;
      });
      builtCapacity += capacity;

      if (!wards.includes(ward)) wards.push(ward);
      const id = `${ward}-${name}`;
      if (seenId.has(id)) fail(`施設名が重複しています: ${id}`);
      seenId.add(id);
      facilities.push({ id, name, w: wards.indexOf(ward), c: null, vacancy, waiting });
    }

    if (!declaredVacancy || !declaredWaiting) {
      fail("「合 計」の行が見つかりません。検算ができないので中断します。");
    }
    if (declaredVacancy.join("/") !== builtVacancy.join("/")) {
      fail(`空き数の合計行が ${declaredVacancy.join("/")} なのに積み上げが ${builtVacancy.join("/")} です`);
    }
    if (declaredWaiting.join("/") !== builtWaiting.join("/")) {
      fail(`待機人数の合計行が ${declaredWaiting.join("/")} なのに積み上げが ${builtWaiting.join("/")} です`);
    }
    if (declaredCapacity !== builtCapacity) {
      fail(`受入定員数の合計が ${declaredCapacity} なのに積み上げが ${builtCapacity} です`);
    }
    if (facilities.length < 15) fail(`施設が${facilities.length}件しか取れていません`);

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
      metrics: ["vacancy", "waiting"],
      subtitle: `${latest.year}年${latest.month}月利用の選考会議終了時点`,
      waitingCaveat:
        "その園を希望園のどこかに入れて申し込んでいる方の延べ人数です（転園を希望する方も含みます）。国の定義による待機児童数とは異なります。",
      notes: [
        "稲城市の注記のとおり、空き数が0でも選考後の転出や退所、入所辞退などで空きが出ることがあります。",
        "兄弟姉妹の同時入園希望や急な辞退・退園により、空きがあっても待機人数が生じることがあります。",
        "「—」はそのクラスを設けていない施設です。",
      ],
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
    console.log(
      `  合計行との突き合わせ: 空き ${builtVacancy.join("/")} / 待機 ${builtWaiting.join("/")} / 定員 ${builtCapacity} すべて一致`
    );
    console.log("");
    console.log(`  ${facilities.length}施設 / ${wards.length}地区`);
    console.log("");
    console.log("  年齢 | 空き | 待機（延べ）");
    builtVacancy.forEach((v, age) => console.log(`  ${age}歳児 | ${v} | ${builtWaiting[age]}`));
    console.log(
      `  合計 | ${builtVacancy.reduce((a, b) => a + b, 0)} | ${builtWaiting.reduce((a, b) => a + b, 0)}`
    );
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

main().catch((err) => fail(String(err)));
