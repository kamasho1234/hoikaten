import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 長野市 保育園入園 基本点数・調整点数データ
// 出典：長野市 保育施設等利用調整基準表（令和8年度 保育利用版利用のご案内 33-34ページ）
// https://www.city.nagano.nagano.jp/n117000/kosodate/p001543.html
// ---------------------------------------------------------------------------
//
// 長野市の利用調整は以下のように算出されます。
//   利用調整点数 ＝ 保護者のうち基本点数の低い方 ＋ 調整点数
// 保護者1人ずつに基本点数項目表で採点し、低い方の点数を基本点数とします。
// 基本点数は最大100点（月の就労時間160時間以上の場合）。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'nagano',
  name: '長野市',
  slug: 'nagano',
  prefecture: '長野県',
  maxBasePoints: 100,
  scoringMethod: 'min' as const,
} as const;

// ---------------------------------------------------------------------------
// ① 就労（類型A：会社等に雇用されている者）
// ---------------------------------------------------------------------------

const employmentAOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_empA_none`, points: 0 },
  { label: '月160時間以上', value: `${prefix}_empA_160`, points: 100 },
  { label: '月140〜160時間未満', value: `${prefix}_empA_140`, points: 95 },
  { label: '月120〜140時間未満', value: `${prefix}_empA_120`, points: 90 },
  { label: '月100〜120時間未満', value: `${prefix}_empA_100`, points: 70 },
  { label: '月80〜100時間未満', value: `${prefix}_empA_80`, points: 65 },
  { label: '月64〜80時間未満', value: `${prefix}_empA_64`, points: 60 },
];

// ---------------------------------------------------------------------------
// ② 就労（類型B：A以外の者＝自営業・親族雇用等）
// ---------------------------------------------------------------------------

const employmentBOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_empB_none`, points: 0 },
  { label: '月160時間以上', value: `${prefix}_empB_160`, points: 90 },
  { label: '月140〜160時間未満', value: `${prefix}_empB_140`, points: 85 },
  { label: '月120〜140時間未満', value: `${prefix}_empB_120`, points: 80 },
  { label: '月100〜120時間未満', value: `${prefix}_empB_100`, points: 60 },
  { label: '月80〜100時間未満', value: `${prefix}_empB_80`, points: 55 },
  { label: '月64〜80時間未満', value: `${prefix}_empB_64`, points: 50 },
  { label: '就労予定（事業主が親族）', value: `${prefix}_empB_yotei`, points: 20 },
];

// ---------------------------------------------------------------------------
// ③ 妊娠・出産
// ---------------------------------------------------------------------------

const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産予定日の6週前〜出産日の8週後', value: `${prefix}_childbirth_90`, points: 90 },
  { label: '上記期間以外（切迫早産・切迫流産等）', value: `${prefix}_childbirth_90s`, points: 90 },
  { label: '上記以外', value: `${prefix}_childbirth_60`, points: 60 },
];

// ---------------------------------------------------------------------------
// ④ 保護者の疾病・障害
// ---------------------------------------------------------------------------

const illnessDisabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院（1か月以上）・常時臥床', value: `${prefix}_illness_100`, points: 100 },
  { label: '自宅療養：週1回以上の通院を伴う1か月以上の療養', value: `${prefix}_illness_70`, points: 70 },
  { label: '自宅療養：その他乳幼児保育不可能と認められる療養', value: `${prefix}_illness_50`, points: 50 },
  { label: '身体障害者手帳 1級・2級', value: `${prefix}_disability_sh12`, points: 100 },
  { label: '身体障害者手帳 3級', value: `${prefix}_disability_sh3`, points: 80 },
  { label: '身体障害者手帳 4級', value: `${prefix}_disability_sh4`, points: 60 },
  { label: '療育手帳 A1・A2', value: `${prefix}_disability_ryA`, points: 100 },
  { label: '療育手帳 B1', value: `${prefix}_disability_ryB1`, points: 60 },
  { label: '療育手帳 B2', value: `${prefix}_disability_ryB2`, points: 40 },
  { label: '精神障害者保健福祉手帳 1級', value: `${prefix}_disability_se1`, points: 100 },
  { label: '精神障害者保健福祉手帳 2級', value: `${prefix}_disability_se2`, points: 80 },
  { label: '精神障害者保健福祉手帳 3級 / 国民年金証書', value: `${prefix}_disability_se3`, points: 40 },
];

// ---------------------------------------------------------------------------
// ⑤ 介護・看護
// ---------------------------------------------------------------------------

const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '在宅介護：要介護5・4、身障手帳1・2級等の親族（類型1-A準用）', value: `${prefix}_care_heavy`, points: 100 },
  { label: '在宅介護：上記以外の介護・看護を必要とする親族（類型1-B準用）', value: `${prefix}_care_other`, points: 90 },
  { label: '病院等での介護・看護：月140時間以上', value: `${prefix}_care_140`, points: 95 },
  { label: '病院等での介護・看護：月120〜140時間未満', value: `${prefix}_care_120`, points: 90 },
  { label: '病院等での介護・看護：月100〜120時間未満', value: `${prefix}_care_100`, points: 70 },
  { label: '病院等での介護・看護：月80〜100時間未満', value: `${prefix}_care_80`, points: 65 },
  { label: '病院等での介護・看護：月64〜80時間未満', value: `${prefix}_care_64`, points: 60 },
];

// ---------------------------------------------------------------------------
// ⑥ 災害復旧
// ---------------------------------------------------------------------------

const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '災害による家屋の損傷その他災害の復旧', value: `${prefix}_disaster_100`, points: 100 },
];

// ---------------------------------------------------------------------------
// ⑦ 求職活動
// ---------------------------------------------------------------------------

const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動中又は起業準備中', value: `${prefix}_jobseeking_20`, points: 20 },
];

// ---------------------------------------------------------------------------
// ⑧ 就学
// ---------------------------------------------------------------------------

const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '月160時間以上', value: `${prefix}_education_160`, points: 100 },
  { label: '月140〜160時間未満', value: `${prefix}_education_140`, points: 95 },
  { label: '月120〜140時間未満', value: `${prefix}_education_120`, points: 90 },
  { label: '月100〜120時間未満', value: `${prefix}_education_100`, points: 70 },
  { label: '月80〜100時間未満', value: `${prefix}_education_80`, points: 65 },
  { label: '月64〜80時間未満', value: `${prefix}_education_64`, points: 60 },
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
    helpText: '長野市では保護者それぞれの基本点数（最大100点）のうち低い方を採用します。いちばん近いものをひとつ選んでください。',
    inputType: 'select',
    options: [
      { label: '会社等に雇用されている（類型A）', value: `${prefix}_reason_empA`, points: 0 },
      { label: '自営業・親族雇用等（類型B）', value: `${prefix}_reason_empB`, points: 0 },
      { label: '妊娠・出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '病気・障害', value: `${prefix}_reason_illness`, points: 0 },
      { label: '介護・看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '災害復旧', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '仕事を探している・起業準備中', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '学校・職業訓練に通っている', value: `${prefix}_reason_education`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_empA`,
      category,
      label: `${parentLabel}の就労状況は？（会社等に雇用）`,
      helpText: '事業主が親族の場合を除く、会社等に雇用されている方が対象です',
      inputType: 'radio',
      options: employmentAOptions(prefix),
    },
    {
      id: `${prefix}_empB`,
      category,
      label: `${parentLabel}の就労状況は？（自営業・親族雇用等）`,
      helpText: '自営中心者、親族が事業主の場合などが対象です',
      inputType: 'radio',
      options: employmentBOptions(prefix),
    },
    {
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}の出産の状況は？`,
      helpText: '出産予定日の6週前〜出産日の8週後が90点です',
      inputType: 'radio',
      options: childbirthOptions(prefix),
    },
    {
      id: `${prefix}_illness`,
      category,
      label: `${parentLabel}の疾病・障害の状況は？`,
      helpText: '入院・自宅療養・障害者手帳の等級に応じて点数が決まります',
      inputType: 'radio',
      options: illnessDisabilityOptions(prefix),
    },
    {
      id: `${prefix}_care`,
      category,
      label: `${parentLabel}の介護・看護の状況は？`,
      helpText: '同居又は長期入院等している親族の介護・看護が対象です（別居の祖父母を含む）',
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
      label: `${parentLabel}は求職活動・起業準備中ですか？`,
      inputType: 'radio',
      options: jobSeekingOptions(prefix),
    },
    {
      id: `${prefix}_education`,
      category,
      label: `${parentLabel}の就学・職業訓練の状況は？`,
      helpText: '学校教育法第1条に規定する学校及び職業訓練校に通学（通信制を除く）',
      inputType: 'radio',
      options: educationOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// ---------------------------------------------------------------------------
// 調整点数の質問
// ---------------------------------------------------------------------------

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親世帯ですか？',
    helpText: '離婚、離婚調停中、未婚、死別、行方不明等の場合、調整点+40が加算されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい（+40）', value: 'adj_single_parent_yes', points: 40 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯ですか？',
    helpText: '自立支援につながる場合（基本点数項目表の類型1・6・7のいずれかに父母ともが該当すること）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい（+10）', value: 'adj_welfare_yes', points: 10 },
    ],
  },
  {
    id: 'adj_unemployment',
    category: 'adjustment',
    label: '生計中心者の失業等により、就労の必要性が高いですか？',
    helpText: '生計中心者の自己都合以外の失業・長期休業を理由に求職活動・新規就労のため新規利用を希望する場合（利用開始日の前1年以内の離職・長期休業に限る）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unemployment_no', points: 0 },
      { label: 'はい（+15）', value: 'adj_unemployment_yes', points: 15 },
    ],
  },
  {
    id: 'adj_child_disability',
    category: 'adjustment',
    label: '対象のお子さんが障がいにかかる手帳の交付を受けていますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_child_disability_no', points: 0 },
      { label: 'はい（+10）', value: 'adj_child_disability_yes', points: 10 },
    ],
  },
  {
    id: 'adj_ikukyu',
    category: 'adjustment',
    label: '育児休業明けですか？',
    helpText: '育児休業明けの場合の加点です。きょうだいの状況により点数が異なります',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_ikukyu_no', points: 0 },
      { label: 'きょうだいが利用していない施設を第1希望にして新規利用を希望（+15）', value: 'adj_ikukyu_new', points: 15 },
      { label: 'きょうだいが利用中の施設を第1希望にして新規利用を希望（+35）', value: 'adj_ikukyu_sibling', points: 35 },
      { label: 'きょうだい（多胎児を含む）が同時に新規利用を希望（+25）', value: 'adj_ikukyu_twins', points: 25 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: 'きょうだい（多胎児を含む）が同一施設の利用を希望していますか？',
    helpText: '育児休業明けに該当しない場合のきょうだい加点です',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_sibling_no', points: 0 },
      { label: 'きょうだいが利用中の施設を第1希望にして新規利用を希望（+20）', value: 'adj_sibling_existing', points: 20 },
      { label: 'きょうだい（多胎児を含む）が同時に新規利用を希望（+15）', value: 'adj_sibling_simultaneous', points: 15 },
    ],
  },
  {
    id: 'adj_reentry',
    category: 'adjustment',
    label: '長期療養のために退所した児童が再入所を希望していますか？',
    helpText: '申込月より過去2年以内に児童本人の病気・けが療養が長期に渡ることを理由に退所した児童が再入所を希望する場合（退所前に市への所定の手続きが必要）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_reentry_no', points: 0 },
      { label: 'はい（+15）', value: 'adj_reentry_yes', points: 15 },
    ],
  },
  {
    id: 'adj_chiikigata',
    category: 'adjustment',
    label: '地域型保育事業の卒所児ですか？',
    helpText: '地域型保育事業の卒所児童で転所を希望する場合（4月入所の調整時のみ適用）',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_chiikigata_no', points: 0 },
      { label: 'はい（+10）', value: 'adj_chiikigata_yes', points: 10 },
    ],
  },
  {
    id: 'adj_transfer',
    category: 'adjustment',
    label: '転所を希望していますか？',
    helpText: '認可保育施設の閉鎖等による転所や、きょうだいが利用中の施設への転所など',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_transfer_no', points: 0 },
      { label: '認可施設の閉鎖等により他の施設へ転所を希望（+30）', value: 'adj_transfer_closure', points: 30 },
      { label: 'きょうだいが利用中の施設を第1希望にして転所を希望（+20）', value: 'adj_transfer_sibling', points: 20 },
    ],
  },
  {
    id: 'adj_single_parent_absent',
    category: 'adjustment',
    label: '保護者の一方が不在（単身赴任、海外勤務）ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_absent_no', points: 0 },
      { label: 'はい（+10）', value: 'adj_single_parent_absent_yes', points: 10 },
    ],
  },
  {
    id: 'adj_foster',
    category: 'adjustment',
    label: '利用希望児童が里親により養育されていますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_foster_no', points: 0 },
      { label: 'はい（+20）', value: 'adj_foster_yes', points: 20 },
    ],
  },
  {
    id: 'adj_third_child',
    category: 'adjustment',
    label: '利用希望児童が出生順位第3子以降ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_third_child_no', points: 0 },
      { label: 'はい（+5）', value: 'adj_third_child_yes', points: 5 },
    ],
  },
  {
    id: 'adj_childcare_worker',
    category: 'adjustment',
    label: '保護者が保育士・幼稚園教諭・保育教諭として長野市内で勤務していますか？',
    helpText: '月の就労時間が120時間未満の保育士、幼稚園教諭、保育教諭の場合（長野市内の認可保育施設、地域型保育事業所で勤務または勤務予定に限る）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_childcare_worker_no', points: 0 },
      { label: 'はい（+20）', value: 'adj_childcare_worker_yes', points: 20 },
    ],
  },
];

// ---------------------------------------------------------------------------
// エクスポート
// ---------------------------------------------------------------------------

export const naganoData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
