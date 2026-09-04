/**
 * 川棚町の教育・保育施設空き状況を取り込む
 *
 * 実行: npm run vacancy:fetch:kawatana
 *
 * ## この自治体の特徴
 * - **空き状況を1枚の画像（PNG）で公開している。**表でもPDFでもない
 * - 文字を持たないので機械では読めない。画像を拡大して目視で書き起こし、
 *   このファイルに表として持っている（塩竈市・裾野市・曽於市・多久市と同じやり方）
 * - **表が「1号認定【教育】」と「2・3号認定【保育】」の2組に分かれている。**
 *   1号は教育利用（満3歳児〜5歳児）なので、
 *   当サイトが扱う保育利用にあたる**2・3号認定の0〜5歳児**を取る
 * - 記号は ○＝余裕あり／△＝残りわずか／×＝空きなし
 */

import fs from "node:fs";
import path from "node:path";

const MUNICIPALITY_SLUG = "kawatana";
const MUNICIPALITY_NAME = "川棚町";
const PREFECTURE = "長崎県";
const SOURCE_NAME = "川棚町「教育・保育施設空き状況一覧」";
const INDEX_URL = "https://www.kawatana.jp/cat02/c2-04/_841/index.html";
const AGE_COUNT = 6;
const UA = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);

/** 書き起こしたときの画像。差し替わったら中断する */
const IMAGE_URL = "https://www.kawatana.jp/item/53816e6bb6d2d88be80d8046e80062ae.png";
const IMAGE_BYTES = 153753;
/** 画像に書かれた時点 */
const AS_OF = "2026-09-01";

const LEGEND = [
  { mark: "○", label: "余裕あり", open: true },
  { mark: "△", label: "残りわずか", open: true },
  { mark: "×", label: "空きなし", open: false },
];

/**
 * 画像から書き起こした「2・3号認定【保育】」の表（0歳児〜5歳児）。
 * 1号認定【教育】は教育利用なので取らない。
 */
const TABLE: { name: string; marks: string[] }[] = [
  { name: "小串保育園", marks: ["×", "△", "△", "○", "○", "×"] },
  { name: "サルビア保育園", marks: ["×", "×", "×", "△", "○", "○"] },
  { name: "川棚純心こども園", marks: ["△", "△", "△", "△", "△", "△"] },
  { name: "みのりこども園", marks: ["×", "×", "×", "×", "×", "×"] },
  { name: "みつばこども園", marks: ["△", "×", "△", "△", "△", "△"] },
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
  console.log(`${MUNICIPALITY_NAME}の空き状況を取り込みます`);
  console.log(`公式ページ: ${INDEX_URL}\n`);

  const res = await fetch(INDEX_URL, { headers: { "User-Agent": UA }, redirect: "follow" });
  if (!res.ok) fail(`公式ページが ${res.status} を返しました`);
  const html = await res.text();

  // 本文に貼られた画像へのリンク（拡大用）を1つだけ拾う
  const links = [...html.matchAll(/<a[^>]+href="([^"]+\.png)"/gi)].map((m) =>
    new URL(m[1], INDEX_URL).toString(),
  );
  if (links.length !== 1) {
    fail(`本文の画像が${links.length}枚あります（1枚のはず）: ${links.join(" ")}`);
  }
  if (links[0] !== IMAGE_URL) {
    fail(
      `画像が差し替わっています。表を読み直してから取り込んでください。\n` +
        `  書き起こしたとき: ${IMAGE_URL}\n  いまページにある: ${links[0]}`,
    );
  }

  const imgRes = await fetch(IMAGE_URL, { headers: { "User-Agent": UA } });
  if (!imgRes.ok) fail(`画像の取得に失敗しました（${imgRes.status}）`);
  const buf = Buffer.from(await imgRes.arrayBuffer());
  if (buf.length !== IMAGE_BYTES) {
    fail(
      `画像の中身が変わっています（${IMAGE_BYTES} → ${buf.length} バイト）。\n` +
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
  }[] = [];
  const seen = new Set<string>();
  const counts = new Map<string, number>();

  for (const row of TABLE) {
    if (seen.has(row.name)) fail(`施設名が重複しています: ${row.name}`);
    seen.add(row.name);
    if (row.marks.length !== AGE_COUNT) {
      fail(`${row.name}: 記号が${row.marks.length}個です（${AGE_COUNT}個のはず）`);
    }
    for (const mark of row.marks) {
      if (!known.has(mark)) fail(`${row.name}: 凡例にない記号です（「${mark}」）`);
      counts.set(mark, (counts.get(mark) ?? 0) + 1);
    }
    facilities.push({
      id: row.name,
      name: row.name,
      w: null,
      vacancy: new Array(AGE_COUNT).fill(null),
      symbols: row.marks,
    });
  }

  const total = [...counts.values()].reduce((a, b) => a + b, 0);
  if (total !== facilities.length * AGE_COUNT) {
    fail(`欄の数が合いません（${total} / 施設${facilities.length}×${AGE_COUNT}）`);
  }
  console.log(`${facilities.length}施設 ／ ${[...counts].map(([m, n]) => `${m}${n}`).join("・")}`);

  const previous = fs.existsSync(OUT_PATH)
    ? (JSON.parse(fs.readFileSync(OUT_PATH, "utf-8")) as { asOf?: string })
    : null;
  if (previous?.asOf === AS_OF) {
    console.log(`公式データの時点が前回と同じ（${AS_OF}）のため更新はありません。`);
    return;
  }

  const notes = [
    `川棚町は空きを人数ではなく記号で公表しています。${AS_OF}時点のものです。`,
    `公式の凡例は ${LEGEND.map((l) => `「${l.mark}」${l.label}`).join("、")} です。`,
    "公式の表は1号認定【教育】と2・3号認定【保育】に分かれています。当サイトでは保育利用にあたる2・3号認定の欄を載せています。",
    "町は「新規の受入枠について、調査時点での結果をお知らせするものです」「○となっている施設のクラス年齢においても、入所申請等の状況によっては入所できない場合があります」としています。",
    "町は「兄弟児は別枠となります。入所希望の兄弟児がいる場合は、なるべく早めに施設へご相談ください」としています。",
    "町は空き状況を画像で公開しているため、当サイトでは画像から書き起こして載せています。画像が差し替わったときは読み直すまで更新されません。",
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
    subtitle: "2・3号認定（保育）の空き状況",
    notes,
    wards: [] as string[],
    categories: [] as string[],
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
