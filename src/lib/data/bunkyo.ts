import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 文京区 保育園入園 基本指数・調整指数データ
// 出典: ぶんきょう保育パンフレット2025（令和7年度版）
// https://www.city.bunkyo.lg.jp/b023/p001786.html
// ---------------------------------------------------------------------------

const municipality = {
  id: 'bunkyo',
  name: '文京区',
  slug: 'bunkyo',
  prefecture: '東京都',
  maxBasePoints: 20, // 父母各10点
} as const;

// ---------------------------------------------------------------------------
// 保育が必要な理由ごとの選択肢テンプレート（父母各最大10点）
// ---------------------------------------------------------------------------

/** 就労 */
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '週5日以上かつ1日8時間以上（月20日以上）', value: `${prefix}_employment_10`, points: 10 },
  { label: '週5日以上かつ1日6時間以上8時間未満', value: `${prefix}_employment_9`, points: 9 },
  { label: '週5日以上かつ1日4時間以上6時間未満', value: `${prefix}_employment_8`, points: 8 },
  { label: '週3日以上かつ1日6時間以上8時間未満', value: `${prefix}_employment_7`, points: 7 },
  { label: '週3日以上かつ1日4時間以上6時間未満', value: `${prefix}_employment_6`, points: 6 },
  { label: '月48時間以上（上記以外）', value: `${prefix}_employment_5`, points: 5 },
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
  { label: '身体障害者手帳1・2級／愛の手帳1〜3度', value: `${prefix}_disability_10`, points: 10 },
  { label: '身体障害者手帳3級／愛の手帳4度（育児困難）', value: `${prefix}_disability_8`, points: 8 },
  { label: '身体障害者手帳4級以下', value: `${prefix}_disability_6`, points: 6 },
];

/** 介護 */
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '常時介護が必要な親族の介護（週5日以上）', value: `${prefix}_care_10`, points: 10 },
  { label: '通院・通所の付添い介護（週3日以上）', value: `${prefix}_care_8`, points: 8 },
  { label: 'その他介護', value: `${prefix}_care_6`, points: 6 },
];

/** 出産 */
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産前後（出産月の前後2ヶ月）', value: `${prefix}_childbirth_7`, points: 7 },
];

/** 就学 */
const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '月20日以上かつ1日8時間以上の就学・職業訓練', value: `${prefix}_education_10`, points: 10 },
  { label: '月20日以上かつ1日4時間以上の就学', value: `${prefix}_education_8`, points: 8 },
  { label: '月48時間以上の就学（上記以外）', value: `${prefix}_education_5`, points: 5 },
];

/** 求職活動 */
const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動中', value: `${prefix}_jobseeking_2`, points: 2 },
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
    id: 'adj_bunkyo_resident',
    category: 'adjustment',
    label: '文京区にお住まいですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_bunkyo_resident_no', points: 0 },
      { label: 'はい', value: 'adj_bunkyo_resident_yes', points: 4 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護を受けていますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい', value: 'adj_welfare_yes', points: 4 },
    ],
  },
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親世帯ですか？',
    helpText: '母子家庭・父子家庭の場合',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい', value: 'adj_single_parent_yes', points: 3 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: 'きょうだいが区内認可保育施設に在園していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_no', points: 0 },
      { label: 'はい', value: 'adj_sibling_yes', points: 2 },
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
      { label: 'はい', value: 'adj_parental_leave_yes', points: 1 },
    ],
  },
  {
    id: 'adj_new_entry',
    category: 'adjustment',
    label: '新規入所の申込みですか？',
    helpText: '転園ではなく新規入所の場合',
    inputType: 'radio',
    options: [
      { label: 'いいえ（転園）', value: 'adj_new_entry_no', points: 0 },
      { label: 'はい（新規入所）', value: 'adj_new_entry_yes', points: 1 },
    ],
  },
  {
    id: 'adj_separation',
    category: 'adjustment',
    label: '保護者が別居の状態にありますか？',
    helpText: '単身赴任など',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_separation_no', points: 0 },
      { label: 'はい', value: 'adj_separation_yes', points: 1 },
    ],
  },
  {
    id: 'adj_waiting',
    category: 'adjustment',
    label: '6ヶ月以上待機していますか？',
    helpText: '過去に不承諾となり6ヶ月以上経過している場合',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_waiting_no', points: 0 },
      { label: 'はい', value: 'adj_waiting_yes', points: 1 },
    ],
  },
];

// ---------------------------------------------------------------------------
// エクスポート
// ---------------------------------------------------------------------------

export const bunkyoData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
