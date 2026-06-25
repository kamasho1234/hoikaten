import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 浦安市 保育園入園 利用調整基準データ
// 出典: 浦安市「令和8年度 認可保育所・認定こども園入所ガイドブック」
// https://www.city.urayasu.lg.jp/_res/projects/default_project/_page_/001/043/588/r8guidebook3.pdf
// ---------------------------------------------------------------------------
// 浦安市は「基準点数（父母の低い方の基本点を選択）＋ 調整点数」の加算方式。
// 基本点数は就労時間・疾病・障害・介護などの理由により決定される。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'urayasu',
  name: '浦安市',
  slug: 'urayasu',
  prefecture: '千葉県',
  maxBasePoints: 50,
} as const;

const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '1週間40時間以上', value: `${prefix}_employment_50`, points: 50 },
  { label: '1週間35時間以上40時間未満', value: `${prefix}_employment_45`, points: 45 },
  { label: '1週間30時間以上35時間未満', value: `${prefix}_employment_40`, points: 40 },
  { label: '1週間25時間以上30時間未満', value: `${prefix}_employment_35`, points: 35 },
  { label: '1週間16時間以上25時間未満', value: `${prefix}_employment_30`, points: 30 },
];

const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '1か月以上の入院（予定含む）', value: `${prefix}_illness_50`, points: 50 },
  { label: '常時臥床1か月以上', value: `${prefix}_illness_hospitalized`, points: 50 },
  { label: '医師が1か月以上安静を要すると診断', value: `${prefix}_illness_rest`, points: 40 },
  { label: '医師が1か月以上通院加療を要すると診断', value: `${prefix}_illness_clinic`, points: 30 },
];

const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '身体障害者手帳1・2級', value: `${prefix}_disability_50_1`, points: 50 },
  { label: '身体障害者手帳3・4級（聴覚障害の場合）', value: `${prefix}_disability_40`, points: 40 },
  { label: '身体障害者手帳4級（聴覚障害除く）・5級・6級・7級', value: `${prefix}_disability_30`, points: 30 },
];

const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '1か月以上入院付添い＋要介護3～5', value: `${prefix}_care_50_hospitalized`, points: 50 },
  { label: '要介護1～2の介護', value: `${prefix}_care_45`, points: 45 },
  { label: '要介護3～5の介護', value: `${prefix}_care_none_other`, points: 0 },
];

const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産前後（出産予定月の2か月前～出産月の2か月後）', value: `${prefix}_childbirth_50`, points: 50 },
];

const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動中（就職活動開始から1か月以内）', value: `${prefix}_jobseeking_20`, points: 20 },
];

const studyOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_study_none`, points: 0 },
  { label: '1週間64時間以上就学・技能習得のため通学', value: `${prefix}_study_50`, points: 50 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: '浦安市では保護者のうち低い方の基本点数が選考対象となります',
    inputType: 'select',
    options: [
      { label: '仕事をしている', value: `${prefix}_reason_employment`, points: 0 },
      { label: '病気の治療中', value: `${prefix}_reason_illness`, points: 0 },
      { label: '障害がある', value: `${prefix}_reason_disability`, points: 0 },
      { label: '介護・看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '出産の前後', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '仕事を探している', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '就学・技能習得中', value: `${prefix}_reason_study`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の就労時間（週当たり）は？`,
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
    {
      id: `${prefix}_study`,
      category,
      label: `${parentLabel}は就学・技能習得をしていますか？`,
      inputType: 'radio',
      options: studyOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_not_exist',
    category: 'adjustment',
    label: '保護者が死亡・行方不明・拘禁・未婚・離婚調停中の別居等ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_not_exist_no', points: 0 },
      { label: 'はい（+10）', value: 'adj_not_exist_yes', points: 10 },
    ],
  },
  {
    id: 'adj_hospitalization',
    category: 'adjustment',
    label: '利用開始予定日時点で1か月以上の入院が必要ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_hospitalization_no', points: 0 },
      { label: 'はい（+5）', value: 'adj_hospitalization_yes', points: 5 },
    ],
  },
  {
    id: 'adj_single_posting',
    category: 'adjustment',
    label: '利用開始予定日時点で単身赴任ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_posting_no', points: 0 },
      { label: 'はい（+5）', value: 'adj_single_posting_yes', points: 5 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護受給世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい（+7）', value: 'adj_welfare_yes', points: 7 },
    ],
  },
  {
    id: 'adj_nontaxable',
    category: 'adjustment',
    label: '市民税が非課税ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_nontaxable_no', points: 0 },
      { label: 'はい（+5）', value: 'adj_nontaxable_yes', points: 5 },
    ],
  },
  {
    id: 'adj_parental_leave_return',
    category: 'adjustment',
    label: '育児休業から復職しますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_parental_leave_return_no', points: 0 },
      { label: 'はい（+10）', value: 'adj_parental_leave_return_yes', points: 10 },
    ],
  },
  {
    id: 'adj_work_return',
    category: 'adjustment',
    label: '産前産後休暇または育児休業から職場復帰しますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_work_return_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_work_return_yes', points: 1 },
    ],
  },
  {
    id: 'adj_facility_staff',
    category: 'adjustment',
    label: '市内保育施設で保育士として勤務していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_facility_staff_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_facility_staff_yes', points: 1 },
    ],
  },
  {
    id: 'adj_unemployment',
    category: 'adjustment',
    label: '保護者が解雇・倒産で求職中ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unemployment_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_unemployment_yes', points: 1 },
    ],
  },
  {
    id: 'adj_disability_hand',
    category: 'adjustment',
    label: '保護者が障害者手帳等を持っていますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_disability_hand_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_disability_hand_yes', points: 1 },
    ],
  },
  {
    id: 'adj_other_care',
    category: 'adjustment',
    label: '保護者が保育に当たることができない18-64才の同居人がいますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_other_care_no', points: 0 },
      { label: 'はい', value: 'adj_other_care_yes', points: -1 },
    ],
  },
  {
    id: 'adj_sibling_in_facility',
    category: 'adjustment',
    label: 'きょうだいが市内認可保育所に在園していますか？',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_sibling_none', points: 0 },
      { label: 'はい、同じ施設希望（+1）', value: 'adj_sibling_same_facility', points: 1 },
    ],
  },
  {
    id: 'adj_siblings_multiple',
    category: 'adjustment',
    label: '未就学児のきょうだいが3人以上いますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_siblings_multiple_no', points: 0 },
      { label: 'はい（+4）', value: 'adj_siblings_multiple_yes_3', points: 4 },
      { label: '2人（+3）', value: 'adj_siblings_multiple_yes_2', points: 3 },
      { label: '1人（+2）', value: 'adj_siblings_multiple_yes_1', points: 2 },
    ],
  },
];

export const urayasuData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
