import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 能代市（秋田県）保育所等利用調整基準データ
// 出典: https://www.city.noshiro.lg.jp/section/somu/somu/youkou/10047
// 能代市保育の利用調整実施基準運用要綱（別表）
// 計算方式: sum方式（父母それぞれの選考指数を合算）
// 最高選考指数: 各保護者10点（合計最大20点）
// ---------------------------------------------------------------------------

const municipality = {
  id: 'noshiro',
  name: '能代市',
  slug: 'noshiro',
  prefecture: '秋田県',
  maxBasePoints: 20,
  scoringMethod: 'sum',
} as const;

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `p${parentNum}`;
  const parentLabel = parentNum === 1 ? '父（保護者1）' : '母（保護者2）';
  const category = `parent${parentNum}_base` as const;

  const options = [
    // 10点
    { label: '常勤・自営業等 月150時間以上の就労（10点）', value: `${prefix}_work_ext_150`, points: 10 },
    { label: '1月以上の入院または常時臥床（疾病）（10点）', value: `${prefix}_ill_bed_10`, points: 10 },
    { label: '身体障害1〜2級・療育A・精神1級程度（10点）', value: `${prefix}_dis_10`, points: 10 },
    { label: '児童への虐待・DVの危険性（10点）', value: `${prefix}_abuse_10`, points: 10 },
    // 9点
    { label: '常勤・自営業等 月120時間以上の就労（9点）', value: `${prefix}_work_ext_120`, points: 9 },
    { label: '妊娠中または出産前後8週間（9点）', value: `${prefix}_preg_9`, points: 9 },
    { label: '就学・通学 月120時間以上（9点）', value: `${prefix}_edu_9`, points: 9 },
    { label: '看護・介護（入院付添い含む） 月120時間以上（9点）', value: `${prefix}_care_nur_9`, points: 9 },
    // 8点
    { label: '常勤・自営業等 月90時間以上の就労（8点）', value: `${prefix}_work_ext_90`, points: 8 },
    { label: '家族営業協力者 月150時間以上の就労（8点）', value: `${prefix}_work_fam_150`, points: 8 },
    { label: '育児休業中（継続利用のみ）（8点）', value: `${prefix}_iku_8`, points: 8 },
    // 7点
    { label: '常勤・自営業等 月48時間以上の就労（7点）', value: `${prefix}_work_ext_48`, points: 7 },
    { label: '家族営業協力者 月120時間以上の就労（7点）', value: `${prefix}_work_fam_120`, points: 7 },
    { label: '居宅内委託業務（内職等）月150時間以上（7点）', value: `${prefix}_work_home_150`, points: 7 },
    { label: '医師診断で1月以上加療が必要（疾病）（7点）', value: `${prefix}_ill_7`, points: 7 },
    { label: '身体障害3級・療育B・精神2級程度（7点）', value: `${prefix}_dis_7`, points: 7 },
    { label: '看護・介護（入院付添い含む） 月120時間未満（7点）', value: `${prefix}_care_nur_7`, points: 7 },
    { label: '長期居宅療養者の世話 月120時間以上（7点）', value: `${prefix}_care_home_7`, points: 7 },
    // 6点
    { label: '家族営業協力者 月90時間以上の就労（6点）', value: `${prefix}_work_fam_90`, points: 6 },
    { label: '居宅内委託業務（内職等）月120時間以上（6点）', value: `${prefix}_work_home_120`, points: 6 },
    { label: '長期居宅療養者の世話 月120時間未満（6点）', value: `${prefix}_care_home_6`, points: 6 },
    // 5点
    { label: '家族営業協力者 月48時間以上の就労（5点）', value: `${prefix}_work_fam_48`, points: 5 },
    { label: '居宅内委託業務（内職等）月90時間以上（5点）', value: `${prefix}_work_home_90`, points: 5 },
    { label: '定期通院等が必要な状態（疾病）（5点）', value: `${prefix}_ill_5`, points: 5 },
    { label: '身体障害4〜6級・精神3級程度（5点）', value: `${prefix}_dis_5`, points: 5 },
    { label: '就学・通学 月120時間未満（5点）', value: `${prefix}_edu_5`, points: 5 },
    // 4点
    { label: '居宅内委託業務（内職等）月48時間以上（4点）', value: `${prefix}_work_home_48`, points: 4 },
    // 3点
    { label: '求職活動中（3点）', value: `${prefix}_job_3`, points: 3 },
    // 2点
    { label: 'その他特別の事情で保育が困難（2点）', value: `${prefix}_other_2`, points: 2 },
    // 0点
    { label: 'あてはまらない', value: `${prefix}_none`, points: 0 },
  ];

  return [
    {
      id: `${prefix}_situation`,
      category,
      label: `${parentLabel}の保育が必要な主な事由`,
      helpText: '最も当てはまる事由（最も高い点数）を1つ選んでください',
      inputType: 'select',
      options,
    },
  ];
}

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sp_no', points: 0 },
      { label: 'はい（＋2点）', value: 'adj_sp_yes', points: 2 },
    ],
  },
  {
    id: 'adj_continue',
    category: 'adjustment',
    label: '現在保育所等を利用しており継続希望ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_cont_no', points: 0 },
      { label: 'はい（＋2点）', value: 'adj_cont_yes', points: 2 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: 'きょうだいが同一施設に在園していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sib_no', points: 0 },
      { label: 'はい（＋2点）', value: 'adj_sib_yes', points: 2 },
    ],
  },
  {
    id: 'adj_nursery_staff',
    category: 'adjustment',
    label: '保育士・保育教諭として保育施設に勤務していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_ns_no', points: 0 },
      { label: 'はい（＋6点）', value: 'adj_ns_yes', points: 6 },
    ],
  },
  {
    id: 'adj_disability_child',
    category: 'adjustment',
    label: '障害のある子どもの保育を希望していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_dc_no', points: 0 },
      { label: 'はい（＋1点）', value: 'adj_dc_yes', points: 1 },
    ],
  },
  {
    id: 'adj_unemployed',
    category: 'adjustment',
    label: '主たる生計者が失業していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unemp_no', points: 0 },
      { label: 'はい（＋2点）', value: 'adj_unemp_yes', points: 2 },
    ],
  },
  {
    id: 'adj_arrears',
    category: 'adjustment',
    label: '保育料の滞納はありますか？',
    inputType: 'radio',
    options: [
      { label: '滞納なし', value: 'adj_arr_no', points: 0 },
      { label: '保育料の滞納あり（-2点）', value: 'adj_arr_yes', points: -2 },
    ],
  },
  {
    id: 'adj_work_days',
    category: 'adjustment',
    label: '月の就労日数（就労者のみ）',
    helpText: '就労していない場合は「20日以上（または非就労）」を選択してください',
    inputType: 'radio',
    options: [
      { label: '20日以上（または非就労）', value: 'adj_days_ok', points: 0 },
      { label: '16〜19日（-1点）', value: 'adj_days_16', points: -1 },
      { label: '16日未満（-2点）', value: 'adj_days_lt16', points: -2 },
    ],
  },
];

export const noshiroData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
