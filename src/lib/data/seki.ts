import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 関市 利用調整表（基本点・調整点）
//
// 出典: 関市「利用調整表（R7.9.1〜）」
//       https://www.city.seki.lg.jp/cmsfiles/contents/0000018/18624/riyoucyousei.pdf
//       （令和8年度5月〜3月新規入園
//         https://www.city.seki.lg.jp/0000018624.html からリンクされている単独PDF）
//
// 2026-08-31: 従来のデータは他自治体と同じ点数配列のテンプレート（推定値）だったため、
// 上記の公式の利用調整表を読み取って全面的に置き換えた。
// 2026-08-19 の一斉置き換えでは「令和8年度保育施設入園案内PDF（9ページ）に
// 指数・点数の記載が無い」として failed にしていたが、
// **入園案内とは別に「利用調整表」という単独PDFが月次の新規入園ページに置かれている**。
//
// ## 計算方式（原典の注記）
// 「基本点＋調整点の高い順に優先順位が高いものとする。同点の場合、基本点が高い方が
//   優先順位が高いものとする。それ以降は、兄弟がすでに入園している、ひとり親世帯、
//   兄弟同時申請の順に決定し、決まらない場合抽選とする。」
// 基本点は父母各最大30点（保育士・幼稚園教諭）なので maxBasePoints は 60。
//
// ## 基本点
// ① 保育士・幼稚園教諭 … 市内保育園等又は幼稚園で月140時間以上就労する者
//    （正社員、パート等に関わらない）30
// ② 就労（内職を除く）
//    外勤（従事者の労働時間）… 月140時間以上 10／月100時間以上 8／月60時間以上 5
//      （いずれも正社員、パート等に関わらない）
//    自営業 … 本人（主たる従事者＝自営業主）10／
//      家族（主たる従事者への協力者＝自営業専従者・家族従業者）7
// ③ 出産・疾病
//    出産 … 出産予定月＋前後2ヶ月 8
//    疾病 入院 … 長期間の入院 10
//    疾病 常時臥床 … 医師に長期加療が必要と診断された者 10
//    疾病 居宅療養（精神疾病）… 医師に長期加療が必要と診断された者 5
//    疾病 居宅療養（上記以外）… 医師に長期加療が必要と診断された者 4
//    手帳取得 … 身体1,2・療育A・精神1 10／身体3・療育B・精神2,3 5／上記以外 4
//      （いずれも身体障害者手帳等を所持する者）
// ④ 傷病人の看護等
//    入院の付き添い … 長期間入院の付き添いに常時あたっている者 6
//    居宅内看護 … 家族の居宅内看護に長期間にわたり常時当たっている者 5
//    居宅外看護 … 家族の居宅外看護に長期間にわたり常時当たっている者 4
//    心身障害児看護（身体障害児（手帳取得）の介護、通院、通園、通学等にあたっている者）…
//      全介助 8／1,2級 6／3級 5／4級以外 4
// ⑤ 災害復旧 … 災害等で損失した居宅等の復旧にあたる場合 10
// ⑥ 就学・技能取得 … 就学・技能取得のため保育にあたれない場合 6
// ⑦ 育児休業 … 年少以上児で当該年度内に復帰予定である者に限る 5
// ⑧ 内職 … メーカー、問屋等と契約し、自宅において物品の製造や各種作業を代行等に
//    従事する者 4
// ⑨ 求職活動 … 求職中 3
//
// ## ⑩ 調整点
// 世帯事情
//   母子・父子家庭 … 児童扶養手当認定者又は母子家庭等福祉医療受給者、
//     父子家庭福祉医療受給者に該当する場合（基本点10＋調整点4）＋14
//   虐待・DV等 … 支援措置家庭 ＋2
//   生活保護家庭 ＋2
// 雇用形態
//   正社員 … 事業所に正規雇用されており通年に渡り安定して就労状態にある者（派遣を除く）＋2
//   育休復帰世帯 … 入園月内に育児休業から明け、父母ともに就労となる世帯に限る ＋2
// 保育士・幼稚園教諭 … 上記①以外の場合 ＋5
// 小規模保育所の卒園児 … 小規模保育所の卒園児が当該小規模保育所の連携保育施設への
//   入園を希望する場合 ＋2
// 兄弟姉妹 … 兄弟姉妹が同じ園に在園している ＋2／
//   申込児童以外に家庭内保育をしている児童がいる場合（上記④の対象となる兄弟姉妹を除く）マイナス2
//
// ## 原典の注記
// 1 自営業を営む方は、事業内容を証明する客観的資料（確定申告書、営業許可証、
//   個人事業の開廃業等届出書の写し等）の提出を求める。
// 2 自営業の本人とは、本人の収入が生計の中心とみなせる場合とする。生計中心とは、
//   本人の収入で生計が成り立つかどうか、家族の中で最も収入が多い場合または
//   家計の主宰者になりうるかによって判断する。
// ※関市の施策（統廃合等）により転園させられる場合は、上記に限らず最優先となる。
// ※入園基準は年度途中で改正する場合もある。
//
// ## 質問に入れなかった規定
// - 「関市の施策（統廃合等）により転園させられる場合は最優先」は点数ではなく最優先扱いのため
// ---------------------------------------------------------------------------

const municipality = {
  id: 'seki',
  name: '関市',
  slug: 'seki',
  prefecture: '岐阜県',
  maxBasePoints: 60, // 父母各30点（保育士・幼稚園教諭）
} as const;

// ---------------------------------------------------------------------------
// 基本点の選択肢（父母各最大30点）
// ---------------------------------------------------------------------------

/** ① 保育士・幼稚園教諭 */
const hoikushiOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_hoikushi_none`, points: 0 },
  {
    label: '市内保育園等または幼稚園で月140時間以上就労している（正社員、パート等に関わらない）',
    value: `${prefix}_hoikushi_30`,
    points: 30,
  },
];

/** ② 就労（内職を除く） */
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '外勤：月140時間以上', value: `${prefix}_employment_gaikin_10`, points: 10 },
  { label: '外勤：月100時間以上', value: `${prefix}_employment_gaikin_8`, points: 8 },
  { label: '外勤：月60時間以上', value: `${prefix}_employment_gaikin_5`, points: 5 },
  { label: '自営業（本人・主たる従事者）', value: `${prefix}_employment_jiei_10`, points: 10 },
  {
    label: '自営業（家族・主たる従事者への協力者、自営業専従者・家族従業者）',
    value: `${prefix}_employment_jiei_7`,
    points: 7,
  },
];

/** ③ 出産 */
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産予定月＋前後2ヶ月', value: `${prefix}_childbirth_8`, points: 8 },
];

/** ③ 疾病 */
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院（長期間の入院）', value: `${prefix}_illness_10a`, points: 10 },
  {
    label: '常時臥床（医師に長期加療が必要と診断された）',
    value: `${prefix}_illness_10b`,
    points: 10,
  },
  {
    label: '居宅療養・精神疾病（医師に長期加療が必要と診断された）',
    value: `${prefix}_illness_5`,
    points: 5,
  },
  {
    label: '居宅療養・上記以外（医師に長期加療が必要と診断された）',
    value: `${prefix}_illness_4`,
    points: 4,
  },
];

/** ③ 手帳取得 */
const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '身体1・2級、療育A、精神1級', value: `${prefix}_disability_10`, points: 10 },
  { label: '身体3級、療育B、精神2・3級', value: `${prefix}_disability_5`, points: 5 },
  { label: '上記以外の手帳を所持している', value: `${prefix}_disability_4`, points: 4 },
];

/** ④ 傷病人の看護等 */
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  {
    label: '心身障害児看護：全介助',
    value: `${prefix}_care_shinshin_8`,
    points: 8,
  },
  {
    label: '入院の付き添い（長期間入院の付き添いに常時あたっている）',
    value: `${prefix}_care_tsukisoi_6`,
    points: 6,
  },
  { label: '心身障害児看護：1・2級', value: `${prefix}_care_shinshin_6`, points: 6 },
  {
    label: '居宅内看護（家族の居宅内看護に長期間にわたり常時当たっている）',
    value: `${prefix}_care_home_5`,
    points: 5,
  },
  { label: '心身障害児看護：3級', value: `${prefix}_care_shinshin_5`, points: 5 },
  {
    label: '居宅外看護（家族の居宅外看護に長期間にわたり常時当たっている）',
    value: `${prefix}_care_out_4`,
    points: 4,
  },
  { label: '心身障害児看護：4級以外', value: `${prefix}_care_shinshin_4`, points: 4 },
];

/** ⑤ 災害復旧 */
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '災害等で損失した居宅等の復旧にあたっている', value: `${prefix}_disaster_10`, points: 10 },
];

/** ⑥ 就学・技能取得 */
const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '就学・技能取得のため保育にあたれない', value: `${prefix}_education_6`, points: 6 },
];

/** ⑦ 育児休業 */
const parentalLeaveOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_parental_leave_none`, points: 0 },
  {
    label: '育児休業中（年少以上児で当該年度内に復帰予定である場合に限る）',
    value: `${prefix}_parental_leave_5`,
    points: 5,
  },
];

/** ⑧ 内職 */
const naishokuOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_naishoku_none`, points: 0 },
  {
    label: 'メーカー、問屋等と契約し、自宅で物品の製造や各種作業の代行等に従事している',
    value: `${prefix}_naishoku_4`,
    points: 4,
  },
];

/** ⑨ 求職活動 */
const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職中', value: `${prefix}_jobseeking_3`, points: 3 },
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
    label: `${parentLabel}：保育が必要な類型`,
    helpText: 'いちばん近いものをひとつ選んでください',
    inputType: 'select',
    options: [
      { label: '保育士・幼稚園教諭として市内で就労している', value: `${prefix}_reason_hoikushi`, points: 0 },
      { label: '就労（内職を除く）', value: `${prefix}_reason_employment`, points: 0 },
      { label: '出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '疾病', value: `${prefix}_reason_illness`, points: 0 },
      { label: '障害者手帳等を取得している', value: `${prefix}_reason_disability`, points: 0 },
      { label: '傷病人の看護等', value: `${prefix}_reason_care`, points: 0 },
      { label: '災害復旧', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '就学・技能取得', value: `${prefix}_reason_education`, points: 0 },
      { label: '育児休業', value: `${prefix}_reason_parental_leave`, points: 0 },
      { label: '内職', value: `${prefix}_reason_naishoku`, points: 0 },
      { label: '求職活動', value: `${prefix}_reason_jobseeking`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_hoikushi`,
      category,
      label: `${parentLabel}は市内の保育園等・幼稚園で働いていますか？`,
      inputType: 'radio',
      options: hoikushiOptions(prefix),
    },
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の就労状況は？`,
      helpText:
        '自営業は、事業内容を証明する客観的資料（確定申告書、営業許可証、個人事業の開廃業等届出書の写し等）の提出を求められます',
      inputType: 'radio',
      options: employmentOptions(prefix),
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
      label: `${parentLabel}の疾病の状況は？`,
      inputType: 'radio',
      options: illnessOptions(prefix),
    },
    {
      id: `${prefix}_disability`,
      category,
      label: `${parentLabel}の手帳の等級は？`,
      inputType: 'radio',
      options: disabilityOptions(prefix),
    },
    {
      id: `${prefix}_care`,
      category,
      label: `${parentLabel}の看護・付き添いの状況は？`,
      inputType: 'radio',
      options: careOptions(prefix),
    },
    {
      id: `${prefix}_disaster`,
      category,
      label: `${parentLabel}は災害復旧にあたっていますか？`,
      inputType: 'radio',
      options: disasterOptions(prefix),
    },
    {
      id: `${prefix}_education`,
      category,
      label: `${parentLabel}は就学・技能取得をしていますか？`,
      inputType: 'radio',
      options: educationOptions(prefix),
    },
    {
      id: `${prefix}_parental_leave`,
      category,
      label: `${parentLabel}は育児休業中ですか？`,
      inputType: 'radio',
      options: parentalLeaveOptions(prefix),
    },
    {
      id: `${prefix}_naishoku`,
      category,
      label: `${parentLabel}は内職をしていますか？`,
      inputType: 'radio',
      options: naishokuOptions(prefix),
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
// ⑩ 調整点（世帯単位）の質問
// ---------------------------------------------------------------------------

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: '母子・父子家庭ですか？',
    helpText:
      '児童扶養手当認定者、母子家庭等福祉医療受給者、父子家庭福祉医療受給者に該当する場合が対象です（基本点10＋調整点4で14点）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい', value: 'adj_single_parent_yes', points: 14 },
    ],
  },
  {
    id: 'adj_abuse',
    category: 'adjustment',
    label: '虐待・DV等の支援措置家庭ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_abuse_no', points: 0 },
      { label: 'はい', value: 'adj_abuse_yes', points: 2 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護家庭ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい', value: 'adj_welfare_yes', points: 2 },
    ],
  },
  {
    id: 'adj_seishain',
    category: 'adjustment',
    label: '正社員として働いていますか？',
    helpText: '事業所に正規雇用されており、通年にわたり安定して就労状態にある人が対象です（派遣を除く）',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_seishain_no', points: 0 },
      { label: 'はい', value: 'adj_seishain_yes', points: 2 },
    ],
  },
  {
    id: 'adj_leave_return',
    category: 'adjustment',
    label: '育休復帰世帯ですか？',
    helpText: '入園月内に育児休業から明け、父母ともに就労となる世帯に限ります',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_leave_return_no', points: 0 },
      { label: 'はい', value: 'adj_leave_return_yes', points: 2 },
    ],
  },
  {
    id: 'adj_hoikushi_other',
    category: 'adjustment',
    label: '保育士・幼稚園教諭ですか？（基本点の対象外の場合）',
    helpText: '基本点①（市内で月140時間以上就労）に該当しない場合の加点です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_hoikushi_other_no', points: 0 },
      { label: 'はい', value: 'adj_hoikushi_other_yes', points: 5 },
    ],
  },
  {
    id: 'adj_shokibo_graduate',
    category: 'adjustment',
    label: '小規模保育所の卒園児が、その連携保育施設への入園を希望しますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_shokibo_graduate_no', points: 0 },
      { label: 'はい', value: 'adj_shokibo_graduate_yes', points: 2 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: 'きょうだいの状況は？',
    inputType: 'select',
    options: [
      { label: 'あてはまらない', value: 'adj_sibling_none', points: 0 },
      { label: '兄弟姉妹が同じ園に在園している', value: 'adj_sibling_enrolled', points: 2 },
      {
        label: '申込児童以外に家庭内保育をしている児童がいる（傷病人の看護等の対象となる兄弟姉妹を除く）',
        value: 'adj_sibling_home',
        points: -2,
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// エクスポート
// ---------------------------------------------------------------------------

export const sekiData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
