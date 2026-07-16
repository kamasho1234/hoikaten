import type { MunicipalityData, Question } from '../types';

// 出典: https://www.town.shimizu.shizuoka.jp/content/300344542.pdf （基本指数票）
//       https://www.town.shimizu.shizuoka.jp/content/300344543.pdf （付加指数票・優先順位表）
//       静岡県駿東郡清水町 保育所等利用調整基準表
// 計算方式: min方式（基本指数の取扱い2「父、母の指数が少ない方を世帯の指数として認定する」）
//           合計指数 ＝ 基本指数（父母の低い方）＋ 付加指数
// 最高基本点数: 20
// 注: 保護者の状況が2項目以上に該当する場合は指数の高いものを認定（→単一select）。
//     就学は「自営労働に準じ指数を認定（12〜19）」のため自営労働の時間段階を適用。
//     虐待・DV（8〜20・利用調整会議で認定）と「その他（状況に応じ換算）」は固定点数がないため除外。

const municipality = {
  id: 'shimizu',
  name: '清水町',
  slug: 'shimizu',
  prefecture: '静岡県',
  maxBasePoints: 20,
  scoringMethod: 'min',
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
      helpText: '最も当てはまる状況を1つ選んでください（父母のうち指数が低い方が世帯の基本指数になります）',
      inputType: 'select',
      options: [
        // 1. 就労（居宅外労働）
        { label: '居宅外労働：週40時間以上の勤務を常態', value: `${prefix}_out_40h`, points: 20 },
        { label: '居宅外労働：週35時間以上の勤務を常態', value: `${prefix}_out_35h`, points: 19 },
        { label: '居宅外労働：週30時間以上の勤務を常態', value: `${prefix}_out_30h`, points: 17 },
        { label: '居宅外労働：週25時間以上の勤務を常態', value: `${prefix}_out_25h`, points: 16 },
        { label: '居宅外労働：週20時間以上の勤務を常態', value: `${prefix}_out_20h`, points: 14 },
        { label: '居宅外労働：週16時間以上の勤務を常態', value: `${prefix}_out_16h`, points: 13 },
        // 1. 就労（自営労働）
        { label: '自営労働：週40時間以上の勤務を常態', value: `${prefix}_self_40h`, points: 19 },
        { label: '自営労働：週35時間以上の勤務を常態', value: `${prefix}_self_35h`, points: 18 },
        { label: '自営労働：週30時間以上の勤務を常態', value: `${prefix}_self_30h`, points: 16 },
        { label: '自営労働：週25時間以上の勤務を常態', value: `${prefix}_self_25h`, points: 15 },
        { label: '自営労働：週20時間以上の勤務を常態', value: `${prefix}_self_20h`, points: 13 },
        { label: '自営労働：週16時間以上の勤務を常態', value: `${prefix}_self_16h`, points: 12 },
        // 1. 就労（居宅内労働）
        { label: '居宅内労働（内職等）', value: `${prefix}_naishoku`, points: 14 },
        // 2. 妊娠・出産
        { label: '妊娠・出産', value: `${prefix}_birth`, points: 16 },
        // 3. 疾病・障がい（疾病）
        { label: '疾病：入院（原則1か月以上）', value: `${prefix}_ill_hosp`, points: 20 },
        { label: '疾病：常時病臥（原則1か月以上）', value: `${prefix}_ill_bed`, points: 20 },
        { label: '疾病：常時安静', value: `${prefix}_ill_rest`, points: 15 },
        // 3. 疾病・障がい（障がい）
        { label: '障がい：精神1級／身体1・2級／療育手帳OA・A', value: `${prefix}_dis_20`, points: 20 },
        { label: '障がい：精神2級／身体3級／療育手帳B', value: `${prefix}_dis_18`, points: 18 },
        { label: '障がい：精神3級／身体4級以下／療育手帳C', value: `${prefix}_dis_16`, points: 16 },
        // 4. 看護・介護
        { label: '看護・介護：常時付添（要介護4又は5程度の親族）', value: `${prefix}_care_45`, points: 16 },
        { label: '看護・介護：常時付添（要介護3程度の親族）', value: `${prefix}_care_3`, points: 14 },
        { label: '看護・介護：上記以外の看護・介護', value: `${prefix}_care_other`, points: 12 },
        // 5. 災害復旧
        { label: '災害復旧：災害（火災・風水害・地震等）の復旧に当たっている', value: `${prefix}_disaster`, points: 20 },
        // 7. 求職活動中
        { label: '求職活動中：生計中心者が申込時点より過去3か月以内に失業（自己都合退職を除く）し求職活動中', value: `${prefix}_seek_laid`, points: 14 },
        { label: '求職活動中：上記の世帯以外で求職活動中', value: `${prefix}_seek`, points: 10 },
        // 8. 就学（自営労働に準じ認定：在学時間の段階）
        { label: '就学：在学時間 週40時間以上相当（自営労働に準じ認定）', value: `${prefix}_school_40h`, points: 19 },
        { label: '就学：在学時間 週35時間以上相当（自営労働に準じ認定）', value: `${prefix}_school_35h`, points: 18 },
        { label: '就学：在学時間 週30時間以上相当（自営労働に準じ認定）', value: `${prefix}_school_30h`, points: 16 },
        { label: '就学：在学時間 週25時間以上相当（自営労働に準じ認定）', value: `${prefix}_school_25h`, points: 15 },
        { label: '就学：在学時間 週20時間以上相当（自営労働に準じ認定）', value: `${prefix}_school_20h`, points: 13 },
        { label: '就学：在学時間 週16時間以上相当（自営労働に準じ認定）', value: `${prefix}_school_16h`, points: 12 },
        // 9. その他（保護者不存在）
        { label: '保護者不存在（父母ともに死亡・失踪・拘禁等）', value: `${prefix}_absent`, points: 20 },
        // 該当なし
        { label: '該当なし（在宅）', value: `${prefix}_none`, points: 0 },
      ],
    },
  ];
}

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_zaien',
    category: 'adjustment',
    label: '当該施設への在園・卒園に関する状況（付加指数）',
    inputType: 'select',
    options: [
      { label: '前年度以前から当該施設に入所中の場合（+10点）', value: 'adj_zaien_current', points: 10 },
      { label: '町内の小規模保育施設を利用中の児童が年齢到達により当該施設を変更（卒園）しなければならない場合（+10点）', value: 'adj_zaien_shokibo', points: 10 },
      { label: '該当なし', value: 'adj_zaien_none', points: 0 },
    ],
  },
  {
    id: 'adj_ikuji',
    category: 'adjustment',
    label: '育児休業に関する状況（付加指数）',
    helpText: '育児休業取得により退所した児童（その弟・妹の同時入園希望も含む）',
    inputType: 'radio',
    options: [
      { label: '育児休業取得により退所した児童が育児休業明けに再入園を希望する場合（+8点）', value: 'adj_ikuji_yes', points: 8 },
      { label: '該当なし', value: 'adj_ikuji_none', points: 0 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: 'きょうだいの状況（付加指数）',
    inputType: 'select',
    options: [
      { label: '兄弟姉妹が利用中の保育施設の利用を希望する場合（+7点）', value: 'adj_sibling_current', points: 7 },
      { label: '兄弟姉妹で同じ保育施設の利用を希望する場合（+3点）', value: 'adj_sibling_same', points: 3 },
      { label: '該当なし', value: 'adj_sibling_none', points: 0 },
    ],
  },
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親世帯に関する状況（付加指数）',
    inputType: 'select',
    options: [
      { label: 'ひとり親世帯（+6点）', value: 'adj_single_parent_yes', points: 6 },
      { label: 'ひとり親世帯に準ずるもの（父母のいずれかが単身赴任・海外勤務等により長期不在かつ同居親族なし）（+3点）', value: 'adj_single_parent_junzuru', points: 3 },
      { label: '該当なし', value: 'adj_single_parent_none', points: 0 },
    ],
  },
  {
    id: 'adj_seikatsuhogo',
    category: 'adjustment',
    label: '生活保護受給世帯で保育実施により就労が見込まれますか？（付加指数）',
    inputType: 'radio',
    options: [
      { label: '生活保護受給世帯で保育実施により就労が見込まれる（+2点）', value: 'adj_seikatsuhogo_yes', points: 2 },
      { label: '該当なし', value: 'adj_seikatsuhogo_none', points: 0 },
    ],
  },
  {
    id: 'adj_hoikushi',
    category: 'adjustment',
    label: '保護者のいずれかが保育所等で保育業務にあたりますか？（付加指数）',
    helpText: '採用予定者を含みます',
    inputType: 'radio',
    options: [
      { label: '保護者のいずれかが保育所等で保育業務にあたる（採用予定者含む）（+2点）', value: 'adj_hoikushi_yes', points: 2 },
      { label: '該当なし', value: 'adj_hoikushi_none', points: 0 },
    ],
  },
  {
    id: 'adj_youchien',
    category: 'adjustment',
    label: '保育所ではなく幼稚園の保育で足りうる場合ですか？（付加指数）',
    inputType: 'radio',
    options: [
      { label: '保育所ではなく幼稚園の保育で足りうる（-5点）', value: 'adj_youchien_yes', points: -5 },
      { label: '該当なし', value: 'adj_youchien_none', points: 0 },
    ],
  },
  {
    id: 'adj_other_town',
    category: 'adjustment',
    label: '清水町外在住者ですか？（付加指数）',
    helpText: '転入予定者・里帰り出産を除く',
    inputType: 'radio',
    options: [
      { label: '清水町外在住者（転入予定者・里帰り出産を除く）（-10点）', value: 'adj_other_town_yes', points: -10 },
      { label: '該当なし', value: 'adj_other_town_none', points: 0 },
    ],
  },
  {
    id: 'adj_kinzoku',
    category: 'adjustment',
    label: '当該児童を同居の親族に預けることが可能ですか？（付加指数）',
    inputType: 'radio',
    options: [
      { label: '20歳以上65歳未満の同居の親族に求職中等の理由で預けることが可能（-10点）', value: 'adj_kinzoku_yes', points: -10 },
      { label: '該当なし', value: 'adj_kinzoku_none', points: 0 },
    ],
  },
  {
    id: 'adj_overdue',
    category: 'adjustment',
    label: '保育料の滞納がありますか？（付加指数）',
    helpText: '在園児・卒園児である兄弟姉妹、又は当該児童に係る保育料',
    inputType: 'radio',
    options: [
      { label: '利用申込締切日現在、正当な理由なく2ヶ月以上滞納されている（-15点）', value: 'adj_overdue_yes', points: -15 },
      { label: '該当なし', value: 'adj_overdue_none', points: 0 },
    ],
  },
];

export const shimizuData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
