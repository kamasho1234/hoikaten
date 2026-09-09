import type { MunicipalityData, Question } from '../types';

// -------------------------------------------------------------------------
// 壱岐市 保育園入園 利用調整基準データ
// 出典: 壱岐市「特定教育・保育施設及び特定地域型保育事業の利用調整に関する基準」
// https://www.city.iki.nagasaki.jp/material/files/group/50/riyoutyouseihyou.pdf
// -------------------------------------------------------------------------
// 壱岐市は別表第1の注記に父母の合わせ方が書かれている。
//   「※1 父母それぞれの指数を合算し、世帯の指数を決定する。（基準指数）」
//   「3 保護者が保育の必要な事由（就労等）が2以上ある場合には、
//      原則として指数の高い状況をとり指数を決定する。」
// 父母それぞれの指数を合算するので scoringMethod は 'sum'。
// 基準指数の最大は1人あたり20点。
//
// 番号6「就学」は基準指数欄が「番号1を準用」「番号3を準用」なので、
// それぞれ居宅外労働と求職活動（内定）と同じ刻みを使っている。
//
// 番号11「その他 上記以外で明らかに保育に当たれない者」は指数欄が空欄なので入れていない。
//
// 調整指数の注記
//   「※2 番号1〜3は、父母ともに該当する場合、それぞれ指数を加点する。」
//   → 就労継続年数と保育士の設問は、父母何人が該当するかで点数が変わる形にした。
//   「※3 番号12〜14、17〜18はそれぞれ重複して加算しないものとする（◎）。」
//   → その組み合わせは1つの設問にまとめている。
//
// 調整指数のうち入れていないもの。
// - 番号22「保育所等の移行希望者（兄弟が別施設のため、同一施設に移行する場合）」（+3）
//   いま園を利用している方の話のため。
// - 番号26「利用者負担（保育料）等の滞納が高額となっている、又は滞納月数が10か月以上
//   となっている世帯で、納付の督促等に対して誠意ある対応が見られないなどの場合」
//   （滞納月数×−2）計算式のため。
// - その他「児童福祉等の観点から特に調整が必要とされた場合（要保護児童など）」（+20）
//   該当するかどうかが市の判断によるため。
// -------------------------------------------------------------------------

const municipality = {
  id: 'iki',
  name: '壱岐市',
  slug: 'iki',
  prefecture: '長崎県',
  maxBasePoints: 20,
  scoringMethod: 'sum',
} as const;

// 番号1 居宅外労働 ／ 番号2 居宅内労働
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '居宅外（外勤・自営）：月20日以上かつ1日8時間以上の就労を常態', value: `${prefix}_employment_0`, points: 20 },
  { label: '居宅内（自営）：月20日以上かつ1日8時間以上の就労を常態', value: `${prefix}_employment_1`, points: 20 },
  { label: '居宅外（外勤・自営）：月20日以上かつ1日6時間以上8時間未満の就労を常態', value: `${prefix}_employment_2`, points: 18 },
  { label: '居宅外（外勤・自営）：月16日以上かつ1日8時間以上の就労を常態', value: `${prefix}_employment_3`, points: 18 },
  { label: '居宅内（自営）：月20日以上かつ1日6時間以上8時間未満の就労を常態', value: `${prefix}_employment_4`, points: 18 },
  { label: '居宅内（自営）：月16日以上かつ1日8時間以上の就労を常態', value: `${prefix}_employment_5`, points: 18 },
  { label: '居宅外（外勤・自営）：月20日以上かつ1日4時間以上6時間未満の就労を常態', value: `${prefix}_employment_6`, points: 16 },
  { label: '居宅外（外勤・自営）：月16日以上かつ1日6時間以上8時間未満の就労を常態', value: `${prefix}_employment_7`, points: 16 },
  { label: '居宅内（自営）：月20日以上かつ1日4時間以上6時間未満の就労を常態', value: `${prefix}_employment_8`, points: 16 },
  { label: '居宅内（自営）：月16日以上かつ1日6時間以上8時間未満の就労を常態', value: `${prefix}_employment_9`, points: 16 },
  { label: '居宅外（外勤・自営）：月16日以上かつ1日4時間以上6時間未満の就労を常態', value: `${prefix}_employment_10`, points: 14 },
  { label: '居宅内（自営）：月16日以上かつ1日4時間以上6時間未満の就労を常態', value: `${prefix}_employment_11`, points: 14 },
  { label: '内職：1日8時間以上かつ月収5万円以上の就労を常態', value: `${prefix}_employment_12`, points: 14 },
  { label: '内職：1日4時間以上かつ月収3万円以上の就労を常態', value: `${prefix}_employment_13`, points: 12 },
  { label: '居宅外（外勤・自営）：月12日以上かつ1日6時間以上の就労を常態', value: `${prefix}_employment_14`, points: 8 },
  { label: '居宅内（自営）：月12日以上かつ1日6時間以上の就労を常態', value: `${prefix}_employment_15`, points: 8 },
  { label: '居宅外（外勤・自営）：月8日以上かつ1日8時間以上の就労を常態', value: `${prefix}_employment_16`, points: 6 },
  { label: '居宅内（自営）：月8日以上かつ1日8時間以上の就労を常態', value: `${prefix}_employment_17`, points: 6 },
  { label: '上記以外の外勤・自営・内職', value: `${prefix}_employment_18`, points: 3 },
];

// 番号3 求職活動（求職準備等を含む）
const jobseekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '内定：月20日以上かつ1日8時間以上の就労を常態', value: `${prefix}_jobseeking_0`, points: 10 },
  { label: '内定：月20日以上かつ1日6時間以上8時間未満の就労を常態', value: `${prefix}_jobseeking_1`, points: 9 },
  { label: '内定：月16日以上かつ1日8時間以上の就労を常態', value: `${prefix}_jobseeking_2`, points: 9 },
  { label: '内定：月20日以上かつ1日4時間以上6時間未満の就労を常態', value: `${prefix}_jobseeking_3`, points: 8 },
  { label: '内定：月16日以上かつ1日6時間以上8時間未満の就労を常態', value: `${prefix}_jobseeking_4`, points: 8 },
  { label: '内定：月16日以上かつ1日4時間以上6時間未満の就労を常態', value: `${prefix}_jobseeking_5`, points: 7 },
  { label: '内定：月12日以上かつ1日6時間以上の就労を常態', value: `${prefix}_jobseeking_6`, points: 5 },
  { label: '内定：月8日以上かつ1日8時間以上の就労を常態', value: `${prefix}_jobseeking_7`, points: 4 },
  { label: '上記以外の内定', value: `${prefix}_jobseeking_8`, points: 3 },
  { label: '未定：公共職業安定所の記録により1か月以上前から定期的に求職活動をしていると認められる場合', value: `${prefix}_jobseeking_9`, points: 3 },
  { label: '求職中（就労先未定）（上記以外）', value: `${prefix}_jobseeking_10`, points: 1 },
];

// 番号4 不存在
const absentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_absent_none`, points: 0 },
  { label: '死亡・離婚・行方不明・拘禁など', value: `${prefix}_absent_0`, points: 20 },
];

// 番号5 妊娠出産
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産前：出産予定月の前2箇月／出産後：出産月の後2箇月', value: `${prefix}_childbirth_0`, points: 20 },
];

// 番号6 就学（既に外出を常態＝番号1を準用、内定＝番号3を準用）
const schoolOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_school_none`, points: 0 },
  { label: '既に日中、就学・技能習得のため外出を常態：月20日以上かつ1日8時間以上', value: `${prefix}_school_0`, points: 20 },
  { label: '既に日中、就学・技能習得のため外出を常態：月20日以上かつ1日6時間以上8時間未満', value: `${prefix}_school_1`, points: 18 },
  { label: '既に日中、就学・技能習得のため外出を常態：月16日以上かつ1日8時間以上', value: `${prefix}_school_2`, points: 18 },
  { label: '既に日中、就学・技能習得のため外出を常態：月20日以上かつ1日4時間以上6時間未満', value: `${prefix}_school_3`, points: 16 },
  { label: '既に日中、就学・技能習得のため外出を常態：月16日以上かつ1日6時間以上8時間未満', value: `${prefix}_school_4`, points: 16 },
  { label: '既に日中、就学・技能習得のため外出を常態：月16日以上かつ1日4時間以上6時間未満', value: `${prefix}_school_5`, points: 14 },
  { label: '既に日中、就学・技能習得のため外出を常態：月12日以上かつ1日6時間以上', value: `${prefix}_school_6`, points: 8 },
  { label: '既に日中、就学・技能習得のため外出を常態：月8日以上かつ1日8時間以上', value: `${prefix}_school_7`, points: 6 },
  { label: '日中、就学技能習得が内定している場合（その他）', value: `${prefix}_school_8`, points: 3 },
];

// 番号7 病気・障がい
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '1か月以上入院している場合（入院予定を含む）', value: `${prefix}_illness_0`, points: 20 },
  { label: '自宅療養：常時病臥・感染症', value: `${prefix}_illness_1`, points: 20 },
  { label: '自宅療養（精神性）：精神障碍者福祉手帳1〜3級', value: `${prefix}_illness_2`, points: 20 },
  { label: '障がい：身体障害者手帳1・2級、療育手帳A1・A2・B1', value: `${prefix}_illness_3`, points: 20 },
  { label: '障がい：身体障害者手帳3級、療育手帳B2', value: `${prefix}_illness_4`, points: 18 },
  { label: '自宅療養（精神性）：上記以外の程度', value: `${prefix}_illness_5`, points: 17 },
  { label: '自宅療養（一般療養）：医師が1か月以上の安静を要すると診断した場合', value: `${prefix}_illness_6`, points: 17 },
  { label: '自宅療養（一般療養）：医師が1か月以上の通院加療を要すると診断した場合', value: `${prefix}_illness_7`, points: 13 },
  { label: '障がい：身体障害者手帳4級以下', value: `${prefix}_illness_8`, points: 12 },
];

// 番号8 介護看護
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '居宅外：週5日以上日中週30時間以上（重度心身障がい者等）の介護を通常', value: `${prefix}_care_0`, points: 20 },
  { label: '居宅内：全介護を必要とする場合（重度心身障がい者等、要介護認定3・4・5程度）', value: `${prefix}_care_1`, points: 20 },
  { label: '居宅内：一部介護を必要とする場合（要介護認定1・2程度）', value: `${prefix}_care_2`, points: 17 },
  { label: '居宅外：週5日以上日中週20時間以上の介護を通常', value: `${prefix}_care_3`, points: 16 },
  { label: '居宅内：支援を必要とする場合（要支援）', value: `${prefix}_care_4`, points: 15 },
  { label: '居宅外：週5日以上日中週16時間以上の介護を通常', value: `${prefix}_care_5`, points: 14 },
  { label: '上記以外の介護を常態（入所した場合、別途就労等が必要）', value: `${prefix}_care_6`, points: 3 },
];

// 番号9 災害復旧
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '震災、風水害、火災その他の災害の復旧に当たっている場合', value: `${prefix}_disaster_0`, points: 20 },
];

// 番号10 虐待・DV
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
    helpText: '事由が2つ以上ある場合は、原則として指数の高い状況で決定します',
    inputType: 'select',
    options: [
      { label: '就労', value: `${prefix}_reason_employment`, points: 0 },
      { label: '求職活動（求職準備等を含む）', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '不存在', value: `${prefix}_reason_absent`, points: 0 },
      { label: '妊娠出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '就学', value: `${prefix}_reason_school`, points: 0 },
      { label: '病気・障がい', value: `${prefix}_reason_illness`, points: 0 },
      { label: '介護看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '災害復旧', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '虐待・DV', value: `${prefix}_reason_dv`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の就労の状況は？`,
      helpText: '就労時間には通勤時間は含みません。ただし、休息時間は含みます',
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
      label: `${parentLabel}の妊娠出産の状況は？`,
      inputType: 'radio',
      options: childbirthOptions(prefix),
    },
    {
      id: `${prefix}_school`,
      category,
      label: `${parentLabel}の就学・技能習得の状況は？`,
      helpText: '既に外出を常態とする場合は就労、内定の場合は求職活動と同じ指数を準用します',
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
      label: `${parentLabel}の介護看護の状況は？`,
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

// 別表第2 調整指数
const adjustmentQuestions: Question[] = [
  {
    id: 'adj_work_years',
    category: 'adjustment',
    label: '就労を継続している期間は？（父母それぞれに加点されます）',
    helpText: '番号1（3年以上＋2）と番号2（1年以上3年未満＋1）は、父母ともに該当する場合それぞれ加点されます',
    inputType: 'select',
    options: [
      { label: 'あてはまらない', value: 'adj_work_years_0', points: 0 },
      { label: '1人が3年以上継続（+2）', value: 'adj_work_years_1', points: 2 },
      { label: '2人とも3年以上継続（+4）', value: 'adj_work_years_2', points: 4 },
      { label: '1人が1年以上3年未満継続（+1）', value: 'adj_work_years_3', points: 1 },
      { label: '2人とも1年以上3年未満継続（+2）', value: 'adj_work_years_4', points: 2 },
      { label: '1人が3年以上・もう1人が1年以上3年未満（+3）', value: 'adj_work_years_5', points: 3 },
    ],
  },
  {
    id: 'adj_hoikushi',
    category: 'adjustment',
    label: '保育士として月20日以上1日6時間以上の勤務をしていますか？（父母それぞれに加点されます）',
    inputType: 'select',
    options: [
      { label: 'あてはまらない', value: 'adj_hoikushi_0', points: 0 },
      { label: '1人が該当（+1）', value: 'adj_hoikushi_1', points: 1 },
      { label: '2人とも該当（+2）', value: 'adj_hoikushi_2', points: 2 },
    ],
  },
  {
    id: 'adj_unemployed',
    category: 'adjustment',
    label: '生計中心者の失業（自発的失業を除く）により就業の必要性が高いですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unemployed_0', points: 0 },
      { label: 'はい（+3）', value: 'adj_unemployed_1', points: 3 },
    ],
  },
  {
    id: 'adj_leave',
    category: 'adjustment',
    label: '保護者が産前産後休業又は育児休業を取得していますか？',
    helpText: '基準日時点で保育所等に入所している場合や出産要件で入所申込の場合を除きます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_leave_0', points: 0 },
      { label: 'はい（+1）', value: 'adj_leave_1', points: 1 },
    ],
  },
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: '同居者なしの母子（父子）家庭で、就労（又は就学・技能取得）を継続している又は内定していますか？',
    helpText: '同居者には、住所が別であっても生計を共にしている場合を含みます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_0', points: 0 },
      { label: 'はい（+5）', value: 'adj_single_parent_1', points: 5 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯・中国残留邦人支援給付受給世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_0', points: 0 },
      { label: 'はい（+2）', value: 'adj_welfare_1', points: 2 },
    ],
  },
  {
    id: 'adj_absent_parent',
    category: 'adjustment',
    label: '父母の不存在・不在についてあてはまるものは？',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_absent_parent_0', points: 0 },
      { label: '父母の両方が不存在（死亡など）（+7）', value: 'adj_absent_parent_1', points: 7 },
      { label: '父母のどちらか一人が不存在（死亡・離婚・未婚など）（+4）', value: 'adj_absent_parent_2', points: 4 },
      { label: '父母の一人が単身赴任、3か月以上入院などにより不在（+2）', value: 'adj_absent_parent_3', points: 2 },
    ],
  },
  {
    id: 'adj_children_count',
    category: 'adjustment',
    label: '子ども（4月1日現在18歳未満）は何人いますか？',
    helpText: '2人以上で+1、2人を超える場合は1人に対し1点加算されます',
    inputType: 'select',
    options: [
      { label: '1人以下', value: 'adj_children_count_0', points: 0 },
      { label: '2人（+1）', value: 'adj_children_count_1', points: 1 },
      { label: '3人（+2）', value: 'adj_children_count_2', points: 2 },
      { label: '4人以上（+3）', value: 'adj_children_count_3', points: 3 },
    ],
  },
  {
    id: 'adj_parent_disability',
    category: 'adjustment',
    label: '保護者の障がい・療養についてあてはまるものは？',
    helpText: '原典ではこの3つは重複して加算しないとされています',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_parent_disability_0', points: 0 },
      { label: '身体障害者手帳1・2級、療育手帳A、B、精神障害者保健福祉手帳1〜3級を1つ所持している（+3）', value: 'adj_parent_disability_1', points: 3 },
      { label: '視聴覚又は言語に関して身体障害者手帳3級を所持している（+2）', value: 'adj_parent_disability_2', points: 2 },
      { label: '常時病臥、精神病（手帳なし）、感染症等で居宅療養している（+2）', value: 'adj_parent_disability_3', points: 2 },
    ],
  },
  {
    id: 'adj_family_disability',
    category: 'adjustment',
    label: '同一世帯に視聴覚又は言語に関して身体障害者手帳1〜3級、療育手帳A・B、精神障害者福祉手帳を所持している者がいますか？',
    helpText: '保護者及び入所申し込み児童を除きます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_family_disability_0', points: 0 },
      { label: 'はい（+1）', value: 'adj_family_disability_1', points: 1 },
    ],
  },
  {
    id: 'adj_special_support',
    category: 'adjustment',
    label: '特別支援と判定されましたか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_special_support_0', points: 0 },
      { label: 'はい（+2）', value: 'adj_special_support_1', points: 2 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: '兄弟姉妹の申込みについてあてはまるものは？',
    helpText: '原典ではこの2つは重複して加算しないとされています',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_sibling_0', points: 0 },
      { label: '多胎児が同時に申し込みをしている（+4）', value: 'adj_sibling_1', points: 4 },
      { label: '既に兄弟姉妹が保育所等に入所している、又は同時に2人以上の申し込みをしている（+2）', value: 'adj_sibling_2', points: 2 },
    ],
  },
  {
    id: 'adj_prev_care',
    category: 'adjustment',
    label: '地域型保育の卒園・認可外保育施設への預託についてあてはまるものは？',
    helpText: '地域型保育の卒園に該当する場合、認可外への預託は加点されません',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_prev_care_0', points: 0 },
      { label: '地域型保育を入所期間満了で卒園する（+4）', value: 'adj_prev_care_1', points: 4 },
      { label: '認可外保育施設などに有料で1箇月以上前から、週4日以上かつ1日4時間以上の預託をしている（+3）', value: 'adj_prev_care_2', points: 3 },
      { label: '認可外保育施設などに有料で1箇月を経過した場合、週4日以上かつ1日4時間以上の預託をしている（+2）', value: 'adj_prev_care_3', points: 2 },
    ],
  },
  {
    id: 'adj_grandparent',
    category: 'adjustment',
    label: '同居している65歳未満の保護者の父母が無職、求職中又は月64時間以上の就労をしていませんか？',
    helpText: '疾病等で保育に当たる事ができない場合を除きます。同一世帯には同一住所又は同一建物の場合を含みます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_grandparent_0', points: 0 },
      { label: 'はい（−10）', value: 'adj_grandparent_1', points: -10 },
    ],
  },
  {
    id: 'adj_self_employed',
    category: 'adjustment',
    label: '自営の父母や、勤務先の経営者が自身又は親族である父母が、仕事内容・実績の分かる書類を提出できませんか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_self_employed_0', points: 0 },
      { label: 'はい（−10）', value: 'adj_self_employed_1', points: -10 },
    ],
  },
  {
    id: 'adj_fee_delinquent',
    category: 'adjustment',
    label: '入所児又は卒園児の利用負担（保育料）等を3箇月以上滞納していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_fee_delinquent_0', points: 0 },
      { label: 'はい（−3）', value: 'adj_fee_delinquent_1', points: -3 },
    ],
  },
  {
    id: 'adj_outside_city',
    category: 'adjustment',
    label: '市外在住者（転入予定者を除く）ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_outside_city_0', points: 0 },
      { label: '市外在住で、勤務地が市内（−10）', value: 'adj_outside_city_1', points: -10 },
      { label: '市外在住で、勤務地が市外（−20）', value: 'adj_outside_city_2', points: -20 },
    ],
  },
];

export const ikiData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
