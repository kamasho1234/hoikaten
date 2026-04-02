import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 新潟市 保育園入園 利用調整指数データ
// ---------------------------------------------------------------------------
// 新潟市は「基準指数（父母それぞれ）＋調整指数（世帯）」の加算方式。
// 就労は外勤・内勤/自営に分かれ、週の就労日数・時間で判定。
// 父母それぞれ最大10点、合計20点がフルタイム共働きの基本ライン。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'niigata',
  name: '新潟市',
  slug: 'niigata',
  prefecture: '新潟県',
  maxBasePoints: 20, // 父母各10点
} as const;

// ---------------------------------------------------------------------------
// 基準指数の選択肢テンプレート
// ---------------------------------------------------------------------------

/** 就労（外勤） */
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '週5日以上かつ週35時間以上（外勤）', value: `${prefix}_employment_10`, points: 10 },
  { label: '週5日以上かつ週28時間以上（外勤）', value: `${prefix}_employment_9`, points: 9 },
  { label: '週4日以上かつ週28時間以上（外勤）', value: `${prefix}_employment_8`, points: 8 },
  { label: '週4日以上かつ週16時間以上（外勤）', value: `${prefix}_employment_7`, points: 7 },
  { label: '週3日以上かつ週12時間以上（外勤）', value: `${prefix}_employment_6`, points: 6 },
  { label: '内勤・自営（週5日以上かつ週35時間以上）', value: `${prefix}_employment_s9`, points: 9 },
  { label: '内勤・自営（週4日以上かつ週28時間以上）', value: `${prefix}_employment_s7`, points: 7 },
  { label: '内勤・自営（週3日以上かつ週12時間以上）', value: `${prefix}_employment_s5`, points: 5 },
];

/** 疾病 */
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院中・常時病臥', value: `${prefix}_illness_10`, points: 10 },
  { label: '通院加療が必要', value: `${prefix}_illness_7`, points: 7 },
];

/** 障害 */
const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '重度（身体1・2級/療育A/精神1級）', value: `${prefix}_disability_10`, points: 10 },
  { label: '中度（身体3級/療育B/精神2級）', value: `${prefix}_disability_8`, points: 8 },
  { label: '軽度', value: `${prefix}_disability_6`, points: 6 },
];

/** 介護・看護 */
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '週5日以上', value: `${prefix}_care_10`, points: 10 },
  { label: '週3日以上', value: `${prefix}_care_7`, points: 7 },
  { label: 'それ以外', value: `${prefix}_care_5`, points: 5 },
];

/** 出産 */
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産前後', value: `${prefix}_childbirth_7`, points: 7 },
];

/** 就学 */
const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '職業訓練・大学院等（週5日以上）', value: `${prefix}_education_9`, points: 9 },
  { label: '大学・専門学校等（週4日以上）', value: `${prefix}_education_7`, points: 7 },
  { label: 'その他', value: `${prefix}_education_5`, points: 5 },
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
      helpText: '外勤（雇用）と内勤・自営で点数が異なります',
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
      helpText: '通学の頻度を選んでください',
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
    helpText: '新潟市ではひとり親の場合、基準指数に加えて調整指数が加算されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい', value: 'adj_single_parent_yes', points: 6 },
    ],
  },
  {
    id: 'adj_single_assignment',
    category: 'adjustment',
    label: 'パパ・ママのどちらかが単身赴任中ですか？',
    helpText: '県外に単身赴任中の場合は加点が大きくなります',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_assignment_no', points: 0 },
      { label: 'はい（県外）', value: 'adj_single_assignment_far', points: 4 },
      { label: 'はい（県内）', value: 'adj_single_assignment_near', points: 2 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: 'きょうだいの保育施設の状況は？',
    helpText: '在園中のきょうだいがいて同じ施設を希望する場合は加点が大きくなります',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_sibling_no', points: 0 },
      { label: 'きょうだいが在園中で、同じ園を希望する', value: 'adj_sibling_same', points: 4 },
      { label: 'きょうだいが在園中（別の園を希望）', value: 'adj_sibling_diff', points: 2 },
      { label: 'きょうだいと同時に申し込む（双子など）', value: 'adj_sibling_simultaneous', points: 3 },
    ],
  },
  {
    id: 'adj_unlicensed_nursery',
    category: 'adjustment',
    label: '認可外の保育施設に預けていますか？',
    helpText: '月ぎめで認可外保育施設を利用している場合です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unlicensed_nursery_no', points: 0 },
      { label: 'はい', value: 'adj_unlicensed_nursery_yes', points: 2 },
    ],
  },
  {
    id: 'adj_parental_leave',
    category: 'adjustment',
    label: '育児休業から復帰する予定ですか？',
    helpText: '育児休業を取得し、入園する月に職場復帰する場合です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_parental_leave_no', points: 0 },
      { label: 'はい', value: 'adj_parental_leave_yes', points: 2 },
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
    id: 'adj_grandparent_cohabit',
    category: 'adjustment',
    label: '65歳未満の同居親族に子どもの面倒を見られる方がいますか？',
    helpText: '同居の祖父母などが保育可能な場合は減点になります',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_grandparent_cohabit_no', points: 0 },
      { label: 'はい', value: 'adj_grandparent_cohabit_yes', points: -2 },
    ],
  },
];

// ---------------------------------------------------------------------------
// エクスポート
// ---------------------------------------------------------------------------

export const niigataData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
