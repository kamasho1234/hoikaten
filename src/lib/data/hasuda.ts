import type { MunicipalityData, Question } from '../types';

// 出典: https://www.city.hasuda.saitama.jp/kodomo/kosodate/hoikuen/nyuen/documents/r8tebiki.pdf
//       （令和8年度 蓮田市 保育所等利用申込みの手引き P.17-18／保育所等利用調整基準表）
// 蓮田市 保育所等利用調整基準表（実施基準＋新規申込者の調整基準）
// 計算方式: sum方式（備考①「父母それぞれの指数を算出し、合算した点数を世帯の実施指数とする」）。
// 最高実施指数: 20（父母各10）
// 注:
//  - 番号4「同居親族等の介護・看護」（5〜10）および番号7「就学（職業訓練校等）」（5〜10）は
//    「就労・自営の基準に準じた指数」のため独立点数を持たず、就労・自営の該当区分を選択する運用（helpText）。
//  - 番号6「就労内定・起業予定」および番号7「就学内定」は「就労基準から1を減じた指数」のため、
//    就労・自営基準-1の区分（就労・就学内定）として設定。
//  - 番号2「妊娠・出産」は母（保護者2）のみに設定。
//  - 調整番号11「要支援世帯（特に調整が必要とされる場合）」は個別判断のため除外。

const municipality = {
  id: 'hasuda',
  name: '蓮田市',
  slug: 'hasuda',
  prefecture: '埼玉県',
  maxBasePoints: 20,
  scoringMethod: 'sum',
} as const;

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `p${parentNum}`;
  const parentLabel = parentNum === 1 ? '父（保護者1）' : '母（保護者2）';
  const category = `parent${parentNum}_base` as const;

  const options = [
    // 就労・自営
    { label: '就労・自営：週40時間以上の就労を常態', value: `${prefix}_work_40`, points: 10 },
    { label: '就労・自営：週35時間以上の就労を常態', value: `${prefix}_work_35`, points: 9 },
    { label: '就労・自営：週30時間以上の就労を常態', value: `${prefix}_work_30`, points: 8 },
    { label: '就労・自営：週25時間以上の就労を常態', value: `${prefix}_work_25`, points: 7 },
    { label: '就労・自営：週20時間以上の就労を常態', value: `${prefix}_work_20`, points: 6 },
    { label: '就労・自営：週16時間以上の就労を常態', value: `${prefix}_work_16`, points: 5 },
    // 内職
    { label: '内職：週35時間以上の就労を常態', value: `${prefix}_naishoku_35`, points: 6 },
    { label: '内職：週25時間以上の就労を常態', value: `${prefix}_naishoku_25`, points: 5 },
    { label: '内職：週16時間以上の就労を常態', value: `${prefix}_naishoku_16`, points: 4 },
    // 就労・就学内定（就労・自営基準から1を減じた指数）
    { label: '就労・就学内定：週40時間以上相当の就労・就学が内定', value: `${prefix}_naitei_40`, points: 9 },
    { label: '就労・就学内定：週35時間以上相当の就労・就学が内定', value: `${prefix}_naitei_35`, points: 8 },
    { label: '就労・就学内定：週30時間以上相当の就労・就学が内定', value: `${prefix}_naitei_30`, points: 7 },
    { label: '就労・就学内定：週25時間以上相当の就労・就学が内定', value: `${prefix}_naitei_25`, points: 6 },
    { label: '就労・就学内定：週20時間以上相当の就労・就学が内定', value: `${prefix}_naitei_20`, points: 5 },
    { label: '就労・就学内定：週16時間以上相当の就労・就学が内定', value: `${prefix}_naitei_16`, points: 4 },
    // 求職中
    { label: '求職中（就労先未定）', value: `${prefix}_seek`, points: 3 },
    // 妊娠・出産（母のみ ※後段で母だけに追加）
    // 疾病
    { label: '疾病：入院若しくは入院に相当する治療又は安静を要する自宅療養で常に病臥', value: `${prefix}_ill_hosp`, points: 10 },
    { label: '疾病：精神疾患', value: `${prefix}_ill_mental`, points: 10 },
    { label: '疾病：自宅療養で週3日以上の通院を常態', value: `${prefix}_ill_visit3`, points: 8 },
    { label: '疾病：自宅療養で週1〜2日以上の通院を常態', value: `${prefix}_ill_visit1`, points: 6 },
    // 障がい
    { label: '障がい：身体障害者手帳1〜2級／精神障害者保健福祉手帳1〜3級／療育手帳Ⓐ・A', value: `${prefix}_dis_12`, points: 10 },
    { label: '障がい：身体障害者手帳3級／療育手帳B・C', value: `${prefix}_dis_3`, points: 9 },
    { label: '障がい：身体障害者手帳4級以下', value: `${prefix}_dis_4`, points: 7 },
    // 災害復旧
    { label: '災害復旧：震災・風水害・火災その他の災害の復旧に従事', value: `${prefix}_disaster`, points: 10 },
    // 虐待・DV
    { label: '虐待・DV：児童虐待防止法第2条又は配偶者暴力防止法第1条の対象者', value: `${prefix}_dv`, points: 10 },
    // 不存在
    { label: '不存在：死亡・行方不明・拘禁・離婚（離婚調停中を含む）等', value: `${prefix}_absence`, points: 10 },
    // 該当なし
    { label: '該当なし（在宅）', value: `${prefix}_none`, points: 0 },
  ];

  // 妊娠・出産は母（保護者2）のみ
  if (parentNum === 2) {
    options.splice(16, 0,
      { label: '妊娠・出産：出産予定日の前後8週間（市内在住）', value: `${prefix}_birth_in`, points: 10 },
      { label: '妊娠・出産：出産予定日の前後8週間（市外からの里帰り出産）', value: `${prefix}_birth_out`, points: 8 },
    );
  }

  return [
    {
      id: `${prefix}_situation`,
      category,
      label: `${parentLabel}の就労・保育が必要な事由`,
      helpText: '最も当てはまる状況を1つ選んでください（父母それぞれの指数を合算します）。同居親族等の介護・看護、職業訓練校・専門学校・大学等への就学の方は、就労・自営と同じ時間区分（週40時間以上＝10点等）を選んでください。',
      inputType: 'select',
      options,
    },
  ];
}

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_shitsugyo',
    category: 'adjustment',
    label: '生計中心者が失業していますか？（調整指数）',
    helpText: '倒産・解雇等によるもの。自己都合の場合は適用しません。',
    inputType: 'radio',
    options: [
      { label: '生計中心者の失業（倒産・解雇等）（+6点）', value: 'adj_shitsugyo_yes', points: 6 },
      { label: '該当なし', value: 'adj_shitsugyo_none', points: 0 },
    ],
  },
  {
    id: 'adj_tanshin',
    category: 'adjustment',
    label: '父母のいずれかが単身赴任・入院等で3か月以上不在ですか？（調整指数）',
    inputType: 'radio',
    options: [
      { label: '父母のいずれかが単身赴任、入院等の理由により3か月以上不在（予定を含む）（+1点）', value: 'adj_tanshin_yes', points: 1 },
      { label: '該当なし', value: 'adj_tanshin_none', points: 0 },
    ],
  },
  {
    id: 'adj_ikuji_chu',
    category: 'adjustment',
    label: '産前産後休暇中・育児休業中ですか？（調整指数）',
    inputType: 'radio',
    options: [
      { label: '産前産後休暇中・育児休業取得中（同一年度内に育休終了）又は自営業のみなし育休取得中（+1点）', value: 'adj_ikuji_chu_yes', points: 1 },
      { label: '該当なし', value: 'adj_ikuji_chu_none', points: 0 },
    ],
  },
  {
    id: 'adj_ikuji_saien',
    category: 'adjustment',
    label: '育児休業による一時退所からの再利用希望ですか？（調整指数）',
    inputType: 'radio',
    options: [
      { label: '育児休業の取得により一時退所した児童が育児休業明けに再度利用を希望（+3点）', value: 'adj_ikuji_saien_yes', points: 3 },
      { label: '該当なし', value: 'adj_ikuji_saien_none', points: 0 },
    ],
  },
  {
    id: 'adj_shogai',
    category: 'adjustment',
    label: '保護者の障害者手帳の所持状況（調整指数）',
    inputType: 'select',
    options: [
      { label: '保護者が身体障害者手帳3級以上、精神障害者保健福祉手帳又は療育手帳を所持（+3点）', value: 'adj_shogai_h', points: 3 },
      { label: '保護者が身体障害者手帳4級以下を所持（+1点）', value: 'adj_shogai_l', points: 1 },
      { label: '該当なし', value: 'adj_shogai_none', points: 0 },
    ],
  },
  {
    id: 'adj_hoikushi',
    category: 'adjustment',
    label: '保護者が市内保育所等で保育士等として就労していますか？（調整指数）',
    inputType: 'radio',
    options: [
      { label: '保護者が市内保育所等で保育士又は保育教諭として週25時間以上就労（予定を含む）（+5点）', value: 'adj_hoikushi_yes', points: 5 },
      { label: '該当なし', value: 'adj_hoikushi_none', points: 0 },
    ],
  },
  {
    id: 'adj_single',
    category: 'adjustment',
    label: 'ひとり親世帯・両親不存在の状況（調整指数）',
    inputType: 'select',
    options: [
      { label: 'ひとり親世帯（同居の親族がいない）又は両親不存在（+10点）', value: 'adj_single_alone', points: 10 },
      { label: 'ひとり親世帯（同居の親族がいる）（+8点）', value: 'adj_single_with', points: 8 },
      { label: '該当なし', value: 'adj_single_none', points: 0 },
    ],
  },
  {
    id: 'adj_seikatsuhogo',
    category: 'adjustment',
    label: '生活保護世帯ですか？（調整指数）',
    inputType: 'radio',
    options: [
      { label: '生活保護世帯（+5点）', value: 'adj_seikatsuhogo_yes', points: 5 },
      { label: '該当なし', value: 'adj_seikatsuhogo_none', points: 0 },
    ],
  },
  {
    id: 'adj_kyodai',
    category: 'adjustment',
    label: '兄弟姉妹が同一の保育所等の利用を希望していますか？（調整指数）',
    inputType: 'radio',
    options: [
      { label: '兄弟姉妹（多胎児を含む）が同一の保育所等の利用を希望（+1点）', value: 'adj_kyodai_yes', points: 1 },
      { label: '該当なし', value: 'adj_kyodai_none', points: 0 },
    ],
  },
  {
    id: 'adj_tennyu',
    category: 'adjustment',
    label: '転入者が他市町村の保育所等を利用中ですか？（調整指数）',
    inputType: 'radio',
    options: [
      { label: '転入者（予定者を含む）が、他市町村の保育所等を利用（+6点）', value: 'adj_tennyu_yes', points: 6 },
      { label: '該当なし', value: 'adj_tennyu_none', points: 0 },
    ],
  },
  {
    id: 'adj_chiiki',
    category: 'adjustment',
    label: '地域型保育事業等の卒園児ですか？（調整指数）',
    inputType: 'select',
    options: [
      { label: '地域型保育事業等を卒園する児童で、かつ連携施設を第一希望とする（+25点）', value: 'adj_chiiki_renkei', points: 25 },
      { label: '地域型保育事業等を卒園する児童（+20点）', value: 'adj_chiiki_yes', points: 20 },
      { label: '該当なし', value: 'adj_chiiki_none', points: 0 },
    ],
  },
  {
    id: 'adj_yotaku',
    category: 'adjustment',
    label: '保育所等に入れないため月10日以上他の方法で保育していますか？（調整指数）',
    helpText: '別居の親族等に預託／職場に同行／認可外保育施設を利用／一時預かり事業を利用',
    inputType: 'radio',
    options: [
      { label: '保育所等に入れないことを理由として、いずれかの方法で月10日以上保育（+1点）', value: 'adj_yotaku_yes', points: 1 },
      { label: '該当なし', value: 'adj_yotaku_none', points: 0 },
    ],
  },
  {
    id: 'adj_kodomoen',
    category: 'adjustment',
    label: '認定こども園の幼稚園部分から保育部分への利用希望ですか？（調整指数）',
    inputType: 'radio',
    options: [
      { label: '認定こども園（幼稚園部分）を利用しているものが、同園の保育部分の利用を希望（+1点）', value: 'adj_kodomoen_yes', points: 1 },
      { label: '該当なし', value: 'adj_kodomoen_none', points: 0 },
    ],
  },
  {
    id: 'adj_sofubo',
    category: 'adjustment',
    label: '同居の祖父母（60歳未満）が無職で補完的な保育が可能ですか？（調整指数）',
    inputType: 'radio',
    options: [
      { label: '同居の祖父母（60歳未満）が無職で、入所希望児童の補完的な保育が可能（-3点）', value: 'adj_sofubo_yes', points: -3 },
      { label: '該当なし', value: 'adj_sofubo_none', points: 0 },
    ],
  },
  {
    id: 'adj_overdue',
    category: 'adjustment',
    label: '保育料等を3か月分以上滞納していますか？（調整指数）',
    inputType: 'radio',
    options: [
      { label: '正当な理由なく保育園保育料・延長保育料・副食費・学童保育料・おやつ代を3か月分以上滞納（-10点）', value: 'adj_overdue_yes', points: -10 },
      { label: '該当なし', value: 'adj_overdue_none', points: 0 },
    ],
  },
  {
    id: 'adj_jitai',
    category: 'adjustment',
    label: '入所内定後に自己都合で辞退したことがありますか？（調整指数）',
    inputType: 'radio',
    options: [
      { label: '入所内定後に、自己都合により辞退した場合（一回につき）（-1点）', value: 'adj_jitai_yes', points: -1 },
      { label: '該当なし', value: 'adj_jitai_none', points: 0 },
    ],
  },
  {
    id: 'adj_shigai',
    category: 'adjustment',
    label: '市外在住者ですか？（調整指数）',
    helpText: '転入予定者を除く',
    inputType: 'select',
    options: [
      { label: '市外在住者（転入予定者を除く）が市内に勤務地あり（-15点）', value: 'adj_shigai_in', points: -15 },
      { label: '市外在住者（転入予定者を除く）が市内に勤務地なし（-20点）', value: 'adj_shigai_out', points: -20 },
      { label: '該当なし（市内在住）', value: 'adj_shigai_none', points: 0 },
    ],
  },
  {
    id: 'adj_ikuji_encho',
    category: 'adjustment',
    label: '育児休業の延長を許容できますか？（調整指数）',
    inputType: 'radio',
    options: [
      { label: '希望する保育所等に入所できない場合は、育児休業の延長も許容できる（-10点）', value: 'adj_ikuji_encho_yes', points: -10 },
      { label: '該当なし', value: 'adj_ikuji_encho_none', points: 0 },
    ],
  },
];

export const hasudaData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
