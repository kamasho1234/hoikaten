import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 泉南市 入園選考基準表（基本点・優先項目加点表・調整指数表）データ
//
// 出典: 泉南市保育子ども課「令和8年度入園選考基準表」
//       https://www.city.sennan.lg.jp/material/files/group/18/20251028-2.pdf
//       （泉南市Webサイト「令和8年度保育施設等入園の御案内」
//         https://www.city.sennan.lg.jp/kakuka/kenkoukodomo/hoikukodomo/hoikushisetu/11344.html からリンク）
//
// 2026-08-19: 従来のデータは他自治体と同じ点数配列のテンプレート（推定値）だったため、
//             上記の公式基準表を読み取って全面的に置き換えた。
//             泉南市の基本点は100点満点系で、旧データ（10点満点系）とは桁が異なる。
//
// 原典の備考:
//   「父母それぞれの基本点を合算する」
//   「父母が複数の事由に該当する場合は、各々について基本点が高い方の要件を採用する」
//   「就労時間数はすべて休憩時間を含むものとする」
//   「就労証明書等必要書類の提出がない場合は、求職中とみなす」
//   就労の「内定及び家庭従業者の場合は時間によって-10とする」
//
// 質問に含めていない原典の項目（点数ではなく最優先／別途判断とされるもの）:
//   ・優先項目加点表(3) 虐待やDVのおそれがある場合など、社会的養護が必要な場合 → 最優先
//   ・優先項目加点表(7) 特定地域型保育事業を卒園し連携施設へ入園する場合 → 最優先
//   ・優先項目加点表(11) その他優先利用が必要と市長が認める場合 → 状況により別途判断
// ---------------------------------------------------------------------------

const municipality = {
  id: 'sennan',
  name: '泉南市',
  slug: 'sennan',
  prefecture: '大阪府',
  maxBasePoints: 200, // 父母各100点
} as const;

// ---------------------------------------------------------------------------
// 基本点（保護者の状況）。父母それぞれについて選ぶ
// ---------------------------------------------------------------------------

/** 就労・内職 */
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月160時間以上の勤務', value: `${prefix}_employment_100`, points: 100 },
  { label: '月140時間以上の勤務', value: `${prefix}_employment_90`, points: 90 },
  { label: '月120時間以上の勤務', value: `${prefix}_employment_80`, points: 80 },
  { label: '月96時間以上の勤務', value: `${prefix}_employment_70`, points: 70 },
  { label: '月64時間以上の勤務', value: `${prefix}_employment_60`, points: 60 },
  { label: '週4日未満または1日4時間未満の勤務', value: `${prefix}_employment_50`, points: 50 },
  { label: '内職：月120時間以上の勤務', value: `${prefix}_employment_naishoku_60`, points: 60 },
  { label: '内職：月64時間以上の勤務', value: `${prefix}_employment_naishoku_40`, points: 40 },
];

/** 就労が内定・家庭従業者の場合の減点 */
const employmentTypeOptions = (prefix: string) => [
  { label: '就労中（内定・家庭従業者ではない）', value: `${prefix}_emptype_normal`, points: 0 },
  { label: '就労内定、または家庭従業者である', value: `${prefix}_emptype_minus`, points: -10 },
];

/** 妊娠・出産 */
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産前後2か月', value: `${prefix}_childbirth_50`, points: 50 },
];

/** 疾病・障がい */
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '疾病：入院（1か月以上）、常時病臥', value: `${prefix}_illness_100`, points: 100 },
  { label: '疾病：診断書等による', value: `${prefix}_illness_60`, points: 60 },
  {
    label: '障害：身体1・2級、精神1級、療育A',
    value: `${prefix}_illness_disability_100`,
    points: 100,
  },
  { label: '障害：身体3級、精神2級、療育B1', value: `${prefix}_illness_disability_80`, points: 80 },
  { label: '障害：身体4〜6級、精神3級、療育B2', value: `${prefix}_illness_disability_60`, points: 60 },
];

/** 同居親族等の介護・看護 */
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '常時保育が困難', value: `${prefix}_care_90`, points: 90 },
  {
    label: '入院・通院・通所の付き添いのため特に保育に支障があると判断できる書類がある',
    value: `${prefix}_care_50`,
    points: 50,
  },
];

/** 災害 */
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '震災・風水害・火災その他の災害復旧に当たっている', value: `${prefix}_disaster_100`, points: 100 },
];

/** 求職活動 */
const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '概ね週4日以上かつ1日4時間以上の就労の求職', value: `${prefix}_jobseeking_20`, points: 20 },
];

/** 就学（時間によって就労の-10とみなす） */
const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '月160時間以上の在学', value: `${prefix}_education_90`, points: 90 },
  { label: '月140時間以上の在学', value: `${prefix}_education_80`, points: 80 },
  { label: '月120時間以上の在学', value: `${prefix}_education_70`, points: 70 },
  { label: '月96時間以上の在学', value: `${prefix}_education_60`, points: 60 },
  { label: '月64時間以上の在学', value: `${prefix}_education_50`, points: 50 },
  { label: '週4日未満または1日4時間未満の在学', value: `${prefix}_education_40`, points: 40 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: '複数の事由に該当する場合は、基本点が高い方の要件が採用されます',
    inputType: 'select',
    options: [
      { label: '就労（内職を含む）', value: `${prefix}_reason_employment`, points: 0 },
      { label: '妊娠・出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '疾病・障がい', value: `${prefix}_reason_illness`, points: 0 },
      { label: '同居親族等の介護・看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '災害復旧', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '求職活動', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '就学', value: `${prefix}_reason_education`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の勤務時間は？`,
      helpText: '就労時間数はすべて休憩時間を含みます',
      inputType: 'radio',
      options: employmentOptions(prefix),
    },
    {
      id: `${prefix}_emptype`,
      category,
      // 「就労」を選んだときだけ表示する（内定・家庭従業者の減点）
      showFor: ['employment'],
      label: `${parentLabel}は就労内定、または家庭従業者ですか？`,
      helpText:
        '家庭従業者とは、自営業主と親族関係にある生計を一にする者で、その自営業主の営む事業に無給で従事している者をいいます',
      inputType: 'radio',
      options: employmentTypeOptions(prefix),
    },
    {
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}の妊娠・出産の状況は？`,
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
      label: `${parentLabel}は災害復旧に当たっていますか？`,
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
      label: `${parentLabel}の在学時間は？`,
      helpText:
        '教育機関または就労に必要な技能習得のための職業訓練校等への在学が対象です。時間によって就労の点数から10を引いた点数とみなされます',
      inputType: 'radio',
      options: educationOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// ---------------------------------------------------------------------------
// 優先項目加点表・調整指数表
// ---------------------------------------------------------------------------

const adjustmentQuestions: Question[] = [
  // --- 優先項目加点表 ---
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親家庭ですか？',
    helpText: '母子及び父子並びに寡婦福祉法に基づく配慮が対象です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい', value: 'adj_single_parent_yes', points: 100 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯、または生計維持者が失業していますか？',
    helpText: '就労促進による自立支援が対象です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい', value: 'adj_welfare_yes', points: 20 },
    ],
  },
  {
    id: 'adj_child_disability',
    category: 'adjustment',
    label: '申込みの子どもが障害を有していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_child_disability_no', points: 0 },
      { label: 'はい', value: 'adj_child_disability_yes', points: 70 },
    ],
  },
  {
    id: 'adj_leave_end',
    category: 'adjustment',
    label: '育児休業を終了しましたか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_leave_end_no', points: 0 },
      { label: 'はい（育児休業取得前に保育施設を利用していた）', value: 'adj_leave_end_30', points: 30 },
      { label: 'はい（上記以外）', value: 'adj_leave_end_10', points: 10 },
    ],
  },
  {
    id: 'adj_sibling_enrolled',
    category: 'adjustment',
    label: 'きょうだいが既に施設に入園していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_enrolled_no', points: 0 },
      { label: 'はい（同一施設を希望）', value: 'adj_sibling_enrolled_40', points: 40 },
      { label: 'はい（別施設を希望）', value: 'adj_sibling_enrolled_30', points: 30 },
    ],
  },
  {
    id: 'adj_chiikigata',
    category: 'adjustment',
    label: '特定地域型保育事業を卒園しましたか？',
    helpText: '連携施設への入園を希望する場合は、点数ではなく最優先として扱われます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_chiikigata_no', points: 0 },
      { label: 'はい（連携施設以外への入園を希望）', value: 'adj_chiikigata_30', points: 30 },
    ],
  },
  {
    id: 'adj_parent_disability',
    category: 'adjustment',
    label: '父または母が重度の障害を有し、他に子どもを保育する者がいませんか？',
    helpText: '「重度の障害」とは、身体障害者手帳1・2級、精神障害者保健福祉手帳1級、療育手帳Aを有することをいいます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_parent_disability_no', points: 0 },
      { label: 'はい', value: 'adj_parent_disability_yes', points: 20 },
    ],
  },
  {
    id: 'adj_transfer',
    category: 'adjustment',
    label: '既に市内の保育施設を利用している子どもが転園を希望しますか？',
    helpText: '泉南市内に在住している子どもが対象です（1号認定は除く）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_transfer_no', points: 0 },
      { label: 'はい', value: 'adj_transfer_yes', points: 30 },
    ],
  },
  {
    id: 'adj_hoikushi',
    category: 'adjustment',
    label: '父または母が保育士資格を有し、特定教育・保育施設で就労していますか？',
    helpText:
      '常勤または常勤に準ずる（月120時間以上の勤務）者として就労している、または就労が内定している場合が対象です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_hoikushi_no', points: 0 },
      { label: 'はい（市内の特定教育・保育施設に就労）', value: 'adj_hoikushi_50', points: 50 },
      { label: 'はい（上記以外）', value: 'adj_hoikushi_30', points: 30 },
    ],
  },
  // --- 調整指数表 ---
  {
    id: 'adj_sibling_simultaneous',
    category: 'adjustment',
    label: 'きょうだいが同時に申請しますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_simultaneous_no', points: 0 },
      { label: 'はい（多胎児）', value: 'adj_sibling_simultaneous_15', points: 15 },
      { label: 'はい（上記以外）', value: 'adj_sibling_simultaneous_5', points: 5 },
    ],
  },
  {
    id: 'adj_long_waiting',
    category: 'adjustment',
    label: '前年度10月1日以降、全施設に申込みをしているが入園決定を一度も受けていませんか？',
    helpText: '4月1日入園希望者が対象です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_long_waiting_no', points: 0 },
      { label: 'はい', value: 'adj_long_waiting_yes', points: 10 },
    ],
  },
  {
    id: 'adj_ninkagai',
    category: 'adjustment',
    label: '認可外保育施設等に既に入園していますか？',
    helpText: '1年以内に保育認定を受けている者に限ります。証明書類が必要です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_ninkagai_no', points: 0 },
      { label: 'はい', value: 'adj_ninkagai_yes', points: 10 },
    ],
  },
  {
    id: 'adj_transfer_in',
    category: 'adjustment',
    label: '転入の前月まで、保育認定を受けて保育施設を利用していましたか？',
    helpText: '証明書類が必要です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_transfer_in_no', points: 0 },
      { label: 'はい', value: 'adj_transfer_in_yes', points: 10 },
    ],
  },
  {
    id: 'adj_type_change',
    category: 'adjustment',
    label: '同一園において1号認定から2号認定へ変更しますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_type_change_no', points: 0 },
      { label: 'はい', value: 'adj_type_change_yes', points: 30 },
    ],
  },
  {
    id: 'adj_grandparent',
    category: 'adjustment',
    label: '同居の祖父母が65歳未満で求職活動中ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_grandparent_no', points: 0 },
      { label: 'はい', value: 'adj_grandparent_yes', points: -10 },
    ],
  },
  {
    id: 'adj_incomplete',
    category: 'adjustment',
    label: '提出書類に不備がありますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_incomplete_no', points: 0 },
      { label: 'はい', value: 'adj_incomplete_yes', points: -10 },
    ],
  },
  {
    id: 'adj_declined',
    category: 'adjustment',
    label: '正当な理由なく利用内定を辞退するなど、利用調整に支障をきたす行為をしましたか？',
    helpText: '利用希望月が同一年度内の場合に限ります',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_declined_no', points: 0 },
      { label: 'はい', value: 'adj_declined_yes', points: -25 },
    ],
  },
  {
    id: 'adj_unenrolled_sibling',
    category: 'adjustment',
    label: '保育園等に在籍していないきょうだいがいますか？',
    helpText: '就労先に託児室がある場合は除きます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unenrolled_sibling_no', points: 0 },
      { label: 'はい', value: 'adj_unenrolled_sibling_yes', points: -30 },
    ],
  },
  {
    id: 'adj_arrears',
    category: 'adjustment',
    label: '正当な理由なく保育料等を3か月以上滞納していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_arrears_no', points: 0 },
      { label: 'はい', value: 'adj_arrears_yes', points: -30 },
    ],
  },
];

export const sennanData: MunicipalityData = {
  municipality,
  questions: [...buildParentQuestions(1), ...buildParentQuestions(2), ...adjustmentQuestions],
};
