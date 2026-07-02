import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 小鹿野町 保育所等入所選考基準データ
// 出典: 小鹿野町保育所等入所選考委員会規程（別表第1 基準指数、別表第2 調整指数）
// https://www.town.ogano.lg.jp/reiki_int/reiki_honbun/r232RG00000275.html
// ---------------------------------------------------------------------------
// min方式（父母それぞれの基準指数を算出し、低い方を採用して調整指数を加算）。
// 就労は月間就労時間8段階（月48h=5点〜月160h以上=10点）。
// 小数点あり（0.5刻み）。
// 調整指数：ひとり親+10点、育児休業復帰+9点、虐待・DV+9点。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'ogano',
  name: '小鹿野町',
  slug: 'ogano',
  prefecture: '埼玉県',
  maxBasePoints: 10,
  scoringMethod: 'min' as const,
} as const;

const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_emp_none`, points: 0 },
  { label: '月160時間以上（10点）', value: `${prefix}_emp_10`, points: 10 },
  { label: '月150〜160時間未満（9.5点）', value: `${prefix}_emp_9_5`, points: 9.5 },
  { label: '月140〜150時間未満（9点）', value: `${prefix}_emp_9`, points: 9 },
  { label: '月130〜140時間未満（8.5点）', value: `${prefix}_emp_8_5`, points: 8.5 },
  { label: '月120〜130時間未満（8点）', value: `${prefix}_emp_8`, points: 8 },
  { label: '月100〜120時間未満（7点）', value: `${prefix}_emp_7`, points: 7 },
  { label: '月80〜100時間未満（6点）', value: `${prefix}_emp_6`, points: 6 },
  { label: '月48〜80時間未満（5点）', value: `${prefix}_emp_5`, points: 5 },
  // 内職
  { label: '内職・月160時間以上（5点）', value: `${prefix}_piecework_5`, points: 5 },
  { label: '内職・月48〜160時間未満（3点）', value: `${prefix}_piecework_3`, points: 3 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1（父）' : '保護者2（母）';

  const questions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}：月間就労時間は？`,
      helpText: '外勤・自営・農業・就学（在学）・職業訓練が対象。内職は別の選択肢を選んでください',
      inputType: 'select',
      options: employmentOptions(prefix),
    },
    {
      id: `${prefix}_jobseek`,
      category,
      label: `${parentLabel}：求職活動の状況は？`,
      helpText: '月48時間未満労働中で求職活動中の方は2点',
      inputType: 'radio',
      options: [
        { label: 'あてはまらない', value: `${prefix}_js_none`, points: 0 },
        { label: '無職で求職活動中（1点）', value: `${prefix}_js_1`, points: 1 },
        { label: '月48時間未満就労中かつ求職活動中（2点）', value: `${prefix}_js_2`, points: 2 },
      ],
    },
    {
      id: `${prefix}_illness`,
      category,
      label: `${parentLabel}：疾病・傷病の状況は？`,
      inputType: 'radio',
      options: [
        { label: 'あてはまらない', value: `${prefix}_ill_none`, points: 0 },
        { label: '入院中（1か月以上）または保育が完全に不可能（10点）', value: `${prefix}_ill_10`, points: 10 },
        { label: '保育が困難な状況（8点）', value: `${prefix}_ill_8`, points: 8 },
      ],
    },
    {
      id: `${prefix}_disability`,
      category,
      label: `${parentLabel}：障がいの等級は？`,
      inputType: 'radio',
      options: [
        { label: 'あてはまらない', value: `${prefix}_dis_none`, points: 0 },
        { label: '身体1・2級/療育手帳◎A・A/精神1〜3級（10点）', value: `${prefix}_dis_10`, points: 10 },
        { label: '身体3級/療育手帳B（8点）', value: `${prefix}_dis_8`, points: 8 },
        { label: '身体4級以下/療育手帳C（6点）', value: `${prefix}_dis_6`, points: 6 },
      ],
    },
    {
      id: `${prefix}_care`,
      category,
      label: `${parentLabel}：家族の介護・看護に常時対応していますか？（10点）`,
      inputType: 'radio',
      options: [
        { label: 'いいえ', value: `${prefix}_care_no`, points: 0 },
        { label: 'はい（+10）', value: `${prefix}_care_yes`, points: 10 },
      ],
    },
    {
      id: `${prefix}_disaster`,
      category,
      label: `${parentLabel}：災害復旧中ですか？`,
      inputType: 'radio',
      options: [
        { label: 'いいえ', value: `${prefix}_disaster_no`, points: 0 },
        { label: 'はい（+10）', value: `${prefix}_disaster_yes`, points: 10 },
      ],
    },
  ];

  // 母のみ：出産
  if (parentNum === 2) {
    questions.push({
      id: `${prefix}_birth`,
      category,
      label: `${parentLabel}：産前6週〜産後8週の期間ですか？（8点）`,
      inputType: 'radio',
      options: [
        { label: 'いいえ', value: `${prefix}_birth_no`, points: 0 },
        { label: 'はい（+8）', value: `${prefix}_birth_yes`, points: 8 },
      ],
    });
  }

  return questions;
}

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親世帯ですか？',
    helpText: '+10点',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sp_no', points: 0 },
      { label: 'はい（+10）', value: 'adj_sp_yes', points: 10 },
    ],
  },
  {
    id: 'adj_育児休業',
    category: 'adjustment',
    label: '育児休業から職場復帰する予定ですか？',
    helpText: '+9点（育児休業から復帰予定の場合）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_ikuji_no', points: 0 },
      { label: 'はい（+9）', value: 'adj_ikuji_yes', points: 9 },
    ],
  },
  {
    id: 'adj_dv_abuse',
    category: 'adjustment',
    label: '虐待またはDV被害を受けていますか？',
    helpText: '+9点（支援機関が必要と判断している場合）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_dv_no', points: 0 },
      { label: 'はい（+9）', value: 'adj_dv_yes', points: 9 },
    ],
  },
  {
    id: 'adj_difficult_family',
    category: 'adjustment',
    label: '養育困難な家庭等と関係機関から支援を受けていますか？',
    helpText: '+5点',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_difficult_no', points: 0 },
      { label: 'はい（+5）', value: 'adj_difficult_yes', points: 5 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護を受給していますか？',
    helpText: '+2点',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_welfare_yes', points: 2 },
    ],
  },
  {
    id: 'adj_unemployment',
    category: 'adjustment',
    label: '生活中心者の失業により、就労の必要性が高いですか？',
    helpText: '+3点（失業による就労必要性が高い場合）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unemp_no', points: 0 },
      { label: 'はい（+3）', value: 'adj_unemp_yes', points: 3 },
    ],
  },
  {
    id: 'adj_small_nursery',
    category: 'adjustment',
    label: '地域型保育事業所の卒園児ですか？',
    helpText: '+2点',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sn_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_sn_yes', points: 2 },
    ],
  },
  {
    id: 'adj_child_disability',
    category: 'adjustment',
    label: '申請する子どもに障がいがありますか？',
    helpText: '+1点',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_cdis_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_cdis_yes', points: 1 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: 'きょうだいが同じ施設に在籍または同時申込していますか？',
    helpText: '在籍+1点、同時申込+1点（両方該当する場合は最大+2点）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sib_no', points: 0 },
      { label: 'きょうだいが在籍中（+1）', value: 'adj_sib_enrolled', points: 1 },
      { label: '同時申込（+1）', value: 'adj_sib_simultaneous', points: 1 },
      { label: '在籍中かつ同時申込（+2）', value: 'adj_sib_both', points: 2 },
    ],
  },
  {
    id: 'adj_grandparent',
    category: 'adjustment',
    label: '65歳未満の同居祖父母が保育できる状況ですか？',
    helpText: '-5点（就労していない祖父母が在宅で保育可能な場合）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_gp_no', points: 0 },
      { label: 'はい（-5）', value: 'adj_gp_yes', points: -5 },
    ],
  },
  {
    id: 'adj_work_days',
    category: 'adjustment',
    label: '月間の勤務日数は？',
    helpText: '月12日以下は-2点、月13〜16日は-1点の減算があります',
    inputType: 'radio',
    options: [
      { label: '月17日以上または就労なし（0点）', value: 'adj_wd_normal', points: 0 },
      { label: '月13〜16日（-1）', value: 'adj_wd_13_16', points: -1 },
      { label: '月12日以下（-2）', value: 'adj_wd_12', points: -2 },
    ],
  },
  {
    id: 'adj_arrears',
    category: 'adjustment',
    label: '保育料に未納がありますか？',
    helpText: '3か月以上未納で-5点、6か月以上未納で-10点',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_arr_no', points: 0 },
      { label: '3か月以上6か月未満の未納（-5）', value: 'adj_arr_5', points: -5 },
      { label: '6か月以上の未納（-10）', value: 'adj_arr_10', points: -10 },
    ],
  },
];

export const oganoData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
