import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 美濃加茂市（岐阜県） 保育所等利用調整基準データ
// 出典: https://www1.g-reiki.net/minokamo/reiki_honbun/i312RG00001553.html
// 美濃加茂市保育の利用調整に関する要綱（別表）
// 計算方式: sum方式（父母それぞれの基準指数を合算）
// 最高基準指数: 各保護者10点 / 世帯合計最大20点
// ---------------------------------------------------------------------------

const municipality = {
  id: 'minokamo',
  name: '美濃加茂市',
  slug: 'minokamo',
  prefecture: '岐阜県',
  maxBasePoints: 20,
  scoringMethod: 'sum',
} as const;

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `p${parentNum}`;
  const parentLabel = parentNum === 1 ? '父（保護者1）' : '母（保護者2）';
  const category = `parent${parentNum}_base` as const;

  const baseOptions = [
    { label: '居宅外就労（月150時間以上）', value: `${prefix}_out_150h`, points: 10 },
    { label: '居宅外自営業・農業（主たる従事者）', value: `${prefix}_self_main_out`, points: 10 },
    { label: '居宅内自営業（主たる従事者）', value: `${prefix}_self_main_in`, points: 10 },
    { label: '疾病（入院長期または常時臥床療養）', value: `${prefix}_ill_severe`, points: 10 },
    { label: '障害（身体1・2級、療育A、精神1級）', value: `${prefix}_dis_severe`, points: 10 },
    { label: '居宅外就労（月120時間以上）', value: `${prefix}_out_120h`, points: 8 },
    { label: '疾病（精神疾病・長期加療）', value: `${prefix}_ill_mental`, points: 8 },
    { label: '介護（心身障害児看護・全介助）', value: `${prefix}_care_child_full`, points: 8 },
    { label: '居宅外就労（月90時間以上）', value: `${prefix}_out_90h`, points: 7 },
    { label: '疾病（がん等・定期通院必要）', value: `${prefix}_ill_moderate`, points: 7 },
    { label: '障害（身体3級、療育B、精神2・3級）', value: `${prefix}_dis_moderate`, points: 7 },
    { label: '就学中（大学・専修学校等）', value: `${prefix}_study`, points: 7 },
    { label: '居宅外就労（月52時間以上）', value: `${prefix}_out_52h`, points: 6 },
    { label: '居宅外自営業・農業（家族協力者）', value: `${prefix}_self_sub_out`, points: 6 },
    { label: '疾病（比較的軽症・定期通院）', value: `${prefix}_ill_mild`, points: 6 },
    { label: '出産（産前6週・多胎14週・産後8週以内）', value: `${prefix}_birth`, points: 6 },
    { label: '介護（入院付き添い長期、または心身障害児看護1・2級）', value: `${prefix}_care_hospital`, points: 6 },
    { label: '障害（身体4級以下）', value: `${prefix}_dis_mild`, points: 5 },
    { label: '居宅内自営業（家族協力者）', value: `${prefix}_self_sub_in`, points: 5 },
    { label: '内職（月120時間以上）', value: `${prefix}_piece_120h`, points: 5 },
    { label: '介護（寝たきり老人介護）', value: `${prefix}_care_bedridden`, points: 5 },
    { label: '内職（月52時間以上）', value: `${prefix}_piece_52h`, points: 4 },
    { label: '介護（心身障害児看護3級、または居宅内看護・長期）', value: `${prefix}_care_home`, points: 4 },
    { label: '求職活動中', value: `${prefix}_seeking`, points: 3 },
    { label: '介護（心身障害児看護4級以下、または居宅外看護・長期）', value: `${prefix}_care_other`, points: 3 },
    { label: '該当なし（在宅）', value: `${prefix}_none`, points: 0 },
  ];

  return [
    {
      id: `${prefix}_situation`,
      category,
      label: `${parentLabel}の保育が必要な主な事由`,
      helpText: '最も当てはまる事由（最も高い点数）を1つ選んでください',
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
      { label: 'はい（+13点）', value: 'adj_sp_yes', points: 13 },
      { label: 'いいえ', value: 'adj_sp_no', points: 0 },
    ],
  },
  {
    id: 'adj_livelihood',
    category: 'adjustment',
    label: '生活保護世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'はい（+13点）', value: 'adj_lh_yes', points: 13 },
      { label: 'いいえ', value: 'adj_lh_no', points: 0 },
    ],
  },
  {
    id: 'adj_nursery_worker',
    category: 'adjustment',
    label: '保護者が市内の保育施設で保育士として勤務していますか？',
    inputType: 'radio',
    options: [
      { label: '1日8時間以上かつ月20日以上勤務（+50点）', value: 'adj_nw_full', points: 50 },
      { label: '上記以外で勤務（+40点）', value: 'adj_nw_partial', points: 40 },
      { label: 'いいえ', value: 'adj_nw_no', points: 0 },
    ],
  },
  {
    id: 'adj_sibling_enrolled',
    category: 'adjustment',
    label: 'きょうだいが同じ施設に在園中ですか？',
    inputType: 'radio',
    options: [
      { label: 'はい（+2点）', value: 'adj_sib_yes', points: 2 },
      { label: 'いいえ', value: 'adj_sib_no', points: 0 },
    ],
  },
  {
    id: 'adj_tuition_arrears',
    category: 'adjustment',
    label: '保育料の滞納がありますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_arr_no', points: 0 },
      { label: '滞納あり（児童手当徴収申出書提出済み）（-15点）', value: 'adj_arr_consent', points: -15 },
      { label: '滞納あり（申出書未提出）（-30点）', value: 'adj_arr_no_consent', points: -30 },
    ],
  },
];

export const minokamoData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
