import type { MunicipalityData, Question } from '../types';

// -------------------------------------------------------------------------
// 阿蘇市 保育園入園 利用調整基準データ
// 出典: 阿蘇市「利用調整基準（選考基準）」（入園のしおり 9〜10ページ）
// https://www.city.aso.kumamoto.jp/files/uploads/2023/08/riyoutyouseikizyun.pdf
// -------------------------------------------------------------------------
// 阿蘇市は原典の見出しに手順が書かれている。
//   「利用調整を行うにあたり、選考会議を開催し、次の（1）基本指数表及び
//    （2）調整指数表の合計指数の高い世帯の児童から優先順位を設定します。
//    合計指数が同一点数で並ぶ場合は、（3）同一指数時の順位表により
//    優先順位を設定します。」
// 原典は父母の合わせ方を書いていないため、
// 全国で最も多い形（父母それぞれの指数を合算）に合わせて scoringMethod は 'sum' とした。
//
// 就労は「就労日数等」（6〜10）と「就労時間等」（10〜15）の2つの細目に分かれていて、
// 同一指数時の順位表でも「3 就労日数」「4 就労時間」が別々に並ぶため、
// 就労を選んだ場合は日数と時間の両方を尋ねて合算している。
// 基本指数の最大は1人あたり25点（就労10＋15、疾病25、災害復旧25、虐待DV25）。
//
// 原典で指数が幅・準用でしか書かれていない項目は入れていない。
// - 就学等「就職に必要な技能習得のため学校、職業訓練施設等に通っている」（※1は就労1に準ずる）
//   就労の2つの細目のどちらを準用するかが読み取れないため。
// - その他「以上の保育が必要な事由に類するものとして市長が認める状態にある場合」（10〜25）
// - 調整指数「その他、特別な支援を要する世帯」（+1〜10）
//
// 「育児休業中」（15点）は「すでに保育施設を利用している子どもの継続」なので、
// いま園を利用している方の話として入れていない。
// -------------------------------------------------------------------------

const municipality = {
  id: 'aso',
  name: '阿蘇市',
  slug: 'aso',
  prefecture: '熊本県',
  maxBasePoints: 50, // 父母各25点の合計
  scoringMethod: 'sum',
} as const;

// 就労（就労日数等）
const workDaysOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_workdays_none`, points: 0 },
  { label: '月20日以上', value: `${prefix}_workdays_0`, points: 10 },
  { label: '月18日以上20日未満', value: `${prefix}_workdays_1`, points: 9 },
  { label: '月16日以上18日未満', value: `${prefix}_workdays_2`, points: 8 },
  { label: '月14日以上18日未満', value: `${prefix}_workdays_3`, points: 7 },
  { label: '月14日未満', value: `${prefix}_workdays_4`, points: 6 },
];

// 就労（就労時間等）
const workHoursOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_workhours_none`, points: 0 },
  { label: '月160時間以上', value: `${prefix}_workhours_0`, points: 15 },
  { label: '月140時間以上160時間未満', value: `${prefix}_workhours_1`, points: 14 },
  { label: '月120時間以上140時間未満', value: `${prefix}_workhours_2`, points: 13 },
  { label: '月100時間以上120時間未満', value: `${prefix}_workhours_3`, points: 12 },
  { label: '月80時間以上100時間未満', value: `${prefix}_workhours_4`, points: 11 },
  { label: '月64時間以上80時間未満', value: `${prefix}_workhours_5`, points: 10 },
];

// 妊娠出産
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産予定月の前後2か月以内', value: `${prefix}_childbirth_0`, points: 15 },
];

// 保護者の疾病・障がい等
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院1か月以上（予定も含む）', value: `${prefix}_illness_0`, points: 25 },
  { label: '居宅：自宅療養中で常時臥床（医師の証明による）', value: `${prefix}_illness_1`, points: 25 },
  { label: '身体障害者手帳1・2級、精神障害者保健福祉手帳1級、療育手帳A1・A2の交付を受けている', value: `${prefix}_illness_2`, points: 25 },
  { label: '居宅：精神性疾患（本人は自立しているが保育が困難、医師の証明添付）', value: `${prefix}_illness_3`, points: 20 },
  { label: '居宅：常時安静を要する場合（常時臥床を除く）', value: `${prefix}_illness_4`, points: 20 },
  { label: '身体障害者手帳3級、精神障害者保健福祉手帳2級、療育手帳B1の交付を受けている', value: `${prefix}_illness_5`, points: 20 },
  { label: '居宅：一般療養中（週3日以上の通院を常態）', value: `${prefix}_illness_6`, points: 17 },
  { label: '居宅：一般療養中（月4日以上、かつ週3日未満の通院を常態）', value: `${prefix}_illness_7`, points: 15 },
  { label: '身体障害者手帳4級以下、精神障害者保健福祉手帳3級、療育手帳B2の交付を受けている', value: `${prefix}_illness_8`, points: 15 },
  { label: '居宅：一般療養中（月1〜3日の通院を常態）', value: `${prefix}_illness_9`, points: 14 },
  { label: '居宅：その他', value: `${prefix}_illness_10`, points: 10 },
];

// 同居家族の介護看護等
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '居宅外：病院・施設等へ週5日以上の常時付き添い（最低4時間以上、土日除く）', value: `${prefix}_care_0`, points: 20 },
  { label: '居宅：常時介護が必要な場合（要介護5・4・3）', value: `${prefix}_care_1`, points: 20 },
  { label: '居宅：身体障害者手帳1・2級、精神障害者保健福祉手帳1級、療育手帳A1・A2', value: `${prefix}_care_2`, points: 20 },
  { label: '居宅外：病院・施設等へ週3日以上の常時付き添い（最低4時間以上、土日除く）', value: `${prefix}_care_3`, points: 15 },
  { label: '居宅：身体障害者手帳3級、精神障害者保健福祉手帳2級、療育手帳B1', value: `${prefix}_care_4`, points: 15 },
  { label: '居宅外：上記以外（医師の証明による）', value: `${prefix}_care_5`, points: 10 },
  { label: '居宅：身体障害者手帳4級以下、精神障害者保健福祉手帳3級、療育手帳B2', value: `${prefix}_care_6`, points: 10 },
  { label: '居宅：上記以外（医師の証明による）', value: `${prefix}_care_7`, points: 10 },
];

// 家庭の災害復旧
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '災害復旧のために保育を必要とする場合', value: `${prefix}_disaster_0`, points: 25 },
];

// 求職活動
const jobseekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動により保育を必要とする場合', value: `${prefix}_jobseeking_0`, points: 15 },
];

// 虐待・DV
const dvOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_dv_none`, points: 0 },
  { label: '虐待やDVのおそれがある場合など社会的養護が必要な場合', value: `${prefix}_dv_0`, points: 25 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    inputType: 'select',
    options: [
      { label: '就労', value: `${prefix}_reason_work`, points: 0 },
      { label: '妊娠出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '保護者の疾病・障がい等', value: `${prefix}_reason_illness`, points: 0 },
      { label: '同居家族の介護看護等', value: `${prefix}_reason_care`, points: 0 },
      { label: '家庭の災害復旧', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '求職活動', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '虐待・DV', value: `${prefix}_reason_dv`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_workdays`,
      category,
      label: `${parentLabel}の1か月の就労日数は？`,
      helpText: '阿蘇市の就労は「就労日数等」と「就労時間等」の合計です',
      inputType: 'radio',
      options: workDaysOptions(prefix),
      showFor: ['work'],
    },
    {
      id: `${prefix}_workhours`,
      category,
      label: `${parentLabel}の1か月の就労時間は？`,
      inputType: 'radio',
      options: workHoursOptions(prefix),
      showFor: ['work'],
    },
    {
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}の妊娠出産の状況は？`,
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
      label: `${parentLabel}の同居家族の介護看護の状況は？`,
      inputType: 'radio',
      options: careOptions(prefix),
    },
    {
      id: `${prefix}_disaster`,
      category,
      label: `${parentLabel}は家庭の災害復旧のために保育を必要としますか？`,
      inputType: 'radio',
      options: disasterOptions(prefix),
    },
    {
      id: `${prefix}_jobseeking`,
      category,
      label: `${parentLabel}は求職活動により保育を必要としますか？`,
      inputType: 'radio',
      options: jobseekingOptions(prefix),
    },
    {
      id: `${prefix}_dv`,
      category,
      label: `${parentLabel}の世帯に虐待やDVのおそれがありますか？`,
      inputType: 'radio',
      options: dvOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// （2）調整指数表
const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親家庭ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_0', points: 0 },
      { label: 'はい：祖父母と別居（+5）', value: 'adj_single_parent_1', points: 5 },
      { label: 'はい：祖父母と同居（敷地内別居を含む）（+2）', value: 'adj_single_parent_2', points: 2 },
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
    id: 'adj_unemployed',
    category: 'adjustment',
    label: '生活中心者の失業がありますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unemployed_0', points: 0 },
      { label: 'はい（+1）', value: 'adj_unemployed_1', points: 1 },
    ],
  },
  {
    id: 'adj_dv',
    category: 'adjustment',
    label: '虐待・DV等がありますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_dv_0', points: 0 },
      { label: 'はい（+5）', value: 'adj_dv_1', points: 5 },
    ],
  },
  {
    id: 'adj_child_disability',
    category: 'adjustment',
    label: '特別児童扶養手当を受給している児童がいますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_child_disability_0', points: 0 },
      { label: 'はい（+1）', value: 'adj_child_disability_1', points: 1 },
    ],
  },
  {
    id: 'adj_return_to_work',
    category: 'adjustment',
    label: '保護者が当該年度中に産後休暇又は育児休業等から復職しますか？',
    helpText: '育児休業と同等の場合を含みます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_return_to_work_0', points: 0 },
      { label: 'はい（2号認定）（+2）', value: 'adj_return_to_work_1', points: 2 },
      { label: 'はい（3号認定）（+1）', value: 'adj_return_to_work_2', points: 1 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: 'きょうだいの入所状況は？',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_sibling_0', points: 0 },
      { label: 'きょうだいがすでに入所中（+5）', value: 'adj_sibling_1', points: 5 },
      { label: 'きょうだいが同時に入所を希望（+3）', value: 'adj_sibling_2', points: 3 },
    ],
  },
  {
    id: 'adj_third_child',
    category: 'adjustment',
    label: '申込児童が第3子以降ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_third_child_0', points: 0 },
      { label: 'はい（+1）', value: 'adj_third_child_1', points: 1 },
    ],
  },
  {
    id: 'adj_reentry',
    category: 'adjustment',
    label: 'すでに保育施設を利用しており、里帰り出産や病気等の理由で退園し、当初利用していた保育施設に再度入園を希望しますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_reentry_0', points: 0 },
      { label: 'はい（+15）', value: 'adj_reentry_1', points: 15 },
    ],
  },
  {
    id: 'adj_hoikushi',
    category: 'adjustment',
    label: '管内の保育施設・認定こども園に従事することで、当該施設の受け入れ態勢に影響を与えますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_hoikushi_0', points: 0 },
      { label: 'はい（+15）', value: 'adj_hoikushi_1', points: 15 },
    ],
  },
  {
    id: 'adj_chiikigata',
    category: 'adjustment',
    label: '小規模保育事業、託児所、認可外保育施設等の卒園児童ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_chiikigata_0', points: 0 },
      { label: 'はい（+3）', value: 'adj_chiikigata_1', points: 3 },
    ],
  },
  {
    id: 'adj_no_parents',
    category: 'adjustment',
    label: '両親不存在ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_no_parents_0', points: 0 },
      { label: 'はい（+5）', value: 'adj_no_parents_1', points: 5 },
    ],
  },
  {
    id: 'adj_tanshin',
    category: 'adjustment',
    label: '父親又は母親が単身赴任している世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_tanshin_0', points: 0 },
      { label: 'はい（+2）', value: 'adj_tanshin_1', points: 2 },
    ],
  },
  {
    id: 'adj_parent_disability',
    category: 'adjustment',
    label: '父親又は母親が身体障がい者手帳1・2・3級、精神障がい者保健福祉手帳1・2・3級、療育手帳A1・A2・B1・B2を保持しており、申込要件が就労・就学ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_parent_disability_0', points: 0 },
      { label: 'はい（+1）', value: 'adj_parent_disability_1', points: 1 },
    ],
  },
  {
    id: 'adj_waiting',
    category: 'adjustment',
    label: '前年度申請したが、年度末時点で待機状態でしたか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_waiting_0', points: 0 },
      { label: 'はい（+3）', value: 'adj_waiting_1', points: 3 },
    ],
  },
  {
    id: 'adj_grandparent',
    category: 'adjustment',
    label: '同居（近隣）の祖父母等の補完的な保育が可能ですか？',
    helpText: '65歳以上又は就労・病気療養中の者は除きます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_grandparent_0', points: 0 },
      { label: 'はい（−3）', value: 'adj_grandparent_1', points: -3 },
    ],
  },
  {
    id: 'adj_other_preschool',
    category: 'adjustment',
    label: '申込児童以外の就学前児童を保護者（親族）が保育しますか？',
    helpText: '産後休暇中・育児休業中を除きます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_other_preschool_0', points: 0 },
      { label: 'はい（−2）', value: 'adj_other_preschool_1', points: -2 },
    ],
  },
  {
    id: 'adj_fee_delinquent',
    category: 'adjustment',
    label: '保育料を3か月以上滞納していますか？（卒園児を含む）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_fee_delinquent_0', points: 0 },
      { label: '市や施設への相談なく滞納（−5）', value: 'adj_fee_delinquent_1', points: -5 },
      { label: '上記以外で滞納（確約書等あり）（−2）', value: 'adj_fee_delinquent_2', points: -2 },
    ],
  },
];

export const asoData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
