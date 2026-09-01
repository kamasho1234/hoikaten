import type { MunicipalityData, Question } from '../types';

// -------------------------------------------------------------------------
// 蟹江町 保育園入園 利用調整基準データ
// 出典: 蟹江町「保育所等入所基準指数表」
// https://www.town.kanie.aichi.jp/uploaded/attachment/22496.pdf
// -------------------------------------------------------------------------
// 蟹江町は「入所基準指数（父母それぞれ）＋調整基準」で入所を決める。
// 指数が同じ場合は、基準表に付いている優先順位（1が最上位）で調整される。
// 「前各号に類する状態であると町長が認める場合」は類似する指数を用いると定められており、
// 点数が固定されていないため選択肢にしていない。
// 指数表では出産の入院が「母親が概ね1か月以上入院」と書かれているが、当サイトは保護者1・保護者2を
// 性別で分けていないため、どちらの保護者でも選べるようにしている。
// 生活保護世帯・ひとり親世帯およびリモートワーク等の居宅内就労は、基準表に「調整指数」とだけ書かれ
// 点数が示されていないため、選択肢にしていない。
// -------------------------------------------------------------------------

const municipality = {
  id: 'kanie',
  name: '蟹江町',
  slug: 'kanie',
  prefecture: '愛知県',
  maxBasePoints: 10,
} as const;

const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '外勤（自営を含む）・月20日以上かつ1日8時間以上（160時間）', value: `${prefix}_employment_0`, points: 10 },
  { label: '外勤（自営を含む）・月20日以上かつ1日7時間以上（140時間）', value: `${prefix}_employment_1`, points: 9 },
  { label: '外勤（自営を含む）・月16日以上かつ1日6時間以上（96時間）', value: `${prefix}_employment_2`, points: 8 },
  { label: '外勤（自営を含む）・月16日以上かつ1日4時間以上（64時間）', value: `${prefix}_employment_3`, points: 7 },
  { label: '自営の家族従事者・月16日以上かつ1日6時間以上（96時間）', value: `${prefix}_employment_4`, points: 8 },
  { label: '自営の家族従事者・月16日以上かつ1日4時間以上（64時間）', value: `${prefix}_employment_5`, points: 7 },
  { label: '農業・月16日以上かつ1日4時間以上（64時間）', value: `${prefix}_employment_6`, points: 6 },
];

const home_workOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_home_work_none`, points: 0 },
  { label: '自営本人・月20日以上かつ1日7時間以上（140時間）', value: `${prefix}_home_work_0`, points: 8 },
  { label: '自営家族・月20日以上かつ1日6時間以上（120時間）', value: `${prefix}_home_work_1`, points: 7 },
  { label: '自営家族・月20日以上かつ1日4時間以上（80時間）', value: `${prefix}_home_work_2`, points: 6 },
  { label: '内職・月20日以上かつ1日7時間以上（140時間）', value: `${prefix}_home_work_3`, points: 6 },
  { label: '内職・月20日以上かつ1日4時間以上（80時間）', value: `${prefix}_home_work_4`, points: 5 },
];

const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産予定日の前後2か月（最長4か月）・多胎の場合', value: `${prefix}_childbirth_0`, points: 9 },
  { label: '出産予定日の前後2か月（最長4か月）', value: `${prefix}_childbirth_1`, points: 8 },
];

const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: 'おおむね1か月以上の入院', value: `${prefix}_illness_0`, points: 10 },
  { label: '疾病のためおおむね1か月以上の常時臥床', value: `${prefix}_illness_1`, points: 9 },
  { label: '医師が長期加療（安静）を要すると診断', value: `${prefix}_illness_2`, points: 8 },
  { label: '医師がおおむね1か月以上の加療（安静）を要すると診断', value: `${prefix}_illness_3`, points: 7 },
  { label: '比較的軽症だが定期的な通院等を要する', value: `${prefix}_illness_4`, points: 4 },
];

const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '身体1・2級 / 精神1級 / 療育A', value: `${prefix}_disability_0`, points: 9 },
  { label: '身体3・4級 / 精神2級 / 療育B', value: `${prefix}_disability_1`, points: 6 },
  { label: '身体5・6級 / 精神3級 / 療育C', value: `${prefix}_disability_2`, points: 4 },
];

const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: 'おおむね1か月以上の親族の入院付添', value: `${prefix}_care_0`, points: 9 },
  { label: '心身障害児者の介護・通園・通院・通学等', value: `${prefix}_care_1`, points: 8 },
  { label: '同居の祖父母等、寝たきり老人の常時介護', value: `${prefix}_care_2`, points: 8 },
  { label: '同居家族の長期居宅内療養等の介護', value: `${prefix}_care_3`, points: 6 },
  { label: '上記以外の介護または看護', value: `${prefix}_care_4`, points: 5 },
];

const parental_leaveOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_parental_leave_none`, points: 0 },
  { label: '当該年度中に復帰する（月20日以上かつ1日8時間以上に相当）', value: `${prefix}_parental_leave_0`, points: 10 },
  { label: '当該年度中に復帰する（月20日以上かつ1日7時間以上に相当）', value: `${prefix}_parental_leave_1`, points: 9 },
  { label: '当該年度中に復帰する（月16日以上かつ1日6時間以上に相当）', value: `${prefix}_parental_leave_2`, points: 8 },
  { label: '翌年度以降に復帰する（月20日以上かつ1日8時間以上に相当・-2）', value: `${prefix}_parental_leave_3`, points: 8 },
  { label: '翌年度以降に復帰する（月20日以上かつ1日7時間以上に相当・-2）', value: `${prefix}_parental_leave_4`, points: 7 },
  { label: '翌年度以降に復帰する（月16日以上かつ1日6時間以上に相当・-2）', value: `${prefix}_parental_leave_5`, points: 6 },
];

const jobseekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '就職活動中である', value: `${prefix}_jobseeking_0`, points: 4 },
];

const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '火災・風水害・震災等で災害復旧にあたる', value: `${prefix}_disaster_0`, points: 10 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: '蟹江町は父母それぞれの入所基準指数に、世帯の調整基準を加減して入所を決めます',
    inputType: 'select',
    options: [
      { label: '居宅外労働（外勤・自営）', value: `${prefix}_reason_employment`, points: 0 },
      { label: '居宅内労働（自営・内職）', value: `${prefix}_reason_home_work`, points: 0 },
      { label: '出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '疾病', value: `${prefix}_reason_illness`, points: 0 },
      { label: '障害', value: `${prefix}_reason_disability`, points: 0 },
      { label: '介護・看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '育児休業中（3歳児以上に限る）', value: `${prefix}_reason_parental_leave`, points: 0 },
      { label: '求職中', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '家庭の災害', value: `${prefix}_reason_disaster`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の居宅外労働の状況は？`,
      inputType: 'radio',
      options: employmentOptions(prefix),
    },
    {
      id: `${prefix}_home_work`,
      category,
      label: `${parentLabel}の居宅内労働の状況は？`,
      inputType: 'radio',
      options: home_workOptions(prefix),
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
      label: `${parentLabel}の疾病の状況は？`,
      inputType: 'radio',
      options: illnessOptions(prefix),
    },
    {
      id: `${prefix}_disability`,
      category,
      label: `${parentLabel}の障害の程度は？`,
      inputType: 'radio',
      options: disabilityOptions(prefix),
    },
    {
      id: `${prefix}_care`,
      category,
      label: `${parentLabel}の介護・看護の状況は？`,
      inputType: 'radio',
      options: careOptions(prefix),
    },
    {
      id: `${prefix}_parental_leave`,
      category,
      label: `${parentLabel}の育児休業の状況は？`,
      helpText: '育休中は居宅外労働の指数と同等（翌年度以降の復帰は-2）と定められています',
      inputType: 'radio',
      options: parental_leaveOptions(prefix),
    },
    {
      id: `${prefix}_jobseeking`,
      category,
      label: `${parentLabel}は就職活動中ですか？`,
      inputType: 'radio',
      options: jobseekingOptions(prefix),
    },
    {
      id: `${prefix}_disaster`,
      category,
      label: `${parentLabel}は災害の復旧にあたっていますか？`,
      inputType: 'radio',
      options: disasterOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_sibling_together',
    category: 'adjustment',
    label: '既に入所中のきょうだいが継続利用し、2人以上の同時入所となりますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_together_0', points: 0 },
      { label: 'はい（+1）', value: 'adj_sibling_together_1', points: 1 },
    ],
  },
  {
    id: 'adj_fee_delinquent',
    category: 'adjustment',
    label: 'きょうだいが在園児または卒園児で、選考段階で保育料等の滞納がありますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_fee_delinquent_0', points: 0 },
      { label: 'はい（-1）', value: 'adj_fee_delinquent_1', points: -1 },
    ],
  },
];

export const kanieData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
