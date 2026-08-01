import type { MunicipalityData, Question } from '../types';

// 出典: https://www.city.moriyama.lg.jp/_res/projects/default_project/_page_/001/013/244/02siori2026-2.pdf
//       （守山市「守山市保育所入所審査基準表」令和8年度）
// 守山市（滋賀県）保育所入所審査基準表（基本区分表＋区分調整項目）
// 計算方式: sum方式（原典に「上記の基準によって保護者ごとに点数を判定し、合算して基本点数と
//           します。例 父の点数が20点、母の点数が17点の場合、基本となる点数は『37点』で、
//           父親が単身赴任ならば4点を加点し『41点』が世帯の点数となります。」と明記）。
// 最高基準点: 48（父母各24＝災害の復旧）
// 注:
//  - 「妊娠・出産」は原典で父欄が「−」のため母（保護者2）のみに設定。
//  - 基本区分表の「⑧その他（福祉事務所長が特に必要と認める場合）」は、原典の※3に
//    「点数は、それぞれの状態を考慮の上、判定します」とあり固定点数がないため実装対象外。
//  - 区分調整項目は分類ごとに排他となる項目を1つの設問にまとめ、両立しうる項目
//    （ひとり親／生活保護／単身赴任、きょうだいの申込先／同時申込、祖父母／就学前児童）は
//    別の設問に分けている。
//  - 同点数内優先項目は点数化されない順位判定のため実装対象外。

const municipality = {
  id: 'moriyama',
  name: '守山市',
  slug: 'moriyama',
  prefecture: '滋賀県',
  maxBasePoints: 48,
  scoringMethod: 'sum',
} as const;

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `p${parentNum}`;
  const parentLabel = parentNum === 1 ? '父（保護者1）' : '母（保護者2）';
  const category = `parent${parentNum}_base` as const;

  const options = [
    // ①就労 被雇用者・自営業中心者
    { label: '就労（被雇用者・自営業中心者）：月20日以上かつ1日8時間以上', value: `${prefix}_emp_20_8`, points: 20 },
    { label: '就労（被雇用者・自営業中心者）：月20日以上かつ1日7時間以上8時間未満', value: `${prefix}_emp_20_7`, points: 19 },
    { label: '就労（被雇用者・自営業中心者）：月17日以上かつ1日8時間以上', value: `${prefix}_emp_17_8`, points: 17 },
    { label: '就労（被雇用者・自営業中心者）：月17日以上かつ1日7時間以上8時間未満', value: `${prefix}_emp_17_7`, points: 16 },
    { label: '就労（被雇用者・自営業中心者）：月15日以上かつ1日8時間以上', value: `${prefix}_emp_15_8`, points: 15 },
    { label: '就労（被雇用者・自営業中心者）：月15日以上かつ1日7時間以上8時間未満', value: `${prefix}_emp_15_7`, points: 14 },
    { label: '就労（被雇用者・自営業中心者）：月15日以上かつ1日6時間以上7時間未満', value: `${prefix}_emp_15_6`, points: 13 },
    { label: '就労（被雇用者・自営業中心者）：月15日以上かつ1日4時間以上6時間未満', value: `${prefix}_emp_15_4`, points: 12 },
    // ①就労 自営業協力者
    { label: '就労（自営業協力者）：月20日以上かつ1日8時間以上', value: `${prefix}_sub_20_8`, points: 16 },
    { label: '就労（自営業協力者）：月20日以上かつ1日7時間以上8時間未満', value: `${prefix}_sub_20_7`, points: 15 },
    { label: '就労（自営業協力者）：月17日以上かつ1日8時間以上', value: `${prefix}_sub_17_8`, points: 13 },
    { label: '就労（自営業協力者）：月17日以上かつ1日7時間以上8時間未満', value: `${prefix}_sub_17_7`, points: 12 },
    { label: '就労（自営業協力者）：月15日以上かつ1日8時間以上', value: `${prefix}_sub_15_8`, points: 11 },
    { label: '就労（自営業協力者）：月15日以上かつ1日7時間以上8時間未満', value: `${prefix}_sub_15_7`, points: 10 },
    { label: '就労（自営業協力者）：月15日以上かつ1日6時間以上7時間未満', value: `${prefix}_sub_15_6`, points: 9 },
    { label: '就労（自営業協力者）：月15日以上かつ1日4時間以上6時間未満', value: `${prefix}_sub_15_4`, points: 8 },
    // ①就労 内職
    { label: '内職', value: `${prefix}_naishoku`, points: 8 },
    // ③疾病・障害
    { label: '疾病：入院', value: `${prefix}_ill_hosp`, points: 20 },
    { label: '疾病：自宅療養（重度・常時臥床）', value: `${prefix}_ill_bed`, points: 20 },
    { label: '疾病：自宅療養（一般療養）', value: `${prefix}_ill_general`, points: 12 },
    { label: '障害：身障1・2級、療育A1・A2、精神1級', value: `${prefix}_dis_1`, points: 20 },
    { label: '障害：身障3級、療育B1、精神2級', value: `${prefix}_dis_2`, points: 12 },
    { label: '障害：身障4・5・6級、療育B2、精神3級', value: `${prefix}_dis_3`, points: 6 },
    // ④病人の介護・看護
    { label: '病人の介護・看護：入院している家族の付き添いを常態', value: `${prefix}_care_hosp`, points: 20 },
    { label: '病人の介護・看護：自宅療養（同居親族のみ）重度心身障害者・寝たきり老人等の介護', value: `${prefix}_care_heavy`, points: 16 },
    { label: '病人の介護・看護：自宅療養（同居親族のみ）上記以外', value: `${prefix}_care_other`, points: 8 },
    // ⑤災害の復旧
    { label: '災害の復旧：火災等による家屋の損壊、その他の災害の復旧にあたる場合', value: `${prefix}_disaster`, points: 24 },
    // ⑥求職活動等
    { label: '求職活動等：求職活動（起業の準備含む）を継続的に行っている場合', value: `${prefix}_seek`, points: 4 },
    // ⑦就学
    { label: '就学：卒業後に就労を目的とする月20日以上1日5時間以上の就学', value: `${prefix}_school_20`, points: 14 },
    { label: '就学：卒業後に就労を目的とする月15日以上1日4時間以上の就学', value: `${prefix}_school_15`, points: 12 },
    // 該当なし
    { label: '該当なし（在宅）', value: `${prefix}_none`, points: 0 },
  ];

  // ②妊娠・出産は母（保護者2）のみ（原典で父欄は「−」）
  if (parentNum === 2) {
    options.splice(17, 0,
      { label: '妊娠・出産：出産予定日から前後2ヶ月以内', value: `${prefix}_birth_2`, points: 12 },
      { label: '妊娠・出産：出産予定日から前後6ヶ月以内', value: `${prefix}_birth_6`, points: 8 },
    );
  }

  return [
    {
      id: `${prefix}_situation`,
      category,
      label: `${parentLabel}の保育を必要とする状況（基本区分）`,
      helpText:
        '最も当てはまる状況を1つ選んでください。守山市では保護者ごとに点数を判定し、合算して基本点数とします。自営業中心者とは、自営業主または自営業主でない者（専従者を含む）であって、就労時間に対して妥当な給与（最低賃金以上）が支給されている者をいいます。',
      inputType: 'select',
      options,
    },
  ];
}

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_hitorioya',
    category: 'adjustment',
    label: 'ひとり親家庭・両親がいない家庭ですか？（区分調整項目・家庭の状況）',
    inputType: 'select',
    options: [
      { label: '両親がいない家庭、またはひとり親家庭で祖父母と別居（+28点）', value: 'adj_hitorioya_bekkyo', points: 28 },
      { label: 'ひとり親家庭で祖父母と同居（+24点）', value: 'adj_hitorioya_dokyo', points: 24 },
      { label: '該当なし', value: 'adj_hitorioya_none', points: 0 },
    ],
  },
  {
    id: 'adj_seikatsuhogo',
    category: 'adjustment',
    label: '生活保護世帯ですか？（区分調整項目・家庭の状況）',
    helpText: '就労による自立につながることが見込まれる場合',
    inputType: 'radio',
    options: [
      { label: '生活保護世帯で、就労による自立につながることが見込まれる（+8点）', value: 'adj_seikatsuhogo_yes', points: 8 },
      { label: '該当なし', value: 'adj_seikatsuhogo_none', points: 0 },
    ],
  },
  {
    id: 'adj_tanshin',
    category: 'adjustment',
    label: '父親または母親が単身赴任していますか？（区分調整項目・家庭の状況）',
    inputType: 'radio',
    options: [
      { label: '父親または母親が単身赴任している（+4点）', value: 'adj_tanshin_yes', points: 4 },
      { label: '該当なし', value: 'adj_tanshin_none', points: 0 },
    ],
  },
  {
    id: 'adj_sankyu_ikukyu',
    category: 'adjustment',
    label: '産休・育休の状況（区分調整項目）',
    helpText: '最も当てはまるものを1つ選んでください',
    inputType: 'select',
    options: [
      { label: '育休取得により産後6ヶ月以内に市内保育所を退所し、育休からの復職時に再入所申込みをする（またはその児童の弟妹で、育休の対象の児童が入所申込みをする）（+11点）', value: 'adj_sankyu_ikukyu_saiensho', points: 11 },
      { label: '保護者が産休または育休から復職する（+4点）', value: 'adj_sankyu_ikukyu_fukushoku', points: 4 },
      { label: '「希望する保育所等に入所できない場合、育児休業の延長も許容できる」を選択した（-20点）', value: 'adj_sankyu_ikukyu_encho', points: -20 },
      { label: '該当なし', value: 'adj_sankyu_ikukyu_none', points: 0 },
    ],
  },
  {
    id: 'adj_kyodai_moshikomi',
    category: 'adjustment',
    label: '在籍する兄弟姉妹との申込先（区分調整項目・兄弟姉妹）',
    helpText:
      '兄姉が認定こども園守山幼稚園（長時部）に在籍している場合に、低年齢児の弟妹が入所申込みをする場合は、守山保育園を兄姉が在籍する保育所とみなします',
    inputType: 'select',
    options: [
      { label: '兄弟姉妹が在籍する保育所へ申し込む（+8点）', value: 'adj_kyodai_moshikomi_same', points: 8 },
      { label: '兄弟姉妹が在籍する保育所とは別の保育所へ申し込む（+4点）', value: 'adj_kyodai_moshikomi_other', points: 4 },
      { label: '該当なし', value: 'adj_kyodai_moshikomi_none', points: 0 },
    ],
  },
  {
    id: 'adj_kyodai_doji',
    category: 'adjustment',
    label: '兄弟姉妹の同時入所申込みですか？（区分調整項目・兄弟姉妹）',
    inputType: 'select',
    options: [
      { label: '双子（三つ子以上を含む）の兄弟姉妹が同時に入所申込みをしている（+4点）', value: 'adj_kyodai_doji_futago', points: 4 },
      { label: '双子（三つ子以上を含む）ではない兄弟姉妹が同時に入所申込みをしている（+2点）', value: 'adj_kyodai_doji_other', points: 2 },
      { label: '該当なし', value: 'adj_kyodai_doji_none', points: 0 },
    ],
  },
  {
    id: 'adj_sofubo',
    category: 'adjustment',
    label: '保育可能な祖父母の居住状況（区分調整項目・親族）',
    inputType: 'select',
    options: [
      { label: '保育可能な祖父母と同居している（-6点）', value: 'adj_sofubo_dokyo', points: -6 },
      { label: '保育可能な祖父母が近隣に居住している（-4点）', value: 'adj_sofubo_kinrin', points: -4 },
      { label: '該当なし', value: 'adj_sofubo_none', points: 0 },
    ],
  },
  {
    id: 'adj_shugakumae',
    category: 'adjustment',
    label: '申込み児童以外の就学前児童を保護者または親族が保育していますか？（区分調整項目・親族）',
    inputType: 'radio',
    options: [
      { label: '申込み児童以外の就学前児童を保護者または親族が保育する（-4点）', value: 'adj_shugakumae_yes', points: -4 },
      { label: '該当なし', value: 'adj_shugakumae_none', points: 0 },
    ],
  },
  {
    id: 'adj_tainou',
    category: 'adjustment',
    label: '保育園保育料の滞納がありますか？（区分調整項目・保育料）',
    inputType: 'select',
    options: [
      { label: '保育園保育料の滞納があり、滞納解消の見込みがない（-20点）', value: 'adj_tainou_mikomi_nashi', points: -20 },
      { label: '保育園保育料の滞納がある（-12点）', value: 'adj_tainou_ari', points: -12 },
      { label: '該当なし', value: 'adj_tainou_none', points: 0 },
    ],
  },
  {
    id: 'adj_hoikushi',
    category: 'adjustment',
    label: '保護者が保育士として勤務していますか？（区分調整項目・保育士）',
    helpText: '就労予定を含みます',
    inputType: 'select',
    options: [
      { label: '市内の保育所等で月20日以上かつ1日7時間以上の就労をしている保育士（+12点）', value: 'adj_hoikushi_shinai_20', points: 12 },
      { label: '市内の保育所等で月15日以上かつ1日4時間以上の就労をしている保育士（+8点）', value: 'adj_hoikushi_shinai_15', points: 8 },
      { label: '県内他市町の保育所等で月20日以上かつ1日7時間以上の就労をしている保育士（+6点）', value: 'adj_hoikushi_kennai_20', points: 6 },
      { label: '県内他市町の保育所等で月15日以上かつ1日4時間以上の就労をしている保育士（+4点）', value: 'adj_hoikushi_kennai_15', points: 4 },
      { label: '該当なし', value: 'adj_hoikushi_none', points: 0 },
    ],
  },
  {
    id: 'adj_riyo_jokyo',
    category: 'adjustment',
    label: '市外保育所・一時保育・認可外保育施設等を常時利用していますか？（区分調整項目・保育所等利用状況）',
    helpText: '常時利用することにより、就労している3歳児クラス以上の児童が入所申込みをする場合',
    inputType: 'radio',
    options: [
      { label: '市外保育所・一時保育・認可外保育施設等を常時利用し、3歳児クラス以上の児童が入所申込みをする（+4点）', value: 'adj_riyo_jokyo_yes', points: 4 },
      { label: '該当なし', value: 'adj_riyo_jokyo_none', points: 0 },
    ],
  },
];

export const moriyamaData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
