import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 函館市 保育園入園 基本点数・調整指数データ
// 出典: 函館市保育所・認定こども園（保育機能部分）利用調整基準表
// https://www.city.hakodate.hokkaido.jp/docs/2017051700061/
// ---------------------------------------------------------------------------

const municipality = {
  id: 'hakodate',
  name: '函館市',
  slug: 'hakodate',
  prefecture: '北海道',
  maxBasePoints: 20, // 父母各10点
} as const;

// ---------------------------------------------------------------------------
// 保育が必要な理由ごとの選択肢テンプレート
// ---------------------------------------------------------------------------

/** 就労（居宅外） */
const employmentOutsideOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_emp_out_none`, points: 0 },
  { label: '居宅外・月20日以上・月160時間以上（週5日・週40時間以上）', value: `${prefix}_emp_out_10`, points: 10 },
  { label: '居宅外・月20日以上・月120時間以上（週5日・週30時間以上）', value: `${prefix}_emp_out_9`, points: 9 },
  { label: '居宅外・月20日以上・月80時間以上（週5日・週20時間以上）', value: `${prefix}_emp_out_8`, points: 8 },
  { label: '居宅外・月16〜20日未満・月128時間以上（週4日・週32時間以上）', value: `${prefix}_emp_out_7`, points: 7 },
  { label: '居宅外・月16〜20日未満・月96時間以上（週4日・週24時間以上）', value: `${prefix}_emp_out_6`, points: 6 },
  { label: '居宅外・月16〜20日未満・月64時間以上（週4日・週16時間以上）', value: `${prefix}_emp_out_5`, points: 5 },
  { label: '居宅外・月16日未満・月64時間以上', value: `${prefix}_emp_out_4`, points: 4 },
];

/** 就労（居宅内・内職含む） */
const employmentInsideOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_emp_in_none`, points: 0 },
  { label: '居宅内・月20日以上・月160時間以上（週5日・週40時間以上）', value: `${prefix}_emp_in_9`, points: 9 },
  { label: '居宅内・月20日以上・月120時間以上（週5日・週30時間以上）', value: `${prefix}_emp_in_8`, points: 8 },
  { label: '居宅内・月20日以上・月80時間以上（週5日・週20時間以上）', value: `${prefix}_emp_in_7`, points: 7 },
  { label: '居宅内・月16〜20日未満・月128時間以上（週4日・週32時間以上）', value: `${prefix}_emp_in_6`, points: 6 },
  { label: '居宅内・月16〜20日未満・月96時間以上（週4日・週24時間以上）', value: `${prefix}_emp_in_5`, points: 5 },
  { label: '居宅内・月16〜20日未満・月64時間以上（週4日・週16時間以上）', value: `${prefix}_emp_in_4`, points: 4 },
  { label: '居宅内・月16日未満・月64時間以上', value: `${prefix}_emp_in_3`, points: 3 },
];

/** 疾病・負傷 */
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院中', value: `${prefix}_illness_10a`, points: 10 },
  { label: '常時臥床または精神性疾患', value: `${prefix}_illness_10b`, points: 10 },
  { label: '月複数回の通院が必要', value: `${prefix}_illness_7`, points: 7 },
  { label: 'その他の自宅療養', value: `${prefix}_illness_5`, points: 5 },
];

/** 障がい */
const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '身体1〜3級（聴覚1〜6級）/ 精神1・2級 / 療育A', value: `${prefix}_disability_10`, points: 10 },
  { label: '身体4・5級 / 精神3級 / 療育B', value: `${prefix}_disability_7`, points: 7 },
  { label: '身体6・7級', value: `${prefix}_disability_5`, points: 5 },
];

/** 介護・看護（自宅） */
const careHomeOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_home_none`, points: 0 },
  { label: '自宅で常時介護・看護　月160時間以上', value: `${prefix}_care_home_10`, points: 10 },
  { label: '自宅で常時介護・看護　月120時間以上', value: `${prefix}_care_home_9`, points: 9 },
  { label: '自宅で常時介護・看護　月80時間以上', value: `${prefix}_care_home_8`, points: 8 },
  { label: '自宅で常時介護・看護　月128時間以上（週4日）', value: `${prefix}_care_home_7`, points: 7 },
  { label: '自宅で常時介護・看護　月96時間以上（週4日）', value: `${prefix}_care_home_6`, points: 6 },
  { label: '自宅で常時介護・看護　月64時間以上（週4日）', value: `${prefix}_care_home_5`, points: 5 },
];

/** 介護・看護（施設等） */
const careFacilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_fac_none`, points: 0 },
  { label: '施設等で常時介護・看護　月160時間以上', value: `${prefix}_care_fac_9`, points: 9 },
  { label: '施設等で常時介護・看護　月120時間以上', value: `${prefix}_care_fac_8`, points: 8 },
  { label: '施設等で常時介護・看護　月80時間以上', value: `${prefix}_care_fac_7`, points: 7 },
  { label: '施設等で常時介護・看護　月128時間以上（週4日）', value: `${prefix}_care_fac_6`, points: 6 },
  { label: '施設等で常時介護・看護　月96時間以上（週4日）', value: `${prefix}_care_fac_5`, points: 5 },
  { label: '施設等で常時介護・看護　月64時間以上（週4日）', value: `${prefix}_care_fac_4`, points: 4 },
];

/** 妊娠・出産 */
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '妊娠・出産（産前産後各8週）', value: `${prefix}_childbirth_7`, points: 7 },
];

/** 災害復旧 */
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '災害復旧にあたっている', value: `${prefix}_disaster_10`, points: 10 },
];

/** 求職活動 */
const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動中（起業準備含む）', value: `${prefix}_jobseeking_3`, points: 3 },
];

/** 就学・職業訓練 */
const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '月120時間以上', value: `${prefix}_education_9`, points: 9 },
  { label: '月64時間以上', value: `${prefix}_education_5`, points: 5 },
];

// ---------------------------------------------------------------------------
// 保護者ごとの質問を生成するヘルパー
// ---------------------------------------------------------------------------

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: 'いちばん近いものをひとつ選んでください',
    inputType: 'select',
    options: [
      { label: '居宅外で働いている', value: `${prefix}_reason_emp_out`, points: 0 },
      { label: '居宅内で働いている（内職含む）', value: `${prefix}_reason_emp_in`, points: 0 },
      { label: '妊娠・出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '病気・けがで療養中', value: `${prefix}_reason_illness`, points: 0 },
      { label: '障がいがある', value: `${prefix}_reason_disability`, points: 0 },
      { label: '自宅で家族を介護・看護している', value: `${prefix}_reason_care_home`, points: 0 },
      { label: '施設等で家族を介護・看護している', value: `${prefix}_reason_care_fac`, points: 0 },
      { label: '災害復旧にあたっている', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '仕事を探している', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '学校・職業訓練に通っている', value: `${prefix}_reason_education`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_emp_out`,
      category,
      label: `${parentLabel}の居宅外での就労状況は？`,
      helpText: '勤務日数・時間を選んでください（通勤時間除く）',
      inputType: 'radio',
      options: employmentOutsideOptions(prefix),
    },
    {
      id: `${prefix}_emp_in`,
      category,
      label: `${parentLabel}の居宅内での就労状況は？`,
      helpText: '勤務日数・時間を選んでください（内職含む）',
      inputType: 'radio',
      options: employmentInsideOptions(prefix),
    },
    {
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}は妊娠・出産の前後ですか？`,
      inputType: 'radio',
      options: childbirthOptions(prefix),
    },
    {
      id: `${prefix}_illness`,
      category,
      label: `${parentLabel}の病気・けがの状況は？`,
      inputType: 'radio',
      options: illnessOptions(prefix),
    },
    {
      id: `${prefix}_disability`,
      category,
      label: `${parentLabel}の障がいの程度は？`,
      inputType: 'radio',
      options: disabilityOptions(prefix),
    },
    {
      id: `${prefix}_care_home`,
      category,
      label: `${parentLabel}の自宅での介護・看護の状況は？`,
      helpText: '施設等への往復時間は除きます',
      inputType: 'radio',
      options: careHomeOptions(prefix),
    },
    {
      id: `${prefix}_care_fac`,
      category,
      label: `${parentLabel}の施設等での介護・看護の状況は？`,
      helpText: '施設等への往復時間は除きます',
      inputType: 'radio',
      options: careFacilityOptions(prefix),
    },
    {
      id: `${prefix}_disaster`,
      category,
      label: `${parentLabel}は災害復旧にあたっていますか？`,
      inputType: 'radio',
      options: disasterOptions(prefix),
    },
    {
      id: `${prefix}_jobseeking`,
      category,
      label: `${parentLabel}は求職活動をしていますか？`,
      inputType: 'radio',
      options: jobSeekingOptions(prefix),
    },
    {
      id: `${prefix}_education`,
      category,
      label: `${parentLabel}はどのくらい学校・職業訓練に通っていますか？`,
      helpText: '月あたりの通学時間を選んでください',
      inputType: 'radio',
      options: educationOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// ---------------------------------------------------------------------------
// 調整指数（加算分）の質問
// ---------------------------------------------------------------------------

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親家庭ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい', value: 'adj_single_parent_yes', points: 13 },
    ],
  },
  {
    id: 'adj_parental_leave',
    category: 'adjustment',
    label: '産休・育休明けで復職しますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_parental_leave_no', points: 0 },
      { label: 'はい', value: 'adj_parental_leave_yes', points: 4 },
    ],
  },
  {
    id: 'adj_sibling_same',
    category: 'adjustment',
    label: 'きょうだいが同じ保育所等を利用していますか？',
    helpText: '1号認定の利用を含みます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_same_no', points: 0 },
      { label: 'はい', value: 'adj_sibling_same_yes', points: 5 },
    ],
  },
  {
    id: 'adj_sibling_simultaneous',
    category: 'adjustment',
    label: 'きょうだい複数人で同時に入所を希望しますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_simultaneous_no', points: 0 },
      { label: 'はい', value: 'adj_sibling_simultaneous_yes', points: 1 },
    ],
  },
  {
    id: 'adj_child_disability',
    category: 'adjustment',
    label: '入園を希望するお子さまに障がいがありますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_child_disability_no', points: 0 },
      { label: 'はい', value: 'adj_child_disability_yes', points: 3 },
    ],
  },
  {
    id: 'adj_nursery_worker',
    category: 'adjustment',
    label: '保護者が保育所等で保育士として働いていますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_nursery_worker_no', points: 0 },
      { label: 'はい', value: 'adj_nursery_worker_yes', points: 10 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯で就労による自立支援につながりますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい', value: 'adj_welfare_yes', points: 1 },
    ],
  },
  {
    id: 'adj_job_loss',
    category: 'adjustment',
    label: '生計中心者（父母）が失業し、就労の必要性が高いですか？',
    helpText: '利用希望日の前月から3か月以内に失業した場合',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_job_loss_no', points: 0 },
      { label: 'はい', value: 'adj_job_loss_yes', points: 1 },
    ],
  },
  {
    id: 'adj_parent_absent',
    category: 'adjustment',
    label: '保護者の一方が長期入院・単身赴任等で長期不在ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_parent_absent_no', points: 0 },
      { label: 'はい', value: 'adj_parent_absent_yes', points: 1 },
    ],
  },
  {
    id: 'adj_waiting',
    category: 'adjustment',
    label: '待機期間が6か月以上ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_waiting_no', points: 0 },
      { label: 'はい', value: 'adj_waiting_yes', points: 1 },
    ],
  },
  {
    id: 'adj_relative_care',
    category: 'adjustment',
    label: '65歳未満の保育できる親族が同居していますか？',
    helpText: '該当すると1点減点されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_relative_care_no', points: 0 },
      { label: 'はい', value: 'adj_relative_care_yes', points: -1 },
    ],
  },
  {
    id: 'adj_relative_other_child',
    category: 'adjustment',
    label: '65歳未満の同居親族や保護者が、対象児以外の子どもを保育していますか？',
    helpText: '該当すると1点減点されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_relative_other_child_no', points: 0 },
      { label: 'はい', value: 'adj_relative_other_child_yes', points: -1 },
    ],
  },
];

// ---------------------------------------------------------------------------
// エクスポート
// ---------------------------------------------------------------------------

export const hakodateData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
