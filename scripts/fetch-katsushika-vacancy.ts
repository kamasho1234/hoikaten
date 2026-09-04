/**
 * 葛飾区の認可保育園等の募集予定人数（空き状況）を取り込む
 *
 * 実行: npm run vacancy:fetch:katsushika
 *
 * ## この自治体の特徴
 * - **1本のPDFに3種類の表が入る**。認可保育園・認定こども園（0〜5歳）のあとに
 *   小規模保育事業所（0〜2歳）と保育ママ（0〜2歳）が続く。3・4・5歳は null で持つ
 * - **地域と「公・私」は縦の結合セル**。抽出側でセルの bbox から各行に配っている
 * - **園コードが無い**ので `地域/施設名` を施設IDにする
 * - `-` はそのクラスを設けていない。0は「募集予定なし」
 * - **同じ月のPDFが「◯月選考空き状況」という文言で並ぶ**ので、年月が最大のものを採り、
 *   PDF本文の「令和◯年◯月 募集予定人数」と突き合わせる
 *
 * ## 検算
 * 合計行が無いので、抽出側が**セル座標から数え直した合計**（crossCheck）と
 * 表から積み上げた合計を突き合わせる。1つでも違えば書き込まずに exit 1 する。
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "katsushika";
const MUNICIPALITY_NAME = "葛飾区";
const SOURCE_NAME = "葛飾区「認可保育園（認定こども園含む）・保育ママ・小規模保育事業所募集予定人数」";
const INDEX_URL =
  "https://www.city.katsushika.lg.jp/kosodate/1000056/1030355/1002334/index.html";
const ORIGIN = "https://www.city.katsushika.lg.jp";
const AGE_COUNT = 6;
const MIN_FACILITY_RATIO = 0.9;

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const RESEARCH_PATH = path.join(
  process.cwd(),
  "scripts",
  "vacancy-research",
  MUNICIPALITY_SLUG,
  "facilities_from_pdf.json"
);
const EXTRACTOR = path.join(process.cwd(), "scripts", "katsushika-pdf-extract.py");

/** 3歳以上のクラスを持たない表（小規模保育事業所・保育ママ）の種別名 */
const AGE3_KINDS = new Set(["小規模保育事業所", "保育ママ"]);

function fail(message: string): never {
  console.error(`\n[中断] ${message}`);
  process.exit(1);
}

function todayJst(): string {
  const now = new Date();
  const jst = new Date(now.getTime() + 9 * 60 * 60 * 1000);
  return jst.toISOString().slice(0, 10);
}

function reiwaToYear(reiwa: number): number {
  return 2018 + reiwa;
}

function stripTags(html: string): string {
  return html.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();
}

function toHalfWidth(s: string): string {
  return s.replace(/[０-９]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xfee0));
}

type PdfTable = {
  kind: string;
  columns: {
    area: number;
    kubun: number | null;
    name: number;
    address: number | null;
    ages: number[];
  };
  areaByRow: string[];
  kubunByRow: string[] | null;
  rows: string[][];
  crossCheck: number[] | null;
};
type PdfResult = { asOf: number[][]; target: number[][]; tables: PdfTable[] };

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

/** 「-」はそのクラスを設けていない、数字は募集人数 */
function parseValue(v: string, where: string): number | null {
  const t = (v ?? "").replace(/\s/g, "").replace(/[－ー]/g, "-");
  if (t === "" || t === "-") return null;
  if (/^\d+$/.test(toHalfWidth(t))) return Number(toHalfWidth(t));
  fail(`${where}: 募集人数として読めません: 「${v}」`);
}

/**
 * 地域名を認可の表の区分に寄せる。
 *
 * **認可は「亀有・白鳥」のような広域グループ**で地域を分けるが、
 * **小規模保育事業所と保育ママは「亀有」「白鳥」のように町名単位**で分ける。
 * そのままだと同じ区内で地域の粒度が2種類になり、絞り込みが分かれてしまうので、
 * 町名が含まれる広域グループに寄せる。どこにも当たらなければ中断する。
 */
function normalizeArea(area: string, wards: string[], where: string): string {
  if (wards.includes(area)) return area;
  const split = (s: string) =>
    s
      .split(/[・･]/)
      .map((t) => t.trim())
      .filter(Boolean);
  const towns = split(area);
  const hit = wards.find((w) => {
    const group = split(w);
    return towns.some((t) => group.includes(t));
  });
  if (!hit) fail(`${where}: 地域「${area}」を認可の地域区分（${wards.join("・")}）に対応づけられません`);
  return hit;
}

/** 施設類型。認可は「公立」「私立」、それ以外は表の種別をそのまま使う */
function categoryOf(kind: string, kubun: string, where: string): string {
  if (!AGE3_KINDS.has(kind)) {
    const k = kubun.replace(/\s/g, "");
    if (k.includes("公")) return "公立";
    if (k.includes("私")) return "私立";
    fail(`${where}: 公私の区分を読めません: 「${kubun}」`);
  }
  return kind;
}

async function main() {
  console.log(`${MUNICIPALITY_NAME}の認可保育園等の募集予定人数を取り込みます`);
  console.log(`公式ページ: ${INDEX_URL}\n`);

  const ua = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";
  const res = await fetch(INDEX_URL, { headers: { "User-Agent": ua } });
  if (!res.ok) fail(`公式ページが ${res.status} を返しました`);
  const indexHtml = await res.text();

  // 年度ごとのページ（「令和8年度認可保育園（認定こども園含む）…募集予定人数」）を辿る
  const yearPages = [...indexHtml.matchAll(/<a[^>]+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => ({ href: m[1], text: toHalfWidth(stripTags(m[2])) }))
    .map((l) => {
      const m = l.text.match(/令和(\d+)年度認可保育園.*募集予定人数/);
      if (!m || /参考/.test(l.text)) return null;
      return { ...l, year: reiwaToYear(Number(m[1])) };
    })
    .filter((v): v is NonNullable<typeof v> => v !== null);
  if (yearPages.length === 0) fail("年度別の募集予定人数ページが見つかりません。");
  const latestYearPage = yearPages.reduce((a, b) => (b.year > a.year ? b : a));
  const yearPageUrl = new URL(latestYearPage.href, INDEX_URL).toString();
  console.log(`年度ページ: ${latestYearPage.text}\n  ${yearPageUrl}`);

  const yearRes = await fetch(yearPageUrl, { headers: { "User-Agent": ua } });
  if (!yearRes.ok) fail(`年度ページが ${yearRes.status} を返しました`);
  const html = await yearRes.text();

  // 「9月選考空き状況 （PDF 233.4KB）」のように月だけが書かれている。
  // 4月は「4月2次選考空き状況」のように次数が付くので、次数の大きいものを後ろに置く
  const links = [...html.matchAll(/<a[^>]+href="([^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => ({
      url: new URL(m[1], yearPageUrl).toString(),
      text: toHalfWidth(stripTags(m[2])),
    }))
    .map((l) => {
      const m = l.text.match(/(\d+)月(?:(\d+)次)?選考空き状況/);
      if (!m) return null;
      const month = Number(m[1]);
      const round = m[2] ? Number(m[2]) : 1;
      // 年度は4〜12月がその年、1〜3月が翌年
      const year = month >= 4 ? latestYearPage.year : latestYearPage.year + 1;
      return { ...l, year, month, round, sortKey: year * 10000 + month * 100 + round };
    })
    .filter((v): v is NonNullable<typeof v> => v !== null);
  if (links.length === 0) fail("選考空き状況のPDFリンクが見つかりません。ページの構成が変わった可能性があります。");
  const latest = links.reduce((a, b) => (b.sortKey > a.sortKey ? b : a));
  console.log(`最新: ${latest.text}\n  ${latest.url}`);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "katsushika-vacancy-"));
  try {
    const pdfRes = await fetch(latest.url, { headers: { "User-Agent": ua } });
    if (!pdfRes.ok) fail(`PDFの取得に失敗しました（${pdfRes.status}）: ${latest.url}`);
    const buf = Buffer.from(await pdfRes.arrayBuffer());
    if (buf.subarray(0, 4).toString() !== "%PDF") fail(`PDFではありません: ${latest.url}`);
    const file = path.join(tmpDir, "katsushika.pdf");
    fs.writeFileSync(file, buf);

    const raw = runPython([EXTRACTOR, file]);
    let pdf: PdfResult;
    try {
      pdf = JSON.parse(raw) as PdfResult;
    } catch (err) {
      fail(`抽出結果を読めません: ${String(err)}`);
    }

    if (pdf.asOf.length !== 1) fail(`PDFに基準日が${pdf.asOf.length}種類あります`);
    const [ay, am, ad] = pdf.asOf[0];
    const asOf = `${reiwaToYear(ay)}-${String(am).padStart(2, "0")}-${String(ad).padStart(2, "0")}`;
    if (pdf.target.length !== 1) fail(`PDFに募集月が${pdf.target.length}種類あります`);
    const [ty, tm] = pdf.target[0];
    if (tm !== latest.month) {
      fail(`PDFの募集月（${tm}月）がリンクの文言（${latest.month}月）と違います。`);
    }
    const targetYear = reiwaToYear(ty);
    console.log(`基準日: ${asOf} / 対象: ${targetYear}年${tm}月入所の募集`);

    const wards: string[] = [];
    const categories: string[] = [];
    const facilities: {
      id: string;
      name: string;
      w: number;
      c: number;
      vacancy: (number | null)[];
    }[] = [];
    const research: { id: string; name: string; area: string; category: string; address: string }[] =
      [];
    const seen = new Set<string>();

    // 地域の区分は認可の表が基準になるので、認可を先に処理する
    const ordered = [
      ...pdf.tables.filter((t) => !AGE3_KINDS.has(t.kind)),
      ...pdf.tables.filter((t) => AGE3_KINDS.has(t.kind)),
    ];
    for (const t of ordered) {
      if (!t.crossCheck) fail(`${t.kind}: 検算用の集計が取れませんでした`);
      const ages = t.columns.ages;
      const built = new Array(ages.length).fill(0);

      for (const [ri, row] of t.rows.entries()) {
        const name = (row[t.columns.name] ?? "").trim();
        if (!name) continue; // 結合セルの余りや注記の行
        const raw = (t.areaByRow[ri] ?? "").trim();
        if (!raw) fail(`${t.kind} ${name}: 地域が分かりません`);
        const area = AGE3_KINDS.has(t.kind) ? normalizeArea(raw, wards, `${t.kind} ${name}`) : raw;
        const kubun = t.kubunByRow ? (t.kubunByRow[ri] ?? "").trim() : "";
        const category = categoryOf(t.kind, kubun, `${area} ${name}`);

        if (!wards.includes(area)) wards.push(area);
        if (!categories.includes(category)) categories.push(category);

        const values = ages.map((i) => parseValue(row[i] ?? "", `${area} ${name}`));
        values.forEach((v, i) => {
          built[i] += v ?? 0;
        });
        // 0〜2歳しかない表は3〜5歳を null（クラスなし）で埋める
        const vacancy: (number | null)[] =
          values.length === AGE_COUNT ? values : [...values, ...new Array(AGE_COUNT - values.length).fill(null)];

        const id = `${area}/${name}`;
        if (seen.has(id)) fail(`施設が重複しています: ${id}`);
        seen.add(id);
        facilities.push({
          id,
          name,
          w: wards.indexOf(area),
          c: categories.indexOf(category),
          vacancy,
        });
        research.push({
          id,
          name,
          area,
          category,
          address: t.columns.address === null ? "" : (row[t.columns.address] ?? "").trim(),
        });
      }

      const same = built.every((v, i) => v === t.crossCheck?.[i]);
      if (!same) {
        fail(
          `${t.kind}: 表から積み上げた合計 [${built}] が、座標から数え直した合計 [${t.crossCheck}] と違います。`
        );
      }
    }

    if (facilities.length === 0) fail("施設が1件も取れていません。");
    console.log(
      `施設 ${facilities.length}件 / 地域 ${wards.length}件 / 区分 ${categories.join("・")}`
    );

    let previous: { asOf?: string; facilities?: unknown[]; sourceFiles?: Record<string, string> } | null = null;
    if (fs.existsSync(OUT_PATH)) {
      previous = JSON.parse(fs.readFileSync(OUT_PATH, "utf-8"));
      const before = previous?.facilities?.length ?? 0;
      if (before > 0 && facilities.length < before * MIN_FACILITY_RATIO) {
        fail(`施設数が前回（${before}件）の${MIN_FACILITY_RATIO * 100}%を下回りました（${facilities.length}件）。`);
      }
      // 自治体は基準日を変えずに資料を差し替えることがある。
      // 取り込み元の一式も同じときだけ、書き換えを見送る
      if (
        previous?.asOf === asOf &&
        JSON.stringify(previous?.sourceFiles ?? {}) === JSON.stringify({ 募集予定人数: latest.url })
      ) {
        console.log(`\n基準日が前回と同じ（${asOf}）なので書き換えません。`);
        return;
      }
    }

    const dataset = {
      municipalitySlug: MUNICIPALITY_SLUG,
      municipalityName: MUNICIPALITY_NAME,
      asOf,
      fetchedAt: todayJst(),
      sourceName: SOURCE_NAME,
      sourceUrl: INDEX_URL,
      sourceFiles: { 募集予定人数: latest.url },
      metrics: ["vacancy"],
      subtitle: `${targetYear}年${tm}月入所ぶんの募集予定人数`,
      notes: [
        `葛飾区が公開しているのは「${targetYear}年${tm}月に入所できる枠の募集予定人数」です。現時点の空き数ではありません。`,
        "「—」はそのクラスを設けていないことを示します。0は募集予定人数が0であることを示します。",
        "小規模保育事業所と保育ママは0〜2歳児のみの受け入れです。",
        "募集予定人数が0名でも、在園児の退園などで空きが生じることがあるため申し込みはできます。",
        "私立保育園の募集定員で需要を補える場合、随時選考における公立保育園の募集を停止することがあります。",
        "葛飾区はこの数値をPDFで公開しています。当サイトは表をそのまま読み取って掲載しています。",
      ],
      wards,
      categories,
      facilities,
    };

    const { facilities: _facilities, ...meta } = dataset;
    const metaJson = JSON.stringify(meta, null, 2);
    const head = metaJson.slice(0, metaJson.lastIndexOf("}")).trimEnd();
    const body = facilities.map((f) => `    ${JSON.stringify(f)}`).join(",\n");
    const out = `${head},\n  "facilities": [\n${body}\n  ]\n}\n`;
    try {
      JSON.parse(out);
    } catch (err) {
      fail(`生成したJSONが不正です: ${String(err)}`);
    }
    fs.mkdirSync(path.dirname(OUT_PATH), { recursive: true });
    fs.writeFileSync(OUT_PATH, out, "utf-8");
    fs.mkdirSync(path.dirname(RESEARCH_PATH), { recursive: true });
    fs.writeFileSync(
      RESEARCH_PATH,
      `${JSON.stringify({ asOf, sourceUrl: latest.url, facilities: research }, null, 1)}\n`,
      "utf-8"
    );

    const ageTotals = Array.from({ length: AGE_COUNT }, (_, age) =>
      facilities.reduce((a, f) => a + (f.vacancy[age] ?? 0), 0)
    );
    console.log(`\n書き出しました: ${path.relative(process.cwd(), OUT_PATH)}`);
    console.log(`  データ時点: ${asOf}`);
    console.log("");
    wards.forEach((w, i) => {
      const list = facilities.filter((f) => f.w === i);
      const sum = list.reduce((a, f) => a + f.vacancy.reduce((s: number, v) => s + (v ?? 0), 0), 0);
      console.log(`  ${w.slice(0, 10).padEnd(12, "　")} ${String(list.length).padStart(3)}施設 / 募集${sum}`);
    });
    console.log("");
    categories.forEach((c, i) => {
      const list = facilities.filter((f) => f.c === i);
      console.log(`  ${c.padEnd(12, "　")} ${String(list.length).padStart(3)}施設`);
    });
    console.log("");
    console.log("  年齢 | 募集人数");
    ageTotals.forEach((v, age) => console.log(`  ${age}歳児 | ${v}`));
    console.log(`  合計 | ${ageTotals.reduce((a, b) => a + b, 0)}`);
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

main().catch((err) => fail(String(err)));
