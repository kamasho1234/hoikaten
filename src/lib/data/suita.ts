import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 吹田市 保育園入園 利用調整基準データ
// 出典: 吹田市「令和8年度 利用調整基準表」
// https://www.city.suita.osaka.jp/kosodate/1018230/1018247/1022101/index.html
// ---------------------------------------------------------------------------
// 吹田市は「基本指数（父母それぞれ）＋ 調整指数」の加算方式。
// 就労は雇用型・自営中心者・自営協力者・内職で区分が異なる。
// 父母各最大40点（合計80点満点）。
// ひとり親世帯は基本指数に40点を加算。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'suita',
  name: '吹田市',
  slug: 'suita',
  prefecture: '大阪府',
  maxBasePoints: 80, // 父母各40点
} as const;

// ---------------------------------------------------------------------------
// 基本指数の選択肢テンプレート
// ---------------------------------------------------------------------------

/** 就労（雇用型勤務） */
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月160時間以上（雇用型）', value: `${prefix}_employment_40`, points: 40 },
  { label: '月140時間以上160時間未満（雇用型）', value: `${prefix}_employment_36`, points: 36 },
  { label: '月120時間以上140時間未満（雇用型）', value: `${prefix}_employment_32`, points: 32 },
  { label: '月80時間以上120時間未満（雇用型）', value: `${prefix}_employment_28`, points: 28 },
  { label: '月64時間以上80時間未満（雇用型）', value: `${prefix}_employment_24`, points: 24 },
  { label: '月160時間以上（自営中心者）', value: `${prefix}_employment_self_36`, points: 36 },
  { label: '月140時間以上160時間未満（自営中心者）', value: `${prefix}_employment_self_32`, points: 32 },
  { label: '月120時間以上140時間未満（自営中心者）', value: `${prefix}_employment_self_28`, points: 28 },
  { label: '月80時間以上120時間未満（自営中心者）', value: `${prefix}_employment_self_24`, points: 24 },
  { label: '月64時間以上80時間未満（自営中心者）', value: `${prefix}_employment_self_20`, points: 20 },
  { label: '月160時間以上（自営協力者）', value: `${prefix}_employment_assist_32`, points: 32 },
  { label: '月140時間以上160時間未満（自営協力者）', value: `${prefix}_employment_assist_28`, points: 28 },
  { label: '月120時間以上140時間未満（自営協力者）', value: `${prefix}_employment_assist_24`, points: 24 },
  { label: '月80時間以上120時間未満（自営協力者）', value: `${prefix}_employment_assist_20`, points: 20 },
  { label: '月64時間以上80時間未満（自営協力者）', value: `${prefix}_employment_assist_16`, points: 16 },
  { label: '内職（月120時間以上）', value: `${prefix}_employment_naishoku_20`, points: 20 },
  { label: '内職（月64時間以上120時間未満）', value: `${prefix}_employment_naishoku_16`, points: 16 },
];

/** 疾病 */
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '常時安静・入院を伴う病気療養', value: `${prefix}_illness_40`, points: 40 },
  { label: '安静・通院加療を要する', value: `${prefix}_illness_28`, points: 28 },
];

/** 障害 */
const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '重度（身体1・2級／療育A／精神1級）', value: `${prefix}_disability_40`, points: 40 },
  { label: '中度（身体3・4級／療育B1／精神2級）', value: `${prefix}_disability_28`, points: 28 },
  { label: '軽度（身体5・6級／療育B2／精神3級）', value: `${prefix}_disability_20`, points: 20 },
];

/** 介護・看護 */
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '同居親族の入院付き添い', value: `${prefix}_care_32`, points: 32 },
  { label: '寝たきり等の同居親族を常時看護', value: `${prefix}_care_28`, points: 28 },
  { label: '同居親族の看護・通院介助が常態', value: `${prefix}_care_20`, points: 20 },
  { label: '療育施設等への親子通園（週20時間以上）', value: `${prefix}_care_oyako_32`, points: 32 },
  { label: '療育施設等への親子通園（週16〜20時間）', value: `${prefix}_care_oyako_28`, points: 28 },
];

/** 出産 */
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産前後各8週間以内', value: `${prefix}_childbirth_24`, points: 24 },
];

/** 就学 */
const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '週30時間以上の就学', value: `${prefix}_education_32`, points: 32 },
  { label: '週20時間以上30時間未満の就学', value: `${prefix}_education_28`, points: 28 },
  { label: '週16時間以上20時間未満の就学', value: `${prefix}_education_24`, points: 24 },
];

/** 求職活動 */
const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動中', value: `${prefix}_jobseeking_12`, points: 12 },
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
      helpText: '雇用型・自営中心者・自営協力者・内職で点数が異なります',
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
      helpText: '介護・看護・親子通園の状況を選んでください',
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
    helpText: 'ひとり親家庭及びそれに準ずる世帯の場合に加点されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい', value: 'adj_single_parent_yes', points: 16 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護を受けていますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい', value: 'adj_welfare_yes', points: 2 },
    ],
  },
  {
    id: 'adj_single_assignment',
    category: 'adjustment',
    label: '単身赴任中ですか？',
    helpText: '父母のいずれかが長期間他の土地で就労等により常時家庭にいない場合',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_assignment_no', points: 0 },
      { label: 'はい', value: 'adj_single_assignment_yes', points: 8 },
    ],
  },
  {
    id: 'adj_unlicensed_nursery',
    category: 'adjustment',
    label: '認可外保育施設等に月64時間以上預けていますか？',
    helpText: '利用希望月の前月1日時点で認可外保育施設等に預けている場合',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unlicensed_nursery_no', points: 0 },
      { label: 'はい', value: 'adj_unlicensed_nursery_yes', points: 2 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: 'きょうだいの保育施設の状況は？',
    helpText: 'きょうだいが吹田市の保育所等を利用中または利用申込中の場合',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_sibling_no', points: 0 },
      { label: 'きょうだいが吹田市の保育所等を利用中・申込中', value: 'adj_sibling_yes', points: 8 },
    ],
  },
  {
    id: 'adj_children_count',
    category: 'adjustment',
    label: '申込児童以外に小学6年生までの児童はいますか？',
    inputType: 'radio',
    options: [
      { label: 'いない', value: 'adj_children_count_0', points: 0 },
      { label: '1人', value: 'adj_children_count_1', points: 1 },
      { label: '2人以上', value: 'adj_children_count_2', points: 2 },
    ],
  },
  {
    id: 'adj_twins',
    category: 'adjustment',
    label: '多胎児（双子等）の同時申込ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_twins_no', points: 0 },
      { label: '2人', value: 'adj_twins_2', points: 1 },
      { label: '3人以上', value: 'adj_twins_3', points: 2 },
    ],
  },
  {
    id: 'adj_small_nursery_grad',
    category: 'adjustment',
    label: '吹田市内の地域型保育事業の卒園児ですか？',
    helpText: '在籍期間が半年以上の卒園児の場合に加点されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_small_nursery_grad_no', points: 0 },
      { label: 'はい', value: 'adj_small_nursery_grad_yes', points: 16 },
    ],
  },
  {
    id: 'adj_parental_leave',
    category: 'adjustment',
    label: '育児休業から復職予定ですか？',
    helpText: '育児休業を取得中で入園月に復職する場合に加点されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_parental_leave_no', points: 0 },
      { label: 'はい', value: 'adj_parental_leave_yes', points: 2 },
    ],
  },
  {
    id: 'adj_nursery_worker',
    category: 'adjustment',
    label: '吹田市の保育所等に勤務する保育士・看護師ですか？',
    helpText: '吹田市の保育所・認定こども園・小規模保育事業等に勤務する保育士、保育教諭、看護師の場合',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_nursery_worker_no', points: 0 },
      { label: 'はい（保育士・保育教諭・看護師）', value: 'adj_nursery_worker_yes', points: 12 },
      { label: 'はい（幼稚園教諭）', value: 'adj_nursery_worker_kg', points: 4 },
    ],
  },
  {
    id: 'adj_self_employed_proof',
    category: 'adjustment',
    label: '自営業の勤務実態を証明する書類がありますか？',
    helpText: '開業届・営業許可証等の提出で加点されます（自営中心者のみ）',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_self_employed_proof_no', points: 0 },
      { label: 'はい', value: 'adj_self_employed_proof_yes', points: 4 },
    ],
  },
  {
    id: 'adj_home_work',
    category: 'adjustment',
    label: '居宅内で自営業をしていますか？',
    helpText: '危険物を取扱う職種を除き、居宅内で勤務している場合は減点',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_home_work_no', points: 0 },
      { label: 'はい', value: 'adj_home_work_yes', points: -2 },
    ],
  },
  {
    id: 'adj_grandparent_cohabit',
    category: 'adjustment',
    label: '65歳未満の同居祖父母がいますか？',
    helpText: '保育を必要とする事由の証明書類が提出されない場合は減点になります',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_grandparent_cohabit_no', points: 0 },
      { label: 'はい（証明書類の提出なし）', value: 'adj_grandparent_cohabit_yes', points: -4 },
    ],
  },
  {
    id: 'adj_duplicate_illness',
    category: 'adjustment',
    label: '基本要件以外に重篤な疾病・障害・介護の事情がありますか？',
    helpText: '基本要件が疾病・障害以外の保護者で、重篤な疾病や中度以上の障害、介護の必要がある場合',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_duplicate_illness_no', points: 0 },
      { label: 'はい', value: 'adj_duplicate_illness_yes', points: 4 },
    ],
  },
];

// ---------------------------------------------------------------------------
// エクスポート
// ---------------------------------------------------------------------------

export const suitaData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
