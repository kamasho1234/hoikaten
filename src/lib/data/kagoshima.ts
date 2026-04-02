import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 鹿児島市 保育園入園 基本点数・調整点数データ
// 出典：令和7年度鹿児島市認可保育所等利用案内（令和8年4月以降利用開始分含む）
// https://www.city.kagoshima.lg.jp/hoiku/documents/r7ikeaziriyouannai.pdf
// ---------------------------------------------------------------------------

const municipality = {
  id: 'kagoshima',
  name: '鹿児島市',
  slug: 'kagoshima',
  prefecture: '鹿児島県',
  maxBasePoints: 20, // 父母各10点
} as const;

// ---------------------------------------------------------------------------
// 保育が必要な理由ごとの選択肢テンプレート
// ---------------------------------------------------------------------------

/** 就労 */
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月180時間以上', value: `${prefix}_employment_10`, points: 10 },
  { label: '月150時間以上180時間未満', value: `${prefix}_employment_9`, points: 9 },
  { label: '月120時間以上150時間未満', value: `${prefix}_employment_8`, points: 8 },
  { label: '月90時間以上120時間未満', value: `${prefix}_employment_7`, points: 7 },
  { label: '月60時間以上90時間未満', value: `${prefix}_employment_6`, points: 6 },
];

/** 就労内定 */
const employmentOfferOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_offer_none`, points: 0 },
  { label: '月120時間以上の就労内定', value: `${prefix}_offer_8`, points: 8 },
  { label: '月60時間以上の就労内定', value: `${prefix}_offer_6`, points: 6 },
];

/** 疾病 */
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院中・常時安静が必要', value: `${prefix}_illness_10`, points: 10 },
  { label: '通院加療中（週2日以上の通院）', value: `${prefix}_illness_8`, points: 8 },
  { label: 'その他の通院加療', value: `${prefix}_illness_6`, points: 6 },
];

/** 障害 */
const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '身体1-2級 / 精神1-2級 / 療育A', value: `${prefix}_disability_10`, points: 10 },
  { label: '身体3-4級 / 療育B', value: `${prefix}_disability_8`, points: 8 },
  { label: 'その他の手帳所持', value: `${prefix}_disability_6`, points: 6 },
];

/** 介護・看護 */
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '常時介護（月180時間以上）', value: `${prefix}_care_10`, points: 10 },
  { label: '月120時間以上の介護', value: `${prefix}_care_8`, points: 8 },
  { label: '月60時間以上の介護', value: `${prefix}_care_6`, points: 6 },
];

/** 出産 */
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産前後', value: `${prefix}_childbirth_8`, points: 8 },
];

/** 就学 */
const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '月120時間以上の通学・職業訓練', value: `${prefix}_education_8`, points: 8 },
  { label: '月60時間以上の通学・職業訓練', value: `${prefix}_education_6`, points: 6 },
];

/** 求職活動 */
const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動中', value: `${prefix}_jobseeking_2`, points: 2 },
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
      { label: '仕事が決まっている', value: `${prefix}_reason_offer`, points: 0 },
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
      id: `${prefix}_offer`,
      category,
      label: `${parentLabel}の就労内定の状況は？`,
      helpText: '内定先での勤務条件を選んでください',
      inputType: 'radio',
      options: employmentOfferOptions(prefix),
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
      helpText: '月あたりの通学時間を選んでください',
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
// 調整点数の質問
// ---------------------------------------------------------------------------

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親ですか？',
    helpText: 'ひとり親の場合、基本点数に10点が加算されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい', value: 'adj_single_parent_yes', points: 10 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: 'きょうだいの保育園の状況は？',
    helpText: 'きょうだいが在園中の場合は加点があります',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_sibling_no', points: 0 },
      { label: 'きょうだいが在園中で、同じ園を希望する', value: 'adj_sibling_same', points: 3 },
      { label: 'きょうだいが在園中（別の園を希望）', value: 'adj_sibling_diff', points: 1 },
    ],
  },
  {
    id: 'adj_unlicensed_nursery',
    category: 'adjustment',
    label: '認可外保育施設に月極で預けていますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unlicensed_nursery_no', points: 0 },
      { label: 'はい', value: 'adj_unlicensed_nursery_yes', points: 2 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護を受けていますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい', value: 'adj_welfare_yes', points: 3 },
    ],
  },
  {
    id: 'adj_parental_leave',
    category: 'adjustment',
    label: '育児休業から復帰する予定ですか？',
    helpText: '育児休業を取得し、入園する月に職場復帰する場合',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_parental_leave_no', points: 0 },
      { label: 'はい', value: 'adj_parental_leave_yes', points: 1 },
    ],
  },
  {
    id: 'adj_grandparent_nearby',
    category: 'adjustment',
    label: '65歳未満の同居の祖父母がいますか？',
    helpText: '子どもの面倒を見られる同居の祖父母がいる場合は減点になります',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_grandparent_nearby_no', points: 0 },
      { label: 'はい', value: 'adj_grandparent_nearby_yes', points: -1 },
    ],
  },
];

// ---------------------------------------------------------------------------
// エクスポート
// ---------------------------------------------------------------------------

export const kagoshimaData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
