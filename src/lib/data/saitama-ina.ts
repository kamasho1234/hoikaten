import type { MunicipalityData, Question } from '../types';

// -------------------------------------------------------------------------
// 伊奈町（埼玉県） 保育園入園 利用調整基準データ
// 出典: 伊奈町「令和8年度伊奈町保育施設等入所の利用調整に関する基準」
// https://www.town.saitama-ina.lg.jp/cmsfiles/contents/0000009/9356/kijun.pdf
// -------------------------------------------------------------------------
// slug は 'saitama-ina'。空き状況データが先にこの slug を使っているので合わせている。
//
// 伊奈町は基準指数表の末尾に父母の合わせ方が書かれている。
//   「基準指数小計【A】（父＋母の合計値）※二人合わせて最高40点」
//   「合計指数【A＋B】」
// 父＋母の合計値なので scoringMethod は 'sum'。
// 基準指数の最大は1人あたり20点。
//
// 番号5「就学」は指数欄が「番号1を準用」「番号2を準用」なので、
// それぞれ就労と求職活動（内定）と同じ刻みを使っている。
//
// 番号4「妊娠・出産」は父の欄が斜線なので、母のみの区分である。
//
// 調整指数の備考
//   「6〜8のうちいずれか一つ」「11〜14のうちいずれか一つ」
//   → それぞれ1つの設問にまとめている。
//
// 調整指数のうち入れていないもの。
// - 18「町外の認可保育施設に入所しており、町内の認可保育施設への転園を希望
//   （転入予定者含む）」（+8）
// - 22「兄弟姉妹が別施設に入所中のため、同一施設に転園を希望」（+8）
//   いずれも転園の話のため。
// - 23「要支援家庭等（児童福祉等の観点から特に調整が必要とされた場合）」（+20）
//   該当するかどうかが町の判断によるため。
// -------------------------------------------------------------------------

const municipality = {
  id: 'saitama-ina',
  name: '伊奈町',
  slug: 'saitama-ina',
  prefecture: '埼玉県',
  maxBasePoints: 40, // 父母各20点の合計
  scoringMethod: 'sum',
} as const;

// 番号1 就労（外勤又は自営 ／ 内職）
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '外勤・自営：月20日以上（週5日以上）かつ1日7時間（週35時間）以上の就労を常態', value: `${prefix}_employment_0`, points: 20 },
  { label: '外勤・自営：月20日以上（週5日以上）かつ1日6時間（週30時間）以上の就労を常態', value: `${prefix}_employment_1`, points: 18 },
  { label: '外勤・自営：月16日以上（週4日以上）かつ1日7時間（週28時間）以上の就労を常態', value: `${prefix}_employment_2`, points: 18 },
  { label: '外勤・自営：月20日以上（週5日以上）かつ1日4時間（週20時間）以上の就労を常態', value: `${prefix}_employment_3`, points: 16 },
  { label: '外勤・自営：月16日以上（週4日以上）かつ1日6時間（週24時間）以上の就労を常態', value: `${prefix}_employment_4`, points: 16 },
  { label: '外勤・自営：月16日以上（週4日以上）かつ1日4時間（週16時間）以上の就労を常態', value: `${prefix}_employment_5`, points: 14 },
  { label: '外勤・自営：上記以外で月64時間以上を常態として就労している', value: `${prefix}_employment_6`, points: 13 },
  { label: '内職：月収5万円以上の就労を常態', value: `${prefix}_employment_7`, points: 12 },
  { label: '内職：月収5万円以下の就労を常態', value: `${prefix}_employment_8`, points: 10 },
];

// 番号2 求職活動
const jobseekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '内定：月20日以上かつ1日7時間（週35時間）以上の就労を常態', value: `${prefix}_jobseeking_0`, points: 10 },
  { label: '内定：月20日以上かつ1日6時間（週30時間）以上の就労を常態', value: `${prefix}_jobseeking_1`, points: 9 },
  { label: '内定：月16日以上かつ1日7時間（週28時間）以上の就労を常態', value: `${prefix}_jobseeking_2`, points: 9 },
  { label: '内定：月20日以上かつ1日4時間（週20時間）以上の就労を常態', value: `${prefix}_jobseeking_3`, points: 8 },
  { label: '内定：月16日以上かつ1日6時間（週24時間）以上の就労を常態', value: `${prefix}_jobseeking_4`, points: 8 },
  { label: '内定：月16日以上かつ1日4時間（週16時間）以上の就労を常態', value: `${prefix}_jobseeking_5`, points: 7 },
  { label: '内定：上記以外で月64時間以上を常態として就労している', value: `${prefix}_jobseeking_6`, points: 5 },
  { label: '未定：求職中（就労誓約書）', value: `${prefix}_jobseeking_7`, points: 1 },
];

// 番号3 不存在
const absentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_absent_none`, points: 0 },
  { label: '死亡、離婚（調停中、裁判中、住民票が別）、行方不明、拘禁、未婚', value: `${prefix}_absent_0`, points: 20 },
];

// 番号4 妊娠・出産（母のみ）
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '予定日の前後2か月（入所期間終了後も入所希望する場合は、再度申請が必要）', value: `${prefix}_childbirth_0`, points: 20 },
];

// 番号5 就学（番号1・番号2を準用）
const schoolOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_school_none`, points: 0 },
  { label: 'すでに日中、就学・技能習得のため外出を常態：月20日以上かつ1日7時間以上', value: `${prefix}_school_0`, points: 20 },
  { label: 'すでに日中、就学・技能習得のため外出を常態：月20日以上かつ1日6時間以上', value: `${prefix}_school_1`, points: 18 },
  { label: 'すでに日中、就学・技能習得のため外出を常態：月16日以上かつ1日7時間以上', value: `${prefix}_school_2`, points: 18 },
  { label: 'すでに日中、就学・技能習得のため外出を常態：月20日以上かつ1日4時間以上', value: `${prefix}_school_3`, points: 16 },
  { label: 'すでに日中、就学・技能習得のため外出を常態：月16日以上かつ1日6時間以上', value: `${prefix}_school_4`, points: 16 },
  { label: 'すでに日中、就学・技能習得のため外出を常態：月16日以上かつ1日4時間以上', value: `${prefix}_school_5`, points: 14 },
  { label: 'すでに日中、就学・技能習得のため外出を常態：上記以外で月64時間以上', value: `${prefix}_school_6`, points: 13 },
  { label: '日中、就学・技能習得が内定：月20日以上かつ1日7時間以上', value: `${prefix}_school_7`, points: 10 },
  { label: '日中、就学・技能習得が内定：月20日以上かつ1日6時間以上', value: `${prefix}_school_8`, points: 9 },
  { label: '日中、就学・技能習得が内定：月16日以上かつ1日7時間以上', value: `${prefix}_school_9`, points: 9 },
  { label: '日中、就学・技能習得が内定：月20日以上かつ1日4時間以上', value: `${prefix}_school_10`, points: 8 },
  { label: '日中、就学・技能習得が内定：月16日以上かつ1日6時間以上', value: `${prefix}_school_11`, points: 8 },
  { label: '日中、就学・技能習得が内定：月16日以上かつ1日4時間以上', value: `${prefix}_school_12`, points: 7 },
  { label: '日中、就学・技能習得が内定：上記以外で月64時間以上', value: `${prefix}_school_13`, points: 5 },
];

// 番号6 病気・障がい
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '1ヶ月以上入院予定', value: `${prefix}_illness_0`, points: 20 },
  { label: '自宅療養：常時臥床', value: `${prefix}_illness_1`, points: 20 },
  { label: '自宅療養（精神性）：精神障害者保健福祉手帳1〜2級', value: `${prefix}_illness_2`, points: 20 },
  { label: '障がい：身体障害者手帳1・2級、療育手帳○A〜B', value: `${prefix}_illness_3`, points: 20 },
  { label: '障がい：身体障害者手帳3級', value: `${prefix}_illness_4`, points: 18 },
  { label: '自宅療養（精神性）：上記以外の程度', value: `${prefix}_illness_5`, points: 16 },
  { label: '自宅療養（一般療養）：医師が1ヶ月以上の安静を要すると診断した場合', value: `${prefix}_illness_6`, points: 16 },
  { label: '自宅療養（一般療養）：医師が1ヶ月以上の通院加療を要すると診断した場合', value: `${prefix}_illness_7`, points: 12 },
  { label: '障がい：身体障害者手帳4級以下、療育手帳C', value: `${prefix}_illness_8`, points: 12 },
];

// 番号7 看護・介護
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '居宅外：週5日以上日中週30時間以上（重度心身障害者（児）等）の介護を状態', value: `${prefix}_care_0`, points: 20 },
  { label: '居宅内：全介護を必要とする場合（重度心身障害者、要介護認定3・4・5程度）', value: `${prefix}_care_1`, points: 20 },
  { label: '居宅外：週5日以上日中週20時間以上の介護を状態', value: `${prefix}_care_2`, points: 16 },
  { label: '居宅内：一部介護を必要とする場合（要介護認定1・2程度）', value: `${prefix}_care_3`, points: 15 },
  { label: '居宅外：週4日以上日中週16時間以上の介護を状態', value: `${prefix}_care_4`, points: 14 },
];

// 番号8 災害・復旧
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '震災、風水害、火災その他の災害の復旧に当たっている場合', value: `${prefix}_disaster_0`, points: 20 },
];

// 番号9 虐待・DV
const dvOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_dv_none`, points: 0 },
  { label: '児童虐待防止法第2条又は配偶者暴力防止法第1条の対象者と認められる場合', value: `${prefix}_dv_0`, points: 20 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: '基準指数は父と母の合計値（二人合わせて最高40点）です',
    inputType: 'select',
    options: [
      { label: '就労', value: `${prefix}_reason_employment`, points: 0 },
      { label: '求職活動', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '不存在', value: `${prefix}_reason_absent`, points: 0 },
      { label: '妊娠・出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '就学', value: `${prefix}_reason_school`, points: 0 },
      { label: '病気・障がい', value: `${prefix}_reason_illness`, points: 0 },
      { label: '看護・介護', value: `${prefix}_reason_care`, points: 0 },
      { label: '災害・復旧', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '虐待・DV', value: `${prefix}_reason_dv`, points: 0 },
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
      label: `${parentLabel}の求職活動の状況は？`,
      inputType: 'radio',
      options: jobseekingOptions(prefix),
    },
    {
      id: `${prefix}_absent`,
      category,
      label: `${parentLabel}は不存在ですか？`,
      inputType: 'radio',
      options: absentOptions(prefix),
    },
    {
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}の妊娠・出産の状況は？`,
      helpText: '原典では母のみに指数が付く区分です',
      inputType: 'radio',
      options: childbirthOptions(prefix),
    },
    {
      id: `${prefix}_school`,
      category,
      label: `${parentLabel}の就学・技能習得の状況は？`,
      helpText: 'すでに外出を常態とする場合は就労、内定の場合は求職活動と同じ指数を準用します',
      inputType: 'radio',
      options: schoolOptions(prefix),
    },
    {
      id: `${prefix}_illness`,
      category,
      label: `${parentLabel}の病気・障がいの状況は？`,
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
      label: `${parentLabel}は災害の復旧に当たっていますか？`,
      inputType: 'radio',
      options: disasterOptions(prefix),
    },
    {
      id: `${prefix}_dv`,
      category,
      label: `${parentLabel}の世帯は虐待・DVの対象者と認められますか？`,
      inputType: 'radio',
      options: dvOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// 2. 調整指数
const adjustmentQuestions: Question[] = [
  {
    id: 'adj_unemployed',
    category: 'adjustment',
    label: '生計中心者の失業（解雇・倒産）により就労の必要性が高いですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unemployed_0', points: 0 },
      { label: 'はい（+3）', value: 'adj_unemployed_1', points: 3 },
    ],
  },
  {
    id: 'adj_leave',
    category: 'adjustment',
    label: '保護者が産前産後の休業または育児休業を取得していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_leave_0', points: 0 },
      { label: 'はい（+2）', value: 'adj_leave_1', points: 2 },
    ],
  },
  {
    id: 'adj_hoikushi',
    category: 'adjustment',
    label: '保育施設に保育士等として勤務していますか？',
    helpText: '保育士、幼稚園教諭、保育教諭、看護師、准看護師の有資格者が対象です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_hoikushi_0', points: 0 },
      { label: '町内の保育施設に勤務している（+5）', value: 'adj_hoikushi_1', points: 5 },
      { label: '町外の保育施設（保育所、小規模、認こ、認可外、事業所内託児所）に勤務している（+4）', value: 'adj_hoikushi_2', points: 4 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯または中国残留邦人支援給付受給世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_0', points: 0 },
      { label: 'はい（+8）', value: 'adj_welfare_1', points: 8 },
    ],
  },
  {
    id: 'adj_absent_parent',
    category: 'adjustment',
    label: '父母の不存在についてあてはまるものは？',
    helpText: '原典ではこの3つのうちいずれか一つが加算されます',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_absent_parent_0', points: 0 },
      { label: '父母の両方が不存在（死亡など）（+16）', value: 'adj_absent_parent_1', points: 16 },
      { label: '父母の一人が不存在（死亡、離婚、未婚）（+15）', value: 'adj_absent_parent_2', points: 15 },
      { label: '離婚協議中、離婚調停中、裁判中（状況がわかる書類が必要）（+14）', value: 'adj_absent_parent_3', points: 14 },
    ],
  },
  {
    id: 'adj_tanshin',
    category: 'adjustment',
    label: '父母の一人が単身赴任、または3ヶ月以上入院等により不在ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_tanshin_0', points: 0 },
      { label: 'はい（+3）', value: 'adj_tanshin_1', points: 3 },
    ],
  },
  {
    id: 'adj_three_preschool',
    category: 'adjustment',
    label: '申込み日現在、小学校就学前の児童が3人以上いますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_three_preschool_0', points: 0 },
      { label: 'はい（+2）', value: 'adj_three_preschool_1', points: 2 },
    ],
  },
  {
    id: 'adj_disability',
    category: 'adjustment',
    label: '障がい・難病についてあてはまるものは？',
    helpText: '原典ではこの4つのうちいずれか一つが加算されます',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_disability_0', points: 0 },
      { label: '保護者が身体障害者手帳1・2級、療育手帳○A〜B、精神障害者保健福祉手帳1〜2級を所持（+3）', value: 'adj_disability_1', points: 3 },
      { label: '保護者が身体障害者手帳3級、精神障害者保健福祉手帳3級を所持（+2）', value: 'adj_disability_2', points: 2 },
      { label: '保護者が難病を患っている（基準指数6「病気」項目該当者のみ加点）（+1）', value: 'adj_disability_3', points: 1 },
      { label: '保護者以外で同一世帯に身体障害者手帳1〜3級、療育手帳○A〜B、精神障害者保健福祉手帳1〜2級を所持しているものがいる（+1）', value: 'adj_disability_4', points: 1 },
    ],
  },
  {
    id: 'adj_sibling_enrolled',
    category: 'adjustment',
    label: 'すでに兄弟姉妹が保育施設に入所中ですか？',
    helpText: '在籍児が卒園する場合は除きます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_enrolled_0', points: 0 },
      { label: 'はい（+4）', value: 'adj_sibling_enrolled_1', points: 4 },
    ],
  },
  {
    id: 'adj_sibling_same_time',
    category: 'adjustment',
    label: '兄弟姉妹で同時に新規申込みをしますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_same_time_0', points: 0 },
      { label: 'はい（+2）', value: 'adj_sibling_same_time_1', points: 2 },
    ],
  },
  {
    id: 'adj_chiikigata',
    category: 'adjustment',
    label: '地域型保育施設等を入所期間満了で卒園しますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_chiikigata_0', points: 0 },
      { label: 'はい（+30）', value: 'adj_chiikigata_1', points: 30 },
    ],
  },
  {
    id: 'adj_prev_care',
    category: 'adjustment',
    label: '現在の預け先であてはまるものは？',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_prev_care_0', points: 0 },
      { label: '認可外保育施設（家庭保育室、ベビーホテル等）に有料で預託している（+4）', value: 'adj_prev_care_1', points: 4 },
      { label: '職場内託児所に有料で預託している（+3）', value: 'adj_prev_care_2', points: 3 },
      { label: '一時預かり利用中（直近1か月の利用が10回以上）（+1）', value: 'adj_prev_care_3', points: 1 },
    ],
  },
  {
    id: 'adj_self_employed',
    category: 'adjustment',
    label: '自営についてあてはまるものは？',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_self_employed_0', points: 0 },
      { label: '自営で中心者でない場合（児童の祖父母等家族が経営者の場合）（−1）', value: 'adj_self_employed_1', points: -1 },
      { label: '居宅内における自営業の場合（−1）', value: 'adj_self_employed_2', points: -1 },
    ],
  },
  {
    id: 'adj_other_preschool',
    category: 'adjustment',
    label: '申込児以外の子どもを保育所・幼稚園等に預けていない世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_other_preschool_0', points: 0 },
      { label: 'はい（−1）', value: 'adj_other_preschool_1', points: -1 },
    ],
  },
  {
    id: 'adj_no_address',
    category: 'adjustment',
    label: '転入予定者のうち、居住予定地が確認できませんか？',
    helpText: '契約書の写しがない場合が対象です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_no_address_0', points: 0 },
      { label: 'はい（−5）', value: 'adj_no_address_1', points: -5 },
    ],
  },
  {
    id: 'adj_no_proof',
    category: 'adjustment',
    label: '65歳未満世帯員の勤務証明書等書類を提出していませんか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_no_proof_0', points: 0 },
      { label: 'はい（−20）', value: 'adj_no_proof_1', points: -20 },
    ],
  },
  {
    id: 'adj_fee_delinquent',
    category: 'adjustment',
    label: '入所児童または卒園児童の保育料を滞納していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_fee_delinquent_0', points: 0 },
      { label: 'はい（−25）', value: 'adj_fee_delinquent_1', points: -25 },
    ],
  },
  {
    id: 'adj_declined',
    category: 'adjustment',
    label: '入所内定後、自己都合により辞退したことがありますか？',
    helpText: '一回につき・年度内のみ減算されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_declined_0', points: 0 },
      { label: 'はい（−10）', value: 'adj_declined_1', points: -10 },
    ],
  },
];

export const saitamaInaData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
