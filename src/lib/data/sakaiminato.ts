import type { MunicipalityData, Question } from '../types';

// -------------------------------------------------------------------------
// 境港市 保育園入園 利用調整基準データ
// 出典: 境港市「保育利用調整基準指数」（R7年度4月入園から適用）
// https://www.city.sakaiminato.lg.jp/upload/user/00112841-Evp6Zu.pdf
// -------------------------------------------------------------------------
// 境港市の基本指数は「父」「母」それぞれの列に点数が並び、
// 集計欄が「基本指数 ＋ 調整指数 ＝ 保育指数」となっている。
// 原典は父母の合わせ方を書いていないため、
// 全国で最も多い形（父母それぞれの点数を合算）に合わせて scoringMethod は 'sum' とした。
// 基本指数の最大は1人あたり10点。
//
// (1)の後半にある「就労等の状況」「世帯の状況」「申込児童の状況」「保育士」
// 「未満児保育施設卒園児」は、父母それぞれの類型ではなく世帯の話なので、
// 調整の設問として持たせている。
//
// 原典で数値を出していない項目・幅のある項目は選択肢にしていない。
// - ⑩その他「①〜⑨に類すると市長が認める場合（3〜50）」
// - 調整指数「家庭内特殊事情：育児リスク等、特別な事情を抱えるもの（1〜50）」
// - 「保育士：市内保育施設に保育士として勤務することで、入所枠増加を見込める場合」
//   （(1)①の指数×4）… 就労の指数によって変わるため、選択肢では表せない
// -------------------------------------------------------------------------

const municipality = {
  id: 'sakaiminato',
  name: '境港市',
  slug: 'sakaiminato',
  prefecture: '鳥取県',
  maxBasePoints: 10,
  scoringMethod: 'sum',
} as const;

// ① 就労
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月140時間以上（週35時間以上）', value: `${prefix}_employment_0`, points: 10 },
  { label: '月120時間以上（週30時間以上）', value: `${prefix}_employment_1`, points: 9 },
  { label: '月100時間以上（週25時間以上）', value: `${prefix}_employment_2`, points: 8 },
  { label: '月80時間以上（週20時間以上）', value: `${prefix}_employment_3`, points: 7 },
  { label: '月60時間以上（週15時間以上）', value: `${prefix}_employment_4`, points: 6 },
  { label: '月48時間以上（週12時間以上）', value: `${prefix}_employment_5`, points: 5 },
];

// ② 妊娠・出産（母のみ）
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '妊娠中または出産から8週間を経過する日の月末まで', value: `${prefix}_childbirth_0`, points: 6 },
];

// ③ 疾病・負傷 ／ ④ 障がい
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院・常時病臥・精神疾患により保育不能', value: `${prefix}_illness_0`, points: 10 },
  { label: '身体障害者手帳1〜2級／療育手帳A／精神障害者手帳1級および同程度と判断できるもの', value: `${prefix}_illness_1`, points: 10 },
  { label: '身体障害者手帳3級／療育手帳B／精神障害者手帳2級および同程度と判断できるもの', value: `${prefix}_illness_2`, points: 8 },
  { label: '通院・精神疾患により保育困難（通院週4日以上）', value: `${prefix}_illness_3`, points: 7 },
  { label: '上記以外で保育に支障', value: `${prefix}_illness_4`, points: 6 },
  { label: '身体障害者手帳4〜6級／精神障害者手帳3級および同程度と判断できるもの', value: `${prefix}_illness_5`, points: 6 },
];

// ⑤ 介護・看護
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '全介助が必要な親族の常時介護', value: `${prefix}_care_0`, points: 10 },
  { label: '全介助が必要な親族の常時介護（居宅外での介護）', value: `${prefix}_care_1`, points: 11 },
  { label: '部分介助が必要な親族の常時介護', value: `${prefix}_care_2`, points: 6 },
  { label: '部分介助が必要な親族の常時介護（居宅外での介護）', value: `${prefix}_care_3`, points: 7 },
];

// ⑥ 災害復旧
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '火災・風水害・震災その他災害による自宅等の復旧', value: `${prefix}_disaster_0`, points: 10 },
];

// ⑦ 求職中
const jobseekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動中（起業準備含む）', value: `${prefix}_jobseeking_0`, points: 3 },
];

// ⑧ 就学、職業訓練
const schoolOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_school_none`, points: 0 },
  { label: '学校、職業訓練校等に就学', value: `${prefix}_school_0`, points: 6 },
];

// ⑨ 児童虐待・DV（父母の欄が分かれておらず、世帯で50点）
const abuseOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_abuse_none`, points: 0 },
  { label: '児童虐待のおそれまたは配偶者からの暴力', value: `${prefix}_abuse_0`, points: 50 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: '境港市は父・母それぞれに基本指数が付きます',
    inputType: 'select',
    options: [
      { label: '就労', value: `${prefix}_reason_employment`, points: 0 },
      { label: '妊娠・出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '疾病・負傷・障がい', value: `${prefix}_reason_illness`, points: 0 },
      { label: '介護・看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '災害復旧', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '求職中', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '就学、職業訓練', value: `${prefix}_reason_school`, points: 0 },
      { label: '児童虐待・DV', value: `${prefix}_reason_abuse`, points: 0 },
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
      label: `${parentLabel}の妊娠・出産の状況は？`,
      helpText: '原典では母のみに指数が付く区分です',
      inputType: 'radio',
      options: childbirthOptions(prefix),
    },
    {
      id: `${prefix}_illness`,
      category,
      label: `${parentLabel}の疾病・負傷・障がいの状況は？`,
      inputType: 'radio',
      options: illnessOptions(prefix),
    },
    {
      id: `${prefix}_care`,
      category,
      label: `${parentLabel}の介護・看護の状況は？`,
      helpText: '居宅外での介護は、上記の指数に+1されます',
      inputType: 'radio',
      options: careOptions(prefix),
    },
    {
      id: `${prefix}_disaster`,
      category,
      label: `${parentLabel}は災害復旧にあたっていますか？`,
      inputType: 'radio',
      options: disasterOptions(prefix),
    },
    {
      id: `${prefix}_jobseeking`,
      category,
      label: `${parentLabel}は求職活動中ですか？`,
      inputType: 'radio',
      options: jobseekingOptions(prefix),
    },
    {
      id: `${prefix}_school`,
      category,
      label: `${parentLabel}は就学・職業訓練をしていますか？`,
      inputType: 'radio',
      options: schoolOptions(prefix),
    },
    {
      id: `${prefix}_abuse`,
      category,
      label: `${parentLabel}：児童虐待やDVのおそれがありますか？`,
      inputType: 'radio',
      options: abuseOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// 就労等の状況 ／ 世帯の状況 ／ 申込児童の状況 ／(2) 調整指数
const adjustmentQuestions: Question[] = [
  {
    id: 'adj_tanshin',
    category: 'adjustment',
    label: '単身赴任中ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_tanshin_0', points: 0 },
      { label: 'はい（+4）', value: 'adj_tanshin_1', points: 4 },
    ],
  },
  {
    id: 'adj_leave_return',
    category: 'adjustment',
    label: '産休・育休明けで、復帰予定日が前後一か月未満ですか？',
    helpText: '日々雇用される者を除きます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_leave_return_0', points: 0 },
      { label: 'はい（+3）', value: 'adj_leave_return_1', points: 3 },
    ],
  },
  {
    id: 'adj_home_work',
    category: 'adjustment',
    label: '居宅内就労、または仕事場が居宅の敷地内もしくは隣接地にありますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_home_work_0', points: 0 },
      { label: 'はい（−1）', value: 'adj_home_work_1', points: -1 },
    ],
  },
  {
    id: 'adj_job_offer',
    category: 'adjustment',
    label: '就労予定ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_job_offer_0', points: 0 },
      { label: 'はい（−1）', value: 'adj_job_offer_1', points: -1 },
    ],
  },
  {
    id: 'adj_family_business',
    category: 'adjustment',
    label: '配偶者や祖父母など身内が営む自営業に従事しており、扶養控除・配偶者控除または配偶者特別控除の対象になっていますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_family_business_0', points: 0 },
      { label: 'はい（−1）', value: 'adj_family_business_1', points: -1 },
    ],
  },
  {
    id: 'adj_household',
    category: 'adjustment',
    label: '世帯の状況は？',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_household_0', points: 0 },
      { label: '父母ともに不在（死亡・行方不明等）（+28）', value: 'adj_household_1', points: 28 },
      { label: 'ひとり親等で、満65歳未満の祖父母と同居していない（+20）', value: 'adj_household_2', points: 20 },
      { label: 'ひとり親等で、満65歳未満の祖父母と同居している（+18）', value: 'adj_household_3', points: 18 },
      { label: '生活保護世帯（+6）', value: 'adj_household_4', points: 6 },
    ],
  },
  {
    id: 'adj_three_children',
    category: 'adjustment',
    label: '中学校就学前の子どもが3名以上いますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_three_children_0', points: 0 },
      { label: 'はい（+1）', value: 'adj_three_children_1', points: 1 },
    ],
  },
  {
    id: 'adj_other_caregiver',
    category: 'adjustment',
    label: '父母以外の保育可能な同居者がいますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_other_caregiver_0', points: 0 },
      { label: 'はい（−2）', value: 'adj_other_caregiver_1', points: -2 },
    ],
  },
  {
    id: 'adj_fee_delinquent',
    category: 'adjustment',
    label: '入園申込受付期間終了日の翌日時点で保育料を滞納していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_fee_delinquent_0', points: 0 },
      { label: 'はい（−2）', value: 'adj_fee_delinquent_1', points: -2 },
    ],
  },
  {
    id: 'adj_child_disability',
    category: 'adjustment',
    label: '申込児童が身体障害者手帳・療育手帳・精神障害者手帳を所持している、またはそれと同程度と判断できますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_child_disability_0', points: 0 },
      { label: 'はい（+5）', value: 'adj_child_disability_1', points: 5 },
    ],
  },
  {
    id: 'adj_graduate',
    category: 'adjustment',
    label: '小学校就学前までに卒園になる保育施設から卒園し、申込みをしますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_graduate_0', points: 0 },
      { label: 'はい（+10）', value: 'adj_graduate_1', points: 10 },
    ],
  },
  {
    id: 'adj_school_area',
    category: 'adjustment',
    label: '希望する保育所の所在する小学校区に居住していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_school_area_0', points: 0 },
      { label: 'はい（+1）', value: 'adj_school_area_1', points: 1 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: 'きょうだいの状況は？',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_sibling_0', points: 0 },
      { label: 'きょうだいが既に入所しており、同一の保育施設等に入所を希望する（+3）', value: 'adj_sibling_1', points: 3 },
      { label: 'きょうだいで新規に入所を希望する（+2）', value: 'adj_sibling_2', points: 2 },
    ],
  },
];

export const sakaiminatoData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
