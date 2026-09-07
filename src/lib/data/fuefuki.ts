import type { MunicipalityData, Question } from '../types';

// -------------------------------------------------------------------------
// 笛吹市 保育園入園 利用調整基準データ
// 出典: 笛吹市「【笛吹市】一斉入所（一次募集）の利用調整方法」（令和9年度）
// https://www.city.fuefuki.yamanashi.jp/documents/12081/r9_hoiku-riyoucyousei.pdf
// -------------------------------------------------------------------------
// 笛吹市は原典に手順と計算例が書かれている。
//   「父母の保育の必要性の要件を別々に確認した上で、合計点を基礎項目の点数とします。
//    （ひとり親の場合、基礎項目は1人分の点数となりますが、
//      利用調整項目に別途加点があります。）」
//   【例】（父）家庭外労働 100点 ＋（母）自営業（従業員）75点 ＝ 合計175点
// これにより scoringMethod は 'sum'。基礎項目の最大は1人あたり100点。
//
// 原典で幅のある項目は選択肢にしていない。
// - 災害復旧（65〜100、災害の状況・復旧に要する日数等を基に家庭外労働の就労時間を準用）
// - 就学（65〜100、カリキュラム等を基に就学に要する日数等を確認して同様に準用）
//   どちらも就労の表を当てはめて決まるため、単独の数が無い
//
// 減点「令和8年11月末時点において、きょうだいの過去の保育料に2か月以上の滞納がある場合」の
// −300は、原典に「※減点かつ利用調整の順序を転入予定者の後に繰り下げます」とあり、
// 実質的に選考の対象から外すための値なので入れていない。
// -------------------------------------------------------------------------

const municipality = {
  id: 'fuefuki',
  name: '笛吹市',
  slug: 'fuefuki',
  prefecture: '山梨県',
  maxBasePoints: 100,
  scoringMethod: 'sum',
} as const;

// 入所要件基礎項目 労働
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '家庭外労働：1日8時間以上かつ月20日以上（月160時間以上）', value: `${prefix}_employment_0`, points: 100 },
  { label: '家庭外労働：1日8時間以上かつ月15日以上（月120時間以上）', value: `${prefix}_employment_1`, points: 95 },
  { label: '家庭外労働：1日6時間以上かつ月20日以上（月120時間以上）', value: `${prefix}_employment_2`, points: 95 },
  { label: '家庭外労働：1日8時間以上かつ月12日以上（月96時間以上）', value: `${prefix}_employment_3`, points: 90 },
  { label: '家庭外労働：1日6時間以上かつ月15日以上（月90時間以上）', value: `${prefix}_employment_4`, points: 85 },
  { label: '家庭外労働：1日4時間以上かつ月20日以上（月80時間以上）', value: `${prefix}_employment_5`, points: 80 },
  { label: '家庭外労働：1日6時間以上かつ月12日以上（月72時間以上）', value: `${prefix}_employment_6`, points: 75 },
  { label: '家庭外労働：1日4時間以上かつ月15日以上（月60時間以上）', value: `${prefix}_employment_7`, points: 70 },
  { label: '家庭外労働：1日4時間以上かつ月12日以上（月48時間以上）', value: `${prefix}_employment_8`, points: 65 },
  { label: '家庭内労働（経営者）：1日8時間以上かつ月20日以上', value: `${prefix}_employment_9`, points: 95 },
  { label: '家庭内労働（経営者）：1日8時間以上かつ月15日以上', value: `${prefix}_employment_10`, points: 90 },
  { label: '家庭内労働（経営者）：1日6時間以上かつ月20日以上', value: `${prefix}_employment_11`, points: 90 },
  { label: '家庭内労働（経営者）：1日8時間以上かつ月12日以上', value: `${prefix}_employment_12`, points: 85 },
  { label: '家庭内労働（経営者）：1日6時間以上かつ月15日以上', value: `${prefix}_employment_13`, points: 80 },
  { label: '家庭内労働（経営者）：1日4時間以上かつ月20日以上', value: `${prefix}_employment_14`, points: 75 },
  { label: '家庭内労働（経営者）：1日6時間以上かつ月12日以上', value: `${prefix}_employment_15`, points: 70 },
  { label: '家庭内労働（経営者）：1日4時間以上かつ月15日以上', value: `${prefix}_employment_16`, points: 65 },
  { label: '家庭内労働（経営者）：1日4時間以上かつ月12日以上', value: `${prefix}_employment_17`, points: 60 },
  { label: '家庭内労働（従業員）：1日8時間以上かつ月20日以上', value: `${prefix}_employment_18`, points: 90 },
  { label: '家庭内労働（従業員）：1日8時間以上かつ月15日以上', value: `${prefix}_employment_19`, points: 85 },
  { label: '家庭内労働（従業員）：1日6時間以上かつ月20日以上', value: `${prefix}_employment_20`, points: 85 },
  { label: '家庭内労働（従業員）：1日8時間以上かつ月12日以上', value: `${prefix}_employment_21`, points: 80 },
  { label: '家庭内労働（従業員）：1日6時間以上かつ月15日以上', value: `${prefix}_employment_22`, points: 75 },
  { label: '家庭内労働（従業員）：1日4時間以上かつ月20日以上', value: `${prefix}_employment_23`, points: 70 },
  { label: '家庭内労働（従業員）：1日6時間以上かつ月12日以上', value: `${prefix}_employment_24`, points: 65 },
  { label: '家庭内労働（従業員）：1日4時間以上かつ月15日以上', value: `${prefix}_employment_25`, points: 60 },
  { label: '家庭内労働（従業員）：1日4時間以上かつ月12日以上', value: `${prefix}_employment_26`, points: 55 },
  { label: '農業：1日8時間以上かつ月20日以上', value: `${prefix}_employment_27`, points: 85 },
  { label: '農業：1日8時間以上かつ月15日以上', value: `${prefix}_employment_28`, points: 80 },
  { label: '農業：1日6時間以上かつ月20日以上', value: `${prefix}_employment_29`, points: 80 },
  { label: '農業：1日8時間以上かつ月12日以上', value: `${prefix}_employment_30`, points: 75 },
  { label: '農業：1日6時間以上かつ月15日以上', value: `${prefix}_employment_31`, points: 70 },
  { label: '農業：1日4時間以上かつ月20日以上', value: `${prefix}_employment_32`, points: 65 },
  { label: '農業：1日6時間以上かつ月12日以上', value: `${prefix}_employment_33`, points: 60 },
  { label: '農業：1日4時間以上かつ月15日以上', value: `${prefix}_employment_34`, points: 55 },
  { label: '農業：1日4時間以上かつ月12日以上', value: `${prefix}_employment_35`, points: 50 },
];

// 出産
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '産前2か月・出産（予定）月1か月・産後3か月の計6か月の期間にある母', value: `${prefix}_childbirth_0`, points: 80 },
];

// 入院・自宅療養・通院
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '疾病等により、長期に渡り入院している', value: `${prefix}_illness_0`, points: 100 },
  { label: '医師から長期加療（安静）を要すると診断された', value: `${prefix}_illness_1`, points: 80 },
  { label: '医師の診断により長期に渡り、週3日以上定期的に通院を要する', value: `${prefix}_illness_2`, points: 80 },
];

// 在宅看護・入院付添
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '同居家族の長期在宅療養等で看護、介護にあたっている', value: `${prefix}_care_0`, points: 80 },
  { label: '長期に渡り、同居家族の入院付き添いにあたっている', value: `${prefix}_care_1`, points: 65 },
];

// 求職活動等
const jobseekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職または起業準備のため外出することを常態としている（0点）', value: `${prefix}_jobseeking_0`, points: 0 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: '父母の要件を別々に確認した上で、合計点を基礎項目の点数とします',
    inputType: 'select',
    options: [
      { label: '労働（家庭外・家庭内・農業）', value: `${prefix}_reason_employment`, points: 0 },
      { label: '出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '入院・自宅療養・通院', value: `${prefix}_reason_illness`, points: 0 },
      { label: '在宅看護・入院付添', value: `${prefix}_reason_care`, points: 0 },
      { label: '求職活動等', value: `${prefix}_reason_jobseeking`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の労働の状況は？`,
      helpText: '自営業は就労場所に関わらず家庭内労働とし、配偶者や親族が経営している場合は従業員の就労時間を準用します。内職は経営者の就労時間を準用します',
      inputType: 'radio',
      options: employmentOptions(prefix),
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
      label: `${parentLabel}の入院・療養・通院の状況は？`,
      inputType: 'radio',
      options: illnessOptions(prefix),
    },
    {
      id: `${prefix}_care`,
      category,
      label: `${parentLabel}の看護・付添の状況は？`,
      inputType: 'radio',
      options: careOptions(prefix),
    },
    {
      id: `${prefix}_jobseeking`,
      category,
      label: `${parentLabel}は求職活動等をしていますか？`,
      helpText: '求職活動要件で申し込んだ場合でも、令和8年11月末までに就労証明書が提出されれば就労の要件に変更して利用調整が行われます',
      inputType: 'radio',
      options: jobseekingOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// 利用調整項目（加点）／（減点）
const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親家庭ですか？',
    helpText: '離婚調停中でも証明書類が提出されれば、利用調整時はひとり親家庭とみなして加点されます。事実婚の場合は加点しません',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_0', points: 0 },
      { label: '親子のみの世帯（+110）', value: 'adj_single_parent_1', points: 110 },
      { label: '祖父母等と同居（+100）', value: 'adj_single_parent_2', points: 100 },
    ],
  },
  {
    id: 'adj_tanshin',
    category: 'adjustment',
    label: '父母いずれかが単身赴任していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_tanshin_0', points: 0 },
      { label: 'はい（+100）', value: 'adj_tanshin_1', points: 100 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: '既にきょうだいが通っている施設を第1希望としますか？',
    helpText: 'きょうだいが卒園してしまう場合、きょうだい同時に新規入所の申請を行う場合などは加点されません',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_0', points: 0 },
      { label: 'はい（+120）', value: 'adj_sibling_1', points: 120 },
    ],
  },
  {
    id: 'adj_foster',
    category: 'adjustment',
    label: '里親制度利用世帯ですか？',
    helpText: '本市在住の保護者が養育している里子の入所申込を行う場合が対象です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_foster_0', points: 0 },
      { label: 'はい（+100）', value: 'adj_foster_1', points: 100 },
    ],
  },
  {
    id: 'adj_nursery_staff',
    category: 'adjustment',
    label: '保護者が笛吹市内の保育所等で保育士・幼稚園教諭・保育教諭として勤務していますか？',
    helpText: '資格の有無だけでなく、あくまで勤務していることが条件です。市外の保育所等で勤務している場合、加点はありませんが、指数同点となった場合には勤務地を問わず優遇措置があります',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_nursery_staff_0', points: 0 },
      { label: 'はい（+30）', value: 'adj_nursery_staff_1', points: 30 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護を受給していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_0', points: 0 },
      { label: 'はい（+15）', value: 'adj_welfare_1', points: 15 },
    ],
  },
  {
    id: 'adj_sibling_not_entering',
    category: 'adjustment',
    label: '求職中で入所しないきょうだいがいますか？',
    helpText: '入所を希望する児童の他に入所できる児童がいるのに入所しない場合が対象です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_not_entering_0', points: 0 },
      { label: 'はい（−15）', value: 'adj_sibling_not_entering_1', points: -15 },
    ],
  },
  {
    id: 'adj_fee_delinquent',
    category: 'adjustment',
    label: 'きょうだいの過去の保育料（主食費・副食費を含む）に2か月以上の滞納がありますか？',
    helpText: '令和8年11月末時点での状況です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_fee_delinquent_0', points: 0 },
      { label: '被災など、やむを得ないと認められる正当な理由がある（0）', value: 'adj_fee_delinquent_1', points: 0 },
      { label: '正当な理由には該当しないが、毎月分割納付を行っている（−100）', value: 'adj_fee_delinquent_2', points: -100 },
    ],
  },
];

export const fuefukiData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
