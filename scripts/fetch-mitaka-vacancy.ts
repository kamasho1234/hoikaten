/**
 * 三鷹市の保育園等の募集人数・申込者数を取り込む
 *
 * 実行: npm run vacancy:fetch:mitaka
 *
 * ## この自治体の特徴
 * - **募集人数と申込者数の両方を実数で公開している**（横浜市・文京区・北区などと同じ）
 * - **1施設が2行**（上が「募集」、下が「申込」）で、園名のセルはその2行にまたがる。
 *   pdfplumber の表抽出では園名が壊れるため、座標から読み直している
 *   （詳しくは mitaka-pdf-extract.py）
 * - 施設の種類は表の見出し（公立／私立／公私連携型／小規模保育施設）
 * - **各行に「計」の列がある**ので、年齢別の積み上げと1施設ずつ突き合わせて検算できる
 * - 末尾に園名のない合計行がある
 *
 * ## 申込者数の読み方
 * 入園希望月の前月末までに申し込んだ人数。1人が複数園を希望できるので、
 * そのまま倍率にはならない。
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "mitaka";
const MUNICIPALITY_NAME = "三鷹市";
const SOURCE_NAME = "三鷹市「毎月1日入所 募集人数・申込者数」";
const INDEX_URL = "https://www.city.mitaka.lg.jp/c_service/118/118737.html";
const AGE_COUNT = 6;

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const EXTRACTOR = path.join(process.cwd(), "scripts", "mitaka-pdf-extract.py");

function fail(message: string): never {
  console.error(`\n[中断] ${message}`);
  process.exit(1);
}

function todayJst(): string {
  const jst = new Date(Date.now() + 9 * 60 * 60 * 1000);
  return jst.toISOString().slice(0, 10);
}

function reiwaToYear(reiwa: number): number {
  return 2018 + reiwa;
}

function toHalfWidth(s: string): string {
  return s
    .replace(/[０-９]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xfee0))
    .replace(/[一二三四五六七八九]/g, (c) => String("一二三四五六七八九".indexOf(c) + 1));
}

function stripTags(html: string): string {
  return html.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();
}

function squeeze(s: string): string {
  return (s ?? "").replace(/[\s　]/g, "");
}

/** 空欄はそのクラスの受け入れがない */
function parseValue(raw: string, where: string): number | null {
  const t = toHalfWidth(squeeze(raw));
  if (t === "" || t === "-" || t === "－" || t === "―") return null;
  if (/^\d+$/.test(t)) return Number(t);
  fail(`${where}: 人数として読めません: 「${raw}」`);
}

type PdfTable = { head: string[]; rows: string[][] };
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

async function main() {
  console.log(`${MUNICIPALITY_NAME}の募集人数・申込者数を取り込みます`);
  console.log(`公式ページ: ${INDEX_URL}\n`);

  const ua = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";
  const res = await fetch(INDEX_URL, { headers: { "User-Agent": ua } });
  if (!res.ok) fail(`公式ページが ${res.status} を返しました`);
  const html = await res.text();

  // 「令和8年9月1日入所募集人数及び申込者数（PDF 262KB）」
  const links = [...html.matchAll(/<a[^>]+href="([^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => ({ url: new URL(m[1], INDEX_URL).toString(), text: toHalfWidth(stripTags(m[2])) }))
    .map((l) => {
      const m = l.text.match(/令和(\d+)年(\d+)月(\d+)日入所募集人数及び申込者数/);
      if (!m) return null;
      const year = reiwaToYear(Number(m[1]));
      const month = Number(m[2]);
      return { ...l, year, month, day: Number(m[3]), sortKey: year * 100 + month };
    })
    .filter((v): v is NonNullable<typeof v> => v !== null);
  if (links.length === 0) fail("募集人数のPDFが見つかりません。ページの構成が変わった可能性があります。");
  const latest = links.reduce((a, b) => (b.sortKey > a.sortKey ? b : a));
  console.log(`最新: ${latest.text}\n  ${latest.url}`);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "mitaka-vacancy-"));
  try {
    const r = await fetch(latest.url, { headers: { "User-Agent": ua } });
    if (!r.ok) fail(`PDFの取得に失敗しました（${r.status}）: ${latest.url}`);
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.subarray(0, 4).toString() !== "%PDF") fail(`PDFではありません: ${latest.url}`);
    const file = path.join(tmpDir, "mitaka.pdf");
    fs.writeFileSync(file, buf);

    let pdf: PdfResult;
    try {
      pdf = JSON.parse(runPython([EXTRACTOR, file])) as PdfResult;
    } catch (err) {
      fail(`抽出結果を読めません: ${String(err)}`);
    }

    if (pdf.target.length !== 1) fail(`PDFに入所日が${pdf.target.length}種類あります`);
    const [ty, tm, td] = pdf.target[0];
    if (reiwaToYear(ty) !== latest.year || tm !== latest.month) {
      fail(`PDFの入所月（${reiwaToYear(ty)}年${tm}月）がリンクの文言と違います。`);
    }
    const asOf = `${reiwaToYear(ty)}-${String(tm).padStart(2, "0")}-${String(td).padStart(2, "0")}`;
    console.log(`対象: ${reiwaToYear(ty)}年${tm}月${td}日入所`);

    const categories: string[] = [];
    const facilities: {
      id: string;
      name: string;
      w: null;
      c: number;
      vacancy: (number | null)[];
      waiting: (number | null)[];
    }[] = [];
    const seenId = new Set<string>();
    let rowTotalChecks = 0;
    let totalRows = 0;

    for (const table of pdf.tables) {
      const head = table.head.map((h) => squeeze(h));
      const nameIdx = head.findIndex((h) => h.includes("園名"));
      if (nameIdx < 0) fail(`園名の列が分かりません: ${table.head.join(" / ")}`);
      // 「公立　園名／年齢」→「公立」
      const category = squeeze(table.head[nameIdx]).replace(/園名.*$/, "");
      if (!category) fail(`施設の種類が分かりません: 「${table.head[nameIdx]}」`);
      if (!categories.includes(category)) categories.push(category);

      const ageIdx = Array.from({ length: AGE_COUNT }, (_, i) =>
        head.findIndex((h) => toHalfWidth(h) === `${i}歳`)
      );
      if (ageIdx.some((i) => i < 0)) fail(`年齢の見出しが足りません: ${table.head.join(" / ")}`);
      const totalIdx = head.indexOf("計");
      // 「募集」「申込」が入る列は園名の右どなり
      const kindIdx = nameIdx + 1;

      // 上の行が「募集」、次の行が「申込」。園名は両方の行に入っている
      for (let i = 0; i + 1 < table.rows.length; i++) {
        const a = table.rows[i];
        const b = table.rows[i + 1];
        if (squeeze(a[kindIdx] ?? "") !== "募集") continue;
        if (squeeze(b[kindIdx] ?? "") !== "申込") continue;
        i++; // 申込の行はここで消費する

        // **園名が長いと2行に割れる**（「椎の実」＋「子供の家」＝椎の実子供の家）。
        // 上下が同じなら1つ、違うなら上から順につなぐ
        const top = (a[nameIdx] ?? "").replace(/[　\s]+/g, "").trim();
        const bottom = (b[nameIdx] ?? "").replace(/[　\s]+/g, "").trim();
        const name = top === bottom ? top : `${top}${bottom}`;
        if (!name) {
          // 園名のない行は表の末尾の合計
          totalRows++;
          continue;
        }

        const vacancy = ageIdx.map((c) => parseValue(a[c] ?? "", `三鷹市 ${name}（募集）`));
        const waiting = ageIdx.map((c) => parseValue(b[c] ?? "", `三鷹市 ${name}（申込）`));
        if (totalIdx >= 0) {
          for (const [label, row, values] of [
            ["募集", a, vacancy],
            ["申込", b, waiting],
          ] as const) {
            const declared = parseValue(row[totalIdx] ?? "", `三鷹市 ${name}（${label}の計）`);
            const sum = values.reduce((x: number, v) => x + (v ?? 0), 0);
            if (declared !== null && declared !== sum) {
              fail(`${name}: ${label}の「計」が${declared}なのに年齢別の合計が${sum}です`);
            }
            if (declared !== null) rowTotalChecks++;
          }
        }

        const id = `${category}-${name}`;
        if (seenId.has(id)) fail(`施設名が重複しています: ${id}`);
        seenId.add(id);
        facilities.push({
          id,
          name,
          w: null,
          c: categories.indexOf(category),
          vacancy,
          waiting,
        });
      }
    }

    if (facilities.length < 40) fail(`施設が${facilities.length}件しか取れていません`);

    const previous = fs.existsSync(OUT_PATH)
      ? (JSON.parse(fs.readFileSync(OUT_PATH, "utf-8")) as { asOf?: string; facilities?: unknown[] })
      : null;
    if (previous?.facilities && facilities.length < previous.facilities.length * 0.9) {
      fail(
        `施設数が大きく減っています（前回 ${previous.facilities.length}件 → 今回 ${facilities.length}件）`
      );
    }
    if (previous?.asOf === asOf) {
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
      subtitle: `${reiwaToYear(ty)}年${tm}月${td}日入所の募集人数と申込者数`,
      waitingCaveat:
        "申込者数は、その園を希望して申し込んだ方の人数です。1人が複数の園を希望できるので、そのまま倍率にはなりません。",
      notes: [
        "募集人数は入園希望月の前月10日15時に決まります。",
        "空欄はそのクラスの受け入れがないことを示します。",
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

    const ageTotals = Array.from({ length: AGE_COUNT }, (_, age) =>
      facilities.reduce((acc, f) => acc + (f.vacancy[age] ?? 0), 0)
    );
    const waitTotals = Array.from({ length: AGE_COUNT }, (_, age) =>
      facilities.reduce((acc, f) => acc + (f.waiting[age] ?? 0), 0)
    );
    console.log(`書き出しました: ${path.relative(process.cwd(), OUT_PATH)}`);
    console.log(`  行の「計」との突き合わせ: ${rowTotalChecks}件すべて一致`);
    console.log(`  園名のない合計行（除外）: ${totalRows}件`);
    console.log("");
    for (const [i, cat] of categories.entries()) {
      console.log(`  ${cat} ${facilities.filter((f) => f.c === i).length}施設`);
    }
    console.log("");
    console.log("  年齢 | 募集 | 申込");
    ageTotals.forEach((v, age) => console.log(`  ${age}歳児 | ${v} | ${waitTotals[age]}`));
    console.log(
      `  合計 | ${ageTotals.reduce((a, b) => a + b, 0)} | ${waitTotals.reduce((a, b) => a + b, 0)}`
    );
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

main().catch((err) => fail(String(err)));
