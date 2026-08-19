import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 泉大津市 保育施設利用判定基準表（基本項目・調整項目）データ
//
// 出典: 泉大津市こども育成課「保育施設利用判定基準表（令和8年度〜）」
//       https://www.city.izumiotsu.lg.jp/material/files/group/21/8nenndoriyouhannteikijunnhyou.pdf
//       （泉大津市Webサイト「令和9年度 保育所・認定こども園（保育園部）等の入園所申込みについて」
//         https://www.city.izumiotsu.lg.jp/kakuka/kenko/kodomoikusei/osirase/16037.html からリンク）
//
// 2026-08-19: 従来のデータは他自治体と同じ点数配列のテンプレート（推定値）だったため、
//             上記の公式基準表を読み取って全面的に置き換えた。
//
// 原典の判定点計算式:
//   「父の基本項目点＋母の基本項目点＋調整項目点＝合計点」
//   調整項目は「該当するものすべてを加点及び減点する。ただし加点については重複しない。
//   父母ともに加点項目に該当してもどちらかの加点のみ」
//
// 質問に含めていない原典の項目（点数の定めがなく関係機関との協議等で決まるもの）:
//   ・基本項目9 育児休業中（小規模保育事業所卒園時に限る。就労証明書の就労時間に応じた点数で審査）
//   ・基本項目10 虐待やDVの恐れがあること
//   ・基本項目11 その他（市長が認める場合）
//   ・調整項目「就労実績が就労時間に満たない場合」（最も就労時間が多い月の区分の基本点を採用する扱い）
// ---------------------------------------------------------------------------

const municipality = {
  id: 'izumiotsu',
  name: '泉大津市',
  slug: 'izumiotsu',
  prefecture: '大阪府',
  maxBasePoints: 22, // 父母各11点
} as const;

// ---------------------------------------------------------------------------
// 1 基本項目採点基準。父母それぞれについて選ぶ
// ---------------------------------------------------------------------------

/** 1 居宅外労働（会社員等・自営業事業主／自営協力者） */
const outsideWorkOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_outside_none`, points: 0 },
  { label: '常勤・会社員等・自営業事業主：月160時間以上の就労を常態', value: `${prefix}_outside_11`, points: 11 },
  { label: '常勤・会社員等・自営業事業主：月140時間以上の就労を常態', value: `${prefix}_outside_10`, points: 10 },
  { label: '常勤・会社員等・自営業事業主：月120時間以上の就労を常態', value: `${prefix}_outside_9`, points: 9 },
  { label: '常勤・会社員等・自営業事業主：月96時間以上の就労を常態', value: `${prefix}_outside_8`, points: 8 },
  { label: '常勤・会社員等・自営業事業主：月64時間以上の就労を常態', value: `${prefix}_outside_7`, points: 7 },
  { label: '自営協力者：月160時間以上の就労を常態', value: `${prefix}_outside_help_9`, points: 9 },
  { label: '自営協力者：月140時間以上の就労を常態', value: `${prefix}_outside_help_8`, points: 8 },
  { label: '自営協力者：月120時間以上の就労を常態', value: `${prefix}_outside_help_7`, points: 7 },
  { label: '自営協力者：月96時間以上の就労を常態', value: `${prefix}_outside_help_6`, points: 6 },
  { label: '自営協力者：月64時間以上の就労を常態', value: `${prefix}_outside_help_5`, points: 5 },
];

/** 2 居宅内労働（完全在宅ワークの会社員等は居宅内労働者とみなす）・内職 */
const homeWorkOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_home_none`, points: 0 },
  { label: '常勤・会社員等・自営業事業主：月160時間以上の就労を常態', value: `${prefix}_home_10`, points: 10 },
  { label: '常勤・会社員等・自営業事業主：月140時間以上の就労を常態', value: `${prefix}_home_9`, points: 9 },
  { label: '常勤・会社員等・自営業事業主：月120時間以上の就労を常態', value: `${prefix}_home_8`, points: 8 },
  { label: '常勤・会社員等・自営業事業主：月96時間以上の就労を常態', value: `${prefix}_home_7`, points: 7 },
  { label: '常勤・会社員等・自営業事業主：月64時間以上の就労を常態', value: `${prefix}_home_6`, points: 6 },
  { label: '自営協力者：月160時間以上の就労を常態', value: `${prefix}_home_help_8`, points: 8 },
  { label: '自営協力者：月140時間以上の就労を常態', value: `${prefix}_home_help_7`, points: 7 },
  { label: '自営協力者：月120時間以上の就労を常態', value: `${prefix}_home_help_6`, points: 6 },
  { label: '自営協力者：月96時間以上の就労を常態', value: `${prefix}_home_help_5`, points: 5 },
  { label: '自営協力者：月64時間以上の就労を常態', value: `${prefix}_home_help_4`, points: 4 },
  { label: '内職：月120時間以上の就労を常態', value: `${prefix}_home_naishoku_6`, points: 6 },
  { label: '内職：月64時間以上の就労を常態', value: `${prefix}_home_naishoku_4`, points: 4 },
];

/** 3 出産 */
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産で親族の援助が得られない', value: `${prefix}_childbirth_8`, points: 8 },
];

/** 4 疾病・障がい */
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '疾病等：入院（1か月以上）', value: `${prefix}_illness_11`, points: 11 },
  { label: '疾病等：自宅療養（安静を要す）', value: `${prefix}_illness_8`, points: 8 },
  { label: '疾病等：上記以外', value: `${prefix}_illness_6`, points: 6 },
  {
    label: '障がい：身体1・2級、精神1・2級、療育A',
    value: `${prefix}_illness_disability_11`,
    points: 11,
  },
  { label: '障がい：身体3級、精神3級、療育B1', value: `${prefix}_illness_disability_8`, points: 8 },
  { label: '障がい：上記以外', value: `${prefix}_illness_disability_6`, points: 6 },
];

/** 5 介護・看護 */
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '入院（1か月以上）の親族の介護・看護', value: `${prefix}_care_9`, points: 9 },
  { label: '自宅療養中の親族の介護・看護', value: `${prefix}_care_7`, points: 7 },
  { label: '上記以外の同居親族の介護・看護', value: `${prefix}_care_5`, points: 5 },
];

/** 6 災害の復旧 */
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '震災、風水害、火災等の復旧にあたっている', value: `${prefix}_disaster_11`, points: 11 },
];

/** 7 求職中 */
const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '就労未決定', value: `${prefix}_jobseeking_2`, points: 2 },
];

/** 8 就学 */
const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '月120時間以上の就学', value: `${prefix}_education_8`, points: 8 },
  { label: '月64時間以上の就学', value: `${prefix}_education_6`, points: 6 },
  { label: '上記以外の就学', value: `${prefix}_education_4`, points: 4 },
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
      { label: '居宅外で働いている', value: `${prefix}_reason_outside`, points: 0 },
      { label: '居宅内で働いている（完全在宅ワーク・内職を含む）', value: `${prefix}_reason_home`, points: 0 },
      { label: '出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '疾病・障がいがある', value: `${prefix}_reason_illness`, points: 0 },
      { label: '同居親族の介護・看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '災害の復旧', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '求職中', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '就学', value: `${prefix}_reason_education`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_outside`,
      category,
      label: `${parentLabel}の居宅外労働の状況は？`,
      helpText:
        '自営業事業主で自営の証明書類（確定申告書、営業許可証、開業届等）の提出がない場合は、自営協力者として扱われます',
      inputType: 'radio',
      options: outsideWorkOptions(prefix),
    },
    {
      id: `${prefix}_home`,
      category,
      label: `${parentLabel}の居宅内労働の状況は？`,
      helpText: '完全在宅ワークの会社員等は居宅内労働者として扱われます',
      inputType: 'radio',
      options: homeWorkOptions(prefix),
    },
    {
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}の出産の状況は？`,
      helpText: '母子手帳または医師の証明書が必要です',
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
  ];

  return [reasonQuestion, ...detailQuestions];
}

// ---------------------------------------------------------------------------
// 2 調整項目採点基準
// ---------------------------------------------------------------------------

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親世帯ですか？',
    helpText: '死別・離別・行方不明等を含みます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい', value: 'adj_single_parent_yes', points: 14 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい', value: 'adj_welfare_yes', points: 2 },
    ],
  },
  {
    id: 'adj_layoff',
    category: 'adjustment',
    label: '生計中心者の失業により就労の必要性が高いですか？',
    helpText: '生計中心者とは主に保育児童台帳の保護者欄に記載している者（概ね世帯主）をいいます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_layoff_no', points: 0 },
      { label: 'はい', value: 'adj_layoff_yes', points: 1 },
    ],
  },
  {
    id: 'adj_child_disability',
    category: 'adjustment',
    label: '利用希望児童が障がいを有していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_child_disability_no', points: 0 },
      { label: 'はい', value: 'adj_child_disability_yes', points: 2 },
    ],
  },
  {
    id: 'adj_parent_disability',
    category: 'adjustment',
    label: '両親が障がいを有していますか？',
    helpText: '基本項目が障がいの場合は除きます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_parent_disability_no', points: 0 },
      { label: 'はい', value: 'adj_parent_disability_yes', points: 2 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: 'きょうだいの状況は？',
    helpText: 'いずれか1つのみが適用されます',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_sibling_no', points: 0 },
      { label: '希望園にきょうだいが在園中（在園中の園所に限る）', value: 'adj_sibling_enrolled', points: 4 },
      { label: 'きょうだいが利用申込中', value: 'adj_sibling_applying', points: 1 },
      { label: 'きょうだいが利用申込中で、申込み児童が多胎児', value: 'adj_sibling_multiple', points: 2 },
    ],
  },
  {
    id: 'adj_many_children',
    category: 'adjustment',
    label: '多子家庭（就学前児童が3人以上）ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_many_children_no', points: 0 },
      { label: 'はい', value: 'adj_many_children_yes', points: 1 },
    ],
  },
  {
    id: 'adj_leave_return',
    category: 'adjustment',
    label: '入園所希望月に産休または育児休業からの復帰を予定していますか？',
    helpText: '復帰月以前から申込みをしており、入園所前に復帰した場合も加点が継続されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_leave_return_no', points: 0 },
      { label: 'はい', value: 'adj_leave_return_yes', points: 2 },
    ],
  },
  {
    id: 'adj_planned_work',
    category: 'adjustment',
    label: '就労予定または就学予定ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_planned_work_no', points: 0 },
      { label: 'はい', value: 'adj_planned_work_yes', points: -3 },
    ],
  },
  {
    id: 'adj_leave_extension',
    category: 'adjustment',
    label: '育児休業の延長を許容しますか？',
    helpText:
      '利用調整希望申立書を提出した場合に減点されます。撤回する場合は選考月の前月10日（10日が閉庁日の場合は前開庁日）までに申し出が必要です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_leave_extension_no', points: 0 },
      { label: 'はい', value: 'adj_leave_extension_yes', points: -60 },
    ],
  },
  {
    id: 'adj_ninkagai',
    category: 'adjustment',
    label: '認可外保育施設等にすでに入所していますか？',
    helpText: '月極契約で利用し、市が指定する様式の認可外保育施設等利用証明書を提出した場合に加点されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_ninkagai_no', points: 0 },
      { label: 'はい', value: 'adj_ninkagai_yes', points: 1 },
    ],
  },
  {
    id: 'adj_grandparent',
    category: 'adjustment',
    label: '同居親族（65歳未満の祖父母）が未就労等の状態ですか？',
    helpText:
      '同居（予定）親族に65歳未満の祖父母がいる場合は、祖父母についても児童の保育を必要とする証明書の提出が必要です。提出がない場合は祖父母1人につき1点減点されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ（同居していない、または証明書を提出できる）', value: 'adj_grandparent_0', points: 0 },
      { label: 'はい（1人）', value: 'adj_grandparent_1', points: -1 },
      { label: 'はい（2人）', value: 'adj_grandparent_2', points: -2 },
    ],
  },
  {
    id: 'adj_shokibo_grad',
    category: 'adjustment',
    label: '市内の小規模保育事業所の卒園児童ですか？',
    helpText: '利用申込のあった年度の年度末に卒園予定の者に限ります',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_shokibo_grad_no', points: 0 },
      { label: 'はい', value: 'adj_shokibo_grad_yes', points: 8 },
    ],
  },
  {
    id: 'adj_moving',
    category: 'adjustment',
    label: '引っ越しを予定していて、転入場所や転入時期が確定していませんか？',
    helpText: '「売買契約書」「賃貸契約書」等、泉大津市への転入に関する書類が提出できる場合は除きます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_moving_no', points: 0 },
      { label: 'はい', value: 'adj_moving_yes', points: -10 },
    ],
  },
  {
    id: 'adj_hoikushi',
    category: 'adjustment',
    label: '保護者が保育士等として特定教育・保育施設等に勤務していますか？',
    helpText:
      '保育士等とは保育士、幼稚園教諭または保育教諭を指します。市内勤務は月120時間未満で2点減、月70時間未満で4点減となります',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_hoikushi_no', points: 0 },
      { label: '市内の施設に勤務（月120時間以上）', value: 'adj_hoikushi_5', points: 5 },
      { label: '市内の施設に勤務（月70時間以上120時間未満）', value: 'adj_hoikushi_3', points: 3 },
      { label: '市内の施設に勤務（月70時間未満）', value: 'adj_hoikushi_1_in', points: 1 },
      { label: '市外の施設に月120時間以上勤務', value: 'adj_hoikushi_1_out', points: 1 },
    ],
  },
  {
    id: 'adj_arrears',
    category: 'adjustment',
    label: '保育料等を3か月分以上滞納していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_arrears_no', points: 0 },
      { label: 'はい', value: 'adj_arrears_yes', points: -3 },
    ],
  },
];

export const izumiotsuData: MunicipalityData = {
  municipality,
  questions: [...buildParentQuestions(1), ...buildParentQuestions(2), ...adjustmentQuestions],
};
