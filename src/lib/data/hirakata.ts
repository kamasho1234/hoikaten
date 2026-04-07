import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 枚方市 保育園入園 ���用調整基準データ
// 出典: 枚方市「令和8年度 保育所（園）等利用の手引き（募集要項）」
// https://www.city.hirakata.osaka.jp/vod/0000033514.html
// ---------------------------------------------------------------------------
// 枚方市は「基本指数（父母それぞれ）＋ 調整指数」の加算方式。
// 就労は月あたりの総労働時間で判定。自営業（中心者・協力者）は別区分。
// 父母各最大100点（合計200点満点）。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'hirakata',
  name: '枚方市',
  slug: 'hirakata',
  prefecture: '大阪府',
  maxBasePoints: 200, // 父母各100点
} as const;

// ---------------------------------------------------------------------------
// 基本指数の選択肢テンプレート
// ---------------------------------------------------------------------------

/** 就労（雇用） */
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月160時間以上', value: `${prefix}_employment_100`, points: 100 },
  { label: '月140時間以上160時間未満', value: `${prefix}_employment_90`, points: 90 },
  { label: '月120時間以上140時間未満', value: `${prefix}_employment_80`, points: 80 },
  { label: '月96時間以上120時間未満', value: `${prefix}_employment_70`, points: 70 },
  { label: '月64時間以上96時間未満', value: `${prefix}_employment_60`, points: 60 },
];

/** 自営業（中心者） */
const selfEmployedOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_selfemployed_none`, points: 0 },
  { label: '月160時間以上', value: `${prefix}_selfemployed_100`, points: 100 },
  { label: '月140時間以上160時間未満', value: `${prefix}_selfemployed_90`, points: 90 },
  { label: '月120時間以上140時間未満', value: `${prefix}_selfemployed_80`, points: 80 },
  { label: '月96時間以上120時間未満', value: `${prefix}_selfemployed_70`, points: 70 },
  { label: '月64時間以上96時間未満', value: `${prefix}_selfemployed_60`, points: 60 },
];

/** 疾病 */
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院中・常時病臥', value: `${prefix}_illness_100`, points: 100 },
  { label: '自宅療養（安静が必要）', value: `${prefix}_illness_80`, points: 80 },
  { label: '通院加療中', value: `${prefix}_illness_60`, points: 60 },
];

/** 障害 */
const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '身体障害者手帳1・2級／療育手帳A／精神手帳1級', value: `${prefix}_disability_100`, points: 100 },
  { label: '身体障害者手帳3級／療育手帳B1／精神手帳2級', value: `${prefix}_disability_80`, points: 80 },
  { label: '上記以外の手帳所持', value: `${prefix}_disability_60`, points: 60 },
];

/** 介護・看護 */
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '常時介護（週5日以上）', value: `${prefix}_care_100`, points: 100 },
  { label: '週3日以上の介護', value: `${prefix}_care_80`, points: 80 },
  { label: 'その他の介護・看護', value: `${prefix}_care_60`, points: 60 },
];

/** 出産 */
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産前後（産前6週〜産後8週）', value: `${prefix}_childbirth_70`, points: 70 },
];

/** 就学 */
const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '月160時間以上の就学・職業訓練', value: `${prefix}_education_100`, points: 100 },
  { label: '月120時間以上160時間未満の就学', value: `${prefix}_education_80`, points: 80 },
  { label: '月64時間以上120時間未満の就学', value: `${prefix}_education_60`, points: 60 },
];

/** 求職活動 */
const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
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
      { label: 'はい', value: 'adj_single_parent_yes', points: 15 },
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
      { label: 'きょうだいが在園中の施設を第1希望にする', value: 'adj_sibling_same', points: 10 },
      { label: 'きょうだいと同時に申し込む', value: 'adj_sibling_simultaneous', points: 5 },
    ],
  },
  {
    id: 'adj_twins',
    category: 'adjustment',
    label: '多胎児（双子等）の同時申込ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_twins_no', points: 0 },
      { label: 'はい', value: 'adj_twins_yes', points: 10 },
    ],
  },
  {
    id: 'adj_single_assignment',
    category: 'adjustment',
    label: '��身赴任中ですか？',
    helpText: '保護者が単身赴任している場合に加点されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_assignment_no', points: 0 },
      { label: 'はい', value: 'adj_single_assignment_yes', points: 10 },
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
      { label: 'はい（月64時間以上）', value: 'adj_unlicensed_nursery_yes', points: 5 },
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
      { label: 'はい', value: 'adj_parental_leave_yes', points: 5 },
    ],
  },
  {
    id: 'adj_nursery_worker',
    category: 'adjustment',
    label: '保育士・保育教諭として勤務していますか？',
    helpText: '保育士等の資格を持ち、保育施設で勤務している（予定含む）場合です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_nursery_worker_no', points: 0 },
      { label: '枚方市内の施設に勤務（予定含む）', value: 'adj_nursery_worker_city', points: 10 },
      { label: '市外の施設に勤務（予定含む）', value: 'adj_nursery_worker_outside', points: 5 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護を受けていますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい', value: 'adj_welfare_yes', points: 5 },
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
      { label: 'はい', value: 'adj_grandparent_cohabit_yes', points: -5 },
    ],
  },
];

// ---------------------------------------------------------------------------
// エクスポート
// ---------------------------------------------------------------------------

export const hirakataData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
