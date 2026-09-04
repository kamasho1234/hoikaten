/**
 * 香南市（高知県）の保育施設等の空き状況を取り込む
 *
 * 実行: npm run vacancy:fetch:kochi-konan
 *
 * ## この自治体の特徴
 * - 空きは人数。公立施設・私立認定こども園・小規模保育施設の3つの表に分かれる
 * - **年齢のセルが横に結合されている行がある**（「3歳～5歳で4」など）。
 *   結合されたぶんは年齢ごとに割れないので、その年齢は「—」にして備考に人数を書く。
 *   すべての年齢が結合されている施設は、合計（vacancyTotal）として持つ
 * - 「なし」はそのクラスを設けていないこと
 * - 愛知県の江南市（slug: konan）と読みが同じなので、slug は kochi-konan にしている
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "kochi-konan";
const MUNICIPALITY_NAME = "香南市";
const PREFECTURE = "高知県";
const SOURCE_NAME = "香南市「保育施設等の空き状況」";
const INDEX_URL =
  "https://www.city.kochi-konan.lg.jp/soshikikarasagasu/kyoikuiinkaikodomoka/ikuji_mishugakuji/2/1/1145.html";
const AGE_COUNT = 6;
const UA = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const EXTRACTOR = path.join(process.cwd(), "scripts", "konan-kochi-html-extract.py");

function fail(message: string): never {
  console.error(`\n[中断] ${message}`);
  process.exit(1);
}

function todayJst(): string {
  const jst = new Date(Date.now() + 9 * 60 * 60 * 1000);
  return jst.toISOString().slice(0, 10);
}

type PdfResult = {
  asOf: [number, number, number];
  rows: {
    name: string;
    category: string;
    address: string;
    acceptAge: string;
    values: (number | null)[];
    mergedNotes: string[];
  }[];
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
      fail(`ページの抽出に失敗しました（${bin}）: ${e.stderr || e.message}`);
    }
  }
  fail(`Pythonを実行できません（${lastError}）。python が必要です。`);
}

async function main() {
  console.log(`${MUNICIPALITY_NAME}の空き状況を取り込みます`);
  console.log(`公式ページ: ${INDEX_URL}\n`);

  const res = await fetch(INDEX_URL, { headers: { "User-Agent": UA } });
  if (!res.ok) fail(`公式ページが ${res.status} を返しました`);
  const html = await res.text();

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "kochi-konan-vacancy-"));
  try {
    const file = path.join(tmpDir, "page.html");
    fs.writeFileSync(file, html, "utf-8");

    let data: PdfResult;
    try {
      data = JSON.parse(runPython([EXTRACTOR, file])) as PdfResult;
    } catch (err) {
      fail(`抽出結果を読めません: ${String(err)}`);
    }

    const [reiwa, month, day] = data.asOf;
    const asOf = `${2018 + reiwa}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    if (asOf > todayJst()) fail(`基準日（${asOf}）が今日より先になっています`);
    console.log(`基準日: ${asOf}`);

    const categories: string[] = [];
    const facilities: {
      id: string;
      name: string;
      w: null;
      c: number;
      vacancy: (number | null)[];
      vacancyTotal?: number;
      note?: string;
    }[] = [];
    const seen = new Set<string>();
    let merged = 0;

    for (const row of data.rows) {
      if (seen.has(row.name)) fail(`施設名が重複しています: ${row.name}`);
      seen.add(row.name);
      if (!categories.includes(row.category)) categories.push(row.category);

      const notes: string[] = [];
      if (row.mergedNotes.length) {
        merged++;
        notes.push(
          `市は${row.mergedNotes.join("、")}とまとめて公表しています。年齢ごとには分けられないので、そのクラスは「—」にしています。`
        );
      }
      notes.push(`受入月齢は${row.acceptAge}です。`);

      const facility: (typeof facilities)[number] = {
        id: row.name,
        name: row.name,
        w: null,
        c: categories.indexOf(row.category),
        vacancy: row.values,
        note: notes.join(""),
      };

      // 年齢別の数が1つも無く、まとめた人数だけが出ている施設は合計として持つ
      if (row.values.every((v) => v === null) && row.mergedNotes.length) {
        let total = 0;
        for (const note of row.mergedNotes) {
          const m = note.match(/(\d+)人$/);
          if (!m) fail(`${row.name}: まとめた人数を読めません（${note}）`);
          total += Number(m[1]);
        }
        facility.vacancyTotal = total;
      }
      facilities.push(facility);
    }

    if (facilities.length < 10) fail(`施設が${facilities.length}件しか取れていません`);
    console.log(`施設 ${facilities.length}件 / 年齢をまとめて公表している施設 ${merged}件`);

    const previous = fs.existsSync(OUT_PATH)
      ? (JSON.parse(fs.readFileSync(OUT_PATH, "utf-8")) as {
          asOf?: string;
          facilities?: unknown[];
        })
      : null;
    if (previous?.facilities && facilities.length < previous.facilities.length * 0.9) {
      fail(
        `施設数が大きく減っています（前回 ${previous.facilities.length}件 → 今回 ${facilities.length}件）`
      );
    }
    if (
      previous?.asOf === asOf &&
      JSON.stringify(previous?.facilities ?? null) === JSON.stringify(facilities)
    ) {
      console.log(`公式データの時点が前回と同じ（${asOf}）のため更新はありません。`);
      return;
    }

    const dataset = {
      municipalitySlug: MUNICIPALITY_SLUG,
      municipalityName: MUNICIPALITY_NAME,
      prefecture: PREFECTURE,
      asOf,
      fetchedAt: todayJst(),
      sourceName: SOURCE_NAME,
      sourceUrl: INDEX_URL,
      sourceFiles: { vacancy: INDEX_URL },
      metrics: ["vacancy"],
      subtitle: "翌々月入所ぶんの施設ごとの空き状況",
      notes: [
        "市は「空き状況に変更がある場合は随時更新しますが、施設の状況や転園等により受入人数が変動することがあります」としています。",
        "市が年齢をまとめて公表している施設（「3歳～5歳で4」など）は、年齢ごとに分けられないため、そのクラスを「—」にして人数を施設ごとの備考に書いています。",
        "市の表で「なし」となっているクラスは「—」にしています。そのクラスを設けていないことを表します。",
        "公立幼稚園は3〜5歳児の受け入れをしています。空き状況は市にお問い合わせください。",
        "認定こども園の1号認定の空き状況は、各園に直接お問い合わせください。",
        "申込みの締切りは、希望する入所月の前々月の末日（末日が土曜日・日曜日・祝日の場合は直前の開庁日）までです。",
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

    const total = facilities.reduce(
      (acc, f) =>
        acc +
        f.vacancy.reduce((s: number, v) => s + (v ?? 0), 0) +
        (f.vacancyTotal ?? 0),
      0
    );
    console.log(`書き出しました: ${path.relative(process.cwd(), OUT_PATH)}`);
    console.log(`  ${facilities.length}施設 / ${categories.length}類型 / 空き合計 ${total}人`);
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

main().catch((err) => fail(String(err)));
