import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 渋川市 保育園入園 基本指数・調整指数データ
// 出典: 渋川市子育て応援なび「令和8年度 保育所・認定こども園（保育）の利用申込手続き」
// https://kosodate.city.shibukawa.lg.jp/purpose/entrust/2/321.html
// ---------------------------------------------------------------------------
// 渋川市は「基準点数（父母それぞれ最大20点）＋ 調整点数」の加算方式。
// 合計基準点数最大40点。月の就労時間で判定。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'shibukawa',
  name: '渋川市',
  slug: 'shibukawa',
  prefecture: '群馬県',
  maxBasePoints: 40,
} as const;

const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月160時間以上', value: `${prefix}_employment_20`, points: 20 },
  { label: '月120時間以上160時間未満', value: `${prefix}_employment_18`, points: 18 },
  { label: '月100時間以上120時間未満', value: `${prefix}_employment_16`, points: 16 },
  { label: '月80時間以上100時間未満', value: `${prefix}_employment_14`, points: 14 },
  { label: '月64時間以上80時間未満', value: `${prefix}_employment_12`, points: 12 },
  { label: '月48時間以上64時間未満', value: `${prefix}_employment_8`, points: 8 },
];

const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院1ヶ月以上／常時病臥', value: `${prefix}_illness_20`, points: 20 },
  { label: '安静を要する（自宅療養1ヶ月以上）', value: `${prefix}_illness_17`, points: 17 },
  { label: '通院加療中（週2日以上）', value: `${prefix}_illness_13`, points: 13 },
];

const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '身体障害者手帳1・2級／療育手帳A', value: `${prefix}_disability_20`, points: 20 },
  { label: '身体障害者手帳3級／療育手帳B', value: `${prefix}_disability_17`, points: 17 },
  { label: '精神障害者保健福祉手帳1・2級', value: `${prefix}_disability_17b`, points: 17 },
  { label: '身体障害者手帳4級以下／精神3級', value: `${prefix}_disability_13`, points: 13 },
];

const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '月160時間以上の介護・看護', value: `${prefix}_care_20`, points: 20 },
  { label: '月120時間以上160時間未満の介護・看護', value: `${prefix}_care_18`, points: 18 },
  { label: '月80時間以上120時間未満の介護・看護', value: `${prefix}_care_14`, points: 14 },
  { label: '月64時間以上80時間未満の介護・看護', value: `${prefix}_care_12`, points: 12 },
];

const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産前後（産前2ヶ月～産後8週）', value: `${prefix}_childbirth_20`, points: 20 },
];

const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '月160時間以上の就学・技能習得', value: `${prefix}_education_20`, points: 20 },
  { label: '月120時間以上160時間未満の就学', value: `${prefix}_education_18`, points: 18 },
  { label: '月80時間以上120時間未満の就学', value: `${prefix}_education_14`, points: 14 },
  { label: '月64時間以上80時間未満の就学', value: `${prefix}_education_12`, points: 12 },
];

const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '就労内定あり', value: `${prefix}_jobseeking_10`, points: 10 },
  { label: '求職活動中', value: `${prefix}_jobseeking_5`, points: 5 },
];

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
      helpText: '月あたりの就労時間を選んでください（通勤時間は含まず）',
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
      helpText: '月あたりの通学日数・時間を選んでください',
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

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親で就労していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい（+3）', value: 'adj_single_parent_yes', points: 3 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護受給世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_welfare_yes', points: 2 },
    ],
  },
  {
    id: 'adj_sibling_same_facility',
    category: 'adjustment',
    label: 'きょうだいが市内の認可保育所に在園中ですか？',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_sibling_same_no', points: 0 },
      { label: 'きょうだいが同じ施設希望（+2）', value: 'adj_sibling_same_yes', points: 2 },
      { label: 'きょうだいが別の施設に在園（+1）', value: 'adj_sibling_other_yes', points: 1 },
    ],
  },
  {
    id: 'adj_parental_leave',
    category: 'adjustment',
    label: '育児休業からの復帰予定ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_parental_leave_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_parental_leave_yes', points: 2 },
    ],
  },
  {
    id: 'adj_previous_application_denied',
    category: 'adjustment',
    label: '前年度の利用申込で不承諾になっていますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_denied_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_denied_yes', points: 1 },
    ],
  },
  {
    id: 'adj_nursery_fee_delinquent',
    category: 'adjustment',
    label: '保育料を滞納していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_fee_delinquent_no', points: 0 },
      { label: 'はい（-5）', value: 'adj_fee_delinquent_yes', points: -5 },
    ],
  },
];

export const shibukwaData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
