import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 入間市 利用調整基準表（基本点・基本加点・世帯調整・児童調整）データ
//
// 出典: 入間市こども支援部保育幼稚園課「利用調整基準表（令和8年4月利用調整分から適用）」
//       https://www.city.iruma.saitama.jp/material/files/group/34/R8riyoutyouseikijyun0528.pdf
//       （入間市Webサイト「令和8年度 保育施設等の申込み」
//         https://www.city.iruma.saitama.jp/soshiki/hoikuyochienka/hoikusho_youchien/13889.html からリンク）
//
// 2026-08-19: 従来のデータは他自治体と同じ点数配列のテンプレート（推定値）だったため、
//             上記の公式基準表を読み取って全面的に置き換えた。
//             基準表はPDFが画像のみのため、ページを画像化して読み取った。
//
// 原典の利用調整の順序:
//   1 利用調整指数の高い者を優先する
//   2 上記で判定できない場合は、基本点の合計（A）の高い者を優先する
//   3 上記で判定できない場合は、基本指数の区分において次のとおり優先する
//     社会的擁護＞災害＞就労（自営以外）＞就学＞就労（自営）＞疾病・障害＞介護・看護＞出産＞求職
//   4 上記で判定できない場合は、基本指数（C）の合計の高い者を優先する
//   5 上記で判定できない場合は、該当年度における保育料階層の低い者を優先する
//
// 就労は「基本点（週・月の就労時間）」に加えて、1日の就労時間・1週/1か月の就労日数・勤務地・
// 自営協力者の収入区分がそれぞれ加減点される（基本加点B2）。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'iruma',
  name: '入間市',
  slug: 'iruma',
  prefecture: '埼玉県',
  maxBasePoints: 60, // 父母各30点（障害・疾病1の状態、災害復旧）
} as const;

// ---------------------------------------------------------------------------
// 基本点（A1/A2）。父母それぞれについて選ぶ
// ---------------------------------------------------------------------------

/** 1 就労／就学 */
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '週38時間以上／月160時間以上', value: `${prefix}_employment_27`, points: 27 },
  { label: '週33時間以上／月140時間以上', value: `${prefix}_employment_25`, points: 25 },
  { label: '週28.5時間以上／月120時間以上', value: `${prefix}_employment_22`, points: 22 },
  { label: '週23.5時間以上／月100時間以上', value: `${prefix}_employment_20`, points: 20 },
  { label: '週17時間以上／月72時間以上', value: `${prefix}_employment_18`, points: 18 },
  { label: '週15時間以上／月64時間以上', value: `${prefix}_employment_17`, points: 17 },
  { label: '内職', value: `${prefix}_employment_naishoku_17`, points: 17 },
];

/** 1 就労の基本加点：1日の就労時間 */
const workHoursOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_hours_none`, points: 0 },
  { label: '1日8時間以上', value: `${prefix}_hours_3`, points: 3 },
  { label: '1日7時間以上', value: `${prefix}_hours_2`, points: 2 },
  { label: '1日6時間以上', value: `${prefix}_hours_1`, points: 1 },
  { label: '1日4時間未満', value: `${prefix}_hours_m1`, points: -1 },
  { label: '1日3時間未満', value: `${prefix}_hours_m2`, points: -2 },
];

/** 1 就労の基本加点：1週/1か月の就労日数 */
const workDaysOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_days_none`, points: 0 },
  { label: '週5日以上／月20日以上', value: `${prefix}_days_3`, points: 3 },
  { label: '週4.5日／月18日以上', value: `${prefix}_days_2`, points: 2 },
  { label: '週4日／月16日以上', value: `${prefix}_days_1`, points: 1 },
  { label: '週3日／月15日以下', value: `${prefix}_days_m2`, points: -2 },
  { label: '週3日未満／月11日以下', value: `${prefix}_days_m3`, points: -3 },
];

/** 1 就労の基本加点：勤務地 */
const workPlaceOptions = (prefix: string) => [
  { label: 'あてはまらない・未定', value: `${prefix}_place_0`, points: 0 },
  { label: '市内', value: `${prefix}_place_1`, points: 1 },
  { label: '所沢・狭山・飯能・日高・瑞穂・青梅', value: `${prefix}_place_2`, points: 2 },
  { label: '左記以外', value: `${prefix}_place_4`, points: 4 },
];

/** 1 就労の基本加点：自営協力者の収入区分 */
const selfIncomeOptions = (prefix: string) => [
  { label: '自営協力者ではない', value: `${prefix}_selfincome_0`, points: 0 },
  { label: '年収180万円以上／月収150千円以上（中心者相当）', value: `${prefix}_selfincome_chushin`, points: 0 },
  { label: '年収130万円以上／月収108千円以上', value: `${prefix}_selfincome_m2`, points: -2 },
  { label: '年収60万円以上／月収50千円以上', value: `${prefix}_selfincome_m4`, points: -4 },
  { label: '年収60万円未満／月収50千円未満', value: `${prefix}_selfincome_m6`, points: -6 },
  { label: '無給', value: `${prefix}_selfincome_m10`, points: -10 },
];

/** 1 就労内定中 */
const jobOfferOptions = (prefix: string) => [
  { label: '就労中（内定中ではない）', value: `${prefix}_joboffer_0`, points: 0 },
  { label: '内定中', value: `${prefix}_joboffer_m2`, points: -2 },
];

/** 2 妊娠出産 */
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  {
    label: '出産予定日の8週間前（多胎妊娠は14週前）の属する月の翌月から産後8週が経過した日の翌日の属する月末まで',
    value: `${prefix}_childbirth_20`,
    points: 20,
  },
];

/** 3 障害・疾病（育児の程度） */
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '1の状態', value: `${prefix}_illness_30`, points: 30 },
  { label: '2の状態', value: `${prefix}_illness_25`, points: 25 },
  { label: '3の状態', value: `${prefix}_illness_20`, points: 20 },
  { label: '4の状態', value: `${prefix}_illness_15`, points: 15 },
];

/** 3 障害・疾病の基本加点（生活能力） */
const illnessAbilityOptions = (prefix: string) => [
  { label: 'あてはまらない・その他', value: `${prefix}_ability_0`, points: 0 },
  { label: '生活能力 1の状態', value: `${prefix}_ability_10`, points: 10 },
  { label: '生活能力 2の状態', value: `${prefix}_ability_7`, points: 7 },
  { label: '生活能力 3の状態', value: `${prefix}_ability_3`, points: 3 },
  { label: '生活能力 4の状態', value: `${prefix}_ability_1`, points: 1 },
];

/** 4 介護・看護 */
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '1の状態', value: `${prefix}_care_28`, points: 28 },
  { label: '2の状態', value: `${prefix}_care_23`, points: 23 },
  { label: '3の状態', value: `${prefix}_care_20`, points: 20 },
  { label: '4の状態', value: `${prefix}_care_10`, points: 10 },
];

/** 4 介護・看護の基本加点（子どもとの関係。同居の場合） */
const careRelationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_carerel_0`, points: 0 },
  { label: '父・母', value: `${prefix}_carerel_4`, points: 4 },
  { label: '祖父母', value: `${prefix}_carerel_3`, points: 3 },
  { label: '兄弟姉妹', value: `${prefix}_carerel_1`, points: 1 },
];

/** 5 災害復旧 */
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '災害復旧（罹災証明書等で判断）', value: `${prefix}_disaster_30`, points: 30 },
];

/** 6 求職活動 */
const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動', value: `${prefix}_jobseeking_12`, points: 12 },
];

/** 6 求職活動の基本加点（チェック区分） */
const jobSeekingTypeOptions = (prefix: string) => [
  { label: 'あてはまらない・その他', value: `${prefix}_jstype_0`, points: 0 },
  { label: 'ハローワーク等', value: `${prefix}_jstype_3`, points: 3 },
  { label: '新聞・HP', value: `${prefix}_jstype_1`, points: 1 },
];

/** 7 社会的擁護 */
const socialCareOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_social_none`, points: 0 },
  { label: '社会的擁護', value: `${prefix}_social_20`, points: 20 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: '内職は基本点のみとなります。就学に該当する場合は、就労を就学に読み替えます',
    inputType: 'select',
    options: [
      { label: '就労／就学', value: `${prefix}_reason_employment`, points: 0 },
      { label: '妊娠出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '障害・疾病', value: `${prefix}_reason_illness`, points: 0 },
      { label: '介護・看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '災害復旧', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '求職活動', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '社会的擁護', value: `${prefix}_reason_social`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の就労／就学の時間は？`,
      inputType: 'radio',
      options: employmentOptions(prefix),
    },
    {
      id: `${prefix}_hours`,
      category,
      showFor: ['employment'],
      label: `${parentLabel}の1日の就労時間は？`,
      helpText: '就労証明書等に記載のある雇用契約等における就労内容で判断されます',
      inputType: 'radio',
      options: workHoursOptions(prefix),
    },
    {
      id: `${prefix}_days`,
      category,
      showFor: ['employment'],
      label: `${parentLabel}の1週／1か月の就労日数は？`,
      inputType: 'radio',
      options: workDaysOptions(prefix),
    },
    {
      id: `${prefix}_place`,
      category,
      showFor: ['employment'],
      label: `${parentLabel}の勤務地は？`,
      inputType: 'radio',
      options: workPlaceOptions(prefix),
    },
    {
      id: `${prefix}_selfincome`,
      category,
      showFor: ['employment'],
      label: `${parentLabel}が自営協力者の場合の収入区分は？`,
      inputType: 'radio',
      options: selfIncomeOptions(prefix),
    },
    {
      id: `${prefix}_joboffer`,
      category,
      showFor: ['employment'],
      label: `${parentLabel}は就労内定中ですか？`,
      inputType: 'radio',
      options: jobOfferOptions(prefix),
    },
    {
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}の妊娠出産の状況は？`,
      helpText: '切迫流産・早産などは疾病等として扱われますので、診断書を提出してください',
      inputType: 'radio',
      options: childbirthOptions(prefix),
    },
    {
      id: `${prefix}_illness`,
      category,
      label: `${parentLabel}の障害・疾病（育児の程度）は？`,
      helpText:
        '提出された診断書における「育児の程度」で保育の必要性（基本点）が判断されます。「育児の程度」が5または6の状態は、常態的な保育の必要はないと判断されます',
      inputType: 'radio',
      options: illnessOptions(prefix),
    },
    {
      id: `${prefix}_ability`,
      category,
      showFor: ['illness'],
      label: `${parentLabel}の生活能力は？`,
      helpText: '診断書における「生活能力」が加点項目となります',
      inputType: 'radio',
      options: illnessAbilityOptions(prefix),
    },
    {
      id: `${prefix}_care`,
      category,
      label: `${parentLabel}の介護・看護（生活能力）の状況は？`,
      helpText:
        '提出された診断書における「生活能力」で介護等による保育の必要性（基本点）が判断されます。「生活能力」が5の状態は、常態的な保育の必要はないと判断されます',
      inputType: 'radio',
      options: careOptions(prefix),
    },
    {
      id: `${prefix}_carerel`,
      category,
      showFor: ['care'],
      label: `${parentLabel}が介護・看護する方との関係は？（同居の場合）`,
      helpText: '実態として別居していることが確認できる場合のみ加点されます',
      inputType: 'radio',
      options: careRelationOptions(prefix),
    },
    {
      id: `${prefix}_disaster`,
      category,
      label: `${parentLabel}は災害復旧にあてはまりますか？`,
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
      id: `${prefix}_jstype`,
      category,
      showFor: ['jobseeking'],
      label: `${parentLabel}の求職活動の方法は？`,
      helpText: 'いずれか1つを選びます。内定中・就労間もない場合は、就労における加点のみが適用されます',
      inputType: 'radio',
      options: jobSeekingTypeOptions(prefix),
    },
    {
      id: `${prefix}_social`,
      category,
      label: `${parentLabel}は社会的擁護にあてはまりますか？`,
      inputType: 'radio',
      options: socialCareOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// ---------------------------------------------------------------------------
// 世帯調整（D1・D2）・児童調整（E1・E2）
// ---------------------------------------------------------------------------

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親家庭ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: '死亡・離婚・未婚によるひとり親家庭', value: 'adj_single_parent_50', points: 50 },
      { label: 'みなしひとり親家庭', value: 'adj_single_parent_45', points: 45 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生保・ひとり親の自立支援にあてはまりますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい', value: 'adj_welfare_yes', points: 5 },
    ],
  },
  {
    id: 'adj_layoff',
    category: 'adjustment',
    label: '失業している方はいますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_layoff_no', points: 0 },
      { label: '生計中心者以外の失業', value: 'adj_layoff_16', points: 16 },
      { label: '生計中心者の失業', value: 'adj_layoff_15', points: 15 },
    ],
  },
  {
    id: 'adj_social_care',
    category: 'adjustment',
    label: '社会的擁護が必要な世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_social_care_no', points: 0 },
      { label: 'はい', value: 'adj_social_care_yes', points: 15 },
    ],
  },
  {
    id: 'adj_taien',
    category: 'adjustment',
    label: '産休・育休退園にあてはまりますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_taien_no', points: 0 },
      { label: 'はい', value: 'adj_taien_yes', points: 20 },
    ],
  },
  {
    id: 'adj_sibling_simultaneous',
    category: 'adjustment',
    label: '兄弟の同時申込み（転園含む）をしますか？',
    helpText: '兄弟人数に応じて加点されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_simultaneous_0', points: 0 },
      { label: 'はい（2人）', value: 'adj_sibling_simultaneous_2', points: 2 },
      { label: 'はい（3人）', value: 'adj_sibling_simultaneous_3', points: 3 },
      { label: 'はい（4人以上）', value: 'adj_sibling_simultaneous_4', points: 4 },
    ],
  },
  {
    id: 'adj_multiple_birth',
    category: 'adjustment',
    label: '多胎児の新規同時申込みですか？',
    helpText: '多胎児の兄弟にも適用されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_multiple_birth_no', points: 0 },
      { label: 'はい', value: 'adj_multiple_birth_yes', points: 4 },
    ],
  },
  {
    id: 'adj_leave_extension',
    category: 'adjustment',
    label: '育休復帰を前提としない（不可希望）申込みですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_leave_extension_no', points: 0 },
      { label: 'はい', value: 'adj_leave_extension_yes', points: -100 },
    ],
  },
  {
    id: 'adj_hoikushi',
    category: 'adjustment',
    label: '保護者が保育施設で保育士として勤務していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_hoikushi_no', points: 0 },
      { label: '市内保育施設のフルタイム保育士として勤務', value: 'adj_hoikushi_15', points: 15 },
      { label: '保育施設で保育士として勤務（内定）', value: 'adj_hoikushi_6', points: 6 },
    ],
  },
  {
    id: 'adj_not_moving',
    category: 'adjustment',
    label: '転入予定はありますか？',
    inputType: 'radio',
    options: [
      { label: '市内在住、または転入予定あり', value: 'adj_not_moving_no', points: 0 },
      { label: '転入予定なし', value: 'adj_not_moving_yes', points: -40 },
    ],
  },
  {
    id: 'adj_arrears',
    category: 'adjustment',
    label: '保育料の滞納がありますか？',
    helpText: '卒園児・以前の世帯も含みます。滞納および未申告に該当する場合は、他の調整区分は適用されません',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_arrears_no', points: 0 },
      { label: 'はい', value: 'adj_arrears_yes', points: -50 },
    ],
  },
  {
    id: 'adj_no_tax_return',
    category: 'adjustment',
    label: '住民税の未申告がありますか？',
    helpText: '課税証明なしを含みます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_no_tax_return_no', points: 0 },
      { label: 'はい', value: 'adj_no_tax_return_yes', points: -30 },
    ],
  },
  {
    id: 'adj_child_disability',
    category: 'adjustment',
    label: '申込児童は障害児ですか？',
    helpText: '地域型卒園児は点数ではなく優先調整として扱われます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_child_disability_no', points: 0 },
      { label: 'はい', value: 'adj_child_disability_yes', points: 10 },
    ],
  },
  {
    id: 'adj_child_status',
    category: 'adjustment',
    label: '申込児童の状況は？',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_child_status_no', points: 0 },
      { label: 'わかば2歳児（4月のみ）', value: 'adj_child_status_50', points: 50 },
      { label: '市外から市内施設へ（4月のみ）', value: 'adj_child_status_20', points: 20 },
      { label: '同施設内で1号から2号・3号へ', value: 'adj_child_status_20b', points: 20 },
      { label: '育（産）休復帰', value: 'adj_child_status_11', points: 11 },
      { label: '兄弟在園転園（4月のみ）', value: 'adj_child_status_8', points: 8 },
      { label: '兄弟在園新規', value: 'adj_child_status_6', points: 6 },
    ],
  },
  {
    id: 'adj_ninkagai',
    category: 'adjustment',
    label: '認可外保育施設を利用していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_ninkagai_no', points: 0 },
      { label: '認可外 週5日', value: 'adj_ninkagai_12', points: 12 },
      { label: '認可外 週4日', value: 'adj_ninkagai_8', points: 8 },
      { label: '認可外 週3日', value: 'adj_ninkagai_6', points: 6 },
    ],
  },
  {
    id: 'adj_declined',
    category: 'adjustment',
    label: '転園・辞退の状況は？',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_declined_no', points: 0 },
      { label: '入園後に転園', value: 'adj_declined_40', points: -40 },
      { label: '内定後に辞退', value: 'adj_declined_20', points: -20 },
      { label: '結果後に辞退', value: 'adj_declined_50', points: -50 },
    ],
  },
];

export const irumaData: MunicipalityData = {
  municipality,
  questions: [...buildParentQuestions(1), ...buildParentQuestions(2), ...adjustmentQuestions],
};
