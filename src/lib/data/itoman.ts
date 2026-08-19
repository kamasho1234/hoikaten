import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 糸満市 保育所等利用調整基準表（保育を必要とする事由・世帯状況による加点）データ
//
// 出典: 糸満市保育こども園課「令和8年度 糸満市 教育・保育施設等利用案内」P27
//       「別表（第20条関係）糸満市保育所等利用調整基準表」
//       https://www.city.itoman.lg.jp/uploaded/attachment/19326.pdf
//       （糸満市Webサイト「令和8年度 教育・保育施設等の利用申込について」
//         https://www.city.itoman.lg.jp/soshiki/17/32254.html からリンク）
//
// 2026-08-19: 従来のデータは他自治体と同じ点数配列のテンプレート（推定値）だったため、
//             上記の公式基準表を読み取って全面的に置き換えた。
//
// 原典の「利用調整点数の付け方について」:
//   1 父母（保護者）それぞれの保育を必要とする事由による点数を合算します。
//   2 保護者の保育を必要とする事由に、世帯状況による点数を加点し、利用調整点数を確定します。
//   3 労働時間については、休憩時間・通退勤時間・残業等は含みません。
//   4 労働時間については、実績に基づき点数を求めます。
//   5 点数は申込年度内の適用となり、年度繰越はありません。
//
// 質問に含めていない原典の項目:
//   ・「保育士として就労する場合、実情に応じ優先利用とする」（点数ではない）
//   ・「その他優先的に保育所等の利用を認める場合（DVや虐待への対応等、緊急的に社会的支援を
//     要する場合）」＝実情に応じて優先利用とする（点数ではない）
// ---------------------------------------------------------------------------

const municipality = {
  id: 'itoman',
  name: '糸満市',
  slug: 'itoman',
  prefecture: '沖縄県',
  maxBasePoints: 24, // 父母各12点（妊娠・出産）
} as const;

// ---------------------------------------------------------------------------
// 保育を必要とする事由。父母それぞれについて選ぶ
// ---------------------------------------------------------------------------

/** 1 就労 */
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '週38時間以上の労働時間', value: `${prefix}_employment_10`, points: 10 },
  { label: '週35時間以上の労働時間', value: `${prefix}_employment_9`, points: 9 },
  { label: '週30時間以上の労働時間', value: `${prefix}_employment_8`, points: 8 },
  { label: '週25時間以上の労働時間', value: `${prefix}_employment_7`, points: 7 },
  { label: '週20時間以上の労働時間', value: `${prefix}_employment_6`, points: 6 },
  { label: '週16時間以上の労働時間', value: `${prefix}_employment_5`, points: 5 },
  { label: '週16時間未満の労働時間', value: `${prefix}_employment_4`, points: 4 },
];

/** 1 就労に関する減点（自営業の根拠書類なし・就労予定） */
const employmentAdjustOptions = (prefix: string) => [
  { label: '就労中で、必要な書類を提出できる', value: `${prefix}_empadj_0`, points: 0 },
  { label: '自営業申立書の根拠書類等の添付が無い', value: `${prefix}_empadj_m1`, points: -1 },
  { label: '就労・退職予定（労働時間の変更を除く）', value: `${prefix}_empadj_m2`, points: -2 },
];

/** 2 妊娠・出産 */
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  {
    label: '出産予定日の2か月前の月初日から出産日から3か月後の月末日まで',
    value: `${prefix}_childbirth_12`,
    points: 12,
  },
];

/** 3 保護者の疾病・障害 */
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  {
    label: '疾病等：入院（予定含む）、または常時安静が必要で日常保育が不可能（診断書提出）',
    value: `${prefix}_illness_10`,
    points: 10,
  },
  {
    label: '疾病等：治療、通院を要し日常保育の軽減（週4〜5日程度）が必要（診断書提出）',
    value: `${prefix}_illness_8`,
    points: 8,
  },
  {
    label: '疾病等：上記以外で通院を要し、かつ日常保育の軽減が必要（診断書提出）',
    value: `${prefix}_illness_6`,
    points: 6,
  },
  {
    label: '障害等：身体1〜2級、精神1級、療育A1・A2の該当者で保育が困難',
    value: `${prefix}_illness_disability_10`,
    points: 10,
  },
  {
    label: '障害等：身体3級、療育B1、精神2級の該当者で保育が困難',
    value: `${prefix}_illness_disability_9`,
    points: 9,
  },
  { label: '障害等：上記以外の手帳該当者で日常保育が困難', value: `${prefix}_illness_disability_7`, points: 7 },
];

/** 4 親族の介護・看護 */
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  {
    label: '病院付添：入院付添い（1か月以上にわたり入院している者の付添い）',
    value: `${prefix}_care_9`,
    points: 9,
  },
  {
    label: '病院付添：通院付添い（1か月以上にわたり週3日以上通院している者の付添い）',
    value: `${prefix}_care_7`,
    points: 7,
  },
  {
    label: '通園・通学付添：心身障害者の付添いまたは看護（週3日以上）',
    value: `${prefix}_care_7b`,
    points: 7,
  },
  {
    label: '通園・通学付添：心身障害者の付添いまたは看護（週3日未満）',
    value: `${prefix}_care_5`,
    points: 5,
  },
  {
    label: '居宅内付添：常時病床の方、心身障害者（重度）等の常時付添（全介助と診断された者）',
    value: `${prefix}_care_8`,
    points: 8,
  },
  { label: '居宅内付添：上記以外の付添いまたは介護', value: `${prefix}_care_6`, points: 6 },
];

/** 4 別居親族の付添いによる減点 */
const careSeparateOptions = (prefix: string) => [
  { label: '同居親族の付添い、または該当しない', value: `${prefix}_caresep_0`, points: 0 },
  { label: '別居親族の付添いである', value: `${prefix}_caresep_m1`, points: -1 },
];

/** 5 災害復旧 */
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '災害・風水害・火災等でその復旧にあたっている', value: `${prefix}_disaster_10`, points: 10 },
];

/** 6 求職 */
const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職中（起業準備、開業予定含む）', value: `${prefix}_jobseeking_4`, points: 4 },
];

/** 7 就学 */
const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '大学・専門学校・職業訓練校等に週40時間以上就学', value: `${prefix}_education_10`, points: 10 },
  { label: '大学・専門学校・職業訓練校等に週30時間以上就学', value: `${prefix}_education_8`, points: 8 },
  { label: '大学・専門学校・職業訓練校等に週20時間以上就学', value: `${prefix}_education_6`, points: 6 },
  { label: '大学・専門学校・職業訓練校等に週16時間以上就学', value: `${prefix}_education_5`, points: 5 },
  { label: '大学・専門学校・職業訓練校等に週16時間未満就学', value: `${prefix}_education_4`, points: 4 },
];

/** 8 育児休業 */
const parentalLeaveOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_leave_none`, points: 0 },
  { label: '申込児童以外の子の育児休業中', value: `${prefix}_leave_2`, points: 2 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: '父母それぞれの保育を必要とする事由による点数を合算します',
    inputType: 'select',
    options: [
      { label: '就労', value: `${prefix}_reason_employment`, points: 0 },
      { label: '妊娠・出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '保護者の疾病・障害', value: `${prefix}_reason_illness`, points: 0 },
      { label: '親族の介護・看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '災害復旧', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '求職', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '就学', value: `${prefix}_reason_education`, points: 0 },
      { label: '育児休業', value: `${prefix}_reason_leave`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の労働時間は？`,
      helpText: '労働時間には休憩時間・通退勤時間・残業等は含みません。実績に基づき点数が求められます',
      inputType: 'radio',
      options: employmentOptions(prefix),
    },
    {
      id: `${prefix}_empadj`,
      category,
      // 「就労」を選んだときだけ表示する（自営業の書類・就労予定の減点）
      showFor: ['employment'],
      label: `${parentLabel}の就労に関する状況は？`,
      inputType: 'radio',
      options: employmentAdjustOptions(prefix),
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
      label: `${parentLabel}の疾病・障害の状況は？`,
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
      id: `${prefix}_caresep`,
      category,
      // 「介護・看護」を選んだときだけ表示する（別居親族の減点）
      showFor: ['care'],
      label: `${parentLabel}が付添う親族は同居していますか？`,
      helpText: '別居親族の付添いの場合は1点減点されます',
      inputType: 'radio',
      options: careSeparateOptions(prefix),
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
      label: `${parentLabel}は求職中ですか？`,
      inputType: 'radio',
      options: jobSeekingOptions(prefix),
    },
    {
      id: `${prefix}_education`,
      category,
      label: `${parentLabel}の就学の状況は？`,
      inputType: 'radio',
      options: educationOptions(prefix),
    },
    {
      id: `${prefix}_leave`,
      category,
      label: `${parentLabel}は申込児童以外の子の育児休業中ですか？`,
      inputType: 'radio',
      options: parentalLeaveOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// ---------------------------------------------------------------------------
// 世帯状況による加点
// ---------------------------------------------------------------------------

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      {
        label: '死亡、離婚、行方不明等により母子または父子のみの世帯、子が祖父母と同居している世帯（証明する書類あり）',
        value: 'adj_single_parent_15',
        points: 15,
      },
      { label: '離婚調停書または通知書がある（協議中は適用不可）', value: 'adj_single_parent_12', points: 12 },
      { label: '上記以外の場合で、諸調査による', value: 'adj_single_parent_5', points: 5 },
    ],
  },
  {
    id: 'adj_tanshin',
    category: 'adjustment',
    label: '単身赴任世帯ですか？',
    helpText:
      '県内離島・県外・海外での単身赴任が対象です。就労証明書により、利用希望日以降も3か月以上継続して単身赴任見込であることが確認できる場合に限ります',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_tanshin_no', points: 0 },
      { label: 'はい', value: 'adj_tanshin_yes', points: 2 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい', value: 'adj_welfare_yes', points: 3 },
    ],
  },
  {
    id: 'adj_household_disability',
    category: 'adjustment',
    label: '同居内に障がい児（者）がいますか？',
    helpText:
      '身体障害者手帳・療育手帳・精神障害者保健福祉手帳・特別児童扶養手当・障害基礎年金のいずれかの証明書類が必要です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_household_disability_no', points: 0 },
      { label: 'はい', value: 'adj_household_disability_yes', points: 3 },
    ],
  },
  {
    id: 'adj_special_support',
    category: 'adjustment',
    label: '特別支援教育・保育（加配）の申請者ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_special_support_no', points: 0 },
      { label: 'はい', value: 'adj_special_support_yes', points: 3 },
    ],
  },
  {
    id: 'adj_multiple_birth',
    category: 'adjustment',
    label: '申込児童が多胎児（双子以上）ですか？',
    helpText: '1点×申込児童（多胎児）の人数が加算されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_multiple_birth_0', points: 0 },
      { label: 'はい（双子）', value: 'adj_multiple_birth_2', points: 2 },
      { label: 'はい（三つ子以上）', value: 'adj_multiple_birth_3', points: 3 },
    ],
  },
  {
    id: 'adj_leave_extension',
    category: 'adjustment',
    label: '希望する保育所等に入所できない場合、育児休業の延長も許容できますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_leave_extension_no', points: 0 },
      { label: 'はい', value: 'adj_leave_extension_yes', points: -10 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: '申込時点で第1希望の施設に兄弟姉妹が在園していますか？',
    helpText: '入所年度において卒園する児童は除きます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_no', points: 0 },
      { label: 'はい', value: 'adj_sibling_yes', points: 1 },
    ],
  },
  {
    id: 'adj_enrolled',
    category: 'adjustment',
    label: '申込時点で認可保育施設に在園中ですか？',
    helpText: '教育・保育給付認定の2号・3号に限ります',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_enrolled_no', points: 0 },
      { label: 'はい', value: 'adj_enrolled_yes', points: 1 },
    ],
  },
  {
    id: 'adj_ninkagai',
    category: 'adjustment',
    label: '申込児童が認可外保育施設や一時預かり保育を継続利用していますか？',
    helpText:
      '認可外保育施設の利用期間が2か月以上継続、または一時預かり保育の利用が同月に10日以上かつ2か月分ある場合が対象です（一時預かり保育にはファミリーサポートを含む。申込児童本人の育児休業を理由に利用したものを除く）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_ninkagai_no', points: 0 },
      { label: 'はい', value: 'adj_ninkagai_yes', points: 1 },
    ],
  },
  {
    id: 'adj_multi_reason',
    category: 'adjustment',
    label: '保育を必要とする事由が2つ以上ありますか？',
    helpText:
      '保育を必要とする事由の点数が高い方に加点し、10点を上限とします。求職（起業準備中）、育児休業は対象外です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_multi_reason_no', points: 0 },
      { label: 'はい', value: 'adj_multi_reason_yes', points: 2 },
    ],
  },
  {
    id: 'adj_declined',
    category: 'adjustment',
    label: '本人都合により内定を辞退したことがありますか？',
    helpText: '以降の入所調整から、辞退の回数ごとに1点ずつ減点されます',
    inputType: 'radio',
    options: [
      { label: 'ない', value: 'adj_declined_0', points: 0 },
      { label: '1回', value: 'adj_declined_1', points: -1 },
      { label: '2回', value: 'adj_declined_2', points: -2 },
    ],
  },
];

export const itomanData: MunicipalityData = {
  municipality,
  questions: [...buildParentQuestions(1), ...buildParentQuestions(2), ...adjustmentQuestions],
};
