import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 倶知安町（北海道）保育所等利用調整基準データ
// 出典: https://www1.g-reiki.net/kutchan/reiki_honbun/a075RG00001192.html
// 倶知安町保育の利用調整基準取扱要綱（別表第1・第2）
// 計算方式: sum方式（父母それぞれの基準指数を合算）
// 最高基準指数: 就労月160時間以上・月22日以上で64点
// ---------------------------------------------------------------------------

const municipality = {
  id: 'kutchan',
  name: '倶知安町',
  slug: 'kutchan',
  prefecture: '北海道',
  maxBasePoints: 64,
  scoringMethod: 'sum',
} as const;

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `p${parentNum}`;
  const parentLabel = parentNum === 1 ? '父（保護者1）' : '母（保護者2）';
  const category = `parent${parentNum}_base` as const;

  const baseOptions = [
    { label: '就労（月160時間以上・月22日以上）', value: `${prefix}_work_160h22d`, points: 64 },
    { label: '就労（月160時間以上・月20〜21日）', value: `${prefix}_work_160h20d`, points: 62 },
    { label: '就労（月160時間以上・月20日未満）', value: `${prefix}_work_160h`, points: 60 },
    { label: '就労（月140〜159時間）', value: `${prefix}_work_140h`, points: 50 },
    { label: '就労（月120〜139時間）', value: `${prefix}_work_120h`, points: 40 },
    { label: '就労（月100〜119時間）', value: `${prefix}_work_100h`, points: 30 },
    { label: '就労（月80〜99時間）', value: `${prefix}_work_80h`, points: 20 },
    { label: '就労（月60〜79時間）', value: `${prefix}_work_60h`, points: 10 },
    { label: '虐待・DV被害（本人が当事者）', value: `${prefix}_dv`, points: 55 },
    { label: '災害復旧作業中', value: `${prefix}_disaster`, points: 50 },
    { label: '疾病（入院相当・長期安静療養）', value: `${prefix}_ill_severe`, points: 35 },
    { label: '妊娠・出産（産前産後休業中）', value: `${prefix}_birth`, points: 32 },
    { label: '疾病（常時安静が必要）', value: `${prefix}_ill_moderate`, points: 30 },
    { label: '障がい（身体1・2級、療育A、精神1級等）', value: `${prefix}_dis_severe`, points: 25 },
    { label: '疾病（保育に著しく支障がある）', value: `${prefix}_ill_mild`, points: 25 },
    { label: '障がい（身体3級等）', value: `${prefix}_dis_moderate`, points: 22 },
    { label: '障がい（身体手帳所持・その他）', value: `${prefix}_dis_mild`, points: 20 },
    { label: '介護・看護（月160時間以上）', value: `${prefix}_care_160h`, points: 15 },
    { label: '介護・看護（月100時間以上付添）', value: `${prefix}_care_100h`, points: 13 },
    { label: '介護・看護（月60時間以上付添）', value: `${prefix}_care_60h`, points: 11 },
    { label: '求職活動中（支援機関等の証明あり）', value: `${prefix}_seek_proof`, points: 10 },
    { label: '求職活動中（証明なし）', value: `${prefix}_seek`, points: 5 },
    { label: '該当なし（在宅）', value: `${prefix}_none`, points: 0 },
  ];

  return [
    {
      id: `${prefix}_situation`,
      category,
      label: `${parentLabel}の保育が必要な主な事由`,
      helpText: '最も当てはまる事由（最も高い点数）を1つ選んでください',
      inputType: 'select',
      options: baseOptions,
    },
  ];
}

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親世帯または準ずる状態ですか？（別表第1特例加算＋別表第2調整指数）',
    helpText: '別表第1の特例加算（基準指数に加算）と別表第2の調整指数を合算した点数です',
    inputType: 'radio',
    options: [
      { label: 'ひとり親世帯（死別・離別等）で就労・就学等の保育事由あり（+80点）', value: 'adj_sp_employed', points: 80 },
      { label: 'ひとり親世帯で求職活動中（+85点）', value: 'adj_sp_seeking', points: 85 },
      { label: 'ひとり親に準ずる状態（配偶者が長期入院・服役等）（+40点）', value: 'adj_sp_equiv', points: 40 },
      { label: 'いいえ', value: 'adj_sp_no', points: 0 },
    ],
  },
  {
    id: 'adj_nursery_worker',
    category: 'adjustment',
    label: '倶知安町内の認可保育施設で保育士として1年以上勤務していますか？',
    inputType: 'radio',
    options: [
      { label: 'はい（+20点）', value: 'adj_nw_yes', points: 20 },
      { label: 'いいえ', value: 'adj_nw_no', points: 0 },
    ],
  },
  {
    id: 'adj_parental_leave',
    category: 'adjustment',
    label: '育児休業取得中で、保育所入所後の復職予定はどうですか？',
    helpText: '育児休業から復職するために保育所を申込む場合の加点です',
    inputType: 'radio',
    options: [
      { label: '育休終了後、直ちに復職する予定（+20点）', value: 'adj_pl_immediate', points: 20 },
      { label: '育休終了後、復職予定だが延長も許容できる（+10点）', value: 'adj_pl_flexible', points: 10 },
      { label: '育休中でない / 該当なし', value: 'adj_pl_no', points: 0 },
    ],
  },
  {
    id: 'adj_foster',
    category: 'adjustment',
    label: '里親として児童の委託を受けていますか？',
    inputType: 'radio',
    options: [
      { label: 'はい（+15点）', value: 'adj_fo_yes', points: 15 },
      { label: 'いいえ', value: 'adj_fo_no', points: 0 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: 'きょうだいの在園・就学状況を教えてください',
    inputType: 'radio',
    options: [
      { label: 'きょうだいが同施設に同時利用中または同時申請中（+8点）', value: 'adj_sib_same', points: 8 },
      { label: 'きょうだいが小学校に在学中（+5点）', value: 'adj_sib_elem', points: 5 },
      { label: '該当なし', value: 'adj_sib_no', points: 0 },
    ],
  },
  {
    id: 'adj_employment_status',
    category: 'adjustment',
    label: '就労状況・家庭状況について該当するものを選んでください',
    inputType: 'radio',
    options: [
      { label: '倒産・解雇等の非自己都合で失業中（+5点）', value: 'adj_es_layoff', points: 5 },
      { label: '単身赴任中（別居状態）（+3点）', value: 'adj_es_transfer', points: 3 },
      { label: '生活保護を受けながら自立支援中（+3点）', value: 'adj_es_welfare', points: 3 },
      { label: '同居の親族に障がい手帳所持者がいる（+1点）', value: 'adj_es_dis_family', points: 1 },
      { label: '該当なし', value: 'adj_es_no', points: 0 },
    ],
  },
  {
    id: 'adj_grandparent',
    category: 'adjustment',
    label: '65歳未満で無職の祖父母について',
    helpText: '保育の代替手段となり得る祖父母がいる場合は減点されます',
    inputType: 'radio',
    options: [
      { label: '65歳未満・無職の祖父母と同居している（-10点）', value: 'adj_gp_same', points: -10 },
      { label: '65歳未満・無職の祖父母が倶知安町内に住んでいる（別居）（-8点）', value: 'adj_gp_town', points: -8 },
      { label: '該当なし', value: 'adj_gp_no', points: 0 },
    ],
  },
  {
    id: 'adj_arrears',
    category: 'adjustment',
    label: '保育料の滞納・過去の内定辞退について',
    inputType: 'radio',
    options: [
      { label: '該当なし', value: 'adj_arr_no', points: 0 },
      { label: '前年度に保育所の内定を辞退または取り消した（-20点）', value: 'adj_arr_cancel', points: -20 },
      { label: '保育料を1ヶ月分滞納している（-20点）', value: 'adj_arr_1m', points: -20 },
      { label: '保育料を2ヶ月分滞納している（-30点）', value: 'adj_arr_2m', points: -30 },
      { label: '保育料を3ヶ月以上滞納している（-60点以上）', value: 'adj_arr_3m', points: -60 },
    ],
  },
  {
    id: 'adj_unapproved_facility',
    category: 'adjustment',
    label: '認可外保育施設等の利用が可能ですか？',
    helpText: '認可外保育施設・認可外事業所内保育施設等の利用が可能な場合',
    inputType: 'radio',
    options: [
      { label: 'はい、利用可能（-30点）', value: 'adj_unapp_yes', points: -30 },
      { label: 'いいえ、利用不可', value: 'adj_unapp_no', points: 0 },
    ],
  },
  {
    id: 'adj_parental_leave_extension',
    category: 'adjustment',
    label: '育児休業の延長を希望していますか？（3号児のみ対象）',
    helpText: '育児休業の延長等を目的として利用調整を希望される場合',
    inputType: 'radio',
    options: [
      { label: 'はい、延長を希望する（-100点）', value: 'adj_ple_yes', points: -100 },
      { label: 'いいえ / 3号児以外', value: 'adj_ple_no', points: 0 },
    ],
  },
  {
    id: 'adj_workplace_facility',
    category: 'adjustment',
    label: '勤務先保育施設の利用が可能ですか？（3号児のみ対象）',
    helpText: '勤務先内保育施設・事業所内保育施設等の利用が可能な場合',
    inputType: 'radio',
    options: [
      { label: 'はい、利用可能（-30点）', value: 'adj_wf_yes', points: -30 },
      { label: 'いいえ / 3号児以外', value: 'adj_wf_no', points: 0 },
    ],
  },
  {
    id: 'adj_preschool_siblings',
    category: 'adjustment',
    label: '就学前児童のきょうだいが同時利用・同時申請される人数を教えてください',
    helpText: '申請者の保育所利用対象児童と同時に利用または申請する就学前児童',
    inputType: 'radio',
    options: [
      { label: '該当なし', value: 'adj_ps_no', points: 0 },
      { label: '2人同時（+2点）', value: 'adj_ps_2', points: 2 },
      { label: '3人同時（+3点）', value: 'adj_ps_3', points: 3 },
      { label: '4人以上同時（+4点）', value: 'adj_ps_4plus', points: 4 },
    ],
  },
  {
    id: 'adj_transfer_bonus',
    category: 'adjustment',
    label: '認定こども園への転所加算について',
    helpText: '認可保育所で3歳クラスに達するため認定こども園へ転所が必要な場合',
    inputType: 'radio',
    options: [
      { label: 'はい、該当する（+5点）', value: 'adj_tb_yes', points: 5 },
      { label: 'いいえ、該当しない', value: 'adj_tb_no', points: 0 },
    ],
  },
];

export const kutchanData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
