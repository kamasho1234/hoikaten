import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 越谷市 保育園入園 基準指数・調整指数データ
// 出典: 越谷市「令和8年度 特定教育・保育施設及び特定地域型保育事業の利用調整に関する基準」
//       (保育施設・幼稚園等のご案内 57・58ページ)
// ---------------------------------------------------------------------------

const municipality = {
  id: 'koshigaya',
  name: '越谷市',
  slug: 'koshigaya',
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
    label: 'ひとり親家庭で就労または就学していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい', value: 'adj_single_parent_yes', points: 5 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい', value: 'adj_welfare_yes', points: 2 },
    ],
  },
  {
    id: 'adj_parent_absent_one',
    category: 'adjustment',
    label: '父母の一人が不存在（死亡・離婚・未婚など）ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_parent_absent_one_no', points: 0 },
      { label: 'はい', value: 'adj_parent_absent_one_yes', points: 4 },
    ],
  },
  {
    id: 'adj_single_assignment',
    category: 'adjustment',
    label: '父母のどちらかが単身赴任で不在ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_assignment_no', points: 0 },
      { label: 'はい', value: 'adj_single_assignment_yes', points: 2 },
    ],
  },
  {
    id: 'adj_children',
    category: 'adjustment',
    label: '18歳未満の子どもは何人いますか？（申込児童を含む）',
    helpText: '2人以上で加点、2人を超える場合は1人につき2点追加',
    inputType: 'radio',
    options: [
      { label: '1人', value: 'adj_children_1', points: 0 },
      { label: '2人', value: 'adj_children_2', points: 2 },
      { label: '3人', value: 'adj_children_3', points: 4 },
      { label: '4人以上', value: 'adj_children_4', points: 6 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: 'きょうだいが保育所等に在園中、または同時に2人以上申し込みますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_no', points: 0 },
      { label: 'はい', value: 'adj_sibling_yes', points: 3 },
    ],
  },
  {
    id: 'adj_parental_leave',
    category: 'adjustment',
    label: '育休・産休から復帰する予定ですか？',
    helpText: '基準日時点で育児休業または産前産後休業を取得している場合',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_parental_leave_no', points: 0 },
      { label: 'はい', value: 'adj_parental_leave_yes', points: 1 },
    ],
  },
  {
    id: 'adj_unemployment',
    category: 'adjustment',
    label: '生計中心者が失業（自発的失業を除く）により就労の必要性が高いですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unemployment_no', points: 0 },
      { label: 'はい', value: 'adj_unemployment_yes', points: 3 },
    ],
  },
  {
    id: 'adj_disability_family',
    category: 'adjustment',
    label: '同居家族に障害者手帳（身体1～3級/療育A～B/精神1～3級）の方がいますか？',
    helpText: '保護者と申込児童は除く',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_disability_family_no', points: 0 },
      { label: 'はい', value: 'adj_disability_family_yes', points: 1 },
    ],
  },
  {
    id: 'adj_nursery_worker',
    category: 'adjustment',
    label: '保育士・保育教諭として月120時間以上勤務していますか？',
    helpText: '越谷市内の保育所等で勤務の場合7点、市外の場合2点',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_nursery_worker_no', points: 0 },
      { label: 'はい（越谷市内の保育所等で勤務）', value: 'adj_nursery_worker_city', points: 7 },
      { label: 'はい（越谷市内の保育所等に内定）', value: 'adj_nursery_worker_naitei', points: 4 },
      { label: 'はい（越谷市外の保育所等で勤務）', value: 'adj_nursery_worker_outside', points: 2 },
    ],
  },
  {
    id: 'adj_unlicensed_nursery',
    category: 'adjustment',
    label: '認可外保育施設等に月64時間以上預けていますか？',
    helpText: '就労等の保育認定事由のため預託している場合に限る',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unlicensed_nursery_no', points: 0 },
      { label: 'はい（2ヶ月以上前から）', value: 'adj_unlicensed_nursery_2m', points: 5 },
      { label: 'はい（1ヶ月以上前から）', value: 'adj_unlicensed_nursery_1m', points: 3 },
    ],
  },
  {
    id: 'adj_small_nursery_grad',
    category: 'adjustment',
    label: '地域型保育・2歳児クラスまでの保育所を卒園予定ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_small_nursery_grad_no', points: 0 },
      { label: 'はい', value: 'adj_small_nursery_grad_yes', points: 5 },
    ],
  },
  {
    id: 'adj_grandparent',
    category: 'adjustment',
    label: '同居している65歳未満の祖父母が無職または月64時間未満の就労ですか？',
    helpText: '疾病等で保育できない場合を除く（減点項目）',
    inputType: 'radio',
    options: [
      { label: 'いいえ（該当しない）', value: 'adj_grandparent_no', points: 0 },
      { label: 'はい', value: 'adj_grandparent_yes', points: -10 },
    ],
  },
];

// ---------------------------------------------------------------------------
// エクスポート
// ---------------------------------------------------------------------------

export const koshigayaData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
