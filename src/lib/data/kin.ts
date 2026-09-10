import type { MunicipalityData, Question } from '../types';

// -------------------------------------------------------------------------
// 金武町 保育園入園 利用調整基準データ
// 出典: 金武町「利用調整基準表」別表第1（第5条関係）
// https://www.town.kin.okinawa.jp/material/files/group/6/riyoutyouseikizyunhyo.pdf
// -------------------------------------------------------------------------
// 金武町の表は「調整指数（①＋②＋③）」という式で締めくくられている。
//   ア 家庭において必要な保育を受けることが困難である事由に係る項目 …… アの合計①
//   イ 家庭において必要な保育を受けることが困難である事由に係る加算・減算 …… イの合計②
//   ウ その他の優先利用に係る加算 …… ウの合計③
// ア・イには父と母の列があり、それぞれの点数を合計するので scoringMethod は 'sum'。
// アの最大は1人あたり10点。
//
// 「就労」は「就労日数」と「就労時間（休憩時間含む）」の2つの細目に
// それぞれ点数が付くので、就労を選んだ場合は両方を尋ねて合算している。
//
// 「妊娠・出産」は父の欄が斜線なので、母のみの区分である。
//
// イは父母それぞれに加減算するので、「何人が該当するか」で点数が変わる設問にした。
//
// ウの「その他（町長が別に定める事由に該当する場合）」は点数欄が空欄なので入れていない。
// -------------------------------------------------------------------------

const municipality = {
  id: 'kin',
  name: '金武町',
  slug: 'kin',
  prefecture: '沖縄県',
  maxBasePoints: 20, // 父母各10点の合計
  scoringMethod: 'sum',
} as const;

// ア 就労（就労日数）
const workDaysOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_workdays_none`, points: 0 },
  { label: '月24日以上（週6日程度）', value: `${prefix}_workdays_0`, points: 5 },
  { label: '月20〜23日（週5日程度）', value: `${prefix}_workdays_1`, points: 4 },
  { label: '月16〜19日（週4日程度）', value: `${prefix}_workdays_2`, points: 3 },
  { label: '月16日未満（週3日程度）', value: `${prefix}_workdays_3`, points: 2 },
];

// ア 就労（就労時間・休憩時間含む）
const workHoursOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_workhours_none`, points: 0 },
  { label: '1日8時間以上', value: `${prefix}_workhours_0`, points: 5 },
  { label: '1日6時間以上8時間未満', value: `${prefix}_workhours_1`, points: 4 },
  { label: '1日4時間以上6時間未満', value: `${prefix}_workhours_2`, points: 3 },
  { label: '1日4時間未満', value: `${prefix}_workhours_3`, points: 2 },
];

// ア 妊娠・出産（母のみ）
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '妊娠中又は出産後8週間以内', value: `${prefix}_childbirth_0`, points: 8 },
];

// ア 疾病・障害等
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '入院等：疾病・負傷等により1か月以上入院している又は障害・難病等により常時病臥している', value: `${prefix}_illness_0`, points: 10 },
  { label: '障害：身体障害者手帳1・2級、精神保健福祉手帳1・2級、療育手帳A1・A2・B1等', value: `${prefix}_illness_1`, points: 10 },
  { label: '病気療養：精神疾患・感染症罹患等により長期療養中である', value: `${prefix}_illness_2`, points: 9 },
  { label: '病気療養：疾病・負傷等による療養中である（1か月以上の加療・安静を要するもの）', value: `${prefix}_illness_3`, points: 8 },
  { label: '障害：身体障害者手帳3級、精神保健福祉手帳3級、療育手帳B2等', value: `${prefix}_illness_4`, points: 7 },
  { label: '障害：身体障害者手帳4級等', value: `${prefix}_illness_5`, points: 5 },
  { label: '病気療養：比較的軽度な疾病・障害のために定期的通院が必要である', value: `${prefix}_illness_6`, points: 4 },
];

// ア 介護・看護
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '同居の親族（長期間入院等をしている親族を含む）を常時介護・看護している', value: `${prefix}_care_0`, points: 10 },
  { label: '障害児の看護又は通院・通学・通園等の介助を行っている', value: `${prefix}_care_1`, points: 8 },
  { label: '同居の親族（長期間入院等をしている親族を含む）の介護・看護に常時協力している', value: `${prefix}_care_2`, points: 7 },
  { label: '同居の親族の介護・看護を行っている（上記以外の場合）', value: `${prefix}_care_3`, points: 6 },
];

// ア 災害復旧
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '震災、風水害、火災その他の災害で被災した家屋等の復旧に当たっている', value: `${prefix}_disaster_0`, points: 10 },
];

// ア 求職活動等
const jobseekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '求職活動を継続的に行っている（職業安定所による証明等が必要。最長3か月）', value: `${prefix}_jobseeking_0`, points: 3 },
  { label: '起業準備を継続的に行っている（起業計画書等により確認をすること。最長3カ月）', value: `${prefix}_jobseeking_1`, points: 3 },
];

// ア 就学・職業訓練
const schoolOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_school_none`, points: 0 },
  { label: '週5日以上就学している又は職業訓練を受けている（1週間当たり24時間以上）', value: `${prefix}_school_0`, points: 8 },
  { label: '週3〜4日程度就学している又は職業訓練を受けている（1週間当たり24時間未満）', value: `${prefix}_school_1`, points: 7 },
];

// ア 児童虐待等
const dvOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_dv_none`, points: 0 },
  { label: '児童虐待を行っている又は再び行われるおそれがある', value: `${prefix}_dv_0`, points: 10 },
  { label: 'DV：配偶者からの暴力を受けている', value: `${prefix}_dv_1`, points: 10 },
];

// ア その他
const notLivingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_notliving_none`, points: 0 },
  { label: '児童と同居していない', value: `${prefix}_notliving_0`, points: 10 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: '調整指数は「アの合計」＋「イの合計」＋「ウの合計」です',
    inputType: 'select',
    options: [
      { label: '就労', value: `${prefix}_reason_work`, points: 0 },
      { label: '妊娠・出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '疾病・障害等', value: `${prefix}_reason_illness`, points: 0 },
      { label: '介護・看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '災害復旧', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '求職活動等', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '就学・職業訓練', value: `${prefix}_reason_school`, points: 0 },
      { label: '児童虐待等', value: `${prefix}_reason_dv`, points: 0 },
      { label: 'その他（児童と同居していない）', value: `${prefix}_reason_notliving`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_workdays`,
      category,
      label: `${parentLabel}の1か月の就労日数は？`,
      helpText: '金武町の就労は「就労日数」と「就労時間」の合計です',
      inputType: 'radio',
      options: workDaysOptions(prefix),
      showFor: ['work'],
    },
    {
      id: `${prefix}_workhours`,
      category,
      label: `${parentLabel}の1日の就労時間は？`,
      helpText: '休憩時間を含みます',
      inputType: 'radio',
      options: workHoursOptions(prefix),
      showFor: ['work'],
    },
    {
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}の妊娠・出産の状況は？`,
      helpText: '原典では母のみに点数が付く区分です',
      inputType: 'radio',
      options: childbirthOptions(prefix),
    },
    {
      id: `${prefix}_illness`,
      category,
      label: `${parentLabel}の疾病・障害等の状況は？`,
      inputType: 'radio',
      options: illnessOptions(prefix),
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
      label: `${parentLabel}は災害復旧に当たっていますか？`,
      inputType: 'radio',
      options: disasterOptions(prefix),
    },
    {
      id: `${prefix}_jobseeking`,
      category,
      label: `${parentLabel}の求職活動等の状況は？`,
      inputType: 'radio',
      options: jobseekingOptions(prefix),
    },
    {
      id: `${prefix}_school`,
      category,
      label: `${parentLabel}の就学・職業訓練の状況は？`,
      inputType: 'radio',
      options: schoolOptions(prefix),
    },
    {
      id: `${prefix}_dv`,
      category,
      label: `${parentLabel}の世帯は児童虐待等にあたりますか？`,
      inputType: 'radio',
      options: dvOptions(prefix),
    },
    {
      id: `${prefix}_notliving`,
      category,
      label: `${parentLabel}は児童と同居していませんか？`,
      inputType: 'radio',
      options: notLivingOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// イ 加算・減算（父母それぞれ） ＋ ウ その他の優先利用に係る加算（世帯）
const adjustmentQuestions: Question[] = [
  {
    id: 'adj_unemployed',
    category: 'adjustment',
    label: '主として生計を維持する保護者が失業し、就労の必要性が高いですか？',
    helpText: '原典では父母それぞれに加算されます',
    inputType: 'select',
    options: [
      { label: 'あてはまらない', value: 'adj_unemployed_0', points: 0 },
      { label: '1人が該当（+6）', value: 'adj_unemployed_1', points: 6 },
      { label: '2人とも該当（+12）', value: 'adj_unemployed_2', points: 12 },
    ],
  },
  {
    id: 'adj_hoikushi',
    category: 'adjustment',
    label: '町内の保育所等又は放課後児童クラブで保育士等又は放課後児童支援員として就労する保護者は何人いますか？',
    inputType: 'select',
    options: [
      { label: 'いない', value: 'adj_hoikushi_0', points: 0 },
      { label: '1人（+5）', value: 'adj_hoikushi_1', points: 5 },
      { label: '2人（+10）', value: 'adj_hoikushi_2', points: 10 },
    ],
  },
  {
    id: 'adj_return_to_work',
    category: 'adjustment',
    label: '育児休業を終了し、復職する保護者は何人いますか？',
    inputType: 'select',
    options: [
      { label: 'いない', value: 'adj_return_to_work_0', points: 0 },
      { label: '1人（+4）', value: 'adj_return_to_work_1', points: 4 },
      { label: '2人（+8）', value: 'adj_return_to_work_2', points: 8 },
    ],
  },
  {
    id: 'adj_two_places',
    category: 'adjustment',
    label: '就労又は就学の場所が2か所以上あり、アの就労等の時間に含めていない保護者は何人いますか？',
    inputType: 'select',
    options: [
      { label: 'いない', value: 'adj_two_places_0', points: 0 },
      { label: '1人（+2）', value: 'adj_two_places_1', points: 2 },
      { label: '2人（+4）', value: 'adj_two_places_2', points: 4 },
    ],
  },
  {
    id: 'adj_work_at_home',
    category: 'adjustment',
    label: '主な就労場所が自宅である保護者は何人いますか？',
    inputType: 'select',
    options: [
      { label: 'いない', value: 'adj_work_at_home_0', points: 0 },
      { label: '1人（−2）', value: 'adj_work_at_home_1', points: -2 },
      { label: '2人（−4）', value: 'adj_work_at_home_2', points: -4 },
    ],
  },
  {
    id: 'adj_self_employed',
    category: 'adjustment',
    label: '自営業者等（家族従業者を除く）で、事業等による収入があることが確認できない保護者は何人いますか？',
    inputType: 'select',
    options: [
      { label: 'いない', value: 'adj_self_employed_0', points: 0 },
      { label: '1人（−4）', value: 'adj_self_employed_1', points: -4 },
      { label: '2人（−8）', value: 'adj_self_employed_2', points: -8 },
    ],
  },
  {
    id: 'adj_leave_extension',
    category: 'adjustment',
    label: '希望する施設・事業所に入園できない場合は、育児休業の延長も許容できますか？',
    helpText: '原典では父母それぞれに減算されます',
    inputType: 'select',
    options: [
      { label: 'いいえ', value: 'adj_leave_extension_0', points: 0 },
      { label: '1人が許容できる（−30）', value: 'adj_leave_extension_1', points: -30 },
      { label: '2人とも許容できる（−60）', value: 'adj_leave_extension_2', points: -60 },
    ],
  },
  {
    id: 'adj_child_status',
    category: 'adjustment',
    label: '児童の状況であてはまるものは？',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_child_status_0', points: 0 },
      { label: '虐待又はDVのおそれがあり、社会的養護が必要な児童（+50）', value: 'adj_child_status_1', points: 50 },
      { label: '里親に委託されている児童（+10）', value: 'adj_child_status_2', points: 10 },
      { label: '地域型保育事業の卒園児童（+10）', value: 'adj_child_status_3', points: 10 },
      { label: '町内の保育所等を利用する児童の弟妹であって、兄姉と同一の保育所等の利用を希望する児童（+10）', value: 'adj_child_status_4', points: 10 },
      { label: '障害児（+8）', value: 'adj_child_status_5', points: 8 },
    ],
  },
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_0', points: 0 },
      { label: 'はい（+10）', value: 'adj_single_parent_1', points: 10 },
    ],
  },
  {
    id: 'adj_many_children',
    category: 'adjustment',
    label: '多子世帯（小学校就学前の児童が3人以上）ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_many_children_0', points: 0 },
      { label: 'はい（+5）', value: 'adj_many_children_1', points: 5 },
    ],
  },
];

export const kinData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
