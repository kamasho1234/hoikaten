import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 松前町（愛媛県）保育所等利用調整基準データ
// 出典: https://www.town.masaki.ehime.jp/reiki_int/reiki_honbun/o242RG00000581.html
// 松前町保育の利用の調整及び保育措置に関する規則（別表第1・第2）
// 計算方式: sum方式（父の基準指数 + 母の基準指数 + 調整指数）
// 最高基準指数: 10点（月140時間以上就労・常時臥床・重度障害等）
// ---------------------------------------------------------------------------

const municipality = {
  id: 'masaki',
  name: '松前町',
  slug: 'masaki',
  prefecture: '愛媛県',
  maxBasePoints: 10,
  scoringMethod: 'sum',
} as const;

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `p${parentNum}`;
  const parentLabel = parentNum === 1 ? '父（保護者1）' : '母（保護者2）';
  const category = `parent${parentNum}_base` as const;

  const baseOptions = [
    // 就労（外勤・内職）：月の就労時間で区分
    { label: '就労・月140時間以上', value: `${prefix}_work_140`, points: 10 },
    { label: '就労・月120〜140時間未満', value: `${prefix}_work_120`, points: 9 },
    { label: '就労・月100〜120時間未満', value: `${prefix}_work_100`, points: 8 },
    { label: '就労・月80〜100時間未満', value: `${prefix}_work_80`, points: 7 },
    { label: '就労・月64〜80時間未満', value: `${prefix}_work_64`, points: 6 },
    // 妊娠・出産（母のみ）
    ...(parentNum === 2 ? [{ label: '妊娠・出産（出産予定8週前〜産後8週）', value: `${prefix}_birth`, points: 10 }] : []),
    // 疾病
    { label: '疾病・常時臥床または1か月以上入院', value: `${prefix}_ill_hosp`, points: 10 },
    { label: '疾病・療養（通院含む）', value: `${prefix}_ill_therapy`, points: 7 },
    { label: '疾病・軽易な病状', value: `${prefix}_ill_mild`, points: 3 },
    // 障害
    { label: '障害・身体1〜2級・精神1〜2級・療育手帳A', value: `${prefix}_dis_sev`, points: 10 },
    { label: '障害・身体3級・精神3級', value: `${prefix}_dis_mod`, points: 8 },
    { label: '障害・身体4〜6級', value: `${prefix}_dis_mild`, points: 6 },
    // 介護・看護（時間区分）
    { label: '介護・看護（常時寝たきり・要介護3〜5）', value: `${prefix}_care_bed`, points: 10 },
    { label: '介護・看護・月140時間以上', value: `${prefix}_care_140`, points: 10 },
    { label: '介護・看護・月120〜140時間未満', value: `${prefix}_care_120`, points: 9 },
    { label: '介護・看護・月100〜120時間未満', value: `${prefix}_care_100`, points: 8 },
    { label: '介護・看護・月80〜100時間未満', value: `${prefix}_care_80`, points: 7 },
    { label: '介護・看護・月64〜80時間未満', value: `${prefix}_care_64`, points: 6 },
    { label: '介護・看護・月64時間未満', value: `${prefix}_care_other`, points: 3 },
    // 教育・訓練事由：月の訓練時間で区分
    { label: '教育・訓練・月140時間以上', value: `${prefix}_train_140`, points: 10 },
    { label: '教育・訓練・月120〜140時間未満', value: `${prefix}_train_120`, points: 9 },
    { label: '教育・訓練・月100〜120時間未満', value: `${prefix}_train_100`, points: 8 },
    { label: '教育・訓練・月80〜100時間未満', value: `${prefix}_train_80`, points: 7 },
    { label: '教育・訓練・月64〜80時間未満', value: `${prefix}_train_64`, points: 6 },
    { label: '教育・訓練・月64時間未満', value: `${prefix}_train_other`, points: 3 },
    // その他
    { label: '震災復旧中', value: `${prefix}_disaster`, points: 10 },
    { label: '求職活動（失業・特別事情）', value: `${prefix}_seek_special`, points: 10 },
    { label: '求職活動（一般）', value: `${prefix}_seek`, points: 2 },
    // 児童虐待・DV予防事由（父/保護者1のみ）
    ...(parentNum === 1 ? [
      { label: '児童虐待等予防事由', value: `${prefix}_abuse_prevent`, points: 20 },
      { label: 'DV（ドメスティックバイオレンス）予防', value: `${prefix}_dv`, points: 10 },
    ] : []),
    // 育児休業中の継続利用事由（母/保護者2のみ）
    ...(parentNum === 2 ? [{ label: '育児休業中の継続利用事由', value: `${prefix}_parental_continue`, points: 2 }] : []),
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
    label: '世帯の特殊事情（別表第2・加算）',
    helpText: '最も当てはまる区分を1つ選んでください',
    inputType: 'radio',
    options: [
      { label: '両親が不存在（祖父母等が保護者）（+10点）', value: 'adj_h_noparents', points: 10 },
      { label: 'ひとり親家庭で就労が必要（+8点）', value: 'adj_h_single', points: 8 },
      { label: '生活保護世帯で就労が必要（+6点）', value: 'adj_h_welfare', points: 6 },
      { label: '該当なし', value: 'adj_h_none', points: 0 },
    ],
  },
  {
    id: 'adj_child',
    category: 'adjustment',
    label: '児童・入所状況（別表第2・加算）',
    helpText: '最も当てはまる区分を1つ選んでください',
    inputType: 'radio',
    options: [
      { label: '申込児童が障がいを持つ（優先保育対象）（+10点）', value: 'adj_c_disable', points: 10 },
      { label: '育児休業満了後のための申込（+8点）', value: 'adj_c_parental', points: 8 },
      { label: '兄弟姉妹が同一施設を希望（+8点）', value: 'adj_c_sibling_same', points: 8 },
      { label: '兄弟姉妹と同時利用を希望（+8点）', value: 'adj_c_sibling_multi', points: 8 },
      { label: '多胎児（+8点）', value: 'adj_c_twins', points: 8 },
      { label: '地域型保育施設（小規模保育等）の卒園児（+10点）', value: 'adj_c_chiiki', points: 10 },
      { label: '該当なし', value: 'adj_c_none', points: 0 },
    ],
  },
  {
    id: 'adj_worker',
    category: 'adjustment',
    label: '保育職従事（別表第2・加算）',
    helpText: '最も当てはまる区分を1つ選んでください',
    inputType: 'radio',
    options: [
      { label: '町内の保育施設で保育職として勤務（+10点）', value: 'adj_w_town', points: 10 },
      { label: '町外の保育施設で保育職として勤務（+4点）', value: 'adj_w_other', points: 4 },
      { label: '該当なし', value: 'adj_w_none', points: 0 },
    ],
  },
  {
    id: 'adj_minus',
    category: 'adjustment',
    label: '減算事由（別表第2）',
    helpText: '最も当てはまる区分を1つ選んでください',
    inputType: 'radio',
    options: [
      { label: '育児休業の延長が許容される（-20点）', value: 'adj_m_ikukyu', points: -20 },
      { label: '前年度保育料を相談なしに未納（-10点）', value: 'adj_m_unpaid_no', points: -10 },
      { label: '前年度保育料を未納（その他）（-5点）', value: 'adj_m_unpaid_other', points: -5 },
      { label: '同居親族が就労していない（家庭保育可）（-6点）', value: 'adj_m_home', points: -6 },
      { label: '該当なし', value: 'adj_m_none', points: 0 },
    ],
  },
];

export const masakiData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
