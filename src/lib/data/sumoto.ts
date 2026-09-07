import type { MunicipalityData, Question } from '../types';

// -------------------------------------------------------------------------
// 洲本市 保育園入園 利用調整基準データ
// 出典: 洲本市「令和8年度 洲本市保育施設等の利用調整基準」
// https://www.city.sumoto.lg.jp/uploaded/attachment/19238.pdf
// -------------------------------------------------------------------------
// 洲本市は原典の冒頭に手順が書かれている。
//   1. 「基本指数」と「調整指数」に応じた指数を合計し、
//      合計指数の高い世帯の児童から優先順位を設定する。
//   2. 父母の保育を必要とする事由・状況に応じて基本指数を算出し、その合算を基本指数とする。
//   3. 父母が複数の事由に該当する場合は、それぞれ指数の高い事由により算出する。
//   4. ひとり親世帯については、当該ひとり親の指数と100点との合算を基本指数とする。
// 2により scoringMethod は 'sum'。基本指数の最大は1人あたり100点。
// 4のひとり親は+100の加点として表せるため、調整の設問として持たせている。
//
// 原典で数値を出していない項目は選択肢にしていない。
// - 基本指数「特例・その他」（※、児童・世帯の状況に応じて別途判断）
// - 調整指数「市長が特に必要と認める場合」（※）
// - 調整指数「年度途中からの利用の場合」（利用しない月数に「−1」を乗じた数）
//   … 月数で決まるため選択肢では表せない
//
// 調整指数「受託申し込みで、転入予定ではない（確認できない）場合」（−20）は、
// 実質的に選考の対象から外すための値なので入れていない。
// -------------------------------------------------------------------------

const municipality = {
  id: 'sumoto',
  name: '洲本市',
  slug: 'sumoto',
  prefecture: '兵庫県',
  maxBasePoints: 100,
  scoringMethod: 'sum',
} as const;

// 就労
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '外勤：月20日以上かつ1日8時間以上', value: `${prefix}_employment_0`, points: 100 },
  { label: '外勤：月20日以上かつ1日6時間以上', value: `${prefix}_employment_1`, points: 95 },
  { label: '外勤：月16日以上かつ1日8時間以上', value: `${prefix}_employment_2`, points: 95 },
  { label: '外勤：月16日以上かつ1日6時間以上', value: `${prefix}_employment_3`, points: 90 },
  { label: '外勤：月20日以上かつ1日4時間以上', value: `${prefix}_employment_4`, points: 85 },
  { label: '外勤：月20日以上かつ月64時間以上', value: `${prefix}_employment_5`, points: 80 },
  { label: '外勤：月16日以上かつ1日4時間以上', value: `${prefix}_employment_6`, points: 70 },
  { label: '外勤：その他で月64時間以上', value: `${prefix}_employment_7`, points: 70 },
  { label: '自営（中心者）：月20日以上かつ1日8時間以上', value: `${prefix}_employment_8`, points: 100 },
  { label: '自営（中心者）：月20日以上かつ1日6時間以上', value: `${prefix}_employment_9`, points: 95 },
  { label: '自営（中心者）：月16日以上かつ1日8時間以上', value: `${prefix}_employment_10`, points: 95 },
  { label: '自営（中心者）：月16日以上かつ1日6時間以上', value: `${prefix}_employment_11`, points: 90 },
  { label: '自営（中心者）：月20日以上かつ1日4時間以上', value: `${prefix}_employment_12`, points: 85 },
  { label: '自営（中心者）：月20日以上かつ月64時間以上', value: `${prefix}_employment_13`, points: 80 },
  { label: '自営（中心者）：月16日以上かつ1日4時間以上', value: `${prefix}_employment_14`, points: 70 },
  { label: '自営（中心者）：その他で月64時間以上', value: `${prefix}_employment_15`, points: 70 },
  { label: '自営（協力者）：月20日以上かつ1日8時間以上', value: `${prefix}_employment_16`, points: 80 },
  { label: '自営（協力者）：月20日以上かつ1日6時間以上', value: `${prefix}_employment_17`, points: 75 },
  { label: '自営（協力者）：月16日以上かつ1日8時間以上', value: `${prefix}_employment_18`, points: 75 },
  { label: '自営（協力者）：月16日以上かつ1日6時間以上', value: `${prefix}_employment_19`, points: 70 },
  { label: '自営（協力者）：月20日以上かつ1日4時間以上', value: `${prefix}_employment_20`, points: 65 },
  { label: '自営（協力者）：月20日以上かつ月64時間以上', value: `${prefix}_employment_21`, points: 60 },
  { label: '自営（協力者）：月16日以上かつ1日4時間以上', value: `${prefix}_employment_22`, points: 50 },
  { label: '自営（協力者）：その他で月64時間以上', value: `${prefix}_employment_23`, points: 50 },
  { label: '内職：月20日以上かつ1日8時間以上', value: `${prefix}_employment_24`, points: 60 },
  { label: '内職：月20日以上かつ1日6時間以上', value: `${prefix}_employment_25`, points: 55 },
  { label: '内職：月16日以上かつ1日8時間以上', value: `${prefix}_employment_26`, points: 55 },
  { label: '内職：月20日以上かつ1日4時間以上', value: `${prefix}_employment_27`, points: 50 },
  { label: '内職：月16日以上かつ1日6時間以上', value: `${prefix}_employment_28`, points: 50 },
  { label: '内職：月20日以上かつ月64時間以上', value: `${prefix}_employment_29`, points: 45 },
  { label: '内職：月16日以上かつ1日4時間以上', value: `${prefix}_employment_30`, points: 40 },
  { label: '内職：その他で月64時間以上', value: `${prefix}_employment_31`, points: 40 },
];

// 妊娠・出産
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '切迫流産等で要安静と診断', value: `${prefix}_childbirth_0`, points: 100 },
  { label: '産前2か月・産後2か月', value: `${prefix}_childbirth_1`, points: 70 },
  { label: '産後2か月以後', value: `${prefix}_childbirth_2`, points: 40 },
];

// 疾病・障害
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院または病臥等により常時保育が困難', value: `${prefix}_illness_0`, points: 100 },
  { label: '身体障害者手帳1・2級／精神障害者保健福祉手帳1・2級／療育手帳A判定で保育が困難', value: `${prefix}_illness_1`, points: 90 },
  { label: '通院加療を行い、常時安静が必要で保育が困難', value: `${prefix}_illness_2`, points: 70 },
  { label: '身体障害者手帳3・4級／療育手帳B1判定で保育が困難', value: `${prefix}_illness_3`, points: 70 },
  { label: '疾病等により、保育に支障がある', value: `${prefix}_illness_4`, points: 50 },
  { label: '身体障害者手帳／精神障害者保健福祉手帳3級／療育手帳の交付を受けており保育が困難', value: `${prefix}_illness_5`, points: 50 },
];

// 介護・看護
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '入院や寝たきりの同居親族を常時介護・看護する必要がある', value: `${prefix}_care_0`, points: 80 },
  { label: '病人や障害者の入院・通院・通所の付き添い等により保育が困難', value: `${prefix}_care_1`, points: 60 },
  { label: '介護・看護等により、保育に支障がある', value: `${prefix}_care_2`, points: 50 },
];

// 災害復旧
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '災害の復旧に常時あたっている', value: `${prefix}_disaster_0`, points: 100 },
];

// 求職活動
const jobseekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動', value: `${prefix}_jobseeking_0`, points: 30 },
];

// 就学
const schoolOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_school_none`, points: 0 },
  { label: '月120時間以上', value: `${prefix}_school_0`, points: 80 },
  { label: '月64時間以上', value: `${prefix}_school_1`, points: 60 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: '父母の基本指数を合算します。複数の事由に該当する場合は、それぞれ指数の高い事由で算出します',
    inputType: 'select',
    options: [
      { label: '就労', value: `${prefix}_reason_employment`, points: 0 },
      { label: '妊娠・出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '疾病・障害', value: `${prefix}_reason_illness`, points: 0 },
      { label: '介護・看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '災害復旧', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '求職活動', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '就学', value: `${prefix}_reason_school`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の就労の状況は？`,
      helpText: '就労時間数は休憩時間を含みます',
      inputType: 'radio',
      options: employmentOptions(prefix),
    },
    {
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}の妊娠・出産の状況は？`,
      inputType: 'radio',
      options: childbirthOptions(prefix),
    },
    {
      id: `${prefix}_illness`,
      category,
      label: `${parentLabel}の疾病・障害の状況は？`,
      inputType: 'radio',
      options: illnessOptions(prefix),
    },
    {
      id: `${prefix}_care`,
      category,
      label: `${parentLabel}の介護・看護の状況は？`,
      inputType: 'radio',
      options: careOptions(prefix),
    },
    {
      id: `${prefix}_disaster`,
      category,
      label: `${parentLabel}は災害の復旧にあたっていますか？`,
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
      label: `${parentLabel}の就学の状況は？`,
      inputType: 'radio',
      options: schoolOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// 【調整指数】
const adjustmentQuestions: Question[] = [
  {
    id: 'adj_household',
    category: 'adjustment',
    label: '世帯の状況は？',
    helpText: 'ひとり親世帯は、原典の「当該ひとり親の指数と100点との合算を基本指数とする」により+100として扱います',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_household_0', points: 0 },
      { label: 'ひとり親世帯（+100）', value: 'adj_household_1', points: 100 },
      { label: '両親の死亡・離別および行方不明により父母がいない（+30）', value: 'adj_household_2', points: 30 },
    ],
  },
  {
    id: 'adj_single_parent_bonus',
    category: 'adjustment',
    label: 'ひとり親世帯としての加点（調整指数）',
    helpText: '調整指数の表にある「ひとり親世帯 20」です。上の基本指数の+100とは別に加算されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_bonus_0', points: 0 },
      { label: 'はい（+20）', value: 'adj_single_parent_bonus_1', points: 20 },
    ],
  },
  {
    id: 'adj_tanshin',
    category: 'adjustment',
    label: '父または母が単身赴任していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_tanshin_0', points: 0 },
      { label: '国外への単身赴任（+8）', value: 'adj_tanshin_1', points: 8 },
      { label: '国内への単身赴任（+6）', value: 'adj_tanshin_2', points: 6 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: '兄弟姉妹の状況は？',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_sibling_0', points: 0 },
      { label: '兄弟姉妹が在籍している施設への入所希望（+20）', value: 'adj_sibling_1', points: 20 },
      { label: '兄弟姉妹が同時に入所を申し込み、同施設への入所を希望（+5）', value: 'adj_sibling_2', points: 5 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯で、就労により自立支援が見込まれますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_0', points: 0 },
      { label: 'はい（+10）', value: 'adj_welfare_1', points: 10 },
    ],
  },
  {
    id: 'adj_leave_return',
    category: 'adjustment',
    label: '父または母が産前産後休暇・育児休業終了により復職しますか？',
    helpText: '4月入所に限ります',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_leave_return_0', points: 0 },
      { label: 'はい（+3）', value: 'adj_leave_return_1', points: 3 },
    ],
  },
  {
    id: 'adj_nursery_staff',
    category: 'adjustment',
    label: '保護者が保育士・保育教諭として市内の認可保育施設に勤務（または勤務予定）ですか？',
    helpText: '世帯につき1回の加算です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_nursery_staff_0', points: 0 },
      { label: 'はい（+30）', value: 'adj_nursery_staff_1', points: 30 },
    ],
  },
  {
    id: 'adj_parent_disability',
    category: 'adjustment',
    label: '父母等の保護者が障害者手帳を所有していますか？',
    helpText: '障害を事由とする利用の場合を除きます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_parent_disability_0', points: 0 },
      { label: 'はい（+2）', value: 'adj_parent_disability_1', points: 2 },
    ],
  },
  {
    id: 'adj_multiple_birth',
    category: 'adjustment',
    label: '多胎児を妊娠していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_multiple_birth_0', points: 0 },
      { label: 'はい（+3）', value: 'adj_multiple_birth_1', points: 3 },
    ],
  },
  {
    id: 'adj_correspondence',
    category: 'adjustment',
    label: '就学で通信制の学校ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_correspondence_0', points: 0 },
      { label: 'はい（−5）', value: 'adj_correspondence_1', points: -5 },
    ],
  },
];

export const sumotoData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
