import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 山形市 保育園入園 基準点数・調整点数データ
// 出典：山形市保育所等利用調整基準（令和7年4月入所～適用）
// https://www.city.yamagata-yamagata.lg.jp/kosodatekyoiku/hoiku/1007241/1005906.html
// 別表第1（基準点数）: r7hyou1.pdf
// 別表第2（調整点数）: r8hyou2.pdf
// ---------------------------------------------------------------------------
//
// 山形市の利用調整は以下のように算出されます。
//   基準点数 ＝ 父の基準点数 ＋ 母の基準点数
//   総合点数 ＝ 基準点数 ＋ 調整点数
// 保護者ごとに「保育できない理由」のうち最も高い点数の事由1つを基準点数とします。
// 就労時間は月20日勤務換算で1日あたりの時間で判定されます。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'yamagata',
  name: '山形市',
  slug: 'yamagata',
  prefecture: '山形県',
  maxBasePoints: 44, // 父母各最大22点（災害）の合計。就労は各20点で合計40点
} as const;

// ---------------------------------------------------------------------------
// 就労（内職を除く）
// 月20日勤務として1日あたりの就労時間で判定
// ---------------------------------------------------------------------------

const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '1日8時間以上', value: `${prefix}_employment_20`, points: 20 },
  { label: '1日7時間以上8時間未満', value: `${prefix}_employment_18`, points: 18 },
  { label: '1日6時間以上7時間未満', value: `${prefix}_employment_16`, points: 16 },
  { label: '1日5時間以上6時間未満', value: `${prefix}_employment_15`, points: 15 },
  { label: '1日4時間以上5時間未満', value: `${prefix}_employment_14`, points: 14 },
  { label: '1日4時間未満', value: `${prefix}_employment_8`, points: 8 },
];

// ---------------------------------------------------------------------------
// 内職
// ---------------------------------------------------------------------------

const homeworkOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_homework_none`, points: 0 },
  { label: '1日7時間以上', value: `${prefix}_homework_14`, points: 14 },
  { label: '1日5時間以上7時間未満', value: `${prefix}_homework_12`, points: 12 },
  { label: '1日4時間未満', value: `${prefix}_homework_10`, points: 10 },
];

// ---------------------------------------------------------------------------
// 妊娠・出産
// ---------------------------------------------------------------------------

const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産予定前8週〜産後8週', value: `${prefix}_childbirth_20`, points: 20 },
];

// ---------------------------------------------------------------------------
// 心身障がい・疾病・負傷
// ---------------------------------------------------------------------------

const illnessDisabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '身体障がい者手帳 1・2級', value: `${prefix}_disability_21a`, points: 21 },
  { label: '身体障がい者手帳 3・4級', value: `${prefix}_disability_14`, points: 14 },
  { label: '身体障がい者手帳 5・6級', value: `${prefix}_disability_10`, points: 10 },
  { label: '療育手帳 A判定', value: `${prefix}_disability_21b`, points: 21 },
  { label: '療育手帳 B判定', value: `${prefix}_disability_17`, points: 17 },
  { label: '精神障がい手帳 1級', value: `${prefix}_disability_21c`, points: 21 },
  { label: '精神障がい手帳 2級', value: `${prefix}_disability_18`, points: 18 },
  { label: '精神障がい手帳 3級', value: `${prefix}_disability_15`, points: 15 },
  { label: '診断書提出（疾病・負傷）', value: `${prefix}_illness_diagnosis`, points: 15 },
];

// ---------------------------------------------------------------------------
// 介護（別居の親族を含む。特養入所を除く）
// ---------------------------------------------------------------------------

const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '自宅で要介護4・5の者を介護', value: `${prefix}_care_20a`, points: 20 },
  { label: '自宅で要介護3の者を介護', value: `${prefix}_care_18`, points: 18 },
  { label: '自宅で要介護1・2の者を介護', value: `${prefix}_care_16`, points: 16 },
  { label: '身障1・2級/療育A/精神1級の者を介護', value: `${prefix}_care_20b`, points: 20 },
  { label: '入院付添', value: `${prefix}_care_13`, points: 13 },
];

// ---------------------------------------------------------------------------
// 家庭の災害
// ---------------------------------------------------------------------------

const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '居宅が損壊した', value: `${prefix}_disaster_22`, points: 22 },
];

// ---------------------------------------------------------------------------
// 求職中
// ---------------------------------------------------------------------------

const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職中', value: `${prefix}_jobseeking_1`, points: 1 },
  { label: 'ひとり親家庭で求職中', value: `${prefix}_jobseeking_5`, points: 5 },
  { label: '生計中心者で求職中', value: `${prefix}_jobseeking_5b`, points: 5 },
];

// ---------------------------------------------------------------------------
// 就学
// 月20日就学として1日あたりの就学時間で判定
// ---------------------------------------------------------------------------

const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '1日8時間以上', value: `${prefix}_education_20`, points: 20 },
  { label: '1日7時間以上8時間未満', value: `${prefix}_education_18`, points: 18 },
  { label: '1日6時間以上7時間未満', value: `${prefix}_education_16`, points: 16 },
  { label: '1日5時間以上6時間未満', value: `${prefix}_education_15`, points: 15 },
  { label: '1日4時間以上5時間未満', value: `${prefix}_education_14`, points: 14 },
  { label: '1日4時間未満', value: `${prefix}_education_8`, points: 8 },
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
    helpText: '山形市では父母それぞれの基準点数を合算します。月20日勤務換算で1日あたりの時間で判定されます。',
    inputType: 'select',
    options: [
      { label: '仕事をしている（内職を除く）', value: `${prefix}_reason_employment`, points: 0 },
      { label: '仕事をしている（内職）', value: `${prefix}_reason_homework`, points: 0 },
      { label: '妊娠・出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '心身障がい・疾病・負傷', value: `${prefix}_reason_illness`, points: 0 },
      { label: '介護', value: `${prefix}_reason_care`, points: 0 },
      { label: '家庭の災害', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '仕事を探している', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '学校に通っている', value: `${prefix}_reason_education`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の就労時間（1日あたり）は？`,
      helpText: '月20日勤務換算で判定されます。不規則な場合は平均時間とします',
      inputType: 'radio',
      options: employmentOptions(prefix),
    },
    {
      id: `${prefix}_homework`,
      category,
      label: `${parentLabel}の内職の時間（1日あたり）は？`,
      helpText: '内職者は就労（被雇用者・自営業者）より基準点数が低くなります',
      inputType: 'radio',
      options: homeworkOptions(prefix),
    },
    {
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}の出産の状況は？`,
      helpText: '出産予定前8週から産後8週が対象です',
      inputType: 'radio',
      options: childbirthOptions(prefix),
    },
    {
      id: `${prefix}_illness`,
      category,
      label: `${parentLabel}の心身障がい・疾病の状況は？`,
      helpText: '障がい者手帳の等級または診断書の内容に応じて点数が決まります',
      inputType: 'radio',
      options: illnessDisabilityOptions(prefix),
    },
    {
      id: `${prefix}_care`,
      category,
      label: `${parentLabel}の介護の状況は？`,
      helpText: '別居の親族を含みます（特別養護老人ホーム入所は除く）',
      inputType: 'radio',
      options: careOptions(prefix),
    },
    {
      id: `${prefix}_disaster`,
      category,
      label: `${parentLabel}は家庭の災害に該当しますか？`,
      inputType: 'radio',
      options: disasterOptions(prefix),
    },
    {
      id: `${prefix}_jobseeking`,
      category,
      label: `${parentLabel}は求職活動をしていますか？`,
      inputType: 'radio',
      options: jobSeekingOptions(prefix),
    },
    {
      id: `${prefix}_education`,
      category,
      label: `${parentLabel}の就学時間（1日あたり）は？`,
      helpText: '月20日就学換算で判定されます',
      inputType: 'radio',
      options: educationOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// ---------------------------------------------------------------------------
// 調整点数の質問
// ---------------------------------------------------------------------------

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親家庭・両親不在に該当しますか？',
    helpText: 'ひとり親家庭・両親不在の場合+35点、異性の同居人/内縁関係がある場合は+20点',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'ひとり親家庭・両親不在（+35）', value: 'adj_single_parent_yes', points: 35 },
      { label: '異性の同居人又は内縁関係者がいる（+20）', value: 'adj_single_parent_partner', points: 20 },
    ],
  },
  {
    id: 'adj_foster',
    category: 'adjustment',
    label: '里親家庭ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_foster_no', points: 0 },
      { label: 'はい（+15）', value: 'adj_foster_yes', points: 15 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい（+45）', value: 'adj_welfare_yes', points: 45 },
    ],
  },
  {
    id: 'adj_grandparent_care',
    category: 'adjustment',
    label: '祖父母と保護者が交代で保育していますか？',
    helpText: '交代で保育している場合は-2点ですが、一時保育を週2回以上利用していれば+1点です',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_grandparent_care_no', points: 0 },
      { label: '祖父母と交代で保育（-2）', value: 'adj_grandparent_care_minus', points: -2 },
      { label: '交代保育＋一時保育を週2回以上利用（+1）', value: 'adj_grandparent_care_plus', points: 1 },
    ],
  },
  {
    id: 'adj_employment_status',
    category: 'adjustment',
    label: '就労内定の状況は？',
    helpText: '就労が内定した場合は-4点。居宅外労働で以前の就労先に再勤務する場合は-2点',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない（すでに就労中）', value: 'adj_employment_status_no', points: 0 },
      { label: '就労内定（-4）', value: 'adj_employment_status_naitei', points: -4 },
      { label: '以前の就労先に再勤務（-2）', value: 'adj_employment_status_saikinmu', points: -2 },
    ],
  },
  {
    id: 'adj_ikukyu',
    category: 'adjustment',
    label: '産後休業又は育児休業からの職場復帰ですか？',
    helpText: '産休・育休から復帰する場合+2点が加算されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_ikukyu_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_ikukyu_yes', points: 2 },
    ],
  },
  {
    id: 'adj_sibling_enrolled',
    category: 'adjustment',
    label: 'きょうだいが利用中の保育所等を第一希望にしていますか？',
    helpText: '兄弟姉妹が利用中の保育所等への入所を第一希望とする場合+10点（新年度末で卒園の場合は除く）',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_sibling_enrolled_no', points: 0 },
      { label: 'はい（+10）', value: 'adj_sibling_enrolled_yes', points: 10 },
    ],
  },
  {
    id: 'adj_sibling_elementary',
    category: 'adjustment',
    label: '小学生以下のきょうだいがいますか？',
    helpText: '小学生以下の兄弟がいる場合+1点（人数にかかわらず）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_elementary_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_sibling_elementary_yes', points: 1 },
    ],
  },
  {
    id: 'adj_sibling_preschool',
    category: 'adjustment',
    label: '小学校就学前のきょうだいは何人いますか？（申請児を除く）',
    helpText: '就学前のきょうだい1人につき+1点が加算されます',
    inputType: 'radio',
    options: [
      { label: 'いない', value: 'adj_sibling_preschool_0', points: 0 },
      { label: '1人（+1）', value: 'adj_sibling_preschool_1', points: 1 },
      { label: '2人（+2）', value: 'adj_sibling_preschool_2', points: 2 },
      { label: '3人以上（+3）', value: 'adj_sibling_preschool_3', points: 3 },
    ],
  },
  {
    id: 'adj_sibling_simultaneous',
    category: 'adjustment',
    label: 'きょうだいと同時に申し込みますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_simultaneous_no', points: 0 },
      { label: 'はい（+3）', value: 'adj_sibling_simultaneous_yes', points: 3 },
    ],
  },
  {
    id: 'adj_current_childcare',
    category: 'adjustment',
    label: '現在、認可外保育施設・預かり保育・一時保育を利用していますか？',
    helpText: '認可外保育施設、幼稚園の預かり保育（週4日以上）、一時保育（非定型保育週4日以上）を利用している場合+2点',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_current_childcare_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_current_childcare_yes', points: 2 },
    ],
  },
  {
    id: 'adj_ikukyu_kaijo',
    category: 'adjustment',
    label: '下の子の育児休業を1年より長く取得するために利用を解除しましたか？',
    helpText: '育休取得のために上の子の保育利用を解除した場合+20点',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_ikukyu_kaijo_no', points: 0 },
      { label: 'はい（+20）', value: 'adj_ikukyu_kaijo_yes', points: 20 },
    ],
  },
  {
    id: 'adj_twins',
    category: 'adjustment',
    label: '双子以上ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_twins_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_twins_yes', points: 1 },
    ],
  },
  {
    id: 'adj_child_disability',
    category: 'adjustment',
    label: '申請する子どもに障がいがありますか？',
    helpText: '特別児童扶養手当の受給または身体障がい者手帳・療育手帳の交付を受けた就学前児童が対象（+5点）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_child_disability_no', points: 0 },
      { label: 'はい（+5）', value: 'adj_child_disability_yes', points: 5 },
    ],
  },
  {
    id: 'adj_sotsuen',
    category: 'adjustment',
    label: '年齢による卒園児ですか？',
    helpText: '小規模保育事業所等の年齢上限による卒園児の場合+30点',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sotsuen_no', points: 0 },
      { label: 'はい（+30）', value: 'adj_sotsuen_yes', points: 30 },
    ],
  },
  {
    id: 'adj_kodomoen_transfer',
    category: 'adjustment',
    label: '認定こども園で1号認定から2号認定への切替えですか？',
    helpText: '認定こども園に在園中で1号（教育）から2号（保育）へ認定を切り替える場合+10点',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_kodomoen_transfer_no', points: 0 },
      { label: 'はい（+10）', value: 'adj_kodomoen_transfer_yes', points: 10 },
    ],
  },
  {
    id: 'adj_childcare_worker',
    category: 'adjustment',
    label: '保護者が保育士・看護師・幼稚園教諭として保育施設等に勤務（内定含む）していますか？',
    helpText: '保育所、認定こども園、小規模保育等で保育士等として就労中・内定の場合に大きく加点されます（保育所等からの転園は除く）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_childcare_worker_no', points: 0 },
      { label: 'はい（+50）', value: 'adj_childcare_worker_yes', points: 50 },
    ],
  },
  {
    id: 'adj_hoiku_address',
    category: 'adjustment',
    label: '兄弟姉妹が利用中の保育所等への入所を第一希望施設としていますか？（住所移転あり）',
    helpText: '兄弟姉妹が利用中の保育所等への入所を第一希望とし、転居施設とする場合+10点',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_hoiku_address_no', points: 0 },
      { label: 'はい（+10）', value: 'adj_hoiku_address_yes', points: 10 },
    ],
  },
];

// ---------------------------------------------------------------------------
// エクスポート
// ---------------------------------------------------------------------------

export const yamagataData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
