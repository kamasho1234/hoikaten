import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 糸島市 保育所等利用調整基準データ
// 出典: 糸島市「利用調整基準（令和4年度版）」
// 計算方式: sum（父母それぞれの基礎点＋加点を合算）
// 特記: 複数の保育事由がある場合は最も高い基礎点のみ適用
// ---------------------------------------------------------------------------

const municipality = {
  id: 'itoshima',
  name: '糸島市',
  slug: 'itoshima',
  prefecture: '福岡県',
  maxBasePoints: 90, // 父母各45点（月160時間就労または重度障がい等）
} as const;

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  return [
    {
      id: `${prefix}_base`,
      category,
      label: `${parentLabel}の保育が必要な理由と状況は？`,
      helpText: '最も状況に近いものをひとつ選んでください（複数の理由がある場合は最も高い点数のものを選択）',
      inputType: 'select',
      options: [
        { label: 'あてはまらない', value: `${prefix}_none`, points: 0 },
        // 就労（被雇用・自営業主）
        { label: '就労：月160時間以上', value: `${prefix}_work_45`, points: 45 },
        { label: '就労：月140時間以上160時間未満', value: `${prefix}_work_43`, points: 43 },
        { label: '就労：月120時間以上140時間未満', value: `${prefix}_work_41`, points: 41 },
        { label: '就労：月100時間以上120時間未満', value: `${prefix}_work_39`, points: 39 },
        { label: '就労：月80時間以上100時間未満', value: `${prefix}_work_37`, points: 37 },
        { label: '就労：月60時間以上80時間未満', value: `${prefix}_work_35`, points: 35 },
        // 就労（自営業協力者）
        { label: '就労（自営業協力者）：月160時間以上', value: `${prefix}_work_sub_44`, points: 44 },
        { label: '就労（自営業協力者）：月140時間以上160時間未満', value: `${prefix}_work_sub_42`, points: 42 },
        { label: '就労（自営業協力者）：月120時間以上140時間未満', value: `${prefix}_work_sub_40`, points: 40 },
        { label: '就労（自営業協力者）：月100時間以上120時間未満', value: `${prefix}_work_sub_38`, points: 38 },
        { label: '就労（自営業協力者）：月80時間以上100時間未満', value: `${prefix}_work_sub_36`, points: 36 },
        { label: '就労（自営業協力者）：月60時間以上80時間未満', value: `${prefix}_work_sub_34`, points: 34 },
        // 妊娠・出産
        { label: '妊娠・出産（入所希望日が出産予定月の前後2か月以内）', value: `${prefix}_birth_45`, points: 45 },
        // 疾病
        { label: '疾病・負傷：入院または入院相当の治療（常に病臥）', value: `${prefix}_ill_45`, points: 45 },
        { label: '疾病・負傷：自宅療養で常に安静を要する', value: `${prefix}_ill_41`, points: 41 },
        { label: '疾病・負傷：その他保育が常時困難と認められる', value: `${prefix}_ill_37`, points: 37 },
        // 障がい
        { label: '障がい：身障1-2級・精神1級・療育手帳A', value: `${prefix}_dis_45`, points: 45 },
        { label: '障がい：身障3-4級・精神2-3級・療育手帳B', value: `${prefix}_dis_41`, points: 41 },
        { label: '障がい：その他の等級の手帳交付', value: `${prefix}_dis_37`, points: 37 },
        // 介護・看護
        { label: '介護・看護：月120時間以上', value: `${prefix}_care_41`, points: 41 },
        { label: '介護・看護：月60時間以上120時間未満', value: `${prefix}_care_35`, points: 35 },
        { label: '介護・看護：その他保育が常時困難と認められる', value: `${prefix}_care_15`, points: 15 },
        // 就学
        { label: '就学：月120時間以上', value: `${prefix}_study_41`, points: 41 },
        { label: '就学：月60時間以上120時間未満', value: `${prefix}_study_35`, points: 35 },
        { label: '就学：その他保育が常時困難と認められる', value: `${prefix}_study_15`, points: 15 },
        // 求職活動
        { label: '求職活動中（継続的に求職活動）', value: `${prefix}_jobseeking_15`, points: 15 },
        // 災害・虐待DV
        { label: '災害復旧（震災・風水害・火災等）', value: `${prefix}_disaster_100`, points: 100 },
        { label: '虐待・DV（社会的養護が必要と市長が認める）', value: `${prefix}_dv_100`, points: 100 },
      ],
    },
  ];
}

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親家庭ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_no', points: 0 },
      { label: 'はい', value: 'adj_single_yes', points: 55 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: 'きょうだいが同じ施設を利用していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_none', points: 0 },
      { label: 'きょうだいが既に認可保育所等を利用中', value: 'adj_sibling_enrolled', points: 15 },
      { label: 'きょうだいと同時に認可保育所等へ申込', value: 'adj_sibling_simultaneous', points: 5 },
    ],
  },
  {
    id: 'adj_nursery_staff',
    category: 'adjustment',
    label: '糸島市内勤務の保育士・幼稚園教諭ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_nursery_no', points: 0 },
      { label: 'はい（糸島市内の保育士・幼稚園教諭）', value: 'adj_nursery_yes', points: 30 },
    ],
  },
  {
    id: 'adj_child_disability',
    category: 'adjustment',
    label: '申請する子どもに障がいがありますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_child_dis_no', points: 0 },
      { label: 'はい（申込児童本人が障がいを有する）', value: 'adj_child_dis_yes', points: 5 },
    ],
  },
];

export const itoshimaData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
