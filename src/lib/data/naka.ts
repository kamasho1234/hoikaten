import type { MunicipalityData, Question } from '../types';

// -------------------------------------------------------------------------
// 那珂市 保育園入園 利用調整基準データ
// 出典: 那珂市「那珂市保育所入所選考基準表」
// https://www.city.naka.lg.jp/data/doc/1758895270_doc_660_0.pdf
// -------------------------------------------------------------------------
// 那珂市は原典の【算定方法】に手順が書かれている。
//   「選考点は、『A. 基準点』及び『B. 調整点』を合算した点数とする。」
//   「基準点は、父、母それぞれに配点し、合算した点数を基準点とする。
//    該当する類型（1〜9）が複数ある場合には、点数の高い類型で認定する。」
// これにより scoringMethod は 'sum'。基準点の最大は1人あたり20点。
//
// 就労には「②労働調整点」があり、就労内定の場合は減点される
// （正社員・契約社員 −2、パート・アルバイト等 −4）。
// 就労の指数とは別に加減するものなので、調整の設問として持たせている。
//
// 原典に「育児休業中のかたで、『入所できない場合は育児休業の延長も許容できる』と
// 意思表示があったかたは、基準点・調整点ともに加点しない」とある。
// これは点数の加減ではなく選考の扱いを決める文なので、選択肢にしていない。
//
// 調整点で、原典が同じ内容に複数の点数を並べていて条件が読み取れないものは、
// いちばん低い点数だけを選択肢にしている（原典の値を超えて見せないため）。
// - 7. 認可外保育施設等を利用（+15／+10／+5）
// - 22. 入所希望児童と兄弟姉妹同時入所申込み（+5／+15）
// - 26. 保護者が管内認可保育施設等に就労（+30／+10／+4）
// - 27. 保護者が管外認可保育施設等に保育士として就労（+10／+4）
// - 31. 特に緊急の入所を必要とする家庭（+70／+50）
// -------------------------------------------------------------------------

const municipality = {
  id: 'naka',
  name: '那珂市',
  slug: 'naka',
  prefecture: '茨城県',
  maxBasePoints: 40, // 父母各20点の合計
  scoringMethod: 'sum',
} as const;

// 1. 就労（月64時間以上を常態とする。採用予定を含む）
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月160時間以上', value: `${prefix}_employment_0`, points: 20 },
  { label: '月150時間以上160時間未満', value: `${prefix}_employment_1`, points: 19 },
  { label: '月140時間以上150時間未満', value: `${prefix}_employment_2`, points: 18 },
  { label: '月130時間以上140時間未満', value: `${prefix}_employment_3`, points: 17 },
  { label: '月120時間以上130時間未満', value: `${prefix}_employment_4`, points: 16 },
  { label: '月110時間以上120時間未満', value: `${prefix}_employment_5`, points: 15 },
  { label: '月100時間以上110時間未満', value: `${prefix}_employment_6`, points: 14 },
  { label: '月90時間以上100時間未満', value: `${prefix}_employment_7`, points: 13 },
  { label: '月80時間以上90時間未満', value: `${prefix}_employment_8`, points: 12 },
  { label: '月64時間以上80時間未満', value: `${prefix}_employment_9`, points: 11 },
];

// 2. 妊娠・出産
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産予定日の56日前（多胎妊娠は98日前）の月初から、産後56日を経過する日の翌日の月末まで', value: `${prefix}_childbirth_0`, points: 20 },
];

// 3. 疾病・障がい
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: 'おおむね1月以上の入院加療を要すると診断された', value: `${prefix}_illness_0`, points: 20 },
  { label: '身体障害者手帳1・2級／療育手帳Ⓐ・A・1・2級（または専門機関により同程度と診断）', value: `${prefix}_illness_1`, points: 20 },
  { label: 'おおむね1ヵ月以上の常時臥床を要すると診断された', value: `${prefix}_illness_2`, points: 18 },
  { label: '身体障害者手帳3級／療育手帳B', value: `${prefix}_illness_3`, points: 18 },
  { label: 'おおむね3ヵ月以上の加療（安静）を要すると診断された', value: `${prefix}_illness_4`, points: 16 },
  { label: '精神障害者保健福祉手帳を所持（4級以下・C・3級）', value: `${prefix}_illness_5`, points: 15 },
  { label: 'おおむね1ヵ月〜3ヵ月の加療（安静）を要すると診断された', value: `${prefix}_illness_6`, points: 14 },
];

// 4. 介護・看護
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '週40時間以上の介護（看護）を常態とする（月160時間以上）', value: `${prefix}_care_0`, points: 20 },
  { label: '週35時間以上40時間未満の介護（看護）を常態とする（月140〜160時間未満）', value: `${prefix}_care_1`, points: 18 },
  { label: '週30時間以上35時間未満の介護（看護）を常態とする（月120〜140時間未満）', value: `${prefix}_care_2`, points: 16 },
  { label: '週25時間以上30時間未満の介護（看護）を常態とする（月100〜120時間未満）', value: `${prefix}_care_3`, points: 14 },
  { label: '週20時間以上25時間未満の介護（看護）を常態とする（月80〜100時間未満）', value: `${prefix}_care_4`, points: 12 },
  { label: '週16時間以上20時間未満の介護（看護）を常態とする（月64〜80時間未満）', value: `${prefix}_care_5`, points: 11 },
];

// 5. 災害復旧
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '震災・風水害・火災・その他の災害の復旧にあたっている', value: `${prefix}_disaster_0`, points: 20 },
];

// 6. 求職活動中
const jobseekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職中のため日中外出する（起業準備を含む）', value: `${prefix}_jobseeking_0`, points: 5 },
  { label: '入所後探す。現在探していない', value: `${prefix}_jobseeking_1`, points: 0 },
];

// 7. 就学・職業訓練
const schoolOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_school_none`, points: 0 },
  { label: '月160時間以上', value: `${prefix}_school_0`, points: 18 },
  { label: '月140時間以上160時間未満', value: `${prefix}_school_1`, points: 16 },
  { label: '月120時間以上140時間未満', value: `${prefix}_school_2`, points: 14 },
  { label: '月90時間以上120時間未満', value: `${prefix}_school_3`, points: 12 },
  { label: '月64時間以上90時間未満', value: `${prefix}_school_4`, points: 10 },
];

// 8. 虐待・DV
const abuseOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_abuse_none`, points: 0 },
  { label: '児童虐待を行っている、または再び行われるおそれがあると認められる', value: `${prefix}_abuse_0`, points: 20 },
  { label: 'DV被害のため家庭内保育が困難であると認められる', value: `${prefix}_abuse_1`, points: 20 },
];

// 9. 不存在該当者
const absentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_absent_none`, points: 0 },
  { label: '死亡・離別・離婚調停中・行方不明・拘禁・未婚', value: `${prefix}_absent_0`, points: 20 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: '那珂市は父母それぞれに配点し、合算した点数を基準点にします。複数該当する場合は点数の高い類型で認定します',
    inputType: 'select',
    options: [
      { label: '就労', value: `${prefix}_reason_employment`, points: 0 },
      { label: '妊娠・出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '疾病・障がい', value: `${prefix}_reason_illness`, points: 0 },
      { label: '介護・看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '災害復旧', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '求職活動中', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '就学・職業訓練', value: `${prefix}_reason_school`, points: 0 },
      { label: '虐待・DV', value: `${prefix}_reason_abuse`, points: 0 },
      { label: '不存在該当者', value: `${prefix}_reason_absent`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の就労の状況は？`,
      helpText: '月あたりの労働時間（休憩時間含む）です。月64時間以上を常態とすることが条件です',
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
      inputType: 'radio',
      options: illnessOptions(prefix),
    },
    {
      id: `${prefix}_care`,
      category,
      label: `${parentLabel}の介護・看護の状況は？`,
      helpText: '120時間未満は「保育短時間」の認定になります',
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
      label: `${parentLabel}は求職活動中ですか？`,
      helpText: '利用開始月の属する月から3カ月間が認定期間です',
      inputType: 'radio',
      options: jobseekingOptions(prefix),
    },
    {
      id: `${prefix}_school`,
      category,
      label: `${parentLabel}の就学・職業訓練の状況は？`,
      inputType: 'radio',
      options: schoolOptions(prefix),
    },
    {
      id: `${prefix}_abuse`,
      category,
      label: `${parentLabel}：虐待やDVのおそれがありますか？`,
      inputType: 'radio',
      options: abuseOptions(prefix),
    },
    {
      id: `${prefix}_absent`,
      category,
      label: `${parentLabel}は不存在該当者ですか？`,
      inputType: 'radio',
      options: absentOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// 【B. 調整点（家庭の状況等に係る点数）】
const adjustmentQuestions: Question[] = [
  {
    id: 'adj_job_offer',
    category: 'adjustment',
    label: '就労内定ですか？（労働調整点）',
    helpText: '基準点が就労の場合に、就労内定だと減点されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_job_offer_0', points: 0 },
      { label: '正社員・契約社員として内定（−2）', value: 'adj_job_offer_1', points: -2 },
      { label: 'パート・アルバイト等として内定（−4）', value: 'adj_job_offer_2', points: -4 },
    ],
  },
  {
    id: 'adj_childcare_now',
    category: 'adjustment',
    label: '申込児童は今どのように保育されていますか？',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_childcare_now_0', points: 0 },
      { label: '産休・育休復帰時に入所できず、認可外保育施設等を利用しながら就労している（+20）', value: 'adj_childcare_now_1', points: 20 },
      { label: '利用中の保育施設等の継続利用ができない（+15）', value: 'adj_childcare_now_2', points: 15 },
      { label: '企業内託児所を利用（+15）', value: 'adj_childcare_now_3', points: 15 },
      { label: '認可外保育施設等を利用（+5）', value: 'adj_childcare_now_4', points: 5 },
      { label: '父または母が仕事をしながら保育している（居宅外へ同伴就労、リモートワーク含む）（+5）', value: 'adj_childcare_now_5', points: 5 },
      { label: '本市に在住もしくは転入予定で、他市町村の認可保育施設を利用中（+5）', value: 'adj_childcare_now_6', points: 5 },
    ],
  },
  {
    id: 'adj_leave_return',
    category: 'adjustment',
    label: '産休・育児休業明けですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_leave_return_0', points: 0 },
      { label: 'はい（+20）', value: 'adj_leave_return_1', points: 20 },
    ],
  },
  {
    id: 'adj_graduate',
    category: 'adjustment',
    label: '地域型保育事業所を卒園後の入所希望ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_graduate_0', points: 0 },
      { label: '連携施設への入所希望（+100）', value: 'adj_graduate_1', points: 100 },
      { label: '連携施設以外への入所希望（+30）', value: 'adj_graduate_2', points: 30 },
    ],
  },
  {
    id: 'adj_grandparent',
    category: 'adjustment',
    label: '祖父母の状況は？',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_grandparent_0', points: 0 },
      { label: '祖父母の居住先が離れている（+3）', value: 'adj_grandparent_1', points: 3 },
      { label: '市内在住の満65歳未満で無職の健康な祖父母がいる（−4）', value: 'adj_grandparent_2', points: -4 },
    ],
  },
  {
    id: 'adj_household',
    category: 'adjustment',
    label: '家庭の状況は？',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_household_0', points: 0 },
      { label: '保護者（父母共）の不在（+30）', value: 'adj_household_1', points: 30 },
      { label: 'ひとり親世帯（母子・父子）（+20）', value: 'adj_household_2', points: 20 },
      { label: '準ひとり親世帯（母子・父子）（+15）', value: 'adj_household_3', points: 15 },
      { label: '父または母が単身赴任中（+10）', value: 'adj_household_4', points: 10 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_0', points: 0 },
      { label: 'はい（+13）', value: 'adj_welfare_1', points: 13 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: '兄弟姉妹の状況は？',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_sibling_0', points: 0 },
      { label: '入所希望児童が兄弟姉妹と同じ認可保育施設へ転園希望（+30）', value: 'adj_sibling_1', points: 30 },
      { label: '入所希望児童を除く兄弟姉妹が認可保育施設を利用中（+24）', value: 'adj_sibling_2', points: 24 },
      { label: '一時退園し、再度同じ認可保育施設を利用希望（+24）', value: 'adj_sibling_3', points: 24 },
      { label: '入所希望児童を除く兄弟姉妹が幼稚園等の預かり保育等を利用中または利用予定（+20）', value: 'adj_sibling_4', points: 20 },
      { label: '入所希望児童と兄弟姉妹同時入所申込み（+5）', value: 'adj_sibling_5', points: 5 },
      { label: '入所希望児童を除く兄弟姉妹が幼稚園等の預かり保育を使用しない（−5）', value: 'adj_sibling_6', points: -5 },
      { label: '入所希望児童を除く兄弟姉妹が家庭で保育されている（−10）', value: 'adj_sibling_7', points: -10 },
    ],
  },
  {
    id: 'adj_unemployed',
    category: 'adjustment',
    label: '保護者が非自発的な理由により失業しましたか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unemployed_0', points: 0 },
      { label: 'はい（+10）', value: 'adj_unemployed_1', points: 10 },
    ],
  },
  {
    id: 'adj_nursery_staff',
    category: 'adjustment',
    label: '保護者が認可保育施設等に就労していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_nursery_staff_0', points: 0 },
      { label: '管内の認可保育施設等に就労（+4）', value: 'adj_nursery_staff_1', points: 4 },
      { label: '管外の認可保育施設等に保育士として就労（+4）', value: 'adj_nursery_staff_2', points: 4 },
    ],
  },
  {
    id: 'adj_child_disability',
    category: 'adjustment',
    label: '入所希望の児童に障がい等がありますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_child_disability_0', points: 0 },
      { label: '障がい等や疾病により特定の保育施設等を希望（+50）', value: 'adj_child_disability_1', points: 50 },
      { label: '障がいを有するまたは疑いがあり、専門医が集団保育を推奨する（+10）', value: 'adj_child_disability_2', points: 10 },
      { label: '身体障害者手帳・療育手帳・精神障害者保健福祉手帳を所持、特別児童扶養手当を受給（+10）', value: 'adj_child_disability_3', points: 10 },
    ],
  },
  {
    id: 'adj_urgent',
    category: 'adjustment',
    label: '特に緊急の入所を必要とする家庭ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_urgent_0', points: 0 },
      { label: 'はい（+50）', value: 'adj_urgent_1', points: 50 },
    ],
  },
  {
    id: 'adj_fee_delinquent',
    category: 'adjustment',
    label: '保育料を正当な理由なく滞納していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_fee_delinquent_0', points: 0 },
      { label: 'はい（−20）', value: 'adj_fee_delinquent_1', points: -20 },
    ],
  },
];

export const nakaData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
