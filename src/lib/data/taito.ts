import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 台東区 保育園入園 基本指数・調整指数データ
// 出典: 台東区保育利用のご案内（令和7年度版）
// https://www.city.taito.lg.jp/kosodatekyouiku/kosodate/mokutei/hoiku_youjikyouiku/hoikutakuji/hoikuen/hoikuennogoannai/nyushokijyun.html
// ---------------------------------------------------------------------------

const municipality = {
  id: 'taito',
  name: '台東区',
  slug: 'taito',
  prefecture: '東京都',
  maxBasePoints: 40, // 父母各20点（ひとり親の場合は基本指数に+20）
} as const;

// ---------------------------------------------------------------------------
// 保育が必要な理由ごとの選択肢テンプレート（父母各最大20点）
// ---------------------------------------------------------------------------

/** 就労 */
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月20日以上かつ1日8時間以上', value: `${prefix}_employment_20`, points: 20 },
  { label: '月20日以上かつ1日7時間以上8時間未満', value: `${prefix}_employment_19`, points: 19 },
  { label: '月20日以上かつ1日6時間以上7時間未満', value: `${prefix}_employment_18`, points: 18 },
  { label: '月20日以上かつ1日5時間以上6時間未満', value: `${prefix}_employment_17`, points: 17 },
  { label: '月20日以上かつ1日4時間以上5時間未満', value: `${prefix}_employment_16`, points: 16 },
  { label: '月16日以上かつ1日8時間以上', value: `${prefix}_employment_18b`, points: 18 },
  { label: '月16日以上かつ1日6時間以上8時間未満', value: `${prefix}_employment_16b`, points: 16 },
  { label: '月16日以上かつ1日4時間以上6時間未満', value: `${prefix}_employment_14`, points: 14 },
  { label: '月12日以上かつ1日8時間以上', value: `${prefix}_employment_16c`, points: 16 },
  { label: '月12日以上かつ1日6時間以上8時間未満', value: `${prefix}_employment_14b`, points: 14 },
  { label: '月12日以上かつ1日4時間以上6時間未満', value: `${prefix}_employment_12`, points: 12 },
  { label: '月48時間以上（上記以外）', value: `${prefix}_employment_10`, points: 10 },
];

/** 疾病 */
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院2ヶ月以上／常時病臥', value: `${prefix}_illness_20`, points: 20 },
  { label: '入院2ヶ月未満', value: `${prefix}_illness_16`, points: 16 },
  { label: '一般療養（安静が必要）', value: `${prefix}_illness_14`, points: 14 },
  { label: '通院加療（定期的）', value: `${prefix}_illness_10`, points: 10 },
];

/** 障害 */
const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '身体障害者手帳1・2級／愛の手帳1〜3度', value: `${prefix}_disability_20`, points: 20 },
  { label: '身体障害者手帳3級／愛の手帳4度', value: `${prefix}_disability_16`, points: 16 },
  { label: '身体障害者手帳4級以下', value: `${prefix}_disability_12`, points: 12 },
];

/** 介護 */
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '常時介護が必要な親族の介護（月20日以上・1日8時間以上）', value: `${prefix}_care_20`, points: 20 },
  { label: '月20日以上・1日4時間以上の介護', value: `${prefix}_care_18`, points: 18 },
  { label: '月16日以上・1日4時間以上の介護', value: `${prefix}_care_16`, points: 16 },
  { label: '月12日以上・1日4時間以上の介護', value: `${prefix}_care_14`, points: 14 },
  { label: '月48時間以上の介護（上記以外）', value: `${prefix}_care_10`, points: 10 },
];

/** 出産 */
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産前後（出産月の前後2ヶ月）', value: `${prefix}_childbirth_12`, points: 12 },
];

/** 就学 */
const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '月20日以上かつ1日8時間以上の就学・職業訓練', value: `${prefix}_education_20`, points: 20 },
  { label: '月20日以上かつ1日4時間以上の就学', value: `${prefix}_education_16`, points: 16 },
  { label: '月16日以上かつ1日4時間以上の就学', value: `${prefix}_education_14`, points: 14 },
  { label: '月48時間以上（上記以外）', value: `${prefix}_education_10`, points: 10 },
];

/** 求職活動 */
const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動中', value: `${prefix}_jobseeking_8`, points: 8 },
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
      helpText: 'いちばん近い働き方を選んでください',
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
      helpText: '月あたりの介護日数・時間を選んでください',
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
      helpText: '月あたりの通学日数・時間を選んでください',
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
    label: 'ひとり親世帯ですか？',
    helpText: '母子家庭・父子家庭の場合（基本指数に20点加算されます）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい', value: 'adj_single_parent_yes', points: 20 },
    ],
  },
  {
    id: 'adj_unlicensed_nursery',
    category: 'adjustment',
    label: '認可外保育施設（認証保育所等）に月ぎめで預けていますか？',
    helpText: '週3日・昼間4時間以上、有償で預けている場合',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unlicensed_nursery_no', points: 0 },
      { label: 'はい', value: 'adj_unlicensed_nursery_yes', points: 8 },
    ],
  },
  {
    id: 'adj_parental_leave',
    category: 'adjustment',
    label: '育休・産休から復帰する予定ですか？',
    helpText: '入園月中に職場復帰する場合',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_parental_leave_no', points: 0 },
      { label: 'はい', value: 'adj_parental_leave_yes', points: 7 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: 'きょうだいが認可保育園に在園中ですか？',
    helpText: '希望する保育施設にきょうだいが在園中の場合',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_no', points: 0 },
      { label: 'はい', value: 'adj_sibling_yes', points: 4 },
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
    id: 'adj_single_assignment',
    category: 'adjustment',
    label: 'パパ・ママのどちらかが単身赴任中ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_assignment_no', points: 0 },
      { label: 'はい', value: 'adj_single_assignment_yes', points: 2 },
    ],
  },
];

// ---------------------------------------------------------------------------
// エクスポート
// ---------------------------------------------------------------------------

export const taitoData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
