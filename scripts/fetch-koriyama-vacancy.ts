/**
 * 郡山市の認可保育施設の空き状況を取り込む
 *
 * 実行: npm run vacancy:fetch:koriyama
 *
 * ## この自治体の特徴
 * - 空きは人数ではなく記号（〇＝3名以上空きあり、△＝1〜2名空きあり）
 * - 「空欄：空きなし」と凡例に書かれているので、空欄を「－」という印に置き換えて持つ
 * - **入所対象年齢の列がある**ので、その施設にない歳児と切り分けられる
 * - 表の中の「〇」は凡例の「○」と字体が違うので、凡例のほうに揃える
 * - 地区（小地区）は縦結合。空なら1つ上の行から引き継ぐ
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "koriyama";
const MUNICIPALITY_NAME = "郡山市";
const SOURCE_NAME = "郡山市「認可保育施設の空き状況」";
const INDEX_URL = "https://www.city.koriyama.lg.jp/site/kosodate/21933.html";
const AGE_COUNT = 6;
const UA = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";

const NONE_MARK = "－";
const NONE_LABEL = "空きなし";

const COL_WARD = 1;
const COL_NO = 2;
const COL_NAME = 3;
const COL_TARGET_AGE = 6;
const COL_AGE0 = 7;

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const EXTRACTOR = path.join(process.cwd(), "scripts", "koriyama-pdf-extract.py");

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

function shapeOf(mark: string): string {
  return /^[○◯〇]$/.test(mark) ? "○" : mark;
}

function stripTags(html: string): string {
  return html.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").replace(/[\s　]+/g, " ").trim();
}

/** 見出しから施設の種類を取り出す */
function categoryOf(head: string): string {
  const t = squeeze(head)
    .replace(/^[０-９\d]+/, "")
    .replace(/〔[^〕]*〕/g, "")
    .replace(/空欄：空きなし/g, "");
  // 「認定こども園(幼保連携型認定こども園)」はかっこの中だけで足りる
  const kind = t.match(/^認定こども園[(（](.+)[)）]$/);
  return kind ? kind[1] : t;
}

/** 「生後57日から満2歳まで」「満1歳から」から [下限, 上限] を取る */
function targetAges(raw: string): [number, number] | null {
  const t = toHalfWidth(squeeze(raw));
  let low: number | null = null;
  if (/生後\d+(日|か月|ヶ月|ヵ月)から/.test(t)) low = 0;
  const from = t.match(/満(\d+)歳から/);
  if (from) low = Number(from[1]);
  if (low === null) return null;
  let high = AGE_COUNT - 1;
  const to = t.match(/満(\d+)歳まで/);
  if (to) high = Number(to[1]);
  if (low > high || high >= AGE_COUNT) return null;
  return [low, high];
}

type PdfResult = {
  target: [number, number];
  asOf: [number, number, number];
  legend: { mark: string; label: string }[];
  markCounts: Record<string, number>;
  sections: { name: string; rows: string[][] }[];
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

  const res = await fetch(INDEX_URL, { headers: { "User-Agent": UA } });
  if (!res.ok) fail(`公式ページが ${res.status} を返しました`);
  const html = await res.text();

  // 「令和8年9月入所にかかる認可保育施設の空き状況 [PDFファイル／180KB]」
  const links = [...html.matchAll(/<a[^>]+href="([^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => ({ url: new URL(m[1], INDEX_URL).toString(), text: toHalfWidth(stripTags(m[2])) }))
    .map((l) => {
      const m = squeeze(l.text).match(/令和(\d+)年(\d+)月入所.*空き状況/);
      if (!m) return null;
      const reiwa = Number(m[1]);
      const month = Number(m[2]);
      return { ...l, reiwa, month, sortKey: reiwa * 100 + month };
    })
    .filter((v): v is NonNullable<typeof v> => v !== null);
  if (links.length === 0) fail("空き状況のPDFが見つかりません。ページの構成が変わった可能性があります。");
  const latest = links.reduce((a, b) => (b.sortKey > a.sortKey ? b : a));
  console.log(`最新: ${latest.text}\n  ${latest.url}`);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "koriyama-vacancy-"));
  try {
    const r = await fetch(latest.url, { headers: { "User-Agent": UA } });
    if (!r.ok) fail(`PDFの取得に失敗しました（${r.status}）: ${latest.url}`);
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.subarray(0, 4).toString() !== "%PDF") fail(`PDFではありません: ${latest.url}`);
    const file = path.join(tmpDir, "koriyama.pdf");
    fs.writeFileSync(file, buf);

    let pdf: PdfResult;
    try {
      pdf = JSON.parse(runPython([EXTRACTOR, file])) as PdfResult;
    } catch (err) {
      fail(`抽出結果を読めません: ${String(err)}`);
    }

    const [targetReiwa, targetMonth] = pdf.target;
    if (targetReiwa !== latest.reiwa || targetMonth !== latest.month) {
      fail(
        `PDFの表題（令和${targetReiwa}年${targetMonth}月入所）がリンクの文言（令和${latest.reiwa}年${latest.month}月）と違います`
      );
    }
    const [ay, am, ad] = pdf.asOf;
    const asOf = `${2018 + ay}-${String(am).padStart(2, "0")}-${String(ad).padStart(2, "0")}`;
    if (asOf > todayJst()) fail(`基準日（${asOf}）が今日より先になっています`);
    console.log(`基準日: ${asOf} / 対象: ${targetMonth}月入所`);

    const symbolLegend = pdf.legend
      .map((l) => ({ mark: shapeOf(l.mark), label: l.label, open: true }))
      .sort((a, b) => (a.mark === "○" ? -1 : 1));
    symbolLegend.push({ mark: NONE_MARK, label: NONE_LABEL, open: false });
    console.log(`凡例: ${symbolLegend.map((l) => `${l.mark}＝${l.label}`).join(" / ")}`);
    const legendByShape = new Map(
      symbolLegend.filter((l) => l.mark !== NONE_MARK).map((l) => [shapeOf(l.mark), l.mark])
    );

    const wards: string[] = [];
    const categories: string[] = [];
    const facilities: {
      id: string;
      name: string;
      w: number;
      c: number;
      vacancy: (number | null)[];
      symbols: (string | null)[];
    }[] = [];
    const marks = new Map<string, number>();
    const seenName = new Set<string>();
    const seenNo = new Set<string>();
    let noClass = 0;

    for (const section of pdf.sections) {
      const category = categoryOf(section.name);
      if (!category) fail(`見出しから施設の種類を取り出せません: 「${section.name}」`);
      if (!categories.includes(category)) categories.push(category);
      // 地区は縦結合。表をまたいで引き継がないよう、表ごとにやり直す
      let ward = "";

      for (const row of section.rows) {
        const name = squeeze(row[COL_NAME]);
        if (!name) fail(`${section.name}: 施設名が空の行があります`);
        const rawWard = squeeze(row[COL_WARD]);
        if (rawWard) ward = rawWard;
        if (!ward) fail(`${name}: 地区が分かりません`);
        if (!wards.includes(ward)) wards.push(ward);

        const no = squeeze(row[COL_NO]);
        if (!/^\d+$/.test(toHalfWidth(no))) fail(`${name}: 施設番号を読めません: 「${no}」`);
        if (seenNo.has(no)) fail(`施設番号が重複しています: ${no}（${name}）`);
        seenNo.add(no);
        if (seenName.has(name)) fail(`施設名が重複しています: ${name}`);
        seenName.add(name);

        const ages = targetAges(row[COL_TARGET_AGE]);
        if (!ages) fail(`${name}: 入所対象年齢を読めません: 「${row[COL_TARGET_AGE]}」`);
        const [low, high] = ages;

        const symbols: (string | null)[] = [];
        for (let age = 0; age < AGE_COUNT; age++) {
          const raw = squeeze(row[COL_AGE0 + age] ?? "");
          const inRange = age >= low && age <= high;
          if (raw === "") {
            if (inRange) {
              marks.set(NONE_MARK, (marks.get(NONE_MARK) ?? 0) + 1);
              symbols.push(NONE_MARK);
            } else {
              noClass += 1;
              symbols.push(null);
            }
            continue;
          }
          if (!inRange) {
            fail(
              `${name}: 入所対象年齢は${low}歳児から${high}歳児なのに、${age}歳児に「${raw}」が入っています`
            );
          }
          const mark = legendByShape.get(shapeOf(raw));
          if (!mark) fail(`${name}: 凡例にない記号です: 「${raw}」`);
          marks.set(mark, (marks.get(mark) ?? 0) + 1);
          symbols.push(mark);
        }
        if (symbols.filter((s) => s !== null).length === 0) fail(`${name}: 全てのクラスが空です`);

        facilities.push({
          id: no,
          name,
          w: wards.indexOf(ward),
          c: categories.indexOf(category),
          vacancy: new Array(AGE_COUNT).fill(null),
          symbols,
        });
      }
    }

    if (facilities.length < 70) fail(`施設が${facilities.length}件しか取れていません`);
    for (const [mark, count] of marks) {
      if (mark === NONE_MARK) continue;
      const inText = Object.entries(pdf.markCounts)
        .filter(([m]) => shapeOf(m) === shapeOf(mark))
        .reduce((acc, [, v]) => acc + v, 0);
      if (count !== inText) {
        fail(`「${mark}」の数が合いません（PDFの文字 ${inText}個 / 取り込み ${count}個）`);
      }
    }
    console.log("記号の数はPDFの文字と一致しました");

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
      metrics: ["symbol"],
      subtitle: `${targetMonth}月入所の空き状況`,
      notes: [
        "郡山市は空き状況を人数ではなく記号で公表しています。当サイトでも公式の記号のまま載せています。",
        `公式の表で空欄になっているところは「${NONE_LABEL}」という意味なので、当サイトでは「${NONE_MARK}」で表しています。`,
        "在園児の退所や保育士数の変動などにより、空き状況が変わることがあります。空きがあっても入所を確約するものではありません。",
        "空きなしの施設にも申し込めますが、空きありの施設に比べて入所の可能性は低くなります。",
        "年齢はその年度の4月1日時点のものです。入所対象年齢の外の歳児は「—」にしています。",
      ],
      wards,
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
    console.log(`  ${facilities.length}施設 / ${wards.length}地区 / ${categories.length}種類`);
    console.log(`  入所対象年齢の外だった歳児: ${noClass}`);
    console.log("");
    console.log("  記号の出てきた数");
    for (const item of symbolLegend) {
      console.log(`  ${item.mark}（${item.label}） ${marks.get(item.mark) ?? 0}`);
    }
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

main().catch((err) => fail(String(err)));
