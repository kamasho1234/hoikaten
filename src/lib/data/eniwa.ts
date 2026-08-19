import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 恵庭市 認可保育所等利用調整基準（基本点数表・調整点数）データ
//
// 出典: 恵庭市子育て支援課「恵庭市認可保育所等利用調整基準」（入所日・令和7年4月1日から適用）
//       https://www.city.eniwa.hokkaido.jp/material/files/group/31/09riyochosei.pdf
//       （恵庭市Webサイト「保育園・認定こども園（保育園部分）の入所申込について」
//         https://www.city.eniwa.hokkaido.jp/soshikikarasagasu/kodomomiraibu/kosodateshienka/kosodate/2/21712.html からリンク）
//
// 2026-08-19: 従来のデータは他自治体と同じ点数配列のテンプレート（推定値）だったため、
//             上記の公式基準を読み取って全面的に置き換えた。
//
// 原典の注記:
//   「就労時間は、休憩時間を含む」
//   「保育の必要な理由『障がいのある4歳以上児の受入』は本利用調整基準の対象外。
//     保育所等の受け入れ体制等を考慮して、別に利用調整を行う」
//   ※1 65歳未満の祖父母の「保育の必要性を確認できる書類」（就労／妊娠・出産／疾病・障害／
//      同居親族等の介護・看護に限る。求職活動は含まない）の提出があった場合、減点を行わない。
//
// 質問に含めていない原典の項目:
//   ・「その他市長が特に必要と認める場合」1〜10点（幅があるため）
// ---------------------------------------------------------------------------

const municipality = {
  id: 'eniwa',
  name: '恵庭市',
  slug: 'eniwa',
  prefecture: '北海道',
  maxBasePoints: 20, // 父母各10点（虐待100点・DV50点は世帯に適用される例外）
} as const;

// ---------------------------------------------------------------------------
// 1. 基本点数表（保育の必要な理由）。父母それぞれについて選ぶ
// ---------------------------------------------------------------------------

/** 1 就労（月の就労日数と月就労時間数の組み合わせ） */
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月20日以上・月就労時間数150時間以上', value: `${prefix}_employment_10`, points: 10 },
  { label: '月20日以上・月就労時間数120時間以上150時間未満', value: `${prefix}_employment_9`, points: 9 },
  { label: '月20日以上・月就労時間数80時間以上120時間未満', value: `${prefix}_employment_8`, points: 8 },
  { label: '月20日以上・月就労時間数48時間以上80時間未満', value: `${prefix}_employment_7`, points: 7 },
  { label: '月16日以上20日未満・月就労時間数150時間以上', value: `${prefix}_employment_16d_9`, points: 9 },
  {
    label: '月16日以上20日未満・月就労時間数120時間以上150時間未満',
    value: `${prefix}_employment_16d_8`,
    points: 8,
  },
  {
    label: '月16日以上20日未満・月就労時間数80時間以上120時間未満',
    value: `${prefix}_employment_16d_7`,
    points: 7,
  },
  {
    label: '月16日以上20日未満・月就労時間数48時間以上80時間未満',
    value: `${prefix}_employment_16d_6`,
    points: 6,
  },
  { label: '月16日未満・月就労時間数150時間以上', value: `${prefix}_employment_lt16_8`, points: 8 },
  { label: '月16日未満・月就労時間数120時間以上150時間未満', value: `${prefix}_employment_lt16_7`, points: 7 },
  { label: '月16日未満・月就労時間数80時間以上120時間未満', value: `${prefix}_employment_lt16_6`, points: 6 },
  { label: '月16日未満・月就労時間数48時間以上80時間未満', value: `${prefix}_employment_lt16_5`, points: 5 },
];

/** 2 妊娠・出産（公式の基準表では母の欄のみに点数がある） */
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  {
    label: '出産予定日の8週間前（多胎妊娠は14週前）から出産日の8週間後まで',
    value: `${prefix}_childbirth_10`,
    points: 10,
  },
];

/** 3 疾病・障がい */
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '疾病：入院', value: `${prefix}_illness_10`, points: 10 },
  { label: '疾病：居宅内療養で常時臥床', value: `${prefix}_illness_bed_10`, points: 10 },
  { label: '疾病：居宅内療養で月複数回の通院加療を要する', value: `${prefix}_illness_7`, points: 7 },
  { label: '疾病：居宅内療養で上記以外の自宅療養', value: `${prefix}_illness_5`, points: 5 },
  {
    label: '障がい：身体1・2級、精神1・2級、療育A',
    value: `${prefix}_illness_disability_10`,
    points: 10,
  },
  { label: '障がい：聴覚障がい3〜6級', value: `${prefix}_illness_disability_7`, points: 7 },
  { label: '障がい：身体3級、精神3級、療育B', value: `${prefix}_illness_disability_5`, points: 5 },
];

/** 4 同居親族等の介護・看護 */
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '月150時間以上', value: `${prefix}_care_10`, points: 10 },
  { label: '月120時間以上150時間未満', value: `${prefix}_care_9`, points: 9 },
  { label: '月80時間以上120時間未満', value: `${prefix}_care_8`, points: 8 },
  { label: '月48時間以上80時間未満', value: `${prefix}_care_7`, points: 7 },
];

/** 5 災害復旧 */
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '災害復旧にあたっている', value: `${prefix}_disaster_10`, points: 10 },
];

/** 6 求職活動 */
const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動（起業の準備を含む）を継続的に行っている', value: `${prefix}_jobseeking_5`, points: 5 },
];

/** 7 就学 */
const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '月就学時間120時間以上', value: `${prefix}_education_8`, points: 8 },
  { label: '月就学時間48時間以上120時間未満', value: `${prefix}_education_7`, points: 7 },
];

/** 8 虐待・DV */
const abuseOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_abuse_none`, points: 0 },
  { label: '虐待のおそれがある（児童相談所長通知が出された世帯等）', value: `${prefix}_abuse_100`, points: 100 },
  { label: 'DVのおそれがある（家庭裁判所から保護命令が出された世帯等）', value: `${prefix}_abuse_50`, points: 50 },
];

/** 9 育児休業 */
const parentalLeaveOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_leave_none`, points: 0 },
  {
    label: '認可保育所等に入所中で、当該育児休業の間、引き続き保育が必要',
    value: `${prefix}_leave_7`,
    points: 7,
  },
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
      { label: '妊娠・出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '疾病・障がい', value: `${prefix}_reason_illness`, points: 0 },
      { label: '同居親族等の介護・看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '災害復旧', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '求職活動', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '就学', value: `${prefix}_reason_education`, points: 0 },
      { label: '虐待・DV', value: `${prefix}_reason_abuse`, points: 0 },
      { label: '育児休業', value: `${prefix}_reason_leave`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の就労の状況は？`,
      helpText: '就労時間は休憩時間を含みます',
      inputType: 'radio',
      options: employmentOptions(prefix),
    },
    {
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}の妊娠・出産の状況は？`,
      helpText: '公式の基準表では母の欄のみに点数があります',
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
      label: `${parentLabel}の介護・看護の状況は？`,
      helpText: '同居親族等には、保育園等に入園していない障がい児も含みます',
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
      label: `${parentLabel}は求職活動をしていますか？`,
      inputType: 'radio',
      options: jobSeekingOptions(prefix),
    },
    {
      id: `${prefix}_education`,
      category,
      label: `${parentLabel}の就学の状況は？`,
      inputType: 'radio',
      options: educationOptions(prefix),
    },
    {
      id: `${prefix}_abuse`,
      category,
      label: `${parentLabel}は虐待・DVのおそれにあてはまりますか？`,
      inputType: 'radio',
      options: abuseOptions(prefix),
    },
    {
      id: `${prefix}_leave`,
      category,
      label: `${parentLabel}は育児休業中の継続利用にあてはまりますか？`,
      inputType: 'radio',
      options: parentalLeaveOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// ---------------------------------------------------------------------------
// 2. 調整点数（世帯類型・就労保育手段・産休育休兄弟姉妹・転園・その他）
// ---------------------------------------------------------------------------

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親世帯ですか？',
    helpText: '祖父母等の同居者がいない場合はさらに1点が加算されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい（祖父母等の同居者がいる）', value: 'adj_single_parent_11', points: 11 },
      { label: 'はい（祖父母等の同居者がいない）', value: 'adj_single_parent_12', points: 12 },
    ],
  },
  {
    id: 'adj_undetermined',
    category: 'adjustment',
    label: '保護者の一方の点数の決定が困難と認められる事情がありますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_undetermined_no', points: 0 },
      { label: 'はい', value: 'adj_undetermined_yes', points: 10 },
    ],
  },
  {
    id: 'adj_household_disability',
    category: 'adjustment',
    label: '世帯に障がい者がいますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_household_disability_no', points: 0 },
      { label: 'はい', value: 'adj_household_disability_yes', points: 1 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護受給世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい', value: 'adj_welfare_yes', points: 3 },
    ],
  },
  {
    id: 'adj_foster',
    category: 'adjustment',
    label: '里親世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_foster_no', points: 0 },
      { label: 'はい', value: 'adj_foster_yes', points: 4 },
    ],
  },
  {
    id: 'adj_single_status',
    category: 'adjustment',
    label: 'ひとり親世帯で、かつ就学中または求職中ですか？',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_single_status_no', points: 0 },
      { label: 'ひとり親世帯で、かつ求職中', value: 'adj_single_status_5', points: 5 },
      { label: 'ひとり親世帯で、かつ就学中', value: 'adj_single_status_2', points: 2 },
    ],
  },
  {
    id: 'adj_tanshin',
    category: 'adjustment',
    label: '父母のうちいずれかが単身赴任をしていますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_tanshin_no', points: 0 },
      { label: 'はい', value: 'adj_tanshin_yes', points: 1 },
    ],
  },
  {
    id: 'adj_grandparent',
    category: 'adjustment',
    label: '児童と同居の祖父母が65歳未満で、児童の保育が可能ですか？',
    helpText:
      '65歳未満の祖父母の「保育の必要性を確認できる書類」（就労／妊娠・出産／疾病・障害／同居親族等の介護・看護に限り、求職活動は含まない）の提出があった場合は減点されません',
    inputType: 'radio',
    options: [
      { label: 'いいえ（同居していない、または書類を提出できる）', value: 'adj_grandparent_no', points: 0 },
      { label: 'はい', value: 'adj_grandparent_yes', points: -3 },
    ],
  },
  {
    id: 'adj_leave_sibling',
    category: 'adjustment',
    label: '産休・育休明けの入所、または兄弟姉妹の入所状況は？',
    helpText:
      'いずれか1つのみが適用されます。「既に入所している」とは、申込日時点で第1希望の認可保育所等に申込児童の兄弟姉妹が支給認定を受けてすでに入所中の場合を指します（認定こども園の場合、兄弟姉妹が1号認定を受けて入所している場合を含む）',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_leave_sibling_no', points: 0 },
      { label: '産休明け・育休明けで兄弟姉妹が既に入所している', value: 'adj_leave_sibling_8', points: 8 },
      { label: '兄弟姉妹が既に入所している', value: 'adj_leave_sibling_6', points: 6 },
      { label: '産休明け・育休明けによる入所', value: 'adj_leave_sibling_4', points: 4 },
      { label: '兄弟姉妹と同時入所申込', value: 'adj_leave_sibling_2', points: 2 },
    ],
  },
  {
    id: 'adj_third_child',
    category: 'adjustment',
    label: '第3子以降の入所申込ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_third_child_no', points: 0 },
      { label: 'はい', value: 'adj_third_child_yes', points: 1 },
    ],
  },
  {
    id: 'adj_transfer',
    category: 'adjustment',
    label: '転園にあてはまるものは？',
    helpText: '事業所内保育事業所の従業員枠を利用中の場合、地域型保育事業所の卒園に係る加算は対象外です',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_transfer_no', points: 0 },
      { label: '恵庭市内の廃止となる認可保育所等から転園', value: 'adj_transfer_50', points: 50 },
      {
        label: '恵庭市内の地域型保育事業所を卒園し、次年度に受入クラスがない',
        value: 'adj_transfer_20',
        points: 20,
      },
      { label: '恵庭市内の地域型保育事業所を卒園し、連携施設への転園', value: 'adj_transfer_5', points: 5 },
    ],
  },
  {
    id: 'adj_hoikushi',
    category: 'adjustment',
    label: '保育士等資格保有者が恵庭市内の認可保育所等で保育業務に従事していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_hoikushi_no', points: 0 },
      { label: 'はい（月労働時間数120時間以上）', value: 'adj_hoikushi_40', points: 40 },
      { label: 'はい（月労働時間数48時間以上120時間未満）', value: 'adj_hoikushi_30', points: 30 },
    ],
  },
  {
    id: 'adj_kigyou',
    category: 'adjustment',
    label: '恵庭市内の企業主導型保育施設を卒園し、連携施設への年度当初の新規入所申込ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_kigyou_no', points: 0 },
      { label: 'はい', value: 'adj_kigyou_yes', points: 5 },
    ],
  },
  {
    id: 'adj_arrears',
    category: 'adjustment',
    label: '保育料を正当な理由なく滞納していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_arrears_no', points: 0 },
      { label: 'はい', value: 'adj_arrears_yes', points: -3 },
    ],
  },
  {
    id: 'adj_type_change',
    category: 'adjustment',
    label: '同一認定こども園において1号から2号認定に変更しますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_type_change_no', points: 0 },
      { label: 'はい', value: 'adj_type_change_yes', points: 20 },
    ],
  },
  {
    id: 'adj_continue',
    category: 'adjustment',
    label: '1〜3月に入所し、4月以降も同園の入所の継続を希望しますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_continue_no', points: 0 },
      { label: 'はい', value: 'adj_continue_yes', points: 5 },
    ],
  },
];

export const eniwaData: MunicipalityData = {
  municipality,
  questions: [...buildParentQuestions(1), ...buildParentQuestions(2), ...adjustmentQuestions],
};
