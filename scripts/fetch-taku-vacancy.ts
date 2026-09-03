/**
 * 多久市の保育施設等の受け入れ可能状況を取り込む
 *
 * 実行: npm run vacancy:fetch:taku
 *
 * ## この自治体の特徴
 * - **受け入れ可能状況を1枚の画像（PNG）で公開している。**表でもPDFでもない
 * - 文字を持たないので機械では読めない。画像を拡大して目視で書き起こし、
 *   このファイルに表として持っている（塩竈市・裾野市・曽於市と同じやり方）
 * - **表が「1号認定」と「2・3号認定」の2組に分かれている。**
 *   1号は教育利用（満3歳児〜5歳児）なので、
 *   当サイトが扱う保育利用にあたる**2・3号認定の0〜5歳児**を取る
 * - 灰色に塗られた欄は1号認定を受け入れていない園。2・3号認定の欄には無い
 * - 記号は ◯＝2名以上入所可／△＝1名入所可／×＝入所不可
 */

import fs from "node:fs";
import path from "node:path";

const MUNICIPALITY_SLUG = "taku";
const MUNICIPALITY_NAME = "多久市";
const PREFECTURE = "佐賀県";
const SOURCE_NAME = "多久市「保育施設等の受け入れ可能状況について」";
const INDEX_URL = "https://www.city.taku.lg.jp/soshiki/7/36409.html";
const AGE_COUNT = 6;
const UA = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);

/** 書き起こしたときの画像。差し替わったら中断する */
const IMAGE_URL = "https://www.city.taku.lg.jp/uploaded/image/7026.png";
const IMAGE_BYTES = 34230;
/** ページの更新日（画像には入所月しか書かれていない） */
const AS_OF = "2026-09-01";
const TARGET = "2026年10月";

const LEGEND = [
  { mark: "〇", label: "2名以上入所可", open: true },
  { mark: "△", label: "1名入所可", open: true },
  { mark: "×", label: "入所不可", open: false },
];

/**
 * 画像から書き起こした表の「2・3号認定」の欄（0歳児〜5歳児）。
 * 1号認定（満3歳児〜5歳児）は教育利用なので取らない。
 */
const TABLE: { name: string; marks: string[] }[] = [
  { name: "あおいとりこども園", marks: ["△", "〇", "△", "×", "×", "×"] },
  { name: "こばと保育園", marks: ["〇", "〇", "〇", "△", "×", "△"] },
  { name: "杉の子こども園", marks: ["△", "〇", "〇", "〇", "〇", "〇"] },
  { name: "双葉保育園", marks: ["△", "〇", "×", "〇", "〇", "×"] },
  { name: "ひしのみこども園", marks: ["△", "△", "△", "△", "〇", "〇"] },
  { name: "認定こども園さくらんぼ", marks: ["〇", "〇", "〇", "〇", "〇", "〇"] },
  { name: "和光保育園", marks: ["△", "〇", "〇", "〇", "〇", "〇"] },
  { name: "みどり保育園", marks: ["〇", "〇", "△", "〇", "〇", "〇"] },
  { name: "とうぶこども園", marks: ["×", "〇", "×", "〇", "〇", "〇"] },
  { name: "なごみこども園", marks: ["△", "△", "×", "〇", "〇", "×"] },
  { name: "のうそこども園", marks: ["〇", "〇", "〇", "〇", "〇", "〇"] },
  { name: "のぞみ保育園", marks: ["〇", "△", "〇", "〇", "〇", "〇"] },
  { name: "多久保育園", marks: ["〇", "〇", "〇", "〇", "〇", "〇"] },
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
  const imgs = [...html.matchAll(/<img[^>]+src="([^"]*\/uploaded\/image\/[^"]+\.(?:png|jpg))"/gi)].map(
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
  const marks = new Map<string, number>();

  for (const row of TABLE) {
    if (seen.has(row.name)) fail(`施設名が重複しています: ${row.name}`);
    seen.add(row.name);
    if (row.marks.length !== AGE_COUNT) {
      fail(`${row.name}: 記号が${row.marks.length}個です（${AGE_COUNT}個のはず）`);
    }
    const symbols: (string | null)[] = [];
    for (const raw of row.marks) {
      if (!known.has(raw)) fail(`${row.name}: 凡例にない記号です（「${raw}」）`);
      marks.set(raw, (marks.get(raw) ?? 0) + 1);
      symbols.push(raw);
    }
    facilities.push({
      id: row.name,
      name: row.name,
      w: null,
      vacancy: new Array(AGE_COUNT).fill(null),
      symbols,
    });
  }

  const total = [...marks.values()].reduce((a, b) => a + b, 0);
  if (total !== facilities.length * AGE_COUNT) {
    fail(`欄の数が合いません（${total} / 施設${facilities.length}×${AGE_COUNT}）`);
  }
  console.log(
    `${facilities.length}施設 ／ ${[...marks].map(([m, n]) => `${m}${n}`).join("・")}`,
  );

  const previous = fs.existsSync(OUT_PATH)
    ? (JSON.parse(fs.readFileSync(OUT_PATH, "utf-8")) as { asOf?: string })
    : null;
  if (previous?.asOf === AS_OF) {
    console.log(`公式データの時点が前回と同じ（${AS_OF}）のため更新はありません。`);
    return;
  }

  const notes = [
    `多久市は受け入れ可能状況を人数ではなく記号で公表しています。これは${TARGET}入所分で、${AS_OF}に更新されたものです。`,
    `公式の凡例は ${LEGEND.map((l) => `「${l.mark}」${l.label}`).join("、")} です。`,
    "公式の表は1号認定（教育利用）と2・3号認定に分かれています。当サイトでは保育利用にあたる2・3号認定の欄を載せています。",
    "市は「本表は目安であり、入所を保証するものではありません」「受け入れ可能状況が【△】や【×】になっている場合でも、状況によっては入所できることがあります」としています。",
    "市は受け入れ可能状況を画像で公開しているため、当サイトでは画像から書き起こして載せています。画像が差し替わったときは読み直すまで更新されません。",
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
    subtitle: `${TARGET}入所分の受け入れ可能状況（2・3号認定）`,
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
