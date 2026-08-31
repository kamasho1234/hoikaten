import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 磐田市 保育園入園 基本点数・調整点数データ
//
// 出典: 磐田市「令和8年度 磐田市保育施設利用調整指数表」
//       https://www.city.iwata.shizuoka.jp/_res/projects/default_project/_page_/001/012/764/R8shisu.pdf
//       （磐田市公式ウェブサイト「令和8年4月入園の保育園等入園申込み」からリンク）
//
// 2026-08-19: 従来のデータは県の標準的な点数配列に合わせただけの推定値テンプレートだったため、
//             上記の公式指数表を読み取って全面的に置き換えた。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'iwata',
  name: '磐田市',
  slug: 'iwata',
  prefecture: '静岡県',
  maxBasePoints: 40, // 父母各20点
} as const;

// ---------------------------------------------------------------------------
// 【1】基本点数（児童の父・母の状態）。A〜Jのうち一番点数の高い項目を父母ともに1つ選ぶ
// ---------------------------------------------------------------------------

/** A 就労（就労内定等を含む）・内職 */
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月160時間以上の就労', value: `${prefix}_employment_20`, points: 20 },
  { label: '月150時間以上160時間未満の就労', value: `${prefix}_employment_19`, points: 19 },
  { label: '月140時間以上150時間未満の就労', value: `${prefix}_employment_18`, points: 18 },
  { label: '月120時間以上140時間未満の就労', value: `${prefix}_employment_16`, points: 16 },
  { label: '月100時間以上120時間未満の就労', value: `${prefix}_employment_14`, points: 14 },
  { label: '月80時間以上100時間未満の就労', value: `${prefix}_employment_12`, points: 12 },
  { label: '月64時間以上80時間未満の就労', value: `${prefix}_employment_10`, points: 10 },
  { label: '内職・月120時間以上', value: `${prefix}_employment_15`, points: 15 },
  { label: '内職・月100時間以上120時間未満', value: `${prefix}_employment_13`, points: 13 },
  { label: '内職・月64時間以上100時間未満', value: `${prefix}_employment_9`, points: 9 },
];

/** 4 就労日数の加算（父母のうち就労日数が少ない方で判定） */
const workDaysOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_workdays_none`, points: 0 },
  { label: '月20日以上の就労', value: `${prefix}_workdays_3`, points: 3 },
  { label: '月16日以上20日未満の就労', value: `${prefix}_workdays_2`, points: 2 },
  { label: '月12日以上16日未満の就労', value: `${prefix}_workdays_1`, points: 1 },
];

/** B 妊娠・出産 */
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産予定月の前後2か月を含む計5か月以内', value: `${prefix}_childbirth_18`, points: 18 },
];

/** C 疾病（居宅内療養1か月以上） */
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '1か月以上の入院、または常に寝たきりの状態', value: `${prefix}_illness_20`, points: 20 },
  { label: '安静を要する自宅療養が必要で日常生活に支障がある', value: `${prefix}_illness_18`, points: 18 },
  { label: '通院加療が必要（保育が困難）', value: `${prefix}_illness_16`, points: 16 },
  { label: '通院加療が必要（保育が一部困難）', value: `${prefix}_illness_10`, points: 10 },
];

/** C 障がい */
const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '身体1・2級／療育A／精神1級', value: `${prefix}_disability_16`, points: 16 },
  { label: '身体3級／療育B／精神2・3級', value: `${prefix}_disability_13`, points: 13 },
  { label: '身体4級以下', value: `${prefix}_disability_10`, points: 10 },
];

/** D 同居の親族の介護・看護 */
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '病院等の指示で1か月以上の付き添いが必要', value: `${prefix}_care_20`, points: 20 },
  { label: '身体1・2級／療育A／要介護5・4の親族を常時介護・看護', value: `${prefix}_care_16`, points: 16 },
  { label: '身体3級／療育B／要介護3・2の親族を常時介護・看護', value: `${prefix}_care_13`, points: 13 },
  { label: '上記以外の親族を常時介護・看護、または施設通所の付添い', value: `${prefix}_care_11`, points: 11 },
];

/** F 求職活動 */
const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動により家庭保育が困難', value: `${prefix}_jobseeking_9`, points: 9 },
];

/** G 就学 */
const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '職業訓練施設や学校教育法に定める学校等に就学（通学）', value: `${prefix}_education_18`, points: 18 },
];

/** E・H・I その他（災害復旧・虐待DV・不在） */
const otherOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_other_none`, points: 0 },
  { label: '災害復旧にあたっている', value: `${prefix}_other_disaster`, points: 20 },
  { label: '虐待やDVのおそれがあると認められる', value: `${prefix}_other_dv`, points: 20 },
  { label: '死亡・離別・行方不明・拘禁など', value: `${prefix}_other_absent`, points: 20 },
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
      { label: '仕事をしている（就労内定・内職を含む）', value: `${prefix}_reason_employment`, points: 0 },
      { label: '仕事を探している', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '妊娠・出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '病気の治療中', value: `${prefix}_reason_illness`, points: 0 },
      { label: '障がいがある', value: `${prefix}_reason_disability`, points: 0 },
      { label: '同居の親族を介護・看護している', value: `${prefix}_reason_care`, points: 0 },
      { label: '学校に通っている', value: `${prefix}_reason_education`, points: 0 },
      { label: 'その他（災害復旧・虐待DV・不在）', value: `${prefix}_reason_other`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}はどのくらい働いていますか？`,
      helpText: '月あたりの就労時間を選んでください',
      inputType: 'radio',
      options: employmentOptions(prefix),
    },
    {
      id: `${prefix}_workdays`,
      category,
      // 就労を選んだときだけ表示する（調整点数4の就労日数）
      showFor: ['employment'],
      label: `${parentLabel}の1か月の就労日数は？`,
      helpText: '父母のうち就労日数が少ない方で判定されます',
      inputType: 'radio',
      options: workDaysOptions(prefix),
    },
    {
      id: `${prefix}_jobseeking`,
      category,
      label: `${parentLabel}は求職活動をしていますか？`,
      inputType: 'radio',
      options: jobSeekingOptions(prefix),
    },
    {
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}の出産時期は？`,
      inputType: 'radio',
      options: childbirthOptions(prefix),
    },
    {
      id: `${prefix}_illness`,
      category,
      label: `${parentLabel}の病気の状況は？`,
      helpText: '1か月以上の居宅内療養が対象です',
      inputType: 'radio',
      options: illnessOptions(prefix),
    },
    {
      id: `${prefix}_disability`,
      category,
      label: `${parentLabel}の障がいの程度は？`,
      inputType: 'radio',
      options: disabilityOptions(prefix),
    },
    {
      id: `${prefix}_care`,
      category,
      label: `${parentLabel}が介護・看護している同居の親族の状態は？`,
      inputType: 'radio',
      options: careOptions(prefix),
    },
    {
      id: `${prefix}_education`,
      category,
      label: `${parentLabel}は学校に通っていますか？`,
      inputType: 'radio',
      options: educationOptions(prefix),
    },
    {
      id: `${prefix}_other`,
      category,
      label: `${parentLabel}にその他の事情はありますか？`,
      inputType: 'radio',
      options: otherOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// ---------------------------------------------------------------------------
// 【2】調整点数
// ---------------------------------------------------------------------------

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_household',
    category: 'adjustment',
    label: '世帯の状況にあてはまるものはありますか？',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_household_none', points: 0 },
      { label: '児童福祉等の観点から特に調整が必要（要保護児童など）', value: 'adj_household_30', points: 30 },
      { label: '生活保護世帯', value: 'adj_household_20', points: 20 },
      { label: '両親とも不在', value: 'adj_household_10', points: 10 },
    ],
  },
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親等の状況は？',
    helpText: '世帯分離・同一敷地内の別棟・隣接地も同居とみなします',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_single_parent_none', points: 0 },
      { label: 'ひとり親等で、親族と同居していない', value: 'adj_single_parent_10', points: 10 },
      { label: 'ひとり親等で、親族と同居している', value: 'adj_single_parent_8', points: 8 },
    ],
  },
  {
    id: 'adj_relative_home',
    category: 'adjustment',
    label: '昼間に居宅内にいる同居の親族はいますか？',
    helpText: '65歳以上・就労・就学・病気療養などの方は除きます（1人につき-5点）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_relative_home_no', points: 0 },
      { label: '1人いる', value: 'adj_relative_home_1', points: -5 },
      { label: '2人以上いる', value: 'adj_relative_home_2', points: -10 },
    ],
  },
  {
    id: 'adj_single_posting',
    category: 'adjustment',
    label: '父母のどちらかが単身赴任していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_posting_no', points: 0 },
      { label: 'はい', value: 'adj_single_posting_yes', points: 2 },
    ],
  },
  {
    id: 'adj_nursery_teacher',
    category: 'adjustment',
    label: '父母のどちらかが保育士・幼稚園教諭・保育教諭ですか？',
    helpText: '特定教育・保育施設（認可を受けた施設）に勤務する場合。転園の申込みには適用されません',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_nursery_teacher_no', points: 0 },
      { label: '市内の施設に勤務（月140時間以上）', value: 'adj_nursery_teacher_25', points: 25 },
      { label: '市内の施設に勤務（月140時間未満）', value: 'adj_nursery_teacher_15', points: 15 },
      { label: '市外の施設に勤務', value: 'adj_nursery_teacher_2', points: 2 },
    ],
  },
  {
    id: 'adj_correspondence',
    category: 'adjustment',
    label: '「就学」で通信制大学・通信教育（スクーリング必須）の学生ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_correspondence_no', points: 0 },
      { label: 'はい', value: 'adj_correspondence_yes', points: -5 },
    ],
  },
  {
    id: 'adj_parent_disability',
    category: 'adjustment',
    label: '父母のどちらかが重度の障害者手帳の交付を受けていますか？',
    helpText: '身体1・2級、精神1級、療育A',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_parent_disability_no', points: 0 },
      { label: 'はい', value: 'adj_parent_disability_yes', points: 5 },
    ],
  },
  {
    id: 'adj_child_disability',
    category: 'adjustment',
    label: 'お子さん・きょうだいに障害者手帳の交付を受けている方はいますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_child_disability_no', points: 0 },
      { label: '申込児童が障害者手帳の交付を受けている', value: 'adj_child_disability_3', points: 3 },
      { label: '小学生以下のきょうだいが重度の手帳の交付を受けている', value: 'adj_child_disability_2', points: 2 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: 'きょうだいの状況は？',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_sibling_none', points: 0 },
      { label: '入所希望園にきょうだいが既に入園している', value: 'adj_sibling_10', points: 10 },
      { label: 'きょうだい3人以上で同時申込', value: 'adj_sibling_4', points: 4 },
      { label: 'きょうだい2人で同時申込', value: 'adj_sibling_2', points: 2 },
      { label: '未就学のきょうだいがいるが入園申込をしない', value: 'adj_sibling_minus5', points: -5 },
    ],
  },
  {
    id: 'adj_current_facility',
    category: 'adjustment',
    label: '今の預け先の事情で入園を申し込みますか？',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_current_facility_none', points: 0 },
      { label: '事業所内保育事業（従業員枠）の卒園等で変更が必要', value: 'adj_current_facility_5', points: 5 },
      { label: '2歳児までの院内・事業所内保育施設の受託年齢満了', value: 'adj_current_facility_5b', points: 5 },
      { label: '市内認可外保育施設の閉鎖または認可施設への移行', value: 'adj_current_facility_5c', points: 5 },
    ],
  },
  {
    id: 'adj_decline',
    category: 'adjustment',
    label: '正当な理由なく入園内定を辞退したことがありますか？',
    helpText: '同一年度内の入園申込期間中に限ります',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_decline_no', points: 0 },
      { label: 'はい', value: 'adj_decline_yes', points: -5 },
    ],
  },
  {
    id: 'adj_leave_extension',
    category: 'adjustment',
    label: '「入園できない場合は育児休業の延長も許容できる」にチェックしますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_leave_extension_no', points: 0 },
      { label: 'はい', value: 'adj_leave_extension_yes', points: -20 },
    ],
  },
  {
    id: 'adj_arrears',
    category: 'adjustment',
    label: '保育料の未納が3か月分以上ありますか？',
    helpText: '納付相談がない、または納付約束を履行しない場合',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_arrears_no', points: 0 },
      { label: 'はい', value: 'adj_arrears_yes', points: -20 },
    ],
  },
  {
    id: 'adj_outside_city',
    category: 'adjustment',
    label: '申込児童の住所は磐田市外ですか？',
    helpText: '転入予定者は除きます',
    inputType: 'radio',
    options: [
      { label: 'いいえ（磐田市内）', value: 'adj_outside_city_no', points: 0 },
      { label: 'はい（市外）', value: 'adj_outside_city_yes', points: -20 },
    ],
  },
];

// ---------------------------------------------------------------------------
// エクスポート
// ---------------------------------------------------------------------------

export const iwataData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
