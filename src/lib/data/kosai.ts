import type { MunicipalityData, Question } from '../types';

// -------------------------------------------------------------------------
// 湖西市 保育園入園 利用調整基準データ
// 出典: 湖西市「令和8年度 湖西市保育施設利用調整指数表」
// https://www.city.kosai.shizuoka.jp/material/files/group/32/tyouseisisuuR8.pdf
// -------------------------------------------------------------------------
// 湖西市は原典に手順が書かれている。
//   「利用調整は、次に定める【1】基本指数 と【2】調整指数 の合計値に基づき行います」
//   「区分A〜Iのうち一番指数の高い細目を父母ともにひとつずつ適用します」
// 父母それぞれに指数が付き、その合計で調整するため scoringMethod は 'sum'。
// 基本指数の最大は1人あたり20点。
//
// 原典で数値を出していない項目は選択肢にしていない。
// - 区分G 就学（※1「就労に準じる」）… 就労の指数を当てはめるため、単独の数が無い
//
// 次の2つは、この画面で扱う「入園の点数」とは性質が違うため入れていない。
// - 「転園の申込みをする場合は、基準点に0.8を乗じた点数」… 点数そのものではなく計算方法
// - 調整指数12「他市からの利用調整希望者（転入予定除く）」−20
// -------------------------------------------------------------------------

const municipality = {
  id: 'kosai',
  name: '湖西市',
  slug: 'kosai',
  prefecture: '静岡県',
  maxBasePoints: 20,
  scoringMethod: 'sum',
} as const;

// A 就労（就労内定を含む）
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月155時間以上の就労を常態', value: `${prefix}_employment_0`, points: 20 },
  { label: '月150時間以上の就労を常態', value: `${prefix}_employment_1`, points: 19 },
  { label: '月140時間以上の就労を常態', value: `${prefix}_employment_2`, points: 17 },
  { label: '月120時間以上の就労を常態', value: `${prefix}_employment_3`, points: 15 },
  { label: '月100時間以上の就労を常態', value: `${prefix}_employment_4`, points: 13 },
  { label: '月80時間以上の就労を常態', value: `${prefix}_employment_5`, points: 11 },
  { label: '月64時間以上の就労を常態', value: `${prefix}_employment_6`, points: 9 },
  { label: '内職等で月64時間以上の就労を常態', value: `${prefix}_employment_7`, points: 8 },
];

// B 妊娠・出産（母のみ）
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産予定月の前後2か月を含む計5か月以内', value: `${prefix}_childbirth_0`, points: 14 },
];

// C 疾病・障がい
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '1か月以上の入院または常時病臥', value: `${prefix}_illness_0`, points: 20 },
  { label: '身体障害者手帳1〜2級／療育手帳A／精神障害者保健福祉手帳1〜2級で保育が困難', value: `${prefix}_illness_1`, points: 20 },
  { label: '身体障害者手帳3級／療育手帳B／精神障害者保健福祉手帳3級で保育が困難', value: `${prefix}_illness_2`, points: 18 },
  { label: '1か月以上の居宅内療養で、安静を要する自宅療養が必要と診断されている', value: `${prefix}_illness_3`, points: 16 },
  { label: '1か月以上の居宅内療養で、通院加療を要し保育が困難', value: `${prefix}_illness_4`, points: 14 },
  { label: '身体障害者手帳4級の交付を受けている者で保育が困難', value: `${prefix}_illness_5`, points: 14 },
];

// D 親族の介護・看護
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '病院等の指示により、1か月以上の付き添いが必要', value: `${prefix}_care_0`, points: 20 },
  { label: '身1〜2級／療育A／精1〜2級を所持、または介護認定4〜5の親族の常時介護・看護・施設通所の付き添いで保育が困難', value: `${prefix}_care_1`, points: 16 },
  { label: '身3級／療育B／精3級を所持、または介護認定2〜3の親族の常時介護・看護・施設通所の付き添いで保育が困難', value: `${prefix}_care_2`, points: 13 },
  { label: '上記以外の親族の常時介護・看護・施設通所の付き添いで保育が困難', value: `${prefix}_care_3`, points: 11 },
];

// E 災害
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '震災・風水害・火災などの災害により自宅や近隣の復旧に当たっている', value: `${prefix}_disaster_0`, points: 20 },
];

// F 求職
const jobseekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動、起業準備の場合', value: `${prefix}_jobseeking_0`, points: 7 },
];

// H 虐待
const abuseOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_abuse_none`, points: 0 },
  { label: '虐待やDVのおそれがあると認められる場合', value: `${prefix}_abuse_0`, points: 20 },
];

// I 不在等
const absentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_absent_none`, points: 0 },
  { label: '死亡・離別・行方不明、拘禁等', value: `${prefix}_absent_0`, points: 20 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: '区分A〜Iのうち、いちばん指数の高い細目を父母ともにひとつずつ適用します',
    inputType: 'select',
    options: [
      { label: '就労（就労内定を含む）', value: `${prefix}_reason_employment`, points: 0 },
      { label: '妊娠・出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '疾病・障がい', value: `${prefix}_reason_illness`, points: 0 },
      { label: '親族の介護・看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '災害', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '求職', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '虐待・DV', value: `${prefix}_reason_abuse`, points: 0 },
      { label: '不在等', value: `${prefix}_reason_absent`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の就労の状況は？`,
      inputType: 'radio',
      options: employmentOptions(prefix),
    },
    {
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}の出産の状況は？`,
      helpText: '原典では母のみに指数が付く区分です',
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
      label: `${parentLabel}の親族の介護・看護の状況は？`,
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
      label: `${parentLabel}は求職活動・起業準備をしていますか？`,
      inputType: 'radio',
      options: jobseekingOptions(prefix),
    },
    {
      id: `${prefix}_abuse`,
      category,
      label: `${parentLabel}：虐待やDVのおそれがありますか？`,
      inputType: 'radio',
      options: abuseOptions(prefix),
    },
    {
      id: `${prefix}_absent`,
      category,
      label: `${parentLabel}は不在等ですか？`,
      inputType: 'radio',
      options: absentOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// 【2】調整指数
// 「同番号内に複数の調整要件がある場合は、該当する調整要件のいずれかひとつを適用します」
const adjustmentQuestions: Question[] = [
  {
    id: 'adj_household',
    category: 'adjustment',
    label: '世帯の状況は？',
    helpText: 'ひとり親の同居判定では、世帯分離・同一敷地内の別棟・隣接地も同居とみなします',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_household_0', points: 0 },
      { label: 'ひとり親で、親族等と同居していない（+10）', value: 'adj_household_1', points: 10 },
      { label: 'ひとり親で、親族等と同居している（+6）', value: 'adj_household_2', points: 6 },
      { label: '生活保護世帯（+4）', value: 'adj_household_3', points: 4 },
      { label: '児童福祉等の観点から特に調整が必要とされた（要保護児童など）（+4）', value: 'adj_household_4', points: 4 },
    ],
  },
  {
    id: 'adj_leave_return',
    category: 'adjustment',
    label: '育児休業期間が終了しますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_leave_return_0', points: 0 },
      { label: 'はい（+5）', value: 'adj_leave_return_1', points: 5 },
    ],
  },
  {
    id: 'adj_work_days',
    category: 'adjustment',
    label: '父母どちらかの1か月の就労日数（就労日数の少ない方）は？',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_work_days_0', points: 0 },
      { label: '月20日以上の就労（+3）', value: 'adj_work_days_1', points: 3 },
      { label: '月16日以上20日未満の就労（+2）', value: 'adj_work_days_2', points: 2 },
      { label: '月12日以上16日未満の就労（+1）', value: 'adj_work_days_3', points: 1 },
    ],
  },
  {
    id: 'adj_nursery_staff',
    category: 'adjustment',
    label: '父母のどちらかが保育士等ですか？',
    helpText: '保育士・幼稚園教諭・保育教諭・看護師として特定教育・保育施設等に就労する場合が対象です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_nursery_staff_0', points: 0 },
      { label: '市内の施設に就労している（+8）', value: 'adj_nursery_staff_1', points: 8 },
      { label: '市外の施設に就労している（+1）', value: 'adj_nursery_staff_2', points: 1 },
    ],
  },
  {
    id: 'adj_sibling_enrolled',
    category: 'adjustment',
    label: 'きょうだいが利用中の園へ入園申込をしますか？',
    helpText: '認定こども園（幼稚園部）に在籍している児童のきょうだいの申込には適用しません',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_sibling_enrolled_0', points: 0 },
      { label: 'すでにきょうだい2人以上が希望施設（保育部）を利用中（+7）', value: 'adj_sibling_enrolled_1', points: 7 },
      { label: 'すでにきょうだい1人が希望施設（保育部）を利用中（+6）', value: 'adj_sibling_enrolled_2', points: 6 },
    ],
  },
  {
    id: 'adj_sibling_same',
    category: 'adjustment',
    label: 'きょうだい同時入園申込ですか？',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_sibling_same_0', points: 0 },
      { label: 'きょうだい同時に申込み（3人以上）（+4）', value: 'adj_sibling_same_1', points: 4 },
      { label: 'きょうだい同時に申込み（2人）（+2）', value: 'adj_sibling_same_2', points: 2 },
    ],
  },
  {
    id: 'adj_graduate',
    category: 'adjustment',
    label: '卒園児ですか？',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_graduate_0', points: 0 },
      { label: '地域型保育事業所の卒園児（+20）', value: 'adj_graduate_1', points: 20 },
      { label: '2歳児までを預かる事業所内保育施設（認可外）の卒園児（+15）', value: 'adj_graduate_2', points: 15 },
    ],
  },
  {
    id: 'adj_unemployed',
    category: 'adjustment',
    label: '生計中心者の失業等により、就労の必要性が高いですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unemployed_0', points: 0 },
      { label: 'はい（+8）', value: 'adj_unemployed_1', points: 8 },
    ],
  },
  {
    id: 'adj_fee_delinquent',
    category: 'adjustment',
    label: '保育料・給食費等に未納がありますか？',
    helpText: '督促状が通知されている、または納付相談が無い、納付誓約を履行していない場合が対象です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_fee_delinquent_0', points: 0 },
      { label: 'はい（−3）', value: 'adj_fee_delinquent_1', points: -3 },
    ],
  },
  {
    id: 'adj_declined',
    category: 'adjustment',
    label: '入園内定を辞退するなど、公正な選考に支障をきたすような行為を行いましたか？',
    helpText: '令和8年度中に辞退をした場合は同一年度と令和9年4月まで減点が適用されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_declined_0', points: 0 },
      { label: 'はい（−15）', value: 'adj_declined_1', points: -15 },
    ],
  },
];

export const kosaiData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
