import type { MunicipalityData, Question } from '../types';

// 出典: 令和8年度宜野湾市保育所利用調整基準表
// https://www.city.ginowan.lg.jp/soshiki/kodomo/2/ninkahoikuen/18409.html

const municipality = {
  id: 'ginowan',
  name: '宜野湾市',
  slug: 'ginowan',
  prefecture: '沖縄県',
  maxBasePoints: 20, // 父母各10点
} as const;

const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月160時間以上', value: `${prefix}_employment_10`, points: 10 },
  { label: '月140時間以上160時間未満', value: `${prefix}_employment_9`, points: 9 },
  { label: '月120時間以上140時間未満', value: `${prefix}_employment_8`, points: 8 },
  { label: '月100時間以上120時間未満', value: `${prefix}_employment_7`, points: 7 },
  { label: '月80時間以上100時間未満', value: `${prefix}_employment_6`, points: 6 },
  { label: '月64時間以上80時間未満', value: `${prefix}_employment_5`, points: 5 },
];

const illnessDisabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '身体・精神障がい者手帳1・2級 / 療育手帳A1・A2・B1', value: `${prefix}_illness_10`, points: 10 },
  { label: '身体・精神障がい者手帳3級 / 療育手帳B2', value: `${prefix}_illness_8`, points: 8 },
  { label: '身体障がい者手帳4級以下 / 精神障がい者保健福祉手帳3級', value: `${prefix}_illness_6`, points: 6 },
  { label: '診断書（著しい制限）', value: `${prefix}_illness_5`, points: 5 },
  { label: '診断書（かなりの制限）', value: `${prefix}_illness_4`, points: 4 },
  { label: '診断書（中程度の制限）', value: `${prefix}_illness_3`, points: 3 },
  { label: '診断書（軽度の制限）', value: `${prefix}_illness_2`, points: 2 },
];

const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '月160時間以上の介護・看護', value: `${prefix}_care_10`, points: 10 },
  { label: '月120時間以上160時間未満の介護・看護', value: `${prefix}_care_8`, points: 8 },
  { label: '月64時間以上120時間未満の介護・看護', value: `${prefix}_care_5`, points: 5 },
];

const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '産前3ヶ月〜産後8週', value: `${prefix}_childbirth_6`, points: 6 },
];

const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '月160時間以上', value: `${prefix}_education_10`, points: 10 },
  { label: '月140時間以上160時間未満', value: `${prefix}_education_9`, points: 9 },
  { label: '月120時間以上140時間未満', value: `${prefix}_education_8`, points: 8 },
  { label: '月100時間以上120時間未満', value: `${prefix}_education_7`, points: 7 },
  { label: '月80時間以上100時間未満', value: `${prefix}_education_6`, points: 6 },
  { label: '月64時間以上80時間未満', value: `${prefix}_education_5`, points: 5 },
];

const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動中', value: `${prefix}_jobseeking_3`, points: 3 },
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
      { label: '病気・障がいがある', value: `${prefix}_reason_illness`, points: 0 },
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
      label: `${parentLabel}の病気・障がいの状況は？`,
      inputType: 'radio',
      options: illnessDisabilityOptions(prefix),
    },
    {
      id: `${prefix}_care`,
      category,
      label: `${parentLabel}はどのくらい介護・看護していますか？`,
      helpText: '月あたりの介護・看護時間を選んでください',
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
      helpText: '月あたりの授業（学習）時間を選んでください',
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
    label: 'ひとり親世帯ですか？',
    helpText: '離別・未婚・死亡・拘禁・離婚調停中等',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい', value: 'adj_single_parent_yes', points: 6 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護を受けていますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい', value: 'adj_welfare_yes', points: 2 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: 'きょうだいが認可保育施設に在園中ですか？',
    helpText: '4月以降も引き続き在園が見込まれる場合',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_no', points: 0 },
      { label: 'はい', value: 'adj_sibling_yes', points: 1 },
    ],
  },
  {
    id: 'adj_sibling_simultaneous',
    category: 'adjustment',
    label: 'きょうだいを同時に申し込みますか？',
    helpText: 'きょうだいも新規申込の場合',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_simultaneous_no', points: 0 },
      { label: 'はい', value: 'adj_sibling_simultaneous_yes', points: 1 },
    ],
  },
  {
    id: 'adj_multi_child',
    category: 'adjustment',
    label: '同一世帯に未就学児が3人以上いますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_multi_child_no', points: 0 },
      { label: 'はい', value: 'adj_multi_child_yes', points: 1 },
    ],
  },
  {
    id: 'adj_nursery_worker',
    category: 'adjustment',
    label: '保育士・幼稚園教諭等として保育施設に就労していますか？',
    helpText: '認可保育施設・認定こども園等で有資格者として保育養護業務に従事（採用予定含む）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_nursery_worker_no', points: 0 },
      { label: 'はい', value: 'adj_nursery_worker_yes', points: 6 },
    ],
  },
];

export const ginowanData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
