/**
 * 江南市の保育所等空き状況を取り込む
 *
 * 実行: npm run vacancy:fetch:konan
 *
 * ## この自治体の特徴
 * - 空き状況は公式ページのHTMLの表。**年齢の並びが5歳児→0歳児の逆順**
 * - 数字は入所可能人数（「※上記の数字は入所可能人数です。」と本文にある）
 * - 表には「ー」と空らんが混ざるが、どちらの意味も本文に書かれていない。
 *   そこで**入園案内PDFの施設一覧表にある「入所年齢」と突き合わせて**、
 *   「ー」がその園の受け入れていない年齢だけに付いていることを確かめている。
 *   空らんは空きなし（0人）。全ての年齢が空らんの園があるので、
 *   空らんが「クラスなし」でないことも確かめられる
 * - 施設の区分（市立・私立・認定こども園・小規模）も入園案内PDFから取る
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "konan";
const MUNICIPALITY_NAME = "江南市";
const SOURCE_NAME = "江南市「保育所等空き状況」";
const SOURCE_URL = "https://www.city.konan.lg.jp/kurashi/1009685/1011199/1003360/1003398.html";
/** 施設ごとの入所年齢と区分が載っている入園案内のページ */
const GUIDE_URL = "https://www.city.konan.lg.jp/kurashi/1009685/1011199/1003360/1003397.html";
const AGE_COUNT = 6;
const MIN_FACILITIES = 15;
const UA = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const EXTRACTOR = path.join(process.cwd(), "scripts", "konan-pdf-extract.py");

const NOT_OFFERED_MARK = "ー";

function fail(message: string): never {
  console.error(`\n[中断] ${message}`);
  process.exit(1);
}

function todayJst(): string {
  const jst = new Date(Date.now() + 9 * 60 * 60 * 1000);
  return jst.toISOString().slice(0, 10);
}

function unescapeHtml(s: string): string {
  return s
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&times;/g, "×")
    .replace(/&#(\d+);/g, (_, d) => String.fromCharCode(Number(d)))
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCharCode(parseInt(h, 16)))
    .replace(/&amp;/g, "&");
}

function squeeze(s: string): string {
  return unescapeHtml(s ?? "").replace(/[\s　]/g, "");
}

function toHalfWidth(s: string): string {
  return s.replace(/[０-９]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xfee0));
}

/** 長音・ダッシュのゆれをそろえる */
function shapeOf(mark: string): string {
  if (/^[ー－―—‐-]$/.test(mark)) return NOT_OFFERED_MARK;
  return mark;
}

/** 「7か月目～」「1歳児～」「7か月目～2歳児」「57日目～」から、受け入れる年齢クラスを出す */
function agesOf(accept: string): number[] | null {
  const text = toHalfWidth(squeeze(accept));
  const [fromText, toText] = text.split(/[～〜~]/);
  let start: number;
  if (/^\d+(か月目|日目|ヶ月目|カ月目)/.test(fromText)) {
    // 月齢・日齢で書かれているものはどれも0歳児クラスから
    start = 0;
  } else {
    const m = /^(\d+)歳児/.exec(fromText);
    if (!m) return null;
    start = Number(m[1]);
  }
  let end = AGE_COUNT - 1;
  if (toText) {
    const m = /^(\d+)歳児/.exec(toText);
    if (!m) return null;
    end = Number(m[1]);
  }
  if (!Number.isInteger(start) || start > end || end >= AGE_COUNT) return null;
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

function parseTables(html: string): string[][][] {
  return [...html.matchAll(/<table[\s\S]*?<\/table>/gi)].map((t) =>
    [...t[0].matchAll(/<tr[\s\S]*?<\/tr>/gi)].map((r) =>
      [...r[0].matchAll(/<t[dh][\s\S]*?<\/t[dh]>/gi)].map((c) => squeeze(c[0])),
    ),
  );
}

type PdfResult = {
  groups: { kind: string; rows: { name: string; accept: string }[] }[];
};

function runPython(args: string[]): string {
  const candidates = process.env.PYTHON ? [process.env.PYTHON] : ["python3", "python"];
  let lastError = "";
  for (const bin of candidates) {
    try {
      return execFileSync(bin, args, { encoding: "utf-8", maxBuffer: 128 * 1024 * 1024 });
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

/** 入園案内PDFから、施設ごとの入所年齢と区分を取る */
async function fetchGuide(tmpDir: string) {
  const res = await fetch(GUIDE_URL, { headers: { "User-Agent": UA }, redirect: "follow" });
  if (!res.ok) fail(`入園案内のページが ${res.status} を返しました`);
  const html = await res.text();
  const links = [...html.matchAll(/<a[^>]+href="([^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/gi)].map((m) => ({
    url: new URL(m[1], res.url || GUIDE_URL).toString(),
    text: squeeze(m[2]),
  }));
  const link = links.find((l) => l.text.includes("途中入園のご案内"));
  if (!link) fail("入園案内（途中入園のご案内）のPDFが見つかりません");
  console.log(`入園案内PDF: ${link.text}\n  ${link.url}`);

  const r = await fetch(link.url, { headers: { "User-Agent": UA } });
  if (!r.ok) fail(`入園案内PDFの取得に失敗しました（${r.status}）: ${link.url}`);
  const buf = Buffer.from(await r.arrayBuffer());
  if (buf.subarray(0, 4).toString() !== "%PDF") fail(`PDFではありません: ${link.url}`);
  const file = path.join(tmpDir, "konan-guide.pdf");
  fs.writeFileSync(file, buf);

  let pdf: PdfResult;
  try {
    pdf = JSON.parse(runPython([EXTRACTOR, file])) as PdfResult;
  } catch (err) {
    fail(`入園案内PDFの抽出結果を読めません: ${String(err)}`);
  }

  const guide = new Map<string, { kind: string; ages: number[] }>();
  const kinds: string[] = [];
  for (const group of pdf.groups) {
    const kind = squeeze(group.kind);
    if (!kind) fail("入園案内PDFの区分が空です");
    if (!kinds.includes(kind)) kinds.push(kind);
    for (const row of group.rows) {
      const name = squeeze(row.name);
      const ages = agesOf(row.accept);
      if (ages === null) fail(`${name}: 入所年齢を読み取れません（「${row.accept}」）`);
      if (guide.has(name)) fail(`入園案内PDFに同じ施設名が2回出てきます: ${name}`);
      guide.set(name, { kind, ages });
    }
  }
  if (guide.size < MIN_FACILITIES) fail(`入園案内PDFの施設が${guide.size}件しかありません`);
  return { guide, kinds, url: link.url };
}

async function main() {
  console.log(`${MUNICIPALITY_NAME}の空き状況を取り込みます`);
  console.log(`公式ページ: ${SOURCE_URL}\n`);

  const res = await fetch(SOURCE_URL, { headers: { "User-Agent": UA }, redirect: "follow" });
  if (!res.ok) fail(`公式ページが ${res.status} を返しました`);
  const html = await res.text();
  const flat = toHalfWidth(squeeze(html));

  const asOfMatch = /更新日令和(\d+)年(\d+)月(\d+)日/.exec(flat);
  if (!asOfMatch) fail("「更新日 令和N年M月D日」を読み取れませんでした");
  const asOf = `${Number(asOfMatch[1]) + 2018}-${asOfMatch[2].padStart(2, "0")}-${asOfMatch[3].padStart(2, "0")}`;
  if (asOf > todayJst()) fail(`更新日（${asOf}）が今日より先になっています`);

  const targetMatch = /保育所等空き状況令和(\d+)年(\d+)月入所/.exec(flat);
  if (!targetMatch) fail("「保育所等空き状況 令和N年M月入所」を読み取れませんでした");
  const targetLabel = `${Number(targetMatch[1]) + 2018}年${Number(targetMatch[2])}月`;

  // 数の読み方が変わっていないかを確かめる
  if (!/上記の数字は入所可能人数です/.test(flat)) {
    fail("「※上記の数字は入所可能人数です。」が本文にありません");
  }

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "konan-vacancy-"));
  try {
    const { guide, kinds, url: guideUrl } = await fetchGuide(tmpDir);

    // 空き状況の表。見出しが「5歳児…0歳児」の逆順になっている
    const tables = parseTables(html).filter(
      (t) => t[0]?.length === AGE_COUNT + 1 && t[0][1] === `${AGE_COUNT - 1}歳児`,
    );
    if (tables.length === 0) fail("空き状況の表が見つかりません");
    for (const table of tables) {
      for (let i = 0; i < AGE_COUNT; i++) {
        if (table[0][1 + i] !== `${AGE_COUNT - 1 - i}歳児`) {
          fail(`年齢の見出しが想定と違います: ${table[0].join(",")}`);
        }
      }
    }

    const categories: string[] = [];
    const facilities: {
      id: string;
      name: string;
      w: null;
      c: number;
      vacancy: (number | null)[];
    }[] = [];
    const seen = new Set<string>();
    let openSum = 0;
    let zeroCells = 0;
    let notOffered = 0;

    for (const table of tables) {
      for (const values of table.slice(1)) {
        const name = values[0];
        if (!name) continue;
        if (values.length !== AGE_COUNT + 1) {
          fail(`${name}: 欄が${values.length - 1}個です（${AGE_COUNT}個のはず）`);
        }
        if (seen.has(name)) fail(`施設名が重複しています: ${name}`);
        seen.add(name);

        const info = guide.get(name);
        if (!info) fail(`${name}: 入園案内PDFの施設一覧に見つかりません`);
        let c = categories.indexOf(info.kind);
        if (c < 0) {
          categories.push(info.kind);
          c = categories.length - 1;
        }

        const vacancy: (number | null)[] = new Array(AGE_COUNT).fill(null);
        for (let i = 0; i < AGE_COUNT; i++) {
          // 表は5歳児から並んでいる
          const age = AGE_COUNT - 1 - i;
          const raw = shapeOf(toHalfWidth(values[1 + i]));
          if (raw === NOT_OFFERED_MARK) {
            // 「ー」はその園が受け入れていない年齢のはず
            if (info.ages.includes(age)) {
              fail(`${name}: ${age}歳児が「${NOT_OFFERED_MARK}」ですが、入所年齢には入っています`);
            }
            notOffered += 1;
            continue;
          }
          if (!info.ages.includes(age)) {
            fail(`${name}: 入所年齢の外の${age}歳児に「${raw || "空らん"}」が入っています`);
          }
          if (raw === "") {
            // 空らんは空きなし
            zeroCells += 1;
            vacancy[age] = 0;
            continue;
          }
          if (!/^\d+$/.test(raw)) fail(`${name}: ${age}歳児が数ではありません（「${raw}」）`);
          const n = Number(raw);
          if (n <= 0 || n > 99) fail(`${name}: ${age}歳児の人数が想定の範囲外です（「${raw}」）`);
          openSum += n;
          vacancy[age] = n;
        }

        facilities.push({ id: name, name, w: null, c, vacancy });
      }
    }

    if (facilities.length < MIN_FACILITIES) {
      fail(`施設が${facilities.length}件しか取れていません（${MIN_FACILITIES}件以上のはず）`);
    }
    // 検算1: 入園案内PDFの施設がすべて空き状況の表にも出てきたか
    if (facilities.length !== guide.size) {
      const missing = [...guide.keys()].filter((k) => !seen.has(k));
      fail(`入園案内PDFにあって空き状況の表にない施設があります: ${missing.join("、")}`);
    }
    // 検算2: 区分がPDFと同じだけ出てきたか
    if (categories.length !== kinds.length) {
      fail(`区分が${categories.length}種類です（入園案内PDFでは${kinds.length}種類）`);
    }
    // 検算3: 欄の数が施設数×年齢数になるか
    const numberCells = facilities.reduce(
      (a, f) => a + f.vacancy.filter((v) => v !== null && v > 0).length,
      0,
    );
    const cells = numberCells + zeroCells + notOffered;
    if (cells !== facilities.length * AGE_COUNT) {
      fail(`欄の数が合いません（${cells} / 施設${facilities.length}×${AGE_COUNT}）`);
    }
    if (openSum === 0) fail("入所可能人数がひとつもありません（読み取りに失敗している可能性があります）");
    console.log(
      `${facilities.length}施設 ／ 入所可能${openSum}人・空きなし${zeroCells}欄・クラスなし${notOffered}欄`,
    );

    const previous = fs.existsSync(OUT_PATH)
      ? (JSON.parse(fs.readFileSync(OUT_PATH, "utf-8")) as { asOf?: string; facilities?: unknown[] })
      : null;
    if (previous?.facilities && facilities.length < previous.facilities.length * 0.9) {
      fail(`施設数が大きく減っています（前回 ${previous.facilities.length}件 → 今回 ${facilities.length}件）`);
    }
    if (previous?.asOf === asOf) {
      console.log(`公式データの時点が前回と同じ（${asOf}）のため更新はありません。`);
      return;
    }

    const notes = [
      `${targetLabel}入所分の入所可能人数です。${asOf}時点のものです。`,
      "公式の表で空らんになっている年齢は0（入所可能人数なし）にしています。",
      `公式の表で「${NOT_OFFERED_MARK}」になっている年齢は「—」にしています。入園案内の入所年齢と照らして、その園がその年齢を受け入れていないことを確かめています（出典: ${guideUrl}）。`,
      "空き状況の掲載は毎月15日です。申し込む前に公式ページで確かめてください。",
    ];

    const dataset = {
      municipalitySlug: MUNICIPALITY_SLUG,
      municipalityName: MUNICIPALITY_NAME,
      asOf,
      fetchedAt: todayJst(),
      sourceName: SOURCE_NAME,
      sourceUrl: SOURCE_URL,
      metrics: ["vacancy"],
      subtitle: `${targetLabel}入所分の入所可能人数`,
      notes,
      wards: [] as string[],
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
    console.log(`  ${facilities.length}施設 / ${categories.join("・")}`);
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

main().catch((err) => fail(String(err)));
