/**
 * 鎌倉市の認可保育所等の受入可能状況を取り込む
 *
 * 実行: npm run vacancy:fetch:kamakura
 *
 * ## この自治体の特徴
 * - その月の入所審査で受け入れられる人数が載っている
 * - 空欄はそのクラスを設けていない
 * - 施設の種類は「保」「認」「小」「事」「家」の1文字で、裏面に凡例がある
 * - 分園はNo.も種類も振られていないので、1つ上の行から引き継ぐ
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "kamakura";
const MUNICIPALITY_NAME = "鎌倉市";
const SOURCE_NAME = "鎌倉市「入所受け入れ人数・入所保留状況集計」";
const INDEX_URL = "https://www.city.kamakura.kanagawa.jp/hoiku/ukeire.html";
const AGE_COUNT = 6;
const UA = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const EXTRACTOR = path.join(process.cwd(), "scripts", "kamakura-pdf-extract.py");

function fail(message: string): never {
  console.error(`\n[中断] ${message}`);
  process.exit(1);
}

function todayJst(): string {
  const jst = new Date(Date.now() + 9 * 60 * 60 * 1000);
  return jst.toISOString().slice(0, 10);
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
  target: number;
  asOf: [number, number, number];
  legend: { mark: string; label: string }[];
  wordSum: number;
  rows: { area: string; no: string; kind: string; name: string; values: string[] }[];
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
  console.log(`${MUNICIPALITY_NAME}の受入可能状況を取り込みます`);
  console.log(`公式ページ: ${INDEX_URL}\n`);

  const res = await fetch(INDEX_URL, { headers: { "User-Agent": UA } });
  if (!res.ok) fail(`公式ページが ${res.status} を返しました`);
  const html = await res.text();

  // 「令和8年（2026年）10月入所（PDF：201KB）」。「入所終了時点」は保留者の一覧なので外す
  const links = [...html.matchAll(/<a[^>]+href="([^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => ({ url: new URL(m[1], INDEX_URL).toString(), text: toHalfWidth(stripTags(m[2])) }))
    .map((l) => {
      const text = squeeze(l.text);
      if (text.includes("終了時点") || text.includes("最低指数")) return null;
      const m = text.match(/令和(\d+)年（\d+年）(\d+)月入所(?:（(\d)次審査）)?/);
      if (!m) return null;
      const reiwa = Number(m[1]);
      const month = Number(m[2]);
      const round = m[3] ? Number(m[3]) : 1;
      // 文言の「令和N年M月」はそのまま暦のとおりなので、年と月で新しい順に見る
      return { ...l, reiwa, month, sortKey: reiwa * 1000 + month * 10 + round };
    })
    .filter((v): v is NonNullable<typeof v> => v !== null);
  if (links.length === 0) fail("受入可能状況のPDFが見つかりません。ページの構成が変わった可能性があります。");
  const latest = links.reduce((a, b) => (b.sortKey > a.sortKey ? b : a));
  console.log(`最新: ${latest.text}\n  ${latest.url}`);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "kamakura-vacancy-"));
  try {
    const r = await fetch(latest.url, { headers: { "User-Agent": UA } });
    if (!r.ok) fail(`PDFの取得に失敗しました（${r.status}）: ${latest.url}`);
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.subarray(0, 4).toString() !== "%PDF") fail(`PDFではありません: ${latest.url}`);
    const file = path.join(tmpDir, "kamakura.pdf");
    fs.writeFileSync(file, buf);

    let pdf: PdfResult;
    try {
      pdf = JSON.parse(runPython([EXTRACTOR, file])) as PdfResult;
    } catch (err) {
      fail(`抽出結果を読めません: ${String(err)}`);
    }

    if (pdf.target !== latest.month) {
      fail(`PDFの表題（${pdf.target}月入所審査）がリンクの文言（${latest.month}月入所）と違います`);
    }
    const [ay, am, ad] = pdf.asOf;
    const asOf = `${2018 + ay}-${String(am).padStart(2, "0")}-${String(ad).padStart(2, "0")}`;
    if (asOf > todayJst()) fail(`基準日（${asOf}）が今日より先になっています`);
    console.log(`基準日: ${asOf} / 対象: ${pdf.target}月入所審査`);

    const kindLabels = new Map(pdf.legend.map((l) => [l.mark, l.label]));
    const wards: string[] = [];
    const categories: string[] = [];
    const facilities: {
      id: string;
      name: string;
      w: number;
      c: number;
      vacancy: (number | null)[];
    }[] = [];
    const seen = new Set<string>();
    const numbers: number[] = [];
    let kind = "";
    let noClass = 0;
    let total = 0;
    let branches = 0;

    for (const row of pdf.rows) {
      const name = squeeze(row.name);
      if (!name) fail("施設名が空の行があります");
      if (seen.has(name)) fail(`施設名が重複しています: ${name}`);
      seen.add(name);

      const ward = squeeze(row.area);
      if (!ward) fail(`${name}: 地域が分かりません`);
      if (!wards.includes(ward)) wards.push(ward);

      const rawKind = squeeze(row.kind);
      if (rawKind) {
        const label = kindLabels.get(rawKind);
        if (!label) fail(`${name}: 凡例にない施設の種類です: 「${rawKind}」`);
        kind = label;
      } else {
        // 分園は種類が空。1つ上の行（本園）と同じ
        branches += 1;
      }
      if (!kind) fail(`${name}: 施設の種類が分かりません`);
      if (!categories.includes(kind)) categories.push(kind);

      const no = squeeze(row.no);
      if (no) {
        const n = Number(toHalfWidth(no));
        if (!Number.isInteger(n)) fail(`${name}: 通し番号を読めません: 「${no}」`);
        numbers.push(n);
      }

      const vacancy: (number | null)[] = [];
      for (let age = 0; age < AGE_COUNT; age++) {
        const raw = squeeze(row.values[age] ?? "");
        if (raw === "") {
          noClass += 1;
          vacancy.push(null);
          continue;
        }
        const n = Number(toHalfWidth(raw));
        if (!Number.isInteger(n) || n < 0) fail(`${name}: ${age}歳の欄を読めません: 「${raw}」`);
        total += n;
        vacancy.push(n);
      }
      if (vacancy.every((v) => v === null)) fail(`${name}: 全てのクラスが空です`);

      facilities.push({
        id: no ? `${no}` : name,
        name,
        w: wards.indexOf(ward),
        c: categories.indexOf(kind),
        vacancy,
      });
    }

    if (facilities.length < 40) fail(`施設が${facilities.length}件しか取れていません`);
    const sorted = [...numbers].sort((a, b) => a - b);
    for (let i = 0; i < sorted.length; i++) {
      if (sorted[i] !== i + 1) fail(`通し番号が連番になっていません（${i + 1}が見つかりません）`);
    }
    if (total !== pdf.wordSum) {
      fail(`受入可能数の合計が合いません（PDFの印字 ${pdf.wordSum} / 取り込み ${total}）`);
    }
    console.log(`通し番号は1〜${sorted.length}の連番、合計${total}人はPDFの印字と一致しました`);

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
      subtitle: `${pdf.target}月入所審査での受入可能数`,
      notes: [
        `${pdf.target}月入所審査に向けて公表された受入可能数です。前月の審査後の受入可能数に、申込取下や内定辞退などを反映した人数になっています。`,
        "公開日以降、園の職員体制などにより受入可能数が変わることがあります。0人と表示があっても利用調整が行われる場合や、1人と表示があっても行われない場合があります。",
        "年齢はその年度の4月1日時点のものです。設けていないクラスは「—」にしています。",
        "見学が必須の園があります。詳しくは公式ページをご覧ください。",
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

    console.log(`書き出しました: ${path.relative(process.cwd(), OUT_PATH)}`);
    console.log(`  ${facilities.length}施設（うち分園 ${branches}）/ ${wards.length}地域 / ${categories.length}種類`);
    console.log(`  受入可能数の合計: ${total}人`);
    console.log(`  設けていないクラス: ${noClass}`);
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

main().catch((err) => fail(String(err)));
