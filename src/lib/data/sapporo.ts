import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 札幌市 保育園入園 基本点数・調整指数データ
// ---------------------------------------------------------------------------

const municipality = {
  id: 'sapporo',
  name: '札幌市',
  slug: 'sapporo',
  prefecture: '北海道',
  maxBasePoints: 200, // 父母各100点
} as const;

// ---------------------------------------------------------------------------
// 保育が必要な理由ごとの選択肢テンプレート
// ---------------------------------------------------------------------------

/** 就労 */
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月150時間以上（週5日相当）', value: `${prefix}_employment_100`, points: 100 },
  { label: '月120時間以上〜150時間未満', value: `${prefix}_employment_90`, points: 90 },
  { label: '月80時間以上〜120時間未満', value: `${prefix}_employment_85`, points: 85 },
  { label: '月64時間以上〜80時間未満', value: `${prefix}_employment_80`, points: 80 },
  { label: '月64時間以上（日数少なめ）', value: `${prefix}_employment_70`, points: 70 },
];

/** 疾病 */
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院中・常時臥床', value: `${prefix}_illness_100`, points: 100 },
  { label: '月に何度も通院して治療を受けている', value: `${prefix}_illness_70`, points: 70 },
  { label: 'その他の自宅療養', value: `${prefix}_illness_50`, points: 50 },
];

/** 障害 */
const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '身体1〜2級 / 精神1〜2級 / 知的A', value: `${prefix}_disability_100`, points: 100 },
  { label: '聴覚障害3〜6級', value: `${prefix}_disability_70`, points: 70 },
];

/** 介護・看護 */
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '障害児施設への付添い', value: `${prefix}_care_80`, points: 80 },
  { label: '病院への付添い・自宅で介護', value: `${prefix}_care_70`, points: 70 },
];

/** 出産 */
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産の前後', value: `${prefix}_childbirth_100`, points: 100 },
];

/** 就学 */
const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '月120時間以上', value: `${prefix}_education_80`, points: 80 },
  { label: '月64時間以上', value: `${prefix}_education_70`, points: 70 },
];

/** 求職活動 */
const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動中', value: `${prefix}_jobseeking_50`, points: 50 },
];

// ---------------------------------------------------------------------------
// 保護者ごとの質問を生成するヘルパー
// ---------------------------------------------------------------------------

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  // 「保育が必要な理由」の大分類選択
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

  // 各理由の詳細質問
  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}はどのくらい働いていますか？`,
      helpText: '月あたりの労働時間を選んでください',
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
      label: `${parentLabel}はどのような介護をしていますか？`,
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
      label: `${parentLabel}はどのくらい学校に通っていますか？`,
      helpText: '月あたりの通学時間を選んでください',
      inputType: 'radio',
      options: educationOptions(prefix),
    },
    {
      id: `${prefix}_jobseeking`,
      category,
      label: `${parentLabel}は求職活動をしていますか？`,
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
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい', value: 'adj_single_parent_yes', points: 120 },
    ],
  },
  {
    id: 'adj_sibling_parental_leave',
    category: 'adjustment',
    label: 'きょうだいや育休について当てはまるものはありますか？',
    helpText: 'もっとも当てはまるものをひとつ選んでください',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_sibling_parental_leave_none', points: 0 },
      { label: 'きょうだいが在園中で、育休から復帰する', value: 'adj_sibling_parental_leave_100', points: 100 },
      { label: 'きょうだいが在園中', value: 'adj_sibling_parental_leave_80', points: 80 },
      { label: '育休から復帰する', value: 'adj_sibling_parental_leave_40', points: 40 },
      { label: 'きょうだいと同時に申し込む（双子など）', value: 'adj_sibling_parental_leave_30', points: 30 },
    ],
  },
  {
    id: 'adj_disability_household',
    category: 'adjustment',
    label: '障害のある方と同居していますか？',
    helpText: '障害者手帳をお持ちの方が同じ世帯にいる場合です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_disability_household_no', points: 0 },
      { label: 'はい', value: 'adj_disability_household_yes', points: 10 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護を受けている、または市民税の所得割が少額ですか？',
    helpText: '生活保護世帯、または市民税所得割額が48,600円未満の場合',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい', value: 'adj_welfare_yes', points: 10 },
    ],
  },
];

// ---------------------------------------------------------------------------
// エクスポート
// ---------------------------------------------------------------------------

export const sapporoData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
