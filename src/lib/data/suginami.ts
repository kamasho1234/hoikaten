import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 杉並区 保育園入園 基本指数・調整指数データ
// ---------------------------------------------------------------------------

const municipality = {
  id: 'suginami',
  name: '杉並区',
  slug: 'suginami',
  prefecture: '東京都',
  maxBasePoints: 40, // 父母各20点
} as const;

// ---------------------------------------------------------------------------
// 保育が必要な理由ごとの選択肢テンプレート（父母各最大20点）
// ---------------------------------------------------------------------------

/** 就労（外勤・自営・内職とも同じ点数） */
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '週40時間以上（月20日以上）', value: `${prefix}_employment_20`, points: 20 },
  { label: '週32時間以上（月16日以上）', value: `${prefix}_employment_18`, points: 18 },
  { label: '週24時間以上（月16日以上）', value: `${prefix}_employment_16`, points: 16 },
  { label: '週24時間以上（月12日以上）', value: `${prefix}_employment_14`, points: 14 },
  { label: '週16時間以上（月12日以上）', value: `${prefix}_employment_12`, points: 12 },
  { label: '月48時間以上（上記以外）', value: `${prefix}_employment_8`, points: 8 },
];

/** 疾病 */
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院1ヶ月以上／常時病臥', value: `${prefix}_illness_20`, points: 20 },
  { label: '週3回以上の通院', value: `${prefix}_illness_16`, points: 16 },
  { label: '一般療養', value: `${prefix}_illness_12`, points: 12 },
];

/** 障害 */
const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '身体障害者手帳1・2級／愛の手帳1・2度／精神1級', value: `${prefix}_disability_20`, points: 20 },
  { label: '身体障害者手帳3級／愛の手帳3度／精神2級', value: `${prefix}_disability_16`, points: 16 },
  { label: '身体障害者手帳4級以下', value: `${prefix}_disability_12`, points: 12 },
];

/** 介護（月20日以上の常時付添が必要な方の介護） */
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '月20日以上かつ1日8時間以上の介護', value: `${prefix}_care_20`, points: 20 },
  { label: '月20日以上かつ1日4時間以上の介護', value: `${prefix}_care_16`, points: 16 },
  { label: '月16日以上かつ1日4時間以上の介護', value: `${prefix}_care_14`, points: 14 },
  { label: '月48時間以上（上記以外）', value: `${prefix}_care_10`, points: 10 },
];

/** 出産 */
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産前後', value: `${prefix}_childbirth_8`, points: 8 },
];

/** 就学 */
const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '月20日以上かつ週40時間以上', value: `${prefix}_education_20`, points: 20 },
  { label: '月16日以上かつ週32時間以上', value: `${prefix}_education_18`, points: 18 },
  { label: '月16日以上かつ週24時間以上', value: `${prefix}_education_16`, points: 16 },
  { label: '月48時間以上（上記以外）', value: `${prefix}_education_8`, points: 8 },
];

/** 求職活動 */
const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動中', value: `${prefix}_jobseeking_8`, points: 8 },
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
      helpText: 'いちばん近い働き方を選んでください',
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
      helpText: '月あたりの介護日数・時間を選んでください',
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
      helpText: '月あたりの通学日数・時間を選んでください',
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
    label: '65歳未満の同居人がいないひとり親世帯ですか？',
    helpText: '母子家庭・父子家庭で、65歳未満の同居親族がいない場合',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい', value: 'adj_single_parent_yes', points: 3 },
    ],
  },
  {
    id: 'adj_parental_leave',
    category: 'adjustment',
    label: '育休・産休から復帰する予定ですか？',
    helpText: '入園月に職場復帰する場合（1歳クラス以上は入園月翌月も可）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_parental_leave_no', points: 0 },
      { label: 'はい', value: 'adj_parental_leave_yes', points: 10 },
    ],
  },
  {
    id: 'adj_sibling_enrolled',
    category: 'adjustment',
    label: 'きょうだいが認可保育園に在園中で、同じ園を第1希望にしていますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_enrolled_no', points: 0 },
      { label: 'はい', value: 'adj_sibling_enrolled_yes', points: 3 },
    ],
  },
  {
    id: 'adj_sibling_apply',
    category: 'adjustment',
    label: 'きょうだいと同時に同じ施設に申し込みますか？（第1希望）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_apply_no', points: 0 },
      { label: 'はい', value: 'adj_sibling_apply_yes', points: 1 },
    ],
  },
  {
    id: 'adj_third_child',
    category: 'adjustment',
    label: '3番目以降のお子さんの申し込みですか？',
    helpText: '保護者と同一世帯の子どもを年齢順に数えて3番目以降',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_third_child_no', points: 0 },
      { label: 'はい', value: 'adj_third_child_yes', points: 4 },
    ],
  },
  {
    id: 'adj_unlicensed_nursery',
    category: 'adjustment',
    label: '認可外保育施設やベビーシッターに月ぎめで預けていますか？',
    helpText: '1日4時間以上・月12日以上・6ヶ月以上の利用',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unlicensed_nursery_no', points: 0 },
      { label: 'はい（上記条件すべて該当）', value: 'adj_unlicensed_nursery_yes', points: 4 },
      { label: 'はい（月12日以上・6ヶ月以上のみ該当）', value: 'adj_unlicensed_nursery_partial', points: 2 },
    ],
  },
  {
    id: 'adj_preschool_count',
    category: 'adjustment',
    label: '未就学児が3人以上いますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_preschool_count_no', points: 0 },
      { label: 'はい', value: 'adj_preschool_count_yes', points: 1 },
    ],
  },
];

// ---------------------------------------------------------------------------
// エクスポート
// ---------------------------------------------------------------------------

export const suginamiData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
