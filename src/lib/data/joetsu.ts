import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 上越市 保育園入園 選考基準データ
// 出典: 上越市「入園選考の基準・保育の必要性の認定基準」
// 計算方式: 父母それぞれの指数を計算し、低い方を基準（min方式）+ 調整指数を加算
// ---------------------------------------------------------------------------

const municipality = {
  id: 'joetsu',
  name: '上越市',
  slug: 'joetsu',
  prefecture: '新潟県',
  maxBasePoints: 10, // 低い方を採用するmin方式（各最大10点）
  scoringMethod: 'min' as const,
} as const;

/** 外勤 */
const outerEmploymentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_outer_none`, points: 0 },
  { label: '月140時間以上（1日7時間以上の勤務）', value: `${prefix}_outer_140`, points: 10 },
  { label: '月120時間以上140時間未満（1日6時間以上7時間未満）', value: `${prefix}_outer_120`, points: 9 },
  { label: '月80時間以上120時間未満（1日4時間以上6時間未満）', value: `${prefix}_outer_80`, points: 8 },
  { label: '月48時間以上80時間未満（1日2.4時間以上4時間未満）', value: `${prefix}_outer_48`, points: 7 },
];

/** 自営（農業含む） */
const selfEmploymentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_self_none`, points: 0 },
  { label: '月140時間以上（1日7時間以上の勤務）', value: `${prefix}_self_140`, points: 10 },
  { label: '月120時間以上140時間未満（1日6時間以上7時間未満）', value: `${prefix}_self_120`, points: 9 },
  { label: '月80時間以上120時間未満（1日4時間以上6時間未満）', value: `${prefix}_self_80`, points: 8 },
  { label: '月48時間以上80時間未満（1日2.4時間以上4時間未満）', value: `${prefix}_self_48`, points: 7 },
];

/** 内職 */
const pieceworkOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_piece_none`, points: 0 },
  { label: '月140時間以上の内職', value: `${prefix}_piece_140`, points: 7 },
  { label: '月120時間以上140時間未満', value: `${prefix}_piece_120`, points: 6 },
  { label: '月80時間以上120時間未満', value: `${prefix}_piece_80`, points: 5 },
  { label: '月48時間以上80時間未満', value: `${prefix}_piece_48`, points: 4 },
];

/** 就学 */
const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '月140時間以上の就学', value: `${prefix}_education_140`, points: 10 },
  { label: '月120時間以上140時間未満', value: `${prefix}_education_120`, points: 9 },
  { label: '月80時間以上120時間未満', value: `${prefix}_education_80`, points: 8 },
  { label: '月48時間以上80時間未満', value: `${prefix}_education_48`, points: 7 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  return [
    {
      id: `${prefix}_reason`,
      category,
      label: `${parentLabel}：保育が必要な理由`,
      helpText: 'いちばん近いものをひとつ選んでください',
      inputType: 'select',
      options: [
        { label: '外勤（会社員・パート等）', value: `${prefix}_reason_outer`, points: 0 },
        { label: '自営業・農業', value: `${prefix}_reason_self`, points: 0 },
        { label: '内職', value: `${prefix}_reason_piecework`, points: 0 },
        { label: '妊娠・出産', value: `${prefix}_reason_childbirth`, points: 0 },
        { label: '疾病', value: `${prefix}_reason_illness`, points: 0 },
        { label: '心身障害', value: `${prefix}_reason_disability`, points: 0 },
        { label: '親族の介護・看護', value: `${prefix}_reason_care`, points: 0 },
        { label: '災害復旧', value: `${prefix}_reason_disaster`, points: 0 },
        { label: '求職活動', value: `${prefix}_reason_jobseeking`, points: 0 },
        { label: '就学', value: `${prefix}_reason_education`, points: 0 },
        { label: '虐待・DV', value: `${prefix}_reason_dv`, points: 0 },
      ],
    },
    {
      id: `${prefix}_outer`,
      category,
      label: `${parentLabel}の外勤の就労時間（月）は？`,
      inputType: 'radio',
      options: outerEmploymentOptions(prefix),
    },
    {
      id: `${prefix}_self`,
      category,
      label: `${parentLabel}の自営業・農業の就労時間（月）は？`,
      inputType: 'radio',
      options: selfEmploymentOptions(prefix),
    },
    {
      id: `${prefix}_piecework`,
      category,
      label: `${parentLabel}の内職の状況は？`,
      inputType: 'radio',
      options: pieceworkOptions(prefix),
    },
    {
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}：妊娠中または出産後8週間以内ですか？`,
      inputType: 'radio',
      options: [
        { label: 'いいえ', value: `${prefix}_childbirth_no`, points: 0 },
        { label: 'はい', value: `${prefix}_childbirth_yes`, points: 10 },
      ],
    },
    {
      id: `${prefix}_illness`,
      category,
      label: `${parentLabel}の疾病・けがの状況は？`,
      inputType: 'radio',
      options: [
        { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
        { label: '常時入院または常時寝たきり', value: `${prefix}_illness_10`, points: 10 },
        { label: '上記以外で保育が困難な状態', value: `${prefix}_illness_5`, points: 5 },
      ],
    },
    {
      id: `${prefix}_disability`,
      category,
      label: `${parentLabel}の障害の状況は？`,
      inputType: 'radio',
      options: [
        { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
        { label: '身障1・2級 / 精神1・2級 / 療育手帳A', value: `${prefix}_disability_10`, points: 10 },
        { label: '身障3・4級 / 精神3級 / 療育手帳B', value: `${prefix}_disability_7`, points: 7 },
        { label: '上記以外で保育が困難な状態', value: `${prefix}_disability_5`, points: 5 },
      ],
    },
    {
      id: `${prefix}_care`,
      category,
      label: `${parentLabel}：親族の介護・看護をしていますか？`,
      inputType: 'radio',
      options: [
        { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
        { label: '常時入院または常時寝たきりの人を介護', value: `${prefix}_care_10a`, points: 10 },
        { label: '身障1・2級/精神1・2級/療育A/要介護4・5の人を介護', value: `${prefix}_care_10b`, points: 10 },
        { label: '身障3・4級/精神3級/療育B/要介護3の人を介護', value: `${prefix}_care_7`, points: 7 },
        { label: '上記以外で介助が必要な人（要介護1・2程度）を介護', value: `${prefix}_care_5`, points: 5 },
      ],
    },
    {
      id: `${prefix}_disaster`,
      category,
      label: `${parentLabel}：災害復旧にあたっていますか？`,
      inputType: 'radio',
      options: [
        { label: 'いいえ', value: `${prefix}_disaster_no`, points: 0 },
        { label: 'はい（震災・風水害・火災等の復旧のため）', value: `${prefix}_disaster_yes`, points: 10 },
      ],
    },
    {
      id: `${prefix}_jobseeking`,
      category,
      label: `${parentLabel}：求職活動または起業準備中ですか？`,
      inputType: 'radio',
      options: [
        { label: 'いいえ', value: `${prefix}_jobseeking_no`, points: 0 },
        { label: 'はい（昼間に外出することを常態）', value: `${prefix}_jobseeking_yes`, points: 2 },
      ],
    },
    {
      id: `${prefix}_education`,
      category,
      label: `${parentLabel}の就学時間（月）は？`,
      inputType: 'radio',
      options: educationOptions(prefix),
    },
    {
      id: `${prefix}_dv`,
      category,
      label: `${parentLabel}：虐待・DVを受けている、または受ける恐れがありますか？`,
      inputType: 'radio',
      options: [
        { label: 'いいえ', value: `${prefix}_dv_no`, points: 0 },
        { label: 'はい（児童相談所等が認める場合）', value: `${prefix}_dv_yes`, points: 20 },
      ],
    },
  ];
}

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親世帯ですか？',
    helpText: '母子・父子家庭（死亡・離別等）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_none', points: 0 },
      { label: 'はい（同居親族なし）', value: 'adj_single_parent_no_relative', points: 10 },
      { label: 'はい（同居親族あり）', value: 'adj_single_parent_with_relative', points: 8 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護を受けていますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい', value: 'adj_welfare_yes', points: 2 },
    ],
  },
  {
    id: 'adj_unemployment',
    category: 'adjustment',
    label: '生計中心者が失業しましたか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unemployment_no', points: 0 },
      { label: 'はい（就労の必要が高い）', value: 'adj_unemployment_yes', points: 5 },
    ],
  },
  {
    id: 'adj_child_disability',
    category: 'adjustment',
    label: '申請する子どもに障害がありますか？',
    helpText: '身体障害者手帳1・2・3級、療育手帳、精神障害者保健福祉手帳のいずれかの交付を受けている',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_child_disability_no', points: 0 },
      { label: 'はい', value: 'adj_child_disability_yes', points: 5 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: 'きょうだいが同じ保育園を希望しますか？',
    helpText: '兄弟姉妹（多胎児含む）が同一の保育園を希望する場合',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_no', points: 0 },
      { label: 'はい', value: 'adj_sibling_yes', points: 10 },
    ],
  },
  {
    id: 'adj_parental_leave',
    category: 'adjustment',
    label: '育休明け（または育休明け予定）ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_parental_leave_no', points: 0 },
      { label: 'はい', value: 'adj_parental_leave_yes', points: 1 },
    ],
  },
  {
    id: 'adj_nursery_staff',
    category: 'adjustment',
    label: '保育士・幼稚園教諭の資格を持つ保護者が市内保育園等に勤務（予定）ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_nursery_staff_no', points: 0 },
      { label: 'はい', value: 'adj_nursery_staff_yes', points: 4 },
    ],
  },
];

export const joetsuData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
