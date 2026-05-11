import type { MunicipalityData, Question } from '../types';

// 出典: 北上市保育利用指数表（令和8年度）
// https://www.city.kitakami.iwate.jp/life/soshikikarasagasu/kosodateshienka/hoiku/9/25501.html

const municipality = {
  id: 'kitakami',
  name: '北上市',
  slug: 'kitakami',
  prefecture: '岩手県',
  maxBasePoints: 40, // 父母各20点
} as const;

// 就労時間は週単位で定義（週42h=月168h以上, 週38h=月152h以上, 等）
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '週42時間以上（月168時間以上）', value: `${prefix}_employment_20`, points: 20 },
  { label: '週38時間以上（月152時間以上）', value: `${prefix}_employment_18`, points: 18 },
  { label: '週35時間以上（月140時間以上）', value: `${prefix}_employment_16`, points: 16 },
  { label: '週30時間以上（月120時間以上）', value: `${prefix}_employment_14`, points: 14 },
  { label: '週30時間未満（月120時間未満）', value: `${prefix}_employment_12`, points: 12 },
];

const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '常時臥床（常時寝たきりの状態）', value: `${prefix}_illness_20`, points: 20 },
  { label: '精神性・感染性疾患', value: `${prefix}_illness_20b`, points: 20 },
  { label: '常時安静または頻繁に通院が必要', value: `${prefix}_illness_20c`, points: 20 },
  { label: '一般療養（上記以外）', value: `${prefix}_illness_16`, points: 16 },
];

const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '身体障害者手帳1・2級 / 療育手帳A', value: `${prefix}_disability_20`, points: 20 },
  { label: '精神障がい者保健福祉手帳1〜3級', value: `${prefix}_disability_18`, points: 18 },
  { label: '身体障害者手帳3級 / 療育手帳B', value: `${prefix}_disability_16`, points: 16 },
  { label: '身体障害者手帳4級', value: `${prefix}_disability_14`, points: 14 },
];

const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '入院付添', value: `${prefix}_care_20`, points: 20 },
  { label: '自宅介護（ねたきり老人・心身障害者・病臥者の常時介護）', value: `${prefix}_care_18`, points: 18 },
  { label: 'その他の介護・看護', value: `${prefix}_care_16`, points: 16 },
];

const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '産後8週まで', value: `${prefix}_childbirth_20`, points: 20 },
];

const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '通学制（就労に準ずる）', value: `${prefix}_education_work`, points: 0 }, // 就労と同じ扱い
  { label: '通信制', value: `${prefix}_education_18`, points: 18 },
];

const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動中', value: `${prefix}_jobseeking_10`, points: 10 },
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
      { label: '病気・療養中', value: `${prefix}_reason_illness`, points: 0 },
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
      helpText: '週あたりの就労時間を選んでください（残業・休憩時間を含まない）',
      inputType: 'radio',
      options: employmentOptions(prefix),
    },
    {
      id: `${prefix}_illness`,
      category,
      label: `${parentLabel}の病気・療養の状況は？`,
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
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい', value: 'adj_single_parent_yes', points: 21 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護を受けていますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい', value: 'adj_welfare_yes', points: 10 },
    ],
  },
  {
    id: 'adj_second_child',
    category: 'adjustment',
    label: 'この子は小学6年生までの兄姉からみて何番目の子ですか？',
    helpText: '申込児童（多胎児を除く）が第2子以降の場合に加点されます',
    inputType: 'radio',
    options: [
      { label: '第1子（またはひとりっ子）', value: 'adj_second_child_1', points: 0 },
      { label: '第2子', value: 'adj_second_child_2', points: 3 },
      { label: '第3子以降', value: 'adj_second_child_3', points: 5 },
      { label: '多胎児', value: 'adj_second_child_multi', points: 8 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: 'きょうだいが第1希望施設に在籍していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_no', points: 0 },
      { label: 'はい', value: 'adj_sibling_yes', points: 8 },
    ],
  },
  {
    id: 'adj_nursery_worker',
    category: 'adjustment',
    label: '保育士等の資格を持ち、北上市内の保育施設に就労していますか？',
    helpText: '認可保育施設（支援センターは除く）に保育士等として勤務または利用開始希望日の翌月までに就労予定',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_nursery_worker_no', points: 0 },
      { label: 'はい', value: 'adj_nursery_worker_yes', points: 25 },
    ],
  },
  {
    id: 'adj_grandparent',
    category: 'adjustment',
    label: '同居する65歳未満の祖父母が保育にあたれる状態ですか？',
    helpText: '同居かつ保育が可能な場合（減点）',
    inputType: 'radio',
    options: [
      { label: 'いいえ（該当しない）', value: 'adj_grandparent_no', points: 0 },
      { label: 'はい', value: 'adj_grandparent_yes', points: -20 },
    ],
  },
];

export const kitakamiData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
