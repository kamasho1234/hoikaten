import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 沖縄市 保育所利用調整基準表（点数表）データ
//
// 出典: 沖縄市保育・幼稚園課「令和8年度（令和8年4月入園）保育所等及び公立（沖縄市立）幼稚園
//       申込案内」P31-P32「19) 保育所利用調整基準表（点数表）」
//       https://www.city.okinawa.okinawa.jp/documents/22782/20250818_r8nyusyoannai.pdf
//       （沖縄市Webサイト「R8年度保育所等入所、沖縄市立幼稚園入園及び預かり保育のご案内」
//         https://www.city.okinawa.okinawa.jp/k027-003/kosodate/hoikuen/nyuusho/p00009.html からリンク）
//
// 2026-08-19: 従来のデータは他自治体と同じ点数配列のテンプレート（推定値）だったため、
//             上記の公式点数表を読み取って全面的に置き換えた。
//
// 原典の注記:
//   「評点数は基本点数（a）と調整点数（b）を合算したものとする」
//   「基本点数は保護者それぞれの点数を合算する。この場合において、該当する類型が複数ある場合は
//     より点数の高い類型を採用する」
//   「就労の場合の勤務時間は、すべて休憩時間を含むものとし、通勤時間や時間外勤務時間は含めない」
// ---------------------------------------------------------------------------

const municipality = {
  id: 'okinawa',
  name: '沖縄市',
  slug: 'okinawa',
  prefecture: '沖縄県',
  maxBasePoints: 44, // 父母各22点（緊急受入100点は例外的な類型）
} as const;

// ---------------------------------------------------------------------------
// (a) 基本点数。父母それぞれについて選ぶ
// ---------------------------------------------------------------------------

/** ① 就労（自営業を含む） */
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月160時間以上', value: `${prefix}_employment_20`, points: 20 },
  { label: '月150時間以上160時間未満', value: `${prefix}_employment_19`, points: 19 },
  { label: '月140時間以上150時間未満', value: `${prefix}_employment_18`, points: 18 },
  { label: '月130時間以上140時間未満', value: `${prefix}_employment_17`, points: 17 },
  { label: '月120時間以上130時間未満', value: `${prefix}_employment_16`, points: 16 },
  { label: '月110時間以上120時間未満', value: `${prefix}_employment_15`, points: 15 },
  { label: '月100時間以上110時間未満', value: `${prefix}_employment_14`, points: 14 },
  { label: '月90時間以上100時間未満', value: `${prefix}_employment_13`, points: 13 },
  { label: '月80時間以上90時間未満', value: `${prefix}_employment_12`, points: 12 },
  { label: '月64時間以上80時間未満', value: `${prefix}_employment_10`, points: 10 },
];

/** ① 就労のうち自営業で挙証資料がない場合の減点 */
const selfEmployedProofOptions = (prefix: string) => [
  { label: '自営業ではない、または挙証資料を提出できる', value: `${prefix}_proof_ok`, points: 0 },
  { label: '開業届、営業許可証、申告書等の提出がない', value: `${prefix}_proof_ng`, points: -2 },
];

/** ② 妊娠・出産（公式の点数表では母の欄のみに点数がある） */
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '産前8週（多胎児の場合14週）及び産後8週', value: `${prefix}_childbirth_15`, points: 15 },
];

/**
 * ③ 保護者の疾病・障がい。
 * 「診断書（保育軽減の必要性）」は1週間あたりの区分Aと1日あたりの区分Bの合算で決まるため、
 * 組み合わせを展開して選択肢にしている。
 */
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '長期入院（1か月以上）', value: `${prefix}_illness_hospital_20`, points: 20 },
  { label: '診断書：常時・1日8時間以上', value: `${prefix}_illness_dr_a10b10`, points: 20 },
  { label: '診断書：常時・1日7時間以上8時間未満', value: `${prefix}_illness_dr_a10b8`, points: 18 },
  { label: '診断書：常時・1日5時間以上7時間未満', value: `${prefix}_illness_dr_a10b6`, points: 16 },
  { label: '診断書：常時・1日5時間未満', value: `${prefix}_illness_dr_a10b4`, points: 14 },
  { label: '診断書：週4〜5日・1日8時間以上', value: `${prefix}_illness_dr_a8b10`, points: 18 },
  { label: '診断書：週4〜5日・1日7時間以上8時間未満', value: `${prefix}_illness_dr_a8b8`, points: 16 },
  { label: '診断書：週4〜5日・1日5時間以上7時間未満', value: `${prefix}_illness_dr_a8b6`, points: 14 },
  { label: '診断書：週4〜5日・1日5時間未満', value: `${prefix}_illness_dr_a8b4`, points: 12 },
  { label: '診断書：週3日以下・1日8時間以上', value: `${prefix}_illness_dr_a4b10`, points: 14 },
  { label: '診断書：週3日以下・1日7時間以上8時間未満', value: `${prefix}_illness_dr_a4b8`, points: 12 },
  { label: '診断書：週3日以下・1日5時間以上7時間未満', value: `${prefix}_illness_dr_a4b6`, points: 10 },
  { label: '診断書：週3日以下・1日5時間未満', value: `${prefix}_illness_dr_a4b4`, points: 8 },
  { label: '身体・精神障害 1・2級', value: `${prefix}_illness_sd_22`, points: 22 },
  { label: '身体・精神障害 3級', value: `${prefix}_illness_sd_18`, points: 18 },
  { label: '身体・精神障害 4級以下', value: `${prefix}_illness_sd_10`, points: 10 },
  { label: '知的障害 最重度（A1）・重度（A2）', value: `${prefix}_illness_id_22`, points: 22 },
  { label: '知的障害 中度（B1）', value: `${prefix}_illness_id_18`, points: 18 },
  { label: '知的障害 軽度（B2）', value: `${prefix}_illness_id_10`, points: 10 },
];

/** ④ 親族の看護・介護等 */
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '身体：生活全般において、全面的な介助が必要', value: `${prefix}_care_body_20a`, points: 20 },
  {
    label: '身体：入浴・排泄・衣類の着脱など日常行為の多くに全面的な介助が必要',
    value: `${prefix}_care_body_20b`,
    points: 20,
  },
  {
    label: '身体：起き上がり・寝返りが自分ではできず、排泄・入浴・衣類の着脱などに介助が必要',
    value: `${prefix}_care_body_20c`,
    points: 20,
  },
  {
    label: '身体：起き上がり・寝返りが自分では難しく、排泄・入浴・衣類の着脱の一部又は全部の介助が必要',
    value: `${prefix}_care_body_16`,
    points: 16,
  },
  {
    label: '身体：立ち上がりや歩行が安定しない。排泄、入浴などに一部介助が必要',
    value: `${prefix}_care_body_10`,
    points: 10,
  },
  { label: '身体：基本的に日常生活は営めるが、入浴等に一部介助が必要', value: `${prefix}_care_body_6`, points: 6 },
  { label: '身体：基本的に日常生活は営めるが、見守りを要する', value: `${prefix}_care_body_4`, points: 4 },
  {
    label: '精神：精神的な疾患により情動が極めて不安定なため常時の看護が必要',
    value: `${prefix}_care_mind_20`,
    points: 20,
  },
  {
    label: '精神：精神的な疾患により情動が不安定なため一部の看護が必要',
    value: `${prefix}_care_mind_10`,
    points: 10,
  },
  {
    label: '精神：基本的に日常生活は営めるが、精神的な疾患があり見守りを要する',
    value: `${prefix}_care_mind_4`,
    points: 4,
  },
  {
    label: '親子通園：発達支援センターから保育所入所配慮願（文書）が発出された',
    value: `${prefix}_care_oyako_4`,
    points: 4,
  },
];

/** ⑤ 災害復旧等 */
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  {
    label: '震災、風水害、火災等による家屋喪失等の場合、その復旧までの間',
    value: `${prefix}_disaster_20`,
    points: 20,
  },
];

/** ⑥ 求職活動 */
const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '生計中心者の失業により就労の必要性が高い', value: `${prefix}_jobseeking_12`, points: 12 },
  { label: '上記以外の場合の求職中', value: `${prefix}_jobseeking_4`, points: 4 },
];

/** ⑦ 就学。職業訓練校・専門学校は「①就労の点数に準じる」ため、就労と同じ段階を展開している */
const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '学校教育法に定められている学校に通学している', value: `${prefix}_education_18`, points: 18 },
  { label: '通信教育・通信制大学等の学生（就職につながるものに限る）', value: `${prefix}_education_6`, points: 6 },
  { label: '職業訓練校・専門学校等：月160時間以上', value: `${prefix}_education_v20`, points: 20 },
  { label: '職業訓練校・専門学校等：月150時間以上160時間未満', value: `${prefix}_education_v19`, points: 19 },
  { label: '職業訓練校・専門学校等：月140時間以上150時間未満', value: `${prefix}_education_v18`, points: 18 },
  { label: '職業訓練校・専門学校等：月130時間以上140時間未満', value: `${prefix}_education_v17`, points: 17 },
  { label: '職業訓練校・専門学校等：月120時間以上130時間未満', value: `${prefix}_education_v16`, points: 16 },
  { label: '職業訓練校・専門学校等：月110時間以上120時間未満', value: `${prefix}_education_v15`, points: 15 },
  { label: '職業訓練校・専門学校等：月100時間以上110時間未満', value: `${prefix}_education_v14`, points: 14 },
  { label: '職業訓練校・専門学校等：月90時間以上100時間未満', value: `${prefix}_education_v13`, points: 13 },
  { label: '職業訓練校・専門学校等：月80時間以上90時間未満', value: `${prefix}_education_v12`, points: 12 },
  { label: '職業訓練校・専門学校等：月64時間以上80時間未満', value: `${prefix}_education_v10`, points: 10 },
];

/** ⑧ 緊急受入（要保護児童・虐待やDV等） */
const emergencyOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_emergency_none`, points: 0 },
  {
    label: '「特別の支援を要する家庭」であること（H16.8.13雇児発第0813003号）',
    value: `${prefix}_emergency_100a`,
    points: 100,
  },
  {
    label: 'こども相談・健康課から保育所入所配慮願（文書）が発出された世帯',
    value: `${prefix}_emergency_100b`,
    points: 100,
  },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: '該当する類型が複数ある場合は、より点数の高い類型が採用されます',
    inputType: 'select',
    options: [
      { label: '仕事をしている（自営業を含む）', value: `${prefix}_reason_employment`, points: 0 },
      { label: '妊娠・出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '病気・障がいがある', value: `${prefix}_reason_illness`, points: 0 },
      { label: '親族の看護・介護をしている', value: `${prefix}_reason_care`, points: 0 },
      { label: '災害の復旧にあたっている', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '求職活動をしている', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '就学している', value: `${prefix}_reason_education`, points: 0 },
      { label: '緊急受入（虐待・DV等）', value: `${prefix}_reason_emergency`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}はどのくらい働いていますか？`,
      helpText: '勤務時間には休憩時間を含み、通勤時間や時間外勤務時間は含めません',
      inputType: 'radio',
      options: employmentOptions(prefix),
    },
    {
      id: `${prefix}_proof`,
      category,
      // 「仕事をしている」を選んだときだけ表示する（自営業の挙証資料に関する減点）
      showFor: ['employment'],
      label: `${parentLabel}が自営業の場合、挙証資料を提出できますか？`,
      helpText: '開業届、営業許可証、申告書等の提出がない場合は2点減点されます',
      inputType: 'radio',
      options: selfEmployedProofOptions(prefix),
    },
    {
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}の妊娠・出産の状況は？`,
      helpText: '公式の点数表では母の欄のみに点数があります',
      inputType: 'radio',
      options: childbirthOptions(prefix),
    },
    {
      id: `${prefix}_illness`,
      category,
      label: `${parentLabel}の病気・障がいの状況は？`,
      helpText:
        '「診断書」は保育軽減の必要性について、1週間あたりの日数と1日あたりの時間を合算して点数化されます',
      inputType: 'radio',
      options: illnessOptions(prefix),
    },
    {
      id: `${prefix}_care`,
      category,
      label: `${parentLabel}が看護・介護している親族の状態は？`,
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
      label: `${parentLabel}の求職の状況は？`,
      inputType: 'radio',
      options: jobSeekingOptions(prefix),
    },
    {
      id: `${prefix}_education`,
      category,
      label: `${parentLabel}の就学の状況は？`,
      helpText: '職業訓練校・専門学校等に就学している場合は、就労の点数に準じて時間数で判定されます',
      inputType: 'radio',
      options: educationOptions(prefix),
    },
    {
      id: `${prefix}_emergency`,
      category,
      label: `${parentLabel}は緊急受入の対象ですか？`,
      inputType: 'radio',
      options: emergencyOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// ---------------------------------------------------------------------------
// (b) 調整点数
// ---------------------------------------------------------------------------

const adjustmentQuestions: Question[] = [
  // --- 保育の代替手段 ---
  {
    id: 'adj_alternative',
    category: 'adjustment',
    label: '現在の保育状況にあてはまるものは？',
    helpText:
      '小規模保育事業等とは、小規模保育事業・事業所内保育事業・家庭的保育事業・居宅訪問型保育事業を指します',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_alternative_no', points: 0 },
      {
        label: '小規模保育事業等の卒園児で、連携施設以外の保育所等への入園を希望する',
        value: 'adj_alternative_1',
        points: 1,
      },
      {
        label: '兄弟姉妹が利用している保育所等または小規模保育事業等に転園の申し込みをする',
        value: 'adj_alternative_8',
        points: 8,
      },
    ],
  },
  // --- 世帯状況 ---
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親世帯ですか？',
    helpText: '死亡、行方不明、拘禁、離婚調停中を含みます。事実婚の場合は非該当です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい', value: 'adj_single_parent_yes', points: 24 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい', value: 'adj_welfare_yes', points: 6 },
    ],
  },
  {
    id: 'adj_household_disability',
    category: 'adjustment',
    label: '世帯に障がい者がいますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_household_disability_no', points: 0 },
      { label: 'はい', value: 'adj_household_disability_yes', points: 4 },
    ],
  },
  {
    id: 'adj_no_parents',
    category: 'adjustment',
    label: '両親不存在の世帯ですか？',
    helpText: '要件にあたらない概ね65歳以上の祖父母等が、不存在の両親に代わり養育する場合が対象です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_no_parents_no', points: 0 },
      { label: 'はい', value: 'adj_no_parents_yes', points: 44 },
    ],
  },
  {
    id: 'adj_many_children',
    category: 'adjustment',
    label: '多子世帯（就学前児童が3人以上）ですか？',
    helpText: '申込期間最終日時点で生まれていることが条件です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_many_children_no', points: 0 },
      { label: 'はい', value: 'adj_many_children_yes', points: 2 },
    ],
  },
  {
    id: 'adj_foster',
    category: 'adjustment',
    label: '里親世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_foster_no', points: 0 },
      { label: 'はい', value: 'adj_foster_yes', points: 4 },
    ],
  },
  {
    id: 'adj_multi_type',
    category: 'adjustment',
    label: '基本点数で2つ以上の類型に該当する保護者がいますか？',
    helpText: '②妊娠・出産、⑥求職活動、⑧緊急受入を除きます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_multi_type_no', points: 0 },
      { label: 'はい', value: 'adj_multi_type_yes', points: 2 },
    ],
  },
  // --- 兄弟姉妹の状況 ---
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: '兄弟姉妹の入所状況は？',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_sibling_no', points: 0 },
      {
        label: '兄弟姉妹がすでに入所しているこどもと同じ保育所を希望する新規申込',
        value: 'adj_sibling_same',
        points: 3,
      },
      { label: '兄弟姉妹がすでに入所しているこどもの新規申込', value: 'adj_sibling_new', points: 2 },
    ],
  },
  {
    id: 'adj_multiple_birth',
    category: 'adjustment',
    label: '多胎児での申込みですか？',
    helpText: '申込み児童の多胎児兄弟姉妹1人につき2点が加点されます（新規申込に限ります）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_multiple_birth_0', points: 0 },
      { label: 'はい（多胎児兄弟姉妹1人）', value: 'adj_multiple_birth_1', points: 2 },
      { label: 'はい（多胎児兄弟姉妹2人）', value: 'adj_multiple_birth_2', points: 4 },
    ],
  },
  {
    id: 'adj_tanshin',
    category: 'adjustment',
    label: '単身赴任（沖縄本島外）していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_tanshin_no', points: 0 },
      { label: 'はい', value: 'adj_tanshin_yes', points: 2 },
    ],
  },
  {
    id: 'adj_leave_return',
    category: 'adjustment',
    label: '育児休業から復帰する場合ですか？',
    helpText: '育児休業取得対象児童が2歳になる月の月末まで加点されます（育休取得対象のこどもの申請のみ）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_leave_return_no', points: 0 },
      { label: 'はい', value: 'adj_leave_return_yes', points: 1 },
    ],
  },
  // --- 就労の状況 ---
  {
    id: 'adj_childcare_worker',
    category: 'adjustment',
    label: '保護者は保育・教育の専門職として就労していますか？',
    helpText:
      '加点の対象となるのは新規申込児童に限り、入所月に就労していることが条件です。「認可に移行する認可外保育施設」とは、市の認可外保育施設支援事業等により認可化移行に取り組んでいる施設を指します',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_childcare_worker_no', points: 0 },
      {
        label: '保育士・幼稚園教諭・看護師・准看護師・保健師の資格を有し、市内外の保育所等・小規模保育事業等・認可に移行する市内の認可外保育施設で就労中または内定',
        value: 'adj_childcare_worker_20a',
        points: 20,
      },
      {
        label: '子育て支援員として、市内外の保育所等・小規模保育事業等・認可に移行する市内の認可外保育施設で就労中または内定',
        value: 'adj_childcare_worker_20b',
        points: 20,
      },
      {
        label: '保育士・幼稚園教諭・看護師・准看護師・保健師の資格を有し、市内外の認可外保育施設で就労中または内定',
        value: 'adj_childcare_worker_10',
        points: 10,
      },
      {
        label: '保育士・幼稚園教諭・教員免許・社会福祉士または放課後児童支援員の資格を有し、市内外の放課後児童クラブで就労中または内定',
        value: 'adj_childcare_worker_5',
        points: 5,
      },
    ],
  },
  {
    id: 'adj_night_work',
    category: 'adjustment',
    label: 'すべての保護者が常態的に18時30分以降の就労がありますか？',
    helpText: '夜間保育を行う保育所等への入所を希望する場合に加点されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_night_work_no', points: 0 },
      { label: 'はい', value: 'adj_night_work_yes', points: 5 },
    ],
  },
  {
    id: 'adj_false_application',
    category: 'adjustment',
    label: '今年度または前年度の申請で虚偽の申請をしたことがありますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_false_application_no', points: 0 },
      { label: 'はい', value: 'adj_false_application_yes', points: -6 },
    ],
  },
  // --- 妊娠・出産の状況 ---
  {
    id: 'adj_urgent_birth',
    category: 'adjustment',
    label: '切迫等で出産前後の入所の緊急性が高いですか？',
    helpText:
      '同一世帯内に保育できる親族がいない状況のなか、切迫等で入所の緊急性が高く、出産後2か月までの期間の入所を希望する場合',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_urgent_birth_no', points: 0 },
      { label: 'はい', value: 'adj_urgent_birth_yes', points: 50 },
    ],
  },
  // --- 継続在園児・その他 ---
  {
    id: 'adj_continuing',
    category: 'adjustment',
    label: '継続在園児にあたりますか？',
    helpText:
      '現に利用する認可保育所・認定こども園・小規模保育事業所等を新年度も継続して利用したい園児、小規模保育事業所等を卒園し新年度に連携施設の利用を希望する園児、認可に移行する市内の認可外保育施設を市が指定する期日時点で利用しており認可移行後の当該施設の利用を希望する園児（広域利用を除く）が対象です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_continuing_no', points: 0 },
      { label: 'はい', value: 'adj_continuing_yes', points: 200 },
    ],
  },
  {
    id: 'adj_leave_extension',
    category: 'adjustment',
    label: '希望する施設に入所できない場合、育児休業の延長も許容できますか？',
    helpText: '0・1歳児クラスの新規申込児童のみが対象です。大きく減点されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_leave_extension_no', points: 0 },
      { label: 'はい', value: 'adj_leave_extension_yes', points: -300 },
    ],
  },
  {
    id: 'adj_care_separate',
    category: 'adjustment',
    label: '看護・介護する親族と別居していますか？',
    helpText: '別居親族の看護・介護は、同居の基本点数の各項目から2点減点されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_care_separate_no', points: 0 },
      { label: 'はい', value: 'adj_care_separate_yes', points: -2 },
    ],
  },
  {
    id: 'adj_hattatsu',
    category: 'adjustment',
    label: '発達支援保育の申込児童ですか？',
    helpText:
      'こどもが障がい等を有しており、保育所等での集団保育がこどもの発達上必要と認められるとき（必要な審査を経て入所決定した児童）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_hattatsu_no', points: 0 },
      { label: 'はい', value: 'adj_hattatsu_yes', points: 100 },
    ],
  },
  {
    id: 'adj_oyako_sibling',
    category: 'adjustment',
    label: '親子通園を必要とする発達支援関連施設に通園する兄弟姉妹がいますか？',
    helpText: '保育利用を希望する年度に通園予定もしくは通園希望の兄弟姉妹がいる場合',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_oyako_sibling_no', points: 0 },
      { label: 'はい', value: 'adj_oyako_sibling_yes', points: 12 },
    ],
  },
  {
    id: 'adj_no_renkei',
    category: 'adjustment',
    label: '在園する小規模保育事業等で、卒園後の受け皿となる連携施設が確保できていませんか？',
    helpText: '特例保育所型事業所内保育事業者が実施する保育所型事業所内保育事業所を利用する園児を除きます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_no_renkei_no', points: 0 },
      { label: 'はい', value: 'adj_no_renkei_yes', points: 150 },
    ],
  },
  {
    id: 'adj_no_5yo',
    category: 'adjustment',
    label: '5歳児保育の受入ができない施設に在園していますか？',
    helpText:
      '5歳児定員が4歳児定員を下回る施設で継続入所ができなかった場合が対象です。特例保育所型事業所内保育事業者が実施する保育所型事業所内保育事業所を利用する園児を除きます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_no_5yo_no', points: 0 },
      { label: 'はい', value: 'adj_no_5yo_yes', points: 100 },
    ],
  },
];

export const okinawaData: MunicipalityData = {
  municipality,
  questions: [...buildParentQuestions(1), ...buildParentQuestions(2), ...adjustmentQuestions],
};
