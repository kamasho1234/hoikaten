import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 東久留米市 保育園入園 実施基準指数・調整指数データ
// 出典: 東久留米市「令和8年度 認可保育施設入園のしおり」実施基準指数表
// https://www.city.higashikurume.lg.jp/shinseisho/hoiku/1001551.html
// ---------------------------------------------------------------------------
// 東久留米市は「実施基準指数（父＋母）＋ 調整指数」の加算方式。
// 父母それぞれ最大50点。フルタイム共働きで合計100点が基本ライン。
// 就労はフルタイム勤務で各50点。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'higashikurume',
  name: '東久留米市',
  slug: 'higashikurume',
  prefecture: '東京都',
  maxBasePoints: 100, // 父母各50点
} as const;

// ---------------------------------------------------------------------------
// 基準指数の選択肢テンプレート（父母各最大50点）
// ---------------------------------------------------------------------------

/** 就労（正社員、パート、自営など） */
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: 'フルタイム勤務（常勤）', value: `${prefix}_employment_50`, points: 50 },
  { label: 'パートタイム勤務（月160時間以上）', value: `${prefix}_employment_45`, points: 45 },
  { label: 'パートタイム勤務（月120時間以上160時間未満）', value: `${prefix}_employment_40`, points: 40 },
  { label: 'パートタイム勤務（月80時間以上120時間未満）', value: `${prefix}_employment_30`, points: 30 },
  { label: 'パートタイム勤務（月60時間以上80時間未満）', value: `${prefix}_employment_20`, points: 20 },
  { label: '自営業・農業', value: `${prefix}_employment_40`, points: 40 },
];

/** 疾病 */
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院1ヶ月以上／常時病臥', value: `${prefix}_illness_50`, points: 50 },
  { label: '自宅療養（安静が必要）', value: `${prefix}_illness_40`, points: 40 },
  { label: '通院加療（一般通院）', value: `${prefix}_illness_30`, points: 30 },
];

/** 障害 */
const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '身体障害者手帳1・2級／療育手帳A', value: `${prefix}_disability_50`, points: 50 },
  { label: '身体障害者手帳3級／療育手帳B', value: `${prefix}_disability_40`, points: 40 },
  { label: '身体障害者手帳4級以下／精神手帳', value: `${prefix}_disability_30`, points: 30 },
];

/** 介護・看護 */
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '月160時間以上の介護・看護', value: `${prefix}_care_50`, points: 50 },
  { label: '月120時間以上160時間未満の介護・看護', value: `${prefix}_care_40`, points: 40 },
  { label: '月80時間以上120時間未満の介護・看護', value: `${prefix}_care_30`, points: 30 },
  { label: '月60時間以上80時間未満の介護・看護', value: `${prefix}_care_20`, points: 20 },
];

/** 出産 */
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産予定／産後8週以内', value: `${prefix}_childbirth_50`, points: 50 },
];

/** 就学 */
const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '月160時間以上の就学・職業訓練', value: `${prefix}_education_40`, points: 40 },
  { label: '月120時間以上160時間未満', value: `${prefix}_education_35`, points: 35 },
  { label: '月80時間以上120時間未満', value: `${prefix}_education_30`, points: 30 },
];

/** 求職活動 */
const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動中', value: `${prefix}_jobseeking_10`, points: 10 },
];

// ---------------------------------------------------------------------------
// 保護者ごとの質問を生成するヘルパー
// ---------------------------------------------------------------------------

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
      { label: '仕事をしている', value: `${prefix}_reason_employment`, points: 0 },
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
      helpText: '就労形態と時間で判定されます',
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
      label: `${parentLabel}はどのくらい介護・看護していますか？`,
      helpText: '月あたりの介護時間を選んでください',
      inputType: 'radio',
      options: careOptions(prefix),
    },
    {
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}の出産の予定・状況は？`,
      inputType: 'radio',
      options: childbirthOptions(prefix),
    },
    {
      id: `${prefix}_education`,
      category,
      label: `${parentLabel}は学校に通っていますか？`,
      helpText: '月あたりの就学時間を選んでください',
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

// ---------------------------------------------------------------------------
// 調整指数の質問
// ---------------------------------------------------------------------------

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親世帯で就労していますか？',
    helpText: '母子家庭・父子家庭で就労している場合',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい', value: 'adj_single_parent_yes', points: 10 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: 'きょうだいが希望する保育施設に在園中ですか？',
    helpText: '希望する認可保育所等にきょうだいが在園している場合',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_no', points: 0 },
      { label: 'はい', value: 'adj_sibling_yes', points: 5 },
    ],
  },
  {
    id: 'adj_sibling_simultaneous',
    category: 'adjustment',
    label: 'きょうだいを同時に申し込みますか？',
    helpText: '2人以上のきょうだいを同時に保育施設へ申し込む場合',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_simultaneous_no', points: 0 },
      { label: 'はい', value: 'adj_sibling_simultaneous_yes', points: 5 },
    ],
  },
  {
    id: 'adj_unlicensed_nursery',
    category: 'adjustment',
    label: '認可外保育施設に月ぎめで預けていますか？',
    helpText: '認可外保育施設・企業主導型保育に月極で利用している場合',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unlicensed_nursery_no', points: 0 },
      { label: 'はい（在園期間1ヶ月以上）', value: 'adj_unlicensed_nursery_yes', points: 10 },
      { label: 'はい（在園期間3ヶ月以上）', value: 'adj_unlicensed_nursery_yes2', points: 20 },
    ],
  },
  {
    id: 'adj_parental_leave',
    category: 'adjustment',
    label: '育休・産休から復帰予定ですか？',
    helpText: '入園月に職場復帰予定の場合',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_parental_leave_no', points: 0 },
      { label: 'はい', value: 'adj_parental_leave_yes', points: 10 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護を受けていますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい', value: 'adj_welfare_yes', points: 10 },
    ],
  },
  {
    id: 'adj_transfer_within_city',
    category: 'adjustment',
    label: '他の認可保育施設から転園を希望していますか？',
    helpText: '現在他の認可保育施設に在園中で転園を希望する場合',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_transfer_within_city_no', points: 0 },
      { label: 'はい', value: 'adj_transfer_within_city_yes', points: 3 },
    ],
  },
  {
    id: 'adj_low_income',
    category: 'adjustment',
    label: '世帯の所得が低いですか？',
    helpText: '市民税非課税世帯の場合',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_low_income_no', points: 0 },
      { label: 'はい', value: 'adj_low_income_yes', points: 5 },
    ],
  },
];

// ---------------------------------------------------------------------------
// エクスポート
// ---------------------------------------------------------------------------

export const higashikurumeData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
