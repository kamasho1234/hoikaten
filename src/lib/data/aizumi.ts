import type { MunicipalityData, Question } from '../types';

// -------------------------------------------------------------------------
// 藍住町 保育園入園 利用調整基準データ
// 出典: 藍住町「【令和8年度】保育所利用調整基準」
// https://www.town.aizumi.lg.jp/docs/2025091200014/file_contents/kijun.pdf
// -------------------------------------------------------------------------
// 藍住町が公表しているのは**基本点数の表だけ**で、調整点数の表は無い。
// 父母それぞれの点数を合わせる方法も書かれていないため、
// 全国で最も多い形（父母それぞれの点数を合算）に合わせて scoringMethod は 'sum' とした。
// 基本点数の最大は1人あたり110点。
//
// 備考1「父母が複数の事由に該当する場合は、各々について基本点数の高い方の事由を採用する」
// により、事由ごとの設問は1つだけ選ぶ形にしている。
//
// 備考2「ひとり親世帯については、当該ひとり親の点数と100点との合算を基本点数とします」
// は、ひとり親のときだけ100点を足すという意味なので、調整の設問として持たせている。
// ひとり親の方は保護者1だけに答えれば、その1人分の点数に100点が足される。
//
// 原典で数値を出していない項目（※、児童・世帯の状況に応じて別途判断）は
// 選択肢にしていない。
// - 「虐待・DVにより、特に保育が必要と認める状態にある場合」
// - 「以上の保育が必要な事由に類するものとして町長が認める状態にある場合」
// -------------------------------------------------------------------------

const municipality = {
  id: 'aizumi',
  name: '藍住町',
  slug: 'aizumi',
  prefecture: '徳島県',
  maxBasePoints: 110,
  scoringMethod: 'sum',
} as const;

// ①就労
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月180時間以上の仕事に従事している', value: `${prefix}_employment_0`, points: 110 },
  { label: '月170時間以上180時間未満', value: `${prefix}_employment_1`, points: 105 },
  { label: '月160時間以上170時間未満', value: `${prefix}_employment_2`, points: 100 },
  { label: '月150時間以上160時間未満', value: `${prefix}_employment_3`, points: 95 },
  { label: '月140時間以上150時間未満', value: `${prefix}_employment_4`, points: 90 },
  { label: '月130時間以上140時間未満', value: `${prefix}_employment_5`, points: 85 },
  { label: '月120時間以上130時間未満', value: `${prefix}_employment_6`, points: 80 },
  { label: '月110時間以上120時間未満', value: `${prefix}_employment_7`, points: 75 },
  { label: '月100時間以上110時間未満', value: `${prefix}_employment_8`, points: 70 },
  { label: '月90時間以上100時間未満', value: `${prefix}_employment_9`, points: 65 },
  { label: '月80時間以上90時間未満', value: `${prefix}_employment_10`, points: 60 },
  { label: '月64時間以上80時間未満', value: `${prefix}_employment_11`, points: 55 },
];

// ②妊娠・出産
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '母が出産または出産予定日の前後2か月の期間（双子以上は前3か月後2か月）', value: `${prefix}_childbirth_0`, points: 60 },
];

// ③保護者の疾病・障がい
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院または入院に相当する治療や安静を要する自宅療養で常に病臥している', value: `${prefix}_illness_0`, points: 100 },
  { label: '身体障害者手帳1〜2級／精神障害者保健福祉手帳1〜2級／療育手帳Aで、保育が常時困難', value: `${prefix}_illness_1`, points: 100 },
  { label: '身体障害者手帳3〜4級／療育手帳B1で、保育が著しく困難', value: `${prefix}_illness_2`, points: 80 },
  { label: '通院加療を行い、常に安静を要するなど、保育が常時困難', value: `${prefix}_illness_3`, points: 70 },
  { label: '身体障害者手帳／精神障害者保健福祉手帳3級／療育手帳の交付を受けていて、保育が困難', value: `${prefix}_illness_4`, points: 60 },
  { label: '疾病などにより、保育に支障がある', value: `${prefix}_illness_5`, points: 50 },
];

// ④親族の介護・看護
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '臥床者・重症心身障がい児（者）の介護・看護や付き添いのため、20日以上かつ週40時間以上保育が常時困難', value: `${prefix}_care_0`, points: 90 },
  { label: '病人や障がい者の介護・看護や付き添いのため、月20日以上かつ週30時間以上保育が困難', value: `${prefix}_care_1`, points: 80 },
  { label: '病人や障がい者の介護・看護や付き添いのため、月16日以上かつ週24時間以上保育が困難', value: `${prefix}_care_2`, points: 70 },
  { label: '病人や障がい者の介護・看護や付き添いのため、月16日以上かつ週16時間以上保育が困難', value: `${prefix}_care_3`, points: 60 },
  { label: '病人や障がい者の介護・看護や付き添いのため、月64時間以上保育が困難（上記に該当しない）', value: `${prefix}_care_4`, points: 50 },
];

// ⑤災害復旧
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '震災・風水害・火災その他の災害により自宅や近隣の復旧に当たっている', value: `${prefix}_disaster_0`, points: 100 },
];

// ⑥求職活動
const jobseekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '就労時間が月160時間以上の仕事に内定している', value: `${prefix}_jobseeking_0`, points: 70 },
  { label: '就労時間が月120時間以上160時間未満の仕事に内定している', value: `${prefix}_jobseeking_1`, points: 60 },
  { label: '就労時間が月96時間以上120時間未満の仕事に内定している', value: `${prefix}_jobseeking_2`, points: 50 },
  { label: '就労時間が月64時間以上96時間未満の仕事に内定している', value: `${prefix}_jobseeking_3`, points: 40 },
  { label: '上記以外で、求職中である', value: `${prefix}_jobseeking_4`, points: 30 },
];

// ⑦就学
const schoolOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_school_none`, points: 0 },
  { label: '職業訓練校・専門学校・大学等に月120時間以上就学している', value: `${prefix}_school_0`, points: 80 },
  { label: '職業訓練校・専門学校・大学等に月64時間以上就学している', value: `${prefix}_school_1`, points: 60 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: '複数の事由に該当する場合は、基本点数の高い方の事由を採用します',
    inputType: 'select',
    options: [
      { label: '就労', value: `${prefix}_reason_employment`, points: 0 },
      { label: '妊娠・出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '保護者の疾病・障がい', value: `${prefix}_reason_illness`, points: 0 },
      { label: '親族の介護・看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '災害復旧', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '求職活動', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '就学', value: `${prefix}_reason_school`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の就労の状況は？`,
      helpText: '就労時間数は休憩時間を含む労働契約上の正規の時間です',
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
      inputType: 'radio',
      options: careOptions(prefix),
    },
    {
      id: `${prefix}_disaster`,
      category,
      label: `${parentLabel}は災害復旧に当たっていますか？`,
      inputType: 'radio',
      options: disasterOptions(prefix),
    },
    {
      id: `${prefix}_jobseeking`,
      category,
      label: `${parentLabel}の求職活動の状況は？`,
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

// 藍住町が公表しているのは基本点数の表だけ。
// 備考2のひとり親の扱いだけを、加点として持たせている。
const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親世帯ですか？',
    helpText: '原典の備考2「ひとり親世帯については、当該ひとり親の点数と100点との合算を基本点数とします」によります',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_0', points: 0 },
      { label: 'はい（+100）', value: 'adj_single_parent_1', points: 100 },
    ],
  },
];

export const aizumiData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
