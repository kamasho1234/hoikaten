import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 松戸市 保育園入園 基準点・調整指数データ
// Source: https://www.city.matsudo.chiba.jp/kosodate/matsudodekosodate/kosodatenavi/hoikuenyouchien/nyuusho_annai.html
// 令和8年度 入所選考基準表
// ---------------------------------------------------------------------------

const municipality = {
  id: 'matsudo',
  name: '松戸市',
  slug: 'matsudo',
  prefecture: '千葉県',
  maxBasePoints: 200, // 100 per parent, sum method
} as const;

// ---------------------------------------------------------------------------
// 基準点の選択肢テンプレート（父母それぞれ最大100点）
// ---------------------------------------------------------------------------

/** 就労 */
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月20日以上 週35時間以上 週5日以上', value: `${prefix}_employment_100`, points: 100 },
  { label: '週30時間以上 週5日以上', value: `${prefix}_employment_90`, points: 90 },
  { label: '月16日以上 週24時間以上 週4日以上', value: `${prefix}_employment_70`, points: 70 },
  { label: '週16時間以上 週4日以上', value: `${prefix}_employment_65`, points: 65 },
  { label: '月64時間以上（その他）', value: `${prefix}_employment_60`, points: 60 },
];

/** 疾病 */
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院中 / 1か月以内に入院決定', value: `${prefix}_illness_100`, points: 100 },
  { label: '30日以上の療養・常時介護が必要', value: `${prefix}_illness_70`, points: 70 },
  { label: '通院加療が必要で保育できない', value: `${prefix}_illness_50`, points: 50 },
];

/** 障害 */
const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '重度（身障2級以上/精神1級/療育A以上）', value: `${prefix}_disability_100`, points: 100 },
  { label: '中度（身障3級以上/精神2級/療育B-1以上）', value: `${prefix}_disability_80`, points: 80 },
  { label: '軽度（身障4級以上/精神3級/療育B-2以上）', value: `${prefix}_disability_60`, points: 60 },
  { label: '通院・加療中で保育に支障', value: `${prefix}_disability_50`, points: 50 },
];

/** 介護・看護 */
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '親族の入院付き添い', value: `${prefix}_care_90`, points: 90 },
  { label: '重度障害者（要介護3-5/身障1-2級/知的A）の介護', value: `${prefix}_care_80`, points: 80 },
  { label: '常時介護（要介護1-2/身障3-4級/知的B）', value: `${prefix}_care_70`, points: 70 },
  { label: 'その他の介護', value: `${prefix}_care_60`, points: 60 },
];

/** 出産 */
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '切迫流産・切迫早産等で緊急性が認められる', value: `${prefix}_childbirth_150`, points: 150 },
  { label: '出産間近または産後間もない', value: `${prefix}_childbirth_120`, points: 120 },
  { label: 'その他の妊娠', value: `${prefix}_childbirth_60`, points: 60 },
];

/** 就学（学校教育法等） */
const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '学校教育法に定める学校・職業訓練施設に通学', value: `${prefix}_education_90`, points: 90 },
  { label: '上記以外の就学（週5日以上 日中5時間以上）', value: `${prefix}_education_80`, points: 80 },
  { label: '上記以外の就学（週4日以上 日中5時間以上）', value: `${prefix}_education_70`, points: 70 },
];

/** 求職・内定 */
const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '就労内定（月20日以上 週35時間以上 週5日以上）', value: `${prefix}_jobseeking_110`, points: 110 },
  { label: '就労内定（月20日以上 週30時間以上 週5日以上）', value: `${prefix}_jobseeking_80`, points: 80 },
  { label: '就労内定（月16日以上 週16時間以上 週4日以上）', value: `${prefix}_jobseeking_70`, points: 70 },
  { label: '就労内定（月64時間以上）', value: `${prefix}_jobseeking_60`, points: 60 },
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
      label: `${parentLabel}の就労状況は？`,
      helpText: '就労条件を選んでください',
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
      label: `${parentLabel}の介護・看護の状況は？`,
      helpText: '該当する状況を選んでください',
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
      label: `${parentLabel}の求職・内定状況は？`,
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
  // ひとり親
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい（扶養児童1人）', value: 'adj_single_parent_one', points: 5 },
      { label: 'はい（扶養児童2人以上）', value: 'adj_single_parent_multiple', points: 10 },
    ],
  },
  // 育休復帰
  {
    id: 'adj_parental_leave',
    category: 'adjustment',
    label: '育休から復帰予定ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_parental_leave_no', points: 0 },
      { label: 'はい', value: 'adj_parental_leave_yes', points: 20 },
    ],
  },
  // きょうだい関連
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: 'きょうだいの状況は？',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_sibling_none', points: 0 },
      { label: 'きょうだいが園に在園し同一園を希望', value: 'adj_sibling_same_wish', points: 20 },
      { label: 'きょうだいと同時入園申し込み', value: 'adj_sibling_simultaneous', points: 13 },
      { label: 'きょうだい別施設→同一施設転園', value: 'adj_sibling_transfer', points: 10 },
    ],
  },
  // 小規模保育所卒園
  {
    id: 'adj_small_daycare_grad',
    category: 'adjustment',
    label: '小規模保育所から卒園しますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_small_daycare_grad_no', points: 0 },
      { label: 'はい（3歳以降の継続利用）（+20）', value: 'adj_small_daycare_grad_yes', points: 20 },
      { label: 'はい（連携園へ転園）（+35）', value: 'adj_small_daycare_grad_connected', points: 35 },
    ],
  },
  // 保育士資格等で市内勤務
  {
    id: 'adj_childcare_worker',
    category: 'adjustment',
    label: '市内の保育施設で働いていますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_childcare_worker_no', points: 0 },
      { label: 'はい（保育士資格等あり）', value: 'adj_childcare_worker_licensed', points: 45 },
      { label: 'はい（資格なし）', value: 'adj_childcare_worker_unlicensed', points: 20 },
    ],
  },
  // 祖父母等からの支援
  {
    id: 'adj_grandparent_support',
    category: 'adjustment',
    label: '同居の祖父母等から育児支援がありますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_grandparent_support_no', points: 0 },
      { label: 'はい', value: 'adj_grandparent_support_yes', points: -20 },
    ],
  },
];

// ---------------------------------------------------------------------------
// エクスポート
// ---------------------------------------------------------------------------

export const matsudoData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
