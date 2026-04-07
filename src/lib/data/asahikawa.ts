import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 旭川市 保育園入園 基礎点数・調整点数データ
// 出典：旭川市保育所等利用調整基準（令和8年度用）
// https://www.city.asahikawa.hokkaido.jp/800/810/006/d082185.html
// https://www.city.asahikawa.hokkaido.jp/800/810/006/d082185_d/fil/tyouseikijun.pdf
// ---------------------------------------------------------------------------
//
// 旭川市の利用調整は以下のように算出されます。
//   基礎点数 ＝ 父の基礎点数 ＋ 母の基礎点数
//   合計点数 ＝ 基礎点数 ＋ 調整点数
// 父母がいない場合は、その他の保護者で基礎点数を設定します。
// 父母が複数の保育の必要性の事由に該当する場合は、原則として
// 基礎点数が高い事由のみを設定します。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'asahikawa',
  name: '旭川市',
  slug: 'asahikawa',
  prefecture: '北海道',
  maxBasePoints: 200, // 父母各100点の合計
} as const;

// ---------------------------------------------------------------------------
// 就労（被雇用者・自営業者）
// ---------------------------------------------------------------------------

const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月160時間以上（フルタイム）', value: `${prefix}_employment_100`, points: 100 },
  { label: '月140時間以上160時間未満', value: `${prefix}_employment_90`, points: 90 },
  { label: '月120時間以上140時間未満', value: `${prefix}_employment_80`, points: 80 },
  { label: '月100時間以上120時間未満', value: `${prefix}_employment_70`, points: 70 },
  { label: '月80時間以上100時間未満', value: `${prefix}_employment_60`, points: 60 },
  { label: '月60時間以上80時間未満', value: `${prefix}_employment_50`, points: 50 },
];

// ---------------------------------------------------------------------------
// 就労（内職者）
// ---------------------------------------------------------------------------

const homeworkOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_homework_none`, points: 0 },
  { label: '月160時間以上', value: `${prefix}_homework_80`, points: 80 },
  { label: '月140時間以上160時間未満', value: `${prefix}_homework_70`, points: 70 },
  { label: '月120時間以上140時間未満', value: `${prefix}_homework_60`, points: 60 },
  { label: '月100時間以上120時間未満', value: `${prefix}_homework_50`, points: 50 },
  { label: '月80時間以上100時間未満', value: `${prefix}_homework_40`, points: 40 },
  { label: '月60時間以上80時間未満', value: `${prefix}_homework_30`, points: 30 },
];

// ---------------------------------------------------------------------------
// 妊娠・出産（母のみ）
// ---------------------------------------------------------------------------

const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '産前6週〜産後8週（多胎は産前14週〜）', value: `${prefix}_childbirth_100`, points: 100 },
];

// ---------------------------------------------------------------------------
// 疾病・障害
// ---------------------------------------------------------------------------

const illnessDisabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院（1か月以上）', value: `${prefix}_illness_100a`, points: 100 },
  { label: '自宅療養：常時臥床', value: `${prefix}_illness_100b`, points: 100 },
  { label: '自宅療養：精神性疾患', value: `${prefix}_illness_80`, points: 80 },
  { label: '自宅療養：上記以外', value: `${prefix}_illness_50`, points: 50 },
  { label: '身体障害者手帳 1級・2級（聴覚6級以上、音声・言語4級以上）', value: `${prefix}_disability_100a`, points: 100 },
  { label: '身体障害者手帳 3級', value: `${prefix}_disability_90`, points: 90 },
  { label: '療育手帳（A・B）', value: `${prefix}_disability_100b`, points: 100 },
  { label: '精神障害者保健福祉手帳（1級・2級・3級）', value: `${prefix}_disability_100c`, points: 100 },
];

// ---------------------------------------------------------------------------
// 親族等の介護・看護
// ---------------------------------------------------------------------------

const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '病院等での付添入院（月15日以上かつ月60時間以上）', value: `${prefix}_care_100`, points: 100 },
  { label: '在宅：重度心身障害者またはねたきり老人の介護・看護（月60時間以上）', value: `${prefix}_care_80`, points: 80 },
  { label: '在宅：軽度心身症障害者の介護・看護（月60時間以上）', value: `${prefix}_care_40`, points: 40 },
];

// ---------------------------------------------------------------------------
// 災害復旧
// ---------------------------------------------------------------------------

const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '災害復旧', value: `${prefix}_disaster_100`, points: 100 },
];

// ---------------------------------------------------------------------------
// 求職活動
// ---------------------------------------------------------------------------

const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動中', value: `${prefix}_jobseeking_30`, points: 30 },
];

// ---------------------------------------------------------------------------
// 就学・職業訓練
// ---------------------------------------------------------------------------

const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '月160時間以上', value: `${prefix}_education_100`, points: 100 },
  { label: '月140時間以上160時間未満', value: `${prefix}_education_90`, points: 90 },
  { label: '月120時間以上140時間未満', value: `${prefix}_education_80`, points: 80 },
  { label: '月100時間以上120時間未満', value: `${prefix}_education_70`, points: 70 },
  { label: '月80時間以上100時間未満', value: `${prefix}_education_60`, points: 60 },
  { label: '月60時間以上80時間未満', value: `${prefix}_education_50`, points: 50 },
];

// ---------------------------------------------------------------------------
// 虐待・DV
// ---------------------------------------------------------------------------

const abuseOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_abuse_none`, points: 0 },
  { label: '虐待・DVのおそれがある', value: `${prefix}_abuse_100`, points: 100 },
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
    helpText: '旭川市では父母それぞれの基礎点数を合算します。いちばん近いものをひとつ選んでください。',
    inputType: 'select',
    options: [
      { label: '仕事をしている（被雇用者・自営業者）', value: `${prefix}_reason_employment`, points: 0 },
      { label: '仕事をしている（内職者）', value: `${prefix}_reason_homework`, points: 0 },
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
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の就労時間（月あたり）は？`,
      helpText: '被雇用者・自営業者が対象です',
      inputType: 'radio',
      options: employmentOptions(prefix),
    },
    {
      id: `${prefix}_homework`,
      category,
      label: `${parentLabel}の内職の時間（月あたり）は？`,
      helpText: '内職者が対象です。被雇用者・自営業者より基礎点数が低くなります',
      inputType: 'radio',
      options: homeworkOptions(prefix),
    },
    {
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}の出産の状況は？`,
      helpText: '産前6週（多胎妊娠は産前14週）から産後8週が対象です（母のみ）',
      inputType: 'radio',
      options: childbirthOptions(prefix),
    },
    {
      id: `${prefix}_illness`,
      category,
      label: `${parentLabel}の疾病・障害の状況は？`,
      helpText: '入院、自宅療養、障害者手帳の等級に応じて点数が決まります',
      inputType: 'radio',
      options: illnessDisabilityOptions(prefix),
    },
    {
      id: `${prefix}_care`,
      category,
      label: `${parentLabel}の介護・看護の状況は？`,
      helpText: '親族等の介護・看護が月60時間以上の場合が対象です',
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
      label: `${parentLabel}の就学・職業訓練の時間（月あたり）は？`,
      helpText: '月あたりの就学・訓練時間を選んでください',
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
// 調整点数の質問
// ---------------------------------------------------------------------------

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親家庭ですか？',
    helpText: 'ひとり親家庭の場合、調整点数+130が加算されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい（+130）', value: 'adj_single_parent_yes', points: 130 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯で就労による自立支援につながる場合ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい（+10）', value: 'adj_welfare_yes', points: 10 },
    ],
  },
  {
    id: 'adj_unemployment',
    category: 'adjustment',
    label: '生計中心者等の失業により就労の必要性が高いですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unemployment_no', points: 0 },
      { label: 'はい（+10）', value: 'adj_unemployment_yes', points: 10 },
    ],
  },
  {
    id: 'adj_child_disability',
    category: 'adjustment',
    label: '小学校就学前の子どもに障害がありますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_child_disability_no', points: 0 },
      { label: 'はい（+20）', value: 'adj_child_disability_yes', points: 20 },
    ],
  },
  {
    id: 'adj_ikukyu',
    category: 'adjustment',
    label: '育休明けの入所希望ですか？',
    helpText: '育児休業から復帰して入所を希望する場合に加点されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_ikukyu_no', points: 0 },
      { label: 'はい（+50）', value: 'adj_ikukyu_yes', points: 50 },
    ],
  },
  {
    id: 'adj_sankyu',
    category: 'adjustment',
    label: '産休明け（産後8週経過した翌日から）の入所希望ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sankyu_no', points: 0 },
      { label: 'はい（+50）', value: 'adj_sankyu_yes', points: 50 },
    ],
  },
  {
    id: 'adj_sibling_enrolled',
    category: 'adjustment',
    label: 'きょうだいが認可保育所等にすでに入所していますか？',
    helpText: '兄弟姉妹と同一の認定こども園を希望している場合は1号利用を含みます',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_sibling_enrolled_no', points: 0 },
      { label: 'はい（+50）', value: 'adj_sibling_enrolled_yes', points: 50 },
    ],
  },
  {
    id: 'adj_chiikigata',
    category: 'adjustment',
    label: '地域型保育事業または乳児保育所の卒園児ですか？',
    helpText: '小規模保育所・家庭的保育事業等の卒園（予定含む）の場合',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_chiikigata_no', points: 0 },
      { label: 'はい（+130）', value: 'adj_chiikigata_yes', points: 130 },
    ],
  },
  {
    id: 'adj_multi_children',
    category: 'adjustment',
    label: '多子家庭に該当しますか？',
    helpText: '小学校就学前の児童数で判定します',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_multi_children_no', points: 0 },
      { label: '小学校就学前児童2人（+5）', value: 'adj_multi_children_2', points: 5 },
      { label: '小学校就学前児童3人以上（+10）', value: 'adj_multi_children_3', points: 10 },
    ],
  },
  {
    id: 'adj_childcare_worker',
    category: 'adjustment',
    label: '保護者が認可保育所等で保育士として従事していますか？',
    helpText: '認可保育所等で保育士として教育・保育に従事する場合、または放課後児童健全育成事業に従事する場合が対象です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_childcare_worker_no', points: 0 },
      { label: 'はい（+100）', value: 'adj_childcare_worker_yes', points: 100 },
    ],
  },
  {
    id: 'adj_foster',
    category: 'adjustment',
    label: '里親制度を利用していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_foster_no', points: 0 },
      { label: 'はい（+15）', value: 'adj_foster_yes', points: 15 },
    ],
  },
  {
    id: 'adj_kodomoen_transfer',
    category: 'adjustment',
    label: '同一認定こども園内で1号認定から2号認定へ移りますか？',
    helpText: '現在1号認定（教育利用）で通っている認定こども園で2号認定（保育利用）に変更する場合',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_kodomoen_transfer_no', points: 0 },
      { label: 'はい（+1000）', value: 'adj_kodomoen_transfer_yes', points: 1000 },
    ],
  },
];

// ---------------------------------------------------------------------------
// エクスポート
// ---------------------------------------------------------------------------

export const asahikawaData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
