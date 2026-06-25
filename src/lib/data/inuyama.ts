import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 犬山市 保育園入園 利用調整基準データ
// 出典: 犬山市「犬山市保育園入園選考基準指数表」
// https://www.city.inuyama.aichi.jp/_res/projects/default_project/_page_/001/003/304/kijyunnhyo.pdf
// ---------------------------------------------------------------------------
// 犬山市は「基準指数＋調整指数」の合計値で判定する加算方式。
// 基本指数は父母それぞれで計算し、低い方を採用。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'inuyama',
  name: '犬山市',
  slug: 'inuyama',
  prefecture: '愛知県',
  maxBasePoints: 20,
} as const;

const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月150時間以上', value: `${prefix}_employment_10`, points: 10 },
  { label: '月120時間以上150時間未満', value: `${prefix}_employment_9`, points: 9 },
  { label: '月90時間以上120時間未満', value: `${prefix}_employment_8`, points: 8 },
  { label: '月60時間以上90時間未満', value: `${prefix}_employment_7`, points: 7 },
];

const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産前後の休養', value: `${prefix}_childbirth_6`, points: 6 },
];

const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '病院等入院', value: `${prefix}_illness_10`, points: 10 },
  { label: '居宅内療養（常時臥床）', value: `${prefix}_illness_10_bedridden`, points: 10 },
  { label: '精神性疾患', value: `${prefix}_illness_7`, points: 7 },
  { label: '一般疾患', value: `${prefix}_illness_5`, points: 5 },
];

const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '身体障害者手帳1・2級、療育手帳A判定、精神1級', value: `${prefix}_disability_10`, points: 10 },
  { label: '身体障害者手帳5・6級、療育手帳C判定、精神3級', value: `${prefix}_disability_5`, points: 5 },
  { label: '身体障害者3・4級、療育手帳B判定、精神2級、進行性筋萎縮症、自閉症', value: `${prefix}_disability_7`, points: 7 },
];

const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '病院等付き添い', value: `${prefix}_care_7`, points: 7 },
  { label: '要介護3～5、身体障害者手帳1・2級等', value: `${prefix}_care_10`, points: 10 },
  { label: '要介護1・2、身体障害者手帳3級以下', value: `${prefix}_care_7`, points: 7 },
];

const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動中（起業準備含む）', value: `${prefix}_jobseeking_4`, points: 4 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: '犬山市では父母それぞれの基準指数を計算し、低い方を採用して優先順位を判定します',
    inputType: 'select',
    options: [
      { label: '仕事をしている', value: `${prefix}_reason_employment`, points: 0 },
      { label: '出産の前後', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '病気・障害', value: `${prefix}_reason_illness`, points: 0 },
      { label: '介護・看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '災害復旧', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '仕事を探している', value: `${prefix}_reason_jobseeking`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の就労時間（月あたり）は？`,
      inputType: 'radio',
      options: employmentOptions(prefix),
    },
    {
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}の出産の状況は？`,
      inputType: 'radio',
      options: childbirthOptions(prefix),
    },
    {
      id: `${prefix}_illness`,
      category,
      label: `${parentLabel}の疾病・障害の状況は？`,
      inputType: 'radio',
      options: illnessOptions(prefix),
    },
    {
      id: `${prefix}_disability`,
      category,
      label: `${parentLabel}の身体障害の程度は？`,
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
    id: 'adj_dv_abuse',
    category: 'adjustment',
    label: '虐待またはDVのおそれがありますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_dv_abuse_no', points: 0 },
      { label: 'はい（+8）', value: 'adj_dv_abuse_yes', points: 8 },
    ],
  },
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい（+3）', value: 'adj_single_parent_yes', points: 3 },
    ],
  },
  {
    id: 'adj_sibling_in_facility',
    category: 'adjustment',
    label: '兄弟姉妹が保育所に在園中または同時申込ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_sibling_yes', points: 2 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_welfare_yes', points: 2 },
    ],
  },
  {
    id: 'adj_child_disability',
    category: 'adjustment',
    label: 'お子さんが身体障害を有していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_child_disability_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_child_disability_yes', points: 1 },
    ],
  },
  {
    id: 'adj_employment_loss',
    category: 'adjustment',
    label: '生計中心者が失業により就労の必要性が高いですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_employment_loss_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_employment_loss_yes', points: 1 },
    ],
  },
  {
    id: 'adj_childcare_worker',
    category: 'adjustment',
    label: '保護者が保育士として勤務予定ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_childcare_worker_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_childcare_worker_yes', points: 1 },
    ],
  },
];

export const inuyamaData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
