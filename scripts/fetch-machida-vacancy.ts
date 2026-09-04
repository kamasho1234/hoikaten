/**
 * 町田市の保育所等の募集人数を取り込む
 *
 * 実行: npm run vacancy:fetch:machida
 *
 * ## この自治体の特徴
 * - 数値は翌月1日入園の募集人数。八王子市や墨田区と同じ性質
 * - **施設の種類ごとに表が分かれ、種類は表の上の見出し**
 *   （認可保育所／認定こども園／小規模保育園／家庭的保育者（保育ママ））。
 *   同じページに2つの表が並ぶので、ページではなく表の上の行を見る
 * - 地域は5つ（堺・忠生・町田・鶴川・南）。**「堺地域」と「堺」のように書き方が揺れる**ので
 *   末尾の「地域」を落としてそろえる
 * - **募集人数の欄に「子どもの森幼稚園に継続して在園」のような注記が入る**ことがある。
 *   人数ではないので「—」にして注記に出す
 * - 空欄は募集なし
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "machida";
const MUNICIPALITY_NAME = "町田市";
const SOURCE_NAME = "町田市「入園募集人数一覧」";
const INDEX_URL =
  "https://kosodate-machida.tokyo.jp/soshiki/4/3/nyuuen/hoiku/202604/14186.html";
const AGE_COUNT = 6;

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const EXTRACTOR = path.join(process.cwd(), "scripts", "machida-pdf-extract.py");

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

type PdfTable = { section: string; head: string[]; ageHead: string[]; rows: string[][] };
type PdfResult = { target: number[][]; tables: PdfTable[] };

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

/** 「2026年9月1日入園 小規模保育園募集人数 vol.2」→「小規模保育園」 */
function categoryOf(section: string): string {
  const m = toHalfWidth(squeeze(section)).match(/\d+年\d+月\d+日入園(.+?)募集人数/);
  if (!m) fail(`施設の種類が分かりません: 「${section}」`);
  return m[1];
}

async function main() {
  console.log(`${MUNICIPALITY_NAME}の募集人数を取り込みます`);
  console.log(`公式ページ: ${INDEX_URL}\n`);

  const ua = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";
  const res = await fetch(INDEX_URL, { headers: { "User-Agent": ua } });
  if (!res.ok) fail(`公式ページが ${res.status} を返しました`);
  const html = await res.text();

  // 「2026年9月入園募集人数一覧 (PDFファイル: 362.4KB)」。4月は一次・二次がある
  const links = [...html.matchAll(/<a[^>]+href="([^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => ({ url: new URL(m[1], INDEX_URL).toString(), text: toHalfWidth(stripTags(m[2])) }))
    .map((l) => {
      const m = l.text.match(/(\d{4})年(\d+)月入園募集人数一覧(?:（(一|二)次募集）)?/);
      if (!m) return null;
      const year = Number(m[1]);
      const month = Number(m[2]);
      const round = m[3] === "二" ? 2 : 1;
      return { ...l, year, month, round, sortKey: year * 10000 + month * 100 + round };
    })
    .filter((v): v is NonNullable<typeof v> => v !== null);
  if (links.length === 0) fail("募集人数のPDFが見つかりません。ページの構成が変わった可能性があります。");
  const latest = links.reduce((a, b) => (b.sortKey > a.sortKey ? b : a));
  console.log(`最新: ${latest.text}\n  ${latest.url}`);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "machida-vacancy-"));
  try {
    const r = await fetch(latest.url, { headers: { "User-Agent": ua } });
    if (!r.ok) fail(`PDFの取得に失敗しました（${r.status}）: ${latest.url}`);
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.subarray(0, 4).toString() !== "%PDF") fail(`PDFではありません: ${latest.url}`);
    const file = path.join(tmpDir, "machida.pdf");
    fs.writeFileSync(file, buf);

    let pdf: PdfResult;
    try {
      pdf = JSON.parse(runPython([EXTRACTOR, file])) as PdfResult;
    } catch (err) {
      fail(`抽出結果を読めません: ${String(err)}`);
    }

    if (pdf.target.length !== 1) fail(`PDFに入園日が${pdf.target.length}種類あります`);
    const [ty, tm, td] = pdf.target[0];
    if (ty !== latest.year || tm !== latest.month) {
      fail(`PDFの入園月（${ty}年${tm}月）がリンクの文言（${latest.year}年${latest.month}月）と違います。`);
    }
    // 募集人数の一覧には基準日がなく、対象の入園日だけが書かれている
    const asOf = `${ty}-${String(tm).padStart(2, "0")}-${String(td).padStart(2, "0")}`;
    console.log(`対象: ${ty}年${tm}月${td}日入園`);

    const wards: string[] = [];
    const categories: string[] = [];
    const facilities: {
      id: string;
      name: string;
      w: number;
      c: number;
      vacancy: (number | null)[];
    }[] = [];
    const seenId = new Set<string>();
    const noteCells: string[] = [];
    let area = "";

    for (const table of pdf.tables) {
      const category = categoryOf(table.section);
      const head = table.head.map((h) => squeeze(h));
      const nameIdx = head.findIndex((h) =>
        ["保育所名", "こども園名", "施設名", "保育室名"].includes(h)
      );
      if (nameIdx < 0) fail(`施設名の列が分かりません: ${table.head.join(" / ")}`);
      // 年齢の見出しは2行目
      const ageHead = table.ageHead.map((h) => toHalfWidth(squeeze(h)));
      const ageIdx = Array.from({ length: AGE_COUNT }, (_, i) => ageHead.indexOf(`${i}歳`));
      if (ageIdx.some((i) => i < 0)) fail(`年齢の見出しが足りません: ${table.ageHead.join(" / ")}`);

      if (!categories.includes(category)) categories.push(category);
      for (const row of table.rows) {
        // 地域は縦に結合されていて、変わるときだけ値が入る。「堺地域」「堺」の揺れをそろえる
        const rawArea = squeeze(row[0] ?? "");
        if (rawArea) area = rawArea.replace(/地域$/, "");
        const name = (row[nameIdx] ?? "").replace(/[　\s]+/g, "").trim();
        if (!name) continue;
        if (!area) fail(`${name}: 地域が分かりません`);
        if (!wards.includes(area)) wards.push(area);

        const vacancy: (number | null)[] = [];
        for (const [age, col] of ageIdx.entries()) {
          const raw = squeeze(row[col] ?? "");
          if (raw === "") {
            vacancy.push(null);
            continue;
          }
          const t = toHalfWidth(raw);
          if (/^\d+$/.test(t)) {
            vacancy.push(Number(t));
            continue;
          }
          // 「子どもの森幼稚園に継続して在園」のような注記
          noteCells.push(`${name}（${age}歳児「${(row[col] ?? "").replace(/\s+/g, "")}」）`);
          vacancy.push(null);
        }

        const id = `${area}-${name}`;
        if (seenId.has(id)) fail(`施設名が重複しています: ${id}`);
        seenId.add(id);
        facilities.push({
          id,
          name,
          w: wards.indexOf(area),
          c: categories.indexOf(category),
          vacancy,
        });
      }
    }

    if (facilities.length < 60) fail(`施設が${facilities.length}件しか取れていません`);

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
      subtitle: `${ty}年${tm}月${td}日入園の募集人数`,
      notes: [
        "町田市が公表している募集人数です。空欄は募集がないことを示します。",
        "認定こども園の定員・募集人数は、保育を必要とする2号・3号認定のものです。1号認定は園に直接お問い合わせください。",
        "家庭的保育者（保育ママ）は0歳児から2歳児クラスまでです。3歳児以降も保育が必要な場合は改めて申請が必要です。",
        ...(noteCells.length > 0
          ? [`次の欄は人数ではなく注記が入っています: ${noteCells.join("、")}`]
          : []),
      ],
      wards,
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

    const ageTotals = Array.from({ length: AGE_COUNT }, (_, age) =>
      facilities.reduce((acc, f) => acc + (f.vacancy[age] ?? 0), 0)
    );
    console.log(`書き出しました: ${path.relative(process.cwd(), OUT_PATH)}`);
    console.log(`  人数ではなく注記が入っていた欄: ${noteCells.length}件`);
    console.log("");
    for (const [i, wd] of wards.entries()) {
      console.log(`  ${wd} ${facilities.filter((f) => f.w === i).length}施設`);
    }
    console.log("");
    for (const [i, cat] of categories.entries()) {
      console.log(`  ${cat} ${facilities.filter((f) => f.c === i).length}施設`);
    }
    console.log("");
    console.log("  年齢 | 募集");
    ageTotals.forEach((v, age) => console.log(`  ${age}歳児 | ${v}`));
    console.log(`  合計 | ${ageTotals.reduce((a, b) => a + b, 0)}`);
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

main().catch((err) => fail(String(err)));
