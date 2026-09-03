/**
 * 塩竈市の認可保育施設の空き状況を取り込む
 *
 * 実行: npm run vacancy:fetch:shiogama
 *
 * ## この自治体の特徴
 * - **空き状況を1枚の画像（JPEG）で公開している。**表でもPDFでもない
 * - 文字を持たないので機械では読めない。**画像を3倍に拡大して目視で書き起こし、
 *   このファイルに表として持っている**（荒川区・新庄市・松本市と同じ考え方だが、
 *   OCRすら通らないので人が読んだ値をそのまま置く）
 * - 取り込みのたびに**画像が差し替わっていないかを確かめ**、
 *   変わっていたら中断する。書き起こしをやり直すまで古い値のままにはしない
 * - 記号は ○＝3名以上空きあり／△＝1〜2名空きあり／×＝空きなし／−＝受入れなし
 *
 * ## 画像が変わったときの手順
 * 1. `npm run vacancy:fetch:shiogama` が「画像が差し替わっています」で止まる
 * 2. 画像を開いて表を読み直し、下の TABLE と AS_OF、IMAGE_BYTES を書き換える
 * 3. もう一度実行する
 */

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const MUNICIPALITY_SLUG = "shiogama";
const MUNICIPALITY_NAME = "塩竈市";
const PREFECTURE = "宮城県";
const SOURCE_NAME = "塩竈市「塩竈市内認可保育施設の空き状況について」";
const INDEX_URL = "https://www.city.shiogama.miyagi.jp/soshiki/51/56212.html";
const AGE_COUNT = 6;
const UA = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);

/** 書き起こしたときの画像。差し替わったら中断する */
const IMAGE_URL = "https://www.city.shiogama.miyagi.jp/uploaded/life/58443_149373_img.jpg";
const IMAGE_BYTES = 45338;
/** 画像に書かれている基準日 */
const AS_OF = "2026-09-01";

const LEGEND = [
  { mark: "〇", label: "3名以上空きあり", open: true },
  { mark: "△", label: "1〜2名空きあり", open: true },
  { mark: "×", label: "空きなし", open: false },
];

/**
 * 画像から書き起こした表。
 * 記号は 〇 △ × と、受入れなし（−）を null で表す。
 * 月齢は画像の「月齢」欄をそのまま持つ。
 */
const TABLE: { name: string; months: string; marks: (string | null)[]; note?: string }[] = [
  {
    name: "藤倉保育所",
    months: "3か月〜",
    marks: ["×", "×", "×", "×", "×", "×"],
    note: "改修工事（令和8年9月〜令和9年2月）を予定しています。",
  },
  {
    name: "清水沢保育所",
    months: "なし",
    marks: [null, null, null, "〇", "△", "〇"],
    note: "閉所予定のため児童の段階的受け入れ停止を行っています。",
  },
  { name: "うみまち保育所", months: "3か月〜", marks: ["×", "×", "△", "×", "×", "△"] },
  { name: "元気キッズさかえ保育園", months: "5か月〜", marks: ["×", "×", "×", "△", "×", "×"] },
  { name: "元気キッズきたはま保育園", months: "5か月〜", marks: ["×", "×", "×", "△", "×", "×"] },
  { name: "玉川保育園", months: "4か月〜", marks: ["×", "×", "×", "〇", "△", "△"] },
  { name: "あゆみ保育園", months: "産休明け〜", marks: ["×", "×", "△", "△", "×", "×"] },
  { name: "塩釜ひまわり保育園", months: "3か月〜", marks: ["×", "×", "×", "×", "×", "×"] },
  { name: "東部保育園", months: "3か月〜", marks: ["×", "×", "×", "△", "△", "△"] },
  {
    name: "NOVAバイリンガル塩竈後楽町保育園",
    months: "5か月〜",
    marks: ["×", "×", "×", "△", "△", "〇"],
  },
  {
    name: "幼保連携型認定こども園 塩釜聖光幼稚園",
    months: "なし",
    marks: [null, "×", "×", "×", "×", "×"],
  },
  {
    name: "幼保連携型認定こども園 パドマこども園",
    months: "6か月〜",
    marks: ["×", "×", "×", "×", "×", "×"],
  },
  {
    name: "幼保連携型認定こども園 やまつみ",
    months: "2か月〜",
    marks: ["×", "×", "×", "×", "×", "×"],
  },
  {
    name: "小規模保育施設 わだつみ保育園",
    months: "2か月〜",
    marks: ["×", "×", "×", null, null, null],
  },
  {
    name: "小規模保育施設 てでぃべあ〜ちいさなひまわり〜",
    months: "8か月〜",
    marks: ["×", "×", "×", null, null, null],
  },
];

function fail(message: string): never {
  console.error(`\n[中断] ${message}`);
  process.exit(1);
}

function todayJst(): string {
  const jst = new Date(Date.now() + 9 * 60 * 60 * 1000);
  return jst.toISOString().slice(0, 10);
}

async function main(): Promise<void> {
  // ページに載っている画像が、書き起こしたときのものと同じかを確かめる
  const r0 = await fetch(INDEX_URL, { headers: { "User-Agent": UA } });
  if (!r0.ok) fail(`ページの取得に失敗しました（${r0.status}）: ${INDEX_URL}`);
  const html = await r0.text();
  const imgs = [...html.matchAll(/<img[^>]+src="([^"]*\/uploaded\/[^"]+\.(?:jpg|png))"/gi)].map(
    (m) => new URL(m[1], INDEX_URL).toString(),
  );
  if (imgs.length !== 1) {
    fail(`ページの画像が${imgs.length}枚あります（1枚のはず）: ${imgs.join(" ")}`);
  }
  if (imgs[0] !== IMAGE_URL) {
    fail(
      `画像が差し替わっています。表を読み直してから取り込んでください。\n` +
        `  書き起こしたとき: ${IMAGE_URL}\n  いまページにある: ${imgs[0]}`,
    );
  }
  const r = await fetch(IMAGE_URL, { headers: { "User-Agent": UA } });
  if (!r.ok) fail(`画像の取得に失敗しました（${r.status}）`);
  const buf = Buffer.from(await r.arrayBuffer());
  const sha = crypto.createHash("sha256").update(buf).digest("hex");
  if (buf.length !== IMAGE_BYTES) {
    fail(
      `画像の中身が変わっています（${IMAGE_BYTES} → ${buf.length} バイト、sha256 ${sha.slice(0, 16)}…）。\n` +
        `表を読み直し、TABLE と AS_OF と IMAGE_BYTES を書き換えてから取り込んでください。`,
    );
  }
  console.log(`画像は書き起こしたときと同じです（${buf.length} バイト）`);

  if (AS_OF > todayJst()) fail(`時点の日付（${AS_OF}）が今日より先になっています`);

  const known = new Set(LEGEND.map((l) => l.mark));
  const facilities: {
    id: string;
    name: string;
    w: null;
    vacancy: (number | null)[];
    symbols: (string | null)[];
    note?: string;
  }[] = [];
  const seen = new Set<string>();
  const marks = new Map<string, number>();
  let notOffered = 0;

  for (const row of TABLE) {
    if (seen.has(row.name)) fail(`施設名が重複しています: ${row.name}`);
    seen.add(row.name);
    if (row.marks.length !== AGE_COUNT) {
      fail(`${row.name}: 記号が${row.marks.length}個です（${AGE_COUNT}個のはず）`);
    }
    const symbols: (string | null)[] = [];
    for (const raw of row.marks) {
      if (raw === null) {
        notOffered += 1;
        symbols.push(null);
        continue;
      }
      if (!known.has(raw)) fail(`${row.name}: 凡例にない記号です（「${raw}」）`);
      marks.set(raw, (marks.get(raw) ?? 0) + 1);
      symbols.push(raw);
    }
    if (symbols.every((s) => s === null)) fail(`${row.name}: 記号が1つもありません`);
    facilities.push({
      id: row.name,
      name: row.name,
      w: null,
      vacancy: new Array(AGE_COUNT).fill(null),
      symbols,
      ...(row.note ? { note: row.note } : {}),
    });
  }

  const total = [...marks.values()].reduce((a, b) => a + b, 0) + notOffered;
  if (total !== facilities.length * AGE_COUNT) {
    fail(`欄の数が合いません（${total} / 施設${facilities.length}×${AGE_COUNT}）`);
  }
  console.log(
    `${facilities.length}施設 ／ ${[...marks].map(([m, n]) => `${m}${n}`).join("・")}・受入れなし${notOffered}`,
  );

  const previous = fs.existsSync(OUT_PATH)
    ? (JSON.parse(fs.readFileSync(OUT_PATH, "utf-8")) as { asOf?: string })
    : null;
  if (previous?.asOf === AS_OF) {
    console.log(`公式データの時点が前回と同じ（${AS_OF}）のため更新はありません。`);
    return;
  }

  const notes = [
    `塩竈市は空き状況を人数ではなく記号で公表しています。これは${AS_OF}時点のものです。`,
    `公式の凡例は ${LEGEND.map((l) => `「${l.mark}」${l.label}`).join("、")}、「−」受入れなし です。`,
    "公式の表で「−」になっている年齢は「—」にしています。その年齢の受け入れをしていないことを表します。",
    "毎月1日時点での空き状況です。",
    "市は「実際の入所可否は、各施設において保育士の人数などにより空きがあっても入所できない場合があります」「×でも対象施設への入所申請は可能です」としています。",
    "市は空き状況を画像で公開しているため、当サイトでは画像から書き起こして載せています。画像が差し替わったときは読み直すまで更新されません。",
  ];

  const dataset = {
    municipalitySlug: MUNICIPALITY_SLUG,
    municipalityName: MUNICIPALITY_NAME,
    prefecture: PREFECTURE,
    asOf: AS_OF,
    fetchedAt: todayJst(),
    sourceName: SOURCE_NAME,
    sourceUrl: INDEX_URL,
    sourceFiles: { vacancy: IMAGE_URL },
    metrics: ["symbol"],
    notes,
    wards: [] as string[],
    symbolLegend: LEGEND,
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
}

main().catch((err) => fail(String(err)));
