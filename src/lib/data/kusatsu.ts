import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 草津市 保育所等入所（利用）選考基準（基礎点数・補正点数）データ
//
// 出典: 草津市子ども未来部幼児課「令和8年度草津市保育所等入所（利用）選考基準表」
//       （認可保育施設ガイドブック 22〜23ページ）
//       https://www.city.kusatsu.shiga.jp/kosodate/hoikukyoiku/hoikuen/guidebook.files/R8.02.ninkahoikushisetsu.pdf
//       （草津市Webサイト「認可保育施設入所・入園ポータル」
//         https://www.city.kusatsu.shiga.jp/kosodate/hoikukyoiku/yojinyusyoportal.html からリンク）
//
// 2026-08-19: 従来のデータは他自治体と同じ点数配列のテンプレート（推定値）だったため、
//             上記の公式基準表を読み取って全面的に置き換えた。
//             公式の基礎点数は父母それぞれ最大10点で、旧データ（父母各20点）とは体系が異なる。
//
// 原典の注記:
//   保護者それぞれについて基礎点数を求めて合算し、家庭ごとの補正点数を加減算したものを
//     当該児童の点数とする
//   入所（利用）申込みにおける点数の判定は、入所（利用）希望月を基準とする
//   兄弟姉妹にかかる補正点数が複数該当する場合は、いずれか高い方を加点する
//     （3子以上同時申込みの場合を除く）
//   「保育士等」とは、保育士、幼稚園教諭、保育教諭、看護師等を指す
//   父母のいずれかが市内認可保育施設で就労している、または就労予定の保育士等で
//     「保育士就労に関する誓約書」を提出した場合のみ、新規申込時に限り最優先で入所調整を行う
//   「保育可能な祖父母」とは、原則健康で不就労である場合を指す
//   「特別な支援を要する児童」とは、処遇委員会で加配が必要と認められる場合を指す
//   「特別の支援を要する家庭」とは、児童虐待・DV等、緊急に児童の生命・安全を守る必要があると
//     客観的に認められる場合や、社会的養護が必要な場合として里親委託が行われている場合を指す
//   「特別な支援を要する児童」または「特別な支援を要する家庭」に該当する場合、
//     兄弟姉妹を家庭で保育している場合の減点は適用しない
//
// 数値化しない規定（優先順位のため質問には含めない）:
//   【同点数時の優先項目】
//     (1) 特別な支援を要する児童・家庭、ひとり親家庭／(2) 希望先順位／
//     (3) 兄弟姉妹が既に同一の認可保育施設に在籍／(4) 基礎点数の高い児童／
//     (5) 市外の保育施設や一時保育・認可外保育施設を利用し、既に就労を開始している／
//     (6) 就労時間の融通性（時間拘束の度合い等）／(7) 児童の保育を支援できる親族等の有無／
//     (8) 入所待機の期間
// ---------------------------------------------------------------------------

const municipality = {
  id: 'kusatsu',
  name: '草津市',
  slug: 'kusatsu',
  prefecture: '滋賀県',
  maxBasePoints: 20, // 基礎点数は保護者それぞれ最大10点、合算で20点
} as const;

// ---------------------------------------------------------------------------
// 基礎点数。保護者それぞれにいずれかの点数がつく
// ---------------------------------------------------------------------------

/** ア・イ 就労 */
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月20日以上かつ1日8時間以上', value: `${prefix}_employment_10`, points: 10 },
  {
    label: '月20日以上かつ1日6時間以上8時間未満',
    value: `${prefix}_employment_8`,
    points: 8,
  },
  { label: '月15日以上かつ1日6時間以上', value: `${prefix}_employment_6`, points: 6 },
  {
    label: '月15日以上かつ1日4時間以上6時間未満',
    value: `${prefix}_employment_5`,
    points: 5,
  },
  { label: '上記以外で月60時間以上', value: `${prefix}_employment_4`, points: 4 },
];

/** ア・イ 就労先内定 */
const jobOfferOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_joboffer_none`, points: 0 },
  { label: '内定を証明する書類の提出あり', value: `${prefix}_joboffer_4`, points: 4 },
];

/** ア・イ 求職中 */
const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  {
    label: 'ひとり親家庭で証明書類の提出あり（職業訓練中を含む）',
    value: `${prefix}_jobseeking_10`,
    points: 10,
  },
  {
    label: 'ひとり親家庭以外で証明書類の提出あり（職業訓練中を含む）',
    value: `${prefix}_jobseeking_3`,
    points: 3,
  },
  { label: 'その他', value: `${prefix}_jobseeking_2`, points: 2 },
];

/** ウ 妊娠・出産（母のみ） */
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  {
    label: '出産月を除く2か月前から出産月を除く6か月後まで',
    value: `${prefix}_childbirth_4`,
    points: 4,
  },
];

/** エ 育休（在園児のみ適用） */
const parentalLeaveOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_leave_none`, points: 0 },
  {
    label: '育児休業取得時に、姉・兄が既に保育を利用している',
    value: `${prefix}_leave_4`,
    points: 4,
  },
];

/** オ 疾病（入院等） */
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '日常保育は不可能', value: `${prefix}_illness_10`, points: 10 },
  {
    label: '日常保育の軽減が必要（週4〜5日程度）',
    value: `${prefix}_illness_6`,
    points: 6,
  },
  {
    label: '日常保育の軽減が必要（週1〜3日程度）',
    value: `${prefix}_illness_3`,
    points: 3,
  },
];

/** オ 障害（心身の障害） */
const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  {
    label: '身体障害者手帳1・2級、療育手帳A、精神障害者保健福祉手帳1級',
    value: `${prefix}_disability_10`,
    points: 10,
  },
  {
    label: '身体障害者手帳3級、療育手帳B1、精神障害者保健福祉手帳2級',
    value: `${prefix}_disability_6`,
    points: 6,
  },
  {
    label: '身体障害者手帳4級以下、療育手帳B2、精神障害者保健福祉手帳3級',
    value: `${prefix}_disability_3`,
    points: 3,
  },
];

/** カ 親族の看護・介護 */
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '看護：自宅・病院等での全介助を要する', value: `${prefix}_care_10a`, points: 10 },
  { label: '看護：自宅での部分的な介助を要する', value: `${prefix}_care_6a`, points: 6 },
  { label: '看護：通院等で付き添いが必要である', value: `${prefix}_care_3a`, points: 3 },
  {
    label: '介護：身体障害者手帳1・2級、療育手帳A保有者、要介護認定3〜5の介護等',
    value: `${prefix}_care_10b`,
    points: 10,
  },
  {
    label: '介護：身体障害者手帳3級、療育手帳B1保有者、要介護認定2の介護等',
    value: `${prefix}_care_6b`,
    points: 6,
  },
  {
    label: '介護：身体障害者手帳4級以下、療育手帳B2保有者、要介護認定1の介護等',
    value: `${prefix}_care_3b`,
    points: 3,
  },
];

/** キ 災害 */
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  {
    label: '災害・緊急事態等で児童の保育ができない',
    value: `${prefix}_disaster_10`,
    points: 10,
  },
];

/** キ 就学 */
const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  {
    label: '月120時間以上の就学（職業訓練中を含む）',
    value: `${prefix}_education_6`,
    points: 6,
  },
  {
    label: '月120時間未満の就学（職業訓練中を含む）',
    value: `${prefix}_education_4`,
    points: 4,
  },
];

/** ク 不存在 */
const absenceOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_absence_none`, points: 0 },
  {
    label: '死亡・行方不明・拘禁・離婚・別居・未婚等',
    value: `${prefix}_absence_8`,
    points: 8,
  },
];

/** ク その他 */
const otherOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_other_none`, points: 0 },
  {
    label: '特別な支援を要する児童がいる（特別の支援を要する家庭を含む）',
    value: `${prefix}_other_10a`,
    points: 10,
  },
  {
    label: 'その他明らかに児童の保育ができないと認める場合',
    value: `${prefix}_other_10b`,
    points: 10,
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
    helpText: '保護者それぞれにいずれかの点数がつきます',
    inputType: 'select',
    options: [
      { label: '就労', value: `${prefix}_reason_employment`, points: 0 },
      { label: '就労先内定', value: `${prefix}_reason_joboffer`, points: 0 },
      { label: '求職中', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '妊娠・出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '育休（在園児のみ適用）', value: `${prefix}_reason_leave`, points: 0 },
      { label: '疾病（入院等）', value: `${prefix}_reason_illness`, points: 0 },
      { label: '障害（心身の障害）', value: `${prefix}_reason_disability`, points: 0 },
      { label: '親族の看護・介護', value: `${prefix}_reason_care`, points: 0 },
      { label: '災害', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '就学', value: `${prefix}_reason_education`, points: 0 },
      { label: '不存在', value: `${prefix}_reason_absence`, points: 0 },
      { label: 'その他', value: `${prefix}_reason_other`, points: 0 },
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
      id: `${prefix}_joboffer`,
      category,
      label: `${parentLabel}の就労内定の状況は？`,
      helpText: '就労証明書の提出がある場合は就労の区分に準じます',
      inputType: 'radio',
      options: jobOfferOptions(prefix),
    },
    {
      id: `${prefix}_jobseeking`,
      category,
      label: `${parentLabel}の求職の状況は？`,
      inputType: 'radio',
      options: jobSeekingOptions(prefix),
    },
    {
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}の妊娠・出産の時期は？`,
      helpText: '妊娠・出産は母のみが対象です',
      inputType: 'radio',
      options: childbirthOptions(prefix),
    },
    {
      id: `${prefix}_leave`,
      category,
      label: `${parentLabel}は育児休業中ですか？`,
      helpText: '在園児のみ適用されます',
      inputType: 'radio',
      options: parentalLeaveOptions(prefix),
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
      label: `${parentLabel}の障害の程度は？`,
      inputType: 'radio',
      options: disabilityOptions(prefix),
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
      label: `${parentLabel}は災害・緊急事態等に該当しますか？`,
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
      id: `${prefix}_absence`,
      category,
      label: `${parentLabel}は不存在に該当しますか？`,
      inputType: 'radio',
      options: absenceOptions(prefix),
    },
    {
      id: `${prefix}_other`,
      category,
      label: `${parentLabel}のその他の状況は？`,
      inputType: 'radio',
      options: otherOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// ---------------------------------------------------------------------------
// 補正点数（家庭の状況等）
// ---------------------------------------------------------------------------

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: '特別な支援を要する児童・家庭、またはひとり親家庭ですか？',
    helpText: '家庭の状況',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい', value: 'adj_single_parent_yes', points: 4 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯ですか？',
    helpText: '家庭の状況',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい', value: 'adj_welfare_yes', points: 2 },
    ],
  },
  {
    id: 'adj_unemployment',
    category: 'adjustment',
    label: '求職中のうち、生計中心者の失業により就労の必要性が高いですか？',
    helpText: 'ひとり親家庭は除きます（家庭の状況）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unemployment_no', points: 0 },
      { label: 'はい', value: 'adj_unemployment_yes', points: 2 },
    ],
  },
  {
    id: 'adj_single_posting',
    category: 'adjustment',
    label: '両親のいずれかが単身赴任中ですか？',
    helpText: '家庭の状況',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_posting_no', points: 0 },
      { label: 'はい', value: 'adj_single_posting_yes', points: 1 },
    ],
  },
  {
    id: 'adj_grandparent',
    category: 'adjustment',
    label: '同居に保育可能な祖父母がいますか？',
    helpText:
      '「保育可能な祖父母」とは原則健康で不就労である場合を指します。一人につき減点されます（同居の祖父母あり）',
    inputType: 'select',
    options: [
      { label: 'いない', value: 'adj_grandparent_none', points: 0 },
      { label: '65歳未満が1人', value: 'adj_grandparent_u65_1', points: -2 },
      { label: '65歳未満が2人', value: 'adj_grandparent_u65_2', points: -4 },
      { label: '65歳以上75歳未満が1人', value: 'adj_grandparent_o65_1', points: -1 },
      { label: '65歳以上75歳未満が2人', value: 'adj_grandparent_o65_2', points: -2 },
      {
        label: '65歳未満が1人・65歳以上75歳未満が1人',
        value: 'adj_grandparent_mix',
        points: -3,
      },
    ],
  },
  {
    id: 'adj_sibling_at_home',
    category: 'adjustment',
    label: 'きょうだいを家庭で保育していますか？',
    helpText:
      '一人につき減点されます。「特別な支援を要する児童」または「特別な支援を要する家庭」に該当する場合、この減点は適用されません',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_at_home_no', points: 0 },
      { label: '1人', value: 'adj_sibling_at_home_1', points: -2 },
      { label: '2人以上', value: 'adj_sibling_at_home_2', points: -4 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: 'きょうだいの在籍・申込状況は？',
    helpText:
      '複数該当する場合はいずれか高い方が加点されます（3子以上同時申込みの場合を除く）',
    inputType: 'select',
    options: [
      { label: 'あてはまらない', value: 'adj_sibling_none', points: 0 },
      {
        label: 'きょうだいが既に認可保育施設に在籍している',
        value: 'adj_sibling_4a',
        points: 4,
      },
      { label: 'きょうだいが認可保育施設を新規に申し込む', value: 'adj_sibling_2', points: 2 },
      {
        label:
          '認可保育施設に在籍する教育認定で施設等利用給付認定を有する児童のきょうだいが認可保育施設を申し込む',
        value: 'adj_sibling_4b',
        points: 4,
      },
      {
        label:
          '市内の低年齢児（0〜2歳児）までの認可保育施設の卒園児（保育所継続利用）のきょうだいが認可保育施設を新規に申し込む',
        value: 'adj_sibling_4c',
        points: 4,
      },
    ],
  },
  {
    id: 'adj_leave_extension',
    category: 'adjustment',
    label: '希望する保育所等に入所できない場合、育児休業の延長も許容できますか？',
    helpText: 'その他（減点）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_leave_extension_no', points: 0 },
      { label: 'はい', value: 'adj_leave_extension_yes', points: -20 },
    ],
  },
  {
    id: 'adj_special',
    category: 'adjustment',
    label: 'その他、市長が特に認める場合に該当しますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_special_no', points: 0 },
      { label: 'はい', value: 'adj_special_yes', points: 4 },
    ],
  },
  {
    id: 'adj_arrears',
    category: 'adjustment',
    label: '特別な事情なく利用者負担額を滞納していますか？',
    helpText: 'その他（減点）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_arrears_no', points: 0 },
      { label: 'はい', value: 'adj_arrears_yes', points: -15 },
    ],
  },
  {
    id: 'adj_declined',
    category: 'adjustment',
    label: '正当な理由なく同一年度内の入所決定を辞退したことがありますか？',
    helpText:
      '「正当な理由」とは、急きょ入所（園）予定の児童が長期入院することになった等、やむを得ない場合を指します（その他、減点）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_declined_no', points: 0 },
      { label: 'はい', value: 'adj_declined_yes', points: -15 },
    ],
  },
  {
    id: 'adj_childcare_worker',
    category: 'adjustment',
    label: '市内の保育施設等で就労していますか（就労予定を含む）？',
    helpText:
      '「保育士等」とは保育士、幼稚園教諭、保育教諭、看護師等を指します（その他）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_childcare_worker_no', points: 0 },
      {
        label: '市内の教育・保育施設、認可外保育施設等で就労している「保育士等」',
        value: 'adj_childcare_worker_4',
        points: 4,
      },
      {
        label: '市内認可保育施設で就労している「保育士等」以外の者',
        value: 'adj_childcare_worker_1',
        points: 1,
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// エクスポート
// ---------------------------------------------------------------------------

export const kusatsuData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
