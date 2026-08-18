/**
 * 世田谷区の認可保育園の空き数を取り込む
 *
 * 実行: npm run vacancy:fetch:setagaya
 *
 * ## これまでの自治体との違い
 * - **PDFではなくHTMLの表**。pdfplumber が要らない
 * - **5地域（世田谷・北沢・玉川・砧・烏山）でページが分かれている**。
 *   カテゴリページからリンクを拾うので、地域が増減しても追随する
 * - **各表の最終行が合計行**なので、積み上げと突き合わせて検算できる
 * - **所在地と電話番号が表に載っている**ので、施設リンクを調べるときに使える
 *
 * ## 安全装置
 * 想定と1つでも違えば書き込まずに exit 1 する。
 */

import fs from "node:fs";
import path from "node:path";

const MUNICIPALITY_SLUG = "setagaya";
const MUNICIPALITY_NAME = "世田谷区";
const SOURCE_NAME = "世田谷区「認可保育園（空き数）」";
const INDEX_URL = "https://www.city.setagaya.lg.jp/kodomokyouiku/hoikuen/category/13054.html";
const ORIGIN = "https://www.city.setagaya.lg.jp";
const AGE_COUNT = 6;
const MIN_FACILITY_RATIO = 0.9;
/** 表の見出し。これが変わったら中断する */
const EXPECTED_HEADER = [
  "認可保育園名",
  "所在地",
  "電話番号",
  "0歳",
  "1歳",
  "2歳",
  "3歳",
  "4歳",
  "5歳",
  "合計",
  "延長",
  "備考",
];

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const RESEARCH_PATH = path.join(
  process.cwd(),
  "scripts",
  "vacancy-research",
  MUNICIPALITY_SLUG,
  "facilities_from_page.json"
);

function fail(message: string): never {
  console.error(`\n[中断] ${message}`);
  process.exit(1);
}

function todayJst(): string {
  const now = new Date();
  const jst = new Date(now.getTime() + 9 * 60 * 60 * 1000);
  return jst.toISOString().slice(0, 10);
}

function decode(s: string): string {
  return s
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    // 施設名に「RISSHO KID&#39;S きらり」のような数値文字参照が入る
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, n) => String.fromCharCode(parseInt(n, 16)))
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
}

async function getHtml(url: string): Promise<string> {
  const res = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)" },
  });
  if (!res.ok) fail(`${res.status} を返しました: ${url}`);
  return res.text();
}

/**
 * 表を行×セルの配列にする。
 * **ページに空の table が先に置かれていることがある**（砧地域）ので、
 * 見出しに「認可保育園名」を持つ表を選ぶ
 */
function parseTable(html: string): string[][] {
  for (const table of html.matchAll(/<table[\s\S]*?<\/table>/gi)) {
    const rows = [...table[0].matchAll(/<tr[\s\S]*?<\/tr>/gi)]
      .map((tr) => [...tr[0].matchAll(/<t[hd][^>]*>([\s\S]*?)<\/t[hd]>/gi)].map((c) => decode(c[1])))
      .filter((row) => row.length > 0);
    if (rows.length && rows[0].includes("認可保育園名")) return rows;
  }
  return [];
}

/**
 * 「-」はそのクラスを設けていない、数字は空き数。
 * 「※」は年齢別の内訳が無い枠（医療的ケア児枠など）で、合計だけが意味を持つ
 */
function parseValue(v: string, where: string): number | null {
  const t = v.replace(/\s/g, "");
  if (t === "" || t === "-" || t === "－" || t === "ー" || t === "※") return null;
  if (/^\d+$/.test(t)) return Number(t);
  fail(`${where}: 空き数として読めません: 「${v}」`);
}

/**
 * 施設名の末尾の括弧は2種類ある。
 * - 運営種別（区立・私立・小規模保育事業A型 など）→ 施設類型として切り離す
 * - 名前の一部（「医療的ケア児枠」「○○の分園」「送迎枠」）→ 名前に残す。
 *   同じ園に通常枠と医療的ケア児枠の2行があるので、切り離すと施設名が重複する
 */
const KIND_SUFFIXES = [
  "区立",
  "私立",
  "区立認定こども園",
  "私立認定こども園",
  "小規模保育事業A型",
  "小規模保育事業B型",
  "家庭的保育事業",
  "事業所内保育事業",
];
function splitKind(name: string): { name: string; kind: string } {
  const m = name.match(/^(.*?)[(（]([^)）]+)[)）]\s*$/);
  if (!m) return { name: name.trim(), kind: "認可保育園" };
  const inner = m[2].trim();
  if (!KIND_SUFFIXES.includes(inner)) return { name: name.trim(), kind: "認可保育園" };
  return { name: m[1].trim(), kind: inner };
}

async function main() {
  console.log(`${MUNICIPALITY_NAME}の認可保育園の空き数を取り込みます`);
  console.log(`公式ページ: ${INDEX_URL}\n`);

  // --- 1. カテゴリページから地域ごとのページを拾う ---
  const indexHtml = await getHtml(INDEX_URL);
  const areas = [
    ...new Map(
      [...indexHtml.matchAll(/<a[^>]+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g)]
        .map((m) => ({ url: m[1], text: decode(m[2]) }))
        .filter((l) => /^認可保育園\s*\(空き数\)/.test(l.text))
        .map((l) => {
          const area = l.text.replace(/^認可保育園\s*\(空き数\)/, "").trim();
          return [area, { area, url: l.url.startsWith("http") ? l.url : ORIGIN + l.url }] as const;
        })
    ).values(),
  ];
  if (areas.length === 0) fail("地域ごとのページが見つかりません。ページの構成が変わった可能性があります。");
  console.log(`地域: ${areas.map((a) => a.area).join("・")}`);

  // --- 2. 各地域の表を読む ---
  const wards: string[] = [];
  const categories: string[] = [];
  const facilities: { id: string; name: string; w: number; c: number; vacancy: (number | null)[]; vacancyTotal?: number }[] = [];
  const research: { id: string; name: string; area: string; kind: string; address: string; tel: string }[] = [];
  const seen = new Set<string>();
  const updated = new Set<string>();

  for (const a of areas) {
    const html = await getHtml(a.url);
    const m = html.match(/最終更新日\s*(\d{4})年(\d{1,2})月(\d{1,2})日/);
    if (!m) fail(`${a.area}: 最終更新日を読めません`);
    updated.add(`${m[1]}-${String(Number(m[2])).padStart(2, "0")}-${String(Number(m[3])).padStart(2, "0")}`);

    const rows = parseTable(html);
    if (rows.length < 3) fail(`${a.area}: 表を読めません`);
    const header = rows[0];
    if (header.join("|") !== EXPECTED_HEADER.join("|")) {
      fail(`${a.area}: 見出しが想定と違います\n  実際: ${header.join("|")}\n  想定: ${EXPECTED_HEADER.join("|")}`);
    }
    const iName = 0;
    const iAddr = 1;
    const iTel = 2;
    const ageIdx = [3, 4, 5, 6, 7, 8];
    const iTotal = 9;

    const acc = Array.from({ length: AGE_COUNT }, () => 0);
    let count = 0;
    let totalRow: string[] | null = null;
    for (const row of rows.slice(1)) {
      if (row.length === 0 || row.every((c) => c === "")) continue;
      // 施設名が空の行は合計行。
      // **地域によって所在地・電話の列が省略され、列数が変わる**ので、
      // 年齢の位置は末尾（合計・延長・備考の3列）から数えて決める
      if (row[iName] === "") {
        totalRow = row;
        continue;
      }
      if (row.length < EXPECTED_HEADER.length) continue;
      const raw = row[iName].replace(/\s+/g, " ").trim();
      const { name, kind } = splitKind(raw);
      if (!name) fail(`${a.area}: 施設名が空の行があります`);
      if (!categories.includes(kind)) categories.push(kind);
      if (!wards.includes(a.area)) wards.push(a.area);
      const vacancy = ageIdx.map((i) => parseValue(row[i] ?? "", `${a.area} ${name}`));
      // 行の合計と突き合わせる
      const total = parseValue(row[iTotal] ?? "", `${a.area} ${name}`);
      const sum = vacancy.reduce((s: number, v) => s + (v ?? 0), 0);
      const noAgeBreakdown = vacancy.every((v) => v === null);
      // 年齢別の内訳が無い枠（医療的ケア児枠）は合計だけが意味を持つので照合しない
      if (!noAgeBreakdown && total !== null && total !== sum) {
        fail(`${a.area} ${name}: 年齢別の和 ${sum} が合計 ${total} と違います`);
      }
      vacancy.forEach((v, k) => (acc[k] += v ?? 0));
      count++;

      const id = `${a.area}/${name}`;
      if (seen.has(id)) fail(`施設IDが重複しています: ${id}`);
      seen.add(id);
      const base = {
        id,
        name,
        w: wards.indexOf(a.area),
        c: categories.indexOf(kind),
        vacancy,
      };
      // 年齢別の内訳が無い枠（医療的ケア児枠）は合計だけを持たせる
      facilities.push(noAgeBreakdown && total !== null ? { ...base, vacancyTotal: total } : base);
      research.push({ id, name, area: a.area, kind, address: row[iAddr] ?? "", tel: row[iTel] ?? "" });
    }

    if (!totalRow) fail(`${a.area}: 合計行が見つかりません`);
    // 末尾の3列（合計・延長・備考）を除いた最後の6列が年齢別
    const tail = totalRow.length - 3;
    if (tail < AGE_COUNT) fail(`${a.area}: 合計行の列が足りません: ${totalRow.join("|")}`);
    const expected = Array.from({ length: AGE_COUNT }, (_, k) =>
      parseValue(totalRow![tail - AGE_COUNT + k] ?? "", `${a.area} 合計行`) ?? 0
    );
    if (acc.join(",") !== expected.join(",")) {
      fail(`${a.area}: 合計が合いません。積み上げ=${acc.join(",")} / 表の合計行=${expected.join(",")}`);
    }
    console.log(`  ${a.area.padEnd(6, "　")} ${String(count).padStart(3)}施設 検算OK（${acc.join("/")}）`);
  }

  if (updated.size !== 1) {
    fail(`地域ごとに最終更新日が違います: ${[...updated].join(" / ")}`);
  }
  const asOf = [...updated][0];
  console.log(`\nデータ時点: ${asOf} / 施設 ${facilities.length}件`);

  let previous: { asOf?: string; facilities?: unknown[] } | null = null;
  if (fs.existsSync(OUT_PATH)) {
    previous = JSON.parse(fs.readFileSync(OUT_PATH, "utf-8"));
    const before = previous?.facilities?.length ?? 0;
    if (before > 0 && facilities.length < before * MIN_FACILITY_RATIO) {
      fail(`施設数が前回（${before}件）の${MIN_FACILITY_RATIO * 100}%を下回りました（${facilities.length}件）。`);
    }
    if (previous?.asOf === asOf) {
      console.log(`\nデータ時点が前回と同じ（${asOf}）なので書き換えません。`);
      return;
    }
  }

  const dataset = {
    municipalitySlug: MUNICIPALITY_SLUG,
    municipalityName: MUNICIPALITY_NAME,
    asOf,
    fetchedAt: todayJst(),
    sourceName: SOURCE_NAME,
    sourceUrl: INDEX_URL,
    sourceFiles: Object.fromEntries(areas.map((a) => [a.area, a.url])),
    metrics: ["vacancy"],
    subtitle: `${asOf.replace(/-/g, "/")}時点で入園できる人数`,
    notes: [
      "世田谷区が公開しているのは、その時点で入園できるお子さんの人数（年齢別）です。",
      "「—」はそのクラスを設けていないことを示します。0は空きがないことを示します。",
      "世田谷区は認可保育園の空き数をホームページの表で公開しています。当サイトはその表をそのまま読み取って掲載しています。",
      "保育ママ・認証保育所・企業主導型保育事業は別の表で公開されているため、このページには含めていません。",
      "医療的ケア児枠のように年齢別の定員が無い枠は、年齢別の内訳を「—」とし合計だけを載せています。",
    ],
    wards,
    categories,
    facilities,
  };

  const { facilities: _facilities, ...meta } = dataset;
  const metaJson = JSON.stringify(meta, null, 2);
  const head = metaJson.slice(0, metaJson.lastIndexOf("}")).trimEnd();
  const body = facilities.map((f) => `    ${JSON.stringify(f)}`).join(",\n");
  const out = `${head},\n  "facilities": [\n${body}\n  ]\n}\n`;
  try {
    JSON.parse(out);
  } catch (err) {
    fail(`生成したJSONが不正です: ${String(err)}`);
  }
  fs.mkdirSync(path.dirname(OUT_PATH), { recursive: true });
  fs.writeFileSync(OUT_PATH, out, "utf-8");
  fs.mkdirSync(path.dirname(RESEARCH_PATH), { recursive: true });
  fs.writeFileSync(
    RESEARCH_PATH,
    `${JSON.stringify({ asOf, sourceFiles: Object.fromEntries(areas.map((a) => [a.area, a.url])), facilities: research }, null, 1)}\n`,
    "utf-8"
  );

  const ageTotals = Array.from({ length: AGE_COUNT }, (_, age) =>
    facilities.reduce((a, f) => a + (f.vacancy[age] ?? 0), 0)
  );
  console.log(`\n書き出しました: ${path.relative(process.cwd(), OUT_PATH)}`);
  console.log(`  施設の詳細: ${path.relative(process.cwd(), RESEARCH_PATH)}`);
  console.log(`  施設種別: ${categories.join("・")}`);
  console.log("");
  console.log("  年齢 | 空き");
  ageTotals.forEach((v, age) => console.log(`  ${age}歳児 | ${v}`));
  console.log(`  合計 | ${ageTotals.reduce((a, b) => a + b, 0)}`);
}

main().catch((err) => fail(String(err)));
