import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 小田原市 保育園入園 利用調整基準データ
// 出典: 小田原市「令和6年度 保育所等利用判定基準表」
// https://www.city.odawara.kanagawa.jp/field/edu-ch/kosodate/nursery/nursery/guide_necessarydocuments/p38767.html
// ---------------------------------------------------------------------------
// 小田原市は「基準点数（父母の低い方）＋ 調整点数」の加算方式。
// 各親は最大30点。合計基準点数は低い方の親の点数で決定。
// 月の就労日数と就労時間で判定。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'odawara',
  name: '小田原市',
  slug: 'odawara',
  prefecture: '神奈川県',
  maxBasePoints: 30,
  scoringMethod: 'min' as const,
} as const;

const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月20日以上160時間以上', value: `${prefix}_employment_30`, points: 30 },
  { label: '月20日以上140時間以上', value: `${prefix}_employment_29`, points: 29 },
  { label: '月20日以上120時間以上', value: `${prefix}_employment_28`, points: 28 },
  { label: '月20日以上100時間以上', value: `${prefix}_employment_26`, points: 26 },
  { label: '月20日以上80時間以上', value: `${prefix}_employment_24`, points: 24 },
  { label: '月18日以上120時間以上', value: `${prefix}_employment_27`, points: 27 },
  { label: '月18日以上80時間以上', value: `${prefix}_employment_23`, points: 23 },
  { label: '月15日以上100時間以上', value: `${prefix}_employment_22`, points: 22 },
  { label: '月15日以上75時間以上', value: `${prefix}_employment_20`, points: 20 },
  { label: '月15日以上60時間以上', value: `${prefix}_employment_19`, points: 19 },
];

const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '月60時間以上（通信制除く）', value: `${prefix}_education_23`, points: 23 },
  { label: '通信制', value: `${prefix}_education_15`, points: 15 },
];

const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産予定日前後8週間以内', value: `${prefix}_childbirth_28`, points: 28 },
];

const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院・常時臥床中', value: `${prefix}_illness_30`, points: 30 },
  { label: '通院加療・常時安静が必要', value: `${prefix}_illness_27`, points: 27 },
  { label: '通院・自宅療養中', value: `${prefix}_illness_20`, points: 20 },
];

const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '重度（身障1-2級/精神1級/療育A）', value: `${prefix}_disability_30`, points: 30 },
  { label: '中度（身障3-4級/精神2-3級/療育B）', value: `${prefix}_disability_21`, points: 21 },
];

const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '入院付添い', value: `${prefix}_care_28`, points: 28 },
  { label: '重度障害者・要介護3～5の介護', value: `${prefix}_care_25`, points: 25 },
  { label: '中度・要介護1～2の介護', value: `${prefix}_care_19`, points: 19 },
  { label: '要支援の介護', value: `${prefix}_care_13`, points: 13 },
  { label: '通院付添い等', value: `${prefix}_care_15`, points: 15 },
];

const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動中', value: `${prefix}_jobseeking_1`, points: 1 },
  { label: 'ひとり親で求職活動中', value: `${prefix}_jobseeking_15`, points: 15 },
];

const disasterOptions = (prefix: string) => [
  { label: 'いいえ', value: `${prefix}_disaster_no`, points: 0 },
  { label: 'はい（30点）', value: `${prefix}_disaster_yes`, points: 30 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: '小田原市では父母それぞれの基準点数（各最大30点）のうち低い方で選考されます',
    inputType: 'select',
    options: [
      { label: '仕事をしている', value: `${prefix}_reason_employment`, points: 0 },
      { label: '学生（就学）', value: `${prefix}_reason_education`, points: 0 },
      { label: '出産の前後', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '病気の治療中', value: `${prefix}_reason_illness`, points: 0 },
      { label: '障害がある', value: `${prefix}_reason_disability`, points: 0 },
      { label: '介護・看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '仕事を探している', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '災害にあった', value: `${prefix}_reason_disaster`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の就労について（月の日数と時間）`,
      inputType: 'radio',
      options: employmentOptions(prefix),
    },
    {
      id: `${prefix}_education`,
      category,
      label: `${parentLabel}の就学状況は？`,
      inputType: 'radio',
      options: educationOptions(prefix),
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
      label: `${parentLabel}の介護・看護の状況は？`,
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
      id: `${prefix}_disaster`,
      category,
      label: `${parentLabel}は災害にあいましたか？`,
      inputType: 'radio',
      options: disasterOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_parental_leave_return',
    category: 'adjustment',
    label: '育児休業からの復帰予定ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_parental_leave_no', points: 0 },
      { label: 'はい、復帰予定（+8）', value: 'adj_parental_leave_yes', points: 8 },
      { label: '既に復帰している（+4）', value: 'adj_parental_leave_already', points: 4 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護受給世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい（+10）', value: 'adj_welfare_yes', points: 10 },
    ],
  },
  {
    id: 'adj_disabled_child',
    category: 'adjustment',
    label: '障害のあるお子さんですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_disabled_child_no', points: 0 },
      { label: 'はい（+5）', value: 'adj_disabled_child_yes', points: 5 },
    ],
  },
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい、離婚等（+12）', value: 'adj_single_parent_divorce', points: 12 },
      { label: 'はい、別居（+4）', value: 'adj_single_parent_separated', points: 4 },
    ],
  },
  {
    id: 'adj_siblings_applying',
    category: 'adjustment',
    label: 'きょうだいが同時申込中ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_siblings_applying_no', points: 0 },
      { label: 'はい（+3）', value: 'adj_siblings_applying_yes', points: 3 },
    ],
  },
  {
    id: 'adj_siblings_enrolled',
    category: 'adjustment',
    label: 'きょうだいが認可保育所に在園していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_siblings_enrolled_no', points: 0 },
      { label: 'はい（+5）', value: 'adj_siblings_enrolled_yes', points: 5 },
    ],
  },
  {
    id: 'adj_unaccredited_use',
    category: 'adjustment',
    label: '認可外保育施設を月60時間以上利用していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unaccredited_no', points: 0 },
      { label: 'はい（+5）', value: 'adj_unaccredited_yes', points: 5 },
    ],
  },
  {
    id: 'adj_small_facility_graduate',
    category: 'adjustment',
    label: '小規模保育施設等から卒園後の入園希望ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_small_facility_no', points: 0 },
      { label: 'はい（+5）', value: 'adj_small_facility_yes', points: 5 },
    ],
  },
  {
    id: 'adj_nursery_teacher',
    category: 'adjustment',
    label: '市内認可保育所に勤務する保育士ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_nursery_teacher_no', points: 0 },
      { label: 'はい（+20）', value: 'adj_nursery_teacher_yes', points: 20 },
    ],
  },
  {
    id: 'adj_employment_offer',
    category: 'adjustment',
    label: '就労内定していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_employment_offer_no', points: 0 },
      { label: 'はい（-2）', value: 'adj_employment_offer_yes', points: -2 },
    ],
  },
  {
    id: 'adj_nursery_fee_delinquent',
    category: 'adjustment',
    label: '保育料を6月以上滞納していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_fee_delinquent_no', points: 0 },
      { label: 'はい（-30）', value: 'adj_fee_delinquent_yes', points: -30 },
    ],
  },
  {
    id: 'adj_nonresident',
    category: 'adjustment',
    label: '市外にお住まいですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_nonresident_no', points: 0 },
      { label: 'はい（-30）', value: 'adj_nonresident_yes', points: -30 },
    ],
  },
];

export const odawaraData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
