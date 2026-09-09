import type { MunicipalityData, Question } from '../types';

// -------------------------------------------------------------------------
// 多度津町 保育園入園 利用調整基準データ
// 出典: 多度津町「多度津町保育所利用調整点数表」
// https://www.town.tadotsu.kagawa.jp/material/files/group/8/cyouseitensu.pdf
// -------------------------------------------------------------------------
// 多度津町は基本点数の表の冒頭に父母の合わせ方が書かれている。
//   「※父母の合計点数が異なる場合は、いずれか低い方を合計点数とする。」
// 「いずれか低い方」により scoringMethod は 'min'。
// 基本点数の最大は12点。
// 調整点数の表には「（重複可）」と書かれているので、該当するものはすべて加減点する。
//
// 「育児休業」（3点）は「育児休業時に既に保育所（園）を利用し、続けて利用する場合」で、
// いま園を利用している方の話なので基本点数の選択肢に入れていない。
//
// 調整点数の「その他児童福祉の観点から保育の必要性が高いと認められる場合」（+2）は、
// 該当するかどうかが町の判断によるので入れていない。
// -------------------------------------------------------------------------

const municipality = {
  id: 'tadotsu',
  name: '多度津町',
  slug: 'tadotsu',
  prefecture: '香川県',
  maxBasePoints: 12,
  scoringMethod: 'min',
} as const;

// 就労（居宅外就労・自営業 ／ 内職）
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '居宅外就労・自営業：月140時間以上の就労を常態とする', value: `${prefix}_employment_0`, points: 12 },
  { label: '居宅外就労・自営業：月120時間以上140時間未満の就労を常態とする', value: `${prefix}_employment_1`, points: 10 },
  { label: '内職：月140時間以上の就労を常態とする', value: `${prefix}_employment_2`, points: 9 },
  { label: '居宅外就労・自営業：月80時間以上120時間未満の就労を常態とする', value: `${prefix}_employment_3`, points: 8 },
  { label: '内職：月120時間以上140時間未満の就労を常態とする', value: `${prefix}_employment_4`, points: 8 },
  { label: '居宅外就労・自営業：月48時間以上80時間未満の就労を常態とする', value: `${prefix}_employment_5`, points: 7 },
  { label: '内職：月80時間以上120時間未満の就労を常態とする', value: `${prefix}_employment_6`, points: 7 },
  { label: '内職：月48時間以上80時間未満の就労を常態とする', value: `${prefix}_employment_7`, points: 6 },
];

// 就学
const schoolOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_school_none`, points: 0 },
  { label: '月140時間以上の就学を常態とする', value: `${prefix}_school_0`, points: 10 },
  { label: '月120時間以上140時間未満の就学を常態とする', value: `${prefix}_school_1`, points: 9 },
  { label: '月80時間以上120時間未満の就学を常態とする', value: `${prefix}_school_2`, points: 8 },
  { label: '月48時間以上80時間未満の就学を常態とする', value: `${prefix}_school_3`, points: 7 },
];

// 妊娠・出産
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産のため保育ができない', value: `${prefix}_childbirth_0`, points: 10 },
];

// 疾病
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院：1か月以上の入院または入院見込み', value: `${prefix}_illness_0`, points: 12 },
  { label: '居宅内：常時臥床', value: `${prefix}_illness_1`, points: 12 },
  { label: '心身障害：身体障害者手帳1〜2級、精神障害者保健福祉手帳1〜2級、療育手帳Ⓐ・A、要介護度3〜5のいずれかに該当', value: `${prefix}_illness_2`, points: 12 },
  { label: '心身障害：身体障害者手帳3級、精神障害者保健福祉手帳3級、療育手帳Ⓑ・B、要介護度1〜2のいずれかに該当', value: `${prefix}_illness_3`, points: 10 },
  { label: '居宅内：1か月以上の安静を要すると診断された、または日常生活動作に支障をきたしている', value: `${prefix}_illness_4`, points: 8 },
  { label: '居宅内：上記以外で通院加療が必要', value: `${prefix}_illness_5`, points: 7 },
  { label: '心身障害：身体障害者手帳4〜6級、要介護度が要支援のいずれかに該当', value: `${prefix}_illness_6`, points: 7 },
];

// 介護・看護
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '居宅内：全介護', value: `${prefix}_care_0`, points: 9 },
  { label: '居宅内：身体障害者手帳1〜2級、精神障害者保健福祉手帳1〜2級、療育手帳Ⓐ・A、要介護度3〜5のいずれかに該当', value: `${prefix}_care_1`, points: 9 },
  { label: '居宅外：週5日以上の付添看護（介護）', value: `${prefix}_care_2`, points: 8 },
  { label: '居宅外：週4日の付添看護（介護）', value: `${prefix}_care_3`, points: 7 },
  { label: '居宅外：週3日以内の付添看護（介護）', value: `${prefix}_care_4`, points: 6 },
  { label: '居宅内：一部介護', value: `${prefix}_care_5`, points: 6 },
  { label: '居宅内：身体障害者手帳3級、精神障害者保健福祉手帳3級、療育手帳Ⓑ・B、要介護度1〜2のいずれかに該当', value: `${prefix}_care_6`, points: 6 },
  { label: '居宅内：上記以外で通院加療が必要', value: `${prefix}_care_7`, points: 4 },
  { label: '居宅内：身体障害者手帳4〜6級、要介護度が要支援のいずれかに該当', value: `${prefix}_care_8`, points: 3 },
];

// 求職活動
const jobseekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動中のため日中の外出を常態とする', value: `${prefix}_jobseeking_0`, points: 3 },
];

// 災害
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '災害により、復興活動を要するために保育ができない', value: `${prefix}_disaster_0`, points: 12 },
];

// 虐待・DV
const dvOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_dv_none`, points: 0 },
  { label: '虐待やDVの恐れがある（児童相談所等の証明が必要）', value: `${prefix}_dv_0`, points: 12 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: '父母の合計点数が異なる場合は、いずれか低い方が合計点数になります',
    inputType: 'select',
    options: [
      { label: '就労', value: `${prefix}_reason_employment`, points: 0 },
      { label: '就学', value: `${prefix}_reason_school`, points: 0 },
      { label: '妊娠・出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '疾病', value: `${prefix}_reason_illness`, points: 0 },
      { label: '介護・看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '求職活動', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '災害', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '虐待・DV', value: `${prefix}_reason_dv`, points: 0 },
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
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}の妊娠・出産の状況は？`,
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
      inputType: 'radio',
      options: careOptions(prefix),
    },
    {
      id: `${prefix}_jobseeking`,
      category,
      label: `${parentLabel}は求職活動中ですか？`,
      inputType: 'radio',
      options: jobseekingOptions(prefix),
    },
    {
      id: `${prefix}_disaster`,
      category,
      label: `${parentLabel}は災害の復興活動に当たっていますか？`,
      inputType: 'radio',
      options: disasterOptions(prefix),
    },
    {
      id: `${prefix}_dv`,
      category,
      label: `${parentLabel}の世帯に虐待やDVの恐れがありますか？`,
      inputType: 'radio',
      options: dvOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// 調整点数（重複可）
const adjustmentQuestions: Question[] = [
  {
    id: 'adj_jidou_fukushi',
    category: 'adjustment',
    label: '児童福祉法による支援が必要ですか？',
    helpText: '基本点数の「虐待・DV」とは重複しません',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_jidou_fukushi_0', points: 0 },
      { label: '支援が必要な人（+10）', value: 'adj_jidou_fukushi_1', points: 10 },
      { label: '支援が必要なおそれがある人（+9）', value: 'adj_jidou_fukushi_2', points: 9 },
    ],
  },
  {
    id: 'adj_hoikushi',
    category: 'adjustment',
    label: '保護者が保育士等であり、保育施設で就労または就労予定ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_hoikushi_0', points: 0 },
      { label: 'はい（+3）', value: 'adj_hoikushi_1', points: 3 },
    ],
  },
  {
    id: 'adj_chiikigata',
    category: 'adjustment',
    label: '地域型保育事業の修了児童ですか？',
    helpText: '連携施設に関する経過措置期間のみが対象です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_chiikigata_0', points: 0 },
      { label: 'はい（+5）', value: 'adj_chiikigata_1', points: 5 },
    ],
  },
  {
    id: 'adj_return_to_work',
    category: 'adjustment',
    label: '産休・育休明けですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_return_to_work_0', points: 0 },
      { label: 'はい（+2）', value: 'adj_return_to_work_1', points: 2 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯（就労が自立につながる場合）ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_0', points: 0 },
      { label: 'はい（+2）', value: 'adj_welfare_1', points: 2 },
    ],
  },
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親家庭ですか？',
    helpText: '児童扶養手当の認定が必要です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_0', points: 0 },
      { label: 'はい（+3）', value: 'adj_single_parent_1', points: 3 },
    ],
  },
  {
    id: 'adj_multiple_birth',
    category: 'adjustment',
    label: '多胎児ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_multiple_birth_0', points: 0 },
      { label: 'はい（+2）', value: 'adj_multiple_birth_1', points: 2 },
    ],
  },
  {
    id: 'adj_fee_delinquent',
    category: 'adjustment',
    label: '本人またはきょうだい児に保育料の滞納があり、納付相談や納付約束の履行をしていませんか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_fee_delinquent_0', points: 0 },
      { label: 'はい（−2）', value: 'adj_fee_delinquent_1', points: -2 },
    ],
  },
];

export const tadotsuData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
