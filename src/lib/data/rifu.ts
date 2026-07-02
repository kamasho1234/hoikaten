import type { MunicipalityData, Question } from '../types';

// 出典: https://www.town.rifu.miyagi.jp/section/reiki/reiki_int/reiki_honbun/f600RG00000657.html
// 利府町保育を必要とする子どもの選考基準を定める要綱
// 計算方式: min方式（父母のうち低い方の基準指数 + 調整指数）
// 最高基準指数: 9点（居宅外就労・月20日以上・週40時間以上）

const municipality = {
  id: 'rifu',
  name: '利府町',
  slug: 'rifu',
  prefecture: '宮城県',
  maxBasePoints: 9,
  scoringMethod: 'min',
} as const;

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `p${parentNum}`;
  const parentLabel = parentNum === 1 ? '父（保護者1）' : '母（保護者2）';
  const category = `parent${parentNum}_base` as const;

  const baseOptions = [
    // 居宅外労働（月20日以上）
    { label: '居宅外労働・月20日以上・1日8時間以上', value: `${prefix}_out_20d8h`, points: 9 },
    { label: '居宅外労働・月20日以上・1日6〜8時間未満', value: `${prefix}_out_20d6h`, points: 8 },
    { label: '居宅外労働・月20日以上・1日4〜6時間未満', value: `${prefix}_out_20d4h`, points: 7 },
    // 居宅外労働（月16日以上）
    { label: '居宅外労働・月16日以上・1日8時間以上', value: `${prefix}_out_16d8h`, points: 8 },
    { label: '居宅外労働・月16日以上・1日6〜8時間未満', value: `${prefix}_out_16d6h`, points: 7 },
    { label: '居宅外労働・月16日以上・1日4〜6時間未満', value: `${prefix}_out_16d4h`, points: 6 },
    // 居宅内労働（月20日以上）
    { label: '居宅内労働・月20日以上・1日8時間以上', value: `${prefix}_in_20d8h`, points: 8 },
    { label: '居宅内労働・月20日以上・1日6〜8時間未満', value: `${prefix}_in_20d6h`, points: 7 },
    { label: '居宅内労働・月20日以上・1日4〜6時間未満', value: `${prefix}_in_20d4h`, points: 6 },
    // 居宅内労働（月16日以上）
    { label: '居宅内労働・月16日以上・1日8時間以上', value: `${prefix}_in_16d8h`, points: 7 },
    { label: '居宅内労働・月16日以上・1日6〜8時間未満', value: `${prefix}_in_16d6h`, points: 6 },
    { label: '居宅内労働・月16日以上・1日4〜6時間未満', value: `${prefix}_in_16d4h`, points: 5 },
    // 出産
    { label: '妊娠中または出産後間がない（産前8週・産後8週）', value: `${prefix}_birth`, points: 10 },
    // 疾病
    { label: '疾病・入院（入院内定者を含む）', value: `${prefix}_ill_hosp`, points: 10 },
    { label: '疾病・寝たきりまたは日常生活に大きく支障をきたす状態', value: `${prefix}_ill_bed`, points: 10 },
    { label: '疾病・精神性または感染性疾患', value: `${prefix}_ill_mental`, points: 10 },
    { label: '疾病・一般療養', value: `${prefix}_ill_general`, points: 6 },
    // 介護・看護
    { label: '病人看護（入院付添い・常時）', value: `${prefix}_care_hosp`, points: 10 },
    { label: '寝たきりの病人の看護', value: `${prefix}_care_bed`, points: 8 },
    { label: '在宅障害者の介護（常時付添いが必要）', value: `${prefix}_care_home`, points: 8 },
    // 災害復旧
    { label: '災害復旧中', value: `${prefix}_disaster`, points: 12 },
    // 就学
    { label: '就学（1日6時間以上）', value: `${prefix}_study_6h`, points: 8 },
    { label: '就学（1日4時間以上）', value: `${prefix}_study_4h`, points: 7 },
    // 求職活動
    { label: '求職活動（90日間）', value: `${prefix}_seek`, points: 4 },
    // 保護者不存在
    { label: '保護者不存在（親のいない家庭）', value: `${prefix}_absent`, points: 14 },
    // 該当なし
    { label: '該当なし（在宅）', value: `${prefix}_none`, points: 0 },
  ];

  return [
    {
      id: `${prefix}_situation`,
      category,
      label: `${parentLabel}の就労・保育が必要な事由`,
      helpText: '最も当てはまる状況を1つ選んでください（週就労時間は通勤・休憩を除く）',
      inputType: 'select',
      options: baseOptions,
    },
  ];
}

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_household',
    category: 'adjustment',
    label: '世帯・子どもの状況（加算）',
    helpText: '最も当てはまる区分を1つ選んでください',
    inputType: 'radio',
    options: [
      { label: '地域型保育事業卒園児の継続利用（+5点）', value: 'adj_h_continue', points: 5 },
      { label: '心身の障害がある（+4点）', value: 'adj_h_disabled', points: 4 },
      { label: '保育士世帯（町内保育施設勤務）（+4点）', value: 'adj_h_nursery_in', points: 4 },
      { label: '保育士世帯（町外保育施設勤務）（+2点）', value: 'adj_h_nursery_out', points: 2 },
      { label: 'ひとり親世帯（同居者なし）（+4点）', value: 'adj_h_single', points: 4 },
      { label: 'ひとり親世帯（同居者あり）（+3点）', value: 'adj_h_single_co', points: 3 },
      { label: '障害者（児）世帯（+2点）', value: 'adj_h_disabled_hh', points: 2 },
      { label: '兄弟姉妹が施設利用中または同時申請（+1点）', value: 'adj_h_sibling', points: 1 },
      { label: '該当なし', value: 'adj_h_none', points: 0 },
    ],
  },
  {
    id: 'adj_minus_grandparent',
    category: 'adjustment',
    label: '同居祖父母の状況（減算）',
    helpText: '最も当てはまる区分を1つ選んでください',
    inputType: 'radio',
    options: [
      { label: '60歳未満の祖父母等が同居（-2点）', value: 'adj_m_gp', points: -2 },
      { label: '60〜70歳未満の祖父母等が同居（-1点）', value: 'adj_m_gp_60', points: -1 },
      { label: '該当なし', value: 'adj_m_gp_none', points: 0 },
    ],
  },
];

export const rifuData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
