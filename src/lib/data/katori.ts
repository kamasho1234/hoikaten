import type { MunicipalityData, Question } from '../types';

// -------------------------------------------------------------------------
// 香取市 保育園入園 利用調整基準データ
// 出典: 香取市「入所選考基準（基準点数表・調整点数表）」
// https://www.city.katori.lg.jp/kosodate/hoikujo_yochien/R7tocyuunyuusyo.files/kijun.pdf
// -------------------------------------------------------------------------
// 香取市は「基準点（父母それぞれの点数を合算）＋ 調整点」の合計で決める。
// 原典の注記「基準点は保護者それぞれの点数を合算。」により scoringMethod は 'sum'。
// 基準点の最大は15点（No.9 虐待・DV）。就労だけなら1人あたり10点。
//
// 原典で数値を出していない項目は選択肢にしていない。
// - No.12「その他市長が認める場合」（※）… 「当該児童・世帯の状況に応じて別途判断する」
//
// 調整点 No.9「子ども（4月1日現在18歳未満）が2人以上いる場合」は
// 2人目から1点ずつ加算されるため、人数で選ぶ形にしている。
// No.11「入所保留の期間が3箇月以上経過している場合」は
// 3か月経過で+1、6か月経過で+2 と原典に書かれているため、その2段にしている。
// -------------------------------------------------------------------------

const municipality = {
  id: 'katori',
  name: '香取市',
  slug: 'katori',
  prefecture: '千葉県',
  maxBasePoints: 15,
  scoringMethod: 'sum',
} as const;

// No.1 就労
// 農業の専従者は-1点、内職は別区分
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '外勤・自営業で1ヶ月に160時間以上', value: `${prefix}_employment_0`, points: 10 },
  { label: '外勤・自営業で1ヶ月に120時間以上', value: `${prefix}_employment_1`, points: 9 },
  { label: '外勤・自営業で1ヶ月に80時間以上', value: `${prefix}_employment_2`, points: 8 },
  { label: '外勤・自営業で1ヶ月に48時間以上', value: `${prefix}_employment_3`, points: 7 },
  { label: '農業で1ヶ月に160時間以上', value: `${prefix}_employment_4`, points: 10 },
  { label: '農業で1ヶ月に120時間以上', value: `${prefix}_employment_5`, points: 9 },
  { label: '農業で1ヶ月に80時間以上', value: `${prefix}_employment_6`, points: 8 },
  { label: '農業で1ヶ月に48時間以上', value: `${prefix}_employment_7`, points: 7 },
  { label: '内職で1ヶ月に48時間以上', value: `${prefix}_employment_8`, points: 5 },
];

// No.2 就学・技能取得（就労を前提とするもの）
const schoolOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_school_none`, points: 0 },
  { label: '1ヶ月に160時間以上', value: `${prefix}_school_0`, points: 8 },
  { label: '1ヶ月に120時間以上', value: `${prefix}_school_1`, points: 7 },
  { label: '1ヶ月に80時間以上', value: `${prefix}_school_2`, points: 6 },
  { label: '1ヶ月に48時間以上', value: `${prefix}_school_3`, points: 5 },
];

// No.3 妊娠・出産（母親の出産）
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産予定日の8週前の月初から、出産日から8週経過の翌日の月末まで', value: `${prefix}_childbirth_0`, points: 10 },
];

// No.4 疾病 / No.5 障害
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: 'おおむね1箇月以上の入院', value: `${prefix}_illness_0`, points: 13 },
  { label: '身体障害1・2級／療育手帳A・Aの1・Aの2', value: `${prefix}_illness_1`, points: 13 },
  { label: '精神障害1級', value: `${prefix}_illness_2`, points: 13 },
  { label: 'おおむね1箇月以上の常時臥床', value: `${prefix}_illness_3`, points: 10 },
  { label: '身体障害3級／療育手帳Bの1', value: `${prefix}_illness_4`, points: 10 },
  { label: '精神障害2級・3級', value: `${prefix}_illness_5`, points: 10 },
  { label: 'おおむね1箇月以上、保育が困難と診断書で確認できる疾病', value: `${prefix}_illness_6`, points: 8 },
  { label: '身体障害4級・5級・6級／療育手帳Bの2', value: `${prefix}_illness_7`, points: 8 },
];

// No.6 介護
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '常時同居の寝たきり老人の介護にあたっている', value: `${prefix}_care_0`, points: 10 },
  { label: '心身障害児（者）の介護・通院等にあたっている', value: `${prefix}_care_1`, points: 10 },
  { label: '常時入院に付添いにあたっている', value: `${prefix}_care_2`, points: 10 },
  { label: '同居の家族の長期居宅療養者の介護にあたっている', value: `${prefix}_care_3`, points: 6 },
];

// No.7 災害復旧
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '天災等で災害を受け復旧にあたっている', value: `${prefix}_disaster_0`, points: 10 },
];

// No.8 求職活動
const jobseekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '就労先が確定している（勤務内定者）', value: `${prefix}_jobseeking_0`, points: 5 },
  { label: '就労先が未定（効力発生日から90日を経過する日が属する月の末日まで）', value: `${prefix}_jobseeking_1`, points: 3 },
];

// No.9 虐待・DV
const abuseOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_abuse_none`, points: 0 },
  { label: '児童虐待またはDVにより保育が困難（行政機関の証明書等で確認できる）', value: `${prefix}_abuse_0`, points: 15 },
];

// No.10 育児休業
const parentalLeaveOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_parental_leave_none`, points: 0 },
  { label: '育児休業中で、既に保育所等を利用している児童の継続利用が必要', value: `${prefix}_parental_leave_0`, points: 5 },
];

// No.11 配偶者の不存在
const noSpouseOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_no_spouse_none`, points: 0 },
  { label: '未婚・離婚・死亡・行方不明・拘束・離婚調停中の別居等', value: `${prefix}_no_spouse_0`, points: 10 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: '香取市は父母それぞれの基準点を合算して世帯の基準点にします',
    inputType: 'select',
    options: [
      { label: '就労', value: `${prefix}_reason_employment`, points: 0 },
      { label: '就学・技能取得', value: `${prefix}_reason_school`, points: 0 },
      { label: '妊娠・出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '疾病・障害', value: `${prefix}_reason_illness`, points: 0 },
      { label: '介護', value: `${prefix}_reason_care`, points: 0 },
      { label: '災害復旧', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '求職活動', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '虐待・DV', value: `${prefix}_reason_abuse`, points: 0 },
      { label: '育児休業', value: `${prefix}_reason_parental_leave`, points: 0 },
      { label: '配偶者の不存在', value: `${prefix}_reason_no_spouse`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の就労の状況は？`,
      helpText: '複数の個所に就労している場合は、それぞれの就労時間を合算します。育児のための短時間勤務制度の取得者は、当該就労時間で判定します',
      inputType: 'radio',
      options: employmentOptions(prefix),
    },
    {
      id: `${prefix}_school`,
      category,
      label: `${parentLabel}の就学・技能取得の状況は？`,
      helpText: '就労を前提とする就学または技能取得であることが必要です',
      inputType: 'radio',
      options: schoolOptions(prefix),
    },
    {
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}の出産の状況は？`,
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
      label: `${parentLabel}の介護の状況は？`,
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
      id: `${prefix}_abuse`,
      category,
      label: `${parentLabel}：虐待やDVのおそれがありますか？`,
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
    {
      id: `${prefix}_no_spouse`,
      category,
      label: `${parentLabel}：配偶者が不存在ですか？`,
      inputType: 'radio',
      options: noSpouseOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// (2) 調整点数表
const adjustmentQuestions: Question[] = [
  {
    id: 'adj_no_spouse',
    category: 'adjustment',
    label: '配偶者が不存在ですか？',
    helpText: '基準点数表No.11に該当する場合に、調整点としても加算されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_no_spouse_0', points: 0 },
      { label: 'はい（+3）', value: 'adj_no_spouse_1', points: 3 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯またはこれに準ずる世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_0', points: 0 },
      { label: 'はい（+3）', value: 'adj_welfare_1', points: 3 },
    ],
  },
  {
    id: 'adj_unemployed',
    category: 'adjustment',
    label: '生活中心者が失業（自発的失業を除く）していますか？',
    helpText: '雇用保険離職票・受給者証等で、自発的失業以外であることを確認します',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unemployed_0', points: 0 },
      { label: 'はい（+3）', value: 'adj_unemployed_1', points: 3 },
    ],
  },
  {
    id: 'adj_child_disability',
    category: 'adjustment',
    label: '入所を希望する子どもが障害を有していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_child_disability_0', points: 0 },
      { label: 'はい（+5）', value: 'adj_child_disability_1', points: 5 },
    ],
  },
  {
    id: 'adj_leave_return',
    category: 'adjustment',
    label: '産後休暇または育児休業が終了し、入所希望中に職場復帰しますか？',
    helpText: '入所不可の場合、翌月以降も適用されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_leave_return_0', points: 0 },
      { label: 'はい（+2）', value: 'adj_leave_return_1', points: 2 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: '兄弟姉妹の入所状況は？',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_sibling_0', points: 0 },
      { label: '兄弟姉妹が既に入所している保育所等に申込む（一律+4）', value: 'adj_sibling_1', points: 4 },
      { label: '兄弟姉妹が同時に申込む（既に入所している児童を除く）（+2）', value: 'adj_sibling_2', points: 2 },
    ],
  },
  {
    id: 'adj_graduate',
    category: 'adjustment',
    label: '年齢制限のある認可保育施設等（小規模保育事業・地域型事業等）を卒園し、引き続き保育所等の利用を希望しますか？',
    helpText: '連携施設があるにも関わらず、理由なく連携施設以外を希望する場合を除きます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_graduate_0', points: 0 },
      { label: 'はい（+4）', value: 'adj_graduate_1', points: 4 },
    ],
  },
  {
    id: 'adj_children_count',
    category: 'adjustment',
    label: '4月1日現在18歳未満の子どもは何人いますか？',
    helpText: '2人目から1点ずつ加算されます（3人なら+2）',
    inputType: 'radio',
    options: [
      { label: '1人（加算なし）', value: 'adj_children_count_0', points: 0 },
      { label: '2人（+1）', value: 'adj_children_count_1', points: 1 },
      { label: '3人（+2）', value: 'adj_children_count_2', points: 2 },
      { label: '4人以上（+3）', value: 'adj_children_count_3', points: 3 },
    ],
  },
  {
    id: 'adj_unlicensed',
    category: 'adjustment',
    label: '認可外保育施設または一時預かりを3箇月以上利用していますか？',
    helpText: '保育料領収書や在籍証明書等で確認します',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unlicensed_0', points: 0 },
      { label: 'はい（+1）', value: 'adj_unlicensed_1', points: 1 },
    ],
  },
  {
    id: 'adj_waiting',
    category: 'adjustment',
    label: '利用申込をしており、入所保留の期間が3箇月以上経過していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_waiting_0', points: 0 },
      { label: '3か月経過（+1）', value: 'adj_waiting_1', points: 1 },
      { label: '6か月経過（+2）', value: 'adj_waiting_2', points: 2 },
    ],
  },
  {
    id: 'adj_nursery_staff',
    category: 'adjustment',
    label: '父または母が市内認可施設の保育士等として勤務していますか？',
    helpText: '勤務予定の場合も含みます。就労証明書等で確認できる場合に加算されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_nursery_staff_0', points: 0 },
      { label: 'はい（+5）', value: 'adj_nursery_staff_1', points: 5 },
    ],
  },
  {
    id: 'adj_transfer',
    category: 'adjustment',
    label: '自己都合により転園を希望していますか？',
    helpText: '兄弟姉妹が既に入所している保育所等への転園を希望する場合を除きます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_transfer_0', points: 0 },
      { label: 'はい（−4）', value: 'adj_transfer_1', points: -4 },
    ],
  },
  {
    id: 'adj_fee_delinquent',
    category: 'adjustment',
    label: '兄弟姉妹の保育料を正当な理由なく6箇月以上滞納していますか？',
    helpText: '入所を希望する児童の兄弟姉妹が在園または卒園した児童である場合が対象です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_fee_delinquent_0', points: 0 },
      { label: 'はい（−5）', value: 'adj_fee_delinquent_1', points: -5 },
    ],
  },
  {
    id: 'adj_grandmother',
    category: 'adjustment',
    label: '同居する60歳未満（入所時年齢）の祖母が補完的な保育にあたれますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_grandmother_0', points: 0 },
      { label: 'はい（−5）', value: 'adj_grandmother_1', points: -5 },
    ],
  },
  {
    id: 'adj_declined',
    category: 'adjustment',
    label: '正当な理由なく入所を辞退したことがありますか？',
    helpText: '当該年度内のみ適用。兄弟姉妹が同時に異動希望しており、一方しか入所できないため辞退した場合を除きます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_declined_0', points: 0 },
      { label: 'はい（−5）', value: 'adj_declined_1', points: -5 },
    ],
  },
  {
    id: 'adj_leave_extendable',
    category: 'adjustment',
    label: '希望する保育所等に入所できない場合、育児休業の延長も許容できると申し出ていますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_leave_extendable_0', points: 0 },
      { label: 'はい（−20）', value: 'adj_leave_extendable_1', points: -20 },
    ],
  },
];

export const katoriData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
