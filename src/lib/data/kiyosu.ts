import type { MunicipalityData, Question } from '../types';

// -------------------------------------------------------------------------
// 清須市 保育園入園 利用調整基準データ
// 出典: 清須市「清須市保育園等入園基準指数表（令和9年度当初入園調整から適用）」
// https://www.city.kiyosu.aichi.jp/kosodate/hoiku/hoikuen.files/shisuhyo260807.pdf
// -------------------------------------------------------------------------
// 清須市は「基本指数（父母それぞれ算出し、低いほうを算定対象とする）＋ 調整指数」の合計で決める。
// 原典の注記「父母それぞれの指数の低い方を算定対象として適用する」により scoringMethod は 'min'。
// 基本指数の最大は20点（No.1 月20日以上かつ8時間以上の就労、No.18 入院、No.22 心身障がい）。
//
// 原典で数値を出していない項目は選択肢にしていない。
// - No.17 特例「児童福祉の観点から、特に保育に欠ける緊急度が高いと判断した場合」（※）
// - No.18 特例「災害の復旧にあたっている場合」（※）
//   どちらも「要件の内容、状況によって優先度を判断する」とあり、点数が定まらない。
// 自営業協力者・農業協力者（No.13、2点減点）と内職（No.14、5点減点）は、
// 就労の区分ごとに引く額が違うため、選択肢を分けて持たせている。
// -------------------------------------------------------------------------

const municipality = {
  id: 'kiyosu',
  name: '清須市',
  slug: 'kiyosu',
  prefecture: '愛知県',
  maxBasePoints: 20,
  scoringMethod: 'min',
} as const;

// No.1〜12 就労（被雇用者・自営業中心者・農業中心者）
// No.13 自営業協力者・農業協力者は No.1〜12 より2点減点
// No.14 内職は No.1〜12 より5点減点（3歳児以上）
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月20日以上（週5日以上）かつ1日8時間以上（週40時間以上）', value: `${prefix}_employment_0`, points: 20 },
  { label: '月20日以上（週5日以上）かつ1日7時間以上（週35時間以上）', value: `${prefix}_employment_1`, points: 19 },
  { label: '月20日以上（週5日以上）かつ1日6時間以上（週30時間以上）', value: `${prefix}_employment_2`, points: 18 },
  { label: '月16日以上（週4日以上）かつ1日8時間以上（週32時間以上）', value: `${prefix}_employment_3`, points: 18 },
  { label: '月16日以上（週4日以上）かつ1日7時間以上（週28時間以上）', value: `${prefix}_employment_4`, points: 17 },
  { label: '月20日以上（週5日以上）かつ1日5時間以上（週25時間以上）', value: `${prefix}_employment_5`, points: 16 },
  { label: '月16日以上（週4日以上）かつ1日6時間以上（週24時間以上）', value: `${prefix}_employment_6`, points: 15 },
  { label: '月12日以上（週3日以上）かつ1日8時間以上（週24時間以上）', value: `${prefix}_employment_7`, points: 15 },
  { label: '月12日以上（週3日以上）かつ1日7時間以上（週21時間以上）', value: `${prefix}_employment_8`, points: 14 },
  { label: '月16日以上（週4日以上）かつ1日5時間以上（週20時間以上）', value: `${prefix}_employment_9`, points: 13 },
  { label: '月12日以上（週3日以上）かつ1日6時間以上（週18時間以上）', value: `${prefix}_employment_10`, points: 12 },
  { label: '上記以外で月60時間以上の就労を常態としている', value: `${prefix}_employment_11`, points: 10 },
  { label: '自営業協力者・農業協力者（上記の指数から2点減点）', value: `${prefix}_employment_12`, points: 8 },
  { label: '内職（3歳児以上。上記の指数から5点減点）', value: `${prefix}_employment_13`, points: 5 },
];

// No.15〜16 求職活動（起業準備活動）のために昼間外出を常態としている場合（最長90日間）
const jobseekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動中で、生計中心者である', value: `${prefix}_jobseeking_0`, points: 6 },
  { label: '求職活動中（生計中心者以外）', value: `${prefix}_jobseeking_1`, points: 4 },
];

// No.17 出産（産前3ヶ月の月初から産後2ヶ月の月末まで）
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産の前後で保育が必要（産前3ヶ月の月初から産後2ヶ月の月末まで）', value: `${prefix}_childbirth_0`, points: 16 },
];

// No.18〜24 疾病・負傷／心身障がい
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '概ね1ヶ月以上の入院', value: `${prefix}_illness_0`, points: 20 },
  { label: '身体障害者手帳1・2級／療育手帳A判定／精神障害者保健福祉手帳1・2級／要介護4・5級', value: `${prefix}_illness_1`, points: 20 },
  { label: '身体障害者手帳3級／療育手帳B判定／精神障害者保健福祉手帳3級／要介護3級', value: `${prefix}_illness_2`, points: 17 },
  { label: '身体障害者手帳4級以下／療育手帳C判定／要介護1・2級', value: `${prefix}_illness_3`, points: 14 },
  { label: '居宅内で概ね1ヶ月以上の常時臥床', value: `${prefix}_illness_4`, points: 18 },
  { label: '週3日以上かつ概ね1ヶ月以上の通院が必要', value: `${prefix}_illness_5`, points: 12 },
  { label: '概ね1ヶ月以上の一般療養', value: `${prefix}_illness_6`, points: 10 },
];

// No.25〜31 同居親族の介護・看護
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '重度（身1・2級/療育A/精1・2級/要介護4・5級）の同居親族を1日5時間以上、週5日以上介護', value: `${prefix}_care_0`, points: 20 },
  { label: '重度の同居親族を1日5時間以上、週4日以上介護', value: `${prefix}_care_1`, points: 18 },
  { label: '重度の同居親族を1日5時間以上、週3日以上介護', value: `${prefix}_care_2`, points: 16 },
  { label: '中度（身3・4級/療育B/精3級/要介護3級）の同居親族を1日5時間以上、週5日以上介護', value: `${prefix}_care_3`, points: 18 },
  { label: '中度の同居親族を1日5時間以上、週4日以上介護', value: `${prefix}_care_4`, points: 16 },
  { label: '中度の同居親族を1日5時間以上、週3日以上介護', value: `${prefix}_care_5`, points: 14 },
  { label: '上記以外の同居親族を週3日以上かつ1日5時間以上介護・看護', value: `${prefix}_care_6`, points: 12 },
];

// No.32〜43 就学技能習得
const schoolOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_school_none`, points: 0 },
  { label: '月20日以上（週5日以上）かつ1日8時間以上（週40時間以上）', value: `${prefix}_school_0`, points: 18 },
  { label: '月20日以上（週5日以上）かつ1日7時間以上（週35時間以上）', value: `${prefix}_school_1`, points: 17 },
  { label: '月20日以上（週5日以上）かつ1日6時間以上（週30時間以上）', value: `${prefix}_school_2`, points: 16 },
  { label: '月16日以上（週4日以上）かつ1日8時間以上（週32時間以上）', value: `${prefix}_school_3`, points: 16 },
  { label: '月16日以上（週4日以上）かつ1日7時間以上（週28時間以上）', value: `${prefix}_school_4`, points: 15 },
  { label: '月20日以上（週5日以上）かつ1日5時間以上（週25時間以上）', value: `${prefix}_school_5`, points: 14 },
  { label: '月16日以上（週4日以上）かつ1日6時間以上（週24時間以上）', value: `${prefix}_school_6`, points: 13 },
  { label: '月12日以上（週3日以上）かつ1日8時間以上（週24時間以上）', value: `${prefix}_school_7`, points: 13 },
  { label: '月12日以上（週3日以上）かつ1日7時間以上（週21時間以上）', value: `${prefix}_school_8`, points: 12 },
  { label: '月16日以上（週4日以上）かつ1日5時間以上（週20時間以上）', value: `${prefix}_school_9`, points: 11 },
  { label: '月12日以上（週3日以上）かつ1日6時間以上（週18時間以上）', value: `${prefix}_school_10`, points: 10 },
  { label: '上記以外で月60時間以上の就学技能習得を常態としている', value: `${prefix}_school_11`, points: 8 },
];

// No.44 育児休業中（3歳児以上）
const parentalLeaveOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_parental_leave_none`, points: 0 },
  { label: '育児休業中（3歳児以上）', value: `${prefix}_parental_leave_0`, points: 1 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: '清須市は父母それぞれの基本指数のうち、低いほうを算定対象にします',
    inputType: 'select',
    options: [
      { label: '就労', value: `${prefix}_reason_employment`, points: 0 },
      { label: '求職活動', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '疾病・負傷・心身障がい', value: `${prefix}_reason_illness`, points: 0 },
      { label: '同居親族の介護・看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '就学技能習得', value: `${prefix}_reason_school`, points: 0 },
      { label: '育児休業', value: `${prefix}_reason_parental_leave`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の就労の状況は？`,
      helpText: '就労時間には休憩時間を含みます。時間外労働時間は含みません',
      inputType: 'radio',
      options: employmentOptions(prefix),
    },
    {
      id: `${prefix}_jobseeking`,
      category,
      label: `${parentLabel}は求職活動をしていますか？`,
      helpText: '求職活動（起業準備活動）のために昼間外出を常態としている場合。最長90日間',
      inputType: 'radio',
      options: jobseekingOptions(prefix),
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
      label: `${parentLabel}の疾病・負傷・心身障がいの状況は？`,
      inputType: 'radio',
      options: illnessOptions(prefix),
    },
    {
      id: `${prefix}_care`,
      category,
      label: `${parentLabel}の同居親族の介護・看護の状況は？`,
      inputType: 'radio',
      options: careOptions(prefix),
    },
    {
      id: `${prefix}_school`,
      category,
      label: `${parentLabel}の就学技能習得の状況は？`,
      inputType: 'radio',
      options: schoolOptions(prefix),
    },
    {
      id: `${prefix}_parental_leave`,
      category,
      label: `${parentLabel}は育児休業中ですか？`,
      inputType: 'radio',
      options: parentalLeaveOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// 2. 調整指数
const adjustmentQuestions: Question[] = [
  {
    id: 'adj_nursery_staff',
    category: 'adjustment',
    label: '父母のいずれかが市内の認可保育施設・企業主導型保育施設等で保育士・保育教諭として勤務していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_nursery_staff_0', points: 0 },
      { label: '週40時間以上勤務している（+6）', value: 'adj_nursery_staff_1', points: 6 },
      { label: '週30時間以上勤務している（+4）', value: 'adj_nursery_staff_2', points: 4 },
      { label: '上記以外で勤務している（+2）', value: 'adj_nursery_staff_3', points: 2 },
    ],
  },
  {
    id: 'adj_job_offer',
    category: 'adjustment',
    label: '就労内定者（入所時就労開始予定者）ですか？',
    helpText: '基本指数が就労の場合に適用されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_job_offer_0', points: 0 },
      { label: 'はい（−2）', value: 'adj_job_offer_1', points: -2 },
    ],
  },
  {
    id: 'adj_designated_disease',
    category: 'adjustment',
    label: '父母のいずれかが国指定難病の治療中ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_designated_disease_0', points: 0 },
      { label: 'はい（+6）', value: 'adj_designated_disease_1', points: 6 },
    ],
  },
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親世帯ですか？',
    helpText: '「ひとり親に準ずる世帯」の離婚調停中・単身赴任は、保護者の住民票が別になっている場合を指します',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_0', points: 0 },
      { label: 'ひとり親世帯（死亡・離婚・未婚）（+10）', value: 'adj_single_parent_1', points: 10 },
      { label: 'ひとり親に準ずる世帯（行方不明・拘禁中・離婚調停中・単身赴任等による別居）（+5）', value: 'adj_single_parent_2', points: 5 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_0', points: 0 },
      { label: 'はい（+10）', value: 'adj_welfare_1', points: 10 },
    ],
  },
  {
    id: 'adj_fee_delinquent',
    category: 'adjustment',
    label: '保育料や給食費を3ヶ月以上滞納していますか？',
    helpText: '兄弟姉妹卒園児の分も含みます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_fee_delinquent_0', points: 0 },
      { label: 'はい（−10）', value: 'adj_fee_delinquent_1', points: -10 },
    ],
  },
  {
    id: 'adj_family_home',
    category: 'adjustment',
    label: '保育ができる18歳以上65歳未満の祖父母または兄姉が同一敷地内に住居を構えて居住していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_family_home_0', points: 0 },
      { label: 'はい（−4）', value: 'adj_family_home_1', points: -4 },
    ],
  },
  {
    id: 'adj_graduate',
    category: 'adjustment',
    label: '地域型保育事業・企業主導型保育施設を卒園予定ですか？',
    helpText: '卒園の次年度のみ有効です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_graduate_0', points: 0 },
      { label: '2歳児で卒園となる地域型保育事業に在籍している（+4）', value: 'adj_graduate_1', points: 4 },
      { label: '2歳児で卒園となる企業主導型保育施設に在籍している（+4）', value: 'adj_graduate_2', points: 4 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: '兄弟姉妹の入園状況は？',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_sibling_0', points: 0 },
      { label: '兄弟姉妹が既に市内認可施設に入所している（入所時に在園している）（+4）', value: 'adj_sibling_1', points: 4 },
      { label: '2人以上同時に保育園・認定こども園・小規模保育事業に入園申込（+2）', value: 'adj_sibling_2', points: 2 },
    ],
  },
  {
    id: 'adj_leave_return',
    category: 'adjustment',
    label: '出産休暇・育児休業取得により市内の施設を一度退園し、育児休業明けに入園申込をしますか？',
    helpText: '育児休業給付金の受給資格がなく、かつ産前休暇前の就労実績が6ヶ月未満の場合は適用しません',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_leave_return_0', points: 0 },
      { label: 'はい（+4）', value: 'adj_leave_return_1', points: 4 },
    ],
  },
  {
    id: 'adj_declined',
    category: 'adjustment',
    label: '同一年度申込で内定を辞退していますか？',
    helpText: '当初入園申込を除きます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_declined_0', points: 0 },
      { label: 'はい（−2）', value: 'adj_declined_1', points: -2 },
    ],
  },
];

export const kiyosuData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
