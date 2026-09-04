/**
 * 柏市の保育園等の空き状況を取り込む
 *
 * 実行: npm run vacancy:fetch:kashiwa
 *
 * ## この自治体の特徴
 * - **空き人数と保留者数の両方を実数で公開している**（横浜市・北区・広島市などと同じ）
 * - 数値は**利用調整が終わった時点の空き**。翌月1日入園ぶん
 * - **「2△」のように数字に記号が付く**ことがある。柏市の凡例では
 *   「2名空きがあり、施設の保育体制によりさらに何名か受け入れできる場合がある」。
 *   人数の部分（2）を採り、△が付いていた施設を注記に出す
 * - 「×」は定員に空きがないという意味なので0にする（希望を出すことはできる）
 * - 「△」だけの欄は人数が示されていないので「—」にする
 * - 施設の種類は左端の縦書き（公立保育園・私立保育園・認定こども園・小規模保育園）
 *
 * ## 保留者数の読み方
 * その施設に入園・転園を希望している柏市民の人数。第5希望まで書いた人は5園すべてに
 * 数えられているので、そのまま倍率にはならない。
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "kashiwa";
const MUNICIPALITY_NAME = "柏市";
const SOURCE_NAME = "柏市「保育園等の空き状況」";
const INDEX_URL = "https://www.city.kashiwa.lg.jp/hoikuunei/haguhagu/hokatsu/joho/akijokyo.html";
const AGE_COUNT = 6;

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const EXTRACTOR = path.join(process.cwd(), "scripts", "kashiwa-pdf-extract.py");

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

type PdfTable = { head: string[]; subHead: string[]; rows: string[][] };
type PdfResult = { asOf: number[][]; tables: PdfTable[] };

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

  // 「令和8年度9月状況（9月1日現在）（PDF：267KB）」
  const links = [...html.matchAll(/<a[^>]+href="([^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => ({ url: new URL(m[1], INDEX_URL).toString(), text: toHalfWidth(stripTags(m[2])) }))
    .map((l) => {
      const m = l.text.match(/令和(\d+)年度(\d+)月状況/);
      if (!m) return null;
      const fiscalYear = reiwaToYear(Number(m[1]));
      const month = Number(m[2]);
      // 年度なので1〜3月は翌年
      const year = month <= 3 ? fiscalYear + 1 : fiscalYear;
      return { ...l, year, month, sortKey: year * 100 + month };
    })
    .filter((v): v is NonNullable<typeof v> => v !== null);
  if (links.length === 0) fail("空き状況のPDFが見つかりません。ページの構成が変わった可能性があります。");
  const latest = links.reduce((a, b) => (b.sortKey > a.sortKey ? b : a));
  console.log(`最新: ${latest.text}\n  ${latest.url}`);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "kashiwa-vacancy-"));
  try {
    const r = await fetch(latest.url, { headers: { "User-Agent": ua } });
    if (!r.ok) fail(`PDFの取得に失敗しました（${r.status}）: ${latest.url}`);
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.subarray(0, 4).toString() !== "%PDF") fail(`PDFではありません: ${latest.url}`);
    const file = path.join(tmpDir, "kashiwa.pdf");
    fs.writeFileSync(file, buf);

    let pdf: PdfResult;
    try {
      pdf = JSON.parse(runPython([EXTRACTOR, file])) as PdfResult;
    } catch (err) {
      fail(`抽出結果を読めません: ${String(err)}`);
    }

    if (pdf.asOf.length !== 1) fail(`PDFに基準日が${pdf.asOf.length}種類あります`);
    const [ay, am, ad] = pdf.asOf[0];
    if (reiwaToYear(ay) !== latest.year || am !== latest.month) {
      fail(
        `PDFの日付（${reiwaToYear(ay)}年${am}月）がリンクの文言（${latest.year}年${latest.month}月）と違います。`
      );
    }
    const asOf = `${reiwaToYear(ay)}-${String(am).padStart(2, "0")}-${String(ad).padStart(2, "0")}`;
    console.log(`基準日: ${asOf}（${latest.year}年${latest.month}月1日入園の利用調整後）`);

    const categories: string[] = [];
    const facilities: {
      id: string;
      name: string;
      w: null;
      c: number;
      vacancy: (number | null)[];
      waiting: (number | null)[];
    }[] = [];
    const seenId = new Set<string>();
    const flexible: string[] = [];
    const unknownVacancy: string[] = [];
    let category = "";

    for (const table of pdf.tables) {
      // 2行目に「空き」「保留者」が交互に並ぶ
      const sub = table.subHead.map((h) => squeeze(h));
      const ageHead = table.head.map((h) => squeeze(h));
      const ageIdx = Array.from({ length: AGE_COUNT }, (_, i) =>
        ageHead.findIndex((h) => toHalfWidth(h) === `${i}歳児`)
      );
      if (ageIdx.some((i) => i < 0)) fail(`年齢の見出しが足りません: ${table.head.join(" / ")}`);
      for (const [age, col] of ageIdx.entries()) {
        if (sub[col] !== "空き" || sub[col + 1] !== "保留者") {
          fail(`${age}歳児の「空き」「保留者」の並びが想定と違います: ${table.subHead.join(" / ")}`);
        }
      }

      for (const row of table.rows) {
        // 施設の種類は左端の縦書き。変わるときだけ値が入る
        // 「認定こども園（２・３号）※２」のように注記番号が付く
        if (squeeze(row[0] ?? "")) category = squeeze(row[0]).replace(/※[０-９\d]+$/, "");
        const name = (row[1] ?? "").replace(/[　\s]+/g, "").trim();
        if (!name) continue;
        if (!category) fail(`${name}: 施設の種類が分かりません`);
        if (!categories.includes(category)) categories.push(category);

        const vacancy: (number | null)[] = [];
        const waiting: (number | null)[] = [];
        for (const [age, col] of ageIdx.entries()) {
          const rawV = toHalfWidth(squeeze(row[col] ?? ""));
          const rawW = toHalfWidth(squeeze(row[col + 1] ?? ""));

          if (rawV === "") {
            vacancy.push(null);
          } else if (rawV === "×") {
            // 定員に空きがない
            vacancy.push(0);
          } else if (/^\d+$/.test(rawV)) {
            vacancy.push(Number(rawV));
          } else if (/^(\d+)△$/.test(rawV)) {
            // 「2△」＝2名空きがあり、体制によってはさらに受け入れできる
            flexible.push(`${name}（${age}歳児）`);
            vacancy.push(Number(rawV.replace("△", "")));
          } else if (rawV === "△") {
            // 人数が示されていない
            unknownVacancy.push(`${name}（${age}歳児）`);
            vacancy.push(null);
          } else {
            fail(`${name}: ${age}歳児の空きを読めません: 「${row[col]}」`);
          }

          if (rawW === "") {
            waiting.push(null);
          } else if (/^\d+$/.test(rawW)) {
            waiting.push(Number(rawW));
          } else {
            fail(`${name}: ${age}歳児の保留者を読めません: 「${row[col + 1]}」`);
          }
        }

        const id = `${category}-${name}`;
        if (seenId.has(id)) fail(`施設名が重複しています: ${id}`);
        seenId.add(id);
        facilities.push({
          id,
          name,
          w: null,
          c: categories.indexOf(category),
          vacancy,
          waiting,
        });
      }
    }

    if (facilities.length < 90) fail(`施設が${facilities.length}件しか取れていません`);

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
      subtitle: `${latest.year}年${latest.month}月1日入園の利用調整後の空き状況`,
      waitingCaveat:
        "保留者数は、その施設に入園・転園を希望している柏市民の人数です。第5希望まで書いた方は5園すべてに数えられているので、そのまま倍率にはなりません。",
      notes: [
        "柏市の注記のとおり、これは利用調整が終わった時点の空き状況で、定員数ではありません。退園や入園辞退で変わることがあります。",
        "保育士の配置や在園児童の状況により、受入れ予定人数まで受け入れができない場合があります。",
        "公式の表で「×」は定員に空きがないという意味です（空きがなくても希望は出せます）。当サイトでは0人として示しています。",
        ...(flexible.length > 0
          ? [
              `次のクラスは公式の表で「2△」のように書かれていて、示された人数に加えて施設の体制によりさらに受け入れできる場合があります: ${flexible.join("、")}`,
            ]
          : []),
        ...(unknownVacancy.length > 0
          ? [
              `次のクラスは「△」とだけ書かれていて人数が示されていないため「—」にしています: ${unknownVacancy.join("、")}`,
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
    const waitTotals = Array.from({ length: AGE_COUNT }, (_, age) =>
      facilities.reduce((acc, f) => acc + (f.waiting[age] ?? 0), 0)
    );
    console.log(`書き出しました: ${path.relative(process.cwd(), OUT_PATH)}`);
    console.log(`  「N△」（さらに受け入れできる場合あり）: ${flexible.length}クラス`);
    console.log(`  「△」だけで人数が不明: ${unknownVacancy.length}クラス`);
    console.log("");
    for (const [i, cat] of categories.entries()) {
      console.log(`  ${cat} ${facilities.filter((f) => f.c === i).length}施設`);
    }
    console.log("");
    console.log("  年齢 | 空き | 保留者");
    ageTotals.forEach((v, age) => console.log(`  ${age}歳児 | ${v} | ${waitTotals[age]}`));
    console.log(
      `  合計 | ${ageTotals.reduce((a, b) => a + b, 0)} | ${waitTotals.reduce((a, b) => a + b, 0)}`
    );
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

main().catch((err) => fail(String(err)));
