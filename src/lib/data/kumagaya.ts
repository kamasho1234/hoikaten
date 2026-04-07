import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 熊谷市 保育園入園 基準指数・調整指数データ
// 出典: 熊谷市「令和8年度 保育所等利用調整基準」
//       (熊谷市こども課)
// ---------------------------------------------------------------------------

const municipality = {
  id: 'kumagaya',
  name: '熊谷市',
  slug: 'kumagaya',
  prefecture: '埼玉県',
  maxBasePoints: 40, // 父母各20点
} as const;

// ---------------------------------------------------------------------------
// 保育が必要な理由ごとの選択肢テンプレート（父母各最大20点）
// ---------------------------------------------------------------------------

/** 就労（外勤・自営・内職） */
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月160時間以上', value: `${prefix}_employment_20`, points: 20 },
  { label: '月120時間以上160時間未満', value: `${prefix}_employment_18`, points: 18 },
  { label: '月100時間以上120時間未満', value: `${prefix}_employment_16`, points: 16 },
  { label: '月80時間以上100時間未満', value: `${prefix}_employment_14`, points: 14 },
  { label: '月64時間以上80時間未満', value: `${prefix}_employment_12`, points: 12 },
  { label: '上記以外の就労（無収入含む）', value: `${prefix}_employment_3`, points: 3 },
];

/** 疾病 */
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '1ヶ月以上入院中（入院予定含む）', value: `${prefix}_illness_20a`, points: 20 },
  { label: '常時病臥（1日の大半を病床で過ごす）', value: `${prefix}_illness_20b`, points: 20 },
  { label: '精神疾患の療養', value: `${prefix}_illness_17`, points: 17 },
  { label: '医師が安静（1ヶ月以上）を要すると診断', value: `${prefix}_illness_17b`, points: 17 },
  { label: '通院加療（1ヶ月以上）', value: `${prefix}_illness_13`, points: 13 },
  { label: 'その他の療養', value: `${prefix}_illness_13b`, points: 13 },
];

/** 障害 */
const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '身体障害者手帳1・2級、療育手帳A～B', value: `${prefix}_disability_20`, points: 20 },
  { label: '精神障害者保健福祉手帳1～3級', value: `${prefix}_disability_17`, points: 17 },
  { label: '身体障害者手帳3級、療育手帳C', value: `${prefix}_disability_16`, points: 16 },
  { label: '身体障害者手帳4級以下', value: `${prefix}_disability_15`, points: 15 },
];

/** 介護・看護 */
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '要介護4・5等の同居家族に月120時間以上', value: `${prefix}_care_19`, points: 19 },
  { label: '要介護4・5等の同居家族に月80時間以上120時間未満', value: `${prefix}_care_16`, points: 16 },
  { label: '要介護4・5等の同居家族に月64時間以上80時間未満', value: `${prefix}_care_15`, points: 15 },
  { label: '要介護3等の同居家族に月120時間以上', value: `${prefix}_care_18`, points: 18 },
  { label: '要介護3等の同居家族に月80時間以上120時間未満', value: `${prefix}_care_15b`, points: 15 },
  { label: '要介護3等の同居家族に月64時間以上80時間未満', value: `${prefix}_care_14`, points: 14 },
  { label: '上記以外の認定者等の介護に月120時間以上', value: `${prefix}_care_12`, points: 12 },
  { label: '上記以外の認定者等の介護に月64時間以上120時間未満', value: `${prefix}_care_3`, points: 3 },
];

/** 出産 */
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産前後（産前2ヶ月～産後8週）', value: `${prefix}_childbirth_20`, points: 20 },
];

/** 就学 */
const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '日中、就学・技能習得で外出を常態', value: `${prefix}_education_use1`, points: 0, helpText: '就労の基準指数を準用' },
  { label: '就学・技能習得が内定', value: `${prefix}_education_use2`, points: 0, helpText: '求職内定の基準指数を準用' },
];

/** 求職活動 */
const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '就労内定（月120時間以上）', value: `${prefix}_jobseeking_10`, points: 10 },
  { label: '就労内定（月64時間以上120時間未満）', value: `${prefix}_jobseeking_8`, points: 8 },
  { label: '就労内定（上記以外）', value: `${prefix}_jobseeking_3`, points: 3 },
  { label: '1ヶ月以上定期的に求職活動中', value: `${prefix}_jobseeking_3b`, points: 3 },
  { label: '求職中（就労先未定）', value: `${prefix}_jobseeking_1`, points: 1 },
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
      helpText: '月あたりの就労時間を選んでください（通勤時間は含まず、休憩・残業時間は含む）',
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
      label: `${parentLabel}はどのくらい介護・看護していますか？`,
      helpText: '介護対象者の状態と月あたりの介護時間を選んでください',
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
      label: `${parentLabel}は学校に通っていますか？`,
      helpText: '就学の場合、就労の基準指数を準用します',
      inputType: 'radio',
      options: educationOptions(prefix),
    },
    {
      id: `${prefix}_jobseeking`,
      category,
      label: `${parentLabel}の求職・就労内定の状況は？`,
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
      { label: 'はい', value: 'adj_single_parent_yes', points: 5 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: 'きょうだいが認可保育所等に在園中ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_no', points: 0 },
      { label: 'はい', value: 'adj_sibling_yes', points: 3 },
    ],
  },
  {
    id: 'adj_simultaneous',
    category: 'adjustment',
    label: '同時に2人以上の入所を申し込みますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_simultaneous_no', points: 0 },
      { label: 'はい', value: 'adj_simultaneous_yes', points: 2 },
    ],
  },
  {
    id: 'adj_unlicensed_nursery',
    category: 'adjustment',
    label: '認可外保育施設に月64時間以上預けていますか？',
    helpText: '就労等の保育認定事由のため預託している場合に限る',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unlicensed_nursery_no', points: 0 },
      { label: 'はい', value: 'adj_unlicensed_nursery_yes', points: 3 },
    ],
  },
  {
    id: 'adj_parental_leave',
    category: 'adjustment',
    label: '育休・産休から復帰する予定ですか？',
    helpText: '入所月の翌月末までに復職する場合',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_parental_leave_no', points: 0 },
      { label: 'はい', value: 'adj_parental_leave_yes', points: 2 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい', value: 'adj_welfare_yes', points: 3 },
    ],
  },
  {
    id: 'adj_outside_city',
    category: 'adjustment',
    label: '熊谷市外にお住まいですか？',
    helpText: '市外からの申込は減点対象です',
    inputType: 'radio',
    options: [
      { label: 'いいえ（熊谷市在住）', value: 'adj_outside_city_no', points: 0 },
      { label: 'はい（市外在住）', value: 'adj_outside_city_yes', points: -10 },
    ],
  },
  {
    id: 'adj_grandparent',
    category: 'adjustment',
    label: '同居している65歳未満の祖父母が保育可能な状態ですか？',
    helpText: '無職または短時間就労の祖父母が同居している場合（減点項目）',
    inputType: 'radio',
    options: [
      { label: 'いいえ（該当しない）', value: 'adj_grandparent_no', points: 0 },
      { label: 'はい', value: 'adj_grandparent_yes', points: -3 },
    ],
  },
  {
    id: 'adj_transfer',
    category: 'adjustment',
    label: '在園中の保育所等から転園を希望しますか？',
    helpText: '現在通っている認可保育所等からの転園希望の場合（減点項目）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_transfer_no', points: 0 },
      { label: 'はい', value: 'adj_transfer_yes', points: -5 },
    ],
  },
];

// ---------------------------------------------------------------------------
// エクスポート
// ---------------------------------------------------------------------------

export const kumagayaData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
