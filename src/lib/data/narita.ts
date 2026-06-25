import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 成田市 保育園入園 利用調整基準データ
// 出典: 成田市「保育園利用調整基準」
// https://www1.g-reiki.net/narita/reiki_honbun/z700RG00001045.html
// ---------------------------------------------------------------------------
// 成田市は「基準点数（父母それぞれ最大25点）＋ 調整点数」の加算方式。
// 就労時間に応じた点数、疾病・障害・介護・出産・求職での支援を評価。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'narita',
  name: '成田市',
  slug: 'narita',
  prefecture: '千葉県',
  maxBasePoints: 50,
} as const;

const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月160時間以上', value: `${prefix}_employment_20`, points: 20 },
  { label: '月140時間以上160時間未満', value: `${prefix}_employment_19`, points: 19 },
  { label: '月120時間以上140時間未満', value: `${prefix}_employment_18`, points: 18 },
  { label: '月100時間以上120時間未満', value: `${prefix}_employment_17`, points: 17 },
  { label: '月80時間以上100時間未満', value: `${prefix}_employment_16`, points: 16 },
  { label: '月60時間以上80時間未満', value: `${prefix}_employment_15`, points: 15 },
];

const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院1か月以上 / 常時病臥', value: `${prefix}_illness_25`, points: 25 },
];

const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '身体障害者手帳1・2級 / 精神1級 / 療育A', value: `${prefix}_disability_25`, points: 25 },
  { label: '身体障害者手帳3級 / 精神2級 / 療育B', value: `${prefix}_disability_20`, points: 20 },
  { label: '身体障害者手帳4〜6級 / 精神3級', value: `${prefix}_disability_18`, points: 18 },
];

const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '要介護3以上 / 入院付添1か月以上', value: `${prefix}_care_25`, points: 25 },
  { label: '要介護1〜2の介護', value: `${prefix}_care_20`, points: 20 },
];

const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '妊娠中または出産後2か月以内', value: `${prefix}_childbirth_20`, points: 20 },
];

const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動中', value: `${prefix}_jobseeking_5`, points: 5 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: '成田市では父母それぞれの基準点数（各最大25点）の合計で選考されます',
    inputType: 'select',
    options: [
      { label: '仕事をしている', value: `${prefix}_reason_employment`, points: 0 },
      { label: '病気の治療中', value: `${prefix}_reason_illness`, points: 0 },
      { label: '障害がある', value: `${prefix}_reason_disability`, points: 0 },
      { label: '介護・看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '出産の前後', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '仕事を探している', value: `${prefix}_reason_jobseeking`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の就労時間（月あたり）は？`,
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
      label: `${parentLabel}の介護の状況は？`,
      inputType: 'radio',
      options: careOptions(prefix),
    },
    {
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}の出産の状況は？`,
      inputType: 'radio',
      options: childbirthOptions(prefix),
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

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_parents_absent',
    category: 'adjustment',
    label: '両親が1ヶ月以上の間不在ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_parents_absent_no', points: 0 },
      { label: 'はい（+8）', value: 'adj_parents_absent_yes', points: 8 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護受給世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_welfare_yes', points: 1 },
    ],
  },
  {
    id: 'adj_single_parent_transfer',
    category: 'adjustment',
    label: 'ひとり親世帯（転勤による）ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_transfer_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_single_parent_transfer_yes', points: 1 },
    ],
  },
  {
    id: 'adj_educator_caregiver',
    category: 'adjustment',
    label: '親が市内公共施設の保育士・保育従事者ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_educator_caregiver_no', points: 0 },
      { label: 'はい（+5）', value: 'adj_educator_caregiver_yes', points: 5 },
    ],
  },
  {
    id: 'adj_unemployed_primary',
    category: 'adjustment',
    label: '主たる稼得者が3ヶ月以内に失業状態ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unemployed_primary_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_unemployed_primary_yes', points: 2 },
    ],
  },
  {
    id: 'adj_child_disability',
    category: 'adjustment',
    label: '対象児童が障害認定を受けていますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_child_disability_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_child_disability_yes', points: 1 },
    ],
  },
  {
    id: 'adj_multiple_births',
    category: 'adjustment',
    label: '多胎児（双子・三つ子など）ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_multiple_births_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_multiple_births_yes', points: 1 },
    ],
  },
  {
    id: 'adj_returning_parental_leave',
    category: 'adjustment',
    label: '親が育児休暇から復帰予定ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_returning_parental_leave_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_returning_parental_leave_yes', points: 2 },
    ],
  },
  {
    id: 'adj_three_children',
    category: 'adjustment',
    label: '世帯に3人以上の子どもがいますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_three_children_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_three_children_yes', points: 1 },
    ],
  },
  {
    id: 'adj_sibling_enrolled',
    category: 'adjustment',
    label: 'きょうだいが市内保育園に在園していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_enrolled_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_sibling_enrolled_yes', points: 2 },
    ],
  },
  {
    id: 'adj_multiple_siblings_applying',
    category: 'adjustment',
    label: '2人以上のきょうだいが同時入園申込していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_multiple_siblings_applying_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_multiple_siblings_applying_yes', points: 1 },
    ],
  },
  {
    id: 'adj_noncertified_childcare_60h',
    category: 'adjustment',
    label: '月60時間以上の無認可保育を1ヶ月以上利用していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_noncertified_childcare_60h_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_noncertified_childcare_60h_yes', points: 2 },
    ],
  },
  {
    id: 'adj_leaving_employer_facility',
    category: 'adjustment',
    label: '勤務先の無認可施設から1年以上経過して離職していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_leaving_employer_facility_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_leaving_employer_facility_yes', points: 1 },
    ],
  },
  {
    id: 'adj_graduated_smallscale',
    category: 'adjustment',
    label: '小規模保育施設からの卒園児ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_graduated_smallscale_no', points: 0 },
      { label: 'はい（+4）', value: 'adj_graduated_smallscale_yes', points: 4 },
    ],
  },
  {
    id: 'adj_nonworking_household_member',
    category: 'adjustment',
    label: '世帯に非就労者（20〜64歳）がいますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_nonworking_household_member_no', points: 0 },
      { label: 'はい、1人（-2）', value: 'adj_nonworking_household_member_1', points: -2 },
      { label: 'はい、2人以上（-4以上）', value: 'adj_nonworking_household_member_2plus', points: -4 },
    ],
  },
  {
    id: 'adj_transfer_request',
    category: 'adjustment',
    label: '4月1日以外の転園申込ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_transfer_request_no', points: 0 },
      { label: 'はい（-8）', value: 'adj_transfer_request_yes', points: -8 },
    ],
  },
  {
    id: 'adj_nonresident_employer',
    category: 'adjustment',
    label: '市外在住で勤務先が市内ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_nonresident_employer_no', points: 0 },
      { label: 'はい（-15）', value: 'adj_nonresident_employer_yes', points: -15 },
    ],
  },
  {
    id: 'adj_childcare_fee_arrears',
    category: 'adjustment',
    label: '保育料が3ヶ月以上滞納していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_childcare_fee_arrears_no', points: 0 },
      { label: 'はい（-6）', value: 'adj_childcare_fee_arrears_yes', points: -6 },
    ],
  },
  {
    id: 'adj_willing_extend_parental_leave',
    category: 'adjustment',
    label: '必要に応じて育児休暇の延長が可能ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_willing_extend_parental_leave_no', points: 0 },
      { label: 'はい（-40）', value: 'adj_willing_extend_parental_leave_yes', points: -40 },
    ],
  },
];

export const naritaData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
} as const;
