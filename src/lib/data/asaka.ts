import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 朝霞市 保育認定利用調整基準表（A 父母の状況・B 児童の保育状況・C 家庭状況・
// D 世帯員の状況・E その他調整事項）データ
//
// 出典: 朝霞市こども・健康部保育課「朝霞市保育認定利用調整基準表」
//       （「令和8年4月1次利用調整 資料」P6 に掲載）
//       https://www.city.asaka.lg.jp/uploaded/attachment/106860.pdf
//       （朝霞市Webサイト「保育園等4月1次利用調整 概要資料」
//         https://www.city.asaka.lg.jp/site/kosodate/riyochosei-siryo.html からリンク）
//
// 2026-08-19: 従来のデータは他自治体と同じ点数配列のテンプレート（推定値）だったため、
//             上記の公式基準表を読み取って全面的に置き換えた。
//             資料PDFが画像のみのため、該当ページを画像化して読み取った。
//
// 原典の構成:
//   A 父母の状況（父母各1つのみ加算。最も加算が大きいもの）
//   B 児童の保育状況（該当する場合1つのみ加算。最も加算が大きいもの）
//   C 家庭状況（該当する場合1つのみ加算。最も加算が大きいもの）
//   D 世帯員の状況（該当する場合1つのみ減算。最も減算が大きいもの）
//   E その他調整事項（該当するもの全て加算）
//
// 備考（原典）:
//   ・「認可外保育施設等」とは、認可外保育施設・幼稚園（特定教育・保育施設以外）を指す
//   ・「認可保育施設」とは、特定教育・保育施設及び特定地域型保育事業を指す
//   ・祖父母の年齢は、入所希望年度の4月1日時点の年齢により判断する
//   ・「幼稚園等」とは、幼稚園及び認定こども園（教育部分）を指す
// ---------------------------------------------------------------------------

const municipality = {
  id: 'asaka',
  name: '朝霞市',
  slug: 'asaka',
  prefecture: '埼玉県',
  maxBasePoints: 60, // 父母各30点
} as const;

// ---------------------------------------------------------------------------
// A 父母の状況。父母それぞれ1つのみ加算される
// ---------------------------------------------------------------------------

/** 自営中心者・居宅外労働（就学） */
const outsideWorkOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_outside_none`, points: 0 },
  { label: '1月160時間以上', value: `${prefix}_outside_30`, points: 30 },
  { label: '1月140時間以上', value: `${prefix}_outside_29`, points: 29 },
  { label: '1月128時間以上', value: `${prefix}_outside_28`, points: 28 },
  { label: '1月120時間以上', value: `${prefix}_outside_27`, points: 27 },
  { label: '1月112時間以上', value: `${prefix}_outside_26`, points: 26 },
  { label: '1月100時間以上', value: `${prefix}_outside_25`, points: 25 },
  { label: '1月96時間以上', value: `${prefix}_outside_24`, points: 24 },
  { label: '1月84時間以上', value: `${prefix}_outside_23`, points: 23 },
  { label: '1月80時間以上', value: `${prefix}_outside_22`, points: 22 },
  { label: '1月72時間以上', value: `${prefix}_outside_21`, points: 21 },
  { label: '1月64時間以上', value: `${prefix}_outside_20`, points: 20 },
];

/** 自営協力者・居宅内労働（就学） */
const homeWorkOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_home_none`, points: 0 },
  { label: '1月160時間以上', value: `${prefix}_home_29`, points: 29 },
  { label: '1月140時間以上', value: `${prefix}_home_28`, points: 28 },
  { label: '1月128時間以上', value: `${prefix}_home_27`, points: 27 },
  { label: '1月120時間以上', value: `${prefix}_home_26`, points: 26 },
  { label: '1月112時間以上', value: `${prefix}_home_25`, points: 25 },
  { label: '1月100時間以上', value: `${prefix}_home_24`, points: 24 },
  { label: '1月96時間以上', value: `${prefix}_home_23`, points: 23 },
  { label: '1月84時間以上', value: `${prefix}_home_22`, points: 22 },
  { label: '1月80時間以上', value: `${prefix}_home_21`, points: 21 },
  { label: '1月72時間以上', value: `${prefix}_home_20`, points: 20 },
  { label: '1月64時間以上', value: `${prefix}_home_19`, points: 19 },
];

/** 求職活動・労働内定・就学予定 */
const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '労働内定・就学予定：1月160時間以上', value: `${prefix}_jobseeking_18`, points: 18 },
  { label: '労働内定・就学予定：1月140時間以上', value: `${prefix}_jobseeking_17`, points: 17 },
  { label: '労働内定・就学予定：1月128時間以上', value: `${prefix}_jobseeking_16`, points: 16 },
  { label: '労働内定・就学予定：1月120時間以上', value: `${prefix}_jobseeking_15`, points: 15 },
  { label: '労働内定・就学予定：1月112時間以上', value: `${prefix}_jobseeking_14`, points: 14 },
  { label: '労働内定・就学予定：1月100時間以上', value: `${prefix}_jobseeking_13`, points: 13 },
  { label: '労働内定・就学予定：1月96時間以上', value: `${prefix}_jobseeking_12`, points: 12 },
  { label: '労働内定・就学予定：1月84時間以上', value: `${prefix}_jobseeking_11`, points: 11 },
  { label: '労働内定・就学予定：1月80時間以上', value: `${prefix}_jobseeking_10`, points: 10 },
  { label: '労働内定・就学予定：1月72時間以上', value: `${prefix}_jobseeking_9`, points: 9 },
  { label: '労働内定・就学予定：1月64時間以上', value: `${prefix}_jobseeking_8`, points: 8 },
  { label: '求職活動を行っている', value: `${prefix}_jobseeking_5`, points: 5 },
];

/** 妊娠出産期間（公式の基準表では母の欄のみに指数がある） */
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  {
    label: '妊娠出産期間（出産日および前後の2か月）のみ保育希望',
    value: `${prefix}_childbirth_26`,
    points: 26,
  },
];

/** 疾病・障害 */
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: 'Ⅰ（就学前児童の保育が完全に不可能な状態）', value: `${prefix}_illness_30`, points: 30 },
  { label: 'Ⅱ（就学前児童の保育が困難な状態）', value: `${prefix}_illness_27`, points: 27 },
  { label: 'Ⅲ（就学前児童の保育が部分的に困難な状態）', value: `${prefix}_illness_25`, points: 25 },
  {
    label: '身体1・2級、療育手帳マルA・A、精神1〜3級を所持している',
    value: `${prefix}_illness_disability_30`,
    points: 30,
  },
  { label: '身体3・4級、療育手帳Bを所持している', value: `${prefix}_illness_disability_27`, points: 27 },
  { label: '身体5級以下、療育手帳Cを所持している', value: `${prefix}_illness_disability_25`, points: 25 },
];

/** 看護・介護 */
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '1月160時間以上', value: `${prefix}_care_30`, points: 30 },
  { label: '1月140時間以上', value: `${prefix}_care_29`, points: 29 },
  { label: '1月128時間以上', value: `${prefix}_care_28`, points: 28 },
  { label: '1月120時間以上', value: `${prefix}_care_27`, points: 27 },
  { label: '1月112時間以上', value: `${prefix}_care_26`, points: 26 },
  { label: '1月100時間以上', value: `${prefix}_care_25`, points: 25 },
  { label: '1月96時間以上', value: `${prefix}_care_24`, points: 24 },
  { label: '1月84時間以上', value: `${prefix}_care_23`, points: 23 },
  { label: '1月80時間以上', value: `${prefix}_care_22`, points: 22 },
  { label: '1月72時間以上', value: `${prefix}_care_21`, points: 21 },
  { label: '1月64時間以上', value: `${prefix}_care_20`, points: 20 },
];

/** 災害復旧 */
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '居住家屋の災害復旧をしている', value: `${prefix}_disaster_30`, points: 30 },
];

/** 死亡・離別・行方不明・拘禁 */
const absenceOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_absence_none`, points: 0 },
  { label: '死亡・離別・行方不明・拘禁', value: `${prefix}_absence_30`, points: 30 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: '父母各1つのみ加算されます（最も加算が大きいもの）',
    inputType: 'select',
    options: [
      { label: '自営中心者・居宅外労働（就学）', value: `${prefix}_reason_outside`, points: 0 },
      { label: '自営協力者・居宅内労働（就学）', value: `${prefix}_reason_home`, points: 0 },
      { label: '求職活動・労働内定・就学予定', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '妊娠出産期間', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '疾病・障害', value: `${prefix}_reason_illness`, points: 0 },
      { label: '看護・介護', value: `${prefix}_reason_care`, points: 0 },
      { label: '居住家屋の災害復旧', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '死亡・離別・行方不明・拘禁', value: `${prefix}_reason_absence`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_outside`,
      category,
      label: `${parentLabel}の居宅外労働（就学）の時間は？`,
      inputType: 'radio',
      options: outsideWorkOptions(prefix),
    },
    {
      id: `${prefix}_home`,
      category,
      label: `${parentLabel}の居宅内労働（就学）の時間は？`,
      inputType: 'radio',
      options: homeWorkOptions(prefix),
    },
    {
      id: `${prefix}_jobseeking`,
      category,
      label: `${parentLabel}の求職活動・労働内定・就学予定の状況は？`,
      inputType: 'radio',
      options: jobSeekingOptions(prefix),
    },
    {
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}の妊娠出産の状況は？`,
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
      label: `${parentLabel}の看護・介護の時間は？`,
      inputType: 'radio',
      options: careOptions(prefix),
    },
    {
      id: `${prefix}_disaster`,
      category,
      label: `${parentLabel}は居住家屋の災害復旧をしていますか？`,
      inputType: 'radio',
      options: disasterOptions(prefix),
    },
    {
      id: `${prefix}_absence`,
      category,
      label: `${parentLabel}は死亡・離別・行方不明・拘禁にあてはまりますか？`,
      inputType: 'radio',
      options: absenceOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// ---------------------------------------------------------------------------
// B 児童の保育状況・C 家庭状況・D 世帯員の状況・E その他調整事項
// ---------------------------------------------------------------------------

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_child_status',
    category: 'adjustment',
    label: '申込児童の現在の保育状況は？',
    helpText: '該当する場合1つのみ加算されます（最も加算が大きいもの）',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_child_status_no', points: 0 },
      {
        label: '受入れが2歳児クラスまでの認可保育施設に入所しており、連携施設の設定がない等の場合の3歳児クラスの利用調整申請',
        value: 'adj_child_status_100a',
        points: 100,
      },
      {
        label: '市内の認可外保育施設等に入所し月64時間以上利用中で、当該施設が認可保育施設に移行する場合の移行後の施設を第1希望とした申請',
        value: 'adj_child_status_100b',
        points: 100,
      },
      {
        label: '同上で、移行後の当該施設を第2希望以降とした申請',
        value: 'adj_child_status_7',
        points: 7,
      },
      {
        label: '認可外保育施設等に入所し月64時間以上利用を常態としているが、当該施設が入園希望月以降受入不可',
        value: 'adj_child_status_6',
        points: 6,
      },
      {
        label: '認可外保育施設等に入所しており、月64時間以上利用を常態としている（父母が育児休業中以外に限る）',
        value: 'adj_child_status_5',
        points: 5,
      },
      {
        label: '認可保育施設を給付を受けて利用しているが、当該施設が入園希望月以降受入不可（転所申請）',
        value: 'adj_child_status_3',
        points: 3,
      },
      { label: '同一世帯の親族が保育している（父母共に死亡・離別・行方不明・拘禁）', value: 'adj_child_status_2a', points: 2 },
      { label: '知人・友人・別世帯の親族が有償で保育している', value: 'adj_child_status_2b', points: 2 },
      {
        label: '認可外保育施設等に入所しているが、月64時間以上利用を常態としていない',
        value: 'adj_child_status_2c',
        points: 2,
      },
      { label: '認可保育施設を給付を受けて利用している（転所申請）', value: 'adj_child_status_2d', points: 2 },
      { label: '父又は母が保育している（育児休業中の場合）', value: 'adj_child_status_2e', points: 2 },
      { label: '父又は母が保育認定事由と並行して保育している', value: 'adj_child_status_2f', points: 2 },
    ],
  },
  {
    id: 'adj_household',
    category: 'adjustment',
    label: '家庭状況にあてはまるものは？',
    helpText: '該当する場合1つのみ加算されます（最も加算が大きいもの）',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_household_no', points: 0 },
      { label: '生活保護世帯', value: 'adj_household_20', points: 20 },
      { label: '父母共に死亡・離別・行方不明・拘禁', value: 'adj_household_18', points: 18 },
      { label: 'ひとり親家庭で祖父母と別世帯', value: 'adj_household_15', points: 15 },
      { label: 'ひとり親家庭', value: 'adj_household_14', points: 14 },
      {
        label: '離婚前提（離婚調停申立書、離婚に関する事を定めた公正証書が必要）で祖父母と別世帯',
        value: 'adj_household_12',
        points: 12,
      },
      { label: '離婚前提（離婚調停申立書、公正証書が必要）', value: 'adj_household_11', points: 11 },
    ],
  },
  {
    id: 'adj_grandparent',
    category: 'adjustment',
    label: '無職で健康な祖父母と同一世帯ですか？',
    helpText:
      '該当する場合1つのみ減算されます（最も減算が大きいもの）。祖父母の年齢は入所希望年度の4月1日時点で判断されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_grandparent_no', points: 0 },
      { label: '60歳未満で無職で健康な祖父母と同一世帯', value: 'adj_grandparent_m3', points: -3 },
      { label: '60歳以上65歳未満で無職で健康な祖父母と同一世帯', value: 'adj_grandparent_m2', points: -2 },
      { label: '65歳以上70歳未満で無職で健康な祖父母と同一世帯', value: 'adj_grandparent_m1', points: -1 },
    ],
  },
  {
    id: 'adj_layoff',
    category: 'adjustment',
    label: '保護者が非自発的な理由によって失業していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_layoff_no', points: 0 },
      { label: 'はい', value: 'adj_layoff_yes', points: 5 },
    ],
  },
  {
    id: 'adj_tanshin',
    category: 'adjustment',
    label: '父又は母が単身赴任していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_tanshin_no', points: 0 },
      { label: 'はい', value: 'adj_tanshin_yes', points: 1 },
    ],
  },
  {
    id: 'adj_hoikushi',
    category: 'adjustment',
    label: '保護者が保育士等として市内の施設に勤務していますか？',
    helpText:
      '保育士資格を有し市内認可保育施設もしくは朝霞市指定家庭保育室で保育従事者として、または幼稚園教諭資格を有し市内幼稚園等で、または放課後児童支援員資格を有し市内放課後児童クラブで勤務・勤務内定している場合が対象です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_hoikushi_no', points: 0 },
      { label: 'はい（1年以上勤務することを誓約している。転所申請を除く）', value: 'adj_hoikushi_22', points: 22 },
      { label: 'はい（上記以外）', value: 'adj_hoikushi_1', points: 1 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: '兄弟姉妹の利用調整申請・利用状況は？',
    helpText: '認可保育施設（事業所内保育事業の従業員枠を除く）を保育認定を受けて利用している場合が対象です',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_sibling_no', points: 0 },
      { label: '兄弟姉妹が2人以上、申請または利用している', value: 'adj_sibling_3', points: 3 },
      { label: '兄弟姉妹が1人だけ、申請または利用している', value: 'adj_sibling_1', points: 1 },
      {
        label: '兄弟姉妹で異なる施設を利用しており、同じ施設となるよう希望している転所申請',
        value: 'adj_sibling_1b',
        points: 1,
      },
    ],
  },
  {
    id: 'adj_disability_household',
    category: 'adjustment',
    label: '申請児童、保護者、または同一世帯の親族が手帳を所持していますか？',
    helpText: '身体障害者手帳・療育手帳・精神障害者保健福祉手帳が対象です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_disability_household_no', points: 0 },
      { label: 'はい', value: 'adj_disability_household_yes', points: 2 },
    ],
  },
  {
    id: 'adj_hospitalized',
    category: 'adjustment',
    label: '保護者または同一世帯の親族が入院していますか？',
    helpText: '出産・検査・短期等を除きます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_hospitalized_no', points: 0 },
      { label: 'はい', value: 'adj_hospitalized_yes', points: 2 },
    ],
  },
  {
    id: 'adj_leave_taien',
    category: 'adjustment',
    label: '育児休業取得前に認可保育施設を利用していて退所しましたか？',
    helpText: '事業所内保育事業の従業員枠を除きます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_leave_taien_no', points: 0 },
      { label: 'はい', value: 'adj_leave_taien_yes', points: 2 },
    ],
  },
  {
    id: 'adj_leave_extension',
    category: 'adjustment',
    label: '復職を希望するが、利用保留の場合は育児休業の延長も許容できますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_leave_extension_no', points: 0 },
      { label: 'はい', value: 'adj_leave_extension_yes', points: -100 },
    ],
  },
];

export const asakaData: MunicipalityData = {
  municipality,
  questions: [...buildParentQuestions(1), ...buildParentQuestions(2), ...adjustmentQuestions],
};
