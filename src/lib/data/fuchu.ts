import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 府中市 保育園入園 基本指数・調整指数データ
// ---------------------------------------------------------------------------
// 府中市は「基本指数（父母それぞれ）＋ 調整指数」の加算方式。
// 就労は週あたりの労働時間で指数を判定。
// 父母それぞれ最大100点。フルタイム共働きで200点が基本ライン。
// 出典: 府中市保育所等の利用の調整に関する規則（令和7年11月28日改正）
// ---------------------------------------------------------------------------

const municipality = {
  id: 'fuchu',
  name: '府中市',
  slug: 'fuchu',
  prefecture: '東京都',
  maxBasePoints: 200, // 父母各100点
} as const;

// ---------------------------------------------------------------------------
// 基本指数の選択肢テンプレート
// ---------------------------------------------------------------------------

/** 就労（自営・内職以外） */
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '週40時間以上', value: `${prefix}_employment_100`, points: 100 },
  { label: '週32時間以上40時間未満', value: `${prefix}_employment_90`, points: 90 },
  { label: '週24時間以上32時間未満', value: `${prefix}_employment_80`, points: 80 },
  { label: '1日4時間以上・週3日以上（週24時間未満）', value: `${prefix}_employment_70`, points: 70 },
  { label: '月48時間以上（上記にあてはまらない）', value: `${prefix}_employment_60`, points: 60 },
];

/** 疾病 */
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院（28日以上）後3か月以上通院 / 常時臥床', value: `${prefix}_illness_100`, points: 100 },
  { label: '精神性疾患で週1日以上通院または生活に著しく支障', value: `${prefix}_illness_90a`, points: 90 },
  { label: '精神性疾患以外で家庭生活に著しく支障', value: `${prefix}_illness_90b`, points: 90 },
  { label: '精神性疾患で月2〜3日通院', value: `${prefix}_illness_80a`, points: 80 },
  { label: '精神性疾患以外で週3日以上通院', value: `${prefix}_illness_80b`, points: 80 },
  { label: '軽度精神性疾患', value: `${prefix}_illness_70`, points: 70 },
  { label: 'その他の傷病で保育が必要', value: `${prefix}_illness_60`, points: 60 },
];

/** 障害 */
const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '身体1〜2級 / 愛の手帳1〜2度 / 精神1〜2級', value: `${prefix}_disability_100`, points: 100 },
  { label: '身体3級（視覚・聴覚・体幹）/ 愛の手帳3度 / 精神3級', value: `${prefix}_disability_90`, points: 90 },
  { label: '身体3級（その他）', value: `${prefix}_disability_80`, points: 80 },
  { label: '身体4級（視覚・聴覚・体幹）/ 愛の手帳4度', value: `${prefix}_disability_70`, points: 70 },
  { label: '身体4級（その他）', value: `${prefix}_disability_60`, points: 60 },
];

/** 介護・看護 */
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '週40時間以上の付添介護・看護', value: `${prefix}_care_100`, points: 100 },
  { label: '週32時間以上40時間未満の付添介護・看護', value: `${prefix}_care_90`, points: 90 },
  { label: '週24時間以上32時間未満の付添介護・看護', value: `${prefix}_care_80`, points: 80 },
  { label: '1日4時間以上・週3日以上（週24時間未満）の介護・看護', value: `${prefix}_care_70`, points: 70 },
  { label: '月48時間以上の付添介護・看護', value: `${prefix}_care_60`, points: 60 },
];

/** 出産 */
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産月の前後2か月以内', value: `${prefix}_childbirth_80`, points: 80 },
];

/** 就学・技能習得 */
const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '週40時間以上の就学・技能習得', value: `${prefix}_education_100`, points: 100 },
  { label: '週32時間以上40時間未満', value: `${prefix}_education_90`, points: 90 },
  { label: '週24時間以上32時間未満', value: `${prefix}_education_80`, points: 80 },
  { label: '1日4時間以上・週3日以上（週24時間未満）', value: `${prefix}_education_70`, points: 70 },
  { label: '月48時間以上（上記にあてはまらない）', value: `${prefix}_education_60`, points: 60 },
];

/** 求職活動 */
const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動中（生計中心者・月48時間以上）', value: `${prefix}_jobseeking_60`, points: 60 },
  { label: '求職活動中（生計中心者以外・月48時間以上）', value: `${prefix}_jobseeking_50`, points: 50 },
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
      helpText: '週あたりの労働時間で判定されます',
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
      { label: 'はい', value: 'adj_single_parent_yes', points: 10 },
    ],
  },
  {
    id: 'adj_sibling_same',
    category: 'adjustment',
    label: 'きょうだいが利用中の施設に申し込みますか？',
    helpText: 'きょうだいが在園中または入園決定済みの施設への申込の場合',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_sibling_same_no', points: 0 },
      { label: 'きょうだいが利用中の施設に申し込む', value: 'adj_sibling_same_yes', points: 2 },
      { label: '申込児童が2人以上（同月入所）', value: 'adj_sibling_same_multi', points: 3 },
    ],
  },
  {
    id: 'adj_sibling_three',
    category: 'adjustment',
    label: 'きょうだいが3人以上いますか？',
    helpText: '申込児童と利用中の児童の合計が3人以上の場合',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_three_no', points: 0 },
      { label: 'はい', value: 'adj_sibling_three_yes', points: 1 },
    ],
  },
  {
    id: 'adj_unlicensed_nursery',
    category: 'adjustment',
    label: '認可外保育施設に預けていますか？',
    helpText: '認可外保育施設等に有償で月ぎめの保育を利用している場合',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unlicensed_nursery_no', points: 0 },
      { label: '3か月以上6か月未満利用', value: 'adj_unlicensed_nursery_3m', points: 2 },
      { label: '6か月以上利用', value: 'adj_unlicensed_nursery_6m', points: 3 },
    ],
  },
  {
    id: 'adj_parental_leave',
    category: 'adjustment',
    label: '育児休業後の再利用ですか？',
    helpText: '育児休業取得後1年以上経過してからの再申込みの場合',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_parental_leave_no', points: 0 },
      { label: 'はい', value: 'adj_parental_leave_yes', points: 10 },
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
    id: 'adj_nursery_worker',
    category: 'adjustment',
    label: '保育士等の資格を持ち保育施設で就労中（予定）ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_nursery_worker_no', points: 0 },
      { label: 'はい', value: 'adj_nursery_worker_yes', points: 1 },
    ],
  },
  {
    id: 'adj_grandparent_cohabit',
    category: 'adjustment',
    label: '祖父母と同一世帯ですか？',
    helpText: '祖父母と同居している場合は減点になることがあります',
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

export const fuchuData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
