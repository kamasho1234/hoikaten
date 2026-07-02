import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 八街市（千葉県）保育所等利用調整基準データ
// 出典: https://www1.g-reiki.net/city.yachimata/reiki_honbun/g031RG00000305.html
// 八街市保育所管理及び運営に関する規則（別表第1 指数基準表・別表第2 調整事由）
// 計算方式: sum方式（明記なし・ひとり親+10点の設計から父母合算方式と推定）
// 最高基準点数: 居宅外労働（月20日以上・月実働160時間以上）・疾病入院1か月以上・重度障害で20点
// ---------------------------------------------------------------------------

const municipality = {
  id: 'yachimata',
  name: '八街市',
  slug: 'yachimata',
  prefecture: '千葉県',
  maxBasePoints: 20,
  scoringMethod: 'sum',
} as const;

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `p${parentNum}`;
  const parentLabel = parentNum === 1 ? '父（保護者1）' : '母（保護者2）';
  const category = `parent${parentNum}_base` as const;

  const baseOptions = [
    // 居宅外労働（月20日以上）
    { label: '居宅外労働・月20日以上・月実働160時間以上', value: `${prefix}_out_20d_160h`, points: 20 },
    { label: '居宅外労働・月20日以上・月実働120〜160時間未満', value: `${prefix}_out_20d_120h`, points: 18 },
    { label: '居宅外労働・月20日以上・月実働80〜120時間未満', value: `${prefix}_out_20d_80h`, points: 16 },
    { label: '居宅外労働・月20日以上・月実働60〜80時間未満', value: `${prefix}_out_20d_60h`, points: 14 },
    // 居宅外労働（月15〜20日未満）
    { label: '居宅外労働・月15〜20日未満・月実働160時間以上', value: `${prefix}_out_15d_160h`, points: 16 },
    { label: '居宅外労働・月15〜20日未満・月実働120〜160時間未満', value: `${prefix}_out_15d_120h`, points: 14 },
    { label: '居宅外労働・月15〜20日未満・月実働80〜120時間未満', value: `${prefix}_out_15d_80h`, points: 12 },
    { label: '居宅外労働・月15〜20日未満・月実働60〜80時間未満', value: `${prefix}_out_15d_60h`, points: 10 },
    // 居宅外労働（月15日未満）
    { label: '居宅外労働・月15日未満・月実働160時間以上', value: `${prefix}_out_u15d_160h`, points: 10 },
    { label: '居宅外労働・月15日未満・月実働120〜160時間未満', value: `${prefix}_out_u15d_120h`, points: 9 },
    { label: '居宅外労働・月15日未満・月実働80〜120時間未満', value: `${prefix}_out_u15d_80h`, points: 8 },
    { label: '居宅外労働・月15日未満・月実働60〜80時間未満', value: `${prefix}_out_u15d_60h`, points: 7 },
    // 自営業（代表者）
    { label: '自営業（代表者）・月実働160時間以上', value: `${prefix}_self_rep_160h`, points: 18 },
    { label: '自営業（代表者）・月実働120〜160時間未満', value: `${prefix}_self_rep_120h`, points: 16 },
    { label: '自営業（代表者）・月実働80〜120時間未満', value: `${prefix}_self_rep_80h`, points: 14 },
    { label: '自営業（代表者）・月実働60〜80時間未満', value: `${prefix}_self_rep_60h`, points: 12 },
    // 自営業（協力者）
    { label: '自営業（協力者）・月実働160時間以上', value: `${prefix}_self_hlp_160h`, points: 15 },
    { label: '自営業（協力者）・月実働120〜160時間未満', value: `${prefix}_self_hlp_120h`, points: 13 },
    { label: '自営業（協力者）・月実働80〜120時間未満', value: `${prefix}_self_hlp_80h`, points: 11 },
    { label: '自営業（協力者）・月実働60〜80時間未満', value: `${prefix}_self_hlp_60h`, points: 9 },
    // 居宅内労働
    { label: '居宅内労働（在宅勤務・内職等）・月実働160時間以上', value: `${prefix}_home_160h`, points: 14 },
    { label: '居宅内労働（在宅勤務・内職等）・月実働120〜160時間未満', value: `${prefix}_home_120h`, points: 12 },
    { label: '居宅内労働（在宅勤務・内職等）・月実働80〜120時間未満', value: `${prefix}_home_80h`, points: 10 },
    { label: '居宅内労働（在宅勤務・内職等）・月実働60〜80時間未満', value: `${prefix}_home_60h`, points: 8 },
    // その他の事由
    { label: '妊娠・出産中（分娩前後含む）', value: `${prefix}_birth`, points: 19 },
    // 疾病・負傷の細分
    { label: '疾病・入院（1か月以上）', value: `${prefix}_ill_hosp`, points: 20 },
    { label: '疾病・常時臥床（1か月以上）', value: `${prefix}_ill_bed`, points: 20 },
    { label: '疾病・精神または結核（長期療養診断）', value: `${prefix}_ill_psych_tb`, points: 18 },
    { label: '疾病・一般療養（1か月以上加療診断）', value: `${prefix}_ill_general`, points: 14 },
    // 身体障がいの等級別
    { label: '身体障害者手帳1・2級', value: `${prefix}_dis_body_1_2`, points: 20 },
    { label: '身体障害者手帳3級', value: `${prefix}_dis_body_3`, points: 14 },
    { label: '身体障害者手帳4級以下', value: `${prefix}_dis_body_4`, points: 8 },
    // 知的障がい
    { label: '療育手帳A2以上', value: `${prefix}_dis_intel_a2`, points: 20 },
    { label: '療育手帳B1', value: `${prefix}_dis_intel_b1`, points: 14 },
    { label: '療育手帳B2', value: `${prefix}_dis_intel_b2`, points: 8 },
    // 精神障がい
    { label: '精神障害者保健福祉手帳1・2級', value: `${prefix}_dis_mental_1_2`, points: 20 },
    { label: '精神障害者保健福祉手帳3級以下', value: `${prefix}_dis_mental_3`, points: 10 },
    // 介護・看護の細分
    { label: '入院付添（月120時間以上）', value: `${prefix}_care_hosp_120h`, points: 20 },
    { label: '入院付添（月60〜120時間未満）', value: `${prefix}_care_hosp_60h`, points: 14 },
    { label: '居宅内看護（月120時間以上）', value: `${prefix}_care_home_120h`, points: 12 },
    { label: '居宅内看護（月60〜120時間未満）', value: `${prefix}_care_home_60h`, points: 6 },
    { label: '心身障がい者介護（月120時間以上）', value: `${prefix}_care_dis_120h`, points: 16 },
    { label: '心身障がい者介護（月60〜120時間未満）', value: `${prefix}_care_dis_60h`, points: 10 },
    { label: 'ねたきり状態親族介護（月120時間以上）', value: `${prefix}_care_bed_120h`, points: 16 },
    { label: 'ねたきり状態親族介護（月60〜120時間未満）', value: `${prefix}_care_bed_60h`, points: 10 },
    // 就学
    { label: '就学（月120時間以上）', value: `${prefix}_study_120h`, points: 14 },
    { label: '就学（月60〜120時間未満）', value: `${prefix}_study_60h`, points: 10 },
    // 災害復旧
    { label: '災害復旧中', value: `${prefix}_disaster`, points: 20 },
    // 求職活動中
    { label: '求職活動中', value: `${prefix}_seek`, points: 6 },
    // 該当なし
    { label: '該当なし（在宅）', value: `${prefix}_none`, points: 0 },
  ];

  return [
    {
      id: `${prefix}_situation`,
      category,
      label: `${parentLabel}の就労状況（別表第1）`,
      helpText: '最も当てはまる状況を選んでください（月60時間以上就労が基本要件）',
      inputType: 'select',
      options: baseOptions,
    },
  ];
}

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '世帯の状況（別表第2 加算）',
    helpText: '最も当てはまる区分を1つ選んでください',
    inputType: 'radio',
    options: [
      { label: 'ひとり親家庭（母子・父子世帯）（+10点）', value: 'adj_wf_single', points: 10 },
      { label: '生活保護世帯（+6点）', value: 'adj_wf_welfare', points: 6 },
      { label: '生計中心者が失業中（+1点）', value: 'adj_wf_jobless', points: 1 },
      { label: '該当なし', value: 'adj_wf_no', points: 0 },
    ],
  },
  {
    id: 'adj_child',
    category: 'adjustment',
    label: '申込児童・兄弟姉妹・就労状況（別表第2 加算）',
    helpText: '最も当てはまる区分を1つ選んでください',
    inputType: 'radio',
    options: [
      { label: '地域型保育事業（小規模保育等）の卒園児（+15点）', value: 'adj_child_grad', points: 15 },
      { label: '兄弟姉妹が同一施設を同時希望（就労中）（+3点）', value: 'adj_sib_work', points: 3 },
      { label: '保育士として就労中または就労予定（+2点）', value: 'adj_nurseteacher', points: 2 },
      { label: '入所申込児童が障がいを有する（+1点）', value: 'adj_child_dis', points: 1 },
      { label: '育児休業明けで入所希望（+1点）', value: 'adj_ikukyuu', points: 1 },
      { label: '1年以上待機中（+1点）', value: 'adj_waiting', points: 1 },
      { label: '兄弟姉妹が同一施設を同時希望（求職中）（+1点）', value: 'adj_sib_seek', points: 1 },
      { label: '虐待・DV・市長が認める状態（別途判断）', value: 'adj_special', points: 0 },
      { label: '該当なし', value: 'adj_child_no', points: 0 },
    ],
  },
  {
    id: 'adj_minus',
    category: 'adjustment',
    label: 'その他の状況（別表第2 減算）',
    helpText: '減算が発生する場合は選択してください',
    inputType: 'radio',
    options: [
      { label: '65歳未満の同居祖父母が保育可能（-2点）', value: 'adj_m_grandparent', points: -2 },
      { label: '夜間就労のみ（-1点）', value: 'adj_m_night', points: -1 },
      { label: '就労先が確定済み（採用内定）（-1点）', value: 'adj_m_decided', points: -1 },
      { label: '未申込みの就学前児童が家庭にいる（-1点）', value: 'adj_m_child_home', points: -1 },
      { label: '該当なし', value: 'adj_m_no', points: 0 },
    ],
  },
];

export const yachimataData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
