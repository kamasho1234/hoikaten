/**
 * 人数を尋ねる質問で、選択肢の人数が飛んでいないかを見る
 *
 * 実行: npx tsx scripts/audit-people-options.ts
 *
 * 公式の基準表は「世帯中の就学前児童の数」のように**申込児童本人を含めた数**で
 * 書かれていることが多い。それを質問文だけ「きょうだいの人数」に言い換えると、
 * 本人ぶんの1人がずれて選べない人数が出てしまう（新座市で実際に起きた）。
 * 選択肢に並ぶ人数が連続していない質問を洗い出して、取りこぼしに気づけるようにする。
 */
import { getAllMunicipalities, getMunicipalityData } from "../src/lib/data/index";

function toHalfWidth(s: string): string {
  return s.replace(/[０-９]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xfee0));
}

let found = 0;
for (const m of getAllMunicipalities()) {
  const data = getMunicipalityData(m.slug);
  if (!data) continue;
  for (const q of data.questions ?? []) {
    const nums: number[] = [];
    for (const o of q.options ?? []) {
      const label = toHalfWidth(o.label);
      // 「3人以上」のような上限なしの表記も人数として拾う
      const mm = label.match(/(\d+)\s*人/);
      if (mm) nums.push(Number(mm[1]));
    }
    const uniq = [...new Set(nums)].sort((a, b) => a - b);
    if (uniq.length < 2) continue;
    const gaps: number[] = [];
    for (let i = uniq[0]; i <= uniq[uniq.length - 1]; i++) {
      if (!uniq.includes(i)) gaps.push(i);
    }
    if (gaps.length === 0) continue;
    found++;
    console.log(`${data.municipality.slug}（${data.municipality.name}） / ${q.id}`);
    console.log(`  問: ${q.label}`);
    console.log(`  選択肢: ${(q.options ?? []).map((o) => `${o.label}=${o.points}`).join(" | ")}`);
    console.log(`  選べない人数: ${gaps.join("、")}人`);
    console.log("");
  }
}
console.log(found === 0 ? "人数が飛んでいる質問はありません。" : `検出: ${found}件`);
