import type { MunicipalityData, Question } from '../types';

// -------------------------------------------------------------------------
// 邑楽町 保育園入園 利用調整基準データ
// 出典: 邑楽町「（資料1）邑楽町保育利用調整基準指数」（子ども支援課）
// http://www.town.ora.gunma.jp/s026/download/030/30nenndokizyunnsisuu.pdf
// -------------------------------------------------------------------------
// 邑楽町は表の冒頭に手順が書かれている。
//   「管内保育所及び管内認定こども園の入所調整において、申込み者数が
//    利用定員を超えた場合は、以下の指数に基づき、児童保育審議会で
//    審議を行い利用調整することとする。」
// 原典は父母の合わせ方を書いていないため、
// 全国で最も多い形（父母それぞれの指数を合算）に合わせて scoringMethod は 'sum' とした。
// 基本指数の最大は1人あたり10点。
//
// このPDFは資料そのものに年度の記載がない（ファイル名だけ古い）。
// 町の入所申請ページから現在もリンクされているものを使っている。
//
// 原典で指数が言葉・幅でしか書かれていない項目は入れていない。
// - 基本指数⑩「その他、上記に類する状態として市町村が認める場合」（事由による）
// - 調整基準⑫「その他上記に類する状態として市町村が認める場合」（+1〜+3）
// - 調整基準（減算）「その他上記に類する状態として市町村が認める場合」（−1〜−3）
//
// いま園を利用している方の話は入れていない。
// - 基本指数⑨「育児休業取得時に、既に保育を利用している子どもがいて継続利用が必要であること」（3点）
// - 調整基準⑪「町立認定こども園で1号認定から2号認定へ区分変更する場合
//   （同一施設内での変更に限る）」（+3）
// -------------------------------------------------------------------------

const municipality = {
  id: 'ora',
  name: '邑楽町',
  slug: 'ora',
  prefecture: '群馬県',
  maxBasePoints: 20, // 父母各10点の合計
  scoringMethod: 'sum',
} as const;

// ①就労（居宅外労働・居宅内労働）
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '居宅外：事業所に通常勤務している正社員', value: `${prefix}_employment_0`, points: 10 },
  { label: '居宅外（パート・アルバイト／非常勤・臨時職員／派遣社員）：8時間超', value: `${prefix}_employment_1`, points: 9 },
  { label: '居宅外（自営業・事業主）：8時間超', value: `${prefix}_employment_2`, points: 9 },
  { label: '居宅外（パート・アルバイト／非常勤・臨時職員／派遣社員）：8時間以内', value: `${prefix}_employment_3`, points: 8 },
  { label: '居宅外（自営業・事業主）：8時間以内', value: `${prefix}_employment_4`, points: 8 },
  { label: '居宅外（自営業・専従者）：8時間超', value: `${prefix}_employment_5`, points: 8 },
  { label: '居宅内（自営業・事業主）：8時間超', value: `${prefix}_employment_6`, points: 8 },
  { label: '居宅外（パート・アルバイト／非常勤・臨時職員／派遣社員）：7時間以内', value: `${prefix}_employment_7`, points: 7 },
  { label: '居宅外（自営業・事業主）：7時間以内', value: `${prefix}_employment_8`, points: 7 },
  { label: '居宅外（自営業・専従者）：8時間以内', value: `${prefix}_employment_9`, points: 7 },
  { label: '居宅内（自営業・事業主）：8時間以内', value: `${prefix}_employment_10`, points: 7 },
  { label: '居宅内（自営業・専従者）：8時間超', value: `${prefix}_employment_11`, points: 7 },
  { label: '居宅外（パート・アルバイト／非常勤・臨時職員／派遣社員）：6時間以内', value: `${prefix}_employment_12`, points: 6 },
  { label: '居宅外（自営業・事業主）：6時間以内', value: `${prefix}_employment_13`, points: 6 },
  { label: '居宅外（自営業・専従者）：7時間以内', value: `${prefix}_employment_14`, points: 6 },
  { label: '居宅内（自営業・事業主）：7時間以内', value: `${prefix}_employment_15`, points: 6 },
  { label: '居宅内（自営業・専従者）：8時間以内', value: `${prefix}_employment_16`, points: 6 },
  { label: '居宅外（パート・アルバイト／非常勤・臨時職員／派遣社員）：5時間以内', value: `${prefix}_employment_17`, points: 5 },
  { label: '居宅外（自営業・事業主）：5時間以内', value: `${prefix}_employment_18`, points: 5 },
  { label: '居宅外（自営業・専従者）：6時間以内', value: `${prefix}_employment_19`, points: 5 },
  { label: '居宅内（自営業・事業主）：6時間以内', value: `${prefix}_employment_20`, points: 5 },
  { label: '居宅内（自営業・専従者）：7時間以内', value: `${prefix}_employment_21`, points: 5 },
  { label: '居宅外（パート・アルバイト／非常勤・臨時職員／派遣社員）：4時間以内', value: `${prefix}_employment_22`, points: 4 },
  { label: '居宅外（自営業・専従者）：5時間以内', value: `${prefix}_employment_23`, points: 4 },
  { label: '居宅内（自営業・事業主）：5時間以内', value: `${prefix}_employment_24`, points: 4 },
  { label: '居宅内（自営業・専従者）：6時間以内', value: `${prefix}_employment_25`, points: 4 },
  { label: '居宅外（自営業・専従者）：4時間以内', value: `${prefix}_employment_26`, points: 3 },
  { label: '居宅内（自営業・事業主）：4時間以内', value: `${prefix}_employment_27`, points: 3 },
  { label: '居宅内（自営業・専従者）：5時間以内', value: `${prefix}_employment_28`, points: 3 },
  { label: '居宅内（自営業・専従者）：4時間以内', value: `${prefix}_employment_29`, points: 2 },
];

// ②妊娠、出産
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: 'おおむね出産前2ヶ月、出産後2ヶ月の期間', value: `${prefix}_childbirth_0`, points: 9 },
];

// ③保護者の疾病、障害
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院：疾病のため入院', value: `${prefix}_illness_0`, points: 10 },
  { label: '居宅内療養（常時臥床）：疾病のため常時臥床', value: `${prefix}_illness_1`, points: 10 },
  { label: '心身障害者：身体障害者手帳1級を所持する者、及び同程度と判断できるもの', value: `${prefix}_illness_2`, points: 10 },
  { label: '心身障害者：身体障害者手帳2級を所持する者、及び同程度と判断できるもの', value: `${prefix}_illness_3`, points: 9 },
  { label: '居宅内療養（精神結核）：医師が長期加療（安静）を要すると診断', value: `${prefix}_illness_4`, points: 8 },
  { label: '心身障害者：身体障害者手帳3級を所持する者、及び同程度と判断できるもの', value: `${prefix}_illness_5`, points: 7 },
  { label: '居宅内療養（一般療養）：概ね1ヶ月以上加療を要すると診断', value: `${prefix}_illness_6`, points: 6 },
  { label: '心身障害者：身体障害者手帳4級以下を所持する者、及び同程度と判断できるもの', value: `${prefix}_illness_7`, points: 4 },
  { label: '居宅内療養（その他）：疾病により定期的通院等を要す', value: `${prefix}_illness_8`, points: 3 },
];

// ④同居親族の介護・看護
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '入院付添：親族の入院付添', value: `${prefix}_care_0`, points: 10 },
  { label: '心身障害者：介護', value: `${prefix}_care_1`, points: 10 },
  { label: '老人の介護：ねたきり老人・重度の痴呆性老人を常時介護', value: `${prefix}_care_2`, points: 10 },
  { label: '居宅内看護：同居の家族の長期居宅療養等介護', value: `${prefix}_care_3`, points: 6 },
  { label: '心身障害者：通園、通院、通学等', value: `${prefix}_care_4`, points: 6 },
  { label: 'その他：その他疾病等による親族の介護', value: `${prefix}_care_5`, points: 3 },
];

// ⑤災害復旧
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '火災、風水害等で家屋が失われ復旧にあたる', value: `${prefix}_disaster_0`, points: 10 },
];

// ⑥求職活動
const jobseekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: 'ハローワークへの登録、面接等。起業準備を含む（認定期間は90日以内）', value: `${prefix}_jobseeking_0`, points: 3 },
];

// ⑦就学
const schoolOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_school_none`, points: 0 },
  { label: '就学。職業訓練校等における職業訓練を含む（認定期間は在学・訓練期間内）', value: `${prefix}_school_0`, points: 3 },
];

// ⑧虐待やDV
const dvOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_dv_none`, points: 0 },
  { label: '虐待やDVのおそれがあること', value: `${prefix}_dv_0`, points: 10 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    inputType: 'select',
    options: [
      { label: '就労', value: `${prefix}_reason_employment`, points: 0 },
      { label: '妊娠、出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '保護者の疾病、障害', value: `${prefix}_reason_illness`, points: 0 },
      { label: '同居親族の介護・看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '災害復旧', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '求職活動', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '就学', value: `${prefix}_reason_school`, points: 0 },
      { label: '虐待やDV', value: `${prefix}_reason_dv`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の就労の状況は？`,
      inputType: 'radio',
      options: employmentOptions(prefix),
    },
    {
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}の妊娠、出産の状況は？`,
      inputType: 'radio',
      options: childbirthOptions(prefix),
    },
    {
      id: `${prefix}_illness`,
      category,
      label: `${parentLabel}の疾病、障害の状況は？`,
      inputType: 'radio',
      options: illnessOptions(prefix),
    },
    {
      id: `${prefix}_care`,
      category,
      label: `${parentLabel}の同居親族の介護・看護の状況は？`,
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
      id: `${prefix}_jobseeking`,
      category,
      label: `${parentLabel}は求職活動をしていますか？`,
      inputType: 'radio',
      options: jobseekingOptions(prefix),
    },
    {
      id: `${prefix}_school`,
      category,
      label: `${parentLabel}は就学していますか？`,
      inputType: 'radio',
      options: schoolOptions(prefix),
    },
    {
      id: `${prefix}_dv`,
      category,
      label: `${parentLabel}の世帯に虐待やDVのおそれがありますか？`,
      inputType: 'radio',
      options: dvOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// 調整基準
const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親家庭ですか？',
    helpText: '父母の死亡、離別、行方不明、拘禁が対象です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_0', points: 0 },
      { label: 'はい（+5）', value: 'adj_single_parent_1', points: 5 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護法による被保護世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_0', points: 0 },
      { label: 'はい（+5）', value: 'adj_welfare_1', points: 5 },
    ],
  },
  {
    id: 'adj_unemployed',
    category: 'adjustment',
    label: '生計中心者の失業により、就労の必要性が高いですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unemployed_0', points: 0 },
      { label: 'はい（+3）', value: 'adj_unemployed_1', points: 3 },
    ],
  },
  {
    id: 'adj_dv',
    category: 'adjustment',
    label: '虐待やDVのおそれがある場合など、社会的養護が必要ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_dv_0', points: 0 },
      { label: 'はい（+5）', value: 'adj_dv_1', points: 5 },
    ],
  },
  {
    id: 'adj_parent_disability',
    category: 'adjustment',
    label: '保護者が身体障害者の1・2級に該当する家庭ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_parent_disability_0', points: 0 },
      { label: 'はい（+5）', value: 'adj_parent_disability_1', points: 5 },
    ],
  },
  {
    id: 'adj_child_disability',
    category: 'adjustment',
    label: '子どもが障害を有しますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_child_disability_0', points: 0 },
      { label: 'はい（+3）', value: 'adj_child_disability_1', points: 3 },
    ],
  },
  {
    id: 'adj_return_to_work',
    category: 'adjustment',
    label: '育児休業明けについてあてはまるものは？',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_return_to_work_0', points: 0 },
      { label: '育児休業取得前に特定教育・保育施設等を利用しており、施設等の利用を再度希望する（+3）', value: 'adj_return_to_work_1', points: 3 },
      { label: '育児休業取得前に認可外保育施設等を利用しており、特定教育・保育施設、地域型保育事業の利用を希望する（+3）', value: 'adj_return_to_work_2', points: 3 },
      { label: '育休を取得しており、復帰する（+3）', value: 'adj_return_to_work_3', points: 3 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: '兄弟姉妹が同一の特定教育・保育施設等の利用を希望しますか？',
    helpText: 'きょうだいが別々の施設へ入所となることを防ぐための措置です',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_sibling_0', points: 0 },
      { label: '兄・姉が既に在園していて、弟・妹が同一の特定教育・保育施設等の利用を希望する（+5）', value: 'adj_sibling_1', points: 5 },
      { label: 'きょうだいが同時に申込む場合において、同一の特定教育・保育施設等の利用を希望する（+5）', value: 'adj_sibling_2', points: 5 },
    ],
  },
  {
    id: 'adj_chiikigata',
    category: 'adjustment',
    label: '小規模保育事業など地域型保育事業の卒園児童ですか？',
    helpText: '連携施設に関する経過措置です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_chiikigata_0', points: 0 },
      { label: 'はい（+3）', value: 'adj_chiikigata_1', points: 3 },
    ],
  },
  {
    id: 'adj_hoikushi',
    category: 'adjustment',
    label: '保育士等として従事するために、特定教育・保育施設等の利用を希望しますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_hoikushi_0', points: 0 },
      { label: 'はい（+3）', value: 'adj_hoikushi_1', points: 3 },
    ],
  },
  {
    id: 'adj_work_days',
    category: 'adjustment',
    label: '平均就労日数は？',
    helpText: '平均就労日数の実態により減算されます',
    inputType: 'radio',
    options: [
      { label: '月20日以上', value: 'adj_work_days_0', points: 0 },
      { label: '月20日未満（−1）', value: 'adj_work_days_1', points: -1 },
      { label: '月15日未満（−2）', value: 'adj_work_days_2', points: -2 },
      { label: '月10日未満（−3）', value: 'adj_work_days_3', points: -3 },
    ],
  },
  {
    id: 'adj_grandparent',
    category: 'adjustment',
    label: '祖母等同居の親族その他の者がいますか？',
    helpText: '高齢その他のため充分に保育できないと主張している者を除きます（町において保育できると認めた場合）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_grandparent_0', points: 0 },
      { label: 'はい：65歳未満（−1）', value: 'adj_grandparent_1', points: -1 },
      { label: 'はい：60歳未満（−2）', value: 'adj_grandparent_2', points: -2 },
    ],
  },
];

export const oraData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
