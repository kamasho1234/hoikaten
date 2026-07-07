import type { MunicipalityData, Question } from '../types';

// 出典: https://www.town.hayama.lg.jp/material/files/group/9/jissisenkoukijun-1.pdf
// 葉山町 保育の実施選考基準（基本点数・調整点数A・B）
// 計算方式: sum方式
// 最高基本点数: 10

const municipality = {
  id: 'hayama',
  name: '葉山町',
  slug: 'hayama',
  prefecture: '神奈川県',
  maxBasePoints: 10,
  scoringMethod: 'sum',
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
    { label: '居宅外労働（月20日以上・月160時間以上）', value: `${prefix}_out20_160`, points: 10 },
    { label: '居宅外労働（月20日以上・月140時間以上）', value: `${prefix}_out20_140`, points: 9 },
    { label: '居宅外労働（月20日以上・月120時間以上）', value: `${prefix}_out20_120`, points: 8 },
    { label: '居宅外労働（月20日以上・月64〜120時間未満）', value: `${prefix}_out20_64`, points: 7 },
    { label: '居宅外労働（月16〜20日未満・月128時間以上）', value: `${prefix}_out16_128`, points: 9 },
    { label: '居宅外労働（月16〜20日未満・月112時間以上）', value: `${prefix}_out16_112`, points: 8 },
    { label: '居宅外労働（月16〜20日未満・月96時間以上）', value: `${prefix}_out16_96`, points: 7 },
    { label: '居宅外労働（月16〜20日未満・月64〜96時間未満）', value: `${prefix}_out16_64`, points: 6 },
    { label: '居宅外労働（月16日未満・月64時間以上）', value: `${prefix}_outu16_64`, points: 5 },
    { label: '居宅外労働（上記以外の就労）', value: `${prefix}_out_other`, points: 3 },
    { label: '居宅内労働（月20日以上・月160時間以上）', value: `${prefix}_in20_160`, points: 9 },
    { label: '居宅内労働（月20日以上・月140時間以上）', value: `${prefix}_in20_140`, points: 8 },
    { label: '居宅内労働（月20日以上・月120時間以上）', value: `${prefix}_in20_120`, points: 7 },
    { label: '居宅内労働（月20日以上・月64〜120時間未満）', value: `${prefix}_in20_64`, points: 6 },
    { label: '居宅内労働（月16〜20日未満・月128時間以上）', value: `${prefix}_in16_128`, points: 8 },
    { label: '居宅内労働（月16〜20日未満・月112時間以上）', value: `${prefix}_in16_112`, points: 7 },
    { label: '居宅内労働（月16〜20日未満・月96時間以上）', value: `${prefix}_in16_96`, points: 6 },
    { label: '居宅内労働（月16〜20日未満・月64〜96時間未満）', value: `${prefix}_in16_64`, points: 5 },
    { label: '居宅内労働（月16日未満・月64時間以上）', value: `${prefix}_inu16_64`, points: 4 },
    { label: '入院（3か月以上の長期）', value: `${prefix}_hosp3`, points: 10 },
    { label: '入院（1か月以上3か月未満）', value: `${prefix}_hosp1`, points: 9 },
    { label: '自宅療養（常時病臥）', value: `${prefix}_home_always`, points: 9 },
    { label: '自宅療養（安静を要し保育が日常的に困難）', value: `${prefix}_home_rest`, points: 6 },
    { label: '産前・産後8週間に保育にあたる者がいない', value: `${prefix}_birth`, points: 6 },
    { label: '心身の障害（身体1・2級／精神1級／療育A）', value: `${prefix}_dis_12`, points: 10 },
    { label: '心身の障害（身体3・4級／精神2級／療育B）', value: `${prefix}_dis_34`, points: 8 },
    { label: '親族の介護・看護（入院付添・常時）', value: `${prefix}_care_hosp_always`, points: 8 },
    { label: '親族の介護・看護（入院付添・1日7時間週4日以上）', value: `${prefix}_care_hosp_7h`, points: 7 },
    { label: '親族の介護・看護（入院付添・1日4時間週4日以上）', value: `${prefix}_care_hosp_4h`, points: 4 },
    { label: '親族の介護・看護（重度心身障害者の自宅介護）', value: `${prefix}_care_severe`, points: 7 },
    { label: '親族の介護・看護（週4日通院付添または1日7時間週4日の自宅看護）', value: `${prefix}_care_home_7h`, points: 6 },
    { label: '親族の介護・看護（週4日通院付添または1日4時間週4日の自宅看護）', value: `${prefix}_care_home_4h`, points: 3 },
    { label: '災害復旧（自宅の復旧作業のため保育が困難）', value: `${prefix}_disaster`, points: 12 },
    { label: '不存在（死別・遺棄・離婚・未婚等）', value: `${prefix}_absent_none`, points: 15 },
    { label: '不存在（別居・離婚を前提としている場合）', value: `${prefix}_absent_sep`, points: 10 },
    { label: '通学（生活手段のための各種学校の学生）', value: `${prefix}_school_life`, points: 8 },
    { label: '通学（一般学生）', value: `${prefix}_school_general`, points: 3 },
    { label: 'DV・虐待（昼間の保育が必要と認められる）', value: `${prefix}_abuse`, points: 10 },
    { label: '該当なし（在宅）', value: `${prefix}_none`, points: 0 },
      ],
    },
  ];
}

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_setai',
    category: 'adjustment',
    label: '世帯の状況（最も高い1つのみ）（調整点数）',
    inputType: 'radio',
    options: [
      { label: '緊急措置（生計主宰者の死亡・疾病等で他に就労なし）（+5点）', value: 'adj_setai_kinkyu', points: 5 },
      { label: '生活保護受給世帯で自立に向け求職・就労している（+5点）', value: 'adj_setai_hogo', points: 5 },
      { label: 'ひとり親家庭等で同居の親族等がいない（+5点）', value: 'adj_setai_single_alone', points: 5 },
      { label: 'ひとり親家庭等で同居親族等がいるが全員が基本点数に該当（+3点）', value: 'adj_setai_single_family', points: 3 },
      { label: '同居の親族等がいる（全員が基本点数該当の場合を除く）（-2点）', value: 'adj_setai_dokyo', points: -2 },
      { label: '該当なし', value: 'adj_setai_none', points: 0 },
    ],
  },
  {
    id: 'adj_siblings',
    category: 'adjustment',
    label: 'きょうだいの状況（調整点数）',
    inputType: 'radio',
    options: [
      { label: 'きょうだいが既に入所している（+2点）', value: 'adj_siblings_enrolled', points: 2 },
      { label: 'きょうだいが幼稚園在園中で預かり保育等の利用がない（-3点）', value: 'adj_siblings_youchien', points: -3 },
      { label: 'きょうだいが未入所（待機児童等を除く）（-4点）', value: 'adj_siblings_not_enrolled', points: -4 },
      { label: '該当なし', value: 'adj_siblings_none', points: 0 },
    ],
  },
  {
    id: 'adj_hoikushi',
    category: 'adjustment',
    label: '保育士（調整点数）',
    inputType: 'radio',
    options: [
      { label: '就労中または就労予定の職業が保育士（+3点）', value: 'adj_hoikushi_yes', points: 3 },
      { label: '該当なし', value: 'adj_hoikushi_none', points: 0 },
    ],
  },
  {
    id: 'adj_chiikigata',
    category: 'adjustment',
    label: '地域型保育卒園（調整点数）',
    inputType: 'radio',
    options: [
      { label: '小規模保育等の地域型保育事業を卒園した児童（+5点）', value: 'adj_chiikigata_yes', points: 5 },
      { label: '該当なし', value: 'adj_chiikigata_none', points: 0 },
    ],
  },
  {
    id: 'adj_sainyuen',
    category: 'adjustment',
    label: '再入園（調整点数）',
    inputType: 'radio',
    options: [
      { label: '育児休業前の保育所に再入園（該当児童のみ）（+4点）', value: 'adj_sainyuen_yes', points: 4 },
      { label: '該当なし', value: 'adj_sainyuen_none', points: 0 },
    ],
  },
  {
    id: 'adj_fukushoku',
    category: 'adjustment',
    label: '産休育休復帰（調整点数）',
    inputType: 'radio',
    options: [
      { label: '産休・育児・介護休業法明けの復職（待機期間中の復職含む）（+1点）', value: 'adj_fukushoku_yes', points: 1 },
      { label: '該当なし', value: 'adj_fukushoku_none', points: 0 },
    ],
  },
  {
    id: 'adj_horyu',
    category: 'adjustment',
    label: '保留通知の再交付（調整点数）',
    inputType: 'radio',
    options: [
      { label: '入所保留通知を年度中最初の1回以外にも再交付希望（-25点）', value: 'adj_horyu_yes', points: -25 },
      { label: '該当なし', value: 'adj_horyu_none', points: 0 },
    ],
  },
  {
    id: 'adj_nofu',
    category: 'adjustment',
    label: '保育料の納付（調整点数）',
    inputType: 'radio',
    options: [
      { label: '督促に対応がない・過年度の滞納がある・納付意欲が確認できない（-10点）', value: 'adj_nofu_taino', points: -10 },
      { label: '速やかな納付はないが納付計画に基づく分割納付を行っている（-5点）', value: 'adj_nofu_bunkatsu', points: -5 },
      { label: '該当なし', value: 'adj_nofu_none', points: 0 },
    ],
  },
  {
    id: 'adj_tenen',
    category: 'adjustment',
    label: '転園（調整点数）',
    inputType: 'radio',
    options: [
      { label: 'きょうだいと同一の保育所への転園を希望（+5点）', value: 'adj_tenen_sib_same', points: 5 },
      { label: '認定こども園の教育利用児童が同園の保育利用を希望（+3点）', value: 'adj_tenen_kodomoen', points: 3 },
      { label: 'やむを得ない事情以外の希望で入所後1年未満の転園（-3点）', value: 'adj_tenen_under1y', points: -3 },
      { label: '町外からの転入予定者で現在通園中の町外認可保育所等を退園（+1点）', value: 'adj_tenen_tennyu', points: 1 },
      { label: '該当なし', value: 'adj_tenen_none', points: 0 },
    ],
  },
  {
    id: 'adj_kouiki',
    category: 'adjustment',
    label: '広域入所（調整点数）',
    inputType: 'radio',
    options: [
      { label: '町外居住者である（転入予定者を除く）（-20点）', value: 'adj_kouiki_yes', points: -20 },
      { label: '該当なし', value: 'adj_kouiki_none', points: 0 },
    ],
  },
  {
    id: 'adj_haiyo',
    category: 'adjustment',
    label: '特別な配慮が必要な世帯（調整点数）',
    inputType: 'radio',
    options: [
      { label: '要支援（半年以上支援なし）（+3点）', value: 'adj_haiyo_shien_none', points: 3 },
      { label: '要支援（在宅支援中）（+4点）', value: 'adj_haiyo_shien_home', points: 4 },
      { label: '要保護（在宅支援中）（+5点）', value: 'adj_haiyo_hogo_home', points: 5 },
      { label: '要保護（一時保護・措置歴がある）（+6点）', value: 'adj_haiyo_hogo_ichiji', points: 6 },
      { label: '該当なし', value: 'adj_haiyo_none', points: 0 },
    ],
  },
];

export const hayamaData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
