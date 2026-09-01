import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 近江八幡市 保育園入園 利用調整基準データ
// 出典: 近江八幡市「令和9年度 入所のしおり」内「近江八幡市保育所等保育実施基準表」
// https://www.city.omihachiman.lg.jp/material/files/group/158/2027shiori.pdf
// ---------------------------------------------------------------------------
// 近江八幡市は「基準指数（父母それぞれ算出し、低いほうを採用）＋ 利用調整指数」。
// ひとり親世帯（離婚調停中等を含む）は父・母どちらかの指数を採用する。
// 保育が必要な理由が2つ以上ある場合は、主たる要件を基準指数とする。
// ---------------------------------------------------------------------------
// 「保護者が保育士・幼稚園教諭」は市の表で「最優先」とされており点数が定められて
// いないため、当サイトでは点数を付けず、質問も置いていない。
// 「広域入所」も点数ではなく「市民優先」と書かれているため同様に扱っていない。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'omihachiman',
  name: '近江八幡市',
  slug: 'omihachiman',
  prefecture: '滋賀県',
  maxBasePoints: 20,
  scoringMethod: 'min',
} as const;

const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月160時間以上', value: `${prefix}_employment_20`, points: 20 },
  { label: '月120時間以上160時間未満', value: `${prefix}_employment_18`, points: 18 },
  { label: '月80時間以上120時間未満', value: `${prefix}_employment_16`, points: 16 },
  { label: '月60時間以上80時間未満', value: `${prefix}_employment_14`, points: 14 },
];

const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '産前3か月（産月を含む）から産後3か月', value: `${prefix}_childbirth_12`, points: 12 },
  { label: '妊娠から産前3か月（産月を含まない）', value: `${prefix}_childbirth_10`, points: 10 },
];

const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院', value: `${prefix}_illness_20`, points: 20 },
  { label: '自宅療養で常時臥床（寝たきり）', value: `${prefix}_illness_20b`, points: 20 },
  { label: '通院加療で常に安静を要する', value: `${prefix}_illness_16`, points: 16 },
  { label: '定期的な通院を要し保育に支障がある', value: `${prefix}_illness_12`, points: 12 },
];

const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '身体1級・2級 / 療育A / 精神1級・2級', value: `${prefix}_disability_20`, points: 20 },
  { label: '身体3級 / 療育B / 精神3級', value: `${prefix}_disability_16`, points: 16 },
  { label: '身体4級', value: `${prefix}_disability_12`, points: 12 },
];

const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '入院・通院・通所等で週3日以上の介護・看護', value: `${prefix}_care_20`, points: 20 },
  { label: '居宅内で寝たきり高齢者・重度心身障がい者等の常時介護・看護', value: `${prefix}_care_20b`, points: 20 },
  { label: '上記以外の介護・看護', value: `${prefix}_care_14`, points: 14 },
];

const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '災害による家屋の損傷・災害復旧で保育ができない', value: `${prefix}_disaster_20`, points: 20 },
];

const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '週3日以上の外出による求職活動', value: `${prefix}_jobseeking_10`, points: 10 },
];

const schoolOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_school_none`, points: 0 },
  { label: '月160時間以上の就学', value: `${prefix}_school_17`, points: 17 },
  { label: '月120時間以上の就学', value: `${prefix}_school_13`, points: 13 },
  { label: '上記以外の就学', value: `${prefix}_school_10`, points: 10 },
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
      '近江八幡市は父母それぞれの基準指数を出し、低いほうを世帯の基準指数にします（ひとり親世帯はどちらかの指数）',
    inputType: 'select',
    options: [
      { label: '仕事をしている', value: `${prefix}_reason_employment`, points: 0 },
      { label: '妊娠・出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '病気の治療中', value: `${prefix}_reason_illness`, points: 0 },
      { label: '心身の障がい', value: `${prefix}_reason_disability`, points: 0 },
      { label: '同居親族の介護・看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '災害の復旧', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '求職活動中', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '就学', value: `${prefix}_reason_school`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の就労時間（月あたり）は？`,
      helpText: '休憩時間は含み、通勤時間は含みません。育児休業から復職する場合も就労として扱われます',
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
      label: `${parentLabel}の疾病の状況は？`,
      inputType: 'radio',
      options: illnessOptions(prefix),
    },
    {
      id: `${prefix}_disability`,
      category,
      label: `${parentLabel}の心身障がいの程度は？`,
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
      id: `${prefix}_disaster`,
      category,
      label: `${parentLabel}は災害の復旧にあたっていますか？`,
      inputType: 'radio',
      options: disasterOptions(prefix),
    },
    {
      id: `${prefix}_jobseeking`,
      category,
      label: `${parentLabel}の求職活動の状況は？`,
      inputType: 'radio',
      options: jobSeekingOptions(prefix),
    },
    {
      id: `${prefix}_school`,
      category,
      label: `${parentLabel}の就学時間（月あたり）は？`,
      inputType: 'radio',
      options: schoolOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_family_situation',
    category: 'adjustment',
    label: '特別な家庭事情がありますか？',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_family_situation_none', points: 0 },
      { label: '両親不存在（里親を含む）（+25）', value: 'adj_family_situation_noparent', points: 25 },
      { label: 'DV・児童虐待等（+25）', value: 'adj_family_situation_dv', points: 25 },
    ],
  },
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親家庭ですか？（離婚調停中等は除く）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい（+6）', value: 'adj_single_parent_yes', points: 6 },
    ],
  },
  {
    id: 'adj_tanshin',
    category: 'adjustment',
    label: '父または母が1年以上の単身赴任（県外・国外）ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_tanshin_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_tanshin_yes', points: 2 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯で、就労により自立支援につながりますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_welfare_yes', points: 2 },
    ],
  },
  {
    id: 'adj_unlicensed',
    category: 'adjustment',
    label: '認可外保育施設に預けて就労していますか？（求職中の方のみ加点）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unlicensed_no', points: 0 },
      { label: 'はい（+3）', value: 'adj_unlicensed_yes', points: 3 },
    ],
  },
  {
    id: 'adj_graduate',
    category: 'adjustment',
    label: '地域型保育事業（小規模・家庭的・事業所内）の卒園（予定）児で3歳児クラス以降の入所を希望しますか？',
    helpText: '近江八幡市民として半年以上の在籍が必要です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_graduate_no', points: 0 },
      { label: 'はい（+10）', value: 'adj_graduate_yes', points: 10 },
    ],
  },
  {
    id: 'adj_waiting_special',
    category: 'adjustment',
    label: '前年度、医療的ケア・障がい児加配・アレルギー対応で職員配置ができず待機児童になりましたか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_waiting_special_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_waiting_special_yes', points: 2 },
    ],
  },
  {
    id: 'adj_childbirth_leave',
    category: 'adjustment',
    label: '「妊娠・出産」要件の認定期間内に退所し、育児休業からの復職時に再度申し込みますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_childbirth_leave_no', points: 0 },
      { label: 'はい（+5）', value: 'adj_childbirth_leave_yes', points: 5 },
    ],
  },
  {
    id: 'adj_sibling_enrolled',
    category: 'adjustment',
    label: '入所希望月に、きょうだいが既に保育施設に在籍していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_enrolled_no', points: 0 },
      { label: 'はい（+3）', value: 'adj_sibling_enrolled_yes', points: 3 },
    ],
  },
  {
    id: 'adj_sibling_same',
    category: 'adjustment',
    label: 'きょうだいが既に在籍する施設を第1希望にしますか？（+2）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_same_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_sibling_same_yes', points: 2 },
    ],
  },
  {
    id: 'adj_sibling_together',
    category: 'adjustment',
    label: 'きょうだいで同時に申し込みますか？（+2）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_together_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_sibling_together_yes', points: 2 },
    ],
  },
  {
    id: 'adj_many_children',
    category: 'adjustment',
    label: '多子世帯（子ども3人以上・年齢不問）ですか？（+1）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_many_children_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_many_children_yes', points: 1 },
    ],
  },
  {
    id: 'adj_grandparent',
    category: 'adjustment',
    label: '保育可能な65歳未満の同居祖父母がいますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_grandparent_no', points: 0 },
      { label: 'はい（-10）', value: 'adj_grandparent_yes', points: -10 },
    ],
  },
  {
    id: 'adj_fee_delinquent',
    category: 'adjustment',
    label: '卒園児・在園児の保育料または給食費を1か月以上滞納していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_fee_delinquent_no', points: 0 },
      { label: 'はい（-15）', value: 'adj_fee_delinquent_yes', points: -15 },
    ],
  },
  {
    id: 'adj_decline',
    category: 'adjustment',
    label: '同一年度内に入所内定を辞退しましたか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_decline_no', points: 0 },
      { label: 'はい（-10）', value: 'adj_decline_yes', points: -10 },
    ],
  },
];

export const omihachimanData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
