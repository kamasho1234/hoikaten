// 保育園入園点数シミュレーター 型定義

export type ScoringMethod = "sum" | "min";

export interface Municipality {
  id: string;
  name: string;
  slug: string;
  prefecture: string;
  maxBasePoints: number;
  scoringMethod?: ScoringMethod; // "sum"(加算・デフォルト) | "min"(低い方を採用)
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
  total: number;
  breakdown: {
    questionId: string;
    label: string;
    points: number;
  }[];
}
