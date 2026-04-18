import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 高岡市 保育所等入所利用調整基準データ
// 出典: 高岡市「保育所等入所利用調整実施要綱」（令和8年4月1日以降適用）
// 計算方式: sum（父母の基本点数を合算）
// 特記: 就労は「就労形態基礎点＋時間加算」の二段階
// ---------------------------------------------------------------------------

const municipality = {
  id: 'takaoka',
  name: '高岡市',
  slug: 'takaoka',
  prefecture: '富山県',
  maxBasePoints: 38, // 父母各19点（会社員・月168時間以上）
} as const;

/** 就労形態の基礎点 */
const employmentBaseOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_emp_base_none`, points: 0 },
  { label: '会社等勤務（被雇用）', value: `${prefix}_emp_base_10a`, points: 10 },
  { label: '自営業（事業主）', value: `${prefix}_emp_base_10b`, points: 10 },
  { label: '農業（事業主）', value: `${prefix}_emp_base_10c`, points: 10 },
  { label: '自営業（専従者）', value: `${prefix}_emp_base_8a`, points: 8 },
  { label: '農業（専従者）', value: `${prefix}_emp_base_8b`, points: 8 },
  { label: '内職', value: `${prefix}_emp_base_6`, points: 6 },
];

/** 就労時間の加算点（就労・就学共通の時間スケール） */
const workHoursOptions = (prefix: string, questionId: string) => [
  { label: '月48時間未満（または就労・就学なし）', value: `${prefix}_${questionId}_h0`, points: 0 },
  { label: '月48時間以上60時間未満', value: `${prefix}_${questionId}_h4`, points: 4 },
  { label: '月60時間以上84時間未満', value: `${prefix}_${questionId}_h5`, points: 5 },
  { label: '月84時間以上120時間未満', value: `${prefix}_${questionId}_h6`, points: 6 },
  { label: '月120時間以上140時間未満', value: `${prefix}_${questionId}_h7`, points: 7 },
  { label: '月140時間以上168時間未満', value: `${prefix}_${questionId}_h8`, points: 8 },
  { label: '月168時間以上（週42時間以上）', value: `${prefix}_${questionId}_h9`, points: 9 },
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
      { label: '疾病・療養中', value: `${prefix}_reason_illness`, points: 0 },
      { label: '障がいがある', value: `${prefix}_reason_disability`, points: 0 },
      { label: '家族の介護・看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '妊娠・出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '就学（学校に通っている）', value: `${prefix}_reason_education`, points: 0 },
      { label: '求職活動中', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '起業準備中', value: `${prefix}_reason_startup`, points: 0 },
      { label: '虐待・DV', value: `${prefix}_reason_dv`, points: 0 },
      { label: '不在（死亡・離婚等）', value: `${prefix}_reason_absent`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_emp_base`,
      category,
      label: `${parentLabel}の就労形態は？`,
      helpText: '就労している場合、就労形態を選んでください。選んだ後、就労時間も回答してください',
      inputType: 'radio',
      options: employmentBaseOptions(prefix),
    },
    {
      id: `${prefix}_emp_hours`,
      category,
      label: `${parentLabel}の月の就労時間は？`,
      helpText: '就労している場合のみ選択してください（就労していない場合は「月48時間未満」を選択）',
      inputType: 'radio',
      options: workHoursOptions(prefix, 'emp_hours'),
    },
    {
      id: `${prefix}_parental_leave`,
      category,
      label: `${parentLabel}：育児休業明けによる申込ですか？`,
      helpText: '育休から復職して就労する場合のみ対象',
      inputType: 'radio',
      options: [
        { label: 'いいえ', value: `${prefix}_parental_leave_no`, points: 0 },
        { label: 'はい（育児休業明け）', value: `${prefix}_parental_leave_yes`, points: 2 },
      ],
    },
    {
      id: `${prefix}_illness`,
      category,
      label: `${parentLabel}の疾病・療養の状況は？`,
      inputType: 'radio',
      options: [
        { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
        { label: '入院中', value: `${prefix}_illness_19a`, points: 19 },
        { label: '自宅療養（寝たきり）', value: `${prefix}_illness_19b`, points: 19 },
        { label: '通院（週3日以上）', value: `${prefix}_illness_13`, points: 13 },
        { label: '自宅療養（精神疾患）', value: `${prefix}_illness_12a`, points: 12 },
        { label: '通院（週3日未満・1日以上）', value: `${prefix}_illness_12b`, points: 12 },
        { label: '通院（週1日未満）', value: `${prefix}_illness_11a`, points: 11 },
        { label: '自宅療養（その他）', value: `${prefix}_illness_11b`, points: 11 },
      ],
    },
    {
      id: `${prefix}_care_base`,
      category,
      label: `${parentLabel}：家族の介護・看護をしていますか？`,
      inputType: 'radio',
      options: [
        { label: 'いいえ', value: `${prefix}_care_base_no`, points: 0 },
        { label: 'はい（介護・看護中）', value: `${prefix}_care_base_yes`, points: 10 },
      ],
    },
    {
      id: `${prefix}_care_hours`,
      category,
      label: `${parentLabel}の介護・看護の1日の時間は？`,
      helpText: '介護・看護をしている場合のみ選択してください',
      inputType: 'radio',
      options: [
        { label: 'あてはまらない / 介護なし', value: `${prefix}_care_h0`, points: 0 },
        { label: '1日4時間未満', value: `${prefix}_care_h1`, points: 1 },
        { label: '1日4時間以上6時間未満', value: `${prefix}_care_h2`, points: 2 },
        { label: '1日6時間以上8時間未満', value: `${prefix}_care_h3`, points: 3 },
        { label: '1日8時間以上', value: `${prefix}_care_h4`, points: 4 },
      ],
    },
    {
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}：妊娠中または出産直後ですか？`,
      inputType: 'radio',
      options: [
        { label: 'いいえ', value: `${prefix}_childbirth_no`, points: 0 },
        { label: 'はい（妊娠・出産）', value: `${prefix}_childbirth_yes`, points: 19 },
      ],
    },
    {
      id: `${prefix}_edu_base`,
      category,
      label: `${parentLabel}：学校等に通っていますか？`,
      inputType: 'radio',
      options: [
        { label: 'いいえ', value: `${prefix}_edu_base_no`, points: 0 },
        { label: 'はい（就学中）', value: `${prefix}_edu_base_yes`, points: 9 },
      ],
    },
    {
      id: `${prefix}_edu_hours`,
      category,
      label: `${parentLabel}の月の就学時間は？`,
      helpText: '就学している場合のみ選択してください',
      inputType: 'radio',
      options: workHoursOptions(prefix, 'edu_hours'),
    },
    {
      id: `${prefix}_jobseeking`,
      category,
      label: `${parentLabel}：求職活動中ですか？`,
      inputType: 'radio',
      options: [
        { label: 'いいえ', value: `${prefix}_jobseeking_no`, points: 0 },
        { label: 'はい（求職活動中）', value: `${prefix}_jobseeking_yes`, points: 2 },
      ],
    },
    {
      id: `${prefix}_startup`,
      category,
      label: `${parentLabel}：起業準備中ですか？`,
      inputType: 'radio',
      options: [
        { label: 'いいえ', value: `${prefix}_startup_no`, points: 0 },
        { label: 'はい（起業準備中）', value: `${prefix}_startup_yes`, points: 6 },
      ],
    },
    {
      id: `${prefix}_dv`,
      category,
      label: `${parentLabel}：虐待・DVのおそれがありますか？`,
      inputType: 'radio',
      options: [
        { label: 'いいえ', value: `${prefix}_dv_no`, points: 0 },
        { label: 'はい（虐待・DVのおそれがある）', value: `${prefix}_dv_yes`, points: 19 },
      ],
    },
    {
      id: `${prefix}_absent`,
      category,
      label: `${parentLabel}は不在（死亡・離婚等）ですか？`,
      helpText: '死亡・離婚等で不在の場合は19点となります',
      inputType: 'radio',
      options: [
        { label: 'いいえ', value: `${prefix}_absent_no`, points: 0 },
        { label: 'はい（死亡・離婚等により不在）', value: `${prefix}_absent_yes`, points: 19 },
      ],
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_sibling_enrolled',
    category: 'adjustment',
    label: 'きょうだいが希望施設に在園中ですか？',
    helpText: '既に同一施設を利用しているきょうだいがいる場合',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_none', points: 0 },
      { label: 'はい（きょうだいが同一施設を利用中）', value: 'adj_sibling_yes', points: 40 },
    ],
  },
  {
    id: 'adj_nursery_staff',
    category: 'adjustment',
    label: '保護者が保育士等として保育施設に勤務（予定）ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_nursery_staff_no', points: 0 },
      { label: 'はい（市内の保育施設）', value: 'adj_nursery_staff_in', points: 40 },
      { label: 'はい（市外の保育施設）', value: 'adj_nursery_staff_out', points: 20 },
    ],
  },
  {
    id: 'adj_social_care',
    category: 'adjustment',
    label: '児童相談所または公的機関によるDV・虐待の支援要請がありますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_social_care_no', points: 0 },
      { label: 'はい（公的機関によるDV証明・支援要請あり）', value: 'adj_social_care_yes', points: 40 },
    ],
  },
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい', value: 'adj_single_parent_yes', points: 1 },
    ],
  },
  {
    id: 'adj_child_disability',
    category: 'adjustment',
    label: '申請する子どもに障がいがありますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_child_disability_no', points: 0 },
      { label: 'はい', value: 'adj_child_disability_yes', points: 2 },
    ],
  },
  {
    id: 'adj_disaster',
    category: 'adjustment',
    label: '家庭が災害（震災・風水害・火災等）に遭っていますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_disaster_no', points: 0 },
      { label: 'はい', value: 'adj_disaster_yes', points: 2 },
    ],
  },
  {
    id: 'adj_grandparent',
    category: 'adjustment',
    label: '同居している65歳未満の祖父母の就労状況は？',
    helpText: '同居の65歳未満祖父母がいない場合は「いない / 就労・疾病等」を選択してください',
    inputType: 'radio',
    options: [
      { label: '65歳未満の同居祖父母がいない / 就労・疾病・障がい等', value: 'adj_grandparent_ok', points: 0 },
      { label: '65歳未満の同居祖父母がいる（疾病等により保育できない）', value: 'adj_grandparent_ill', points: -1 },
      { label: '65歳未満の同居祖父母がいる（理由なく無職・保育できる状態）', value: 'adj_grandparent_ng', points: -2 },
    ],
  },
];

export const takaokaData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
