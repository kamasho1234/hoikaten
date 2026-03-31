import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 神戸市 保育園入園 基本点数・調整指数データ
// ---------------------------------------------------------------------------

const municipality = {
  id: 'kobe',
  name: '神戸市',
  slug: 'kobe',
  prefecture: '兵庫県',
  maxBasePoints: 200, // 父母各100点
} as const;

// ---------------------------------------------------------------------------
// 保育が必要な理由ごとの選択肢テンプレート
// ---------------------------------------------------------------------------

/** 就労 */
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月20日以上かつ週40時間以上', value: `${prefix}_employment_100`, points: 100 },
  { label: '月20日以上かつ週30時間以上', value: `${prefix}_employment_90`, points: 90 },
  { label: '月16日以上かつ週24時間以上', value: `${prefix}_employment_80`, points: 80 },
  { label: '月16日以上かつ週16時間以上', value: `${prefix}_employment_70`, points: 70 },
  { label: '月64時間以上（上記以外）', value: `${prefix}_employment_60`, points: 60 },
];

/** 疾病 */
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院または常時臥床', value: `${prefix}_illness_100`, points: 100 },
  { label: '通院加療（常に安静が必要）', value: `${prefix}_illness_70`, points: 70 },
  { label: 'その他の通院加療', value: `${prefix}_illness_50`, points: 50 },
];

/** 障害 */
const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '身体1-2級 / 精神1-2級 / 療育A', value: `${prefix}_disability_100`, points: 100 },
  { label: '身体3-4級 / 療育B1', value: `${prefix}_disability_80`, points: 80 },
  { label: 'その他の手帳所持', value: `${prefix}_disability_60`, points: 60 },
];

/** 介護・看護 */
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '月20日以上かつ週40時間以上', value: `${prefix}_care_100`, points: 100 },
  { label: '月16日以上かつ週24時間以上', value: `${prefix}_care_80`, points: 80 },
  { label: '月64時間以上（上記以外）', value: `${prefix}_care_60`, points: 60 },
];

/** 出産 */
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産前後', value: `${prefix}_childbirth_60`, points: 60 },
];

/** 就学 */
const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '月120時間以上', value: `${prefix}_education_80`, points: 80 },
  { label: '月64時間以上', value: `${prefix}_education_60`, points: 60 },
];

/** 就労内定 */
const employmentOfferOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_offer_none`, points: 0 },
  { label: 'フルタイム相当の内定', value: `${prefix}_offer_70`, points: 70 },
];

/** 求職活動 */
const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動中', value: `${prefix}_jobseeking_20`, points: 20 },
];

// ---------------------------------------------------------------------------
// 保護者ごとの質問を生成するヘルパー
// ---------------------------------------------------------------------------

function buildParentQuestions(
  parentNum: 1 | 2,
): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  // 「保育が必要な理由」の大分類選択
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
      { label: '介護・看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '出産の前後', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '学校に通っている', value: `${prefix}_reason_education`, points: 0 },
      { label: '仕事が決まっている（内定）', value: `${prefix}_reason_offer`, points: 0 },
      { label: '仕事を探している', value: `${prefix}_reason_jobseeking`, points: 0 },
    ],
  };

  // 各理由の詳細質問
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
      label: `${parentLabel}はどのくらい介護・看護をしていますか？`,
      helpText: '月あたりの日数・時間を選んでください',
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
      id: `${prefix}_offer`,
      category,
      label: `${parentLabel}の就労内定の状況は？`,
      helpText: '内定先での勤務条件を選んでください',
      inputType: 'radio',
      options: employmentOfferOptions(prefix),
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
    helpText: 'ひとり親の場合、片方の保護者の基本点数100点と調整加点30点が加算されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい', value: 'adj_single_parent_yes', points: 130 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: 'きょうだいの保育園の状況は？',
    helpText: '在園中のきょうだいがいて同じ園を第一希望にする場合は加点が大きくなります',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_sibling_no', points: 0 },
      { label: 'きょうだいが在園中で、同じ園を第一希望にする', value: 'adj_sibling_first', points: 15 },
      { label: 'きょうだいが在園中（上記以外）', value: 'adj_sibling_other', points: 8 },
      { label: 'きょうだいと同時に申し込む（双子など）', value: 'adj_sibling_simultaneous', points: 5 },
    ],
  },
  {
    id: 'adj_unlicensed_nursery',
    category: 'adjustment',
    label: '認可外保育施設に週4日以上、有償で預けていますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unlicensed_nursery_no', points: 0 },
      { label: 'はい', value: 'adj_unlicensed_nursery_yes', points: 5 },
    ],
  },
  {
    id: 'adj_single_assignment',
    category: 'adjustment',
    label: '単身赴任中ですか？（国内）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_assignment_no', points: 0 },
      { label: 'はい', value: 'adj_single_assignment_yes', points: 6 },
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
    id: 'adj_grandparent_nearby',
    category: 'adjustment',
    label: '65歳未満の同居親族に子どもを預けられますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_grandparent_nearby_no', points: 0 },
      { label: 'はい', value: 'adj_grandparent_nearby_yes', points: -3 },
    ],
  },
  {
    id: 'adj_parental_leave_extend',
    category: 'adjustment',
    label: '育休延長も許容できますか？',
    helpText: '入れない場合は育休を延長してもいい、を選ぶと大きく減点されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ（入園できなければ困る）', value: 'adj_parental_leave_extend_no', points: 0 },
      { label: 'はい（育休延長でもよい）', value: 'adj_parental_leave_extend_yes', points: -90 },
    ],
  },
  {
    id: 'adj_preschool_sibling',
    category: 'adjustment',
    label: '未就学のきょうだいがいますか？（保育所利用なし）',
    helpText: '保育所を利用していない未就学のきょうだいがいる場合です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_preschool_sibling_no', points: 0 },
      { label: 'はい', value: 'adj_preschool_sibling_yes', points: -4 },
    ],
  },
];

// ---------------------------------------------------------------------------
// エクスポート
// ---------------------------------------------------------------------------

export const kobeData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
