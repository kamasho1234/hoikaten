/**
 * 西宮市の認可保育施設の欠員状況を取り込む
 *
 * 実行: npm run vacancy:fetch:nishinomiya
 *
 * ## この自治体の特徴
 * - **空きは記号**（×＝0人、△＝1〜2人、〇＝3〜5人、◎＝6人以上、＼＝受入れなし）
 * - 「＼」は斜線の図形で描かれていて文字にならないので、空欄として読み取れる。
 *   受入れなしのクラスなので「—」として持つ
 * - 類型は「保」「認（幼保）」のような略記。凡例に正式な言い方があるので、そちらで持つ
 * - 地区と公私立は縦結合。空なら1つ上の行から引き継ぐ
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "nishinomiya";
const MUNICIPALITY_NAME = "西宮市";
const SOURCE_NAME = "西宮市「認可保育施設の空き状況」";
const INDEX_URL =
  "https://www.nishi.or.jp/kosodate/hoikujo/hoikujo/riyotetsuzuki/hoikusyotonoakijokyo.html";
const AGE_COUNT = 6;
const UA = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";

const COL_WARD = 0;
const COL_PUBLIC = 1;
const COL_KIND = 2;
const COL_NAME = 3;
const COL_ZERO = 5;

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const EXTRACTOR = path.join(process.cwd(), "scripts", "nishinomiya-pdf-extract.py");

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

/** 類型の略記は、凡例が全角の括弧・表が半角の括弧とばらつくのでそろえる */
function normalizeKind(s: string): string {
  return squeeze(s).replace(/[（(]/g, "(").replace(/[）)]/g, ")");
}

function stripTags(html: string): string {
  return html.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").replace(/[\s　]+/g, " ").trim();
}

type PdfResult = {
  asOf: [number, number, number];
  marks: Record<string, string>;
  kinds: Record<string, string>;
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
  console.log(`${MUNICIPALITY_NAME}の欠員状況を取り込みます`);
  console.log(`公式ページ: ${INDEX_URL}\n`);

  const res = await fetch(INDEX_URL, { headers: { "User-Agent": UA } });
  if (!res.ok) fail(`公式ページが ${res.status} を返しました`);
  const html = await res.text();

  // 「欠員状況一覧（令和8年9月1日利用調整後）（PDF：958KB）」
  const links = [...html.matchAll(/<a[^>]+href="([^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => ({ url: new URL(m[1], INDEX_URL).toString(), text: toHalfWidth(stripTags(m[2])) }))
    .map((l) => {
      const m = l.text.match(/^欠員状況一覧（令和(\d+)年(\d+)月(\d+)日利用調整後）/);
      if (!m) return null;
      const year = reiwaToYear(Number(m[1]));
      const month = Number(m[2]);
      const day = Number(m[3]);
      return { ...l, year, month, day, sortKey: year * 10000 + month * 100 + day };
    })
    .filter((v): v is NonNullable<typeof v> => v !== null);
  if (links.length === 0) fail("欠員状況一覧のPDFが見つかりません。ページの構成が変わった可能性があります。");
  const latest = links.reduce((a, b) => (b.sortKey > a.sortKey ? b : a));
  console.log(`最新: ${latest.text}\n  ${latest.url}`);

  // 公表日はページの見出しにある（「認可保育施設の空き状況について（令和8年8月17日更新）」）
  const body = toHalfWidth(stripTags(html.replace(/<script[\s\S]*?<\/script>/gi, "")));
  const updated = body.match(/認可保育施設の空き状況について（令和(\d+)年(\d+)月(\d+)日更新）/);
  if (!updated) fail("更新日をページから読み取れませんでした");
  const asOf = `${reiwaToYear(Number(updated[1]))}-${updated[2].padStart(2, "0")}-${updated[3].padStart(2, "0")}`;

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "nishinomiya-vacancy-"));
  try {
    const r = await fetch(latest.url, { headers: { "User-Agent": UA } });
    if (!r.ok) fail(`PDFの取得に失敗しました（${r.status}）: ${latest.url}`);
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.subarray(0, 4).toString() !== "%PDF") fail(`PDFではありません: ${latest.url}`);
    const file = path.join(tmpDir, "nishinomiya.pdf");
    fs.writeFileSync(file, buf);

    let pdf: PdfResult;
    try {
      pdf = JSON.parse(runPython([EXTRACTOR, file])) as PdfResult;
    } catch (err) {
      fail(`抽出結果を読めません: ${String(err)}`);
    }

    const [ry, am, ad] = pdf.asOf;
    if (reiwaToYear(ry) !== latest.year || am !== latest.month || ad !== latest.day) {
      fail(
        `PDFの表題（令和${ry}年${am}月${ad}日）がリンクの文言（${latest.year}年${latest.month}月${latest.day}日）と違います`
      );
    }
    console.log(`公表日: ${asOf} / 対象: ${latest.year}年${latest.month}月${latest.day}日利用調整後`);

    // 凡例。空きの多い順に並べる。「＼（受入れなし）」は記号にせず「—」として扱う
    const order = ["◎", "〇", "○", "△", "×"];
    const symbolLegend = order
      .filter((mark) => pdf.marks[mark])
      .map((mark) => ({
        mark,
        label: pdf.marks[mark].replace(/[・、。]+$/, ""),
        open: mark !== "×",
      }));
    if (symbolLegend.length < 4) fail(`記号の凡例が足りません: ${JSON.stringify(pdf.marks)}`);
    console.log(`凡例: ${symbolLegend.map((l) => `${l.mark}＝${l.label}`).join(" / ")}`);
    const knownMarks = new Set(symbolLegend.map((l) => l.mark));

    const wards: string[] = [];
    const categories: string[] = [];
    const facilities: {
      id: string;
      name: string;
      w: number;
      c: number;
      vacancy: (number | null)[];
      symbols: (string | null)[];
    }[] = [];
    const marks = new Map<string, number>();
    const seen = new Set<string>();
    let ward = "";
    let noClass = 0;
    let restated = 0;

    for (const row of pdf.rows) {
      if (row.length < COL_ZERO + AGE_COUNT) continue;
      const name = (row[COL_NAME] ?? "").replace(/[\s　]+/g, "").trim();
      const kindCode = squeeze(row[COL_KIND]);
      if (!name) continue;
      // 送迎保育ステーションの枠は、既に出ている施設の「（再掲）」として並ぶ
      if (/^[（(]再掲[）)]/.test(name)) {
        restated += 1;
        continue;
      }
      if (!kindCode) fail(`${name}: 類型の欄が空です`);
      if (kindCode === "類型") {
        // ページごとに出てくる見出しの行。年齢の並びだけ確かめる
        for (let age = 0; age < AGE_COUNT; age++) {
          if (toHalfWidth(squeeze(row[COL_ZERO + age] ?? "")) !== `${age}歳`) {
            fail(`年齢の並びが変わりました: ${row.slice(COL_ZERO, COL_ZERO + AGE_COUNT).join(" ")}`);
          }
        }
        continue;
      }

      const rawWard = squeeze(row[COL_WARD]);
      if (rawWard) ward = rawWard;
      if (!ward) fail(`${name}: 地区が分かりません`);
      if (!wards.includes(ward)) wards.push(ward);

      const kindEntry = Object.entries(pdf.kinds).find(
        ([code]) => normalizeKind(code) === normalizeKind(kindCode)
      );
      if (!kindEntry) fail(`${name}: 凡例にない類型です: 「${kindCode}」`);
      const kind = kindEntry[1];
      if (!categories.includes(kind)) categories.push(kind);

      if (seen.has(name)) fail(`施設名が重複しています: ${name}`);
      seen.add(name);

      const symbols: (string | null)[] = [];
      for (let age = 0; age < AGE_COUNT; age++) {
        const raw = squeeze(row[COL_ZERO + age] ?? "");
        if (raw === "") {
          // 「＼」は斜線の図形なので空欄として読み取れる。受入れなしのクラス
          noClass += 1;
          symbols.push(null);
          continue;
        }
        if (!knownMarks.has(raw)) fail(`${name}: 凡例にない記号です: 「${raw}」`);
        marks.set(raw, (marks.get(raw) ?? 0) + 1);
        symbols.push(raw);
      }
      if (symbols.every((s) => s === null)) fail(`${name}: 全てのクラスが空です`);
      // 受入れのあるクラスは続いているはず。飛んでいたら読み違えを疑う
      const filled = symbols.flatMap((s, i) => (s ? [i] : []));
      if (filled[filled.length - 1] - filled[0] + 1 !== filled.length) {
        fail(`${name}: 受け入れのあるクラスが飛んでいます: ${symbols.map((s) => s ?? "＼").join(" ")}`);
      }

      facilities.push({
        id: `${ward}-${name}`,
        name,
        w: wards.indexOf(ward),
        c: categories.indexOf(kind),
        vacancy: new Array(AGE_COUNT).fill(null),
        symbols,
      });
    }

    if (facilities.length < 100) fail(`施設が${facilities.length}件しか取れていません`);
    for (const item of symbolLegend) {
      if (!marks.has(item.mark)) fail(`凡例にある「${item.mark}」が表に1つも出てきません`);
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
      metrics: ["symbol"],
      subtitle: `${latest.year}年${latest.month}月${latest.day}日利用調整後の欠員状況`,
      notes: [
        "西宮市は欠員を人数ではなく記号で公表しています。当サイトでも公式の記号のまま載せています。",
        "公式の表で「＼（受入れなし）」になっているクラスは「—」にしています。",
        "施設側の事情等により、公表時より欠員が変わることがあります。",
        "×であっても、内定辞退や在園児の退所等により欠員が生じる場合があります。希望する施設は利用希望施設に入れてください。",
        "地域型保育事業所と特区小規模保育事業所は、申込者数によっては対象年齢の枠を超えて入所できる場合があります。",
        "公式の表で「（再掲）」となっている送迎保育ステーションの枠は、同じ施設が二重に並ばないよう省いています。",
      ],
      wards,
      categories,
      symbolLegend,
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
    console.log(`  ${facilities.length}施設 / ${wards.length}地区 / ${categories.length}類型`);
    console.log(`  「＼（受入れなし）」だったクラス: ${noClass}`);
    if (restated > 0) console.log(`  「（再掲）」として省いた行: ${restated}件`);
    console.log("");
    console.log("  記号の出てきた数");
    for (const item of symbolLegend) {
      console.log(`  ${item.mark}（${item.label}） ${marks.get(item.mark) ?? 0}`);
    }
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

main().catch((err) => fail(String(err)));
