import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 今治市 保育園入園 基礎指数・優先指数・調整指数データ
// 出典: 今治市「保育利用調整（選考）基準判定表（令和8年度）」
// ---------------------------------------------------------------------------

const municipality = {
  id: 'imabari',
  name: '今治市',
  slug: 'imabari',
  prefecture: '愛媛県',
  maxBasePoints: 20, // 父母各10点（常勤160時間以上）
} as const;

/** 就労 */
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '常勤・パート等：月160時間以上', value: `${prefix}_employment_10`, points: 10 },
  { label: '常勤・パート等：月140時間以上160時間未満', value: `${prefix}_employment_9`, points: 9 },
  { label: '常勤・パート等：月120時間以上140時間未満', value: `${prefix}_employment_8`, points: 8 },
  { label: '常勤・パート等：月80時間以上120時間未満', value: `${prefix}_employment_7`, points: 7 },
  { label: '常勤・パート等：月64時間以上80時間未満', value: `${prefix}_employment_6`, points: 6 },
  { label: '自営（1日7時間以上）中心者', value: `${prefix}_employment_self_main7h`, points: 9 },
  { label: '自営（1日7時間以上）協力者', value: `${prefix}_employment_self_sub7h`, points: 6 },
  { label: '自営（1日4〜7時間未満）中心者', value: `${prefix}_employment_self_main4h`, points: 7 },
  { label: '自営（1日4〜7時間未満）協力者', value: `${prefix}_employment_self_sub4h`, points: 4 },
  { label: '内職', value: `${prefix}_employment_piecework`, points: 3 },
];

/** 疾病負傷 */
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院中', value: `${prefix}_illness_12`, points: 12 },
  { label: '常時病臥（寝たきり）の状態', value: `${prefix}_illness_11`, points: 11 },
  { label: '精神疾患により保育困難と診断', value: `${prefix}_illness_7`, points: 7 },
  { label: '1ヶ月以上の通院加療（安静要）', value: `${prefix}_illness_7b`, points: 7 },
  { label: '1ヶ月以上の通院加療（その他）', value: `${prefix}_illness_4`, points: 4 },
];

/** 障がい */
const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '身体1・2級 / 精神1・2級 / 療育手帳A', value: `${prefix}_disability_10`, points: 10 },
  { label: '身体3・4級 / 精神3級 / 療育手帳B', value: `${prefix}_disability_8`, points: 8 },
];

/** 家族の介護・看護 */
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '入院患者の常時付添が必要', value: `${prefix}_care_10`, points: 10 },
  { label: '入院患者の付添（その他）', value: `${prefix}_care_7`, points: 7 },
  { label: '自宅介護：常時臥床・要安静者の介護', value: `${prefix}_care_6`, points: 6 },
  { label: '自宅介護：その他の介護', value: `${prefix}_care_3`, points: 3 },
];

/** 出産 */
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産予定日の前後8週に属する月に入所', value: `${prefix}_childbirth_8`, points: 8 },
];

/** 就学 */
const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '職業訓練校等（月160時間以上相当）', value: `${prefix}_education_10`, points: 10 },
  { label: '職業訓練校等（月120時間以上）', value: `${prefix}_education_8`, points: 8 },
  { label: '職業訓練校等（月80時間以上）', value: `${prefix}_education_7`, points: 7 },
  { label: '職業訓練校等（月64時間以上）', value: `${prefix}_education_6`, points: 6 },
];

/** 求職活動 */
const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '就労予定（内定あり・証明可）', value: `${prefix}_jobseeking_9`, points: 9 },
  { label: '就労予定（未定）', value: `${prefix}_jobseeking_1`, points: 1 },
  { label: '起業準備（証明可）', value: `${prefix}_jobseeking_8`, points: 8 },
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
      { label: '仕事をしている / 就労予定', value: `${prefix}_reason_employment`, points: 0 },
      { label: '疾病・負傷', value: `${prefix}_reason_illness`, points: 0 },
      { label: '障がいがある', value: `${prefix}_reason_disability`, points: 0 },
      { label: '家族の介護・看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '出産前後', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '学校に通っている', value: `${prefix}_reason_education`, points: 0 },
      { label: '仕事を探している（求職中）', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '災害復旧', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '虐待・DV', value: `${prefix}_reason_dv`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の就労状況は？`,
      inputType: 'radio',
      options: employmentOptions(prefix),
    },
    {
      id: `${prefix}_illness`,
      category,
      label: `${parentLabel}の疾病・負傷の状況は？`,
      inputType: 'radio',
      options: illnessOptions(prefix),
    },
    {
      id: `${prefix}_disability`,
      category,
      label: `${parentLabel}の障がいの程度は？`,
      inputType: 'radio',
      options: disabilityOptions(prefix),
    },
    {
      id: `${prefix}_care`,
      category,
      label: `${parentLabel}の介護・看護の状況は？`,
      inputType: 'radio',
      options: careOptions(prefix),
    },
    {
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}の出産時期は？`,
      inputType: 'radio',
      options: childbirthOptions(prefix),
    },
    {
      id: `${prefix}_education`,
      category,
      label: `${parentLabel}の通学状況は？`,
      inputType: 'radio',
      options: educationOptions(prefix),
    },
    {
      id: `${prefix}_jobseeking`,
      category,
      label: `${parentLabel}の求職活動の状況は？`,
      inputType: 'radio',
      options: jobSeekingOptions(prefix),
    },
    {
      id: `${prefix}_disaster`,
      category,
      label: `${parentLabel}は災害復旧中ですか？`,
      inputType: 'radio',
      options: [
        { label: 'いいえ', value: `${prefix}_disaster_no`, points: 0 },
        { label: 'はい（災害復旧のため保育困難）', value: `${prefix}_disaster_yes`, points: 11 },
      ],
    },
    {
      id: `${prefix}_dv`,
      category,
      label: `${parentLabel}は虐待・DVの恐れがありますか？`,
      inputType: 'radio',
      options: [
        { label: 'いいえ', value: `${prefix}_dv_no`, points: 0 },
        { label: 'はい（虐待・DVの恐れがあると認められる）', value: `${prefix}_dv_yes`, points: 10 },
      ],
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親世帯ですか？',
    helpText: '父母のどちらかがいない場合（死亡・離別・行方不明。事実婚は含まない）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい', value: 'adj_single_parent_yes', points: 5 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護を受けていますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい', value: 'adj_welfare_yes', points: 2 },
    ],
  },
  {
    id: 'adj_unemployment',
    category: 'adjustment',
    label: '生計中心者が失業しましたか？',
    helpText: '会社の倒産等による失業（自己都合除く）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unemployment_no', points: 0 },
      { label: 'はい', value: 'adj_unemployment_yes', points: 1 },
    ],
  },
  {
    id: 'adj_child_disability',
    category: 'adjustment',
    label: '申請する子どもに障がいがありますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_child_disability_none', points: 0 },
      { label: 'あり（身体障害者手帳等・特別児童扶養手当受給対象）', value: 'adj_child_disability_yes', points: 2 },
      { label: 'あり（医療的ケア児・主治医が集団保育可と認定）', value: 'adj_child_disability_care', points: 5 },
    ],
  },
  {
    id: 'adj_parental_leave',
    category: 'adjustment',
    label: '育休・産休からの復帰に該当しますか？',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_parental_leave_none', points: 0 },
      { label: '育休取得退所した子どもの再利用希望', value: 'adj_parental_leave_1a', points: 1 },
      { label: '入所不可により育休延長後の復職（確認できた者）', value: 'adj_parental_leave_1b', points: 1 },
      { label: '育休期間終了により復職', value: 'adj_parental_leave_2', points: 2 },
      { label: '産前産後休暇終了により復職', value: 'adj_parental_leave_maternity', points: 2 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: 'きょうだいの在園・同時利用はありますか？',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_sibling_none', points: 0 },
      { label: 'きょうだいが希望施設に在園している', value: 'adj_sibling_enrolled', points: 3 },
      { label: 'きょうだいと同時に同じ施設を希望', value: 'adj_sibling_simultaneous', points: 2 },
    ],
  },
  {
    id: 'adj_grandparent',
    category: 'adjustment',
    label: '市内在住の祖父母の状況は？',
    inputType: 'radio',
    options: [
      { label: 'どちらでもない', value: 'adj_grandparent_neutral', points: 0 },
      { label: '市内在住の祖父母がいない（死亡・離別・行方不明を含む）', value: 'adj_grandparent_none', points: 1 },
      { label: '65歳未満の祖父母（就労等なし）と同居', value: 'adj_grandparent_young_live', points: -1 },
    ],
  },
  {
    id: 'adj_single_parent_absent',
    category: 'adjustment',
    label: '保護者の単身赴任等はありますか？',
    helpText: '父または母が単身赴任等、または離婚前提の別居等により常時家庭にいない場合',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_absent_no', points: 0 },
      { label: 'はい', value: 'adj_single_parent_absent_yes', points: 2 },
    ],
  },
  {
    id: 'adj_multi_child',
    category: 'adjustment',
    label: '3人以上の多子家庭ですか？',
    helpText: '当該児童を含めて3人以上のお子さんがいる場合',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_multi_child_no', points: 0 },
      { label: 'はい', value: 'adj_multi_child_yes', points: 1 },
    ],
  },
  {
    id: 'adj_transfer',
    category: 'adjustment',
    label: '施設都合による転所が必要ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_transfer_none', points: 0 },
      { label: '在籍施設の年齢制限等による転所', value: 'adj_transfer_age', points: 1 },
      { label: '在籍施設の廃園等による転所', value: 'adj_transfer_close', points: 3 },
    ],
  },
];

export const imabariData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
