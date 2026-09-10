import type { MunicipalityData, Question } from '../types';

// -------------------------------------------------------------------------
// 香春町 保育園入園 利用調整基準データ
// 出典: 香春町「令和8年度利用調整基準表」
// https://www.town.kawara.fukuoka.jp/s026/010/010/020/080/riyoucyouseikijyunnhyou8.pdf
// -------------------------------------------------------------------------
// 香春町は原典に手順が書かれている。
//   【優先順位の決定方法】
//   「『1 基本点数』に『2 調整点数』を加えたものを利用調整における点数とし、
//    優先順位が高いものとする。」
//   1 基本点数
//   「『基本点数』は、父母それぞれの該当する点数の合計とする。
//    複数の類型に該当する場合は、高い方をそれぞれの点数とする。」
// 父母それぞれの点数の合計なので scoringMethod は 'sum'。
// maxBasePoints は「父母ともフルタイムで働いた場合の世帯合計」なので、
// 居宅外労働の満点（1人あたり120点）×2 = 240点。DVの200点は例外的な行なので使わない。
//
// 「妊娠、出産」は父の欄が斜線なので、母のみの区分である。
//
// 調整点数の注記
//   「『保育士』『保護者の障害』『求職活動』『その他』の類型のみ、
//    該当があれば父母それぞれ加点(減点)する。」
//   → その3つは「何人が該当するか」で点数が変わる設問にしている。
//
// 原典で点数の代わりに「※」（町長が必要と認めた場合、別途点数を設定する）と
// 書かれている項目は入れていない。
// - 基本点数「その他に前各号に類するもの（町長が保育を必要と認める場合）」
// - 調整点数「その他（町長が必要と認める場合）」
//
// 調整点数「きょうだい児が異なる保育所等に在籍しているため、いずれかに転園させる場合」
// （+100）は転園の話なので入れていない。
// -------------------------------------------------------------------------

const municipality = {
  id: 'kawara',
  name: '香春町',
  slug: 'kawara',
  prefecture: '福岡県',
  maxBasePoints: 240, // 父母各120点の合計
  scoringMethod: 'sum',
} as const;

// 居宅外労働 ／ 居宅内労働
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '居宅外労働：月の労働時間が160時間以上', value: `${prefix}_employment_0`, points: 120 },
  { label: '居宅内労働：月の労働時間が160時間以上', value: `${prefix}_employment_1`, points: 110 },
  { label: '居宅外労働：月の労働時間が120時間以上160時間未満', value: `${prefix}_employment_2`, points: 100 },
  { label: '居宅内労働：月の労働時間が120時間以上160時間未満', value: `${prefix}_employment_3`, points: 90 },
  { label: '居宅外労働：月の勤務時間が80時間以上120時間未満', value: `${prefix}_employment_4`, points: 80 },
  { label: '居宅内労働：月の勤務時間が80時間以上120時間未満', value: `${prefix}_employment_5`, points: 70 },
  { label: '居宅外労働：月の勤務時間が80時間未満', value: `${prefix}_employment_6`, points: 60 },
  { label: '居宅内労働：月の勤務時間が80時間未満', value: `${prefix}_employment_7`, points: 50 },
];

// 妊娠、出産（母のみ）
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産前後8週間', value: `${prefix}_childbirth_0`, points: 80 },
];

// 疾病、負傷 ／ 精神又は身体の障害
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '疾病、負傷：入院加療又は居宅内常時臥床の状態', value: `${prefix}_illness_0`, points: 100 },
  { label: '障害：身体障害者手帳3級以上、療育手帳B1判定以上、精神保健福祉手帳2級以上', value: `${prefix}_illness_1`, points: 90 },
  { label: '疾病、負傷：居宅内療養', value: `${prefix}_illness_2`, points: 60 },
  { label: '障害：上記の等級未満の障害者手帳所持者', value: `${prefix}_illness_3`, points: 50 },
];

// 同居親族の介護、看護
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '常時介護、看護している場合（入院加療又は居宅内常時臥床の状態）', value: `${prefix}_care_0`, points: 70 },
  { label: '上記以外の場合', value: `${prefix}_care_1`, points: 40 },
];

// 災害復旧
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '震災、風水害、その他の災害の復旧に当たっている場合', value: `${prefix}_disaster_0`, points: 100 },
];

// 求職活動
const jobseekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動のため日中保育にあたることができない場合', value: `${prefix}_jobseeking_0`, points: 30 },
];

// 就学等
const schoolOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_school_none`, points: 0 },
  { label: '就学又は職業訓練校等で訓練にあたっている場合', value: `${prefix}_school_0`, points: 70 },
];

// DV
const dvOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_dv_none`, points: 0 },
  { label: '児童虐待又は配偶者からの暴力により養護が必要な場合', value: `${prefix}_dv_0`, points: 200 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: '基本点数は父母それぞれの該当する点数の合計です',
    inputType: 'select',
    options: [
      { label: '労働（居宅外・居宅内）', value: `${prefix}_reason_employment`, points: 0 },
      { label: '妊娠、出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '疾病、負傷・障害', value: `${prefix}_reason_illness`, points: 0 },
      { label: '同居親族の介護、看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '災害復旧', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '求職活動', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '就学等', value: `${prefix}_reason_school`, points: 0 },
      { label: 'DV', value: `${prefix}_reason_dv`, points: 0 },
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
      label: `${parentLabel}の妊娠、出産の状況は？`,
      helpText: '原典では母のみに点数が付く区分です',
      inputType: 'radio',
      options: childbirthOptions(prefix),
    },
    {
      id: `${prefix}_illness`,
      category,
      label: `${parentLabel}の疾病、負傷・障害の状況は？`,
      inputType: 'radio',
      options: illnessOptions(prefix),
    },
    {
      id: `${prefix}_care`,
      category,
      label: `${parentLabel}の同居親族の介護、看護の状況は？`,
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
      label: `${parentLabel}は就学又は職業訓練校等で訓練にあたっていますか？`,
      inputType: 'radio',
      options: schoolOptions(prefix),
    },
    {
      id: `${prefix}_dv`,
      category,
      label: `${parentLabel}の世帯に児童虐待又は配偶者からの暴力がありますか？`,
      inputType: 'radio',
      options: dvOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// 2 調整点数
const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親世帯（母子家庭又は父子家庭の状態）ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_0', points: 0 },
      { label: 'はい（+100）', value: 'adj_single_parent_1', points: 100 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯で、就労による自立支援につながると判断されますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_0', points: 0 },
      { label: 'はい（+30）', value: 'adj_welfare_1', points: 30 },
    ],
  },
  {
    id: 'adj_absent',
    category: 'adjustment',
    label: '単身赴任、海外赴任等により保護者の一方が不在ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_absent_0', points: 0 },
      { label: 'はい（+10）', value: 'adj_absent_1', points: 10 },
    ],
  },
  {
    id: 'adj_return_or_sibling',
    category: 'adjustment',
    label: '育児休業復帰・きょうだい児についてあてはまるものは？',
    helpText: '原典では「育児休業復帰」と「きょうだい児」は併用できません',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_return_or_sibling_0', points: 0 },
      { label: '育児休業復帰：休業開始により退所した児童で再度入所を希望する（+30）', value: 'adj_return_or_sibling_1', points: 30 },
      { label: '育児休業復帰：上記以外で休業復帰に伴い保育所等の利用を希望する（+20）', value: 'adj_return_or_sibling_2', points: 20 },
      { label: 'きょうだい児：既にきょうだい児が在籍している保育所等を希望する（+10）', value: 'adj_return_or_sibling_3', points: 10 },
      { label: 'きょうだい児：きょうだい児で新たに同一の保育所等の利用を希望する（+10）', value: 'adj_return_or_sibling_4', points: 10 },
    ],
  },
  {
    id: 'adj_many_children',
    category: 'adjustment',
    label: '利用申込児童以外に保護者が養育する小学生以下の児童は何人いますか？',
    helpText: '1人につき5点が加算されます',
    inputType: 'select',
    options: [
      { label: 'いない', value: 'adj_many_children_0', points: 0 },
      { label: '1人（+5）', value: 'adj_many_children_1', points: 5 },
      { label: '2人（+10）', value: 'adj_many_children_2', points: 10 },
      { label: '3人（+15）', value: 'adj_many_children_3', points: 15 },
      { label: '4人以上（+20）', value: 'adj_many_children_4', points: 20 },
    ],
  },
  {
    id: 'adj_reentry',
    category: 'adjustment',
    label: '入院等のやむを得ない理由により退所した児童が再度入所を希望しますか？',
    helpText: '育児休業開始、家庭保育可能等の理由は除きます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_reentry_0', points: 0 },
      { label: 'はい（+100）', value: 'adj_reentry_1', points: 100 },
    ],
  },
  {
    id: 'adj_hoikushi',
    category: 'adjustment',
    label: '保育士として保育所等で就労する保護者は何人いますか？',
    helpText: '原典では父母それぞれに加点されます',
    inputType: 'select',
    options: [
      { label: 'いない', value: 'adj_hoikushi_0', points: 0 },
      { label: '1人（+10）', value: 'adj_hoikushi_1', points: 10 },
      { label: '2人（+20）', value: 'adj_hoikushi_2', points: 20 },
    ],
  },
  {
    id: 'adj_parent_disability',
    category: 'adjustment',
    label: '保護者の障害についてあてはまるものは？',
    helpText: '基本点数が当該類型以外の場合に限ります。原典では父母それぞれに加点されます',
    inputType: 'select',
    options: [
      { label: 'あてはまらない', value: 'adj_parent_disability_0', points: 0 },
      { label: '身体障害者手帳3級以上、療育手帳B1判定以上、精神保健福祉手帳2級以上：1人（+20）', value: 'adj_parent_disability_1', points: 20 },
      { label: '身体障害者手帳3級以上、療育手帳B1判定以上、精神保健福祉手帳2級以上：2人（+40）', value: 'adj_parent_disability_2', points: 40 },
      { label: '上記の等級未満の障害者手帳所持者：1人（+10）', value: 'adj_parent_disability_3', points: 10 },
      { label: '上記の等級未満の障害者手帳所持者：2人（+20）', value: 'adj_parent_disability_4', points: 20 },
    ],
  },
  {
    id: 'adj_family_care',
    category: 'adjustment',
    label: '同居親族の介護、看護についてあてはまるものは？',
    helpText: '基本点数が当該類型以外の場合に限ります',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_family_care_0', points: 0 },
      { label: '常時介護、看護している場合（入院加療又は居宅内常時臥床の状態）（+20）', value: 'adj_family_care_1', points: 20 },
      { label: '上記以外の場合（+10）', value: 'adj_family_care_2', points: 10 },
    ],
  },
  {
    id: 'adj_child_disability',
    category: 'adjustment',
    label: '利用申込をしている児童が障害を有しますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_child_disability_0', points: 0 },
      { label: 'はい（+20）', value: 'adj_child_disability_1', points: 20 },
    ],
  },
  {
    id: 'adj_grandparent',
    category: 'adjustment',
    label: '同居している祖父母が65歳未満であり、保育可能ですか？',
    helpText: '世帯分離している場合も同居とみなします',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_grandparent_0', points: 0 },
      { label: 'はい（−10）', value: 'adj_grandparent_1', points: -10 },
    ],
  },
  {
    id: 'adj_jobseeking_continue',
    category: 'adjustment',
    label: '求職活動による支給認定を継続更新している、又は出産から求職活動に変更した保護者は何人いますか？',
    helpText: '原典では父母それぞれに減点されます',
    inputType: 'select',
    options: [
      { label: 'いない', value: 'adj_jobseeking_continue_0', points: 0 },
      { label: '1人（−30）', value: 'adj_jobseeking_continue_1', points: -30 },
      { label: '2人（−60）', value: 'adj_jobseeking_continue_2', points: -60 },
    ],
  },
];

export const kawaraData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
