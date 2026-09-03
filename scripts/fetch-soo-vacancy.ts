/**
 * 曽於市の保育園・認定こども園の空き状況を取り込む
 *
 * 実行: npm run vacancy:fetch:soo
 *
 * ## この自治体の特徴
 * - **空き状況を1枚の画像（JPEG）で公開している。**表でもPDFでもない
 * - 文字を持たないので機械では読めない。画像を拡大して目視で書き起こし、
 *   このファイルに表として持っている（塩竈市・裾野市と同じやり方）
 * - 取り込みのたびに**画像が差し替わっていないかを確かめ**、
 *   変わっていたら中断する
 * - 記号は ○＝4人以上／△＝1人〜3人／×＝受入れ不可／−＝施設にお問い合わせください。
 *   **「−」は「空きなし」ではない**ので、記号として持つ
 * - 斜線が引かれた欄はそのクラスを設けていないことを表す（末吉中央幼稚園の0〜2歳）
 * - 地区（末吉・大隅・財部）を wards に持たせる
 */

import fs from "node:fs";
import path from "node:path";

const MUNICIPALITY_SLUG = "soo";
const MUNICIPALITY_NAME = "曽於市";
const PREFECTURE = "鹿児島県";
const SOURCE_NAME = "曽於市「保育園、認定こども園の空き状況をお知らせします。」";
const INDEX_URL =
  "https://www.city.soo.kagoshima.jp/kurashi/kosodatekyouiku/hoikuenn/akizyoukyou.html";
const AGE_COUNT = 6;
const UA = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);

/** 書き起こしたときの画像。差し替わったら中断する */
const IMAGE_URL =
  "https://www.city.soo.kagoshima.jp/kurashi/kosodatekyouiku/hoikuenn/images/akijoukyou9.1_1.jpg";
const IMAGE_BYTES = 989648;
/** 画像に書かれている確認日 */
const AS_OF = "2026-09-01";

const LEGEND = [
  { mark: "〇", label: "4人以上", open: true },
  { mark: "△", label: "1人〜3人", open: true },
  { mark: "×", label: "受入れ不可", open: false },
  { mark: "－", label: "施設にお問い合わせください", open: false },
];

/**
 * 画像から書き起こした表。
 * 記号は 〇 △ × －、斜線（クラスなし）を null で表す。
 */
const TABLE: {
  area: string;
  kind: string;
  name: string;
  marks: (string | null)[];
  note?: string;
}[] = [
  { area: "末吉", kind: "保育園", name: "高之峯保育園", marks: ["×", "△", "△", "△", "△", "△"] },
  { area: "末吉", kind: "保育園", name: "白鳥保育園", marks: ["△", "〇", "－", "－", "〇", "〇"] },
  {
    area: "末吉",
    kind: "認定こども園",
    name: "ひこばえこども園",
    marks: ["×", "×", "－", "×", "×", "×"],
  },
  { area: "末吉", kind: "認定こども園", name: "樹心こども園", marks: ["×", "△", "△", "×", "×", "×"] },
  {
    area: "末吉",
    kind: "認定こども園",
    name: "きらりの星こども園",
    marks: ["×", "×", "×", "×", "×", "×"],
  },
  {
    area: "末吉",
    kind: "認定こども園",
    name: "末吉中央幼稚園",
    marks: [null, null, null, "△", "△", "△"],
  },
  {
    area: "末吉",
    kind: "認定こども園",
    name: "りんこうこども園",
    marks: ["△", "△", "△", "△", "△", "△"],
  },
  {
    area: "大隅",
    kind: "認定こども園",
    name: "スイミーこども園",
    marks: ["－", "×", "×", "×", "×", "×"],
  },
  {
    area: "大隅",
    kind: "認定こども園",
    name: "認定こども園かささぎ",
    marks: ["〇", "〇", "〇", "〇", "〇", "△"],
  },
  {
    area: "大隅",
    kind: "認定こども園",
    name: "おひさまの杜こども園",
    marks: ["△", "△", "△", "△", "△", "△"],
  },
  {
    area: "大隅",
    kind: "認定こども園",
    name: "覚照こども園",
    marks: ["△", "△", "〇", "〇", "〇", "〇"],
  },
  {
    area: "大隅",
    kind: "認定こども園",
    name: "大隅中央幼稚園",
    marks: ["△", "△", "△", "△", "〇", "△"],
  },
  {
    area: "大隅",
    kind: "認定こども園",
    name: "太陽の子幼児園",
    marks: ["－", "△", "△", "－", "－", "－"],
  },
  {
    area: "大隅",
    kind: "認定こども園",
    name: "しょうしん月の森こども園",
    marks: ["△", "△", "△", "△", "△", "△"],
  },
  {
    area: "財部",
    kind: "認定こども園",
    name: "しゃらこども園",
    marks: ["－", "－", "－", "△", "〇", "〇"],
    note: "入園前に面談を行い、園についてご理解いただいたうえで正式入園となります。",
  },
  { area: "財部", kind: "認定こども園", name: "きらり園", marks: ["×", "－", "×", "×", "×", "×"] },
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
    ...html.matchAll(/<img[^>]+src="([^"]*images\/akijoukyou[^"]+\.(?:jpg|png))"/gi),
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
  const wards: string[] = [];
  const categories: string[] = [];
  const facilities: {
    id: string;
    name: string;
    w: number;
    c: number;
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
    let w = wards.indexOf(row.area);
    if (w < 0) {
      wards.push(row.area);
      w = wards.length - 1;
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
      w,
      c,
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
    `${facilities.length}施設 ／ ${[...marks].map(([m, n]) => `${m}${n}`).join("・")}・クラスなし${notOffered}`,
  );

  const previous = fs.existsSync(OUT_PATH)
    ? (JSON.parse(fs.readFileSync(OUT_PATH, "utf-8")) as { asOf?: string })
    : null;
  if (previous?.asOf === AS_OF) {
    console.log(`公式データの時点が前回と同じ（${AS_OF}）のため更新はありません。`);
    return;
  }

  const notes = [
    `曽於市は空き状況を人数ではなく記号で公表しています。これは${AS_OF}に確認された分です。`,
    `公式の凡例は ${LEGEND.map((l) => `「${l.mark}」${l.label}`).join("、")} です。`,
    "公式の表で斜線が引かれている年齢は「—」にしています。その年齢のクラスを設けていないことを表します。",
    "年齢は令和8年4月1日時点です。記載内容は各月1日時点の空き状況で、最新の情報は各施設やこども未来課へ問い合わせるよう市が案内しています。",
    "認定こども園の幼稚園部分（1号認定）については、各施設へお問い合わせください。",
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
    wards,
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
