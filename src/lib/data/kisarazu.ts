import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 木更津市 保育園入園 利用調整基準データ
// 出典: 木更津市「令和8年度 利用調整基準表」
// https://www.city.kisarazu.lg.jp/soshiki/kenkokodomo/kodomohoiku/1/2329.html
// ---------------------------------------------------------------------------
// 木更津市は「基準点数（父母それぞれ最大10点）＋ 調整点数」の加算方式。
// 合計基準点数最大20点。月の就労時間で判定。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'kisarazu',
  name: '木更津市',
  slug: 'kisarazu',
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
  { label: '求職活動中（実績者を含む）', value: `${prefix}_employment_3`, points: 3 },
];

const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院が必要 / 常時病臥', value: `${prefix}_illness_10`, points: 10 },
  { label: '医療機関への継続通院が必要', value: `${prefix}_illness_5`, points: 5 },
];

const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '身体障害者手帳1・2級 / 精神1級 / 療育A', value: `${prefix}_disability_10`, points: 10 },
  { label: '身体障害者手帳3・4級 / 精神2級 / 療育B1', value: `${prefix}_disability_8`, points: 8 },
  { label: '身体障害者手帳5・6級 / 精神3級 / 療育B2', value: `${prefix}_disability_6`, points: 6 },
];

const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '要介護3〜5 / 入院付添が必要', value: `${prefix}_care_10`, points: 10 },
  { label: '要介護1〜2の介護が必要', value: `${prefix}_care_6`, points: 6 },
];

const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産予定日の前後3か月以内', value: `${prefix}_childbirth_9`, points: 9 },
];

const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動をしている（登録から3か月以内）', value: `${prefix}_jobseeking_3`, points: 3 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: '木更津市では父母それぞれの基準点数（各最大10点）の合計で選考されます',
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
    id: 'adj_welfare_recipient',
    category: 'adjustment',
    label: '生活保護受給世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい（+3）', value: 'adj_welfare_yes', points: 3 },
    ],
  },
  {
    id: 'adj_sibling_in_daycare',
    category: 'adjustment',
    label: 'きょうだいが市内の保育施設に在園していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_no', points: 0 },
      { label: 'はい（+3）', value: 'adj_sibling_yes', points: 3 },
    ],
  },
  {
    id: 'adj_same_facility',
    category: 'adjustment',
    label: 'きょうだいと同じ施設を希望していますか？',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_same_facility_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_same_facility_yes', points: 2 },
    ],
  },
  {
    id: 'adj_return_from_parental_leave',
    category: 'adjustment',
    label: '育児休業から職場復帰を予定していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_return_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_return_yes', points: 2 },
    ],
  },
  {
    id: 'adj_scheduled_return_to_work',
    category: 'adjustment',
    label: '出産のため現在休職中で、復帰予定がありますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_scheduled_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_scheduled_yes', points: 2 },
    ],
  },
  {
    id: 'adj_three_or_more_children',
    category: 'adjustment',
    label: '申込児童を含めてお子さんが3人以上いますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_three_children_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_three_children_yes', points: 1 },
    ],
  },
  {
    id: 'adj_nursery_fee_arrears',
    category: 'adjustment',
    label: '現在、保育料を滞納していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_arrears_no', points: 0 },
      { label: 'はい（-3）', value: 'adj_arrears_yes', points: -3 },
    ],
  },
];

export const kisarazuData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
