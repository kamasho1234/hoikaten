import type { MunicipalityData, Question } from '../types';

// -------------------------------------------------------------------------
// 伊達市（北海道） 保育園入園 利用調整基準データ
// 出典: 伊達市「伊達市保育所等の利用調整基準」
// https://www.city.date.hokkaido.jp/hotnews/files/00001000/00001082/20260702163524.pdf
// -------------------------------------------------------------------------
// 伊達市は（1）優先順位の決定方法の①基本点数に手順が書かれている。
//   「父母の保育を必要とする事由・状況に応じて、それぞれ基本点数を決定し、
//    父母それぞれの基本点数を合算して世帯の基本点数とします。」
//   「ひとり親世帯は、当該ひとり親の基本点数に『100点』を合算して
//    世帯の基本点数とします。」
// これにより scoringMethod は 'sum'。基本点数の最大は1人あたり100点。
// 注記「父母が複数の事由に該当する場合は、各々の事由のうち基本点数の高い方を採用します。」
//
// ひとり親の100点は、この画面ではひとり親の設問として持たせている。
// ひとり親の方は保護者1だけに答えれば、その1人分の点数に100点が足される。
//
// slug は date-hokkaido。福島県伊達市が date-fukushima を使っているため、
// 同じ形に合わせて県名を付けている。
//
// 原典で点数が「−」になっている項目は選択肢にしていない。
// - ⑧虐待・DV（当該児童および世帯の状況に応じて別途判断）
// - ⑨育休継続利用（上の子の継続利用を認めるため、利用調整は必要ない）
// - ⑩医師、保育士等（優先入所とする、という扱いで点数ではない）
// - ⑪その他（別途判断）
// - 調整点数⑤の「前年度通っていた保育所／認定こども園に継続入所を希望する場合は
//   優先入所とする」（−）
//
// 「転所を希望する場合」（+80）と「同一認定こども園において1号認定から2号認定へ
// 変更する場合」（+80）は、いま園を利用している方の話なので入れていない。
// -------------------------------------------------------------------------

const municipality = {
  id: 'date-hokkaido',
  name: '伊達市',
  slug: 'date-hokkaido',
  prefecture: '北海道',
  maxBasePoints: 200, // 父母各100点の合計
  scoringMethod: 'sum',
} as const;

// ① 就労
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月実働160時間以上就労している', value: `${prefix}_employment_0`, points: 100 },
  { label: '月実働140時間以上160時間未満就労している', value: `${prefix}_employment_1`, points: 90 },
  { label: '月実働120時間以上140時間未満就労している', value: `${prefix}_employment_2`, points: 80 },
  { label: '月実働100時間以上120時間未満就労している', value: `${prefix}_employment_3`, points: 70 },
  { label: '月実働64時間以上100時間未満就労している', value: `${prefix}_employment_4`, points: 60 },
];

// ② 妊娠・出産（母のみ）
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '母が出産または出産予定日の前後2か月の期間にあり、出産の休養を要する', value: `${prefix}_childbirth_0`, points: 80 },
];

// ③ 保護者の疾病・障がい等
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院、または入院に相当する治療・安静が必要で日常生活が不能', value: `${prefix}_illness_0`, points: 100 },
  { label: '身体障害者手帳1〜2級、精神障害者保健福祉手帳1〜2級、療育手帳Aの交付を受けていて保育が困難', value: `${prefix}_illness_1`, points: 100 },
  { label: '身体障害者手帳3級、精神障害保健福祉手帳3級、療育手帳B・Cの交付を受けていて保育が困難', value: `${prefix}_illness_2`, points: 80 },
  { label: '通院加療を行い、常に安静を要するなど保育が著しく困難', value: `${prefix}_illness_3`, points: 70 },
  { label: '身体障害者手帳の交付を受けていて保育が困難', value: `${prefix}_illness_4`, points: 60 },
  { label: '疾病により保育に支障がある', value: `${prefix}_illness_5`, points: 50 },
];

// ④ 同居親族等の看護・介護
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '常時看護（介護）が必要で、月160時間以上の保育が困難（1日8時間以上かつ月20日以上完全看護が必要）', value: `${prefix}_care_0`, points: 100 },
  { label: '入院・通院・通所の付添いのため、月100時間以上の保育が困難（1日5時間以上かつ月20日以上付添が必要）', value: `${prefix}_care_1`, points: 70 },
  { label: '入院・通院・通所の付添いのため、月64時間以上の保育が困難（1日4時間以上で月12日以上付添が必要）', value: `${prefix}_care_2`, points: 50 },
];

// ⑤ 災害復旧
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '震災・風水害・火災その他の災害により自宅の復旧にあたっている', value: `${prefix}_disaster_0`, points: 100 },
];

// ⑥ 求職活動
const jobseekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職中（就労先未定）', value: `${prefix}_jobseeking_0`, points: 20 },
];

// ⑦ 就学
const schoolOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_school_none`, points: 0 },
  { label: '職業訓練校・専門学校・大学等に月120時間以上就学している', value: `${prefix}_school_0`, points: 80 },
  { label: '職業訓練校・専門学校・大学等に月64時間以上就学している', value: `${prefix}_school_1`, points: 50 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: '父母それぞれの基本点数を合算します。複数の事由に該当する場合は基本点数の高い方を採用します',
    inputType: 'select',
    options: [
      { label: '就労', value: `${prefix}_reason_employment`, points: 0 },
      { label: '妊娠・出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '保護者の疾病・障がい等', value: `${prefix}_reason_illness`, points: 0 },
      { label: '同居親族等の看護・介護', value: `${prefix}_reason_care`, points: 0 },
      { label: '災害復旧', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '求職活動', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '就学', value: `${prefix}_reason_school`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の就労の状況は？`,
      helpText: '就労時間には休憩時間を含み、通勤時間は含みません',
      inputType: 'radio',
      options: employmentOptions(prefix),
    },
    {
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}の妊娠・出産の状況は？`,
      helpText: '原典では母のみに点数が付く区分です',
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
      label: `${parentLabel}の看護・介護の状況は？`,
      helpText: '介護サービス等が利用できる時間帯は除きます',
      inputType: 'radio',
      options: careOptions(prefix),
    },
    {
      id: `${prefix}_disaster`,
      category,
      label: `${parentLabel}は災害により自宅の復旧にあたっていますか？`,
      inputType: 'radio',
      options: disasterOptions(prefix),
    },
    {
      id: `${prefix}_jobseeking`,
      category,
      label: `${parentLabel}は求職中ですか？`,
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
  ];

  return [reasonQuestion, ...detailQuestions];
}

// （3）調整点数表
const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親世帯ですか？',
    helpText: '基本点数の「ひとり親は100点を合算」と、調整点数の50点（求職中なら80点）を合わせた点数が入ります',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_0', points: 0 },
      { label: 'ひとり親世帯であって、かつ求職中（+180）', value: 'adj_single_parent_1', points: 180 },
      { label: 'ひとり親世帯（+150）', value: 'adj_single_parent_2', points: 150 },
    ],
  },
  {
    id: 'adj_grandparent',
    category: 'adjustment',
    label: '児童と同居の祖父母が65歳未満であり、保育を必要とする事由がありませんか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_grandparent_0', points: 0 },
      { label: 'はい（−5）', value: 'adj_grandparent_1', points: -5 },
    ],
  },
  {
    id: 'adj_leave_return',
    category: 'adjustment',
    label: '育児休業後、復職時（4月2日以降）に利用を希望しますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_leave_return_0', points: 0 },
      { label: 'はい（+20）', value: 'adj_leave_return_1', points: 20 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯で、自立支援のため必要と認められますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_0', points: 0 },
      { label: 'はい（+30）', value: 'adj_welfare_1', points: 30 },
    ],
  },
  {
    id: 'adj_unemployed',
    category: 'adjustment',
    label: '生活中心者の失業ですか？',
    helpText: 'リストラ・事業所の倒産など本人の意に反した失業に限ります',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unemployed_0', points: 0 },
      { label: 'はい（+20）', value: 'adj_unemployed_1', points: 20 },
    ],
  },
  {
    id: 'adj_child_disability',
    category: 'adjustment',
    label: '児童本人が精神または身体に障がいを有していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_child_disability_0', points: 0 },
      { label: 'はい（+10）', value: 'adj_child_disability_1', points: 10 },
    ],
  },
  {
    id: 'adj_environment',
    category: 'adjustment',
    label: '児童の日常生活において環境不良と認められますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_environment_0', points: 0 },
      { label: 'はい（+10）', value: 'adj_environment_1', points: 10 },
    ],
  },
  {
    id: 'adj_tanshin',
    category: 'adjustment',
    label: '父母のうちいずれかが単身赴任していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_tanshin_0', points: 0 },
      { label: 'はい（+10）', value: 'adj_tanshin_1', points: 10 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: 'きょうだいの状況は？',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_sibling_0', points: 0 },
      { label: '既にきょうだいが利用中の保育施設等を希望する（+30）', value: 'adj_sibling_1', points: 30 },
      { label: 'きょうだいが同時に申込みをする（+10）', value: 'adj_sibling_2', points: 10 },
      { label: '特定教育・保育施設に通所していない、または申込みをしない未就学の児童がいる（−10）', value: 'adj_sibling_3', points: -10 },
    ],
  },
  {
    id: 'adj_graduate',
    category: 'adjustment',
    label: '地域型保育事業（小規模保育、事業所内保育等）の卒園児ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_graduate_0', points: 0 },
      { label: 'はい（+100）', value: 'adj_graduate_1', points: 100 },
    ],
  },
  {
    id: 'adj_waiting',
    category: 'adjustment',
    label: '前年度に入所申し込みをしたが、いまだ待機していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_waiting_0', points: 0 },
      { label: 'はい（+50）', value: 'adj_waiting_1', points: 50 },
    ],
  },
];

export const dateHokkaidoData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
