import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 三条市 保育園入園 利用調整基準データ
// 出典: 三条市「令和8年度 保育所・保育園の入所申込みについて」
// https://www.city.sanjo.niigata.jp/soshiki/sanjoukyouiku/kyoikuiinkaijimukyoku/kosodateshienka/5/10720.html
// ---------------------------------------------------------------------------
// 三条市は「優先度評価による選考方式」。保護者の就労状況、児童の環境（ひとり親世帯、
// きょうだいの入所状況等）を総合的に判断して優先度を決定します。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'sanjo',
  name: '三条市',
  slug: 'sanjo',
  prefecture: '新潟県',
  maxBasePoints: 100,
} as const;

const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月160時間以上', value: `${prefix}_employment_10`, points: 10 },
  { label: '月140時間以上160時間未満', value: `${prefix}_employment_9`, points: 9 },
  { label: '月120時間以上140時間未満', value: `${prefix}_employment_8`, points: 8 },
  { label: '月100時間以上120時間未満', value: `${prefix}_employment_7`, points: 7 },
  { label: '月80時間以上100時間未満', value: `${prefix}_employment_6`, points: 6 },
  { label: '月64時間以上80時間未満', value: `${prefix}_employment_5`, points: 5 },
  { label: '月48時間以上64時間未満', value: `${prefix}_employment_3`, points: 3 },
];

const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院1か月以上 / 常時病臥', value: `${prefix}_illness_10`, points: 10 },
  { label: '通院加療が必要', value: `${prefix}_illness_5`, points: 5 },
];

const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '身体障害者手帳1・2級 / 精神1級 / 療育A', value: `${prefix}_disability_10`, points: 10 },
  { label: '身体障害者手帳3・4級 / 精神2級 / 療育B1', value: `${prefix}_disability_8`, points: 8 },
  { label: '身体障害者手帳5・6級 / 精神3級 / 療育B2', value: `${prefix}_disability_6`, points: 6 },
];

const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '入院付添1か月以上 / 要介護3〜5の介護', value: `${prefix}_care_10`, points: 10 },
  { label: '要介護1〜2の介護', value: `${prefix}_care_6`, points: 6 },
];

const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産予定日の2か月前〜出産後2か月', value: `${prefix}_childbirth_9`, points: 9 },
];

const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動中（就職活動開始から1か月以内）', value: `${prefix}_jobseeking_3`, points: 3 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: '三条市では保護者の就労状況、児童の環境等を総合的に判断して優先度を決定します',
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
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護受給世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい（+3）', value: 'adj_welfare_yes', points: 3 },
    ],
  },
  {
    id: 'adj_sibling_same_facility',
    category: 'adjustment',
    label: 'きょうだいが同じ保育施設に在園していますか？',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_sibling_same_no', points: 0 },
      { label: 'きょうだいが同じ施設に在園（+3）', value: 'adj_sibling_same_yes', points: 3 },
      { label: 'きょうだいが別の施設に在園（+2）', value: 'adj_sibling_other_yes', points: 2 },
    ],
  },
  {
    id: 'adj_siblings_multiple',
    category: 'adjustment',
    label: '申込児童のきょうだいが2人以上いますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_siblings_multiple_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_siblings_multiple_yes', points: 2 },
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
    id: 'adj_previous_application',
    category: 'adjustment',
    label: '前年度申込みをしましたか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_previous_application_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_previous_application_yes', points: 1 },
    ],
  },
];

export const sanjoData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
