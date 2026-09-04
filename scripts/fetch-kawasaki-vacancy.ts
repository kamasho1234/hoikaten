/**
 * 川崎市の保育所等の受入可能数を取り込む
 *
 * 実行: npm run vacancy:fetch:kawasaki
 *
 * ## 横浜市・目黒区との違い
 * - **CSVではなくPDF**。7区それぞれに1ファイルある
 * - **数値の意味が違う**。横浜市は「その時点の空き」だが、川崎市は「翌月入所ぶんの
 *   受入可能数（予定）」。UIでは subtitle でそれを明示する
 * - **区ごとに基準日が違う**（川崎区7月27日・中原区8月6日など）。
 *   データセットの asOf は最も古い基準日にし、区ごとの日付は notes に書く
 * - 入所待ち人数・在籍児童数はない
 *
 * ## PDFの扱い
 * pdftotext では日本語が落ちるため、pdfplumber（Python）に投げる。
 * 詳細は scripts/kawasaki-pdf-extract.py を参照。
 *
 * ## 安全装置
 * 想定と1つでも違えば書き込まずに exit 1 する。
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "kawasaki";
const MUNICIPALITY_NAME = "川崎市";
const SOURCE_NAME = "川崎市「認可保育所等の受入可能数及び利用調整結果」";
const INDEX_URL = "https://www.city.kawasaki.jp/450/page/0000030624.html";
/** ページ内の相対リンク（../cmsfiles/...）はここを基点にする。ドメイン直下につなぐと404になる */
const LINK_BASE = "https://www.city.kawasaki.jp/450/";

/** 行政区の順。公式ページのリンクの並びもこの順になっている */
const WARDS = ["川崎区", "幸区", "中原区", "高津区", "宮前区", "多摩区", "麻生区"];
const AGE_COUNT = 6;

const OUT_PATH = path.join(
  process.cwd(),
  "src",
  "lib",
  "vacancy",
  `${MUNICIPALITY_SLUG}.json`
);
const EXTRACTOR = path.join(process.cwd(), "scripts", "kawasaki-pdf-extract.py");

function fail(message: string): never {
  console.error(`\n[中断] ${message}`);
  process.exit(1);
}

function todayJst(): string {
  const now = new Date();
  const jst = new Date(now.getTime() + 9 * 60 * 60 * 1000);
  return jst.toISOString().slice(0, 10);
}

/** 令和8年 → 2026年 */
function reiwaToYear(reiwa: number): number {
  return 2018 + reiwa;
}

function stripTags(html: string): string {
  return html
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

type PdfRow = {
  name: string;
  ages: string[];
  type?: string;
  address?: string;
  capacity?: string;
  acceptAge?: string;
  area?: string;
};

type PdfResult = { pageCount: number; rows: PdfRow[]; notes: string[] };

/** 全角の英数字・記号を半角にする（PDFの凡例は「令和８年」のように混在する） */
function toHalfWidth(s: string): string {
  return s
    .replace(/[Ａ-Ｚａ-ｚ０-９]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xfee0))
    .replace(/：/g, ":")
    .replace(/（/g, "(")
    .replace(/）/g, ")")
    .replace(/、/g, "、");
}

/**
 * PDFの凡例から施設種別の略号を展開する表を作る。
 * 「●施設種別（保:認可保育所、こ:認定こども園、…）」
 * 略号のまま出すと利用者に伝わらないが、当サイトで名前を決めると推測になるため
 * かならずPDFに書かれている凡例から作る。
 */
function parseTypeLegend(notes: string[]): Map<string, string> {
  const line = notes.find((n) => n.includes("施設種別"));
  if (!line) fail("PDFに施設種別の凡例がありません。");
  const inner = toHalfWidth(line).match(/施設種別\s*\(([^)]*)\)/);
  if (!inner) fail(`施設種別の凡例を読めません: ${line}`);
  const map = new Map<string, string>();
  for (const part of inner[1].split(/[、,]/)) {
    const m = part.trim().match(/^(.+?)\s*:\s*(.+)$/);
    if (!m) continue;
    map.set(m[1].trim(), m[2].trim());
  }
  if (map.size === 0) fail(`施設種別の凡例から1件も読めません: ${line}`);
  return map;
}

/** 「●令和8年8月6日調査日時点」から基準日を読む。リンクテキストとの突き合わせに使う */
function parseSurveyDate(notes: string[]): { month: number; day: number } | null {
  const line = notes.find((n) => /調査日時点/.test(n));
  if (!line) return null;
  const m = toHalfWidth(line).match(/令和\d+年(\d+)月(\d+)日/);
  if (!m) return null;
  return { month: Number(m[1]), day: Number(m[2]) };
}

/** python / python3 のどちらで動くかは環境による */
function runPython(args: string[]): string {
  const candidates = process.env.PYTHON ? [process.env.PYTHON] : ["python3", "python"];
  let lastError = "";
  for (const bin of candidates) {
    try {
      return execFileSync(bin, args, {
        encoding: "utf-8",
        maxBuffer: 64 * 1024 * 1024,
      });
    } catch (err) {
      const e = err as { code?: string; stderr?: string; message?: string };
      // 実行ファイルが無いときだけ次の候補を試す。抽出そのものの失敗はそこで止める
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
  console.log(`${MUNICIPALITY_NAME}の保育所等の受入可能数を取り込みます`);
  console.log(`公式ページ: ${INDEX_URL}\n`);

  // --- 1. ページから最新の「受入可能数」セクションを見つける ---
  const res = await fetch(INDEX_URL, {
    headers: { "User-Agent": "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)" },
  });
  if (!res.ok) fail(`公式ページが ${res.status} を返しました`);
  const html = await res.text();

  const headings = [...html.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)].map((m) => ({
    text: stripTags(m[1]),
    end: (m.index ?? 0) + m[0].length,
  }));
  // ファイル名（R8_9... / kekka_...）ではなく見出しで判別する。
  // 「利用調整結果」の表と混ざらないようにするため
  const target = headings.find((h) => /受入可能数/.test(h.text));
  if (!target) {
    fail("「受入可能数」の見出しが見つかりません。ページの構成が変わった可能性があります。");
  }
  const nextHeading = headings.find((h) => h.end > target.end);
  const section = html.slice(target.end, nextHeading ? nextHeading.end : html.length);

  // 見出しから対象月を読む: 「令和8年9月 保育所等の受入可能数（予定）」
  const monthMatch = target.text.match(/令和(\d+)年(\d+)月/);
  if (!monthMatch) fail(`見出しから対象月を読めません: ${target.text}`);
  const targetYear = reiwaToYear(Number(monthMatch[1]));
  const targetMonth = Number(monthMatch[2]);

  const links = [...section.matchAll(/<a[^>]+href="([^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/gi)].map(
    (m) => ({
      url: LINK_BASE + m[1].replace(/^\.\.\//, ""),
      text: stripTags(m[2]),
    })
  );
  if (links.length !== WARDS.length) {
    fail(
      `PDFのリンクが${WARDS.length}本ではありません（${links.length}本）。区の構成が変わった可能性があります。`
    );
  }

  // リンクテキストは「川崎区（7月27日時点）(PDF, 111.12KB)」の形
  const targets = links.map((link) => {
    const ward = WARDS.find((w) => link.text.startsWith(w));
    if (!ward) fail(`リンクテキストから区を判別できません: ${link.text}`);
    const dateMatch = link.text.match(/(\d+)月(\d+)日時点/);
    if (!dateMatch) fail(`リンクテキストから基準日を読めません: ${link.text}`);
    const month = Number(dateMatch[1]);
    const day = Number(dateMatch[2]);
    // 基準日は対象月より前。1月の対象月に対して12月時点、という年またぎを吸収する
    const year = month > targetMonth ? targetYear - 1 : targetYear;
    const asOf = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return { ward, asOf, url: link.url };
  });

  const missing = WARDS.filter((w) => !targets.some((t) => t.ward === w));
  if (missing.length) fail(`リンクが見つからない区があります: ${missing.join("、")}`);

  console.log(`対象: ${targetYear}年${targetMonth}月入所ぶんの受入可能数`);
  targets.forEach((t) => console.log(`  ${t.ward}（${t.asOf}時点）`));

  // --- 2. PDFを取得して抽出する ---
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "kawasaki-vacancy-"));
  const files: { ward: string; asOf: string; file: string }[] = [];
  try {
    for (const [index, t] of targets.entries()) {
      const pdfRes = await fetch(t.url, {
        headers: { "User-Agent": "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)" },
      });
      if (!pdfRes.ok) fail(`PDFの取得に失敗しました（${pdfRes.status}）: ${t.url}`);
      const buf = Buffer.from(await pdfRes.arrayBuffer());
      if (buf.subarray(0, 4).toString("latin1") !== "%PDF") {
        fail(`PDFではないファイルが返りました: ${t.url}`);
      }
      // ファイル名は区名ではなく連番にする。
      // Windowsでは日本語のパスをPythonに渡すと文字化けして開けないことがある
      const file = path.join(tmpDir, `${index}.pdf`);
      fs.writeFileSync(file, buf);
      files.push({ ward: t.ward, asOf: t.asOf, file });
    }

    console.log("\nPDFから表を抽出します...");
    const raw = runPython([EXTRACTOR, ...files.map((f) => f.file)]);
    let extracted: Record<string, PdfResult>;
    try {
      extracted = JSON.parse(raw);
    } catch {
      fail(`抽出結果をJSONとして読めません: ${raw.slice(0, 200)}`);
    }

    // --- 3. 施設に組み立てる ---
    const categories: string[] = [];
    const facilities: {
      id: string;
      name: string;
      w: number;
      c: number | null;
      vacancy: (number | null)[];
    }[] = [];
    const seen = new Set<string>();
    let typeLegend: Map<string, string> | null = null;

    for (const { ward, asOf, file } of files) {
      const result = extracted[file];
      if (!result) fail(`${ward} の抽出結果がありません。`);
      if (result.rows.length === 0) fail(`${ward} から施設を1件も取れませんでした。`);

      // 施設種別の凡例は全区で同じはず。違っていたら気づけるように突き合わせる
      const legend = parseTypeLegend(result.notes ?? []);
      if (!typeLegend) {
        typeLegend = legend;
      } else {
        for (const [code, label] of legend) {
          const known = typeLegend.get(code);
          if (known && known !== label) {
            fail(`区によって施設種別の凡例が違います: ${code} が「${known}」と「${label}」`);
          }
          if (!known) typeLegend.set(code, label);
        }
      }

      // PDF本文の「令和8年8月6日調査日時点」とリンクテキストの日付が合うか確かめる。
      // リンクの張り替え漏れで古いPDFが並んでいても気づけるようにする
      const survey = parseSurveyDate(result.notes ?? []);
      if (survey) {
        const linkMonth = Number(asOf.slice(5, 7));
        const linkDay = Number(asOf.slice(8, 10));
        if (survey.month !== linkMonth || survey.day !== linkDay) {
          fail(
            `${ward}: ページのリンクは${linkMonth}月${linkDay}日時点ですが、` +
              `PDF本文には${survey.month}月${survey.day}日調査日時点とあります。`
          );
        }
      }

      for (const row of result.rows) {
        const name = row.name.trim();
        if (!name) continue;
        const id = `${ward}／${name}`;
        if (seen.has(id)) fail(`同じ区に同名の施設があります: ${id}`);
        seen.add(id);

        const vacancy = row.ages.map((cell, age) => {
          const s = toHalfWidth((cell ?? "").trim());
          // 空欄はそのクラスを設けていない（受入年齢が「1歳児～」の施設など）
          if (s === "" || s === "-" || s === "―" || s === "－") return null;
          // 0歳児は「3(0)」の形をとることがある。カッコ内は産休明け保育の受入人数で、
          // 3枠のうちの内訳。空き枠の数はカッコの外の数字なのでそちらを採る
          const withPostpartum = s.match(/^(\d+)\(\s*(\d+)\s*\)$/);
          if (withPostpartum) {
            if (age !== 0) {
              fail(`${id}: ${age}歳児にカッコ書きがあります（凡例では0歳児のみのはず）: ${cell}`);
            }
            return Number(withPostpartum[1]);
          }
          if (!/^\d+$/.test(s)) {
            fail(`${id} の${age}歳児が数値ではありません: ${JSON.stringify(cell)}`);
          }
          return Number(s);
        });
        if (vacancy.length !== AGE_COUNT) {
          fail(`${id} の年齢別の要素数が ${vacancy.length} です。`);
        }
        if (vacancy.every((v) => v === null)) {
          fail(`${id} は全年齢が空です。抽出がずれている可能性があります。`);
        }

        // 略号（保・小Ａなど）はPDFの凡例で正式名称に展開する。凡例にない略号は中断。
        // 事業所内保育には「事(20人)」「事(小B)」のように補足が付くことがあるので、
        // カッコ書きを落としてから引く（分類としては公式が付けた「事」に従う）
        const code = (row.type ?? "").replace(/[（(][^）)]*[）)]/g, "").trim();
        let category: string | null = null;
        if (code) {
          const label = typeLegend.get(code) ?? typeLegend.get(toHalfWidth(code));
          if (!label) {
            fail(`${id}: 施設種別「${code}」が凡例にありません（凡例: ${[...typeLegend.keys()].join("、")}）`);
          }
          category = label;
          if (!categories.includes(label)) categories.push(label);
        }

        facilities.push({
          id,
          name,
          w: WARDS.indexOf(ward),
          c: category ? categories.indexOf(category) : null,
          vacancy,
        });
      }
    }

    // --- 4. 前回との比較 ---
    let previous: { asOf?: string; facilities?: unknown[]; sourceFiles?: Record<string, string> } | null = null;
    if (fs.existsSync(OUT_PATH)) {
      try {
        previous = JSON.parse(fs.readFileSync(OUT_PATH, "utf-8"));
      } catch {
        previous = null;
      }
    }
    if (previous?.facilities) {
      const before = previous.facilities.length;
      if (facilities.length < before * 0.9) {
        fail(
          `施設数が大きく減っています（前回 ${before}件 → 今回 ${facilities.length}件）。抽出結果を確認してください。`
        );
      }
    }

    // 区ごとの基準日のうち最も古いものを、データセット全体の時点とする
    const asOf = targets.map((t) => t.asOf).sort()[0];
    // 自治体は基準日を変えずに資料を差し替えることがある。
    // 取り込み元の一式も同じときだけ、書き換えを見送る
    if (
      previous?.asOf === asOf &&
      JSON.stringify(previous?.sourceFiles ?? {}) === JSON.stringify(Object.fromEntries(targets.map((t) => [t.ward, t.url])))
    ) {
      console.log(`\n公式データの時点が前回と同じ（${asOf}）のため更新はありません。`);
      return;
    }

    // --- 5. 書き出し ---
    const wardDates = targets
      .map((t) => `${t.ward}${Number(t.asOf.slice(5, 7))}月${Number(t.asOf.slice(8, 10))}日`)
      .join("、");

    const dataset = {
      municipalitySlug: MUNICIPALITY_SLUG,
      municipalityName: MUNICIPALITY_NAME,
      asOf,
      fetchedAt: todayJst(),
      sourceName: SOURCE_NAME,
      sourceUrl: INDEX_URL,
      sourceFiles: Object.fromEntries(targets.map((t) => [t.ward, t.url])),
      metrics: ["vacancy"],
      subtitle: `${targetYear}年${targetMonth}月入所ぶんの受入可能数（予定）`,
      notes: [
        `川崎市が公開しているのは「${targetYear}年${targetMonth}月に入所できる枠の予定数」です。現時点の空き数ではありません。`,
        `基準日は区ごとに異なります（${wardDates}時点）。このページでは最も古い${asOf}を全体の時点として表示しています。`,
        "川崎市はこの数値をPDFで公開しています。当サイトは表をそのまま読み取って掲載しています。",
      ],
      wards: WARDS,
      categories,
      facilities,
    };

    const { facilities: _facilities, ...meta } = dataset;
    const metaJson = JSON.stringify(meta, null, 2);
    const head = metaJson.slice(0, metaJson.lastIndexOf("}")).trimEnd();
    const body = facilities.map((f) => `    ${JSON.stringify(f)}`).join(",\n");
    const out = `${head},\n  "facilities": [\n${body}\n  ]\n}\n`;

    try {
      JSON.parse(out);
    } catch (err) {
      fail(`生成したJSONが不正です: ${String(err)}`);
    }

    fs.mkdirSync(path.dirname(OUT_PATH), { recursive: true });
    fs.writeFileSync(OUT_PATH, out, "utf-8");

    // --- 6. サマリー ---
    const ageTotals = Array.from({ length: AGE_COUNT }, (_, age) =>
      facilities.reduce((acc, f) => acc + (f.vacancy[age] ?? 0), 0)
    );
    console.log(`\n書き出しました: ${path.relative(process.cwd(), OUT_PATH)}`);
    console.log(`  データ時点: ${asOf}（最も古い区の基準日）`);
    console.log(`  施設数: ${facilities.length}`);
    console.log(`  施設種別: ${categories.join("・")}`);
    console.log("");
    WARDS.forEach((w, i) => {
      const list = facilities.filter((f) => f.w === i);
      const sum = list.reduce(
        (acc, f) => acc + f.vacancy.reduce((s: number, v) => s + (v ?? 0), 0),
        0
      );
      console.log(`  ${w.padEnd(4, "　")} ${String(list.length).padStart(3)}施設 / 空き${sum}`);
    });
    console.log("");
    console.log("  年齢 | 空き枠");
    ageTotals.forEach((v, age) => console.log(`  ${age}歳児 | ${v}`));
    console.log(`  合計 | ${ageTotals.reduce((a, b) => a + b, 0)}`);
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

main().catch((err) => fail(String(err)));
