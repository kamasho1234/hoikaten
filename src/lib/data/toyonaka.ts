import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 豊中市 保育園入園 基準指数・調整指数データ
// ---------------------------------------------------------------------------
// 豊中市は「基準指数（父母それぞれ）＋ 調整指数」の加算方式。
// 大阪府の自治体で、大阪市と同様に父母各最大100点の制度。
// 就労は月あたりの就労日数・時間で点数を判定。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'toyonaka',
  name: '豊中市',
  slug: 'toyonaka',
  prefecture: '大阪府',
  maxBasePoints: 200, // 父母各100点
} as const;

// ---------------------------------------------------------------------------
// 基準指数の選択肢テンプレート
// ---------------------------------------------------------------------------

/** 就労 */
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月20日以上かつ週40時間以上', value: `${prefix}_employment_100`, points: 100 },
  { label: '月20日以上かつ週30時間以上', value: `${prefix}_employment_90`, points: 90 },
  { label: '月16日以上かつ週24時間以上', value: `${prefix}_employment_80`, points: 80 },
  { label: '月12日以上かつ週16時間以上', value: `${prefix}_employment_70`, points: 70 },
  { label: '月64時間以上（上記以外）', value: `${prefix}_employment_60`, points: 60 },
];

/** 疾病 */
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院中・常時病臥', value: `${prefix}_illness_100`, points: 100 },
  { label: '通院加療（安静が必要）', value: `${prefix}_illness_70`, points: 70 },
  { label: '一般通院', value: `${prefix}_illness_50`, points: 50 },
];

/** 障害 */
const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '重度（身体1・2級/療育A/精神1級）', value: `${prefix}_disability_100`, points: 100 },
  { label: '中度（身体3級/療育B1/精神2級）', value: `${prefix}_disability_80`, points: 80 },
  { label: '軽度', value: `${prefix}_disability_60`, points: 60 },
];

/** 介護・看護 */
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '週5日以上の介護', value: `${prefix}_care_100`, points: 100 },
  { label: '週3日以上の介護', value: `${prefix}_care_80`, points: 80 },
  { label: 'それ以外', value: `${prefix}_care_60`, points: 60 },
];

/** 出産 */
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産前後（産前6週〜産後8週）', value: `${prefix}_childbirth_70`, points: 70 },
];

/** 就学 */
const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '職業訓練（月20日以上）', value: `${prefix}_education_90`, points: 90 },
  { label: '就学（月16日以上）', value: `${prefix}_education_80`, points: 80 },
  { label: '就学（月12日以上）', value: `${prefix}_education_70`, points: 70 },
];

/** 求職活動 */
const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動中', value: `${prefix}_jobseeking_40`, points: 40 },
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
      helpText: '月あたりの勤務日数と週あたりの勤務時間の組み合わせで判定されます',
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
      helpText: '週あたりの介護日数を選んでください',
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
    label: 'ひとり親ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい', value: 'adj_single_parent_yes', points: 10 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: 'きょうだいの保育施設の状況は？',
    helpText: 'きょうだいが在園中の施設を希望する場合に加点されます',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_sibling_no', points: 0 },
      { label: 'きょうだいが在園中の施設を希望する', value: 'adj_sibling_same', points: 5 },
      { label: 'きょうだいと同時に申し込む', value: 'adj_sibling_simultaneous', points: 3 },
    ],
  },
  {
    id: 'adj_unlicensed_nursery',
    category: 'adjustment',
    label: '認可外保育施設に月64時間以上預けていますか？',
    helpText: '月ぎめで認可外保育施設を利用している場合です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unlicensed_nursery_no', points: 0 },
      { label: 'はい', value: 'adj_unlicensed_nursery_yes', points: 5 },
    ],
  },
  {
    id: 'adj_parental_leave',
    category: 'adjustment',
    label: '育児休業から復帰予定ですか？',
    helpText: '育児休業を取得し、入園月に復帰する場合です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_parental_leave_no', points: 0 },
      { label: 'はい', value: 'adj_parental_leave_yes', points: 5 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護を受けていますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい', value: 'adj_welfare_yes', points: 5 },
    ],
  },
  {
    id: 'adj_grandparent_cohabit',
    category: 'adjustment',
    label: '65歳未満の同居親族に子どもの面倒を見られる方がいますか？',
    helpText: '同居の祖父母などが保育可能な場合は減点になります',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_grandparent_cohabit_no', points: 0 },
      { label: 'はい', value: 'adj_grandparent_cohabit_yes', points: -5 },
    ],
  },
];

// ---------------------------------------------------------------------------
// エクスポート
// ---------------------------------------------------------------------------

export const toyonakaData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
