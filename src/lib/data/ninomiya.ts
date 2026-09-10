import type { MunicipalityData, Question } from '../types';

// -------------------------------------------------------------------------
// 二宮町 保育園入園 利用調整基準データ
// 出典: 二宮町「保育所等の入所選考について」（令和7年4月入所分より適用）
// https://www.town.ninomiya.kanagawa.jp/cmsfiles/contents/0000003/3012/nyuusyosenko.pdf
// -------------------------------------------------------------------------
// 二宮町は原典に手順が書かれている。
//   「下記の『基本指数』及び『調整指数』の点数を合計し、
//    点数が高い方から順次入所を決定します。」
//   基本指数の備考1「保護者全員について個別に点数を算出し、合算する。」
//   備考2「保護者の状況について複数の項目に該当する場合は、
//        原則として点数の高い項目の点数を採用する。」
// 備考1により scoringMethod は 'sum'。基本指数の最大は1人あたり20点。
// 調整指数の備考「複数の項目に該当する場合は、合算した点数とする。」
//
// 原典で数値を出していない項目は選択肢にしていない。
// - 調整指数「町長が特に必要と認めた場合」（町長が定める）
//
// 「希望する保育所等に入所できない場合は、育児休業の延長も許容できるため、
//  利用調整の優先順位が下がってもよい」を選択した場合（−40）は、
// 実質的に順位を下げるための値なので入れていない。
// -------------------------------------------------------------------------

const municipality = {
  id: 'ninomiya',
  name: '二宮町',
  slug: 'ninomiya',
  prefecture: '神奈川県',
  maxBasePoints: 40, // 父母各20点の合計
  scoringMethod: 'sum',
} as const;

// 就労
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '居宅外就労：月20日以上かつ1日8時間以上', value: `${prefix}_employment_0`, points: 20 },
  { label: '居宅外就労：月20日以上かつ1日7時間以上8時間未満', value: `${prefix}_employment_1`, points: 18 },
  { label: '居宅外就労：月16日以上19日以下かつ1日8時間以上', value: `${prefix}_employment_2`, points: 18 },
  { label: '居宅外就労：月20日以上かつ1日6時間以上7時間未満', value: `${prefix}_employment_3`, points: 16 },
  { label: '居宅外就労：月16日以上19日以下かつ1日7時間以上8時間未満', value: `${prefix}_employment_4`, points: 16 },
  { label: '居宅外就労：月20日以上かつ1日5時間以上6時間未満', value: `${prefix}_employment_5`, points: 14 },
  { label: '居宅外就労：月16日以上19日以下かつ1日6時間以上7時間未満', value: `${prefix}_employment_6`, points: 14 },
  { label: '居宅外就労：月20日以上かつ1日4時間以上5時間未満', value: `${prefix}_employment_7`, points: 12 },
  { label: '居宅外就労：月16日以上19日以下かつ1日5時間以上6時間未満', value: `${prefix}_employment_8`, points: 12 },
  { label: '居宅外就労：月に64時間以上', value: `${prefix}_employment_9`, points: 10 },
  { label: '居宅内就労：月20日以上かつ1日8時間以上', value: `${prefix}_employment_10`, points: 18 },
  { label: '居宅内就労：月20日以上かつ1日7時間以上8時間未満', value: `${prefix}_employment_11`, points: 16 },
  { label: '居宅内就労：月16日以上19日以下かつ1日8時間以上', value: `${prefix}_employment_12`, points: 16 },
  { label: '居宅内就労：月20日以上かつ1日6時間以上7時間未満', value: `${prefix}_employment_13`, points: 14 },
  { label: '居宅内就労：月16日以上19日以下かつ1日7時間以上8時間未満', value: `${prefix}_employment_14`, points: 14 },
  { label: '居宅内就労：月20日以上かつ1日5時間以上6時間未満', value: `${prefix}_employment_15`, points: 12 },
  { label: '居宅内就労：月16日以上19日以下かつ1日6時間以上7時間未満', value: `${prefix}_employment_16`, points: 12 },
  { label: '居宅内就労：月20日以上かつ1日4時間以上5時間未満', value: `${prefix}_employment_17`, points: 10 },
  { label: '居宅内就労：月16日以上19日以下かつ1日5時間以上6時間未満', value: `${prefix}_employment_18`, points: 10 },
  { label: '居宅内就労：月に64時間以上', value: `${prefix}_employment_19`, points: 8 },
];

// 就学
const schoolOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_school_none`, points: 0 },
  { label: '月20日以上かつ1日8時間以上の就学', value: `${prefix}_school_0`, points: 20 },
  { label: '月20日以上かつ1日7時間以上8時間未満の就学', value: `${prefix}_school_1`, points: 18 },
  { label: '月16日以上19日以下かつ1日8時間以上の就学', value: `${prefix}_school_2`, points: 18 },
  { label: '月20日以上かつ1日6時間以上7時間未満の就学', value: `${prefix}_school_3`, points: 16 },
  { label: '月16日以上19日以下かつ1日7時間以上8時間未満の就学', value: `${prefix}_school_4`, points: 16 },
  { label: '月20日以上かつ1日5時間以上6時間未満の就学', value: `${prefix}_school_5`, points: 14 },
  { label: '月16日以上19日以下かつ1日6時間以上7時間未満の就学', value: `${prefix}_school_6`, points: 14 },
  { label: '月20日以上かつ1日4時間以上5時間未満の就学', value: `${prefix}_school_7`, points: 12 },
  { label: '月16日以上19日以下かつ1日5時間以上6時間未満の就学', value: `${prefix}_school_8`, points: 12 },
  { label: '月に64時間以上の就学', value: `${prefix}_school_9`, points: 10 },
];

// 疾病・障がい
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '1か月以上の入院もしくは寝たきりの状態など、完全に保育が不可能な状態', value: `${prefix}_illness_0`, points: 20 },
  { label: '身体障害者手帳1・2級／精神障害者保健福祉手帳1・2級／療育手帳A1・A2', value: `${prefix}_illness_1`, points: 20 },
  { label: '通院加療などを行い、常に安静を要するなど、常時保育が困難な状態', value: `${prefix}_illness_2`, points: 18 },
  { label: '身体障害者手帳3級／精神障害者保健福祉手帳3級／療育手帳B1・B2', value: `${prefix}_illness_3`, points: 18 },
  { label: '上記以外で保育に当たることが困難な場合', value: `${prefix}_illness_4`, points: 16 },
];

// 介護・看護
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '常時介護・看護（月に160時間以上）', value: `${prefix}_care_0`, points: 20 },
  { label: '月64時間以上の介護・看護', value: `${prefix}_care_1`, points: 12 },
];

// 災害復旧
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '震災・風水害・火災その他の災害の復旧により保育に当たれない', value: `${prefix}_disaster_0`, points: 20 },
];

// 妊娠・出産
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '産前産後8週の期間', value: `${prefix}_childbirth_0`, points: 8 },
];

// 求職活動
const jobseekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動中（起業準備中含む）、または保育所等入所後に求職活動を開始する', value: `${prefix}_jobseeking_0`, points: 1 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: '保護者全員について個別に点数を算出し、合算します。複数の項目に該当する場合は点数の高い項目を採用します',
    inputType: 'select',
    options: [
      { label: '就労', value: `${prefix}_reason_employment`, points: 0 },
      { label: '就学', value: `${prefix}_reason_school`, points: 0 },
      { label: '疾病・障がい', value: `${prefix}_reason_illness`, points: 0 },
      { label: '介護・看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '災害復旧', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '妊娠・出産', value: `${prefix}_reason_childbirth`, points: 0 },
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
      id: `${prefix}_school`,
      category,
      label: `${parentLabel}の就学の状況は？`,
      inputType: 'radio',
      options: schoolOptions(prefix),
    },
    {
      id: `${prefix}_illness`,
      category,
      label: `${parentLabel}の疾病・障がいの状況は？`,
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
      label: `${parentLabel}は災害復旧により保育に当たれませんか？`,
      inputType: 'radio',
      options: disasterOptions(prefix),
    },
    {
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}の妊娠・出産の状況は？`,
      inputType: 'radio',
      options: childbirthOptions(prefix),
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

// 調整指数（複数の項目に該当する場合は、合算した点数とする）
const adjustmentQuestions: Question[] = [
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護受給世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_0', points: 0 },
      { label: 'はい（+30）', value: 'adj_welfare_1', points: 30 },
    ],
  },
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親世帯ですか？',
    helpText: '離婚・離婚調停中・死別・未婚が対象です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_0', points: 0 },
      { label: 'はい（+25）', value: 'adj_single_parent_1', points: 25 },
    ],
  },
  {
    id: 'adj_unemployed',
    category: 'adjustment',
    label: '主として生計を維持する者の失業等により、就労の必要性が高いですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unemployed_0', points: 0 },
      { label: 'はい（+20）', value: 'adj_unemployed_1', points: 20 },
    ],
  },
  {
    id: 'adj_abuse',
    category: 'adjustment',
    label: '虐待やDVのおそれがありますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_abuse_0', points: 0 },
      { label: 'はい（+20）', value: 'adj_abuse_1', points: 20 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: 'きょうだいが同一の保育所等の利用を希望しますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_0', points: 0 },
      { label: 'はい（+10）', value: 'adj_sibling_1', points: 10 },
    ],
  },
  {
    id: 'adj_graduate',
    category: 'adjustment',
    label: '連携施設である小規模保育事業等の卒園児ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_graduate_0', points: 0 },
      { label: 'はい（+9）', value: 'adj_graduate_1', points: 9 },
    ],
  },
  {
    id: 'adj_leave_return',
    category: 'adjustment',
    label: '育児休業取得前に利用していた保育所等を、育児休業明けに再度希望しますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_leave_return_0', points: 0 },
      { label: 'はい（+8）', value: 'adj_leave_return_1', points: 8 },
    ],
  },
  {
    id: 'adj_preschool_age',
    category: 'adjustment',
    label: '就学を控えた4歳児以上の子どもが利用を希望しますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_preschool_age_0', points: 0 },
      { label: 'はい（+7）', value: 'adj_preschool_age_1', points: 7 },
    ],
  },
  {
    id: 'adj_hours_mismatch',
    category: 'adjustment',
    label: '延長保育等、開閉所時間と保育が必要な時間との整合がとれませんか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_hours_mismatch_0', points: 0 },
      { label: 'はい（+6）', value: 'adj_hours_mismatch_1', points: 6 },
    ],
  },
  {
    id: 'adj_no_family_care',
    category: 'adjustment',
    label: '保護者以外の同居親族により保育することができませんか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_no_family_care_0', points: 0 },
      { label: 'はい（+5）', value: 'adj_no_family_care_1', points: 5 },
    ],
  },
  {
    id: 'adj_nursery_staff',
    category: 'adjustment',
    label: '保護者の職業が認可保育所等で働いている保育教諭・保育士ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_nursery_staff_0', points: 0 },
      { label: 'はい（+4）', value: 'adj_nursery_staff_1', points: 4 },
    ],
  },
];

export const ninomiyaData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
