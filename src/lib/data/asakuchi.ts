import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 浅口市 保育利用調整基準データ
// 出典: 浅口市保育所、認定こども園及び家庭的保育事業等の利用調整に関する基準要綱
// https://www1.g-reiki.net/city.asakuchi/reiki_honbun/r331RG00000892.html
// ---------------------------------------------------------------------------
// sum方式（父母の基本点数を合算）。
// 居宅外・居宅内就労は「週の就労日数×週の合計就労時間」の組み合わせで評価。
// 就学・技能修得・介護看護は就労（外勤）と同じ点数体系（区分1準用）を適用。
// 同一保護者が複数の理由に該当する場合は最高点のみ採用（ユーザーが選択）。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'asakuchi',
  name: '浅口市',
  slug: 'asakuchi',
  prefecture: '岡山県',
  maxBasePoints: 10,
} as const;

// 居宅外就労（外勤・自営等）の選択肢（週の合計時間ベース）
const extWorkOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_ext_none`, points: 0 },
  { label: '週5日以上・40時間以上（10点）', value: `${prefix}_ext_10`, points: 10 },
  { label: '週5日以上・35時間以上（9点）', value: `${prefix}_ext_9`, points: 9 },
  { label: '週4日以上・30時間以上（8点）', value: `${prefix}_ext_8`, points: 8 },
  { label: '週4日以上・25時間以上（7点）', value: `${prefix}_ext_7`, points: 7 },
  { label: '週3日以上・20時間以上（6点）', value: `${prefix}_ext_6`, points: 6 },
  { label: '週3日以上・12時間以上（4点）', value: `${prefix}_ext_4`, points: 4 },
];

// 居宅内就労（自宅・農業等）の選択肢（外勤より1点低い）
const intWorkOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_int_none`, points: 0 },
  { label: '週5日以上・40時間以上（9点）', value: `${prefix}_int_9`, points: 9 },
  { label: '週5日以上・35時間以上（8点）', value: `${prefix}_int_8`, points: 8 },
  { label: '週4日以上・30時間以上（7点）', value: `${prefix}_int_7`, points: 7 },
  { label: '週4日以上・25時間以上（6点）', value: `${prefix}_int_6`, points: 6 },
  { label: '週3日以上・20時間以上（5点）', value: `${prefix}_int_5`, points: 5 },
  { label: '週3日以上・12時間以上（3点）', value: `${prefix}_int_3`, points: 3 },
];

// 内職の選択肢
const naikokuOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_nik_none`, points: 0 },
  { label: '週5日以上・30時間以上（5点）', value: `${prefix}_nik_5`, points: 5 },
  { label: '週3日以上・20時間以上（4点）', value: `${prefix}_nik_4`, points: 4 },
  { label: '週3日以上・12時間以上（2点）', value: `${prefix}_nik_2`, points: 2 },
];

// 就学・技能修得（区分1準用：外勤と同じ点数体系）
const studyOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_study_none`, points: 0 },
  { label: '週5日以上・40時間以上（10点）', value: `${prefix}_study_10`, points: 10 },
  { label: '週5日以上・35時間以上（9点）', value: `${prefix}_study_9`, points: 9 },
  { label: '週4日以上・30時間以上（8点）', value: `${prefix}_study_8`, points: 8 },
  { label: '週4日以上・25時間以上（7点）', value: `${prefix}_study_7`, points: 7 },
  { label: '週3日以上・20時間以上（6点）', value: `${prefix}_study_6`, points: 6 },
  { label: '週3日以上・12時間以上（4点）', value: `${prefix}_study_4`, points: 4 },
];

// 介護・看護（区分1準用：外勤と同じ点数体系）
const careWorkOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_cw_none`, points: 0 },
  { label: '週5日以上・40時間以上相当の介護看護（10点）', value: `${prefix}_cw_10`, points: 10 },
  { label: '週5日以上・35時間以上相当（9点）', value: `${prefix}_cw_9`, points: 9 },
  { label: '週4日以上・30時間以上相当（8点）', value: `${prefix}_cw_8`, points: 8 },
  { label: '週4日以上・25時間以上相当（7点）', value: `${prefix}_cw_7`, points: 7 },
  { label: '週3日以上・20時間以上相当（6点）', value: `${prefix}_cw_6`, points: 6 },
  { label: '週3日以上・12時間以上相当（4点）', value: `${prefix}_cw_4`, points: 4 },
];

// 疾病・負傷
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_ill_none`, points: 0 },
  { label: '1ヶ月以上の入院または常時臥床（10点）', value: `${prefix}_ill_10`, points: 10 },
  { label: '安静加療または日常生活に支障がある状態（8点）', value: `${prefix}_ill_8`, points: 8 },
  { label: '通院加療が必要な状態（3点）', value: `${prefix}_ill_3`, points: 3 },
];

// 障害
const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_dis_none`, points: 0 },
  { label: '身体障害1〜2級・精神障害手帳・療育手帳A・要介護3以上等（10点）', value: `${prefix}_dis_10`, points: 10 },
  { label: '身体障害3級・療育手帳B・要介護1〜2等（6点）', value: `${prefix}_dis_6`, points: 6 },
  { label: '身体障害4〜6級・要支援等（3点）', value: `${prefix}_dis_3`, points: 3 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  return [
    {
      id: `${prefix}_ext_work`,
      category,
      label: `${parentLabel}：居宅外就労（外勤・自営等）の状況は？`,
      helpText: '週の就労日数と週の合計就労時間で選択してください',
      inputType: 'select',
      options: extWorkOptions(prefix),
    },
    {
      id: `${prefix}_int_work`,
      category,
      label: `${parentLabel}：居宅内就労（在宅・農業等）の状況は？`,
      helpText: '週の就労日数と週の合計就労時間で選択してください',
      inputType: 'select',
      options: intWorkOptions(prefix),
    },
    {
      id: `${prefix}_naikoku`,
      category,
      label: `${parentLabel}：内職の状況は？`,
      inputType: 'select',
      options: naikokuOptions(prefix),
    },
    {
      id: `${prefix}_study`,
      category,
      label: `${parentLabel}：就学・技能修得（大学・専門学校・職業訓練等）の状況は？`,
      helpText: '週の登校・受講日数と週の合計時間で選択してください（就労と同じ点数体系）',
      inputType: 'select',
      options: studyOptions(prefix),
    },
    {
      id: `${prefix}_care_work`,
      category,
      label: `${parentLabel}：同居家族の介護・看護の状況は？`,
      helpText: '週の介護・看護日数と週の合計時間で選択してください（就労と同じ点数体系）',
      inputType: 'select',
      options: careWorkOptions(prefix),
    },
    {
      id: `${prefix}_pregnancy`,
      category,
      label: `${parentLabel}：妊娠中または出産前後8週間以内ですか？`,
      inputType: 'radio',
      options: [
        { label: 'いいえ', value: `${prefix}_preg_no`, points: 0 },
        { label: 'はい（6点）', value: `${prefix}_preg_yes`, points: 6 },
      ],
    },
    {
      id: `${prefix}_illness`,
      category,
      label: `${parentLabel}：疾病・負傷の状況は？`,
      inputType: 'radio',
      options: illnessOptions(prefix),
    },
    {
      id: `${prefix}_disability`,
      category,
      label: `${parentLabel}：障害の状況は？`,
      inputType: 'radio',
      options: disabilityOptions(prefix),
    },
    {
      id: `${prefix}_jobseeking`,
      category,
      label: `${parentLabel}：求職活動中（就労先が未定）ですか？`,
      inputType: 'radio',
      options: [
        { label: 'いいえ', value: `${prefix}_js_no`, points: 0 },
        { label: 'はい（1点）', value: `${prefix}_js_yes`, points: 1 },
      ],
    },
    {
      id: `${prefix}_parental_leave`,
      category,
      label: `${parentLabel}：育児休業中（既に利用中の施設の継続利用）ですか？`,
      inputType: 'radio',
      options: [
        { label: 'いいえ', value: `${prefix}_pl_no`, points: 0 },
        { label: 'はい（3点）', value: `${prefix}_pl_yes`, points: 3 },
      ],
    },
    {
      id: `${prefix}_absent`,
      category,
      label: `${parentLabel}：保護者の不在（死亡・行方不明・拘禁等）に該当しますか？`,
      inputType: 'radio',
      options: [
        { label: 'いいえ', value: `${prefix}_abs_no`, points: 0 },
        { label: 'はい（10点）', value: `${prefix}_abs_yes`, points: 10 },
      ],
    },
    {
      id: `${prefix}_disaster`,
      category,
      label: `${parentLabel}：災害復旧に従事していますか？`,
      inputType: 'radio',
      options: [
        { label: 'いいえ', value: `${prefix}_dsstr_no`, points: 0 },
        { label: 'はい（10点）', value: `${prefix}_dsstr_yes`, points: 10 },
      ],
    },
  ];
}

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_outofcity',
    category: 'adjustment',
    label: '市外在住者ですか？',
    helpText: '該当する場合は-20点となります',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_oc_no', points: 0 },
      { label: 'はい（-20）', value: 'adj_oc_yes', points: -20 },
    ],
  },
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親世帯ですか？（死別・離婚・未婚等、事実婚を除く）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sp_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_sp_yes', points: 2 },
    ],
  },
  {
    id: 'adj_temporary_transfer',
    category: 'adjustment',
    label: '単身赴任など6ヶ月以上の不在状態ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_tt_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_tt_yes', points: 1 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_wf_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_wf_yes', points: 2 },
    ],
  },
  {
    id: 'adj_social_care',
    category: 'adjustment',
    label: '社会的養護（児童養護施設等からの利用児童）に該当しますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sc_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_sc_yes', points: 1 },
    ],
  },
  {
    id: 'adj_job_loss',
    category: 'adjustment',
    label: '生計中心者が失業し、就労の必要性が高いですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_jl_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_jl_yes', points: 2 },
    ],
  },
  {
    id: 'adj_frequent_hospital',
    category: 'adjustment',
    label: '児童が週3回以上の通院が必要ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_fh_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_fh_yes', points: 1 },
    ],
  },
  {
    id: 'adj_correspondence_university',
    category: 'adjustment',
    label: '保護者が通信制大学に在学していますか？',
    helpText: '該当する場合は-3点となります',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_cu_no', points: 0 },
      { label: 'はい（-3）', value: 'adj_cu_yes', points: -3 },
    ],
  },
  {
    id: 'adj_disabled_child',
    category: 'adjustment',
    label: '児童に障害がありますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_dc_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_dc_yes', points: 2 },
    ],
  },
  {
    id: 'adj_abuse',
    category: 'adjustment',
    label: '児童虐待またはそのおそれがありますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_ab_no', points: 0 },
      { label: 'はい（+10）', value: 'adj_ab_yes', points: 10 },
    ],
  },
  {
    id: 'adj_dv',
    category: 'adjustment',
    label: '配偶者等からのDV（暴力）で困難な状況ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_dv_no', points: 0 },
      { label: 'はい（+3）', value: 'adj_dv_yes', points: 3 },
    ],
  },
  {
    id: 'adj_maternity_return',
    category: 'adjustment',
    label: '産前産後休業から職場復帰予定ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_mr_no', points: 0 },
      { label: 'はい（+10）', value: 'adj_mr_yes', points: 10 },
    ],
  },
  {
    id: 'adj_current_enrolled',
    category: 'adjustment',
    label: '現在利用中の保育所等の継続希望ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_ce_no', points: 0 },
      { label: 'はい（+7）', value: 'adj_ce_yes', points: 7 },
    ],
  },
  {
    id: 'adj_sibling_enrolled',
    category: 'adjustment',
    label: 'きょうだいが既に同一施設を利用中で、継続利用を希望していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_se_no', points: 0 },
      { label: 'はい（+4）', value: 'adj_se_yes', points: 4 },
    ],
  },
  {
    id: 'adj_sibling_during_maternity',
    category: 'adjustment',
    label: '産前産後休業中に出産予定で、兄姉が既に同一施設を利用中ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sdm_no', points: 0 },
      { label: 'はい（+10）', value: 'adj_sdm_yes', points: 10 },
    ],
  },
  {
    id: 'adj_small_grad',
    category: 'adjustment',
    label: '地域型保育施設（小規模保育等）を卒園し、新施設への入園を希望していますか？',
    inputType: 'select',
    options: [
      { label: 'いいえ', value: 'adj_sg_no', points: 0 },
      { label: 'はい・連携施設を第1希望（+10）', value: 'adj_sg_10', points: 10 },
      { label: 'はい・連携施設を第2希望以下（+7）', value: 'adj_sg_7', points: 7 },
      { label: 'はい・連携施設外（+4）', value: 'adj_sg_4', points: 4 },
    ],
  },
  {
    id: 'adj_return_work',
    category: 'adjustment',
    label: '育児休業から職場復帰時に利用開始予定ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_rw_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_rw_yes', points: 2 },
    ],
  },
  {
    id: 'adj_nursery_worker',
    category: 'adjustment',
    label: '保育士・保育教諭として勤務していますか？',
    inputType: 'select',
    options: [
      { label: 'いいえ', value: 'adj_nw_no', points: 0 },
      { label: '市内施設で月120時間以上勤務（+15）', value: 'adj_nw_15', points: 15 },
      { label: '市内施設で月80～120時間未満勤務（+10）', value: 'adj_nw_10', points: 10 },
      { label: '市内施設で月48～80時間未満勤務（+5）', value: 'adj_nw_5', points: 5 },
      { label: '市外施設で勤務（+3）', value: 'adj_nw_out_3', points: 3 },
    ],
  },
  {
    id: 'adj_job_offer_undefined',
    category: 'adjustment',
    label: '採用が内定していますが、就労開始時期が未定ですか？',
    helpText: '該当する場合は-3点となります',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_jou_no', points: 0 },
      { label: 'はい（-3）', value: 'adj_jou_yes', points: -3 },
    ],
  },
  {
    id: 'adj_grandparent',
    category: 'adjustment',
    label: '65歳未満の同居親族（無職・健康）が保育可能ですか？',
    helpText: '該当する場合は-20点となります',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_gp_no', points: 0 },
      { label: 'はい（-20）', value: 'adj_gp_yes', points: -20 },
    ],
  },
  {
    id: 'adj_transfer',
    category: 'adjustment',
    label: '特別な理由なく転園を希望していますか？',
    helpText: '該当する場合は-15点となります',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_tr_no', points: 0 },
      { label: 'はい（-15）', value: 'adj_tr_yes', points: -15 },
    ],
  },
  {
    id: 'adj_arrears',
    category: 'adjustment',
    label: '保育料の未納が3ヶ月以上ありますか？',
    helpText: '該当する場合は-10点となります',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_ar_no', points: 0 },
      { label: 'はい（-10）', value: 'adj_ar_yes', points: -10 },
    ],
  },
  {
    id: 'adj_withdrawal',
    category: 'adjustment',
    label: '同一年度内に入所を辞退したことがありますか？',
    helpText: '該当する場合は-5点となります',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_wd_no', points: 0 },
      { label: 'はい（-5）', value: 'adj_wd_yes', points: -5 },
    ],
  },
];

export const asakuchiData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
