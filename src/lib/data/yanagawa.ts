import type { MunicipalityData, Question } from '../types';

// 出典: 柳川市「保育所・認定こども園（保育所部分）利用のしおり」P.9「柳川市保育施設利用調整指数表」
// https://www.city.yanagawa.fukuoka.jp/fs/3/9/3/6/1/_/kosodate20260410094901.pdf
// 計算方式: min方式（原典の注記に「保護者それぞれに点数をつけ（必要＋加点）、
//           そのうちの合計得点が低い方を対象児童の得点とする。」と明記）
// 最高基本指数（必要）: 300（災害復旧・虐待DV）
// 注:
//  - 原典「※同一保護者で、必要事由の類型の該当項目が2つ以上になった場合には、必要点数の高い方を
//    適用する。」のため、（必要）は単一selectで実装。
//  - 原典「※加点の項目に複数該当する場合は、それぞれの点数を加算する。」のため加点は個別設問。
//  - 加点のうち世帯・児童の属性によるもの（加点1〜8および広域入所）は父母双方に等しく加算される
//    ため、低い方を採る前に加算しても後に加算しても結果は同じ。実装上はadjustmentに置いている。
//    一方、加点9のうち「保育士としての就労」「勤務先が市内の保育所」は保護者個人の属性のため、
//    原典どおり保護者ごとの点数として実装している。
//  - 除外: （必要）10「その他（児童福祉の観点から福祉事務所長が特に保育の必要性が高いと判断した
//    場合・里親も含む／300点）」および「※世帯の状況が、この分類表の点数により難い場合は、福祉
//    事務所長の判断により加点減点を行う。」は、いずれも福祉事務所長の個別判断のため実装対象外。

const municipality = {
  id: 'yanagawa',
  name: '柳川市',
  slug: 'yanagawa',
  prefecture: '福岡県',
  maxBasePoints: 300,
  scoringMethod: 'min',
} as const;

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `p${parentNum}`;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';
  const category = `parent${parentNum}_base` as const;

  return [
    {
      id: `${prefix}_hitsuyo`,
      category,
      label: `${parentLabel}の保育を必要とする事由（点数表「必要」）`,
      helpText:
        '最も当てはまるものを1つ選んでください。同一保護者で該当項目が2つ以上になった場合は、必要点数の高い方が適用されます。（必要）項目に点数がない場合は保育所等を利用できません。また（必要）項目が10点以下の場合は入所の決定が遅くなります。',
      inputType: 'select',
      options: [
        // 1 就労
        { label: '就労：月120時間以上', value: `${prefix}_work_120`, points: 80 },
        { label: '就労：月60時間以上120時間未満', value: `${prefix}_work_60`, points: 50 },
        { label: '就労：自営業・農漁業等で就労の実態が確認できない場合（月に60時間以上の就労が必要）', value: `${prefix}_work_jiei_noproof`, points: 10 },
        // 2 妊娠出産
        { label: '妊娠出産：入所児童の弟妹が、産前8週〜1才になる月の末日まで', value: `${prefix}_birth`, points: 80 },
        // 3 疾病・障害（保護者本人）
        { label: '疾病・障害：診断書、障害者手帳（身体1〜3級、精神1〜2級、療育A・B）', value: `${prefix}_ill_heavy`, points: 80 },
        { label: '疾病・障害：身体障害者手帳4〜6級、精神手帳3級', value: `${prefix}_ill_light`, points: 10 },
        // 4 介護・看護
        { label: '介護・看護：診断書、要介護、障害者手帳（身体1〜3級、精神1〜2級、療育A・B）', value: `${prefix}_care_heavy`, points: 80 },
        { label: '介護・看護：要支援、身体障害者手帳4〜6級、精神手帳3級', value: `${prefix}_care_light`, points: 10 },
        // 5 災害復旧
        { label: '災害復旧', value: `${prefix}_disaster`, points: 300 },
        // 6 求職活動
        { label: '求職活動（誓約書／保育必要量は短時間）', value: `${prefix}_seek`, points: 10 },
        // 7 就学
        { label: '就学', value: `${prefix}_school`, points: 80 },
        // 8 虐待・DV
        { label: '虐待・DV（証明書あり）', value: `${prefix}_dv`, points: 300 },
        // 9 育児休業
        { label: '育児休業：育児休業中の弟妹のいる入所児童（保育必要量は短時間）', value: `${prefix}_ikukyu`, points: 40 },
        // 該当なし
        { label: '該当なし（在宅）', value: `${prefix}_none`, points: 0 },
      ],
    },
    {
      id: `${prefix}_hoikushi`,
      category,
      label: `${parentLabel}は保育士等として就労していますか？（加点9 その他市町村が定める事由）`,
      helpText:
        '原典で加点は保護者ごとに付き、（必要＋加点）の合計が低い方が対象児童の得点になります。そのため、この加点は該当する保護者の点数にのみ加算されます。市外在住児童は加点対象外です。',
      inputType: 'select',
      options: [
        { label: '保育士として就労している（+300点）', value: `${prefix}_hoikushi_yes`, points: 300 },
        { label: '勤務先が柳川市内の保育所（調理員など／+200点）', value: `${prefix}_hoikushi_shinai`, points: 200 },
        { label: '該当なし', value: `${prefix}_hoikushi_none`, points: 0 },
      ],
    },
  ];
}

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_hitorioya',
    category: 'adjustment',
    label: 'ひとり親家庭ですか？（加点1）',
    inputType: 'radio',
    options: [
      { label: 'ひとり親家庭（+35点）', value: 'adj_hitorioya_yes', points: 35 },
      { label: '該当なし', value: 'adj_hitorioya_none', points: 0 },
    ],
  },
  {
    id: 'adj_seikatsuhogo',
    category: 'adjustment',
    label: '生活保護世帯ですか？（加点2）',
    inputType: 'radio',
    options: [
      { label: '生活保護世帯（+1点）', value: 'adj_seikatsuhogo_yes', points: 1 },
      { label: '該当なし', value: 'adj_seikatsuhogo_none', points: 0 },
    ],
  },
  {
    id: 'adj_shitsugyo',
    category: 'adjustment',
    label: '生計中心者が失業していますか？（加点3）',
    inputType: 'radio',
    options: [
      { label: '生計中心者の失業（+40点）', value: 'adj_shitsugyo_yes', points: 40 },
      { label: '該当なし', value: 'adj_shitsugyo_none', points: 0 },
    ],
  },
  {
    id: 'adj_gyakutai',
    category: 'adjustment',
    label: '虐待・DVについて相談していますか？（加点4）',
    helpText: '相談係からの相談がある場合に適用されます。',
    inputType: 'radio',
    options: [
      { label: '虐待・DV（相談係からの相談あり／+15点）', value: 'adj_gyakutai_yes', points: 15 },
      { label: '該当なし', value: 'adj_gyakutai_none', points: 0 },
    ],
  },
  {
    id: 'adj_shogaiji',
    category: 'adjustment',
    label: '在宅障害児（者）のいる世帯ですか？（加点5）',
    inputType: 'select',
    options: [
      { label: '在宅障害児（者）世帯（証明書あり）に準ずる場合（+35点）', value: 'adj_shogaiji_shomei', points: 35 },
      { label: '在宅障害児（者）世帯（証明書なし）、児童発達支援施設へ通園（+20点）', value: 'adj_shogaiji_nashi', points: 20 },
      { label: '該当なし', value: 'adj_shogaiji_none', points: 0 },
    ],
  },
  {
    id: 'adj_ikukyu_ake',
    category: 'adjustment',
    label: '育児休業明けですか？（加点6）',
    helpText: '育休から復帰する場合に適用されます。',
    inputType: 'radio',
    options: [
      { label: '育児休業明け（育休復帰する場合／+10点）', value: 'adj_ikukyu_ake_yes', points: 10 },
      { label: '該当なし', value: 'adj_ikukyu_ake_none', points: 0 },
    ],
  },
  {
    id: 'adj_kyodai',
    category: 'adjustment',
    label: '兄弟同時利用ですか？（加点7）',
    inputType: 'radio',
    options: [
      { label: '兄弟同時利用（+30点）', value: 'adj_kyodai_yes', points: 30 },
      { label: '該当なし', value: 'adj_kyodai_none', points: 0 },
    ],
  },
  {
    id: 'adj_shokibo',
    category: 'adjustment',
    label: '小規模保育等の卒園児ですか？（加点8）',
    inputType: 'radio',
    options: [
      { label: '小規模保育等卒園児（+20点）', value: 'adj_shokibo_yes', points: 20 },
      { label: '該当なし', value: 'adj_shokibo_none', points: 0 },
    ],
  },
  {
    id: 'adj_koiki',
    category: 'adjustment',
    label: '広域入所（他市町村民）ですか？（加点9）',
    helpText:
      '原典の注記により、受託（市外在住）の児童については加点1〜8が適用されません。このシミュレーターでは加点1〜8を自動では無効化しないため、市外在住の場合は加点1〜8を「該当なし」にしてご利用ください。',
    inputType: 'radio',
    options: [
      { label: '広域入所（他市町村民／-75点）', value: 'adj_koiki_yes', points: -75 },
      { label: '該当なし', value: 'adj_koiki_none', points: 0 },
    ],
  },
];

export const yanagawaData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
