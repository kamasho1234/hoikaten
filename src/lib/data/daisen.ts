import type { MunicipalityData, Question } from '../types';

// -------------------------------------------------------------------------
// 大仙市 保育園入園 利用調整基準データ
// 出典: 大仙市「大仙市保育の利用調整基準」
// https://www.city.daisen.lg.jp/uploads/public/archive_0000000696_01/大仙市保育の利用調整基準.pdf
// -------------------------------------------------------------------------
// 大仙市は「1. 保育の必要性についての基準指数 ＋ 2. 世帯の状況等に関する調整指数」で決める。
// 原典は父母の基準指数をどう合わせるかを書いていないため、
// 全国で最も多い形（父母それぞれの指数を合算）に合わせて scoringMethod は 'sum' とした。
// 基準指数の最大は1人あたり10点。
//
// 原典で数値を出していない項目は選択肢にしていない。
// - 基準指数 No.9「その他」（3〜10）… 幅があり、状況に応じて決まる
// - 調整指数「虐待やDVのおそれがある等」（+1〜10）… 同上
//
// slug は daisen。大仙市の空き状況データ（src/lib/vacancy/daisen.json）が
// 同じ slug を使っているため、そちらに合わせている。
// -------------------------------------------------------------------------

const municipality = {
  id: 'daisen',
  name: '大仙市',
  slug: 'daisen',
  prefecture: '秋田県',
  maxBasePoints: 10,
  scoringMethod: 'sum',
} as const;

// No.1 就労（月48時間以上就労していることが条件）
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '居宅外労働で月実働140時間以上', value: `${prefix}_employment_0`, points: 10 },
  { label: '居宅外労働で月実働120時間以上140時間未満', value: `${prefix}_employment_1`, points: 9 },
  { label: '居宅外労働で月実働100時間以上120時間未満', value: `${prefix}_employment_2`, points: 8 },
  { label: '居宅外労働で月実働80時間以上100時間未満', value: `${prefix}_employment_3`, points: 7 },
  { label: '居宅外労働で月実働48時間以上80時間未満', value: `${prefix}_employment_4`, points: 6 },
  { label: '自営業（事業主）で月実働140時間以上', value: `${prefix}_employment_5`, points: 10 },
  { label: '自営業（事業主）で月実働120時間以上140時間未満', value: `${prefix}_employment_6`, points: 9 },
  { label: '自営業（事業主）で月実働100時間以上120時間未満', value: `${prefix}_employment_7`, points: 8 },
  { label: '自営業（事業主）で月実働80時間以上100時間未満', value: `${prefix}_employment_8`, points: 7 },
  { label: '自営業（事業主）で月実働48時間以上80時間未満', value: `${prefix}_employment_9`, points: 6 },
  { label: '自営業（協力者）で月実働140時間以上', value: `${prefix}_employment_10`, points: 9 },
  { label: '自営業（協力者）で月実働120時間以上140時間未満', value: `${prefix}_employment_11`, points: 8 },
  { label: '自営業（協力者）で月実働100時間以上120時間未満', value: `${prefix}_employment_12`, points: 7 },
  { label: '自営業（協力者）で月実働80時間以上100時間未満', value: `${prefix}_employment_13`, points: 6 },
  { label: '自営業（協力者）で月実働48時間以上80時間未満', value: `${prefix}_employment_14`, points: 5 },
  { label: '内職で月実働140時間以上', value: `${prefix}_employment_15`, points: 6 },
  { label: '内職で月実働100時間以上140時間未満', value: `${prefix}_employment_16`, points: 5 },
  { label: '内職で月実働48時間以上100時間未満', value: `${prefix}_employment_17`, points: 4 },
];

// No.2 妊娠・出産
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産（予定）日の前後2ヶ月', value: `${prefix}_childbirth_0`, points: 9 },
];

// No.3 疾病・障がい
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '概ね1ヵ月以上の入院', value: `${prefix}_illness_0`, points: 10 },
  { label: '疾病のため概ね1ヵ月以上の常時臥床', value: `${prefix}_illness_1`, points: 10 },
  { label: '身体障害者手帳1・2級／精神障害者保健福祉手帳／療育手帳A所持', value: `${prefix}_illness_2`, points: 10 },
  { label: '医師が長期加療（安静）を要すると診断', value: `${prefix}_illness_3`, points: 8 },
  { label: '身体障害者手帳3級／療育手帳B所持', value: `${prefix}_illness_4`, points: 7 },
  { label: '医師が概ね1ヵ月以上の加療（安静）を要すると診断', value: `${prefix}_illness_5`, points: 6 },
  { label: '比較的軽症だが定期的通院等を要する', value: `${prefix}_illness_6`, points: 5 },
  { label: '上記以外で必要と思われるもの（身体障害4級以下）', value: `${prefix}_illness_7`, points: 5 },
];

// No.4 病人の看護等
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '概ね1ヵ月以上、親族の入院・付添に当たっている', value: `${prefix}_care_0`, points: 10 },
  { label: '心身障がい児や同居の親族の介護通院等に当たっている', value: `${prefix}_care_1`, points: 10 },
  { label: '同居の親族の長期居宅療養等の介護に当たっている', value: `${prefix}_care_2`, points: 7 },
];

// No.5 災害の復旧
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '火災・風水害・地震等による被害の復旧に当たっている', value: `${prefix}_disaster_0`, points: 10 },
];

// No.6 求職活動
const jobseekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '勤務先がすでに内定している', value: `${prefix}_jobseeking_0`, points: 4 },
  { label: '求職活動を頻繁に行うため外出を常態としている', value: `${prefix}_jobseeking_1`, points: 3 },
];

// No.7 就学等
const schoolOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_school_none`, points: 0 },
  { label: '就学・技能習得のため通学等をしている', value: `${prefix}_school_0`, points: 7 },
];

// No.8 親不在
const absentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_absent_none`, points: 0 },
  { label: '死亡・離婚・行方不明・拘禁等の理由により不在', value: `${prefix}_absent_0`, points: 10 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    inputType: 'select',
    options: [
      { label: '就労', value: `${prefix}_reason_employment`, points: 0 },
      { label: '妊娠・出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '疾病・障がい', value: `${prefix}_reason_illness`, points: 0 },
      { label: '病人の看護等', value: `${prefix}_reason_care`, points: 0 },
      { label: '災害の復旧', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '求職活動', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '就学等', value: `${prefix}_reason_school`, points: 0 },
      { label: '親不在', value: `${prefix}_reason_absent`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の就労の状況は？`,
      helpText: '月48時間以上就労していることが条件です',
      inputType: 'radio',
      options: employmentOptions(prefix),
    },
    {
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}の出産の状況は？`,
      inputType: 'radio',
      options: childbirthOptions(prefix),
    },
    {
      id: `${prefix}_illness`,
      category,
      label: `${parentLabel}の疾病・障がいの状況は？`,
      inputType: 'radio',
      options: illnessOptions(prefix),
    },
    {
      id: `${prefix}_care`,
      category,
      label: `${parentLabel}の看護・介護の状況は？`,
      inputType: 'radio',
      options: careOptions(prefix),
    },
    {
      id: `${prefix}_disaster`,
      category,
      label: `${parentLabel}は災害の復旧に当たっていますか？`,
      inputType: 'radio',
      options: disasterOptions(prefix),
    },
    {
      id: `${prefix}_jobseeking`,
      category,
      label: `${parentLabel}は求職活動をしていますか？`,
      inputType: 'radio',
      options: jobseekingOptions(prefix),
    },
    {
      id: `${prefix}_school`,
      category,
      label: `${parentLabel}は就学・技能習得をしていますか？`,
      inputType: 'radio',
      options: schoolOptions(prefix),
    },
    {
      id: `${prefix}_absent`,
      category,
      label: `${parentLabel}は不在ですか？`,
      inputType: 'radio',
      options: absentOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// 2. 世帯の状況等に関する調整指数
const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親世帯ですか？',
    helpText: '父または母の死亡・離婚・行方不明・拘禁が対象です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_0', points: 0 },
      { label: 'はい（+2）', value: 'adj_single_parent_1', points: 2 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護法による被保護世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_0', points: 0 },
      { label: 'はい（+2）', value: 'adj_welfare_1', points: 2 },
    ],
  },
  {
    id: 'adj_unemployed',
    category: 'adjustment',
    label: '生計中心者の失業により、就労の必要性が高いですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unemployed_0', points: 0 },
      { label: 'はい（+2）', value: 'adj_unemployed_1', points: 2 },
    ],
  },
  {
    id: 'adj_leave_return',
    category: 'adjustment',
    label: '育児休業が終了し、職場復帰を予定していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_leave_return_0', points: 0 },
      { label: 'はい（+3）', value: 'adj_leave_return_1', points: 3 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: '兄弟姉妹の入所状況は？',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_sibling_0', points: 0 },
      { label: 'すでに兄姉が在園していて、同一の保育所等の利用を希望する（+3）', value: 'adj_sibling_1', points: 3 },
      { label: '兄弟姉妹が同時申請で、同一の保育所等の利用を希望する（+2）', value: 'adj_sibling_2', points: 2 },
    ],
  },
  {
    id: 'adj_third_child',
    category: 'adjustment',
    label: '養育している第3子以降の子どもが保育所等の利用を希望していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_third_child_0', points: 0 },
      { label: 'はい（+1）', value: 'adj_third_child_1', points: 1 },
    ],
  },
  {
    id: 'adj_graduate',
    category: 'adjustment',
    label: '小規模保育事業など地域型保育事業の卒園児童ですか？',
    helpText: '連携施設に関する経過措置です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_graduate_0', points: 0 },
      { label: 'はい（+3）', value: 'adj_graduate_1', points: 3 },
    ],
  },
  {
    id: 'adj_child_disability',
    category: 'adjustment',
    label: '障がい児保育を行う必要がありますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_child_disability_0', points: 0 },
      { label: 'はい（+1）', value: 'adj_child_disability_1', points: 1 },
    ],
  },
  {
    id: 'adj_tanshin',
    category: 'adjustment',
    label: '単身赴任等により保護者の一方が長期不在ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_tanshin_0', points: 0 },
      { label: 'はい（+1）', value: 'adj_tanshin_1', points: 1 },
    ],
  },
  {
    id: 'adj_nursery_staff',
    category: 'adjustment',
    label: '保護者が市内の保育施設で保育業務に就くことが確定していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_nursery_staff_0', points: 0 },
      { label: 'はい（+4）', value: 'adj_nursery_staff_1', points: 4 },
    ],
  },
  {
    id: 'adj_work_days',
    category: 'adjustment',
    label: '月の平均的な就労日数が15日以下ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_work_days_0', points: 0 },
      { label: 'はい（−1）', value: 'adj_work_days_1', points: -1 },
    ],
  },
  {
    id: 'adj_grandparent',
    category: 'adjustment',
    label: '同居の祖父母が保育に協力できますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ・同居していない', value: 'adj_grandparent_0', points: 0 },
      { label: '65歳〜69歳の祖父母が協力可能（−1）', value: 'adj_grandparent_1', points: -1 },
      { label: '60歳〜64歳の祖父母が協力可能（−2）', value: 'adj_grandparent_2', points: -2 },
    ],
  },
  {
    id: 'adj_sibling_home',
    category: 'adjustment',
    label: '兄弟姉妹を家庭または別居の祖父母等が保育していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_home_0', points: 0 },
      { label: 'はい（−1）', value: 'adj_sibling_home_1', points: -1 },
    ],
  },
  {
    id: 'adj_fee_delinquent',
    category: 'adjustment',
    label: '申込み時において保育料の滞納がありますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_fee_delinquent_0', points: 0 },
      { label: 'はい（−1）', value: 'adj_fee_delinquent_1', points: -1 },
    ],
  },
];

export const daisenData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
