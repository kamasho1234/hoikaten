/**
 * 山口市の認可保育施設の空き状況を取り込む
 *
 * 実行: npm run vacancy:fetch:yamaguchi
 *
 * ## この自治体の特徴
 * - 記号（○＝3人以上空きあり、△＝1〜2人空きあり）。**空らんは空きなし**と凡例に明記
 * - **空らんのままでは当サイトの「—」（クラスなし）と区別が付かない**ので、
 *   空らんは「✕」（空きなし）に置き換えて表示し、置き換えたことを注記に書く
 * - そのクラスがない欄には斜線が引いてある（「3歳児〜」の園の0〜2歳など）
 * - 同じ月に「利用調整前」と「利用調整後」があるので、後を優先する
 * - 基準日はリンクの文言とPDFの両方にある（突き合わせる）
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "yamaguchi";
const MUNICIPALITY_NAME = "山口市";
const SOURCE_NAME = "山口市「認可保育施設 空き状況一覧」";
const INDEX_URL = "https://www.city.yamaguchi.lg.jp/site/kodomo/180779.html";
const AGE_COUNT = 6;
const MIN_FACILITIES = 40;
const UA = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";

/** 公式の表で空らんになっている「空きなし」を、この記号に置き換えて表示する */
const EMPTY_MARK = "✕";

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const EXTRACTOR = path.join(process.cwd(), "scripts", "yamaguchi-pdf-extract.py");

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
  return (s ?? "").replace(/<[^>]+>/g, "").replace(/[\s　]/g, "");
}

/** 記号の形をそろえる */
function shapeOf(mark: string): string {
  if (/^[○◯〇]$/.test(mark)) return "○";
  if (/^[×✕✖]$/.test(mark)) return "✕";
  return mark;
}

/** 「公」「私」「地域」を分かりやすい言い方にする */
const KUBUN_LABELS: Record<string, string> = {
  公: "公立",
  私: "私立",
  地域: "地域型保育事業",
};

type PdfResult = {
  asOf: [number, number, number];
  target: [number, number, string];
  legend: { mark: string; label: string }[];
  emptyLabel: string;
  notes: string[];
  wards: string[];
  markCounts: Record<string, number>;
  slashes: number;
  blanks: number;
  rows: {
    ward: string;
    kubun: string;
    name: string;
    ageLimit: string;
    marks: (string | null)[];
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

  // 「令和8年度空き状況一覧9月利用調整後（令和8年8月24日時点）」
  const links = [...html.matchAll(/<a[^>]+href="([^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => ({ url: new URL(m[1], INDEX_URL).toString(), text: toHalfWidth(squeeze(m[2])) }))
    .map((l) => {
      const m = l.text.match(/空き状況一覧(\d+)月利用調整(前|後)（令和(\d+)年(\d+)月(\d+)日時点）/);
      if (!m) return null;
      const month = Number(m[1]);
      const stage = m[2] === "後" ? 1 : 0;
      const [reiwa, asOfMonth, asOfDay] = m.slice(3, 6).map(Number);
      return {
        ...l,
        month,
        stage,
        reiwa,
        asOfMonth,
        asOfDay,
        // 年度は4月始まりなので1〜3月は後ろに並べる。同じ月なら調整後を優先
        sortKey: (month >= 4 ? month : month + 12) * 10 + stage,
      };
    })
    .filter((v): v is NonNullable<typeof v> => v !== null);
  if (links.length === 0)
    fail("空き状況のPDFが見つかりません。ページの構成が変わった可能性があります。");
  const latest = links.reduce((a, b) => (b.sortKey > a.sortKey ? b : a));
  console.log(`最新: ${latest.text}\n  ${latest.url}`);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "yamaguchi-vacancy-"));
  try {
    const r = await fetch(latest.url, { headers: { "User-Agent": UA } });
    if (!r.ok) fail(`PDFの取得に失敗しました（${r.status}）: ${latest.url}`);
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.subarray(0, 4).toString() !== "%PDF") fail(`PDFではありません: ${latest.url}`);
    const file = path.join(tmpDir, "yamaguchi.pdf");
    fs.writeFileSync(file, buf);

    let pdf: PdfResult;
    try {
      pdf = JSON.parse(runPython([EXTRACTOR, file])) as PdfResult;
    } catch (err) {
      fail(`抽出結果を読めません: ${String(err)}`);
    }

    // 基準日と入所月がリンクの文言と合っているか
    const [reiwa, asOfMonth, day] = pdf.asOf;
    if (reiwa !== latest.reiwa || asOfMonth !== latest.asOfMonth || day !== latest.asOfDay) {
      fail(
        `PDFの基準日（令和${reiwa}年${asOfMonth}月${day}日）がリンクの文言` +
          `（令和${latest.reiwa}年${latest.asOfMonth}月${latest.asOfDay}日）と違います`
      );
    }
    const [, targetMonth, targetStage] = pdf.target;
    if (targetMonth !== latest.month || targetStage !== (latest.stage === 1 ? "後" : "前")) {
      fail(
        `PDFの入所調整（${targetMonth}月・調整${targetStage}）がリンクの文言（${latest.month}月・調整${
          latest.stage === 1 ? "後" : "前"
        }）と違います`
      );
    }
    const asOf = `${2018 + reiwa}-${String(asOfMonth).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    if (asOf > todayJst()) fail(`基準日（${asOf}）が今日より先になっています`);
    const targetYear = 2018 + reiwa;
    console.log(`基準日: ${asOf}（${targetYear}年${targetMonth}月入所の調整${targetStage}）`);

    // 凡例。空らんの意味も公式が書いているので、置き換え後の記号として足す
    const symbolLegend = pdf.legend.map((l) => ({
      mark: shapeOf(l.mark),
      label: l.label,
      open: /あり$/.test(l.label),
    }));
    if (symbolLegend.length < 2) fail(`凡例が${symbolLegend.length}件しか取れていません`);
    if (!symbolLegend.some((l) => l.open)) fail("空きありの記号が凡例にありません");
    symbolLegend.push({ mark: EMPTY_MARK, label: pdf.emptyLabel, open: false });
    console.log(`凡例: ${symbolLegend.map((l) => `${l.mark}＝${l.label}`).join(" / ")}`);
    const legendByShape = new Map(symbolLegend.map((l) => [shapeOf(l.mark), l.mark]));

    if (pdf.wards.length < 2) fail(`地域が${pdf.wards.length}件しか取れていません`);
    const wards = pdf.wards;
    console.log(`地域: ${wards.join(" / ")}`);

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
    let noClass = 0;
    let blanks = 0;

    for (const row of pdf.rows) {
      const name = squeeze(row.name);
      if (!name) fail("施設名が空の行があります");
      if (seen.has(name)) fail(`施設名が重複しています: ${name}`);
      seen.add(name);

      const w = wards.indexOf(row.ward);
      if (w < 0) fail(`${name}: 地域が一覧にありません: 「${row.ward}」`);

      const category = KUBUN_LABELS[row.kubun];
      if (!category) fail(`${name}: 分からない区分です: 「${row.kubun}」`);
      let c = categories.indexOf(category);
      if (c < 0) {
        categories.push(category);
        c = categories.length - 1;
      }

      const symbols: (string | null)[] = [];
      for (let age = 0; age < AGE_COUNT; age++) {
        const raw = row.marks[age];
        // 斜線が引かれていた欄は Python 側で null になっている
        if (raw === null) {
          noClass += 1;
          symbols.push(null);
          continue;
        }
        // 空らんは公式の凡例どおり「空きなし」。当サイトでは記号に置き換えて表示する
        if (raw === "") {
          blanks += 1;
          marks.set(EMPTY_MARK, (marks.get(EMPTY_MARK) ?? 0) + 1);
          symbols.push(EMPTY_MARK);
          continue;
        }
        const mark = legendByShape.get(shapeOf(squeeze(raw)));
        if (!mark) fail(`${name}: ${age}歳児が凡例にない記号です: 「${raw}」`);
        marks.set(mark, (marks.get(mark) ?? 0) + 1);
        symbols.push(mark);
      }
      if (symbols.every((s) => s === null)) fail(`${name}: 全てのクラスがありません`);

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
    if (noClass !== pdf.slashes) {
      fail(`斜線の欄の数が合いません（PDF ${pdf.slashes} / 取り込み ${noClass}）`);
    }
    if (blanks !== pdf.blanks) {
      fail(`空らんの数が合いません（PDF ${pdf.blanks} / 取り込み ${blanks}）`);
    }

    // 検算1: 記号と斜線の合計が施設数×クラス数になるか
    const total = [...marks.values()].reduce((a, b) => a + b, 0);
    if (total + noClass !== facilities.length * AGE_COUNT) {
      fail(
        `欄の数が合いません（記号${total}＋斜線${noClass} / 施設${facilities.length}×${AGE_COUNT}）`
      );
    }

    // 検算2: 公式の表に印字された記号（○△）の数がPDFの文字と合うか
    for (const [mark, count] of marks) {
      if (mark === EMPTY_MARK) continue; // 空らんは文字がないので数えられない
      const inText = Object.entries(pdf.markCounts)
        .filter(([m]) => shapeOf(m) === shapeOf(mark))
        .reduce((acc, [, v]) => acc + v, 0);
      if (count !== inText) {
        fail(`「${mark}」の数が合いません（PDFの文字 ${inText}個 / 取り込み ${count}個）`);
      }
    }
    console.log("記号の数はPDFの文字と一致し、欄の数も施設数×クラス数と合いました");

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
      `山口市は空き状況を人数ではなく記号で公表しています。これは${targetYear}年${targetMonth}月入所の調整${targetStage}の情報で、${asOf}時点のものです。`,
      `公式の表では空きがない場合はらんが空になっています（凡例に「空欄：${pdf.emptyLabel}」と書かれています）。当サイトでは、そのクラスがないらんと見分けられるように「${EMPTY_MARK}」（${pdf.emptyLabel}）として表示しています。`,
      ...pdf.notes,
      "そのクラスがないらんは「—」にしています（公式の表では斜線です）。",
    ];

    const dataset = {
      municipalitySlug: MUNICIPALITY_SLUG,
      municipalityName: MUNICIPALITY_NAME,
      asOf,
      fetchedAt: todayJst(),
      sourceName: SOURCE_NAME,
      sourceUrl: INDEX_URL,
      sourceFiles: { vacancy: latest.url },
      metrics: ["symbol"],
      subtitle: `${targetYear}年${targetMonth}月入所の調整${targetStage}の空き状況`,
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
    console.log(`  ${facilities.length}施設`);
    console.log(`  そのクラスがないらん（斜線）: ${noClass}`);
    console.log(
      `  地域ごとの数: ${wards
        .map((name, i) => `${name} ${facilities.filter((f) => f.w === i).length}`)
        .join(" / ")}`
    );
    console.log(
      `  区分ごとの数: ${categories
        .map((name, i) => `${name} ${facilities.filter((f) => f.c === i).length}`)
        .join(" / ")}`
    );
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
