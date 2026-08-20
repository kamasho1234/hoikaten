/**
 * 保護者1と保護者2で選択肢が違う質問を洗い出す
 *
 * 実行: npx tsx scripts/audit-parent-symmetry.ts
 *
 * **多くの自治体の基準表はもともと「父」「母」の列に分かれていて、
 * 妊娠・出産は母の列にしか点数がない**（松前町の規則で父は「―」と確認済み）。
 * つまりここで出てくる食い違いは、ほとんどが公式どおりで直す必要がない。
 *
 * このスクリプトの役目は「食い違いをゼロにすること」ではなく、
 * **食い違いが公式どおりか、実装の都合で入ったものかを人が確かめられるようにすること**。
 * 当サイトは保護者1・保護者2のどちらが母かを利用者に決めさせていないので、
 * 妊娠・出産の加点が保護者2にしかない自治体では、
 * 保護者1のステップで入力の順番を案内している（simulator-form.tsx）。
 *
 * 新しい自治体を足したときにここの件数が増えたら、公式の基準表と見比べること。
 */
import { getAllMunicipalities, getMunicipalityData } from "../src/lib/data/index";
import type { Question } from "../src/lib/types";

/** parent1_xxx / p1_xxx → xxx。保護者を表す接頭辞を外す */
function stripPrefix(id: string): string | null {
  const m = id.match(/^(parent1|parent2|p1|p2)_(.+)$/);
  if (!m) return null;
  return m[2];
}

function side(id: string): 1 | 2 | null {
  if (/^(parent1|p1)_/.test(id)) return 1;
  if (/^(parent2|p2)_/.test(id)) return 2;
  return null;
}

function signature(q: Question): string {
  return (q.options ?? [])
    .map((o) => {
      // 選択肢の value にも接頭辞が入るので落として比べる
      const v = o.value.replace(/^(parent1|parent2|p1|p2)_/, "");
      return `${o.label}=${o.points}=${v}`;
    })
    .join(" | ");
}

let found = 0;
for (const m of getAllMunicipalities()) {
  const data = getMunicipalityData(m.slug);
  if (!data) continue;
  const bySuffix = new Map<string, { 1?: Question; 2?: Question }>();
  for (const q of data.questions ?? []) {
    const suffix = stripPrefix(q.id);
    const s = side(q.id);
    if (!suffix || !s) continue;
    if (!bySuffix.has(suffix)) bySuffix.set(suffix, {});
    bySuffix.get(suffix)![s] = q;
  }
  for (const [suffix, pair] of bySuffix) {
    if (!pair[1] || !pair[2]) {
      // 片方にしかない質問も、性別で出し分けている疑いがある
      const only = pair[1] ? 1 : 2;
      found++;
      console.log(`${data.municipality.slug}（${data.municipality.name}） / ${suffix}`);
      console.log(`  保護者${only}にしかない質問: ${(pair[1] ?? pair[2])!.label}`);
      console.log("");
      continue;
    }
    const a = signature(pair[1]);
    const b = signature(pair[2]);
    if (a === b) continue;
    found++;
    console.log(`${data.municipality.slug}（${data.municipality.name}） / ${suffix}`);
    console.log(`  保護者1: ${pair[1].label}`);
    console.log(`    ${a}`);
    console.log(`  保護者2: ${pair[2].label}`);
    console.log(`    ${b}`);
    console.log("");
  }
}
console.log(found === 0 ? "保護者1と2で食い違う質問はありません。" : `検出: ${found}件`);
