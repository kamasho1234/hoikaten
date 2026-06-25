import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 室蘭市 保育園入園 基礎点数・調整点数データ
// 出典: 室蘭市保育所等利用調整基準（令和8年度用）
// https://www.city.muroran.lg.jp/education/?content=3912
// ---------------------------------------------------------------------------
// 室蘭市の利用調整は以下のように算出されます。
//   基礎点数 ＝ 父の基礎点数 ＋ 母の基礎点数
//   合計点数 ＝ 基礎点数 ＋ 調整点数
// 父母がいない場合は、その他の保護者で基礎点数を設定します。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'muroran',
  name: '室蘭市',
  slug: 'muroran',
  prefecture: '北海道',
  maxBasePoints: 200,
} as const;

const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月160時間以上（フルタイム）', value: `${prefix}_employment_100`, points: 100 },
  { label: '月140時間以上160時間未満', value: `${prefix}_employment_90`, points: 90 },
  { label: '月120時間以上140時間未満', value: `${prefix}_employment_80`, points: 80 },
  { label: '月100時間以上120時間未満', value: `${prefix}_employment_70`, points: 70 },
  { label: '月80時間以上100時間未満', value: `${prefix}_employment_60`, points: 60 },
  { label: '月60時間以上80時間未満', value: `${prefix}_employment_50`, points: 50 },
];

const homeworkOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_homework_none`, points: 0 },
  { label: '月160時間以上', value: `${prefix}_homework_80`, points: 80 },
  { label: '月140時間以上160時間未満', value: `${prefix}_homework_70`, points: 70 },
  { label: '月120時間以上140時間未満', value: `${prefix}_homework_60`, points: 60 },
  { label: '月100時間以上120時間未満', value: `${prefix}_homework_50`, points: 50 },
  { label: '月80時間以上100時間未満', value: `${prefix}_homework_40`, points: 40 },
  { label: '月60時間以上80時間未満', value: `${prefix}_homework_30`, points: 30 },
];

const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '産前6週〜産後8週（多胎は産前14週〜）', value: `${prefix}_childbirth_100`, points: 100 },
];

const illnessDisabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院（1か月以上）', value: `${prefix}_illness_100a`, points: 100 },
  { label: '自宅療養：常時臥床', value: `${prefix}_illness_100b`, points: 100 },
  { label: '自宅療養：精神性疾患', value: `${prefix}_illness_80`, points: 80 },
  { label: '自宅療養：上記以外', value: `${prefix}_illness_50`, points: 50 },
  { label: '身体障害者手帳 1級・2級', value: `${prefix}_disability_100a`, points: 100 },
  { label: '身体障害者手帳 3級', value: `${prefix}_disability_90`, points: 90 },
  { label: '療育手帳（A・B）', value: `${prefix}_disability_100b`, points: 100 },
  { label: '精神障害者保健福祉手帳（1級・2級・3級）', value: `${prefix}_disability_100c`, points: 100 },
];

const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '月160時間以上の介護・看護', value: `${prefix}_care_100`, points: 100 },
  { label: '月120時間以上160時間未満の介護・看護', value: `${prefix}_care_90`, points: 90 },
  { label: '月80時間以上120時間未満の介護・看護', value: `${prefix}_care_70`, points: 70 },
  { label: '月60時間以上80時間未満の介護・看護', value: `${prefix}_care_60`, points: 60 },
];

const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '月160時間以上の就学・技能習得', value: `${prefix}_education_100`, points: 100 },
  { label: '月140時間以上160時間未満の就学', value: `${prefix}_education_90`, points: 90 },
  { label: '月120時間以上140時間未満の就学', value: `${prefix}_education_80`, points: 80 },
  { label: '月100時間以上120時間未満の就学', value: `${prefix}_education_70`, points: 70 },
];

const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動中（3ヶ月以内）', value: `${prefix}_jobseeking_40`, points: 40 },
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
      { label: '内職をしている', value: `${prefix}_reason_homework`, points: 0 },
      { label: '病気・障害がある', value: `${prefix}_reason_illness`, points: 0 },
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
      label: `${parentLabel}の就労時間（月あたり）は？`,
      helpText: '週あたりの就労日数と1日の就労時間から判定します',
      inputType: 'radio',
      options: employmentOptions(prefix),
    },
    {
      id: `${prefix}_homework`,
      category,
      label: `${parentLabel}の内職時間（月あたり）は？`,
      helpText: '月あたりの内職時間を選んでください',
      inputType: 'radio',
      options: homeworkOptions(prefix),
    },
    {
      id: `${prefix}_illness`,
      category,
      label: `${parentLabel}の病気・障害の状況は？`,
      inputType: 'radio',
      options: illnessDisabilityOptions(prefix),
    },
    {
      id: `${prefix}_care`,
      category,
      label: `${parentLabel}の介護・看護時間（月あたり）は？`,
      helpText: '月あたりの介護日数・時間を選んでください',
      inputType: 'radio',
      options: careOptions(prefix),
    },
    {
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}の出産予定時期は？`,
      helpText: '母親のみ対象。産前6週間から産後8週間',
      inputType: 'radio',
      options: childbirthOptions(prefix),
    },
    {
      id: `${prefix}_education`,
      category,
      label: `${parentLabel}の就学時間（月あたり）は？`,
      helpText: '月あたりの通学日数・時間を選んでください',
      inputType: 'radio',
      options: educationOptions(prefix),
    },
    {
      id: `${prefix}_jobseeking`,
      category,
      label: `${parentLabel}は求職活動をしていますか？`,
      helpText: '求職活動開始から3ヶ月以内',
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
    label: 'ひとり親で就労していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい（+5）', value: 'adj_single_parent_yes', points: 5 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護受給世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい（+3）', value: 'adj_welfare_yes', points: 3 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: 'きょうだいが同じ施設の利用を希望していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_no', points: 0 },
      { label: 'はい（+3）', value: 'adj_sibling_yes', points: 3 },
    ],
  },
  {
    id: 'adj_parental_leave',
    category: 'adjustment',
    label: '育児休業から復帰する予定ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_parental_leave_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_parental_leave_yes', points: 2 },
    ],
  },
  {
    id: 'adj_unlicensed_nursery',
    category: 'adjustment',
    label: '認可外の保育施設に月ぎめで預けていますか？',
    helpText: '月48時間以上、有償で預けている場合',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unlicensed_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_unlicensed_yes', points: 2 },
    ],
  },
  {
    id: 'adj_previous_application_denied',
    category: 'adjustment',
    label: '前年度の利用申込で不承諾になっていますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_denied_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_denied_yes', points: 1 },
    ],
  },
];

export const muroranData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
