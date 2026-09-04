/**
 * 墨田区の認可保育園等・小規模保育所・家庭的保育者の募集見込数を取り込む
 *
 * 実行: npm run vacancy:fetch:sumida
 *
 * ## この自治体の特徴
 * - 出しているのは「空き数」ではなく**翌月入所の募集見込数**。文京区と同じ性質
 * - PDFの表は結合セルのせいで pdfplumber の表抽出では読めないため、
 *   罫線から境界だけをもらって文字を座標で組み直している（sumida-pdf-extract.py）
 * - **1ページめは左右2段組**。左の段は上から公立→公設民営→私立の続き、右の段は私立。
 *   節の変わり目に「施設名（公立）」のような見出し行が入る
 * - 「公立計」「公設民営計」「私立計」「合計」の行があるので、
 *   施設1件ごとの「計」列と合わせて二重に検算できる
 * - 2ページめの小規模保育所・家庭的保育者は0〜2歳のみ。募集数のない園は空欄
 * - 基準日はPDFに書かれていないので、公式ページの「※8月6日時点」を使う
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "sumida";
const MUNICIPALITY_NAME = "墨田区";
const SOURCE_NAME = "墨田区「募集見込数一覧」";
const SOURCE_URL =
  "https://www.city.sumida.lg.jp/kosodate_kyouiku/kosodate_site/azukeru/hoikuen/bosyuusuu/ta80320020180605.html";
const AGE_COUNT = 6;

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const EXTRACTOR = path.join(process.cwd(), "scripts", "sumida-pdf-extract.py");

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

function tidy(s: string): string {
  return (s ?? "").replace(/[　\s]+/g, " ").trim();
}

/** 空欄は募集なし。数字は募集見込数 */
function parseValue(v: string, where: string): number | null {
  const t = toHalfWidth((v ?? "").replace(/[\s　]/g, ""));
  if (t === "" || t === "-" || t === "－" || t === "―") return null;
  if (/^\d+$/.test(t)) return Number(t);
  fail(`${where}: 人数として読めません: 「${v}」`);
}

type PdfResult = { target: number[][]; grids: string[][][] };

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
 * 縦書きのラベル（小規模保育所・家庭的保育者）を各行へ配る。
 * 文字が入っている行の連続ブロックを1つのラベルとして連結し、
 * ラベルどうしの中点を区間の境界にする（新宿区と同じ考え方）。
 */
function resolveVerticalLabels(rows: string[][], col: number): string[] {
  const GAP = 2;
  const marks: { start: number; end: number; text: string }[] = [];
  let ri = 0;
  while (ri < rows.length) {
    if (!tidy(rows[ri][col])) {
      ri++;
      continue;
    }
    const start = ri;
    let text = "";
    let last = ri;
    while (ri < rows.length) {
      const v = tidy(rows[ri][col]);
      if (v) {
        text += v.replace(/\s/g, "");
        last = ri;
        ri++;
        continue;
      }
      let look = ri;
      while (look < rows.length && look - last <= GAP && !tidy(rows[look][col])) look++;
      if (look < rows.length && look - last <= GAP && tidy(rows[look][col])) {
        ri = look;
        continue;
      }
      break;
    }
    marks.push({ start, end: last, text });
  }
  const resolved = new Array(rows.length).fill("");
  for (const [mi, mark] of marks.entries()) {
    const lo = mi === 0 ? 0 : Math.floor((marks[mi - 1].end + mark.start) / 2) + 1;
    const hi =
      mi + 1 === marks.length ? rows.length - 1 : Math.floor((mark.end + marks[mi + 1].start) / 2);
    for (let j = lo; j <= hi; j++) resolved[j] = mark.text;
  }
  return resolved;
}

async function main() {
  console.log(`${MUNICIPALITY_NAME}の募集見込数を取り込みます`);
  console.log(`公式ページ: ${SOURCE_URL}\n`);

  const ua = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";
  const res = await fetch(SOURCE_URL, { headers: { "User-Agent": ua } });
  if (!res.ok) fail(`公式ページが ${res.status} を返しました`);
  const html = await res.text();
  const plain = stripTags(html);

  // 「令和8年9月募集見込数一覧〈…〉（PDF：225KB）」
  const links = [...html.matchAll(/<a[^>]+href="([^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => ({ url: new URL(m[1], SOURCE_URL).toString(), text: toHalfWidth(stripTags(m[2])) }))
    .map((l) => {
      const m = l.text.match(/令和(\d+)年(\d+)月募集見込数一覧/);
      if (!m) return null;
      const year = reiwaToYear(Number(m[1]));
      const month = Number(m[2]);
      return { ...l, year, month, sortKey: year * 100 + month };
    })
    .filter((v): v is NonNullable<typeof v> => v !== null);
  if (links.length === 0) fail("募集見込数のPDFリンクが見つかりません。ページの構成が変わった可能性があります。");
  const latest = links.reduce((a, b) => (b.sortKey > a.sortKey ? b : a));
  console.log(`最新: ${latest.text}\n  ${latest.url}`);

  // 基準日はPDFになく、ページ本文の「入所募集見込一覧 ※8月6日（木曜日）時点」だけが手がかり
  const um = html.match(/更新日：(\d{4})年(\d{1,2})月(\d{1,2})日/);
  if (!um) fail("更新日が読み取れません");
  const pm = toHalfWidth(plain).match(/入所募集見込一覧\s*※\s*(\d{1,2})月(\d{1,2})日/);
  if (!pm) fail("「入所募集見込一覧 ※X月Y日時点」が読み取れません");
  const updated = { y: Number(um[1]), m: Number(um[2]), d: Number(um[3]) };
  if (Number(pm[1]) !== updated.m || Number(pm[2]) !== updated.d) {
    fail(
      `本文の時点（${pm[1]}月${pm[2]}日）が更新日（${updated.m}月${updated.d}日）と違います。どちらが基準日か確かめてください。`
    );
  }
  const asOf = `${updated.y}-${String(updated.m).padStart(2, "0")}-${String(updated.d).padStart(2, "0")}`;

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "sumida-vacancy-"));
  try {
    const pdfRes = await fetch(latest.url, { headers: { "User-Agent": ua } });
    if (!pdfRes.ok) fail(`PDFの取得に失敗しました（${pdfRes.status}）: ${latest.url}`);
    const buf = Buffer.from(await pdfRes.arrayBuffer());
    if (buf.subarray(0, 4).toString() !== "%PDF") fail(`PDFではありません: ${latest.url}`);
    const file = path.join(tmpDir, "sumida.pdf");
    fs.writeFileSync(file, buf);

    let pdf: PdfResult;
    try {
      pdf = JSON.parse(runPython([EXTRACTOR, file])) as PdfResult;
    } catch (err) {
      fail(`抽出結果を読めません: ${String(err)}`);
    }

    if (pdf.target.length !== 1) fail(`PDFに対象月が${pdf.target.length}種類あります`);
    const [ty, tmn] = pdf.target[0];
    if (reiwaToYear(ty) !== latest.year || tmn !== latest.month) {
      fail(`PDFの対象月（${reiwaToYear(ty)}年${tmn}月）がリンクの文言（${latest.year}年${latest.month}月）と違います。`);
    }
    console.log(`基準日: ${asOf} / 対象: ${latest.year}年${latest.month}月入所`);

    const categories: string[] = [];
    const facilities: {
      id: string;
      name: string;
      w: null;
      c: number;
      vacancy: (number | null)[];
    }[] = [];
    const seen = new Set<string>();
    const built = new Map<string, number[]>();
    const declared = new Map<string, number[]>();
    let rowTotalChecks = 0;
    const unreadable: string[] = [];
    const maxima: string[] = [];

    /** 年齢をまたいでまとめて公表された人数。行の「計」の検算に使う */
    let mergedInRow = 0;
    /** 年齢をまたぐ書き方をしている施設。施設ごとの備考に出す */
    const mergedNotes = new Map<string, string>();

    /**
     * 年齢別の欄を読む。**幅で書かれている園がある**
     * （鐘ヶ淵北保育園の0歳児は「0〜3 合計で最大3」）。
     * その場合は最大の人数を採り、注記に出す。行の「計」もその数で計算されている。
     *
     * 0歳と1歳をまとめて書く月もあるが、そちらは0歳の2列にまたがるので
     * ここではなく readZero で見る。
     */
    const readAge = (raw: string, name: string): number | null => {
      const t = tidy(raw);
      const squeezed = t.replace(/[\s　]/g, "");
      const max = squeezed.match(/最大([０-９\d]+)$/);
      if (max) {
        maxima.push(`${name}（${t}）`);
        return Number(toHalfWidth(max[1]));
      }
      return parseValue(raw, `墨田区 ${name}`);
    };

    const addFacility = (category: string, name: string, values: (number | null)[]) => {
      if (!categories.includes(category)) categories.push(category);
      if (seen.has(name)) fail(`施設名が重複しています: ${name}`);
      seen.add(name);
      const merged = mergedNotes.get(name);
      facilities.push({
        id: name,
        name,
        w: null,
        c: categories.indexOf(category),
        ...(merged
          ? {
              note: `区は0歳の受入月齢（57日以上・6か月以上）ごとの見込みをまとめて「合計で${merged}人」と公表しています。0歳の欄はその人数です`,
            }
          : {}),
        vacancy: values,
      });
      const acc = built.get(category) ?? new Array(AGE_COUNT).fill(0);
      values.forEach((v, i) => {
        acc[i] += v ?? 0;
      });
      built.set(category, acc);
    };

    // --- 1ページめ: 認可保育園・認定こども園 ---
    // 左右それぞれ「施設名／延長保育／受入月齢／0歳／1歳／2歳／3歳／4歳／5歳／計」の10列
    const page0 = pdf.grids[0];
    if (page0.some((r) => r.length !== 20)) fail("1ページめの列数が20ではありません");
    for (const side of [0, 10]) {
      let category: string | null = null;
      for (const row of page0) {
        const name = tidy(row[side]);
        if (!name) continue;
        // 「施設名（公立）」のような見出しで節が変わる
        const heading = name.match(/^施設名（(.+)）$/);
        if (heading) {
          category = `${heading[1]}認可保育園等`;
          continue;
        }
        // 「クラス年齢」「０歳」などの見出し行
        if (/^(クラス年齢|[０0-9]歳|計|延長保育|育)$/.test(name.replace(/\s/g, ""))) continue;
        if (category === null) fail(`${name}: どの節に属するか分かりません`);

        mergedInRow = 0;
        // 0歳は「57日以上」「6か月以上」の2列に分かれている。
        // **2つの区分をまとめて「0〜1 0〜1 合計で1」と書く園がある**（鐘ヶ淵北保育園）。
        // 区分ごとに0〜1人で、合わせて1人という意味なので、0歳を1人として採る。
        // 文字が2列にまたがって入るので、つないでから見ないと数字として読めずに止まる
        const zeroJoined = `${tidy(row[side + 2] ?? "")}${tidy(row[side + 3] ?? "")}`.replace(
          /[\s　]/g,
          "",
        );
        let zero: number | null;
        if (zeroJoined.includes("合計")) {
          const m = zeroJoined.match(/([０-９\d]+)$/);
          if (!m) fail(`墨田区 ${name}: まとめて書かれた人数を読めません（「${zeroJoined}」）`);
          zero = Number(toHalfWidth(m[1]));
          mergedNotes.set(name, String(zero));
        } else {
          zero = readAge(row[side + 3] ?? "", name);
        }
        const values = [zero, ...[4, 5, 6, 7, 8].map((i) => readAge(row[side + i] ?? "", name))];
        const declaredTotal = parseValue(row[side + 9] ?? "", `墨田区 ${name}（計）`);
        // 年齢をまたいでまとめられた人数も、公式の「計」には入っている
        const sum = values.reduce((a: number, v) => a + (v ?? 0), 0) + mergedInRow;

        // 「公立計」「私立計」「合計」の行
        if (/^(.*計)$/.test(name) && !/保育|こども園|学校|幼稚園|園$/.test(name)) {
          const key = name === "合計" ? "合計" : `${name.replace(/計$/, "")}認可保育園等`;
          declared.set(key, values.map((v) => v ?? 0));
          if (declaredTotal !== null && declaredTotal !== sum) {
            fail(`${name}: 「計」が${declaredTotal}なのに年齢別の合計が${sum}です`);
          }
          continue;
        }

        if (declaredTotal !== null && declaredTotal !== sum) {
          fail(`${name}: 行の「計」が${declaredTotal}なのに年齢別の合計が${sum}です`);
        }
        if (declaredTotal !== null) rowTotalChecks++;
        addFacility(category, name, values);
      }
    }

    // --- 2ページめ: 小規模保育所・家庭的保育者（0〜2歳のみ） ---
    const page1 = pdf.grids[1];
    if (page1.some((r) => r.length !== 10)) fail("2ページめの列数が10ではありません");
    const labels = resolveVerticalLabels(page1, 0);
    for (const [ri, row] of page1.entries()) {
      const name = tidy(row[1]);
      if (!name || name === "施設名" || name === "保育者氏名") continue;
      const category = labels[ri];
      if (!category) fail(`${name}: 小規模保育所か家庭的保育者か分かりません`);
      const values: (number | null)[] = new Array(AGE_COUNT).fill(null);
      for (const [i, col] of [7, 8, 9].entries()) {
        const raw = tidy(row[col]);
        // 「※令和9年3月31日で保育室終了」のような注記が数値の欄に入ることがある
        if (raw && !/^[０-９\d]+$/.test(raw.replace(/[\s　]/g, ""))) {
          unreadable.push(`${name}: ${raw}`);
          continue;
        }
        values[i] = parseValue(raw, `墨田区 ${name}`);
      }
      addFacility(category, name, values);
    }

    // --- 検算: 公式の計の行と積み上げ ---
    /**
     * 区の資料そのものが合っていないことがある。
     * 令和8年10月ぶんでは、私立の0歳の「計」が1で、施設を足すと2だった
     * （ほがらか保育園1・わらべ向島保育園1。どちらも紙面の数字と一致している）。
     * **1つの年齢で1人だけのずれは、資料の側の食い違いとして注記に出して通す。**
     * それ以上は読み違えを疑って止める。
     */
    const report: string[] = [];
    const mismatches: string[] = [];
    for (const [key, d] of declared) {
      if (key === "合計") continue;
      const b = built.get(key);
      if (!b) fail(`${key}: 計の行はあるのに施設が1件もありません`);
      if (d.join("/") !== b.join("/")) {
        const gaps = d
          .map((v, i) => ({ age: i, gap: (b[i] ?? 0) - v }))
          .filter((g) => g.gap !== 0);
        const small = gaps.length === 1 && Math.abs(gaps[0].gap) === 1;
        if (!small) {
          fail(`${key}: 計の行が ${d.join("/")} なのに積み上げが ${b.join("/")} です`);
        }
        const g = gaps[0];
        mismatches.push(
          `${key}の${g.age}歳は、区の「計」が${d[g.age]}人なのに施設ごとの数を足すと${b[g.age]}人になります`,
        );
        console.log(`  [注意] ${mismatches[mismatches.length - 1]}`);
        continue;
      }
      report.push(`${key}: 計の行と一致（${b.join("/")}）`);
    }
    const grand = declared.get("合計");
    if (grand) {
      const all = new Array(AGE_COUNT).fill(0);
      for (const [key, b] of built) {
        if (!declared.has(key)) continue; // 小規模・家庭的保育者は1ページめの合計に含まれない
        b.forEach((v, i) => {
          all[i] += v;
        });
      }
      if (grand.join("/") !== all.join("/")) {
        // 節ごとの「計」で見つけたずれは、合計行にもそのまま出る
        const gaps = grand
          .map((v, i) => ({ age: i, gap: (all[i] ?? 0) - v }))
          .filter((g) => g.gap !== 0);
        const explained =
          mismatches.length > 0 && gaps.every((g) => Math.abs(g.gap) === 1) && gaps.length <= mismatches.length;
        if (!explained) {
          fail(`合計行が ${grand.join("/")} なのに認可保育園等の積み上げが ${all.join("/")} です`);
        }
        console.log("  [注意] 合計行のずれは、上の節ごとのずれと同じものです");
      }
      report.push(`合計行と一致（${all.join("/")}）`);
    } else {
      fail("合計行が見つかりません");
    }

    if (facilities.length < 80) fail(`施設が${facilities.length}件しか取れていません`);

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
      sourceUrl: SOURCE_URL,
      sourceFiles: { vacancy: latest.url },
      metrics: ["vacancy"],
      subtitle: `${latest.year}年${latest.month}月入所の募集見込数`,
      notes: [
        "墨田区の注記のとおり、募集数は退園や転園の内定、施設の受入態勢などで変わることがあります。募集数が空欄でも欠員が生じる場合があり、申し込むことはできます。",
        "小規模保育所・家庭的保育者は0〜2歳児のみです。",
        ...(maxima.length > 0
          ? [`次の園は募集数が幅で公表されています。当サイトでは最大の人数を載せています: ${maxima.join("、")}`]
          : []),
        ...(unreadable.length > 0
          ? [`公式が数値のかわりに注記を書いている欄があります: ${unreadable.join("、")}`]
          : []),
        ...(mismatches.length > 0
          ? [
              `区の資料の「計」の行と、施設ごとの数を足したものが食い違っている箇所があります（${mismatches.join("、")}）。当サイトは施設ごとの数をそのまま載せています。`,
            ]
          : []),
      ],
      wards: [],
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
    console.log(`書き出しました: ${path.relative(process.cwd(), OUT_PATH)}`);
    console.log(`  データ時点: ${asOf}`);
    console.log(`  行の「計」との突き合わせ: ${rowTotalChecks}件すべて一致`);
    for (const line of report) console.log(`  ${line}`);
    console.log("");
    for (const [i, cat] of categories.entries()) {
      const list = facilities.filter((f) => f.c === i);
      const v = list.reduce((a, f) => a + f.vacancy.reduce((x: number, y) => x + (y ?? 0), 0), 0);
      console.log(`  ${cat} ${list.length}施設 / 募集${v}`);
    }
    console.log("");
    console.log("  年齢 | 募集");
    ageTotals.forEach((v, age) => console.log(`  ${age}歳児 | ${v}`));
    console.log(`  合計 | ${ageTotals.reduce((a, b) => a + b, 0)}`);
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

main().catch((err) => fail(String(err)));
