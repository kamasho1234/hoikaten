import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 那覇市 保育園入園 基本指数・調整指数データ
// 出典：令和8年度 那覇市保育所入所選考基準表
// https://www.city.naha.okinawa.jp/child/hoikuen/ninteikodomoen/R6hoikuen_moushikomi.html
// ---------------------------------------------------------------------------

const municipality = {
  id: 'naha',
  name: '那覇市',
  slug: 'naha',
  prefecture: '沖縄県',
  maxBasePoints: 60, // 父母各30点
} as const;

// ---------------------------------------------------------------------------
// 保護者ごとの基本指数の選択肢テンプレート
// ---------------------------------------------------------------------------

/** 就労 */
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月160時間以上', value: `${prefix}_employment_30`, points: 30 },
  { label: '月140時間以上160時間未満', value: `${prefix}_employment_26`, points: 26 },
  { label: '月120時間以上140時間未満', value: `${prefix}_employment_22`, points: 22 },
  { label: '月90時間以上120時間未満', value: `${prefix}_employment_19`, points: 19 },
  { label: '月64時間以上90時間未満', value: `${prefix}_employment_15`, points: 15 },
  { label: '採用予定（まだ働いていない）', value: `${prefix}_employment_offer`, points: 15 },
  { label: '自営業（挙証資料なし）', value: `${prefix}_employment_self_no_proof`, points: 9 },
];

/** 妊娠・産後 */
const pregnancyOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_pregnancy_none`, points: 0 },
  { label: '多胎妊娠（双子以上）', value: `${prefix}_pregnancy_multi`, points: 23 },
  { label: '妊娠中〜産後4か月（上記以外）', value: `${prefix}_pregnancy_normal`, points: 18 },
];

/** 病気・障害（診断書） */
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院中（1か月以上）または常時寝たきり', value: `${prefix}_illness_32`, points: 32 },
  { label: '通院治療中で常に安静が必要、保育が常時困難', value: `${prefix}_illness_23`, points: 23 },
  { label: '通院治療が必要で保育に支障がある', value: `${prefix}_illness_12`, points: 12 },
];

/** 障害（手帳） */
const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '身体手帳1-2級 / 精神手帳1級 / 療育手帳A1・A2 / 障害年金1級', value: `${prefix}_disability_30`, points: 30 },
  { label: '身体手帳3級 / 精神手帳2級 / 療育手帳B1 / 障害年金2級', value: `${prefix}_disability_23`, points: 23 },
  { label: '身体手帳4級以下 / 精神手帳3級 / 療育手帳B2', value: `${prefix}_disability_12`, points: 12 },
];

/** 同居親族の看護・介護 */
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '日常生活全般の動作能力が低下、介助なしでの生活困難 / 要介護4・5', value: `${prefix}_care_30`, points: 30 },
  { label: 'ほぼ全面的な介助が必要 / 要介護3', value: `${prefix}_care_23`, points: 23 },
  { label: '排せつ・入浴等の一部に介助が必要 / 要介護2', value: `${prefix}_care_15`, points: 15 },
  { label: '日常生活に部分的な介助が必要 / 要介護1', value: `${prefix}_care_9`, points: 9 },
  { label: '通院・通学の付き添い（月64時間以上）', value: `${prefix}_care_escort`, points: 15 },
];

/** 求職活動 */
const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動中または起業準備中', value: `${prefix}_jobseeking_9`, points: 9 },
];

/** 就学・職業訓練 */
const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '月160時間以上', value: `${prefix}_education_26`, points: 26 },
  { label: '月140時間以上160時間未満', value: `${prefix}_education_22`, points: 22 },
  { label: '月120時間以上140時間未満', value: `${prefix}_education_18`, points: 18 },
  { label: '月90時間以上120時間未満', value: `${prefix}_education_15`, points: 15 },
  { label: '月90時間未満', value: `${prefix}_education_12`, points: 12 },
  { label: '就学予定（まだ通っていない）', value: `${prefix}_education_plan`, points: 12 },
  { label: '通信制', value: `${prefix}_education_correspondence`, points: 9 },
];

/** 育児休業 */
const childcareLeaveOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childcareleave_none`, points: 0 },
  { label: '育休中（育休対象児以外の児童の申込み）', value: `${prefix}_childcareleave_15`, points: 15 },
  { label: 'みなし育休中（対象児以外の児童の申込み）', value: `${prefix}_childcareleave_7`, points: 7 },
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
      { label: '仕事をしている・採用予定', value: `${prefix}_reason_employment`, points: 0 },
      { label: '妊娠中・産後', value: `${prefix}_reason_pregnancy`, points: 0 },
      { label: '病気で治療中', value: `${prefix}_reason_illness`, points: 0 },
      { label: '障害がある（手帳所持）', value: `${prefix}_reason_disability`, points: 0 },
      { label: '家族の介護・看護をしている', value: `${prefix}_reason_care`, points: 0 },
      { label: '仕事を探している', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '学校に通っている・職業訓練中', value: `${prefix}_reason_education`, points: 0 },
      { label: '育児休業中', value: `${prefix}_reason_childcareleave`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}はどのくらい働いていますか？`,
      helpText: '月あたりの就労時間を選んでください',
      inputType: 'radio',
      options: employmentOptions(prefix),
    },
    {
      id: `${prefix}_pregnancy`,
      category,
      label: `${parentLabel}の妊娠・産後の状況は？`,
      inputType: 'radio',
      options: pregnancyOptions(prefix),
    },
    {
      id: `${prefix}_illness`,
      category,
      label: `${parentLabel}の病気の状況は？`,
      helpText: '診断書による判定',
      inputType: 'radio',
      options: illnessOptions(prefix),
    },
    {
      id: `${prefix}_disability`,
      category,
      label: `${parentLabel}の障害の程度は？`,
      helpText: '障害者手帳・障害年金による判定',
      inputType: 'radio',
      options: disabilityOptions(prefix),
    },
    {
      id: `${prefix}_care`,
      category,
      label: `${parentLabel}はどのくらい介護・看護をしていますか？`,
      helpText: '同居親族の看護・介護が対象です（同居していない親族は対象外）',
      inputType: 'radio',
      options: careOptions(prefix),
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
      label: `${parentLabel}はどのくらい学校に通っていますか？`,
      helpText: '月あたりの通学・訓練時間を選んでください',
      inputType: 'radio',
      options: educationOptions(prefix),
    },
    {
      id: `${prefix}_childcareleave`,
      category,
      label: `${parentLabel}の育児休業の状況は？`,
      helpText: '育休対象児以外の児童の申込みの場合',
      inputType: 'radio',
      options: childcareLeaveOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// ---------------------------------------------------------------------------
// 調整指数の質問
// ---------------------------------------------------------------------------

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親ですか？',
    helpText: 'ひとり親世帯には+50点、離婚調停中等の場合は+35点が加算されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい（ひとり親世帯）', value: 'adj_single_parent_yes', points: 50 },
      { label: 'ひとり親とみなす場合（離婚調停中・拘留等）', value: 'adj_single_parent_deemed', points: 35 },
    ],
  },
  {
    id: 'adj_nursery_worker',
    category: 'adjustment',
    label: '認可保育所・こども園で保育士等として働いていますか？',
    helpText: '保育士等は+50点、子育て支援員は+20点の加算があります',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_nursery_worker_no', points: 0 },
      { label: 'はい（保育士等）', value: 'adj_nursery_worker_hoikushi', points: 50 },
      { label: 'はい（子育て支援員）', value: 'adj_nursery_worker_shienin', points: 20 },
    ],
  },
  {
    id: 'adj_parental_leave_return',
    category: 'adjustment',
    label: '育児休業から復帰する予定ですか？',
    helpText: '入所した翌月1日までに復帰する場合、+9点が加算されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_parental_leave_return_no', points: 0 },
      { label: 'はい', value: 'adj_parental_leave_return_yes', points: 9 },
    ],
  },
  {
    id: 'adj_disability_worker',
    category: 'adjustment',
    label: '月64時間以上就労し、かつ障害者手帳を持っていますか？',
    helpText: '就労と障害手帳の両方に該当する場合、+5点の加算があります',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_disability_worker_no', points: 0 },
      { label: 'はい', value: 'adj_disability_worker_yes', points: 5 },
    ],
  },
  {
    id: 'adj_remote_work',
    category: 'adjustment',
    label: '保護者の一方が単身赴任等で県外・離島で就労していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_remote_work_no', points: 0 },
      { label: 'はい', value: 'adj_remote_work_yes', points: 5 },
    ],
  },
  {
    id: 'adj_young_parent',
    category: 'adjustment',
    label: '18歳以下の出産ですか？',
    helpText: '平成19年4月2日以降に生まれた方が対象です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_young_parent_no', points: 0 },
      { label: 'はい', value: 'adj_young_parent_yes', points: 15 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護を受けていますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい', value: 'adj_welfare_yes', points: 3 },
    ],
  },
  {
    id: 'adj_unlicensed_nursery',
    category: 'adjustment',
    label: '認可外保育施設に在園していますか？',
    helpText: '育休復帰予定の場合は適用されません。保護者両方が就労中・病気障害・看護介護・就学中の場合に適用',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unlicensed_nursery_no', points: 0 },
      { label: 'はい', value: 'adj_unlicensed_nursery_yes', points: 11 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: 'きょうだいの保育園の状況は？',
    helpText: 'きょうだいが在園中の園を第1希望にすると+7点、同時入所申込は+6点',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_sibling_no', points: 0 },
      { label: 'きょうだいが在園中の園を第1希望にしている', value: 'adj_sibling_same', points: 7 },
      { label: 'きょうだい2名以上で同時に同園へ入所申込', value: 'adj_sibling_simultaneous', points: 6 },
    ],
  },
  {
    id: 'adj_sibling_disability',
    category: 'adjustment',
    label: 'きょうだい（中学生以下）が発達支援保育の対象、または障がい児ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_disability_no', points: 0 },
      { label: 'はい', value: 'adj_sibling_disability_yes', points: 5 },
    ],
  },
  {
    id: 'adj_overdue_fee',
    category: 'adjustment',
    label: '過年度の保育料に滞納がありますか？',
    helpText: '滞納がある場合は-20点の減点があります',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_overdue_fee_no', points: 0 },
      { label: 'はい', value: 'adj_overdue_fee_yes', points: -20 },
    ],
  },
];

// ---------------------------------------------------------------------------
// エクスポート
// ---------------------------------------------------------------------------

export const nahaData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
