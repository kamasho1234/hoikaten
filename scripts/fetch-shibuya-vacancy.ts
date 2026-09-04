/**
 * 渋谷区の保育所利用申込みの募集数・申込数を取り込む
 *
 * 実行: npm run vacancy:fetch:shibuya
 *
 * ## この自治体の特徴
 * - 毎月の利用調整ごとに「募集数」と「申込数」を公表している。
 *   募集数を空き、申込数を入所待ちとして持つ（横浜市と同じ考え方）
 * - **申込数は延べ人数**で、1人が複数の園を希望すると各園に数えられる
 * - 空欄はそのクラスを設けていない施設
 * - 公式が出している倍率（申込数÷募集数）と、読み取った数から計算した値が
 *   合うことを検算に使う
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "shibuya";
const MUNICIPALITY_NAME = "渋谷区";
const SOURCE_NAME = "渋谷区「区立・私立保育園の空き状況（申込み・内定状況一覧）」";
const INDEX_URL = "https://www.city.shibuya.tokyo.jp/kodomo/hoiku/hoikuen-nyuen/hoiku_aki.html";
const AGE_COUNT = 6;
const UA = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const EXTRACTOR = path.join(process.cwd(), "scripts", "shibuya-pdf-extract.py");

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
  target: [number, number, number];
  asOf: [number, number, number];
  wordSum: number;
  rows: { kind: string; name: string; values: string[] }[];
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
  console.log(`${MUNICIPALITY_NAME}の申込み・内定状況を取り込みます`);
  console.log(`公式ページ: ${INDEX_URL}\n`);

  const res = await fetch(INDEX_URL, { headers: { "User-Agent": UA } });
  if (!res.ok) fail(`公式ページが ${res.status} を返しました`);
  const html = await res.text();

  // 「令和8年9月1日保育所利用申し込み（PDF 882KB）」「令和8年4月1日一次保育所利用申し込み」
  const links = [...html.matchAll(/<a[^>]+href="([^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => ({ url: new URL(m[1], INDEX_URL).toString(), text: toHalfWidth(stripTags(m[2])) }))
    .map((l) => {
      const m = squeeze(l.text).match(/令和(\d+)年(\d+)月(\d+)日(一次|二次)?保育所利用申し?込み?/);
      if (!m) return null;
      const year = 2018 + Number(m[1]);
      const month = Number(m[2]);
      const day = Number(m[3]);
      const round = m[4] === "二次" ? 2 : 1;
      return {
        ...l,
        reiwa: Number(m[1]),
        year,
        month,
        day,
        sortKey: year * 100000 + month * 1000 + day * 10 + round,
      };
    })
    .filter((v): v is NonNullable<typeof v> => v !== null);
  if (links.length === 0) fail("申込み状況のPDFが見つかりません。ページの構成が変わった可能性があります。");
  const latest = links.reduce((a, b) => (b.sortKey > a.sortKey ? b : a));
  console.log(`最新: ${latest.text}\n  ${latest.url}`);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "shibuya-vacancy-"));
  try {
    const r = await fetch(latest.url, { headers: { "User-Agent": UA } });
    if (!r.ok) fail(`PDFの取得に失敗しました（${r.status}）: ${latest.url}`);
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.subarray(0, 4).toString() !== "%PDF") fail(`PDFではありません: ${latest.url}`);
    const file = path.join(tmpDir, "shibuya.pdf");
    fs.writeFileSync(file, buf);

    let pdf: PdfResult;
    try {
      pdf = JSON.parse(runPython([EXTRACTOR, file])) as PdfResult;
    } catch (err) {
      fail(`抽出結果を読めません: ${String(err)}`);
    }

    const [ty, tm, td] = pdf.target;
    if (ty !== latest.reiwa || tm !== latest.month || td !== latest.day) {
      fail(
        `PDFの表題（令和${ty}年${tm}月${td}日）がリンクの文言（令和${latest.reiwa}年${latest.month}月${latest.day}日）と違います`
      );
    }
    const [ay, am, ad] = pdf.asOf;
    const asOf = `${2018 + ay}-${String(am).padStart(2, "0")}-${String(ad).padStart(2, "0")}`;
    if (asOf > todayJst()) fail(`作成日（${asOf}）が今日より先になっています`);
    console.log(`作成日: ${asOf} / 対象: ${latest.month}月${latest.day}日入所の利用調整`);

    const categories: string[] = [];
    const facilities: {
      id: string;
      name: string;
      w: null;
      c: number;
      vacancy: (number | null)[];
      waiting: (number | null)[];
    }[] = [];
    const seen = new Set<string>();
    let noClass = 0;
    let total = 0;
    let vacancyTotal = 0;
    let waitingTotal = 0;

    for (const row of pdf.rows) {
      const name = squeeze(row.name);
      if (!name) fail("園名が空の行があります");
      if (seen.has(name)) fail(`園名が重複しています: ${name}`);
      seen.add(name);

      const kind = squeeze(row.kind);
      if (!kind) fail(`${name}: 区分が分かりません`);
      if (!categories.includes(kind)) categories.push(kind);

      const vacancy: (number | null)[] = [];
      const waiting: (number | null)[] = [];
      for (let age = 0; age < AGE_COUNT; age++) {
        const cells = row.values.slice(age * 3, age * 3 + 3).map((v) => squeeze(v));
        if (cells.every((c) => c === "")) {
          noClass += 1;
          vacancy.push(null);
          waiting.push(null);
          continue;
        }
        const nums = cells.slice(0, 2).map((c) => Number(toHalfWidth(c)));
        if (nums.some((n) => !Number.isInteger(n) || n < 0)) {
          fail(`${name}: ${age}歳児の欄を読めません: 「${cells.join(" / ")}」`);
        }
        const [open, applied] = nums;
        // 公式が出している倍率と突き合わせる（募集0のときは0.00と書かれている）
        const printed = Number(toHalfWidth(cells[2]));
        if (!Number.isFinite(printed)) fail(`${name}: ${age}歳児の倍率を読めません: 「${cells[2]}」`);
        const expected = open > 0 ? applied / open : 0;
        if (Math.abs(expected - printed) > 0.011) {
          fail(
            `${name}: ${age}歳児の倍率が合いません（公式 ${printed} / 募集${open}・申込${applied}から計算すると ${expected.toFixed(2)}）`
          );
        }
        total += open + applied;
        vacancyTotal += open;
        waitingTotal += applied;
        vacancy.push(open);
        waiting.push(applied);
      }
      if (vacancy.every((v) => v === null)) fail(`${name}: 全てのクラスが空です`);

      facilities.push({
        id: name,
        name,
        w: null,
        c: categories.indexOf(kind),
        vacancy,
        waiting,
      });
    }

    if (facilities.length < 60) fail(`施設が${facilities.length}件しか取れていません`);
    if (total !== pdf.wordSum) {
      fail(`募集数と申込数の合計が合いません（PDFの印字 ${pdf.wordSum} / 取り込み ${total}）`);
    }
    console.log(`倍率と数の合計（${total}）はPDFの印字と一致しました`);

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
      metrics: ["vacancy", "waiting"],
      subtitle: `${latest.month}月${latest.day}日入所の利用調整での募集数と申込数`,
      notes: [
        `${latest.month}月${latest.day}日入所の利用調整で募集された数（転園により生じた数を含みます）と、その申込数です。`,
        "前月の利用調整が終わった時点のもので、在園児の退園などで生じた空きが随時反映されるわけではありません。",
        "募集数が0の施設にも申し込めます。在園児の退園や内定辞退で空きが出ることがあります。",
        "年齢はその年度の4月1日時点のものです。設けていないクラスは「—」にしています。",
      ],
      waitingCaveat:
        "申込数は延べ人数です。1人が複数の園を希望すると、希望した園それぞれに数えられるので、実際の競争率とは異なります。",
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

    console.log(`書き出しました: ${path.relative(process.cwd(), OUT_PATH)}`);
    console.log(`  ${facilities.length}施設 / ${categories.length}区分`);
    console.log(`  募集数の合計 ${vacancyTotal} / 申込数の合計 ${waitingTotal}`);
    console.log(`  設けていないクラス: ${noClass}`);
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

main().catch((err) => fail(String(err)));
