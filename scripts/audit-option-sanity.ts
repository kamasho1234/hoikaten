/**
 * 選択肢の「あり得なさ」を洗い出す監査
 *
 * 実行: npx tsx scripts/audit-option-sanity.ts
 *
 * 新座市で「きょうだい1人」が選べなくなっていたように、
 * **公式の基準表を質問文に言い換えるときにずれる**ことがある。
 * 人の目で気づきにくいずれを機械で拾う。
 *
 * 見ているのは次の6つ。
 *  A. ラベルに書いた点数（+3・-5・▲5・3点）と実際の points が食い違う
 *  B. 同じ質問の中で value か label が重複している
 *  C. 選択肢が1つしかない（選ばせる意味がない）
 *  D. 0点の選択肢がない（あてはまらない人が答えられない）
 *  E. 数値の区間（時間・日・週・歳）に穴や重なりがある
 *  F. 人数の選択肢が飛んでいる（新座市で見つかった型）
 */
import { getAllMunicipalities, getMunicipalityData } from "../src/lib/data/index";
import type { Question, QuestionOption } from "../src/lib/types";

function toHalfWidth(s: string): string {
  return s
    .replace(/[０-９]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xfee0))
    .replace(/[＋]/g, "+")
    .replace(/[－−ー―]/g, "-");
}

/**
 * 人が見て「仕様どおり」と確かめたもの。理由を書いてから足すこと。
 * ここに入れると監査に出なくなるので、迷ったら入れない。
 */
const KNOWN_OK = new Set([
  // 市原市の申請の種類は「新規／転所」×「市内／市外」の4通り。
  // 申し込む人は必ずどれかに当てはまるので、0点の選択肢は要らない
  "ichihara/adj_application_type",
]);

const findings: { kind: string; where: string; detail: string }[] = [];
const report = (kind: string, where: string, detail: string) =>
  findings.push({ kind, where, detail });

/**
 * ラベルに書かれている点数を読む。符号か「点」が付いているものだけを対象にする。
 * **内訳を書いているラベル**（「+130：100点補填+30点ひとり親加算」など）は
 * どれが合計か決められないので読まない。
 */
function labelPoints(label: string): number | null {
  const t = toHalfWidth(label);
  // 計算式を書いているラベル（「指数12相当-3=9」）は合計が決められないので読まない
  if (t.includes("=")) return null;
  const num = "\d+(?:\.\d+)?";
  const hits = [
    ...t.matchAll(new RegExp(`([+\-▲△])\s*(${num})\s*点?|[（(]\s*(${num})\s*点\s*[)）]`, "g")),
  ].filter(
    (h) => {
      if (h[3] !== undefined) return true;
      // **「身体1-2級」「療育手帳B-1」のハイフンは範囲や等級**。
      // 符号の直前が数字か英字なら点数ではない
      const before = t.slice(0, h.index ?? 0);
      if (/[\dA-Za-z]\s*$/.test(before)) return false;
      // 「+2級」「-3歳」のように単位が続くものも点数ではない
      const after = t.slice((h.index ?? 0) + h[0].length);
      if (/^\s*(級|歳|時間|日|週|人|か月|ヶ月|カ月|名)/.test(after)) return false;
      return true;
    }
  );
  if (hits.length !== 1) return null;
  const h = hits[0];
  if (h[3] !== undefined) return Number(h[3]);
  const sign = h[1] === "-" || h[1] === "▲" || h[1] === "△" ? -1 : 1;
  return sign * Number(h[2]);
}

/** 「月120時間以上128時間未満」のような区間を読む */
type Range = { lo: number; hi: number | null; unit: string; label: string };
function parseRange(label: string): Range | null {
  const t = toHalfWidth(label).replace(/[\s　]/g, "");
  // **「月16日以上・1日5時間以上7時間未満」のような複合条件は1本の区間にならない**。
  // 単位が2種類以上出てくるもの、「かつ」「・」でつないだものは比べない
  const unitsFound = new Set([...t.matchAll(/(時間|日|週|歳|か月|ヶ月|カ月)/g)].map((m) => m[1]));
  if (unitsFound.size !== 1) return null;
  if (/かつ|・|＋|and/i.test(t)) return null;
  const unit = [...unitsFound][0];
  const U = "(?:時間|日|週|歳|か月|ヶ月|カ月)?";
  // 「A〜B未満」「A以上B未満」
  let m = t.match(new RegExp(`(\d+)${U}(?:以上)?[〜~\-ー]\s*(\d+)${U}(?:未満|まで|以下)`));
  if (m) return { lo: Number(m[1]), hi: Number(m[2]), unit, label };
  m = t.match(new RegExp(`(\d+)${U}以上\s*(\d+)${U}(?:未満|まで|以下)`));
  if (m) return { lo: Number(m[1]), hi: Number(m[2]), unit, label };
  m = t.match(new RegExp(`(\d+)${U}以上`));
  if (m) return { lo: Number(m[1]), hi: null, unit, label };
  m = t.match(new RegExp(`(\d+)${U}(?:未満|以下)`));
  if (m) return { lo: 0, hi: Number(m[1]), unit, label };
  return null;
}

function auditQuestion(slug: string, name: string, q: Question) {
  if (KNOWN_OK.has(`${slug}/${q.id}`)) return;
  const where = `${slug}（${name}） / ${q.id}`;
  const options: QuestionOption[] = q.options ?? [];

  // C. 選択肢が1つ以下
  if (options.length <= 1) {
    report("選択肢が1つ以下", where, `${q.label} → ${options.length}件`);
  }

  // A. ラベルの点数と points の食い違い
  for (const o of options) {
    const written = labelPoints(o.label);
    if (written !== null && written !== o.points) {
      report(
        "ラベルの点数と実際の点数が違う",
        where,
        `${q.label} → 「${o.label}」はラベル上 ${written} 点だが points は ${o.points}`
      );
    }
  }

  // B. value / label の重複
  const seenValue = new Set<string>();
  const seenLabel = new Set<string>();
  for (const o of options) {
    if (seenValue.has(o.value)) {
      report("同じ質問で value が重複", where, `${q.label} → 「${o.value}」`);
    }
    seenValue.add(o.value);
    if (seenLabel.has(o.label)) {
      report("同じ質問で label が重複", where, `${q.label} → 「${o.label}」`);
    }
    seenLabel.add(o.label);
  }

  // D. 0点の選択肢がない
  if (options.length > 1 && !options.some((o) => o.points === 0)) {
    report(
      "0点の選択肢がない",
      where,
      `${q.label} → ${options.map((o) => `${o.label}=${o.points}`).join(" | ")}`
    );
  }

  // E. 数値の区間の穴と重なり
  const ranges = options.map((o) => parseRange(o.label)).filter((r): r is Range => r !== null);
  const units = new Set(ranges.map((r) => r.unit));
  if (ranges.length >= 2 && units.size === 1) {
    const sorted = [...ranges].sort((a, b) => a.lo - b.lo);
    for (let i = 0; i + 1 < sorted.length; i++) {
      const cur = sorted[i];
      const next = sorted[i + 1];
      if (cur.hi === null) continue; // 「A以上」で開いている区間は最後のはず
      if (cur.hi < next.lo) {
        report(
          "数値の区間に穴がある",
          where,
          `${q.label} → 「${cur.label}」と「${next.label}」の間（${cur.hi}〜${next.lo}）が選べない`
        );
      } else if (cur.hi > next.lo) {
        report(
          "数値の区間が重なっている",
          where,
          `${q.label} → 「${cur.label}」と「${next.label}」が重なる`
        );
      }
    }
  }

  // F. 人数の飛び
  const nums: number[] = [];
  for (const o of options) {
    const m = toHalfWidth(o.label).match(/(\d+)\s*人/);
    if (m) nums.push(Number(m[1]));
  }
  const uniq = [...new Set(nums)].sort((a, b) => a - b);
  if (uniq.length >= 2) {
    const gaps: number[] = [];
    for (let i = uniq[0]; i <= uniq[uniq.length - 1]; i++) {
      if (!uniq.includes(i)) gaps.push(i);
    }
    if (gaps.length > 0) {
      report("人数の選択肢が飛んでいる", where, `${q.label} → ${gaps.join("、")}人が選べない`);
    }
  }
}

for (const m of getAllMunicipalities()) {
  const data = getMunicipalityData(m.slug);
  if (!data) continue;
  for (const q of data.questions ?? []) {
    auditQuestion(data.municipality.slug, data.municipality.name, q);
  }
}

const byKind = new Map<string, typeof findings>();
for (const f of findings) {
  if (!byKind.has(f.kind)) byKind.set(f.kind, []);
  byKind.get(f.kind)!.push(f);
}
const kinds = [...byKind.entries()].sort((a, b) => b[1].length - a[1].length);
for (const [kind, list] of kinds) {
  console.log(`\n【${kind}】${list.length}件`);
  for (const f of list.slice(0, 40)) {
    console.log(`  ${f.where}`);
    console.log(`    ${f.detail}`);
  }
  if (list.length > 40) console.log(`  …ほか ${list.length - 40}件`);
}
console.log(`\n合計: ${findings.length}件（全${getAllMunicipalities().length}自治体）`);
