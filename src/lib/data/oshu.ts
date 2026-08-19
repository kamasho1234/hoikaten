import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 奥州市 保育所等利用調整基準（基本点数・加点基準・減点基準）データ
//
// 出典: 奥州市保育こども園課「令和8年度 奥州市保育施設等利用のしおり（2・3号用）」P23
//       「奥州市保育所等利用調整基準」（令和8年1月入所分〜適用）
//       https://www.city.oshu.iwate.jp/material/files/group/67/01_R08shiori_23.pdf
//       （奥州市Webサイト「保育所・認定こども園・幼稚園などの利用についてのご案内」
//         https://www.city.oshu.iwate.jp/kosodate_kyoiku/hoikuen_yochien/10914.html からリンク）
//
// 2026-08-19: 従来のデータは他自治体と同じ点数配列のテンプレート（推定値）だったため、
//             上記の公式基準を読み取って全面的に置き換えた。
//             しおりPDFの該当ページは画像のため、ページを画像化して読み取った。
//
// 計算方式: min方式。原典の「≪基本点数≫ 保護者のうち、いずれか低い者の点数を採用する」による。
//   全体は「≪基本点数≫＋≪加点基準≫－≪減点基準≫」で、同点の場合は≪同点優先基準≫で順位を決定する。
//
// 質問に含めていない原典の項目（幅があり数値化できないもの）:
//   ・基本点数10「1〜9のほか、それらに類するものとして市長が認める事由」3〜10点
//   ・加点基準13「1〜12のほか、優先保育を行う必要があると市長が認める場合」3〜10点
// 加点基準1〜12は、転園（地域型保育事業などの年齢による卒園がある保育所等からの卒園に伴うものを除く）
// の場合は適用されない。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'oshu',
  name: '奥州市',
  slug: 'oshu',
  prefecture: '岩手県',
  maxBasePoints: 10, // 保護者のうちいずれか低い者の点数を採用するため、世帯の基本点数は最大10点
  scoringMethod: 'min',
} as const;

// ---------------------------------------------------------------------------
// 基本点数（保育を必要とする事由）。父母それぞれについて選び、低い方が世帯の点数になる
// ---------------------------------------------------------------------------

/** 1 就労（居宅内就労・居宅外就労・自営業等・農業従事・内職など） */
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月140時間以上の就労を常態とする', value: `${prefix}_employment_9`, points: 9 },
  { label: '月120時間以上140時間未満の就労を常態とする', value: `${prefix}_employment_8`, points: 8 },
  { label: '月100時間以上120時間未満の就労を常態とする', value: `${prefix}_employment_7`, points: 7 },
  { label: '月80時間以上100時間未満の就労を常態とする', value: `${prefix}_employment_6`, points: 6 },
  { label: '月48時間以上80時間未満の就労を常態とする', value: `${prefix}_employment_5`, points: 5 },
];

/** 2 妊娠・出産 */
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  {
    label: '出産（予定日）前8週（多胎の場合は14週）から出産後8週の間にある',
    value: `${prefix}_childbirth_9`,
    points: 9,
  },
];

/** 3 疾病・障がい */
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '疾病：入院中である', value: `${prefix}_illness_10`, points: 10 },
  { label: '疾病：1月以上、常時臥床の状態にある', value: `${prefix}_illness_9`, points: 9 },
  { label: '疾病：3月以上、通院加療を要する', value: `${prefix}_illness_8`, points: 8 },
  { label: '疾病：1月以上3月未満、通院加療を要する', value: `${prefix}_illness_6`, points: 6 },
  { label: '疾病：上記以外で通院加療を要する', value: `${prefix}_illness_3`, points: 3 },
  {
    label: '障がい：身体1級・2級、精神1級、療育Aのいずれかを所持',
    value: `${prefix}_illness_disability_10`,
    points: 10,
  },
  {
    label: '障がい：身体3級、精神2級、療育Bのいずれかを所持',
    value: `${prefix}_illness_disability_7`,
    points: 7,
  },
  { label: '障がい：身体4級・5級・6級、精神3級のいずれかを所持', value: `${prefix}_illness_disability_3`, points: 3 },
];

/** 4 介護・看護 */
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  {
    label: '入院付き添い：1月以上入院している親族の付き添いに常時あたっている',
    value: `${prefix}_care_9a`,
    points: 9,
  },
  {
    label: '居宅介護：被介護者が障害者手帳等を所持、または要介護度3以上の認定を受けている',
    value: `${prefix}_care_9b`,
    points: 9,
  },
  {
    label: '居宅介護：1月以上の居宅介護（看護）を要する同居親族の介護に常時あたっている',
    value: `${prefix}_care_6`,
    points: 6,
  },
];

/** 5 災害復旧 */
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '地震、火災、風水害等による被害の復旧にあたっている', value: `${prefix}_disaster_10`, points: 10 },
];

/** 6 求職活動 */
const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動を継続的に行っている（起業準備を含む）', value: `${prefix}_jobseeking_3`, points: 3 },
];

/** 7 就学（就学時間の区分による点数の別は「就労」に準ずる） */
const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '月140時間以上の通学', value: `${prefix}_education_9`, points: 9 },
  { label: '月120時間以上140時間未満の通学', value: `${prefix}_education_8`, points: 8 },
  { label: '月100時間以上120時間未満の通学', value: `${prefix}_education_7`, points: 7 },
  { label: '月80時間以上100時間未満の通学', value: `${prefix}_education_6`, points: 6 },
  { label: '月48時間以上80時間未満の通学', value: `${prefix}_education_5`, points: 5 },
];

/** 8 虐待・DV等 */
const abuseOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_abuse_none`, points: 0 },
  { label: '虐待やDVなどのおそれがある', value: `${prefix}_abuse_10`, points: 10 },
];

/** 9 育児休業 */
const parentalLeaveOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_leave_none`, points: 0 },
  {
    label: '育児休業取得中に、すでに保育を受けているきょうだいがいて転園を希望する（年齢による卒園がある保育所等からの卒園に伴うもの）',
    value: `${prefix}_leave_9`,
    points: 9,
  },
  {
    label: '育児休業取得中に、すでに保育を受けているきょうだいがいて転園を希望する',
    value: `${prefix}_leave_3`,
    points: 3,
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
    helpText: '奥州市は保護者のうち、いずれか低い者の点数が世帯の基本点数になります',
    inputType: 'select',
    options: [
      { label: '就労（居宅内・居宅外・自営業・農業・内職など）', value: `${prefix}_reason_employment`, points: 0 },
      { label: '妊娠・出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '疾病・障がい', value: `${prefix}_reason_illness`, points: 0 },
      { label: '介護・看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '災害復旧', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '求職活動', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '就学', value: `${prefix}_reason_education`, points: 0 },
      { label: '虐待・DV等', value: `${prefix}_reason_abuse`, points: 0 },
      { label: '育児休業', value: `${prefix}_reason_leave`, points: 0 },
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
      label: `${parentLabel}の介護・看護の状況は？`,
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
      label: `${parentLabel}は求職活動をしていますか？`,
      inputType: 'radio',
      options: jobSeekingOptions(prefix),
    },
    {
      id: `${prefix}_education`,
      category,
      label: `${parentLabel}の通学の状況は？`,
      helpText:
        '大学、専門学校、職業訓練校などへ通学している場合が対象です。就学時間の区分による点数は「就労」に準じます',
      inputType: 'radio',
      options: educationOptions(prefix),
    },
    {
      id: `${prefix}_abuse`,
      category,
      label: `${parentLabel}は虐待・DV等のおそれにあてはまりますか？`,
      inputType: 'radio',
      options: abuseOptions(prefix),
    },
    {
      id: `${prefix}_leave`,
      category,
      label: `${parentLabel}の育児休業の状況は？`,
      inputType: 'radio',
      options: parentalLeaveOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// ---------------------------------------------------------------------------
// 加点基準・減点基準（世帯の状況等）
// ---------------------------------------------------------------------------

const adjustmentQuestions: Question[] = [
  // --- 加点基準 ---
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: '（準）母子家庭、（準）父子家庭、または父母のない児童が属する世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい', value: 'adj_single_parent_yes', points: 6 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護法による被保護世帯ですか？',
    helpText: '保育所等への入所により、自立が見込まれる場合に限ります',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい', value: 'adj_welfare_yes', points: 6 },
    ],
  },
  {
    id: 'adj_layoff',
    category: 'adjustment',
    label: '世帯の生計中心者である保護者が失業していますか？',
    helpText: '保育所等への入所が早期就労のために必要と認められる場合が対象です。自発的失業は除きます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_layoff_no', points: 0 },
      { label: 'はい', value: 'adj_layoff_yes', points: 6 },
    ],
  },
  {
    id: 'adj_social_care',
    category: 'adjustment',
    label: '当該児童が虐待やDVなどを受けるおそれがありますか？',
    helpText: '保育所等への入所による社会的養護が必要な場合が対象です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_social_care_no', points: 0 },
      { label: 'はい', value: 'adj_social_care_yes', points: 10 },
    ],
  },
  {
    id: 'adj_child_disability',
    category: 'adjustment',
    label: '当該児童が障がいを有していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_child_disability_no', points: 0 },
      { label: 'はい', value: 'adj_child_disability_yes', points: 6 },
    ],
  },
  {
    id: 'adj_leave_return',
    category: 'adjustment',
    label: '育児休業（または産前・産後休業）からの復職に伴う申し込みですか？',
    helpText: '保護者のいずれか（または両方）が取得している場合が対象です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_leave_return_no', points: 0 },
      { label: 'はい', value: 'adj_leave_return_yes', points: 3 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: 'きょうだいが在籍している保育所等への申し込み、または同時に同じ保育所等への申し込みですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_no', points: 0 },
      { label: 'はい', value: 'adj_sibling_yes', points: 9 },
    ],
  },
  {
    id: 'adj_foster',
    category: 'adjustment',
    label: '当該児童が里親に委託されていますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_foster_no', points: 0 },
      { label: 'はい', value: 'adj_foster_yes', points: 6 },
    ],
  },
  {
    id: 'adj_hoikushi',
    category: 'adjustment',
    label: '保護者が認可保育所等に勤務し、保育士等としての勤務実態がありますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_hoikushi_no', points: 0 },
      { label: 'はい（奥州市内の認可保育所等）', value: 'adj_hoikushi_9', points: 9 },
      { label: 'はい（奥州市外の認可保育所等）', value: 'adj_hoikushi_6', points: 6 },
    ],
  },
  {
    id: 'adj_not_enrolled',
    category: 'adjustment',
    label: '当該児童はいずれの認可保育所等にも在籍していませんか？',
    inputType: 'radio',
    options: [
      { label: '在籍している', value: 'adj_not_enrolled_no', points: 0 },
      { label: '在籍していない', value: 'adj_not_enrolled_yes', points: 9 },
    ],
  },
  {
    id: 'adj_graduation',
    category: 'adjustment',
    label: '年齢による卒園がある保育所等（地域型保育事業など）の卒園に伴う申し込みですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_graduation_no', points: 0 },
      { label: 'はい', value: 'adj_graduation_yes', points: 6 },
    ],
  },
  // --- 減点基準 ---
  {
    id: 'adj_grandparent',
    category: 'adjustment',
    label: '65歳未満の祖父母と同居しており、その祖父母に保育を必要とする事由がありますか？',
    helpText: '事由が確認できない場合は3点減点されます',
    inputType: 'radio',
    options: [
      { label: '同居していない、または事由が確認できる', value: 'adj_grandparent_no', points: 0 },
      { label: '同居しており、事由が確認できない', value: 'adj_grandparent_yes', points: -3 },
    ],
  },
  {
    id: 'adj_arrears',
    category: 'adjustment',
    label: '保育料または副食費について、市に対する6か月分以上の滞納がありますか？',
    helpText: '誠意ある対応が認められない場合に減点されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_arrears_no', points: 0 },
      { label: 'はい', value: 'adj_arrears_yes', points: -6 },
    ],
  },
];

export const oshuData: MunicipalityData = {
  municipality,
  questions: [...buildParentQuestions(1), ...buildParentQuestions(2), ...adjustmentQuestions],
};
