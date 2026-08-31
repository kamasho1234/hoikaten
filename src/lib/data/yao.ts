import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 八尾市 保育所（園）・認定こども園・小規模保育施設 入所 基本指数・調整指数データ
//
// 出典: 八尾市「令和8年度 保育利用あんない」11〜13ページ
//       「11 利用調整（選考）基準について」「利用調整（選考）基準表」
//       https://www.city.yao.osaka.jp/_res/projects/default_project/_page_/001/020/314/508riyouannnai.pdf
//       （令和8年度申込みページからリンク:
//        https://www.city.yao.osaka.jp/kosodate_kyouiku/ninteikodomoen_hoikusho/1003996/1020314.html ）
//
// 2026-08-31: 従来のデータは他自治体と同じ点数配列のテンプレート（推定値）だったため、
// 上記の公式基準表を読み取って全面的に置き換えた。
//
// **市の案内ページにある「選考基準について（外部リンク）」はCanvaの1分7秒の動画**で、
// 表としては読めない。基準表そのものは「令和8年度保育利用あんない」PDFの11〜13ページにある。
// 前回（2026-08-19）はCanvaだけを見て failed にしていた。
//
// ## 計算方式
// **scoringMethod: 'min'**（保護者の低い方を採用）
// 原典: 「保護者（父・母等）それぞれの状況に基づいて指数をつけ、**そのうちの低い方を使用します**」
// 基本指数は父母各最大80点。
//
// ## 原典の注意点
// - 「基本指数は重複しません。保護者それぞれに２つ以上の事由があった場合、高い方の基本指数とします。
//   （例：父：就労60点・疾病45点⇒就労60点）」
// - 「入所基準日が、出産予定日を基準として計算し、産前8週（多胎妊娠は産前14週）・産後8週に該当する
//   場合、**他の事由があっても「妊娠・出産」の事由での利用調整（選考）となります**」
//   → 妊娠・出産は10点しかないため、産前産後に当たると大きく下がる。質問の helpText に書いた
// - 「育児休業期間中の方の場合は、入所日から1か月以内に育児休業を終了し、復職できる場合に
//   入所の対象となります」
// - 「希望順位にかかわらず、保育を必要とする事由の高い方から選考します。
//   第1希望のみの希望が有利ということはありません」
// - 「3歳児以上の子どもが障がいを有する場合は、別に保育サポート（障がい児保育)入所枠を
//   設定しています」
// - **就労と就労予定（内定）は同じ点数**（70/60/50/40/30）。ただし調整指数で
//   「申込み時点で就労実績がある」+2 が就労側にだけ付く
//
// ## 質問に入れなかった規定（数値化できない・個別判断）
// - （3）-① 同指数の場合の優先順位の決定基準（1.希望順位が高い世帯 2.世帯状況等による調整点の
//   合計が高い世帯 3.基本指数の高い世帯 4.保育料算定時の市民税所得割額が少ない世帯）
// - （3）-② 世帯状況等による調整点は**同指数の場合の優先順位を決めるための点**であって
//   合計指数には入らないため、調整指数の質問には入れていない。
//   （同居の子ども（申込児童を含む18歳未満）がいる場合 1×人数、
//    父母を除く同居親族（18歳以上65歳未満）がいる場合 -1×人数。
//    ただし重度の障がい者は除く）
// - 「兄弟姉妹などの状況により、必ずしも指数順位どおりにならない場合があります」
// ---------------------------------------------------------------------------

const municipality = {
  id: 'yao',
  name: '八尾市',
  slug: 'yao',
  prefecture: '大阪府',
  maxBasePoints: 80, // 父母それぞれ最大80点。低い方を採用する
  scoringMethod: 'min',
} as const;

// ---------------------------------------------------------------------------
// 保育が必要な理由ごとの選択肢（父母各最大80点）
// ---------------------------------------------------------------------------

/** 就労 */
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '8時間以上かつ週5日以上（または月160時間以上）', value: `${prefix}_employment_70`, points: 70 },
  { label: '7時間以上かつ週5日以上（または月140時間以上）', value: `${prefix}_employment_60`, points: 60 },
  { label: '6時間以上かつ週5日以上（または月120時間以上）', value: `${prefix}_employment_50`, points: 50 },
  { label: '6時間以上かつ週4日以上（または月96時間以上）', value: `${prefix}_employment_40`, points: 40 },
  { label: '4時間以上かつ週4日以上（または月64時間以上）', value: `${prefix}_employment_30`, points: 30 },
];

/** 就労予定（内定） */
const employmentPlanOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_plan_none`, points: 0 },
  { label: '8時間以上かつ週5日以上（または月160時間以上）の就労予定', value: `${prefix}_employment_plan_70`, points: 70 },
  { label: '7時間以上かつ週5日以上（または月140時間以上）の就労予定', value: `${prefix}_employment_plan_60`, points: 60 },
  { label: '6時間以上かつ週5日以上（または月120時間以上）の就労予定', value: `${prefix}_employment_plan_50`, points: 50 },
  { label: '6時間以上かつ週4日以上（または月96時間以上）の就労予定', value: `${prefix}_employment_plan_40`, points: 40 },
  { label: '4時間以上かつ週4日以上（または月64時間以上）の就労予定', value: `${prefix}_employment_plan_30`, points: 30 },
];

/** 妊娠・出産 */
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産前後である（産前産後8週間・多胎妊娠は産前14週・産後8週）', value: `${prefix}_childbirth_10`, points: 10 },
];

/** 疾病 */
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '疾病等で長期入院をしている', value: `${prefix}_illness_80`, points: 80 },
  { label: '重度の疾病等で常時寝たきりの状態である', value: `${prefix}_illness_65`, points: 65 },
  { label: '重度の疾病等の状態で、保育が困難である', value: `${prefix}_illness_45`, points: 45 },
  { label: '上記区分を除く疾病である', value: `${prefix}_illness_15`, points: 15 },
];

/** 障がい */
const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  {
    label: '重度の障がい（身体障がい1〜2級、療育A・B1・B2判定、精神障がい1級）',
    value: `${prefix}_disability_80`,
    points: 80,
  },
  { label: '中度の障がい（身体障がい3〜4級、精神障がい2級）', value: `${prefix}_disability_60`, points: 60 },
];

/** 病人の介護または看護 */
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  {
    label: '同居の家族で重度の障がい者（児）・寝たきりの者・特別支援学校等へ通学等する者を常時介護または看護',
    value: `${prefix}_care_60`,
    points: 60,
  },
  {
    label: '同居の家族で中度の障がい者（児）（身体障がい3〜4級、精神障がい2級）を介護または看護',
    value: `${prefix}_care_50`,
    points: 50,
  },
  {
    label: '別居の家族で重度の障がい者（児）・寝たきりの者を常時介護または看護',
    value: `${prefix}_care_45`,
    points: 45,
  },
  { label: '上記区分を除く病人の介護または看護をしている', value: `${prefix}_care_30`, points: 30 },
];

/** 家庭の災害 */
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '居宅を失いまたは破損し、その復旧にあたっている', value: `${prefix}_disaster_80`, points: 80 },
];

/** 求職中 */
const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '公的機関を利用して求職活動を行っている', value: `${prefix}_jobseeking_10`, points: 10 },
];

/** 就学 */
const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '8時間以上かつ週5日以上（または月160時間以上）通学', value: `${prefix}_education_70`, points: 70 },
  { label: '7時間以上かつ週5日以上（または月140時間以上）通学', value: `${prefix}_education_60`, points: 60 },
  { label: '6時間以上かつ週5日以上（または月120時間以上）通学', value: `${prefix}_education_50`, points: 50 },
  { label: '6時間以上かつ週4日以上（または月96時間以上）通学', value: `${prefix}_education_40`, points: 40 },
  { label: '4時間以上かつ週4日以上（または月64時間以上）通学', value: `${prefix}_education_30`, points: 30 },
];

/** 祖父母と子どもの家庭 / 虐待・DV */
const otherOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_other_none`, points: 0 },
  { label: '虐待やDVのおそれがあるなど、社会的養護が必要な状態にある', value: `${prefix}_other_80`, points: 80 },
  {
    label: '両親が死亡・離婚・行方不明・拘禁等で家庭におらず、祖父母のみの家庭である',
    value: `${prefix}_other_75`,
    points: 75,
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
    label: `${parentLabel}：保育が必要な理由`,
    helpText:
      '2つ以上に当てはまるときは、基本指数のいちばん高いものが採用されます。ただし産前8週（多胎妊娠は14週）・産後8週にあたる場合は「妊娠・出産」で選考されます',
    inputType: 'select',
    options: [
      { label: '仕事をしている', value: `${prefix}_reason_employment`, points: 0 },
      { label: '仕事が決まっている（内定）', value: `${prefix}_reason_employment_plan`, points: 0 },
      { label: '妊娠・出産の前後', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '病気の治療中', value: `${prefix}_reason_illness`, points: 0 },
      { label: '障がいがある', value: `${prefix}_reason_disability`, points: 0 },
      { label: '家族の介護・看護をしている', value: `${prefix}_reason_care`, points: 0 },
      { label: '家庭が災害にあい復旧にあたっている', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '仕事を探している', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '学校に通っている', value: `${prefix}_reason_education`, points: 0 },
      { label: '虐待・DV、または祖父母のみの家庭', value: `${prefix}_reason_other`, points: 0 },
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
      id: `${prefix}_employment_plan`,
      category,
      label: `${parentLabel}の就労予定（内定）はどのくらいですか？`,
      inputType: 'radio',
      options: employmentPlanOptions(prefix),
    },
    {
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}の出産時期は？`,
      helpText: 'この期間にあたる場合、他の事由があっても「妊娠・出産」での選考になります',
      inputType: 'radio',
      options: childbirthOptions(prefix),
    },
    {
      id: `${prefix}_illness`,
      category,
      label: `${parentLabel}の病気の状況は？`,
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
      label: `${parentLabel}はどのように介護・看護していますか？`,
      inputType: 'radio',
      options: careOptions(prefix),
    },
    {
      id: `${prefix}_disaster`,
      category,
      label: `${parentLabel}は災害の復旧にあたっていますか？`,
      inputType: 'radio',
      options: disasterOptions(prefix),
    },
    {
      id: `${prefix}_jobseeking`,
      category,
      label: `${parentLabel}は求職活動をしていますか？`,
      helpText: '公的機関を利用した求職活動が対象です',
      inputType: 'radio',
      options: jobSeekingOptions(prefix),
    },
    {
      id: `${prefix}_education`,
      category,
      label: `${parentLabel}はどのくらい通学していますか？`,
      inputType: 'radio',
      options: educationOptions(prefix),
    },
    {
      id: `${prefix}_other`,
      category,
      label: `${parentLabel}の家庭はその他の事由にあてはまりますか？`,
      inputType: 'radio',
      options: otherOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// ---------------------------------------------------------------------------
// 調整指数の質問
// ---------------------------------------------------------------------------

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_household',
    category: 'adjustment',
    label: '世帯の状況にあてはまるものはありますか？',
    inputType: 'select',
    options: [
      { label: 'あてはまらない', value: 'adj_household_none', points: 0 },
      { label: 'ひとり親世帯', value: 'adj_household_single_11', points: 11 },
      {
        label: '父または母が単身赴任中（入所希望日時点で単身赴任終了予定がある場合を除く）',
        value: 'adj_household_tanshin_3',
        points: 3,
      },
      { label: '生活保護世帯', value: 'adj_household_welfare_3', points: 3 },
    ],
  },
  {
    id: 'adj_childcare_worker',
    category: 'adjustment',
    label: '保育士または幼稚園教諭の資格を持ち、認可保育施設で働いていますか（働く予定ですか）？',
    helpText: '転所希望の場合は対象外です',
    inputType: 'select',
    options: [
      { label: 'あてはまらない', value: 'adj_childcare_worker_none', points: 0 },
      { label: '市内の認可保育施設で就労している', value: 'adj_childcare_worker_in_15', points: 15 },
      { label: '市内の認可保育施設で就労予定である', value: 'adj_childcare_worker_in_plan_15', points: 15 },
      { label: '市外の認可保育施設で就労している', value: 'adj_childcare_worker_out_10', points: 10 },
      { label: '市外の認可保育施設で就労予定である', value: 'adj_childcare_worker_out_plan_10', points: 10 },
    ],
  },
  {
    id: 'adj_work_record',
    category: 'adjustment',
    label: '申込み時点で就労実績がありますか？',
    helpText: '就労予定（内定）のみの場合は対象外です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_work_record_no', points: 0 },
      { label: 'はい', value: 'adj_work_record_yes', points: 2 },
    ],
  },
  {
    id: 'adj_leave_return',
    category: 'adjustment',
    label: '育児休業明けですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_leave_return_no', points: 0 },
      { label: 'はい', value: 'adj_leave_return_yes', points: 2 },
    ],
  },
  {
    id: 'adj_breadwinner_unemployed',
    category: 'adjustment',
    label: '生計中心者の失業により、就労の必要性が高いですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_breadwinner_unemployed_no', points: 0 },
      { label: 'はい', value: 'adj_breadwinner_unemployed_yes', points: 1 },
    ],
  },
  {
    id: 'adj_child_disability',
    category: 'adjustment',
    label: '申込児童またはそのきょうだい（同居かつ18歳未満）に障がいがありますか？',
    helpText: '身体障がい1〜4級、療育A・B1・B2判定、精神障がい1〜2級が対象です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_child_disability_no', points: 0 },
      { label: 'はい', value: 'adj_child_disability_yes', points: 3 },
    ],
  },
  {
    id: 'adj_child_status',
    category: 'adjustment',
    label: 'お子さんの現在の状況にあてはまるものはありますか？',
    inputType: 'select',
    options: [
      { label: 'あてはまらない', value: 'adj_child_status_none', points: 0 },
      {
        label: '認可保育施設の卒園児（分園・小規模保育施設・他市認可保育施設の卒園児も含む）',
        value: 'adj_child_status_grad_3',
        points: 3,
      },
      { label: '認証保育施設の卒園児', value: 'adj_child_status_ninsho_3', points: 3 },
      {
        label: '八尾市認可化移行事業により認可外から認可保育所へ移行する施設の児童',
        value: 'adj_child_status_ikou_3',
        points: 3,
      },
      { label: '育児休業により退所した児童で、復職のため再入所を希望', value: 'adj_child_status_return_3', points: 3 },
      {
        label: '前年度の1次選考で転所申込みをしたが不承諾となり、今年度も1次選考期間に転所申込みをする',
        value: 'adj_child_status_transfer_2',
        points: 2,
      },
      {
        label: '認可外保育施設等・一時預かり保育等に有償で月64時間以上、直近4か月のうち2か月以上預けている（証明書で確認できる場合）',
        value: 'adj_child_status_ninkagai_2',
        points: 2,
      },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: 'きょうだいの入所状況・申込状況は？',
    helpText: '令和7年度5歳児は人数に含みません',
    inputType: 'select',
    options: [
      { label: 'あてはまらない', value: 'adj_sibling_none', points: 0 },
      {
        label: 'すでに認可保育施設に入所中のきょうだいがいて、入所中の児童数と今回の新規申込児童数が合わせて2人',
        value: 'adj_sibling_enrolled2_11',
        points: 11,
      },
      {
        label: 'すでに認可保育施設に入所中のきょうだいがいて、入所中の児童数と今回の新規申込児童数が合わせて3人以上',
        value: 'adj_sibling_enrolled3_15',
        points: 15,
      },
      { label: 'きょうだい（2人）が認可保育施設に同時に新規申込', value: 'adj_sibling_new2_8', points: 8 },
      { label: 'きょうだい（3人以上）が認可保育施設に同時に新規申込', value: 'adj_sibling_new3_12', points: 12 },
    ],
  },
  {
    id: 'adj_decline',
    category: 'adjustment',
    label: '同じ年度の4月1日入所の決定を辞退したことがありますか？',
    helpText:
      '辞退後に申込みを取り下げ、以降に再度同年4月1日の利用調整を受けた場合も減点の対象になります',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_decline_no', points: 0 },
      { label: 'はい', value: 'adj_decline_yes', points: -5 },
    ],
  },
];

// ---------------------------------------------------------------------------
// エクスポート
// ---------------------------------------------------------------------------

export const yaoData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
