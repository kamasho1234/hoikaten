import type { MunicipalityData, Question } from '../types';

// -------------------------------------------------------------------------
// 浦河町 保育園入園 利用調整基準データ
// 出典: 浦河町「（別表）浦河町保育所入所選考基準表」
// https://www.town.urakawa.hokkaido.jp/assets/images/content/content_20260123_112854.pdf
// -------------------------------------------------------------------------
// 浦河町は別表の備考に父母の合わせ方が書かれている。
//   「1 基準点数の設定は、父母いずれかの低い方とする。」
//   「2 入所要件が2項目以上にわたる場合は、基準点数の高い方とする。」
//   「3 選考基準表（調整分）の調整に該当する場合は、
//      その該当事項に対応する調整点数を加算、減算する。」
// 「父母いずれかの低い方」により scoringMethod は 'min'。
// 基準点数の最大は10点。
//
// (7)その他「町長が認める前各号に類する場合」は点数欄が「−」なので入れていない。
//
// 調整分の減算2項目は、原典で「（2）減算」の区分に置かれているため、
// 書かれているとおり減点として扱っている（項目名も原典のまま）。
// -------------------------------------------------------------------------

const municipality = {
  id: 'urakawa',
  name: '浦河町',
  slug: 'urakawa',
  prefecture: '北海道',
  maxBasePoints: 10,
  scoringMethod: 'min',
} as const;

// (1)家庭外労働 ／ (2)家庭内労働
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '家庭外労働（常勤）：1日の労働時間が7時間以上', value: `${prefix}_employment_0`, points: 10 },
  { label: '家庭外労働（自営・本人）：1日の労働時間が7時間以上', value: `${prefix}_employment_1`, points: 10 },
  { label: '家庭外労働（非常勤）：1日の労働時間が7時間以上', value: `${prefix}_employment_2`, points: 9 },
  { label: '家庭外労働（自営・家族）：1日の労働時間が7時間以上', value: `${prefix}_employment_3`, points: 9 },
  { label: '家庭内労働（自営・本人）：1日の労働時間が7時間以上', value: `${prefix}_employment_4`, points: 9 },
  { label: '家庭内労働（自営・家族）：1日の労働時間が7時間以上', value: `${prefix}_employment_5`, points: 8 },
  { label: '家庭外労働（非常勤）：1日の労働時間が4時間以上', value: `${prefix}_employment_6`, points: 7 },
  { label: '家庭外労働（自営・本人）：1日の労働時間が4時間以上', value: `${prefix}_employment_7`, points: 7 },
  { label: '家庭外労働（自営・家族）：1日の労働時間が4時間以上', value: `${prefix}_employment_8`, points: 7 },
  { label: '家庭内労働（自営・本人）：1日の労働時間が4時間以上', value: `${prefix}_employment_9`, points: 7 },
  { label: '家庭内労働（自営・家族）：1日の労働時間が4時間以上', value: `${prefix}_employment_10`, points: 6 },
  { label: '家庭外労働（非常勤）：1日の労働時間が4時間未満', value: `${prefix}_employment_11`, points: 5 },
  { label: '家庭外労働（自営・本人）：1日の労働時間が4時間未満', value: `${prefix}_employment_12`, points: 5 },
  { label: '家庭内労働（自営・本人）：1日の労働時間が4時間未満', value: `${prefix}_employment_13`, points: 5 },
  { label: '家庭外労働（自営・家族）：1日の労働時間が4時間未満', value: `${prefix}_employment_14`, points: 4 },
  { label: '家庭内労働（内職）：1日の労働時間が4時間以上', value: `${prefix}_employment_15`, points: 4 },
  { label: '家庭内労働（自営・家族）：1日の労働時間が4時間未満', value: `${prefix}_employment_16`, points: 3 },
];

// (1)求職中
const jobseekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動のため、日中外出を状態としている（2ヶ月）', value: `${prefix}_jobseeking_0`, points: 3 },
];

// (1)就学等
const schoolOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_school_none`, points: 0 },
  { label: '就学・技術習得のため各種学校へ通学している', value: `${prefix}_school_0`, points: 4 },
];

// (3)親のいない家庭
const absentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_absent_none`, points: 0 },
  { label: '死亡・行方不明、拘禁などにより保護者がいない', value: `${prefix}_absent_0`, points: 10 },
];

// (4)出産
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産月又は予定月の前2ヶ月後4ヶ月', value: `${prefix}_childbirth_0`, points: 10 },
];

// (4)傷病・障害等の手帳を有する者
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '傷病（入院）：1ヶ月を超える入院', value: `${prefix}_illness_0`, points: 10 },
  { label: '傷病（療養）：1ヶ月を超える臥床（常時）', value: `${prefix}_illness_1`, points: 10 },
  { label: '障害等：身体障害者手帳1級・2級', value: `${prefix}_illness_2`, points: 10 },
  { label: '障害等：精神障害1級', value: `${prefix}_illness_3`, points: 10 },
  { label: '障害等：療育手帳A', value: `${prefix}_illness_4`, points: 10 },
  { label: '傷病（通院）：1ヶ月を超える通院（週3日以上）', value: `${prefix}_illness_5`, points: 5 },
  { label: '障害等：身体障害者手帳3級・4級', value: `${prefix}_illness_6`, points: 5 },
  { label: '障害等：精神障害2級', value: `${prefix}_illness_7`, points: 5 },
  { label: '障害等：療育手帳B', value: `${prefix}_illness_8`, points: 5 },
];

// (5)病人の看護など
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '入院：1ヶ月に20日以上の入院付き添い（常時）', value: `${prefix}_care_0`, points: 7 },
  { label: '居宅内：傷病親族の介護をしている（常時）', value: `${prefix}_care_1`, points: 5 },
  { label: '入院：1ヶ月に15日以上の入院付き添い（常時）', value: `${prefix}_care_2`, points: 3 },
  { label: '居宅外：傷病親族の介護を週3日以上している（通院の送迎等）', value: `${prefix}_care_3`, points: 3 },
];

// (6)家庭の災害
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '火災・風水害・地震などによる不幸の復旧の間、児童を保育できない場合', value: `${prefix}_disaster_0`, points: 10 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: '基準点数は父母いずれかの低い方が適用されます',
    inputType: 'select',
    options: [
      { label: '労働（家庭外・家庭内）', value: `${prefix}_reason_employment`, points: 0 },
      { label: '求職中', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '就学等', value: `${prefix}_reason_school`, points: 0 },
      { label: '親のいない家庭', value: `${prefix}_reason_absent`, points: 0 },
      { label: '出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '傷病・障害', value: `${prefix}_reason_illness`, points: 0 },
      { label: '病人の看護など', value: `${prefix}_reason_care`, points: 0 },
      { label: '家庭の災害', value: `${prefix}_reason_disaster`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の労働の状況は？`,
      inputType: 'radio',
      options: employmentOptions(prefix),
    },
    {
      id: `${prefix}_jobseeking`,
      category,
      label: `${parentLabel}は求職活動のため日中外出を状態としていますか？`,
      inputType: 'radio',
      options: jobseekingOptions(prefix),
    },
    {
      id: `${prefix}_school`,
      category,
      label: `${parentLabel}は就学・技術習得のため各種学校へ通学していますか？`,
      inputType: 'radio',
      options: schoolOptions(prefix),
    },
    {
      id: `${prefix}_absent`,
      category,
      label: `${parentLabel}は親のいない家庭にあたりますか？`,
      inputType: 'radio',
      options: absentOptions(prefix),
    },
    {
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}の出産の状況は？`,
      inputType: 'radio',
      options: childbirthOptions(prefix),
    },
    {
      id: `${prefix}_illness`,
      category,
      label: `${parentLabel}の傷病・障害の状況は？`,
      inputType: 'radio',
      options: illnessOptions(prefix),
    },
    {
      id: `${prefix}_care`,
      category,
      label: `${parentLabel}の病人の看護の状況は？`,
      inputType: 'radio',
      options: careOptions(prefix),
    },
    {
      id: `${prefix}_disaster`,
      category,
      label: `${parentLabel}は家庭の災害の復旧の間にあたりますか？`,
      inputType: 'radio',
      options: disasterOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// 2. 保育所入所の選考基準表（調整分）
const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: '父子・母子等の世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_0', points: 0 },
      { label: 'はい（+3）', value: 'adj_single_parent_1', points: 3 },
    ],
  },
  {
    id: 'adj_disability',
    category: 'adjustment',
    label: '障害等の手帳についてあてはまるものは？',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_disability_0', points: 0 },
      { label: '入所児童が身体・精神・療育の手帳を有する（+3）', value: 'adj_disability_1', points: 3 },
      { label: '入所児童の世帯に身体・精神・療育の手帳を有する者がいる（+3）', value: 'adj_disability_2', points: 3 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: '入所児童の保育所に兄弟がいますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_0', points: 0 },
      { label: 'はい（+2）', value: 'adj_sibling_1', points: 2 },
    ],
  },
  {
    id: 'adj_grandparent',
    category: 'adjustment',
    label: '祖父母等の同居親族の状況は？',
    helpText: '原典では「（2）減算」の区分に置かれている項目です',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_grandparent_0', points: 0 },
      { label: '高齢のため十分保育できない場合（−1）', value: 'adj_grandparent_1', points: -1 },
      { label: '病弱等のため十分保育できない場合（−2）', value: 'adj_grandparent_2', points: -2 },
    ],
  },
];

export const urakawaData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
