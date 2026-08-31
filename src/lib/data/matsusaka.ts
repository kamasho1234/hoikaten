import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 松阪市 保育園入園 基本点数・調整指数データ
//
// 出典: 松阪市「松阪市保育園利用調整基準表」より
//       基本点数表 https://www.city.matsusaka.mie.jp/uploaded/attachment/97789.pdf
//       調整指数表 https://www.city.matsusaka.mie.jp/uploaded/attachment/97790.pdf
//       （松阪市公式ホームページ「松阪市保育園・認定こども園（保育園部）入園基準について」からリンク）
//
// 2026-08-19: 従来のデータは県の標準的な点数配列に合わせただけの推定値テンプレートだったため、
//             上記の公式点数表を読み取って全面的に置き換えた。
//
// 松阪市は**該当する項目の点数を加算する**方式で、就労は「就労時間＋就労形態」、
// 病気は「入院＋日常生活能力の程度＋保育可能の程度」を足し合わせる。
// そのため就労形態・日常生活能力・保育可能の程度をそれぞれ別の質問にしている。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'matsusaka',
  name: '松阪市',
  slug: 'matsusaka',
  prefecture: '三重県',
  maxBasePoints: 50, // 父母各25点（社会的養護に該当する場合は基本点数25点）
} as const;

// ---------------------------------------------------------------------------
// 基本点数表
// ---------------------------------------------------------------------------

/** 1 就労（内職等を含む）の時間 */
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月175時間以上の就労', value: `${prefix}_employment_10`, points: 10 },
  { label: '月155時間以上175時間未満の就労', value: `${prefix}_employment_9`, points: 9 },
  { label: '月120時間以上155時間未満の就労', value: `${prefix}_employment_8`, points: 8 },
  { label: '月106時間以上120時間未満の就労', value: `${prefix}_employment_7`, points: 7 },
  { label: '月92時間以上106時間未満の就労', value: `${prefix}_employment_6`, points: 6 },
  { label: '月78時間以上92時間未満の就労', value: `${prefix}_employment_5`, points: 5 },
  { label: '月64時間以上78時間未満の就労', value: `${prefix}_employment_4`, points: 4 },
];

/** 1 就労形態（就労時間に加算する） */
const employmentTypeOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_emptype_none`, points: 0 },
  { label: '被雇用者（会社員等）または自営業者', value: `${prefix}_emptype_2`, points: 2 },
  { label: 'その他（内職等）', value: `${prefix}_emptype_0`, points: 0 },
];

/** 2 妊娠・出産 */
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産前後で保育できない', value: `${prefix}_childbirth_10`, points: 10 },
];

/** 3 病気・疾病・障がい（入院） */
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '治療のため入院（1か月以上にわたると見込まれる）', value: `${prefix}_illness_7`, points: 7 },
];

/** 3 日常生活能力の程度（加算する） */
const dailyLifeOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_dailylife_none`, points: 0 },
  { label: '要他者援助（常時介護）', value: `${prefix}_dailylife_6`, points: 6 },
  { label: '要他者援助（生活の大半）', value: `${prefix}_dailylife_4`, points: 4 },
  { label: '要他者援助（部分的）', value: `${prefix}_dailylife_3`, points: 3 },
  { label: '日常生活や社会生活上の一定の制限', value: `${prefix}_dailylife_1`, points: 1 },
];

/** 3 保育可能の程度（加算する） */
const careAbilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_careability_none`, points: 0 },
  { label: '保育不可能', value: `${prefix}_careability_5`, points: 5 },
  { label: '部分保育可能', value: `${prefix}_careability_3`, points: 3 },
];

/** 4 親族の介護 */
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '月120時間以上の常時介護・看護、または週5日以上の付添い', value: `${prefix}_care_8`, points: 8 },
  { label: '月106時間以上120時間未満の介護・看護・付添い', value: `${prefix}_care_7`, points: 7 },
  { label: '月92時間以上106時間未満の介護・看護・付添い', value: `${prefix}_care_6`, points: 6 },
  { label: '月78時間以上92時間未満の介護・看護・付添い', value: `${prefix}_care_5`, points: 5 },
  { label: '月64時間以上78時間未満の介護・看護・付添い', value: `${prefix}_care_4`, points: 4 },
];

/** 6 就学 */
const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '月160時間以上の就学', value: `${prefix}_education_9`, points: 9 },
  { label: '月140時間以上160時間未満の就学', value: `${prefix}_education_8`, points: 8 },
  { label: '月120時間以上140時間未満の就学', value: `${prefix}_education_7`, points: 7 },
  { label: '月100時間以上120時間未満の就学', value: `${prefix}_education_6`, points: 6 },
  { label: '月92時間以上100時間未満の就学', value: `${prefix}_education_5`, points: 5 },
  { label: '月78時間以上92時間未満の就学', value: `${prefix}_education_4`, points: 4 },
  { label: '月64時間以上78時間未満の就学', value: `${prefix}_education_3`, points: 3 },
];

/** 7 求職活動 */
const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動中・起業準備中', value: `${prefix}_jobseeking_3`, points: 3 },
];

/** 5・8 その他（災害復旧・不存在・社会的養護） */
const otherOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_other_none`, points: 0 },
  { label: '社会的養護が必要（虐待・DV・育児放棄等）', value: `${prefix}_other_25`, points: 25 },
  { label: '不存在（死亡・離婚・行方不明・未婚・拘禁等）', value: `${prefix}_other_13`, points: 13 },
  { label: '住家の災害（火災・風水害・地震等）の復旧にあたっている', value: `${prefix}_other_12`, points: 12 },
];

// ---------------------------------------------------------------------------
// 保護者ごとの質問を生成するヘルパー
// ---------------------------------------------------------------------------

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
      { label: '仕事をしている（内職等を含む）', value: `${prefix}_reason_employment`, points: 0 },
      { label: '仕事を探している', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '妊娠・出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '病気・障がいがある', value: `${prefix}_reason_illness`, points: 0 },
      { label: '親族を介護している', value: `${prefix}_reason_care`, points: 0 },
      { label: '学校に通っている', value: `${prefix}_reason_education`, points: 0 },
      { label: 'その他（災害復旧・不存在・社会的養護）', value: `${prefix}_reason_other`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}はどのくらい働いていますか？`,
      helpText: '月あたりの就労時間を選んでください',
      inputType: 'radio',
      options: employmentOptions(prefix),
    },
    {
      id: `${prefix}_emptype`,
      category,
      // 就労時間の点数に就労形態の点数を加算する
      showFor: ['employment'],
      label: `${parentLabel}の就労形態は？`,
      helpText: '就労時間の点数に加算されます',
      inputType: 'radio',
      options: employmentTypeOptions(prefix),
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
      label: `${parentLabel}の出産時期は？`,
      inputType: 'radio',
      options: childbirthOptions(prefix),
    },
    {
      id: `${prefix}_illness`,
      category,
      label: `${parentLabel}は治療のため入院していますか？`,
      helpText: '1か月以上にわたると見込まれる入院が対象です',
      inputType: 'radio',
      options: illnessOptions(prefix),
    },
    {
      id: `${prefix}_dailylife`,
      category,
      // 病気・障がいの点数に日常生活能力の程度を加算する
      showFor: ['illness'],
      label: `${parentLabel}の日常生活能力の程度は？`,
      helpText: '入院の点数に加算されます',
      inputType: 'radio',
      options: dailyLifeOptions(prefix),
    },
    {
      id: `${prefix}_careability`,
      category,
      showFor: ['illness'],
      label: `${parentLabel}はお子さんの保育がどの程度できますか？`,
      helpText: '病気・障がいの点数に加算されます',
      inputType: 'radio',
      options: careAbilityOptions(prefix),
    },
    {
      id: `${prefix}_care`,
      category,
      label: `${parentLabel}はどのくらい親族を介護・看護していますか？`,
      helpText: '入院・通院・通所の付添いを含みます（送迎サービスは除く）',
      inputType: 'radio',
      options: careOptions(prefix),
    },
    {
      id: `${prefix}_education`,
      category,
      label: `${parentLabel}はどのくらい学校に通っていますか？`,
      helpText: '学校教育法・職業能力開発促進法に基づくものが対象です',
      inputType: 'radio',
      options: educationOptions(prefix),
    },
    {
      id: `${prefix}_other`,
      category,
      label: `${parentLabel}にその他の事情はありますか？`,
      inputType: 'radio',
      options: otherOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// ---------------------------------------------------------------------------
// 調整指数表
// ---------------------------------------------------------------------------

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_social_care',
    category: 'adjustment',
    label: '社会的養護が必要な家庭ですか？',
    helpText: '虐待やDVのおそれ、育児放棄等で支援が必要と認められる場合（当該年度のみ有効）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_social_care_no', points: 0 },
      { label: 'はい', value: 'adj_social_care_yes', points: 30 },
    ],
  },
  {
    id: 'adj_child_disability',
    category: 'adjustment',
    label: '申込児童に障がいがありますか？',
    helpText: '身体障害者手帳・療育手帳の交付を受けており、施設が受け入れられる場合',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_child_disability_no', points: 0 },
      { label: 'はい', value: 'adj_child_disability_yes', points: 20 },
    ],
  },
  {
    id: 'adj_nursery_teacher',
    category: 'adjustment',
    label: '保護者は保育士・幼稚園教諭ですか？',
    helpText: '資格・免許を持ち、認定こども園・幼稚園・保育園・地域型保育事業所で勤務している、または勤務予定の場合',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_nursery_teacher_no', points: 0 },
      { label: 'はい', value: 'adj_nursery_teacher_yes', points: 20 },
    ],
  },
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親家庭ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'ひとり親家庭で、他に成人の同居人がいない', value: 'adj_single_parent_20', points: 20 },
      { label: 'ひとり親家庭（上記以外）', value: 'adj_single_parent_10', points: 10 },
    ],
  },
  {
    id: 'adj_economic',
    category: 'adjustment',
    label: '経済的な自立の助けとなる事情はありますか？',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_economic_none', points: 0 },
      { label: '就労している（就労予定を含む）生活保護受給世帯', value: 'adj_economic_18', points: 18 },
      { label: '生計中心者が自己都合によらない失業・倒産で求職活動中', value: 'adj_economic_18b', points: 18 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: 'きょうだいが市内の認可保育園・認定こども園を利用していますか？',
    helpText: '入園希望月に利用・入園内定している場合',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_no', points: 0 },
      { label: 'はい', value: 'adj_sibling_yes', points: 12 },
    ],
  },
  {
    id: 'adj_return_to_work',
    category: 'adjustment',
    label: '産前産後休業・育児休業から職場復帰しますか？',
    helpText: '入園申込月から入園希望月の月末までに復帰する場合',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_return_to_work_no', points: 0 },
      { label: 'はい', value: 'adj_return_to_work_yes', points: 5 },
    ],
  },
  {
    id: 'adj_sibling_simultaneous',
    category: 'adjustment',
    label: 'きょうだいで同時に入園申込みをしますか？',
    helpText: '保育を必要とする事由が「求職活動」でない場合、申込人数×3点が加算されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_simultaneous_no', points: 0 },
      { label: '2人で同時申込み', value: 'adj_sibling_simultaneous_6', points: 6 },
      { label: '3人以上で同時申込み', value: 'adj_sibling_simultaneous_9', points: 9 },
    ],
  },
  {
    id: 'adj_single_posting',
    category: 'adjustment',
    label: '保護者の一方が単身赴任していますか？',
    helpText: '保護者以外に成人の同居人がいない場合に限ります',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_posting_no', points: 0 },
      { label: 'はい', value: 'adj_single_posting_yes', points: 3 },
    ],
  },
  {
    id: 'adj_current_care',
    category: 'adjustment',
    label: '今どこにお子さんを預けていますか？',
    inputType: 'radio',
    options: [
      { label: '預けていない', value: 'adj_current_care_none', points: 0 },
      { label: '保育園・幼稚園・認定こども園に在籍している', value: 'adj_current_care_1', points: 1 },
      { label: '認可外保育施設等・別居の親戚等に預けている', value: 'adj_current_care_1b', points: 1 },
    ],
  },
  {
    id: 'adj_arrears',
    category: 'adjustment',
    label: '利用者負担額（保育料）の滞納がありますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_arrears_no', points: 0 },
      { label: '滞納しているが、分納誓約どおり納付が続いている', value: 'adj_arrears_0', points: 0 },
      { label: '滞納しているが、分納誓約を締結した', value: 'adj_arrears_15', points: -15 },
      { label: '滞納している', value: 'adj_arrears_20', points: -20 },
    ],
  },
  {
    id: 'adj_leave_extension',
    category: 'adjustment',
    label: '「希望する園に入園できない場合は育児休業の延長も許容できる」と申し出ますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_leave_extension_no', points: 0 },
      { label: 'はい', value: 'adj_leave_extension_yes', points: -50 },
    ],
  },
];

// ---------------------------------------------------------------------------
// エクスポート
// ---------------------------------------------------------------------------

export const matsusakaData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
