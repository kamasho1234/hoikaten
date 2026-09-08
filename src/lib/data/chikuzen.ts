import type { MunicipalityData, Question } from '../types';

// -------------------------------------------------------------------------
// 筑前町 保育園入園 利用調整基準データ
// 出典: 筑前町「筑前町保育利用選考基準」（令和8年度分）
// https://www.town.chikuzen.fukuoka.jp/S042/190/8sennkoukizyunn.pdf
// -------------------------------------------------------------------------
// 筑前町は原典の冒頭に
//   「選考に当たっては、基準点と調整点との合計を基本とし、総合的に判断します。」
// とあり、基準点の表は「父」「母」それぞれの列に点数が並ぶ。
// 原典は父母の合わせ方を書いていないため、
// 全国で最も多い形（父母それぞれの点数を合算）に合わせて scoringMethod は 'sum' とした。
// 基準点の最大は1人あたり20点。
//
// 「就学及び職業訓練」は「※就労の被雇用者を準用」とあり単独の数が無いため、
// 就労の設問で答える形にしている。
// 「高齢者（保護者が65歳以上）」も「※疾病・障がいの通院・自宅療養の点数を準用」
// とあるが、こちらは18点と数が示されているので選択肢にしている。
//
// 「特別な支援が必要（児童福祉の観点から、特に保育の必要性が高いと判断した場合）」の
// 100点は父母の列が分かれておらず世帯に付く点なので、調整の設問として持たせている。
//
// 「転園希望（在園児）」（+3／−3）は、いま園を利用している方が別の園に移る話で、
// これから入園を目指す方の点数とは性質が違うため入れていない。
// -------------------------------------------------------------------------

const municipality = {
  id: 'chikuzen',
  name: '筑前町',
  slug: 'chikuzen',
  prefecture: '福岡県',
  maxBasePoints: 20,
  scoringMethod: 'sum',
} as const;

// 就労（就学および職業訓練も被雇用者を準用）
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '被雇用者：月160時間以上の就労', value: `${prefix}_employment_0`, points: 20 },
  { label: '被雇用者：月140時間以上160時間未満の就労', value: `${prefix}_employment_1`, points: 19 },
  { label: '被雇用者：月120時間以上140時間未満の就労', value: `${prefix}_employment_2`, points: 18 },
  { label: '被雇用者：月100時間以上120時間未満の就労', value: `${prefix}_employment_3`, points: 17 },
  { label: '被雇用者：月80時間以上100時間未満の就労', value: `${prefix}_employment_4`, points: 16 },
  { label: '被雇用者：月64時間以上80時間未満の就労', value: `${prefix}_employment_5`, points: 15 },
  { label: '自営業（事業主）：月160時間以上の就労', value: `${prefix}_employment_6`, points: 20 },
  { label: '自営業（事業主）：月140時間以上160時間未満の就労', value: `${prefix}_employment_7`, points: 19 },
  { label: '自営業（事業主）：月120時間以上140時間未満の就労', value: `${prefix}_employment_8`, points: 18 },
  { label: '自営業（事業主）：月100時間以上120時間未満の就労', value: `${prefix}_employment_9`, points: 17 },
  { label: '自営業（事業主）：月80時間以上100時間未満の就労', value: `${prefix}_employment_10`, points: 16 },
  { label: '自営業（事業主）：月64時間以上80時間未満の就労', value: `${prefix}_employment_11`, points: 15 },
  { label: '自営業（家族協力者・専従者）：月160時間以上の就労', value: `${prefix}_employment_12`, points: 18 },
  { label: '自営業（家族協力者・専従者）：月140時間以上160時間未満の就労', value: `${prefix}_employment_13`, points: 17 },
  { label: '自営業（家族協力者・専従者）：月120時間以上140時間未満の就労', value: `${prefix}_employment_14`, points: 16 },
  { label: '自営業（家族協力者・専従者）：月100時間以上120時間未満の就労', value: `${prefix}_employment_15`, points: 15 },
  { label: '自営業（家族協力者・専従者）：月80時間以上100時間未満の就労', value: `${prefix}_employment_16`, points: 14 },
  { label: '自営業（家族協力者・専従者）：月64時間以上80時間未満の就労', value: `${prefix}_employment_17`, points: 13 },
  { label: '農業（耕作主）：月160時間以上の就労', value: `${prefix}_employment_18`, points: 20 },
  { label: '農業（耕作主）：月140時間以上160時間未満の就労', value: `${prefix}_employment_19`, points: 19 },
  { label: '農業（耕作主）：月120時間以上140時間未満の就労', value: `${prefix}_employment_20`, points: 18 },
  { label: '農業（耕作主）：月100時間以上120時間未満の就労', value: `${prefix}_employment_21`, points: 17 },
  { label: '農業（耕作主）：月80時間以上100時間未満の就労', value: `${prefix}_employment_22`, points: 16 },
  { label: '農業（耕作主）：月64時間以上80時間未満の就労', value: `${prefix}_employment_23`, points: 15 },
  { label: '農業（家族協力者・専従者）：月160時間以上の就労', value: `${prefix}_employment_24`, points: 18 },
  { label: '農業（家族協力者・専従者）：月140時間以上160時間未満の就労', value: `${prefix}_employment_25`, points: 17 },
  { label: '農業（家族協力者・専従者）：月120時間以上140時間未満の就労', value: `${prefix}_employment_26`, points: 16 },
  { label: '農業（家族協力者・専従者）：月100時間以上120時間未満の就労', value: `${prefix}_employment_27`, points: 15 },
  { label: '農業（家族協力者・専従者）：月80時間以上100時間未満の就労', value: `${prefix}_employment_28`, points: 14 },
  { label: '農業（家族協力者・専従者）：月64時間以上80時間未満の就労', value: `${prefix}_employment_29`, points: 13 },
  { label: '内職：月120時間以上の就労', value: `${prefix}_employment_30`, points: 18 },
  { label: '内職：月64時間以上120時間未満の就労', value: `${prefix}_employment_31`, points: 16 },
];

// 介護・看護
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '通院・入院付添：概ね1か月以上、親族（2親等以内）に週3回以上付添する（介護施設除く）', value: `${prefix}_care_0`, points: 14 },
  { label: '同居宅内：同居の親族（2親等以内）を長期居宅療養等で常時介護（看護）している', value: `${prefix}_care_1`, points: 14 },
  { label: '別居宅内：別居の親族（2親等以内）を長期居宅療養等で常時介護（看護）している', value: `${prefix}_care_2`, points: 12 },
];

// 出産（母のみ）
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産予定日の8週間前から出産日の8週間後の月末まで', value: `${prefix}_childbirth_0`, points: 18 },
];

// 疾病・障がい ／ 高齢者
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院中（1か月以上・見込含む）', value: `${prefix}_illness_0`, points: 20 },
  { label: '身体障害者手帳1・2級、療育手帳A、精神障害者保健福祉手帳1級', value: `${prefix}_illness_1`, points: 20 },
  { label: '通院・自宅療養で、医師の診断により常時保育ができない', value: `${prefix}_illness_2`, points: 18 },
  { label: '保護者が65歳以上（就労の有無は問わない）', value: `${prefix}_illness_3`, points: 18 },
  { label: '身体障害者手帳3・4級、療育手帳B、精神障害者保健福祉手帳2級', value: `${prefix}_illness_4`, points: 16 },
  { label: '身体障害者手帳5・6級、精神障害者保健福祉手帳3級', value: `${prefix}_illness_5`, points: 12 },
];

// 災害
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '災害等の復旧にあたっている', value: `${prefix}_disaster_0`, points: 20 },
];

// 求職活動
const jobseekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動中（入所日から3か月後の月末まで）', value: `${prefix}_jobseeking_0`, points: 5 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: '筑前町は父・母それぞれに基準点が付きます',
    inputType: 'select',
    options: [
      { label: '就労（就学・職業訓練も同じ基準）', value: `${prefix}_reason_employment`, points: 0 },
      { label: '介護・看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '疾病・障がい・高齢', value: `${prefix}_reason_illness`, points: 0 },
      { label: '災害', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '求職活動', value: `${prefix}_reason_jobseeking`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の就労の状況は？`,
      helpText: '就学および職業訓練は、就労の被雇用者の点数を準用します',
      inputType: 'radio',
      options: employmentOptions(prefix),
    },
    {
      id: `${prefix}_care`,
      category,
      label: `${parentLabel}の介護・看護の状況は？`,
      inputType: 'radio',
      options: careOptions(prefix),
    },
    {
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}の出産の状況は？`,
      helpText: '原典では母のみに点数が付く区分です',
      inputType: 'radio',
      options: childbirthOptions(prefix),
    },
    {
      id: `${prefix}_illness`,
      category,
      label: `${parentLabel}の疾病・障がい・高齢の状況は？`,
      inputType: 'radio',
      options: illnessOptions(prefix),
    },
    {
      id: `${prefix}_disaster`,
      category,
      label: `${parentLabel}は災害等の復旧にあたっていますか？`,
      inputType: 'radio',
      options: disasterOptions(prefix),
    },
    {
      id: `${prefix}_jobseeking`,
      category,
      label: `${parentLabel}は求職活動中ですか？`,
      inputType: 'radio',
      options: jobseekingOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// 2. 調整点
const adjustmentQuestions: Question[] = [
  {
    id: 'adj_special_support',
    category: 'adjustment',
    label: '児童福祉の観点から、特に保育の必要性が高いと判断されますか？',
    helpText: '関係機関からの意見書等が必要です。基準点の表では世帯に付く点として100点が示されています',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_special_support_0', points: 0 },
      { label: 'はい（+100）', value: 'adj_special_support_1', points: 100 },
    ],
  },
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親家庭ですか？',
    helpText: '母子家庭・父子家庭・またはそれに類する世帯が対象です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_0', points: 0 },
      { label: 'はい（+32）', value: 'adj_single_parent_1', points: 32 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_0', points: 0 },
      { label: 'はい（+10）', value: 'adj_welfare_1', points: 10 },
    ],
  },
  {
    id: 'adj_graduate',
    category: 'adjustment',
    label: '卒園児ですか？',
    helpText: '町内施設に限ります（卒園後、待機となった場合を含む）',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_graduate_0', points: 0 },
      { label: '地域型保育事業の卒園児（+20）', value: 'adj_graduate_1', points: 20 },
      { label: '認可外保育施設（企業主導型・届出保育施設等）の卒園児（+8）', value: 'adj_graduate_2', points: 8 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: '兄弟姉妹の状況は？',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_sibling_0', points: 0 },
      { label: '入所申込児の兄弟姉妹が在園中（新規入所時に限る。弟妹の入所時に卒園予定児童は除く）（+18）', value: 'adj_sibling_1', points: 18 },
      { label: '保育所等に未入所の兄弟姉妹が同時に申込をした（+2）', value: 'adj_sibling_2', points: 2 },
    ],
  },
  {
    id: 'adj_leave_return',
    category: 'adjustment',
    label: '育児休業明けですか？',
    helpText: '休業の対象児童に限ります。前年度中に育休復帰し、認可保育所への申込をしたが入所できなかった場合を含みます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_leave_return_0', points: 0 },
      { label: 'はい（+5）', value: 'adj_leave_return_1', points: 5 },
    ],
  },
  {
    id: 'adj_child_disability',
    category: 'adjustment',
    label: '入所申込児が集団保育が可能とされた障がい児ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_child_disability_0', points: 0 },
      { label: 'はい（+3）', value: 'adj_child_disability_1', points: 3 },
    ],
  },
  {
    id: 'adj_nursery_staff',
    category: 'adjustment',
    label: '父または母が保育士ですか？',
    helpText: '新規入所時に限ります（見込を含む）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_nursery_staff_0', points: 0 },
      { label: '町内の認可保育施設で1か月の勤務が120時間以上（+50）', value: 'adj_nursery_staff_1', points: 50 },
      { label: '町内の認可保育施設で1か月の勤務が120時間未満（+30）', value: 'adj_nursery_staff_2', points: 30 },
      { label: '町内の認可外保育施設で勤務している（+5）', value: 'adj_nursery_staff_3', points: 5 },
    ],
  },
  {
    id: 'adj_declined',
    category: 'adjustment',
    label: '申請可能な施設を全て希望していて入所を辞退しましたか？',
    helpText: '当年度限りの減点です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_declined_0', points: 0 },
      { label: 'はい（−5）', value: 'adj_declined_1', points: -5 },
    ],
  },
];

export const chikuzenData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
