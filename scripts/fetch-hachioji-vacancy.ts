/**
 * 八王子市の保育施設の募集人数を取り込む
 *
 * 実行: npm run vacancy:fetch:hachioji
 *
 * ## この自治体の特徴
 * - 数値は翌月入園（転園）の募集人数。文京区や墨田区と同じ性質
 * - **地区（本庁・元八王子・南大沢など14地区）で分かれる**。縦に結合された列を引き継ぐ
 * - 施設種別は記号（記載なし＝認可保育園、認＝認定こども園、家＝家庭的保育事業、
 *   小＝小規模保育事業、事＝事業所内保育事業）。PDFの凡例のとおりに直す
 * - **「※」は募集人数を調整中**という意味で、人数が公表されていない。「—」にして注記に出す
 * - 表の斜線（抽出では空欄）はその年齢の受入をしていない
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "hachioji";
const MUNICIPALITY_NAME = "八王子市";
const SOURCE_NAME = "八王子市「募集人数」";
const INDEX_URL =
  "https://kosodate.city.hachioji.tokyo.jp/soshiki/hoikuyochienka/hoikuyochienka_nyushotanto/417.html";
const AGE_COUNT = 6;

/** PDFの凡例。記載なしは認可保育園 */
const KIND_LABELS: Record<string, string> = {
  "": "認可保育園",
  認: "認定こども園",
  家: "家庭的保育事業",
  小: "小規模保育事業",
  事: "事業所内保育事業",
};

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const EXTRACTOR = path.join(process.cwd(), "scripts", "hachioji-pdf-extract.py");

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

type PdfTable = { head: string[]; rows: string[][] };
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

async function main() {
  console.log(`${MUNICIPALITY_NAME}の募集人数を取り込みます`);
  console.log(`公式ページ: ${INDEX_URL}\n`);

  const ua = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";
  const res = await fetch(INDEX_URL, { headers: { "User-Agent": ua } });
  if (!res.ok) fail(`公式ページが ${res.status} を返しました`);
  const html = await res.text();

  // 「令和8年（2026年）9月入園（転園）の募集人数(PDFファイル:596.3KB)」
  const links = [...html.matchAll(/<a[^>]+href="([^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => ({ url: new URL(m[1], INDEX_URL).toString(), text: toHalfWidth(stripTags(m[2])) }))
    .map((l) => {
      const m = l.text.match(/令和(\d+)年（(\d+)年）(\d+)月入園（転園）の募集人数/);
      if (!m) return null;
      const year = reiwaToYear(Number(m[1]));
      if (year !== Number(m[2])) fail(`和暦と西暦が合いません: ${l.text}`);
      const month = Number(m[3]);
      return { ...l, year, month, sortKey: year * 100 + month };
    })
    .filter((v): v is NonNullable<typeof v> => v !== null);
  if (links.length === 0) fail("募集人数のPDFリンクが見つかりません。ページの構成が変わった可能性があります。");
  const latest = links.reduce((a, b) => (b.sortKey > a.sortKey ? b : a));
  console.log(`最新: ${latest.text}\n  ${latest.url}`);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "hachioji-vacancy-"));
  try {
    const r = await fetch(latest.url, { headers: { "User-Agent": ua } });
    if (!r.ok) fail(`PDFの取得に失敗しました（${r.status}）: ${latest.url}`);
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.subarray(0, 4).toString() !== "%PDF") fail(`PDFではありません: ${latest.url}`);
    const file = path.join(tmpDir, "hachioji.pdf");
    fs.writeFileSync(file, buf);

    let pdf: PdfResult;
    try {
      pdf = JSON.parse(runPython([EXTRACTOR, file])) as PdfResult;
    } catch (err) {
      fail(`抽出結果を読めません: ${String(err)}`);
    }

    if (pdf.asOf.length !== 1) fail(`PDFに基準日が${pdf.asOf.length}種類あります`);
    const [ay, am, ad] = pdf.asOf[0];
    const asOf = `${reiwaToYear(ay)}-${String(am).padStart(2, "0")}-${String(ad).padStart(2, "0")}`;
    if (pdf.target.length !== 1) fail(`PDFに対象月が${pdf.target.length}種類あります`);
    const [ty, tm] = pdf.target[0];
    if (reiwaToYear(ty) !== latest.year || tm !== latest.month) {
      fail(`PDFの対象月（${reiwaToYear(ty)}年${tm}月）がリンクの文言（${latest.year}年${latest.month}月）と違います。`);
    }
    console.log(`基準日: ${asOf} / 対象: ${latest.year}年${latest.month}月入園（転園）`);

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
    const adjusting: string[] = [];
    let area = "";

    for (const table of pdf.tables) {
      const head = table.head.map((h) => squeeze(h));
      const idx = {
        area: head.indexOf("地区"),
        kind: head.indexOf("施設種別"),
        name: head.indexOf("施設名"),
      };
      if (idx.area < 0 || idx.kind < 0 || idx.name < 0) {
        fail(`見出しが想定と違います: ${table.head.join(" / ")}`);
      }
      const ageIdx = Array.from({ length: AGE_COUNT }, (_, i) => head.indexOf(`${i}才`));
      if (ageIdx.some((i) => i < 0)) fail(`年齢の見出しが足りません: ${table.head.join(" / ")}`);

      for (const row of table.rows) {
        // 地区の列は縦に結合されていて、変わるときだけ値が入る
        if (squeeze(row[idx.area] ?? "")) area = squeeze(row[idx.area]);
        const name = (row[idx.name] ?? "").replace(/[　\s]+/g, " ").trim();
        if (!name) continue;
        if (!area) fail(`${name}: 地区が分かりません`);

        const kindMark = squeeze(row[idx.kind] ?? "");
        const category = KIND_LABELS[kindMark];
        if (!category) fail(`${name}: 施設種別の記号が分かりません: 「${kindMark}」`);
        if (!wards.includes(area)) wards.push(area);
        if (!categories.includes(category)) categories.push(category);

        const vacancy: (number | null)[] = [];
        for (const [age, col] of ageIdx.entries()) {
          const raw = squeeze(row[col] ?? "");
          if (raw === "") {
            vacancy.push(null);
            continue;
          }
          const t = toHalfWidth(raw);
          if (/^\d+$/.test(t)) {
            vacancy.push(Number(t));
            continue;
          }
          if (t === "※") {
            // 募集人数を調整中。人数は公表されていない
            adjusting.push(`${name}（${age}歳児）`);
            vacancy.push(null);
            continue;
          }
          fail(`${name}: ${age}歳児を人数として読めません: 「${raw}」`);
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
    }

    if (facilities.length < 100) fail(`施設が${facilities.length}件しか取れていません`);

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
      subtitle: `${latest.year}年${latest.month}月入園（転園）の募集人数`,
      notes: [
        "八王子市の注記のとおり、緊急措置・退園・保育園の事情などにより受入人数が変わることがあります。",
        "募集人数が0でも、転園や退園で空きが生じた場合は利用調整が行われるため申し込めます。",
        "年齢はクラス年齢（その年度の4月1日時点の満年齢）です。",
        ...(adjusting.length > 0
          ? [
              `次のクラスは市と施設が募集人数を調整中で、人数が公表されていません（申し込みはできます）: ${adjusting.join("、")}`,
            ]
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
    console.log(`  募集人数を調整中のクラス: ${adjusting.length}件`);
    console.log("");
    for (const [i, wd] of wards.entries()) {
      console.log(`  ${wd} ${facilities.filter((f) => f.w === i).length}施設`);
    }
    console.log("");
    for (const [i, cat] of categories.entries()) {
      console.log(`  ${cat} ${facilities.filter((f) => f.c === i).length}施設`);
    }
    console.log("");
    console.log("  年齢 | 募集");
    ageTotals.forEach((v, age) => console.log(`  ${age}歳児 | ${v}`));
    console.log(`  合計 | ${ageTotals.reduce((a, b) => a + b, 0)}`);
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

main().catch((err) => fail(String(err)));
