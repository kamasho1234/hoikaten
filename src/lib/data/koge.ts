import type { MunicipalityData, Question } from '../types';

// -------------------------------------------------------------------------
// 上毛町 保育園入園 利用調整基準データ
// 出典: 上毛町「利用調整基準表」
// https://www.town.koge.lg.jp/material/files/group/18/riyoutyouseikijyun.pdf
// -------------------------------------------------------------------------
// 上毛町は原典に手順が書かれている。
//   選考基準「保育の必要性の事由やそれに要する時間等に応じた『1. 基本点数表』
//            世帯や児童の状況等に応じた『2. 調整点数表』により点数を算出し、
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
// ⑪その他「特別に町長が認める場合」（90）も、該当するかが町の判断によるため入れていない。
//
// ⑩育児休業「育児休業取得時の継続利用」（50）と
// 調整点数の「小規模保育等からの転園」（+15）は、
// いま園を利用している方の話なので入れていない。
//
// 原典の「※兄弟同時入所の場合は重複不可」「※ひとり親世帯の場合は重複不可」に従い、
// 重ならない組み合わせは1つの設問にまとめている。
// -------------------------------------------------------------------------

const municipality = {
  id: 'koge',
  name: '上毛町',
  slug: 'koge',
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

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: '基本点数は父と母を比べて低い点数の保護者で算定します',
    inputType: 'select',
    options: [
      { label: '就労（家庭外・家庭内）', value: `${prefix}_reason_employment`, points: 0 },
      { label: '同居親族の看護・介護', value: `${prefix}_reason_care`, points: 0 },
      { label: '保護者の疾病・障害', value: `${prefix}_reason_illness`, points: 0 },
      { label: '妊娠・出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '就学', value: `${prefix}_reason_school`, points: 0 },
      { label: '求職活動', value: `${prefix}_reason_jobseeking`, points: 0 },
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
      label: `${parentLabel}の同居親族の看護・介護の状況は？`,
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
  ];

  return [reasonQuestion, ...detailQuestions];
}

// 2. 調整点数表
const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親世帯・生活保護世帯にあてはまりますか？',
    helpText: '原典では生活保護世帯はひとり親世帯と重複しません',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_single_parent_0', points: 0 },
      { label: 'ひとり親世帯（+25）', value: 'adj_single_parent_1', points: 25 },
      { label: '生活保護世帯（+10）', value: 'adj_single_parent_2', points: 10 },
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
    label: '兄弟同時入所・多子世帯にあてはまりますか？',
    helpText: '原典では多子世帯は兄弟同時入所と重複しません',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_sibling_0', points: 0 },
      { label: '兄弟同時入所（+15）', value: 'adj_sibling_1', points: 15 },
      { label: '多子世帯（3名以上）（+10）', value: 'adj_sibling_2', points: 10 },
    ],
  },
  {
    id: 'adj_return_to_work',
    category: 'adjustment',
    label: '育児休業明けですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_return_to_work_0', points: 0 },
      { label: 'はい（+15）', value: 'adj_return_to_work_1', points: 15 },
    ],
  },
  {
    id: 'adj_jobseeking_main',
    category: 'adjustment',
    label: '生計中心者が求職活動をしていますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_jobseeking_main_0', points: 0 },
      { label: 'はい（+15）', value: 'adj_jobseeking_main_1', points: 15 },
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
    id: 'adj_transfer_in',
    category: 'adjustment',
    label: '転入して町内保育所へ入所しますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_transfer_in_0', points: 0 },
      { label: 'はい（+10）', value: 'adj_transfer_in_1', points: 10 },
    ],
  },
  {
    id: 'adj_hoikushi',
    category: 'adjustment',
    label: '町内で保育士として勤務していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_hoikushi_0', points: 0 },
      { label: 'はい（+10）', value: 'adj_hoikushi_1', points: 10 },
    ],
  },
  {
    id: 'adj_family_care',
    category: 'adjustment',
    label: '同居親族に要介護の方がいますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_family_care_0', points: 0 },
      { label: '要介護3〜5（+10）', value: 'adj_family_care_1', points: 10 },
      { label: '要介護1〜2（+5）', value: 'adj_family_care_2', points: 5 },
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
    id: 'adj_outside_town',
    category: 'adjustment',
    label: '町外在住ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_outside_town_0', points: 0 },
      { label: 'はい（−30）', value: 'adj_outside_town_1', points: -30 },
    ],
  },
];

export const kogeData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
