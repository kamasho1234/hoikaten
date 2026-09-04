/**
 * 板橋区の認可保育園等・地域型保育施設の空き状況を取り込む
 *
 * 実行: npm run vacancy:fetch:itabashi
 *
 * ## この自治体の特徴
 * - **PDFが2本**（表＝認可保育園・認定こども園、裏＝地域型保育施設）。
 *   さらに1ページに表が4つ入る左右2段組（詳しくは itabashi-pdf-extract.py）
 * - **1行ごとに「合計」列がある**ので、年齢別の積み上げと1施設ずつ突き合わせて検算できる。
 *   さらに表の末尾にも合計行がある
 * - **地域（板橋・常盤台・志村…）が分かるのは認可保育園だけ**。
 *   地域型保育施設は所在地が町名なので、区の地域割りには寄せずに地域なしとして持つ
 * - 在宅家庭福祉員とベビールームは年齢別がなく「定員／欠員」だけ。欠員を合算値として持つ
 * - 「有り」「★」が入る延長保育・要支援児枠の列は空き数ではないので読み飛ばす
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "itabashi";
const MUNICIPALITY_NAME = "板橋区";
const SOURCE_NAME = "板橋区「空き状況一覧」";
const INDEX_URL = "https://www.city.itabashi.tokyo.jp/kosodate/azukeru/ninka/1058692/index.html";
const AGE_COUNT = 6;

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const EXTRACTOR = path.join(process.cwd(), "scripts", "itabashi-pdf-extract.py");

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

function parseValue(v: string, where: string): number | null {
  const t = toHalfWidth((v ?? "").replace(/[\s　]/g, ""));
  if (t === "" || t === "-" || t === "－" || t === "―") return null;
  if (/^\d+$/.test(t)) return Number(t);
  fail(`${where}: 人数として読めません: 「${v}」`);
}

type PdfTable = { head: string[]; areaByRow: string[]; rows: string[][] };
type PdfResult = { asOf: number[][]; target: number[]; tables: PdfTable[] };

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

/** 見出しから施設類型を決める。表題は表によって0列目にも1列目にも入る */
function categoryOf(head: string[]): string {
  const title = head.slice(0, 2).find((h) => /保育園|こども園|福祉員|ベビールーム|保育所|保育施設/.test(h));
  if (!title) fail(`施設類型が分かりません: ${head.join(" / ")}`);
  const t = title.replace(/名$/, "");
  if (t === "区立保育園") return "区立認可保育園";
  if (t === "私立保育園") return "私立認可保育園";
  return t;
}

async function main() {
  console.log(`${MUNICIPALITY_NAME}の空き状況を取り込みます`);
  console.log(`公式ページ: ${INDEX_URL}\n`);

  const ua = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";
  const indexRes = await fetch(INDEX_URL, { headers: { "User-Agent": ua } });
  if (!indexRes.ok) fail(`入所案内ページが ${indexRes.status} を返しました`);
  const indexHtml = await indexRes.text();

  // 「令和8年9月入所空き状況一覧」の月別ページを1段たどる
  const monthly = [...indexHtml.matchAll(/<a[^>]+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => ({ url: new URL(m[1], INDEX_URL).toString(), text: toHalfWidth(stripTags(m[2])) }))
    .map((l) => {
      const m = l.text.match(/令和(\d+)年(\d+)月入所空き状況一覧/);
      if (!m) return null;
      const year = reiwaToYear(Number(m[1]));
      const month = Number(m[2]);
      return { ...l, year, month, sortKey: year * 100 + month };
    })
    .filter((v): v is NonNullable<typeof v> => v !== null);
  if (monthly.length === 0) fail("月別の空き状況ページが見つかりません。ページの構成が変わった可能性があります。");
  const latestPage = monthly.reduce((a, b) => (b.sortKey > a.sortKey ? b : a));
  console.log(`最新: ${latestPage.text}\n  ${latestPage.url}`);

  const pageRes = await fetch(latestPage.url, { headers: { "User-Agent": ua } });
  if (!pageRes.ok) fail(`月別ページが ${pageRes.status} を返しました`);
  const pageHtml = await pageRes.text();
  const pdfs = [...pageHtml.matchAll(/<a[^>]+href="([^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => ({ url: new URL(m[1], latestPage.url).toString(), text: toHalfWidth(stripTags(m[2])) }))
    .filter((l) => /空き状況一覧/.test(l.text));
  if (pdfs.length !== 2) {
    fail(`空き状況のPDFが${pdfs.length}本あります（認可と地域型の2本のはず）: ${pdfs.map((p) => p.text).join(" / ")}`);
  }
  for (const p of pdfs) console.log(`  ${p.text}\n    ${p.url}`);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "itabashi-vacancy-"));
  try {
    const files: string[] = [];
    for (const [i, p] of pdfs.entries()) {
      const res = await fetch(p.url, { headers: { "User-Agent": ua } });
      if (!res.ok) fail(`PDFの取得に失敗しました（${res.status}）: ${p.url}`);
      const buf = Buffer.from(await res.arrayBuffer());
      if (buf.subarray(0, 4).toString() !== "%PDF") fail(`PDFではありません: ${p.url}`);
      const file = path.join(tmpDir, `itabashi-${i}.pdf`);
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
    const [ay, am, ad] = pdf.asOf[0];
    const asOf = `${reiwaToYear(ay)}-${String(am).padStart(2, "0")}-${String(ad).padStart(2, "0")}`;
    if (pdf.target.length !== 1) fail(`PDFに対象月が${pdf.target.length}種類あります`);
    if (pdf.target[0] !== latestPage.month) {
      fail(`PDFの対象月（${pdf.target[0]}月）がページの文言（${latestPage.month}月）と違います。`);
    }
    console.log(`\n基準日: ${asOf} / 対象: ${latestPage.year}年${latestPage.month}月利用`);

    const wards: string[] = [];
    const categories: string[] = [];
    const facilities: {
      id: string;
      name: string;
      w: number | null;
      c: number;
      vacancy: (number | null)[];
      vacancyTotal?: number;
    }[] = [];
    const seen = new Set<string>();
    let rowTotalChecks = 0;
    /**
     * 表の末尾の合計行との突き合わせは**類型ごとに合算してから**行う。
     * 私立保育園は表が2つに分かれていて、合計行は片方にしかない（両方を足した値が入る）ため。
     */
    const totals = new Map<
      string,
      { declared: number[]; built: number[]; declaredTotal: number | null; builtTotal: number }
    >();
    const totalFor = (cat: string) => {
      if (!totals.has(cat)) {
        totals.set(cat, {
          declared: new Array(AGE_COUNT).fill(0),
          built: new Array(AGE_COUNT).fill(0),
          declaredTotal: null,
          builtTotal: 0,
        });
      }
      return totals.get(cat)!;
    };

    for (const table of pdf.tables) {
      const head = table.head;
      const category = categoryOf(head);
      if (!categories.includes(category)) categories.push(category);
      const c = categories.indexOf(category);

      const ageIdx = Array.from({ length: AGE_COUNT }, (_, i) => head.indexOf(`${i}歳`));
      const hasAllAges = ageIdx.every((i) => i >= 0);
      const has02 = ageIdx.slice(0, 3).every((i) => i >= 0);
      const totalIdx = head.indexOf("合計");
      const shortageIdx = head.indexOf("欠員");
      const monthIdx = head.indexOf("月齢");
      // 地域型の表は「〜名」という見出しがある。認可の表は見出しがないので「月齢」の1つ手前
      const namedIdx = head.findIndex((h) => /名$/.test(h));
      const nameIdx = namedIdx >= 0 ? namedIdx : monthIdx - 1;
      if (nameIdx < 0) fail(`園名の列が分かりません: ${head.join(" / ")}`);
      // 地域の縦書きが入るのは園名の左に列があるときだけ
      const hasArea = nameIdx >= 1;

      const agg = totalFor(category);

      for (const [ri, row] of table.rows.entries()) {
        const name = (row[nameIdx] ?? "").trim();
        const first = (row[0] ?? "").replace(/[\s　]/g, "");
        if (ri === 0) continue; // 見出し行

        // **合計行は園名の列が空**なので、施設名のチェックより先に見る
        if (first === "合計" || name.replace(/[\s　]/g, "") === "合計") {
          if (hasAllAges || has02) {
            const ages = (hasAllAges ? ageIdx : ageIdx.slice(0, 3)).map((i) =>
              parseValue(row[i] ?? "", `板橋区 ${category}の合計行`)
            );
            ages.forEach((v, i) => {
              agg.declared[i] += v ?? 0;
            });
          } else if (shortageIdx >= 0) {
            agg.declaredTotal =
              (agg.declaredTotal ?? 0) +
              (parseValue(row[shortageIdx] ?? "", `板橋区 ${category}の合計行`) ?? 0);
          }
          continue;
        }

        // 注記の行（※〜／申込みの案内）は施設ではない
        if (!name || name.startsWith("※") || /お申込み/.test(name)) continue;

        const area = hasArea ? table.areaByRow[ri] : "";
        let w: number | null = null;
        if (area) {
          if (!wards.includes(area)) wards.push(area);
          w = wards.indexOf(area);
        }
        // 同じ名前の園が別の類型にも出るときは類型を添えて分ける
        const key = seen.has(name) ? `${name}（${category}）` : name;
        if (seen.has(key)) fail(`施設名が重複しています: ${key}`);
        seen.add(name);
        seen.add(key);

        if (hasAllAges || has02) {
          const cols = hasAllAges ? ageIdx : ageIdx.slice(0, 3);
          const values = cols.map((i) => parseValue(row[i] ?? "", `板橋区 ${name}`));
          const vacancy: (number | null)[] = new Array(AGE_COUNT).fill(null);
          values.forEach((v, i) => {
            vacancy[i] = v;
          });
          // 行の「合計」と積み上げを突き合わせる
          if (totalIdx >= 0) {
            const rowTotal = parseValue(row[totalIdx] ?? "", `板橋区 ${name}（合計）`);
            const sum = values.reduce((a: number, v) => a + (v ?? 0), 0);
            if (rowTotal !== null && rowTotal !== sum) {
              fail(`${name}: 行の「合計」が${rowTotal}なのに年齢別の合計が${sum}です`);
            }
            if (rowTotal !== null) rowTotalChecks++;
          }
          values.forEach((v, i) => {
            agg.built[i] += v ?? 0;
          });
          facilities.push({ id: key, name: key, w, c, vacancy });
        } else if (shortageIdx >= 0) {
          // 在宅家庭福祉員・ベビールームは「欠員」だけ。年齢別には分かれていない
          const v = parseValue(row[shortageIdx] ?? "", `板橋区 ${name}`) ?? 0;
          agg.builtTotal += v;
          facilities.push({
            id: key,
            name: key,
            w,
            c,
            vacancy: new Array(AGE_COUNT).fill(null),
            vacancyTotal: v,
          });
        } else {
          fail(`${category}: 年齢の列も欠員の列も見つかりません: ${head.join(" / ")}`);
        }
      }

    }

    // 公式の合計行との突き合わせ
    const totalReport: string[] = [];
    for (const [cat, agg] of totals) {
      const hasAgeTotal = agg.declared.some((v) => v !== 0) || agg.built.some((v) => v !== 0);
      if (hasAgeTotal) {
        const d = agg.declared.join("/");
        const b = agg.built.join("/");
        if (d !== b) fail(`${cat}: 合計行が ${d} なのに積み上げが ${b} です`);
        totalReport.push(`${cat}: 合計行と一致（${d}）`);
      }
      if (agg.declaredTotal !== null) {
        if (agg.declaredTotal !== agg.builtTotal) {
          fail(`${cat}: 合計行の欠員が${agg.declaredTotal}なのに積み上げが${agg.builtTotal}です`);
        }
        totalReport.push(`${cat}: 合計行の欠員と一致（${agg.builtTotal}）`);
      }
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
    // 取り込み元の一式も同じときだけ、書き換えを見送る
    if (
      previous?.asOf === asOf &&
      JSON.stringify(previous?.sourceFiles ?? {}) === JSON.stringify(Object.fromEntries(pdfs.map((p, i) => [i === 0 ? "vacancy" : "vacancy2", p.url]))) &&
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
      sourceUrl: latestPage.url,
      sourceFiles: Object.fromEntries(pdfs.map((p, i) => [i === 0 ? "vacancy" : "vacancy2", p.url])),
      metrics: ["vacancy"],
      subtitle: `${latestPage.year}年${latestPage.month}月利用の空き状況`,
      notes: [
        "地域（板橋・常盤台・志村など）が公表されているのは認可保育園だけです。地域型保育施設は所在地が町名で示されるため、当サイトでは地域なしとして扱っています。",
        "在宅家庭福祉員とベビールームは年齢別に分けず欠員数だけが公表されています。",
        "認定こども園板橋向原幼稚園の選考は区では行いません。園に直接お申し込みください。",
      ],
      wards,
      categories,
      facilities,
    };

    const { facilities: _f, ...meta } = dataset;
    const metaJson = JSON.stringify(meta, null, 2);
    const head = metaJson.slice(0, metaJson.lastIndexOf("}")).trimEnd();
    const bodyJson = facilities.map((f) => `    ${JSON.stringify(f)}`).join(",\n");
    const out = `${head},\n  "facilities": [\n${bodyJson}\n  ]\n}\n`;
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
    const merged = facilities.reduce((acc, f) => acc + (f.vacancyTotal ?? 0), 0);
    console.log(`書き出しました: ${path.relative(process.cwd(), OUT_PATH)}`);
    console.log(`  データ時点: ${asOf}`);
    console.log(`  行の「合計」との突き合わせ: ${rowTotalChecks}件すべて一致`);
    for (const line of totalReport) console.log(`  ${line}`);
    console.log("");
    for (const [i, cat] of categories.entries()) {
      const list = facilities.filter((f) => f.c === i);
      const v = list.reduce(
        (a, f) => a + f.vacancy.reduce((x: number, y) => x + (y ?? 0), 0) + (f.vacancyTotal ?? 0),
        0
      );
      console.log(`  ${cat} ${list.length}施設 / 空き${v}`);
    }
    console.log("");
    for (const [i, wd] of wards.entries()) {
      console.log(`  ${wd} ${facilities.filter((f) => f.w === i).length}施設`);
    }
    console.log(`  地域なし ${facilities.filter((f) => f.w === null).length}施設`);
    console.log("");
    console.log("  年齢 | 空き");
    ageTotals.forEach((v, age) => console.log(`  ${age}歳児 | ${v}`));
    console.log(`  年齢別なしの合算 | ${merged}`);
    console.log(`  合計 | ${ageTotals.reduce((a, b) => a + b, 0) + merged}`);
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

main().catch((err) => fail(String(err)));
