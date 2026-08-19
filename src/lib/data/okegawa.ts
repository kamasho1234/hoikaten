import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 桶川市 保育施設入所基準調査表（基本指数・調整指数）データ
//
// 出典: 桶川市保育課「令和8年度桶川市保育施設入所基準調査表」
//       https://www.city.okegawa.lg.jp/material/files/group/25/r8nyusyokijyun.pdf
//       （桶川市Webサイト「保育所への入所」
//         https://www.city.okegawa.lg.jp/kodomo/hoikusho/nyusho/index.html からリンク）
//
// 2026-08-19: 従来のデータは他自治体と同じ点数配列のテンプレート（推定値）だったため、
//             上記の公式基準を読み取って全面的に置き換えた。
//             公式の基本指数は父母それぞれ最大13点で、旧データ（父母各20点）とは体系が異なる。
//
// 実装上の注意: 原典では「就労・就学地」による加点（0〜3点）も基本指数に含まれるが、
//   本シミュレーターの質問構造（保育が必要な理由ごとに1つの詳細質問）に合わせるため、
//   調整の質問として保護者ごとに分けて配置している。点数の合計は原典と一致する。
//
// 原典の注記:
//   市内在住者優先。市外在住者は年度内に空きが見込まれる場合のみ選考の対象とする
//   利用者負担額（保育料等）の滞納がある場合は、上記によらない
//   就学とは、学校教育法に規定する学校、専修学校等または職業訓練校に通学のこと
//   離婚とは、戸籍の届出がされており、かつ世帯を分離し、かつ別居している状況をいう
//   離婚を前提とした別居とは、調停中または裁判中であり、その事実を証明する書類の提出があった場合
//
// 数値化しない規定（市長判断・優先順位のため質問には含めない）:
//   基本指数 7 虐待等（児童虐待のおそれ、配偶者からの暴力により保育が困難）＝市長が認める指数
//   基本指数 8 その他＝市長が認める状況
//   調整指数 5 その他＝市長が認める状況
//   同指数の場合の優先順位:
//     (1) 市内在住（転入予定を含む）／(2) 保護者または児童が障害を有する／
//     (3) ひとり親世帯（同居なし）／(4) 基本指数が高い／
//     (5) 同一世帯の小学6年生までの児童の人数が多い／(6) 1か月間の合計就労時間が長い／
//     (7) 通勤時間が長い／(8) 両祖父母が不在または市外に在住している／(9) 入所待機期間が長い
// ---------------------------------------------------------------------------

const municipality = {
  id: 'okegawa',
  name: '桶川市',
  slug: 'okegawa',
  prefecture: '埼玉県',
  maxBasePoints: 26, // 基本指数は父母それぞれ最大13点、合計で26点
} as const;

// ---------------------------------------------------------------------------
// 基本指数。父母それぞれについて選ぶ
// ---------------------------------------------------------------------------

/** 1 就労・就学（月64時間以上の就労を常態としていること） */
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '1日平均勤務時間が8時間以上', value: `${prefix}_employment_12`, points: 12 },
  { label: '1日平均勤務時間が7時間以上', value: `${prefix}_employment_11`, points: 11 },
  { label: '1日平均勤務時間が6時間以上', value: `${prefix}_employment_9`, points: 9 },
  { label: '1日平均勤務時間が5時間以上', value: `${prefix}_employment_7`, points: 7 },
  { label: '1日平均勤務時間が4時間以上', value: `${prefix}_employment_5`, points: 5 },
  { label: '1日平均勤務時間が3時間以上', value: `${prefix}_employment_4`, points: 4 },
];

/** 2 出産 */
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '産前産後各8週間', value: `${prefix}_childbirth_8`, points: 8 },
];

/** 3 疾病 */
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '居宅外療養', value: `${prefix}_illness_13`, points: 13 },
  { label: '居宅内療養', value: `${prefix}_illness_12`, points: 12 },
];

/** 3 障害 */
const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  {
    label: '手帳所持（身体障害者手帳1・2級、療育手帳マルA・A、精神障害者保健福祉手帳1級）',
    value: `${prefix}_disability_12`,
    points: 12,
  },
  { label: '手帳所持（上記以外）', value: `${prefix}_disability_10`, points: 10 },
];

/** 4 介護・看護 */
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  {
    label: '同居の親族の重度者介護（要介護3〜5等）',
    value: `${prefix}_care_7`,
    points: 7,
  },
  {
    label:
      '同居の親族の軽〜中度者介護（要支援1・2または要介護1・2等）、または同居の親族の看護',
    value: `${prefix}_care_5`,
    points: 5,
  },
];

/** 5 災害 */
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '家屋の復旧にあたっているなど', value: `${prefix}_disaster_13`, points: 13 },
];

/** 6 求職活動 */
const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '生計の中心者が求職活動中', value: `${prefix}_jobseeking_5`, points: 5 },
  { label: '上記以外の求職活動', value: `${prefix}_jobseeking_1`, points: 1 },
];

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
      { label: '就労・就学', value: `${prefix}_reason_employment`, points: 0 },
      { label: '出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '疾病', value: `${prefix}_reason_illness`, points: 0 },
      { label: '障害', value: `${prefix}_reason_disability`, points: 0 },
      { label: '介護・看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '災害', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '求職活動', value: `${prefix}_reason_jobseeking`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の1日平均勤務時間は？`,
      helpText:
        '月64時間以上の就労を常態としていることが条件です。就学（学校教育法に規定する学校、専修学校等または職業訓練校への通学）も同じ区分です',
      inputType: 'radio',
      options: employmentOptions(prefix),
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
      label: `${parentLabel}の疾病の状況は？`,
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
      label: `${parentLabel}の介護・看護の状況は？`,
      inputType: 'radio',
      options: careOptions(prefix),
    },
    {
      id: `${prefix}_disaster`,
      category,
      label: `${parentLabel}は家屋の復旧にあたっていますか？`,
      inputType: 'radio',
      options: disasterOptions(prefix),
    },
    {
      id: `${prefix}_jobseeking`,
      category,
      label: `${parentLabel}の求職活動の状況は？`,
      inputType: 'radio',
      options: jobSeekingOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// ---------------------------------------------------------------------------
// 就労・就学地による加点（原典では基本指数の一部）
// ---------------------------------------------------------------------------

const workplaceOptions = (parentLabel: string, key: string): Question => ({
  id: `adj_workplace_${key}`,
  category: 'adjustment',
  label: `${parentLabel}の就労・就学地は？`,
  helpText: '原典では基本指数に含まれる加点です',
  inputType: 'radio',
  options: [
    { label: '自宅と同一住所', value: `adj_workplace_${key}_0`, points: 0 },
    {
      label:
        '市内・近隣市町（上尾市／北本市／鴻巣市／蓮田市／久喜市／白岡市／川越市／伊奈町／川島町／吉見町）、または勤務地不定',
      value: `adj_workplace_${key}_1`,
      points: 1,
    },
    { label: '上記以外', value: `adj_workplace_${key}_2`, points: 2 },
    {
      label: '単身赴任（上記の就労地加点なし）',
      value: `adj_workplace_${key}_3`,
      points: 3,
    },
  ],
});

// ---------------------------------------------------------------------------
// 調整指数
// ---------------------------------------------------------------------------

const adjustmentQuestions: Question[] = [
  workplaceOptions('保護者1', 'p1'),
  workplaceOptions('保護者2', 'p2'),
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親世帯ですか？',
    helpText:
      '死別、離婚、離婚を前提とした別居により児童の父または母がいない世帯、または未婚のひとり親世帯（家庭状況1）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい', value: 'adj_single_parent_yes', points: 25 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯ですか？',
    helpText: '家庭状況1',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい', value: 'adj_welfare_yes', points: 1 },
    ],
  },
  {
    id: 'adj_many_children',
    category: 'adjustment',
    label: '同一世帯に18歳未満の子どもが3人以上いますか？',
    helpText: '家庭状況1',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_many_children_no', points: 0 },
      { label: 'はい', value: 'adj_many_children_yes', points: 1 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: 'きょうだいの申込・在園状況は？',
    helpText: '在籍児が卒園する場合を除きます（兄弟姉妹等2）',
    inputType: 'select',
    options: [
      { label: 'あてはまらない', value: 'adj_sibling_none', points: 0 },
      {
        label:
          'きょうだい同時入所申請で、同時入所可能な施設を5施設以上希望する（それぞれの受入対象年齢を満たしている）',
        value: 'adj_sibling_5a',
        points: 5,
      },
      {
        label:
          'きょうだいが市内の特定教育・保育施設または特定地域型保育施設を利用している（在園児が2号・3号の場合に限る）',
        value: 'adj_sibling_1',
        points: 1,
      },
      {
        label:
          'きょうだいが利用している市内の特定教育・保育施設または特定地域型保育施設への入所を希望する（在園児が2号・3号・新2号・新3号の場合に限る）',
        value: 'adj_sibling_5b',
        points: 5,
      },
    ],
  },
  {
    id: 'adj_care_status',
    category: 'adjustment',
    label: '育休復帰・卒園・転入の状況は？',
    helpText:
      '転入前の市区町村での利用による加点は育休復帰加点との重複ができません（保育状況3）',
    inputType: 'select',
    options: [
      { label: 'あてはまらない', value: 'adj_care_status_none', points: 0 },
      {
        label: '育休復帰（入所希望日の属する月の末日までに産後休暇もしくは育児休業が終了する）',
        value: 'adj_care_status_4a',
        points: 4,
      },
      {
        label:
          '年齢到達により施設を卒園し、引き続き他の保育施設への入所を希望する（希望施設数が4施設以下）',
        value: 'adj_care_status_8',
        points: 8,
      },
      {
        label:
          '年齢到達により施設を卒園し、引き続き他の保育施設への入所を希望する（希望施設数が5施設以上）',
        value: 'adj_care_status_30',
        points: 30,
      },
      {
        label:
          '転入前の市区町村で保育施設を利用しており、引き続き桶川市の保育施設への入所を希望する（希望施設数が5施設以上）',
        value: 'adj_care_status_4b',
        points: 4,
      },
    ],
  },
  {
    id: 'adj_childcare_worker',
    category: 'adjustment',
    label: '市内の保育施設等に勤務（内定含む）または従事していますか？',
    helpText:
      '市内の特定教育・保育施設、特定地域型保育施設、放課後児童健全育成事業、市内私立幼稚園が対象。保育所入所後、1年以上勤務することが条件です（保育士等4）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_childcare_worker_no', points: 0 },
      { label: 'はい', value: 'adj_childcare_worker_yes', points: 5 },
    ],
  },
  {
    id: 'adj_declined',
    category: 'adjustment',
    label: '入所内定後に自己都合で辞退したことがありますか？',
    helpText: '年度内のみ減算されます（その他5）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_declined_no', points: 0 },
      { label: 'はい', value: 'adj_declined_yes', points: -10 },
    ],
  },
];

// ---------------------------------------------------------------------------
// エクスポート
// ---------------------------------------------------------------------------

export const okegawaData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
