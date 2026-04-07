import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 宇治市 保育園入園 基本指数・調整指数データ
// ---------------------------------------------------------------------------
// 宇治市は点数制。父母それぞれに「基本指数＋調整指数」を計算し、
// 低い方が児童の点数になる。父母各最大20点（合計40点満点）。
// MVP では min(基本指数) + 調整指数 として簡略化する。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'uji',
  name: '宇治市',
  slug: 'uji',
  prefecture: '京都府',
  maxBasePoints: 40,
  scoringMethod: 'min' as const,
} as const;

// ---------------------------------------------------------------------------
// 保育が必要な理由ごとの選択肢テンプレート
// ---------------------------------------------------------------------------

/** 就労 */
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '週40時間以上', value: `${prefix}_employment_20`, points: 20 },
  { label: '週35〜40時間', value: `${prefix}_employment_18`, points: 18 },
  { label: '週30〜35時間', value: `${prefix}_employment_16`, points: 16 },
  { label: '週25〜30時間', value: `${prefix}_employment_14`, points: 14 },
  { label: '週20〜25時間', value: `${prefix}_employment_12`, points: 12 },
  { label: 'その他（月64時間以上）', value: `${prefix}_employment_8`, points: 8 },
];

/** 疾病・障害 */
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院・重度障害等（入院/常時臥床/身体1-2級/療育A/精神1級等）', value: `${prefix}_illness_20`, points: 20 },
  { label: '中度（身体3級/療育B/精神2級等）', value: `${prefix}_illness_16`, points: 16 },
  { label: 'その他', value: `${prefix}_illness_8`, points: 8 },
];

/** 介護 */
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '要介護3以上・重度障害の親族の介護', value: `${prefix}_care_18`, points: 18 },
  { label: '要介護1-2・中度の親族の介護', value: `${prefix}_care_12`, points: 12 },
  { label: 'その他の介護・看護', value: `${prefix}_care_6`, points: 6 },
];

/** 出産 */
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産前後', value: `${prefix}_childbirth_8`, points: 8 },
];

/** 就学・技能習得 */
const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '週40時間以上の就学', value: `${prefix}_education_20`, points: 20 },
  { label: '週30時間以上の就学', value: `${prefix}_education_16`, points: 16 },
  { label: 'その他の就学', value: `${prefix}_education_8`, points: 8 },
];

/** 求職活動 */
const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職中', value: `${prefix}_jobseeking_3`, points: 3 },
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
      { label: '病気の治療中・障害がある', value: `${prefix}_reason_illness`, points: 0 },
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
      helpText: '週あたりの就労時間を選んでください',
      inputType: 'radio',
      options: employmentOptions(prefix),
    },
    {
      id: `${prefix}_illness`,
      category,
      label: `${parentLabel}の病気・障害の状況は？`,
      inputType: 'radio',
      options: illnessOptions(prefix),
    },
    {
      id: `${prefix}_care`,
      category,
      label: `${parentLabel}はどのくらい介護していますか？`,
      helpText: '介護対象の方の状況を選んでください',
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
      { label: 'はい', value: 'adj_single_parent_yes', points: 5 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: 'きょうだいが在園中、または同時に申し込みますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_no', points: 0 },
      { label: 'はい', value: 'adj_sibling_yes', points: 15 },
    ],
  },
  {
    id: 'adj_multiple_birth',
    category: 'adjustment',
    label: '多胎児（双子・三つ子など）ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_multiple_birth_no', points: 0 },
      { label: 'はい', value: 'adj_multiple_birth_yes', points: 10 },
    ],
  },
  {
    id: 'adj_childcare_leave',
    category: 'adjustment',
    label: '育休からの復帰予定はありますか？',
    helpText: '育休復帰の状況を選んでください',
    inputType: 'radio',
    options: [
      { label: 'なし', value: 'adj_childcare_leave_none', points: 0 },
      { label: '年度内に復帰が必要', value: 'adj_childcare_leave_required', points: 2 },
      { label: '延長可能（復帰予定あり）', value: 'adj_childcare_leave_extendable', points: 1 },
    ],
  },
  {
    id: 'adj_nursery_worker',
    category: 'adjustment',
    label: '保育士等として勤務していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_nursery_worker_no', points: 0 },
      { label: 'はい', value: 'adj_nursery_worker_yes', points: 10 },
    ],
  },
  {
    id: 'adj_single_assignment',
    category: 'adjustment',
    label: 'パパ・ママのどちらかが単身赴任中ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_assignment_no', points: 0 },
      { label: 'はい', value: 'adj_single_assignment_yes', points: 3 },
    ],
  },
  {
    id: 'adj_grandparent_cohabit',
    category: 'adjustment',
    label: '65歳未満の同居祖父母がいますか？',
    helpText: '同居の祖父母がいる場合は減点になります',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_grandparent_cohabit_no', points: 0 },
      { label: 'はい', value: 'adj_grandparent_cohabit_yes', points: -1 },
    ],
  },
  {
    id: 'adj_job_offer',
    category: 'adjustment',
    label: '就労内定（まだ働き始めていない）ですか？',
    helpText: '内定はあるが就労実績がない場合は減点になります',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_job_offer_no', points: 0 },
      { label: 'はい', value: 'adj_job_offer_yes', points: -5 },
    ],
  },
];

// ---------------------------------------------------------------------------
// エクスポート
// ---------------------------------------------------------------------------

export const ujiData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
