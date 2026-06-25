import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 天理市 保育園入園 基本指数・調整指数データ
// 出典：天理市子育て支援課「天理市保育施設等の利用調整に関する基準」参考
// ---------------------------------------------------------------------------
// 天理市は「基本指数（父母��れぞれ最大20点��＋ 調整指数」の加算方式。
// 合計基本指数最大40点。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'tenri',
  name: '天理市',
  slug: 'tenri',
  prefecture: '奈良県',
  maxBasePoints: 40,
} as const;

const employmentOptions = (prefix: string) => [
  { label: 'あて��まらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月160時間以上（フルタイム）', value: `${prefix}_employment_20`, points: 20 },
  { label: '月140時間以上160���間未満', value: `${prefix}_employment_18`, points: 18 },
  { label: '月120時間以上140時間未��', value: `${prefix}_employment_16`, points: 16 },
  { label: '月100時間以上120時間未満', value: `${prefix}_employment_14`, points: 14 },
  { label: '月80時間以上100時間未���', value: `${prefix}_employment_12`, points: 12 },
  { label: '���64時間以上80時間未満', value: `${prefix}_employment_10`, points: 10 },
];

const illnessOptions = (prefix: string) => [
  { label: 'あてはまら��い', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院・安静を要する（重度）', value: `${prefix}_illness_20`, points: 20 },
  { label: '居宅内療養（中度）', value: `${prefix}_illness_16`, points: 16 },
  { label: '通院加療中（軽度）', value: `${prefix}_illness_12`, points: 12 },
];

const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらな���', value: `${prefix}_disability_none`, points: 0 },
  { label: '重度（身体1-2級 / 精神1級 / 療育A）', value: `${prefix}_disability_20`, points: 20 },
  { label: '中度（身体3-4級 / 精神2級 / 療育B1）', value: `${prefix}_disability_16`, points: 16 },
  { label: '軽度（身体5-6級 / 精神3級 / 療育B2）', value: `${prefix}_disability_12`, points: 12 },
];

const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '常時介護（月160時間以上）', value: `${prefix}_care_20`, points: 20 },
  { label: '介護（月120時間以上）', value: `${prefix}_care_16`, points: 16 },
  { label: '介護（月64時間以上）', value: `${prefix}_care_12`, points: 12 },
];

const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '妊娠・産前産後', value: `${prefix}_childbirth_16`, points: 16 },
];

const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらな��', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動中', value: `${prefix}_jobseeking_6`, points: 6 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: '天理市では父母それぞれの基本指数の合計で選考されます',
    inputType: 'select',
    options: [
      { label: '仕事をしている', value: `${prefix}_reason_employment`, points: 0 },
      { label: '病気の治療中', value: `${prefix}_reason_illness`, points: 0 },
      { label: '障害があ���', value: `${prefix}_reason_disability`, points: 0 },
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
      label: `${parentLabel}の病気の状況��？`,
      inputType: 'radio',
      options: illnessOptions(prefix),
    },
    {
      id: `${prefix}_disability`,
      category,
      label: `${parentLabel}���障害の程度は？`,
      inputType: 'radio',
      options: disabilityOptions(prefix),
    },
    {
      id: `${prefix}_care`,
      category,
      label: `${parentLabel}の介護���看護の状況���？`,
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
      label: `${parentLabel}は求���活動をし���いますか？`,
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
      { label: 'はい（+5）', value: 'adj_single_parent_yes', points: 5 },
    ],
  },
  {
    id: 'adj_sibling_enrolled',
    category: 'adjustment',
    label: 'きょうだいが希望する保育施設に在園していますか？',
    inputType: 'radio',
    options: [
      { label: 'あてはまらな���', value: 'adj_sibling_enrolled_no', points: 0 },
      { label: 'はい（+3）', value: 'adj_sibling_enrolled_yes', points: 3 },
    ],
  },
  {
    id: 'adj_sibling_simultaneous',
    category: 'adjustment',
    label: 'きょう��いと同時に入所を希望しますか���',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_sibling_simultaneous_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_sibling_simultaneous_yes', points: 2 },
    ],
  },
  {
    id: 'adj_unlicensed_nursery',
    category: 'adjustment',
    label: '認可外保育施設を月ぎめで利用していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unlicensed_nursery_no', points: 0 },
      { label: 'はい（+3）', value: 'adj_unlicensed_nursery_yes', points: 3 },
    ],
  },
  {
    id: 'adj_parental_leave',
    category: 'adjustment',
    label: '育児休業からの復帰予定ですか？',
    inputType: 'radio',
    options: [
      { label: 'いい���', value: 'adj_parental_leave_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_parental_leave_yes', points: 2 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護受給世��ですか��',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい（+3）', value: 'adj_welfare_yes', points: 3 },
    ],
  },
];

export const tenriData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
