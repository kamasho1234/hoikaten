import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 習志野市 保育園入園 利用調整基準データ
// 出典: 習志野市「令和8年度 認可保育施設入所・入園案内」(PDF)
// https://www.city.narashino.lg.jp/material/files/group/136/R8_nyusyoannai_ver2.pdf
// ---------------------------------------------------------------------------
// 習志野市は「基準点数（父母それぞれ最大25点）＋ 調整点数」の加算方式。
// 合計基準点数最大50点。日々の就労時間で判定。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'narashino',
  name: '習志野市',
  slug: 'narashino',
  prefecture: '千葉県',
  maxBasePoints: 50,
} as const;

const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '1日8時間以上の就労', value: `${prefix}_employment_25`, points: 25 },
  { label: '1日7時間以上の就労', value: `${prefix}_employment_23`, points: 23 },
  { label: '1日6時間以上の就労', value: `${prefix}_employment_21`, points: 21 },
  { label: '1日5時間以上の就労', value: `${prefix}_employment_19`, points: 19 },
  { label: '1日4時間以上の就労', value: `${prefix}_employment_17`, points: 17 },
];

const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院1か月以上 / 常時病臥', value: `${prefix}_illness_25`, points: 25 },
  { label: '就床安静を要する', value: `${prefix}_illness_25b`, points: 25 },
  { label: '介護・付添いが必要である場合（要診断書）', value: `${prefix}_illness_23`, points: 23 },
  { label: '家事・身辺処理程度はできる場合（要診断書）', value: `${prefix}_illness_19`, points: 19 },
];

const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '身体障害者手帳1・2級 / 療育A / 精神1級', value: `${prefix}_disability_25`, points: 25 },
  { label: '身体障害者手帳3・4級 / 療育B-1 / 精神2級', value: `${prefix}_disability_23`, points: 23 },
  { label: '身体障害者手帳5・6級 / 療育B-2 / 精神3級', value: `${prefix}_disability_19`, points: 19 },
];

const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '入院付添1か月以上 / 要介護3～5の介護', value: `${prefix}_care_25`, points: 25 },
  { label: '介護・付添いが必要である親族の介護・看護（要診断書）', value: `${prefix}_care_21`, points: 21 },
  { label: '家事・身辺処理程度はできる親族の介護・看護（要診断書）', value: `${prefix}_care_17`, points: 17 },
];

const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産予定日の2か月前～出産後57日目が属する月の末日', value: `${prefix}_childbirth_23`, points: 23 },
];

const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動中（就職活動開始から1か月以内）', value: `${prefix}_jobseeking_5`, points: 5 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: '習志野市では父母それぞれの基準点数（各最大25点）の合計で選考されます',
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
      label: `${parentLabel}の就労時間（1日あたり）は？`,
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
      { label: 'はい（+5）', value: 'adj_single_parent_yes', points: 5 },
    ],
  },
  {
    id: 'adj_city_facility',
    category: 'adjustment',
    label: '市内認可保育所等に入所中で転所申込ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_city_facility_no', points: 0 },
      { label: 'はい（+0）', value: 'adj_city_facility_yes', points: 0 },
    ],
  },
  {
    id: 'adj_sibling_same_facility',
    category: 'adjustment',
    label: 'きょうだいが市内の認可保育所等に在園しており、同じ施設への入所を希望していますか？',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_sibling_same_no', points: 0 },
      { label: 'きょうだいが別々の認可保育所等に入所中（+2）', value: 'adj_sibling_separate_yes', points: 2 },
      { label: 'きょうだいが同じ認可保育所等に入所中（+2）', value: 'adj_sibling_same_yes', points: 2 },
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
];

export const narashinoData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
