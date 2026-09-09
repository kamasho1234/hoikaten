import type { MunicipalityData, Question } from '../types';

// -------------------------------------------------------------------------
// 桜川市 保育園入園 利用調整基準データ
// 出典: 桜川市「特定教育・保育施設及び特定地域型保育事業の利用調整に関する基準
//       （令和8年度入所調整分）」
// https://www.city.sakuragawa.lg.jp/data/doc/1770686140_doc_17_0.pdf
// -------------------------------------------------------------------------
// 桜川市は基準指数表の注記に父母の合わせ方が書かれている。
//   「※1 父母それぞれの指数を合算した数を指数とする。（基準指数）」
//   「3 保護者が保育の必要な事由（就労等）が2以上ある場合には、
//      原則として指数の高い状況をとり指数を決定する。」
// 父母それぞれの指数を合算するので scoringMethod は 'sum'。
// 基準指数の最大は1人あたり100点。
//
// 原典で点数の代わりに「※」と書かれている項目は、
// 点数ではなく市が別途判断するものなので選択肢にしていない。
// - 8 虐待・DV「当該児童、世帯の状況に応じて別途判断」
// - 10 その他「申請内容により判断」
//
// いま園を利用している方の話は入れていない。
// - 「既にきょうだいが別々の保育施設に入所しており、どちらか片方の在園している
//   保育施設に転園を希望する場合」（+4）
// - 1号認定児童「2号認定への変更希望者（在籍施設に限り、別の施設希望の場合に適用しない）」（+15）
// -------------------------------------------------------------------------

const municipality = {
  id: 'sakuragawa',
  name: '桜川市',
  slug: 'sakuragawa',
  prefecture: '茨城県',
  maxBasePoints: 100,
  scoringMethod: 'sum',
} as const;

// 1 就労（休憩時間含む、通勤時間含まず）
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月170時間以上の就労を常態とする', value: `${prefix}_employment_0`, points: 100 },
  { label: '月160時間以上170時間未満の就労を常態とする', value: `${prefix}_employment_1`, points: 95 },
  { label: '月150時間以上160時間未満の就労を常態とする', value: `${prefix}_employment_2`, points: 90 },
  { label: '月140時間以上150時間未満の就労を常態とする', value: `${prefix}_employment_3`, points: 85 },
  { label: '月130時間以上140時間未満の就労を常態とする', value: `${prefix}_employment_4`, points: 80 },
  { label: '月120時間以上130時間未満の就労を常態とする', value: `${prefix}_employment_5`, points: 75 },
  { label: '月110時間以上120時間未満の就労を常態とする', value: `${prefix}_employment_6`, points: 70 },
  { label: '月100時間以上110時間未満の就労を常態とする', value: `${prefix}_employment_7`, points: 65 },
  { label: '月90時間以上100時間未満の就労を常態とする', value: `${prefix}_employment_8`, points: 60 },
  { label: '月80時間以上90時間未満の就労を常態とする', value: `${prefix}_employment_9`, points: 55 },
  { label: '月64時間以上80時間未満の就労を常態とする', value: `${prefix}_employment_10`, points: 50 },
];

// 2 妊娠・出産
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産予定日の属する月及び当該月の前1か月（多胎妊娠の場合は前3か月）、出産後2か月', value: `${prefix}_childbirth_0`, points: 70 },
];

// 3 保護者の疾病・障がい
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '疾病：入院又は、入院に相当する治療・安静が必要で日常生活が不能', value: `${prefix}_illness_0`, points: 100 },
  { label: '障がい：身体1・2級、療育A以上、精神1級の場合', value: `${prefix}_illness_1`, points: 100 },
  { label: '疾病：通院加療を行い、常に安静を要するなど保育が著しく困難', value: `${prefix}_illness_2`, points: 90 },
  { label: '疾病により保育に支障がある', value: `${prefix}_illness_3`, points: 70 },
  { label: '障がい：身体3級、療育B、精神2級の場合', value: `${prefix}_illness_4`, points: 70 },
  { label: '障がい：身体4級以下、療育C、精神3級の場合', value: `${prefix}_illness_5`, points: 50 },
];

// 4 同居親族等の看護・介護
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '入院：入院付き添いを常態としている場合', value: `${prefix}_care_0`, points: 90 },
  { label: '居宅内：自宅療養で身辺自立不可能な者の常時介護している場合', value: `${prefix}_care_1`, points: 80 },
  { label: '居宅内：要介護者または、心身障害①の常時介護・介助', value: `${prefix}_care_2`, points: 70 },
  { label: '居宅内：通院付き添い・日常生活の支援', value: `${prefix}_care_3`, points: 50 },
];

// 5 災害・復旧
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '災害で損なわれた居宅等の復旧のために保育に当たれない場合', value: `${prefix}_disaster_0`, points: 100 },
];

// 6 求職活動
const jobseekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動（起業の準備を含む）を継続的に行っていること', value: `${prefix}_jobseeking_0`, points: 30 },
];

// 7 就学・職業訓練
const schoolOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_school_none`, points: 0 },
  { label: '週5日以上', value: `${prefix}_school_0`, points: 90 },
  { label: '週5日未満', value: `${prefix}_school_1`, points: 60 },
];

// 9 不存在
const absentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_absent_none`, points: 0 },
  { label: '死別・離婚・未婚・拘禁・行方不明・離婚前提別居', value: `${prefix}_absent_0`, points: 100 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: '事由が2つ以上ある場合は、原則として指数の高い状況で決定します',
    inputType: 'select',
    options: [
      { label: '就労', value: `${prefix}_reason_employment`, points: 0 },
      { label: '妊娠・出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '保護者の疾病・障がい', value: `${prefix}_reason_illness`, points: 0 },
      { label: '同居親族等の看護・介護', value: `${prefix}_reason_care`, points: 0 },
      { label: '災害・復旧', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '求職活動', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '就学・職業訓練', value: `${prefix}_reason_school`, points: 0 },
      { label: '不存在', value: `${prefix}_reason_absent`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の就労の状況は？`,
      helpText: '休憩時間は含み、通勤時間は含みません',
      inputType: 'radio',
      options: employmentOptions(prefix),
    },
    {
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}の妊娠・出産の状況は？`,
      inputType: 'radio',
      options: childbirthOptions(prefix),
    },
    {
      id: `${prefix}_illness`,
      category,
      label: `${parentLabel}の疾病・障がいの状況は？`,
      inputType: 'radio',
      options: illnessOptions(prefix),
    },
    {
      id: `${prefix}_care`,
      category,
      label: `${parentLabel}の同居親族等の看護・介護の状況は？`,
      inputType: 'radio',
      options: careOptions(prefix),
    },
    {
      id: `${prefix}_disaster`,
      category,
      label: `${parentLabel}は災害の復旧に当たっていますか？`,
      inputType: 'radio',
      options: disasterOptions(prefix),
    },
    {
      id: `${prefix}_jobseeking`,
      category,
      label: `${parentLabel}は求職活動をしていますか？`,
      inputType: 'radio',
      options: jobseekingOptions(prefix),
    },
    {
      id: `${prefix}_school`,
      category,
      label: `${parentLabel}の就学・職業訓練の状況は？`,
      inputType: 'radio',
      options: schoolOptions(prefix),
    },
    {
      id: `${prefix}_absent`,
      category,
      label: `${parentLabel}は不存在ですか？`,
      inputType: 'radio',
      options: absentOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// 2. 調整指数
const adjustmentQuestions: Question[] = [
  {
    id: 'adj_grandparent',
    category: 'adjustment',
    label: '児童と同居の祖父母が65歳未満で児童の保育が可能ですか？',
    helpText: '保育することができない証明が提出されない場合が対象です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_grandparent_0', points: 0 },
      { label: 'はい（−10）', value: 'adj_grandparent_1', points: -10 },
    ],
  },
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_0', points: 0 },
      { label: 'はい（+40）', value: 'adj_single_parent_1', points: 40 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯で、自立支援のため必要と認められますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_0', points: 0 },
      { label: 'はい（+50）', value: 'adj_welfare_1', points: 50 },
    ],
  },
  {
    id: 'adj_unemployed',
    category: 'adjustment',
    label: '失業についてあてはまるものは？',
    helpText: 'リストラ・事業所の倒産など本人の意に反した失業の場合に限ります',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_unemployed_0', points: 0 },
      { label: '両親が同時期（1か月以内）での失業（+80）', value: 'adj_unemployed_1', points: 80 },
      { label: '生活中心者の失業（+30）', value: 'adj_unemployed_2', points: 30 },
    ],
  },
  {
    id: 'adj_bad_environment',
    category: 'adjustment',
    label: '児童の日常生活において環境不良と認められますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_bad_environment_0', points: 0 },
      { label: 'はい（+20）', value: 'adj_bad_environment_1', points: 20 },
    ],
  },
  {
    id: 'adj_work_status',
    category: 'adjustment',
    label: '就労状況であてはまるものは？',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_work_status_0', points: 0 },
      { label: 'ひとり親の方で、就労内定を受けている（+20）', value: 'adj_work_status_1', points: 20 },
      { label: '就労内定である（−20）', value: 'adj_work_status_2', points: -20 },
    ],
  },
  {
    id: 'adj_work_years',
    category: 'adjustment',
    label: '入所希望日時点で両親共に1年以上の就労実績がありますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_work_years_0', points: 0 },
      { label: 'はい（+5）', value: 'adj_work_years_1', points: 5 },
    ],
  },
  {
    id: 'adj_sibling_enrolled',
    category: 'adjustment',
    label: '既にきょうだいが保育施設等を利用していますか？',
    helpText: '新2号・2号・3号のみ、卒園児は除きます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_enrolled_0', points: 0 },
      { label: 'はい（+12）', value: 'adj_sibling_enrolled_1', points: 12 },
    ],
  },
  {
    id: 'adj_sibling_same_time',
    category: 'adjustment',
    label: 'きょうだいが新規で同時に申込みをしますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_same_time_0', points: 0 },
      { label: 'はい（+7）', value: 'adj_sibling_same_time_1', points: 7 },
    ],
  },
  {
    id: 'adj_third_child',
    category: 'adjustment',
    label: '第3子以降の子の申込ですか？',
    helpText: 'カウントに含めるのは、小学生までのきょうだいまでです',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_third_child_0', points: 0 },
      { label: 'はい（+4）', value: 'adj_third_child_1', points: 4 },
    ],
  },
  {
    id: 'adj_return_to_work',
    category: 'adjustment',
    label: '母の育児休業により退職し、復職時に申込みしますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_return_to_work_0', points: 0 },
      { label: 'はい（+20）', value: 'adj_return_to_work_1', points: 20 },
    ],
  },
  {
    id: 'adj_other_preschool',
    category: 'adjustment',
    label: '申込児童以外に申込みのない未就学児童（きょうだい）がいますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_other_preschool_0', points: 0 },
      { label: 'はい（−10）', value: 'adj_other_preschool_1', points: -10 },
    ],
  },
  {
    id: 'adj_hoikushi',
    category: 'adjustment',
    label: '保育体制強化の加点にあてはまるものは？',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_hoikushi_0', points: 0 },
      { label: '市内の保育施設の保育士として勤務する（有資格者のみ）（+60）', value: 'adj_hoikushi_1', points: 60 },
      { label: '県内の保育施設の保育士として勤務する（有資格者のみ）（+30）', value: 'adj_hoikushi_2', points: 30 },
      { label: '市内の保育施設の職員（保育補助員、支援員、事務職員等）として勤務する（+20）', value: 'adj_hoikushi_3', points: 20 },
      { label: '県内の保育施設の職員（保育補助員、支援員、事務職員等）として勤務する（+10）', value: 'adj_hoikushi_4', points: 10 },
    ],
  },
  {
    id: 'adj_chiikigata',
    category: 'adjustment',
    label: '地域型保育事業の卒園児として優先利用の対象ですか？',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_chiikigata_0', points: 0 },
      { label: '卒園から連携施設間の優先利用（+100）', value: 'adj_chiikigata_1', points: 100 },
      { label: '卒園から連携施設以外の施設を入所希望する際の優先利用（+50）', value: 'adj_chiikigata_2', points: 50 },
    ],
  },
  {
    id: 'adj_transfer_in',
    category: 'adjustment',
    label: '他市町村での新規4月入所が決定していたが、自己都合以外での理由により桜川市へ転入し申込みしますか？',
    helpText: '会社辞令による転勤、事務所移転等。第1次受付期間終了後の転入で、第1次申込が出来なかった方が対象（新年度1年間のみ適用）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_transfer_in_0', points: 0 },
      { label: 'はい（+30）', value: 'adj_transfer_in_1', points: 30 },
    ],
  },
];

export const sakuragawaData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
