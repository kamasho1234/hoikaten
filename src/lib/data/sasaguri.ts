import type { MunicipalityData, Question } from '../types';

// -------------------------------------------------------------------------
// 篠栗町 保育園入園 利用調整基準データ
// 出典: 篠栗町「篠栗町保育施設等利用調整指数表」（2025年4月1日利用調整分から）
// https://www.town.sasaguri.fukuoka.jp/material/files/group/34/r07_shisuu.pdf
// -------------------------------------------------------------------------
// 篠栗町は原典の冒頭に手順が書かれている。
//   「【1基礎指数】により、保護者の状況に応じて基本指数を設定する。」
//   「【2調整指数】により、該当する内容に応じて加点・減点。
//    基礎指数及び調整指数を合算した指数を総合指数とし、指数が高い世帯から調整を行う。」
//   基礎指数の備考1「基礎指数は、保護者のどちらか低い方とする。」
// 備考1により scoringMethod は 'min'。基礎指数の最大は20点（災害復旧、虐待・DV等）。
// 備考3「同一保護者で、大分類の項目が2つ以上該当する場合、指数の高い方を適用する。」
//
// なお【3優先基準】の2に「総合指数のうち【1基礎指数】が高い世帯（保護者合算）」とある。
// これは同一指数で並んだときの順位付けに使うもので、基礎指数そのものの決め方ではない
// （決め方は備考1の「どちらか低い方」）。
//
// 原典で指数が空欄の項目は選択肢にしていない。
// - 9 育休「保護者が育児休業を取得している在園児で、保育施設等を引き続き
//   利用することが必要であると認められる場合」（斜線）
//
// 次の3つは、この画面で扱う「入園の点数」とは性質が違うため入れていない。
// - 転園（町内の保育施設等を利用中の児童が転園を希望する場合）+5
// - 希望施設定員超過 −10（希望する施設の状況で決まる）
// - 広域申請（篠栗町外から広域で入所申請）−10
// -------------------------------------------------------------------------

const municipality = {
  id: 'sasaguri',
  name: '篠栗町',
  slug: 'sasaguri',
  prefecture: '福岡県',
  maxBasePoints: 20,
  scoringMethod: 'min',
} as const;

// 1 就労
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '被雇用者・自営（中心者）：1か月の勤務が160時間以上', value: `${prefix}_employment_0`, points: 15 },
  { label: '被雇用者・自営（中心者）：140時間以上160時間未満', value: `${prefix}_employment_1`, points: 14 },
  { label: '被雇用者・自営（中心者）：120時間以上140時間未満', value: `${prefix}_employment_2`, points: 13 },
  { label: '被雇用者・自営（中心者）：100時間以上120時間未満', value: `${prefix}_employment_3`, points: 12 },
  { label: '被雇用者・自営（中心者）：80時間以上100時間未満', value: `${prefix}_employment_4`, points: 11 },
  { label: '被雇用者・自営（中心者）：64時間以上80時間未満', value: `${prefix}_employment_5`, points: 10 },
  { label: '自営（協力者）：1か月の勤務が160時間以上', value: `${prefix}_employment_6`, points: 12 },
  { label: '自営（協力者）：140時間以上160時間未満', value: `${prefix}_employment_7`, points: 11 },
  { label: '自営（協力者）：120時間以上140時間未満', value: `${prefix}_employment_8`, points: 10 },
  { label: '自営（協力者）：100時間以上120時間未満', value: `${prefix}_employment_9`, points: 9 },
  { label: '自営（協力者）：80時間以上100時間未満', value: `${prefix}_employment_10`, points: 8 },
  { label: '自営（協力者）：64時間以上80時間未満', value: `${prefix}_employment_11`, points: 7 },
  { label: '就労予定（開業準備含む）：1か月の勤務が160時間以上', value: `${prefix}_employment_12`, points: 12 },
  { label: '就労予定（開業準備含む）：140時間以上160時間未満', value: `${prefix}_employment_13`, points: 11 },
  { label: '就労予定（開業準備含む）：120時間以上140時間未満', value: `${prefix}_employment_14`, points: 10 },
  { label: '就労予定（開業準備含む）：100時間以上120時間未満', value: `${prefix}_employment_15`, points: 9 },
  { label: '就労予定（開業準備含む）：80時間以上100時間未満', value: `${prefix}_employment_16`, points: 8 },
  { label: '就労予定（開業準備含む）：64時間以上80時間未満', value: `${prefix}_employment_17`, points: 7 },
  { label: '内職：1か月の勤務が160時間以上', value: `${prefix}_employment_18`, points: 12 },
  { label: '内職：140時間以上160時間未満', value: `${prefix}_employment_19`, points: 11 },
  { label: '内職：120時間以上140時間未満', value: `${prefix}_employment_20`, points: 10 },
  { label: '内職：100時間以上120時間未満', value: `${prefix}_employment_21`, points: 9 },
  { label: '内職：80時間以上100時間未満', value: `${prefix}_employment_22`, points: 7 },
  { label: '内職：64時間以上80時間未満', value: `${prefix}_employment_23`, points: 5 },
];

// 2 妊娠・出産
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '産前：出産予定日の6週前／産後：出産予定日と出産日のどちらか遅い方から8週後', value: `${prefix}_childbirth_0`, points: 12 },
];

// 3 疾病・障がい
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院・自宅療養安静', value: `${prefix}_illness_0`, points: 16 },
  { label: '保育が常時困難（身体障害者手帳1〜2級／精神障害者保健福祉手帳1級／療育手帳A）', value: `${prefix}_illness_1`, points: 15 },
  { label: '保育が著しく困難（身体障害者手帳3級／精神障害者保健福祉手帳2〜3級／療育手帳B）', value: `${prefix}_illness_2`, points: 14 },
  { label: '精神疾患', value: `${prefix}_illness_3`, points: 13 },
  { label: '通院・常時安静', value: `${prefix}_illness_4`, points: 13 },
  { label: '保育が困難（身体障害者手帳4〜6級）', value: `${prefix}_illness_5`, points: 13 },
  { label: '上記以外で保育が困難', value: `${prefix}_illness_6`, points: 9 },
];

// 4 介護・看護
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '入院または通院している親族に月120時間以上付き添い', value: `${prefix}_care_0`, points: 13 },
  { label: '月120時間以上の親族の看護・介護（居宅）', value: `${prefix}_care_1`, points: 13 },
  { label: '入院または通院している親族に月64時間以上120時間未満付き添い', value: `${prefix}_care_2`, points: 9 },
  { label: '月64時間以上120時間未満の親族の看護・介護（居宅）', value: `${prefix}_care_3`, points: 9 },
];

// 5 災害復旧
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '風水害、地震、火災等', value: `${prefix}_disaster_0`, points: 20 },
];

// 6 求職活動
const jobseekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動中（ひとり親、生活保護受給者等）', value: `${prefix}_jobseeking_0`, points: 8 },
  { label: '上記以外の求職活動中', value: `${prefix}_jobseeking_1`, points: 5 },
];

// 7 就学
const schoolOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_school_none`, points: 0 },
  { label: '通学：居宅外で120時間以上', value: `${prefix}_school_0`, points: 12 },
  { label: '通信教育：居宅内で120時間以上', value: `${prefix}_school_1`, points: 10 },
  { label: '通学：居宅外で120時間未満', value: `${prefix}_school_2`, points: 7 },
  { label: '通信教育：居宅内で120時間未満', value: `${prefix}_school_3`, points: 5 },
];

// 8 虐待・DV ／ 10 その他
const abuseOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_abuse_none`, points: 0 },
  { label: '虐待やDV、またはその恐れがあるとして町長が認めた', value: `${prefix}_abuse_0`, points: 20 },
  { label: '児童福祉の観点から、町長が特に保育の必要性が高いと判断した', value: `${prefix}_abuse_1`, points: 20 },
  { label: '両親が不存在（死亡・離別・行方不明・拘禁など）', value: `${prefix}_abuse_2`, points: 20 },
  { label: '保護者が育児休業を取得している等で、他の認定ができない', value: `${prefix}_abuse_3`, points: 5 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: '篠栗町の基礎指数は、保護者のどちらか低い方を使います。同一保護者で2つ以上該当する場合は指数の高い方を適用します',
    inputType: 'select',
    options: [
      { label: '就労', value: `${prefix}_reason_employment`, points: 0 },
      { label: '妊娠・出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '疾病・障がい', value: `${prefix}_reason_illness`, points: 0 },
      { label: '介護・看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '災害復旧', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '求職活動', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '就学', value: `${prefix}_reason_school`, points: 0 },
      { label: '虐待・DV・両親の不存在など', value: `${prefix}_reason_abuse`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の就労の状況は？`,
      helpText: '被雇用者・自営（中心者）には農業等を含みます',
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
      label: `${parentLabel}は災害復旧にあたっていますか？`,
      inputType: 'radio',
      options: disasterOptions(prefix),
    },
    {
      id: `${prefix}_jobseeking`,
      category,
      label: `${parentLabel}の求職活動の状況は？`,
      inputType: 'radio',
      options: jobseekingOptions(prefix),
    },
    {
      id: `${prefix}_school`,
      category,
      label: `${parentLabel}の就学の状況は？`,
      inputType: 'radio',
      options: schoolOptions(prefix),
    },
    {
      id: `${prefix}_abuse`,
      category,
      label: `${parentLabel}：虐待・DV・両親の不存在などがありますか？`,
      inputType: 'radio',
      options: abuseOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// 【2調整指数】
const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親家庭ですか？',
    helpText: '離婚・未婚・死別等が対象です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_0', points: 0 },
      { label: 'はい（+8）', value: 'adj_single_parent_1', points: 8 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_0', points: 0 },
      { label: 'はい（+3）', value: 'adj_welfare_1', points: 3 },
    ],
  },
  {
    id: 'adj_unemployed',
    category: 'adjustment',
    label: '家計の主宰者の自己都合以外の失業等により、就労の必要性が高いですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unemployed_0', points: 0 },
      { label: 'はい（+4）', value: 'adj_unemployed_1', points: 4 },
    ],
  },
  {
    id: 'adj_social_care',
    category: 'adjustment',
    label: '社会的養護の支援をする必要があると判断される世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_social_care_0', points: 0 },
      { label: 'はい（+8）', value: 'adj_social_care_1', points: 8 },
    ],
  },
  {
    id: 'adj_child_disability',
    category: 'adjustment',
    label: '入所希望児童に障がいがありますか？',
    helpText: '集団保育が可能な場合に限ります',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_child_disability_0', points: 0 },
      { label: 'はい（+4）', value: 'adj_child_disability_1', points: 4 },
    ],
  },
  {
    id: 'adj_leave_return',
    category: 'adjustment',
    label: '育児休業取得時に篠栗町内の保育施設等を退所した児童がいますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_leave_return_0', points: 0 },
      { label: 'はい（+5）', value: 'adj_leave_return_1', points: 5 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: 'きょうだいの状況は？',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_sibling_0', points: 0 },
      { label: '希望する保育施設等をすでにきょうだい児が利用している（+5）', value: 'adj_sibling_1', points: 5 },
      { label: 'きょうだい児が同時に申し込む（+2）', value: 'adj_sibling_2', points: 2 },
      { label: 'きょうだいが3人以上いる（年齢は問わない）（+2）', value: 'adj_sibling_3', points: 2 },
    ],
  },
  {
    id: 'adj_graduate',
    category: 'adjustment',
    label: '小規模保育事業等の卒園児童ですか？',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_graduate_0', points: 0 },
      { label: '連携施設以外の卒園児童が、引き続き保育施設等を利用希望する（+2）', value: 'adj_graduate_1', points: 2 },
      { label: '企業主導型事業の施設を利用している児童が、保育施設等を利用希望する（3歳児以上に限る）（+2）', value: 'adj_graduate_2', points: 2 },
    ],
  },
  {
    id: 'adj_tanshin',
    category: 'adjustment',
    label: '保護者の一方が不在ですか？',
    helpText: '単身赴任、海外勤務等が対象です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_tanshin_0', points: 0 },
      { label: 'はい（+2）', value: 'adj_tanshin_1', points: 2 },
    ],
  },
  {
    id: 'adj_nursery_staff',
    category: 'adjustment',
    label: '保護者の一方が保育士・幼稚園教諭ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_nursery_staff_0', points: 0 },
      { label: '1か月の勤務が120時間以上ある、またはその予定（+8）', value: 'adj_nursery_staff_1', points: 8 },
      { label: '1か月の勤務が64時間以上120時間未満ある、またはその予定（+3）', value: 'adj_nursery_staff_2', points: 3 },
      { label: '篠栗町内の保育施設等で勤務している、またはその予定（+3）', value: 'adj_nursery_staff_3', points: 3 },
    ],
  },
  {
    id: 'adj_waiting',
    category: 'adjustment',
    label: '待機児童のいる世帯ですか？',
    helpText: '4月入所のみ適用されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_waiting_0', points: 0 },
      { label: '12か月以上（+5）', value: 'adj_waiting_1', points: 5 },
      { label: '6か月以上12か月未満（+3）', value: 'adj_waiting_2', points: 3 },
      { label: '1か月以上6か月未満（+2）', value: 'adj_waiting_3', points: 2 },
    ],
  },
  {
    id: 'adj_family_requirement',
    category: 'adjustment',
    label: '同居親族が保育要件を満たしていませんか？',
    helpText: '18歳以上65歳未満が対象です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_family_requirement_0', points: 0 },
      { label: 'はい（−5）', value: 'adj_family_requirement_1', points: -5 },
    ],
  },
  {
    id: 'adj_unapplied_child',
    category: 'adjustment',
    label: '未申請児童がいる世帯ですか？',
    helpText: '要介護児童および生後6か月未満の児童を除きます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unapplied_child_0', points: 0 },
      { label: 'はい（−5）', value: 'adj_unapplied_child_1', points: -5 },
    ],
  },
  {
    id: 'adj_late_docs',
    category: 'adjustment',
    label: '未提出の書類がありますか？',
    helpText: 'マイナンバーに関する書類は除きます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_late_docs_0', points: 0 },
      { label: 'はい（−5）', value: 'adj_late_docs_1', points: -5 },
    ],
  },
];

export const sasaguriData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
