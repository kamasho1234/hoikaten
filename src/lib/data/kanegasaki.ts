import type { MunicipalityData, Question } from '../types';

// 出典: https://www1.g-reiki.net/town.kanegasaki.iwate/reiki_honbun/c129RG00000488.html
// 金ケ崎町保育の実施に関する規則（別表1 利用調整基準表）
// 計算方式: sum方式（「父母それぞれの点数の合算を基本点数とする」）
// 最高基本点数: 30点（月20日以上・1日8時間以上就労）

const municipality = {
  id: 'kanegasaki',
  name: '金ケ崎町',
  slug: 'kanegasaki',
  prefecture: '岩手県',
  maxBasePoints: 30,
  scoringMethod: 'sum',
} as const;

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `p${parentNum}`;
  const parentLabel = parentNum === 1 ? '父（保護者1）' : '母（保護者2）';
  const category = `parent${parentNum}_base` as const;

  const baseOptions = [
    // 就労（居宅外）月20日以上
    { label: '就労・居宅外（月20日以上・1日8時間以上）', value: `${prefix}_work_20d8h`, points: 30 },
    { label: '就労・居宅外（月20日以上・1日7時間以上）', value: `${prefix}_work_20d7h`, points: 28 },
    { label: '就労・居宅外（月20日以上・1日6時間以上）', value: `${prefix}_work_20d6h`, points: 26 },
    { label: '就労・居宅外（月20日以上・1日5時間以上）', value: `${prefix}_work_20d5h`, points: 24 },
    { label: '就労・居宅外（月20日以上・1日4時間以上）', value: `${prefix}_work_20d4h`, points: 22 },
    // 就労（居宅外）月15日以上
    { label: '就労・居宅外（月15〜19日・1日8時間以上）', value: `${prefix}_work_15d8h`, points: 24 },
    { label: '就労・居宅外（月15〜19日・1日7時間以上）', value: `${prefix}_work_15d7h`, points: 22 },
    { label: '就労・居宅外（月15〜19日・1日6時間以上）', value: `${prefix}_work_15d6h`, points: 20 },
    { label: '就労・居宅外（月15〜19日・1日5時間以上）', value: `${prefix}_work_15d5h`, points: 18 },
    { label: '就労・居宅外（月15〜19日・1日4時間以上）', value: `${prefix}_work_15d4h`, points: 16 },
    { label: '就労（月48時間以上・その他）', value: `${prefix}_work_48h`, points: 14 },
    // 居宅内労働（自営・農業含む）月20日以上
    { label: '居宅内労働（月20日以上・1日8時間以上）', value: `${prefix}_home_20d8h`, points: 28 },
    { label: '居宅内労働（月20日以上・1日7時間以上）', value: `${prefix}_home_20d7h`, points: 26 },
    { label: '居宅内労働（月20日以上・1日6時間以上）', value: `${prefix}_home_20d6h`, points: 24 },
    { label: '居宅内労働（月20日以上・1日5時間以上）', value: `${prefix}_home_20d5h`, points: 22 },
    { label: '居宅内労働（月20日以上・1日4時間以上）', value: `${prefix}_home_20d4h`, points: 20 },
    // 居宅内労働（自営・農業含む）月15日以上
    { label: '居宅内労働（月15〜19日・1日8時間以上）', value: `${prefix}_home_15d8h`, points: 22 },
    { label: '居宅内労働（月15〜19日・1日7時間以上）', value: `${prefix}_home_15d7h`, points: 20 },
    { label: '居宅内労働（月15〜19日・1日6時間以上）', value: `${prefix}_home_15d6h`, points: 18 },
    { label: '居宅内労働（月15〜19日・1日5時間以上）', value: `${prefix}_home_15d5h`, points: 16 },
    { label: '居宅内労働（月15〜19日・1日4時間以上）', value: `${prefix}_home_15d4h`, points: 14 },
    { label: '居宅内労働（月48時間以上・その他）', value: `${prefix}_home_48h`, points: 12 },
    // 妊娠・出産
    { label: '妊娠・出産（出産前後8週間）', value: `${prefix}_birth`, points: 30 },
    // 疾病
    { label: '疾病・入院または相当治療', value: `${prefix}_ill_hosp`, points: 30 },
    { label: '疾病・週3日程度通院加療', value: `${prefix}_ill_visit3`, points: 24 },
    { label: '疾病・療養必要で保育困難', value: `${prefix}_ill_rest`, points: 22 },
    // 障がい
    { label: '障がい・手帳1〜2級等（常時困難）', value: `${prefix}_dis_heavy`, points: 30 },
    { label: '障がい・手帳3〜4級等（著しく困難）', value: `${prefix}_dis_mid`, points: 24 },
    { label: '障がい・その他手帳所持（保育困難）', value: `${prefix}_dis_other`, points: 22 },
    // 親族の介護・看護
    { label: '介護・常時付き添い必要', value: `${prefix}_care_heavy`, points: 26 },
    { label: '介護・自宅介護（寝たきり等）', value: `${prefix}_care_bed`, points: 24 },
    { label: '介護・その他介護必要', value: `${prefix}_care_other`, points: 22 },
    // 就学
    { label: '就学（月120時間以上）', value: `${prefix}_study_120`, points: 26 },
    { label: '就学（月80時間以上）', value: `${prefix}_study_80`, points: 22 },
    { label: '就学（月48時間以上）', value: `${prefix}_study_48`, points: 14 },
    // 求職活動（内定・月時間数ベース）
    { label: '求職活動（内定・居宅外・月160時間以上）', value: `${prefix}_seek_out_160h`, points: 26 },
    { label: '求職活動（内定・居宅外・月120時間以上）', value: `${prefix}_seek_out_120h`, points: 22 },
    { label: '求職活動（内定・居宅外・月80時間以上）', value: `${prefix}_seek_out_80h`, points: 18 },
    { label: '求職活動（内定・居宅内・月160時間以上）', value: `${prefix}_seek_home_160h`, points: 24 },
    { label: '求職活動（内定・居宅内・月120時間以上）', value: `${prefix}_seek_home_120h`, points: 20 },
    { label: '求職活動（内定・居宅内・月80時間以上）', value: `${prefix}_seek_home_80h`, points: 16 },
    { label: '求職活動（月48時間以上・その他）', value: `${prefix}_seek_48h`, points: 10 },
    // 該当なし
    { label: '該当なし（在宅）', value: `${prefix}_none`, points: 0 },
  ];

  return [
    {
      id: `${prefix}_situation`,
      category,
      label: `${parentLabel}の就労・保育が必要な事由`,
      helpText: '最も当てはまる状況を1つ選んでください（別表1）',
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
      { label: 'ひとり親世帯（+30点）', value: 'adj_h_single', points: 30 },
      { label: '生活保護世帯（+20点）', value: 'adj_h_livelihood', points: 20 },
      { label: '生計中心者が失業中（+20点）', value: 'adj_h_unemployed', points: 20 },
      { label: '該当なし', value: 'adj_h_none', points: 0 },
    ],
  },
  {
    id: 'adj_special',
    category: 'adjustment',
    label: '特別な事情（加算）',
    helpText: '最も当てはまる区分を1つ選んでください',
    inputType: 'radio',
    options: [
      { label: '虐待・DVのおそれあり（+20点）', value: 'adj_s_dv', points: 20 },
      { label: '身体障害3級以上等の同居家族がいる（+20点）', value: 'adj_s_dis', points: 20 },
      { label: '育児休業明けの就労復帰（+10点）', value: 'adj_s_return', points: 10 },
      { label: '兄弟姉妹と同一施設を希望（+10点）', value: 'adj_s_sibling', points: 10 },
      { label: '該当なし', value: 'adj_s_none', points: 0 },
    ],
  },
  {
    id: 'adj_minus',
    category: 'adjustment',
    label: '減算事由',
    helpText: '最も当てはまる区分を1つ選んでください',
    inputType: 'radio',
    options: [
      { label: '保育料の滞納あり（-20点）', value: 'adj_m_delinquent', points: -20 },
      { label: '町外居住（転入予定を除く）（-10点）', value: 'adj_m_outtown', points: -10 },
      { label: '該当なし', value: 'adj_m_none', points: 0 },
    ],
  },
];

export const kanegasakiData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
