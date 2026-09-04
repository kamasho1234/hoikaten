/**
 * 平塚市の保育所等の受入状況を取り込む
 *
 * 実行: npm run vacancy:fetch:hiratsuka
 *
 * ## この自治体の特徴
 * - 人数ではなく「有」だけで、空欄は受入なし（本文にそう書かれている）。
 *   当サイトでは空欄を「－」という印に置き換えて持つ
 * - クラスを設けていない歳児も空欄なので、「—」とは区別できない。
 *   公式の言い方どおり「受入なし」として持ち、注記で断る
 * - 区分（公立・私立）と施設種別（保育所・認こ園・小規模）を組み合わせて種類にする
 * - 地区の欄は複数の地区がひとつにまとまっているので使わない
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "hiratsuka";
const MUNICIPALITY_NAME = "平塚市";
const SOURCE_NAME = "平塚市「受入状況表」";
const INDEX_URL = "https://www.city.hiratsuka.kanagawa.jp/kodomo/page82_00017.html";
const AGE_COUNT = 6;
const UA = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";

const COL_DIVISION = 0;
const COL_KIND = 1;
const COL_NAME = 3;
const COL_AGE0 = 4;

const YES_MARK = "有";
const YES_LABEL = "受入あり";
const NONE_MARK = "－";
const NONE_LABEL = "受入なし";

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const EXTRACTOR = path.join(process.cwd(), "scripts", "hiratsuka-pdf-extract.py");

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
  yesCount: number;
  tables: string[][][];
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
  console.log(`${MUNICIPALITY_NAME}の受入状況を取り込みます`);
  console.log(`公式ページ: ${INDEX_URL}\n`);

  const res = await fetch(INDEX_URL, { headers: { "User-Agent": UA } });
  if (!res.ok) fail(`公式ページが ${res.status} を返しました`);
  const html = await res.text();

  // 「<a …>受入状況表</a>（9月）（PDF 811KB)」のように、月はリンクの外に書かれている
  const links = [...html.matchAll(/<a[^>]+href="([^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>([^<]{0,20})/gi)]
    .map((m) => ({
      url: new URL(m[1], INDEX_URL).toString(),
      text: toHalfWidth(stripTags(m[2])),
      after: toHalfWidth(squeeze(m[3])),
    }))
    .map((l) => {
      if (!squeeze(l.text).includes("受入状況表")) return null;
      const m = l.after.match(/[（(](\d+)月[）)]/);
      return { ...l, month: m ? Number(m[1]) : null };
    })
    .filter((v): v is NonNullable<typeof v> => v !== null);
  if (links.length === 0) fail("受入状況表のPDFが見つかりません。ページの構成が変わった可能性があります。");
  if (links.length > 1) fail(`受入状況表のPDFが${links.length}件見つかりました。どれが最新か決められません。`);
  const latest = links[0];
  console.log(`最新: ${latest.text}\n  ${latest.url}`);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "hiratsuka-vacancy-"));
  try {
    const r = await fetch(latest.url, { headers: { "User-Agent": UA } });
    if (!r.ok) fail(`PDFの取得に失敗しました（${r.status}）: ${latest.url}`);
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.subarray(0, 4).toString() !== "%PDF") fail(`PDFではありません: ${latest.url}`);
    const file = path.join(tmpDir, "hiratsuka.pdf");
    fs.writeFileSync(file, buf);

    let pdf: PdfResult;
    try {
      pdf = JSON.parse(runPython([EXTRACTOR, file])) as PdfResult;
    } catch (err) {
      fail(`抽出結果を読めません: ${String(err)}`);
    }

    if (latest.month !== null && pdf.target !== latest.month) {
      fail(`PDFの表題（${pdf.target}月）がページの文言（${latest.month}月）と違います`);
    }
    const [ay, am, ad] = pdf.asOf;
    const asOf = `${2018 + ay}-${String(am).padStart(2, "0")}-${String(ad).padStart(2, "0")}`;
    if (asOf > todayJst()) fail(`掲載日（${asOf}）が今日より先になっています`);
    console.log(`掲載日: ${asOf} / 対象: ${pdf.target}月の受入状況`);

    const symbolLegend = [
      { mark: YES_MARK, label: YES_LABEL, open: true },
      { mark: NONE_MARK, label: NONE_LABEL, open: false },
    ];

    const categories: string[] = [];
    const facilities: {
      id: string;
      name: string;
      w: null;
      c: number;
      vacancy: (number | null)[];
      symbols: (string | null)[];
    }[] = [];
    const marks = new Map<string, number>();
    const seen = new Set<string>();

    for (const rows of pdf.tables) {
      // 区分と施設種別は縦結合。表をまたいで引き継がない
      let division = "";
      let kind = "";
      for (const row of rows) {
        const name = squeeze(row[COL_NAME]);
        if (!name) fail("園名が空の行があります");
        if (seen.has(name)) fail(`園名が重複しています: ${name}`);
        seen.add(name);

        const rawDivision = squeeze(row[COL_DIVISION]);
        if (rawDivision) division = rawDivision;
        const rawKind = squeeze(row[COL_KIND]);
        if (rawKind) kind = rawKind;
        if (!division || !kind) fail(`${name}: 区分や施設種別が分かりません`);
        const category = `${division}${kind}`;
        if (!categories.includes(category)) categories.push(category);

        const symbols: (string | null)[] = [];
        for (let age = 0; age < AGE_COUNT; age++) {
          const raw = squeeze(row[COL_AGE0 + age] ?? "");
          const mark = raw === "" ? NONE_MARK : raw === YES_MARK ? YES_MARK : null;
          if (!mark) fail(`${name}: ${age}歳の欄に見慣れない値があります: 「${raw}」`);
          marks.set(mark, (marks.get(mark) ?? 0) + 1);
          symbols.push(mark);
        }

        facilities.push({
          id: name,
          name,
          w: null,
          c: categories.indexOf(category),
          vacancy: new Array(AGE_COUNT).fill(null),
          symbols,
        });
      }
    }

    if (facilities.length < 40) fail(`施設が${facilities.length}件しか取れていません`);
    const yes = marks.get(YES_MARK) ?? 0;
    if (yes !== pdf.yesCount) {
      fail(`「${YES_MARK}」の数が合いません（PDFの文字 ${pdf.yesCount}個 / 取り込み ${yes}個）`);
    }
    console.log(`「${YES_MARK}」の数はPDFの文字と一致しました（${yes}個）`);

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
      subtitle: `${pdf.target}月の受入状況`,
      notes: [
        "平塚市は人数ではなく、受け入れがあるかどうかだけを公表しています。",
        `公式の表で空欄になっているところは「${NONE_LABEL}」という意味なので、当サイトでは「${NONE_MARK}」で表しています。クラスを設けていない歳児も同じ空欄なので、区別せずに載せています。`,
        "掲載日時点の情報です。各施設の状況により受入の有無が変わることがあります。",
        "年齢はその年度の4月1日時点のものです。",
      ],
      wards: [],
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
    console.log(`  ${facilities.length}施設 / ${categories.length}種類`);
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
