import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 佐賀市 保育園入園 基本指数・調整指数データ
// 出典：令和8年度 佐賀市保育所等利用調整基準表
// https://www.city.saga.lg.jp/main/808.html
// ---------------------------------------------------------------------------

const municipality = {
  id: 'saga',
  name: '佐賀市',
  slug: 'saga',
  prefecture: '佐賀県',
  maxBasePoints: 40, // 父母各20点
} as const;

// ---------------------------------------------------------------------------
// 保護者ごとの基本指数の選択肢テンプレート
// ---------------------------------------------------------------------------

/** 就労 */
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月160時間以上', value: `${prefix}_employment_20`, points: 20 },
  { label: '月140時間以上160時間未満', value: `${prefix}_employment_18`, points: 18 },
  { label: '月120時間以上140時間未満', value: `${prefix}_employment_16`, points: 16 },
  { label: '月90時間以上120時間未満', value: `${prefix}_employment_12`, points: 12 },
  { label: '月64時間以上90時間未満', value: `${prefix}_employment_8`, points: 8 },
  { label: '採用予定（まだ働いていない）', value: `${prefix}_employment_offer`, points: 8 },
  { label: '自営業（挙証資料なし）', value: `${prefix}_employment_self_no_proof`, points: 6 },
];

/** 妊娠・産後 */
const pregnancyOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_pregnancy_none`, points: 0 },
  { label: '多胎妊娠（双子以上）', value: `${prefix}_pregnancy_multi`, points: 16 },
  { label: '妊娠中〜産後8週間', value: `${prefix}_pregnancy_normal`, points: 12 },
];

/** 病気・障害（診断書） */
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院中（1か月以上）または常時寝たきり', value: `${prefix}_illness_20`, points: 20 },
  { label: '通院治療中で常に安静が必要', value: `${prefix}_illness_16`, points: 16 },
  { label: '通院治療が必要で保育に支障がある', value: `${prefix}_illness_12`, points: 12 },
];

/** 障害（手帳） */
const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '身体手帳1-2級 / 精神手帳1級 / 療育手帳A', value: `${prefix}_disability_20`, points: 20 },
  { label: '身体手帳3級 / 精神手帳2級 / 療育手帳B1', value: `${prefix}_disability_16`, points: 16 },
  { label: '身体手帳4級以下 / 精神手帳3級 / 療育手帳B2', value: `${prefix}_disability_10`, points: 10 },
];

/** 同居親族の看護・介護 */
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '要介護4・5（常時介護が必要）', value: `${prefix}_care_20`, points: 20 },
  { label: '要介護3（ほぼ全面的な介助が必要）', value: `${prefix}_care_16`, points: 16 },
  { label: '要介護1・2（日常生活に介助が必要）', value: `${prefix}_care_12`, points: 12 },
  { label: '通院・通学の付き添い（月64時間以上）', value: `${prefix}_care_escort`, points: 10 },
];

/** 求職活動 */
const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動中または起業準備中', value: `${prefix}_jobseeking_6`, points: 6 },
];

/** 就学・職業訓練 */
const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '月160時間以上', value: `${prefix}_education_18`, points: 18 },
  { label: '月140時間以上160時間未満', value: `${prefix}_education_16`, points: 16 },
  { label: '月120時間以上140時間未満', value: `${prefix}_education_14`, points: 14 },
  { label: '月90時間以上120時間未満', value: `${prefix}_education_10`, points: 10 },
  { label: '月64時間以上90時間未満', value: `${prefix}_education_8`, points: 8 },
  { label: '通信制', value: `${prefix}_education_correspondence`, points: 6 },
];

/** 育児休業 */
const childcareLeaveOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childcareleave_none`, points: 0 },
  { label: '育休中（育休対象児以外の児童の申込み）', value: `${prefix}_childcareleave_10`, points: 10 },
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
      { label: '仕事をしている・採用予定', value: `${prefix}_reason_employment`, points: 0 },
      { label: '妊娠中・産後', value: `${prefix}_reason_pregnancy`, points: 0 },
      { label: '病気で治療中', value: `${prefix}_reason_illness`, points: 0 },
      { label: '障害がある（手帳所持）', value: `${prefix}_reason_disability`, points: 0 },
      { label: '家族の介護・看護をしている', value: `${prefix}_reason_care`, points: 0 },
      { label: '仕事を探している', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '学校に通っている・職業訓練中', value: `${prefix}_reason_education`, points: 0 },
      { label: '育児休業中', value: `${prefix}_reason_childcareleave`, points: 0 },
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
      id: `${prefix}_pregnancy`,
      category,
      label: `${parentLabel}の妊娠・産後の状況は？`,
      inputType: 'radio',
      options: pregnancyOptions(prefix),
    },
    {
      id: `${prefix}_illness`,
      category,
      label: `${parentLabel}の病気の状況は？`,
      helpText: '診断書による判定',
      inputType: 'radio',
      options: illnessOptions(prefix),
    },
    {
      id: `${prefix}_disability`,
      category,
      label: `${parentLabel}の障害の程度は？`,
      helpText: '障害者手帳・障害年金による判定',
      inputType: 'radio',
      options: disabilityOptions(prefix),
    },
    {
      id: `${prefix}_care`,
      category,
      label: `${parentLabel}はどのくらい介護・看護をしていますか？`,
      helpText: '同居親族の看護・介護が対象です',
      inputType: 'radio',
      options: careOptions(prefix),
    },
    {
      id: `${prefix}_jobseeking`,
      category,
      label: `${parentLabel}は求職活動をしていますか？`,
      inputType: 'radio',
      options: jobSeekingOptions(prefix),
    },
    {
      id: `${prefix}_education`,
      category,
      label: `${parentLabel}はどのくらい学校に通っていますか？`,
      helpText: '月あたりの通学・訓練時間を選んでください',
      inputType: 'radio',
      options: educationOptions(prefix),
    },
    {
      id: `${prefix}_childcareleave`,
      category,
      label: `${parentLabel}の育児休業の状況は？`,
      helpText: '育休対象児以外の児童の申込みの場合',
      inputType: 'radio',
      options: childcareLeaveOptions(prefix),
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
    helpText: 'ひとり親世帯には+5点が加算されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい（ひとり親世帯）', value: 'adj_single_parent_yes', points: 5 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: 'きょうだいが認可保育所等に在園していますか？',
    helpText: 'きょうだいが在園中の場合+3点が加算されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_no', points: 0 },
      { label: 'はい', value: 'adj_sibling_yes', points: 3 },
    ],
  },
  {
    id: 'adj_simultaneous',
    category: 'adjustment',
    label: 'きょうだいと同時に入園を申し込みますか？',
    helpText: '同時申込の場合+2点が加算されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_simultaneous_no', points: 0 },
      { label: 'はい', value: 'adj_simultaneous_yes', points: 2 },
    ],
  },
  {
    id: 'adj_unlicensed_nursery',
    category: 'adjustment',
    label: '認可外保育施設に在園していますか？',
    helpText: '認可外保育施設に在園中の場合+3点が加算されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unlicensed_nursery_no', points: 0 },
      { label: 'はい', value: 'adj_unlicensed_nursery_yes', points: 3 },
    ],
  },
  {
    id: 'adj_parental_leave_return',
    category: 'adjustment',
    label: '育児休業から復帰する予定ですか？',
    helpText: '入所月中に復帰する場合+2点が加算されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_parental_leave_return_no', points: 0 },
      { label: 'はい', value: 'adj_parental_leave_return_yes', points: 2 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護を受けていますか？',
    helpText: '生活保護受給世帯は+3点が加算されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい', value: 'adj_welfare_yes', points: 3 },
    ],
  },
  {
    id: 'adj_outside_city',
    category: 'adjustment',
    label: '佐賀市外に住んでいますか？',
    helpText: '市外からの申込は-10点の減点があります',
    inputType: 'radio',
    options: [
      { label: 'いいえ（佐賀市内に住んでいる）', value: 'adj_outside_city_no', points: 0 },
      { label: 'はい（佐賀市外に住んでいる）', value: 'adj_outside_city_yes', points: -10 },
    ],
  },
  {
    id: 'adj_grandparent',
    category: 'adjustment',
    label: '65歳未満の祖父母と同居していますか？',
    helpText: '同居の場合-3点の減点があります',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_grandparent_no', points: 0 },
      { label: 'はい', value: 'adj_grandparent_yes', points: -3 },
    ],
  },
  {
    id: 'adj_transfer',
    category: 'adjustment',
    label: '転園を希望していますか？',
    helpText: '転園希望の場合-5点の減点があります',
    inputType: 'radio',
    options: [
      { label: 'いいえ（新規入園）', value: 'adj_transfer_no', points: 0 },
      { label: 'はい（転園希望）', value: 'adj_transfer_yes', points: -5 },
    ],
  },
];

// ---------------------------------------------------------------------------
// エクスポート
// ---------------------------------------------------------------------------

export const sagaData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
