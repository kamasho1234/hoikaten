/**
 * 茅ヶ崎市の認可保育所等の空き状況・待機児童数を取り込む
 *
 * 実行: npm run vacancy:fetch:chigasaki
 *
 * ## この自治体の特徴
 * - **空きは記号**（〇＝若干空きあり、×＝空きなし）だが、
 *   **待機児童数は実数**を別のPDFで出している
 * - 受け入れ対象外のクラスは**網掛け**で示される。網掛けの上にも×が印字されているので、
 *   文字だけでは区別が付かない。抽出側で灰色の塗りを見て切り分ける
 * - 待機児童数のPDFには合計の列と市内合計の行があるので、それで検算できる。
 *   さらに網掛けの位置と、待機児童数が空欄のクラスが一致するかも突き合わせる
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "chigasaki";
const MUNICIPALITY_NAME = "茅ヶ崎市";
const SOURCE_NAME = "茅ヶ崎市「市内の保育所等の待機・空き状況」";
const INDEX_URL = "https://www.city.chigasaki.kanagawa.jp/kosodate/1024751/hoikuen/1004777.html";
const AGE_COUNT = 6;
const UA = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";

/** 空き状況の記号。公式の注記から取る */
const OPEN_MARK = "〇";
const CLOSED_MARK = "×";

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const EXTRACTOR = path.join(process.cwd(), "scripts", "chigasaki-pdf-extract.py");

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
  return s.replace(/[０-９Ａ-Ｚａ-ｚ]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xfee0));
}

function squeeze(s: string): string {
  return (s ?? "").replace(/[\s　]/g, "");
}

function stripTags(html: string): string {
  return html
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&times;/g, "×")
    .replace(/&amp;/g, "&")
    .replace(/[\s　]+/g, " ")
    .trim();
}

/**
 * 2つのPDFの間で施設名の書き方が揺れている（全角英数、
 * 「幼保連携型認定こども園」の付け外し、「ほいくえん」と「保育園」）ので、
 * 突き合わせるときだけそろえる。表示にはこの値を使わない
 */
function normalizeName(s: string): string {
  return toHalfWidth(squeeze(s))
    .toLowerCase()
    .replace(/^(幼保連携型|幼稚園型|保育所型|地方裁量型)?認定こども園/, "")
    .replace(/ほいくえん/g, "保育園")
    .replace(/[・･～〜]/g, "");
}

// 2つのPDFで全角と半角が混ざっているので、比べるときは半角にそろえる
const AGE_LABELS = ["0歳クラス", "1歳クラス", "2歳クラス", "3歳クラス", "4歳クラス", "5歳クラス"];
const ageLabel = (s: string) => toHalfWidth(squeeze(s));

type Extracted = {
  vacancy: { rows: string[][]; shaded: number[][]; legend: string };
  waiting: { rows: string[][] };
};

function runPython(args: string[]): string {
  const candidates = process.env.PYTHON ? [process.env.PYTHON] : ["python3", "python"];
  let lastError = "";
  for (const bin of candidates) {
    try {
      return execFileSync(bin, args, { encoding: "utf-8", maxBuffer: 64 * 1024 * 1024 });
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

/** 年齢の列がどこから始まるかを、見出しの行から決める */
function findAgeColumns(rows: string[][], label: string): { header: string[]; zeroCol: number } {
  const header = rows.find((r) => r.some((c) => ageLabel(c) === AGE_LABELS[0]));
  if (!header) fail(`${label}の見出し行が見つかりません`);
  const zeroCol = header.findIndex((c) => ageLabel(c) === AGE_LABELS[0]);
  for (let age = 0; age < AGE_COUNT; age++) {
    if (ageLabel(header[zeroCol + age] ?? "") !== AGE_LABELS[age]) {
      fail(`${label}の年齢の並びが変わりました: ${header.slice(zeroCol, zeroCol + AGE_COUNT).join(" ")}`);
    }
  }
  return { header, zeroCol };
}

async function main() {
  console.log(`${MUNICIPALITY_NAME}の空き状況を取り込みます`);
  console.log(`公式ページ: ${INDEX_URL}\n`);

  const res = await fetch(INDEX_URL, { headers: { "User-Agent": UA } });
  if (!res.ok) fail(`公式ページが ${res.status} を返しました`);
  const html = await res.text();

  // 「各園空き状況一覧（令和8年8月審査終了後）」「待機児童数一覧（令和8年8月審査終了後）」
  const pick = (pattern: RegExp, label: string) => {
    const found = [...html.matchAll(/<a[^>]+href="([^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/gi)]
      .map((m) => ({ url: new URL(m[1], INDEX_URL).toString(), text: toHalfWidth(stripTags(m[2])) }))
      .map((l) => {
        const m = l.text.match(pattern);
        if (!m) return null;
        const fiscalYear = reiwaToYear(Number(m[1]));
        const month = Number(m[2]);
        const year = month <= 3 ? fiscalYear + 1 : fiscalYear;
        return { ...l, year, month, sortKey: year * 100 + month };
      })
      .filter((v): v is NonNullable<typeof v> => v !== null);
    if (found.length === 0) fail(`${label}のPDFが見つかりません。ページの構成が変わった可能性があります。`);
    return found.reduce((a, b) => (b.sortKey > a.sortKey ? b : a));
  };
  const vacancyLink = pick(/各園空き状況一覧（令和(\d+)年(\d+)月/, "空き状況一覧");
  const waitingLink = pick(/待機児童数一覧（令和(\d+)年(\d+)月/, "待機児童数一覧");
  if (vacancyLink.sortKey !== waitingLink.sortKey) {
    fail(
      `空き状況（${vacancyLink.year}年${vacancyLink.month}月）と待機児童数（${waitingLink.year}年${waitingLink.month}月）で対象月が違います`
    );
  }
  console.log(`最新: ${vacancyLink.text}\n  ${vacancyLink.url}`);
  console.log(`      ${waitingLink.text}\n  ${waitingLink.url}`);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "chigasaki-vacancy-"));
  try {
    const files: string[] = [];
    for (const [name, link] of [
      ["vacancy", vacancyLink],
      ["waiting", waitingLink],
    ] as const) {
      const r = await fetch(link.url, { headers: { "User-Agent": UA } });
      if (!r.ok) fail(`PDFの取得に失敗しました（${r.status}）: ${link.url}`);
      const buf = Buffer.from(await r.arrayBuffer());
      if (buf.subarray(0, 4).toString() !== "%PDF") fail(`PDFではありません: ${link.url}`);
      const file = path.join(tmpDir, `${name}.pdf`);
      fs.writeFileSync(file, buf);
      files.push(file);
    }

    let data: Extracted;
    try {
      data = JSON.parse(runPython([EXTRACTOR, ...files])) as Extracted;
    } catch (err) {
      fail(`抽出結果を読めません: ${String(err)}`);
    }

    // 待機児童数のPDFの表題から基準日を取る（「令和8年8月1日時点」）
    const waitingTitle = data.waiting.rows.map((r) => squeeze(r.join(""))).join(" ");
    const asOfMatch = toHalfWidth(waitingTitle).match(/令和(\d+)年(\d+)月(\d+)日時点/);
    if (!asOfMatch) fail("待機児童数のPDFから基準日を読み取れませんでした");
    const asOf = `${reiwaToYear(Number(asOfMatch[1]))}-${asOfMatch[2].padStart(2, "0")}-${asOfMatch[3].padStart(2, "0")}`;
    console.log(`基準日: ${asOf} / 対象: ${vacancyLink.year}年${vacancyLink.month}月審査終了後`);

    // PDFの1行め「〇：若干空きあり ×：空きなし」
    const legendMatch = squeeze(data.vacancy.legend).match(/〇：(.+?)×：(.+)$/);
    if (!legendMatch) fail(`記号の凡例を読み取れませんでした: ${data.vacancy.legend}`);
    const symbolLegend = [
      { mark: OPEN_MARK, label: legendMatch[1], open: true },
      { mark: CLOSED_MARK, label: legendMatch[2], open: false },
    ];
    console.log(`凡例: ${symbolLegend.map((l) => `${l.mark}＝${l.label}`).join(" / ")}`);

    const vacancyCols = findAgeColumns(data.vacancy.rows, "空き状況");
    const waitingCols = findAgeColumns(data.waiting.rows, "待機児童数");
    const nameCol = 1;
    const kindCol = 0;

    // 施設の行だけを取り出す。見出しや市内合計の行を落とす
    const isFacilityRow = (row: string[], zeroCol: number) => {
      const kind = squeeze(row[kindCol] ?? "");
      const name = squeeze(row[nameCol] ?? "");
      if (!kind || !name) return false;
      if (kind.includes("合計") || kind === "類型") return false;
      return row.length > zeroCol + AGE_COUNT - 1;
    };
    const vacancyRows = data.vacancy.rows
      .map((row, i) => ({ row, shaded: data.vacancy.shaded[i] ?? [] }))
      .filter((r) => isFacilityRow(r.row, vacancyCols.zeroCol));
    const waitingRows = data.waiting.rows.filter((row) => isFacilityRow(row, waitingCols.zeroCol));

    if (vacancyRows.length !== waitingRows.length) {
      fail(
        `施設数が合いません（空き状況 ${vacancyRows.length}件 / 待機児童数 ${waitingRows.length}件）`
      );
    }

    const categories: string[] = [];
    const facilities: {
      id: string;
      name: string;
      w: null;
      c: number;
      vacancy: (number | null)[];
      waiting: (number | null)[];
      symbols: (string | null)[];
    }[] = [];
    const marks = new Map<string, number>();
    const seen = new Set<string>();
    const ageTotals = new Array(AGE_COUNT).fill(0);
    let grandTotal = 0;

    for (let i = 0; i < vacancyRows.length; i++) {
      const { row, shaded } = vacancyRows[i];
      const wRow = waitingRows[i];
      const name = squeeze(row[nameCol]);
      const waitingName = squeeze(wRow[nameCol]);
      if (normalizeName(name) !== normalizeName(waitingName)) {
        fail(
          `${i + 1}件めで施設名が食い違います（空き状況「${name}」/ 待機児童数「${waitingName}」）。` +
            `どちらかのPDFで並び順が変わった可能性があります。`
        );
      }
      const kind = squeeze(row[kindCol]);
      if (kind !== squeeze(wRow[kindCol])) {
        fail(`${name}: 類型が食い違います（「${kind}」/「${squeeze(wRow[kindCol])}」）`);
      }
      if (seen.has(name)) fail(`施設名が重複しています: ${name}`);
      seen.add(name);
      if (!categories.includes(kind)) categories.push(kind);

      const symbols: (string | null)[] = [];
      const waiting: (number | null)[] = [];
      let rowSum = 0;
      for (let age = 0; age < AGE_COUNT; age++) {
        // 網掛けのクラスは「受け入れ対象外」。×が印字されていても空きなしではない
        const isShaded = shaded.includes(vacancyCols.zeroCol + age);
        const raw = squeeze(row[vacancyCols.zeroCol + age] ?? "");
        const waitingRaw = toHalfWidth(squeeze(wRow[waitingCols.zeroCol + age] ?? ""));

        if (isShaded) {
          if (waitingRaw !== "") {
            fail(
              `${name}: ${age}歳クラスは網掛け（受け入れ対象外）なのに、待機児童数に「${waitingRaw}」が入っています`
            );
          }
          symbols.push(null);
          waiting.push(null);
          continue;
        }
        if (waitingRaw === "") {
          fail(
            `${name}: ${age}歳クラスは網掛けではないのに、待機児童数が空欄です。網掛けの読み取りに失敗した可能性があります`
          );
        }
        if (!/^\d+$/.test(waitingRaw)) fail(`${name}: 待機児童数として読めません: 「${waitingRaw}」`);
        if (raw !== OPEN_MARK && raw !== CLOSED_MARK) {
          fail(`${name}: ${age}歳クラスが凡例にない記号です: 「${raw}」`);
        }
        marks.set(raw, (marks.get(raw) ?? 0) + 1);
        symbols.push(raw);
        const n = Number(waitingRaw);
        waiting.push(n);
        rowSum += n;
        ageTotals[age] += n;
      }

      // 待機児童数のPDFには合計の列がある。行ごとに突き合わせる
      const totalCol = waitingCols.zeroCol + AGE_COUNT;
      const totalRaw = toHalfWidth(squeeze(wRow[totalCol] ?? ""));
      if (!/^\d+$/.test(totalRaw)) fail(`${name}: 待機児童数の合計を読めません: 「${totalRaw}」`);
      if (Number(totalRaw) !== rowSum) {
        fail(`${name}: 待機児童数の合計が合いません（公式 ${totalRaw} / 年齢の和 ${rowSum}）`);
      }
      grandTotal += rowSum;

      facilities.push({
        id: name,
        name,
        w: null,
        c: categories.indexOf(kind),
        vacancy: new Array(AGE_COUNT).fill(null),
        waiting,
        symbols,
      });
    }

    // いちばん下の市内合計の行と突き合わせる
    const totalRow = data.waiting.rows.find((r) => squeeze(r[kindCol] ?? "").includes("市内合計"));
    if (!totalRow) fail("待機児童数のPDFに市内合計の行が見つかりません");
    for (let age = 0; age < AGE_COUNT; age++) {
      const official = Number(toHalfWidth(squeeze(totalRow[waitingCols.zeroCol + age] ?? "")));
      if (official !== ageTotals[age]) {
        fail(
          `${age}歳クラスの待機児童数が市内合計と合いません（公式 ${official} / 積み上げ ${ageTotals[age]}）`
        );
      }
    }
    const officialTotal = Number(
      toHalfWidth(squeeze(totalRow[waitingCols.zeroCol + AGE_COUNT] ?? ""))
    );
    if (officialTotal !== grandTotal) {
      fail(`待機児童数の総数が市内合計と合いません（公式 ${officialTotal} / 積み上げ ${grandTotal}）`);
    }
    console.log(`市内合計と一致: 待機児童数 ${grandTotal}人（年齢別 ${ageTotals.join(" / ")}）`);

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
      JSON.stringify(previous?.sourceFiles ?? {}) === JSON.stringify({ vacancy: vacancyLink.url, waiting: waitingLink.url }) &&
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
      sourceFiles: { vacancy: vacancyLink.url, waiting: waitingLink.url },
      metrics: ["symbol", "waiting"],
      subtitle: `${vacancyLink.year}年${vacancyLink.month}月審査終了後の空き状況`,
      notes: [
        "茅ヶ崎市は空きを人数ではなく記号で公表しています。当サイトでも公式の記号のまま載せています。待機児童数は公式が出している実数です。",
        "受け入れ対象外のクラス（公式の表で網掛けになっているところ）は「—」にしています。",
        "内定辞退や退園などで受け入れ可能になることがあります。印にかかわらず全ての施設への申し込みを受け付けています。",
        "待機児童数は第6希望までを含む延べ人数です。育児休業の延長も許容できるとして申請した人数も含まれます。",
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
    console.log(`  ${facilities.length}施設 / ${categories.length}類型（${categories.join("・")}）`);
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
