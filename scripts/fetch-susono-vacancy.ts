/**
 * 裾野市の保育所等の空き状況を取り込む
 *
 * 実行: npm run vacancy:fetch:susono
 *
 * ## この自治体の特徴
 * - **空き状況を1枚の画像（PNG）で公開している。**表でもPDFでもない
 * - 文字を持たないので機械では読めない。画像を拡大して目視で書き起こし、
 *   このファイルに表として持っている（塩竈市と同じやり方）
 * - 取り込みのたびに**画像が差し替わっていないかを確かめ**、
 *   変わっていたら中断する。書き起こしをやり直すまで古い値のままにはしない
 * - 記号は ○＝空き有／△＝若干名／−＝空き無／灰色の塗り＝受け入れ無
 *   （**「−」は空きなし、灰色はクラスなし**で意味が違う）
 */

import fs from "node:fs";
import path from "node:path";

const MUNICIPALITY_SLUG = "susono";
const MUNICIPALITY_NAME = "裾野市";
const PREFECTURE = "静岡県";
const SOURCE_NAME = "裾野市「裾野市内の保育園等の空き状況」";
const INDEX_URL = "https://www.city.susono.shizuoka.jp/kosodate/2/10/21348.html";
const AGE_COUNT = 6;
const UA = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);

/** 書き起こしたときの画像。差し替わったら中断する */
const IMAGE_URL =
  "https://www.city.susono.shizuoka.jp/material/images/group/18/R080801aki_jouho.png";
const IMAGE_BYTES = 77037;
/** 画像に書かれている基準日と対象月 */
const AS_OF = "2026-08-01";
const TARGET = "2026年度8月";

const LEGEND = [
  { mark: "〇", label: "空き有", open: true },
  { mark: "△", label: "若干名", open: true },
  { mark: "×", label: "空き無（公式の表では「−」）", open: false },
];

/**
 * 画像から書き起こした表。
 * 記号は 〇 △ ×（公式の「−」）と、受け入れ無（灰色の塗り）を null で表す。
 */
const TABLE: { kind: string; name: string; marks: (string | null)[] }[] = [
  { kind: "公立保育園", name: "西保育園", marks: ["×", "×", "×", "×", "×", "×"] },
  { kind: "公立保育園", name: "東保育園", marks: ["×", "×", "×", "△", "×", "〇"] },
  { kind: "公立こども園", name: "ふからこども園", marks: ["×", "△", "×", "×", "×", "×"] },
  { kind: "公立こども園", name: "とみおかこども園", marks: ["△", "△", "×", "〇", "×", "×"] },
  { kind: "私立保育園", name: "富岳南保育園", marks: ["×", "×", "×", "△", "×", "×"] },
  { kind: "私立こども園", name: "さくらこども園", marks: ["×", "△", "×", "×", "×", "×"] },
  {
    kind: "私立こども園",
    name: "さくらこども園小柄沢分園",
    marks: ["×", "×", "×", null, null, null],
  },
  {
    kind: "私立こども園",
    name: "富岳キッズセンターあい",
    marks: ["△", "×", "×", "△", "×", "×"],
  },
  { kind: "私立こども園", name: "御宿台こども園", marks: ["×", "△", "×", "△", "×", "×"] },
  { kind: "私立こども園", name: "ぽんぽん石脇こども園", marks: ["×", "×", "×", "×", "×", "×"] },
  {
    kind: "私立こども園",
    name: "裾野聖母幼稚園",
    marks: [null, null, null, "〇", "〇", "〇"],
  },
  {
    kind: "小規模保育事業所",
    name: "にこにこ園保育所",
    marks: ["△", "△", "×", null, null, null],
  },
  {
    kind: "小規模保育事業所",
    name: "佐野かがやき保育園",
    marks: ["△", "×", "×", null, null, null],
  },
  {
    kind: "小規模保育事業所",
    name: "ひだまり保育園hagu",
    marks: ["△", "×", "×", null, null, null],
  },
  {
    kind: "小規模保育事業所",
    name: "こざくら保育園",
    marks: ["×", "〇", "×", null, null, null],
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
  const r0 = await fetch(INDEX_URL, { headers: { "User-Agent": UA } });
  if (!r0.ok) fail(`ページの取得に失敗しました（${r0.status}）: ${INDEX_URL}`);
  const html = await r0.text();
  const imgs = [
    ...html.matchAll(/<img[^>]+src="([^"]*\/material\/images\/[^"]+\.(?:png|jpg))"/gi),
  ].map((m) => new URL(m[1], INDEX_URL).toString());
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
  if (buf.length !== IMAGE_BYTES) {
    fail(
      `画像の中身が変わっています（${IMAGE_BYTES} → ${buf.length} バイト）。\n` +
        `表を読み直し、TABLE と AS_OF と IMAGE_BYTES を書き換えてから取り込んでください。`,
    );
  }
  console.log(`画像は書き起こしたときと同じです（${buf.length} バイト）`);

  if (AS_OF > todayJst()) fail(`時点の日付（${AS_OF}）が今日より先になっています`);

  const known = new Set(LEGEND.map((l) => l.mark));
  const categories: string[] = [];
  const facilities: {
    id: string;
    name: string;
    w: null;
    c: number;
    vacancy: (number | null)[];
    symbols: (string | null)[];
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
    let c = categories.indexOf(row.kind);
    if (c < 0) {
      categories.push(row.kind);
      c = categories.length - 1;
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
      c,
      vacancy: new Array(AGE_COUNT).fill(null),
      symbols,
    });
  }

  const total = [...marks.values()].reduce((a, b) => a + b, 0) + notOffered;
  if (total !== facilities.length * AGE_COUNT) {
    fail(`欄の数が合いません（${total} / 施設${facilities.length}×${AGE_COUNT}）`);
  }
  console.log(
    `${facilities.length}施設 ／ ${[...marks].map(([m, n]) => `${m}${n}`).join("・")}・受け入れ無${notOffered}`,
  );

  const previous = fs.existsSync(OUT_PATH)
    ? (JSON.parse(fs.readFileSync(OUT_PATH, "utf-8")) as { asOf?: string })
    : null;
  if (previous?.asOf === AS_OF) {
    console.log(`公式データの時点が前回と同じ（${AS_OF}）のため更新はありません。`);
    return;
  }

  const notes = [
    `裾野市は空き状況を人数ではなく記号で公表しています。これは${TARGET}入園審査後の見込みで、${AS_OF}時点のものです。`,
    "公式の凡例は「○」空き有、「△」若干名、「−」空き無、灰色の塗りが受け入れ無 です。当サイトでは「−」を「×」に置き換えて載せています。",
    "公式の表で灰色に塗られている年齢は「—」にしています。その年齢の受け入れをしていないことを表します。",
    "市は「空きのある園への入所を約束するものではありません」「在園児の状況や保育士の配置状況等により、空き状況は変動します」としています。園への直接の問い合わせは控えるよう案内されています。",
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
    subtitle: `${TARGET}入園審査後の空き状況見込み`,
    notes,
    wards: [] as string[],
    categories,
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
