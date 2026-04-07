import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 大津市 保育施設等利用調整基準データ
// 出典: 大津市「令和8年度 保育施設等利用調整基準」（別表）
// https://www.city.otsu.lg.jp/material/files/group/10/R8cyouseikijyunn.pdf
// ---------------------------------------------------------------------------
// 大津市は「基本表の点数（父母の低い方を採用）＋ 点数変更項目」方式。
// 基本表の最大は6点。点数変更項目は合計±2まで（ただし基本表6点の場合、加点上限なし）。
// 利用選考は保護者の点数が異なるときは低い方で判定。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'otsu',
  name: '大津市',
  slug: 'otsu',
  prefecture: '滋賀県',
  maxBasePoints: 6, // 父母各最大6点（低い方を採用）
  scoringMethod: 'min' as const,
} as const;

// ---------------------------------------------------------------------------
// 基本指数の選択肢テンプレート
// ---------------------------------------------------------------------------

/** 就労（就労内定含む） */
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月20日以上かつ日7時間以上', value: `${prefix}_employment_6`, points: 6 },
  { label: '月16日以上かつ日7時間以上', value: `${prefix}_employment_5`, points: 5 },
  { label: '月20日以上かつ日4時間以上7時間未満', value: `${prefix}_employment_4`, points: 4 },
  { label: '月16日以上かつ日4時間以上7時間未満', value: `${prefix}_employment_3`, points: 3 },
  { label: '上記に該当しない範囲の労働', value: `${prefix}_employment_2`, points: 2 },
];

/** 妊娠・出産 */
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '妊娠中または出産前後', value: `${prefix}_childbirth_6`, points: 6 },
];

/** 疾病・障害（入院） */
const illnessHospitalOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_hospital_none`, points: 0 },
  { label: '入院中', value: `${prefix}_illness_hospital_6`, points: 6 },
];

/** 疾病・障害（居宅療養） */
const illnessHomeOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_home_none`, points: 0 },
  { label: '入院相当の治療や安静を要し保育が常時困難', value: `${prefix}_illness_home_6`, points: 6 },
  { label: '頻繁な通院加療・常時安静を要し保育が常時困難', value: `${prefix}_illness_home_5`, points: 5 },
  { label: '通院加療を行い保育に支障がある', value: `${prefix}_illness_home_2`, points: 2 },
];

/** 疾病・障害（障害） */
const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '身体・精神・療育手帳の交付があり保育が著しく困難', value: `${prefix}_disability_6`, points: 6 },
  { label: '身体1級／精神1級／療育A　保育が困難', value: `${prefix}_disability_5`, points: 5 },
  { label: '身体2・3級／精神2級／療育B　保育が困難', value: `${prefix}_disability_3`, points: 3 },
  { label: '身体4級以下／精神3級　保育に支障がある', value: `${prefix}_disability_2`, points: 2 },
];

/** 介護・看護 */
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '重症者の同居親族を介護・看護（常時困難）', value: `${prefix}_care_6`, points: 6 },
  { label: '重症者の別居親族を介護・看護（常時困難）', value: `${prefix}_care_5`, points: 5 },
  { label: 'その他の親族の介護・看護で保育に支障がある', value: `${prefix}_care_2`, points: 2 },
];

/** 災害復旧 */
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '災害復旧に当たっている', value: `${prefix}_disaster_6`, points: 6 },
];

/** 就学（職業訓練含む） */
const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '月20日以上かつ日7時間以上の就学', value: `${prefix}_education_4`, points: 4 },
  { label: '月16日以上かつ日7時間以上の就学', value: `${prefix}_education_3`, points: 3 },
  { label: '上記に該当しない範囲の就学', value: `${prefix}_education_2`, points: 2 },
];

/** 求職活動 */
const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動中', value: `${prefix}_jobseeking_1`, points: 1 },
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
      { label: '仕事をしている（内定含む）', value: `${prefix}_reason_employment`, points: 0 },
      { label: '妊娠・出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '病気で入院中', value: `${prefix}_reason_illness_hospital`, points: 0 },
      { label: '病気で自宅療養中', value: `${prefix}_reason_illness_home`, points: 0 },
      { label: '障害がある', value: `${prefix}_reason_disability`, points: 0 },
      { label: '家族の介護をしている', value: `${prefix}_reason_care`, points: 0 },
      { label: '災害復旧', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '学校に通っている／職業訓練中', value: `${prefix}_reason_education`, points: 0 },
      { label: '仕事を探している', value: `${prefix}_reason_jobseeking`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}はどのくらい働いていますか？`,
      helpText: '休憩時間を除く実働時間で判定されます',
      inputType: 'radio',
      options: employmentOptions(prefix),
    },
    {
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}の出産の状況は？`,
      inputType: 'radio',
      options: childbirthOptions(prefix),
    },
    {
      id: `${prefix}_illness_hospital`,
      category,
      label: `${parentLabel}は入院中ですか？`,
      inputType: 'radio',
      options: illnessHospitalOptions(prefix),
    },
    {
      id: `${prefix}_illness_home`,
      category,
      label: `${parentLabel}の自宅療養の状況は？`,
      inputType: 'radio',
      options: illnessHomeOptions(prefix),
    },
    {
      id: `${prefix}_disability`,
      category,
      label: `${parentLabel}の障害の程度は？`,
      inputType: 'radio',
      options: disabilityOptions(prefix),
    },
    {
      id: `${prefix}_care`,
      category,
      label: `${parentLabel}はどのくらい介護していますか？`,
      helpText: '同居・別居で点数が異なります',
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
      id: `${prefix}_education`,
      category,
      label: `${parentLabel}はどのくらい学校に通っていますか？`,
      helpText: '職業訓練も含みます',
      inputType: 'radio',
      options: educationOptions(prefix),
    },
    {
      id: `${prefix}_jobseeking`,
      category,
      label: `${parentLabel}は求職活動をしていますか？`,
      inputType: 'radio',
      options: jobSeekingOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// ---------------------------------------------------------------------------
// 点数変更項目（調整指数）
// ---------------------------------------------------------------------------

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親世帯ですか？',
    helpText: 'ひとり親世帯等（里親委託を含む）の場合に加点されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい', value: 'adj_single_parent_yes', points: 2 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯ですか？',
    helpText: '生活保護受給世帯で就労等により保育施設の利用が必要と判断される場合',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい', value: 'adj_welfare_yes', points: 2 },
    ],
  },
  {
    id: 'adj_parental_leave',
    category: 'adjustment',
    label: '産休・育休から職場復帰しますか？',
    helpText: '休業終了により職場復帰する場合（復帰する職場が決まっている場合に限る）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_parental_leave_no', points: 0 },
      { label: 'はい', value: 'adj_parental_leave_yes', points: 1 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: '希望する保育施設にきょうだいが通っていますか？',
    helpText: '希望する保育施設を兄弟姉妹が既に利用している場合',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_no', points: 0 },
      { label: 'はい', value: 'adj_sibling_yes', points: 2 },
    ],
  },
  {
    id: 'adj_sibling_simultaneous',
    category: 'adjustment',
    label: 'きょうだいと同時に同じ認可保育所に新規申込しますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_simultaneous_no', points: 0 },
      { label: 'はい', value: 'adj_sibling_simultaneous_yes', points: 1 },
    ],
  },
  {
    id: 'adj_twins',
    category: 'adjustment',
    label: '申込児童は多胎児（双子等）ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_twins_no', points: 0 },
      { label: 'はい', value: 'adj_twins_yes', points: 1 },
    ],
  },
  {
    id: 'adj_single_assignment',
    category: 'adjustment',
    label: '単身赴任中ですか？',
    helpText: '保護者のいずれかが単身赴任している場合',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_assignment_no', points: 0 },
      { label: 'はい', value: 'adj_single_assignment_yes', points: 1 },
    ],
  },
  {
    id: 'adj_preschool_home',
    category: 'adjustment',
    label: '申込児童以外の就学前児童を自宅保育していますか？',
    helpText: '該当する場合は減点となります',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_preschool_home_no', points: 0 },
      { label: 'はい', value: 'adj_preschool_home_yes', points: -1 },
    ],
  },
  {
    id: 'adj_self_employed',
    category: 'adjustment',
    label: '自営業で提出資料が本人または親族による経営先の就労証明書のみですか？',
    helpText: '該当する場合は減点となります',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_self_employed_no', points: 0 },
      { label: 'はい', value: 'adj_self_employed_yes', points: -1 },
    ],
  },
  {
    id: 'adj_nursery_worker',
    category: 'adjustment',
    label: '保育士資格を有し、大津市内の保育施設で就労しますか？',
    helpText: '父母のいずれかが保育士資格を有し、管内の保育施設で就労する場合（転園申請を除く）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_nursery_worker_no', points: 0 },
      { label: 'はい', value: 'adj_nursery_worker_yes', points: 1 },
    ],
  },
  {
    id: 'adj_jobseeking_breadwinner',
    category: 'adjustment',
    label: '主たる生計者が求職活動中ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_jobseeking_breadwinner_no', points: 0 },
      { label: 'はい', value: 'adj_jobseeking_breadwinner_yes', points: 2 },
    ],
  },
  {
    id: 'adj_3yo_continuation',
    category: 'adjustment',
    label: '在籍施設が2歳児クラスまでで、3歳児以降の継続利用を希望しますか？',
    helpText: '児童の在籍する保育施設・企業主導型保育施設が2歳児クラスまでしかなく、3歳児以降も保育施設の利用を希望する場合',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_3yo_continuation_no', points: 0 },
      { label: 'はい', value: 'adj_3yo_continuation_yes', points: 2 },
    ],
  },
  {
    id: 'adj_transfer',
    category: 'adjustment',
    label: '転入・転居等により現在の保育施設に通うことが適当でないですか？',
    helpText: '転入、転居等により現在利用中の保育施設に通うことが適当でないと判断される場合',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_transfer_no', points: 0 },
      { label: 'はい', value: 'adj_transfer_yes', points: 1 },
    ],
  },
];

// ---------------------------------------------------------------------------
// エクスポート
// ---------------------------------------------------------------------------

export const otsuData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
