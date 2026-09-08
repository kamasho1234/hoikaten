import type { MunicipalityData, Question } from '../types';

// -------------------------------------------------------------------------
// 胎内市 保育園入園 利用調整基準データ
// 出典: 胎内市「入園選考基準表」
// https://www.city.tainai.niigata.jp/life/documents/senkoukijun.pdf
// -------------------------------------------------------------------------
// 胎内市は原典の下部に集計欄があり、
//   「①必要性父 ＋ ①必要性母 ＝ 小計」→「② 優先利用 ＋ ③ 家庭状況 ＝ 小計」→「合計」
// となっている。①は父・母それぞれの列に点数が並ぶので scoringMethod は 'sum'。
// 保育の必要性の最大は1人あたり10点。
//
// ②優先利用に係る調整基準と③その他の家庭状況は、どちらも世帯の話なので
// 調整の設問として持たせている。
//
// ②の10「上記1〜5のうち2つ以上の項目に該当した場合 5」は、
// 1〜5の該当状況によって決まる重ね掛けなので、独立した設問にしている。
//
// 「就学」の注記「＊ 指数は拘束時間による（外勤の時間に準ずる）」により、
// 就学は外勤と同じ時間区分を使う。
// -------------------------------------------------------------------------

const municipality = {
  id: 'tainai',
  name: '胎内市',
  slug: 'tainai',
  prefecture: '新潟県',
  maxBasePoints: 10,
  scoringMethod: 'sum',
} as const;

// 就労
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '外勤：8時間以上／日（140時間以上／月）', value: `${prefix}_employment_0`, points: 10 },
  { label: '外勤：6時間以上8時間未満／日（120時間以上140時間未満／月）', value: `${prefix}_employment_1`, points: 8 },
  { label: '外勤：4時間以上6時間未満／日（80時間以上120時間未満／月）', value: `${prefix}_employment_2`, points: 6 },
  { label: '外勤：4時間未満／日（48時間以上80時間未満／月）', value: `${prefix}_employment_3`, points: 4 },
  { label: '自営業（農業含む）：8時間以上／日（140時間以上／月）', value: `${prefix}_employment_4`, points: 10 },
  { label: '自営業（農業含む）：6時間以上8時間未満／日（120時間以上140時間未満／月）', value: `${prefix}_employment_5`, points: 8 },
  { label: '自営業（農業含む）：4時間以上6時間未満／日（80時間以上120時間未満／月）', value: `${prefix}_employment_6`, points: 6 },
  { label: '自営業（農業含む）：4時間未満／日（48時間以上80時間未満／月）', value: `${prefix}_employment_7`, points: 4 },
  { label: '内職：6時間以上／日（120時間以上／月）', value: `${prefix}_employment_8`, points: 6 },
  { label: '内職：4時間以上6時間未満／日（80時間以上120時間未満／月）', value: `${prefix}_employment_9`, points: 4 },
  { label: '内職：4時間未満／日（48時間以上80時間未満／月）', value: `${prefix}_employment_10`, points: 2 },
];

// 育児休業
const parentalLeaveOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_parental_leave_none`, points: 0 },
  { label: '育児休業中（0点）', value: `${prefix}_parental_leave_0`, points: 0 },
];

// 妊娠・出産
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '妊娠中であるか出産後8週間', value: `${prefix}_childbirth_0`, points: 10 },
];

// 疾病・障がい
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '概ね1か月以上入院または寝たきり', value: `${prefix}_illness_0`, points: 10 },
  { label: '身障手帳1・2級または療育手帳Aまたは精神障害者保健福祉手帳1級', value: `${prefix}_illness_1`, points: 10 },
  { label: '精神性等疾病', value: `${prefix}_illness_2`, points: 8 },
  { label: '身障手帳3・4級または療育手帳B', value: `${prefix}_illness_3`, points: 6 },
  { label: '上記以外の状態で保育が困難な場合', value: `${prefix}_illness_4`, points: 4 },
];

// 介護（看護）
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '常時観察と介護をしている', value: `${prefix}_care_0`, points: 8 },
  { label: '上記以外で介護をしている', value: `${prefix}_care_1`, points: 6 },
];

// 災害復旧
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '常時災害の復旧にあたっている', value: `${prefix}_disaster_0`, points: 10 },
];

// 求職活動
const jobseekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '起業準備を継続的に行っている', value: `${prefix}_jobseeking_0`, points: 5 },
  { label: '求職活動を継続的に行っている（0点）', value: `${prefix}_jobseeking_1`, points: 0 },
];

// 就学（＊ 指数は拘束時間による。外勤の時間に準ずる）
const schoolOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_school_none`, points: 0 },
  { label: '8時間以上／日（140時間以上／月）', value: `${prefix}_school_0`, points: 10 },
  { label: '6時間以上8時間未満／日（120時間以上140時間未満／月）', value: `${prefix}_school_1`, points: 8 },
  { label: '4時間以上6時間未満／日（80時間以上120時間未満／月）', value: `${prefix}_school_2`, points: 6 },
  { label: '4時間未満／日（48時間以上80時間未満／月）', value: `${prefix}_school_3`, points: 4 },
];

// 虐待・DV ／ その他
const abuseOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_abuse_none`, points: 0 },
  { label: '虐待やDVの恐れがある', value: `${prefix}_abuse_0`, points: 10 },
  { label: 'その他、明らかに保育できないと認められる', value: `${prefix}_abuse_1`, points: 10 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: '胎内市は父・母それぞれの必要性の点数を合算します',
    inputType: 'select',
    options: [
      { label: '就労', value: `${prefix}_reason_employment`, points: 0 },
      { label: '育児休業', value: `${prefix}_reason_parental_leave`, points: 0 },
      { label: '妊娠・出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '疾病・障がい', value: `${prefix}_reason_illness`, points: 0 },
      { label: '介護（看護）', value: `${prefix}_reason_care`, points: 0 },
      { label: '災害復旧', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '求職活動', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '就学', value: `${prefix}_reason_school`, points: 0 },
      { label: '虐待・DV・その他', value: `${prefix}_reason_abuse`, points: 0 },
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
      id: `${prefix}_parental_leave`,
      category,
      label: `${parentLabel}は育児休業中ですか？`,
      inputType: 'radio',
      options: parentalLeaveOptions(prefix),
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
      label: `${parentLabel}の介護（看護）の状況は？`,
      inputType: 'radio',
      options: careOptions(prefix),
    },
    {
      id: `${prefix}_disaster`,
      category,
      label: `${parentLabel}は災害の復旧にあたっていますか？`,
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
      helpText: '通信教育と期間限定は除きます。指数は拘束時間によります',
      inputType: 'radio',
      options: schoolOptions(prefix),
    },
    {
      id: `${prefix}_abuse`,
      category,
      label: `${parentLabel}：虐待やDVの恐れなどがありますか？`,
      inputType: 'radio',
      options: abuseOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// ②優先利用に係る調整基準 ／ ③その他の家庭状況
const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親家庭ですか？',
    helpText: 'それと同等の状況にある場合も含みます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_0', points: 0 },
      { label: '同居親族なし（+10）', value: 'adj_single_parent_1', points: 10 },
      { label: '同居親族あり（+4）', value: 'adj_single_parent_2', points: 4 },
      { label: '単身赴任中の世帯（+1）', value: 'adj_single_parent_3', points: 1 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯ですか？',
    helpText: '就労による自立支援につながる場合等が対象です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_0', points: 0 },
      { label: 'はい（+3）', value: 'adj_welfare_1', points: 3 },
    ],
  },
  {
    id: 'adj_unemployed',
    category: 'adjustment',
    label: '生計中心者の失業および疾病により、就労の必要性が高いですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unemployed_0', points: 0 },
      { label: 'はい（+1）', value: 'adj_unemployed_1', points: 1 },
    ],
  },
  {
    id: 'adj_social_care',
    category: 'adjustment',
    label: '虐待やDVのおそれがある場合など、社会的養護が必要ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_social_care_0', points: 0 },
      { label: 'はい（+1）', value: 'adj_social_care_1', points: 1 },
    ],
  },
  {
    id: 'adj_child_disability',
    category: 'adjustment',
    label: '子どもに障がいがあり、他に入園できる保育園・認定こども園等がありませんか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_child_disability_0', points: 0 },
      { label: 'はい（+2）', value: 'adj_child_disability_1', points: 2 },
    ],
  },
  {
    id: 'adj_multiple',
    category: 'adjustment',
    label: '上の1〜5のうち2つ以上の項目に該当しますか？',
    helpText: 'ひとり親家庭・生活保護世帯・生計中心者の失業等・社会的養護・子どもの障がいのうち2つ以上',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_multiple_0', points: 0 },
      { label: 'はい（+5）', value: 'adj_multiple_1', points: 5 },
    ],
  },
  {
    id: 'adj_leave_return',
    category: 'adjustment',
    label: '育児休業を取得しており、復帰しますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_leave_return_0', points: 0 },
      { label: 'はい（+1）', value: 'adj_leave_return_1', points: 1 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: 'きょうだいが在園中の保育園・認定こども園等の利用を希望しますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_0', points: 0 },
      { label: 'はい（+7）', value: 'adj_sibling_1', points: 7 },
    ],
  },
  {
    id: 'adj_graduate',
    category: 'adjustment',
    label: '小規模保育事業などの卒園児童ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_graduate_0', points: 0 },
      { label: 'はい（+2）', value: 'adj_graduate_1', points: 2 },
    ],
  },
  {
    id: 'adj_nursery_staff',
    category: 'adjustment',
    label: '保育士等の子どもですか？',
    helpText: '保護者が胎内市内の保育園・認定こども園等で保育士等として勤務予定の場合に限ります',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_nursery_staff_0', points: 0 },
      { label: 'はい（+3）', value: 'adj_nursery_staff_1', points: 3 },
    ],
  },
  {
    id: 'adj_school_area',
    category: 'adjustment',
    label: '保育園の所在する小学校区域内に住所を有する3歳以上児ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_school_area_0', points: 0 },
      { label: 'はい（+1）', value: 'adj_school_area_1', points: 1 },
    ],
  },
  {
    id: 'adj_specific_need',
    category: 'adjustment',
    label: '希望園でないと保育困難ですか？',
    helpText: '乳児等特別保育または送迎困難な場合等が対象です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_specific_need_0', points: 0 },
      { label: 'はい（+2）', value: 'adj_specific_need_1', points: 2 },
    ],
  },
  {
    id: 'adj_home_child',
    category: 'adjustment',
    label: '申込児童以外の子どもを保育園・認定こども園等に預けていませんか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_home_child_0', points: 0 },
      { label: 'はい（−1）', value: 'adj_home_child_1', points: -1 },
    ],
  },
  {
    id: 'adj_flexible_hours',
    category: 'adjustment',
    label: '勤務時間内において拘束性に比較的柔軟性があると判断されますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_flexible_hours_0', points: 0 },
      { label: 'はい（−2）', value: 'adj_flexible_hours_1', points: -2 },
    ],
  },
  {
    id: 'adj_leave_no_return',
    category: 'adjustment',
    label: '育児休業中であり、入園希望年度内に復帰をしませんか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_leave_no_return_0', points: 0 },
      { label: 'はい（−2）', value: 'adj_leave_no_return_1', points: -2 },
    ],
  },
];

export const tainaiData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
