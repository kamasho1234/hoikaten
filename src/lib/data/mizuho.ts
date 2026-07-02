import type { MunicipalityData, Question } from '../types';

// 出典: https://www1.g-reiki.net/mizuho/reiki_honbun/g152RG00000593.html
// 瑞穂町保育の利用等に関する規則（別表）
// 計算方式: sum方式（父の基準指数 + 母の基準指数 + 調整指数）
// 最高基準指数: 20点

const municipality = {
  id: 'mizuho',
  name: '瑞穂町',
  slug: 'mizuho',
  prefecture: '東京都',
  maxBasePoints: 20,
  scoringMethod: 'sum',
} as const;

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `p${parentNum}`;
  const parentLabel = parentNum === 1 ? '父（保護者1）' : '母（保護者2）';
  const category = `parent${parentNum}_base` as const;

  const baseOptions = [
    // 就労（週の日数×1日の時間で区分）
    { label: '就労・週5日(月20日以上)・1日8時間以上', value: `${prefix}_work_5d8h`, points: 20 },
    { label: '就労・週5日(月20日以上)・1日6〜8時間未満', value: `${prefix}_work_5d6h`, points: 18 },
    { label: '就労・週5日(月20日以上)・1日4〜6時間未満', value: `${prefix}_work_5d4h`, points: 16 },
    { label: '就労・週4日(月16日以上)・1日8時間以上', value: `${prefix}_work_4d8h`, points: 18 },
    { label: '就労・週4日(月16日以上)・1日6〜8時間未満', value: `${prefix}_work_4d6h`, points: 16 },
    { label: '就労・週4日(月16日以上)・1日4〜6時間未満', value: `${prefix}_work_4d4h`, points: 14 },
    { label: '就労・週3日(月12日以上)・1日8時間以上', value: `${prefix}_work_3d8h`, points: 16 },
    { label: '就労・週3日(月12日以上)・1日6〜8時間未満', value: `${prefix}_work_3d6h`, points: 14 },
    { label: '就労・週3日(月12日以上)・1日4〜6時間未満', value: `${prefix}_work_3d4h`, points: 12 },
    { label: '就労・その他（明らかに保育が必要）', value: `${prefix}_work_other`, points: 12 },
    // 出産
    { label: '出産（出産予定月前後2月含む5月以内）', value: `${prefix}_birth`, points: 18 },
    // 疾病
    { label: '疾病・入院（1月以上見込み）', value: `${prefix}_ill_hosp`, points: 20 },
    { label: '疾病・自宅療養（常時病臥・精神疾患・感染症）', value: `${prefix}_ill_bed`, points: 20 },
    { label: '疾病・週3日以上通院', value: `${prefix}_ill_3d`, points: 16 },
    { label: '疾病・週1〜2日以上通院', value: `${prefix}_ill_1d`, points: 14 },
    { label: '疾病・その他自宅療養', value: `${prefix}_ill_other`, points: 12 },
    // 障害
    { label: '障害・身体1・2級＋愛の手帳1・2度＋精神1・2級', value: `${prefix}_dis_12`, points: 20 },
    { label: '障害・身体3級＋愛の手帳3度＋精神3級', value: `${prefix}_dis_3`, points: 18 },
    { label: '障害・身体4級＋愛の手帳4度', value: `${prefix}_dis_4`, points: 16 },
    // 介護・看護
    { label: '介護・常時介護または週5日以上付添い', value: `${prefix}_care_full`, points: 20 },
    { label: '介護・一部介護または週3日以上付添い', value: `${prefix}_care_part`, points: 12 },
    { label: '介護・その他', value: `${prefix}_care_other`, points: 10 },
    // 災害復旧
    { label: '災害復旧中', value: `${prefix}_disaster`, points: 20 },
    // 求職活動（就労内定）
    { label: '求職・就労内定（月160時間以上）', value: `${prefix}_seek_160h`, points: 16 },
    { label: '求職・就労内定（月120〜159時間）', value: `${prefix}_seek_120h`, points: 14 },
    { label: '求職・就労内定（月80〜119時間）', value: `${prefix}_seek_80h`, points: 12 },
    { label: '求職・就労内定（月48〜79時間）', value: `${prefix}_seek_48h`, points: 10 },
    { label: '求職・就労内定（その他）', value: `${prefix}_seek_inner`, points: 8 },
    { label: '求職・就労未定（証明書あり）', value: `${prefix}_seek_cert`, points: 8 },
    { label: '求職・就労未定（証明書なし）', value: `${prefix}_seek_none`, points: 6 },
    // 就学
    { label: '就学・日中外出が常態', value: `${prefix}_study_day`, points: 16 },
    { label: '就学・実習等ある通信課程', value: `${prefix}_study_comm`, points: 14 },
    { label: '就学・その他（保育不可）', value: `${prefix}_study_other`, points: 12 },
    // 保護者不存在
    { label: '保護者不存在（死亡・離別等）', value: `${prefix}_absent`, points: 20 },
    // 該当なし
    { label: '該当なし（在宅）', value: `${prefix}_none`, points: 0 },
  ];

  return [
    {
      id: `${prefix}_situation`,
      category,
      label: `${parentLabel}の就労・保育が必要な事由`,
      helpText: '最も当てはまる状況を1つ選んでください',
      inputType: 'select',
      options: baseOptions,
    },
  ];
}

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_household',
    category: 'adjustment',
    label: '世帯の状況（加算）',
    helpText: '最も当てはまる区分を1つ選んでください',
    inputType: 'radio',
    options: [
      { label: '生活保護受給世帯（+4点）', value: 'adj_h_livelihood', points: 4 },
      { label: 'ひとり親または準ずる世帯（+4点）', value: 'adj_h_single', points: 4 },
      { label: '該当なし', value: 'adj_h_none', points: 0 },
    ],
  },
  {
    id: 'adj_facility',
    category: 'adjustment',
    label: '小規模保育施設卒園・認証保育所在園（加算）',
    helpText: '最も当てはまる区分を1つ選んでください',
    inputType: 'radio',
    options: [
      { label: '小規模保育施設を卒園して別園へ入園（+10点）', value: 'adj_f_small', points: 10 },
      { label: '認証保育所在園で条件該当（+2点）', value: 'adj_f_cert', points: 2 },
      { label: '該当なし', value: 'adj_f_none', points: 0 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: '兄弟姉妹・多胎の同園希望（加算）',
    helpText: '最も当てはまる区分を1つ選んでください',
    inputType: 'radio',
    options: [
      { label: '多胎児で同一園希望（+2点）', value: 'adj_s_twin', points: 2 },
      { label: '兄弟姉妹で同一園希望（+2点）', value: 'adj_s_sib', points: 2 },
      { label: '該当なし', value: 'adj_s_none', points: 0 },
    ],
  },
  {
    id: 'adj_worker',
    category: 'adjustment',
    label: '保育施設での就労（加算）',
    helpText: '最も当てはまる区分を1つ選んでください',
    inputType: 'radio',
    options: [
      { label: '保育施設での業務従事（+1点）', value: 'adj_w_facility', points: 1 },
      { label: '該当なし', value: 'adj_w_none', points: 0 },
    ],
  },
  {
    id: 'adj_minus_work',
    category: 'adjustment',
    label: '就労状況の特殊事情（減算）',
    helpText: '最も当てはまる区分を1つ選んでください',
    inputType: 'radio',
    options: [
      { label: '就労実績なし（-2点）', value: 'adj_m_nohist', points: -2 },
      { label: '親族事業所勤務または配偶者控除対象（-2点）', value: 'adj_m_family', points: -2 },
      { label: '該当なし', value: 'adj_m_work_none', points: 0 },
    ],
  },
  {
    id: 'adj_minus_grandparent',
    category: 'adjustment',
    label: '同居祖父母の状況（減算）',
    helpText: '最も当てはまる区分を1つ選んでください',
    inputType: 'radio',
    options: [
      { label: '65歳未満の同居祖父母が養護可能（-1点）', value: 'adj_m_gp', points: -1 },
      { label: '該当なし', value: 'adj_m_gp_none', points: 0 },
    ],
  },
  {
    id: 'adj_minus_other',
    category: 'adjustment',
    label: 'その他の減算事由',
    helpText: '最も当てはまる区分を1つ選んでください',
    inputType: 'radio',
    options: [
      { label: '利用者負担を3月以上滞納（-10点）', value: 'adj_m_unpaid', points: -10 },
      { label: '町外在住で転入予定なし（-4点）', value: 'adj_m_outside', points: -4 },
      { label: '該当なし', value: 'adj_m_other_none', points: 0 },
    ],
  },
];

export const mizuhoData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
