import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 東大阪市 保育園入園 基礎指数・調整指数データ
// 出典：東大阪市 保育施設入所選考基準
// https://www.city.higashiosaka.lg.jp/kosodate/cmsfiles/contents/0000015/15515/senkoukijun.pdf
// ---------------------------------------------------------------------------

const municipality = {
  id: 'higashiosaka',
  name: '東大阪市',
  slug: 'higashiosaka',
  prefecture: '大阪府',
  maxBasePoints: 90, // 父母各45点
} as const;

// ---------------------------------------------------------------------------
// 保育が必要な理由ごとの選択肢テンプレート
// ---------------------------------------------------------------------------

/** 就労 */
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '週5日以上かつ週40時間以上', value: `${prefix}_employment_45`, points: 45 },
  { label: '週5日以上かつ週30時間以上', value: `${prefix}_employment_40`, points: 40 },
  { label: '週4日以上かつ週24時間以上', value: `${prefix}_employment_35`, points: 35 },
  { label: '週3日以上かつ週16時間以上', value: `${prefix}_employment_30`, points: 30 },
  { label: '月48時間以上（上記以外）', value: `${prefix}_employment_25`, points: 25 },
];

/** 就労内定 */
const employmentOfferOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_offer_none`, points: 0 },
  { label: '週40時間以上相当の内定', value: `${prefix}_offer_40`, points: 40 },
  { label: '月48時間以上の内定', value: `${prefix}_offer_25`, points: 25 },
];

/** 疾病 */
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院中・常時安静が必要', value: `${prefix}_illness_45`, points: 45 },
  { label: '通院加療中（安静が必要）', value: `${prefix}_illness_35`, points: 35 },
  { label: 'その他の通院加療', value: `${prefix}_illness_25`, points: 25 },
];

/** 障害 */
const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '身体1-2級 / 精神1-2級 / 療育A', value: `${prefix}_disability_45`, points: 45 },
  { label: '身体3-4級 / 療育B1', value: `${prefix}_disability_35`, points: 35 },
  { label: 'その他の手帳所持', value: `${prefix}_disability_25`, points: 25 },
];

/** 介護・看護 */
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '週5日以上かつ週40時間以上', value: `${prefix}_care_45`, points: 45 },
  { label: '週3日以上かつ週16時間以上', value: `${prefix}_care_35`, points: 35 },
  { label: '月48時間以上', value: `${prefix}_care_25`, points: 25 },
];

/** 出産 */
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産前後', value: `${prefix}_childbirth_40`, points: 40 },
];

/** 就学 */
const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '週4日以上かつ週24時間以上', value: `${prefix}_education_35`, points: 35 },
  { label: '月48時間以上', value: `${prefix}_education_25`, points: 25 },
];

/** 求職活動 */
const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動中', value: `${prefix}_jobseeking_15`, points: 15 },
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
      { label: '仕事が決まっている', value: `${prefix}_reason_offer`, points: 0 },
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
      id: `${prefix}_offer`,
      category,
      label: `${parentLabel}の就労内定の状況は？`,
      helpText: '内定先での勤務条件を選んでください',
      inputType: 'radio',
      options: employmentOfferOptions(prefix),
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
      helpText: '週あたりの通学日数・時間を選んでください',
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
      { label: 'はい', value: 'adj_single_parent_yes', points: 5 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: 'きょうだいの保育園の状況は？',
    helpText: 'きょうだいが在園中の場合は加点があります',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_sibling_no', points: 0 },
      { label: 'きょうだいが在園中で、同じ園を希望する', value: 'adj_sibling_same', points: 5 },
      { label: 'きょうだいが在園中（別の園を希望）', value: 'adj_sibling_other', points: 2 },
      { label: 'きょうだいと同時に申し込む（双子など）', value: 'adj_sibling_simultaneous', points: 2 },
    ],
  },
  {
    id: 'adj_unlicensed_nursery',
    category: 'adjustment',
    label: '認可外保育施設・企業主導型保育施設等に預けていますか？',
    helpText: '保護者の入所要件に見合う日数・時間利用している場合',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unlicensed_nursery_no', points: 0 },
      { label: 'はい', value: 'adj_unlicensed_nursery_yes', points: 3 },
    ],
  },
  {
    id: 'adj_parental_leave',
    category: 'adjustment',
    label: '育児休業から復帰する予定ですか？',
    helpText: '育児休業を取得し、入園する月に職場復帰する場合',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_parental_leave_no', points: 0 },
      { label: 'はい', value: 'adj_parental_leave_yes', points: 2 },
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
    id: 'adj_grandparent_nearby',
    category: 'adjustment',
    label: '65歳未満の同居親族に子どもを預けられますか？',
    helpText: '保育の代替手段があるとみなされる場合は減点になります',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_grandparent_nearby_no', points: 0 },
      { label: 'はい', value: 'adj_grandparent_nearby_yes', points: -2 },
    ],
  },
];

// ---------------------------------------------------------------------------
// エクスポート
// ---------------------------------------------------------------------------

export const higashiosakaData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
