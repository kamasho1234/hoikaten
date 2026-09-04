/**
 * 豊田市のこども園等の空き状況を取り込む
 *
 * 実行: npm run vacancy:fetch:toyota
 *
 * ## この自治体の特徴
 * - **年齢が「0〜2歳児／3歳児／4歳児／5歳児」の4区分**で、0〜2歳がまとまっている。
 *   当サイトは0歳〜5歳の6つに分けて見せるので、0・1・2歳には同じ記号を置き、
 *   まとめて公表されていることを注記と施設の備考で伝える
 * - 「▲」だけは「1、2歳児空席有」と年齢が絞られているので、
 *   0歳は空席なし（×）、1・2歳は▲として置く
 * - 「未実施」（そのクラスを設けていない）は「—」にする
 * - 「直接園にお尋ねください」「令和8年度は休園」は記号ではないので、
 *   公式の言葉のまま記号として出し、凡例に意味を書く
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "toyota";
const MUNICIPALITY_NAME = "豊田市";
const PREFECTURE = "愛知県";
const SOURCE_NAME = "豊田市「こども園等 空き状況・申込状況一覧表」";
const INDEX_URL =
  "https://www.city.toyota.aichi.jp/kosodategakko/kosodate/hoiku/1016125/1016130.html";
const AGE_COUNT = 6;
const MIN_FACILITIES = 80;
const UA = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);

/** そのクラスを設けていないことを表す言葉 */
const NO_CLASS = "未実施";
/** 「1、2歳児空席有」を表す記号。0歳児には掛からない */
const ONE_TWO_ONLY = "▲";

function fail(message: string): never {
  console.error(`\n[中断] ${message}`);
  process.exit(1);
}

function todayJst(): string {
  const jst = new Date(Date.now() + 9 * 60 * 60 * 1000);
  return jst.toISOString().slice(0, 10);
}

function stripTags(html: string): string {
  return html.replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/[\s　]+/g, "");
}

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

type PdfResult = {
  asOf: number[];
  target: number[];
  legend: { mark: string; label: string }[];
  rows: { name: string; values: string[] }[];
};

async function main(): Promise<void> {
  console.log(`${MUNICIPALITY_NAME}の空き状況を取り込みます`);
  console.log(`公式ページ: ${INDEX_URL}\n`);

  const res = await fetch(INDEX_URL, { headers: { "User-Agent": UA }, redirect: "follow" });
  if (!res.ok) fail(`公式ページが ${res.status} を返しました`);
  const html = await res.text();

  const links = [...html.matchAll(/<a[^>]+href="([^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => ({ url: new URL(m[1], INDEX_URL).toString(), text: stripTags(m[2]) }))
    .filter((l) => l.text.includes("空き状況"));
  if (links.length !== 1) {
    fail(`空き状況のPDFが${links.length}本あります（1本のはず）: ${links.map((l) => l.text).join(" / ")}`);
  }
  console.log(`PDF: ${links[0].text}\n  ${links[0].url}`);

  const pdfRes = await fetch(links[0].url, { headers: { "User-Agent": UA } });
  if (!pdfRes.ok) fail(`PDFが ${pdfRes.status} を返しました`);
  const tmp = path.join(os.tmpdir(), `toyota-${process.pid}.pdf`);
  fs.writeFileSync(tmp, Buffer.from(await pdfRes.arrayBuffer()));

  let parsed: PdfResult;
  try {
    parsed = JSON.parse(
      runPython([path.join("scripts", "toyota-pdf-extract.py"), tmp]),
    ) as PdfResult;
  } finally {
    fs.rmSync(tmp, { force: true });
  }

  const [ry, rm, rd] = parsed.asOf;
  const asOf = `${ry + 2018}-${String(rm).padStart(2, "0")}-${String(rd).padStart(2, "0")}`;
  if (asOf > todayJst()) fail(`時点（${asOf}）が今日より先になっています`);
  const targetLabel = `${parsed.target[0] + 2018}年${parsed.target[1]}月`;
  console.log(`時点: ${asOf} ／ 対象: ${targetLabel}入園希望者用`);

  const facilities: {
    id: string;
    name: string;
    w: null;
    vacancy: (number | null)[];
    symbols: (string | null)[];
    note?: string;
  }[] = [];
  const seen = new Set<string>();
  const counts = new Map<string, number>();
  let merged = 0;

  for (const row of parsed.rows) {
    if (seen.has(row.name)) fail(`施設名が重複しています: ${row.name}`);
    seen.add(row.name);
    if (row.values.length !== 4) {
      fail(`${row.name}: 年齢の欄が${row.values.length}個です（4個のはず）`);
    }
    const [zeroToTwo, three, four, five] = row.values;
    if (!zeroToTwo) fail(`${row.name}: 0〜2歳児の欄が空です`);

    const put = (raw: string): string | null => {
      if (!raw || raw === NO_CLASS) return null;
      counts.set(raw, (counts.get(raw) ?? 0) + 1);
      return raw;
    };

    // 0〜2歳はまとめて公表されているので、3つの欄に同じ記号を置く。
    // 「▲」は1・2歳児だけなので、0歳は空席なしとして「×」を置く
    const zero = zeroToTwo === ONE_TWO_ONLY ? put("×") : put(zeroToTwo);
    const one = put(zeroToTwo);
    const two = put(zeroToTwo);
    const symbols = [zero, one, two, put(three), put(four), put(five)];
    if (zeroToTwo !== NO_CLASS) merged += 1;

    facilities.push({
      id: row.name,
      name: row.name,
      w: null,
      vacancy: new Array(AGE_COUNT).fill(null),
      symbols,
      ...(zeroToTwo !== NO_CLASS
        ? {
            note:
              zeroToTwo === ONE_TWO_ONLY
                ? "市は0〜2歳児をまとめて「▲（1、2歳児空席有）」と公表しています。0歳児は空席なしとして扱っています"
                : `市は0〜2歳児をまとめて「${zeroToTwo}」と公表しています。0歳・1歳・2歳のどのクラスに空きがあるかは資料からは分かりません`,
          }
        : {}),
    });
  }

  if (facilities.length < MIN_FACILITIES) {
    fail(`施設が${facilities.length}件しか取れていません（${MIN_FACILITIES}件以上のはず）`);
  }
  console.log(
    `${facilities.length}施設 ／ ${[...counts].map(([m, n]) => `${m}${n}`).join("・")}`,
  );

  // 凡例。公式の文言は「×…空席なし、△…１〜４席空席有 ▲…１、２歳児空席有、〇…５席以上空席有」
  const legend = [
    { mark: "〇", label: "5席以上空席有", open: true },
    { mark: "△", label: "1〜4席空席有", open: true },
    { mark: "▲", label: "1、2歳児空席有", open: true },
    { mark: "×", label: "空席なし", open: false },
  ].filter((l) => counts.has(l.mark));
  for (const mark of counts.keys()) {
    if (legend.some((l) => l.mark === mark)) continue;
    // 「直接園にお尋ねください」「令和8年度は休園」など、記号ではない書き方
    legend.push({ mark, label: "公式の表記のまま", open: false });
  }

  const previous = fs.existsSync(OUT_PATH)
    ? (JSON.parse(fs.readFileSync(OUT_PATH, "utf-8")) as { asOf?: string; facilities?: unknown[]; sourceFiles?: Record<string, string> })
    : null;
  if (previous?.facilities && facilities.length < previous.facilities.length * 0.9) {
    fail(
      `施設数が大きく減っています（前回 ${previous.facilities.length}件 → 今回 ${facilities.length}件）`,
    );
  }
  // 自治体は基準日を変えずに資料を差し替えることがある。
  // 取り込み元の一式も同じときだけ、書き換えを見送る
  if (
    previous?.asOf === asOf &&
    JSON.stringify(previous?.sourceFiles ?? {}) === JSON.stringify({ vacancy: links[0].url })
  ) {
    console.log(`公式データの時点が前回と同じ（${asOf}）のため更新はありません。`);
    return;
  }

  const notes = [
    `豊田市は空きを人数ではなく記号で公表しています。これは${targetLabel}入園希望者用で、${asOf}時点のものです。`,
    "**市は0歳児・1歳児・2歳児をまとめて1つの欄で公表しています。**当サイトでは0歳・1歳・2歳の3つの欄に同じ記号を置いています。どのクラスに空きがあるかは資料からは分かりません。",
    "「▲」は市の凡例で「1、2歳児空席有」とされているため、0歳児は空席なし（×）として扱っています。",
    "「未実施」（そのクラスを設けていない）は「—」にしています。",
    "市は「園における児童の状況や保育士の配置状況などにより、空き状況が変わることがあります」「空席がある場合においても、施設定員や園事情により入園できない場合もあります」としています。",
  ];

  const dataset = {
    municipalitySlug: MUNICIPALITY_SLUG,
    municipalityName: MUNICIPALITY_NAME,
    prefecture: PREFECTURE,
    asOf,
    fetchedAt: todayJst(),
    sourceName: SOURCE_NAME,
    sourceUrl: INDEX_URL,
    sourceFiles: { vacancy: links[0].url },
    metrics: ["symbol"],
    subtitle: `${targetLabel}入園希望者用の空き状況`,
    notes,
    wards: [] as string[],
    categories: [] as string[],
    symbolLegend: legend,
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
}

main().catch((err) => fail(String(err)));
