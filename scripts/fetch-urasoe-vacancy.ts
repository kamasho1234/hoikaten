/**
 * 浦添市の受入可能児童数・入所待ち児童数を取り込む
 *
 * 実行: npm run vacancy:fetch:urasoe
 *
 * ## この自治体の特徴
 * - **受入可能児童数と入所待ち児童数の2つ**を人数で公表している
 * - 入所待ち児童数は園ごとの申込数。複数の園を希望すると希望した園それぞれに
 *   数えられるので、合計は実人数より多くなる（園ごとの競争率としては読めない）
 * - 5ページの区分ごと（公立保育所／法人保育園／小規模・事業所内保育事業所／
 *   私立認定こども園／公立・公私連携型認定こども園）に表が分かれる
 * - 1施設が2行（受入可能・入所待ち）
 * - 「調整中」の施設は数がひとつも出ていないことがある
 * - 記事のURLは月が変わっても同じで、リンクの題だけが変わる
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "urasoe";
const MUNICIPALITY_NAME = "浦添市";
const SOURCE_NAME = "浦添市「年度途中の入所受入可能児童数」";
const INDEX_URL = "https://www.city.urasoe.lg.jp/doc/2026032700044/";
const AGE_COUNT = 6;
const MIN_FACILITIES = 55;
const UA = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const EXTRACTOR = path.join(process.cwd(), "scripts", "urasoe-pdf-extract.py");

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

type Counts = (number | null)[];
type PdfResult = {
  target: [number, number, number];
  notes: string[];
  groups: {
    heading: string;
    rows: { no: number; name: string; remark: string; vacancy: Counts; waiting: Counts }[];
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

  // ページの題に「（R8.8.24 18:00更新）」と入っている
  // 空白をつめると「R8.8.2418:00更新」とつながるので、日は2桁までに区切る
  const updated = /[（(]R(\d{1,2})\.(\d{1,2})\.(\d{1,2})[^）)]*更新[）)]/.exec(toHalfWidth(squeeze(html)));
  if (!updated) fail("ページの題から更新日を読み取れませんでした");
  const asOf = `${reiwaToYear(Number(updated[1]))}-${updated[2].padStart(2, "0")}-${updated[3].padStart(2, "0")}`;
  if (asOf > todayJst()) fail(`更新日（${asOf}）が今日より先になっています`);

  const links = [...html.matchAll(/<a[^>]+href="([^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => ({
      url: new URL(m[1], res.url || INDEX_URL).toString(),
      text: toHalfWidth(squeeze(m[2])),
    }))
    // 1号認定（教育のみ）の枠は載せないので、2号・3号のPDFだけを選ぶ
    .filter((l) => l.text.includes("受入可能児童数") && l.text.includes("2号"));
  if (links.length !== 1) fail(`2号・3号の受入可能児童数のPDFが${links.length}件あります（1件のはず）`);
  const link = links[0];
  console.log(`PDF: ${link.text}\n  ${link.url}`);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "urasoe-vacancy-"));
  try {
    const r = await fetch(link.url, { headers: { "User-Agent": UA } });
    if (!r.ok) fail(`PDFの取得に失敗しました（${r.status}）: ${link.url}`);
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.subarray(0, 4).toString() !== "%PDF") fail(`PDFではありません: ${link.url}`);
    const file = path.join(tmpDir, "urasoe.pdf");
    fs.writeFileSync(file, buf);

    let pdf: PdfResult;
    try {
      pdf = JSON.parse(runPython([EXTRACTOR, file])) as PdfResult;
    } catch (err) {
      fail(`抽出結果を読めません: ${String(err)}`);
    }

    const targetLabel = `${reiwaToYear(pdf.target[0])}年${pdf.target[1]}月${pdf.target[2]}日`;
    console.log(`時点: ${asOf}（ページの更新日） ／ 対象: ${targetLabel}入所`);

    const categories: string[] = [];
    const facilities: {
      id: string;
      name: string;
      w: null;
      c: number;
      vacancy: Counts;
      waiting: Counts;
    }[] = [];
    const seen = new Set<string>();
    const adjusting: string[] = [];
    let vacancyTotal = 0;
    let waitingTotal = 0;

    for (const group of pdf.groups) {
      const kind = squeeze(group.heading);
      if (!kind) fail("区分の名前が空です");
      let c = categories.indexOf(kind);
      if (c < 0) {
        categories.push(kind);
        c = categories.length - 1;
      }

      // 番号は区分ごとに1から振り直される
      for (let index = 0; index < group.rows.length; index++) {
        const row = group.rows[index];
        if (row.no !== index + 1) {
          fail(`${kind}: 番号が飛んでいます（${index + 1}番目が${row.no}番）`);
        }
        const name = squeeze(row.name);
        if (!name) fail(`${kind}: 施設名が空の行があります`);
        if (seen.has(name)) fail(`施設名が重複しています: ${name}`);
        seen.add(name);

        for (const [label, counts] of [
          ["受入可能", row.vacancy],
          ["入所待ち", row.waiting],
        ] as [string, Counts][]) {
          if (counts.length !== AGE_COUNT) fail(`${name} ${label}: 年齢が${counts.length}個です`);
          for (const value of counts) {
            if (value === null) continue;
            if (!Number.isInteger(value) || value < 0 || value > 999) {
              fail(`${name} ${label}: 人数が想定の範囲にありません（${value}）`);
            }
          }
        }
        vacancyTotal += row.vacancy.reduce((a: number, b) => a + (b ?? 0), 0);
        waitingTotal += row.waiting.reduce((a: number, b) => a + (b ?? 0), 0);

        const remark = squeeze(row.remark);
        if (remark && !remark.startsWith("全年齢受入なし")) {
          adjusting.push(`${name}（${remark}）`);
        }

        facilities.push({ id: name, name, w: null, c, vacancy: row.vacancy, waiting: row.waiting });
      }
    }

    if (facilities.length < MIN_FACILITIES) {
      fail(`施設が${facilities.length}件しか取れていません（${MIN_FACILITIES}件以上のはず）`);
    }
    console.log(
      `${facilities.length}施設 / 受入可能 ${vacancyTotal}人 / 入所待ち ${waitingTotal}人`
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
      `浦添市が公開しているのは${targetLabel}入所の受入可能児童数と入所待ち児童数で、公式ページが${asOf}に更新されたものです。2号・3号認定（保育を必要とする枠）の数です。`,
      ...pdf.notes,
      "公式の表で空らんになっている年齢は「—」にしています。その年齢のクラスがないことを表しています。",
      ...(adjusting.length
        ? [`公式の表で数が示されていない施設があります（${adjusting.join("、")}）。`]
        : []),
    ];

    const dataset = {
      municipalitySlug: MUNICIPALITY_SLUG,
      municipalityName: MUNICIPALITY_NAME,
      asOf,
      fetchedAt: todayJst(),
      sourceName: SOURCE_NAME,
      sourceUrl: INDEX_URL,
      sourceFiles: { vacancy: link.url },
      metrics: ["vacancy", "waiting"],
      subtitle: `${targetLabel}入所の受入可能児童数`,
      waitingCaveat:
        "入所待ち児童数は園ごとの申込数です。複数の園を希望すると希望した園それぞれに数えられるので、合計は実人数より多くなります。園ごとの競争率としては読めません。",
      notes,
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
    console.log(`  ${categories.join("・")}`);
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

main().catch((err) => fail(String(err)));
