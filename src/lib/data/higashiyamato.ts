import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 東大和市 保育施設利用調整基準データ
// 出典: 東大和市 保育の利用基準表（令和7年度入園申請から適用）
// https://www.city.higashiyamato.lg.jp/kosodatekyoiku/hoiku/1003257/1006640/1003263.html
// ---------------------------------------------------------------------------
// sum方式。父母各最大50点。月間就労時間×日数で7段階。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'higashiyamato',
  name: '東大和市',
  slug: 'higashiyamato',
  prefecture: '東京都',
  maxBasePoints: 100,
} as const;

const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月20日以上かつ月160時間以上', value: `${prefix}_employment_50`, points: 50 },
  { label: '月140時間以上160時間未満', value: `${prefix}_employment_49`, points: 49 },
  { label: '月120時間以上140時間未満', value: `${prefix}_employment_47`, points: 47 },
  { label: '月100時間以上120時間未満', value: `${prefix}_employment_40`, points: 40 },
  { label: '月80時間以上100時間未満', value: `${prefix}_employment_38`, points: 38 },
  { label: '月60時間以上80時間未満', value: `${prefix}_employment_34`, points: 34 },
  { label: '月48時間以上60時間未満', value: `${prefix}_employment_29`, points: 29 },
];

const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院中・常時臥床', value: `${prefix}_illness_50`, points: 50 },
  { label: '医師の判断で保育困難', value: `${prefix}_illness_30`, points: 30 },
];

const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '身体障害者手帳1・2級／愛の手帳1〜3度／精神障害1・2級', value: `${prefix}_disability_50`, points: 50 },
  { label: '身体障害者手帳3・4級／精神障害3級', value: `${prefix}_disability_30`, points: 30 },
];

const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '常時介護が必要な親族の介護（入院付添等）', value: `${prefix}_care_50`, points: 50 },
  { label: '通院付添等の介護・看護', value: `${prefix}_care_30`, points: 30 },
];

const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産前後（産前2か月〜産後3か月）', value: `${prefix}_childbirth_40`, points: 40 },
];

const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '就学中（月120時間以上）', value: `${prefix}_education_40`, points: 40 },
  { label: '就学中（月48時間以上120時間未満）', value: `${prefix}_education_25`, points: 25 },
];

const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動中', value: `${prefix}_jobseeking_20`, points: 20 },
];

const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '災害復旧にあたっている', value: `${prefix}_disaster_50`, points: 50 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: '最も該当するものをひとつ選んでください',
    inputType: 'select',
    options: [
      { label: '仕事をしている', value: `${prefix}_reason_employment`, points: 0 },
      { label: '病気の治療中', value: `${prefix}_reason_illness`, points: 0 },
      { label: '障害がある', value: `${prefix}_reason_disability`, points: 0 },
      { label: '家族の介護・看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '出産の前後', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '学校に通っている', value: `${prefix}_reason_education`, points: 0 },
      { label: '仕事を探している', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '災害復旧', value: `${prefix}_reason_disaster`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の月間就労時間は？`,
      helpText: '1か月あたりの就労時間を選んでください',
      inputType: 'radio',
      options: employmentOptions(prefix),
    },
    {
      id: `${prefix}_illness`,
      category,
      label: `${parentLabel}の疾病の状況は？`,
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
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}の出産時期は？`,
      inputType: 'radio',
      options: childbirthOptions(prefix),
    },
    {
      id: `${prefix}_education`,
      category,
      label: `${parentLabel}は学校に通っていますか？`,
      inputType: 'radio',
      options: educationOptions(prefix),
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
      label: `${parentLabel}は災害復旧にあたっていますか？`,
      inputType: 'radio',
      options: disasterOptions(prefix),
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
      { label: 'はい（離別等から3か月以内）（+8）', value: 'adj_single_parent_8', points: 8 },
      { label: 'はい（3か月経過）（+7）', value: 'adj_single_parent_7', points: 7 },
    ],
  },
  {
    id: 'adj_parental_leave',
    category: 'adjustment',
    label: '育児休業からの復帰予定ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_parental_leave_no', points: 0 },
      { label: 'はい（+10）', value: 'adj_parental_leave_yes', points: 10 },
    ],
  },
  {
    id: 'adj_child_disability',
    category: 'adjustment',
    label: '入園希望児童に障害がありますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_child_disability_no', points: 0 },
      { label: 'はい（手帳所持等）（+6）', value: 'adj_child_disability_yes', points: 6 },
    ],
  },
  {
    id: 'adj_family_daycare_end',
    category: 'adjustment',
    label: '家庭的保育事業の利用期間が終了しますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_family_daycare_no', points: 0 },
      { label: 'はい（+5）', value: 'adj_family_daycare_yes', points: 5 },
    ],
  },
  {
    id: 'adj_multi_child',
    category: 'adjustment',
    label: 'お子さんの人数は？',
    inputType: 'radio',
    options: [
      { label: '1人', value: 'adj_multi_child_1', points: 0 },
      { label: '2人（+3）', value: 'adj_multi_child_2', points: 3 },
      { label: '3人以上または多胎児（+4）', value: 'adj_multi_child_3plus', points: 4 },
    ],
  },
  {
    id: 'adj_sibling_same',
    category: 'adjustment',
    label: 'きょうだいと同じ園を希望しますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_same_no', points: 0 },
      { label: 'はい（+3）', value: 'adj_sibling_same_yes', points: 3 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護を受給していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい（+3）', value: 'adj_welfare_yes', points: 3 },
    ],
  },
  {
    id: 'adj_nursery_worker',
    category: 'adjustment',
    label: '市内の保育施設で保育業務に従事していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_nursery_worker_no', points: 0 },
      { label: 'はい（月120時間以上）（+3）', value: 'adj_nursery_worker_3', points: 3 },
      { label: 'はい（月48時間以上120時間未満）（+1）', value: 'adj_nursery_worker_1', points: 1 },
    ],
  },
  {
    id: 'adj_transfer',
    category: 'adjustment',
    label: '転勤による保育の必要性がありますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_transfer_no', points: 0 },
      { label: '海外赴任（+2）', value: 'adj_transfer_overseas', points: 2 },
      { label: '国内赴任（+1）', value: 'adj_transfer_domestic', points: 1 },
    ],
  },
  {
    id: 'adj_unauthorized',
    category: 'adjustment',
    label: '認可外保育施設を利用していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unauthorized_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_unauthorized_yes', points: 1 },
    ],
  },
  {
    id: 'adj_night_work',
    category: 'adjustment',
    label: '深夜勤務をしていますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_night_work_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_night_work_yes', points: 1 },
    ],
  },
  {
    id: 'adj_delinquent',
    category: 'adjustment',
    label: '保育料の滞納がありますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_delinquent_no', points: 0 },
      { label: 'はい（6か月以上の滞納）（-3）', value: 'adj_delinquent_yes', points: -3 },
    ],
  },
];

export const higashiyamatoData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
