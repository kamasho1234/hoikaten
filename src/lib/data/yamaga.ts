import type { MunicipalityData, Question } from '../types';

// 出典: 山鹿市「山鹿市保育所等入所基準指数表」（R8.4.1〜）
// https://www.city.yamaga.kumamoto.jp/kosodate/kiji0031016/3_1016_10560_up_oetbgaab.pdf
// 掲載ページ: https://www.city.yamaga.kumamoto.jp/kosodate/kiji0031016/index.html
// 計算方式: sum方式（採点結果欄が「父」「母」の2列で構成され、表末尾に父母の点数を合計する
//           「合計」欄が設けられていることから父母合算構造。日置市と同じ「表構造からの帰結」）
// 最高基本指数: 40（父母各20＝「両親のいない家庭」）
// 注:
//  - 「妊娠・出産」「育児休業取得中」は原典の父欄が斜線（母のみ）のため保護者2にのみ設定。
//  - 「自営・専従者給与の方の就労状況が確認できる資料の提出がない場合には、対象者の指数を
//    各-4点とする」は保護者ごとの減算のため、保護者ごとの独立設問として実装。
//  - 就労の「ひと月の勤務時間等」には通勤時間を含まない（外勤・自営業・農業）。
//  - 除外:
//    ・補助指数「児童福祉の観点から、保育の緊急性が高く、特に優先して入所させる必要がある場合
//      （20）」は市の個別判断のため対象外。
//    ・補助指数「潜在待機者（転園を除く）※1か月毎（1）」は月数により変動するため対象外。
//    ・補助指数「聞き取り調査により育児休業延長希望の者で申込をしてきた場合 指数を0にして調整」は
//      加減算ではなく指数を0にする処理のため対象外（helpTextで案内）。

const municipality = {
  id: 'yamaga',
  name: '山鹿市',
  slug: 'yamaga',
  prefecture: '熊本県',
  maxBasePoints: 40,
  scoringMethod: 'sum',
} as const;

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `p${parentNum}`;
  const parentLabel = parentNum === 1 ? '父（保護者1）' : '母（保護者2）';
  const category = `parent${parentNum}_base` as const;

  const options = [
    // 居宅内・居宅外労働（予定含む）外勤・自営業・農業
    { label: '外勤・自営業・農業：ひと月の勤務時間160時間以上', value: `${prefix}_work_160`, points: 10 },
    { label: '外勤・自営業・農業：ひと月の勤務時間140時間以上160時間未満', value: `${prefix}_work_140`, points: 9 },
    { label: '外勤・自営業・農業：ひと月の勤務時間120時間以上140時間未満', value: `${prefix}_work_120`, points: 8 },
    { label: '外勤・自営業・農業：ひと月の勤務時間100時間以上120時間未満', value: `${prefix}_work_100`, points: 7 },
    { label: '外勤・自営業・農業：ひと月の勤務時間64時間以上100時間未満', value: `${prefix}_work_64`, points: 6 },
    // 内職・在宅ワーク
    { label: '内職・在宅ワーク：64時間以上かつ月収60,000円以上', value: `${prefix}_naishoku_60000`, points: 6 },
    { label: '内職・在宅ワーク：64時間以上かつ月収不明', value: `${prefix}_naishoku_fumei`, points: 5 },
    // 夜間就労
    { label: '夜間就労：64時間以上', value: `${prefix}_yakan`, points: 6 },
    // 妊娠・出産（母のみ。下でparent1から除外）
    { label: '妊娠・出産：出産前3ヶ月〜産後1年', value: `${prefix}_birth`, points: 8 },
    { label: '育児休業取得中', value: `${prefix}_ikukyu`, points: 6 },
    // 保護者の疾病・障がい等
    { label: '入院：疾病等により、おおむね1ヶ月以上入院している者', value: `${prefix}_ill_hosp`, points: 10 },
    { label: '自宅療養：疾病等により、おおむね1ヶ月以上常時臥床している者', value: `${prefix}_ill_bed`, points: 9 },
    { label: '自宅療養：精神疾患により、長期加療・安静を要すると医師が診断した者', value: `${prefix}_ill_mental`, points: 8 },
    { label: '自宅療養：1ヶ月以上安静を要すると医師が診断した者', value: `${prefix}_ill_rest`, points: 6 },
    { label: '障がい：身体障害者手帳1級・2級、療育手帳A1、精神障害者保健福祉手帳1級', value: `${prefix}_dis_1`, points: 10 },
    { label: '障がい：身体障害者手帳3級、療育手帳A2、精神障害者保健福祉手帳2級', value: `${prefix}_dis_2`, points: 7 },
    { label: '障がい：身体障害者手帳4級以下、療育手帳B1・B2、精神障害者保健福祉手帳3級', value: `${prefix}_dis_3`, points: 5 },
    // 病人の看護等
    { label: '居宅内看護：同居の家族の長期居宅療養等で常時介護にあたっている者', value: `${prefix}_kango_home`, points: 8 },
    { label: '障がい看護：心身に障害のある家族の常時観察と介護にあたっている者', value: `${prefix}_kango_dis`, points: 8 },
    { label: '入院付添：おおむね1ヶ月以上、家族の入院付添いにあたっている者', value: `${prefix}_kango_hosp`, points: 4 },
    { label: '病院等への送迎：同居の家族等の病院・施設への送迎にあたっている者', value: `${prefix}_kango_soge`, points: 4 },
    // 家屋の災害
    { label: '家屋の災害：火災・風水害・地震等による被害の復旧にあたっている者', value: `${prefix}_disaster`, points: 10 },
    // その他
    { label: '就学：就学、技能習得のため、日中保育をすることができない者', value: `${prefix}_school`, points: 7 },
    { label: '求職中：日中、求職活動を行う者', value: `${prefix}_seek`, points: 4 },
    // 両親のいない家庭
    { label: '両親のいない家庭：死亡・行方不明・拘禁などの理由により、両親がいない家庭', value: `${prefix}_absent`, points: 20 },
    // 該当なし
    { label: '該当なし（在宅）', value: `${prefix}_none`, points: 0 },
  ].filter((o) => parentNum === 2 || !(o.value.endsWith('_birth') || o.value.endsWith('_ikukyu')));

  return [
    {
      id: `${prefix}_situation`,
      category,
      label: `${parentLabel}の状況（基本指数）`,
      helpText:
        parentNum === 2
          ? '最も当てはまるものを1つ選んでください。外勤・自営業・農業のひと月の勤務時間には通勤時間を含みません。就労時間が月64時間未満の場合は入所不可となります。'
          : '最も当てはまるものを1つ選んでください。外勤・自営業・農業のひと月の勤務時間には通勤時間を含みません。就労時間が月64時間未満の場合は入所不可となります。妊娠・出産と育児休業取得中は原典の父欄が斜線（母のみ）のため、保護者2（母）の選択肢にのみ設けています。',
      inputType: 'select',
      options,
    },
    {
      id: `${prefix}_jiei_shorui`,
      category,
      label: `${parentLabel}は自営・専従者給与で就労状況の資料を提出できますか？`,
      helpText:
        '原典では「自営・専従者給与の方の就労状況が確認できる資料の提出がない場合には、対象者の指数を各-4点とする」と定められています。',
      inputType: 'radio',
      options: [
        { label: '自営・専従者給与で、就労状況が確認できる資料を提出できない（-4点）', value: `${prefix}_jiei_shorui_nashi`, points: -4 },
        { label: '該当なし（提出できる、または自営・専従者給与ではない）', value: `${prefix}_jiei_shorui_none`, points: 0 },
      ],
    },
  ];
}

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_hitorioya',
    category: 'adjustment',
    label: 'ひとり親世帯ですか？（補助指数）',
    helpText: 'ひとり親世帯またはそれに準ずる世帯（別居中かつ離婚調停中）が対象です。',
    inputType: 'radio',
    options: [
      { label: 'ひとり親世帯またはそれに準ずる世帯（+15点）', value: 'adj_hitorioya_yes', points: 15 },
      { label: '該当なし', value: 'adj_hitorioya_none', points: 0 },
    ],
  },
  {
    id: 'adj_hoikushi',
    category: 'adjustment',
    label: '保護者が保育士資格を有し市内保育園等で勤務しますか？（補助指数）',
    inputType: 'radio',
    options: [
      { label: '保護者が保育士資格を有し、山鹿市内保育園等で勤務する（+15点）', value: 'adj_hoikushi_yes', points: 15 },
      { label: '該当なし', value: 'adj_hoikushi_none', points: 0 },
    ],
  },
  {
    id: 'adj_sotsuen',
    category: 'adjustment',
    label: '3歳未満児のみの受け入れを行う施設を卒園する児童ですか？（補助指数）',
    inputType: 'radio',
    options: [
      { label: '3歳未満児のみの受け入れを行う施設を卒園する児童（+12点）', value: 'adj_sotsuen_yes', points: 12 },
      { label: '該当なし', value: 'adj_sotsuen_none', points: 0 },
    ],
  },
  {
    id: 'adj_kyodai',
    category: 'adjustment',
    label: 'きょうだいの利用・申込状況は？（補助指数）',
    inputType: 'select',
    options: [
      { label: '兄・姉が既に市内認可保育施設を利用中で、同じ施設に弟・妹の入園申込をする（+10点）', value: 'adj_kyodai_riyou', points: 10 },
      { label: 'きょうだい同時新規入所（転園含む）申込（+5点）', value: 'adj_kyodai_doji', points: 5 },
      { label: '該当なし', value: 'adj_kyodai_none', points: 0 },
    ],
  },
  {
    id: 'adj_tenen',
    category: 'adjustment',
    label: '市内転園を希望しますか？（補助指数）',
    helpText:
      '「3歳未満児のみの受け入れを行う施設を卒園する児童」「他校区から自校区の施設への転園を希望する3歳以上児」の場合は、本人及びその弟妹を除きます（減点対象外）。',
    inputType: 'radio',
    options: [
      { label: '市内転園を希望する（-3点）', value: 'adj_tenen_yes', points: -3 },
      { label: '該当なし', value: 'adj_tenen_none', points: 0 },
    ],
  },
  {
    id: 'adj_tainou',
    category: 'adjustment',
    label: '保育料等の滞納がありますか？（補助指数）',
    helpText:
      'なお原典では「聞き取り調査により育児休業延長希望の者で申込をしてきた場合、指数を0にして調整」とされています。これは加減算ではなく指数自体を0にする扱いのため、本シミュレーターでは計算に含めていません。',
    inputType: 'radio',
    options: [
      { label: '滞納がある世帯（-5点）', value: 'adj_tainou_yes', points: -5 },
      { label: '該当なし', value: 'adj_tainou_none', points: 0 },
    ],
  },
];

export const yamagaData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
