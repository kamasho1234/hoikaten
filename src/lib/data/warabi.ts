import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 蕨市 保育の実施利用調整基準表（基準指数・調整指数）データ
//
// 出典: 蕨市子ども未来課保育係「令和8年度 保育園入園のてびき」P13
//       「蕨市保育の実施利用調整基準表」（令和7年4月入園より適用）
//       https://www.city.warabi.saitama.jp/_res/projects/default_project/_page_/001/012/038/r8tebiki.pdf
//       （蕨市Webサイト「令和8年度 保育園申込書類」
//         https://www.city.warabi.saitama.jp/kosodate/hoiku/hoikuen/1012038.html からリンク）
//
// 2026-08-19: 従来のデータは他自治体と同じ点数配列のテンプレート（推定値）だったため、
//             上記の公式基準表を読み取って全面的に置き換えた。
//
// 原典の注記:
//   基準指数は「父母それぞれがいずれか一つに該当」する。
//   居宅内労働（店舗での接客や居宅外での勤務が中心となる場合、テレワークを除く）は上記指数より-1。
//   就労内定は上記指数より-1。
//   「市外にお住まいの方（入園希望月の前月までに転入予定の方を除く）は合計指数を0とします」
//   「希望する保育所等に入所できない場合は、育児休業の延長も許容できる場合」は合計指数を0とする。
//
// 質問に含めていない原典の項目（合計指数を0にする規定で、減点値として数値化できないもの）:
//   ・育児休業の延長も許容できる場合
//   ・市外にお住まいの方（転入予定者を除く）
// ---------------------------------------------------------------------------

const municipality = {
  id: 'warabi',
  name: '蕨市',
  slug: 'warabi',
  prefecture: '埼玉県',
  maxBasePoints: 80, // 父母各40点（特別の支援を要する家庭）
} as const;

// ---------------------------------------------------------------------------
// 基準指数（保護者の状況）。父母それぞれがいずれか一つに該当する
// ---------------------------------------------------------------------------

/** 就労（外勤・自営（居宅外）） */
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '週5日以上：実働150時間/月以上の就労', value: `${prefix}_employment_20`, points: 20 },
  { label: '週5日以上：実働130時間/月以上150時間/月未満の就労', value: `${prefix}_employment_19`, points: 19 },
  { label: '週5日以上：実働110時間/月以上130時間/月未満の就労', value: `${prefix}_employment_18`, points: 18 },
  { label: '週5日以上：実働90時間/月以上110時間/月未満の就労', value: `${prefix}_employment_17`, points: 17 },
  { label: '週5日以上：実働64時間/月以上90時間/月未満の就労', value: `${prefix}_employment_16`, points: 16 },
  { label: '週4日：実働120時間/月以上の就労', value: `${prefix}_employment_4d_18`, points: 18 },
  { label: '週4日：実働104時間/月以上120時間/月未満の就労', value: `${prefix}_employment_4d_17`, points: 17 },
  { label: '週4日：実働88時間/月以上104時間/月未満の就労', value: `${prefix}_employment_4d_16`, points: 16 },
  { label: '週4日：実働72時間/月以上88時間/月未満の就労', value: `${prefix}_employment_4d_15`, points: 15 },
  { label: '週4日：実働64時間/月以上72時間/月未満の就労', value: `${prefix}_employment_4d_14`, points: 14 },
  { label: '週3日：実働90時間/月以上の就労', value: `${prefix}_employment_3d_13`, points: 13 },
  { label: '週3日：実働78時間/月以上90時間/月未満の就労', value: `${prefix}_employment_3d_12`, points: 12 },
  { label: '週3日：実働64時間/月以上78時間/月未満の就労', value: `${prefix}_employment_3d_11`, points: 11 },
  { label: '週2日：実働64時間/月以上の就労を常態', value: `${prefix}_employment_2d_10`, points: 10 },
  { label: '上記に当てはまらない外勤、自営（居宅外）：実働64時間/月未満', value: `${prefix}_employment_9`, points: 9 },
];

/** 就労形態による減点（居宅内労働・就労内定） */
const employmentTypeOptions = (prefix: string) => [
  { label: '外勤・自営（居宅外）で就労中', value: `${prefix}_emptype_normal`, points: 0 },
  { label: '居宅内労働である（テレワークを除く）', value: `${prefix}_emptype_home`, points: -1 },
  { label: '就労内定である', value: `${prefix}_emptype_naitei`, points: -1 },
  { label: '居宅内労働かつ就労内定である', value: `${prefix}_emptype_both`, points: -2 },
];

/** 出産 */
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産予定日の前6週（多胎児は14週）から出産後8週', value: `${prefix}_childbirth_15`, points: 15 },
];

/** 病気・障害 */
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  {
    label: '病気：概ね1か月以上の入院（入院予定を含む）、常時臥床、精神性疾患、感染性疾患',
    value: `${prefix}_illness_20`,
    points: 20,
  },
  { label: '病気：一般療養', value: `${prefix}_illness_16`, points: 16 },
  {
    label: '障害：身体1・2級、療育手帳マルA・A・B、精神1〜3級',
    value: `${prefix}_illness_disability_20`,
    points: 20,
  },
  { label: '障害：身体3級、療育手帳C', value: `${prefix}_illness_disability_16`, points: 16 },
  { label: '障害：身体4級', value: `${prefix}_illness_disability_12`, points: 12 },
];

/** 看護・介護 */
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  {
    label: '週5日以上の常時付き添い（病院通院、施設通所、入院、自宅看護）または臥床者・重度心身障害者の常時介護',
    value: `${prefix}_care_20`,
    points: 20,
  },
  { label: '週4日以上の常時付き添いによる病院通院、施設通所、入院、自宅看護', value: `${prefix}_care_16`, points: 16 },
  { label: '週3日以上の常時付き添いによる病院通院、施設通所、入院、自宅看護', value: `${prefix}_care_12`, points: 12 },
];

/** 災害復旧 */
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  {
    label: '震災、風水害、火災等による家屋の損壊、その他の災害の復旧',
    value: `${prefix}_disaster_20`,
    points: 20,
  },
];

/** 求職活動 */
const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  {
    label: '継続的な求職活動（起業の準備、インターンシップを含む）',
    value: `${prefix}_jobseeking_6`,
    points: 6,
  },
];

/** 就学（就労の指数を準用。カリキュラム等が予定の場合および通信教育は各-1） */
const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '週5日以上：実働150時間/月以上の就学', value: `${prefix}_education_20`, points: 20 },
  { label: '週5日以上：実働130時間/月以上150時間/月未満の就学', value: `${prefix}_education_19`, points: 19 },
  { label: '週5日以上：実働110時間/月以上130時間/月未満の就学', value: `${prefix}_education_18`, points: 18 },
  { label: '週5日以上：実働90時間/月以上110時間/月未満の就学', value: `${prefix}_education_17`, points: 17 },
  { label: '週5日以上：実働64時間/月以上90時間/月未満の就学', value: `${prefix}_education_16`, points: 16 },
  { label: '週4日：実働120時間/月以上の就学', value: `${prefix}_education_4d_18`, points: 18 },
  { label: '週4日：実働64時間/月以上120時間/月未満の就学', value: `${prefix}_education_4d_14`, points: 14 },
  { label: '週3日：実働64時間/月以上の就学', value: `${prefix}_education_3d_11`, points: 11 },
  { label: '週2日：実働64時間/月以上の就学を常態', value: `${prefix}_education_2d_10`, points: 10 },
  {
    label: 'カリキュラム等が予定の場合、または通信教育の場合（上記から各1点減）',
    value: `${prefix}_education_yotei`,
    points: 9,
  },
];

/** 保護者不存在・その他 */
const absenceOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_absence_none`, points: 0 },
  { label: '不存在：死亡、離別、拘禁等', value: `${prefix}_absence_20`, points: 20 },
  { label: '不存在：別居（離婚調停中等）、行方不明', value: `${prefix}_absence_18`, points: 18 },
  {
    label: 'その他：特別の支援を要する家庭（児童虐待やDV等、内容調査の上）',
    value: `${prefix}_absence_40`,
    points: 40,
  },
];

/** 未確認 */
const unconfirmedOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_unconfirmed_none`, points: 0 },
  {
    label: '保育を必要とする理由等を証明する書類が申込締切日までに提出できない',
    value: `${prefix}_unconfirmed_6`,
    points: 6,
  },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: '父母それぞれがいずれか一つに該当します',
    inputType: 'select',
    options: [
      { label: '就労（外勤・自営・居宅内労働）', value: `${prefix}_reason_employment`, points: 0 },
      { label: '出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '病気・障害', value: `${prefix}_reason_illness`, points: 0 },
      { label: '看護・介護', value: `${prefix}_reason_care`, points: 0 },
      { label: '災害復旧', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '求職活動', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '就学', value: `${prefix}_reason_education`, points: 0 },
      { label: '保護者の不存在・特別の支援を要する家庭', value: `${prefix}_reason_absence`, points: 0 },
      { label: '証明書類が提出できない（未確認）', value: `${prefix}_reason_unconfirmed`, points: 0 },
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
      id: `${prefix}_emptype`,
      category,
      // 「就労」を選んだときだけ表示する（居宅内労働・就労内定の減点）
      showFor: ['employment'],
      label: `${parentLabel}の就労形態は？`,
      helpText:
        '居宅内労働（店舗での接客や居宅外での勤務が中心となる場合、テレワークを除く）と就労内定は、それぞれ1点減となります',
      inputType: 'radio',
      options: employmentTypeOptions(prefix),
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
      label: `${parentLabel}の病気・障害の状況は？`,
      inputType: 'radio',
      options: illnessOptions(prefix),
    },
    {
      id: `${prefix}_care`,
      category,
      label: `${parentLabel}の看護・介護の状況は？`,
      inputType: 'radio',
      options: careOptions(prefix),
    },
    {
      id: `${prefix}_disaster`,
      category,
      label: `${parentLabel}は災害の復旧に当たっていますか？`,
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
      label: `${parentLabel}の就学の状況は？`,
      helpText: '職業訓練校および学校教育法に規定する学校等への在学が対象で、就労の指数が準用されます',
      inputType: 'radio',
      options: educationOptions(prefix),
    },
    {
      id: `${prefix}_absence`,
      category,
      label: `${parentLabel}の不存在等の状況は？`,
      inputType: 'radio',
      options: absenceOptions(prefix),
    },
    {
      id: `${prefix}_unconfirmed`,
      category,
      label: `${parentLabel}は証明書類を申込締切日までに提出できますか？`,
      inputType: 'radio',
      options: unconfirmedOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// ---------------------------------------------------------------------------
// 調整指数（複数該当の場合あり）
// ---------------------------------------------------------------------------

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_household',
    category: 'adjustment',
    label: '世帯の状況は？',
    helpText: '離婚調停中等による別居の場合は、上記指数より1点減となります',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_household_no', points: 0 },
      { label: '両親不存在世帯', value: 'adj_household_5a', points: 5 },
      {
        label: 'ひとり親世帯で、同居の親族等が当該児童を保育できない（65歳以上、要介護、就労等）',
        value: 'adj_household_5b',
        points: 5,
      },
      { label: 'ひとり親世帯で、同居の親族等が当該児童を保育可能', value: 'adj_household_3', points: 3 },
      { label: '離婚調停中等による別居（ひとり親世帯で保育できない場合から1点減）', value: 'adj_household_4', points: 4 },
    ],
  },
  {
    id: 'adj_layoff',
    category: 'adjustment',
    label: '生計中心者の失業により就労の必要性がありますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_layoff_no', points: 0 },
      { label: 'はい', value: 'adj_layoff_yes', points: 2 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯ですか？',
    helpText: '就労や職業訓練校への就学等、自立支援につながる場合のみが対象です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい', value: 'adj_welfare_yes', points: 1 },
    ],
  },
  {
    id: 'adj_shokibo_grad',
    category: 'adjustment',
    label: '市内の小規模保育園に在籍している児童の卒園（3歳以上児クラスに該当）ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_shokibo_grad_no', points: 0 },
      { label: 'はい', value: 'adj_shokibo_grad_yes', points: 20 },
    ],
  },
  {
    id: 'adj_ninkagai',
    category: 'adjustment',
    label: '認可外保育施設等に週3日以上預けていますか？',
    helpText:
      '市内保育所等を利用できなかったが、保護者の就労等により、認可外保育施設（企業主導型保育含む）、職場内保育室、管外保育所等へ預けている場合が対象です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_ninkagai_no', points: 0 },
      { label: 'はい', value: 'adj_ninkagai_yes', points: 2 },
    ],
  },
  {
    id: 'adj_tanshin',
    category: 'adjustment',
    label: '保護者のひとりが単身赴任や海外勤務中等ですか？',
    helpText: '同居の親族等が当該児童を保育できないと認められる場合（65歳以上、要介護、就労等）が対象です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_tanshin_no', points: 0 },
      { label: 'はい', value: 'adj_tanshin_yes', points: 2 },
    ],
  },
  {
    id: 'adj_other_resident',
    category: 'adjustment',
    label: '同居の親族その他の者が当該児童を保育可能ですか？',
    helpText: '65歳以上、要介護、就労等により保育できないと認められる場合は除きます。ひとり親世帯は対象外です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_other_resident_no', points: 0 },
      { label: 'はい', value: 'adj_other_resident_yes', points: -2 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: 'きょうだいについて同一の保育所等の利用を希望しますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_no', points: 0 },
      { label: 'はい', value: 'adj_sibling_yes', points: 2 },
    ],
  },
  {
    id: 'adj_leave_return',
    category: 'adjustment',
    label: '育児休業の終了により入園を希望しますか？',
    helpText: '育児休業取得前に保育園等（認可外含む）を利用していた場合が対象です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_leave_return_no', points: 0 },
      { label: 'はい', value: 'adj_leave_return_yes', points: 2 },
    ],
  },
  {
    id: 'adj_hoikushi',
    category: 'adjustment',
    label: '保護者は保育士等として保育園等に勤務していますか？',
    helpText: '勤務予定を含みます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_hoikushi_no', points: 0 },
      { label: '蕨市内の保育園等（月20日以上かつ1日6時間以上）', value: 'adj_hoikushi_20', points: 20 },
      { label: '戸田市内の保育園等（月20日以上かつ1日6時間以上）', value: 'adj_hoikushi_4', points: 4 },
      { label: '蕨市内の保育園等（月20日未満または1日6時間未満）', value: 'adj_hoikushi_3', points: 3 },
    ],
  },
  {
    id: 'adj_social_care',
    category: 'adjustment',
    label: '虐待またはDVのおそれがあるなど、社会的養護が必要ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_social_care_no', points: 0 },
      { label: 'はい', value: 'adj_social_care_yes', points: 40 },
    ],
  },
  {
    id: 'adj_arrears',
    category: 'adjustment',
    label: '保育料・給食費・留守家庭児童保育料の過年度滞納がありますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_arrears_no', points: 0 },
      { label: 'はい', value: 'adj_arrears_yes', points: -20 },
    ],
  },
];

export const warabiData: MunicipalityData = {
  municipality,
  questions: [...buildParentQuestions(1), ...buildParentQuestions(2), ...adjustmentQuestions],
};
