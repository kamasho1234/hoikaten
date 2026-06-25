import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 山梨市 保育利用調整基準データ
// 出典: 山梨市保育の必要性の認定に関する基準を定める条例施行規則
// https://www1.g-reiki.net/city.yamanashi.yamanashi/reiki_honbun/r189RG00001007.html
// ---------------------------------------------------------------------------
// sum方式。父母各最大10点（就労 月140h+）。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'yamanashi',
  name: '山梨市',
  slug: 'yamanashi',
  prefecture: '山梨県',
  maxBasePoints: 20,
} as const;

const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月140時間以上（10点）', value: `${prefix}_employment_10`, points: 10 },
  { label: '月120〜140時間未満（8点）', value: `${prefix}_employment_8`, points: 8 },
  { label: '月48〜120時間未満（7点）', value: `${prefix}_employment_7`, points: 7 },
];

const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '常時臥床 / 1か月以上入院 / 重度障害（身体1・2級等）（10点）', value: `${prefix}_illness_10`, points: 10 },
  { label: '1か月以上の自宅療養（8点）', value: `${prefix}_illness_8`, points: 8 },
  { label: 'その他（保育に支障）（6点）', value: `${prefix}_illness_6`, points: 6 },
];

const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '常時保育困難（10点）', value: `${prefix}_care_10`, points: 10 },
  { label: '保育に支障がある（7点）', value: `${prefix}_care_7`, points: 7 },
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
      { label: '働いている', value: `${prefix}_reason_employment`, points: 0 },
      { label: '病気・障害', value: `${prefix}_reason_illness`, points: 0 },
      { label: '家族の介護・看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '出産の前後', value: `${prefix}_reason_childbirth`, points: 8 },
      { label: '就学・職業訓練', value: `${prefix}_reason_education`, points: 8 },
      { label: '災害復旧', value: `${prefix}_reason_disaster`, points: 10 },
      { label: '虐待・DV', value: `${prefix}_reason_dv`, points: 10 },
      { label: '求職活動中（失業・休職）', value: `${prefix}_reason_jobseeking_high`, points: 7 },
      { label: '求職活動中（生活保護・自立見込み）', value: `${prefix}_reason_jobseeking_welfare`, points: 6 },
      { label: '求職活動中（一般）', value: `${prefix}_reason_jobseeking`, points: 5 },
      { label: '育休中（継続利用必要）', value: `${prefix}_reason_parental`, points: 7 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の月間就労時間は？`,
      inputType: 'radio',
      options: employmentOptions(prefix),
    },
    {
      id: `${prefix}_illness`,
      category,
      label: `${parentLabel}の疾病・障害の状況は？`,
      inputType: 'radio',
      options: illnessOptions(prefix),
    },
    {
      id: `${prefix}_care`,
      category,
      label: `${parentLabel}の介護・看護の状況は？`,
      inputType: 'radio',
      options: careOptions(prefix),
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
      { label: 'はい（+2）', value: 'adj_single_parent_yes', points: 2 },
    ],
  },
  {
    id: 'adj_child_disability',
    category: 'adjustment',
    label: '入所児童に障害がありますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_child_disability_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_child_disability_yes', points: 2 },
    ],
  },
  {
    id: 'adj_twins',
    category: 'adjustment',
    label: '双子の同時申込ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_twins_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_twins_yes', points: 2 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_welfare_yes', points: 1 },
    ],
  },
  {
    id: 'adj_unemployment',
    category: 'adjustment',
    label: '生計中心者が失業し就労の必要性が高いですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unemployment_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_unemployment_yes', points: 1 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: 'きょうだいが利用中の施設を希望していますか？',
    inputType: 'radio',
    options: [
      { label: '該当しない', value: 'adj_sibling_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_sibling_yes', points: 1 },
    ],
  },
  {
    id: 'adj_small_grad',
    category: 'adjustment',
    label: '小規模保育事業等の卒園児ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_small_grad_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_small_grad_yes', points: 1 },
    ],
  },
  {
    id: 'adj_parental_leave',
    category: 'adjustment',
    label: '育児休業明けの入所予定ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_parental_leave_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_parental_leave_yes', points: 1 },
    ],
  },
  {
    id: 'adj_relative',
    category: 'adjustment',
    label: '親族による保育を受けるのが常態ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_relative_no', points: 0 },
      { label: 'はい（-1）', value: 'adj_relative_yes', points: -1 },
    ],
  },
];

export const yamanashiData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
