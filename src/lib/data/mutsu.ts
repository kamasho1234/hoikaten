import type { MunicipalityData, Question } from '../types';

// -------------------------------------------------------------------------
// むつ市 保育園入園 利用調整基準データ
// 出典: むつ市「別表 審査選考基準」
// https://www.city.mutsu.lg.jp/kurashi/kosodate/kosodateshisetsu/files/kijun.pdf
// -------------------------------------------------------------------------
// むつ市は原典の下部に集計欄があり、
//   「父基礎指数 ＋ 母基礎指数 ＋ 優先利用指数（調整指数） ＝ 総合指数」
// と書かれている。これにより scoringMethod は 'sum'。基礎指数の最大は1人あたり6点。
//
// 〈保育の必要性項目〉は「基準指数 ＋ 指数① ＋ 指数②」の合計として
// 「合計点」の列が示されている。この画面では、原典の合計点をそのまま
// 選択肢の点数にしている（内訳を足し直す形にはしていない）。
//
// 〈転所希望者への調整項目〉は、いま施設を利用している方が別の施設に移る話で、
// これから入園を目指す方の点数とは性質が違うため入れていない。
// -------------------------------------------------------------------------

const municipality = {
  id: 'mutsu',
  name: 'むつ市',
  slug: 'mutsu',
  prefecture: '青森県',
  maxBasePoints: 6,
  scoringMethod: 'sum',
} as const;

// 1 就労（合計点をそのまま使う）
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '居宅外勤務で勤務時間が120時間以上', value: `${prefix}_employment_0`, points: 5 },
  { label: '居宅外勤務で自営業中心者', value: `${prefix}_employment_1`, points: 5 },
  { label: '居宅外勤務で勤務時間が90時間〜120時間未満', value: `${prefix}_employment_2`, points: 4 },
  { label: '居宅外勤務で自営業協力者', value: `${prefix}_employment_3`, points: 4 },
  { label: '居宅外勤務で勤務時間が90時間未満', value: `${prefix}_employment_4`, points: 3 },
  { label: '居宅内勤務で自営業中心者', value: `${prefix}_employment_5`, points: 4 },
  { label: '居宅内勤務で勤務時間が120時間以上', value: `${prefix}_employment_6`, points: 4 },
  { label: '居宅内勤務で自営業協力者', value: `${prefix}_employment_7`, points: 3 },
  { label: '居宅内勤務で勤務時間が90時間〜120時間未満', value: `${prefix}_employment_8`, points: 3 },
  { label: '居宅内勤務で勤務時間が90時間未満', value: `${prefix}_employment_9`, points: 2 },
];

// 2 妊娠・出産
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '妊娠・出産', value: `${prefix}_childbirth_0`, points: 4 },
];

// 3 疾病・障害
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '病院通いで入院', value: `${prefix}_illness_0`, points: 5 },
  { label: '手帳有りで重度', value: `${prefix}_illness_1`, points: 5 },
  { label: '病院通い（入院でない）', value: `${prefix}_illness_2`, points: 3 },
  { label: '自宅療養で重度', value: `${prefix}_illness_3`, points: 3 },
  { label: '手帳有り（重度でない）', value: `${prefix}_illness_4`, points: 3 },
  { label: '自宅療養（重度でない）', value: `${prefix}_illness_5`, points: 1 },
];

// 4 介護・看護
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '通院通いで入院', value: `${prefix}_care_0`, points: 5 },
  { label: '手帳有りで重度', value: `${prefix}_care_1`, points: 5 },
  { label: '手帳有りで中度', value: `${prefix}_care_2`, points: 4 },
  { label: '手帳有り（重度・中度でない）', value: `${prefix}_care_3`, points: 3 },
  { label: '手帳なし', value: `${prefix}_care_4`, points: 1 },
];

// 5 災害復旧
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '災害復旧', value: `${prefix}_disaster_0`, points: 5 },
];

// 6 求職活動
const jobseekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動', value: `${prefix}_jobseeking_0`, points: 1 },
];

// 7 就学
const schoolOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_school_none`, points: 0 },
  { label: '就学', value: `${prefix}_school_0`, points: 2 },
];

// 8 虐待・DV・ネグレクト
const abuseOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_abuse_none`, points: 0 },
  { label: '虐待・DV・ネグレクト', value: `${prefix}_abuse_0`, points: 6 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: 'むつ市は「父基礎指数＋母基礎指数＋優先利用指数＝総合指数」で決めます',
    inputType: 'select',
    options: [
      { label: '就労', value: `${prefix}_reason_employment`, points: 0 },
      { label: '妊娠・出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '疾病・障害', value: `${prefix}_reason_illness`, points: 0 },
      { label: '介護・看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '災害復旧', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '求職活動', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '就学', value: `${prefix}_reason_school`, points: 0 },
      { label: '虐待・DV・ネグレクト', value: `${prefix}_reason_abuse`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の就労の状況は？`,
      inputType: 'radio',
      options: employmentOptions(prefix),
    },
    {
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}の妊娠・出産の状況は？`,
      inputType: 'radio',
      options: childbirthOptions(prefix),
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
    {
      id: `${prefix}_disaster`,
      category,
      label: `${parentLabel}は災害復旧にあたっていますか？`,
      inputType: 'radio',
      options: disasterOptions(prefix),
    },
    {
      id: `${prefix}_jobseeking`,
      category,
      label: `${parentLabel}は求職活動をしていますか？`,
      inputType: 'radio',
      options: jobseekingOptions(prefix),
    },
    {
      id: `${prefix}_school`,
      category,
      label: `${parentLabel}は就学していますか？`,
      inputType: 'radio',
      options: schoolOptions(prefix),
    },
    {
      id: `${prefix}_abuse`,
      category,
      label: `${parentLabel}：虐待・DV・ネグレクトのおそれがありますか？`,
      inputType: 'radio',
      options: abuseOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// 〈保育優先利用項目〉
const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親家庭ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_0', points: 0 },
      { label: 'はい（+6）', value: 'adj_single_parent_1', points: 6 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯ですか？',
    helpText: '自立に向けた求職の場合が対象です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_0', points: 0 },
      { label: 'はい（+5）', value: 'adj_welfare_1', points: 5 },
    ],
  },
  {
    id: 'adj_foster',
    category: 'adjustment',
    label: '里親ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_foster_0', points: 0 },
      { label: 'はい（+5）', value: 'adj_foster_1', points: 5 },
    ],
  },
  {
    id: 'adj_unemployed',
    category: 'adjustment',
    label: '生計中心者が失業していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unemployed_0', points: 0 },
      { label: 'はい（+7）', value: 'adj_unemployed_1', points: 7 },
    ],
  },
  {
    id: 'adj_graduate',
    category: 'adjustment',
    label: '小規模保育事業などの卒園児ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_graduate_0', points: 0 },
      { label: 'はい（+7）', value: 'adj_graduate_1', points: 7 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: '兄弟が入所していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_0', points: 0 },
      { label: 'はい（+4）', value: 'adj_sibling_1', points: 4 },
    ],
  },
  {
    id: 'adj_no_relatives',
    category: 'adjustment',
    label: '市内に祖父母等の親族が住んでいませんか？',
    inputType: 'radio',
    options: [
      { label: '住んでいる', value: 'adj_no_relatives_0', points: 0 },
      { label: '住んでいない（+3）', value: 'adj_no_relatives_1', points: 3 },
    ],
  },
  {
    id: 'adj_minor_parent',
    category: 'adjustment',
    label: '親が未成年者ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_minor_parent_0', points: 0 },
      { label: 'はい（+3）', value: 'adj_minor_parent_1', points: 3 },
    ],
  },
  {
    id: 'adj_nursery_staff',
    category: 'adjustment',
    label: '父母が保育園等へ勤務していますか？',
    helpText: '市内・市外を問いません',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_nursery_staff_0', points: 0 },
      { label: 'はい（+2）', value: 'adj_nursery_staff_1', points: 2 },
    ],
  },
  {
    id: 'adj_tax_free',
    category: 'adjustment',
    label: '市民税非課税世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_tax_free_0', points: 0 },
      { label: 'はい（+2）', value: 'adj_tax_free_1', points: 2 },
    ],
  },
  {
    id: 'adj_family_disability',
    category: 'adjustment',
    label: '障害者（児）がいる世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_family_disability_0', points: 0 },
      { label: 'はい（+2）', value: 'adj_family_disability_1', points: 2 },
    ],
  },
  {
    id: 'adj_three_children',
    category: 'adjustment',
    label: '18歳未満の子どもが3人いる世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_three_children_0', points: 0 },
      { label: 'はい（+1）', value: 'adj_three_children_1', points: 1 },
    ],
  },
  {
    id: 'adj_leave_return',
    category: 'adjustment',
    label: '産後（育児）休業明けの復職ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_leave_return_0', points: 0 },
      { label: 'はい（+1）', value: 'adj_leave_return_1', points: 1 },
    ],
  },
  {
    id: 'adj_fee_delinquent',
    category: 'adjustment',
    label: '保育料の滞納がありますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_fee_delinquent_0', points: 0 },
      { label: '3ヶ月分以上（−3）', value: 'adj_fee_delinquent_1', points: -3 },
      { label: '6ヶ月分以上（−5）', value: 'adj_fee_delinquent_2', points: -5 },
      { label: '12ヶ月分以上（−10）', value: 'adj_fee_delinquent_3', points: -10 },
    ],
  },
];

export const mutsuData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
