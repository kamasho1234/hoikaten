import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 知多市 保育園入園 利用調整基準データ
// 出典: 知多市「令和7年度 知多市保育所等入所案内 入所事由及び利用調整基準」
// https://www.city.chita.lg.jp/docs/2024070400018/file_contents/R7nyushoannai.pdf
// ---------------------------------------------------------------------------
// 知多市は「基準点数（父母それぞれ最大13点）＋ 調整点数」の加算方式。
// 合計基準点数最大26点。月の就労時間で判定。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'chita',
  name: '知多市',
  slug: 'chita',
  prefecture: '愛知県',
  maxBasePoints: 26,
} as const;

const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月155時間以上', value: `${prefix}_employment_13`, points: 13 },
  { label: '月140時間以上155時間未満', value: `${prefix}_employment_12`, points: 12 },
  { label: '月115時間以上140時間未満', value: `${prefix}_employment_10`, points: 10 },
  { label: '月90時間以上115時間未満', value: `${prefix}_employment_8`, points: 8 },
  { label: '月64時間以上90時間未満', value: `${prefix}_employment_6`, points: 6 },
];

const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院している', value: `${prefix}_illness_13`, points: 13 },
  { label: '通院が月16日以上', value: `${prefix}_illness_10`, points: 10 },
  { label: '通院が月16日未満', value: `${prefix}_illness_8`, points: 8 },
  { label: '精神的疾病', value: `${prefix}_illness_11`, points: 11 },
];

const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '身体障害者手帳1・2級、療育手帳A、精神1級', value: `${prefix}_disability_10`, points: 10 },
  { label: '身体障害者手帳3・4級、療育手帳B1、精神2級', value: `${prefix}_disability_7`, points: 7 },
  { label: '身体障害者手帳5・6級、療育手帳B2、精神3級', value: `${prefix}_disability_5`, points: 5 },
];

const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '自宅などで常時観察及び介護を要する場合', value: `${prefix}_care_13`, points: 13 },
  { label: '月64時間以上の介護が必要', value: `${prefix}_care_6`, points: 6 },
];

const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産予定月の2か月前から出産月の2か月後', value: `${prefix}_childbirth_11`, points: 11 },
];

const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動中（月64時間以上）', value: `${prefix}_jobseeking_2`, points: 2 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: '知多市では父母それぞれの基準点数（各最大13点）の合計で選考されます',
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
      { label: 'はい（+18）', value: 'adj_single_parent_yes', points: 18 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護を受給していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい（+6）', value: 'adj_welfare_yes', points: 6 },
    ],
  },
  {
    id: 'adj_sibling_in_facility',
    category: 'adjustment',
    label: 'きょうだいが保育所等に在園中、または同時申込ですか？',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_sibling_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_sibling_yes', points: 2 },
    ],
  },
  {
    id: 'adj_sibling_same_facility',
    category: 'adjustment',
    label: '希望の保育所等にきょうだいが在園中ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_same_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_sibling_same_yes', points: 2 },
    ],
  },
  {
    id: 'adj_parental_leave_return',
    category: 'adjustment',
    label: '育児休業からの職場復帰予定ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_parental_leave_no', points: 0 },
      { label: '5～8月復帰予定（-1）', value: 'adj_parental_leave_5to8', points: -1 },
      { label: '9～12月復帰予定（-2）', value: 'adj_parental_leave_9to12', points: -2 },
      { label: '1～3月復帰予定（-3）', value: 'adj_parental_leave_1to3', points: -3 },
    ],
  },
  {
    id: 'adj_fee_delinquent',
    category: 'adjustment',
    label: '保育料等を滞納していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_fee_delinquent_no', points: 0 },
      { label: 'はい（-5）', value: 'adj_fee_delinquent_yes', points: -5 },
    ],
  },
];

export const chitaData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
