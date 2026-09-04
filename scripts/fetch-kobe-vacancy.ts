/**
 * 神戸市の教育・保育施設（2・3号）の受入予定・申込状況を取り込む
 *
 * 実行: npm run vacancy:fetch:kobe
 *
 * ## この自治体の特徴
 * - **区・支所ごとに11個のPDF**に分かれている
 * - **受入予定は記号**（◎＝6人以上、○＝3〜5人、△＝1〜2人、×＝0人）だが、
 *   **申込児童数は実数**（第1希望のみ）で、合計の列もあるので行ごとに検算できる
 * - 表の**施設名の欄には分類の文字もいっしょに入る**（「幼保連携型認定こども園聖ニコラス天使園」）。
 *   分類の一覧を先に集めておき、施設名の欄の先頭から取り除いて名前にする
 * - そのクラスがない年齢は空欄。年齢は列の位置で決まる
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "kobe";
const MUNICIPALITY_NAME = "神戸市";
const SOURCE_NAME = "神戸市「教育・保育施設（2・3号）の申込状況」";
const INDEX_URL = "https://www.city.kobe.lg.jp/a65174/kosodate/yochien/moshikomijokyo.html";
const AGE_COUNT = 6;
const UA = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";

const COL_KIND = 0;
const COL_NAME = 1;
const COL_ORG = 2;
const COL_CAPACITY = 3;
const COL_MARK = 4;
const COL_WAITING = COL_MARK + AGE_COUNT;
const COL_TOTAL = COL_WAITING + AGE_COUNT;

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const EXTRACTOR = path.join(process.cwd(), "scripts", "kobe-pdf-extract.py");

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
  return (s ?? "").replace(/[\s　]/g, "");
}

function stripTags(html: string): string {
  return html.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").replace(/[\s　]+/g, " ").trim();
}

type Extracted = {
  asOf: [number, number, number];
  legend: { mark: string; label: string }[];
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

async function main() {
  console.log(`${MUNICIPALITY_NAME}の受入予定・申込状況を取り込みます`);
  console.log(`公式ページ: ${INDEX_URL}\n`);

  const res = await fetch(INDEX_URL, { headers: { "User-Agent": UA } });
  if (!res.ok) fail(`公式ページが ${res.status} を返しました`);
  const html = await res.text();

  // 「2026年10月入園の受入予定・申込状況（8月17日時点）」
  const body = toHalfWidth(stripTags(html.replace(/<script[\s\S]*?<\/script>/gi, "")));
  const heading = body.match(/(\d{4})年(\d+)月入園の受入予定・申込状況（(\d+)月(\d+)日時点）/);
  if (!heading) fail("見出しから対象月と時点を読み取れませんでした");
  const targetYear = Number(heading[1]);
  const targetMonth = Number(heading[2]);

  // 「東灘区（PDF：211KB）」のように区・支所ごとに分かれている
  const links = [...html.matchAll(/<a[^>]+href="([^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => ({ url: new URL(m[1], INDEX_URL).toString(), text: stripTags(m[2]) }))
    .map((l) => {
      const m = l.text.match(/^(.+?)（PDF/);
      if (!m) return null;
      const label = squeeze(m[1]);
      if (!/[区所]$|[区所]（/.test(label) && !label.includes("区") && !label.includes("支所")) return null;
      // 「北区（北神区所管区域を除く）」のような但し書きは落とす
      const ward = label.replace(/（.*?）/g, "");
      if (!ward.endsWith("区") && !ward.endsWith("支所")) return null;
      return { ...l, ward };
    })
    .filter((v): v is NonNullable<typeof v> => v !== null);
  const seenWard = new Set<string>();
  const targets = links.filter((l) => {
    if (seenWard.has(l.ward)) return false;
    seenWard.add(l.ward);
    return true;
  });
  if (targets.length < 9) fail(`区・支所のPDFが${targets.length}個しか見つかりません`);
  console.log(`対象: ${targetYear}年${targetMonth}月入園 / ${targets.length}地区`);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "kobe-vacancy-"));
  try {
    const files: string[] = [];
    for (const [index, link] of targets.entries()) {
      const r = await fetch(link.url, { headers: { "User-Agent": UA } });
      if (!r.ok) fail(`PDFの取得に失敗しました（${r.status}）: ${link.url}`);
      const buf = Buffer.from(await r.arrayBuffer());
      if (buf.subarray(0, 4).toString() !== "%PDF") fail(`PDFではありません: ${link.url}`);
      const file = path.join(tmpDir, `kobe-${index}.pdf`);
      fs.writeFileSync(file, buf);
      files.push(file);
    }

    let data: Extracted[];
    try {
      data = JSON.parse(runPython([EXTRACTOR, ...files])) as Extracted[];
    } catch (err) {
      fail(`抽出結果を読めません: ${String(err)}`);
    }
    if (data.length !== targets.length) fail(`抽出結果の数が合いません（${data.length}）`);

    // 基準日と凡例は全地区で同じはず
    const asOfSet = new Set(data.map((d) => d.asOf.join("-")));
    if (asOfSet.size !== 1) fail(`地区によって基準日が違います: ${[...asOfSet].join(" / ")}`);
    const [ay, am, ad] = data[0].asOf;
    const asOf = `${ay}-${String(am).padStart(2, "0")}-${String(ad).padStart(2, "0")}`;
    console.log(`基準日: ${asOf}`);

    const legendSource = data.find((d) => d.legend.length >= 4);
    if (!legendSource) fail("記号の凡例を読み取れませんでした");
    const order = ["◎", "○", "〇", "△", "×"];
    const symbolLegend = legendSource.legend
      .filter((l) => order.includes(l.mark))
      .sort((a, b) => order.indexOf(a.mark) - order.indexOf(b.mark))
      .map((l) => ({ mark: l.mark, label: l.label, open: !/^0人$/.test(l.label) }));
    if (symbolLegend.length < 4) fail(`記号の凡例が足りません: ${JSON.stringify(legendSource.legend)}`);
    console.log(`凡例: ${symbolLegend.map((l) => `${l.mark}＝${l.label}`).join(" / ")}`);
    const knownMarks = new Set(symbolLegend.map((l) => l.mark));

    // 分類は「分類」の列に入っている値を集めておき、施設名から切り離すのに使う
    const kinds = new Set<string>();
    for (const block of data) {
      for (const row of block.rows) {
        const kind = squeeze(row[COL_KIND]);
        if (kind && kind !== "分類") kinds.add(kind);
      }
    }
    if (kinds.size === 0) fail("分類を1つも読み取れませんでした");
    console.log(`分類: ${[...kinds].join("・")}`);

    const wards: string[] = [];
    const categories: string[] = [];
    const facilities: {
      id: string;
      name: string;
      w: number;
      c: number | null;
      vacancy: (number | null)[];
      waiting: (number | null)[];
      symbols: (string | null)[];
    }[] = [];
    const marks = new Map<string, number>();
    const seen = new Set<string>();
    let waitingTotal = 0;
    let noClass = 0;
    const merged: string[] = [];
    let blankWaiting = 0;

    for (const [index, block] of data.entries()) {
      const ward = targets[index].ward;
      let count = 0;
      for (const row of block.rows) {
        const rawName = squeeze(row[COL_NAME]);
        const org = squeeze(row[COL_ORG]);
        if (!rawName || (org !== "公立" && org !== "私立")) continue;

        // 施設名の欄には分類の文字がいっしょに入っている行がある。
        // 素のテキストと突き合わせる作りにすると、名前が折り返された行で
        // 対応がずれて別の施設の名前が付いてしまうので、欄の文字から切り分ける
        let kind: string | null = null;
        let name = rawName;
        const matched = [...kinds]
          .filter((k) => rawName.startsWith(k) && rawName.length > k.length)
          .sort((a, b) => b.length - a.length)[0];
        if (matched) {
          kind = matched;
          name = rawName.slice(matched.length);
        }

        if (!name) fail(`${ward}: 施設名が空になりました（${rawName}）`);

        if (!wards.includes(ward)) wards.push(ward);
        if (kind && !categories.includes(kind)) categories.push(kind);
        const id = `${ward}-${name}`;
        if (seen.has(id)) fail(`施設が重複しています: ${id}`);
        seen.add(id);

        const symbols: (string | null)[] = [];
        const waiting: (number | null)[] = [];
        let rowSum = 0;
        for (let age = 0; age < AGE_COUNT; age++) {
          const mark = squeeze(row[COL_MARK + age] ?? "");
          const waitingRaw = toHalfWidth(squeeze(row[COL_WAITING + age] ?? ""));
          // 受入予定の欄だけ空で、申込児童数は入っていることがある。
          // 両方とも空のときだけ、そのクラスがないものとして扱う
          if (mark === "" && waitingRaw === "") {
            noClass += 1;
            symbols.push(null);
            waiting.push(null);
            continue;
          }
          if (mark !== "" && !knownMarks.has(mark)) {
            fail(`${ward} ${name}: 凡例にない記号です: 「${mark}」`);
          }
          if (mark !== "") marks.set(mark, (marks.get(mark) ?? 0) + 1);
          symbols.push(mark === "" ? null : mark);
          if (waitingRaw === "") {
            // 受入予定は書いてあるのに申込児童数の欄が空のことがある
            blankWaiting += 1;
            waiting.push(null);
            continue;
          }
          if (!/^\d+$/.test(waitingRaw)) {
            fail(`${ward} ${name}: 申込児童数として読めません: 「${row[COL_WAITING + age]}」`);
          }
          waiting.push(Number(waitingRaw));
          rowSum += Number(waitingRaw);
        }
        // 別の園と受け入れ枠をまとめている施設は、全ての欄が空になる（注記で断られている）
        if (symbols.every((v) => v === null) && waiting.every((v) => v === null)) {
          merged.push(`${ward}${name}`);
          continue;
        }

        // 合計の列と突き合わせる
        const totalRaw = toHalfWidth(squeeze(row[COL_TOTAL] ?? ""));
        if (!/^\d+$/.test(totalRaw)) fail(`${ward} ${name}: 合計を読めません: 「${row[COL_TOTAL]}」`);
        if (Number(totalRaw) !== rowSum) {
          fail(`${ward} ${name}: 合計が合いません（公式 ${totalRaw} / 年齢の和 ${rowSum}）`);
        }
        waitingTotal += rowSum;

        facilities.push({
          id,
          name,
          w: wards.indexOf(ward),
          c: kind ? categories.indexOf(kind) : null,
          vacancy: new Array(AGE_COUNT).fill(null),
          waiting,
          symbols,
        });
        count += 1;
      }
      console.log(`  ${ward}: ${count}施設`);
    }

    if (facilities.length < 300) fail(`施設が${facilities.length}件しか取れていません`);
    for (const item of symbolLegend) {
      if (!marks.has(item.mark)) fail(`凡例にある「${item.mark}」が表に1つも出てきません`);
    }

    const previous = fs.existsSync(OUT_PATH)
      ? (JSON.parse(fs.readFileSync(OUT_PATH, "utf-8")) as { asOf?: string; facilities?: unknown[]; sourceFiles?: Record<string, string> })
      : null;
    if (previous?.facilities && facilities.length < previous.facilities.length * 0.9) {
      fail(
        `施設数が大きく減っています（前回 ${previous.facilities.length}件 → 今回 ${facilities.length}件）`
      );
    }
    // 自治体は基準日を変えずに資料を差し替えることがある。
    // 取り込み元の一式も同じときだけ、書き換えを見送る
    if (
      previous?.asOf === asOf &&
      JSON.stringify(previous?.sourceFiles ?? {}) === JSON.stringify(Object.fromEntries(targets.map((t) => [t.ward, t.url])))
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
      sourceFiles: Object.fromEntries(targets.map((t) => [t.ward, t.url])),
      metrics: ["symbol", "waiting"],
      subtitle: `${targetYear}年${targetMonth}月入園の受入予定・申込状況`,
      notes: [
        "神戸市は受入予定を人数ではなく記号で公表しています。当サイトでも公式の記号のまま載せています。",
        "申込児童数は第1希望のみを集計したものです（申し込みは第1〜第5希望まで）。",
        "受入予定は基準日時点のもので、施設の状況によって変わることがあります。",
        "受入可能な表記であっても、求職活動中の場合は入所できないことがあります。詳しくは各区・支所の保健福祉課へお問い合わせください。",
        "年齢はその年度の4月1日時点のものです。",
        "受け入れ枠を別の園とまとめて出している施設は、単独の数字がないため載せていません。",
      ],
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
    console.log(
      `  ${facilities.length}施設 / ${wards.length}地区 / ${categories.length}分類 / 申込児童数の合計 ${waitingTotal}`
    );
    console.log(`  そのクラスのない年齢: ${noClass}`);
    if (blankWaiting > 0) console.log(`  申込児童数の欄が空だったクラス: ${blankWaiting}`);
    if (merged.length > 0) {
      console.log(`  受け入れ枠を別の園とまとめていて全ての欄が空だった施設: ${merged.join("、")}`);
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
