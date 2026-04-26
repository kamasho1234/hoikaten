import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 生駒市 保育園入園 利用調整基準データ
// 出典: 生駒市「保育所等入所案内」（令和8年度用）
//   https://www.city.ikoma.lg.jp/0000038/38925/1_R8nyusyoannai.pdf
// 参考: 奈良市の基準を参考値として採用
// 生駒市は近隣の奈良市と同様のシステムを採用
// ---------------------------------------------------------------------------

const municipality = {
  id: 'ikoma',
  name: '生駒市',
  slug: 'ikoma',
  prefecture: '奈良県',
  maxBasePoints: 200, // 父母各100点
} as const;

// ---------------------------------------------------------------------------
// 就労時間に応じた基本指数（父母共通、各最大100点）
// ---------------------------------------------------------------------------

const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月160時間以上', value: `${prefix}_employment_100`, points: 100 },
  { label: '月150〜159時間', value: `${prefix}_employment_95`, points: 95 },
  { label: '月130〜149時間', value: `${prefix}_employment_90`, points: 90 },
  { label: '月120〜129時間', value: `${prefix}_employment_85`, points: 85 },
  { label: '月110〜119時間', value: `${prefix}_employment_80`, points: 80 },
  { label: '月100〜109時間', value: `${prefix}_employment_75`, points: 75 },
  { label: '月80〜99時間', value: `${prefix}_employment_70`, points: 70 },
  { label: '月70〜79時間', value: `${prefix}_employment_65`, points: 65 },
  { label: '月64〜69時間', value: `${prefix}_employment_63`, points: 63 },
];

// ---------------------------------------------------------------------------
// 疾病・障害（父母共通）
// ---------------------------------------------------------------------------

const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '精神1級・身体1種1〜4級・療育A1/A2', value: `${prefix}_illness_80`, points: 80 },
  { label: '精神2級・身体2種2〜4級・療育B1', value: `${prefix}_illness_70a`, points: 70 },
  { label: '身体2種5級以下・精神3級・療育B2', value: `${prefix}_illness_60`, points: 60 },
  { label: '手帳なし（精神疾患の治療を要する）', value: `${prefix}_illness_50`, points: 50 },
  { label: '2か月以上の入院が見込まれる', value: `${prefix}_illness_70b`, points: 70 },
  { label: '1か月以上2か月未満の入院が見込まれる', value: `${prefix}_illness_40`, points: 40 },
  { label: 'その他療養を要する', value: `${prefix}_illness_30`, points: 30 },
];

// ---------------------------------------------------------------------------
// 介護・看護（父母共通）
// ---------------------------------------------------------------------------

const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '要介護5・4程度、精神1級、身体1種1〜4級、療育A1/A2', value: `${prefix}_care_80`, points: 80 },
  { label: '要介護3・2程度、精神2級、身体2種2〜4級、療育B1', value: `${prefix}_care_70`, points: 70 },
  { label: '要介護1程度、精神3級、身体2種5級以下、療育B2', value: `${prefix}_care_60`, points: 60 },
  { label: 'その他で同居親族の介護・看護を必要とする', value: `${prefix}_care_50`, points: 50 },
];

// ---------------------------------------------------------------------------
// 就学（父母共通 — 就労と同じ時間区分で判定）
// ---------------------------------------------------------------------------

const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '月160時間以上', value: `${prefix}_education_100`, points: 100 },
  { label: '月150〜159時間', value: `${prefix}_education_95`, points: 95 },
  { label: '月130〜149時間', value: `${prefix}_education_90`, points: 90 },
  { label: '月120〜129時間', value: `${prefix}_education_85`, points: 85 },
  { label: '月110〜119時間', value: `${prefix}_education_80`, points: 80 },
  { label: '月100〜109時間', value: `${prefix}_education_75`, points: 75 },
  { label: '月80〜99時間', value: `${prefix}_education_70`, points: 70 },
  { label: '月70〜79時間', value: `${prefix}_education_65`, points: 65 },
  { label: '月64〜69時間', value: `${prefix}_education_63`, points: 63 },
];

// ---------------------------------------------------------------------------
// 求職活動（父母共通）
// ---------------------------------------------------------------------------

const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動中', value: `${prefix}_jobseeking_55`, points: 55 },
];

// ---------------------------------------------------------------------------
// 不存在（父母共通）
// ---------------------------------------------------------------------------

const absentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_absent_none`, points: 0 },
  { label: '不存在（離婚・死別・未婚等）', value: `${prefix}_absent_100`, points: 100 },
];

// ---------------------------------------------------------------------------
// 出産（母のみ）
// ---------------------------------------------------------------------------

const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '妊娠・出産', value: `${prefix}_childbirth_85`, points: 85 },
];

// ---------------------------------------------------------------------------
// 保護者ごとの質問を生成するヘルパー
// ---------------------------------------------------------------------------

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  // 母のみ「妊娠・出産」の選択肢がある
  const reasonOptions = [
    { label: '仕事をしている', value: `${prefix}_reason_employment`, points: 0 },
    { label: '疾病・障がいがある', value: `${prefix}_reason_illness`, points: 0 },
    { label: '同居親族の介護・看護をしている', value: `${prefix}_reason_care`, points: 0 },
    ...(parentNum === 2
      ? [{ label: '妊娠・出産', value: `${prefix}_reason_childbirth`, points: 0 }]
      : []),
    { label: '仕事を探している', value: `${prefix}_reason_jobseeking`, points: 0 },
    { label: '学校に通っている', value: `${prefix}_reason_education`, points: 0 },
    { label: '不存在（離婚・死別・未婚等）', value: `${prefix}_reason_absent`, points: 0 },
  ];

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: 'いちばん近いものをひとつ選んでください',
    inputType: 'select',
    options: reasonOptions,
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}はどのくらい働いていますか？`,
      helpText: '月あたりの就労時間を選んでください',
      inputType: 'radio',
      options: employmentOptions(prefix),
    },
    {
      id: `${prefix}_illness`,
      category,
      label: `${parentLabel}の疾病・障がいの状況は？`,
      helpText: '手帳の等級または入院の見込み期間を選んでください',
      inputType: 'radio',
      options: illnessOptions(prefix),
    },
    {
      id: `${prefix}_care`,
      category,
      label: `${parentLabel}が介護している方の状況は？`,
      helpText: '被介護者の要介護度や手帳の等級を選んでください',
      inputType: 'radio',
      options: careOptions(prefix),
    },
    ...(parentNum === 2
      ? [
          {
            id: `${prefix}_childbirth`,
            category,
            label: `${parentLabel}の出産の状況は？`,
            inputType: 'radio' as const,
            options: childbirthOptions(prefix),
          },
        ]
      : []),
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
      label: `${parentLabel}はどのくらい学校に通っていますか？`,
      helpText: '月あたりの通学時間を選んでください',
      inputType: 'radio',
      options: educationOptions(prefix),
    },
    {
      id: `${prefix}_absent`,
      category,
      label: `${parentLabel}は不存在ですか？`,
      helpText: '離婚・死別・未婚等で不存在の場合',
      inputType: 'radio',
      options: absentOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// ---------------------------------------------------------------------------
// 調整指数（加点その1 ＋ 加点その2）
// ---------------------------------------------------------------------------

const adjustmentQuestions: Question[] = [
  // ── 加点その1（最高1つのみ加点）──
  {
    id: 'adj_bonus_one',
    category: 'adjustment',
    label: '以下の加点項目にあてはまりますか？（最大1つ）',
    helpText: '加点その1は最も高い1つだけが適用されます',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_bonus_one_none', points: 0 },
      { label: '生駒市内の認可保育施設で保育士・看護師として勤務（予定含む）', value: 'adj_bonus_one_nursery_staff', points: 40 },
      { label: 'ひとり親', value: 'adj_bonus_one_single_parent', points: 30 },
      { label: 'きょうだいがすでに希望園に在園している', value: 'adj_bonus_one_sibling_same', points: 25 },
      { label: '育児休業からの復帰に伴う入所申請', value: 'adj_bonus_one_parental_leave', points: 14 },
      { label: 'きょうだいが同じ園を希望して入園申請している', value: 'adj_bonus_one_sibling_simultaneous', points: 11 },
    ],
  },
  // ── 加点その2（重複加点可能）──
  {
    id: 'adj_unlicensed_nursery',
    category: 'adjustment',
    label: '企業主導型・認可外保育施設・一時預かり保育を月64時間以上継続利用していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unlicensed_nursery_no', points: 0 },
      { label: 'はい', value: 'adj_unlicensed_nursery_yes', points: 3 },
    ],
  },
  {
    id: 'adj_single_transfer',
    category: 'adjustment',
    label: '保護者のどちらかが単身赴任していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_transfer_no', points: 0 },
      { label: 'はい', value: 'adj_single_transfer_yes', points: 1 },
    ],
  },
  {
    id: 'adj_grandparent_cohabit',
    category: 'adjustment',
    label: '65歳以上の祖父母と同居していて、その祖父母に保育が必要な理由がない場合',
    helpText: '該当する場合は減点になります',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_grandparent_cohabit_no', points: 0 },
      { label: 'あてはまる', value: 'adj_grandparent_cohabit_yes', points: -5 },
    ],
  },
  {
    id: 'adj_rejection',
    category: 'adjustment',
    label: '1年以内に内定を辞退したことがありますか？',
    helpText: '該当する場合は減点になります',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_rejection_no', points: 0 },
      { label: 'はい', value: 'adj_rejection_yes', points: -5 },
    ],
  },
];

// ---------------------------------------------------------------------------
// エクスポート
// ---------------------------------------------------------------------------

export const ikomaData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
