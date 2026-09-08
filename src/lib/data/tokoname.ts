import type { MunicipalityData, Question } from '../types';

// -------------------------------------------------------------------------
// 常滑市 保育園入園 利用調整基準データ
// 出典: 常滑市「常滑市保育の必要性の認定基準指数表」（令和8年度〜）
// https://www.city.tokoname.aichi.jp/_res/projects/default_project/_page_/001/000/716/sisuuhyou2026.8.pdf
// -------------------------------------------------------------------------
// 常滑市は原典の冒頭に手順が書かれている。
//   「保護者のそれぞれの指数のうち低い方で指数①を決定し、
//    ②を加えた指数の高い順に入園できます。」
// 「低い方」により scoringMethod は 'min'。指数①の最大は10点。
// 「1〜8の番号の複数が該当する場合には、主たる項目で決定します」とあるため、
// 事由ごとの設問は1つだけ選ぶ形にしている。
//
// 常滑市は0.5刻みの指数を使う（保育士0.5、希望園に兄弟在園0.3など）。
// この画面の点数は整数でなくても扱えるので、原典の数をそのまま入れている。
//
// 原典で数値を出していない項目は選択肢にしていない。
// - 9「その他 1〜7に類する状況」（準用）
//
// 「入園年度に兄弟と同じ園に通う場合（本人を含む）」は「人数×0.5」なので、
// 人数で選ぶ形にしている。
//
// 次の2つは、いま園を利用している方が別の園に移る話で、
// これから入園を目指す方の点数とは性質が違うため入れていない。
// - 1「年度途中に育児休業から復帰する場合（転園のみ）」−1
// - 8「育児休業中で年度内に復帰しない場合（転園のみ）」3
// -------------------------------------------------------------------------

const municipality = {
  id: 'tokoname',
  name: '常滑市',
  slug: 'tokoname',
  prefecture: '愛知県',
  maxBasePoints: 10,
  scoringMethod: 'min',
} as const;

// 1 家庭外労働（自営業含む）／農漁業・就学 ／ 2 家庭内労働
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '家庭外労働：月20日以上かつ1日7.5時間以上', value: `${prefix}_employment_0`, points: 10 },
  { label: '家庭外労働：月120時間以上', value: `${prefix}_employment_1`, points: 9 },
  { label: '家庭外労働：月15日以上かつ1日4時間以上', value: `${prefix}_employment_2`, points: 7 },
  { label: '家庭外労働：月60時間以上', value: `${prefix}_employment_3`, points: 6 },
  { label: '家庭内労働（自営業・内職等）：月20日以上かつ1日7.5時間以上', value: `${prefix}_employment_4`, points: 10 },
  { label: '家庭内労働：月120時間以上', value: `${prefix}_employment_5`, points: 9 },
  { label: '家庭内労働：月15日以上かつ1日4時間以上', value: `${prefix}_employment_6`, points: 6 },
  { label: '家庭内労働：月60時間以上', value: `${prefix}_employment_7`, points: 5 },
  { label: '就労予定者（就労証明書提出者）', value: `${prefix}_employment_8`, points: 5 },
  { label: '起業準備中（証明書提出者・協力者含む）', value: `${prefix}_employment_9`, points: 3 },
  { label: '求職活動中', value: `${prefix}_employment_10`, points: 3 },
  { label: '内職、家族従業者（自営業主の家族で無給で従事）', value: `${prefix}_employment_11`, points: -2 },
];

// 3 出産
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産前8週間または出産後8週間', value: `${prefix}_childbirth_0`, points: 8 },
];

// 4 災害の復旧
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '災害の復旧', value: `${prefix}_disaster_0`, points: 10 },
];

// 5 病気・けが ／ 6 障がい等
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院1か月以上', value: `${prefix}_illness_0`, points: 10 },
  { label: '1・2級身体障害者手帳／療育手帳A／1級精神障害者保健福祉手帳', value: `${prefix}_illness_1`, points: 10 },
  { label: '入院1か月未満', value: `${prefix}_illness_2`, points: 8 },
  { label: '通院 月15日以上', value: `${prefix}_illness_3`, points: 7 },
  { label: '3・4級身体障害者手帳／療育手帳B・C／2・3級精神障害者保健福祉手帳', value: `${prefix}_illness_4`, points: 6 },
  { label: '通院 月15日未満（「保育が不可能」との医師の診断書が必要）', value: `${prefix}_illness_5`, points: 5 },
  { label: '自宅療養（「保育が不可能」との医師の診断書が必要）', value: `${prefix}_illness_6`, points: 4 },
  { label: '5・6級身体障害者手帳', value: `${prefix}_illness_7`, points: 4 },
];

// 7 病人介護
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '月20日以上付添または障がい児の通学付添', value: `${prefix}_care_0`, points: 8 },
  { label: '月15日以上付添または障がい児の通学付添', value: `${prefix}_care_1`, points: 6 },
  { label: '月15日以上寝たきり者付添', value: `${prefix}_care_2`, points: 4 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: '常滑市は保護者それぞれの指数のうち低い方で決めます。複数該当する場合は主たる項目で決定します',
    inputType: 'select',
    options: [
      { label: '労働（家庭外・家庭内・農漁業・就学）', value: `${prefix}_reason_employment`, points: 0 },
      { label: '出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '災害の復旧', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '病気・けが・障がい等', value: `${prefix}_reason_illness`, points: 0 },
      { label: '病人介護', value: `${prefix}_reason_care`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の労働の状況は？`,
      helpText: '家庭外労働の自営には株式会社および有限会社の事業者を含みます。農業は畑の耕作面積20アール以上で農産物の出荷を要し、漁業は漁業者の資格を要します',
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
      id: `${prefix}_disaster`,
      category,
      label: `${parentLabel}は災害の復旧にあたっていますか？`,
      inputType: 'radio',
      options: disasterOptions(prefix),
    },
    {
      id: `${prefix}_illness`,
      category,
      label: `${parentLabel}の病気・けが・障がいの状況は？`,
      helpText: '医師の診断書を要し、継続して入園するには毎年診断書の提出が必要です',
      inputType: 'radio',
      options: illnessOptions(prefix),
    },
    {
      id: `${prefix}_care`,
      category,
      label: `${parentLabel}の病人介護の状況は？`,
      inputType: 'radio',
      options: careOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// ② 加算・減算項目（複数該当可）
const adjustmentQuestions: Question[] = [
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護による被保護世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_0', points: 0 },
      { label: 'はい（+4）', value: 'adj_welfare_1', points: 4 },
    ],
  },
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親家庭ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_0', points: 0 },
      { label: 'はい（+4）', value: 'adj_single_parent_1', points: 4 },
    ],
  },
  {
    id: 'adj_abuse',
    category: 'adjustment',
    label: '虐待・DVの恐れがありますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_abuse_0', points: 0 },
      { label: 'はい（+4）', value: 'adj_abuse_1', points: 4 },
    ],
  },
  {
    id: 'adj_sibling_same',
    category: 'adjustment',
    label: '入園年度に兄弟と同じ園に通う人数は？（本人を含む）',
    helpText: '人数×0.5が加算されます',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_sibling_same_0', points: 0 },
      { label: '2人（+1）', value: 'adj_sibling_same_1', points: 1 },
      { label: '3人（+1.5）', value: 'adj_sibling_same_2', points: 1.5 },
      { label: '4人以上（+2）', value: 'adj_sibling_same_3', points: 2 },
    ],
  },
  {
    id: 'adj_sibling_enrolled',
    category: 'adjustment',
    label: '希望園に兄弟が在園中ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_enrolled_0', points: 0 },
      { label: 'はい（+0.3）', value: 'adj_sibling_enrolled_1', points: 0.3 },
    ],
  },
  {
    id: 'adj_rehome',
    category: 'adjustment',
    label: '育児休業のため退園したが、以前通っていた園に再度通いたいですか？',
    helpText: '就労の認定期間があった方のみが対象です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_rehome_0', points: 0 },
      { label: 'はい（+1）', value: 'adj_rehome_1', points: 1 },
    ],
  },
  {
    id: 'adj_graduate',
    category: 'adjustment',
    label: '地域型保育事業の卒園児ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_graduate_0', points: 0 },
      { label: 'はい（+1）', value: 'adj_graduate_1', points: 1 },
    ],
  },
  {
    id: 'adj_nursery_staff',
    category: 'adjustment',
    label: '常滑市内で保育士として勤務していますか？',
    helpText: '国の保育士確保政策により、当分の間、保育士が保育士として勤務する場合に加算が行われます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_nursery_staff_0', points: 0 },
      { label: '月20日以上かつ1日7.5時間以上勤務（+1）', value: 'adj_nursery_staff_1', points: 1 },
      { label: '月60時間以上勤務（+0.5）', value: 'adj_nursery_staff_2', points: 0.5 },
    ],
  },
  {
    id: 'adj_fee_delinquent',
    category: 'adjustment',
    label: '入園申込み時点で、保育料・給食費の滞納がありますか？',
    helpText: '生活保護世帯は除きます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_fee_delinquent_0', points: 0 },
      { label: 'はい（−2）', value: 'adj_fee_delinquent_1', points: -2 },
    ],
  },
];

export const tokonameData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
