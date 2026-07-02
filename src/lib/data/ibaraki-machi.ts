import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 茨城町（茨城県）保育所等利用調整基準データ
// 出典: https://www.town.ibaraki.lg.jp/reiki_int/reiki_honbun/e022RG00000913.html
// 茨城町保育所等の利用調整に関する基準要綱（別表第1・第2・第3）
// 計算方式: sum方式（父の基準指数 + 母の基準指数 + 調整指数）
// 最高基準指数: 20点（月20日以上・1日8時間以上就労等）
// ---------------------------------------------------------------------------

const municipality = {
  id: 'ibaraki-machi',
  name: '茨城町',
  slug: 'ibaraki-machi',
  prefecture: '茨城県',
  maxBasePoints: 20,
  scoringMethod: 'sum',
} as const;

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `p${parentNum}`;
  const parentLabel = parentNum === 1 ? '父（保護者1）' : '母（保護者2）';
  const category = `parent${parentNum}_base` as const;

  const baseOptions = [
    // 就労（外勤・内職）：勤務日数×1日の就労時間で区分
    { label: '就労・月20日以上・1日8時間以上', value: `${prefix}_work_20d8h`, points: 20 },
    { label: '就労・月20日以上・1日6〜8時間未満', value: `${prefix}_work_20d6h`, points: 18 },
    { label: '就労・月20日以上・1日4〜6時間未満', value: `${prefix}_work_20d4h`, points: 16 },
    { label: '就労・月16日以上・1日8時間以上', value: `${prefix}_work_16d8h`, points: 18 },
    { label: '就労・月16日以上・1日6〜8時間未満', value: `${prefix}_work_16d6h`, points: 16 },
    { label: '就労・月16日以上・1日4〜6時間未満', value: `${prefix}_work_16d4h`, points: 14 },
    { label: '就労・月96時間以上（日数問わず）', value: `${prefix}_work_96h`, points: 12 },
    { label: '就労・月64時間以上（日数問わず）', value: `${prefix}_work_64h`, points: 10 },
    // 妊娠・出産
    { label: '妊娠・出産（出産前後8週間）', value: `${prefix}_birth`, points: 20 },
    // 疾病
    { label: '疾病・入院または重度療養', value: `${prefix}_ill_hosp`, points: 20 },
    { label: '疾病・通院加療で常時安静', value: `${prefix}_ill_rest`, points: 18 },
    // 障害
    { label: '障害・身体1〜2級相当', value: `${prefix}_dis_sev`, points: 20 },
    { label: '障害・身体3〜4級相当', value: `${prefix}_dis_mod`, points: 18 },
    { label: '障害・同等の障がい', value: `${prefix}_dis_equiv`, points: 12 },
    // 介護・看護
    { label: '介護・看護（常時付き添いが必要）', value: `${prefix}_care_full`, points: 18 },
    { label: '介護・看護（一部介護が必要）', value: `${prefix}_care_part`, points: 16 },
    { label: '介護・看護（月64時間以上の支援困難）', value: `${prefix}_care_64h`, points: 10 },
    // 別居親族介護・看護
    { label: '別居親族介護・看護（月16日以上かつ1日6時間以上）', value: `${prefix}_care_sep_16d6h`, points: 8 },
    { label: '別居親族介護・看護（月64時間以上）', value: `${prefix}_care_sep_64h`, points: 7 },
    // その他
    { label: '災害復旧中', value: `${prefix}_disaster`, points: 20 },
    { label: '虐待・DV被害', value: `${prefix}_dv`, points: 20 },
    // 就学
    { label: '就学（番号1または6に準ずる）', value: `${prefix}_school`, points: 20 },
    // 求職活動：就労予定の条件により区分
    { label: '求職活動・月20日以上・1日8時間以上予定', value: `${prefix}_seek_20d8h`, points: 10 },
    { label: '求職活動・月20日以上・1日6〜8時間未満予定', value: `${prefix}_seek_20d6h`, points: 9 },
    { label: '求職活動・月20日以上・1日4〜6時間未満予定', value: `${prefix}_seek_20d4h`, points: 8 },
    { label: '求職活動・月16日以上・1日8時間以上予定', value: `${prefix}_seek_16d8h`, points: 9 },
    { label: '求職活動・月16日以上・1日6〜8時間未満予定', value: `${prefix}_seek_16d6h`, points: 8 },
    { label: '求職活動・月16日以上・1日4〜6時間未満予定', value: `${prefix}_seek_16d4h`, points: 7 },
    { label: '求職活動・月96時間以上予定', value: `${prefix}_seek_96h`, points: 6 },
    { label: '求職活動・月64時間以上予定', value: `${prefix}_seek_64h`, points: 5 },
    { label: '求職活動・就労先未定（求職中）', value: `${prefix}_seek_unknown`, points: 2 },
    // 該当なし
    { label: '該当なし（在宅）', value: `${prefix}_none`, points: 0 },
  ];

  return [
    {
      id: `${prefix}_situation`,
      category,
      label: `${parentLabel}の就労・保育が必要な事由（別表第1）`,
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
    label: '世帯の状況（別表第2・加算）',
    helpText: '最も当てはまる区分を1つ選んでください',
    inputType: 'radio',
    options: [
      { label: 'ひとり親世帯（+25点）', value: 'adj_h_single', points: 25 },
      { label: 'ひとり親で就労・就学予定（+5点）', value: 'adj_h_single_work', points: 5 },
      { label: '社会的養護が必要（里親・施設入所等）（+10点）', value: 'adj_h_foster', points: 10 },
      { label: '生活保護世帯で就労必要（+2点）', value: 'adj_h_welfare', points: 2 },
      { label: '育休明けの復職と同時利用申請（+2点）', value: 'adj_h_return', points: 2 },
      { label: '該当なし', value: 'adj_h_none', points: 0 },
    ],
  },
  {
    id: 'adj_child',
    category: 'adjustment',
    label: '兄弟姉妹の申込状況（別表第2・加算）',
    helpText: '最も当てはまる区分を1つ選んでください',
    inputType: 'radio',
    options: [
      { label: '兄弟姉妹と同時申込（+1点）', value: 'adj_c_sibling', points: 1 },
      { label: '兄弟姉妹既利用（+2点）', value: 'adj_c_using', points: 2 },
      { label: '兄弟姉妹同施設転園（+2点）', value: 'adj_c_transfer', points: 2 },
      { label: '該当なし', value: 'adj_c_none', points: 0 },
    ],
  },
  {
    id: 'adj_worker',
    category: 'adjustment',
    label: '保育施設での就労（別表第2・加算）',
    helpText: '最も当てはまる区分を1つ選んでください',
    inputType: 'radio',
    options: [
      { label: '町内の保育施設で保育士等として就労（+10点）', value: 'adj_w_town', points: 10 },
      { label: '町外の保育士等として就労（+5点）', value: 'adj_w_out', points: 5 },
      { label: '該当なし', value: 'adj_w_none', points: 0 },
    ],
  },
  {
    id: 'adj_special',
    category: 'adjustment',
    label: '特別な事情（別表第2・加算）',
    helpText: '最も当てはまる区分を1つ選んでください',
    inputType: 'radio',
    options: [
      { label: '単身赴任（+2点）', value: 'adj_s_transfer', points: 2 },
      { label: '転勤・転居による転園必要（+2点）', value: 'adj_s_relocation', points: 2 },
      { label: '該当なし', value: 'adj_s_none', points: 0 },
    ],
  },
  {
    id: 'adj_recognized',
    category: 'adjustment',
    label: '認可外・認定こども園の利用状況（別表第2・加算）',
    helpText: '最も当てはまる区分を1つ選んでください',
    inputType: 'radio',
    options: [
      { label: '認可外利用継続中（+2点）', value: 'adj_r_unrecognized', points: 2 },
      { label: '認可外利用者（3歳以上児）（+1点）', value: 'adj_r_unrecognized_3yo', points: 1 },
      { label: '認定こども園で同一施設継続（+2点）', value: 'adj_r_kindergarten', points: 2 },
      { label: '該当なし', value: 'adj_r_none', points: 0 },
    ],
  },
  {
    id: 'adj_minus_grandparent',
    category: 'adjustment',
    label: '同居祖父母の状況（別表第3・減算）',
    helpText: '最も当てはまる区分を1つ選んでください',
    inputType: 'radio',
    options: [
      { label: '同居祖父母（65歳未満）が就労していない（-10点）', value: 'adj_m_gp', points: -10 },
      { label: '該当なし', value: 'adj_m_gp_none', points: 0 },
    ],
  },
  {
    id: 'adj_minus_other',
    category: 'adjustment',
    label: 'その他の減算事由（別表第3）',
    helpText: '最も当てはまる区分を1つ選んでください',
    inputType: 'radio',
    options: [
      { label: '町外在住で町外勤務（-20点）', value: 'adj_m_out_out', points: -20 },
      { label: '就学前の他の子が保育施設未申込（-10点）', value: 'adj_m_no_enroll', points: -10 },
      { label: '利用者負担2か月以上滞納（-10点）', value: 'adj_m_unpaid', points: -10 },
      { label: '町外在住で町内勤務（-10点）', value: 'adj_m_out_in', points: -10 },
      { label: '該当なし', value: 'adj_m_none', points: 0 },
    ],
  },
];

export const ibarakiMachiData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
