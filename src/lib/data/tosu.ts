import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 鳥栖市 保育園入園 利用調整基準データ
// 出典: 鳥栖市「令和8年度 保育施設の入所について」
// https://www.city.tosu.lg.jp/soshiki/9/1060.html
// ---------------------------------------------------------------------------
// 鳥栖市は「基準指数（父母それぞれ最大10点）＋ 調整指数」の加算方式。
// 合計基準点数最大20点。月の就労時間で判定。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'tosu',
  name: '鳥栖市',
  slug: 'tosu',
  prefecture: '佐賀県',
  maxBasePoints: 20,
} as const;

const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月140時間以上（目安：1日7時間以上、月20日以上）', value: `${prefix}_employment_10`, points: 10 },
  { label: '月120時間以上140時間未満', value: `${prefix}_employment_9`, points: 9 },
  { label: '月100時間以上120時間未満', value: `${prefix}_employment_8`, points: 8 },
  { label: '月80時間以上100時間未満', value: `${prefix}_employment_7`, points: 7 },
  { label: '月64時間以上80時間未満', value: `${prefix}_employment_6`, points: 6 },
  { label: '月64時間未満', value: `${prefix}_employment_4`, points: 4 },
];

const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院1か月以上または常時病臥', value: `${prefix}_illness_10`, points: 10 },
  { label: '通院加療が必要', value: `${prefix}_illness_5`, points: 5 },
];

const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '身体障害者手帳1・2級 / 療育A', value: `${prefix}_disability_10`, points: 10 },
  { label: '身体障害者手帳3・4級 / 療育B1', value: `${prefix}_disability_8`, points: 8 },
  { label: '身体障害者手帳5・6級 / 療育B2', value: `${prefix}_disability_6`, points: 6 },
];

const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '入院付添1か月以上 / 要介護3～5の介護', value: `${prefix}_care_10`, points: 10 },
  { label: '要介護1～2の介護', value: `${prefix}_care_6`, points: 6 },
];

const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産予定日の2か月前～出産後2か月', value: `${prefix}_childbirth_9`, points: 9 },
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
    helpText: '鳥栖市では父母それぞれの基準指数（各最大10点）の合計で選考されます',
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
    label: 'きょうだいが市内の認可保育所に在園していますか？',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_sibling_same_no', points: 0 },
      { label: 'きょうだいが別施設に在園（+4）', value: 'adj_sibling_outside_yes', points: 4 },
      { label: 'きょうだいが同じ施設を希望（+2）', value: 'adj_sibling_same_yes', points: 2 },
    ],
  },
  {
    id: 'adj_siblings_multiple',
    category: 'adjustment',
    label: '申込児童のきょうだいが2人以上いますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_siblings_multiple_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_siblings_multiple_yes', points: 1 },
    ],
  },
  {
    id: 'adj_parental_leave',
    category: 'adjustment',
    label: '育児休業からの復帰予定ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_parental_leave_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_parental_leave_yes', points: 1 },
    ],
  },
  {
    id: 'adj_fee_delinquent',
    category: 'adjustment',
    label: '保育料を滞納していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_fee_delinquent_no', points: 0 },
      { label: 'はい（-5）', value: 'adj_fee_delinquent_yes', points: -5 },
    ],
  },
  {
    id: 'adj_transfer_in',
    category: 'adjustment',
    label: '市内への転入予定がありますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_transfer_in_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_transfer_in_yes', points: 1 },
    ],
  },
  {
    id: 'adj_employment_both_parents',
    category: 'adjustment',
    label: '両親ともに就労していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_employment_both_parents_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_employment_both_parents_yes', points: 1 },
    ],
  },
];

export const tosuData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
