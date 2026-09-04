/**
 * 浦安市の認可保育園等の空き状況を取り込む
 *
 * 実行: npm run vacancy:fetch:urayasu
 *
 * ## この自治体の特徴
 * - **1施設が5行**（受入定員／現況／退園予定／空き／備考）。園番号と園名は先頭の行に入る
 * - 当サイトが載せるのは「空き」の行。**在籍児童数として「現況」の行も持てる**
 * - **各行に「計」の列がある**ので、年齢別の積み上げと突き合わせて検算できる。
 *   さらに「受入定員 − 現況 + 退園予定 = 空き」が成り立つかも見られる
 * - **園番号がある**ので、重複していないかで取り違えに気づける
 *   （番号は施設の種類ごとに100番台・400番台と分かれるので通し番号ではない）
 * - 「備考」の行は「空きなし」などの文字が入るので人数としては読まない
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "urayasu";
const MUNICIPALITY_NAME = "浦安市";
const SOURCE_NAME = "浦安市「利用調整後空き状況表・申請者数」";
const INDEX_URL = "https://www.city.urayasu.lg.jp/kodomo/hoiku/hoikuen/1033663/1046823.html";
const AGE_COUNT = 6;

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const EXTRACTOR = path.join(process.cwd(), "scripts", "urayasu-pdf-extract.py");

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
  return s.replace(/[０-９]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xfee0));
}

function stripTags(html: string): string {
  return html.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();
}

function squeeze(s: string): string {
  return (s ?? "").replace(/[\s　]/g, "");
}

function parseValue(raw: string, where: string): number | null {
  // 桁区切りのカンマが入ることがある（合計の列）
  const t = toHalfWidth(squeeze(raw)).replace(/[,，]/g, "");
  if (t === "" || t === "-" || t === "－" || t === "―") return null;
  if (/^-?\d+$/.test(t)) return Number(t);
  fail(`${where}: 人数として読めません: 「${raw}」`);
}

type PdfTable = { head: string[]; rows: string[][] };
type PdfResult = { asOf: number[][]; target: number[][]; tables: PdfTable[] };

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
  console.log(`${MUNICIPALITY_NAME}の空き状況を取り込みます`);
  console.log(`公式ページ: ${INDEX_URL}\n`);

  const ua = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";
  const res = await fetch(INDEX_URL, { headers: { "User-Agent": ua } });
  if (!res.ok) fail(`公式ページが ${res.status} を返しました`);
  const html = await res.text();

  // 「令和8年9月利用調整後空き状況表・申請者数 （PDF 205.5KB）」。4月は1次・2次がある
  const links = [...html.matchAll(/<a[^>]+href="([^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => ({ url: new URL(m[1], INDEX_URL).toString(), text: toHalfWidth(stripTags(m[2])) }))
    .map((l) => {
      const m = l.text.match(/令和(\d+)年(\d+)月(?:(\d)次)?利用調整後空き状況表/);
      if (!m) return null;
      const year = reiwaToYear(Number(m[1]));
      const month = Number(m[2]);
      const round = Number(m[3] ?? 1);
      return { ...l, year, month, round, sortKey: year * 10000 + month * 100 + round };
    })
    .filter((v): v is NonNullable<typeof v> => v !== null);
  if (links.length === 0) fail("空き状況表のPDFが見つかりません。ページの構成が変わった可能性があります。");
  const latest = links.reduce((a, b) => (b.sortKey > a.sortKey ? b : a));
  console.log(`最新: ${latest.text}\n  ${latest.url}`);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "urayasu-vacancy-"));
  try {
    const r = await fetch(latest.url, { headers: { "User-Agent": ua } });
    if (!r.ok) fail(`PDFの取得に失敗しました（${r.status}）: ${latest.url}`);
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.subarray(0, 4).toString() !== "%PDF") fail(`PDFではありません: ${latest.url}`);
    const file = path.join(tmpDir, "urayasu.pdf");
    fs.writeFileSync(file, buf);

    let pdf: PdfResult;
    try {
      pdf = JSON.parse(runPython([EXTRACTOR, file])) as PdfResult;
    } catch (err) {
      fail(`抽出結果を読めません: ${String(err)}`);
    }

    if (pdf.target.length !== 1) fail(`PDFに審査月が${pdf.target.length}種類あります`);
    const [ty, tm] = pdf.target[0];
    if (reiwaToYear(ty) !== latest.year || tm !== latest.month) {
      fail(`PDFの審査月（${reiwaToYear(ty)}年${tm}月）がリンクの文言と違います。`);
    }
    if (pdf.asOf.length !== 1) fail(`PDFに基準日が${pdf.asOf.length}種類あります`);
    const [ay, am, ad] = pdf.asOf[0];
    const asOf = `${reiwaToYear(ay)}-${String(am).padStart(2, "0")}-${String(ad).padStart(2, "0")}`;
    console.log(`基準日: ${asOf} / 対象: ${latest.year}年${latest.month}月審査後`);

    const facilities: {
      id: string;
      name: string;
      w: null;
      c: null;
      vacancy: (number | null)[];
      vacancyTotal?: number;
      enrolled: (number | null)[];
    }[] = [];
    const seenNo = new Set<number>();
    let rowTotalChecks = 0;
    let formulaChecks = 0;
    const mergedFacilities: string[] = [];

    for (const table of pdf.tables) {
      const head = table.head.map((h) => squeeze(h));
      const noIdx = head.indexOf("園番号");
      const nameIdx = head.indexOf("園名");
      if (noIdx < 0 || nameIdx < 0) fail(`見出しが想定と違います: ${table.head.join(" / ")}`);
      const kindIdx = nameIdx + 1;
      const ageIdx = Array.from({ length: AGE_COUNT }, (_, i) =>
        head.findIndex((h) => toHalfWidth(h) === `${i}歳`)
      );
      if (ageIdx.some((i) => i < 0)) fail(`年齢の見出しが足りません: ${table.head.join(" / ")}`);
      const totalIdx = head.indexOf("計");

      // 園番号のある行から5行が1施設
      for (const [ri, row] of table.rows.entries()) {
        const noRaw = squeeze(row[noIdx] ?? "");
        if (!/^\d+$/.test(toHalfWidth(noRaw))) continue;
        const no = Number(toHalfWidth(noRaw));
        const name = (row[nameIdx] ?? "").replace(/[　\s]+/g, "").trim();
        if (!name) continue;
        // 「合計（認可保育園のみ）」の行は施設ではない
        if (name.startsWith("合計")) continue;
        if (seenNo.has(no)) fail(`園番号が重複しています: ${no}（${name}）`);
        seenNo.add(no);

        // この行から下に「受入定員／現況／退園予定／空き」を探す。
        // **園番号のない「合計」の行がすぐ後ろに続く**ので、そこで打ち切る
        const block: Record<string, string[]> = {};
        for (let i = ri; i < Math.min(ri + 6, table.rows.length); i++) {
          const kind = squeeze(table.rows[i][kindIdx] ?? "");
          if (!kind) continue;
          if (i > ri) {
            const nextNo = squeeze(table.rows[i][noIdx] ?? "");
            const nextName = squeeze(table.rows[i][nameIdx] ?? "");
            if (/^\d+$/.test(toHalfWidth(nextNo))) break;
            if (nextName.startsWith("合計")) break;
          }
          block[kind] = table.rows[i];
        }
        for (const kind of ["受入定員", "現況", "退園予定", "空き"]) {
          if (!block[kind]) fail(`${name}: 「${kind}」の行が見つかりません`);
        }

        const read = (kind: string) =>
          ageIdx.map((c) => parseValue(block[kind][c] ?? "", `浦安市 ${name}（${kind}）`));
        const capacity = read("受入定員");
        const enrolled = read("現況");
        const leaving = read("退園予定");
        const vacancy = read("空き");

        // 「計」との突き合わせ（結合セルの施設は年齢別に並んでいないので除く）
        if (totalIdx >= 0 && capacity.filter((v) => v !== null).length === enrolled.filter((v) => v !== null).length) {
          for (const [kind, values] of [
            ["受入定員", capacity],
            ["現況", enrolled],
            ["退園予定", leaving],
            ["空き", vacancy],
          ] as const) {
            const declared = parseValue(block[kind][totalIdx] ?? "", `浦安市 ${name}（${kind}の計）`);
            const sum = values.reduce((a: number, v) => a + (v ?? 0), 0);
            if (declared !== null && declared !== sum) {
              fail(`${name}: ${kind}の「計」が${declared}なのに年齢別の合計が${sum}です`);
            }
            if (declared !== null) rowTotalChecks++;
          }
        }
        // **保育ママは定員と空きが0〜2歳をまとめた結合セル**（0歳の位置に入り、
        // 1歳・2歳が抽出では None になる）。年齢別の式は成り立たないので、
        // 定員が年齢別に並んでいる施設だけ確かめる
        const capacitySpread = capacity.filter((v) => v !== null).length;
        const enrolledSpread = enrolled.filter((v) => v !== null).length;
        const merged = capacitySpread < enrolledSpread;
        if (merged) mergedFacilities.push(name);
        for (let age = 0; age < AGE_COUNT && !merged; age++) {
          const c = capacity[age];
          const e = enrolled[age];
          const l = leaving[age];
          const v = vacancy[age];
          if (c === null || e === null || l === null || v === null) continue;
          if (c - e + l !== v) {
            fail(
              `${name}: ${age}歳児で「受入定員${c} − 現況${e} + 退園予定${l}」が空き${v}になりません`
            );
          }
          formulaChecks++;
        }

        if (merged) {
          // 0〜2歳をまとめた枠なので、合算値として持つ
          const total = vacancy.find((v) => v !== null) ?? 0;
          facilities.push({
            id: String(no),
            name,
            w: null,
            c: null,
            vacancy: new Array(AGE_COUNT).fill(null),
            vacancyTotal: total,
            enrolled,
          });
        } else {
          facilities.push({ id: String(no), name, w: null, c: null, vacancy, enrolled });
        }
      }
    }

    if (facilities.length < 30) fail(`施設が${facilities.length}件しか取れていません`);
    // **園番号は施設の種類ごとに100番台・400番台と分かれる**ので通し番号にはならない。
    // 重複していないことだけを見る（上のループで確かめている）

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
      previous?.sourceFiles?.vacancy === latest.url &&
      JSON.stringify(previous?.facilities ?? null) === JSON.stringify(facilities)
    ) {
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
      metrics: ["vacancy", "enrolled"],
      subtitle: `${latest.year}年${latest.month}月の利用調整後の空き状況`,
      notes: [
        "浦安市の注記のとおり、利用調整後に退園や内定辞退があった場合は空き状況が随時変わります。",
        "空きは公式の表の「受入定員 − 現況 + 退園予定」と一致することを取り込み時に確かめています。",
        ...(mergedFacilities.length > 0
          ? [
              `保育ママは0〜2歳をまとめた枠で公表されているため、当サイトでは合算値で載せています: ${mergedFacilities.join("、")}`,
            ]
          : []),
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
    const enrolledTotals = Array.from({ length: AGE_COUNT }, (_, age) =>
      facilities.reduce((acc, f) => acc + (f.enrolled[age] ?? 0), 0)
    );
    console.log(`書き出しました: ${path.relative(process.cwd(), OUT_PATH)}`);
    console.log(`  行の「計」との突き合わせ: ${rowTotalChecks}件すべて一致`);
    console.log(`  「定員−現況＋退園予定＝空き」の確認: ${formulaChecks}クラスすべて成立`);
    console.log(`  0〜2歳をまとめた枠の施設（保育ママ）: ${mergedFacilities.length}件`);
    console.log("");
    console.log("  年齢 | 空き | 在籍");
    ageTotals.forEach((v, age) => console.log(`  ${age}歳児 | ${v} | ${enrolledTotals[age]}`));
    console.log(
      `  合計 | ${ageTotals.reduce((a, b) => a + b, 0)} | ${enrolledTotals.reduce((a, b) => a + b, 0)}`
    );
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

main().catch((err) => fail(String(err)));
