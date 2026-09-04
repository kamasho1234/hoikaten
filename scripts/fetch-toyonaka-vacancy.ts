/**
 * 豊中市の保育施設の欠員数を取り込む
 *
 * 実行: npm run vacancy:fetch:toyonaka
 *
 * ## この自治体の特徴
 * - 欠員は**人数（実数）**。「-」はその園にないクラス
 * - **年齢が右にいくほど小さくなる**（5歳・4歳・…・0歳）ので、読むときに向きを直す
 * - **家庭保育所とポピンズキッズルームは2クラスぶんをまとめた欠員数**を出している。
 *   セルが2列ぶんの幅になっているので、幅を見て切り分けて合計として持つ
 * - 種別の欄は縦書きで文字の順が崩れるため使わない
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "toyonaka";
const MUNICIPALITY_NAME = "豊中市";
const SOURCE_NAME = "豊中市「保育施設の欠員表（空き状況）」";
const INDEX_URL = "https://www.city.toyonaka.osaka.jp/kosodate/hoikusho/ketsuin.html";
const AGE_COUNT = 6;
const UA = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";

const COL_NAME = 1;
const COL_OLDEST = 2;

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const EXTRACTOR = path.join(process.cwd(), "scripts", "toyonaka-pdf-extract.py");

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

function squeeze(s: string): string {
  return (s ?? "").replace(/[\s　]/g, "");
}

function stripTags(html: string): string {
  return html.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").replace(/[\s　]+/g, " ").trim();
}

type PdfRow = { values: string[]; widths: (number | null)[] };
type PdfResult = { asOf: [number, number, number]; rows: PdfRow[] };

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
  console.log(`${MUNICIPALITY_NAME}の欠員数を取り込みます`);
  console.log(`公式ページ: ${INDEX_URL}\n`);

  const res = await fetch(INDEX_URL, { headers: { "User-Agent": UA } });
  if (!res.ok) fail(`公式ページが ${res.status} を返しました`);
  const html = await res.text();

  // 「保育施設の欠員表（空き状況）（令和8年7月24日時点）（PDF：671KB）」
  const links = [...html.matchAll(/<a[^>]+href="([^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => ({ url: new URL(m[1], INDEX_URL).toString(), text: toHalfWidth(stripTags(m[2])) }))
    .map((l) => {
      const m = l.text.match(/保育施設の欠員表（空き状況）（令和(\d+)年(\d+)月(\d+)日時点）/);
      if (!m) return null;
      const year = reiwaToYear(Number(m[1]));
      return {
        ...l,
        year,
        month: Number(m[2]),
        day: Number(m[3]),
        sortKey: year * 10000 + Number(m[2]) * 100 + Number(m[3]),
      };
    })
    .filter((v): v is NonNullable<typeof v> => v !== null);
  if (links.length === 0) fail("欠員表のPDFが見つかりません。ページの構成が変わった可能性があります。");
  const latest = links.reduce((a, b) => (b.sortKey > a.sortKey ? b : a));
  console.log(`最新: ${latest.text}\n  ${latest.url}`);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "toyonaka-vacancy-"));
  try {
    const r = await fetch(latest.url, { headers: { "User-Agent": UA } });
    if (!r.ok) fail(`PDFの取得に失敗しました（${r.status}）: ${latest.url}`);
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.subarray(0, 4).toString() !== "%PDF") fail(`PDFではありません: ${latest.url}`);
    const file = path.join(tmpDir, "toyonaka.pdf");
    fs.writeFileSync(file, buf);

    let pdf: PdfResult;
    try {
      pdf = JSON.parse(runPython([EXTRACTOR, file])) as PdfResult;
    } catch (err) {
      fail(`抽出結果を読めません: ${String(err)}`);
    }

    const [ry, am, ad] = pdf.asOf;
    if (reiwaToYear(ry) !== latest.year || am !== latest.month || ad !== latest.day) {
      fail(
        `PDFの表題（令和${ry}年${am}月${ad}日）がリンクの文言（${latest.year}年${latest.month}月${latest.day}日）と違います`
      );
    }
    const asOf = `${latest.year}-${String(latest.month).padStart(2, "0")}-${String(latest.day).padStart(2, "0")}`;
    console.log(`基準日: ${asOf}`);

    const facilities: {
      id: string;
      name: string;
      w: null;
      c: null;
      vacancy: (number | null)[];
      vacancyTotal?: number;
    }[] = [];
    const seen = new Set<string>();
    let total = 0;
    let mergedFacilities = 0;
    // 通常のセル1つぶんの幅。いちばん多く出てくる幅を基準にする
    const widthCount = new Map<number, number>();
    for (const row of pdf.rows) {
      for (const w of row.widths.slice(COL_OLDEST)) {
        if (w) widthCount.set(w, (widthCount.get(w) ?? 0) + 1);
      }
    }
    const unitWidth = [...widthCount.entries()].sort((a, b) => b[1] - a[1])[0]?.[0];
    if (!unitWidth) fail("セルの幅を読み取れませんでした");

    for (const row of pdf.rows) {
      const values = row.values;
      if (values.length < COL_OLDEST + AGE_COUNT) continue;
      const name = squeeze(values[COL_NAME]);
      if (!name || name === "施設名" || name === "保育施設") continue;
      // 見出しの行（5歳〜0歳）
      if (toHalfWidth(squeeze(values[COL_OLDEST])) === "5歳") {
        for (let i = 0; i < AGE_COUNT; i++) {
          if (toHalfWidth(squeeze(values[COL_OLDEST + i] ?? "")) !== `${5 - i}歳`) {
            fail(`年齢の並びが変わりました: ${values.slice(COL_OLDEST, COL_OLDEST + AGE_COUNT).join(" ")}`);
          }
        }
        continue;
      }
      if (seen.has(name)) fail(`施設名が重複しています: ${name}`);
      seen.add(name);

      // 5歳から並んでいるので、読みながら向きを直す
      const vacancy: (number | null)[] = new Array(AGE_COUNT).fill(null);
      let mergedValue: number | null = null;
      for (let i = 0; i < AGE_COUNT; i++) {
        const raw = toHalfWidth(squeeze(values[COL_OLDEST + i] ?? ""));
        const width = row.widths[COL_OLDEST + i];
        const age = 5 - i;
        if (raw === "" || raw === "-" || raw === "‐" || raw === "－" || raw === "ー") continue;
        if (!/^\d+$/.test(raw)) fail(`${name}: 人数として読めません: 「${values[COL_OLDEST + i]}」`);
        const value = Number(raw);
        if (width && width > unitWidth * 1.5) {
          // 2クラスぶんをまとめた欠員数。年齢別には割り振れない
          if (mergedValue !== null) fail(`${name}: まとめた欠員数が2つあります`);
          mergedValue = value;
          continue;
        }
        vacancy[age] = value;
      }

      if (mergedValue !== null) {
        if (vacancy.some((v) => v !== null)) {
          fail(`${name}: まとめた欠員数と年齢別の欠員数が混ざっています`);
        }
        mergedFacilities += 1;
        total += mergedValue;
        facilities.push({
          id: name,
          name,
          w: null,
          c: null,
          vacancy: new Array(AGE_COUNT).fill(null),
          vacancyTotal: mergedValue,
        });
        continue;
      }

      if (vacancy.every((v) => v === null)) fail(`${name}: 全てのクラスが空です`);
      total += vacancy.reduce((acc: number, v) => acc + (v ?? 0), 0);
      facilities.push({ id: name, name, w: null, c: null, vacancy });
    }

    if (facilities.length < 100) fail(`施設が${facilities.length}件しか取れていません`);

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
      metrics: ["vacancy"],
      subtitle: "保育施設の欠員数",
      notes: [
        "欠員数は変わることがあります。希望する施設の欠員が0でも、希望施設として利用調整申込書に書くことをおすすめします、と豊中市は案内しています。",
        "欠員のある施設への入所を保証するものではありません。",
        "その園にないクラスは「—」にしています。",
        "家庭保育所は0歳児クラスと1歳児クラス、ポピンズキッズルームは1歳児クラスと2歳児クラスをまとめた欠員数が出ています。年齢別に分けられないため、施設全体の数として載せています。",
      ],
      wards: [],
      categories: [],
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
    console.log(`  ${facilities.length}施設 / 欠員の合計 ${total}`);
    if (mergedFacilities > 0) {
      console.log(`  2クラスぶんをまとめて出している施設: ${mergedFacilities}件`);
    }
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

main().catch((err) => fail(String(err)));
