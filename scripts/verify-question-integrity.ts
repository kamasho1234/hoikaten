// 全自治体データの整合性検証
// 1. 同一質問内の option value 重複（UI選択バグ・React key重複）
// 2. reason選択肢 → 詳細質問idのルーティング整合性（simulator-form.tsxの
//    `q.id === `${prefix}_${reason}`` 完全一致フィルタに基づく）
// 注: reason質問を持たない自治体は base 質問全件表示のフォールバックが
//     simulator-form.tsx にあるため合格扱い
import { getAllMunicipalities, getMunicipalityData } from '../src/lib/data';

// 仕様として points=0 かつ詳細質問なしが正しい reason（根拠付きで登録）
const KNOWN_ZERO_REASONS = new Set([
  // sum方式で不在親の基準指数は0点が正しい（ひとり親加算はadjustment側で実装済み）
  'murakami:absent',
  'tamana:absent',
  // 公式細則の別表で災害は「市が判断」扱い（固定点数なし）
  'katagami:disaster',
]);

let issueCount = 0;
const issueFiles = new Set<string>();

function report(slug: string, message: string) {
  console.log(`[${slug}] ${message}`);
  issueCount++;
  issueFiles.add(slug);
}

for (const muni of getAllMunicipalities()) {
  const data = getMunicipalityData(muni.slug);
  if (!data) continue;
  const questions = data.questions;

  // 1. 同一質問内のvalue重複
  for (const q of questions) {
    const seen = new Map<string, string>();
    for (const opt of q.options) {
      if (seen.has(opt.value)) {
        report(muni.slug, `質問「${q.id}」内でvalue重複: "${opt.value}"（「${seen.get(opt.value)}」と「${opt.label}」）`);
      } else {
        seen.set(opt.value, opt.label);
      }
    }
  }

  // 2. reasonルーティング整合性 + 3. reason質問の有無
  for (const prefix of ['parent1', 'parent2'] as const) {
    const baseQs = questions.filter((q) => q.category === `${prefix}_base`);
    if (baseQs.length === 0) continue;
    const reasonQ = baseQs.find((q) => q.id === `${prefix}_reason`);
    if (!reasonQ) continue; // フォーム側フォールバックで全件表示されるためOK
    // 到達不能チェック: reason質問がある場合、base質問はいずれかのreasonサフィックスと
    // 一致するidでないと一度も表示されない（点数が加算不能になる）
    const reasonSuffixes = new Set(
      reasonQ.options
        .filter((o) => o.value.startsWith(`${prefix}_reason_`))
        .map((o) => o.value.slice(`${prefix}_reason_`.length))
    );
    for (const q of baseQs) {
      if (q.id === `${prefix}_reason`) continue;
      const qSuffix = q.id.startsWith(`${prefix}_`) ? q.id.slice(`${prefix}_`.length) : null;
      const reachableById = qSuffix !== null && reasonSuffixes.has(qSuffix);
      const reachableByShowFor = (q.showFor ?? []).some((s) => reasonSuffixes.has(s));
      if (!reachableById && !reachableByShowFor) {
        report(muni.slug, `base質問「${q.id}」はどのreasonからも到達できない（点数が加算されない）`);
      }
      // showFor に存在しない reason サフィックスを書いた場合も検出
      for (const s of q.showFor ?? []) {
        if (!reasonSuffixes.has(s)) {
          report(muni.slug, `base質問「${q.id}」の showFor "${s}" に一致する reason が存在しない`);
        }
      }
    }

    for (const opt of reasonQ.options) {
      if (!opt.value.startsWith(`${prefix}_reason_`)) {
        report(muni.slug, `reason option value が規約外: "${opt.value}"`);
        continue;
      }
      const suffix = opt.value.slice(`${prefix}_reason_`.length);
      const detailExists = questions.some(
        (q) => q.id === `${prefix}_${suffix}` || q.showFor?.includes(suffix)
      );
      if (KNOWN_ZERO_REASONS.has(`${muni.slug}:${suffix}`)) continue;
      if (!detailExists && opt.points === 0 && suffix !== 'none') {
        report(muni.slug, `reason「${opt.label}」(${opt.value}) に対応する詳細質問 ${prefix}_${suffix} が存在せず points=0（選択すると0点のまま次ステップへ）`);
      }
    }
  }
}

console.log(`\n検出: ${issueCount}件 / ${issueFiles.size}自治体（全${getAllMunicipalities().length}自治体を検証）`);
if (issueFiles.size > 0) {
  console.log('対象: ' + [...issueFiles].sort().join(', '));
}
