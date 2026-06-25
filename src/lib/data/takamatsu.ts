import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 高松市 保育園入園 利用調整基準データ
// 出典: 高松市「保育施設等の利用調整に関する要綱（令和7年12月23日施行）」
// https://www.city.takamatsu.kagawa.jp/kurashi/kosodate/youchien_hoiku/kodomoen/hoiku/h29riyou.html
// ---------------------------------------------------------------------------
// 高松市は「基準点数（父母それぞれ最大20点の下限値を採用）＋ 調整点数」の加算方式。
// 合計基準点数最大20点。月の就労時間で判定。父母2人の基準点数は下限値を採用（MIN方式）。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'takamatsu',
  name: '高松市',
  slug: 'takamatsu',
  prefecture: '香川県',
  maxBasePoints: 20,
  scoringMethod: 'min',
} as const;

const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月160時間以上', value: `${prefix}_employment_20`, points: 20 },
  { label: '月140時間以上160時間未満', value: `${prefix}_employment_18`, points: 18 },
  { label: '月120時間以上140時間未満', value: `${prefix}_employment_16`, points: 16 },
  { label: '月100時間以上120時間未満', value: `${prefix}_employment_14`, points: 14 },
  { label: '月80時間以上100時間未満', value: `${prefix}_employment_12`, points: 12 },
  { label: '月64時間以上80時間未満', value: `${prefix}_employment_10`, points: 10 },
];

const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '1か月以上の入院（入院見込み含む）/ 常時臥床', value: `${prefix}_illness_20`, points: 20 },
  { label: '1か月以上の安静 / 日常生活動作に支障', value: `${prefix}_illness_18`, points: 18 },
  { label: '通院加療', value: `${prefix}_illness_12`, points: 12 },
];

const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '身体1-2級 / 精神1-2級 / 療育Ⓐ・A / 要介護3-5', value: `${prefix}_disability_20`, points: 20 },
  { label: '身体3級 / 精神3級 / 療育Ⓑ・B / 要介護1-2', value: `${prefix}_disability_18`, points: 18 },
  { label: '身体4-6級 / 要支援', value: `${prefix}_disability_12`, points: 12 },
];

const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '介護・看護（就労に準ずる）', value: `${prefix}_care_20`, points: 20 },
];

const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '妊娠・出産（出産後8週間まで）', value: `${prefix}_childbirth_16`, points: 16 },
];

const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '災害復旧', value: `${prefix}_disaster_20`, points: 20 },
];

const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動・起業準備', value: `${prefix}_jobseeking_4`, points: 4 },
];

const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '就学・技能習得等（就労に準ずる）', value: `${prefix}_education_20`, points: 20 },
];

const dvOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_dv_none`, points: 0 },
  { label: '虐待・DV', value: `${prefix}_dv_30`, points: 30 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: '高松市では父母それぞれの基準点数（各最大20点）で下限値を採用します',
    inputType: 'select',
    options: [
      { label: '仕事をしている', value: `${prefix}_reason_employment`, points: 0 },
      { label: '病気の治療中', value: `${prefix}_reason_illness`, points: 0 },
      { label: '障害がある', value: `${prefix}_reason_disability`, points: 0 },
      { label: '介護・看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '妊娠・出産の前後', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '災害復旧', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '仕事を探している', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '就学・技能習得', value: `${prefix}_reason_education`, points: 0 },
      { label: '虐待・DV', value: `${prefix}_reason_dv`, points: 0 },
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
      label: `${parentLabel}の介護・看護の状況は？`,
      inputType: 'radio',
      options: careOptions(prefix),
    },
    {
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}の妊娠・出産の状況は？`,
      inputType: 'radio',
      options: childbirthOptions(prefix),
    },
    {
      id: `${prefix}_disaster`,
      category,
      label: `${parentLabel}は災害復旧中ですか？`,
      inputType: 'radio',
      options: disasterOptions(prefix),
    },
    {
      id: `${prefix}_jobseeking`,
      category,
      label: `${parentLabel}は求職活動・起業準備をしていますか？`,
      inputType: 'radio',
      options: jobSeekingOptions(prefix),
    },
    {
      id: `${prefix}_education`,
      category,
      label: `${parentLabel}は就学・技能習得をしていますか？`,
      inputType: 'radio',
      options: educationOptions(prefix),
    },
    {
      id: `${prefix}_dv`,
      category,
      label: `${parentLabel}は虐待・DV被害者ですか？`,
      inputType: 'radio',
      options: dvOptions(prefix),
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
      { label: 'はい（+12）', value: 'adj_single_parent_yes', points: 12 },
    ],
  },
  {
    id: 'adj_sibling_same_facility',
    category: 'adjustment',
    label: 'きょうだいが入園希望施設に在園していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_same_no', points: 0 },
      { label: 'はい（+8）', value: 'adj_sibling_same_yes', points: 8 },
    ],
  },
  {
    id: 'adj_small_nursery_graduate',
    category: 'adjustment',
    label: '小規模保育等の卒園児ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_small_nursery_no', points: 0 },
      { label: 'はい（+8）', value: 'adj_small_nursery_yes', points: 8 },
    ],
  },
  {
    id: 'adj_parental_leave',
    category: 'adjustment',
    label: '育児休業からの復帰予定ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_parental_leave_no', points: 0 },
      { label: 'はい（+6）', value: 'adj_parental_leave_yes', points: 6 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい（+4）', value: 'adj_welfare_yes', points: 4 },
    ],
  },
  {
    id: 'adj_unemployment',
    category: 'adjustment',
    label: '生計中心者が失業していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unemployment_no', points: 0 },
      { label: 'はい（+4）', value: 'adj_unemployment_yes', points: 4 },
    ],
  },
  {
    id: 'adj_disability_childcare',
    category: 'adjustment',
    label: '障がい児保育を実施する施設を希望していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_disability_childcare_no', points: 0 },
      { label: 'はい（+4）', value: 'adj_disability_childcare_yes', points: 4 },
    ],
  },
  {
    id: 'adj_siblings_simultaneous',
    category: 'adjustment',
    label: 'きょうだい同時入所を希望していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_siblings_simultaneous_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_siblings_simultaneous_yes', points: 2 },
    ],
  },
  {
    id: 'adj_employment_offer',
    category: 'adjustment',
    label: '就労内定・就学予定ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_employment_offer_no', points: 0 },
      { label: 'はい（-2）', value: 'adj_employment_offer_yes', points: -2 },
    ],
  },
  {
    id: 'adj_withdrawal',
    category: 'adjustment',
    label: '過去に申し込みを辞退していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_withdrawal_no', points: 0 },
      { label: 'はい（-15）', value: 'adj_withdrawal_yes', points: -15 },
    ],
  },
  {
    id: 'adj_nursery_fee_delinquent',
    category: 'adjustment',
    label: '保育料を滞納していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_fee_delinquent_no', points: 0 },
      { label: 'はい（-20）', value: 'adj_fee_delinquent_yes', points: -20 },
    ],
  },
];

export const takamatsuData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
