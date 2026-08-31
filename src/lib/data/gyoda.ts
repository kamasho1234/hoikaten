import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 行田市保育所等利用調整基準表
//
// 出典: 行田市「行田市保育所等利用調整基準表」
//       https://www.city.gyoda.lg.jp/material/files/group/22/hoiku_kijun.pdf
//       （保育施設・利用者負担額（保育料）について
//         https://www.city.gyoda.lg.jp/kosodate_kyoiku/ikuzi_misyugaku/hoikusho_kodomoen/hoikusho/3988.html
//         からリンクされている単独PDF）
//
// 2026-08-31: 従来のデータは他自治体と同じ点数配列のテンプレート（推定値）だったため、
// 上記の公式基準表を読み取って全面的に置き換えた。
// 2026-08-19 の一斉置き換えでは市サイトを取得できず failed にしていたが、今回は取得できた。
//
// ## 計算方式
// 小計A（別表第1 基準指数）＋ 小計B（別表第2 調整指数）＝ 合計
// 基準指数は父母それぞれに付き、**父母に対して1類型のみ選択（減点項目は除く）**。
// 父母各最大20点なので maxBasePoints は 40。
//
// ## 別表第1（第2条関係）基準指数
// 就労 … 月160時間以上 20／月144時間以上 18／月128時間以上 16／月112時間以上 14／
//        月96時間以上 12／月80時間以上 10／月64時間以上 8／
//        上記に該当しないが、おおむね月64時間程度就労しており、
//        今後月64時間以上の就労が見込まれる 7
//        【減点項目】内職 マイナス2
// 求職活動 … 求職活動 4
// 妊娠・出産 … 出産前6週間、出産後8週間 8
// 就学 … 学校に通学 17
// 保護者の障害 … 身体障害者手帳1級・2級、療育手帳Ⓐ・A、精神障害者保健福祉手帳1級の
//        いずれかを保持している 20／身体障害者手帳3級、療育手帳B、
//        精神障害者保健福祉手帳2級のいずれかを保持している 17／
//        上記等級以外の手帳を保持している 15
// 保護者の疾病 … 入院又は、自宅療養で常に病臥している 20／
//        通院加療を行い、常に安静を必要としている 17／上記以外の事由 15
// 親族の介護・看護 … 介護又は看護に要する時間を基に、就労の基準を準用 20〜7
//        【減点項目】同居親族の居宅内介護・看護 マイナス1
// 災害復旧 … 災害復旧を行う 10
// 虐待やDV … 虐待やDVの恐れがある 20
//
// ## 別表第2（第2条関係）調整指数 ※複数選択可能
//  1 ひとり親家庭（調停中を含む）23
//  2 ひとり親家庭かつ18歳以上65歳未満の同居者がいない、または、ひとり親家庭かつ
//    18歳以上65歳未満の同居者が入所児童を保育できないことの証明書などの提出がある 2
//  3 生活保護世帯 3
//  4 生計中心者の失業により、就労の必要性が高いと認められる 3
//  5 虐待やDVの恐れがある場合など、社会的養護が必要と認められる 30
//  6 入所申込児童が障害者手帳を保持している 5
//  7 育児休業中・産前産後休暇中からの入所申込みをしている（当該年度中に限る）3
//  8 兄弟姉妹が同時に同一（保育部分に限る）保育所などへ入所申込みをしている 3
//  9 家庭的保育事業などへ入所申込みをする場合で、兄弟姉妹が隣接する当該連携先幼稚園に
//    在園している 5
// 10 兄弟姉妹が既に在園（教育部分を含む）している保育所などへ入所申込みをしている 5
// 11 家庭的保育事業などの卒園児童 5
// 12 児童の世帯に利用者負担額（保育料）の滞納がある：3ヶ月以上12ヶ月分未満（納付計画あり）マイナス5
// 13 同：3ヶ月以上12ヶ月分未満（納付計画なし）マイナス10
// 14 同：12ヶ月分以上（納付計画あり）マイナス15
// 15 同：12ヶ月分以上（納付計画なし）マイナス20
// 16 65歳未満の同居祖父母が入所申込児童を保育できないことの証明書などの提出がない マイナス3
// 17 保育従事者として保育所などへ就労（内定）している：勤務先が市内 30
// 18 同：勤務先が市外 10
// 19 市外在住（転入予定またはNo.17に該当する場合は除く）マイナス30
// 20 年度内に、入所決定後、入所をせず辞退したことがある（保護者都合による場合のみ）マイナス3
// 21 その他市が認める事由 … 状況による
// 22 育児休業から復職しており、申請時点で認可外保育施設に在籍している 3
// 23 転入の場合で前住所地において保育所などに在籍し、育児休業から復職している 3
// 備考
//  1 No.8〜10は、該当する項目のうち1項目のみを加算する。
//  2 保育所などとは、認可保育所、認定こども園、地域型保育事業所のことをいう。
//
// ## 別表第3（第2条関係）指数が同じときの優先順位
// 1 市内在住（転入予定を含む）／2 別表第2の調整指数の合計が高いもの／
// 3 入所待機期間が長いもの（連続する半年以上の期間に限る）／4 希望園の順位が高いもの／
// 5 養育している子どもの人数が多いもの／6 父または母が市内で就労しているもの／
// 7 調整会議で優先度が高いと認められたもの
//
// ## 質問に入れなかった規定
// - 調整指数21「その他市が認める事由」は原典が「状況による」で点数が定まらないため
// - 別表第3の優先順位は同点時のタイブレークであり指数ではないため
// ---------------------------------------------------------------------------

const municipality = {
  id: 'gyoda',
  name: '行田市',
  slug: 'gyoda',
  prefecture: '埼玉県',
  maxBasePoints: 40, // 父母各20点
} as const;

// ---------------------------------------------------------------------------
// 別表第1 基準指数の選択肢（父母各最大20点）
// ---------------------------------------------------------------------------

/** 就労 */
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月160時間以上', value: `${prefix}_employment_20`, points: 20 },
  { label: '月144時間以上', value: `${prefix}_employment_18`, points: 18 },
  { label: '月128時間以上', value: `${prefix}_employment_16`, points: 16 },
  { label: '月112時間以上', value: `${prefix}_employment_14`, points: 14 },
  { label: '月96時間以上', value: `${prefix}_employment_12`, points: 12 },
  { label: '月80時間以上', value: `${prefix}_employment_10`, points: 10 },
  { label: '月64時間以上', value: `${prefix}_employment_8`, points: 8 },
  {
    label: 'おおむね月64時間程度就労しており、今後月64時間以上の就労が見込まれる',
    value: `${prefix}_employment_7`,
    points: 7,
  },
];

/** 求職活動 */
const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動', value: `${prefix}_jobseeking_4`, points: 4 },
];

/** 妊娠・出産 */
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産前6週間、出産後8週間', value: `${prefix}_childbirth_8`, points: 8 },
];

/** 就学 */
const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '学校に通学', value: `${prefix}_education_17`, points: 17 },
];

/** 保護者の障害 */
const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  {
    label: '身体障害者手帳1級・2級、療育手帳Ⓐ・A、精神障害者保健福祉手帳1級のいずれか',
    value: `${prefix}_disability_20`,
    points: 20,
  },
  {
    label: '身体障害者手帳3級、療育手帳B、精神障害者保健福祉手帳2級のいずれか',
    value: `${prefix}_disability_17`,
    points: 17,
  },
  { label: '上記等級以外の手帳を保持している', value: `${prefix}_disability_15`, points: 15 },
];

/** 保護者の疾病 */
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院、または自宅療養で常に病臥している', value: `${prefix}_illness_20`, points: 20 },
  { label: '通院加療を行い、常に安静を必要としている', value: `${prefix}_illness_17`, points: 17 },
  { label: '上記以外の事由', value: `${prefix}_illness_15`, points: 15 },
];

/** 親族の介護・看護（就労の基準を準用） */
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '月160時間以上', value: `${prefix}_care_20`, points: 20 },
  { label: '月144時間以上', value: `${prefix}_care_18`, points: 18 },
  { label: '月128時間以上', value: `${prefix}_care_16`, points: 16 },
  { label: '月112時間以上', value: `${prefix}_care_14`, points: 14 },
  { label: '月96時間以上', value: `${prefix}_care_12`, points: 12 },
  { label: '月80時間以上', value: `${prefix}_care_10`, points: 10 },
  { label: '月64時間以上', value: `${prefix}_care_8`, points: 8 },
  { label: 'おおむね月64時間程度', value: `${prefix}_care_7`, points: 7 },
];

/** 災害復旧 */
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '災害復旧を行う', value: `${prefix}_disaster_10`, points: 10 },
];

/** 虐待やDV */
const abuseOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_abuse_none`, points: 0 },
  { label: '虐待やDVの恐れがある', value: `${prefix}_abuse_20`, points: 20 },
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
    label: `${parentLabel}：保育が必要な類型`,
    helpText: '父母に対して1類型のみ選択します（減点項目は除く）',
    inputType: 'select',
    options: [
      { label: '就労', value: `${prefix}_reason_employment`, points: 0 },
      { label: '求職活動', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '妊娠・出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '就学', value: `${prefix}_reason_education`, points: 0 },
      { label: '保護者の障害', value: `${prefix}_reason_disability`, points: 0 },
      { label: '保護者の疾病', value: `${prefix}_reason_illness`, points: 0 },
      { label: '親族の介護・看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '災害復旧', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '虐待やDVの恐れがある', value: `${prefix}_reason_abuse`, points: 0 },
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
      id: `${prefix}_naishoku`,
      category,
      showFor: ['employment'],
      label: `${parentLabel}の就労は内職ですか？`,
      helpText: '内職は減点項目です',
      inputType: 'radio',
      options: [
        { label: 'いいえ', value: `${prefix}_naishoku_no`, points: 0 },
        { label: 'はい（内職）', value: `${prefix}_naishoku_yes`, points: -2 },
      ],
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
      label: `${parentLabel}は出産の前後ですか？`,
      inputType: 'radio',
      options: childbirthOptions(prefix),
    },
    {
      id: `${prefix}_education`,
      category,
      label: `${parentLabel}は学校に通学していますか？`,
      inputType: 'radio',
      options: educationOptions(prefix),
    },
    {
      id: `${prefix}_disability`,
      category,
      label: `${parentLabel}の手帳の等級は？`,
      inputType: 'radio',
      options: disabilityOptions(prefix),
    },
    {
      id: `${prefix}_illness`,
      category,
      label: `${parentLabel}の疾病の状況は？`,
      inputType: 'radio',
      options: illnessOptions(prefix),
    },
    {
      id: `${prefix}_care`,
      category,
      label: `${parentLabel}はどのくらい親族を介護・看護していますか？`,
      helpText: '介護又は看護に要する時間を基に、就労の基準を準用します',
      inputType: 'radio',
      options: careOptions(prefix),
    },
    {
      id: `${prefix}_care_home`,
      category,
      showFor: ['care'],
      label: `${parentLabel}の介護・看護は同居親族の居宅内介護・看護ですか？`,
      helpText: '同居親族の居宅内介護・看護は減点項目です',
      inputType: 'radio',
      options: [
        { label: 'いいえ', value: `${prefix}_care_home_no`, points: 0 },
        { label: 'はい（同居親族の居宅内介護・看護）', value: `${prefix}_care_home_yes`, points: -1 },
      ],
    },
    {
      id: `${prefix}_disaster`,
      category,
      label: `${parentLabel}は災害復旧を行っていますか？`,
      inputType: 'radio',
      options: disasterOptions(prefix),
    },
    {
      id: `${prefix}_abuse`,
      category,
      label: `${parentLabel}に虐待やDVの恐れがありますか？`,
      inputType: 'radio',
      options: abuseOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// ---------------------------------------------------------------------------
// 別表第2 調整指数（世帯単位）の質問
// ---------------------------------------------------------------------------

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親家庭ですか？',
    helpText: '調停中を含みます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい', value: 'adj_single_parent_yes', points: 23 },
    ],
  },
  {
    id: 'adj_single_parent_alone',
    category: 'adjustment',
    label: 'ひとり親家庭で、18歳以上65歳未満の同居者がいませんか？',
    helpText:
      '18歳以上65歳未満の同居者がいても、その人が入所児童を保育できないことの証明書などを提出する場合は該当します',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_alone_no', points: 0 },
      { label: 'はい', value: 'adj_single_parent_alone_yes', points: 2 },
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
    id: 'adj_unemployed',
    category: 'adjustment',
    label: '生計中心者の失業により、就労の必要性が高いと認められますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unemployed_no', points: 0 },
      { label: 'はい', value: 'adj_unemployed_yes', points: 3 },
    ],
  },
  {
    id: 'adj_social_care',
    category: 'adjustment',
    label: '虐待やDVの恐れがある場合など、社会的養護が必要と認められますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_social_care_no', points: 0 },
      { label: 'はい', value: 'adj_social_care_yes', points: 30 },
    ],
  },
  {
    id: 'adj_child_disability',
    category: 'adjustment',
    label: '入所申込児童が障害者手帳を保持していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_child_disability_no', points: 0 },
      { label: 'はい', value: 'adj_child_disability_yes', points: 5 },
    ],
  },
  {
    id: 'adj_leave',
    category: 'adjustment',
    label: '育児休業中・産前産後休暇中からの入所申込みですか？',
    helpText: '当該年度中に限ります',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_leave_no', points: 0 },
      { label: 'はい', value: 'adj_leave_yes', points: 3 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: 'きょうだいの申込み・在園の状況は？',
    helpText: '該当する項目のうち1項目のみが加算されます',
    inputType: 'select',
    options: [
      { label: 'あてはまらない', value: 'adj_sibling_none', points: 0 },
      {
        label: '兄弟姉妹が同時に同一（保育部分に限る）保育所などへ入所申込みをしている',
        value: 'adj_sibling_same_time',
        points: 3,
      },
      {
        label:
          '家庭的保育事業などへ入所申込みをする場合で、兄弟姉妹が隣接する当該連携先幼稚園に在園している',
        value: 'adj_sibling_renkei',
        points: 5,
      },
      {
        label: '兄弟姉妹が既に在園（教育部分を含む）している保育所などへ入所申込みをしている',
        value: 'adj_sibling_enrolled',
        points: 5,
      },
    ],
  },
  {
    id: 'adj_katei_graduate',
    category: 'adjustment',
    label: '家庭的保育事業などの卒園児童ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_katei_graduate_no', points: 0 },
      { label: 'はい', value: 'adj_katei_graduate_yes', points: 5 },
    ],
  },
  {
    id: 'adj_unpaid_fee',
    category: 'adjustment',
    label: '児童の世帯に利用者負担額（保育料）の滞納がありますか？',
    inputType: 'select',
    options: [
      { label: 'いいえ', value: 'adj_unpaid_fee_no', points: 0 },
      { label: '3ヶ月以上12ヶ月分未満（納付計画あり）', value: 'adj_unpaid_fee_3_plan', points: -5 },
      { label: '3ヶ月以上12ヶ月分未満（納付計画なし）', value: 'adj_unpaid_fee_3_noplan', points: -10 },
      { label: '12ヶ月分以上（納付計画あり）', value: 'adj_unpaid_fee_12_plan', points: -15 },
      { label: '12ヶ月分以上（納付計画なし）', value: 'adj_unpaid_fee_12_noplan', points: -20 },
    ],
  },
  {
    id: 'adj_grandparent',
    category: 'adjustment',
    label: '65歳未満の同居祖父母について、保育できないことの証明書などを提出しますか？',
    helpText: '65歳未満の同居祖父母がいて証明書などの提出がない場合は減点されます',
    inputType: 'radio',
    options: [
      { label: '65歳未満の同居祖父母はいない、または証明書などを提出する', value: 'adj_grandparent_ok', points: 0 },
      { label: '65歳未満の同居祖父母がいるが証明書などの提出がない', value: 'adj_grandparent_ng', points: -3 },
    ],
  },
  {
    id: 'adj_hoikushi',
    category: 'adjustment',
    label: '保育従事者として保育所などへ就労（内定）していますか？',
    inputType: 'select',
    options: [
      { label: 'あてはまらない', value: 'adj_hoikushi_none', points: 0 },
      { label: '勤務先が市内', value: 'adj_hoikushi_in', points: 30 },
      { label: '勤務先が市外', value: 'adj_hoikushi_out', points: 10 },
    ],
  },
  {
    id: 'adj_outside_resident',
    category: 'adjustment',
    label: '市外在住ですか？',
    helpText: '転入予定の場合、または保育従事者として市内の保育所などへ就労（内定）している場合は除きます',
    inputType: 'radio',
    options: [
      { label: 'いいえ（市内在住または転入予定）', value: 'adj_outside_resident_no', points: 0 },
      { label: 'はい', value: 'adj_outside_resident_yes', points: -30 },
    ],
  },
  {
    id: 'adj_decline',
    category: 'adjustment',
    label: '年度内に、入所決定後に入所せず辞退したことがありますか？',
    helpText: '保護者都合による場合のみ減点されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_decline_no', points: 0 },
      { label: 'はい', value: 'adj_decline_yes', points: -3 },
    ],
  },
  {
    id: 'adj_ninkagai',
    category: 'adjustment',
    label: '育児休業から復職しており、申請時点で認可外保育施設に在籍していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_ninkagai_no', points: 0 },
      { label: 'はい', value: 'adj_ninkagai_yes', points: 3 },
    ],
  },
  {
    id: 'adj_transfer_in',
    category: 'adjustment',
    label: '転入で、前住所地において保育所などに在籍し、育児休業から復職していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_transfer_in_no', points: 0 },
      { label: 'はい', value: 'adj_transfer_in_yes', points: 3 },
    ],
  },
];

// ---------------------------------------------------------------------------
// エクスポート
// ---------------------------------------------------------------------------

export const gyodaData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
