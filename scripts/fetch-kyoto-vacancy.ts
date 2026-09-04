/**
 * 京都市の保育施設・事業所の受入枠を取り込む
 *
 * 実行: npm run vacancy:fetch:kyoto
 *
 * ## この自治体の特徴
 * - **受入枠は記号**（×＝0人、△＝1〜2人、○＝3人以上）
 * - 凡例にない「要相談」も入る。意味が書かれていないので記号のまま載せ、
 *   空きのある施設としては数えない
 * - 類型の書き方に全角と半角の括弧が混ざる（「こども園（保）」「こども園(保)」）ので、
 *   そろえてから使う
 * - その施設にないクラスは空欄
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "kyoto";
const MUNICIPALITY_NAME = "京都市";
const SOURCE_NAME = "京都市「保育施設・事業所の受入枠」";
const INDEX_URL = "https://www.city.kyoto.lg.jp/hagukumi/page/0000227761.html";
const AGE_COUNT = 6;
const UA = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";

/** 凡例に説明のない記載。記号のまま載せるが、空きありには数えない */
const CONSULT_MARK = "要相談";
const CONSULT_LABEL = "公式に説明のない記載";

const COL_WARD = 0;
const COL_KIND = 1;
const COL_NAME = 2;
const COL_ZERO = 7;

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const EXTRACTOR = path.join(process.cwd(), "scripts", "kyoto-pdf-extract.py");

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
  return s.replace(/[０-９Ａ-Ｚ]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xfee0));
}

function squeeze(s: string): string {
  return (s ?? "").replace(/[\s　]/g, "");
}

function stripTags(html: string): string {
  return html.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").replace(/[\s　]+/g, " ").trim();
}

/** 類型の書き方に全角と半角の括弧が混ざるので、そろえる */
function normalizeKind(s: string): string {
  return toHalfWidth(squeeze(s)).replace(/[（(]/g, "(").replace(/[）)]/g, ")");
}

/**
 * 表の読み取りで記号が落ちてしまった行を、ページの素のテキストから拾い直す。
 * 「… 産休明け7：30～ × △ △」のように、開園時間のうしろに記号が並んでいる
 */
function recoverSymbols(lines: string[], name: string): (string | null)[] | null {
  const key = squeeze(name);
  for (const line of lines) {
    if (!squeeze(line).includes(key)) continue;
    const tail = line.match(/([○◯〇△×](?:\s*[○◯〇△×])*)\s*$/);
    if (!tail) continue;
    const found = tail[1].split(/\s+/).filter(Boolean);
    // 開園時間の手前が受入年齢。そこから何歳のクラスか決める
    const ageRaw = line.match(/(\S+?)\s*\d+[：:]\d+\s*[～〜~]/)?.[1] ?? "";
    const age = toHalfWidth(squeeze(ageRaw));
    const years = age.match(/^満?(\d+)歳/);
    let low: number;
    if (years) low = Number(years[1]);
    else if (/^(産休明け|生後|\d+(か月|ヶ月|ヵ月|週))/.test(age)) low = 0;
    else return null;
    if (low + found.length > AGE_COUNT) return null;
    const symbols: (string | null)[] = new Array(AGE_COUNT).fill(null);
    for (let i = 0; i < found.length; i++) symbols[low + i] = found[i];
    return symbols;
  }
  return null;
}

type PdfResult = {
  target: [number, number];
  posted: [number, number, number];
  legend: { mark: string; label: string }[];
  markCounts: Record<string, number>;
  rows: string[][];
  lines: string[];
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
  console.log(`${MUNICIPALITY_NAME}の受入枠を取り込みます`);
  console.log(`公式ページ: ${INDEX_URL}\n`);

  const res = await fetch(INDEX_URL, { headers: { "User-Agent": UA } });
  if (!res.ok) fail(`公式ページが ${res.status} を返しました`);
  const html = await res.text();

  // このサイトは <base href> でリンクの起点をずらしているので、それに合わせる
  const baseHref = html.match(/<base[^>]+href="([^"]+)"/i)?.[1];
  const base = baseHref ? new URL(baseHref, INDEX_URL).toString() : INDEX_URL;

  // 「保育施設・事業所の受入枠（令和8年9月分）(PDF形式, 915.49KB)」
  const links = [...html.matchAll(/<a[^>]+href="([^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => ({ url: new URL(m[1], base).toString(), text: toHalfWidth(stripTags(m[2])) }))
    .map((l) => {
      const m = l.text.match(/受入枠（令和(\d+)年(\d+)月分）/);
      if (!m) return null;
      const fiscalYear = reiwaToYear(Number(m[1]));
      const month = Number(m[2]);
      const year = month <= 3 ? fiscalYear + 1 : fiscalYear;
      return { ...l, reiwa: Number(m[1]), year, month, sortKey: year * 100 + month };
    })
    .filter((v): v is NonNullable<typeof v> => v !== null);
  if (links.length === 0) fail("受入枠のPDFが見つかりません。ページの構成が変わった可能性があります。");
  const latest = links.reduce((a, b) => (b.sortKey > a.sortKey ? b : a));
  console.log(`最新: ${latest.text}\n  ${latest.url}`);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "kyoto-vacancy-"));
  try {
    const r = await fetch(latest.url, { headers: { "User-Agent": UA } });
    if (!r.ok) fail(`PDFの取得に失敗しました（${r.status}）: ${latest.url}`);
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.subarray(0, 4).toString() !== "%PDF") fail(`PDFではありません: ${latest.url}`);
    const file = path.join(tmpDir, "kyoto.pdf");
    fs.writeFileSync(file, buf);

    let pdf: PdfResult;
    try {
      pdf = JSON.parse(runPython([EXTRACTOR, file])) as PdfResult;
    } catch (err) {
      fail(`抽出結果を読めません: ${String(err)}`);
    }

    const [tr, tm] = pdf.target;
    if (tr !== latest.reiwa || tm !== latest.month) {
      fail(
        `PDFの表題（令和${tr}年${tm}月分）がリンクの文言（令和${latest.reiwa}年${latest.month}月分）と違います`
      );
    }
    const [pr, pm, pd] = pdf.posted;
    const asOf = `${reiwaToYear(pr)}-${String(pm).padStart(2, "0")}-${String(pd).padStart(2, "0")}`;
    console.log(`掲載日: ${asOf} / 対象: ${latest.year}年${latest.month}月分`);

    // 空きの多い順に並べる
    const order = ["○", "◯", "〇", "△", "×"];
    const symbolLegend = pdf.legend
      .filter((l) => order.includes(l.mark))
      .sort((a, b) => order.indexOf(a.mark) - order.indexOf(b.mark))
      .map((l) => ({ mark: l.mark, label: l.label, open: !/^0人$|^０人$/.test(l.label) }));
    if (symbolLegend.length < 3) fail(`記号の凡例が足りません: ${JSON.stringify(pdf.legend)}`);
    console.log(`凡例: ${symbolLegend.map((l) => `${l.mark}＝${l.label}`).join(" / ")}`);
    const knownMarks = new Set(symbolLegend.map((l) => l.mark));

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
    const seen = new Set<string>();
    let consult = 0;
    let noClass = 0;
    const emptyRows: string[] = [];
    const recoveredRows: string[] = [];

    for (const row of pdf.rows) {
      const ward = squeeze(row[COL_WARD]);
      const name = squeeze(row[COL_NAME]);
      if (!ward || ward === "行政区" || !name) continue;

      const kind = normalizeKind(row[COL_KIND]);
      if (!kind) fail(`${ward} ${name}: 類型が空です`);
      if (!wards.includes(ward)) wards.push(ward);
      if (!categories.includes(kind)) categories.push(kind);

      const id = `${ward}-${name}`;
      if (seen.has(id)) fail(`施設が重複しています: ${id}`);
      seen.add(id);

      const symbols: (string | null)[] = [];
      for (let age = 0; age < AGE_COUNT; age++) {
        const raw = squeeze(row[COL_ZERO + age] ?? "");
        if (raw === "") {
          noClass += 1;
          symbols.push(null);
          continue;
        }
        if (raw === CONSULT_MARK) {
          consult += 1;
        } else if (!knownMarks.has(raw)) {
          fail(`${ward} ${name}: 凡例にない記号です: 「${raw}」`);
        }
        marks.set(raw, (marks.get(raw) ?? 0) + 1);
        symbols.push(raw);
      }
      // 本園と枠をまとめている分園などは、全ての欄が空になる。
      // ただし表の読み取りで記号が落ちただけのこともあるので、素のテキストで拾い直す
      // every で書くと symbols の型が null だけに絞られてしまうので、数で見る
      const filledCount = symbols.filter((s) => s !== null).length;
      if (filledCount === 0) {
        const recovered = recoverSymbols(pdf.lines, name);
        if (!recovered) {
          emptyRows.push(`${ward}${name}`);
          continue;
        }
        for (let age = 0; age < AGE_COUNT; age++) {
          const mark = recovered[age];
          if (!mark) continue;
          if (mark === CONSULT_MARK) consult += 1;
          else if (!knownMarks.has(mark)) fail(`${ward} ${name}: 凡例にない記号です: 「${mark}」`);
          marks.set(mark, (marks.get(mark) ?? 0) + 1);
          symbols[age] = mark;
          noClass -= 1;
        }
        recoveredRows.push(`${ward}${name}`);
      }

      facilities.push({
        id,
        name,
        w: wards.indexOf(ward),
        c: categories.indexOf(kind),
        vacancy: new Array(AGE_COUNT).fill(null),
        symbols,
      });
    }

    if (facilities.length < 300) fail(`施設が${facilities.length}件しか取れていません`);
    for (const item of symbolLegend) {
      if (!marks.has(item.mark)) fail(`凡例にある「${item.mark}」が表に1つも出てきません`);
    }
    // 表の部分に印字されている数と突き合わせる
    for (const [mark, count] of marks) {
      const inText = pdf.markCounts[mark] ?? 0;
      if (count !== inText) {
        fail(`「${mark}」の数が合いません（PDFの文字 ${inText}個 / 取り込み ${count}個）`);
      }
    }
    console.log("記号の数はPDFの文字と一致しました");
    if (consult > 0) symbolLegend.push({ mark: CONSULT_MARK, label: CONSULT_LABEL, open: false });

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

    const notes = [
      "京都市は受入枠を人数ではなく記号で公表しています。当サイトでも公式の記号のまま載せています。",
      "受入枠は予定のもので、職員配置状況や退園等により変わることがあります。",
      "その施設にないクラスは「—」にしています。",
      "本園と受入枠をまとめている分園など、全ての欄が空の施設は載せていません。",
      "類型は公式の略記のままです（市保＝市営保育所、民保＝民営保育園、こども園（保）＝保育所型認定こども園、こども園（幼保）＝幼保連携型認定こども園、こども園（幼）＝幼稚園型認定こども園、小（A）〜小（C）＝小規模保育事業所、小家庭的＝家庭的保育事業所、保事業所内・小事業所内＝事業所内保育事業所）。",
    ];
    if (consult > 0) {
      notes.push(
        `公式の表に凡例のない「${CONSULT_MARK}」が${consult}件あります。意味が公表されていないため、記載のまま載せたうえで、空きのある施設としては数えていません。`
      );
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
      subtitle: `${latest.year}年${latest.month}月分の受入枠`,
      notes,
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
    console.log(`  ${facilities.length}施設 / ${wards.length}行政区 / ${categories.length}類型`);
    console.log(`  その施設にないクラス: ${noClass}`);
    if (recoveredRows.length > 0) {
      console.log(`  表から記号が落ちていて素のテキストで拾い直した施設: ${recoveredRows.join("、")}`);
    }
    if (emptyRows.length > 0) {
      console.log(`  全ての欄が空だった施設（載せていません）: ${emptyRows.join("、")}`);
    }
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
