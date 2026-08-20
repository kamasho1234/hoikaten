/**
 * 点数の下に出る「評価」が全自治体で出るかを見る
 *
 * 実行: npx tsx scripts/audit-score-evaluation.ts
 *
 * 自治体ごとの解説を書いていないところでは、以前は「結果」としか出ず、
 * 有利か厳しいかが分からなかった。基準点の満点を目安にした汎用の評価を入れたので、
 * どの自治体でも、どの点数でも、意味のあるラベルと説明が出ることを確かめる。
 */
import { getAllMunicipalities, getMunicipalityData } from "../src/lib/data/index";
import { getScoreEvaluationForAudit } from "../src/app/[city]/simulator-form";

let ng = 0;
let checked = 0;
const labels = new Map<string, number>();

for (const m of getAllMunicipalities()) {
  const data = getMunicipalityData(m.slug);
  if (!data) continue;
  const base = data.municipality.maxBasePoints;
  // 0点から満点の1.5倍まで、刻んで確かめる
  for (const total of [0, Math.round(base * 0.5), Math.round(base * 0.9), base, Math.round(base * 1.1), Math.round(base * 1.5)]) {
    const e = getScoreEvaluationForAudit(data.municipality.slug, total, data);
    checked++;
    labels.set(e.label, (labels.get(e.label) ?? 0) + 1);
    const bad =
      !e.label ||
      e.label === "結果" ||
      !e.description ||
      !e.tip ||
      e.description.length < 10 ||
      e.tip.length < 10;
    if (bad) {
      ng++;
      if (ng <= 10) {
        console.log(`${data.municipality.slug}（${data.municipality.name}） ${total}点`);
        console.log(`  ラベル: ${e.label || "(なし)"}`);
        console.log(`  説明: ${e.description || "(なし)"}`);
        console.log(`  ヒント: ${e.tip || "(なし)"}`);
      }
    }
  }
}

console.log(`\n確かめた組み合わせ: ${checked}件`);
console.log("出たラベル:");
for (const [k, v] of [...labels].sort((a, b) => b[1] - a[1])) console.log(`  ${k}: ${v}`);
console.log(ng === 0 ? "\n評価が出ない組み合わせはありません。" : `\n評価が薄い/出ない: ${ng}件`);
