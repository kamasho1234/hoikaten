import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 酒田市保育の利用に関する規則 別表第1・第2・第3
//
// 出典: 酒田市例規集「酒田市保育の利用に関する規則」（令和元年9月27日 規則第12号、
//       令和8年1月1日施行）
//       https://www1.g-reiki.net/city.sakata/reiki_honbun/c405RG00000782.html
//       （市の「令和9年度 認可保育所・認定こども園の利用申し込みについて」
//         https://www.city.sakata.lg.jp/kosodate/kosodate/hoikuen/ninkabosyuu.html
//         が「酒田市保育の利用に関する規則（令和元年規則第12号）に基づき、
//         利用優先度を審査した上で調整を行います」として参照している規則）
//
// 2026-08-31: 従来のデータは他自治体と同じ点数配列のテンプレート（推定値）だったため、
// 上記の規則の別表を読み取って全面的に置き換えた。
// 2026-08-19 の一斉置き換えでは市サイトを取得できず failed にしていたが、今回は取得できた。
// 市の入所案内ページには指数表そのものは載っておらず、例規集の規則が原典になる。
//
// ## 計算方式（第6条第2項）
// 「別表第1に定める基本指数及び別表第2に定める調整指数で該当するものを合算して得られた
//   指数の高いものから順次その順位を付し決定するものとする。ただし、同じ順位となった場合は、
//   別表第3に定める優先区分の順位により上位の順位を決定するものとする。」
// 別表第1は保護者ごとの事由に対する指数、別表第2は世帯・きょうだい・申込児童の状況。
// 基本指数の最大は20点（虐待又は配偶者からの暴力等）なので、父母合算で maxBasePoints は 40。
// なお規則には父母それぞれに基本指数を付ける旨の明文はないが、
// 別表第2で「1人につき」と保護者を数える項目があることから、
// このシミュレーターは他自治体と同じく父母それぞれの基本指数を合算する形で計算している。
//
// ## 別表第1（第6条関係）基本指数
// 1 居宅外労働（自営業及び農業を含む）… 1月当たり180時間以上 13／150時間以上180時間未満 11／
//   120時間以上150時間未満 9／100時間以上120時間未満 7／80時間以上100時間未満 6／
//   60時間以上80時間未満 5／48時間以上60時間未満 4
// 2 内職（居宅内でその児童と離れて内職をすることを常態としている）…
//   180時間以上 9／150時間以上180時間未満 7／120時間以上150時間未満 6／
//   80時間以上120時間未満 5／48時間以上80時間未満 4
// 3 求職活動等（起業の準備を含む）… 生計中心者の失業 3／求職中 1
// 4 就学等（学校教育法に定める学校に在学し、又は職業訓練を受けている）…
//   180時間以上 13／150時間以上180時間未満 11／120時間以上150時間未満 9／
//   100時間以上120時間未満 7／80時間以上100時間未満 6／60時間以上80時間未満 5／
//   48時間以上60時間未満 4
// 5 疾病又は障がい
//   （疾病又は負傷）入院（おおむね1か月以上とし、入院予定を含む。）又は入院以外の重篤な疾病 15／
//   加療安静（上記以外の場合）6／通院（週2回以上）4／通院（週1回以上2回未満）3／通院（週1回未満）1
//   （心身の障がい）身体障害者手帳1級・2級の所持 15／
//   精神障害者保健福祉手帳1級・2級又は療育手帳A の所持 15／要介護4又は要介護5の認定 15／
//   身体障害者手帳3級・4級の所持 13／精神障害者保健福祉手帳3級又は療育手帳B の所持 13／
//   要介護1・2・3の認定 13／身体障害者手帳5級以下の所持 11／要支援1又は要支援2の認定 11
// 6 病人等の介護
//   （同居の親族の介護又は看護）身体障害者手帳1級・2級を所持する者 13／
//   精神障害者保健福祉手帳1級・2級又は療育手帳A を所持する者 13／要介護4又は要介護5 13／
//   身体障害者手帳3級・4級を所持する者 11／精神障害者保健福祉手帳3級又は療育手帳B を所持する者 11／
//   要介護1・2・3 11／身体障害者手帳5級以下を所持する者 9／要支援1又は要支援2 9
//   （同居の親族の施設への付添又は送迎）週5日以上の常時付添 11／
//   週3日以上5日未満の付添及び送迎 9／週3日未満の付添及び送迎 7
// 7 災害復旧 15
// 8 虐待又は配偶者からの暴力等（子ども・子育て支援法施行規則第1条の5第8号に該当する場合
//   又はその他市長がこれに準ずると認める特別な事情がある場合）20
// 9 妊娠又は出産 8
// 備考 この表において「1月」とは、入所申込みに係る添付が必要とされる書類により確認された
//      1月の平均勤務日数又は平均就学日数をいう。
//
// ## 別表第2（第6条関係）調整指数
// 1 世帯の状況 … 生活保護受給世帯 18／ひとり親家庭 17
// 2 祖父母の状況 … 非同居 4／同居しているが就労・疾病等により保育不可 1人につき2（4を上限とする）／
//   同居しているが無職 65歳未満 1人につき マイナス1／65歳以上 0
// 3 保護者の状況 … 保育施設又は学童保育所での就労（就労予定を含む）5／
//   保護者が単身赴任である場合 1人につき3／
//   勤務の終了時間が午前0時を超える勤務が週1回以上ある場合 1人につき2
// 4 きょうだいの状況 … きょうだいが在籍している保育所等の利用を希望する場合
//   （ただし、入所日時点できょうだいが卒園又は退園する予定の場合を除く）5／
//   疾病又は障がい（別表第1の5の項の規定に準ずる）／
//   世帯内に小学生以下のきょうだいがいる場合（申込児童を除く）1人につき2
// 5 申込児童の状況 … 疾病又は障がい（別表第1の5の項の規定に準ずる）／
//   入所申込みをした年度中に在籍保育所等の保育期間が満了となる見込みであるため
//   他保育所等の利用を希望する場合 5／保育所等の廃止により、他保育所等の利用を希望する場合 5
//
// ## 別表第3（第6条関係）保育を必要とする事由の優先区分（同順位のときの優先順）
// 1 虐待又は配偶者からの暴力等／2 災害復旧／3 疾病又は障がい／4 居宅外労働／5 家庭内労働／
// 6 妊娠・出産／7 病人等の介護／8 就学等／9 求職活動等
//
// ## 質問に入れなかった規定
// - 別表第3の優先区分は同順位のときのタイブレークであり指数ではないため
// ---------------------------------------------------------------------------

const municipality = {
  id: 'sakata',
  name: '酒田市',
  slug: 'sakata',
  prefecture: '山形県',
  maxBasePoints: 40, // 父母各20点
} as const;

// ---------------------------------------------------------------------------
// 別表第1 基本指数の選択肢（父母各最大20点）
// ---------------------------------------------------------------------------

/** 1 居宅外労働（自営業及び農業を含む） */
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '1月当たり180時間以上', value: `${prefix}_employment_13`, points: 13 },
  { label: '1月当たり150時間以上180時間未満', value: `${prefix}_employment_11`, points: 11 },
  { label: '1月当たり120時間以上150時間未満', value: `${prefix}_employment_9`, points: 9 },
  { label: '1月当たり100時間以上120時間未満', value: `${prefix}_employment_7`, points: 7 },
  { label: '1月当たり80時間以上100時間未満', value: `${prefix}_employment_6`, points: 6 },
  { label: '1月当たり60時間以上80時間未満', value: `${prefix}_employment_5`, points: 5 },
  { label: '1月当たり48時間以上60時間未満', value: `${prefix}_employment_4`, points: 4 },
];

/** 2 内職 */
const naishokuOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_naishoku_none`, points: 0 },
  { label: '1月当たり180時間以上', value: `${prefix}_naishoku_9`, points: 9 },
  { label: '1月当たり150時間以上180時間未満', value: `${prefix}_naishoku_7`, points: 7 },
  { label: '1月当たり120時間以上150時間未満', value: `${prefix}_naishoku_6`, points: 6 },
  { label: '1月当たり80時間以上120時間未満', value: `${prefix}_naishoku_5`, points: 5 },
  { label: '1月当たり48時間以上80時間未満', value: `${prefix}_naishoku_4`, points: 4 },
];

/** 3 求職活動等 */
const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '生計中心者の失業', value: `${prefix}_jobseeking_3`, points: 3 },
  { label: '求職中', value: `${prefix}_jobseeking_1`, points: 1 },
];

/** 4 就学等 */
const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '1月当たり180時間以上', value: `${prefix}_education_13`, points: 13 },
  { label: '1月当たり150時間以上180時間未満', value: `${prefix}_education_11`, points: 11 },
  { label: '1月当たり120時間以上150時間未満', value: `${prefix}_education_9`, points: 9 },
  { label: '1月当たり100時間以上120時間未満', value: `${prefix}_education_7`, points: 7 },
  { label: '1月当たり80時間以上100時間未満', value: `${prefix}_education_6`, points: 6 },
  { label: '1月当たり60時間以上80時間未満', value: `${prefix}_education_5`, points: 5 },
  { label: '1月当たり48時間以上60時間未満', value: `${prefix}_education_4`, points: 4 },
];

/** 5 疾病又は障がい（疾病又は負傷） */
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  {
    label: '入院（おおむね1か月以上とし、入院予定を含む）、または入院以外の重篤な疾病',
    value: `${prefix}_illness_15`,
    points: 15,
  },
  { label: '加療安静（上記以外の場合）', value: `${prefix}_illness_6`, points: 6 },
  { label: '通院（週2回以上）', value: `${prefix}_illness_4`, points: 4 },
  { label: '通院（週1回以上2回未満）', value: `${prefix}_illness_3`, points: 3 },
  { label: '通院（週1回未満）', value: `${prefix}_illness_1`, points: 1 },
];

/** 5 疾病又は障がい（心身の障がい） */
const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '身体障害者手帳1級・2級の所持', value: `${prefix}_disability_shintai_15`, points: 15 },
  {
    label: '精神障害者保健福祉手帳1級・2級、または療育手帳A の所持',
    value: `${prefix}_disability_seishin_15`,
    points: 15,
  },
  { label: '要介護4または要介護5の認定', value: `${prefix}_disability_kaigo_15`, points: 15 },
  { label: '身体障害者手帳3級・4級の所持', value: `${prefix}_disability_shintai_13`, points: 13 },
  {
    label: '精神障害者保健福祉手帳3級、または療育手帳B の所持',
    value: `${prefix}_disability_seishin_13`,
    points: 13,
  },
  { label: '要介護1・2・3の認定', value: `${prefix}_disability_kaigo_13`, points: 13 },
  { label: '身体障害者手帳5級以下の所持', value: `${prefix}_disability_shintai_11`, points: 11 },
  { label: '要支援1または要支援2の認定', value: `${prefix}_disability_kaigo_11`, points: 11 },
];

/** 6 病人等の介護 */
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  {
    label: '同居親族の介護・看護：身体障害者手帳1級・2級を所持する者',
    value: `${prefix}_care_shintai_13`,
    points: 13,
  },
  {
    label: '同居親族の介護・看護：精神障害者保健福祉手帳1級・2級、または療育手帳A を所持する者',
    value: `${prefix}_care_seishin_13`,
    points: 13,
  },
  {
    label: '同居親族の介護・看護：要介護4または要介護5の認定を受けている者',
    value: `${prefix}_care_kaigo_13`,
    points: 13,
  },
  {
    label: '同居親族の介護・看護：身体障害者手帳3級・4級を所持する者',
    value: `${prefix}_care_shintai_11`,
    points: 11,
  },
  {
    label: '同居親族の介護・看護：精神障害者保健福祉手帳3級、または療育手帳B を所持する者',
    value: `${prefix}_care_seishin_11`,
    points: 11,
  },
  {
    label: '同居親族の介護・看護：要介護1・2・3の認定を受けている者',
    value: `${prefix}_care_kaigo_11`,
    points: 11,
  },
  {
    label: '同居親族の介護・看護：身体障害者手帳5級以下を所持する者',
    value: `${prefix}_care_shintai_9`,
    points: 9,
  },
  {
    label: '同居親族の介護・看護：要支援1または要支援2の認定を受けている者',
    value: `${prefix}_care_kaigo_9`,
    points: 9,
  },
  { label: '同居親族の施設への付添：週5日以上の常時付添', value: `${prefix}_care_tsukisoi_11`, points: 11 },
  {
    label: '同居親族の施設への付添：週3日以上5日未満の付添及び送迎',
    value: `${prefix}_care_tsukisoi_9`,
    points: 9,
  },
  {
    label: '同居親族の施設への付添：週3日未満の付添及び送迎',
    value: `${prefix}_care_tsukisoi_7`,
    points: 7,
  },
];

/** 7 災害復旧 */
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '災害により損傷した家屋等の復旧に当たっている', value: `${prefix}_disaster_15`, points: 15 },
];

/** 8 虐待又は配偶者からの暴力等 */
const abuseOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_abuse_none`, points: 0 },
  { label: '虐待または配偶者からの暴力等に該当する', value: `${prefix}_abuse_20`, points: 20 },
];

/** 9 妊娠又は出産 */
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '妊娠中、または出産後間がない', value: `${prefix}_childbirth_8`, points: 8 },
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
    label: `${parentLabel}：保育を必要とする事由`,
    helpText: 'いちばん近いものをひとつ選んでください',
    inputType: 'select',
    options: [
      { label: '居宅外労働（自営業・農業を含む）', value: `${prefix}_reason_employment`, points: 0 },
      { label: '内職', value: `${prefix}_reason_naishoku`, points: 0 },
      { label: '求職活動等', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '就学等', value: `${prefix}_reason_education`, points: 0 },
      { label: '疾病又は負傷', value: `${prefix}_reason_illness`, points: 0 },
      { label: '心身の障がい', value: `${prefix}_reason_disability`, points: 0 },
      { label: '病人等の介護', value: `${prefix}_reason_care`, points: 0 },
      { label: '災害復旧', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '虐待又は配偶者からの暴力等', value: `${prefix}_reason_abuse`, points: 0 },
      { label: '妊娠又は出産', value: `${prefix}_reason_childbirth`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}はどのくらい居宅外で働いていますか？`,
      helpText:
        '「1月」は、入所申込みに添付が必要とされる書類で確認された1月の平均勤務日数をもとに判断されます',
      inputType: 'radio',
      options: employmentOptions(prefix),
    },
    {
      id: `${prefix}_naishoku`,
      category,
      label: `${parentLabel}はどのくらい内職をしていますか？`,
      helpText: '居宅内で児童と離れて内職をすることを常態としている場合が対象です',
      inputType: 'radio',
      options: naishokuOptions(prefix),
    },
    {
      id: `${prefix}_jobseeking`,
      category,
      label: `${parentLabel}の求職活動の状況は？`,
      helpText: '起業の準備を含みます',
      inputType: 'radio',
      options: jobSeekingOptions(prefix),
    },
    {
      id: `${prefix}_education`,
      category,
      label: `${parentLabel}はどのくらい就学・職業訓練をしていますか？`,
      inputType: 'radio',
      options: educationOptions(prefix),
    },
    {
      id: `${prefix}_illness`,
      category,
      label: `${parentLabel}の疾病・負傷の状況は？`,
      inputType: 'radio',
      options: illnessOptions(prefix),
    },
    {
      id: `${prefix}_disability`,
      category,
      label: `${parentLabel}の心身の障がいの状況は？`,
      inputType: 'radio',
      options: disabilityOptions(prefix),
    },
    {
      id: `${prefix}_care`,
      category,
      label: `${parentLabel}が介護・看護、または付添をしている相手の状況は？`,
      inputType: 'radio',
      options: careOptions(prefix),
    },
    {
      id: `${prefix}_disaster`,
      category,
      label: `${parentLabel}は災害復旧に当たっていますか？`,
      inputType: 'radio',
      options: disasterOptions(prefix),
    },
    {
      id: `${prefix}_abuse`,
      category,
      label: `${parentLabel}は虐待または配偶者からの暴力等に該当しますか？`,
      inputType: 'radio',
      options: abuseOptions(prefix),
    },
    {
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}は妊娠中、または出産後間がないですか？`,
      inputType: 'radio',
      options: childbirthOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// ---------------------------------------------------------------------------
// 別表第2 調整指数（世帯・きょうだい・申込児童）の質問
// ---------------------------------------------------------------------------

/** 別表第1の5「疾病又は障がい」に準ずる選択肢（きょうだい・申込児童用） */
const referenceIllnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_none`, points: 0 },
  {
    label: '入院（おおむね1か月以上とし、入院予定を含む）、または入院以外の重篤な疾病',
    value: `${prefix}_15a`,
    points: 15,
  },
  { label: '身体障害者手帳1級・2級の所持', value: `${prefix}_15b`, points: 15 },
  {
    label: '精神障害者保健福祉手帳1級・2級、または療育手帳A の所持',
    value: `${prefix}_15c`,
    points: 15,
  },
  { label: '身体障害者手帳3級・4級の所持', value: `${prefix}_13a`, points: 13 },
  {
    label: '精神障害者保健福祉手帳3級、または療育手帳B の所持',
    value: `${prefix}_13b`,
    points: 13,
  },
  { label: '身体障害者手帳5級以下の所持', value: `${prefix}_11`, points: 11 },
  { label: '加療安静（入院以外の場合）', value: `${prefix}_6`, points: 6 },
  { label: '通院（週2回以上）', value: `${prefix}_4`, points: 4 },
  { label: '通院（週1回以上2回未満）', value: `${prefix}_3`, points: 3 },
  { label: '通院（週1回未満）', value: `${prefix}_1`, points: 1 },
];

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_household',
    category: 'adjustment',
    label: '世帯の状況は？',
    inputType: 'select',
    options: [
      { label: 'あてはまらない', value: 'adj_household_none', points: 0 },
      { label: '生活保護受給世帯', value: 'adj_household_welfare', points: 18 },
      { label: 'ひとり親家庭', value: 'adj_household_single', points: 17 },
    ],
  },
  {
    id: 'adj_grandparent',
    category: 'adjustment',
    label: '祖父母の状況は？',
    helpText: '「就労・疾病等により保育不可」は1人につき2点、4点を上限とします',
    inputType: 'select',
    options: [
      { label: '非同居', value: 'adj_grandparent_apart', points: 4 },
      {
        label: '同居しているが就労・疾病等により保育不可（1人）',
        value: 'adj_grandparent_unable_1',
        points: 2,
      },
      {
        label: '同居しているが就労・疾病等により保育不可（2人以上）',
        value: 'adj_grandparent_unable_2',
        points: 4,
      },
      { label: '同居しているが無職（65歳以上）', value: 'adj_grandparent_65over', points: 0 },
      { label: '同居しているが無職（65歳未満・1人）', value: 'adj_grandparent_under65_1', points: -1 },
      { label: '同居しているが無職（65歳未満・2人）', value: 'adj_grandparent_under65_2', points: -2 },
    ],
  },
  {
    id: 'adj_hoikushi',
    category: 'adjustment',
    label: '保育施設または学童保育所で就労していますか？',
    helpText: '就労予定を含みます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_hoikushi_no', points: 0 },
      { label: 'はい', value: 'adj_hoikushi_yes', points: 5 },
    ],
  },
  {
    id: 'adj_tanshin',
    category: 'adjustment',
    label: '単身赴任の保護者はいますか？',
    helpText: '1人につき3点です',
    inputType: 'select',
    options: [
      { label: 'いない', value: 'adj_tanshin_none', points: 0 },
      { label: '1人', value: 'adj_tanshin_1', points: 3 },
      { label: '2人', value: 'adj_tanshin_2', points: 6 },
    ],
  },
  {
    id: 'adj_midnight',
    category: 'adjustment',
    label: '勤務の終了時間が午前0時を超える勤務が週1回以上ある保護者はいますか？',
    helpText: '1人につき2点です',
    inputType: 'select',
    options: [
      { label: 'いない', value: 'adj_midnight_none', points: 0 },
      { label: '1人', value: 'adj_midnight_1', points: 2 },
      { label: '2人', value: 'adj_midnight_2', points: 4 },
    ],
  },
  {
    id: 'adj_sibling_enrolled',
    category: 'adjustment',
    label: 'きょうだいが在籍している保育所等の利用を希望しますか？',
    helpText: '入所日時点できょうだいが卒園または退園する予定の場合は除きます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_enrolled_no', points: 0 },
      { label: 'はい', value: 'adj_sibling_enrolled_yes', points: 5 },
    ],
  },
  {
    id: 'adj_sibling_illness',
    category: 'adjustment',
    label: 'きょうだいに疾病または障がいがありますか？',
    helpText: '別表第1の「5 疾病又は障がい」の規定に準じて指数が付きます',
    inputType: 'select',
    options: referenceIllnessOptions('adj_sibling_illness'),
  },
  {
    id: 'adj_sibling_count',
    category: 'adjustment',
    label: '世帯内に小学生以下のきょうだいは何人いますか？',
    helpText: '申込児童は除きます。1人につき2点です',
    inputType: 'select',
    options: [
      { label: 'いない', value: 'adj_sibling_count_0', points: 0 },
      { label: '1人', value: 'adj_sibling_count_1', points: 2 },
      { label: '2人', value: 'adj_sibling_count_2', points: 4 },
      { label: '3人以上', value: 'adj_sibling_count_3', points: 6 },
    ],
  },
  {
    id: 'adj_child_illness',
    category: 'adjustment',
    label: '申込児童に疾病または障がいがありますか？',
    helpText: '別表第1の「5 疾病又は障がい」の規定に準じて指数が付きます',
    inputType: 'select',
    options: referenceIllnessOptions('adj_child_illness'),
  },
  {
    id: 'adj_period_end',
    category: 'adjustment',
    label: '在籍している保育所等の保育期間が年度中に満了する見込みで、他の保育所等を希望しますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_period_end_no', points: 0 },
      { label: 'はい', value: 'adj_period_end_yes', points: 5 },
    ],
  },
  {
    id: 'adj_closure',
    category: 'adjustment',
    label: '保育所等の廃止により、他の保育所等の利用を希望しますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_closure_no', points: 0 },
      { label: 'はい', value: 'adj_closure_yes', points: 5 },
    ],
  },
];

// ---------------------------------------------------------------------------
// エクスポート
// ---------------------------------------------------------------------------

export const sakataData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
