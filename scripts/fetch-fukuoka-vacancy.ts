/**
 * 福岡市の認可保育施設等の空き状況を取り込む
 *
 * 実行: npm run vacancy:fetch:fukuoka
 *
 * ## この自治体の特徴
 * - 「ふくおか保育所案内板〈空きマップ〉」という地図サイトで公開されている。
 *   地図を描くための一覧を返すエンドポイントから、公式サイトと同じデータを受け取る
 * - 画面では人数ではなく帯（◎6人以上／○3～5人／△1～2人／×空きなし）で見せているので、
 *   当サイトでもその帯のまま載せる。データに入っている生の人数は使わない
 * - 「―」（値9999）はそのクラスを設けていない施設
 * - 基準日が公表されていないので、施設ごとの更新時刻のいちばん新しいものを時点とする
 */

import fs from "node:fs";
import path from "node:path";

const MUNICIPALITY_SLUG = "fukuoka";
const MUNICIPALITY_NAME = "福岡市";
const SOURCE_NAME = "福岡市「ふくおか保育所案内板〈空きマップ〉」";
const INDEX_URL = "https://kodomo-hoiku.city.fukuoka.lg.jp/search";
const SITE_URL = "https://kodomo-hoiku.city.fukuoka.lg.jp/";
const API_URL = "https://kodomo-hoiku.city.fukuoka.lg.jp/search/map_ajax";
const AGE_COUNT = 6;
const NO_CLASS = "9999";
const UA = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);

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

type Marker = Record<string, string | null>;

type MapResponse = {
  result: boolean;
  marker: Marker[];
  group: Record<string, string>;
  stype: Record<string, string>;
  times: string;
};

/** 表示用のHTMLから記号と言い方を取り出す（例: <span …>×</span>空きなし） */
function parseIcon(html: string): { mark: string; label: string } | null {
  const m = html.match(/^\s*<span[^>]*>\s*([\s\S]+?)\s*<\/span>\s*([\s\S]+?)\s*$/);
  if (!m) return null;
  const mark = squeeze(m[1]);
  const label = squeeze(m[2].replace(/<[^>]+>/g, ""));
  if (!mark || !label) return null;
  return { mark, label };
}

/** 帯と人数が食い違っていないかを見る */
function bandOf(count: number): string {
  if (count <= 0) return "0人";
  if (count <= 2) return "1～2人";
  if (count <= 5) return "3～5人";
  return "6人以上";
}

async function main() {
  console.log(`${MUNICIPALITY_NAME}の空き状況を取り込みます`);
  console.log(`公式サイト: ${SITE_URL}\n`);

  const page = await fetch(INDEX_URL, { headers: { "User-Agent": UA } });
  if (!page.ok) fail(`公式サイトが ${page.status} を返しました`);
  const html = await page.text();
  const token = html.match(/'csrf_token':\s*'([0-9a-f]+)'/)?.[1];
  if (!token) fail("画面から csrf_token を読み取れませんでした。サイトの作りが変わった可能性があります。");
  const cookie = (page.headers.getSetCookie?.() ?? [])
    .map((c) => c.split(";")[0])
    .join("; ");

  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "User-Agent": UA,
      "Content-Type": "application/x-www-form-urlencoded",
      "X-Requested-With": "XMLHttpRequest",
      Referer: INDEX_URL,
      ...(cookie ? { Cookie: cookie } : {}),
    },
    body: new URLSearchParams({
      place: "",
      age: "",
      numbe: "",
      nrsname: "",
      ntype: "",
      csrf_token: token,
    }).toString(),
  });
  if (!res.ok) fail(`一覧の取得に失敗しました（${res.status}）`);

  let data: MapResponse;
  try {
    data = (await res.json()) as MapResponse;
  } catch (err) {
    fail(`一覧を読めません: ${String(err)}`);
  }
  if (!data.result || !Array.isArray(data.marker)) fail("一覧が返ってきませんでした");
  if (!data.group || !data.stype) fail("区や施設種別の対応表が返ってきませんでした");
  console.log(`${data.marker.length}施設 / ${data.times}`);

  // 基準日は公表されていないので、施設ごとの更新時刻のいちばん新しい日を使う
  const updatedAt = data.marker
    .map((m) => (m.nrs_uptime ?? "").slice(0, 10))
    .filter((d) => /^\d{4}-\d{2}-\d{2}$/.test(d))
    .sort();
  if (updatedAt.length === 0) fail("施設の更新時刻を読み取れませんでした");
  const asOf = updatedAt[updatedAt.length - 1];
  if (asOf > todayJst()) fail(`更新時刻（${asOf}）が今日より先になっています`);
  console.log(`いちばん新しい更新: ${asOf}`);

  const wards: string[] = [];
  const categories: string[] = [];
  const legend = new Map<string, string>();
  const facilities: {
    id: string;
    name: string;
    w: number;
    c: number;
    vacancy: (number | null)[];
    symbols: (string | null)[];
    site?: { url: string; type: "facility" };
  }[] = [];
  const marks = new Map<string, number>();
  const seen = new Set<string>();
  let noClass = 0;

  for (const m of data.marker) {
    if (m.nrs_delflg === "1") continue;
    const name = squeeze(m.nrs_name ?? "");
    if (!name) fail("施設名が空の行があります");
    if (seen.has(name)) fail(`施設名が重複しています: ${name}`);
    seen.add(name);

    const ward = data.group[m.nrs_add1 ?? ""];
    if (!ward) fail(`${name}: 区が分かりません（コード ${m.nrs_add1}）`);
    if (!wards.includes(ward)) wards.push(ward);

    const kind = data.stype[m.nrs_type ?? ""];
    if (!kind) fail(`${name}: 施設種別が分かりません（コード ${m.nrs_type}）`);
    if (!categories.includes(kind)) categories.push(kind);

    const symbols: (string | null)[] = [];
    for (let age = 0; age < AGE_COUNT; age++) {
      const raw = m[`nrs_info${age}`];
      if (raw === null || raw === undefined || raw === "") fail(`${name}: ${age}歳の欄が空です`);
      if (raw === NO_CLASS) {
        noClass += 1;
        symbols.push(null);
        continue;
      }
      const count = Number(raw);
      if (!Number.isInteger(count) || count < 0) fail(`${name}: ${age}歳の欄を読めません: 「${raw}」`);
      const icon = parseIcon(m[`nrs_info_ico${age}`] ?? "");
      if (!icon) fail(`${name}: ${age}歳の表示を読めません: 「${m[`nrs_info_ico${age}`]}」`);
      // 公式の帯と人数が食い違っていたら、読み方を間違えている
      if (!squeeze(icon.label).includes(squeeze(bandOf(count))) && !(count === 0 && icon.label === "空きなし")) {
        fail(`${name}: ${age}歳は${count}人なのに「${icon.label}」と表示されています`);
      }
      const known = legend.get(icon.mark);
      if (known && known !== icon.label) {
        fail(`「${icon.mark}」の意味が揺れています（${known} / ${icon.label}）`);
      }
      legend.set(icon.mark, icon.label);
      marks.set(icon.mark, (marks.get(icon.mark) ?? 0) + 1);
      symbols.push(icon.mark);
    }
    if (symbols.filter((s) => s !== null).length === 0) fail(`${name}: 全てのクラスが「―」です`);

    const url = (m.nrs_url ?? "").trim();
    facilities.push({
      id: m.nrs_id ?? name,
      name,
      w: wards.indexOf(ward),
      c: categories.indexOf(kind),
      vacancy: new Array(AGE_COUNT).fill(null),
      symbols,
      ...(/^https?:\/\//.test(url) ? { site: { url, type: "facility" as const } } : {}),
    });
  }

  if (facilities.length < 400) fail(`施設が${facilities.length}件しか取れていません`);
  // 空きの多い順に並べる（◎→○→△→×）
  const order = ["◎", "○", "△", "×"];
  const symbolLegend = [...legend.entries()]
    .sort((a, b) => order.indexOf(a[0]) - order.indexOf(b[0]))
    .map(([mark, label]) => ({ mark, label, open: label !== "空きなし" }));
  if (symbolLegend.some((l) => order.indexOf(l.mark) < 0)) {
    fail(`知らない記号が出てきました: ${symbolLegend.map((l) => l.mark).join("")}`);
  }
  console.log(`凡例: ${symbolLegend.map((l) => `${l.mark}＝${l.label}`).join(" / ")}`);

  const previous = fs.existsSync(OUT_PATH)
    ? (JSON.parse(fs.readFileSync(OUT_PATH, "utf-8")) as { asOf?: string; facilities?: unknown[]; sourceFiles?: Record<string, string> })
    : null;
  if (previous?.facilities && facilities.length < previous.facilities.length * 0.9) {
    fail(`施設数が大きく減っています（前回 ${previous.facilities.length}件 → 今回 ${facilities.length}件）`);
  }
  // 自治体は基準日を変えずに資料を差し替えることがある。
  // 取り込み元の一式も同じときだけ、書き換えを見送る
  if (
    previous?.asOf === asOf &&
    JSON.stringify(previous?.sourceFiles ?? {}) === JSON.stringify({ vacancy: INDEX_URL }) &&
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
    sourceUrl: SITE_URL,
    sourceFiles: { vacancy: INDEX_URL },
    metrics: ["symbol"],
    subtitle: "新規に受け入れられる見込み",
    notes: [
      "福岡市は空き状況を人数ではなく「◎6人以上」などの幅で公表しています。当サイトでも公式の表し方のまま載せています。",
      "現時点の見込みであり、選考時点での受け入れ可能数を保証するものではありません。新規受入予定となっていても、保育士の配置状況などにより受入人数が0人になることがあります。",
      "時点は、公式サイトで施設ごとの情報が最後に更新された日です（福岡市は基準日を公表していません）。",
      "年齢はその年度の4月1日時点のものです。設けていないクラスは「—」にしています。",
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
  console.log(`  ${facilities.length}施設 / ${wards.length}区 / ${categories.length}種別`);
  console.log(`  設けていないクラス: ${noClass}`);
  console.log(`  施設サイトのリンクがある施設: ${facilities.filter((f) => f.site).length}`);
  console.log("");
  console.log("  記号の出てきた数");
  for (const item of symbolLegend) {
    console.log(`  ${item.mark}（${item.label}） ${marks.get(item.mark) ?? 0}`);
  }
}

main().catch((err) => fail(String(err)));
