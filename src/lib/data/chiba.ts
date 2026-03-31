import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 千葉市 保育園入園 基準点・調整指数データ
// ---------------------------------------------------------------------------

const municipality = {
  id: 'chiba',
  name: '千葉市',
  slug: 'chiba',
  prefecture: '千葉県',
  maxBasePoints: 44, // 就労22+22
} as const;

// ---------------------------------------------------------------------------
// 基準点の選択肢テンプレート（父母それぞれ最大25点）
// ---------------------------------------------------------------------------

/** 就労 */
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月160時間以上', value: `${prefix}_employment_22`, points: 22 },
  { label: '月120〜160時間', value: `${prefix}_employment_20`, points: 20 },
  { label: '月80〜120時間', value: `${prefix}_employment_18`, points: 18 },
  { label: '月64〜80時間', value: `${prefix}_employment_16`, points: 16 },
];

/** 疾病 */
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '長期入院・常時病臥', value: `${prefix}_illness_25`, points: 25 },
  { label: '毎週通院', value: `${prefix}_illness_15`, points: 15 },
  { label: 'その他', value: `${prefix}_illness_10`, points: 10 },
];

/** 障害 */
const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '重度（身体1-2級/療育A/精神1級）', value: `${prefix}_disability_25`, points: 25 },
  { label: '中度（身体3級/療育B1/精神2級）', value: `${prefix}_disability_23`, points: 23 },
  { label: 'その他', value: `${prefix}_disability_15`, points: 15 },
];

/** 介護（きょうだい以外） */
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '入院付添', value: `${prefix}_care_18`, points: 18 },
  { label: '重度障害・寝たきりの方の介護', value: `${prefix}_care_16`, points: 16 },
  { label: 'その他', value: `${prefix}_care_15`, points: 15 },
];

/** 出産 */
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産前後', value: `${prefix}_childbirth_13`, points: 13 },
];

/** 就学 */
const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '職業訓練', value: `${prefix}_education_15`, points: 15 },
  { label: 'その他（大学・専門学校等）', value: `${prefix}_education_12`, points: 12 },
];

/** 求職活動 */
const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職中', value: `${prefix}_jobseeking_7`, points: 7 },
];

// ---------------------------------------------------------------------------
// 保護者ごとの質問を生成するヘルパー
// ---------------------------------------------------------------------------

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: 'いちばん近いものをひとつ選んでください',
    inputType: 'select',
    options: [
      { label: '仕事をしている', value: `${prefix}_reason_employment`, points: 0 },
      { label: '病気の治療中', value: `${prefix}_reason_illness`, points: 0 },
      { label: '障害がある', value: `${prefix}_reason_disability`, points: 0 },
      { label: '家族の介護をしている', value: `${prefix}_reason_care`, points: 0 },
      { label: '出産の前後', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '学校に通っている', value: `${prefix}_reason_education`, points: 0 },
      { label: '仕事を探している', value: `${prefix}_reason_jobseeking`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}はどのくらい働いていますか？`,
      helpText: '月あたりの就労時間を選んでください',
      inputType: 'radio',
      options: employmentOptions(prefix),
    },
    {
      id: `${prefix}_illness`,
      category,
      label: `${parentLabel}の病気の状況は？`,
      inputType: 'radio',
      options: illnessOptions(prefix),
    },
    {
      id: `${prefix}_disability`,
      category,
      label: `${parentLabel}の障害の程度は？`,
      inputType: 'radio',
      options: disabilityOptions(prefix),
    },
    {
      id: `${prefix}_care`,
      category,
      label: `${parentLabel}はどのくらい介護していますか？`,
      helpText: '介護の状況を選んでください',
      inputType: 'radio',
      options: careOptions(prefix),
    },
    {
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}の出産時期は？`,
      inputType: 'radio',
      options: childbirthOptions(prefix),
    },
    {
      id: `${prefix}_education`,
      category,
      label: `${parentLabel}はどのような学校に通っていますか？`,
      inputType: 'radio',
      options: educationOptions(prefix),
    },
    {
      id: `${prefix}_jobseeking`,
      category,
      label: `${parentLabel}は仕事を探していますか？`,
      inputType: 'radio',
      options: jobSeekingOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// ---------------------------------------------------------------------------
// 調整指数の質問
// ---------------------------------------------------------------------------

const adjustmentQuestions: Question[] = [
  // ひとり親（不存在扱い +25）
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい', value: 'adj_single_parent_yes', points: 25 },
    ],
  },
  // 調整指数1（最も高い1つのみ適用）
  {
    id: 'adj_index1',
    category: 'adjustment',
    label: '次のいずれかにあてはまりますか？（1つだけ選択）',
    helpText: '複数あてはまる場合は点数が高い方を選んでください',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_index1_none', points: 0 },
      { label: '認可外保育施設を月64時間以上利用している', value: 'adj_index1_unlicensed', points: 4 },
      { label: '育休から復帰予定', value: 'adj_index1_parental_leave', points: 3 },
    ],
  },
  // 調整指数2：週5日勤務
  {
    id: 'adj_weekday5',
    category: 'adjustment',
    label: '週5日以上勤務していますか？',
    helpText: '父母それぞれ+1点',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_weekday5_none', points: 0 },
      { label: '片方のみ週5日以上', value: 'adj_weekday5_one', points: 1 },
      { label: '両親とも週5日以上', value: 'adj_weekday5_both', points: 2 },
    ],
  },
  // 調整指数2：きょうだい
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: 'きょうだいの状況は？',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_sibling_none', points: 0 },
      { label: 'きょうだいが同一施設を利用中', value: 'adj_sibling_same', points: 6 },
      { label: 'きょうだいと同時に申し込む', value: 'adj_sibling_simultaneous', points: 6 },
    ],
  },
  // 調整指数2：同居の65歳未満家庭保育可能者
  {
    id: 'adj_household_carer',
    category: 'adjustment',
    label: '同居の65歳未満で保育可能な方がいますか？',
    helpText: '祖父母など、家庭で保育できる方が同居している場合',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_household_carer_no', points: 0 },
      { label: 'はい', value: 'adj_household_carer_yes', points: -3 },
    ],
  },
];

// ---------------------------------------------------------------------------
// エクスポート
// ---------------------------------------------------------------------------

export const chibaData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
