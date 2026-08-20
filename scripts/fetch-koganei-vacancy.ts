/**
 * 小金井市の認可保育施設の募集状況を取り込む
 *
 * 実行: npm run vacancy:fetch:koganei
 *
 * ## この自治体の特徴
 * - 表は「設置主体／施設区分／施設（事業者）／0歳児〜5歳児」の9列。設置主体（公立・私立）と
 *   施設区分は縦書きで、変わる行にだけ値が入る
 * - **空欄はそのクラスを設けていない園**。市立くりのみ保育園は4・5歳クラス、市立さくら保育園は
 *   3〜5歳クラスだけで（公式の園ページの認可定員表で確認）、十八・二十コスモ保育園、
 *   アンジェリカ東小金井保育園、にじいろ保育園武蔵小金井は1歳クラスからの園（一覧ページの注記）
 * - 施設名に付く「※」は表下の注記への印なので落とす
 * - 末尾の合計行と積み上げを突き合わせる
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "koganei";
const MUNICIPALITY_NAME = "小金井市";
const SOURCE_NAME = "小金井市「年度途中の認可保育施設の募集状況」";
const INDEX_URL =
  "https://www.city.koganei.lg.jp/kosodatekyoiku/hoikuen/hoikubosyuujoukyou/hoikuennyusyoketuin.html";
const AGE_COUNT = 6;

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const EXTRACTOR = path.join(process.cwd(), "scripts", "koganei-pdf-extract.py");

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

type PdfTable = { head: string[]; rows: string[][] };
type PdfResult = { asOf: number[][]; target: number[]; tables: PdfTable[] };

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
  console.log(`${MUNICIPALITY_NAME}の募集状況を取り込みます`);
  console.log(`公式ページ: ${INDEX_URL}\n`);

  const ua = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";
  const res = await fetch(INDEX_URL, { headers: { "User-Agent": ua } });
  if (!res.ok) fail(`公式ページが ${res.status} を返しました`);
  const html = await res.text();

  // 「令和8年9月入所募集状況（PDF：152KB）」
  const links = [...html.matchAll(/<a[^>]+href="([^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => ({ url: new URL(m[1], INDEX_URL).toString(), text: toHalfWidth(stripTags(m[2])) }))
    .map((l) => {
      const m = l.text.match(/^令和(\d+)年(\d+)月入所募集状況/);
      if (!m) return null;
      // 「令和8年3月入所」は年度ではなく暦の年月なのでそのまま読む
      const year = reiwaToYear(Number(m[1]));
      const month = Number(m[2]);
      return { ...l, year, month, sortKey: year * 100 + month };
    })
    .filter((v): v is NonNullable<typeof v> => v !== null);
  if (links.length === 0) fail("募集状況のPDFが見つかりません。ページの構成が変わった可能性があります。");
  const latest = links.reduce((a, b) => (b.sortKey > a.sortKey ? b : a));
  console.log(`最新: ${latest.text}\n  ${latest.url}`);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "koganei-vacancy-"));
  try {
    const r = await fetch(latest.url, { headers: { "User-Agent": ua } });
    if (!r.ok) fail(`PDFの取得に失敗しました（${r.status}）: ${latest.url}`);
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.subarray(0, 4).toString() !== "%PDF") fail(`PDFではありません: ${latest.url}`);
    const file = path.join(tmpDir, "koganei.pdf");
    fs.writeFileSync(file, buf);

    let pdf: PdfResult;
    try {
      pdf = JSON.parse(runPython([EXTRACTOR, file])) as PdfResult;
    } catch (err) {
      fail(`抽出結果を読めません: ${String(err)}`);
    }

    if (pdf.target.length !== 1) fail(`PDFに対象月が${pdf.target.length}種類あります`);
    if (pdf.target[0] !== latest.month) {
      fail(`PDFの対象月（${pdf.target[0]}月）がリンクの文言（${latest.month}月）と違います。`);
    }
    if (pdf.asOf.length !== 1) fail(`PDFに基準日が${pdf.asOf.length}種類あります`);
    const [ry, am, ad] = pdf.asOf[0];
    const asOf = `${reiwaToYear(ry)}-${String(am).padStart(2, "0")}-${String(ad).padStart(2, "0")}`;
    console.log(`基準日: ${asOf} / 対象: ${latest.year}年${latest.month}月入所`);

    const categories: string[] = [];
    const facilities: {
      id: string;
      name: string;
      w: null;
      c: number;
      vacancy: (number | null)[];
    }[] = [];
    const seenId = new Set<string>();
    const builtByAge = Array.from({ length: AGE_COUNT }, () => 0);
    let declared: number[] | null = null;
    let owner = "";
    let kind = "";

    for (const table of pdf.tables) {
      const head = table.head.map((h) => toHalfWidth(squeeze(h)));
      const ageIdx = Array.from({ length: AGE_COUNT }, (_, i) => head.indexOf(`${i}歳児`));
      if (ageIdx.some((i) => i < 0)) fail(`年齢の見出しが見つかりません: ${table.head.join(" / ")}`);
      const nameIdx = head.findIndex((h) => h.startsWith("施設（"));
      if (nameIdx < 0) fail(`施設名の列が分かりません: ${table.head.join(" / ")}`);

      for (const row of table.rows) {
        const first = squeeze(row[0] ?? "");
        if (first === "合計") {
          declared = ageIdx.map((c) => {
            const t = toHalfWidth(squeeze(row[c] ?? ""));
            if (!/^\d+$/.test(t)) fail(`合計行を読めません: 「${row[c]}」`);
            return Number(t);
          });
          continue;
        }
        if (first) owner = first;
        if (squeeze(row[1] ?? "")) kind = squeeze(row[1]);

        // 施設名の「※」は表の下の注記への印。「(※生後5か月から受入可能）」も同じく注記
        const rawName = squeeze(row[nameIdx] ?? "");
        if (!rawName) continue;
        const name = rawName.replace(/[（(]?※[^）)]*[）)]?$/, "");
        if (!name) fail(`施設名を読めません: 「${rawName}」`);
        if (!owner || !kind) fail(`${name}: 設置主体か施設区分が分かりません`);

        const vacancy = ageIdx.map((c) => {
          const t = toHalfWidth(squeeze(row[c] ?? ""));
          // 空欄はそのクラスを設けていない園
          if (t === "") return null;
          if (!/^\d+$/.test(t)) fail(`${name}: 人数として読めません: 「${row[c]}」`);
          return Number(t);
        });
        vacancy.forEach((v, i) => {
          builtByAge[i] += v ?? 0;
        });

        const category = `${kind}（${owner}）`;
        if (!categories.includes(category)) categories.push(category);
        const id = `${category}-${name}`;
        if (seenId.has(id)) fail(`施設名が重複しています: ${id}`);
        seenId.add(id);
        facilities.push({ id, name, w: null, c: categories.indexOf(category), vacancy });
      }
    }

    if (!declared) fail("合計行が見つかりません。検算ができないので中断します。");
    if (declared.join("/") !== builtByAge.join("/")) {
      fail(`合計行が ${declared.join("/")} なのに積み上げが ${builtByAge.join("/")} です`);
    }
    if (facilities.length < 45) fail(`施設が${facilities.length}件しか取れていません`);

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
      metrics: ["vacancy"],
      subtitle: `${latest.year}年${latest.month}月入所の募集人数`,
      notes: [
        "小金井市が公表している募集人数です。在園児の退園や転園などの状況により変わることがあります。",
        "「—」はそのクラスを設けていない園です。地域型保育事業は2歳クラスまでです。",
        "小金井けやきの森認定こども園は保育園部分の人数です。幼稚園部分は園にお問い合わせください。",
        "家庭的保育室オテテは生後5か月からの受入れです。",
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

    console.log(`書き出しました: ${path.relative(process.cwd(), OUT_PATH)}`);
    console.log(`  合計行との突き合わせ: 一致（${builtByAge.join("/")}）`);
    console.log("");
    for (const [i, cat] of categories.entries()) {
      console.log(`  ${cat} ${facilities.filter((f) => f.c === i).length}施設`);
    }
    console.log("");
    console.log("  年齢 | 募集");
    builtByAge.forEach((v, age) => console.log(`  ${age}歳児 | ${v}`));
    console.log(`  合計 | ${builtByAge.reduce((a, b) => a + b, 0)}`);
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

main().catch((err) => fail(String(err)));
