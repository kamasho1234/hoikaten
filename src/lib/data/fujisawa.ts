import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 藤沢市 保育園入園 基礎点数・調整点数データ
// ---------------------------------------------------------------------------
// 藤沢市は「基礎点数（父母それぞれ）＋ 調整点数」の加算方式。
// 就労は月あたりの就労時間で点数を判定。
// 父母それぞれ最大10点。フルタイム共働きで20点が基本ライン。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'fujisawa',
  name: '藤沢市',
  slug: 'fujisawa',
  prefecture: '神奈川県',
  maxBasePoints: 20, // 父母各10点
} as const;

// ---------------------------------------------------------------------------
// 基礎点数の選択肢テンプレート
// ---------------------------------------------------------------------------

/** 就労 */
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月140時間以上', value: `${prefix}_employment_10`, points: 10 },
  { label: '月120時間以上140時間未満', value: `${prefix}_employment_9`, points: 9 },
  { label: '月100時間以上120時間未満', value: `${prefix}_employment_8`, points: 8 },
  { label: '月80時間以上100時間未満', value: `${prefix}_employment_7`, points: 7 },
  { label: '月64時間以上80時間未満', value: `${prefix}_employment_6`, points: 6 },
];

/** 疾病 */
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院中・常時病臥', value: `${prefix}_illness_10`, points: 10 },
  { label: '通院加療（安静が必要）', value: `${prefix}_illness_8`, points: 8 },
  { label: '一般通院', value: `${prefix}_illness_6`, points: 6 },
];

/** 障害 */
const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '身体1〜2級/精神1〜3級/療育手帳', value: `${prefix}_disability_10`, points: 10 },
  { label: '身体3〜4級', value: `${prefix}_disability_8`, points: 8 },
];

/** 介護・看護 */
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '常時介護が必要', value: `${prefix}_care_10`, points: 10 },
  { label: '週3日以上の介護', value: `${prefix}_care_8`, points: 8 },
  { label: 'それ以外', value: `${prefix}_care_6`, points: 6 },
];

/** 出産 */
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産前後（産前6週〜産後8週）', value: `${prefix}_childbirth_7`, points: 7 },
];

/** 就学 */
const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '就学・職業訓練（月140時間以上）', value: `${prefix}_education_10`, points: 10 },
  { label: '就学・職業訓練（月64時間以上）', value: `${prefix}_education_6`, points: 6 },
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
      helpText: '月あたりの就労時間を選んでください',
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
      label: `${parentLabel}はどのような学校に通っていますか？`,
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
// 調整点数の質問
// ---------------------------------------------------------------------------

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい', value: 'adj_single_parent_yes', points: 3 },
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
      { label: 'きょうだいが在園中の施設を希望する', value: 'adj_sibling_same', points: 2 },
      { label: 'きょうだいと同時に申し込む', value: 'adj_sibling_simultaneous', points: 1 },
    ],
  },
  {
    id: 'adj_unlicensed_nursery',
    category: 'adjustment',
    label: 'ベビーシッターや認可外保育施設に預けていますか？',
    helpText: '月ぎめで認可外保育施設やベビーシッターを利用している場合です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unlicensed_nursery_no', points: 0 },
      { label: 'はい', value: 'adj_unlicensed_nursery_yes', points: 4 },
    ],
  },
  {
    id: 'adj_parental_leave',
    category: 'adjustment',
    label: '産休・育休明けの復職予定ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_parental_leave_no', points: 0 },
      { label: 'はい', value: 'adj_parental_leave_yes', points: 1 },
    ],
  },
  {
    id: 'adj_multi_child',
    category: 'adjustment',
    label: '生計を一にする子どもが3人以上いますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_multi_child_no', points: 0 },
      { label: 'はい', value: 'adj_multi_child_yes', points: 1 },
    ],
  },
  {
    id: 'adj_tax_exempt',
    category: 'adjustment',
    label: '住民税非課税世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_tax_exempt_no', points: 0 },
      { label: 'はい', value: 'adj_tax_exempt_yes', points: 1 },
    ],
  },
  {
    id: 'adj_overdue',
    category: 'adjustment',
    label: '在園中のきょうだいに保育料の滞納がありますか？',
    helpText: '滞納がある場合は大幅な減点になります',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_overdue_no', points: 0 },
      { label: 'はい', value: 'adj_overdue_yes', points: -20 },
    ],
  },
];

// ---------------------------------------------------------------------------
// エクスポート
// ---------------------------------------------------------------------------

export const fujisawaData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
