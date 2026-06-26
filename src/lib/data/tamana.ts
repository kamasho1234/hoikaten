import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 玉名市 保育利用調整基準データ
// 出典: 玉名市保育の利用に関する規則 別表第1・第2
// https://www1.g-reiki.net/tamana/reiki_honbun/r227RG00001067.html
// ---------------------------------------------------------------------------
// sum方式（父母の基準点数を合算）。
// ひとり親は基準点数に+10点を加算。
// 就労評価は月間総時間数と月間日数の両方で評価（月150時間以上かつ月12日以上=10点）。
// 介護・看護・就学は就労の区分に準じて算定。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'tamana',
  name: '玉名市',
  slug: 'tamana',
  prefecture: '熊本県',
  maxBasePoints: 20,
} as const;

// 外勤・自営業・在宅勤務・就学・介護（就労区分に準じる）共通グリッド
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_emp_none`, points: 0 },
  { label: '月150時間以上かつ月12日以上（10点）', value: `${prefix}_emp_10`, points: 10 },
  { label: '月100〜150時間未満かつ月12日以上（8点）', value: `${prefix}_emp_8`, points: 8 },
  { label: '月48〜100時間未満かつ月12日以上（6点）', value: `${prefix}_emp_6`, points: 6 },
  { label: '月48時間以上かつ月12日未満（4点）', value: `${prefix}_emp_4`, points: 4 },
  { label: 'その他の就労（月12日以上かつ4時間以上）（4点）', value: `${prefix}_emp_4b`, points: 4 },
  { label: 'その他の就労（月48時間以上）（3点）', value: `${prefix}_emp_3`, points: 3 },
];

// 就労予定（確定）: 就労中の点数から-1点
const employmentScheduledOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_emp_sched_none`, points: 0 },
  { label: '月150時間以上かつ月12日以上に相当（就労予定）（9点）', value: `${prefix}_emp_sched_9`, points: 9 },
  { label: '月100〜150時間未満かつ月12日以上に相当（就労予定）（7点）', value: `${prefix}_emp_sched_7`, points: 7 },
  { label: '月48〜100時間未満かつ月12日以上に相当（就労予定）（5点）', value: `${prefix}_emp_sched_5`, points: 5 },
  { label: '月48時間以上かつ月12日未満に相当（就労予定）（3点）', value: `${prefix}_emp_sched_3`, points: 3 },
];

const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_ill_none`, points: 0 },
  { label: '入院中（10点）', value: `${prefix}_ill_10`, points: 10 },
  { label: '入院予定（9点）', value: `${prefix}_ill_9`, points: 9 },
  { label: '1か月以上常時病臥（8点）', value: `${prefix}_ill_8`, points: 8 },
  { label: 'その他の疾病（6点）', value: `${prefix}_ill_6`, points: 6 },
];

const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_dis_none`, points: 0 },
  { label: '身体1・2級 / 療育A1-A2 / 精神1級（10点）', value: `${prefix}_dis_10`, points: 10 },
  { label: '身体3級 / 療育B1 / 精神2級（7点）', value: `${prefix}_dis_7`, points: 7 },
  { label: '身体4級 / 療育B2 / 精神3級（5点）', value: `${prefix}_dis_5`, points: 5 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: '最も該当するものをひとつ選んでください',
    inputType: 'select',
    options: [
      { label: '外勤・自営業・在宅勤務で就労中', value: `${prefix}_reason_work`, points: 0 },
      { label: '就労予定（内定・採用確定）', value: `${prefix}_reason_work_sched`, points: 0 },
      { label: '内職（月2万円以上の実績1か月以上）（5点）', value: `${prefix}_reason_piecework`, points: 5 },
      { label: '求職活動中（1点）', value: `${prefix}_reason_jobseek`, points: 1 },
      { label: '就学・職業訓練', value: `${prefix}_reason_study`, points: 0 },
      { label: '病気・けが', value: `${prefix}_reason_illness`, points: 0 },
      { label: '障害', value: `${prefix}_reason_disability`, points: 0 },
      { label: '家族の居宅介護・看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '子どもの入院に付き添い（10点）', value: `${prefix}_reason_child_hosp`, points: 10 },
      { label: '妊娠・出産（産前産後）（10点）', value: `${prefix}_reason_birth`, points: 10 },
      { label: '虐待・DV（10点）', value: `${prefix}_reason_dv`, points: 10 },
      { label: '災害による家屋損傷等（10点）', value: `${prefix}_reason_disaster`, points: 10 },
      { label: '不在（ひとり親のため父/母が不在）', value: `${prefix}_reason_absent`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_work`,
      category,
      label: `${parentLabel}の就労状況は？（外勤・自営業・在宅勤務）`,
      helpText: '月間の総就労時間と月間就労日数で選択してください',
      inputType: 'select',
      options: employmentOptions(prefix),
    },
    {
      id: `${prefix}_work_sched`,
      category,
      label: `${parentLabel}の就労予定の状況は？（内定・採用確定）`,
      helpText: '就労開始後の見込み時間・日数で選択してください（就労中の点数から1点減）',
      inputType: 'select',
      options: employmentScheduledOptions(prefix),
    },
    {
      id: `${prefix}_study`,
      category,
      label: `${parentLabel}の就学・職業訓練の状況は？`,
      helpText: '就労の区分に準じて算定します（月間の通学時間・日数）',
      inputType: 'select',
      options: employmentOptions(prefix),
    },
    {
      id: `${prefix}_illness`,
      category,
      label: `${parentLabel}の疾病の状況は？`,
      inputType: 'radio',
      options: illnessOptions(prefix),
    },
    {
      id: `${prefix}_disability`,
      category,
      label: `${parentLabel}の障害の等級は？`,
      inputType: 'radio',
      options: disabilityOptions(prefix),
    },
    {
      id: `${prefix}_care`,
      category,
      label: `${parentLabel}の家族の居宅介護・看護の状況は？`,
      helpText: '就労の区分に準じて算定します（月間の介護時間・日数）',
      inputType: 'select',
      options: employmentOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent_base',
    category: 'adjustment',
    label: 'ひとり親世帯（基準点数に+10点の加算）',
    helpText: 'ひとり親世帯の場合、基準点数に10点が加算されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sp_base_no', points: 0 },
      { label: 'はい（+10）', value: 'adj_sp_base_yes', points: 10 },
    ],
  },
  {
    id: 'adj_single_parent_relative',
    category: 'adjustment',
    label: 'ひとり親世帯：同居の親族はいますか？',
    inputType: 'radio',
    options: [
      { label: '該当しない（ひとり親ではない）', value: 'adj_sp_rel_na', points: 0 },
      { label: '同居の親族あり（+1）', value: 'adj_sp_rel_yes', points: 1 },
      { label: '同居の親族なし（+2）', value: 'adj_sp_rel_no', points: 2 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: 'きょうだいが保育施設を利用中ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_no', points: 0 },
      { label: 'はい（+5）', value: 'adj_sibling_yes', points: 5 },
    ],
  },
  {
    id: 'adj_parental_leave',
    category: 'adjustment',
    label: '産休・育休明けの職場復帰に伴う申込ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_parental_leave_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_parental_leave_yes', points: 2 },
    ],
  },
  {
    id: 'adj_small_nursery_grad',
    category: 'adjustment',
    label: '小規模保育施設から連携施設への卒園入所ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_small_grad_no', points: 0 },
      { label: 'はい（+5）', value: 'adj_small_grad_yes', points: 5 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯（就労による自立支援）ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_welfare_yes', points: 2 },
    ],
  },
  {
    id: 'adj_abuse_support',
    category: 'adjustment',
    label: '児童虐待として支援が必要と判断されていますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_abuse_no', points: 0 },
      { label: 'はい（+4）', value: 'adj_abuse_yes', points: 4 },
    ],
  },
  {
    id: 'adj_parent_disability',
    category: 'adjustment',
    label: '保護者（父または母）に障害がありますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_parent_dis_no', points: 0 },
      { label: '重度障害（+2）', value: 'adj_parent_dis_heavy', points: 2 },
      { label: '軽度障害（+1）', value: 'adj_parent_dis_light', points: 1 },
    ],
  },
  {
    id: 'adj_child_disability',
    category: 'adjustment',
    label: '申請する子どもに障害がありますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_child_dis_no', points: 0 },
      { label: '重度障害（+2）', value: 'adj_child_dis_heavy', points: 2 },
      { label: '軽度障害（+1）', value: 'adj_child_dis_light', points: 1 },
    ],
  },
  {
    id: 'adj_unemployment',
    category: 'adjustment',
    label: '失業により就労必要性が高いですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unemployment_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_unemployment_yes', points: 1 },
    ],
  },
  {
    id: 'adj_education_worker',
    category: 'adjustment',
    label: '保護者が保育・教育施設に従事していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_edu_worker_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_edu_worker_yes', points: 1 },
    ],
  },
  {
    id: 'adj_grandparent_jobless',
    category: 'adjustment',
    label: '求職中の65歳未満の同居祖父母がいますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_gp_jobless_no', points: 0 },
      { label: 'はい（-5）', value: 'adj_gp_jobless_yes', points: -5 },
    ],
  },
  {
    id: 'adj_arrears',
    category: 'adjustment',
    label: '保育料等の滞納はありますか？',
    inputType: 'radio',
    options: [
      { label: 'なし', value: 'adj_arrears_none', points: 0 },
      { label: '3か月以上滞納かつ納付実績なし（-1）', value: 'adj_arrears_1', points: -1 },
      { label: '6か月以上滞納または納付実績なし（-3）', value: 'adj_arrears_3', points: -3 },
      { label: '6か月以上滞納かつ納付実績なし（-5）', value: 'adj_arrears_5', points: -5 },
    ],
  },
];

export const tamanaData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
