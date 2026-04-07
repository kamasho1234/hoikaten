import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 岡崎市 保育園入園 基礎点・調整点データ
// ---------------------------------------------------------------------------
// 岡崎市は「基礎点」＋「調整点」の二段階方式。
// 父母それぞれに基礎点を算出し、合算（加算方式）で優先順位を判断。
// 同点の場合は調整点で判断。各保護者の最大基礎点は10点。
// 出典: 令和8年度 保育所利用調整基準（令和8年4月1日入園より適用）
// https://www.city.okazaki.lg.jp/kosodate/kosodate/1012221/1012226/1003636.html
// ---------------------------------------------------------------------------

const municipality = {
  id: 'okazaki',
  name: '岡崎市',
  slug: 'okazaki',
  prefecture: '愛知県',
  maxBasePoints: 10,
  // scoringMethod 省略 = デフォルト "sum"（父母の基礎点を合算）
} as const;

// ---------------------------------------------------------------------------
// 保育が必要な理由ごとの選択肢テンプレート
// ---------------------------------------------------------------------------

/** 就労 */
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月140時間以上勤務（1日4時間以上かつ週4日以上）', value: `${prefix}_employment_10`, points: 10 },
  { label: '月120時間以上勤務（1日4時間以上かつ週4日以上）', value: `${prefix}_employment_9`, points: 9 },
  { label: '月100時間以上勤務（1日4時間以上かつ週4日以上）', value: `${prefix}_employment_8`, points: 8 },
  { label: '月80時間以上勤務（1日4時間以上かつ週4日以上）', value: `${prefix}_employment_7`, points: 7 },
  { label: '上記に該当しないが月60時間以上就労', value: `${prefix}_employment_5`, points: 5 },
  { label: '育児休業中で復帰先の会社や就労時間が未定', value: `${prefix}_employment_ikukyu_5`, points: 5 },
  { label: '就労予定（内定先の証明がある場合）', value: `${prefix}_employment_naitei_4`, points: 4 },
  { label: '内職（直近3か月の給与明細あり）', value: `${prefix}_employment_naishoku_3`, points: 3 },
  { label: '内職（給与明細なし）', value: `${prefix}_employment_naishoku_2`, points: 2 },
  { label: '家族従事者（無給）', value: `${prefix}_employment_family_2`, points: 2 },
];

/** 妊娠・出産（母のみ） */
const childbirthOptions = (prefix: string, parentNum: 1 | 2) => {
  if (parentNum === 2) {
    // 母
    return [
      { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
      { label: '産前産後8週間（多胎は産前14週間）', value: `${prefix}_childbirth_7`, points: 7 },
    ];
  }
  // 父には妊娠・出産の基礎点はない
  return [
    { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  ];
};

/** 疾病・障がい */
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '身体障害1〜2級 / 療育手帳A / 精神1級', value: `${prefix}_illness_10`, points: 10 },
  { label: '身体障害3級 / 療育手帳B / 精神2級', value: `${prefix}_illness_9`, points: 9 },
  { label: '疾病により保育に支障があると医師が認めた（診断書）', value: `${prefix}_illness_7`, points: 7 },
];

/** 同居親族等の介護・看護 */
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '児童発達支援センター等の付添通所', value: `${prefix}_care_7`, points: 7 },
  { label: '同居の親族（祖父母・両親・きょうだい）の介護・看護', value: `${prefix}_care_6`, points: 6 },
];

/** 災害復旧 */
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '震災・風水害・火災等で自宅の復旧にあたっている', value: `${prefix}_disaster_10`, points: 10 },
];

/** 就学 */
const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '学校教育法に基づく大学等で就学', value: `${prefix}_education_5`, points: 5 },
  { label: '職業能力開発促進法に基づく職業訓練中', value: `${prefix}_education_vocational_5`, points: 5 },
  { label: '通信教育', value: `${prefix}_education_3`, points: 3 },
];

/** 育児休業中 */
const childcareLeaveOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childcare_leave_none`, points: 0 },
  { label: '入園月の翌月1日以降・当該年度内に育児休業復帰', value: `${prefix}_childcare_leave_5`, points: 5 },
  { label: '翌年度以降に育児休業復帰', value: `${prefix}_childcare_leave_2`, points: 2 },
];

/** 求職活動 */
const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職中', value: `${prefix}_jobseeking_1`, points: 1 },
];

/** 保護者の不在 */
const absentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_absent_none`, points: 0 },
  { label: '単身赴任等で不在', value: `${prefix}_absent_10`, points: 10 },
];

// ---------------------------------------------------------------------------
// 保護者ごとの質問を生成するヘルパー
// ---------------------------------------------------------------------------

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1（父）' : '保護者2（母）';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: 'いちばん近いものをひとつ選んでください（複数該当する場合は主たる事由）',
    inputType: 'select',
    options: [
      { label: '仕事をしている', value: `${prefix}_reason_employment`, points: 0 },
      { label: '妊娠・出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '病気・障がいがある', value: `${prefix}_reason_illness`, points: 0 },
      { label: '家族の介護・看護をしている', value: `${prefix}_reason_care`, points: 0 },
      { label: '災害にあった', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '学校に通っている', value: `${prefix}_reason_education`, points: 0 },
      { label: '育児休業中', value: `${prefix}_reason_childcare_leave`, points: 0 },
      { label: '仕事を探している', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '単身赴任等で不在', value: `${prefix}_reason_absent`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}はどのくらい働いていますか？`,
      helpText: '就労時間は残業を含まず、休憩時間を除く規定の時間で判断されます',
      inputType: 'radio',
      options: employmentOptions(prefix),
    },
    {
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}の妊娠・出産の状況は？`,
      inputType: 'radio',
      options: childbirthOptions(prefix, parentNum),
    },
    {
      id: `${prefix}_illness`,
      category,
      label: `${parentLabel}の病気・障がいの状況は？`,
      inputType: 'radio',
      options: illnessOptions(prefix),
    },
    {
      id: `${prefix}_care`,
      category,
      label: `${parentLabel}の介護・看護の状況は？`,
      helpText: '同居の親族の介護・看護が対象です',
      inputType: 'radio',
      options: careOptions(prefix),
    },
    {
      id: `${prefix}_disaster`,
      category,
      label: `${parentLabel}は災害で保育が必要ですか？`,
      inputType: 'radio',
      options: disasterOptions(prefix),
    },
    {
      id: `${prefix}_education`,
      category,
      label: `${parentLabel}はどのような就学をしていますか？`,
      inputType: 'radio',
      options: educationOptions(prefix),
    },
    {
      id: `${prefix}_childcare_leave`,
      category,
      label: `${parentLabel}の育児休業の状況は？`,
      helpText: '育児休業終了に伴う復職の場合は、復帰後の就労時間で判断されます',
      inputType: 'radio',
      options: childcareLeaveOptions(prefix),
    },
    {
      id: `${prefix}_jobseeking`,
      category,
      label: `${parentLabel}は求職活動をしていますか？`,
      inputType: 'radio',
      options: jobSeekingOptions(prefix),
    },
    {
      id: `${prefix}_absent`,
      category,
      label: `${parentLabel}は単身赴任等で不在ですか？`,
      inputType: 'radio',
      options: absentOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// ---------------------------------------------------------------------------
// 調整点の質問（基礎点が同点の場合に使用）
// ---------------------------------------------------------------------------

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親手当等を受給（申請）していますか？',
    helpText: '申込時点で受給・申請中の場合が対象です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい', value: 'adj_single_parent_yes', points: 4 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護を受給していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい', value: 'adj_welfare_yes', points: 3 },
    ],
  },
  {
    id: 'adj_third_child',
    category: 'adjustment',
    label: '18歳未満の児童を3人以上養育している世帯の第3子以降ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_third_child_no', points: 0 },
      { label: 'はい', value: 'adj_third_child_yes', points: 2 },
    ],
  },
  {
    id: 'adj_second_child',
    category: 'adjustment',
    label: '18歳未満の児童を2人以上養育している世帯の第2子ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_second_child_no', points: 0 },
      { label: 'はい', value: 'adj_second_child_yes', points: 1 },
    ],
  },
  {
    id: 'adj_disability_child',
    category: 'adjustment',
    label: '入園希望児童またはきょうだいが障がい者手帳等を保有していますか？',
    helpText: '特別児童扶養手当の受給を含みます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_disability_child_no', points: 0 },
      { label: 'はい', value: 'adj_disability_child_yes', points: 1 },
    ],
  },
  {
    id: 'adj_nursery_worker',
    category: 'adjustment',
    label: '保護者が岡崎市内の認可保育所等で保育士・看護師として就労（予定）していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_nursery_worker_no', points: 0 },
      { label: 'はい', value: 'adj_nursery_worker_yes', points: 9 },
    ],
  },
  {
    id: 'adj_childcare_leave_return',
    category: 'adjustment',
    label: '入園希望月の末日までに育児休業から復職しますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_childcare_leave_return_no', points: 0 },
      { label: 'はい', value: 'adj_childcare_leave_return_yes', points: 5 },
    ],
  },
  {
    id: 'adj_work_tenure',
    category: 'adjustment',
    label: '両親の現在の就労先の在籍期間は？',
    inputType: 'radio',
    options: [
      { label: '該当しない', value: 'adj_work_tenure_none', points: 0 },
      { label: '5年以上', value: 'adj_work_tenure_5y', points: 2 },
      { label: '1年以上5年未満', value: 'adj_work_tenure_1y', points: 1 },
      { label: '2か月未満（いずれかの保護者）', value: 'adj_work_tenure_under2m', points: -1 },
    ],
  },
  {
    id: 'adj_small_nursery_graduate',
    category: 'adjustment',
    label: '南部乳児保育園・小規模保育事業所の卒園に伴う入園申込みですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_small_nursery_graduate_no', points: 0 },
      { label: 'はい', value: 'adj_small_nursery_graduate_yes', points: 8 },
    ],
  },
  {
    id: 'adj_unlicensed_nursery',
    category: 'adjustment',
    label: '申込児を届出のある認可外保育施設（企業主導型除く）に預けていますか？',
    helpText: '申込時点で岡崎市在住・入園要件を満たしている場合（求職活動除く）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unlicensed_nursery_no', points: 0 },
      { label: 'はい', value: 'adj_unlicensed_nursery_yes', points: 2 },
    ],
  },
  {
    id: 'adj_grandparent',
    category: 'adjustment',
    label: '保育可能な65歳未満の祖父母と同居していますか？',
    helpText: '月60時間以上就労・疾病等の場合は「保育できない」と判断されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_grandparent_no', points: 0 },
      { label: 'はい', value: 'adj_grandparent_yes', points: -1 },
    ],
  },
  {
    id: 'adj_sibling_same_facility',
    category: 'adjustment',
    label: 'きょうだいが認可保育所等を利用中（又は内定済み）で同一施設を希望していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_same_facility_no', points: 0 },
      { label: 'はい', value: 'adj_sibling_same_facility_yes', points: 5 },
    ],
  },
  {
    id: 'adj_sibling_simultaneous',
    category: 'adjustment',
    label: 'きょうだいが同一の施設に同時申込みしますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_simultaneous_no', points: 0 },
      { label: 'はい', value: 'adj_sibling_simultaneous_yes', points: 3 },
    ],
  },
  {
    id: 'adj_twins',
    category: 'adjustment',
    label: '双生児以上の同時申込みですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_twins_no', points: 0 },
      { label: 'はい', value: 'adj_twins_yes', points: 1 },
    ],
  },
  {
    id: 'adj_readmission',
    category: 'adjustment',
    label: '認可保育所等の0〜2歳児クラスに在籍後、育児休業取得で退園し、初めての再入園ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_readmission_no', points: 0 },
      { label: 'はい', value: 'adj_readmission_yes', points: 3 },
    ],
  },
];

// ---------------------------------------------------------------------------
// エクスポート
// ---------------------------------------------------------------------------

export const okazakiData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
