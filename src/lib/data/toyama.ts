import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 富山市 保育所等入所利用調整に関する基準データ
// 出典：富山市保育所等入所利用調整に関する基準（令和3年2月12日施行）
// https://ikusapotoyama.city.toyama.lg.jp/lgarticle/file?file=10111_R0302riyoutyouseikijun.pdf
// ---------------------------------------------------------------------------

const municipality = {
  id: 'toyama',
  name: '富山市',
  slug: 'toyama',
  prefecture: '富山県',
  maxBasePoints: 12, // 基礎点数の最大は12点（出産予定月以降の入所）
  scoringMethod: 'min' as const, // 父母のうち低い点数を採用
} as const;

// ---------------------------------------------------------------------------
// 保育が必要な理由ごとの選択肢テンプレート
// ---------------------------------------------------------------------------

/** 居宅外労働（農業で法人格の無いものを除く） */
const outsideWorkOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_outside_work_none`, points: 0 },
  { label: '月実働160時間以上', value: `${prefix}_outside_work_11`, points: 11 },
  { label: '月実働140時間以上160時間未満', value: `${prefix}_outside_work_10`, points: 10 },
  { label: '月実働120時間以上140時間未満', value: `${prefix}_outside_work_9`, points: 9 },
  { label: '月実働100時間以上120時間未満', value: `${prefix}_outside_work_8`, points: 8 },
  { label: '月実働80時間以上100時間未満', value: `${prefix}_outside_work_7`, points: 7 },
  { label: '月実働64時間以上80時間未満', value: `${prefix}_outside_work_6`, points: 6 },
];

/** 居宅内労働・農業（法人格なし）・内職 */
const insideWorkOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_inside_work_none`, points: 0 },
  { label: '月実働140時間以上', value: `${prefix}_inside_work_9`, points: 9 },
  { label: '月実働120時間以上140時間未満', value: `${prefix}_inside_work_8`, points: 8 },
  { label: '月実働100時間以上120時間未満', value: `${prefix}_inside_work_7`, points: 7 },
  { label: '月実働80時間以上100時間未満', value: `${prefix}_inside_work_6`, points: 6 },
  { label: '月実働64時間以上80時間未満', value: `${prefix}_inside_work_5`, points: 5 },
];

/** 妊娠・出産 */
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産予定月の前々月から入所', value: `${prefix}_childbirth_10`, points: 10 },
  { label: '出産予定月の前月から入所', value: `${prefix}_childbirth_11`, points: 11 },
  { label: '出産予定月以降の入所', value: `${prefix}_childbirth_12`, points: 12 },
];

/** 疾病・負傷 */
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '常時臥床または1ヶ月以上の入院', value: `${prefix}_illness_11`, points: 11 },
  { label: '精神疾患', value: `${prefix}_illness_10`, points: 10 },
  { label: '1ヶ月以上の自宅での安静加療を指示', value: `${prefix}_illness_9`, points: 9 },
  { label: '慢性疾患・長期疾病で1ヶ月以上の自宅療養を指示', value: `${prefix}_illness_8`, points: 8 },
];

/** 障害 */
const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '身体障害者手帳1〜2級／精神1〜2級／療育手帳A・B', value: `${prefix}_disability_11`, points: 11 },
  { label: '身体障害者手帳3級／精神3級', value: `${prefix}_disability_10`, points: 10 },
  { label: '身体障害者手帳4級', value: `${prefix}_disability_8`, points: 8 },
];

/** 同居親族の介護・看護（居宅内） */
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '居宅外で介護・看護（月実働160時間以上）', value: `${prefix}_care_11`, points: 11 },
  { label: '居宅外で介護・看護（月実働140時間以上160時間未満）', value: `${prefix}_care_10`, points: 10 },
  { label: '居宅外で介護・看護（月実働120時間以上140時間未満）', value: `${prefix}_care_9`, points: 9 },
  { label: '居宅内で介護・看護（月140時間以上）', value: `${prefix}_care_in9`, points: 9 },
  { label: '居宅内で介護・看護（月120時間以上140時間未満）', value: `${prefix}_care_in8`, points: 8 },
  { label: '居宅内で介護・看護（月100時間以上120時間未満）', value: `${prefix}_care_in7`, points: 7 },
  { label: '居宅内で介護・看護（月80時間以上100時間未満）', value: `${prefix}_care_in6`, points: 6 },
  { label: '居宅内で介護・看護（月64時間以上80時間未満）', value: `${prefix}_care_in5`, points: 5 },
];

/** 災害復旧 */
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '月実働160時間以上', value: `${prefix}_disaster_11`, points: 11 },
  { label: '月実働140時間以上160時間未満', value: `${prefix}_disaster_10`, points: 10 },
  { label: '月実働120時間以上140時間未満', value: `${prefix}_disaster_9`, points: 9 },
  { label: '月実働100時間以上120時間未満', value: `${prefix}_disaster_8`, points: 8 },
  { label: '月実働80時間以上100時間未満', value: `${prefix}_disaster_7`, points: 7 },
  { label: '月実働64時間以上80時間未満', value: `${prefix}_disaster_6`, points: 6 },
];

/** 求職活動 */
const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動中', value: `${prefix}_jobseeking_3`, points: 3 },
];

/** 就学・職業訓練 */
const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '月の授業時間160時間以上', value: `${prefix}_education_11`, points: 11 },
  { label: '月の授業時間140時間以上160時間未満', value: `${prefix}_education_10`, points: 10 },
  { label: '月の授業時間120時間以上140時間未満', value: `${prefix}_education_9`, points: 9 },
  { label: '月の授業時間100時間以上120時間未満', value: `${prefix}_education_8`, points: 8 },
  { label: '月の授業時間80時間以上100時間未満', value: `${prefix}_education_7`, points: 7 },
  { label: '月の授業時間64時間以上80時間未満', value: `${prefix}_education_6`, points: 6 },
];

// ---------------------------------------------------------------------------
// 保護者ごとの質問を生成するヘルパー
// ---------------------------------------------------------------------------

function buildParentQuestions(
  parentNum: 1 | 2,
): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  // 「保育が必要な理由」の大分類選択
  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: 'もっとも該当する理由をひとつ選んでください',
    inputType: 'select',
    options: [
      { label: '居宅外で仕事をしている', value: `${prefix}_reason_outside_work`, points: 0 },
      { label: '居宅内で仕事をしている（農業・内職含む）', value: `${prefix}_reason_inside_work`, points: 0 },
      { label: '妊娠中・出産前後', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '病気・負傷で療養中', value: `${prefix}_reason_illness`, points: 0 },
      { label: '障害がある', value: `${prefix}_reason_disability`, points: 0 },
      { label: '家族の介護・看護をしている', value: `${prefix}_reason_care`, points: 0 },
      { label: '災害の復旧にあたっている', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '仕事を探している', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '学校・職業訓練に通っている', value: `${prefix}_reason_education`, points: 0 },
    ],
  };

  // 各理由の詳細質問
  const detailQuestions: Question[] = [
    {
      id: `${prefix}_outside_work`,
      category,
      label: `${parentLabel}の居宅外就労時間は？`,
      helpText: '月あたりの実働時間を選んでください（超過勤務含む）',
      inputType: 'radio',
      options: outsideWorkOptions(prefix),
    },
    {
      id: `${prefix}_inside_work`,
      category,
      label: `${parentLabel}の居宅内就労時間は？`,
      helpText: '月あたりの実働時間を選んでください（農業・内職含む）',
      inputType: 'radio',
      options: insideWorkOptions(prefix),
    },
    {
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}の出産時期は？`,
      helpText: '出産予定月との関係を選んでください',
      inputType: 'radio',
      options: childbirthOptions(prefix),
    },
    {
      id: `${prefix}_illness`,
      category,
      label: `${parentLabel}の病気・負傷の状況は？`,
      helpText: 'いちばん近い状態を選んでください',
      inputType: 'radio',
      options: illnessOptions(prefix),
    },
    {
      id: `${prefix}_disability`,
      category,
      label: `${parentLabel}の障害の状況は？`,
      helpText: '手帳の等級を選んでください',
      inputType: 'radio',
      options: disabilityOptions(prefix),
    },
    {
      id: `${prefix}_care`,
      category,
      label: `${parentLabel}はどのくらい介護・看護していますか？`,
      helpText: '介護・看護の状況を選んでください',
      inputType: 'radio',
      options: careOptions(prefix),
    },
    {
      id: `${prefix}_disaster`,
      category,
      label: `${parentLabel}は災害復旧にあたっていますか？`,
      helpText: '復旧に要する時間を選んでください',
      inputType: 'radio',
      options: disasterOptions(prefix),
    },
    {
      id: `${prefix}_jobseeking`,
      category,
      label: `${parentLabel}は仕事を探していますか？`,
      inputType: 'radio',
      options: jobSeekingOptions(prefix),
    },
    {
      id: `${prefix}_education`,
      category,
      label: `${parentLabel}はどのくらい学校に通っていますか？`,
      helpText: '月あたりの授業時間を選んでください（昼休み除く）',
      inputType: 'radio',
      options: educationOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// ---------------------------------------------------------------------------
// 調整（加算・減算）項目の質問
// ---------------------------------------------------------------------------

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親世帯ですか？',
    helpText: '離婚・死別・未婚など',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい', value: 'adj_single_parent_yes', points: 2 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい', value: 'adj_welfare_yes', points: 2 },
    ],
  },
  {
    id: 'adj_nursery_worker',
    category: 'adjustment',
    label: '保護者が市内の保育施設等で保育士・幼稚園教諭・看護師等として勤務していますか？',
    helpText: '富山市内の特定教育・保育施設または特定地域型保育事業が対象',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_nursery_worker_no', points: 0 },
      { label: 'はい', value: 'adj_nursery_worker_yes', points: 4 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: 'きょうだいの状況を選んでください',
    helpText: '最も該当する項目をひとつ選んでください',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_sibling_no', points: 0 },
      { label: '兄弟が別々の施設に1ヶ月以上入所中で、同じ施設への転所を希望', value: 'adj_sibling_transfer', points: 5 },
      { label: '兄弟（2・3号認定）が入所中の施設への入所希望', value: 'adj_sibling_same', points: 4 },
      { label: '育児休暇取得で退所し、育休明けで再入所希望', value: 'adj_sibling_ikukyuu', points: 4 },
      { label: '兄弟（1号認定・幼稚園利用）が入所中の施設への入所希望', value: 'adj_sibling_1go', points: 3 },
    ],
  },
  {
    id: 'adj_multi_child',
    category: 'adjustment',
    label: '兄弟3人以上の新規同時申込みですか？',
    helpText: '転所は除きます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_multi_child_no', points: 0 },
      { label: 'はい', value: 'adj_multi_child_yes', points: 2 },
    ],
  },
  {
    id: 'adj_multiples',
    category: 'adjustment',
    label: '多胎児（双子）の新規同時申込みですか？',
    helpText: '転所は除きます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_multiples_no', points: 0 },
      { label: 'はい', value: 'adj_multiples_yes', points: 1 },
    ],
  },
  {
    id: 'adj_kodomoen_change',
    category: 'adjustment',
    label: '認定こども園で1号から2号への認定区分変更を希望しますか？',
    helpText: '引き続き同じ施設の利用を希望する場合',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_kodomoen_change_no', points: 0 },
      { label: 'はい', value: 'adj_kodomoen_change_yes', points: 1 },
    ],
  },
  {
    id: 'adj_transfer_penalty',
    category: 'adjustment',
    label: '転所申請で、転居・転勤等やむを得ない理由がない場合に該当しますか？',
    helpText: '該当すると減点（-2点）になります。4月転所は減点対象外',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_transfer_penalty_no', points: 0 },
      { label: 'はい', value: 'adj_transfer_penalty_yes', points: -2 },
    ],
  },
];

// ---------------------------------------------------------------------------
// エクスポート
// ---------------------------------------------------------------------------

export const toyamaData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
