import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 茂原市 保育施設利用調整基準データ
// 出典: 茂原市保育の利用等に関する規則 別表第1・第2
// https://www1.g-reiki.net/city.mobara.chiba/reiki_honbun/n800RG00000513.html
// ---------------------------------------------------------------------------
// sum方式。父母各最大10点。居宅外就労9点/居宅内就労8点。ひとり親加算+10は調整扱い。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'mobara',
  name: '茂原市',
  slug: 'mobara',
  prefecture: '千葉県',
  maxBasePoints: 20,
} as const;

const outsideEmploymentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_outside_none`, points: 0 },
  { label: '1日8時間以上・月20日以上（9点）', value: `${prefix}_outside_9`, points: 9 },
  { label: '1日6時間以上・月20日以上 または 1日8時間以上・月15日以上（8点）', value: `${prefix}_outside_8`, points: 8 },
  { label: '1日4時間以上・月20日以上 または 1日6時間以上・月15日以上（7点）', value: `${prefix}_outside_7`, points: 7 },
  { label: '1日4時間以上・月15日以上 または 1日8時間以上・月12日以上（6点）', value: `${prefix}_outside_6`, points: 6 },
  { label: '1日6時間以上・月12日以上 または 月64時間以上（5点）', value: `${prefix}_outside_5`, points: 5 },
];

const insideEmploymentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_inside_none`, points: 0 },
  { label: '1日8時間以上・月20日以上（8点）', value: `${prefix}_inside_8`, points: 8 },
  { label: '1日6時間以上・月20日以上 または 1日8時間以上・月15日以上（7点）', value: `${prefix}_inside_7`, points: 7 },
  { label: '1日4時間以上・月20日以上 または 1日6時間以上・月15日以上（6点）', value: `${prefix}_inside_6`, points: 6 },
  { label: '1日4時間以上・月15日以上 または 1日8時間以上・月12日以上（5点）', value: `${prefix}_inside_5`, points: 5 },
  { label: '1日6時間以上・月12日以上 または 月64時間以上（4点）', value: `${prefix}_inside_4`, points: 4 },
];

const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院中（10点）', value: `${prefix}_illness_10`, points: 10 },
  { label: '自宅療養（常時臥床）（9点）', value: `${prefix}_illness_9`, points: 9 },
  { label: '通院加療（保育困難）（6点）', value: `${prefix}_illness_6`, points: 6 },
];

const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '身体障害1・2級 / 精神障害1級 / 療育手帳A（9点）', value: `${prefix}_disability_9`, points: 9 },
  { label: '身体障害3・4級 / 精神障害2級 / 療育手帳B（8点）', value: `${prefix}_disability_8`, points: 8 },
];

const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '病院等への付添い（常時）（9点）', value: `${prefix}_care_9`, points: 9 },
  { label: '在宅介護（常時）（6点）', value: `${prefix}_care_6`, points: 6 },
  { label: '在宅介護（週3日以上）（5点）', value: `${prefix}_care_5`, points: 5 },
];

const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産前後（予定日2か月前〜産後2か月）（9点）', value: `${prefix}_childbirth_9`, points: 9 },
];

const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '月20日以上・1日8時間以上（8点）', value: `${prefix}_education_8`, points: 8 },
  { label: '月15日以上・1日6時間以上（6点）', value: `${prefix}_education_6`, points: 6 },
  { label: '月12日以上・1日4時間以上（4点）', value: `${prefix}_education_4`, points: 4 },
  { label: '月64時間以上（3点）', value: `${prefix}_education_3`, points: 3 },
];

const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '災害復旧にあたっている（10点）', value: `${prefix}_disaster_10`, points: 10 },
];

const parentalLeaveOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_parental_leave_none`, points: 0 },
  { label: '育児休業中（復帰予定あり）（2点）', value: `${prefix}_parental_leave_2`, points: 2 },
];

const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動中（1点）', value: `${prefix}_jobseeking_1`, points: 1 },
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
      { label: '居宅外で働いている', value: `${prefix}_reason_outside_employment`, points: 0 },
      { label: '居宅内で働いている（自営等）', value: `${prefix}_reason_inside_employment`, points: 0 },
      { label: '病気・けが', value: `${prefix}_reason_illness`, points: 0 },
      { label: '障害', value: `${prefix}_reason_disability`, points: 0 },
      { label: '家族の介護・看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '出産の前後', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '学校・職業訓練', value: `${prefix}_reason_education`, points: 0 },
      { label: '災害復旧', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '育児休業中（復帰予定あり）', value: `${prefix}_reason_parental_leave`, points: 0 },
      { label: '仕事を探している', value: `${prefix}_reason_jobseeking`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_outside_employment`,
      category,
      label: `${parentLabel}の居宅外就労の状況は？`,
      inputType: 'radio',
      options: outsideEmploymentOptions(prefix),
    },
    {
      id: `${prefix}_inside_employment`,
      category,
      label: `${parentLabel}の居宅内就労の状況は？`,
      inputType: 'radio',
      options: insideEmploymentOptions(prefix),
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
      label: `${parentLabel}の障害の等級は？`,
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
      label: `${parentLabel}は学校・職業訓練に通っていますか？`,
      inputType: 'radio',
      options: educationOptions(prefix),
    },
    {
      id: `${prefix}_disaster`,
      category,
      label: `${parentLabel}は災害復旧にあたっていますか？`,
      inputType: 'radio',
      options: disasterOptions(prefix),
    },
    {
      id: `${prefix}_parental_leave`,
      category,
      label: `${parentLabel}は育児休業中ですか？`,
      inputType: 'radio',
      options: parentalLeaveOptions(prefix),
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
    helpText: '別表第1の加算（+10点）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい（+10）', value: 'adj_single_parent_yes', points: 10 },
    ],
  },
  {
    id: 'adj_nursery_worker',
    category: 'adjustment',
    label: '保育士資格を持ち、市内の保育施設で就労していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_nursery_worker_no', points: 0 },
      { label: 'はい（+5）', value: 'adj_nursery_worker_yes', points: 5 },
    ],
  },
  {
    id: 'adj_single_parent_household',
    category: 'adjustment',
    label: '母子・父子世帯の状況は？',
    helpText: '別表第2の調整指数',
    inputType: 'radio',
    options: [
      { label: '該当しない', value: 'adj_single_parent_household_no', points: 0 },
      { label: '母子・父子世帯（同居親族なし）（+3）', value: 'adj_single_parent_household_3', points: 3 },
      { label: '母子・父子世帯（65歳未満の同居親族あり）（+1）', value: 'adj_single_parent_household_1', points: 1 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_welfare_yes', points: 2 },
    ],
  },
  {
    id: 'adj_parental_return',
    category: 'adjustment',
    label: '産後休暇・育児休業明けの復帰ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_parental_return_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_parental_return_yes', points: 2 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: 'きょうだいについて該当するものはありますか？',
    inputType: 'radio',
    options: [
      { label: '該当しない', value: 'adj_sibling_no', points: 0 },
      { label: 'きょうだいが既に認可保育施設に在園中（+2）', value: 'adj_sibling_enrolled', points: 2 },
      { label: 'きょうだいと同時申込（+1）', value: 'adj_sibling_simultaneous', points: 1 },
    ],
  },
  {
    id: 'adj_relative_under65',
    category: 'adjustment',
    label: '同居の65歳未満の親族（保護者以外）が児童を保育できる状況ですか？',
    inputType: 'radio',
    options: [
      { label: '該当しない', value: 'adj_relative_no', points: 0 },
      { label: 'はい（-2）', value: 'adj_relative_yes', points: -2 },
    ],
  },
  {
    id: 'adj_outside_city',
    category: 'adjustment',
    label: '市外からの申込ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ（市内在住）', value: 'adj_outside_city_no', points: 0 },
      { label: 'はい（市外在住）（-6）', value: 'adj_outside_city_yes', points: -6 },
    ],
  },
];

export const mobaraData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
