/**
 * 所沢市の認可保育施設の受入れ数予定を取り込む
 *
 * 実行: npm run vacancy:fetch:tokorozawa
 *
 * ## この自治体の特徴
 * - **空きは記号**（◎＝3名以上、○＝2名程度、△＝1名程度、空欄＝受入れ予定なし）
 * - 予定表の施設名は**略称**（「西所沢」＝西所沢保育園）。
 *   市の「認可保育施設一覧」と突き合わせて正式名称・地区・保育実施年齢をもらう
 * - 一覧側の保育実施年齢を使って、その施設が設けていないクラスと
 *   「受入れ予定なし」を区別する。ここが食い違えば取り違えなので中断する
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "tokorozawa";
const MUNICIPALITY_NAME = "所沢市";
const SOURCE_NAME = "所沢市「保育園の空き状況」";
const INDEX_URL =
  "https://www.city.tokorozawa.saitama.jp/kosodatekyouiku/hoikuen/akijyokyo/index.html";
const FACILITY_LIST_URL =
  "https://www.city.tokorozawa.saitama.jp/kosodatekyouiku/hoikuen/ninkahoiukusisetsu.html";
const AGE_COUNT = 6;
const UA = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";

/** 予定表の表の種別と、施設一覧側の見出しの対応。並び順がそのまま categories になる */
const KINDS = ["公立保育園", "私立保育園", "認定こども園", "地域型保育事業"] as const;
type Kind = (typeof KINDS)[number];

/** 「空欄」は記号ではないので、当サイトでは「－」に置き換えて見せる */
const BLANK_MARK = "－";

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const EXTRACTOR = path.join(process.cwd(), "scripts", "tokorozawa-pdf-extract.py");

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
    .replace(/&amp;/g, "&")
    .replace(/[\s　]+/g, " ")
    .trim();
}

/** 突き合わせ用にそろえる。所沢市は一覧が「元氣」、予定表が「元気」と書き分けている */
function normalizeName(s: string): string {
  return toHalfWidth(squeeze(s)).replace(/氣/g, "気").replace(/[・･]/g, "");
}

/** rowspan を埋めながら table を二次元配列にする */
function parseTable(html: string): string[][] {
  const rows: string[][] = [];
  const pending = new Map<number, { text: string; left: number }>();
  for (const rowMatch of html.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi)) {
    const cells: string[] = [];
    // 前の行から続いている縦結合のセルを先に置く
    const carry = [...pending.entries()].sort((a, b) => a[0] - b[0]);
    let cursor = 0;
    const putCarry = () => {
      for (const [col, held] of carry) {
        if (col === cells.length) {
          cells.push(held.text);
          held.left -= 1;
          if (held.left <= 0) pending.delete(col);
        }
      }
      cursor = cells.length;
    };
    putCarry();
    for (const cellMatch of rowMatch[1].matchAll(/<t[hd]([^>]*)>([\s\S]*?)<\/t[hd]>/gi)) {
      const attrs = cellMatch[1];
      const text = stripTags(cellMatch[2]);
      const rowspan = Number(attrs.match(/rowspan\s*=\s*"?(\d+)/i)?.[1] ?? 1);
      const colspan = Number(attrs.match(/colspan\s*=\s*"?(\d+)/i)?.[1] ?? 1);
      for (let i = 0; i < colspan; i++) {
        const col = cells.length;
        cells.push(text);
        if (rowspan > 1) pending.set(col, { text, left: rowspan - 1 });
      }
      putCarry();
      void cursor;
    }
    rows.push(cells);
  }
  return rows;
}

type Listed = {
  kind: Kind;
  ward: string;
  name: string;
  /** 保育実施年齢。[下限, 上限]（歳） */
  ages: [number, number];
};

/** 「8週から5」「1から5」「6か月から5」「満6か月から5」を [下限, 上限] にする */
function parseAgeRange(raw: string): [number, number] | null {
  const t = toHalfWidth(squeeze(raw));
  const m = t.match(/(?:満)?(\d+)(歳|週|か月|ヵ月|ヶ月|カ月|ケ月|月)?から(\d+)(?:歳)?/);
  if (!m) return null;
  const unit = m[2];
  const low = !unit || unit === "歳" ? Number(m[1]) : 0;
  const high = Number(m[3]);
  if (low < 0 || high > 5 || low > high) return null;
  return [low, high];
}

async function fetchListedFacilities(): Promise<Listed[]> {
  const res = await fetch(FACILITY_LIST_URL, { headers: { "User-Agent": UA } });
  if (!res.ok) fail(`認可保育施設一覧が ${res.status} を返しました`);
  const html = await res.text();

  const listed: Listed[] = [];
  // 見出しごとに、その直後の表を読む。地域型保育事業だけ h3 になっている
  const sections = html.split(/<h[23][^>]*>/i).slice(1);
  for (const section of sections) {
    const heading = squeeze(stripTags(section.split(/<\/h[23]>/i)[0] ?? ""));
    const kind = KINDS.find((k) => k === heading);
    if (!kind) continue;
    const table = section.match(/<table[^>]*>([\s\S]*?)<\/table>/i);
    if (!table) fail(`「${heading}」の表が見つかりません`);
    const rows = parseTable(table[1]);
    // 見出しの行から、施設名と保育実施年齢が何列めかを決める
    const header = rows.find((r) => r.some((c) => squeeze(c) === "施設名"));
    if (!header) fail(`「${heading}」の見出し行が見つかりません`);
    const nameCol = header.findIndex((c) => squeeze(c) === "施設名");
    const ageCol = header.findIndex((c) => squeeze(c).includes("保育実施"));
    if (ageCol < 0) fail(`「${heading}」に保育実施年齢の列がありません`);
    const wardCol = header.findIndex((c) => squeeze(c) === "地区");
    if (wardCol < 0) fail(`「${heading}」に地区の列がありません`);

    // 泉町保育園のように、年齢の欄だけ2行に分かれている施設がある。
    // 同じ施設の行をまとめて、年齢として読める書き方の行を採る
    const seen = new Map<string, { ward: string; raws: string[] }>();
    for (const row of rows) {
      if (row.length <= ageCol) continue;
      const name = squeeze(row[nameCol]);
      if (!name || name === "施設名") continue;
      const entry = seen.get(name);
      if (entry) entry.raws.push(row[ageCol]);
      else seen.set(name, { ward: squeeze(row[wardCol]), raws: [row[ageCol]] });
    }
    for (const [name, entry] of seen) {
      const ages = entry.raws.map(parseAgeRange).find((v) => v !== null) ?? null;
      if (!ages) {
        fail(`${heading} ${name}: 保育実施年齢を読めません: 「${entry.raws.join(" / ")}」`);
      }
      listed.push({ kind, ward: entry.ward, name, ages });
    }
  }

  for (const kind of KINDS) {
    if (!listed.some((l) => l.kind === kind)) fail(`一覧に「${kind}」がありません`);
  }
  return listed;
}

/**
 * 予定表の略称を、一覧の正式名称に結びつける。
 *
 * 略称は正式名称の一部なので、種別ごとに絞ってから
 * 「そのまま一致」→「＋保育園などを足して一致」→「部分一致」の順に候補を作る。
 * 「そらいろ」のように候補が2つ以上になる略称は、
 * 先に決まった施設（「第二そらいろ」＝所沢第二そらいろ保育園）を候補から外して絞り込む。
 */
function resolveNames(kind: Kind, shortNames: string[], listed: Listed[]): Map<string, Listed> {
  const pool = listed.filter((l) => l.kind === kind);
  const candidates = new Map<string, Listed[]>();
  for (const shortName of shortNames) {
    const key = normalizeName(shortName);
    const exact = pool.filter((l) => normalizeName(l.name) === key);
    if (exact.length > 0) {
      candidates.set(shortName, exact);
      continue;
    }
    const withSuffix = ["保育園", "こども園", "保育室", "園"].flatMap((suffix) =>
      pool.filter((l) => normalizeName(l.name) === key + suffix)
    );
    if (withSuffix.length > 0) {
      candidates.set(shortName, withSuffix);
      continue;
    }
    const partial = pool.filter((l) => normalizeName(l.name).includes(key));
    if (partial.length === 0) fail(`${kind}「${shortName}」が施設一覧に見つかりません`);
    candidates.set(shortName, partial);
  }

  // 候補が1つに決まったものから順に、他の候補から取り除いていく
  const resolved = new Map<string, Listed>();
  for (let pass = 0; pass < shortNames.length + 1; pass++) {
    let progressed = false;
    for (const [shortName, list] of candidates) {
      if (resolved.has(shortName)) continue;
      const rest = list.filter((l) => ![...resolved.values()].includes(l));
      if (rest.length === 0) fail(`${kind}「${shortName}」の候補が他の施設に取られました`);
      if (rest.length === 1) {
        resolved.set(shortName, rest[0]);
        progressed = true;
      }
    }
    if (!progressed) break;
  }

  const unresolved = shortNames.filter((n) => !resolved.has(n));
  if (unresolved.length > 0) {
    const detail = unresolved
      .map((n) => `${n} → ${(candidates.get(n) ?? []).map((l) => l.name).join(" / ")}`)
      .join("、");
    fail(`${kind}でどれか決められない施設があります: ${detail}`);
  }
  return resolved;
}

type PdfResult = {
  target: [number, number];
  asOfMonthDay: [number, number];
  legend: { mark: string; label: string }[];
  tables: { kind: string; rows: string[][] }[];
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

async function main() {
  console.log(`${MUNICIPALITY_NAME}の受入れ数予定を取り込みます`);
  console.log(`公式ページ: ${INDEX_URL}\n`);

  const res = await fetch(INDEX_URL, { headers: { "User-Agent": UA } });
  if (!res.ok) fail(`公式ページが ${res.status} を返しました`);
  const html = await res.text();

  // 「令和8年9月入園認可保育園、認定こども園、地域型保育事業受入数予定表（PDF：217KB）」
  const links = [...html.matchAll(/<a[^>]+href="([^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => ({ url: new URL(m[1], INDEX_URL).toString(), text: toHalfWidth(stripTags(m[2])) }))
    .map((l) => {
      const m = l.text.match(/令和(\d+)年(\d+)月入園.*受入(?:れ)?数予定表/);
      if (!m) return null;
      const fiscalYear = reiwaToYear(Number(m[1]));
      const month = Number(m[2]);
      const year = month <= 3 ? fiscalYear + 1 : fiscalYear;
      return { ...l, year, month, sortKey: year * 100 + month };
    })
    .filter((v): v is NonNullable<typeof v> => v !== null);
  if (links.length === 0) fail("受入れ数予定表のPDFが見つかりません。ページの構成が変わった可能性があります。");
  const latest = links.reduce((a, b) => (b.sortKey > a.sortKey ? b : a));
  console.log(`最新: ${latest.text}\n  ${latest.url}`);

  const listed = await fetchListedFacilities();
  console.log(
    `施設一覧: ${listed.length}施設（${KINDS.map(
      (k) => `${k} ${listed.filter((l) => l.kind === k).length}`
    ).join(" / ")}）`
  );

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "tokorozawa-vacancy-"));
  try {
    const r = await fetch(latest.url, { headers: { "User-Agent": UA } });
    if (!r.ok) fail(`PDFの取得に失敗しました（${r.status}）: ${latest.url}`);
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.subarray(0, 4).toString() !== "%PDF") fail(`PDFではありません: ${latest.url}`);
    const file = path.join(tmpDir, "tokorozawa.pdf");
    fs.writeFileSync(file, buf);

    let pdf: PdfResult;
    try {
      pdf = JSON.parse(runPython([EXTRACTOR, file])) as PdfResult;
    } catch (err) {
      fail(`抽出結果を読めません: ${String(err)}`);
    }

    const [ry, tm] = pdf.target;
    if (tm !== latest.month) {
      fail(`PDFの対象月（${tm}月）がリンクの文言（${latest.month}月）と違います。`);
    }
    // 基準日は月日だけ。対象月の前月に出るので、年をまたぐときは1つ前の年になる
    const [am, ad] = pdf.asOfMonthDay;
    const asOfYear = am > tm ? latest.year - 1 : latest.year;
    void ry;
    const asOf = `${asOfYear}-${String(am).padStart(2, "0")}-${String(ad).padStart(2, "0")}`;
    console.log(`基準日: ${asOf} / 対象: ${latest.year}年${latest.month}月`);

    const symbolLegend = pdf.legend.map((l) => ({
      mark: l.mark === "空欄" ? BLANK_MARK : l.mark,
      label: l.label,
      open: l.mark !== "空欄",
    }));
    if (!symbolLegend.some((l) => l.mark === BLANK_MARK)) {
      fail("「空欄＝受入れ予定なし」の凡例が読み取れませんでした");
    }
    console.log(`凡例: ${symbolLegend.map((l) => `${l.mark}＝${l.label}`).join(" / ")}`);
    const knownMarks = new Set(symbolLegend.map((l) => l.mark));

    const wards: string[] = [];
    const categories: string[] = [...KINDS];
    const facilities: {
      id: string;
      name: string;
      w: number;
      c: number;
      vacancy: (number | null)[];
      symbols: (string | null)[];
    }[] = [];
    const used = new Set<string>();
    const marks = new Map<string, number>();

    for (const kind of KINDS) {
      const table = pdf.tables.find((t) => t.kind === kind);
      if (!table) fail(`予定表に「${kind}」の表がありません`);
      // 地域型保育事業だけ0歳〜2歳。それ以外は0歳〜5歳
      const ageColumns = kind === "地域型保育事業" ? 3 : AGE_COUNT;
      // 見出しの行から、0歳の列が何列めかを決める
      const header = table.rows.find((r) => r.some((c) => squeeze(c) === "０歳" || squeeze(c) === "0歳"));
      if (!header) fail(`「${kind}」の年齢の見出し行が見つかりません`);
      const zeroCol = header.findIndex((c) => squeeze(c) === "０歳" || squeeze(c) === "0歳");
      const nameCol = zeroCol - 1;
      if (nameCol < 0) fail(`「${kind}」の施設名の列が分かりません`);

      // 表の下のほうに混ざる注記の行を落としてから、まとめて名前を突き合わせる
      const dataRows = table.rows.filter((row) => {
        if (row === header) return false;
        const shortName = squeeze(row[nameCol] ?? "");
        if (!shortName) return false;
        return !/^[【※（(]/.test(shortName) && shortName.length <= 20;
      });
      const resolved = resolveNames(
        kind,
        dataRows.map((row) => squeeze(row[nameCol])),
        listed
      );

      for (const row of dataRows) {
        const shortName = squeeze(row[nameCol]);
        const listedItem = resolved.get(shortName);
        if (!listedItem) fail(`${kind}「${shortName}」を突き合わせられませんでした`);
        if (used.has(listedItem.name)) fail(`${kind}「${listedItem.name}」が2回出てきます`);
        used.add(listedItem.name);

        const [low, high] = listedItem.ages;
        const symbols: (string | null)[] = [];
        for (let age = 0; age < AGE_COUNT; age++) {
          const raw = age < ageColumns ? squeeze(row[zeroCol + age] ?? "") : "";
          const inRange = age >= low && age <= high;
          if (raw === "") {
            // 一覧に載っている年齢なら「受入れ予定なし」、載っていなければクラスがない
            const mark = inRange ? BLANK_MARK : null;
            if (mark) marks.set(mark, (marks.get(mark) ?? 0) + 1);
            symbols.push(mark);
            continue;
          }
          if (!inRange) {
            fail(
              `${listedItem.name}: 施設一覧では${low}歳から${high}歳なのに、` +
                `予定表の${age}歳に「${raw}」が入っています。取り違えの可能性があります。`
            );
          }
          if (!knownMarks.has(raw)) fail(`${listedItem.name}: 凡例にない記号です: 「${raw}」`);
          marks.set(raw, (marks.get(raw) ?? 0) + 1);
          symbols.push(raw);
        }

        const ward = listedItem.ward;
        if (!ward) fail(`${listedItem.name}: 地区が分かりません`);
        if (!wards.includes(ward)) wards.push(ward);
        facilities.push({
          id: listedItem.name,
          name: listedItem.name,
          w: wards.indexOf(ward),
          c: categories.indexOf(kind),
          vacancy: new Array(AGE_COUNT).fill(null),
          symbols,
        });
      }
    }

    // 予定表に載っている施設数が、施設一覧と種別ごとに合っているか
    for (const kind of KINDS) {
      const inList = listed.filter((l) => l.kind === kind).length;
      const inPdf = facilities.filter((f) => categories[f.c] === kind).length;
      if (inList !== inPdf) {
        fail(`「${kind}」の施設数が合いません（施設一覧 ${inList}件 / 予定表 ${inPdf}件）`);
      }
    }
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
      JSON.stringify(previous?.sourceFiles ?? {}) === JSON.stringify({ vacancy: latest.url, facilities: FACILITY_LIST_URL }) &&
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
      sourceFiles: { vacancy: latest.url, facilities: FACILITY_LIST_URL },
      metrics: ["symbol"],
      subtitle: `${latest.year}年${latest.month}月入園の受入れ数予定`,
      notes: [
        "所沢市は受入れ見込みを人数ではなく記号で公表しています。当サイトでも公式の記号のまま載せています。",
        `公式の表で空欄になっている（受入れ予定なし見込みの）クラスは、当サイトでは「${BLANK_MARK}」で表しています。`,
        "締切日までに生じた在園児の継続状況等により、受入れ数が変わることがあります。空欄の園でも利用調整のときに受入れできる場合があります。",
        "施設名と地区は所沢市の認可保育施設一覧に合わせています。",
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
    console.log(`  ${facilities.length}施設 / ${wards.length}地区`);
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
