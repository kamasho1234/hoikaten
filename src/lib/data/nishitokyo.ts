import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 西東京市 保育園入園 基本指数・調整指数データ
// ---------------------------------------------------------------------------
// 西東京市は「基本指数（父母それぞれ）＋ 調整指数」の加算方式。
// 基本指数は就労日数・時間の組合せで判定。
// 父母それぞれ最大20点。フルタイム共働きで40点が基本ライン。
// 出典: 西東京市 令和7年度/令和8年度 保育施設入園案内
// ---------------------------------------------------------------------------

const municipality = {
  id: 'nishitokyo',
  name: '西東京市',
  slug: 'nishitokyo',
  prefecture: '東京都',
  maxBasePoints: 40, // 父母各20点
} as const;

// ---------------------------------------------------------------------------
// 基本指数の選択肢テンプレート
// ---------------------------------------------------------------------------

/** 就労 */
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月20日以上かつ週40時間以上', value: `${prefix}_employment_20`, points: 20 },
  { label: '月16日以上かつ週40時間未満', value: `${prefix}_employment_18`, points: 18 },
  { label: '月16日以上かつ週30時間以上', value: `${prefix}_employment_16`, points: 16 },
  { label: '月12日以上かつ週24時間以上', value: `${prefix}_employment_14`, points: 14 },
  { label: '月12日以上かつ週16時間以上', value: `${prefix}_employment_12`, points: 12 },
  { label: '月12日以上かつ週16時間未満', value: `${prefix}_employment_10`, points: 10 },
  { label: '内職（月64時間以上）', value: `${prefix}_employment_8`, points: 8 },
];

/** 疾病 */
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院1か月以上・常時臥床', value: `${prefix}_illness_20`, points: 20 },
  { label: '自宅療養（一般）', value: `${prefix}_illness_16`, points: 16 },
  { label: '通院加療', value: `${prefix}_illness_12`, points: 12 },
];

/** 障害 */
const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '身体1〜2級 / 愛の手帳1〜3度 / 精神1〜2級', value: `${prefix}_disability_20`, points: 20 },
  { label: '身体3級 / 愛の手帳4度 / 精神3級', value: `${prefix}_disability_16`, points: 16 },
  { label: '身体4級以下', value: `${prefix}_disability_12`, points: 12 },
];

/** 介護・看護 */
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '週40時間以上の介護・看護', value: `${prefix}_care_20`, points: 20 },
  { label: '週24時間以上の介護・看護', value: `${prefix}_care_16`, points: 16 },
  { label: '週16時間以上の介護・看護', value: `${prefix}_care_12`, points: 12 },
];

/** 出産 */
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産前後2か月', value: `${prefix}_childbirth_16`, points: 16 },
];

/** 就学 */
const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '週40時間以上の就学', value: `${prefix}_education_20`, points: 20 },
  { label: '週24時間以上の就学', value: `${prefix}_education_16`, points: 16 },
  { label: '週16時間以上の就学', value: `${prefix}_education_12`, points: 12 },
];

/** 求職活動 */
const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動中', value: `${prefix}_jobseeking_6`, points: 6 },
];

/** 災害 */
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '災害復旧', value: `${prefix}_disaster_20`, points: 20 },
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
      { label: '災害復旧', value: `${prefix}_reason_disaster`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}はどのくらい働いていますか？`,
      helpText: '月あたりの勤務日数と週あたりの労働時間で判定されます',
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
      helpText: '週あたりの介護・看護時間で判定されます',
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
    {
      id: `${prefix}_disaster`,
      category,
      label: `${parentLabel}は災害復旧にあたっていますか？`,
      inputType: 'radio',
      options: disasterOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// ---------------------------------------------------------------------------
// 調整指数の質問（世帯に係る調整点）
// ---------------------------------------------------------------------------

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい', value: 'adj_single_parent_yes', points: 6 },
    ],
  },
  {
    id: 'adj_sibling_enrolled',
    category: 'adjustment',
    label: 'きょうだいが認可保育園に在園中ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_enrolled_no', points: 0 },
      { label: 'はい', value: 'adj_sibling_enrolled_yes', points: 3 },
    ],
  },
  {
    id: 'adj_simultaneous',
    category: 'adjustment',
    label: '同時申込み（双子等）ですか？',
    helpText: '2人以上の児童を同時に申し込む場合',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_simultaneous_no', points: 0 },
      { label: 'はい', value: 'adj_simultaneous_yes', points: 2 },
    ],
  },
  {
    id: 'adj_unlicensed_nursery',
    category: 'adjustment',
    label: '認可外保育施設に月ぎめで預けていますか？',
    helpText: '月64時間以上の利用が条件です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unlicensed_nursery_no', points: 0 },
      { label: 'はい（月ぎめ・月64時間以上）', value: 'adj_unlicensed_nursery_yes', points: 4 },
    ],
  },
  {
    id: 'adj_parental_leave',
    category: 'adjustment',
    label: '育児休業から復帰予定ですか？',
    helpText: '入園月に育休から復帰する場合',
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
    id: 'adj_continuous_employment',
    category: 'adjustment',
    label: '父母ともに1年以上継続して就労していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_continuous_employment_no', points: 0 },
      { label: 'はい', value: 'adj_continuous_employment_yes', points: 1 },
    ],
  },
  {
    id: 'adj_outside_city',
    category: 'adjustment',
    label: '市外からの申込みですか？',
    helpText: '西東京市外に在住の場合は減点になります',
    inputType: 'radio',
    options: [
      { label: 'いいえ（西東京市在住）', value: 'adj_outside_city_no', points: 0 },
      { label: 'はい（市外在住）', value: 'adj_outside_city_yes', points: -10 },
    ],
  },
  {
    id: 'adj_relative_care',
    category: 'adjustment',
    label: '65歳未満の同居親族が保育可能ですか？',
    helpText: '保育できる親族が同居している場合は減点になります',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_relative_care_no', points: 0 },
      { label: 'はい', value: 'adj_relative_care_yes', points: -3 },
    ],
  },
  {
    id: 'adj_transfer',
    category: 'adjustment',
    label: '転園申込みですか？',
    helpText: '現在認可保育園に在園中で別の園への転園を希望する場合',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_transfer_no', points: 0 },
      { label: 'はい', value: 'adj_transfer_yes', points: -5 },
    ],
  },
  {
    id: 'adj_nursery_worker',
    category: 'adjustment',
    label: '保育士として市内保育施設に就労予定ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_nursery_worker_no', points: 0 },
      { label: 'はい', value: 'adj_nursery_worker_yes', points: 2 },
    ],
  },
];

// ---------------------------------------------------------------------------
// エクスポート
// ---------------------------------------------------------------------------

export const nishitokyoData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
