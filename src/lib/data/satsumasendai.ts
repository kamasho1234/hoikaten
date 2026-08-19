import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 薩摩川内市 保育施設利用調整基準表（事由点・優先度）データ
//
// 出典: 薩摩川内市子育て支援課「令和8年度保育施設利用調整基準表（薩摩川内市）」
//       https://www.city.satsumasendai.lg.jp/material/files/group/20/R8_riyotyouseikijyun.pdf
//       （薩摩川内市Webサイト「令和8年度保育施設の利用申し込みのご案内」
//         https://www.city.satsumasendai.lg.jp/kosodate_kyoiku/kosodate/4/18166.html からリンク）
//
// 2026-08-19: 従来のデータは他自治体と同じ点数配列のテンプレート（推定値）だったため、
//             上記の公式基準表を読み取って全面的に置き換えた。
//
// 原典の「項目点の計算」:
//   「項目点は、事由点（A）＋優先度（B）で求めます」
//   「事由点は、保育の必要性の事由ごとに定められています。父と母の合計が世帯の事由点（A）となります」
//   就労のパート・自営農業は「勤務日数」と「勤務時間」がそれぞれ加算される
//   （例：月20日以上8＋1日8時間以上7＝15点）。
//
// 質問に含めていない原典の項目:
//   ・優先度①「特定教育・保育施設、特定地域型保育事業の従事者（本市に住民登録があり、
//     認可保育施設の勤務者に限る）」＝最優先（点数ではない）
// ---------------------------------------------------------------------------

const municipality = {
  id: 'satsumasendai',
  name: '薩摩川内市',
  slug: 'satsumasendai',
  prefecture: '鹿児島県',
  maxBasePoints: 32, // 父母各16点（入院・常時伏臥）
} as const;

// ---------------------------------------------------------------------------
// 事由点（A）。父母それぞれについて選び、合計が世帯の事由点になる
// ---------------------------------------------------------------------------

/** 就労（正社員・自営業事業主・家庭内労働） */
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '正社員', value: `${prefix}_employment_15`, points: 15 },
  { label: '自営業（事業主）・農業', value: `${prefix}_employment_self_15`, points: 15 },
  { label: '家庭内労働（上記以外）', value: `${prefix}_employment_12`, points: 12 },
];

/** 就労（パート・自営農業）の勤務日数 */
const workDaysOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_days_none`, points: 0 },
  { label: '月20日以上', value: `${prefix}_days_8`, points: 8 },
  { label: '月15日以上', value: `${prefix}_days_6`, points: 6 },
  { label: '月12日以上', value: `${prefix}_days_4`, points: 4 },
];

/** 就労（パート・自営農業）の勤務時間 */
const workHoursOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_hours_none`, points: 0 },
  { label: '1日8時間以上', value: `${prefix}_hours_7`, points: 7 },
  { label: '1日6時間以上', value: `${prefix}_hours_5`, points: 5 },
  { label: '1日4時間以上', value: `${prefix}_hours_3`, points: 3 },
];

/** 出産 */
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産', value: `${prefix}_childbirth_13`, points: 13 },
];

/** 育児休業 */
const parentalLeaveOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_leave_none`, points: 0 },
  { label: '育児休業', value: `${prefix}_leave_7`, points: 7 },
];

/** 求職中等 */
const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職中等', value: `${prefix}_jobseeking_1`, points: 1 },
];

/** 疾病・障がい */
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院', value: `${prefix}_illness_16a`, points: 16 },
  { label: '常時伏臥', value: `${prefix}_illness_16b`, points: 16 },
  { label: '精神結核', value: `${prefix}_illness_13a`, points: 13 },
  {
    label: '居宅で通院加療を行い、常に安静を要するなど保育が常時困難',
    value: `${prefix}_illness_13b`,
    points: 13,
  },
  { label: '上記以外で、通院加療を行い保育が困難', value: `${prefix}_illness_10`, points: 10 },
  { label: '障がい：障害者手帳1〜2級、療育手帳A1・2', value: `${prefix}_illness_disability_15`, points: 15 },
  { label: '障がい：障害者手帳3級、療育手帳B', value: `${prefix}_illness_disability_14`, points: 14 },
  { label: '障がい：障害者手帳等 上記以外', value: `${prefix}_illness_disability_12`, points: 12 },
];

/** 看護等 */
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '入院付添', value: `${prefix}_care_13`, points: 13 },
  { label: '心身障がい者・児の在宅介護', value: `${prefix}_care_12a`, points: 12 },
  { label: '老人在宅介護（寝たきり・認知症）', value: `${prefix}_care_12b`, points: 12 },
  { label: '一般療養在宅介護', value: `${prefix}_care_10`, points: 10 },
];

/** 就学 */
const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '職業訓練校に通学している', value: `${prefix}_education_13a`, points: 13 },
  { label: '月120時間以上', value: `${prefix}_education_13b`, points: 13 },
  { label: '月48時間以上120時間未満', value: `${prefix}_education_11`, points: 11 },
];

/** 災害 */
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '災害（罹災証明書が必要）', value: `${prefix}_disaster_15`, points: 15 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: 'パート・自営農業の場合は、勤務日数と勤務時間の点数が合算されます',
    inputType: 'select',
    options: [
      { label: '就労（正社員・自営業事業主・家庭内労働）', value: `${prefix}_reason_employment`, points: 0 },
      { label: '就労（パート・自営農業）', value: `${prefix}_reason_days`, points: 0 },
      { label: '出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '育児休業', value: `${prefix}_reason_leave`, points: 0 },
      { label: '求職中等', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '疾病・障がい', value: `${prefix}_reason_illness`, points: 0 },
      { label: '看護等', value: `${prefix}_reason_care`, points: 0 },
      { label: '就学', value: `${prefix}_reason_education`, points: 0 },
      { label: '災害', value: `${prefix}_reason_disaster`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の就労形態は？`,
      inputType: 'radio',
      options: employmentOptions(prefix),
    },
    {
      id: `${prefix}_days`,
      category,
      label: `${parentLabel}（パート・自営農業）の勤務日数は？`,
      inputType: 'radio',
      options: workDaysOptions(prefix),
    },
    {
      id: `${prefix}_hours`,
      category,
      // 「就労（パート・自営農業）」を選んだときだけ表示する（勤務日数とは別に加算される項目）
      showFor: ['days'],
      label: `${parentLabel}（パート・自営農業）の勤務時間は？`,
      inputType: 'radio',
      options: workHoursOptions(prefix),
    },
    {
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}は出産にあてはまりますか？`,
      inputType: 'radio',
      options: childbirthOptions(prefix),
    },
    {
      id: `${prefix}_leave`,
      category,
      label: `${parentLabel}は育児休業中ですか？`,
      inputType: 'radio',
      options: parentalLeaveOptions(prefix),
    },
    {
      id: `${prefix}_jobseeking`,
      category,
      label: `${parentLabel}は求職中等ですか？`,
      inputType: 'radio',
      options: jobSeekingOptions(prefix),
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
      id: `${prefix}_education`,
      category,
      label: `${parentLabel}の就学の状況は？`,
      inputType: 'radio',
      options: educationOptions(prefix),
    },
    {
      id: `${prefix}_disaster`,
      category,
      label: `${parentLabel}は災害にあてはまりますか？`,
      inputType: 'radio',
      options: disasterOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// ---------------------------------------------------------------------------
// 優先度（B）加算・減算
// ---------------------------------------------------------------------------

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_social_care',
    category: 'adjustment',
    label: '虐待・DV等の措置対象世帯、または里親家庭ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_social_care_no', points: 0 },
      { label: 'はい', value: 'adj_social_care_yes', points: 35 },
    ],
  },
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親世帯ですか？',
    helpText: '事実婚は該当しません',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい', value: 'adj_single_parent_yes', points: 34 },
    ],
  },
  {
    id: 'adj_chiikigata',
    category: 'adjustment',
    label: '地域型保育事業の卒園児ですか？',
    helpText:
      '小規模保育施設および事業所内保育事業所（地域枠）は利用が2歳までとなるため、引き続き小学校就学前までの保育を希望する場合の優先度が高く設定されています',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_chiikigata_no', points: 0 },
      { label: 'はい（連携施設への入所を希望）', value: 'adj_chiikigata_35', points: 35 },
      { label: 'はい（連携施設以外への入所を希望）', value: 'adj_chiikigata_30', points: 30 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: 'きょうだいの在園・申請状況は？',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_sibling_no', points: 0 },
      { label: '既にきょうだいが、入所を希望する教育・保育施設に在園している', value: 'adj_sibling_15', points: 15 },
      { label: '既にきょうだいが、いずれかの教育・保育施設に在園している', value: 'adj_sibling_10', points: 10 },
      { label: '双子以上が同時に同じ教育・保育施設に入園申請している', value: 'adj_sibling_7', points: 7 },
      { label: 'きょうだい児が在園する教育・保育施設に転園申請をしている', value: 'adj_sibling_5a', points: 5 },
      {
        label: '双子以上を除く、きょうだい同時に同じ教育・保育施設に入園申請している',
        value: 'adj_sibling_5b',
        points: 5,
      },
    ],
  },
  {
    id: 'adj_child_disability',
    category: 'adjustment',
    label: '当該児童が障害を有していますか？',
    helpText:
      '身体障害者手帳、療育手帳、精神障害者保健福祉手帳、特別児童扶養手当の支給対象児童が対象です。事前に教育・保育施設の了承を得ている場合はさらに10点が加算されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_child_disability_no', points: 0 },
      { label: 'はい', value: 'adj_child_disability_10', points: 10 },
      { label: 'はい（事前に教育・保育施設の了承を得ている）', value: 'adj_child_disability_20', points: 20 },
    ],
  },
  {
    id: 'adj_layoff',
    category: 'adjustment',
    label: '生計中心者が失業していますか？',
    helpText: '自己都合退職は該当しません',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_layoff_no', points: 0 },
      { label: 'はい', value: 'adj_layoff_yes', points: 10 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい', value: 'adj_welfare_yes', points: 6 },
    ],
  },
  {
    id: 'adj_leave_return',
    category: 'adjustment',
    label: '育児休暇または病気休暇の終了による職場復帰ですか？',
    helpText: '育児休暇の終了による職場復帰は、きょうだいが現に教育・保育施設を利用中の場合のみが対象です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_leave_return_no', points: 0 },
      { label: '育児休暇の終了による職場復帰', value: 'adj_leave_return_5', points: 5 },
      { label: '病気休暇の終了による職場復帰', value: 'adj_leave_return_4', points: 4 },
    ],
  },
  {
    id: 'adj_household_disability',
    category: 'adjustment',
    label: '障害者と同居していますか？（当該申込み児童以外）',
    helpText:
      '身体障害者手帳、療育手帳、精神障害者保健福祉手帳、特別児童扶養手当に加え、障害基礎年金の受給者を含みます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_household_disability_no', points: 0 },
      { label: 'はい', value: 'adj_household_disability_yes', points: 3 },
    ],
  },
  {
    id: 'adj_waiting',
    category: 'adjustment',
    label: '前年度からの待機児童ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_waiting_no', points: 0 },
      { label: 'はい（1か月〜12か月）', value: 'adj_waiting_1', points: 1 },
      { label: 'はい（13か月以上）', value: 'adj_waiting_2', points: 2 },
    ],
  },
  {
    id: 'adj_arrears',
    category: 'adjustment',
    label: '保育料の滞納がありますか？',
    helpText:
      '滞納している月数に応じて世帯ごとに減算されます。現在在園している児童ではなく、きょうだいの保育料が滞納となっている、新規に利用を希望する児童に適用されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_arrears_no', points: 0 },
      { label: 'はい（比較的短期の滞納）', value: 'adj_arrears_10', points: -10 },
      { label: 'はい（長期の滞納）', value: 'adj_arrears_15', points: -15 },
    ],
  },
];

export const satsumasendaiData: MunicipalityData = {
  municipality,
  questions: [...buildParentQuestions(1), ...buildParentQuestions(2), ...adjustmentQuestions],
};
