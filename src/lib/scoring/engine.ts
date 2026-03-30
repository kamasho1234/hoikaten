import type { Question, SimulationResult, ScoringMethod } from "../types";

export function calculateScore(
  questions: Question[],
  answers: Record<string, string>,
  scoringMethod: ScoringMethod = "sum"
): SimulationResult {
  let parent1Base = 0;
  let parent2Base = 0;
  let adjustment = 0;
  const breakdown: SimulationResult["breakdown"] = [];

  for (const question of questions) {
    const selectedValue = answers[question.id];
    if (selectedValue === undefined) continue;

    const option = question.options.find((o) => o.value === selectedValue);
    if (!option) continue;

    const points = option.points;

    breakdown.push({
      questionId: question.id,
      label: question.label,
      points,
    });

    switch (question.category) {
      case "parent1_base":
        parent1Base += points;
        break;
      case "parent2_base":
        parent2Base += points;
        break;
      case "adjustment":
        adjustment += points;
        break;
    }
  }

  // 横浜市等のランク制: 低い方のランクが世帯ランク
  // ひとり親の場合（parent2未回答=0）は parent1Base をそのまま使用
  const hasParent2 = questions.some(
    (q) => q.category === "parent2_base" && answers[q.id] !== undefined
  );
  const baseScore =
    scoringMethod === "min"
      ? hasParent2
        ? Math.min(parent1Base, parent2Base)
        : parent1Base
      : parent1Base + parent2Base;

  return {
    parent1Base,
    parent2Base,
    adjustment,
    total: baseScore + adjustment,
    breakdown,
  };
}
