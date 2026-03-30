import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 名古屋市 保育園入園 ランク（基本指数）・調整指数データ
// ---------------------------------------------------------------------------
// 名古屋市は「ランク制（A〜I）」＋「調整指数」の二段階方式。
// 父母それぞれにランクを判定し、低い方のランクが世帯のランクになる。
// シミュレーター上ではランクを点数に変換して表示する:
//   A→9, B→8, C→7, D→6, E→5, F→4, G→3, H→2, I→1
// ---------------------------------------------------------------------------

const municipality = {
  id: 'nagoya',
  name: '名古屋市',
  slug: 'nagoya',
  prefecture: '愛知県',
  maxBasePoints: 9, // ランクA = 9点
  scoringMethod: 'min' as const, // 低い方のランクが世帯ランク
} as const;

// ---------------------------------------------------------------------------
// 保育が必要な理由ごとの選択肢テンプレート
// ---------------------------------------------------------------------------

/** 就労 */
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '1日4時間以上・週4日以上・週40時間以上（ランクA）', value: `${prefix}_employment_9`, points: 9 },
  { label: '1日4時間以上・週4日以上・週30時間以上（ランクB）', value: `${prefix}_employment_8`, points: 8 },
  { label: '1日4時間以上・週4日以上・週24時間以上（ランクC）', value: `${prefix}_employment_7`, points: 7 },
  { label: '1日4時間以上・週4日以上・週16時間以上（ランクD）', value: `${prefix}_employment_6`, points: 6 },
  { label: '月64時間以上の就労（上記以外）（ランクF）', value: `${prefix}_employment_4`, points: 4 },
];

/** 疾病 */
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '常時病臥している（ランクA相当）', value: `${prefix}_illness_9`, points: 9 },
  { label: '常に安静が必要（ランクB相当）', value: `${prefix}_illness_8`, points: 8 },
  { label: '月16日・週16時間以上の安静が必要（ランクD相当）', value: `${prefix}_illness_6`, points: 6 },
];

/** 障害 */
const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '身体障害1〜2級・精神1〜2級・療育手帳（ランクA相当）', value: `${prefix}_disability_9`, points: 9 },
  { label: '身体障害3級・精神3級（ランクB相当）', value: `${prefix}_disability_8`, points: 8 },
  { label: '身体障害4級（ランクD相当）', value: `${prefix}_disability_6`, points: 6 },
];

/** 介護 */
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '月20日以上・週40時間以上の介護（ランクA相当）', value: `${prefix}_care_9`, points: 9 },
  { label: '月16日以上・週24時間以上の介護（ランクC相当）', value: `${prefix}_care_7`, points: 7 },
  { label: '月16日以上・週16時間以上の介護（ランクE相当）', value: `${prefix}_care_5`, points: 5 },
];

/** 就学・技能習得 */
const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '月16日以上・週30時間以上（ランクC相当）', value: `${prefix}_education_7`, points: 7 },
  { label: '月16日以上・週24時間以上（ランクD相当）', value: `${prefix}_education_6`, points: 6 },
  { label: '月16日以上・週16時間以上（ランクE相当）', value: `${prefix}_education_5`, points: 5 },
];

/** 出産 */
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産前後（ランクH相当）', value: `${prefix}_childbirth_2`, points: 2 },
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
      helpText: '名古屋市ではランク制で判定されます。いちばん近い働き方を選んでください',
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
    id: 'adj_sibling_same_facility',
    category: 'adjustment',
    label: 'きょうだいが同じ施設に在園していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_same_facility_no', points: 0 },
      { label: 'はい', value: 'adj_sibling_same_facility_yes', points: 5 },
    ],
  },
  {
    id: 'adj_sibling_simultaneous',
    category: 'adjustment',
    label: 'きょうだい同時申込ですか？（双子など）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_simultaneous_no', points: 0 },
      { label: 'はい', value: 'adj_sibling_simultaneous_yes', points: 4 },
    ],
  },
  {
    id: 'adj_small_nursery_graduate',
    category: 'adjustment',
    label: '小規模保育などの卒園児ですか？',
    helpText: '小規模保育事業、家庭的保育事業、事業所内保育事業の卒園児が対象です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_small_nursery_graduate_no', points: 0 },
      { label: 'はい', value: 'adj_small_nursery_graduate_yes', points: 5 },
    ],
  },
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
    id: 'adj_parental_leave_return',
    category: 'adjustment',
    label: '育休から復帰する予定ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_parental_leave_return_no', points: 0 },
      { label: 'はい', value: 'adj_parental_leave_return_yes', points: 3 },
    ],
  },
  {
    id: 'adj_unlicensed_nursery',
    category: 'adjustment',
    label: '認可外保育施設を利用していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unlicensed_nursery_no', points: 0 },
      { label: 'はい', value: 'adj_unlicensed_nursery_yes', points: 3 },
    ],
  },
  {
    id: 'adj_multiple_birth',
    category: 'adjustment',
    label: '多胎児（双子以上）ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_multiple_birth_no', points: 0 },
      { label: 'はい', value: 'adj_multiple_birth_yes', points: 2 },
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
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護を受けていますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい', value: 'adj_welfare_yes', points: 1 },
    ],
  },
  {
    id: 'adj_grandparent',
    category: 'adjustment',
    label: '近くに祖父母が住んでいますか？',
    helpText: '同居または同一区内に住んでいる場合は減点になります',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_grandparent_no', points: 0 },
      { label: '同居している', value: 'adj_grandparent_cohabit', points: -2 },
      { label: '同じ区内に住んでいる', value: 'adj_grandparent_same_ward', points: -1 },
    ],
  },
];

// ---------------------------------------------------------------------------
// エクスポート
// ---------------------------------------------------------------------------

export const nagoyaData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
