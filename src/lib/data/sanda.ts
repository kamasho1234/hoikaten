import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 三田市 保育園入園 利用調整基準データ
// 出典: 三田市「令和8年度 保育所等の利用調整に関する基準」
// https://www.city.sanda.lg.jp/material/files/group/25/23_R8_riyoutyoseihyou.pdf
// ---------------------------------------------------------------------------
// 三田市は「基準指数（父母それぞれ最大20点）＋ 調整指数」の加算方式。
// ひとり親世帯は基準指数に+20点を加算。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'sanda',
  name: '三田市',
  slug: 'sanda',
  prefecture: '兵庫県',
  maxBasePoints: 40,
} as const;

const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月20日以上、1日8時間以上', value: `${prefix}_employment_20`, points: 20 },
  { label: '月20日以上、1日6時間以上8時間未満', value: `${prefix}_employment_18`, points: 18 },
  { label: '月20日以上、1日4時間以上6時間未満', value: `${prefix}_employment_16`, points: 16 },
  { label: '月16日以上、1日8時間以上', value: `${prefix}_employment_18`, points: 18 },
  { label: '月16日以上、1日6時間以上8時間未満', value: `${prefix}_employment_16`, points: 16 },
  { label: '月16日以上、1日4時間以上6時間未満', value: `${prefix}_employment_14`, points: 14 },
  { label: '上記に該当しないが、月64時間以上働いている', value: `${prefix}_employment_10`, points: 10 },
];

const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動中（月20日以上）', value: `${prefix}_jobseeking_4`, points: 4 },
  { label: '求職活動中（月16日以上）', value: `${prefix}_jobseeking_4`, points: 4 },
  { label: '定期的に求職活動をしていると認められる', value: `${prefix}_jobseeking_7`, points: 7 },
  { label: '求職中（上記以外）', value: `${prefix}_jobseeking_2`, points: 2 },
];

const pregnancyOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_pregnancy_none`, points: 0 },
  { label: '出産予定日前後8週間の期間', value: `${prefix}_pregnancy_14`, points: 14 },
];

const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '月120時間以上就学', value: `${prefix}_education_14`, points: 14 },
  { label: '月64時間以上就学', value: `${prefix}_education_10`, points: 10 },
];

const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '3か月以上入院または入院相当の自宅療養', value: `${prefix}_illness_20`, points: 20 },
  { label: '1か月以上入院または入院相当の自宅療養', value: `${prefix}_illness_17`, points: 17 },
  { label: '通院加療を行い、常に安静を要する', value: `${prefix}_illness_13`, points: 13 },
  { label: '病気などにより保育に支障がある（上記以外）', value: `${prefix}_illness_10`, points: 10 },
];

const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '身体障害1-2級 / 精神1級 / 療育A（常時困難）', value: `${prefix}_disability_20`, points: 20 },
  { label: '身体障害3-4級 / 精神2級 / 療育B1（著しく困難）', value: `${prefix}_disability_18`, points: 18 },
  { label: '身体障害5-6級 / 精神3級 / 療育B2（困難）', value: `${prefix}_disability_16`, points: 16 },
];

const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '身体障害1-2級等の介護（常時困難）', value: `${prefix}_care_20`, points: 20 },
  { label: '身体障害3-4級等の介護（著しく困難）', value: `${prefix}_care_18`, points: 18 },
  { label: '身体障害5-6級等の介護（困難）', value: `${prefix}_care_16`, points: 16 },
  { label: '入院付き添いなど（支障がある）', value: `${prefix}_care_12`, points: 12 },
];

const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '災害復旧に当たっている', value: `${prefix}_disaster_20`, points: 20 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: '三田市では父母それぞれの基準指数（各最大20点）を合算して選考されます。ひとり親世帯は基準指数に20点を加算します',
    inputType: 'select',
    options: [
      { label: '仕事をしている', value: `${prefix}_reason_employment`, points: 0 },
      { label: '求職活動中', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '妊娠・出産', value: `${prefix}_reason_pregnancy`, points: 0 },
      { label: '就学中', value: `${prefix}_reason_education`, points: 0 },
      { label: '病気・障害', value: `${prefix}_reason_illness`, points: 0 },
      { label: '介護・看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '災害復旧', value: `${prefix}_reason_disaster`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の就労時間は？`,
      inputType: 'radio',
      options: employmentOptions(prefix),
    },
    {
      id: `${prefix}_jobseeking`,
      category,
      label: `${parentLabel}の求職活動は？`,
      inputType: 'radio',
      options: jobSeekingOptions(prefix),
    },
    {
      id: `${prefix}_pregnancy`,
      category,
      label: `${parentLabel}の出産予定は？`,
      inputType: 'radio',
      options: pregnancyOptions(prefix),
    },
    {
      id: `${prefix}_education`,
      category,
      label: `${parentLabel}の就学時間は？`,
      inputType: 'radio',
      options: educationOptions(prefix),
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
      id: `${prefix}_disaster`,
      category,
      label: `${parentLabel}は災害復旧に当たっていますか？`,
      inputType: 'radio',
      options: disasterOptions(prefix),
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
      { label: 'はい（+7）', value: 'adj_single_parent_yes', points: 7 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護または中国残留邦人支援給付受給世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_welfare_yes', points: 2 },
    ],
  },
  {
    id: 'adj_siblings_in_facility',
    category: 'adjustment',
    label: 'きょうだいが保育所等に在園していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_siblings_in_facility_no', points: 0 },
      { label: 'はい（+4）', value: 'adj_siblings_in_facility_yes', points: 4 },
    ],
  },
  {
    id: 'adj_simultaneous_application',
    category: 'adjustment',
    label: '同時に2人以上の申込みをしていますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_simultaneous_application_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_simultaneous_application_yes', points: 2 },
    ],
  },
  {
    id: 'adj_multiples',
    category: 'adjustment',
    label: '多胎児が同時に申込みをしていますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_multiples_no', points: 0 },
      { label: 'はい（+4）', value: 'adj_multiples_yes', points: 4 },
    ],
  },
  {
    id: 'adj_residence',
    category: 'adjustment',
    label: '三田市内に在住していますか？',
    inputType: 'radio',
    options: [
      { label: 'はい', value: 'adj_residence_yes', points: 0 },
      { label: '転入予定だが住所未定（-5）', value: 'adj_residence_undefined', points: -5 },
      { label: 'いいえ（-20）', value: 'adj_residence_no', points: -20 },
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
  {
    id: 'adj_parental_leave_extension',
    category: 'adjustment',
    label: '育児休業延長を希望していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_parental_leave_extension_no', points: 0 },
      { label: 'はい（-20）', value: 'adj_parental_leave_extension_yes', points: -20 },
    ],
  },
];

export const sandaData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
