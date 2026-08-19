/**
 * 川口市の保育所等の募集予定人数を取り込む
 *
 * 実行: npm run vacancy:fetch:kawaguchi
 *
 * ## この自治体の特徴
 * - **PDFが2本**（保育所・認定こども園／地域型保育事業所）。どちらも同じ列の並び
 * - **地区（①中央地区…）が表の直前の見出し**になっていて、地区ごとに表が分かれる
 * - 分類（公設公営・公設民営・民設民営など）が1列目にある
 * - **施設コードがある**ので、施設の同一性と重複の確認に使える
 * - 空欄はそのクラスの受け入れがない。0は募集なし（ただし退所で空きが出ることがある）
 * - 認定こども園は保育所部分（2号・3号）、事業所内保育は地域枠のみの人数
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "kawaguchi";
const MUNICIPALITY_NAME = "川口市";
const SOURCE_NAME = "川口市「保育所等の募集予定状況（空き状況）」";
const INDEX_URL = "https://www.city.kawaguchi.lg.jp/soshiki/01080/050/4/32356.html";
const AGE_COUNT = 6;

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const EXTRACTOR = path.join(process.cwd(), "scripts", "kawaguchi-pdf-extract.py");

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

/** 空欄はそのクラスの受け入れがない */
function parseValue(raw: string, where: string): number | null {
  const t = toHalfWidth(squeeze(raw));
  if (t === "" || t === "-" || t === "－" || t === "―") return null;
  if (/^\d+$/.test(t)) return Number(t);
  fail(`${where}: 人数として読めません: 「${raw}」`);
}

type PdfTable = { section: string; head: string[]; rows: string[][] };
type PdfFile = { kind: string; asOf: number[][]; target: number[][]; tables: PdfTable[] };
type PdfResult = { files: PdfFile[] };

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
  console.log(`${MUNICIPALITY_NAME}の募集予定人数を取り込みます`);
  console.log(`公式ページ: ${INDEX_URL}\n`);

  const ua = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";
  const res = await fetch(INDEX_URL, { headers: { "User-Agent": ua } });
  if (!res.ok) fail(`公式ページが ${res.status} を返しました`);
  const html = await res.text();

  // 「保育所・認定こども園募集予定人数（令和8年度9月分）」「地域型保育事業所募集予定人数（令和8年度9月分)」
  const links = [...html.matchAll(/<a[^>]+href="([^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => ({ url: new URL(m[1], INDEX_URL).toString(), text: toHalfWidth(stripTags(m[2])) }))
    .map((l) => {
      const m = l.text.match(/^(保育所・認定こども園|地域型保育事業所)募集予定人数（令和(\d+)年度(\d+)月分/);
      if (!m) return null;
      return {
        ...l,
        kind: m[1],
        year: reiwaToYear(Number(m[2])),
        month: Number(m[3]),
        sortKey: reiwaToYear(Number(m[2])) * 100 + Number(m[3]),
      };
    })
    .filter((v): v is NonNullable<typeof v> => v !== null);
  if (links.length === 0) fail("募集予定人数のPDFが見つかりません。ページの構成が変わった可能性があります。");
  const newest = Math.max(...links.map((l) => l.sortKey));
  const latest = links.filter((l) => l.sortKey === newest);
  if (latest.length !== 2) {
    fail(`最新月のPDFが${latest.length}本です（保育所と地域型の2本のはず）: ${latest.map((l) => l.text).join(" / ")}`);
  }
  for (const l of latest) console.log(`  ${l.text}\n    ${l.url}`);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "kawaguchi-vacancy-"));
  try {
    const args: string[] = [];
    for (const [i, l] of latest.entries()) {
      const r = await fetch(l.url, { headers: { "User-Agent": ua } });
      if (!r.ok) fail(`PDFの取得に失敗しました（${r.status}）: ${l.url}`);
      const buf = Buffer.from(await r.arrayBuffer());
      if (buf.subarray(0, 4).toString() !== "%PDF") fail(`PDFではありません: ${l.url}`);
      const file = path.join(tmpDir, `kawaguchi-${i}.pdf`);
      fs.writeFileSync(file, buf);
      args.push(`${l.kind}:${file}`);
    }

    let pdf: PdfResult;
    try {
      pdf = JSON.parse(runPython([EXTRACTOR, ...args])) as PdfResult;
    } catch (err) {
      fail(`抽出結果を読めません: ${String(err)}`);
    }

    const asOfSet = new Set<string>();
    for (const f of pdf.files) {
      if (f.asOf.length !== 1) fail(`${f.kind}: 基準日が${f.asOf.length}種類あります`);
      const [y, m, d] = f.asOf[0];
      asOfSet.add(`${reiwaToYear(y)}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`);
      if (f.target.length !== 1) fail(`${f.kind}: 対象月が${f.target.length}種類あります`);
      const [ty, tm] = f.target[0];
      if (reiwaToYear(ty) !== latest[0].year || tm !== latest[0].month) {
        fail(`${f.kind}: PDFの対象月（${reiwaToYear(ty)}年度${tm}月）がリンクの文言と違います。`);
      }
    }
    if (asOfSet.size !== 1) fail(`PDFごとに基準日が違います: ${[...asOfSet].join(" / ")}`);
    const asOf = [...asOfSet][0];
    console.log(`\n基準日: ${asOf} / 対象: ${latest[0].year}年度${latest[0].month}月`);

    const wards: string[] = [];
    const categories: string[] = [];
    const facilities: {
      id: string;
      name: string;
      w: number;
      c: number;
      vacancy: (number | null)[];
    }[] = [];
    const seenCode = new Map<string, string>();

    for (const f of pdf.files) {
      for (const table of f.tables) {
        // 「①中央地区」から丸数字を落とす
        const area = squeeze(table.section).replace(/^[①-⑳\d]+/, "");
        if (!area.endsWith("地区")) fail(`地区の見出しが想定と違います: 「${table.section}」`);
        const head = table.head.map((h) => squeeze(h));
        const idx = {
          kubun: head.indexOf("分類"),
          code: head.indexOf("施設コード"),
          name: head.findIndex((h) => h.includes("保育施設名")),
        };
        if (idx.kubun < 0 || idx.code < 0 || idx.name < 0) {
          fail(`見出しが想定と違います: ${table.head.join(" / ")}`);
        }
        // 見出しの数字は全角。**地域型保育事業所は0〜2歳児しか列がない**ので、
        // 見つからない年齢は「クラスなし」として扱う
        const ageIdx = Array.from({ length: AGE_COUNT }, (_, i) =>
          head.findIndex((h) => toHalfWidth(h) === `${i}歳児`)
        );
        if (ageIdx[0] < 0) fail(`0歳児の見出しが見つかりません: ${table.head.join(" / ")}`);

        if (!wards.includes(area)) wards.push(area);
        for (const row of table.rows) {
          const name = (row[idx.name] ?? "").replace(/[　\s]+/g, "").trim();
          const code = squeeze(row[idx.code] ?? "");
          if (!name || !code) continue;
          if (!/^\d+$/.test(toHalfWidth(code))) continue;
          const category = squeeze(row[idx.kubun] ?? "");
          if (!category) fail(`${name}: 分類が分かりません`);
          if (!categories.includes(category)) categories.push(category);

          // **施設コードは市内で一意**。2本のPDFをまたいでも重ならないはず
          const prev = seenCode.get(code);
          if (prev) fail(`施設コードが重複しています: ${code}（${prev} と ${name}）`);
          seenCode.set(code, name);

          facilities.push({
            id: code,
            name,
            w: wards.indexOf(area),
            c: categories.indexOf(category),
            vacancy: ageIdx.map((col) =>
              col < 0 ? null : parseValue(row[col] ?? "", `川口市 ${name}`)
            ),
          });
        }
      }
    }

    if (facilities.length < 150) fail(`施設が${facilities.length}件しか取れていません`);

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
      sourceFiles: Object.fromEntries(latest.map((l) => [l.kind, l.url])),
      metrics: ["vacancy"],
      subtitle: `${latest[0].year}年度${latest[0].month}月の募集予定人数`,
      notes: [
        "川口市の注記のとおり、募集予定人数は事業者の都合や今後の退所などで増減することがあります。",
        "募集予定人数が0でも、今後の退所などで空きができることがあります。",
        "認定こども園の募集予定人数は保育所部分（2号・3号）のみ、事業所内保育は地域枠のみの人数です。",
      ],
      wards,
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

    const ageTotals = Array.from({ length: AGE_COUNT }, (_, age) =>
      facilities.reduce((acc, f) => acc + (f.vacancy[age] ?? 0), 0)
    );
    console.log(`書き出しました: ${path.relative(process.cwd(), OUT_PATH)}`);
    console.log(`  データ時点: ${asOf}`);
    console.log(`  施設コードの重複: なし（${seenCode.size}件）`);
    console.log("");
    for (const [i, wd] of wards.entries()) {
      console.log(`  ${wd} ${facilities.filter((f) => f.w === i).length}施設`);
    }
    console.log("");
    for (const [i, cat] of categories.entries()) {
      console.log(`  ${cat} ${facilities.filter((f) => f.c === i).length}施設`);
    }
    console.log("");
    console.log("  年齢 | 募集予定");
    ageTotals.forEach((v, age) => console.log(`  ${age}歳児 | ${v}`));
    console.log(`  合計 | ${ageTotals.reduce((a, b) => a + b, 0)}`);
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

main().catch((err) => fail(String(err)));
