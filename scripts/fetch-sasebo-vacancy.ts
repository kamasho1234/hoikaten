/**
 * 佐世保市の保育所等の受入可否情報を取り込む
 *
 * 実行: npm run vacancy:fetch:sasebo
 *
 * ## この自治体の特徴
 * - 公式は「受け入れができない学齢（クラス年齢）に×を表示」と書いている。
 *   つまり **×＝受け入れできない、空らん＝受け入れ可能**
 * - **そのクラスがない学齢には斜線**が引いてある
 *   （幼稚園型こども園の低年齢、0〜2歳の事業所内保育の3〜5歳）
 * - 空らんのままでは当サイトの「—」（クラスなし）と区別が付かないので、
 *   **空らんは「○」（受け入れ可能）に置き換えて表示**し、そのことを注記に書く
 * - 1号認定ぶんのPDFが別にあるので、2号・3号認定ぶんだけを取る
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "sasebo";
const MUNICIPALITY_NAME = "佐世保市";
const SOURCE_NAME = "佐世保市「保育所等施設一覧（受入可否情報）」";
const INDEX_URL = "https://www.city.sasebo.lg.jp/kodomomirai/hoyou/hoikuenakijokyo.html";
const AGE_COUNT = 6;
const MIN_FACILITIES = 80;
const UA = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";

/** 公式の表で×が付いている＝受け入れできない */
const CLOSED_MARK = "×";
const CLOSED_LABEL = "受け入れができない";
/** 公式の表で空らん＝受け入れ可能。この記号に置き換えて表示する */
const OPEN_MARK = "○";
const OPEN_LABEL = "受け入れができる";

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const EXTRACTOR = path.join(process.cwd(), "scripts", "sasebo-pdf-extract.py");

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
  return (s ?? "").replace(/<[^>]+>/g, "").replace(/[\s　]/g, "");
}

function shapeOf(mark: string): string {
  if (/^[×✕✖]$/.test(mark)) return "×";
  if (/^[○◯〇]$/.test(mark)) return "○";
  return mark;
}

type PdfResult = {
  asOf: [number, number, number];
  target: [number, number];
  notes: string[];
  wards: string[];
  markCounts: Record<string, number>;
  slashes: number;
  blanks: number;
  rows: { ward: string; name: string; marks: (string | null)[] }[];
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
  console.log(`${MUNICIPALITY_NAME}の受入可否情報を取り込みます`);
  console.log(`公式ページ: ${INDEX_URL}\n`);

  const res = await fetch(INDEX_URL, { headers: { "User-Agent": UA } });
  if (!res.ok) fail(`公式ページが ${res.status} を返しました`);
  const html = await res.text();

  // 1号認定ぶん（r81gou.pdf）と2・3号認定ぶん（r823gou.pdf）が並んでいる。
  // 文言では見分けが付かないので、ファイル名の「23gou」で2・3号認定ぶんを選ぶ
  const links = [...html.matchAll(/<a[^>]+href="([^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => ({ url: new URL(m[1], INDEX_URL).toString(), text: toHalfWidth(squeeze(m[2])) }))
    .filter((l) => l.text.includes("空き状況") && /23gou\.pdf$/i.test(l.url));
  if (links.length !== 1) {
    fail(
      `2号・3号認定ぶんのPDFのリンクが${links.length}件あります（1件のはず）。ファイル名の付け方が変わった可能性があります。`
    );
  }
  const link = links[0];
  console.log(`PDF: ${link.text}\n  ${link.url}`);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "sasebo-vacancy-"));
  try {
    const r = await fetch(link.url, { headers: { "User-Agent": UA } });
    if (!r.ok) fail(`PDFの取得に失敗しました（${r.status}）: ${link.url}`);
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.subarray(0, 4).toString() !== "%PDF") fail(`PDFではありません: ${link.url}`);
    const file = path.join(tmpDir, "sasebo.pdf");
    fs.writeFileSync(file, buf);

    let pdf: PdfResult;
    try {
      pdf = JSON.parse(runPython([EXTRACTOR, file])) as PdfResult;
    } catch (err) {
      fail(`抽出結果を読めません: ${String(err)}`);
    }

    const [reiwa, asOfMonth, day] = pdf.asOf;
    const asOf = `${2018 + reiwa}-${String(asOfMonth).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    if (!/^\d{4}-\d{2}-\d{2}$/.test(asOf)) fail(`基準日を組み立てられません: ${asOf}`);
    if (asOf > todayJst()) fail(`基準日（${asOf}）が今日より先になっています`);
    const [targetReiwa, targetMonth] = pdf.target;
    const targetYear = 2018 + targetReiwa;
    // リンクの文言にも対象月が入っている（【令和8年9月】）ので突き合わせる
    const inText = link.text.match(/【令和(\d+)年(\d+)月】/);
    if (inText && (Number(inText[1]) !== targetReiwa || Number(inText[2]) !== targetMonth)) {
      fail(
        `PDFの対象月（令和${targetReiwa}年${targetMonth}月）がリンクの文言（令和${inText[1]}年${inText[2]}月）と違います`
      );
    }
    console.log(`基準日: ${asOf}（${targetYear}年${targetMonth}月の利用希望ぶん）`);

    const symbolLegend = [
      { mark: OPEN_MARK, label: OPEN_LABEL, open: true },
      { mark: CLOSED_MARK, label: CLOSED_LABEL, open: false },
    ];
    console.log(`凡例: ${symbolLegend.map((l) => `${l.mark}＝${l.label}`).join(" / ")}`);

    if (pdf.wards.length < 2) fail(`地区が${pdf.wards.length}件しか取れていません`);
    const wards = pdf.wards;
    console.log(`地区: ${wards.length}件`);

    const facilities: {
      id: string;
      name: string;
      w: number;
      c: null;
      vacancy: (number | null)[];
      symbols: (string | null)[];
    }[] = [];
    const marks = new Map<string, number>();
    const seen = new Set<string>();
    let noClass = 0;
    let blanks = 0;

    for (const row of pdf.rows) {
      const name = squeeze(row.name);
      if (!name) fail("施設名が空の行があります");
      if (seen.has(name)) fail(`施設名が重複しています: ${name}`);
      seen.add(name);

      const w = wards.indexOf(row.ward);
      if (w < 0) fail(`${name}: 地区が一覧にありません: 「${row.ward}」`);

      const symbols: (string | null)[] = [];
      for (let age = 0; age < AGE_COUNT; age++) {
        const raw = row.marks[age];
        // 斜線が引かれていた欄は Python 側で null になっている
        if (raw === null) {
          noClass += 1;
          symbols.push(null);
          continue;
        }
        // 空らんは公式の文言どおり「受け入れができる」。記号に置き換えて表示する
        if (raw === "") {
          blanks += 1;
          marks.set(OPEN_MARK, (marks.get(OPEN_MARK) ?? 0) + 1);
          symbols.push(OPEN_MARK);
          continue;
        }
        if (shapeOf(squeeze(raw)) !== CLOSED_MARK) {
          fail(`${name}: ${age}歳児が思っていない値です: 「${raw}」`);
        }
        marks.set(CLOSED_MARK, (marks.get(CLOSED_MARK) ?? 0) + 1);
        symbols.push(CLOSED_MARK);
      }
      if (symbols.every((s) => s === null)) fail(`${name}: 全てのクラスがありません`);

      facilities.push({
        id: name,
        name,
        w,
        c: null,
        vacancy: new Array(AGE_COUNT).fill(null),
        symbols,
      });
    }

    if (facilities.length < MIN_FACILITIES) {
      fail(`施設が${facilities.length}件しか取れていません（${MIN_FACILITIES}件以上のはず）`);
    }
    if (noClass !== pdf.slashes) {
      fail(`斜線の欄の数が合いません（PDF ${pdf.slashes} / 取り込み ${noClass}）`);
    }
    if (blanks !== pdf.blanks) {
      fail(`空らんの数が合いません（PDF ${pdf.blanks} / 取り込み ${blanks}）`);
    }

    // 検算1: 記号と斜線の合計が施設数×クラス数になるか
    const total = [...marks.values()].reduce((a, b) => a + b, 0);
    if (total + noClass !== facilities.length * AGE_COUNT) {
      fail(
        `欄の数が合いません（記号${total}＋斜線${noClass} / 施設${facilities.length}×${AGE_COUNT}）`
      );
    }

    // 検算2: 印字された「×」の数がPDFの文字と合うか（空らんは文字がないので数えられない）
    const closedCount = marks.get(CLOSED_MARK) ?? 0;
    const closedInText = Object.entries(pdf.markCounts)
      .filter(([m]) => shapeOf(m) === CLOSED_MARK)
      .reduce((acc, [, v]) => acc + v, 0);
    if (closedCount !== closedInText) {
      fail(`「×」の数が合いません（PDFの文字 ${closedInText}個 / 取り込み ${closedCount}個）`);
    }
    console.log("「×」の数はPDFの文字と一致し、欄の数も施設数×クラス数と合いました");

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
      previous?.sourceFiles?.vacancy === link.url &&
      JSON.stringify(previous?.facilities ?? null) === JSON.stringify(facilities)
    ) {
      console.log(`公式データの時点が前回と同じ（${asOf}）のため更新はありません。`);
      return;
    }

    const notes = [
      `佐世保市は「受け入れができない学齢（クラス年齢）に×を表示する」という形で公表しています。これは${targetYear}年${targetMonth}月の利用希望ぶんで、${asOf}時点のものです。`,
      `公式の表では受け入れができる場合はらんが空になっています。当サイトでは、そのクラスがないらんと見分けられるように「${OPEN_MARK}」（${OPEN_LABEL}）として表示しています。`,
      ...pdf.notes,
      "そのクラスがないらんは「—」にしています（公式の表では斜線です）。",
      "このページは2号認定・3号認定（保育の利用）の情報です。1号認定（教育標準時間）の空き状況は公式サイトの別の表をご覧ください。",
    ];

    const dataset = {
      municipalitySlug: MUNICIPALITY_SLUG,
      municipalityName: MUNICIPALITY_NAME,
      asOf,
      fetchedAt: todayJst(),
      sourceName: SOURCE_NAME,
      sourceUrl: INDEX_URL,
      sourceFiles: { vacancy: link.url },
      metrics: ["symbol"],
      subtitle: `${targetYear}年${targetMonth}月の利用希望ぶんの受入可否`,
      notes,
      wards,
      categories: [],
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
    console.log(`  ${facilities.length}施設`);
    console.log(`  そのクラスがないらん（斜線）: ${noClass}`);
    console.log(`  ${OPEN_MARK}（${OPEN_LABEL}） ${marks.get(OPEN_MARK) ?? 0}`);
    console.log(`  ${CLOSED_MARK}（${CLOSED_LABEL}） ${marks.get(CLOSED_MARK) ?? 0}`);
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

main().catch((err) => fail(String(err)));
