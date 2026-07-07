import type { MunicipalityData, Question } from '../types';

// 出典: https://www.town.fuchu.hiroshima.jp/uploaded/attachment/31357.pdf
// 府中町 保育所等利用調整指数表（基本指数・調整指数）令和8年度
// 計算方式: min方式
// 最高基本点数: 10

const municipality = {
  id: 'fuchuHiroshima',
  name: '府中町',
  slug: 'fuchu-hiroshima',
  prefecture: '広島県',
  maxBasePoints: 10,
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
      helpText: '最も当てはまる状況を1つ選んでください',
      inputType: 'select',
      options: [
    { label: '就労（月20日以上・月155時間以上）', value: `${prefix}_w20_155h`, points: 10 },
    { label: '就労（月20日以上・月120〜155時間未満）', value: `${prefix}_w20_120h`, points: 9 },
    { label: '就労（月20日以上・月96〜120時間未満）', value: `${prefix}_w20_96h`, points: 8 },
    { label: '就労（月20日以上・月64〜96時間未満）', value: `${prefix}_w20_64h`, points: 7 },
    { label: '就労（月16〜19日・月155時間以上）', value: `${prefix}_w16_155h`, points: 9 },
    { label: '就労（月16〜19日・月120〜155時間未満）', value: `${prefix}_w16_120h`, points: 8 },
    { label: '就労（月16〜19日・月96〜120時間未満）', value: `${prefix}_w16_96h`, points: 7 },
    { label: '就労（月16〜19日・月64〜96時間未満）', value: `${prefix}_w16_64h`, points: 6 },
    { label: '就労（月16日未満・月120時間以上）', value: `${prefix}_wu16_120h`, points: 7 },
    { label: '就労（月16日未満・月96〜120時間未満）', value: `${prefix}_wu16_96h`, points: 6 },
    { label: '就労（月16日未満・月64〜96時間未満）', value: `${prefix}_wu16_64h`, points: 5 },
    { label: '妊娠・出産', value: `${prefix}_birth`, points: 9 },
    { label: '疾病（入院）', value: `${prefix}_ill_hosp`, points: 10 },
    { label: '疾病（自宅療養で常に病臥）', value: `${prefix}_ill_home`, points: 10 },
    { label: '疾病（通院加療を要し保育が困難）', value: `${prefix}_ill_visit`, points: 9 },
    { label: '疾病（上記以外）', value: `${prefix}_ill_other`, points: 8 },
    { label: '障害（身体1・2級／療育Ⓐ・A／精神1・2級）', value: `${prefix}_dis_12`, points: 10 },
    { label: '障害（身体3・4級／療育Ⓑ・B／精神3級）', value: `${prefix}_dis_34`, points: 9 },
    { label: '障害（身体5・6級）', value: `${prefix}_dis_56`, points: 8 },
    { label: '同居親族の介護・病院付添（常時保育が困難）', value: `${prefix}_care_co_always`, points: 8 },
    { label: '同居親族の介護・病院付添（月120時間以上保育が困難）', value: `${prefix}_care_co_120h`, points: 7 },
    { label: '同居親族の介護・病院付添（月64時間以上保育が困難）', value: `${prefix}_care_co_64h`, points: 6 },
    { label: '別居親族の介護・病院付添（月120時間以上保育が困難）', value: `${prefix}_care_sep_120h`, points: 6 },
    { label: '別居親族の介護・病院付添（月64時間以上保育が困難）', value: `${prefix}_care_sep_64h`, points: 5 },
    { label: '災害・復旧', value: `${prefix}_disaster`, points: 10 },
    { label: '求職（起業活動を含む）', value: `${prefix}_seek`, points: 3 },
    { label: '就学（月20日以上・月155時間以上／就労と同様）', value: `${prefix}_sc20_155h`, points: 10 },
    { label: '就学（月20日以上・月120〜155時間未満）', value: `${prefix}_sc20_120h`, points: 9 },
    { label: '就学（月20日以上・月96〜120時間未満）', value: `${prefix}_sc20_96h`, points: 8 },
    { label: '就学（月20日以上・月64〜96時間未満）', value: `${prefix}_sc20_64h`, points: 7 },
    { label: '就学（月16〜19日・月155時間以上）', value: `${prefix}_sc16_155h`, points: 9 },
    { label: '就学（月16〜19日・月120〜155時間未満）', value: `${prefix}_sc16_120h`, points: 8 },
    { label: '就学（月16〜19日・月96〜120時間未満）', value: `${prefix}_sc16_96h`, points: 7 },
    { label: '就学（月16〜19日・月64〜96時間未満）', value: `${prefix}_sc16_64h`, points: 6 },
    { label: '就学（月16日未満・月120時間以上）', value: `${prefix}_scu16_120h`, points: 7 },
    { label: '就学（月16日未満・月96〜120時間未満）', value: `${prefix}_scu16_96h`, points: 6 },
    { label: '就学（月16日未満・月64〜96時間未満）', value: `${prefix}_scu16_64h`, points: 5 },
    { label: '虐待・DV', value: `${prefix}_abuse`, points: 10 },
    { label: '該当なし（在宅）', value: `${prefix}_none`, points: 0 },
      ],
    },
  ];
}

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_status',
    category: 'adjustment',
    label: '世帯類型（1〜4は重複適用なし）（調整点数）',
    inputType: 'radio',
    options: [
      { label: '生活保護世帯（+3点）', value: 'adj_status_seikatsuhogo', points: 3 },
      { label: 'ひとり親家庭（別居かつ離婚調停中で書類提出含む）（+4点）', value: 'adj_status_single_alone', points: 4 },
      { label: 'ひとり親家庭で親族等と同居している場合（+3点）', value: 'adj_status_single_family', points: 3 },
      { label: '主たる生計者の失業（+2点）', value: 'adj_status_shitsugyo', points: 2 },
      { label: '該当なし', value: 'adj_status_none', points: 0 },
    ],
  },
  {
    id: 'adj_ikuji_ake',
    category: 'adjustment',
    label: '育児休業明けの入所（調整点数）',
    inputType: 'radio',
    options: [
      { label: '育児休業明けの入所（+1点）', value: 'adj_ikuji_ake_yes', points: 1 },
      { label: '該当なし', value: 'adj_ikuji_ake_none', points: 0 },
    ],
  },
  {
    id: 'adj_siblings',
    category: 'adjustment',
    label: 'きょうだいの状況（調整点数）',
    inputType: 'radio',
    options: [
      { label: '申込児童の兄弟姉妹がすでに利用（同一保育所希望・卒園予定除く）（+2点）', value: 'adj_siblings_using', points: 2 },
      { label: '兄弟姉妹の同時入所（同一保育所希望）（+1点）', value: 'adj_siblings_same_time', points: 1 },
      { label: '該当なし', value: 'adj_siblings_none', points: 0 },
    ],
  },
  {
    id: 'adj_horyu',
    category: 'adjustment',
    label: '入所保留の継続（調整点数）',
    inputType: 'radio',
    options: [
      { label: '育休復職にあわせ申請も保留となり復職している（+1点）', value: 'adj_horyu_fukushoku', points: 1 },
      { label: '前年度第1・2回受付で申請も保留となっている（+1点）', value: 'adj_horyu_zennendo', points: 1 },
      { label: '該当なし', value: 'adj_horyu_none', points: 0 },
    ],
  },
  {
    id: 'adj_multi',
    category: 'adjustment',
    label: '多子世帯（調整点数）',
    inputType: 'radio',
    options: [
      { label: '多子世帯（同居する18歳未満の児童が3人以上）（+1点）', value: 'adj_multi_yes', points: 1 },
      { label: '該当なし', value: 'adj_multi_none', points: 0 },
    ],
  },
  {
    id: 'adj_chiikigata',
    category: 'adjustment',
    label: '地域型保育の卒園児（調整点数）',
    inputType: 'radio',
    options: [
      { label: '地域型保育事業の卒園児（連携施設）（+2点）', value: 'adj_chiikigata_renkei', points: 2 },
      { label: '地域型保育事業の卒園児（連携施設以外）（+1点）', value: 'adj_chiikigata_hi_renkei', points: 1 },
      { label: '該当なし', value: 'adj_chiikigata_none', points: 0 },
    ],
  },
  {
    id: 'adj_tanshin',
    category: 'adjustment',
    label: '単身赴任等（調整点数）',
    inputType: 'radio',
    options: [
      { label: '父母のいずれかが単身赴任等で別居している（+1点）', value: 'adj_tanshin_yes', points: 1 },
      { label: '該当なし', value: 'adj_tanshin_none', points: 0 },
    ],
  },
  {
    id: 'adj_hoikushi',
    category: 'adjustment',
    label: '保育士等としての勤務（調整点数）',
    inputType: 'radio',
    options: [
      { label: '父母のいずれかが保育士・保育教諭として町内認可保育所等に勤務（内定含む）（+3点）', value: 'adj_hoikushi_in_town', points: 3 },
      { label: '父母のいずれかが保育士・保育教諭として町外認可保育所等に勤務（内定含む）（+1点）', value: 'adj_hoikushi_out_town', points: 1 },
      { label: '該当なし', value: 'adj_hoikushi_none', points: 0 },
    ],
  },
  {
    id: 'adj_taji_ninshin',
    category: 'adjustment',
    label: '多児妊娠（調整点数）',
    inputType: 'radio',
    options: [
      { label: '多児妊娠による産前産後の入所（+1点）', value: 'adj_taji_ninshin_yes', points: 1 },
      { label: '該当なし', value: 'adj_taji_ninshin_none', points: 0 },
    ],
  },
  {
    id: 'adj_child_dis',
    category: 'adjustment',
    label: '児童の障害（調整点数）',
    inputType: 'radio',
    options: [
      { label: '申込児童および兄弟姉妹（未就学児）が障害を有する（手帳交付）（+1点）', value: 'adj_child_dis_yes', points: 1 },
      { label: '該当なし', value: 'adj_child_dis_none', points: 0 },
    ],
  },
  {
    id: 'adj_sofubo',
    category: 'adjustment',
    label: '同居祖父母（調整点数）',
    inputType: 'radio',
    options: [
      { label: '65歳未満の同居祖父母が「保育を必要とする事由」に該当しない（-2点）', value: 'adj_sofubo_yes', points: -2 },
      { label: '該当なし', value: 'adj_sofubo_none', points: 0 },
    ],
  },
  {
    id: 'adj_gaijuu',
    category: 'adjustment',
    label: '町外在住（調整点数）',
    inputType: 'radio',
    options: [
      { label: '町外在住者で勤務地が町内（転入予定・在園児除く）（-8点）', value: 'adj_gaijuu_work_in', points: -8 },
      { label: '町外在住者で勤務地が町外（転入予定・在園児除く）（-10点）', value: 'adj_gaijuu_work_out', points: -10 },
      { label: '該当なし', value: 'adj_gaijuu_none', points: 0 },
    ],
  },
  {
    id: 'adj_overdue',
    category: 'adjustment',
    label: '保育料滞納（調整点数）',
    inputType: 'radio',
    options: [
      { label: '保育料に滞納がある（-5点）', value: 'adj_overdue_yes', points: -5 },
      { label: '該当なし', value: 'adj_overdue_none', points: 0 },
    ],
  },
  {
    id: 'adj_jitai',
    category: 'adjustment',
    label: '入所辞退（調整点数）',
    inputType: 'radio',
    options: [
      { label: '入所可能園を辞退した場合（-1点）', value: 'adj_jitai_yes', points: -1 },
      { label: '該当なし', value: 'adj_jitai_none', points: 0 },
    ],
  },
  {
    id: 'adj_yuusen',
    category: 'adjustment',
    label: '育休復帰で他優先容認（調整点数）',
    inputType: 'radio',
    options: [
      { label: '育休復帰の入所申請で他の希望者優先の選考を申し出た（-9点）', value: 'adj_yuusen_yes', points: -9 },
      { label: '該当なし', value: 'adj_yuusen_none', points: 0 },
    ],
  },
];

export const fuchuHiroshimaData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
