import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 勝山市 保育所利用調整基準データ
// 出典: 勝山市 子どものための教育・保育給付に係る支給認定等事務要綱（別表）
// https://www1.g-reiki.net/city.katsuyama/reiki_honbun/i207RG00001472.html
// ---------------------------------------------------------------------------
// sum方式。父母各最大10点（家庭外就労 月140h+）。
// 家庭内就労（協力者）・内職は低めの点数。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'katsuyama',
  name: '勝山市',
  slug: 'katsuyama',
  prefecture: '福井県',
  maxBasePoints: 20,
} as const;

const outsideEmploymentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_outside_none`, points: 0 },
  { label: '月140時間以上（10点）', value: `${prefix}_outside_10`, points: 10 },
  { label: '月120時間以上（9点）', value: `${prefix}_outside_9`, points: 9 },
  { label: '月80時間以上（8点）', value: `${prefix}_outside_8`, points: 8 },
  { label: '月48時間以上（7点）', value: `${prefix}_outside_7`, points: 7 },
];

const insideMainOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_inside_main_none`, points: 0 },
  { label: '月140時間以上（10点）', value: `${prefix}_inside_main_10`, points: 10 },
  { label: '月120時間以上（9点）', value: `${prefix}_inside_main_9`, points: 9 },
  { label: '月80時間以上（8点）', value: `${prefix}_inside_main_8`, points: 8 },
  { label: '月48時間以上（7点）', value: `${prefix}_inside_main_7`, points: 7 },
];

const insideSubOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_inside_sub_none`, points: 0 },
  { label: '月140時間以上（8点）', value: `${prefix}_inside_sub_8`, points: 8 },
  { label: '月120時間以上（7点）', value: `${prefix}_inside_sub_7`, points: 7 },
  { label: '月80時間以上（6点）', value: `${prefix}_inside_sub_6`, points: 6 },
  { label: '月48時間以上（5点）', value: `${prefix}_inside_sub_5`, points: 5 },
];

const pieceworkOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_piecework_none`, points: 0 },
  { label: '月120時間以上（6点）', value: `${prefix}_piecework_6`, points: 6 },
  { label: '月80時間以上（5点）', value: `${prefix}_piecework_5`, points: 5 },
  { label: '月48時間以上（4点）', value: `${prefix}_piecework_4`, points: 4 },
];

const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院中 / 常時臥床（10点）', value: `${prefix}_illness_10`, points: 10 },
  { label: '週1回以上通院（7点）', value: `${prefix}_illness_7`, points: 7 },
  { label: 'その他（保育に支障）（5点）', value: `${prefix}_illness_5`, points: 5 },
];

const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '身体1・2級 / 療育手帳 / 精神手帳（10点）', value: `${prefix}_disability_10`, points: 10 },
  { label: '身体3・4級（8点）', value: `${prefix}_disability_8`, points: 8 },
  { label: '身体5・6級（6点）', value: `${prefix}_disability_6`, points: 6 },
];

const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '月120時間以上（8点）', value: `${prefix}_care_8`, points: 8 },
  { label: '月80時間以上（7点）', value: `${prefix}_care_7`, points: 7 },
  { label: '月48時間以上（6点）', value: `${prefix}_care_6`, points: 6 },
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
      { label: '家庭外で働いている', value: `${prefix}_reason_outside_employment`, points: 0 },
      { label: '家庭内で自営（中心者）', value: `${prefix}_reason_inside_main`, points: 0 },
      { label: '家庭内で自営（協力者）', value: `${prefix}_reason_inside_sub`, points: 0 },
      { label: '内職', value: `${prefix}_reason_piecework`, points: 0 },
      { label: '病気・けが', value: `${prefix}_reason_illness`, points: 0 },
      { label: '障害', value: `${prefix}_reason_disability`, points: 0 },
      { label: '家族の介護・看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '出産の前後', value: `${prefix}_reason_childbirth`, points: 8 },
      { label: '災害復旧', value: `${prefix}_reason_disaster`, points: 10 },
      { label: '虐待・DV', value: `${prefix}_reason_dv`, points: 15 },
      { label: '就学（月120時間以上）', value: `${prefix}_reason_edu_high`, points: 8 },
      { label: '就学（月48時間以上）', value: `${prefix}_reason_edu_low`, points: 6 },
      { label: '職業訓練（月120時間以上）', value: `${prefix}_reason_train_high`, points: 8 },
      { label: '職業訓練（月48時間以上）', value: `${prefix}_reason_train_low`, points: 6 },
      { label: '求職活動中（連日）', value: `${prefix}_reason_jobseeking`, points: 5 },
      { label: '入園決定後に求職開始', value: `${prefix}_reason_jobseeking_later`, points: 4 },
      { label: '育休中（継続利用必要）', value: `${prefix}_reason_parental`, points: 6 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_outside_employment`,
      category,
      label: `${parentLabel}の家庭外就労時間は？`,
      inputType: 'radio',
      options: outsideEmploymentOptions(prefix),
    },
    {
      id: `${prefix}_inside_main`,
      category,
      label: `${parentLabel}の家庭内自営（中心者）の就労時間は？`,
      inputType: 'radio',
      options: insideMainOptions(prefix),
    },
    {
      id: `${prefix}_inside_sub`,
      category,
      label: `${parentLabel}の家庭内自営（協力者）の就労時間は？`,
      inputType: 'radio',
      options: insideSubOptions(prefix),
    },
    {
      id: `${prefix}_piecework`,
      category,
      label: `${parentLabel}の内職の状況は？`,
      inputType: 'radio',
      options: pieceworkOptions(prefix),
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
      label: `${parentLabel}の介護・看護の時間は？`,
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
    label: 'ひとり親家庭ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい（+10）', value: 'adj_single_parent_yes', points: 10 },
    ],
  },
  {
    id: 'adj_welfare_employment',
    category: 'adjustment',
    label: '生活保護世帯で就労支援を受けていますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_employment_no', points: 0 },
      { label: 'はい（+5）', value: 'adj_welfare_employment_yes', points: 5 },
    ],
  },
  {
    id: 'adj_unemployment',
    category: 'adjustment',
    label: '生計中心者が失業しましたか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unemployment_no', points: 0 },
      { label: 'はい（+5）', value: 'adj_unemployment_yes', points: 5 },
    ],
  },
  {
    id: 'adj_child_disability',
    category: 'adjustment',
    label: '入所児童に障害がありますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_child_disability_no', points: 0 },
      { label: 'はい（+3）', value: 'adj_child_disability_yes', points: 3 },
    ],
  },
  {
    id: 'adj_continuing',
    category: 'adjustment',
    label: '継続児（転園含む）ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_continuing_no', points: 0 },
      { label: 'はい（+3）', value: 'adj_continuing_yes', points: 3 },
    ],
  },
  {
    id: 'adj_parental_leave',
    category: 'adjustment',
    label: '育児休業明けの入所ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_parental_leave_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_parental_leave_yes', points: 2 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: 'きょうだいの同一施設利用を希望していますか？',
    inputType: 'radio',
    options: [
      { label: '該当しない', value: 'adj_sibling_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_sibling_yes', points: 2 },
    ],
  },
  {
    id: 'adj_small_grad',
    category: 'adjustment',
    label: '小規模保育等の卒園児ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_small_grad_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_small_grad_yes', points: 2 },
    ],
  },
  {
    id: 'adj_nursery_worker',
    category: 'adjustment',
    label: '保育士の子どもですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_nursery_worker_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_nursery_worker_yes', points: 2 },
    ],
  },
  {
    id: 'adj_third_child',
    category: 'adjustment',
    label: '第3子以降ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_third_child_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_third_child_yes', points: 1 },
    ],
  },
  {
    id: 'adj_grandparent_60',
    category: 'adjustment',
    label: '60歳未満の未就労祖父母が同居していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_grandparent_60_no', points: 0 },
      { label: '1人（-3）', value: 'adj_grandparent_60_1', points: -3 },
      { label: '2人（-6）', value: 'adj_grandparent_60_2', points: -6 },
    ],
  },
  {
    id: 'adj_grandparent_65',
    category: 'adjustment',
    label: '60〜65歳未満の未就労祖父母が同居していますか？',
    helpText: '60歳未満に該当しない場合',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_grandparent_65_no', points: 0 },
      { label: '1人（-2）', value: 'adj_grandparent_65_1', points: -2 },
      { label: '2人（-4）', value: 'adj_grandparent_65_2', points: -4 },
    ],
  },
  {
    id: 'adj_delinquent',
    category: 'adjustment',
    label: '保育料の未納がありますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_delinquent_no', points: 0 },
      { label: '1か月分（-2）', value: 'adj_delinquent_1', points: -2 },
      { label: '2か月分（-4）', value: 'adj_delinquent_2', points: -4 },
      { label: '3か月分以上（-6）', value: 'adj_delinquent_3', points: -6 },
    ],
  },
];

export const katsuyamaData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
