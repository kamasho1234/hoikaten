import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 久御山町 認定こども園選考基準データ
// 出典: 久御山町立認定こども園選考基準要綱（別表第1 基本指数表、別表第2 調整指数表）
// http://www.town.kumiyama.lg.jp/selfcontents/reiki_int/reiki_honbun/k115RG00000796.html
// ---------------------------------------------------------------------------
// sum方式（父母各々の基本指数を合算し、調整指数を加減して世帯指数を算出）。
// 就労は就労形態（居宅外・居宅内・農業中心者・農業協力者・内職）と
// 月間勤務日数×1日あたり時間の組み合わせで評価（最高20点）。
// 調整指数：ひとり親+15点、育児休業明け+7点、保育士勤務+9点。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'kumiyama',
  name: '久御山町',
  slug: 'kumiyama',
  prefecture: '京都府',
  maxBasePoints: 20,
} as const;

const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_emp_none`, points: 0 },
  // 居宅外労働（外勤・居宅外自営業主）
  { label: '居宅外労働：月20日以上×1日8時間以上（20点）', value: `${prefix}_emp_ext_20`, points: 20 },
  { label: '居宅外労働：月16日以上×1日7時間以上8時間未満（18点）', value: `${prefix}_emp_ext_18`, points: 18 },
  { label: '居宅外労働：月16日以上×1日4時間以上7時間未満（14点）', value: `${prefix}_emp_ext_14`, points: 14 },
  { label: '居宅外労働：月64時間以上（上記以外）（12点）', value: `${prefix}_emp_ext_12`, points: 12 },
  // 居宅内労働（在宅就労・居宅内自営業）
  { label: '居宅内労働：月20日以上×1日8時間以上（18点）', value: `${prefix}_emp_in_18`, points: 18 },
  { label: '居宅内労働：月16日以上×1日7時間以上8時間未満（16点）', value: `${prefix}_emp_in_16`, points: 16 },
  { label: '居宅内労働：月16日以上×1日4時間以上7時間未満（12点）', value: `${prefix}_emp_in_12`, points: 12 },
  { label: '居宅内労働：月64時間以上（上記以外）（10点）', value: `${prefix}_emp_in_10`, points: 10 },
  { label: '内職（9点）', value: `${prefix}_emp_piecework_9`, points: 9 },
  // 農業（中心者）
  { label: '農業中心者：月20日以上×1日8時間以上（18点）', value: `${prefix}_emp_farm_c_18`, points: 18 },
  { label: '農業中心者：月16日以上×1日7時間以上8時間未満（16点）', value: `${prefix}_emp_farm_c_16`, points: 16 },
  { label: '農業中心者：月16日以上×1日4時間以上7時間未満（12点）', value: `${prefix}_emp_farm_c_12`, points: 12 },
  { label: '農業中心者：月64時間以上（上記以外）（10点）', value: `${prefix}_emp_farm_c_10`, points: 10 },
  // 農業（協力者）
  { label: '農業協力者：月20日以上×1日8時間以上（17点）', value: `${prefix}_emp_farm_a_17`, points: 17 },
  { label: '農業協力者：月16日以上×1日7時間以上8時間未満（15点）', value: `${prefix}_emp_farm_a_15`, points: 15 },
  { label: '農業協力者：月16日以上×1日4時間以上7時間未満（11点）', value: `${prefix}_emp_farm_a_11`, points: 11 },
  { label: '農業協力者：月64時間以上（上記以外）（9点）', value: `${prefix}_emp_farm_a_9`, points: 9 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1（父）' : '保護者2（母）';

  const questions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}：就労形態と勤務日数・時間は？`,
      helpText: '居宅外（会社勤め等）・居宅内（在宅・自営業）・農業で点数が異なります。農業中心者は農業が主な収入源、農業協力者は補助的な農業従事です',
      inputType: 'select',
      options: employmentOptions(prefix),
    },
    {
      id: `${prefix}_school`,
      category,
      label: `${parentLabel}：学校・職業訓練への在学状況は？`,
      helpText: '就労目的の学校・職業訓練校への通学が対象です',
      inputType: 'radio',
      options: [
        { label: 'あてはまらない', value: `${prefix}_school_none`, points: 0 },
        { label: '月20日以上×1日7時間以上（16点）', value: `${prefix}_school_16`, points: 16 },
        { label: '月16日以上×1日4時間以上（14点）', value: `${prefix}_school_14`, points: 14 },
        { label: '月64時間以上（上記以外）（10点）', value: `${prefix}_school_10`, points: 10 },
      ],
    },
    {
      id: `${prefix}_jobseek`,
      category,
      label: `${parentLabel}：求職活動中ですか？（7点）`,
      inputType: 'radio',
      options: [
        { label: 'いいえ', value: `${prefix}_js_no`, points: 0 },
        { label: 'はい（+7）', value: `${prefix}_js_yes`, points: 7 },
      ],
    },
    {
      id: `${prefix}_illness_disability`,
      category,
      label: `${parentLabel}：疾病・障がいの状況は？`,
      helpText: '疾病（病気・怪我）と障がいを合わせて選択してください',
      inputType: 'radio',
      options: [
        { label: 'あてはまらない', value: `${prefix}_ill_none`, points: 0 },
        { label: '入院中（1か月以上）または常時病臥（20点）', value: `${prefix}_ill_20a`, points: 20 },
        { label: '身体障害1・2級/療育手帳A/精神障害1級（20点）', value: `${prefix}_ill_20b`, points: 20 },
        { label: '通院加療中・安静を要し保育困難（週4日以上）（18点）', value: `${prefix}_ill_18`, points: 18 },
        { label: '身体障害3級/療育手帳B/精神障害2級（16点）', value: `${prefix}_ill_16`, points: 16 },
        { label: '身体障害4級/精神障害3級（12点）', value: `${prefix}_ill_12`, points: 12 },
        { label: 'その他の疾病・障がいで保育困難（10点）', value: `${prefix}_ill_10`, points: 10 },
      ],
    },
    {
      id: `${prefix}_care`,
      category,
      label: `${parentLabel}：家族の介護・看護の状況は？`,
      inputType: 'radio',
      options: [
        { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
        { label: '常時付き添い通院・重度心身障害者介護（週5日以上）（20点）', value: `${prefix}_care_20`, points: 20 },
        { label: '病人・障害者介護または通院付き添い（週4日以上）（18点）', value: `${prefix}_care_18`, points: 18 },
        { label: 'その他の介護・看護・通院付き添い（週4日未満）（10点）', value: `${prefix}_care_10`, points: 10 },
      ],
    },
    {
      id: `${prefix}_disaster`,
      category,
      label: `${parentLabel}：災害復旧中ですか？（20点）`,
      inputType: 'radio',
      options: [
        { label: 'いいえ', value: `${prefix}_disaster_no`, points: 0 },
        { label: 'はい（+20）', value: `${prefix}_disaster_yes`, points: 20 },
      ],
    },
  ];

  // 母のみ：妊娠・出産
  if (parentNum === 2) {
    questions.push({
      id: `${prefix}_birth`,
      category,
      label: `${parentLabel}：産前産後8週間以内ですか？（17点）`,
      inputType: 'radio',
      options: [
        { label: 'いいえ', value: `${prefix}_birth_no`, points: 0 },
        { label: 'はい（+17）', value: `${prefix}_birth_yes`, points: 17 },
      ],
    });
  }

  return questions;
}

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親家庭ですか？',
    helpText: '+15点（死別・離婚・未婚・別居等でひとり親の場合）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sp_no', points: 0 },
      { label: 'はい（+15）', value: 'adj_sp_yes', points: 15 },
    ],
  },
  {
    id: 'adj_ikuji_return',
    category: 'adjustment',
    label: '育児休業明けで職場復帰予定ですか？',
    helpText: '+7点（育児休業終了後に職場復帰する場合）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_ikuji_no', points: 0 },
      { label: 'はい（+7）', value: 'adj_ikuji_yes', points: 7 },
    ],
  },
  {
    id: 'adj_nursery_worker',
    category: 'adjustment',
    label: '保護者が町内の保育施設に勤務していますか？',
    helpText: '+9点（久御山町内の認定こども園・保育施設への勤務）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_nw_no', points: 0 },
      { label: 'はい（+9）', value: 'adj_nw_yes', points: 9 },
    ],
  },
  {
    id: 'adj_temp_care',
    category: 'adjustment',
    label: '現在、一時保育を月5日以上利用していますか？',
    helpText: '+8点（現在一時保育を継続的に利用していて認定保育に移行する場合）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_tc_no', points: 0 },
      { label: 'はい（+8）', value: 'adj_tc_yes', points: 8 },
    ],
  },
  {
    id: 'adj_continue',
    category: 'adjustment',
    label: '同一施設で教育認定から保育認定への転換ですか？',
    helpText: '+6点（現在入っている施設で認定区分を変更する場合）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_cont_no', points: 0 },
      { label: 'はい（+6）', value: 'adj_cont_yes', points: 6 },
    ],
  },
  {
    id: 'adj_transfer',
    category: 'adjustment',
    label: '転入前の居住地で施設を利用していましたか？',
    helpText: '+5点（他市区町村から転入し、前住所地で保育施設を利用していた場合）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_tr_no', points: 0 },
      { label: 'はい（+5）', value: 'adj_tr_yes', points: 5 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護を受給していますか？',
    helpText: '+3点',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい（+3）', value: 'adj_welfare_yes', points: 3 },
    ],
  },
  {
    id: 'adj_unemployment',
    category: 'adjustment',
    label: '失業して3か月未満ですか？',
    helpText: '+4点（失業後3か月未満で就職活動中の場合）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unemp_no', points: 0 },
      { label: 'はい（+4）', value: 'adj_unemp_yes', points: 4 },
    ],
  },
  {
    id: 'adj_child_disability',
    category: 'adjustment',
    label: '申請する子どもに障がいがありますか？',
    helpText: '+4点（身体障害者手帳・療育手帳・精神障害者保健福祉手帳所持）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_cdis_no', points: 0 },
      { label: 'はい（+4）', value: 'adj_cdis_yes', points: 4 },
    ],
  },
  {
    id: 'adj_multiple_birth',
    category: 'adjustment',
    label: '多胎児（双子・三つ子等）ですか？',
    helpText: '+3点',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_mb_no', points: 0 },
      { label: 'はい（+3）', value: 'adj_mb_yes', points: 3 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: 'きょうだいと同時に保育認定申込をしていますか？',
    helpText: '+2点（1人につき）。同時申込1人ならば+2点、2人ならば+4点',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sib_no', points: 0 },
      { label: '1人と同時申込（+2）', value: 'adj_sib_1', points: 2 },
      { label: '2人と同時申込（+4）', value: 'adj_sib_2', points: 4 },
    ],
  },
  {
    id: 'adj_grandparent',
    category: 'adjustment',
    label: '65歳未満の親族が同居しており、保育ができる状況ですか？',
    helpText: '-4点（就労していない65歳未満の同居親族が在宅で保育可能な場合）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_gp_no', points: 0 },
      { label: 'はい（-4）', value: 'adj_gp_yes', points: -4 },
    ],
  },
  {
    id: 'adj_arrears',
    category: 'adjustment',
    label: '保育料に滞納がありますか？',
    helpText: '-10点',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_arr_no', points: 0 },
      { label: 'はい（-10）', value: 'adj_arr_yes', points: -10 },
    ],
  },
  {
    id: 'adj_single_deployed',
    category: 'adjustment',
    label: '京都府外に単身赴任していますか？',
    helpText: '+2点（父または母が就労のため京都府外に単身赴任している場合）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sd_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_sd_yes', points: 2 },
    ],
  },
  {
    id: 'adj_child_dev_care',
    category: 'adjustment',
    label: '発達上配慮が必要ですか？',
    helpText: '+2点（親子教室通室中または発達上配慮が必要な場合）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_cdc_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_cdc_yes', points: 2 },
    ],
  },
  {
    id: 'adj_sibling_care_entering',
    category: 'adjustment',
    label: 'きょうだいが保育認定で入園していますか？',
    helpText: '+2点（1人につき）。兄弟姉妹が町内の認定こども園・保育施設に入園中の場合',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sib_care_no', points: 0 },
      { label: '1人が入園中（+2）', value: 'adj_sib_care_1', points: 2 },
      { label: '2人以上が入園中（+4）', value: 'adj_sib_care_2plus', points: 4 },
    ],
  },
  {
    id: 'adj_sibling_education_entering',
    category: 'adjustment',
    label: 'きょうだいが教育認定で入園していますか？',
    helpText: '+1点（1人につき）。兄弟姉妹が町内の認定こども園の教育認定で入園中の場合',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sib_edu_no', points: 0 },
      { label: '1人が入園中（+1）', value: 'adj_sib_edu_1', points: 1 },
      { label: '2人以上が入園中（+2）', value: 'adj_sib_edu_2plus', points: 2 },
    ],
  },
  {
    id: 'adj_withdrawal',
    category: 'adjustment',
    label: '入園決定を辞退したことがありますか？',
    helpText: '-7点（正当な理由なく入園決定を辞退した場合）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_wd_no', points: 0 },
      { label: 'はい、正当な理由なく辞退（-7）', value: 'adj_wd_yes', points: -7 },
    ],
  },
];

export const kumiyamaData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
