import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 和歌山市 保育園入園 基本点数・調整点数データ
// 出典：令和8年度 和歌山市保育所・認定こども園（保育部分）利用申込ご案内
// https://www.city.wakayama.wakayama.jp/kurashi/kosodate/1001104/1010398/1001801.html
// https://www.city.wakayama.wakayama.jp/_res/projects/default_project/_page_/001/001/801/R8riyoannai.pdf
// ---------------------------------------------------------------------------
//
// 和歌山市の利用調整は以下のように算出されます。
//   利用調整指数 ＝ 父母のうち基本点数の低い方 ＋ 調整点数
// 父母それぞれの基本点数を算出し、低い方を採用します（scoringMethod: "min"）。
// 基本点数は最大10点（フルタイム就労 月120時間以上）。
//
// 和歌山市では毎月15日の申込締切後、保護者の就労状況や家庭状況等から
// 保育の必要性の高さによって利用調整を行います。面接による家庭調査も実施されます。
//
// 保育必要量は次の2区分です。
//   保育標準時間 ＝ 月120時間以上の就労（最長11時間利用）
//   保育短時間   ＝ 月48〜120時間未満の就労（最長8時間利用）
// ---------------------------------------------------------------------------

const municipality = {
  id: 'wakayama',
  name: '和歌山市',
  slug: 'wakayama',
  prefecture: '和歌山県',
  maxBasePoints: 10,
  scoringMethod: 'min' as const,
} as const;

// ---------------------------------------------------------------------------
// ① 就労（家庭外労働・自営含む）
// ---------------------------------------------------------------------------

const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_emp_none`, points: 0 },
  { label: '就労：月120時間以上（フルタイム）', value: `${prefix}_emp_10`, points: 10 },
  { label: '就労：月100時間以上120時間未満', value: `${prefix}_emp_9`, points: 9 },
  { label: '就労：月80時間以上100時間未満', value: `${prefix}_emp_8`, points: 8 },
  { label: '就労：月64時間以上80時間未満', value: `${prefix}_emp_7`, points: 7 },
  { label: '就労：月48時間以上64時間未満', value: `${prefix}_emp_6`, points: 6 },
  { label: '内職：月120時間以上', value: `${prefix}_emp_naishoku_7`, points: 7 },
  { label: '内職：月64時間以上120時間未満', value: `${prefix}_emp_naishoku_5`, points: 5 },
  { label: '内職：月48時間以上64時間未満', value: `${prefix}_emp_naishoku_4`, points: 4 },
];

// ---------------------------------------------------------------------------
// ② 妊娠・出産
// ---------------------------------------------------------------------------

const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産予定日の前後2か月（産前産後）', value: `${prefix}_childbirth_8`, points: 8 },
];

// ---------------------------------------------------------------------------
// ③ 疾病・障害
// ---------------------------------------------------------------------------

const illnessDisabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院中', value: `${prefix}_illness_10`, points: 10 },
  { label: '居宅内療養（安静が必要）', value: `${prefix}_illness_8`, points: 8 },
  { label: '通院加療中', value: `${prefix}_illness_6`, points: 6 },
  { label: '身体障害者手帳1・2級', value: `${prefix}_disability_10`, points: 10 },
  { label: '身体障害者手帳3・4級', value: `${prefix}_disability_8`, points: 8 },
  { label: '精神障害者保健福祉手帳1・2級', value: `${prefix}_disability_mental_9`, points: 9 },
  { label: '精神障害者保健福祉手帳3級', value: `${prefix}_disability_mental_7`, points: 7 },
  { label: '療育手帳A', value: `${prefix}_disability_ryouiku_a`, points: 9 },
  { label: '療育手帳B', value: `${prefix}_disability_ryouiku_b`, points: 7 },
];

// ---------------------------------------------------------------------------
// ④ 介護・看護
// ---------------------------------------------------------------------------

const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '常時介護・看護が必要（月120時間以上）', value: `${prefix}_care_10`, points: 10 },
  { label: '介護・看護（月80時間以上120時間未満）', value: `${prefix}_care_8`, points: 8 },
  { label: '介護・看護（月48時間以上80時間未満）', value: `${prefix}_care_6`, points: 6 },
];

// ---------------------------------------------------------------------------
// ⑤ 災害復旧
// ---------------------------------------------------------------------------

const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '災害復旧に当たっている', value: `${prefix}_disaster_10`, points: 10 },
];

// ---------------------------------------------------------------------------
// ⑥ 求職活動
// ---------------------------------------------------------------------------

const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動中（3か月以内に就労予定）', value: `${prefix}_jobseeking_3`, points: 3 },
];

// ---------------------------------------------------------------------------
// ⑦ 就学
// ---------------------------------------------------------------------------

const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '通学：月120時間以上', value: `${prefix}_education_9`, points: 9 },
  { label: '通学：月80時間以上120時間未満', value: `${prefix}_education_7`, points: 7 },
  { label: '通学：月48時間以上80時間未満', value: `${prefix}_education_5`, points: 5 },
  { label: '職業訓練：月120時間以上', value: `${prefix}_education_vt_10`, points: 10 },
  { label: '職業訓練：月80時間以上120時間未満', value: `${prefix}_education_vt_8`, points: 8 },
  { label: '職業訓練：月48時間以上80時間未満', value: `${prefix}_education_vt_6`, points: 6 },
];

// ---------------------------------------------------------------------------
// ⑧ 虐待・DV等
// ---------------------------------------------------------------------------

const abuseOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_abuse_none`, points: 0 },
  { label: '虐待・DV等のおそれがある', value: `${prefix}_abuse_10`, points: 10 },
];

// ---------------------------------------------------------------------------
// ⑨ 育児休業（継続利用）
// ---------------------------------------------------------------------------

const childcareLeaveOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childcareleave_none`, points: 0 },
  { label: '育児休業中（就労認定で在園中の継続利用）', value: `${prefix}_childcareleave_3`, points: 3 },
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
    helpText: '和歌山市では父母それぞれの基本点数を算出し、低い方の点数を採用します。いちばん近いものをひとつ選んでください。',
    inputType: 'select',
    options: [
      { label: '働いている（就労・自営・内職）', value: `${prefix}_reason_emp`, points: 0 },
      { label: '妊娠・出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '病気・障害', value: `${prefix}_reason_illness`, points: 0 },
      { label: '介護・看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '災害復旧', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '仕事を探している', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '学校・職業訓練に通っている', value: `${prefix}_reason_education`, points: 0 },
      { label: '虐待・DV等のおそれ', value: `${prefix}_reason_abuse`, points: 0 },
      { label: '育児休業中（継続利用）', value: `${prefix}_reason_childcareleave`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_emp`,
      category,
      label: `${parentLabel}の就労状況は？`,
      helpText: '月あたりの就労時間に応じて点数が決まります。月120時間以上が保育標準時間の認定要件です',
      inputType: 'radio',
      options: employmentOptions(prefix),
    },
    {
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}の出産の状況は？`,
      helpText: '出産予定日の前後2か月が認定期間です（最短5週間）。期間終了後は退所となります',
      inputType: 'radio',
      options: childbirthOptions(prefix),
    },
    {
      id: `${prefix}_illness`,
      category,
      label: `${parentLabel}の疾病・障害の状況は？`,
      helpText: '身体障害者手帳・療育手帳・精神障害者保健福祉手帳をお持ちの方、または診断書がある方が対象です',
      inputType: 'radio',
      options: illnessDisabilityOptions(prefix),
    },
    {
      id: `${prefix}_care`,
      category,
      label: `${parentLabel}の介護・看護の状況は？`,
      helpText: '同居または長期入院している親族の介護・看護が対象です',
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
      helpText: '認定期間は3か月です。期間内に就労が決まらない場合は退所となります',
      inputType: 'radio',
      options: jobSeekingOptions(prefix),
    },
    {
      id: `${prefix}_education`,
      category,
      label: `${parentLabel}の就学の状況は？`,
      helpText: '学校・職業訓練校に通学している場合が対象です。卒業（修了）まで認定されます',
      inputType: 'radio',
      options: educationOptions(prefix),
    },
    {
      id: `${prefix}_abuse`,
      category,
      label: `${parentLabel}に虐待・DVの状況がありますか？`,
      inputType: 'radio',
      options: abuseOptions(prefix),
    },
    {
      id: `${prefix}_childcareleave`,
      category,
      label: `${parentLabel}は育児休業中ですか？`,
      helpText: '就労認定で在園中のお子さんの継続利用に限り認められます。育児休業対象児が1歳になる年度末までです',
      inputType: 'radio',
      options: childcareLeaveOptions(prefix),
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
    helpText: 'ひとり親家庭の場合、調整点数+3が加算されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい（+3）', value: 'adj_single_parent_yes', points: 3 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護受給世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_welfare_yes', points: 2 },
    ],
  },
  {
    id: 'adj_sibling_enrolled',
    category: 'adjustment',
    label: 'きょうだいが希望する施設に在園していますか？',
    helpText: '保育を理由に入所中のきょうだいがいる施設への申込みの場合',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_sibling_enrolled_no', points: 0 },
      { label: 'きょうだいが同一施設に在園中（+3）', value: 'adj_sibling_enrolled_yes', points: 3 },
    ],
  },
  {
    id: 'adj_sibling_simultaneous',
    category: 'adjustment',
    label: 'きょうだいと同時に入所を申し込みますか？',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_sibling_simultaneous_no', points: 0 },
      { label: 'きょうだいと同時申込（+1）', value: 'adj_sibling_simultaneous_yes', points: 1 },
    ],
  },
  {
    id: 'adj_multi_child',
    category: 'adjustment',
    label: '多子世帯（3人以上扶養）ですか？',
    helpText: '乳幼児を3人以上扶養している世帯、または多胎児で同時申込みの場合',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_multi_child_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_multi_child_yes', points: 1 },
    ],
  },
  {
    id: 'adj_ikukyu_fukushoku',
    category: 'adjustment',
    label: '育児休業からの復帰予定ですか？',
    helpText: '入所に伴い育児休業から復帰する場合に加点されます。復帰後1か月以内に復職証明の提出が必要です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_ikukyu_fukushoku_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_ikukyu_fukushoku_yes', points: 2 },
    ],
  },
  {
    id: 'adj_ninkagai',
    category: 'adjustment',
    label: '認可外保育施設等を利用中ですか？',
    helpText: '認可外保育施設・企業主導型保育所等を月48時間以上利用している場合（育休中の利用は除く）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_ninkagai_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_ninkagai_yes', points: 2 },
    ],
  },
  {
    id: 'adj_hoikushi',
    category: 'adjustment',
    label: '保護者が和歌山市内の保育施設で保育士として勤務していますか？',
    helpText: '市内認可保育施設・認定こども園での勤務（内定含む）が対象です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_hoikushi_no', points: 0 },
      { label: 'はい（+3）', value: 'adj_hoikushi_yes', points: 3 },
    ],
  },
  {
    id: 'adj_grandparent',
    category: 'adjustment',
    label: '65歳未満の祖父母等と同居していますか？',
    helpText: '65歳未満で無職の祖父母等と同居している場合（病気療養中の方は除く）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_grandparent_no', points: 0 },
      { label: 'はい（-1）', value: 'adj_grandparent_yes', points: -1 },
    ],
  },
  {
    id: 'adj_child_disability',
    category: 'adjustment',
    label: '対象のお子さんに障害がありますか？',
    helpText: '在宅障害児の保育が必要な場合',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_child_disability_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_child_disability_yes', points: 2 },
    ],
  },
];

// ---------------------------------------------------------------------------
// エクスポート
// ---------------------------------------------------------------------------

export const wakayamaData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
