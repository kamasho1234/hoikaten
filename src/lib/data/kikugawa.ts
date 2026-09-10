import type { MunicipalityData, Question } from '../types';

// -------------------------------------------------------------------------
// 菊川市 保育園入園 利用調整基準データ
// 出典: 菊川市「令和9年度 保育施設利用調整基準表」
// https://www.city.kikugawa.shizuoka.jp/kodomoseisaku/documents/reiwa9tennsuuhyou.pdf
// -------------------------------------------------------------------------
// 菊川市は原典の＜考え方＞に
// 「『基準点』『調整点①』『調整点②』を合算した『利用調整基準点』が高い順に入園内定を行います」
// とある。基準点は保護者の状況に付くもので、原典は父母の合わせ方を書いていないため、
// 全国で最も多い形（父母それぞれの点数を合算）に合わせて scoringMethod は 'sum' とした。
// 基準点の最大は1人あたり25点。
//
// 「同一の保護者が複数の区分に該当する場合は、高い点数を適用します」により、
// 事由ごとの設問は1つだけ選ぶ形にしている。
//
// 【調整点②】は祖父母の状態に付くもので、原典の作りが
// 「別居0／同居65歳以上0／同居65歳未満−5」＋
// 「同居65歳以上のとき、就労・疾病等が確認できれば加算」という2段になっている。
// この画面では祖父母の同居状況と、65歳以上のときの加算を別の設問にしている。
//
// 原典で数値を出していない項目は選択肢にしていない。
// - 基準点23「児童福祉の観点から、市長が特に保育の必要性が高いと判断した場合」（※）
//
// 調整点①23「申込児童の住所地が菊川市外の場合」（−20）は、
// 実質的に選考の対象から外すための値なので入れていない。
// -------------------------------------------------------------------------

const municipality = {
  id: 'kikugawa',
  name: '菊川市',
  slug: 'kikugawa',
  prefecture: '静岡県',
  maxBasePoints: 50, // 父母各25点の合計
  scoringMethod: 'sum',
} as const;

// 就労
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月180時間以上の就労を常態（休憩時間を含む）', value: `${prefix}_employment_0`, points: 20 },
  { label: '月160時間以上の就労を常態（休憩時間を含む）', value: `${prefix}_employment_1`, points: 19 },
  { label: '月140時間以上の就労を常態（休憩時間を含む）', value: `${prefix}_employment_2`, points: 18 },
  { label: '月120時間以上の就労を常態（休憩時間を含む）', value: `${prefix}_employment_3`, points: 17 },
  { label: '月100時間以上の就労を常態（休憩時間を含む）', value: `${prefix}_employment_4`, points: 16 },
  { label: '月64時間以上の就労を常態', value: `${prefix}_employment_5`, points: 15 },
  { label: '内職で月64時間以上の就労を状態', value: `${prefix}_employment_6`, points: 14 },
];

// 求職活動
const jobseekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動により家庭保育が困難', value: `${prefix}_jobseeking_0`, points: 10 },
];

// 出産
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産または出産準備、休養を要する期間', value: `${prefix}_childbirth_0`, points: 18 },
];

// 疾病・負傷／障がい
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '1ヵ月以上の入院または入院見込み、常時病臥の状態', value: `${prefix}_illness_0`, points: 20 },
  { label: '身体障害者手帳1〜2級／療育手帳A／精神障害者保健福祉手帳1〜2級', value: `${prefix}_illness_1`, points: 20 },
  { label: '精神性疾患、感染症疾患、難病指定の病気', value: `${prefix}_illness_2`, points: 18 },
  { label: '身体障害者手帳3級／療育手帳B／精神障害者保健福祉手帳3級', value: `${prefix}_illness_3`, points: 18 },
  { label: '上記以外で、1ヵ月以上の加療を要する', value: `${prefix}_illness_4`, points: 15 },
  { label: '身体障害者手帳4級以下', value: `${prefix}_illness_5`, points: 15 },
];

// 同居親族の看護
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '病院等の指示により、1ヵ月以上の付き添いが必要', value: `${prefix}_care_0`, points: 20 },
  { label: '要介護3〜5／身体障害者手帳1〜2級／療育手帳A／精神障害者保健福祉手帳1級／難病指定による病気の看護', value: `${prefix}_care_1`, points: 18 },
  { label: '要介護1〜2／身体障害者手帳3〜4級／療育手帳B／精神障害者保健福祉手帳2〜3級の看護', value: `${prefix}_care_2`, points: 15 },
  { label: '上記以外で、介護・看護が必要と認められるもの', value: `${prefix}_care_3`, points: 10 },
];

// 就学
const schoolOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_school_none`, points: 0 },
  { label: '学校等への就学（職業訓練校における職業訓練を含む）', value: `${prefix}_school_0`, points: 18 },
];

// 災害復旧
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '火災・地震・風水害等により被害を受け、その復旧作業に従事する', value: `${prefix}_disaster_0`, points: 25 },
];

// 不存在
const absentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_absent_none`, points: 0 },
  { label: '死亡・離別・行方不明・拘禁など', value: `${prefix}_absent_0`, points: 25 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: '同一の保護者が複数の区分に該当する場合は、高い点数を適用します',
    inputType: 'select',
    options: [
      { label: '就労', value: `${prefix}_reason_employment`, points: 0 },
      { label: '求職活動', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '疾病・負傷・障がい', value: `${prefix}_reason_illness`, points: 0 },
      { label: '同居親族の看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '就学', value: `${prefix}_reason_school`, points: 0 },
      { label: '災害復旧', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '不存在', value: `${prefix}_reason_absent`, points: 0 },
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
      id: `${prefix}_jobseeking`,
      category,
      label: `${parentLabel}は求職活動をしていますか？`,
      inputType: 'radio',
      options: jobseekingOptions(prefix),
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
      label: `${parentLabel}の疾病・負傷・障がいの状況は？`,
      inputType: 'radio',
      options: illnessOptions(prefix),
    },
    {
      id: `${prefix}_care`,
      category,
      label: `${parentLabel}の同居親族の看護の状況は？`,
      inputType: 'radio',
      options: careOptions(prefix),
    },
    {
      id: `${prefix}_school`,
      category,
      label: `${parentLabel}は就学していますか？`,
      inputType: 'radio',
      options: schoolOptions(prefix),
    },
    {
      id: `${prefix}_disaster`,
      category,
      label: `${parentLabel}は災害復旧に従事していますか？`,
      inputType: 'radio',
      options: disasterOptions(prefix),
    },
    {
      id: `${prefix}_absent`,
      category,
      label: `${parentLabel}は不存在ですか？`,
      inputType: 'radio',
      options: absentOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// 【調整点①】世帯の状況 ／【調整点②】祖父母の状態
const adjustmentQuestions: Question[] = [
  {
    id: 'adj_job_offer',
    category: 'adjustment',
    label: '就労内定者ですか？',
    helpText: '10/17以降の内定者は基準点数が1点減されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_job_offer_0', points: 0 },
      { label: 'はい（−1）', value: 'adj_job_offer_1', points: -1 },
    ],
  },
  {
    id: 'adj_household',
    category: 'adjustment',
    label: '世帯の状況は？',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_household_0', points: 0 },
      { label: '児童相談所等が緊急に保育の実施を必要と認めた（+10）', value: 'adj_household_1', points: 10 },
      { label: '生計中心者の失業（自主的失業は除く）により、就労の必要性が高い（+10）', value: 'adj_household_2', points: 10 },
      { label: '生活保護世帯（+10）', value: 'adj_household_3', points: 10 },
    ],
  },
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_0', points: 0 },
      { label: '親族等と非同居（+10）', value: 'adj_single_parent_1', points: 10 },
      { label: '親族等と同居（+8）', value: 'adj_single_parent_2', points: 8 },
      { label: '離婚調停中（+8）', value: 'adj_single_parent_3', points: 8 },
    ],
  },
  {
    id: 'adj_tanshin',
    category: 'adjustment',
    label: '保護者が単身赴任中ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_tanshin_0', points: 0 },
      { label: '祖父母等が非同居（+3）', value: 'adj_tanshin_1', points: 3 },
      { label: '祖父母等が同居（+2）', value: 'adj_tanshin_2', points: 2 },
    ],
  },
  {
    id: 'adj_tenure',
    category: 'adjustment',
    label: '申込前の同一事業所での就労期間が1年以上ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_tenure_0', points: 0 },
      { label: 'はい（+1）', value: 'adj_tenure_1', points: 1 },
    ],
  },
  {
    id: 'adj_leave_return',
    category: 'adjustment',
    label: '産休・育休明けの復職ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_leave_return_0', points: 0 },
      { label: '産休明け・育休明け予定者（+2）', value: 'adj_leave_return_1', points: 2 },
      { label: '産休・育休明けに正社員として復職される（産休・育休習得前に正社員である場合に限る）（+1）', value: 'adj_leave_return_2', points: 1 },
    ],
  },
  {
    id: 'adj_nursery_staff',
    category: 'adjustment',
    label: '保護者が保育士等ですか？',
    helpText: '復職時に限ります',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_nursery_staff_0', points: 0 },
      { label: '特定教育・保育施設等で勤務する保育士・幼稚園教諭・保育教諭（常勤または常勤に準ずる者）（+15）', value: 'adj_nursery_staff_1', points: 15 },
      { label: '特定教育・保育施設等で勤務する保育士・幼稚園教諭・保育教諭（上記以外）（+10）', value: 'adj_nursery_staff_2', points: 10 },
      { label: '市内の公営放課後児童クラブで就労する（+10）', value: 'adj_nursery_staff_3', points: 10 },
    ],
  },
  {
    id: 'adj_child_disability',
    category: 'adjustment',
    label: '児童等に障がいがありますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_child_disability_0', points: 0 },
      { label: '申込児童が身体障害者手帳等の交付を受けている（障害児保育実施施設に限る）（+5）', value: 'adj_child_disability_1', points: 5 },
      { label: '申込児童の兄弟姉妹が身体障害者手帳等の交付を受けている（+3）', value: 'adj_child_disability_2', points: 3 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: 'きょうだいの状況は？',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_sibling_0', points: 0 },
      { label: '3歳以上の多胎児またはきょうだいと同時に利用申請する（2歳児以下のみ適用）（+10）', value: 'adj_sibling_1', points: 10 },
      { label: '入所時に兄弟姉妹が同一園（1号認定含む）に在園している（+5）', value: 'adj_sibling_2', points: 5 },
      { label: '上記以外の多胎児またはきょうだいと同時に利用申請する（+5）', value: 'adj_sibling_3', points: 5 },
    ],
  },
  {
    id: 'adj_third_child',
    category: 'adjustment',
    label: '菊川市第3子保育料無償化・第3子副食費無償化制度に該当しますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_third_child_0', points: 0 },
      { label: 'はい（+5）', value: 'adj_third_child_1', points: 5 },
    ],
  },
  {
    id: 'adj_childcare_now',
    category: 'adjustment',
    label: '今の保育の状況は？',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_childcare_now_0', points: 0 },
      { label: '地域型保育事業利用児童が、受託年齢満了後、連携協定締結施設を希望する（+20）', value: 'adj_childcare_now_1', points: 20 },
      { label: '地域型保育事業利用児童が、受託年齢満了後、連携協定締結施設を希望しない（+10）', value: 'adj_childcare_now_2', points: 10 },
      { label: '市内認可外保育施設の閉鎖または認可施設への移行により、他の保育施設への入所を希望する（+5）', value: 'adj_childcare_now_3', points: 5 },
      { label: '保護者の就労等により、利用調整基準日以前から認可外保育施設等に預けている（+5）', value: 'adj_childcare_now_4', points: 5 },
      { label: 'きょうだい同園利用希望による、幼稚園・特定教育・保育施設・地域型保育事業実施施設からの転園（+3）', value: 'adj_childcare_now_5', points: 3 },
      { label: '菊川市の支給認定を受けた者で、市外の特定教育・保育施設、地域型保育事業実施施設からの転園（+3）', value: 'adj_childcare_now_6', points: 3 },
      { label: '市内認可保育所または認定こども園からの転園（−3）', value: 'adj_childcare_now_7', points: -3 },
    ],
  },
  {
    id: 'adj_fee_delinquent',
    category: 'adjustment',
    label: '保育料・一時保育利用料・放課後児童クラブ利用料を滞納していますか？',
    helpText: '卒園児も含みます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_fee_delinquent_0', points: 0 },
      { label: 'はい（−20）', value: 'adj_fee_delinquent_1', points: -20 },
    ],
  },
  {
    id: 'adj_grandparent',
    category: 'adjustment',
    label: '祖父母の同居状況は？（調整点②）',
    inputType: 'radio',
    options: [
      { label: '児童と別居している（0）', value: 'adj_grandparent_0', points: 0 },
      { label: '児童と同居しているが65歳以上（0）', value: 'adj_grandparent_1', points: 0 },
      { label: '児童と同居していて65歳未満（−5）', value: 'adj_grandparent_2', points: -5 },
    ],
  },
  {
    id: 'adj_grandparent_state',
    category: 'adjustment',
    label: '同居している65歳以上の祖父母の状態は？（調整点②の加算）',
    helpText: '同居していて65歳以上の場合に、添付資料で確認できる状況に応じて加算されます',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_grandparent_state_0', points: 0 },
      { label: '月140時間以上の就労を常態（休憩時間を含む）（+5）', value: 'adj_grandparent_state_1', points: 5 },
      { label: '1ヵ月以上の入院または入院見込み、常時病臥の状態（+5）', value: 'adj_grandparent_state_2', points: 5 },
      { label: '身体障害者手帳1〜2級／療育手帳A／精神障害者保健福祉手帳1〜2級（+5）', value: 'adj_grandparent_state_3', points: 5 },
      { label: '祖父母が要介護を受けている（+5）', value: 'adj_grandparent_state_4', points: 5 },
      { label: '月64時間以上の就労を状態（+3）', value: 'adj_grandparent_state_5', points: 3 },
      { label: '精神性疾患、感染症疾患、難病指定の病気（+3）', value: 'adj_grandparent_state_6', points: 3 },
      { label: '身体障害者手帳3級／療育手帳B／精神障害者保健福祉手帳3級（+3）', value: 'adj_grandparent_state_7', points: 3 },
      { label: '上記以外での就労を状態（+1）', value: 'adj_grandparent_state_8', points: 1 },
      { label: '求職活動中（+1）', value: 'adj_grandparent_state_9', points: 1 },
      { label: '上記以外で、1ヵ月以上の加療を要する（+1）', value: 'adj_grandparent_state_10', points: 1 },
      { label: '身体障害者手帳4級以下（+1）', value: 'adj_grandparent_state_11', points: 1 },
    ],
  },
];

export const kikugawaData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
