import type { MunicipalityData, Question } from '../types';

// -------------------------------------------------------------------------
// 荒尾市 保育園入園 利用調整基準データ
// 出典: 荒尾市「荒尾市保育利用調整基準」（令和6年10月1日改正）
// https://www.city.arao.lg.jp/fs/2/2/3/1/8/6/_/______________6_10_1____.pdf
// -------------------------------------------------------------------------
// 荒尾市は原典の＜順位の基本的な決定方法＞に
// 「『1 基本点数』と『2 調整点数』を合計し利用調整を行います。」とある。
// 基本点数は「申込児童の保護者（父母等）それぞれの基本点数を合算します。
// （保護者が1人の場合は100点を加算）」なので scoringMethod は 'sum'。
// 基本点数の最大は1人あたり150点（災害復旧、虐待やDVの恐れ）。
//
// 「保護者が1人の場合は100点を加算」は、この画面ではひとり親の設問として持たせている。
// ひとり親の方は保護者1だけに答えれば、その1人分の点数に100点が足される。
//
// 原典で数値を出していない項目は選択肢にしていない。
// - 調整点数「福祉事務所長が特に優先して保育の実施が必要と認める場合」
//   （児童・世帯の状況により別に定める）
//
// 「育児休業中の転園希望の場合」（−20）は、いま施設を利用している方が
// 別の施設に移る話で、これから入園を目指す方の点数とは性質が違うため入れていない。
// -------------------------------------------------------------------------

const municipality = {
  id: 'arao',
  name: '荒尾市',
  slug: 'arao',
  prefecture: '熊本県',
  maxBasePoints: 150,
  scoringMethod: 'sum',
} as const;

// 就労
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '居宅内外で労働している（月の就労時間が160時間以上）', value: `${prefix}_employment_0`, points: 100 },
  { label: '居宅内外で労働している（月の就労時間が120時間以上160時間未満）', value: `${prefix}_employment_1`, points: 90 },
  { label: '居宅内外で労働している（月の就労時間が48時間以上120時間未満）', value: `${prefix}_employment_2`, points: 80 },
];

// 求職中
const jobseekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '内定あり：居宅内外労働（月の就労予定時間が160時間以上）', value: `${prefix}_jobseeking_0`, points: 100 },
  { label: '内定あり：居宅内外労働（月の就労予定時間が120時間以上160時間未満）', value: `${prefix}_jobseeking_1`, points: 90 },
  { label: '内定あり：居宅内外労働（月の就労予定時間が48時間以上120時間未満）', value: `${prefix}_jobseeking_2`, points: 80 },
  { label: '内定なし：上記以外の求職中（起業準備などを含む）', value: `${prefix}_jobseeking_3`, points: 70 },
];

// 出産前後
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産前後の2か月間', value: `${prefix}_childbirth_0`, points: 85 },
];

// 保護者の疾病 ／ 保護者の障がい
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院または自宅療養中のため常時寝たきり', value: `${prefix}_illness_0`, points: 100 },
  { label: '身体障がい者手帳1〜3級／療育手帳／精神障がい者保健福祉手帳の交付を受けている', value: `${prefix}_illness_1`, points: 100 },
  { label: '通院、加療のため保育が困難', value: `${prefix}_illness_2`, points: 90 },
  { label: '身体障がい者手帳4〜6級の交付を受けている', value: `${prefix}_illness_3`, points: 90 },
];

// 同居親族の介護・看護
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '入院・通院または自宅療養している親族を月120時間以上、介護・看護をする必要がある', value: `${prefix}_care_0`, points: 90 },
  { label: '入院・通院または自宅療養している親族を月48時間以上120時間未満、介護・看護する必要がある', value: `${prefix}_care_1`, points: 80 },
];

// 災害復旧
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '震災などの災害復旧に当たっている', value: `${prefix}_disaster_0`, points: 150 },
];

// 就学
const schoolOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_school_none`, points: 0 },
  { label: '就職に必要な技能取得のために月120時間以上、職業訓練校・専門学校・大学等に就学（通信制を除く）', value: `${prefix}_school_0`, points: 85 },
  { label: '就職に必要な技能取得のために月48時間以上120時間未満、職業訓練校・専門学校・大学等に就学（通信制を除く）', value: `${prefix}_school_1`, points: 75 },
];

// 虐待やDVの恐れがある
const abuseOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_abuse_none`, points: 0 },
  { label: '児童相談所等の関係機関による保護の経緯があるなど、社会的養護が必要と認められる', value: `${prefix}_abuse_0`, points: 150 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: '荒尾市は保護者それぞれの基本点数を合算します。就労時間には児童の送迎・通勤に要する時間、業務中の休憩時間を含みます',
    inputType: 'select',
    options: [
      { label: '就労', value: `${prefix}_reason_employment`, points: 0 },
      { label: '求職中', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '出産前後', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '保護者の疾病・障がい', value: `${prefix}_reason_illness`, points: 0 },
      { label: '同居親族の介護・看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '災害復旧', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '就学', value: `${prefix}_reason_school`, points: 0 },
      { label: '虐待やDVの恐れがある', value: `${prefix}_reason_abuse`, points: 0 },
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
      id: `${prefix}_jobseeking`,
      category,
      label: `${parentLabel}の求職の状況は？`,
      inputType: 'radio',
      options: jobseekingOptions(prefix),
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
      label: `${parentLabel}の疾病・障がいの状況は？`,
      inputType: 'radio',
      options: illnessOptions(prefix),
    },
    {
      id: `${prefix}_care`,
      category,
      label: `${parentLabel}の同居親族の介護・看護の状況は？`,
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
      id: `${prefix}_school`,
      category,
      label: `${parentLabel}の就学の状況は？`,
      inputType: 'radio',
      options: schoolOptions(prefix),
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

// 2 調整点数
const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親世帯（保護者が1人）ですか？',
    helpText: '離婚・未婚・死別・行方不明などの場合（事実婚を除く）。基本点数の「保護者が1人の場合は100点を加算」と、調整点数の40点を合わせた140点が入ります',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_0', points: 0 },
      { label: 'はい（+140）', value: 'adj_single_parent_1', points: 140 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: 'きょうだいの状況は？',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_sibling_0', points: 0 },
      { label: '既に兄弟姉妹が利用している施設を希望する（兄弟姉妹が卒園児の場合を除く）（+100）', value: 'adj_sibling_1', points: 100 },
      { label: '新たに兄弟姉妹が同時期に同一の施設の利用を希望している（+10）', value: 'adj_sibling_2', points: 10 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '申込児童が生活保護世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_0', points: 0 },
      { label: 'はい（+20）', value: 'adj_welfare_1', points: 20 },
    ],
  },
  {
    id: 'adj_child_disability',
    category: 'adjustment',
    label: '申込児童が障がいを有していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_child_disability_0', points: 0 },
      { label: 'はい（+10）', value: 'adj_child_disability_1', points: 10 },
    ],
  },
  {
    id: 'adj_nursery_staff',
    category: 'adjustment',
    label: '保護者が保育施設で勤務していますか？',
    helpText: '両親とも該当する場合は、両親ともに加点されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_nursery_staff_0', points: 0 },
      { label: '幼稚園教諭・保育教諭・保育士・放課後児童クラブ支援員（+100）', value: 'adj_nursery_staff_1', points: 100 },
      { label: '保育施設で勤務する者（保育補助者は除く）（+70）', value: 'adj_nursery_staff_2', points: 70 },
    ],
  },
  {
    id: 'adj_leave_return',
    category: 'adjustment',
    label: '保護者が産休・育休を取得しており、復職しますか？',
    helpText: '両親とも該当する場合でも、どちらか一方にのみ加点されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_leave_return_0', points: 0 },
      { label: 'はい（+20）', value: 'adj_leave_return_1', points: 20 },
    ],
  },
  {
    id: 'adj_graduate',
    category: 'adjustment',
    label: '地域型保育事業実施施設の卒園児が、連携施設以外の施設を希望しますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_graduate_0', points: 0 },
      { label: 'はい（+50）', value: 'adj_graduate_1', points: 50 },
    ],
  },
  {
    id: 'adj_unemployed',
    category: 'adjustment',
    label: '生計中心者が失業（自己都合の退職を除く）のため求職活動をしていますか？',
    helpText: 'ひとり親世帯および生活保護世帯の場合には、その項目の調整点数が優先されます（併用不可）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unemployed_0', points: 0 },
      { label: 'はい（+10）', value: 'adj_unemployed_1', points: 10 },
    ],
  },
  {
    id: 'adj_foster',
    category: 'adjustment',
    label: '里親による養育ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_foster_0', points: 0 },
      { label: 'はい（+40）', value: 'adj_foster_1', points: 40 },
    ],
  },
];

export const araoData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
