import type { Question, SimulationResult } from "../types";

export function calculateScore(
  questions: Question[],
  answers: Record<string, string>
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

  return {
    parent1Base,
    parent2Base,
    adjustment,
    total: parent1Base + parent2Base + adjustment,
    breakdown,
  };
}
