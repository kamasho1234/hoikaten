import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 浜松市 保育園入園 基準点・調整点データ
// ---------------------------------------------------------------------------
// 浜松市は点数制。父母それぞれに基準点を算出し、低い方が世帯の基準点になる。
// 各保護者の最大基準点は20点。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'hamamatsu',
  name: '浜松市',
  slug: 'hamamatsu',
  prefecture: '静岡県',
  maxBasePoints: 20,
  scoringMethod: 'min' as const,
} as const;

// ---------------------------------------------------------------------------
// 保育が必要な理由ごとの選択肢テンプレート
// ---------------------------------------------------------------------------

/** 就労 */
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月150時間以上', value: `${prefix}_employment_20`, points: 20 },
  { label: '月120時間以上150時間未満', value: `${prefix}_employment_19`, points: 19 },
  { label: '月100時間以上120時間未満', value: `${prefix}_employment_18`, points: 18 },
  { label: '月80時間以上100時間未満', value: `${prefix}_employment_17`, points: 17 },
  { label: '月64時間以上80時間未満', value: `${prefix}_employment_16`, points: 16 },
  { label: '内職', value: `${prefix}_employment_13`, points: 13 },
];

/** 疾病 */
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院1ヶ月以上', value: `${prefix}_illness_20`, points: 20 },
  { label: '安静を要する自宅療養', value: `${prefix}_illness_16`, points: 16 },
  { label: 'その他通院加療', value: `${prefix}_illness_14`, points: 14 },
];

/** 障害 */
const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '身体障害1-2級 / 精神障害1-2級 / 療育手帳A', value: `${prefix}_disability_20`, points: 20 },
  { label: '身体障害3級 / 精神障害3級 / 療育手帳B', value: `${prefix}_disability_18`, points: 18 },
  { label: '身体障害4級', value: `${prefix}_disability_16`, points: 16 },
];

/** 介護 */
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '重度（身体1-2級 / 療育A / 要介護4-5）', value: `${prefix}_care_18`, points: 18 },
  { label: '中度（身体3級 / 療育B / 要介護2-3）', value: `${prefix}_care_17`, points: 17 },
  { label: 'その他', value: `${prefix}_care_15`, points: 15 },
];

/** 出産 */
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産の前後', value: `${prefix}_childbirth_14`, points: 14 },
];

/** 就学 */
const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '学校に通っている（就学）', value: `${prefix}_education_18`, points: 18 },
];

/** 求職 */
const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職中', value: `${prefix}_jobseeking_12`, points: 12 },
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
      { label: '介護・看護', value: `${prefix}_reason_care`, points: 0 },
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
      helpText: '月あたりの就労時間を選んでください',
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
      label: `${parentLabel}の障害の状況は？`,
      inputType: 'radio',
      options: disabilityOptions(prefix),
    },
    {
      id: `${prefix}_care`,
      category,
      label: `${parentLabel}はどのくらい介護していますか？`,
      helpText: '介護対象者の状態を選んでください',
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
      helpText: '就学・職業訓練などが該当します',
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
// 調整点の質問
// ---------------------------------------------------------------------------

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい（同居の親族なし）', value: 'adj_single_parent_yes', points: 5 },
      { label: 'はい（同居の親族あり）', value: 'adj_single_parent_relative', points: 3 },
    ],
  },
  {
    id: 'adj_work_days',
    category: 'adjustment',
    label: '就労日数はどのくらいですか？',
    helpText: '月あたりの就労日数で加点されます',
    inputType: 'radio',
    options: [
      { label: '月20日以上', value: 'adj_work_days_20plus', points: 3 },
      { label: '月16〜20日', value: 'adj_work_days_16_20', points: 2 },
      { label: '月12〜16日', value: 'adj_work_days_12_16', points: 1 },
      { label: 'それ以下 / 就労していない', value: 'adj_work_days_less', points: 0 },
    ],
  },
  {
    id: 'adj_parental_leave_return',
    category: 'adjustment',
    label: '育休から復帰しますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_parental_leave_return_no', points: 0 },
      { label: 'はい', value: 'adj_parental_leave_return_yes', points: 3 },
    ],
  },
  {
    id: 'adj_unlicensed_nursery',
    category: 'adjustment',
    label: '認可外保育施設を利用していますか？',
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
      { label: 'はい', value: 'adj_welfare_yes', points: 2 },
    ],
  },
  {
    id: 'adj_single_assignment',
    category: 'adjustment',
    label: '単身赴任中ですか？（国内）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_assignment_no', points: 0 },
      { label: 'はい', value: 'adj_single_assignment_yes', points: 1 },
    ],
  },
  {
    id: 'adj_nursery_worker',
    category: 'adjustment',
    label: '保育士等として浜松市内の保育施設に勤務していますか？',
    helpText: '保育士・保育教諭・幼稚園教諭等が対象です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_nursery_worker_no', points: 0 },
      { label: 'はい', value: 'adj_nursery_worker_yes', points: 4 },
    ],
  },
  {
    id: 'adj_parental_leave_extension',
    category: 'adjustment',
    label: '育休延長を許容しますか？',
    helpText: '「はい」を選ぶと基準点が0点になります。入園の優先度が大きく下がりますのでご注意ください',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_parental_leave_extension_no', points: 0 },
      { label: 'はい（基準点が0点になります）', value: 'adj_parental_leave_extension_yes', points: -15 },
    ],
  },
];

// ---------------------------------------------------------------------------
// エクスポート
// ---------------------------------------------------------------------------

export const hamamatsuData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
