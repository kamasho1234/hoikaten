import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 西条市 保育の実施取扱規程 利用調整基準表
// 出典: 西条市保育の実施取扱規程（別表第1・別表第2）
// https://www1.g-reiki.net/city.saijo.ehime/reiki_honbun/r039RG00001011.html
// ---------------------------------------------------------------------------
// sum方式。保護者それぞれの基本指数（最高1項目のみ）を合算。父母各最大10点。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'saijo',
  name: '西条市',
  slug: 'saijo',
  prefecture: '愛媛県',
  maxBasePoints: 20,
} as const;

const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月160時間以上（10点）', value: `${prefix}_employment_10`, points: 10 },
  { label: '月140時間以上160時間未満（9点）', value: `${prefix}_employment_9`, points: 9 },
  { label: '月120時間以上140時間未満（8点）', value: `${prefix}_employment_8`, points: 8 },
  { label: '月80時間以上120時間未満（7点）', value: `${prefix}_employment_7`, points: 7 },
  { label: '月64時間以上80時間未満（6点）', value: `${prefix}_employment_6`, points: 6 },
];

const selfEmployedOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_selfemployed_none`, points: 0 },
  { label: '月160時間以上（8点）', value: `${prefix}_selfemployed_8`, points: 8 },
  { label: '月140時間以上160時間未満（7点）', value: `${prefix}_selfemployed_7`, points: 7 },
  { label: '月120時間以上140時間未満（6点）', value: `${prefix}_selfemployed_6`, points: 6 },
  { label: '月80時間以上120時間未満（5点）', value: `${prefix}_selfemployed_5`, points: 5 },
  { label: '月64時間以上80時間未満（4点）', value: `${prefix}_selfemployed_4`, points: 4 },
];

const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院1か月以上（10点）', value: `${prefix}_illness_10a`, points: 10 },
  { label: '自宅療養・寝たきり（10点）', value: `${prefix}_illness_10b`, points: 10 },
  { label: '精神疾患（8点）', value: `${prefix}_illness_8`, points: 8 },
  { label: '定期的通院（5点）', value: `${prefix}_illness_5`, points: 5 },
];

const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '身体1・2級、療育A、精神1・2級（10点）', value: `${prefix}_disability_10`, points: 10 },
  { label: '身体3級以下、療育B、精神3級（8点）', value: `${prefix}_disability_8`, points: 8 },
];

const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '入院中の家族に常時付添い（10点）', value: `${prefix}_care_10`, points: 10 },
  { label: '自宅療養の家族介護・自立不可能（7点）', value: `${prefix}_care_7`, points: 7 },
  { label: '入院中の家族にその他付添い（5点）', value: `${prefix}_care_5`, points: 5 },
  { label: '自宅療養の家族介護・その他（3点）', value: `${prefix}_care_3`, points: 3 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: '最も該当するものをひとつ選んでください（最高1項目のみ適用）',
    inputType: 'select',
    options: [
      { label: '就労（雇用）', value: `${prefix}_reason_employment`, points: 0 },
      { label: '自営業協力者', value: `${prefix}_reason_selfemployed`, points: 0 },
      { label: '内職（月64時間以上）（4点）', value: `${prefix}_reason_piecework`, points: 4 },
      { label: '妊娠・出産（8点）', value: `${prefix}_reason_childbirth`, points: 8 },
      { label: '疾病・負傷', value: `${prefix}_reason_illness`, points: 0 },
      { label: '障害', value: `${prefix}_reason_disability`, points: 0 },
      { label: '同居親族の介護・看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '災害復旧（10点）', value: `${prefix}_reason_disaster`, points: 10 },
      { label: '求職活動中（未定）（2点）', value: `${prefix}_reason_jobseeking`, points: 2 },
      { label: '就学・技能取得', value: `${prefix}_reason_education`, points: 0 },
      { label: '虐待・DVのおそれ（10点）', value: `${prefix}_reason_abuse`, points: 10 },
      { label: '離婚・死別・行方不明等（15点）', value: `${prefix}_reason_absent`, points: 15 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の就労時間は？（雇用の場合）`,
      inputType: 'radio',
      options: employmentOptions(prefix),
    },
    {
      id: `${prefix}_selfemployed`,
      category,
      label: `${parentLabel}の就労時間は？（自営業協力者の場合）`,
      inputType: 'radio',
      options: selfEmployedOptions(prefix),
    },
    {
      id: `${prefix}_education`,
      category,
      label: `${parentLabel}の就学・技能取得の状況は？`,
      helpText: '就労と同じ指数を適用',
      inputType: 'radio',
      options: [
        { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
        { label: '月160時間以上（10点）', value: `${prefix}_education_10`, points: 10 },
        { label: '月140時間以上（9点）', value: `${prefix}_education_9`, points: 9 },
        { label: '月120時間以上（8点）', value: `${prefix}_education_8`, points: 8 },
        { label: '月80時間以上（7点）', value: `${prefix}_education_7`, points: 7 },
        { label: '月64時間以上（6点）', value: `${prefix}_education_6`, points: 6 },
      ],
    },
    {
      id: `${prefix}_illness`,
      category,
      label: `${parentLabel}の疾病・負傷の状況は？`,
      inputType: 'radio',
      options: illnessOptions(prefix),
    },
    {
      id: `${prefix}_disability`,
      category,
      label: `${parentLabel}の障害の等級は？`,
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
  ];

  return [reasonQuestion, ...detailQuestions];
}

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい（+6）', value: 'adj_single_parent_yes', points: 6 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい（+6）', value: 'adj_welfare_yes', points: 6 },
    ],
  },
  {
    id: 'adj_dv_protection',
    category: 'adjustment',
    label: 'DV保護命令等の証明がありますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_dv_protection_no', points: 0 },
      { label: 'はい（+6）', value: 'adj_dv_protection_yes', points: 6 },
    ],
  },
  {
    id: 'adj_leave_return',
    category: 'adjustment',
    label: '育児休業からの復帰予定ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_leave_return_no', points: 0 },
      { label: 'はい（+4）', value: 'adj_leave_return_yes', points: 4 },
    ],
  },
  {
    id: 'adj_leave_extension',
    category: 'adjustment',
    label: '入所不可による育児休業延長からの復帰ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_leave_extension_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_leave_extension_yes', points: 1 },
    ],
  },
  {
    id: 'adj_small_scale',
    category: 'adjustment',
    label: '地域型保育施設の卒園児童で連携施設に入所できませんでしたか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_small_scale_no', points: 0 },
      { label: 'はい（+4）', value: 'adj_small_scale_yes', points: 4 },
    ],
  },
  {
    id: 'adj_sibling_enrolled',
    category: 'adjustment',
    label: 'きょうだいが在園している施設への入所を希望しますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_enrolled_no', points: 0 },
      { label: 'はい（+4）', value: 'adj_sibling_enrolled_yes', points: 4 },
    ],
  },
  {
    id: 'adj_sibling_simultaneous',
    category: 'adjustment',
    label: 'きょうだいと同時に入所を希望しますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_simultaneous_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_sibling_simultaneous_yes', points: 1 },
    ],
  },
  {
    id: 'adj_unauthorized',
    category: 'adjustment',
    label: '認可外保育施設を利用中ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unauthorized_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_unauthorized_yes', points: 1 },
    ],
  },
  {
    id: 'adj_breadwinner_unemployed',
    category: 'adjustment',
    label: '生計中心者が会社都合で失業しましたか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_breadwinner_unemployed_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_breadwinner_unemployed_yes', points: 2 },
    ],
  },
  {
    id: 'adj_disabled_child',
    category: 'adjustment',
    label: '児童に障害がありますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_disabled_child_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_disabled_child_yes', points: 2 },
    ],
  },
  {
    id: 'adj_nursery_worker',
    category: 'adjustment',
    label: '保育士・保育教諭等として就労中または就労予定ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_nursery_worker_no', points: 0 },
      { label: 'はい（+6）', value: 'adj_nursery_worker_yes', points: 6 },
    ],
  },
  {
    id: 'adj_commute',
    category: 'adjustment',
    label: '保護者が単身赴任で片道通勤2時間以上ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_commute_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_commute_yes', points: 1 },
    ],
  },
  {
    id: 'adj_school_district',
    category: 'adjustment',
    label: '住所と希望施設が同じ中学校区ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_school_district_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_school_district_yes', points: 1 },
    ],
  },
  {
    id: 'adj_grandparent',
    category: 'adjustment',
    label: '保育可能な65歳未満の同居祖父母がいますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_grandparent_no', points: 0 },
      { label: 'はい（-3）', value: 'adj_grandparent_yes', points: -3 },
    ],
  },
  {
    id: 'adj_delinquent',
    category: 'adjustment',
    label: '保育料を3か月以上滞納していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_delinquent_no', points: 0 },
      { label: 'はい（-5）', value: 'adj_delinquent_yes', points: -5 },
    ],
  },
];

export const saijoData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
