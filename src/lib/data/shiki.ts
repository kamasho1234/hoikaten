import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 志木市 保育園等利用調整実施基準表（別表（第2条関係））・調整指数データ
//
// 出典: 志木市保育課「保育施設利用案内」P32-P33
//       「13 保育の実施基準表」保育園等利用調整実施基準表（令和5年度〜）および調整指数
//       https://www.city.shiki.lg.jp/uploaded/attachment/19829.pdf
//
// 2026-08-19: 従来のデータは他自治体と同じ点数配列のテンプレート（推定値）だったため、
//             上記の公式基準を読み取って全面的に置き換えた。
//
// 原典の備考:
//   1 時間は、始業から終業までの時間（休息及び休憩時間を含む）とする。
//   2 指数の算定は、保護者が2人のときは合算するものとし、保護者が1人のときはその指数に30を加える。
//   3 市外からの申請者（入園希望日の前日までに転入する予定のものを除く）については、
//     市内の申請者の選考後に審査を行う。
//
// 質問に含めていない原典の項目:
//   ・基準表13「その他（1から12までに掲げるもののほか、明らかに保育することができないと
//     認められる場合）」＝その事情を勘案して決定する
//   ・調整指数の「福祉事務所長が特に必要と認める場合」1〜3点（幅があるため）
// ---------------------------------------------------------------------------

const municipality = {
  id: 'shiki',
  name: '志木市',
  slug: 'shiki',
  prefecture: '埼玉県',
  maxBasePoints: 60, // 父母各30点
} as const;

// ---------------------------------------------------------------------------
// 保育園等利用調整実施基準表。父母それぞれについて選ぶ（保護者1人の場合は指数に30を加える）
// ---------------------------------------------------------------------------

/** 1 労働（居宅外労働・居宅内自営中心者／居宅内自営協力者） */
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '居宅外労働・居宅内自営中心者：1月160時間以上の就労を常態', value: `${prefix}_employment_30`, points: 30 },
  { label: '居宅外労働・居宅内自営中心者：1月140時間以上の就労を常態', value: `${prefix}_employment_29`, points: 29 },
  { label: '居宅外労働・居宅内自営中心者：1月120時間以上の就労を常態', value: `${prefix}_employment_28`, points: 28 },
  { label: '居宅外労働・居宅内自営中心者：1月96時間以上の就労を常態', value: `${prefix}_employment_26`, points: 26 },
  { label: '居宅外労働・居宅内自営中心者：1月80時間以上の就労を常態', value: `${prefix}_employment_24`, points: 24 },
  { label: '居宅外労働・居宅内自営中心者：1月64時間以上の就労を常態', value: `${prefix}_employment_22`, points: 22 },
  { label: '居宅外労働・居宅内自営中心者：上記の細目に該当しない', value: `${prefix}_employment_18`, points: 18 },
  { label: '居宅内自営協力者：1月160時間以上の就労を常態', value: `${prefix}_employment_help_29`, points: 29 },
  { label: '居宅内自営協力者：1月140時間以上の就労を常態', value: `${prefix}_employment_help_28`, points: 28 },
  { label: '居宅内自営協力者：1月120時間以上の就労を常態', value: `${prefix}_employment_help_27`, points: 27 },
  { label: '居宅内自営協力者：1月96時間以上の就労を常態', value: `${prefix}_employment_help_25`, points: 25 },
  { label: '居宅内自営協力者：1月80時間以上の就労を常態', value: `${prefix}_employment_help_23`, points: 23 },
  { label: '居宅内自営協力者：1月64時間以上の就労を常態', value: `${prefix}_employment_help_21`, points: 21 },
  { label: '居宅内自営協力者：上記の細目に該当しない', value: `${prefix}_employment_help_17`, points: 17 },
];

/** 2 採用内定 */
const jobOfferOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_joboffer_none`, points: 0 },
  { label: '1月160時間以上の就労を常態とする内定', value: `${prefix}_joboffer_28`, points: 28 },
  { label: '1月140時間以上の就労を常態とする内定', value: `${prefix}_joboffer_27`, points: 27 },
  { label: '1月120時間以上の就労を常態とする内定', value: `${prefix}_joboffer_26`, points: 26 },
  { label: '1月96時間以上の就労を常態とする内定', value: `${prefix}_joboffer_24`, points: 24 },
  { label: '1月80時間以上の就労を常態とする内定', value: `${prefix}_joboffer_22`, points: 22 },
  { label: '1月64時間以上の就労を常態とする内定', value: `${prefix}_joboffer_20`, points: 20 },
  { label: '上記の細目に該当しない採用内定', value: `${prefix}_joboffer_16`, points: 16 },
];

/** 3 内職 */
const naishokuOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_naishoku_none`, points: 0 },
  {
    label: '1日に4時間以上かつ1月に16日以上就労することを客観的に書面等で証明できる',
    value: `${prefix}_naishoku_13`,
    points: 13,
  },
];

/** 4 求職 */
const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '勤務誓約書提出者', value: `${prefix}_jobseeking_10`, points: 10 },
];

/** 5 出産（公式の基準表では母の欄のみに指数がある） */
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '産前2か月、産後2か月を含む月', value: `${prefix}_childbirth_21`, points: 21 },
];

/** 6 心身障がい */
const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '身体1級・2級、精神障害者保健福祉手帳、療育手帳マルA・A', value: `${prefix}_disability_30`, points: 30 },
  { label: '身体3級、療育手帳B', value: `${prefix}_disability_26`, points: 26 },
  { label: '上記以外の障がいで保育が必要と認められるもの', value: `${prefix}_disability_24`, points: 24 },
];

/** 7 疾病 */
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院：1月以上にわたると見込まれるもの', value: `${prefix}_illness_30`, points: 30 },
  { label: '入院：1月未満と見込まれるもの', value: `${prefix}_illness_28`, points: 28 },
  { label: '居宅：常時臥床している', value: `${prefix}_illness_bed_30`, points: 30 },
  {
    label: '居宅：精神機能系疾患、感染性の疾患または特定疾患',
    value: `${prefix}_illness_mental_28`,
    points: 28,
  },
  { label: '居宅：上記以外の疾病で保育が必要と認められるもの', value: `${prefix}_illness_20`, points: 20 },
];

/** 8 介護又は看護（労働の「居宅外労働・居宅内自営中心者」に準ずる） */
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '1月160時間以上に相当する常時付添い', value: `${prefix}_care_30`, points: 30 },
  { label: '1月140時間以上に相当する常時付添い', value: `${prefix}_care_29`, points: 29 },
  { label: '1月120時間以上に相当する常時付添い', value: `${prefix}_care_28`, points: 28 },
  { label: '1月96時間以上に相当する常時付添い', value: `${prefix}_care_26`, points: 26 },
  { label: '1月80時間以上に相当する常時付添い', value: `${prefix}_care_24`, points: 24 },
  { label: '1月64時間以上に相当する常時付添い', value: `${prefix}_care_22`, points: 22 },
  { label: '上記の細目に該当しない常時付添い', value: `${prefix}_care_18`, points: 18 },
];

/** 9 両親不存在 */
const absenceOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_absence_none`, points: 0 },
  {
    label: '両親がいない（行方不明、収容、施設入所等を含む）',
    value: `${prefix}_absence_30`,
    points: 30,
  },
];

/** 10 災害 */
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  {
    label: '火災等の家屋の損害その他災害復旧のため保育することができないと認められる',
    value: `${prefix}_disaster_30`,
    points: 30,
  },
];

/** 11 就学等（労働の「居宅外労働・居宅内自営中心者」に準ずる） */
const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '1月160時間以上に相当する就学・技能取得', value: `${prefix}_education_30`, points: 30 },
  { label: '1月140時間以上に相当する就学・技能取得', value: `${prefix}_education_29`, points: 29 },
  { label: '1月120時間以上に相当する就学・技能取得', value: `${prefix}_education_28`, points: 28 },
  { label: '1月96時間以上に相当する就学・技能取得', value: `${prefix}_education_26`, points: 26 },
  { label: '1月80時間以上に相当する就学・技能取得', value: `${prefix}_education_24`, points: 24 },
  { label: '1月64時間以上に相当する就学・技能取得', value: `${prefix}_education_22`, points: 22 },
  { label: '上記の細目に該当しない就学・技能取得', value: `${prefix}_education_18`, points: 18 },
];

/** 12 社会的養護 */
const socialCareOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_social_none`, points: 0 },
  {
    label: '法令の規定に基づき特別な支援が必要であると認められる',
    value: `${prefix}_social_30`,
    points: 30,
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
    helpText: '保護者が1人のときは、その指数に30が加えられます',
    inputType: 'select',
    options: [
      { label: '労働', value: `${prefix}_reason_employment`, points: 0 },
      { label: '採用内定', value: `${prefix}_reason_joboffer`, points: 0 },
      { label: '内職', value: `${prefix}_reason_naishoku`, points: 0 },
      { label: '求職', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '心身障がい', value: `${prefix}_reason_disability`, points: 0 },
      { label: '疾病', value: `${prefix}_reason_illness`, points: 0 },
      { label: '介護又は看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '両親不存在', value: `${prefix}_reason_absence`, points: 0 },
      { label: '災害', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '就学等', value: `${prefix}_reason_education`, points: 0 },
      { label: '社会的養護', value: `${prefix}_reason_social`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の労働の状況は？`,
      helpText: '時間は始業から終業までの時間（休息および休憩時間を含む）です',
      inputType: 'radio',
      options: employmentOptions(prefix),
    },
    {
      id: `${prefix}_joboffer`,
      category,
      label: `${parentLabel}の採用内定の状況は？`,
      inputType: 'radio',
      options: jobOfferOptions(prefix),
    },
    {
      id: `${prefix}_naishoku`,
      category,
      label: `${parentLabel}の内職の状況は？`,
      inputType: 'radio',
      options: naishokuOptions(prefix),
    },
    {
      id: `${prefix}_jobseeking`,
      category,
      label: `${parentLabel}は求職中ですか？`,
      helpText: '認定期間は3か月です',
      inputType: 'radio',
      options: jobSeekingOptions(prefix),
    },
    {
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}の出産の状況は？`,
      helpText: '公式の基準表では母の欄のみに指数があります',
      inputType: 'radio',
      options: childbirthOptions(prefix),
    },
    {
      id: `${prefix}_disability`,
      category,
      label: `${parentLabel}の心身障がいの程度は？`,
      inputType: 'radio',
      options: disabilityOptions(prefix),
    },
    {
      id: `${prefix}_illness`,
      category,
      label: `${parentLabel}の疾病の状況は？`,
      inputType: 'radio',
      options: illnessOptions(prefix),
    },
    {
      id: `${prefix}_care`,
      category,
      label: `${parentLabel}の介護・看護の状況は？`,
      helpText: '介護・病院通院・施設通所・入院の常時付添いが対象で、労働の指数に準じます',
      inputType: 'radio',
      options: careOptions(prefix),
    },
    {
      id: `${prefix}_absence`,
      category,
      label: `${parentLabel}は両親不存在にあてはまりますか？`,
      inputType: 'radio',
      options: absenceOptions(prefix),
    },
    {
      id: `${prefix}_disaster`,
      category,
      label: `${parentLabel}は災害復旧にあてはまりますか？`,
      inputType: 'radio',
      options: disasterOptions(prefix),
    },
    {
      id: `${prefix}_education`,
      category,
      label: `${parentLabel}の就学等の状況は？`,
      helpText: '労働の指数に準じます',
      inputType: 'radio',
      options: educationOptions(prefix),
    },
    {
      id: `${prefix}_social`,
      category,
      label: `${parentLabel}は社会的養護にあてはまりますか？`,
      inputType: 'radio',
      options: socialCareOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// ---------------------------------------------------------------------------
// 調整指数（保護者個人に係るもの・保護者世帯に係るもの）
// ---------------------------------------------------------------------------

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_parent_disability',
    category: 'adjustment',
    label: '保護者が手帳の交付を受けていますか？',
    helpText: 'これらと同程度の障がいを有すると認められる場合を含みます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_parent_disability_no', points: 0 },
      { label: '身体1級・2級、精神1級、療育手帳マルA・A', value: 'adj_parent_disability_5', points: 5 },
      { label: '身体3級、精神2級、療育手帳B', value: 'adj_parent_disability_4', points: 4 },
      { label: '身体4級〜6級、精神3級、療育手帳C', value: 'adj_parent_disability_3', points: 3 },
    ],
  },
  {
    id: 'adj_leave',
    category: 'adjustment',
    label: '保護者のいずれかが育児休業を取得していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_leave_no', points: 0 },
      { label: 'はい', value: 'adj_leave_yes', points: 1 },
    ],
  },
  {
    id: 'adj_hoikushi',
    category: 'adjustment',
    label: '保護者のいずれかが市内保育施設に勤務していますか？',
    helpText: '入園する月から1年以上勤務することが確実であると認められる場合に限ります',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_hoikushi_no', points: 0 },
      { label: 'はい（1日6時間以上かつ1月20日以上勤務）', value: 'adj_hoikushi_5', points: 5 },
      { label: 'はい（上記以外の条件で勤務）', value: 'adj_hoikushi_3', points: 3 },
    ],
  },
  {
    id: 'adj_tanshin',
    category: 'adjustment',
    label: '保護者のいずれかが単身赴任中ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_tanshin_no', points: 0 },
      { label: 'はい', value: 'adj_tanshin_yes', points: 1 },
    ],
  },
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親世帯または両親不存在世帯ですか？',
    helpText: '離婚調停中を含み、別居のみは除きます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: '祖父母と同居しないひとり親世帯・両親不存在世帯', value: 'adj_single_parent_8', points: 8 },
      { label: '祖父母と同居するひとり親世帯', value: 'adj_single_parent_4', points: 4 },
    ],
  },
  {
    id: 'adj_arrears',
    category: 'adjustment',
    label: '保育園保育料・学童保育料の未納は何か月分ありますか？',
    helpText: '特別な事情がある場合を除き、未納月数1か月につき2点減算されます',
    inputType: 'radio',
    options: [
      { label: 'ない', value: 'adj_arrears_0', points: 0 },
      { label: '1か月', value: 'adj_arrears_1', points: -2 },
      { label: '2か月', value: 'adj_arrears_2', points: -4 },
      { label: '3か月以上', value: 'adj_arrears_3', points: -6 },
    ],
  },
  {
    id: 'adj_declined',
    category: 'adjustment',
    label: '入園前面接の通知後に入園を辞退したことがありますか？',
    helpText: '入園を希望する月の属する年度中に適用され、辞退回数1回につき10点減算されます',
    inputType: 'radio',
    options: [
      { label: 'ない', value: 'adj_declined_0', points: 0 },
      { label: '1回', value: 'adj_declined_1', points: -10 },
      { label: '2回', value: 'adj_declined_2', points: -20 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護法の適用を受ける被保護世帯、または中国残留邦人等の支援給付受給世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい', value: 'adj_welfare_yes', points: 2 },
    ],
  },
  {
    id: 'adj_paid_care',
    category: 'adjustment',
    label: '家庭保育室・一時保育・家庭福祉員・ベビーシッター等で有償の保育を受けていますか？',
    helpText:
      '1日に4時間以上かつ1月に12日以上の実績が入園申請締切日までに必要です。育休中等、私的理由での利用は加点対象外です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_paid_care_no', points: 0 },
      { label: 'はい', value: 'adj_paid_care_yes', points: 2 },
    ],
  },
  {
    id: 'adj_child_disability',
    category: 'adjustment',
    label: '入園を希望する児童が障がいを有していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_child_disability_no', points: 0 },
      { label: 'はい', value: 'adj_child_disability_yes', points: 1 },
    ],
  },
  {
    id: 'adj_preschool_children',
    category: 'adjustment',
    label: '入園を希望する月において、未就学児（当該児童を含む）は何人いますか？',
    inputType: 'radio',
    options: [
      { label: '1人', value: 'adj_preschool_children_0', points: 0 },
      { label: '2人', value: 'adj_preschool_children_1', points: 1 },
      { label: '3人以上', value: 'adj_preschool_children_2', points: 2 },
    ],
  },
  {
    id: 'adj_multiple_birth',
    category: 'adjustment',
    label: '入園を希望する児童が多胎児ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_multiple_birth_no', points: 0 },
      { label: 'はい', value: 'adj_multiple_birth_yes', points: 2 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: '入園を希望する施設に、既に兄弟姉妹が入園または入園内定していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_no', points: 0 },
      { label: 'はい', value: 'adj_sibling_yes', points: 3 },
    ],
  },
  {
    id: 'adj_family_disability',
    category: 'adjustment',
    label: '手帳の交付を受けている同居の家族（当該児童・保護者を除く）がいますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_family_disability_no', points: 0 },
      { label: 'はい', value: 'adj_family_disability_yes', points: 1 },
    ],
  },
  {
    id: 'adj_family_care',
    category: 'adjustment',
    label: '要介護3以上（在宅介護に限る）の同居の家族（当該保護者を除く）がいますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_family_care_no', points: 0 },
      { label: 'はい', value: 'adj_family_care_yes', points: 1 },
    ],
  },
  {
    id: 'adj_facility_change',
    category: 'adjustment',
    label: '施設の卒園・閉園・移行にあてはまるものは？',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_facility_change_no', points: 0 },
      {
        label: '2歳児までを対象とする施設を2歳児クラスで卒園した児童がいる',
        value: 'adj_facility_change_5a',
        points: 5,
      },
      {
        label: '認可保育施設に入園しており、当該施設の閉園等により保育を受けられなくなる',
        value: 'adj_facility_change_5b',
        points: 5,
      },
      {
        label: '市内の認可外保育施設で1月64時間以上利用中で、当該施設の認可移行に伴い移行後の施設を第1希望とする',
        value: 'adj_facility_change_5c',
        points: 5,
      },
      {
        label: '認可外保育施設で1月64時間以上利用中で、当該施設で保育を受けられなくなる',
        value: 'adj_facility_change_5d',
        points: 5,
      },
    ],
  },
  {
    id: 'adj_social_care',
    category: 'adjustment',
    label: '社会的な養護が必要な世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_social_care_no', points: 0 },
      { label: 'はい', value: 'adj_social_care_yes', points: 3 },
    ],
  },
];

export const shikiData: MunicipalityData = {
  municipality,
  questions: [...buildParentQuestions(1), ...buildParentQuestions(2), ...adjustmentQuestions],
};
