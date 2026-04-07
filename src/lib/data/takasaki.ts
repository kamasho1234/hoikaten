import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 高崎市 保育園入園 選考基準点数・調整指数データ
// 出典：高崎市 令和8年度版 保育所（園）・認定こども園入所ガイド2026
// https://www.city.takasaki.gunma.jp/page/6308.html
// ---------------------------------------------------------------------------
// 高崎市は前橋市と同様の群馬県基準に準拠した点数制。
// 父母それぞれに基準指数を算出し、合計が世帯の選考点数になる（sum方式）。
// 各保護者の最大基準点は10点。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'takasaki',
  name: '高崎市',
  slug: 'takasaki',
  prefecture: '群馬県',
  maxBasePoints: 20, // 父母各10点
} as const;

// ---------------------------------------------------------------------------
// 保育が必要な理由ごとの選択肢テンプレート
// ---------------------------------------------------------------------------

/** 就労（外勤・自営中心者） */
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月150時間以上', value: `${prefix}_employment_10`, points: 10 },
  { label: '月130時間以上150時間未満', value: `${prefix}_employment_9`, points: 9 },
  { label: '月110時間以上130時間未満', value: `${prefix}_employment_8`, points: 8 },
  { label: '月90時間以上110時間未満', value: `${prefix}_employment_7`, points: 7 },
  { label: '月60時間以上90時間未満', value: `${prefix}_employment_6`, points: 6 },
  { label: '月48時間以上60時間未満', value: `${prefix}_employment_5`, points: 5 },
];

/** 就労（自営協力者・農業） */
const selfEmployedAssistOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_selfassist_none`, points: 0 },
  { label: '月150時間以上', value: `${prefix}_selfassist_9`, points: 9 },
  { label: '月130時間以上150時間未満', value: `${prefix}_selfassist_8`, points: 8 },
  { label: '月110時間以上130時間未満', value: `${prefix}_selfassist_7`, points: 7 },
  { label: '月90時間以上110時間未満', value: `${prefix}_selfassist_6`, points: 6 },
  { label: '月60時間以上90時間未満', value: `${prefix}_selfassist_5`, points: 5 },
  { label: '月48時間以上60時間未満', value: `${prefix}_selfassist_4`, points: 4 },
];

/** 内職 */
const pieceworkOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_piecework_none`, points: 0 },
  { label: '日々内職をしている', value: `${prefix}_piecework_5`, points: 5 },
];

/** 妊娠・出産 */
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産前後（予定日前8週〜産後8週）', value: `${prefix}_childbirth_10`, points: 10 },
];

/** 疾病 */
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院中（おおむね1か月以上）', value: `${prefix}_illness_10`, points: 10 },
  { label: '常時臥床（おおむね1か月以上）', value: `${prefix}_illness_9`, points: 9 },
  { label: '精神性の病気等', value: `${prefix}_illness_8`, points: 8 },
  { label: '一般療養（おおむね1か月以上の加療・安静）', value: `${prefix}_illness_6`, points: 6 },
];

/** 心身障害 */
const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '身体障害者手帳2級以上 / 精神手帳1〜3級 / 療育手帳A', value: `${prefix}_disability_10`, points: 10 },
  { label: '身体障害者手帳3級 / 療育手帳B', value: `${prefix}_disability_8`, points: 8 },
  { label: '身体障害者手帳4級以下', value: `${prefix}_disability_6`, points: 6 },
];

/** 同居親族の介護等 */
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '入院付添い（おおむね1か月以上）', value: `${prefix}_care_9`, points: 9 },
  { label: '心身障害児者の介護・通園・通院等', value: `${prefix}_care_8a`, points: 8 },
  { label: '寝たきり者の介護', value: `${prefix}_care_8b`, points: 8 },
  { label: '居宅内看護（長期療養の看護）', value: `${prefix}_care_6`, points: 6 },
];

/** 災害 */
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '火災・風水害等による居宅の復旧', value: `${prefix}_disaster_10`, points: 10 },
];

/** 就学 */
const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '学校等に通学している', value: `${prefix}_education_7`, points: 7 },
  { label: '通信教育・自宅学習', value: `${prefix}_education_5`, points: 5 },
];

/** 求職活動 */
const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動中（就労先未定）', value: `${prefix}_jobseeking_3`, points: 3 },
];

// ---------------------------------------------------------------------------
// 保護者ごとの質問を生成するヘルパー
// ---------------------------------------------------------------------------

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
      { label: '外勤・自営中心者として働いている', value: `${prefix}_reason_employment`, points: 0 },
      { label: '自営協力者・農業として働いている', value: `${prefix}_reason_selfassist`, points: 0 },
      { label: '内職をしている', value: `${prefix}_reason_piecework`, points: 0 },
      { label: '妊娠・出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '病気の治療中', value: `${prefix}_reason_illness`, points: 0 },
      { label: '心身に障害がある', value: `${prefix}_reason_disability`, points: 0 },
      { label: '家族の介護をしている', value: `${prefix}_reason_care`, points: 0 },
      { label: '災害による居宅復旧', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '学校に通っている', value: `${prefix}_reason_education`, points: 0 },
      { label: '仕事を探している', value: `${prefix}_reason_jobseeking`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}はどのくらい働いていますか？（外勤・自営中心者）`,
      helpText: '月あたりの就労時間を選んでください',
      inputType: 'radio',
      options: employmentOptions(prefix),
    },
    {
      id: `${prefix}_selfassist`,
      category,
      label: `${parentLabel}はどのくらい働いていますか？（自営協力者・農業）`,
      helpText: '月あたりの就労時間を選んでください',
      inputType: 'radio',
      options: selfEmployedAssistOptions(prefix),
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
      label: `${parentLabel}は出産前後の期間ですか？`,
      helpText: '出産予定日前8週〜産後8週が対象です',
      inputType: 'radio',
      options: childbirthOptions(prefix),
    },
    {
      id: `${prefix}_illness`,
      category,
      label: `${parentLabel}の病気の状況は？`,
      inputType: 'radio',
      options: illnessOptions(prefix),
    },
    {
      id: `${prefix}_disability`,
      category,
      label: `${parentLabel}の障害の程度は？`,
      inputType: 'radio',
      options: disabilityOptions(prefix),
    },
    {
      id: `${prefix}_care`,
      category,
      label: `${parentLabel}はどのような介護をしていますか？`,
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
      label: `${parentLabel}はどのような就学をしていますか？`,
      helpText: '学校への通学や通信教育を選んでください',
      inputType: 'radio',
      options: educationOptions(prefix),
    },
    {
      id: `${prefix}_jobseeking`,
      category,
      label: `${parentLabel}は求職活動をしていますか？`,
      inputType: 'radio',
      options: jobSeekingOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// ---------------------------------------------------------------------------
// 調整指数の質問
// ---------------------------------------------------------------------------

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親家庭ですか？',
    helpText: '母子・父子家庭の場合は大きな加点があります',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい', value: 'adj_single_parent_yes', points: 13 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: 'きょうだいの保育園の状況は？',
    helpText: 'きょうだいが在園中の園を希望する場合は加点があります',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_sibling_no', points: 0 },
      { label: 'きょうだいが在園中の園を希望（求職中でない）', value: 'adj_sibling_same', points: 5 },
      { label: 'きょうだいが在園中の園を希望（求職中）', value: 'adj_sibling_jobseeking', points: 2 },
      { label: 'きょうだいと同時に申込（1号認定除く）', value: 'adj_sibling_simultaneous', points: 2 },
    ],
  },
  {
    id: 'adj_april_priority',
    category: 'adjustment',
    label: '4月1日入所を希望していますか？',
    helpText: '4月入所希望者には加点があります',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_april_no', points: 0 },
      { label: 'はい', value: 'adj_april_yes', points: 2 },
    ],
  },
  {
    id: 'adj_third_child',
    category: 'adjustment',
    label: '第三子以降のお子さまですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_third_child_no', points: 0 },
      { label: 'はい', value: 'adj_third_child_yes', points: 1 },
    ],
  },
  {
    id: 'adj_child_disability',
    category: 'adjustment',
    label: '入園するお子さまに障害がありますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_child_disability_no', points: 0 },
      { label: 'はい', value: 'adj_child_disability_yes', points: 1 },
    ],
  },
  {
    id: 'adj_current_childcare',
    category: 'adjustment',
    label: '現在、認可外施設等に預けていますか？',
    helpText: '認可外保育施設・企業内託児・他人への依頼・一時預かりが対象（求職中・産前産後・育休中は除く）',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_current_childcare_no', points: 0 },
      { label: '認可外保育施設に入所中', value: 'adj_current_childcare_unlicensed', points: 1 },
      { label: '企業内託児施設に依頼中', value: 'adj_current_childcare_corporate', points: 1 },
      { label: '他人に保育を依頼中', value: 'adj_current_childcare_other', points: 1 },
      { label: '一時預かりを利用中', value: 'adj_current_childcare_temporary', points: 1 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護を受給していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい', value: 'adj_welfare_yes', points: 13 },
    ],
  },
  {
    id: 'adj_single_assignment',
    category: 'adjustment',
    label: '父または母が単身赴任ですか？',
    helpText: '住民基本台帳上同じ住所の場合は対象外',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_assignment_no', points: 0 },
      { label: 'はい', value: 'adj_single_assignment_yes', points: 1 },
    ],
  },
  {
    id: 'adj_nursery_worker',
    category: 'adjustment',
    label: '保育士として高崎市内の認可保育施設に勤務していますか？',
    helpText: '保育士資格を有し、市内の認可保育施設に勤務している場合が対象です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_nursery_worker_no', points: 0 },
      { label: 'はい（市内の認可保育施設に勤務）', value: 'adj_nursery_worker_yes', points: 3 },
      { label: 'はい（市外の認可保育施設に勤務）', value: 'adj_nursery_worker_outside', points: 1 },
    ],
  },
  {
    id: 'adj_relative_employer',
    category: 'adjustment',
    label: '勤務先が親族経営の個人事業等ですか？',
    helpText: '親族が経営する法人格のない会社や個人営業で勤務の場合（自営中心者・協力者・農業とは重複しない）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_relative_employer_no', points: 0 },
      { label: 'はい', value: 'adj_relative_employer_yes', points: -1 },
    ],
  },
  {
    id: 'adj_second_application',
    category: 'adjustment',
    label: '一次募集で保留になり、二次募集に再申込ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_second_application_no', points: 0 },
      { label: 'はい', value: 'adj_second_application_yes', points: 1 },
    ],
  },
];

// ---------------------------------------------------------------------------
// エクスポート
// ---------------------------------------------------------------------------

export const takasakiData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
