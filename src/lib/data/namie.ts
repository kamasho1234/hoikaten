import type { MunicipalityData, Question } from '../types';

// -------------------------------------------------------------------------
// 浪江町 保育園入園 利用調整基準データ
// 出典: 浪江町「選考基準」（世帯の基準指数・調整指数）
// https://www.town.namie.fukushima.jp/uploaded/attachment/24154.pdf
// -------------------------------------------------------------------------
// 浪江町は備考に手順が書かれている。
//   「1. 父母のそれぞれの基準指数を合算し、世帯の基準指数を算出する。」
//   「2. 選考基準指数＝世帯の選考基準指数＋調整指数とする。」
//   「3. 入所選考基準番号が2項目以上にわたる場合は、基準指数の高い方とする。」
// 父母それぞれの基準指数を合算するので scoringMethod は 'sum'。
// 基準指数の最大は1人あたり10点。
//
// 備考6「基準指数の『9その他』はひとり親（離婚、未婚、死亡、離婚予定など）で
// 保護者が1人の時、不存在の親について適用させる。（例）：母子家庭の場合、
// 父の指数として10入る」に従い、「不存在」は保護者の設問として置いている。
// ひとり親の方は、いない側の保護者で「不存在」を選ぶ。
// -------------------------------------------------------------------------

const municipality = {
  id: 'namie',
  name: '浪江町',
  slug: 'namie',
  prefecture: '福島県',
  maxBasePoints: 20, // 父母各10点の合計
  scoringMethod: 'sum',
} as const;

// 1 居宅外労働（自宅外自営を除く） ／ 2 自営・内職
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '居宅外労働（常勤・非常勤・契約・派遣）：日中7時間以上就労', value: `${prefix}_employment_0`, points: 9 },
  { label: '自営（中心者・本人）：日中7時間以上就労', value: `${prefix}_employment_1`, points: 9 },
  { label: '居宅外労働（常勤・非常勤・契約・派遣）：日中7時間未満就労', value: `${prefix}_employment_2`, points: 8 },
  { label: '居宅外労働（パート・アルバイト）：日中7時間以上就労', value: `${prefix}_employment_3`, points: 8 },
  { label: '自営（中心者・本人）：日中7時間未満就労', value: `${prefix}_employment_4`, points: 8 },
  { label: '自営（協力者・家族）：日中7時間以上就労', value: `${prefix}_employment_5`, points: 8 },
  { label: '居宅外労働（パート・アルバイト）：日中7時間未満就労', value: `${prefix}_employment_6`, points: 7 },
  { label: '自営（中心者・本人）：開業準備', value: `${prefix}_employment_7`, points: 7 },
  { label: '自営（協力者・家族）：日中7時間未満就労', value: `${prefix}_employment_8`, points: 7 },
  { label: '内職：日中7時間以上就労', value: `${prefix}_employment_9`, points: 7 },
  { label: '内職：日中7時間未満就労', value: `${prefix}_employment_10`, points: 6 },
  { label: '自営（協力者・家族）：開業準備', value: `${prefix}_employment_11`, points: 5 },
  { label: '求職のため日中外出を常態としている場合', value: `${prefix}_employment_12`, points: 4 },
];

// 3 妊娠・出産
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産予定日の8週前の属する月の1日から出産日の8週を経過する日の翌日が属する月の末日までの間で、分娩・休養のため保育ができない場合', value: `${prefix}_childbirth_0`, points: 9 },
];

// 4 疾病・負傷・心身障がい
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院（1ヵ月以上）', value: `${prefix}_illness_0`, points: 10 },
  { label: '居宅療養：常時臥床（疾病のため概ね1ヵ月以上常に臥床）', value: `${prefix}_illness_1`, points: 10 },
  { label: '心身障がい：身体障害者手帳1・2級（聴覚障害3級含む）、療育手帳、精神障害者保健福祉手帳の交付を受けている場合（同程度の障がいを有する場合を含む）', value: `${prefix}_illness_2`, points: 10 },
  { label: '居宅療養：精神・結核（医師から長期加療（安静）を要すると診断されたもの）', value: `${prefix}_illness_3`, points: 8 },
  { label: '心身障がい：身体障害者手帳3級以下（同程度の障がいを有する場合を含む）', value: `${prefix}_illness_4`, points: 7 },
  { label: '居宅療養：一般療養（医師から概ね1ヵ月以上加療を要すると診断されたもの）', value: `${prefix}_illness_5`, points: 6 },
  { label: '居宅療養：その他（疾病は比較的軽症であるが、定期的（週4日以上）に通院等を要するもの）', value: `${prefix}_illness_6`, points: 3 },
];

// 5 看護・介護（通院・通所の付添い含む）
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '病院・施設等付添い：週5日以上の付き添い介護', value: `${prefix}_care_0`, points: 9 },
  { label: '病院・施設等付添い：週4日以上の付き添い介護', value: `${prefix}_care_1`, points: 8 },
  { label: '病院・施設等付添い：週3日以上の付き添い介護', value: `${prefix}_care_2`, points: 7 },
  { label: '居宅内看護：同居親族の長期にわたる居宅療養等の介護に従事している場合', value: `${prefix}_care_3`, points: 7 },
  { label: '居宅内看護：心身障がい児看護（申込児童除く）', value: `${prefix}_care_4`, points: 7 },
];

// 6 災害復旧
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '災害（火災・風水害・地震等）の復旧にあたっている場合', value: `${prefix}_disaster_0`, points: 10 },
];

// 7 技能習得就学等（定時制・通信制は除く）
const schoolOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_school_none`, points: 0 },
  { label: '週4日以上。日中7時間以上の就学', value: `${prefix}_school_0`, points: 8 },
  { label: '週4日以上。日中3〜7時間の就学', value: `${prefix}_school_1`, points: 7 },
];

// 8 虐待やDV（家庭内暴力）
const dvOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_dv_none`, points: 0 },
  { label: '虐待やDV（家庭内暴力）により公的機関に相談している場合', value: `${prefix}_dv_0`, points: 10 },
];

// 9 その他（不存在）
const absentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_absent_none`, points: 0 },
  { label: '不存在（死亡、離婚、行方不明、その他の理由で父または母がいない場合）', value: `${prefix}_absent_0`, points: 10 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: '父母それぞれの基準指数を合算して世帯の基準指数を算出します',
    inputType: 'select',
    options: [
      { label: '労働（居宅外・自営・内職）', value: `${prefix}_reason_employment`, points: 0 },
      { label: '妊娠・出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '疾病・負傷・心身障がい', value: `${prefix}_reason_illness`, points: 0 },
      { label: '看護・介護', value: `${prefix}_reason_care`, points: 0 },
      { label: '災害復旧', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '技能習得就学等', value: `${prefix}_reason_school`, points: 0 },
      { label: '虐待やDV', value: `${prefix}_reason_dv`, points: 0 },
      { label: '不存在', value: `${prefix}_reason_absent`, points: 0 },
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
      inputType: 'radio',
      options: childbirthOptions(prefix),
    },
    {
      id: `${prefix}_illness`,
      category,
      label: `${parentLabel}の疾病・負傷・心身障がいの状況は？`,
      inputType: 'radio',
      options: illnessOptions(prefix),
    },
    {
      id: `${prefix}_care`,
      category,
      label: `${parentLabel}の看護・介護の状況は？`,
      inputType: 'radio',
      options: careOptions(prefix),
    },
    {
      id: `${prefix}_disaster`,
      category,
      label: `${parentLabel}は災害の復旧にあたっていますか？`,
      inputType: 'radio',
      options: disasterOptions(prefix),
    },
    {
      id: `${prefix}_school`,
      category,
      label: `${parentLabel}の就学の状況は？`,
      helpText: '定時制・通信制は除きます',
      inputType: 'radio',
      options: schoolOptions(prefix),
    },
    {
      id: `${prefix}_dv`,
      category,
      label: `${parentLabel}は虐待やDVにより公的機関に相談していますか？`,
      inputType: 'radio',
      options: dvOptions(prefix),
    },
    {
      id: `${prefix}_absent`,
      category,
      label: `${parentLabel}は不存在ですか？`,
      helpText: 'ひとり親の方は、いない側の保護者でこれを選びます（原典の備考6）',
      inputType: 'radio',
      options: absentOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// (2) 調整指数（該当する者には以下の指数を加減する）
const adjustmentQuestions: Question[] = [
  {
    id: 'adj_hoikushi',
    category: 'adjustment',
    label: '保護者が町内にある認可保育施設に保育士として就労しますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_hoikushi_0', points: 0 },
      { label: 'はい（+10）', value: 'adj_hoikushi_1', points: 10 },
    ],
  },
  {
    id: 'adj_dv',
    category: 'adjustment',
    label: '虐待やDVのおそれがある場合など、社会的擁護が必要ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_dv_0', points: 0 },
      { label: 'はい（+6）', value: 'adj_dv_1', points: 6 },
    ],
  },
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親世帯、両親不存在の世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_0', points: 0 },
      { label: 'はい（+5）', value: 'adj_single_parent_1', points: 5 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯（就労による自立支援につながる場合等）ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_0', points: 0 },
      { label: 'はい（+4）', value: 'adj_welfare_1', points: 4 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: '兄弟姉妹についてあてはまるものは？',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_sibling_0', points: 0 },
      { label: '現に兄弟姉妹が在園している園を希望している（+2）', value: 'adj_sibling_1', points: 2 },
      { label: '兄弟姉妹（多胎児を含む）が同一の保育園の利用を同時に希望する（+1）', value: 'adj_sibling_2', points: 1 },
    ],
  },
  {
    id: 'adj_return_to_work',
    category: 'adjustment',
    label: '育児休業についてあてはまるものは？',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_return_to_work_0', points: 0 },
      { label: '育児休暇取得により、一時退園し、育児休業明けに再入園の場合（+4）', value: 'adj_return_to_work_1', points: 4 },
      { label: '育児休業明けの場合（+2）', value: 'adj_return_to_work_2', points: 2 },
    ],
  },
  {
    id: 'adj_unemployed',
    category: 'adjustment',
    label: '主たる生計維持者である保護者が、倒産やリストラによる失職の事由により日々求職活動をしていますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unemployed_0', points: 0 },
      { label: 'はい（+3）', value: 'adj_unemployed_1', points: 3 },
    ],
  },
  {
    id: 'adj_chiikigata',
    category: 'adjustment',
    label: '地域型保育事業（小規模保育事業）の卒園児童ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_chiikigata_0', points: 0 },
      { label: 'はい（+2）', value: 'adj_chiikigata_1', points: 2 },
    ],
  },
  {
    id: 'adj_grandparent',
    category: 'adjustment',
    label: '申込児の祖父又は祖母等の親族等による保育が可能ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_grandparent_0', points: 0 },
      { label: 'はい（−3）', value: 'adj_grandparent_1', points: -3 },
    ],
  },
  {
    id: 'adj_in_town',
    category: 'adjustment',
    label: '現に浪江町内に居住している、又は入園までに居住しますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_in_town_0', points: 0 },
      { label: 'はい（+5）', value: 'adj_in_town_1', points: 5 },
    ],
  },
];

export const namieData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
