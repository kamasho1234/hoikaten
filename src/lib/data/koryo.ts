import type { MunicipalityData, Question } from '../types';

// -------------------------------------------------------------------------
// 広陵町 保育園入園 利用調整基準データ
// 出典: 広陵町「保育所等入所選考等に関する要綱」別表第1（基本指数）・別表第2（調整指数）
// https://www.town.koryo.nara.jp/cmsfiles/contents/0000006/6650/kihonnsisuu0130.pdf
// https://www.town.koryo.nara.jp/cmsfiles/contents/0000006/6650/tyouseisisuu20260130.pdf
// -------------------------------------------------------------------------
// 広陵町は要綱の第3条に手順が書かれている。
//   「保育を必要とする程度は、保護者に係る別表第1に掲げる基本指数に
//    別表第2に掲げる調整指数を加えた指数（以下「実施指数」という。）をもって決定する。」
// 原典は父母の合わせ方を書いていないため、
// 全国で最も多い形（父母それぞれの指数を合算）に合わせて scoringMethod は 'sum' とした。
// 基本指数の最大は1人あたり10点。
//
// 別表第1の注記「※ひとり親家庭の場合は、母又は父の指数＋10」は、
// 基本指数への加点だが、実際には世帯に1回だけ付く形なので調整指数の設問に入れている。
// 別表第2の1「ひとり親世帯」（+5）とは別の加点である。
//
// 7「求職中」の「就労先決定」は指数欄が「分類の1又は2に準ずる」なので、
// 居宅外労働・居宅内労働と同じ刻みを使っている。
//
// 別表第2の13「保育所施設整備等で、兄弟姉妹が別々の施設になるため、他園への転園を
// 希望する場合（ただし、令和7年度中に真美北保育園に在園している場合又は内定している
// 場合に限る。）」（+2）は、転園かつ特定の園に在園している方だけの話なので入れていない。
// -------------------------------------------------------------------------

const municipality = {
  id: 'koryo',
  name: '広陵町',
  slug: 'koryo',
  prefecture: '奈良県',
  maxBasePoints: 20, // 父母各10点の合計
  scoringMethod: 'sum',
} as const;

// 1 居宅外労働・自営業（事業主） ／ 2 居宅内労働・自営業（事業主以外）
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '居宅外労働・自営業（事業主）：月労働時間160時間以上', value: `${prefix}_employment_0`, points: 10 },
  { label: '居宅外労働・自営業（事業主）：月労働時間140時間以上160時間未満', value: `${prefix}_employment_1`, points: 8 },
  { label: '居宅外労働・自営業（事業主）：月労働時間120時間以上140時間未満', value: `${prefix}_employment_2`, points: 7 },
  { label: '居宅内労働・自営業（事業主以外）：月労働時間120時間以上', value: `${prefix}_employment_3`, points: 7 },
  { label: '居宅外労働・自営業（事業主）：月労働時間100時間以上120時間未満', value: `${prefix}_employment_4`, points: 6 },
  { label: '居宅内労働・自営業（事業主以外）：月労働時間100時間以上120時間未満', value: `${prefix}_employment_5`, points: 6 },
  { label: '居宅外労働・自営業（事業主）：月労働時間80時間以上100時間未満', value: `${prefix}_employment_6`, points: 5 },
  { label: '居宅内労働・自営業（事業主以外）：月労働時間80時間以上100時間未満', value: `${prefix}_employment_7`, points: 5 },
  { label: '居宅外労働・自営業（事業主）：月労働時間64時間以上80時間未満', value: `${prefix}_employment_8`, points: 4 },
  { label: '居宅内労働・自営業（事業主以外）：月労働時間64時間以上80時間未満', value: `${prefix}_employment_9`, points: 4 },
  { label: '居宅外労働・自営業（事業主）：月労働時間48時間以上64時間未満', value: `${prefix}_employment_10`, points: 3 },
  { label: '居宅内労働・自営業（事業主以外）：月労働時間48時間以上64時間未満', value: `${prefix}_employment_11`, points: 3 },
];

// 3 母親の出産
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産前後の数ヶ月保育にあたる者がいない場合', value: `${prefix}_childbirth_0`, points: 8 },
];

// 4 保護者の疾病等 ／ 5 保護者の障害
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院：1か月以上にわたる入院治療', value: `${prefix}_illness_0`, points: 10 },
  { label: '居宅療養：病気のため居宅で床につくことが常態である場合', value: `${prefix}_illness_1`, points: 10 },
  { label: '障害（重度）：身体障害者手帳1級・2級、精神障害者保健福祉手帳1級及び療育手帳A', value: `${prefix}_illness_2`, points: 10 },
  { label: '居宅療養：1か月以上の疾病で週3日以上の通院を要する場合', value: `${prefix}_illness_3`, points: 7 },
  { label: '障害（中度）：身体障害者手帳3級・4級、精神障害者保健福祉手帳2級及び療育手帳B', value: `${prefix}_illness_4`, points: 7 },
  { label: '居宅療養：1か月以上の疾病で上記以外の場合', value: `${prefix}_illness_5`, points: 5 },
  { label: '障害（軽度）：身体障害者手帳上記以外及び精神障害者保健福祉手帳3級', value: `${prefix}_illness_6`, points: 5 },
];

// 6 病人の看護
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '居宅看護：重度の障害又は要介護4・5程度の者を常時看護・介護する場合', value: `${prefix}_care_0`, points: 10 },
  { label: '付添（入院）：週3日以上病院等に日中を通じて看護に従事する場合', value: `${prefix}_care_1`, points: 8 },
  { label: '付添（通学）：心身障害児の通学の付き添いのため、日中他の児童の保育にあたることができない場合', value: `${prefix}_care_2`, points: 8 },
  { label: '居宅看護：中度の障害又は要介護2・3程度の者を常時看護・介護する場合', value: `${prefix}_care_3`, points: 8 },
  { label: '居宅看護：上記以外の程度の者を看護・介護する場合', value: `${prefix}_care_4`, points: 5 },
];

// 7 求職中（就労先決定は分類1又は2に準ずる）
const jobseekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '就労先決定（居宅外）：月労働時間160時間以上', value: `${prefix}_jobseeking_0`, points: 10 },
  { label: '就労先決定（居宅外）：月労働時間140時間以上160時間未満', value: `${prefix}_jobseeking_1`, points: 8 },
  { label: '就労先決定（居宅外）：月労働時間120時間以上140時間未満', value: `${prefix}_jobseeking_2`, points: 7 },
  { label: '就労先決定（居宅内）：月労働時間120時間以上', value: `${prefix}_jobseeking_3`, points: 7 },
  { label: '就労先決定（居宅外）：月労働時間100時間以上120時間未満', value: `${prefix}_jobseeking_4`, points: 6 },
  { label: '就労先決定（居宅内）：月労働時間100時間以上120時間未満', value: `${prefix}_jobseeking_5`, points: 6 },
  { label: '就労先決定（居宅外）：月労働時間80時間以上100時間未満', value: `${prefix}_jobseeking_6`, points: 5 },
  { label: '就労先決定（居宅内）：月労働時間80時間以上100時間未満', value: `${prefix}_jobseeking_7`, points: 5 },
  { label: '就労先決定（居宅外）：月労働時間64時間以上80時間未満', value: `${prefix}_jobseeking_8`, points: 4 },
  { label: '就労先決定（居宅内）：月労働時間64時間以上80時間未満', value: `${prefix}_jobseeking_9`, points: 4 },
  { label: '就労先決定：月労働時間48時間以上64時間未満', value: `${prefix}_jobseeking_10`, points: 3 },
  { label: '求職中（勤務時間及び勤務日数が決まっていない、又は就労先が決まっていない）', value: `${prefix}_jobseeking_11`, points: 1 },
];

// 8 就学
const schoolOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_school_none`, points: 0 },
  { label: '月就学時間120時間以上', value: `${prefix}_school_0`, points: 7 },
  { label: '月就学時間100時間以上120時間未満', value: `${prefix}_school_1`, points: 6 },
  { label: '月就学時間80時間以上100時間未満', value: `${prefix}_school_2`, points: 5 },
  { label: '月就学時間64時間以上80時間未満', value: `${prefix}_school_3`, points: 4 },
  { label: '月就学時間48時間以上64時間未満', value: `${prefix}_school_4`, points: 3 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: '実施指数は基本指数に調整指数を加えたものです',
    inputType: 'select',
    options: [
      { label: '労働（居宅外・居宅内）', value: `${prefix}_reason_employment`, points: 0 },
      { label: '母親の出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '保護者の疾病等・障害', value: `${prefix}_reason_illness`, points: 0 },
      { label: '病人の看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '求職中', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '就学', value: `${prefix}_reason_school`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の労働の状況は？`,
      inputType: 'radio',
      options: employmentOptions(prefix),
    },
    {
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}の出産の状況は？`,
      helpText: '原典では母親の出産の区分です',
      inputType: 'radio',
      options: childbirthOptions(prefix),
    },
    {
      id: `${prefix}_illness`,
      category,
      label: `${parentLabel}の疾病等・障害の状況は？`,
      inputType: 'radio',
      options: illnessOptions(prefix),
    },
    {
      id: `${prefix}_care`,
      category,
      label: `${parentLabel}の病人の看護の状況は？`,
      inputType: 'radio',
      options: careOptions(prefix),
    },
    {
      id: `${prefix}_jobseeking`,
      category,
      label: `${parentLabel}の求職の状況は？`,
      helpText: '就労先決定の場合は労働と同じ指数を準用します',
      inputType: 'radio',
      options: jobseekingOptions(prefix),
    },
    {
      id: `${prefix}_school`,
      category,
      label: `${parentLabel}の就学の状況は？`,
      inputType: 'radio',
      options: schoolOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// 別表第2 調整指数（別表第1の注記「ひとり親家庭は母又は父の指数＋10」を含む）
const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent_base',
    category: 'adjustment',
    label: 'ひとり親家庭ですか？（基本指数への加点）',
    helpText: '別表第1の注記「※ひとり親家庭の場合は、母又は父の指数＋10」の加点です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_base_0', points: 0 },
      { label: 'はい（+10）', value: 'adj_single_parent_base_1', points: 10 },
    ],
  },
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親世帯ですか？（調整指数の加点）',
    helpText: '別表第2の1の加点です。上の基本指数への+10とは別に加算されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_0', points: 0 },
      { label: 'はい（+5）', value: 'adj_single_parent_1', points: 5 },
    ],
  },
  {
    id: 'adj_tanshin',
    category: 'adjustment',
    label: '単身赴任・海外勤務ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_tanshin_0', points: 0 },
      { label: 'はい（+3）', value: 'adj_tanshin_1', points: 3 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_0', points: 0 },
      { label: 'はい（+2）', value: 'adj_welfare_1', points: 2 },
    ],
  },
  {
    id: 'adj_chiikigata',
    category: 'adjustment',
    label: '地域型保育事業の卒園児が引き続き保育所等への入所を希望しますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_chiikigata_0', points: 0 },
      { label: 'はい（+4）', value: 'adj_chiikigata_1', points: 4 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: '兄弟姉妹についてあてはまるものは？',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_sibling_0', points: 0 },
      { label: '兄弟姉妹（卒園児を除く）が既に入所している保育所等を希望する（+2）', value: 'adj_sibling_1', points: 2 },
      { label: '兄弟姉妹（双子等を含む）が同時に同一保育所等を希望する（+1）', value: 'adj_sibling_2', points: 1 },
    ],
  },
  {
    id: 'adj_hoikushi',
    category: 'adjustment',
    label: '保護者が町内の認可保育施設等に保育士として勤務している、又は勤務が内定していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_hoikushi_0', points: 0 },
      { label: 'はい（+2）', value: 'adj_hoikushi_1', points: 2 },
    ],
  },
  {
    id: 'adj_child_disability',
    category: 'adjustment',
    label: '対象児童が障がいを有しますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_child_disability_0', points: 0 },
      { label: 'はい（+2）', value: 'adj_child_disability_1', points: 2 },
    ],
  },
  {
    id: 'adj_ninkagai',
    category: 'adjustment',
    label: '企業主導型・認可外保育所等を1箇月以上継続利用しながら就労しており、保育所等に入園できるまで引き続き利用する予定がありますか？',
    helpText: '就労予定も含みます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_ninkagai_0', points: 0 },
      { label: 'はい（+2）', value: 'adj_ninkagai_1', points: 2 },
    ],
  },
  {
    id: 'adj_grandparent',
    category: 'adjustment',
    label: '同居の65歳未満の祖父母がいますか？',
    inputType: 'radio',
    options: [
      { label: 'いない', value: 'adj_grandparent_0', points: 0 },
      { label: 'いる（就労又は疾病等）（0）', value: 'adj_grandparent_1', points: 0 },
      { label: 'いる（未就労）（−2）', value: 'adj_grandparent_2', points: -2 },
    ],
  },
  {
    id: 'adj_fee_delinquent',
    category: 'adjustment',
    label: '保育料の滞納がありますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_fee_delinquent_0', points: 0 },
      { label: 'はい（−4）', value: 'adj_fee_delinquent_1', points: -4 },
    ],
  },
];

export const koryoData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
