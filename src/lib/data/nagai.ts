import type { MunicipalityData, Question } from '../types';

// -------------------------------------------------------------------------
// 長井市 保育園入園 利用調整基準データ
// 出典: 長井市「保育所等利用調整基準表」
// https://www.city.nagai.yamagata.jp/material/files/group/12/33595download.pdf
// -------------------------------------------------------------------------
// 長井市は(1)利用基準指数の表が「父」「母」それぞれの列に指数を並べ、
// 下部の審査結果欄が「基準点数 − 調整指数 ＋ 調整指数 ＝ 合計点数」となっている。
// 原典は父母の合わせ方を書いていないため、
// 全国で最も多い形（父母それぞれの指数を合算）に合わせて scoringMethod は 'sum' とした。
// 利用基準指数の最大は1人あたり14点。
//
// 「妊娠・出産」は父の欄が斜線になっているため、母のみの区分である。
//
// 原典で数値を出していない項目は無い（12「その他市長が特別と認めた場合」も14点）。
//
// 別居祖父母の状況「65歳未満の別居の祖父母（置賜3市5町居住）が未就労」は
// 原典が「父方−1／母方−1」と父方・母方で分けて書いているため、
// 該当する人数で選ぶ形にしている。
//
// 「兄弟姉妹で別々の保育所に通園し、同じ保育所へ転園希望」（+2）は、
// いま園を利用している方が別の園に移る話なので入れていない。
// -------------------------------------------------------------------------

const municipality = {
  id: 'nagai',
  name: '長井市',
  slug: 'nagai',
  prefecture: '山形県',
  maxBasePoints: 14,
  scoringMethod: 'sum',
} as const;

// 1 居宅外労働 ／ 2 居宅内労働
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '居宅外（外勤・自営農業）：1日8時間以上または月160時間以上の就労を常態', value: `${prefix}_employment_0`, points: 14 },
  { label: '居宅外（外勤・自営農業）：1日7時間以上または月140時間以上160時間未満', value: `${prefix}_employment_1`, points: 12 },
  { label: '居宅外（外勤・自営農業）：1日6時間以上または月120時間以上140時間未満', value: `${prefix}_employment_2`, points: 10 },
  { label: '居宅外（外勤・自営農業）：1日5時間以上または月100時間以上120時間未満', value: `${prefix}_employment_3`, points: 8 },
  { label: '居宅外（外勤・自営農業）：1日4時間以上または月64時間以上100時間未満', value: `${prefix}_employment_4`, points: 6 },
  { label: '居宅内（自営）：1日8時間以上または月160時間以上の就労を常態', value: `${prefix}_employment_5`, points: 12 },
  { label: '居宅内（自営）：1日7時間以上または月140時間以上160時間未満', value: `${prefix}_employment_6`, points: 10 },
  { label: '居宅内（自営）：1日6時間以上または月120時間以上140時間未満', value: `${prefix}_employment_7`, points: 8 },
  { label: '居宅内（自営）：1日5時間以上または月100時間以上120時間未満', value: `${prefix}_employment_8`, points: 6 },
  { label: '居宅内（自営）：1日4時間以上または月64時間以上100時間未満', value: `${prefix}_employment_9`, points: 4 },
  { label: '居宅内（内職）：1日8時間以上または月160時間以上の就労を常態', value: `${prefix}_employment_10`, points: 6 },
  { label: '居宅内（内職）：1日6時間以上または月120時間以上140時間未満', value: `${prefix}_employment_11`, points: 5 },
  { label: '居宅内（内職）：1日4時間以上または月64時間以上100時間未満', value: `${prefix}_employment_12`, points: 4 },
];

// 3 妊娠・出産（母のみ）
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '産前8週・産後10週', value: `${prefix}_childbirth_0`, points: 10 },
];

// 4 疾病等・障がい
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院', value: `${prefix}_illness_0`, points: 14 },
  { label: '概ね1ヵ月以上常時臥床者', value: `${prefix}_illness_1`, points: 14 },
  { label: '身体障がい者手帳1・2級または療育手帳A', value: `${prefix}_illness_2`, points: 14 },
  { label: '医師が概ね1ヵ月以上加療（安静）を要すると診断した', value: `${prefix}_illness_3`, points: 10 },
  { label: '身体障がい者手帳3・4級または療育手帳B', value: `${prefix}_illness_4`, points: 6 },
  { label: '比較的軽症だが、定期的に通院等を要する', value: `${prefix}_illness_5`, points: 5 },
  { label: '身体障がい者手帳5・6級', value: `${prefix}_illness_6`, points: 4 },
];

// 5 介護・看護等
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '病院等付添', value: `${prefix}_care_0`, points: 10 },
  { label: '常時臥床で身辺自立の不可能な者を介護している', value: `${prefix}_care_1`, points: 10 },
  { label: '通院付添や身辺自立可能者の介護を1ヵ月以上行う', value: `${prefix}_care_2`, points: 4 },
];

// 6 災害復旧
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '災害復旧等に当たっている', value: `${prefix}_disaster_0`, points: 14 },
];

// 7 求職活動
const jobseekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動（起業準備を含む）を継続的に行っている', value: `${prefix}_jobseeking_0`, points: 3 },
];

// 8 就学
const schoolOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_school_none`, points: 0 },
  { label: '就学している', value: `${prefix}_school_0`, points: 6 },
];

// 9 虐待・DV ／ 11・12 特例
const abuseOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_abuse_none`, points: 0 },
  { label: '虐待やDV等、児童の保護が必要', value: `${prefix}_abuse_0`, points: 14 },
  { label: '保護者不在（離婚・死別・単身赴任等）', value: `${prefix}_abuse_1`, points: 14 },
  { label: 'その他市長が特別と認めた', value: `${prefix}_abuse_2`, points: 14 },
];

// 10 育休継続利用
const parentalLeaveOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_parental_leave_none`, points: 0 },
  { label: '育児休業取得時に、既に保育を利用している子どもがいて継続利用が必要', value: `${prefix}_parental_leave_0`, points: 6 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: '長井市は父・母それぞれに利用基準指数が付きます',
    inputType: 'select',
    options: [
      { label: '労働（居宅外・居宅内）', value: `${prefix}_reason_employment`, points: 0 },
      { label: '妊娠・出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '疾病等・障がい', value: `${prefix}_reason_illness`, points: 0 },
      { label: '介護・看護等', value: `${prefix}_reason_care`, points: 0 },
      { label: '災害復旧', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '求職活動', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '就学', value: `${prefix}_reason_school`, points: 0 },
      { label: '虐待・DV・保護者不在等', value: `${prefix}_reason_abuse`, points: 0 },
      { label: '育休継続利用', value: `${prefix}_reason_parental_leave`, points: 0 },
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
      label: `${parentLabel}の妊娠・出産の状況は？`,
      helpText: '原典では母のみに指数が付く区分です',
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
      label: `${parentLabel}の介護・看護の状況は？`,
      inputType: 'radio',
      options: careOptions(prefix),
    },
    {
      id: `${prefix}_disaster`,
      category,
      label: `${parentLabel}は災害復旧等に当たっていますか？`,
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
      id: `${prefix}_abuse`,
      category,
      label: `${parentLabel}：虐待・DV・保護者不在等がありますか？`,
      inputType: 'radio',
      options: abuseOptions(prefix),
    },
    {
      id: `${prefix}_parental_leave`,
      category,
      label: `${parentLabel}は育児休業中で継続利用が必要ですか？`,
      inputType: 'radio',
      options: parentalLeaveOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// (2) 家庭等の状況における調整指数
const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親ですか？',
    helpText: '世帯分離をしていても住所が同じ、もしくは敷地内別居である場合、同居とみなします',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_0', points: 0 },
      { label: 'ひとり親で同居親族がいない（+5）', value: 'adj_single_parent_1', points: 5 },
      { label: 'ひとり親で同居親族がいる（+3）', value: 'adj_single_parent_2', points: 3 },
    ],
  },
  {
    id: 'adj_grandfather',
    category: 'adjustment',
    label: '同居祖父の状況は？',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_grandfather_0', points: 0 },
      { label: '祖父が65歳未満で無職（障がい等の場合除く）（−3）', value: 'adj_grandfather_1', points: -3 },
      { label: '祖父が65歳未満で内職（−1）', value: 'adj_grandfather_2', points: -1 },
    ],
  },
  {
    id: 'adj_grandmother',
    category: 'adjustment',
    label: '同居祖母の状況は？',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_grandmother_0', points: 0 },
      { label: '祖母が65歳未満で無職（障がい等の場合除く）（−3）', value: 'adj_grandmother_1', points: -3 },
      { label: '祖母が65歳未満で内職（−1）', value: 'adj_grandmother_2', points: -1 },
    ],
  },
  {
    id: 'adj_separate_grandparent',
    category: 'adjustment',
    label: '別居祖父母の状況は？',
    helpText: '置賜3市5町に居住する65歳未満の別居の祖父母が未就労だと、父方・母方それぞれ−1です',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_separate_grandparent_0', points: 0 },
      { label: '父方・母方の祖父母が置賜地方（3市5町）以外に居住（不在含む）（+1）', value: 'adj_separate_grandparent_1', points: 1 },
      { label: '65歳未満の別居の祖父母が未就労（父方のみ、または母方のみ）（−1）', value: 'adj_separate_grandparent_2', points: -1 },
      { label: '65歳未満の別居の祖父母が未就労（父方・母方の両方）（−2）', value: 'adj_separate_grandparent_3', points: -2 },
    ],
  },
  {
    id: 'adj_other_relative',
    category: 'adjustment',
    label: 'その他同居親族の状況は？',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_other_relative_0', points: 0 },
      { label: 'その他同居親族が65歳未満で無職（−2）', value: 'adj_other_relative_1', points: -2 },
      { label: 'その他同居親族が65歳未満で内職（−1）', value: 'adj_other_relative_2', points: -1 },
    ],
  },
  {
    id: 'adj_many_children',
    category: 'adjustment',
    label: '18歳以下の児童数が4人以上ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_many_children_0', points: 0 },
      { label: 'はい（+1）', value: 'adj_many_children_1', points: 1 },
    ],
  },
  {
    id: 'adj_nuclear',
    category: 'adjustment',
    label: '父母のみの世帯（核家族世帯）ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_nuclear_0', points: 0 },
      { label: 'はい（+1）', value: 'adj_nuclear_1', points: 1 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: '兄弟の状況は？',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_sibling_0', points: 0 },
      { label: '在園児の兄弟姉妹（すでに利用中の施設に新規入所を希望する。小規模保育事業等の卒園による転所含む）（+4）', value: 'adj_sibling_1', points: 4 },
      { label: '兄弟姉妹が同時に利用申込み（同時新規入所または小規模保育事業等の卒園により同時入所希望）（+3）', value: 'adj_sibling_2', points: 3 },
    ],
  },
  {
    id: 'adj_waiting',
    category: 'adjustment',
    label: '前年度入所申込者で待機となっている者のうち、8月までに入所申込みをしていますか？',
    helpText: '前年度入所希望月が10月までの者が対象です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_waiting_0', points: 0 },
      { label: 'はい（+1）', value: 'adj_waiting_1', points: 1 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯で求職中ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_0', points: 0 },
      { label: 'はい（+1）', value: 'adj_welfare_1', points: 1 },
    ],
  },
  {
    id: 'adj_unemployed',
    category: 'adjustment',
    label: '生計中心者の失業により、就労の必要性が高いですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unemployed_0', points: 0 },
      { label: 'はい（+1）', value: 'adj_unemployed_1', points: 1 },
    ],
  },
  {
    id: 'adj_social_care',
    category: 'adjustment',
    label: '虐待やDVのおそれがある場合など、社会的養護が必要ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_social_care_0', points: 0 },
      { label: 'はい（+2）', value: 'adj_social_care_1', points: 2 },
    ],
  },
  {
    id: 'adj_child_disability',
    category: 'adjustment',
    label: '子どもが障がいを有していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_child_disability_0', points: 0 },
      { label: 'はい（+1）', value: 'adj_child_disability_1', points: 1 },
    ],
  },
  {
    id: 'adj_leave_return',
    category: 'adjustment',
    label: '育児休業明けで特に保育が必要と認められますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_leave_return_0', points: 0 },
      { label: 'はい（+1）', value: 'adj_leave_return_1', points: 1 },
    ],
  },
  {
    id: 'adj_nursery_staff',
    category: 'adjustment',
    label: '保育士・保育教諭として保育所等に勤務しますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_nursery_staff_0', points: 0 },
      { label: 'はい（+1）', value: 'adj_nursery_staff_1', points: 1 },
    ],
  },
  {
    id: 'adj_graduate',
    category: 'adjustment',
    label: '小規模保育事業などの卒園児童ですか？',
    helpText: '対象月齢が2歳児までの認可保育所等の卒園児童を含みます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_graduate_0', points: 0 },
      { label: 'はい（+1）', value: 'adj_graduate_1', points: 1 },
    ],
  },
];

export const nagaiData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
