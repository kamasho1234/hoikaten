import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 富里市 入園審査（選考）に関する指数
// 出典: 令和8年度 こども園・保育園 入園のご案内 p.41-42
// https://www.city.tomisato.lg.jp/kosodate/cmsfiles/contents/0000014/14706/R8nyuuenannai.pdf
// ---------------------------------------------------------------------------
// sum方式。父母各最大50点。基準指数 + 調整指数で算出。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'tomisato',
  name: '富里市',
  slug: 'tomisato',
  prefecture: '千葉県',
  maxBasePoints: 100,
} as const;

const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月150時間以上（50点）', value: `${prefix}_employment_50`, points: 50 },
  { label: '月140時間以上150時間未満（45点）', value: `${prefix}_employment_45`, points: 45 },
  { label: '月120時間以上140時間未満（40点）', value: `${prefix}_employment_40`, points: 40 },
  { label: '月100時間以上120時間未満（35点）', value: `${prefix}_employment_35`, points: 35 },
  { label: '月80時間以上100時間未満（30点）', value: `${prefix}_employment_30`, points: 30 },
  { label: '月60時間以上80時間未満（25点）', value: `${prefix}_employment_25`, points: 25 },
  { label: '月48時間以上60時間未満（20点）', value: `${prefix}_employment_20`, points: 20 },
];

const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院1か月以上（50点）', value: `${prefix}_illness_50`, points: 50 },
  { label: '常時病臥・感染症（50点）', value: `${prefix}_illness_50b`, points: 50 },
  { label: '1か月以上の安静（40点）', value: `${prefix}_illness_40`, points: 40 },
  { label: 'その他の自宅療養（35点）', value: `${prefix}_illness_35`, points: 35 },
  { label: '精神性疾患（30点）', value: `${prefix}_illness_30`, points: 30 },
];

const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '身体1・2級、療育A、精神1・2級（50点）', value: `${prefix}_disability_50`, points: 50 },
  { label: '身体3級、療育B1、精神3級（40点）', value: `${prefix}_disability_40`, points: 40 },
  { label: '身体4級以下、療育B2（30点）', value: `${prefix}_disability_30`, points: 30 },
];

const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '常時介護・週5日以上（要介護4・5相当）（50点）', value: `${prefix}_care_50`, points: 50 },
  { label: '一部介護・週3日以上（要介護2・3相当）（40点）', value: `${prefix}_care_40`, points: 40 },
  { label: 'その他の介護・看護（35点）', value: `${prefix}_care_35`, points: 35 },
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
      { label: '働いている（就学含む）', value: `${prefix}_reason_employment`, points: 0 },
      { label: '病気・けが', value: `${prefix}_reason_illness`, points: 0 },
      { label: '障害', value: `${prefix}_reason_disability`, points: 0 },
      { label: '家族の介護・看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '妊娠・出産（50点）', value: `${prefix}_reason_childbirth`, points: 50 },
      { label: '災害復旧（50点）', value: `${prefix}_reason_disaster`, points: 50 },
      { label: '死亡・離婚・行方不明等（50点）', value: `${prefix}_reason_absence`, points: 50 },
      { label: '虐待・DV（50点）', value: `${prefix}_reason_dv`, points: 50 },
      { label: '求職活動中（3点）', value: `${prefix}_reason_jobseeking`, points: 3 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の月間就労時間は？`,
      helpText: '就学も同じ基準で判定されます',
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
      { label: 'はい（+10）', value: 'adj_single_parent_yes', points: 10 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい（+7）', value: 'adj_welfare_yes', points: 7 },
    ],
  },
  {
    id: 'adj_breadwinner_unemployed',
    category: 'adjustment',
    label: '生計中心者の失業により就労の必要性が高いですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_breadwinner_unemployed_no', points: 0 },
      { label: 'はい（+10）', value: 'adj_breadwinner_unemployed_yes', points: 10 },
    ],
  },
  {
    id: 'adj_many_children',
    category: 'adjustment',
    label: '18歳未満の子が4人以上いますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_many_children_no', points: 0 },
      { label: 'はい（+5）', value: 'adj_many_children_yes', points: 5 },
    ],
  },
  {
    id: 'adj_childcare_leave_return',
    category: 'adjustment',
    label: '産休・育休明けで職場復帰しますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_childcare_leave_return_no', points: 0 },
      { label: 'はい（+5）', value: 'adj_childcare_leave_return_yes', points: 5 },
    ],
  },
  {
    id: 'adj_childcare_leave_reentry',
    category: 'adjustment',
    label: '育休取得で退園し、育休明けに再入園を希望ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_childcare_leave_reentry_no', points: 0 },
      { label: 'はい（+10）', value: 'adj_childcare_leave_reentry_yes', points: 10 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: '兄弟姉妹が保育所等を利用中または同時申込みですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_no', points: 0 },
      { label: 'はい（+3）', value: 'adj_sibling_yes', points: 3 },
    ],
  },
  {
    id: 'adj_sibling_transfer',
    category: 'adjustment',
    label: '兄弟姉妹が別園で同一園への転園希望ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_transfer_no', points: 0 },
      { label: 'はい（+5）', value: 'adj_sibling_transfer_yes', points: 5 },
    ],
  },
  {
    id: 'adj_regional_grad',
    category: 'adjustment',
    label: '地域型保育事業の卒園児で継続利用できない場合ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_regional_grad_no', points: 0 },
      { label: 'はい（+30）', value: 'adj_regional_grad_yes', points: 30 },
    ],
  },
  {
    id: 'adj_nursery_worker',
    category: 'adjustment',
    label: '市内の保育施設等で保育士等として勤務していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_nursery_worker_no', points: 0 },
      { label: 'はい（+5）', value: 'adj_nursery_worker_yes', points: 5 },
    ],
  },
  {
    id: 'adj_grandparent_available',
    category: 'adjustment',
    label: '同居の65歳未満の祖父母が無職または月48時間未満の就労ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_grandparent_available_no', points: 0 },
      { label: 'はい（-10）', value: 'adj_grandparent_available_yes', points: -10 },
    ],
  },
  {
    id: 'adj_declined',
    category: 'adjustment',
    label: '今年度内に入園内定を辞退しましたか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_declined_no', points: 0 },
      { label: 'はい（-5）', value: 'adj_declined_yes', points: -5 },
    ],
  },
  {
    id: 'adj_unpaid_fees',
    category: 'adjustment',
    label: '保育料の滞納が3か月以上ありますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unpaid_fees_no', points: 0 },
      { label: 'はい（-10）', value: 'adj_unpaid_fees_yes', points: -10 },
    ],
  },
];

export const tomisatoData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
