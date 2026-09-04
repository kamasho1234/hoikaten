/**
 * 長崎市の保育施設の空き状況を取り込む
 *
 * 実行: npm run vacancy:fetch:nagasaki
 *
 * ## この自治体の特徴
 * - **表に入っている記号は「×」だけ**。受け入れが難しい学齢に付く。
 *   それ以外の欄は空になるので、「×が付いていない」ことを表す印として持つ
 * - 小規模保育事業は0歳児から2歳児までの事業なので、3歳児以上はクラスなしにする
 * - 地区は縦結合。空なら1つ上の行から引き継ぐ
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "nagasaki";
const MUNICIPALITY_NAME = "長崎市";
const SOURCE_NAME = "長崎市「保育施設空き状況一覧」";
const INDEX_URL = "https://www.city.nagasaki.lg.jp/site/e-kao/6462.html";
const AGE_COUNT = 6;
const UA = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";

const CLOSED_MARK = "×";
const OPEN_MARK = "－";
const OPEN_LABEL = "受け入れが難しいという印は付いていません";

const COL_WARD = 0;
const COL_KIND = 1;
const COL_NAME = 2;
const COL_ZERO = 6;

/** 小規模保育事業は0歳児から2歳児まで。3歳児以上のクラスは持たない */
const SMALL_SCALE = "小規模保育事業";

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const EXTRACTOR = path.join(process.cwd(), "scripts", "nagasaki-pdf-extract.py");

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
  asOf: [number, number, number];
  note: string;
  markCount: number;
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

  // 「令和8年度 長崎市保育施設空き状況（8月20日） （PDFファイル／220KB）」
  const links = [...html.matchAll(/<a[^>]+href="([^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => ({ url: new URL(m[1], INDEX_URL).toString(), text: toHalfWidth(stripTags(m[2])) }))
    .map((l) => {
      const m = squeeze(l.text).match(/令和(\d+)年度長崎市保育施設空き状況（(\d+)月(\d+)日）/);
      if (!m) return null;
      return { ...l, reiwa: Number(m[1]), month: Number(m[2]), day: Number(m[3]) };
    })
    .filter((v): v is NonNullable<typeof v> => v !== null);
  if (links.length === 0) fail("空き状況のPDFが見つかりません。ページの構成が変わった可能性があります。");
  const latest = links[0];
  console.log(`最新: ${latest.text}\n  ${latest.url}`);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "nagasaki-vacancy-"));
  try {
    const r = await fetch(latest.url, { headers: { "User-Agent": UA } });
    if (!r.ok) fail(`PDFの取得に失敗しました（${r.status}）: ${latest.url}`);
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.subarray(0, 4).toString() !== "%PDF") fail(`PDFではありません: ${latest.url}`);
    const file = path.join(tmpDir, "nagasaki.pdf");
    fs.writeFileSync(file, buf);

    let pdf: PdfResult;
    try {
      pdf = JSON.parse(runPython([EXTRACTOR, file])) as PdfResult;
    } catch (err) {
      fail(`抽出結果を読めません: ${String(err)}`);
    }

    const [ar, am, ad] = pdf.asOf;
    if (am !== latest.month || ad !== latest.day) {
      fail(
        `PDFの表題（${am}月${ad}日）がリンクの文言（${latest.month}月${latest.day}日）と違います`
      );
    }
    const asOf = `${reiwaToYear(ar)}-${String(am).padStart(2, "0")}-${String(ad).padStart(2, "0")}`;
    console.log(`基準日: ${asOf}`);

    const symbolLegend = [
      { mark: OPEN_MARK, label: OPEN_LABEL, open: true },
      // 「現時点で受け入れが難しい学齢（クラス年齢）に「×」を表示しています」から前半だけ使う
      { mark: CLOSED_MARK, label: squeeze(pdf.note).split("学齢")[0], open: false },
    ];
    console.log(`凡例: ${symbolLegend.map((l) => `${l.mark}＝${l.label}`).join(" / ")}`);

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

    for (const row of pdf.rows) {
      const rawWard = squeeze(row[COL_WARD]);
      const kind = squeeze(row[COL_KIND]);
      const name = squeeze(row[COL_NAME]);
      if (rawWard === "地区" || kind === "施設類型" || !name || name === "保育施設名") continue;
      if (!kind) fail(`${name}: 施設類型が空です`);

      if (rawWard) ward = rawWard;
      if (!ward) fail(`${name}: 地区が分かりません`);
      if (!wards.includes(ward)) wards.push(ward);
      if (!categories.includes(kind)) categories.push(kind);

      const id = `${ward}-${name}`;
      if (seen.has(id)) fail(`施設が重複しています: ${id}`);
      seen.add(id);

      const symbols: (string | null)[] = [];
      for (let age = 0; age < AGE_COUNT; age++) {
        // 小規模保育事業は0歳児から2歳児までの事業なので、3歳児以上はクラスがない
        if (kind === SMALL_SCALE && age >= 3) {
          noClass += 1;
          symbols.push(null);
          continue;
        }
        const raw = squeeze(row[COL_ZERO + age] ?? "");
        if (raw === "") {
          marks.set(OPEN_MARK, (marks.get(OPEN_MARK) ?? 0) + 1);
          symbols.push(OPEN_MARK);
          continue;
        }
        if (!/^[×✕✖]$/.test(raw)) fail(`${ward} ${name}: 「×」以外の記号が入っています: 「${raw}」`);
        marks.set(CLOSED_MARK, (marks.get(CLOSED_MARK) ?? 0) + 1);
        symbols.push(CLOSED_MARK);
      }

      facilities.push({
        id,
        name,
        w: wards.indexOf(ward),
        c: categories.indexOf(kind),
        vacancy: new Array(AGE_COUNT).fill(null),
        symbols,
      });
    }

    if (facilities.length < 80) fail(`施設が${facilities.length}件しか取れていません`);
    // ×の数がPDFの文字と合っているか
    const got = marks.get(CLOSED_MARK) ?? 0;
    if (got !== pdf.markCount) {
      fail(`「×」の数が合いません（PDFの文字 ${pdf.markCount}個 / 取り込み ${got}個）`);
    }
    console.log("×の数はPDFの文字と一致しました");

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
      metrics: ["symbol"],
      subtitle: "保育施設の空き状況",
      notes: [
        "長崎市は、受け入れが難しいクラスに「×」を付ける形で公表しています。当サイトでは、×が付いていないクラスを「－」で表しています。",
        "×が付いていないクラスでも、園によってはそのクラスを設けていない場合があります。詳しくは各園にお問い合わせください。",
        "小規模保育事業は0歳児から2歳児までの事業のため、3歳児以上は「—」にしています。",
        "空きがある場合でも、入所を保証するものではありません。保育利用申込の際の目安としてご覧ください。",
        "認定こども園の空き状況は保育利用でのものです。教育利用の空き状況は各園にお尋ねください。",
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
    console.log(`  クラスなしにした欄: ${noClass}`);
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
