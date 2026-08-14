import type { MunicipalityData, Question, QuestionOption } from '../types';

// 出典: 新富町「新富町保育の利用等に関する要綱」（平成27年12月28日告示第132号、令和5年10月23日施行）
//       別表第1「基本指数表」・別表第2「調整指数表」（令5告示137・一部改正）
// https://www1.g-reiki.net/shintomi/reiki_honbun/q628RG00000769.html
// 掲載ページ（町の保育所案内）: https://www.town.shintomi.lg.jp/soshiki/fukushi/gyomu/3/813.html
// 計算方式: sum方式
//   第3条第2項に「特定教育・保育施設の利用を希望する児童の保護者それぞれについて、
//   基本指数表(別表第1)及び調整指数表(別表第2)により合算した点数の高い児童を優先する」と明記。
//   さらに別表第1が「父」「母」の2列で構成されている（津南町・日置市と同じ表構造）。
// 最高基本指数: 20（父母各10）
// 注:
//  - 別表第1「2 妊娠・出生」は父の欄がなく母の欄のみに10が置かれているため、
//    保護者2（母）にのみ設定している。
//  - 調整指数は原典に「最も高いものを1つ」といった限定がないため、
//    項目ごとに独立した設問（重複加算あり）として実装している。
//    ただし番号11（保育料の滞納）は同一番号内の4区分から1つを選ぶ形のためselectにしている。
//  - 同点時の優先順位は第3条第3項により (1)基本指数が高い児童 (2)調整指数が高い児童 の順。

const municipality = {
  id: 'shintomi',
  name: '新富町',
  slug: 'shintomi',
  prefecture: '宮崎県',
  maxBasePoints: 20,
  scoringMethod: 'sum',
} as const;

function buildParentQuestion(parentNum: 1 | 2): Question {
  const prefix = `p${parentNum}`;
  const parentLabel = parentNum === 1 ? '父（保護者1）' : '母（保護者2）';

  const options: QuestionOption[] = [
    // 1 就労
    { label: '就労：月平均120時間以上', value: `${prefix}_work_120`, points: 10 },
    { label: '就労：月平均48時間以上120時間未満', value: `${prefix}_work_48`, points: 8 },
    { label: '内職', value: `${prefix}_naishoku`, points: 5 },
  ];

  // 2 妊娠・出生（原典は母の欄のみ）
  if (parentNum === 2) {
    options.push({
      label: '妊娠・出生：出産又は出産予定日の前後各8週間以内の必要な期間',
      value: `${prefix}_shussan`,
      points: 10,
    });
  }

  options.push(
    // 3 保護者の疾病・障害
    { label: '保護者の疾病：15日以上の入院により保育が困難', value: `${prefix}_nyuin`, points: 10 },
    { label: '保護者の疾病：通院又は15日以下の入院により保育が困難', value: `${prefix}_tsuin`, points: 8 },
    {
      label: '保護者の障害：身障手帳1〜2級、精神手帳1級、療育手帳Aを保有し、保育が困難',
      value: `${prefix}_shogai_1`,
      points: 10,
    },
    {
      label: '保護者の障害：身障手帳3級以下、精神手帳2〜3級、療育手帳B1・B2を保有し、保育が困難',
      value: `${prefix}_shogai_2`,
      points: 8,
    },
    { label: '保護者の障害：医師の診断書のみの場合', value: `${prefix}_shogai_3`, points: 6 },
    // 4 同居親族等の介護・看護
    {
      label: '同居親族等の介護・看護：15日以上の入院をする者の入院介護により、保育が困難',
      value: `${prefix}_kaigo_nyuin`,
      points: 10,
    },
    {
      label:
        '同居親族等の介護・看護：常時臥床者・重度心身障害者等（要介護認定3・4・5、身体障害者手帳1・2級、療育手帳A）の常時介護等により、保育が困難',
      value: `${prefix}_kaigo_jyudo`,
      points: 10,
    },
    { label: '同居親族等の介護・看護：上記以外（障がい者等の介護など）', value: `${prefix}_kaigo_other`, points: 8 },
    // 5 災害復旧
    { label: '災害復旧：火災等による家屋の損傷、災害の復旧活動中', value: `${prefix}_saigai`, points: 10 },
    // 6 就学・職業訓練
    { label: '就学・職業訓練：月平均120時間以上', value: `${prefix}_shugaku_120`, points: 10 },
    { label: '就学・職業訓練：月平均48時間以上120時間未満', value: `${prefix}_shugaku_48`, points: 8 },
    { label: '通信教育を受けている', value: `${prefix}_tsushin`, points: 5 },
    // 7 求職活動
    { label: '求職活動', value: `${prefix}_kyushoku`, points: 5 },
    { label: '該当なし（在宅）', value: `${prefix}_none`, points: 0 }
  );

  return {
    id: `parent${parentNum}_base`,
    category: `parent${parentNum}_base` as const,
    label: `${parentLabel}の状況（基本指数）`,
    helpText: '当てはまるものを1つ選んでください。父母それぞれの基本指数を合算した点数が世帯の基本指数になります（最高20点）。',
    inputType: 'select',
    options,
  };
}

export const shintomiData: MunicipalityData = {
  municipality,
  questions: [
    buildParentQuestion(1),
    {
      id: 'adj_single_parent',
      category: 'adjustment',
      label: 'ひとり親家庭ですか？（調整指数1）',
      inputType: 'radio',
      options: [
        { label: 'はい（ひとり親家庭／+20点）', value: 'adj_single_parent_yes', points: 20 },
        { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      ],
    },
    buildParentQuestion(2),
    {
      id: 'adj_dv',
      category: 'adjustment',
      label: '虐待やDVのおそれがある場合など、社会的養護が必要ですか？（調整指数2）',
      inputType: 'radio',
      options: [
        { label: 'はい（+20点）', value: 'adj_dv_yes', points: 20 },
        { label: '該当なし', value: 'adj_dv_none', points: 0 },
      ],
    },
    {
      id: 'adj_jido_shogai',
      category: 'adjustment',
      label: '子どもが障害を有していますか？（調整指数3）',
      inputType: 'radio',
      options: [
        { label: 'はい（+20点）', value: 'adj_jido_shogai_yes', points: 20 },
        { label: '該当なし', value: 'adj_jido_shogai_none', points: 0 },
      ],
    },
    {
      id: 'adj_seikatsuhogo',
      category: 'adjustment',
      label: '生活保護世帯ですか？（調整指数4）',
      inputType: 'radio',
      options: [
        { label: 'はい（+15点）', value: 'adj_seikatsuhogo_yes', points: 15 },
        { label: '該当なし', value: 'adj_seikatsuhogo_none', points: 0 },
      ],
    },
    {
      id: 'adj_keizoku',
      category: 'adjustment',
      label: '在園中の施設に引き続き利用申込みをしますか？（調整指数5）',
      inputType: 'radio',
      options: [
        { label: 'はい（+15点）', value: 'adj_keizoku_yes', points: 15 },
        { label: '該当なし', value: 'adj_keizoku_none', points: 0 },
      ],
    },
    {
      id: 'adj_fukushoku',
      category: 'adjustment',
      label: '育児休業を終了し、復職又は復職予定の世帯ですか？（調整指数6）',
      inputType: 'radio',
      options: [
        { label: 'はい（+10点）', value: 'adj_fukushoku_yes', points: 10 },
        { label: '該当なし', value: 'adj_fukushoku_none', points: 0 },
      ],
    },
    {
      id: 'adj_kyodai',
      category: 'adjustment',
      label: '兄弟姉妹（多胎児を含む）が同一の保育所等の利用を希望しますか？（調整指数7）',
      inputType: 'radio',
      options: [
        { label: 'はい（+10点）', value: 'adj_kyodai_yes', points: 10 },
        { label: '該当なし', value: 'adj_kyodai_none', points: 0 },
      ],
    },
    {
      id: 'adj_shokibo',
      category: 'adjustment',
      label: '小規模保育事業などの卒園児童ですか？（調整指数8）',
      inputType: 'radio',
      options: [
        { label: 'はい（+10点）', value: 'adj_shokibo_yes', points: 10 },
        { label: '該当なし', value: 'adj_shokibo_none', points: 0 },
      ],
    },
    {
      id: 'adj_shitsugyo',
      category: 'adjustment',
      label: '生活中心者の失業により就労の必要性が高いですか？（調整指数9）',
      inputType: 'radio',
      options: [
        { label: 'はい（+5点）', value: 'adj_shitsugyo_yes', points: 5 },
        { label: '該当なし', value: 'adj_shitsugyo_none', points: 0 },
      ],
    },
    {
      id: 'adj_tashi',
      category: 'adjustment',
      label:
        '保育所、幼稚園、小学校、中学校、高校、専門学校、大学等に在籍する子ども（18歳以上の者も含む）が3人以上おり、第3子以降が入所しますか？（調整指数10）',
      inputType: 'radio',
      options: [
        { label: 'はい（+5点）', value: 'adj_tashi_yes', points: 5 },
        { label: '該当なし', value: 'adj_tashi_none', points: 0 },
      ],
    },
    {
      id: 'adj_tainou',
      category: 'adjustment',
      label: '保育料の滞納がありますか？（調整指数11）',
      helpText: '複数に当てはまる場合は、最も減点の大きいものを選んでください。',
      inputType: 'select',
      options: [
        { label: '滞納なし', value: 'adj_tainou_none', points: 0 },
        { label: '現年度分で3か月以上の滞納がある（-5点）', value: 'adj_tainou_gennendo', points: -5 },
        {
          label: '在園児（又は卒園児）が理由なく過去3ヶ月以上保育料を滞納している（-5点）',
          value: 'adj_tainou_zaienji',
          points: -5,
        },
        { label: '現年度分と過年度分の両方に滞納がある（-10点）', value: 'adj_tainou_ryoho', points: -10 },
        {
          label: '保育料の滞納が6ヶ月以上あり、納付に対して誠意ある対応が見られない（-10点）',
          value: 'adj_tainou_6months',
          points: -10,
        },
      ],
    },
    {
      id: 'adj_sofubo',
      category: 'adjustment',
      label: '同居祖父母（60歳以上を除く）が保育することができますか？（調整指数12）',
      inputType: 'radio',
      options: [
        { label: 'はい（-10点）', value: 'adj_sofubo_yes', points: -10 },
        { label: '該当なし', value: 'adj_sofubo_none', points: 0 },
      ],
    },
  ],
};
