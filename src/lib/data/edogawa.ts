import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 江戸川区 保育園入園 利用調整指数データ
// ---------------------------------------------------------------------------

const municipality = {
  id: 'edogawa',
  name: '江戸川区',
  slug: 'edogawa',
  prefecture: '東京都',
  maxBasePoints: 100, // 父母各50点
} as const;

// ---------------------------------------------------------------------------
// 保育が必要な理由ごとの選択肢テンプレート
// ---------------------------------------------------------------------------

/** 就労（居宅外） */
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月20日以上・7時間以上（居宅外）', value: `${prefix}_employment_50`, points: 50 },
  { label: '月20日以上・5時間以上7時間未満（居宅外）', value: `${prefix}_employment_45`, points: 45 },
  { label: '月16日以上・7時間以上（居宅外）', value: `${prefix}_employment_40a`, points: 40 },
  { label: '月20日以上・4時間以上5時間未満（居宅外）', value: `${prefix}_employment_40b`, points: 40 },
  { label: '月16日以上・5時間以上7時間未満（居宅外）', value: `${prefix}_employment_35`, points: 35 },
  { label: '月12日以上・7時間以上（居宅外）', value: `${prefix}_employment_30a`, points: 30 },
  { label: '月16日以上・4時間以上5時間未満（居宅外）', value: `${prefix}_employment_30b`, points: 30 },
  { label: '月12日以上・5時間以上7時間未満（居宅外）', value: `${prefix}_employment_25`, points: 25 },
  { label: '月20日以上・7時間以上（居宅内）', value: `${prefix}_employment_45c`, points: 45 },
  { label: '月20日以上・5時間以上7時間未満（居宅内）', value: `${prefix}_employment_40c`, points: 40 },
  { label: '月16日以上・7時間以上（居宅内）', value: `${prefix}_employment_35c`, points: 35 },
  { label: '月16日以上・5時間以上7時間未満（居宅内）', value: `${prefix}_employment_30c`, points: 30 },
  { label: '月12日以上・5時間以上（居宅内）', value: `${prefix}_employment_25c`, points: 25 },
];

/** 疾病 */
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院1ヶ月以上・常時病臥', value: `${prefix}_illness_50`, points: 50 },
  { label: '一般療養（安静必要）', value: `${prefix}_illness_35`, points: 35 },
  { label: '通院加療', value: `${prefix}_illness_20`, points: 20 },
];

/** 障害 */
const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '身体障害者手帳1・2級等', value: `${prefix}_disability_50`, points: 50 },
  { label: '身体障害者手帳3級等', value: `${prefix}_disability_35`, points: 35 },
  { label: '身体障害者手帳4級以下', value: `${prefix}_disability_20`, points: 20 },
];

/** 介護 */
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '付添い介護（月20日以上・7時間以上）', value: `${prefix}_care_50`, points: 50 },
  { label: '付添い介護（月16日以上・5時間以上）', value: `${prefix}_care_30`, points: 30 },
  { label: '付添い介護（月12日以上）', value: `${prefix}_care_20`, points: 20 },
];

/** 出産 */
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産前後', value: `${prefix}_childbirth_35`, points: 35 },
];

/** 就学 */
const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '月20日以上・7時間以上の就学', value: `${prefix}_education_50`, points: 50 },
  { label: '月16日以上・5時間以上の就学', value: `${prefix}_education_35`, points: 35 },
  { label: 'その他就学', value: `${prefix}_education_20`, points: 20 },
];

/** 求職活動 */
const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職中', value: `${prefix}_jobseeking_15`, points: 15 },
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
      helpText: '勤務場所・日数・時間を選んでください',
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
    helpText: 'ひとり親の場合、不存在50点＋調整10点が加算されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい', value: 'adj_single_parent_yes', points: 60 },
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
    id: 'adj_sibling',
    category: 'adjustment',
    label: 'きょうだいが希望する保育園に在園中ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_no', points: 0 },
      { label: 'はい', value: 'adj_sibling_yes', points: 6 },
    ],
  },
  {
    id: 'adj_multi_children',
    category: 'adjustment',
    label: '未就学児が3人以上いますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_multi_children_no', points: 0 },
      { label: 'はい', value: 'adj_multi_children_yes', points: 1 },
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
      { label: 'はい', value: 'adj_unlicensed_nursery_yes', points: 1 },
    ],
  },
  {
    id: 'adj_parental_leave',
    category: 'adjustment',
    label: '育休・産休から復帰する予定ですか？',
    helpText: '入園する月に職場復帰する場合',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_parental_leave_no', points: 0 },
      { label: 'はい', value: 'adj_parental_leave_yes', points: 1 },
    ],
  },
  {
    id: 'adj_grandparent',
    category: 'adjustment',
    label: '60歳未満の同居の祖父母が無職ですか？',
    helpText: '保育可能な祖父母が同居している場合は減点されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_grandparent_no', points: 0 },
      { label: 'はい', value: 'adj_grandparent_yes', points: -6 },
    ],
  },
];

// ---------------------------------------------------------------------------
// エクスポート
// ---------------------------------------------------------------------------

export const edogawaData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
