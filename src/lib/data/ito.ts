import type { MunicipalityData, Question } from '../types';

// 出典: https://www.city.ito.shizuoka.jp/material/files/group/27/R8tyoseikijyun.pdf
//       （令和8年度伊東市保育所等入所調整基準）
// 伊東市 保育所等入所調整基準（基本点数＋調整点数）
// 計算方式: sum方式（世帯の点数＝父の基本点数＋母の基本点数＋調整点数）
// 最高基本点数: 20（父母各10）
// 注: 妊娠・出産は原典で父「－」母のみ点数が定められているため、母（保護者2）の選択肢にのみ設定。
//     虐待・DV/災害復旧など父母共通点数の事由は父母双方に設定。
//     「その他（市長が認める）」は個別判断のため除外。

const municipality = {
  id: 'ito',
  name: '伊東市',
  slug: 'ito',
  prefecture: '静岡県',
  maxBasePoints: 20,
  scoringMethod: 'sum',
} as const;

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `p${parentNum}`;
  const parentLabel = parentNum === 1 ? '父（保護者1）' : '母（保護者2）';
  const category = `parent${parentNum}_base` as const;

  const options = [
    // 1. 就労（月間就労時間）
    { label: '就労：月150時間（週37.5時間）以上の就労を常態', value: `${prefix}_work_150h`, points: 10 },
    { label: '就労：月140時間（週35時間）以上の就労を常態', value: `${prefix}_work_140h`, points: 9 },
    { label: '就労：月120時間（週30時間）以上の就労を常態', value: `${prefix}_work_120h`, points: 8 },
    { label: '就労：月100時間（週25時間）以上の就労を常態', value: `${prefix}_work_100h`, points: 7 },
    { label: '就労：月80時間（週20時間）以上の就労を常態', value: `${prefix}_work_80h`, points: 6 },
    { label: '就労：月60時間（週15時間）以上の就労を常態', value: `${prefix}_work_60h`, points: 5 },
    // 2. 妊娠・出産（母のみ ※後段で母だけに追加）
    // 3. 疾病・障がい
    { label: '疾病：1月以上の入院または自宅での常時臥床の状態', value: `${prefix}_ill_hosp`, points: 10 },
    { label: '疾病：安静を要する自宅療養が必要であると診断される場合', value: `${prefix}_ill_home`, points: 8 },
    { label: '障がい：身体障害者手帳1〜2級／療育手帳A／精神障害者保健福祉手帳1級', value: `${prefix}_dis_12`, points: 10 },
    { label: '障がい：身体障害者手帳3級／療育手帳B／精神障害者保健福祉手帳2級', value: `${prefix}_dis_3`, points: 8 },
    { label: '障がい：身体障害者手帳4級', value: `${prefix}_dis_4`, points: 7 },
    { label: '疾病・障がい：上記に類するもので保育が困難と認められる場合', value: `${prefix}_illdis_other`, points: 5 },
    // 4. 介護・看護
    { label: '介護・看護：1月以上の常時付添い（疾病の親族等）', value: `${prefix}_care_att`, points: 9 },
    { label: '介護・看護：週3日以上の通院等の付き添い', value: `${prefix}_care_visit`, points: 7 },
    { label: '介護・看護：要介護5〜4／療育手帳A／身体1〜2級／精神1級の親族の介護', value: `${prefix}_care_dis_h`, points: 9 },
    { label: '介護・看護：要介護3〜2／療育手帳B／身体3級／精神2級の親族の介護', value: `${prefix}_care_dis_m`, points: 7 },
    { label: '介護・看護：上記に類するもので保育が困難と認められる場合', value: `${prefix}_care_other`, points: 5 },
    // 5. 就学
    { label: '就学：学校教育法に規定する学校に就学している場合', value: `${prefix}_school`, points: 8 },
    { label: '就学：公共職業訓練施設等で職業訓練を受けている場合', value: `${prefix}_training`, points: 8 },
    { label: '就学：上記についてオンライン等の通信制で行う場合', value: `${prefix}_school_online`, points: 3 },
    // 6. 求職活動
    { label: '求職活動：求職活動を継続的に行っている場合', value: `${prefix}_seek`, points: 3 },
    // 7. 災害復旧
    { label: '災害復旧：地震・風水害・火災等の災害復旧に従事している場合', value: `${prefix}_disaster`, points: 10 },
    // 8. 虐待・DV
    { label: '虐待・DV：虐待やDVのおそれがあると認められる場合', value: `${prefix}_dv`, points: 10 },
    // 該当なし
    { label: '該当なし（在宅）', value: `${prefix}_none`, points: 0 },
  ];

  // 妊娠・出産は母（保護者2）のみ（原典で父は「－」）
  if (parentNum === 2) {
    options.splice(6, 0,
      { label: '妊娠・出産：妊娠中又は出産後間もないこと（出産予定月の前後2か月以内）', value: `${prefix}_birth`, points: 7 },
      { label: '妊娠・出産：医師の診断に基づき安静・加療が必要な場合', value: `${prefix}_birth_rest`, points: 10 },
    );
  }

  return [
    {
      id: `${prefix}_situation`,
      category,
      label: `${parentLabel}の就労・保育が必要な事由`,
      helpText: '最も当てはまる状況を1つ選んでください（父母それぞれの基本点数を合算します）',
      inputType: 'select',
      options,
    },
  ];
}

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親世帯ですか？（調整点数）',
    helpText: '未婚・死別・離別・拘禁・行方不明等',
    inputType: 'radio',
    options: [
      { label: 'ひとり親世帯（+12点）', value: 'adj_single_parent_yes', points: 12 },
      { label: '該当なし', value: 'adj_single_parent_none', points: 0 },
    ],
  },
  {
    id: 'adj_seikatsuhogo',
    category: 'adjustment',
    label: '生活保護世帯ですか？（調整点数）',
    inputType: 'radio',
    options: [
      { label: '生活保護世帯（+3点）', value: 'adj_seikatsuhogo_yes', points: 3 },
      { label: '該当なし', value: 'adj_seikatsuhogo_none', points: 0 },
    ],
  },
  {
    id: 'adj_tanshin',
    category: 'adjustment',
    label: '保護者が単身赴任をしていますか？（調整点数）',
    inputType: 'radio',
    options: [
      { label: '単身赴任をしている（+1点）', value: 'adj_tanshin_yes', points: 1 },
      { label: '該当なし', value: 'adj_tanshin_none', points: 0 },
    ],
  },
  {
    id: 'adj_hoikushi',
    category: 'adjustment',
    label: '保護者が保育士として市内の保育施設等に従事していますか？（調整点数）',
    inputType: 'select',
    options: [
      { label: '父母の両方が保育士として市内の保育施設等に従事（+10点）', value: 'adj_hoikushi_both', points: 10 },
      { label: '父母のどちらか一方が保育士として市内の保育施設等に従事（+5点）', value: 'adj_hoikushi_one', points: 5 },
      { label: '該当なし', value: 'adj_hoikushi_none', points: 0 },
    ],
  },
  {
    id: 'adj_ikuji',
    category: 'adjustment',
    label: '育児休業に関する状況（調整点数）',
    inputType: 'select',
    options: [
      { label: '育児休業明けの復帰である場合（+2点）', value: 'adj_ikuji_return', points: 2 },
      { label: '育児休業の延長を目的とした入所申込みである場合（-30点）', value: 'adj_ikuji_encho', points: -30 },
      { label: '該当なし', value: 'adj_ikuji_none', points: 0 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: 'きょうだいの状況（調整点数）',
    inputType: 'select',
    options: [
      { label: '兄弟姉妹が保育所等に在園している場合（+2点）', value: 'adj_sibling_enrolled', points: 2 },
      { label: '兄弟（双子を含む）で同時に申し込む場合（+1点）', value: 'adj_sibling_twins', points: 1 },
      { label: '該当なし', value: 'adj_sibling_none', points: 0 },
    ],
  },
  {
    id: 'adj_shokibo',
    category: 'adjustment',
    label: '小規模保育事業の卒園児童ですか？（調整点数）',
    inputType: 'radio',
    options: [
      { label: '小規模保育事業の卒園児童（+5点）', value: 'adj_shokibo_yes', points: 5 },
      { label: '該当なし', value: 'adj_shokibo_none', points: 0 },
    ],
  },
  {
    id: 'adj_tenyu_ninka',
    category: 'adjustment',
    label: '転入前の市区町村で認可保育所等を利用していましたか？（調整点数）',
    inputType: 'radio',
    options: [
      { label: '転入前の市区町村で認可保育所等を利用していた（+2点）', value: 'adj_tenyu_ninka_yes', points: 2 },
      { label: '該当なし', value: 'adj_tenyu_ninka_none', points: 0 },
    ],
  },
  {
    id: 'adj_jiko_jitai',
    category: 'adjustment',
    label: '申込年度内に自己都合による入所辞退をしましたか？（調整点数）',
    inputType: 'radio',
    options: [
      { label: '申込年度内に自己都合による入所辞退をした（-3点）', value: 'adj_jiko_jitai_yes', points: -3 },
      { label: '該当なし', value: 'adj_jiko_jitai_none', points: 0 },
    ],
  },
  {
    id: 'adj_tenen',
    category: 'adjustment',
    label: '転園に関する状況（調整点数）',
    inputType: 'select',
    options: [
      { label: '兄弟姉妹が在園している保育所等に転園を希望する場合（+2点）', value: 'adj_tenen_sibling', points: 2 },
      { label: '自己都合による転園の場合（-3点）', value: 'adj_tenen_jiko', points: -3 },
      { label: '該当なし（転園ではない）', value: 'adj_tenen_none', points: 0 },
    ],
  },
  {
    id: 'adj_other_city',
    category: 'adjustment',
    label: '他市に住民票がある世帯ですか？（調整点数）',
    helpText: '転入予定を除く',
    inputType: 'radio',
    options: [
      { label: '他市に住民票がある世帯（転入予定を除く）（-10点）', value: 'adj_other_city_yes', points: -10 },
      { label: '該当なし', value: 'adj_other_city_none', points: 0 },
    ],
  },
  {
    id: 'adj_overdue',
    category: 'adjustment',
    label: '3月以上の利用者負担額（保育料）の滞納がありますか？（調整点数）',
    inputType: 'radio',
    options: [
      { label: '3月以上の保育料の滞納がある世帯（-5点）', value: 'adj_overdue_yes', points: -5 },
      { label: '該当なし', value: 'adj_overdue_none', points: 0 },
    ],
  },
];

export const itoData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
