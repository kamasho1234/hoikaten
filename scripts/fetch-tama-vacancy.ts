/**
 * 多摩市の保育施設の募集人数（空き状況）を取り込む
 *
 * 実行: npm run vacancy:fetch:tama
 *
 * ## この自治体の特徴
 * - **施設ごとに2行**。上段が募集人数（空き状況）、下段がその園を第一希望として申請し
 *   入所・転所保留になっている児童の数
 * - 施設ごとに「合計」列があるので、1行ずつ年齢の和と突き合わせられる
 * - 施設の種類は左端の縦書き。**2列に割れて「も こ認／園ど定」のように順が崩れる**ため、
 *   文字の集まりとして種類の候補と突き合わせて見分ける
 * - 末尾に「合計」と「第一希望として申請し保留となっている児童の数」の2行があり、
 *   空き・保留のどちらも積み上げと突き合わせる
 * - 2ページめの認証保育所・企業主導型保育所は市に申し込む施設ではないので取り込まない
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "tama";
const MUNICIPALITY_NAME = "多摩市";
const SOURCE_NAME = "多摩市「市内保育施設等の空き状況」";
const INDEX_URL = "https://www.city.tama.lg.jp/kosodate/1008019/1008034/1003518.html";
const AGE_COUNT = 6;

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const EXTRACTOR = path.join(process.cwd(), "scripts", "tama-pdf-extract.py");

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

/** 縦書きの種類は文字の順が崩れるので、文字の集まりで見分ける */
const KNOWN_CATEGORIES = [
  "認可保育所",
  "認定こども園",
  "小規模保育事業所",
  "家庭的保育事業所",
  "事業所内保育事業所",
];

function sortedChars(s: string): string {
  return [...squeeze(s)].sort().join("");
}

function categoryOf(raw: string): string | null {
  const key = sortedChars(raw);
  return KNOWN_CATEGORIES.find((c) => sortedChars(c) === key) ?? null;
}

type PdfResult = {
  target: number[];
  asOf: number[];
  rows: string[][];
  /** 施設の種類が入る左端の列を、結合されたセルの区切りごとに読んだもの */
  blocks: { text: string; from: number; to: number }[];
};

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

  // 「令和8年9月入所分の空き状況 （PDF 635.4 KB）」
  const links = [...html.matchAll(/<a[^>]+href="([^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => ({ url: new URL(m[1], INDEX_URL).toString(), text: toHalfWidth(stripTags(m[2])) }))
    .map((l) => {
      const m = l.text.match(/^令和(\d+)年(\d+)月入所分の空き状況/);
      if (!m) return null;
      const fiscalYear = reiwaToYear(Number(m[1]));
      const month = Number(m[2]);
      const year = month <= 3 ? fiscalYear + 1 : fiscalYear;
      return { ...l, year, month, sortKey: year * 100 + month };
    })
    .filter((v): v is NonNullable<typeof v> => v !== null);
  if (links.length === 0) fail("空き状況のPDFが見つかりません。ページの構成が変わった可能性があります。");
  const latest = links.reduce((a, b) => (b.sortKey > a.sortKey ? b : a));
  console.log(`最新: ${latest.text}\n  ${latest.url}`);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "tama-vacancy-"));
  try {
    const r = await fetch(latest.url, { headers: { "User-Agent": ua } });
    if (!r.ok) fail(`PDFの取得に失敗しました（${r.status}）: ${latest.url}`);
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.subarray(0, 4).toString() !== "%PDF") fail(`PDFではありません: ${latest.url}`);
    const file = path.join(tmpDir, "tama.pdf");
    fs.writeFileSync(file, buf);

    let pdf: PdfResult;
    try {
      pdf = JSON.parse(runPython([EXTRACTOR, file])) as PdfResult;
    } catch (err) {
      fail(`抽出結果を読めません: ${String(err)}`);
    }

    const [ty, tm] = pdf.target;
    if (tm !== latest.month) {
      fail(`PDFの対象月（${tm}月）がリンクの文言（${latest.month}月）と違います。`);
    }
    const [ry, am, ad] = pdf.asOf;
    const asOf = `${reiwaToYear(ry)}-${String(am).padStart(2, "0")}-${String(ad).padStart(2, "0")}`;
    console.log(`基準日: ${asOf} / 対象: 令和${ty}年度${tm}月入所`);

    // 見出しの行を探す（表題や注記の行が上に入る）
    const headIndex = pdf.rows.findIndex((r) => r.some((c) => squeeze(c) === "保育所名"));
    if (headIndex < 0) fail("「保育所名」の見出しが見つかりません");
    const head = pdf.rows[headIndex].map((h) => toHalfWidth(squeeze(h)));
    const ageIdx = Array.from({ length: AGE_COUNT }, (_, i) => head.indexOf(`${i}歳`));
    if (ageIdx.some((i) => i < 0)) fail(`年齢の見出しが見つかりません: ${head.join(" / ")}`);
    const totalIdx = head.indexOf("合計");
    if (totalIdx < 0) fail(`「合計」の列が見つかりません: ${head.join(" / ")}`);
    const nameIdx = ageIdx[0] - 1;

    const parseRow = (row: string[], where: string): (number | null)[] =>
      ageIdx.map((c) => {
        const t = toHalfWidth(squeeze(row[c] ?? ""));
        // 空欄はそのクラスを設けていない（地域型は2歳児まで、幼児のみの園もある）
        if (t === "") return null;
        if (!/^\d+$/.test(t)) fail(`${where}: 人数として読めません: 「${row[c]}」`);
        return Number(t);
      });

    /** 行の「合計」列と年齢の和を突き合わせる */
    const checkTotal = (row: string[], values: (number | null)[], where: string) => {
      const t = toHalfWidth(squeeze(row[totalIdx] ?? ""));
      if (t === "") return;
      if (!/^\d+$/.test(t)) fail(`${where}: 合計を読めません: 「${row[totalIdx]}」`);
      const sum = values.reduce((a: number, v) => a + (v ?? 0), 0);
      if (Number(t) !== sum) fail(`${where}: 合計${t}と年齢ごとの和${sum}が合いません`);
    };

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
    const builtVacancy = Array.from({ length: AGE_COUNT }, () => 0);
    const builtWaiting = Array.from({ length: AGE_COUNT }, () => 0);
    let declaredVacancy: number[] | null = null;
    let declaredWaiting: number[] | null = null;
    // 種類は左端の結合セルごとに決まる。どの行がどの種類かをここで割り当てる
    const kindOfRow = new Array<string>(pdf.rows.length).fill("");
    for (const block of pdf.blocks) {
      const kind = categoryOf(block.text);
      if (!kind) continue;
      for (let i = block.from; i < block.to; i++) kindOfRow[i] = kind;
    }
    if (!kindOfRow.some((k) => k)) fail("施設の種類を1つも読み取れませんでした");

    const body = pdf.rows.slice(headIndex + 1);
    for (let i = 0; i < body.length; i++) {
      const row = body[i];
      const first = squeeze(row[0] ?? "");
      // 合計の行は種類の列が空で、施設名の欄に「合計」と入る
      const label = first + squeeze(row[nameIdx] ?? "");
      if (label === "合計") {
        declaredVacancy = parseRow(row, "多摩市 合計行").map((v) => v ?? 0);
        checkTotal(row, declaredVacancy, "多摩市 合計行");
        continue;
      }
      if (label.startsWith("第一希望")) {
        declaredWaiting = parseRow(row, "多摩市 保留の合計行").map((v) => v ?? 0);
        checkTotal(row, declaredWaiting, "多摩市 保留の合計行");
        continue;
      }

      // 「おだ認定こども園（３号）※」の※は表の下の注記への印
      const name = squeeze(row[nameIdx] ?? "").replace(/※\d*$/, "");
      if (!name) continue;
      const kind = kindOfRow[headIndex + 1 + i];
      if (!kind) fail(`${name}: 施設の種類が分かりません`);

      // 施設ごとに2行。次の行が保留の数。
      // 行の高さが12ptしかないため、上の行の文字が1つだけ下の行の施設名の欄に
      // まぎれ込むことがある。数字しか残らない欄は施設名なしとみなす
      const next = body[i + 1];
      if (!next || /[^\d]/.test(squeeze(next[nameIdx] ?? ""))) {
        fail(`${name}: 保留の数の行が見つかりません`);
      }
      i++;

      const vacancy = parseRow(row, `多摩市 ${name}（空き）`);
      checkTotal(row, vacancy, `多摩市 ${name}（空き）`);
      const waiting = parseRow(next, `多摩市 ${name}（保留）`);
      checkTotal(next, waiting, `多摩市 ${name}（保留）`);
      vacancy.forEach((v, age) => {
        builtVacancy[age] += v ?? 0;
      });
      waiting.forEach((v, age) => {
        builtWaiting[age] += v ?? 0;
      });

      if (!categories.includes(kind)) categories.push(kind);
      const id = `${kind}-${name}`;
      if (seenId.has(id)) fail(`施設名が重複しています: ${id}`);
      seenId.add(id);
      facilities.push({ id, name, w: null, c: categories.indexOf(kind), vacancy, waiting });
    }

    if (!declaredVacancy || !declaredWaiting) {
      fail("合計の行が見つかりません。検算ができないので中断します。");
    }
    /**
     * 合計行と積み上げを突き合わせる。
     *
     * **総数は必ず合わせる**が、年齢ごとの内訳は公式の合計行のほうがずれていることがある
     * （2026年9月分では0歳児と1歳児、3歳児と4歳児で1ずつ入れ違っていた）。
     * 施設ごとの行は「年齢の和＝その行の合計列」がすべて成り立っていて筋が通っているので、
     * 内訳の食い違いは何件あったかを知らせるだけにして、施設ごとの値を採る。
     */
    const compare = (label: string, declared: number[], built: number[]) => {
      const sum = (v: number[]) => v.reduce((a, b) => a + b, 0);
      if (sum(declared) !== sum(built)) {
        fail(`${label}の合計行が ${declared.join("/")} なのに積み上げが ${built.join("/")} です`);
      }
      const diff = declared.filter((v, i) => v !== built[i]).length;
      // 隣り合う年齢の入れ違い（2組まで）を超える食い違いは、こちらの読み違いを疑って止める
      const gap = declared.reduce((a, v, i) => a + Math.abs(v - built[i]), 0);
      if (diff > 4 || gap > 4) {
        fail(`${label}の年齢ごとの内訳が公式の合計行と${diff}か所で違います（${declared.join("/")} と ${built.join("/")}）`);
      }
      if (diff > 0) {
        console.log(`  [注意] ${label}の年齢ごとの内訳が公式の合計行と違います（公式 ${declared.join("/")} / 施設ごとの積み上げ ${built.join("/")}）`);
        console.log("         施設ごとの行はどれも「年齢の和＝その行の合計」が成り立っているため、積み上げのほうを採ります。");
      }
    };
    compare("空き", declaredVacancy, builtVacancy);
    compare("保留", declaredWaiting, builtWaiting);
    if (facilities.length < 25) fail(`施設が${facilities.length}件しか取れていません`);

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
      subtitle: `${latest.year}年${latest.month}月入所の募集人数`,
      waitingCaveat:
        "その園を第一希望として申請し、入所・転所が保留になっている児童の数です（転所を希望する方も含みます）。前回審査後の時点の数です。",
      notes: [
        "多摩市の注記のとおり、園の運営状況や決定児童の辞退・在園児童の急な退所などにより、審査までに空き状況が変わることがあります。",
        "「—」はそのクラスの枠がない園です。複数のクラス年齢をまとめて1つの枠にしている場合、いちばん低い年齢の欄に人数がまとめられています。",
        "おだ認定こども園の3歳児〜5歳児クラス、多摩みゆき幼稚園・東京大谷幼稚園の2号（保育枠）は各施設にお問い合わせください。",
        "認証保育所・企業主導型保育所は市への申し込みではないため、この一覧には含めていません。",
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

    console.log(`書き出しました: ${path.relative(process.cwd(), OUT_PATH)}`);
    console.log(`  施設ごとの積み上げ: 空き ${builtVacancy.join("/")} / 保留 ${builtWaiting.join("/")}（総数は公式の合計行と一致）`);
    console.log("");
    for (const [i, cat] of categories.entries()) {
      console.log(`  ${cat} ${facilities.filter((f) => f.c === i).length}施設`);
    }
    console.log("");
    console.log("  年齢 | 空き | 保留");
    builtVacancy.forEach((v, age) => console.log(`  ${age}歳児 | ${v} | ${builtWaiting[age]}`));
    console.log(
      `  合計 | ${builtVacancy.reduce((a, b) => a + b, 0)} | ${builtWaiting.reduce((a, b) => a + b, 0)}`
    );
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

main().catch((err) => fail(String(err)));
