import type { MunicipalityData, Question } from '../types';

// -------------------------------------------------------------------------
// 信濃町 保育園入園 利用調整基準データ
// 出典: 信濃町「信濃町保育施設等利用調整基準表」
// https://www.town.shinano.lg.jp/fs/7/9/6/8/0/1/_/_________HP___.pdf
// -------------------------------------------------------------------------
// 信濃町は資料の冒頭に手順が書かれている。
//   「保育所等の利用調整は、提出された書類により『1.基本点数』と『2.調整点数』により
//    世帯の点数を決定します。この『世帯の点数』が高い方より、入園を内定します。」
//   ①基本点数：父・母（保護者状況）の合計
//   「② 同一人に複数の項目に該当した場合、点数の高い項目で点数付けを行います。」
// 父と母の合計なので scoringMethod は 'sum'。基本点の最大は1人あたり10点。
//
// 「③ ひとり親世帯等については、当該ひとり親等の基本点数と10点との合算を
// 基本点数とします。」は基本点数への加点なので、調整の設問に入れている。
// 調整点数項目表の1「ひとり親世帯」（+5）とは別の加点である。
//
// 原典で点数が幅・言葉でしか書かれていない項目は入れていない。
// - 1 就労「就労先が内定（就労内容で判定）」（3〜10）
// - 基準外「虐待やDV、またはそのおそれのある場合」「死別・行方不明・拘禁などで
//   保護者が不存在の場合」「児童福祉の観点から、町長が特に保育の必要性が高いと
//   判断した場合」（いずれも「基本点によらず、最優先とするもの」）
// - 調整点数9「保育料の滞納」（滞納月×−1）計算式のため
//
// 7 就学は「※就労（会社等に雇用されている者・自営中心者）の基本点を準用」と
// 書かれているので、その刻みを使っている（原典の「4〜10」は準用した結果の幅）。
//
// 3 心身障害の最上位の行は、原典の枠内で「精神障害者保健福祉手帳」の等級が
// 切れている。同じ資料の「4 親族の介護・看護」が同じ組み合わせを
// 「身体障害者手帳1級・2級、療育手帳A・B、精神障害者保健福祉手帳1級・2級」と
// 書いているので、それに合わせている。
// -------------------------------------------------------------------------

const municipality = {
  id: 'shinano',
  name: '信濃町',
  slug: 'shinano',
  prefecture: '長野県',
  maxBasePoints: 20, // 父母各10点の合計
  scoringMethod: 'sum',
} as const;

// 1 就労
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '会社等に雇用・自営中心者（事業主）：月の就労時間が160時間以上', value: `${prefix}_employment_0`, points: 10 },
  { label: '会社等に雇用・自営中心者（事業主）：140時間以上160時間未満', value: `${prefix}_employment_1`, points: 9 },
  { label: '自営・農業（協力者）・内職：月の就労時間が160時間以上', value: `${prefix}_employment_2`, points: 9 },
  { label: '会社等に雇用・自営中心者（事業主）：120時間以上140時間未満', value: `${prefix}_employment_3`, points: 8 },
  { label: '自営・農業（協力者）・内職：140時間以上160時間未満', value: `${prefix}_employment_4`, points: 8 },
  { label: '会社等に雇用・自営中心者（事業主）：100時間以上120時間未満', value: `${prefix}_employment_5`, points: 7 },
  { label: '自営・農業（協力者）・内職：120時間以上140時間未満', value: `${prefix}_employment_6`, points: 7 },
  { label: '会社等に雇用・自営中心者（事業主）：80時間以上100時間未満', value: `${prefix}_employment_7`, points: 6 },
  { label: '自営・農業（協力者）・内職：100時間以上120時間未満', value: `${prefix}_employment_8`, points: 6 },
  { label: '会社等に雇用・自営中心者（事業主）：60時間以上80時間未満', value: `${prefix}_employment_9`, points: 5 },
  { label: '自営・農業（協力者）・内職：80時間以上100時間未満', value: `${prefix}_employment_10`, points: 5 },
  { label: '会社等に雇用・自営中心者（事業主）：48時間以上60時間未満', value: `${prefix}_employment_11`, points: 4 },
  { label: '自営・農業（協力者）・内職：60時間以上80時間未満', value: `${prefix}_employment_12`, points: 4 },
  { label: '自営・農業（協力者）・内職：48時間以上60時間未満', value: `${prefix}_employment_13`, points: 3 },
];

// 2 妊娠・出産
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産日又は出産予定日の前後8週間', value: `${prefix}_childbirth_0`, points: 9 },
];

// 3 保護者の疾病・障害
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院（1か月以上）', value: `${prefix}_illness_0`, points: 10 },
  { label: '自宅療養：常時臥床', value: `${prefix}_illness_1`, points: 10 },
  { label: '心身障害：身体障害者手帳1級・2級／療育手帳A・B／精神障害者保健福祉手帳1級・2級', value: `${prefix}_illness_2`, points: 10 },
  { label: '自宅療養：週1回以上の通院を伴う1か月以上の療養', value: `${prefix}_illness_3`, points: 7 },
  { label: '心身障害：身体障害者手帳3級／療育手帳C／精神障害者保健福祉手帳3級', value: `${prefix}_illness_4`, points: 7 },
  { label: '自宅療養：その他乳幼児保育不可能と認められる療養', value: `${prefix}_illness_5`, points: 5 },
  { label: '心身障害：身体障害者手帳4級以下所持', value: `${prefix}_illness_6`, points: 4 },
];

// 4 親族の介護・看護
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '在宅介護・看護：要介護5・4・3、身体障害者手帳1級・2級、療育手帳A・B、精神障害者保健福祉手帳1級・2級又は同程度と判断される親族の介護・看護', value: `${prefix}_care_0`, points: 10 },
  { label: '入院付添：親族の入院付添に1ヶ月以上あたっている者', value: `${prefix}_care_1`, points: 7 },
  { label: '在宅介護・看護：上記以外の介護・看護を必要とする親族の介護・看護', value: `${prefix}_care_2`, points: 5 },
];

// 5 災害復旧
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '災害等の復旧', value: `${prefix}_disaster_0`, points: 10 },
];

// 6 求職活動
const jobseekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動中又は起業準備中', value: `${prefix}_jobseeking_0`, points: 2 },
];

// 7 就学（就労の基本点を準用）
const schoolOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_school_none`, points: 0 },
  { label: '月の就学時間が160時間以上', value: `${prefix}_school_0`, points: 10 },
  { label: '140時間以上160時間未満', value: `${prefix}_school_1`, points: 9 },
  { label: '120時間以上140時間未満', value: `${prefix}_school_2`, points: 8 },
  { label: '100時間以上120時間未満', value: `${prefix}_school_3`, points: 7 },
  { label: '80時間以上100時間未満', value: `${prefix}_school_4`, points: 6 },
  { label: '60時間以上80時間未満', value: `${prefix}_school_5`, points: 5 },
  { label: '48時間以上60時間未満', value: `${prefix}_school_6`, points: 4 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: '基本点数は父・母（保護者状況）の合計です',
    inputType: 'select',
    options: [
      { label: '就労', value: `${prefix}_reason_employment`, points: 0 },
      { label: '妊娠・出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '保護者の疾病・障害', value: `${prefix}_reason_illness`, points: 0 },
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
      label: `${parentLabel}の疾病・障害の状況は？`,
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
      label: `${parentLabel}は災害等の復旧にあたっていますか？`,
      inputType: 'radio',
      options: disasterOptions(prefix),
    },
    {
      id: `${prefix}_jobseeking`,
      category,
      label: `${parentLabel}は求職活動中又は起業準備中ですか？`,
      inputType: 'radio',
      options: jobseekingOptions(prefix),
    },
    {
      id: `${prefix}_school`,
      category,
      label: `${parentLabel}の就学の状況は？`,
      helpText: '大学、専門学校、職業訓練校等への通学が対象で、就労の基本点を準用します',
      inputType: 'radio',
      options: schoolOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// 2. 調整点数項目表（基本点数表の注記③を含む）
const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent_base',
    category: 'adjustment',
    label: 'ひとり親世帯等ですか？（基本点数への加点）',
    helpText: '基本点数表の注記③「ひとり親世帯等については、当該ひとり親等の基本点数と10点との合算を基本点数とします」の加点です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_base_0', points: 0 },
      { label: 'はい（+10）', value: 'adj_single_parent_base_1', points: 10 },
    ],
  },
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親世帯ですか？（調整点数の加点）',
    helpText: '離婚、離婚調停中、未婚、死別、行方不明等。上の基本点数への+10とは別に加算されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_0', points: 0 },
      { label: 'はい（+5）', value: 'adj_single_parent_1', points: 5 },
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
    id: 'adj_unemployed',
    category: 'adjustment',
    label: '生計中心者の失業等により、就労の必要性が高いですか？',
    helpText: '生計中心者の自己都合以外の失業・長期休業を理由に当人が求職活動・新規就労をするために新規利用を希望する場合（失業・長期休業は、利用開始日の前1年以内の離職・長期休業に限る）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unemployed_0', points: 0 },
      { label: 'はい（+3）', value: 'adj_unemployed_1', points: 3 },
    ],
  },
  {
    id: 'adj_tanshin',
    category: 'adjustment',
    label: '父母の1人が単身赴任または海外勤務で不在ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_tanshin_0', points: 0 },
      { label: 'はい（+2）', value: 'adj_tanshin_1', points: 2 },
    ],
  },
  {
    id: 'adj_child_disability',
    category: 'adjustment',
    label: '利用希望児童が障害にかかる手帳の交付を受けていますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_child_disability_0', points: 0 },
      { label: 'はい（+2）', value: 'adj_child_disability_1', points: 2 },
    ],
  },
  {
    id: 'adj_return_to_work',
    category: 'adjustment',
    label: '育児休業終了により勤務に復帰しますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_return_to_work_0', points: 0 },
      { label: 'はい（+2）', value: 'adj_return_to_work_1', points: 2 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: '兄弟姉妹（多胎児を含む）が同一施設の利用を希望しますか？',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_sibling_0', points: 0 },
      { label: '兄弟姉妹がすでに利用している施設を希望する（+3）', value: 'adj_sibling_1', points: 3 },
      { label: '兄弟姉妹が同時に申込みをする（+2）', value: 'adj_sibling_2', points: 2 },
    ],
  },
  {
    id: 'adj_hoikushi',
    category: 'adjustment',
    label: '町内の保育施設で保育士、保育教諭として勤務している、又は勤務予定ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_hoikushi_0', points: 0 },
      { label: 'はい（+3）', value: 'adj_hoikushi_1', points: 3 },
    ],
  },
];

export const shinanoData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
