import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 野田市 保育園入園 利用調整基準データ
// 出典: 野田市「令和8年度 利用調整基準表」
// https://www.city.noda.chiba.jp/kurashi/kosodate/hoiku/1011759.html
// ---------------------------------------------------------------------------
// 野田市は「基準点数（父母それぞれ最大10点）＋ 調整点数」の加算方式。
// 合計基準点数最大20点。月の就労時間で判定。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'noda',
  name: '野田市',
  slug: 'noda',
  prefecture: '千葉県',
  maxBasePoints: 20,
} as const;

const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月160時間以上', value: `${prefix}_employment_10`, points: 10 },
  { label: '月140時間以上160時間未満', value: `${prefix}_employment_9`, points: 9 },
  { label: '月120時間以上140時間未満', value: `${prefix}_employment_8`, points: 8 },
  { label: '月100時間以上120時間未満', value: `${prefix}_employment_7`, points: 7 },
  { label: '月80時間以上100時間未満', value: `${prefix}_employment_6`, points: 6 },
  { label: '月64時間以上80時間未満', value: `${prefix}_employment_5`, points: 5 },
  { label: '求職中（派遣開始予定を含む）', value: `${prefix}_employment_3`, points: 3 },
];

const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院が必要または常時病臥', value: `${prefix}_illness_10`, points: 10 },
  { label: '治療のため継続的な通院が必要', value: `${prefix}_illness_5`, points: 5 },
];

const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '身体障害者手帳1・2級 / 精神障害者保健福祉手帳1級 / 療育手帳A', value: `${prefix}_disability_10`, points: 10 },
  { label: '身体障害者手帳3・4級 / 精神障害者保健福祉手帳2級 / 療育手帳B1', value: `${prefix}_disability_8`, points: 8 },
  { label: '身体障害者手帳5・6級 / 精神障害者保健福祉手帳3級 / 療育手帳B2', value: `${prefix}_disability_6`, points: 6 },
];

const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '要介護3〜5、または入院付添が必要', value: `${prefix}_care_10`, points: 10 },
  { label: '要介護1〜2の介護が必要', value: `${prefix}_care_6`, points: 6 },
];

const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産予定日の前後3か月以内', value: `${prefix}_childbirth_9`, points: 9 },
];

const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動中（就職活動開始から3か月以内）', value: `${prefix}_jobseeking_3`, points: 3 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: '野田市では父母それぞれの基準点数（各最大10点）の合計で選考されます',
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
      { label: 'はい（+4）', value: 'adj_single_parent_yes', points: 4 },
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
    id: 'adj_siblings_daycare',
    category: 'adjustment',
    label: 'きょうだいが市内の認可保育施設に在園していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_siblings_daycare_no', points: 0 },
      { label: 'はい（+3）', value: 'adj_siblings_daycare_yes', points: 3 },
    ],
  },
  {
    id: 'adj_same_facility',
    category: 'adjustment',
    label: 'きょうだいが同じ施設を希望していますか？',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_same_facility_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_same_facility_yes', points: 2 },
    ],
  },
  {
    id: 'adj_parental_leave',
    category: 'adjustment',
    label: '育児休業からの職場復帰を予定していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_parental_leave_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_parental_leave_yes', points: 2 },
    ],
  },
  {
    id: 'adj_multiple_children',
    category: 'adjustment',
    label: '申込児童を含めてお子さんが3人以上いますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_multiple_children_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_multiple_children_yes', points: 1 },
    ],
  },
  {
    id: 'adj_transfer',
    category: 'adjustment',
    label: '市外から転入予定ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_transfer_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_transfer_yes', points: 1 },
    ],
  },
  {
    id: 'adj_fee_delinquent',
    category: 'adjustment',
    label: '現在、保育料を滞納していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_fee_delinquent_no', points: 0 },
      { label: 'はい（-3）', value: 'adj_fee_delinquent_yes', points: -3 },
    ],
  },
];

export const nodaData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
