import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 守口市 認定こども園等 利用調整基準
//
// 出典: 守口市「利用調整基準表（守口市保育所等の利用調整に関する要綱から抜粋）」
//       https://www.city.moriguchi.osaka.jp/material/files/group/4/riyoutyouseikizyunnhyou.pdf
//       （令和9年（2027年）4月からの認定こども園等の入園（所）について
//         https://www.city.moriguchi.osaka.jp/kakukanoannai/kodomobu/hoikuyochienka/ninteikodomoentou/hoikusyonyuen/904.html
//         からリンクされている抜粋PDF。入園案内本体のP.27-28にあたる）
//
// 2026-08-31: 従来のデータは他自治体と同じ点数配列のテンプレート（推定値）だったため、
// 上記の公式基準表を読み取って全面的に置き換えた。
// 2026-08-19 の一斉置き換えでは市サイトを取得できず failed にしていたが、今回は取得できた。
//
// ## 計算方式（原典「点数の計算方法」）
// 保護者（原則、父及び母）の状況から基本点数表に基づいて父・母それぞれ点数を付ける。
// これに加えて加算点数表の内容に該当する場合は、各点数を加点する。
//   父の基本点数 ＋ 母の基本点数 ＋ 加算点数 ＝ 合計点数
// 加算点数表1〜6に該当する場合のみ加算し、該当項が複数ある場合は該当項の点数すべてを加算する。
// 基本点数は父母各最大120点なので maxBasePoints は 240。
//
// 原典の計算例:
//  父が月160時間以上の就労、母が月120時間以上160時間未満の就労、先に2号認定で兄が在園
//    → 120 ＋ 100 ＋ 20 ＝ 240点
//  母が月120時間以上160時間未満の就労で、ひとり親に該当
//    → 100 ＋ 120 ＝ 220点
//
// ## 基本点数表
// 就労（内職以外）
//   月20日以上かつ週40時間以上又は週5日以上かつ日8時間以上（月160時間以上）働いている 120
//   月20日以上かつ週30時間以上又は週5日以上かつ日6時間以上（月120時間以上）働いている 100
//   月16日以上かつ週24時間以上又は週4日以上かつ日6時間以上（月96時間以上）働いている 80
//   上記には該当しないが、月64時間以上働いている 60
//   自営業（自営協力者を含む。）で、就労証明書以外に自身が就労していること（就労先、就労状況等）を
//   客観的に確認できる書類等（開業届出書、営業許可書、給与明細の写し等）の提出がない場合 20
// 内職
//   月120時間以上働いている 60／月64時間以上働いている 40
// 就労内定（内職以外）
//   月160時間以上働く予定 110／月120時間以上 90／月96時間以上 70／月64時間以上 50／
//   自営業で客観的に確認できる書類等の提出がない場合 10
// 就労（内職以外であって、育児休業中で復職する場合）
//   復職後、月160時間以上働く予定 120／月120時間以上 100／月96時間以上 80／月64時間以上 60／
//   自営業で客観的に確認できる書類等の提出がない場合 20
// 妊娠・出産 … 出産から概ね2か月前後である場合 40
// 保護者の疾病
//   概ね3か月以上入院している（入院予定を含む。）又は要介護認定4以上の判定を受けている 120
//   要介護認定3の判定を受けている 80
//   要支援認定1・2、要介護認定1・2の判定を受けている又は疾病等により家庭での保育が
//   困難であると診断を受けた場合 40
// 保護者の障害（各等級の手帳交付を受けており、子どもの保育が常時困難な場合に適用）
//   身体障害者手帳1級・2級 120／3級・4級 80／5級・6級 40
//   精神障害者保健福祉手帳1級 120／2級 80／3級 40
//   療育手帳（A）120／（B1）80／（B2）40
// 同居親族の常時介護・看護
//   要介護認定3以上の判定を受けている又は小児慢性疾患若しくは障害を抱える同居親族の
//   常時介護・看護により、子どもの保育が常時困難な場合 70
//   上記以外の同居親族の常時介護・看護により、子どもの保育が常時困難な場合 30
// 求職活動 … 求職活動中（起業準備を含む。）である場合 10
// 就学 … 公共職業訓練、専門学校、大学等に月120時間以上就学 60／月64時間以上就学 40
// その他（災害の復旧に当たっている場合／児童虐待を行っている又は再び行われるおそれがある場合／
//   配偶者からの暴力により保育を行うことが困難である場合／里親委託が行われている場合／
//   上記以外に市長が認めた場合）… 保育の必要性に応じて決定
//
// 備考
//  1 就労の項における「自営業」とは保護者自らが事業を営む場合をいい、「自営協力者」とは
//    2親等以内の親族が運営する会社等に勤める者をいう。
//  2 保護者の障害の項については、各等級又は各区分の手帳交付を受けており、
//    子どもの保育が常時困難な場合に適用する。
//  3 同居親族の常時介護・看護の項における「障害」とは、身体障害者手帳1級から4級まで、
//    精神障害者保健福祉手帳1級若しくは2級又は療育手帳（A）若しくは（B1）の交付を
//    受けている場合をいう。
//
// ## 加算点数表
// 1 市内認可保育施設で保育士（保育士としてみなされる者を含む。）として月120時間以上
//   働いている、又は月120時間以上働く予定であると認められる者 … 点数欄は「優先利用」
// 2 ひとり親世帯 120
// 3 市内認可保育施設で保育士（保育士としてみなされる者を含む。）として月64時間以上
//   120時間未満働いている、又は月64時間以上120時間未満働く予定であると認められる者 40
// 4 小規模保育事業等の卒園児童 20
// 5 きょうだいが先に入所している場合 20
// 6 きょうだいが同時に申し込む場合 10
// 備考
//  1 1の項及び3の項の対象となる者については入園案内P.15「保育士等の優先的な利用調整について」を参照。
//  2 4の項については、利用申込児童が3歳児の年度中における利用申込み（利用希望日が当該年度中で
//    ある場合に限る。）である場合に適用する。ただし、当該児童が当該年度中に2号認定子どもとして
//    認定こども園等へ通園した場合には、それ以降はこの項による加算の適用対象外とする。
//  3 5の項については、先に入所しているきょうだいが1号認定子どもである場合には、加算の適用対象外とする。
//
// ## 同点順位表
// 1 新規申込み児童及び小規模保育事業等の卒園児童／2 ひとり親世帯／
// 3 基本点数表における基本点数の高い者／4 希望する施設の希望順位が高い者／
// 5 利用希望日が属する年度の前年度の4月1日時点で利用申込みをしていたものの利用できていない者／
// 6 抽選
//
// ## 質問に入れなかった規定
// - 基本点数表「その他」（災害復旧・児童虐待・DV・里親委託・市長が認めた場合）は原典が
//   「保育の必要性に応じて決定」で点数が定まらないため入れていない
// - 加算点数表1（保育士として月120時間以上）は点数欄が「優先利用」であり加算点ではないため、
//   選択肢は用意しつつ加算は0点とし、ヘルプ文で優先利用扱いになることを説明している
// - 同点順位表は同点時のタイブレークであり点数ではないため入れていない
// ---------------------------------------------------------------------------

const municipality = {
  id: 'moriguchi',
  name: '守口市',
  slug: 'moriguchi',
  prefecture: '大阪府',
  maxBasePoints: 240, // 父母各120点
} as const;

// ---------------------------------------------------------------------------
// 基本点数表の選択肢（父母各最大120点）
// ---------------------------------------------------------------------------

/** 就労（内職以外・内職・就労内定・育休中の復職） */
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  {
    label: '就労（内職以外）：月20日以上かつ週40時間以上、または週5日以上かつ日8時間以上（月160時間以上）',
    value: `${prefix}_employment_work_120`,
    points: 120,
  },
  {
    label: '就労（内職以外）：月20日以上かつ週30時間以上、または週5日以上かつ日6時間以上（月120時間以上）',
    value: `${prefix}_employment_work_100`,
    points: 100,
  },
  {
    label: '就労（内職以外）：月16日以上かつ週24時間以上、または週4日以上かつ日6時間以上（月96時間以上）',
    value: `${prefix}_employment_work_80`,
    points: 80,
  },
  {
    label: '就労（内職以外）：上記には該当しないが月64時間以上',
    value: `${prefix}_employment_work_60`,
    points: 60,
  },
  {
    label: '就労（内職以外）：自営業（自営協力者を含む）で、就労を客観的に確認できる書類の提出がない',
    value: `${prefix}_employment_work_jiei_20`,
    points: 20,
  },
  { label: '内職：月120時間以上', value: `${prefix}_employment_naishoku_60`, points: 60 },
  { label: '内職：月64時間以上', value: `${prefix}_employment_naishoku_40`, points: 40 },
  {
    label: '就労内定（内職以外）：月160時間以上働く予定',
    value: `${prefix}_employment_naitei_110`,
    points: 110,
  },
  {
    label: '就労内定（内職以外）：月120時間以上働く予定',
    value: `${prefix}_employment_naitei_90`,
    points: 90,
  },
  {
    label: '就労内定（内職以外）：月96時間以上働く予定',
    value: `${prefix}_employment_naitei_70`,
    points: 70,
  },
  {
    label: '就労内定（内職以外）：上記には該当しないが月64時間以上働く予定',
    value: `${prefix}_employment_naitei_50`,
    points: 50,
  },
  {
    label: '就労内定（内職以外）：自営業（自営協力者を含む）で、就労を客観的に確認できる書類の提出がない',
    value: `${prefix}_employment_naitei_jiei_10`,
    points: 10,
  },
  {
    label: '育児休業中で復職（内職以外）：復職後、月160時間以上働く予定',
    value: `${prefix}_employment_fukushoku_120`,
    points: 120,
  },
  {
    label: '育児休業中で復職（内職以外）：復職後、月120時間以上働く予定',
    value: `${prefix}_employment_fukushoku_100`,
    points: 100,
  },
  {
    label: '育児休業中で復職（内職以外）：復職後、月96時間以上働く予定',
    value: `${prefix}_employment_fukushoku_80`,
    points: 80,
  },
  {
    label: '育児休業中で復職（内職以外）：上記には該当しないが復職後、月64時間以上働く予定',
    value: `${prefix}_employment_fukushoku_60`,
    points: 60,
  },
  {
    label: '育児休業中で復職（内職以外）：自営業（自営協力者を含む）で、就労を客観的に確認できる書類の提出がない',
    value: `${prefix}_employment_fukushoku_jiei_20`,
    points: 20,
  },
];

/** 妊娠・出産 */
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産から概ね2か月前後である', value: `${prefix}_childbirth_40`, points: 40 },
];

/** 保護者の疾病 */
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  {
    label: '概ね3か月以上入院している（入院予定を含む）、または要介護認定4以上',
    value: `${prefix}_illness_120`,
    points: 120,
  },
  { label: '要介護認定3', value: `${prefix}_illness_80`, points: 80 },
  {
    label: '要支援認定1・2、要介護認定1・2、または疾病等により家庭での保育が困難であると診断を受けた',
    value: `${prefix}_illness_40`,
    points: 40,
  },
];

/** 保護者の障害（手帳交付を受けており、子どもの保育が常時困難な場合） */
const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '身体障害者手帳1級・2級', value: `${prefix}_disability_shintai_120`, points: 120 },
  { label: '身体障害者手帳3級・4級', value: `${prefix}_disability_shintai_80`, points: 80 },
  { label: '身体障害者手帳5級・6級', value: `${prefix}_disability_shintai_40`, points: 40 },
  { label: '精神障害者保健福祉手帳1級', value: `${prefix}_disability_seishin_120`, points: 120 },
  { label: '精神障害者保健福祉手帳2級', value: `${prefix}_disability_seishin_80`, points: 80 },
  { label: '精神障害者保健福祉手帳3級', value: `${prefix}_disability_seishin_40`, points: 40 },
  { label: '療育手帳（A）', value: `${prefix}_disability_ryoiku_120`, points: 120 },
  { label: '療育手帳（B1）', value: `${prefix}_disability_ryoiku_80`, points: 80 },
  { label: '療育手帳（B2）', value: `${prefix}_disability_ryoiku_40`, points: 40 },
];

/** 同居親族の常時介護・看護 */
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  {
    label:
      '要介護認定3以上、または小児慢性疾患・障害を抱える同居親族の常時介護・看護により保育が常時困難',
    value: `${prefix}_care_70`,
    points: 70,
  },
  {
    label: '上記以外の同居親族の常時介護・看護により保育が常時困難',
    value: `${prefix}_care_30`,
    points: 30,
  },
];

/** 求職活動 */
const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動中（起業準備を含む）', value: `${prefix}_jobseeking_10`, points: 10 },
];

/** 就学 */
const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  {
    label: '公共職業訓練、専門学校、大学等に月120時間以上就学',
    value: `${prefix}_education_60`,
    points: 60,
  },
  {
    label: '公共職業訓練、専門学校、大学等に月64時間以上就学',
    value: `${prefix}_education_40`,
    points: 40,
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
    label: `${parentLabel}：保育を必要とする事由`,
    helpText: 'いちばん近いものをひとつ選んでください',
    inputType: 'select',
    options: [
      { label: '就労（内定・育休からの復職を含む）', value: `${prefix}_reason_employment`, points: 0 },
      { label: '妊娠・出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '保護者の疾病', value: `${prefix}_reason_illness`, points: 0 },
      { label: '保護者の障害', value: `${prefix}_reason_disability`, points: 0 },
      { label: '同居親族の常時介護・看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '求職活動', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '就学', value: `${prefix}_reason_education`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の就労状況は？`,
      helpText:
        '「自営業」は保護者自らが事業を営む場合、「自営協力者」は2親等以内の親族が運営する会社等に勤める人を指します',
      inputType: 'radio',
      options: employmentOptions(prefix),
    },
    {
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}は妊娠・出産の前後ですか？`,
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
      helpText: '手帳の交付を受けており、子どもの保育が常時困難な場合に適用されます',
      inputType: 'radio',
      options: disabilityOptions(prefix),
    },
    {
      id: `${prefix}_care`,
      category,
      label: `${parentLabel}は同居親族を常時介護・看護していますか？`,
      helpText:
        'ここでいう「障害」は、身体障害者手帳1級から4級まで、精神障害者保健福祉手帳1級・2級、療育手帳（A）・（B1）の交付を受けている場合を指します',
      inputType: 'radio',
      options: careOptions(prefix),
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
      label: `${parentLabel}はどのくらい就学していますか？`,
      inputType: 'radio',
      options: educationOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// ---------------------------------------------------------------------------
// 加算点数表（世帯単位）の質問
// ---------------------------------------------------------------------------

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい', value: 'adj_single_parent_yes', points: 120 },
    ],
  },
  {
    id: 'adj_hoikushi',
    category: 'adjustment',
    label: '市内の認可保育施設で保育士として働いていますか？',
    helpText:
      '保育士としてみなされる者を含みます。月120時間以上の場合は加算点ではなく「優先利用」として調整されるため、ここでは点数が加算されません',
    inputType: 'select',
    options: [
      { label: 'あてはまらない', value: 'adj_hoikushi_none', points: 0 },
      {
        label: '月64時間以上120時間未満働いている、または働く予定',
        value: 'adj_hoikushi_40',
        points: 40,
      },
      {
        label: '月120時間以上働いている、または働く予定（優先利用として扱われます）',
        value: 'adj_hoikushi_priority',
        points: 0,
      },
    ],
  },
  {
    id: 'adj_shokibo_graduate',
    category: 'adjustment',
    label: '小規模保育事業等の卒園児童ですか？',
    helpText:
      '利用申込児童が3歳児の年度中における利用申込み（利用希望日が当該年度中である場合に限る）に適用されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_shokibo_graduate_no', points: 0 },
      { label: 'はい', value: 'adj_shokibo_graduate_yes', points: 20 },
    ],
  },
  {
    id: 'adj_sibling_enrolled',
    category: 'adjustment',
    label: 'きょうだいが先に入所していますか？',
    helpText: '先に入所しているきょうだいが1号認定子どもである場合は加算されません',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_enrolled_no', points: 0 },
      { label: 'はい', value: 'adj_sibling_enrolled_yes', points: 20 },
    ],
  },
  {
    id: 'adj_sibling_same_time',
    category: 'adjustment',
    label: 'きょうだいが同時に申し込みますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_same_time_no', points: 0 },
      { label: 'はい', value: 'adj_sibling_same_time_yes', points: 10 },
    ],
  },
];

// ---------------------------------------------------------------------------
// エクスポート
// ---------------------------------------------------------------------------

export const moriguchiData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
