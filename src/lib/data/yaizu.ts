import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 焼津市 保育施設利用調整基準（算定指数・調整項目）データ
//
// 出典: 焼津市こども部保育・幼稚園課「令和8年度 保育所等入所のご案内」P8
//       「9 保育施設利用調整基準【保育利用申込み締切日（4月入所は令和8年4月1日時点）を基準とする】」
//       https://www.city.yaizu.lg.jp/documents/9919/r8hoikujyotounyuusyonogoannnai.pdf
//       （焼津市Webサイト「令和8年度4月保育所入所申込み」
//         https://www.city.yaizu.lg.jp/child-edu/kodomo/mokuteki/day-care/hoiku/nyusho.html からリンク）
//
// 2026-08-19: 従来のデータは他自治体と同じ点数配列のテンプレート（推定値）だったため、
//             上記の公式基準表を読み取って全面的に置き換えた。
//             公式の算定指数は父母各最大10点で、旧データ（父母各20点）とは体系が異なる。
//
// 備考2（原典）: 「①から⑨までに掲げる事由・項目のうち父母（両親がいない場合は保護者）それぞれが
//                 該当する指数を確定し、調整項目に該当がある場合は当該項目の指数を加算又は減算し、
//                 合計指数の高いものから入所の順位を決定する」
// 原典で「※」（個別判断）とされている項目 — ⑧虐待・DV、(15)申込児童の障害、(23)その他 — は
// 点数が定まらないため、質問には含めていない。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'yaizu',
  name: '焼津市',
  slug: 'yaizu',
  prefecture: '静岡県',
  maxBasePoints: 20, // 父母各10点
} as const;

// ---------------------------------------------------------------------------
// 算定指数（保育にあたる保護者の状況）。父母それぞれについて選ぶ
// ---------------------------------------------------------------------------

/** ① 就労（月64時間以上就労することを常態とする場合）。内職も同じ事由に含まれる */
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '1週あたり37.5時間以上', value: `${prefix}_employment_10`, points: 10 },
  { label: '1週あたり35時間以上37.5時間未満', value: `${prefix}_employment_9`, points: 9 },
  { label: '1週あたり30時間以上35時間未満', value: `${prefix}_employment_8`, points: 8 },
  { label: '1週あたり25時間以上30時間未満', value: `${prefix}_employment_7`, points: 7 },
  { label: '1週あたり20時間以上25時間未満', value: `${prefix}_employment_6`, points: 6 },
  { label: '1週あたり16時間以上20時間未満', value: `${prefix}_employment_5`, points: 5 },
  { label: '内職（1日8時間以上、月収5万円以上）', value: `${prefix}_employment_naishoku_6`, points: 6 },
  { label: '内職（上記以外）', value: `${prefix}_employment_naishoku_4`, points: 4 },
];

/** ② 求職活動 */
const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動により家庭保育が困難', value: `${prefix}_jobseeking_4`, points: 4 },
];

/** ③ 出産 */
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産前後の期間にあたる', value: `${prefix}_childbirth_10`, points: 10 },
];

/** ④ 就学・職業訓練 */
const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '日中、就学・職業訓練のため外出を常態とする（内定含む）', value: `${prefix}_education_8`, points: 8 },
];

/** ⑤ 疾病・負傷 */
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '1か月以上入院している', value: `${prefix}_illness_hospital_10`, points: 10 },
  { label: '居宅療養（1か月以上常時臥床での療養）', value: `${prefix}_illness_bedridden_10`, points: 10 },
  { label: '居宅療養（精神性・感染性疾患）', value: `${prefix}_illness_mental_9`, points: 9 },
  { label: '居宅療養（一般療養／1か月以上の安静・通院加療）', value: `${prefix}_illness_general_8`, points: 8 },
];

/** ⑤ 障害 */
const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '身体1・2級、療育A、精神1級', value: `${prefix}_disability_10`, points: 10 },
  { label: '身体3級、療育B-1、精神2級', value: `${prefix}_disability_8`, points: 8 },
  { label: '身体4級以下、療育B-2・3、精神3級', value: `${prefix}_disability_6`, points: 6 },
];

/** ⑥ 看護・介護（居宅内／居宅外） */
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '居宅内：要介護3〜5、身体1・2級、療育A、精神1級', value: `${prefix}_care_home_9`, points: 9 },
  { label: '居宅内：要介護1・2、身体3級、療育B、精神2・3級', value: `${prefix}_care_home_7`, points: 7 },
  { label: '居宅内：上記以外', value: `${prefix}_care_home_5`, points: 5 },
  { label: '居宅外：入院付き添い（1か月以上）', value: `${prefix}_care_out_9`, points: 9 },
  { label: '居宅外：上記以外（要介護・要看護と認められる）', value: `${prefix}_care_out_5`, points: 5 },
];

/** ⑦ 災害復旧 */
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '震災、風水害、火災その他の災害の復旧に当たっている', value: `${prefix}_disaster_10`, points: 10 },
];

/** ⑨ その他（原典は「①〜⑧の指数を準用」で2〜10点。ここでは下限の2点で見積もる） */
const otherOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_other_none`, points: 0 },
  { label: '上記1〜8に類すると認められる', value: `${prefix}_other_2`, points: 2 },
];

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
      { label: '仕事をしている（自営・内職を含む）', value: `${prefix}_reason_employment`, points: 0 },
      { label: '仕事を探している', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '出産の前後', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '就学・職業訓練', value: `${prefix}_reason_education`, points: 0 },
      { label: '病気・けがの療養中', value: `${prefix}_reason_illness`, points: 0 },
      { label: '障害がある', value: `${prefix}_reason_disability`, points: 0 },
      { label: '家族の看護・介護をしている', value: `${prefix}_reason_care`, points: 0 },
      { label: '災害の復旧に当たっている', value: `${prefix}_reason_disaster`, points: 0 },
      { label: 'その他', value: `${prefix}_reason_other`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}はどのくらい働いていますか？`,
      helpText: '月64時間以上の就労を常態とする場合が対象です。居宅外労働・居宅内労働・自営（農業含む）は同じ基準です',
      inputType: 'radio',
      options: employmentOptions(prefix),
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
      label: `${parentLabel}の出産の状況は？`,
      helpText: '出産予定日の前々月1日（多胎児を妊娠の場合は4か月前の1日）から出産後8週間を経過する日の翌日の属する月の末日までが対象です',
      inputType: 'radio',
      options: childbirthOptions(prefix),
    },
    {
      id: `${prefix}_education`,
      category,
      label: `${parentLabel}は就学・職業訓練をしていますか？`,
      helpText: '卒業・終了予定日が属する月の月末まで入所できます',
      inputType: 'radio',
      options: educationOptions(prefix),
    },
    {
      id: `${prefix}_illness`,
      category,
      label: `${parentLabel}の病気・けがの状況は？`,
      inputType: 'radio',
      options: illnessOptions(prefix),
    },
    {
      id: `${prefix}_disability`,
      category,
      label: `${parentLabel}の障害の程度は？`,
      helpText: '身体障害者手帳・療育手帳・精神障害者保健福祉手帳の等級でお選びください',
      inputType: 'radio',
      options: disabilityOptions(prefix),
    },
    {
      id: `${prefix}_care`,
      category,
      label: `${parentLabel}の看護・介護の状況は？`,
      helpText: '居宅内（自宅での介護・看護）か、居宅外（入院中の付き添い等）かを選んでください',
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
      id: `${prefix}_other`,
      category,
      label: `${parentLabel}はその他の事由にあてはまりますか？`,
      helpText: '公式では①〜⑧の指数を準用して2〜10点の幅があります。ここでは下限の2点で見積もります',
      inputType: 'radio',
      options: otherOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// ---------------------------------------------------------------------------
// 調整項目（父母の就労状況・世帯状況・児童状況・滞納・広域入所）
// ---------------------------------------------------------------------------

const adjustmentQuestions: Question[] = [
  // --- 父母の就労状況 ---
  {
    id: 'adj_leave_return',
    category: 'adjustment',
    label: '育児休業から復職する予定ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_leave_return_no', points: 0 },
      { label: 'はい', value: 'adj_leave_return_yes', points: 2 },
    ],
  },
  {
    id: 'adj_self_employed',
    category: 'adjustment',
    label: '自営（農業含む）で働いている保護者は何人いますか？',
    helpText: '個人事業主（開業届の提出がない場合に限る）を含みます。1人につき1点の減算です',
    inputType: 'radio',
    options: [
      { label: 'いない', value: 'adj_self_employed_0', points: 0 },
      { label: '1人', value: 'adj_self_employed_1', points: -1 },
      { label: '2人', value: 'adj_self_employed_2', points: -2 },
    ],
  },
  {
    id: 'adj_job_offer',
    category: 'adjustment',
    label: '就労が「内定」の状態の保護者は何人いますか？',
    helpText: '1人につき1点の減算です',
    inputType: 'radio',
    options: [
      { label: 'いない', value: 'adj_job_offer_0', points: 0 },
      { label: '1人', value: 'adj_job_offer_1', points: -1 },
      { label: '2人', value: 'adj_job_offer_2', points: -2 },
    ],
  },
  {
    id: 'adj_work_history',
    category: 'adjustment',
    label: '父母ともに就労実績が3年以上ありますか？',
    helpText: '母子又は父子世帯の場合は父母のいずれかで判定します',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_work_history_no', points: 0 },
      { label: 'はい', value: 'adj_work_history_yes', points: 1 },
    ],
  },
  {
    id: 'adj_work_mismatch',
    category: 'adjustment',
    label: '就労の証明内容と勤務実績・収入実績に食い違いがありますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_work_mismatch_no', points: 0 },
      { label: 'はい', value: 'adj_work_mismatch_yes', points: -2 },
    ],
  },
  {
    id: 'adj_hoikushi',
    category: 'adjustment',
    label: '保育士・幼稚園教諭として保育業務に従事していますか？',
    helpText: '保育士資格又は幼稚園教諭免許を有する父母が、認可保育所・幼稚園・認定こども園等で保育業務に従事又は内定している場合',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_hoikushi_no', points: 0 },
      { label: '該当し、労働時間が1週30時間以上', value: 'adj_hoikushi_3', points: 3 },
      { label: '該当し、労働時間が1週30時間未満', value: 'adj_hoikushi_2', points: 2 },
    ],
  },
  // --- 世帯状況 ---
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい', value: 'adj_welfare_yes', points: 5 },
    ],
  },
  {
    id: 'adj_many_children',
    category: 'adjustment',
    label: '父母が養育している18歳未満の子どもが3人以上いますか？',
    helpText: '4月1日現在で判定します',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_many_children_no', points: 0 },
      { label: 'はい', value: 'adj_many_children_yes', points: 1 },
    ],
  },
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: '母子・父子世帯ですか？',
    helpText: '離婚調停中（裁判所や弁護士等の公的な証明書の提出をした場合）を含みます。新規入所（年齢上限がある保育所等の卒園による転園を含む）に限ります',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい', value: 'adj_single_parent_yes', points: 3 },
    ],
  },
  {
    id: 'adj_parent_absence',
    category: 'adjustment',
    label: '父母の不在（単身赴任等）にあてはまりますか？',
    helpText:
      '「父又は母が不存在」は10点、父母ともに不存在の場合はさらに20点が加算されます（合計30点）',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_parent_absence_no', points: 0 },
      {
        label: 'どちらか一人が単身赴任、または3か月以上の入院などで不在',
        value: 'adj_parent_absence_1',
        points: 1,
      },
      {
        label: '死亡・離婚・行方不明・拘禁などにより父又は母が不存在',
        value: 'adj_parent_absence_10',
        points: 10,
      },
      { label: '父母ともに不存在', value: 'adj_parent_absence_30', points: 30 },
    ],
  },
  {
    id: 'adj_parent_disability',
    category: 'adjustment',
    label: '「障害」以外の事由で申し込む保護者に、重い障害がありますか？',
    helpText: '障害者手帳1級程度に該当する場合が対象です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_parent_disability_no', points: 0 },
      { label: 'はい', value: 'adj_parent_disability_yes', points: 5 },
    ],
  },
  {
    id: 'adj_grandparent',
    category: 'adjustment',
    label: '同居している65歳未満の親族等は何人いますか？',
    helpText: '保育できない状況（上記①〜⑨と同様の状況）が明らかでない場合、1人につき2点の減算です',
    inputType: 'radio',
    options: [
      { label: 'いない', value: 'adj_grandparent_0', points: 0 },
      { label: '1人', value: 'adj_grandparent_1', points: -2 },
      { label: '2人', value: 'adj_grandparent_2', points: -4 },
      { label: '3人以上', value: 'adj_grandparent_3', points: -6 },
    ],
  },
  {
    id: 'adj_unenrolled_child',
    category: 'adjustment',
    label: '同一世帯内に、保育を受けていない就学前の子どもがいますか？',
    helpText:
      '特定教育・保育施設、特定地域型保育事業若しくは認可外保育施設における保育を受けていない、又は保育の申し込みをしていない小学校就学前の子どもが対象です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unenrolled_child_no', points: 0 },
      { label: 'はい', value: 'adj_unenrolled_child_yes', points: -3 },
    ],
  },
  // --- 児童状況 ---
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: '兄弟姉妹が入所希望の保育所に在園していますか？',
    helpText: '新年度選考時は、卒園予定児童を除きます',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_sibling_no', points: 0 },
      { label: '在園している兄弟姉妹が2・3号認定', value: 'adj_sibling_23', points: 2 },
      { label: '在園している兄弟姉妹が1号認定のみ', value: 'adj_sibling_1', points: 1 },
    ],
  },
  {
    id: 'adj_simultaneous',
    category: 'adjustment',
    label: '同時に2人以上の申し込みをしていますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_simultaneous_no', points: 0 },
      { label: 'はい', value: 'adj_simultaneous_yes', points: 1 },
      { label: 'はい（多胎児が同時に入所申し込み）', value: 'adj_simultaneous_multiple', points: 2 },
    ],
  },
  {
    id: 'adj_reenroll',
    category: 'adjustment',
    label: '下の子の出産・育休取得のため一旦退園した児童の再入所ですか？',
    helpText:
      '父母の就労等により再入所を希望する場合が対象です。令和7年3月31日までに入所後の就労実績が5か月を経過する前に産休に入り、妊娠・出産要件の期間で一旦退園した場合は3点になります',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_reenroll_no', points: 0 },
      { label: 'はい', value: 'adj_reenroll_yes', points: 2 },
      { label: 'はい（就労実績5か月未満で産休に入った場合）', value: 'adj_reenroll_3', points: 3 },
    ],
  },
  {
    id: 'adj_graduation',
    category: 'adjustment',
    label: '年齢上限がある保育所等（小規模保育事業等）を卒園しましたか？',
    helpText: '転園の場合は対象外です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_graduation_no', points: 0 },
      { label: 'はい', value: 'adj_graduation_yes', points: 3 },
    ],
  },
  {
    id: 'adj_ninkagai',
    category: 'adjustment',
    label: '一時預かり・認可外保育施設等を継続的に利用していますか？',
    helpText:
      '1か月間に10日以上かつ3か月以上継続的に利用している場合（継続的に保育が必要な状態である場合に限る）。企業主導型保育施設の従業員枠は除きます。小規模保育事業等の卒園に該当する場合は対象外です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_ninkagai_no', points: 0 },
      { label: 'はい', value: 'adj_ninkagai_yes', points: 2 },
    ],
  },
  // --- 滞納・広域入所 ---
  {
    id: 'adj_arrears',
    category: 'adjustment',
    label: '保育料の滞納がありますか？',
    helpText: '納付に対して誠意ある対応が見られない等の場合に減算されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_arrears_no', points: 0 },
      { label: 'はい', value: 'adj_arrears_yes', points: -10 },
    ],
  },
  {
    id: 'adj_outside',
    category: 'adjustment',
    label: '市外在住者ですか？',
    helpText: '転入予定者は除きます。ただし転入後の住所地が未定の場合は市外在住者とみなされます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_outside_no', points: 0 },
      { label: 'はい', value: 'adj_outside_yes', points: -5 },
    ],
  },
];

export const yaizuData: MunicipalityData = {
  municipality,
  questions: [...buildParentQuestions(1), ...buildParentQuestions(2), ...adjustmentQuestions],
};
