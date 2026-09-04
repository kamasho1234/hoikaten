/**
 * 足立区の保育施設の募集人数（例月入所分）を取り込む
 *
 * 実行: npm run vacancy:fetch:adachi
 *
 * ## 他の自治体との違い
 * - **PDFが3本**（認可保育所等・家庭的保育（保育ママ）・私立認定こども園）で、3本とも表の作りが違う
 * - **地区（6地域）がある**。ただし私立認定こども園のPDFには地区が載っていないので、
 *   その3施設だけ地区なしになる（目黒区で施設類型が公表されていない施設があるのと同じ扱い）
 * - 数値の意味は「翌月入所ぶんの募集人数」。川崎市・大田区と同じく現時点の空きではない
 *
 * ## 安全装置
 * 想定と1つでも違えば書き込まずに exit 1 する。
 * 3本のPDFの対象月がリンクの文言と食い違っていたら中断する（張り替え漏れの検知）。
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "adachi";
const MUNICIPALITY_NAME = "足立区";
const SOURCE_NAME = "足立区「保育施設募集人数（例月入所分）」";
const INDEX_URL = "https://www.city.adachi.tokyo.jp/kodomo-unei/bosyuuninnzuu.html";
const ORIGIN = "https://www.city.adachi.tokyo.jp";
const AGE_COUNT = 6;
const MIN_FACILITY_RATIO = 0.9;

/**
 * 3本のPDFを、リンクの文言で見分ける。
 * 認可等のリンクにも「区立認定こども園」が入っているので、
 * 私立認定こども園のPDFは「私立認定こども園」で厳密に見分ける
 */
const PDF_KINDS = [
  { key: "認可等", pattern: /認可保育所/ },
  { key: "保育ママ", pattern: /家庭的保育/ },
  { key: "認定こども園", pattern: /私立認定こども園/ },
] as const;

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
/** 保育ママの所在地は空き状況には出さないが、施設リンクを調べるときに使うので別に残す */
const RESEARCH_PATH = path.join(
  process.cwd(),
  "scripts",
  "vacancy-research",
  MUNICIPALITY_SLUG,
  "facilities_from_pdf.json"
);
const EXTRACTOR = path.join(process.cwd(), "scripts", "adachi-pdf-extract.py");

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
  return html
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** 全角数字を半角にする（リンクの文言は「令和8年９月」のように混在する） */
function toHalfWidth(s: string): string {
  return s.replace(/[０-９]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xfee0));
}

type PdfRow = {
  kind: string;
  ward: string;
  category: string;
  name: string;
  address?: string;
  ages: (number | null)[];
};
type PdfResult = {
  wards: string[];
  asOf: number[][];
  targets: Record<string, number[][]>;
  rows: PdfRow[];
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

/** 施設名の末尾にある定員「(70)」を切り離す */
function splitCapacity(name: string): { name: string; capacity: number | null } {
  const m = name.match(/^(.*?)[(（](\d+)[)）]\s*$/);
  if (!m) return { name, capacity: null };
  return { name: m[1].trim(), capacity: Number(m[2]) };
}

async function main() {
  console.log(`${MUNICIPALITY_NAME}の保育施設の募集人数を取り込みます`);
  console.log(`公式ページ: ${INDEX_URL}\n`);

  // --- 1. ページから3本のPDFリンクを見つける ---
  const res = await fetch(INDEX_URL, {
    headers: { "User-Agent": "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)" },
  });
  if (!res.ok) fail(`公式ページが ${res.status} を返しました`);
  const html = await res.text();

  const links = [...html.matchAll(/<a[^>]+href="([^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/gi)].map((m) => ({
    url: m[1].startsWith("http") ? m[1] : ORIGIN + (m[1].startsWith("/") ? m[1] : `/${m[1]}`),
    text: toHalfWidth(stripTags(m[2])),
  }));

  const targets: { key: string; url: string; text: string; year: number; month: number }[] = [];
  for (const kind of PDF_KINDS) {
    // 同じ種別のリンクが複数月ぶん並ぶので、対象月が最も新しいものを採る
    const cands = links
      .map((l) => {
        const m = l.text.match(/令和(\d+)年\s*(\d+)月/);
        if (!m || !kind.pattern.test(l.text)) return null;
        const year = reiwaToYear(Number(m[1]));
        const month = Number(m[2]);
        return { ...l, key: kind.key, year, month, sortKey: year * 100 + month };
      })
      .filter((v): v is NonNullable<typeof v> => v !== null);
    if (cands.length === 0) fail(`「${kind.key}」のPDFリンクが見つかりません。ページの構成が変わった可能性があります。`);
    const latest = cands.reduce((a, b) => (b.sortKey > a.sortKey ? b : a));
    targets.push(latest);
    console.log(`  ${kind.key}: ${latest.text}\n    ${latest.url}`);
  }
  const months = [...new Set(targets.map((t) => `${t.year}-${t.month}`))];
  if (months.length !== 1) {
    fail(`3本のPDFの対象月がそろっていません: ${months.join(" / ")}`);
  }
  const targetYear = targets[0].year;
  const targetMonth = targets[0].month;

  // --- 2. PDFを一時ディレクトリに落とす ---
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "adachi-vacancy-"));
  try {
    const files: string[] = [];
    for (const [i, t] of targets.entries()) {
      const r = await fetch(t.url, {
        headers: { "User-Agent": "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)" },
      });
      if (!r.ok) fail(`PDFの取得に失敗しました（${r.status}）: ${t.url}`);
      const buf = Buffer.from(await r.arrayBuffer());
      if (buf.subarray(0, 4).toString() !== "%PDF") fail(`PDFではありません: ${t.url}`);
      const file = path.join(tmpDir, `${i}.pdf`);
      fs.writeFileSync(file, buf);
      files.push(file);
    }

    // --- 3. pdfplumberで表を抜く ---
    const raw = runPython([EXTRACTOR, ...files]);
    let pdf: PdfResult;
    try {
      pdf = JSON.parse(raw) as PdfResult;
    } catch (err) {
      fail(`抽出結果を読めません: ${String(err)}`);
    }

    // --- 4. 基準日と対象月の照合 ---
    if (pdf.asOf.length !== 1) {
      fail(`PDFに基準日が${pdf.asOf.length}種類あります: ${JSON.stringify(pdf.asOf)}`);
    }
    const [ay, am, ad] = pdf.asOf[0];
    const asOf = `${ay}-${String(am).padStart(2, "0")}-${String(ad).padStart(2, "0")}`;
    for (const [key, list] of Object.entries(pdf.targets)) {
      if (list.length !== 1) fail(`「${key}」のPDFに対象月が${list.length}種類あります`);
      const [ty, tm] = list[0];
      if (reiwaToYear(ty) !== targetYear || tm !== targetMonth) {
        fail(
          `「${key}」のPDFの対象月（${reiwaToYear(ty)}年${tm}月）がリンクの文言（${targetYear}年${targetMonth}月）と違います。`
        );
      }
    }
    console.log(`\n基準日: ${asOf} / 対象: ${targetYear}年${targetMonth}月入所の募集`);

    // --- 5. 施設に組み立てる ---
    const wards = pdf.wards;
    if (wards.length === 0) fail("地区が1つも取れていません。");
    const categories: string[] = [];
    const seen = new Map<string, number>();
    const facilities: {
      id: string;
      name: string;
      w: number | null;
      c: number;
      vacancy: (number | null)[];
    }[] = [];
    const research: { id: string; name: string; ward: string; category: string; capacity: number | null; address: string }[] = [];

    const closed: string[] = [];
    for (const r of pdf.rows) {
      if (!r.name) fail(`施設名が空の行があります: ${JSON.stringify(r)}`);
      if (r.ages.length !== AGE_COUNT) fail(`${r.name}: 年齢の要素数が${r.ages.length}です`);
      // 全年齢が「募集なし」の行。休業中の保育ママ（出典では「※」）だけは想定内なので落とす。
      // それ以外で全年齢が空なら取り込みミスを疑う
      if (r.ages.every((v) => v === null)) {
        if (/【休業】/.test(r.name)) {
          closed.push(r.name);
          continue;
        }
        fail(`${r.name}: 全年齢が募集なしです。取り込みミスの可能性があります`);
      }
      if (!categories.includes(r.category)) categories.push(r.category);
      const { name, capacity } = splitCapacity(r.name);
      // 施設名は区内で重複しうるので、重複したら連番を足して一意にする
      const base = name || r.name;
      const n = (seen.get(base) ?? 0) + 1;
      seen.set(base, n);
      const id = n === 1 ? base : `${base}_${n}`;
      let w: number | null = null;
      if (r.ward) {
        w = wards.indexOf(r.ward);
        if (w < 0) fail(`${name}: 地区「${r.ward}」が一覧にありません`);
      }
      facilities.push({ id, name: base, w, c: categories.indexOf(r.category), vacancy: r.ages });
      research.push({ id, name: base, ward: r.ward, category: r.category, capacity, address: r.address ?? "" });
    }

    // --- 6. 検算 ---
    if (facilities.length === 0) fail("施設が1件も取れていません。");
    const byKind: Record<string, number> = {};
    pdf.rows.forEach((r) => (byKind[r.kind] = (byKind[r.kind] ?? 0) + 1));
    console.log(`施設 ${facilities.length}件（${Object.entries(byKind).map(([k, v]) => `${k}${v}`).join(" / ")}）`);
    const noWard = facilities.filter((f) => f.w === null).length;
    if (noWard > 0) console.log(`  地区が公表されていない施設: ${noWard}件（私立認定こども園）`);
    if (closed.length) console.log(`  休業中のため除いた施設: ${closed.length}件（${closed.join("・")}）`);

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
        JSON.stringify(previous?.sourceFiles ?? {}) === JSON.stringify(Object.fromEntries(targets.map((t) => [t.key, t.url])))
      ) {
        console.log(`\n基準日が前回と同じ（${asOf}）なので書き換えません。`);
        return;
      }
    }

    // --- 7. 書き出し ---
    const dataset = {
      municipalitySlug: MUNICIPALITY_SLUG,
      municipalityName: MUNICIPALITY_NAME,
      asOf,
      fetchedAt: todayJst(),
      sourceName: SOURCE_NAME,
      sourceUrl: INDEX_URL,
      sourceFiles: Object.fromEntries(targets.map((t) => [t.key, t.url])),
      metrics: ["vacancy"],
      subtitle: `${targetYear}年${targetMonth}月入所ぶんの募集人数`,
      notes: [
        `足立区が公開しているのは「${targetYear}年${targetMonth}月に入所できる枠の募集人数」です。現時点の空き数ではありません。`,
        "「—」はその年齢の募集をしていないことを示します（出典では「－」「----」）。0は募集人数が0であることを示します。",
        "募集人数が0でも申し込みはできます（公表後に空きが出ることがあります）。",
        "施設の区分（私立・公民・区立・区立こ・小規模）は出典の表記のままです。出典に凡例はありません。",
        "私立認定こども園は出典に地区の記載がないため、地区別の表からは除いています。",
        "休業中で募集を行っていない施設は掲載していません。",
        "足立区はこの数値をPDFで公開しています。当サイトは表をそのまま読み取って掲載しています。",
      ],
      wards,
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
      `${JSON.stringify({ asOf, sourceFiles: Object.fromEntries(targets.map((t) => [t.key, t.url])), facilities: research }, null, 1)}\n`,
      "utf-8"
    );

    // --- 8. サマリー ---
    const ageTotals = Array.from({ length: AGE_COUNT }, (_, age) =>
      facilities.reduce((acc, f) => acc + (f.vacancy[age] ?? 0), 0)
    );
    console.log(`\n書き出しました: ${path.relative(process.cwd(), OUT_PATH)}`);
    console.log(`  施設の詳細: ${path.relative(process.cwd(), RESEARCH_PATH)}`);
    console.log(`  データ時点: ${asOf}`);
    console.log(`  施設数: ${facilities.length}`);
    console.log(`  区分: ${categories.join("・")}`);
    console.log("");
    wards.forEach((w, i) => {
      const list = facilities.filter((f) => f.w === i);
      const sum = list.reduce((acc, f) => acc + f.vacancy.reduce((s: number, v) => s + (v ?? 0), 0), 0);
      console.log(`  ${w.padEnd(20, "　")} ${String(list.length).padStart(3)}施設 / 募集${sum}`);
    });
    console.log("");
    console.log("  年齢 | 募集人数");
    ageTotals.forEach((v, age) => console.log(`  ${age}歳児 | ${v}`));
    console.log(`  合計 | ${ageTotals.reduce((a, b) => a + b, 0)}`);
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

main().catch((err) => fail(String(err)));
