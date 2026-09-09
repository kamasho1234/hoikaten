import type { MunicipalityData, Question } from '../types';

// -------------------------------------------------------------------------
// みやき町 保育園入園 利用調整基準データ
// 出典: みやき町「利用調整基準表」（別表1 基本点数／別表2 調整点数）
// https://www.town.miyaki.lg.jp/var/rev0/0031/1065/tensuuhyou.pdf
// -------------------------------------------------------------------------
// みやき町の基本点数は「父」「母」それぞれの列に点数が並び、
// 表の見出しが「別表1【基本点数】・・・計＿＿点」となっている。
// 原典は父母の合わせ方を書いていないため、
// 全国で最も多い形（父母それぞれの点数を合算）に合わせて scoringMethod は 'sum' とした。
// 基本点数の最大は1人あたり11点（不在＝単身赴任等）。
//
// 別表1の備考「父母が基本点数表の複数の項目に該当する場合は、
// 基本点数の高い方のみを適用する。」により、事由ごとの設問は1つだけ選ぶ形にしている。
// 別表2の備考「父母が調整点数表の項目に複数該当する場合は、それぞれの点数を加算する。」
//
// 「妊娠・出産」は父の欄が斜線になっているため、母のみの区分である。
//
// 「町外居住者（転入予定がある場合を除く）」（−15／−10）は、
// 住まいで決まるもので入園の点数の目安とは性質が違うため入れていない。
// 「きょうだいと同じ園へ転園を希望する」（+1）も、いま園を利用している方の話なので入れていない。
// -------------------------------------------------------------------------

const municipality = {
  id: 'miyaki',
  name: 'みやき町',
  slug: 'miyaki',
  prefecture: '佐賀県',
  maxBasePoints: 11,
  scoringMethod: 'sum',
} as const;

// 労働・就学（就労を目的とする）
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '就労・農業・自営業（実績有）・就学：月160時間以上', value: `${prefix}_employment_0`, points: 10 },
  { label: '就労・農業・自営業（実績有）・就学：月140時間以上160時間未満', value: `${prefix}_employment_1`, points: 9 },
  { label: '就労・農業・自営業（実績有）・就学：月120時間以上140時間未満', value: `${prefix}_employment_2`, points: 8 },
  { label: '就労・農業・自営業（実績有）・就学：月100時間以上120時間未満', value: `${prefix}_employment_3`, points: 7 },
  { label: '就労・農業・自営業（実績有）・就学：月80時間以上100時間未満', value: `${prefix}_employment_4`, points: 6 },
  { label: '就労・農業・自営業（実績有）・就学：月48時間以上80時間未満', value: `${prefix}_employment_5`, points: 5 },
  { label: '上記以外：月160時間以上', value: `${prefix}_employment_6`, points: 8 },
  { label: '上記以外：上記以外', value: `${prefix}_employment_7`, points: 7 },
];

// 妊娠・出産（母のみ）
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '妊娠・出産', value: `${prefix}_childbirth_0`, points: 10 },
];

// 病気・障がい等
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院（2週間以上）または常時臥床', value: `${prefix}_illness_0`, points: 10 },
  { label: '心身障害 1・2級', value: `${prefix}_illness_1`, points: 10 },
  { label: '心身障害 3級以下', value: `${prefix}_illness_2`, points: 7 },
  { label: '在宅（通院）', value: `${prefix}_illness_3`, points: 6 },
];

// 介護・看護
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '常時臥床介護または要介護認定者介護（施設入所およびサービス利用者除く）', value: `${prefix}_care_0`, points: 10 },
  { label: '上記以外', value: `${prefix}_care_1`, points: 6 },
];

// 災害復旧
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '災害復旧に従事', value: `${prefix}_disaster_0`, points: 10 },
];

// 求職中
const jobseekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: 'ひとり親世帯または生計中心者の本人の責によらない失業により、就労の必要性が高い', value: `${prefix}_jobseeking_0`, points: 10 },
  { label: '上記以外', value: `${prefix}_jobseeking_1`, points: 4 },
];

// その他（不存在・不在）
const absentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_absent_none`, points: 0 },
  { label: '不在（単身赴任等）', value: `${prefix}_absent_0`, points: 11 },
  { label: '不存在（死別・離別・行方不明・未婚等）', value: `${prefix}_absent_1`, points: 10 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: '複数の項目に該当する場合は、基本点数の高い方のみを適用します',
    inputType: 'select',
    options: [
      { label: '労働・就学', value: `${prefix}_reason_employment`, points: 0 },
      { label: '妊娠・出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '病気・障がい等', value: `${prefix}_reason_illness`, points: 0 },
      { label: '介護・看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '災害復旧', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '求職中', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: 'その他（不存在・不在）', value: `${prefix}_reason_absent`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の労働・就学の状況は？`,
      helpText: '就学は大学・短大・専門学校・職業訓練校が対象です',
      inputType: 'radio',
      options: employmentOptions(prefix),
    },
    {
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}の妊娠・出産の状況は？`,
      helpText: '原典では母のみに点数が付く区分です',
      inputType: 'radio',
      options: childbirthOptions(prefix),
    },
    {
      id: `${prefix}_illness`,
      category,
      label: `${parentLabel}の病気・障がいの状況は？`,
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
      label: `${parentLabel}は災害復旧に従事していますか？`,
      inputType: 'radio',
      options: disasterOptions(prefix),
    },
    {
      id: `${prefix}_jobseeking`,
      category,
      label: `${parentLabel}の求職の状況は？`,
      inputType: 'radio',
      options: jobseekingOptions(prefix),
    },
    {
      id: `${prefix}_absent`,
      category,
      label: `${parentLabel}：不存在・不在ですか？`,
      inputType: 'radio',
      options: absentOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// 別表2【調整点数】
const adjustmentQuestions: Question[] = [
  {
    id: 'adj_abuse',
    category: 'adjustment',
    label: '虐待・DV等社会的養護が必要な世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_abuse_0', points: 0 },
      { label: 'はい（+10）', value: 'adj_abuse_1', points: 10 },
    ],
  },
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親世帯ですか？',
    helpText: '離婚調停中もしくは離婚裁判中またはこれらに準ずる場合を含みます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_0', points: 0 },
      { label: 'はい（+7）', value: 'adj_single_parent_1', points: 7 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_0', points: 0 },
      { label: 'はい（+5）', value: 'adj_welfare_1', points: 5 },
    ],
  },
  {
    id: 'adj_multiple_birth',
    category: 'adjustment',
    label: '2才未満の多胎児がいる世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_multiple_birth_0', points: 0 },
      { label: 'はい（+1）', value: 'adj_multiple_birth_1', points: 1 },
    ],
  },
  {
    id: 'adj_many_children',
    category: 'adjustment',
    label: '多子世帯（小学校就学前の子どもが3人以上）ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_many_children_0', points: 0 },
      { label: 'はい（+1）', value: 'adj_many_children_1', points: 1 },
    ],
  },
  {
    id: 'adj_child_disability',
    category: 'adjustment',
    label: '特別児童扶養手当受給対象児童、または障害者手帳・療育手帳を有する児童ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_child_disability_0', points: 0 },
      { label: 'はい（+1）', value: 'adj_child_disability_1', points: 1 },
    ],
  },
  {
    id: 'adj_hope',
    category: 'adjustment',
    label: '希望理由は？',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_hope_0', points: 0 },
      { label: '小規模保育所等からの継続利用を希望する（2歳児のみ）（+3）', value: 'adj_hope_1', points: 3 },
      { label: '2・3号利用中のきょうだいが入所中の園を新規に希望する（+3）', value: 'adj_hope_2', points: 3 },
      { label: '校区内の保育所を第1希望としている（+2）', value: 'adj_hope_3', points: 2 },
      { label: '1号利用中のきょうだいが入所中の園を新規に希望する（+1）', value: 'adj_hope_4', points: 1 },
      { label: '第1希望において、きょうだい同時に同一園の入所を希望する（新規の場合で連携施設を含む）（+1）', value: 'adj_hope_5', points: 1 },
    ],
  },
  {
    id: 'adj_nursery_staff',
    category: 'adjustment',
    label: '保育士・看護師として勤務していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_nursery_staff_0', points: 0 },
      { label: '町内保育所に120時間以上勤務（+20）', value: 'adj_nursery_staff_1', points: 20 },
      { label: '町内保育所に100時間以上120時間未満勤務（+5）', value: 'adj_nursery_staff_2', points: 5 },
      { label: '町内在園児がいる町外保育所に120時間以上勤務（+2）', value: 'adj_nursery_staff_3', points: 2 },
    ],
  },
  {
    id: 'adj_unlicensed',
    category: 'adjustment',
    label: '就労等により認可外保育所等を月48時間以上利用していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unlicensed_0', points: 0 },
      { label: 'はい（+1）', value: 'adj_unlicensed_1', points: 1 },
    ],
  },
  {
    id: 'adj_medical_care',
    category: 'adjustment',
    label: '医療的ケア児で、前年度申込していたが受け入れ体制が整わず現在まで入所できていませんか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_medical_care_0', points: 0 },
      { label: 'はい（+15）', value: 'adj_medical_care_1', points: 15 },
    ],
  },
  {
    id: 'adj_declined',
    category: 'adjustment',
    label: '内定後に入園を辞退しましたか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_declined_0', points: 0 },
      { label: '第1希望〜第5希望のいずれかの園に内定後、入園を辞退した（−5）', value: 'adj_declined_1', points: -5 },
      { label: '町内全園の利用調整を希望し内定後、入園を辞退した（−5）', value: 'adj_declined_2', points: -5 },
    ],
  },
  {
    id: 'adj_fee_delinquent',
    category: 'adjustment',
    label: '保育料の滞納がありますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_fee_delinquent_0', points: 0 },
      { label: '納付誓約書の未提出または納付計画2ヶ月以上不履行（−7）', value: 'adj_fee_delinquent_1', points: -7 },
      { label: '申込み月から2ヶ月以前に保育料の滞納がある（卒園児を含む）（−6）', value: 'adj_fee_delinquent_2', points: -6 },
    ],
  },
];

export const miyakiData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
