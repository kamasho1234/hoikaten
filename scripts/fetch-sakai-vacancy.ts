/**
 * 堺市の認定こども園・保育所などの空き状況を取り込む
 *
 * 実行: npm run vacancy:fetch:sakai
 *
 * ## この自治体の特徴
 * - **Excelで公開している**。シートは1枚で、7区（堺・中・東・西・南・北・美原）が続けて並ぶ
 * - 数値は**翌月1日入所の新規利用可能予定数**（直近の利用調整のあとの空き）
 * - **年齢の列が5歳→0歳の逆順**。ほかの自治体と違うので取り違えに注意
 * - 所在区の列は縦に結合されていて、変わるときだけ値が入る
 * - **ページをまたぐたびに見出し行が入る**（施設種別の欄が「施設種別」になっている行）
 * - 施設種別は「幼保認」「幼稚認」「保育認」「保育所」「小規模」「事業所」「家庭的」という
 *   短い表記。**公式に凡例が見当たらない**ので、勝手に展開せずそのまま使う
 * - 企業主導型保育事業所は別のPDFだけで公開されているため、ここには入らない
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "sakai";
const MUNICIPALITY_NAME = "堺市";
const SOURCE_NAME = "堺市「認定こども園・保育所などの空き状況」";
const INDEX_URL =
  "https://www.city.sakai.lg.jp/kosodate/hughug/hoiku/moushikomi/75629020210427144357346.html";
const AGE_COUNT = 6;
const WARD_COUNT = 7;

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const EXTRACTOR = path.join(process.cwd(), "scripts", "sakai-xlsx-extract.py");

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

/** 空欄は受入対象外のクラス */
function parseValue(raw: string, where: string): number | null {
  const t = toHalfWidth(squeeze(raw));
  if (t === "" || t === "-" || t === "－" || t === "―" || t === "/" || t === "／") return null;
  if (/^\d+$/.test(t)) return Number(t);
  fail(`${where}: 人数として読めません: 「${raw}」`);
}

type XlsxResult = { title: string; lead: string; rows: string[][]; ageHeads: string[] };

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
  console.log(`${MUNICIPALITY_NAME}の空き状況を取り込みます`);
  console.log(`公式ページ: ${INDEX_URL}\n`);

  const ua = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";
  const res = await fetch(INDEX_URL, { headers: { "User-Agent": ua } });
  if (!res.ok) fail(`公式ページが ${res.status} を返しました`);
  const html = await res.text();

  // ファイル名が「R8.9nyuusyo3.xlsx」の形（令和8年9月ぶん）。
  // 令和8年10月ぶんから点が無くなり「R810nyuusyo3.xlsx」になった。両方に当てる
  const links = [...html.matchAll(/<a[^>]+href="([^"]+\.xlsx)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => ({ url: new URL(m[1], INDEX_URL).toString(), text: toHalfWidth(stripTags(m[2])) }))
    .map((l) => {
      const file = path.basename(new URL(l.url).pathname);
      // 点があるときは「年.月」、無いときは令和の年が1桁で続く1〜2桁が月
      const m = file.match(/^R(\d+)\.(\d+)nyuusyo/i) ?? file.match(/^R(\d)(\d{1,2})nyuusyo/i);
      if (!m) return null;
      const year = reiwaToYear(Number(m[1]));
      const month = Number(m[2]);
      return { ...l, year, month, sortKey: year * 100 + month };
    })
    .filter((v): v is NonNullable<typeof v> => v !== null);
  if (links.length === 0) fail("月ぶんの空き状況Excelが見つかりません。ページの構成が変わった可能性があります。");
  const latest = links.reduce((a, b) => (b.sortKey > a.sortKey ? b : a));
  console.log(`最新: ${latest.text}\n  ${latest.url}`);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "sakai-vacancy-"));
  try {
    const r = await fetch(latest.url, { headers: { "User-Agent": ua } });
    if (!r.ok) fail(`Excelの取得に失敗しました（${r.status}）: ${latest.url}`);
    const file = path.join(tmpDir, "sakai.xlsx");
    fs.writeFileSync(file, Buffer.from(await r.arrayBuffer()));

    let book: XlsxResult;
    try {
      book = JSON.parse(runPython([EXTRACTOR, file])) as XlsxResult;
    } catch (err) {
      fail(`読み込み結果を読めません: ${String(err)}`);
    }

    // 「令和8年9月 認定こども園・保育所などの空き状況のご案内」
    const tm = toHalfWidth(book.title).match(/令和(\d+)年(\d+)月/);
    if (!tm) fail(`表題から対象月を読み取れません: ${book.title}`);
    const targetYear = reiwaToYear(Number(tm[1]));
    const targetMonth = Number(tm[2]);
    if (targetYear !== latest.year || targetMonth !== latest.month) {
      fail(
        `Excelの対象月（${targetYear}年${targetMonth}月）がファイル名（${latest.year}年${latest.month}月）と違います。`
      );
    }
    // 「（令和８年7月3１日時点）」
    const am = toHalfWidth(book.lead).match(/令和(\d+)年(\d+)月(\d+)日時点/);
    if (!am) fail(`本文から時点を読み取れません: ${book.lead.slice(0, 120)}`);
    const asOf = `${reiwaToYear(Number(am[1]))}-${am[2].padStart(2, "0")}-${am[3].padStart(2, "0")}`;
    console.log(`基準日: ${asOf} / 対象: ${targetYear}年${targetMonth}月1日入所`);

    // **年齢の見出しが5歳→0歳の逆順**。並びを見て年齢と列の対応を作る
    const ageOrder = book.ageHeads.map((h) => {
      const m = toHalfWidth(squeeze(h)).match(/^(\d)歳$/);
      if (!m) fail(`年齢の見出しを読めません: 「${h}」`);
      return Number(m[1]);
    });
    if (ageOrder.length !== AGE_COUNT || new Set(ageOrder).size !== AGE_COUNT) {
      fail(`年齢の見出しが6種類そろっていません: ${book.ageHeads.join(" / ")}`);
    }
    console.log(`  年齢の並び: ${ageOrder.join("・")}歳`);

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
    let headerRepeats = 0;
    let ward = "";

    for (const row of book.rows) {
      if (squeeze(row[0] ?? "")) ward = squeeze(row[0]);
      const kind = squeeze(row[1] ?? "");
      const name = (row[2] ?? "").replace(/[　\s]+/g, " ").trim();
      // ページの変わり目に見出し行が入る
      if (kind === "施設種別" || squeeze(name) === "施設名") {
        headerRepeats++;
        continue;
      }
      if (!name) continue;
      if (!ward) fail(`${name}: 所在区が分かりません`);
      if (!kind) fail(`${name}: 施設種別が分かりません`);
      if (!wards.includes(ward)) wards.push(ward);
      if (!categories.includes(kind)) categories.push(kind);

      const vacancy: (number | null)[] = new Array(AGE_COUNT).fill(null);
      for (const [i, age] of ageOrder.entries()) {
        vacancy[age] = parseValue(row[4 + i] ?? "", `堺市 ${name}`);
      }

      const id = `${ward}-${name}`;
      if (seenId.has(id)) fail(`施設名が重複しています: ${id}`);
      seenId.add(id);
      facilities.push({
        id,
        name,
        w: wards.indexOf(ward),
        c: categories.indexOf(kind),
        vacancy,
      });
    }

    if (wards.length !== WARD_COUNT) {
      fail(`区が${wards.length}個しかありません（堺市は${WARD_COUNT}区）: ${wards.join("、")}`);
    }
    if (facilities.length < 200) fail(`施設が${facilities.length}件しか取れていません`);

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

    const dataset = {
      municipalitySlug: MUNICIPALITY_SLUG,
      municipalityName: MUNICIPALITY_NAME,
      asOf,
      fetchedAt: todayJst(),
      sourceName: SOURCE_NAME,
      sourceUrl: INDEX_URL,
      sourceFiles: { vacancy: latest.url },
      metrics: ["vacancy"],
      subtitle: `${targetYear}年${targetMonth}月1日入所の新規利用可能予定数`,
      notes: [
        "堺市の注記のとおり、空き状況は利用決定者の辞退や保育士の配置などで変わります。空きがあっても入所を保証するものではありません。",
        "空き状況がゼロの施設にも申し込めます。辞退などで空きが生じ、利用調整が行われることがあります。",
        "認定こども園は保育認定部分の数です。",
        "施設種別は堺市の表記（幼保認・幼稚認・保育認・保育所・小規模・事業所・家庭的）をそのまま載せています。",
        "企業主導型保育事業所は別に公表されているため、ここには含まれません。",
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
    console.log(`書き出しました: ${path.relative(process.cwd(), OUT_PATH)}`);
    console.log(`  データ時点: ${asOf}`);
    console.log(`  ページの変わり目の見出し行（除外）: ${headerRepeats}件`);
    console.log("");
    for (const [i, wd] of wards.entries()) {
      console.log(`  ${wd}区 ${facilities.filter((f) => f.w === i).length}施設`);
    }
    console.log("");
    for (const [i, cat] of categories.entries()) {
      console.log(`  ${cat} ${facilities.filter((f) => f.c === i).length}施設`);
    }
    console.log("");
    console.log("  年齢 | 空き");
    ageTotals.forEach((v, age) => console.log(`  ${age}歳児 | ${v}`));
    console.log(`  合計 | ${ageTotals.reduce((a, b) => a + b, 0)}`);
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

main().catch((err) => fail(String(err)));
