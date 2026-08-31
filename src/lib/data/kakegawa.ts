import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 令和8年度 掛川市保育所等入所選考基準表
//
// 出典: 掛川市「令和8年度 保育園等入園案内」15〜16ページ
//       「令和8年度 掛川市保育所等入所選考基準表」
//       https://www.city.kakegawa.shizuoka.jp/fs/6/2/5/7/8/9/_/__8___________.pdf
//       （令和8年度 保育園等の入園・転園・退園手続き
//         https://www.city.kakegawa.shizuoka.jp/kakekko/docs/960179.html
//         からリンクされている入園案内PDF）
//
// 2026-08-31: 従来のデータは他自治体と同じ点数配列のテンプレート（推定値）だったため、
// 上記の公式基準表を読み取って全面的に置き換えた。
// 2026-08-19 の一斉置き換えでは市サイトを取得できず failed にしていたが、今回は取得できた。
// なお入園案内PDFは全24ページとも画像で、テキスト抽出では1文字も取れない。
// 該当ページを400dpiで画像化して読み取った。
//
// ## 計算方式
// 指数合計 ＝ （1）保育の実施基準表（基準点） ＋ （2）調整指数表
// 基準点数については、**1〜7のうち一番点数の高い項目を父母ともにひとつずつ選択**する。
// 父母各最大20点なので maxBasePoints は 40。
//
// ## （1）保育の実施基準表（基準点）※父／母
// 1 就労 … 月150時間以上の就労を常態としている 20／月140時間以上 19／月120時間以上 18／
//   月100時間以上 17／月80時間以上 16／月64時間以上 15／
//   内職（月64時間以上の就労を常態としている）14
// 2 出産 … 出産（予定）月の3か月前から出産後3か月である場合 父ー／母16
// 3 疾病・障がい
//   （疾病）1か月以上の入院もしくは入院見込み、常時臥床 20／
//     居宅療養（1ヶ月以上）で安静を要すると診断された場合または日常生活動作に
//     支障をきたしている場合 20／上記以外で通院加療が必要な場合 18
//   （障がい）「身体障害者手帳1〜2級所持」「聴覚障害者1〜3級所持」
//     「精神障害者保健福祉手帳所持」「療育手帳A所持」「介護保険の要介護度が3〜5」の
//     いずれかに該当する場合 20／
//     「身体障害者手帳3級所持」「聴覚障害者4級所持」「療育手帳B所持」
//     「介護保険の要介護度が1〜2」のいずれかに該当する場合 17／
//     「身体障害者手帳4〜6級所持」「介護保険の要介護度が要支援」のいずれかに該当する場合 15
// 4 親族の介護・看護 … 病院等の指示により、1か月以上の付き添いが必要な場合 20／
//   身体障害者手帳1〜2級、療育手帳A、精神障害者保健福祉手帳1級、難病指定による病気、
//   要介護3〜5の親族の常時介護・看護または施設通所の付き添いにより家庭保育が困難な場合 18／
//   身体障害者手帳3級、療育手帳B、精神障害者保健福祉手帳2〜3級、要介護1〜2の親族の
//   常時介護・看護または施設通所の付き添いにより家庭保育が困難な場合 16／
//   上記以外の親族の常時介護・看護または施設通所の付き添いにより家庭保育が困難な場合 15
// 5 災害 … 災害等による家屋の損傷、その他災害復旧のため、保育することができない場合 20
// 6 求職中 … 求職中の場合 10
// 7 その他 … 就学等（日中、就学・技能修得等のため、保育することができない場合）は区分1を適用／
//   不在等（死亡、離婚、行方不明、別居、拘禁等）20／
//   各号に掲げるもののほか、明らかに保育することができないと認められる場合は区分1〜6を準用
//
// ## （2）調整指数表
// 【福祉的配慮】
//  1 ひとり親世帯等：利用希望児童が母または父のみに養育されている場合（親族等非同居）15
//  2 同（親族等同居）5
//  3 父母の一人が単身赴任（県外もしくは富士市以東）、3か月以上の入院などにより
//    不在の場合（親族等非同居）7
//  4 障がい：保護者が身体障害者手帳1・2級、または療育手帳A〜C、
//    精神障害者保健福祉手帳1〜3級を所持している場合 10
//  5 保護者が身体障害者手帳3級を所持している場合 5
//  6 同一世帯に身体障害者手帳1〜3級、または療育手帳A〜C、精神障害者保健福祉手帳1〜3級を
//    所持している者がいる場合（保護者及び入所申込児童を除く）3
//  7 利用希望児童が障がいを有する場合（障がいに係る手帳の交付や特別児童扶養手当を
//    受給している場合に限る）3
//  8 生活保護世帯：経済的自立のため緊急に就労を要する場合 15
//  9 その他：児童福祉等の観点から特に調整が必要とされた場合（要保護児童など）20
// 【養育環境的配慮】
// 10 継続児童：地域型保育事業所の卒園児 12
// 11 認可外保育施設（居宅訪問型を除く）の卒園児 10
// 12 市内認可外保育施設の閉鎖または認可施設への移行により、他の保育施設
//    （認可施設への移行の場合は同保育施設に限る。）への入所を希望する場合（掛川市民に限る。）5
// 13 兄弟姉妹の入所：入所希望日時点において兄弟姉妹が保育所等に入所中の場合 10
// 14 入所希望日時点において兄弟姉妹が幼稚園預かり利用者・認可外施設利用者の場合 5
// 15 入所希望日時点において兄弟姉妹同時申込の場合 5
// 16 多子世帯：子どもの数が2人以上の場合 2人 2／3人以上 4
// 17 保育士等：掛川市内園の保育士等の子どもの利用（幼稚園教諭を含む。看護師が保育士の
//    一員として勤務する場合も含む）実労働時間が月120時間以上の場合 25
// 18 同 実労働時間が月120時間未満の場合 10
// 19 掛川市外園の保育士等の子どもの利用（幼稚園教諭を含む。看護師が保育士の一員として
//    勤務する場合も含む）3
// 20 他施設での保育：協働保育園等に預けている場合（類型11に該当する場合を除く）3
// 21 祖父母：両祖父母全員が次のいずれかに該当する場合 3
//    ・県外もしくは富士市以東に在住している場合（不在含む）
//    ・75歳以上
//    ・身体障害者手帳1〜3級、療育手帳A〜C、精神障害者保健福祉手帳1〜3級、
//      要介護度3〜5級を所持している
// 【減点】
// 22 未申請児：兄弟姉妹を親族が保育している場合（保護者が就労中に児童を保育している場合を含む）マイナス5
// 23 同居祖父母：65歳未満の祖父母で基準表の区分1〜5、7に該当しない場合 各 マイナス5
// 24 広域入所：市外在住者（転入予定者・市内保育所等の保育士の場合を除く）マイナス20
// 25 育児休業：「希望する保育所等に入所できない場合は、育児休業の延長も許容できる」を
//    選択した場合 マイナス20
// 26 保育料未納世帯：未納の保育料が3か月分以上あり、かつ納付の相談がない場合または
//    未納保育料の納付約束を履行しない場合 マイナス50
// 27 内定辞退：正当な理由なく希望保育施設の入園内定を辞退するなど、公正な選考に支障を
//    来たす様な行為を行った場合（同一年度内の入園申込期間中に限る）マイナス10
//
// ## （3）保育の実施基準表と調整指数表の合計が同点の場合の優先順位
// 第1段階 保育の実施基準表の指数が高い世帯を優先する
// 第2段階 調整指数表において「福祉的配慮＞養育環境的配慮」の順に優先する（減点は除く）
// 第3段階 保育の実施基準表の項目別に優先する
//   （1）不存在（2）災害（3）疾病・障がい（4）就労（5）親族の介護・看護（6）出産（7）就学（8）求職
// 第4段階 希望する保育園に兄弟姉妹が在園している世帯を優先する
//   （ただし、新年度申込の場合は、新年度に就学する児童は除く）
// 第5段階 市民税額の低い世帯を優先する
// ※指数により優先順位を審査した上で、希望保育所等の判断により調整決定を行います。
//
// ## 質問に入れなかった規定
// - 基準表7「各号に掲げるもののほか、明らかに保育することができないと認められる場合」は
//   「区分1〜6を準用」で点数が定まらないため
// - （3）の優先順位は同点時のタイブレークであり指数ではないため
// ---------------------------------------------------------------------------

const municipality = {
  id: 'kakegawa',
  name: '掛川市',
  slug: 'kakegawa',
  prefecture: '静岡県',
  maxBasePoints: 40, // 父母各20点
} as const;

// ---------------------------------------------------------------------------
// （1）保育の実施基準表の選択肢（父母各最大20点）
// ---------------------------------------------------------------------------

/** 1 就労 */
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月150時間以上の就労を常態としている', value: `${prefix}_employment_20`, points: 20 },
  { label: '月140時間以上の就労を常態としている', value: `${prefix}_employment_19`, points: 19 },
  { label: '月120時間以上の就労を常態としている', value: `${prefix}_employment_18`, points: 18 },
  { label: '月100時間以上の就労を常態としている', value: `${prefix}_employment_17`, points: 17 },
  { label: '月80時間以上の就労を常態としている', value: `${prefix}_employment_16`, points: 16 },
  { label: '月64時間以上の就労を常態としている', value: `${prefix}_employment_15`, points: 15 },
  { label: '内職（月64時間以上の就労を常態としている）', value: `${prefix}_employment_14`, points: 14 },
];

/** 2 出産 */
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  {
    label: '出産（予定）月の3か月前から出産後3か月である',
    value: `${prefix}_childbirth_16`,
    points: 16,
  },
];

/** 3 疾病・障がい（疾病） */
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '1か月以上の入院もしくは入院見込み、常時臥床', value: `${prefix}_illness_20`, points: 20 },
  {
    label: '居宅療養（1ヶ月以上）：安静を要すると診断された、または日常生活動作に支障をきたしている',
    value: `${prefix}_illness_20b`,
    points: 20,
  },
  { label: '居宅療養（1ヶ月以上）：上記以外で通院加療が必要', value: `${prefix}_illness_18`, points: 18 },
];

/** 3 疾病・障がい（障がい） */
const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  {
    label:
      '身体障害者手帳1〜2級所持、聴覚障害者1〜3級所持、精神障害者保健福祉手帳所持、療育手帳A所持、介護保険の要介護度が3〜5のいずれか',
    value: `${prefix}_disability_20`,
    points: 20,
  },
  {
    label:
      '身体障害者手帳3級所持、聴覚障害者4級所持、療育手帳B所持、介護保険の要介護度が1〜2のいずれか',
    value: `${prefix}_disability_17`,
    points: 17,
  },
  {
    label: '身体障害者手帳4〜6級所持、介護保険の要介護度が要支援のいずれか',
    value: `${prefix}_disability_15`,
    points: 15,
  },
];

/** 4 親族の介護・看護 */
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  {
    label: '病院等の指示により、1か月以上の付き添いが必要',
    value: `${prefix}_care_20`,
    points: 20,
  },
  {
    label:
      '身体障害者手帳1〜2級、療育手帳A、精神障害者保健福祉手帳1級、難病指定による病気、要介護3〜5の親族の常時介護・看護または施設通所の付き添い',
    value: `${prefix}_care_18`,
    points: 18,
  },
  {
    label:
      '身体障害者手帳3級、療育手帳B、精神障害者保健福祉手帳2〜3級、要介護1〜2の親族の常時介護・看護または施設通所の付き添い',
    value: `${prefix}_care_16`,
    points: 16,
  },
  {
    label: '上記以外の親族の常時介護・看護または施設通所の付き添いにより家庭保育が困難',
    value: `${prefix}_care_15`,
    points: 15,
  },
];

/** 5 災害 */
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  {
    label: '災害等による家屋の損傷、その他災害復旧のため、保育することができない',
    value: `${prefix}_disaster_20`,
    points: 20,
  },
];

/** 6 求職中 */
const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職中', value: `${prefix}_jobseeking_10`, points: 10 },
];

/** 7 その他（就学等は区分1を適用） */
const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '就学・技能修得等：月150時間以上', value: `${prefix}_education_20`, points: 20 },
  { label: '就学・技能修得等：月140時間以上', value: `${prefix}_education_19`, points: 19 },
  { label: '就学・技能修得等：月120時間以上', value: `${prefix}_education_18`, points: 18 },
  { label: '就学・技能修得等：月100時間以上', value: `${prefix}_education_17`, points: 17 },
  { label: '就学・技能修得等：月80時間以上', value: `${prefix}_education_16`, points: 16 },
  { label: '就学・技能修得等：月64時間以上', value: `${prefix}_education_15`, points: 15 },
];

/** 7 その他（不在等） */
const absentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_absent_none`, points: 0 },
  { label: '死亡、離婚、行方不明、別居、拘禁等', value: `${prefix}_absent_20`, points: 20 },
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
    label: `${parentLabel}：保育の実施基準の区分`,
    helpText: '1〜7のうち一番点数の高い項目を父母ともにひとつずつ選びます',
    inputType: 'select',
    options: [
      { label: '就労', value: `${prefix}_reason_employment`, points: 0 },
      { label: '出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '疾病', value: `${prefix}_reason_illness`, points: 0 },
      { label: '障がい', value: `${prefix}_reason_disability`, points: 0 },
      { label: '親族の介護・看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '災害', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '求職中', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '就学・技能修得等', value: `${prefix}_reason_education`, points: 0 },
      { label: '不在等（死亡・離婚・行方不明・別居・拘禁等）', value: `${prefix}_reason_absent`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}はどのくらい働いていますか？`,
      inputType: 'radio',
      options: employmentOptions(prefix),
    },
    {
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}は出産の前後ですか？`,
      helpText: '基準指数がつくのは母のみです（原典の父の欄は斜線）',
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
      label: `${parentLabel}の障がいの状況は？`,
      inputType: 'radio',
      options: disabilityOptions(prefix),
    },
    {
      id: `${prefix}_care`,
      category,
      label: `${parentLabel}の親族の介護・看護の状況は？`,
      inputType: 'radio',
      options: careOptions(prefix),
    },
    {
      id: `${prefix}_disaster`,
      category,
      label: `${parentLabel}は災害復旧のため保育できませんか？`,
      inputType: 'radio',
      options: disasterOptions(prefix),
    },
    {
      id: `${prefix}_jobseeking`,
      category,
      label: `${parentLabel}は求職中ですか？`,
      inputType: 'radio',
      options: jobSeekingOptions(prefix),
    },
    {
      id: `${prefix}_education`,
      category,
      label: `${parentLabel}はどのくらい就学・技能修得をしていますか？`,
      helpText: '就学等は区分1（就労）の指数を適用します',
      inputType: 'radio',
      options: educationOptions(prefix),
    },
    {
      id: `${prefix}_absent`,
      category,
      label: `${parentLabel}は不在ですか？`,
      inputType: 'radio',
      options: absentOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// ---------------------------------------------------------------------------
// （2）調整指数表（世帯単位）の質問
// ---------------------------------------------------------------------------

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親世帯等に該当しますか？',
    inputType: 'select',
    options: [
      { label: 'あてはまらない', value: 'adj_single_parent_none', points: 0 },
      {
        label: '利用希望児童が母または父のみに養育されている（親族等非同居）',
        value: 'adj_single_parent_15',
        points: 15,
      },
      {
        label: '利用希望児童が母または父のみに養育されている（親族等同居）',
        value: 'adj_single_parent_5',
        points: 5,
      },
      {
        label: '父母の一人が単身赴任（県外もしくは富士市以東）、3か月以上の入院などにより不在（親族等非同居）',
        value: 'adj_single_parent_7',
        points: 7,
      },
    ],
  },
  {
    id: 'adj_parent_disability',
    category: 'adjustment',
    label: '保護者の障がいの状況は？',
    inputType: 'select',
    options: [
      { label: 'あてはまらない', value: 'adj_parent_disability_none', points: 0 },
      {
        label: '身体障害者手帳1・2級、療育手帳A〜C、精神障害者保健福祉手帳1〜3級を所持している',
        value: 'adj_parent_disability_10',
        points: 10,
      },
      { label: '身体障害者手帳3級を所持している', value: 'adj_parent_disability_5', points: 5 },
    ],
  },
  {
    id: 'adj_household_disability',
    category: 'adjustment',
    label: '同一世帯に手帳を所持している人がいますか？',
    helpText:
      '身体障害者手帳1〜3級、療育手帳A〜C、精神障害者保健福祉手帳1〜3級。保護者および入所申込児童は除きます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_household_disability_no', points: 0 },
      { label: 'はい', value: 'adj_household_disability_yes', points: 3 },
    ],
  },
  {
    id: 'adj_child_disability',
    category: 'adjustment',
    label: '利用希望児童が障がいを有していますか？',
    helpText: '障がいに係る手帳の交付や特別児童扶養手当を受給している場合に限ります',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_child_disability_no', points: 0 },
      { label: 'はい', value: 'adj_child_disability_yes', points: 3 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯で、経済的自立のため緊急に就労を要しますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい', value: 'adj_welfare_yes', points: 15 },
    ],
  },
  {
    id: 'adj_social_care',
    category: 'adjustment',
    label: '児童福祉等の観点から特に調整が必要とされていますか？',
    helpText: '要保護児童などが対象です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_social_care_no', points: 0 },
      { label: 'はい', value: 'adj_social_care_yes', points: 20 },
    ],
  },
  {
    id: 'adj_continuing',
    category: 'adjustment',
    label: '継続児童に該当しますか？',
    inputType: 'select',
    options: [
      { label: 'あてはまらない', value: 'adj_continuing_none', points: 0 },
      { label: '地域型保育事業所の卒園児', value: 'adj_continuing_12', points: 12 },
      { label: '認可外保育施設（居宅訪問型を除く）の卒園児', value: 'adj_continuing_10', points: 10 },
      {
        label:
          '市内認可外保育施設の閉鎖または認可施設への移行により、他の保育施設への入所を希望する（掛川市民に限る）',
        value: 'adj_continuing_5',
        points: 5,
      },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: '入所希望日時点の兄弟姉妹の状況は？',
    inputType: 'select',
    options: [
      { label: 'あてはまらない', value: 'adj_sibling_none', points: 0 },
      { label: '兄弟姉妹が保育所等に入所中', value: 'adj_sibling_10', points: 10 },
      {
        label: '兄弟姉妹が幼稚園預かり利用者・認可外施設利用者',
        value: 'adj_sibling_5a',
        points: 5,
      },
      { label: '兄弟姉妹同時申込', value: 'adj_sibling_5b', points: 5 },
    ],
  },
  {
    id: 'adj_many_children',
    category: 'adjustment',
    label: '子どもの数は何人ですか？',
    inputType: 'select',
    options: [
      { label: '1人', value: 'adj_many_children_1', points: 0 },
      { label: '2人', value: 'adj_many_children_2', points: 2 },
      { label: '3人以上', value: 'adj_many_children_3', points: 4 },
    ],
  },
  {
    id: 'adj_hoikushi',
    category: 'adjustment',
    label: '保育士等の子どもの利用ですか？',
    helpText: '幼稚園教諭を含みます。看護師が保育士の一員として勤務する場合も含みます',
    inputType: 'select',
    options: [
      { label: 'あてはまらない', value: 'adj_hoikushi_none', points: 0 },
      { label: '掛川市内園の保育士等（実労働時間が月120時間以上）', value: 'adj_hoikushi_25', points: 25 },
      { label: '掛川市内園の保育士等（実労働時間が月120時間未満）', value: 'adj_hoikushi_10', points: 10 },
      { label: '掛川市外園の保育士等', value: 'adj_hoikushi_3', points: 3 },
    ],
  },
  {
    id: 'adj_kyodo',
    category: 'adjustment',
    label: '協働保育園等に預けていますか？',
    helpText: '認可外保育施設（居宅訪問型を除く）の卒園児に該当する場合は除きます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_kyodo_no', points: 0 },
      { label: 'はい', value: 'adj_kyodo_yes', points: 3 },
    ],
  },
  {
    id: 'adj_grandparent_away',
    category: 'adjustment',
    label: '両祖父母全員が、県外もしくは富士市以東に在住・75歳以上・手帳所持等のいずれかに該当しますか？',
    helpText:
      '在住は不在を含みます。手帳は身体障害者手帳1〜3級、療育手帳A〜C、精神障害者保健福祉手帳1〜3級、要介護度3〜5級が対象です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_grandparent_away_no', points: 0 },
      { label: 'はい', value: 'adj_grandparent_away_yes', points: 3 },
    ],
  },
  {
    id: 'adj_unapplied',
    category: 'adjustment',
    label: '兄弟姉妹を親族が保育していますか？',
    helpText: '保護者が就労中に児童を保育している場合を含みます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unapplied_no', points: 0 },
      { label: 'はい', value: 'adj_unapplied_yes', points: -5 },
    ],
  },
  {
    id: 'adj_grandparent_live',
    category: 'adjustment',
    label: '65歳未満で、保育の実施基準表の区分1〜5・7に該当しない同居祖父母はいますか？',
    helpText: '1人につきマイナス5点です',
    inputType: 'select',
    options: [
      { label: 'いない', value: 'adj_grandparent_live_0', points: 0 },
      { label: '1人', value: 'adj_grandparent_live_1', points: -5 },
      { label: '2人以上', value: 'adj_grandparent_live_2', points: -10 },
    ],
  },
  {
    id: 'adj_outside_resident',
    category: 'adjustment',
    label: '市外在住者ですか？',
    helpText: '転入予定者、市内保育所等の保育士の場合は除きます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_outside_resident_no', points: 0 },
      { label: 'はい', value: 'adj_outside_resident_yes', points: -20 },
    ],
  },
  {
    id: 'adj_leave_extension',
    category: 'adjustment',
    label: '「入所できない場合は育児休業の延長も許容できる」を選択しますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_leave_extension_no', points: 0 },
      { label: 'はい', value: 'adj_leave_extension_yes', points: -20 },
    ],
  },
  {
    id: 'adj_unpaid_fee',
    category: 'adjustment',
    label: '保育料の未納がありますか？',
    helpText: '未納が3か月分以上あり、かつ納付の相談がない場合、または納付約束を履行しない場合に減点されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_unpaid_fee_no', points: 0 },
      { label: 'はい', value: 'adj_unpaid_fee_yes', points: -50 },
    ],
  },
  {
    id: 'adj_decline',
    category: 'adjustment',
    label: '正当な理由なく入園内定を辞退したことがありますか？',
    helpText: '同一年度内の入園申込期間中に限ります',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_decline_no', points: 0 },
      { label: 'はい', value: 'adj_decline_yes', points: -10 },
    ],
  },
];

// ---------------------------------------------------------------------------
// エクスポート
// ---------------------------------------------------------------------------

export const kakegawaData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
