import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 堺市 保育園入園 基準項目・加点項目データ
// ---------------------------------------------------------------------------
// 堺市は「基準項目の点数＋加点項目の点数＝世帯の点数」の加算方式。
// 父母それぞれに基準項目の点数を判定し、合計する。
// 就労は月の就労日数・時間に応じて10〜20点。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'sakai',
  name: '堺市',
  slug: 'sakai',
  prefecture: '大阪府',
  maxBasePoints: 40, // 父母各20点
} as const;

// ---------------------------------------------------------------------------
// 基準項目の選択肢テンプレート
// ---------------------------------------------------------------------------

/** 就労 */
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月20日以上かつ週40時間以上', value: `${prefix}_employment_20`, points: 20 },
  { label: '月20日以上かつ週30時間以上', value: `${prefix}_employment_18`, points: 18 },
  { label: '月16日以上かつ週24時間以上', value: `${prefix}_employment_16`, points: 16 },
  { label: '月12日以上かつ週16時間以上', value: `${prefix}_employment_14`, points: 14 },
  { label: '月48時間以上（上記以外）', value: `${prefix}_employment_10`, points: 10 },
];

/** 就労内定 */
const employmentOfferOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_offer_none`, points: 0 },
  { label: '週40時間以上相当の内定', value: `${prefix}_offer_16`, points: 16 },
  { label: '月48時間以上の内定', value: `${prefix}_offer_10`, points: 10 },
];

/** 疾病 */
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院中・常時病臥', value: `${prefix}_illness_20`, points: 20 },
  { label: '通院加療（安静が必要）', value: `${prefix}_illness_16`, points: 16 },
  { label: '通院加療', value: `${prefix}_illness_10`, points: 10 },
];

/** 障害 */
const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '重度（1・2級等）', value: `${prefix}_disability_20`, points: 20 },
  { label: '中度', value: `${prefix}_disability_16`, points: 16 },
  { label: '軽度', value: `${prefix}_disability_10`, points: 10 },
];

/** 介護・看護 */
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '週5日以上', value: `${prefix}_care_20`, points: 20 },
  { label: '週3日以上', value: `${prefix}_care_16`, points: 16 },
  { label: 'それ以外', value: `${prefix}_care_10`, points: 10 },
];

/** 出産 */
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産前後', value: `${prefix}_childbirth_16`, points: 16 },
];

/** 就学 */
const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '月16日以上かつ週16時間以上', value: `${prefix}_education_18`, points: 18 },
  { label: '月16日以上かつ週16時間未満', value: `${prefix}_education_14`, points: 14 },
  { label: '就学予定', value: `${prefix}_education_10`, points: 10 },
];

/** 求職活動 */
const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動中', value: `${prefix}_jobseeking_4`, points: 4 },
];

/** 育児休業 */
const parentalLeaveOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_parental_leave_none`, points: 0 },
  { label: '育児休業中', value: `${prefix}_parental_leave_16`, points: 16 },
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
      { label: '育児休業中', value: `${prefix}_reason_parental_leave`, points: 0 },
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
      helpText: '週あたりの介護日数を選んでください',
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
    {
      id: `${prefix}_parental_leave`,
      category,
      label: `${parentLabel}は育児休業中ですか？`,
      inputType: 'radio',
      options: parentalLeaveOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// ---------------------------------------------------------------------------
// 加点項目の質問
// ---------------------------------------------------------------------------

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい', value: 'adj_single_parent_yes', points: 8 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: 'きょうだいの保育施設の状況は？',
    helpText: '在園中のきょうだいがいて同じ施設を希望する場合は加点が大きくなります',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_sibling_no', points: 0 },
      { label: 'きょうだいが在園中で、同じ施設を希望する', value: 'adj_sibling_same', points: 4 },
      { label: 'きょうだいが在園中で、別の施設を希望する', value: 'adj_sibling_diff', points: 2 },
      { label: 'きょうだいと同時に申し込む（双子など）', value: 'adj_sibling_simultaneous', points: 3 },
    ],
  },
  {
    id: 'adj_parental_leave_return',
    category: 'adjustment',
    label: '育児休業から復帰する予定ですか？',
    helpText: '育児休業を取得し、入園する月に職場復帰する場合です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_parental_leave_return_no', points: 0 },
      { label: 'はい', value: 'adj_parental_leave_return_yes', points: 2 },
    ],
  },
  {
    id: 'adj_waiting',
    category: 'adjustment',
    label: '堺市で年度初めから待機児童となっていますか？',
    helpText: '4月から待機している場合です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_waiting_no', points: 0 },
      { label: 'はい', value: 'adj_waiting_yes', points: 2 },
    ],
  },
  {
    id: 'adj_unlicensed_nursery',
    category: 'adjustment',
    label: '認可外の保育施設に預けていますか？',
    helpText: '月ぎめで預けている場合です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unlicensed_nursery_no', points: 0 },
      { label: 'はい', value: 'adj_unlicensed_nursery_yes', points: 2 },
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
    id: 'adj_childcare_leave_extension',
    category: 'adjustment',
    label: '育児休業の延長も許容できますか？',
    helpText: '入園できなかった場合に育児休業を延長してもよい場合は大きく減点されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ（復帰したい）', value: 'adj_childcare_leave_extension_no', points: 0 },
      { label: 'はい（延長も可）', value: 'adj_childcare_leave_extension_yes', points: -50 },
    ],
  },
];

// ---------------------------------------------------------------------------
// エクスポート
// ---------------------------------------------------------------------------

export const sakaiData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
