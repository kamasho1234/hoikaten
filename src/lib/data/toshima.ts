import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 豊島区 保育園入園 基本指数・調整指数データ
// 出典: 豊島区保育所入所基準指数表（令和7年度版）
// https://www.city.toshima.lg.jp/260/kosodate/kosodate/hoikuen/nyuen/016786.html
// ---------------------------------------------------------------------------

const municipality = {
  id: 'toshima',
  name: '豊島区',
  slug: 'toshima',
  prefecture: '東京都',
  maxBasePoints: 40, // 父母各20点
} as const;

// ---------------------------------------------------------------------------
// 保育が必要な理由ごとの選択肢テンプレート（父母各最大20点）
// ---------------------------------------------------------------------------

/** 就労 */
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月20日以上かつ月160時間以上', value: `${prefix}_employment_20`, points: 20 },
  { label: '月20日以上かつ月120〜160時間未満', value: `${prefix}_employment_16`, points: 16 },
  { label: '月20日以上かつ月80〜120時間未満', value: `${prefix}_employment_15`, points: 15 },
  { label: '月16日以上かつ月128時間以上', value: `${prefix}_employment_14`, points: 14 },
  { label: '月16日以上かつ月96〜128時間未満', value: `${prefix}_employment_13`, points: 13 },
  { label: '月16日以上かつ月64〜96時間未満', value: `${prefix}_employment_12`, points: 12 },
  { label: '月12日以上かつ月96時間以上', value: `${prefix}_employment_11`, points: 11 },
  { label: '月12日以上かつ月72〜96時間未満', value: `${prefix}_employment_10`, points: 10 },
  { label: '月12日以上かつ月48〜72時間未満', value: `${prefix}_employment_9`, points: 9 },
];

/** 疾病 */
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院1ヶ月以上／自宅内常時病臥／精神性疾患', value: `${prefix}_illness_20`, points: 20 },
  { label: '一般療養（安静が必要）', value: `${prefix}_illness_16`, points: 16 },
];

/** 障害 */
const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '身体障害者手帳1・2級／愛の手帳1〜3度／精神障害1級', value: `${prefix}_disability_20`, points: 20 },
  { label: '身体障害者手帳3級／精神障害2級', value: `${prefix}_disability_17`, points: 17 },
  { label: '身体障害者手帳4級以下／精神障害3級', value: `${prefix}_disability_14`, points: 14 },
];

/** 介護 */
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '常時介護が必要（障害1・2級の親族等）', value: `${prefix}_care_20`, points: 20 },
  { label: '週5日以上の介護・看護', value: `${prefix}_care_14`, points: 14 },
  { label: '週3〜4日の介護・看護', value: `${prefix}_care_10`, points: 10 },
  { label: 'その他の介護・看護', value: `${prefix}_care_8`, points: 8 },
];

/** 出産 */
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産前後（予定月の前後各2ヶ月）', value: `${prefix}_childbirth_14`, points: 14 },
];

/** 就学 */
const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '就学・職業訓練（就労に準じて算定）', value: `${prefix}_education_14`, points: 14 },
];

/** 求職活動 */
const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動中・起業準備中', value: `${prefix}_jobseeking_6`, points: 6 },
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
      helpText: '月あたりの勤務日数・時間を選んでください',
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
      helpText: '介護の状況を選んでください',
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

// ---------------------------------------------------------------------------
// 調整指数の質問
// ---------------------------------------------------------------------------

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親世帯ですか？',
    helpText: '母子家庭・父子家庭、または父母不存在の場合',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい', value: 'adj_single_parent_yes', points: 8 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい', value: 'adj_welfare_yes', points: 8 },
    ],
  },
  {
    id: 'adj_sibling_reentry',
    category: 'adjustment',
    label: '産休・育休からの再入園ですか？',
    helpText: '以前在籍していた認可保育園への復帰',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_reentry_no', points: 0 },
      { label: 'はい', value: 'adj_sibling_reentry_yes', points: 6 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: 'きょうだいが認可保育施設に在籍していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_no', points: 0 },
      { label: 'はい', value: 'adj_sibling_yes', points: 2 },
    ],
  },
  {
    id: 'adj_disability_child',
    category: 'adjustment',
    label: 'お子さんに障害がありますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_disability_child_no', points: 0 },
      { label: 'はい（手帳1〜3級等）', value: 'adj_disability_child_high', points: 3 },
      { label: 'はい（手帳4級等）', value: 'adj_disability_child_mid', points: 2 },
    ],
  },
  {
    id: 'adj_parental_leave',
    category: 'adjustment',
    label: '育休から復帰する予定ですか？',
    helpText: '入園月に職場復帰する場合',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_parental_leave_no', points: 0 },
      { label: 'はい', value: 'adj_parental_leave_yes', points: 1 },
    ],
  },
  {
    id: 'adj_twins',
    category: 'adjustment',
    label: '双子以上の同時申込みですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_twins_no', points: 0 },
      { label: 'はい', value: 'adj_twins_yes', points: 1 },
    ],
  },
];

// ---------------------------------------------------------------------------
// エクスポート
// ---------------------------------------------------------------------------

export const toshimaData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
