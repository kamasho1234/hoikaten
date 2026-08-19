import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 米子市 保育所入所 基準指数・調整基準指数データ
//
// 出典: 米子市こども未来局こども支援課「令和8年度 保育施設等入所案内」P7-P8
//       《利用調整の優先順位に関する基準指数》《調整基準指数》
//       https://www.city.yonago.lg.jp/secure/59859/R8nyusyo.pdf
//       （米子市Webサイト「令和8年度保育所・認定こども園・小規模・事業所内保育事業所の
//         入所受付（1次申込）」 https://www.city.yonago.lg.jp/46948.htm からリンク）
//
// 2026-08-19: 従来のデータは他自治体と同じ点数配列のテンプレート（推定値）だったため、
//             上記の公式指数表を読み取って全面的に置き換えた。
//             公式は「基準指数（父）＋基準指数（母）＋調整基準指数＝合計基準指数」の加算方式で、
//             基準指数の最大は父母各10点。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'yonago',
  name: '米子市',
  slug: 'yonago',
  prefecture: '鳥取県',
  maxBasePoints: 20, // 父母各10点
} as const;

// ---------------------------------------------------------------------------
// 基準指数（父母が保育できない事由）。父母それぞれについて選ぶ
// ---------------------------------------------------------------------------

/** 就労（自営業含む） */
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月140時間以上（週35時間以上）', value: `${prefix}_employment_10`, points: 10 },
  { label: '月120時間以上140時間未満（週30時間以上）', value: `${prefix}_employment_9`, points: 9 },
  { label: '月100時間以上120時間未満（週25時間以上）', value: `${prefix}_employment_8`, points: 8 },
  { label: '月80時間以上100時間未満（週20時間以上）', value: `${prefix}_employment_7`, points: 7 },
  { label: '月60時間以上80時間未満（週15時間以上・内職含む）', value: `${prefix}_employment_6`, points: 6 },
];

/** 妊娠、出産 */
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産準備や産後静養が必要', value: `${prefix}_childbirth_6`, points: 6 },
];

/** 疾病、負傷 */
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院している', value: `${prefix}_illness_hospital`, points: 10 },
  { label: '常時病臥、精神疾患', value: `${prefix}_illness_bedridden`, points: 10 },
  { label: '通院している（週4日以上）', value: `${prefix}_illness_7`, points: 7 },
  { label: '上記以外で子どもの保育ができない', value: `${prefix}_illness_6`, points: 6 },
];

/** 障がい */
const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '1級・2級またはA判定程度', value: `${prefix}_disability_10`, points: 10 },
  { label: '3級またはB判定程度', value: `${prefix}_disability_8`, points: 8 },
  { label: '上記以外で子どもの保育ができない', value: `${prefix}_disability_6`, points: 6 },
];

/** 親族の介護、看護（病院付添・在宅介護） */
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '入院中の親族の付添い（月120時間以上）', value: `${prefix}_care_attend_8`, points: 8 },
  { label: '入院中の親族の付添い（月60時間以上120時間未満）', value: `${prefix}_care_attend_7`, points: 7 },
  { label: '在宅の常時介護（月120時間以上）', value: `${prefix}_care_home_8`, points: 8 },
  { label: '在宅の常時介護（月60時間以上120時間未満）', value: `${prefix}_care_home_7`, points: 7 },
];

/** 災害復旧 */
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '火災等の災害により自宅や近隣の復旧に当たっている', value: `${prefix}_disaster_10`, points: 10 },
];

/** 求職（起業準備含む） */
const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '起業準備をしている（入所後3か月以内に起業予定）', value: `${prefix}_jobseeking_5`, points: 5 },
  { label: '求職活動をしている', value: `${prefix}_jobseeking_4`, points: 4 },
];

/** 就学（職業訓練含む） */
const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '学校・職業訓練校等へ通っている（月120時間以上）', value: `${prefix}_education_7`, points: 7 },
  { label: '学校・職業訓練校等へ通っている（月60時間以上120時間未満）', value: `${prefix}_education_6`, points: 6 },
];

/** その他（公式は「4〜50」の幅があるため、下限の4点で見積もる） */
const otherOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_other_none`, points: 0 },
  { label: '上記各項目に類する状況と認められる', value: `${prefix}_other_4`, points: 4 },
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
      { label: '仕事をしている（自営業含む）', value: `${prefix}_reason_employment`, points: 0 },
      { label: '妊娠・出産の前後', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '病気・けがの治療中', value: `${prefix}_reason_illness`, points: 0 },
      { label: '障がいがある', value: `${prefix}_reason_disability`, points: 0 },
      { label: '親族の介護・看護をしている', value: `${prefix}_reason_care`, points: 0 },
      { label: '災害の復旧に当たっている', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '仕事を探している（起業準備含む）', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '学校・職業訓練校に通っている', value: `${prefix}_reason_education`, points: 0 },
      { label: 'その他', value: `${prefix}_reason_other`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}はどのくらい働いていますか？`,
      helpText: '月あたりの就労時間を選んでください（自営業・内職を含みます）',
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
      label: `${parentLabel}の病気・けがの状況は？`,
      inputType: 'radio',
      options: illnessOptions(prefix),
    },
    {
      id: `${prefix}_disability`,
      category,
      label: `${parentLabel}の障がいの程度は？`,
      helpText: '身体障害者手帳の等級、または療育手帳の判定でお選びください',
      inputType: 'radio',
      options: disabilityOptions(prefix),
    },
    {
      id: `${prefix}_care`,
      category,
      label: `${parentLabel}の介護・看護の状況は？`,
      helpText: '入院中の親族の付添いか、在宅での常時介護かを、月あたりの時間で選んでください',
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
      id: `${prefix}_jobseeking`,
      category,
      label: `${parentLabel}の求職の状況は？`,
      inputType: 'radio',
      options: jobSeekingOptions(prefix),
    },
    {
      id: `${prefix}_education`,
      category,
      label: `${parentLabel}はどのくらい学校に通っていますか？`,
      helpText: '職業訓練校等を含みます',
      inputType: 'radio',
      options: educationOptions(prefix),
    },
    {
      id: `${prefix}_other`,
      category,
      label: `${parentLabel}はその他の事由にあてはまりますか？`,
      helpText: '公式では4〜50点の幅があり、状況により大きく変わります。ここでは下限の4点で見積もります',
      inputType: 'radio',
      options: otherOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// ---------------------------------------------------------------------------
// 調整基準指数
// ---------------------------------------------------------------------------

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_household',
    category: 'adjustment',
    label: '世帯の状況は？',
    helpText: 'ひとり親世帯は、満65歳未満の祖父母と同居しているかどうかで点数が変わります',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_household_none', points: 0 },
      { label: '父母ともに不存在（死亡・行方不明等）', value: 'adj_household_no_parents', points: 25 },
      { label: 'ひとり親世帯（満65歳未満の祖父母と同居していない）', value: 'adj_household_single_alone', points: 17 },
      { label: 'ひとり親世帯（満65歳未満の祖父母と同居している）', value: 'adj_household_single_with', points: 14 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい', value: 'adj_welfare_yes', points: 6 },
    ],
  },
  {
    id: 'adj_nontaxable',
    category: 'adjustment',
    label: '父母ともに入所希望日の前年度の市民税が非課税ですか？',
    helpText: '生活保護世帯を除きます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_nontaxable_no', points: 0 },
      { label: 'はい', value: 'adj_nontaxable_yes', points: 1 },
    ],
  },
  {
    id: 'adj_child_disability',
    category: 'adjustment',
    label: '申込みのお子さんに障がいがありますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_child_disability_no', points: 0 },
      { label: 'はい', value: 'adj_child_disability_yes', points: 5 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: 'きょうだいの状況は？',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_sibling_none', points: 0 },
      { label: 'きょうだいが既に在籍している施設を第1希望として申し込む', value: 'adj_sibling_same', points: 10 },
      { label: '多胎児を含むきょうだいで新規に入所を希望する', value: 'adj_sibling_multiple', points: 5 },
      { label: 'きょうだいで新規に入所を希望する', value: 'adj_sibling_new', points: 2 },
    ],
  },
  {
    id: 'adj_many_children',
    category: 'adjustment',
    label: '多子世帯（中学校就学前の子どもが3名以上）ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_many_children_no', points: 0 },
      { label: 'はい', value: 'adj_many_children_yes', points: 1 },
    ],
  },
  {
    id: 'adj_sibling_disability',
    category: 'adjustment',
    label: 'きょうだいに障がいがありますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_disability_no', points: 0 },
      { label: 'はい', value: 'adj_sibling_disability_yes', points: 1 },
    ],
  },
  {
    id: 'adj_reapply',
    category: 'adjustment',
    label: '出産・育児休業で一時退所し、再度申し込みますか？',
    helpText: '米子市内の認可保育施設を一時退所している場合。退所児童・育休対象児童ともに加算されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_reapply_no', points: 0 },
      { label: 'はい', value: 'adj_reapply_yes', points: 5 },
    ],
  },
  {
    id: 'adj_graduation',
    category: 'adjustment',
    label: '小学校就学前までに卒園になる施設からの申込みですか？',
    helpText:
      'ねむの木保育園・ゆりかご保育園・のぞみ保育園・リトルえんぜる保育園・わんぱく保育園・小規模保育事業所・事業所内保育事業所（従業員枠を除く）から卒園して申し込む場合（年度当初の選考）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_graduation_no', points: 0 },
      { label: 'はい', value: 'adj_graduation_yes', points: 5 },
    ],
  },
  {
    id: 'adj_occupation',
    category: 'adjustment',
    label: '保護者の職業は次にあてはまりますか？',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_occupation_none', points: 0 },
      {
        label: '保育士・幼稚園教諭・看護師として市内の保育施設等に勤務',
        value: 'adj_occupation_hoiku',
        points: 10,
      },
      {
        label: '教員・放課後児童支援員・医療的ケア児の看護師として市内の小中学校・民間学童施設等に勤務',
        value: 'adj_occupation_school',
        points: 5,
      },
    ],
  },
];

export const yonagoData: MunicipalityData = {
  municipality,
  questions: [...buildParentQuestions(1), ...buildParentQuestions(2), ...adjustmentQuestions],
};
