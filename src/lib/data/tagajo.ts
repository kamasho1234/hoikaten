import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 多賀城市 保育所入所選考基準（令和8年度）
//
// 出典: 多賀城市「保育所入所選考基準」
//       https://www.city.tagajo.miyagi.jp/hoiku/kosodate/hoikujo/documents/nyuushosenkoukijun.pdf
//       （保育所等の入所案内
//         https://www.city.tagajo.miyagi.jp/hoiku/kosodate/hoikujo/ からリンクされている単独PDF）
//
// 2026-08-31: 従来のデータは他自治体と同じ点数配列のテンプレート（推定値）だったため、
// 上記の公式の選考基準を読み取って全面的に置き換えた。
// 2026-08-19 の一斉置き換えでは「令和8年度入所案内PDF（47ページ）は
// 『利用調整基本点数表等に基づき』と書かれているのみで点数表そのものが掲載されていない」
// として failed にしていたが、**入所案内とは別に「保育所入所選考基準」という
// 単独PDFが同じページに置かれている**。
//
// ## 計算方式
// 「1 入所優先順位に関する基準指数（**児童の父母それぞれにつき10点を上限とする**）」＋
// 「2 児童の家庭の状況等に関する調整指数」＝ 基準指数と調整指数の合計
// 父母各10点なので maxBasePoints は 20。
//
// ## 1 入所優先順位に関する基準指数
// 被雇用者（就労内定者を含む）
//   週5日以上就労（不規則の場合は月20日以上）… 1日7時間以上 10／6時間以上 9／
//     5時間以上 8／4時間以上 7／4時間未満 6
//   週4日就労（不規則の場合は月16日以上）… 1日7時間以上 8／6時間以上 7／
//     5時間以上 6／4時間以上 5
//   週3日就労（不規則の場合は月15日以下）… 1日7時間以上 6／6時間以上 5
//   月60時間以上就労しているが、1日の就労時間が上記に満たない 4
// 自営業 事業主
//   週5日以上就労 … 1日7時間以上 9／6時間以上 8／5時間以上 7／4時間以上 6／4時間未満 5
//   週4日就労 … 1日7時間以上 7／6時間以上 6／5時間以上 5
//   週3日就労 … 1日7時間以上 5
//   月60時間以上就労しているが、1日の就労時間が上記に満たない 4
// 自営業 専従者（就労内定者を含む）
//   週5日以上就労 … 1日7時間以上 8／6時間以上 7／5時間以上 6／4時間以上 5／4時間未満 4
//   週4日就労 … 1日7時間以上 6／6時間以上 5／5時間以上 4
//   月60時間以上就労しているが、1日の就労時間が上記に満たない 4
// 就労の加点
//   常時危険物（大型機械、劇物・火気・刃物等）を取り扱う等、就労形態上、
//     就労時間中の保育ができない場合 ＋2
//   事業所が居宅と同じ敷地内または隣接地でない場所にある場合（外勤等を含む）＋1
// 内職 … 月60時間以上従事していることが要件。平均月収が5万円を超える場合は
//   自営業の専従者の項目を適用 4
// 出産（出産予定日の前後各2ヶ月以内）8
// 疾病等
//   入院 … 1ヶ月以上 10／2週間を超え1ヶ月未満 8
//   通院 … 週4日以上 6
//   自宅療養 … 常時伏臥、感染症等 10／上記以外で日常生活に著しく支障があり、
//     他者の介助が必要な場合 8／一般療養（運動、外出等が制限されているが、
//     身の回りのことは自分でできる場合）6
//   障害 … 介護を要する（概ね1・2級又はA判定程度）10／
//     保育に支障がある（概ね3級又はB判定程度）7／上記以外で必要と思われるもの（4級以下）4／
//     精神障害（これを理由に就労不可の場合・要診断書）8
// 通院、施設通所、入院の付き添い
//   週5日以上 … 1日の所要時間7時間以上 10／4時間以上 7
//   週4日以下 … 1日の所要時間7時間以上 8／4時間以上 5
// 自宅介護 … 重度の介護を要する（要介護4程度以上）10／
//   中程度の介護を要する（要介護3程度）8／軽度の介護を要する（要介護2程度）6
// 災害等（火災等による家屋の損壊、その他災害復旧のため保育ができない場合）10
// 求職中 3
// 学校、職業訓練学校等への通学
//   週5日以上就学（不規則の場合は月20日以上）… 1日7時間以上 9／6時間以上 8／
//     5時間以上 7／4時間以上 6／4時間未満 5
//   週4日以上就学（不規則の場合は月16日以上）… 1日7時間以上 7／6時間以上 6／5時間以上 5
//   週3日就学（不規則の場合は月15日以下）… 1日7時間以上 5
//   月60時間以上就学しているが、1日の就学時間が上記に満たない 4
// 親不在（死亡、離婚、単身赴任、行方不明、拘禁等）10
// その他（上記各項目に類する状況と認められる場合）3〜10
//
// ## 2 児童の家庭の状況等に関する調整指数
// ひとり親世帯（母子家庭、父子家庭又は離婚成立前で父母が別居している場合）3
// 生活保護世帯 3
// 主たる生計維持者である保護者が倒産、リストラ等の理由により日々求職活動をしている場合 2
// 家庭の危険度が高い世帯（虐待等）4
// 入所申込み児童が、集団保育が可能とされた障害児である場合 3
// 入所申込み児童が、集団保育が可能とされた医療的ケアが必要な児童である場合 3
// 産前産後休業・育児休業明けで復職する予定の場合 1
// 兄弟姉妹での入所の場合（兄弟姉妹が保育所等に入所中又は同時の申込みの場合）2
// 入所希望児童が第3子以降の子どもの場合（申請年度の4月1日時点で小学6年生以下の
//   兄姉から数える）1
// 地域型保育事業の卒園児が、3歳に達した年度の次の4月1日から引き続き保育利用を
//   希望する場合 6
// 1号認定であった児童が同一施設での保育利用を希望し、2号認定を受ける場合 6
// 就労等をしており、認可外保育施設、一時預かり等をすでに常態的に利用している場合 1
// 保護者が利用開始日時点において、保育所等で保育士または保育教諭として勤務している世帯 4
// 育児休業取得のため退所した児童が再度入所を希望する場合 2
// 65歳未満の同居の祖父母で、保育を必要とする事由に該当しない場合 マイナス5
// 65歳未満の同居の祖父母で、保育を必要とする事由が60時間未満あるいは求職中の場合 マイナス1
// その他特別な事情により、減算・加算調整が必要と認められる場合 マイナス4〜4
//
// ## 3 基準指数及び調整指数の合計が同一指数で並んだときの優先順位
// 1 基準指数の合計が高い場合
// 2 生活保護世帯に該当する場合
// 3 両親又はその一方が単身赴任・拘禁・長期入院等で不在の世帯
//   （調整指数における「ひとり親」の加算が適用される世帯を除く）
// 4 就労等をしており、認可外保育施設、一時預かり等をすでに利用している場合
// 5 同一年度内の利用調整において、利用を辞退したことがない場合
//   （家庭状況の変化等のやむを得ない事情による辞退を除く）
// 6 入所希望日が早い場合
// 7 世帯の合計所得金額が低い場合
//
// ## 質問に入れなかった規定
// - 基準指数「その他（上記各項目に類する状況と認められる場合）」は「3〜10」の範囲値のため
// - 調整指数「その他特別な事情により、減算・加算調整が必要と認められる場合」も
//   「マイナス4〜4」の範囲値のため
// ---------------------------------------------------------------------------

const municipality = {
  id: 'tagajo',
  name: '多賀城市',
  slug: 'tagajo',
  prefecture: '宮城県',
  maxBasePoints: 20, // 父母各10点
} as const;

// ---------------------------------------------------------------------------
// 1 基準指数の選択肢（父母各10点を上限とする）
// ---------------------------------------------------------------------------

/** 就労（被雇用者・自営業事業主・自営業専従者） */
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '被雇用者：週5日以上・1日7時間以上', value: `${prefix}_employment_emp_10`, points: 10 },
  { label: '被雇用者：週5日以上・1日6時間以上', value: `${prefix}_employment_emp_9`, points: 9 },
  { label: '被雇用者：週5日以上・1日5時間以上', value: `${prefix}_employment_emp_8a`, points: 8 },
  { label: '被雇用者：週5日以上・1日4時間以上', value: `${prefix}_employment_emp_7a`, points: 7 },
  { label: '被雇用者：週5日以上・1日4時間未満', value: `${prefix}_employment_emp_6a`, points: 6 },
  { label: '被雇用者：週4日・1日7時間以上', value: `${prefix}_employment_emp_8b`, points: 8 },
  { label: '被雇用者：週4日・1日6時間以上', value: `${prefix}_employment_emp_7b`, points: 7 },
  { label: '被雇用者：週4日・1日5時間以上', value: `${prefix}_employment_emp_6b`, points: 6 },
  { label: '被雇用者：週4日・1日4時間以上', value: `${prefix}_employment_emp_5a`, points: 5 },
  { label: '被雇用者：週3日・1日7時間以上', value: `${prefix}_employment_emp_6c`, points: 6 },
  { label: '被雇用者：週3日・1日6時間以上', value: `${prefix}_employment_emp_5b`, points: 5 },
  {
    label: '被雇用者：月60時間以上就労しているが、1日の就労時間が上記に満たない',
    value: `${prefix}_employment_emp_4`,
    points: 4,
  },
  { label: '自営業（事業主）：週5日以上・1日7時間以上', value: `${prefix}_employment_owner_9`, points: 9 },
  { label: '自営業（事業主）：週5日以上・1日6時間以上', value: `${prefix}_employment_owner_8`, points: 8 },
  { label: '自営業（事業主）：週5日以上・1日5時間以上', value: `${prefix}_employment_owner_7a`, points: 7 },
  { label: '自営業（事業主）：週5日以上・1日4時間以上', value: `${prefix}_employment_owner_6a`, points: 6 },
  { label: '自営業（事業主）：週5日以上・1日4時間未満', value: `${prefix}_employment_owner_5a`, points: 5 },
  { label: '自営業（事業主）：週4日・1日7時間以上', value: `${prefix}_employment_owner_7b`, points: 7 },
  { label: '自営業（事業主）：週4日・1日6時間以上', value: `${prefix}_employment_owner_6b`, points: 6 },
  { label: '自営業（事業主）：週4日・1日5時間以上', value: `${prefix}_employment_owner_5b`, points: 5 },
  { label: '自営業（事業主）：週3日・1日7時間以上', value: `${prefix}_employment_owner_5c`, points: 5 },
  {
    label: '自営業（事業主）：月60時間以上就労しているが、1日の就労時間が上記に満たない',
    value: `${prefix}_employment_owner_4`,
    points: 4,
  },
  { label: '自営業（専従者）：週5日以上・1日7時間以上', value: `${prefix}_employment_staff_8`, points: 8 },
  { label: '自営業（専従者）：週5日以上・1日6時間以上', value: `${prefix}_employment_staff_7a`, points: 7 },
  { label: '自営業（専従者）：週5日以上・1日5時間以上', value: `${prefix}_employment_staff_6a`, points: 6 },
  { label: '自営業（専従者）：週5日以上・1日4時間以上', value: `${prefix}_employment_staff_5a`, points: 5 },
  { label: '自営業（専従者）：週5日以上・1日4時間未満', value: `${prefix}_employment_staff_4a`, points: 4 },
  { label: '自営業（専従者）：週4日・1日7時間以上', value: `${prefix}_employment_staff_6b`, points: 6 },
  { label: '自営業（専従者）：週4日・1日6時間以上', value: `${prefix}_employment_staff_5b`, points: 5 },
  { label: '自営業（専従者）：週4日・1日5時間以上', value: `${prefix}_employment_staff_4b`, points: 4 },
  {
    label: '自営業（専従者）：月60時間以上就労しているが、1日の就労時間が上記に満たない',
    value: `${prefix}_employment_staff_4c`,
    points: 4,
  },
];

/** 内職 */
const naishokuOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_naishoku_none`, points: 0 },
  { label: '内職（月60時間以上従事している）', value: `${prefix}_naishoku_4`, points: 4 },
];

/** 出産 */
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産予定日の前後各2ヶ月以内', value: `${prefix}_childbirth_8`, points: 8 },
];

/** 疾病等 */
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院：1ヶ月以上', value: `${prefix}_illness_10a`, points: 10 },
  { label: '入院：2週間を超え1ヶ月未満', value: `${prefix}_illness_8a`, points: 8 },
  { label: '通院：週4日以上', value: `${prefix}_illness_6`, points: 6 },
  { label: '自宅療養：常時伏臥、感染症等', value: `${prefix}_illness_10b`, points: 10 },
  {
    label: '自宅療養：日常生活に著しく支障があり、他者の介助が必要',
    value: `${prefix}_illness_8b`,
    points: 8,
  },
  {
    label: '自宅療養：一般療養（運動、外出等が制限されているが、身の回りのことは自分でできる）',
    value: `${prefix}_illness_6b`,
    points: 6,
  },
  {
    label: '障害：介護を要する（概ね1・2級またはA判定程度）',
    value: `${prefix}_illness_disability_10`,
    points: 10,
  },
  {
    label: '障害：保育に支障がある（概ね3級またはB判定程度）',
    value: `${prefix}_illness_disability_7`,
    points: 7,
  },
  { label: '障害：上記以外で必要と思われるもの（4級以下）', value: `${prefix}_illness_disability_4`, points: 4 },
  {
    label: '精神障害（これを理由に就労不可の場合・要診断書）',
    value: `${prefix}_illness_seishin_8`,
    points: 8,
  },
];

/** 付き添い・自宅介護 */
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  {
    label: '通院・施設通所・入院の付き添い：週5日以上・1日7時間以上',
    value: `${prefix}_care_tsukisoi_10`,
    points: 10,
  },
  {
    label: '通院・施設通所・入院の付き添い：週5日以上・1日4時間以上',
    value: `${prefix}_care_tsukisoi_7`,
    points: 7,
  },
  {
    label: '通院・施設通所・入院の付き添い：週4日以下・1日7時間以上',
    value: `${prefix}_care_tsukisoi_8`,
    points: 8,
  },
  {
    label: '通院・施設通所・入院の付き添い：週4日以下・1日4時間以上',
    value: `${prefix}_care_tsukisoi_5`,
    points: 5,
  },
  { label: '自宅介護：重度（要介護4程度以上）', value: `${prefix}_care_home_10`, points: 10 },
  { label: '自宅介護：中程度（要介護3程度）', value: `${prefix}_care_home_8`, points: 8 },
  { label: '自宅介護：軽度（要介護2程度）', value: `${prefix}_care_home_6`, points: 6 },
];

/** 災害等 */
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  {
    label: '火災等による家屋の損壊、その他災害復旧のため保育ができない',
    value: `${prefix}_disaster_10`,
    points: 10,
  },
];

/** 求職中 */
const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職中', value: `${prefix}_jobseeking_3`, points: 3 },
];

/** 学校、職業訓練学校等への通学 */
const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '週5日以上・1日7時間以上', value: `${prefix}_education_9`, points: 9 },
  { label: '週5日以上・1日6時間以上', value: `${prefix}_education_8`, points: 8 },
  { label: '週5日以上・1日5時間以上', value: `${prefix}_education_7a`, points: 7 },
  { label: '週5日以上・1日4時間以上', value: `${prefix}_education_6a`, points: 6 },
  { label: '週5日以上・1日4時間未満', value: `${prefix}_education_5a`, points: 5 },
  { label: '週4日以上・1日7時間以上', value: `${prefix}_education_7b`, points: 7 },
  { label: '週4日以上・1日6時間以上', value: `${prefix}_education_6b`, points: 6 },
  { label: '週4日以上・1日5時間以上', value: `${prefix}_education_5b`, points: 5 },
  { label: '週3日・1日7時間以上', value: `${prefix}_education_5c`, points: 5 },
  {
    label: '月60時間以上就学しているが、1日の就学時間が上記に満たない',
    value: `${prefix}_education_4`,
    points: 4,
  },
];

/** 親不在 */
const absentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_absent_none`, points: 0 },
  {
    label: '親不在（死亡、離婚、単身赴任、行方不明、拘禁等）',
    value: `${prefix}_absent_10`,
    points: 10,
  },
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
    label: `${parentLabel}：保護者の状況`,
    helpText: '基準指数は児童の父母それぞれにつき10点を上限とします',
    inputType: 'select',
    options: [
      { label: '就労（被雇用者・自営業）', value: `${prefix}_reason_employment`, points: 0 },
      { label: '内職', value: `${prefix}_reason_naishoku`, points: 0 },
      { label: '出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '疾病等（入院・通院・自宅療養・障害）', value: `${prefix}_reason_illness`, points: 0 },
      { label: '付き添い・自宅介護', value: `${prefix}_reason_care`, points: 0 },
      { label: '災害等', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '求職中', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '学校、職業訓練学校等への通学', value: `${prefix}_reason_education`, points: 0 },
      { label: '親不在', value: `${prefix}_reason_absent`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の就労状況は？`,
      helpText:
        '週の就労日数（不規則の場合は月の就労日数）と1日の就労時間の組み合わせで判断されます。被雇用者・自営業専従者は就労内定者を含みます',
      inputType: 'radio',
      options: employmentOptions(prefix),
    },
    {
      id: `${prefix}_employment_add`,
      category,
      showFor: ['employment'],
      label: `${parentLabel}の就労に関する加点はありますか？`,
      inputType: 'select',
      options: [
        { label: 'あてはまらない', value: `${prefix}_employment_add_none`, points: 0 },
        {
          label: '常時危険物（大型機械、劇物・火気・刃物等）を取り扱う等、就労時間中の保育ができない',
          value: `${prefix}_employment_add_2`,
          points: 2,
        },
        {
          label: '事業所が居宅と同じ敷地内または隣接地でない場所にある（外勤等を含む）',
          value: `${prefix}_employment_add_1`,
          points: 1,
        },
      ],
    },
    {
      id: `${prefix}_naishoku`,
      category,
      label: `${parentLabel}は内職をしていますか？`,
      helpText:
        '月60時間以上従事していることが要件です。平均月収が5万円を超える場合は自営業の専従者の項目が適用されます',
      inputType: 'radio',
      options: naishokuOptions(prefix),
    },
    {
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}は出産の前後ですか？`,
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
      label: `${parentLabel}の付き添い・介護の状況は？`,
      inputType: 'radio',
      options: careOptions(prefix),
    },
    {
      id: `${prefix}_disaster`,
      category,
      label: `${parentLabel}は災害等で保育ができない状況ですか？`,
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
      label: `${parentLabel}の通学の状況は？`,
      inputType: 'radio',
      options: educationOptions(prefix),
    },
    {
      id: `${prefix}_absent`,
      category,
      label: `${parentLabel}は不在ですか？`,
      inputType: 'radio',
      options: absentOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// ---------------------------------------------------------------------------
// 2 児童の家庭の状況等に関する調整指数
// ---------------------------------------------------------------------------

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親世帯ですか？',
    helpText: '母子家庭、父子家庭、または離婚成立前で父母が別居している場合が対象です',
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
      { label: 'はい', value: 'adj_welfare_yes', points: 3 },
    ],
  },
  {
    id: 'adj_unemployed',
    category: 'adjustment',
    label: '主たる生計維持者が倒産・リストラ等の理由で日々求職活動をしていますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unemployed_no', points: 0 },
      { label: 'はい', value: 'adj_unemployed_yes', points: 2 },
    ],
  },
  {
    id: 'adj_risk',
    category: 'adjustment',
    label: '家庭の危険度が高い世帯（虐待等）ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_risk_no', points: 0 },
      { label: 'はい', value: 'adj_risk_yes', points: 4 },
    ],
  },
  {
    id: 'adj_child_disability',
    category: 'adjustment',
    label: '入所申込み児童は、集団保育が可能とされた障害児ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_child_disability_no', points: 0 },
      { label: 'はい', value: 'adj_child_disability_yes', points: 3 },
    ],
  },
  {
    id: 'adj_medical_care',
    category: 'adjustment',
    label: '入所申込み児童は、集団保育が可能とされた医療的ケアが必要な児童ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_medical_care_no', points: 0 },
      { label: 'はい', value: 'adj_medical_care_yes', points: 3 },
    ],
  },
  {
    id: 'adj_leave_return',
    category: 'adjustment',
    label: '産前産後休業・育児休業明けで復職する予定ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_leave_return_no', points: 0 },
      { label: 'はい', value: 'adj_leave_return_yes', points: 1 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: '兄弟姉妹が保育所等に入所中、または同時に申し込みますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_no', points: 0 },
      { label: 'はい', value: 'adj_sibling_yes', points: 2 },
    ],
  },
  {
    id: 'adj_third_child',
    category: 'adjustment',
    label: '入所希望児童は第3子以降ですか？',
    helpText: '申請年度の4月1日時点で小学6年生以下の兄姉から数えます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_third_child_no', points: 0 },
      { label: 'はい', value: 'adj_third_child_yes', points: 1 },
    ],
  },
  {
    id: 'adj_graduate',
    category: 'adjustment',
    label: '地域型保育事業の卒園児として引き続き保育利用を希望しますか？',
    helpText: '3歳に達した年度の次の4月1日から引き続き保育利用を希望する場合が対象です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_graduate_no', points: 0 },
      { label: 'はい', value: 'adj_graduate_yes', points: 6 },
    ],
  },
  {
    id: 'adj_type_change',
    category: 'adjustment',
    label: '1号認定だった児童が同一施設での保育利用を希望し、2号認定を受けますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_type_change_no', points: 0 },
      { label: 'はい', value: 'adj_type_change_yes', points: 6 },
    ],
  },
  {
    id: 'adj_ninkagai',
    category: 'adjustment',
    label: '就労等をしており、認可外保育施設や一時預かり等を常態的に利用していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_ninkagai_no', points: 0 },
      { label: 'はい', value: 'adj_ninkagai_yes', points: 1 },
    ],
  },
  {
    id: 'adj_hoikushi',
    category: 'adjustment',
    label: '保護者が利用開始日時点で保育所等に保育士・保育教諭として勤務していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_hoikushi_no', points: 0 },
      { label: 'はい', value: 'adj_hoikushi_yes', points: 4 },
    ],
  },
  {
    id: 'adj_reentry',
    category: 'adjustment',
    label: '育児休業取得のため退所した児童が再度入所を希望しますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_reentry_no', points: 0 },
      { label: 'はい', value: 'adj_reentry_yes', points: 2 },
    ],
  },
  {
    id: 'adj_grandparent',
    category: 'adjustment',
    label: '65歳未満の同居の祖父母がいますか？',
    inputType: 'select',
    options: [
      { label: 'いない、または保育を必要とする事由に該当する', value: 'adj_grandparent_none', points: 0 },
      {
        label: '保育を必要とする事由が60時間未満、あるいは求職中',
        value: 'adj_grandparent_minus1',
        points: -1,
      },
      { label: '保育を必要とする事由に該当しない', value: 'adj_grandparent_minus5', points: -5 },
    ],
  },
];

// ---------------------------------------------------------------------------
// エクスポート
// ---------------------------------------------------------------------------

export const tagajoData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
