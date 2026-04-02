import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 目黒区 保育園入園 基本指数・調整指数データ
// 出典: 目黒区保育の利用の調整に関する規則
// https://www1.g-reiki.net/meguro/reiki_honbun/g111RG00000664.html
// ---------------------------------------------------------------------------

const municipality = {
  id: 'meguro',
  name: '目黒区',
  slug: 'meguro',
  prefecture: '東京都',
  maxBasePoints: 40, // 父母各20点
} as const;

// ---------------------------------------------------------------------------
// 保育が必要な理由ごとの選択肢テンプレート（父母各最大20点）
// ---------------------------------------------------------------------------

/** 就労 */
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '週5日以上かつ1日7時間以上', value: `${prefix}_employment_20`, points: 20 },
  { label: '週5日以上かつ1日4時間以上7時間未満', value: `${prefix}_employment_18`, points: 18 },
  { label: '週4日かつ1日7時間以上', value: `${prefix}_employment_16`, points: 16 },
  { label: '週4日かつ1日4時間以上7時間未満', value: `${prefix}_employment_14`, points: 14 },
  { label: '週3日かつ1日7時間以上', value: `${prefix}_employment_12`, points: 12 },
  { label: '週3日かつ1日4時間以上7時間未満', value: `${prefix}_employment_10`, points: 10 },
  { label: '月48時間以上（上記以外）', value: `${prefix}_employment_8`, points: 8 },
];

/** 疾病 */
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院3ヶ月以上見込み／常時病臥／精神性疾患通院加療', value: `${prefix}_illness_20`, points: 20 },
  { label: '一般療養（安静が必要）', value: `${prefix}_illness_17`, points: 17 },
];

/** 障害 */
const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '身体障害者手帳1・2級／精神障害1〜3級／愛の手帳1〜3度', value: `${prefix}_disability_20`, points: 20 },
  { label: '身体障害者手帳3級／愛の手帳4度', value: `${prefix}_disability_17`, points: 17 },
  { label: '身体障害者手帳4級', value: `${prefix}_disability_13`, points: 13 },
];

/** 介護 */
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '身体障害1・2級等の親族を常時介護／寝たきり高齢者の常時介護', value: `${prefix}_care_20`, points: 20 },
  { label: '親族の通院・通所の付添い（週5日以上かつ1日4時間以上）', value: `${prefix}_care_18`, points: 18 },
  { label: '親族の通院・通所の付添い（週4日かつ1日4時間以上）', value: `${prefix}_care_14`, points: 14 },
  { label: '親族の通院・通所の付添い（週3日かつ1日4時間以上）', value: `${prefix}_care_10`, points: 10 },
  { label: '身体障害3・4級等の親族を常時介護', value: `${prefix}_care_13`, points: 13 },
  { label: 'その他在宅療養介護', value: `${prefix}_care_9`, points: 9 },
];

/** 出産 */
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産前後', value: `${prefix}_childbirth_9`, points: 9 },
];

/** 就学 */
const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '就学・職業訓練（就労の類型を準用）', value: `${prefix}_education_8`, points: 8 },
];

/** 求職活動 */
const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動中（昼間外出を常態）', value: `${prefix}_jobseeking_8`, points: 8 },
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
    helpText: '母子家庭・父子家庭、または父母不存在の場合',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい', value: 'adj_single_parent_yes', points: 10 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯または非課税世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい', value: 'adj_welfare_yes', points: 2 },
    ],
  },
  {
    id: 'adj_unlicensed_nursery',
    category: 'adjustment',
    label: '認可外保育施設に月ぎめで預けていますか？',
    helpText: '週3日・1日4時間以上、1ヶ月以上有償で預けている場合',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unlicensed_nursery_no', points: 0 },
      { label: 'はい', value: 'adj_unlicensed_nursery_yes', points: 2 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: 'きょうだいが複数の認可保育施設に分かれて在園していますか？',
    helpText: '転園を希望する場合',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_no', points: 0 },
      { label: 'はい', value: 'adj_sibling_yes', points: 2 },
    ],
  },
  {
    id: 'adj_family_nursery',
    category: 'adjustment',
    label: '家庭的保育事業（保育ママ等）を1ヶ月以上利用していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_family_nursery_no', points: 0 },
      { label: 'はい', value: 'adj_family_nursery_yes', points: 2 },
    ],
  },
  {
    id: 'adj_disability_child',
    category: 'adjustment',
    label: 'お子さんまたは同居親族に障害がありますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_disability_child_no', points: 0 },
      { label: 'はい', value: 'adj_disability_child_yes', points: 2 },
    ],
  },
];

// ---------------------------------------------------------------------------
// エクスポート
// ---------------------------------------------------------------------------

export const meguroData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
