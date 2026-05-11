import type { MunicipalityData, Question } from '../types';

// 出典: 令和8年度浦添市保育所等入所基準表
// https://www.city.urasoe.lg.jp/doc/2025071500035

const municipality = {
  id: 'urasoe',
  name: '浦添市',
  slug: 'urasoe',
  prefecture: '沖縄県',
  maxBasePoints: 40, // 父母各20点
} as const;

const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月160時間以上', value: `${prefix}_employment_20`, points: 20 },
  { label: '月140時間以上160時間未満', value: `${prefix}_employment_18`, points: 18 },
  { label: '月120時間以上140時間未満', value: `${prefix}_employment_16`, points: 16 },
  { label: '月100時間以上120時間未満', value: `${prefix}_employment_14`, points: 14 },
  { label: '月80時間以上100時間未満', value: `${prefix}_employment_12`, points: 12 },
  { label: '月64時間以上80時間未満', value: `${prefix}_employment_10`, points: 10 },
];

const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院（1ヶ月以上）または常時寝たきり', value: `${prefix}_illness_20`, points: 20 },
  { label: '6ヶ月超の長期治療が必要', value: `${prefix}_illness_18`, points: 18 },
  { label: '3〜6ヶ月の治療が必要', value: `${prefix}_illness_14`, points: 14 },
];

const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '身体障害者手帳1・2級 / 精神障害者保健福祉手帳1・2級 / 療育手帳A1・A2・B1', value: `${prefix}_disability_20`, points: 20 },
  { label: '身体障害者手帳3級 / 精神障害者保健福祉手帳3級 / 療育手帳B2', value: `${prefix}_disability_18`, points: 18 },
  { label: '身体障害者手帳4級', value: `${prefix}_disability_16`, points: 16 },
];

const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '生活全般で全面的な介助が必要（要介護5相当）', value: `${prefix}_care_20`, points: 20 },
  { label: '排せつ・入浴等に全面的な介助が必要（要介護3・4相当）', value: `${prefix}_care_18`, points: 18 },
  { label: '排せつ・入浴等に介助が必要（要介護1・2相当）', value: `${prefix}_care_15`, points: 15 },
  { label: 'その他の介護・看護', value: `${prefix}_care_10`, points: 10 },
];

const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '妊娠中〜産後5ヶ月経過する月末まで', value: `${prefix}_childbirth_12`, points: 12 },
];

const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '月160時間以上', value: `${prefix}_education_20`, points: 20 },
  { label: '月140時間以上160時間未満', value: `${prefix}_education_18`, points: 18 },
  { label: '月120時間以上140時間未満', value: `${prefix}_education_16`, points: 16 },
  { label: '月100時間以上120時間未満', value: `${prefix}_education_14`, points: 14 },
  { label: '月80時間以上100時間未満', value: `${prefix}_education_12`, points: 12 },
  { label: '月64時間以上80時間未満', value: `${prefix}_education_10`, points: 10 },
];

const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動中', value: `${prefix}_jobseeking_8`, points: 8 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: 'いちばん近いものをひとつ選んでください',
    inputType: 'select',
    options: [
      { label: '仕事をしている', value: `${prefix}_reason_employment`, points: 0 },
      { label: '病気・けがの治療中', value: `${prefix}_reason_illness`, points: 0 },
      { label: '障がいがある', value: `${prefix}_reason_disability`, points: 0 },
      { label: '家族の介護をしている', value: `${prefix}_reason_care`, points: 0 },
      { label: '出産の前後', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '学校に通っている', value: `${prefix}_reason_education`, points: 0 },
      { label: '仕事を探している', value: `${prefix}_reason_jobseeking`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}はどのくらい働いていますか？`,
      helpText: '月あたりの就労時間を選んでください',
      inputType: 'radio',
      options: employmentOptions(prefix),
    },
    {
      id: `${prefix}_illness`,
      category,
      label: `${parentLabel}の病気・けがの状況は？`,
      inputType: 'radio',
      options: illnessOptions(prefix),
    },
    {
      id: `${prefix}_disability`,
      category,
      label: `${parentLabel}の障がいの程度は？`,
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
      helpText: '月あたりの授業・学習時間を選んでください',
      inputType: 'radio',
      options: educationOptions(prefix),
    },
    {
      id: `${prefix}_jobseeking`,
      category,
      label: `${parentLabel}の求職活動の状況は？`,
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
    label: 'ひとり親世帯（母子・父子）ですか？',
    helpText: '離婚調停中も含む',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい', value: 'adj_single_parent_yes', points: 46 },
    ],
  },
  {
    id: 'adj_parental_leave',
    category: 'adjustment',
    label: '育休前に在園していて職場復帰に伴い再利用を希望しますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_parental_leave_no', points: 0 },
      { label: 'はい', value: 'adj_parental_leave_yes', points: 20 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい', value: 'adj_welfare_yes', points: 3 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: 'きょうだいが在園中の保育所等への入所を希望しますか？',
    helpText: '申込児童が未在園で、きょうだいが在園している施設を希望する場合',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_no', points: 0 },
      { label: 'はい', value: 'adj_sibling_yes', points: 3 },
    ],
  },
  {
    id: 'adj_sibling_simultaneous',
    category: 'adjustment',
    label: 'きょうだいと同時に同一施設への申し込みをしますか？',
    helpText: 'きょうだいが新規または転園申込をする場合に限る',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_simultaneous_no', points: 0 },
      { label: 'はい', value: 'adj_sibling_simultaneous_yes', points: 1 },
    ],
  },
  {
    id: 'adj_nursery_worker',
    category: 'adjustment',
    label: '沖縄本島内の認可保育所等で保育士として勤務していますか？',
    helpText: '認可保育所等の保育士・特例的運用保育士（幼稚園教諭・小学校教諭・養護教諭）として勤務または復職予定（新規申込に限る）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_nursery_worker_no', points: 0 },
      { label: 'はい', value: 'adj_nursery_worker_yes', points: 18 },
    ],
  },
];

export const urasoeData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
