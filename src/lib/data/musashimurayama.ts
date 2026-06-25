import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 武蔵村山市 保育施設利用調整基準データ
// 出典: 武蔵村山市 保育所等利用調整（入所選考）について
// https://www.city.musashimurayama.lg.jp/kosodate/azukeru/1012423/1012874.html
// ---------------------------------------------------------------------------
// sum方式。父母各最大50点。就労は週日数×1日時間で5段階。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'musashimurayama',
  name: '武蔵村山市',
  slug: 'musashimurayama',
  prefecture: '東京都',
  maxBasePoints: 100,
} as const;

const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '週5日以上・1日8時間以上', value: `${prefix}_employment_50`, points: 50 },
  { label: '週5日以上・1日7時間以上8時間未満', value: `${prefix}_employment_45`, points: 45 },
  { label: '週5日以上・1日6時間以上7時間未満', value: `${prefix}_employment_40`, points: 40 },
  { label: '週5日以上・1日4時間以上6時間未満', value: `${prefix}_employment_35`, points: 35 },
  { label: 'その他月48時間以上就労', value: `${prefix}_employment_15`, points: 15 },
];

const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '常時病臥または1か月以上入院', value: `${prefix}_illness_50`, points: 50 },
  { label: '通院加療中で保育困難', value: `${prefix}_illness_35`, points: 35 },
];

const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '身体障害者手帳1・2級／愛の手帳1〜3度／精神障害1・2級', value: `${prefix}_disability_50`, points: 50 },
  { label: '身体障害者手帳3・4級／精神障害3級', value: `${prefix}_disability_35`, points: 35 },
];

const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '要介護3〜5の方の常時介護', value: `${prefix}_care_50`, points: 50 },
  { label: '通院付添等の介護（週5日以上・1日4時間以上）', value: `${prefix}_care_40`, points: 40 },
  { label: 'その他の介護・看護', value: `${prefix}_care_20`, points: 20 },
];

const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '妊娠中または出産後', value: `${prefix}_childbirth_35`, points: 35 },
];

const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '就学中（月48時間以上の通学）', value: `${prefix}_education_35`, points: 35 },
];

const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動中（就労内定あり）', value: `${prefix}_jobseeking_10`, points: 10 },
  { label: '求職活動中（日中外出して活動）', value: `${prefix}_jobseeking_5`, points: 5 },
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
      label: `${parentLabel}の就労状況は？`,
      helpText: '週の勤務日数と1日の就労時間を選んでください',
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
      { label: 'はい（+10）', value: 'adj_single_parent_yes', points: 10 },
    ],
  },
  {
    id: 'adj_nursery_worker',
    category: 'adjustment',
    label: '保育従事者として就労していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_nursery_worker_no', points: 0 },
      { label: 'はい（+15）', value: 'adj_nursery_worker_yes', points: 15 },
    ],
  },
  {
    id: 'adj_parental_leave',
    category: 'adjustment',
    label: '育児休業後の復職予定ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_parental_leave_no', points: 0 },
      { label: 'はい（+5）', value: 'adj_parental_leave_yes', points: 5 },
    ],
  },
  {
    id: 'adj_unemployment',
    category: 'adjustment',
    label: '失業により速やかな就労が必要ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unemployment_no', points: 0 },
      { label: 'はい（+10）', value: 'adj_unemployment_yes', points: 10 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: 'きょうだいについて該当するものはありますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_no', points: 0 },
      { label: 'きょうだいが同じ園に在園中（+2）', value: 'adj_sibling_same', points: 2 },
      { label: '2人同時申込（+3）', value: 'adj_sibling_2', points: 3 },
      { label: '3人以上同時申込（+4）', value: 'adj_sibling_3plus', points: 4 },
    ],
  },
  {
    id: 'adj_regional_daycare',
    category: 'adjustment',
    label: '地域型保育事業に在園中ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_regional_daycare_no', points: 0 },
      { label: 'はい（+3）', value: 'adj_regional_daycare_yes', points: 3 },
    ],
  },
  {
    id: 'adj_idle_parent',
    category: 'adjustment',
    label: '同居の保護者が無職・求職中ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_idle_parent_no', points: 0 },
      { label: 'はい（-5）', value: 'adj_idle_parent_yes', points: -5 },
    ],
  },
];

export const musashimurayamaData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
