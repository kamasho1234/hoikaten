import type { MunicipalityData, Question } from '../types';

// -------------------------------------------------------------------------
// 丹波市 保育園入園 利用調整基準データ
// 出典: 丹波市「認定こども園及び地域型保育などにおける調整のための基準（令和8年度 入所のご案内）」
// https://www.city.tamba.lg.jp/material/files/group/22/r8nyuusyoannaisassi.pdf
// -------------------------------------------------------------------------
// 丹波市は「父の①基礎点数＋母の①基礎点数＋②優先事由（加算・減算）」の合計点数で選考する。
// 同点の場合は優先度判断基準（基礎点数の高い順、連携小学校区内かどうかなど）で決まる。
// 「虐待・DV」「その他（特別な事情）」は市長が別途判断すると定められていて点数がないため、選択肢にしていない。
// 点数は第1希望の園により算定すると定められている。
// -------------------------------------------------------------------------

const municipality = {
  id: 'tamba',
  name: '丹波市',
  slug: 'tamba',
  prefecture: '兵庫県',
  maxBasePoints: 40,
} as const;

const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '外勤・月150時間以上', value: `${prefix}_employment_0`, points: 40 },
  { label: '外勤・月140時間以上', value: `${prefix}_employment_1`, points: 36 },
  { label: '外勤・月120時間以上', value: `${prefix}_employment_2`, points: 32 },
  { label: '外勤・月100時間以上', value: `${prefix}_employment_3`, points: 28 },
  { label: '外勤・月80時間以上', value: `${prefix}_employment_4`, points: 24 },
  { label: '外勤・月60時間以上', value: `${prefix}_employment_5`, points: 20 },
  { label: '外勤・月48時間以上', value: `${prefix}_employment_6`, points: 16 },
  { label: '内職・月120時間以上', value: `${prefix}_employment_7`, points: 24 },
  { label: '内職・月100時間以上119時間未満', value: `${prefix}_employment_8`, points: 20 },
  { label: '内職・月80時間以上99時間未満', value: `${prefix}_employment_9`, points: 16 },
  { label: '内職・月60時間以上79時間未満', value: `${prefix}_employment_10`, points: 12 },
  { label: '内職・月48時間以上59時間未満', value: `${prefix}_employment_11`, points: 8 },
  { label: '就労は確認できるが明確な就労時間を記載できない', value: `${prefix}_employment_12`, points: 8 },
];

const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '切迫早産等で要安静と診断された', value: `${prefix}_childbirth_0`, points: 40 },
  { label: '出産予定日の8週前の月初から産後8週を経過する日の翌日の属する月末まで', value: `${prefix}_childbirth_1`, points: 32 },
];

const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: 'おおむね1か月以上の入院', value: `${prefix}_illness_0`, points: 40 },
  { label: '疾病のためおおむね1か月以上の常時臥床', value: `${prefix}_illness_1`, points: 40 },
  { label: '医師が長期加療（安静）を要すると診断', value: `${prefix}_illness_2`, points: 32 },
  { label: '医師がおおむね1か月以上の加療（安静）を要すると診断', value: `${prefix}_illness_3`, points: 24 },
  { label: '比較的軽症だが定期的な通院等を要する', value: `${prefix}_illness_4`, points: 16 },
];

const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  { label: '1・2級 / 療育A / 重度', value: `${prefix}_disability_0`, points: 40 },
  { label: '3級 / 療育B / 中度', value: `${prefix}_disability_1`, points: 24 },
  { label: '4級以下 / 軽度', value: `${prefix}_disability_2`, points: 16 },
];

const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: 'おおむね1か月以上の親族の入院付添', value: `${prefix}_care_0`, points: 40 },
  { label: '身体障害者・常時寝たきり・要介護5・4の親族の介護・看護', value: `${prefix}_care_1`, points: 36 },
  { label: '通院の付き添いに週平均3回以上あたっている', value: `${prefix}_care_2`, points: 16 },
  { label: '上記以外の親族の介護・看護', value: `${prefix}_care_3`, points: 12 },
];

const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '災害・風水害等で家屋が失われ復旧にあたる（全壊または半壊）', value: `${prefix}_disaster_0`, points: 40 },
];

const jobseekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: '既に求職活動を開始していることが確認できる', value: `${prefix}_jobseeking_0`, points: 8 },
  { label: '求職活動の開始が確認できない、または入所後に就労先を探す', value: `${prefix}_jobseeking_1`, points: 3 },
];

const schoolOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_school_none`, points: 0 },
  { label: '月150時間以上に相当', value: `${prefix}_school_0`, points: 40 },
  { label: '月120時間以上に相当', value: `${prefix}_school_1`, points: 32 },
  { label: '月80時間以上に相当', value: `${prefix}_school_2`, points: 24 },
  { label: '月48時間以上に相当', value: `${prefix}_school_3`, points: 16 },
  { label: '上記に該当しない就学・職業訓練', value: `${prefix}_school_4`, points: 3 },
];

const leave_continueOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_leave_continue_none`, points: 0 },
  { label: '既に保育を利用している子どもがいて継続利用が必要', value: `${prefix}_leave_continue_0`, points: 28 },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: '丹波市は父母それぞれの基礎点数を合計し、世帯の優先事由を加減して選考します',
    inputType: 'select',
    options: [
      { label: '就労している（自営業・農業を含む）', value: `${prefix}_reason_employment`, points: 0 },
      { label: '妊娠・出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '疾病', value: `${prefix}_reason_illness`, points: 0 },
      { label: '障害', value: `${prefix}_reason_disability`, points: 0 },
      { label: '介護・看護', value: `${prefix}_reason_care`, points: 0 },
      { label: '災害復旧', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '求職活動', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '就学・職業訓練', value: `${prefix}_reason_school`, points: 0 },
      { label: '育休特例（在園児の継続利用）', value: `${prefix}_reason_leave_continue`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}の就労時間（月あたり）は？`,
      inputType: 'radio',
      options: employmentOptions(prefix),
    },
    {
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}の妊娠・出産の状況は？`,
      inputType: 'radio',
      options: childbirthOptions(prefix),
    },
    {
      id: `${prefix}_illness`,
      category,
      label: `${parentLabel}の疾病の状況は？`,
      inputType: 'radio',
      options: illnessOptions(prefix),
    },
    {
      id: `${prefix}_disability`,
      category,
      label: `${parentLabel}の障害の程度は？`,
      inputType: 'radio',
      options: disabilityOptions(prefix),
    },
    {
      id: `${prefix}_care`,
      category,
      label: `${parentLabel}の介護・看護の状況は？`,
      inputType: 'radio',
      options: careOptions(prefix),
    },
    {
      id: `${prefix}_disaster`,
      category,
      label: `${parentLabel}は家庭の災害の復旧にあたっていますか？`,
      inputType: 'radio',
      options: disasterOptions(prefix),
    },
    {
      id: `${prefix}_jobseeking`,
      category,
      label: `${parentLabel}の求職活動の状況は？`,
      inputType: 'radio',
      options: jobseekingOptions(prefix),
    },
    {
      id: `${prefix}_school`,
      category,
      label: `${parentLabel}の就学・職業訓練の状況は？`,
      helpText: '就労（外勤）の区分に準じ、該当がない場合は3点と定められています',
      inputType: 'radio',
      options: schoolOptions(prefix),
    },
    {
      id: `${prefix}_leave_continue`,
      category,
      label: `${parentLabel}は育児休業取得時に在園児の継続利用が必要ですか？`,
      inputType: 'radio',
      options: leave_continueOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親の家庭等ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_0', points: 0 },
      { label: '死亡・離別・離婚調停中（別居）・行方不明・拘禁など（+80）', value: 'adj_single_parent_1', points: 80 },
      { label: '保護者のいずれかが長期間の単身赴任等で常時不在（+15）', value: 'adj_single_parent_2', points: 15 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯で就労することが内定していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_0', points: 0 },
      { label: 'はい（+20）', value: 'adj_welfare_1', points: 20 },
    ],
  },
  {
    id: 'adj_social_care',
    category: 'adjustment',
    label: '虐待やDVのおそれがあるなど、社会的養護が必要ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_social_care_0', points: 0 },
      { label: 'はい（+40）', value: 'adj_social_care_1', points: 40 },
    ],
  },
  {
    id: 'adj_child_support',
    category: 'adjustment',
    label: '申請児童が特別に支援を要しますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_child_support_0', points: 0 },
      { label: 'はい（+6）', value: 'adj_child_support_1', points: 6 },
    ],
  },
  {
    id: 'adj_leave_end',
    category: 'adjustment',
    label: '育児休業終了と同時に利用を希望しますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_leave_end_0', points: 0 },
      { label: 'はい（+12）', value: 'adj_leave_end_1', points: 12 },
    ],
  },
  {
    id: 'adj_school_area',
    category: 'adjustment',
    label: '居住地が連携小学校区内にある3・4・5歳児ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_school_area_0', points: 0 },
      { label: 'はい（+20）', value: 'adj_school_area_1', points: 20 },
    ],
  },
  {
    id: 'adj_sibling_same',
    category: 'adjustment',
    label: '異なる施設を利用しているきょうだいが、同じ施設の利用を希望しますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_same_0', points: 0 },
      { label: 'はい（+5）', value: 'adj_sibling_same_1', points: 5 },
    ],
  },
  {
    id: 'adj_sibling_enrolled',
    category: 'adjustment',
    label: '兄姉が既に保育所等を利用していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_enrolled_0', points: 0 },
      { label: 'はい（+20）', value: 'adj_sibling_enrolled_1', points: 20 },
    ],
  },
  {
    id: 'adj_sibling_together',
    category: 'adjustment',
    label: 'きょうだい（多胎児を含む）が同時に新規利用を希望しますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_together_0', points: 0 },
      { label: 'はい（+10）', value: 'adj_sibling_together_1', points: 10 },
    ],
  },
  {
    id: 'adj_graduate',
    category: 'adjustment',
    label: '小規模保育事業の卒業児童ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_graduate_0', points: 0 },
      { label: 'はい（+20）', value: 'adj_graduate_1', points: 20 },
    ],
  },
  {
    id: 'adj_hoikushi',
    category: 'adjustment',
    label: '保護者が保育士・幼稚園教諭・保育教諭・看護師等として保育施設で勤務（予定を含む）していますか？',
    helpText: '市内外を問わず、受入状況に直接影響を与える職員に限ると定められています',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_hoikushi_0', points: 0 },
      { label: 'はい（+70）', value: 'adj_hoikushi_1', points: 70 },
    ],
  },
  {
    id: 'adj_leave_extension',
    category: 'adjustment',
    label: '育児休業の延長も許容していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_leave_extension_0', points: 0 },
      { label: 'はい（-50）', value: 'adj_leave_extension_1', points: -50 },
    ],
  },
  {
    id: 'adj_grandparent',
    category: 'adjustment',
    label: '同居の祖父母（65歳未満）が就労しておらず、家庭で保育できますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_grandparent_0', points: 0 },
      { label: 'はい（-12）', value: 'adj_grandparent_1', points: -12 },
    ],
  },
  {
    id: 'adj_home_child',
    category: 'adjustment',
    label: '家庭に保育所・認定こども園に入所していない就学前の児童がいますか？',
    helpText: '母が「出産」の事由である場合、出生した子は含みません',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_home_child_0', points: 0 },
      { label: 'はい（-12）', value: 'adj_home_child_1', points: -12 },
    ],
  },
  {
    id: 'adj_outside_area',
    category: 'adjustment',
    label: '居住地が提供区域（旧町）外ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_outside_area_0', points: 0 },
      { label: 'はい（-10）', value: 'adj_outside_area_1', points: -10 },
    ],
  },
  {
    id: 'adj_proof',
    category: 'adjustment',
    label: '就労証明の証明者が親族、または自営業・内職・農業等で確認書類を添付できませんか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_proof_0', points: 0 },
      { label: 'はい（-5）', value: 'adj_proof_1', points: -5 },
    ],
  },
];

export const tambaData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
