import type { MunicipalityData, Question } from '../types';

// 出典: 狛江市「令和8年度 入園のしおり」P28-31
//         「11 保育所等利用調整基準指数表」「12 調整指数表」
//       https://komae-kosodate.net/fs/9/1/1/6/_/_P28_____________________.pdf
//       （全体版: https://komae-kosodate.net/fs/9/1/0/7/_/04__8____________.pdf）
//       掲載ページ: https://komae-kosodate.net/download/2544.html
//       狛江市保育の実施事務取扱要領（平成10年10月21日市長決裁、最終改正 令和7年8月22日）
//         第16条・第18条、別表第1（調整指数表）
//       https://ops-jg.d1-law.com/opensearch/?jctcd=8CDA186958
// 計算方式: sum方式
//   要領第18条「利用調整基準指数から調整指数を増減して得た数値を父母の利用調整基準指数とし、
//   世帯の利用調整基準指数は、父の利用調整基準指数と母の利用調整基準指数とを合算したものに、
//   更に調整指数を増減して得た数値とする」と明記されている。
//   別表第1 備考2・3により、調整指数は
//     ・番号1〜16、21、22、25 → 世帯の利用調整基準指数を増減
//     ・番号17〜20、23、24    → 父母の利用調整基準指数を増減
//   と適用先が分かれるため、後者は保護者ごとの設問として実装している。
// 最高基準指数: 50（父母各25）
// 注:
//  - 基準指数表 備考1「基準指数は、保護者それぞれどれかひとつにしか当てはまりません」のため単一select。
//  - 「就学等」は備考2により外勤の基準指数を準用するため、労働と同じ6段階に展開している。
//  - 「上記のほか、市長が明らかに保育を必要と認める場合」は備考3で実施基準番号1〜7を準用すると
//    定められており固定点数がないため、選択肢に含めていない。
//  - 就労時間には通勤時間を含まず、休憩時間を含む（備考4）。
//  - 調整指数1〜5は備考4「いずれかの調整指数を適用する」のため単一select。
//  - 調整指数17〜19は備考9「父母それぞれにおいていずれかの調整指数を適用する」のため単一select。
//  - 調整指数10・14・15・21・22は相互に適用ルールが定められている（備考7「10に該当する場合は
//    14を適用しない」、備考12「22に該当する場合は10及び21を適用しない」、備考13「10、15及び21、
//    又は14及び21に該当する場合は全ての指数を適用する」）ため、成立する組み合わせを
//    ひとつのselectとして列挙している。
//  - 備考6「調整指数番号9又は11に該当する場合で14に該当するときは、14を適用する」は
//    設問をまたぐ条件のため helpText で案内している。
//  - 利用調整は世帯の利用調整基準指数10以上の者が対象（要領第19条第2項）。
//    年度途中の転園は30以上の者が対象（要領第30条第1項第3号）。

const municipality = {
  id: 'komae',
  name: '狛江市',
  slug: 'komae',
  prefecture: '東京都',
  maxBasePoints: 50,
  scoringMethod: 'sum',
} as const;

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `p${parentNum}`;
  const parentLabel = parentNum === 1 ? '父（保護者1）' : '母（保護者2）';
  const category = `parent${parentNum}_base` as const;

  const baseOptions = [
    // 3 不存在
    { label: '不存在：死別・離婚・行方不明・拘禁・未婚', value: `${prefix}_absent`, points: 25 },
    { label: '別居：離婚を前提とした別居', value: `${prefix}_bekkyo`, points: 20 },
    // 4 出産・疾病・障がい
    { label: '入院：1月以上の入院', value: `${prefix}_hosp`, points: 25 },
    { label: '居宅内療養：常時病臥・感染症', value: `${prefix}_ill_byoga`, points: 25 },
    { label: '居宅内療養：精神性の疾病で精神障害者保健福祉手帳3級程度以上', value: `${prefix}_ill_mental3`, points: 25 },
    { label: '居宅内療養：精神性の疾病で上記以外の程度', value: `${prefix}_ill_mental_other`, points: 18 },
    { label: '居宅内療養：上記以外の疾病で安静を要する状態', value: `${prefix}_ill_rest`, points: 18 },
    { label: '居宅内療養：上記以外の疾病で通院加療を要する状態', value: `${prefix}_ill_tsuin`, points: 15 },
    { label: '障がい：身体障害者手帳2級（内部・聴覚3級）以上、精神障害者保健福祉手帳3級以上、愛の手帳所持、要介護1以上', value: `${prefix}_dis_2`, points: 25 },
    { label: '障がい：身体障害者手帳3・4級、要支援', value: `${prefix}_dis_34`, points: 18 },
    { label: '障がい：身体障害者手帳5級以下', value: `${prefix}_dis_5`, points: 10 },
    { label: '出産：出産前後の休養のため保育に当たることができない場合', value: `${prefix}_birth`, points: 15 },
    // 6 災害
    { label: '災害：火災等による家屋の損傷その他災害復旧のため（発生から6月以内）', value: `${prefix}_disaster`, points: 25 },
    // 5 介護
    { label: '居宅外介護：週5日以上、日中週30時間以上の付添い・居宅外介護', value: `${prefix}_care_out_5`, points: 21 },
    { label: '居宅内介護：重度心身障害者等の全介護（常時目が離せず、日中全く保育に当たれない場合）', value: `${prefix}_care_in_juudo`, points: 21 },
    { label: '居宅外介護：週4日以上、日中週20時間以上の付添い・居宅外介護', value: `${prefix}_care_out_4`, points: 15 },
    { label: '居宅内介護：常時観察（知的障がい・精神性疾病・認知症等の見守りを含む）と介護（食事・排せつ・入浴等）を必要とする場合', value: `${prefix}_care_in_joji`, points: 15 },
    { label: '居宅外介護：週3日以上、日中週12時間以上の付添い・居宅外介護', value: `${prefix}_care_out_3`, points: 10 },
    { label: '居宅内介護：上記以外の場合', value: `${prefix}_care_in_other`, points: 8 },
    // 1 労働（外勤・在宅勤務・居宅外自営・居宅内自営）
    { label: '労働：週5日以上勤務し、週40時間以上の就労を常態', value: `${prefix}_work_5_40`, points: 20 },
    { label: '労働：週5日以上勤務し、週35時間以上の就労を常態', value: `${prefix}_work_5_35`, points: 17 },
    { label: '労働：週4日以上勤務し、週30時間以上の就労を常態', value: `${prefix}_work_4_30`, points: 14 },
    { label: '労働：週4日以上勤務し、週25時間以上の就労を常態', value: `${prefix}_work_4_25`, points: 12 },
    { label: '労働：週3日以上勤務し、週20時間以上の就労を常態', value: `${prefix}_work_3_20`, points: 10 },
    { label: '労働：週3日以上勤務し、週12時間以上の就労を常態', value: `${prefix}_work_3_12`, points: 8 },
    // 2 内職
    { label: '内職：週4日以上、日中週30時間以上の就労を常態', value: `${prefix}_naishoku_4`, points: 10 },
    { label: '内職：週3日以上、日中週12時間以上の就労を常態', value: `${prefix}_naishoku_3`, points: 8 },
    // 7 その他（就学等は外勤の基準指数を準用）
    { label: '就学等：週5日以上、週40時間以上に相当する就学・通所', value: `${prefix}_school_5_40`, points: 20 },
    { label: '就学等：週5日以上、週35時間以上に相当する就学・通所', value: `${prefix}_school_5_35`, points: 17 },
    { label: '就学等：週4日以上、週30時間以上に相当する就学・通所', value: `${prefix}_school_4_30`, points: 14 },
    { label: '就学等：週4日以上、週25時間以上に相当する就学・通所', value: `${prefix}_school_4_25`, points: 12 },
    { label: '就学等：週3日以上、週20時間以上に相当する就学・通所', value: `${prefix}_school_3_20`, points: 10 },
    { label: '就学等：週3日以上、週12時間以上に相当する就学・通所', value: `${prefix}_school_3_12`, points: 8 },
    { label: '求職：求職活動のため、日中外出を常態', value: `${prefix}_seek`, points: 5 },
    // 該当なし
    { label: '該当なし（在宅）', value: `${prefix}_none`, points: 0 },
  ];

  return [
    {
      id: `${prefix}_situation`,
      category,
      label: `${parentLabel}の状況（基準指数）`,
      helpText:
        '当てはまる項目を1つ選んでください（基準指数は保護者それぞれどれかひとつにしか当てはまりません）。就労時間には通勤時間を含まず、休憩時間を含みます。「就学等」は外勤の基準指数を準用します。なお「市長が明らかに保育を必要と認める場合」は実施基準番号1〜7を準用するため選択肢に含めていません。',
      inputType: 'select',
      options: baseOptions,
    },
    {
      id: `${prefix}_adj_shippei`,
      category,
      label: `${parentLabel}に疾病・障がいがありますか？（調整指数17〜19）`,
      helpText:
        '実施基準番号1（労働）、2（内職）、5（介護）、6（災害）又は7（その他。求職を除く）に該当する場合に適用されます。父母それぞれにおいて、いずれか1つが適用されます。',
      inputType: 'select',
      options: [
        { label: '身体障害者手帳4級以上、精神障害者保健福祉手帳、愛の手帳所持又は要介護認定（要支援を含む）を受けている（+4点）', value: `${prefix}_adj_shippei_techo`, points: 4 },
        { label: '東京都が指定する難病又は精神性の疾患である（+4点）', value: `${prefix}_adj_shippei_nanbyo`, points: 4 },
        { label: '身体障害者手帳5級以下所持又は上記以外の通院加療中の疾患があり、保育に著しく負担がかかる（+2点）', value: `${prefix}_adj_shippei_5`, points: 2 },
        { label: '該当なし', value: `${prefix}_adj_shippei_none`, points: 0 },
      ],
    },
    {
      id: `${prefix}_adj_chofuku`,
      category,
      label: `${parentLabel}は複数の事由が重複していますか？（調整指数20）`,
      helpText:
        '実施基準番号1（労働）、2（内職）、5（介護）又は7（その他）がそれぞれ重複しており、就労・介護・就学又は求職の時間が制限されている場合が対象です。実施基準番号1及び2は重複とみなしません。',
      inputType: 'radio',
      options: [
        { label: '該当する（+3点）', value: `${prefix}_adj_chofuku_yes`, points: 3 },
        { label: '該当なし', value: `${prefix}_adj_chofuku_none`, points: 0 },
      ],
    },
    {
      id: `${prefix}_adj_naitei`,
      category,
      label: `${parentLabel}は就労内定者ですか？（調整指数23）`,
      helpText: '入所日の翌月1日までに就業を開始する場合に限ります。',
      inputType: 'radio',
      options: [
        { label: '就労内定者である（-1点）', value: `${prefix}_adj_naitei_yes`, points: -1 },
        { label: '該当なし', value: `${prefix}_adj_naitei_none`, points: 0 },
      ],
    },
    {
      id: `${prefix}_adj_shugaku`,
      category,
      label: `${parentLabel}は就学中ですか？（調整指数24）`,
      helpText: '実施基準番号7（その他）に該当する場合に限ります。',
      inputType: 'radio',
      options: [
        { label: '就学中である（-2点）', value: `${prefix}_adj_shugaku_yes`, points: -2 },
        { label: '該当なし', value: `${prefix}_adj_shugaku_none`, points: 0 },
      ],
    },
  ];
}

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親世帯・生活保護世帯に該当しますか？（調整指数1〜5）',
    helpText: '調整指数1から5に該当する場合は、いずれか1つの調整指数が適用されます。',
    inputType: 'select',
    options: [
      { label: '父母がいない又はひとり親世帯で保育を行える同居親族等がいない：生活保護世帯（+20点）', value: 'adj_single_parent_hogo', points: 20 },
      { label: '父母がいない又はひとり親世帯で保育を行える同居親族等がいない：市民税非課税世帯（+18点）', value: 'adj_single_parent_hikazei', points: 18 },
      { label: '父母がいない又はひとり親世帯で保育を行える同居親族等がいない：上記以外の場合（+15点）', value: 'adj_single_parent_other', points: 15 },
      { label: '生活保護世帯（ひとり親世帯を除く）（+13点）', value: 'adj_single_parent_hogo_only', points: 13 },
      { label: 'ひとり親世帯で保育を行える同居親族等がいる（+10点）', value: 'adj_single_parent_with', points: 10 },
      { label: '該当なし', value: 'adj_single_parent_none', points: 0 },
    ],
  },
  {
    id: 'adj_takuji_kyodai',
    category: 'adjustment',
    label: '有償での託児・きょうだい同園希望・保育士就労のいずれかに該当しますか？（調整指数10・14・15・21・22）',
    helpText:
      '原典ではこれらの項目に適用ルールが定められています（10に該当する場合は14を適用しない／22に該当する場合は10及び21を適用しない／10・15及び21、又は14及び21に該当する場合は全ての指数を適用する）。成立する組み合わせを選択肢にしています。託児は育児休業取得中・求職中・復職予定を除き、週3日以上かつ週12時間以上の場合に限ります。保育士加点は実施基準番号1に該当し、かつ新規入所申請の場合に限ります。',
    inputType: 'select',
    options: [
      { label: '保育士として従事し、かつきょうだいと同じ保育所等を希望する（14＋21／+6点）', value: 'adj_takuji_kyodai_14_21', points: 6 },
      { label: '保育士として従事し、有償で託児中、かつきょうだいと同じ保育所等を希望する（10＋15＋21／+6点）', value: 'adj_takuji_kyodai_10_15_21', points: 6 },
      { label: 'きょうだいと同じ保育所等を希望する（14／+4点）', value: 'adj_takuji_kyodai_14', points: 4 },
      { label: '認可外保育施設・一時保育・ベビーシッター等に有償で託児中、かつきょうだいと同じ保育所等を希望する（10＋15／+4点）', value: 'adj_takuji_kyodai_10_15', points: 4 },
      { label: '認可外保育施設・一時保育・ベビーシッター等に有償で託児を開始している（10／+3点）', value: 'adj_takuji_kyodai_10', points: 3 },
      { label: '保育士として従事し、かつ有償で託児を開始している（22／+3点）', value: 'adj_takuji_kyodai_22', points: 3 },
      { label: '保育士として認可保育所・認定こども園・地域型保育事業・認可外保育施設・企業主導型保育事業に従事している（21／+2点）', value: 'adj_takuji_kyodai_21', points: 2 },
      { label: '該当なし', value: 'adj_takuji_kyodai_none', points: 0 },
    ],
  },
  {
    id: 'adj_tennyu_youchien',
    category: 'adjustment',
    label: '市外からの転入または幼稚園在園に該当しますか？（調整指数9・11）',
    helpText:
      'きょうだいと同じ保育所等を希望する場合（調整指数14）に該当するときは、こちらではなく14が適用されます。',
    inputType: 'select',
    options: [
      { label: '市外からの転入（予定）者で、遠距離のため前住所地の認可保育所・認定こども園・地域型保育事業施設に通所が困難になった（+2点）', value: 'adj_tennyu_youchien_tennyu', points: 2 },
      { label: '申込児が幼稚園に在園している（+1点）', value: 'adj_tennyu_youchien_youchien', points: 1 },
      { label: '該当なし', value: 'adj_tennyu_youchien_none', points: 0 },
    ],
  },
  {
    id: 'adj_haien',
    category: 'adjustment',
    label: '廃園・認可移行等により継続通所が不可能になりますか？（調整指数12）',
    helpText: '調整指数9から11まで又は22のいずれかに該当する場合に適用されます（退園する月の翌月以降の入所について適用）。',
    inputType: 'radio',
    options: [
      { label: '該当する（+1点）', value: 'adj_haien_yes', points: 1 },
      { label: '該当なし', value: 'adj_haien_none', points: 0 },
    ],
  },
  {
    id: 'adj_ko_shogai',
    category: 'adjustment',
    label: '申込児に中程度以下の障がいがありますか？（調整指数13）',
    helpText: '身体障害者手帳又は療育手帳を有している場合が対象です。',
    inputType: 'radio',
    options: [
      { label: '該当する（+3点）', value: 'adj_ko_shogai_yes', points: 3 },
      { label: '該当なし', value: 'adj_ko_shogai_none', points: 0 },
    ],
  },
  {
    id: 'adj_shitsugyo',
    category: 'adjustment',
    label: '生計中心者の失業により就労の必要性が高いですか？（調整指数6）',
    inputType: 'radio',
    options: [
      { label: '該当する（+2点）', value: 'adj_shitsugyo_yes', points: 2 },
      { label: '該当なし', value: 'adj_shitsugyo_none', points: 0 },
    ],
  },
  {
    id: 'adj_tanshin',
    category: 'adjustment',
    label: '保護者のいずれかが単身赴任または別居していますか？（調整指数8）',
    helpText: '該当する実施基準番号に応じた理由による場合が対象です。離婚を前提とするもの、家庭内暴力等による別居は除きます。',
    inputType: 'radio',
    options: [
      { label: '入所希望日時点において単身赴任又は別居している（+2点）', value: 'adj_tanshin_yes', points: 2 },
      { label: '該当なし', value: 'adj_tanshin_none', points: 0 },
    ],
  },
  {
    id: 'adj_sofubo',
    category: 'adjustment',
    label: '同居親族等（20歳以上65歳未満）が無職で補完的に保育を行えますか？（調整指数7）',
    helpText: 'ひとり親世帯を除きます。',
    inputType: 'radio',
    options: [
      { label: '該当する（-3点）', value: 'adj_sofubo_yes', points: -3 },
      { label: '該当なし', value: 'adj_sofubo_none', points: 0 },
    ],
  },
  {
    id: 'adj_tainou',
    category: 'adjustment',
    label: '入所の申込時に利用者負担額等の滞納がありますか？（調整指数16）',
    inputType: 'radio',
    options: [
      { label: '滞納がある（-5点）', value: 'adj_tainou_yes', points: -5 },
      { label: '該当なし', value: 'adj_tainou_none', points: 0 },
    ],
  },
  {
    id: 'adj_jitai',
    category: 'adjustment',
    label: '過去に入所内定を辞退しましたか？（調整指数25）',
    inputType: 'radio',
    options: [
      { label: '入所内定を辞退した（-3点）', value: 'adj_jitai_yes', points: -3 },
      { label: '該当なし', value: 'adj_jitai_none', points: 0 },
    ],
  },
];

export const komaeData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
