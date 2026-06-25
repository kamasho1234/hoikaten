import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 可児市 保育所入所 基準点数・調整点数データ
// 出典: 可児市子育て支援課「令和8年度 保育施設等利用案内」
// 参考: 同県内（各務原市）の指数表に準じた岐阜県標準方式
// ---------------------------------------------------------------------------
// 可児市は「基本点数（父母それぞれ最大100点）＋ 調整点数」の加算方式。
// 合計基本点数最大200点。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'kani',
  name: '可児市',
  slug: 'kani',
  prefecture: '岐阜県',
  maxBasePoints: 200,
} as const;

const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月140時間以上', value: `${prefix}_employment_100`, points: 100 },
  { label: '月120時間以上140時間未満', value: `${prefix}_employment_90`, points: 90 },
  { label: '月100時間以上120時間未満', value: `${prefix}_employment_80`, points: 80 },
  { label: '月80時間以上100時間未満', value: `${prefix}_employment_70`, points: 70 },
  { label: '月64時間以上80時間未満', value: `${prefix}_employment_60`, points: 60 },
  { label: '月48時間以上64時間未満', value: `${prefix}_employment_50`, points: 50 },
];

const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院1ヶ月以上・常時病臥', value: `${prefix}_illness_100`, points: 100 },
  { label: '自宅療養・安静が必要', value: `${prefix}_illness_80`, points: 80 },
  { label: '通院加療中', value: `${prefix}_illness_60`, points: 60 },
];

const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '身体障害者手帳1・2級 / 療育手帳A', value: `${prefix}_disability_100`, points: 100 },
  { label: '身体障害者手帳3・4級 / 療育手帳B1', value: `${prefix}_disability_80`, points: 80 },
  { label: '身体障害者手帳5・6級 / 療育手帳B2', value: `${prefix}_disability_60`, points: 60 },
];

const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '月140時間以上の介護・看護', value: `${prefix}_care_100`, points: 100 },
  { label: '月120時間以上140時間未満', value: `${prefix}_care_90`, points: 90 },
  { label: '��80時間以上120時間未満', value: `${prefix}_care_70`, points: 70 },
  { label: '月64時間以上80時間未満', value: `${prefix}_care_60`, points: 60 },
];

const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産前後（産前6週〜産後8週）', value: `${prefix}_childbirth_80`, points: 80 },
];

const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動中', value: `${prefix}_jobseeking_40`, points: 40 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: '可児市では父母それぞれの基本点数（各100点満点）の合計で選考されます',
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
      label: `${parentLabel}の就労時間（月あたり）は？`,
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
      label: `${parentLabel}の介護・看護の状況は？`,
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
      { label: 'はい（+20）', value: 'adj_single_parent_yes', points: 20 },
    ],
  },
  {
    id: 'adj_sibling_enrolled',
    category: 'adjustment',
    label: 'きょうだいが希望する保育施設に在園していますか？',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_sibling_enrolled_no', points: 0 },
      { label: 'はい（+10）', value: 'adj_sibling_enrolled_yes', points: 10 },
    ],
  },
  {
    id: 'adj_sibling_simultaneous',
    category: 'adjustment',
    label: 'きょうだいと同時に入所を希望しますか？',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_sibling_simultaneous_no', points: 0 },
      { label: 'はい（+5）', value: 'adj_sibling_simultaneous_yes', points: 5 },
    ],
  },
  {
    id: 'adj_unlicensed_nursery',
    category: 'adjustment',
    label: '認可外保育施設を月ぎめで利用していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unlicensed_nursery_no', points: 0 },
      { label: 'はい（+10）', value: 'adj_unlicensed_nursery_yes', points: 10 },
    ],
  },
  {
    id: 'adj_parental_leave',
    category: 'adjustment',
    label: '育児休業からの復帰予定ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_parental_leave_no', points: 0 },
      { label: 'はい（+5）', value: 'adj_parental_leave_yes', points: 5 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護受給世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい（+10）', value: 'adj_welfare_yes', points: 10 },
    ],
  },
];

export const kaniData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
