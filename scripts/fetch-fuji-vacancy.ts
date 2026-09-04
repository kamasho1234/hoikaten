/**
 * 富士市の保育施設等の空き状況を取り込む
 *
 * 実行: npm run vacancy:fetch:fuji
 *
 * ## この自治体の特徴
 * - 「○」が空き有、空欄が空き枠なし、「＼」が受入クラスなし
 * - **「＼」は文字ではなく図形で描かれている**ので、セルと重なる図形があるかで見分ける
 * - 保育ママの表だけ「0歳児〜2歳児」がひとまとめなので、3つの歳児に同じ印を配る
 * - 見出し（■保育園一覧など）と公私を組み合わせて施設の種類にする
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "fuji";
const MUNICIPALITY_NAME = "富士市";
const SOURCE_NAME = "富士市「保育園・認定こども園・地域型保育事業所等空き状況」";
const INDEX_URL = "https://www.city.fuji.shizuoka.jp/1023100000/p001570.html";
const AGE_COUNT = 6;
const UA = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";

const WIDE_COLUMNS = 10;
const NARROW_COLUMNS = 7;
const COL_NAME = 1;

const OPEN_MARK = "○";
const OPEN_LABEL = "空き有";
const NONE_MARK = "－";
const NONE_LABEL = "空き枠なし";

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const EXTRACTOR = path.join(process.cwd(), "scripts", "fuji-pdf-extract.py");

function fail(message: string): never {
  console.error(`\n[中断] ${message}`);
  process.exit(1);
}

function todayJst(): string {
  const jst = new Date(Date.now() + 9 * 60 * 60 * 1000);
  return jst.toISOString().slice(0, 10);
}

function squeeze(s: string): string {
  return (s ?? "").replace(/[\s　]/g, "");
}

function stripTags(html: string): string {
  return html.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").replace(/[\s　]+/g, " ").trim();
}

/** 「認定こども園一覧※幼稚園部の…」から種類だけを取り出す */
function categoryOf(head: string): string {
  return squeeze(head).split("一覧")[0].split("（")[0].split("※")[0];
}

type PdfResult = {
  asOf: [number, number, number];
  slashTotal: number;
  sections: {
    name: string;
    columns: number;
    rows: { group: string; values: string[]; slashes: boolean[] }[];
  }[];
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

  // 「令和8年8月3日時点空き状況（PDF：〜）」
  const links = [...html.matchAll(/<a[^>]+href="([^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => ({ url: new URL(m[1], INDEX_URL).toString(), text: squeeze(stripTags(m[2])) }))
    .map((l) => {
      const m = l.text.match(/令和(\d+)年(\d+)月(\d+)日時点空き状況/);
      if (!m) return null;
      const year = 2018 + Number(m[1]);
      return {
        ...l,
        reiwa: Number(m[1]),
        month: Number(m[2]),
        day: Number(m[3]),
        sortKey: year * 10000 + Number(m[2]) * 100 + Number(m[3]),
      };
    })
    .filter((v): v is NonNullable<typeof v> => v !== null);
  if (links.length === 0) fail("空き状況のPDFが見つかりません。ページの構成が変わった可能性があります。");
  const latest = links.reduce((a, b) => (b.sortKey > a.sortKey ? b : a));
  console.log(`最新: ${latest.text}\n  ${latest.url}`);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "fuji-vacancy-"));
  try {
    const r = await fetch(latest.url, { headers: { "User-Agent": UA } });
    if (!r.ok) fail(`PDFの取得に失敗しました（${r.status}）: ${latest.url}`);
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.subarray(0, 4).toString() !== "%PDF") fail(`PDFではありません: ${latest.url}`);
    const file = path.join(tmpDir, "fuji.pdf");
    fs.writeFileSync(file, buf);

    let pdf: PdfResult;
    try {
      pdf = JSON.parse(runPython([EXTRACTOR, file])) as PdfResult;
    } catch (err) {
      fail(`抽出結果を読めません: ${String(err)}`);
    }

    const [ay, am, ad] = pdf.asOf;
    if (ay !== latest.reiwa || am !== latest.month || ad !== latest.day) {
      fail(
        `PDFの時点（令和${ay}年${am}月${ad}日）がリンクの文言（令和${latest.reiwa}年${latest.month}月${latest.day}日）と違います`
      );
    }
    const asOf = `${2018 + ay}-${String(am).padStart(2, "0")}-${String(ad).padStart(2, "0")}`;
    if (asOf > todayJst()) fail(`時点（${asOf}）が今日より先になっています`);
    console.log(`時点: ${asOf}`);

    const symbolLegend = [
      { mark: OPEN_MARK, label: OPEN_LABEL, open: true },
      { mark: NONE_MARK, label: NONE_LABEL, open: false },
    ];

    const categories: string[] = [];
    const facilities: {
      id: string;
      name: string;
      w: null;
      c: number;
      vacancy: (number | null)[];
      symbols: (string | null)[];
    }[] = [];
    const marks = new Map<string, number>();
    const seen = new Set<string>();
    let noClass = 0;
    let spread = 0;

    for (const section of pdf.sections) {
      const kind = categoryOf(section.name);
      if (!kind) fail(`見出しから種類を取り出せません: 「${section.name}」`);
      const wide = section.columns === WIDE_COLUMNS;

      for (const row of section.rows) {
        const name = squeeze(row.values[COL_NAME]);
        if (!name) fail(`${kind}: 施設名が空の行があります`);
        if (seen.has(name)) fail(`施設名が重複しています: ${name}`);
        seen.add(name);

        // 広い表は先頭が公私、狭い表（保育ママ）は地区なので種類には混ぜない
        const group = squeeze(row.group);
        if (wide && !group) fail(`${name}: 公私が分かりません`);
        const category = wide ? `${group}${kind}` : kind;
        if (!categories.includes(category)) categories.push(category);

        const symbols: (string | null)[] = [];
        const read = (index: number): string | null => {
          if (row.slashes[index]) return null;
          const raw = squeeze(row.values[(wide ? 4 : 3) + index] ?? "");
          if (raw === "") return NONE_MARK;
          if (raw !== OPEN_MARK) fail(`${name}: 見慣れない印です: 「${raw}」`);
          return OPEN_MARK;
        };

        if (wide) {
          for (let age = 0; age < AGE_COUNT; age++) symbols.push(read(age));
        } else {
          // 保育ママの表は「0歳児〜2歳児」がひとまとめなので3つに配る
          const zero = read(0);
          for (let age = 0; age < 3; age++) symbols.push(zero);
          if (zero !== null) spread += 2;
          for (let i = 1; i <= 3; i++) symbols.push(read(i));
        }
        if (symbols.length !== AGE_COUNT) fail(`${name}: 歳児が${symbols.length}個になりました`);

        for (const mark of symbols) {
          if (mark === null) noClass += 1;
          else marks.set(mark, (marks.get(mark) ?? 0) + 1);
        }
        if (symbols.every((s) => s === null)) fail(`${name}: 全てのクラスが受入なしです`);

        facilities.push({
          id: name,
          name,
          w: null,
          c: categories.indexOf(category),
          vacancy: new Array(AGE_COUNT).fill(null),
          symbols,
        });
      }
    }

    if (facilities.length < 50) fail(`施設が${facilities.length}件しか取れていません`);
    // 「＼」の数（図形の数）と、クラスなしにした数が合うか
    if (noClass !== pdf.slashTotal) {
      fail(`受入クラスなしの数が合いません（図形 ${pdf.slashTotal}個 / 取り込み ${noClass}個）`);
    }
    console.log(`「＼」の数（${pdf.slashTotal}）と受入クラスなしの数が一致しました`);

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
      metrics: ["symbol"],
      subtitle: "保育施設等の空き状況",
      notes: [
        "富士市は空きの有無だけを公表しています（人数は公表していません）。",
        `公式の表で空欄になっているところは「${NONE_LABEL}」という意味なので、当サイトでは「${NONE_MARK}」で表しています。`,
        "入園内定者の辞退や在園児の退園、保育士の状況などにより、空き状況が変わることがあります。",
        "保育ママ（家庭的保育事業）は公式の表で0歳児〜2歳児がひとまとめなので、当サイトでは3つの歳児に同じ印を載せています。",
        "年齢はその年度の4月1日時点のものです。受入クラスのない歳児は「—」にしています。",
      ],
      wards: [],
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
    console.log(`  ${facilities.length}施設 / ${categories.length}種類`);
    console.log(`  受入クラスなし: ${noClass}（保育ママで配ったぶん ${spread}）`);
    console.log("");
    console.log("  印の出てきた数");
    for (const item of symbolLegend) {
      console.log(`  ${item.mark}（${item.label}） ${marks.get(item.mark) ?? 0}`);
    }
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

main().catch((err) => fail(String(err)));
