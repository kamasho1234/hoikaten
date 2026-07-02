import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 南国市 保育施設等利用調整基準
// 出典: 南国市保育施設等の利用調整に関する要綱（別表(1)・別表(2)）
// https://www.city.nankoku.lg.jp/reiki/reiki_honbun/i900RG00001015.html
// 父母合算（sum方式）。就労は種別+月間時間で指数が異なる。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'nankoku',
  name: '南国市',
  slug: 'nankoku',
  prefecture: '高知県',
  maxBasePoints: 200,
  scoringMethod: 'sum',
} as const;

function makeParentQuestions(p: 'parent1' | 'parent2'): Question[] {
  const pNum = p === 'parent1' ? '1' : '2';
  return [
    {
      id: `${p}_reason`,
      category: `${p}_base` as const,
      label: `保護者${pNum}の保育を必要とする主な事由`,
      inputType: 'select',
      options: [
        { label: '選択してください', value: `${p}_reason_none`, points: 0 },
        { label: '就労（居宅外・中心者 / 居宅外・協力者 / 居宅内 / 内職）', value: `${p}_reason_work`, points: 0 },
        { label: '出産（産前産後8週以内）（60点）', value: `${p}_reason_birth_60`, points: 60 },
        { label: '出産（産前産後6ヶ月以内・8週除く）（15点）', value: `${p}_reason_birth_15`, points: 15 },
        { label: '疾病・障害', value: `${p}_reason_illness`, points: 0 },
        { label: '介護・看護', value: `${p}_reason_care`, points: 0 },
        { label: '災害復旧（100点）', value: `${p}_reason_disaster`, points: 100 },
        { label: '求職活動（20点）', value: `${p}_reason_jobseeking`, points: 20 },
        { label: '就学・職業訓練', value: `${p}_reason_study`, points: 0 },
        { label: '育児休業中（転園希望）（5点）', value: `${p}_reason_leave`, points: 5 },
        { label: 'その他（親不在等）（100点）', value: `${p}_reason_other`, points: 100 },
      ],
    },
    {
      id: `${p}_work`,
      category: `${p}_base` as const,
      label: `保護者${pNum}の就労種別と月間時間`,
      helpText: '就労が理由の場合のみ選択してください',
      inputType: 'radio',
      options: [
        { label: 'あてはまらない', value: `${p}_work_none`, points: 0 },
        { label: '居宅外就労（会社員・自営業中心者）月150時間以上（100点）', value: `${p}_work_out_main_150`, points: 100 },
        { label: '居宅外就労（会社員・自営業中心者）月120〜150時間未満（95点）', value: `${p}_work_out_main_120`, points: 95 },
        { label: '居宅外就労（会社員・自営業中心者）月90〜120時間未満（90点）', value: `${p}_work_out_main_90`, points: 90 },
        { label: '居宅外就労（会社員・自営業中心者）月64〜90時間未満（80点）', value: `${p}_work_out_main_64`, points: 80 },
        { label: '居宅外就労（会社員・自営業中心者）月48〜64時間未満（60点）', value: `${p}_work_out_main_48`, points: 60 },
        { label: '居宅外就労（自営業協力者・専従者）月150時間以上（80点）', value: `${p}_work_out_sub_150`, points: 80 },
        { label: '居宅外就労（自営業協力者・専従者）月120〜150時間未満（75点）', value: `${p}_work_out_sub_120`, points: 75 },
        { label: '居宅外就労（自営業協力者・専従者）月90〜120時間未満（70点）', value: `${p}_work_out_sub_90`, points: 70 },
        { label: '居宅外就労（自営業協力者・専従者）月64〜90時間未満（60点）', value: `${p}_work_out_sub_64`, points: 60 },
        { label: '居宅外就労（自営業協力者・専従者）月48〜64時間未満（50点）', value: `${p}_work_out_sub_48`, points: 50 },
        { label: '居宅内就労（自営業中心者）月150時間以上（95点）', value: `${p}_work_in_main_150`, points: 95 },
        { label: '居宅内就労（自営業中心者）月120〜150時間未満（90点）', value: `${p}_work_in_main_120`, points: 90 },
        { label: '居宅内就労（自営業中心者）月90〜120時間未満（85点）', value: `${p}_work_in_main_90`, points: 85 },
        { label: '居宅内就労（自営業中心者）月64〜90時間未満（75点）', value: `${p}_work_in_main_64`, points: 75 },
        { label: '居宅内就労（自営業中心者）月48〜64時間未満（55点）', value: `${p}_work_in_main_48`, points: 55 },
        { label: '居宅内就労（自営業協力者・専従者）月150時間以上（75点）', value: `${p}_work_in_sub_150`, points: 75 },
        { label: '居宅内就労（自営業協力者・専従者）月120〜150時間未満（70点）', value: `${p}_work_in_sub_120`, points: 70 },
        { label: '居宅内就労（自営業協力者・専従者）月90〜120時間未満（65点）', value: `${p}_work_in_sub_90`, points: 65 },
        { label: '居宅内就労（自営業協力者・専従者）月64〜90時間未満（55点）', value: `${p}_work_in_sub_64`, points: 55 },
        { label: '居宅内就労（自営業協力者・専従者）月48〜64時間未満（45点）', value: `${p}_work_in_sub_48`, points: 45 },
        { label: '内職等（月120時間以上）（45点）', value: `${p}_work_piecework_45`, points: 45 },
        { label: '内職等（月120時間未満）（40点）', value: `${p}_work_piecework_40`, points: 40 },
      ],
    },
    {
      id: `${p}_illness`,
      category: `${p}_base` as const,
      label: `保護者${pNum}の疾病・障害の状況`,
      helpText: '疾病・障害が理由の場合のみ選択してください',
      inputType: 'radio',
      options: [
        { label: 'あてはまらない', value: `${p}_illness_none`, points: 0 },
        { label: '長期入院（1ヶ月以上）または常時病臥（100点）', value: `${p}_illness_100`, points: 100 },
        { label: '在宅療養（保育不能）（80点）', value: `${p}_illness_80`, points: 80 },
        { label: '在宅療養（保育困難）（60点）', value: `${p}_illness_60`, points: 60 },
        { label: '心身障害（手帳1・2級等）（100点）', value: `${p}_illness_dis_100`, points: 100 },
        { label: '心身障害（手帳3級等）（80点）', value: `${p}_illness_dis_80`, points: 80 },
        { label: '心身障害（手帳4〜6級等）（60点）', value: `${p}_illness_dis_60`, points: 60 },
      ],
    },
    {
      id: `${p}_care`,
      category: `${p}_base` as const,
      label: `保護者${pNum}の介護・看護の状況`,
      helpText: '介護・看護が理由の場合のみ選択してください',
      inputType: 'radio',
      options: [
        { label: 'あてはまらない', value: `${p}_care_none`, points: 0 },
        { label: '最重度対象者（要介護5等）の在宅介護（90点）', value: `${p}_care_90`, points: 90 },
        { label: '中度対象者（要介護3〜4等）の在宅介護（70点）', value: `${p}_care_70`, points: 70 },
        { label: 'その他の介護・看護（50点）', value: `${p}_care_50`, points: 50 },
      ],
    },
    {
      id: `${p}_study`,
      category: `${p}_base` as const,
      label: `保護者${pNum}の就学・職業訓練の月間時間`,
      helpText: '就学・職業訓練が理由の場合のみ選択してください',
      inputType: 'radio',
      options: [
        { label: 'あてはまらない', value: `${p}_study_none`, points: 0 },
        { label: '月150時間以上（80点）', value: `${p}_study_150`, points: 80 },
        { label: '月120〜150時間未満（75点）', value: `${p}_study_120`, points: 75 },
        { label: '月90〜120時間未満（70点）', value: `${p}_study_90`, points: 70 },
        { label: '月64〜90時間未満（65点）', value: `${p}_study_64`, points: 65 },
        { label: '月48〜64時間未満（60点）', value: `${p}_study_48`, points: 60 },
      ],
    },
  ];
}

const parent1Questions = makeParentQuestions('parent1');
const parent2Questions = makeParentQuestions('parent2');

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親家庭ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい（+30）', value: 'adj_single_parent_yes', points: 30 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護受給世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい（+10）', value: 'adj_welfare_yes', points: 10 },
    ],
  },
  {
    id: 'adj_disability_member',
    category: 'adjustment',
    label: '同居の世帯員に障害者がいますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_disability_member_no', points: 0 },
      { label: 'はい（+10）', value: 'adj_disability_member_yes', points: 10 },
    ],
  },
  {
    id: 'adj_third_child',
    category: 'adjustment',
    label: '当該児童は第3子以降ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_third_child_no', points: 0 },
      { label: 'はい（+10）', value: 'adj_third_child_yes', points: 10 },
    ],
  },
  {
    id: 'adj_grandparent',
    category: 'adjustment',
    label: '65歳未満の同居親族（祖父母等）が保育可能な状態ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ（65歳以上・就労中・保育不能等）', value: 'adj_grandparent_no', points: 0 },
      { label: 'はい（保育可能な65歳未満の同居親族あり）（-2）', value: 'adj_grandparent_yes', points: -2 },
    ],
  },
  {
    id: 'adj_fee_unpaid',
    category: 'adjustment',
    label: '保育料を滞納していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_fee_unpaid_no', points: 0 },
      { label: 'はい（-43）', value: 'adj_fee_unpaid_yes', points: -43 },
    ],
  },
  {
    id: 'adj_other_city',
    category: 'adjustment',
    label: '他市区町村から転入しての4月入所希望ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_other_city_no', points: 0 },
      { label: 'はい（+12）', value: 'adj_other_city_yes', points: 12 },
    ],
  },
  {
    id: 'adj_sibling_simultaneous',
    category: 'adjustment',
    label: '兄弟姉妹を同時に同一施設へ申込していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_simultaneous_no', points: 0 },
      { label: 'はい（+18）', value: 'adj_sibling_simultaneous_yes', points: 18 },
    ],
  },
  {
    id: 'adj_sibling_transfer',
    category: 'adjustment',
    label: '前々年度から継続して兄弟姉妹が在籍する施設への転園を希望していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_transfer_no', points: 0 },
      { label: 'はい（+8）', value: 'adj_sibling_transfer_yes', points: 8 },
    ],
  },
  {
    id: 'adj_twins',
    category: 'adjustment',
    label: '多胎児（双子等）で同一施設への入所を希望していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_twins_no', points: 0 },
      { label: 'はい（+15）', value: 'adj_twins_yes', points: 15 },
    ],
  },
  {
    id: 'adj_disability_child',
    category: 'adjustment',
    label: '入所を希望する児童が障害児ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_disability_child_no', points: 0 },
      { label: 'はい（+10）', value: 'adj_disability_child_yes', points: 10 },
    ],
  },
  {
    id: 'adj_abuse',
    category: 'adjustment',
    label: '児童虐待・DVのおそれがある世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_abuse_no', points: 0 },
      { label: 'はい（+50）', value: 'adj_abuse_yes', points: 50 },
    ],
  },
  {
    id: 'adj_leave_return',
    category: 'adjustment',
    label: '産休・育休明けに復職予定ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_leave_return_no', points: 0 },
      { label: 'はい（+15）', value: 'adj_leave_return_yes', points: 15 },
    ],
  },
  {
    id: 'adj_new_nursery_worker',
    category: 'adjustment',
    label: '市内の保育施設に新たに就労（予定）する保育士等ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_new_nursery_worker_no', points: 0 },
      { label: 'はい（+35）', value: 'adj_new_nursery_worker_yes', points: 35 },
    ],
  },
  {
    id: 'adj_transfer_nursery_worker',
    category: 'adjustment',
    label: '市内の保育施設で転園希望の在籍保育士等ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_transfer_nursery_worker_no', points: 0 },
      { label: 'はい（+13）', value: 'adj_transfer_nursery_worker_yes', points: 13 },
    ],
  },
  {
    id: 'adj_transfer_distant',
    category: 'adjustment',
    label: '県外への単身赴任・転勤等ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_transfer_distant_no', points: 0 },
      { label: 'はい（+5）', value: 'adj_transfer_distant_yes', points: 5 },
    ],
  },
  {
    id: 'adj_dishonest',
    category: 'adjustment',
    label: '過去に申込辞退等の不正行為がありましたか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_dishonest_no', points: 0 },
      { label: 'はい（-18）', value: 'adj_dishonest_yes', points: -18 },
    ],
  },
];

export const nankokuData: MunicipalityData = {
  municipality,
  questions: [
    ...parent1Questions,
    ...parent2Questions,
    ...adjustmentQuestions,
  ],
};
