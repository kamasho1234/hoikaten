import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 尾張旭市 教育・保育施設及び地域型保育事業に係る利用調整基準
//
// 出典: 尾張旭市保育課「尾張旭市教育・保育施設及び地域型保育事業に係る利用調整基準」
//       https://www.city.owariasahi.lg.jp/uploaded/attachment/35434.pdf
//       （令和8年度保育所・小規模保育事業所利用申込のページ
//         https://www.city.owariasahi.lg.jp/site/kosodate-sukusuku/46507.html
//         2026年1月15日更新 からリンクされている単独PDF）
//
// 2026-08-31: 従来のデータは他自治体と同じ点数配列のテンプレート（推定値）だったため、
// 上記の公式指数表を読み取って全面的に置き換えた。
// 2026-08-19 の一斉置き換えでは市サイトを取得できず failed にしていたが、今回は取得できた。
// なお指数表PDFは1ページの横向き文書で、テキスト抽出すると行が左右反転して出るため、
// 400dpiで画像化して読み取った。
// 「令和7年度 保育所・小規模保育事業所の利用のご案内」（30104.pdf）P.13 の同じ表とも
// 突き合わせたが、点数は完全に一致していた（相違は優先利用8に※4が付いた点のみ）。
//
// ## 計算方式
// 合計 ＝ 利用調整基準指数 ＋ 優先利用 ＋ 指数調整
// 利用調整基準指数は父・母それぞれに付き、世帯の合計指数で調整する（加算方式）。
// 父母各最大10点なので maxBasePoints は 20。
//
// 原典の前書き:
//  1 保護者の状況が、下記基準において調整後の合計指数の高い児童
//  2 合計指数が同じ場合は、順位表による
//  3 順位表が同じ場合は、抽選による
//
// ## 利用調整基準指数（父／母）
// 就労
//   外勤 … 月実働140時間以上 8／120時間以上140時間未満 7／80時間以上120時間未満 6／
//          64時間以上80時間未満 5
//   自営業（経営者）… 140時間以上 8／120〜140 7／80〜120 6／64〜80 5
//   自営業（補助者）… 140時間以上 7／120〜140 6／80〜120 5／64〜80 4
//   内職 … 月実働160時間以上 6／80時間以上160時間未満 5／64時間以上80時間未満 4
// 出産 … 出産（前後各8週間） 父ー／母8
// 病気等
//   入院 … 精神性、伝染性、心臓、ガン等の疾患（入院）10／
//          上記以外の疾病の入院、一般療養（退院後）8
//   通院 … 精神性の疾患 8／16日以上／月 7／10日以上／月及び病気等による自宅療養 5
//   知的障害者・身体障害者 … 身体障害者手帳1〜2級所持者・療育手帳（A判定）所持者 8／
//          身体障害者手帳3〜4級所持者・療育手帳（B判定）所持者 6／
//          身体障害者手帳5〜6級所持者・療育手帳（C判定）所持者 4
// 病人介護
//   自宅外介護等 … 月実働180時間以上（8時間以上／日、20日以上／月）8／
//          月実働96時間以上180時間未満（6時間以上／日、16日以上／月）7／
//          月実働64時間以上96時間未満（4時間以上／日、16日以上／月）5
//          ※診断書に記載がある場合に限ります。
//   自宅介護（寝たきり）… 寝たきり者を常時介護している場合 8／
//          心身障害児（者）の介護、通院、通学等にあたっている場合 8
//   自宅介護（寝たきり以外）… 月実働80時間以上 6／月実働64時間以上80時間未満 5
// 災害復旧 … 家庭の災害 9
// 求職活動等 … 起業の準備等を含む 1
// 就学 … 月実働64時間以上（4時間以上／日、16日以上／月）4
// ひとり親 … 父親又は母親がいない（死亡、離婚、行方不明等）10
//
// ## 優先利用（項目点）
// 1 ひとり親世帯 5
// 2 生活保護世帯（就労による自立支援につながる場合等）5
// 3 保護者のいずれかが、尾張旭市の認可保育所で保育士として従事する場合 1
// 4 虐待やDVのおそれがあることに該当する場合など、社会的養護が必要な場合 別途判断
// 5 子どもが障害を有する場合 別途判断
// 6 育児休業明け … 特定教育・保育施設、地域型保育事業を利用していたが、保護者が育児休業を
//   取得し、自主的に退所し、育児休業明けに当該施設利用を再度希望する保護者 5／
//   現に保護者が当該児童について育児休業を取得しており、入所希望日までの間に
//   当該児童の年齢が1歳6ヶ月以上になる保護者 1
// 7 兄弟姉妹（多胎児を含む）が同一の保育所等の利用を希望する場合 1.5／
//   兄姉と同一の保育所等の利用を希望したいが0歳児クラスがないため
//   別の保育所を希望する場合 1.5
// 8 申込時に認可外保育施設等に児童を預けている場合（在園証明書必要）※4 1
// 9 連携施設が設定されていない地域型保育事業の卒園児童 5
//
// ## 指数調整（項目点）
// 就労実績（※1）… 申込時に就労実績（直近3か月分のうち3か月分）が就労証明等で
//   確認できない者 マイナス2／（直近3か月分のうち2か月分）が確認できない者 マイナス1
// 祖父母同居（※2）… 65歳未満で未就労の祖父母との同居 マイナス3／
//   65歳未満で就労の祖父母との同居 マイナス2
// 申込時に保育料を滞納している世帯（※3）マイナス3
// ※1 《優先利用》中の1から6までのいずれかに該当する場合は、指数調整を適用しないものとする。
// ※1 当該指数調整を解除する場合には、就労実績の記載がある就労証明等で再度確認する必要がある。
// ※2 同居の親族の健康状態や就労状況等によっては、指数調整を適用しないものとする。
// ※2 《優先利用》中の1から5までのいずれかに該当する場合は、指数調整を適用しないものとする。
// ※3 失業・罹災等やむを得ない事由による場合や、返済が進んでいる場合には
//     項目点を「0〜マイナス3」の間で調整することとする。
// ※4 育児休業中・就労予定・求職中の方を除く。
//
// ## 合計が同一指数の場合の順位表（※下記によっても決まらない場合は抽選とする）
// 1 ひとり親世帯（祖父母同居なし）／2 ひとり親世帯（祖父母同居あり）／3 生活保護世帯／
// 4 連携施設が設定されていない地域型保育事業の卒園児童／5 育休明け／
// 6 兄弟姉妹（多胎児を含む）が同一の保育所等の利用を希望する場合／
// 7 申込時に認可外保育施設等に児童を預けており、保育所等へ入所できない場合同様の状態が
//   見込まれる者／8 多子世帯（18歳未満の子が3人以上いる場合）／
// 9 尾張旭市の認可保育所で保育士として勤務している又は勤務予定の保護者の子どもが
//   保育所等の利用を希望する場合／10 利用調整基準指数が高い場合／
// 11 保護者の状況が「災害復旧」→「病気等」→「就労」→「出産」→「病人介護」の順で調整／
// 12 当該施設の希望順位が高い場合
//
// ## 質問に入れなかった規定
// - 優先利用4「虐待やDVのおそれがあることに該当する場合など、社会的養護が必要な場合」と
//   5「子どもが障害を有する場合」は原典が「別途判断」で点数が定まらないため入れていない
// - 順位表は同点時のタイブレークであり指数ではないため入れていない
// ---------------------------------------------------------------------------

const municipality = {
  id: 'owariasahi',
  name: '尾張旭市',
  slug: 'owariasahi',
  prefecture: '愛知県',
  maxBasePoints: 20, // 父母各10点
} as const;

// ---------------------------------------------------------------------------
// 利用調整基準指数の選択肢（父母各最大10点）
// ---------------------------------------------------------------------------

/** 就労（外勤・自営業・内職） */
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '外勤：月実働140時間以上', value: `${prefix}_employment_gaikin_8`, points: 8 },
  { label: '外勤：月実働120時間以上140時間未満', value: `${prefix}_employment_gaikin_7`, points: 7 },
  { label: '外勤：月実働80時間以上120時間未満', value: `${prefix}_employment_gaikin_6`, points: 6 },
  { label: '外勤：月実働64時間以上80時間未満', value: `${prefix}_employment_gaikin_5`, points: 5 },
  { label: '自営業（経営者）：月実働140時間以上', value: `${prefix}_employment_owner_8`, points: 8 },
  { label: '自営業（経営者）：月実働120時間以上140時間未満', value: `${prefix}_employment_owner_7`, points: 7 },
  { label: '自営業（経営者）：月実働80時間以上120時間未満', value: `${prefix}_employment_owner_6`, points: 6 },
  { label: '自営業（経営者）：月実働64時間以上80時間未満', value: `${prefix}_employment_owner_5`, points: 5 },
  { label: '自営業（補助者）：月実働140時間以上', value: `${prefix}_employment_helper_7`, points: 7 },
  { label: '自営業（補助者）：月実働120時間以上140時間未満', value: `${prefix}_employment_helper_6`, points: 6 },
  { label: '自営業（補助者）：月実働80時間以上120時間未満', value: `${prefix}_employment_helper_5`, points: 5 },
  { label: '自営業（補助者）：月実働64時間以上80時間未満', value: `${prefix}_employment_helper_4`, points: 4 },
  { label: '内職：月実働160時間以上', value: `${prefix}_employment_naishoku_6`, points: 6 },
  { label: '内職：月実働80時間以上160時間未満', value: `${prefix}_employment_naishoku_5`, points: 5 },
  { label: '内職：月実働64時間以上80時間未満', value: `${prefix}_employment_naishoku_4`, points: 4 },
];

/** 出産（前後各8週間） */
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産（前後各8週間）', value: `${prefix}_childbirth_8`, points: 8 },
];

/** 病気等（入院・通院） */
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院：精神性、伝染性、心臓、ガン等の疾患', value: `${prefix}_illness_10`, points: 10 },
  { label: '入院：上記以外の疾病の入院、一般療養（退院後）', value: `${prefix}_illness_8`, points: 8 },
  { label: '通院：精神性の疾患', value: `${prefix}_illness_mental_8`, points: 8 },
  { label: '通院：16日以上／月', value: `${prefix}_illness_7`, points: 7 },
  { label: '通院：10日以上／月及び病気等による自宅療養', value: `${prefix}_illness_5`, points: 5 },
];

/** 病気等（知的障害者・身体障害者） */
const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '身体障害者手帳1〜2級所持者／療育手帳（A判定）所持者', value: `${prefix}_disability_8`, points: 8 },
  { label: '身体障害者手帳3〜4級所持者／療育手帳（B判定）所持者', value: `${prefix}_disability_6`, points: 6 },
  { label: '身体障害者手帳5〜6級所持者／療育手帳（C判定）所持者', value: `${prefix}_disability_4`, points: 4 },
];

/** 病人介護（自宅外介護等・自宅介護） */
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  {
    label: '自宅外介護等：月実働180時間以上（8時間以上／日、20日以上／月）',
    value: `${prefix}_care_out_8`,
    points: 8,
  },
  {
    label: '自宅外介護等：月実働96時間以上180時間未満（6時間以上／日、16日以上／月）',
    value: `${prefix}_care_out_7`,
    points: 7,
  },
  {
    label: '自宅外介護等：月実働64時間以上96時間未満（4時間以上／日、16日以上／月）',
    value: `${prefix}_care_out_5`,
    points: 5,
  },
  { label: '自宅介護：寝たきり者を常時介護している', value: `${prefix}_care_home_bed_8`, points: 8 },
  {
    label: '自宅介護：心身障害児（者）の介護、通院、通学等にあたっている',
    value: `${prefix}_care_home_disability_8`,
    points: 8,
  },
  { label: '自宅介護（寝たきり以外）：月実働80時間以上', value: `${prefix}_care_home_6`, points: 6 },
  { label: '自宅介護（寝たきり以外）：月実働64時間以上80時間未満', value: `${prefix}_care_home_5`, points: 5 },
];

/** 災害復旧 */
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '家庭の災害', value: `${prefix}_disaster_9`, points: 9 },
];

/** 求職活動等 */
const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動等（起業の準備等を含む）', value: `${prefix}_jobseeking_1`, points: 1 },
];

/** 就学 */
const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  {
    label: '月実働64時間以上（4時間以上／日、16日以上／月）',
    value: `${prefix}_education_4`,
    points: 4,
  },
];

/** ひとり親 */
const absentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_absent_none`, points: 0 },
  {
    label: '父親又は母親がいない（死亡、離婚、行方不明等）',
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
    label: `${parentLabel}：保育が必要な理由`,
    helpText: 'いちばん近いものをひとつ選んでください',
    inputType: 'select',
    options: [
      { label: '仕事をしている', value: `${prefix}_reason_employment`, points: 0 },
      { label: '出産（前後各8週間）', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '病気の治療中（入院・通院）', value: `${prefix}_reason_illness`, points: 0 },
      { label: '障害者手帳・療育手帳を持っている', value: `${prefix}_reason_disability`, points: 0 },
      { label: '病人の介護をしている', value: `${prefix}_reason_care`, points: 0 },
      { label: '災害復旧にあたっている', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '仕事を探している・起業を準備している', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '学校に通っている', value: `${prefix}_reason_education`, points: 0 },
      { label: 'この保護者はいない（死亡・離婚・行方不明等）', value: `${prefix}_reason_absent`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}はどのように働いていますか？`,
      helpText: '働き方と月あたりの実働時間を選んでください',
      inputType: 'radio',
      options: employmentOptions(prefix),
    },
    {
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}は出産の前後ですか？`,
      helpText: '基準指数がつくのは母のみです（原典の父の欄は「ー」）',
      inputType: 'radio',
      options: childbirthOptions(prefix),
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
      inputType: 'radio',
      options: disabilityOptions(prefix),
    },
    {
      id: `${prefix}_care`,
      category,
      label: `${parentLabel}はどのように病人を介護していますか？`,
      helpText: '自宅外介護等は診断書に記載がある場合に限ります',
      inputType: 'radio',
      options: careOptions(prefix),
    },
    {
      id: `${prefix}_disaster`,
      category,
      label: `${parentLabel}は家庭の災害復旧にあたっていますか？`,
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
      label: `${parentLabel}はどのくらい通学していますか？`,
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
    // --- 指数調整（就労実績。保護者ごとに就労証明で確認する項目） ---
    {
      id: `${prefix}_adj_work_record`,
      category,
      showFor: ['employment'],
      label: `${parentLabel}の就労実績は就労証明等で確認できますか？`,
      helpText: '優先利用の1から6までのいずれかに該当する場合は、この指数調整は適用されません',
      inputType: 'select',
      options: [
        { label: '直近3か月分すべて確認できる', value: `${prefix}_adj_work_record_none`, points: 0 },
        {
          label: '直近3か月分のうち2か月分が確認できない',
          value: `${prefix}_adj_work_record_minus1`,
          points: -1,
        },
        {
          label: '直近3か月分のうち3か月分が確認できない',
          value: `${prefix}_adj_work_record_minus2`,
          points: -2,
        },
      ],
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// ---------------------------------------------------------------------------
// 優先利用・指数調整（世帯単位）の質問
// ---------------------------------------------------------------------------

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい', value: 'adj_single_parent_yes', points: 5 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯ですか？',
    helpText: '就労による自立支援につながる場合等',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい', value: 'adj_welfare_yes', points: 5 },
    ],
  },
  {
    id: 'adj_hoikushi',
    category: 'adjustment',
    label: '保護者のいずれかが、尾張旭市の認可保育所で保育士として従事していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_hoikushi_no', points: 0 },
      { label: 'はい', value: 'adj_hoikushi_yes', points: 1 },
    ],
  },
  {
    id: 'adj_ikukyu',
    category: 'adjustment',
    label: '育児休業明けの申込みですか？',
    inputType: 'select',
    options: [
      { label: 'あてはまらない', value: 'adj_ikukyu_none', points: 0 },
      {
        label: '施設を利用していたが育児休業の取得で自主的に退所し、育休明けに当該施設の利用を再度希望する',
        value: 'adj_ikukyu_5',
        points: 5,
      },
      {
        label: '現に育児休業を取得中で、入所希望日までに当該児童が1歳6ヶ月以上になる',
        value: 'adj_ikukyu_1',
        points: 1,
      },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: 'きょうだいと同じ保育所等を希望していますか？',
    inputType: 'select',
    options: [
      { label: 'あてはまらない', value: 'adj_sibling_none', points: 0 },
      {
        label: '兄弟姉妹（多胎児を含む）が同一の保育所等の利用を希望する',
        value: 'adj_sibling_same',
        points: 1.5,
      },
      {
        label: '兄姉と同一の保育所等を希望したいが、0歳児クラスがないため別の保育所を希望する',
        value: 'adj_sibling_no_zero_class',
        points: 1.5,
      },
    ],
  },
  {
    id: 'adj_unlicensed',
    category: 'adjustment',
    label: '申込時に認可外保育施設等に児童を預けていますか？',
    helpText: '在園証明書が必要です。育児休業中・就労予定・求職中の方は除きます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unlicensed_no', points: 0 },
      { label: 'はい', value: 'adj_unlicensed_yes', points: 1 },
    ],
  },
  {
    id: 'adj_renkei',
    category: 'adjustment',
    label: '連携施設が設定されていない地域型保育事業の卒園児童ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_renkei_no', points: 0 },
      { label: 'はい', value: 'adj_renkei_yes', points: 5 },
    ],
  },
  {
    id: 'adj_grandparent',
    category: 'adjustment',
    label: '65歳未満の祖父母と同居していますか？',
    helpText:
      '同居の親族の健康状態や就労状況等によっては適用されません。優先利用の1から5までのいずれかに該当する場合も適用されません',
    inputType: 'select',
    options: [
      { label: 'いいえ（同居していない、または65歳以上）', value: 'adj_grandparent_no', points: 0 },
      { label: '65歳未満で就労している祖父母と同居', value: 'adj_grandparent_working', points: -2 },
      { label: '65歳未満で未就労の祖父母と同居', value: 'adj_grandparent_not_working', points: -3 },
    ],
  },
  {
    id: 'adj_unpaid_fee',
    category: 'adjustment',
    label: '申込時に保育料を滞納していますか？',
    helpText:
      '失業・罹災等やむを得ない事由による場合や、返済が進んでいる場合には「0〜マイナス3」の間で調整されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unpaid_fee_no', points: 0 },
      { label: 'はい', value: 'adj_unpaid_fee_yes', points: -3 },
    ],
  },
];

// ---------------------------------------------------------------------------
// エクスポート
// ---------------------------------------------------------------------------

export const owariasahiData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
