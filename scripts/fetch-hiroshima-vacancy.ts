/**
 * 広島市の保育施設の空き状況を取り込む
 *
 * 実行: npm run vacancy:fetch:hiroshima
 *
 * ## この自治体の特徴
 * - **入園可能人数と待機者数の両方を実数で公開している**（横浜市・北区などと同じ）
 * - **区ごとにPDFが分かれていて、区ごとにレイアウトも違う**（詳しくは hiroshima-pdf-extract.py）
 * - **基準日が区ごとに違うことがある**（多くは8月1日だが南区は8月3日）。
 *   データセットの基準日はいちばん古い日にし、区ごとの違いを注記に出す
 * - 「10以上」のような幅の表記、「2※1」のような注記つきの数値が混じる。
 *   数はそのまま採り、もとの書き方を注記に出す
 * - **複数の学年をまとめて公表している施設がある**（南区の楠那保育園の1〜2歳児など）。
 *   セルの位置がずれて誤読しかねないので、**その施設は年齢別を載せず注記に回す**
 * - 空欄と「━」はそのクラスの受け入れがない
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "hiroshima";
const MUNICIPALITY_NAME = "広島市";
const SOURCE_NAME = "広島市「保育園等の空き状況」";
const INDEX_URL = "https://www.city.hiroshima.lg.jp/soshiki/83/5319.html";
const AGE_COUNT = 6;
const WARD_COUNT = 8;

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const EXTRACTOR = path.join(process.cwd(), "scripts", "hiroshima-pdf-extract.py");

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

type PdfTable = { section: string; head: string[]; rows: string[][]; dataRows: number };
type PdfWard = { ward: string; asOf: number[][]; target: number[][]; tables: PdfTable[] };
type PdfResult = { wards: PdfWard[] };

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

/**
 * 人数を読む。「10以上」「2※1」「2(1)」のような書き方が混じるので、
 * 数の部分だけを採り、もとの書き方は呼び出し側で注記に回す。
 */
function parseValue(raw: string): { value: number | null; original: string | null } {
  const t = toHalfWidth(squeeze(raw));
  if (t === "" || t === "-" || t === "－" || t === "―" || t === "━") {
    return { value: null, original: null };
  }
  if (/^\d+$/.test(t)) return { value: Number(t), original: null };
  const m = t.match(/^(\d+)(?:以上|※\d+|\(\d+\)|（\d+）)+$/);
  if (m) return { value: Number(m[1]), original: raw.trim() };
  return { value: null, original: raw.trim() };
}

/**
 * 安佐南区の「施設区分」の列は略号（公・私・認幼・認保・小規・事）。
 * 「公※」のように注記の印が付くことがあるので落としてから引く。
 */
/**
 * 安佐南区は公立・私立や認定こども園の型まで分けているが、ほかの区はそこまで分けていない。
 * 区をまたいで同じ見え方になるよう、ほかの区に合わせた粒度に丸める。
 */
const KUBUN_LABELS: Record<string, string> = {
  公: "保育園",
  私: "保育園",
  認幼: "認定こども園",
  認保: "認定こども園",
  小規: "小規模保育事業所",
  事: "事業所内保育事業所",
};

function expandKubun(raw: string): string {
  const key = squeeze(raw).replace(/[※＊*\d]/g, "");
  const label = KUBUN_LABELS[key];
  if (!label) fail(`施設区分の略号が分かりません: 「${raw}」`);
  return label;
}

/** 表の見出しや行から施設の種類を決める */
function categoryOf(section: string, headTitle: string, rowKubun: string, name: string): string {
  const s = squeeze(section);
  const h = squeeze(headTitle);
  if (rowKubun) return expandKubun(rowKubun);
  // **中区は小規模と事業所内を1つの表にまとめている**ので、どちらかには決められない
  if (s === "小規模保育事業所・事業所内保育事業所") return s;
  for (const label of ["認定こども園", "小規模保育事業所", "事業所内保育事業所"]) {
    if (h.startsWith(label)) return label;
    if (s.startsWith(label)) return label;
  }
  // 安佐北区は「保育園（園名の前に◎ → 認定こども園）」という見出しで園名に印が付く
  if (h.includes("◎") && name.startsWith("◎")) return "認定こども園";
  return "保育園";
}

async function main() {
  console.log(`${MUNICIPALITY_NAME}の空き状況を取り込みます`);
  console.log(`公式ページ: ${INDEX_URL}\n`);

  const ua = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";
  const res = await fetch(INDEX_URL, { headers: { "User-Agent": ua } });
  if (!res.ok) fail(`公式ページが ${res.status} を返しました`);
  const html = await res.text();

  // 「01 中区 （PDF 379.9KB）」のように区ごとのリンクが並ぶ
  const links: { ward: string; url: string }[] = [];
  const seen = new Set<string>();
  for (const m of html.matchAll(/<a[^>]+href="([^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/gi)) {
    const text = toHalfWidth(stripTags(m[2]));
    const wm = text.match(/^\d+\s*(\S+区)/);
    if (!wm) continue;
    const url = new URL(m[1], INDEX_URL).toString();
    if (seen.has(url)) continue;
    seen.add(url);
    links.push({ ward: wm[1], url });
  }
  if (links.length !== WARD_COUNT) {
    fail(`区のPDFが${links.length}本しか見つかりません（広島市は${WARD_COUNT}区）`);
  }
  for (const l of links) console.log(`  ${l.ward}: ${l.url}`);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "hiroshima-vacancy-"));
  try {
    const args: string[] = [];
    for (const [i, l] of links.entries()) {
      const r = await fetch(l.url, { headers: { "User-Agent": ua } });
      if (!r.ok) fail(`PDFの取得に失敗しました（${r.status}）: ${l.url}`);
      const buf = Buffer.from(await r.arrayBuffer());
      if (buf.subarray(0, 4).toString() !== "%PDF") fail(`PDFではありません: ${l.url}`);
      const file = path.join(tmpDir, `hiroshima-${i}.pdf`);
      fs.writeFileSync(file, buf);
      args.push(`${l.ward}:${file}`);
    }

    let pdf: PdfResult;
    try {
      pdf = JSON.parse(runPython([EXTRACTOR, ...args])) as PdfResult;
    } catch (err) {
      fail(`抽出結果を読めません: ${String(err)}`);
    }

    // 対象月はどの区も同じはず
    const targets = new Set(
      pdf.wards.flatMap((w) => w.target.map(([y, m]) => `${reiwaToYear(y)}-${m}`))
    );
    if (targets.size !== 1) fail(`PDFに対象月が${targets.size}種類あります: ${[...targets].join(" / ")}`);
    const [targetYear, targetMonth] = [...targets][0].split("-").map(Number);

    // 基準日は区ごとに違うことがある。いちばん古い日をデータセットの基準日にする
    const asOfByWard = new Map<string, string>();
    for (const w of pdf.wards) {
      if (w.asOf.length !== 1) fail(`${w.ward}: 基準日が${w.asOf.length}種類あります`);
      const [mm, dd] = w.asOf[0];
      // 基準日には年が書かれていない。対象月の前月ぶんなので対象年をそのまま使う
      asOfByWard.set(w.ward, `${targetYear}-${String(mm).padStart(2, "0")}-${String(dd).padStart(2, "0")}`);
    }
    const asOf = [...asOfByWard.values()].sort()[0];
    const differing = [...asOfByWard.entries()].filter(([, d]) => d !== asOf);
    console.log(`\n基準日: ${asOf} / 対象: ${targetYear}年${targetMonth}月入所`);
    if (differing.length > 0) {
      console.log(`  区ごとの違い: ${differing.map(([w, d]) => `${w}は${d}`).join("、")}`);
    }

    const wards: string[] = [];
    const categories: string[] = [];
    const facilities: {
      id: string;
      name: string;
      w: number;
      c: number;
      vacancy: (number | null)[];
      waiting: (number | null)[];
    }[] = [];
    const seenId = new Set<string>();
    const oddValues: string[] = [];
    const mergedFacilities: string[] = [];

    for (const w of pdf.wards) {
      if (!wards.includes(w.ward)) wards.push(w.ward);
      const wi = wards.indexOf(w.ward);

      for (const table of w.tables) {
        const head = table.head;
        const ageIdx = Array.from({ length: AGE_COUNT }, (_, i) => head.indexOf(`${i}歳`));
        if (ageIdx.some((i) => i < 0)) fail(`${w.ward}: 年齢の見出しが足りません: ${head.join(" / ")}`);
        const kubunIdx = head.indexOf("施設区分");
        // **園名がどの列に入るかは区によって違う**（安佐北区は0列目が地区で1列目が園名）。
        // 年齢の列より左のうち、ほとんどの行が埋まっていて字数がいちばん長い列を園名とみなす
        const body = table.rows.slice(2).filter((r) => r.some((c) => (c ?? "").trim() !== ""));
        let nameIdx = 0;
        let bestLength = -1;
        for (let col = 0; col < ageIdx[0]; col++) {
          if (col === kubunIdx) continue;
          const values = body.map((r) => (r[col] ?? "").trim()).filter((v) => v !== "");
          if (values.length < body.length * 0.8) continue;
          const avg = values.reduce((a, v) => a + squeeze(v).length, 0) / values.length;
          if (avg > bestLength) {
            bestLength = avg;
            nameIdx = col;
          }
        }
        if (bestLength < 0) fail(`${w.ward}: 園名の列が分かりません: ${head.join(" / ")}`);

        let handled = 0;
        for (const row of table.rows.slice(2)) {
          if (row.some((c) => (c ?? "").trim() !== "")) handled++;
          const name = (row[nameIdx] ?? "").trim();
          if (!name) continue;
          if (/^(合計|計)$/.test(squeeze(name))) continue;
          // 見出しの繰り返し行
          if (squeeze(name) === squeeze(head[nameIdx] ?? "")) continue;

          // **複数の学年をまとめて公表している施設**は、まとめた見出しがセルに入って
          // 列がずれる。誤読するより載せない方がよいので、注記に回す
          const hasMergedCell = row.some((c) => /歳児(入園可能人数|待機者数)|歳の(入園可能人数|待機者数)/.test(c ?? ""));
          if (hasMergedCell) {
            mergedFacilities.push(`${w.ward} ${name}`);
            continue;
          }

          const kubun = kubunIdx >= 0 ? (row[kubunIdx] ?? "").trim() : "";
          const category = categoryOf(table.section, head[0] ?? "", kubun, name);
          if (!categories.includes(category)) categories.push(category);

          const vacancy: (number | null)[] = [];
          const waiting: (number | null)[] = [];
          for (const [age, col] of ageIdx.entries()) {
            const v = parseValue(row[col] ?? "");
            const t = parseValue(row[col + 1] ?? "");
            for (const p of [v, t]) {
              if (p.original) oddValues.push(`${w.ward} ${name}（${age}歳児「${p.original}」）`);
            }
            vacancy.push(v.value);
            waiting.push(t.value);
          }

          const cleanName = name.replace(/^◎/, "").trim();
          const id = `${w.ward}-${cleanName}`;
          if (seenId.has(id)) fail(`施設名が重複しています: ${id}`);
          seenId.add(id);
          facilities.push({
            id,
            name: cleanName,
            w: wi,
            c: categories.indexOf(category),
            vacancy,
            waiting,
          });
        }
        // 値の入っている行はすべて何らかの形で扱えたはず。
        // 園名の列を取り違えると、ここで数が合わなくなって気づける
        if (handled !== table.dataRows) {
          fail(
            `${w.ward}: 値の入った行が${table.dataRows}行あるのに${handled}行しか見ていません（${table.section}）`
          );
        }
      }
    }

    if (wards.length !== WARD_COUNT) fail(`区が${wards.length}個しかありません`);
    if (facilities.length < 200) fail(`施設が${facilities.length}件しか取れていません`);

    const previous = fs.existsSync(OUT_PATH)
      ? (JSON.parse(fs.readFileSync(OUT_PATH, "utf-8")) as { asOf?: string; facilities?: unknown[]; sourceFiles?: Record<string, string> })
      : null;
    if (previous?.facilities && facilities.length < previous.facilities.length * 0.9) {
      fail(
        `施設数が大きく減っています（前回 ${previous.facilities.length}件 → 今回 ${facilities.length}件）`
      );
    }
    // 自治体は基準日を変えずに資料を差し替えることがある。
    // 取り込み元の一式も同じときだけ、書き換えを見送る
    if (
      previous?.asOf === asOf &&
      JSON.stringify(previous?.sourceFiles ?? {}) === JSON.stringify(Object.fromEntries(links.map((l) => [l.ward, l.url])))
    ) {
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
      sourceFiles: Object.fromEntries(links.map((l) => [l.ward, l.url])),
      metrics: ["vacancy", "waiting"],
      subtitle: `${targetYear}年${targetMonth}月入所ぶんの入園可能人数と待機者数`,
      waitingCaveat:
        "待機者数は、その園を希望して入園できていない方の人数です。ほかの園にも申し込んでいる方が含まれます。",
      notes: [
        "安佐南区は公立・私立の別や認定こども園の型まで公表していますが、ほかの区に合わせて「保育園」「認定こども園」にまとめています。",
        "広島市の注記のとおり、入園可能人数が0人でも申し込むことはできます。空きがあっても必ず入れるとは限りません。",
        ...(differing.length > 0
          ? [
              `基準日は区によって違います（ほとんどは${asOf}、${differing.map(([wd, d]) => `${wd}は${d}`).join("、")}）。`,
            ]
          : []),
        ...(mergedFacilities.length > 0
          ? [
              `次の施設は複数の学年をまとめて公表されているため、当サイトでは年齢別の人数を載せていません。公式の一覧をご覧ください: ${mergedFacilities.join("、")}`,
            ]
          : []),
        ...(oddValues.length > 0
          ? [
              `次の欄は数字だけでない書き方をされています。当サイトでは数の部分だけを載せています: ${oddValues.join("、")}`,
            ]
          : []),
      ],
      wards,
      categories,
      facilities,
    };

    const { facilities: _f, ...meta } = dataset;
    const metaJson = JSON.stringify(meta, null, 2);
    const head = metaJson.slice(0, metaJson.lastIndexOf("}")).trimEnd();
    const bodyJson = facilities.map((f) => `    ${JSON.stringify(f)}`).join(",\n");
    const out = `${head},\n  "facilities": [\n${bodyJson}\n  ]\n}\n`;
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
    console.log(`  データ時点: ${asOf}`);
    console.log(`  年齢別を載せなかった施設（学年をまとめて公表）: ${mergedFacilities.length}件`);
    console.log(`  数字だけでない書き方の欄: ${oddValues.length}件`);
    console.log("");
    for (const [i, wd] of wards.entries()) {
      console.log(`  ${wd} ${facilities.filter((f) => f.w === i).length}施設`);
    }
    console.log("");
    for (const [i, cat] of categories.entries()) {
      console.log(`  ${cat} ${facilities.filter((f) => f.c === i).length}施設`);
    }
    console.log("");
    console.log("  年齢 | 入園可能 | 待機者");
    ageTotals.forEach((v, age) => console.log(`  ${age}歳児 | ${v} | ${waitTotals[age]}`));
    console.log(
      `  合計 | ${ageTotals.reduce((a, b) => a + b, 0)} | ${waitTotals.reduce((a, b) => a + b, 0)}`
    );
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

main().catch((err) => fail(String(err)));
