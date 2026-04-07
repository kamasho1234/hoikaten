import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 三鷹市 保育園入園 基本指数・調整指数データ
// ---------------------------------------------------------------------------
// 三鷹市は「基本指数（父母それぞれ）＋ 調整指数」の加算方式。
// 就労は勤務日数×勤務時間の組み合わせで指数を判定。
// 父母それぞれ最大10点。フルタイム共働きで20点が基本ライン。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'mitaka',
  name: '三鷹市',
  slug: 'mitaka',
  prefecture: '東京都',
  maxBasePoints: 20, // 父母各10点
} as const;

// ---------------------------------------------------------------------------
// 基本指数の選択肢テンプレート
// ---------------------------------------------------------------------------

/** 就労 */
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '週5日以上かつ週40時間以上', value: `${prefix}_employment_10`, points: 10 },
  { label: '週5日以上かつ週35時間以上40時間未満', value: `${prefix}_employment_9`, points: 9 },
  { label: '週4日以上かつ週28時間以上35時間未満', value: `${prefix}_employment_8`, points: 8 },
  { label: '週4日以上かつ週24時間以上28時間未満', value: `${prefix}_employment_7`, points: 7 },
  { label: '週3日以上かつ週20時間以上24時間未満', value: `${prefix}_employment_6`, points: 6 },
  { label: '週3日以上かつ週16時間以上20時間未満', value: `${prefix}_employment_5`, points: 5 },
  { label: '月48時間以上64時間未満', value: `${prefix}_employment_4`, points: 4 },
];

/** 疾病 */
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院中・常時臥床', value: `${prefix}_illness_10`, points: 10 },
  { label: '自宅療養（安静が必要）', value: `${prefix}_illness_8`, points: 8 },
  { label: '週3日以上通院', value: `${prefix}_illness_6`, points: 6 },
  { label: '月1〜2日通院', value: `${prefix}_illness_4`, points: 4 },
];

/** 障害 */
const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '身体1〜2級/愛の手帳1〜3度/精神1級', value: `${prefix}_disability_10`, points: 10 },
  { label: '身体3級/精神2級', value: `${prefix}_disability_8`, points: 8 },
  { label: '身体4級/精神3級', value: `${prefix}_disability_6`, points: 6 },
];

/** 介護・看護 */
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '週40時間以上の介護・看護', value: `${prefix}_care_10`, points: 10 },
  { label: '週28時間以上の介護・看護', value: `${prefix}_care_8`, points: 8 },
  { label: '週16時間以上の介護・看護', value: `${prefix}_care_6`, points: 6 },
];

/** 出産 */
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産前後2か月', value: `${prefix}_childbirth_8`, points: 8 },
];

/** 就学 */
const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '週40時間以上の就学・職業訓練', value: `${prefix}_education_10`, points: 10 },
  { label: '週28時間以上の就学・職業訓練', value: `${prefix}_education_8`, points: 8 },
  { label: '週16時間以上の就学・職業訓練', value: `${prefix}_education_6`, points: 6 },
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
      helpText: '週あたりの勤務日数と勤務時間の組み合わせで判定されます',
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
      helpText: '週あたりの介護・看護時間を選んでください',
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
      { label: 'はい', value: 'adj_single_parent_yes', points: 2 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: 'きょうだいの保育施設の状況は？',
    helpText: 'きょうだいが在園中の同じ園を希望する場合に加点されます',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_sibling_no', points: 0 },
      { label: 'きょうだいが在園中の同じ園を希望する', value: 'adj_sibling_same', points: 2 },
      { label: 'きょうだいと同時に申し込む（双子など）', value: 'adj_sibling_simultaneous', points: 1 },
    ],
  },
  {
    id: 'adj_unlicensed_nursery',
    category: 'adjustment',
    label: '認可外保育施設に預けていますか？',
    helpText: '月ぎめ月48時間以上かつ3か月以上利用している場合',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unlicensed_nursery_no', points: 0 },
      { label: 'はい', value: 'adj_unlicensed_nursery_yes', points: 2 },
    ],
  },
  {
    id: 'adj_parental_leave',
    category: 'adjustment',
    label: '育児休業から復帰予定ですか？',
    helpText: '育児休業を取得して入園月に復帰する場合',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_parental_leave_no', points: 0 },
      { label: 'はい', value: 'adj_parental_leave_yes', points: 1 },
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
    id: 'adj_outside_city',
    category: 'adjustment',
    label: '三鷹市外からの申込ですか？',
    helpText: '三鷹市に在住していない場合は減点になります',
    inputType: 'radio',
    options: [
      { label: 'いいえ（三鷹市在住）', value: 'adj_outside_city_no', points: 0 },
      { label: 'はい（市外から申込）', value: 'adj_outside_city_yes', points: -5 },
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
  {
    id: 'adj_transfer',
    category: 'adjustment',
    label: '転園の申込ですか？',
    helpText: '現在認可保育園に在園中で別の園への転園を希望する場合',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_transfer_no', points: 0 },
      { label: 'はい', value: 'adj_transfer_yes', points: -2 },
    ],
  },
];

// ---------------------------------------------------------------------------
// エクスポート
// ---------------------------------------------------------------------------

export const mitakaData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
