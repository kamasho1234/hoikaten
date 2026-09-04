/**
 * 北区の保育園の空き人数・入園申込状況を取り込む
 *
 * 実行: npm run vacancy:fetch:kita
 *
 * ## この自治体の特徴
 * - **空き人数と申請者数の両方を公開している**（横浜市・文京区に次いで3例め）
 * - 申請者数は「総数」と「第1希望の内数」が1つのセルに並ぶ（「9 2」＝総数9・第1希望2）。
 *   当サイトが持つのは総数のほう
 * - **方面（王子・滝野川／赤羽）で分かれるのは認可保育園だけ**。
 *   小規模・事業所内・認定こども園・家庭的保育は方面が示されないので方面なしで持つ
 * - 「3歳児・4歳児・5歳児」のように複数の学年をまとめた列がある。
 *   その場合は若い方の学年に載せ、まとめた施設を注記に出す
 * - 園名は均等割付で1文字ずつ空いている（「王 子 本 町」）ので空白を落とす
 * - 「-」はそのクラスを設けていない、0は空きなし
 *
 * ## 検算
 * 合計行がないので、代わりに**申請者数の第1希望の内数が総数を超えていないか**を全クラスで見る。
 * 列がずれれば必ずどこかで引っかかる。あわせて園コードの重複も見る。
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "kita";
const MUNICIPALITY_NAME = "北区";
const SOURCE_NAME = "北区「保育園空き人数及び申込状況」";
const INDEX_URL =
  "https://www.city.kita.lg.jp/children-edu/childcare/1002975/1002976/1002977/1018588.html";
const AGE_COUNT = 6;

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const EXTRACTOR = path.join(process.cwd(), "scripts", "kita-pdf-extract.py");

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

function parseValue(v: string, where: string): number | null {
  const t = toHalfWidth(squeeze(v));
  if (t === "" || t === "-" || t === "－" || t === "―") return null;
  if (/^\d+$/.test(t)) return Number(t);
  fail(`${where}: 人数として読めません: 「${v}」`);
}

type PdfTable = { section: string; head: string[]; labelByRow: string[]; rows: string[][] };
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
  console.log(`${MUNICIPALITY_NAME}の空き人数・申込状況を取り込みます`);
  console.log(`公式ページ: ${INDEX_URL}\n`);

  const ua = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";
  const res = await fetch(INDEX_URL, { headers: { "User-Agent": ua } });
  if (!res.ok) fail(`公式ページが ${res.status} を返しました`);
  const html = await res.text();

  // 「令和8年9月期 保育園空き人数及び申込状況（PDF 697.9KB）」。4月期は一次・二次がある
  const links = [...html.matchAll(/<a[^>]+href="([^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => ({ url: new URL(m[1], INDEX_URL).toString(), text: toHalfWidth(stripTags(m[2])) }))
    .map((l) => {
      const m = l.text.match(/令和(\d+)年(\d+)月期(?:（(一|二)次）)?\s*保育園空き人数/);
      if (!m) return null;
      const year = reiwaToYear(Number(m[1]));
      const month = Number(m[2]);
      const round = m[3] === "二" ? 2 : 1;
      return { ...l, year, month, round, sortKey: year * 10000 + month * 100 + round };
    })
    .filter((v): v is NonNullable<typeof v> => v !== null);
  if (links.length === 0) fail("空き人数のPDFリンクが見つかりません。ページの構成が変わった可能性があります。");
  const latest = links.reduce((a, b) => (b.sortKey > a.sortKey ? b : a));
  console.log(`最新: ${latest.text}\n  ${latest.url}`);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "kita-vacancy-"));
  try {
    const pdfRes = await fetch(latest.url, { headers: { "User-Agent": ua } });
    if (!pdfRes.ok) fail(`PDFの取得に失敗しました（${pdfRes.status}）: ${latest.url}`);
    const buf = Buffer.from(await pdfRes.arrayBuffer());
    if (buf.subarray(0, 4).toString() !== "%PDF") fail(`PDFではありません: ${latest.url}`);
    const file = path.join(tmpDir, "kita.pdf");
    fs.writeFileSync(file, buf);

    let pdf: PdfResult;
    try {
      pdf = JSON.parse(runPython([EXTRACTOR, file])) as PdfResult;
    } catch (err) {
      fail(`抽出結果を読めません: ${String(err)}`);
    }

    if (pdf.asOf.length !== 1) fail(`PDFに基準日が${pdf.asOf.length}種類あります`);
    const [ay, am, ad] = pdf.asOf[0];
    const asOf = `${reiwaToYear(ay)}-${String(am).padStart(2, "0")}-${String(ad).padStart(2, "0")}`;
    if (pdf.target.length !== 1) fail(`PDFに対象月が${pdf.target.length}種類あります`);
    const [ty, tm] = pdf.target[0];
    if (reiwaToYear(ty) !== latest.year || tm !== latest.month) {
      fail(`PDFの対象月（${reiwaToYear(ty)}年${tm}月）がリンクの文言（${latest.year}年${latest.month}月）と違います。`);
    }
    console.log(`基準日: ${asOf} / 対象: ${latest.year}年${latest.month}月期`);

    const wards: string[] = [];
    const categories: string[] = [];
    const facilities: {
      id: string;
      name: string;
      w: number | null;
      c: number;
      vacancy: (number | null)[];
      waiting: (number | null)[];
    }[] = [];
    const seenCode = new Set<string>();
    const seenName = new Set<string>();
    const mergedClasses: string[] = [];
    let consistencyChecks = 0;

    for (const table of pdf.tables) {
      const head = table.head;
      // 「王子・滝野川方面 令和8年7月30日 現在」から方面だけを取り出す
      const wardMatch = table.section.match(/^(.+方面)\s/);
      const ward = wardMatch ? wardMatch[1] : null;
      const sectionName = ward
        ? null
        : table.section.replace(/\s*令和\d+年\d+月\d+日\s*現在\s*$/, "").trim();

      // 年齢の見出しから、その列がどの学年を指すかを読む
      const ageCols: { col: number; ages: number[] }[] = [];
      for (const [i, h] of head.entries()) {
        const ages = [...h.matchAll(/(\d)歳児/g)].map((m) => Number(m[1]));
        if (ages.length > 0) ageCols.push({ col: i, ages });
      }
      if (ageCols.length === 0) fail(`年齢の見出しが見つかりません: ${head.join(" / ")}`);

      const codeIdx = head.findIndex((h) => h === "園コード");
      if (codeIdx < 0) fail(`園コードの列が見つかりません: ${head.join(" / ")}`);
      const nameIdx = head.findIndex((h) => /^歳児(保育園名|施設名)$/.test(h));
      if (nameIdx < 0) fail(`施設名の列が見つかりません: ${head.join(" / ")}`);
      const hasLabel = codeIdx > 0;

      for (const [ri, row] of table.rows.entries()) {
        if (ri < 2) continue; // 見出し2行
        const code = squeeze(row[codeIdx] ?? "");
        const name = squeeze(row[nameIdx] ?? "");
        if (!code || !name) continue;
        if (!/^\d/.test(toHalfWidth(code))) continue;

        // 公立／私立は左端の縦書き。方面の表では類型そのものになる
        const label = hasLabel ? table.labelByRow[ri] : "";
        const category = ward
          ? label || "認可保育園"
          : label
            ? `${sectionName}（${label}）`
            : (sectionName ?? "");
        if (!category) fail(`${name}: 施設の種類が分かりません`);
        if (!categories.includes(category)) categories.push(category);
        let w: number | null = null;
        if (ward) {
          if (!wards.includes(ward)) wards.push(ward);
          w = wards.indexOf(ward);
        }

        const vacancy: (number | null)[] = new Array(AGE_COUNT).fill(null);
        const waiting: (number | null)[] = new Array(AGE_COUNT).fill(null);
        for (const { col, ages } of ageCols) {
          const v = parseValue(row[col] ?? "", `北区 ${name}`);
          // 申請者数のセルは「総数 第1希望の内数」の2つ組
          const applied = squeeze(row[col + 1] ?? "").replace(/[-－―]/g, "-");
          const parts = toHalfWidth(row[col + 1] ?? "").trim().split(/\s+/).filter(Boolean);
          let total: number | null = null;
          if (parts.length === 2) {
            total = parseValue(parts[0], `北区 ${name}（申請者数）`);
            const first = parseValue(parts[1], `北区 ${name}（第1希望）`);
            if (total !== null && first !== null) {
              if (first > total) {
                fail(`${name}: 第1希望${first}が申請者数の総数${total}を超えています`);
              }
              consistencyChecks++;
            }
          } else if (applied !== "" && applied !== "--" && applied !== "-") {
            fail(`${name}: 申請者数を読めません: 「${row[col + 1]}」`);
          }

          if (ages.length > 1) {
            mergedClasses.push(`${name}（${ages.map((a) => `${a}歳児`).join("・")}）`);
          }
          // まとめられた列は若い方の学年に載せる
          vacancy[ages[0]] = v;
          waiting[ages[0]] = total;
        }

        const id = `${code}-${name}`;
        if (seenCode.has(code)) fail(`園コードが重複しています: ${code}（${name}）`);
        seenCode.add(code);
        if (seenName.has(name)) fail(`施設名が重複しています: ${name}`);
        seenName.add(name);
        facilities.push({ id, name, w, c: categories.indexOf(category), vacancy, waiting });
      }
    }

    if (facilities.length < 100) fail(`施設が${facilities.length}件しか取れていません`);

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
      metrics: ["vacancy", "waiting"],
      subtitle: `${latest.year}年${latest.month}月期の空き人数と申請者数`,
      waitingCaveat:
        "申請者数は、その園を希望に書いた方の総数です（第1希望以外も含みます）。1人が複数の園を書けるので、そのまま倍率にはなりません。",
      notes: [
        "北区の注記のとおり、空き人数は在籍児童数から算出したもので、その後の入退園などで変わることがあります。",
        "第1希望かどうかで利用調整が有利になることはありません。",
        "方面（王子・滝野川／赤羽）が公表されているのは認可保育園だけです。",
        ...(mergedClasses.length > 0
          ? [
              `次の施設は複数の学年をまとめて公表されています。当サイトでは若い方の学年に載せています: ${[...new Set(mergedClasses)].join("、")}`,
            ]
          : []),
      ],
      wards,
      categories,
      facilities,
    };

    const { facilities: _f, ...meta } = dataset;
    const metaJson = JSON.stringify(meta, null, 2);
    const head = metaJson.slice(0, metaJson.lastIndexOf("}")).trimEnd();
    const bodyJson = facilities.map((f) => `    ${JSON.stringify(f)}`).join(",\n");
    const out = `${head},\n  "facilities": [\n${bodyJson}\n  ]\n}\n`;
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
    console.log(`  データ時点: ${asOf}`);
    console.log(`  第1希望≦総数の突き合わせ: ${consistencyChecks}クラスすべて矛盾なし`);
    console.log("");
    for (const [i, cat] of categories.entries()) {
      const list = facilities.filter((f) => f.c === i);
      const v = list.reduce((a, f) => a + f.vacancy.reduce((x: number, y) => x + (y ?? 0), 0), 0);
      console.log(`  ${cat} ${list.length}施設 / 空き${v}`);
    }
    console.log("");
    console.log("  年齢 | 空き | 申請者数");
    ageTotals.forEach((v, age) => console.log(`  ${age}歳児 | ${v} | ${waitTotals[age]}`));
    console.log(
      `  合計 | ${ageTotals.reduce((a, b) => a + b, 0)} | ${waitTotals.reduce((a, b) => a + b, 0)}`
    );
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

main().catch((err) => fail(String(err)));
