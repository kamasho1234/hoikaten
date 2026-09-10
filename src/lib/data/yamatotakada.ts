import type { MunicipalityData, Question } from '../types';

// -------------------------------------------------------------------------
// 大和高田市 保育園入園 利用調整基準データ
// 出典: 大和高田市「保育利用調整基準」（令和9年度）
// https://www.city.yamatotakada.nara.jp/material/files/group/28/chousei-kijun13.pdf
// -------------------------------------------------------------------------
// 大和高田市は原典に手順が書かれている。
//   「① 保護者それぞれの状況を、該当する『基本項目』のいずれかにより点数化します。
//    ② ①に、該当する『加減算項目』を加え、点数の高い子どもから順に利用を決定します。」
// 保護者それぞれに点数が付き、その合計で調整するため scoringMethod は 'sum'。
// 基本項目の最大は1人あたり100点。
// 「複数種類の保育理由が提出されている場合は、最も点数の高くなる保育理由で調整する」
// とあるため、事由ごとの設問は1つだけ選ぶ形にしている。
//
// 原典で数値を出していない項目は選択肢にしていない。
// - 基本項目「社会的擁護が必要」（—、個別に調整）
// - 加減算項目「入所児童の状態等を勘案し、施設への入所（園）が難しいと判断される場合」（—）
// - 加減算項目「保育料や給食費の滞納」（—、滞納額1,000円ごとに−2点で市と協議）
//   … 額によって決まるため、選択肢では表せない
//
// 「希望する保育所等に入所できない際に、育児休業の延長も許容できる場合」（−200）は、
// 実質的に選考の対象から外すための値で、点数の目安として見せると誤解を招くため入れていない。
// -------------------------------------------------------------------------

const municipality = {
  id: 'yamatotakada',
  name: '大和高田市',
  slug: 'yamatotakada',
  prefecture: '奈良県',
  maxBasePoints: 200, // 父母各100点の合計
  scoringMethod: 'sum',
} as const;

// 就労（内定を含む）
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '居宅外就労（雇用・自営）で週40時間以上（週5日かつ1日8時間以上等）', value: `${prefix}_employment_0`, points: 100 },
  { label: '居宅外就労（雇用・自営）で週35時間以上（週5日かつ1日7時間以上等）', value: `${prefix}_employment_1`, points: 95 },
  { label: '居宅外就労（雇用・自営）で週30時間以上（週5日かつ1日6時間以上等）', value: `${prefix}_employment_2`, points: 90 },
  { label: '居宅外就労（雇用・自営）で週25時間以上（週5日かつ1日5時間以上等）', value: `${prefix}_employment_3`, points: 85 },
  { label: '居宅外就労（雇用・自営）で週20時間以上（週4日かつ1日5時間以上等）', value: `${prefix}_employment_4`, points: 80 },
  { label: '居宅外就労（雇用・自営）で週15時間以上（週3日かつ1日5時間以上等）', value: `${prefix}_employment_5`, points: 75 },
  { label: '居宅外就労（雇用・自営）で週12時間以上（週3日かつ1日4時間以上等）', value: `${prefix}_employment_6`, points: 70 },
  { label: '居宅内就労（自営）で週40時間以上（週5日かつ1日8時間以上等）', value: `${prefix}_employment_7`, points: 100 },
  { label: '居宅内就労（自営）で週35時間以上（週5日かつ1日7時間以上等）', value: `${prefix}_employment_8`, points: 95 },
  { label: '居宅内就労（自営）で週30時間以上（週5日かつ1日6時間以上等）', value: `${prefix}_employment_9`, points: 90 },
  { label: '居宅内就労（自営）で週25時間以上（週5日かつ1日5時間以上等）', value: `${prefix}_employment_10`, points: 85 },
  { label: '居宅内就労（自営）で週20時間以上（週4日かつ1日5時間以上等）', value: `${prefix}_employment_11`, points: 80 },
  { label: '居宅内就労（自営）で週15時間以上（週3日かつ1日5時間以上等）', value: `${prefix}_employment_12`, points: 75 },
  { label: '居宅内就労（自営）で週12時間以上（週3日かつ1日4時間以上等）', value: `${prefix}_employment_13`, points: 70 },
  { label: '居宅内就労（内職）で週40時間以上（週5日かつ1日8時間以上等）', value: `${prefix}_employment_14`, points: 60 },
  { label: '居宅内就労（内職）で週35時間以上（週5日かつ1日7時間以上等）', value: `${prefix}_employment_15`, points: 55 },
  { label: '居宅内就労（内職）で週30時間以上（週5日かつ1日6時間以上等）', value: `${prefix}_employment_16`, points: 50 },
  { label: '居宅内就労（内職）で週25時間以上（週5日かつ1日5時間以上等）', value: `${prefix}_employment_17`, points: 45 },
  { label: '居宅内就労（内職）で週20時間以上（週4日かつ1日5時間以上等）', value: `${prefix}_employment_18`, points: 40 },
  { label: '居宅内就労（内職）で週15時間以上（週3日かつ1日5時間以上等）', value: `${prefix}_employment_19`, points: 35 },
  { label: '居宅内就労（内職）で週12時間以上（週3日かつ1日4時間以上等）', value: `${prefix}_employment_20`, points: 30 },
];

// 妊娠・出産
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '母の出産予定月の前2ヶ月〜後2ヶ月', value: `${prefix}_childbirth_0`, points: 80 },
];

// 保護者の疾病、負傷、障害
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院または自宅で治療や安静のため常に病臥している', value: `${prefix}_illness_0`, points: 100 },
  { label: '身体障害者手帳1〜2級／精神障害者保健福祉手帳1級／療育手帳Aで、保育が常時困難', value: `${prefix}_illness_1`, points: 100 },
  { label: '身体障害者手帳3級／精神障害者保健福祉手帳2級／療育手帳B1で、保育が著しく困難', value: `${prefix}_illness_2`, points: 80 },
  { label: '通院治療を行い、常に安静を要するなど、保育が困難', value: `${prefix}_illness_3`, points: 60 },
  { label: '上記を除き、身体障害者手帳・精神障害者保健福祉手帳・療育手帳の交付を受けていて保育が困難', value: `${prefix}_illness_4`, points: 50 },
  { label: '上記を除き、疾病などにより保育に支障がある', value: `${prefix}_illness_5`, points: 30 },
];

// 親族の介護・看護
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '介護・看護・付添いのため週40時間以上（週5日かつ1日8時間以上等）保育が困難', value: `${prefix}_care_0`, points: 80 },
  { label: '介護・看護・付添いのため週35時間以上（週5日かつ1日7時間以上等）保育が困難', value: `${prefix}_care_1`, points: 75 },
  { label: '介護・看護・付添いのため週30時間以上（週5日かつ1日6時間以上等）保育が困難', value: `${prefix}_care_2`, points: 70 },
  { label: '介護・看護・付添いのため週25時間以上（週5日かつ1日5時間以上等）保育が困難', value: `${prefix}_care_3`, points: 65 },
  { label: '介護・看護・付添いのため週20時間以上（週4日かつ1日5時間以上等）保育が困難', value: `${prefix}_care_4`, points: 60 },
  { label: '介護・看護・付添いのため週15時間以上（週3日かつ1日5時間以上等）保育が困難', value: `${prefix}_care_5`, points: 55 },
  { label: '介護・看護・付添いのため週12時間以上（週3日かつ1日4時間以上等）保育が困難', value: `${prefix}_care_6`, points: 50 },
];

// 災害復旧
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '震災・風水害・火災その他の災害により家屋の復旧に当たっている', value: `${prefix}_disaster_0`, points: 100 },
];

// 求職活動
const jobseekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動（3ヶ月以内の期限付き）', value: `${prefix}_jobseeking_0`, points: 10 },
];

// 就学
const schoolOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_school_none`, points: 0 },
  { label: '職業訓練校・専門学校・大学等で週40時間以上（週5日かつ1日8時間以上等）就学', value: `${prefix}_school_0`, points: 80 },
  { label: '職業訓練校・専門学校・大学等で週35時間以上（週5日かつ1日7時間以上等）就学', value: `${prefix}_school_1`, points: 75 },
  { label: '職業訓練校・専門学校・大学等で週30時間以上（週5日かつ1日6時間以上等）就学', value: `${prefix}_school_2`, points: 70 },
  { label: '職業訓練校・専門学校・大学等で週25時間以上（週5日かつ1日5時間以上等）就学', value: `${prefix}_school_3`, points: 65 },
  { label: '職業訓練校・専門学校・大学等で週20時間以上（週4日かつ1日5時間以上等）就学', value: `${prefix}_school_4`, points: 60 },
  { label: '職業訓練校・専門学校・大学等で週15時間以上（週3日かつ1日5時間以上等）就学', value: `${prefix}_school_5`, points: 55 },
  { label: '職業訓練校・専門学校・大学等で週12時間以上（週3日かつ1日4時間以上等）就学', value: `${prefix}_school_6`, points: 50 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: '複数の保育理由がある場合は、最も点数の高くなる保育理由で調整します',
    inputType: 'select',
    options: [
      { label: '就労（内定を含む）', value: `${prefix}_reason_employment`, points: 0 },
      { label: '妊娠・出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '保護者の疾病・負傷・障害', value: `${prefix}_reason_illness`, points: 0 },
      { label: '親族の介護・看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '災害復旧', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '求職活動', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '就学', value: `${prefix}_reason_school`, points: 0 },
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
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}の妊娠・出産の状況は？`,
      inputType: 'radio',
      options: childbirthOptions(prefix),
    },
    {
      id: `${prefix}_illness`,
      category,
      label: `${parentLabel}の疾病・負傷・障害の状況は？`,
      inputType: 'radio',
      options: illnessOptions(prefix),
    },
    {
      id: `${prefix}_care`,
      category,
      label: `${parentLabel}の親族の介護・看護の状況は？`,
      inputType: 'radio',
      options: careOptions(prefix),
    },
    {
      id: `${prefix}_disaster`,
      category,
      label: `${parentLabel}は災害復旧に当たっていますか？`,
      inputType: 'radio',
      options: disasterOptions(prefix),
    },
    {
      id: `${prefix}_jobseeking`,
      category,
      label: `${parentLabel}は求職活動をしていますか？`,
      helpText: '「就労予定申立書」による利用は3ヶ月間の期限付きです',
      inputType: 'radio',
      options: jobseekingOptions(prefix),
    },
    {
      id: `${prefix}_school`,
      category,
      label: `${parentLabel}の就学の状況は？`,
      inputType: 'radio',
      options: schoolOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// ＜加減算項目＞（複数選択可）
const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親家庭ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_0', points: 0 },
      { label: 'はい（+120）', value: 'adj_single_parent_1', points: 120 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯ですか？',
    helpText: '就労による自立支援につながる場合等が対象です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_0', points: 0 },
      { label: 'はい（+30）', value: 'adj_welfare_1', points: 30 },
    ],
  },
  {
    id: 'adj_sibling_enrolled',
    category: 'adjustment',
    label: '第一希望の施設にきょうだいがすでに在籍しており、新年度も継続して利用しますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_enrolled_0', points: 0 },
      { label: 'はい（+30）', value: 'adj_sibling_enrolled_1', points: 30 },
    ],
  },
  {
    id: 'adj_nursery_staff',
    category: 'adjustment',
    label: '保護者が大和高田市内の保育所・こども園で勤務する保育士等ですか？',
    helpText: '見込みの場合を含みます。この点数はフルタイム職員の場合で、パート職員は勤務時間によって調整されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_nursery_staff_0', points: 0 },
      { label: 'はい（+30）', value: 'adj_nursery_staff_1', points: 30 },
    ],
  },
  {
    id: 'adj_unemployed',
    category: 'adjustment',
    label: '生計維持者が会社都合により失職し、早急に就労する必要がありますか？',
    helpText: '失職した時期が令和8年8月1日以降であることが確認できる場合に限ります',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unemployed_0', points: 0 },
      { label: 'はい（+55）', value: 'adj_unemployed_1', points: 55 },
    ],
  },
  {
    id: 'adj_child_disability',
    category: 'adjustment',
    label: '入所（園）を希望する子どもに障害等がありますか？',
    helpText: '集団での保育が可能と認められる場合に限ります。診断書・障がい者手帳等で確認します',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_child_disability_0', points: 0 },
      { label: 'はい（+10）', value: 'adj_child_disability_1', points: 10 },
    ],
  },
  {
    id: 'adj_sibling_merge',
    category: 'adjustment',
    label: '異なる施設を利用しているきょうだいが、同じ施設の利用を申請しますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_merge_0', points: 0 },
      { label: 'はい（+10）', value: 'adj_sibling_merge_1', points: 10 },
    ],
  },
  {
    id: 'adj_tanshin',
    category: 'adjustment',
    label: '保護者の単身赴任等がありますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_tanshin_0', points: 0 },
      { label: 'はい（+10）', value: 'adj_tanshin_1', points: 10 },
    ],
  },
  {
    id: 'adj_preschool_children',
    category: 'adjustment',
    label: '就学前の子どもは何人いますか？',
    helpText: '妊娠中の場合を含みます。子どもの人数×5点です',
    inputType: 'radio',
    options: [
      { label: '1人（加算なし）', value: 'adj_preschool_children_0', points: 0 },
      { label: '2人（+10）', value: 'adj_preschool_children_1', points: 10 },
      { label: '3人（+15）', value: 'adj_preschool_children_2', points: 15 },
      { label: '4人以上（+20）', value: 'adj_preschool_children_3', points: 20 },
    ],
  },
  {
    id: 'adj_grandparent',
    category: 'adjustment',
    label: '65歳未満の祖父母が同居していますか？',
    helpText: '対象者数×−30点です。祖父母の保育理由証明書の提出があれば、適宜調整されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_grandparent_0', points: 0 },
      { label: '1人（−30）', value: 'adj_grandparent_1', points: -30 },
      { label: '2人（−60）', value: 'adj_grandparent_2', points: -60 },
    ],
  },
];

export const yamatotakadaData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
