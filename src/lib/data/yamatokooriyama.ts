import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 大和郡山市 保育実施選考基準（基準指数・調整基準）データ
//
// 出典: 大和郡山市保育支援課「大和郡山市保育実施選考基準」
//       https://www.city.yamatokoriyama.lg.jp/material/files/group/62/R7kizyun.pdf
//       （大和郡山市Webサイト「保育園・認定こども園のご案内」
//         https://www.city.yamatokoriyama.lg.jp/soshiki/hoikuka/hoikuen_yochien_ninteikodomoen/3237.html からリンク）
//
// 2026-08-19: 従来のデータは他自治体と同じ点数配列のテンプレート（推定値）だったため、
//             上記の公式基準を読み取って全面的に置き換えた。
//
// 原典の注記:
//   「児童の父、母それぞれで指数を適用する」
//   「内容項目が重複して該当する場合は、最も点数の高い内容で点数化するものとする」
//   「市内認可保育園・こども園に復職・就職をする保育士については、保育士支援として10点を加算し、
//     常勤保育士については、保育士支援とは別に常勤支援としてさらに5点を加算する」
//
// 質問に含めていない原典の項目:
//   ・「4月の新規入所において、申込期限を過ぎての申請は2次募集扱とし、5点を減算する」
//   ・「選考会開催月の初日現在で未転入者及び転入予定がない場合は、調整基準のうち保育料の滞納、
//     内定辞退、入所中の項目を減算し、保育料に滞納がある場合は追加で減算する」
//   （いずれも申込時期や転入状況に依存する特例のため）
// ---------------------------------------------------------------------------

const municipality = {
  id: 'yamatokooriyama',
  name: '大和郡山市',
  slug: 'yamatokooriyama',
  prefecture: '奈良県',
  maxBasePoints: 20, // 父母各10点
} as const;

// ---------------------------------------------------------------------------
// 基準指数（保育が必要な事由）。父母それぞれについて選ぶ
// ---------------------------------------------------------------------------

/** 就労（外勤の正職・派遣パート／自営の中心者・協力者／内職） */
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '外勤・正職：月160時間以上の勤務', value: `${prefix}_employment_10`, points: 10 },
  { label: '外勤・正職：月140時間以上の勤務', value: `${prefix}_employment_9`, points: 9 },
  { label: '外勤・正職：月120時間以上の勤務', value: `${prefix}_employment_8`, points: 8 },
  { label: '外勤・正職：月100時間以上の勤務', value: `${prefix}_employment_7`, points: 7 },
  { label: '外勤・正職：月80時間以上の勤務', value: `${prefix}_employment_6`, points: 6 },
  { label: '外勤・正職：月48時間以上の勤務', value: `${prefix}_employment_4`, points: 4 },
  { label: '外勤・派遣パート：月160時間以上の勤務', value: `${prefix}_employment_part_9`, points: 9 },
  { label: '外勤・派遣パート：月140時間以上の勤務', value: `${prefix}_employment_part_8`, points: 8 },
  { label: '外勤・派遣パート：月120時間以上の勤務', value: `${prefix}_employment_part_7`, points: 7 },
  { label: '外勤・派遣パート：月100時間以上の勤務', value: `${prefix}_employment_part_6`, points: 6 },
  { label: '外勤・派遣パート：月80時間以上の勤務', value: `${prefix}_employment_part_5`, points: 5 },
  { label: '外勤・派遣パート：月48時間以上の勤務', value: `${prefix}_employment_part_4`, points: 4 },
  { label: '自営・中心者：外勤に準ずる（月160時間以上）', value: `${prefix}_employment_self_10`, points: 10 },
  { label: '自営・中心者：外勤に準ずる（月120時間以上）', value: `${prefix}_employment_self_8`, points: 8 },
  { label: '自営・中心者：外勤に準ずる（月48時間以上）', value: `${prefix}_employment_self_4`, points: 4 },
  { label: '自営・協力者：月160時間以上の勤務', value: `${prefix}_employment_help_7`, points: 7 },
  { label: '自営・協力者：月140時間以上の勤務', value: `${prefix}_employment_help_6`, points: 6 },
  { label: '自営・協力者：月120時間以上の勤務', value: `${prefix}_employment_help_5`, points: 5 },
  { label: '自営・協力者：月100時間以上の勤務', value: `${prefix}_employment_help_4`, points: 4 },
  { label: '自営・協力者：月80時間以上の勤務', value: `${prefix}_employment_help_3`, points: 3 },
  { label: '自営・協力者：月48時間以上の勤務', value: `${prefix}_employment_help_2`, points: 2 },
  { label: '内職：月48時間以上の勤務', value: `${prefix}_employment_naishoku_2`, points: 2 },
];

/** 妊娠・出産 */
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産月とその前後2か月', value: `${prefix}_childbirth_7`, points: 7 },
];

/** 疾病・負傷・障害 */
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '疾病：入院（1か月以上）', value: `${prefix}_illness_10`, points: 10 },
  { label: '疾病：常時病臥・精神疾患・感染症疾患', value: `${prefix}_illness_9`, points: 9 },
  { label: '疾病：居宅内で週1日以上の通院の常態化', value: `${prefix}_illness_7`, points: 7 },
  {
    label: '疾病：上記以外の疾病等により明らかに保育が必要な場合',
    value: `${prefix}_illness_6`,
    points: 6,
  },
  { label: '障害：身体障害者手帳1・2級', value: `${prefix}_illness_body_9`, points: 9 },
  { label: '障害：身体障害者手帳3・4級', value: `${prefix}_illness_body_6`, points: 6 },
  { label: '障害：上記以外の身体障害者手帳', value: `${prefix}_illness_body_4`, points: 4 },
  { label: '障害：療育手帳A1・A2', value: `${prefix}_illness_ryoiku_9`, points: 9 },
  { label: '障害：療育手帳B1・B2', value: `${prefix}_illness_ryoiku_6`, points: 6 },
  { label: '障害：精神障害者保健福祉手帳1級', value: `${prefix}_illness_mental_9`, points: 9 },
  { label: '障害：精神障害者保健福祉手帳2級・3級', value: `${prefix}_illness_mental_6`, points: 6 },
];

/** 看護・介護 */
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '看護：保護者の3親等内親族の1か月以上の入院付添', value: `${prefix}_care_7`, points: 7 },
  { label: '介護：保護者の3親等内親族の介護等に当たっている', value: `${prefix}_care_7b`, points: 7 },
  { label: '看護：居宅内で家族の看護等に当たっている', value: `${prefix}_care_6`, points: 6 },
];

/** 災害復旧 */
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '火災・風水害等で家屋の復旧に当たっている', value: `${prefix}_disaster_10`, points: 10 },
];

/** 求職 */
const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職中', value: `${prefix}_jobseeking_1`, points: 1 },
];

/** 就学 */
const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '週3日以上、就学している', value: `${prefix}_education_5`, points: 5 },
];

/** 虐待・DV */
const abuseOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_abuse_none`, points: 0 },
  { label: '虐待やDVのおそれがある', value: `${prefix}_abuse_10`, points: 10 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: '内容項目が重複して該当する場合は、最も点数の高い内容で点数化されます',
    inputType: 'select',
    options: [
      { label: '就労（外勤・自営・内職）', value: `${prefix}_reason_employment`, points: 0 },
      { label: '妊娠・出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '疾病・負傷・障害', value: `${prefix}_reason_illness`, points: 0 },
      { label: '看護・介護', value: `${prefix}_reason_care`, points: 0 },
      { label: '災害復旧', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '求職', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '就学', value: `${prefix}_reason_education`, points: 0 },
      { label: '虐待・DV', value: `${prefix}_reason_abuse`, points: 0 },
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
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}の妊娠・出産の状況は？`,
      inputType: 'radio',
      options: childbirthOptions(prefix),
    },
    {
      id: `${prefix}_illness`,
      category,
      label: `${parentLabel}の疾病・負傷・障害の状況は？`,
      inputType: 'radio',
      options: illnessOptions(prefix),
    },
    {
      id: `${prefix}_care`,
      category,
      label: `${parentLabel}の看護・介護の状況は？`,
      inputType: 'radio',
      options: careOptions(prefix),
    },
    {
      id: `${prefix}_disaster`,
      category,
      label: `${parentLabel}は家屋の復旧に当たっていますか？`,
      inputType: 'radio',
      options: disasterOptions(prefix),
    },
    {
      id: `${prefix}_jobseeking`,
      category,
      label: `${parentLabel}は求職中ですか？`,
      helpText: '父母に求職者が含まれる場合、定員を超えての入園は認められません',
      inputType: 'radio',
      options: jobSeekingOptions(prefix),
    },
    {
      id: `${prefix}_education`,
      category,
      label: `${parentLabel}は就学していますか？`,
      inputType: 'radio',
      options: educationOptions(prefix),
    },
    {
      id: `${prefix}_abuse`,
      category,
      label: `${parentLabel}は虐待・DVのおそれにあてはまりますか？`,
      inputType: 'radio',
      options: abuseOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// ---------------------------------------------------------------------------
// 調整基準（加算・減算）
// ---------------------------------------------------------------------------

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護受給世帯ですか？',
    helpText: '保育の実施が自立助長に貢献すると認められる場合が対象です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい', value: 'adj_welfare_yes', points: 4 },
    ],
  },
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親家庭等ですか？',
    helpText: '離婚調停中を含みます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい', value: 'adj_single_parent_yes', points: 12 },
    ],
  },
  {
    id: 'adj_support',
    category: 'adjustment',
    label: '家庭状況により特別な支援が必要と認められますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_support_no', points: 0 },
      { label: 'はい', value: 'adj_support_yes', points: 5 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: '既に兄弟姉妹が同一保育園に入所していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_no', points: 0 },
      { label: 'はい', value: 'adj_sibling_yes', points: 3 },
    ],
  },
  {
    id: 'adj_many_children',
    category: 'adjustment',
    label: '3人以上の児童がいますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_many_children_no', points: 0 },
      { label: 'はい', value: 'adj_many_children_yes', points: 3 },
    ],
  },
  {
    id: 'adj_hoikushi',
    category: 'adjustment',
    label: '市内認可保育園・こども園に復職・就職する保育士ですか？',
    helpText: '常勤保育士は、保育士支援10点とは別に常勤支援としてさらに5点が加算されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_hoikushi_no', points: 0 },
      { label: 'はい（常勤保育士）', value: 'adj_hoikushi_15', points: 15 },
      { label: 'はい（常勤以外）', value: 'adj_hoikushi_10', points: 10 },
    ],
  },
  {
    id: 'adj_arrears',
    category: 'adjustment',
    label: '正当な理由なく保育料の滞納がありますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_arrears_no', points: 0 },
      { label: 'はい', value: 'adj_arrears_yes', points: -10 },
    ],
  },
  {
    id: 'adj_declined',
    category: 'adjustment',
    label: '同一年度内に内定を辞退したことがありますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_declined_no', points: 0 },
      { label: 'はい', value: 'adj_declined_yes', points: -2 },
    ],
  },
  {
    id: 'adj_enrolled',
    category: 'adjustment',
    label: '申込児童は市内認可保育園へ入所中ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_enrolled_no', points: 0 },
      { label: 'はい', value: 'adj_enrolled_yes', points: -4 },
    ],
  },
];

export const yamatokooriyamaData: MunicipalityData = {
  municipality,
  questions: [...buildParentQuestions(1), ...buildParentQuestions(2), ...adjustmentQuestions],
};
