/**
 * 高崎市の保育所（園）・認定こども園の募集状況を取り込む
 *
 * 実行: npm run vacancy:fetch:takasaki
 *
 * ## この自治体の特徴
 * - 数ではなく記号。公式の凡例は
 *   「◎＝5人以上」「○＝3〜4人程度」「△＝1〜2人程度」
 *   「空欄＝受入可能人数が無い年齢区分」「＊＝今後募集を行う可能性はあるが現時点で未定」
 * - **年齢の欄が2組ある**。左が「令和8年11月入所・令和8年12月〜令和9年3月入所予約」、
 *   右が「令和9年4月入所・令和9年5月〜令和10年3月入所予約」。
 *   当サイトは年齢6列しか持てないので、**直近の途中入所にあたる左の組**を使い、
 *   右の組があることは注記で断る
 * - **そのクラスを設けていない欄には斜線が引かれている。**
 *   凡例は空欄を「受入可能人数が無い年齢区分」と定めているので、
 *   斜線と空欄を取り違えると「クラスが無い」を「空きなし」と書いてしまう
 * - 空欄は「受入可能人数が無い」＝空きなしなので、「×」に置き換えて表示する
 *   （公式に「×」という記号は無いが、空らんのままだと情報が無いように見えるため）
 * - 地域（市街地周辺・倉渕地域など12区分）を wards に持たせる
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "takasaki";
const MUNICIPALITY_NAME = "高崎市";
const PREFECTURE = "群馬県";
const SOURCE_NAME = "高崎市「保育所（園）・認定こども園募集状況」";
const INDEX_URL = "https://www.city.takasaki.gunma.jp/page/6309.html";
const AGE_COUNT = 6;
const MIN_FACILITIES = 100;
const UA = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const EXTRACTOR = path.join(process.cwd(), "scripts", "takasaki-pdf-extract.py");

/** 抽出器が斜線（クラスなし）に付ける印 */
const SLASH = "／";
/** 空欄（受入可能人数が無い）の代わりに出す記号 */
const NONE_MARK = "×";

const LEGEND = [
  { mark: "◎", label: "5人以上の受入可能人数", open: true },
  { mark: "〇", label: "3〜4人程度の受入可能人数", open: true },
  { mark: "△", label: "1〜2人程度の受入可能人数", open: true },
  { mark: "＊", label: "今後募集を行う可能性はあるが、現時点で未定", open: false },
  { mark: NONE_MARK, label: "受入可能人数が無い（公式の表では空らん）", open: false },
];

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
  return s.replace(/[０-９]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xfee0));
}

function reiwaToYear(reiwa: number): number {
  return reiwa + 2018;
}

type PdfRow = { area: string; kind: string; name: string; cells: (string | null)[] };

type PdfResult = {
  text: string;
  headerLabels: string[];
  markCounts: Record<string, number>;
  blanks: number;
  slashes: number;
  rows: PdfRow[];
};

function runPython(args: string[]): string {
  const candidates = process.env.PYTHON ? [process.env.PYTHON] : ["python3", "python"];
  let lastError = "";
  for (const bin of candidates) {
    try {
      return execFileSync(bin, args, { encoding: "utf-8", maxBuffer: 128 * 1024 * 1024 });
    } catch (err) {
      lastError = String((err as { stderr?: string })?.stderr ?? err);
    }
  }
  fail(`Pythonの実行に失敗しました: ${lastError}`);
}

async function main(): Promise<void> {
  const r0 = await fetch(INDEX_URL, { headers: { "User-Agent": UA } });
  if (!r0.ok) fail(`ページの取得に失敗しました（${r0.status}）: ${INDEX_URL}`);
  const html = await r0.text();

  const links: { url: string; text: string }[] = [];
  for (const m of html.matchAll(/<a\s[^>]*href="([^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/gi)) {
    const text = squeeze(m[2]);
    if (text.includes("募集状況")) {
      links.push({ url: new URL(m[1], INDEX_URL).toString(), text });
    }
  }
  if (links.length === 0) fail("募集状況のPDFが見つかりません");
  const link = links[0];
  console.log(`PDF: ${link.text}\n  ${link.url}`);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "takasaki-vacancy-"));
  try {
    const r = await fetch(link.url, { headers: { "User-Agent": UA } });
    if (!r.ok) fail(`PDFの取得に失敗しました（${r.status}）: ${link.url}`);
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.subarray(0, 4).toString() !== "%PDF") fail(`PDFではありません: ${link.url}`);
    const file = path.join(tmpDir, "takasaki.pdf");
    fs.writeFileSync(file, buf);

    let pdf: PdfResult;
    try {
      pdf = JSON.parse(runPython([EXTRACTOR, file])) as PdfResult;
    } catch (err) {
      fail(`抽出結果を読めません: ${String(err)}`);
    }

    // 時点は資料の右上「R8.9.3現在」
    const plain = toHalfWidth(squeeze(pdf.text));
    const mAsOf = /R(\d+)\.(\d{1,2})\.(\d{1,2})現在/.exec(plain);
    if (!mAsOf) fail("資料から時点（R◯.◯.◯現在）を読めません");
    const asOf = `${reiwaToYear(Number(mAsOf[1]))}-${String(Number(mAsOf[2])).padStart(2, "0")}-${String(
      Number(mAsOf[3]),
    ).padStart(2, "0")}`;
    if (asOf > todayJst()) fail(`時点の日付（${asOf}）が今日より先になっています`);

    // 左の組がどの入所月なのかを見出しから確かめる
    if (pdf.headerLabels.length !== 2) {
      fail(`年齢の組の見出しが${pdf.headerLabels.length}個です（2個のはず）`);
    }
    const mTarget = /令和(\d+)年(\d{1,2})月入所/.exec(toHalfWidth(pdf.headerLabels[0]));
    if (!mTarget) fail(`左の組の見出しから入所月を読めません: ${pdf.headerLabels[0]}`);
    const targetLabel = `${reiwaToYear(Number(mTarget[1]))}年${Number(mTarget[2])}月`;
    console.log(
      `時点: ${asOf} ／ 対象: ${targetLabel}入所（もう一方の組: ${pdf.headerLabels[1]}）`,
    );

    const known = new Set(LEGEND.map((l) => l.mark));
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
    const seen = new Set<string>();
    const marks = new Map<string, number>();
    let slashes = 0;
    let blanks = 0;

    for (const row of pdf.rows) {
      const name = squeeze(row.name);
      if (!name) fail("施設名が空の行があります");
      if (seen.has(name)) fail(`施設名が重複しています: ${name}`);
      seen.add(name);

      const area = squeeze(row.area);
      if (!area) fail(`${name}: 地域が空です`);
      let w = wards.indexOf(area);
      if (w < 0) {
        wards.push(area);
        w = wards.length - 1;
      }

      const kind = squeeze(row.kind);
      if (!kind) fail(`${name}: 施設種別が空です`);
      let c = categories.indexOf(kind);
      if (c < 0) {
        categories.push(kind);
        c = categories.length - 1;
      }

      const symbols: (string | null)[] = [];
      for (let age = 0; age < AGE_COUNT; age++) {
        const raw = row.cells[age];
        if (raw === SLASH) {
          // 斜線＝そのクラスを設けていない
          slashes += 1;
          symbols.push(null);
          continue;
        }
        // 空欄＝受入可能人数が無い。凡例に沿って「×」に置き換える
        const mark = raw === null ? NONE_MARK : squeeze(raw);
        if (raw === null) blanks += 1;
        if (!known.has(mark)) fail(`${name}: ${age}歳児が凡例にない記号です（「${mark}」）`);
        marks.set(mark, (marks.get(mark) ?? 0) + 1);
        symbols.push(mark);
      }
      if (symbols.every((s) => s === null)) fail(`${name}: すべての年齢が斜線になっています`);

      facilities.push({
        id: name,
        name,
        w,
        c,
        vacancy: new Array(AGE_COUNT).fill(null),
        symbols,
      });
    }

    if (facilities.length < MIN_FACILITIES) {
      fail(`施設が${facilities.length}件しか取れていません（${MIN_FACILITIES}件以上のはず）`);
    }
    // 検算1: 斜線と空欄の数がPDFの読み取りと合うか
    if (slashes !== pdf.slashes) fail(`斜線の数が合いません（PDF ${pdf.slashes} / 取り込み ${slashes}）`);
    if (blanks !== pdf.blanks) fail(`空欄の数が合いません（PDF ${pdf.blanks} / 取り込み ${blanks}）`);
    // 検算2: 記号の数がPDFの読み取りと合うか（空欄から作った「×」を除く）
    for (const [mark, count] of marks) {
      if (mark === NONE_MARK) continue;
      if (count !== pdf.markCounts[mark]) {
        fail(`「${mark}」の数が合いません（PDF ${pdf.markCounts[mark]} / 取り込み ${count}）`);
      }
    }
    if ((marks.get(NONE_MARK) ?? 0) !== blanks) {
      fail(`空欄から作った「${NONE_MARK}」の数が空欄の数と合いません`);
    }
    // 検算3: 欄の数が施設数×年齢数になるか
    const total = [...marks.values()].reduce((a, b) => a + b, 0) + slashes;
    if (total !== facilities.length * AGE_COUNT) {
      fail(`欄の数が合いません（${total} / 施設${facilities.length}×${AGE_COUNT}）`);
    }
    console.log(
      `${facilities.length}施設 ／ ${[...marks].map(([m, n]) => `${m}${n}`).join("・")}・クラスなし${slashes}`,
    );

    const previous = fs.existsSync(OUT_PATH)
      ? (JSON.parse(fs.readFileSync(OUT_PATH, "utf-8")) as {
          asOf?: string;
          facilities?: unknown[];
          sourceFiles?: Record<string, string>;
        })
      : null;
    if (previous?.facilities && facilities.length < previous.facilities.length * 0.9) {
      fail(
        `施設数が大きく減っています（前回 ${previous.facilities.length}件 → 今回 ${facilities.length}件）`,
      );
    }
    // 自治体は基準日を変えずに資料を差し替えることがある。
    // 取り込み元のURLも同じときだけ、書き換えを見送る
    if (previous?.asOf === asOf && previous?.sourceFiles?.vacancy === link.url) {
      console.log(`公式データの時点が前回と同じ（${asOf}）のため更新はありません。`);
      return;
    }

    const notes = [
      `高崎市は募集状況を人数ではなく記号で公表しています。これは${targetLabel}入所の選考にあたる分で、${asOf}時点のものです。`,
      "公式の凡例は「◎」が5人以上、「○」が3〜4人程度、「△」が1〜2人程度の受入可能人数、「＊」は今後募集を行う可能性はあるが現時点で未定、空らんは受入可能人数が無い年齢区分です。当サイトでは空らんを「×」に置き換えて載せています。",
      "公式の表で斜線が引かれている年齢は「—」にしています。その年齢のクラスを設けていないことを表します。",
      `公式の資料には「${pdf.headerLabels[1]}」の募集状況も併記されていますが、当サイトでは直近の入所分だけを載せています。`,
      "市は「『◎』『〇』『△』が示されている施設でも、施設における保育士確保の状況やお子様の健康面等の状態により受入が難しい場合があります」としています。",
      "入所の内定は選考を経て決定しますので、募集がある施設への入所を保証するものではありません。受入可能人数は状況により増減する場合があります。",
      "施設種別の公立は公立保育所、私立は私立保育所、こども園は私立認定こども園（保育部分）のことをいいます。私立認定こども園（教育部分）の募集状況は直接施設にお問い合わせください。",
    ];

    const dataset = {
      municipalitySlug: MUNICIPALITY_SLUG,
      municipalityName: MUNICIPALITY_NAME,
      prefecture: PREFECTURE,
      asOf,
      fetchedAt: todayJst(),
      sourceName: SOURCE_NAME,
      sourceUrl: INDEX_URL,
      sourceFiles: { vacancy: link.url },
      metrics: ["symbol"],
      subtitle: `${targetLabel}入所の選考にあたる募集状況`,
      notes,
      wards,
      categories,
      symbolLegend: LEGEND,
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
    console.log(`  ${facilities.length}施設 / ${wards.length}地域 / ${categories.join("・")}`);
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

main().catch((err) => fail(String(err)));
