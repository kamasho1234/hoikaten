import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 可児市 保育園等入園調整基準表（基準指数・調整基準）データ
//
// 出典: 可児市こども課「保育園等入園調整基準表」（令和8年度入園申込）
//       https://www.city.kani.lg.jp/secure/18087/01-3nyuuennmousikomikijunn.pdf
//       （可児市Webサイト「令和8年度 幼稚園、保育所、認定こども園等の入園手続き」
//         https://www.city.kani.lg.jp/17130.htm からリンク）
//
// 2026-08-19: 従来のデータは他自治体と同じ点数配列のテンプレート（推定値）だったため、
//             上記の公式基準表を読み取って全面的に置き換えた。
//
// 原典の考え方:
//   「①〜⑦については認定理由に応じて基準指数を1つ選択。その後⑧の調整基準で加点・減点を行う」
//   「保護者A・Bそれぞれ①〜⑦の基準のうち、該当する基準指数を合算した値を世帯の基準指数とする」
//   「合計指数がマイナスとなった場合は、0点とする」
//   「①において複数就労している場合の類型は、主となる就労によって判断する（就労時間は合算）」
//
// 質問に含めていない原典の項目:
//   ・「遠方に住み、自身で保育することが不可能である場合は、認定理由によらず基準指数を10とする」
//     （認定理由に該当する必要はあるが、他の指数と置き換わる特例）
//   ・「両親不在、虐待、育児放棄、家庭内暴力、深夜交代勤務などの特殊要因は、入園の優先度、
//     園の延長時間の内容を別に考慮する」（点数ではない）
//   ・「希望する保育園等に入園できない場合は、育児休業の延長も許容できる場合」は合計指数が
//     0点になる（減点値ではないため数値化できない）
// ---------------------------------------------------------------------------

const municipality = {
  id: 'kani',
  name: '可児市',
  slug: 'kani',
  prefecture: '岐阜県',
  maxBasePoints: 20, // 保護者A・B各10点
} as const;

// ---------------------------------------------------------------------------
// ①〜⑦ 類型基準（保護者の状況）。保護者それぞれについて選ぶ
// ---------------------------------------------------------------------------

/** ① 居宅外労働・居宅内労働・内職 */
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '居宅外労働：1週あたりの就労時間が35時間以上', value: `${prefix}_employment_out_10`, points: 10 },
  { label: '居宅外労働：1週あたりの就労時間が25時間以上', value: `${prefix}_employment_out_8`, points: 8 },
  { label: '居宅外労働：1週あたりの就労時間が20時間以上', value: `${prefix}_employment_out_7`, points: 7 },
  { label: '居宅外労働：上記以外', value: `${prefix}_employment_out_6`, points: 6 },
  { label: '居宅内労働：1週あたりの就労時間が35時間以上', value: `${prefix}_employment_in_9`, points: 9 },
  { label: '居宅内労働：1週あたりの就労時間が25時間以上', value: `${prefix}_employment_in_7`, points: 7 },
  { label: '居宅内労働：1週あたりの就労時間が20時間以上', value: `${prefix}_employment_in_6`, points: 6 },
  { label: '居宅内労働：上記以外（内職を除く）', value: `${prefix}_employment_in_5`, points: 5 },
  { label: '内職が主となる就労である場合', value: `${prefix}_employment_naishoku_4`, points: 4 },
];

/** ② 妊娠・出産 */
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  {
    label: '医師の診断書等により、安静・加療が必要な場合',
    value: `${prefix}_childbirth_7`,
    points: 7,
  },
  { label: '出産予定日前3か月・産後2か月', value: `${prefix}_childbirth_5`, points: 5 },
];

/** ③ 疾病・障がい */
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '疾病：入院（1か月以上）', value: `${prefix}_illness_10`, points: 10 },
  {
    label: '疾病：常時臥床（医師が1か月以上の加療が必要と診断）',
    value: `${prefix}_illness_bedridden_10`,
    points: 10,
  },
  {
    label: '疾病：居宅療養の精神疾病（医師が1か月以上の加療が必要と診断）',
    value: `${prefix}_illness_mental_7`,
    points: 7,
  },
  {
    label: '疾病：一般療養（医師が1か月以上の通院が必要と診断し、保育ができない）',
    value: `${prefix}_illness_general_7`,
    points: 7,
  },
  { label: '障がい：1・2級またはA・B1判定', value: `${prefix}_illness_disability_10`, points: 10 },
  { label: '障がい：3級またはB2判定', value: `${prefix}_illness_disability_7`, points: 7 },
  { label: '障がい：4級', value: `${prefix}_illness_disability_5`, points: 5 },
];

/** ④ 傷病人の看護等 */
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  {
    label: '3か月以上の入院の付き添いに常時あたっている（月15日以上）',
    value: `${prefix}_care_8`,
    points: 8,
  },
  { label: '親族の病気等により、常時看護や介護にあたっている', value: `${prefix}_care_7`, points: 7 },
];

/** ⑤ 家庭の災害等 */
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '災害等で損失した居宅等の復旧にあたる場合', value: `${prefix}_disaster_10`, points: 10 },
];

/** ⑥ 就学・技能取得 */
const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '就学・技能取得のため保育ができない（1か月に60時間以上）', value: `${prefix}_education_7`, points: 7 },
];

/** ⑦ 求職活動 */
const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動を行う場合', value: `${prefix}_jobseeking_2`, points: 2 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者A' : '保護者B';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: '認定理由に応じて基準指数を1つ選びます',
    inputType: 'select',
    options: [
      { label: '働いている（居宅外・居宅内・内職）', value: `${prefix}_reason_employment`, points: 0 },
      { label: '妊娠・出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '疾病・障がいがある', value: `${prefix}_reason_illness`, points: 0 },
      { label: '傷病人の看護等をしている', value: `${prefix}_reason_care`, points: 0 },
      { label: '家庭が災害にあった', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '就学・技能取得をしている', value: `${prefix}_reason_education`, points: 0 },
      { label: '求職活動をしている', value: `${prefix}_reason_jobseeking`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の就労の状況は？`,
      helpText:
        '正規雇用・非常勤を問わず勤務時間で判定されます。同一敷地内での労働は別建物であっても居宅内労働として扱われます。複数就労している場合は主となる就労で類型を判断し、就労時間は合算します',
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
      helpText: '障がいは身体障害者手帳・精神障害者福祉手帳・療育手帳を所持する場合が対象です',
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
      id: `${prefix}_education`,
      category,
      label: `${parentLabel}は就学・技能取得をしていますか？`,
      inputType: 'radio',
      options: educationOptions(prefix),
    },
    {
      id: `${prefix}_jobseeking`,
      category,
      label: `${parentLabel}は求職活動をしていますか？`,
      inputType: 'radio',
      options: jobSeekingOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// ---------------------------------------------------------------------------
// ⑧ 調整基準
// ---------------------------------------------------------------------------

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_tanshin',
    category: 'adjustment',
    label: '単身赴任等で保護者の一人が別住所に住んでいますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_tanshin_no', points: 0 },
      { label: 'はい', value: 'adj_tanshin_yes', points: 1 },
    ],
  },
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親世帯ですか？',
    helpText: '死別・離別・行方不明・拘禁等を含みます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい', value: 'adj_single_parent_yes', points: 14 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい', value: 'adj_welfare_yes', points: 11 },
    ],
  },
  {
    id: 'adj_child_disability',
    category: 'adjustment',
    label: '申請に係るこどもが障がいを有していますか？',
    helpText: '手帳を所持している場合が対象です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_child_disability_no', points: 0 },
      { label: 'はい', value: 'adj_child_disability_yes', points: 3 },
    ],
  },
  {
    id: 'adj_transfer_in',
    category: 'adjustment',
    label: '市外からの転入者で、申込時点で保育所等を利用していますか？',
    helpText: '保育所等とは保育園・認定こども園・地域型保育事業所・職場の託児等を指します',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_transfer_in_no', points: 0 },
      { label: 'はい', value: 'adj_transfer_in_yes', points: 6 },
    ],
  },
  {
    id: 'adj_graduation',
    category: 'adjustment',
    label: '2歳児クラスまでの保育所等の卒園児で、間を空けず他の園へ入園を希望しますか？',
    helpText:
      '小規模保育施設の連携施設（家庭的保育事業等の設備及び運営に関する基準第6条第1項に定めのある、各園で確保した連携施設）を第1希望とする場合は7点になります',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_graduation_no', points: 0 },
      { label: 'はい', value: 'adj_graduation_6', points: 6 },
      { label: 'はい（小規模保育施設の連携施設を第1希望とする）', value: 'adj_graduation_7', points: 7 },
    ],
  },
  {
    id: 'adj_leave_return',
    category: 'adjustment',
    label: '育児休業の終了による復職ですか？',
    helpText:
      '育児休業をこれ以上延長できない場合、または育児休業からの復帰に伴い申込をしたが入所できないまま復帰して就労している場合は3点になります',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_leave_return_no', points: 0 },
      { label: 'はい', value: 'adj_leave_return_2', points: 2 },
      { label: 'はい（延長できない、または復帰済みで就労中）', value: 'adj_leave_return_3', points: 3 },
    ],
  },
  {
    id: 'adj_hoikushi',
    category: 'adjustment',
    label: '保護者が保育士・幼稚園教諭等として勤務（予定）ですか？',
    helpText: '勤務先が市内の保育所、幼稚園等の場合は7点になります',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_hoikushi_no', points: 0 },
      { label: 'はい（市外の施設）', value: 'adj_hoikushi_5', points: 5 },
      { label: 'はい（市内の保育所、幼稚園等）', value: 'adj_hoikushi_7', points: 7 },
    ],
  },
  {
    id: 'adj_arrears',
    category: 'adjustment',
    label: '正当な理由なく保育料・給食費を滞納していますか？',
    helpText: 'きょうだいの分を含みます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_arrears_no', points: 0 },
      { label: 'はい', value: 'adj_arrears_yes', points: -10 },
    ],
  },
  {
    id: 'adj_ukeire',
    category: 'adjustment',
    label: '前年度の利用調整で「受入態勢が整わない」として保留になりましたか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_ukeire_no', points: 0 },
      { label: 'はい', value: 'adj_ukeire_yes', points: 10 },
    ],
  },
  {
    id: 'adj_declined',
    category: 'adjustment',
    label: '一度内定した施設を自己都合で辞退しましたか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_declined_no', points: 0 },
      { label: 'はい', value: 'adj_declined_yes', points: -3 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: 'きょうだいの状況は？',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_sibling_no', points: 0 },
      { label: 'きょうだいが同じ園に在園している', value: 'adj_sibling_enrolled', points: 5 },
      { label: 'きょうだいで同じ園に同時に申し込む', value: 'adj_sibling_simultaneous', points: 4 },
    ],
  },
  {
    id: 'adj_no_income',
    category: 'adjustment',
    label: '保護者がいずれも就労しておらず、同居人もなく生計維持が困難ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_no_income_no', points: 0 },
      { label: 'はい', value: 'adj_no_income_yes', points: 10 },
    ],
  },
];

export const kaniData: MunicipalityData = {
  municipality,
  questions: [...buildParentQuestions(1), ...buildParentQuestions(2), ...adjustmentQuestions],
};
