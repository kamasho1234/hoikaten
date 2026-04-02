import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 練馬区 保育園入園 保育指数・調整指数データ
// ---------------------------------------------------------------------------

const municipality = {
  id: 'nerima',
  name: '練馬区',
  slug: 'nerima',
  prefecture: '東京都',
  maxBasePoints: 80, // 父母各40点
} as const;

// ---------------------------------------------------------------------------
// 保育が必要な理由ごとの選択肢テンプレート
// ---------------------------------------------------------------------------

/** 就労 */
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月20日以上・8時間以上', value: `${prefix}_employment_40`, points: 40 },
  { label: '月20日以上・7時間以上8時間未満', value: `${prefix}_employment_37a`, points: 37 },
  { label: '月16〜19日・8時間以上', value: `${prefix}_employment_37b`, points: 37 },
  { label: '月20日以上・6時間以上7時間未満', value: `${prefix}_employment_34a`, points: 34 },
  { label: '月16〜19日・7時間以上8時間未満', value: `${prefix}_employment_34b`, points: 34 },
  { label: '月12〜15日・8時間以上', value: `${prefix}_employment_34c`, points: 34 },
  { label: '月20日以上・5時間以上6時間未満', value: `${prefix}_employment_31a`, points: 31 },
  { label: '月16〜19日・6時間以上7時間未満', value: `${prefix}_employment_31b`, points: 31 },
  { label: '月12〜15日・7時間以上8時間未満', value: `${prefix}_employment_31c`, points: 31 },
  { label: '月20日以上・4時間以上5時間未満', value: `${prefix}_employment_28a`, points: 28 },
  { label: '月16〜19日・5時間以上6時間未満', value: `${prefix}_employment_28b`, points: 28 },
  { label: '月12〜15日・6時間以上7時間未満', value: `${prefix}_employment_28c`, points: 28 },
  { label: '月16〜19日・4時間以上5時間未満', value: `${prefix}_employment_25`, points: 25 },
  { label: '月12〜15日・5時間以上6時間未満', value: `${prefix}_employment_25b`, points: 25 },
  { label: '月12〜15日・4時間以上5時間未満', value: `${prefix}_employment_22`, points: 22 },
];

/** 疾病 */
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院・寝たきり・精神疾患', value: `${prefix}_illness_40`, points: 40 },
  { label: '常時安静が必要', value: `${prefix}_illness_32`, points: 32 },
  { label: '自宅療養・通院加療', value: `${prefix}_illness_20`, points: 20 },
];

/** 障害 */
const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '身体障害者手帳1・2級等', value: `${prefix}_disability_40`, points: 40 },
  { label: '身体障害者手帳3級等', value: `${prefix}_disability_30`, points: 30 },
  { label: '身体障害者手帳4級', value: `${prefix}_disability_20`, points: 20 },
];

/** 介護 */
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '自宅での重度心身障害者等の介護', value: `${prefix}_care_40`, points: 40 },
  { label: '通院・通所の付添い（週3日以上）', value: `${prefix}_care_30`, points: 30 },
  { label: '入院・入所の付添い（週3日以上）', value: `${prefix}_care_20`, points: 20 },
];

/** 出産 */
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産前後', value: `${prefix}_childbirth_24`, points: 24 },
];

/** 就学 */
const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '就労に準ずる（月20日以上等）', value: `${prefix}_education_40`, points: 40 },
  { label: 'その他就学・技能修得', value: `${prefix}_education_20`, points: 20 },
];

/** 求職活動 */
const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職中', value: `${prefix}_jobseeking_10`, points: 10 },
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
    helpText: 'ひとり親の場合、不存在40点＋調整8点が加算されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい', value: 'adj_single_parent_yes', points: 48 },
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
    id: 'adj_multi_children',
    category: 'adjustment',
    label: '未就学児が3人以上いますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_multi_children_no', points: 0 },
      { label: 'はい', value: 'adj_multi_children_yes', points: 5 },
    ],
  },
  {
    id: 'adj_twins',
    category: 'adjustment',
    label: '多胎児（双子以上）の申し込みですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_twins_no', points: 0 },
      { label: 'はい', value: 'adj_twins_yes', points: 3 },
    ],
  },
  {
    id: 'adj_unlicensed_nursery',
    category: 'adjustment',
    label: '認可外の保育施設に月ぎめで預けていますか？',
    helpText: '一定時間以上預けている場合に加点されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unlicensed_nursery_no', points: 0 },
      { label: 'はい（月160時間以上）', value: 'adj_unlicensed_nursery_3', points: 3 },
      { label: 'はい（月120時間以上）', value: 'adj_unlicensed_nursery_2', points: 2 },
    ],
  },
  {
    id: 'adj_parental_leave',
    category: 'adjustment',
    label: '育休から復帰する予定ですか？',
    helpText: '育児休業給付金を受給中で復帰予定の場合',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_parental_leave_no', points: 0 },
      { label: 'はい（2歳児以上）', value: 'adj_parental_leave_2', points: 2 },
      { label: 'はい（1歳児）', value: 'adj_parental_leave_1', points: 1 },
    ],
  },
  {
    id: 'adj_disability_child',
    category: 'adjustment',
    label: 'お子さんに障害や配慮が必要な事情がありますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_disability_child_no', points: 0 },
      { label: 'はい', value: 'adj_disability_child_yes', points: 12 },
    ],
  },
  {
    id: 'adj_single_assignment',
    category: 'adjustment',
    label: 'パパ・ママのどちらかが単身赴任中ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_assignment_no', points: 0 },
      { label: 'はい', value: 'adj_single_assignment_yes', points: 1 },
    ],
  },
  {
    id: 'adj_grandparent',
    category: 'adjustment',
    label: '65歳未満の祖父母が同居して保育できる状態ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_grandparent_no', points: 0 },
      { label: 'はい', value: 'adj_grandparent_yes', points: -4 },
    ],
  },
];

// ---------------------------------------------------------------------------
// エクスポート
// ---------------------------------------------------------------------------

export const nerimaData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
