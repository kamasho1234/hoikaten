import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 都城市 保育所入所選考指数データ
// 出典: 都城市保育課「令和8年度 保育施設利用案内」
// https://www.city.miyakonojo.miyazaki.jp/soshiki/89/23610.html
// 参考: 同県内（宮崎市）の指数表に準じた宮崎県標準方式
// ---------------------------------------------------------------------------
// 都城市は「基本指数（父母それぞれ）＋ 調整指数」の加算方式。
// 父母各最大15点（合計30点）。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'miyakonojo',
  name: '都城市',
  slug: 'miyakonojo',
  prefecture: '宮崎県',
  maxBasePoints: 30,
} as const;

/** 就労（被雇用者・雇用主・自営中心者） */
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月160時間以上', value: `${prefix}_employment_15`, points: 15 },
  { label: '月140時間以上160時間未満', value: `${prefix}_employment_14`, points: 14 },
  { label: '月120時間以上140時間未満', value: `${prefix}_employment_13`, points: 13 },
  { label: '月100時間以上120時間未満', value: `${prefix}_employment_12`, points: 12 },
  { label: '月80時間以上100時間未満', value: `${prefix}_employment_11`, points: 11 },
  { label: '月60時間以上80時間未満', value: `${prefix}_employment_10`, points: 10 },
];

/** 就労（自営・農業等の専従者または親族） */
const employmentFamilyOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_empfamily_none`, points: 0 },
  { label: '月160時間以上', value: `${prefix}_empfamily_13`, points: 13 },
  { label: '月140時間以上160時間未満', value: `${prefix}_empfamily_12`, points: 12 },
  { label: '月120時間以上140時間未満', value: `${prefix}_empfamily_11`, points: 11 },
  { label: '月100時間以上120時間未満', value: `${prefix}_empfamily_10`, points: 10 },
  { label: '月80時間以上100時間未満', value: `${prefix}_empfamily_9`, points: 9 },
  { label: '月60時間以上80時間未満', value: `${prefix}_empfamily_8`, points: 8 },
];

/** 疾病・負傷 */
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院中・常時病臥・1ヶ月以上の加療が必要', value: `${prefix}_illness_15`, points: 15 },
  { label: '自宅での保育に支障がある', value: `${prefix}_illness_12`, points: 12 },
];

/** 心身障害等 */
const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '身障手帳・精神保健福祉手帳・療育手帳の交付を受けている', value: `${prefix}_disability_10`, points: 10 },
];

/** 介護・看護 */
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '常時看護・介護を必要とする', value: `${prefix}_care_10`, points: 10 },
];

/** 出産 */
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産前6週間〜出産後8週間', value: `${prefix}_childbirth_10`, points: 10 },
];

/** 就学 */
const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '月160時間以上の通学・職業訓練', value: `${prefix}_education_15`, points: 15 },
  { label: '月140時間以上160時間未満', value: `${prefix}_education_14`, points: 14 },
  { label: '月120時間以上140時間未満', value: `${prefix}_education_13`, points: 13 },
  { label: '月100時間以上120時間未満', value: `${prefix}_education_12`, points: 12 },
  { label: '月80時間以上100時間未満', value: `${prefix}_education_11`, points: 11 },
  { label: '月60時間以上80時間未満', value: `${prefix}_education_10`, points: 10 },
];

/** 求職活動 */
const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動中・開業準備中', value: `${prefix}_jobseeking_5`, points: 5 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: 'いちばん近いものをひとつ選んでください',
    inputType: 'select',
    options: [
      { label: '仕事をしている（被雇用者・自営中心者）', value: `${prefix}_reason_employment`, points: 0 },
      { label: '仕事をしている（自営の専従者・親族）', value: `${prefix}_reason_empfamily`, points: 0 },
      { label: '病気の治療中', value: `${prefix}_reason_illness`, points: 0 },
      { label: '障害がある', value: `${prefix}_reason_disability`, points: 0 },
      { label: '家族の介護をしている', value: `${prefix}_reason_care`, points: 0 },
      { label: '出産の前後', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '学校に通っている', value: `${prefix}_reason_education`, points: 0 },
      { label: '仕事を探している', value: `${prefix}_reason_jobseeking`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}はどのくらい働いていますか？`,
      helpText: '月あたりの就労時間を選んでください',
      inputType: 'radio',
      options: employmentOptions(prefix),
    },
    {
      id: `${prefix}_empfamily`,
      category,
      label: `${parentLabel}は専従者としてどのくらい働いていますか？`,
      inputType: 'radio',
      options: employmentFamilyOptions(prefix),
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
      label: `${parentLabel}はどのくらい介護していますか？`,
      inputType: 'radio',
      options: careOptions(prefix),
    },
    {
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}の出産時期は？`,
      inputType: 'radio',
      options: childbirthOptions(prefix),
    },
    {
      id: `${prefix}_education`,
      category,
      label: `${parentLabel}はどのくらい学校に通っていますか？`,
      inputType: 'radio',
      options: educationOptions(prefix),
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
    label: 'ひとり親ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい', value: 'adj_single_parent_yes', points: 5 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: 'きょうだいの保育園の状況は？',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_sibling_no', points: 0 },
      { label: 'きょうだいが申込み施設に在園中', value: 'adj_sibling_yes', points: 5 },
      { label: 'きょうだいと同時申込み', value: 'adj_sibling_simultaneous', points: 2 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護を受けていますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい', value: 'adj_welfare_yes', points: 2 },
    ],
  },
  {
    id: 'adj_parental_leave',
    category: 'adjustment',
    label: '育児休業から復帰しますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_parental_leave_no', points: 0 },
      { label: 'はい', value: 'adj_parental_leave_yes', points: 3 },
    ],
  },
  {
    id: 'adj_unlicensed_nursery',
    category: 'adjustment',
    label: '認可外保育施設に月ぎめで預けていますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unlicensed_nursery_no', points: 0 },
      { label: 'はい（認可外卒園で新規申込み）', value: 'adj_unlicensed_nursery_yes', points: 8 },
    ],
  },
];

export const miyakonojoData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
