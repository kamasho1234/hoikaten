/**
 * 大和市（神奈川県）の保育所等の受入可能児童数を取り込む
 *
 * 実行: npm run vacancy:fetch:yamato
 *
 * ## この自治体の特徴
 * - **PDFは画像でテキストが取れない**。同じ内容のExcelが公開されているのでそちらを使う
 * - **1つのExcelに月ごとのシートが並ぶ**（「202609」「202608」…）。いちばん新しいシートを使う
 * - **左右2段組**（№／施設名／0歳〜5歳／合計 が2組）。列の位置を見出しから引く
 * - **各行に「合計」列がある**ので、年齢別の積み上げと1施設ずつ突き合わせて検算できる
 * - 空欄は受入可能児童数がない
 */

import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import os from "node:os";

const MUNICIPALITY_SLUG = "yamato";
const MUNICIPALITY_NAME = "大和市";
const SOURCE_NAME = "大和市「保育所等受入可能児童数」";
const INDEX_URL = "https://www.city.yamato.lg.jp/section/ehon_no_machi/purpose/O/O00007.html";
const AGE_COUNT = 6;

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const EXTRACTOR = path.join(process.cwd(), "scripts", "yamato-xlsx-extract.py");

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

function stripTags(html: string): string {
  return html.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();
}

function squeeze(s: string): string {
  return (s ?? "").replace(/[\s　]/g, "");
}

/** 空欄は受入可能児童数がない */
function parseValue(raw: string, where: string): number | null {
  const t = toHalfWidth(squeeze(raw));
  if (t === "" || t === "-" || t === "－" || t === "―") return null;
  if (/^\d+$/.test(t)) return Number(t);
  fail(`${where}: 人数として読めません: 「${raw}」`);
}

type Sheet = { name: string; title: string; rows: string[][] };
type XlsxResult = { sheets: Sheet[] };

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
      fail(`Excelの読み込みに失敗しました（${bin}）: ${e.stderr || e.message}`);
    }
  }
  fail(`Pythonを実行できません（${lastError}）。openpyxl が入った python が必要です。`);
}

async function main() {
  console.log(`${MUNICIPALITY_NAME}の受入可能児童数を取り込みます`);
  console.log(`公式ページ: ${INDEX_URL}\n`);

  const ua = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";
  const res = await fetch(INDEX_URL, { headers: { "User-Agent": ua } });
  if (!res.ok) fail(`公式ページが ${res.status} を返しました`);
  const html = await res.text();

  // ファイル名が「ukeirekanou-202609.xlsx」（2026年9月ぶんまで入っている）
  const links = [...html.matchAll(/<a[^>]+href="([^"]+\.xlsx)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => ({ url: new URL(m[1], INDEX_URL).toString(), text: toHalfWidth(stripTags(m[2])) }))
    .filter((l) => /ukeirekanou/i.test(l.url));
  if (links.length !== 1) {
    fail(`受入可能児童数のExcelが${links.length}本あります（1本のはず）: ${links.map((l) => l.url).join(" / ")}`);
  }
  const latest = links[0];
  console.log(`Excel: ${latest.text}\n  ${latest.url}`);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "yamato-vacancy-"));
  try {
    const r = await fetch(latest.url, { headers: { "User-Agent": ua } });
    if (!r.ok) fail(`Excelの取得に失敗しました（${r.status}）: ${latest.url}`);
    const file = path.join(tmpDir, "yamato.xlsx");
    fs.writeFileSync(file, Buffer.from(await r.arrayBuffer()));

    let book: XlsxResult;
    try {
      book = JSON.parse(runPython([EXTRACTOR, file])) as XlsxResult;
    } catch (err) {
      fail(`読み込み結果を読めません: ${String(err)}`);
    }

    // シート名が「202609」の形。いちばん新しいものを使う
    const monthly = book.sheets
      .map((s) => {
        const m = squeeze(s.name).match(/^(\d{4})(\d{2})$/);
        if (!m) return null;
        return { ...s, year: Number(m[1]), month: Number(m[2]), sortKey: Number(m[1] + m[2]) };
      })
      .filter((v): v is NonNullable<typeof v> => v !== null);
    if (monthly.length === 0) fail("「YYYYMM」という名前のシートが見つかりません");
    const sheet = monthly.reduce((a, b) => (b.sortKey > a.sortKey ? b : a));

    // 表題「2026年9月保育所等の受入…」がシート名と合っているか確かめる
    const tm = toHalfWidth(sheet.title).match(/(\d{4})年(\d+)月/);
    if (!tm) fail(`表題から年月を読み取れません: ${sheet.title}`);
    if (Number(tm[1]) !== sheet.year || Number(tm[2]) !== sheet.month) {
      fail(
        `表題の年月（${tm[1]}年${tm[2]}月）がシート名（${sheet.name}）と違います。`
      );
    }
    const asOf = `${sheet.year}-${String(sheet.month).padStart(2, "0")}-01`;
    console.log(`対象: ${sheet.year}年${sheet.month}月`);

    const headerRow = sheet.rows.findIndex((r) => squeeze(r[0] ?? "") === "№");
    if (headerRow < 0) fail("「№」の見出し行が見つかりません");
    const head = sheet.rows[headerRow].map((h) => squeeze(h));

    // 「№／施設名／0歳…5歳／合計」の組が左右に並ぶ。№の位置を起点にする
    const blocks: { no: number; name: number; ages: number[]; total: number }[] = [];
    for (const [i, h] of head.entries()) {
      if (h !== "№") continue;
      const nameIdx = head.indexOf("施設名", i);
      if (nameIdx !== i + 1) fail(`${i}列目の「№」の右に「施設名」がありません`);
      const ages = Array.from({ length: AGE_COUNT }, (_, a) =>
        head.findIndex((x, xi) => xi > nameIdx && toHalfWidth(x) === `${a}歳`)
      );
      if (ages.some((a) => a < 0)) fail(`${i}列目の組に年齢の見出しが足りません`);
      const total = head.findIndex((x, xi) => xi > ages[AGE_COUNT - 1] && x === "合計");
      blocks.push({ no: i, name: nameIdx, ages, total });
    }
    if (blocks.length === 0) fail("「№／施設名／0歳…」の組が見つかりません");
    console.log(`  表の組: ${blocks.length}つ（左右2段組）`);

    const facilities: {
      id: string;
      name: string;
      w: null;
      c: null;
      vacancy: (number | null)[];
    }[] = [];
    const seenNo = new Set<string>();
    let rowTotalChecks = 0;

    for (const row of sheet.rows.slice(headerRow + 1)) {
      for (const b of blocks) {
        const no = squeeze(row[b.no] ?? "");
        const name = (row[b.name] ?? "").replace(/[　\s]+/g, "").trim();
        if (!no || !name) continue;
        if (!/^\d+$/.test(toHalfWidth(no))) continue;
        // **空の行に数式の結果として0が残っている**ことがあるので、№0は施設ではない
        if (Number(toHalfWidth(no)) === 0) continue;
        if (seenNo.has(no)) fail(`№が重複しています: ${no}（${name}）`);
        seenNo.add(no);

        const vacancy = b.ages.map((c) => parseValue(row[c] ?? "", `大和市 ${name}`));
        if (b.total >= 0) {
          const declared = parseValue(row[b.total] ?? "", `大和市 ${name}（合計）`);
          const sum = vacancy.reduce((a: number, v) => a + (v ?? 0), 0);
          if (declared !== null && declared !== sum) {
            fail(`${name}: 「合計」が${declared}なのに年齢別の合計が${sum}です`);
          }
          if (declared !== null) rowTotalChecks++;
        }

        facilities.push({ id: no, name, w: null, c: null, vacancy });
      }
    }

    if (facilities.length < 60) fail(`施設が${facilities.length}件しか取れていません`);
    // №は1から連番のはず
    const numbers = [...seenNo].map(Number).sort((a, b) => a - b);
    for (const [i, n] of numbers.entries()) {
      if (n !== i + 1) fail(`№が連番になっていません（${i + 1}のところが${n}）`);
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
      metrics: ["vacancy"],
      subtitle: `${sheet.year}年${sheet.month}月の受入可能児童数`,
      notes: [
        "クラスは年度はじめ（4月1日）時点の年齢で決まります。",
        "空欄は受入可能児童数がないことを示します。",
        "大和市はPDFのほかに同じ内容のExcelを公開しており、当サイトはExcelから取り込んでいます。",
      ],
      wards: [],
      categories: [],
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

    const ageTotals = Array.from({ length: AGE_COUNT }, (_, age) =>
      facilities.reduce((acc, f) => acc + (f.vacancy[age] ?? 0), 0)
    );
    console.log(`書き出しました: ${path.relative(process.cwd(), OUT_PATH)}`);
    console.log(`  行の「合計」との突き合わせ: ${rowTotalChecks}件すべて一致`);
    console.log(`  №の連番: 1〜${numbers.length} すべてそろっています`);
    console.log("");
    console.log("  年齢 | 受入可能");
    ageTotals.forEach((v, age) => console.log(`  ${age}歳児 | ${v}`));
    console.log(`  合計 | ${ageTotals.reduce((a, b) => a + b, 0)}`);
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

main().catch((err) => fail(String(err)));
