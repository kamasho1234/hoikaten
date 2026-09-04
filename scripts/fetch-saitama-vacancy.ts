/**
 * さいたま市の認可保育所等の空き状況（利用可能人数）を取り込む
 *
 * 実行: npm run vacancy:fetch:saitama
 *
 * ## 他の3自治体との違い
 * - **10区ぶんのPDF**。基準日は全区で統一されている（川崎市は区ごとにバラバラだった）
 * - **1つのPDFに表が3〜5個**ある。認可保育園・認定こども園・地域型（小規模/事業所内/家庭的）で、
 *   **どの事業があるかは区によって違う**。表の種別は直前の見出し行から決める
 * - **地域型の表は0〜2歳しかない**。3歳以上は null（クラスなし）で埋める
 * - **保育所コードがある**ので施設IDに使える。ただし1件だけ重複するので連番で一意にする
 * - **表ごとに合計行がある**ので、積み上げと突き合わせて検算できる
 *
 * ## PDFの扱い
 * pdfplumber（Python）に投げる。詳細は scripts/saitama-pdf-extract.py を参照。
 *
 * ## 安全装置
 * 想定と1つでも違えば書き込まずに exit 1 する。
 * ただし**行の合計列と年齢別の和の食い違いだけは警告**にとどめる。
 * 出典側にそういう行が実在し（中央区の下落合）、表の合計行のほうは積み上げと一致するため。
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "saitama";
const MUNICIPALITY_NAME = "さいたま市";
const SOURCE_NAME = "さいたま市「認可保育所・認定こども園・地域型保育事業所 空き状況」";
const INDEX_URL = "https://www.city.saitama.lg.jp/003/001/015/001/p097822.html";
/** ページ内のリンクは "./p097822_d/fil/01nishi_r8.pdf" の形 */
const LINK_BASE = "https://www.city.saitama.lg.jp/003/001/015/001/";

/** 行政区の順。公式ページのリンクも「01西区」から「10岩槻区」の順に並んでいる */
const WARDS = [
  "西区",
  "北区",
  "大宮区",
  "見沼区",
  "中央区",
  "桜区",
  "浦和区",
  "南区",
  "緑区",
  "岩槻区",
];
const AGE_COUNT = 6;
/** 前回より施設がこの割合を下回ったら、取り込みミスとみなして中断する */
const MIN_FACILITY_RATIO = 0.9;

const OUT_PATH = path.join(
  process.cwd(),
  "src",
  "lib",
  "vacancy",
  `${MUNICIPALITY_SLUG}.json`
);
const EXTRACTOR = path.join(process.cwd(), "scripts", "saitama-pdf-extract.py");

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

/** 全角の英数字を半角にする（見出しは「０歳児」のように全角） */
function toHalfWidth(s: string): string {
  return s.replace(/[Ａ-Ｚａ-ｚ０-９]/g, (c) =>
    String.fromCharCode(c.charCodeAt(0) - 0xfee0)
  );
}

type PdfTable = {
  kind: string | null;
  header: string[] | null;
  rows: string[][];
};
type PdfResult = { pageCount: number; asOf: string[]; tables: PdfTable[] };

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

/** 見出し「さいたま市西区認可保育園利用可能人数」「○小規模保育事業」から施設類型を決める */
function categoryOf(kind: string): string | null {
  if (/認可保育園利用可能人数/.test(kind)) return "認可保育園";
  if (/認定こども園利用可能人数/.test(kind)) return "認定こども園";
  // 「地域型保育事業所利用可能人数」は親見出しで、実際の表には ○◯◯事業 が付く
  if (/^○(.+?事業)/.test(kind)) {
    const m = kind.match(/^○(.+)$/);
    return m ? m[1] : null;
  }
  if (/地域型保育事業所利用可能人数/.test(kind)) return null;
  return null;
}

type Row = {
  code: string;
  name: string;
  ward: string;
  category: string;
  vacancy: (number | null)[];
  /** PDFの「合計」列。検算だけに使う */
  total: number | null;
};

async function main() {
  console.log(`${MUNICIPALITY_NAME}の認可保育所等の空き状況を取り込みます`);
  console.log(`公式ページ: ${INDEX_URL}\n`);
  // --- 1. 一覧ページから10区ぶんのPDFリンクと基準日を読む ---
  const res = await fetch(INDEX_URL, {
    headers: { "User-Agent": "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)" },
  });
  if (!res.ok) fail(`公式ページが ${res.status} を返しました`);
  const html = await res.text();

  const text = toHalfWidth(stripTags(html));
  // 「令和8年度 認可保育所等 空き状況（毎月1日更新）」と「●8月1日時点の空き状況です。」
  const yearMatch = text.match(/令和(\d+)年度\s*認可保育所等/);
  if (!yearMatch) fail("ページから年度を読めません。構成が変わった可能性があります。");
  const fiscalYear = reiwaToYear(Number(yearMatch[1]));
  const asOfMatch = text.match(/●\s*(\d+)\s*月\s*(\d+)\s*日\s*時点の空き状況/);
  if (!asOfMatch) fail("ページから基準日（○月○日時点）を読めません。");
  const asOfMonth = Number(asOfMatch[1]);
  const asOfDay = Number(asOfMatch[2]);
  // 年度は4月始まり。1〜3月時点のデータは翌暦年になる
  const asOfYear = asOfMonth <= 3 ? fiscalYear + 1 : fiscalYear;
  const asOf = `${asOfYear}-${String(asOfMonth).padStart(2, "0")}-${String(asOfDay).padStart(2, "0")}`;

  const links = [...html.matchAll(/<a[^>]+href="([^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/gi)].map(
    (m) => ({
      url: LINK_BASE + m[1].replace(/^\.\//, ""),
      text: stripTags(m[2]),
    })
  );
  // 同じPDFが画像リンクとテキストリンクで2回出てくるのでURLで重複を除く
  const unique: { url: string; text: string; ward: string }[] = [];
  for (const link of links) {
    if (unique.some((u) => u.url === link.url)) continue;
    const ward = WARDS.find((w) => link.text.replace(/^\d+/, "").startsWith(w));
    if (!ward) continue;
    unique.push({ ...link, ward });
  }
  if (unique.length !== WARDS.length) {
    fail(
      `PDFのリンクが${WARDS.length}本ではありません（${unique.length}本）。区の構成が変わった可能性があります。`
    );
  }
  const order = unique.map((u) => u.ward).join(",");
  if (order !== WARDS.join(",")) fail(`区の並びが想定と違います: ${order}`);

  console.log(`基準日: ${asOf}`);
  unique.forEach((u) => console.log(`  ${u.ward.padEnd(4, "　")} ${u.url}`));

  // --- 2. PDFを一時ディレクトリに落とす ---
  // Windowsでは日本語ファイル名のPDFをPythonが開けないことがあるため連番にする
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "saitama-vacancy-"));
  try {
    const files: string[] = [];
    for (const [i, u] of unique.entries()) {
      const pdfRes = await fetch(u.url, {
        headers: { "User-Agent": "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)" },
      });
      if (!pdfRes.ok) fail(`PDFの取得に失敗しました（${pdfRes.status}）: ${u.url}`);
      const buf = Buffer.from(await pdfRes.arrayBuffer());
      if (buf.subarray(0, 4).toString() !== "%PDF") fail(`PDFではありません: ${u.url}`);
      const file = path.join(tmpDir, `${String(i).padStart(2, "0")}.pdf`);
      fs.writeFileSync(file, buf);
      files.push(file);
    }

    // --- 3. pdfplumberで表を抜く ---
    const raw = runPython([EXTRACTOR, ...files]);
    let extracted: Record<string, PdfResult>;
    try {
      extracted = JSON.parse(raw) as Record<string, PdfResult>;
    } catch (err) {
      fail(`抽出結果を読めません: ${String(err)}`);
    }

    // --- 4. 表を1施設1行に開く ---
    const rows: Row[] = [];
    const warnings: string[] = [];
    let tableCount = 0;

    for (const [i, ward] of WARDS.entries()) {
      const result = extracted[files[i]];
      if (!result) fail(`${ward}の抽出結果がありません`);

      // PDF冒頭の「R8.8.1」がページから読んだ基準日と合っているか
      if (result.asOf.length !== 1) {
        fail(`${ward}のPDFに基準日が${result.asOf.length}種類あります: ${result.asOf.join(",")}`);
      }
      const m = result.asOf[0].match(/^R(\d+)\.(\d+)\.(\d+)$/);
      if (!m) fail(`${ward}のPDFの基準日を読めません: ${result.asOf[0]}`);
      const pdfAsOf = `${reiwaToYear(Number(m[1]))}-${String(Number(m[2])).padStart(2, "0")}-${String(
        Number(m[3])
      ).padStart(2, "0")}`;
      if (pdfAsOf !== asOf) {
        fail(`${ward}のPDFの基準日（${pdfAsOf}）がページの記載（${asOf}）と違います。`);
      }

      let header: string[] | null = null;
      let category: string | null = null;
      let ages: string[] = [];
      let acc: number[] = [];
      let accCount = 0;

      /** 表の合計行と積み上げを突き合わせる */
      const checkTotals = (row: string[], label: string) => {
        const expected = ages.map((a) => {
          const idx = header!.indexOf(a);
          const v = idx < row.length ? row[idx] : "";
          return v === "" ? 0 : Number(v);
        });
        const actual = acc.slice(0, ages.length);
        if (expected.join(",") !== actual.join(",")) {
          fail(
            `${ward}の「${label}」で合計が合いません。積み上げ=${actual.join(",")} / PDFの合計行=${expected.join(",")}`
          );
        }
      };

      for (const table of result.tables) {
        if (table.header) {
          tableCount++;
          header = table.header;
          const kind = table.kind;
          if (!kind) fail(`${ward}: 見出しの無い表にヘッダーがあります`);
          category = categoryOf(kind);
          if (!category) fail(`${ward}: 表の種別を判別できません: ${kind}`);
          ages = header.includes("３歳児")
            ? ["０歳児", "１歳児", "２歳児", "３歳児", "４歳児", "５歳児"]
            : ["０歳児", "１歳児", "２歳児"];
          acc = ages.map(() => 0);
          accCount = 0;
        } else {
          // ページまたぎの続き。直前のヘッダーと種別をそのまま使う
          if (!header || !category) fail(`${ward}: 続きの表の前にヘッダーがありません`);
        }

        for (const row of table.rows) {
          if (row.every((c) => c === "")) continue;
          const label = row[0];
          const code = row[1];
          const name = row[2];
          if (label.startsWith("合計")) {
            checkTotals(row, category!);
            console.log(`  ${ward} ${category}: ${accCount}施設 検算OK`);
            continue;
          }
          if (!/^\d+$/.test(code)) {
            fail(`${ward}の「${category}」に保育所コードでない行があります: ${row.join("|")}`);
          }
          if (!name) fail(`${ward}の保育所コード${code}に施設名がありません`);
          // 「区」列は結合セルで先頭行にしか入らないので、値があるときだけ照合する
          if (label && label !== ward) {
            fail(`${ward}の表に別の区名があります: ${label}`);
          }

          const vacancy: (number | null)[] = [];
          for (const a of ages) {
            const idx = header!.indexOf(a);
            const v = idx >= 0 && idx < row.length ? row[idx] : "";
            if (v === "") {
              vacancy.push(null);
            } else if (/^\d+$/.test(v)) {
              vacancy.push(Number(v));
            } else {
              fail(`${ward} ${name}（${code}）の${a}が数値ではありません: 「${v}」`);
            }
          }
          // 0〜2歳しかない表は3歳以上をクラスなしとして埋める
          while (vacancy.length < AGE_COUNT) vacancy.push(null);

          const totalIdx = header!.indexOf("合計");
          const totalRaw = totalIdx >= 0 && totalIdx < row.length ? row[totalIdx] : "";
          const total = totalRaw === "" ? null : Number(totalRaw);
          const sum = vacancy.reduce((a: number, b) => a + (b ?? 0), 0);
          if (total !== null && total !== sum) {
            warnings.push(
              `${ward} ${name}（${code}）: 出典の合計列は${total}ですが年齢別の和は${sum}です`
            );
          }

          rows.push({ code, name, ward, category: category!, vacancy, total });
          ages.forEach((_, k) => {
            acc[k] += vacancy[k] ?? 0;
          });
          accCount++;
        }
      }
    }

    // --- 5. 検算 ---
    if (rows.length === 0) fail("施設が1件も取れていません。");
    const wardCounts = WARDS.map((w) => rows.filter((r) => r.ward === w).length);
    if (wardCounts.some((c) => c === 0)) {
      fail(`施設が0件の区があります: ${WARDS.filter((_, i) => wardCounts[i] === 0).join("・")}`);
    }
    console.log(`\n表 ${tableCount}個 / 施設 ${rows.length}件`);

    let previous: { asOf?: string; facilities?: unknown[]; sourceFiles?: Record<string, string> } | null = null;
    if (fs.existsSync(OUT_PATH)) {
      previous = JSON.parse(fs.readFileSync(OUT_PATH, "utf-8"));
      const before = previous?.facilities?.length ?? 0;
      if (before > 0 && rows.length < before * MIN_FACILITY_RATIO) {
        fail(`施設数が前回（${before}件）の${MIN_FACILITY_RATIO * 100}%を下回りました（${rows.length}件）。`);
      }
      // 自治体は基準日を変えずに資料を差し替えることがある。
      // 取り込み元の一式と施設数も同じときだけ、書き換えを見送る
      // （この時点ではまだ施設を組み立てていないので、中身ではなく件数で見る）
      if (
        previous?.asOf === asOf &&
        JSON.stringify(previous?.sourceFiles ?? {}) === JSON.stringify(Object.fromEntries(unique.map((u) => [u.ward, u.url]))) &&
        previous?.facilities?.length === rows.length
      ) {
        console.log(`\n基準日が前回と同じ（${asOf}）なので書き換えません。`);
        if (warnings.length) warnings.forEach((w) => console.log(`  [注意] ${w}`));
        return;
      }
    }

    // --- 6. 施設IDを決める（保育所コード。重複したら連番を足す） ---
    const seen = new Map<string, number>();
    const categories = [...new Set(rows.map((r) => r.category))];
    const facilities = rows.map((r) => {
      const n = (seen.get(r.code) ?? 0) + 1;
      seen.set(r.code, n);
      const id = n === 1 ? r.code : `${r.code}_${n}`;
      const base = {
        id,
        name: r.name,
        w: WARDS.indexOf(r.ward),
        c: categories.indexOf(r.category),
        vacancy: r.vacancy,
      };
      // 全年齢が空欄で合計だけ載っている施設がある（岩槻区のはなにこmimi保育園）。
      // 年齢別の内訳を出せないので、目黒区の家庭福祉員と同じく合計だけを持たせる
      if (r.vacancy.every((v) => v === null) && r.total !== null) {
        return { ...base, vacancyTotal: r.total };
      }
      return base;
    });
    const duplicated = [...seen.entries()].filter(([, n]) => n > 1);
    if (duplicated.length) {
      console.log(
        `\n保育所コードが重複していたので連番を足しました: ${duplicated.map(([c, n]) => `${c}(${n}件)`).join("・")}`
      );
    }

    // --- 7. 書き出し ---
    const notes = [
      "さいたま市は毎月1日時点の「利用可能人数」を区ごとのPDFで公開しています。当サイトは表をそのまま読み取って掲載しています。",
      "空欄はそのクラスを設けていないことを示します（「—」と表示）。0（空きなし）とは違います。",
      "施設名は出典の表記のままです。公立保育園は「植水」のように略した名前で公表されています。",
      "出典では一部の施設名の先頭に「★」が付いていますが、凡例が公表されていないため意味は不明です。表記だけそのまま残しています。",
      "「（定期保育）」は、新設の認可保育施設の空き保育室を使った、入所先が決まらない1歳児向けの期間限定の保育です。同じ園でも別枠として公表されています。",
    ];
    if (warnings.length) {
      notes.push(
        `出典の表で、合計列と年齢別の和が一致しない施設が${warnings.length}件あります（${warnings
          .map((w) => w.split(":")[0])
          .join("・")}）。表全体の合計は年齢別の積み上げと一致するため、年齢別の値をそのまま掲載しています。`
      );
    }

    const dataset = {
      municipalitySlug: MUNICIPALITY_SLUG,
      municipalityName: MUNICIPALITY_NAME,
      asOf,
      fetchedAt: todayJst(),
      sourceName: SOURCE_NAME,
      sourceUrl: INDEX_URL,
      sourceFiles: Object.fromEntries(unique.map((u) => [u.ward, u.url])),
      metrics: ["vacancy"],
      subtitle: `${asOfYear}年${asOfMonth}月${asOfDay}日時点の利用可能人数`,
      notes,
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

    // --- 8. サマリー ---
    const ageTotals = Array.from({ length: AGE_COUNT }, (_, age) =>
      facilities.reduce((acc2, f) => acc2 + (f.vacancy[age] ?? 0), 0)
    );
    console.log(`\n書き出しました: ${path.relative(process.cwd(), OUT_PATH)}`);
    console.log(`  データ時点: ${asOf}`);
    console.log(`  施設数: ${facilities.length}`);
    console.log(`  施設種別: ${categories.join("・")}`);
    console.log("");
    WARDS.forEach((w, i) => {
      const list = facilities.filter((f) => f.w === i);
      const sum = list.reduce(
        (acc2, f) => acc2 + f.vacancy.reduce((s: number, v) => s + (v ?? 0), 0),
        0
      );
      console.log(`  ${w.padEnd(4, "　")} ${String(list.length).padStart(3)}施設 / 空き${sum}`);
    });
    console.log("");
    console.log("  年齢 | 空き枠");
    ageTotals.forEach((v, age) => console.log(`  ${age}歳児 | ${v}`));
    console.log(`  合計 | ${ageTotals.reduce((a, b) => a + b, 0)}`);
    if (warnings.length) {
      console.log(`\n出典側の食い違い（掲載は年齢別の値を採用）:`);
      warnings.forEach((w) => console.log(`  [注意] ${w}`));
    }
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

main().catch((err) => fail(String(err)));
