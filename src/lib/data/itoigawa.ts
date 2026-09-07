import type { MunicipalityData, Question } from '../types';

// -------------------------------------------------------------------------
// 糸魚川市 保育園入園 利用調整基準データ
// 出典: 糸魚川市「糸魚川市入園選考基準」
// https://www.city.itoigawa.lg.jp/uploaded/attachment/3502.pdf
// -------------------------------------------------------------------------
// 糸魚川市は原典の「1 選考方法」に手順が書かれている。
//   「保育の必要な事由・程度に応じた基準点と家庭の状況に応じた調整点を
//    合計した点数で優先順位を決定します。
//    なお、基準点は父母それぞれの状況で算出し、どちらかの低い点数を適用します。」
// 「低い点数を適用」により scoringMethod は 'min'。基準点の最大は10点。
//
// 原典で数値を出していない項目は選択肢にしていない。
// - 基準点「その他 上記に類する状態として認められるもの」（1〜10、幅がある）
// - 調整項目「その他（上記に類する状態として認められるもの）」（−5〜6、幅がある）
// -------------------------------------------------------------------------

const municipality = {
  id: 'itoigawa',
  name: '糸魚川市',
  slug: 'itoigawa',
  prefecture: '新潟県',
  maxBasePoints: 10,
  scoringMethod: 'min',
} as const;

// 就労
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月140時間以上（1日あたり7時間以上の勤務）', value: `${prefix}_employment_0`, points: 10 },
  { label: '月120時間以上（1日あたり6時間以上7時間未満勤務）', value: `${prefix}_employment_1`, points: 8 },
  { label: '月80時間以上（1日あたり4時間以上6時間未満勤務）', value: `${prefix}_employment_2`, points: 5 },
  { label: '月64時間以上（1日あたり3.2時間以上4時間未満勤務）', value: `${prefix}_employment_3`, points: 3 },
];

// 妊娠・出産
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '産前6週、産後8週間の期間にあって、出産の準備または休養を要する', value: `${prefix}_childbirth_0`, points: 10 },
];

// 疾病／障害
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '病気またはけがにより常時入院または常時寝たきりの常態', value: `${prefix}_illness_0`, points: 10 },
  { label: '要介護4以上／身体障害者手帳1・2級／精神障害者保健福祉手帳1・2級／療育手帳A', value: `${prefix}_illness_1`, points: 10 },
  { label: '要介護3／身体障害者手帳3級／精神障害者保健福祉手帳3級／療育手帳B', value: `${prefix}_illness_2`, points: 8 },
  { label: 'その他の疾病（診断書等により保育の実施を必要とされるもの）', value: `${prefix}_illness_3`, points: 5 },
  { label: '要介護2以下／身体障害者手帳4級以下', value: `${prefix}_illness_4`, points: 5 },
  { label: '要介護認定・各手帳の交付を受けているものと同程度の診断を受けている', value: `${prefix}_illness_5`, points: 3 },
];

// 親族の介護・看護
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '病気またはけがにより常時入院または常時寝たきりの常態の親族を介護・看護', value: `${prefix}_care_0`, points: 10 },
  { label: '要介護4以上／身体障害者手帳1・2級／精神障害者保健福祉手帳1・2級／療育手帳Aの親族を介護・看護', value: `${prefix}_care_1`, points: 10 },
  { label: '要介護3／身体障害者手帳3級／精神障害者保健福祉手帳3級／療育手帳Bの親族を介護・看護', value: `${prefix}_care_2`, points: 8 },
  { label: '要介護2以下／身体障害者手帳4級以下の親族を介護・看護', value: `${prefix}_care_3`, points: 5 },
  { label: '入院・通院、各認定・手帳と同程度の診断を受けている親族を介護・看護', value: `${prefix}_care_4`, points: 3 },
];

// 災害復旧
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '震災・風水害・火災その他の災害の復旧にあたっている', value: `${prefix}_disaster_0`, points: 10 },
];

// 求職活動
const jobseekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: 'ひとり親で求職活動中', value: `${prefix}_jobseeking_0`, points: 2 },
  { label: 'ひとり親以外で求職活動中', value: `${prefix}_jobseeking_1`, points: 1 },
];

// 就学
const schoolOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_school_none`, points: 0 },
  { label: '月140時間以上就学', value: `${prefix}_school_0`, points: 10 },
  { label: '月120時間以上就学', value: `${prefix}_school_1`, points: 8 },
  { label: '月80時間以上就学', value: `${prefix}_school_2`, points: 5 },
  { label: '月64時間以上就学', value: `${prefix}_school_3`, points: 3 },
];

// 虐待・DV
const abuseOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_abuse_none`, points: 0 },
  { label: '虐待やDVのおそれがある', value: `${prefix}_abuse_0`, points: 10 },
];

// 育児休業
const parentalLeaveOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_parental_leave_none`, points: 0 },
  { label: '既に保育を利用している子どもがいて継続利用が必要である', value: `${prefix}_parental_leave_0`, points: 2 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: '糸魚川市は父母それぞれの基準点のうち、低いほうを適用します',
    inputType: 'select',
    options: [
      { label: '就労', value: `${prefix}_reason_employment`, points: 0 },
      { label: '妊娠・出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '疾病・障害', value: `${prefix}_reason_illness`, points: 0 },
      { label: '親族の介護・看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '災害復旧', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '求職活動', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '就学', value: `${prefix}_reason_school`, points: 0 },
      { label: '虐待・DV', value: `${prefix}_reason_abuse`, points: 0 },
      { label: '育児休業', value: `${prefix}_reason_parental_leave`, points: 0 },
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
      label: `${parentLabel}の疾病・障害の状況は？`,
      inputType: 'radio',
      options: illnessOptions(prefix),
    },
    {
      id: `${prefix}_care`,
      category,
      label: `${parentLabel}の親族の介護・看護の状況は？`,
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
      label: `${parentLabel}は求職活動をしていますか？`,
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
      label: `${parentLabel}：虐待やDVのおそれがありますか？`,
      inputType: 'radio',
      options: abuseOptions(prefix),
    },
    {
      id: `${prefix}_parental_leave`,
      category,
      label: `${parentLabel}は育児休業中で継続利用が必要ですか？`,
      inputType: 'radio',
      options: parentalLeaveOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// 3 調整項目
const adjustmentQuestions: Question[] = [
  {
    id: 'adj_household',
    category: 'adjustment',
    label: '家庭の状況は？',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_household_0', points: 0 },
      { label: 'ひとり親世帯である（+6）', value: 'adj_household_1', points: 6 },
      { label: '生活保護世帯である（+6）', value: 'adj_household_2', points: 6 },
      { label: '児童に対する保護の必要性が関係機関で確認されている（+6）', value: 'adj_household_3', points: 6 },
      { label: '父母のどちらかが単身赴任している（+6）', value: 'adj_household_4', points: 6 },
    ],
  },
  {
    id: 'adj_nursery_staff',
    category: 'adjustment',
    label: '父母のどちらかが保育士等で保育施設等に就労していますか？',
    helpText: '市内施設で6時間以上勤務が対象です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_nursery_staff_0', points: 0 },
      { label: 'はい（+3）', value: 'adj_nursery_staff_1', points: 3 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: '同一の保育園に兄弟姉妹が入園していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_0', points: 0 },
      { label: 'はい（+3）', value: 'adj_sibling_1', points: 3 },
    ],
  },
  {
    id: 'adj_graduate',
    category: 'adjustment',
    label: '事業所内保育事業など地域型保育事業の卒園児童ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_graduate_0', points: 0 },
      { label: 'はい（+2）', value: 'adj_graduate_1', points: 2 },
    ],
  },
  {
    id: 'adj_child_disability',
    category: 'adjustment',
    label: '児童に障害がありますか？',
    helpText: '障害のある兄弟姉妹がいる場合も含みます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_child_disability_0', points: 0 },
      { label: 'はい（+2）', value: 'adj_child_disability_1', points: 2 },
    ],
  },
  {
    id: 'adj_fee_delinquent',
    category: 'adjustment',
    label: '保育料の滞納がありますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_fee_delinquent_0', points: 0 },
      { label: 'はい（−5）', value: 'adj_fee_delinquent_1', points: -5 },
    ],
  },
];

export const itoigawaData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
