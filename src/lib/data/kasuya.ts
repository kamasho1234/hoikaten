import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 粕屋町 保育園入園 利用調整基準データ
// 出典: 粕屋町「令和8年度 粕屋町認可保育施設利用調整指数表」(PDF)
// https://www.town.kasuya.fukuoka.jp/kosodate/s019/060/010/010/260/sisuuuhyou.pdf
// ---------------------------------------------------------------------------
// 粕屋町は「基礎指数（保護者1名ずつに点数をつけ、低いほうを子どもの基礎指数とする）
// ＋ 調整指数（該当するものをそれぞれ加点）」。
// 同一保護者で該当項目が複数ある場合は、基礎指数の高い方を適用する。
// ---------------------------------------------------------------------------
// 就学の指数は指数表に区分が載っていないため（同点時の優先順位にのみ登場する）、
// 当サイトでは就学の選択肢を置いていない。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'kasuya',
  name: '粕屋町',
  slug: 'kasuya',
  prefecture: '福岡県',
  maxBasePoints: 200,
  scoringMethod: 'min',
} as const;

const employedOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employed_none`, points: 0 },
  { label: '月160時間以上', value: `${prefix}_employed_150`, points: 150 },
  { label: '月140時間以上160時間未満', value: `${prefix}_employed_140`, points: 140 },
  { label: '月120時間以上140時間未満', value: `${prefix}_employed_130`, points: 130 },
  { label: '月100時間以上120時間未満', value: `${prefix}_employed_120`, points: 120 },
  { label: '月80時間以上100時間未満', value: `${prefix}_employed_110`, points: 110 },
  { label: '月64時間以上80時間未満', value: `${prefix}_employed_100`, points: 100 },
];

const selfEmployedOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_self_none`, points: 0 },
  { label: '中心者・月160時間以上', value: `${prefix}_self_150`, points: 150 },
  { label: '中心者・月140時間以上160時間未満', value: `${prefix}_self_140`, points: 140 },
  { label: '中心者・月120時間以上140時間未満', value: `${prefix}_self_130`, points: 130 },
  { label: '中心者・月100時間以上120時間未満', value: `${prefix}_self_120`, points: 120 },
  { label: '中心者・月80時間以上100時間未満', value: `${prefix}_self_110`, points: 110 },
  { label: '中心者・月64時間以上80時間未満', value: `${prefix}_self_100`, points: 100 },
  { label: '協力者・月160時間以上', value: `${prefix}_selfsub_120`, points: 120 },
  { label: '協力者・月140時間以上160時間未満', value: `${prefix}_selfsub_110`, points: 110 },
  { label: '協力者・月120時間以上140時間未満', value: `${prefix}_selfsub_100`, points: 100 },
  { label: '協力者・月100時間以上120時間未満', value: `${prefix}_selfsub_90`, points: 90 },
  { label: '協力者・月80時間以上100時間未満', value: `${prefix}_selfsub_80`, points: 80 },
  { label: '協力者・月64時間以上80時間未満', value: `${prefix}_selfsub_70`, points: 70 },
];

const plannedOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_planned_none`, points: 0 },
  { label: '月160時間以上', value: `${prefix}_planned_120`, points: 120 },
  { label: '月140時間以上160時間未満', value: `${prefix}_planned_110`, points: 110 },
  { label: '月120時間以上140時間未満', value: `${prefix}_planned_100`, points: 100 },
  { label: '月100時間以上120時間未満', value: `${prefix}_planned_90`, points: 90 },
  { label: '月80時間以上100時間未満', value: `${prefix}_planned_80`, points: 80 },
  { label: '月64時間以上80時間未満', value: `${prefix}_planned_70`, points: 70 },
];

const homeworkOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_homework_none`, points: 0 },
  { label: '月160時間以上', value: `${prefix}_homework_120`, points: 120 },
  { label: '月140時間以上160時間未満', value: `${prefix}_homework_110`, points: 110 },
  { label: '月120時間以上140時間未満', value: `${prefix}_homework_100`, points: 100 },
  { label: '月100時間以上120時間未満', value: `${prefix}_homework_90`, points: 90 },
  { label: '月80時間以上100時間未満', value: `${prefix}_homework_70`, points: 70 },
  { label: '月64時間以上80時間未満', value: `${prefix}_homework_50`, points: 50 },
];

const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産予定日の2か月（多胎児は4か月）前の月初め〜産後翌々月', value: `${prefix}_childbirth_80`, points: 80 },
];

const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院・自宅療養安静（常時病臥）', value: `${prefix}_illness_160`, points: 160 },
  { label: '通院・常時安静・精神疾患（家庭保育できない）', value: `${prefix}_illness_130`, points: 130 },
  { label: '通院・常時安静・精神疾患（育児の軽減が必要）', value: `${prefix}_illness_100`, points: 100 },
  { label: 'その他の疾病', value: `${prefix}_illness_50`, points: 50 },
];

const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '保育が常時困難（身体1〜2級 / 精神1級 / 療育A）', value: `${prefix}_disability_150`, points: 150 },
  { label: '保育が著しく困難（身体3級 / 精神2〜3級 / 療育B）', value: `${prefix}_disability_140`, points: 140 },
  { label: '保育が困難（身体4〜6級）', value: `${prefix}_disability_130`, points: 130 },
];

const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '入院・通院の親族に月120時間以上付き添い', value: `${prefix}_care_130`, points: 130 },
  { label: '入院・通院の親族に月64時間以上120時間未満付き添い', value: `${prefix}_care_90`, points: 90 },
  { label: '居宅で月120時間以上の看護・介護', value: `${prefix}_care_130b`, points: 130 },
  { label: '居宅で月64時間以上120時間未満の看護・介護', value: `${prefix}_care_90b`, points: 90 },
];

const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '風水害・地震・火災等の復旧', value: `${prefix}_disaster_200`, points: 200 },
];

const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動中', value: `${prefix}_jobseeking_50`, points: 50 },
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
      '粕屋町は保護者1名ずつに基礎指数をつけ、低いほうを子どもの基礎指数にします。同一保護者で複数あてはまる場合は高い方が適用されます',
    inputType: 'select',
    options: [
      { label: '被雇用者として働いている', value: `${prefix}_reason_employed`, points: 0 },
      { label: '自営業', value: `${prefix}_reason_self`, points: 0 },
      { label: '就業予定', value: `${prefix}_reason_planned`, points: 0 },
      { label: '内職', value: `${prefix}_reason_homework`, points: 0 },
      { label: '妊娠・出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '疾病', value: `${prefix}_reason_illness`, points: 0 },
      { label: '心身障害', value: `${prefix}_reason_disability`, points: 0 },
      { label: '看護・介護', value: `${prefix}_reason_care`, points: 0 },
      { label: '災害復旧', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '求職活動', value: `${prefix}_reason_jobseeking`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employed`,
      category,
      label: `${parentLabel}の就労時間（月あたり・被雇用者）は？`,
      inputType: 'radio',
      options: employedOptions(prefix),
    },
    {
      id: `${prefix}_self`,
      category,
      label: `${parentLabel}の自営業の状況は？`,
      inputType: 'radio',
      options: selfEmployedOptions(prefix),
    },
    {
      id: `${prefix}_planned`,
      category,
      label: `${parentLabel}の就業予定の時間（月あたり）は？`,
      inputType: 'radio',
      options: plannedOptions(prefix),
    },
    {
      id: `${prefix}_homework`,
      category,
      label: `${parentLabel}の内職の時間（月あたり）は？`,
      inputType: 'radio',
      options: homeworkOptions(prefix),
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
      label: `${parentLabel}の疾病の状況は？`,
      inputType: 'radio',
      options: illnessOptions(prefix),
    },
    {
      id: `${prefix}_disability`,
      category,
      label: `${parentLabel}の心身障害の程度は？`,
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
      label: `${parentLabel}は災害の復旧にあたっていますか？`,
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
  ];

  return [reasonQuestion, ...detailQuestions];
}

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親家庭ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい（+75）', value: 'adj_single_parent_yes', points: 75 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい（+15）', value: 'adj_welfare_yes', points: 15 },
    ],
  },
  {
    id: 'adj_unemployed',
    category: 'adjustment',
    label: '家計の主宰者が失業していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unemployed_no', points: 0 },
      { label: 'はい（+25）', value: 'adj_unemployed_yes', points: 25 },
    ],
  },
  {
    id: 'adj_social_care',
    category: 'adjustment',
    label: '社会的養護（要保護児童等）にあたりますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_social_care_no', points: 0 },
      { label: 'はい（+75）', value: 'adj_social_care_yes', points: 75 },
    ],
  },
  {
    id: 'adj_child_disability',
    category: 'adjustment',
    label: '子どもに障がいがありますか？（手帳あり）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_child_disability_no', points: 0 },
      { label: 'はい（+35）', value: 'adj_child_disability_yes', points: 35 },
    ],
  },
  {
    id: 'adj_parental_leave',
    category: 'adjustment',
    label: '育児休業後の復職または復職予定ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_parental_leave_no', points: 0 },
      { label: 'はい（+15）', value: 'adj_parental_leave_yes', points: 15 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: 'きょうだいの状況は？（同一保育施設の利用希望）',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_sibling_none', points: 0 },
      { label: '在園児のきょうだい（+15）', value: 'adj_sibling_enrolled', points: 15 },
      { label: '在園児きょうだいが現在別の認可保育施設を利用（+30）', value: 'adj_sibling_other', points: 30 },
      { label: '同時申し込み（新規）（+10）', value: 'adj_sibling_together', points: 10 },
    ],
  },
  {
    id: 'adj_graduate',
    category: 'adjustment',
    label: '小規模保育事業などの卒園児童ですか？',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_graduate_none', points: 0 },
      { label: '保育施設等の利用希望（+15）', value: 'adj_graduate_15', points: 15 },
      { label: '企業主導型（3歳児以上）（+15）', value: 'adj_graduate_kigyo', points: 15 },
    ],
  },
  {
    id: 'adj_tanshin',
    category: 'adjustment',
    label: '単身赴任にあたりますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_tanshin_no', points: 0 },
      { label: 'はい（+15）', value: 'adj_tanshin_yes', points: 15 },
    ],
  },
  {
    id: 'adj_hoikushi',
    category: 'adjustment',
    label: '保護者が保育士ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_hoikushi_no', points: 0 },
      { label: '認可施設で常勤・月120時間以上（+75）', value: 'adj_hoikushi_full', points: 75 },
      { label: '認可施設で非常勤・月120時間未満（+30）', value: 'adj_hoikushi_part', points: 30 },
    ],
  },
  {
    id: 'adj_family_home',
    category: 'adjustment',
    label: '同居親族（65歳未満）が保育要件を満たしていませんか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_family_home_no', points: 0 },
      { label: 'はい（-30）', value: 'adj_family_home_yes', points: -30 },
    ],
  },
  {
    id: 'adj_work_record',
    category: 'adjustment',
    label: '勤務実績がともなっていない状況ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_work_record_no', points: 0 },
      { label: 'はい（-5）', value: 'adj_work_record_yes', points: -5 },
    ],
  },
  {
    id: 'adj_leave_extension',
    category: 'adjustment',
    label: '入所できない場合、育児休業の延長を許容できますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_leave_extension_no', points: 0 },
      { label: 'はい（-125）', value: 'adj_leave_extension_yes', points: -125 },
    ],
  },
  {
    id: 'adj_decline',
    category: 'adjustment',
    label: 'やむを得ない理由なく保育所入所を辞退しましたか？（当該年度のみ）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_decline_no', points: 0 },
      { label: 'はい（-10）', value: 'adj_decline_yes', points: -10 },
    ],
  },
];

export const kasuyaData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
