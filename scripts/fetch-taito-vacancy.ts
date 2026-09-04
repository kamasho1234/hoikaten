/**
 * 台東区の認可保育園等の入園可能人数を取り込む
 *
 * 実行: npm run vacancy:fetch:taito
 *
 * ## この自治体の特徴
 * - **PDFではなくHTMLの表**で公開している。pdfplumber が要らない数少ない自治体
 * - 表は4つ（公立保育園／私立保育園／地域型保育事業／地域型保育事業（家庭的保育事業））。
 *   **施設類型は table の caption に入っている**
 * - **家庭的保育事業だけは年齢別がなく「0〜2歳 計」の1列**。目黒区の家庭福祉員と同じ形なので
 *   vacancyTotal に入れる
 * - **各行に「計」の列がある**ので、年齢別の積み上げと突き合わせて1施設ずつ検算できる
 * - 「-」はそのクラスの受け入れがない、0は空きなし
 */

import fs from "node:fs";
import path from "node:path";

const MUNICIPALITY_SLUG = "taito";
const MUNICIPALITY_NAME = "台東区";
const SOURCE_NAME = "台東区「入園可能人数」";
const SOURCE_URL =
  "https://www.city.taito.lg.jp/kosodatekyouiku/kosodate/mokutei/hoiku_youjikyouiku/hoikutakuji/hoikuen/hoikuennyuen/getureininnzuu.html";
const AGE_COUNT = 6;

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);

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
  return s.replace(/[０-９]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xfee0));
}

function cellText(html: string): string {
  return toHalfWidth(
    html
      .replace(/<[^>]+>/g, "")
      .replace(/&nbsp;/g, " ")
      .replace(/&amp;/g, "&")
      .replace(/\s+/g, " ")
      .trim()
  );
}

/** 「-」は受け入れがないクラス、数字は空き人数 */
function parseValue(v: string, where: string): number | null {
  const t = v.replace(/[\s　]/g, "");
  if (t === "" || t === "-" || t === "－" || t === "―") return null;
  if (/^\d+$/.test(t)) return Number(t);
  fail(`${where}: 人数として読めません: 「${v}」`);
}

type Table = { caption: string; head: string[]; rows: string[][] };

function parseTables(html: string): Table[] {
  const out: Table[] = [];
  for (const m of html.matchAll(/<table[^>]*>([\s\S]*?)<\/table>/gi)) {
    const inner = m[1];
    const cap = inner.match(/<caption[^>]*>([\s\S]*?)<\/caption>/i);
    const rows = [...inner.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi)].map((r) =>
      [...r[1].matchAll(/<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/gi)].map((c) => cellText(c[1]))
    );
    if (rows.length < 2) continue;
    out.push({ caption: cap ? cellText(cap[1]) : "", head: rows[0], rows: rows.slice(1) });
  }
  return out;
}

async function main() {
  console.log(`${MUNICIPALITY_NAME}の入園可能人数を取り込みます`);
  console.log(`公式ページ: ${SOURCE_URL}\n`);

  const res = await fetch(SOURCE_URL, {
    headers: { "User-Agent": "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)" },
  });
  if (!res.ok) fail(`公式ページが ${res.status} を返しました`);
  const html = await res.text();
  // **関連ページの一覧にも「令和X年Y月Z日現在」を含むリンクがある**ので、
  // 「本文ここから」〜「本文ここまで」の間だけを見る
  const start = html.indexOf("本文ここから");
  const end = html.indexOf("本文ここまで", start);
  if (start < 0 || end < 0) fail("本文の範囲が分かりません。ページの構成が変わった可能性があります。");
  const body = html.slice(start, end);
  if (body.length < 1000) fail("本文が短すぎます。ページの構成が変わった可能性があります。");

  const plain = body.replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/\s+/g, " ");
  // 「令和8年8月20日現在」＝データの時点。各表の直前に同じ日付が出る
  const asOfSet = new Set(
    [...plain.matchAll(/令和([０-９\d]+)年([０-９\d]+)月([０-９\d]+)日現在/g)].map((m) =>
      m
        .slice(1, 4)
        .map((g) => Number(toHalfWidth(g)))
        .join("/")
    )
  );
  if (asOfSet.size !== 1) {
    fail(`ページに基準日が${asOfSet.size}種類あります: ${[...asOfSet].join(" / ")}`);
  }
  const [ay, am, ad] = [...asOfSet][0].split("/").map(Number);
  const asOf = `${reiwaToYear(ay)}-${String(am).padStart(2, "0")}-${String(ad).padStart(2, "0")}`;

  const tm = plain.match(/令和([０-９\d]+)年([０-９\d]+)月入園可能人数/);
  if (!tm) fail("対象月（令和X年Y月入園可能人数）が読み取れません");
  const targetYear = reiwaToYear(Number(toHalfWidth(tm[1])));
  const targetMonth = Number(toHalfWidth(tm[2]));
  console.log(`基準日: ${asOf} / 対象: ${targetYear}年${targetMonth}月入園`);

  const tables = parseTables(body).filter((t) => t.caption);
  if (tables.length < 3) fail(`施設の表が${tables.length}個しかありません`);

  const categories: string[] = [];
  const facilities: {
    id: string;
    name: string;
    w: null;
    c: number;
    vacancy: (number | null)[];
    vacancyTotal?: number;
  }[] = [];
  const seen = new Set<string>();
  let checked = 0;

  for (const t of tables) {
    const category = t.caption;
    // 「0歳」…「5歳」の列位置。**地域型保育事業は0〜2歳しか列がない**（-1 になる）。
    // 家庭的保育事業だけは年齢別がなく「0～2歳 計」の1列しかない
    const ageCols = Array.from({ length: AGE_COUNT }, (_, i) =>
      t.head.findIndex((h) => h.replace(/[\s　]/g, "") === `${i}歳`)
    );
    const mergedCol = t.head.findIndex((h) => /^0[~～〜]2歳計$/.test(h.replace(/[\s　]/g, "")));
    const totalCol = t.head.findIndex((h) => h.replace(/[\s　]/g, "") === "計");
    const hasAges = ageCols[0] >= 0;
    if (!hasAges && mergedCol < 0) {
      fail(`${category}: 年齢の見出しが見つかりません: ${t.head.join(" / ")}`);
    }

    if (!categories.includes(category)) categories.push(category);
    const c = categories.indexOf(category);

    for (const row of t.rows) {
      const name = (row[0] ?? "").trim();
      if (!name) continue;
      if (name.replace(/[\s　]/g, "") === "計") continue;
      if (seen.has(name)) fail(`施設名が重複しています: ${name}`);
      seen.add(name);

      if (hasAges) {
        // 列がない年齢（地域型の3歳以上）は「受け入れなし」として null にする
        const vacancy = ageCols.map((i) => (i < 0 ? null : parseValue(row[i] ?? "", `台東区 ${name}`)));
        // 各行の「計」と積み上げを突き合わせる
        if (totalCol >= 0) {
          const declared = parseValue(row[totalCol] ?? "", `台東区 ${name}（計）`);
          const built = vacancy.reduce((a: number, v) => a + (v ?? 0), 0);
          if (declared !== null && declared !== built) {
            fail(`${name}: 「計」が${declared}なのに年齢別の合計が${built}です`);
          }
          checked++;
        }
        facilities.push({ id: name, name, w: null, c, vacancy });
      } else {
        const total = parseValue(row[mergedCol] ?? "", `台東区 ${name}`);
        facilities.push({
          id: name,
          name,
          w: null,
          c,
          vacancy: new Array(AGE_COUNT).fill(null),
          vacancyTotal: total ?? 0,
        });
      }
    }
  }

  if (facilities.length < 50) fail(`施設が${facilities.length}件しか取れていません`);

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
    JSON.stringify(previous?.sourceFiles ?? {}) === JSON.stringify({ vacancy: SOURCE_URL }) &&
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
    sourceUrl: SOURCE_URL,
    sourceFiles: { vacancy: SOURCE_URL },
    metrics: ["vacancy"],
    notes: [
      `${targetYear}年${targetMonth}月入園の可能人数です。台東区の注記のとおり前月の入園審査直後の目安で、今後の入退園等で変わることがあります。`,
      "入園予定枠がない園でも入所できる場合があり、枠がある園でも入所できない場合があります。希望園としては申請できます。",
      "表の年齢は年度はじめ（4月1日）時点の年齢です。0歳児は園によって受け入れ月齢が違います。",
      "こども園は長時間保育の入園可能人数です。家庭的保育事業は0〜2歳の合算で公表されています。",
    ],
    wards: [],
    categories,
    facilities,
  };

  const { facilities: _f, ...meta } = dataset;
  const metaJson = JSON.stringify(meta, null, 2);
  const head = metaJson.slice(0, metaJson.lastIndexOf("}")).trimEnd();
  const bodyJson = facilities.map((f) => `    ${JSON.stringify(f)}`).join(",\n");
  const out = `${head},\n  "facilities": [\n${bodyJson}\n  ]\n}\n`;
  try {
    JSON.parse(out);
  } catch (err) {
    fail(`生成したJSONが不正です: ${String(err)}`);
  }
  fs.mkdirSync(path.dirname(OUT_PATH), { recursive: true });
  fs.writeFileSync(OUT_PATH, out, "utf-8");

  const ageTotals = Array.from({ length: AGE_COUNT }, (_, age) =>
    facilities.reduce((acc, f) => acc + (f.vacancy[age] ?? 0), 0)
  );
  const merged = facilities.reduce((acc, f) => acc + (f.vacancyTotal ?? 0), 0);
  console.log(`書き出しました: ${path.relative(process.cwd(), OUT_PATH)}`);
  console.log(`  データ時点: ${asOf}`);
  console.log(`  各行の「計」との突き合わせ: ${checked}件すべて一致`);
  console.log("");
  for (const [i, cat] of categories.entries()) {
    const list = facilities.filter((f) => f.c === i);
    const v = list.reduce(
      (a, f) => a + f.vacancy.reduce((x: number, y) => x + (y ?? 0), 0) + (f.vacancyTotal ?? 0),
      0
    );
    console.log(`  ${cat} ${list.length}施設 / 空き${v}`);
  }
  console.log("");
  console.log("  年齢 | 空き");
  ageTotals.forEach((v, age) => console.log(`  ${age}歳児 | ${v}`));
  console.log(`  0〜2歳合算のみ | ${merged}`);
  console.log(`  合計 | ${ageTotals.reduce((a, b) => a + b, 0) + merged}`);
}

main().catch((err) => fail(String(err)));
