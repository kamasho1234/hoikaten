import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 横手市 保育所等利用調整基準（基準指数および調整指数）
// 出典: 横手市子どものための教育・保育給付の教育・保育給付認定事務等取扱要綱 別表（第15条関係）
// https://www.city.yokote.lg.jp/hoiku/page000097.html
// ---------------------------------------------------------------------------
// sum方式。父の基本点＋母の基本点＋調整点の合計。各保護者最大100点。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'yokote',
  name: '横手市',
  slug: 'yokote',
  prefecture: '秋田県',
  maxBasePoints: 200,
} as const;

const externalEmploymentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_ext_none`, points: 0 },
  { label: '月20日以上または週5日以上・1日8時間以上（100点）', value: `${prefix}_ext_100`, points: 100 },
  { label: '月20日以上または週5日以上・1日6時間以上8時間未満（90点）', value: `${prefix}_ext_90a`, points: 90 },
  { label: '月16日以上20日未満または週3〜5日・1日8時間以上（90点）', value: `${prefix}_ext_90b`, points: 90 },
  { label: '月20日以上または週5日以上・1日4時間以上6時間未満（80点）', value: `${prefix}_ext_80a`, points: 80 },
  { label: '月16日以上20日未満または週3〜5日・1日6時間以上8時間未満（80点）', value: `${prefix}_ext_80b`, points: 80 },
  { label: '月20日以上または週5日以上・1日3時間以上4時間未満（70点）', value: `${prefix}_ext_70a`, points: 70 },
  { label: '月16日以上20日未満または週3〜5日・1日4時間以上6時間未満（70点）', value: `${prefix}_ext_70b`, points: 70 },
  { label: '月48時間以上就労・上記以外（50点）', value: `${prefix}_ext_50`, points: 50 },
  { label: '月16日以上20日未満または週3〜5日・1日3時間以上4時間未満（40点）', value: `${prefix}_ext_40a`, points: 40 },
  { label: '月20日以上または週5日以上・1日1時間以上3時間未満（40点）', value: `${prefix}_ext_40b`, points: 40 },
  { label: '月12日以上16日未満または週3〜5日・1日1時間以上3時間未満（30点）', value: `${prefix}_ext_30`, points: 30 },
  { label: '月48時間未満就労・上記以外（20点）', value: `${prefix}_ext_20`, points: 20 },
];

const homeEmploymentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_home_none`, points: 0 },
  { label: '月20日以上または週5日以上・1日8時間以上（90点）', value: `${prefix}_home_90`, points: 90 },
  { label: '月20日以上または週5日以上・1日6時間以上8時間未満（80点）', value: `${prefix}_home_80a`, points: 80 },
  { label: '月16日以上20日未満または週3〜5日・1日8時間以上（80点）', value: `${prefix}_home_80b`, points: 80 },
  { label: '月20日以上または週5日以上・1日4時間以上6時間未満（70点）', value: `${prefix}_home_70a`, points: 70 },
  { label: '月16日以上20日未満または週3〜5日・1日6時間以上8時間未満（70点）', value: `${prefix}_home_70b`, points: 70 },
  { label: '月20日以上または週5日以上・1日3時間以上4時間未満（60点）', value: `${prefix}_home_60a`, points: 60 },
  { label: '月16日以上20日未満または週3〜5日・1日4時間以上6時間未満（60点）', value: `${prefix}_home_60b`, points: 60 },
  { label: '月48時間以上就労・上記以外（40点）', value: `${prefix}_home_40`, points: 40 },
  { label: '月16日以上20日未満または週3〜5日・1日3時間以上4時間未満（30点）', value: `${prefix}_home_30a`, points: 30 },
  { label: '月20日以上または週5日以上・1日1時間以上3時間未満（30点）', value: `${prefix}_home_30b`, points: 30 },
  { label: '月12日以上16日未満または週3〜5日・1日1時間以上3時間未満（20点）', value: `${prefix}_home_20`, points: 20 },
  { label: '月48時間未満就労・上記以外（10点）', value: `${prefix}_home_10`, points: 10 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: '最も該当するものをひとつ選んでください',
    inputType: 'select',
    options: [
      { label: '居宅外で働いている（自営含む）', value: `${prefix}_reason_ext`, points: 0 },
      { label: '居宅内で働いている（自営・農業・内職等）', value: `${prefix}_reason_home`, points: 0 },
      { label: '妊娠・出産（100点）', value: `${prefix}_reason_childbirth`, points: 100 },
      { label: '疾病・負傷', value: `${prefix}_reason_illness`, points: 0 },
      { label: '障害', value: `${prefix}_reason_disability`, points: 0 },
      { label: '同居親族の介護・看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '就学・職業訓練（居宅内就労に準ずる）', value: `${prefix}_reason_study`, points: 0 },
      { label: '災害復旧（100点）', value: `${prefix}_reason_disaster`, points: 100 },
      { label: '求職活動中（5点）', value: `${prefix}_reason_jobseeking`, points: 5 },
      { label: '育児休業継続利用・年長児（80点）', value: `${prefix}_reason_ikukyuu_eldest`, points: 80 },
      { label: '育児休業継続利用・上記以外（50点）', value: `${prefix}_reason_ikukyuu_other`, points: 50 },
      { label: '児童虐待・DV（200点）', value: `${prefix}_reason_abuse`, points: 200 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_ext_employment`,
      category,
      label: `${parentLabel}の居宅外就労の状況は？`,
      helpText: '就労日数と1日の就労時間の組み合わせで選択',
      inputType: 'radio',
      options: externalEmploymentOptions(prefix),
    },
    {
      id: `${prefix}_home_employment`,
      category,
      label: `${parentLabel}の居宅内就労・介護・就学の状況は？`,
      helpText: '自営・農業・内職・介護・看護・就学・職業訓練が対象',
      inputType: 'radio',
      options: homeEmploymentOptions(prefix),
    },
    {
      id: `${prefix}_illness`,
      category,
      label: `${parentLabel}の疾病・負傷の状況は？`,
      inputType: 'radio',
      options: [
        { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
        { label: '1か月以上の入院（100点）', value: `${prefix}_illness_100a`, points: 100 },
        { label: '居宅療養・常時寝たきりで保育困難（100点）', value: `${prefix}_illness_100b`, points: 100 },
        { label: '入院治療中・上記以外（80点）', value: `${prefix}_illness_80a`, points: 80 },
        { label: '居宅療養・日常生活に著しく支障（80点）', value: `${prefix}_illness_80b`, points: 80 },
        { label: '週3日以上かつ1か月以上の通院（60点）', value: `${prefix}_illness_60`, points: 60 },
        { label: '居宅療養・上記以外（50点）', value: `${prefix}_illness_50`, points: 50 },
      ],
    },
    {
      id: `${prefix}_disability`,
      category,
      label: `${parentLabel}の障害の程度は？`,
      inputType: 'radio',
      options: [
        { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
        { label: '身体1〜2級、療育手帳A、精神1〜2級（100点）', value: `${prefix}_disability_100`, points: 100 },
        { label: '療育手帳B、精神3級（80点）', value: `${prefix}_disability_80`, points: 80 },
        { label: '身体3級（60点）', value: `${prefix}_disability_60`, points: 60 },
        { label: '上記以外で保育困難（40点）', value: `${prefix}_disability_40`, points: 40 },
      ],
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_overtime_p1',
    category: 'adjustment',
    label: '保護者1：常態的な時間外勤務が1時間以上ありますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_overtime_p1_no', points: 0 },
      { label: 'はい（+10）', value: 'adj_overtime_p1_yes', points: 10 },
    ],
  },
  {
    id: 'adj_commute_p1',
    category: 'adjustment',
    label: '保護者1：通勤時間が往復2時間以上ありますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_commute_p1_no', points: 0 },
      { label: 'はい（+10）', value: 'adj_commute_p1_yes', points: 10 },
    ],
  },
  {
    id: 'adj_overtime_p2',
    category: 'adjustment',
    label: '保護者2：常態的な時間外勤務が1時間以上ありますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_overtime_p2_no', points: 0 },
      { label: 'はい（+10）', value: 'adj_overtime_p2_yes', points: 10 },
    ],
  },
  {
    id: 'adj_commute_p2',
    category: 'adjustment',
    label: '保護者2：通勤時間が往復2時間以上ありますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_commute_p2_no', points: 0 },
      { label: 'はい（+10）', value: 'adj_commute_p2_yes', points: 10 },
    ],
  },
  {
    id: 'adj_leave_return',
    category: 'adjustment',
    label: '育児休業明けで保育を利用する予定ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_leave_return_no', points: 0 },
      { label: 'はい（+50）', value: 'adj_leave_return_yes', points: 50 },
    ],
  },
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親世帯（または離婚調停中）ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい（+100）', value: 'adj_single_parent_yes', points: 100 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護受給世帯で就労による自立が見込まれますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい（+50）', value: 'adj_welfare_yes', points: 50 },
    ],
  },
  {
    id: 'adj_abuse',
    category: 'adjustment',
    label: '虐待やDVなど社会的擁護が必要な状況ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_abuse_no', points: 0 },
      { label: 'はい（+100）', value: 'adj_abuse_yes', points: 100 },
    ],
  },
  {
    id: 'adj_disabled_child',
    category: 'adjustment',
    label: '認定を受けようとする子どもが障害を有していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_disabled_child_no', points: 0 },
      { label: '軽度（+10）', value: 'adj_disabled_child_low', points: 10 },
      { label: '中度（+30）', value: 'adj_disabled_child_mid', points: 30 },
      { label: '重度（+50）', value: 'adj_disabled_child_high', points: 50 },
    ],
  },
  {
    id: 'adj_sibling_enrolled',
    category: 'adjustment',
    label: '兄弟姉妹が同一の保育の利用を希望していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_enrolled_no', points: 0 },
      { label: 'はい（+20）', value: 'adj_sibling_enrolled_yes', points: 20 },
    ],
  },
  {
    id: 'adj_small_scale_graduate',
    category: 'adjustment',
    label: '小規模保育事業等（乳児保育園・分園含む）を卒園しますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_small_scale_graduate_no', points: 0 },
      { label: 'はい（+60）', value: 'adj_small_scale_graduate_yes', points: 60 },
    ],
  },
  {
    id: 'adj_grandparent_young',
    category: 'adjustment',
    label: '利用開始日に保育可能な60歳未満の同居親族がいますか？',
    helpText: '就労・疾病等により保育困難な場合は除く',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_grandparent_young_no', points: 0 },
      { label: '60歳以上70歳未満（-10）', value: 'adj_grandparent_senior', points: -10 },
      { label: '60歳未満（-50）', value: 'adj_grandparent_young_yes', points: -50 },
    ],
  },
  {
    id: 'adj_sibling_no_enrollment',
    category: 'adjustment',
    label: '兄弟姉妹に保育施設の利用・申込みがない未就学児がいますか？',
    helpText: '介護・看護の対象となっている場合は除く',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_no_enrollment_no', points: 0 },
      { label: 'はい（-50）', value: 'adj_sibling_no_enrollment_yes', points: -50 },
    ],
  },
];

export const yokoteData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
