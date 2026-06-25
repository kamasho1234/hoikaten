import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 逗子市 保育園入園 利用調整基準データ
// 出典: 逗子市「保育所等利用調整基準」
// https://www1.g-reiki.net/zushi/reiki_honbun/g210RG00001288.html
// ---------------------------------------------------------------------------
// 逗子市は「基準点数（父母合算）+ 調整点数」の加算方式。
// 基本点数：居宅外労働35-50点、居宅内労働20-45点、求職10点、出産35点、
// 病気・障害10-50点、介護30-50点、職業訓練20点
// 調整点数：ひとり親+90点、同居高齢者-20点、市外居住-100点、
// きょうだい+10-30点、滞納-50点、卒園児+20点
// ---------------------------------------------------------------------------

const municipality = {
  id: 'zushi',
  name: '逗子市',
  slug: 'zushi',
  prefecture: '神奈川県',
  maxBasePoints: 100,
} as const;

const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '居宅外労働35時間以上/週', value: `${prefix}_employment_50`, points: 50 },
  { label: '居宅外労働30時間以上35時間未満/週', value: `${prefix}_employment_45`, points: 45 },
  { label: '居宅外労働25時間以上30時間未満/週', value: `${prefix}_employment_40`, points: 40 },
  { label: '居宅外労働16時間以上25時間未満/週', value: `${prefix}_employment_35`, points: 35 },
  { label: '居宅内労働35時間以上/週', value: `${prefix}_employment_45_home`, points: 45 },
  { label: '居宅内労働30時間以上35時間未満/週', value: `${prefix}_employment_40_home`, points: 40 },
  { label: '居宅内労働25時間以上30時間未満/週', value: `${prefix}_employment_35_home`, points: 35 },
  { label: '居宅内労働16時間以上25時間未満/週', value: `${prefix}_employment_30_home`, points: 30 },
  { label: '片手間労働16時間以上/週', value: `${prefix}_employment_20_piecework`, points: 20 },
];

const jobOfferOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_joboffer_none`, points: 0 },
  { label: '就職予定35時間以上/週', value: `${prefix}_joboffer_35`, points: 35 },
  { label: '就職予定25時間以上35時間未満/週', value: `${prefix}_joboffer_30`, points: 30 },
  { label: '就職予定16時間以上25時間未満/週', value: `${prefix}_joboffer_20`, points: 20 },
];

const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院1か月以上', value: `${prefix}_illness_50`, points: 50 },
  { label: '重度身体障害者手帳1-2級', value: `${prefix}_illness_50_disability`, points: 50 },
  { label: '常時安静の通院加療が必要', value: `${prefix}_illness_45`, points: 45 },
  { label: '中度身体障害者手帳3-4級', value: `${prefix}_illness_45_disability`, points: 45 },
  { label: '通院加療が必要', value: `${prefix}_illness_30`, points: 30 },
  { label: '軽度身体障害者手帳5-6級', value: `${prefix}_illness_30_disability`, points: 30 },
  { label: '定期的な治療が必要', value: `${prefix}_illness_10`, points: 10 },
];

const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '1日8時間以上常時介護', value: `${prefix}_care_50`, points: 50 },
  { label: '1日5時間以上8時間未満介護', value: `${prefix}_care_40`, points: 40 },
  { label: '1日3時間以上5時間未満介護', value: `${prefix}_care_30`, points: 30 },
];

const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産予定（母親のみ対象）', value: `${prefix}_childbirth_35`, points: 35 },
];

const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動中（入所後週16時間以上勤務予定）', value: `${prefix}_jobseeking_10`, points: 10 },
];

const vocationalOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_vocational_none`, points: 0 },
  { label: '職業訓練64時間以上/月', value: `${prefix}_vocational_20`, points: 20 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: '逗子市では父母それぞれの基準点数を合算して選考されます',
    inputType: 'select',
    options: [
      { label: '仕事をしている', value: `${prefix}_reason_employment`, points: 0 },
      { label: '就職が決まっている', value: `${prefix}_reason_joboffer`, points: 0 },
      { label: '病気・障害がある', value: `${prefix}_reason_illness`, points: 0 },
      { label: '介護・看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '出産の前後', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '仕事を探している', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '職業訓練中', value: `${prefix}_reason_vocational`, points: 0 },
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
      id: `${prefix}_joboffer`,
      category,
      label: `${parentLabel}の就職予定時間は？`,
      inputType: 'radio',
      options: jobOfferOptions(prefix),
    },
    {
      id: `${prefix}_illness`,
      category,
      label: `${parentLabel}の病気・障害の状況は？`,
      inputType: 'radio',
      options: illnessOptions(prefix),
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
    {
      id: `${prefix}_vocational`,
      category,
      label: `${parentLabel}の職業訓練は？`,
      inputType: 'radio',
      options: vocationalOptions(prefix),
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
      { label: 'はい（+90）', value: 'adj_single_parent_yes', points: 90 },
    ],
  },
  {
    id: 'adj_living_with_elderly',
    category: 'adjustment',
    label: '65歳未満の親と同居していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_elderly_no', points: 0 },
      { label: 'はい（-20）', value: 'adj_elderly_yes', points: -20 },
    ],
  },
  {
    id: 'adj_city_resident',
    category: 'adjustment',
    label: '逗子市内に住んでいますか？',
    inputType: 'radio',
    options: [
      { label: 'はい', value: 'adj_resident_yes', points: 0 },
      { label: 'いいえ（-100）', value: 'adj_resident_no', points: -100 },
    ],
  },
  {
    id: 'adj_late_payment',
    category: 'adjustment',
    label: '過去に保育料を3か月以上滞納していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_payment_no', points: 0 },
      { label: 'はい（-50）', value: 'adj_payment_yes', points: -50 },
    ],
  },
  {
    id: 'adj_sibling_enrolled',
    category: 'adjustment',
    label: 'きょうだいが当市の認可保育施設に在園していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_no', points: 0 },
      { label: 'はい（+10）', value: 'adj_sibling_yes', points: 10 },
    ],
  },
  {
    id: 'adj_sibling_simultaneous',
    category: 'adjustment',
    label: 'きょうだいと同時申込ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_sim_no', points: 0 },
      { label: 'はい（+11）', value: 'adj_sibling_sim_yes', points: 11 },
    ],
  },
  {
    id: 'adj_graduate',
    category: 'adjustment',
    label: '保育施設卒園児ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_graduate_no', points: 0 },
      { label: 'はい（+20）', value: 'adj_graduate_yes', points: 20 },
    ],
  },
];

export const zushiData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
