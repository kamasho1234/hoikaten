import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 霧島市 保育施設利用調整基準表（基本点・加算）データ
//
// 出典: 霧島市子育て支援課「令和8年度 保育施設利用調整基準表」
//       https://www.city-kirishima.jp/jidou/hoikuen/documents/24riyoutyouseikijyunnhyou.pdf
//       （霧島市Webサイト「令和8年度教育・保育施設の利用申込み」
//         https://www.city-kirishima.jp/jidou/hoikuen/r8riyoumousikomi.html からリンク）
//
// 2026-08-19: 従来のデータは他自治体と同じ点数配列のテンプレート（推定値）だったため、
//             上記の公式基準表を読み取って全面的に置き換えた。
//
// 霧島市の就労は「一月当たりの勤務日数」と「一月当たりの勤務時間数」がそれぞれ独立した
// 項目として並んでおり、両方が加算される（合計で最大20点）。
//
// 質問に含めていない原典の項目:
//   ・「霧島市内の認可を受けた教育・保育施設（公立幼稚園を除く）に勤務する場合
//     （保育士・幼稚園教諭・看護師・調理師・栄養士）※新規申込のみ」は点数ではなく
//     利用調整の順位で「最優先」として扱われる
//   ・申込書で「希望する保育施設に入所できない場合は、育児休業の延長も検討しているため、
//     利用調整に当たり、合計指数が下がっても良い」を選択した場合、基本点及び加算は0になる
//   ・災害復旧に当たっている世帯、特別な支援を要する世帯（虐待等）は、点数によらず最優先
// ---------------------------------------------------------------------------

const municipality = {
  id: 'kirishima',
  name: '霧島市',
  slug: 'kirishima',
  prefecture: '鹿児島県',
  maxBasePoints: 40, // 父母各20点（就労は勤務日数10点＋勤務時間数10点）
} as const;

// ---------------------------------------------------------------------------
// 基本点。父母それぞれについて選ぶ
// ---------------------------------------------------------------------------

/** 就労：一月当たりの勤務日数 */
const workDaysOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_days_none`, points: 0 },
  { label: '月22日以上', value: `${prefix}_days_10`, points: 10 },
  { label: '月20日以上22日未満', value: `${prefix}_days_9`, points: 9 },
  { label: '月18日以上20日未満', value: `${prefix}_days_8`, points: 8 },
  { label: '月16日以上18日未満', value: `${prefix}_days_7`, points: 7 },
  { label: '月14日以上16日未満', value: `${prefix}_days_6`, points: 6 },
  { label: '月12日以上14日未満', value: `${prefix}_days_5`, points: 5 },
  { label: '月12日未満', value: `${prefix}_days_4`, points: 4 },
];

/** 就労：一月当たりの勤務時間数 */
const workHoursOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_hours_none`, points: 0 },
  { label: '月120時間以上', value: `${prefix}_hours_10`, points: 10 },
  { label: '月100時間以上120時間未満', value: `${prefix}_hours_9`, points: 9 },
  { label: '月80時間以上100時間未満', value: `${prefix}_hours_8`, points: 8 },
  { label: '月60時間以上80時間未満', value: `${prefix}_hours_7`, points: 7 },
  { label: '月48時間以上60時間未満', value: `${prefix}_hours_6`, points: 6 },
];

/** 就学 */
const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '就学している', value: `${prefix}_education_20`, points: 20 },
];

/** 求職中 */
const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職中', value: `${prefix}_jobseeking_7`, points: 7 },
];

/** 出産（公式の基準表では母親の欄のみに指数がある） */
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '産前2か月及び産後2か月の期間', value: `${prefix}_childbirth_20`, points: 20 },
];

/** 疾病 */
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '疾病により保育ができない', value: `${prefix}_illness_20`, points: 20 },
];

/** 障がい */
const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '身体障害者手帳等1・2級、療育手帳A1・A2', value: `${prefix}_disability_20`, points: 20 },
  { label: '身体障害者手帳等3級以下、療育手帳B1・B2', value: `${prefix}_disability_16`, points: 16 },
];

/** 病人の看護等 */
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '入院付添', value: `${prefix}_care_20`, points: 20 },
  { label: '心身障がい者・児の在宅介護', value: `${prefix}_care_16a`, points: 16 },
  { label: '老人の在宅介護（寝たきり・認知症）', value: `${prefix}_care_16b`, points: 16 },
  { label: '一般療養の在宅介護', value: `${prefix}_care_12`, points: 12 },
  { label: '通院付添い（月10日以上）', value: `${prefix}_care_8`, points: 8 },
];

/** 家庭の災害 */
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '家庭の災害により保育ができない', value: `${prefix}_disaster_20`, points: 20 },
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
      { label: '仕事をしている', value: `${prefix}_reason_employment`, points: 0 },
      { label: '就学している', value: `${prefix}_reason_education`, points: 0 },
      { label: '仕事を探している', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '出産の前後', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '病気の治療中', value: `${prefix}_reason_illness`, points: 0 },
      { label: '障がいがある', value: `${prefix}_reason_disability`, points: 0 },
      { label: '病人の看護・介護をしている', value: `${prefix}_reason_care`, points: 0 },
      { label: '家庭が災害にあった', value: `${prefix}_reason_disaster`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の一月当たりの勤務日数は？`,
      helpText: '霧島市では勤務日数と勤務時間数の両方が加算されます',
      inputType: 'radio',
      options: workDaysOptions(prefix),
    },
    {
      id: `${prefix}_workhours`,
      category,
      // 「仕事をしている」を選んだときだけ表示する（勤務日数とは別に加算される項目）
      showFor: ['employment'],
      label: `${parentLabel}の一月当たりの勤務時間数は？`,
      inputType: 'radio',
      options: workHoursOptions(prefix),
    },
    {
      id: `${prefix}_education`,
      category,
      label: `${parentLabel}は就学していますか？`,
      inputType: 'radio',
      options: educationOptions(prefix),
    },
    {
      id: `${prefix}_jobseeking`,
      category,
      label: `${parentLabel}は求職中ですか？`,
      inputType: 'radio',
      options: jobSeekingOptions(prefix),
    },
    {
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}の出産の状況は？`,
      helpText: '公式の基準表では母親の欄のみに指数があります',
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
      label: `${parentLabel}の障がいの程度は？`,
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
      label: `${parentLabel}の家庭は災害にあいましたか？`,
      inputType: 'radio',
      options: disasterOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// ---------------------------------------------------------------------------
// 加算
// ---------------------------------------------------------------------------

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親世帯ですか？',
    helpText: '死亡・離別・未婚・行方不明・拘禁・その他を含みます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい', value: 'adj_single_parent_yes', points: 25 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯ですか？',
    helpText: '新規申込のみが対象です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい', value: 'adj_welfare_yes', points: 10 },
    ],
  },
  {
    id: 'adj_layoff',
    category: 'adjustment',
    label: '生計中心者が解雇等により失業していますか？',
    helpText: '就労の必要性が高い場合が対象です。自己都合退職は除きます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_layoff_no', points: 0 },
      { label: 'はい', value: 'adj_layoff_yes', points: 3 },
    ],
  },
  {
    id: 'adj_dv',
    category: 'adjustment',
    label: 'DV支援措置対象者等ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_dv_no', points: 0 },
      { label: 'はい', value: 'adj_dv_yes', points: 20 },
    ],
  },
  {
    id: 'adj_child_disability',
    category: 'adjustment',
    label: '申込児童は障がい児等にあたりますか？',
    helpText: '手帳または特別児童扶養手当に該当する児童が対象です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_child_disability_no', points: 0 },
      { label: 'はい', value: 'adj_child_disability_yes', points: 2 },
    ],
  },
  {
    id: 'adj_leave_return',
    category: 'adjustment',
    label: '育休明け・産休明けで職場復帰しますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_leave_return_no', points: 0 },
      { label: 'はい', value: 'adj_leave_return_yes', points: 5 },
    ],
  },
  {
    id: 'adj_sibling_enrolled',
    category: 'adjustment',
    label: 'きょうだいが入所（転所）希望の保育施設に入所中ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_enrolled_no', points: 0 },
      { label: 'はい', value: 'adj_sibling_enrolled_yes', points: 15 },
    ],
  },
  {
    id: 'adj_shokibo_grad',
    category: 'adjustment',
    label: '小規模保育事業などの卒園児童で、連携施設以外の保育施設を希望しますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_shokibo_grad_no', points: 0 },
      { label: 'はい', value: 'adj_shokibo_grad_yes', points: 2 },
    ],
  },
  {
    id: 'adj_foster',
    category: 'adjustment',
    label: '里親世帯ですか？',
    helpText: '申請児童が里子の場合のみ対象です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_foster_no', points: 0 },
      { label: 'はい', value: 'adj_foster_yes', points: 5 },
    ],
  },
  {
    id: 'adj_immigration',
    category: 'adjustment',
    label: '市の施策に基づく定住移住者の世帯ですか？',
    helpText: '助成決定の通知の写しの提出がある場合が対象です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_immigration_no', points: 0 },
      { label: 'はい', value: 'adj_immigration_yes', points: 5 },
    ],
  },
  {
    id: 'adj_recovery_return',
    category: 'adjustment',
    label: '病気療養等により職場復帰しますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_recovery_return_no', points: 0 },
      { label: 'はい', value: 'adj_recovery_return_yes', points: 5 },
    ],
  },
  {
    id: 'adj_tanshin',
    category: 'adjustment',
    label: '単身赴任等により片親が常時自宅にいませんか？',
    helpText: '住民票上の別住所である場合、または就労証明書等で単身赴任が確認できる場合が対象です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_tanshin_no', points: 0 },
      { label: 'はい', value: 'adj_tanshin_yes', points: 2 },
    ],
  },
  {
    id: 'adj_sibling_same',
    category: 'adjustment',
    label: 'きょうだいについて同一の保育施設の利用調整を行いますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_same_no', points: 0 },
      { label: 'はい', value: 'adj_sibling_same_yes', points: 2 },
    ],
  },
  {
    id: 'adj_waiting',
    category: 'adjustment',
    label: '前年度の10月末までに申し込みがあり、待機児童ですか？',
    helpText:
      '前年度の入所希望月に応じて加算されます。認可保育施設に既に入所している場合の転所希望は含みません',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_waiting_no', points: 0 },
      { label: '前年度の入所希望月が4月', value: 'adj_waiting_5', points: 5 },
      { label: '前年度の入所希望月が5〜6月', value: 'adj_waiting_4', points: 4 },
      { label: '前年度の入所希望月が7〜8月', value: 'adj_waiting_3', points: 3 },
      { label: '前年度の入所希望月が9〜10月', value: 'adj_waiting_2', points: 2 },
      { label: '前年度の入所希望月が11月以降', value: 'adj_waiting_1', points: 1 },
    ],
  },
];

export const kirishimaData: MunicipalityData = {
  municipality,
  questions: [...buildParentQuestions(1), ...buildParentQuestions(2), ...adjustmentQuestions],
};
