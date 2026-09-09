import type { MunicipalityData, Question } from '../types';

// -------------------------------------------------------------------------
// 宇多津町 保育園入園 利用調整基準データ
// 出典: 宇多津町「保育所等入所選考基準表」
// https://www.town.utazu.lg.jp/uploaded/attachment/3425.pdf
// -------------------------------------------------------------------------
// 宇多津町は表の冒頭に計算式が書かれている。
//   「★選考指数（利用の優先度）＝「①基本指数（父）」＋「①基本指数（母）」
//    ＋「②該当するもの全て（世帯単位）」（※同点時は③の順に決定）」
// 父と母の基本指数を足すので scoringMethod は 'sum'。
// 基本指数の最大は1人あたり12点。
//
// 「4 親族の介護・看護」と「7 就学・技能習得等」は指数欄が「1を準用」なので、
// 番号1（就労）と同じ 12／10／8／6 の刻みを使っている。
//
// 「9 育児休業取得継続利用」（9点）は「育児休業時に既に保育所（園）を利用し、
// 継続利用が必要」で、いま園を利用している方の話なので入れていない。
//
// 調整指数のうち、いま園を利用している方の話と、申込後の事務手続きの話は入れていない。
// - 1 既に利用している児童が継続して利用を希望する場合（+30）
// - 2 同一認定こども園内で1号認定から2号認定へ転籍する場合（+20）
// - 12 添付書類等が正当な理由なく期日までに提出がなかった者（−2）
// -------------------------------------------------------------------------

const municipality = {
  id: 'utazu',
  name: '宇多津町',
  slug: 'utazu',
  prefecture: '香川県',
  maxBasePoints: 12,
  scoringMethod: 'sum',
} as const;

// 1 就労（家庭外労働・家庭内労働・自営業・内職）
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月実働150時間以上を常態', value: `${prefix}_employment_0`, points: 12 },
  { label: '月実働120時間以上150時間未満を常態', value: `${prefix}_employment_1`, points: 10 },
  { label: '月実働80時間以上120時間未満を常態', value: `${prefix}_employment_2`, points: 8 },
  { label: '月実働48時間以上80時間未満を常態', value: `${prefix}_employment_3`, points: 6 },
];

// 2 妊娠・出産
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '妊娠・出産のため、保育ができない', value: `${prefix}_childbirth_0`, points: 10 },
];

// 3 疾病・障がい
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院：1か月以上の入院又は入院見込み', value: `${prefix}_illness_0`, points: 12 },
  { label: '自宅療養：常時臥床', value: `${prefix}_illness_1`, points: 12 },
  { label: '心身障がい：身体障害者手帳1〜2級、精神障害者保健福祉手帳1〜2級、療育手帳A・Ⓐ、介護保険の要介護度が3〜5のいずれかに該当', value: `${prefix}_illness_2`, points: 12 },
  { label: '自宅療養：1か月以上の安静を要する診断又は日常生活動作に支障をきたしている', value: `${prefix}_illness_3`, points: 9 },
  { label: '心身障がい：身体障害者手帳3級、精神障害者保健福祉手帳3級、療育手帳B・Ⓑ、介護保険の要介護度が1〜2のいずれかに該当', value: `${prefix}_illness_4`, points: 9 },
  { label: '自宅療養：一般療養（上記以外で通院加療が必要）', value: `${prefix}_illness_5`, points: 7 },
  { label: '心身障がい：身体障害者手帳4〜6級、介護保険の要介護度が要支援のいずれかに該当', value: `${prefix}_illness_6`, points: 7 },
];

// 4 親族の介護・看護（指数は「1を準用」）
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '介護・看護が月150時間以上を常態', value: `${prefix}_care_0`, points: 12 },
  { label: '介護・看護が月120時間以上150時間未満を常態', value: `${prefix}_care_1`, points: 10 },
  { label: '介護・看護が月80時間以上120時間未満を常態', value: `${prefix}_care_2`, points: 8 },
  { label: '介護・看護が月48時間以上80時間未満を常態', value: `${prefix}_care_3`, points: 6 },
];

// 5 災害復旧
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '災害復旧活動のため、保育ができない', value: `${prefix}_disaster_0`, points: 12 },
];

// 6 求職活動・起業準備
const jobseekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動（起業準備を含む）のため、日中の外出を常態', value: `${prefix}_jobseeking_0`, points: 4 },
];

// 7 就学・技能習得等（指数は「1を準用」）
const schoolOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_school_none`, points: 0 },
  { label: '就学・技能習得等が月150時間以上を常態', value: `${prefix}_school_0`, points: 12 },
  { label: '就学・技能習得等が月120時間以上150時間未満を常態', value: `${prefix}_school_1`, points: 10 },
  { label: '就学・技能習得等が月80時間以上120時間未満を常態', value: `${prefix}_school_2`, points: 8 },
  { label: '就学・技能習得等が月48時間以上80時間未満を常態', value: `${prefix}_school_3`, points: 6 },
];

// 8 DV・虐待
const dvOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_dv_none`, points: 0 },
  { label: '現在DV等の被害にある、または、過去に虐待や児童相談所等による保護の経緯があるなど、家庭内において被害を受ける恐れがある', value: `${prefix}_dv_0`, points: 12 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: '選考指数は父と母の基本指数を合計し、世帯単位の調整指数を加えて算出します',
    inputType: 'select',
    options: [
      { label: '就労', value: `${prefix}_reason_employment`, points: 0 },
      { label: '妊娠・出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '疾病・障がい', value: `${prefix}_reason_illness`, points: 0 },
      { label: '親族の介護・看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '災害復旧', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '求職活動・起業準備', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '就学・技能習得等', value: `${prefix}_reason_school`, points: 0 },
      { label: 'DV・虐待', value: `${prefix}_reason_dv`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の就労の状況は？`,
      helpText: '家庭外労働・家庭内労働・自営業・内職のいずれも同じ指数です',
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
      label: `${parentLabel}の親族の介護・看護の状況は？`,
      helpText: '病院付き添い、自宅療養等。指数は就労と同じ基準を準用します',
      inputType: 'radio',
      options: careOptions(prefix),
    },
    {
      id: `${prefix}_disaster`,
      category,
      label: `${parentLabel}は災害復旧活動に当たっていますか？`,
      inputType: 'radio',
      options: disasterOptions(prefix),
    },
    {
      id: `${prefix}_jobseeking`,
      category,
      label: `${parentLabel}は求職活動・起業準備中ですか？`,
      inputType: 'radio',
      options: jobseekingOptions(prefix),
    },
    {
      id: `${prefix}_school`,
      category,
      label: `${parentLabel}の就学・技能習得の状況は？`,
      helpText: '職業訓練を含みます。指数は就労と同じ基準を準用します',
      inputType: 'radio',
      options: schoolOptions(prefix),
    },
    {
      id: `${prefix}_dv`,
      category,
      label: `${parentLabel}の世帯にDV・虐待の恐れがありますか？`,
      inputType: 'radio',
      options: dvOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// ②調整指数（該当するもの全て・世帯単位）
const adjustmentQuestions: Question[] = [
  {
    id: 'adj_jidou_fukushi',
    category: 'adjustment',
    label: '児童福祉法による支援の必要な者ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_jidou_fukushi_0', points: 0 },
      { label: 'はい（+20）', value: 'adj_jidou_fukushi_1', points: 20 },
    ],
  },
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親家庭ですか？',
    helpText: '母子及び寡婦福祉法による配慮が対象です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_0', points: 0 },
      { label: 'はい（+20）', value: 'adj_single_parent_1', points: 20 },
    ],
  },
  {
    id: 'adj_chiikigata',
    category: 'adjustment',
    label: '地域型保育事業の修了児童ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_chiikigata_0', points: 0 },
      { label: 'はい（+5）', value: 'adj_chiikigata_1', points: 5 },
    ],
  },
  {
    id: 'adj_hoikushi',
    category: 'adjustment',
    label: '保護者が保育士資格を有しており、保育施設で勤務していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_hoikushi_0', points: 0 },
      { label: 'はい（+5）', value: 'adj_hoikushi_1', points: 5 },
    ],
  },
  {
    id: 'adj_unemployed',
    category: 'adjustment',
    label: '生計中心者の失業により、就労の必要性が高いですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unemployed_0', points: 0 },
      { label: 'はい（+4）', value: 'adj_unemployed_1', points: 4 },
    ],
  },
  {
    id: 'adj_return_to_work',
    category: 'adjustment',
    label: '産休・育休からの復帰を予定していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_return_to_work_0', points: 0 },
      { label: 'はい（+3）', value: 'adj_return_to_work_1', points: 3 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯（自立支援につながる場合）または障害児ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_0', points: 0 },
      { label: 'はい（+3）', value: 'adj_welfare_1', points: 3 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: 'きょうだい（多胎児を含む）が同一の保育施設等の利用を希望していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_0', points: 0 },
      { label: 'はい（+3）', value: 'adj_sibling_1', points: 3 },
    ],
  },
  {
    id: 'adj_planned_work',
    category: 'adjustment',
    label: '基本指数の「就労」で、就労予定または自営準備の段階ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_planned_work_0', points: 0 },
      { label: 'はい（−1）', value: 'adj_planned_work_1', points: -1 },
    ],
  },
  {
    id: 'adj_outside_town',
    category: 'adjustment',
    label: '児童の住所が宇多津町以外ですか？',
    helpText: '転入予定の場合は除きます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_outside_town_0', points: 0 },
      { label: 'はい（−5）', value: 'adj_outside_town_1', points: -5 },
    ],
  },
  {
    id: 'adj_fee_delinquent',
    category: 'adjustment',
    label: '保育料等の滞納があり、納付相談がない又は納付約束の履行をしていませんか？',
    helpText: '卒園児も含みます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_fee_delinquent_0', points: 0 },
      { label: 'はい（−5）', value: 'adj_fee_delinquent_1', points: -5 },
    ],
  },
  {
    id: 'adj_declined',
    category: 'adjustment',
    label: '過去に希望施設への入所内定を辞退したことがありますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_declined_0', points: 0 },
      { label: 'はい（−5）', value: 'adj_declined_1', points: -5 },
    ],
  },
];

export const utazuData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
