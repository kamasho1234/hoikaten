/**
 * 佐々町の幼稚園・保育所等空き状況を取り込む
 *
 * 実行: npm run vacancy:fetch:saza
 *
 * ## この自治体の特徴
 * - 公式ページからPDFを1本たどる。4施設と少ないが、記号は年齢別に出ている
 * - 記号は ○＝3人以上空き／△＝1〜2人空き／×＝空きなし
 * - **佐々青い実幼児園だけ、認定区分（教育認定・保育認定）で行が上下に分かれる。**
 *   0歳児と1歳児は保育認定の行にしかなく、2歳児〜5歳児は上下にまたがった
 *   1つの欄に記号が1つ入る。当サイトは保育利用を載せるので、この2行をつなぐ
 * - 表の下に「＜参考：認定、年齢区分＞」の別表があり、そこの ○△× は
 *   空き状況ではないので抽出側で切り落としている
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "saza";
const MUNICIPALITY_NAME = "佐々町";
const PREFECTURE = "長崎県";
const SOURCE_NAME = "佐々町「佐々町幼稚園・保育所等空き状況一覧表」";
const INDEX_URL = "https://www.sazacho-nagasaki.jp/kiji0035832/index.html";
const AGE_COUNT = 6;
const MIN_FACILITIES = 4;
const UA = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);

const LEGEND = [
  { mark: "○", label: "3人以上空き", open: true },
  { mark: "△", label: "1〜2人空き", open: true },
  { mark: "×", label: "空きなし", open: false },
];

function fail(message: string): never {
  console.error(`\n[中断] ${message}`);
  process.exit(1);
}

function todayJst(): string {
  const jst = new Date(Date.now() + 9 * 60 * 60 * 1000);
  return jst.toISOString().slice(0, 10);
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
  target: number[] | null;
  names: string[];
  namesTop: number[];
  rows: { top: number; marks: (string | null)[] }[];
};

async function main(): Promise<void> {
  console.log(`${MUNICIPALITY_NAME}の空き状況を取り込みます`);
  console.log(`公式ページ: ${INDEX_URL}\n`);

  const res = await fetch(INDEX_URL, { headers: { "User-Agent": UA }, redirect: "follow" });
  if (!res.ok) fail(`公式ページが ${res.status} を返しました`);
  const html = await res.text();

  const links = [...html.matchAll(/href="([^"]+\.pdf)"/gi)].map((m) =>
    new URL(m[1], INDEX_URL).toString(),
  );
  if (links.length !== 1) {
    fail(`ページのPDFが${links.length}本あります（1本のはず）: ${links.join(" ")}`);
  }
  const pdfUrl = links[0];
  console.log(`PDF: ${pdfUrl}`);

  const pdfRes = await fetch(pdfUrl, { headers: { "User-Agent": UA } });
  if (!pdfRes.ok) fail(`PDFが ${pdfRes.status} を返しました`);
  const buf = Buffer.from(await pdfRes.arrayBuffer());
  const tmp = path.join(os.tmpdir(), `saza-${process.pid}.pdf`);
  fs.writeFileSync(tmp, buf);

  let parsed: PdfResult;
  try {
    parsed = JSON.parse(runPython([path.join("scripts", "saza-pdf-extract.py"), tmp])) as PdfResult;
  } finally {
    fs.rmSync(tmp, { force: true });
  }

  const [ry, rm, rd] = parsed.asOf;
  const asOf = `${ry + 2018}-${String(rm).padStart(2, "0")}-${String(rd).padStart(2, "0")}`;
  if (asOf > todayJst()) fail(`時点（${asOf}）が今日より先になっています`);
  const targetLabel = parsed.target ? `${parsed.target[0] + 2018}年${parsed.target[1]}月` : null;

  const names = parsed.names;
  if (names.length < MIN_FACILITIES) {
    fail(`施設名が${names.length}件しか取れていません（${MIN_FACILITIES}件以上のはず）`);
  }
  if (new Set(names).size !== names.length) fail(`施設名が重複しています: ${names.join("・")}`);
  if (parsed.namesTop.length !== names.length) fail("施設名と位置の数が合いません");

  // 記号の行を、いちばん近い施設名の行に配る。
  // 佐々青い実幼児園だけは上下2行になるので、1施設に2行来る
  const symbolsOf = new Map<string, (string | null)[]>();
  for (const name of names) symbolsOf.set(name, new Array(AGE_COUNT).fill(null));
  for (const row of parsed.rows) {
    let best = 0;
    for (let i = 1; i < names.length; i++) {
      if (Math.abs(parsed.namesTop[i] - row.top) < Math.abs(parsed.namesTop[best] - row.top)) {
        best = i;
      }
    }
    const name = names[best];
    const current = symbolsOf.get(name)!;
    for (let age = 0; age < AGE_COUNT; age++) {
      const mark = row.marks[age];
      if (mark === null) continue;
      if (current[age] !== null) {
        fail(`${name}: ${age}歳児の欄に記号が2つあります（「${current[age]}」と「${mark}」）`);
      }
      current[age] = mark;
    }
  }

  const known = new Set(LEGEND.map((l) => l.mark));
  const facilities: {
    id: string;
    name: string;
    w: null;
    vacancy: (number | null)[];
    symbols: (string | null)[];
  }[] = [];
  const counts = new Map<string, number>();
  for (const name of names) {
    const symbols = symbolsOf.get(name)!;
    if (symbols.some((m) => m === null)) {
      fail(`${name}: 記号がそろっていません（${symbols.map((m) => m ?? "空").join("・")}）`);
    }
    for (const mark of symbols) {
      if (!known.has(mark!)) fail(`${name}: 凡例にない記号です（「${mark}」）`);
      counts.set(mark!, (counts.get(mark!) ?? 0) + 1);
    }
    facilities.push({
      id: name,
      name,
      w: null,
      vacancy: new Array(AGE_COUNT).fill(null),
      symbols,
    });
  }

  const total = [...counts.values()].reduce((a, b) => a + b, 0);
  if (total !== facilities.length * AGE_COUNT) {
    fail(`記号の数が合いません（${total} / 施設${facilities.length}×${AGE_COUNT}）`);
  }
  console.log(`${facilities.length}施設 ／ ${[...counts].map(([m, n]) => `${m}${n}`).join("・")}`);

  const previous = fs.existsSync(OUT_PATH)
    ? (JSON.parse(fs.readFileSync(OUT_PATH, "utf-8")) as { asOf?: string; facilities?: unknown[] })
    : null;
  if (previous?.facilities && facilities.length < previous.facilities.length) {
    fail(
      `施設数が減っています（前回 ${previous.facilities.length}件 → 今回 ${facilities.length}件）`,
    );
  }
  if (previous?.asOf === asOf) {
    console.log(`公式データの時点が前回と同じ（${asOf}）のため更新はありません。`);
    return;
  }

  const notes = [
    `佐々町は空きを人数ではなく記号で公表しています。${asOf}時点のものです。`,
    `公式の凡例は ${LEGEND.map((l) => `「${l.mark}」${l.label}`).join("、")} です。`,
    "佐々青い実幼児園は教育認定と保育認定で欄が分かれています。当サイトでは保育利用にあたる保育認定の欄を載せています。",
    "町は「空きがある場合でも、入所を保証するものではありませんので、参考としてください」「保育士等の配置状況や、急な入所・退所等により、空き状況が変動する場合があります」としています。",
    "町は「申込を行う際は、園にお問い合わせをしていただき、申込時点での空き状況の確認をお願いします」としています。",
    "年齢は令和8年4月1日時点のクラス年齢です。",
  ];

  const dataset = {
    municipalitySlug: MUNICIPALITY_SLUG,
    municipalityName: MUNICIPALITY_NAME,
    prefecture: PREFECTURE,
    asOf,
    fetchedAt: todayJst(),
    sourceName: SOURCE_NAME,
    sourceUrl: INDEX_URL,
    sourceFiles: { vacancy: pdfUrl },
    metrics: ["symbol"],
    ...(targetLabel ? { subtitle: `${targetLabel}入所申込に向けた空き状況` } : {}),
    notes,
    wards: [] as string[],
    categories: [] as string[],
    symbolLegend: LEGEND,
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
