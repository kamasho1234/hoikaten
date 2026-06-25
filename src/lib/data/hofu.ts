import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 防府市 保育施設利用選考基準（令和8年4月1日適用）
// 出典: 防府市保育施設利用選考基準
// https://www.city.hofu.yamaguchi.jp/uploaded/attachment/143450.pdf
// ---------------------------------------------------------------------------
// sum方式（父母の基本点数合算+調整指数）。最大100点/親（合計200点）。
// ひとり親世帯は当該ひとり親の基本点数+100点を基本点数とする。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'hofu',
  name: '防府市',
  slug: 'hofu',
  prefecture: '山口県',
  maxBasePoints: 200,
} as const;

const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月20日以上かつ1日8時間以上', value: `${prefix}_employment_100`, points: 100 },
  { label: '月20日以上かつ1日6時間以上8時間未満', value: `${prefix}_employment_90`, points: 90 },
  { label: '月16日以上かつ1日4時間以上かつ月120時間以上', value: `${prefix}_employment_80`, points: 80 },
  { label: '月120時間以上（上記以外）', value: `${prefix}_employment_70a`, points: 70 },
  { label: '月16日以上かつ1日4時間以上かつ月120時間未満', value: `${prefix}_employment_70b`, points: 70 },
  { label: '月64時間以上（上記以外）', value: `${prefix}_employment_60`, points: 60 },
];

const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '産前で特別な安静が必要', value: `${prefix}_childbirth_100`, points: 100 },
  { label: '出産前後8週間', value: `${prefix}_childbirth_50`, points: 50 },
];

const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院中', value: `${prefix}_illness_100`, points: 100 },
  { label: '自宅療養（常時安静等、日常生活に支障）', value: `${prefix}_illness_80`, points: 80 },
  { label: '通院加療・安静が必要', value: `${prefix}_illness_60`, points: 60 },
];

const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '療育手帳重度 / 身体1-2級 / 精神1級', value: `${prefix}_disability_100`, points: 100 },
  { label: '療育手帳中度 / 身体3級', value: `${prefix}_disability_70`, points: 70 },
];

const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '月20日以上かつ1日8時間以上の介護', value: `${prefix}_care_90`, points: 90 },
  { label: '月16日以上かつ1日4時間以上かつ月120時間以上の介護', value: `${prefix}_care_70`, points: 70 },
  { label: '月16日以上かつ1日4時間以上かつ月120時間未満の介護', value: `${prefix}_care_60`, points: 60 },
];

const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '月16日以上かつ1日4時間以上かつ月120時間以上の就学', value: `${prefix}_education_70`, points: 70 },
  { label: '月16日以上かつ1日4時間以上かつ月120時間未満の就学', value: `${prefix}_education_60`, points: 60 },
];

const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '生計中心者の失業による求職活動', value: `${prefix}_jobseeking_60`, points: 60 },
  { label: 'ひとり親・生活保護世帯の求職活動', value: `${prefix}_jobseeking_40`, points: 40 },
  { label: 'その他の求職活動', value: `${prefix}_jobseeking_30`, points: 30 },
];

const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '災害復旧に従事', value: `${prefix}_disaster_100`, points: 100 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: '防府市では父母それぞれの基本点数を合算します（各最大100点、合計200点）。複数事由は高い方を採用',
    inputType: 'select',
    options: [
      { label: '仕事をしている', value: `${prefix}_reason_employment`, points: 0 },
      { label: '病気・けがの治療中', value: `${prefix}_reason_illness`, points: 0 },
      { label: '障害がある', value: `${prefix}_reason_disability`, points: 0 },
      { label: '家族の介護', value: `${prefix}_reason_care`, points: 0 },
      ...(parentNum === 2 ? [{ label: '妊娠・出産', value: `${prefix}_reason_childbirth`, points: 0 }] : []),
      { label: '学校に通っている', value: `${prefix}_reason_education`, points: 0 },
      { label: '災害復旧', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '仕事を探している', value: `${prefix}_reason_jobseeking`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の就労状況は？`,
      helpText: '就労時間は休憩時間を含む',
      inputType: 'radio',
      options: employmentOptions(prefix),
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
      label: `${parentLabel}の介護の状況は？`,
      helpText: '同居・別居の親族の介護を含む',
      inputType: 'radio',
      options: careOptions(prefix),
    },
    ...(parentNum === 2 ? [{
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}の出産の状況は？`,
      inputType: 'radio' as const,
      options: childbirthOptions(prefix),
    }] : []),
    {
      id: `${prefix}_education`,
      category,
      label: `${parentLabel}は学校に通っていますか？`,
      inputType: 'radio',
      options: educationOptions(prefix),
    },
    {
      id: `${prefix}_disaster`,
      category,
      label: `${parentLabel}は災害復旧に従事していますか？`,
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
  ];

  return [reasonQuestion, ...detailQuestions];
}

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親世帯ですか？',
    helpText: '不在の保護者分として+100点、ひとり親・生保加点+20点の合計120点',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい（+120）', value: 'adj_single_parent_yes', points: 120 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯ですか？（ひとり親世帯でない場合）',
    inputType: 'radio',
    options: [
      { label: 'いいえ（又はひとり親世帯）', value: 'adj_welfare_no', points: 0 },
      { label: 'はい（+20）', value: 'adj_welfare_yes', points: 20 },
    ],
  },
  {
    id: 'adj_return',
    category: 'adjustment',
    label: '里帰り出産により退所した施設への再入所ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_return_no', points: 0 },
      { label: 'はい（+40）', value: 'adj_return_yes', points: 40 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: 'きょうだいが入所中の同一施設への入所ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_no', points: 0 },
      { label: 'はい（+35）', value: 'adj_sibling_yes', points: 35 },
    ],
  },
  {
    id: 'adj_nursery_worker',
    category: 'adjustment',
    label: '保護者が市内の保育施設に保育士等として就労（予定含む）していますか？',
    helpText: '半年以上の就労で、受入人数増加等の要件あり',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_nursery_worker_no', points: 0 },
      { label: 'はい（+35）', value: 'adj_nursery_worker_yes', points: 35 },
    ],
  },
  {
    id: 'adj_parental_leave',
    category: 'adjustment',
    label: '事業所内保育卒園児又は育休復帰で予約入所していない児童ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_parental_leave_no', points: 0 },
      { label: 'はい（+10）', value: 'adj_parental_leave_yes', points: 10 },
    ],
  },
  {
    id: 'adj_grandparent',
    category: 'adjustment',
    label: '18歳以上65歳未満の同居親族（保育可能）がいますか？',
    helpText: '保育できない事由の証明がある場合を除く',
    inputType: 'radio',
    options: [
      { label: 'いいえ（又は証明あり）', value: 'adj_grandparent_no', points: 0 },
      { label: 'はい（-15）', value: 'adj_grandparent_yes', points: -15 },
    ],
  },
  {
    id: 'adj_home_child',
    category: 'adjustment',
    label: '保育利用申込未申請の未就学児が同居していますか？',
    helpText: '介護・看護の対象又は他施設入所中を除く',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_home_child_no', points: 0 },
      { label: 'はい（-10）', value: 'adj_home_child_yes', points: -10 },
    ],
  },
  {
    id: 'adj_short_daytime',
    category: 'adjustment',
    label: '就労で父母いずれかの昼間就労が1日3時間未満ですか？',
    helpText: '昼間は午前7時〜午後7時',
    inputType: 'radio',
    options: [
      { label: 'いいえ（該当しない）', value: 'adj_short_daytime_no', points: 0 },
      { label: 'はい（-5）', value: 'adj_short_daytime_yes', points: -5 },
    ],
  },
];

export const hofuData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
