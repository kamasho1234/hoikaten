import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 名取市 利用調整における優先基準（基準指数・調整指数）データ
//
// 出典: 名取市健康福祉部こども支援課「令和8年度 保育施設入所のしおり」P9-P10
//       「利用調整における優先基準（入所指数）について」
//       https://www.city.natori.miyagi.jp/uploaded/attachment/21472.pdf
//       （名取市Webサイト「令和8年度 保育所・認定こども園・幼稚園の利用手続きについて」
//         https://www.city.natori.miyagi.jp/site/kosodate/34918.html からリンク）
//
// 2026-08-19: 従来のデータは他自治体と同じ点数配列のテンプレート（推定値）だったため、
//             上記の公式基準を読み取って全面的に置き換えた。
//
// 原典の注記:
//   「入所指数（＝基準指数（父）＋基準指数（母）＋調整指数）により、点数の高い世帯から順に
//     入所を決定します。なお、同点の場合は、保護者の市民税所得割額が低い世帯を優先します」
//   「就業規則に基づく就労時間で算定する（育児短時間勤務を取得していても影響はない。また、
//     就労時間には、休憩時間を含み、残業・通勤時間は含まない）」
//   疾病の一部・施設付添・就学は「就労に準ずる」指数となる。
//
// 質問に含めていない原典の項目:
//   ・その他「前各項目に掲げるもののほか、明らかに保育が必要な場合」4〜20点（幅があるため）
// ---------------------------------------------------------------------------

const municipality = {
  id: 'natori',
  name: '名取市',
  slug: 'natori',
  prefecture: '宮城県',
  maxBasePoints: 40, // 父母各20点
} as const;

// ---------------------------------------------------------------------------
// （1）基準指数（保護者の状況）。父母それぞれ20点を上限として計算する
// ---------------------------------------------------------------------------

/** 1 就労 */
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月170時間以上', value: `${prefix}_employment_20`, points: 20 },
  { label: '月160時間以上170時間未満', value: `${prefix}_employment_19`, points: 19 },
  { label: '月150時間以上160時間未満', value: `${prefix}_employment_18`, points: 18 },
  { label: '月140時間以上150時間未満', value: `${prefix}_employment_17`, points: 17 },
  { label: '月130時間以上140時間未満', value: `${prefix}_employment_16`, points: 16 },
  { label: '月120時間以上130時間未満', value: `${prefix}_employment_15`, points: 15 },
  { label: '月110時間以上120時間未満', value: `${prefix}_employment_14`, points: 14 },
  { label: '月100時間以上110時間未満', value: `${prefix}_employment_13`, points: 13 },
  { label: '月90時間以上100時間未満', value: `${prefix}_employment_12`, points: 12 },
  { label: '月80時間以上90時間未満', value: `${prefix}_employment_11`, points: 11 },
  { label: '月64時間以上80時間未満', value: `${prefix}_employment_10`, points: 10 },
];

/** 2 妊娠・出産 */
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  {
    label: '入院等が必要な妊娠、または出産日の前後8週間',
    value: `${prefix}_childbirth_18`,
    points: 18,
  },
];

/** 3 保護者の疾病・障害 */
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  {
    label: '疾病：入院中、または入院相当の治療・常時安静を要する自宅療養で常に病臥している',
    value: `${prefix}_illness_20`,
    points: 20,
  },
  {
    label: '疾病：精神性疾患、感染症、特殊疾病にり患し、医師の診断により保育が困難',
    value: `${prefix}_illness_18`,
    points: 18,
  },
  {
    label: '疾病：医師の診断により通院加療を要し、保育に支障がある（就労に準ずる／月170時間以上相当）',
    value: `${prefix}_illness_visit_20`,
    points: 20,
  },
  {
    label: '疾病：医師の診断により通院加療を要し、保育に支障がある（就労に準ずる／月120時間以上相当）',
    value: `${prefix}_illness_visit_15`,
    points: 15,
  },
  {
    label: '疾病：医師の診断により通院加療を要し、保育に支障がある（就労に準ずる／月64時間以上相当）',
    value: `${prefix}_illness_visit_10`,
    points: 10,
  },
  {
    label: '障害：介助を要する（身体1・2級、精神1級、療育A、要介護3〜5相当）',
    value: `${prefix}_illness_disability_20`,
    points: 20,
  },
  {
    label: '障害：保育に支障がある（身体3級、精神2級、療育B、要介護1〜2相当）',
    value: `${prefix}_illness_disability_16`,
    points: 16,
  },
  { label: '障害：上記以外', value: `${prefix}_illness_disability_10`, points: 10 },
];

/** 4 同居親族の介護・看護 */
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  {
    label: '自宅：常時観察、介護・看護が必要（身体1・2級、精神1級、療育A、要介護3〜5相当）',
    value: `${prefix}_care_20`,
    points: 20,
  },
  {
    label: '自宅：日常生活全般において恒常的な介護・看護が必要（身体3級、精神2級、療育B、要介護1〜2程度相当）',
    value: `${prefix}_care_16`,
    points: 16,
  },
  { label: '自宅：上記以外', value: `${prefix}_care_10`, points: 10 },
  {
    label: '施設付添：通院、施設通所、入院の付添等（就労に準ずる／月170時間以上相当）',
    value: `${prefix}_care_out_20`,
    points: 20,
  },
  {
    label: '施設付添：通院、施設通所、入院の付添等（就労に準ずる／月120時間以上相当）',
    value: `${prefix}_care_out_15`,
    points: 15,
  },
  {
    label: '施設付添：通院、施設通所、入院の付添等（就労に準ずる／月64時間以上相当）',
    value: `${prefix}_care_out_10`,
    points: 10,
  },
];

/** 5 災害等 */
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '震災、風水害、火災その他の災害の復旧にあたっている', value: `${prefix}_disaster_20`, points: 20 },
];

/** 6 求職 */
const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動（起業の準備を含む）を継続的に行っている', value: `${prefix}_jobseeking_5`, points: 5 },
];

/** 7 就学（就労に準ずる） */
const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '月170時間以上に相当する就学・職業訓練', value: `${prefix}_education_20`, points: 20 },
  { label: '月150時間以上170時間未満に相当する就学・職業訓練', value: `${prefix}_education_18`, points: 18 },
  { label: '月120時間以上150時間未満に相当する就学・職業訓練', value: `${prefix}_education_15`, points: 15 },
  { label: '月90時間以上120時間未満に相当する就学・職業訓練', value: `${prefix}_education_12`, points: 12 },
  { label: '月64時間以上90時間未満に相当する就学・職業訓練', value: `${prefix}_education_10`, points: 10 },
];

/** 8 虐待・DV */
const abuseOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_abuse_none`, points: 0 },
  { label: '虐待やDVのおそれがある', value: `${prefix}_abuse_20`, points: 20 },
];

/** 9 不存在等 */
const absenceOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_absence_none`, points: 0 },
  {
    label: '死亡、離婚、行方不明、拘禁、離婚を前提とした別居等',
    value: `${prefix}_absence_20`,
    points: 20,
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
    helpText: '父母それぞれ20点を上限として計算されます',
    inputType: 'select',
    options: [
      { label: '就労', value: `${prefix}_reason_employment`, points: 0 },
      { label: '妊娠・出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '保護者の疾病・障害', value: `${prefix}_reason_illness`, points: 0 },
      { label: '同居親族の介護・看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '災害等', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '求職', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '就学', value: `${prefix}_reason_education`, points: 0 },
      { label: '虐待・DV', value: `${prefix}_reason_abuse`, points: 0 },
      { label: '不存在等', value: `${prefix}_reason_absence`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の就労時間は？`,
      helpText:
        '就業規則に基づく就労時間で算定します（育児短時間勤務を取得していても影響はありません）。就労時間には休憩時間を含み、残業・通勤時間は含みません',
      inputType: 'radio',
      options: employmentOptions(prefix),
    },
    {
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}の妊娠・出産の状況は？`,
      helpText: '産後は8週間を経過する日の翌日が属する月の末日までが対象です',
      inputType: 'radio',
      options: childbirthOptions(prefix),
    },
    {
      id: `${prefix}_illness`,
      category,
      label: `${parentLabel}の疾病・障害の状況は？`,
      helpText: '通院加療の場合は、保育に支障がある時間をもとに就労の指数が準用されます',
      inputType: 'radio',
      options: illnessOptions(prefix),
    },
    {
      id: `${prefix}_care`,
      category,
      label: `${parentLabel}の介護・看護の状況は？`,
      helpText: '同居親族には長期間入院等をしている親族を含みます。施設付添は就労の指数が準用されます',
      inputType: 'radio',
      options: careOptions(prefix),
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
      label: `${parentLabel}は求職活動をしていますか？`,
      inputType: 'radio',
      options: jobSeekingOptions(prefix),
    },
    {
      id: `${prefix}_education`,
      category,
      label: `${parentLabel}の就学の状況は？`,
      helpText: '学校等に在学、または職業訓練校等における職業訓練を受けている場合が対象で、就労の指数が準用されます',
      inputType: 'radio',
      options: educationOptions(prefix),
    },
    {
      id: `${prefix}_abuse`,
      category,
      label: `${parentLabel}は虐待・DVのおそれにあてはまりますか？`,
      inputType: 'radio',
      options: abuseOptions(prefix),
    },
    {
      id: `${prefix}_absence`,
      category,
      label: `${parentLabel}は不存在等の状態ですか？`,
      helpText: '公的な証明書が必須です',
      inputType: 'radio',
      options: absenceOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// ---------------------------------------------------------------------------
// （2）調整指数
// ---------------------------------------------------------------------------

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親家庭ですか？',
    helpText: '母子家庭、父子家庭、またはそれに類する場合が対象です',
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
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい', value: 'adj_welfare_yes', points: 5 },
    ],
  },
  {
    id: 'adj_layoff',
    category: 'adjustment',
    label: '主たる生計維持者が自己の責めによらない離職により求職活動中ですか？',
    helpText: '申請日が離職日の属する月の翌月から3か月以内である場合に限ります',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_layoff_no', points: 0 },
      { label: 'はい', value: 'adj_layoff_yes', points: 5 },
    ],
  },
  {
    id: 'adj_social_care',
    category: 'adjustment',
    label: '虐待またはDVのおそれがあるなど、社会的養護が必要ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_social_care_no', points: 0 },
      { label: 'はい', value: 'adj_social_care_yes', points: 20 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: '入園希望月に申込児以外の兄弟姉妹が在園中、または同時申込中ですか？',
    helpText: '卒園予定児を除きます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_no', points: 0 },
      { label: 'はい', value: 'adj_sibling_yes', points: 5 },
    ],
  },
  {
    id: 'adj_hoikushi',
    category: 'adjustment',
    label: '保護者が名取市内の保育施設等で保育士・看護師・幼稚園教諭として就労していますか？',
    helpText: '認可保育所・認定こども園・家庭的保育事業等・幼稚園が対象で、就労予定も含みます（1人あたり5点）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_hoikushi_0', points: 0 },
      { label: 'はい（1人）', value: 'adj_hoikushi_5', points: 5 },
      { label: 'はい（2人）', value: 'adj_hoikushi_10', points: 10 },
    ],
  },
  {
    id: 'adj_gakudo',
    category: 'adjustment',
    label: '保護者が名取市内の放課後児童クラブに支援員として就労していますか？',
    helpText: '就労予定も含みます（1人あたり3点）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_gakudo_0', points: 0 },
      { label: 'はい（1人）', value: 'adj_gakudo_3', points: 3 },
      { label: 'はい（2人）', value: 'adj_gakudo_6', points: 6 },
    ],
  },
  {
    id: 'adj_tanshin',
    category: 'adjustment',
    label: '保護者の一方が単身赴任や入院で不在にしていますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_tanshin_no', points: 0 },
      { label: 'はい', value: 'adj_tanshin_yes', points: 2 },
    ],
  },
  {
    id: 'adj_facility_closed',
    category: 'adjustment',
    label: '通園する市内認可保育施設の廃止等、特別な事情がありますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_facility_closed_no', points: 0 },
      { label: 'はい', value: 'adj_facility_closed_yes', points: 20 },
    ],
  },
  {
    id: 'adj_job_offer',
    category: 'adjustment',
    label: '保護者が就労内定、または事業開始予定ですか？',
    helpText: '1人あたり2点の減算です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_job_offer_0', points: 0 },
      { label: 'はい（1人）', value: 'adj_job_offer_1', points: -2 },
      { label: 'はい（2人）', value: 'adj_job_offer_2', points: -4 },
    ],
  },
  {
    id: 'adj_moving',
    category: 'adjustment',
    label: '転入予定での申込みで、賃貸借・売買契約書等の書類の写しを提出できますか？',
    inputType: 'radio',
    options: [
      { label: '転入予定ではない、または提出できる', value: 'adj_moving_no', points: 0 },
      { label: '提出できない', value: 'adj_moving_yes', points: -3 },
    ],
  },
  {
    id: 'adj_grandparent',
    category: 'adjustment',
    label: '60歳未満の同居している祖父母で、保育協力可能と判断される方は何人いますか？',
    helpText: '保育の必要性の認定を認められる書類の提出がなかった場合、該当する親族1人あたり3点減算されます',
    inputType: 'radio',
    options: [
      { label: 'いない', value: 'adj_grandparent_0', points: 0 },
      { label: '1人', value: 'adj_grandparent_1', points: -3 },
      { label: '2人', value: 'adj_grandparent_2', points: -6 },
    ],
  },
  {
    id: 'adj_arrears',
    category: 'adjustment',
    label: '在園児・卒園児の保育料等が正当な理由なく滞納されていますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_arrears_no', points: 0 },
      { label: 'はい', value: 'adj_arrears_yes', points: -20 },
    ],
  },
  {
    id: 'adj_leave_extension',
    category: 'adjustment',
    label: '希望する市内認可保育施設に入所できない場合、育児休業の延長も許容できますか？',
    helpText: '保育施設等利用調整に係る申立書の提出が必要です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_leave_extension_no', points: 0 },
      { label: 'はい', value: 'adj_leave_extension_yes', points: -20 },
    ],
  },
  {
    id: 'adj_declined',
    category: 'adjustment',
    label: '正当な理由なく保育施設の利用案内を辞退するなど、公正な利用調整に支障を来たす行為をしましたか？',
    helpText: '利用希望日が同一年度内の利用申込みに限ります',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_declined_no', points: 0 },
      { label: 'はい', value: 'adj_declined_yes', points: -1 },
    ],
  },
];

export const natoriData: MunicipalityData = {
  municipality,
  questions: [...buildParentQuestions(1), ...buildParentQuestions(2), ...adjustmentQuestions],
};
