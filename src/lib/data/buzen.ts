import type { MunicipalityData, Question } from '../types';

// -------------------------------------------------------------------------
// 豊前市 保育園入園 利用調整基準データ
// 出典: 豊前市「利用調整基準表」
// https://www.city.buzen.lg.jp/kosodate/documents/riyotyosei2.pdf
// -------------------------------------------------------------------------
// 豊前市は原典に手順が書かれている。
//   選考基準「『1. 基本点数表』と『2. 調整点数表』により点数を算出し、
//            その合計点数により優先順位を決定する。」
//   1 基本点数表の考え方
//     ・父と母の基本点数を比較して、低い点数の保護者で算定する。
//     ・該当する項目が複数ある場合は、最も点数の高い項目で算定する。
//   2 調整点数表の考え方
//     ・該当する項目が複数ある場合は、それぞれの点数を加点する。
// 「低い点数の保護者で算定する」により scoringMethod は 'min'。
// 基本点数の最大は90点。
//
// 原典で点数の代わりに「最優先」と書かれている項目は、
// 点数ではなく扱いを決める言葉なので選択肢にしていない。
// - ⑦災害復旧「災害により自宅や近隣の復旧にあたっている」
// - ⑨虐待・DV「虐待・DVのおそれがあること」
//
// 「市外在住」（▲30）は住まいで決まるもの、
// 「小規模保育等からの転園」（+15）はいま園を利用している方の話なので入れていない。
// -------------------------------------------------------------------------

const municipality = {
  id: 'buzen',
  name: '豊前市',
  slug: 'buzen',
  prefecture: '福岡県',
  maxBasePoints: 90,
  scoringMethod: 'min',
} as const;

// ①家庭外就労 ／ ②家庭内就労
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '家庭外就労：1か月の勤務等が160時間以上', value: `${prefix}_employment_0`, points: 90 },
  { label: '家庭外就労：1か月の勤務等が120時間以上160時間未満', value: `${prefix}_employment_1`, points: 80 },
  { label: '家庭内就労：1か月の自営等が160時間以上', value: `${prefix}_employment_2`, points: 80 },
  { label: '家庭内就労：1か月の自営等が120時間以上160時間未満', value: `${prefix}_employment_3`, points: 70 },
  { label: '家庭外就労：1か月の勤務等が60時間以上120時間未満', value: `${prefix}_employment_4`, points: 60 },
  { label: '家庭内就労：1か月の自営等が60時間以上120時間未満', value: `${prefix}_employment_5`, points: 50 },
];

// ③同居親族の看護・介護
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '1か月120時間以上の看護・介護', value: `${prefix}_care_0`, points: 60 },
  { label: '1か月60時間以上120時間未満の看護・介護', value: `${prefix}_care_1`, points: 40 },
];

// ④保護者の疾病・障害
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院を要する', value: `${prefix}_illness_0`, points: 90 },
  { label: '身障手帳1〜2級、療育手帳A、精神手帳1級', value: `${prefix}_illness_1`, points: 80 },
  { label: '上記以外の障害者手帳所持・疾病', value: `${prefix}_illness_2`, points: 60 },
];

// ⑤妊娠・出産
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '産前6週〜産後8週', value: `${prefix}_childbirth_0`, points: 80 },
];

// ⑥就学
const schoolOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_school_none`, points: 0 },
  { label: '1か月の就学が120時間以上', value: `${prefix}_school_0`, points: 80 },
  { label: '1か月の就学が60時間以上120時間未満', value: `${prefix}_school_1`, points: 60 },
];

// ⑧求職活動
const jobseekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動（起業準備を含む）', value: `${prefix}_jobseeking_0`, points: 30 },
];

// ⑩育児休業 ／ ⑪その他
const parentalLeaveOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_parental_leave_none`, points: 0 },
  { label: '特別に市長が認める場合', value: `${prefix}_parental_leave_0`, points: 90 },
  { label: '育児休業取得時の継続利用', value: `${prefix}_parental_leave_1`, points: 50 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: '豊前市は父と母の基本点数を比較して、低い点数の保護者で算定します。複数該当する場合は最も点数の高い項目で算定します',
    inputType: 'select',
    options: [
      { label: '就労（家庭外・家庭内）', value: `${prefix}_reason_employment`, points: 0 },
      { label: '同居親族の看護・介護', value: `${prefix}_reason_care`, points: 0 },
      { label: '保護者の疾病・障害', value: `${prefix}_reason_illness`, points: 0 },
      { label: '妊娠・出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '就学', value: `${prefix}_reason_school`, points: 0 },
      { label: '求職活動', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '育児休業・その他', value: `${prefix}_reason_parental_leave`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の就労の状況は？`,
      inputType: 'radio',
      options: employmentOptions(prefix),
    },
    {
      id: `${prefix}_care`,
      category,
      label: `${parentLabel}の看護・介護の状況は？`,
      inputType: 'radio',
      options: careOptions(prefix),
    },
    {
      id: `${prefix}_illness`,
      category,
      label: `${parentLabel}の疾病・障害の状況は？`,
      inputType: 'radio',
      options: illnessOptions(prefix),
    },
    {
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}の妊娠・出産の状況は？`,
      inputType: 'radio',
      options: childbirthOptions(prefix),
    },
    {
      id: `${prefix}_school`,
      category,
      label: `${parentLabel}の就学の状況は？`,
      inputType: 'radio',
      options: schoolOptions(prefix),
    },
    {
      id: `${prefix}_jobseeking`,
      category,
      label: `${parentLabel}は求職活動をしていますか？`,
      inputType: 'radio',
      options: jobseekingOptions(prefix),
    },
    {
      id: `${prefix}_parental_leave`,
      category,
      label: `${parentLabel}：育児休業・その他の事情は？`,
      inputType: 'radio',
      options: parentalLeaveOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// 2. 調整点数表（該当する項目が複数ある場合は、それぞれの点数を加点する）
const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_0', points: 0 },
      { label: 'はい（+25）', value: 'adj_single_parent_1', points: 25 },
    ],
  },
  {
    id: 'adj_child_disability',
    category: 'adjustment',
    label: '児童に障害がありますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_child_disability_0', points: 0 },
      { label: 'はい（+20）', value: 'adj_child_disability_1', points: 20 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: '兄弟同時入所ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_0', points: 0 },
      { label: 'はい（+15）', value: 'adj_sibling_1', points: 15 },
    ],
  },
  {
    id: 'adj_leave_return',
    category: 'adjustment',
    label: '育児休業明けですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_leave_return_0', points: 0 },
      { label: 'はい（+15）', value: 'adj_leave_return_1', points: 15 },
    ],
  },
  {
    id: 'adj_unemployed',
    category: 'adjustment',
    label: '生計中心者が求職活動中ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unemployed_0', points: 0 },
      { label: 'はい（+15）', value: 'adj_unemployed_1', points: 15 },
    ],
  },
  {
    id: 'adj_oldest_class',
    category: 'adjustment',
    label: '児童が年長児ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_oldest_class_0', points: 0 },
      { label: 'はい（+10）', value: 'adj_oldest_class_1', points: 10 },
    ],
  },
  {
    id: 'adj_many_children',
    category: 'adjustment',
    label: '多子世帯（3名以上）ですか？',
    helpText: '兄弟同時入所の場合は重複できません',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_many_children_0', points: 0 },
      { label: 'はい（+10）', value: 'adj_many_children_1', points: 10 },
    ],
  },
  {
    id: 'adj_moving_in',
    category: 'adjustment',
    label: '転入し市内保育所へ申込みますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_moving_in_0', points: 0 },
      { label: 'はい（+10）', value: 'adj_moving_in_1', points: 10 },
    ],
  },
  {
    id: 'adj_nursery_staff',
    category: 'adjustment',
    label: '市内で保育士として勤務していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_nursery_staff_0', points: 0 },
      { label: 'はい（+10）', value: 'adj_nursery_staff_1', points: 10 },
    ],
  },
  {
    id: 'adj_care_level',
    category: 'adjustment',
    label: '同居親族の要介護度は？',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_care_level_0', points: 0 },
      { label: '要介護3〜5（+10）', value: 'adj_care_level_1', points: 10 },
      { label: '要介護1〜2（+5）', value: 'adj_care_level_2', points: 5 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯ですか？',
    helpText: 'ひとり親世帯の場合は重複できません',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_0', points: 0 },
      { label: 'はい（+10）', value: 'adj_welfare_1', points: 10 },
    ],
  },
  {
    id: 'adj_tanshin',
    category: 'adjustment',
    label: '保護者が単身赴任中ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_tanshin_0', points: 0 },
      { label: 'はい（+5）', value: 'adj_tanshin_1', points: 5 },
    ],
  },
  {
    id: 'adj_grandparent',
    category: 'adjustment',
    label: '同居親族（65歳未満）が保育可能ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_grandparent_0', points: 0 },
      { label: 'はい（−15）', value: 'adj_grandparent_1', points: -15 },
    ],
  },
];

export const buzenData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
