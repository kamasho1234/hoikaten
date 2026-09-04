/**
 * 清瀬市の保育施設の欠員情報を取り込む
 *
 * 実行: npm run vacancy:fetch:kiyose
 *
 * ## この自治体の特徴
 * - 「種類／保育園／0歳〜5歳／計」の素直な表。種類は変わる行にだけ入る
 * - **空欄は欠員がないこと**を表す（クラスがないという意味ではない）ので0として読む。
 *   表の下にも「欠員数が0（表示なし）の場合でも入園申込みはできます」とある
 * - 施設名が「第 １ 保 育 園」のように均等割りされているので詰める
 * - 1施設ずつ「年齢の和＝計」を、最後に合計行との突き合わせを行う
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "kiyose";
const MUNICIPALITY_NAME = "清瀬市";
const SOURCE_NAME = "清瀬市「認可保育園・認定こども園・地域型保育所 定員欠員情報」";
const INDEX_URL = "https://www.city.kiyose.lg.jp/kosodatekyouiku/hoikusyoyouchien/hoikuen/1014588.html";
const AGE_COUNT = 6;

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const EXTRACTOR = path.join(process.cwd(), "scripts", "kiyose-pdf-extract.py");

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

type PdfResult = {
  asOf: number[];
  target: number[];
  head: string[];
  sub: string[];
  rows: string[][];
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
  console.log(`${MUNICIPALITY_NAME}の欠員情報を取り込みます`);
  console.log(`公式ページ: ${INDEX_URL}\n`);

  const ua = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";
  const res = await fetch(INDEX_URL, { headers: { "User-Agent": ua } });
  if (!res.ok) fail(`公式ページが ${res.status} を返しました`);
  const html = await res.text();

  // 「令和8年9月入園保育施設欠員情報 （PDF 241.8 KB）」
  const links = [...html.matchAll(/<a[^>]+href="([^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => ({ url: new URL(m[1], INDEX_URL).toString(), text: toHalfWidth(stripTags(m[2])) }))
    .map((l) => {
      const m = l.text.match(/^令和(\d+)年(\d+)月入園保育施設欠員情報/);
      if (!m) return null;
      const year = reiwaToYear(Number(m[1]));
      const month = Number(m[2]);
      return { ...l, year, month, sortKey: year * 100 + month };
    })
    .filter((v): v is NonNullable<typeof v> => v !== null);
  if (links.length === 0) fail("欠員情報のPDFが見つかりません。ページの構成が変わった可能性があります。");
  const latest = links.reduce((a, b) => (b.sortKey > a.sortKey ? b : a));
  console.log(`最新: ${latest.text}\n  ${latest.url}`);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "kiyose-vacancy-"));
  try {
    const r = await fetch(latest.url, { headers: { "User-Agent": ua } });
    if (!r.ok) fail(`PDFの取得に失敗しました（${r.status}）: ${latest.url}`);
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.subarray(0, 4).toString() !== "%PDF") fail(`PDFではありません: ${latest.url}`);
    const file = path.join(tmpDir, "kiyose.pdf");
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
    console.log(`基準日: ${asOf} / 対象: ${latest.year}年${latest.month}月入園`);

    const head = pdf.head.map((h) => toHalfWidth(squeeze(h)));
    const ageIdx = Array.from({ length: AGE_COUNT }, (_, i) => head.indexOf(`${i}歳`));
    if (ageIdx.some((i) => i < 0)) fail(`年齢の見出しが見つかりません: ${pdf.head.join(" / ")}`);
    const totalIdx = head.indexOf("計");
    if (totalIdx < 0) fail(`「計」の列が見つかりません: ${pdf.head.join(" / ")}`);
    const nameIdx = head.indexOf("保育園");
    if (nameIdx < 0) fail(`施設名の列が分かりません: ${pdf.head.join(" / ")}`);
    // 2行目は年齢ごとに「欠員数」と書かれているだけ
    const sub = pdf.sub.map((h) => squeeze(h));
    for (const c of [...ageIdx, totalIdx]) {
      if (sub[c] !== "欠員数") fail(`「欠員数」の並びが想定と違います: ${pdf.sub.join(" / ")}`);
    }

    const parseValue = (raw: string, where: string): number => {
      const t = toHalfWidth(squeeze(raw));
      // 空欄は欠員がないこと
      if (t === "") return 0;
      if (!/^\d+$/.test(t)) fail(`${where}: 人数として読めません: 「${raw}」`);
      return Number(t);
    };

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
    let declared: number[] | null = null;
    let kind = "";
    /** 表の「種類」の欄をそのまま出すと施設の種類として伝わらないものを言い換える */
    const KIND_LABEL: Record<string, string> = {
      公立: "認可保育園（公立）",
      私立: "認可保育園（私立）",
    };

    for (const row of pdf.rows) {
      const first = squeeze(row[0] ?? "");
      const name = squeeze(row[nameIdx] ?? "");
      if (first === "合計") {
        declared = ageIdx.map((c) => parseValue(row[c] ?? "", "清瀬市 合計行"));
        const total = parseValue(row[totalIdx] ?? "", "清瀬市 合計行（計）");
        const sum = declared.reduce((a, b) => a + b, 0);
        if (total !== sum) fail(`合計行の計${total}と年齢ごとの和${sum}が合いません`);
        continue;
      }
      // 表の「種類」は認可保育園だけ設置主体で書かれるので、種類として分かる名前に直す
      if (first) kind = KIND_LABEL[first] ?? first;
      if (!name) continue;
      if (!kind) fail(`${name}: 施設の種類が分かりません`);

      const vacancy = ageIdx.map((c) => parseValue(row[c] ?? "", `清瀬市 ${name}`));
      const total = parseValue(row[totalIdx] ?? "", `清瀬市 ${name}（計）`);
      const sum = vacancy.reduce((a, b) => a + b, 0);
      if (total !== sum) fail(`${name}: 計${total}と年齢ごとの和${sum}が合いません`);
      vacancy.forEach((v, age) => {
        builtByAge[age] += v;
      });

      if (!categories.includes(kind)) categories.push(kind);
      const id = `${kind}-${name}`;
      if (seenId.has(id)) fail(`施設名が重複しています: ${id}`);
      seenId.add(id);
      facilities.push({ id, name, w: null, c: categories.indexOf(kind), vacancy });
    }

    if (!declared) fail("合計行が見つかりません。検算ができないので中断します。");
    if (declared.join("/") !== builtByAge.join("/")) {
      fail(`合計行が ${declared.join("/")} なのに積み上げが ${builtByAge.join("/")} です`);
    }
    if (facilities.length < 20) fail(`施設が${facilities.length}件しか取れていません`);

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
      subtitle: `${latest.year}年${latest.month}月入園の欠員数`,
      notes: [
        "清瀬市の注記のとおり、在園児の状況や職員配置の関係から、欠員があっても受け入れができない場合があります。欠員が0でも入園の申し込みはできます。",
        "選考後に欠員が出た場合も欠員数に含めています。",
        "小規模保育所・事業所内保育所は2歳児までの施設です。",
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
    console.log(`  合計行との突き合わせ: 一致（${builtByAge.join("/")}）`);
    console.log("");
    for (const [i, cat] of categories.entries()) {
      console.log(`  ${cat} ${facilities.filter((f) => f.c === i).length}施設`);
    }
    console.log("");
    console.log("  年齢 | 欠員");
    builtByAge.forEach((v, age) => console.log(`  ${age}歳児 | ${v}`));
    console.log(`  合計 | ${builtByAge.reduce((a, b) => a + b, 0)}`);
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

main().catch((err) => fail(String(err)));
