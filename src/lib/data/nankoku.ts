import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 南国市 保育園入園 利用調整基準データ
// 出典: 南国市「保育施設等の利用調整に関する要綱」
// https://www.city.nankoku.lg.jp/reiki/reiki_honbun/i900RG00001015.html
// ---------------------------------------------------------------------------
// 南国市は「基本指数（父母それぞれの状況）+ 調整指数」の加算方式。
// 就労は月150時間以上で最高100点（居宅外労働の雇用者の場合）。
// 合計基準点数最大200点。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'nankoku',
  name: '南国市',
  slug: 'nankoku',
  prefecture: '高知県',
  maxBasePoints: 200,
} as const;

const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月150時間以上（居宅外労働・雇用者）', value: `${prefix}_employment_100`, points: 100 },
  { label: '月120時間以上150時間未満（居宅外労働・雇用者）', value: `${prefix}_employment_95`, points: 95 },
  { label: '月90時間以上120時間未満（居宅外労働・雇用者）', value: `${prefix}_employment_90`, points: 90 },
  { label: '月64時間以上90時間未満（居宅外労働・雇用者）', value: `${prefix}_employment_80`, points: 80 },
  { label: '月48時間以上64時間未満（居宅外労働・雇用者）', value: `${prefix}_employment_60`, points: 60 },
  { label: '自営業・自営業に従事', value: `${prefix}_employment_100`, points: 100 },
];

const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院・常時病臥', value: `${prefix}_illness_100`, points: 100 },
  { label: '通院加療が必要', value: `${prefix}_illness_50`, points: 50 },
];

const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '身体障害者手帳1・2級等', value: `${prefix}_disability_100`, points: 100 },
  { label: '身体障害者手帳3～6級等', value: `${prefix}_disability_50`, points: 50 },
];

const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '常時困難（要介護3以上等）', value: `${prefix}_care_90`, points: 90 },
  { label: '通常の世話が困難（要介護1～2等）', value: `${prefix}_care_50`, points: 50 },
];

const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '産前産後8週以内', value: `${prefix}_childbirth_60`, points: 60 },
];

const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動中（3か月以内）', value: `${prefix}_jobseeking_5`, points: 5 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: '南国市では父母それぞれの基本指数（各最大100点）の合計で選考されます。調整指数で加減されます。',
    inputType: 'select',
    options: [
      { label: '仕事をしている', value: `${prefix}_reason_employment`, points: 0 },
      { label: '病気の治療中', value: `${prefix}_reason_illness`, points: 0 },
      { label: '障害がある', value: `${prefix}_reason_disability`, points: 0 },
      { label: '介護・看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '出産の前後', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '仕事を探している', value: `${prefix}_reason_jobseeking`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の就労状況は？`,
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
      label: `${parentLabel}の介護の状況は？`,
      inputType: 'radio',
      options: careOptions(prefix),
    },
    {
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}の出産の状況は？`,
      inputType: 'radio',
      options: childbirthOptions(prefix),
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

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい（+30）', value: 'adj_single_parent_yes', points: 30 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護受給世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい（+30）', value: 'adj_welfare_yes', points: 30 },
    ],
  },
  {
    id: 'adj_abuse_dv',
    category: 'adjustment',
    label: '虐待・DV懸念がありますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_abuse_dv_no', points: 0 },
      { label: 'はい（+50）', value: 'adj_abuse_dv_yes', points: 50 },
    ],
  },
  {
    id: 'adj_siblings_same',
    category: 'adjustment',
    label: 'きょうだいが同時に利用希望していますか？',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_siblings_same_no', points: 0 },
      { label: 'はい（+18）', value: 'adj_siblings_same_yes', points: 18 },
    ],
  },
  {
    id: 'adj_nursery_fee_delinquent',
    category: 'adjustment',
    label: '保育料を滞納していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_fee_delinquent_no', points: 0 },
      { label: 'はい（-43）', value: 'adj_fee_delinquent_yes', points: -43 },
    ],
  },
];

export const nankokuData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
