/**
 * 盛岡市の入所選考分空き状況を取り込む
 *
 * 実行: npm run vacancy:fetch:morioka
 *
 * ## この自治体の特徴
 * - 毎月、翌月の入所選考ぶんの空き状況をPDFで出す（今の空きではなく選考の対象枠）
 * - 空きは記号（○ 3人以上／△ 1〜2人／× 空きなし）
 * - **条件のついた受入枠には「＊」が付く**（アレルギー対応が必要な児童以外なら可、など）
 * - **入所率が既に110％以上の施設**は、市外に住所がある人を原則受け入れない
 * - 認定こども園の教育時間（1号認定）は施設へ直接申込みで、この表の対象外
 * - 事業所内保育施設の欄は、地域の子どもを受け入れる枠（地域枠）の人数
 * - 表の地域の欄は縦書きが複数列に折り返されていて読み順が崩れるため使わない。
 *   代わりに施設類型（公立・私立・幼保連携・小規模Aなど）で分けている
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "morioka";
const MUNICIPALITY_NAME = "盛岡市";
const PREFECTURE = "岩手県";
const SOURCE_NAME = "盛岡市「入所選考分空き状況」";
const INDEX_URL = "https://www.city.morioka.iwate.jp/kosodate/kodomo_azukeru/1040441.html";
const AGE_COUNT = 6;
const MIN_FACILITIES = 90;
const UA = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);

const LEGEND = [
  { mark: "○", label: "3人以上の空き", open: true },
  { mark: "△", label: "1〜2人の空き", open: true },
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

function stripTags(html: string): string {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/[\s　]+/g, "");
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

type PdfRow = {
  kind: string;
  overCapacity: boolean;
  name: string;
  address: string;
  marks: (string | null)[];
  conditional: boolean[];
};

async function main(): Promise<void> {
  console.log(`${MUNICIPALITY_NAME}の空き状況を取り込みます`);
  console.log(`公式ページ: ${INDEX_URL}\n`);

  const res = await fetch(INDEX_URL, { headers: { "User-Agent": UA }, redirect: "follow" });
  if (!res.ok) fail(`公式ページが ${res.status} を返しました`);
  const html = await res.text();

  // 「空き状況（令和8年10月入所分）（PDF 1.6MB）」のリンク。年月が新しいものを取る
  const links = [...html.matchAll(/<a[^>]+href="([^"]+\.pdf)"[^>]*>([\s\S]{0,200}?)<\/a>/gi)]
    .map((m) => ({ url: new URL(m[1], INDEX_URL).toString(), text: stripTags(m[2]) }))
    .map((l) => {
      if (!l.text.includes("空き状況")) return null;
      const m = l.text.match(/令和(\d+)年(\d{1,2})月入所分/);
      if (!m) return null;
      const ry = Number(m[1]);
      const mm = Number(m[2]);
      return { ...l, ry, mm, sortKey: (ry + 2018) * 100 + mm };
    })
    .filter((v): v is NonNullable<typeof v> => v !== null);
  if (links.length === 0) {
    fail(
      "「空き状況（令和N年M月入所分）」のPDFが見つかりません。ページの構成が変わった可能性があります。",
    );
  }
  const latest = links.reduce((a, b) => (b.sortKey > a.sortKey ? b : a));
  console.log(`PDF: ${latest.text}`);

  const pdfRes = await fetch(latest.url, { headers: { "User-Agent": UA } });
  if (!pdfRes.ok) fail(`PDFが ${pdfRes.status} を返しました`);
  const tmp = path.join(os.tmpdir(), `morioka-${process.pid}.pdf`);
  fs.writeFileSync(tmp, Buffer.from(await pdfRes.arrayBuffer()));

  let parsed: { asOf: number[]; target: number[]; rows: PdfRow[] };
  try {
    parsed = JSON.parse(
      runPython([path.join("scripts", "morioka-pdf-extract.py"), tmp]),
    ) as typeof parsed;
  } finally {
    fs.rmSync(tmp, { force: true });
  }

  const [ry, rm, rd] = parsed.asOf;
  const asOf = `${ry + 2018}-${String(rm).padStart(2, "0")}-${String(rd).padStart(2, "0")}`;
  if (asOf > todayJst()) fail(`時点（${asOf}）が今日より先になっています`);
  // PDFの中の「令和N年M月入所選考分」が、リンクの文字と同じか
  if (parsed.target[0] !== latest.ry || parsed.target[1] !== latest.mm) {
    fail(
      `PDFの中の対象月（令和${parsed.target[0]}年${parsed.target[1]}月）が、` +
        `リンクの文字（令和${latest.ry}年${latest.mm}月）と違います`,
    );
  }
  console.log(`時点: ${asOf} ／ 対象: 令和${latest.ry}年${latest.mm}月入所選考分`);

  const known = new Set(LEGEND.map((l) => l.mark));
  const categories: string[] = [];
  const facilities: {
    id: string;
    name: string;
    w: null;
    c: number;
    vacancy: (number | null)[];
    symbols: (string | null)[];
    note?: string;
  }[] = [];
  const seen = new Set<string>();
  const counts = new Map<string, number>();
  let conditionalCount = 0;
  let overCount = 0;

  for (const row of parsed.rows) {
    if (seen.has(row.name)) fail(`施設名が重複しています: ${row.name}`);
    seen.add(row.name);
    if (row.marks.length !== AGE_COUNT) fail(`${row.name}: 記号が${row.marks.length}個です`);
    if (row.conditional.length !== AGE_COUNT) fail(`${row.name}: ＊の数が合いません`);
    for (const mark of row.marks) {
      if (mark === null) continue;
      if (!known.has(mark)) fail(`${row.name}: 凡例にない記号です（「${mark}」）`);
      counts.set(mark, (counts.get(mark) ?? 0) + 1);
    }
    if (!row.kind) fail(`${row.name}: 施設類型が空です`);
    if (!categories.includes(row.kind)) categories.push(row.kind);

    const notes: string[] = [];
    const ages = row.conditional
      .map((c, i) => (c ? `${i}歳` : null))
      .filter((v): v is string => v !== null);
    if (ages.length) {
      conditionalCount += ages.length;
      notes.push(`${ages.join("・")}の枠には条件が付いています（市の表で「＊」）`);
    }
    if (row.overCapacity) {
      overCount += 1;
      notes.push("入所率が既に110％以上のため、市外に住所がある方の受入は原則できません");
    }

    facilities.push({
      id: row.name,
      name: row.name,
      w: null,
      c: categories.indexOf(row.kind),
      vacancy: new Array(AGE_COUNT).fill(null),
      symbols: row.marks,
      ...(notes.length ? { note: notes.join("。") } : {}),
    });
  }

  if (facilities.length < MIN_FACILITIES) {
    fail(`施設が${facilities.length}件しか取れていません（${MIN_FACILITIES}件以上のはず）`);
  }
  console.log(
    `${facilities.length}施設 ／ ${[...counts].map(([m, n]) => `${m}${n}`).join("・")} ／ ` +
      `類型 ${categories.length} ／ 条件付き ${conditionalCount}欄 ／ 110％以上 ${overCount}施設`,
  );

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
    JSON.stringify(previous?.sourceFiles ?? {}) === JSON.stringify({ vacancy: latest.url })
  ) {
    console.log(`公式データの時点が前回と同じ（${asOf}）のため更新はありません。`);
    return;
  }

  const notes = [
    `盛岡市は空きを人数ではなく記号で公表しています。${asOf}時点のものです。`,
    `公式の凡例は ${LEGEND.map((l) => `「${l.mark}」${l.label}`).join("、")} です。`,
    `この表は令和${latest.ry}年${latest.mm}月入所の選考にかかる空き枠で、今この時点の空きではありません。`,
    "市は「現時点で入所枠がない保育施設でも、在園児の退所や保育士の確保等により、追加で児童の受入が可能になる場合があります」としています。",
    "条件のついた受入枠がある施設は、市の表で「＊」が付きます。当サイトでは施設ごとの注記に書いています。",
    "入所率が既に110％以上の施設は、市外に住所がある方の受入が原則できません。該当する施設には注記を付けています。",
    "認定こども園（幼保連携・幼稚園型）の教育時間（1号認定）での利用は施設へ直接申込みとなり、この表の対象外です。",
    "事業所内保育施設の欄は、地域の子どもを受け入れる枠（地域枠）の人数です。",
    "設けていないクラスは「—」にしています。",
  ];

  const dataset = {
    municipalitySlug: MUNICIPALITY_SLUG,
    municipalityName: MUNICIPALITY_NAME,
    prefecture: PREFECTURE,
    asOf,
    fetchedAt: todayJst(),
    sourceName: SOURCE_NAME,
    sourceUrl: INDEX_URL,
    sourceFiles: { vacancy: latest.url },
    metrics: ["symbol"],
    subtitle: `令和${latest.ry}年${latest.mm}月入所選考分の空き状況`,
    notes,
    wards: [] as string[],
    categories,
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
