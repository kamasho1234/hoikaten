import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 坂戸市 入所選考基準（基準点数・優先事項・調整事項）データ
//
// 出典: 坂戸市福祉部保育課「保存版 令和8年度 保育所入所等申込みのてびき」
//       令和8年度坂戸市入所選考基準表（15ページ）
//       https://www.city.sakado.lg.jp/uploaded/attachment/33897.pdf
//       （坂戸市Webサイト「令和8年度5月以降の保育所等の入所手続き」
//         https://www.city.sakado.lg.jp/soshiki/32/55823.html からリンク）
//
// 2026-08-19: 従来のデータは他自治体と同じ点数配列のテンプレート（推定値）だったため、
//             上記の公式基準表を読み取って全面的に置き換えた。
//             公式の基準点数は父母それぞれ最大25点で、旧データ（父母各20点）とは体系が異なる。
//
// 原典の注記:
//   基準点数は父・母それぞれいずれか一項目に該当。就労＋疾病等、複数の項目の点数を合算できない
//   就労時間は1か月4週として計算する。保育所等の開所時間外（夜間、日曜日等）の勤務も含む
//   疾病は診断書から保育ができない状態が判断できない場合は10点とする
//   就学に該当するのは、学校教育法に規定する学校、専門学校等、
//     職業能力開発促進法等に規定する職業訓練校等
//   優先事項8・9・10と調整事項7は併用不可
//   調整事項2の就労実績は、証明日の直近3か月の実績のうち最も勤務時間の多い月を対象とする
//
// 数値化しない規定（別途判断のため質問には含めない）:
//   調整事項10 家庭状況等に特別な理由があり、福祉事務所長が保育を必要と認めた場合
//     （その事情を勘案し、決定）
// ---------------------------------------------------------------------------

const municipality = {
  id: 'sakado',
  name: '坂戸市',
  slug: 'sakado',
  prefecture: '埼玉県',
  maxBasePoints: 50, // 基準点数は父母それぞれ最大25点、合計で50点
} as const;

// ---------------------------------------------------------------------------
// 基準点数。父母それぞれについて選ぶ（いずれか一項目のみ）
// ---------------------------------------------------------------------------

/** 1 就労 */
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  {
    label: '月160時間以上の就労を常態（または海外赴任）',
    value: `${prefix}_employment_21`,
    points: 21,
  },
  { label: '月150時間以上の就労を常態', value: `${prefix}_employment_20`, points: 20 },
  { label: '月140時間以上の就労を常態', value: `${prefix}_employment_19`, points: 19 },
  { label: '月120時間以上の就労を常態', value: `${prefix}_employment_18`, points: 18 },
  { label: '月100時間以上の就労を常態', value: `${prefix}_employment_17`, points: 17 },
  { label: '月80時間以上の就労を常態', value: `${prefix}_employment_16`, points: 16 },
  { label: '月64時間以上の就労を常態', value: `${prefix}_employment_14`, points: 14 },
  {
    label: '月64時間未満の就労を常態とし、これから勤務を増やす予定',
    value: `${prefix}_employment_10a`,
    points: 10,
  },
  { label: '内職', value: `${prefix}_employment_10b`, points: 10 },
];

/** 2 出産 */
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  {
    label: '絶対安静を要する（診断書にその旨の記載のある場合）',
    value: `${prefix}_childbirth_24`,
    points: 24,
  },
  { label: '普通妊娠', value: `${prefix}_childbirth_22`, points: 22 },
];

/** 3 疾病 */
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '1か月以上の入院、入院予定', value: `${prefix}_illness_24a`, points: 24 },
  {
    label: '居宅：自身の起居にも困難があり、保育ができない状態（診断書にその旨の記載のある場合）',
    value: `${prefix}_illness_24b`,
    points: 24,
  },
  {
    label:
      '居宅：自身の身辺のことはできるが、保育ができない状態（診断書にその旨の記載のある場合）',
    value: `${prefix}_illness_17`,
    points: 17,
  },
  {
    label: '居宅：自身の症状改善のため、保育をしないことが望ましい状態',
    value: `${prefix}_illness_10`,
    points: 10,
  },
];

/** 3 障害 */
const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '身体1級、精神1級、療育マルA・A', value: `${prefix}_disability_22`, points: 22 },
  { label: '身体2級、精神2級、療育B', value: `${prefix}_disability_19`, points: 19 },
  { label: '身体3級、精神3級、療育C', value: `${prefix}_disability_16`, points: 16 },
  { label: '上記以外の障害', value: `${prefix}_disability_12`, points: 12 },
];

/** 4 看護・介護 */
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  {
    label: '月64時間以上の親族等の看護・介護（長期入院等をしている親族を含む）',
    value: `${prefix}_care_14`,
    points: 14,
  },
];

/** 5 災害等 */
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  {
    label: '震災、風水害、火災等の災害復旧にあたっている状態',
    value: `${prefix}_disaster_25`,
    points: 25,
  },
];

/** 6 就学 */
const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '月120時間以上の就学', value: `${prefix}_education_18`, points: 18 },
  { label: '月64時間以上の就学', value: `${prefix}_education_14`, points: 14 },
  { label: '月64時間未満の就学', value: `${prefix}_education_10`, points: 10 },
];

/** 7 求職 */
const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  {
    label: '求職活動を行っており、活動を証明する書類を提出',
    value: `${prefix}_jobseeking_1`,
    points: 1,
  },
  { label: '求職活動を行う', value: `${prefix}_jobseeking_0`, points: 0 },
];

/** 8 その他（不存在） */
const absenceOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_absence_none`, points: 0 },
  {
    label: '不存在（死亡・離婚・離婚調停中・未婚・失踪・その他）',
    value: `${prefix}_absence_22`,
    points: 22,
  },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText:
      '父・母それぞれいずれか一項目に該当します。複数の項目の点数を合算することはできません',
    inputType: 'select',
    options: [
      { label: '就労', value: `${prefix}_reason_employment`, points: 0 },
      { label: '出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '疾病', value: `${prefix}_reason_illness`, points: 0 },
      { label: '障害', value: `${prefix}_reason_disability`, points: 0 },
      { label: '看護・介護', value: `${prefix}_reason_care`, points: 0 },
      { label: '災害等', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '就学', value: `${prefix}_reason_education`, points: 0 },
      { label: '求職', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: 'その他（不存在）', value: `${prefix}_reason_absence`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の就労の状況は？`,
      helpText:
        '1か月4週として計算します。保育所等の開所時間外（夜間、日曜日等）の勤務も含みます',
      inputType: 'radio',
      options: employmentOptions(prefix),
    },
    {
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}の出産の状況は？`,
      inputType: 'radio',
      options: childbirthOptions(prefix),
    },
    {
      id: `${prefix}_illness`,
      category,
      label: `${parentLabel}の疾病の状況は？`,
      helpText: '診断書から保育ができない状態が判断できない場合は10点となります',
      inputType: 'radio',
      options: illnessOptions(prefix),
    },
    {
      id: `${prefix}_disability`,
      category,
      label: `${parentLabel}の障害の程度は？`,
      inputType: 'radio',
      options: disabilityOptions(prefix),
    },
    {
      id: `${prefix}_care`,
      category,
      label: `${parentLabel}の看護・介護の状況は？`,
      inputType: 'radio',
      options: careOptions(prefix),
    },
    {
      id: `${prefix}_disaster`,
      category,
      label: `${parentLabel}は災害復旧にあたっていますか？`,
      inputType: 'radio',
      options: disasterOptions(prefix),
    },
    {
      id: `${prefix}_education`,
      category,
      label: `${parentLabel}の就学の状況は？`,
      helpText:
        '学校教育法に規定する学校、専門学校等、職業能力開発促進法等に規定する職業訓練校等が対象です',
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
      id: `${prefix}_absence`,
      category,
      label: `${parentLabel}は不存在に該当しますか？`,
      inputType: 'radio',
      options: absenceOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// ---------------------------------------------------------------------------
// 優先事項・調整事項
// ---------------------------------------------------------------------------

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親ですか？',
    helpText: '優先事項1',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい', value: 'adj_single_parent_yes', points: 8 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯ですか？',
    helpText: '優先事項2',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい', value: 'adj_welfare_yes', points: 2 },
    ],
  },
  {
    id: 'adj_abuse',
    category: 'adjustment',
    label: 'DV・児童虐待に該当しますか？',
    helpText: '優先事項3',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_abuse_no', points: 0 },
      { label: 'はい', value: 'adj_abuse_yes', points: 30 },
    ],
  },
  {
    id: 'adj_child_disability',
    category: 'adjustment',
    label: '集団保育が可能で、かつ集団保育を必要とする障害児ですか？',
    helpText: '医師の診断書等がある場合が対象です（優先事項4）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_child_disability_no', points: 0 },
      { label: 'はい', value: 'adj_child_disability_yes', points: 5 },
    ],
  },
  {
    id: 'adj_return_from_leave',
    category: 'adjustment',
    label: '育児休業からの復帰ですか？',
    helpText: '父母それぞれに加点されます（優先事項5）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_return_from_leave_no', points: 0 },
      { label: 'はい（保護者1名）', value: 'adj_return_from_leave_3', points: 3 },
      { label: 'はい（保護者2名）', value: 'adj_return_from_leave_6', points: 6 },
    ],
  },
  {
    id: 'adj_leave_readmit',
    category: 'adjustment',
    label: '育児休業取得により退園し、育児休業明けに同園に再入園しますか？',
    helpText: '優先事項6',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_leave_readmit_no', points: 0 },
      { label: 'はい', value: 'adj_leave_readmit_yes', points: 15 },
    ],
  },
  {
    id: 'adj_sibling_enrolled',
    category: 'adjustment',
    label: '希望する保育所に既にきょうだいが入所していますか？',
    helpText:
      '事業所内保育施設入所者（従業員枠）は新園児とします（優先事項7）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_enrolled_no', points: 0 },
      { label: 'はい（新園児）', value: 'adj_sibling_enrolled_4', points: 4 },
      { label: 'はい（転園児）', value: 'adj_sibling_enrolled_10', points: 10 },
    ],
  },
  {
    id: 'adj_current_facility',
    category: 'adjustment',
    label: '現在の保育施設の利用状況は？',
    helpText:
      '優先事項8・9・10と調整事項7は併用できません。いずれか1つを選んでください',
    inputType: 'select',
    options: [
      { label: 'あてはまらない', value: 'adj_current_facility_none', points: 0 },
      {
        label: '市内地域型保育施設による保育を受けている',
        value: 'adj_current_facility_4',
        points: 4,
      },
      {
        label: '市内地域型保育施設の卒園児童（3歳児クラスの4月入所選考のみ適用）',
        value: 'adj_current_facility_15a',
        points: 15,
      },
      {
        label:
          '4月1日時点で市民であり、3月末まで市外保育施設を利用している（4月入所選考のみ適用）',
        value: 'adj_current_facility_15b',
        points: 15,
      },
      {
        label: '認可外保育施設等を利用している（証明日から3か月以内で16日以上が2か月）',
        value: 'adj_current_facility_4b',
        points: 4,
      },
      {
        label:
          '認可外保育施設等を利用している（証明日から3か月以内で16日以上が1か月、または12日以上が2か月）',
        value: 'adj_current_facility_3',
        points: 3,
      },
      {
        label: '幼稚園を利用している（認定こども園1号認定を含む）',
        value: 'adj_current_facility_1',
        points: 1,
      },
    ],
  },
  {
    id: 'adj_work_record_missing',
    category: 'adjustment',
    label: '就労実績が未記入ですか？',
    helpText:
      '就労・就学内定、育児休業中は除きます。父母それぞれに減点されます（調整事項1）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_work_record_missing_no', points: 0 },
      { label: 'はい（保護者1名）', value: 'adj_work_record_missing_1', points: -3 },
      { label: 'はい（保護者2名）', value: 'adj_work_record_missing_2', points: -6 },
    ],
  },
  {
    id: 'adj_work_record_p1',
    category: 'adjustment',
    label: '保護者1の就労実績は？',
    helpText:
      '育児休業中は除きます。証明日の直近3か月の実績のうち、最も勤務時間の多い月が対象です（調整事項2）',
    inputType: 'radio',
    options: [
      { label: '月96時間以上128時間未満', value: 'adj_work_record_p1_0', points: 0 },
      { label: '月160時間以上', value: 'adj_work_record_p1_2', points: 2 },
      { label: '月128時間以上', value: 'adj_work_record_p1_1', points: 1 },
      { label: '月96時間未満', value: 'adj_work_record_p1_m1', points: -1 },
      { label: '月64時間未満', value: 'adj_work_record_p1_m2', points: -2 },
    ],
  },
  {
    id: 'adj_work_record_p2',
    category: 'adjustment',
    label: '保護者2の就労実績は？',
    helpText:
      '育児休業中は除きます。証明日の直近3か月の実績のうち、最も勤務時間の多い月が対象です（調整事項2）',
    inputType: 'radio',
    options: [
      { label: '月96時間以上128時間未満', value: 'adj_work_record_p2_0', points: 0 },
      { label: '月160時間以上', value: 'adj_work_record_p2_2', points: 2 },
      { label: '月128時間以上', value: 'adj_work_record_p2_1', points: 1 },
      { label: '月96時間未満', value: 'adj_work_record_p2_m1', points: -1 },
      { label: '月64時間未満', value: 'adj_work_record_p2_m2', points: -2 },
    ],
  },
  {
    id: 'adj_single_posting',
    category: 'adjustment',
    label: '単身赴任ですか？',
    helpText: '調整事項3',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_posting_no', points: 0 },
      { label: 'はい', value: 'adj_single_posting_yes', points: 1 },
    ],
  },
  {
    id: 'adj_childcare_worker',
    category: 'adjustment',
    label: '保育士等の資格を持ち、保育施設等に勤務していますか？',
    helpText:
      '保育施設とは保育所・地域型保育施設・認定こども園・認可外保育施設等。内定および資格取得予定を含みます。父母それぞれに加点されます（調整事項4）',
    inputType: 'select',
    options: [
      { label: 'いいえ', value: 'adj_childcare_worker_no', points: 0 },
      { label: '市内保育施設に勤務（保護者1名）', value: 'adj_childcare_worker_in1', points: 15 },
      { label: '市内保育施設に勤務（保護者2名）', value: 'adj_childcare_worker_in2', points: 30 },
      { label: '市外保育施設に勤務（保護者1名）', value: 'adj_childcare_worker_out1', points: 5 },
      { label: '市外保育施設に勤務（保護者2名）', value: 'adj_childcare_worker_out2', points: 10 },
      {
        label: '市内放課後児童クラブ・児童センターに勤務（保護者1名）',
        value: 'adj_childcare_worker_club1',
        points: 13,
      },
      {
        label: '市内放課後児童クラブ・児童センターに勤務（保護者2名）',
        value: 'adj_childcare_worker_club2',
        points: 26,
      },
    ],
  },
  {
    id: 'adj_preschool_children',
    category: 'adjustment',
    label: '申込児童を含め、世帯内に未就学児童は何人いますか？',
    helpText: '（未就学児童数-1）が加点されます（調整事項5）',
    inputType: 'radio',
    options: [
      { label: '1人', value: 'adj_preschool_children_1', points: 0 },
      { label: '2人', value: 'adj_preschool_children_2', points: 1 },
      { label: '3人', value: 'adj_preschool_children_3', points: 2 },
      { label: '4人以上', value: 'adj_preschool_children_4', points: 3 },
    ],
  },
  {
    id: 'adj_sibling_disability',
    category: 'adjustment',
    label: '申込児童以外のきょうだいに介護の必要な障害を有している児童がいますか？',
    helpText: '当該児童の介護を理由に申し込む場合のみが対象です（調整事項6）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_disability_no', points: 0 },
      { label: 'はい', value: 'adj_sibling_disability_yes', points: 7 },
    ],
  },
  {
    id: 'adj_declined',
    category: 'adjustment',
    label: '入所内定を辞退したことがありますか？',
    helpText: '1回ごと・年度内のみ（調整事項8、減点）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_declined_no', points: 0 },
      { label: 'はい（1回）', value: 'adj_declined_1', points: -3 },
      { label: 'はい（2回以上）', value: 'adj_declined_2', points: -6 },
    ],
  },
  {
    id: 'adj_arrears',
    category: 'adjustment',
    label: '当該児童またはそのきょうだいで、正当な理由なく保育料を3か月以上滞納していますか？',
    helpText: '調整事項9（減点）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_arrears_no', points: 0 },
      { label: 'はい', value: 'adj_arrears_yes', points: -30 },
    ],
  },
];

// ---------------------------------------------------------------------------
// エクスポート
// ---------------------------------------------------------------------------

export const sakadoData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
