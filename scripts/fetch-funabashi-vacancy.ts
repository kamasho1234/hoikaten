/**
 * 船橋市の保育所等の受入れ可能性一覧を取り込む
 *
 * 実行: npm run vacancy:fetch:funabashi
 *
 * ## この自治体の特徴
 * - **Excelで公開している**。シート1枚に全施設が並ぶ
 * - 数値は翌月の利用調整における受入れ予定の児童数
 * - **地区が駅周辺などの23区分**で、縦に結合された列を引き継ぐ
 * - 公立／私立の別と、施設の種別（保育園・認定こども園・小規模保育事業所・
 *   家庭的保育事業者）が別々の列にある。両方を合わせて施設類型にする
 * - **凡例が明確**: 空白は「現時点で受入れ見込みなし」、「／」は「受入れ年齢の制限があり
 *   該当クラスがない」。つまり**空白は0人**であって「クラスがない」ではない
 */

import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import os from "node:os";

const MUNICIPALITY_SLUG = "funabashi";
const MUNICIPALITY_NAME = "船橋市";
const SOURCE_NAME = "船橋市「保育所等の受入れ可能性一覧」";
const INDEX_URL = "https://www.city.funabashi.lg.jp/kodomo/hoiku/002/p060892.html";
const AGE_COUNT = 6;

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const EXTRACTOR = path.join(process.cwd(), "scripts", "funabashi-xlsx-extract.py");

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

type XlsxResult = { title: string; lead: string; legend: string; head: string[]; rows: string[][] };

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
      fail(`Excelの読み込みに失敗しました（${bin}）: ${e.stderr || e.message}`);
    }
  }
  fail(`Pythonを実行できません（${lastError}）。openpyxl が入った python が必要です。`);
}

async function main() {
  console.log(`${MUNICIPALITY_NAME}の受入れ可能性一覧を取り込みます`);
  console.log(`公式ページ: ${INDEX_URL}\n`);

  const ua = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";
  const res = await fetch(INDEX_URL, { headers: { "User-Agent": ua } });
  if (!res.ok) fail(`公式ページが ${res.status} を返しました`);
  const html = await res.text();

  // 「令和8年9月の保育所等受入れ可能性一覧(Excel)」
  const links = [...html.matchAll(/<a[^>]+href="([^"]+\.xlsx)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => ({ url: new URL(m[1], INDEX_URL).toString(), text: toHalfWidth(stripTags(m[2])) }))
    .map((l) => {
      const m = l.text.match(/令和(\d+)年(\d+)月の保育所等受入れ可能性一覧/);
      if (!m) return null;
      const year = reiwaToYear(Number(m[1]));
      const month = Number(m[2]);
      return { ...l, year, month, sortKey: year * 100 + month };
    })
    .filter((v): v is NonNullable<typeof v> => v !== null);
  if (links.length === 0) fail("受入れ可能性一覧のExcelが見つかりません。ページの構成が変わった可能性があります。");
  const latest = links.reduce((a, b) => (b.sortKey > a.sortKey ? b : a));
  console.log(`最新: ${latest.text}\n  ${latest.url}`);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "funabashi-vacancy-"));
  try {
    const r = await fetch(latest.url, { headers: { "User-Agent": ua } });
    if (!r.ok) fail(`Excelの取得に失敗しました（${r.status}）: ${latest.url}`);
    const file = path.join(tmpDir, "funabashi.xlsx");
    fs.writeFileSync(file, Buffer.from(await r.arrayBuffer()));

    let book: XlsxResult;
    try {
      book = JSON.parse(runPython([EXTRACTOR, file])) as XlsxResult;
    } catch (err) {
      fail(`読み込み結果を読めません: ${String(err)}`);
    }

    // 「令和8年9月」が表題の左に入る。作成日はその右のセル
    const tm = toHalfWidth(book.title).match(/令和(\d+)年(\d+)月/);
    if (!tm) fail(`表題から対象月を読み取れません: ${book.title}`);
    const targetYear = reiwaToYear(Number(tm[1]));
    const targetMonth = Number(tm[2]);
    if (targetYear !== latest.year || targetMonth !== latest.month) {
      fail(
        `Excelの対象月（${targetYear}年${targetMonth}月）がリンクの文言（${latest.year}年${latest.month}月）と違います。`
      );
    }
    const asOf = book.lead;
    if (!/^\d{4}-\d{2}-\d{2}$/.test(asOf)) fail(`作成日を読み取れません: ${asOf}`);
    // 凡例が変わっていないか確かめる。空白の意味が変わると数値の意味が変わってしまう
    if (!squeeze(book.legend).includes("「空白」…現時点で受入れ見込みなし")) {
      fail(`凡例が想定と違います: ${book.legend}`);
    }
    console.log(`作成日: ${asOf} / 対象: ${targetYear}年${targetMonth}月の利用調整`);

    const head = book.head.map((h) => squeeze(h));
    const idx = {
      area: head.indexOf("地区"),
      name: head.findIndex((h) => h.startsWith("保育所等の名称")),
      place: head.indexOf("地名"),
      capacity: head.indexOf("定員"),
    };
    if (idx.area !== 0 || idx.name < 0) fail(`見出しが想定と違います: ${book.head.join(" / ")}`);
    const ageIdx = Array.from({ length: AGE_COUNT }, (_, i) =>
      head.findIndex((h) => toHalfWidth(h) === `${i}歳`)
    );
    if (ageIdx.some((i) => i < 0)) fail(`年齢の見出しが足りません: ${book.head.join(" / ")}`);

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
    let area = "";

    for (const row of book.rows) {
      if (squeeze(row[idx.area] ?? "")) area = (row[idx.area] ?? "").replace(/[　\s]+/g, " ").trim();
      const name = (row[idx.name] ?? "").replace(/[　\s]+/g, " ").trim();
      if (!name) continue;
      if (squeeze(name).startsWith("保育所等の名称")) continue;
      if (!area) fail(`${name}: 地区が分かりません`);

      // 公立／私立（1列目）と施設の種別（4列目）を合わせて類型にする
      const owner = squeeze(row[1] ?? "");
      const kind = squeeze(row[3] ?? "");
      if (!owner || !kind) fail(`${name}: 施設の種別が分かりません（${owner}/${kind}）`);
      const category = `${owner}${kind}`;
      if (!wards.includes(area)) wards.push(area);
      if (!categories.includes(category)) categories.push(category);

      const vacancy: (number | null)[] = [];
      for (const [age, col] of ageIdx.entries()) {
        const raw = squeeze(row[col] ?? "");
        // 凡例のとおり、空白は「受入れ見込みなし」＝0人、「／」はクラスがない
        if (raw === "") {
          vacancy.push(0);
          continue;
        }
        if (raw === "／" || raw === "/") {
          vacancy.push(null);
          continue;
        }
        const t = toHalfWidth(raw);
        if (!/^\d+$/.test(t)) fail(`${name}: ${age}歳児を人数として読めません: 「${raw}」`);
        vacancy.push(Number(t));
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
      subtitle: `${targetYear}年${targetMonth}月の利用調整における受入れ予定人数`,
      notes: [
        "船橋市の注記のとおり、これは作成日時点の受入れ予定人数で、実際の受入れ児童数とは異なることがあります。今後の保育士配置や入園辞退、転園、退園などで変わります。",
        "公式の表で空白になっている欄は「現時点で受入れ見込みなし」の意味なので0人としています。受入れ年齢の制限で該当クラスがない場合は「—」です。",
        "「連携施設」は小規模保育事業所の卒園児の受入状況によって受入れ可能児童数が変わることがあります。",
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
    console.log(`  地区: ${wards.length} / 類型: ${categories.join("・")}`);
    console.log("");
    console.log("  年齢 | 受入れ予定");
    ageTotals.forEach((v, age) => console.log(`  ${age}歳児 | ${v}`));
    console.log(`  合計 | ${ageTotals.reduce((a, b) => a + b, 0)}`);
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

main().catch((err) => fail(String(err)));
