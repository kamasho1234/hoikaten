import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 宇土市 保育所等入所選考基準データ
// 出典: 宇土市保育所等入所選考基準要綱
// https://www1.g-reiki.net/uto-city/reiki_honbun/m100RG00000975.html
// ---------------------------------------------------------------------------
// sum方式。父母各最大20点（居宅外労働）。日数×時間のグリッド評価。
// 不存在（死亡・離別等）は30点。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'uto',
  name: '宇土市',
  slug: 'uto',
  prefecture: '熊本県',
  maxBasePoints: 40,
} as const;

const outsideEmploymentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_outside_none`, points: 0 },
  { label: '月20日以上・1日8時間以上（20点）', value: `${prefix}_outside_20`, points: 20 },
  { label: '月20日以上・1日6時間以上 / 月16日以上・1日8時間以上（18点）', value: `${prefix}_outside_18`, points: 18 },
  { label: '月20日以上・1日4時間以上 / 月16日以上・1日6時間以上 / 月12日以上・1日8時間以上（16点）', value: `${prefix}_outside_16`, points: 16 },
  { label: '月16日以上・1日4時間以上 / 月12日以上・1日6時間以上（14点）', value: `${prefix}_outside_14`, points: 14 },
  { label: '月12日以上・1日4時間以上（12点）', value: `${prefix}_outside_12`, points: 12 },
  { label: '上記以外（10点）', value: `${prefix}_outside_10`, points: 10 },
];

const insideEmploymentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_inside_none`, points: 0 },
  { label: '月20日以上・1日8時間以上（19点）', value: `${prefix}_inside_19`, points: 19 },
  { label: '月20日以上・1日6時間以上 / 月16日以上・1日8時間以上（17点）', value: `${prefix}_inside_17`, points: 17 },
  { label: '月20日以上・1日4時間以上 / 月16日以上・1日6時間以上 / 月12日以上・1日8時間以上（15点）', value: `${prefix}_inside_15`, points: 15 },
  { label: '月16日以上・1日4時間以上 / 月12日以上・1日6時間以上（13点）', value: `${prefix}_inside_13`, points: 13 },
  { label: '月12日以上・1日4時間以上（11点）', value: `${prefix}_inside_11`, points: 11 },
  { label: '上記以外（9点）', value: `${prefix}_inside_9`, points: 9 },
];

const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院中（1か月以上）（20点）', value: `${prefix}_illness_20`, points: 20 },
  { label: '自宅療養（常時臥床）（20点）', value: `${prefix}_illness_20b`, points: 20 },
  { label: '精神等で長期加療中（15点）', value: `${prefix}_illness_15`, points: 15 },
  { label: '通院・一般療養（13点）', value: `${prefix}_illness_13`, points: 13 },
];

const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '身体障害1・2級 / 療育A / 精神1級（20点）', value: `${prefix}_disability_20`, points: 20 },
  { label: '身体障害3級 / 療育B / 精神2級（16点）', value: `${prefix}_disability_16`, points: 16 },
  { label: '身体障害4級以下 / 精神3級（11点）', value: `${prefix}_disability_11`, points: 11 },
];

const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '入院中の家族に常時付添い（20点）', value: `${prefix}_care_20`, points: 20 },
  { label: '在宅で要介護者を常時介護（16点）', value: `${prefix}_care_16`, points: 16 },
  { label: '通院付添い等（12点）', value: `${prefix}_care_12`, points: 12 },
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
      { label: '居宅外で働いている', value: `${prefix}_reason_outside`, points: 0 },
      { label: '居宅内で働いている（自営等）', value: `${prefix}_reason_inside`, points: 0 },
      { label: '不存在（死亡・離別・行方不明等）', value: `${prefix}_reason_absent`, points: 30 },
      { label: '病気・けが', value: `${prefix}_reason_illness`, points: 0 },
      { label: '障害', value: `${prefix}_reason_disability`, points: 0 },
      { label: '家族の介護・看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '出産の前後', value: `${prefix}_reason_childbirth`, points: 15 },
      { label: '学校・職業訓練', value: `${prefix}_reason_education`, points: 16 },
      { label: '災害復旧', value: `${prefix}_reason_disaster`, points: 20 },
      { label: '虐待・DV', value: `${prefix}_reason_dv`, points: 20 },
      { label: '仕事を探している', value: `${prefix}_reason_jobseeking`, points: 6 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_outside_employment`,
      category,
      label: `${parentLabel}の居宅外就労の状況は？`,
      helpText: '日数×時間で点数が決まります',
      inputType: 'radio',
      options: outsideEmploymentOptions(prefix),
    },
    {
      id: `${prefix}_inside_employment`,
      category,
      label: `${parentLabel}の居宅内就労（自営等）の状況は？`,
      inputType: 'radio',
      options: insideEmploymentOptions(prefix),
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
    id: 'adj_nursery_worker',
    category: 'adjustment',
    label: '本市の保育士等として就労していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_nursery_worker_no', points: 0 },
      { label: 'はい（+20）', value: 'adj_nursery_worker_yes', points: 20 },
    ],
  },
  {
    id: 'adj_small_grad',
    category: 'adjustment',
    label: '小規模保育等の卒園児ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_small_grad_no', points: 0 },
      { label: 'はい（+10）', value: 'adj_small_grad_yes', points: 10 },
    ],
  },
  {
    id: 'adj_kodomoen',
    category: 'adjustment',
    label: 'こども園の認定切替ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_kodomoen_no', points: 0 },
      { label: 'はい（+10）', value: 'adj_kodomoen_yes', points: 10 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: 'きょうだいが同じ施設に在園中ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_no', points: 0 },
      { label: 'はい（+8）', value: 'adj_sibling_yes', points: 8 },
    ],
  },
  {
    id: 'adj_parental_leave',
    category: 'adjustment',
    label: '育児休業明けの復職入所ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_parental_leave_no', points: 0 },
      { label: 'はい（+4）', value: 'adj_parental_leave_yes', points: 4 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_welfare_yes', points: 2 },
    ],
  },
  {
    id: 'adj_transfer',
    category: 'adjustment',
    label: '同一施設内での転園希望ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_transfer_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_transfer_yes', points: 2 },
    ],
  },
  {
    id: 'adj_unemployment',
    category: 'adjustment',
    label: '生計中心者が失業しましたか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unemployment_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_unemployment_yes', points: 2 },
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
    id: 'adj_commute',
    category: 'adjustment',
    label: '単身赴任ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_commute_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_commute_yes', points: 1 },
    ],
  },
  {
    id: 'adj_grandparent',
    category: 'adjustment',
    label: '祖父母等が補完的に保育可能ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_grandparent_no', points: 0 },
      { label: 'はい（-2）', value: 'adj_grandparent_yes', points: -2 },
    ],
  },
  {
    id: 'adj_other_preschool',
    category: 'adjustment',
    label: '他に就学前の児童を家庭で保育していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_other_preschool_no', points: 0 },
      { label: 'はい（-1）', value: 'adj_other_preschool_yes', points: -1 },
    ],
  },
  {
    id: 'adj_delinquent',
    category: 'adjustment',
    label: '保育料の滞納がありますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_delinquent_no', points: 0 },
      { label: 'はい（-20）', value: 'adj_delinquent_yes', points: -20 },
    ],
  },
];

export const utoData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
