import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 大垣市 保育所等入園選考基準データ
// 出典: 大垣市「令和8年度 認可保育所等 入園のご案内」
// 計算方式: min（父母のうち優先度の低い方を適用）
// 特記: 点数制ではなくSS/S/A/B/C/D/Eの優先度ランク制
//       ただし父母の一方が「市内保育士等」の場合は高い方の優先度を適用
// ---------------------------------------------------------------------------

const municipality = {
  id: 'ogaki',
  name: '大垣市',
  slug: 'ogaki',
  prefecture: '岐阜県',
  maxBasePoints: 100,
  scoringMethod: 'min' as const,
} as const;

// 優先度ランクを数値化: SS=100, S=90, A=80, B=70, C=60, D=40, E=30
function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  return [
    {
      id: `${prefix}_priority`,
      category,
      label: `${parentLabel}の保育が必要な理由と状況は？`,
      helpText: `大垣市は点数制ではなくSS〜Eの優先度ランク制です。父母のうち優先度の低い方が世帯の優先度になります。ただし保護者の一方が「市内認可保育所等の保育士等」として就労している場合は高い方の優先度が適用されます。`,
      inputType: 'select',
      options: [
        // SS
        {
          label: '保育士等として市内の認可保育所等で就労（月120時間以上）【優先度SS】',
          value: `${prefix}_priority_ss`,
          points: 100,
        },
        // S
        {
          label: '保育士等として市内の認可保育所等で就労（月120時間未満）【優先度S】',
          value: `${prefix}_priority_s`,
          points: 90,
        },
        // A
        {
          label: '居宅外での就労・月120時間以上（一般）【優先度A】',
          value: `${prefix}_priority_a_work120`,
          points: 80,
        },
        {
          label: '自営業（居宅外・月120時間以上）【優先度A】',
          value: `${prefix}_priority_a_self120`,
          points: 80,
        },
        {
          label: '自営業（居宅内・月120時間以上）【優先度A】',
          value: `${prefix}_priority_a_home120`,
          points: 80,
        },
        {
          label: '出産（産前6週〜産後8週）【優先度A】',
          value: `${prefix}_priority_a_birth`,
          points: 80,
        },
        {
          label: '障がい（身障1-2級・療育手帳A・精神障害1級程度）【優先度A】',
          value: `${prefix}_priority_a_dis_heavy`,
          points: 80,
        },
        {
          label: '療養（入院・常時寝たきりが必要）【優先度A】',
          value: `${prefix}_priority_a_ill_heavy`,
          points: 80,
        },
        {
          label: '介護（重度：身障1-2級・療育A・精神1級・要介護4-5程度）【優先度A】',
          value: `${prefix}_priority_a_care_heavy`,
          points: 80,
        },
        {
          label: '災害復旧（家を失った・破損した）【優先度A】',
          value: `${prefix}_priority_a_disaster`,
          points: 80,
        },
        // B
        {
          label: '居宅外での就労・月120時間未満【優先度B】',
          value: `${prefix}_priority_b_work`,
          points: 70,
        },
        {
          label: '自営業（居宅外・月120時間未満）【優先度B】',
          value: `${prefix}_priority_b_self`,
          points: 70,
        },
        {
          label: '家族従業者（居宅外）【優先度B】',
          value: `${prefix}_priority_b_family_out`,
          points: 70,
        },
        {
          label: '障がい（その他・上記以外）【優先度B】',
          value: `${prefix}_priority_b_dis`,
          points: 70,
        },
        {
          label: '療養（その他の病気療養）【優先度B】',
          value: `${prefix}_priority_b_ill`,
          points: 70,
        },
        {
          label: '介護（中等度：身障3級・療育B・精神2級・要介護3程度）【優先度B】',
          value: `${prefix}_priority_b_care`,
          points: 70,
        },
        {
          label: '就学（学校に通っている）【優先度B】',
          value: `${prefix}_priority_b_study`,
          points: 70,
        },
        // C
        {
          label: '家族従業者（居宅内）【優先度C】',
          value: `${prefix}_priority_c_family_in`,
          points: 60,
        },
        {
          label: '内職【優先度C】',
          value: `${prefix}_priority_c_homework`,
          points: 60,
        },
        {
          label: '介護（軽度：その他の介護）【優先度C】',
          value: `${prefix}_priority_c_care_light`,
          points: 60,
        },
        // D
        {
          label: '育児休業中（入園する子が3歳以上）【優先度D】',
          value: `${prefix}_priority_d_leave`,
          points: 40,
        },
        // E
        {
          label: '求職活動中【優先度E】',
          value: `${prefix}_priority_e_jobseeking`,
          points: 30,
        },
      ],
    },
  ];
}

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_sibling_enrolled',
    category: 'adjustment',
    label: '10月1日現在、在園している子どもの兄弟姉妹として入所申込みしますか？',
    helpText: '在園中の子どもの兄弟姉妹は選考対象外で優先継続されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ / 該当なし', value: 'adj_sibling_no', points: 0 },
      { label: 'はい（在園中のきょうだいの兄弟姉妹として申込）', value: 'adj_sibling_yes', points: 30 },
    ],
  },
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親世帯ですか？（同一優先度内での優先）',
    helpText: '同じ優先度ランク内での優先順位に影響します',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_no', points: 0 },
      { label: 'はい', value: 'adj_single_yes', points: 2 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護を受けていますか？（同一優先度内での優先）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい', value: 'adj_welfare_yes', points: 3 },
    ],
  },
  {
    id: 'adj_parental_leave',
    category: 'adjustment',
    label: '産休・育休からの復帰に伴う入園ですか？（同一優先度内での優先）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_leave_no', points: 0 },
      { label: 'はい', value: 'adj_leave_yes', points: 1 },
    ],
  },
];

export const ogakiData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
