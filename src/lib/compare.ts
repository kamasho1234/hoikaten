// 自治体間比較コンテンツ用の導出ヘルパー
// 既存のファクトチェック済みデータ(getMunicipalityData)から機械的に導出するのみ。
// 新規の点数記述は一切行わない。
import { getMunicipalityData } from "./data";
import type { Municipality, ScoringMethod } from "./types";

/** 採点方式のラベルと1行説明 */
export interface ScoringMethodInfo {
  method: ScoringMethod;
  /** 表セル用の短縮ラベル */
  label: string;
  /** 凡例・解説用の1行説明 */
  description: string;
}

export function scoringMethodInfo(method?: ScoringMethod): ScoringMethodInfo {
  switch (method) {
    case "min":
      return {
        method: "min",
        label: "低い方を採用",
        description:
          "父母それぞれの基準指数のうち、低い方を世帯の指数として使う方式です。",
      };
    case "avg":
      return {
        method: "avg",
        label: "父母平均",
        description: "父母それぞれの基準指数の平均を世帯の指数として使う方式です。",
      };
    case "sum":
    default:
      return {
        method: "sum",
        label: "加算方式",
        description: "父母それぞれの基準指数を合計して世帯の指数とする方式です。",
      };
  }
}

// 調整指数の質問ラベルから代表的な項目を検出するための対応表。
// substring 一致による「項目の有無検出」なので、元データに忠実。
const ADJUSTMENT_KEYWORDS: { keywords: string[]; chip: string }[] = [
  { keywords: ["ひとり親", "一人親", "母子", "父子"], chip: "ひとり親" },
  { keywords: ["きょうだい", "兄弟", "兄姉", "多子", "多胎"], chip: "きょうだい" },
  { keywords: ["育休", "育児休業", "産休", "産前産後"], chip: "育休復帰" },
  { keywords: ["保育士", "保育従事", "保育教諭"], chip: "保育士" },
  { keywords: ["生活保護"], chip: "生活保護" },
  { keywords: ["単身赴任"], chip: "単身赴任" },
  { keywords: ["小規模", "地域型", "卒園"], chip: "小規模卒園" },
];

/**
 * 調整指数(category==='adjustment')の質問のうち、正の点数を持つ選択肢がある質問を対象に、
 * 既知キーワードで代表的な加点項目のチップを最大 limit 件導出する。
 */
export function getAdjustmentHighlights(slug: string, limit = 3): string[] {
  const data = getMunicipalityData(slug);
  if (!data) return [];

  const chips: string[] = [];
  for (const { keywords, chip } of ADJUSTMENT_KEYWORDS) {
    if (chips.includes(chip)) continue;
    const matched = data.questions.some((q) => {
      if (q.category !== "adjustment") return false;
      // 正の加点選択肢を持つ質問のみ対象(減点のみの項目は除外)
      const hasPositive = q.options.some((o) => o.points > 0);
      if (!hasPositive) return false;
      return keywords.some((kw) => q.label.includes(kw));
    });
    if (matched) {
      chips.push(chip);
      if (chips.length >= limit) break;
    }
  }
  return chips;
}

/** 比較表の1行分のデータ */
export interface CompareRow {
  name: string;
  slug: string;
  prefecture: string;
  scoring: ScoringMethodInfo;
  maxBasePoints: number;
  highlights: string[];
}

export function getMunicipalityCompareRow(m: Municipality): CompareRow {
  return {
    name: m.name,
    slug: m.slug,
    prefecture: m.prefecture,
    scoring: scoringMethodInfo(m.scoringMethod),
    maxBasePoints: m.maxBasePoints,
    highlights: getAdjustmentHighlights(m.slug),
  };
}
