import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// ふじみ野市 保育所入所基準点数表（基準点・調整点）データ
//
// 出典: ふじみ野市こども・元気健康部保育課「R8年度 ふじみ野市保育所入所基準点数表」
//       https://www.city.fujimino.saitama.jp/material/files/group/26/R8tensuuhyou.pdf
//       （ふじみ野市Webサイト「ふじみ野市保育所入所基準点数表」
//         https://www.city.fujimino.saitama.jp/soshikiichiran/hoikuka/hoikugakari/nyusho/1560.html からリンク）
//
// 2026-08-19: 従来のデータは他自治体と同じ点数配列のテンプレート（推定値）だったため、
//             上記の公式点数表を読み取って全面的に置き換えた。
//             ふじみ野市は100点満点系で、旧データ（20点満点系）とは桁が異なる。
//
// 原典の注記:
//   「毎年、選考状況に応じて選考点数の基準・内容を変更することがありますのでご注意ください」
//   総合計点数が同点の場合の優先順位は、①保育所希望順 ②転所申込よりも新規申込を優先
//   ③「保育を必要とする事由」1災害＞2妊娠・出産＞3就労＞4疾病・障害＞5介護・看護＞6就学＞7求職
//   ④保護者の勤務条件と勤務実績
// ---------------------------------------------------------------------------

const municipality = {
  id: 'fujimino',
  name: 'ふじみ野市',
  slug: 'fujimino',
  prefecture: '埼玉県',
  maxBasePoints: 240, // 父母各120点（心身障害1級・2級等）
} as const;

// ---------------------------------------------------------------------------
// 基準点。父母それぞれについて選ぶ
// ---------------------------------------------------------------------------

/** ① 就労 */
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月150時間以上', value: `${prefix}_employment_100`, points: 100 },
  { label: '月140時間以上150時間未満', value: `${prefix}_employment_95`, points: 95 },
  { label: '月130時間以上140時間未満', value: `${prefix}_employment_90`, points: 90 },
  { label: '月120時間以上130時間未満', value: `${prefix}_employment_85`, points: 85 },
  { label: '月110時間以上120時間未満', value: `${prefix}_employment_80`, points: 80 },
  { label: '月100時間以上110時間未満', value: `${prefix}_employment_75`, points: 75 },
  { label: '月90時間以上100時間未満', value: `${prefix}_employment_70`, points: 70 },
  { label: '月80時間以上90時間未満', value: `${prefix}_employment_65`, points: 65 },
  { label: '月72時間以上80時間未満', value: `${prefix}_employment_60`, points: 60 },
  { label: '月64時間以上72時間未満', value: `${prefix}_employment_55`, points: 55 },
];

/** ③ 内定・求職（派遣等で勤務地未定の場合も含む） */
const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '内定：月150時間以上', value: `${prefix}_jobseeking_80`, points: 80 },
  { label: '内定：月140時間以上150時間未満', value: `${prefix}_jobseeking_75`, points: 75 },
  { label: '内定：月130時間以上140時間未満', value: `${prefix}_jobseeking_70`, points: 70 },
  { label: '内定：月120時間以上130時間未満', value: `${prefix}_jobseeking_65`, points: 65 },
  { label: '内定：月110時間以上120時間未満', value: `${prefix}_jobseeking_60`, points: 60 },
  { label: '内定：月100時間以上110時間未満', value: `${prefix}_jobseeking_55`, points: 55 },
  { label: '内定：月90時間以上100時間未満', value: `${prefix}_jobseeking_50`, points: 50 },
  { label: '内定：月80時間以上90時間未満', value: `${prefix}_jobseeking_45`, points: 45 },
  { label: '内定：月72時間以上80時間未満', value: `${prefix}_jobseeking_40`, points: 40 },
  { label: '内定：月64時間以上72時間未満', value: `${prefix}_jobseeking_35`, points: 35 },
  { label: '求職中（未定。4時間以上）', value: `${prefix}_jobseeking_0`, points: 0 },
];

/** ④ 就労その他（基準以下の就労） */
const otherWorkOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_otherwork_none`, points: 0 },
  { label: '基準以下の就労', value: `${prefix}_otherwork_20`, points: 20 },
];

/** ⑤ 父母がいない */
const absenceOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_absence_none`, points: 0 },
  { label: '死亡・離別・行方不明・拘禁・未婚', value: `${prefix}_absence_100`, points: 100 },
];

/** ⑥ 出産（公式の点数表では母の欄のみに点数がある） */
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産予定月および出産予定月の前後2か月の計5か月', value: `${prefix}_childbirth_100`, points: 100 },
];

/** ⑥ 療養・心身障害 */
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '療養：1か月以上の入院治療が必要であり、保育不可', value: `${prefix}_illness_100a`, points: 100 },
  { label: '療養：日常生活に支障があり、保育困難', value: `${prefix}_illness_100b`, points: 100 },
  { label: '療養：日常生活に支障なし、保育施設の利用が望ましい', value: `${prefix}_illness_80`, points: 80 },
  { label: '心身障害：1級・2級・マルA・A・B', value: `${prefix}_illness_disability_120`, points: 120 },
  { label: '心身障害：3級・4級・C', value: `${prefix}_illness_disability_100`, points: 100 },
];

/** ⑦ 就学（就労1〜10に準ずる） */
const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '就学・技能習得：月150時間以上に相当', value: `${prefix}_education_100`, points: 100 },
  { label: '就学・技能習得：月120時間以上130時間未満に相当', value: `${prefix}_education_85`, points: 85 },
  { label: '就学・技能習得：月90時間以上100時間未満に相当', value: `${prefix}_education_70`, points: 70 },
  { label: '就学・技能習得：月72時間以上80時間未満に相当', value: `${prefix}_education_60`, points: 60 },
  { label: '就学・技能習得：月64時間以上72時間未満に相当', value: `${prefix}_education_55`, points: 55 },
];

/** ⑧ 親族の介護・看護 */
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '看護：常時臥床・常時看護', value: `${prefix}_care_100a`, points: 100 },
  { label: '看護：集団保育不可', value: `${prefix}_care_100b`, points: 100 },
  { label: '介護：要介護3〜5', value: `${prefix}_care_100c`, points: 100 },
  { label: '看護：通所・通院の付添または看護が月16日以上', value: `${prefix}_care_80a`, points: 80 },
  { label: '介護：要介護2', value: `${prefix}_care_80b`, points: 80 },
];

/** ⑨ 家庭の災害 */
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '家屋損傷・その他の災害復旧', value: `${prefix}_disaster_100`, points: 100 },
];

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
      { label: '就労', value: `${prefix}_reason_employment`, points: 0 },
      { label: '内定・求職', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '就労その他（基準以下の就労）', value: `${prefix}_reason_otherwork`, points: 0 },
      { label: '父母がいない', value: `${prefix}_reason_absence`, points: 0 },
      { label: '出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '療養・心身障害', value: `${prefix}_reason_illness`, points: 0 },
      { label: '就学', value: `${prefix}_reason_education`, points: 0 },
      { label: '親族の介護・看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '家庭の災害', value: `${prefix}_reason_disaster`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の就労時間は？`,
      inputType: 'radio',
      options: employmentOptions(prefix),
    },
    {
      id: `${prefix}_jobseeking`,
      category,
      label: `${parentLabel}の内定・求職の状況は？`,
      helpText: '派遣等で勤務地未定の場合も内定に含まれます',
      inputType: 'radio',
      options: jobSeekingOptions(prefix),
    },
    {
      id: `${prefix}_otherwork`,
      category,
      label: `${parentLabel}は基準以下の就労にあてはまりますか？`,
      inputType: 'radio',
      options: otherWorkOptions(prefix),
    },
    {
      id: `${prefix}_absence`,
      category,
      label: `${parentLabel}は不在の状態ですか？`,
      inputType: 'radio',
      options: absenceOptions(prefix),
    },
    {
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}の出産の状況は？`,
      helpText: '公式の点数表では母の欄のみに点数があります',
      inputType: 'radio',
      options: childbirthOptions(prefix),
    },
    {
      id: `${prefix}_illness`,
      category,
      label: `${parentLabel}の療養・心身障害の状況は？`,
      inputType: 'radio',
      options: illnessOptions(prefix),
    },
    {
      id: `${prefix}_education`,
      category,
      label: `${parentLabel}の就学・技能習得の状況は？`,
      helpText: '就労の点数に準じます',
      inputType: 'radio',
      options: educationOptions(prefix),
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
      label: `${parentLabel}は家庭の災害にあてはまりますか？`,
      inputType: 'radio',
      options: disasterOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// ---------------------------------------------------------------------------
// 調整点
// ---------------------------------------------------------------------------

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_household',
    category: 'adjustment',
    label: '家庭の事情にあてはまるものは？',
    helpText: 'ひとり親家庭・生活保護世帯の項目は重複しません。転所選考では加点されません',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_household_no', points: 0 },
      { label: 'ひとり親家庭（生活保護世帯は除く）', value: 'adj_household_130', points: 130 },
      {
        label: 'ひとり親家庭であるが、同居の親族に生計中心者がある場合',
        value: 'adj_household_110',
        points: 110,
      },
      {
        label: '各関係機関・部署での総合的な状況で判断する要支援世帯',
        value: 'adj_household_80',
        points: 80,
      },
      {
        label: '生活保護世帯（就労により自立支援につながる場合）',
        value: 'adj_household_30',
        points: 30,
      },
      { label: '里親', value: 'adj_household_10', points: 10 },
    ],
  },
  {
    id: 'adj_work_days',
    category: 'adjustment',
    label: '就労日数（父母それぞれ）は？',
    helpText: '月20日以上は0点、月16日以上は5点減となります',
    inputType: 'radio',
    options: [
      { label: '父母ともに月20日以上、または該当しない', value: 'adj_work_days_0', points: 0 },
      { label: '父母のうち1人が月16日以上（20日未満）', value: 'adj_work_days_m5', points: -5 },
      { label: '父母ともに月16日以上（20日未満）', value: 'adj_work_days_m10', points: -10 },
    ],
  },
  {
    id: 'adj_child_status',
    category: 'adjustment',
    label: '申込児童の保育の状況は？',
    helpText: '認可外保育施設等への保育委託と同伴就労は、転所選考では加点されません',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_child_status_no', points: 0 },
      {
        label: '市内の地域型保育・事業所内保育施設や2歳児までの認可施設を卒園する',
        value: 'adj_child_status_30',
        points: 30,
      },
      {
        label: '月16日かつ月64時間以上、就労等で市外認可保育施設または認可外保育施設等へ保育委託あり',
        value: 'adj_child_status_20',
        points: 20,
      },
      {
        label: '月13日かつ月52時間以上、就労等で市外認可保育施設または認可外保育施設等へ保育委託あり',
        value: 'adj_child_status_10a',
        points: 10,
      },
      {
        label: '同伴就労（就労証明に記載があり、雇用契約通りの就労実績が直近1か月分確認できる場合）',
        value: 'adj_child_status_10b',
        points: 10,
      },
    ],
  },
  {
    id: 'adj_declined',
    category: 'adjustment',
    label: '入所を辞退したことがありますか？',
    helpText: '1回ごとに20点減算され、申請年度と次年度まで適用されます',
    inputType: 'radio',
    options: [
      { label: 'ない', value: 'adj_declined_0', points: 0 },
      { label: '1回', value: 'adj_declined_1', points: -20 },
      { label: '2回', value: 'adj_declined_2', points: -40 },
    ],
  },
  {
    id: 'adj_multiple_birth',
    category: 'adjustment',
    label: '多胎児ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_multiple_birth_no', points: 0 },
      { label: 'はい', value: 'adj_multiple_birth_yes', points: 10 },
    ],
  },
  {
    id: 'adj_grandparent',
    category: 'adjustment',
    label: '60歳未満の祖父母等と同居していますか？',
    helpText: '保育不可証明書類がない場合に減算されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ（同居していない、または証明書類あり）', value: 'adj_grandparent_no', points: 0 },
      { label: 'はい（保育不可証明書類なし）', value: 'adj_grandparent_yes', points: -50 },
    ],
  },
  {
    id: 'adj_child_disability',
    category: 'adjustment',
    label: '申込児童が手帳を所持していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_child_disability_no', points: 0 },
      { label: 'はい', value: 'adj_child_disability_yes', points: 10 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: '市内認可施設に入所している兄弟姉妹はいますか？',
    helpText: '転所選考では加点されません',
    inputType: 'radio',
    options: [
      { label: 'いない', value: 'adj_sibling_no', points: 0 },
      { label: '1人', value: 'adj_sibling_10', points: 10 },
      { label: '2人以上', value: 'adj_sibling_20', points: 20 },
    ],
  },
  {
    id: 'adj_sibling_transfer',
    category: 'adjustment',
    label: '兄弟姉妹が別々の市内認可園に入所中で、同一園への転所を希望しますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_transfer_no', points: 0 },
      { label: 'はい', value: 'adj_sibling_transfer_yes', points: 400 },
    ],
  },
  {
    id: 'adj_hoikushi',
    category: 'adjustment',
    label: '保護者が保育士として市内保育施設に勤務していますか？',
    helpText:
      '保育士資格証があり、市内保育施設（認可外・一時保育・病児保育を含む）で月20日以上・1日6時間以上の就労証明書がある場合（内定も含む）が対象です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_hoikushi_0', points: 0 },
      { label: 'はい（1人）', value: 'adj_hoikushi_20', points: 20 },
      { label: 'はい（2人）', value: 'adj_hoikushi_40', points: 40 },
    ],
  },
  {
    id: 'adj_workplace',
    category: 'adjustment',
    label: '勤務地はどこですか？',
    helpText: '就労証明書の就労先事業所で判断されます。本人記載がない場合は事業所の所在地により判定されます',
    inputType: 'radio',
    options: [
      { label: '市内・未定', value: 'adj_workplace_0', points: 0 },
      { label: '市外（1人）', value: 'adj_workplace_1', points: 1 },
      { label: '市外（2人）、または県外（1人）', value: 'adj_workplace_2', points: 2 },
      { label: '県外（2人）', value: 'adj_workplace_4', points: 4 },
    ],
  },
];

export const fujiminoData: MunicipalityData = {
  municipality,
  questions: [...buildParentQuestions(1), ...buildParentQuestions(2), ...adjustmentQuestions],
};
