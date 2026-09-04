/**
 * 練馬区の認可保育園等の空き状況を取り込む
 *
 * 実行: npm run vacancy:fetch:nerima
 *
 * ## この自治体のやっかいなところ
 * - **空欄が「空きなし」で、黒塗りが「そのクラスを実施していない」**。
 *   pdfplumber の塗りつぶし矩形と年齢列の x 範囲を突き合わせて判別する
 *   （scripts/nerima-pdf-extract.py が座標を返す）
 * - **0歳が「100日以上 / 6か月以上 / 8か月以上」の3列に分かれる**。値はどれか1つにしか入らないので合算する
 * - **「産3」「産」が空き数と同じセルに入る**（産休明け保育の実施と受入上限）。数字だけを空き数として取る
 * - 表の最終行に凡例が紛れ込む。施設コード（10-0001）を持たない行は捨てる
 *
 * ## 安全装置
 * 各行の「計」と年齢別の和が合わなければ中断する。
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "nerima";
const MUNICIPALITY_NAME = "練馬区";
const SOURCE_NAME = "練馬区「認可保育園入園空き状況表」";
const INDEX_URL =
  "https://www.city.nerima.tokyo.jp/kosodatekyoiku/kodomo/hoiku/hoikuen/nyuuen/aki-backnumber.html";
const LINK_BASE = "https://www.city.nerima.tokyo.jp/kosodatekyoiku/kodomo/hoiku/hoikuen/nyuuen/";
const AGE_COUNT = 6;
const MIN_FACILITY_RATIO = 0.9;
const AGE_HEADS = ["0歳", "1歳", "2歳", "3歳", "4歳", "5歳"];

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const RESEARCH_PATH = path.join(
  process.cwd(),
  "scripts",
  "vacancy-research",
  MUNICIPALITY_SLUG,
  "facilities_from_pdf.json"
);
const EXTRACTOR = path.join(process.cwd(), "scripts", "nerima-pdf-extract.py");

function fail(message: string): never {
  console.error(`\n[中断] ${message}`);
  process.exit(1);
}

function todayJst(): string {
  const now = new Date();
  const jst = new Date(now.getTime() + 9 * 60 * 60 * 1000);
  return jst.toISOString().slice(0, 10);
}

function reiwaToYear(reiwa: number): number {
  return 2018 + reiwa;
}

function stripTags(html: string): string {
  return html.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();
}

function toHalfWidth(s: string): string {
  return s.replace(/[０-９]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xfee0));
}

type PdfRow = {
  name: string;
  code: string | null;
  cells: string[];
  header: string[];
  grayRanges: number[][];
  colRanges: Record<string, number[]>;
};
type PdfSection = { page: number; kind: string; area: string; rows: PdfRow[] };
type PdfResult = { asOf: number[][]; target: number[][]; sections: PdfSection[] };

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

/**
 * セルは「産3 1」「3 産3」「産」「2」などの形。空白区切りで、
 * 「産」から始まる語が産休明け保育の表記（数字は受入上限）、ただの数字が空き数。
 * 空白を潰してしまうと「産3 1」と「産31」を区別できなくなるので、抽出側で空白を残している。
 */
function parseCell(v: string, where: string): { value: number; maternity: string | null } {
  const t = (v ?? "").trim();
  if (t === "") return { value: 0, maternity: null };
  let value = 0;
  let maternity: string | null = null;
  let seen = false;
  for (const part of t.split(/\s+/)) {
    if (/^産\d*$/.test(part)) {
      maternity = part;
      continue;
    }
    if (/^\d+$/.test(part)) {
      if (seen) fail(`${where}: 空き数が2つあります: 「${v}」`);
      value = Number(part);
      seen = true;
      continue;
    }
    fail(`${where}: 空き数として読めません: 「${v}」（「${part}」）`);
  }
  return { value, maternity };
}

/**
 * 見出しの並びから、各年齢が使う列インデックスの範囲を決める。
 * - 0歳は受入月齢で3列に割れるので、0歳の見出しから次の年齢の見出しまでをまとめて0歳とする
 * - **小規模保育の表は0〜2歳しかない**。無い年齢は空配列（＝クラスなし）を返す
 * - **認定こども園は「3歳（年少）」のように但し書きが付く**ので前方一致で探す
 */
function ageColumns(header: string[]): number[][] {
  const found = AGE_HEADS.map((label) => header.findIndex((h) => h.startsWith(label)));
  if (found[0] < 0) fail(`見出しに「0歳」がありません: ${header.join("|")}`);
  const end = header.findIndex((h) => h === "計") >= 0 ? header.findIndex((h) => h === "計") : header.length;
  return found.map((start, k) => {
    if (start < 0) return [];
    // 次に見つかる年齢の見出し（無ければ「計」）までがこの年齢の列
    const next = found.slice(k + 1).find((i) => i >= 0) ?? end;
    return Array.from({ length: Math.max(0, next - start) }, (_, d) => start + d);
  });
}

async function main() {
  console.log(`${MUNICIPALITY_NAME}の認可保育園等の空き状況を取り込みます`);
  console.log(`公式ページ: ${INDEX_URL}\n`);

  const res = await fetch(INDEX_URL, {
    headers: { "User-Agent": "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)" },
  });
  if (!res.ok) fail(`公式ページが ${res.status} を返しました`);
  const html = await res.text();

  // 「令和8年8月分（PDF：1,384KB）」のようなリンク。ファイル名は R8_0801_ketsugou.pdf の形
  const links = [...html.matchAll(/<a[^>]+href="([^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => ({
      url: m[1].startsWith("http") ? m[1] : LINK_BASE + m[1].replace(/^\.\//, ""),
      text: toHalfWidth(stripTags(m[2])),
    }))
    .map((l) => {
      const m = l.url.match(/R(\d+)_(\d{2})(\d{2})_/);
      if (!m) return null;
      return {
        ...l,
        year: reiwaToYear(Number(m[1])),
        month: Number(m[2]),
        sortKey: reiwaToYear(Number(m[1])) * 100 + Number(m[2]),
      };
    })
    .filter((v): v is NonNullable<typeof v> => v !== null);
  if (links.length === 0) fail("空き状況表のPDFリンクが見つかりません。ページの構成が変わった可能性があります。");
  const latest = links.reduce((a, b) => (b.sortKey > a.sortKey ? b : a));
  console.log(`最新: ${latest.text || latest.url}\n  ${latest.url}`);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "nerima-vacancy-"));
  try {
    const pdfRes = await fetch(latest.url, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)" },
    });
    if (!pdfRes.ok) fail(`PDFの取得に失敗しました（${pdfRes.status}）: ${latest.url}`);
    const buf = Buffer.from(await pdfRes.arrayBuffer());
    if (buf.subarray(0, 4).toString() !== "%PDF") fail(`PDFではありません: ${latest.url}`);
    const file = path.join(tmpDir, "nerima.pdf");
    fs.writeFileSync(file, buf);

    const raw = runPython([EXTRACTOR, file]);
    let pdf: PdfResult;
    try {
      pdf = JSON.parse(raw) as PdfResult;
    } catch (err) {
      fail(`抽出結果を読めません: ${String(err)}`);
    }

    if (pdf.asOf.length !== 1) fail(`PDFに公表日が${pdf.asOf.length}種類あります`);
    const [ay, am, ad] = pdf.asOf[0];
    const asOf = `${reiwaToYear(ay)}-${String(am).padStart(2, "0")}-${String(ad).padStart(2, "0")}`;
    if (pdf.target.length !== 1) fail(`PDFに対象月が${pdf.target.length}種類あります`);
    const [ty, tm] = pdf.target[0];
    if (reiwaToYear(ty) !== latest.year || tm !== latest.month) {
      fail(`PDFの対象月（${reiwaToYear(ty)}年${tm}月）がファイル名（${latest.year}年${latest.month}月）と違います。`);
    }
    console.log(`公表日: ${asOf} / 対象: ${reiwaToYear(ty)}年${tm}月`);

    const wards: string[] = [];
    const categories: string[] = [];
    const facilities: { id: string; name: string; w: number | null; c: number; vacancy: (number | null)[] }[] = [];
    const research: { id: string; name: string; ward: string; category: string; tel: string; maternity: string | null }[] = [];
    const seen = new Set<string>();
    let mismatched = 0;
    let noClass = 0;
    const duplicatedCodes: string[] = [];
    const closed: string[] = [];

    for (const sec of pdf.sections) {
      // 家庭的保育事業と居宅訪問型は年齢別に分かれていないので、この表からは取り込まない
      if (sec.kind === "家庭的保育事業" || sec.kind === "居宅訪問型保育事業") continue;
      if (!categories.includes(sec.kind)) categories.push(sec.kind);
      const ward = sec.area.replace(/地区$/, "") + "地区";
      const useWard = /地区$/.test(sec.area);
      if (useWard && !wards.includes(ward)) wards.push(ward);

      for (const row of sec.rows) {
        const cols = ageColumns(row.header);
        const where = `${sec.kind} ${row.name}`;
        const vacancy: (number | null)[] = [];
        let maternity: string | null = null;
        for (const [k, idxs] of cols.entries()) {
          const label = AGE_HEADS[k];
          const range = row.colRanges[label];
          // 黒塗り＝そのクラスを実施していない
          const isGray =
            range &&
            row.grayRanges.some(([gx0, gx1]) => gx0 <= range[0] + 1 && gx1 >= range[1] - 1);
          if (isGray) {
            vacancy.push(null);
            noClass++;
            continue;
          }
          if (idxs.length === 0) {
            // その表に無い年齢（小規模保育の3歳以降）はクラスなし
            vacancy.push(null);
            continue;
          }
          let sum = 0;
          for (const i of idxs) {
            const { value, maternity: m } = parseCell(row.cells[i] ?? "", where);
            sum += value;
            if (m) maternity = m;
          }
          vacancy.push(sum);
        }
        // 行の「計」と突き合わせる
        const iTotal = row.header.indexOf("計");
        const totalRaw = iTotal >= 0 ? (row.cells[iTotal] ?? "").trim() : "";
        if (/^\d+$/.test(totalRaw)) {
          const sum = vacancy.reduce((a: number, v) => a + (v ?? 0), 0);
          if (sum !== Number(totalRaw)) {
            mismatched++;
            if (mismatched <= 5) {
              console.log(`  [注意] ${where}: 年齢別の和 ${sum} が「計」${totalRaw} と違います（${row.cells.join("|")}）`);
            }
          }
        }

        // 全年齢が黒塗りの園は、どのクラスも実施していない（谷原保育園）。
        // 申し込み先にならないので掲載しない
        if (vacancy.every((v) => v === null)) {
          closed.push(`${row.name}（${row.code ?? "コードなし"}）`);
          continue;
        }
        // 出典で施設コードが重複していることがある（11-0431 が2園に付いている）。
        // 取り込みを止めずに連番で一意化し、あとから気づけるようログに出す
        const base = row.code ?? `${sec.kind}/${row.name}`;
        let id = base;
        if (seen.has(id)) {
          let n = 2;
          while (seen.has(`${base}_${n}`)) n++;
          id = `${base}_${n}`;
          duplicatedCodes.push(`${base} → ${id}（${row.name}）`);
        }
        seen.add(id);
        const iTel = row.header.indexOf("電話");
        facilities.push({
          id,
          name: row.name,
          w: useWard ? wards.indexOf(ward) : null,
          c: categories.indexOf(sec.kind),
          vacancy,
        });
        research.push({
          id,
          name: row.name,
          ward: useWard ? ward : "",
          category: sec.kind,
          tel: iTel >= 0 ? (row.cells[iTel] ?? "") : "",
          maternity,
        });
      }
    }

    if (mismatched > 0) {
      fail(`年齢別の和と「計」が合わない行が${mismatched}件あります。黒塗りの判定か値の読み取りが誤っている可能性があります。`);
    }
    console.log(`施設 ${facilities.length}件 / 実施していないクラス（黒塗り） ${noClass}件`);
    if (closed.length) {
      console.log(`  全クラスが黒塗りのため掲載しなかった施設: ${closed.length}件（${closed.join("・")}）`);
    }
    if (duplicatedCodes.length) {
      console.log(`  出典で重複していた施設コード: ${duplicatedCodes.join(" / ")}`);
    }

    let previous: { asOf?: string; facilities?: unknown[]; sourceFiles?: Record<string, string> } | null = null;
    if (fs.existsSync(OUT_PATH)) {
      previous = JSON.parse(fs.readFileSync(OUT_PATH, "utf-8"));
      const before = previous?.facilities?.length ?? 0;
      if (before > 0 && facilities.length < before * MIN_FACILITY_RATIO) {
        fail(`施設数が前回（${before}件）の${MIN_FACILITY_RATIO * 100}%を下回りました（${facilities.length}件）。`);
      }
      // 自治体は基準日を変えずに資料を差し替えることがある。
      // 取り込み元の一式も同じときだけ、書き換えを見送る
      if (
        previous?.asOf === asOf &&
        JSON.stringify(previous?.sourceFiles ?? {}) === JSON.stringify({ 空き状況表: latest.url })
      ) {
        console.log(`\n公表日が前回と同じ（${asOf}）なので書き換えません。`);
        return;
      }
    }

    const dataset = {
      municipalitySlug: MUNICIPALITY_SLUG,
      municipalityName: MUNICIPALITY_NAME,
      asOf,
      fetchedAt: todayJst(),
      sourceName: SOURCE_NAME,
      sourceUrl: INDEX_URL,
      sourceFiles: { 空き状況表: latest.url },
      metrics: ["vacancy"],
      subtitle: `${reiwaToYear(ty)}年${tm}月入園ぶんの空き状況`,
      notes: [
        `練馬区が公開しているのは「${reiwaToYear(ty)}年${tm}月入園」の空き状況表です（${asOf}公表）。`,
        "「—」はそのクラスの保育を実施していないことを示します（出典では黒塗り）。0は空きがないことを示します。",
        "0歳児は園によって受け入れる月齢（100日以上・6か月以上・8か月以上）が違います。当サイトでは0歳児としてまとめています。",
        "出典には産休明け保育を実施する園に「産」の表記があります（「産3」は受入が3名まで）。当サイトでは空き数のみを掲載しています。",
        "家庭的保育事業と居宅訪問型保育事業は年齢別の内訳が公表されていないため掲載していません。",
        "すべてのクラスで保育を実施していない園は掲載していません。",
        "空き状況表の公開後に空きが生じることがあります。空きの有無にかかわらず申し込みができます。",
        "練馬区はこの数値をPDFで公開しています。当サイトは表をそのまま読み取って掲載しています。",
      ],
      wards,
      categories,
      facilities,
    };

    const { facilities: _facilities, ...meta } = dataset;
    const metaJson = JSON.stringify(meta, null, 2);
    const head = metaJson.slice(0, metaJson.lastIndexOf("}")).trimEnd();
    const body = facilities.map((f) => `    ${JSON.stringify(f)}`).join(",\n");
    const out = `${head},\n  "facilities": [\n${body}\n  ]\n}\n`;
    try {
      JSON.parse(out);
    } catch (err) {
      fail(`生成したJSONが不正です: ${String(err)}`);
    }
    fs.mkdirSync(path.dirname(OUT_PATH), { recursive: true });
    fs.writeFileSync(OUT_PATH, out, "utf-8");
    fs.mkdirSync(path.dirname(RESEARCH_PATH), { recursive: true });
    fs.writeFileSync(
      RESEARCH_PATH,
      `${JSON.stringify({ asOf, sourceUrl: latest.url, facilities: research }, null, 1)}\n`,
      "utf-8"
    );

    const ageTotals = Array.from({ length: AGE_COUNT }, (_, age) =>
      facilities.reduce((a, f) => a + (f.vacancy[age] ?? 0), 0)
    );
    console.log(`\n書き出しました: ${path.relative(process.cwd(), OUT_PATH)}`);
    console.log(`  データ時点: ${asOf}`);
    console.log(`  施設数: ${facilities.length}`);
    console.log(`  区分: ${categories.join("・")}`);
    console.log("");
    wards.forEach((w, i) => {
      const list = facilities.filter((f) => f.w === i);
      const sum = list.reduce((a, f) => a + f.vacancy.reduce((s: number, v) => s + (v ?? 0), 0), 0);
      console.log(`  ${w.padEnd(8, "　")} ${String(list.length).padStart(3)}施設 / 空き${sum}`);
    });
    console.log("");
    console.log("  年齢 | 空き");
    ageTotals.forEach((v, age) => console.log(`  ${age}歳児 | ${v}`));
    console.log(`  合計 | ${ageTotals.reduce((a, b) => a + b, 0)}`);
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

main().catch((err) => fail(String(err)));
