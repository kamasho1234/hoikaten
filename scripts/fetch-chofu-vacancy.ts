/**
 * 調布市の認可保育園の募集数・申込人数を取り込む
 *
 * 実行: npm run vacancy:fetch:chofu
 *
 * ## この自治体の特徴
 * - **募集数と申込人数の両方を実数で公開している**（三鷹市・柏市などと同じ）
 * - **年齢ごとに「募集」「申込」の2列**が並ぶ（0歳児クラスから5歳児クラスまで12列）
 * - エリア（西調布・飛田給ほか）が左端の縦書きで、変わるときだけ値が入る
 * - **公立は園名の左の列に「公」と入る**。これで公立・私立を見分ける
 * - 「○」は受入開始月齢が満3か月からという意味の印で、人数ではない
 *
 * ## 申込人数の読み方
 * 入園申込でその園を希望した合計人数。第1希望から第6希望までの合計なので、
 * そのまま倍率にはならない。
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "chofu";
const MUNICIPALITY_NAME = "調布市";
const SOURCE_NAME = "調布市「認可保育園 募集数」";
const INDEX_URL = "https://www.city.chofu.lg.jp/050020/p028155.html";
const AGE_COUNT = 6;

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const EXTRACTOR = path.join(process.cwd(), "scripts", "chofu-pdf-extract.py");

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

/**
 * 空欄はそのクラスの受け入れがない。
 * **人数のかわりに注記が入る欄がある**（分園の「※4歳児クラスからは本園に移行」など）ので、
 * 読めないものは「—」にして呼び出し側で注記に回す。
 */
function parseValue(raw: string): { value: number | null; note: string | null } {
  const t = toHalfWidth(squeeze(raw));
  if (t === "" || t === "-" || t === "－" || t === "―") return { value: null, note: null };
  if (/^\d+$/.test(t)) return { value: Number(t), note: null };
  return { value: null, note: (raw ?? "").replace(/\s+/g, "") };
}

type PdfTable = { ageHead: string[]; head: string[]; rows: string[][] };
type PdfResult = { target: number[][]; published: number[][]; tables: PdfTable[] };

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
  console.log(`${MUNICIPALITY_NAME}の募集数・申込人数を取り込みます`);
  console.log(`公式ページ: ${INDEX_URL}\n`);

  const ua = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";
  const res = await fetch(INDEX_URL, { headers: { "User-Agent": ua } });
  if (!res.ok) fail(`公式ページが ${res.status} を返しました`);
  const html = await res.text();

  // ファイル名が「r810bosyuusuu.pdf」（令和8年10月ぶん）。4月は一次〜三次があるので除く
  const links = [...html.matchAll(/<a[^>]+href="([^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => ({ url: new URL(m[1], INDEX_URL).toString(), text: toHalfWidth(stripTags(m[2])) }))
    .map((l) => {
      const m = path.basename(new URL(l.url).pathname).match(/^r(\d)(\d{2})bosyuusuu/i);
      if (!m) return null;
      const year = reiwaToYear(Number(m[1]));
      const month = Number(m[2]);
      return { ...l, year, month, sortKey: year * 100 + month };
    })
    .filter((v): v is NonNullable<typeof v> => v !== null);
  if (links.length === 0) fail("募集数のPDFが見つかりません。ページの構成が変わった可能性があります。");
  const latest = links.reduce((a, b) => (b.sortKey > a.sortKey ? b : a));
  console.log(`最新: ${latest.text}\n  ${latest.url}`);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "chofu-vacancy-"));
  try {
    const r = await fetch(latest.url, { headers: { "User-Agent": ua } });
    if (!r.ok) fail(`PDFの取得に失敗しました（${r.status}）: ${latest.url}`);
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.subarray(0, 4).toString() !== "%PDF") fail(`PDFではありません: ${latest.url}`);
    const file = path.join(tmpDir, "chofu.pdf");
    fs.writeFileSync(file, buf);

    let pdf: PdfResult;
    try {
      pdf = JSON.parse(runPython([EXTRACTOR, file])) as PdfResult;
    } catch (err) {
      fail(`抽出結果を読めません: ${String(err)}`);
    }

    if (pdf.target.length !== 1) fail(`PDFに入園月が${pdf.target.length}種類あります`);
    const [ty, tm] = pdf.target[0];
    if (reiwaToYear(ty) !== latest.year || tm !== latest.month) {
      fail(
        `PDFの入園月（${reiwaToYear(ty)}年${tm}月）がファイル名（${latest.year}年${latest.month}月）と違います。`
      );
    }
    if (pdf.published.length !== 1) fail(`PDFに公表日が${pdf.published.length}種類あります`);
    const [py, pm, pd] = pdf.published[0];
    const asOf = `${reiwaToYear(py)}-${String(pm).padStart(2, "0")}-${String(pd).padStart(2, "0")}`;
    console.log(`公表日: ${asOf} / 対象: ${reiwaToYear(ty)}年${tm}月1日入園`);

    const wards: string[] = [];
    const categories: string[] = [];
    const facilities: {
      id: string;
      name: string;
      w: number | null;
      c: number;
      vacancy: (number | null)[];
      waiting: (number | null)[];
    }[] = [];
    const seenId = new Set<string>();
    const noteCells: string[] = [];
    let area = "";

    for (const table of pdf.tables) {
      // 1行目に年齢、2行目に「募集」「申込」が交互に並ぶ
      const ageHead = table.ageHead.map((h) => toHalfWidth(squeeze(h)));
      const sub = table.head.map((h) => squeeze(h));
      const ageIdx = Array.from({ length: AGE_COUNT }, (_, i) =>
        ageHead.indexOf(`${i}歳児クラス`)
      );
      if (ageIdx.some((i) => i < 0)) fail(`年齢の見出しが足りません: ${table.ageHead.join(" / ")}`);
      for (const [age, col] of ageIdx.entries()) {
        if (sub[col] !== "募集" || sub[col + 1] !== "申込") {
          fail(`${age}歳児の「募集」「申込」の並びが想定と違います: ${table.head.join(" / ")}`);
        }
      }
      const nameIdx = table.head.findIndex((h) => squeeze(h).startsWith("保育園名"));
      if (nameIdx < 0) fail(`保育園名の列が分かりません: ${table.head.join(" / ")}`);

      for (const row of table.rows) {
        // エリアは左端の縦書き。変わるときだけ値が入る
        if (squeeze(row[0] ?? "")) area = squeeze(row[0]);
        // 公立は園名の左の列に「公」が入る
        const ownerMark = squeeze(row[nameIdx] ?? "");
        const category = ownerMark === "公" ? "公立保育園" : "私立保育園";
        const name = (row[nameIdx + 1] ?? "").replace(/[　\s]+/g, "").trim();
        if (!name) continue;
        if (!area) fail(`${name}: エリアが分かりません`);
        if (!wards.includes(area)) wards.push(area);
        if (!categories.includes(category)) categories.push(category);

        const vacancy: (number | null)[] = [];
        const waiting: (number | null)[] = [];
        for (const [age, c] of ageIdx.entries()) {
          const v = parseValue(row[c] ?? "");
          const w = parseValue(row[c + 1] ?? "");
          for (const p of [v, w]) {
            if (p.note) noteCells.push(`${name}（${age}歳児「${p.note}」）`);
          }
          vacancy.push(v.value);
          waiting.push(w.value);
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
          waiting,
        });
      }
    }

    if (facilities.length < 40) fail(`施設が${facilities.length}件しか取れていません`);

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
      metrics: ["vacancy", "waiting"],
      subtitle: `${reiwaToYear(ty)}年${tm}月1日入園の募集数と申込人数`,
      waitingCaveat:
        "申込人数は、入園申込でその園を希望した方の合計です。希望園は最大6園まで書けるので、第1希望から第6希望までの合計であり、そのまま倍率にはなりません。",
      notes: [
        "調布市の注記のとおり、申し込み締切日から選考会議日までに新たな募集が出た場合も選考を行うことがあります。",
        "クラスは年度はじめ（4月1日）時点の年齢で決まります。",
        "この一覧は認可保育園のみです。",
        ...(noteCells.length > 0
          ? [`次の欄は人数ではなく注記が入っています: ${noteCells.join("、")}`]
          : []),
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
    const waitTotals = Array.from({ length: AGE_COUNT }, (_, age) =>
      facilities.reduce((acc, f) => acc + (f.waiting[age] ?? 0), 0)
    );
    console.log(`書き出しました: ${path.relative(process.cwd(), OUT_PATH)}`);
    console.log(`  人数ではなく注記が入っていた欄: ${noteCells.length}件`);
    console.log("");
    for (const [i, wd] of wards.entries()) {
      console.log(`  ${wd} ${facilities.filter((f) => f.w === i).length}施設`);
    }
    console.log("");
    for (const [i, cat] of categories.entries()) {
      console.log(`  ${cat} ${facilities.filter((f) => f.c === i).length}施設`);
    }
    console.log("");
    console.log("  年齢 | 募集 | 申込");
    ageTotals.forEach((v, age) => console.log(`  ${age}歳児 | ${v} | ${waitTotals[age]}`));
    console.log(
      `  合計 | ${ageTotals.reduce((a, b) => a + b, 0)} | ${waitTotals.reduce((a, b) => a + b, 0)}`
    );
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

main().catch((err) => fail(String(err)));
