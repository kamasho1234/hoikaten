import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 平塚市 保育園入園 基本指数・調整指数データ
// ---------------------------------------------------------------------------
// 平塚市は「基本指数（父母それぞれ）＋ 調整指数」の加算方式。
// 就労は月あたりの勤務日数・1日あたりの勤務時間で指数を判定。
// 父母それぞれ最大20点。フルタイム共働きで40点が基本ライン。
// 出典: 平塚市保育所等の利用調整基準（令和7年度）
// ---------------------------------------------------------------------------

const municipality = {
  id: 'hiratsuka',
  name: '平塚市',
  slug: 'hiratsuka',
  prefecture: '神奈川県',
  maxBasePoints: 40, // 父母各20点
} as const;

// ---------------------------------------------------------------------------
// 基本指数の選択肢テンプレート
// ---------------------------------------------------------------------------

/** 就労 */
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月20日以上かつ1日8時間以上', value: `${prefix}_employment_20`, points: 20 },
  { label: '月20日以上かつ1日6時間以上', value: `${prefix}_employment_18`, points: 18 },
  { label: '月16日以上かつ1日6時間以上', value: `${prefix}_employment_16`, points: 16 },
  { label: '月16日以上かつ1日4時間以上', value: `${prefix}_employment_14`, points: 14 },
  { label: '月12日以上かつ1日4時間以上', value: `${prefix}_employment_12`, points: 12 },
  { label: '月64時間以上（上記にあてはまらない）', value: `${prefix}_employment_10`, points: 10 },
];

/** 疾病 */
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院中・常時臥床', value: `${prefix}_illness_20`, points: 20 },
  { label: '自宅療養（日常生活に支障あり）', value: `${prefix}_illness_16`, points: 16 },
  { label: '通院加療中', value: `${prefix}_illness_12`, points: 12 },
];

/** 障害 */
const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '身体1〜2級 / 愛の手帳1〜3度 / 精神1〜2級', value: `${prefix}_disability_20`, points: 20 },
  { label: '身体3級 / 精神3級', value: `${prefix}_disability_16`, points: 16 },
  { label: '身体4級以下 / その他', value: `${prefix}_disability_12`, points: 12 },
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
  { label: '出産前後', value: `${prefix}_childbirth_16`, points: 16 },
];

/** 就学・技能習得 */
const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '月20日以上かつ1日8時間以上', value: `${prefix}_education_20`, points: 20 },
  { label: '月20日以上かつ1日6時間以上', value: `${prefix}_education_18`, points: 18 },
  { label: '月16日以上かつ1日6時間以上', value: `${prefix}_education_16`, points: 16 },
  { label: '月16日以上かつ1日4時間以上', value: `${prefix}_education_14`, points: 14 },
  { label: '月12日以上かつ1日4時間以上', value: `${prefix}_education_12`, points: 12 },
  { label: '月64時間以上（上記にあてはまらない）', value: `${prefix}_education_10`, points: 10 },
];

/** 求職活動 */
const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動中', value: `${prefix}_jobseeking_6`, points: 6 },
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
      helpText: '月あたりの勤務日数と1日の勤務時間で判定されます',
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
      { label: 'はい', value: 'adj_single_parent_yes', points: 5 },
    ],
  },
  {
    id: 'adj_sibling_enrolled',
    category: 'adjustment',
    label: 'きょうだいが認可保育園に在園していますか？',
    helpText: 'きょうだいが在園中の施設がある場合',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_enrolled_no', points: 0 },
      { label: 'はい', value: 'adj_sibling_enrolled_yes', points: 3 },
    ],
  },
  {
    id: 'adj_simultaneous',
    category: 'adjustment',
    label: 'きょうだい同時申込ですか？',
    helpText: '2人以上のお子さんを同時に申し込む場合',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_simultaneous_no', points: 0 },
      { label: 'はい', value: 'adj_simultaneous_yes', points: 2 },
    ],
  },
  {
    id: 'adj_unlicensed_nursery',
    category: 'adjustment',
    label: '認可外保育施設に預けていますか？',
    helpText: '認可外保育施設に月ぎめで預けている場合',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unlicensed_nursery_no', points: 0 },
      { label: 'はい', value: 'adj_unlicensed_nursery_yes', points: 3 },
    ],
  },
  {
    id: 'adj_parental_leave',
    category: 'adjustment',
    label: '育児休業からの復帰予定ですか？',
    helpText: '育児休業取得後に復職予定の場合',
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
    id: 'adj_outside_city',
    category: 'adjustment',
    label: '平塚市外からの申込ですか？',
    helpText: '平塚市に住民登録がない場合は減点になります',
    inputType: 'radio',
    options: [
      { label: 'いいえ（平塚市民）', value: 'adj_outside_city_no', points: 0 },
      { label: 'はい（市外から申込）', value: 'adj_outside_city_yes', points: -10 },
    ],
  },
  {
    id: 'adj_relative_care',
    category: 'adjustment',
    label: '同居の親族が保育できる状態ですか？',
    helpText: '65歳未満の同居親族が保育可能な場合は減点になります',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_relative_care_no', points: 0 },
      { label: 'はい', value: 'adj_relative_care_yes', points: -3 },
    ],
  },
  {
    id: 'adj_transfer',
    category: 'adjustment',
    label: '転園の申込ですか？',
    helpText: '現在利用中の認可保育園から別の園への転園希望の場合',
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

export const hiratsukaData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
