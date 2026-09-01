import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 土岐市 保育園入園 利用調整基準データ
// 出典: 土岐市「令和9年度 こども園等入園申込案内」内「こども園等入園基準指数表」
// https://www.city.toki.lg.jp/_res/projects/default_project/_page_/001/007/072/r9nyuenmoshikomiannai.pdf
// ---------------------------------------------------------------------------
// 土岐市は「1. 基準指数（父母それぞれ）＋ 2. 調整指数」の加算方式。
// ---------------------------------------------------------------------------
// 「育休延長の許容」は減点ではなく「合計指数を0点とする」と定められているため、
// 当サイトでは点数を置かず、選択肢にしていない（注記のみ）。
// 指数表では妊娠・出産が母の欄にだけ書かれているが、当サイトは保護者1・保護者2を
// 性別で分けていないため、どちらの保護者でも選べるようにしている。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'toki',
  name: '土岐市',
  slug: 'toki',
  prefecture: '岐阜県',
  maxBasePoints: 20,
} as const;

const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '外勤・内勤・自営代表者・月150時間以上', value: `${prefix}_employment_10`, points: 10 },
  { label: '外勤・内勤・自営代表者・月120時間以上', value: `${prefix}_employment_8`, points: 8 },
  { label: '外勤・内勤・自営代表者・月80時間以上', value: `${prefix}_employment_6`, points: 6 },
  { label: '外勤・内勤・自営代表者・月60時間以上', value: `${prefix}_employment_4`, points: 4 },
  { label: '自営業専従者・内職・月150時間以上', value: `${prefix}_selfsub_8`, points: 8 },
  { label: '自営業専従者・内職・月120時間以上', value: `${prefix}_selfsub_6`, points: 6 },
  { label: '自営業専従者・内職・月80時間以上', value: `${prefix}_selfsub_4`, points: 4 },
  { label: '自営業専従者・内職・月60時間以上', value: `${prefix}_selfsub_3`, points: 3 },
];

const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産の前6週・後8週の間', value: `${prefix}_childbirth_10`, points: 10 },
];

const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '長期の入院による療養', value: `${prefix}_illness_10`, points: 10 },
  { label: '常時臥床で長期加療を要すると診断', value: `${prefix}_illness_10b`, points: 10 },
  { label: '精神疾患で長期加療を要すると診断', value: `${prefix}_illness_8`, points: 8 },
  { label: '比較的軽症だが定期的な通院を要する', value: `${prefix}_illness_4`, points: 4 },
];

const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '1級またはA1・A2', value: `${prefix}_disability_10`, points: 10 },
  { label: '2級またはB1', value: `${prefix}_disability_8`, points: 8 },
  { label: '3級またはB2', value: `${prefix}_disability_6`, points: 6 },
];

const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '長期の入院の付き添い', value: `${prefix}_care_8`, points: 8 },
  { label: '同居親族が寝たきりで日常生活全般の看護等', value: `${prefix}_care_7`, points: 7 },
  { label: '食事・排泄・通院など一部の看護等', value: `${prefix}_care_5`, points: 5 },
];

const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '火災・風水害等で家屋が失われ復旧にあたる', value: `${prefix}_disaster_10`, points: 10 },
];

const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '就労先は未定だが求職活動中', value: `${prefix}_jobseeking_2`, points: 2 },
];

const schoolOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_school_none`, points: 0 },
  { label: '大学・職業訓練学校等で月120時間以上の就学', value: `${prefix}_school_8`, points: 8 },
  { label: '大学・職業訓練学校等で月60時間以上の就学', value: `${prefix}_school_4`, points: 4 },
];

const abuseOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_abuse_none`, points: 0 },
  { label: '児童虐待またはDVのおそれがあると認められる', value: `${prefix}_abuse_20`, points: 20 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: '土岐市は父母それぞれの基準指数を合計し、調整指数を加減して選考します',
    inputType: 'select',
    options: [
      { label: '就労している', value: `${prefix}_reason_employment`, points: 0 },
      { label: '妊娠・出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '疾病', value: `${prefix}_reason_illness`, points: 0 },
      { label: '障がい', value: `${prefix}_reason_disability`, points: 0 },
      { label: '病人の看護等', value: `${prefix}_reason_care`, points: 0 },
      { label: '家庭の災害', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '求職活動', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '就学', value: `${prefix}_reason_school`, points: 0 },
      { label: '虐待・DVのおそれ', value: `${prefix}_reason_abuse`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    { id: `${prefix}_employment`, category, label: `${parentLabel}の就労の状況は？`, inputType: 'radio', options: employmentOptions(prefix) },
    { id: `${prefix}_childbirth`, category, label: `${parentLabel}の妊娠・出産の状況は？`, inputType: 'radio', options: childbirthOptions(prefix) },
    { id: `${prefix}_illness`, category, label: `${parentLabel}の疾病の状況は？`, inputType: 'radio', options: illnessOptions(prefix) },
    { id: `${prefix}_disability`, category, label: `${parentLabel}の障がいの程度は？`, inputType: 'radio', options: disabilityOptions(prefix) },
    { id: `${prefix}_care`, category, label: `${parentLabel}の看護等の状況は？`, inputType: 'radio', options: careOptions(prefix) },
    { id: `${prefix}_disaster`, category, label: `${parentLabel}は家庭の災害の復旧にあたっていますか？`, inputType: 'radio', options: disasterOptions(prefix) },
    { id: `${prefix}_jobseeking`, category, label: `${parentLabel}は求職活動をしていますか？`, inputType: 'radio', options: jobSeekingOptions(prefix) },
    { id: `${prefix}_school`, category, label: `${parentLabel}の就学の状況は？`, inputType: 'radio', options: schoolOptions(prefix) },
    { id: `${prefix}_abuse`, category, label: `${parentLabel}：虐待・DVのおそれがありますか？`, inputType: 'radio', options: abuseOptions(prefix) },
  ];

  return [reasonQuestion, ...detailQuestions];
}

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親世帯ですか？（死別・離婚・行方不明等）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい（+15）', value: 'adj_single_parent_yes', points: 15 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護法による被保護世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい（+3）', value: 'adj_welfare_yes', points: 3 },
    ],
  },
  {
    id: 'adj_unemployed',
    category: 'adjustment',
    label: '生計の中心者が失業等で就労の必要性が高いですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unemployed_no', points: 0 },
      { label: 'はい（+3）', value: 'adj_unemployed_yes', points: 3 },
    ],
  },
  {
    id: 'adj_child_disability',
    category: 'adjustment',
    label: '入園する児童が身体障害者手帳・精神保健福祉手帳・療育手帳を持っていますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_child_disability_no', points: 0 },
      { label: 'はい（+3）', value: 'adj_child_disability_yes', points: 3 },
    ],
  },
  {
    id: 'adj_sibling_together',
    category: 'adjustment',
    label: 'きょうだいで同じ園に同時に申し込みますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_together_no', points: 0 },
      { label: 'はい（+3）', value: 'adj_sibling_together_yes', points: 3 },
    ],
  },
  {
    id: 'adj_parental_leave',
    category: 'adjustment',
    label: '育休前にこども園等に入園しており、育休終了後に同じ園に入園しますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_parental_leave_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_parental_leave_yes', points: 2 },
    ],
  },
  {
    id: 'adj_promotion',
    category: 'adjustment',
    label: '現在こども園等を利用しており、進級しますか？',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_promotion_none', points: 0 },
      { label: '同一園で進級（+2）', value: 'adj_promotion_same', points: 2 },
      { label: '上記以外（+1）', value: 'adj_promotion_other', points: 1 },
    ],
  },
  {
    id: 'adj_graduate',
    category: 'adjustment',
    label: '地域型保育事業所等の年齢制限がある園を卒園し、他のこども園等へ入園しますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_graduate_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_graduate_yes', points: 1 },
    ],
  },
  {
    id: 'adj_fee_delinquent',
    category: 'adjustment',
    label: '正当な理由なく保育料を滞納していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_fee_delinquent_no', points: 0 },
      { label: 'はい（-10）', value: 'adj_fee_delinquent_yes', points: -10 },
    ],
  },
  {
    id: 'adj_hoikushi',
    category: 'adjustment',
    label: '市内で保育士・幼稚園教諭として就労（予定を含む）していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_hoikushi_no', points: 0 },
      { label: 'はい（+4）', value: 'adj_hoikushi_yes', points: 4 },
    ],
  },
  {
    id: 'adj_area',
    category: 'adjustment',
    label: '住所地の学校区にあるこども園等に申し込みますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_area_no', points: 0 },
      { label: 'はい（+3）', value: 'adj_area_yes', points: 3 },
    ],
  },
];

export const tokiData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
