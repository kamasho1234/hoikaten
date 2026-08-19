import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 座間市 保育所入所選考基準（基準点数・調整点数）データ
//
// 出典: 座間市子ども未来部保育・幼稚園課「令和8年度 保育所等入所のご案内」
//       20 保育所入所選考基準（17〜18ページ、令和8年度（令和8年4月）選考から適用）
//       https://www.city.zama.kanagawa.jp/_res/projects/default_project/_page_/001/008/962/2026goannnai.pdf
//       （座間市Webサイト「【令和8年4月】保育所等入所申し込み」
//         https://www.city.zama.kanagawa.jp/kosodate/hoiku/hoikuen/1008962.html からリンク）
//
// 2026-08-19: 従来のデータは他自治体と同じ点数配列のテンプレート（推定値）だったため、
//             上記の公式基準を読み取って全面的に置き換えた。
//             公式の基準点数は父母それぞれ最大50点で、旧データ（父母各20点）とは体系が異なる。
//
// 原典の注記:
//   【基準点数について】
//     基準点数については、児童の父母それぞれの点数を合算する
//     父および母の基準点数が複数の項目に該当する場合は、原則基準点数が高い項目の点数のみとする。
//       ただし、妊娠・出産に該当する場合は妊娠・出産の基準点数とする
//     この表における「勤務時間」とは、出勤から退勤までの時間（休憩時間を含む）を基本とする
//   【調整点数について】
//     調整点数については、世帯を単位として加点する。ただし、第3子以降の申込みの場合や
//       小規模保育事業など地域型保育事業の卒園児童の加点等については、児童ごとの加点とする
//     認可外保育施設または保育所等の一時預かりを利用している場合の加点については、
//       産後休業・育児休業・介護休業の満了に伴い同一職場へ復職する場合の加点を受けている者は除く
//     内定した保育所等を辞退し別の保育所等を申請した場合の減点は、辞退した年度内のみ反映する
//     保育所等に入所している者の転園希望については、上記の定めに関わらず点数を0点とする
//       （ただし1号認定を受けている者、保育認定を受けているきょうだいが在籍する施設への転園希望者、
//         転居に伴い転園を希望する者を除く）
//     希望する保育所等に入所できない場合、育児休業の延長を許容できる者は、
//       基準点数に関わらず -100点とする
//
// 数値化しない規定（範囲指定・優先順位のため質問には含めない）:
//   調整点数「その他福祉事務所長が認める場合」10〜100
//   優先順位項目: (1)希望順位 (2)調整点数の合計点 (3)所得割額
// ---------------------------------------------------------------------------

const municipality = {
  id: 'zama',
  name: '座間市',
  slug: 'zama',
  prefecture: '神奈川県',
  maxBasePoints: 100, // 基準点数は父母それぞれ最大50点、合算で100点
} as const;

// ---------------------------------------------------------------------------
// 基準点数。父母それぞれについて選ぶ
// ---------------------------------------------------------------------------

/** 就労 */
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '勤務時間が1か月に170時間以上', value: `${prefix}_employment_35`, points: 35 },
  {
    label: '勤務時間が1か月に140時間以上170時間未満',
    value: `${prefix}_employment_33`,
    points: 33,
  },
  {
    label: '勤務時間が1か月に110時間以上140時間未満',
    value: `${prefix}_employment_31`,
    points: 31,
  },
  {
    label: '勤務時間が1か月に80時間以上110時間未満',
    value: `${prefix}_employment_29`,
    points: 29,
  },
  {
    label: '勤務時間が1か月に64時間以上80時間未満',
    value: `${prefix}_employment_27`,
    points: 27,
  },
];

/** 妊娠・出産 */
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '妊娠・出産', value: `${prefix}_childbirth_24`, points: 24 },
];

/** 傷病 */
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院を要する期間が1か月以上必要', value: `${prefix}_illness_35a`, points: 35 },
  { label: '常時臥床の状態にある', value: `${prefix}_illness_35b`, points: 35 },
  {
    label: '通院が1か月以上必要かつ保育が困難',
    value: `${prefix}_illness_22`,
    points: 22,
  },
];

/** 障害 */
const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  {
    label: '最重度の障害（重度の障害が2つ以上、要介護5）',
    value: `${prefix}_disability_35`,
    points: 35,
  },
  {
    label:
      '重度の障害（身体障害者手帳1・2級、療育手帳A1・A2、精神障害者保健福祉手帳1・2級、要介護4）',
    value: `${prefix}_disability_30`,
    points: 30,
  },
  {
    label:
      '中度の障害（身体障害者手帳3・4級、療育手帳B1・B2、精神障害者保健福祉手帳3級、要介護3）',
    value: `${prefix}_disability_25`,
    points: 25,
  },
];

/** 親族の介護 */
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '常時臥床の者の介護をする', value: `${prefix}_care_30a`, points: 30 },
  {
    label: '最重度の障害（重度の障害が2つ以上、要介護5）のある者の看護等をする',
    value: `${prefix}_care_30b`,
    points: 30,
  },
  {
    label:
      '重度の障害（身体障害者手帳1・2級、療育手帳A1・A2、精神障害者保健福祉手帳1・2級、要介護4）のある者の看護等をする',
    value: `${prefix}_care_25`,
    points: 25,
  },
  {
    label:
      '中度の障害（身体障害者手帳3・4級、療育手帳B1・B2、精神障害者保健福祉手帳3級、要介護3）のある者の看護等をする',
    value: `${prefix}_care_15a`,
    points: 15,
  },
  {
    label: '障害児（者）の通学に常時付添いをする',
    value: `${prefix}_care_15b`,
    points: 15,
  },
  {
    label: '医療機関に入院した者の付添い看護等をする（月64時間以上の付添いを要する）',
    value: `${prefix}_care_15c`,
    points: 15,
  },
  {
    label:
      '通院が1か月以上必要かつ日常生活が困難である旨医師が認めた者の看護等をする',
    value: `${prefix}_care_15d`,
    points: 15,
  },
];

/** 災害 */
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '災害の復旧に当たっている', value: `${prefix}_disaster_50`, points: 50 },
];

/** 就学 */
const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  {
    label:
      '学校教育法に規定する学校、専修学校、各種学校その他これらに準ずる教育施設などに在学している',
    value: `${prefix}_education_24a`,
    points: 24,
  },
  {
    label: '職業能力開発促進法等に規定する職業訓練などを受けている',
    value: `${prefix}_education_24b`,
    points: 24,
  },
];

/** 求職活動 */
const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  {
    label: '利用申込時点で勤務時間数が基準を満たさず、入所後に基準を満たす旨の誓約をしている',
    value: `${prefix}_jobseeking_5a`,
    points: 5,
  },
  {
    label: '保育所に入所後、3か月以内に基準を満たす就労を開始する',
    value: `${prefix}_jobseeking_5b`,
    points: 5,
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
    helpText:
      '複数の項目に該当する場合は、原則基準点数が高い項目の点数のみとなります（妊娠・出産に該当する場合は妊娠・出産の点数）',
    inputType: 'select',
    options: [
      { label: '就労', value: `${prefix}_reason_employment`, points: 0 },
      { label: '妊娠・出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '傷病', value: `${prefix}_reason_illness`, points: 0 },
      { label: '障害', value: `${prefix}_reason_disability`, points: 0 },
      { label: '親族の介護', value: `${prefix}_reason_care`, points: 0 },
      { label: '災害', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '就学', value: `${prefix}_reason_education`, points: 0 },
      { label: '求職活動', value: `${prefix}_reason_jobseeking`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の勤務時間は？`,
      helpText: '「勤務時間」とは出勤から退勤までの時間（休憩時間を含む）が基本です',
      inputType: 'radio',
      options: employmentOptions(prefix),
    },
    {
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}は妊娠・出産に該当しますか？`,
      inputType: 'radio',
      options: childbirthOptions(prefix),
    },
    {
      id: `${prefix}_illness`,
      category,
      label: `${parentLabel}の傷病の状況は？`,
      inputType: 'radio',
      options: illnessOptions(prefix),
    },
    {
      id: `${prefix}_disability`,
      category,
      label: `${parentLabel}の障害の程度は？`,
      inputType: 'radio',
      options: disabilityOptions(prefix),
    },
    {
      id: `${prefix}_care`,
      category,
      label: `${parentLabel}の親族の介護の状況は？`,
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
      id: `${prefix}_education`,
      category,
      label: `${parentLabel}の就学の状況は？`,
      inputType: 'radio',
      options: educationOptions(prefix),
    },
    {
      id: `${prefix}_jobseeking`,
      category,
      label: `${parentLabel}の求職活動の状況は？`,
      inputType: 'radio',
      options: jobSeekingOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// ---------------------------------------------------------------------------
// 調整点数
// ---------------------------------------------------------------------------

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親家庭ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい', value: 'adj_single_parent_yes', points: 54 },
      { label: 'はい（求職活動中）', value: 'adj_single_parent_jobseeking', points: 16 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯で、就労または求職活動の要件に該当しますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい', value: 'adj_welfare_yes', points: 5 },
    ],
  },
  {
    id: 'adj_social_care',
    category: 'adjustment',
    label: '虐待やDVのおそれがある場合など、社会的養護が必要ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_social_care_no', points: 0 },
      { label: 'はい', value: 'adj_social_care_yes', points: 54 },
    ],
  },
  {
    id: 'adj_child_disability',
    category: 'adjustment',
    label: '申請児童が障害者手帳等を交付されていますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_child_disability_no', points: 0 },
      { label: 'はい', value: 'adj_child_disability_yes', points: 10 },
    ],
  },
  {
    id: 'adj_return_from_leave',
    category: 'adjustment',
    label: '産後休業・育児休業・介護休業の満了に伴う復職ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_return_from_leave_no', points: 0 },
      { label: '満了に伴い同一職場へ復職する', value: 'adj_return_from_leave_10a', points: 10 },
      {
        label: '休業の取得に伴い保育所を退所し、同一保育所へ再入所を希望する',
        value: 'adj_return_from_leave_10b',
        points: 10,
      },
    ],
  },
  {
    id: 'adj_childcare_worker',
    category: 'adjustment',
    label: '市内の保育所等または幼稚園で保育士・幼稚園教諭・看護師として就労（内定）していますか？',
    helpText:
      '市内の認可された保育所、認定こども園、小規模保育事業および家庭的保育事業、または幼稚園が対象です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_childcare_worker_no', points: 0 },
      { label: '月に120時間以上', value: 'adj_childcare_worker_35', points: 35 },
      { label: '月に120時間未満', value: 'adj_childcare_worker_10', points: 10 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: 'きょうだいの申込・入所状況は？',
    helpText:
      '第3子以降の加点は、兄姉が2人以上保育所等に入所しているまたは申込みしている場合に限ります',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_sibling_none', points: 0 },
      {
        label: 'きょうだい（多胎児を含む）の申込を同時に行う、または既にきょうだいが保育所に入所している',
        value: 'adj_sibling_10',
        points: 10,
      },
      { label: '第3子以降の申込み', value: 'adj_sibling_5', points: 5 },
      {
        label: '両方に該当する',
        value: 'adj_sibling_15',
        points: 15,
      },
    ],
  },
  {
    id: 'adj_small_facility_graduate',
    category: 'adjustment',
    label: '小規模保育事業など地域型保育事業の卒園児童ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_small_facility_graduate_no', points: 0 },
      {
        label: '小規模保育施設・家庭的保育施設の卒園に伴い連携施設を第1希望とした（連携施設のみ）',
        value: 'adj_small_facility_graduate_100',
        points: 100,
      },
      { label: '上記以外の地域型保育事業の卒園児童', value: 'adj_small_facility_graduate_10', points: 10 },
    ],
  },
  {
    id: 'adj_unlicensed_nursery',
    category: 'adjustment',
    label: '認可外保育施設等や幼稚園の預かり保育を定期的に利用していますか？',
    helpText:
      '申請月直近でリフレッシュを除いて週3回以上利用している場合が対象。産後休業・育児休業・介護休業の満了に伴う復職の加点を受けている者は除きます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unlicensed_nursery_no', points: 0 },
      { label: 'はい', value: 'adj_unlicensed_nursery_yes', points: 10 },
    ],
  },
  {
    id: 'adj_declined',
    category: 'adjustment',
    label: '内定した保育所等を辞退し、別の保育所等を希望しますか？',
    helpText: '病気等やむを得ない場合を除きます。辞退した年度内のみ反映されます（減点）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_declined_no', points: 0 },
      { label: 'はい', value: 'adj_declined_yes', points: -10 },
    ],
  },
  {
    id: 'adj_grandparent',
    category: 'adjustment',
    label: '同居の65歳未満の祖父母の保育を必要とする理由が確認できましたか？',
    helpText: '確認できなかった場合は減点されます',
    inputType: 'radio',
    options: [
      { label: '該当しない・確認できた', value: 'adj_grandparent_no', points: 0 },
      { label: '確認できなかった', value: 'adj_grandparent_yes', points: -10 },
    ],
  },
  {
    id: 'adj_arrears',
    category: 'adjustment',
    label: '正当な理由なく保育料（きょうだい等の保育料も含む）の滞納がありますか？',
    helpText: '減点',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_arrears_no', points: 0 },
      { label: '納付のない月が3か月以上6か月未満', value: 'adj_arrears_5', points: -5 },
      { label: '納付のない月が6か月以上', value: 'adj_arrears_15', points: -15 },
    ],
  },
  {
    id: 'adj_other_city',
    category: 'adjustment',
    label: '他市区町村からの入所委託ですか？',
    helpText: '減点',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_other_city_no', points: 0 },
      { label: 'はい', value: 'adj_other_city_yes', points: -40 },
    ],
  },
  {
    id: 'adj_leave_extension',
    category: 'adjustment',
    label: '希望する保育所等に入所できない場合、育児休業の延長を許容できますか？',
    helpText: '該当する場合、基準点数に関わらず -100点となります',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_leave_extension_no', points: 0 },
      { label: 'はい', value: 'adj_leave_extension_yes', points: -100 },
    ],
  },
];

// ---------------------------------------------------------------------------
// エクスポート
// ---------------------------------------------------------------------------

export const zamaData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
