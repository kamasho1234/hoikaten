/**
 * 品川区の保育園・小規模保育事業等の入園可能数（予定）を取り込む
 *
 * 実行: npm run vacancy:fetch:shinagawa
 *
 * ## この自治体の特徴
 * - **PDFが2本**。保育園（0〜5歳）と小規模保育事業等（0〜2歳）でファイルが分かれている
 * - **認定こども園には「伊藤（短時間）」という行が続く**。同じ園の短時間認定枠で
 *   入園可能数が別に立つので、名前ごと別の施設として持つ
 * - **区立・私立のセクション見出し**（●区立保育園／●私立保育園）で施設類型を決める
 * - **合計行がある**（区 立 小 計／合 計）ので、積み上げと突き合わせて検算できる
 * - 地区で分けていないので wards は空。`-` は対象年齢外
 *
 * ## 対象外
 * 「空きスペース利用型年間保育事業」は通常の入園枠ではない（1施設のみの別事業）ため
 * 取り込まず、注記でその存在にだけ触れる。
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "shinagawa";
const MUNICIPALITY_NAME = "品川区";
const SOURCE_NAME = "品川区「保育園・小規模保育事業等入園可能数（予定）」";
const INDEX_URL =
  "https://www.city.shinagawa.tokyo.jp/PC/kodomo/kodomo-hoyou/kodomo-hoyou-hoikuen/201811191366.html";
const AGE_COUNT = 6;
const MIN_FACILITY_RATIO = 0.9;

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const RESEARCH_PATH = path.join(
  process.cwd(),
  "scripts",
  "vacancy-research",
  MUNICIPALITY_SLUG,
  "facilities_from_pdf.json"
);
const EXTRACTOR = path.join(process.cwd(), "scripts", "shinagawa-pdf-extract.py");

function fail(message: string): never {
  console.error(`\n[中断] ${message}`);
  process.exit(1);
}

function todayJst(): string {
  const now = new Date();
  const jst = new Date(now.getTime() + 9 * 60 * 60 * 1000);
  return jst.toISOString().slice(0, 10);
}

function reiwaToYear(reiwa: number): number {
  return 2018 + reiwa;
}

function stripTags(html: string): string {
  return html.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();
}

function toHalfWidth(s: string): string {
  return s.replace(/[０-９]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xfee0));
}

type PdfTable = {
  kind: string;
  section: string;
  columns: { name: number; ages: number[] };
  rows: string[][];
};
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

/** 「-」は対象年齢外、数字は入園可能数 */
function parseValue(v: string, where: string): number | null {
  const t = toHalfWidth((v ?? "").replace(/\s/g, "").replace(/[－ー]/g, "-")).replace(/,/g, "");
  if (t === "" || t === "-") return null;
  if (/^\d+$/.test(t)) return Number(t);
  fail(`${where}: 入園可能数として読めません: 「${v}」`);
}

/** 合計行かどうか。「区 立 小 計」のように空白が入る */
function isTotalRow(name: string): boolean {
  return /^(区立小計|私立小計|合計|小計|総計)$/.test(name.replace(/\s/g, ""));
}

/** セクション見出しから施設類型を決める */
function categoryOf(section: string, kind: string, where: string): string {
  const s = section.replace(/[●（）\s]/g, "");
  if (kind === "小規模保育事業等") {
    if (s.includes("家庭的保育")) return "家庭的保育事業";
    if (s.includes("小規模保育")) return "小規模保育事業";
    fail(`${where}: 小規模側のセクションを判別できません: 「${section}」`);
  }
  if (s.includes("区立")) return "区立保育園";
  if (s.includes("私立")) return "私立保育園";
  fail(`${where}: 保育園のセクションを判別できません: 「${section}」`);
}

async function main() {
  console.log(`${MUNICIPALITY_NAME}の入園可能数（予定）を取り込みます`);
  console.log(`公式ページ: ${INDEX_URL}\n`);

  const ua = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";
  const res = await fetch(INDEX_URL, { headers: { "User-Agent": ua } });
  if (!res.ok) fail(`公式ページが ${res.status} を返しました`);
  const html = await res.text();

  // 「令和8年9月保育園入園可能数（予定）(PDF : 97KB)」のように月がリンク文言に入る
  const links = [...html.matchAll(/<a[^>]+href="([^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => ({
      url: new URL(m[1], INDEX_URL).toString(),
      text: toHalfWidth(stripTags(m[2])),
    }))
    .map((l) => {
      const m = l.text.match(/令和(\d+)年(\d+)月(.*?)(?:入園|利用)可能数/);
      if (!m) return null;
      const year = reiwaToYear(Number(m[1]));
      const month = Number(m[2]);
      const label = m[3];
      // 空きスペース利用型は通常の入園枠ではないので取り込まない
      if (/空きスペース/.test(l.text)) return null;
      const kind = /小規模/.test(label) ? "small" : "nursery";
      return { ...l, year, month, kind, sortKey: year * 100 + month };
    })
    .filter((v): v is NonNullable<typeof v> => v !== null);
  if (links.length === 0) fail("入園可能数のPDFリンクが見つかりません。ページの構成が変わった可能性があります。");

  const latestKey = Math.max(...links.map((l) => l.sortKey));
  const nursery = links.find((l) => l.sortKey === latestKey && l.kind === "nursery");
  const small = links.find((l) => l.sortKey === latestKey && l.kind === "small");
  if (!nursery) fail("保育園の入園可能数PDFが見つかりません。");
  if (!small) fail("小規模保育事業等の入園可能数PDFが見つかりません。");
  console.log(`最新: ${nursery.text}\n  ${nursery.url}`);
  console.log(`      ${small.text}\n  ${small.url}`);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "shinagawa-vacancy-"));
  try {
    const files: string[] = [];
    for (const [name, link] of [
      ["nursery.pdf", nursery],
      ["small.pdf", small],
    ] as const) {
      const r = await fetch(link.url, { headers: { "User-Agent": ua } });
      if (!r.ok) fail(`PDFの取得に失敗しました（${r.status}）: ${link.url}`);
      const buf = Buffer.from(await r.arrayBuffer());
      if (buf.subarray(0, 4).toString() !== "%PDF") fail(`PDFではありません: ${link.url}`);
      const file = path.join(tmpDir, name);
      fs.writeFileSync(file, buf);
      files.push(file);
    }

    const raw = runPython([EXTRACTOR, ...files]);
    let pdf: PdfResult;
    try {
      pdf = JSON.parse(raw) as PdfResult;
    } catch (err) {
      fail(`抽出結果を読めません: ${String(err)}`);
    }

    if (pdf.asOf.length !== 1) fail(`PDFに基準日が${pdf.asOf.length}種類あります: ${JSON.stringify(pdf.asOf)}`);
    const [ay, am, ad] = pdf.asOf[0];
    const asOf = `${reiwaToYear(ay)}-${String(am).padStart(2, "0")}-${String(ad).padStart(2, "0")}`;
    if (pdf.target.length !== 1) fail(`PDFに対象月が${pdf.target.length}種類あります`);
    const [ty, tm] = pdf.target[0];
    if (reiwaToYear(ty) !== nursery.year || tm !== nursery.month) {
      fail(`PDFの対象月（${reiwaToYear(ty)}年${tm}月）がリンクの文言（${nursery.year}年${nursery.month}月）と違います。`);
    }
    console.log(`基準日: ${asOf} / 対象: ${reiwaToYear(ty)}年${tm}月入園`);

    const categories: string[] = [];
    const facilities: { id: string; name: string; w: null; c: number; vacancy: (number | null)[] }[] =
      [];
    const research: { id: string; name: string; category: string; note: string }[] = [];
    const seen = new Set<string>();
    // 合計行との突き合わせ用。セクションごとに積み上げる
    const built = new Map<string, number[]>();
    const declared = new Map<string, number[]>();

    for (const t of pdf.tables) {
      const ages = t.columns.ages;
      // **私立はページをまたいで「●私立保育園」「●私立保育園（続き）」に分かれる**。
      // 小計はページ横断の合計なので、「（続き）」を落として同じキーに積む
      const sectionKey = t.section.replace(/[（(]続き[)）]/g, "");
      for (const row of t.rows) {
        // **保育園の表では合計行のラベルが施設名の列ではなく先頭（番号の列）に入る**。
        // 施設名が空でも、先頭セルが「区 立 小 計」なら合計行として扱う
        const name = (row[t.columns.name] ?? "").trim();
        const lead = (row[0] ?? "").trim();
        const label = name || lead;
        if (!label) continue;
        const values = ages.map((i) => parseValue(row[i] ?? "", `${t.section} ${label}`));

        if (isTotalRow(label)) {
          // 保育園PDFの「合 計」は区立＋私立の総合計、小規模PDFの「合 計」は表ごとの小計
          const isWhole =
            t.kind === "認可保育園・認定こども園" && /^(合計|総計)$/.test(label.replace(/\s/g, ""));
          const key = isWhole ? `${t.kind}:全体` : `${t.kind}:${sectionKey}`;
          declared.set(key, values.map((v) => v ?? 0));
          continue;
        }
        if (!name) continue; // 施設名のない行（注記など）

        const category = categoryOf(t.section, t.kind, name);
        if (!categories.includes(category)) categories.push(category);
        const vacancy: (number | null)[] =
          values.length === AGE_COUNT
            ? values
            : [...values, ...new Array(AGE_COUNT - values.length).fill(null)];

        const id = name;
        if (seen.has(id)) fail(`施設名が重複しています: ${id}`);
        seen.add(id);
        facilities.push({ id, name, w: null, c: categories.indexOf(category), vacancy });
        research.push({ id, name, category, note: t.section });

        const key = `${t.kind}:${sectionKey}`;
        const acc = built.get(key) ?? new Array(values.length).fill(0);
        values.forEach((v, i) => {
          acc[i] += v ?? 0;
        });
        built.set(key, acc);
      }
    }

    if (facilities.length === 0) fail("施設が1件も取れていません。");

    // --- 合計行との突き合わせ ---
    let checked = 0;
    for (const [key, want] of declared) {
      if (key.endsWith(":全体")) continue; // 全体はセクション横断なので個別に見る
      const got = built.get(key);
      if (!got) fail(`${key}: 合計行はあるのに施設が1件もありません`);
      if (got.length !== want.length || got.some((v, i) => v !== want[i])) {
        fail(`${key}: 積み上げ [${got}] が合計行 [${want}] と一致しません`);
      }
      checked++;
    }
    // 保育園の「合 計」は区立＋私立
    const nurseryTotal = declared.get("認可保育園・認定こども園:全体");
    if (nurseryTotal) {
      const sum = new Array(nurseryTotal.length).fill(0);
      for (const [key, v] of built) {
        if (!key.startsWith("認可保育園・認定こども園")) continue;
        v.forEach((x, i) => {
          sum[i] += x;
        });
      }
      if (sum.some((v, i) => v !== nurseryTotal[i])) {
        fail(`保育園の合計行が一致しません: 積み上げ [${sum}] ≠ 合計行 [${nurseryTotal}]`);
      }
      checked++;
    }
    console.log(`合計行との突き合わせ: ${checked}件すべて一致`);

    console.log(`施設 ${facilities.length}件 / 区分 ${categories.join("・")}`);

    let previous: { asOf?: string; facilities?: unknown[]; sourceFiles?: Record<string, string> } | null = null;
    if (fs.existsSync(OUT_PATH)) {
      previous = JSON.parse(fs.readFileSync(OUT_PATH, "utf-8"));
      const before = previous?.facilities?.length ?? 0;
      if (before > 0 && facilities.length < before * MIN_FACILITY_RATIO) {
        fail(`施設数が前回（${before}件）の${MIN_FACILITY_RATIO * 100}%を下回りました（${facilities.length}件）。`);
      }
      // 自治体は基準日を変えずに資料を差し替えることがある。
      // 取り込み元の一式も同じときだけ、書き換えを見送る
      if (
        previous?.asOf === asOf &&
        JSON.stringify(previous?.sourceFiles ?? {}) === JSON.stringify({ 保育園: nursery.url, 小規模保育事業等: small.url }) &&
        JSON.stringify(previous?.facilities ?? null) === JSON.stringify(facilities)
      ) {
        console.log(`\n基準日が前回と同じ（${asOf}）なので書き換えません。`);
        return;
      }
    }

    const dataset = {
      municipalitySlug: MUNICIPALITY_SLUG,
      municipalityName: MUNICIPALITY_NAME,
      asOf,
      fetchedAt: todayJst(),
      sourceName: SOURCE_NAME,
      sourceUrl: INDEX_URL,
      sourceFiles: { 保育園: nursery.url, 小規模保育事業等: small.url },
      metrics: ["vacancy"],
      subtitle: `${reiwaToYear(ty)}年${tm}月入園ぶんの入園可能数（予定）`,
      notes: [
        `品川区が公開しているのは「${reiwaToYear(ty)}年${tm}月に入園できる枠の予定数」です。現時点の空き数ではありません。`,
        "入園可能数は退園等により変動します。0でも空きが出る場合があり、0の園も希望できます。",
        "クラス年齢は年度初め（4月1日）現在の満年齢です。「—」は対象年齢外で利用希望できません。",
        "「（短時間）」は認定こども園の短時間認定枠で、同じ園でも枠が別に立ちます。",
        "全クラスが「—」の園は、閉園予定や一時的な募集停止などで新規の受け入れをしていない園です。理由は出典のPDFの注記をご確認ください。",
        "このほかに「空きスペース利用型年間保育事業」の枠が別途公開されています（当サイトには未掲載）。",
        "品川区はこの数値をPDFで公開しています。当サイトは表をそのまま読み取って掲載しています。",
      ],
      wards: [],
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
    fs.mkdirSync(path.dirname(RESEARCH_PATH), { recursive: true });
    fs.writeFileSync(
      RESEARCH_PATH,
      `${JSON.stringify({ asOf, sourceUrl: nursery.url, facilities: research }, null, 1)}\n`,
      "utf-8"
    );

    const ageTotals = Array.from({ length: AGE_COUNT }, (_, age) =>
      facilities.reduce((a, f) => a + (f.vacancy[age] ?? 0), 0)
    );
    console.log(`\n書き出しました: ${path.relative(process.cwd(), OUT_PATH)}`);
    console.log(`  データ時点: ${asOf}`);
    console.log("");
    categories.forEach((c, i) => {
      const list = facilities.filter((f) => f.c === i);
      const sum = list.reduce((a, f) => a + f.vacancy.reduce((s: number, v) => s + (v ?? 0), 0), 0);
      console.log(`  ${c.padEnd(14, "　")} ${String(list.length).padStart(3)}施設 / 可能数${sum}`);
    });
    console.log("");
    console.log("  年齢 | 入園可能数");
    ageTotals.forEach((v, age) => console.log(`  ${age}歳児 | ${v}`));
    console.log(`  合計 | ${ageTotals.reduce((a, b) => a + b, 0)}`);
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

main().catch((err) => fail(String(err)));
