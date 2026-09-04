/**
 * 羽村市の市内保育施設空き状況を取り込む
 *
 * 実行: npm run vacancy:fetch:hamura
 *
 * ## この自治体の特徴
 * - PDFではなく**ページの中のHTMLの表**で公表している。表は3つに分かれる
 *   （認可保育園／認定こども園／家庭的保育者）
 * - 記号は 〇＝受入可、△＝若干名受入可、×＝受入不可
 * - **家庭的保育者の表は「0歳児から2歳児」の1列だけ**なので、0・1・2歳に同じ記号を入れる
 * - 「-」はそのクラスがないことを表す
 * - 時点は本文の「令和8年8月市内保育施設空き状況」の月とページの更新日から決める
 */

import fs from "node:fs";
import path from "node:path";

const MUNICIPALITY_SLUG = "hamura";
const MUNICIPALITY_NAME = "羽村市";
const SOURCE_NAME = "羽村市「市内保育施設空き状況」";
const INDEX_URL = "https://www.city.hamura.tokyo.jp/0000018375.html";
const AGE_COUNT = 6;
const MIN_FACILITIES = 15;
const UA = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);

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

/** タグと空白と実体参照を落として、中身だけを取り出す */
function textOf(html: string): string {
  return toHalfWidth(
    html
      .replace(/<[^>]+>/g, "")
      .replace(/&nbsp;/g, " ")
      .replace(/&amp;/g, "&")
      .replace(/[\s　]/g, "")
  );
}

/** 記号の形をそろえる */
function shapeOf(mark: string): string {
  if (/^[○◯〇]$/.test(mark)) return "○";
  if (/^[×✕✖]$/.test(mark)) return "×";
  return mark;
}

function reiwaToYear(reiwa: number): number {
  return reiwa + 2018;
}

async function main() {
  console.log(`${MUNICIPALITY_NAME}の空き状況を取り込みます`);
  console.log(`公式ページ: ${INDEX_URL}\n`);

  const res = await fetch(INDEX_URL, { headers: { "User-Agent": UA }, redirect: "follow" });
  if (!res.ok) fail(`公式ページが ${res.status} を返しました`);
  const html = await res.text();
  const flat = toHalfWidth(html.replace(/<[^>]+>/g, "").replace(/[\s　]/g, ""));

  const updated = /更新日[：:]\[(\d{4})年(\d{1,2})月(\d{1,2})日\]/.exec(flat);
  if (!updated) fail("ページから更新日を読み取れませんでした");
  const asOf = `${updated[1]}-${updated[2].padStart(2, "0")}-${updated[3].padStart(2, "0")}`;
  if (asOf > todayJst()) fail(`更新日（${asOf}）が今日より先になっています`);

  // 「令和8年8月市内保育施設空き状況」の月が更新日の月と合っているか
  const title = /令和(\d+)年(\d{1,2})月市内保育施設空き状況/.exec(flat);
  if (!title) fail("「令和N年M月市内保育施設空き状況」を読み取れませんでした");
  if (reiwaToYear(Number(title[1])) !== Number(updated[1]) || Number(title[2]) !== Number(updated[2])) {
    fail(`題の月（令和${title[1]}年${title[2]}月）と更新日（${asOf}）が食い違っています`);
  }
  const monthLabel = `${reiwaToYear(Number(title[1]))}年${title[2]}月`;
  console.log(`時点: ${asOf}（ページの更新日） ／ ${monthLabel}の空き状況`);

  // 凡例はページ本文に「〇→受入可」のように1行ずつ並んでいる。
  // タグを外してつないでしまうと後ろの施設名と続いてしまうので、タグで区切った断片で探す
  const symbolLegend = html
    .split(/<[^>]+>/)
    .map((part) => toHalfWidth(part.replace(/&nbsp;/g, " ").replace(/[\s　]/g, "")))
    .map((part) => /^([○◯〇△×✕])→(.{2,8})$/.exec(part))
    .filter((m): m is RegExpExecArray => m !== null)
    .map((m) => ({ mark: shapeOf(m[1]), label: m[2], open: !m[2].startsWith("受入不可") }));
  if (symbolLegend.length !== 3) fail(`凡例が${symbolLegend.length}件です（3件のはず）`);
  if (!symbolLegend.some((l) => l.open)) fail("受入可の記号が凡例にありません");
  console.log(`凡例: ${symbolLegend.map((l) => `${l.mark}＝${l.label}`).join(" / ")}`);
  const known = new Map(symbolLegend.map((l) => [shapeOf(l.mark), l.mark]));

  const tables = [...html.matchAll(/<table[\s\S]*?<\/table>/gi)].map((t) => t[0]);
  if (tables.length < 2) fail(`表が${tables.length}個しかありません`);

  const facilities: {
    id: string;
    name: string;
    w: null;
    c: null;
    vacancy: (number | null)[];
    symbols: (string | null)[];
  }[] = [];
  const marks = new Map<string, number>();
  const seen = new Set<string>();
  let expanded = 0;

  for (const table of tables) {
    const rows = [...table.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi)].map((r) =>
      [...r[1].matchAll(/<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/gi)].map((c) => textOf(c[1]))
    );
    if (rows.length < 2) continue;

    const head = rows[0];
    // 年齢の列を見出しから決める。家庭的保育者の表は「0歳児から2歳児」の1列だけ
    const ages: { column: number; targets: number[] }[] = [];
    for (let column = 1; column < head.length; column++) {
      const one = /^(\d)歳児$/.exec(head[column]);
      const range = /^(\d)歳児から(\d)歳児$/.exec(head[column]);
      if (one) ages.push({ column, targets: [Number(one[1])] });
      else if (range) {
        const targets: number[] = [];
        for (let age = Number(range[1]); age <= Number(range[2]); age++) targets.push(age);
        ages.push({ column, targets });
      } else fail(`年齢の見出しが想定と違います: ${head.join(" / ")}`);
    }
    if (ages.length === 0) fail(`年齢の見出しが見つかりません: ${head.join(" / ")}`);

    for (const values of rows.slice(1)) {
      const name = values[0];
      if (!name) continue;
      if (seen.has(name)) fail(`施設名が重複しています: ${name}`);
      seen.add(name);

      const symbols: (string | null)[] = new Array(AGE_COUNT).fill(null);
      for (const { column, targets } of ages) {
        const raw = values[column] ?? "";
        // 「-」はそのクラスがないことを表す
        if (raw === "" || /^[-－—―ー]$/.test(raw)) continue;
        const mark = known.get(shapeOf(raw));
        if (!mark) fail(`${name}: 凡例にない記号です（「${raw}」）`);
        for (const age of targets) {
          if (age >= AGE_COUNT) fail(`${name}: 年齢が範囲外です（${age}）`);
          symbols[age] = mark;
        }
        marks.set(mark, (marks.get(mark) ?? 0) + 1);
        expanded += targets.length - 1;
      }

      if (symbols.every((s) => s === null)) fail(`${name}: 全ての年齢が空らんです`);
      facilities.push({
        id: name,
        name,
        w: null,
        c: null,
        vacancy: new Array(AGE_COUNT).fill(null),
        symbols,
      });
    }
  }

  if (facilities.length < MIN_FACILITIES) {
    fail(`施設が${facilities.length}件しか取れていません（${MIN_FACILITIES}件以上のはず）`);
  }

  // 検算: 表に印字されている記号の数と、取り込んだ欄の数（広げたぶんを引く）が合うか
  const printed = [...marks.values()].reduce((a, b) => a + b, 0);
  const filled = facilities.reduce((acc, f) => acc + f.symbols.filter((s) => s !== null).length, 0);
  if (filled !== printed + expanded) {
    fail(`欄の数が合いません（印字${printed}＋広げたぶん${expanded} / 埋めた欄 ${filled}）`);
  }
  console.log(
    `${facilities.length}施設を読み取りました（記号${printed}個、まとめて書かれた年齢を広げたぶん${expanded}欄）`
  );

  const previous = fs.existsSync(OUT_PATH)
    ? (JSON.parse(fs.readFileSync(OUT_PATH, "utf-8")) as { asOf?: string; facilities?: unknown[]; sourceFiles?: Record<string, string> })
    : null;
  if (previous?.facilities && facilities.length < previous.facilities.length * 0.9) {
    fail(`施設数が大きく減っています（前回 ${previous.facilities.length}件 → 今回 ${facilities.length}件）`);
  }
  // 自治体は基準日を変えずに資料を差し替えることがある。
  // 取り込み元の一式も同じときだけ、書き換えを見送る
  if (
    previous?.asOf === asOf &&
    JSON.stringify(previous?.sourceFiles ?? {}) === JSON.stringify({ vacancy: INDEX_URL }) &&
    JSON.stringify(previous?.facilities ?? null) === JSON.stringify(facilities)
  ) {
    console.log(`公式データの時点が前回と同じ（${asOf}）のため更新はありません。`);
    return;
  }

  const notes = [
    `羽村市は空き状況を人数ではなく記号で公表しています。これは${monthLabel}のもので、公式ページが${asOf}に更新されたものです。`,
    "退園、転園の方が出た場合、人数が増減することがあります。施設側の受入れ状況によっては入所できない場合もあります。",
    "家庭的保育者は公式の表では0歳児から2歳児がひとつの欄にまとめられています。当サイトでは同じ記号を0歳・1歳・2歳に入れています。",
    "公式の表に欄のない年齢は「—」にしています。その年齢のクラスがないことを表しています。",
  ];

  const dataset = {
    municipalitySlug: MUNICIPALITY_SLUG,
    municipalityName: MUNICIPALITY_NAME,
    asOf,
    fetchedAt: todayJst(),
    sourceName: SOURCE_NAME,
    sourceUrl: INDEX_URL,
    sourceFiles: { vacancy: INDEX_URL },
    metrics: ["symbol"],
    subtitle: `${monthLabel}の空き状況`,
    notes,
    wards: [],
    categories: [],
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
}

main().catch((err) => fail(String(err)));
