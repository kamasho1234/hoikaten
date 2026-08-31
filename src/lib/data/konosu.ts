import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 鴻巣市 利用調整に関する基準（基本指数・調整指数）データ
//
// 出典: 鴻巣市こども未来部保育課「令和8年度保育施設入所案内」P13-P15
//       「利用調整に関する基準」基本指数（別表第1）・調整指数（別表第2）
//       https://www.city.kounosu.saitama.jp/uploaded/attachment/26189.pdf
//       （鴻巣市Webサイト「令和8年度保育施設入所申請書類」
//         https://www.city.kounosu.saitama.jp/page/35346.html からリンク）
//
// 2026-08-19: 従来のデータは他市の点数配列を流用しただけの
//             テンプレート（推定値）だったため、上記の公式基準を読み取って全面的に置き換えた。
//             公式は基本指数が父母各30点（虐待・DVは75点）で、旧データ（父母各20点）とは体系が異なる。
//
// 調整指数のうち「※」を付した細目（ひとり親世帯等、復職、保育士、兄弟姉妹、認可外保育施設等で保育）
// については、転園申請及び認定替申請を除く。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'konosu',
  name: '鴻巣市',
  slug: 'konosu',
  prefecture: '埼玉県',
  maxBasePoints: 150, // 父母各75点（虐待・DV等）
} as const;

// ---------------------------------------------------------------------------
// 基本指数（別表第1）。父母それぞれについて選ぶ
// ---------------------------------------------------------------------------

/** 就労・就学 */
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  {
    label: '月20日以上または週5日以上：月160時間以上または1日8時間以上',
    value: `${prefix}_employment_30`,
    points: 30,
  },
  {
    label: '月20日以上または週5日以上：月120時間以上160時間未満または1日6時間以上8時間未満',
    value: `${prefix}_employment_27`,
    points: 27,
  },
  {
    label: '月20日以上または週5日以上：月80時間以上120時間未満または1日4時間以上6時間未満',
    value: `${prefix}_employment_24`,
    points: 24,
  },
  {
    label: '月16日以上または週4日以上：月128時間以上または1日8時間以上',
    value: `${prefix}_employment_16d_27`,
    points: 27,
  },
  {
    label: '月16日以上または週4日以上：月96時間以上128時間未満または1日6時間以上8時間未満',
    value: `${prefix}_employment_16d_24`,
    points: 24,
  },
  {
    label: '月16日以上または週4日以上：月64時間以上96時間未満または1日4時間以上6時間未満',
    value: `${prefix}_employment_16d_21`,
    points: 21,
  },
  {
    label: '月12日以上または週3日以上：月96時間以上または1日8時間以上',
    value: `${prefix}_employment_12d_18`,
    points: 18,
  },
  {
    label: '月12日以上または週3日以上：月72時間以上96時間未満または1日6時間以上8時間未満',
    value: `${prefix}_employment_12d_15`,
    points: 15,
  },
  { label: 'その他：月64時間以上', value: `${prefix}_employment_12`, points: 12 },
];

/** 求職活動 */
const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動をしている', value: `${prefix}_jobseeking_6`, points: 6 },
];

/** 妊娠・出産（公式の基準表では母の欄のみに指数がある） */
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '産前・産後の期間、保育を必要とする', value: `${prefix}_childbirth_27`, points: 27 },
];

/** 疾病・障害 */
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '疾病：おおむね1か月以上の入院', value: `${prefix}_illness_30a`, points: 30 },
  { label: '疾病：自宅療養で常に病臥している', value: `${prefix}_illness_30b`, points: 30 },
  { label: '疾病：通院加療を行い常に安静が必要で保育が困難', value: `${prefix}_illness_24`, points: 24 },
  { label: '疾病：上記以外で、通院加療を行い保育が困難', value: `${prefix}_illness_18`, points: 18 },
  {
    label: '障害：身体1・2級、療育手帳マルA・A、精神1級',
    value: `${prefix}_illness_disability_30`,
    points: 30,
  },
  { label: '障害：身体3級、療育手帳B、精神2級', value: `${prefix}_illness_disability_24`, points: 24 },
  { label: '障害：上記以外', value: `${prefix}_illness_disability_15`, points: 15 },
];

/** 介護・看護 */
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  {
    label: '重度の障害者（身体1・2級、療育手帳マルA・A、精神1級）または疾病等による寝たきりの者を常時介護・看護している',
    value: `${prefix}_care_30`,
    points: 30,
  },
  { label: '上記以外', value: `${prefix}_care_18`, points: 18 },
];

/** 災害・復旧 */
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  {
    label: '火災等による家屋の破損復旧その他災害復旧に従事している',
    value: `${prefix}_disaster_30`,
    points: 30,
  },
];

/** 虐待・DV */
const abuseOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_abuse_none`, points: 0 },
  {
    label: '虐待、DV等のおそれがある場合その他社会的養護が必要な状態',
    value: `${prefix}_abuse_75`,
    points: 75,
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
    helpText: 'いちばん近いものをひとつ選んでください',
    inputType: 'select',
    options: [
      { label: '就労・就学', value: `${prefix}_reason_employment`, points: 0 },
      { label: '求職活動', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '妊娠・出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '疾病・障害', value: `${prefix}_reason_illness`, points: 0 },
      { label: '介護・看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '災害・復旧', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '虐待・DV', value: `${prefix}_reason_abuse`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の就労・就学の状況は？`,
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
      label: `${parentLabel}の妊娠・出産の状況は？`,
      helpText: '公式の基準表では母の欄のみに指数があります',
      inputType: 'radio',
      options: childbirthOptions(prefix),
    },
    {
      id: `${prefix}_illness`,
      category,
      label: `${parentLabel}の疾病・障害の状況は？`,
      inputType: 'radio',
      options: illnessOptions(prefix),
    },
    {
      id: `${prefix}_care`,
      category,
      label: `${parentLabel}の介護・看護の状況は？`,
      inputType: 'radio',
      options: careOptions(prefix),
    },
    {
      id: `${prefix}_disaster`,
      category,
      label: `${parentLabel}は災害復旧に従事していますか？`,
      inputType: 'radio',
      options: disasterOptions(prefix),
    },
    {
      id: `${prefix}_abuse`,
      category,
      label: `${parentLabel}は虐待・DV等にあてはまりますか？`,
      inputType: 'radio',
      options: abuseOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// ---------------------------------------------------------------------------
// 調整指数（別表第2）
// ---------------------------------------------------------------------------

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親世帯等にあてはまりますか？',
    helpText: '転園申請および認定替申請では適用されません',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_single_parent_no', points: 0 },
      { label: '離婚等によるひとり親世帯（18歳以上の同居者なし）', value: 'adj_single_parent_54', points: 54 },
      { label: '離婚等によるひとり親世帯（18歳以上の同居者あり）', value: 'adj_single_parent_48', points: 48 },
      {
        label: '離婚調停中により別居のため片親が養育（18歳以上の同居者なし）',
        value: 'adj_single_parent_45',
        points: 45,
      },
      {
        label: '離婚調停中により別居のため片親が養育（18歳以上の同居者あり）',
        value: 'adj_single_parent_39',
        points: 39,
      },
      {
        label: '離婚等・離婚調停中により片親が養育している場合の転園または認定替申請',
        value: 'adj_single_parent_30',
        points: 30,
      },
      {
        label: '離婚前提等の別居のため父又は母の保育を必要とする証明書類の提出ができない',
        value: 'adj_single_parent_27',
        points: 27,
      },
      { label: '前各号以外の理由により片親が養育している', value: 'adj_single_parent_1', points: 1 },
    ],
  },
  {
    id: 'adj_social',
    category: 'adjustment',
    label: '生活保護受給世帯、または生計中心者の失業にあてはまりますか？',
    helpText: '自発的な失業は除きます',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_social_no', points: 0 },
      { label: '生計中心者の失業', value: 'adj_social_20', points: 20 },
      { label: '生活保護受給世帯', value: 'adj_social_15', points: 15 },
    ],
  },
  {
    id: 'adj_grandparent',
    category: 'adjustment',
    label: '養育可能な祖父母等（65歳未満）と同居していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_grandparent_no', points: 0 },
      { label: 'はい', value: 'adj_grandparent_yes', points: -1 },
    ],
  },
  {
    id: 'adj_arrears',
    category: 'adjustment',
    label: '入所児または卒園児の利用者負担（保育料）等を滞納していますか？',
    helpText: '分割納付者で1年以内に完納見込みの場合は除きます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_arrears_no', points: 0 },
      { label: 'はい', value: 'adj_arrears_yes', points: -60 },
    ],
  },
  {
    id: 'adj_return',
    category: 'adjustment',
    label: '復職にあてはまりますか？',
    helpText: '転園申請および認定替申請では適用されません',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_return_no', points: 0 },
      { label: '産前産後休暇、育児休業または介護休暇を終えた復職', value: 'adj_return_3a', points: 3 },
      {
        label: '育児休業等の延長ができず、入所希望日の前日までに復職し、復職後認可外保育施設等を利用予定',
        value: 'adj_return_3b',
        points: 3,
      },
    ],
  },
  {
    id: 'adj_job_offer',
    category: 'adjustment',
    label: '勤務内定または就学予定の保護者はいますか？',
    inputType: 'radio',
    options: [
      { label: 'いない', value: 'adj_job_offer_0', points: 0 },
      { label: '1人', value: 'adj_job_offer_1', points: -1 },
      { label: '2人', value: 'adj_job_offer_2', points: -2 },
    ],
  },
  {
    id: 'adj_family_business',
    category: 'adjustment',
    label: '配偶者、祖父母等の親族が営む自営業に勤務中または勤務内定の保護者はいますか？',
    inputType: 'radio',
    options: [
      { label: 'いない', value: 'adj_family_business_0', points: 0 },
      { label: '1人', value: 'adj_family_business_1', points: -1 },
      { label: '2人', value: 'adj_family_business_2', points: -2 },
    ],
  },
  {
    id: 'adj_pregnancy_risk',
    category: 'adjustment',
    label: '医師から切迫早産等により安静が必要と診断書が出ていますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_pregnancy_risk_no', points: 0 },
      { label: 'はい', value: 'adj_pregnancy_risk_yes', points: 6 },
    ],
  },
  {
    id: 'adj_hoikushi',
    category: 'adjustment',
    label: '市内認可保育施設に保育従事者として勤務中または勤務内定の保護者はいますか？',
    helpText: '保育士または看護師・准看護師資格を所持する場合に限ります。転園申請および認定替申請では適用されません',
    inputType: 'radio',
    options: [
      { label: 'いない', value: 'adj_hoikushi_0', points: 0 },
      { label: '1人', value: 'adj_hoikushi_20', points: 20 },
      { label: '2人', value: 'adj_hoikushi_40', points: 40 },
    ],
  },
  {
    id: 'adj_leave_extension',
    category: 'adjustment',
    label: '育児休業の延長を許容できますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_leave_extension_no', points: 0 },
      { label: 'はい', value: 'adj_leave_extension_yes', points: -60 },
    ],
  },
  {
    id: 'adj_multi_reason',
    category: 'adjustment',
    label: '基本指数に規定する事由の2つ以上に該当しますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_multi_reason_no', points: 0 },
      { label: 'はい', value: 'adj_multi_reason_yes', points: 1 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: '兄弟姉妹の状況は？',
    helpText: '転園申請および認定替申請では適用されません',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_sibling_no', points: 0 },
      {
        label: '兄弟姉妹が既に入所している保育施設等が希望施設に含まれる申請',
        value: 'adj_sibling_2',
        points: 2,
      },
      {
        label: '兄弟姉妹が既に入所している保育施設等が希望施設に含まれない申請',
        value: 'adj_sibling_1a',
        points: 1,
      },
      { label: '兄弟姉妹同時申請', value: 'adj_sibling_1b', points: 1 },
    ],
  },
  {
    id: 'adj_child_disability',
    category: 'adjustment',
    label: '申込児童が障害児、または医療的ケア児ですか？',
    helpText:
      '障害者手帳、療育手帳、または児童福祉法第21条の5の7第9項の通所受給者証の交付を受けた児童で集団保育が可能な場合が対象です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_child_disability_no', points: 0 },
      { label: 'はい', value: 'adj_child_disability_yes', points: 1 },
    ],
  },
  {
    id: 'adj_ninkagai',
    category: 'adjustment',
    label: '直近2か月以内に認可外保育施設、一時預かり等の継続的な利用がありますか？',
    helpText: '継続的な利用が見込まれる場合も含みます（育児休業中の利用を除く）。転園申請等では適用されません',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_ninkagai_no', points: 0 },
      { label: 'はい', value: 'adj_ninkagai_yes', points: 3 },
    ],
  },
  {
    id: 'adj_reenroll',
    category: 'adjustment',
    label: '育児休業取得により退園した児童が、再度入園申込みをしますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_reenroll_no', points: 0 },
      { label: 'はい', value: 'adj_reenroll_yes', points: 5 },
    ],
  },
  {
    id: 'adj_declined',
    category: 'adjustment',
    label: '年度内に入所内定を辞退したことがありますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_declined_no', points: 0 },
      { label: 'はい', value: 'adj_declined_yes', points: -10 },
    ],
  },
  {
    id: 'adj_transfer',
    category: 'adjustment',
    label: '転園申請にあてはまるものは？',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_transfer_no', points: 0 },
      { label: '兄弟姉妹の利用している保育施設等のみを希望する転園申請', value: 'adj_transfer_2a', points: 2 },
      {
        label: '地域型保育施設を卒園する児童で、兄弟姉妹の施設を第1希望、連携施設を第2希望とする転園申請',
        value: 'adj_transfer_2b',
        points: 2,
      },
      {
        label: '市内施設から市内施設への転園申請（兄弟姉妹の同一施設化・地域型保育施設在籍を除く）',
        value: 'adj_transfer_m5',
        points: -5,
      },
    ],
  },
  {
    id: 'adj_outside',
    category: 'adjustment',
    label: '市外在住者ですか？',
    helpText: '転入予定者、および市内認可保育施設に保育従事者として勤務中・勤務内定の方は除きます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_outside_no', points: 0 },
      {
        label: '転入予定で、前住所地において認可保育施設に在籍している',
        value: 'adj_outside_3',
        points: 3,
      },
      { label: 'はい', value: 'adj_outside_yes', points: -30 },
    ],
  },
  {
    id: 'adj_urgent',
    category: 'adjustment',
    label: '要保護児童の申請、その他緊急性がありますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_urgent_no', points: 0 },
      { label: 'はい', value: 'adj_urgent_yes', points: 100 },
    ],
  },
];

export const konosuData: MunicipalityData = {
  municipality,
  questions: [...buildParentQuestions(1), ...buildParentQuestions(2), ...adjustmentQuestions],
};
