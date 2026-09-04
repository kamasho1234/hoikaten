/**
 * 弘前市の保育施設の空き状況を取り込む
 *
 * 実行: npm run vacancy:fetch:hirosaki
 *
 * ## この自治体の特徴
 * - 市は空き数を年齢別ではなく「3~5歳児クラス」「0~2歳児クラス」の2つでしか出していない。
 *   年齢別に割り振ると当サイトが数を作ってしまうので、施設ごとの合計（vacancyTotal）として持ち、
 *   2つの内訳は備考（note）に書く
 * - 部屋の空き（乳児室・ほふく室・兼室）は記号で、満2歳未満の児童にだけ関わる。
 *   年齢別ではないので、これも備考に入れる
 * - 小学校区を公表しているので wards に入れる
 * - 施設区分（保育所／認定こども園）を categories に入れる
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "hirosaki";
const MUNICIPALITY_NAME = "弘前市";
const PREFECTURE = "青森県";
const SOURCE_NAME = "弘前市「市内保育施設の空き状況一覧」";
const INDEX_URL =
  "https://www.city.hirosaki.aomori.jp/kyouiku/kosodate/2022-0207-1306-368.html";
const AGE_COUNT = 6;
const UA = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";

const COL_AREA = 0;
const COL_NAME = 1;
const COL_CATEGORY = 2;
const COL_OLDER = 5;
const COL_YOUNGER = 6;
const COL_ROOM0 = 7;
const ROOM_LABELS = ["乳児室（〜6か月）", "ほふく室（6か月〜満2歳）", "兼室（〜満2歳）"];

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const EXTRACTOR = path.join(process.cwd(), "scripts", "hirosaki-pdf-extract.py");

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

function shapeOf(mark: string): string {
  if (/^[○◯〇]$/.test(mark)) return "○";
  if (/^[×✕✖x]$/.test(mark)) return "×";
  return mark;
}

type PdfResult = {
  asOf: [number, number, number];
  forMonth: [number, number] | null;
  legend: { mark: string; label: string }[];
  markCounts: Record<string, number>;
  rows: string[][];
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

function toCount(raw: string, name: string, what: string): number {
  const v = squeeze(raw);
  if (!/^\d+$/.test(v)) fail(`${name}: ${what}が数ではありません: 「${raw}」`);
  return Number(v);
}

async function main() {
  console.log(`${MUNICIPALITY_NAME}の空き状況を取り込みます`);
  console.log(`公式ページ: ${INDEX_URL}\n`);

  const res = await fetch(INDEX_URL, { headers: { "User-Agent": UA } });
  if (!res.ok) fail(`公式ページが ${res.status} を返しました`);
  const html = await res.text();

  const pdfs = [...html.matchAll(/<a[^>]+href="([^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => ({ url: new URL(m[1], INDEX_URL).toString(), text: squeeze(m[2]) }))
    .filter((l) => /教育・保育施設空き状況一覧/.test(l.text));
  if (pdfs.length !== 1) fail(`空き状況のPDFが${pdfs.length}件見つかりました（1件のはず）`);
  const [pdfLink] = pdfs;
  console.log(`PDF: ${pdfLink.url}`);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "hirosaki-vacancy-"));
  try {
    const r = await fetch(pdfLink.url, { headers: { "User-Agent": UA } });
    if (!r.ok) fail(`PDFの取得に失敗しました（${r.status}）: ${pdfLink.url}`);
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.subarray(0, 4).toString() !== "%PDF") fail(`PDFではありません: ${pdfLink.url}`);
    const file = path.join(tmpDir, "hirosaki.pdf");
    fs.writeFileSync(file, buf);

    let pdf: PdfResult;
    try {
      pdf = JSON.parse(runPython([EXTRACTOR, file])) as PdfResult;
    } catch (err) {
      fail(`抽出結果を読めません: ${String(err)}`);
    }

    const [reiwa, month, day] = pdf.asOf;
    const asOf = `${2018 + reiwa}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    if (asOf > todayJst()) fail(`基準日（${asOf}）が今日より先になっています`);
    console.log(`基準日: ${asOf}`);

    // リンクの文字（「令和8年8月19日現在」）と、PDFの中の基準日が合っているか照らす
    const inLink = pdfLink.text.match(/令和(\d+)年(\d{1,2})月(\d{1,2})日現在/);
    if (inLink) {
      const fromLink = `${2018 + Number(inLink[1])}-${String(Number(inLink[2])).padStart(2, "0")}-${String(Number(inLink[3])).padStart(2, "0")}`;
      if (fromLink !== asOf) {
        fail(`リンクの文字の基準日（${fromLink}）とPDFの中の基準日（${asOf}）が違います`);
      }
    }

    const forMonth = pdf.forMonth
      ? `令和${pdf.forMonth[0]}年${pdf.forMonth[1]}月入所ぶん`
      : null;
    if (forMonth) console.log(`対象: ${forMonth}`);

    const roomLegend = pdf.legend.map((l) => ({
      mark: shapeOf(l.mark),
      label: l.label,
    }));
    console.log(`部屋の記号: ${roomLegend.map((l) => `${l.mark}＝${l.label}`).join(" / ")}`);
    const legendByShape = new Map(roomLegend.map((l) => [shapeOf(l.mark), l.label]));

    const wards: string[] = [];
    const categories: string[] = [];
    const facilities: {
      id: string;
      name: string;
      w: number;
      c: number;
      vacancy: (number | null)[];
      vacancyTotal: number;
      note: string;
    }[] = [];
    const marks = new Map<string, number>();
    const seen = new Set<string>();
    let ward = "";

    for (const row of pdf.rows) {
      const name = squeeze(row[COL_NAME]);
      if (!name) fail("施設名が空の行があります");
      if (seen.has(name)) fail(`施設名が重複しています: ${name}`);
      seen.add(name);

      // 小学校区は縦結合。値のある行から次の値まで引き継ぐ
      const area = squeeze(row[COL_AREA]);
      if (area) ward = area;
      if (!ward) fail(`${name}: 小学校区が分かりません`);
      if (!wards.includes(ward)) wards.push(ward);

      const category = squeeze(row[COL_CATEGORY]);
      if (!category) fail(`${name}: 施設区分が空です`);
      if (!categories.includes(category)) categories.push(category);

      const older = toCount(row[COL_OLDER], name, "3~5歳児クラスの空き");
      const younger = toCount(row[COL_YOUNGER], name, "0~2歳児クラスの空き");

      const rooms: string[] = [];
      for (let i = 0; i < ROOM_LABELS.length; i++) {
        const raw = squeeze(row[COL_ROOM0 + i] ?? "");
        const label = legendByShape.get(shapeOf(raw));
        if (!label) fail(`${name}: 凡例にない記号です: 「${raw}」`);
        marks.set(shapeOf(raw), (marks.get(shapeOf(raw)) ?? 0) + 1);
        rooms.push(`${ROOM_LABELS[i]}は${label}`);
      }

      facilities.push({
        id: name,
        name,
        w: wards.indexOf(ward),
        c: categories.indexOf(category),
        vacancy: new Array(AGE_COUNT).fill(null),
        vacancyTotal: older + younger,
        note: `0~2歳児クラスの空き${younger}人、3~5歳児クラスの空き${older}人。部屋の空きは${rooms.join("、")}。`,
      });
    }

    if (facilities.length < 60) fail(`施設が${facilities.length}件しか取れていません`);

    // 表から拾った記号の数が、PDFの文字そのものの数と合うか確かめる
    for (const [shape, count] of marks) {
      const inText = Object.entries(pdf.markCounts)
        .filter(([m]) => shapeOf(m) === shape)
        .reduce((acc, [, v]) => acc + v, 0);
      if (count !== inText) {
        fail(`「${shape}」の数が合いません（PDFの文字 ${inText}個 / 取り込み ${count}個）`);
      }
    }
    console.log("部屋の記号の数はPDFの文字と一致しました");

    const previous = fs.existsSync(OUT_PATH)
      ? (JSON.parse(fs.readFileSync(OUT_PATH, "utf-8")) as {
          asOf?: string;
          facilities?: unknown[];
          sourceFiles?: Record<string, string>;
        })
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
      previous?.sourceFiles?.vacancy === pdfLink.url &&
      JSON.stringify(previous?.facilities ?? null) === JSON.stringify(facilities)
    ) {
      console.log(`公式データの時点が前回と同じ（${asOf}）のため更新はありません。`);
      return;
    }

    const dataset = {
      municipalitySlug: MUNICIPALITY_SLUG,
      municipalityName: MUNICIPALITY_NAME,
      prefecture: PREFECTURE,
      asOf,
      fetchedAt: todayJst(),
      sourceName: SOURCE_NAME,
      sourceUrl: INDEX_URL,
      sourceFiles: { vacancy: pdfLink.url },
      metrics: ["vacancy"],
      subtitle: forMonth
        ? `${forMonth}の利用調整直後の空き状況（施設ごとの合計）`
        : "利用調整直後の空き状況（施設ごとの合計）",
      notes: [
        "弘前市は空き数を年齢別ではなく「0~2歳児クラス」「3~5歳児クラス」の2つに分けて公表しています。当サイトでは年齢別の内訳を作らず、施設ごとの合計と、2つの内訳を備考に載せています。",
        "市は「この空き状況一覧は、入園を保証するものではありません。利用申込みの際の大まかな目安としてお考えください」としています。",
        "市は「定員及び部屋の空き状況は、在園児の退所やキャンセル等により、変動することがあります」としています。",
        "市は「定員と部屋どちらも空きがある場合でも、保育士が不足することにより児童の受入ができない場合などがあります」としています。",
        "市は5月以降、0~2歳（3号認定）について利用できる枠を定員の105パーセントに拡大するほか、産休・育休期間終了時の弾力的取扱い（超過枠）を行っています。",
        "定員のクラス年齢は、その年度の3月31日時点の満年齢による区分です。年度途中で3歳になっても年度内は2歳児クラスのままです。",
        "部屋の空き状況は満2歳に満たない児童について適用されるものです。乳児室はおおむね6か月まで、ほふく室はおおむね6か月から満2歳まで、兼室（乳児室兼ほふく室）はおおむね満2歳までです。",
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

    const total = facilities.reduce((acc, f) => acc + f.vacancyTotal, 0);
    console.log(`書き出しました: ${path.relative(process.cwd(), OUT_PATH)}`);
    console.log(`  ${facilities.length}施設 / ${wards.length}小学校区 / 空き合計 ${total}人`);
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

main().catch((err) => fail(String(err)));
