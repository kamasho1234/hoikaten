/**
 * 国分寺市の認可保育所・家庭的保育の入所状況を取り込む
 *
 * 実行: npm run vacancy:fetch:kokubunji
 *
 * ## この自治体の特徴
 * - **定員・入所人数・空き・申込の4つを年齢ごとに公開している**数少ない自治体。
 *   空き＝定員−人数 が全施設で成り立つので、1行ずつ検算できる
 * - **家庭的保育は0〜2歳をまとめて1枠**で公表するため、年齢別には出せない。
 *   目黒区の家庭福祉員と同じく vacancyTotal に入れる
 * - **申込は延べ人数**。同じ人が複数園を希望するとそれぞれの園に数えられるため、
 *   公式の合計行（実人数）とは一致しない。検算からは外して注記で断る
 * - 別掲の「受入可能児童数」PDFの合計行が入所状況の空き合計と一致するので、
 *   独立した検算として使う（施設ごとの丸数字はずれているので照合には使わない）
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "kokubunji";
const MUNICIPALITY_NAME = "国分寺市";
const SOURCE_NAME = "国分寺市「認可保育所等の空き状況」";
const INDEX_URL =
  "https://www.city.kokubunji.tokyo.jp/kodomo-kyouiku/kosodate-shien/hoiku/1001131.html";
const AGE_COUNT = 6;

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const EXTRACTOR = path.join(process.cwd(), "scripts", "kokubunji-pdf-extract.py");

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

/** 「① こくぶんじ保育園」の丸数字を落とす。名前は文字から始まる */
function stripIndex(s: string): string {
  return squeeze(s).replace(
    /^[^\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}A-Za-zＡ-Ｚａ-ｚ]+/u,
    ""
  );
}

function parseNumber(raw: string, where: string): number {
  const t = toHalfWidth(squeeze(raw));
  if (!/^\d+$/.test(t)) fail(`${where}: 人数として読めません: 「${raw}」`);
  return Number(t);
}

type PdfTable = { head: string[]; sub: string[]; rows: string[][] };
type PdfResult = { asOf: number[][]; tables: PdfTable[]; vacancyTotal: number[] };

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

type Link = { url: string; text: string; year: number; month: number; sortKey: number };

/** 「令和8年8月1日の認可保育所・家庭的保育の入所状況」のようなリンクを拾う */
function findLinks(html: string, pattern: RegExp): Link[] {
  return [...html.matchAll(/<a[^>]+href="([^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => ({ url: new URL(m[1], INDEX_URL).toString(), text: toHalfWidth(stripTags(m[2])) }))
    .map((l) => {
      const m = l.text.match(pattern);
      if (!m) return null;
      const year = reiwaToYear(Number(m[1]));
      const month = Number(m[2]);
      return { ...l, year, month, sortKey: year * 100 + month };
    })
    .filter((v): v is Link => v !== null);
}

async function main() {
  console.log(`${MUNICIPALITY_NAME}の入所状況を取り込みます`);
  console.log(`公式ページ: ${INDEX_URL}\n`);

  const ua = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";
  const res = await fetch(INDEX_URL, { headers: { "User-Agent": ua } });
  if (!res.ok) fail(`公式ページが ${res.status} を返しました`);
  const html = await res.text();

  // 4月ぶんは「（一次選考）」「（二次選考）」に分かれるので、選考の区別がない月ぶんを使う
  const statusLinks = findLinks(html, /^令和(\d+)年(\d+)月1日の認可保育所・家庭的保育の入所状況/);
  if (statusLinks.length === 0) {
    fail("入所状況のPDFが見つかりません。ページの構成が変わった可能性があります。");
  }
  const status = statusLinks.reduce((a, b) => (b.sortKey > a.sortKey ? b : a));

  const vacancyLinks = findLinks(html, /^令和(\d+)年(\d+)月1日受入可能児童数/);
  if (vacancyLinks.length === 0) fail("受入可能児童数のPDFが見つかりません。");
  const vacancy = vacancyLinks.reduce((a, b) => (b.sortKey > a.sortKey ? b : a));

  console.log(`最新: ${status.text}\n  ${status.url}`);
  console.log(`検算用: ${vacancy.text}\n  ${vacancy.url}`);
  if (vacancy.sortKey !== status.sortKey) {
    fail(
      `入所状況（${status.year}年${status.month}月）と受入可能児童数（${vacancy.year}年${vacancy.month}月）の月が違います`
    );
  }

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "kokubunji-vacancy-"));
  try {
    const files: string[] = [];
    for (const [name, link] of [
      ["status", status],
      ["vacancy", vacancy],
    ] as const) {
      const r = await fetch(link.url, { headers: { "User-Agent": ua } });
      if (!r.ok) fail(`PDFの取得に失敗しました（${r.status}）: ${link.url}`);
      const buf = Buffer.from(await r.arrayBuffer());
      if (buf.subarray(0, 4).toString() !== "%PDF") fail(`PDFではありません: ${link.url}`);
      const file = path.join(tmpDir, `${name}.pdf`);
      fs.writeFileSync(file, buf);
      files.push(file);
    }

    let pdf: PdfResult;
    try {
      pdf = JSON.parse(runPython([EXTRACTOR, ...files])) as PdfResult;
    } catch (err) {
      fail(`抽出結果を読めません: ${String(err)}`);
    }

    if (pdf.asOf.length !== 1) fail(`PDFに基準日が${pdf.asOf.length}種類あります`);
    const [ry, rm, rd] = pdf.asOf[0];
    const year = reiwaToYear(ry);
    if (year !== status.year || rm !== status.month) {
      fail(
        `PDFの日付（令和${ry}年${rm}月）がリンクの文言（${status.year}年${status.month}月）と違います。`
      );
    }
    const asOf = `${year}-${String(rm).padStart(2, "0")}-${String(rd).padStart(2, "0")}`;
    console.log(`基準日: ${asOf}`);

    const categories = ["認可保育所", "家庭的保育"];
    type Facility = {
      id: string;
      name: string;
      w: null;
      c: number;
      vacancy: (number | null)[];
      waiting: (number | null)[];
      enrolled: (number | null)[];
      vacancyTotal?: number;
    };
    const facilities: Facility[] = [];
    const seenId = new Set<string>();
    // 公式の合計行と突き合わせる（定員・人数・空き。申込は延べなので合わない）
    const built = { capacity: 0, enrolled: 0, vacancy: 0 };
    const builtByAge = Array.from({ length: AGE_COUNT }, () => 0);
    let declared: number[] | null = null;
    let waitingTotalDeclared = 0;
    let waitingTotalBuilt = 0;

    for (const table of pdf.tables) {
      const head = table.head.map((h) => toHalfWidth(squeeze(h)));
      const sub = table.sub.map((h) => squeeze(h));
      // 年齢ごとに「定員／人数／空き／申込」の4列。家庭的保育は年齢の見出しがなく
      // 「対象年齢：0歳から2歳」とだけ書かれ、4列が1組だけ並ぶ
      const ageIdx = Array.from({ length: AGE_COUNT }, (_, i) => head.indexOf(`${i}歳`));
      const byAge = ageIdx[0] >= 0;
      const cols = byAge ? ageIdx : [sub.indexOf("定員")];
      if (cols[0] < 0) fail(`列の並びが分かりません: ${table.head.join(" / ")}`);
      for (const c of cols) {
        if (c < 0) continue;
        const got = sub.slice(c, c + 4).join("/");
        if (got !== "定員/人数/空き/申込") {
          fail(`「定員／人数／空き／申込」の並びが想定と違います: ${got}`);
        }
      }

      for (const row of table.rows) {
        const label = squeeze(row[0] ?? "");
        if (!label) continue;
        if (label === "合計") {
          if (!byAge) fail("家庭的保育の表に合計行があります。構成が変わった可能性があります。");
          declared = cols.map((c) => parseNumber(row[c + 2] ?? "", "国分寺市 合計行（空き）"));
          const capacity = cols.reduce(
            (a, c) => a + parseNumber(row[c] ?? "", "国分寺市 合計行（定員）"),
            0
          );
          const enrolled = cols.reduce(
            (a, c) => a + parseNumber(row[c + 1] ?? "", "国分寺市 合計行（人数）"),
            0
          );
          if (capacity !== built.capacity || enrolled !== built.enrolled) {
            fail(
              `合計行の定員/人数（${capacity}/${enrolled}）と積み上げ（${built.capacity}/${built.enrolled}）が違います`
            );
          }
          waitingTotalDeclared = cols.reduce(
            (a, c) => a + parseNumber(row[c + 3] ?? "", "国分寺市 合計行（申込）"),
            0
          );
          continue;
        }

        const name = stripIndex(label);
        if (!name) fail(`施設名を読めません: 「${label}」`);
        const categoryIndex = byAge ? 0 : 1;

        const vacancyValues: (number | null)[] = new Array(AGE_COUNT).fill(null);
        const waitingValues: (number | null)[] = new Array(AGE_COUNT).fill(null);
        const enrolledValues: (number | null)[] = new Array(AGE_COUNT).fill(null);
        let total = 0;
        for (const [age, col] of cols.entries()) {
          if (col < 0) continue;
          const where = `国分寺市 ${name}`;
          const capacity = parseNumber(row[col] ?? "", `${where}（定員）`);
          const current = parseNumber(row[col + 1] ?? "", `${where}（人数）`);
          const empty = parseNumber(row[col + 2] ?? "", `${where}（空き）`);
          const waiting = parseNumber(row[col + 3] ?? "", `${where}（申込）`);
          // **公式の表は定員・人数・空きが揃っている**ので1行ずつ検算する
          if (capacity - current !== empty) {
            fail(
              `${where}の${byAge ? `${age}歳児` : "0〜2歳"}: 定員${capacity}−人数${current}が空き${empty}と合いません`
            );
          }
          built.capacity += capacity;
          built.enrolled += current;
          built.vacancy += empty;
          waitingTotalBuilt += waiting;
          total += empty;
          if (byAge) {
            builtByAge[age] += empty;
            vacancyValues[age] = empty;
            waitingValues[age] = waiting;
            enrolledValues[age] = current;
          }
        }

        const id = `${categories[categoryIndex]}-${name}`;
        if (seenId.has(id)) fail(`施設名が重複しています: ${id}`);
        seenId.add(id);
        facilities.push({
          id,
          name,
          w: null,
          c: categoryIndex,
          vacancy: vacancyValues,
          waiting: waitingValues,
          enrolled: enrolledValues,
          // 家庭的保育は0〜2歳をまとめて1枠で公表するので年齢別に分けられない
          ...(byAge ? {} : { vacancyTotal: total }),
        });
      }
    }

    if (!declared) fail("合計行が見つかりません。検算ができないので中断します。");
    if (declared.join("/") !== builtByAge.join("/")) {
      fail(`空きの合計行が ${declared.join("/")} なのに積み上げが ${builtByAge.join("/")} です`);
    }
    // 別掲の「受入可能児童数」の合計行とも突き合わせる
    if (pdf.vacancyTotal.join("/") !== builtByAge.join("/")) {
      fail(
        `受入可能児童数の合計 ${pdf.vacancyTotal.join("/")} と空きの積み上げ ${builtByAge.join("/")} が違います`
      );
    }
    // 申込は延べなので合計（実人数）より多いはず。逆なら読み違えている
    if (waitingTotalBuilt < waitingTotalDeclared) {
      fail(
        `申込の積み上げ（${waitingTotalBuilt}）が公式の実人数合計（${waitingTotalDeclared}）を下回っています`
      );
    }
    if (facilities.length < 45) fail(`施設が${facilities.length}件しか取れていません`);

    const previous = fs.existsSync(OUT_PATH)
      ? (JSON.parse(fs.readFileSync(OUT_PATH, "utf-8")) as { asOf?: string; facilities?: unknown[]; sourceFiles?: Record<string, string> })
      : null;
    if (previous?.facilities && facilities.length < previous.facilities.length * 0.9) {
      fail(
        `施設数が大きく減っています（前回 ${previous.facilities.length}件 → 今回 ${facilities.length}件）`
      );
    }
    // 自治体は基準日を変えずに資料を差し替えることがある。
    // 取り込み元の一式も同じときだけ、書き換えを見送る
    if (
      previous?.asOf === asOf &&
      JSON.stringify(previous?.sourceFiles ?? {}) === JSON.stringify({ status: status.url, vacancy: vacancy.url })
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
      sourceFiles: { status: status.url, vacancy: vacancy.url },
      metrics: ["vacancy", "waiting", "enrolled"],
      subtitle: `${year}年${rm}月${rd}日入所時点の空き・申込`,
      waitingCaveat:
        "申込は園ごとの延べ人数です。複数の園を希望している方はそれぞれの園に数えられているため、足し上げても市全体の待機人数にはなりません。",
      notes: [
        "国分寺市が公表している定員・入所人数・空き・申込です。空きは定員から入所人数を引いた数です。",
        "定員はすでに弾力的運用（定員を超えての受入れ）を織り込んだ数が公表されています。",
        "家庭的保育は0歳から2歳をまとめた枠のため、年齢別には分けられません。",
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
    console.log(`  合計行・受入可能児童数の両方と一致（${builtByAge.join("/")}）`);
    console.log("");
    for (const [i, cat] of categories.entries()) {
      console.log(`  ${cat} ${facilities.filter((f) => f.c === i).length}施設`);
    }
    console.log("");
    console.log("  年齢 | 空き | 在籍");
    builtByAge.forEach((v, age) => {
      const enrolled = facilities.reduce((a, f) => a + (f.enrolled[age] ?? 0), 0);
      console.log(`  ${age}歳児 | ${v} | ${enrolled}`);
    });
    console.log(`  合計 | ${built.vacancy} | ${built.enrolled}（定員 ${built.capacity}）`);
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

main().catch((err) => fail(String(err)));
