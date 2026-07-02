import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 黒石市（青森県） 保育所等利用調整基準データ
// 出典: https://www1.g-reiki.net/city.kuroishi/reiki_honbun/c005RG00000470.html
// 黒石市保育の実施に関する規則（別表 利用調整基準）
// 計算方式: sum方式（父母それぞれの基準指数に調整指数を合算）
// 最高基本指数: 10点（外勤・月120時間以上）
// ---------------------------------------------------------------------------

const municipality = {
  id: 'kuroishi',
  name: '黒石市',
  slug: 'kuroishi',
  prefecture: '青森県',
  maxBasePoints: 10,
  scoringMethod: 'sum',
} as const;

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `p${parentNum}`;
  const parentLabel = parentNum === 1 ? '父（保護者1）' : '母（保護者2）';
  const category = `parent${parentNum}_base` as const;

  const baseOptions = [
    // 外勤
    { label: '外勤（月120時間以上）', value: `${prefix}_out_120h`, points: 10 },
    { label: '外勤（月48〜120時間未満）', value: `${prefix}_out_48h`, points: 8 },
    // 自営業・農業（中心者）
    { label: '自営業・農業（中心）月120時間以上', value: `${prefix}_self_main_120h`, points: 9 },
    { label: '自営業・農業（中心）月48〜120時間未満', value: `${prefix}_self_main_48h`, points: 7 },
    // 自営業・農業（協力者）
    { label: '自営業・農業（協力）月120時間以上', value: `${prefix}_self_sub_120h`, points: 7 },
    { label: '自営業・農業（協力）月48〜120時間未満', value: `${prefix}_self_sub_48h`, points: 5 },
    // 内職
    { label: '内職（月120時間以上）', value: `${prefix}_piece_120h`, points: 5 },
    { label: '内職（月48〜120時間未満）', value: `${prefix}_piece_48h`, points: 4 },
    // 出産
    { label: '出産（産前産後2ヶ月以内）', value: `${prefix}_birth`, points: 8 },
    // 疾病
    { label: '疾病（入院1ヶ月以上または常時臥床）', value: `${prefix}_ill_severe`, points: 10 },
    { label: '疾病（精神等・1ヶ月以上加療）', value: `${prefix}_ill_mental`, points: 8 },
    { label: '疾病（加療・通院1ヶ月以上）', value: `${prefix}_ill_outpatient`, points: 6 },
    // 障がい
    { label: '障がい（身体1・2級または療育手帳A）', value: `${prefix}_dis_severe`, points: 10 },
    { label: '障がい（身体3級または療育手帳B）', value: `${prefix}_dis_moderate`, points: 7 },
    // 介護
    { label: '介護（入院付添い）', value: `${prefix}_care_hospital`, points: 8 },
    { label: '介護（居宅療養の親族介護）', value: `${prefix}_care_home`, points: 7 },
    { label: '介護（障害児・障害者介護）', value: `${prefix}_care_disabled`, points: 6 },
    // その他
    { label: '災害復旧', value: `${prefix}_disaster`, points: 10 },
    { label: '就学・通学（専修学校等）', value: `${prefix}_study`, points: 8 },
    { label: '求職活動中', value: `${prefix}_seeking`, points: 3 },
    { label: '該当なし（在宅）', value: `${prefix}_none`, points: 0 },
  ];

  return [
    {
      id: `${prefix}_situation`,
      category,
      label: `${parentLabel}の保育が必要な主な事由`,
      helpText: '就労形態・時間に応じた区分を選択してください',
      inputType: 'select',
      options: baseOptions,
    },
  ];
}

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親世帯（死別・離別・未婚等）ですか？',
    inputType: 'radio',
    options: [
      { label: 'はい（+15点）', value: 'adj_sp_yes', points: 15 },
      { label: 'いいえ', value: 'adj_sp_no', points: 0 },
    ],
  },
  {
    id: 'adj_livelihood',
    category: 'adjustment',
    label: '生活保護世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'はい（+5点）', value: 'adj_lh_yes', points: 5 },
      { label: 'いいえ', value: 'adj_lh_no', points: 0 },
    ],
  },
  {
    id: 'adj_breadwinner_unemployed',
    category: 'adjustment',
    label: '生計中心者が失業中（自発的失業を除く）ですか？',
    inputType: 'radio',
    options: [
      { label: 'はい（+5点）', value: 'adj_bu_yes', points: 5 },
      { label: 'いいえ', value: 'adj_bu_no', points: 0 },
    ],
  },
  {
    id: 'adj_abuse_dv',
    category: 'adjustment',
    label: '虐待またはDVのおそれがある世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'はい（+5点）', value: 'adj_dv_yes', points: 5 },
      { label: 'いいえ', value: 'adj_dv_no', points: 0 },
    ],
  },
  {
    id: 'adj_child_disability',
    category: 'adjustment',
    label: '入所を希望する児童が障害児ですか？',
    inputType: 'radio',
    options: [
      { label: 'はい（+5点）', value: 'adj_cd_yes', points: 5 },
      { label: 'いいえ', value: 'adj_cd_no', points: 0 },
    ],
  },
  {
    id: 'adj_parental_leave',
    category: 'adjustment',
    label: '育児休業・産休明けの復職による入所申請ですか？',
    inputType: 'radio',
    options: [
      { label: 'はい（+5点）', value: 'adj_pl_yes', points: 5 },
      { label: 'いいえ', value: 'adj_pl_no', points: 0 },
    ],
  },
  {
    id: 'adj_sibling_enrolled',
    category: 'adjustment',
    label: 'きょうだいが同じ施設に在園中ですか？',
    inputType: 'radio',
    options: [
      { label: 'はい（+5点）', value: 'adj_sib_yes', points: 5 },
      { label: 'いいえ', value: 'adj_sib_no', points: 0 },
    ],
  },
  {
    id: 'adj_nursery_worker',
    category: 'adjustment',
    label: '保護者が市内の保育施設に保育士として就労予定ですか？',
    inputType: 'radio',
    options: [
      { label: 'はい（+5点）', value: 'adj_nw_yes', points: 5 },
      { label: 'いいえ', value: 'adj_nw_no', points: 0 },
    ],
  },
  {
    id: 'adj_sibling_many',
    category: 'adjustment',
    label: '扶養しているきょうだい（子）が3人以上いますか？',
    inputType: 'radio',
    options: [
      { label: 'はい（+2点）', value: 'adj_sm_yes', points: 2 },
      { label: 'いいえ', value: 'adj_sm_no', points: 0 },
    ],
  },
  {
    id: 'adj_waiting',
    category: 'adjustment',
    label: '入所待機中（前年度から継続して待機）ですか？',
    inputType: 'radio',
    options: [
      { label: 'はい（+3点）', value: 'adj_wt_yes', points: 3 },
      { label: 'いいえ', value: 'adj_wt_no', points: 0 },
    ],
  },
  {
    id: 'adj_grandparent',
    category: 'adjustment',
    label: '同居の祖父母（60歳未満）が保育可能ですか？',
    inputType: 'radio',
    options: [
      { label: 'はい（-2点）', value: 'adj_gp_yes', points: -2 },
      { label: 'いいえ', value: 'adj_gp_no', points: 0 },
    ],
  },
  {
    id: 'adj_relative_employer',
    category: 'adjustment',
    label: '親族が雇用主（就労証明が難しい状況）ですか？',
    inputType: 'radio',
    options: [
      { label: 'はい（-2点）', value: 'adj_re_yes', points: -2 },
      { label: 'いいえ', value: 'adj_re_no', points: 0 },
    ],
  },
];

export const kuroishiData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
