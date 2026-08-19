import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 藤枝市 保育所等 利用調整基準（基準点・世帯状況等の調整項目）データ
//
// 出典: 藤枝市こども課保育推進係「令和8年度利用調整基準」
//       https://www.city.fujieda.shizuoka.jp/material/files/group/110/r8riyoutyouseikijun.pdf
//       （藤枝市Webサイト「令和8年度保育所等の入所申込みの受付を開始しました」
//         https://www.city.fujieda.shizuoka.jp/soshiki/kodomomirai/jido/gyomu/6/25709.html からリンク）
//
// 2026-08-19: 従来のデータは他自治体と同じ点数配列のテンプレート（推定値）だったため、
//             上記の公式基準表を読み取って全面的に置き換えた。
//             公式の基準点は父母各最大13点で、旧データ（父母各20点）とは体系が異なる。
//
// 原典で「※」（個別に判断）とされている項目 — 通勤に時間を要する場合、7月以降の入所希望、
// 同居している65歳未満の祖父母等、入所決定後のキャンセル、児童福祉等の観点 — は
// 点数が定まらないため、質問には含めていない。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'fujieda',
  name: '藤枝市',
  slug: 'fujieda',
  prefecture: '静岡県',
  maxBasePoints: 26, // 父母各13点
} as const;

// ---------------------------------------------------------------------------
// 基準点（保護者の状況等）。父母それぞれについて選ぶ
// ---------------------------------------------------------------------------

/** ① 就労（月64時間以上就労することを常態とする）。内職も同じ事由に含まれる */
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月170時間以上（週42.5時間以上）', value: `${prefix}_employment_13`, points: 13 },
  { label: '月160時間以上（週40時間以上）', value: `${prefix}_employment_12`, points: 12 },
  { label: '月150時間以上（週37.5時間以上）', value: `${prefix}_employment_11`, points: 11 },
  { label: '月140時間以上（週35時間以上）', value: `${prefix}_employment_10`, points: 10 },
  { label: '月130時間以上（週32.5時間以上）', value: `${prefix}_employment_9`, points: 9 },
  { label: '月120時間以上（週30時間以上）', value: `${prefix}_employment_8`, points: 8 },
  { label: '月100時間以上（週25時間以上）', value: `${prefix}_employment_7`, points: 7 },
  { label: '月80時間以上（週20時間以上）', value: `${prefix}_employment_6`, points: 6 },
  { label: '月64時間以上（週16時間以上）', value: `${prefix}_employment_5`, points: 5 },
  { label: '内職：月140時間以上', value: `${prefix}_employment_naishoku_6`, points: 6 },
  { label: '内職：月100時間以上', value: `${prefix}_employment_naishoku_5`, points: 5 },
  { label: '内職：月64時間以上', value: `${prefix}_employment_naishoku_4`, points: 4 },
];

/** ② 求職活動中 */
const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動を継続的に行っている', value: `${prefix}_jobseeking_4`, points: 4 },
];

/** ③ 産前産後 */
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産予定日の属する月の前2か月から産後3か月まで', value: `${prefix}_childbirth_9`, points: 9 },
];

/** ④ 死亡、離婚（調停中含む）、行方不明・拘禁・（1年以上）交流なし等 */
const absenceOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_absence_none`, points: 0 },
  { label: '死亡・離婚（調停中含む）・行方不明・拘禁・1年以上交流なし等', value: `${prefix}_absence_12`, points: 12 },
];

/** ⑤ 疾病（入院・通院・自宅療養） */
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院（1か月以上）', value: `${prefix}_illness_hospital_12`, points: 12 },
  { label: '通院（週3日以上）', value: `${prefix}_illness_visit_8`, points: 8 },
  {
    label: '自宅療養：医師より「保育不可」と診断（寝たきりが常態、感染症等を含む）',
    value: `${prefix}_illness_home_12`,
    points: 12,
  },
  {
    label: '自宅療養：医師より「援助があれば保育可能」と診断（日常生活に著しく支障）',
    value: `${prefix}_illness_home_10`,
    points: 10,
  },
  {
    label: '自宅療養：一般療養（運動・外出等は制限されるが身の回りのことは自分でできる）',
    value: `${prefix}_illness_home_7`,
    points: 7,
  },
  { label: '自宅療養：上記以外', value: `${prefix}_illness_home_4`, points: 4 },
];

/** ⑤ 障害 */
const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '身体1・2級、療育A、精神1級 又は同程度', value: `${prefix}_disability_12`, points: 12 },
  { label: '身体3級、療育B、精神2級 又は同程度', value: `${prefix}_disability_10`, points: 10 },
  { label: '上記以外', value: `${prefix}_disability_6`, points: 6 },
];

/** ⑥ 介護・看護（付添い／自宅介護看護／別宅介護看護） */
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '入院・施設通所の付添い（入院1か月以上）', value: `${prefix}_care_attend_10`, points: 10 },
  { label: '通院の付添い（週3日以上）', value: `${prefix}_care_attend_5`, points: 5 },
  {
    label: '自宅介護看護：重度（要介護4以上、身体1・2級、療育A、精神1級 又は同程度）',
    value: `${prefix}_care_home_12`,
    points: 12,
  },
  {
    label: '自宅介護看護：中度（要介護3、身体3級、療育B、精神2級 又は同程度）',
    value: `${prefix}_care_home_10`,
    points: 10,
  },
  { label: '自宅介護看護：軽度（要介護2 又は同程度）', value: `${prefix}_care_home_8`, points: 8 },
  { label: '自宅介護看護：上記以外（要介護1以下 又は同程度）', value: `${prefix}_care_home_6`, points: 6 },
  {
    label: '別宅介護看護：重度（要介護4以上、身体1・2級、療育A、精神1級 又は同程度）',
    value: `${prefix}_care_out_9`,
    points: 9,
  },
  {
    label: '別宅介護看護：中度（要介護3、身体3級、療育B、精神2級 又は同程度）',
    value: `${prefix}_care_out_7`,
    points: 7,
  },
  { label: '別宅介護看護：軽度（要介護2 又は同程度）', value: `${prefix}_care_out_5`, points: 5 },
  { label: '別宅介護看護：上記以外（要介護1以下 又は同程度）', value: `${prefix}_care_out_3`, points: 3 },
];

/** ⑦ 学校、職業訓練学校等への通学（オンライン学習含む） */
const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '週40時間以上', value: `${prefix}_education_12`, points: 12 },
  { label: '週35時間以上', value: `${prefix}_education_10`, points: 10 },
  { label: '週30時間以上', value: `${prefix}_education_8`, points: 8 },
  { label: '週25時間以上', value: `${prefix}_education_7`, points: 7 },
  { label: '週16時間以上', value: `${prefix}_education_5`, points: 5 },
];

/** ⑧ 災害等 */
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '火災等による家屋の損失、その他災害復旧', value: `${prefix}_disaster_12`, points: 12 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: 'いちばん近いものをひとつ選んでください',
    inputType: 'select',
    options: [
      { label: '仕事をしている（自営業・農業・内職を含む）', value: `${prefix}_reason_employment`, points: 0 },
      { label: '仕事を探している', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '産前産後', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '死亡・離婚・行方不明等', value: `${prefix}_reason_absence`, points: 0 },
      { label: '病気の治療・療養中', value: `${prefix}_reason_illness`, points: 0 },
      { label: '障害がある', value: `${prefix}_reason_disability`, points: 0 },
      { label: '家族の介護・看護をしている', value: `${prefix}_reason_care`, points: 0 },
      { label: '学校・職業訓練学校等に通っている', value: `${prefix}_reason_education`, points: 0 },
      { label: '災害の復旧に当たっている', value: `${prefix}_reason_disaster`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}はどのくらい働いていますか？`,
      helpText: '月64時間以上の就労を常態とする場合が対象です。就労時間には休憩時間を含みます',
      inputType: 'radio',
      options: employmentOptions(prefix),
    },
    {
      id: `${prefix}_jobseeking`,
      category,
      label: `${parentLabel}は求職活動をしていますか？`,
      inputType: 'radio',
      options: jobSeekingOptions(prefix),
    },
    {
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}の産前産後の状況は？`,
      inputType: 'radio',
      options: childbirthOptions(prefix),
    },
    {
      id: `${prefix}_absence`,
      category,
      label: `${parentLabel}は不存在の状態にあてはまりますか？`,
      inputType: 'radio',
      options: absenceOptions(prefix),
    },
    {
      id: `${prefix}_illness`,
      category,
      label: `${parentLabel}の病気の状況は？`,
      inputType: 'radio',
      options: illnessOptions(prefix),
    },
    {
      id: `${prefix}_disability`,
      category,
      label: `${parentLabel}の障害の程度は？`,
      helpText: '身体障害者手帳・療育手帳・精神障害者保健福祉手帳の等級でお選びください',
      inputType: 'radio',
      options: disabilityOptions(prefix),
    },
    {
      id: `${prefix}_care`,
      category,
      label: `${parentLabel}の介護・看護の状況は？`,
      helpText: '自宅で介護するか（自宅介護看護）、別居の家族を介護するか（別宅介護看護）で点数が変わります',
      inputType: 'radio',
      options: careOptions(prefix),
    },
    {
      id: `${prefix}_education`,
      category,
      label: `${parentLabel}はどのくらい学校に通っていますか？`,
      helpText: 'オンライン学習を含みます。就学証明書が提出できない場合は、受講期間やカリキュラム等が確認できる書類の提出が必要です',
      inputType: 'radio',
      options: educationOptions(prefix),
    },
    {
      id: `${prefix}_disaster`,
      category,
      label: `${parentLabel}は災害復旧に当たっていますか？`,
      inputType: 'radio',
      options: disasterOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// ---------------------------------------------------------------------------
// 世帯状況等の調整項目（基準点に加点・減点を行う項目）
// ---------------------------------------------------------------------------

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯ですか？',
    helpText: '就労による自立支援につながる場合等が対象です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい', value: 'adj_welfare_yes', points: 5 },
    ],
  },
  {
    id: 'adj_layoff',
    category: 'adjustment',
    label: '倒産・リストラ等により求職活動をしていますか？',
    helpText: '主たる生計維持者である保護者が、離職後6か月以内で日々求職活動をしている世帯が対象です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_layoff_no', points: 0 },
      { label: 'はい', value: 'adj_layoff_yes', points: 4 },
    ],
  },
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親世帯ですか？',
    helpText: '母子世帯、父子世帯又はそれに類する場合',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい', value: 'adj_single_parent_yes', points: 5 },
    ],
  },
  {
    id: 'adj_many_children',
    category: 'adjustment',
    label: '18歳未満の子どもが3人以上いますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_many_children_no', points: 0 },
      { label: 'はい', value: 'adj_many_children_yes', points: 1 },
    ],
  },
  {
    id: 'adj_simultaneous',
    category: 'adjustment',
    label: 'きょうだい2人以上で同時に申し込みますか？',
    helpText: '転園希望および認定変更希望（1号→2号）は除きます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_simultaneous_no', points: 0 },
      { label: 'はい', value: 'adj_simultaneous_yes', points: 1 },
      { label: 'はい（多胎児）', value: 'adj_simultaneous_multiple', points: 2 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: 'すでにきょうだいが保育所等に入所していますか？',
    helpText:
      '保育所等とは、地域型保育事業所・認可保育所・認定こども園を指します。加点は保護者の基準点によって変わり、在園しているきょうだいの人数分だけ加算されます（ここでは1人として計算しています）。認定変更希望（1号→2号）は除きます',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_sibling_no', points: 0 },
      { label: '入所している（保護者の基準点がともに10点以上）', value: 'adj_sibling_6', points: 6 },
      { label: '入所している（保護者のいずれかの基準点が7〜9点）', value: 'adj_sibling_3', points: 3 },
      { label: '入所している（保護者のいずれかの基準点が5〜6点）', value: 'adj_sibling_2', points: 2 },
      { label: '入所している（保護者のいずれかの基準点が4点以下）', value: 'adj_sibling_1', points: 1 },
    ],
  },
  {
    id: 'adj_hoikushi',
    category: 'adjustment',
    label: '保護者が保育士等として就労していますか？',
    helpText:
      '保育士、幼稚園教諭、保育教諭、（保育施設等の）事務職員や調理員、放課後児童クラブ指導員等として就労している場合が対象です',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_hoikushi_no', points: 0 },
      { label: '該当し、その保護者の基準点が10点以上', value: 'adj_hoikushi_5', points: 5 },
      { label: '該当し、その保護者の基準点が9点以下', value: 'adj_hoikushi_3', points: 3 },
    ],
  },
  {
    id: 'adj_tanshin',
    category: 'adjustment',
    label: '父または母が単身赴任していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_tanshin_no', points: 0 },
      { label: 'はい', value: 'adj_tanshin_yes', points: 1 },
    ],
  },
  {
    id: 'adj_chiikigata',
    category: 'adjustment',
    label: '地域型保育事業所を卒園予定の2歳児ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_chiikigata_no', points: 0 },
      { label: 'はい（保護者の基準点がともに8点以上）', value: 'adj_chiikigata_5', points: 5 },
      { label: 'はい（保護者のいずれかの基準点が7点以下）', value: 'adj_chiikigata_3', points: 3 },
    ],
  },
  {
    id: 'adj_hospital_visit',
    category: 'adjustment',
    label: '保護者が週1日以上通院していますか？',
    helpText:
      '通院付添いを含みます。週1日以上通院していることが確認できる医師の意見書または直近1か月間の領収書が必要で、基準点が10点以下の場合のみ加点されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_hospital_visit_no', points: 0 },
      { label: 'はい', value: 'adj_hospital_visit_yes', points: 1 },
    ],
  },
  {
    id: 'adj_job_offer',
    category: 'adjustment',
    label: '就労が「内定」の状態の保護者は何人いますか？',
    helpText: '1人につき1点の減算です',
    inputType: 'radio',
    options: [
      { label: 'いない', value: 'adj_job_offer_0', points: 0 },
      { label: '1人', value: 'adj_job_offer_1', points: -1 },
      { label: '2人', value: 'adj_job_offer_2', points: -2 },
    ],
  },
  {
    id: 'adj_leave_extension',
    category: 'adjustment',
    label: '申込書で「育児休業の延長も許容できる」にチェックしますか？',
    helpText: '大きく減算されるため、入所を強く希望する場合はチェックしないのが一般的です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_leave_extension_no', points: 0 },
      { label: 'はい', value: 'adj_leave_extension_yes', points: -30 },
    ],
  },
  {
    id: 'adj_arrears',
    category: 'adjustment',
    label: '保育料を滞納していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_arrears_no', points: 0 },
      { label: 'はい', value: 'adj_arrears_yes', points: -10 },
    ],
  },
];

export const fujiedaData: MunicipalityData = {
  municipality,
  questions: [...buildParentQuestions(1), ...buildParentQuestions(2), ...adjustmentQuestions],
};
