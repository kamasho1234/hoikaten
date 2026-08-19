import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 甲府市 保育施設利用調整基準点数表（選考事由点数・調整点数）データ
//
// 出典: 甲府市子ども未来部子育て支援課「甲府市保育施設利用調整基準点数表」
//       https://www.city.kofu.yamanashi.jp/jidohoiku/documents/3senkoutensuuhyou.pdf
//       （甲府市Webサイト「甲府市保育施設利用調整基準点数表について」
//         https://www.city.kofu.yamanashi.jp/jidohoiku/senkoutensuuhyou.html からリンク）
//
// 2026-08-19: 従来のデータは他自治体と同じ点数配列のテンプレート（推定値）だったため、
//             上記の公式基準を読み取って全面的に置き換えた。
//             公式の選考事由点数は父母それぞれ最大15点で、旧データ（父母各20点）とは体系が異なる。
//
// 原典の注記:
//   選考事由点数について:
//     父母が保育できない理由、状況に応じて点数を設定する
//     父母それぞれの点数を合算して世帯の点数とする
//     父母がいない場合は、その他の保護者で点数を設定する
//   調整点数について:
//     世帯において考慮すべき内容においては、選考事由点数に加点、減点（調整点数）を行う
//
// 数値化しない規定（範囲指定・優先順位のため質問には含めない）:
//   選考事由点数表「その他 市長の認める事由」1〜10
//   甲府市選考優先順位（同位の場合に使用）:
//     1 虐待・DV／2 災害復旧／3 ひとり親（同居なし）／4 ひとり親（同居あり）／
//     5 疾病・障がい／6 妊娠・出産／7 保育士／8 放課後児童クラブ支援員／9 障がい／
//     10 保護者が単身赴任／11 多子世帯（同居なし）／12 多子世帯（同居あり）／
//     13〜18 就労A〜C（同居の有無）／19 看護／20 就学／21 求職中／22 その他
//     上記で判断できない場合は、保護者の市町村民税額の低い方を優先する
// ---------------------------------------------------------------------------

const municipality = {
  id: 'kofu',
  name: '甲府市',
  slug: 'kofu',
  prefecture: '山梨県',
  maxBasePoints: 30, // 選考事由点数は父母それぞれ最大15点、合算で30点
} as const;

// ---------------------------------------------------------------------------
// （1）選考事由点数表。父母それぞれについて選ぶ
// ---------------------------------------------------------------------------

/** 就労（居宅外就労） */
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  {
    label: '月20日以上、かつ月160時間以上の就労を常態',
    value: `${prefix}_employment_10`,
    points: 10,
  },
  {
    label: '月16日以上、かつ月120時間以上の就労を常態',
    value: `${prefix}_employment_9`,
    points: 9,
  },
  {
    label: '月12日以上、かつ月100時間以上の就労を常態',
    value: `${prefix}_employment_8`,
    points: 8,
  },
  {
    label: '月12日以上、かつ月80時間以上の就労を常態',
    value: `${prefix}_employment_7`,
    points: 7,
  },
  {
    label: '月12日以上、かつ月60時間以上の就労を常態',
    value: `${prefix}_employment_5`,
    points: 5,
  },
  {
    label: '月12日以上、かつ月48時間以上の就労を常態',
    value: `${prefix}_employment_3`,
    points: 3,
  },
];

/** 就労（居宅内就労） */
const homeWorkOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_homework_none`, points: 0 },
  {
    label: '月20日以上、かつ月160時間以上の就労を常態',
    value: `${prefix}_homework_9`,
    points: 9,
  },
  {
    label: '月16日以上、かつ月120時間以上の就労を常態',
    value: `${prefix}_homework_8`,
    points: 8,
  },
  {
    label: '月12日以上、かつ月100時間以上の就労を常態',
    value: `${prefix}_homework_7`,
    points: 7,
  },
  {
    label: '月12日以上、かつ月80時間以上の就労を常態',
    value: `${prefix}_homework_6`,
    points: 6,
  },
  {
    label: '月12日以上、かつ月60時間以上の就労を常態',
    value: `${prefix}_homework_4`,
    points: 4,
  },
  {
    label: '月12日以上、かつ月48時間以上の就労を常態',
    value: `${prefix}_homework_2`,
    points: 2,
  },
];

/** 妊娠・出産 */
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産予定月から前後2か月の計5か月間', value: `${prefix}_childbirth_10`, points: 10 },
];

/** 保護者の疾病・障がい */
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '傷病：おおむね1か月以上の入院', value: `${prefix}_illness_10a`, points: 10 },
  {
    label: '居宅内療養：常時病臥で、保育の必要性がある',
    value: `${prefix}_illness_10b`,
    points: 10,
  },
  {
    label:
      '障がい：身体障害者手帳（1・2・3級）・精神障害者手帳（1・2級）・療育手帳Aを所持し、保育の必要性がある',
    value: `${prefix}_illness_10c`,
    points: 10,
  },
  {
    label: 'その他：傷病、精神疾患、障がい等のため保育の必要性がある',
    value: `${prefix}_illness_4`,
    points: 4,
  },
];

/** 同居親族等の介護・看護 */
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '在宅介護：介護保険「要介護認定区分5」該当', value: `${prefix}_care_6`, points: 6 },
  { label: '在宅介護：介護保険「要介護認定区分4」該当', value: `${prefix}_care_4`, points: 4 },
  {
    label: '在宅介護：介護保険「要介護認定区分3、2」該当',
    value: `${prefix}_care_2`,
    points: 2,
  },
  {
    label:
      '在宅看護：保護者の子どもが常時病臥、または身体障害者手帳（1・2・3級）・精神障害者手帳（1・2級）・療育手帳Aのいずれかを所持し、保育の必要性がある',
    value: `${prefix}_care_8`,
    points: 8,
  },
  { label: '在宅看護：同居している親族等の看護', value: `${prefix}_care_3`, points: 3 },
];

/** 災害復旧 */
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  {
    label: '震災・風水害・火災・その他の災害復旧のため、保育の必要性がある',
    value: `${prefix}_disaster_15`,
    points: 15,
  },
];

/** 求職中 */
const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  {
    label: '求職活動のため日中の外出を常態（起業準備を含む）',
    value: `${prefix}_jobseeking_1`,
    points: 1,
  },
];

/** 就学 */
const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  {
    label:
      '就職に必要な技能習得のために職業訓練校・専門学校・大学等に月16日以上、かつ月64時間以上通学している',
    value: `${prefix}_education_4`,
    points: 4,
  },
];

/** 虐待・DVのおそれがあること */
const abuseOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_abuse_none`, points: 0 },
  {
    label: '虐待やDVの被害にあうおそれが高く、保育の必要性があると関係機関から認められる',
    value: `${prefix}_abuse_15`,
    points: 15,
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
      { label: '就労（居宅外就労）', value: `${prefix}_reason_employment`, points: 0 },
      { label: '就労（居宅内就労）', value: `${prefix}_reason_homework`, points: 0 },
      { label: '妊娠・出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '保護者の疾病・障がい', value: `${prefix}_reason_illness`, points: 0 },
      { label: '同居親族等の介護・看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '災害復旧', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '求職中', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '就学', value: `${prefix}_reason_education`, points: 0 },
      { label: '虐待・DVのおそれがあること', value: `${prefix}_reason_abuse`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の居宅外就労の状況は？`,
      inputType: 'radio',
      options: employmentOptions(prefix),
    },
    {
      id: `${prefix}_homework`,
      category,
      label: `${parentLabel}の居宅内就労の状況は？`,
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
      label: `${parentLabel}は災害復旧のため保育の必要性がありますか？`,
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
      id: `${prefix}_abuse`,
      category,
      label: `${parentLabel}は虐待・DVのおそれに該当しますか？`,
      inputType: 'radio',
      options: abuseOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// ---------------------------------------------------------------------------
// （2）調整点数表・甲府市独自項目
// ---------------------------------------------------------------------------

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親世帯（母子世帯または父子世帯）ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい', value: 'adj_single_parent_yes', points: 13 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護受給世帯で、保育の実施が自立助長に大きく貢献すると認められますか？',
    helpText: '福祉事務所長に認められる場合が対象です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい', value: 'adj_welfare_yes', points: 5 },
    ],
  },
  {
    id: 'adj_unemployment',
    category: 'adjustment',
    label: '生計中心者の失業により、就労の必要性が高いですか？',
    helpText:
      '生計中心者に該当するかは前年分（または前々年分）の所得を基準に判断されます。月15日以上の就職活動が条件です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unemployment_no', points: 0 },
      { label: 'はい', value: 'adj_unemployment_yes', points: 5 },
    ],
  },
  {
    id: 'adj_social_care',
    category: 'adjustment',
    label: '虐待やDVのおそれがある場合など、社会的養護が必要ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_social_care_no', points: 0 },
      { label: 'はい', value: 'adj_social_care_yes', points: 15 },
    ],
  },
  {
    id: 'adj_child_disability',
    category: 'adjustment',
    label: '入所を希望する児童が障がいを有していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_child_disability_no', points: 0 },
      { label: 'はい', value: 'adj_child_disability_yes', points: 3 },
    ],
  },
  {
    id: 'adj_return_from_leave',
    category: 'adjustment',
    label: '育児休業から復職しますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_return_from_leave_no', points: 0 },
      { label: 'はい', value: 'adj_return_from_leave_yes', points: 5 },
    ],
  },
  {
    id: 'adj_sibling_enrolled',
    category: 'adjustment',
    label: '既にきょうだいが利用している保育所等に同一世帯の別児童が入所を希望しますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_enrolled_no', points: 0 },
      { label: 'はい', value: 'adj_sibling_enrolled_yes', points: 25 },
    ],
  },
  {
    id: 'adj_small_facility_graduate',
    category: 'adjustment',
    label: '地域型保育（小規模保育事業・家庭的保育事業等）の卒園児童ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_small_facility_graduate_no', points: 0 },
      { label: 'はい', value: 'adj_small_facility_graduate_yes', points: 1 },
    ],
  },
  {
    id: 'adj_childcare_worker',
    category: 'adjustment',
    label: '保護者が保育士等または放課後児童クラブ支援員として勤務していますか？',
    helpText: '甲府市独自項目。保育士等は非正規職員を含みます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_childcare_worker_no', points: 0 },
      {
        label: '教育・保育施設（認可施設）に勤務している保育士・保育教諭・幼稚園教諭',
        value: 'adj_childcare_worker_7',
        points: 7,
      },
      {
        label: '常時勤務している放課後児童クラブ支援員',
        value: 'adj_childcare_worker_3',
        points: 3,
      },
    ],
  },
  {
    id: 'adj_work_type',
    category: 'adjustment',
    label: '就労形態に減点項目がありますか？',
    helpText: '甲府市独自項目（減点）',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_work_type_none', points: 0 },
      { label: '内職の場合', value: 'adj_work_type_1', points: -1 },
      {
        label:
          '雇用主が保護者本人または配偶者であり、生計を一にしているため無給である場合（無給だが労働により対価を得ている場合を含む）',
        value: 'adj_work_type_2',
        points: -2,
      },
    ],
  },
  {
    id: 'adj_grandparent',
    category: 'adjustment',
    label: '保育可能な65歳未満の祖父母と同居していますか？',
    helpText:
      '就労中でなく、介護、看護等の必要がない場合が対象です（甲府市独自項目、減点）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_grandparent_no', points: 0 },
      { label: 'はい', value: 'adj_grandparent_yes', points: -3 },
    ],
  },
  {
    id: 'adj_declined',
    category: 'adjustment',
    label: '正当な理由のない転園および内定辞退がありましたか？',
    helpText: '甲府市独自項目（減点）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_declined_no', points: 0 },
      { label: 'はい', value: 'adj_declined_yes', points: -3 },
    ],
  },
  {
    id: 'adj_arrears',
    category: 'adjustment',
    label: '6か月以上の保育料を滞納していますか？',
    helpText:
      '分納誓約または申し出による児童手当からの徴収をしている場合を除きます。卒園児童分を含みます（甲府市独自項目、減点）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_arrears_no', points: 0 },
      { label: 'はい', value: 'adj_arrears_yes', points: -10 },
    ],
  },
];

// ---------------------------------------------------------------------------
// エクスポート
// ---------------------------------------------------------------------------

export const kofuData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
