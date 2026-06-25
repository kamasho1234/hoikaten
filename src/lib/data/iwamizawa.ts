import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 岩見沢市 保育施設利用調整基準データ
// 出典: 岩見沢市保育所等の利用調整に関する要綱（別表第1・第2）
// https://www.city.iwamizawa.hokkaido.jp/section/reiki/reiki_honbun/e300RG00001419.html
// ---------------------------------------------------------------------------
// sum方式。父母各最大100点。月間時間で4段階。調整指数が大きい（ひとり親+120等）。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'iwamizawa',
  name: '岩見沢市',
  slug: 'iwamizawa',
  prefecture: '北海道',
  maxBasePoints: 200,
} as const;

const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月150時間以上', value: `${prefix}_employment_100`, points: 100 },
  { label: '月120時間以上150時間未満', value: `${prefix}_employment_95`, points: 95 },
  { label: '月90時間以上120時間未満', value: `${prefix}_employment_90`, points: 90 },
  { label: '月64時間以上90時間未満', value: `${prefix}_employment_85`, points: 85 },
];

const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '疾病・障害（保育が困難）', value: `${prefix}_illness_100`, points: 100 },
];

const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '介護・看護が必要', value: `${prefix}_care_80`, points: 80 },
];

const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産前後（予定日8週前〜産後8週）', value: `${prefix}_childbirth_100`, points: 100 },
];

const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '就学・職業訓練（月120時間以上）', value: `${prefix}_education_95`, points: 95 },
  { label: '就学・職業訓練（月64時間以上120時間未満）', value: `${prefix}_education_90`, points: 90 },
];

const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動中', value: `${prefix}_jobseeking_50`, points: 50 },
];

const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '災害復旧にあたっている', value: `${prefix}_disaster_100`, points: 100 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: '最も該当するものをひとつ選んでください',
    inputType: 'select',
    options: [
      { label: '仕事をしている', value: `${prefix}_reason_employment`, points: 0 },
      { label: '病気・障害', value: `${prefix}_reason_illness`, points: 0 },
      { label: '家族の介護・看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '出産の前後', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '学校・職業訓練', value: `${prefix}_reason_education`, points: 0 },
      { label: '仕事を探している', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '災害復旧', value: `${prefix}_reason_disaster`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の月間就労時間は？`,
      inputType: 'radio',
      options: employmentOptions(prefix),
    },
    {
      id: `${prefix}_illness`,
      category,
      label: `${parentLabel}の疾病・障害の状況は？`,
      inputType: 'radio',
      options: illnessOptions(prefix),
    },
    {
      id: `${prefix}_care`,
      category,
      label: `${parentLabel}の介護・看護の状況は？`,
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
      label: `${parentLabel}は学校・職業訓練に通っていますか？`,
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
      id: `${prefix}_disaster`,
      category,
      label: `${parentLabel}は災害復旧にあたっていますか？`,
      inputType: 'radio',
      options: disasterOptions(prefix),
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
      { label: 'はい（+120）', value: 'adj_single_parent_yes', points: 120 },
    ],
  },
  {
    id: 'adj_parental_leave',
    category: 'adjustment',
    label: '産休・育休明けの入所ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_parental_leave_no', points: 0 },
      { label: 'はい（きょうだい既入所あり）（+100）', value: 'adj_parental_leave_sibling', points: 100 },
      { label: 'はい（きょうだいなし）（+40）', value: 'adj_parental_leave_yes', points: 40 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: 'きょうだいについて該当するものはありますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_no', points: 0 },
      { label: 'きょうだいが既に入所中（+80）', value: 'adj_sibling_enrolled', points: 80 },
      { label: 'きょうだいと同時申込（+30）', value: 'adj_sibling_simultaneous', points: 30 },
    ],
  },
  {
    id: 'adj_nursery_worker',
    category: 'adjustment',
    label: '保育士等として保育施設で就労していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_nursery_worker_no', points: 0 },
      { label: 'はい（月150時間以上）（+70）', value: 'adj_nursery_worker_70', points: 70 },
      { label: 'はい（月120時間以上）（+50）', value: 'adj_nursery_worker_50', points: 50 },
      { label: 'はい（月64時間以上）（+30）', value: 'adj_nursery_worker_30', points: 30 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯（就労支援対象）ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい（+30）', value: 'adj_welfare_yes', points: 30 },
    ],
  },
  {
    id: 'adj_disability_household',
    category: 'adjustment',
    label: '世帯に障がい者がいますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_disability_household_no', points: 0 },
      { label: 'はい（+10）', value: 'adj_disability_household_yes', points: 10 },
    ],
  },
  {
    id: 'adj_delinquent',
    category: 'adjustment',
    label: '保育料の滞納がありますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_delinquent_no', points: 0 },
      { label: '3〜6か月未満の滞納（-20）', value: 'adj_delinquent_3', points: -20 },
      { label: '6〜12か月未満の滞納（-30）', value: 'adj_delinquent_6', points: -30 },
      { label: '12か月以上の滞納（-50）', value: 'adj_delinquent_12', points: -50 },
    ],
  },
];

export const iwamizawaData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
