import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 大東市 特定教育・保育施設に係る利用調整基準（基本点数表・調整点数表・加算点数表）データ
//
// 出典: 大東市こども家庭室保育幼稚園グループ「大東市特定教育・保育施設に係る利用調整基準」
//       https://www.city.daito.lg.jp/uploaded/attachment/38077.pdf
//       （大東市Webサイト「保育所（園）等の利用調整基準表」
//         https://www.city.daito.lg.jp/soshiki/60/1050.html からリンク）
//
// 2026-08-19: 従来のデータは他自治体と同じ点数配列のテンプレート（推定値）だったため、
//             上記の公式基準を読み取って全面的に置き換えた。
//             公式の基本点数は父母各6点で、旧データ（父母各20点）とは体系が異なる。
//
// 原典の構成:
//   基本点数表（区分1〜11）／調整点数表（いずれかの要件のみ加算）／加算点数表（該当する要件すべてを加算）
// ---------------------------------------------------------------------------

const municipality = {
  id: 'daito',
  name: '大東市',
  slug: 'daito',
  prefecture: '大阪府',
  maxBasePoints: 12, // 父母各6点
} as const;

// ---------------------------------------------------------------------------
// 基本点数表。父母それぞれについて選ぶ
// ---------------------------------------------------------------------------

/** (1) 家庭外労働（居宅外自営を含む） */
const outsideWorkOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_outside_none`, points: 0 },
  { label: '月20日以上、1日8時間以上または月160時間以上', value: `${prefix}_outside_6`, points: 6 },
  { label: '月20日以上、1日6時間以上または月120時間以上', value: `${prefix}_outside_5`, points: 5 },
  { label: '月16日以上、1日6時間以上または月96時間以上', value: `${prefix}_outside_4`, points: 4 },
  { label: '月64時間以上', value: `${prefix}_outside_3`, points: 3 },
  { label: 'その他の就労', value: `${prefix}_outside_2`, points: 2 },
];

/** (2) 家庭内労働 */
const homeWorkOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_home_none`, points: 0 },
  {
    label: '自営業で月20日以上、1日6時間以上または月120時間以上',
    value: `${prefix}_home_5`,
    points: 5,
  },
  {
    label: '家庭内労働で月16日以上、1日6時間以上または月96時間以上',
    value: `${prefix}_home_4`,
    points: 4,
  },
  { label: '月64時間以上', value: `${prefix}_home_3`, points: 3 },
  { label: 'その他の就労', value: `${prefix}_home_2`, points: 2 },
];

/** (3) 内定 */
const jobOfferOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_joboffer_none`, points: 0 },
  { label: '月160時間以上で就労が内定している', value: `${prefix}_joboffer_5`, points: 5 },
  { label: '月120時間以上で就労が内定している', value: `${prefix}_joboffer_4`, points: 4 },
  { label: '月96時間以上で就労が内定している', value: `${prefix}_joboffer_3`, points: 3 },
  { label: '月64時間以上で就労が内定している', value: `${prefix}_joboffer_2`, points: 2 },
];

/** (4) 出産・妊娠 */
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '産前産後約2か月以内', value: `${prefix}_childbirth_5`, points: 5 },
];

/** (5) 疾病・(6) 障がい */
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '疾病：入院を必要とする者、常時病臥者（居宅内）', value: `${prefix}_illness_6`, points: 6 },
  { label: '疾病：通院を必要とするなど、常に安静を要する', value: `${prefix}_illness_5`, points: 5 },
  { label: '疾病：疾病等により保育に支障がある', value: `${prefix}_illness_4`, points: 4 },
  { label: '疾病：上記以外', value: `${prefix}_illness_3`, points: 3 },
  {
    label: '障がい：身障1・2級、療育A・B1、精神1級',
    value: `${prefix}_illness_disability_6`,
    points: 6,
  },
  {
    label: '障がい：身障3・4級、療育B2、精神2・3級',
    value: `${prefix}_illness_disability_5`,
    points: 5,
  },
  { label: '障がい：上記以外', value: `${prefix}_illness_disability_3`, points: 3 },
];

/** (7) 看護・介護 */
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  {
    label: '入院付き添い、病児病臥（居宅内）、または身障1・2級等の状態の者の看護・介護',
    value: `${prefix}_care_6`,
    points: 6,
  },
  {
    label: '常に安静を要する者、身障3・4級等の状態の者の看護・介護、または支援学校等の在園児の看護・介護',
    value: `${prefix}_care_5`,
    points: 5,
  },
  { label: '上記以外の者の看護・介護', value: `${prefix}_care_3`, points: 3 },
];

/** (8) 災害 */
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '災害復旧に当たっている', value: `${prefix}_disaster_6`, points: 6 },
];

/** (9) 就学 */
const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  {
    label: '職業訓練校、専門学校、大学等に就学中で月16日以上、1日6時間以上または月96時間以上',
    value: `${prefix}_education_4`,
    points: 4,
  },
  { label: '上記に該当しない範囲で就学している', value: `${prefix}_education_3`, points: 3 },
  { label: '上記に就学予定', value: `${prefix}_education_1`, points: 1 },
];

/** (10) 求職中 */
const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '生計中心者が失業等により求職中', value: `${prefix}_jobseeking_4`, points: 4 },
  { label: '労働誓約', value: `${prefix}_jobseeking_1`, points: 1 },
];

/** (11) その他 */
const otherOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_other_none`, points: 0 },
  { label: '不存在', value: `${prefix}_other_6a`, points: 6 },
  {
    label: '虐待またはDVのおそれがある等、社会的擁護が必要な世帯',
    value: `${prefix}_other_6b`,
    points: 6,
  },
  {
    label: '子どもが障害を有し、入所が望ましいと判断される世帯',
    value: `${prefix}_other_4`,
    points: 4,
  },
];

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
      { label: '家庭外労働（居宅外自営を含む）', value: `${prefix}_reason_outside`, points: 0 },
      { label: '家庭内労働', value: `${prefix}_reason_home`, points: 0 },
      { label: '就労の内定', value: `${prefix}_reason_joboffer`, points: 0 },
      { label: '出産・妊娠', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '疾病・障がい', value: `${prefix}_reason_illness`, points: 0 },
      { label: '看護・介護', value: `${prefix}_reason_care`, points: 0 },
      { label: '災害', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '就学', value: `${prefix}_reason_education`, points: 0 },
      { label: '求職中', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: 'その他（不存在・社会的擁護等）', value: `${prefix}_reason_other`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_outside`,
      category,
      label: `${parentLabel}の家庭外労働の状況は？`,
      inputType: 'radio',
      options: outsideWorkOptions(prefix),
    },
    {
      id: `${prefix}_home`,
      category,
      label: `${parentLabel}の家庭内労働の状況は？`,
      inputType: 'radio',
      options: homeWorkOptions(prefix),
    },
    {
      id: `${prefix}_joboffer`,
      category,
      label: `${parentLabel}の就労内定の状況は？`,
      inputType: 'radio',
      options: jobOfferOptions(prefix),
    },
    {
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}の出産・妊娠の状況は？`,
      inputType: 'radio',
      options: childbirthOptions(prefix),
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
      label: `${parentLabel}の看護・介護の状況は？`,
      inputType: 'radio',
      options: careOptions(prefix),
    },
    {
      id: `${prefix}_disaster`,
      category,
      label: `${parentLabel}は災害復旧に当たっていますか？`,
      inputType: 'radio',
      options: disasterOptions(prefix),
    },
    {
      id: `${prefix}_education`,
      category,
      label: `${parentLabel}の就学の状況は？`,
      inputType: 'radio',
      options: educationOptions(prefix),
    },
    {
      id: `${prefix}_jobseeking`,
      category,
      label: `${parentLabel}の求職の状況は？`,
      inputType: 'radio',
      options: jobSeekingOptions(prefix),
    },
    {
      id: `${prefix}_other`,
      category,
      label: `${parentLabel}はその他の事由にあてはまりますか？`,
      inputType: 'radio',
      options: otherOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// ---------------------------------------------------------------------------
// 調整点数表（いずれかの要件のみ加算）・加算点数表（該当する要件すべてを加算）
// ---------------------------------------------------------------------------

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_household',
    category: 'adjustment',
    label: '世帯の状況にあてはまるものは？',
    helpText: 'いずれかの要件のみが加算されます',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_household_no', points: 0 },
      { label: 'ひとり親世帯、児童世帯その他これに準じる世帯', value: 'adj_household_2', points: 2 },
      { label: '育児休業または産休明けの世帯', value: 'adj_household_1a', points: 1 },
      {
        label: '就労内定かつ実施開始希望月には就労が見込まれる世帯',
        value: 'adj_household_1b',
        points: 1,
      },
      { label: '在籍児が諸般の事情で一時的に退所し、再入所する世帯', value: 'adj_household_1c', points: 1 },
      { label: '生活保護世帯かつ施設利用により自立が見込まれる世帯', value: 'adj_household_1d', points: 1 },
      {
        label: '家庭的保育事業等および2歳児までの保育園の卒園予定児童がいる世帯',
        value: 'adj_household_1e',
        points: 1,
      },
    ],
  },
  {
    id: 'adj_ninkagai',
    category: 'adjustment',
    label: '認可外や他市等の保育施設を利用していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_ninkagai_no', points: 0 },
      { label: 'はい', value: 'adj_ninkagai_yes', points: 1 },
    ],
  },
  {
    id: 'adj_hoikushi',
    category: 'adjustment',
    label: '保護者が保育士・幼稚園教諭・保育教諭として市内の保育所等に就労していますか？',
    helpText: '就労することが内定している場合も含みます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_hoikushi_no', points: 0 },
      { label: 'はい', value: 'adj_hoikushi_yes', points: 1 },
    ],
  },
  {
    id: 'adj_other_need',
    category: 'adjustment',
    label: 'その他、入所が必要と福祉事務所長が認める世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_other_need_no', points: 0 },
      { label: 'はい', value: 'adj_other_need_yes', points: 1 },
    ],
  },
];

export const daitoData: MunicipalityData = {
  municipality,
  questions: [...buildParentQuestions(1), ...buildParentQuestions(2), ...adjustmentQuestions],
};
