import type { MunicipalityData, Question } from '../types';

// 出典: https://www.city.iwakura.aichi.jp/cmsfiles/contents/0000000/102/shisuuhyou.pdf
// 岩倉市保育園入園選考基準指数表（入園指数・調整指数）
// 計算方式: avg方式
// 最高基本点数: 10

const municipality = {
  id: 'iwakura',
  name: '岩倉市',
  slug: 'iwakura',
  prefecture: '愛知県',
  maxBasePoints: 10,
  scoringMethod: 'avg',
} as const;

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `p${parentNum}`;
  const parentLabel = parentNum === 1 ? '父（保護者1）' : '母（保護者2）';
  const category = `parent${parentNum}_base` as const;

  return [
    {
      id: `${prefix}_situation`,
      category,
      label: `${parentLabel}の就労・保育が必要な事由`,
      helpText: '最も当てはまる状況を1つ選んでください',
      inputType: 'select',
      options: [
    { label: '外勤・就労中（1日8時間以上かつ月20日以上）', value: `${prefix}_out_now_8h20d`, points: 10 },
    { label: '外勤・就労中（1日8時間以上かつ月15日以上）', value: `${prefix}_out_now_8h15d`, points: 9 },
    { label: '外勤・就労中（1日6〜8時間かつ月20日以上）', value: `${prefix}_out_now_68h20d`, points: 9 },
    { label: '外勤・就労中（1日6〜8時間かつ月15日以上）', value: `${prefix}_out_now_68h15d`, points: 8 },
    { label: '外勤・就労中（1日4〜6時間かつ月20日以上）', value: `${prefix}_out_now_46h20d`, points: 7 },
    { label: '外勤・就労中（上記以外で月60時間以上）', value: `${prefix}_out_now_60h`, points: 6 },
    { label: '外勤・就労予定（1日8時間以上かつ月20日以上）', value: `${prefix}_out_plan_8h20d`, points: 9 },
    { label: '外勤・就労予定（1日8時間以上かつ月15日以上）', value: `${prefix}_out_plan_8h15d`, points: 8 },
    { label: '外勤・就労予定（1日6〜8時間かつ月20日以上）', value: `${prefix}_out_plan_68h20d`, points: 8 },
    { label: '外勤・就労予定（1日6〜8時間かつ月15日以上）', value: `${prefix}_out_plan_68h15d`, points: 7 },
    { label: '外勤・就労予定（1日4〜6時間かつ月20日以上）', value: `${prefix}_out_plan_46h20d`, points: 6 },
    { label: '外勤・就労予定（上記以外で月60時間以上）', value: `${prefix}_out_plan_60h`, points: 5 },
    { label: '自営中心者（1日8時間以上かつ月20日以上）', value: `${prefix}_selfc_8h20d`, points: 10 },
    { label: '自営中心者（1日6〜8時間かつ月20日以上）', value: `${prefix}_selfc_68h20d`, points: 9 },
    { label: '自営中心者（1日6〜8時間かつ月15日以上）', value: `${prefix}_selfc_68h15d`, points: 8 },
    { label: '自営中心者（上記以外で月60時間以上）', value: `${prefix}_selfc_60h`, points: 6 },
    { label: '自営協力者（1日8時間以上かつ月20日以上）', value: `${prefix}_selfp_8h20d`, points: 9 },
    { label: '自営協力者（1日6時間以上かつ月15日以上）', value: `${prefix}_selfp_6h15d`, points: 7 },
    { label: '自営協力者（上記以外で月60時間以上）', value: `${prefix}_selfp_60h`, points: 5 },
    { label: '内職（1日4時間以上かつ月60時間以上）', value: `${prefix}_naishoku`, points: 5 },
    { label: '農業（1日4時間以上かつ月60時間以上）', value: `${prefix}_nogyo`, points: 5 },
    { label: '妊娠・出産（出産前後で休養を要し保育できない）', value: `${prefix}_birth`, points: 7 },
    { label: '疾病・入院（1月以上・精神性・感染症等の疾病）', value: `${prefix}_ill_hosp`, points: 10 },
    { label: '疾病・居宅内（1月以上の常時病臥で入院同様）', value: `${prefix}_ill_home`, points: 10 },
    { label: '疾病・通院（一般療養）', value: `${prefix}_ill_visit`, points: 6 },
    { label: '障害（身体1・2級／療育A／精神1級）', value: `${prefix}_dis_12`, points: 10 },
    { label: '障害（身体3級／療育B／精神2級）', value: `${prefix}_dis_3`, points: 9 },
    { label: '障害（身体4〜6級／療育C／精神3級）', value: `${prefix}_dis_46`, points: 7 },
    { label: '介護・看護（病院等付添・週4日以上／通所含む）', value: `${prefix}_care_hospital`, points: 7 },
    { label: '介護・看護（自宅療養・常時観察と介護／寝たきり）', value: `${prefix}_care_home`, points: 8 },
    { label: '介護・看護（上記以外）', value: `${prefix}_care_other`, points: 6 },
    { label: '災害復旧に当たっている', value: `${prefix}_disaster`, points: 10 },
    { label: '求職活動（月60時間以上の就労希望）', value: `${prefix}_seek`, points: 2 },
    { label: '就学（通学のため保育ができない）', value: `${prefix}_school`, points: 7 },
    { label: '虐待・DVのおそれがある', value: `${prefix}_abuse`, points: 8 },
    { label: '育児休業取得時（在園児の継続利用）', value: `${prefix}_ikuji`, points: 4 },
    { label: 'その他（要保護家庭等・緊急に保育が必要）', value: `${prefix}_other_urgent`, points: 8 },
    { label: 'その他（保育が必要と認められる）', value: `${prefix}_other_normal`, points: 6 },
    { label: '該当なし（在宅）', value: `${prefix}_none`, points: 0 },
      ],
    },
  ];
}

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_hogo',
    category: 'adjustment',
    label: '生活保護（調整点数）',
    inputType: 'radio',
    options: [
      { label: '生活保護世帯（+3点）', value: 'adj_hogo_seikatsuhogo', points: 3 },
      { label: '該当なし', value: 'adj_hogo_none', points: 0 },
    ],
  },
  {
    id: 'adj_single',
    category: 'adjustment',
    label: 'ひとり親（調整点数）',
    inputType: 'radio',
    options: [
      { label: '母子・父子世帯（死別・離婚・行方不明等）（+3点）', value: 'adj_single_hitorioya', points: 3 },
      { label: '該当なし', value: 'adj_single_none', points: 0 },
    ],
  },
  {
    id: 'adj_shitsugyo',
    category: 'adjustment',
    label: '生計中心者の失業（調整点数）',
    inputType: 'radio',
    options: [
      { label: '生計中心者の失業により就労の必要性が高い（+1点）', value: 'adj_shitsugyo_yes', points: 1 },
      { label: '該当なし', value: 'adj_shitsugyo_none', points: 0 },
    ],
  },
  {
    id: 'adj_child_dis',
    category: 'adjustment',
    label: '申請児童の障害（調整点数）',
    inputType: 'radio',
    options: [
      { label: '申請児童が障害者手帳等を持っている（+1点）', value: 'adj_child_dis_yes', points: 1 },
      { label: '該当なし', value: 'adj_child_dis_none', points: 0 },
    ],
  },
  {
    id: 'adj_kakushin',
    category: 'adjustment',
    label: '確定申告書の写し（調整点数）',
    inputType: 'radio',
    options: [
      { label: '自営業等で合理的理由なく前年の確定申告書の写しを提出できない（-1点）', value: 'adj_kakushin_yes', points: -1 },
      { label: '該当なし', value: 'adj_kakushin_none', points: 0 },
    ],
  },
  {
    id: 'adj_zaien',
    category: 'adjustment',
    label: 'きょうだい・転園・育休（最も高い1つのみ）（調整点数）',
    inputType: 'radio',
    options: [
      { label: '在園児の兄弟姉妹が新規入園申込（+2点）', value: 'adj_zaien_sib_new', points: 2 },
      { label: '在園児で転園希望園に兄弟姉妹が在園（+2点）', value: 'adj_zaien_sib_transfer', points: 2 },
      { label: '在園児で転園希望（+1点）', value: 'adj_zaien_transfer', points: 1 },
      { label: '保育料等を滞納している（-5点）', value: 'adj_zaien_overdue', points: -5 },
      { label: '調査票で「入所できない場合は育児休業の延長を許容できる」を選択（-10点）', value: 'adj_zaien_ikuji_ext', points: -10 },
      { label: '該当なし', value: 'adj_zaien_none', points: 0 },
    ],
  },
  {
    id: 'adj_hoikushi',
    category: 'adjustment',
    label: '保育士等としての就労（調整点数）',
    inputType: 'radio',
    options: [
      { label: '岩倉市内の施設で保育士・幼稚園教諭・保育教諭等に従事（予定含む）（+2点）', value: 'adj_hoikushi_in_city', points: 2 },
      { label: '岩倉市外の施設で保育士・幼稚園教諭・保育教諭等に従事（予定含む）（+1点）', value: 'adj_hoikushi_out_city', points: 1 },
      { label: '該当なし', value: 'adj_hoikushi_none', points: 0 },
    ],
  },
];

export const iwakuraData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
