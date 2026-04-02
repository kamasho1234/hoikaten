import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 大田区 保育園入園 利用調整基準指数・調整指数データ
// ---------------------------------------------------------------------------

const municipality = {
  id: 'ota',
  name: '大田区',
  slug: 'ota',
  prefecture: '東京都',
  maxBasePoints: 22, // 父母各11点
} as const;

// ---------------------------------------------------------------------------
// 保育が必要な理由ごとの選択肢テンプレート
// ---------------------------------------------------------------------------

/** 就労（外勤・自営） */
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月20日以上・月160時間以上', value: `${prefix}_employment_11`, points: 11 },
  { label: '月20日以上・月140〜160時間', value: `${prefix}_employment_10`, points: 10 },
  { label: '月20日以上・月120〜140時間', value: `${prefix}_employment_9a`, points: 9 },
  { label: '月16〜19日・月128時間以上', value: `${prefix}_employment_9b`, points: 9 },
  { label: '月20日以上・月100〜120時間', value: `${prefix}_employment_8a`, points: 8 },
  { label: '月16〜19日・月112〜128時間', value: `${prefix}_employment_8b`, points: 8 },
  { label: '月20日以上・月80〜100時間', value: `${prefix}_employment_7a`, points: 7 },
  { label: '月16〜19日・月96〜112時間', value: `${prefix}_employment_7b`, points: 7 },
  { label: '月16〜19日・月64〜96時間', value: `${prefix}_employment_6`, points: 6 },
  { label: '月48時間以上（上記以外）', value: `${prefix}_employment_5`, points: 5 },
];

/** 疾病 */
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院・常時病臥', value: `${prefix}_illness_11`, points: 11 },
  { label: '一般療養（安静必要）', value: `${prefix}_illness_7`, points: 7 },
  { label: '通院加療', value: `${prefix}_illness_5`, points: 5 },
];

/** 障害 */
const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '身体障害者手帳1〜3級等', value: `${prefix}_disability_11`, points: 11 },
  { label: '身体障害者手帳4級', value: `${prefix}_disability_9`, points: 9 },
  { label: 'その他', value: `${prefix}_disability_7`, points: 7 },
];

/** 介護 */
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '自宅での重度心身障害者等の介護', value: `${prefix}_care_11`, points: 11 },
  { label: '通院・通所の付添い（週3日以上）', value: `${prefix}_care_7`, points: 7 },
  { label: '入院・入所の付添い（週3日以上）', value: `${prefix}_care_5`, points: 5 },
];

/** 出産 */
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産前後', value: `${prefix}_childbirth_4`, points: 4 },
];

/** 就学 */
const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '月20日以上・月160時間以上の就学', value: `${prefix}_education_11`, points: 11 },
  { label: '月16日以上・月128時間以上の就学', value: `${prefix}_education_9`, points: 9 },
  { label: 'その他就学', value: `${prefix}_education_5`, points: 5 },
];

/** 求職活動 */
const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職中（週5日以上活動予定）', value: `${prefix}_jobseeking_4`, points: 4 },
  { label: '求職中（その他）', value: `${prefix}_jobseeking_1`, points: 1 },
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
      helpText: '月あたりの勤務日数・時間を選んでください',
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
      label: `${parentLabel}はどのくらい学校に通っていますか？`,
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
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親ですか？',
    helpText: 'ひとり親の場合、不存在11点＋調整3点が加算されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい', value: 'adj_single_parent_yes', points: 14 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護を受けていますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい', value: 'adj_welfare_yes', points: 3 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: 'きょうだいが認可保育園に通っている、または同時に申し込みますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_no', points: 0 },
      { label: 'はい', value: 'adj_sibling_yes', points: 2 },
    ],
  },
  {
    id: 'adj_nursery_worker',
    category: 'adjustment',
    label: '保護者が保育士として勤務していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_nursery_worker_no', points: 0 },
      { label: 'はい', value: 'adj_nursery_worker_yes', points: 2 },
    ],
  },
  {
    id: 'adj_unlicensed_nursery',
    category: 'adjustment',
    label: '認可外の保育施設に月ぎめで預けていますか？',
    helpText: '有償で月ぎめ利用している場合',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unlicensed_nursery_no', points: 0 },
      { label: 'はい', value: 'adj_unlicensed_nursery_yes', points: 2 },
    ],
  },
  {
    id: 'adj_parent_disability',
    category: 'adjustment',
    label: '保護者に身体障害者手帳等がありますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_parent_disability_no', points: 0 },
      { label: 'はい（1〜2級）', value: 'adj_parent_disability_12', points: 3 },
      { label: 'はい（3級）', value: 'adj_parent_disability_3', points: 2 },
    ],
  },
  {
    id: 'adj_grandparent_nearby',
    category: 'adjustment',
    label: '保育可能な祖父母等が500m以内に住んでいますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_grandparent_nearby_no', points: 0 },
      { label: 'はい', value: 'adj_grandparent_nearby_yes', points: -1 },
    ],
  },
];

// ---------------------------------------------------------------------------
// エクスポート
// ---------------------------------------------------------------------------

export const otaData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
