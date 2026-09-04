/**
 * 松山市の保育所等の入所可能数を取り込む
 *
 * 実行: npm run vacancy:fetch:matsuyama
 *
 * ## この自治体の特徴
 * - 地域（中心部・北条など）が付いているので、地域ごとの集計も出せる
 * - 類型は1文字の記号（保・認・小・事）。注意事項の凡例のとおりに読み替える
 * - **1施設ずつ「合計」の列がある**ので、年齢の和と突き合わせて1行ずつ検算できる
 * - 「-」はそのクラスを設けていない（乳児保育園・小規模・事業所内は2歳児まで）
 * - 施設名が長いと2行に割れるので、行をまたいでつなげる
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "matsuyama";
const MUNICIPALITY_NAME = "松山市";
const SOURCE_NAME = "松山市「保育所等入所可能数」";
const INDEX_URL =
  "https://www.city.matsuyama.ehime.jp/kurashi/kosodate/boshi/R2nen4gatsu-shinki/kanousuu.html";
const AGE_COUNT = 6;

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const EXTRACTOR = path.join(process.cwd(), "scripts", "matsuyama-pdf-extract.py");

/** 注意事項の凡例のとおりに読み替える */
const KIND_LABEL: Record<string, string> = {
  保: "認可保育所",
  認: "認定こども園（保育所部分）",
  小: "小規模保育事業",
  事: "事業所内保育所",
};

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

type PdfResult = { target: number[]; head: string[]; sub: string[]; rows: string[][] };

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
  console.log(`${MUNICIPALITY_NAME}の入所可能数を取り込みます`);
  console.log(`公式ページ: ${INDEX_URL}\n`);

  const ua = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";
  const res = await fetch(INDEX_URL, { headers: { "User-Agent": ua } });
  if (!res.ok) fail(`公式ページが ${res.status} を返しました`);
  const html = await res.text();

  // 「令和8年10月保育所等入所可能数（PDF：244KB）」
  const links = [...html.matchAll(/<a[^>]+href="([^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => ({ url: new URL(m[1], INDEX_URL).toString(), text: toHalfWidth(stripTags(m[2])) }))
    .map((l) => {
      const m = l.text.match(/^令和(\d+)年(\d+)月保育所等入所可能数/);
      if (!m) return null;
      const year = reiwaToYear(Number(m[1]));
      const month = Number(m[2]);
      return { ...l, year, month, sortKey: year * 100 + month };
    })
    .filter((v): v is NonNullable<typeof v> => v !== null);
  if (links.length === 0) fail("入所可能数のPDFが見つかりません。ページの構成が変わった可能性があります。");
  const latest = links.reduce((a, b) => (b.sortKey > a.sortKey ? b : a));
  console.log(`最新: ${latest.text}\n  ${latest.url}`);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "matsuyama-vacancy-"));
  try {
    const r = await fetch(latest.url, { headers: { "User-Agent": ua } });
    if (!r.ok) fail(`PDFの取得に失敗しました（${r.status}）: ${latest.url}`);
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.subarray(0, 4).toString() !== "%PDF") fail(`PDFではありません: ${latest.url}`);
    const file = path.join(tmpDir, "matsuyama.pdf");
    fs.writeFileSync(file, buf);

    let pdf: PdfResult;
    try {
      pdf = JSON.parse(runPython([EXTRACTOR, file])) as PdfResult;
    } catch (err) {
      fail(`抽出結果を読めません: ${String(err)}`);
    }

    const [ty, tm] = pdf.target;
    if (reiwaToYear(ty) !== latest.year || tm !== latest.month) {
      fail(`PDFの対象月（令和${ty}年${tm}月）がリンクの文言（${latest.year}年${latest.month}月）と違います。`);
    }
    // 入所可能数には基準日が書かれていないので、対象月の前月1日を時点として扱う
    const asOfDate = new Date(Date.UTC(latest.year, latest.month - 2, 1));
    const asOf = asOfDate.toISOString().slice(0, 10);
    console.log(`対象: ${latest.year}年${latest.month}月入所`);

    const head = pdf.head.map((h) => squeeze(h));
    const sub = pdf.sub.map((h) => toHalfWidth(squeeze(h)));
    const ageIdx = Array.from({ length: AGE_COUNT }, (_, i) => sub.indexOf(`${i}歳`));
    if (ageIdx.some((i) => i < 0)) fail(`年齢の見出しが見つかりません: ${pdf.sub.join(" / ")}`);
    const wardIdx = head.indexOf("地域");
    const kindIdx = head.indexOf("類型");
    const nameIdx = head.indexOf("施設名");
    const totalIdx = head.indexOf("合計");
    if (wardIdx < 0 || kindIdx < 0 || nameIdx < 0 || totalIdx < 0) {
      fail(`見出しが想定と違います: ${pdf.head.join(" / ")}`);
    }

    const parseValue = (raw: string, where: string): number | null => {
      const t = toHalfWidth(squeeze(raw));
      // 「-」はそのクラスを設けていない。使われる横棒の種類がそろっていないので幅広く見る
      if (t === "" || /^[-－―‐‒–—ー−]$/.test(t)) return null;
      // 「0（満3歳）」のように、対象を断る注記が数のうしろに付くことがある。
      // 数だけを採り、注記があったことは注記欄で断る
      const noted = t.match(/^(\d+)[（(][^）)]*[）)]$/);
      if (noted) {
        hasAgeLimitNote = true;
        return Number(noted[1]);
      }
      if (!/^\d+$/.test(t)) fail(`${where}: 人数として読めません: 「${raw}」`);
      return Number(t);
    };

    /** 「0（満3歳）」のような、対象を断る注記が付いた欄があったか */
    let hasAgeLimitNote = false;
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
    const builtByAge = Array.from({ length: AGE_COUNT }, () => 0);
    let ward = "";
    let kind = "";

    for (const row of pdf.rows) {
      const first = squeeze(row[wardIdx] ?? "");
      if (first) ward = first;
      const kindMark = squeeze(row[kindIdx] ?? "");
      if (kindMark) {
        const label = KIND_LABEL[kindMark];
        if (!label) fail(`類型の記号が分かりません: 「${kindMark}」`);
        kind = label;
      }

      const name = squeeze(row[nameIdx] ?? "");
      const totalRaw = toHalfWidth(squeeze(row[totalIdx] ?? ""));
      // 施設名だけの行（名前が2行に割れた続き）や、注意事項の行は数として読まない
      if (!name || !/^\d+$/.test(totalRaw)) continue;
      if (!ward || !kind) fail(`${name}: 地域か類型が分かりません`);

      const vacancy = ageIdx.map((c) => parseValue(row[c] ?? "", `松山市 ${name}`));
      // 1施設ずつ「年齢の和＝合計列」を確かめる
      const sum = vacancy.reduce((a: number, v) => a + (v ?? 0), 0);
      if (Number(totalRaw) !== sum) {
        fail(`${name}: 合計${totalRaw}と年齢ごとの和${sum}が合いません`);
      }
      vacancy.forEach((v, age) => {
        builtByAge[age] += v ?? 0;
      });

      if (!wards.includes(ward)) wards.push(ward);
      if (!categories.includes(kind)) categories.push(kind);
      const id = `${ward}-${name}`;
      if (seenId.has(id)) fail(`施設名が重複しています: ${id}`);
      seenId.add(id);
      facilities.push({
        id,
        name,
        w: wards.indexOf(ward),
        c: categories.indexOf(kind),
        vacancy,
      });
    }

    if (facilities.length < 90) fail(`施設が${facilities.length}件しか取れていません`);

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
      metrics: ["vacancy"],
      subtitle: `${latest.year}年${latest.month}月入所の入所可能数`,
      notes: [
        "松山市が公表している入所可能数です。利用調整を経て入所が決まります。",
        "「—」はそのクラスを設けていない施設です。乳児保育園・小規模保育事業・事業所内保育所に通えるのは、子どもが3歳を迎えた年度の3月末日までです。",
        "園ごとに入園できる年齢（月齢）が決まっています。詳しくは公式の一覧をご確認ください。",
        ...(hasAgeLimitNote
          ? ["一部の園では、満3歳に達した子どもだけを対象とする枠があります。公式の一覧で対象年齢をご確認ください。"]
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

    console.log(`書き出しました: ${path.relative(process.cwd(), OUT_PATH)}`);
    console.log(`  1施設ずつ「年齢の和＝合計列」を確かめました（${facilities.length}件）`);
    console.log("");
    console.log(`  ${facilities.length}施設 / ${wards.length}地域`);
    for (const [i, cat] of categories.entries()) {
      console.log(`  ${cat} ${facilities.filter((f) => f.c === i).length}施設`);
    }
    console.log("");
    console.log("  年齢 | 入所可能");
    builtByAge.forEach((v, age) => console.log(`  ${age}歳児 | ${v}`));
    console.log(`  合計 | ${builtByAge.reduce((a, b) => a + b, 0)}`);
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

main().catch((err) => fail(String(err)));
