import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 守谷市 保育所等利用調整基準（基本点数・調整点数）データ
//
// 出典: 守谷市こども未来部すくすく保育課「令和8年度入所分 保育所等利用調整基準」
//       https://www.city.moriya.ibaraki.jp/_res/projects/default_project/_page_/001/002/440/r8_riyoutyoseikijun.pdf
//       （守谷市Webサイト「保育所のご案内」
//         https://www.city.moriya.ibaraki.jp/kosodate/service/1002439/1002440.html からリンク）
//
// 2026-08-19: 従来のデータは他自治体と同じ点数配列のテンプレート（推定値）だったため、
//             上記の公式基準を読み取って全面的に置き換えた。
//             公式の基本点数は父母それぞれ最大100点で、旧データ（父母各20点）とは体系が異なる。
//
// 原典の構成: 基本点数（父・母）／調整点数（保育状況）／調整点数（世帯の状況）
//
// 原典の注記:
//   ・父の基本点数、母の基本点数、保育状況の調整点数は、必ずいずれか1つに該当させる
//   ・ひとり親（または離婚調停中かつ別居中）である場合は、保育している者の該当点数+100点とする
//     （この加算は基本点数側の規定。本シミュレーターでは世帯の状況「ひとり親世帯 +100」のみを
//       点数化しているため、実際の点数はここでの試算よりさらに100点高くなる）
//   ・「＊」については、当該児童や世帯の状況に応じて別途判断する
//   ・※1 の加点を受けて利用承諾となった場合、原則として1年以上、市内の認定こども園、保育所、
//     認証保育園、認可外保育所、幼稚園、地域型保育事業所に勤務することを条件とする
//
// 数値化しない規定（別途判断・優先順位のため質問には含めない）:
//   基本点数「虐待・DV」「その他 市長が特に保育が必要な状態にあると認める場合」＝「＊」
//   世帯の状況「市長が特に必要と認める場合」＝「＊」
//   同一点数時の順位表:
//     1 守谷市民である（転入予定者を含む）／2 基本点数が高い順／
//     3 申込児童の世帯に保育料の滞納がないもの／4 当該保育所等の希望順位が高いもの／
//     5 申込児童の世帯の小学生以下のこどもの人数が多いもの／6 家計の主宰者の経済的状況
// ---------------------------------------------------------------------------

const municipality = {
  id: 'moriya',
  name: '守谷市',
  slug: 'moriya',
  prefecture: '茨城県',
  maxBasePoints: 200, // 基本点数は父・母それぞれ最大100点、合計で200点
} as const;

// ---------------------------------------------------------------------------
// 基本点数。父母それぞれについて選ぶ
// ---------------------------------------------------------------------------

/** 就労中 */
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  {
    label: '月20日以上かつ週40時間以上、または週5日以上かつ1日8時間以上',
    value: `${prefix}_employment_100`,
    points: 100,
  },
  {
    label: '月20日以上かつ週30時間以上、または週5日以上かつ1日6時間以上',
    value: `${prefix}_employment_90`,
    points: 90,
  },
  {
    label: '月16日以上かつ週24時間以上、または週4日以上かつ1日6時間以上',
    value: `${prefix}_employment_80`,
    points: 80,
  },
  {
    label: '月16日以上かつ週16時間以上、または週4日以上かつ1日4時間以上',
    value: `${prefix}_employment_70`,
    points: 70,
  },
  { label: '上記には該当しないが、月64時間以上', value: `${prefix}_employment_60`, points: 60 },
];

/** 就労の内定 */
const jobOfferOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_joboffer_none`, points: 0 },
  {
    label: '月20日以上かつ週40時間以上、または週5日以上かつ1日8時間以上',
    value: `${prefix}_joboffer_90`,
    points: 90,
  },
  {
    label: '月20日以上かつ週30時間以上、または週5日以上かつ1日6時間以上',
    value: `${prefix}_joboffer_80`,
    points: 80,
  },
  {
    label: '月16日以上かつ週24時間以上、または週4日以上かつ1日6時間以上',
    value: `${prefix}_joboffer_70`,
    points: 70,
  },
  {
    label: '月16日以上かつ週16時間以上、または週4日以上かつ1日4時間以上',
    value: `${prefix}_joboffer_60`,
    points: 60,
  },
  { label: '上記には該当しないが、月64時間以上', value: `${prefix}_joboffer_50`, points: 50 },
];

/** 妊娠・出産（母のみが対象） */
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  {
    label: '出産または出産予定月の前1か月、後2か月の期間',
    value: `${prefix}_childbirth_90`,
    points: 90,
  },
];

/** 疾病 */
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  {
    label: '入院または入院に相当する治療や安静を要する自宅療養で常に病臥している',
    value: `${prefix}_illness_100`,
    points: 100,
  },
  {
    label: '通院加療を行い、常に安静を要するなど、保育が常時困難',
    value: `${prefix}_illness_80`,
    points: 80,
  },
  { label: '疾病などにより、保育に支障がある', value: `${prefix}_illness_60`, points: 60 },
];

/** 障がい */
const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  {
    label: '身体障がい者手帳1・2級（聴覚障がい3級を含む）、療育手帳マルA・A、精神障がい者保健福祉手帳1級のいずれか',
    value: `${prefix}_disability_100`,
    points: 100,
  },
  {
    label: '身体障がい者手帳3・4級（聴覚障がい3級を除く）、精神障がい者保健福祉手帳2級、療育手帳Bのいずれか',
    value: `${prefix}_disability_80`,
    points: 80,
  },
  {
    label: '身体障がい者手帳5級以下、精神障がい者保健福祉手帳3級、療育手帳Cのいずれか',
    value: `${prefix}_disability_60`,
    points: 60,
  },
];

/** 親族の介護・看護 */
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  {
    label: '月20日以上かつ週40時間以上保育が常時困難',
    value: `${prefix}_care_90`,
    points: 90,
  },
  { label: '月20日以上かつ週30時間以上保育が困難', value: `${prefix}_care_80`, points: 80 },
  { label: '月16日以上かつ週24時間以上保育が困難', value: `${prefix}_care_70`, points: 70 },
  { label: '月16日以上かつ週16時間以上保育が困難', value: `${prefix}_care_60`, points: 60 },
  { label: '月64時間以上保育が困難', value: `${prefix}_care_50`, points: 50 },
];

/** 災害・復旧 */
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  {
    label: '震災、風水害、火災その他の災害により自宅や近隣の復旧に当たっている',
    value: `${prefix}_disaster_100`,
    points: 100,
  },
];

/** 就学 */
const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '通信以外で月120時間以上就学している', value: `${prefix}_education_80`, points: 80 },
  { label: '通信以外で月64時間以上就学している', value: `${prefix}_education_60`, points: 60 },
  { label: '通信で月64時間以上就学している', value: `${prefix}_education_40`, points: 40 },
  {
    label: '通信以外で月120時間以上の就学が内定している',
    value: `${prefix}_education_70`,
    points: 70,
  },
  {
    label: '通信以外で月64時間以上の就学が内定している',
    value: `${prefix}_education_50`,
    points: 50,
  },
  { label: '通信で月64時間以上の就学が内定している', value: `${prefix}_education_30`, points: 30 },
];

/** 求職活動 */
const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職中である', value: `${prefix}_jobseeking_20`, points: 20 },
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
      { label: '就労中', value: `${prefix}_reason_employment`, points: 0 },
      { label: '就労の内定', value: `${prefix}_reason_joboffer`, points: 0 },
      { label: '妊娠・出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '疾病', value: `${prefix}_reason_illness`, points: 0 },
      { label: '障がい', value: `${prefix}_reason_disability`, points: 0 },
      { label: '親族の介護・看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '災害・復旧', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '就学', value: `${prefix}_reason_education`, points: 0 },
      { label: '求職活動', value: `${prefix}_reason_jobseeking`, points: 0 },
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
      id: `${prefix}_joboffer`,
      category,
      label: `${parentLabel}の就労内定の状況は？`,
      inputType: 'radio',
      options: jobOfferOptions(prefix),
    },
    {
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}の出産時期は？`,
      helpText: '妊娠・出産は母のみが対象です',
      inputType: 'radio',
      options: childbirthOptions(prefix),
    },
    {
      id: `${prefix}_illness`,
      category,
      label: `${parentLabel}の疾病の状況は？`,
      inputType: 'radio',
      options: illnessOptions(prefix),
    },
    {
      id: `${prefix}_disability`,
      category,
      label: `${parentLabel}の障がいの程度は？`,
      inputType: 'radio',
      options: disabilityOptions(prefix),
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
      label: `${parentLabel}は求職中ですか？`,
      inputType: 'radio',
      options: jobSeekingOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// ---------------------------------------------------------------------------
// 調整点数（保育状況）。いずれか1つに該当させる
// ---------------------------------------------------------------------------

const careStatusQuestion: Question = {
  id: 'adj_care_status',
  category: 'adjustment',
  label: '申込児童の現在の保育状況は？',
  helpText: 'いずれか1つに該当させます（調整点数・保育状況）',
  inputType: 'select',
  options: [
    {
      label: '父母が自宅で保育している（支給認定事由が「求職活動」）',
      value: 'adj_care_status_home_0',
      points: 0,
    },
    {
      label:
        '父母が自宅で保育している（支給認定事由が「妊娠・出産」「保護者の疾病・障がい」「親族の介護・看護」「災害・復旧」「就学」「虐待・DV」「その他市長が認める場合」）',
      value: 'adj_care_status_home_10',
      points: 10,
    },
    {
      label: '父母が自宅で保育している（支給認定事由が「就労」で産休・育休中）',
      value: 'adj_care_status_home_36',
      points: 36,
    },
    {
      label: '父母が自宅で保育している（支給認定事由が「就労」で産休・育休中以外）',
      value: 'adj_care_status_home_40',
      points: 40,
    },
    { label: '親族が保育している（65歳以上）', value: 'adj_care_status_rel_65over', points: 20 },
    {
      label: '親族が保育している（65歳未満・市外別居）',
      value: 'adj_care_status_rel_outside',
      points: 20,
    },
    {
      label: '親族が保育している（65歳未満・市内別居・就労）',
      value: 'adj_care_status_rel_in_work',
      points: 16,
    },
    {
      label: '親族が保育している（65歳未満・市内別居・疾病・介護等）',
      value: 'adj_care_status_rel_in_care',
      points: 16,
    },
    {
      label: '親族が保育している（65歳未満・市内別居・その他）',
      value: 'adj_care_status_rel_in_other',
      points: 8,
    },
    {
      label: '親族が保育している（65歳未満・同居・就労）',
      value: 'adj_care_status_rel_live_work',
      points: 12,
    },
    {
      label: '親族が保育している（65歳未満・同居・疾病・介護等）',
      value: 'adj_care_status_rel_live_care',
      points: 12,
    },
    {
      label: '親族が保育している（65歳未満・同居・その他）',
      value: 'adj_care_status_rel_live_other',
      points: 4,
    },
    { label: '同伴就労をしている', value: 'adj_care_status_accompany', points: 40 },
    { label: '親族以外に週4日以上預けている', value: 'adj_care_status_nonrelative', points: 32 },
    {
      label: '認可外保育所を週4日以上利用している',
      value: 'adj_care_status_unlicensed',
      points: 40,
    },
    {
      label: '企業内託児所等を週4日以上利用している',
      value: 'adj_care_status_company',
      points: 32,
    },
    { label: '一時保育を週4日以上利用している', value: 'adj_care_status_temp_4', points: 28 },
    { label: '一時保育を週3日利用している', value: 'adj_care_status_temp_3', points: 20 },
    {
      label: '幼稚園・認定こども園（教育）を利用していて、同一施設で保育を希望',
      value: 'adj_care_status_kinder_same',
      points: 60,
    },
    {
      label: '幼稚園・認定こども園（教育）を利用していて、別施設で保育を希望',
      value: 'adj_care_status_kinder_other',
      points: 40,
    },
    {
      label: '保育所等を利用中で、きょうだいが利用している保育所等に転所の申込をする',
      value: 'adj_care_status_nursery_sibling',
      points: 60,
    },
    {
      label:
        '保育所等を利用中で、市内の保育所等への入所を希望したが入所不承諾となり入所した市外の保育所等からの転園を希望する',
      value: 'adj_care_status_nursery_denied',
      points: 40,
    },
    {
      label: '保育所等を利用中で、転入により市外の保育所等からの転園を希望する',
      value: 'adj_care_status_nursery_movein',
      points: 40,
    },
    {
      label: '保育所等を利用中で、転居・転勤によりやむをえず転所の申込をする',
      value: 'adj_care_status_nursery_move',
      points: 28,
    },
    {
      label: '保育所等を利用中で、上記以外の場合',
      value: 'adj_care_status_nursery_other',
      points: 20,
    },
    {
      label: '家庭的保育事業等を卒園し、連携施設以外の保育所等の入所を希望する',
      value: 'adj_care_status_graduate',
      points: 80,
    },
  ],
};

// ---------------------------------------------------------------------------
// 調整点数（世帯の状況）。該当する場合のみ加算・減算
// ---------------------------------------------------------------------------

const adjustmentQuestions: Question[] = [
  careStatusQuestion,
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: '世帯の状況は？',
    helpText:
      'ひとり親（または離婚調停中かつ別居中）の場合、基本点数についても保育している方の該当点数に100点が加算されます',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_single_parent_none', points: 0 },
      { label: '両親不存在', value: 'adj_single_parent_both', points: 100 },
      { label: 'ひとり親世帯', value: 'adj_single_parent_single', points: 100 },
      {
        label: '調停、審判、裁判による離婚の訴えを提起中（裁判上の離婚）かつ別居中',
        value: 'adj_single_parent_lawsuit',
        points: 20,
      },
      {
        label: '離婚前提別居中（調停、審判、裁判による離婚の訴えを提起中は除く）',
        value: 'adj_single_parent_separated',
        points: 10,
      },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護受給世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい', value: 'adj_welfare_yes', points: 10 },
    ],
  },
  {
    id: 'adj_detention',
    category: 'adjustment',
    label: '保護者が拘禁中ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_detention_no', points: 0 },
      { label: 'はい', value: 'adj_detention_yes', points: 8 },
    ],
  },
  {
    id: 'adj_unemployment',
    category: 'adjustment',
    label: '家計の主宰者が倒産、失業のため求職中ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unemployment_no', points: 0 },
      { label: 'はい', value: 'adj_unemployment_yes', points: 8 },
    ],
  },
  {
    id: 'adj_single_posting',
    category: 'adjustment',
    label: 'やむを得ない事情により父母のいずれかが保育を行うことができませんか？',
    helpText: '単身赴任、入院等',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_posting_no', points: 0 },
      { label: 'はい', value: 'adj_single_posting_yes', points: 5 },
    ],
  },
  {
    id: 'adj_parent_disability',
    category: 'adjustment',
    label: '保護者が障がい者手帳の交付を受けていますか？',
    helpText:
      '基本点数を「保護者の疾病・障がい」で採点している場合は、重複採点は行われません。手帳を所持する人数分が加算されます（1人あたりの点数を表示しています）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_parent_disability_no', points: 0 },
      {
        label:
          '身体障がい者手帳1・2級（聴覚障がい3級を含む）、精神障がい者保健福祉手帳1級、療育手帳マルA・Aのいずれか',
        value: 'adj_parent_disability_10',
        points: 10,
      },
      {
        label:
          '身体障がい者手帳3・4級（聴覚障がい3級を除く）、精神障がい者保健福祉手帳2級、療育手帳Bのいずれか',
        value: 'adj_parent_disability_8',
        points: 8,
      },
      {
        label:
          '身体障がい者手帳5級以下、精神障がい者保健福祉手帳3級、療育手帳Cのいずれか',
        value: 'adj_parent_disability_5',
        points: 5,
      },
    ],
  },
  {
    id: 'adj_family_disability',
    category: 'adjustment',
    label: '同居親族に障がい者手帳の所持者または要介護1以上の認定者がいますか？',
    helpText:
      '身体障がい者手帳4級以上、精神障がい者保健福祉手帳2級以上、療育手帳B以上のいずれか。当該児童または保護者がこれらの手帳を所持している場合を除きます（1人あたり3点）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_family_disability_no', points: 0 },
      { label: '1人', value: 'adj_family_disability_1', points: 3 },
      { label: '2人', value: 'adj_family_disability_2', points: 6 },
      { label: '3人以上', value: 'adj_family_disability_3', points: 9 },
    ],
  },
  {
    id: 'adj_childcare_worker',
    category: 'adjustment',
    label: '保護者が市内の保育施設等で保育に従事していますか（内定を含む）？',
    helpText:
      '保育士（子育て支援員研修を修了した者を含む）、幼稚園教諭、小学校教諭、養護教諭、保健師、看護師、准看護師の資格を有した父母が、市内の認定こども園・保育所・認証保育園・認可外保育所・幼稚園・地域型保育事業所で勤務する場合。この加点で利用承諾となった場合、原則1年以上の勤務が条件です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_childcare_worker_no', points: 0 },
      { label: 'はい', value: 'adj_childcare_worker_yes', points: 80 },
    ],
  },
  {
    id: 'adj_sibling_enrolled',
    category: 'adjustment',
    label: 'すでにきょうだいが入所している保育所等への入所を希望しますか？',
    helpText:
      '保育状況の調整点数を「幼稚園・認定こども園（教育）を利用している」で「同一施設で保育を希望」、または「保育所等で保育を利用している」で「きょうだいが利用している保育所等に転所の申込をする」で採点している場合は加点されません',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_enrolled_no', points: 0 },
      { label: 'はい', value: 'adj_sibling_enrolled_yes', points: 15 },
    ],
  },
  {
    id: 'adj_preschool_children',
    category: 'adjustment',
    label: '申込児童以外に未就学児童は何人いますか？',
    helpText: '1人あたり4点',
    inputType: 'radio',
    options: [
      { label: 'いない', value: 'adj_preschool_children_0', points: 0 },
      { label: '1人', value: 'adj_preschool_children_1', points: 4 },
      { label: '2人', value: 'adj_preschool_children_2', points: 8 },
      { label: '3人以上', value: 'adj_preschool_children_3', points: 12 },
    ],
  },
  {
    id: 'adj_outside_city',
    category: 'adjustment',
    label: '市外に居住していますか？',
    helpText:
      '転入予定を除きます。保育士等の資格を有した父母が市内の保育施設等で勤務（内定を含む）し保育を行う場合は採点されません（減点）',
    inputType: 'radio',
    options: [
      { label: 'いいえ（守谷市在住・転入予定）', value: 'adj_outside_city_no', points: 0 },
      { label: 'はい', value: 'adj_outside_city_yes', points: -150 },
    ],
  },
  {
    id: 'adj_arrears',
    category: 'adjustment',
    label: '過去5年間のうち3か月分以上の保育料の滞納がありますか？',
    helpText: '減点',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_arrears_no', points: 0 },
      { label: 'はい', value: 'adj_arrears_yes', points: -50 },
    ],
  },
  {
    id: 'adj_sibling_not_applied',
    category: 'adjustment',
    label: 'きょうだいに幼稚園・保育所等の利用または利用申込のない未就学児童がいますか？',
    helpText: '当該児童が介護・看護の対象児童である場合を除きます（減点）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_not_applied_no', points: 0 },
      { label: 'はい', value: 'adj_sibling_not_applied_yes', points: -10 },
    ],
  },
  {
    id: 'adj_entry_month',
    category: 'adjustment',
    label: '入所希望日は4月〜9月ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_entry_month_no', points: 0 },
      { label: 'はい', value: 'adj_entry_month_yes', points: 1 },
    ],
  },
];

// ---------------------------------------------------------------------------
// エクスポート
// ---------------------------------------------------------------------------

export const moriyaData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
