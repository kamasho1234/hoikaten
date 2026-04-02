import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 千代田区 保育園入園 基準指数・調整指数データ
// 出典: 千代田区「保育園・こども園等の入園案内（令和7年度版）」
// ---------------------------------------------------------------------------

const municipality = {
  id: 'chiyoda',
  name: '千代田区',
  slug: 'chiyoda',
  prefecture: '東京都',
  maxBasePoints: 20, // 父母各10点
} as const;

// ---------------------------------------------------------------------------
// 保育が必要な理由ごとの選択肢テンプレート（父母各最大10点）
// ---------------------------------------------------------------------------

/** 就労 */
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '週5日以上かつ1日8時間以上', value: `${prefix}_employment_10`, points: 10 },
  { label: '週5日以上かつ1日6時間以上8時間未満', value: `${prefix}_employment_9`, points: 9 },
  { label: '週4日以上かつ1日8時間以上', value: `${prefix}_employment_9b`, points: 9 },
  { label: '週4日以上かつ1日6時間以上8時間未満', value: `${prefix}_employment_8`, points: 8 },
  { label: '週3日以上かつ1日8時間以上', value: `${prefix}_employment_8b`, points: 8 },
  { label: '週3日以上かつ1日4時間以上8時間未満', value: `${prefix}_employment_7`, points: 7 },
  { label: '月48時間以上（上記以外）', value: `${prefix}_employment_6`, points: 6 },
];

/** 疾病 */
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院1ヶ月以上／常時病臥', value: `${prefix}_illness_10`, points: 10 },
  { label: '一般療養（安静が必要）', value: `${prefix}_illness_8`, points: 8 },
  { label: '通院加療', value: `${prefix}_illness_6`, points: 6 },
];

/** 障害 */
const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '身体障害者手帳1・2級／愛の手帳1・2度', value: `${prefix}_disability_10`, points: 10 },
  { label: '身体障害者手帳3級／愛の手帳3度', value: `${prefix}_disability_8`, points: 8 },
  { label: '身体障害者手帳4級以下', value: `${prefix}_disability_6`, points: 6 },
];

/** 介護 */
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '週5日以上かつ1日8時間以上の介護', value: `${prefix}_care_10`, points: 10 },
  { label: '週4日以上かつ1日6時間以上の介護', value: `${prefix}_care_8`, points: 8 },
  { label: '週3日以上かつ1日4時間以上の介護', value: `${prefix}_care_6`, points: 6 },
];

/** 出産 */
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産前後（出産月の前後2ヶ月）', value: `${prefix}_childbirth_10`, points: 10 },
];

/** 就学 */
const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '週5日以上かつ1日8時間以上', value: `${prefix}_education_10`, points: 10 },
  { label: '週4日以上かつ1日4時間以上', value: `${prefix}_education_8`, points: 8 },
  { label: '月48時間以上（上記以外）', value: `${prefix}_education_6`, points: 6 },
];

/** 求職活動 */
const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動中', value: `${prefix}_jobseeking_4`, points: 4 },
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
      helpText: '週あたりの介護日数・時間を選んでください',
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
      { label: 'はい', value: 'adj_single_parent_yes', points: 3 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: 'きょうだいの保育園の状況は？',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_sibling_no', points: 0 },
      { label: 'きょうだいが在園中の園への転園を希望', value: 'adj_sibling_transfer', points: 3 },
      { label: 'きょうだいが在園中の園を希望', value: 'adj_sibling_same', points: 2 },
      { label: 'きょうだいと同時に申し込む', value: 'adj_sibling_simultaneous', points: 1 },
    ],
  },
  {
    id: 'adj_parental_leave',
    category: 'adjustment',
    label: '育休からの復帰予定の状況は？',
    helpText: '育休の長さに応じて加点が異なります',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_parental_leave_no', points: 0 },
      { label: '育休1年半以上で復帰予定', value: 'adj_parental_leave_18m', points: 2 },
      { label: '育休1年以上1年半未満で復帰予定', value: 'adj_parental_leave_12m', points: 1 },
    ],
  },
  {
    id: 'adj_waiting',
    category: 'adjustment',
    label: '待機期間がありますか？',
    helpText: '認可園に申込んで不承諾になった期間',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_waiting_no', points: 0 },
      { label: '6ヶ月以上待機', value: 'adj_waiting_6m', points: 2 },
      { label: '3ヶ月以上6ヶ月未満待機', value: 'adj_waiting_3m', points: 1 },
    ],
  },
  {
    id: 'adj_household_carer',
    category: 'adjustment',
    label: '同居の65歳未満で保育可能な方がいますか？',
    helpText: '保育ができる状態の方が同居している場合は減点になります',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_household_carer_no', points: 0 },
      { label: 'はい', value: 'adj_household_carer_yes', points: -1 },
    ],
  },
];

// ---------------------------------------------------------------------------
// エクスポート
// ---------------------------------------------------------------------------

export const chiyodaData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
