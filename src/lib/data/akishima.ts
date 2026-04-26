import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 昭島市 保育園入園 実施基準指数・調整指数データ
// 出典: 昭島市「令和8年度 保育施設入所のごあんない」入所選考基準表
// https://www.city.akishima.lg.jp/kosodate/m-kosodate/1008313/1003785/1003802/1009200/1009086.html
// ---------------------------------------------------------------------------
// 昭島市は「実施基準指数（父母のうち低い方）＋ 調整指数」の加算方式。
// 父母それぞれ最大20点。フルタイム共働きで基準指数が最大20点が基本ライン。
// 就労は月あたりの就労時間で判定。月64時間以上で基準を満たす。
// 下限就労条件: 月64時間以上。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'akishima',
  name: '昭島市',
  slug: 'akishima',
  prefecture: '東京都',
  maxBasePoints: 20, // 父母のうち低い方の指数を採用
  scoringMethod: 'min', // 両親の点数のうち低い方を採用
} as const;

// ---------------------------------------------------------------------------
// 基準指数の選択肢テンプレート（父母各最大20点）
// ---------------------------------------------------------------------------

/** 就労（居宅外・居宅内共通） */
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月160時間以上', value: `${prefix}_employment_20`, points: 20 },
  { label: '月140時間以上160時間未満', value: `${prefix}_employment_18`, points: 18 },
  { label: '月120時間以上140時間未満', value: `${prefix}_employment_16`, points: 16 },
  { label: '月100時間以上120時間未満', value: `${prefix}_employment_14`, points: 14 },
  { label: '月80時間以上100時間未満', value: `${prefix}_employment_12`, points: 12 },
  { label: '月64時間以上80時間未満', value: `${prefix}_employment_10`, points: 10 },
];

/** 疾病 */
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院1ヶ月以上／常時病臥', value: `${prefix}_illness_20`, points: 20 },
  { label: '自宅療養（安静が必要）', value: `${prefix}_illness_16`, points: 16 },
  { label: '通院加療（一般通院）', value: `${prefix}_illness_12`, points: 12 },
];

/** 障害 */
const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '身体障害者手帳1・2級／愛の手帳1・2度／精神1級', value: `${prefix}_disability_20`, points: 20 },
  { label: '身体障害者手帳3級／愛の手帳3度／精神2級', value: `${prefix}_disability_16`, points: 16 },
  { label: '身体障害者手帳4級以下／愛の手帳4度／精神3級', value: `${prefix}_disability_12`, points: 12 },
];

/** 介護・看護 */
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '月160時間以上の介護・看護', value: `${prefix}_care_20`, points: 20 },
  { label: '月120時間以上160時間未満の介護・看護', value: `${prefix}_care_16`, points: 16 },
  { label: '月80時間以上120時間未満の介護・看護', value: `${prefix}_care_12`, points: 12 },
  { label: '月64時間以上80時間未満の介護・看護', value: `${prefix}_care_10`, points: 10 },
];

/** 出産 */
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産前後（産前8週〜産後8週）', value: `${prefix}_childbirth_14`, points: 14 },
];

/** 就学 */
const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '月160時間以上の就学・職業訓練', value: `${prefix}_education_20`, points: 20 },
  { label: '月120時間以上160時間未満', value: `${prefix}_education_16`, points: 16 },
  { label: '月80時間以上120時間未満', value: `${prefix}_education_12`, points: 12 },
  { label: '月64時間以上80時間未満', value: `${prefix}_education_10`, points: 10 },
];

/** 求職活動 */
const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動中', value: `${prefix}_jobseeking_6`, points: 6 },
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
      helpText: '月あたりの就労時間で判定されます（休憩含む、通勤時間は含まず）',
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
      label: `${parentLabel}はどのくらい介護していますか？`,
      helpText: '月あたりの介護時間を選んでください',
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
      helpText: '月あたりの就学・職業訓練時間を選んでください',
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
    label: 'ひとり親世帯ですか？',
    helpText: '母子家庭・父子家庭の場合',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい', value: 'adj_single_parent_yes', points: 4 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: 'きょうだいの保育園の状況は？',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_sibling_no', points: 0 },
      { label: 'きょうだいが認可保育園に在園中', value: 'adj_sibling_yes', points: 2 },
      { label: 'きょうだいと同時に申し込む', value: 'adj_sibling_simultaneous', points: 3 },
    ],
  },
  {
    id: 'adj_unlicensed_nursery',
    category: 'adjustment',
    label: '認可外保育施設に月ぎめで預けていますか？',
    helpText: '認可外保育施設に月極で利用している場合',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unlicensed_nursery_no', points: 0 },
      { label: 'はい', value: 'adj_unlicensed_nursery_yes', points: 2 },
    ],
  },
  {
    id: 'adj_parental_leave',
    category: 'adjustment',
    label: '育児休業から復帰予定ですか？',
    helpText: '入園月に職場復帰予定の場合',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_parental_leave_no', points: 0 },
      { label: 'はい', value: 'adj_parental_leave_yes', points: 1 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護を受けていますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい', value: 'adj_welfare_yes', points: 4 },
    ],
  },
  {
    id: 'adj_disabled_parent',
    category: 'adjustment',
    label: '保護者が身体障害者手帳を所有していますか？',
    helpText: '身体障害者手帳1〜3級の場合',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_disabled_parent_no', points: 0 },
      { label: 'はい', value: 'adj_disabled_parent_yes', points: 2 },
    ],
  },
  {
    id: 'adj_multi_child',
    category: 'adjustment',
    label: 'きょうだいが申込児童を含め3人以上いますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_multi_child_no', points: 0 },
      { label: 'はい', value: 'adj_multi_child_yes', points: 1 },
    ],
  },
];

// ---------------------------------------------------------------------------
// エクスポート
// ---------------------------------------------------------------------------

export const akishimaData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
