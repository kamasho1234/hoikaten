import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 袋井市 保育利用調整基準データ
// 出典: 袋井市「保育所等の入所に係る利用調整指数」令和8年度
// 方式: sum（父母各最大25点）
// ---------------------------------------------------------------------------

const municipality = {
  id: 'fukuroi',
  name: '袋井市',
  slug: 'fukuroi',
  prefecture: '静岡県',
  maxBasePoints: 50,
} as const;

const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '週40時間以上（月160時間以上）（25点）', value: `${prefix}_employment_25`, points: 25 },
  { label: '週30時間以上（月140時間以上）（24点）', value: `${prefix}_employment_24`, points: 24 },
  { label: '週30時間以上（月120時間以上）（23点）', value: `${prefix}_employment_23`, points: 23 },
  { label: '週20時間以上（月100時間以上）（22点）', value: `${prefix}_employment_22`, points: 22 },
  { label: '週20時間以上（月80時間以上）（21点）', value: `${prefix}_employment_21`, points: 21 },
  { label: '週16時間以上（月72時間以上）（20点）', value: `${prefix}_employment_20`, points: 20 },
  { label: '週16時間以上（月64時間以上）（19点）', value: `${prefix}_employment_19`, points: 19 },
  { label: '月64時間以上の上記以外（17点）', value: `${prefix}_employment_17`, points: 17 },
  { label: '内職（月64時間以上）（19点）', value: `${prefix}_employment_19_piecework`, points: 19 },
];

const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '1か月以上入院中・常時病臥（25点）', value: `${prefix}_illness_25`, points: 25 },
  { label: '精神疾患・感染症・難病（23点）', value: `${prefix}_illness_23`, points: 23 },
  { label: 'その他1か月以上の加療（19点）', value: `${prefix}_illness_19`, points: 19 },
];

const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '身体1・2級、療育A、精神1・2級（25点）', value: `${prefix}_disability_25`, points: 25 },
  { label: '身体3級、療育B、精神3級（22点）', value: `${prefix}_disability_22`, points: 22 },
  { label: '身体4級以下（19点）', value: `${prefix}_disability_19`, points: 19 },
];

const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '病院指示による1か月以上の付添い（25点）', value: `${prefix}_care_25`, points: 25 },
  { label: '要介護3～5、身体1・2級、療育A、精神1級（23点）', value: `${prefix}_care_23`, points: 23 },
  { label: '要介護1～2、身体3・4級、療育B、精神2・3級（21点）', value: `${prefix}_care_21`, points: 21 },
  { label: 'その他の介護が必要（19点）', value: `${prefix}_care_19`, points: 19 },
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
      { label: '妊娠・出産（前後8週）（20点）', value: `${prefix}_reason_childbirth`, points: 20 },
      { label: '災害（35点）', value: `${prefix}_reason_disaster`, points: 35 },
      { label: '虐待・DV（35点）', value: `${prefix}_reason_dv`, points: 35 },
      { label: '死亡・離別・行方不明・拘禁（25点）', value: `${prefix}_reason_family_status`, points: 25 },
      { label: '求職活動中（15点）', value: `${prefix}_reason_jobseeking`, points: 15 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の月間就労時間は？`,
      helpText: '就学・職業訓練も同じ基準です',
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
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい（+23）', value: 'adj_welfare_yes', points: 23 },
    ],
  },
  {
    id: 'adj_both_parents_absent',
    category: 'adjustment',
    label: '両親が不在ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_both_parents_absent_no', points: 0 },
      { label: 'はい（+23）', value: 'adj_both_parents_absent_yes', points: 23 },
    ],
  },
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい（+20）', value: 'adj_single_parent_yes', points: 20 },
    ],
  },
  {
    id: 'adj_divorce_mediation',
    category: 'adjustment',
    label: '離婚調停中ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_divorce_mediation_no', points: 0 },
      { label: 'はい（+12）', value: 'adj_divorce_mediation_yes', points: 12 },
    ],
  },
  {
    id: 'adj_three_siblings',
    category: 'adjustment',
    label: '小学生以下の兄弟姉妹が3人以上いますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_three_siblings_no', points: 0 },
      { label: 'はい（+4）', value: 'adj_three_siblings_yes', points: 4 },
    ],
  },
  {
    id: 'adj_two_siblings',
    category: 'adjustment',
    label: '小学生以下の兄弟姉妹が2人いますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_two_siblings_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_two_siblings_yes', points: 2 },
    ],
  },
  {
    id: 'adj_child_disability',
    category: 'adjustment',
    label: '当該児童が障害者手帳等を所持していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_child_disability_no', points: 0 },
      { label: 'はい（+6）', value: 'adj_child_disability_yes', points: 6 },
    ],
  },
  {
    id: 'adj_sibling_disability',
    category: 'adjustment',
    label: '兄弟姉妹が障害者手帳等を所持していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_disability_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_sibling_disability_yes', points: 2 },
    ],
  },
  {
    id: 'adj_developmental_concern',
    category: 'adjustment',
    label: '発達に関する指摘を受けていますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_developmental_concern_no', points: 0 },
      { label: 'はい（+4）', value: 'adj_developmental_concern_yes', points: 4 },
    ],
  },
  {
    id: 'adj_sibling_same_facility',
    category: 'adjustment',
    label: '入所希望園に兄弟姉妹がすでに入所していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_same_facility_no', points: 0 },
      { label: 'はい（+12）', value: 'adj_sibling_same_facility_yes', points: 12 },
    ],
  },
  {
    id: 'adj_small_facility_grad',
    category: 'adjustment',
    label: '地域型保育事業を卒園していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_small_facility_grad_no', points: 0 },
      { label: 'はい（+17）', value: 'adj_small_facility_grad_yes', points: 17 },
    ],
  },
  {
    id: 'adj_childcare_worker_fulltime',
    category: 'adjustment',
    label: '保育士等として常勤（1日6時間以上、月20日以上）で勤務していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_childcare_worker_fulltime_no', points: 0 },
      { label: 'はい（+10）', value: 'adj_childcare_worker_fulltime_yes', points: 10 },
    ],
  },
  {
    id: 'adj_childcare_worker_other',
    category: 'adjustment',
    label: '保育士等として非常勤で勤務していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_childcare_worker_other_no', points: 0 },
      { label: 'はい（+3）', value: 'adj_childcare_worker_other_yes', points: 3 },
    ],
  },
  {
    id: 'adj_afterschool_instructor',
    category: 'adjustment',
    label: '放課後児童クラブ指導員として勤務していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_afterschool_instructor_no', points: 0 },
      { label: 'はい（+5）', value: 'adj_afterschool_instructor_yes', points: 5 },
    ],
  },
  {
    id: 'adj_grandparent_young',
    category: 'adjustment',
    label: '65歳未満の同居祖父母が保育可能ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_grandparent_young_no', points: 0 },
      { label: 'はい（-8）', value: 'adj_grandparent_young_yes', points: -8 },
    ],
  },
  {
    id: 'adj_grandparent_mature',
    category: 'adjustment',
    label: '65～70歳の同居祖父母がいますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_grandparent_mature_no', points: 0 },
      { label: 'はい（-6）', value: 'adj_grandparent_mature_yes', points: -6 },
    ],
  },
  {
    id: 'adj_offer_declined',
    category: 'adjustment',
    label: '過去に内定を辞退したことがありますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_offer_declined_no', points: 0 },
      { label: 'はい（-12）', value: 'adj_offer_declined_yes', points: -12 },
    ],
  },
];

export const fukuroiData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
