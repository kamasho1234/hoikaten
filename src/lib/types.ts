// 保育園入園点数シミュレーター 型定義

export type ScoringMethod = "sum" | "min" | "avg";

export interface Municipality {
  id: string;
  name: string;
  slug: string;
  prefecture: string;
  maxBasePoints: number;
  scoringMethod?: ScoringMethod; // "sum"(加算・デフォルト) | "min"(低い方を採用) | "avg"(父母の平均)
  // 原典が世帯の基準指数に上限を定めている自治体で指定する
  // （例: 須恵町「父母それぞれの指数を合算し、世帯の指数を決定する。なお、基準指数の上限は150とする」）
  // 調整指数の加減算は、この上限適用後の基準指数に対して行われる
  baseCap?: number;
}

export interface QuestionOption {
  label: string;
  value: string;
  points: number;
}

export type QuestionCategory = 'parent1_base' | 'parent2_base' | 'adjustment';

export type InputType = 'radio' | 'select';

export interface Question {
  id: string;
  category: QuestionCategory;
  label: string;
  helpText?: string;
  inputType: InputType;
  options: QuestionOption[];
  // id が `${prefix}_${reason}` に一致する質問に加えて、
  // ここに挙げた reason サフィックス選択時にもこの質問を表示する
  showFor?: string[];
}

export interface MunicipalityData {
  municipality: Municipality;
  questions: Question[];
}

export interface SimulationResult {
  parent1Base: number;
  parent2Base: number;
  adjustment: number;
  // 採点方式（sum/min/avg）と baseCap を適用したあとの、世帯としての基準点。
  // 画面表示は必ずこの値を使う（Math.min 等を画面側で再計算すると、
  // ひとり親（保護者2未回答）や baseCap 適用時に計算結果と表示が食い違うため）
  householdBase: number;
  // 保護者2の回答が1つでもあるか（ひとり親判定に使用）
  hasParent2: boolean;
  total: number;
  breakdown: {
    questionId: string;
    label: string;
    points: number;
  }[];
}
