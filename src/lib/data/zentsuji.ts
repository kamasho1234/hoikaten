import type { MunicipalityData, Question } from '../types';

// -------------------------------------------------------------------------
// 善通寺市 保育園入園 利用調整基準データ
// 出典: 善通寺市「善通寺市保育所利用調整点数表」
// https://www.city.zentsuji.kagawa.jp/uploaded/attachment/14591.pdf
// -------------------------------------------------------------------------
// 善通寺市は基本点数の見出しに
//   「※父母の合計点数が異なる場合は、いずれか低い方を合計点数とする。」
// とある。これにより scoringMethod は 'min'。基本点数の最大は12点。
// 調整点数は「（重複可）」と書かれているので、当てはまるものが重なる。
//
// 原典で数値を出していない項目は無い（すべて数が入っている）。
//
// 「前年度に保育所等を利用していた児童のうち、今年度の4月入所に係る
//  利用調整の結果、転園や待機となった児童」（+10）と「第1希望施設の場合」（+2）は、
// いま園を利用しているか・どの施設を希望するかで決まるもので、
// これから入園を目指す方の点数の目安とは性質が違うため入れていない。
// -------------------------------------------------------------------------

const municipality = {
  id: 'zentsuji',
  name: '善通寺市',
  slug: 'zentsuji',
  prefecture: '香川県',
  maxBasePoints: 12,
  scoringMethod: 'min',
} as const;

// 就労（予定を含む）
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '居宅外就労・自営業：月140時間以上の就労を常態とする', value: `${prefix}_employment_0`, points: 12 },
  { label: '居宅外就労・自営業：月120時間以上140時間未満', value: `${prefix}_employment_1`, points: 10 },
  { label: '居宅外就労・自営業：月80時間以上120時間未満', value: `${prefix}_employment_2`, points: 8 },
  { label: '居宅外就労・自営業：月48時間以上80時間未満', value: `${prefix}_employment_3`, points: 7 },
  { label: '内職：月140時間以上の就労を常態とする', value: `${prefix}_employment_4`, points: 9 },
  { label: '内職：月120時間以上140時間未満', value: `${prefix}_employment_5`, points: 8 },
  { label: '内職：月80時間以上120時間未満', value: `${prefix}_employment_6`, points: 7 },
  { label: '内職：月48時間以上80時間未満', value: `${prefix}_employment_7`, points: 6 },
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

// 疾病・障害
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '1か月以上の入院または入院見込み', value: `${prefix}_illness_0`, points: 12 },
  { label: '居宅内で常時臥床', value: `${prefix}_illness_1`, points: 12 },
  { label: '身体障害者手帳1〜2級／精神障害者保健福祉手帳1〜2級／療育手帳マルAまたはA／要介護度3〜5のいずれかに該当', value: `${prefix}_illness_2`, points: 12 },
  { label: '身体障害者手帳3級／精神障害者保健福祉手帳3級／療育手帳マルBまたはB／要介護度1〜2のいずれかに該当', value: `${prefix}_illness_3`, points: 10 },
  { label: '居宅内で1か月以上の安静を要すると診断された、または日常生活動作に支障をきたしている', value: `${prefix}_illness_4`, points: 8 },
  { label: '居宅内で上記以外で通院加療が必要', value: `${prefix}_illness_5`, points: 7 },
];

// 介護・看護
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '居宅内：全介護の場合', value: `${prefix}_care_0`, points: 9 },
  { label: '居宅内：身体障害者手帳1〜2級／精神障害者保健福祉手帳1〜2級／療育手帳マルAまたはA／要介護度3〜5のいずれかに該当', value: `${prefix}_care_1`, points: 9 },
  { label: '居宅外：週5日以上の付添看護（介護）', value: `${prefix}_care_2`, points: 8 },
  { label: '居宅外：週4日の付添看護（介護）', value: `${prefix}_care_3`, points: 7 },
  { label: '居宅外：週3日以下の付添看護（介護）', value: `${prefix}_care_4`, points: 6 },
  { label: '居宅内：一部介護の場合', value: `${prefix}_care_5`, points: 6 },
  { label: '居宅内：身体障害者手帳3級／精神障害者保健福祉手帳3級／療育手帳マルBまたはB／要介護度1〜2のいずれかに該当', value: `${prefix}_care_6`, points: 6 },
  { label: '居宅内：上記以外で通院加療が必要', value: `${prefix}_care_7`, points: 4 },
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
const abuseOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_abuse_none`, points: 0 },
  { label: '虐待やDVの恐れがある（児童相談所等の証明が必要）', value: `${prefix}_abuse_0`, points: 12 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: '善通寺市は父母の合計点数が異なる場合、いずれか低い方を合計点数とします',
    inputType: 'select',
    options: [
      { label: '就労（予定を含む）', value: `${prefix}_reason_employment`, points: 0 },
      { label: '就学', value: `${prefix}_reason_school`, points: 0 },
      { label: '妊娠・出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '疾病・障害', value: `${prefix}_reason_illness`, points: 0 },
      { label: '介護・看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '求職活動', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '災害', value: `${prefix}_reason_disaster`, points: 0 },
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
      label: `${parentLabel}：災害により保育ができませんか？`,
      inputType: 'radio',
      options: disasterOptions(prefix),
    },
    {
      id: `${prefix}_abuse`,
      category,
      label: `${parentLabel}：虐待やDVの恐れがありますか？`,
      inputType: 'radio',
      options: abuseOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// 調整点数（重複可）
const adjustmentQuestions: Question[] = [
  {
    id: 'adj_welfare_support',
    category: 'adjustment',
    label: '児童福祉法による支援が必要ですか？',
    helpText: '基本点数の「虐待・DV」との重複はできません',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_support_0', points: 0 },
      { label: '支援が必要な人（+10）', value: 'adj_welfare_support_1', points: 10 },
      { label: '支援が必要なおそれがある人（+9）', value: 'adj_welfare_support_2', points: 9 },
    ],
  },
  {
    id: 'adj_nursery_staff',
    category: 'adjustment',
    label: '保護者が保育士等であり、保育施設で就労または就労予定ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_nursery_staff_0', points: 0 },
      { label: 'はい（+3）', value: 'adj_nursery_staff_1', points: 3 },
    ],
  },
  {
    id: 'adj_graduate',
    category: 'adjustment',
    label: '地域型保育事業の終了児童ですか？',
    helpText: '連携施設に関する経過措置期間のみが対象です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_graduate_0', points: 0 },
      { label: 'はい（+5）', value: 'adj_graduate_1', points: 5 },
    ],
  },
  {
    id: 'adj_leave_return',
    category: 'adjustment',
    label: '産休・育休明けですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_leave_return_0', points: 0 },
      { label: 'はい（+2）', value: 'adj_leave_return_1', points: 2 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯ですか？',
    helpText: '就労が自立につながる場合が対象です',
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
    helpText: '児童扶養手当・ひとり親家庭等医療の認定が必要です',
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
    id: 'adj_other_welfare',
    category: 'adjustment',
    label: 'その他児童福祉の観点から保育の必要性が高いと認められますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_other_welfare_0', points: 0 },
      { label: 'はい（+2）', value: 'adj_other_welfare_1', points: 2 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: '在園児にきょうだい児がいますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_0', points: 0 },
      { label: 'はい（+1）', value: 'adj_sibling_1', points: 1 },
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

export const zentsujiData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
