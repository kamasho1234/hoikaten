/**
 * 国立市の認可保育施設の受入可能児童数を取り込む
 *
 * 実行: npm run vacancy:fetch:kunitachi
 *
 * ## この自治体の特徴
 * - 「クラス（施設名）／0歳〜5歳／計」の素直な表。末尾に施設名のない合計行がある
 * - **施設名は市の表の呼び方のまま**（「西」「東」「北」など短い名前）。
 *   正式名称との対応は公表されていないので、公式の表記をそのまま使う
 * - 空欄はそのクラスを設けていないこと。「計」の欄まで空欄の行があるので、
 *   計が書かれている行だけ「年齢の和＝計」を確かめる
 * - 家庭的保育は含まれない（表の下の注記）
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "kunitachi";
const MUNICIPALITY_NAME = "国立市";
const SOURCE_NAME = "国立市「認可保育施設受入可能児童数」";
const INDEX_URL =
  "https://www.city.kunitachi.tokyo.jp/soshiki/Dept04/Div03/Sec01/gyomu/0276/0277/0279/1682573769310.html";
const AGE_COUNT = 6;

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const EXTRACTOR = path.join(process.cwd(), "scripts", "kunitachi-pdf-extract.py");

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

type PdfResult = { target: number[]; head: string[]; rows: string[][] };

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
  console.log(`${MUNICIPALITY_NAME}の受入可能児童数を取り込みます`);
  console.log(`公式ページ: ${INDEX_URL}\n`);

  const ua = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";
  const res = await fetch(INDEX_URL, { headers: { "User-Agent": ua } });
  if (!res.ok) fail(`公式ページが ${res.status} を返しました`);
  const html = await res.text();

  // 「令和8年7月利用調整後 (PDFファイル: 69.8KB)」。ファイル名は月と揃っていないので文言で選ぶ
  const links = [...html.matchAll(/<a[^>]+href="([^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => ({ url: new URL(m[1], INDEX_URL).toString(), text: toHalfWidth(stripTags(m[2])) }))
    .map((l) => {
      const m = l.text.match(/^令和(\d+)年(\d+)月利用調整後/);
      if (!m) return null;
      const year = reiwaToYear(Number(m[1]));
      const month = Number(m[2]);
      return { ...l, year, month, sortKey: year * 100 + month };
    })
    .filter((v): v is NonNullable<typeof v> => v !== null);
  if (links.length === 0) {
    fail("受入可能児童数のPDFが見つかりません。ページの構成が変わった可能性があります。");
  }
  const latest = links.reduce((a, b) => (b.sortKey > a.sortKey ? b : a));
  console.log(`最新: ${latest.text}\n  ${latest.url}`);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "kunitachi-vacancy-"));
  try {
    const r = await fetch(latest.url, { headers: { "User-Agent": ua } });
    if (!r.ok) fail(`PDFの取得に失敗しました（${r.status}）: ${latest.url}`);
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.subarray(0, 4).toString() !== "%PDF") fail(`PDFではありません: ${latest.url}`);
    const file = path.join(tmpDir, "kunitachi.pdf");
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
    const asOf = `${latest.year}-${String(latest.month).padStart(2, "0")}-01`;
    console.log(`対象: ${latest.year}年${latest.month}月利用調整後`);

    const head = pdf.head.map((h) => toHalfWidth(squeeze(h)));
    const ageIdx = Array.from({ length: AGE_COUNT }, (_, i) => head.indexOf(`${i}歳`));
    if (ageIdx.some((i) => i < 0)) fail(`年齢の見出しが見つかりません: ${pdf.head.join(" / ")}`);
    const totalIdx = head.indexOf("計");
    if (totalIdx < 0) fail(`「計」の列が見つかりません: ${pdf.head.join(" / ")}`);

    const facilities: {
      id: string;
      name: string;
      w: null;
      c: null;
      vacancy: (number | null)[];
    }[] = [];
    const seenId = new Set<string>();
    const builtByAge = Array.from({ length: AGE_COUNT }, () => 0);
    let declared: number[] | null = null;

    for (const row of pdf.rows) {
      const name = squeeze(row[0] ?? "");
      const values = ageIdx.map((c) => {
        const t = toHalfWidth(squeeze(row[c] ?? ""));
        // 空欄はそのクラスを設けていない
        if (t === "") return null;
        if (!/^\d+$/.test(t)) fail(`${name || "合計行"}: 人数として読めません: 「${row[c]}」`);
        return Number(t);
      });
      // 「計」の欄が書かれている行だけ突き合わせる（0歳だけの施設は計が空欄）
      const totalRaw = toHalfWidth(squeeze(row[totalIdx] ?? ""));
      if (totalRaw !== "") {
        if (!/^\d+$/.test(totalRaw)) fail(`${name || "合計行"}: 計を読めません: 「${row[totalIdx]}」`);
        const sum = values.reduce((a: number, v) => a + (v ?? 0), 0);
        if (Number(totalRaw) !== sum) {
          fail(`${name || "合計行"}: 計${totalRaw}と年齢ごとの和${sum}が合いません`);
        }
      }

      // 施設名のない行が合計
      if (!name) {
        declared = values.map((v) => v ?? 0);
        continue;
      }
      values.forEach((v, age) => {
        builtByAge[age] += v ?? 0;
      });
      const id = name;
      if (seenId.has(id)) fail(`施設名が重複しています: ${id}`);
      seenId.add(id);
      facilities.push({ id, name, w: null, c: null, vacancy: values });
    }

    if (!declared) fail("合計行が見つかりません。検算ができないので中断します。");
    if (declared.join("/") !== builtByAge.join("/")) {
      fail(`合計行が ${declared.join("/")} なのに積み上げが ${builtByAge.join("/")} です`);
    }
    if (facilities.length < 15) fail(`施設が${facilities.length}件しか取れていません`);

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
      subtitle: `${latest.year}年${latest.month}月の利用調整後の受入可能児童数`,
      notes: [
        "国立市が公表している受入可能児童数です。利用調整のあとの人数のため、その後の退園などで変わることがあります。",
        "施設名は市の一覧表の呼び方をそのまま載せています。",
        "「—」はそのクラスを設けていない施設です。家庭的保育は含まれていません。",
      ],
      wards: [],
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
    console.log(`  合計行との突き合わせ: 一致（${builtByAge.join("/")}）`);
    console.log("");
    console.log(`  ${facilities.length}施設`);
    console.log("");
    console.log("  年齢 | 受入可能");
    builtByAge.forEach((v, age) => console.log(`  ${age}歳児 | ${v}`));
    console.log(`  合計 | ${builtByAge.reduce((a, b) => a + b, 0)}`);
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

main().catch((err) => fail(String(err)));
