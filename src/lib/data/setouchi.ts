import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 瀬戸内市（岡山県） 保育所等利用調整基準データ
// 出典: https://www1.g-reiki.net/setouchi/reiki_honbun/r057RG00001403.html
// 瀬戸内市保育所等の利用調整に関する要綱（令和3年10月11日）
// 計算方式: sum方式（父母の基準点数を合算）
// 最高基本点数: 10点（被雇用者・自営業で月160時間以上）
// ---------------------------------------------------------------------------

const municipality = {
  id: 'setouchi',
  name: '瀬戸内市',
  slug: 'setouchi',
  prefecture: '岡山県',
  maxBasePoints: 10,
} as const;

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `p${parentNum}`;
  const parentLabel = parentNum === 1 ? '父（保護者1）' : '母（保護者2）';
  const category = `parent${parentNum}_base` as const;

  const baseOptions = [
    { label: '就労（被雇用・自営）：月160時間以上', value: `${prefix}_emp160`, points: 10 },
    { label: '就労（被雇用・自営）：月140時間以上', value: `${prefix}_emp140`, points: 9 },
    { label: '就労（被雇用・自営）：月120時間以上', value: `${prefix}_emp120`, points: 8 },
    { label: '就労（被雇用・自営）：月100時間以上', value: `${prefix}_emp100`, points: 7 },
    { label: '就労（被雇用・自営）：月80時間以上', value: `${prefix}_emp80`, points: 6 },
    { label: '就労（被雇用・自営）：月48時間以上', value: `${prefix}_emp48`, points: 4 },
    { label: '内職：月120時間以上', value: `${prefix}_piece120`, points: 5 },
    { label: '内職：月80時間以上', value: `${prefix}_piece80`, points: 4 },
    { label: '内職：月48時間以上', value: `${prefix}_piece48`, points: 2 },
    { label: '介護・看護（月160時間以上相当）', value: `${prefix}_care160`, points: 10 },
    { label: '介護・看護（月140時間以上相当）', value: `${prefix}_care140`, points: 9 },
    { label: '介護・看護（月120時間以上相当）', value: `${prefix}_care120`, points: 8 },
    { label: '介護・看護（月100時間以上相当）', value: `${prefix}_care100`, points: 7 },
    { label: '介護・看護（月80時間以上相当）', value: `${prefix}_care80`, points: 6 },
    { label: '介護・看護（月48時間以上相当）', value: `${prefix}_care48`, points: 4 },
    { label: '疾病・負傷（入院1ヶ月以上・常時臥床）', value: `${prefix}_ill_hosp`, points: 10 },
    { label: '疾病・負傷（在宅療養・安静要・1ヶ月以上）', value: `${prefix}_ill_rest`, points: 8 },
    { label: '疾病・負傷（通院加療）', value: `${prefix}_ill_out`, points: 3 },
    { label: '障がい（手帳1・2級等・重度）', value: `${prefix}_dis_heavy`, points: 10 },
    { label: '障がい（手帳3級等）', value: `${prefix}_dis_mid`, points: 6 },
    { label: '障がい（その他）', value: `${prefix}_dis_light`, points: 3 },
    { label: '災害復旧', value: `${prefix}_disaster`, points: 10 },
    { label: '親不存在（死亡・離婚等）', value: `${prefix}_parent_absent`, points: 10 },
    { label: '就労予定（確認未了）', value: `${prefix}_job_plan`, points: 2 },
    { label: '求職中', value: `${prefix}_seeking`, points: 1 },
    { label: '該当なし', value: `${prefix}_none`, points: 0 },
  ];

  if (parentNum === 2) {
    baseOptions.splice(-2, 0, {
      label: '出産（産前3ヶ月〜産後3ヶ月）',
      value: `${prefix}_birth`,
      points: 6,
    });
  }

  return [
    {
      id: `${prefix}_situation`,
      category,
      label: `${parentLabel}の保育が必要な主な事由`,
      helpText: '最も当てはまる事由を1つ選択してください',
      inputType: 'select',
      options: baseOptions,
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
      { label: 'はい（+2点）', value: 'adj_sp_yes', points: 2 },
      { label: 'いいえ', value: 'adj_sp_no', points: 0 },
    ],
  },
  {
    id: 'adj_disabled_parent',
    category: 'adjustment',
    label: '保護者に障がいがありますか？（障害者世帯）',
    inputType: 'radio',
    options: [
      { label: 'はい（+2点）', value: 'adj_dp_yes', points: 2 },
      { label: 'いいえ', value: 'adj_dp_no', points: 0 },
    ],
  },
  {
    id: 'adj_continuation',
    category: 'adjustment',
    label: '前年度から継続して入所を申請していますか？',
    inputType: 'radio',
    options: [
      { label: 'はい（継続児童・+2点）', value: 'adj_cont_yes', points: 2 },
      { label: 'いいえ（新規申請）', value: 'adj_cont_no', points: 0 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: 'きょうだいの入所状況（同一施設への入所・申請件数）',
    inputType: 'select',
    options: [
      { label: '2人が同時入所・申請（+3点）', value: 'adj_sib2', points: 3 },
      { label: '3人が同時入所・申請（+4点）', value: 'adj_sib3', points: 4 },
      { label: '4人以上が同時入所・申請（+5点）', value: 'adj_sib4', points: 5 },
      { label: '該当なし', value: 'adj_sib_none', points: 0 },
    ],
  },
  {
    id: 'adj_nursery_work',
    category: 'adjustment',
    label: '保護者が保育士・保育関連施設で就労していますか？',
    inputType: 'select',
    options: [
      { label: 'はい・月160時間以上（+5点）', value: 'adj_nw160', points: 5 },
      { label: 'はい・月100〜159時間（+3点）', value: 'adj_nw100', points: 3 },
      { label: 'はい・月48〜99時間（+1点）', value: 'adj_nw48', points: 1 },
      { label: '該当なし', value: 'adj_nw_none', points: 0 },
    ],
  },
  {
    id: 'adj_cohabit',
    category: 'adjustment',
    label: '同居親族の人数（保育代替可能な方）',
    helpText: '1人につき-1点が減算されます',
    inputType: 'select',
    options: [
      { label: 'いない（0点）', value: 'adj_co_0', points: 0 },
      { label: '1人（-1点）', value: 'adj_co_1', points: -1 },
      { label: '2人（-2点）', value: 'adj_co_2', points: -2 },
      { label: '3人以上（-3点）', value: 'adj_co_3', points: -3 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'はい（+1点）', value: 'adj_wf_yes', points: 1 },
      { label: 'いいえ', value: 'adj_wf_no', points: 0 },
    ],
  },
  {
    id: 'adj_unapplied',
    category: 'adjustment',
    label: '未申請児童（親族保育中）ですか？',
    inputType: 'radio',
    options: [
      { label: 'はい（-2点）', value: 'adj_unap_yes', points: -2 },
      { label: 'いいえ', value: 'adj_unap_no', points: 0 },
    ],
  },
  {
    id: 'adj_missing_docs',
    category: 'adjustment',
    label: '書類を提出していない、または違反行為がありますか？',
    inputType: 'radio',
    options: [
      { label: 'はい（-3点）', value: 'adj_miss_yes', points: -3 },
      { label: 'いいえ', value: 'adj_miss_no', points: 0 },
    ],
  },
  {
    id: 'adj_arrears',
    category: 'adjustment',
    label: '保育料を未納（滞納）していますか？',
    inputType: 'radio',
    options: [
      { label: 'はい（-10点）', value: 'adj_arr_yes', points: -10 },
      { label: 'いいえ', value: 'adj_arr_no', points: 0 },
    ],
  },
];

export const setouchiData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
