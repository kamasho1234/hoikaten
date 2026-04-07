import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 倉敷市 保育園入園 基礎点数・調整点数データ
// 出典: 倉敷市「令和8年度 子どものための教育・保育給付認定申請
//       及び特定教育・保育施設等利用申込み案内」
//       基本指数表（表1）・調整指数表（表2）
// ---------------------------------------------------------------------------

const municipality = {
  id: 'kurashiki',
  name: '倉敷市',
  slug: 'kurashiki',
  prefecture: '岡山県',
  maxBasePoints: 20, // 父母各10点
} as const;

// ---------------------------------------------------------------------------
// 保育が必要な理由ごとの選択肢テンプレート（父母各最大10点）
// ---------------------------------------------------------------------------

/** 就労（外勤・自営） */
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月160時間以上の就労', value: `${prefix}_employment_10`, points: 10 },
  { label: '月120時間以上の就労', value: `${prefix}_employment_8`, points: 8 },
  { label: '月80時間以上の就労', value: `${prefix}_employment_6`, points: 6 },
  { label: '月48時間以上の就労', value: `${prefix}_employment_4`, points: 4 },
];

/** 農業（家族従業者） */
const farmingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_farming_none`, points: 0 },
  { label: '月160時間以上', value: `${prefix}_farming_8`, points: 8 },
  { label: '月120時間以上', value: `${prefix}_farming_6`, points: 6 },
  { label: '月80時間以上', value: `${prefix}_farming_4`, points: 4 },
  { label: '月48時間以上', value: `${prefix}_farming_2`, points: 2 },
];

/** 内職 */
const homeworkOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_homework_none`, points: 0 },
  { label: '月120時間以上', value: `${prefix}_homework_5`, points: 5 },
  { label: '月80時間以上', value: `${prefix}_homework_3`, points: 3 },
  { label: '月48時間以上', value: `${prefix}_homework_2`, points: 2 },
];

/** 疾病 */
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '1か月以上の入院・常時病臥', value: `${prefix}_illness_10`, points: 10 },
  { label: '安静が必要（家庭で保育困難と診断）', value: `${prefix}_illness_7`, points: 7 },
  { label: '週3回以上の通院治療が必要', value: `${prefix}_illness_4`, points: 4 },
];

/** 障害 */
const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '重度（身体1・2級、精神1・2級、療育A、要介護3〜5）', value: `${prefix}_disability_10`, points: 10 },
  { label: '中度（身体3級、精神3級、療育B、要介護1・2）', value: `${prefix}_disability_7`, points: 7 },
];

/** 介護 */
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '同居親族の介護（身体1・2級等または要介護3〜5）で在宅・施設付添', value: `${prefix}_care_5`, points: 5 },
];

/** 出産 */
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産前後（出産予定日の8週前〜出産後8週）', value: `${prefix}_childbirth_4`, points: 4 },
];

/** 災害復旧 */
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '震災等による家屋の損壊等の復旧のため', value: `${prefix}_disaster_10`, points: 10 },
];

/** 求職活動 */
const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動を継続的に行っている', value: `${prefix}_jobseeking_1`, points: 1 },
];

/** 就学 */
const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '職業訓練・大学等に通学中', value: `${prefix}_education_5`, points: 5 },
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
      { label: '仕事をしている（外勤・自営）', value: `${prefix}_reason_employment`, points: 0 },
      { label: '農業の家族従業者', value: `${prefix}_reason_farming`, points: 0 },
      { label: '内職をしている', value: `${prefix}_reason_homework`, points: 0 },
      { label: '病気の治療中', value: `${prefix}_reason_illness`, points: 0 },
      { label: '障害がある', value: `${prefix}_reason_disability`, points: 0 },
      { label: '家族の介護をしている', value: `${prefix}_reason_care`, points: 0 },
      { label: '出産の前後', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '災害復旧', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '仕事を探している', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '学校に通っている', value: `${prefix}_reason_education`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}はどのくらい働いていますか？（外勤・自営）`,
      helpText: '月あたりの就労時間を選んでください',
      inputType: 'radio',
      options: employmentOptions(prefix),
    },
    {
      id: `${prefix}_farming`,
      category,
      label: `${parentLabel}の農業従事の状況は？`,
      helpText: '農業の家族従業者としての月あたり就労時間を選んでください',
      inputType: 'radio',
      options: farmingOptions(prefix),
    },
    {
      id: `${prefix}_homework`,
      category,
      label: `${parentLabel}の内職の状況は？`,
      helpText: '月あたりの就労時間を選んでください',
      inputType: 'radio',
      options: homeworkOptions(prefix),
    },
    {
      id: `${prefix}_illness`,
      category,
      label: `${parentLabel}の病気の状況は？`,
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
      label: `${parentLabel}は同居親族を介護していますか？`,
      helpText: '対象は身体障害者手帳1・2級等または要介護3〜5の親族',
      inputType: 'radio',
      options: careOptions(prefix),
    },
    {
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}の出産時期は？`,
      inputType: 'radio',
      options: childbirthOptions(prefix),
    },
    {
      id: `${prefix}_disaster`,
      category,
      label: `${parentLabel}は災害復旧中ですか？`,
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
      label: `${parentLabel}は学校に通っていますか？`,
      helpText: '職業訓練校・大学等への通学が対象です',
      inputType: 'radio',
      options: educationOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// ---------------------------------------------------------------------------
// 調整点数の質問（表2）
// ---------------------------------------------------------------------------

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親ですか？',
    helpText: '子どもを一方の親のみで養育している場合',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい', value: 'adj_single_parent_yes', points: 1 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護を受けていますか？',
    helpText: '就労による経済的自立が必要な場合',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい', value: 'adj_welfare_yes', points: 1 },
    ],
  },
  {
    id: 'adj_breadwinner_death',
    category: 'adjustment',
    label: '主たる生計者が亡くなりましたか？',
    helpText: '主たる生計者の死亡により就労の必要性がある場合',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_breadwinner_death_no', points: 0 },
      { label: 'はい', value: 'adj_breadwinner_death_yes', points: 1 },
    ],
  },
  {
    id: 'adj_child_disability',
    category: 'adjustment',
    label: 'お子さんは障害者手帳または療育手帳をお持ちですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_child_disability_no', points: 0 },
      { label: 'はい', value: 'adj_child_disability_yes', points: 1 },
    ],
  },
  {
    id: 'adj_relocation',
    category: 'adjustment',
    label: '転居に伴う保育園の利用を希望していますか？',
    helpText: '転入先の住所を利用して保育園を申し込む場合',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_relocation_no', points: 0 },
      { label: 'はい', value: 'adj_relocation_yes', points: 3 },
    ],
  },
  {
    id: 'adj_multi_child',
    category: 'adjustment',
    label: '小学校就学前の子どもを3人以上育てていますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_multi_child_no', points: 0 },
      { label: 'はい', value: 'adj_multi_child_yes', points: 1 },
    ],
  },
  {
    id: 'adj_transfer',
    category: 'adjustment',
    label: '利用中の保育園から転園を希望していますか？',
    helpText: '認可保育園・認定こども園等からの転園の場合',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_transfer_no', points: 0 },
      { label: 'はい', value: 'adj_transfer_yes', points: 3 },
    ],
  },
  {
    id: 'adj_nursery_teacher',
    category: 'adjustment',
    label: '保護者は保育士として勤務していますか？',
    helpText: '保育士資格を持ち、倉敷市内の保育園で保育に従事する場合',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_nursery_teacher_no', points: 0 },
      { label: 'はい（月160時間以上の就労）', value: 'adj_nursery_teacher_3', points: 3 },
      { label: 'はい（月160時間未満の就労）', value: 'adj_nursery_teacher_1', points: 1 },
    ],
  },
];

// ---------------------------------------------------------------------------
// エクスポート
// ---------------------------------------------------------------------------

export const kurashikiData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
