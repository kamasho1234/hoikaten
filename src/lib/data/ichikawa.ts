import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 市川市 保育園入園 基準点・調整指数データ
// ---------------------------------------------------------------------------

const municipality = {
  id: 'ichikawa',
  name: '市川市',
  slug: 'ichikawa',
  prefecture: '千葉県',
  maxBasePoints: 40, // 就労20+20
} as const;

// ---------------------------------------------------------------------------
// 基準点の選択肢テンプレート（父母それぞれ最大20点）
// ---------------------------------------------------------------------------

/** 就労 */
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月20日以上かつ日8時間以上', value: `${prefix}_employment_20`, points: 20 },
  { label: '月20日以上かつ日6時間以上', value: `${prefix}_employment_18`, points: 18 },
  { label: '月16日以上かつ日6時間以上', value: `${prefix}_employment_16`, points: 16 },
  { label: '月16日以上かつ日4時間以上', value: `${prefix}_employment_14`, points: 14 },
  { label: '月12日以上かつ日4時間以上', value: `${prefix}_employment_12`, points: 12 },
  { label: '月64時間以上', value: `${prefix}_employment_10`, points: 10 },
];

/** 疾病 */
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '長期入院・常時病臥', value: `${prefix}_illness_20`, points: 20 },
  { label: '毎週通院・安静が必要', value: `${prefix}_illness_16`, points: 16 },
  { label: 'その他', value: `${prefix}_illness_12`, points: 12 },
];

/** 障害 */
const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '重度（身体1-2級/療育A/精神1級）', value: `${prefix}_disability_20`, points: 20 },
  { label: '中度（身体3級/療育B/精神2級）', value: `${prefix}_disability_16`, points: 16 },
  { label: 'その他', value: `${prefix}_disability_12`, points: 12 },
];

/** 介護 */
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '重度障害・寝たきりの方の介護', value: `${prefix}_care_20`, points: 20 },
  { label: '入院付添・週3日以上の介護', value: `${prefix}_care_16`, points: 16 },
  { label: 'その他', value: `${prefix}_care_12`, points: 12 },
];

/** 出産 */
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産前後', value: `${prefix}_childbirth_16`, points: 16 },
];

/** 就学 */
const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '月20日以上かつ日8時間以上', value: `${prefix}_education_20`, points: 20 },
  { label: '月20日以上かつ日6時間以上', value: `${prefix}_education_18`, points: 18 },
  { label: '月16日以上かつ日6時間以上', value: `${prefix}_education_16`, points: 16 },
  { label: '月16日以上かつ日4時間以上', value: `${prefix}_education_14`, points: 14 },
  { label: '月12日以上かつ日4時間以上', value: `${prefix}_education_12`, points: 12 },
  { label: '月64時間以上', value: `${prefix}_education_10`, points: 10 },
];

/** 求職活動 */
const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職中', value: `${prefix}_jobseeking_6`, points: 6 },
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
      helpText: '月あたりの就労日数・時間を選んでください',
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
      helpText: '就学の頻度を選んでください',
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
  // ひとり親 +5
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい', value: 'adj_single_parent_yes', points: 5 },
    ],
  },
  // きょうだいが在園中 +3
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: 'きょうだいが希望する認可保育園に在園していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_no', points: 0 },
      { label: 'はい', value: 'adj_sibling_yes', points: 3 },
    ],
  },
  // きょうだい同時申込 +2
  {
    id: 'adj_sibling_simultaneous',
    category: 'adjustment',
    label: 'きょうだいと同時に申し込みますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_simultaneous_no', points: 0 },
      { label: 'はい', value: 'adj_sibling_simultaneous_yes', points: 2 },
    ],
  },
  // 認可外保育施設の利用 +3
  {
    id: 'adj_unlicensed',
    category: 'adjustment',
    label: '認可外保育施設に月ぎめで預けていますか？',
    helpText: '認証保育所・認可外保育施設などの利用実績',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unlicensed_no', points: 0 },
      { label: 'はい', value: 'adj_unlicensed_yes', points: 3 },
    ],
  },
  // 育休復帰予定 +2
  {
    id: 'adj_parental_leave',
    category: 'adjustment',
    label: '育休から入園月に復帰予定ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_parental_leave_no', points: 0 },
      { label: 'はい', value: 'adj_parental_leave_yes', points: 2 },
    ],
  },
  // 生活保護 +3
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護を受給していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい', value: 'adj_welfare_yes', points: 3 },
    ],
  },
  // 市外からの申込 -10
  {
    id: 'adj_outside_city',
    category: 'adjustment',
    label: '市川市外から申し込みますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ（市川市在住）', value: 'adj_outside_city_no', points: 0 },
      { label: 'はい（市外から）', value: 'adj_outside_city_yes', points: -10 },
    ],
  },
  // 同居の保育可能者 -3
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
  // 転園希望 -5
  {
    id: 'adj_transfer',
    category: 'adjustment',
    label: '現在認可保育園に在園中で転園を希望していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_transfer_no', points: 0 },
      { label: 'はい', value: 'adj_transfer_yes', points: -5 },
    ],
  },
];

// ---------------------------------------------------------------------------
// エクスポート
// ---------------------------------------------------------------------------

export const ichikawaData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
