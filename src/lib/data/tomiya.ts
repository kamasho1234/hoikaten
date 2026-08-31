import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 富谷市保育所入所選考基準表
//
// 出典: 富谷市「令和8年度 保育施設入所案内」4ページ「⑤入所審査基準」
//       https://www.tomiya-city.miyagi.jp/uploads/pdf/4d1a1954ef2d75485217c2555c8d7f34cb9c30c5.pdf
//       （令和8年度 市立・認可保育所、認定こども園、地域型保育入所申込のお知らせ
//         https://www.tomiya-city.miyagi.jp/kosodate/hoiku/65f0ff3e05c1474d96fb7ed92e411c2d90b86257.html
//         からリンクされている入所案内PDF）
//
// 2026-08-31: 従来のデータは他自治体と同じ点数配列のテンプレート（推定値）だったため、
// 上記の公式の選考基準表を読み取って全面的に置き換えた。
// 2026-08-19 の一斉置き換えでは「保育施設入所案内PDF（12ページ）に選考基準表が
// 掲載されていない」として failed にしていたが、**基準表は4ページに画像として
// 載っていて、テキスト抽出では見出しの「以下の富谷市保育所入所選考基準表に基づき」
// しか取れない**。300dpiで画像化したところ表全体を読み取れた。
//
// ## 計算方式（原典の注記）
// 「この表の適用にあたっては、まず1〜9の基本基準のいずれかに該当していることを確認し、
//   これに対応する入所指数を把握する。なお、10の調整基準に該当する世帯である時は、
//   その該当する入所指数を把握し基本基準の入所指数と合算する。
//   次に、入所指数の高い順に保育所運営会議に提出する名簿に登載する。
//   この場合入所指数が同じである時は優先順位の高い順に登載する。
//   また、入所指数が同じである時は所得（保護者合算）の低い順に登載する。」
// 「市長が特に必要と認める場合は、10の調整基準により調整を行う。」
// 基本基準は父母各最大10点なので maxBasePoints は 20。
// また案内本文に「入所申込者多数の場合は、所得の低い世帯が優先となります」とある。
//
// ## 基本基準（父、母又は保護者の状況＝同居の親族、その他の者が児童の保育にあたれない理由）
// 1 家庭外労働等（入所期間12ヶ月以内）
//   外勤 … 自給、日雇等の雇用形態で常用と比較して労働時間の短いもの、及びその他の
//     不安定就労者であって、その従事時間の実態による … 7時間以上 9／6時間以上 7／4時間以上 6
//   自営 … 居宅外の自営で、主たる自営者であるもの（本人）9／
//     居宅外の自営で父等主たる従事者に協力して従事しているもの（家族・協力者）8
//   就労先確定 … すでに勤務することが内定しているもの 6
// 2 家庭内労働（入所期間12ヶ月以内）
//   自営 … 居宅内の自営で、主たる自営者であるもの（本人）9／
//     居宅内の自営で父等主たる従事者に協力して従事しているもの（家族・協力者）7
//   農業 … 日々農作業に従事するもの 8
//   内職 … 家計の維持を目的としてメーカー、問屋、又は直接需要者から依頼され、居宅内で
//     物品の製造加工に日々従事するもので従事時間による … 7時間以上 6／4時間以上 5
// 3 母の出産等（入所期間6ヶ月以内）… 出産前2ヶ月、出産後3ヶ月 9
// 4 主たる保育者の療養等（入所期間12ヶ月以内）
//   疾病入院 … 1ヶ月以上の入院 10
//   居宅療養 常時臥床 … 疾病の概ね1ヶ月以上の常時臥床 10
//   居宅療養 精神・結核 … 医師が長期加療（安静）を要すると診断したもの 8
//   居宅療養 一般療養 … 医師が概ね1ヶ月以上加療（安静）を要すると診断したもの 6
//   居宅療養 その他 … 疾病は比較的軽症であるが、定期的に通院を要するもの 3
//   身体療養 … 身体障害者手帳所持者及び同程度と判断できるもの
//     1・2級 10／3級 7／4級以下 5
// 5 病人の看護・介護、通院、入院の付添い（入所期間12ヶ月以内）…
//   同居又は別居する親族の介護等にあたっているもの
//   7時間以上（週5日以上）10／7時間以上（週4日以下）8／
//   4時間以上（週5日以上）7／4時間以上（週4日以下）5
// 6 家族の災害（入所期間12ヶ月以内）… 火災・風災害等で家屋が失われ復旧にあたる場合 10
// 7 就学等（入所期間12ヶ月以内）… 上記1の家庭外労働に準ずる（上記1に同じ）
// 8 虐待防止等（入所期間12ヶ月以内）… 虐待やDV等が認められる、又はそのおそれがある場合 8〜11
// 9 求職（入所期間2ヶ月以内）… 求職活動を継続的に行っている、又は行う予定の場合 3
//
// ## 10 調整基準
// 児童自身の特殊事情 … 心身の障害によるもの（障がい児審査会に付議）5
// 兄弟姉妹による申込み … 兄弟姉妹との調整（保育・教育施設に入所しているまたは
//   入所申請をしている兄弟姉妹がいる場合）3
// 世帯の事情 ひとり親家庭 …
//   父・母との死別、離別、行方不明等（親子以外の親族等と同居しない場合）12／
//   父・母との死別、離別、行方不明等（65歳以上もしくは65歳未満の保育が必要な理由を
//     満たす、親子以外の親族等と同居する場合）10／
//   父・母との死別、離別、行方不明等（65歳未満の保育が必要な理由を満たさない、
//     親子以外の親族等と同居する場合）8
// 世帯の事情 生活保護世帯 … 生活保護法による被保護世帯 5
// 世帯の事情 その他 … 地域、家庭の危険度及び経済的困窮 3
// 就労日数 … パート、自営業、農業、内職等の月平均就労日数の実態による
//   月16日〜19日 マイナス1／月13日〜15日 マイナス2／月13日以下 マイナス3
// 同居者（世帯分離も同居とみなす）… 就労等をしておらず保育することが可能な
//   65歳未満の同居親族がいる場合 マイナス1
// 職業 … 父又は母が、保育士又は保育教諭として勤務している場合 3
// 年齢到達による卒園児の申込み … 小規模保育、家庭的保育施設等を保育対象年齢到達により
//   卒園する児童の申込みの場合 10
// その他 … 特別な事情により調整が必要と認められる場合 マイナス5〜5
//
// ## 質問に入れなかった規定
// - 基本基準8「虐待防止等」は「8〜11」の範囲値で点数が定まらないため
// - 調整基準「その他（特別な事情により調整が必要と認められる場合）」も
//   「マイナス5〜5」の範囲値のため
// ---------------------------------------------------------------------------

const municipality = {
  id: 'tomiya',
  name: '富谷市',
  slug: 'tomiya',
  prefecture: '宮城県',
  maxBasePoints: 20, // 父母各10点
} as const;

// ---------------------------------------------------------------------------
// 基本基準の選択肢（父母各最大10点）
// ---------------------------------------------------------------------------

/** 1 家庭外労働等 */
const employmentOutOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_out_none`, points: 0 },
  { label: '外勤：1日7時間以上', value: `${prefix}_employment_out_9`, points: 9 },
  { label: '外勤：1日6時間以上', value: `${prefix}_employment_out_7`, points: 7 },
  { label: '外勤：1日4時間以上', value: `${prefix}_employment_out_6`, points: 6 },
  {
    label: '自営：居宅外の自営で、主たる自営者である（本人）',
    value: `${prefix}_employment_out_jiei_9`,
    points: 9,
  },
  {
    label: '自営：居宅外の自営で、主たる従事者に協力して従事している（家族・協力者）',
    value: `${prefix}_employment_out_jiei_8`,
    points: 8,
  },
  {
    label: '就労先確定：すでに勤務することが内定している',
    value: `${prefix}_employment_out_naitei_6`,
    points: 6,
  },
];

/** 2 家庭内労働 */
const employmentInOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_in_none`, points: 0 },
  {
    label: '自営：居宅内の自営で、主たる自営者である（本人）',
    value: `${prefix}_employment_in_jiei_9`,
    points: 9,
  },
  {
    label: '自営：居宅内の自営で、主たる従事者に協力して従事している（家族・協力者）',
    value: `${prefix}_employment_in_jiei_7`,
    points: 7,
  },
  { label: '農業：日々農作業に従事している', value: `${prefix}_employment_in_nogyo_8`, points: 8 },
  { label: '内職：1日7時間以上', value: `${prefix}_employment_in_naishoku_6`, points: 6 },
  { label: '内職：1日4時間以上', value: `${prefix}_employment_in_naishoku_5`, points: 5 },
];

/** 3 母の出産等 */
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産前2ヶ月、出産後3ヶ月', value: `${prefix}_childbirth_9`, points: 9 },
];

/** 4 主たる保育者の療養等 */
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '疾病入院：1ヶ月以上の入院', value: `${prefix}_illness_10a`, points: 10 },
  { label: '居宅療養（常時臥床）：疾病の概ね1ヶ月以上の常時臥床', value: `${prefix}_illness_10b`, points: 10 },
  {
    label: '居宅療養（精神・結核）：医師が長期加療（安静）を要すると診断した',
    value: `${prefix}_illness_8`,
    points: 8,
  },
  {
    label: '居宅療養（一般療養）：医師が概ね1ヶ月以上加療（安静）を要すると診断した',
    value: `${prefix}_illness_6`,
    points: 6,
  },
  {
    label: '居宅療養（その他）：疾病は比較的軽症だが、定期的に通院を要する',
    value: `${prefix}_illness_3`,
    points: 3,
  },
  { label: '身体療養：身体障害者手帳1・2級（同程度と判断できるものを含む）', value: `${prefix}_illness_shintai_10`, points: 10 },
  { label: '身体療養：身体障害者手帳3級（同程度と判断できるものを含む）', value: `${prefix}_illness_shintai_7`, points: 7 },
  { label: '身体療養：身体障害者手帳4級以下（同程度と判断できるものを含む）', value: `${prefix}_illness_shintai_5`, points: 5 },
];

/** 5 病人の看護・介護、通院、入院の付添い */
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '1日7時間以上（週5日以上）', value: `${prefix}_care_10`, points: 10 },
  { label: '1日7時間以上（週4日以下）', value: `${prefix}_care_8`, points: 8 },
  { label: '1日4時間以上（週5日以上）', value: `${prefix}_care_7`, points: 7 },
  { label: '1日4時間以上（週4日以下）', value: `${prefix}_care_5`, points: 5 },
];

/** 6 家族の災害 */
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '火災・風災害等で家屋が失われ復旧にあたる', value: `${prefix}_disaster_10`, points: 10 },
];

/** 7 就学等（上記1の家庭外労働に準ずる） */
const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '1日7時間以上', value: `${prefix}_education_9`, points: 9 },
  { label: '1日6時間以上', value: `${prefix}_education_7`, points: 7 },
  { label: '1日4時間以上', value: `${prefix}_education_6`, points: 6 },
];

/** 9 求職 */
const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  {
    label: '求職活動を継続的に行っている、または行う予定',
    value: `${prefix}_jobseeking_3`,
    points: 3,
  },
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
    label: `${parentLabel}：保育にあたれない理由`,
    helpText: '基本基準1〜9のうち、あてはまるものをひとつ選んでください',
    inputType: 'select',
    options: [
      { label: '家庭外労働等', value: `${prefix}_reason_employment_out`, points: 0 },
      { label: '家庭内労働（自営・農業・内職）', value: `${prefix}_reason_employment_in`, points: 0 },
      { label: '母の出産等', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '療養等（疾病・身体障害）', value: `${prefix}_reason_illness`, points: 0 },
      {
        label: '病人の看護・介護、通院、入院の付添い',
        value: `${prefix}_reason_care`,
        points: 0,
      },
      { label: '家族の災害', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '就学等', value: `${prefix}_reason_education`, points: 0 },
      { label: '求職', value: `${prefix}_reason_jobseeking`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment_out`,
      category,
      label: `${parentLabel}の家庭外労働の状況は？`,
      helpText:
        '外勤の時間区分は、常用と比較して労働時間の短いものやその他の不安定就労者について、従事時間の実態で判断されます',
      inputType: 'radio',
      options: employmentOutOptions(prefix),
    },
    {
      id: `${prefix}_employment_in`,
      category,
      label: `${parentLabel}の家庭内労働の状況は？`,
      inputType: 'radio',
      options: employmentInOptions(prefix),
    },
    {
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}は出産の前後ですか？`,
      inputType: 'radio',
      options: childbirthOptions(prefix),
    },
    {
      id: `${prefix}_illness`,
      category,
      label: `${parentLabel}の療養の状況は？`,
      inputType: 'radio',
      options: illnessOptions(prefix),
    },
    {
      id: `${prefix}_care`,
      category,
      label: `${parentLabel}はどのくらい親族の介護等にあたっていますか？`,
      helpText: '同居・別居どちらの親族も対象です',
      inputType: 'radio',
      options: careOptions(prefix),
    },
    {
      id: `${prefix}_disaster`,
      category,
      label: `${parentLabel}は家族の災害の復旧にあたっていますか？`,
      inputType: 'radio',
      options: disasterOptions(prefix),
    },
    {
      id: `${prefix}_education`,
      category,
      label: `${parentLabel}の就学等の状況は？`,
      helpText: '就学等は家庭外労働に準じた指数になります',
      inputType: 'radio',
      options: educationOptions(prefix),
    },
    {
      id: `${prefix}_jobseeking`,
      category,
      label: `${parentLabel}は求職活動をしていますか？`,
      inputType: 'radio',
      options: jobSeekingOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// ---------------------------------------------------------------------------
// 10 調整基準（世帯単位）の質問
// ---------------------------------------------------------------------------

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_child_disability',
    category: 'adjustment',
    label: '児童自身に心身の障害がありますか？',
    helpText: '障がい児審査会に付議されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_child_disability_no', points: 0 },
      { label: 'はい', value: 'adj_child_disability_yes', points: 5 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: '保育・教育施設に入所している、または入所申請をしている兄弟姉妹がいますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_no', points: 0 },
      { label: 'はい', value: 'adj_sibling_yes', points: 3 },
    ],
  },
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親家庭ですか？',
    helpText: '父・母との死別、離別、行方不明等の場合が対象です',
    inputType: 'select',
    options: [
      { label: 'あてはまらない', value: 'adj_single_parent_none', points: 0 },
      { label: '親子以外の親族等と同居しない', value: 'adj_single_parent_12', points: 12 },
      {
        label: '65歳以上、または65歳未満で保育が必要な理由を満たす親族等と同居する',
        value: 'adj_single_parent_10',
        points: 10,
      },
      {
        label: '65歳未満で保育が必要な理由を満たさない親族等と同居する',
        value: 'adj_single_parent_8',
        points: 8,
      },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護法による被保護世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい', value: 'adj_welfare_yes', points: 5 },
    ],
  },
  {
    id: 'adj_household_other',
    category: 'adjustment',
    label: '地域や家庭の危険度、経済的困窮がありますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_household_other_no', points: 0 },
      { label: 'はい', value: 'adj_household_other_yes', points: 3 },
    ],
  },
  {
    id: 'adj_work_days',
    category: 'adjustment',
    label: '月平均の就労日数は？',
    helpText: 'パート、自営業、農業、内職等の月平均就労日数の実態によります',
    inputType: 'select',
    options: [
      { label: '月20日以上（またはあてはまらない）', value: 'adj_work_days_0', points: 0 },
      { label: '月16日〜19日', value: 'adj_work_days_minus1', points: -1 },
      { label: '月13日〜15日', value: 'adj_work_days_minus2', points: -2 },
      { label: '月13日以下', value: 'adj_work_days_minus3', points: -3 },
    ],
  },
  {
    id: 'adj_cohabitant',
    category: 'adjustment',
    label: '就労等をしておらず保育することが可能な65歳未満の同居親族がいますか？',
    helpText: '世帯分離も同居とみなされます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_cohabitant_no', points: 0 },
      { label: 'はい', value: 'adj_cohabitant_yes', points: -1 },
    ],
  },
  {
    id: 'adj_hoikushi',
    category: 'adjustment',
    label: '父または母が保育士・保育教諭として勤務していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_hoikushi_no', points: 0 },
      { label: 'はい', value: 'adj_hoikushi_yes', points: 3 },
    ],
  },
  {
    id: 'adj_graduate',
    category: 'adjustment',
    label: '小規模保育・家庭的保育施設等を年齢到達により卒園する児童の申込みですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_graduate_no', points: 0 },
      { label: 'はい', value: 'adj_graduate_yes', points: 10 },
    ],
  },
];

// ---------------------------------------------------------------------------
// エクスポート
// ---------------------------------------------------------------------------

export const tomiyaData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
