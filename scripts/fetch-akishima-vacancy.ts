/**
 * 昭島市の保育所等の募集状況を取り込む
 *
 * 実行: npm run vacancy:fetch:akishima
 *
 * ## この自治体の特徴
 * - 「施設名／延長保育／市民対象／0才〜5才」の表が3つ（認可保育園・幼保連携型認定こども園・
 *   地域型保育施設）。年齢の欄の数字が募集人数で、**空欄は募集なし**
 * - 合計行も行ごとの計もないので、代わりに市の「保育施設一覧」ページ（Shift_JIS）から
 *   施設名を読み、**種類ごとの施設数と施設名がそろっているか**を突き合わせる
 * - 延長保育と市民対象の欄は○か空欄。年齢の欄は数字か空欄。
 *   列を取り違えていないかをこの形で確かめる
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "akishima";
const MUNICIPALITY_NAME = "昭島市";
const SOURCE_NAME = "昭島市「保育所空き状況」";
const INDEX_URL =
  "https://www.city.akishima.lg.jp/kosodate/m-kosodate/1008313/1003785/1003802/1003786.html";
/** 施設数と施設名を突き合わせるための一覧 */
const FACILITY_LIST_URL =
  "https://www.city.akishima.lg.jp/kosodate/m-kosodate/1008313/1003785/1003802/1009200/1009087.html";
const AGE_COUNT = 6;

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const EXTRACTOR = path.join(process.cwd(), "scripts", "akishima-pdf-extract.py");

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

const UA = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";

/** 市の一覧ページは Shift_JIS。meta の charset を見てデコードする */
async function fetchText(url: string): Promise<string> {
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) fail(`${url} が ${res.status} を返しました`);
  const buf = Buffer.from(await res.arrayBuffer());
  const ascii = buf.toString("latin1");
  const m = ascii.match(/charset=["']?([\w-]+)/i);
  const charset = (m?.[1] ?? "utf-8").toLowerCase();
  const label =
    charset === "shift_jis" || charset === "sjis" || charset === "x-sjis" ? "shift_jis" : charset;
  try {
    return new TextDecoder(label).decode(buf);
  } catch {
    fail(`${url}: 文字コード ${charset} を読めません`);
  }
}

type PdfTable = { section: string; head: string[]; rows: string[][] };
type PdfResult = { asOf: number[]; tables: PdfTable[] };

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

/**
 * 一覧ページの表から施設名を読む。
 * 認定こども園の表は1施設が「教育」「保育」の2行に分かれるので、名前を重複なしで数える
 */
function readFacilityNames(html: string): string[][] {
  const groups: string[][] = [];
  for (const table of html.match(/<table[\s\S]*?<\/table>/gi) ?? []) {
    const names: string[] = [];
    for (const row of table.match(/<tr[\s\S]*?<\/tr>/gi) ?? []) {
      const cells = row.match(/<t[dh][^>]*>[\s\S]*?<\/t[dh]>/gi) ?? [];
      const first = cells[0];
      if (!first) continue;
      const name = squeeze(stripTags(first));
      if (!name || name === "施設名") continue;
      if (!names.includes(name)) names.push(name);
    }
    if (names.length > 0) groups.push(names);
  }
  if (groups.length === 0) fail("保育施設一覧から施設名を読み取れませんでした");
  return groups;
}

/** 一覧の名前は「多摩保育園分園（連携先：多摩保育園）」のように補足が付く */
function baseName(name: string): string {
  return squeeze(name).replace(/[（(].*$/, "");
}

async function main() {
  console.log(`${MUNICIPALITY_NAME}の募集状況を取り込みます`);
  console.log(`公式ページ: ${INDEX_URL}\n`);

  const html = await fetchText(INDEX_URL);

  // 「保育所等空き状況一覧表（令和8年9月入所募集） （PDF 109.2 KB）」
  const links = [...html.matchAll(/<a[^>]+href="([^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => ({ url: new URL(m[1], INDEX_URL).toString(), text: toHalfWidth(stripTags(m[2])) }))
    .map((l) => {
      const m = l.text.match(/^保育所等空き状況一覧表（令和(\d+)年(\d+)月入所募集）/);
      if (!m) return null;
      const year = reiwaToYear(Number(m[1]));
      const month = Number(m[2]);
      return { ...l, year, month, sortKey: year * 100 + month };
    })
    .filter((v): v is NonNullable<typeof v> => v !== null);
  if (links.length === 0) fail("空き状況のPDFが見つかりません。ページの構成が変わった可能性があります。");
  const latest = links.reduce((a, b) => (b.sortKey > a.sortKey ? b : a));
  console.log(`最新: ${latest.text}\n  ${latest.url}`);

  const listGroups = readFacilityNames(await fetchText(FACILITY_LIST_URL));
  console.log(`公式の保育施設一覧: ${listGroups.map((g) => `${g.length}施設`).join(" / ")}`);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "akishima-vacancy-"));
  try {
    const r = await fetch(latest.url, { headers: { "User-Agent": UA } });
    if (!r.ok) fail(`PDFの取得に失敗しました（${r.status}）: ${latest.url}`);
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.subarray(0, 4).toString() !== "%PDF") fail(`PDFではありません: ${latest.url}`);
    const file = path.join(tmpDir, "akishima.pdf");
    fs.writeFileSync(file, buf);

    let pdf: PdfResult;
    try {
      pdf = JSON.parse(runPython([EXTRACTOR, file])) as PdfResult;
    } catch (err) {
      fail(`抽出結果を読めません: ${String(err)}`);
    }

    const [ry, am, ad] = pdf.asOf;
    const asOf = `${reiwaToYear(ry)}-${String(am).padStart(2, "0")}-${String(ad).padStart(2, "0")}`;
    console.log(`基準日: ${asOf} / 対象: ${latest.year}年${latest.month}月入所募集`);

    const categories: string[] = [];
    const facilities: {
      id: string;
      name: string;
      w: null;
      c: number;
      vacancy: number[];
    }[] = [];
    const seenId = new Set<string>();
    const builtByAge = Array.from({ length: AGE_COUNT }, () => 0);
    const namesByTable: string[][] = [];

    for (const table of pdf.tables) {
      const head = table.head.map((h) => toHalfWidth(squeeze(h)));
      const ageIdx = Array.from({ length: AGE_COUNT }, (_, i) => head.indexOf(`${i}才`));
      if (ageIdx.some((i) => i < 0)) fail(`年齢の見出しが見つかりません: ${table.head.join(" / ")}`);
      const markIdx = [head.indexOf("延長保育"), head.indexOf("市民対象")].filter((i) => i >= 0);
      if (markIdx.length !== 2) fail(`「延長保育」「市民対象」の列が見つかりません: ${table.head.join(" / ")}`);
      const category = table.section;
      if (!categories.includes(category)) categories.push(category);
      const names: string[] = [];

      for (const row of table.rows) {
        const name = squeeze(row[0] ?? "");
        // 施設名のない空行がまじる
        if (!name) continue;

        // 列を取り違えていないか、欄の形で確かめる
        for (const c of markIdx) {
          const t = squeeze(row[c] ?? "");
          if (t !== "" && t !== "○" && t !== "◯") {
            fail(`${name}: 延長保育・市民対象の欄が「${row[c]}」になっています`);
          }
        }
        const vacancy = ageIdx.map((c) => {
          const t = toHalfWidth(squeeze(row[c] ?? ""));
          // 空欄は募集なし
          if (t === "") return 0;
          if (!/^\d+$/.test(t)) fail(`${name}: 募集人数として読めません: 「${row[c]}」`);
          return Number(t);
        });
        vacancy.forEach((v, age) => {
          builtByAge[age] += v;
        });

        const id = `${category}-${name}`;
        if (seenId.has(id)) fail(`施設名が重複しています: ${id}`);
        seenId.add(id);
        names.push(name);
        facilities.push({ id, name, w: null, c: categories.indexOf(category), vacancy });
      }
      namesByTable.push(names);
    }

    // 市の保育施設一覧と、種類ごとの施設数・施設名を突き合わせる
    if (namesByTable.length !== listGroups.length) {
      fail(`表の数が一覧ページと違います（募集状況 ${namesByTable.length} / 一覧 ${listGroups.length}）`);
    }
    for (const [i, names] of namesByTable.entries()) {
      const listed = listGroups[i].map(baseName);
      if (names.length !== listed.length) {
        fail(
          `${categories[i]}の施設数が一覧ページと違います（募集状況 ${names.length}件 / 一覧 ${listed.length}件）`
        );
      }
      // 一覧の名前は「幼保連携型認定こども園ミナパもくせいのもり」のように種類が頭に付く
      const missing = names.filter((n) => !listed.some((l) => l.includes(n) || n.includes(l)));
      if (missing.length > 0) {
        fail(`${categories[i]}で一覧ページに見つからない施設があります: ${missing.join("、")}`);
      }
    }

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
      subtitle: `${latest.year}年${latest.month}月入所の募集人数`,
      notes: [
        "昭島市が公表している募集人数です。数字のない欄は募集がないことを表します。",
        "地域型保育施設は2歳児までの施設です。",
        "認定こども園は保育を必要とする方向けの枠の人数です。",
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
    console.log("  種類ごとの施設数と施設名が公式の保育施設一覧と一致しました");
    console.log("");
    for (const [i, cat] of categories.entries()) {
      console.log(`  ${cat} ${facilities.filter((f) => f.c === i).length}施設`);
    }
    console.log("");
    console.log("  年齢 | 募集");
    builtByAge.forEach((v, age) => console.log(`  ${age}歳児 | ${v}`));
    console.log(`  合計 | ${builtByAge.reduce((a, b) => a + b, 0)}`);
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

main().catch((err) => fail(String(err)));
