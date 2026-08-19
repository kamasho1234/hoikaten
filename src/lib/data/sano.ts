import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 佐野市 認定調書評点基準（基準指数・調整指数）データ
//
// 出典: 佐野市こども医療部保育課「認定調書評点基準表（R8）」
//       https://www.city.sano.lg.jp/material/files/group/42/R8-Kijyun.pdf
//       （佐野市Webサイト「保育施設入園手続き」
//         https://www.city.sano.lg.jp/soshikiichiran/kodomo/hoikuka/gyomuannai/5/3992.html からリンク）
//
// 2026-08-19: 従来のデータは他自治体と同じ点数配列のテンプレート（推定値）だったため、
//             上記の公式基準表を読み取って全面的に置き換えた。
//             公式の基準指数は父母それぞれ最大17点で、旧データ（父母各20点）とは体系が異なる。
//
// 原典の注記:
//   就労の認定は1か月あたり休憩時間を除いて64時間以上の就労が必要
//   就労の指数は休憩時間を含む勤務時間で判定する
//   区分8 就学等、区分11 その他は区分1（就労）を準用する
//   区分5 親族の介護・看護のうち「施設等の付き添い」は区分1を準用する
//   きょうだいに関する加点は複数該当の場合、最高4点
//
// 実装上の注意: 区分5の「施設等の付き添い」および区分8の就学等は原典では区分1を準用するため、
//   就労と同じ選択肢を持つ質問として実装している。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'sano',
  name: '佐野市',
  slug: 'sano',
  prefecture: '栃木県',
  maxBasePoints: 34, // 基準指数は父母それぞれ最大17点、合計で34点
} as const;

// ---------------------------------------------------------------------------
// 基準指数。父母それぞれについて選ぶ
// ---------------------------------------------------------------------------

/** 区分1 就労。区分8 就学等、区分5「施設等の付き添い」もこれを準用する */
const employmentOptions = (prefix: string, key: string) => [
  { label: 'あてはまらない', value: `${prefix}_${key}_none`, points: 0 },
  { label: '月16日以上：月160時間以上を常態', value: `${prefix}_${key}_17`, points: 17 },
  {
    label: '月16日以上：月140時間以上160時間未満を常態',
    value: `${prefix}_${key}_16`,
    points: 16,
  },
  {
    label: '月16日以上：月130時間以上140時間未満を常態',
    value: `${prefix}_${key}_15a`,
    points: 15,
  },
  {
    label: '月16日以上：月120時間以上130時間未満を常態',
    value: `${prefix}_${key}_14a`,
    points: 14,
  },
  {
    label: '月16日以上：月110時間以上120時間未満を常態',
    value: `${prefix}_${key}_13a`,
    points: 13,
  },
  {
    label: '月16日以上：月100時間以上110時間未満を常態',
    value: `${prefix}_${key}_12a`,
    points: 12,
  },
  {
    label: '月16日以上：月90時間以上100時間未満を常態',
    value: `${prefix}_${key}_11a`,
    points: 11,
  },
  {
    label: '月16日以上：月80時間以上90時間未満を常態',
    value: `${prefix}_${key}_10a`,
    points: 10,
  },
  {
    label: '月16日以上：月64時間以上80時間未満を常態',
    value: `${prefix}_${key}_9`,
    points: 9,
  },
  { label: '月16日未満：月160時間以上を常態', value: `${prefix}_${key}_15b`, points: 15 },
  {
    label: '月16日未満：月140時間以上160時間未満を常態',
    value: `${prefix}_${key}_14b`,
    points: 14,
  },
  {
    label: '月16日未満：月130時間以上140時間未満を常態',
    value: `${prefix}_${key}_13b`,
    points: 13,
  },
  {
    label: '月16日未満：月120時間以上130時間未満を常態',
    value: `${prefix}_${key}_12b`,
    points: 12,
  },
  {
    label: '月16日未満：月110時間以上120時間未満を常態',
    value: `${prefix}_${key}_11b`,
    points: 11,
  },
  {
    label: '月16日未満：月100時間以上110時間未満を常態',
    value: `${prefix}_${key}_10b`,
    points: 10,
  },
  {
    label: '月16日未満：月90時間以上100時間未満を常態',
    value: `${prefix}_${key}_9b`,
    points: 9,
  },
  {
    label: '月16日未満：月80時間以上90時間未満を常態',
    value: `${prefix}_${key}_8`,
    points: 8,
  },
  {
    label: '月16日未満：月64時間以上80時間未満を常態',
    value: `${prefix}_${key}_7`,
    points: 7,
  },
  {
    label: '上記以外の就労（求職認定と同じ最長3か月の認定）',
    value: `${prefix}_${key}_3`,
    points: 3,
  },
];

/** 区分1 就労内定者 */
const jobOfferOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_joboffer_none`, points: 0 },
  { label: '月16日以上：月160時間以上を常態', value: `${prefix}_joboffer_13a`, points: 13 },
  {
    label: '月16日以上：月140時間以上160時間未満を常態',
    value: `${prefix}_joboffer_12a`,
    points: 12,
  },
  {
    label: '月16日以上：月130時間以上140時間未満を常態',
    value: `${prefix}_joboffer_11a`,
    points: 11,
  },
  {
    label: '月16日以上：月120時間以上130時間未満を常態',
    value: `${prefix}_joboffer_10a`,
    points: 10,
  },
  {
    label: '月16日以上：月110時間以上120時間未満を常態',
    value: `${prefix}_joboffer_9a`,
    points: 9,
  },
  {
    label: '月16日以上：月100時間以上110時間未満を常態',
    value: `${prefix}_joboffer_8a`,
    points: 8,
  },
  {
    label: '月16日以上：月90時間以上100時間未満を常態',
    value: `${prefix}_joboffer_7a`,
    points: 7,
  },
  {
    label: '月16日以上：月80時間以上90時間未満を常態',
    value: `${prefix}_joboffer_6`,
    points: 6,
  },
  {
    label: '月16日以上：月64時間以上80時間未満を常態',
    value: `${prefix}_joboffer_5a`,
    points: 5,
  },
  { label: '月16日未満：月160時間以上を常態', value: `${prefix}_joboffer_11b`, points: 11 },
  {
    label: '月16日未満：月140時間以上160時間未満を常態',
    value: `${prefix}_joboffer_10b`,
    points: 10,
  },
  {
    label: '月16日未満：月130時間以上140時間未満を常態',
    value: `${prefix}_joboffer_9b`,
    points: 9,
  },
  {
    label: '月16日未満：月120時間以上130時間未満を常態',
    value: `${prefix}_joboffer_8b`,
    points: 8,
  },
  {
    label: '月16日未満：月110時間以上120時間未満を常態',
    value: `${prefix}_joboffer_7b`,
    points: 7,
  },
  {
    label: '月16日未満：月100時間以上110時間未満を常態',
    value: `${prefix}_joboffer_6b`,
    points: 6,
  },
  {
    label: '月16日未満：月90時間以上100時間未満を常態',
    value: `${prefix}_joboffer_5b`,
    points: 5,
  },
  {
    label: '月16日未満：月80時間以上90時間未満を常態',
    value: `${prefix}_joboffer_4`,
    points: 4,
  },
  {
    label: '月16日未満：月64時間以上80時間未満を常態',
    value: `${prefix}_joboffer_3`,
    points: 3,
  },
];

/** 区分2 出産 */
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '産前・産後各々2か月を含む', value: `${prefix}_childbirth_15`, points: 15 },
];

/** 区分3 疾病 */
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: 'おおむね1か月以上の入院', value: `${prefix}_illness_17a`, points: 17 },
  {
    label: '疾病のため、おおむね1か月以上の常時臥床',
    value: `${prefix}_illness_17b`,
    points: 17,
  },
  {
    label: '居宅内療養（1か月以上）：安静を要する状態（常時病臥に至らない程度）',
    value: `${prefix}_illness_15`,
    points: 15,
  },
  { label: '居宅内療養（1か月以上）：上記以外', value: `${prefix}_illness_12`, points: 12 },
];

/** 区分4 障がい */
const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  {
    label:
      '身体障害者手帳1・2級程度（精神手帳1級程度、療育手帳A1・A2級程度）',
    value: `${prefix}_disability_17`,
    points: 17,
  },
  {
    label: '身体障害者手帳3級程度（精神手帳2級程度、療育手帳B1級程度）',
    value: `${prefix}_disability_13`,
    points: 13,
  },
  {
    label: '身体障害者手帳4〜6級程度（精神手帳3級程度、療育手帳B2級程度）',
    value: `${prefix}_disability_11`,
    points: 11,
  },
];

/** 区分5 親族の介護・看護（居宅介護・看護） */
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  {
    label:
      '重度障がい者等の全介護（要介護5・4、身体1・2、精神1・2、療育A1・A2を所持）',
    value: `${prefix}_care_17`,
    points: 17,
  },
  {
    label:
      '常時観察と介護（食事、排泄、入浴の介護）を要する（要介護3、療育B1を所持）',
    value: `${prefix}_care_13`,
    points: 13,
  },
  { label: '上記以外の程度', value: `${prefix}_care_11`, points: 11 },
];

/** 区分6 災害 */
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  {
    label: '災害等による家屋の損傷、その他の災害復旧のため保育をすることができない',
    value: `${prefix}_disaster_17`,
    points: 17,
  },
];

/** 区分7 求職 */
const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  {
    label: '日中求職活動のため外出することを常態としている（最長3か月の認定）',
    value: `${prefix}_jobseeking_2`,
    points: 2,
  },
];

/** 区分9 虐待等 */
const abuseOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_abuse_none`, points: 0 },
  { label: '児童虐待、DV', value: `${prefix}_abuse_17`, points: 17 },
];

/** 区分10 不存在 */
const absenceOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_absence_none`, points: 0 },
  { label: '死亡、離別、行方不明、拘禁等', value: `${prefix}_absence_17`, points: 17 },
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
      { label: '就労', value: `${prefix}_reason_employment`, points: 0 },
      { label: '就労内定者', value: `${prefix}_reason_joboffer`, points: 0 },
      { label: '出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '疾病', value: `${prefix}_reason_illness`, points: 0 },
      { label: '障がい', value: `${prefix}_reason_disability`, points: 0 },
      { label: '親族の介護・看護（居宅）', value: `${prefix}_reason_care`, points: 0 },
      { label: '親族の介護・看護（施設等の付き添い）', value: `${prefix}_reason_attend`, points: 0 },
      { label: '災害', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '求職', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '就学等', value: `${prefix}_reason_education`, points: 0 },
      { label: '虐待等', value: `${prefix}_reason_abuse`, points: 0 },
      { label: '不存在', value: `${prefix}_reason_absence`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の就労の状況は？`,
      helpText:
        '就労の認定は1か月あたり休憩時間を除いて64時間以上の就労が必要です。指数は休憩時間を含む勤務時間で判定します',
      inputType: 'select',
      options: employmentOptions(prefix, 'employment'),
    },
    {
      id: `${prefix}_joboffer`,
      category,
      label: `${parentLabel}の就労内定の状況は？`,
      helpText: '勤務予定先から就労証明書の提出が必要です',
      inputType: 'select',
      options: jobOfferOptions(prefix),
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
      label: `${parentLabel}の疾病の状況は？`,
      helpText: '診断書が必要です',
      inputType: 'radio',
      options: illnessOptions(prefix),
    },
    {
      id: `${prefix}_disability`,
      category,
      label: `${parentLabel}の障がいの程度は？`,
      helpText: '診断書（あれば手帳）が必要です',
      inputType: 'radio',
      options: disabilityOptions(prefix),
    },
    {
      id: `${prefix}_care`,
      category,
      label: `${parentLabel}の居宅での介護・看護の状況は？`,
      inputType: 'radio',
      options: careOptions(prefix),
    },
    {
      id: `${prefix}_attend`,
      category,
      label: `${parentLabel}の施設等の付き添いの状況は？`,
      helpText: '指数は就労の区分を準用します',
      inputType: 'select',
      options: employmentOptions(prefix, 'attend'),
    },
    {
      id: `${prefix}_disaster`,
      category,
      label: `${parentLabel}は災害復旧のため保育ができませんか？`,
      inputType: 'radio',
      options: disasterOptions(prefix),
    },
    {
      id: `${prefix}_jobseeking`,
      category,
      label: `${parentLabel}は求職活動中ですか？`,
      inputType: 'radio',
      options: jobSeekingOptions(prefix),
    },
    {
      id: `${prefix}_education`,
      category,
      label: `${parentLabel}の就学・技能習得の状況は？`,
      helpText: '指数は就労の区分を準用します',
      inputType: 'select',
      options: employmentOptions(prefix, 'education'),
    },
    {
      id: `${prefix}_abuse`,
      category,
      label: `${parentLabel}は虐待等に該当しますか？`,
      inputType: 'radio',
      options: abuseOptions(prefix),
    },
    {
      id: `${prefix}_absence`,
      category,
      label: `${parentLabel}は不存在に該当しますか？`,
      inputType: 'radio',
      options: absenceOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// ---------------------------------------------------------------------------
// 調整指数
// ---------------------------------------------------------------------------

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親世帯またはこれに準ずる世帯ですか？',
    helpText: '福祉的観点',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい', value: 'adj_single_parent_yes', points: 5 },
    ],
  },
  {
    id: 'adj_social_care',
    category: 'adjustment',
    label: '児童虐待、DVその他社会的養護が必要ですか？',
    helpText: '福祉的観点',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_social_care_no', points: 0 },
      { label: 'はい', value: 'adj_social_care_yes', points: 5 },
    ],
  },
  {
    id: 'adj_parent_disability',
    category: 'adjustment',
    label: '保護者に障がいがあり、身体的・能力的に養育が困難と認められますか？',
    helpText: '診断書および手帳が必須です（福祉的観点）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_parent_disability_no', points: 0 },
      { label: 'はい', value: 'adj_parent_disability_yes', points: 4 },
    ],
  },
  {
    id: 'adj_family_disability',
    category: 'adjustment',
    label: '世帯員に障がいのある人がおり、児童の養育に支障があると認められますか？',
    helpText: '診断書および手帳が必須です（福祉的観点）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_family_disability_no', points: 0 },
      { label: 'はい', value: 'adj_family_disability_yes', points: 3 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯ですか？',
    helpText: '福祉的観点',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい', value: 'adj_welfare_yes', points: 3 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: 'きょうだいの申込・在園の状況は？',
    helpText: 'きょうだいに関する加点は複数該当の場合、最高4点です',
    inputType: 'select',
    options: [
      { label: 'あてはまらない', value: 'adj_sibling_none', points: 0 },
      {
        label:
          '2人以上のきょうだいが新規の保育施設を同時に申し込む（1号から2号への移行希望者の在園園を申し込む場合は除く）',
        value: 'adj_sibling_2',
        points: 2,
      },
      { label: '双子など多胎児が同時に同じ月で申し込む', value: 'adj_sibling_1', points: 1 },
      {
        label:
          'きょうだいが1号・2号・3号で入園中の同じ施設を新規に第1希望で申し込む（1号からの移行希望者を除く）',
        value: 'adj_sibling_3',
        points: 3,
      },
      {
        label: '障がい児枠で利用中または申込み中のきょうだいがいる',
        value: 'adj_sibling_4',
        points: 4,
      },
    ],
  },
  {
    id: 'adj_current_facility',
    category: 'adjustment',
    label: '現在の保育の利用状況は？',
    helpText: '養育環境の観点',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_current_facility_none', points: 0 },
      {
        label:
          '常時、認可外保育施設・企業内託児施設等を利用している、または市外の保育施設に入園している（ひと月あたり64時間以上の利用者が対象、一時預かりは除く）',
        value: 'adj_current_facility_3',
        points: 3,
      },
      {
        label: '地域型保育事業の卒園児の申込み（事業所内保育の従業員枠を除く）',
        value: 'adj_current_facility_6',
        points: 6,
      },
    ],
  },
  {
    id: 'adj_workplace',
    category: 'adjustment',
    label: '就労先・保育の状況に該当するものは？',
    helpText: '養育環境の観点',
    inputType: 'select',
    options: [
      { label: 'あてはまらない', value: 'adj_workplace_none', points: 0 },
      {
        label:
          '保護者が勤務先に連れて行き仕事のかたわら保育している（自営業・勤務先が実家や自宅の場合を除く）',
        value: 'adj_workplace_3',
        points: 3,
      },
      {
        label: '就労証明書の主な就労先住所が自宅住所である',
        value: 'adj_workplace_m3a',
        points: -3,
      },
      {
        label: 'きょうだいいずれかが家庭で保育されている（勤務先が自宅の場合を含む）',
        value: 'adj_workplace_m3b',
        points: -3,
      },
    ],
  },
  {
    id: 'adj_readmit',
    category: 'adjustment',
    label: '再入園に該当しますか？',
    helpText: 'きょうだいが同時に申し込みした場合を含みます（養育環境の観点）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_readmit_no', points: 0 },
      {
        label:
          '弟・妹の育児休業取得により退園した児童の再入園、または再入園希望児童の弟・妹の申込み',
        value: 'adj_readmit_leave',
        points: 5,
      },
      {
        label:
          '病気療養等のため退園した児童の再入園、または再入園希望児童のきょうだいの申込み',
        value: 'adj_readmit_illness',
        points: 5,
      },
    ],
  },
  {
    id: 'adj_third_child',
    category: 'adjustment',
    label: '第3子以降の児童の申込みですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_third_child_no', points: 0 },
      { label: 'はい', value: 'adj_third_child_yes', points: 3 },
    ],
  },
  {
    id: 'adj_childcare_worker',
    category: 'adjustment',
    label: '父母が保育士・幼稚園教諭・保育教諭として教育・保育施設で勤務していますか？',
    helpText:
      '就労予定の場合も含みます。教育・保育施設とは幼稚園、保育園、認定こども園、地域型保育事業（認可外も含む）です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_childcare_worker_no', points: 0 },
      { label: 'はい', value: 'adj_childcare_worker_yes', points: 4 },
    ],
  },
  {
    id: 'adj_unemployment',
    category: 'adjustment',
    label: '生計中心者の失業により、速やかな就労の必要性が高いですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unemployment_no', points: 0 },
      { label: 'はい', value: 'adj_unemployment_yes', points: 3 },
    ],
  },
  {
    id: 'adj_forced_transfer',
    category: 'adjustment',
    label: '施設側の事情により転園を余儀なくされましたか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_forced_transfer_no', points: 0 },
      { label: 'はい', value: 'adj_forced_transfer_yes', points: 6 },
    ],
  },
  {
    id: 'adj_grandparent',
    category: 'adjustment',
    label: '祖父母（入園希望年度の4月1日現在で65歳未満）が健康で不就労ですか？',
    helpText: '減点',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_grandparent_no', points: 0 },
      { label: '同居している', value: 'adj_grandparent_live', points: -10 },
      { label: '別居している（市内）', value: 'adj_grandparent_apart', points: -3 },
    ],
  },
  {
    id: 'adj_arrears',
    category: 'adjustment',
    label: '保育料・給食費の未納がありますか？',
    helpText: '減点',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_arrears_no', points: 0 },
      { label: 'はい', value: 'adj_arrears_yes', points: -50 },
    ],
  },
];

// ---------------------------------------------------------------------------
// エクスポート
// ---------------------------------------------------------------------------

export const sanoData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
