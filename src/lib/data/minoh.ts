import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 箕面市 利用調整選考基準（令和8年度）
// 出典: R8箕面市利用調整選考基準
// https://www.city.minoh.lg.jp/infancy/hoikusho/nuuenn/documents/r8riyouchouseisennkoukijyunn.pdf
// ---------------------------------------------------------------------------
// sum方式（保護者それぞれの基本点数を合算+調整分）。最大20点/親（合計40点）。
// 被雇用・自営(中心者)と自営(協力者)で点数が異なる。
// 実働時間は4時間刻みで細かく区分。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'minoh',
  name: '箕面市',
  slug: 'minoh',
  prefecture: '大阪府',
  maxBasePoints: 40,
} as const;

const employmentMainOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_emp_main_none`, points: 0 },
  { label: '被雇用・自営(中心者) 月152時間以上', value: `${prefix}_emp_main_20`, points: 20 },
  { label: '被雇用・自営(中心者) 月148時間以上', value: `${prefix}_emp_main_19`, points: 19 },
  { label: '被雇用・自営(中心者) 月144時間以上', value: `${prefix}_emp_main_18`, points: 18 },
  { label: '被雇用・自営(中心者) 月140時間以上', value: `${prefix}_emp_main_17`, points: 17 },
  { label: '被雇用・自営(中心者) 月120時間以上', value: `${prefix}_emp_main_15`, points: 15 },
  { label: '被雇用・自営(中心者) 月100時間以上', value: `${prefix}_emp_main_13`, points: 13 },
  { label: '被雇用・自営(中心者) 月80時間以上', value: `${prefix}_emp_main_11`, points: 11 },
  { label: '被雇用・自営(中心者) 月64時間以上', value: `${prefix}_emp_main_9`, points: 9 },
  { label: '自営(協力者) 月152時間以上', value: `${prefix}_emp_sub_18`, points: 18 },
  { label: '自営(協力者) 月148時間以上', value: `${prefix}_emp_sub_17`, points: 17 },
  { label: '自営(協力者) 月144時間以上', value: `${prefix}_emp_sub_16`, points: 16 },
  { label: '自営(協力者) 月140時間以上', value: `${prefix}_emp_sub_15`, points: 15 },
  { label: '自営(協力者) 月120時間以上', value: `${prefix}_emp_sub_13`, points: 13 },
  { label: '自営(協力者) 月100時間以上', value: `${prefix}_emp_sub_11`, points: 11 },
  { label: '自営(協力者) 月80時間以上', value: `${prefix}_emp_sub_9`, points: 9 },
  { label: '自営(協力者) 月64時間以上', value: `${prefix}_emp_sub_7`, points: 7 },
  { label: '内職 月120時間以上', value: `${prefix}_emp_naishoku_13`, points: 13 },
  { label: '内職 月64時間以上', value: `${prefix}_emp_naishoku_7`, points: 7 },
  { label: '求職活動中', value: `${prefix}_emp_jobseeking_5`, points: 5 },
];

const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院', value: `${prefix}_illness_20`, points: 20 },
  { label: '常時臥床・絶対安静', value: `${prefix}_illness_17`, points: 17 },
  { label: '安静', value: `${prefix}_illness_13`, points: 13 },
  { label: '療養', value: `${prefix}_illness_9`, points: 9 },
  { label: '産前産後休業（労働基準法）', value: `${prefix}_illness_15`, points: 15 },
];

const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '重度の介護（居宅で月64時間以上の常時介護）', value: `${prefix}_care_13`, points: 13 },
  { label: 'その他の月64時間以上の介護', value: `${prefix}_care_9`, points: 9 },
];

const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '通学（月100時間以上の就学・技能習得）', value: `${prefix}_education_13`, points: 13 },
  { label: '通学（月64時間以上の就学・技能習得）', value: `${prefix}_education_9`, points: 9 },
  { label: '通信（月64時間以上の通信制等）', value: `${prefix}_education_7`, points: 7 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: '箕面市では保護者それぞれの基本点数を合算し、調整分を加えて利用調整を行います（各最大20点、合計40点）',
    inputType: 'select',
    options: [
      { label: '仕事をしている', value: `${prefix}_reason_employment`, points: 0 },
      { label: '病気・障害・出産', value: `${prefix}_reason_illness`, points: 0 },
      { label: '家族の介護・看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '学校に通っている', value: `${prefix}_reason_education`, points: 0 },
      { label: '災害復旧', value: `${prefix}_reason_disaster`, points: 20 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の就労状況は？`,
      helpText: '被雇用・自営(中心者)と自営(協力者)で点数が異なります。個人事業主に雇用されている場合は協力者扱い',
      inputType: 'radio',
      options: employmentMainOptions(prefix),
    },
    {
      id: `${prefix}_illness`,
      category,
      label: `${parentLabel}の疾病・障害・出産の状況は？`,
      inputType: 'radio',
      options: illnessOptions(prefix),
    },
    {
      id: `${prefix}_care`,
      category,
      label: `${parentLabel}の介護・看護の状況は？`,
      helpText: '未就学児等の入院付添いを含みます',
      inputType: 'radio',
      options: careOptions(prefix),
    },
    {
      id: `${prefix}_education`,
      category,
      label: `${parentLabel}は学校に通っていますか？`,
      helpText: '就労目的の就学・技能習得が対象',
      inputType: 'radio',
      options: educationOptions(prefix),
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
      { label: 'はい・就労中で生活保護受給（+30）', value: 'adj_single_parent_30', points: 30 },
      { label: 'はい・就労中で生活保護なし（+29）', value: 'adj_single_parent_29', points: 29 },
      { label: 'はい・上記以外（+23）', value: 'adj_single_parent_23', points: 23 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護受給世帯で就労中ですか？（ひとり親以外）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい（+5）', value: 'adj_welfare_yes', points: 5 },
    ],
  },
  {
    id: 'adj_parental_leave',
    category: 'adjustment',
    label: '育児休業から復職しますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_parental_leave_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_parental_leave_yes', points: 1 },
    ],
  },
  {
    id: 'adj_unauthorized',
    category: 'adjustment',
    label: '認可外保育施設等を利用し月48時間以上就労していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unauthorized_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_unauthorized_yes', points: 2 },
    ],
  },
  {
    id: 'adj_sibling_enrolled',
    category: 'adjustment',
    label: 'きょうだいが保育所等・幼稚園・認可外施設に在籍していますか？（就労中の場合）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_enrolled_no', points: 0 },
      { label: 'はい（+3）', value: 'adj_sibling_enrolled_yes', points: 3 },
    ],
  },
  {
    id: 'adj_sibling_simultaneous',
    category: 'adjustment',
    label: 'きょうだいと同時に申込みをしますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_simultaneous_no', points: 0 },
      { label: 'きょうだい1人と同時（+1）', value: 'adj_sibling_simultaneous_1', points: 1 },
      { label: 'きょうだい2人以上と同時（+2）', value: 'adj_sibling_simultaneous_2', points: 2 },
    ],
  },
  {
    id: 'adj_nursery_worker',
    category: 'adjustment',
    label: '市内の保育所等又は私立幼稚園に保育士として勤務していますか？（月120時間未満）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_nursery_worker_no', points: 0 },
      { label: 'はい（+10）', value: 'adj_nursery_worker_yes', points: 10 },
    ],
  },
  {
    id: 'adj_age_graduation',
    category: 'adjustment',
    label: '2歳児クラスまでの保育所等を卒園予定で転園を希望していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_age_graduation_no', points: 0 },
      { label: 'はい（+7）', value: 'adj_age_graduation_yes', points: 7 },
    ],
  },
  {
    id: 'adj_transfer',
    category: 'adjustment',
    label: '転入予定で居住を証明する書類がない状態ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ（該当しない）', value: 'adj_transfer_no', points: 0 },
      { label: 'はい（-1）', value: 'adj_transfer_yes', points: -1 },
    ],
  },
];

export const minohData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
