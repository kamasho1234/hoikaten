import type { MunicipalityData, Question } from '../types';

// -------------------------------------------------------------------------
// 鹿追町 保育園入園 利用調整基準データ
// 出典: 鹿追町「令和8年度 鹿追町保育施設等利用調整基準表」
// https://www.town.shikaoi.lg.jp/file/contents/2075/16137/A10.pdf
// -------------------------------------------------------------------------
// 鹿追町は【基本点】の見出しに手順が書かれている。
//   「該当する理由のうち、最も点数が高い理由1つを基本点とします。」
//   「父または母の基本点が低い方を当該世帯の基本点とします。」
//   【補正点】「該当するすべての補正点を基本点に加算し、
//    合計点が高い順に入園(所)優先度が高いものとします。」
// 「父または母の基本点が低い方」により scoringMethod は 'min'。
// min方式なので maxBasePoints は保護者1人分。就労の満点10点にしている。
// 虐待・DVの11点は例外的な行なので使わない。
//
// 原典で点数が幅・言葉でしか書かれていない項目は入れていない。
// - ④介護・看護「保護者が親族等（在宅療養または長期入院等）を常時、
//   介護または看護している場合」（4〜10）
// - ⑩その他「児童福祉の観点から特に保育の必要性が高いと判断した場合」（状況に応じ判断）
// - 補正点⑤「生活保護世帯で自立支援のため必要と認められる場合」（状況に応じ判断）
// -------------------------------------------------------------------------

const municipality = {
  id: 'shikaoi',
  name: '鹿追町',
  slug: 'shikaoi',
  prefecture: '北海道',
  maxBasePoints: 10,
  scoringMethod: 'min',
} as const;

// ① 就労（月の就労時間・休憩時間を含む）
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月の就労時間180時間以上', value: `${prefix}_employment_0`, points: 10 },
  { label: '月の就労時間160時間以上180時間未満', value: `${prefix}_employment_1`, points: 9 },
  { label: '月の就労時間140時間以上160時間未満', value: `${prefix}_employment_2`, points: 8 },
  { label: '月の就労時間120時間以上140時間未満', value: `${prefix}_employment_3`, points: 7 },
  { label: '月の就労時間100時間以上120時間未満', value: `${prefix}_employment_4`, points: 6 },
  { label: '月の就労時間80時間以上100時間未満', value: `${prefix}_employment_5`, points: 5 },
  { label: '月の就労時間80時間未満', value: `${prefix}_employment_6`, points: 4 },
];

// ② 妊娠・出産
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '妊娠中または出産後8週間を経過する日の翌日が属する月の月末までの間にある場合', value: `${prefix}_childbirth_0`, points: 10 },
];

// ③ 疾病・障害
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '疾病（入院）：1ヶ月以上の入院加療を要すると診断されたもの', value: `${prefix}_illness_0`, points: 10 },
  { label: '疾病（自宅療養・長期療養）：1か月以上の安静を要するもの', value: `${prefix}_illness_1`, points: 10 },
  { label: '障害：身体第1・2級、精神第1・2級、知的（A）', value: `${prefix}_illness_2`, points: 10 },
  { label: '障害：身体第3級、精神第3級、知的（B）', value: `${prefix}_illness_3`, points: 5 },
  { label: '疾病（自宅療養・一般加療）：通院している場合', value: `${prefix}_illness_4`, points: 3 },
];

// ⑤ 災害復旧
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '災害復旧に当たっている場合', value: `${prefix}_disaster_0`, points: 10 },
];

// ⑥ 求職活動
const jobseekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動中（ハローワークカード等の証明するものの添付必須。起業準備を含む）', value: `${prefix}_jobseeking_0`, points: 3 },
];

// ⑦ 就学（職業訓練を含む）
const schoolOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_school_none`, points: 0 },
  { label: '週4日以上かつ日中の就学時間が7時間以上', value: `${prefix}_school_0`, points: 8 },
  { label: '週4日以上かつ日中の就学時間が6時間以上', value: `${prefix}_school_1`, points: 7 },
  { label: '週4日以上かつ日中の就学時間が5時間以上', value: `${prefix}_school_2`, points: 6 },
  { label: '週4日以上かつ日中の就学時間が4時間以上', value: `${prefix}_school_3`, points: 5 },
];

// ⑧ 虐待・DV
const dvOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_dv_none`, points: 0 },
  { label: '虐待やDV（家庭内暴力）のおそれがある場合（要支援家庭）等', value: `${prefix}_dv_0`, points: 11 },
];

// ⑨ 育児休業中
const leaveOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_leave_none`, points: 0 },
  { label: '復職することを前提としている場合', value: `${prefix}_leave_0`, points: 9 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: '父または母の基本点が低い方が世帯の基本点になります',
    inputType: 'select',
    options: [
      { label: '就労', value: `${prefix}_reason_employment`, points: 0 },
      { label: '妊娠・出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '疾病・障害', value: `${prefix}_reason_illness`, points: 0 },
      { label: '災害復旧', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '求職活動', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '就学（職業訓練を含む）', value: `${prefix}_reason_school`, points: 0 },
      { label: '虐待・DV', value: `${prefix}_reason_dv`, points: 0 },
      { label: '育児休業中', value: `${prefix}_reason_leave`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の1か月の就労時間は？`,
      helpText: '休憩時間を含みます',
      inputType: 'radio',
      options: employmentOptions(prefix),
    },
    {
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}の妊娠・出産の状況は？`,
      inputType: 'radio',
      options: childbirthOptions(prefix),
    },
    {
      id: `${prefix}_illness`,
      category,
      label: `${parentLabel}の疾病・障害の状況は？`,
      inputType: 'radio',
      options: illnessOptions(prefix),
    },
    {
      id: `${prefix}_disaster`,
      category,
      label: `${parentLabel}は災害復旧に当たっていますか？`,
      inputType: 'radio',
      options: disasterOptions(prefix),
    },
    {
      id: `${prefix}_jobseeking`,
      category,
      label: `${parentLabel}は求職活動中ですか？`,
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
      label: `${parentLabel}の世帯に虐待やDVのおそれがありますか？`,
      inputType: 'radio',
      options: dvOptions(prefix),
    },
    {
      id: `${prefix}_leave`,
      category,
      label: `${parentLabel}は育児休業中で復職することを前提としていますか？`,
      inputType: 'radio',
      options: leaveOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// 【補正点】該当するすべてを基本点に加算する
const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_0', points: 0 },
      { label: 'はい（+10）', value: 'adj_single_parent_1', points: 10 },
    ],
  },
  {
    id: 'adj_return_to_work',
    category: 'adjustment',
    label: '復職しているまたは見込みですか？（育児休業・産後休暇終了）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_return_to_work_0', points: 0 },
      { label: 'はい（+4）', value: 'adj_return_to_work_1', points: 4 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: '2人以上のきょうだいが同時に入園（所）を希望していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_0', points: 0 },
      { label: '3人以上または双生児（+3）', value: 'adj_sibling_1', points: 3 },
      { label: '2人（+2）', value: 'adj_sibling_2', points: 2 },
    ],
  },
  {
    id: 'adj_many_children',
    category: 'adjustment',
    label: '3人以上子どもがいますか？（入園（所）希望年度内に18歳以下の子ども）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_many_children_0', points: 0 },
      { label: 'はい（+1）', value: 'adj_many_children_1', points: 1 },
    ],
  },
  {
    id: 'adj_grandparent',
    category: 'adjustment',
    label: '60歳以下の祖父母等が同居しており、保育が可能ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_grandparent_0', points: 0 },
      { label: 'はい（−2）', value: 'adj_grandparent_1', points: -2 },
    ],
  },
  {
    id: 'adj_waiting',
    category: 'adjustment',
    label: '前年度より入園待機中であり、継続した申込をしていますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_waiting_0', points: 0 },
      { label: 'はい（+1）', value: 'adj_waiting_1', points: 1 },
    ],
  },
  {
    id: 'adj_hoikushi',
    category: 'adjustment',
    label: '鹿追町内において、保育士として勤務または就職が内定していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_hoikushi_0', points: 0 },
      { label: 'はい（+10）', value: 'adj_hoikushi_1', points: 10 },
    ],
  },
];

export const shikaoiData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
