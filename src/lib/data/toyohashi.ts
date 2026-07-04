import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 豊橋市 保育園入園 基本指数・補正指数データ
// ---------------------------------------------------------------------------
// 豊橋市は「基本指数」＋「補正指数」方式。
// 父母それぞれに基本指数を算出し、合算（加算方式）で優先順位を判断。
// 同点の場合は同点時の優先順位で判断。各保護者の最大基本指数は20点。
// 出典: 令和7年度入所 保育所入所基準指数表（豊橋市こども未来部保育課）
// https://www.city.toyohashi.lg.jp/57823.htm
// ---------------------------------------------------------------------------

const municipality = {
  id: 'toyohashi',
  name: '豊橋市',
  slug: 'toyohashi',
  prefecture: '愛知県',
  maxBasePoints: 20,
  // scoringMethod 省略 = デフォルト "sum"（父母の基本指数を合算）
} as const;

// ---------------------------------------------------------------------------
// 保育が必要な理由ごとの選択肢テンプレート
// ---------------------------------------------------------------------------

/** 就労（会社勤め等） */
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月20日以上・1日7.5時間以上', value: `${prefix}_employment_20`, points: 20 },
  { label: '月20日以上・1日6時間以上', value: `${prefix}_employment_18`, points: 18 },
  { label: '月20日以上・1日4時間以上', value: `${prefix}_employment_16`, points: 16 },
  { label: '月16日以上・1日7.5時間以上', value: `${prefix}_employment_17`, points: 17 },
  { label: '月16日以上・1日6時間以上', value: `${prefix}_employment_14`, points: 14 },
  { label: '月16日以上・1日4時間以上', value: `${prefix}_employment_13`, points: 13 },
  { label: '上記に該当しないが月64時間以上', value: `${prefix}_employment_12`, points: 12 },
  { label: '求職中', value: `${prefix}_employment_jobseeking`, points: 9 },
];

/** 自営業（営業者本人） */
const selfEmployedOwnerOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_self_owner_none`, points: 0 },
  { label: '営業者本人・月20日以上・1日7.5時間以上', value: `${prefix}_self_owner_20`, points: 20 },
  { label: '営業者本人・月16日以上・1日4時間以上', value: `${prefix}_self_owner_15`, points: 15 },
  { label: '協力者・月20日以上・1日7.5時間以上', value: `${prefix}_self_helper_14`, points: 14 },
  { label: '協力者・月16日以上・1日4時間以上', value: `${prefix}_self_helper_12`, points: 12 },
  { label: '上記に該当しないが月64時間以上', value: `${prefix}_self_11`, points: 11 },
];

/** 内職 */
const pieceworkOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_piecework_none`, points: 0 },
  { label: '営業者本人・月20日以上・1日7.5時間以上', value: `${prefix}_piecework_owner_19`, points: 19 },
  { label: '営業者本人・月16日以上・1日4時間以上', value: `${prefix}_piecework_owner_15`, points: 15 },
  { label: '協力者・月20日以上・1日7.5時間以上', value: `${prefix}_piecework_helper_13`, points: 13 },
  { label: '協力者・月16日以上・1日4時間以上', value: `${prefix}_piecework_helper_11`, points: 11 },
  { label: '上記に該当しないが月64時間以上', value: `${prefix}_piecework_10`, points: 10 },
];

/** 出産 */
const childbirthOptions = (prefix: string, parentNum: 1 | 2) => {
  if (parentNum === 2) {
    return [
      { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
      { label: '出産予定', value: `${prefix}_childbirth_18`, points: 18 },
    ];
  }
  return [
    { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  ];
};

/** 疾病 */
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '障がい者または特定疾患の方', value: `${prefix}_illness_20a`, points: 20 },
  { label: '疾病により常時治療を要する（自宅で床に伏している）', value: `${prefix}_illness_20b`, points: 20 },
  { label: '精神・神経性の疾患で継続的治療が必要', value: `${prefix}_illness_18`, points: 18 },
  { label: '1か月以上の疾患で週3日以上の通院が必要', value: `${prefix}_illness_16`, points: 16 },
  { label: '医師の診断で安静が必要、または1か月以上の疾患で上記以外', value: `${prefix}_illness_12`, points: 12 },
];

/** 障がい */
const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '身体障害者1・2級 / 知的障害者手帳1・2度 / 精神手帳A等級', value: `${prefix}_disability_20`, points: 20 },
  { label: '身体障害者3・4級 / 知的障害者手帳3度 / 精神手帳B等級', value: `${prefix}_disability_16`, points: 16 },
  { label: '身体障害者5・6級 / 精神手帳C等級', value: `${prefix}_disability_12`, points: 12 },
];

/** 介護・看護 */
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: 'きょうだいの付添通園', value: `${prefix}_care_20`, points: 20 },
  { label: '同居の親族（祖父母・両親・きょうだい）の常時介護・看護', value: `${prefix}_care_16`, points: 16 },
  { label: '入院している親族の介護・看護（常時または部分的に必要な場合）', value: `${prefix}_care_14`, points: 14 },
];

/** 災害 */
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '自宅の災害復旧にあたっている', value: `${prefix}_disaster_20`, points: 20 },
];

/** 通学・職業訓練 */
const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '学校教育法に定める学校等に通学（通信制は除く）', value: `${prefix}_education_emp`, points: 0 },
  { label: '職業訓練施設にて訓練を受けている', value: `${prefix}_education_vocational`, points: 0 },
];

/** 不在 */
const absentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_absent_none`, points: 0 },
  { label: '行方不明者で行方不明または再び行方不明の恐れがある', value: `${prefix}_absent_20`, points: 20 },
];

/** DV */
const dvOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_dv_none`, points: 0 },
  { label: '配偶者からの暴力（DV）により子どもの保育が行えないことが明らかな場合', value: `${prefix}_dv_20`, points: 20 },
];

/** 育児休業 */
const childcareLeaveOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childcare_leave_none`, points: 0 },
  { label: '育児休業法に基づく育児休業（最年少児が1歳に達するまで）', value: `${prefix}_childcare_leave_4`, points: 4 },
];

// ---------------------------------------------------------------------------
// 保護者ごとの質問を生成するヘルパー
// ---------------------------------------------------------------------------

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1（父）' : '保護者2（母）';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: 'いちばん近いものをひとつ選んでください（複数該当する場合は主たる事由）',
    inputType: 'select',
    options: [
      { label: '会社勤め等で働いている', value: `${prefix}_reason_employment`, points: 0 },
      { label: '自営業（営業者本人・協力者）', value: `${prefix}_reason_self_employed`, points: 0 },
      { label: '内職', value: `${prefix}_reason_piecework`, points: 0 },
      { label: '妊娠・出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '病気にかかっている', value: `${prefix}_reason_illness`, points: 0 },
      { label: '障がいがある', value: `${prefix}_reason_disability`, points: 0 },
      { label: '家族の介護・看護をしている', value: `${prefix}_reason_care`, points: 0 },
      { label: '災害にあった', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '学校に通っている・職業訓練中', value: `${prefix}_reason_education`, points: 0 },
      { label: '行方不明・拘禁等', value: `${prefix}_reason_absent`, points: 0 },
      { label: 'DV（配偶者からの暴力）', value: `${prefix}_reason_dv`, points: 0 },
      { label: '育児休業中', value: `${prefix}_reason_childcare_leave`, points: 0 },
      // 基準指数表の就労区分「求職中」9点を適用（詳細質問なしで直接加点）
      { label: '仕事を探している', value: `${prefix}_reason_jobseeking`, points: 9 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}はどのくらい働いていますか？（会社勤め等）`,
      helpText: '就労日数と1日の就労時間で点数が決まります',
      inputType: 'radio',
      options: employmentOptions(prefix),
    },
    {
      id: `${prefix}_self_employed`,
      category,
      label: `${parentLabel}の自営業の状況は？`,
      helpText: '営業者本人か協力者かで点数が異なります',
      inputType: 'radio',
      options: selfEmployedOwnerOptions(prefix),
    },
    {
      id: `${prefix}_piecework`,
      category,
      label: `${parentLabel}の内職の状況は？`,
      inputType: 'radio',
      options: pieceworkOptions(prefix),
    },
    {
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}の妊娠・出産の状況は？`,
      inputType: 'radio',
      options: childbirthOptions(prefix, parentNum),
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
      label: `${parentLabel}の障がいの状況は？`,
      inputType: 'radio',
      options: disabilityOptions(prefix),
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
      label: `${parentLabel}は災害で保育が必要ですか？`,
      inputType: 'radio',
      options: disasterOptions(prefix),
    },
    {
      id: `${prefix}_education`,
      category,
      label: `${parentLabel}はどのような通学をしていますか？`,
      helpText: '通学・職業訓練の場合は就労に準じた点数が適用されます',
      inputType: 'radio',
      options: educationOptions(prefix),
    },
    {
      id: `${prefix}_absent`,
      category,
      label: `${parentLabel}は行方不明・拘禁等ですか？`,
      inputType: 'radio',
      options: absentOptions(prefix),
    },
    {
      id: `${prefix}_dv`,
      category,
      label: `${parentLabel}はDV被害を受けていますか？`,
      inputType: 'radio',
      options: dvOptions(prefix),
    },
    {
      id: `${prefix}_childcare_leave`,
      category,
      label: `${parentLabel}の育児休業の状況は？`,
      inputType: 'radio',
      options: childcareLeaveOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// ---------------------------------------------------------------------------
// 補正指数の質問
// ---------------------------------------------------------------------------

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親世帯ですか？',
    helpText: 'ひとり親手当等を受給している場合が対象です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい', value: 'adj_single_parent_yes', points: 22 },
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
    id: 'adj_pregnant_priority',
    category: 'adjustment',
    label: '妊娠等で優先入園中で、出産・産休理由のみの場合ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_pregnant_priority_no', points: 0 },
      { label: 'はい', value: 'adj_pregnant_priority_yes', points: 2 },
    ],
  },
  {
    id: 'adj_certification_change',
    category: 'adjustment',
    label: '1号→2号の認定変更の場合ですか？',
    helpText: '幼稚園・認定こども園の教育部分から保育部分への変更',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_certification_change_no', points: 0 },
      { label: 'はい', value: 'adj_certification_change_yes', points: 6 },
    ],
  },
  {
    id: 'adj_nursery_worker',
    category: 'adjustment',
    label: '保護者が市内の保育施設または幼稚園で正規・常勤として就労していますか？',
    helpText: '保育士・保育教諭・幼稚園教諭・看護的ケア等の保育に携わる勤務のみ',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_nursery_worker_no', points: 0 },
      { label: 'はい（正規・常勤）', value: 'adj_nursery_worker_yes', points: 6 },
    ],
  },
  {
    id: 'adj_nursery_worker_other',
    category: 'adjustment',
    label: '保護者が市内の保育施設または幼稚園で就労していますか？（正規・常勤以外）',
    helpText: '保育士・保育教諭・幼稚園教諭・看護的ケア等の保育に携わる勤務のみ',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_nursery_worker_other_no', points: 0 },
      { label: 'はい（正規・常勤以外）', value: 'adj_nursery_worker_other_yes', points: 6 },
    ],
  },
  {
    id: 'adj_current_facility',
    category: 'adjustment',
    label: '現在通っている施設を全て見学していますか？',
    inputType: 'radio',
    options: [
      { label: '該当しない', value: 'adj_current_facility_no', points: 0 },
      { label: 'はい', value: 'adj_current_facility_yes', points: 2 },
    ],
  },
  {
    id: 'adj_other_city',
    category: 'adjustment',
    label: '他の市区町村（管外）の保育施設に申込む場合ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_other_city_no', points: 0 },
      { label: 'はい', value: 'adj_other_city_yes', points: 2 },
    ],
  },
  {
    id: 'adj_grandparent_5months',
    category: 'adjustment',
    label: '祖父母等が同居で入園後5か月以内に退職予定ですか？（3歳以上児の新規入園に限る）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_grandparent_5months_no', points: 0 },
      { label: 'はい', value: 'adj_grandparent_5months_yes', points: -2 },
    ],
  },
  {
    id: 'adj_grandparent_8months',
    category: 'adjustment',
    label: '祖父母等が同居で入園後8か月以内に退職予定ですか？（3歳以上児の新規入園に限る）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_grandparent_8months_no', points: 0 },
      { label: 'はい', value: 'adj_grandparent_8months_yes', points: -4 },
    ],
  },
  {
    id: 'adj_grandparent_over8months',
    category: 'adjustment',
    label: '祖父母等が同居で退職予定が入園後8か月以降ですか？（3歳以上児の新規入園に限る）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_grandparent_over8months_no', points: 0 },
      { label: 'はい', value: 'adj_grandparent_over8months_yes', points: -6 },
    ],
  },
  {
    id: 'adj_future_employment',
    category: 'adjustment',
    label: '就労予定（通学予定を含む）で、保育施設等で就労する保育士等以外の場合ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_future_employment_no', points: 0 },
      { label: 'はい', value: 'adj_future_employment_yes', points: -3 },
    ],
  },
  {
    id: 'adj_declined_reapply',
    category: 'adjustment',
    label: '以前内定（辞退）や入所後都合（転園）で辞め、翌年度以降に再度申込む場合ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_declined_reapply_no', points: 0 },
      { label: 'はい', value: 'adj_declined_reapply_yes', points: -10 },
    ],
  },
  {
    id: 'adj_overdue_fees',
    category: 'adjustment',
    label: '現在保育料の滞納がありますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_overdue_fees_no', points: 0 },
      { label: 'はい', value: 'adj_overdue_fees_yes', points: -30 },
    ],
  },
  {
    id: 'adj_sibling_enrolled',
    category: 'adjustment',
    label: 'すでにきょうだいが在園していますか？（申込時点で在園の場合に限る）',
    helpText: '在園きょうだいがいる場合は同点時に優先されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_enrolled_no', points: 0 },
      { label: 'はい', value: 'adj_sibling_enrolled_yes', points: 0 },
    ],
  },
  {
    id: 'adj_sibling_new',
    category: 'adjustment',
    label: 'きょうだいと同時に新規入園の申込みをしますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_new_no', points: 0 },
      { label: 'はい', value: 'adj_sibling_new_yes', points: 7 },
    ],
  },
  {
    id: 'adj_special_needs',
    category: 'adjustment',
    label: '特別な支援を必要とする児童（統合保育対象児）ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_special_needs_no', points: 0 },
      { label: 'はい', value: 'adj_special_needs_yes', points: 8 },
    ],
  },
  {
    id: 'adj_sibling_double',
    category: 'adjustment',
    label: 'きょうだいが2組以上同時申込みですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_double_no', points: 0 },
      { label: 'はい', value: 'adj_sibling_double_yes', points: 2 },
    ],
  },
  {
    id: 'adj_small_nursery_graduate',
    category: 'adjustment',
    label: '0〜2歳児のみ保育する園（小規模・新制度）の卒園に伴い転園する場合ですか？',
    helpText: '2歳児クラスの児童が翌年度4月入園の途中で申し込む場合に限る',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_small_nursery_graduate_no', points: 0 },
      { label: 'はい', value: 'adj_small_nursery_graduate_yes', points: 10 },
    ],
  },
  {
    id: 'adj_medical_care',
    category: 'adjustment',
    label: '医療的ケア児ですか？（主治医に事前相談し、園の受け入れに目途が立っている場合に限る）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_medical_care_no', points: 0 },
      { label: 'はい', value: 'adj_medical_care_yes', points: 20 },
    ],
  },
];

// ---------------------------------------------------------------------------
// エクスポート
// ---------------------------------------------------------------------------

export const toyohashiData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
