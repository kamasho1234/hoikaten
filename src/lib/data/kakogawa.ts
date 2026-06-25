import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 加古川市 保育園入園 利用調整基準データ
// 出典: 加古川市「令和8年度 保育所等利用調整基準表」
// https://www.city.kakogawa.lg.jp/material/files/group/49/tennsuuhyou.pdf
// ---------------------------------------------------------------------------
// 加古川市は「基準点数（父母それぞれ最大11点）＋ 調整点数」の加算方式。
// 合計基準点数最大22点。月の就労時間で判定。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'kakogawa',
  name: '加古川市',
  slug: 'kakogawa',
  prefecture: '兵庫県',
  maxBasePoints: 22,
} as const;

const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月170時間以上', value: `${prefix}_employment_11`, points: 11 },
  { label: '月160時間以上170時間未満', value: `${prefix}_employment_11`, points: 11 },
  { label: '月140時間以上160時間未満', value: `${prefix}_employment_8`, points: 8 },
  { label: '月128時間以上140時間未満', value: `${prefix}_employment_5`, points: 5 },
  { label: '月112時間以上128時間未満', value: `${prefix}_employment_2`, points: 2 },
  { label: '月96時間以上112時間未満', value: `${prefix}_employment_1`, points: 1 },
  { label: '月64時間以上96時間未満', value: `${prefix}_employment_1`, points: 1 },
  { label: '月48時間以上64時間未満', value: `${prefix}_employment_1`, points: 1 },
  { label: '月48時間未満', value: `${prefix}_employment_0`, points: 0 },
];

const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院', value: `${prefix}_illness_12`, points: 12 },
  { label: '病気負傷', value: `${prefix}_illness_8`, points: 8 },
  { label: '常時要支援', value: `${prefix}_illness_11`, points: 11 },
  { label: '上記以外', value: `${prefix}_illness_5`, points: 5 },
];

const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '身体障害者手帳1・2級 / 精神1級 / 療育A', value: `${prefix}_disability_11`, points: 11 },
  { label: '身体障害者手帳3・4級 / 精神2級 / 療育B1', value: `${prefix}_disability_8`, points: 8 },
  { label: '身体障害者手帳5・6級 / 精神3級 / 療育B2', value: `${prefix}_disability_6`, points: 6 },
];

const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '入院付添', value: `${prefix}_care_11`, points: 11 },
  { label: '同居親族介護看護', value: `${prefix}_care_9`, points: 9 },
  { label: '上記以外', value: `${prefix}_care_5`, points: 5 },
];

const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '妊娠・出産（産前・産後休暇 育児休業）', value: `${prefix}_childbirth_base`, points: 0 },
  { label: '常時安静', value: `${prefix}_childbirth_11`, points: 11 },
];

const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職中', value: `${prefix}_jobseeking_5`, points: 5 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: '加古川市では父母それぞれの基準点数（各最大11点）の合計で選考されます',
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
    id: 'adj_siblings_in_facility',
    category: 'adjustment',
    label: 'きょうだいが加古川市内の保育所等に在園していますか？',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_siblings_in_facility_no', points: 0 },
      { label: 'はい（+4）', value: 'adj_siblings_in_facility_yes', points: 4 },
    ],
  },
  {
    id: 'adj_siblings_simultaneous',
    category: 'adjustment',
    label: 'きょうだいが同時に利用調整を希望していますか？',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_siblings_simultaneous_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_siblings_simultaneous_yes', points: 1 },
    ],
  },
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_single_parent_yes', points: 2 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護受給世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい（+5）', value: 'adj_welfare_yes', points: 5 },
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
    id: 'adj_residence_years',
    category: 'adjustment',
    label: '加古川市での居住年数は？',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_residence_years_none', points: 0 },
      { label: '長い（+1）', value: 'adj_residence_years_long', points: 1 },
    ],
  },
  {
    id: 'adj_distance',
    category: 'adjustment',
    label: '希望園までの距離は？',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_distance_none', points: 0 },
      { label: '短い（+2）', value: 'adj_distance_short', points: 2 },
    ],
  },
  {
    id: 'adj_nursery_fee_delinquent',
    category: 'adjustment',
    label: '保育料を滞納していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_fee_delinquent_no', points: 0 },
      { label: 'はい（-10）', value: 'adj_fee_delinquent_yes', points: -10 },
    ],
  },
  {
    id: 'adj_disaster_recovery',
    category: 'adjustment',
    label: '災害復旧に当たっていますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_disaster_recovery_no', points: 0 },
      { label: 'はい（+12）', value: 'adj_disaster_recovery_yes', points: 12 },
    ],
  },
];

export const kakogawaData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
