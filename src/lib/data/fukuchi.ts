import type { MunicipalityData, Question } from '../types';

// -------------------------------------------------------------------------
// 福智町 保育園入園 利用調整基準データ
// 出典: 福智町「福智町保育所等利用調整表」
// https://www.town.fukuchi.lg.jp/material/files/group/11/hoikuriyouchousei.pdf
// -------------------------------------------------------------------------
// 福智町は表の冒頭に手順が書かれている。
//   「保育所等の申込者が定員や空き枠を上回った場合、下表の基準指数と調整指数を
//    用いて点数をつけ、優先順位の高い者から入所を決定する。」
// 原典は父母の合わせ方を書いていないため、
// 全国で最も多い形（父母それぞれの指数を合算）に合わせて scoringMethod は 'sum' とした。
// 基準指数の最大は1人あたり50点。
//
// 2「居宅内自営」は「就労時間による指数の配分は『1 居宅外労働』と同じ」、
// 7「就学等」は「居宅外労働に準ずる」なので、どちらも居宅外労働と同じ刻みを使っている。
//
// 原典で指数が幅・準用でしか書かれていない項目は入れていない。
// - 3 疾病「居宅内療養（診断書等の内容により指数は変動）」（20〜50）
// - 3 障害「（障害等級等により指数は変動）」（20〜50）
// - 4 介護「（要介護認定等により指数は変動）」（20〜50）
// - 7「前各号に掲げるもののほか、町長が明らかに保育が必要と認める場合」（上記いずれかを準用）
//
// 調整指数の備考に従って、重複しない組み合わせは1つの設問にまとめている。
//   「（4）番号6と7は重複適用しない。」
//   「（6）番号13と14は重複適用しない。」
//   「（7）番号6と20〜23に重複して該当する場合は、番号6を優先して適用する。」
//   「（10）番号20〜23に重複して該当する場合は、高位の指数をその世帯の調整基準指数とする。」
//
// 調整指数のうち入れていないもの。
// - 番号16「申込児が障害を有するために、通所施設に通所、または病院に通院し、
//   保護者の就労が制限されている場合」（+10）
//   備考（11）に「基準指数と合計した場合に50を超えるときには、その合計は50とする」とあり、
//   単純な加点にならないため。
// - 番号23「特別な事情による転園」（+3）転園の話のため。
// - 番号26「年度途中入所において、審査月以前から待機している場合（待機月数×指数）」（×3）
//   計算式のため。
// -------------------------------------------------------------------------

const municipality = {
  id: 'fukuchi',
  name: '福智町',
  slug: 'fukuchi',
  prefecture: '福岡県',
  maxBasePoints: 100, // 父母各50点の合計
  scoringMethod: 'sum',
} as const;

// 1 居宅外労働（外勤、居宅外自営） ／ 2 居宅内労働
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '居宅外労働・居宅内自営：週40時間以上の就労を常態', value: `${prefix}_employment_0`, points: 50 },
  { label: '居宅外労働・居宅内自営：週37時間以上の就労を常態', value: `${prefix}_employment_1`, points: 45 },
  { label: '居宅外労働・居宅内自営：週35時間以上の就労を常態', value: `${prefix}_employment_2`, points: 40 },
  { label: '居宅外労働・居宅内自営：週30時間以上の就労を常態', value: `${prefix}_employment_3`, points: 35 },
  { label: '居宅外労働・居宅内自営：週25時間以上の就労を常態', value: `${prefix}_employment_4`, points: 30 },
  { label: '内職：週30時間以上の就労を常態', value: `${prefix}_employment_5`, points: 30 },
  { label: '居宅外労働・居宅内自営：週20時間以上の就労を常態', value: `${prefix}_employment_6`, points: 25 },
  { label: '内職：週25時間以上の就労を常態', value: `${prefix}_employment_7`, points: 25 },
  { label: '居宅外労働・居宅内自営：週16時間以上の就労を常態', value: `${prefix}_employment_8`, points: 20 },
  { label: '居宅外労働・居宅内自営：週12時間以上の就労を常態', value: `${prefix}_employment_9`, points: 15 },
  { label: '内職：週12時間以上の就労を常態', value: `${prefix}_employment_10`, points: 15 },
];

// 3 出産
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産前後の休養のため保育にあたることができない場合', value: `${prefix}_childbirth_0`, points: 15 },
];

// 3 疾病（入院のみ。居宅内療養と障害は原典で指数が変動するため入れていない）
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院1か月以上', value: `${prefix}_illness_0`, points: 50 },
];

// 4 介護・看護（施設等付添）
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '週5日以上、かつ週30時間以上の付添', value: `${prefix}_care_0`, points: 50 },
  { label: '週5日以上、かつ週20時間以上の付添', value: `${prefix}_care_1`, points: 45 },
  { label: '週4日以上、かつ週24時間以上の付添', value: `${prefix}_care_2`, points: 40 },
  { label: '週4日以上、かつ週16時間以上の付添', value: `${prefix}_care_3`, points: 35 },
  { label: '週3日以上、かつ週18時間以上の付添', value: `${prefix}_care_4`, points: 30 },
  { label: '週3日以上、かつ週12時間以上の付添', value: `${prefix}_care_5`, points: 25 },
];

// 5 災害
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '災害等による家屋の損傷、その他災害復旧のため、保育にあたることができない場合', value: `${prefix}_disaster_0`, points: 50 },
];

// 6 求職
const jobseekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動のため、日中保育にあたることができない場合', value: `${prefix}_jobseeking_0`, points: 10 },
];

// 7 就学等（居宅外労働に準ずる）
const schoolOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_school_none`, points: 0 },
  { label: '就学・技術習得等が週40時間以上', value: `${prefix}_school_0`, points: 50 },
  { label: '就学・技術習得等が週37時間以上', value: `${prefix}_school_1`, points: 45 },
  { label: '就学・技術習得等が週35時間以上', value: `${prefix}_school_2`, points: 40 },
  { label: '就学・技術習得等が週30時間以上', value: `${prefix}_school_3`, points: 35 },
  { label: '就学・技術習得等が週25時間以上', value: `${prefix}_school_4`, points: 30 },
  { label: '就学・技術習得等が週20時間以上', value: `${prefix}_school_5`, points: 25 },
  { label: '就学・技術習得等が週16時間以上', value: `${prefix}_school_6`, points: 20 },
  { label: '就学・技術習得等が週12時間以上', value: `${prefix}_school_7`, points: 15 },
];

// 7 不存在等
const absentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_absent_none`, points: 0 },
  { label: '死亡、離婚、行方不明、拘禁、離婚前提の別居、未婚等', value: `${prefix}_absent_0`, points: 50 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    inputType: 'select',
    options: [
      { label: '労働（居宅外・居宅内）', value: `${prefix}_reason_employment`, points: 0 },
      { label: '出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '疾病（入院）', value: `${prefix}_reason_illness`, points: 0 },
      { label: '介護・看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '災害', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '求職', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '就学等', value: `${prefix}_reason_school`, points: 0 },
      { label: '不存在等', value: `${prefix}_reason_absent`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の労働の状況は？`,
      helpText: '居宅内自営は居宅外労働と同じ指数です',
      inputType: 'radio',
      options: employmentOptions(prefix),
    },
    {
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}の出産の状況は？`,
      inputType: 'radio',
      options: childbirthOptions(prefix),
    },
    {
      id: `${prefix}_illness`,
      category,
      label: `${parentLabel}は1か月以上入院していますか？`,
      helpText: '居宅内療養と障害は、原典で診断書や障害等級により指数が変動するため点数を出していません',
      inputType: 'radio',
      options: illnessOptions(prefix),
    },
    {
      id: `${prefix}_care`,
      category,
      label: `${parentLabel}の施設等付添の状況は？`,
      inputType: 'radio',
      options: careOptions(prefix),
    },
    {
      id: `${prefix}_disaster`,
      category,
      label: `${parentLabel}は災害復旧のため保育にあたれませんか？`,
      inputType: 'radio',
      options: disasterOptions(prefix),
    },
    {
      id: `${prefix}_jobseeking`,
      category,
      label: `${parentLabel}は求職活動をしていますか？`,
      inputType: 'radio',
      options: jobseekingOptions(prefix),
    },
    {
      id: `${prefix}_school`,
      category,
      label: `${parentLabel}の就学・技術習得の状況は？`,
      inputType: 'radio',
      options: schoolOptions(prefix),
    },
    {
      id: `${prefix}_absent`,
      category,
      label: `${parentLabel}は不存在等にあたりますか？`,
      inputType: 'radio',
      options: absentOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// 【調整指数】
const adjustmentQuestions: Question[] = [
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_0', points: 0 },
      { label: 'はい（+10）', value: 'adj_welfare_1', points: 10 },
    ],
  },
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親・父母不存在についてあてはまるものは？',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_single_parent_0', points: 0 },
      { label: 'ひとり親（同居親族がいない）または父母不存在（+10）', value: 'adj_single_parent_1', points: 10 },
      { label: 'ひとり親世帯等で同居親族がいるが保育にあたることができない（+5）', value: 'adj_single_parent_2', points: 5 },
    ],
  },
  {
    id: 'adj_tanshin',
    category: 'adjustment',
    label: '父母のどちらかが単身赴任で別居状態である世帯ですか？',
    helpText: '会社命令によるものに限り、自営業・自己都合の場合は原則該当しません',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_tanshin_0', points: 0 },
      { label: 'はい（+3）', value: 'adj_tanshin_1', points: 3 },
    ],
  },
  {
    id: 'adj_work_years',
    category: 'adjustment',
    label: '就労実績が1年以上ありますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_work_years_0', points: 0 },
      { label: 'はい（+2）', value: 'adj_work_years_1', points: 2 },
    ],
  },
  {
    id: 'adj_leave_or_care',
    category: 'adjustment',
    label: '産休・育休明け、または申込児の現在の預け先であてはまるものは？',
    helpText: '原典では番号6（産休・育休明け）と番号20〜22（預け先）が重なる場合、番号6が優先されます',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_leave_or_care_0', points: 0 },
      { label: '育休取得により一時退園し、育休明けに再入園（認可保育所に限る）（+20）', value: 'adj_leave_or_care_1', points: 20 },
      { label: '申込児を保育室、保育ママ、届出（認可外）保育施設、ベビーシッター等に有償で預けているのを常態としている（+6）', value: 'adj_leave_or_care_2', points: 6 },
      { label: '産休明け、または育休明け予定者（4月1日入園希望者は1〜3月中の復帰者を含む）がいる世帯（+5）', value: 'adj_leave_or_care_3', points: 5 },
      { label: '申込児を別居親族（保護者の就労先以外）に有償で預けているのを状態としている（+1）', value: 'adj_leave_or_care_4', points: 1 },
      { label: '申込児を幼稚園に在園させているのを常態としている（+1）', value: 'adj_leave_or_care_5', points: 1 },
    ],
  },
  {
    id: 'adj_home_care',
    category: 'adjustment',
    label: '保護者が申込児を保育している状況は？',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_home_care_0', points: 0 },
      { label: '自宅で保育している（産休・育休中は除く）（−6）', value: 'adj_home_care_1', points: -6 },
      { label: '自宅以外で保育している（−1）', value: 'adj_home_care_2', points: -1 },
    ],
  },
  {
    id: 'adj_work_start',
    category: 'adjustment',
    label: '就労予定者の就労開始時期は？（4月1日入園予定に適用）',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_work_start_0', points: 0 },
      { label: '1月中に就労開始（+3）', value: 'adj_work_start_1', points: 3 },
      { label: '2月中に就労開始（+2）', value: 'adj_work_start_2', points: 2 },
      { label: '3月中に就労開始（+1）', value: 'adj_work_start_3', points: 1 },
    ],
  },
  {
    id: 'adj_parent_disability',
    category: 'adjustment',
    label: '保護者の障害者手帳等についてあてはまるものは？',
    helpText: '原典ではこの2つは重複適用しません',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_parent_disability_0', points: 0 },
      { label: '身体障害者手帳等3級以上で、保育に著しく負担がかかると認められる（+5）', value: 'adj_parent_disability_1', points: 5 },
      { label: '身体障害者手帳等を所持し、保育に負担がかかると認められる（+1）', value: 'adj_parent_disability_2', points: 1 },
    ],
  },
  {
    id: 'adj_family_disability',
    category: 'adjustment',
    label: '同一世帯内に全介護が必要な重度の障害を有する世帯員（申込児は除く）がいますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_family_disability_0', points: 0 },
      { label: 'はい（+2）', value: 'adj_family_disability_1', points: 2 },
    ],
  },
  {
    id: 'adj_next_leave',
    category: 'adjustment',
    label: '申込児以外の子について産休中であり、その産休明け後に続けて育児休業を取得しますか？',
    helpText: '産休と育児休業の間に有給休暇等を取得することにより、実際に勤務に復帰しない場合にも適用されます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_next_leave_0', points: 0 },
      { label: 'はい（−5）', value: 'adj_next_leave_1', points: -5 },
    ],
  },
  {
    id: 'adj_grandparent',
    category: 'adjustment',
    label: '同居の祖父母（60歳未満）が無職で、申込児の補完的な保育を行うことができる状態にありますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_grandparent_0', points: 0 },
      { label: 'はい（−6）', value: 'adj_grandparent_1', points: -6 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: '申込児以外のきょうだい（卒園予定児を除く）が在園中または同時申込中ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_0', points: 0 },
      { label: 'はい（+30）', value: 'adj_sibling_1', points: 30 },
    ],
  },
  {
    id: 'adj_outside_town',
    category: 'adjustment',
    label: '町外在住者（転入予定者を除く）で、勤務地等が町内ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_outside_town_0', points: 0 },
      { label: 'はい（−10）', value: 'adj_outside_town_1', points: -10 },
    ],
  },
  {
    id: 'adj_waiting',
    category: 'adjustment',
    label: '年度当初（4月）入所において、前年度から待機していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_waiting_0', points: 0 },
      { label: 'はい（+15）', value: 'adj_waiting_1', points: 15 },
    ],
  },
];

export const fukuchiData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
