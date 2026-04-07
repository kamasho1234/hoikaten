import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 秋田市 保育園入園 基礎指数・調整指数データ
// 出典：秋田市 指数表（保育所等利用調整基準）
// https://www.city.akita.lg.jp/kurashi/kosodate/1005999/1009962/1047377.html
// ---------------------------------------------------------------------------
//
// 秋田市の利用調整は以下のように算出されます。
//   利用調整指数 ＝ （父Ａ基礎指数 ＋ 母Ａ基礎指数）÷ 保護者数 × 2 ＋ Ｂ調整指数
// 父母それぞれの基礎指数は最大10点。合算後、保護者数で割り2を掛けるため
// 両親世帯は最大20点、ひとり親世帯も最大20点となります。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'akita',
  name: '秋田市',
  slug: 'akita',
  prefecture: '秋田県',
  maxBasePoints: 20, // (父10+母10)÷2×2 = 20
} as const;

// ---------------------------------------------------------------------------
// ① 家庭外労働（就労者）
// ---------------------------------------------------------------------------

const employmentOutsideOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_empout_none`, points: 0 },
  { label: '就労者：標準時間（月120時間以上）', value: `${prefix}_empout_10`, points: 10 },
  { label: '就労者：短時間（週4日以上・1日4時間以上で標準時間未満）', value: `${prefix}_empout_8`, points: 8 },
  { label: '自営業（家庭外）：中心者', value: `${prefix}_empout_self_10`, points: 10 },
  { label: '自営業（家庭外）：協力者', value: `${prefix}_empout_self_7`, points: 7 },
];

// ---------------------------------------------------------------------------
// ② 家庭内労働
// ---------------------------------------------------------------------------

const employmentInsideOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_empin_none`, points: 0 },
  { label: '自営業（家庭内）：中心者', value: `${prefix}_empin_self_9`, points: 9 },
  { label: '自営業（家庭内）：協力者', value: `${prefix}_empin_self_6`, points: 6 },
  { label: '内職（自宅で物品の製造加工に日々従事）', value: `${prefix}_empin_naishoku_6`, points: 6 },
];

// ---------------------------------------------------------------------------
// ③ 妊娠・出産
// ---------------------------------------------------------------------------

const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産前後各8週以内', value: `${prefix}_childbirth_10`, points: 10 },
];

// ---------------------------------------------------------------------------
// ④ 疾病・障がい
// ---------------------------------------------------------------------------

const illnessDisabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '疾病・負傷（入院1か月以上/寝たきり/長期加療等）', value: `${prefix}_illness_10`, points: 10 },
  { label: '身体障害者手帳1・2級、精神障害者保健福祉手帳1級、療育手帳A', value: `${prefix}_disability_10`, points: 10 },
  { label: '身体障害者手帳3・4級、精神障害者保健福祉手帳2・3級、療育手帳B', value: `${prefix}_disability_8`, points: 8 },
  { label: '上記以外の障がい等で保育が著しく困難と認められる場合', value: `${prefix}_disability_6`, points: 6 },
];

// ---------------------------------------------------------------------------
// ⑤ 常時介護
// ---------------------------------------------------------------------------

const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '親族等の入院付添い（1か月以上）/同居家族の介護/障がい児者の通院通園等/寝たきり老人等の介護', value: `${prefix}_care_10`, points: 10 },
];

// ---------------------------------------------------------------------------
// ⑥ 災害復旧
// ---------------------------------------------------------------------------

const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '震災・風水害・火災等の災害復旧に当たっている', value: `${prefix}_disaster_10`, points: 10 },
];

// ---------------------------------------------------------------------------
// ⑦ 求職活動
// ---------------------------------------------------------------------------

const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動中', value: `${prefix}_jobseeking_3`, points: 3 },
];

// ---------------------------------------------------------------------------
// ⑧ 就学（高校・大学・職業訓練学校等）
// ---------------------------------------------------------------------------

const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '標準時間（月120時間以上）', value: `${prefix}_education_10`, points: 10 },
  { label: '短時間（週4日以上・1日4時間以上で標準時間未満）', value: `${prefix}_education_8`, points: 8 },
];

// ---------------------------------------------------------------------------
// ⑨ 虐待・DV（特別の支援を要する状態）
// ---------------------------------------------------------------------------

const abuseOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_abuse_none`, points: 0 },
  { label: '虐待・DVのおそれがある（特別の支援を要する家庭）', value: `${prefix}_abuse_45`, points: 45 },
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
    helpText: '秋田市では父母それぞれの基礎指数（最大10点）を合算し、保護者数で割って2を掛けた値が基礎点数になります。いちばん近いものをひとつ選んでください。',
    inputType: 'select',
    options: [
      { label: '家庭外で働いている（就労者・自営業）', value: `${prefix}_reason_empout`, points: 0 },
      { label: '家庭内で働いている（自営・内職）', value: `${prefix}_reason_empin`, points: 0 },
      { label: '妊娠・出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '病気・障害', value: `${prefix}_reason_illness`, points: 0 },
      { label: '介護・看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '災害復旧', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '仕事を探している', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '学校・職業訓練に通っている', value: `${prefix}_reason_education`, points: 0 },
      { label: '虐待・DVのおそれ', value: `${prefix}_reason_abuse`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_empout`,
      category,
      label: `${parentLabel}の家庭外労働の状況は？`,
      helpText: '就労者または家庭外の自営業者が対象です',
      inputType: 'radio',
      options: employmentOutsideOptions(prefix),
    },
    {
      id: `${prefix}_empin`,
      category,
      label: `${parentLabel}の家庭内労働の状況は？`,
      helpText: '家庭内の自営業者・内職者が対象です',
      inputType: 'radio',
      options: employmentInsideOptions(prefix),
    },
    {
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}の出産の状況は？`,
      helpText: '出産前後各8週以内が対象です',
      inputType: 'radio',
      options: childbirthOptions(prefix),
    },
    {
      id: `${prefix}_illness`,
      category,
      label: `${parentLabel}の疾病・障がいの状況は？`,
      helpText: '入院・自宅療養・障害者手帳の等級に応じて指数が決まります',
      inputType: 'radio',
      options: illnessDisabilityOptions(prefix),
    },
    {
      id: `${prefix}_care`,
      category,
      label: `${parentLabel}の介護・看護の状況は？`,
      helpText: '親族等の入院付添い・同居家族の介護・障がい児者の通院等が対象です',
      inputType: 'radio',
      options: careOptions(prefix),
    },
    {
      id: `${prefix}_disaster`,
      category,
      label: `${parentLabel}は災害復旧に該当しますか？`,
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
      label: `${parentLabel}の就学・職業訓練の状況は？`,
      helpText: '高校・大学・職業訓練学校等に通っている場合',
      inputType: 'radio',
      options: educationOptions(prefix),
    },
    {
      id: `${prefix}_abuse`,
      category,
      label: `${parentLabel}は虐待・DVのおそれに該当しますか？`,
      inputType: 'radio',
      options: abuseOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// ---------------------------------------------------------------------------
// Ｂ調整指数の質問
// ---------------------------------------------------------------------------

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_sankyu_ikukyu',
    category: 'adjustment',
    label: '産休または育休明けにより保育が必要ですか？',
    helpText: '産休・育休から復帰して入所を希望する場合、調整指数+6が加算されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sankyu_ikukyu_no', points: 0 },
      { label: 'はい（+6）', value: 'adj_sankyu_ikukyu_yes', points: 6 },
    ],
  },
  {
    id: 'adj_sankyu_ikukyu_reentry',
    category: 'adjustment',
    label: '産休・育休で退所し、再度同一保育所に申込みをしていますか？',
    helpText: '産休・育休を理由に保育所を退所した児童が再度同一保育所に申し込む場合、調整指数+10が加算されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sankyu_ikukyu_reentry_no', points: 0 },
      { label: 'はい（+10）', value: 'adj_sankyu_ikukyu_reentry_yes', points: 10 },
    ],
  },
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親家庭ですか？',
    helpText: '配偶者等の死亡・離別・行方不明等によるひとり親世帯の場合、調整指数+5が加算されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい（+5）', value: 'adj_single_parent_yes', points: 5 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい（+5）', value: 'adj_welfare_yes', points: 5 },
    ],
  },
  {
    id: 'adj_unemployment',
    category: 'adjustment',
    label: '失業や離別による生活中心者の就労の必要性が高いですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unemployment_no', points: 0 },
      { label: 'はい（+5）', value: 'adj_unemployment_yes', points: 5 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: 'きょうだいが希望の保育所に入所中、またはきょうだい同時入所を希望していますか？',
    helpText: '対象児童のきょうだいが既に希望の保育所に入所している場合、またはきょうだい（多胎児含む）の同時入所を希望する場合に+5が加算されます',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_sibling_no', points: 0 },
      { label: 'はい（+5）', value: 'adj_sibling_yes', points: 5 },
    ],
  },
  {
    id: 'adj_child_disability',
    category: 'adjustment',
    label: '対象のお子さんに障がいがありますか？',
    helpText: '特別児童扶養手当の支給、身体障害者手帳・療育手帳の交付、または発達障害の報告がある場合に+5が加算されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_child_disability_no', points: 0 },
      { label: 'はい（+5）', value: 'adj_child_disability_yes', points: 5 },
    ],
  },
  {
    id: 'adj_chiikigata',
    category: 'adjustment',
    label: '地域型保育施設の卒園児ですか？',
    helpText: '連携施設への入所希望の場合は+45、連携枠以外の施設への入所希望の場合は+5が加算されます',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_chiikigata_no', points: 0 },
      { label: '地域型保育施設卒園児で連携施設へ入所希望（+45）', value: 'adj_chiikigata_renkei', points: 45 },
      { label: '3歳未満児園卒園児、または地域型保育施設卒園児で連携枠以外（+5）', value: 'adj_chiikigata_other', points: 5 },
    ],
  },
  {
    id: 'adj_childcare_worker',
    category: 'adjustment',
    label: '保護者が幼稚園教諭・保育士・放課後児童クラブの指導員として従事していますか？',
    helpText: '内定を含みます。調整指数+3が加算されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_childcare_worker_no', points: 0 },
      { label: 'はい（+3）', value: 'adj_childcare_worker_yes', points: 3 },
    ],
  },
  {
    id: 'adj_relative_can_care',
    category: 'adjustment',
    label: '61歳未満の同居親族が保育できる状態にありますか？',
    helpText: '61歳未満の同居親族が保育の実施基準のいずれも満たしていない場合、−3の減点になります',
    inputType: 'radio',
    options: [
      { label: 'いいえ（同居親族なし、または61歳以上）', value: 'adj_relative_can_care_no', points: 0 },
      { label: 'はい、保育できる同居親族がいる（−3）', value: 'adj_relative_can_care_yes', points: -3 },
    ],
  },
];

// ---------------------------------------------------------------------------
// エクスポート
// ---------------------------------------------------------------------------

export const akitaData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
