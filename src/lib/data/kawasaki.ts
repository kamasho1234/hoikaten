import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 川崎市 保育園入園 ランク（基本指数）・調整指数データ
// ---------------------------------------------------------------------------
// 川崎市は「ランク制（A〜H）」＋「調整指数」の二段階方式。
// 父母それぞれにランクを判定し、低い方のランクが世帯のランクになる。
// シミュレーター上ではランクを点数に変換して表示する:
//   A→8, B→7, C→6, D→5, E→4, F→3, G→2, H→1
// ---------------------------------------------------------------------------

const municipality = {
  id: 'kawasaki',
  name: '川崎市',
  slug: 'kawasaki',
  prefecture: '神奈川県',
  maxBasePoints: 8, // ランクA = 8点
  scoringMethod: 'min' as const, // 低い方のランクが世帯ランク
} as const;

// ---------------------------------------------------------------------------
// 保育が必要な理由ごとの選択肢テンプレート
// ---------------------------------------------------------------------------

/** 就労 */
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月140時間以上（ランクA）', value: `${prefix}_employment_8`, points: 8 },
  { label: '月120時間以上140時間未満（ランクB）', value: `${prefix}_employment_7`, points: 7 },
  { label: '月100時間以上120時間未満（ランクC）', value: `${prefix}_employment_6`, points: 6 },
  { label: '月80時間以上100時間未満（ランクD）', value: `${prefix}_employment_5`, points: 5 },
  { label: '月64時間以上80時間未満（ランクE）', value: `${prefix}_employment_4`, points: 4 },
];

/** 疾病 */
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '常時病臥（ランクA相当）', value: `${prefix}_illness_8`, points: 8 },
  { label: '常に安静が必要（ランクB相当）', value: `${prefix}_illness_7`, points: 7 },
  { label: '月16日以上安静が必要（ランクD相当）', value: `${prefix}_illness_5`, points: 5 },
];

/** 障害 */
const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '身体1-2級、精神1-2級、療育手帳（ランクA相当）', value: `${prefix}_disability_8`, points: 8 },
  { label: '身体3級、精神3級（ランクB相当）', value: `${prefix}_disability_7`, points: 7 },
  { label: '身体4級（ランクD相当）', value: `${prefix}_disability_5`, points: 5 },
];

/** 介護 */
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '月20日以上かつ週40時間以上（ランクA相当）', value: `${prefix}_care_8`, points: 8 },
  { label: '月16日以上かつ週24時間以上（ランクC相当）', value: `${prefix}_care_6`, points: 6 },
  { label: '月16日以上かつ週16時間以上（ランクE相当）', value: `${prefix}_care_4`, points: 4 },
];

/** 出産 */
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産前後（ランクD相当）', value: `${prefix}_childbirth_5`, points: 5 },
];

/** 就学 */
const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '月16日以上かつ週30時間以上（ランクC相当）', value: `${prefix}_education_6`, points: 6 },
  { label: '月16日以上かつ週24時間以上（ランクD相当）', value: `${prefix}_education_5`, points: 5 },
  { label: '月16日以上かつ週16時間以上（ランクE相当）', value: `${prefix}_education_4`, points: 4 },
];

/** 求職活動 */
const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職中（ランクH）', value: `${prefix}_jobseeking_1`, points: 1 },
];

// ---------------------------------------------------------------------------
// 保護者ごとの質問を生成するヘルパー
// ---------------------------------------------------------------------------

function buildParentQuestions(
  parentNum: 1 | 2,
): Question[] {
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
      helpText: '川崎市ではランク制で判定されます。いちばん近い働き方を選んでください',
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
      { label: 'はい（同居の親族なし）', value: 'adj_single_parent_yes', points: 10 },
      { label: 'はい（同居の親族あり）', value: 'adj_single_parent_relative', points: 10 },
    ],
  },
  {
    id: 'adj_sibling_same_facility',
    category: 'adjustment',
    label: 'きょうだいが同じ施設に在園、または同時申込で同じ施設を希望していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_same_facility_no', points: 0 },
      { label: 'はい', value: 'adj_sibling_same_facility_yes', points: 7 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護を受けていますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい', value: 'adj_welfare_yes', points: 7 },
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
    id: 'adj_parental_leave_return',
    category: 'adjustment',
    label: '育休明けで復帰予定ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_parental_leave_return_no', points: 0 },
      { label: 'はい', value: 'adj_parental_leave_return_yes', points: 2 },
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
  {
    id: 'adj_work_experience',
    category: 'adjustment',
    label: '保護者の就労実績が1年以上ありますか？',
    helpText: '現在のお仕事を1年以上続けている場合が対象です',
    inputType: 'radio',
    options: [
      { label: 'いいえ（どちらも1年未満）', value: 'adj_work_experience_none', points: 0 },
      { label: '片方だけ1年以上', value: 'adj_work_experience_one', points: 2 },
      { label: 'お二人とも1年以上', value: 'adj_work_experience_both', points: 4 },
    ],
  },
  {
    id: 'adj_grandparent_cohabit',
    category: 'adjustment',
    label: '65歳未満の同居親族に子どもの面倒を見られる方がいますか？',
    helpText: '同居の祖父母などが保育可能な場合は減点になります',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_grandparent_cohabit_no', points: 0 },
      { label: 'はい', value: 'adj_grandparent_cohabit_yes', points: -3 },
    ],
  },
];

// ---------------------------------------------------------------------------
// エクスポート
// ---------------------------------------------------------------------------

export const kawasakiData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
