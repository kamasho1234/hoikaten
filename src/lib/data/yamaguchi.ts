import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 山口市 保育園入園 基本指数・調整指数データ
// ---------------------------------------------------------------------------
// Source: 山口市保育施設利用調整基準
// https://www.city.yamaguchi.lg.jp/uploaded/attachment/67122.pdf
//
// 山口市は「基本指数（最大100点 = 50+50の両親）」＋「調整指数」の二段階方式。
// 父母それぞれの基本指数を合算する（sum method）。
// ひとり親の場合、不在親は「不存在」50点を加算。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'yamaguchi',
  name: '山口市',
  slug: 'yamaguchi',
  prefecture: '山口県',
  maxBasePoints: 100, // 50点 × 2人
  scoringMethod: 'sum' as const, // 両親の基本指数を加算
} as const;

// ---------------------------------------------------------------------------
// 保育が必要な理由ごとの選択肢テンプレート
// ---------------------------------------------------------------------------

/** 就労 - 居宅外（外勤・居宅外自営） */
const employmentOutdoorOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_outdoor_none`, points: 0 },
  { label: '月160時間以上', value: `${prefix}_employment_outdoor_50`, points: 50 },
  { label: '月140時間以上160時間未満', value: `${prefix}_employment_outdoor_45`, points: 45 },
  { label: '月120時間以上140時間未満', value: `${prefix}_employment_outdoor_40`, points: 40 },
  { label: '月100時間以上120時間未満', value: `${prefix}_employment_outdoor_35`, points: 35 },
  { label: '月75時間以上100時間未満', value: `${prefix}_employment_outdoor_30`, points: 30 },
  { label: '月75時間未満', value: `${prefix}_employment_outdoor_25`, points: 25 },
];

/** 就労 - 居宅内（居宅内自営・在宅勤務） */
const employmentIndoorOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_indoor_none`, points: 0 },
  { label: '月160時間以上', value: `${prefix}_employment_indoor_45`, points: 45 },
  { label: '月140時間以上160時間未満', value: `${prefix}_employment_indoor_40`, points: 40 },
  { label: '月120時間以上140時間未満', value: `${prefix}_employment_indoor_35`, points: 35 },
  { label: '月100時間以上120時間未満', value: `${prefix}_employment_indoor_30`, points: 30 },
  { label: '月75時間以上100時間未満', value: `${prefix}_employment_indoor_25`, points: 25 },
  { label: '月75時間未満', value: `${prefix}_employment_indoor_20`, points: 20 },
];

/** 内職 */
const pieceWorkOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_piecework_none`, points: 0 },
  { label: '月75時間以上', value: `${prefix}_piecework_20`, points: 20 },
  { label: '月75時間未満', value: `${prefix}_piecework_15`, points: 15 },
];

/** 出産 */
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '産前8週・産後8週', value: `${prefix}_childbirth_30`, points: 30 },
];

/** 疾病 */
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '長期入院・常時病臥', value: `${prefix}_illness_50`, points: 50 },
  { label: '精神疾患', value: `${prefix}_illness_40`, points: 40 },
  { label: '日常生活に支障がある', value: `${prefix}_illness_30`, points: 30 },
  { label: '保育できない', value: `${prefix}_illness_20`, points: 20 },
];

/** 障がい */
const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '身体1級・精神1級・療育A', value: `${prefix}_disability_50`, points: 50 },
  { label: '身体2～3級・精神2～3級・療育B', value: `${prefix}_disability_40`, points: 40 },
  { label: '身体4級以下', value: `${prefix}_disability_25`, points: 25 },
];

/** 介護・看護 */
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '重度の看護（居宅内）', value: `${prefix}_care_45`, points: 45 },
  { label: '入院付き添い等（居宅外）', value: `${prefix}_care_50`, points: 50 },
];

/** 求職中 */
const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職中', value: `${prefix}_jobseeking_15`, points: 15 },
];

/** 就学 */
const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '通学・職業訓練中', value: `${prefix}_education_50`, points: 50 },
];

/** 不存在（死亡・離別等）*/
const absentParentOptions = (prefix: string) => [
  { label: 'いいえ', value: `${prefix}_absent_no`, points: 0 },
  { label: 'はい（親が不在）', value: `${prefix}_absent_yes`, points: 50 },
];

// ---------------------------------------------------------------------------
// 保護者ごとの質問を生成するヘルパー
// ---------------------------------------------------------------------------

function buildParentQuestions(
  parentNum: 1 | 2,
): Question[] {
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
      { label: 'あてはまらない', value: `${prefix}_reason_none`, points: 0 },
      { label: '仕事をしている（居宅外）', value: `${prefix}_reason_employment_outdoor`, points: 0 },
      { label: '仕事をしている（居宅内）', value: `${prefix}_reason_employment_indoor`, points: 0 },
      { label: '内職をしている', value: `${prefix}_reason_piecework`, points: 0 },
      { label: '出産の前後', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '病気の治療中', value: `${prefix}_reason_illness`, points: 0 },
      { label: '障害がある', value: `${prefix}_reason_disability`, points: 0 },
      { label: '家族の介護・看護をしている', value: `${prefix}_reason_care`, points: 0 },
      { label: '仕事を探している', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '学校に通っている', value: `${prefix}_reason_education`, points: 0 },
      { label: '親が不在（死亡・離別等）', value: `${prefix}_reason_absent`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment_outdoor`,
      category,
      label: `${parentLabel}：居宅外での就労時間は？`,
      helpText: '月ごとの合計就労時間を選んでください',
      inputType: 'radio',
      options: employmentOutdoorOptions(prefix),
    },
    {
      id: `${prefix}_employment_indoor`,
      category,
      label: `${parentLabel}：居宅内での就労時間は？`,
      helpText: '月ごとの合計就労時間を選んでください',
      inputType: 'radio',
      options: employmentIndoorOptions(prefix),
    },
    {
      id: `${prefix}_piecework`,
      category,
      label: `${parentLabel}：内職の時間は？`,
      helpText: '月ごとの合計就労時間を選んでください',
      inputType: 'radio',
      options: pieceWorkOptions(prefix),
    },
    {
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}の出産時期は？`,
      inputType: 'radio',
      options: childbirthOptions(prefix),
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
      label: `${parentLabel}の障害の状況は？`,
      inputType: 'radio',
      options: disabilityOptions(prefix),
    },
    {
      id: `${prefix}_care`,
      category,
      label: `${parentLabel}の介護・看護の内容は？`,
      inputType: 'radio',
      options: careOptions(prefix),
    },
    {
      id: `${prefix}_jobseeking`,
      category,
      label: `${parentLabel}は求職中ですか？`,
      inputType: 'radio',
      options: jobSeekingOptions(prefix),
    },
    {
      id: `${prefix}_education`,
      category,
      label: `${parentLabel}は学校に通っていますか？`,
      helpText: '就学・職業訓練などが該当します',
      inputType: 'radio',
      options: educationOptions(prefix),
    },
    {
      id: `${prefix}_absent`,
      category,
      label: `${parentLabel}は不在ですか？（死亡・離別等）`,
      inputType: 'radio',
      options: absentParentOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// ---------------------------------------------------------------------------
// 調整指数の質問（重要な8項目を選択）
// ---------------------------------------------------------------------------

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい', value: 'adj_single_parent_yes', points: 20 },
    ],
  },
  {
    id: 'adj_parental_leave_return',
    category: 'adjustment',
    label: '育休退所後、復帰再申込みですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_parental_leave_return_no', points: 0 },
      { label: 'はい', value: 'adj_parental_leave_return_yes', points: 16 },
    ],
  },
  {
    id: 'adj_sibling_apply',
    category: 'adjustment',
    label: 'きょうだい同時申込み、または既に在園していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_apply_no', points: 0 },
      { label: 'はい', value: 'adj_sibling_apply_yes', points: 6 },
    ],
  },
  {
    id: 'adj_child_disability',
    category: 'adjustment',
    label: '申込み児童本人が障がい児ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_child_disability_no', points: 0 },
      { label: 'はい', value: 'adj_child_disability_yes', points: 4 },
    ],
  },
  {
    id: 'adj_single_assignment',
    category: 'adjustment',
    label: '単身赴任等で親が不在ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_assignment_no', points: 0 },
      { label: 'はい', value: 'adj_single_assignment_yes', points: 4 },
    ],
  },
  {
    id: 'adj_waiting_period',
    category: 'adjustment',
    label: '待機期間が6ヶ月以上ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_waiting_period_no', points: 0 },
      { label: 'はい', value: 'adj_waiting_period_yes', points: 2 },
    ],
  },
  {
    id: 'adj_grandparent_cohabit',
    category: 'adjustment',
    label: '同居の祖父母が保育を協力できますか？（65歳未満、無職、疾病なし）',
    helpText: '保育協力が可能な場合は減点になります',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_grandparent_cohabit_no', points: 0 },
      { label: 'はい', value: 'adj_grandparent_cohabit_yes', points: -6 },
    ],
  },
  {
    id: 'adj_night_shift',
    category: 'adjustment',
    label: '夜間勤務（19:00～7:00）をしていますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_night_shift_no', points: 0 },
      { label: 'はい', value: 'adj_night_shift_yes', points: -1 },
    ],
  },
];

// ---------------------------------------------------------------------------
// エクスポート
// ---------------------------------------------------------------------------

export const yamaguchiData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
