import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 川越市 保育園入園 基本指数・調整指数データ
// 出典: 令和8年度 川越市保育所入所基準指数表
// https://www.city.kawagoe.saitama.jp/kosodate/azukeru/1004356/1004359.html
// ---------------------------------------------------------------------------

const municipality = {
  id: 'kawagoe',
  name: '川越市',
  slug: 'kawagoe',
  prefecture: '埼玉県',
  maxBasePoints: 42, // 父母各21点（就労月150時間以上）
} as const;

// ---------------------------------------------------------------------------
// 保育が必要な理由ごとの選択肢テンプレート
// ---------------------------------------------------------------------------

/** 就労（外勤） */
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月150時間以上', value: `${prefix}_employment_21`, points: 21 },
  { label: '月140〜149時間', value: `${prefix}_employment_19`, points: 19 },
  { label: '月130〜139時間', value: `${prefix}_employment_17`, points: 17 },
  { label: '月120〜129時間', value: `${prefix}_employment_15`, points: 15 },
  { label: '月110〜119時間', value: `${prefix}_employment_13`, points: 13 },
  { label: '月100〜109時間', value: `${prefix}_employment_11`, points: 11 },
  { label: '月64〜99時間', value: `${prefix}_employment_9`, points: 9 },
  { label: '内職', value: `${prefix}_employment_8`, points: 8 },
];

/** 就労内定 */
const jobOfferOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_joboffer_none`, points: 0 },
  { label: '月120時間以上（内定）', value: `${prefix}_joboffer_14`, points: 14 },
  { label: '月64〜119時間（内定）', value: `${prefix}_joboffer_8`, points: 8 },
];

/** 疾病 */
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '疾病（診断書等あり）', value: `${prefix}_illness_22`, points: 22 },
];

/** 障害 */
const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '身体障害者手帳1・2級', value: `${prefix}_disability_25`, points: 25 },
  { label: '身体障害者手帳3級', value: `${prefix}_disability_22`, points: 22 },
  { label: '療育手帳Ⓐ・A', value: `${prefix}_disability_ryoiku_25`, points: 25 },
  { label: '療育手帳B・C', value: `${prefix}_disability_ryoiku_22`, points: 22 },
  { label: '精神障害者保健福祉手帳所持', value: `${prefix}_disability_mental_25`, points: 25 },
];

/** 介護・看護 */
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '常時付添を要する', value: `${prefix}_care_21`, points: 21 },
  { label: '週5日以上付添を要する', value: `${prefix}_care_19`, points: 19 },
  { label: '週3日以上付添を要する', value: `${prefix}_care_17`, points: 17 },
];

/** 出産 */
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '妊娠・出産', value: `${prefix}_childbirth_25`, points: 25 },
];

/** 就学 */
const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '就学中', value: `${prefix}_education_18`, points: 18 },
  { label: '就学予定', value: `${prefix}_education_7`, points: 7 },
];

/** 求職活動 */
const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動中', value: `${prefix}_jobseeking_5`, points: 5 },
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
    helpText: 'いちばん近いものをひとつ選んでください（複数該当する場合は最も点数が高いもの）',
    inputType: 'select',
    options: [
      { label: '仕事をしている（外勤）', value: `${prefix}_reason_employment`, points: 0 },
      { label: '仕事が内定している', value: `${prefix}_reason_joboffer`, points: 0 },
      { label: '病気の治療中', value: `${prefix}_reason_illness`, points: 0 },
      { label: '障害がある', value: `${prefix}_reason_disability`, points: 0 },
      { label: '家族の介護・看護をしている', value: `${prefix}_reason_care`, points: 0 },
      { label: '出産の前後', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '学校に通っている', value: `${prefix}_reason_education`, points: 0 },
      { label: '仕事を探している', value: `${prefix}_reason_jobseeking`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の月間の就労時間は？`,
      helpText: '休憩・残業を除いた実働時間で選んでください',
      inputType: 'radio',
      options: employmentOptions(prefix),
    },
    {
      id: `${prefix}_joboffer`,
      category,
      label: `${parentLabel}の就労内定の勤務時間は？`,
      inputType: 'radio',
      options: jobOfferOptions(prefix),
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
      helpText: '週あたりの付添日数で選んでください',
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
      label: `${parentLabel}の就学状況は？`,
      inputType: 'radio',
      options: educationOptions(prefix),
    },
    {
      id: `${prefix}_jobseeking`,
      category,
      label: `${parentLabel}は求職活動中ですか？`,
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
    label: 'ひとり親家庭ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい', value: 'adj_single_parent_yes', points: 40 },
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
    id: 'adj_nursery_worker',
    category: 'adjustment',
    label: '認可外保育施設を含む市内の教育・保育施設に勤務（内定含む）する保育士・幼稚園教諭・保育教諭ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_nursery_worker_no', points: 0 },
      { label: 'はい', value: 'adj_nursery_worker_yes', points: 6 },
    ],
  },
  {
    id: 'adj_unlicensed_nursery',
    category: 'adjustment',
    label: '認可外保育施設・幼稚園・認定こども園（1号）・一時預かりを月10日以上利用していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unlicensed_nursery_no', points: 0 },
      { label: 'はい', value: 'adj_unlicensed_nursery_yes', points: 2 },
    ],
  },
  {
    id: 'adj_sibling_new',
    category: 'adjustment',
    label: 'きょうだいと同時に新規申請しますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_new_no', points: 0 },
      { label: 'はい', value: 'adj_sibling_new_yes', points: 2 },
    ],
  },
  {
    id: 'adj_twins',
    category: 'adjustment',
    label: '多胎児（双子・三つ子等）が同時に新規申請しますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_twins_no', points: 0 },
      { label: 'はい', value: 'adj_twins_yes', points: 2 },
    ],
  },
  {
    id: 'adj_sibling_enrolled',
    category: 'adjustment',
    label: '保育所等に在園する児童（1号認定含む）のきょうだいが新規申請しますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_enrolled_no', points: 0 },
      { label: 'はい', value: 'adj_sibling_enrolled_yes', points: 2 },
    ],
  },
  {
    id: 'adj_sibling_transfer',
    category: 'adjustment',
    label: 'きょうだい（1号認定含む）が在園する保育所等にのみ転園申請しますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_transfer_no', points: 0 },
      { label: 'はい', value: 'adj_sibling_transfer_yes', points: 7 },
    ],
  },
  {
    id: 'adj_sibling_elementary',
    category: 'adjustment',
    label: '小学生以下のきょうだいがいる児童が新規申請しますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_elementary_no', points: 0 },
      { label: 'はい', value: 'adj_sibling_elementary_yes', points: 1 },
    ],
  },
  {
    id: 'adj_small_nursery_grad',
    category: 'adjustment',
    label: '地域型保育事業の卒園児童ですか？',
    helpText: '小規模保育・家庭的保育・事業所内保育を卒園して継続申請する場合',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_small_nursery_grad_no', points: 0 },
      { label: 'はい（連携施設を第一希望）', value: 'adj_small_nursery_grad_linked', points: 28 },
      { label: 'はい（連携施設以外）', value: 'adj_small_nursery_grad_other', points: 21 },
    ],
  },
  {
    id: 'adj_disability_child',
    category: 'adjustment',
    label: '障害児ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_disability_child_no', points: 0 },
      { label: 'はい', value: 'adj_disability_child_yes', points: 12 },
    ],
  },
  {
    id: 'adj_sibling_disability',
    category: 'adjustment',
    label: 'きょうだいが障害児ですか？（介護・看護の場合に加点）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_disability_no', points: 0 },
      { label: 'はい', value: 'adj_sibling_disability_yes', points: 3 },
    ],
  },
  {
    id: 'adj_grandparent',
    category: 'adjustment',
    label: '65歳未満の祖父または祖母と同居していますか？（保育が必要な旨の証明なし）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_grandparent_no', points: 0 },
      { label: 'はい', value: 'adj_grandparent_yes', points: -5 },
    ],
  },
  {
    id: 'adj_self_employed_helper',
    category: 'adjustment',
    label: '自営で協力者がいますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_self_employed_helper_no', points: 0 },
      { label: 'はい', value: 'adj_self_employed_helper_yes', points: -2 },
    ],
  },
];

// ---------------------------------------------------------------------------
// エクスポート
// ---------------------------------------------------------------------------

export const kawagoeData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
