import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 昭島市 保育施設入所選考基準データ
// 出典: 昭島市「令和8年度 保育施設入所選考基準表」
// https://www.city.akishima.lg.jp/kosodate/m-kosodate/1008313/1003785/1003802/1009200/1009086.html
// ---------------------------------------------------------------------------
// 昭島市は「基準指数（父母それぞれ最大20点）＋ 調整指数」の加算方式。
// 就労は日数×時間で判定。合計基準指数最大40点。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'akishima',
  name: '昭島市',
  slug: 'akishima',
  prefecture: '東京都',
  maxBasePoints: 40,
} as const;

const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月20日以上かつ1日8時間以上', value: `${prefix}_employment_20`, points: 20 },
  { label: '月20日以上かつ1日6〜8時間未満', value: `${prefix}_employment_18a`, points: 18 },
  { label: '月16日以上かつ1日8時間以上', value: `${prefix}_employment_18b`, points: 18 },
  { label: '月20日以上かつ1日4〜6時間未満', value: `${prefix}_employment_16a`, points: 16 },
  { label: '月16日以上かつ1日6〜8時間未満', value: `${prefix}_employment_16b`, points: 16 },
  { label: '月12日以上かつ1日6時間以上', value: `${prefix}_employment_14`, points: 14 },
  { label: '内職（週16時間以上）', value: `${prefix}_employment_12`, points: 12 },
];

const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院1か月以上・常時病臥', value: `${prefix}_illness_20`, points: 20 },
  { label: '安静を要する・通院加療中', value: `${prefix}_illness_16`, points: 16 },
];

const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '身体障害者手帳1・2級等', value: `${prefix}_disability_20`, points: 20 },
  { label: '身体障害者手帳3・4級等', value: `${prefix}_disability_16`, points: 16 },
];

const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '要介護度4・5の介護', value: `${prefix}_care_20`, points: 20 },
  { label: '要介護度1〜3の介護', value: `${prefix}_care_16`, points: 16 },
];

const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産予定月前後2か月', value: `${prefix}_childbirth_18`, points: 18 },
];

const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動中', value: `${prefix}_jobseeking_8`, points: 8 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: '昭島市では父母それぞれの基準指数の合計で選考されます',
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
      label: `${parentLabel}の就労状況は？`,
      helpText: '日数と時間の組み合わせで点数が決まります',
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
    id: 'adj_twins_simultaneous',
    category: 'adjustment',
    label: '双子以上で同時入所を希望しますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_twins_no', points: 0 },
      { label: 'はい（+3）', value: 'adj_twins_yes', points: 3 },
    ],
  },
  {
    id: 'adj_sibling_same',
    category: 'adjustment',
    label: 'きょうだいと同じ施設を希望しますか？',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_sibling_same_no', points: 0 },
      { label: 'はい（+3）', value: 'adj_sibling_same_yes', points: 3 },
    ],
  },
  {
    id: 'adj_disability_household',
    category: 'adjustment',
    label: '世帯に障害者手帳所持者がいますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_disability_household_no', points: 0 },
      { label: 'はい（+3）', value: 'adj_disability_household_yes', points: 3 },
    ],
  },
  {
    id: 'adj_unlicensed_3months',
    category: 'adjustment',
    label: '認可外保育施設を3か月以上利用していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unlicensed_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_unlicensed_yes', points: 1 },
    ],
  },
  {
    id: 'adj_age_limit_graduation',
    category: 'adjustment',
    label: '年齢制限のある施設を卒園予定ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_age_limit_no', points: 0 },
      { label: 'はい（+5）', value: 'adj_age_limit_yes', points: 5 },
    ],
  },
  {
    id: 'adj_grandparent_cohabit',
    category: 'adjustment',
    label: '65歳未満の祖父母と同居していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_grandparent_no', points: 0 },
      { label: 'はい（-1）', value: 'adj_grandparent_yes', points: -1 },
    ],
  },
  {
    id: 'adj_outside_city',
    category: 'adjustment',
    label: '昭島市外に在住ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ（昭島市在住）', value: 'adj_outside_no', points: 0 },
      { label: 'はい（-3）', value: 'adj_outside_yes', points: -3 },
    ],
  },
];

export const akishimaData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
