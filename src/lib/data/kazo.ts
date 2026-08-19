import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 加須市 保育所等入所基準表（調査表）基準指数表・調整指数表 データ
//
// 出典: 加須市こども保育課「加須市保育所等入所基準表（調査表）」表1・表2
//       https://www.city.kazo.lg.jp/material/files/group/25/1-1kazo.pdf
//       （加須市Webサイト「令和8年度保育所（園）・認定こども園入所申請書類」
//         https://www.city.kazo.lg.jp/soshiki/hoikuyouchien/shinseisho/42024.html からリンク）
//
// 2026-08-19: 従来のデータは他自治体と同じ点数配列のテンプレート（推定値）だったため、
//             上記の公式基準表を読み取って全面的に置き換えた。
//             基準表は申請書類PDFに画像として含まれているため、該当ページを画像化して読み取った。
//
// 原典の注記:
//   「就労時間は通勤時間、残業時間を含まない。ただし、休憩時間は含む」
//   「父母それぞれの指数を算出し、合算した点数を世帯の基準指数とする」
//   「期限内に『保育を必要とすることを証明する書類』の提出がなかった場合は、求職中の指数とする」
//   「父母が複数の事由に該当する場合は、各々について指数が高い方の要件を採用する」
//   調整指数No.1（市内施設から市内施設への転園申請）に該当する場合、No.2〜No.19の点数調整は行われない。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'kazo',
  name: '加須市',
  slug: 'kazo',
  prefecture: '埼玉県',
  maxBasePoints: 20, // 父母各10点
} as const;

// ---------------------------------------------------------------------------
// 表1 基準指数表（保護者の状況）。父母それぞれについて選ぶ
// ---------------------------------------------------------------------------

/** 1 就労（内定含む） */
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月180時間以上の就労を常態', value: `${prefix}_employment_10`, points: 10 },
  { label: '月160時間以上の就労を常態', value: `${prefix}_employment_9`, points: 9 },
  { label: '月140時間以上の就労を常態', value: `${prefix}_employment_8`, points: 8 },
  { label: '月120時間以上の就労を常態', value: `${prefix}_employment_7`, points: 7 },
  { label: '月100時間以上の就労を常態', value: `${prefix}_employment_6`, points: 6 },
  { label: '月80時間以上の就労を常態', value: `${prefix}_employment_5`, points: 5 },
  { label: '月64時間以上の就労を常態', value: `${prefix}_employment_4`, points: 4 },
];

/** 2 妊娠出産（公式の基準表では母の欄のみに指数がある） */
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産予定月とその前後2か月間にある', value: `${prefix}_childbirth_7`, points: 7 },
];

/** 3 疾病・障害 */
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '疾病：入院1か月以上', value: `${prefix}_illness_10`, points: 10 },
  { label: '疾病：居宅内療養で常時病臥', value: `${prefix}_illness_bed_10`, points: 10 },
  { label: '疾病：居宅内療養の精神疾患（重度の症状）', value: `${prefix}_illness_mental_10`, points: 10 },
  { label: '疾病：居宅内療養の精神疾患（上記以外の程度）', value: `${prefix}_illness_mental_8`, points: 8 },
  {
    label: '疾病：一般療養で安静を要する状態（常時病臥に至らない程度）',
    value: `${prefix}_illness_8`,
    points: 8,
  },
  { label: '障害：身体障害者手帳1・2級', value: `${prefix}_illness_body_10`, points: 10 },
  {
    label: '障害：療育手帳・精神障害者保健福祉手帳のマルA・A・B、1・2級',
    value: `${prefix}_illness_ryoiku_10`,
    points: 10,
  },
  {
    label: '障害：療育手帳・精神障害者保健福祉手帳のC、3級',
    value: `${prefix}_illness_ryoiku_8`,
    points: 8,
  },
  { label: '障害：身体障害者手帳3級', value: `${prefix}_illness_body_6`, points: 6 },
  { label: '障害：身体障害者手帳4〜6級', value: `${prefix}_illness_body_4`, points: 4 },
];

/** 4 親族の介護・看護（看護は就労時間に準ずる） */
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '居宅介護：要介護認定5・4', value: `${prefix}_care_10`, points: 10 },
  { label: '居宅介護：要介護認定3', value: `${prefix}_care_8`, points: 8 },
  { label: '居宅介護：上記以外の認定保持者', value: `${prefix}_care_4`, points: 4 },
  { label: '看護：月180時間以上に相当', value: `${prefix}_care_nursing_10`, points: 10 },
  { label: '看護：月140時間以上に相当', value: `${prefix}_care_nursing_8`, points: 8 },
  { label: '看護：月120時間以上に相当', value: `${prefix}_care_nursing_7`, points: 7 },
  { label: '看護：月80時間以上に相当', value: `${prefix}_care_nursing_5`, points: 5 },
  { label: '看護：月64時間以上に相当', value: `${prefix}_care_nursing_4`, points: 4 },
];

/** 5 災害復旧 */
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  {
    label: '災害等による家屋の損傷、その他の災害復旧のため保育をすることができない',
    value: `${prefix}_disaster_10`,
    points: 10,
  },
];

/** 6 求職 */
const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '日中求職活動のため、外出することを常態としている', value: `${prefix}_jobseeking_2`, points: 2 },
];

/** 7 就学等（就労時間に準ずる） */
const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '月180時間以上に相当する通学', value: `${prefix}_education_10`, points: 10 },
  { label: '月160時間以上に相当する通学', value: `${prefix}_education_9`, points: 9 },
  { label: '月140時間以上に相当する通学', value: `${prefix}_education_8`, points: 8 },
  { label: '月120時間以上に相当する通学', value: `${prefix}_education_7`, points: 7 },
  { label: '月100時間以上に相当する通学', value: `${prefix}_education_6`, points: 6 },
  { label: '月80時間以上に相当する通学', value: `${prefix}_education_5`, points: 5 },
  { label: '月64時間以上に相当する通学', value: `${prefix}_education_4`, points: 4 },
];

/** 8 虐待等 */
const abuseOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_abuse_none`, points: 0 },
  {
    label: '児童虐待防止法第2条または配偶者暴力防止法第1条の対象者と認められる',
    value: `${prefix}_abuse_10`,
    points: 10,
  },
];

/** 9 その他（不存在） */
const absenceOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_absence_none`, points: 0 },
  { label: '不存在（死亡、離婚、未婚、その他）', value: `${prefix}_absence_10`, points: 10 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: '複数の事由に該当する場合は、指数が高い方の要件が採用されます',
    inputType: 'select',
    options: [
      { label: '就労（内定含む）', value: `${prefix}_reason_employment`, points: 0 },
      { label: '妊娠出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '疾病・障害', value: `${prefix}_reason_illness`, points: 0 },
      { label: '親族の介護・看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '災害復旧', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '求職', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '就学等', value: `${prefix}_reason_education`, points: 0 },
      { label: '虐待等', value: `${prefix}_reason_abuse`, points: 0 },
      { label: 'その他（不存在）', value: `${prefix}_reason_absence`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の就労時間は？`,
      helpText: '就労時間は通勤時間・残業時間を含みませんが、休憩時間は含みます',
      inputType: 'radio',
      options: employmentOptions(prefix),
    },
    {
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}の妊娠出産の状況は？`,
      helpText: '切迫流産などは疾病として扱われます。公式の基準表では母の欄のみに指数があります',
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
      helpText: '看護は就労時間に準じた指数となります',
      inputType: 'radio',
      options: careOptions(prefix),
    },
    {
      id: `${prefix}_disaster`,
      category,
      label: `${parentLabel}は災害復旧にあてはまりますか？`,
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
      label: `${parentLabel}の就学・技能習得の状況は？`,
      helpText: '就労時間に準じた指数となります',
      inputType: 'radio',
      options: educationOptions(prefix),
    },
    {
      id: `${prefix}_abuse`,
      category,
      label: `${parentLabel}は虐待等の対象者と認められますか？`,
      inputType: 'radio',
      options: abuseOptions(prefix),
    },
    {
      id: `${prefix}_absence`,
      category,
      label: `${parentLabel}は不存在の状態ですか？`,
      inputType: 'radio',
      options: absenceOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// ---------------------------------------------------------------------------
// 表2 調整指数表
// ---------------------------------------------------------------------------

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_transfer',
    category: 'adjustment',
    label: '転園申請にあてはまるものは？',
    helpText:
      '市内施設から市内施設への転園申請に該当する場合、他の調整指数（No.2〜No.19）の点数調整は行われません',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_transfer_no', points: 0 },
      { label: '在園施設の移転・廃止・統合等による転園申請', value: 'adj_transfer_6', points: 6 },
      {
        label: '市内施設から市内施設への転園申請（やむを得ない場合を除く）',
        value: 'adj_transfer_m5',
        points: -5,
      },
    ],
  },
  {
    id: 'adj_welfare_care',
    category: 'adjustment',
    label: '福祉的配慮にあてはまるものは？',
    helpText: '必要書類により確認できる場合に適用されます',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_welfare_care_no', points: 0 },
      {
        label: '児童虐待防止法第2条または配偶者暴力防止法第1条の対象者と認められる',
        value: 'adj_welfare_care_6a',
        points: 6,
      },
      { label: '里親委託が行われている', value: 'adj_welfare_care_6b', points: 6 },
      { label: 'ひとり親世帯', value: 'adj_welfare_care_6c', points: 6 },
      { label: 'こどもが障害を有する', value: 'adj_welfare_care_3', points: 3 },
      {
        label: '保護者が重度の障害で、特に身体的・能力的に養育が困難であると認められる',
        value: 'adj_welfare_care_2',
        points: 2,
      },
      { label: '生活保護世帯', value: 'adj_welfare_care_1a', points: 1 },
      { label: '生計中心者の失業により就労の必要性が高い', value: 'adj_welfare_care_1b', points: 1 },
    ],
  },
  {
    id: 'adj_environment',
    category: 'adjustment',
    label: '養育環境の配慮にあてはまるものは？',
    helpText:
      '「加点対象施設」とは認可保育所・認定こども園（2・3号）・地域型保育事業・認可外保育施設をいい、幼稚園・認定こども園（1号）は含みません',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_environment_no', points: 0 },
      {
        label: '育児休業が取得できず一度退所し、同じ職場に復帰する際に退所した園へ1年以内の入所を希望（第一希望のみ）',
        value: 'adj_environment_6',
        points: 6,
      },
      { label: '現在施設入所しているが、卒園を理由に申込む', value: 'adj_environment_3a', points: 3 },
      {
        label: '当該児童は施設入所していないが、兄弟姉妹はすでに加点対象施設に入所している',
        value: 'adj_environment_3b',
        points: 3,
      },
      { label: '多胎児が同時に申込みをする', value: 'adj_environment_2', points: 2 },
      { label: '兄弟姉妹が同時に申込みをする', value: 'adj_environment_1a', points: 1 },
      { label: '転入の翌月の入所申込みをする（転出元で施設在園児に限る）', value: 'adj_environment_1b', points: 1 },
    ],
  },
  {
    id: 'adj_other',
    category: 'adjustment',
    label: 'その他の加点にあてはまるものは？',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_other_no', points: 0 },
      {
        label: '特定職種への配慮（保育施設等で保育士、幼稚園教諭、保育教諭、加須市の学童指導員として勤務）',
        value: 'adj_other_6a',
        points: 6,
      },
      { label: '市内保育施設で勤務（内定含む）', value: 'adj_other_6b', points: 6 },
      {
        label: '保育所に入所後、産前産後休業または育児休業から仕事復帰をする',
        value: 'adj_other_3',
        points: 3,
      },
      { label: '当該児童が第3子以降', value: 'adj_other_1', points: 1 },
    ],
  },
  {
    id: 'adj_relative',
    category: 'adjustment',
    label: '同居の親族等の協力者（65歳以上の同居親族等を除く）がいますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_relative_no', points: 0 },
      { label: 'はい', value: 'adj_relative_yes', points: -1 },
    ],
  },
  {
    id: 'adj_arrears',
    category: 'adjustment',
    label: '世帯に保育料の未納（過年度分）がありますか？',
    helpText: '児童手当からの充当誓約がない、または納付約束を履行しない場合に減算されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_arrears_no', points: 0 },
      { label: 'はい', value: 'adj_arrears_yes', points: -20 },
    ],
  },
  {
    id: 'adj_outside',
    category: 'adjustment',
    label: '市外に住所を有していますか？',
    helpText: '市内保育施設で勤務（内定含む）する場合は除きます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_outside_no', points: 0 },
      { label: 'はい（2号認定）', value: 'adj_outside_m3', points: -3 },
      { label: 'はい（3号認定）', value: 'adj_outside_m5', points: -5 },
    ],
  },
  {
    id: 'adj_no_salary',
    category: 'adjustment',
    label: '給与支払額が0円ですか？',
    helpText: '育児休業期間中は除きます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_no_salary_no', points: 0 },
      { label: 'はい', value: 'adj_no_salary_yes', points: -4 },
    ],
  },
  {
    id: 'adj_self_employed',
    category: 'adjustment',
    label: '自営の保護者で、仕事内容・実績の分かる書類を確認できますか？',
    helpText: '勤務先の経営者が親族である場合を含みます（法人を除く）',
    inputType: 'radio',
    options: [
      { label: '自営ではない、または確認できる', value: 'adj_self_employed_no', points: 0 },
      { label: '確認できない', value: 'adj_self_employed_yes', points: -4 },
    ],
  },
  {
    id: 'adj_declined',
    category: 'adjustment',
    label: '入所内定後に自己都合で辞退しましたか？',
    helpText: '同一年度内の利用申込みに限ります',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_declined_no', points: 0 },
      { label: 'はい', value: 'adj_declined_yes', points: -4 },
    ],
  },
];

export const kazoData: MunicipalityData = {
  municipality,
  questions: [...buildParentQuestions(1), ...buildParentQuestions(2), ...adjustmentQuestions],
};
