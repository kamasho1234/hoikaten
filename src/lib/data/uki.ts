import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 宇城市 保育の必要性認定基準データ
// 出典: 宇城市保育の必要性の認定に関する基準を定める条例施行規則 別表第2
// https://www1.g-reiki.net/uki/reiki_honbun/r177RG00001059.html
// ---------------------------------------------------------------------------
// sum方式（父母の指数1をそれぞれ合算）。
// 就労は月間就労時間で評価（月150時間以上=10点、10段階）。
// 就学は就労に準じて算定（就労条件未満は2点）。
// ひとり親+20点。65歳未満同居祖父母が就労不可で保育可能な場合-5点。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'uki',
  name: '宇城市',
  slug: 'uki',
  prefecture: '熊本県',
  maxBasePoints: 20,
} as const;

const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_emp_none`, points: 0 },
  { label: '月150時間以上（10点）', value: `${prefix}_emp_10`, points: 10 },
  { label: '月140〜150時間未満（9点）', value: `${prefix}_emp_9`, points: 9 },
  { label: '月120〜140時間未満（8点）', value: `${prefix}_emp_8`, points: 8 },
  { label: '月100〜120時間未満（7点）', value: `${prefix}_emp_7`, points: 7 },
  { label: '月80〜100時間未満（6点）', value: `${prefix}_emp_6`, points: 6 },
  { label: '月60〜80時間未満（5点）', value: `${prefix}_emp_5`, points: 5 },
  { label: '月48〜60時間未満（4点）', value: `${prefix}_emp_4`, points: 4 },
  { label: '月48時間未満の内職等（3点）', value: `${prefix}_emp_3`, points: 3 },
];

const studyOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_study_none`, points: 0 },
  { label: '月150時間以上の就学・職業訓練（10点）', value: `${prefix}_study_10`, points: 10 },
  { label: '月140〜150時間未満（9点）', value: `${prefix}_study_9`, points: 9 },
  { label: '月120〜140時間未満（8点）', value: `${prefix}_study_8`, points: 8 },
  { label: '月100〜120時間未満（7点）', value: `${prefix}_study_7`, points: 7 },
  { label: '月80〜100時間未満（6点）', value: `${prefix}_study_6`, points: 6 },
  { label: '月60〜80時間未満（5点）', value: `${prefix}_study_5`, points: 5 },
  { label: '月48〜60時間未満（4点）', value: `${prefix}_study_4`, points: 4 },
  { label: '月48時間未満の就学（2点）', value: `${prefix}_study_2`, points: 2 },
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
      helpText: '月間の総就労時間（残業除く、休憩1時間以内含む）で選択してください',
      inputType: 'select',
      options: employmentOptions(prefix),
    },
    {
      id: `${prefix}_illness`,
      category,
      label: `${parentLabel}：疾病・傷病の状況は？`,
      inputType: 'radio',
      options: [
        { label: 'あてはまらない', value: `${prefix}_ill_none`, points: 0 },
        { label: '入院中（1か月以上）または重篤な状態（10点）', value: `${prefix}_ill_10`, points: 10 },
        { label: '療養が必要（医師の証明あり）（7点）', value: `${prefix}_ill_7`, points: 7 },
        { label: '病状が軽易で日常生活に特に支障がない（3点）', value: `${prefix}_ill_3`, points: 3 },
      ],
    },
    {
      id: `${prefix}_disability`,
      category,
      label: `${parentLabel}：障がいの等級は？（保育が困難な場合）`,
      inputType: 'radio',
      options: [
        { label: 'あてはまらない', value: `${prefix}_dis_none`, points: 0 },
        { label: '身体障害者手帳1・2級（10点）', value: `${prefix}_dis_10`, points: 10 },
        { label: '療育手帳A1・A2・B1（10点）', value: `${prefix}_dis_10_a`, points: 10 },
        { label: '精神障害者保健福祉手帳1・2級（10点）', value: `${prefix}_dis_10_b`, points: 10 },
        { label: '療育手帳B2（8点）', value: `${prefix}_dis_8`, points: 8 },
        { label: '精神障害者保健福祉手帳3級（8点）', value: `${prefix}_dis_8_b`, points: 8 },
        { label: '身体障害者手帳3級（6点）', value: `${prefix}_dis_6`, points: 6 },
        { label: '身体障害者手帳4〜6級（4点）', value: `${prefix}_dis_4`, points: 4 },
      ],
    },
    {
      id: `${prefix}_care`,
      category,
      label: `${parentLabel}：看護・介護の状況は？`,
      helpText: '入院親族への付き添いがある場合は就労に準じて評価します',
      inputType: 'radio',
      options: [
        { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
        { label: '入院している同居親族に付き添う（1か月以上）', value: `${prefix}_care_attend`, points: 10 },
        { label: '常時寝たきり状態の同居親族を介護中（10点）', value: `${prefix}_care_10`, points: 10 },
        { label: '常時観察及び介護が必要（要介護3以上）（10点）', value: `${prefix}_care_10_b`, points: 10 },
        { label: 'その他の看護・介護が必要な状況（4点）', value: `${prefix}_care_4`, points: 4 },
      ],
    },
    {
      id: `${prefix}_study`,
      category,
      label: `${parentLabel}：就学・職業訓練の状況は？`,
      helpText: '就労と同様の基準で算定します（就労時間相当の通学時間で選択）',
      inputType: 'select',
      options: studyOptions(prefix),
    },
    {
      id: `${prefix}_jobseek`,
      category,
      label: `${parentLabel}：求職活動中ですか？（2点）`,
      inputType: 'radio',
      options: [
        { label: 'いいえ', value: `${prefix}_js_no`, points: 0 },
        { label: 'はい（+2）', value: `${prefix}_js_yes`, points: 2 },
      ],
    },
    {
      id: `${prefix}_disaster`,
      category,
      label: `${parentLabel}：災害復旧中ですか？（10点）`,
      inputType: 'radio',
      options: [
        { label: 'いいえ', value: `${prefix}_disaster_no`, points: 0 },
        { label: 'はい（+10）', value: `${prefix}_disaster_yes`, points: 10 },
      ],
    },
  ];

  if (parentNum === 2) {
    questions.push({
      id: `${prefix}_birth`,
      category,
      label: `${parentLabel}：産前産後の期間ですか？（10点）`,
      helpText: '出産予定日から8週前の月初から出産後8週を経過する日の翌日の月末までが対象です',
      inputType: 'radio',
      options: [
        { label: 'いいえ', value: `${prefix}_birth_no`, points: 0 },
        { label: 'はい（+10）', value: `${prefix}_birth_yes`, points: 10 },
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
    helpText: '離婚調停中も含みます（再申請時は+10点）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sp_no', points: 0 },
      { label: 'はい（+20）', value: 'adj_sp_yes', points: 20 },
    ],
  },
  {
    id: 'adj_social_care',
    category: 'adjustment',
    label: '社会的養護が必要と判断されていますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sc_no', points: 0 },
      { label: 'はい（+20）', value: 'adj_sc_yes', points: 20 },
    ],
  },
  {
    id: 'adj_dv_abuse',
    category: 'adjustment',
    label: '虐待またはDV被害を受けていますか？',
    helpText: '関係機関から支援が必要と判断されている場合',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_dv_no', points: 0 },
      { label: 'はい（+20）', value: 'adj_dv_yes', points: 20 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯で就労による自立支援が必要ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい（+10）', value: 'adj_welfare_yes', points: 10 },
    ],
  },
  {
    id: 'adj_child_disability',
    category: 'adjustment',
    label: '申請する子どもに障がいがありますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_cdis_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_cdis_yes', points: 2 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: 'きょうだいの状況は？',
    helpText: '該当する状況を選択してください',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_sib_none', points: 0 },
      { label: 'きょうだいが保育施設を利用中で、入所希望児が未就園（+1）', value: 'adj_sib_1', points: 1 },
      { label: 'きょうだい共に保育施設利用で、同一施設への変更希望（+4）', value: 'adj_sib_4', points: 4 },
      { label: 'きょうだいが同時に入所を申し込み（+2）', value: 'adj_sib_2', points: 2 },
    ],
  },
  {
    id: 'adj_twins',
    category: 'adjustment',
    label: '多胎児の申し込みですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_twins_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_twins_yes', points: 2 },
    ],
  },
  {
    id: 'adj_return_work',
    category: 'adjustment',
    label: '産休・育休から復帰と同時に入所を希望していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_rw_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_rw_yes', points: 2 },
    ],
  },
  {
    id: 'adj_transfer',
    category: 'adjustment',
    label: '転出等により現在の施設での継続利用が困難ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_tf_no', points: 0 },
      { label: 'はい（+3）', value: 'adj_tf_yes', points: 3 },
    ],
  },
  {
    id: 'adj_waiting',
    category: 'adjustment',
    label: '前年度の申請で6ヶ月以上保留されていましたか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_wt_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_wt_yes', points: 1 },
    ],
  },
  {
    id: 'adj_staff',
    category: 'adjustment',
    label: '管内保育施設に保育士等として勤務していますか？',
    helpText: '管外施設での勤務は別に加算します',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_staff_no', points: 0 },
      { label: '管内施設に勤務（+10）', value: 'adj_staff_in', points: 10 },
      { label: '管外施設に勤務（+5）', value: 'adj_staff_out', points: 5 },
    ],
  },
  {
    id: 'adj_group_care',
    category: 'adjustment',
    label: '集団保育が必要と医師が判断していますか？',
    helpText: '医師の意見書が必要です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_gc_no', points: 0 },
      { label: 'はい（+10）', value: 'adj_gc_yes', points: 10 },
    ],
  },
  {
    id: 'adj_grandparent',
    category: 'adjustment',
    label: '65歳未満の同居祖父母が就労しておらず、家庭で保育できる状況ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_gp_no', points: 0 },
      { label: 'はい（-5）', value: 'adj_gp_yes', points: -5 },
    ],
  },
  {
    id: 'adj_arrears',
    category: 'adjustment',
    label: '在園または卒園施設の保育料に未納がありますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_arr_no', points: 0 },
      { label: 'はい（-5）', value: 'adj_arr_yes', points: -5 },
    ],
  },
];

export const ukiData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
