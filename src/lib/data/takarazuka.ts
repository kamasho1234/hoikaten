import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 宝塚市 保育施設入所順位基礎指数表・調整指数表（令和8年度）
// 出典: 保育施設利用のご案内
// https://www.city.takarazuka.hyogo.jp/_res/projects/default_project/_page_/001/027/922/20260414sassi.pdf
// ---------------------------------------------------------------------------
// sum方式（父母の基礎指数合算+調整指数）。各親最大15点（合計30点）。
// 父母それぞれに該当する指数の最も高い1項目のみ適用。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'takarazuka',
  name: '宝塚市',
  slug: 'takarazuka',
  prefecture: '兵庫県',
  maxBasePoints: 30,
} as const;

const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '週4日以上かつ1日7時間以上の就労・通学', value: `${prefix}_employment_10`, points: 10 },
  { label: '月64時間以上の就労・通学', value: `${prefix}_employment_6`, points: 6 },
];

const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院', value: `${prefix}_illness_15`, points: 15 },
  { label: '常時安静', value: `${prefix}_illness_12`, points: 12 },
  { label: '一般加療', value: `${prefix}_illness_6`, points: 6 },
  { label: '通院（比較的軽度で定期通院が必要）', value: `${prefix}_illness_3`, points: 3 },
];

const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '身体・精神1-2級 / 療育A / 要介護4-5', value: `${prefix}_disability_8`, points: 8 },
  { label: '身体・精神3-4級 / 療育B / 要介護1-2-3', value: `${prefix}_disability_4`, points: 4 },
];

const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '入院者の介護（月64時間以上）', value: `${prefix}_care_7`, points: 7 },
  { label: '障害者施設通園付添い（月64時間以上）', value: `${prefix}_care_6a`, points: 6 },
  { label: '常時臥床・要安静者の介護（月64時間以上）', value: `${prefix}_care_6b`, points: 6 },
  { label: '重度障害者の介護（1-2級/A/要介護4-5、月64時間以上）', value: `${prefix}_care_4`, points: 4 },
  { label: '一般加療者の介護（月64時間以上）', value: `${prefix}_care_3`, points: 3 },
  { label: '軽度障害者の介護（3-4級/B/要介護1-2-3、月64時間以上）', value: `${prefix}_care_2`, points: 2 },
];

const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '多胎児を妊娠中', value: `${prefix}_childbirth_14`, points: 14 },
  { label: '単胎児を妊娠中', value: `${prefix}_childbirth_12`, points: 12 },
];

const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '災害復旧に従事', value: `${prefix}_disaster_10`, points: 10 },
];

const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職中・就労予定', value: `${prefix}_jobseeking_1`, points: 1 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonOptions = [
    { label: '仕事をしている・通学中', value: `${prefix}_reason_employment`, points: 0 },
    { label: '病気・負傷の治療中', value: `${prefix}_reason_illness`, points: 0 },
    { label: '障害がある', value: `${prefix}_reason_disability`, points: 0 },
    { label: '家族の介護・看護', value: `${prefix}_reason_care`, points: 0 },
    ...(parentNum === 2 ? [{ label: '妊娠・出産', value: `${prefix}_reason_childbirth`, points: 0 }] : []),
    { label: '災害復旧', value: `${prefix}_reason_disaster`, points: 0 },
    { label: '仕事を探している', value: `${prefix}_reason_jobseeking`, points: 0 },
  ];

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: '宝塚市では父母それぞれの最も高い1項目のみ適用し合算します（各最大15点、合計30点）',
    inputType: 'select',
    options: reasonOptions,
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の就労・通学の状況は？`,
      helpText: '休憩時間を含む。通学時間も含む（月64h以上で介護時間との合算可）',
      inputType: 'radio',
      options: employmentOptions(prefix),
    },
    {
      id: `${prefix}_illness`,
      category,
      label: `${parentLabel}の疾病・負傷の状況は？`,
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
    ...(parentNum === 2 ? [{
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}の出産の状況は？`,
      inputType: 'radio' as const,
      options: childbirthOptions(prefix),
    }] : []),
    {
      id: `${prefix}_disaster`,
      category,
      label: `${parentLabel}は災害復旧に従事していますか？`,
      inputType: 'radio',
      options: disasterOptions(prefix),
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
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親世帯ですか？',
    helpText: '父又は母が死亡・離別・行方不明の場合。いない方の基礎指数は0点として+16点加算',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい（+16）', value: 'adj_single_parent_yes', points: 16 },
    ],
  },
  {
    id: 'adj_single_no_grandparent',
    category: 'adjustment',
    label: 'ひとり親で祖父母と同居していませんか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ（該当しない）', value: 'adj_single_no_grandparent_no', points: 0 },
      { label: 'はい（+3）', value: 'adj_single_no_grandparent_yes', points: 3 },
    ],
  },
  {
    id: 'adj_parental_leave',
    category: 'adjustment',
    label: '産前産後休暇・育児休業から復職予定ですか？',
    helpText: '月64時間以上の就労で、入所希望月初日が休職期間内又は終了日翌日の場合',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_parental_leave_no', points: 0 },
      { label: 'はい（+3）', value: 'adj_parental_leave_yes', points: 3 },
    ],
  },
  {
    id: 'adj_transfer',
    category: 'adjustment',
    label: '父又は母が単身赴任等で常時不在ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_transfer_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_transfer_yes', points: 1 },
    ],
  },
  {
    id: 'adj_unemployment',
    category: 'adjustment',
    label: '生計中心者が失業により就労の必要性が高いですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unemployment_no', points: 0 },
      { label: 'はい（+3）', value: 'adj_unemployment_yes', points: 3 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい（+6）', value: 'adj_welfare_yes', points: 6 },
    ],
  },
  {
    id: 'adj_nursery_worker',
    category: 'adjustment',
    label: '保育士資格・幼稚園教諭免許を持つ保護者が保育業務に従事していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_nursery_worker_no', points: 0 },
      { label: '宝塚市内の施設で月64時間以上勤務（+5）', value: 'adj_nursery_worker_5', points: 5 },
      { label: '教育・保育施設で勤務（+2）', value: 'adj_nursery_worker_2', points: 2 },
    ],
  },
  {
    id: 'adj_current_care',
    category: 'adjustment',
    label: '月極で認可外保育所等に入所していますか？',
    helpText: '1日4時間以上の利用が週4日以上又は月13日以上。在園証明書の提出が必要',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_current_care_no', points: 0 },
      { label: 'はい（+5）', value: 'adj_current_care_yes', points: 5 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: 'きょうだいが宝塚市の認可保育施設に在園していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_no', points: 0 },
      { label: 'はい（+6）', value: 'adj_sibling_yes', points: 6 },
    ],
  },
  {
    id: 'adj_sibling_simultaneous',
    category: 'adjustment',
    label: 'きょうだいと同時に入所を希望しますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_simultaneous_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_sibling_simultaneous_yes', points: 2 },
    ],
  },
  {
    id: 'adj_twin_simultaneous',
    category: 'adjustment',
    label: '多胎児（双子等）で同時入所を希望しますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_twin_simultaneous_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_twin_simultaneous_yes', points: 2 },
    ],
  },
];

export const takarazukaData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
