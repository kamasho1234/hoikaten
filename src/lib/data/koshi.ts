import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 合志市 保育園入園 利用調整基準データ
// 出典: 合志市「合志市保育所等保育実施基準表」
// https://www.city.koshi.lg.jp/kiji00324735/index.html
// ---------------------------------------------------------------------------
// 合志市は「基準指数（父母それぞれ最大14点）＋ 補助指数」の加算方式。
// 合計基準点数最大28点。月の就労時間で判定。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'koshi',
  name: '合志市',
  slug: 'koshi',
  prefecture: '熊本県',
  maxBasePoints: 28,
} as const;

const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月180時間以上（目安：1日9時間以上、月20日以上）', value: `${prefix}_employment_14`, points: 14 },
  { label: '月160時間以上180時間未満（目安：1日8時間以上、月20日以上）', value: `${prefix}_employment_13`, points: 13 },
  { label: '月150時間以上160時間未満（目安：1日7時間30分以上、月20日以上）', value: `${prefix}_employment_12`, points: 12 },
  { label: '月140時間以上150時間未満（目安：1日7時間以上、月20日以上）', value: `${prefix}_employment_11`, points: 11 },
  { label: '月120時間以上140時間未満（目安：1日6時間以上、月20日以上）', value: `${prefix}_employment_10`, points: 10 },
  { label: '月112時間以上120時間未満（目安：1日7時間以上、月16日以上）', value: `${prefix}_employment_8`, points: 8 },
  { label: '月100時間以上112時間未満（目安：1日5時間以上、月20日以上）', value: `${prefix}_employment_7`, points: 7 },
  { label: '月80時間以上100時間未満（目安：1日5時間以上、月16日以上）', value: `${prefix}_employment_6`, points: 6 },
  { label: '月64時間以上80時間未満', value: `${prefix}_employment_5`, points: 5 },
];

const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '常時臥床している者（1級・2級）', value: `${prefix}_illness_12`, points: 12 },
  { label: '感染性・精神性疾患でおおむね1ヶ月以上入院', value: `${prefix}_illness_12_alt`, points: 12 },
  { label: '一般療養でおおむね1ヶ月以上常時臥床', value: `${prefix}_illness_7`, points: 7 },
  { label: '一般療養でおおむね1ヶ月以上安静を要する', value: `${prefix}_illness_6`, points: 6 },
];

const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '身体障害者手帳・療育手帳所持（1級・2級相当）', value: `${prefix}_disability_12`, points: 12 },
  { label: '身体障害者手帳・療育手帳所持（3級相当）', value: `${prefix}_disability_10`, points: 10 },
  { label: '身体障害者手帳・療育手帳所持（4級以下）', value: `${prefix}_disability_7`, points: 7 },
];

const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '寝たきり者の看護・介護（常時臥床している者）', value: `${prefix}_care_12`, points: 12 },
  { label: '心身障がい者看護・介護（常時臥床）', value: `${prefix}_care_10`, points: 10 },
  { label: '入院付添（おおむね1ヶ月以上）', value: `${prefix}_care_10_alt`, points: 10 },
  { label: '居宅内看護・介護（おおむね1ヶ月以上安静）', value: `${prefix}_care_7`, points: 7 },
  { label: '別居の者の看護・介護', value: `${prefix}_care_5`, points: 5 },
];

const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産予定月の前後2ヶ月ずつ（最大5ヶ月間、延長不可）', value: `${prefix}_childbirth_8`, points: 8 },
];

const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職のため日中外出を要する者（入所後3ヶ月以内に就労証明が必要）', value: `${prefix}_jobseeking_0`, points: 0 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: '合志市では父母それぞれの基準指数（各最大14点）の合計で選考されます',
    inputType: 'select',
    options: [
      { label: '仕事をしている', value: `${prefix}_reason_employment`, points: 0 },
      { label: '病気の治療中', value: `${prefix}_reason_illness`, points: 0 },
      { label: '障害がある', value: `${prefix}_reason_disability`, points: 0 },
      { label: '介護・看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '出産の前後', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '仕事を探している', value: `${prefix}_reason_jobseeking`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の就労時間（月あたり）は？`,
      inputType: 'radio',
      options: employmentOptions(prefix),
    },
    {
      id: `${prefix}_illness`,
      category,
      label: `${parentLabel}の病気の状況は？`,
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
      label: `${parentLabel}の介護の状況は？`,
      inputType: 'radio',
      options: careOptions(prefix),
    },
    {
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}の出産の状況は？`,
      inputType: 'radio',
      options: childbirthOptions(prefix),
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
    id: 'adj_double_income',
    category: 'adjustment',
    label: '父母ともに就労中または就労予定ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_double_income_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_double_income_yes', points: 1 },
    ],
  },
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい（+3）', value: 'adj_single_parent_yes', points: 3 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯またはひとり親世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_welfare_yes', points: 2 },
    ],
  },
  {
    id: 'adj_low_income',
    category: 'adjustment',
    label: '住民税均等割課税のみの世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_low_income_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_low_income_yes', points: 1 },
    ],
  },
  {
    id: 'adj_single_assignment',
    category: 'adjustment',
    label: '単身赴任していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_assignment_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_single_assignment_yes', points: 2 },
    ],
  },
  {
    id: 'adj_grandparents_far',
    category: 'adjustment',
    label: '祖父母が県外にいますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえまたはあてはまらない', value: 'adj_grandparents_far_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_grandparents_far_yes', points: 1 },
    ],
  },
  {
    id: 'adj_siblings',
    category: 'adjustment',
    label: '双子以上または未就学児童を3人以上新規申し込みしていますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_siblings_no', points: 0 },
      { label: 'はい（+5）', value: 'adj_siblings_yes', points: 5 },
    ],
  },
  {
    id: 'adj_sibling_same_facility',
    category: 'adjustment',
    label: 'きょうだいが既に市内認可保育施設に通園し、同じ施設を第一希望としていますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_same_no', points: 0 },
      { label: 'はい（+10）', value: 'adj_sibling_same_yes', points: 10 },
    ],
  },
  {
    id: 'adj_community_worker',
    category: 'adjustment',
    label: '市内教育・保育施設に従事していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_community_worker_no', points: 0 },
      { label: 'はい（+12）', value: 'adj_community_worker_yes', points: 12 },
    ],
  },
  {
    id: 'adj_priority_child',
    category: 'adjustment',
    label: '児童相談所長の措置児童または虐待・DV・育児放棄・親のいない児童ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_priority_child_no', points: 0 },
      { label: 'はい（+40）', value: 'adj_priority_child_yes', points: 40 },
    ],
  },
  {
    id: 'adj_fee_delinquent',
    category: 'adjustment',
    label: '保育料を滞納していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_fee_delinquent_no', points: 0 },
      { label: 'はい（-10）', value: 'adj_fee_delinquent_yes', points: -10 },
    ],
  },
  {
    id: 'adj_untransferred',
    category: 'adjustment',
    label: '未転入ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_untransferred_no', points: 0 },
      { label: 'はい（-6）', value: 'adj_untransferred_yes', points: -6 },
    ],
  },
  {
    id: 'adj_withdrawal',
    category: 'adjustment',
    label: '当該年度中に市内認可保育施設を辞退し、再度申し込みしていますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_withdrawal_no', points: 0 },
      { label: 'はい（-12）', value: 'adj_withdrawal_yes', points: -12 },
    ],
  },
];

export const koshiData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
