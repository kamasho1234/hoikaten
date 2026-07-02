import type { MunicipalityData, Question } from '../types';

// 出典: https://www1.g-reiki.net/tono/reiki_honbun/r212RG00001456.html
// 遠野市保育所等の利用に関する事務取扱要綱
// 計算方式: sum方式（父の指数 + 母の指数 + 調整指数）
// ※ひとり親の場合は世帯調整基準+10を加算
// 最高基準指数: 9点（常勤・パート7時間以上/日等）

const municipality = {
  id: 'tono',
  name: '遠野市',
  slug: 'tono',
  prefecture: '岩手県',
  maxBasePoints: 9,
  scoringMethod: 'sum',
} as const;

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `p${parentNum}`;
  const parentLabel = parentNum === 1 ? '父（保護者1）' : '母（保護者2）';
  const category = `parent${parentNum}_base` as const;

  const baseOptions = [
    // 就労
    { label: '就労・常勤（外勤）', value: `${prefix}_work_fulltime`, points: 9 },
    { label: '就労・パート等（1日7時間以上）', value: `${prefix}_work_part7h`, points: 9 },
    { label: '就労・パート等（1日5〜7時間未満）', value: `${prefix}_work_part5h`, points: 7 },
    { label: '就労・パート等（1日5時間未満）', value: `${prefix}_work_part3h`, points: 6 },
    { label: '就労・自営（居宅外）主', value: `${prefix}_work_self_out_main`, points: 9 },
    { label: '就労・自営（居宅外）協力者', value: `${prefix}_work_self_out_sub`, points: 8 },
    { label: '就労・自営（家庭内）主', value: `${prefix}_work_self_in_main`, points: 9 },
    { label: '就労・自営（家庭内）協力者', value: `${prefix}_work_self_in_sub`, points: 7 },
    { label: '就労・農業主', value: `${prefix}_work_farm_main`, points: 8 },
    { label: '就労・農業協力者', value: `${prefix}_work_farm_sub`, points: 6 },
    { label: '就労・内職（1日5時間以上）', value: `${prefix}_work_piecework_hi`, points: 6 },
    { label: '就労・内職（1日5時間未満）', value: `${prefix}_work_piecework_lo`, points: 5 },
    // 出産
    { label: '出産（出産前後3ヶ月以内）', value: `${prefix}_birth`, points: 9 },
    // 疾病
    { label: '疾病・入院（1ヶ月以上見込み）', value: `${prefix}_ill_hosp`, points: 10 },
    { label: '疾病・常時病臥', value: `${prefix}_ill_bed`, points: 10 },
    { label: '疾病・常時安静', value: `${prefix}_ill_rest`, points: 8 },
    { label: '疾病・一般療養', value: `${prefix}_ill_other`, points: 6 },
    { label: '疾病・定期通院等', value: `${prefix}_ill_visit`, points: 4 },
    // 障害
    { label: '障害・手帳1〜2級相当', value: `${prefix}_dis_12`, points: 10 },
    { label: '障害・手帳3級相当', value: `${prefix}_dis_3`, points: 7 },
    { label: '障害・手帳4級以下', value: `${prefix}_dis_4`, points: 5 },
    // 介護・看護
    { label: '介護・入院付添', value: `${prefix}_care_hosp`, points: 10 },
    { label: '介護・心身障害者介護', value: `${prefix}_care_disabled`, points: 10 },
    { label: '介護・寝たきり高齢者介護', value: `${prefix}_care_elderly`, points: 10 },
    { label: '介護・居宅内介護', value: `${prefix}_care_home`, points: 6 },
    // 災害復旧
    { label: '災害復旧中', value: `${prefix}_disaster`, points: 10 },
    // 求職活動
    { label: '求職・就労先確定', value: `${prefix}_seek_decided`, points: 6 },
    { label: '求職・求職活動中', value: `${prefix}_seek_active`, points: 4 },
    // 就学
    { label: '就学（在学中）', value: `${prefix}_study`, points: 7 },
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
      { label: 'ひとり親世帯（+10点）', value: 'adj_h_single', points: 10 },
      { label: '生活保護受給世帯（+5点）', value: 'adj_h_livelihood', points: 5 },
      { label: '生計中心者が失業中（+5点）', value: 'adj_h_unemployed', points: 5 },
      { label: '該当なし', value: 'adj_h_none', points: 0 },
    ],
  },
  {
    id: 'adj_child',
    category: 'adjustment',
    label: '子どもの状況・兄弟姉妹（加算）',
    helpText: '最も当てはまる区分を1つ選んでください',
    inputType: 'radio',
    options: [
      { label: '保育士等の子ども（+7点）', value: 'adj_c_nursery', points: 7 },
      { label: '子どもに障害あり（+2点）', value: 'adj_c_disabled', points: 2 },
      { label: '兄弟姉妹が入所済み（+2点）', value: 'adj_c_sibling_in', points: 2 },
      { label: '小規模保育卒園児（+2点）', value: 'adj_c_small', points: 2 },
      { label: '兄弟姉妹と同時申込（+1点）', value: 'adj_c_sibling_sim', points: 1 },
      { label: '該当なし', value: 'adj_c_none', points: 0 },
    ],
  },
  {
    id: 'adj_individual',
    category: 'adjustment',
    label: '個人の特殊事情（加算）',
    helpText: '最も当てはまる区分を1つ選んでください',
    inputType: 'radio',
    options: [
      { label: '育児休業明けの復職（+4点）', value: 'adj_i_return', points: 4 },
      { label: '該当なし', value: 'adj_i_none', points: 0 },
    ],
  },
  {
    id: 'adj_minus_grandparent',
    category: 'adjustment',
    label: '同居祖父母の状況（減算）',
    helpText: '最も当てはまる区分を1つ選んでください',
    inputType: 'radio',
    options: [
      { label: '65歳未満の同居祖父母が就労していない（-2点）', value: 'adj_m_gp', points: -2 },
      { label: '該当なし', value: 'adj_m_gp_none', points: 0 },
    ],
  },
  {
    id: 'adj_minus_workdays',
    category: 'adjustment',
    label: '月の就労日数による減算',
    helpText: '就労の場合、月の勤務日数を選んでください',
    inputType: 'radio',
    options: [
      { label: '月15〜19日就労（-1点）', value: 'adj_m_wd15', points: -1 },
      { label: '月15日未満就労（-2点）', value: 'adj_m_wd14', points: -2 },
      { label: '月20日以上就労または就労以外の事由（該当なし）', value: 'adj_m_wd_none', points: 0 },
    ],
  },
];

export const tonoData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
