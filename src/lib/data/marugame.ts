import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 丸亀市 保育施設等利用調整基準（令和8年度）
// 出典: 令和8年度 教育・保育施設等利用ガイド p38
// https://www.city.marugame.lg.jp/uploaded/attachment/24124.pdf
// ---------------------------------------------------------------------------
// min方式（父母のいずれか低い方の基本指数+調整指数）。最大12点/親。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'marugame',
  name: '丸亀市',
  slug: 'marugame',
  prefecture: '香川県',
  maxBasePoints: 12,
  scoringMethod: 'min' as const,
} as const;

const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '居宅外・居宅内労働：月150時間以上', value: `${prefix}_employment_12`, points: 12 },
  { label: '居宅外・居宅内労働：月120時間以上150時間未満', value: `${prefix}_employment_10`, points: 10 },
  { label: '居宅外・居宅内労働：月80時間以上120時間未満', value: `${prefix}_employment_8`, points: 8 },
  { label: '居宅外・居宅内労働：月64時間以上80時間未満', value: `${prefix}_employment_7`, points: 7 },
  { label: '内職：月150時間以上', value: `${prefix}_employment_naishoku_8`, points: 8 },
  { label: '内職：月120時間以上150時間未満', value: `${prefix}_employment_naishoku_7`, points: 7 },
  { label: '内職：月80時間以上120時間未満', value: `${prefix}_employment_naishoku_6`, points: 6 },
  { label: '内職：月64時間以上80時間未満', value: `${prefix}_employment_naishoku_5`, points: 5 },
];

const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '月150時間以上の就学', value: `${prefix}_education_10`, points: 10 },
  { label: '月120時間以上150時間未満の就学', value: `${prefix}_education_9`, points: 9 },
  { label: '月80時間以上120時間未満の就学', value: `${prefix}_education_7`, points: 7 },
  { label: '月64時間以上80時間未満の就学', value: `${prefix}_education_6`, points: 6 },
];

const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院（1ヶ月以上）', value: `${prefix}_illness_12a`, points: 12 },
  { label: '常時臥床', value: `${prefix}_illness_12b`, points: 12 },
  { label: '居宅内安静（1ヶ月以上）又は日常動作に支障', value: `${prefix}_illness_9`, points: 9 },
  { label: '通院加療が必要', value: `${prefix}_illness_7`, points: 7 },
];

const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '身体1-2級 / 精神1-2級 / 療育2級・A / 要介護3-5', value: `${prefix}_disability_12`, points: 12 },
  { label: '身体3級 / 精神3級 / 療育B / 要介護1-2', value: `${prefix}_disability_9`, points: 9 },
  { label: '身体4-6級 / 要支援', value: `${prefix}_disability_7`, points: 7 },
];

const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '重度障害者等の常時介護・看護（指数12相当-3=9）', value: `${prefix}_care_9`, points: 9 },
  { label: '中度障害者等の常時介護・看護（指数9相当-3=6）', value: `${prefix}_care_6`, points: 6 },
  { label: '軽度障害者等の常時介護・看護（指数7相当-3=4）', value: `${prefix}_care_4`, points: 4 },
];

const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産のため保育ができない', value: `${prefix}_childbirth_10`, points: 10 },
];

const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動中', value: `${prefix}_jobseeking_4`, points: 4 },
];

const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '災害復旧に従事', value: `${prefix}_disaster_12`, points: 12 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: '丸亀市では父母のいずれか低い方の基本指数で選考します（最大12点）',
    inputType: 'select',
    options: [
      { label: '仕事をしている', value: `${prefix}_reason_employment`, points: 0 },
      { label: '学校に通っている', value: `${prefix}_reason_education`, points: 0 },
      { label: '病気・負傷の治療中', value: `${prefix}_reason_illness`, points: 0 },
      { label: '障害がある', value: `${prefix}_reason_disability`, points: 0 },
      { label: '家族の介護・看護', value: `${prefix}_reason_care`, points: 0 },
      ...(parentNum === 2 ? [{ label: '妊娠・出産', value: `${prefix}_reason_childbirth`, points: 0 }] : []),
      { label: '災害復旧', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '仕事を探している', value: `${prefix}_reason_jobseeking`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の就労状況は？`,
      helpText: '実働時間で判定。内職は居宅外・居宅内労働より優先度が低い',
      inputType: 'radio',
      options: employmentOptions(prefix),
    },
    {
      id: `${prefix}_education`,
      category,
      label: `${parentLabel}は学校に通っていますか？`,
      inputType: 'radio',
      options: educationOptions(prefix),
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
      helpText: '障害の細目指数から3を減じた指数を準用',
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
    id: 'adj_reenrollment',
    category: 'adjustment',
    label: '在園施設が認定こども園・認可保育所に移行しましたか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_reenrollment_no', points: 0 },
      { label: 'はい（+20）', value: 'adj_reenrollment_yes', points: 20 },
    ],
  },
  {
    id: 'adj_small_nursery',
    category: 'adjustment',
    label: '地域型保育事業の修了児童ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_small_nursery_no', points: 0 },
      { label: 'はい（+5）', value: 'adj_small_nursery_yes', points: 5 },
    ],
  },
  {
    id: 'adj_nursery_worker',
    category: 'adjustment',
    label: '保護者が教育・保育施設で勤務していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_nursery_worker_no', points: 0 },
      { label: '保育士・幼稚園教諭として勤務（月120時間以上、+4）', value: 'adj_nursery_worker_4', points: 4 },
      { label: 'その他の職種で勤務（月80時間以上、+2）', value: 'adj_nursery_worker_2', points: 2 },
    ],
  },
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親家庭ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい（+3）', value: 'adj_single_parent_yes', points: 3 },
    ],
  },
  {
    id: 'adj_first_choice',
    category: 'adjustment',
    label: '希望施設は第1希望ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_first_choice_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_first_choice_yes', points: 2 },
    ],
  },
  {
    id: 'adj_parental_leave',
    category: 'adjustment',
    label: '産休・育休からの復帰予定ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_parental_leave_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_parental_leave_yes', points: 2 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯ですか？（就労による自立支援の場合）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_welfare_yes', points: 2 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: '希望施設にきょうだいが在園していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_no', points: 0 },
      { label: '1人在園（+1）', value: 'adj_sibling_1', points: 1 },
      { label: '2人以上在園（+2）', value: 'adj_sibling_2', points: 2 },
    ],
  },
  {
    id: 'adj_twin',
    category: 'adjustment',
    label: '多胎児ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_twin_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_twin_yes', points: 1 },
    ],
  },
  {
    id: 'adj_employment_plan',
    category: 'adjustment',
    label: '就労予定又は自営準備中ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ（該当しない）', value: 'adj_employment_plan_no', points: 0 },
      { label: 'はい（-1）', value: 'adj_employment_plan_yes', points: -1 },
    ],
  },
  {
    id: 'adj_family_unpaid',
    category: 'adjustment',
    label: '家族従事者として無報酬で勤務していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ（該当しない）', value: 'adj_family_unpaid_no', points: 0 },
      { label: 'はい（-1）', value: 'adj_family_unpaid_yes', points: -1 },
    ],
  },
  {
    id: 'adj_declined',
    category: 'adjustment',
    label: '過去に希望施設への入所内定を辞退しましたか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_declined_no', points: 0 },
      { label: 'はい（-3）', value: 'adj_declined_yes', points: -3 },
    ],
  },
];

export const marugameData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
