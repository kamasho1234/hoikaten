import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 川俣町（福島県伊達郡）保育所等利用調整基準データ
// 出典: https://www1.g-reiki.net/kawamata/reiki_honbun/c519RG00001356.html
// 川俣町保育の利用調整に関する要綱（令和5年4月1日施行）別表第1・第2
// 計算方式: sum方式（父母それぞれの基本指数を合算）
// 最高基準点数: 外勤・就学・介護（週40時間以上）・災害復旧で11点
// ---------------------------------------------------------------------------

const municipality = {
  id: 'kawamata',
  name: '川俣町',
  slug: 'kawamata',
  prefecture: '福島県',
  maxBasePoints: 11,
  scoringMethod: 'sum',
} as const;

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `p${parentNum}`;
  const parentLabel = parentNum === 1 ? '父（保護者1）' : '母（保護者2）';
  const category = `parent${parentNum}_base` as const;

  const baseOptions = [
    // 11点
    { label: '外勤就労・月160時間以上（週40時間以上）', value: `${prefix}_out_160h`, points: 11 },
    { label: '就学・週40時間以上（専門学校・大学等）', value: `${prefix}_study_40h`, points: 11 },
    { label: '介護・施設付添・週40時間以上', value: `${prefix}_care_att_40h`, points: 11 },
    { label: '災害復旧作業中', value: `${prefix}_disaster`, points: 11 },
    { label: '虐待・DV等のおそれで社会的養護が必要', value: `${prefix}_abuse_dv`, points: 11 },
    // 10点
    { label: '外勤就労・月140〜160時間未満（週35時間以上）', value: `${prefix}_out_140h`, points: 10 },
    { label: '自営業・農業・内職・月160時間以上', value: `${prefix}_self_160h`, points: 10 },
    { label: '就学・週35時間以上', value: `${prefix}_study_35h`, points: 10 },
    { label: '介護・施設付添・週35時間以上', value: `${prefix}_care_att_35h`, points: 10 },
    { label: '妊娠・出産（分娩・育児休業で保育困難）', value: `${prefix}_birth`, points: 10 },
    { label: '傷病・入院1ヶ月以上', value: `${prefix}_ill_hosp`, points: 10 },
    { label: '傷病・常時病臥', value: `${prefix}_ill_bedridden`, points: 10 },
    { label: '障害・身体障害1〜2級/精神障害1級/療育A', value: `${prefix}_dis_sev`, points: 10 },
    // 9点
    { label: '外勤就労・月120〜140時間未満（週30時間以上）', value: `${prefix}_out_120h`, points: 9 },
    { label: '自営業・農業・内職・月140〜160時間未満', value: `${prefix}_self_140h`, points: 9 },
    { label: '就学・週30時間以上', value: `${prefix}_study_30h`, points: 9 },
    { label: '介護・施設付添・週30時間以上', value: `${prefix}_care_att_30h`, points: 9 },
    { label: '介護・自宅介護（要介護4〜5等）', value: `${prefix}_care_home_sev`, points: 9 },
    // 8点
    { label: '外勤就労・月100〜120時間未満（週25時間以上）', value: `${prefix}_out_100h`, points: 8 },
    { label: '自営業・農業・内職・月120〜140時間未満', value: `${prefix}_self_120h`, points: 8 },
    { label: '就学・週25時間以上', value: `${prefix}_study_25h`, points: 8 },
    { label: '介護・施設付添・週25時間以上', value: `${prefix}_care_att_25h`, points: 8 },
    { label: '育児休業中（既利用児童の継続利用が必要）', value: `${prefix}_parental_leave`, points: 8 },
    // 7点
    { label: '外勤就労・月80〜100時間未満（週20時間以上）', value: `${prefix}_out_80h`, points: 7 },
    { label: '自営業・農業・内職・月100〜120時間未満', value: `${prefix}_self_100h`, points: 7 },
    { label: '就学・週20時間以上', value: `${prefix}_study_20h`, points: 7 },
    { label: '介護・施設付添・週20時間以上', value: `${prefix}_care_att_20h`, points: 7 },
    // 6点
    { label: '外勤就労・月48〜80時間未満（週12時間以上）', value: `${prefix}_out_48h`, points: 6 },
    { label: '自営業・農業・内職・月80〜100時間未満', value: `${prefix}_self_80h`, points: 6 },
    { label: '就学・週12時間以上', value: `${prefix}_study_12h`, points: 6 },
    { label: '介護・施設付添・週12時間以上', value: `${prefix}_care_att_12h`, points: 6 },
    { label: '傷病・居宅療養（安静要・その他）', value: `${prefix}_ill_rest`, points: 6 },
    { label: '障害・身体障害3級/精神障害2級', value: `${prefix}_dis_mod`, points: 6 },
    { label: '介護・その他（要介護等）', value: `${prefix}_care_other`, points: 6 },
    // 5点
    { label: '自営業・農業・内職・月48〜80時間未満', value: `${prefix}_self_48h`, points: 5 },
    // 4点
    { label: '外勤就労内定（近々就労予定）', value: `${prefix}_out_planned`, points: 4 },
    { label: '自営業等・就労内定', value: `${prefix}_self_planned`, points: 4 },
    { label: '傷病・定期通院加療中', value: `${prefix}_ill_out`, points: 4 },
    { label: '障害・身体障害4級以下/精神障害3級/療育B', value: `${prefix}_dis_mild`, points: 4 },
    { label: '求職活動中', value: `${prefix}_seek`, points: 4 },
    // 0点
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
    id: 'adj_welfare',
    category: 'adjustment',
    label: '家庭の状況（別表第2 加算）',
    helpText: '最も当てはまる区分を1つ選んでください',
    inputType: 'radio',
    options: [
      { label: 'ひとり親世帯（母子・父子世帯）（+13点）', value: 'adj_wf_single', points: 13 },
      { label: '生計中心者が失業・倒産（+6点）', value: 'adj_wf_jobless', points: 6 },
      { label: '虐待・DVのおそれで社会的養護が必要（+5点）', value: 'adj_wf_dv', points: 5 },
      { label: '生活保護世帯（+2点）', value: 'adj_wf_welfare', points: 2 },
      { label: '該当なし', value: 'adj_wf_no', points: 0 },
    ],
  },
  {
    id: 'adj_birth_parental',
    category: 'adjustment',
    label: '出産・育児休暇の状況（別表第2 加算）',
    inputType: 'radio',
    options: [
      { label: '出産・育児休暇明け入園希望（+2点）', value: 'adj_birth_return', points: 2 },
      { label: '該当なし', value: 'adj_birth_no', points: 0 },
    ],
  },
  {
    id: 'adj_siblings',
    category: 'adjustment',
    label: '継続利用・兄弟姉妹の状況（別表第2 加算）',
    inputType: 'radio',
    options: [
      { label: '同施設を継続利用希望（+4点）', value: 'adj_cont_yes', points: 4 },
      { label: '兄弟姉妹が同時に同施設を希望（+2点）', value: 'adj_sib_yes', points: 2 },
      { label: '一時退園後の再入園希望（+1点）', value: 'adj_sib_reapply', points: 1 },
      { label: '該当なし', value: 'adj_sib_no', points: 0 },
    ],
  },
  {
    id: 'adj_child_status',
    category: 'adjustment',
    label: '申込児童・家族の状況（別表第2 加算・減算）',
    inputType: 'radio',
    options: [
      { label: '申込児童が障害者手帳所持（+3点）', value: 'adj_child_dis', points: 3 },
      { label: '地域型保育事業（小規模保育等）の卒園児（+3点）', value: 'adj_child_grad', points: 3 },
      { label: '保育関連施設勤務保護者（+1点）', value: 'adj_family_childcare', points: 1 },
      { label: '同居者が障害者手帳所持（+1点）', value: 'adj_family_disability', points: 1 },
      { label: '申込児童が3歳以上（-5点）', value: 'adj_child_3yo', points: -5 },
      { label: '該当なし', value: 'adj_child_no', points: 0 },
    ],
  },
  {
    id: 'adj_childcare',
    category: 'adjustment',
    label: '一時保育・認可外保育利用・単身赴任（別表第2 加算）',
    inputType: 'radio',
    options: [
      { label: '一時保育月8回以上利用（+1点）', value: 'adj_temp_childcare', points: 1 },
      { label: '認可外保育所等利用中（+1点）', value: 'adj_noncert_childcare', points: 1 },
      { label: '親が単身赴任・長期出張中（+1点）', value: 'adj_apart_parent', points: 1 },
      { label: '該当なし', value: 'adj_childcare_no', points: 0 },
    ],
  },
  {
    id: 'adj_minus',
    category: 'adjustment',
    label: 'その他の状況（別表第2 減算）',
    helpText: '減算が発生する場合は選択してください',
    inputType: 'radio',
    options: [
      { label: '父母が同一事業所で自営業（-5点）', value: 'adj_m_sameoffice', points: -5 },
      { label: '保育料3ヶ月以上未納（-3点）', value: 'adj_m_arrears', points: -3 },
      { label: '65歳未満の祖父母が不就労で同居（-1点）', value: 'adj_m_grandparent', points: -1 },
      { label: '年度途中申請で他園入園中（-1点）', value: 'adj_m_other_enrolled', points: -1 },
      { label: '事業主が親族（-1点）', value: 'adj_m_family_business', points: -1 },
      { label: '該当なし', value: 'adj_m_no', points: 0 },
    ],
  },
];

export const kawamataData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
