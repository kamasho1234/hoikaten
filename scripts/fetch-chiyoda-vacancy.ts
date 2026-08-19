/**
 * 千代田区の認可保育所等の空き状況を取り込む
 *
 * 実行: npm run vacancy:fetch:chiyoda
 *
 * ## この自治体の特徴
 * - **罫線の引き方が施設類型ごとにばらばら**で表認識が当てにならない。
 *   PDFの本文テキストから「園名＋6つの値」の行として読む（詳しくは chiyoda-pdf-extract.py）
 * - 施設類型は本文の見出し（認可保育所／こども園／認定こども園／幼保一体施設／
 *   事業所内保育所（区民枠）／小規模保育事業／居宅訪問型保育事業）
 * - **居宅訪問型保育事業だけ0〜2歳が結合セル**で値が4つしかない。合算値として持つ
 * - **幼保一体施設は保育園と幼稚園が別行**（0〜2歳は保育園、3〜5歳は幼稚園）。
 *   公式がそう分けているのでそのまま2施設として持つ
 * - 合計行がないので、代わりに「施設らしいのに読めなかった行」が1件でもあれば中断する
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "chiyoda";
const MUNICIPALITY_NAME = "千代田区";
const SOURCE_NAME = "千代田区「保育所等の定員と空き状況および待機児童数の状況」";
const INDEX_URL = "https://www.city.chiyoda.lg.jp/koho/kosodate/hoiku/teiin-akijokyo.html";
const AGE_COUNT = 6;

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const EXTRACTOR = path.join(process.cwd(), "scripts", "chiyoda-pdf-extract.py");

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
  const t = toHalfWidth(v.replace(/[\s　]/g, ""));
  if (t === "" || t === "-" || t === "－" || t === "―") return null;
  if (/^\d+$/.test(t)) return Number(t);
  fail(`${where}: 人数として読めません: 「${v}」`);
}

type PdfResult = {
  asOf: number[][];
  target: number[][];
  rows: { section: string; name: string; values: string[] }[];
  skipped: string[];
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
  console.log(`${MUNICIPALITY_NAME}の空き状況を取り込みます`);
  console.log(`公式ページ: ${INDEX_URL}\n`);

  const ua = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";
  const res = await fetch(INDEX_URL, { headers: { "User-Agent": ua } });
  if (!res.ok) fail(`公式ページが ${res.status} を返しました`);
  const html = await res.text();

  // 「令和8年10月入園申込者用空き状況（PDF：188KB）」。年月が大きいものが最新
  const links = [...html.matchAll(/<a[^>]+href="([^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => ({ url: new URL(m[1], INDEX_URL).toString(), text: toHalfWidth(stripTags(m[2])) }))
    .map((l) => {
      const m = l.text.match(/令和(\d+)年(\d+)月入園申込者用空き状況/);
      if (!m) return null;
      const year = reiwaToYear(Number(m[1]));
      const month = Number(m[2]);
      return { ...l, year, month, sortKey: year * 100 + month };
    })
    .filter((v): v is NonNullable<typeof v> => v !== null);
  if (links.length === 0) fail("空き状況のPDFリンクが見つかりません。ページの構成が変わった可能性があります。");
  const latest = links.reduce((a, b) => (b.sortKey > a.sortKey ? b : a));
  console.log(`最新: ${latest.text}\n  ${latest.url}`);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "chiyoda-vacancy-"));
  try {
    const pdfRes = await fetch(latest.url, { headers: { "User-Agent": ua } });
    if (!pdfRes.ok) fail(`PDFの取得に失敗しました（${pdfRes.status}）: ${latest.url}`);
    const buf = Buffer.from(await pdfRes.arrayBuffer());
    if (buf.subarray(0, 4).toString() !== "%PDF") fail(`PDFではありません: ${latest.url}`);
    const file = path.join(tmpDir, "chiyoda.pdf");
    fs.writeFileSync(file, buf);

    let pdf: PdfResult;
    try {
      pdf = JSON.parse(runPython([EXTRACTOR, file])) as PdfResult;
    } catch (err) {
      fail(`抽出結果を読めません: ${String(err)}`);
    }

    if (pdf.skipped.length > 0) {
      fail(
        `施設の行として読めなかった行があります（取りこぼしの疑い）:\n  ${pdf.skipped.join("\n  ")}`
      );
    }
    if (pdf.asOf.length !== 1) fail(`PDFに基準日が${pdf.asOf.length}種類あります`);
    const [ay, am, ad] = pdf.asOf[0];
    const asOf = `${reiwaToYear(ay)}-${String(am).padStart(2, "0")}-${String(ad).padStart(2, "0")}`;
    if (pdf.target.length !== 1) fail(`PDFに対象月が${pdf.target.length}種類あります`);
    const [ty, tm] = pdf.target[0];
    // PDFの「令和8年9月入園選考終了時」＝リンクの「令和8年10月入園申込者用」の1つ前の月
    const expected = new Date(Date.UTC(latest.year, latest.month - 2, 1));
    if (reiwaToYear(ty) !== expected.getUTCFullYear() || tm !== expected.getUTCMonth() + 1) {
      fail(
        `PDFの「${reiwaToYear(ty)}年${tm}月入園選考終了時」がリンクの「${latest.year}年${latest.month}月入園申込者用」と合いません。`
      );
    }
    console.log(`基準日: ${asOf} / ${latest.year}年${latest.month}月入園の申込者向け`);

    const categories: string[] = [];
    const facilities: {
      id: string;
      name: string;
      w: null;
      c: number;
      vacancy: (number | null)[];
      vacancyTotal?: number;
    }[] = [];
    const seen = new Set<string>();

    for (const row of pdf.rows) {
      const name = row.name.trim();
      if (!name) continue;
      if (seen.has(name)) fail(`施設名が重複しています: ${name}`);
      seen.add(name);
      if (!categories.includes(row.section)) categories.push(row.section);
      const c = categories.indexOf(row.section);

      if (row.values.length === AGE_COUNT) {
        facilities.push({
          id: name,
          name,
          w: null,
          c,
          vacancy: row.values.map((v) => parseValue(v, `千代田区 ${name}`)),
        });
      } else if (row.values.length === 4) {
        // 居宅訪問型保育事業。0〜2歳が結合セルで1つの数字になっている
        if (row.section !== "居宅訪問型保育事業") {
          fail(`${name}: 値が4つですが居宅訪問型保育事業ではありません（${row.section}）`);
        }
        const rest = row.values.slice(1).map((v) => parseValue(v, `千代田区 ${name}`));
        if (rest.some((v) => v !== null)) fail(`${name}: 3歳以上に数値が入っています`);
        facilities.push({
          id: name,
          name,
          w: null,
          c,
          vacancy: new Array(AGE_COUNT).fill(null),
          vacancyTotal: parseValue(row.values[0], `千代田区 ${name}`) ?? 0,
        });
      } else {
        fail(`${name}: 値が${row.values.length}個あります（${row.values.join(" ")}）`);
      }
    }

    if (facilities.length < 30) fail(`施設が${facilities.length}件しか取れていません`);

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
      notes: [
        `${reiwaToYear(ty)}年${tm}月入園の選考が終わった時点の空き状況です（${latest.year}年${latest.month}月入園の申込者向け）。今後の退園や内定辞退で変わることがあります。`,
        "千代田区の注記のとおり、保育士の配置などにより定員まで受け入れができないことがあります。",
        "いずみこども園・ふじみこども園の0〜2歳児クラスには、一般の入所枠のほかに社会的養護が必要な場合の「保育を要する枠」があります。",
        "幼保一体施設は0〜2歳が保育園、3〜5歳が幼稚園（長時間）と、公式が別の行で公表しているためそのまま分けています。",
        "居宅訪問型保育事業は0〜2歳の合算で公表されています。",
      ],
      wards: [],
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
    console.log(`  読めなかった施設らしい行: 0件`);
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
    console.log("  年齢 | 空き");
    ageTotals.forEach((v, age) => console.log(`  ${age}歳児 | ${v}`));
    console.log(`  0〜2歳合算のみ | ${merged}`);
    console.log(`  合計 | ${ageTotals.reduce((a, b) => a + b, 0) + merged}`);
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

main().catch((err) => fail(String(err)));
