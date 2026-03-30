import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 横浜市 保育園入園 ランク（基本指数）・調整指数データ
// ---------------------------------------------------------------------------
// 横浜市は「ランク制（A〜I）」＋「調整指数」の二段階方式。
// 父母それぞれにランクを判定し、低い方のランクが世帯のランクになる。
// シミュレーター上ではランクを点数に変換して表示する:
//   A→9, B→8, C→7, D→6, E→5, F→4, G→3, H→2, I→1
// ---------------------------------------------------------------------------

const municipality = {
  id: 'yokohama',
  name: '横浜市',
  slug: 'yokohama',
  prefecture: '神奈川県',
  maxBasePoints: 9, // ランクA = 9点
  scoringMethod: 'min' as const, // 低い方のランクが世帯ランク
} as const;

// ---------------------------------------------------------------------------
// 保育が必要な理由ごとの選択肢テンプレート
// ---------------------------------------------------------------------------

/** 就労 */
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月20日以上かつ月160時間以上（ランクA）', value: `${prefix}_employment_9`, points: 9 },
  { label: '月20日以上かつ月140時間以上160時間未満（ランクB）', value: `${prefix}_employment_8`, points: 8 },
  { label: '月16日以上かつ月96時間以上（ランクC）', value: `${prefix}_employment_7`, points: 7 },
  { label: '月16日以上かつ月64時間以上96時間未満（ランクD）', value: `${prefix}_employment_6`, points: 6 },
  { label: '月12日以上かつ月64時間以上（ランクE）', value: `${prefix}_employment_5`, points: 5 },
  { label: '月64時間以上の就労（上記以外）（ランクF）', value: `${prefix}_employment_4`, points: 4 },
];

/** 疾病・障害 */
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院中・常時病臥（ランクA相当）', value: `${prefix}_illness_9`, points: 9 },
  { label: '通院加療が必要（ランクC相当）', value: `${prefix}_illness_7`, points: 7 },
];

/** 障害 */
const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '障害者手帳を持っている（身体・精神・療育）（ランクA相当）', value: `${prefix}_disability_9`, points: 9 },
];

/** 介護 */
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '週5日以上の介護（ランクA相当）', value: `${prefix}_care_9`, points: 9 },
  { label: '週3日以上の介護（ランクC相当）', value: `${prefix}_care_7`, points: 7 },
];

/** 出産 */
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産前後各8週間（ランクG相当）', value: `${prefix}_childbirth_3`, points: 3 },
];

/** 就学・技能習得 */
const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '就学・技能習得等（ランクE相当）', value: `${prefix}_education_5`, points: 5 },
];

/** 求職活動 */
const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職中（ランクH相当）', value: `${prefix}_jobseeking_2`, points: 2 },
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
      helpText: '横浜市ではランク制で判定されます。いちばん近い働き方を選んでください',
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
      label: `${parentLabel}の障害の状況は？`,
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
      helpText: '就学・職業訓練などが該当します',
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
      { label: 'はい（同居の親族なし）', value: 'adj_single_parent_yes', points: 3 },
      { label: 'はい（同居の親族あり）', value: 'adj_single_parent_relative', points: 1 },
    ],
  },
  {
    id: 'adj_yokohama_nursery_graduate',
    category: 'adjustment',
    label: '横浜保育室・小規模保育などの卒園児ですか？',
    helpText: '横浜保育室、家庭的保育事業、小規模保育事業、事業所内保育事業の卒園児が対象です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_yokohama_nursery_graduate_no', points: 0 },
      { label: 'はい', value: 'adj_yokohama_nursery_graduate_yes', points: 5 },
    ],
  },
  {
    id: 'adj_sibling_same_facility',
    category: 'adjustment',
    label: 'きょうだいが同じ施設に在園していて、同じ施設に申し込みますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_same_facility_no', points: 0 },
      { label: 'はい', value: 'adj_sibling_same_facility_yes', points: 4 },
    ],
  },
  {
    id: 'adj_unlicensed_nursery',
    category: 'adjustment',
    label: '認可外保育施設にお金を払って月64時間以上預けていますか？',
    helpText: '月ぎめで預けている場合です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unlicensed_nursery_no', points: 0 },
      { label: 'はい', value: 'adj_unlicensed_nursery_yes', points: 3 },
    ],
  },
  {
    id: 'adj_single_assignment',
    category: 'adjustment',
    label: 'パパ・ママのどちらかが単身赴任中ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_assignment_no', points: 0 },
      { label: 'はい', value: 'adj_single_assignment_yes', points: 2 },
    ],
  },
  {
    id: 'adj_night_shift',
    category: 'adjustment',
    label: '夜勤をしていますか？（月2回以上）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_night_shift_no', points: 0 },
      { label: 'はい', value: 'adj_night_shift_yes', points: 1 },
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
      { label: 'はい', value: 'adj_grandparent_cohabit_yes', points: -1 },
    ],
  },
];

// ---------------------------------------------------------------------------
// エクスポート
// ---------------------------------------------------------------------------

export const yokohamaData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
