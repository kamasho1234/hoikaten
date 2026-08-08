import type { MunicipalityData, Question } from '../types';

// 出典: 御代田町「保育施設利用調整基準表」（令和8年度から適用）
// https://www.town.miyota.nagano.jp/file/157376.pdf
// 掲載ページ: https://www.town.miyota.nagano.jp/category/hoikuennado/170117.html
// 計算方式: min方式（原典の注記1に「保護者それぞれの状況に基づいて決定し、低い方の基準点を
//           当該世帯の基準点とする。」と明記。掲載ページにも「保護者のどちらかが20点、
//           どちらかが18点の場合、低い点数（18点）が基本点数となります」と例示）
// 最高基準点: 20
// 注:
//  - 原典注記2「申請時に育児休暇中の者は、育児休暇終了後の就労形態で基準点を判断する。」を
//    就労のhelpTextに反映。
//  - 除外: 基準点7「町長が特に必要と認める場合（児童及び保護者の状況を勘案し、別途判断する）」は
//    固定点数が定められていないため実装対象外。

const municipality = {
  id: 'miyota',
  name: '御代田町',
  slug: 'miyota',
  prefecture: '長野県',
  maxBasePoints: 20,
  scoringMethod: 'min',
} as const;

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `p${parentNum}`;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';
  const category = `parent${parentNum}_base` as const;

  return [
    {
      id: `${prefix}_situation`,
      category,
      label: `${parentLabel}の保育を必要とする状況（基準点）`,
      helpText:
        '最も当てはまるものを1つ選んでください。保護者それぞれの状況で基準点を決定し、低い方の基準点が世帯の基準点になります。申請時に育児休暇中の方は、育児休暇終了後の就労形態で基準点が判断されます。',
      inputType: 'select',
      options: [
        // 1 就労（外勤）・自営中心者・農業中心者
        { label: '就労（外勤）・自営中心者・農業中心者：月180時間以上勤務', value: `${prefix}_out_180`, points: 20 },
        { label: '就労（外勤）・自営中心者・農業中心者：月150時間以上180時間未満', value: `${prefix}_out_150`, points: 19 },
        { label: '就労（外勤）・自営中心者・農業中心者：月120時間以上150時間未満', value: `${prefix}_out_120`, points: 18 },
        { label: '就労（外勤）・自営中心者・農業中心者：月90時間以上120時間未満', value: `${prefix}_out_90`, points: 17 },
        { label: '就労（外勤）・自営中心者・農業中心者：月64時間以上90時間未満', value: `${prefix}_out_64`, points: 16 },
        // 1 就労（内勤）・自営協力者・農業協力者
        { label: '就労（内勤）・自営協力者・農業協力者：月180時間以上勤務', value: `${prefix}_in_180`, points: 18 },
        { label: '就労（内勤）・自営協力者・農業協力者：月150時間以上180時間未満', value: `${prefix}_in_150`, points: 17 },
        { label: '就労（内勤）・自営協力者・農業協力者：月120時間以上150時間未満', value: `${prefix}_in_120`, points: 16 },
        { label: '就労（内勤）・自営協力者・農業協力者：月90時間以上120時間未満', value: `${prefix}_in_90`, points: 15 },
        { label: '就労（内勤）・自営協力者・農業協力者：月64時間以上90時間未満', value: `${prefix}_in_64`, points: 14 },
        // 1 内職・求職・起業準備
        { label: '内職：フルタイム勤務相当時間の就労を常態とする', value: `${prefix}_naishoku_full`, points: 16 },
        { label: '内職：一日6時間以内の就労時間', value: `${prefix}_naishoku_6`, points: 15 },
        { label: '起業準備', value: `${prefix}_kigyo`, points: 10 },
        { label: '求職中', value: `${prefix}_seek`, points: 8 },
        // 2 出産
        { label: '出産：産前産後期間', value: `${prefix}_birth`, points: 20 },
        // 3 疾病
        { label: '疾病（入院）：おおむね一か月以上の入院', value: `${prefix}_ill_hosp`, points: 20 },
        { label: '疾病（居宅内療養）：常時寝たきり', value: `${prefix}_ill_bed`, points: 20 },
        { label: '疾病（居宅内療養）：精神性、伝染性疾患', value: `${prefix}_ill_mental`, points: 20 },
        { label: '疾病（居宅内療養）：上記以外の療養', value: `${prefix}_ill_other`, points: 14 },
        { label: '障害者手帳：身体1〜3級、精神1級', value: `${prefix}_dis_1`, points: 20 },
        { label: '障害者手帳：身体4級以下', value: `${prefix}_dis_2`, points: 12 },
        // 4 看護・介護
        { label: '看護・介護（入院付添）：一か月以上入院中の同居親族に常時付添が必要な場合', value: `${prefix}_care_dokyo`, points: 16 },
        { label: '看護・介護（入院付添）：一か月以上入院中の親族に付添が必要な場合', value: `${prefix}_care_hosp`, points: 14 },
        { label: '看護・介護（居宅内外療養）：自宅療養もしくは別居の親族の看護・介護', value: `${prefix}_care_home`, points: 14 },
        // 5 就学
        { label: '就学：保護者が就学している場合', value: `${prefix}_school`, points: 10 },
        // 6 災害
        { label: '災害：火災・風水害その他災害の復旧に当たる場合', value: `${prefix}_disaster`, points: 12 },
        // 該当なし
        { label: '該当なし（在宅）', value: `${prefix}_none`, points: 0 },
      ],
    },
  ];
}

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_hitorioya',
    category: 'adjustment',
    label: 'ひとり親世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'ひとり親世帯（+10点）', value: 'adj_hitorioya_yes', points: 10 },
      { label: '該当なし', value: 'adj_hitorioya_none', points: 0 },
    ],
  },
  {
    id: 'adj_seikatsuhogo',
    category: 'adjustment',
    label: '生活保護世帯ですか？',
    helpText: '就労により自立支援につながる場合等に適用されます。',
    inputType: 'radio',
    options: [
      { label: '生活保護世帯（+10点）', value: 'adj_seikatsuhogo_yes', points: 10 },
      { label: '該当なし', value: 'adj_seikatsuhogo_none', points: 0 },
    ],
  },
  {
    id: 'adj_shitsugyo',
    category: 'adjustment',
    label: '生活中心者が失業していますか？',
    helpText: '自己都合による失業を除きます。就労の必要性が高い場合に適用されます。',
    inputType: 'radio',
    options: [
      { label: '生活中心者の失業により就労の必要性が高い（+10点）', value: 'adj_shitsugyo_yes', points: 10 },
      { label: '該当なし', value: 'adj_shitsugyo_none', points: 0 },
    ],
  },
  {
    id: 'adj_gyakutai',
    category: 'adjustment',
    label: '虐待・DVのおそれがありますか？',
    inputType: 'radio',
    options: [
      { label: '虐待・DVの恐れがあり、保育所入所の必要性が高い（+10点）', value: 'adj_gyakutai_yes', points: 10 },
      { label: '該当なし', value: 'adj_gyakutai_none', points: 0 },
    ],
  },
  {
    id: 'adj_fukushoku',
    category: 'adjustment',
    label: '育休後の復職で、育休前に通園していた保育園等を希望しますか？',
    inputType: 'radio',
    options: [
      { label: '育休後の復職で、児童が育休前に通園していた保育園等を希望する（+10点）', value: 'adj_fukushoku_yes', points: 10 },
      { label: '該当なし', value: 'adj_fukushoku_none', points: 0 },
    ],
  },
  {
    id: 'adj_kyodai',
    category: 'adjustment',
    label: 'きょうだいの在籍状況は？',
    helpText: '同時通園となる場合は+10点、いずれかの園を利用している場合は+8点です。',
    inputType: 'select',
    options: [
      { label: '既に兄弟姉妹が在籍している（同時通園となる場合／+10点）', value: 'adj_kyodai_doji', points: 10 },
      { label: '既に兄弟姉妹がいずれかの園を利用している（+8点）', value: 'adj_kyodai_riyou', points: 8 },
      { label: '該当なし', value: 'adj_kyodai_none', points: 0 },
    ],
  },
  {
    id: 'adj_tataiji',
    category: 'adjustment',
    label: '多胎児で同時に入園しますか？',
    inputType: 'radio',
    options: [
      { label: '多胎児であり、同時に入園する（+8点）', value: 'adj_tataiji_yes', points: 8 },
      { label: '該当なし', value: 'adj_tataiji_none', points: 0 },
    ],
  },
  {
    id: 'adj_tsuen',
    category: 'adjustment',
    label: '希望園でないと通園が不可能ですか？',
    helpText: '車の免許がない等の理由による場合です。',
    inputType: 'radio',
    options: [
      { label: '希望園でないと通園不可能（+6点）', value: 'adj_tsuen_yes', points: 6 },
      { label: '該当なし', value: 'adj_tsuen_none', points: 0 },
    ],
  },
  {
    id: 'adj_fuzai',
    category: 'adjustment',
    label: '保護者の一方が不在ですか？',
    helpText: '単身赴任等の場合です。',
    inputType: 'radio',
    options: [
      { label: '保護者一方の不在（単身赴任等／+5点）', value: 'adj_fuzai_yes', points: 5 },
      { label: '該当なし', value: 'adj_fuzai_none', points: 0 },
    ],
  },
  {
    id: 'adj_hoikushi',
    category: 'adjustment',
    label: '保護者が町内の幼稚園・保育園・児童クラブへ勤務していますか？',
    inputType: 'radio',
    options: [
      { label: '保護者が町内の幼稚園、保育園、児童クラブへ勤務する（+5点）', value: 'adj_hoikushi_yes', points: 5 },
      { label: '該当なし', value: 'adj_hoikushi_none', points: 0 },
    ],
  },
  {
    id: 'adj_shorui',
    category: 'adjustment',
    label: '添付書類の不備・未提出がありますか？',
    inputType: 'radio',
    options: [
      { label: '添付書類の不備、未提出（-10点）', value: 'adj_shorui_yes', points: -10 },
      { label: '該当なし', value: 'adj_shorui_none', points: 0 },
    ],
  },
  {
    id: 'adj_nofu',
    category: 'adjustment',
    label: '保育料等の納付状況は？（基準日時点）',
    helpText: '保育料・延長保育料・副食費の納付状況に応じて減点されます。',
    inputType: 'select',
    options: [
      { label: '前月分保育料・延長保育料・副食費が納付されていない（-4点）', value: 'adj_nofu_zengetsu', points: -4 },
      { label: '前月の督促状の対象者であった（-6点）', value: 'adj_nofu_tokusoku', points: -6 },
      { label: '保育料・延長保育料・副食費滞納世帯（6月分未満／-8点）', value: 'adj_nofu_tainou_under6', points: -8 },
      { label: '保育料・延長保育料・副食費滞納世帯（6月分以上／-10点）', value: 'adj_nofu_tainou_over6', points: -10 },
      { label: '該当なし（滞納なし）', value: 'adj_nofu_none', points: 0 },
    ],
  },
];

export const miyotaData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
