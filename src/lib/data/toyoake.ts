import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 豊明市 保育所等 利用調整 基準指数・調整指数データ
//
// 出典: 豊明市「保育所等利用案内（令和8年度）」10ページ
//       「5. 豊明市保育所等利用調整指数表（令和8年度）」
//       https://www.city.toyoake.lg.jp/secure/31448/R8riyouannnai.pdf
//       （令和8年度保育所等利用申し込みのご案内 https://www.city.toyoake.lg.jp/22048.htm からリンク）
//
// 2026-08-31: 従来のデータは他自治体と同じ点数配列のテンプレート（推定値）だったため、
// 上記の公式指数表を読み取って全面的に置き換えた。
//
// **前回（2026-08-19）は市サイトがWAFでブロックされPDFを取得できず failed にしていたが、
// 今回は通常のHTTPクライアントで取得できた。**
// なお指数表のページはPDF内で画像として置かれており、テキスト抽出では6文字しか取れない。
// ページを190dpiで画像化して読み取った。
//
// ## 計算方式
// 合計 = 父（基準指数）＋父（調整指数①）＋母（基準指数）＋母（調整指数①）＋調整指数②
// → 父母それぞれの基準指数と調整指数①を足し、世帯単位の調整指数②を加える加算方式。
// 基準指数は父母各最大20点。
//
// **原典の注記: 「指数表は毎年度見直すことがあるため、次年度は変更となる場合があります。」**
//
// ## 基準指数
// 1 就労 (1)会社員・経営者（自営業・農業）… 就労時間 175H/月以上20／160H以上19／140H以上18／
//   120H以上17／100H以上16／80H以上15／60H以上14
//   (2)内職 12
// 2 就学 … 就学時間 175H/月以上17／160H以上16／140H以上15／120H以上14／100H以上13／
//   80H以上12／60H以上11
// 3 出産 18
// 4 育児休業（3歳児〜5歳児のみ）14
// 5 疾病、障がい等
//   (1)疾病 … 入院18／通院（16日/月以上の治療が必要な場合）13／
//     自宅療養（医者が保育に支障があると認めた場合）11
//   (2)障害者手帳・療育手帳 … 1・2級又はA 18／3・4級又はB・C 10／上記以外 9
//     （いずれも「障がい部位により保育ができない場合に限る。」）
// 6 親族の介護・看護 … 介護・看護時間 120H/月以上12／60H/月以上10
// 7 災害復旧 18
// 8 求職活動・起業準備 3
// 9 通園施設付添 14
//
// ## 調整指数①（保護者ごと）
// 【就労 調整指数】経営者（自営業）で公的書類無の場合 △2／保育士・看護師※1 +3
// 【就学 調整指数】受験者 △2
// ※1 市内の保育所・地域型保育事業・認定こども園において、保育士・看護師として
//     継続的に就労する（予定者を含む。）場合に限ります。
//
// ## 調整指数②（世帯単位）
// 【世帯状況 調整指数】父親または母親が不在の場合 +25
// 【その他】
//  1 利用第1希望保育所等が兄弟で同じ場合、または利用第1希望保育所等に兄弟が在園している場合
//    （1号認定利用者は除く）+5
//  2 育休取得による退所後に再度利用を申込む場合※2 +3
//  3 転園児※3 +3
//  4 市内認可外保育施設利用者（要認定）※4 +3
//  5 同一施設希望の1号認定利用者（年少から年長）+5
//  6 里親制度を利用している児童※5 +5
//  7 保育料・給食費滞納者（市との面談に応じない場合）△5
//  8 多胎児が利用申込みする場合 +1
//  9 虐待やDVのおそれがある場合 ※6
// ※2 3〜5歳児クラスの育休事由での利用申込みに限ります。
// ※3 市内の保育所・地域型保育事業・認定こども園（保育所部分）から転園を希望される場合に限ります。
// ※4 保育所等利用保留中に、保育認定を受けた状態でベイビーハグス保育園を利用している場合加点されます。
// ※5 措置決定通知書の確認が必要になります。
//
// ## 質問に入れなかった規定
// - **調整指数②の9「虐待やDVのおそれがある場合」は※6「児童福祉法の観点から特殊事情で
//   市長が必要と認める場合適宜判断します」**とされていて点数が定まらないため、質問に入れていない
// - 「＊マミーナ・メモリーツリー三崎・前後・なかよし・かなで保育園に在籍している場合、
//   3歳児（年少）クラスへの進級の際は、申請により希望する保育所等へ優先的に転園のご案内をします。」
// ---------------------------------------------------------------------------

const municipality = {
  id: 'toyoake',
  name: '豊明市',
  slug: 'toyoake',
  prefecture: '愛知県',
  maxBasePoints: 40, // 父母各20点
} as const;

// ---------------------------------------------------------------------------
// 基準指数の選択肢（父母各最大20点）
// ---------------------------------------------------------------------------

/** 1 就労 */
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '会社員・経営者（自営業・農業）：月175時間以上', value: `${prefix}_employment_20`, points: 20 },
  { label: '会社員・経営者（自営業・農業）：月160時間以上', value: `${prefix}_employment_19`, points: 19 },
  { label: '会社員・経営者（自営業・農業）：月140時間以上', value: `${prefix}_employment_18`, points: 18 },
  { label: '会社員・経営者（自営業・農業）：月120時間以上', value: `${prefix}_employment_17`, points: 17 },
  { label: '会社員・経営者（自営業・農業）：月100時間以上', value: `${prefix}_employment_16`, points: 16 },
  { label: '会社員・経営者（自営業・農業）：月80時間以上', value: `${prefix}_employment_15`, points: 15 },
  { label: '会社員・経営者（自営業・農業）：月60時間以上', value: `${prefix}_employment_14`, points: 14 },
  { label: '内職', value: `${prefix}_employment_12`, points: 12 },
];

/** 2 就学 */
const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '就学時間 月175時間以上', value: `${prefix}_education_17`, points: 17 },
  { label: '就学時間 月160時間以上', value: `${prefix}_education_16`, points: 16 },
  { label: '就学時間 月140時間以上', value: `${prefix}_education_15`, points: 15 },
  { label: '就学時間 月120時間以上', value: `${prefix}_education_14`, points: 14 },
  { label: '就学時間 月100時間以上', value: `${prefix}_education_13`, points: 13 },
  { label: '就学時間 月80時間以上', value: `${prefix}_education_12`, points: 12 },
  { label: '就学時間 月60時間以上', value: `${prefix}_education_11`, points: 11 },
];

/** 3 出産 */
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産', value: `${prefix}_childbirth_18`, points: 18 },
];

/** 4 育児休業（3歳児〜5歳児のみ） */
const parentalLeaveOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_parental_leave_none`, points: 0 },
  { label: '育児休業中（3歳児〜5歳児のみ）', value: `${prefix}_parental_leave_14`, points: 14 },
];

/** 5(1) 疾病 */
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院', value: `${prefix}_illness_18`, points: 18 },
  { label: '通院（月16日以上の治療が必要な場合）', value: `${prefix}_illness_13`, points: 13 },
  { label: '自宅療養（医者が保育に支障があると認めた場合）', value: `${prefix}_illness_11`, points: 11 },
];

/** 5(2) 障害者手帳・療育手帳（障がい部位により保育ができない場合に限る） */
const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '1・2級またはA', value: `${prefix}_disability_18`, points: 18 },
  { label: '3・4級またはB・C', value: `${prefix}_disability_10`, points: 10 },
  { label: '上記以外', value: `${prefix}_disability_9`, points: 9 },
];

/** 6 親族の介護・看護 */
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '介護・看護時間 月120時間以上', value: `${prefix}_care_12`, points: 12 },
  { label: '介護・看護時間 月60時間以上', value: `${prefix}_care_10`, points: 10 },
];

/** 7 災害復旧 */
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '災害復旧にあたっている', value: `${prefix}_disaster_18`, points: 18 },
];

/** 8 求職活動・起業準備 */
const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動・起業準備', value: `${prefix}_jobseeking_3`, points: 3 },
];

/** 9 通園施設付添 */
const accompanyOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_accompany_none`, points: 0 },
  { label: '通園施設への付添', value: `${prefix}_accompany_14`, points: 14 },
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
      { label: '仕事をしている', value: `${prefix}_reason_employment`, points: 0 },
      { label: '学校に通っている', value: `${prefix}_reason_education`, points: 0 },
      { label: '出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '育児休業中（3歳児〜5歳児のみ）', value: `${prefix}_reason_parental_leave`, points: 0 },
      { label: '病気の治療中', value: `${prefix}_reason_illness`, points: 0 },
      { label: '障がいがある', value: `${prefix}_reason_disability`, points: 0 },
      { label: '親族の介護・看護をしている', value: `${prefix}_reason_care`, points: 0 },
      { label: '災害復旧にあたっている', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '仕事を探している・起業を準備している', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '通園施設に付き添っている', value: `${prefix}_reason_accompany`, points: 0 },
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
      id: `${prefix}_education`,
      category,
      label: `${parentLabel}はどのくらい通学していますか？`,
      inputType: 'radio',
      options: educationOptions(prefix),
    },
    {
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}は出産の予定・前後ですか？`,
      inputType: 'radio',
      options: childbirthOptions(prefix),
    },
    {
      id: `${prefix}_parental_leave`,
      category,
      label: `${parentLabel}は育児休業中ですか？`,
      helpText: '基準指数がつくのは3歳児〜5歳児クラスの申込みのみです',
      inputType: 'radio',
      options: parentalLeaveOptions(prefix),
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
      label: `${parentLabel}の手帳の等級は？`,
      helpText: '障がい部位により保育ができない場合に限ります',
      inputType: 'radio',
      options: disabilityOptions(prefix),
    },
    {
      id: `${prefix}_care`,
      category,
      label: `${parentLabel}はどのくらい親族を介護・看護していますか？`,
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
      label: `${parentLabel}は求職活動・起業準備をしていますか？`,
      inputType: 'radio',
      options: jobSeekingOptions(prefix),
    },
    {
      id: `${prefix}_accompany`,
      category,
      label: `${parentLabel}は通園施設に付き添っていますか？`,
      inputType: 'radio',
      options: accompanyOptions(prefix),
    },
    // --- 調整指数①（保護者ごと。就労・就学の事由を選んだときに表示する） ---
    {
      id: `${prefix}_adj_work`,
      category,
      showFor: ['employment', 'education'],
      label: `${parentLabel}の就労・就学に関する加減算はありますか？`,
      helpText: '保育士・看護師の加算は、市内の保育所・地域型保育事業・認定こども園で継続的に就労する（予定を含む）場合に限ります',
      inputType: 'select',
      options: [
        { label: 'あてはまらない', value: `${prefix}_adj_work_none`, points: 0 },
        { label: '保育士・看護師として市内の保育施設等で就労している（予定を含む）', value: `${prefix}_adj_work_plus3`, points: 3 },
        { label: '経営者（自営業）で公的書類がない', value: `${prefix}_adj_work_minus2`, points: -2 },
        { label: '受験者（就学）', value: `${prefix}_adj_work_exam_minus2`, points: -2 },
      ],
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// ---------------------------------------------------------------------------
// 調整指数②（世帯単位）の質問
// ---------------------------------------------------------------------------

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: '父親または母親が不在ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい', value: 'adj_single_parent_yes', points: 25 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: '第1希望の保育所等にきょうだいが関係していますか？',
    helpText: '1号認定利用者は除きます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_no', points: 0 },
      {
        label: 'きょうだいで第1希望が同じ、または第1希望の保育所等にきょうだいが在園している',
        value: 'adj_sibling_yes',
        points: 5,
      },
    ],
  },
  {
    id: 'adj_leave_return',
    category: 'adjustment',
    label: '育休取得による退所後に、再度利用を申し込みますか？',
    helpText: '3〜5歳児クラスの育休事由での利用申込みに限ります',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_leave_return_no', points: 0 },
      { label: 'はい', value: 'adj_leave_return_yes', points: 3 },
    ],
  },
  {
    id: 'adj_transfer',
    category: 'adjustment',
    label: '転園希望ですか？',
    helpText: '市内の保育所・地域型保育事業・認定こども園（保育所部分）から転園を希望する場合に限ります',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_transfer_no', points: 0 },
      { label: 'はい', value: 'adj_transfer_yes', points: 3 },
    ],
  },
  {
    id: 'adj_unlicensed',
    category: 'adjustment',
    label: '市内の認可外保育施設を利用していますか？',
    helpText: '保育所等の利用保留中に、保育認定を受けた状態でベイビーハグス保育園を利用している場合に加点されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unlicensed_no', points: 0 },
      { label: 'はい', value: 'adj_unlicensed_yes', points: 3 },
    ],
  },
  {
    id: 'adj_type1_same',
    category: 'adjustment',
    label: '同一施設を希望する1号認定利用者（年少から年長）ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_type1_same_no', points: 0 },
      { label: 'はい', value: 'adj_type1_same_yes', points: 5 },
    ],
  },
  {
    id: 'adj_foster',
    category: 'adjustment',
    label: '里親制度を利用している児童ですか？',
    helpText: '措置決定通知書の確認が必要になります',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_foster_no', points: 0 },
      { label: 'はい', value: 'adj_foster_yes', points: 5 },
    ],
  },
  {
    id: 'adj_multiple_birth',
    category: 'adjustment',
    label: '多胎児が利用申込みをしますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_multiple_birth_no', points: 0 },
      { label: 'はい', value: 'adj_multiple_birth_yes', points: 1 },
    ],
  },
  {
    id: 'adj_unpaid_fee',
    category: 'adjustment',
    label: '保育料・給食費の滞納がありますか？',
    helpText: '市との面談に応じない場合に減点されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unpaid_fee_no', points: 0 },
      { label: 'はい（市との面談に応じていない）', value: 'adj_unpaid_fee_yes', points: -5 },
    ],
  },
];

// ---------------------------------------------------------------------------
// エクスポート
// ---------------------------------------------------------------------------

export const toyoakeData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
