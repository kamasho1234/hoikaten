/**
 * 下松市の保育所等入所状況を取り込む
 *
 * 実行: npm run vacancy:fetch:kudamatsu
 *
 * ## この自治体の特徴
 * - **空きの数そのものは公表されていない。**年齢ごとに「入所児童数」と
 *   「受入可能数」が並んでいるので、その差を空きとして出す
 * - 空きが無い欄は黄色く塗られている（凡例「■…空きなし」）。
 *   **差が0のときだけ黄色になっているかを確かめる**ので、読み違えれば止まる
 * - 「16(1)」の括弧は「うち市外児童」の内数。入所児童数から引かない
 * - 表の最後に「合計」「待機児童数」の行があるが、施設ではないので取り込まない
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "kudamatsu";
const MUNICIPALITY_NAME = "下松市";
const PREFECTURE = "山口県";
const SOURCE_NAME = "下松市「市内保育所等入所状況」";
const INDEX_URL = "https://www.city.kudamatsu.lg.jp/kosodateshien/fukushi/jidou/hoiku.html";
const AGE_COUNT = 6;
const MIN_FACILITIES = 15;
const UA = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);

/** 施設ではない行 */
const NOT_A_FACILITY = /合計|待機児童数|保留児童数/;

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
    .replace(/&amp;/g, "&")
    .replace(/[\s　]+/g, "");
}

function toHalfWidth(s: string): string {
  return s.replace(/[０-９]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xfee0));
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
  name: string;
  enrolled: (number | null)[];
  capacity: (number | null)[];
  shaded: boolean[];
};

async function main(): Promise<void> {
  console.log(`${MUNICIPALITY_NAME}の入所状況を取り込みます`);
  console.log(`公式ページ: ${INDEX_URL}\n`);

  const res = await fetch(INDEX_URL, { headers: { "User-Agent": UA }, redirect: "follow" });
  if (!res.ok) fail(`公式ページが ${res.status} を返しました`);
  const html = await res.text();

  // 「【令和8年度】入所状況表（9月1日時点）（PDF：325KB）」
  const links = [...html.matchAll(/<a[^>]+href="([^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => ({ url: new URL(m[1], INDEX_URL).toString(), text: toHalfWidth(stripTags(m[2])) }))
    .map((l) => {
      const m = l.text.match(/入所状況表[（(](\d{1,2})月(\d{1,2})日時点/);
      return m ? { ...l, month: Number(m[1]), day: Number(m[2]) } : null;
    })
    .filter((v): v is NonNullable<typeof v> => v !== null);
  if (links.length === 0) {
    fail("入所状況表のPDFが見つかりません。ページの構成が変わった可能性があります。");
  }
  // 年度の途中で月が戻る（3月→4月）ので、4月始まりで数えていちばん新しいものを選ぶ
  const latest = links.reduce((a, b) => {
    const key = (l: typeof a) => (l.month >= 4 ? l.month : l.month + 12) * 100 + l.day;
    return key(b) > key(a) ? b : a;
  });
  console.log(`PDF: ${latest.text}\n  ${latest.url}`);

  const pdfRes = await fetch(latest.url, { headers: { "User-Agent": UA } });
  if (!pdfRes.ok) fail(`PDFが ${pdfRes.status} を返しました`);
  const tmp = path.join(os.tmpdir(), `kudamatsu-${process.pid}.pdf`);
  fs.writeFileSync(tmp, Buffer.from(await pdfRes.arrayBuffer()));

  let parsed: { asOf: number[]; rows: PdfRow[] };
  try {
    parsed = JSON.parse(
      runPython([path.join("scripts", "kudamatsu-pdf-extract.py"), tmp]),
    ) as typeof parsed;
  } finally {
    fs.rmSync(tmp, { force: true });
  }

  const [ry, rm, rd] = parsed.asOf;
  const asOf = `${ry + 2018}-${String(rm).padStart(2, "0")}-${String(rd).padStart(2, "0")}`;
  if (asOf > todayJst()) fail(`時点（${asOf}）が今日より先になっています`);
  if (rm !== latest.month || rd !== latest.day) {
    fail(
      `PDFの中の日付（${rm}月${rd}日）が、リンクの文字（${latest.month}月${latest.day}日）と違います`,
    );
  }

  const facilities: {
    id: string;
    name: string;
    w: null;
    vacancy: (number | null)[];
    enrolled: (number | null)[];
  }[] = [];
  const seen = new Set<string>();
  let vacancyTotal = 0;
  let enrolledTotal = 0;
  let noClass = 0;

  for (const row of parsed.rows) {
    if (NOT_A_FACILITY.test(row.name)) continue;
    if (seen.has(row.name)) fail(`施設名が重複しています: ${row.name}`);
    seen.add(row.name);

    const vacancy: (number | null)[] = [];
    for (let age = 0; age < AGE_COUNT; age++) {
      const e = row.enrolled[age];
      const c = row.capacity[age];
      if (e === null && c === null) {
        // そのクラスを設けていない
        vacancy.push(null);
        noClass += 1;
        continue;
      }
      if (e === null || c === null) {
        fail(`${row.name}: ${age}歳の欄が片方だけです（入所${e} / 受入可能${c}）`);
      }
      const open = c - e;
      if (open < 0) {
        fail(`${row.name}: ${age}歳の受入可能数（${c}）が入所児童数（${e}）を下回っています`);
      }
      // 空きなしの欄は黄色く塗られている。ここが食い違うなら読み違えている
      if ((open === 0) !== row.shaded[age]) {
        fail(
          `${row.name}: ${age}歳の空きは${open}人なのに、公式の塗り（空きなし）は` +
            `${row.shaded[age] ? "あり" : "なし"}です`,
        );
      }
      vacancy.push(open);
      vacancyTotal += open;
      enrolledTotal += e;
    }
    facilities.push({
      id: row.name,
      name: row.name,
      w: null,
      vacancy,
      enrolled: row.enrolled,
    });
  }

  if (facilities.length < MIN_FACILITIES) {
    fail(`施設が${facilities.length}件しか取れていません（${MIN_FACILITIES}件以上のはず）`);
  }
  console.log(
    `${facilities.length}施設 ／ 空き${vacancyTotal}人・在籍${enrolledTotal}人・クラスなし${noClass}`,
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
    JSON.stringify(previous?.sourceFiles ?? {}) === JSON.stringify({ vacancy: latest.url }) &&
    JSON.stringify(previous?.facilities ?? null) === JSON.stringify(facilities)
  ) {
    console.log(`公式データの時点が前回と同じ（${asOf}）のため更新はありません。`);
    return;
  }

  const notes = [
    `下松市は空きの数を直接は公表していません。市が出している「受入可能数」から「入所児童数」を引いた数を空きとして載せています（${asOf}時点）。`,
    "市の表で空きが無い欄は黄色く塗られています。当サイトでは、その塗りと計算した空きが食い違わないことを確かめたうえで載せています。",
    "入所児童数の括弧内は「うち市外児童」の内数です。当サイトでは括弧の外の数を在籍数として載せています。",
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
    metrics: ["vacancy", "enrolled"],
    subtitle: "受入可能数と入所児童数の差",
    notes,
    wards: [] as string[],
    categories: [] as string[],
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
