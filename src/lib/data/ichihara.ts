import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 市原市 保育所入所選考指数データ
// 出典: 市原市 利用調整指数表（R6年度審査）
// https://www.city.ichihara.chiba.jp/article?articleId=60237a73ece4651c88c18b1d
// ---------------------------------------------------------------------------
// 市原市は「基本指数（父）＋ 基本指数（母）＋ 調整指数」のsum方式。
// 父母各最大16点。就労は雇用形態（外勤vs内職）×月間時間数で6段階。
// 調整指数①（申請種別）は0〜250点と大きく、選考の主要因子。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'ichihara',
  name: '市原市',
  slug: 'ichihara',
  prefecture: '千葉県',
  maxBasePoints: 32,
} as const;

const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '外勤・自営業・月160時間以上', value: `${prefix}_employment_15`, points: 15 },
  { label: '外勤・自営業・月140〜160時間', value: `${prefix}_employment_14`, points: 14 },
  { label: '外勤・自営業・月120〜140時間', value: `${prefix}_employment_13`, points: 13 },
  { label: '外勤・自営業・月100〜120時間', value: `${prefix}_employment_12`, points: 12 },
  { label: '外勤・自営業・月80〜100時間', value: `${prefix}_employment_11`, points: 11 },
  { label: '外勤・自営業・月60〜80時間', value: `${prefix}_employment_10`, points: 10 },
  { label: '内職・月160時間以上', value: `${prefix}_employment_i11`, points: 11 },
  { label: '内職・月140〜160時間', value: `${prefix}_employment_i10`, points: 10 },
  { label: '内職・月120〜140時間', value: `${prefix}_employment_i9`, points: 9 },
  { label: '内職・月100〜120時間', value: `${prefix}_employment_i8`, points: 8 },
  { label: '内職・月80〜100時間', value: `${prefix}_employment_i7`, points: 7 },
  { label: '内職・月60〜80時間', value: `${prefix}_employment_i6`, points: 6 },
];

const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '疾病入院 / 精神・感染症等の安静加療', value: `${prefix}_illness_16`, points: 16 },
  { label: '常時臥床（おおむね1ヶ月以上）', value: `${prefix}_illness_15`, points: 15 },
  { label: '居宅内療養・通院加療中', value: `${prefix}_illness_12`, points: 12 },
  { label: 'その他の疾病', value: `${prefix}_illness_6`, points: 6 },
];

const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '身体・精神障害者手帳1・2級、療育手帳A・A-1・A-2程度', value: `${prefix}_disability_16`, points: 16 },
  { label: '身体・精神障害者手帳3級、療育手帳B-1程度', value: `${prefix}_disability_15`, points: 15 },
  { label: '身体・精神障害者手帳4級以下、療育手帳B-2程度', value: `${prefix}_disability_14`, points: 14 },
];

const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '入院・施設等の常時付添', value: `${prefix}_care_15`, points: 15 },
  { label: '全看護が必要（手帳1・2級、要介護3〜5程度）', value: `${prefix}_care_11`, points: 11 },
  { label: '一部看護が必要（手帳3・4級、要介護1〜2程度）', value: `${prefix}_care_10`, points: 10 },
  { label: 'その他の看護（手帳5級以下等）', value: `${prefix}_care_9`, points: 9 },
  { label: 'その他', value: `${prefix}_care_6`, points: 6 },
];

const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産月及び前後2月の合計5月間', value: `${prefix}_childbirth_15`, points: 15 },
];

const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '月20日以上通学', value: `${prefix}_education_13`, points: 13 },
  { label: '月15日以上通学', value: `${prefix}_education_11`, points: 11 },
  { label: '上記以外の就学', value: `${prefix}_education_9`, points: 9 },
];

const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職中', value: `${prefix}_jobseeking_3`, points: 3 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: '労働時間には通勤時間・休憩時間を含めて算定されます',
    inputType: 'select',
    options: [
      { label: '仕事をしている（外勤・自営業・内職）', value: `${prefix}_reason_employment`, points: 0 },
      { label: '病気の治療中', value: `${prefix}_reason_illness`, points: 0 },
      { label: '障害がある', value: `${prefix}_reason_disability`, points: 0 },
      { label: '家族の看護・介護', value: `${prefix}_reason_care`, points: 0 },
      { label: '出産の前後', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '学校に通っている', value: `${prefix}_reason_education`, points: 0 },
      { label: '仕事を探している', value: `${prefix}_reason_jobseeking`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の月間就労時間は？`,
      helpText: '通勤時間・休憩時間を含めた時間で選んでください',
      inputType: 'radio',
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
      label: `${parentLabel}の障害の程度は？`,
      inputType: 'radio',
      options: disabilityOptions(prefix),
    },
    {
      id: `${prefix}_care`,
      category,
      label: `${parentLabel}の看護・介護の状況は？`,
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
      id: `${prefix}_education`,
      category,
      label: `${parentLabel}の就学状況は？`,
      inputType: 'radio',
      options: educationOptions(prefix),
    },
    {
      id: `${prefix}_jobseeking`,
      category,
      label: `${parentLabel}は求職活動をしていますか？`,
      inputType: 'radio',
      options: jobSeekingOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_application_type',
    category: 'adjustment',
    label: '申請の種類を選んでください',
    helpText: '市原市では申請種別が選考の主要因子です',
    inputType: 'radio',
    options: [
      { label: '新規申請（市内在住・転入予定あり）', value: 'adj_type_new_in', points: 180 },
      { label: '転所申請（市内在住・転入予定あり）', value: 'adj_type_transfer_in', points: 250 },
      { label: '新規申請（市外在住・転入予定なし）', value: 'adj_type_new_out', points: 30 },
      { label: '転所申請（市外在住・転入予定なし）', value: 'adj_type_transfer_out', points: 100 },
    ],
  },
  {
    id: 'adj_child_disability',
    category: 'adjustment',
    label: '入園を希望する児童に障害がありますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_child_disability_no', points: 0 },
      { label: 'はい（+5）', value: 'adj_child_disability_yes', points: 5 },
    ],
  },
  {
    id: 'adj_sibling_simultaneous',
    category: 'adjustment',
    label: 'きょうだい同時申し込みですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_simultaneous_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_sibling_simultaneous_yes', points: 1 },
    ],
  },
  {
    id: 'adj_unlicensed',
    category: 'adjustment',
    label: '幼稚園・認可外保育施設等を利用中ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unlicensed_no', points: 0 },
      { label: '幼稚園・認可外保育施設等に在籍中（+12）', value: 'adj_unlicensed_12', points: 12 },
      { label: '一時預かり事業を利用中（+8）', value: 'adj_unlicensed_8', points: 8 },
    ],
  },
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい（+8）', value: 'adj_single_parent_yes', points: 8 },
    ],
  },
  {
    id: 'adj_parental_leave',
    category: 'adjustment',
    label: '産後休暇・育児休業明けによる職場復帰ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_parental_leave_no', points: 0 },
      { label: 'はい（+10）', value: 'adj_parental_leave_yes', points: 10 },
    ],
  },
  {
    id: 'adj_sibling_enrolled',
    category: 'adjustment',
    label: 'きょうだいが認可保育施設に在籍中ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_enrolled_no', points: 0 },
      { label: 'はい（+8）', value: 'adj_sibling_enrolled_yes', points: 8 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護を受けていますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい（+3）', value: 'adj_welfare_yes', points: 3 },
    ],
  },
  {
    id: 'adj_grandparent',
    category: 'adjustment',
    label: '同居する65歳未満の祖父母について、保育の必要性を証する書類がありませんか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ（該当しない）', value: 'adj_grandparent_no', points: 0 },
      { label: 'はい（-4）', value: 'adj_grandparent_yes', points: -4 },
    ],
  },
];

export const ichiharaData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
