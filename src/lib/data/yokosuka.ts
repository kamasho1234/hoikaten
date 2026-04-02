import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 横須賀市 保育園入園 基本指数・優先利用指数データ
// ---------------------------------------------------------------------------
// 横須賀市は「基本指数（5〜70点）」＋「優先利用指数（0〜50点）」の方式。
// 父母それぞれに基本指数をつけ、低い方の指数をお子さんの指数とする。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'yokosuka',
  name: '横須賀市',
  slug: 'yokosuka',
  prefecture: '神奈川県',
  maxBasePoints: 70, // 基本指数の最大値
  scoringMethod: 'min' as const, // 低い方を採用
} as const;

// ---------------------------------------------------------------------------
// 基本指数の選択肢テンプレート
// ---------------------------------------------------------------------------

/** 就労 */
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月20日以上かつ1日8時間以上（月160時間以上）', value: `${prefix}_employment_70`, points: 70 },
  { label: '月20日以上かつ1日6時間以上（月120時間以上）', value: `${prefix}_employment_60`, points: 60 },
  { label: '月16日以上かつ1日6時間以上（月96時間以上）', value: `${prefix}_employment_50`, points: 50 },
  { label: '月16日以上かつ1日4時間以上（月64時間以上）', value: `${prefix}_employment_40`, points: 40 },
  { label: '月12日以上かつ1日4時間以上（月48時間以上）', value: `${prefix}_employment_30`, points: 30 },
];

/** 疾病 */
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院中・常時病臥', value: `${prefix}_illness_70`, points: 70 },
  { label: '通院加療（安静が必要）', value: `${prefix}_illness_50`, points: 50 },
  { label: '一般通院', value: `${prefix}_illness_30`, points: 30 },
];

/** 障害 */
const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '重度（身体1・2級/療育A/精神1級）', value: `${prefix}_disability_70`, points: 70 },
  { label: '中度（身体3級/療育B/精神2級）', value: `${prefix}_disability_50`, points: 50 },
  { label: '軽度', value: `${prefix}_disability_30`, points: 30 },
];

/** 介護・看護 */
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '常時介護が必要', value: `${prefix}_care_70`, points: 70 },
  { label: '週3日以上の介護', value: `${prefix}_care_50`, points: 50 },
  { label: 'それ以外', value: `${prefix}_care_30`, points: 30 },
];

/** 出産 */
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産前後（産前6週〜産後8週）', value: `${prefix}_childbirth_40`, points: 40 },
];

/** 就学 */
const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '就学・職業訓練（月120時間以上）', value: `${prefix}_education_60`, points: 60 },
  { label: '就学・職業訓練（月64時間以上）', value: `${prefix}_education_40`, points: 40 },
];

/** 求職活動 */
const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動中', value: `${prefix}_jobseeking_5`, points: 5 },
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
      helpText: '横須賀市では月あたりの勤務日数と就労時間で基本指数が決まります',
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
      label: `${parentLabel}は求職活動をしていますか？`,
      inputType: 'radio',
      options: jobSeekingOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// ---------------------------------------------------------------------------
// 優先利用指数の質問
// ---------------------------------------------------------------------------

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい', value: 'adj_single_parent_yes', points: 10 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: 'きょうだいの保育施設の状況は？',
    helpText: 'きょうだいが通う施設を第1希望にした場合に加点されます',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_sibling_no', points: 0 },
      { label: 'きょうだいが通う施設を第1希望にした', value: 'adj_sibling_same', points: 10 },
      { label: 'きょうだいと同時に同じ施設を第1希望にした', value: 'adj_sibling_simultaneous', points: 5 },
    ],
  },
  {
    id: 'adj_unlicensed_nursery',
    category: 'adjustment',
    label: '認可外保育施設に預けていますか？',
    helpText: '申込時に認可外保育施設を利用している場合です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unlicensed_nursery_no', points: 0 },
      { label: 'はい', value: 'adj_unlicensed_nursery_yes', points: 5 },
    ],
  },
  {
    id: 'adj_hoikushi',
    category: 'adjustment',
    label: '保護者が認可保育施設に勤務する保育士ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_hoikushi_no', points: 0 },
      { label: 'はい', value: 'adj_hoikushi_yes', points: 10 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護を受けていますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい', value: 'adj_welfare_yes', points: 10 },
    ],
  },
  {
    id: 'adj_grandparent_cohabit',
    category: 'adjustment',
    label: '65歳未満の同居親族に子どもの面倒を見られる方がいますか？',
    helpText: '同居の祖父母などが保育可能な場合は減点になります',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_grandparent_cohabit_no', points: 0 },
      { label: 'はい', value: 'adj_grandparent_cohabit_yes', points: -5 },
    ],
  },
];

// ---------------------------------------------------------------------------
// エクスポート
// ---------------------------------------------------------------------------

export const yokosukaData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
