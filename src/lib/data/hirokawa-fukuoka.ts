import type { MunicipalityData, Question } from '../types';

// -------------------------------------------------------------------------
// 広川町（福岡県） 保育園入園 利用調整基準データ
// 出典: 広川町「別表（第11条関係）基本指数表・調整指数表」
// https://www.town.hirokawa.fukuoka.jp/material/files/group/38/riyouchousei0251010.pdf
// -------------------------------------------------------------------------
// slug は 'hirokawa-fukuoka'。広川町は福岡県と和歌山県の両方にあるため、
// 素の 'hirokawa' は使わずに県名を付けている。
//
// 広川町は基本指数表の備考に父母の合わせ方が書かれている。
//   「※父母のそれぞれについて指数を求め、世帯の基本指数とする。」
//   「※基本指数が2つ以上該当する場合は、高い方の指数とする。」
// 父母それぞれの指数を世帯の基本指数にするので scoringMethod は 'sum'。
// 基本指数の最大は1人あたり200点（災害・虐待DV）。
//
// 調整指数の「児童の日常生活において環境不良と認められる世帯」（+100）は
// 「（状況により判断）」と書かれていて町の判断によるため入れていない。
//
// いま園を利用している方の話は入れていない。
// - 継続して保育施設等を利用している場合（+200。町内の地域型保育施設の
//   卒園児童が引き続き連携施設の利用を希望する場合を含む）
// - 特定教育・保育施設等以外の保育施設（町内に限る）からの転園を希望する場合（+150）
// - 町外の地域型保育施設の卒園児童（町民に限る）が引き続き連携施設の
//   利用を希望する場合（+150）
// -------------------------------------------------------------------------

const municipality = {
  id: 'hirokawa-fukuoka',
  name: '広川町',
  slug: 'hirokawa-fukuoka',
  prefecture: '福岡県',
  maxBasePoints: 200,
  scoringMethod: 'sum',
} as const;

// 労働（居宅内・居宅外）
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月160時間以上', value: `${prefix}_employment_0`, points: 100 },
  { label: '月140時間以上160時間未満', value: `${prefix}_employment_1`, points: 90 },
  { label: '月120時間以上140時間未満', value: `${prefix}_employment_2`, points: 80 },
  { label: '月90時間以上120時間未満', value: `${prefix}_employment_3`, points: 70 },
  { label: '月60時間以上90時間未満', value: `${prefix}_employment_4`, points: 60 },
  { label: '労働内定', value: `${prefix}_employment_5`, points: 50 },
];

// 出産
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '妊娠・出産', value: `${prefix}_childbirth_0`, points: 80 },
];

// 保護者の疾病（疾病など ／ 障がい）
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '疾病：入院又は、入院に相当する治療・安静が必要で日常生活が不能な場合', value: `${prefix}_illness_0`, points: 100 },
  { label: '障がい：身体障害者手帳1〜2級、及び精神障害者保健福祉手帳1〜2級、療育手帳Aの交付を受けていて保育が困難な場合', value: `${prefix}_illness_1`, points: 100 },
  { label: '障がい：身体障害者手帳3級、及び精神障害者保健福祉手帳3級、療育手帳B、Cの交付を受けていて保育が困難な場合', value: `${prefix}_illness_2`, points: 80 },
  { label: '疾病：通院加療を行い、常に安静を要するなど保育が著しく困難な場合', value: `${prefix}_illness_3`, points: 70 },
  { label: '障がい：身体障害者手帳の交付を受けていて保育が困難な場合', value: `${prefix}_illness_4`, points: 60 },
  { label: '疾病：疾病により保育に支障がある場合', value: `${prefix}_illness_5`, points: 50 },
];

// 介護・看護（同居・別居）
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '常時介護（看護）が必要であり、20日以上・週40時間以上の保育が困難である', value: `${prefix}_care_0`, points: 90 },
  { label: '入院、通院、通所の付添いのため、月120時間以上の保育が困難である場合（1日5時間以上の付添いが必要な場合）', value: `${prefix}_care_1`, points: 70 },
  { label: '入院、通院、通所の付添いのため、月60時間以上の保育が困難である場合（1日4時間以上で月15日以上付添いが必要な場合）', value: `${prefix}_care_2`, points: 60 },
];

// 災害
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '災害（火災・風水害等）による復旧に当たっており、保育が困難な場合', value: `${prefix}_disaster_0`, points: 200 },
];

// 求職
const jobseekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動のため外出を必要とする場合', value: `${prefix}_jobseeking_0`, points: 30 },
];

// 就学
const schoolOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_school_none`, points: 0 },
  { label: '職業訓練校、専門学校、大学等に月120時間以上就学している場合', value: `${prefix}_school_0`, points: 80 },
  { label: '職業訓練校、専門学校、大学等に月60時間以上就学している場合', value: `${prefix}_school_1`, points: 60 },
];

// 虐待・DV
const dvOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_dv_none`, points: 0 },
  { label: '虐待・DVのおそれがある場合', value: `${prefix}_dv_0`, points: 200 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: '父母のそれぞれについて指数を求め、世帯の基本指数とします',
    inputType: 'select',
    options: [
      { label: '労働', value: `${prefix}_reason_employment`, points: 0 },
      { label: '出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '保護者の疾病・障がい', value: `${prefix}_reason_illness`, points: 0 },
      { label: '介護・看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '災害', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '求職', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '就学', value: `${prefix}_reason_school`, points: 0 },
      { label: '虐待・DV', value: `${prefix}_reason_dv`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の労働の状況は？`,
      helpText: '居宅内・居宅外のどちらも同じ指数です',
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
      label: `${parentLabel}の疾病・障がいの状況は？`,
      inputType: 'radio',
      options: illnessOptions(prefix),
    },
    {
      id: `${prefix}_care`,
      category,
      label: `${parentLabel}の介護・看護の状況は？`,
      helpText: '同居・別居のどちらも対象です',
      inputType: 'radio',
      options: careOptions(prefix),
    },
    {
      id: `${prefix}_disaster`,
      category,
      label: `${parentLabel}は災害による復旧に当たっていますか？`,
      inputType: 'radio',
      options: disasterOptions(prefix),
    },
    {
      id: `${prefix}_jobseeking`,
      category,
      label: `${parentLabel}は求職活動のため外出を必要としますか？`,
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
    {
      id: `${prefix}_dv`,
      category,
      label: `${parentLabel}の世帯に虐待・DVのおそれがありますか？`,
      inputType: 'radio',
      options: dvOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// （2）調整指数表
const adjustmentQuestions: Question[] = [
  {
    id: 'adj_household',
    category: 'adjustment',
    label: '世帯の状況であてはまるものは？',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_household_0', points: 0 },
      { label: 'ひとり親世帯又は父母不存在の世帯（+150）', value: 'adj_household_1', points: 150 },
      { label: '里親家庭の場合（+50）', value: 'adj_household_2', points: 50 },
      { label: '生活保護世帯で、自立支援のため必要と認められる世帯（+10）', value: 'adj_household_3', points: 10 },
    ],
  },
  {
    id: 'adj_absent',
    category: 'adjustment',
    label: '保護者の一方が不在（単身赴任、海外勤務等）の世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_absent_0', points: 0 },
      { label: 'はい（+20）', value: 'adj_absent_1', points: 20 },
    ],
  },
  {
    id: 'adj_unemployed',
    category: 'adjustment',
    label: '生活中心者の失業の世帯ですか？',
    helpText: 'リストラ・事業所の倒産など本人の意に反した失業の場合に限ります',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unemployed_0', points: 0 },
      { label: 'はい（+20）', value: 'adj_unemployed_1', points: 20 },
    ],
  },
  {
    id: 'adj_work_place',
    category: 'adjustment',
    label: '保護者の就労状況であてはまるものは？',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_work_place_0', points: 0 },
      { label: '町内の特定教育・保育施設等で保育士、幼稚園教諭、保育教諭、看護師又は准看護師として就労している（内定含む）（+50）', value: 'adj_work_place_1', points: 50 },
      { label: '町内の放課後児童クラブの指導員として就労している（内定含む）（+10）', value: 'adj_work_place_2', points: 10 },
      { label: '雇用主が親族である（−10）', value: 'adj_work_place_3', points: -10 },
    ],
  },
  {
    id: 'adj_medical_care',
    category: 'adjustment',
    label: '日常生活において、医療的ケアが不可欠である児童ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_medical_care_0', points: 0 },
      { label: 'はい（+20）', value: 'adj_medical_care_1', points: 20 },
    ],
  },
  {
    id: 'adj_sibling_enrolled',
    category: 'adjustment',
    label: '既に兄弟姉妹が保育施設を利用していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_enrolled_0', points: 0 },
      { label: 'はい（+40）', value: 'adj_sibling_enrolled_1', points: 40 },
    ],
  },
  {
    id: 'adj_sibling_same_time',
    category: 'adjustment',
    label: '兄弟姉妹が同時に申込みをしますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_same_time_0', points: 0 },
      { label: 'はい（+20）', value: 'adj_sibling_same_time_1', points: 20 },
    ],
  },
  {
    id: 'adj_return_to_work',
    category: 'adjustment',
    label: '育児休業明けの復職時に申込みますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_return_to_work_0', points: 0 },
      { label: 'はい（+40）', value: 'adj_return_to_work_1', points: 40 },
    ],
  },
  {
    id: 'adj_other_preschool',
    category: 'adjustment',
    label: '申込児童以外に申込みのない未就学児童（兄弟）がいますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_other_preschool_0', points: 0 },
      { label: 'はい（−10）', value: 'adj_other_preschool_1', points: -10 },
    ],
  },
  {
    id: 'adj_third_child',
    category: 'adjustment',
    label: '申込み児童が第3子以降の児童ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_third_child_0', points: 0 },
      { label: 'はい（+20）', value: 'adj_third_child_1', points: 20 },
    ],
  },
  {
    id: 'adj_entry_month',
    category: 'adjustment',
    label: '入所を希望する月は？',
    helpText: '4月からの入所ほど指数が高くなります',
    inputType: 'select',
    options: [
      { label: '選択しない', value: 'adj_entry_month_none', points: 0 },
      { label: '各年度4月から入所（+120）', value: 'adj_entry_month_4', points: 120 },
      { label: '各年度5月から入所（+110）', value: 'adj_entry_month_5', points: 110 },
      { label: '各年度6月から入所（+100）', value: 'adj_entry_month_6', points: 100 },
      { label: '各年度7月から入所（+90）', value: 'adj_entry_month_7', points: 90 },
      { label: '各年度8月から入所（+80）', value: 'adj_entry_month_8', points: 80 },
      { label: '各年度9月から入所（+70）', value: 'adj_entry_month_9', points: 70 },
      { label: '各年度10月から入所（+60）', value: 'adj_entry_month_10', points: 60 },
      { label: '各年度11月から入所（+50）', value: 'adj_entry_month_11', points: 50 },
      { label: '各年度12月から入所（+40）', value: 'adj_entry_month_12', points: 40 },
      { label: '各年度1月から入所（+30）', value: 'adj_entry_month_1', points: 30 },
      { label: '各年度2月から入所（+20）', value: 'adj_entry_month_2', points: 20 },
      { label: '各年度3月から入所（+10）', value: 'adj_entry_month_3', points: 10 },
    ],
  },
];

export const hirokawaFukuokaData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
