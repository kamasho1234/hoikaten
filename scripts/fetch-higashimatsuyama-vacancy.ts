/**
 * 東松山市の市内認可保育施設空き状況を取り込む
 *
 * 実行: npm run vacancy:fetch:higashimatsuyama
 *
 * ## この自治体の特徴
 * - 数字は空き人数で、**0も書かれる**ので、空らんはその年齢のクラスがないことを表す
 * - **「入園年齢」の列**（「６か月～」「２か月～２歳児」「３歳児～」）から
 *   受け入れる年齢が上下とも決まるので、空らんを全件検算できる
 * - 区分は縦書きの結合セルで文字の並びが崩れる（「認定こども園」が「こど認も定園」）
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "higashimatsuyama";
const MUNICIPALITY_NAME = "東松山市";
const SOURCE_NAME = "東松山市「市内認可保育施設空き状況一覧」";
const INDEX_URL = "https://www.city.higashimatsuyama.lg.jp/soshiki/58/3112.html";
const AGE_COUNT = 6;
const MIN_FACILITIES = 20;
const UA = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const EXTRACTOR = path.join(process.cwd(), "scripts", "higashimatsuyama-pdf-extract.py");

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

/**
 * 「６か月～」「２か月～２歳児」「３歳児～」「１歳児～」から、
 * 受け入れる年齢クラスの範囲を出す
 */
function agesOf(accept: string): [number, number] | null {
  const text = toHalfWidth(squeeze(accept));
  const [fromText, toText] = text.split(/[～〜~]/);
  if (fromText === undefined) return null;

  let start: number;
  if (/^\d+(か月|ヶ月|カ月|日)$/.test(fromText)) {
    // 月齢で書かれているものはどれも0歳児クラスから
    start = 0;
  } else {
    const f = /^(\d+)歳児$/.exec(fromText);
    if (!f) return null;
    start = Number(f[1]);
  }

  let end: number;
  if (toText === undefined || toText === "") {
    // 「６か月～」のように上が書かれていないものは5歳児クラスまで
    end = AGE_COUNT - 1;
  } else {
    const t = /^(\d+)歳児$/.exec(toText);
    if (!t) return null;
    end = Number(t[1]);
  }

  if (!Number.isInteger(start) || !Number.isInteger(end)) return null;
  if (start > end || end >= AGE_COUNT) return null;
  return [start, end];
}

type PdfResult = {
  asOf: [number, number, number];
  target: [number, number];
  notes: string[];
  numbers: number;
  blanks: number;
  rows: {
    kind: string;
    name: string;
    capacity: string;
    accept: string;
    counts: (number | null)[];
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

  const res = await fetch(INDEX_URL, { headers: { "User-Agent": UA }, redirect: "follow" });
  if (!res.ok) fail(`公式ページが ${res.status} を返しました`);
  const html = await res.text();

  const links = [...html.matchAll(/<a[^>]+href="([^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => ({
      url: new URL(m[1], res.url || INDEX_URL).toString(),
      text: toHalfWidth(squeeze(m[2])),
    }))
    .map((l) => {
      const m = /空き状況一覧【令和(\d+)年(\d+)月(\d+)日現在】/.exec(l.text);
      return { ...l, key: m ? Number(m[1]) * 10000 + Number(m[2]) * 100 + Number(m[3]) : 0 };
    })
    .filter((l) => l.key > 0)
    .sort((a, b) => b.key - a.key);
  if (links.length === 0) fail("空き状況一覧のPDFが見つかりません");
  const link = links[0];
  console.log(`PDF: ${link.text}\n  ${link.url}`);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "higashimatsuyama-vacancy-"));
  try {
    const r = await fetch(link.url, { headers: { "User-Agent": UA } });
    if (!r.ok) fail(`PDFの取得に失敗しました（${r.status}）: ${link.url}`);
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.subarray(0, 4).toString() !== "%PDF") fail(`PDFではありません: ${link.url}`);
    const file = path.join(tmpDir, "higashimatsuyama.pdf");
    fs.writeFileSync(file, buf);

    let pdf: PdfResult;
    try {
      pdf = JSON.parse(runPython([EXTRACTOR, file])) as PdfResult;
    } catch (err) {
      fail(`抽出結果を読めません: ${String(err)}`);
    }

    const [reiwa, month, day] = pdf.asOf;
    const asOf = `${reiwaToYear(reiwa)}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    if (!/^\d{4}-\d{2}-\d{2}$/.test(asOf)) fail(`時点の日付を組み立てられません: ${asOf}`);
    if (asOf > todayJst()) fail(`時点の日付（${asOf}）が今日より先になっています`);
    // リンクの題の日付とPDFの中の日付が合っているか
    if (link.key !== reiwa * 10000 + month * 100 + day) {
      fail(`リンクの題（${link.text}）とPDFの中の日付（${asOf}）が違います`);
    }
    const targetLabel = `${reiwaToYear(pdf.target[0])}年${pdf.target[1]}月`;
    console.log(`時点: ${asOf} ／ 対象: ${targetLabel}入所選考`);

    const categories: string[] = [];
    const facilities: {
      id: string;
      name: string;
      w: null;
      c: number;
      vacancy: (number | null)[];
      note: string;
    }[] = [];
    const seen = new Set<string>();
    /** 公式の表で、入園年齢の外の年齢にも数が入っている施設 */
    const outsideAccept: string[] = [];
    let openSum = 0;
    let numbers = 0;
    let notOffered = 0;

    for (const row of pdf.rows) {
      const name = squeeze(row.name);
      if (!name) fail("施設名が空の行があります");
      if (seen.has(name)) fail(`施設名が重複しています: ${name}`);
      seen.add(name);

      const kind = squeeze(row.kind);
      if (!kind) fail(`${name}: 区分が空です`);
      let c = categories.indexOf(kind);
      if (c < 0) {
        categories.push(kind);
        c = categories.length - 1;
      }

      const ages = agesOf(row.accept);
      if (ages === null) fail(`${name}: 入園年齢を読み取れません（「${row.accept}」）`);
      const [start, end] = ages;

      const vacancy: (number | null)[] = [];
      for (let age = 0; age < AGE_COUNT; age++) {
        const v = row.counts[age];
        const inRange = age >= start && age <= end;
        if (v === null) {
          // 入園年齢の範囲の中が空らんになっていたら読み取りを疑う
          if (inRange) {
            fail(`${name}: ${age}歳児が空らんですが、入園年齢（${row.accept}）には入っています`);
          }
          notOffered += 1;
          vacancy.push(null);
          continue;
        }
        if (!inRange) {
          // 「東松認定こども園げんき」（入園年齢は3歳児～）の2歳児のように、
          // 入園年齢の外にも数が入っていることがある。公式の表がそうなっているので
          // 数はそのまま持ち、どの施設がそうなのかを注記に出す
          outsideAccept.push(`${name}（${age}歳児）`);
        }
        if (!Number.isInteger(v) || v < 0 || v > 99) {
          fail(`${name}: ${age}歳児の人数が想定の範囲外です（${v}）`);
        }
        numbers += 1;
        openSum += v;
        vacancy.push(v);
      }

      const capacity = squeeze(row.capacity);
      facilities.push({
        id: name,
        name,
        w: null,
        c,
        vacancy,
        note: `入園年齢: ${row.accept}${capacity ? ` ／ 定員: ${capacity}人` : ""}`,
      });
    }

    if (facilities.length < MIN_FACILITIES) {
      fail(`施設が${facilities.length}件しか取れていません（${MIN_FACILITIES}件以上のはず）`);
    }
    // 検算1: 数の欄と空らんの数がPDFの読み取りと合うか
    if (numbers !== pdf.numbers) {
      fail(`人数の欄の数が合いません（PDF ${pdf.numbers} / 取り込み ${numbers}）`);
    }
    if (notOffered !== pdf.blanks) {
      fail(`空らんの数が合いません（PDF ${pdf.blanks} / 取り込み ${notOffered}）`);
    }
    // 検算2: 欄の数が施設数×年齢数になるか
    if (numbers + notOffered !== facilities.length * AGE_COUNT) {
      fail(
        `欄の数が合いません（${numbers + notOffered} / 施設${facilities.length}×${AGE_COUNT}）`,
      );
    }
    console.log(
      `${facilities.length}施設 ／ 空き${openSum}人・クラスなし${notOffered}欄` +
        (outsideAccept.length > 0
          ? `（入園年齢の外にも数がある欄 ${outsideAccept.length}件: ${outsideAccept.join("、")}）`
          : "（入園年齢と全件一致）"),
    );

    const previous = fs.existsSync(OUT_PATH)
      ? (JSON.parse(fs.readFileSync(OUT_PATH, "utf-8")) as { asOf?: string; facilities?: unknown[]; sourceFiles?: Record<string, string> })
      : null;
    if (previous?.facilities && facilities.length < previous.facilities.length * 0.9) {
      fail(`施設数が大きく減っています（前回 ${previous.facilities.length}件 → 今回 ${facilities.length}件）`);
    }
    // 自治体は基準日を変えずに資料を差し替えることがある。
    // 取り込み元のURLも同じときだけ、書き換えを見送る
    if (previous?.asOf === asOf && previous?.sourceFiles?.vacancy === link.url) {
      console.log(`公式データの時点が前回と同じ（${asOf}）のため更新はありません。`);
      return;
    }

    const notes = [
      `${targetLabel}入所選考のための空き状況です。${asOf}時点のものです。`,
      "公式の表で空らんになっている年齢は「—」にしています。空きがなければ0と書かれ、施設ごとの「入園年齢」とも一つずつ照らし合わせています。",
      "施設ごとの「入園年齢」と「定員」は公式の表に載っているものをそのまま出しています。",
      ...(outsideAccept.length > 0
        ? [
            `公式の表では、次の年齢に「入園年齢」の外なのに数が入っています。公式の表のまま出しています: ${outsideAccept.join("、")}。`,
          ]
        : []),
      ...pdf.notes.map((n) => squeeze(n)),
    ];

    const dataset = {
      municipalitySlug: MUNICIPALITY_SLUG,
      municipalityName: MUNICIPALITY_NAME,
      asOf,
      fetchedAt: todayJst(),
      sourceName: SOURCE_NAME,
      sourceUrl: INDEX_URL,
      sourceFiles: { vacancy: link.url },
      metrics: ["vacancy"],
      subtitle: `${targetLabel}入所選考の空き状況`,
      notes,
      wards: [] as string[],
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
    console.log(`  ${facilities.length}施設 / ${categories.join("・")}`);
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

main().catch((err) => fail(String(err)));
