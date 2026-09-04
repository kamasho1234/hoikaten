/**
 * 岸和田市の入所受入枠を取り込む
 *
 * 実行: npm run vacancy:fetch:kishiwada
 *
 * ## この自治体の特徴
 * - **受入枠の表を紙で作ってスキャンしたPDFで公開している。**文字を持たないので機械では読めない
 *   （罫線から升目を割り出す取り込みも試したが、印字がかすれていて数字を読み違えるため使えない）。
 *   画像を拡大して目視で書き起こし、このファイルに表として持っている
 * - 公立と民間で**PDFが2枚に分かれている**ので、両方を続けて載せる
 * - 空きは人数。斜線はそのクラスを設けていないことを表す
 * - 基準日はPDFではなくページの本文に書かれている（「令和8年9月1日入所空き状況（令和8年8月5日時点）」）
 */

import fs from "node:fs";
import path from "node:path";

const MUNICIPALITY_SLUG = "kishiwada";
const MUNICIPALITY_NAME = "岸和田市";
const PREFECTURE = "大阪府";
const SOURCE_NAME = "岸和田市「入所受入枠」";
const INDEX_URL = "https://www.city.kishiwada.lg.jp/page/35-hoikumoushikomi.html";
const AGE_COUNT = 6;
const UA = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);

/** 書き起こしたときのPDF。差し替わったら中断する */
const PDFS = [
  {
    category: "公立保育所・公立認定こども園",
    url: "https://www.city.kishiwada.lg.jp/uploaded/attachment/165575.pdf",
    bytes: 736775,
    linkText: "公立保育所・公立認定こども園",
  },
  {
    category: "民間保育園・民間認定こども園",
    url: "https://www.city.kishiwada.lg.jp/uploaded/attachment/165576.pdf",
    bytes: 846876,
    linkText: "民間保育園・民間認定こども園",
  },
];

/** 書き起こしたときのページ本文の日付。ここが変わったら表も変わっている */
const AS_OF = "2026-08-05";
/** 何月入所ぶんの受入枠か */
const TARGET_LABEL = "令和8年9月1日入所";

/**
 * 画像から書き起こした受入枠。null は斜線（そのクラスを設けていない）。
 * 番号は市の表の通し番号で、施設の並びもPDFのまま。
 */
const TABLE: { category: number; no: string; name: string; from: string; v: (number | null)[] }[] = [
  { category: 0, no: "101", name: "浜保育所", from: "1歳〜", v: [null, 0, 0, 3, 0, 3] },
  { category: 0, no: "102", name: "千喜里保育所", from: "57日〜", v: [0, 0, 0, 1, 11, 6] },
  { category: 0, no: "103", name: "大宮保育所", from: "3ヶ月〜", v: [0, 0, 0, 3, 10, 6] },
  { category: 0, no: "105", name: "山直北保育所", from: "3ヶ月〜", v: [0, 0, 0, 2, 0, 0] },
  { category: 0, no: "110", name: "城北保育所", from: "3ヶ月〜", v: [0, 0, 0, 0, 5, 1] },
  { category: 0, no: "113", name: "城内保育所", from: "1歳〜", v: [0, 0, 0, 5, 3, 1] },
  { category: 0, no: "114", name: "八木北保育所", from: "3ヶ月〜", v: [0, 0, 0, 0, 11, 0] },
  { category: 0, no: "116", name: "修斉保育所", from: "57日〜", v: [0, 0, 0, 5, 5, 4] },
  { category: 0, no: "118", name: "桜台保育所", from: "1歳〜", v: [0, 0, 0, 0, 0, 0] },
  { category: 0, no: "307", name: "旭・太田こども園", from: "57日〜", v: [0, 0, 1, 0, 0, 1] },
  { category: 0, no: "308", name: "春木・大芝こども園", from: "57日〜", v: [0, 0, 0, 1, 5, 7] },

  { category: 1, no: "201", name: "双葉児童園", from: "6ヶ月〜", v: [0, 0, 0, 0, 0, 0] },
  { category: 1, no: "202", name: "八木こども園", from: "57日〜", v: [0, 0, 0, 0, 0, 0] },
  { category: 1, no: "203", name: "認定こども園五風会", from: "6ヶ月〜", v: [0, 0, 0, 0, 0, 0] },
  { category: 1, no: "204", name: "山直南こども園", from: "57日〜", v: [0, 0, 0, 0, 0, 0] },
  { category: 1, no: "205", name: "星光こども園", from: "4ヶ月〜", v: [1, 0, 0, 0, 0, 0] },
  { category: 1, no: "206", name: "はちまん認定こども園", from: "3ヶ月〜", v: [1, 0, 1, 1, 0, 1] },
  { category: 1, no: "207", name: "この花こども園", from: "3ヶ月〜", v: [0, 0, 0, 0, 0, 0] },
  { category: 1, no: "208", name: "光陽保育園", from: "57日〜", v: [0, 0, 0, 0, 0, 0] },
  { category: 1, no: "209", name: "久米田保育園", from: "3ヶ月〜", v: [0, 0, 0, 0, 0, 0] },
  { category: 1, no: "210", name: "杉乃木保育園", from: "57日〜", v: [0, 0, 0, 0, 1, 0] },
  { category: 1, no: "211", name: "やまだい保育園", from: "57日〜", v: [0, 0, 0, 0, 0, 0] },
  { category: 1, no: "212", name: "光明保育園", from: "3ヶ月〜", v: [0, 0, 0, 0, 0, 0] },
  { category: 1, no: "213", name: "天神山こども園", from: "3ヶ月〜", v: [1, 0, 0, 0, 0, 0] },
  { category: 1, no: "214", name: "東岸和田こども園", from: "6ヶ月〜", v: [0, 0, 0, 0, 0, 0] },
  { category: 1, no: "215", name: "めだか保育園", from: "57日〜", v: [0, 0, 0, 0, 0, 0] },
  {
    category: 1,
    no: "216",
    name: "ピープル久米田チャイルドスクール",
    from: "6ヶ月〜",
    v: [0, 0, 0, 0, 0, 0],
  },
  {
    category: 1,
    no: "217",
    name: "ピープル八木南チャイルドスクール",
    from: "6ヶ月〜",
    v: [0, 0, 0, 0, 0, 0],
  },
  { category: 1, no: "218", name: "東光こども園", from: "3ヶ月〜", v: [0, 0, 0, 0, 2, 0] },
  {
    category: 1,
    no: "219",
    name: "ピープル大芝チャイルドスクール",
    from: "6ヶ月〜",
    v: [0, 0, 0, 0, 4, 5],
  },
  { category: 1, no: "220", name: "ドルチェ・バンビーニ", from: "6ヶ月〜", v: [0, 0, 0, 0, 9, 0] },
  { category: 1, no: "222", name: "中央保育園", from: "57日〜", v: [0, 0, 0, 2, 0, 0] },
  { category: 1, no: "301", name: "チューリップ保育園", from: "57日〜", v: [0, 0, 0, 0, 1, 0] },
  { category: 1, no: "302", name: "春木カトリック幼稚園", from: "1歳〜", v: [null, 0, 0, 0, 2, 0] },
  { category: 1, no: "303", name: "城東こども園", from: "6ヶ月〜", v: [0, 1, 0, 0, 0, 0] },
  { category: 1, no: "304", name: "楓の木こども園", from: "3ヶ月〜", v: [0, 0, 0, 1, 0, 0] },
  { category: 1, no: "305", name: "第2八木こども園", from: "57日〜", v: [1, 0, 0, 0, 0, 0] },
  {
    category: 1,
    no: "306",
    name: "ピープルきし城チャイルドスクール",
    from: "6ヶ月〜",
    v: [0, 0, 0, 0, 0, 0],
  },
  {
    category: 1,
    no: "202-2",
    name: "八木こども園乳児室",
    from: "57日〜",
    v: [0, 0, 0, null, null, null],
  },
  { category: 1, no: "205-2", name: "星光乳児室", from: "6ヶ月〜", v: [1, 0, 0, null, null, null] },
  {
    category: 1,
    no: "211-2",
    name: "やまだい乳児室",
    from: "57日〜",
    v: [0, 0, 0, null, null, null],
  },
  {
    category: 1,
    no: "218-2",
    name: "東光乳児室",
    from: "3ヶ月〜",
    v: [0, 0, 0, null, null, null],
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

function stripTags(html: string): string {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/[\s　]+/g, "");
}

async function main(): Promise<void> {
  console.log(`${MUNICIPALITY_NAME}の受入枠を取り込みます`);
  console.log(`公式ページ: ${INDEX_URL}\n`);

  const res = await fetch(INDEX_URL, { headers: { "User-Agent": UA }, redirect: "follow" });
  if (!res.ok) fail(`公式ページが ${res.status} を返しました`);
  const html = await res.text();
  const flat = stripTags(html);

  // 「岸和田市令和8年9月1日入所空き状況（令和8年8月5日時点）」から基準日を取る
  const m = flat.match(/(令和\d+年\d{1,2}月\d{1,2}日入所)空き状況（令和(\d+)年(\d{1,2})月(\d{1,2})日時点）/);
  if (!m) {
    fail("ページに「令和N年M月D日入所空き状況（令和N年M月D日時点）」が見つかりません。構成が変わった可能性があります。");
  }
  const asOf = `${Number(m[2]) + 2018}-${m[3].padStart(2, "0")}-${m[4].padStart(2, "0")}`;
  if (asOf > todayJst()) fail(`時点（${asOf}）が今日より先になっています`);
  if (m[1] !== TARGET_LABEL || asOf !== AS_OF) {
    fail(
      `公式の表が新しくなっています。PDFを読み直してから取り込んでください。\n` +
        `  書き起こしたとき: ${TARGET_LABEL}（${AS_OF}時点）\n` +
        `  いまページにある: ${m[1]}（${asOf}時点）`,
    );
  }

  // 同じ文字のリンクが「4月1日入所2次選考」の節にもあるので、
  // 年度途中入所の見出し（「…入所空き状況（…時点）」）から後ろだけを見る
  const head = html.indexOf("入所空き状況");
  if (head < 0) fail("ページに「入所空き状況」の見出しが見つかりません");
  const section = html.slice(head, head + 4000);

  // PDFが差し替わっていないか、リンクと中身の大きさの両方で確かめる
  for (const pdf of PDFS) {
    const links = [...section.matchAll(/<a[^>]+href="([^"]+\.pdf)"[^>]*>([\s\S]{0,160}?)<\/a>/gi)]
      .map((x) => ({ url: new URL(x[1], INDEX_URL).toString(), text: stripTags(x[2]) }))
      .filter((l) => l.text.startsWith(pdf.linkText));
    if (links.length !== 1) {
      fail(`「${pdf.linkText}」のリンクが${links.length}本あります（1本のはず）`);
    }
    if (links[0].url !== pdf.url) {
      fail(
        `PDFが差し替わっています。表を読み直してから取り込んでください。\n` +
          `  書き起こしたとき: ${pdf.url}\n  いまページにある: ${links[0].url}`,
      );
    }
    const pdfRes = await fetch(pdf.url, { headers: { "User-Agent": UA } });
    if (!pdfRes.ok) fail(`PDFの取得に失敗しました（${pdfRes.status}）: ${pdf.url}`);
    const buf = Buffer.from(await pdfRes.arrayBuffer());
    if (buf.length !== pdf.bytes) {
      fail(
        `PDFの中身が変わっています（${pdf.bytes} → ${buf.length} バイト）: ${pdf.url}\n` +
          `表を読み直し、TABLE と AS_OF と bytes を書き換えてから取り込んでください。`,
      );
    }
    console.log(`${pdf.category}: 書き起こしたときと同じPDFです（${buf.length} バイト）`);
  }

  const categories = PDFS.map((p) => p.category);
  const facilities: {
    id: string;
    name: string;
    w: null;
    c: number;
    vacancy: (number | null)[];
  }[] = [];
  const seen = new Set<string>();
  let openCount = 0;
  let total = 0;

  for (const row of TABLE) {
    if (seen.has(row.name)) fail(`施設名が重複しています: ${row.name}`);
    seen.add(row.name);
    if (row.v.length !== AGE_COUNT) fail(`${row.name}: 欄が${row.v.length}個です`);
    for (const n of row.v) {
      if (n === null) continue;
      if (!Number.isInteger(n) || n < 0) fail(`${row.name}: 受入枠が数ではありません（${n}）`);
      total += n;
      if (n > 0) openCount += 1;
    }
    facilities.push({
      id: `${row.no} ${row.name}`,
      name: row.name,
      w: null,
      c: row.category,
      vacancy: row.v,
    });
  }

  console.log(`${facilities.length}施設 ／ 受入枠のある欄 ${openCount} ／ 合計 ${total}人`);

  const previous = fs.existsSync(OUT_PATH)
    ? (JSON.parse(fs.readFileSync(OUT_PATH, "utf-8")) as { asOf?: string })
    : null;
  if (previous?.asOf === AS_OF) {
    console.log(`公式データの時点が前回と同じ（${AS_OF}）のため更新はありません。`);
    return;
  }

  const notes = [
    `この表は${TARGET_LABEL}の途中利用可能人数です。${AS_OF}時点のものです。`,
    "市は「受入枠があっても入所を保証するものではありません」「受入枠公開時に受入枠のなかった園も、児童の退所や保育施設の事情等により、変更となる場合があります」としています。",
    "市は「受入枠がなくても入所を希望する施設があれば申請・希望変更を行ってください」としています。",
    "市は「保育施設の希望順位は選考の点数（＝入所のしやすさ）に影響しません。入所したい順に希望順位を設定してください」としています。",
    "斜線が引かれているクラスは「—」にしています。設けていないクラスです。",
    "市は受入枠をスキャン画像のPDFで公開しているため、当サイトでは画像から書き起こして載せています。PDFが差し替わったときは読み直すまで更新されません。",
  ];

  const dataset = {
    municipalitySlug: MUNICIPALITY_SLUG,
    municipalityName: MUNICIPALITY_NAME,
    prefecture: PREFECTURE,
    asOf: AS_OF,
    fetchedAt: todayJst(),
    sourceName: SOURCE_NAME,
    sourceUrl: INDEX_URL,
    sourceFiles: Object.fromEntries(PDFS.map((p) => [p.category, p.url])),
    metrics: ["vacancy"],
    subtitle: `${TARGET_LABEL}の受入枠`,
    notes,
    wards: [] as string[],
    categories,
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
