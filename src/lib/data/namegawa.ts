import type { MunicipalityData, Question } from '../types';

// -------------------------------------------------------------------------
// 滑川町 保育園入園 利用調整基準データ
// 出典: 滑川町「滑川町保育施設入所選考基準表」
// https://www.town.namegawa.saitama.jp/material/files/group/5/R8sennkoukijunn.pdf
// -------------------------------------------------------------------------
// 滑川町は【基本点数について】に手順が書かれている。
//   1「父母それぞれの点数を合算して世帯の点数とする。」
//   2「父あるいは母の状況が複数の項目に該当する場合は、
//      原則として点数の高い状況をとり、世帯の点数とする。」
//   3「労働時間に通勤時間は含まない。」
// 1により scoringMethod は 'sum'。基本点数の最大は1人あたり10点。
//
// 【調整点数について】
//   1「調整点数（世帯）の加算・減算は父母の合計点数に対して行う。
//      調整点数（父母の状況）の加算については父母それぞれの点数に対して行う。」
//   2「各項目は重複して加減算する。」
// この画面では、どちらも調整の設問としてまとめて足している。
//
// 滑川町は0.5刻みの点数を使う（1か月に160時間以上の労働 9.5 など）。
//
// 原典で幅のある項目は選択肢にしていない。
// - 32 その他「上記の状況に類するものとして町長が認める場合」（0〜10）
// - 33 保育士等「保育士資格等を有し、町内保育施設に復職予定又は内定している」（5〜10）
// 多胎児（0.5〜1）は「3つ子以上は1点」と原典に書かれているので、
// 双子0.5・3つ子以上1として選択肢にしている。
//
// 「転所希望」（−0.5／+2）は、いま園を利用している方が別の園に移る話なので入れていない。
// -------------------------------------------------------------------------

const municipality = {
  id: 'namegawa',
  name: '滑川町',
  slug: 'namegawa',
  prefecture: '埼玉県',
  maxBasePoints: 20, // 父母各10点の合計
  scoringMethod: 'sum',
} as const;

// 就労・就学（9 在学・職業訓練は「1〜8を準用」）
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '1か月に170時間以上の労働', value: `${prefix}_employment_0`, points: 10 },
  { label: '1か月に160時間以上の労働', value: `${prefix}_employment_1`, points: 9.5 },
  { label: '1か月に150時間以上の労働', value: `${prefix}_employment_2`, points: 9 },
  { label: '1か月に140時間以上の労働', value: `${prefix}_employment_3`, points: 8.5 },
  { label: '1か月に130時間以上の労働', value: `${prefix}_employment_4`, points: 8 },
  { label: '1か月に110時間以上の労働', value: `${prefix}_employment_5`, points: 7 },
  { label: '1か月に90時間以上の労働', value: `${prefix}_employment_6`, points: 6 },
  { label: '1か月に64時間以上の労働', value: `${prefix}_employment_7`, points: 5 },
];

// 求職
const jobseekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '1か月に64時間未満の労働をしており、求職中', value: `${prefix}_jobseeking_0`, points: 3 },
  { label: '現在労働をしておらず、求職中', value: `${prefix}_jobseeking_1`, points: 1 },
];

// 父・母不在
const absentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_absent_none`, points: 0 },
  { label: 'ひとり親世帯（死亡・離婚・行方不明等）', value: `${prefix}_absent_0`, points: 10 },
];

// 出産
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産（予定日）が属する月および該当月の前後2か月', value: `${prefix}_childbirth_0`, points: 10 },
];

// 疾病・障害
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '児童の保育が完全に不可能な状況', value: `${prefix}_illness_0`, points: 10 },
  { label: '身体障害者手帳1・2級、療育手帳マルA・A、精神障害者保健福祉手帳1級', value: `${prefix}_illness_1`, points: 10 },
  { label: '児童の保育が困難な状況', value: `${prefix}_illness_2`, points: 8 },
  { label: '身体障害者手帳3級、療育手帳B、精神障害者保健福祉手帳2級', value: `${prefix}_illness_3`, points: 8 },
  { label: '児童の保育が部分的に困難な状況', value: `${prefix}_illness_4`, points: 6 },
  { label: '身体障害者手帳4級以下、療育手帳C、精神障害者保健福祉手帳3級', value: `${prefix}_illness_5`, points: 6 },
];

// 介護・看護
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '1か月に170時間以上の介護・通院付添等', value: `${prefix}_care_0`, points: 10 },
  { label: '1か月に160時間以上の介護・通院付添等', value: `${prefix}_care_1`, points: 9.5 },
  { label: '1か月に150時間以上の介護・通院付添等', value: `${prefix}_care_2`, points: 9 },
  { label: '1か月に140時間以上の介護・通院付添等', value: `${prefix}_care_3`, points: 8.5 },
  { label: '1か月に130時間以上の介護・通院付添等', value: `${prefix}_care_4`, points: 8 },
  { label: '1か月に110時間以上の介護・通院付添等', value: `${prefix}_care_5`, points: 7 },
  { label: '1か月に90時間以上の介護・通院付添等', value: `${prefix}_care_6`, points: 6 },
  { label: '1か月に64時間以上の介護・通院付添等', value: `${prefix}_care_7`, points: 5 },
];

// 災害
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '火災、風水害で家屋損傷その他災害復旧', value: `${prefix}_disaster_0`, points: 10 },
];

// 家庭内暴力・虐待
const abuseOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_abuse_none`, points: 0 },
  { label: '家庭内暴力により保育を行うことが困難であると認められる状態', value: `${prefix}_abuse_0`, points: 10 },
  { label: '児童虐待の恐れがあると認められる状態', value: `${prefix}_abuse_1`, points: 10 },
];

// 育児休業
const parentalLeaveOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_parental_leave_none`, points: 0 },
  { label: '育児休業の間に引き続き保育施設の利用が必要である（継続のみ）', value: `${prefix}_parental_leave_0`, points: 9 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: '父母それぞれの点数を合算します。複数の項目に該当する場合は点数の高い状況をとります',
    inputType: 'select',
    options: [
      { label: '就労・就学', value: `${prefix}_reason_employment`, points: 0 },
      { label: '求職', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '父・母不在（ひとり親）', value: `${prefix}_reason_absent`, points: 0 },
      { label: '出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '疾病・障害', value: `${prefix}_reason_illness`, points: 0 },
      { label: '介護・看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '災害', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '家庭内暴力・虐待', value: `${prefix}_reason_abuse`, points: 0 },
      { label: '育児休業', value: `${prefix}_reason_parental_leave`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の就労・就学の状況は？`,
      helpText: '教育施設への在学・職業訓練も、この労働時間の区分を準用します。労働時間に通勤時間は含みません',
      inputType: 'radio',
      options: employmentOptions(prefix),
    },
    {
      id: `${prefix}_jobseeking`,
      category,
      label: `${parentLabel}の求職の状況は？`,
      inputType: 'radio',
      options: jobseekingOptions(prefix),
    },
    {
      id: `${prefix}_absent`,
      category,
      label: `${parentLabel}：父・母不在ですか？`,
      inputType: 'radio',
      options: absentOptions(prefix),
    },
    {
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}の出産の状況は？`,
      inputType: 'radio',
      options: childbirthOptions(prefix),
    },
    {
      id: `${prefix}_illness`,
      category,
      label: `${parentLabel}の疾病・障害の状況は？`,
      inputType: 'radio',
      options: illnessOptions(prefix),
    },
    {
      id: `${prefix}_care`,
      category,
      label: `${parentLabel}の介護・看護の状況は？`,
      inputType: 'radio',
      options: careOptions(prefix),
    },
    {
      id: `${prefix}_disaster`,
      category,
      label: `${parentLabel}：災害復旧にあたっていますか？`,
      inputType: 'radio',
      options: disasterOptions(prefix),
    },
    {
      id: `${prefix}_abuse`,
      category,
      label: `${parentLabel}：家庭内暴力や虐待の恐れがありますか？`,
      inputType: 'radio',
      options: abuseOptions(prefix),
    },
    {
      id: `${prefix}_parental_leave`,
      category,
      label: `${parentLabel}は育児休業中で継続利用が必要ですか？`,
      inputType: 'radio',
      options: parentalLeaveOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// 調整点数（世帯）／（父母の状況）
const adjustmentQuestions: Question[] = [
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護受給世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_0', points: 0 },
      { label: 'はい（+10）', value: 'adj_welfare_1', points: 10 },
    ],
  },
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親世帯ですか？',
    helpText: '父子・母子世帯。離婚調停中（同居している場合を除き、事実確認ができる書類の提出がある場合）を含みます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_0', points: 0 },
      { label: 'はい（+8）', value: 'adj_single_parent_1', points: 8 },
    ],
  },
  {
    id: 'adj_grandparent',
    category: 'adjustment',
    label: '保育ができない事由を持たない65歳未満の同居祖父母がいますか？',
    helpText: '世帯が別でも、同一住所地または同一敷地内の別建物に居住であれば同居とみなします',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_grandparent_0', points: 0 },
      { label: 'はい（−5）', value: 'adj_grandparent_1', points: -5 },
    ],
  },
  {
    id: 'adj_abuse',
    category: 'adjustment',
    label: '虐待や家庭内暴力の恐れがあると認められ、社会的養護が必要ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_abuse_0', points: 0 },
      { label: 'はい（+10）', value: 'adj_abuse_1', points: 10 },
    ],
  },
  {
    id: 'adj_unemployed',
    category: 'adjustment',
    label: '世帯主または生計中心者の失業により、就労の必要性が高いと認められますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unemployed_0', points: 0 },
      { label: 'はい（+2）', value: 'adj_unemployed_1', points: 2 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: '保育施設に入所中の兄弟・姉妹がいますか？',
    helpText: '新規入所申込みの場合のみが対象です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_0', points: 0 },
      { label: 'はい（+1）', value: 'adj_sibling_1', points: 1 },
    ],
  },
  {
    id: 'adj_multiple_birth',
    category: 'adjustment',
    label: '多胎児が同時に申し込みますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_multiple_birth_0', points: 0 },
      { label: '3つ子以上（+1）', value: 'adj_multiple_birth_1', points: 1 },
      { label: '双子（+0.5）', value: 'adj_multiple_birth_2', points: 0.5 },
    ],
  },
  {
    id: 'adj_childcare_now',
    category: 'adjustment',
    label: '申込児童は今どのように保育されていますか？',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_childcare_now_0', points: 0 },
      { label: '認可外保育施設等に有償で保育されていることを常態（+1）', value: 'adj_childcare_now_1', points: 1 },
      { label: '幼稚園・認定こども園の幼稚園部分に預けていることを常態（申請時点で滑川町に在住）（+1）', value: 'adj_childcare_now_2', points: 1 },
    ],
  },
  {
    id: 'adj_child_disability',
    category: 'adjustment',
    label: '児童が障害を有していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_child_disability_0', points: 0 },
      { label: 'はい（+1）', value: 'adj_child_disability_1', points: 1 },
    ],
  },
  {
    id: 'adj_graduate',
    category: 'adjustment',
    label: '地域型保育給付施設を卒園予定ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_graduate_0', points: 0 },
      { label: 'はい（+3）', value: 'adj_graduate_1', points: 3 },
    ],
  },
  {
    id: 'adj_declined',
    category: 'adjustment',
    label: '同一年度内に保育所等への入所を辞退しましたか？',
    helpText: '町長がやむを得ない事由があると認めた場合を除きます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_declined_0', points: 0 },
      { label: 'はい（−0.5）', value: 'adj_declined_1', points: -0.5 },
    ],
  },
  {
    id: 'adj_leave_return',
    category: 'adjustment',
    label: '育児休業を取得しており、児童の入所に合わせて就労先への復帰を予定していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_leave_return_0', points: 0 },
      { label: 'はい（+1）', value: 'adj_leave_return_1', points: 1 },
    ],
  },
  {
    id: 'adj_fee_delinquent',
    category: 'adjustment',
    label: '正当な理由が無く同一世帯の保育料を滞納していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_fee_delinquent_0', points: 0 },
      { label: '6か月以上（−10）', value: 'adj_fee_delinquent_1', points: -10 },
      { label: '3か月以上（−5）', value: 'adj_fee_delinquent_2', points: -5 },
    ],
  },
  {
    id: 'adj_waiting',
    category: 'adjustment',
    label: '保育所入所申込みを行い、1年以上待機児童となっていますか？',
    helpText: '転所および入所辞退した場合は除きます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_waiting_0', points: 0 },
      { label: 'はい（+1）', value: 'adj_waiting_1', points: 1 },
    ],
  },
  {
    id: 'adj_other',
    category: 'adjustment',
    label: '児童福祉等の観点から特に調整が必要とされますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_other_0', points: 0 },
      { label: 'はい（+10）', value: 'adj_other_1', points: 10 },
    ],
  },
  {
    id: 'adj_disease',
    category: 'adjustment',
    label: '指定難病ですか？',
    helpText: '父母それぞれの点数に対して加算されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_disease_0', points: 0 },
      { label: '1人が該当（+1）', value: 'adj_disease_1', points: 1 },
      { label: '2人が該当（+2）', value: 'adj_disease_2', points: 2 },
    ],
  },
];

export const namegawaData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
