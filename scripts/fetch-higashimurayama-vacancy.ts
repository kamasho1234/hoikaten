/**
 * 東村山市の保育施設の空き状況を取り込む
 *
 * 実行: npm run vacancy:fetch:higashimurayama
 *
 * ## この自治体の特徴
 * - **市のサイトが機械的なUAを弾く**（CloudFrontが403を返す）ため、ブラウザと同じ形の
 *   UAに当サイトの名前とURLを足して名乗る
 * - 表の左端に「施設型」「地域型」の区分が縦書きで入るが、文字が行に散らばるうえ
 *   セルの結合も不規則で、どの行がどちらかは表から読めない。
 *   **地域型保育事業は2歳児までなので、表の下から「3〜5歳児が空欄」の行が続くところ**を
 *   地域型とみなし、その件数を公式の地域型保育事業施設一覧と突き合わせて確かめる
 * - 施設名が「【認定こども園】」で始まる施設は認定こども園
 * - 空欄はそのクラスを設けていないことを表す（分園・幼稚園部分など）
 * - 末尾の「計」行と積み上げを突き合わせる
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "higashimurayama";
const MUNICIPALITY_NAME = "東村山市";
const SOURCE_NAME = "東村山市「保育施設 空き状況」";
const INDEX_URL =
  "https://www.city.higashimurayama.tokyo.jp/kosodate/kyouikuhoikushisetsu/hoikujyo/ketsuinjyoukyou/akizyokyo.html";
/** 地域型に分けた施設数を確かめるための一覧 */
const CHIIKIGATA_URL =
  "https://www.city.higashimurayama.tokyo.jp/kosodate/kyouikuhoikushisetsu/hoikujyo/shisetsuichiran/chiikigatahoikujigyo/tiikigata.html";
const AGE_COUNT = 6;

/** 市のサイトは機械的な名前のUAを弾くので、ブラウザと同じ形で名乗る */
const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36 hoikaten/1.0 (+https://hoikaten.com)";

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const EXTRACTOR = path.join(process.cwd(), "scripts", "higashimurayama-pdf-extract.py");

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

/** 市のページは Shift_JIS。meta の charset を見てデコードする */
async function fetchText(url: string): Promise<string> {
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) fail(`${url} が ${res.status} を返しました`);
  const buf = Buffer.from(await res.arrayBuffer());
  const ascii = buf.toString("latin1");
  const m = ascii.match(/charset=["']?([\w-]+)/i);
  const charset = (m?.[1] ?? "utf-8").toLowerCase();
  const label = charset === "shift_jis" || charset === "sjis" || charset === "x-sjis"
    ? "shift_jis"
    : charset;
  try {
    return new TextDecoder(label).decode(buf);
  } catch {
    fail(`${url}: 文字コード ${charset} を読めません`);
  }
}

type PdfRow = {
  /** 「施設型」か「地域型」 */
  kubun: string;
  /** 園名の1行目に入る類型（「認定こども園」など）。無ければ null */
  kind: string | null;
  name: string;
  values: (number | null)[];
  ageFrom: string;
  address: string;
};

type PdfResult = {
  target: number[];
  asOf: number[];
  rows: PdfRow[];
  /** 「欠員計」の行 */
  total: (number | null)[];
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

/** 公式の地域型保育事業施設一覧から施設の数を数える */
function countChiikigata(html: string): number {
  let count = 0;
  for (const table of html.match(/<table[\s\S]*?<\/table>/gi) ?? []) {
    const rows = table.match(/<tr[\s\S]*?<\/tr>/gi) ?? [];
    const names = rows
      .map((r) => {
        const cells = r.match(/<t[dh][^>]*>[\s\S]*?<\/t[dh]>/gi) ?? [];
        const first = cells[0];
        return first ? stripTags(first) : "";
      })
      .filter((n) => n !== "");
    // 見出しが「名称」の表だけが施設の一覧（ほかに事業類型の説明表がある）
    if (names[0] !== "名称") continue;
    count += names.length - 1;
  }
  if (count === 0) fail("地域型保育事業施設一覧から施設を数えられませんでした");
  return count;
}

async function main() {
  console.log(`${MUNICIPALITY_NAME}の空き状況を取り込みます`);
  console.log(`公式ページ: ${INDEX_URL}\n`);

  const html = await fetchText(INDEX_URL);

  // 「令和8年9月期一覧（PDF：375KB）」
  const links = [...html.matchAll(/<a[^>]+href="([^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => ({ url: new URL(m[1], INDEX_URL).toString(), text: toHalfWidth(stripTags(m[2])) }))
    .map((l) => {
      const m = l.text.match(/^令和(\d+)年(\d+)月期一覧/);
      if (!m) return null;
      const year = reiwaToYear(Number(m[1]));
      const month = Number(m[2]);
      return { ...l, year, month, sortKey: year * 100 + month };
    })
    .filter((v): v is NonNullable<typeof v> => v !== null);
  if (links.length === 0) fail("空き状況のPDFが見つかりません。ページの構成が変わった可能性があります。");
  const latest = links.reduce((a, b) => (b.sortKey > a.sortKey ? b : a));
  console.log(`最新: ${latest.text}\n  ${latest.url}`);

  const chiikigataCount = countChiikigata(await fetchText(CHIIKIGATA_URL));
  console.log(`公式の地域型保育事業施設一覧: ${chiikigataCount}施設`);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "higashimurayama-vacancy-"));
  try {
    const r = await fetch(latest.url, { headers: { "User-Agent": UA } });
    if (!r.ok) fail(`PDFの取得に失敗しました（${r.status}）: ${latest.url}`);
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.subarray(0, 4).toString() !== "%PDF") fail(`PDFではありません: ${latest.url}`);
    const file = path.join(tmpDir, "higashimurayama.pdf");
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
    const [ry, am, ad] = pdf.asOf;
    const asOf = `${reiwaToYear(ry)}-${String(am).padStart(2, "0")}-${String(ad).padStart(2, "0")}`;
    console.log(`基準日: ${asOf} / 対象: ${latest.year}年${latest.month}月`);

    // 区分は「施設型」「地域型」の2つ。増えていたら読み方を見直す
    const kubunSeen = [...new Set(pdf.rows.map((r) => r.kubun))];
    if (kubunSeen.join("/") !== "施設型/地域型") {
      fail(`区分の並びが想定と違います: 「${kubunSeen.join("/")}」`);
    }

    // 地域型として読めた施設の数を、公式の一覧と突き合わせる
    const chiikigata = pdf.rows.filter((r) => r.kubun === "地域型").length;
    if (chiikigata !== chiikigataCount) {
      fail(
        `地域型と読めた施設が${chiikigata}件で、公式の一覧の${chiikigataCount}件と違います。区分の読み方を見直してください。`,
      );
    }

    const categories = ["認可保育所", "認定こども園", "地域型保育事業"];
    const facilities: {
      id: string;
      name: string;
      w: null;
      c: number;
      vacancy: (number | null)[];
    }[] = [];
    const seenId = new Set<string>();
    const builtByAge = Array.from({ length: AGE_COUNT }, () => 0);

    for (const row of pdf.rows) {
      const c = row.kubun === "地域型" ? 2 : row.kind === "認定こども園" ? 1 : 0;
      const id = `${categories[c]}-${row.name}`;
      if (seenId.has(id)) fail(`施設名が重複しています: ${id}`);
      seenId.add(id);
      if (row.values.length !== AGE_COUNT) {
        fail(`${row.name}: 年齢の欄が${row.values.length}個です`);
      }
      row.values.forEach((v, age) => {
        builtByAge[age] += v ?? 0;
      });
      facilities.push({ id, name: row.name, w: null, c, vacancy: row.values });
    }

    const declared = pdf.total.map((v) => v ?? 0);
    if (declared.join("/") !== builtByAge.join("/")) {
      fail(`「欠員計」の行が ${declared.join("/")} なのに積み上げが ${builtByAge.join("/")} です`);
    }
    if (facilities.length < 45) fail(`施設が${facilities.length}件しか取れていません`);

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
      subtitle: `${latest.year}年${latest.month}月期の空き状況`,
      notes: [
        "東村山市の注記のとおり、空き状況は各施設の職員体制などにより変わることがあります。在園児の退園・転園で、0と書かれていても入園できる場合があります。",
        "「—」はそのクラスを設けていない園です。地域型保育事業は2歳児までです。",
        "認定こども園の幼稚園部分は保育を必要とする方向けの枠（2号・3号認定）の人数です。",
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
    console.log(`  「計」の行との突き合わせ: 一致（${builtByAge.join("/")}）`);
    console.log("");
    for (const [i, cat] of categories.entries()) {
      console.log(`  ${cat} ${facilities.filter((f) => f.c === i).length}施設`);
    }
    console.log("");
    console.log("  年齢 | 空き");
    builtByAge.forEach((v, age) => console.log(`  ${age}歳児 | ${v}`));
    console.log(`  合計 | ${builtByAge.reduce((a, b) => a + b, 0)}`);
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

main().catch((err) => fail(String(err)));
