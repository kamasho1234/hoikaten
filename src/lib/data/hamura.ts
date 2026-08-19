import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 羽村市 利用調整（選考）基準表・調整点数データ
//
// 出典: 羽村市子ども家庭部子育て支援課「羽村市令和8年度 保育園・幼稚園等ガイドブック」P8
//       「別表（第4条関係）利用調整（選考）基準表」
//       https://www.city.hamura.tokyo.jp/cmsfiles/contents/0000020/20148/r8guidebook.pdf
//       （羽村市Webサイト「保育施設等の令和8年度利用申込みについて」
//         https://www.city.hamura.tokyo.jp/0000020148.html からリンク）
//
// 2026-08-19: 従来のデータは他自治体と同じ点数配列のテンプレート（推定値）だったため、
//             上記の公式基準表を読み取って全面的に置き換えた。
//
// 計算方式: min方式。原典の
//   「基準表に基づいて、保護者それぞれの基準点数を決定し、その中で基準点数が最も低い保護者の
//     基準点数に……調整点数を加算して判定する」による。
//   （点数同位の場合は世帯の合算点で判定される）
//
// 原典の注記:
//   就労の就労時間は「休憩時間を含み、通勤時間を含まない」
//   求職は「保育施設等利用開始後3か月以内に就労の状態につくことを条件とする」
//   介護・看護は「同居別居を問わない」
// ---------------------------------------------------------------------------

const municipality = {
  id: 'hamura',
  name: '羽村市',
  slug: 'hamura',
  prefecture: '東京都',
  maxBasePoints: 20, // 基準点数が最も低い保護者の点数を採用するため、世帯の基準点数は最大20点
  scoringMethod: 'min',
} as const;

// ---------------------------------------------------------------------------
// 利用調整（選考）基準表。父母それぞれについて選び、低い方が世帯の基準点数になる
// ---------------------------------------------------------------------------

/** 1 就労・内職 */
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '週5日以上・1日7時間以上', value: `${prefix}_employment_20`, points: 20 },
  { label: '週5日以上・1日6時間以上7時間未満', value: `${prefix}_employment_19`, points: 19 },
  { label: '週5日以上・1日4時間以上6時間未満', value: `${prefix}_employment_18`, points: 18 },
  { label: '週4日以上・1日7時間以上', value: `${prefix}_employment_19b`, points: 19 },
  { label: '週4日以上・1日6時間以上7時間未満', value: `${prefix}_employment_18b`, points: 18 },
  { label: '週4日以上・1日4時間以上6時間未満', value: `${prefix}_employment_17`, points: 17 },
  { label: '週3日以上・1日7時間以上', value: `${prefix}_employment_18c`, points: 18 },
  { label: '週3日以上・1日6時間以上7時間未満', value: `${prefix}_employment_17b`, points: 17 },
  { label: '週3日以上・1日4時間以上6時間未満', value: `${prefix}_employment_16`, points: 16 },
  { label: '内職：週3日以上、1日4時間以上', value: `${prefix}_employment_naishoku_13`, points: 13 },
];

/** 2 求職 */
const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  {
    label: '求職活動により保育にあたれない（起業準備、書類不備の場合を含む）',
    value: `${prefix}_jobseeking_11`,
    points: 11,
  },
];

/** 3 出産 */
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産前後（出産予定月とその前後2か月、計5か月以内）', value: `${prefix}_childbirth_17`, points: 17 },
];

/** 4 疾病・障害 */
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '疾病：入院中もしくは入院予定（おおむね1か月以上）', value: `${prefix}_illness_20`, points: 20 },
  { label: '疾病：常時病臥・感染性疾患', value: `${prefix}_illness_20b`, points: 20 },
  { label: '疾病：上記以外', value: `${prefix}_illness_17`, points: 17 },
  { label: '障害：身体1〜3級、愛の手帳1・2度', value: `${prefix}_illness_disability_20`, points: 20 },
  { label: '障害：身体4級、愛の手帳3・4度', value: `${prefix}_illness_disability_18`, points: 18 },
  { label: '障害：身体5・6級', value: `${prefix}_illness_disability_17`, points: 17 },
  { label: '精神性：精神障害者保健福祉手帳1・2級', value: `${prefix}_illness_mental_20`, points: 20 },
  { label: '精神性：精神障害者保健福祉手帳3級', value: `${prefix}_illness_mental_18`, points: 18 },
  { label: '精神性：上記以外', value: `${prefix}_illness_mental_17`, points: 17 },
];

/** 5 介護・看護（同居別居を問わない） */
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '付添：週3日4時間以上の病院等への付添など', value: `${prefix}_care_16`, points: 16 },
  {
    label: '観察：寝たきり等の親族または重度障害者等の常時観察と介護',
    value: `${prefix}_care_18`,
    points: 18,
  },
  { label: '観察：上記以外', value: `${prefix}_care_16b`, points: 16 },
];

/** 6 不存在 */
const absenceOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_absence_none`, points: 0 },
  { label: '死亡・離別・行方不明・拘禁など', value: `${prefix}_absence_20`, points: 20 },
];

/** 7 災害 */
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  {
    label: '震災・火災などによる自身の家屋損傷、その復旧のため保育にあたることができない',
    value: `${prefix}_disaster_20`,
    points: 20,
  },
];

/** 8 支援家庭 */
const supportOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_support_none`, points: 0 },
  { label: '児童虐待防止等の観点から特別の支援を要する', value: `${prefix}_support_20`, points: 20 },
];

/** 9 就学・職業訓練 */
const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '就学・職業訓練のため、日中の外出を常態とする', value: `${prefix}_education_15`, points: 15 },
];

/** 10 その他 */
const otherOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_other_none`, points: 0 },
  { label: '明らかに保育にあたれないと認められる', value: `${prefix}_other_20`, points: 20 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: '羽村市は保護者のうち、基準点数が最も低い方の点数に調整点数を加算して判定します',
    inputType: 'select',
    options: [
      { label: '就労（内職を含む）', value: `${prefix}_reason_employment`, points: 0 },
      { label: '求職', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '疾病・障害', value: `${prefix}_reason_illness`, points: 0 },
      { label: '介護・看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '不存在', value: `${prefix}_reason_absence`, points: 0 },
      { label: '災害', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '支援家庭', value: `${prefix}_reason_support`, points: 0 },
      { label: '就学・職業訓練', value: `${prefix}_reason_education`, points: 0 },
      { label: 'その他', value: `${prefix}_reason_other`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の就労の状況は？`,
      helpText: '就労時間は休憩時間を含み、通勤時間を含みません',
      inputType: 'radio',
      options: employmentOptions(prefix),
    },
    {
      id: `${prefix}_jobseeking`,
      category,
      label: `${parentLabel}は求職活動をしていますか？`,
      helpText: '保育施設等の利用開始後3か月以内に就労の状態につくことが条件です',
      inputType: 'radio',
      options: jobSeekingOptions(prefix),
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
      label: `${parentLabel}の疾病・障害の状況は？`,
      inputType: 'radio',
      options: illnessOptions(prefix),
    },
    {
      id: `${prefix}_care`,
      category,
      label: `${parentLabel}の介護・看護の状況は？`,
      helpText: '同居・別居を問いません',
      inputType: 'radio',
      options: careOptions(prefix),
    },
    {
      id: `${prefix}_absence`,
      category,
      label: `${parentLabel}は不存在の状態ですか？`,
      inputType: 'radio',
      options: absenceOptions(prefix),
    },
    {
      id: `${prefix}_disaster`,
      category,
      label: `${parentLabel}は災害の復旧にあたっていますか？`,
      inputType: 'radio',
      options: disasterOptions(prefix),
    },
    {
      id: `${prefix}_support`,
      category,
      label: `${parentLabel}は特別の支援を要する家庭にあてはまりますか？`,
      inputType: 'radio',
      options: supportOptions(prefix),
    },
    {
      id: `${prefix}_education`,
      category,
      label: `${parentLabel}は就学・職業訓練をしていますか？`,
      inputType: 'radio',
      options: educationOptions(prefix),
    },
    {
      id: `${prefix}_other`,
      category,
      label: `${parentLabel}はその他の事由にあてはまりますか？`,
      inputType: 'radio',
      options: otherOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// ---------------------------------------------------------------------------
// 調整点数
// ---------------------------------------------------------------------------

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親世帯ですか？',
    helpText: '監護する子ども以外に同居人がいる場合は除きます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい', value: 'adj_single_parent_yes', points: 3 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい', value: 'adj_welfare_yes', points: 2 },
    ],
  },
  {
    id: 'adj_priority',
    category: 'adjustment',
    label: '優先的に施設を利用する必要がある世帯ですか？',
    helpText: '選考会議で認められたものが対象です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_priority_no', points: 0 },
      { label: 'はい', value: 'adj_priority_yes', points: 5 },
    ],
  },
  {
    id: 'adj_child_disability',
    category: 'adjustment',
    label: '申込み児童が障害を有していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_child_disability_no', points: 0 },
      { label: 'はい', value: 'adj_child_disability_yes', points: 1 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: '現に兄弟姉妹が利用している保育施設等を希望しますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_no', points: 0 },
      { label: 'はい', value: 'adj_sibling_yes', points: 1 },
    ],
  },
  {
    id: 'adj_leave_return',
    category: 'adjustment',
    label: '育児休業取得のため施設の利用を解除した児童が、休業明けに再度申込みしますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_leave_return_no', points: 0 },
      { label: 'はい', value: 'adj_leave_return_yes', points: 2 },
    ],
  },
  {
    id: 'adj_ninkagai',
    category: 'adjustment',
    label: '施設利用希望月より遡って3か月以上、認可外施設の利用を常態としていますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_ninkagai_no', points: 0 },
      { label: 'はい', value: 'adj_ninkagai_yes', points: 1 },
    ],
  },
  {
    id: 'adj_other_resident',
    category: 'adjustment',
    label: '基準表1〜10に該当しない18歳以上65歳未満の同居者（別世帯も含む）がいますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_other_resident_no', points: 0 },
      { label: 'はい', value: 'adj_other_resident_yes', points: -3 },
    ],
  },
  {
    id: 'adj_outside',
    category: 'adjustment',
    label: '羽村市に在住・在勤していますか？',
    inputType: 'radio',
    options: [
      { label: '在住または在勤している', value: 'adj_outside_no', points: 0 },
      { label: 'いずれでもない', value: 'adj_outside_yes', points: -11 },
    ],
  },
  {
    id: 'adj_arrears',
    category: 'adjustment',
    label: '選考会議の際、3か月以上の保育料の滞納がありますか？',
    helpText: '卒園児を含みます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_arrears_no', points: 0 },
      { label: 'はい', value: 'adj_arrears_yes', points: -10 },
    ],
  },
  {
    id: 'adj_leave_extension',
    category: 'adjustment',
    label: '保護者が育児休業の延長を許容できますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_leave_extension_no', points: 0 },
      { label: 'はい', value: 'adj_leave_extension_yes', points: -20 },
    ],
  },
  {
    id: 'adj_hoikushi',
    category: 'adjustment',
    label: '保護者が保育士として保育施設等で保育に従事していますか？',
    helpText: '従事することが内定している場合を含みます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_hoikushi_no', points: 0 },
      { label: 'はい（市内の保育施設等）', value: 'adj_hoikushi_4', points: 4 },
      { label: 'はい（市外の保育施設等）', value: 'adj_hoikushi_2', points: 2 },
    ],
  },
  {
    id: 'adj_self_employed',
    category: 'adjustment',
    label: '保護者が自営業で中心者ではありませんか？',
    helpText: '児童の祖父母が経営している会社に勤めている場合も含みます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_self_employed_no', points: 0 },
      { label: 'はい', value: 'adj_self_employed_yes', points: -1 },
    ],
  },
  {
    id: 'adj_job_offer',
    category: 'adjustment',
    label: '保護者が利用開始希望月からの就職が内定していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_job_offer_no', points: 0 },
      { label: 'はい', value: 'adj_job_offer_yes', points: -3 },
    ],
  },
];

export const hamuraData: MunicipalityData = {
  municipality,
  questions: [...buildParentQuestions(1), ...buildParentQuestions(2), ...adjustmentQuestions],
};
