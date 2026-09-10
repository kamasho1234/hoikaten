import type { MunicipalityData, Question } from '../types';

// -------------------------------------------------------------------------
// 鳴門市 保育園入園 利用調整基準データ
// 出典: 鳴門市「令和8年度 鳴門市保育施設利用調整指数」
// https://www.city.naruto.lg.jp/docs/2025120500023/file_contents/2025120500023__files_00647908_R7riyotyosei_.pdf
// -------------------------------------------------------------------------
// 鳴門市は表の冒頭に扱いが書かれている。
//   「利用区分『必要性』はひとりの保護者につき1つの選択とするが、
//    『優先利用』は該当する項目全てを選択する。」
// 「必要性」を保護者ごとの基本指数、「優先利用」を世帯の調整指数として扱っている。
// 原典は父母の合わせ方を書いていないため、
// 全国で最も多い形（父母それぞれの指数を合算）に合わせて scoringMethod は 'sum' とした。
// 必要性の最大は1人あたり12点。
//
// 原典で市長の判断によるもの、指数欄が空欄のものは入れていない。
// - 必要性「保育の必要があると市長が認めるもの（軽易）」（8）、「（重大）」（15）
// - 必要性「育児休業（1年以内。継続児童に限る）」（指数欄が「—」）
// - 優先利用「特に優先されると市長が認めるもの（軽易）」（4）、「（重大）」（8）
//
// いま園を利用している方の話は入れていない。
// - 優先利用「連続して同一施設を利用する」（10）
// - 優先利用「利用施設等の年齢制限等による施設移動」（8）
// - 優先利用「統廃合予定施設利用児童であって、その施設利用承諾期間の終期が
//   統廃合後となっている児童が当該施設と連携する施設を利用する」（15）
//
// 優先利用「正当な理由なく証明書類の提出がないもの」（▲8）は、
// 申込のあとに決まる事務上の減点なので入れていない。
// -------------------------------------------------------------------------

const municipality = {
  id: 'naruto',
  name: '鳴門市',
  slug: 'naruto',
  prefecture: '徳島県',
  maxBasePoints: 24, // 父母各12点の合計
  scoringMethod: 'sum',
} as const;

// 必要性：就労
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月150時間以上又は単身赴任', value: `${prefix}_employment_0`, points: 12 },
  { label: '月120時間以上150時間未満', value: `${prefix}_employment_1`, points: 10 },
  { label: '月90時間以上120時間未満', value: `${prefix}_employment_2`, points: 8 },
  { label: '月60時間以上90時間未満', value: `${prefix}_employment_3`, points: 6 },
  { label: '月48時間以上60時間未満', value: `${prefix}_employment_4`, points: 5 },
];

// 必要性：妊娠・出産
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '妊娠・出産', value: `${prefix}_childbirth_0`, points: 10 },
];

// 必要性：疾病・負傷・障がい
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '疾病・負傷（1か月以上の入院・入院見込み）', value: `${prefix}_illness_0`, points: 12 },
  { label: '障がい（身体障害者手帳1級・2級、精神障害者保健福祉手帳1級・2級、聴覚障害者手帳2級・3級、療育手帳Aの交付を受けていて家庭保育が困難）', value: `${prefix}_illness_1`, points: 12 },
  { label: '疾病・負傷（上記以外）', value: `${prefix}_illness_2`, points: 10 },
  { label: '障がい（身体障害者手帳3級、精神障害者保健福祉手帳3級、聴覚障害者手帳4級、療育手帳Bの交付を受けていて家庭保育が困難）', value: `${prefix}_illness_3`, points: 10 },
  { label: '障がい（身体障害者手帳4級、5級の交付を受けていて家庭保育が困難）', value: `${prefix}_illness_4`, points: 5 },
];

// 必要性：介護・看護
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '常時', value: `${prefix}_care_0`, points: 12 },
  { label: '月120時間以上150時間未満', value: `${prefix}_care_1`, points: 10 },
  { label: '月90時間以上120時間未満', value: `${prefix}_care_2`, points: 8 },
  { label: '月48時間以上90時間未満', value: `${prefix}_care_3`, points: 5 },
];

// 必要性：災害復旧
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '災害復旧', value: `${prefix}_disaster_0`, points: 12 },
];

// 必要性：起業・求職活動
const jobseekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '起業・求職活動', value: `${prefix}_jobseeking_0`, points: 2 },
];

// 必要性：就学
const schoolOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_school_none`, points: 0 },
  { label: '就学（通信教育を除く）', value: `${prefix}_school_0`, points: 10 },
  { label: '就学（通信教育）', value: `${prefix}_school_1`, points: 6 },
];

// 必要性：虐待・DV
const dvOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_dv_none`, points: 0 },
  { label: '虐待・DV', value: `${prefix}_dv_0`, points: 12 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由（必要性）`,
    helpText: '「必要性」はひとりの保護者につき1つを選びます',
    inputType: 'select',
    options: [
      { label: '就労', value: `${prefix}_reason_employment`, points: 0 },
      { label: '妊娠・出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '疾病・負傷・障がい', value: `${prefix}_reason_illness`, points: 0 },
      { label: '介護・看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '災害復旧', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '起業・求職活動', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '就学', value: `${prefix}_reason_school`, points: 0 },
      { label: '虐待・DV', value: `${prefix}_reason_dv`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の就労の状況は？`,
      inputType: 'radio',
      options: employmentOptions(prefix),
    },
    {
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}は妊娠・出産にあたりますか？`,
      inputType: 'radio',
      options: childbirthOptions(prefix),
    },
    {
      id: `${prefix}_illness`,
      category,
      label: `${parentLabel}の疾病・負傷・障がいの状況は？`,
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
      label: `${parentLabel}は災害復旧にあたっていますか？`,
      inputType: 'radio',
      options: disasterOptions(prefix),
    },
    {
      id: `${prefix}_jobseeking`,
      category,
      label: `${parentLabel}は起業・求職活動をしていますか？`,
      inputType: 'radio',
      options: jobseekingOptions(prefix),
    },
    {
      id: `${prefix}_school`,
      category,
      label: `${parentLabel}の就学の状況は？`,
      inputType: 'radio',
      options: schoolOptions(prefix),
    },
    {
      id: `${prefix}_dv`,
      category,
      label: `${parentLabel}の世帯は虐待・DVにあたりますか？`,
      inputType: 'radio',
      options: dvOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// 優先利用（該当する項目すべてを選択する）
const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_0', points: 0 },
      { label: 'はい（+15）', value: 'adj_single_parent_1', points: 15 },
    ],
  },
  {
    id: 'adj_dv',
    category: 'adjustment',
    label: '虐待・DV等にあたりますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_dv_0', points: 0 },
      { label: 'はい（+8）', value: 'adj_dv_1', points: 8 },
    ],
  },
  {
    id: 'adj_foster',
    category: 'adjustment',
    label: '里親に委託されていますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_foster_0', points: 0 },
      { label: 'はい（+8）', value: 'adj_foster_1', points: 8 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯で保育所利用により自立が見込まれますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_0', points: 0 },
      { label: 'はい（+5）', value: 'adj_welfare_1', points: 5 },
    ],
  },
  {
    id: 'adj_unemployed',
    category: 'adjustment',
    label: '生計中心者の失業（3か月以内のもの）がありますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unemployed_0', points: 0 },
      { label: 'はい（+5）', value: 'adj_unemployed_1', points: 5 },
    ],
  },
  {
    id: 'adj_sibling_enrolled',
    category: 'adjustment',
    label: '兄弟が支給認定を受け、施設等を現に利用していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_enrolled_0', points: 0 },
      { label: 'はい（+5）', value: 'adj_sibling_enrolled_1', points: 5 },
    ],
  },
  {
    id: 'adj_sibling_same',
    category: 'adjustment',
    label: '兄弟が同じ施設に利用申込をしますか？',
    helpText: '一方が同じ施設を利用している場合を含みます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_same_0', points: 0 },
      { label: 'はい（+2）', value: 'adj_sibling_same_1', points: 2 },
    ],
  },
  {
    id: 'adj_hoikushi',
    category: 'adjustment',
    label: '鳴門市の保育所、認定こども園、幼稚園に勤務する保育士、保育教諭、子育て支援事業担当者又は幼稚園教職員の子どもですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_hoikushi_0', points: 0 },
      { label: 'はい：月150時間以上勤務（+10）', value: 'adj_hoikushi_1', points: 10 },
      { label: 'はい：月120時間以上勤務（+8）', value: 'adj_hoikushi_2', points: 8 },
      { label: 'はい：月90時間以上勤務（+5）', value: 'adj_hoikushi_3', points: 5 },
    ],
  },
  {
    id: 'adj_child_care_need',
    category: 'adjustment',
    label: '利用児童の状況であてはまるものは？',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_child_care_need_0', points: 0 },
      { label: '医療的ケア児（+8）', value: 'adj_child_care_need_1', points: 8 },
      { label: '障がい児（医療的ケア児を除く）（+6）', value: 'adj_child_care_need_2', points: 6 },
    ],
  },
  {
    id: 'adj_return_to_work',
    category: 'adjustment',
    label: '育児休業明けによる復職ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_return_to_work_0', points: 0 },
      { label: 'はい（+3）', value: 'adj_return_to_work_1', points: 3 },
    ],
  },
  {
    id: 'adj_reentry',
    category: 'adjustment',
    label: '母親の育児休業、出産により退所した児童が再利用しますか？',
    helpText: '退所後1年以内に限ります',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_reentry_0', points: 0 },
      { label: 'はい（+4）', value: 'adj_reentry_1', points: 4 },
    ],
  },
  {
    id: 'adj_many_children',
    category: 'adjustment',
    label: '多子世帯（3子以上の子を養育している世帯）ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_many_children_0', points: 0 },
      { label: 'はい（+3）', value: 'adj_many_children_1', points: 3 },
    ],
  },
  {
    id: 'adj_waiting',
    category: 'adjustment',
    label: '利用保留により継続審査中の子どもですか？',
    helpText: '申請が同一年度のものに限り、自己都合による利用保留を除きます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_waiting_0', points: 0 },
      { label: 'はい（+3）', value: 'adj_waiting_1', points: 3 },
    ],
  },
  {
    id: 'adj_fee_delinquent',
    category: 'adjustment',
    label: '3か月以上利用者負担額の未納がありますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_fee_delinquent_0', points: 0 },
      { label: 'はい（−8）', value: 'adj_fee_delinquent_1', points: -8 },
    ],
  },
  {
    id: 'adj_declined',
    category: 'adjustment',
    label: '正当な理由なく施設等の利用内定を辞退しましたか？',
    helpText: '利用年度が同一年度内の申請に限ります',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_declined_0', points: 0 },
      { label: 'はい（−5）', value: 'adj_declined_1', points: -5 },
    ],
  },
];

export const narutoData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
