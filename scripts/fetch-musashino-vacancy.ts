/**
 * 武蔵野市の認可保育施設の空き状況を取り込む
 *
 * 実行: npm run vacancy:fetch:musashino
 *
 * ## この自治体の特徴
 * - **空き数と申込数の両方を実数で公開している**（三鷹市・柏市などと同じ）
 * - **年齢ごとに3列**（空き数／サポート児受入／申込数）。真ん中は〇✕の印なので読み飛ばす
 * - 見出しが3行にわたる（1行目に表題、2行目に年齢、3行目に「空き数／サポート児受入／申込数」）
 * - 施設の種類（認可保育所・認定こども園ほか）と公立・私立の別が左端の縦書きに入る
 * - **空き数は定員から在園児数を引いた数**。空きがない施設にも申し込める
 *
 * ## 申込数の読み方
 * 第1希望から第6希望までの総計。1人が複数園を書けるので、そのまま倍率にはならない。
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "musashino";
const MUNICIPALITY_NAME = "武蔵野市";
const SOURCE_NAME = "武蔵野市「認可保育施設の定員と空き状況」";
const INDEX_URL =
  "https://www.city.musashino.lg.jp/shussan_kodomo_kyoiku/kodomo_kosodate/hoikuen_yochien_kodomoen/ninkahoikusho_chiikihoikujigyo/nyusho_tetsuzuki/1006848.html";
const AGE_COUNT = 6;

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const EXTRACTOR = path.join(process.cwd(), "scripts", "musashino-pdf-extract.py");

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

function stripTags(html: string): string {
  return html.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();
}

function squeeze(s: string): string {
  return (s ?? "").replace(/[\s　]/g, "");
}

/** 空欄はそのクラスの受け入れがない */
function parseValue(raw: string, where: string): number | null {
  const t = toHalfWidth(squeeze(raw));
  if (t === "" || t === "-" || t === "－" || t === "―") return null;
  if (/^\d+$/.test(t)) return Number(t);
  fail(`${where}: 人数として読めません: 「${raw}」`);
}

type PdfTable = { head: string[]; ageHead: string[]; subHead: string[]; rows: string[][] };
type PdfResult = { asOf: number[][]; target: number[][]; tables: PdfTable[] };

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
  console.log(`${MUNICIPALITY_NAME}の空き状況を取り込みます`);
  console.log(`公式ページ: ${INDEX_URL}\n`);

  const ua = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";
  const res = await fetch(INDEX_URL, { headers: { "User-Agent": ua } });
  if (!res.ok) fail(`公式ページが ${res.status} を返しました`);
  const html = await res.text();

  // 「令和8年9月1日入所空き状況 （PDF 187.5KB）」
  const links = [...html.matchAll(/<a[^>]+href="([^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => ({ url: new URL(m[1], INDEX_URL).toString(), text: toHalfWidth(stripTags(m[2])) }))
    .map((l) => {
      const m = l.text.match(/令和(\d+)年(\d+)月(\d+)日入所空き状況/);
      if (!m) return null;
      const year = reiwaToYear(Number(m[1]));
      const month = Number(m[2]);
      return { ...l, year, month, day: Number(m[3]), sortKey: year * 100 + month };
    })
    .filter((v): v is NonNullable<typeof v> => v !== null);
  if (links.length === 0) fail("空き状況のPDFが見つかりません。ページの構成が変わった可能性があります。");
  const latest = links.reduce((a, b) => (b.sortKey > a.sortKey ? b : a));
  console.log(`最新: ${latest.text}\n  ${latest.url}`);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "musashino-vacancy-"));
  try {
    const r = await fetch(latest.url, { headers: { "User-Agent": ua } });
    if (!r.ok) fail(`PDFの取得に失敗しました（${r.status}）: ${latest.url}`);
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.subarray(0, 4).toString() !== "%PDF") fail(`PDFではありません: ${latest.url}`);
    const file = path.join(tmpDir, "musashino.pdf");
    fs.writeFileSync(file, buf);

    let pdf: PdfResult;
    try {
      pdf = JSON.parse(runPython([EXTRACTOR, file])) as PdfResult;
    } catch (err) {
      fail(`抽出結果を読めません: ${String(err)}`);
    }

    if (pdf.target.length !== 1) fail(`PDFに入所日が${pdf.target.length}種類あります`);
    const [ty, tm, td] = pdf.target[0];
    if (reiwaToYear(ty) !== latest.year || tm !== latest.month) {
      fail(`PDFの入所月（${reiwaToYear(ty)}年${tm}月）がリンクの文言と違います。`);
    }
    if (pdf.asOf.length !== 1) fail(`PDFに基準日が${pdf.asOf.length}種類あります`);
    const [ay, am, ad] = pdf.asOf[0];
    const asOf = `${reiwaToYear(ay)}-${String(am).padStart(2, "0")}-${String(ad).padStart(2, "0")}`;
    console.log(`基準日: ${asOf} / 対象: ${latest.year}年${latest.month}月${td}日入所`);

    const categories: string[] = [];
    const facilities: {
      id: string;
      name: string;
      w: null;
      c: number;
      vacancy: (number | null)[];
      waiting: (number | null)[];
    }[] = [];
    const seenId = new Set<string>();
    /** 左端の列に「種類 施設名」がまとめて書かれる施設の種類 */
    const INLINE_KINDS = ["認定こども園", "事業所内保育事業"];
    /** 縦書きの列は字数を詰めた略記なので、公式ページの呼び方にそろえる */
    const KIND_LABEL: Record<string, string> = {
      家庭的: "家庭的保育事業",
      小規模保育: "小規模保育事業",
    };
    const declared = new Array(AGE_COUNT).fill(0);
    const declaredWaiting = new Array(AGE_COUNT).fill(0);
    let totalRows = 0;
    let kind = "";
    let owner = "";

    for (const table of pdf.tables) {
      // 2行目に年齢、3行目に「空き数／サポート児受入／申込数」が並ぶ
      const ageHead = table.ageHead.map((h) => toHalfWidth(squeeze(h)));
      const sub = table.subHead.map((h) => squeeze(h));
      // **2ページめの地域型保育事業は0〜2歳児しか列がない**ので、ない年齢は「クラスなし」にする
      const ageIdx = Array.from({ length: AGE_COUNT }, (_, i) => ageHead.indexOf(`${i}歳児`));
      if (ageIdx[0] < 0) fail(`0歳児の見出しが見つかりません: ${table.ageHead.join(" / ")}`);
      // **表によって年齢あたりの列数が違う**。認可保育所は3列（空き数／サポート児受入／申込数）、
      // 地域型保育事業はサポート児の列がなく2列。「申込数」がどこに来るかで見分ける
      const applyOffset = sub[ageIdx[0] + 2] === "申込数" ? 2 : sub[ageIdx[0] + 1] === "申込数" ? 1 : -1;
      if (sub[ageIdx[0]] !== "空き数" || applyOffset < 0) {
        fail(`「空き数」「申込数」の並びが想定と違います: ${table.subHead.join(" / ")}`);
      }
      for (const [age, col] of ageIdx.entries()) {
        if (col < 0) continue;
        if (sub[col] !== "空き数" || sub[col + applyOffset] !== "申込数") {
          fail(`${age}歳児の並びが想定と違います: ${table.subHead.join(" / ")}`);
        }
      }
      // 施設名は「対象年齢」の列の1つ左。認可の表は公私の列があるぶん1列多い
      const targetAgeIdx = table.head.findIndex((h) => squeeze(h).startsWith("対象年齢"));
      const nameIdx = targetAgeIdx > 0 ? targetAgeIdx - 1 : ageIdx[0] - 2;
      if (nameIdx < 0) fail(`施設名の列が分かりません: ${table.head.join(" / ")}`);
      // 公私の列があるのは施設名の左に列が2つあるときだけ
      const ownerIdx = nameIdx - 1 >= 1 ? nameIdx - 1 : -1;

      for (const row of table.rows) {
        const leftCell = squeeze(row[0] ?? "");
        // **表の末尾に合計行がある**（「認可保育所・認定こども園 合計」「地域型保育事業 合計」）。
        // 施設ではないので積み上げに入れず、公式の値として検算に使う
        if (leftCell.endsWith("合計")) {
          const values = ageIdx.map((c) =>
            c < 0 ? null : parseValue(row[c] ?? "", `武蔵野市 ${leftCell}`)
          );
          values.forEach((v, i) => {
            declared[i] += v ?? 0;
          });
          ageIdx.forEach((c, i) => {
            if (c < 0) return;
            declaredWaiting[i] += parseValue(row[c + applyOffset] ?? "", `武蔵野市 ${leftCell}`) ?? 0;
          });
          totalRows++;
          continue;
        }
        // **一部の施設は左端の列に「種類 施設名」がまとめて入る**（認定こども園と
        // 事業所内保育事業）。縦書きの種類の列を使わず1行で書かれているため、切り分ける
        const inlineKind = INLINE_KINDS.find((k) => leftCell.startsWith(k) && leftCell.length > k.length);
        if (inlineKind) {
          kind = inlineKind;
          owner = "";
        } else if (leftCell) {
          // 種類と公私は左端の縦書き。変わるときだけ値が入る
          kind = leftCell;
        }
        if (!inlineKind && ownerIdx >= 0 && squeeze(row[ownerIdx] ?? "")) {
          owner = squeeze(row[ownerIdx]);
        }
        if (ownerIdx < 0) owner = "";

        const name = inlineKind ? leftCell.slice(inlineKind.length) : squeeze(row[nameIdx] ?? "");
        if (!name) continue;
        if (/^(空き数|申込数|施設名)$/.test(name)) continue;
        if (!kind) fail(`${name}: 施設の種類が分かりません`);
        const kindLabel = KIND_LABEL[kind] ?? kind;
        const category = owner ? `${kindLabel}（${owner}）` : kindLabel;
        if (!categories.includes(category)) categories.push(category);

        const vacancy = ageIdx.map((c) =>
          c < 0 ? null : parseValue(row[c] ?? "", `武蔵野市 ${name}（空き数）`)
        );
        const waiting = ageIdx.map((c) =>
          c < 0 ? null : parseValue(row[c + applyOffset] ?? "", `武蔵野市 ${name}（申込数）`)
        );

        const id = `${category}-${name}`;
        if (seenId.has(id)) fail(`施設名が重複しています: ${id}`);
        seenId.add(id);
        facilities.push({
          id,
          name,
          w: null,
          c: categories.indexOf(category),
          vacancy,
          waiting,
        });
      }
    }

    if (facilities.length < 30) fail(`施設が${facilities.length}件しか取れていません`);

    // 公式の合計行と積み上げを突き合わせる
    const built = Array.from({ length: AGE_COUNT }, (_, age) =>
      facilities.reduce((acc, f) => acc + (f.vacancy[age] ?? 0), 0)
    );
    if (totalRows === 0) fail("合計行が見つかりません。検算ができないので中断します。");
    if (declared.join("/") !== built.join("/")) {
      fail(`空き数の合計行が ${declared.join("/")} なのに積み上げが ${built.join("/")} です`);
    }
    const builtWaiting = Array.from({ length: AGE_COUNT }, (_, age) =>
      facilities.reduce((acc, f) => acc + (f.waiting[age] ?? 0), 0)
    );
    if (declaredWaiting.join("/") !== builtWaiting.join("/")) {
      fail(`申込数の合計行が ${declaredWaiting.join("/")} なのに積み上げが ${builtWaiting.join("/")} です`);
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
    // 取り込み元のURLも同じときだけ、書き換えを見送る
    if (previous?.asOf === asOf && previous?.sourceFiles?.vacancy === latest.url) {
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
      sourceFiles: { vacancy: latest.url },
      metrics: ["vacancy", "waiting"],
      subtitle: `${latest.year}年${latest.month}月${td}日入所の空き状況`,
      waitingCaveat:
        "申込数は第1希望から第6希望までの総計です。1人が複数の園を書けるので、そのまま倍率にはなりません。",
      notes: [
        "武蔵野市の注記のとおり、空き数は定員数から在園児数を引いた人数です。在園児の退所・転所などで変わることがあります。",
        "空き数がない施設にも申し込むことはできます。",
        "サポート児（障害のあるお子さん）の受入可否は当サイトでは扱っていません。公式の一覧をご覧ください。",
      ],
      wards: [],
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

    const ageTotals = Array.from({ length: AGE_COUNT }, (_, age) =>
      facilities.reduce((acc, f) => acc + (f.vacancy[age] ?? 0), 0)
    );
    const waitTotals = Array.from({ length: AGE_COUNT }, (_, age) =>
      facilities.reduce((acc, f) => acc + (f.waiting[age] ?? 0), 0)
    );
    console.log(`書き出しました: ${path.relative(process.cwd(), OUT_PATH)}`);
    console.log(`  合計行との突き合わせ: 空き数 ${built.join("/")} / 申込数 ${builtWaiting.join("/")} ともに一致`);
    console.log("");
    for (const [i, cat] of categories.entries()) {
      console.log(`  ${cat} ${facilities.filter((f) => f.c === i).length}施設`);
    }
    console.log("");
    console.log("  年齢 | 空き | 申込");
    ageTotals.forEach((v, age) => console.log(`  ${age}歳児 | ${v} | ${waitTotals[age]}`));
    console.log(
      `  合計 | ${ageTotals.reduce((a, b) => a + b, 0)} | ${waitTotals.reduce((a, b) => a + b, 0)}`
    );
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

main().catch((err) => fail(String(err)));
