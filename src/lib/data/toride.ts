import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 取手市 保育施設の利用調整に関する基準（基準点数・調整点数）データ
//
// 出典: 取手市こども家庭課「令和8年度 保育施設等入所案内」
//       取手市保育施設の利用調整に関する基準（17ページ〜）
//       https://www.city.toride.ibaraki.jp/kosodate/kurashi/kosodate/hoikujo/documents/r8nyuushoannnai_1119shuusei.pdf
//       （取手市Webサイト「【令和8年度】保育施設等利用のお申込み」
//         https://www.city.toride.ibaraki.jp/kosodate/kurashi/kosodate/hoikujo/r3hoikuriyou.html からリンク）
//
// 2026-08-19: 従来のデータは他自治体と同じ点数配列のテンプレート（推定値）だったため、
//             上記の公式基準を読み取って全面的に置き換えた。
//             公式の基準点数は父母それぞれ最大30点で、旧データ（父母各20点）とは体系が異なる。
//
// 原典の注記:
//   「父母それぞれの基準点数を合算したものに対し、調整点数の加算・減算を行います。」
//   基準点数に調整点数を加えた点数が同点の場合、市民税の控除前所得割額の低い世帯を優先とする
//   同時加点しないケース: 「ウ」「エ」「オ」、「ク」「ケ」、「ク」「コ」、「ス」と「セ」、「ソ」「タ」「チ」
//   ★印: 状況を証明できる書類の提出がない場合、加点対象外となる
// ---------------------------------------------------------------------------

const municipality = {
  id: 'toride',
  name: '取手市',
  slug: 'toride',
  prefecture: '茨城県',
  maxBasePoints: 60, // 基準点数は父母それぞれ最大30点、合算で60点
} as const;

// ---------------------------------------------------------------------------
// 1. 基準点数。父母それぞれについて選ぶ
// ---------------------------------------------------------------------------

/** 番号1 就労 */
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月20日以上かつ月160時間以上の就労を常態', value: `${prefix}_employment_30`, points: 30 },
  { label: '月20日以上かつ月120時間以上の就労を常態', value: `${prefix}_employment_28`, points: 28 },
  { label: '月20日以上かつ月64時間以上の就労を常態', value: `${prefix}_employment_26`, points: 26 },
  { label: '月16日以上かつ月128時間以上の就労を常態', value: `${prefix}_employment_27`, points: 27 },
  { label: '月16日以上かつ月96時間以上の就労を常態', value: `${prefix}_employment_25`, points: 25 },
  { label: '月16日以上かつ月64時間以上の就労を常態', value: `${prefix}_employment_23`, points: 23 },
  { label: '月12日以上かつ月96時間以上の就労を常態', value: `${prefix}_employment_24`, points: 24 },
  { label: '月12日以上かつ月72時間以上の就労を常態', value: `${prefix}_employment_22`, points: 22 },
  { label: '月12日以上かつ月64時間以上の就労を常態', value: `${prefix}_employment_20`, points: 20 },
];

/** 番号2 求職活動 */
const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職中', value: `${prefix}_jobseeking_5`, points: 5 },
];

/** 番号3 不存在 */
const absenceOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_absence_none`, points: 0 },
  {
    label: '不存在・死亡・離別・行方不明・拘禁等（ひとり親家庭等）',
    value: `${prefix}_absence_30`,
    points: 30,
  },
];

/** 番号4 出産 */
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産予定月を含む3か月', value: `${prefix}_childbirth_27`, points: 27 },
];

/** 番号5 疾病 */
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: 'おおむね1か月以上の入院を要する', value: `${prefix}_illness_30`, points: 30 },
  {
    label: '医師が1か月以上の安静を要すると診断（常時病臥を除く）',
    value: `${prefix}_illness_20`,
    points: 20,
  },
];

/** 番号5 障害 */
const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '精神障害者手帳1〜3級', value: `${prefix}_disability_30a`, points: 30 },
  {
    label: '精神障害者手帳1〜3級以外の程度（診断書のみ）',
    value: `${prefix}_disability_24a`,
    points: 24,
  },
  { label: '身体障害者手帳1〜2級', value: `${prefix}_disability_30b`, points: 30 },
  {
    label: '身体障害者手帳3級または4級（視覚障害に限る）',
    value: `${prefix}_disability_20`,
    points: 20,
  },
  {
    label: '身体障害者手帳4級（視覚障害除く）・5・6・7級',
    value: `${prefix}_disability_18`,
    points: 18,
  },
  { label: '療育手帳 マルA・A', value: `${prefix}_disability_30c`, points: 30 },
  { label: '療育手帳 B', value: `${prefix}_disability_26`, points: 26 },
  { label: '療育手帳 C', value: `${prefix}_disability_24b`, points: 24 },
];

/** 番号6 介護 */
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  {
    label: '全介護を必要とする（要介護認定3・4・5、重度身体障害者等）',
    value: `${prefix}_care_30`,
    points: 30,
  },
  { label: '一部介護を必要とする（要介護認定1・2程度）', value: `${prefix}_care_25`, points: 25 },
  { label: '支援を必要とする（要支援）', value: `${prefix}_care_20`, points: 20 },
];

/** 番号7 災害 */
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  {
    label: '火災などによる家屋の損傷その他の災害復旧',
    value: `${prefix}_disaster_30`,
    points: 30,
  },
];

/** 番号8 虐待・DV */
const abuseOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_abuse_none`, points: 0 },
  {
    label: '児童虐待防止法第2条または配偶者暴力防止法第1条の対象者と認められる',
    value: `${prefix}_abuse_30`,
    points: 30,
  },
];

/** 番号9 就学・技能取得 */
const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '月20日以上かつ月140時間以上の就学を常態', value: `${prefix}_education_25`, points: 25 },
  { label: '月20日以上かつ月120時間以上の就学を常態', value: `${prefix}_education_23`, points: 23 },
  { label: '月20日以上かつ月64時間以上の就学を常態', value: `${prefix}_education_21`, points: 21 },
  { label: '月16日以上かつ月112時間以上の就学を常態', value: `${prefix}_education_22`, points: 22 },
  { label: '月16日以上かつ月96時間以上の就学を常態', value: `${prefix}_education_20`, points: 20 },
  { label: '月16日以上かつ月64時間以上の就学を常態', value: `${prefix}_education_18`, points: 18 },
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
      { label: '就労', value: `${prefix}_reason_employment`, points: 0 },
      { label: '求職活動', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '不存在（ひとり親家庭等）', value: `${prefix}_reason_absence`, points: 0 },
      { label: '妊娠・出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '疾病', value: `${prefix}_reason_illness`, points: 0 },
      { label: '障害', value: `${prefix}_reason_disability`, points: 0 },
      { label: '介護（同居親族・家族）', value: `${prefix}_reason_care`, points: 0 },
      { label: '災害復旧', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '虐待・DV', value: `${prefix}_reason_abuse`, points: 0 },
      { label: '就学・技能取得', value: `${prefix}_reason_education`, points: 0 },
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
      id: `${prefix}_jobseeking`,
      category,
      label: `${parentLabel}は求職中ですか？`,
      inputType: 'radio',
      options: jobSeekingOptions(prefix),
    },
    {
      id: `${prefix}_absence`,
      category,
      label: `${parentLabel}は不存在に該当しますか？`,
      inputType: 'radio',
      options: absenceOptions(prefix),
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
      helpText: '同居親族・家族の介護のみが対象です',
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
      id: `${prefix}_abuse`,
      category,
      label: `${parentLabel}は虐待・DVの対象者と認められますか？`,
      inputType: 'radio',
      options: abuseOptions(prefix),
    },
    {
      id: `${prefix}_education`,
      category,
      label: `${parentLabel}の就学・技能取得の状況は？`,
      helpText: '大学・専門学校等の就学、ハローワーク教育訓練講座の受講などが対象です',
      inputType: 'radio',
      options: educationOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// ---------------------------------------------------------------------------
// 2. 調整点数（区分ア〜ナ）
// ---------------------------------------------------------------------------

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護法による生活扶助を受けていますか？',
    helpText: '区分ア。状況を証明できる書類の提出がない場合は加点対象外です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい', value: 'adj_welfare_yes', points: 20 },
    ],
  },
  {
    id: 'adj_return_from_leave',
    category: 'adjustment',
    label: '産前産後休業または育児休業期間が終わり、職場に復帰しますか？',
    helpText: '区分イ',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_return_from_leave_no', points: 0 },
      { label: 'はい', value: 'adj_return_from_leave_yes', points: 4 },
    ],
  },
  {
    id: 'adj_childcare_worker',
    category: 'adjustment',
    label: '保護者が認可保育施設の保育士として勤務していますか？',
    helpText: '区分ウ・エ・オ。同時加点はされません',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_childcare_worker_no', points: 0 },
      {
        label: '市外の認可保育施設で月20日以上1日6時間以上勤務',
        value: 'adj_childcare_worker_out',
        points: 3,
      },
      {
        label: '市内の認可保育施設で月16日以上1日6時間以上勤務',
        value: 'adj_childcare_worker_in',
        points: 15,
      },
      {
        label: '市内の認可保育施設でフルタイム（月20日以上、1日8時間以上）勤務',
        value: 'adj_childcare_worker_full',
        points: 20,
      },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: 'きょうだいの申込・入所状況は？',
    helpText: '区分カ・キ',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_sibling_none', points: 0 },
      { label: 'きょうだい同時に新規で入所申請をする', value: 'adj_sibling_6', points: 6 },
      {
        label: 'きょうだいが2号・3号で既に入所していて、新規で入所申請をする',
        value: 'adj_sibling_10',
        points: 10,
      },
    ],
  },
  {
    id: 'adj_transfer',
    category: 'adjustment',
    label: '保育施設の移籍（転園）を希望していますか？',
    helpText: '区分ク・ケ・コ。同時加点はされません',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_transfer_no', points: 0 },
      { label: '保育施設入所中で移籍を希望する', value: 'adj_transfer_1', points: 1 },
      {
        label: '既にきょうだいが別々の保育施設に入所していて移籍を希望する',
        value: 'adj_transfer_15',
        points: 15,
      },
      {
        label: '他市区町村から取手市への転入に伴い移籍を希望する',
        value: 'adj_transfer_5',
        points: 5,
      },
    ],
  },
  {
    id: 'adj_many_children',
    category: 'adjustment',
    label: '保育が必要な未就学児が3人以上いますか？',
    helpText: '区分サ（多子世帯）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_many_children_no', points: 0 },
      { label: 'はい', value: 'adj_many_children_yes', points: 5 },
    ],
  },
  {
    id: 'adj_single_posting',
    category: 'adjustment',
    label: '勤務の都合で父母の一方が単身赴任していますか？',
    helpText:
      '区分シ。就労証明書の「17 単身赴任期間（予定を含む）」の記載が必要です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_posting_no', points: 0 },
      { label: 'はい', value: 'adj_single_posting_yes', points: 2 },
    ],
  },
  {
    id: 'adj_unlicensed_nursery',
    category: 'adjustment',
    label: '認可外保育施設等を利用していますか？',
    helpText:
      '認可外保育施設、事業所内託児施設、児童発達支援施設、就労等を理由とする一時保育が対象。利用予定は含みません（区分ス・セ）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unlicensed_nursery_no', points: 0 },
      { label: '週5回以上利用している', value: 'adj_unlicensed_nursery_5', points: 5 },
      { label: '週3回以上利用している', value: 'adj_unlicensed_nursery_3', points: 4 },
    ],
  },
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: '世帯の状況は？',
    helpText: '区分ソ・タ・チ。同時加点はされません',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_single_parent_none', points: 0 },
      { label: '父母ともに失踪・死亡している', value: 'adj_single_parent_20', points: 20 },
      { label: '母子・父子世帯', value: 'adj_single_parent_8', points: 8 },
      {
        label: '母子・父子世帯に準ずる世帯（離婚調停中かつ別居、失踪、行方不明、拘禁）',
        value: 'adj_single_parent_5',
        points: 5,
      },
    ],
  },
  {
    id: 'adj_foster_care',
    category: 'adjustment',
    label: '里親制度を利用している子の申請ですか？',
    helpText: '区分ツ。状況を証明できる書類の提出がない場合は加点対象外です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_foster_care_no', points: 0 },
      { label: 'はい', value: 'adj_foster_care_yes', points: 8 },
    ],
  },
  {
    id: 'adj_grandparent',
    category: 'adjustment',
    label: '同居している60歳未満の祖父母が保育にあたれない証明を提出できますか？',
    helpText: '同一住所または同一建物の場合を含みます（区分テ、減点）',
    inputType: 'radio',
    options: [
      { label: '該当しない・提出できる', value: 'adj_grandparent_no', points: 0 },
      { label: '提出できない', value: 'adj_grandparent_yes', points: -10 },
    ],
  },
  {
    id: 'adj_arrears',
    category: 'adjustment',
    label: '入所児または卒園児の利用者負担（保育料・保育所給食費）の滞納月がありますか？',
    helpText: '区分ト（減点）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_arrears_no', points: 0 },
      { label: 'はい', value: 'adj_arrears_yes', points: -10 },
    ],
  },
  {
    id: 'adj_leave_extension',
    category: 'adjustment',
    label: '希望園に入所できなかった場合、育児休業の延長を許容できますか？',
    helpText: '区分ナ（減点）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_leave_extension_no', points: 0 },
      { label: 'はい', value: 'adj_leave_extension_yes', points: -60 },
    ],
  },
];

// ---------------------------------------------------------------------------
// エクスポート
// ---------------------------------------------------------------------------

export const torideData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
