import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 天童市 保育所等入所指数票
// 出典: 天童市保育所等入所指数票 令和8年度
// https://www.city.tendo.yamagata.jp/lifeinfo/kosodate/R8shisuu.pdf
// ---------------------------------------------------------------------------
// sum方式。父母各最大110点。基本指数 + 調整指数で算出。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'tendo',
  name: '天童市',
  slug: 'tendo',
  prefecture: '山形県',
  maxBasePoints: 220,
} as const;

const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月140時間以上（110点）', value: `${prefix}_employment_110`, points: 110 },
  { label: '月130時間以上（100点）', value: `${prefix}_employment_100`, points: 100 },
  { label: '月120時間以上（90点）', value: `${prefix}_employment_90`, points: 90 },
  { label: '月100時間以上（80点）', value: `${prefix}_employment_80`, points: 80 },
  { label: '月80時間以上（70点）', value: `${prefix}_employment_70`, points: 70 },
  { label: '月60時間以上（60点）', value: `${prefix}_employment_60`, points: 60 },
  { label: '月48時間以上（50点）', value: `${prefix}_employment_50`, points: 50 },
];

const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '1ヶ月以上の入院/常時病臥（110点）', value: `${prefix}_illness_110`, points: 110 },
  { label: '概ね1ヶ月以上の加療安静（60点）', value: `${prefix}_illness_60`, points: 60 },
  { label: '通院（週2回）（40点）', value: `${prefix}_illness_40`, points: 40 },
  { label: '通院（週1回）（30点）', value: `${prefix}_illness_30`, points: 30 },
  { label: '通院（月2回）（10点）', value: `${prefix}_illness_10`, points: 10 },
];

const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '身体・精神1-2級, 知的A, 要介護5-4（110点）', value: `${prefix}_disability_110`, points: 110 },
  { label: '身体3-4級, 精神3級, 知的B, 要介護3-2-1（80点）', value: `${prefix}_disability_80`, points: 80 },
  { label: '身体5級以下, 要支援2-1（60点）', value: `${prefix}_disability_60`, points: 60 },
];

const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '週5日以上の常時付添い（110点）', value: `${prefix}_care_110`, points: 110 },
  { label: '1日4時間, 週4日程度（70点）', value: `${prefix}_care_70`, points: 70 },
  { label: '週2日以上の付添い・送迎等（50点）', value: `${prefix}_care_50`, points: 50 },
  { label: '要介護3（80点）', value: `${prefix}_care_care3`, points: 80 },
  { label: '要介護1-2（60点）', value: `${prefix}_care_care12`, points: 60 },
  { label: '上記以外で保育が常時困難（30点）', value: `${prefix}_care_difficult`, points: 30 },
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
      { label: '働いている（就学・職業訓練含む）', value: `${prefix}_reason_employment`, points: 0 },
      { label: '病気・けが', value: `${prefix}_reason_illness`, points: 0 },
      { label: '障害', value: `${prefix}_reason_disability`, points: 0 },
      { label: '家族の介護・看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '妊娠・出産（出産予定日前後8週）', value: `${prefix}_reason_childbirth`, points: 80 },
      { label: '災害復旧中', value: `${prefix}_reason_disaster`, points: 110 },
      { label: '虐待・DV', value: `${prefix}_reason_dv`, points: 110 },
      { label: '求職中', value: `${prefix}_reason_jobseeking`, points: 30 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の月間就労時間は？`,
      helpText: '就学・職業訓練・内職も同じ基準です',
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
      label: `${parentLabel}の障害の等級は？`,
      inputType: 'radio',
      options: disabilityOptions(prefix),
    },
    {
      id: `${prefix}_care`,
      category,
      label: `${parentLabel}の介護・看護の状況は？`,
      helpText: '施設付添と自宅介護を含む',
      inputType: 'radio',
      options: careOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい（+210）', value: 'adj_welfare_yes', points: 210 },
    ],
  },
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい（+200）', value: 'adj_single_parent_yes', points: 200 },
    ],
  },
  {
    id: 'adj_nursery_worker',
    category: 'adjustment',
    label: '保育士等として市内保育施設に勤務していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_nursery_worker_no', points: 0 },
      { label: 'はい（+30）', value: 'adj_nursery_worker_yes', points: 30 },
    ],
  },
  {
    id: 'adj_afterschool_worker',
    category: 'adjustment',
    label: '放課後児童クラブ支援員ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_afterschool_worker_no', points: 0 },
      { label: 'はい（+15）', value: 'adj_afterschool_worker_yes', points: 15 },
    ],
  },
  {
    id: 'adj_single_assignment',
    category: 'adjustment',
    label: '単身赴任ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_assignment_no', points: 0 },
      { label: 'はい（+10）', value: 'adj_single_assignment_yes', points: 10 },
    ],
  },
  {
    id: 'adj_no_cooperation',
    category: 'adjustment',
    label: '保育の協力者がいない世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_no_cooperation_no', points: 0 },
      { label: 'はい（+50）', value: 'adj_no_cooperation_yes', points: 50 },
    ],
  },
  {
    id: 'adj_preschool_sibling',
    category: 'adjustment',
    label: '申込児を除いた未就学児の人数は？',
    inputType: 'radio',
    options: [
      { label: 'なし', value: 'adj_preschool_sibling_none', points: 0 },
      { label: '1人（+20）', value: 'adj_preschool_sibling_1', points: 20 },
      { label: '2人（+40）', value: 'adj_preschool_sibling_2', points: 40 },
      { label: '3人以上（+60）', value: 'adj_preschool_sibling_3plus', points: 60 },
    ],
  },
  {
    id: 'adj_sibling_facility',
    category: 'adjustment',
    label: '兄弟姉妹が当市内の保育施設に通っていますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_facility_no', points: 0 },
      { label: 'はい（+50）', value: 'adj_sibling_facility_yes', points: 50 },
    ],
  },
  {
    id: 'adj_sibling_home_care',
    category: 'adjustment',
    label: '兄弟姉妹が家庭保育ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_home_care_no', points: 0 },
      { label: 'はい（+5）', value: 'adj_sibling_home_care_yes', points: 5 },
    ],
  },
  {
    id: 'adj_school_age_sibling',
    category: 'adjustment',
    label: '小学生兄弟姉妹の人数は？',
    inputType: 'radio',
    options: [
      { label: 'なし', value: 'adj_school_age_sibling_none', points: 0 },
      { label: '1人（+5）', value: 'adj_school_age_sibling_1', points: 5 },
      { label: '2人（+10）', value: 'adj_school_age_sibling_2', points: 10 },
      { label: '3人以上（+15）', value: 'adj_school_age_sibling_3plus', points: 15 },
    ],
  },
  {
    id: 'adj_transfer',
    category: 'adjustment',
    label: '転園申込ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_transfer_no', points: 0 },
      { label: 'はい（-20）', value: 'adj_transfer_yes', points: -20 },
    ],
  },
];

export const tendoData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
