/**
 * 仙台市の保育施設等の空枠情報を取り込む
 *
 * 実行: npm run vacancy:fetch:sendai
 *
 * ## この自治体の特徴
 * - **Excelで公開している**。区ごとにシートが分かれる（青葉区・宮城総合支所・宮城野区・
 *   若林区・太白区・泉区の6つ。宮城総合支所は青葉区のうち旧宮城町の区域）
 * - 数値は**利用調整が終わったあとの空枠**。翌月1日付入所ぶん
 * - 種別は保育所・認定こども園・小規模保育事業・家庭的保育事業等・事業所内保育事業・居宅。
 *   **セル内改行が入ることがある**ので詰めてから使う
 * - 種別の列は縦に結合されていて、変わるときだけ値が入る
 * - **空欄はそのクラスがない**（仙台市の注記「対象クラス年齢がない場合は空欄」）
 * - まれに「0(3)」のような書き方があるので、数の部分だけを採って注記に出す
 */

import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import os from "node:os";

const MUNICIPALITY_SLUG = "sendai";
const MUNICIPALITY_NAME = "仙台市";
const SOURCE_NAME = "仙台市「利用調整後の空枠情報」";
const INDEX_URL =
  "https://www.city.sendai.jp/nintechosa/kurashi/kenkotofukushi/kosodate/hoikujo/annai/hoikushisetsu.html";
const AGE_COUNT = 6;
const SHEET_COUNT = 6;

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const EXTRACTOR = path.join(process.cwd(), "scripts", "sendai-xlsx-extract.py");

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

/** 空欄はそのクラスがない。「0(3)」のような書き方は数の部分だけ採る */
function parseValue(raw: string): { value: number | null; original: string | null } {
  const t = toHalfWidth(squeeze(raw));
  if (t === "" || t === "-" || t === "－" || t === "―") return { value: null, original: null };
  if (/^\d+$/.test(t)) return { value: Number(t), original: null };
  const m = t.match(/^(\d+)[（(]\d+[)）]$/);
  if (m) return { value: Number(m[1]), original: raw.trim() };
  return { value: null, original: raw.trim() };
}

type Sheet = { name: string; title: string; asOf: string; rows: string[][] };
type XlsxResult = { sheets: Sheet[] };

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
  console.log(`${MUNICIPALITY_NAME}の空枠情報を取り込みます`);
  console.log(`公式ページ: ${INDEX_URL}\n`);

  const ua = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";
  const res = await fetch(INDEX_URL, { headers: { "User-Agent": ua } });
  if (!res.ok) fail(`公式ページが ${res.status} を返しました`);
  const html = await res.text();

  // 「令和8年9月1日付入所 利用調整後の空枠情報（令和8年8月17日時点）（エクセル：328KB）」
  const links = [...html.matchAll(/<a[^>]+href="([^"]+\.xlsx)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => ({ url: new URL(m[1], INDEX_URL).toString(), text: toHalfWidth(stripTags(m[2])) }))
    .map((l) => {
      const m = l.text.match(/令和(\d+)年(\d+)月(\d+)日付入所\s*利用調整後の空枠情報/);
      if (!m) return null;
      const year = reiwaToYear(Number(m[1]));
      const month = Number(m[2]);
      return { ...l, year, month, sortKey: year * 100 + month };
    })
    .filter((v): v is NonNullable<typeof v> => v !== null);
  if (links.length === 0) fail("空枠情報のExcelリンクが見つかりません。ページの構成が変わった可能性があります。");
  const latest = links.reduce((a, b) => (b.sortKey > a.sortKey ? b : a));
  console.log(`最新: ${latest.text}\n  ${latest.url}`);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "sendai-vacancy-"));
  try {
    const r = await fetch(latest.url, { headers: { "User-Agent": ua } });
    if (!r.ok) fail(`Excelの取得に失敗しました（${r.status}）: ${latest.url}`);
    const buf = Buffer.from(await r.arrayBuffer());
    const file = path.join(tmpDir, "sendai.xlsx");
    fs.writeFileSync(file, buf);

    let book: XlsxResult;
    try {
      book = JSON.parse(runPython([EXTRACTOR, file])) as XlsxResult;
    } catch (err) {
      fail(`読み込み結果を読めません: ${String(err)}`);
    }
    if (book.sheets.length !== SHEET_COUNT) {
      fail(`シートが${book.sheets.length}枚あります（${SHEET_COUNT}枚のはず）`);
    }

    const asOfSet = new Set(book.sheets.map((s) => s.asOf));
    if (asOfSet.size !== 1) fail(`シートごとに時点が違います: ${[...asOfSet].join(" / ")}`);
    const asOf = [...asOfSet][0];
    if (!/^\d{4}-\d{2}-\d{2}$/.test(asOf)) fail(`時点を読み取れません: ${asOf}`);
    console.log(`基準日: ${asOf} / 対象: ${latest.year}年${latest.month}月1日付入所`);

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
    const oddValues: string[] = [];
    const notesInSheet: string[] = [];

    for (const sheet of book.sheets) {
      // シート名は「（青葉区）」の形
      const ward = sheet.name.replace(/[（）()]/g, "").trim();
      if (!ward) fail(`シート名から区が分かりません: ${sheet.name}`);
      if (!wards.includes(ward)) wards.push(ward);
      const wi = wards.indexOf(ward);

      let category = "";
      for (const row of sheet.rows) {
        // 種別の列は縦に結合されていて、変わるときだけ値が入る
        const kind = squeeze(row[0] ?? "");
        if (kind) category = kind;
        const name = (row[1] ?? "").replace(/[　\s]+/g, " ").trim();
        if (!name) continue;
        // **施設名の列に「◇建替え・民営化や…」のような注記がまぎれる**。
        // 住所も年齢別の値も空なので、それを手がかりに施設と見分ける
        const hasAddress = (row[2] ?? "").trim() !== "";
        const hasAnyAge = row.slice(4, 4 + AGE_COUNT).some((c) => (c ?? "").trim() !== "");
        if (!hasAddress && !hasAnyAge) {
          notesInSheet.push(name);
          continue;
        }
        if (!category) fail(`${name}: 施設の種別が分かりません`);
        if (!categories.includes(category)) categories.push(category);

        const vacancy: (number | null)[] = [];
        for (let age = 0; age < AGE_COUNT; age++) {
          const p = parseValue(row[4 + age] ?? "");
          if (p.original) oddValues.push(`${ward} ${name}（${age}歳児「${p.original}」）`);
          vacancy.push(p.value);
        }

        const id = `${ward}-${name}`;
        if (seenId.has(id)) fail(`施設名が重複しています: ${id}`);
        seenId.add(id);
        facilities.push({ id, name, w: wi, c: categories.indexOf(category), vacancy });
      }
    }

    if (facilities.length < 300) fail(`施設が${facilities.length}件しか取れていません`);

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
      subtitle: `${latest.year}年${latest.month}月1日付入所の利用調整後の空枠`,
      notes: [
        "仙台市の注記のとおり、空枠は今後増えることも減ることもあります。空枠がない施設にも申し込むことはできます。",
        "対象のクラス年齢がない場合は「—」にしています。0歳児の受入可能月齢は施設ごとに違います。",
        "「宮城総合支所」は青葉区のうち旧宮城町の区域です。",
        ...(oddValues.length > 0
          ? [`次の欄は数字だけでない書き方をされています。当サイトでは数の部分だけを載せています: ${oddValues.join("、")}`]
          : []),
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
    console.log(`  数字だけでない書き方の欄: ${oddValues.length}件`);
    console.log(`  施設名の列に入っていた注記（施設ではないので除外）: ${notesInSheet.length}件`);
    console.log("");
    for (const [i, wd] of wards.entries()) {
      console.log(`  ${wd} ${facilities.filter((f) => f.w === i).length}施設`);
    }
    console.log("");
    for (const [i, cat] of categories.entries()) {
      console.log(`  ${cat} ${facilities.filter((f) => f.c === i).length}施設`);
    }
    console.log("");
    console.log("  年齢 | 空枠");
    ageTotals.forEach((v, age) => console.log(`  ${age}歳児 | ${v}`));
    console.log(`  合計 | ${ageTotals.reduce((a, b) => a + b, 0)}`);
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

main().catch((err) => fail(String(err)));
