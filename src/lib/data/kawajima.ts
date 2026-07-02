import type { MunicipalityData, Question } from '../types';

// 出典: https://www1.g-reiki.net/kawajima/reiki_honbun/e357RG00000774.html
// 川島町保育施設の利用調整等に関する取扱要綱（別表第1・別表第2）
// 計算方式: sum方式（父・母それぞれの基準点数の合算）
// 最高基本点数: 20

const municipality = {
  id: 'kawajima',
  name: '川島町',
  slug: 'kawajima',
  prefecture: '埼玉県',
  maxBasePoints: 20,
  scoringMethod: 'sum',
} as const;

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `p${parentNum}`;
  const parentLabel = parentNum === 1 ? '父（保護者1）' : '母（保護者2）';
  const category = `parent${parentNum}_base` as const;

  const baseOptions: { label: string; value: string; points: number }[] = [
    // 就労（家庭外保育）
    { label: '就労・家庭外（月20日以上・日8時間以上）', value: `${prefix}_out_20d8h`, points: 20 },
    { label: '就労・家庭外（月20日以上・日6〜8時間未満）', value: `${prefix}_out_20d6h`, points: 18 },
    { label: '就労・家庭外（月20日以上・日4〜6時間未満）', value: `${prefix}_out_20d4h`, points: 16 },
    { label: '就労・家庭外（月16〜19日・日8時間以上）', value: `${prefix}_out_16d8h`, points: 18 },
    { label: '就労・家庭外（月16〜19日・日6〜8時間未満）', value: `${prefix}_out_16d6h`, points: 16 },
    { label: '就労・家庭外（月16〜19日・日4〜8時間未満）', value: `${prefix}_out_16d4h`, points: 14 },
    { label: '就労・家庭外（月64時間以上就労が常態）', value: `${prefix}_out_64h`, points: 12 },
    // 就労（家庭内保育）
    { label: '就労・家庭内（月20日以上・日8時間以上）', value: `${prefix}_in_20d8h`, points: 18 },
    { label: '就労・家庭内（月20日以上・日6〜8時間未満）', value: `${prefix}_in_20d6h`, points: 16 },
    { label: '就労・家庭内（月20日以上・日4〜6時間未満）', value: `${prefix}_in_20d4h`, points: 14 },
    { label: '就労・家庭内（月16〜19日・日8時間以上）', value: `${prefix}_in_16d8h`, points: 16 },
    { label: '就労・家庭内（月16〜19日・日6〜8時間未満）', value: `${prefix}_in_16d6h`, points: 14 },
    { label: '就労・家庭内（月16〜19日・日4〜6時間未満）', value: `${prefix}_in_16d4h`, points: 12 },
    { label: '就労・家庭内（月64時間以上就労が常態）', value: `${prefix}_in_64h`, points: 10 },
    // ひとり親
    { label: 'ひとり親家庭（死別・離別・未婚等）', value: `${prefix}_single`, points: 20 },
    // 出産
    { label: '出産（産前産後）', value: `${prefix}_birth`, points: 20 },
    // 疾病
    { label: '疾病（6か月以上入院または居宅療養で常時安静が必要）', value: `${prefix}_ill_heavy`, points: 20 },
    { label: '疾病（保育困難と認められる程度）', value: `${prefix}_ill_mid`, points: 16 },
    { label: '疾病（保育に支障がある程度）', value: `${prefix}_ill_light`, points: 12 },
    // 障害
    { label: '障害（身体障害者手帳1〜2級または療育手帳A等）', value: `${prefix}_dis_heavy`, points: 20 },
    { label: '障害（身体障害者手帳3級等）', value: `${prefix}_dis_mid`, points: 18 },
    { label: '障害（その他障害）', value: `${prefix}_dis_light`, points: 12 },
    // 介護
    { label: '介護・看護（週5日・30時間以上）', value: `${prefix}_care_w5d30h`, points: 20 },
    { label: '介護・看護（週5日・20〜30時間未満）', value: `${prefix}_care_w5d20h`, points: 16 },
    { label: '介護・看護（週4日・16時間以上）', value: `${prefix}_care_w4d16h`, points: 14 },
    { label: '介護・看護（その他）', value: `${prefix}_care_other`, points: 12 },
    // 就学
    { label: '就学（職業訓練校等に就学中）', value: `${prefix}_school`, points: 10 },
    { label: '就学（就学が内定）', value: `${prefix}_school_promise`, points: 6 },
    // 求職（内定）
    { label: '求職（月20日以上・日8時間以上の就労内定）', value: `${prefix}_seek_20d8h`, points: 10 },
    { label: '求職（月20日以上・日6〜8時間未満の就労内定）', value: `${prefix}_seek_20d6h`, points: 9 },
    { label: '求職（月20日以上・日4〜6時間未満の就労内定）', value: `${prefix}_seek_20d4h`, points: 8 },
    { label: '求職（月16日以上・日8時間以上の就労内定）', value: `${prefix}_seek_16d8h`, points: 9 },
    { label: '求職（月16日以上・日6〜8時間未満の就労内定）', value: `${prefix}_seek_16d6h`, points: 8 },
    { label: '求職（月16日以上・日4〜6時間未満の就労内定）', value: `${prefix}_seek_16d4h`, points: 7 },
    // 求職（先未定）
    { label: '求職（就労先未定）', value: `${prefix}_seek_none`, points: 2 },
    // 災害
    { label: '災害復旧活動中', value: `${prefix}_disaster`, points: 20 },
    // 該当なし
    { label: '該当なし（在宅）', value: `${prefix}_none`, points: 0 },
  ];

  return [
    {
      id: `${prefix}_situation`,
      category,
      label: `${parentLabel}の就労・保育が必要な事由`,
      helpText: '最も当てはまる状況を1つ選んでください（別表第1）',
      inputType: 'select',
      options: baseOptions,
    },
  ];
}

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: 'きょうだいの在園・申込状況（調整指数）',
    helpText: '最も点数の高い区分を1つ選んでください（別表第2）',
    inputType: 'radio',
    options: [
      { label: 'きょうだいが同施設に在園中（+4点）', value: 'adj_sib_in', points: 4 },
      { label: '双子の同時申込（+3点）', value: 'adj_sib_twin', points: 3 },
      { label: '該当なし', value: 'adj_sib_none', points: 0 },
    ],
  },
  {
    id: 'adj_work_status',
    category: 'adjustment',
    label: '就労・復職の状況（調整指数）',
    inputType: 'radio',
    options: [
      { label: '育児休業後の復職申込（+4点）', value: 'adj_ws_ikuji', points: 4 },
      { label: '引き続き3年以上就労中（+2点）', value: 'adj_ws_3y', points: 2 },
      { label: '引き続き1年以上3年未満就労中（+1点）', value: 'adj_ws_1y', points: 1 },
      { label: '該当なし', value: 'adj_ws_none', points: 0 },
    ],
  },
  {
    id: 'adj_family_status',
    category: 'adjustment',
    label: '世帯・生活状況（調整指数）',
    inputType: 'radio',
    options: [
      { label: '父母いずれかが単身赴任中（+3点）', value: 'adj_fs_tansin', points: 3 },
      { label: '生活保護世帯（+2点）', value: 'adj_fs_seikatsuhogo', points: 2 },
      { label: '該当なし', value: 'adj_fs_none', points: 0 },
    ],
  },
  {
    id: 'adj_parent_disability',
    category: 'adjustment',
    label: '保護者自身の障害（調整指数）',
    inputType: 'radio',
    options: [
      { label: '保護者が身体障害者手帳1〜2級または同等（+5点）', value: 'adj_pd_heavy', points: 5 },
      { label: '保護者が身体障害者手帳3級以下または同等（+3点）', value: 'adj_pd_mid', points: 3 },
      { label: '該当なし', value: 'adj_pd_none', points: 0 },
    ],
  },
  {
    id: 'adj_care',
    category: 'adjustment',
    label: '家族介護の状況（調整指数）',
    inputType: 'radio',
    options: [
      { label: '同居家族を週3日以上介護（+2点）', value: 'adj_care_live', points: 2 },
      { label: '別居家族を週3日以上介護（+1点）', value: 'adj_care_away', points: 1 },
      { label: '該当なし', value: 'adj_care_none', points: 0 },
    ],
  },
  // マイナス調整項目
  {
    id: 'adj_work_outside',
    category: 'adjustment',
    label: '保育時間外労働（マイナス調整）',
    inputType: 'radio',
    options: [
      { label: '保育園の保育時間外の労働が常態（-3点）', value: 'adj_wo_habitual', points: -3 },
      { label: '該当なし', value: 'adj_wo_none', points: 0 },
    ],
  },
  {
    id: 'adj_family_business',
    category: 'adjustment',
    label: '親族事業による税控除（マイナス調整）',
    inputType: 'radio',
    options: [
      { label: '配偶者が経営者で本人が雇用されている場合の控除対象（-5点）', value: 'adj_fb_spouse', points: -5 },
      { label: '親族事業の専従者控除対象（-2点）', value: 'adj_fb_specialist', points: -2 },
      { label: '該当なし', value: 'adj_fb_none', points: 0 },
    ],
  },
  {
    id: 'adj_family_care_alt',
    category: 'adjustment',
    label: '預け先の親族（マイナス調整）',
    inputType: 'radio',
    options: [
      { label: '同居の親族（20〜65歳未満）に預けることが可能（-5点）', value: 'adj_fca_available', points: -5 },
      { label: '該当なし', value: 'adj_fca_none', points: 0 },
    ],
  },
  {
    id: 'adj_distance_learning',
    category: 'adjustment',
    label: '通信制学校就学（マイナス調整）',
    inputType: 'radio',
    options: [
      { label: '通信制学校に就学中（-3点）', value: 'adj_dl_enrolled', points: -3 },
      { label: '該当なし', value: 'adj_dl_none', points: 0 },
    ],
  },
  {
    id: 'adj_sibling_kinder',
    category: 'adjustment',
    label: 'きょうだいの幼稚園在園（マイナス調整）',
    inputType: 'radio',
    options: [
      { label: 'きょうだいが幼稚園に在園中（-2点）', value: 'adj_sk_enrolled', points: -2 },
      { label: '該当なし', value: 'adj_sk_none', points: 0 },
    ],
  },
  {
    id: 'adj_fee_arrears',
    category: 'adjustment',
    label: '保育料滞納（マイナス調整）',
    inputType: 'radio',
    options: [
      { label: '保育料6か月以上滞納（-15点）', value: 'adj_fa_6months', points: -15 },
      { label: '保育料3か月以上6か月未満の滞納（-5点）', value: 'adj_fa_3months', points: -5 },
      { label: '該当なし', value: 'adj_fa_none', points: 0 },
    ],
  },
  {
    id: 'adj_missing_documents',
    category: 'adjustment',
    label: '必要書類の提出状況（マイナス調整）',
    inputType: 'radio',
    options: [
      { label: '必要な書類を提出していない（-1点）', value: 'adj_md_missing', points: -1 },
      { label: '該当なし（書類提出済み）', value: 'adj_md_complete', points: 0 },
    ],
  },
];

export const kawajimaData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
