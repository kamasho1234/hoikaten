import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 春日井市 保育園入園選考基準（基準指数・調整指数）データ
//
// 出典: 春日井市「令和8年度 春日井市保育園入園選考基準表」
//       https://www.city.kasugai.lg.jp/_res/projects/default_project/_page_/001/022/101/R7_05kijyun.pdf
//       （春日井市Webサイト「保育園入園申込みのための必要書類（令和8年4月）」
//         https://www.city.kasugai.lg.jp/kosodate/hoikuen/hoikuen/1002326/1002331.html からリンク）
//
// 2026-08-19: 従来のデータは他自治体と同じ点数配列のテンプレート（推定値）だったため、
//             上記の公式基準表を読み取って全面的に置き換えた。
//             公式の基準指数は保護者ごとに最大10点で、旧データ（父母各20点）とは体系が異なる。
//
// 原典の構成: 「次の1の基準指数に2の調整指数を加算したものを世帯の指数とします。」
//   1 基準指数（区分1〜11）／2 調整指数（記号A〜I）／3 同一指数で並んだ場合の優先順位表
//
// 数値化しない規定（優先順位表・注記のため質問には含めない）:
//   3 同一指数で並んだ場合の優先順位表
//     I 施設の対象年齢に達したため、転園が必須となる場合（連携園がある園は除く）
//     II 同一世帯で同時に3つ以上の保育施設の利用となることが見込まれる場合
//     III 在園のきょうだいと同一施設への利用が見込める場合
//     IV 同一世帯内における小学生以下の児童の人数
//     V 保育の必要な事由間の優先順位（(1)災害等 (2)不存在 (3)疾病 (4)障がい (5)育児休業等からの復職
//        (6)外勤・自営業主 (7)介護等 (8)自営業専従者・家族従業者 (9)出産 (10)就学 (11)内職
//        (12)就労予定 (13)育児休業中の利用）
//     VI 利用を希望する施設のうち、当該施設の利用希望順位が高い場合
//     VII その他の世帯状況（施設との近接性・所得・保育の必要な事由にかかる拘束時間・祖父母の状況等・
//         単身赴任（予定）者）から、より保育が必要である場合
//   区分11 その他: 各区分に掲げるもののほか、市長が特に保育の必要性が高いと判断した場合
//   「育児休業中の利用を希望する場合は、調整指数の加算は適用されません。」
// ---------------------------------------------------------------------------

const municipality = {
  id: 'kasugai',
  name: '春日井市',
  slug: 'kasugai',
  prefecture: '愛知県',
  maxBasePoints: 20, // 保護者ごとに最大10点、父母合計で20点
} as const;

// ---------------------------------------------------------------------------
// 1 基準指数。父母それぞれについて選ぶ
// ---------------------------------------------------------------------------

/** 区分1 就労（外勤・自営業主。育児休業等からの復職者も含む） */
const outsideWorkOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_outside_none`, points: 0 },
  { label: '月160時間以上の就労実績', value: `${prefix}_outside_10`, points: 10 },
  { label: '月150時間以上の就労実績', value: `${prefix}_outside_9`, points: 9 },
  { label: '月130時間以上の就労実績', value: `${prefix}_outside_8`, points: 8 },
  { label: '月100時間以上の就労実績', value: `${prefix}_outside_7`, points: 7 },
  { label: '月60時間以上の就労実績', value: `${prefix}_outside_6`, points: 6 },
];

/** 区分1 就労（自営業専従者・家族従業者） */
const familyWorkOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_family_none`, points: 0 },
  { label: '月160時間以上の就労実績', value: `${prefix}_family_9`, points: 9 },
  { label: '月150時間以上の就労実績', value: `${prefix}_family_8`, points: 8 },
  { label: '月130時間以上の就労実績', value: `${prefix}_family_7`, points: 7 },
  { label: '月100時間以上の就労実績', value: `${prefix}_family_6`, points: 6 },
  { label: '月60時間以上の就労実績', value: `${prefix}_family_5`, points: 5 },
];

/** 区分1 就労（内職） */
const homeWorkOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_homework_none`, points: 0 },
  { label: '内職をしている', value: `${prefix}_homework_4`, points: 4 },
];

/** 区分2 出産 */
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  {
    label: '出産（予定）月の前後2か月（多胎妊娠時は産前3か月）',
    value: `${prefix}_childbirth_7`,
    points: 7,
  },
];

/** 区分3 疾病 */
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  {
    label: '入院または入院に相当する治療や安静を要する自宅療養で常に病臥している',
    value: `${prefix}_illness_10`,
    points: 10,
  },
  { label: '月15日以上通院加療を要する', value: `${prefix}_illness_7`, points: 7 },
  { label: '一般療養（安静加療を要する）', value: `${prefix}_illness_5`, points: 5 },
];

/** 区分4 障がい */
const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  {
    label: '身体障害者手帳1・2級、精神障害者保健福祉手帳1・2級、療育手帳A・B判定',
    value: `${prefix}_disability_10`,
    points: 10,
  },
  {
    label: '身体障害者手帳3級、精神障害者保健福祉手帳3級、療育手帳C判定',
    value: `${prefix}_disability_8`,
    points: 8,
  },
  { label: '身体障害者手帳4級以下', value: `${prefix}_disability_6`, points: 6 },
];

/** 区分5 介護等 */
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  {
    label:
      '要介護3以上、身体障害者手帳1・2級、精神障害者保健福祉手帳1・2級、療育手帳A・B判定またはそれに相当する親族を介護・看護している',
    value: `${prefix}_care_10`,
    points: 10,
  },
  {
    label:
      '要介護1・2、要支援2、身体障害者手帳3級、精神障害者保健福祉手帳3級、療育手帳C判定またはそれに相当する親族を介護・看護している',
    value: `${prefix}_care_6`,
    points: 6,
  },
  { label: '上記には該当しないが親族を介護・看護している', value: `${prefix}_care_4`, points: 4 },
];

/** 区分6 不存在 */
const absenceOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_absence_none`, points: 0 },
  {
    label: '死亡、離婚、未婚、行方不明、避難、拘禁等',
    value: `${prefix}_absence_10`,
    points: 10,
  },
];

/** 区分7 就労予定 */
const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  {
    label: '就労先が確定しており、月160時間以上の就労を予定している',
    value: `${prefix}_jobseeking_5`,
    points: 5,
  },
  {
    label: '就労先が確定しており、月130時間以上の就労を予定している',
    value: `${prefix}_jobseeking_4`,
    points: 4,
  },
  {
    label: '就労先が確定しており、月60時間以上の就労を予定している',
    value: `${prefix}_jobseeking_3`,
    points: 3,
  },
  {
    label: '就労先は確定していないが、月60時間以上の就労を予定している',
    value: `${prefix}_jobseeking_1`,
    points: 1,
  },
];

/** 区分8 災害等 */
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '居宅の復旧等', value: `${prefix}_disaster_10`, points: 10 },
];

/** 区分9 就学 */
const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  {
    label: '職業訓練校や大学等に通学している学生（通信制は除く）',
    value: `${prefix}_education_6`,
    points: 6,
  },
  { label: '通信制の学生', value: `${prefix}_education_4`, points: 4 },
  { label: 'その他就労を目的とした就学', value: `${prefix}_education_3`, points: 3 },
];

/** 区分10 育児休業中の利用 */
const parentalLeaveUseOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_leaveuse_none`, points: 0 },
  {
    label: '育児休業中で保育園を利用（1〜4年保育に限る）',
    value: `${prefix}_leaveuse_1`,
    points: 1,
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
    helpText: 'いちばん近いものをひとつ選んでください',
    inputType: 'select',
    options: [
      { label: '就労（外勤・自営業主）', value: `${prefix}_reason_outside`, points: 0 },
      {
        label: '就労（自営業専従者・家族従業者）',
        value: `${prefix}_reason_family`,
        points: 0,
      },
      { label: '就労（内職）', value: `${prefix}_reason_homework`, points: 0 },
      { label: '出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '疾病', value: `${prefix}_reason_illness`, points: 0 },
      { label: '障がい', value: `${prefix}_reason_disability`, points: 0 },
      { label: '介護等', value: `${prefix}_reason_care`, points: 0 },
      { label: '不存在', value: `${prefix}_reason_absence`, points: 0 },
      { label: '就労予定', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '災害等', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '就学', value: `${prefix}_reason_education`, points: 0 },
      { label: '育児休業中の利用', value: `${prefix}_reason_leaveuse`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_outside`,
      category,
      label: `${parentLabel}の就労（外勤・自営業主）の状況は？`,
      helpText:
        '育児休業等からの復職者を含みます。就労時間は休憩時間を含み、残業時間を含みません',
      inputType: 'radio',
      options: outsideWorkOptions(prefix),
    },
    {
      id: `${prefix}_family`,
      category,
      label: `${parentLabel}の就労（自営業専従者・家族従業者）の状況は？`,
      inputType: 'radio',
      options: familyWorkOptions(prefix),
    },
    {
      id: `${prefix}_homework`,
      category,
      label: `${parentLabel}は内職をしていますか？`,
      inputType: 'radio',
      options: homeWorkOptions(prefix),
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
      label: `${parentLabel}の疾病の状況は？`,
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
      label: `${parentLabel}の介護・看護の状況は？`,
      inputType: 'radio',
      options: careOptions(prefix),
    },
    {
      id: `${prefix}_absence`,
      category,
      label: `${parentLabel}は不存在に該当しますか？`,
      inputType: 'radio',
      options: absenceOptions(prefix),
    },
    {
      id: `${prefix}_jobseeking`,
      category,
      label: `${parentLabel}の就労予定は？`,
      inputType: 'radio',
      options: jobSeekingOptions(prefix),
    },
    {
      id: `${prefix}_disaster`,
      category,
      label: `${parentLabel}は災害等による居宅の復旧等に当たっていますか？`,
      inputType: 'radio',
      options: disasterOptions(prefix),
    },
    {
      id: `${prefix}_education`,
      category,
      label: `${parentLabel}の就学の状況は？`,
      inputType: 'radio',
      options: educationOptions(prefix),
    },
    {
      id: `${prefix}_leaveuse`,
      category,
      label: `${parentLabel}は育児休業中に保育園の利用を希望しますか？`,
      helpText: '育児休業中の利用を希望する場合、調整指数の加算は適用されません',
      inputType: 'radio',
      options: parentalLeaveUseOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// ---------------------------------------------------------------------------
// 2 調整指数（記号A〜I）
// ---------------------------------------------------------------------------

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親世帯ですか？',
    helpText:
      '死亡、離婚、未婚、長期にわたる拘禁等によりひとり親（に準ずる）世帯であるとき（記号A）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい', value: 'adj_single_parent_yes', points: 7 },
    ],
  },
  {
    id: 'adj_return_from_leave',
    category: 'adjustment',
    label: '育児休業等から復職しますか？',
    helpText: '記号B。復職予定での申込みの場合は入園月中の復職が条件です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_return_from_leave_no', points: 0 },
      { label: 'はい', value: 'adj_return_from_leave_yes', points: 2 },
    ],
  },
  {
    id: 'adj_childcare_worker',
    category: 'adjustment',
    label: '保護者のいずれかが市内の認可保育施設等で保育士・看護師として勤務していますか？',
    helpText: '春日井市内の認可保育施設・事業所での勤務（予定を含む）（記号C）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_childcare_worker_no', points: 0 },
      { label: 'はい', value: 'adj_childcare_worker_yes', points: 2 },
    ],
  },
  {
    id: 'adj_sibling_other_park',
    category: 'adjustment',
    label: 'きょうだいが別園に通っており、同園の利用を希望する在園児ですか？',
    helpText: '記号D',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_other_park_no', points: 0 },
      { label: 'はい', value: 'adj_sibling_other_park_yes', points: 1 },
    ],
  },
  {
    id: 'adj_sibling_enrolled',
    category: 'adjustment',
    label: 'きょうだいがすでに在園していて、新規に申し込みますか？',
    helpText: '記号E',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_enrolled_no', points: 0 },
      { label: 'はい', value: 'adj_sibling_enrolled_yes', points: 1 },
    ],
  },
  {
    id: 'adj_sibling_simultaneous',
    category: 'adjustment',
    label: 'きょうだいが同時に新規申し込みをしますか？',
    helpText: '記号F。きょうだいが双生児以上の場合は記号Gとしてさらに加算されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_simultaneous_no', points: 0 },
      { label: 'はい', value: 'adj_sibling_simultaneous_yes', points: 1 },
      { label: 'はい（きょうだいが双生児以上）', value: 'adj_sibling_simultaneous_twins', points: 3 },
    ],
  },
  {
    id: 'adj_multiple_pregnancy',
    category: 'adjustment',
    label: '多胎児を妊娠していますか？',
    helpText: '区分が出産の場合に適用されます（記号H）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_multiple_pregnancy_no', points: 0 },
      { label: 'はい', value: 'adj_multiple_pregnancy_yes', points: 1 },
    ],
  },
  {
    id: 'adj_unlicensed_nursery',
    category: 'adjustment',
    label: '認可保育施設・認可外保育施設に在園していて、新規に申し込みますか？',
    helpText:
      '保護者が月60時間以上実際に就労しており、入園後も継続して就労している場合に限ります（記号I）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unlicensed_nursery_no', points: 0 },
      { label: 'はい', value: 'adj_unlicensed_nursery_yes', points: 1 },
    ],
  },
];

// ---------------------------------------------------------------------------
// エクスポート
// ---------------------------------------------------------------------------

export const kasugaiData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
