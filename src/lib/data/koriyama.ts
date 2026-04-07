import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 郡山市 保育園入園 利用調整点数データ
// 出典: 郡山市保育施設等の利用調整及び保育の必要性の認定に関する事務取扱要領
//       別表第１（令和8年4月1日一部改正）
// https://www.city.koriyama.lg.jp/site/kosodate/7048.html
// ---------------------------------------------------------------------------
//
// 郡山市の利用調整は「保育利用調整点数表」に基づき、
// ⑤保護者等の就労状況等 ＋ ⑥調整の点数 の合計で判定されます。
// 保護者それぞれについて最も該当する事由を1つ選び、
// 両親分を合算します（片方の保護者のみの場合は片方のみ）。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'koriyama',
  name: '郡山市',
  slug: 'koriyama',
  prefecture: '福島県',
  maxBasePoints: 600, // 父母それぞれ最大300点（災害復旧）× 2
} as const;

// ---------------------------------------------------------------------------
// ⑤ 保護者等の就労状況等（保護者ごとに1つ選択）
// ---------------------------------------------------------------------------

/** 就労（勤務・自営・内職含む） */
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月140時間以上', value: `${prefix}_employment_200`, points: 200 },
  { label: '月110時間以上140時間未満', value: `${prefix}_employment_180`, points: 180 },
  { label: '月90時間以上110時間未満', value: `${prefix}_employment_160`, points: 160 },
  { label: '月80時間以上90時間未満', value: `${prefix}_employment_140`, points: 140 },
  { label: '月65時間以上80時間未満', value: `${prefix}_employment_120`, points: 120 },
  { label: '月52時間以上65時間未満', value: `${prefix}_employment_100`, points: 100 },
];

/** 妊娠・出産 */
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産予定日前後（産前産後）', value: `${prefix}_childbirth_210`, points: 210 },
];

/** 疾病等 */
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院または自宅療養が必要な治療中（常時治療を要する自己療養含む）', value: `${prefix}_illness_260`, points: 260 },
  { label: '月1回以上の通院治療を行い、常に安静が必要', value: `${prefix}_illness_210`, points: 210 },
  { label: '月1回以上の通院治療で、週4日以下かつ月40時間以下の安静が必要', value: `${prefix}_illness_140`, points: 140 },
];

/** 障害 */
const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '身体障害者手帳1級・療育手帳A・精神障害者保健福祉手帳1級', value: `${prefix}_disability_260`, points: 260 },
  { label: '身体障害者手帳2・3級・療育手帳B・精神障害者保健福祉手帳2・3級', value: `${prefix}_disability_210`, points: 210 },
  { label: '身体障害者手帳4〜6級', value: `${prefix}_disability_140`, points: 140 },
];

/** 介護・看護 */
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '同居家族の日常生活全般の介助・看護が必要（要介護3〜5・身障手帳1級・療育A・精神1級相当）', value: `${prefix}_care_195`, points: 195 },
  { label: '同居家族の日常生活の一部に援助が必要（要介護1・2・身障手帳2・3級・療育B・精神2・3級相当）', value: `${prefix}_care_155`, points: 155 },
  { label: '上記以外の介護および付添（要支援認定1・2・身障手帳4〜6級相当）', value: `${prefix}_care_115`, points: 115 },
];

/** 不存在（行方不明・拘禁等） */
const absentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_absent_none`, points: 0 },
  { label: '行方不明・離婚前別居・拘禁・不在等', value: `${prefix}_absent_230`, points: 230 },
];

/** ひとり親で就業中（就労状況が月90時間以上110時間未満以下の場合） */
const singleParentWorkOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_singlework_none`, points: 0 },
  { label: 'ひとり親で就業中（就労状況が月90時間以上110時間未満以下）', value: `${prefix}_singlework_170`, points: 170 },
];

/** 配偶者の死亡または生計維持者の都合による生活困窮 */
const hardshipOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_hardship_none`, points: 0 },
  { label: '配偶者死亡等による生活困窮（2月以内）', value: `${prefix}_hardship_250`, points: 250 },
  { label: '配偶者死亡等による生活困窮（4月以内）', value: `${prefix}_hardship_240`, points: 240 },
  { label: '配偶者死亡等による生活困窮（6月以内）', value: `${prefix}_hardship_210`, points: 210 },
];

/** 就学 */
const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '職業訓練施設・学校教育法に定める学校等に通学', value: `${prefix}_education_200`, points: 200 },
];

/** 求職活動 */
const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動中', value: `${prefix}_jobseeking_50`, points: 50 },
];

/** 災害復旧 */
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '災害の復旧にあたっている', value: `${prefix}_disaster_300`, points: 300 },
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
    helpText: '郡山市では保護者ごとに該当する事由に応じた点数が付き、両親分を合算します。いちばん近いものをひとつ選んでください。',
    inputType: 'select',
    options: [
      { label: '仕事をしている（勤務・自営・内職）', value: `${prefix}_reason_employment`, points: 0 },
      { label: '妊娠・出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '病気の治療中', value: `${prefix}_reason_illness`, points: 0 },
      { label: '障害がある', value: `${prefix}_reason_disability`, points: 0 },
      { label: '家族の介護・看護をしている', value: `${prefix}_reason_care`, points: 0 },
      { label: '不存在（行方不明・拘禁等）', value: `${prefix}_reason_absent`, points: 0 },
      { label: 'ひとり親で就業中', value: `${prefix}_reason_singlework`, points: 0 },
      { label: '配偶者死亡等による生活困窮', value: `${prefix}_reason_hardship`, points: 0 },
      { label: '学校・職業訓練に通っている', value: `${prefix}_reason_education`, points: 0 },
      { label: '仕事を探している', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '災害の復旧', value: `${prefix}_reason_disaster`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の月あたりの就労時間は？`,
      helpText: '就労証明書に記載された勤務時間（通勤時間は含まない）で判断します',
      inputType: 'radio',
      options: employmentOptions(prefix),
    },
    {
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}の出産の状況は？`,
      helpText: '出産予定日前8週から出産後8週が対象です',
      inputType: 'radio',
      options: childbirthOptions(prefix),
    },
    {
      id: `${prefix}_illness`,
      category,
      label: `${parentLabel}の病気の状況は？`,
      helpText: '入院・自宅療養・通院の状況に応じて点数が決まります',
      inputType: 'radio',
      options: illnessOptions(prefix),
    },
    {
      id: `${prefix}_disability`,
      category,
      label: `${parentLabel}の障害の程度は？`,
      helpText: '障害者手帳の等級に応じて点数が決まります',
      inputType: 'radio',
      options: disabilityOptions(prefix),
    },
    {
      id: `${prefix}_care`,
      category,
      label: `${parentLabel}はどのくらい介護・看護をしていますか？`,
      helpText: '同居家族の要介護度や障害の程度に応じて点数が決まります',
      inputType: 'radio',
      options: careOptions(prefix),
    },
    {
      id: `${prefix}_absent`,
      category,
      label: `${parentLabel}は不存在に該当しますか？`,
      helpText: '行方不明・離婚前の別居・拘禁・不在等が対象です',
      inputType: 'radio',
      options: absentOptions(prefix),
    },
    {
      id: `${prefix}_singlework`,
      category,
      label: `${parentLabel}はひとり親で就業中ですか？`,
      helpText: 'ひとり親で就業しているが就労時間が月90時間以上110時間未満以下の場合に該当します',
      inputType: 'radio',
      options: singleParentWorkOptions(prefix),
    },
    {
      id: `${prefix}_hardship`,
      category,
      label: `${parentLabel}は配偶者死亡等による生活困窮に該当しますか？`,
      helpText: '配偶者の死亡または生計維持者の都合によりなくなった又は同等に生活の維持に和む必要がある場合',
      inputType: 'radio',
      options: hardshipOptions(prefix),
    },
    {
      id: `${prefix}_education`,
      category,
      label: `${parentLabel}は学校・職業訓練に通っていますか？`,
      helpText: '職業訓練施設の設置する職業訓練施設または学校教育法に定める学校等に通学する場合',
      inputType: 'radio',
      options: educationOptions(prefix),
    },
    {
      id: `${prefix}_jobseeking`,
      category,
      label: `${parentLabel}は求職活動をしていますか？`,
      helpText: '求職活動中の場合は50点です。入所後90日以内に就労開始が必要です。',
      inputType: 'radio',
      options: jobSeekingOptions(prefix),
    },
    {
      id: `${prefix}_disaster`,
      category,
      label: `${parentLabel}は災害の復旧にあたっていますか？`,
      inputType: 'radio',
      options: disasterOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// ---------------------------------------------------------------------------
// ⑥ 調整指数の質問
// ---------------------------------------------------------------------------

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_3sai_shisetsu',
    category: 'adjustment',
    label: '3歳到達後の対象年齢施設を申し込んでいますか？',
    helpText: '3歳に達した日以後の最初の3月31日までを対象年齢とする保育施設等を希望申込みする場合（兄弟出しの利用申請者を含む）に250点が加算されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_3sai_shisetsu_no', points: 0 },
      { label: 'はい（+250）', value: 'adj_3sai_shisetsu_yes', points: 250 },
    ],
  },
  {
    id: 'adj_taijo_sainyujo',
    category: 'adjustment',
    label: '出産・産前休暇・育児休業等のやむを得ない理由による退所後、再入所を希望していますか？',
    helpText: '兄弟出しの利用申請者も含みます。+200点が加算されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_taijo_sainyujo_no', points: 0 },
      { label: 'はい（+200）', value: 'adj_taijo_sainyujo_yes', points: 200 },
    ],
  },
  {
    id: 'adj_seikatsu_hogo',
    category: 'adjustment',
    label: '生活保護世帯または市民税非課税世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_seikatsu_hogo_no', points: 0 },
      { label: 'はい（+10）', value: 'adj_seikatsu_hogo_yes', points: 10 },
    ],
  },
  {
    id: 'adj_low_income',
    category: 'adjustment',
    label: '市民税所得割額の合計が48,600円以下ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_low_income_no', points: 0 },
      { label: 'はい（+5）', value: 'adj_low_income_yes', points: 5 },
    ],
  },
  {
    id: 'adj_kyoudai',
    category: 'adjustment',
    label: 'きょうだいに関する該当事項はありますか？',
    helpText: '兄弟出し同時申請や兄弟が在所中の場合に加算されます',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_kyoudai_none', points: 0 },
      { label: '兄弟出し同時申請（同年齢）（+200）', value: 'adj_kyoudai_douji_dounenrei', points: 200 },
      { label: '兄弟出し同時申請（異年齢）（+160）', value: 'adj_kyoudai_douji_inenrei', points: 160 },
      { label: '兄弟が在所中（+160）', value: 'adj_kyoudai_zaishochuu', points: 160 },
    ],
  },
  {
    id: 'adj_shippei_ryoushin_fuzai',
    category: 'adjustment',
    label: '保育の必要な理由が疾病・障害または介護・看護で、父母ともに不在ですか？',
    helpText: '利用申請者1人に限り160点が加算されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_shippei_ryoushin_fuzai_no', points: 0 },
      { label: 'はい（+160）', value: 'adj_shippei_ryoushin_fuzai_yes', points: 160 },
    ],
  },
  {
    id: 'adj_kodomo_3nin',
    category: 'adjustment',
    label: '同一世帯に18歳未満の子どもが3人以上いますか？',
    helpText: '2人目から1人あたり10点が加算されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ（2人以下）', value: 'adj_kodomo_3nin_no', points: 0 },
      { label: '3人いる（+10）', value: 'adj_kodomo_3nin_3', points: 10 },
      { label: '4人いる（+20）', value: 'adj_kodomo_3nin_4', points: 20 },
      { label: '5人以上いる（+30）', value: 'adj_kodomo_3nin_5', points: 30 },
    ],
  },
  {
    id: 'adj_kyoudai_jitaku',
    category: 'adjustment',
    label: '兄弟出しが自宅で保育されているか、幼稚園に通園中ですか？',
    helpText: '該当する場合-30点の減点となります',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_kyoudai_jitaku_no', points: 0 },
      { label: 'はい（-30）', value: 'adj_kyoudai_jitaku_yes', points: -30 },
    ],
  },
  {
    id: 'adj_hoiku_dekinaku',
    category: 'adjustment',
    label: 'これまで保育していた親等が医療・疾病等の理由で保育できなくなりましたか？',
    helpText: '利用申請者をこれまでに保育していた親等が保育できなくなった場合に+30点が加算されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_hoiku_dekinaku_no', points: 0 },
      { label: 'はい（+30）', value: 'adj_hoiku_dekinaku_yes', points: 30 },
    ],
  },
  {
    id: 'adj_hoikushi',
    category: 'adjustment',
    label: '保護者が郡山市の保育施設（認可外含む）または幼稚園に保育士・幼稚園教諭・看護師等として勤務中（または勤務予定）ですか？',
    helpText: '該当する場合に+170点が加算されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_hoikushi_no', points: 0 },
      { label: 'はい（+170）', value: 'adj_hoikushi_yes', points: 170 },
    ],
  },
];

// ---------------------------------------------------------------------------
// エクスポート
// ---------------------------------------------------------------------------

export const koriyamaData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
