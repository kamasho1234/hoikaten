import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 下関市 保育園入園 基準指数・調整指数データ
// 出典：下関市保育施設入所児童の利用調整に関する要領（令和6年11月1日改正、令和7年4月～適用）
// https://www.city.shimonoseki.lg.jp/soshiki/45/4626.html
// PDF: https://www.city.shimonoseki.lg.jp/uploaded/attachment/87091.pdf
// ---------------------------------------------------------------------------
//
// 下関市の利用調整は以下のように算出されます。
//   選考指数 ＝ 基準指数（父母いずれか低い方） ＋ 調整指数
// 父母がいる場合は「いずれか低い方の点数」を基準指数とします。
// 就労時間は休憩時間を含む月の総時間で判定されます。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'shimonoseki',
  name: '下関市',
  slug: 'shimonoseki',
  prefecture: '山口県',
  maxBasePoints: 10, // 父母いずれか低い方。就労等の最大は10点
  scoringMethod: 'min' as const, // 父母いずれか低い方を採用
} as const;

// ---------------------------------------------------------------------------
// 就労（休憩時間を含む）
// ---------------------------------------------------------------------------

const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月170時間以上', value: `${prefix}_employment_10`, points: 10 },
  { label: '月150時間以上170時間未満', value: `${prefix}_employment_9`, points: 9 },
  { label: '月130時間以上150時間未満', value: `${prefix}_employment_8`, points: 8 },
  { label: '月110時間以上130時間未満', value: `${prefix}_employment_7`, points: 7 },
  { label: '月90時間以上110時間未満', value: `${prefix}_employment_6`, points: 6 },
  { label: '月70時間以上90時間未満', value: `${prefix}_employment_5`, points: 5 },
  { label: '月52時間以上70時間未満', value: `${prefix}_employment_4`, points: 4 },
];

// ---------------------------------------------------------------------------
// 内職
// ---------------------------------------------------------------------------

const homeworkOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_homework_none`, points: 0 },
  { label: '月130時間以上', value: `${prefix}_homework_6`, points: 6 },
  { label: '月52時間以上130時間未満', value: `${prefix}_homework_4`, points: 4 },
];

// ---------------------------------------------------------------------------
// 妊娠・出産
// ---------------------------------------------------------------------------

const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産（予定）月とその前後2か月', value: `${prefix}_childbirth_10`, points: 10 },
];

// ---------------------------------------------------------------------------
// 疾病等
// ---------------------------------------------------------------------------

const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院', value: `${prefix}_illness_10a`, points: 10 },
  { label: '自宅療養（常時病臥又は精神疾患等）', value: `${prefix}_illness_10b`, points: 10 },
  { label: '自宅療養（上記以外）', value: `${prefix}_illness_6`, points: 6 },
];

// ---------------------------------------------------------------------------
// 障害
// ---------------------------------------------------------------------------

const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '1級・2級障害者', value: `${prefix}_disability_10`, points: 10 },
  { label: '3級・4級障害者', value: `${prefix}_disability_8`, points: 8 },
  { label: '上記以外の障害', value: `${prefix}_disability_4`, points: 4 },
];

// ---------------------------------------------------------------------------
// 介護・看護（休憩時間を含む）
// ---------------------------------------------------------------------------

const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '居宅外で月130時間以上', value: `${prefix}_care_10`, points: 10 },
  { label: '居宅外で月52時間以上', value: `${prefix}_care_6`, points: 6 },
  { label: '居宅内で月130時間以上', value: `${prefix}_care_8`, points: 8 },
  { label: '居宅内で月52時間以上', value: `${prefix}_care_4`, points: 4 },
];

// ---------------------------------------------------------------------------
// 災害復旧
// ---------------------------------------------------------------------------

const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '居宅を失い又は大破し復旧にあたる', value: `${prefix}_disaster_10`, points: 10 },
];

// ---------------------------------------------------------------------------
// 求職活動
// ---------------------------------------------------------------------------

const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: 'ひとり親世帯で求職中', value: `${prefix}_jobseeking_6`, points: 6 },
  { label: '求職中', value: `${prefix}_jobseeking_3`, points: 3 },
];

// ---------------------------------------------------------------------------
// 就学（休憩時間を含む）
// ---------------------------------------------------------------------------

const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '月130時間以上', value: `${prefix}_education_8`, points: 8 },
  { label: '月52時間以上130時間未満', value: `${prefix}_education_4`, points: 4 },
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
    helpText: '下関市では父母いずれか低い方の基準指数を選考指数とします。就労時間は休憩時間を含みます。',
    inputType: 'select',
    options: [
      { label: '仕事をしている（内職を除く）', value: `${prefix}_reason_employment`, points: 0 },
      { label: '仕事をしている（内職）', value: `${prefix}_reason_homework`, points: 0 },
      { label: '妊娠・出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '疾病等', value: `${prefix}_reason_illness`, points: 0 },
      { label: '障害', value: `${prefix}_reason_disability`, points: 0 },
      { label: '介護・看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '災害復旧', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '仕事を探している', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '学校に通っている', value: `${prefix}_reason_education`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の就労時間（月あたり）は？`,
      helpText: '休憩時間を含む月の総時間で判定されます',
      inputType: 'radio',
      options: employmentOptions(prefix),
    },
    {
      id: `${prefix}_homework`,
      category,
      label: `${parentLabel}の内職の時間（月あたり）は？`,
      helpText: '内職は就労（被雇用・自営）より基準指数が低くなります',
      inputType: 'radio',
      options: homeworkOptions(prefix),
    },
    {
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}の出産の状況は？`,
      helpText: '出産（予定）月とその前後2か月が対象です',
      inputType: 'radio',
      options: childbirthOptions(prefix),
    },
    {
      id: `${prefix}_illness`,
      category,
      label: `${parentLabel}の疾病等の状況は？`,
      helpText: '入院・自宅療養の状況に応じて点数が決まります',
      inputType: 'radio',
      options: illnessOptions(prefix),
    },
    {
      id: `${prefix}_disability`,
      category,
      label: `${parentLabel}の障害の状況は？`,
      helpText: '障害者手帳の等級に応じて点数が決まります',
      inputType: 'radio',
      options: disabilityOptions(prefix),
    },
    {
      id: `${prefix}_care`,
      category,
      label: `${parentLabel}の介護・看護の状況は？`,
      helpText: '休憩時間を含む月の総時間と、居宅内外で判定されます',
      inputType: 'radio',
      options: careOptions(prefix),
    },
    {
      id: `${prefix}_disaster`,
      category,
      label: `${parentLabel}は災害復旧に該当しますか？`,
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
      label: `${parentLabel}の就学時間（月あたり）は？`,
      helpText: '休憩時間を含む月の総時間で判定されます',
      inputType: 'radio',
      options: educationOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// ---------------------------------------------------------------------------
// 調整指数の質問
// ---------------------------------------------------------------------------

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_tenpai',
    category: 'adjustment',
    label: '保育施設の統廃合により転園しなければならないですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_tenpai_no', points: 0 },
      { label: 'はい（+10）', value: 'adj_tenpai_yes', points: 10 },
    ],
  },
  {
    id: 'adj_ikukyu_taien',
    category: 'adjustment',
    label: '育児休業延長が原因で退園した保育施設への再入園を希望しますか？',
    helpText: '育児休業対象児童が入所保留となったことによる育休延長が原因で退園した園への再入園の場合+5点',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_ikukyu_taien_no', points: 0 },
      { label: 'はい（+5）', value: 'adj_ikukyu_taien_yes', points: 5 },
    ],
  },
  {
    id: 'adj_sainyuen',
    category: 'adjustment',
    label: '里帰り出産や児童の長期入院等が原因で退園した保育施設への再入園を希望しますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sainyuen_no', points: 0 },
      { label: 'はい（+5）', value: 'adj_sainyuen_yes', points: 5 },
    ],
  },
  {
    id: 'adj_iryouteki_care',
    category: 'adjustment',
    label: '下関市が指定する保育施設に医療的ケア児として入園を希望しますか？',
    helpText: '保育施設での保育が必要かつ集団保育が可能な場合に限ります',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_iryouteki_care_no', points: 0 },
      { label: 'はい（+5）', value: 'adj_iryouteki_care_yes', points: 5 },
    ],
  },
  {
    id: 'adj_child_disability',
    category: 'adjustment',
    label: '入園希望児童が障害を有していますか？',
    helpText: '保育施設での保育が必要かつ集団保育が可能な場合に限り+2点',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_child_disability_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_child_disability_yes', points: 2 },
    ],
  },
  {
    id: 'adj_parents_absent',
    category: 'adjustment',
    label: '両親ともに不存在ですか？',
    helpText: '死亡、行方不明、拘禁等の場合+4点',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_parents_absent_no', points: 0 },
      { label: 'はい（+4）', value: 'adj_parents_absent_yes', points: 4 },
    ],
  },
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親家庭ですか？',
    helpText: '祖父母と同居していない場合+4点、同居している場合+2点',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'ひとり親で祖父母と同居していない（+4）', value: 'adj_single_parent_4', points: 4 },
      { label: 'ひとり親で祖父母と同居している（+2）', value: 'adj_single_parent_2', points: 2 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護を受給していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_welfare_yes', points: 1 },
    ],
  },
  {
    id: 'adj_tanshin_funin',
    category: 'adjustment',
    label: '両親の一方が単身赴任等により別居していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_tanshin_funin_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_tanshin_funin_yes', points: 1 },
    ],
  },
  {
    id: 'adj_katei_hoiku',
    category: 'adjustment',
    label: '申込児童以外の就学前児童を特別な理由なく家庭で保育していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_katei_hoiku_no', points: 0 },
      { label: 'はい（-1）', value: 'adj_katei_hoiku_yes', points: -1 },
    ],
  },
  {
    id: 'adj_grandparent',
    category: 'adjustment',
    label: '65歳未満の祖父母と同居しており、祖父母が保育の必要事由に該当しませんか？',
    helpText: '祖父母が65歳未満で保育を必要とする事由に該当しない場合-3点',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_grandparent_no', points: 0 },
      { label: 'はい（-3）', value: 'adj_grandparent_yes', points: -3 },
    ],
  },
  {
    id: 'adj_tainou',
    category: 'adjustment',
    label: '過年度分の保育料等を正当な理由なく滞納していますか？',
    helpText: '分納誓約を履行している場合を除き-5点',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_tainou_no', points: 0 },
      { label: 'はい（-5）', value: 'adj_tainou_yes', points: -5 },
    ],
  },
  {
    id: 'adj_childcare_worker',
    category: 'adjustment',
    label: '保護者が保育士又は保育教諭として保育施設に勤務（予定含む）していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_childcare_worker_no', points: 0 },
      { label: 'はい（+4）', value: 'adj_childcare_worker_yes', points: 4 },
    ],
  },
  {
    id: 'adj_ikukyu_fukki',
    category: 'adjustment',
    label: '育児休業から復帰しますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_ikukyu_fukki_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_ikukyu_fukki_yes', points: 2 },
    ],
  },
  {
    id: 'adj_kyotaku_kinmu',
    category: 'adjustment',
    label: '居宅内又は居宅と同一敷地内の店舗で勤務し、接客・危険物取扱いがない場合に該当しますか？',
    helpText: '内職を除きます。店舗接客や危険物の取扱いがある場合は該当しません',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_kyotaku_kinmu_no', points: 0 },
      { label: 'はい（-2）', value: 'adj_kyotaku_kinmu_yes', points: -2 },
    ],
  },
  {
    id: 'adj_tsushin_gakushu',
    category: 'adjustment',
    label: '通信講座により就学していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_tsushin_gakushu_no', points: 0 },
      { label: 'はい（-2）', value: 'adj_tsushin_gakushu_yes', points: -2 },
    ],
  },
  {
    id: 'adj_sibling_same',
    category: 'adjustment',
    label: '兄弟姉妹が在籍している保育施設への入園を希望しますか？',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_sibling_same_no', points: 0 },
      { label: 'はい（+3）', value: 'adj_sibling_same_yes', points: 3 },
    ],
  },
  {
    id: 'adj_sibling_other',
    category: 'adjustment',
    label: '兄弟姉妹が在籍している保育施設以外の保育施設への入園を希望しますか？',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_sibling_other_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_sibling_other_yes', points: 2 },
    ],
  },
  {
    id: 'adj_sibling_simultaneous',
    category: 'adjustment',
    label: '兄弟姉妹が同時に保育施設への入園を希望しますか？',
    helpText: '3人目以降は1人増えるごとに更に1点加点',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_simultaneous_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_sibling_simultaneous_yes', points: 1 },
      { label: 'はい（3人同時、+2）', value: 'adj_sibling_simultaneous_3', points: 2 },
      { label: 'はい（4人以上同時、+3）', value: 'adj_sibling_simultaneous_4', points: 3 },
    ],
  },
];

// ---------------------------------------------------------------------------
// エクスポート
// ---------------------------------------------------------------------------

export const shimonosekiData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
