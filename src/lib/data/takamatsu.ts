import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 高松市 保育園入園 利用調整基準データ
// 出典: 高松市「保育施設等の利用調整に関する要綱」（令和7年12月23日施行）
// https://www.city.takamatsu.kagawa.jp/kurashi/kosodate/youchien_hoiku/kodomoen/hoiku/h29riyou.html
// ---------------------------------------------------------------------------

const municipality = {
  id: 'takamatsu',
  name: '高松市',
  slug: 'takamatsu',
  prefecture: '香川県',
  maxBasePoints: 20, // 父母各最大20点・低い方を採用
  scoringMethod: 'min' as const,
} as const;

// ---------------------------------------------------------------------------
// 保育が必要な理由ごとの選択肢テンプレート（父母各最大20点）
// ---------------------------------------------------------------------------

/** 就労 */
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月160時間以上', value: `${prefix}_employment_20`, points: 20 },
  { label: '月140時間以上160時間未満', value: `${prefix}_employment_18`, points: 18 },
  { label: '月120時間以上140時間未満', value: `${prefix}_employment_16`, points: 16 },
  { label: '月100時間以上120時間未満', value: `${prefix}_employment_14`, points: 14 },
  { label: '月80時間以上100時間未満', value: `${prefix}_employment_12`, points: 12 },
  { label: '月64時間以上80時間未満', value: `${prefix}_employment_10`, points: 10 },
];

/** 疾病 */
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院中（1か月以上）', value: `${prefix}_illness_20`, points: 20 },
  { label: '自宅療養（常時臥床）', value: `${prefix}_illness_20b`, points: 20 },
  { label: '自宅療養（1か月以上の安静・日常生活に支障）', value: `${prefix}_illness_18`, points: 18 },
  { label: '通院加療が必要', value: `${prefix}_illness_12`, points: 12 },
];

/** 障害 */
const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '重度（身体1・2級/精神1・2級/療育A/要介護3〜5）', value: `${prefix}_disability_20`, points: 20 },
  { label: '中度（身体3級/精神3級/療育B/要介護1・2）', value: `${prefix}_disability_18`, points: 18 },
  { label: '軽度（身体4〜6級/要支援）', value: `${prefix}_disability_12`, points: 12 },
];

/** 介護・看護（就労区分を準用） */
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '月160時間以上の介護・看護', value: `${prefix}_care_20`, points: 20 },
  { label: '月140時間以上160時間未満の介護・看護', value: `${prefix}_care_18`, points: 18 },
  { label: '月120時間以上140時間未満の介護・看護', value: `${prefix}_care_16`, points: 16 },
  { label: '月100時間以上120時間未満の介護・看護', value: `${prefix}_care_14`, points: 14 },
  { label: '月80時間以上100時間未満の介護・看護', value: `${prefix}_care_12`, points: 12 },
  { label: '月64時間以上80時間未満の介護・看護', value: `${prefix}_care_10`, points: 10 },
];

/** 出産 */
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産前後', value: `${prefix}_childbirth_16`, points: 16 },
];

/** 就学・技能習得（就労区分を準用） */
const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '月160時間以上の就学', value: `${prefix}_education_20`, points: 20 },
  { label: '月140時間以上160時間未満の就学', value: `${prefix}_education_18`, points: 18 },
  { label: '月120時間以上140時間未満の就学', value: `${prefix}_education_16`, points: 16 },
  { label: '月100時間以上120時間未満の就学', value: `${prefix}_education_14`, points: 14 },
  { label: '月80時間以上100時間未満の就学', value: `${prefix}_education_12`, points: 12 },
  { label: '月64時間以上80時間未満の就学', value: `${prefix}_education_10`, points: 10 },
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
      label: `${parentLabel}はどのくらい介護・看護をしていますか？`,
      helpText: '月あたりの介護・看護時間を選んでください',
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
      { label: 'はい', value: 'adj_single_parent_yes', points: 12 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: 'きょうだいの保育園の状況は？',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_sibling_no', points: 0 },
      { label: 'きょうだいが在園中の園を希望', value: 'adj_sibling_same', points: 8 },
      { label: 'きょうだいと同時に同じ園を希望', value: 'adj_sibling_simultaneous', points: 2 },
    ],
  },
  {
    id: 'adj_small_grad',
    category: 'adjustment',
    label: '小規模保育等（地域型保育事業）の卒園児ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_small_grad_no', points: 0 },
      { label: 'はい', value: 'adj_small_grad_yes', points: 8 },
    ],
  },
  {
    id: 'adj_parental_leave',
    category: 'adjustment',
    label: '育休から復帰して就労する予定ですか？',
    helpText: '育児休業が終了し就労する場合',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_parental_leave_no', points: 0 },
      { label: 'はい', value: 'adj_parental_leave_yes', points: 6 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護を受けていますか？',
    helpText: '就労等による自立支援につながる場合',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい', value: 'adj_welfare_yes', points: 4 },
    ],
  },
  {
    id: 'adj_disability_child',
    category: 'adjustment',
    label: 'お子さまに障がいがあり、障がい児保育を希望しますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_disability_child_no', points: 0 },
      { label: 'はい', value: 'adj_disability_child_yes', points: 4 },
    ],
  },
  {
    id: 'adj_job_offer',
    category: 'adjustment',
    label: '就労は内定済み、または就学予定ですか？',
    helpText: 'まだ働いていないが内定がある場合、または就学予定の場合',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_job_offer_no', points: 0 },
      { label: 'はい', value: 'adj_job_offer_yes', points: -2 },
    ],
  },
];

// ---------------------------------------------------------------------------
// エクスポート
// ---------------------------------------------------------------------------

export const takamatsuData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
