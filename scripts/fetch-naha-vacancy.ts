/**
 * 那覇市の保育園等の空き状況・入所待ち人数を取り込む
 *
 * 実行: npm run vacancy:fetch:naha
 *
 * ## この自治体の特徴
 * - **1つの施設が3行**（空き／入所待ち／入所待ち(第一希望のみ)）で並ぶ
 * - 空きは人数だが、「※（保育士配置等あれば可）」「-（受入れ不可）」も混ざる。
 *   ※は人数が示されていないので「—」として持ち、注記でそのことを断る
 * - 入所待ちは第1〜第6希望が混ざった人数。第一希望だけの人数も併記されている
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "naha";
const MUNICIPALITY_NAME = "那覇市";
const SOURCE_NAME = "那覇市「保育所等の空き状況」";
const INDEX_URL = "https://www.city.naha.okinawa.jp/child/hoikuen/1002762/1002783/1002790.html";
const AGE_COUNT = 6;
const UA = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";

const COL_NAME = 0;
const COL_WARD = 1;
const COL_TYPE = 2;
const COL_ZERO = 3;

const ROW_VACANCY = "空き";
const ROW_WAITING = "入所待ち";
const ROW_FIRST = "入所待ち(第一希望のみ)";

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const EXTRACTOR = path.join(process.cwd(), "scripts", "naha-pdf-extract.py");

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

function squeeze(s: string): string {
  return (s ?? "").replace(/[\s　]/g, "");
}

function stripTags(html: string): string {
  return html.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").replace(/[\s　]+/g, " ").trim();
}

type PdfResult = {
  target: [number, number];
  notes: string[];
  rows: string[][];
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

async function main() {
  console.log(`${MUNICIPALITY_NAME}の空き状況を取り込みます`);
  console.log(`公式ページ: ${INDEX_URL}\n`);

  const res = await fetch(INDEX_URL, { headers: { "User-Agent": UA } });
  if (!res.ok) fail(`公式ページが ${res.status} を返しました`);
  const html = await res.text();

  // 「令和8年10月に向けた新規受け入れ児童数の見込み（令和8年8月10日） （PDF 263.8 KB）」
  const links = [...html.matchAll(/<a[^>]+href="([^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => ({ url: new URL(m[1], INDEX_URL).toString(), text: toHalfWidth(stripTags(m[2])) }))
    .map((l) => {
      const m = squeeze(l.text).match(
        /令和(\d+)年(\d+)月に向けた新規受け入れ児童数の見込み（令和(\d+)年(\d+)月(\d+)日）/
      );
      if (!m) return null;
      const fiscalYear = reiwaToYear(Number(m[1]));
      const month = Number(m[2]);
      return {
        ...l,
        reiwa: Number(m[1]),
        year: fiscalYear,
        month,
        postedMonth: Number(m[4]),
        postedDay: Number(m[5]),
        sortKey: fiscalYear * 100 + month,
      };
    })
    .filter((v): v is NonNullable<typeof v> => v !== null);
  if (links.length === 0) fail("空き状況のPDFが見つかりません。ページの構成が変わった可能性があります。");
  const latest = links.reduce((a, b) => (b.sortKey > a.sortKey ? b : a));
  console.log(`最新: ${latest.text}\n  ${latest.url}`);

  const asOf = `${latest.postedMonth > latest.month ? latest.year - 1 : latest.year}-${String(
    latest.postedMonth
  ).padStart(2, "0")}-${String(latest.postedDay).padStart(2, "0")}`;

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "naha-vacancy-"));
  try {
    const r = await fetch(latest.url, { headers: { "User-Agent": UA } });
    if (!r.ok) fail(`PDFの取得に失敗しました（${r.status}）: ${latest.url}`);
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.subarray(0, 4).toString() !== "%PDF") fail(`PDFではありません: ${latest.url}`);
    const file = path.join(tmpDir, "naha.pdf");
    fs.writeFileSync(file, buf);

    let pdf: PdfResult;
    try {
      pdf = JSON.parse(runPython([EXTRACTOR, file])) as PdfResult;
    } catch (err) {
      fail(`抽出結果を読めません: ${String(err)}`);
    }

    const [tr, tm] = pdf.target;
    if (tr !== latest.reiwa || tm !== latest.month) {
      fail(
        `PDFの表題（令和${tr}年${tm}月）がリンクの文言（令和${latest.reiwa}年${latest.month}月）と違います`
      );
    }
    console.log(`掲載日: ${asOf} / 対象: ${latest.year}年${latest.month}月入所`);

    const wards: string[] = [];
    const facilities: {
      id: string;
      name: string;
      w: number;
      c: null;
      vacancy: (number | null)[];
      waiting: (number | null)[];
    }[] = [];
    const seen = new Set<string>();
    let consult = 0;
    let notAccepting = 0;
    let vacancyTotal = 0;
    let waitingTotal = 0;

    const num = (raw: string): number | null | "consult" | "none" => {
      const t = toHalfWidth(squeeze(raw));
      if (t === "") return null;
      if (t === "※") return "consult";
      if (/^[-‐－―ー]$/.test(t)) return "none";
      if (!/^\d+$/.test(t)) return null;
      return Number(t);
    };

    // 3行で1つの施設。園名の行から順に読む
    for (let i = 0; i < pdf.rows.length; i++) {
      const row = pdf.rows[i];
      const name = squeeze(row[COL_NAME]);
      const type = squeeze(row[COL_TYPE]);
      if (!name || type !== ROW_VACANCY) continue;

      const waitingRow = pdf.rows[i + 1];
      const firstRow = pdf.rows[i + 2];
      if (!waitingRow || !firstRow) fail(`${name}: 3行そろっていません`);
      if (squeeze(waitingRow[COL_TYPE]) !== ROW_WAITING) {
        fail(`${name}: 2行めが「${ROW_WAITING}」ではありません: 「${waitingRow[COL_TYPE]}」`);
      }
      if (squeeze(firstRow[COL_TYPE]) !== ROW_FIRST) {
        fail(`${name}: 3行めが「${ROW_FIRST}」ではありません: 「${firstRow[COL_TYPE]}」`);
      }

      const ward = squeeze(row[COL_WARD]);
      if (!ward) fail(`${name}: 地域が空です`);
      if (!wards.includes(ward)) wards.push(ward);

      const id = `${ward}-${name}`;
      if (seen.has(id)) fail(`施設が重複しています: ${id}`);
      seen.add(id);

      const vacancy: (number | null)[] = [];
      const waiting: (number | null)[] = [];
      for (let age = 0; age < AGE_COUNT; age++) {
        const v = num(row[COL_ZERO + age] ?? "");
        if (v === "consult") {
          // 「※」は人数が示されていないので持たない
          consult += 1;
          vacancy.push(null);
        } else if (v === "none") {
          // 「-」は受入れ不可。そのクラスはあるが空きがないという意味なので0として持つ
          notAccepting += 1;
          vacancy.push(0);
        } else {
          vacancy.push(v);
          if (v !== null) vacancyTotal += v;
        }

        const w = num(waitingRow[COL_ZERO + age] ?? "");
        const wv = typeof w === "number" ? w : null;
        waiting.push(wv);
        if (wv !== null) waitingTotal += wv;

        // 第一希望だけの人数は、入所待ちの人数を超えないはず
        const f = num(firstRow[COL_ZERO + age] ?? "");
        if (typeof f === "number" && wv !== null && f > wv) {
          fail(`${name}: ${age}才の第一希望のみ（${f}）が入所待ち（${wv}）より多くなっています`);
        }
      }

      facilities.push({
        id,
        name,
        w: wards.indexOf(ward),
        c: null,
        vacancy,
        waiting,
      });
      i += 2;
    }

    if (facilities.length < 80) fail(`施設が${facilities.length}件しか取れていません`);

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
      subtitle: `${latest.year}年${latest.month}月入所に向けた空き状況`,
      notes: [
        "那覇市が出しているのは、翌々月の入所に向けた新規受け入れ児童数の見込みです。空き人数・入所待ち人数はいずれも目安です。",
        "公式の表で「※（保育士配置等あれば可）」となっている欄は、人数が示されていないため「—」にしています。",
        "「-（受入れ不可）」となっているクラスは、受け入れができないという意味なので空き0として載せています。欄そのものが空いている（クラスがない）ところは「—」にしています。",
        "入所待ちの人数には第1希望から第6希望までが混ざっているため、実際の入所待ち人数より多くなります（公式の注記より）。",
        "空き状況は在園児の退所、保育士の離職や確保などにより絶えず変わります。",
      ],
      wards,
      categories: [],
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
    console.log(
      `  ${facilities.length}施設 / ${wards.length}地域 / 空きの合計 ${vacancyTotal} / 入所待ちの合計 ${waitingTotal}`
    );
    console.log(`  「※（保育士配置等あれば可）」だった欄: ${consult}`);
    console.log(`  「-（受入れ不可）」だった欄（0として持ちました）: ${notAccepting}`);
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

main().catch((err) => fail(String(err)));
