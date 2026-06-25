import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 鎌倉市 保育園入園 利用調整基準データ
// 出典: 鎌倉市「令和8年度 利用調整基準表」
// https://www.city.kamakura.kanagawa.jp/hoiku/r8hoikuen-nyusyo.html
// ---------------------------------------------------------------------------
// 鎌倉市は「基準点数（父母それぞれ最大20点）＋ 調整点数」の加算方式。
// 合計基準点数最大40点。月の就労時間で判定。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'kamakura',
  name: '鎌倉市',
  slug: 'kamakura',
  prefecture: '神奈川県',
  maxBasePoints: 40,
} as const;

const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月160時間以上', value: `${prefix}_employment_20`, points: 20 },
  { label: '月140時間以上160時間未満', value: `${prefix}_employment_19`, points: 19 },
  { label: '月120時間以上140時間未満', value: `${prefix}_employment_18`, points: 18 },
  { label: '月100時間以上120時間未満', value: `${prefix}_employment_17`, points: 17 },
  { label: '月80時間以上100時間未満', value: `${prefix}_employment_16`, points: 16 },
  { label: '月64時間以上80時間未満', value: `${prefix}_employment_15`, points: 15 },
];

const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '1か月以上入院 / 常時病臥', value: `${prefix}_illness_20`, points: 20 },
  { label: '慢性疾患等で自宅療養', value: `${prefix}_illness_16`, points: 16 },
];

const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '身体障害者手帳1・2級 / 精神1・2・3級 / 療育A', value: `${prefix}_disability_20`, points: 20 },
  { label: '身体障害者手帳3・4級 / 療育B', value: `${prefix}_disability_18`, points: 18 },
  { label: '上記以外で障害あり', value: `${prefix}_disability_16`, points: 16 },
];

const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '月160時間以上', value: `${prefix}_care_20`, points: 20 },
  { label: '月140時間以上160時間未満', value: `${prefix}_care_19`, points: 19 },
  { label: '月120時間以上140時間未満', value: `${prefix}_care_18`, points: 18 },
  { label: '月100時間以上120時間未満', value: `${prefix}_care_17`, points: 17 },
  { label: '月80時間以上100時間未満', value: `${prefix}_care_16`, points: 16 },
  { label: '月64時間以上80時間未満', value: `${prefix}_care_15`, points: 15 },
];

const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: 'はい', value: `${prefix}_childbirth_20`, points: 20 },
];

const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: 'はい', value: `${prefix}_jobseeking_12`, points: 12 },
];

const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '月160時間以上', value: `${prefix}_disaster_20`, points: 20 },
  { label: '月140時間以上160時間未満', value: `${prefix}_disaster_19`, points: 19 },
  { label: '月120時間以上140時間未満', value: `${prefix}_disaster_18`, points: 18 },
  { label: '月100時間以上120時間未満', value: `${prefix}_disaster_17`, points: 17 },
  { label: '月80時間以上100時間未満', value: `${prefix}_disaster_16`, points: 16 },
  { label: '月64時間以上80時間未満', value: `${prefix}_disaster_15`, points: 15 },
];

const studyOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_study_none`, points: 0 },
  { label: '月160時間以上', value: `${prefix}_study_20`, points: 20 },
  { label: '月140時間以上160時間未満', value: `${prefix}_study_19`, points: 19 },
  { label: '月120時間以上140時間未満', value: `${prefix}_study_18`, points: 18 },
  { label: '月100時間以上120時間未満', value: `${prefix}_study_17`, points: 17 },
  { label: '月80時間以上100時間未満', value: `${prefix}_study_16`, points: 16 },
  { label: '月64時間以上80時間未満', value: `${prefix}_study_15`, points: 15 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: '鎌倉市では父母それぞれの基準点数（各最大20点）の合計で選考されます',
    inputType: 'select',
    options: [
      { label: '仕事をしている', value: `${prefix}_reason_employment`, points: 0 },
      { label: '病気の治療中', value: `${prefix}_reason_illness`, points: 0 },
      { label: '障害がある', value: `${prefix}_reason_disability`, points: 0 },
      { label: '介護・看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '出産の前後', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '仕事を探している', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '災害復旧', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '就学', value: `${prefix}_reason_study`, points: 0 },
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
      label: `${parentLabel}の介護・看護時間（月あたり）は？`,
      inputType: 'radio',
      options: careOptions(prefix),
    },
    {
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}は妊娠・出産中ですか？`,
      inputType: 'radio',
      options: childbirthOptions(prefix),
    },
    {
      id: `${prefix}_jobseeking`,
      category,
      label: `${parentLabel}は求職活動中ですか？`,
      inputType: 'radio',
      options: jobSeekingOptions(prefix),
    },
    {
      id: `${prefix}_disaster`,
      category,
      label: `${parentLabel}の災害復旧時間（月あたり）は？`,
      inputType: 'radio',
      options: disasterOptions(prefix),
    },
    {
      id: `${prefix}_study`,
      category,
      label: `${parentLabel}の就学時間（月あたり）は？`,
      inputType: 'radio',
      options: studyOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい（+20）', value: 'adj_single_parent_yes', points: 20 },
    ],
  },
  {
    id: 'adj_sibling_same_facility',
    category: 'adjustment',
    label: 'きょうだいが在園していますか？',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_sibling_same_no', points: 0 },
      { label: 'きょうだい在園（+5）', value: 'adj_sibling_yes', points: 5 },
    ],
  },
  {
    id: 'adj_sibling_concurrent',
    category: 'adjustment',
    label: 'きょうだいと同時に申込していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_concurrent_no', points: 0 },
      { label: 'はい（+3）', value: 'adj_sibling_concurrent_yes', points: 3 },
    ],
  },
  {
    id: 'adj_multiple_birth',
    category: 'adjustment',
    label: '多胎児ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_multiple_birth_no', points: 0 },
      { label: 'はい（+3）', value: 'adj_multiple_birth_yes', points: 3 },
    ],
  },
  {
    id: 'adj_large_family',
    category: 'adjustment',
    label: '18歳未満のお子さんが3人以上いますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_large_family_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_large_family_yes', points: 2 },
    ],
  },
  {
    id: 'adj_prior_year_waiting',
    category: 'adjustment',
    label: '前年度に利用調整で保留になりましたか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_prior_year_no', points: 0 },
      { label: 'はい（+8）', value: 'adj_prior_year_yes', points: 8 },
    ],
  },
  {
    id: 'adj_parental_leave_return',
    category: 'adjustment',
    label: '育休から復帰しますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_parental_leave_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_parental_leave_yes', points: 2 },
    ],
  },
  {
    id: 'adj_unauthorized_facility',
    category: 'adjustment',
    label: '認可外保育施設を月64時間以上有償で利用していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unauthorized_no', points: 0 },
      { label: 'はい（+8）', value: 'adj_unauthorized_yes', points: 8 },
    ],
  },
  {
    id: 'adj_childcare_worker_full',
    category: 'adjustment',
    label: '市内認可保育施設で月120時間以上勤務する保育士ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_childcare_worker_full_no', points: 0 },
      { label: 'はい（+20）', value: 'adj_childcare_worker_full_yes', points: 20 },
    ],
  },
  {
    id: 'adj_childcare_worker_part',
    category: 'adjustment',
    label: '市内認可保育施設で月64時間以上勤務する保育士ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_childcare_worker_part_no', points: 0 },
      { label: 'はい（+15）', value: 'adj_childcare_worker_part_yes', points: 15 },
    ],
  },
  {
    id: 'adj_nurse_medical',
    category: 'adjustment',
    label: '市内認可保育施設に勤務する看護師・医師ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_nurse_medical_no', points: 0 },
      { label: 'はい（+5）', value: 'adj_nurse_medical_yes', points: 5 },
    ],
  },
  {
    id: 'adj_single_assignment',
    category: 'adjustment',
    label: '単身赴任等の事情がありますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_assignment_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_single_assignment_yes', points: 2 },
    ],
  },
  {
    id: 'adj_disability_household',
    category: 'adjustment',
    label: 'ご家族に身体障害者手帳をお持ちの方がいますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_disability_household_no', points: 0 },
      { label: 'はい（+4）', value: 'adj_disability_household_yes', points: 4 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護受給世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_welfare_yes', points: 2 },
    ],
  },
  {
    id: 'adj_out_of_city',
    category: 'adjustment',
    label: '市外に居住していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_out_of_city_no', points: 0 },
      { label: 'はい（-30）', value: 'adj_out_of_city_yes', points: -30 },
    ],
  },
];

export const kamakuraData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
