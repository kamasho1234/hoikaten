import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 門真市 保育園入園 利用調整基準データ
// 出典: 門真市「令和8年度 保育施設等の利用申込みの手引き」
// https://www.city.kadoma.osaka.jp/kosodate/hoikuen/
// ---------------------------------------------------------------------------
// 門真市は「基本指数（父母それぞれ）＋ 調整指数」の加算方式。
// 就労は月あたりの総労働時間で判定。
// 父母各最大20点（合計40点満点）。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'kadoma',
  name: '門真市',
  slug: 'kadoma',
  prefecture: '大阪府',
  maxBasePoints: 40, // 父母各20点
} as const;

// ---------------------------------------------------------------------------
// 基本指数の選択肢テンプレート
// ---------------------------------------------------------------------------

/** 就労（雇用） */
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月160時間以上', value: `${prefix}_employment_20`, points: 20 },
  { label: '月140時間以上160時間未満', value: `${prefix}_employment_18`, points: 18 },
  { label: '月120時間以上140時間未満', value: `${prefix}_employment_16`, points: 16 },
  { label: '月96時間以上120時間未満', value: `${prefix}_employment_14`, points: 14 },
  { label: '月64時間以上96時間未満', value: `${prefix}_employment_12`, points: 12 },
];

/** 自営業（中心者） */
const selfEmployedOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_selfemployed_none`, points: 0 },
  { label: '月160時間以上', value: `${prefix}_selfemployed_20`, points: 20 },
  { label: '月140時間以上160時間未満', value: `${prefix}_selfemployed_18`, points: 18 },
  { label: '月120時間以上140時間未満', value: `${prefix}_selfemployed_16`, points: 16 },
  { label: '月96時間以上120時間未満', value: `${prefix}_selfemployed_14`, points: 14 },
  { label: '月64時間以上96時間未満', value: `${prefix}_selfemployed_12`, points: 12 },
];

/** 疾病 */
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院中・常時病臥', value: `${prefix}_illness_20`, points: 20 },
  { label: '自宅療養（安静が必要）', value: `${prefix}_illness_16`, points: 16 },
  { label: '通院加療中', value: `${prefix}_illness_12`, points: 12 },
];

/** 障害 */
const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '身体障害者手帳1・2級／療育手帳A／精神手帳1級', value: `${prefix}_disability_20`, points: 20 },
  { label: '身体障害者手帳3級／療育手帳B1／精神手帳2級', value: `${prefix}_disability_16`, points: 16 },
  { label: '上記以外の手帳所持', value: `${prefix}_disability_12`, points: 12 },
];

/** 介護・看護 */
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '常時介護（週5日以上）', value: `${prefix}_care_20`, points: 20 },
  { label: '週3日以上の介護', value: `${prefix}_care_16`, points: 16 },
  { label: 'その他の介護・看護', value: `${prefix}_care_12`, points: 12 },
];

/** 出産 */
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産前後（産前6週〜産後8週）', value: `${prefix}_childbirth_14`, points: 14 },
];

/** 就学 */
const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '月160時間以上の就学・職業訓練', value: `${prefix}_education_20`, points: 20 },
  { label: '月120時間以上160時間未満の就学', value: `${prefix}_education_16`, points: 16 },
  { label: '月64時間以上120時間未満の就学', value: `${prefix}_education_12`, points: 12 },
];

/** 求職活動 */
const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動中', value: `${prefix}_jobseeking_8`, points: 8 },
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
      { label: '仕事をしている（雇用）', value: `${prefix}_reason_employment`, points: 0 },
      { label: '自営業をしている', value: `${prefix}_reason_selfemployed`, points: 0 },
      { label: '病気の治療中', value: `${prefix}_reason_illness`, points: 0 },
      { label: '障害がある', value: `${prefix}_reason_disability`, points: 0 },
      { label: '家族の介護をしている', value: `${prefix}_reason_care`, points: 0 },
      { label: '出産の前後', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '学校に通っている／職業訓練中', value: `${prefix}_reason_education`, points: 0 },
      { label: '仕事を探している', value: `${prefix}_reason_jobseeking`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}はどのくらい働いていますか？（雇用）`,
      helpText: '月あたりの総労働時間で判定されます',
      inputType: 'radio',
      options: employmentOptions(prefix),
    },
    {
      id: `${prefix}_selfemployed`,
      category,
      label: `${parentLabel}の自営業の状況は？`,
      helpText: '月あたりの従事時間で判定されます',
      inputType: 'radio',
      options: selfEmployedOptions(prefix),
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
      helpText: '週あたりの介護日数を選んでください',
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
    label: 'ひとり親世帯ですか？',
    helpText: 'ひとり親世帯及びそれに準じる世帯の場合に加点されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい', value: 'adj_single_parent_yes', points: 5 },
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
      { label: 'きょうだいが在園中の施設を希望する', value: 'adj_sibling_same', points: 3 },
      { label: 'きょうだいと同時に申し込む', value: 'adj_sibling_simultaneous', points: 2 },
    ],
  },
  {
    id: 'adj_unlicensed_nursery',
    category: 'adjustment',
    label: '認可外保育施設等に預けていますか？',
    helpText: '月ぎめで認可外保育施設を利用している場合です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unlicensed_nursery_no', points: 0 },
      { label: 'はい', value: 'adj_unlicensed_nursery_yes', points: 3 },
    ],
  },
  {
    id: 'adj_parental_leave',
    category: 'adjustment',
    label: '育児休業から復帰予定ですか？',
    helpText: '育児休業を取得し、入園月に復帰する場合に加点されます',
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
    label: '門真市外にお住まいですか？',
    helpText: '市外からの申込の場合は減点となります',
    inputType: 'radio',
    options: [
      { label: 'いいえ（門真市内在住）', value: 'adj_outside_city_no', points: 0 },
      { label: 'はい（門真市外から申込）', value: 'adj_outside_city_yes', points: -10 },
    ],
  },
  {
    id: 'adj_grandparent_cohabit',
    category: 'adjustment',
    label: '65歳未満の同居の祖父母等に保育可能な方がいますか？',
    helpText: '同居の祖父母等が保育可能な場合は減点になります',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_grandparent_cohabit_no', points: 0 },
      { label: 'はい', value: 'adj_grandparent_cohabit_yes', points: -3 },
    ],
  },
  {
    id: 'adj_transfer',
    category: 'adjustment',
    label: '転園の申込ですか？',
    helpText: '現在認可保育園に在園中で別の園への転園を希望する場合です',
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

export const kadomaData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
