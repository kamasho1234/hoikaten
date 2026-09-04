/**
 * 知多市の保育所等空き状況を取り込む
 *
 * 実行: npm run vacancy:fetch:chita
 *
 * ## この自治体の特徴
 * - 記号は「空きあり○」「空き無し×」の2つだけ
 * - 空らんの意味は空き状況PDFに書かれていないので、**入所案内PDFの
 *   施設一覧にある「保育年齢」（「1～5」「5か月～2」など）と突き合わせて**、
 *   空らんがその園の受けていない年齢だけに出ることを確かめている
 * - 入所案内の一覧は列がそろっておらず、梅が丘こども園のように
 *   施設名のセルが取れない行がある。そこで**空らんのある施設だけ**
 *   保育年齢との照合を必須にして、取れない施設が増えたら気づくようにしている
 * - 「公私」と「施設種別」が別の列にあるので、つなげて施設類型にする
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "chita";
const MUNICIPALITY_NAME = "知多市";
const SOURCE_NAME = "知多市「市内保育所等 空き状況一覧」";
const SOURCE_URL = "https://www.city.chita.lg.jp/docs/2023101600014/";
/** 施設ごとの保育年齢が載っている入所案内のページ */
const GUIDE_URL = "https://www.city.chita.lg.jp/docs/2014020701876/";
const AGE_COUNT = 6;
const MIN_FACILITIES = 15;
/** 入所案内の一覧から施設名を取れなくてもよい件数の上限 */
const MAX_UNMATCHED = 1;
const UA = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const EXTRACTOR = path.join(process.cwd(), "scripts", "chita-pdf-extract.py");

function fail(message: string): never {
  console.error(`\n[中断] ${message}`);
  process.exit(1);
}

function todayJst(): string {
  const jst = new Date(Date.now() + 9 * 60 * 60 * 1000);
  return jst.toISOString().slice(0, 10);
}

function squeeze(s: string): string {
  return (s ?? "").replace(/<[^>]+>/g, "").replace(/[\s　]/g, "");
}

function toHalfWidth(s: string): string {
  return s.replace(/[０-９Ａ-Ｚａ-ｚ]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xfee0));
}

function reiwaToYear(reiwa: number): number {
  return reiwa + 2018;
}

type PdfResult = {
  fiscal: number;
  asOf: [number, number, number];
  openMark: string;
  closedMark: string;
  notes: string[];
  markCounts: Record<string, number>;
  blanks: number;
  rows: { public: string; kind: string; name: string; marks: (string | null)[] }[];
  guide: { name: string; start: number; end: number }[];
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

/** ページからPDFのリンクを1つ選んで落とす */
async function download(pageUrl: string, match: (text: string) => boolean, file: string) {
  const res = await fetch(pageUrl, { headers: { "User-Agent": UA }, redirect: "follow" });
  if (!res.ok) fail(`ページが ${res.status} を返しました: ${pageUrl}`);
  const html = await res.text();
  const links = [...html.matchAll(/<a[^>]+href="([^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/gi)].map((m) => ({
    url: new URL(m[1], res.url || pageUrl).toString(),
    text: toHalfWidth(squeeze(m[2])),
  }));
  const link = links.find((l) => match(l.text));
  if (!link) fail(`PDFのリンクが見つかりません: ${pageUrl}`);
  console.log(`PDF: ${link.text}\n  ${link.url}`);

  const r = await fetch(link.url, { headers: { "User-Agent": UA } });
  if (!r.ok) fail(`PDFの取得に失敗しました（${r.status}）: ${link.url}`);
  const buf = Buffer.from(await r.arrayBuffer());
  if (buf.subarray(0, 4).toString() !== "%PDF") fail(`PDFではありません: ${link.url}`);
  fs.writeFileSync(file, buf);
  return link;
}

async function main() {
  console.log(`${MUNICIPALITY_NAME}の空き状況を取り込みます`);
  console.log(`公式ページ: ${SOURCE_URL}\n`);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "chita-vacancy-"));
  try {
    const vacancyFile = path.join(tmpDir, "chita-vacancy.pdf");
    const vacancyLink = await download(
      SOURCE_URL,
      (t) => /保育所等空き状況/.test(t),
      vacancyFile,
    );
    const guideFile = path.join(tmpDir, "chita-guide.pdf");
    const guideLink = await download(GUIDE_URL, (t) => /保育所等入所案内/.test(t), guideFile);

    let pdf: PdfResult;
    try {
      pdf = JSON.parse(runPython([EXTRACTOR, vacancyFile, guideFile])) as PdfResult;
    } catch (err) {
      fail(`抽出結果を読めません: ${String(err)}`);
    }

    const [reiwa, month, day] = pdf.asOf;
    const asOf = `${reiwaToYear(reiwa)}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    if (!/^\d{4}-\d{2}-\d{2}$/.test(asOf)) fail(`時点の日付を組み立てられません: ${asOf}`);
    if (asOf > todayJst()) fail(`時点の日付（${asOf}）が今日より先になっています`);
    // リンクの題にも同じ日付が入っている（「（R8.8.3現在）」）
    const linkDate = /R(\d+)\.(\d+)\.(\d+)現在/.exec(vacancyLink.text);
    if (linkDate && [Number(linkDate[1]), Number(linkDate[2]), Number(linkDate[3])].join("-") !== pdf.asOf.join("-")) {
      fail(`リンクの題（${vacancyLink.text}）とPDFの中の日付（${asOf}）が違います`);
    }
    console.log(`時点: ${asOf} ／ ${reiwaToYear(pdf.fiscal)}年度分`);

    const openMark = squeeze(pdf.openMark);
    const closedMark = squeeze(pdf.closedMark);
    if (!openMark || !closedMark) fail("凡例の記号が読み取れませんでした");

    // 入所案内の施設一覧（施設名は略称のことがある）
    const guide = pdf.guide.map((g) => ({ ...g, name: toHalfWidth(squeeze(g.name)) }));

    const categories: string[] = [];
    const facilities: {
      id: string;
      name: string;
      w: null;
      c: number;
      vacancy: (number | null)[];
      symbols: (string | null)[];
    }[] = [];
    const seen = new Set<string>();
    const usedGuide = new Set<string>();
    const marks = new Map<string, number>();
    let notOffered = 0;
    let unmatched = 0;

    for (const row of pdf.rows) {
      const name = squeeze(row.name);
      if (!name) fail("施設名が空の行があります");
      if (seen.has(name)) fail(`施設名が重複しています: ${name}`);
      seen.add(name);

      const category = `${squeeze(row.public)}${squeeze(row.kind)}`;
      if (!category) fail(`${name}: 公私と施設種別が空です`);
      let c = categories.indexOf(category);
      if (c < 0) {
        categories.push(category);
        c = categories.length - 1;
      }

      // 入所案内の一覧と照合する。一覧の施設名は「寺本」のような略称
      const key = toHalfWidth(name);
      const matched = guide.filter((g) => key.includes(g.name) || g.name.includes(key));
      // 「朝倉」と「知多朝倉駅ぽっぽ園」のように短い名前が紛れるので、いちばん長いものを採る
      const longest = matched.reduce<number>((a, g) => Math.max(a, g.name.length), 0);
      const best = matched.filter((g) => g.name.length === longest);
      if (best.length > 1) {
        fail(`${name}: 入所案内の一覧で同じ長さの候補が${best.length}件あります`);
      }
      const info = best[0] ?? null;
      if (info === null) {
        unmatched += 1;
      } else if (usedGuide.has(info.name)) {
        fail(`${name}: 入所案内の同じ施設に2回対応づきました（${info.name}）`);
      } else {
        usedGuide.add(info.name);
      }

      const symbols: (string | null)[] = [];
      for (let age = 0; age < AGE_COUNT; age++) {
        const raw = row.marks[age];
        if (raw === null) {
          // 空らんは、その園が受けていない年齢のはず。入所案内の保育年齢で確かめる
          if (info === null) {
            fail(`${name}: ${age}歳児が空らんですが、入所案内の一覧に見つからず確かめられません`);
          }
          if (age >= info.start && age <= info.end) {
            fail(
              `${name}: ${age}歳児が空らんですが、入所案内の保育年齢（${info.start}〜${info.end}歳）には入っています`,
            );
          }
          notOffered += 1;
          symbols.push(null);
          continue;
        }
        const mark = squeeze(raw);
        if (mark !== openMark && mark !== closedMark) {
          fail(`${name}: ${age}歳児が凡例にない記号です（「${mark}」）`);
        }
        if (info !== null && (age < info.start || age > info.end)) {
          fail(
            `${name}: 入所案内の保育年齢（${info.start}〜${info.end}歳）の外の${age}歳児に「${mark}」が入っています`,
          );
        }
        marks.set(mark, (marks.get(mark) ?? 0) + 1);
        symbols.push(mark);
      }

      facilities.push({
        id: name,
        name,
        w: null,
        c,
        vacancy: new Array(AGE_COUNT).fill(null),
        symbols,
      });
    }

    if (facilities.length < MIN_FACILITIES) {
      fail(`施設が${facilities.length}件しか取れていません（${MIN_FACILITIES}件以上のはず）`);
    }
    if (unmatched > MAX_UNMATCHED) {
      fail(`入所案内の一覧と照合できない施設が${unmatched}件あります（${MAX_UNMATCHED}件までのはず）`);
    }
    // 検算1: 記号の数がPDFの印字と合うか
    for (const [mark, count] of marks) {
      if (count !== pdf.markCounts[mark]) {
        fail(`「${mark}」の数が合いません（PDF ${pdf.markCounts[mark]}個 / 取り込み ${count}個）`);
      }
    }
    // 検算2: 空らんの数がPDFと合うか
    if (notOffered !== pdf.blanks) {
      fail(`空らんの数が合いません（PDF ${pdf.blanks} / 取り込み ${notOffered}）`);
    }
    // 検算3: 欄の数が施設数×年齢数になるか
    const total = [...marks.values()].reduce((a, b) => a + b, 0) + notOffered;
    if (total !== facilities.length * AGE_COUNT) {
      fail(`欄の数が合いません（${total} / 施設${facilities.length}×${AGE_COUNT}）`);
    }
    console.log(
      `${facilities.length}施設 ／ ${openMark}${marks.get(openMark) ?? 0}・${closedMark}${marks.get(closedMark) ?? 0}・クラスなし${notOffered}（照合できず${unmatched}件）`,
    );

    const symbolLegend = [
      { mark: openMark, label: "空きあり", open: true },
      { mark: closedMark, label: "空き無し", open: false },
    ];

    const previous = fs.existsSync(OUT_PATH)
      ? (JSON.parse(fs.readFileSync(OUT_PATH, "utf-8")) as { asOf?: string; facilities?: unknown[]; sourceFiles?: Record<string, string> })
      : null;
    if (previous?.facilities && facilities.length < previous.facilities.length * 0.9) {
      fail(`施設数が大きく減っています（前回 ${previous.facilities.length}件 → 今回 ${facilities.length}件）`);
    }
    // 自治体は基準日を変えずに資料を差し替えることがある。
    // 取り込み元のURLも同じときだけ、書き換えを見送る
    if (previous?.asOf === asOf && previous?.sourceFiles?.vacancy === vacancyLink.url) {
      console.log(`公式データの時点が前回と同じ（${asOf}）のため更新はありません。`);
      return;
    }

    const notes = [
      `知多市は空き状況を人数ではなく記号で公表しています。これは${reiwaToYear(pdf.fiscal)}年度分で、${asOf}時点のものです。`,
      `公式の凡例は「空きあり${openMark}」「空き無し${closedMark}」です。`,
      `公式の表で空らんになっている年齢は「—」にしています。入所案内の保育年齢と照らして、その園がその年齢を受けていないことを確かめています（出典: ${guideLink.url}）。`,
      ...pdf.notes.map((n) => squeeze(n)),
    ];

    const dataset = {
      municipalitySlug: MUNICIPALITY_SLUG,
      municipalityName: MUNICIPALITY_NAME,
      asOf,
      fetchedAt: todayJst(),
      sourceName: SOURCE_NAME,
      sourceUrl: SOURCE_URL,
      sourceFiles: { vacancy: vacancyLink.url },
      metrics: ["symbol"],
      subtitle: `${reiwaToYear(pdf.fiscal)}年度の空き状況`,
      notes,
      wards: [] as string[],
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
    console.log(`  ${facilities.length}施設 / ${categories.join("・")}`);
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

main().catch((err) => fail(String(err)));
