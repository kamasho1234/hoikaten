/**
 * 神栖市の保育所等の空き状況を取り込む
 *
 * 実行: npm run vacancy:fetch:kamisu
 *
 * ## この自治体の特徴
 * - 記号は ◎＝空き3枠以上、○＝空き1〜2枠、×＝空きなし
 * - **空きなしが「×」で表される**ので、空らんは0枠ではなく
 *   その年齢の受け入れがないことを表す
 * - 「受入対象」の列（「６か月～」「２歳～」など）があるので、
 *   **受け入れ始める年齢より前の空らんは機械で確かめられる**。
 *   上の側（小規模保育の3歳以降など）は列に書かれていないので、
 *   空らんが年齢の途中に現れないことだけを見ている
 * - 施設名が2行にわたることがあり、括弧書きの施設種別が頭に付く
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "kamisu";
const MUNICIPALITY_NAME = "神栖市";
const SOURCE_NAME = "神栖市「年度途中の入所申し込み・定員の空き状況：保育施設」";
const INDEX_URL = "https://www.city.kamisu.ibaraki.jp/kodomo/youho/1001646/1007537.html";
const AGE_COUNT = 6;
const MIN_FACILITIES = 30;
const UA = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const EXTRACTOR = path.join(process.cwd(), "scripts", "kamisu-pdf-extract.py");

function fail(message: string): never {
  console.error(`\n[中断] ${message}`);
  process.exit(1);
}

function todayJst(): string {
  const jst = new Date(Date.now() + 9 * 60 * 60 * 1000);
  return jst.toISOString().slice(0, 10);
}

function squeeze(s: string): string {
  return (s ?? "").replace(/<[^>]+>/g, "").replace(/[\s　]/g, "");
}

function toHalfWidth(s: string): string {
  return s.replace(/[０-９]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xfee0));
}

function reiwaToYear(reiwa: number): number {
  return reiwa + 2018;
}

/** 頭に付く括弧書きの施設種別（「(幼保連携型認定こども園)波崎こども園」）を落とす */
function nameOf(raw: string): string {
  return squeeze(raw).replace(/^[（(][^）)]*[）)]/, "");
}

/** 「６か月～」「２歳～」「２か月～」から、受け入れを始める年齢クラスを出す */
function startAgeOf(accept: string): number | null {
  const text = toHalfWidth(squeeze(accept));
  if (/^\d+(か月|ヶ月|カ月|日)/.test(text)) return 0;
  const m = /^(\d+)歳/.exec(text);
  if (!m) return null;
  const start = Number(m[1]);
  return start >= 0 && start < AGE_COUNT ? start : null;
}

type PdfResult = {
  asOf: [number, number, number];
  targetMonth: number;
  legend: { mark: string; label: string }[];
  notes: string[];
  markCounts: Record<string, number>;
  blanks: number;
  rows: {
    kind: string;
    name: string;
    address: string;
    accept: string;
    marks: (string | null)[];
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
      fail(`PDFの抽出に失敗しました（${bin}）: ${e.stderr || e.message}`);
    }
  }
  fail(`Pythonを実行できません（${lastError}）。pdfplumber が入った python が必要です。`);
}

async function main() {
  console.log(`${MUNICIPALITY_NAME}の空き状況を取り込みます`);
  console.log(`公式ページ: ${INDEX_URL}\n`);

  const res = await fetch(INDEX_URL, { headers: { "User-Agent": UA }, redirect: "follow" });
  if (!res.ok) fail(`公式ページが ${res.status} を返しました`);
  const html = await res.text();

  const links = [...html.matchAll(/<a[^>]+href="([^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => ({
      url: new URL(m[1], res.url || INDEX_URL).toString(),
      text: toHalfWidth(squeeze(m[2])),
    }))
    .map((l) => {
      const m = /空き状況一覧表\((\d{4})年(\d+)月入所分\)/.exec(l.text);
      return { ...l, key: m ? Number(m[1]) * 100 + Number(m[2]) : 0 };
    })
    .filter((l) => l.key > 0)
    .sort((a, b) => b.key - a.key);
  if (links.length === 0) fail("空き状況一覧表のPDFが見つかりません");
  const link = links[0];
  console.log(`PDF: ${link.text}\n  ${link.url}`);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "kamisu-vacancy-"));
  try {
    const r = await fetch(link.url, { headers: { "User-Agent": UA } });
    if (!r.ok) fail(`PDFの取得に失敗しました（${r.status}）: ${link.url}`);
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.subarray(0, 4).toString() !== "%PDF") fail(`PDFではありません: ${link.url}`);
    const file = path.join(tmpDir, "kamisu.pdf");
    fs.writeFileSync(file, buf);

    let pdf: PdfResult;
    try {
      pdf = JSON.parse(runPython([EXTRACTOR, file])) as PdfResult;
    } catch (err) {
      fail(`抽出結果を読めません: ${String(err)}`);
    }

    const [reiwa, month, day] = pdf.asOf;
    const asOf = `${reiwaToYear(reiwa)}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    if (!/^\d{4}-\d{2}-\d{2}$/.test(asOf)) fail(`時点の日付を組み立てられません: ${asOf}`);
    if (asOf > todayJst()) fail(`時点の日付（${asOf}）が今日より先になっています`);
    // リンクの題の入所月とPDFの中の入所月が合っているか
    if (link.key % 100 !== pdf.targetMonth) {
      fail(`リンクの題（${link.text}）とPDFの中の入所月（${pdf.targetMonth}月）が違います`);
    }
    const targetLabel = `${Math.floor(link.key / 100)}年${pdf.targetMonth}月`;
    console.log(`時点: ${asOf} ／ 対象: ${targetLabel}入所`);

    const symbolLegend = pdf.legend.map((l) => ({
      mark: squeeze(l.mark),
      label: squeeze(l.label),
      open: !squeeze(l.label).endsWith("なし"),
    }));
    if (symbolLegend.length !== 3) fail(`凡例が${symbolLegend.length}件です（3件のはず）`);
    if (!symbolLegend.some((l) => l.open)) fail("空きありの記号が凡例にありません");
    console.log(`凡例: ${symbolLegend.map((l) => `${l.mark}＝${l.label}`).join(" / ")}`);
    const known = new Set(symbolLegend.map((l) => l.mark));

    const categories: string[] = [];
    const facilities: {
      id: string;
      name: string;
      w: null;
      c: number;
      vacancy: (number | null)[];
      symbols: (string | null)[];
      note: string;
    }[] = [];
    const seen = new Set<string>();
    const marks = new Map<string, number>();
    let notOffered = 0;
    let checkedByAccept = 0;

    for (const row of pdf.rows) {
      const name = nameOf(row.name);
      if (!name) fail("施設名が空の行があります");
      if (seen.has(name)) fail(`施設名が重複しています: ${name}`);
      seen.add(name);

      const kind = squeeze(row.kind);
      if (!kind) fail(`${name}: 区分が空です`);
      let c = categories.indexOf(kind);
      if (c < 0) {
        categories.push(kind);
        c = categories.length - 1;
      }

      // 受入対象が空の施設（分園）もあるので、読めたときだけ検算に使う
      const startAge = row.accept ? startAgeOf(row.accept) : null;
      if (row.accept && startAge === null) {
        fail(`${name}: 受入対象を読み取れません（「${row.accept}」）`);
      }

      const symbols: (string | null)[] = [];
      for (let age = 0; age < AGE_COUNT; age++) {
        const raw = row.marks[age];
        if (raw === null) {
          if (startAge !== null && age >= startAge) {
            // 受け入れを始める年齢より後の空らんは、上の年齢のクラスがない園のもの。
            // ここでは年齢の途中に空らんが現れていないかだけ見る
            const rest = row.marks.slice(age);
            if (rest.some((v) => v !== null)) {
              fail(`${name}: ${age}歳の空らんの後ろに記号があります（${row.marks.join(",")}）`);
            }
          }
          notOffered += 1;
          symbols.push(null);
          continue;
        }
        if (startAge !== null && age < startAge) {
          fail(
            `${name}: 受入対象（${row.accept}）より前の${age}歳に「${raw}」が入っています`,
          );
        }
        const mark = squeeze(raw);
        if (!known.has(mark)) fail(`${name}: ${age}歳が凡例にない記号です（「${mark}」）`);
        marks.set(mark, (marks.get(mark) ?? 0) + 1);
        symbols.push(mark);
      }

      // 受け入れを始める年齢より前が全て空らんになっているか
      if (startAge !== null && startAge > 0) {
        if (symbols.slice(0, startAge).some((v) => v !== null)) {
          fail(`${name}: 受入対象（${row.accept}）より前の年齢に記号が残っています`);
        }
        checkedByAccept += 1;
      }

      const address = squeeze(row.address);
      facilities.push({
        id: name,
        name,
        w: null,
        c,
        vacancy: new Array(AGE_COUNT).fill(null),
        symbols,
        note: `受入対象: ${row.accept || "公式の表に記載なし"}${address ? ` ／ 所在地: ${address}` : ""}`,
      });
    }

    if (facilities.length < MIN_FACILITIES) {
      fail(`施設が${facilities.length}件しか取れていません（${MIN_FACILITIES}件以上のはず）`);
    }
    // 検算1: 記号の数がPDFの印字と合うか
    for (const [mark, count] of marks) {
      if (count !== pdf.markCounts[mark]) {
        fail(`「${mark}」の数が合いません（PDF ${pdf.markCounts[mark]}個 / 取り込み ${count}個）`);
      }
    }
    // 検算2: 空らんの数がPDFと合うか
    if (notOffered !== pdf.blanks) {
      fail(`空らんの数が合いません（PDF ${pdf.blanks} / 取り込み ${notOffered}）`);
    }
    // 検算3: 欄の数が施設数×年齢数になるか
    const total = [...marks.values()].reduce((a, b) => a + b, 0) + notOffered;
    if (total !== facilities.length * AGE_COUNT) {
      fail(`欄の数が合いません（${total} / 施設${facilities.length}×${AGE_COUNT}）`);
    }
    console.log(
      `${facilities.length}施設 ／ ${[...marks].map(([m, n]) => `${m}${n}`).join("・")}・クラスなし${notOffered}（受入対象で確かめた施設 ${checkedByAccept}件）`,
    );

    const previous = fs.existsSync(OUT_PATH)
      ? (JSON.parse(fs.readFileSync(OUT_PATH, "utf-8")) as { asOf?: string; facilities?: unknown[]; sourceFiles?: Record<string, string> })
      : null;
    if (previous?.facilities && facilities.length < previous.facilities.length * 0.9) {
      fail(`施設数が大きく減っています（前回 ${previous.facilities.length}件 → 今回 ${facilities.length}件）`);
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

    const zeroMark = symbolLegend.find((l) => !l.open)?.mark ?? "×";
    const notes = [
      `神栖市は空き状況を人数ではなく記号で公表しています。これは${targetLabel}入所分で、${asOf}時点のものです。`,
      `公式の凡例は ${symbolLegend.map((l) => `「${l.mark}」${l.label}`).join("、")} です。`,
      `公式の表で空らんになっている年齢は「—」にしています。空きがなければ「${zeroMark}」と書かれるので、空らんはその年齢の受け入れがないことを表します。`,
      "施設ごとの「受入対象」は公式の表に載っているものをそのまま出しています。",
      ...pdf.notes.map((n) => squeeze(n)),
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
      subtitle: `${targetLabel}入所分の空き状況`,
      notes,
      wards: [] as string[],
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
    console.log(`  ${facilities.length}施設 / ${categories.join("・")}`);
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

main().catch((err) => fail(String(err)));
