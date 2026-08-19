import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 伊賀市 教育・保育給付認定の事由（判定点）・優先事由による加減点データ
//
// 出典: 伊賀市保育幼稚園課「伊賀市子ども・子育て支援法による教育・保育給付認定並びに
//       教育・保育施設等の利用調整及び選考に関する規則 別表」
//       https://www.city.iga.lg.jp/cmsfiles/contents/0000010/10447/tokutennhyou.pdf
//       （伊賀市Webサイト「令和8年度 保育所(園)・認定こども園の入所申し込み」
//         https://www.city.iga.lg.jp/igakids/0000010447.html からリンク）
//
// 2026-08-19: 従来のデータは他自治体と同じ点数配列のテンプレート（推定値）だったため、
//             上記の公式規則別表を読み取って全面的に置き換えた。
//             伊賀市は判定点が15〜55点の体系で、旧データ（10点満点系）とは桁が異なる。
//
// 原典の注記:
//   「保護者のいずれもが認定事由の1〜10のいずれかに該当すること。事由が重複する場合は、
//     高い方の点数で判定する」
//   「利用調整及び選考時の判定は、保護者のそれぞれについて該当する教育・保育給付認定の事由に
//     基づく各判定点の合計と、該当する優先事由による加点及びその他事由による加点・減点を
//     合算し、保育の必要度について指数づけを行う」
//   優先事由の1〜11は1児童1回の加減、12〜17は該当する保護者の人数の範囲内で加減する。
//
// 質問に含めていない原典の項目:
//   ・認定事由10「その他市長が上記1〜9に類する事由として認める状況」（点数が状況に応じるため）
// ---------------------------------------------------------------------------

const municipality = {
  id: 'iga',
  name: '伊賀市',
  slug: 'iga',
  prefecture: '三重県',
  maxBasePoints: 110, // 父母各55点（災害復旧）
} as const;

// ---------------------------------------------------------------------------
// 教育・保育給付認定の事由（判定点）。父母それぞれについて選ぶ
// ---------------------------------------------------------------------------

/** 1 労働（被雇用者、自営業・農業の中心者、自営業・農業の協力者） */
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '1か月当たり180時間以上', value: `${prefix}_employment_54`, points: 54 },
  { label: '1か月当たり168時間以上180時間未満', value: `${prefix}_employment_51`, points: 51 },
  { label: '1か月当たり156時間以上168時間未満', value: `${prefix}_employment_48`, points: 48 },
  { label: '1か月当たり144時間以上156時間未満', value: `${prefix}_employment_45`, points: 45 },
  { label: '1か月当たり120時間以上144時間未満', value: `${prefix}_employment_40`, points: 40 },
  { label: '1か月当たり96時間以上120時間未満', value: `${prefix}_employment_35`, points: 35 },
  { label: '1か月当たり72時間以上96時間未満', value: `${prefix}_employment_30`, points: 30 },
  { label: '1か月当たり48時間以上72時間未満', value: `${prefix}_employment_25`, points: 25 },
];

/** 2 疾病・負傷・障がい */
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '疾病・負傷：入院・病臥', value: `${prefix}_illness_50`, points: 50 },
  { label: '疾病・負傷：軽病', value: `${prefix}_illness_30`, points: 30 },
  { label: '身体障害者手帳1級', value: `${prefix}_illness_body_50`, points: 50 },
  { label: '身体障害者手帳2級', value: `${prefix}_illness_body_40`, points: 40 },
  { label: '身体障害者手帳3級', value: `${prefix}_illness_body_30`, points: 30 },
  { label: '身体障害者手帳4級', value: `${prefix}_illness_body_20`, points: 20 },
  { label: '療育手帳A1・A2', value: `${prefix}_illness_ryoiku_50`, points: 50 },
  { label: '療育手帳B1・B2', value: `${prefix}_illness_ryoiku_40`, points: 40 },
  { label: '精神保健福祉手帳1級', value: `${prefix}_illness_mental_50`, points: 50 },
  { label: '精神保健福祉手帳2級', value: `${prefix}_illness_mental_40`, points: 40 },
  { label: '精神保健福祉手帳3級', value: `${prefix}_illness_mental_30`, points: 30 },
];

/** 3 同居の親族の介護・看護・付添い等 */
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '入院付添い（1日8時間以上）', value: `${prefix}_care_attend_40`, points: 40 },
  { label: '入院付添い（1日3時間以上8時間未満）', value: `${prefix}_care_attend_30`, points: 30 },
  { label: '入院付添い（1日2時間以上3時間未満）', value: `${prefix}_care_attend_20`, points: 20 },
  { label: '家庭での看護・介護（1日8時間以上）', value: `${prefix}_care_home_40`, points: 40 },
  { label: '家庭での看護・介護（1日3時間以上8時間未満）', value: `${prefix}_care_home_30`, points: 30 },
  { label: '家庭での看護・介護（1日2時間以上3時間未満）', value: `${prefix}_care_home_20`, points: 20 },
  {
    label: '療育施設・養護学校等への母子通園、付添い・送迎（1日8時間以上）',
    value: `${prefix}_care_school_40`,
    points: 40,
  },
  {
    label: '療育施設・養護学校等への母子通園、付添い・送迎（1日3時間以上8時間未満）',
    value: `${prefix}_care_school_30`,
    points: 30,
  },
  {
    label: '療育施設・養護学校等への母子通園、付添い・送迎（1日2時間以上3時間未満）',
    value: `${prefix}_care_school_20`,
    points: 20,
  },
];

/** 4 求職活動 */
const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  {
    label: 'おおむね過去6か月以内に採用選考を受けている、または内定している',
    value: `${prefix}_jobseeking_25`,
    points: 25,
  },
  { label: 'ハローワーク等の登録が有効である', value: `${prefix}_jobseeking_20`, points: 20 },
  { label: 'その他求職活動を申告している', value: `${prefix}_jobseeking_15`, points: 15 },
];

/** 5 妊娠・出産 */
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  {
    label: '切迫早流産等により入院または療養等が必要（2か月以上）、および分娩後2か月以内',
    value: `${prefix}_childbirth_50`,
    points: 50,
  },
  {
    label: '切迫早流産等により入院または療養等が必要（2か月未満）、および分娩後2か月以内',
    value: `${prefix}_childbirth_40`,
    points: 40,
  },
  { label: '妊娠している、または分娩後2か月以内', value: `${prefix}_childbirth_30`, points: 30 },
];

/** 6 災害復旧 */
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '震災、風水害、火災その他の災害の復旧に当たっている', value: `${prefix}_disaster_55`, points: 55 },
];

/** 7 就学等 */
const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  {
    label: '学校・専修学校等の学校教育法に規定する各種学校やそれに準ずる教育施設に在学',
    value: `${prefix}_education_45`,
    points: 45,
  },
  {
    label: '職業能力開発促進法等に規定する職業訓練等を受けている',
    value: `${prefix}_education_40`,
    points: 40,
  },
];

/** 8 児童虐待・配偶者からの暴力等 */
const abuseOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_abuse_none`, points: 0 },
  {
    label: '児童虐待を行っている、または再び行われるおそれがあると認められる（協議会からの情報提供による）',
    value: `${prefix}_abuse_50a`,
    points: 50,
  },
  {
    label: '配偶者からの暴力により入所児童の保育を行うことが困難（協議会からの情報提供による）',
    value: `${prefix}_abuse_50b`,
    points: 50,
  },
];

/** 9 育児休業 */
const parentalLeaveOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_leave_none`, points: 0 },
  {
    label: '育児休業中で、その育児休業に係る子ども以外の児童について継続入所を希望する（転園の場合のみ）',
    value: `${prefix}_leave_25`,
    points: 25,
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
    helpText: '事由が重複する場合は、高い方の点数で判定されます',
    inputType: 'select',
    options: [
      { label: '労働を常態としている', value: `${prefix}_reason_employment`, points: 0 },
      { label: '疾病・負傷・障がい', value: `${prefix}_reason_illness`, points: 0 },
      { label: '同居の親族の介護・看護・付添い', value: `${prefix}_reason_care`, points: 0 },
      { label: '求職活動（起業の準備を含む）', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '妊娠・出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '災害復旧', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '就学等', value: `${prefix}_reason_education`, points: 0 },
      { label: '児童虐待・配偶者からの暴力等', value: `${prefix}_reason_abuse`, points: 0 },
      { label: '育児休業中の継続入所（転園）', value: `${prefix}_reason_leave`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の1か月当たりの就労時間は？`,
      helpText:
        '家庭内・家庭外で労働に主として従事している場合が対象で、被雇用者、自営業・農業の中心者、自営業・農業の協力者に共通の基準です。労働・介護看護・付添い・就学は、1か月当たり48時間以上を常態としなければ認定されません',
      inputType: 'radio',
      options: employmentOptions(prefix),
    },
    {
      id: `${prefix}_illness`,
      category,
      label: `${parentLabel}の疾病・負傷・障がいの状況は？`,
      helpText:
        '「入院・病臥」とは入所時より概ね2か月以上家事や育児が困難であると診断された場合、「軽病」とは概ね2か月以上家事や育児の軽減が必要であると診断された場合を指します',
      inputType: 'radio',
      options: illnessOptions(prefix),
    },
    {
      id: `${prefix}_care`,
      category,
      label: `${parentLabel}の介護・看護・付添いの状況は？`,
      helpText: '長期入院等をしている親族を含みます。入院付添い・家庭での看護介護・通園付添いは重複しません',
      inputType: 'radio',
      options: careOptions(prefix),
    },
    {
      id: `${prefix}_jobseeking`,
      category,
      label: `${parentLabel}の求職活動の状況は？`,
      helpText: '求職活動の事由で認定された場合の認定期間は3か月間です',
      inputType: 'radio',
      options: jobSeekingOptions(prefix),
    },
    {
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}の妊娠・出産の状況は？`,
      helpText: '認定期間は分娩後56日を経過する日の属する月の末日までです',
      inputType: 'radio',
      options: childbirthOptions(prefix),
    },
    {
      id: `${prefix}_disaster`,
      category,
      label: `${parentLabel}は災害の復旧に当たっていますか？`,
      inputType: 'radio',
      options: disasterOptions(prefix),
    },
    {
      id: `${prefix}_education`,
      category,
      label: `${parentLabel}の就学等の状況は？`,
      inputType: 'radio',
      options: educationOptions(prefix),
    },
    {
      id: `${prefix}_abuse`,
      category,
      label: `${parentLabel}は児童虐待・配偶者からの暴力等にあてはまりますか？`,
      inputType: 'radio',
      options: abuseOptions(prefix),
    },
    {
      id: `${prefix}_leave`,
      category,
      label: `${parentLabel}は育児休業中の継続入所を希望しますか？`,
      inputType: 'radio',
      options: parentalLeaveOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// ---------------------------------------------------------------------------
// 優先事由による加点及びその他事由による加点・減点
// ---------------------------------------------------------------------------

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親世帯、またはそれに準ずる世帯ですか？',
    helpText: '配偶者のいない女子または男子が20歳未満の児童を扶養している世帯が対象です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい', value: 'adj_single_parent_yes', points: 70 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯で、就労支援等により児童の保育が必要と認められますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい', value: 'adj_welfare_yes', points: 50 },
    ],
  },
  {
    id: 'adj_layoff',
    category: 'adjustment',
    label: '生計中心者の失業により就労の必要性が高いですか？',
    helpText: 'ひとり親世帯・生活保護世帯は除きます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_layoff_no', points: 0 },
      { label: 'はい', value: 'adj_layoff_yes', points: 25 },
    ],
  },
  {
    id: 'adj_social_care',
    category: 'adjustment',
    label: '虐待やDVのおそれがあるなど、社会的擁護が必要ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_social_care_no', points: 0 },
      { label: 'はい', value: 'adj_social_care_yes', points: 10 },
    ],
  },
  {
    id: 'adj_child_disability',
    category: 'adjustment',
    label: '入所児童が障がいを有し、手帳等で確認できますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_child_disability_no', points: 0 },
      { label: 'はい', value: 'adj_child_disability_yes', points: 10 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: 'きょうだいの利用状況は？',
    helpText: '多胎児を含みます',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_sibling_no', points: 0 },
      {
        label: 'きょうだいが既に利用している保育施設等の利用を希望する（転園含む）',
        value: 'adj_sibling_8',
        points: 8,
      },
      { label: 'きょうだいがその年度内に同一保育所等の利用を希望する', value: 'adj_sibling_5', points: 5 },
    ],
  },
  {
    id: 'adj_ninkagai',
    category: 'adjustment',
    label: '申込事由を理由として認可外保育所等を週3日以上利用していますか？',
    helpText: '企業主導型、認可外保育所、一時預かり保育が対象です（求職中を除く）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_ninkagai_no', points: 0 },
      { label: 'はい', value: 'adj_ninkagai_yes', points: 5 },
    ],
  },
  {
    id: 'adj_grandparent',
    category: 'adjustment',
    label: '同一敷地内に居住する祖父母等（65歳以下）が保育可能ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_grandparent_no', points: 0 },
      { label: 'はい', value: 'adj_grandparent_yes', points: -5 },
    ],
  },
  {
    id: 'adj_school_district',
    category: 'adjustment',
    label: '就学に配慮するため、小学校区内の保育施設等の利用を希望しますか？',
    helpText: '3歳児以上に限ります',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_school_district_no', points: 0 },
      { label: 'はい', value: 'adj_school_district_yes', points: 8 },
    ],
  },
  {
    id: 'adj_facility_closed',
    category: 'adjustment',
    label: '保育施設等の閉所に伴い転園を希望しますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_facility_closed_no', points: 0 },
      { label: 'はい', value: 'adj_facility_closed_yes', points: 8 },
    ],
  },
  {
    id: 'adj_self_helper',
    category: 'adjustment',
    label: '自営業の協力者・農業協力者・内職に従事している保護者はいますか？',
    helpText: '給与が支給されている者は除きます。該当する保護者の人数の範囲内で減算されます',
    inputType: 'radio',
    options: [
      { label: 'いない', value: 'adj_self_helper_0', points: 0 },
      { label: '居宅外で自営業の協力者（1人）', value: 'adj_self_helper_out_1', points: -10 },
      { label: '居宅外で自営業の協力者（2人）', value: 'adj_self_helper_out_2', points: -20 },
      { label: '居宅内で自営業の協力者、農業協力者、または内職（1人）', value: 'adj_self_helper_in_1', points: -15 },
      { label: '居宅内で自営業の協力者、農業協力者、または内職（2人）', value: 'adj_self_helper_in_2', points: -30 },
    ],
  },
  {
    id: 'adj_hoikushi',
    category: 'adjustment',
    label: '保護者が市内の認可保育施設等に保育士として就労していますか？',
    helpText: '1か月当たり120時間以上の就労、または就労予定（育児休業復帰予定を含む）が対象です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_hoikushi_0', points: 0 },
      { label: 'はい（1人）', value: 'adj_hoikushi_1', points: 15 },
      { label: 'はい（2人）', value: 'adj_hoikushi_2', points: 30 },
    ],
  },
  {
    id: 'adj_tanshin',
    category: 'adjustment',
    label: '保護者のいずれかが単身赴任していますか？',
    helpText: '祖父母等が同一敷地内に居住する場合を除きます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_tanshin_no', points: 0 },
      { label: 'はい', value: 'adj_tanshin_yes', points: 5 },
    ],
  },
  {
    id: 'adj_self_proof',
    category: 'adjustment',
    label: '自営業主で、事業内容を証明する客観資料を提出できますか？',
    inputType: 'radio',
    options: [
      { label: '自営業主ではない、または提出できる', value: 'adj_self_proof_0', points: 0 },
      { label: '提出できない（1人）', value: 'adj_self_proof_1', points: -15 },
      { label: '提出できない（2人）', value: 'adj_self_proof_2', points: -30 },
    ],
  },
  {
    id: 'adj_leave_extension',
    category: 'adjustment',
    label: '希望する保育所等に入所できない場合、育児休業の延長を許容すると意思表示しますか？',
    helpText: '該当する保護者の人数の範囲内で減算されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_leave_extension_0', points: 0 },
      { label: 'はい（1人）', value: 'adj_leave_extension_1', points: -50 },
      { label: 'はい（2人）', value: 'adj_leave_extension_2', points: -100 },
    ],
  },
];

export const igaData: MunicipalityData = {
  municipality,
  questions: [...buildParentQuestions(1), ...buildParentQuestions(2), ...adjustmentQuestions],
};
