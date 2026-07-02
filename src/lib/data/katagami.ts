import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 潟上市 保育の必要量の認定基準（選考基準）
// 出典: 潟上市保育所等の利用調整に関する施行細則（別表）
// https://www.city.katagami.lg.jp/section/reiki_int/reiki_honbun/r123RG00000507.html
// 父母合算（sum方式）。就労は週間就労時間と勤務日数の区分で基本点数が異なる。
// ---------------------------------------------------------------------------

const municipality = {
  id: 'katagami',
  name: '潟上市',
  slug: 'katagami',
  prefecture: '秋田県',
  maxBasePoints: 20,
  scoringMethod: 'sum',
} as const;

function makeParentQuestions(p: 'parent1' | 'parent2'): Question[] {
  const pNum = p === 'parent1' ? '1' : '2';
  const isMother = p === 'parent2';
  return [
    {
      id: `${p}_reason`,
      category: `${p}_base` as const,
      label: `保護者${pNum}の保育を必要とする主な事由`,
      inputType: 'select',
      options: [
        { label: '選択してください', value: `${p}_reason_none`, points: 0 },
        { label: '就労（外勤・自営・農業・居宅内労働）', value: `${p}_reason_work`, points: 0 },
        ...(isMother ? [{ label: '妊娠・出産（産前産後8週以内）（9点）', value: `${p}_reason_birth`, points: 9 }] : []),
        { label: '疾病・障がい', value: `${p}_reason_illness`, points: 0 },
        { label: '介護・看護', value: `${p}_reason_care`, points: 0 },
        { label: '家庭の災害（火災・風水害等）（※市が判断）', value: `${p}_reason_disaster`, points: 0 },
        { label: '求職活動中（2点）', value: `${p}_reason_jobseeking`, points: 2 },
        { label: '就学・職業訓練', value: `${p}_reason_study`, points: 0 },
        { label: '育児休業中（既入所児の継続利用）（6点）', value: `${p}_reason_leave`, points: 6 },
      ],
    },
    {
      id: `${p}_work`,
      category: `${p}_base` as const,
      label: `保護者${pNum}の就労状況（勤務形態・週間就労時間）`,
      helpText: '就労が理由の場合のみ選択してください',
      inputType: 'radio',
      options: [
        { label: 'あてはまらない', value: `${p}_work_none`, points: 0 },
        { label: '週5日以上・月20日以上 週35時間以上（月140h以上）（10点）', value: `${p}_work_10`, points: 10 },
        { label: '週5日以上・月20日以上 週30時間以上（月120〜139h）（9点）', value: `${p}_work_9`, points: 9 },
        { label: '週5日以上・月20日以上 週25時間以上（月100〜119h）（8点）', value: `${p}_work_8a`, points: 8 },
        { label: '週5日以上・月20日以上 週20時間以上（月80〜99h）（7点）', value: `${p}_work_7a`, points: 7 },
        { label: '週4日以上・月16〜19日 週28時間以上（月112h以上）（8点）', value: `${p}_work_8b`, points: 8 },
        { label: '週4日以上・月16〜19日 週24時間以上（月96〜111h）（7点）', value: `${p}_work_7b`, points: 7 },
        { label: '週4日以上・月16〜19日 週20時間以上（月80〜95h）（6点）', value: `${p}_work_6`, points: 6 },
        { label: '週4日以上・月16〜19日 週16時間以上（月64〜79h）（5点）', value: `${p}_work_5`, points: 5 },
        { label: '上記以外・月64時間以上就労（3点）', value: `${p}_work_3`, points: 3 },
      ],
    },
    {
      id: `${p}_illness`,
      category: `${p}_base` as const,
      label: `保護者${pNum}の疾病・障がいの状況`,
      helpText: '疾病・障がいが理由の場合のみ選択してください',
      inputType: 'radio',
      options: [
        { label: 'あてはまらない', value: `${p}_illness_none`, points: 0 },
        { label: '概ね1ヶ月以上の入院（10点）', value: `${p}_illness_hosp_10`, points: 10 },
        { label: '入院に相当する治療・常時病臥（10点）', value: `${p}_illness_bedridden_10`, points: 10 },
        { label: '精神疾患 重度の症状（ひとり親）（12点）', value: `${p}_illness_psych_single_12`, points: 12 },
        { label: '精神疾患 重度の症状（ひとり親以外）（10点）', value: `${p}_illness_psych_10`, points: 10 },
        { label: '精神疾患 上記以外の程度（8点）', value: `${p}_illness_psych_8`, points: 8 },
        { label: '一般療養 保育が常時困難な場合（8点）', value: `${p}_illness_care_8`, points: 8 },
        { label: '一般療養 比較的軽症（定期通院等）（5点）', value: `${p}_illness_care_5`, points: 5 },
        { label: '障害 手帳1〜2級・療育手帳A・精神1〜2級（10点）', value: `${p}_illness_dis_10`, points: 10 },
        { label: '障害 手帳3級・療育手帳B・精神3級（8点）', value: `${p}_illness_dis_8`, points: 8 },
        { label: '障害 手帳4〜6級等 保育が困難な場合（5点）', value: `${p}_illness_dis_5`, points: 5 },
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
        { label: '施設等への付添い（居宅外労働に準ずる）（10点目安）', value: `${p}_care_facility`, points: 10 },
        { label: '重度障害者等の全介護（要介護5・4）（10点）', value: `${p}_care_10`, points: 10 },
        { label: '認知症による徘徊等・常時の見守りと介護（10点）', value: `${p}_care_dementia_10`, points: 10 },
        { label: '常時の見守りと介助（食事・排泄・入浴等）（8点）', value: `${p}_care_8`, points: 8 },
      ],
    },
    {
      id: `${p}_study`,
      category: `${p}_base` as const,
      label: `保護者${pNum}の就学・職業訓練の月間時間`,
      helpText: '就職に必要な技能習得のための就学が理由の場合のみ選択してください',
      inputType: 'radio',
      options: [
        { label: 'あてはまらない', value: `${p}_study_none`, points: 0 },
        { label: '月100時間以上就学（8点）', value: `${p}_study_8`, points: 8 },
        { label: '月64時間以上100時間未満就学（6点）', value: `${p}_study_6`, points: 6 },
      ],
    },
  ];
}

const parent1Questions = makeParentQuestions('parent1');
const parent2Questions = makeParentQuestions('parent2');

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_disability_child',
    category: 'adjustment',
    label: '入所希望児童が障害児保育を必要とする子どもですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_disability_child_no', points: 0 },
      { label: 'はい（+3）', value: 'adj_disability_child_yes', points: 3 },
    ],
  },
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親家庭ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい（+10）', value: 'adj_single_parent_yes', points: 10 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護受給世帯で就労による自立につながることが認められますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい（+2）', value: 'adj_welfare_yes', points: 2 },
    ],
  },
  {
    id: 'adj_transfer',
    category: 'adjustment',
    label: '転居による転園申請ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_transfer_no', points: 0 },
      { label: 'はい（+1）', value: 'adj_transfer_yes', points: 1 },
    ],
  },
  {
    id: 'adj_sibling_same_facility',
    category: 'adjustment',
    label: '兄弟が入所している保育所への入所を希望していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_same_facility_no', points: 0 },
      { label: 'はい（+1.5）', value: 'adj_sibling_same_facility_yes', points: 1.5 },
    ],
  },
  {
    id: 'adj_leave_return',
    category: 'adjustment',
    label: '育児休業後の入所希望状況を選択してください',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_leave_return_none', points: 0 },
      { label: '育休期間満了後（1歳の誕生日前日まで取得）入所希望（+2）', value: 'adj_leave_return_2', points: 2 },
      { label: '育休取得により退園し、育休明けに同じ保育園への入所希望（+3）', value: 'adj_leave_return_3', points: 3 },
    ],
  },
  {
    id: 'adj_small_scale_graduate',
    category: 'adjustment',
    label: '入所希望児童が地域型保育給付施設の卒園児ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_small_scale_graduate_no', points: 0 },
      { label: 'はい（+5）', value: 'adj_small_scale_graduate_yes', points: 5 },
    ],
  },
  {
    id: 'adj_nursery_worker',
    category: 'adjustment',
    label: '保護者が幼稚園教諭・保育士等ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_nursery_worker_no', points: 0 },
      { label: 'はい（+10）', value: 'adj_nursery_worker_yes', points: 10 },
    ],
  },
  {
    id: 'adj_home_business',
    category: 'adjustment',
    label: '居宅内自営業の専従者（協力者）ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_home_business_no', points: 0 },
      { label: 'はい（-1）', value: 'adj_home_business_yes', points: -1 },
    ],
  },
  {
    id: 'adj_grandparent',
    category: 'adjustment',
    label: '同居の祖父母が保育の実施基準をいずれも満たしていない場合、年齢はいくつですか？',
    inputType: 'radio',
    options: [
      { label: '該当なし（祖父母不在・65歳以上・保育可能等）', value: 'adj_grandparent_none', points: 0 },
      { label: '60〜64歳の同居祖父母が保育基準を満たさない（-2）', value: 'adj_grandparent_60_64', points: -2 },
      { label: '59歳以下の同居祖父母が保育基準を満たさない（-5）', value: 'adj_grandparent_59', points: -5 },
    ],
  },
  {
    id: 'adj_fee_unpaid',
    category: 'adjustment',
    label: '保育料等を3ヶ月以上未納していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_fee_unpaid_no', points: 0 },
      { label: 'はい（-5）', value: 'adj_fee_unpaid_yes', points: -5 },
    ],
  },
];

export const katagamiData: MunicipalityData = {
  municipality,
  questions: [
    ...parent1Questions,
    ...parent2Questions,
    ...adjustmentQuestions,
  ],
};
