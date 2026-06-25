import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 袖ケ浦市 保育所等の入所申込みに関する規則 利用の調整に係る指数表
// 出典: 袖ケ浦市保育の利用に関する規則（別表第2 第7条関係）
// https://www.city.sodegaura.lg.jp/soshiki/hoiku/hoiku7.html
// ---------------------------------------------------------------------------
// sum方式。保護者それぞれが該当する指数を合算。父母各最大22点。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'sodegaura',
  name: '袖ケ浦市',
  slug: 'sodegaura',
  prefecture: '千葉県',
  maxBasePoints: 44,
} as const;

const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月20日以上・月160時間以上（20点）', value: `${prefix}_employment_20a`, points: 20 },
  { label: '月20日以上・月140時間以上160時間未満（19点）', value: `${prefix}_employment_19a`, points: 19 },
  { label: '月20日以上・月120時間以上140時間未満（18点）', value: `${prefix}_employment_18a`, points: 18 },
  { label: '月20日以上・月100時間以上120時間未満（17点）', value: `${prefix}_employment_17a`, points: 17 },
  { label: '月20日以上・月80時間以上100時間未満（16点）', value: `${prefix}_employment_16a`, points: 16 },
  { label: '月20日以上・月64時間以上80時間未満（15点）', value: `${prefix}_employment_15a`, points: 15 },
  { label: '月16日以上20日未満・月120時間以上（17点）', value: `${prefix}_employment_17b`, points: 17 },
  { label: '月16日以上20日未満・月100時間以上120時間未満（16点）', value: `${prefix}_employment_16b`, points: 16 },
  { label: '月16日以上20日未満・月80時間以上100時間未満（15点）', value: `${prefix}_employment_15b`, points: 15 },
  { label: '月16日以上20日未満・月64時間以上80時間未満（14点）', value: `${prefix}_employment_14b`, points: 14 },
  { label: '月12日以上16日未満・月80時間以上（14点）', value: `${prefix}_employment_14c`, points: 14 },
  { label: '月12日以上16日未満・月64時間以上80時間未満（13点）', value: `${prefix}_employment_13c`, points: 13 },
  { label: '月12日未満就労又は内職・月64時間以上（12点）', value: `${prefix}_employment_12d`, points: 12 },
];

const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院（22点）', value: `${prefix}_illness_22a`, points: 22 },
  { label: '通院又は自宅療養・常時寝たきり（22点）', value: `${prefix}_illness_22b`, points: 22 },
  { label: '精神性又は一般療養（18点）', value: `${prefix}_illness_18`, points: 18 },
];

const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '身体2級以上、療育A以上、精神1級（22点）', value: `${prefix}_disability_22`, points: 22 },
  { label: '身体3級、療育B1、精神2級（20点）', value: `${prefix}_disability_20`, points: 20 },
  { label: '身体4級以下、療育B2、精神3級（18点）', value: `${prefix}_disability_18`, points: 18 },
];

const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '入院又は施設等の常時付添い（22点）', value: `${prefix}_care_22`, points: 22 },
  { label: '床上安静を要する介護又は看護（18点）', value: `${prefix}_care_18a`, points: 18 },
  { label: '要介護3～5、身体2級以上等の介護（18点）', value: `${prefix}_care_18b`, points: 18 },
  { label: '要介護1～2、身体3級等の介護（17点）', value: `${prefix}_care_17`, points: 17 },
  { label: '身体4級以下等の親族の介護（16点）', value: `${prefix}_care_16`, points: 16 },
  { label: '上記以外の介護（14点）', value: `${prefix}_care_14`, points: 14 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: '最も該当するものをひとつ選んでください',
    inputType: 'select',
    options: [
      { label: '就労', value: `${prefix}_reason_employment`, points: 0 },
      { label: '妊娠又は出産（20点）', value: `${prefix}_reason_childbirth`, points: 20 },
      { label: '疾病又は負傷', value: `${prefix}_reason_illness`, points: 0 },
      { label: '障害', value: `${prefix}_reason_disability`, points: 0 },
      { label: '同居親族の介護・看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '災害復旧（22点）', value: `${prefix}_reason_disaster`, points: 22 },
      { label: '求職活動中（10点）', value: `${prefix}_reason_jobseeking`, points: 10 },
      { label: '就学又は職業訓練', value: `${prefix}_reason_study`, points: 0 },
      { label: '児童虐待又は配偶者暴力（22点）', value: `${prefix}_reason_abuse`, points: 22 },
      { label: '父母の不存在（20点）', value: `${prefix}_reason_absent`, points: 20 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の就労状況は？`,
      helpText: '勤務日数と月間就労時間の組み合わせで選択',
      inputType: 'radio',
      options: employmentOptions(prefix),
    },
    {
      id: `${prefix}_study`,
      category,
      label: `${parentLabel}の就学・職業訓練の状況は？`,
      helpText: '就労の指数から2を減じた指数となります',
      inputType: 'radio',
      options: [
        { label: 'あてはまらない', value: `${prefix}_study_none`, points: 0 },
        { label: '月20日以上・月160時間以上（18点）', value: `${prefix}_study_18`, points: 18 },
        { label: '月20日以上・月120時間以上160時間未満（16点）', value: `${prefix}_study_16`, points: 16 },
        { label: '月20日以上・月80時間以上120時間未満（14点）', value: `${prefix}_study_14`, points: 14 },
        { label: '月20日以上・月64時間以上80時間未満（13点）', value: `${prefix}_study_13`, points: 13 },
        { label: '月16日以上・月64時間以上（12点）', value: `${prefix}_study_12`, points: 12 },
        { label: '月12日以上・月64時間以上（11点）', value: `${prefix}_study_11`, points: 11 },
        { label: '月12日未満・月64時間以上（10点）', value: `${prefix}_study_10`, points: 10 },
      ],
    },
    {
      id: `${prefix}_illness`,
      category,
      label: `${parentLabel}の疾病の状況は？`,
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
    id: 'adj_small_scale_graduate',
    category: 'adjustment',
    label: '地域型保育事業（小規模保育等）の卒園児童ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_small_scale_graduate_no', points: 0 },
      { label: 'はい（+30）', value: 'adj_small_scale_graduate_yes', points: 30 },
    ],
  },
  {
    id: 'adj_nursery_worker',
    category: 'adjustment',
    label: '保育士・幼稚園教諭・看護師資格で市内保育所等に月64時間以上就労していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_nursery_worker_no', points: 0 },
      { label: 'はい（+30）', value: 'adj_nursery_worker_yes', points: 30 },
    ],
  },
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい（+8）', value: 'adj_single_parent_yes', points: 8 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護被保護世帯で就労により自立が見込まれますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい（+8）', value: 'adj_welfare_yes', points: 8 },
    ],
  },
  {
    id: 'adj_breadwinner_unemployed',
    category: 'adjustment',
    label: '生計中心者が失業し就労の必要性が高いですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_breadwinner_unemployed_no', points: 0 },
      { label: 'はい（+8）', value: 'adj_breadwinner_unemployed_yes', points: 8 },
    ],
  },
  {
    id: 'adj_disabled_child',
    category: 'adjustment',
    label: '申請児童が障害を有しているが集団保育が可能ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_disabled_child_no', points: 0 },
      { label: 'はい（+4）', value: 'adj_disabled_child_yes', points: 4 },
    ],
  },
  {
    id: 'adj_waiting',
    category: 'adjustment',
    label: '入所希望月から6か月以上入所保留となっていますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_waiting_no', points: 0 },
      { label: 'はい（+4）', value: 'adj_waiting_yes', points: 4 },
    ],
  },
  {
    id: 'adj_leave_return',
    category: 'adjustment',
    label: '産後休暇又は育児休業が終了し職場に復帰しますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_leave_return_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_leave_return_yes', points: 2 },
    ],
  },
  {
    id: 'adj_sibling_enrolled',
    category: 'adjustment',
    label: '兄弟姉妹が既に入所している保育所等への入所を希望しますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_enrolled_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_sibling_enrolled_yes', points: 2 },
    ],
  },
  {
    id: 'adj_sibling_simultaneous',
    category: 'adjustment',
    label: '兄弟姉妹が同時に入所を希望していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_simultaneous_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_sibling_simultaneous_yes', points: 2 },
    ],
  },
  {
    id: 'adj_third_child',
    category: 'adjustment',
    label: '保護者の第3子以降の子どもですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_third_child_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_third_child_yes', points: 2 },
    ],
  },
  {
    id: 'adj_grandparent_available',
    category: 'adjustment',
    label: '同居の65歳未満の親族が保育可能ですか？',
    helpText: '就労・病気等により保育が困難な場合を除く',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_grandparent_available_no', points: 0 },
      { label: 'はい（-4）', value: 'adj_grandparent_available_yes', points: -4 },
    ],
  },
  {
    id: 'adj_unpaid_fees',
    category: 'adjustment',
    label: '保育料又は副食費を滞納していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unpaid_fees_no', points: 0 },
      { label: 'はい（-16）', value: 'adj_unpaid_fees_yes', points: -16 },
    ],
  },
  {
    id: 'adj_ikukyuu_extension',
    category: 'adjustment',
    label: '入所できない場合に育児休業の延長も許容できますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_ikukyuu_extension_no', points: 0 },
      { label: 'はい（-20）', value: 'adj_ikukyuu_extension_yes', points: -20 },
    ],
  },
];

export const sodegauraData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
