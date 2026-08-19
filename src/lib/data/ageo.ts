import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 上尾市 保育園入園 基本指数・調整指数データ
//
// 出典: 上尾市保育課「令和8年度 利用調整基準点数表」
//       https://www.city.ageo.lg.jp/uploaded/attachment/113214.pdf
//       （上尾市Webサイト「保育施設の利用申込について」からリンク）
//
// 2026-08-19: 従来のデータは他自治体と同じ点数配列のテンプレート（推定値）だったため、
//             上記の公式点数表を読み取って全面的に置き換えた。
//             公式の基本点は最大12点で、旧データ（最大20点）とは体系が異なる。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'ageo',
  name: '上尾市',
  slug: 'ageo',
  prefecture: '埼玉県',
  maxBasePoints: 30, // 父母各15点（基本点12点＋勤務状況の加算3点）
} as const;

// ---------------------------------------------------------------------------
// 基本点（勤務状況・勤務以外）。父母それぞれについて選ぶ
// ---------------------------------------------------------------------------

/** 就労（※休憩を含む1日の拘束時間で判定） */
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '単身赴任', value: `${prefix}_employment_10`, points: 10 },
  { label: '月160時間以上', value: `${prefix}_employment_8`, points: 8 },
  { label: '月140時間以上160時間未満', value: `${prefix}_employment_7`, points: 7 },
  { label: '月120時間以上140時間未満', value: `${prefix}_employment_6`, points: 6 },
  { label: '月100時間以上120時間未満', value: `${prefix}_employment_5`, points: 5 },
  { label: '月80時間以上100時間未満', value: `${prefix}_employment_4`, points: 4 },
  { label: '月64時間以上80時間未満', value: `${prefix}_employment_3`, points: 3 },
];

/** 就労の加算（勤務日数など） */
const employmentBonusOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_empbonus_none`, points: 0 },
  { label: '月20日（週5日）以上勤務', value: `${prefix}_empbonus_2`, points: 2 },
  { label: '月16日（週4日）以上勤務', value: `${prefix}_empbonus_1`, points: 1 },
];

/** 求職中 */
const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '勤務先内定（月64時間以上の稼動）', value: `${prefix}_jobseeking_3`, points: 3 },
  { label: '勤務先未定', value: `${prefix}_jobseeking_1`, points: 1 },
];

/** 疾病 */
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '病気入院（1ヶ月以上）', value: `${prefix}_illness_12`, points: 12 },
  { label: '常時臥床・指定難病', value: `${prefix}_illness_12b`, points: 12 },
  { label: '上記以外の疾病', value: `${prefix}_illness_8`, points: 8 },
];

/** 障害（身体・精神・知的） */
const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '身体障害1・2級', value: `${prefix}_disability_body12`, points: 12 },
  { label: '身体障害3級', value: `${prefix}_disability_body10`, points: 10 },
  { label: '身体障害（上記以外）', value: `${prefix}_disability_body8`, points: 8 },
  { label: '精神障害1級', value: `${prefix}_disability_mental12`, points: 12 },
  { label: '精神障害2級', value: `${prefix}_disability_mental10`, points: 10 },
  { label: '精神障害3級', value: `${prefix}_disability_mental8`, points: 8 },
  { label: '知的障害Ⓐ・A・B', value: `${prefix}_disability_iq12`, points: 12 },
  { label: '知的障害C', value: `${prefix}_disability_iq10`, points: 10 },
];

/** 同居者の介護 */
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '要介護3〜5の同居者を介護', value: `${prefix}_care_11`, points: 11 },
  { label: '要介護2の同居者を介護', value: `${prefix}_care_9`, points: 9 },
  { label: '要介護1の同居者を介護', value: `${prefix}_care_7`, points: 7 },
];

/** 同居者の看護 */
const nursingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_nursing_none`, points: 0 },
  { label: '重度者の介護（身体1・2級、療育Ⓐ・A・B）', value: `${prefix}_nursing_11`, points: 11 },
  { label: '中度者の介護（身体3級、療育C）', value: `${prefix}_nursing_9`, points: 9 },
  { label: '常時入院付添（1ヶ月以上）', value: `${prefix}_nursing_8`, points: 8 },
  { label: '上記以外の看護', value: `${prefix}_nursing_7`, points: 7 },
];

/** 出産 */
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産予定（産前産後）', value: `${prefix}_childbirth_11`, points: 11 },
];

/** 就学 */
const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '月64時間以上の就学', value: `${prefix}_education_5`, points: 5 },
];

/** その他（災害復旧・離婚等） */
const otherOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_other_none`, points: 0 },
  { label: '災害復旧', value: `${prefix}_other_15`, points: 15 },
  { label: '離婚・死亡・行方不明（調停中・拘禁中を含む）', value: `${prefix}_other_10`, points: 10 },
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
      { label: '仕事を探している', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '出産の前後', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '病気の治療中', value: `${prefix}_reason_illness`, points: 0 },
      { label: '障害がある', value: `${prefix}_reason_disability`, points: 0 },
      { label: '同居家族を介護している', value: `${prefix}_reason_care`, points: 0 },
      { label: '同居家族を看護している', value: `${prefix}_reason_nursing`, points: 0 },
      { label: '学校に通っている', value: `${prefix}_reason_education`, points: 0 },
      { label: 'その他（災害復旧・離婚等）', value: `${prefix}_reason_other`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}はどのくらい働いていますか？`,
      helpText: '休憩を含む1日の拘束時間で、月あたりの合計を選んでください',
      inputType: 'radio',
      options: employmentOptions(prefix),
    },
    {
      id: `${prefix}_empbonus`,
      category,
      // 「仕事をしている」を選んだときだけ表示する（就労の加算）
      showFor: ['employment'],
      label: `${parentLabel}の勤務日数は？`,
      helpText: '就労している場合、日数に応じて加算されます',
      inputType: 'radio',
      options: employmentBonusOptions(prefix),
    },
    {
      id: `${prefix}_jobseeking`,
      category,
      label: `${parentLabel}の求職の状況は？`,
      inputType: 'radio',
      options: jobSeekingOptions(prefix),
    },
    {
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}の出産時期は？`,
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
      label: `${parentLabel}の障害の程度は？`,
      inputType: 'radio',
      options: disabilityOptions(prefix),
    },
    {
      id: `${prefix}_care`,
      category,
      label: `${parentLabel}が介護している同居家族の状態は？`,
      inputType: 'radio',
      options: careOptions(prefix),
    },
    {
      id: `${prefix}_nursing`,
      category,
      label: `${parentLabel}が看護している同居家族の状態は？`,
      inputType: 'radio',
      options: nursingOptions(prefix),
    },
    {
      id: `${prefix}_education`,
      category,
      label: `${parentLabel}は学校に通っていますか？`,
      inputType: 'radio',
      options: educationOptions(prefix),
    },
    {
      id: `${prefix}_other`,
      category,
      label: `${parentLabel}にその他の事情はありますか？`,
      inputType: 'radio',
      options: otherOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// ---------------------------------------------------------------------------
// 保育加点（現在の保育状況）と調整加点
// ---------------------------------------------------------------------------

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親家庭ですか？',
    helpText: '同居家族の有無で点数が変わります',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'ひとり親（同居家族なし・祖父母不在）', value: 'adj_single_parent_25', points: 25 },
      { label: 'ひとり親（同居家族あり）', value: 'adj_single_parent_20', points: 20 },
    ],
  },
  {
    id: 'adj_childcare_status',
    category: 'adjustment',
    label: '今どこにお子さんを預けていますか？',
    helpText: '申込時点の保育状況に応じて加点されます（保育加点）',
    inputType: 'radio',
    options: [
      { label: '預けていない', value: 'adj_childcare_none', points: 0 },
      { label: '在籍施設の廃園・休園・受け入れ停止で預け先がない', value: 'adj_childcare_30', points: 30 },
      { label: '施設入所（乳児院・養護施設）', value: 'adj_childcare_10', points: 10 },
      { label: '地域型保育施設の新年度3歳児クラス（4月入所選考のみ）', value: 'adj_childcare_10b', points: 10 },
      { label: '産後に下の子の育休取得で自主退所した', value: 'adj_childcare_8', points: 8 },
      { label: '市外の認可保育施設', value: 'adj_childcare_6', points: 6 },
      { label: '認可外・企業主導型・家庭保育室・職場託児所・ベビーシッター', value: 'adj_childcare_4', points: 4 },
      { label: '幼稚園・認定こども園', value: 'adj_childcare_4b', points: 4 },
      { label: '同伴就労（職場に連れて行っている）', value: 'adj_childcare_4c', points: 4 },
      { label: '一時保育（月8日以上の利用）', value: 'adj_childcare_3', points: 3 },
      { label: '産休・育休中', value: 'adj_childcare_3b', points: 3 },
      { label: '友人・知人が保育', value: 'adj_childcare_3c', points: 3 },
      { label: '別居の親族が保育', value: 'adj_childcare_2', points: 2 },
      { label: '同居の親族が保育', value: 'adj_childcare_1', points: 1 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: '未就学のきょうだいはいますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_no', points: 0 },
      { label: 'きょうだいが在園する施設を第一希望にする', value: 'adj_sibling_3', points: 3 },
      { label: '未就学のきょうだいがいる（上記以外）', value: 'adj_sibling_1', points: 1 },
    ],
  },
  {
    id: 'adj_many_children',
    category: 'adjustment',
    label: '義務教育課程以下のお子さんが3人以上いますか？',
    helpText: '4人目以降は1人につき1点加算されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_many_children_no', points: 0 },
      { label: 'はい', value: 'adj_many_children_yes', points: 2 },
    ],
  },
  {
    id: 'adj_multiple_birth',
    category: 'adjustment',
    label: '多胎児（双子など）ですか？',
    helpText: '多胎児のきょうだいは就学前まで加点対象です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_multiple_birth_no', points: 0 },
      { label: 'はい', value: 'adj_multiple_birth_yes', points: 2 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護を受けていますか？',
    helpText: '原則として再入園時を除きます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい', value: 'adj_welfare_yes', points: 10 },
    ],
  },
  {
    id: 'adj_nursery_teacher',
    category: 'adjustment',
    label: '保護者は市内の認可保育施設で働く保育士ですか？',
    helpText: '内定・復職予定を含み、保育士証の写しを提出した場合。看護師等は保育業務に従事すると明記されている場合に限ります',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_nursery_teacher_no', points: 0 },
      { label: 'はい', value: 'adj_nursery_teacher_yes', points: 10 },
    ],
  },
  {
    id: 'adj_transfer',
    category: 'adjustment',
    label: '市内の認可保育施設からの転園ですか？',
    helpText: '送迎距離やきょうだいの状況に応じて加点されます（保育状況の加算は計算しません）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_transfer_no', points: 0 },
      { label: 'きょうだいが別々の保育所に通っている', value: 'adj_transfer_5', points: 5 },
      { label: '送迎が片道6km以上', value: 'adj_transfer_4', points: 4 },
      { label: '送迎が片道4km以上6km未満', value: 'adj_transfer_3', points: 3 },
      { label: '送迎が片道2km以上4km未満', value: 'adj_transfer_2', points: 2 },
    ],
  },
  {
    id: 'adj_grandparent',
    category: 'adjustment',
    label: '同居している65歳未満の祖父母が保育の要件を満たしていませんか？',
    helpText: '就労等の要件を満たさない祖父母と同居している場合は減点されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ（該当しない）', value: 'adj_grandparent_no', points: 0 },
      { label: 'はい', value: 'adj_grandparent_yes', points: -1 },
    ],
  },
  {
    id: 'adj_cancel',
    category: 'adjustment',
    label: '入所決定後に保護者の都合でキャンセルしたことがありますか？',
    helpText: '1回につき減点され、翌年度4月まで適用されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_cancel_no', points: 0 },
      { label: 'はい', value: 'adj_cancel_yes', points: -10 },
    ],
  },
  {
    id: 'adj_arrears',
    category: 'adjustment',
    label: '保育料・給食費の滞納がありますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_arrears_no', points: 0 },
      { label: '1か月以上', value: 'adj_arrears_5', points: -5 },
      { label: '3か月以上', value: 'adj_arrears_10', points: -10 },
      { label: '6か月以上', value: 'adj_arrears_20', points: -20 },
      { label: '1年以上', value: 'adj_arrears_30', points: -30 },
    ],
  },
];

// ---------------------------------------------------------------------------
// エクスポート
// ---------------------------------------------------------------------------

export const ageoData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
