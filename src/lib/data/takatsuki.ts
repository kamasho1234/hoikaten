import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 高槻市 保育園入園 利用選考基準データ
// 出典: 高槻市「保育の利用選考基準（令和8年度版）」
// https://www.city.takatsuki.osaka.jp/soshiki/44/5300.html
// ---------------------------------------------------------------------------
// 高槻市は「基本点数（父母それぞれ）＋ 調整点数」の加算方式。
// 就労は月あたりの総労働時間（週あたり時間）で判定。
// 父母各最大30点（合計60点満点）。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'takatsuki',
  name: '高槻市',
  slug: 'takatsuki',
  prefecture: '大阪府',
  maxBasePoints: 60, // 父母各30点
} as const;

// ---------------------------------------------------------------------------
// 基本点数の選択肢テンプレート
// ---------------------------------------------------------------------------

/** 就労 */
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月160時間以上（週40時間以上）', value: `${prefix}_employment_30`, points: 30 },
  { label: '月140時間以上（週35時間以上）', value: `${prefix}_employment_27`, points: 27 },
  { label: '月120時間以上（週30時間以上）', value: `${prefix}_employment_24`, points: 24 },
  { label: '月96時間以上（週24時間以上）', value: `${prefix}_employment_21`, points: 21 },
  { label: '月64時間以上（週16時間以上）かつ週3日以上・1日4時間以上', value: `${prefix}_employment_18`, points: 18 },
  { label: '月64時間以上（週16時間以上）上記以外', value: `${prefix}_employment_16`, points: 16 },
  { label: '内職（収入年2万円以上）', value: `${prefix}_employment_13`, points: 13 },
];

/** 疾病 */
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院中', value: `${prefix}_illness_30`, points: 30 },
  { label: '常時病臥（自宅療養）', value: `${prefix}_illness_24`, points: 24 },
  { label: '通院加療（安静が必要）', value: `${prefix}_illness_18`, points: 18 },
];

/** 障害 */
const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '身体障害者手帳1・2級／療育手帳A／精神手帳1級', value: `${prefix}_disability_33`, points: 33 },
  { label: '上記以外の身体手帳1・2級／療育A／精神2級', value: `${prefix}_disability_24`, points: 24 },
  { label: '身体手帳3・4級／療育B／精神手帳3級', value: `${prefix}_disability_18`, points: 18 },
];

/** 介護・看護 */
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '常時介護（付添通院含む）', value: `${prefix}_care_27`, points: 27 },
  { label: '常時介護', value: `${prefix}_care_24`, points: 24 },
  { label: 'その他の介護・看護', value: `${prefix}_care_18`, points: 18 },
];

/** 出産 */
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産前後（産前6週〜産後8週）', value: `${prefix}_childbirth_18`, points: 18 },
];

/** 就学 */
const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '保育者業務（申込児以外の保育、週3日以上・1日4時間以上・月64時間以上）', value: `${prefix}_education_30`, points: 30 },
  { label: '就学・職業訓練（上記以外）', value: `${prefix}_education_24`, points: 24 },
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
      { label: '仕事をしている', value: `${prefix}_reason_employment`, points: 0 },
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
      label: `${parentLabel}はどのくらい働いていますか？`,
      helpText: '月あたりの総労働時間（週あたり時間）で判定されます',
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
      helpText: '介護・看護の状況を選んでください',
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
// 調整点数の質問
// ---------------------------------------------------------------------------

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親世帯ですか？',
    helpText: 'ひとり親世帯及び左記に準じる世帯の場合に加点されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい（就労・就学・求職での申込）', value: 'adj_single_parent_work', points: 35 },
      { label: 'はい（上記以外での申込）', value: 'adj_single_parent_other', points: 33 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: 'きょうだいの保育施設の状況は？',
    helpText: '多胎児以外のきょうだいが在園中の施設を第1希望にする場合',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_sibling_no', points: 0 },
      { label: 'きょうだいが在園中の施設を第1希望にする', value: 'adj_sibling_same', points: 3 },
      { label: 'きょうだいと同時に申し込む（多胎児以外）', value: 'adj_sibling_simultaneous', points: 2 },
    ],
  },
  {
    id: 'adj_twins',
    category: 'adjustment',
    label: '多胎児（双子等）の同時申込ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_twins_no', points: 0 },
      { label: 'はい', value: 'adj_twins_yes', points: 3 },
    ],
  },
  {
    id: 'adj_waiting',
    category: 'adjustment',
    label: '待機児童ですか？（過去に不承諾）',
    helpText: '過去の選考で不承諾になり待機している場合',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_waiting_no', points: 0 },
      { label: 'はい', value: 'adj_waiting_yes', points: 6 },
    ],
  },
  {
    id: 'adj_nursery_worker',
    category: 'adjustment',
    label: '保育士資格を持ち保育施設で勤務していますか？',
    helpText: '保育士の資格保持者で、開所時間が週30時間以上の施設に勤務する場合',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_nursery_worker_no', points: 0 },
      { label: '高槻市内の認可施設に勤務（予定含む）', value: 'adj_nursery_worker_city', points: 10 },
      { label: '市外の認可施設に勤務（予定含む）', value: 'adj_nursery_worker_outside', points: 3 },
    ],
  },
  {
    id: 'adj_single_assignment',
    category: 'adjustment',
    label: '単身赴任中ですか？',
    helpText: '世話の必要な保護者が単身赴任中の場合',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_assignment_no', points: 0 },
      { label: '海外に単身赴任中', value: 'adj_single_assignment_overseas', points: 8 },
      { label: '国内に単身赴任中', value: 'adj_single_assignment_domestic', points: 5 },
    ],
  },
  {
    id: 'adj_unlicensed_nursery',
    category: 'adjustment',
    label: '認可外保育施設等に預けていますか？',
    helpText: '常時保育施設に預けている場合（月48時間以上・週4日以上）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unlicensed_nursery_no', points: 0 },
      { label: '常時保育施設に預けている（週4日以上）', value: 'adj_unlicensed_nursery_full', points: 4 },
      { label: '一時保育に預けている（週1〜3日）', value: 'adj_unlicensed_nursery_part', points: 2 },
    ],
  },
  {
    id: 'adj_parental_leave',
    category: 'adjustment',
    label: '産休・育休から復帰予定ですか？',
    helpText: '産休・育休が終了し復職する場合に加点されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_parental_leave_no', points: 0 },
      { label: 'はい', value: 'adj_parental_leave_yes', points: 2 },
    ],
  },
  {
    id: 'adj_income',
    category: 'adjustment',
    label: '世帯の収入状況は？',
    helpText: '世帯の市民税額に応じて加点されます',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_income_no', points: 0 },
      { label: '世帯収入192万円以下', value: 'adj_income_192', points: 4 },
      { label: '世帯収入266万円以下', value: 'adj_income_266', points: 2 },
    ],
  },
  {
    id: 'adj_grandparent_cohabit',
    category: 'adjustment',
    label: '65歳未満の同居の祖父母がいますか？',
    helpText: '同居の祖父母等が保育可能な場合は減点になります',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_grandparent_cohabit_no', points: 0 },
      { label: 'はい', value: 'adj_grandparent_cohabit_yes', points: -2 },
    ],
  },
];

// ---------------------------------------------------------------------------
// エクスポート
// ---------------------------------------------------------------------------

export const takatsukiData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
