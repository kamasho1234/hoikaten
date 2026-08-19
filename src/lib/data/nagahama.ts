import type { MunicipalityData, Question } from '../types';

// ---------------------------------------------------------------------------
// 長浜市 保育の必要性の認定基準表（基本点数・調整点数）データ
//
// 出典: 長浜市教育委員会事務局幼児課「令和8年度 幼稚園・保育所・認定こども園ガイドブック」
//       P32-P33「長浜市保育の必要性の認定基準表」
//       https://www.city.nagahama.lg.jp/cmsfiles/contents/0000015/15824/R8guidebook.pdf
//       （長浜市Webサイト「令和8年度 保育所・認定こども園(長時部)の利用(入所)申込案内」
//         https://www.city.nagahama.lg.jp/0000015824.html からリンク）
//
// 2026-08-19: 従来のデータは他自治体と同じ点数配列のテンプレート（推定値）だったため、
//             上記の公式基準表を読み取って全面的に置き換えた。
//             ガイドブックのPDFは埋め込みフォントのToUnicodeが壊れておりテキスト抽出が
//             できないため、該当ページを画像化して読み取った。
//
// 原典の備考:
//   「基本点数と調整点数の合計点数が高い児童から順に、利用調整を行います」
//   「基本点数が複数該当する場合、点数が高い事由で利用調整を行います」
//   「同点選考となった際は、『同点の場合の優先順位』の1から順に優先度を判断します」
// ---------------------------------------------------------------------------

const municipality = {
  id: 'nagahama',
  name: '長浜市',
  slug: 'nagahama',
  prefecture: '滋賀県',
  maxBasePoints: 20, // 父母各10点
} as const;

// ---------------------------------------------------------------------------
// 基本点数。父母それぞれについて選ぶ
// ---------------------------------------------------------------------------

/** 1 就労・内職 */
const employmentOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_employment_none`, points: 0 },
  { label: '月160時間以上の就労', value: `${prefix}_employment_10`, points: 10 },
  { label: '月140時間以上160時間未満の就労', value: `${prefix}_employment_9`, points: 9 },
  { label: '月120時間以上140時間未満の就労', value: `${prefix}_employment_8`, points: 8 },
  { label: '月100時間以上120時間未満の就労', value: `${prefix}_employment_7`, points: 7 },
  { label: '月80時間以上100時間未満の就労', value: `${prefix}_employment_6`, points: 6 },
  { label: '月64時間以上80時間未満の就労', value: `${prefix}_employment_5`, points: 5 },
  { label: '内職（月64時間以上の就労）', value: `${prefix}_employment_naishoku_3`, points: 3 },
];

/** 2 妊娠・出産（公式の基準表では母の欄のみに点数がある） */
const childbirthOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_childbirth_none`, points: 0 },
  { label: '出産（予定）月を除く前2か月から後2か月まで', value: `${prefix}_childbirth_8`, points: 8 },
  { label: '出産（予定）月を除く前3か月、後3か月から6か月まで', value: `${prefix}_childbirth_5`, points: 5 },
];

/** 3 病気・けが */
const illnessOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_illness_none`, points: 0 },
  { label: '1か月以上の入院または入院見込', value: `${prefix}_illness_10`, points: 10 },
  { label: '自宅療養で常時臥床', value: `${prefix}_illness_9`, points: 9 },
  { label: '通院加療を行い、常に安静を要する', value: `${prefix}_illness_7`, points: 7 },
  { label: '上記以外で通院加療が必要', value: `${prefix}_illness_4`, points: 4 },
];

/** 3 しょうがい */
const disabilityOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disability_none`, points: 0 },
  {
    label: '身体1・2級、精神1級、療育A、要介護4・5の認定を受けていて保育が困難',
    value: `${prefix}_disability_9`,
    points: 9,
  },
  {
    label: '身体3級、精神2級、療育B1、要介護3の認定を受けていて保育が困難',
    value: `${prefix}_disability_7`,
    points: 7,
  },
  { label: '身体4級、精神3級、療育B2の交付を受けていて保育が困難', value: `${prefix}_disability_4`, points: 4 },
];

/** 4 同居親族の介護・看護 */
const careOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_care_none`, points: 0 },
  { label: '入院中の親族に常時付添が必要', value: `${prefix}_care_9`, points: 9 },
  {
    label: '臥床者・重度しょうがい者等（身体1・2級、療育A、要介護4・5）を居宅で常時（月20日以上1日6時間以上）介護・看護する',
    value: `${prefix}_care_6`,
    points: 6,
  },
  {
    label: '病人やしょうがい者等（身体3・4級、療育B、要介護3）を居宅で常時（月20日以上1日6時間以上）介護・看護する',
    value: `${prefix}_care_4`,
    points: 4,
  },
];

/** 5 災害復旧 */
const disasterOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_disaster_none`, points: 0 },
  { label: '震災、風水害、火災その他の災害の復旧活動を行っている', value: `${prefix}_disaster_10`, points: 10 },
];

/** 6 求職 */
const jobSeekingOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_jobseeking_none`, points: 0 },
  { label: 'ひとり親で就労の必要性が高い', value: `${prefix}_jobseeking_5`, points: 5 },
  { label: '上記以外の求職', value: `${prefix}_jobseeking_2`, points: 2 },
];

/** 7 就学 */
const educationOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_education_none`, points: 0 },
  { label: '就学・技能習得等のため月120時間以上の通学', value: `${prefix}_education_7`, points: 7 },
  { label: '就学・技能習得等のため月64時間以上月120時間未満の通学', value: `${prefix}_education_5`, points: 5 },
];

/** 8 育休中 */
const parentalLeaveOptions = (prefix: string) => [
  { label: 'あてはまらない', value: `${prefix}_leave_none`, points: 0 },
  {
    label: '育児休業中にすでに保育を利用している子どもがいて、継続利用が必要',
    value: `${prefix}_leave_4`,
    points: 4,
  },
];

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `parent${parentNum}`;
  const category = `parent${parentNum}_base` as const;
  const parentLabel = parentNum === 1 ? '保護者1' : '保護者2';

  const reasonQuestion: Question = {
    id: `${prefix}_reason`,
    category,
    label: `${parentLabel}：保育が必要な理由`,
    helpText: '基本点数が複数該当する場合は、点数が高い事由で利用調整が行われます',
    inputType: 'select',
    options: [
      { label: '仕事をしている（内職を含む）', value: `${prefix}_reason_employment`, points: 0 },
      { label: '妊娠・出産', value: `${prefix}_reason_childbirth`, points: 0 },
      { label: '病気・けが', value: `${prefix}_reason_illness`, points: 0 },
      { label: 'しょうがいがある', value: `${prefix}_reason_disability`, points: 0 },
      { label: '同居親族の介護・看護をしている', value: `${prefix}_reason_care`, points: 0 },
      { label: '災害の復旧活動を行っている', value: `${prefix}_reason_disaster`, points: 0 },
      { label: '求職している', value: `${prefix}_reason_jobseeking`, points: 0 },
      { label: '就学している', value: `${prefix}_reason_education`, points: 0 },
      { label: '育児休業中', value: `${prefix}_reason_leave`, points: 0 },
    ],
  };

  const detailQuestions: Question[] = [
    {
      id: `${prefix}_employment`,
      category,
      label: `${parentLabel}はどのくらい働いていますか？`,
      inputType: 'radio',
      options: employmentOptions(prefix),
    },
    {
      id: `${prefix}_childbirth`,
      category,
      label: `${parentLabel}の妊娠・出産の状況は？`,
      helpText: '公式の基準表では母の欄のみに点数があります',
      inputType: 'radio',
      options: childbirthOptions(prefix),
    },
    {
      id: `${prefix}_illness`,
      category,
      label: `${parentLabel}の病気・けがの状況は？`,
      inputType: 'radio',
      options: illnessOptions(prefix),
    },
    {
      id: `${prefix}_disability`,
      category,
      label: `${parentLabel}のしょうがいの程度は？`,
      inputType: 'radio',
      options: disabilityOptions(prefix),
    },
    {
      id: `${prefix}_care`,
      category,
      label: `${parentLabel}の介護・看護の状況は？`,
      helpText:
        '被介護・看護者が介護施設・学校・園に入所・在籍している場合は除きます。居宅での介護は、2歳児未満の乳幼児が対象の場合も除きます',
      inputType: 'radio',
      options: careOptions(prefix),
    },
    {
      id: `${prefix}_disaster`,
      category,
      label: `${parentLabel}は災害の復旧活動を行っていますか？`,
      inputType: 'radio',
      options: disasterOptions(prefix),
    },
    {
      id: `${prefix}_jobseeking`,
      category,
      label: `${parentLabel}の求職の状況は？`,
      inputType: 'radio',
      options: jobSeekingOptions(prefix),
    },
    {
      id: `${prefix}_education`,
      category,
      label: `${parentLabel}の通学の状況は？`,
      inputType: 'radio',
      options: educationOptions(prefix),
    },
    {
      id: `${prefix}_leave`,
      category,
      label: `${parentLabel}は育児休業中ですか？`,
      inputType: 'radio',
      options: parentalLeaveOptions(prefix),
    },
  ];

  return [reasonQuestion, ...detailQuestions];
}

// ---------------------------------------------------------------------------
// 調整点数（加点・減点）
// ---------------------------------------------------------------------------

const adjustmentQuestions: Question[] = [
  // --- 加点 ---
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親世帯、またはこれに準ずる世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      { label: 'はい', value: 'adj_single_parent_yes', points: 11 },
    ],
  },
  {
    id: 'adj_welfare',
    category: 'adjustment',
    label: '生活保護世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_welfare_no', points: 0 },
      { label: 'はい', value: 'adj_welfare_yes', points: 2 },
    ],
  },
  {
    id: 'adj_social_care',
    category: 'adjustment',
    label: '社会的養護が必要な世帯ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_social_care_no', points: 0 },
      { label: 'はい', value: 'adj_social_care_yes', points: 5 },
    ],
  },
  {
    id: 'adj_layoff',
    category: 'adjustment',
    label: '生計中心者の失業により就労の必要性が高いですか？',
    helpText: 'ひとり親家庭は除きます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_layoff_no', points: 0 },
      { label: 'はい', value: 'adj_layoff_yes', points: 4 },
    ],
  },
  {
    id: 'adj_child_disability',
    category: 'adjustment',
    label: '申込児童にしょうがいがあり、支援が必要ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_child_disability_no', points: 0 },
      { label: 'はい', value: 'adj_child_disability_yes', points: 5 },
    ],
  },
  {
    id: 'adj_sibling',
    category: 'adjustment',
    label: '申込児童の兄弟姉妹と同一の保育所等に入所を希望しますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_sibling_no', points: 0 },
      { label: 'はい', value: 'adj_sibling_yes', points: 2 },
    ],
  },
  {
    id: 'adj_multiple_birth',
    category: 'adjustment',
    label: '申込児童は多胎児ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_multiple_birth_no', points: 0 },
      { label: 'はい', value: 'adj_multiple_birth_yes', points: 1 },
    ],
  },
  {
    id: 'adj_hoikushi',
    category: 'adjustment',
    label: '保護者は保育士・保育教諭・幼稚園教諭・看護師として保育所等で就労していますか？',
    helpText:
      '就労予定を含みます。「保育所等」とは保育所・認定こども園・地域型保育事業所・企業主導型保育施設・幼稚園（預かり保育を実施している等、待機児童の解消に寄与する施設に限る）を指します。市内の保育所等で就労している場合は、さらに加算されます',
    inputType: 'radio',
    options: [
      { label: 'あてはまらない', value: 'adj_hoikushi_no', points: 0 },
      { label: '県内の保育所等で月64時間以上月160時間未満の就労', value: 'adj_hoikushi_2', points: 2 },
      { label: '市内の保育所等で月64時間以上月160時間未満の就労', value: 'adj_hoikushi_3', points: 3 },
      { label: '県内の保育所等で月160時間以上の就労', value: 'adj_hoikushi_5', points: 5 },
      { label: '市内の保育所等で月160時間以上の就労', value: 'adj_hoikushi_8', points: 8 },
    ],
  },
  {
    id: 'adj_continuous_work',
    category: 'adjustment',
    label: '3か月以上の就労（月64時間以上）を継続していますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_continuous_work_no', points: 0 },
      { label: 'はい', value: 'adj_continuous_work_yes', points: 1 },
    ],
  },
  {
    id: 'adj_leave_return',
    category: 'adjustment',
    label: '育児休業から就労復帰しますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_leave_return_no', points: 0 },
      { label: 'はい', value: 'adj_leave_return_yes', points: 1 },
    ],
  },
  // --- 減点 ---
  {
    id: 'adj_job_offer',
    category: 'adjustment',
    label: '就労（就学）が内定の状態ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_job_offer_no', points: 0 },
      { label: 'はい', value: 'adj_job_offer_yes', points: -1 },
    ],
  },
  {
    id: 'adj_work_mismatch',
    category: 'adjustment',
    label: '就労の証明内容と勤務実績・収入実績に食い違いがありますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_work_mismatch_no', points: 0 },
      { label: 'はい', value: 'adj_work_mismatch_yes', points: -4 },
    ],
  },
  {
    id: 'adj_no_proof',
    category: 'adjustment',
    label: '自営業等で就労の事実を客観的に証明できる書類を提出できますか？',
    inputType: 'radio',
    options: [
      { label: '自営業ではない、または提出できる', value: 'adj_no_proof_ok', points: 0 },
      { label: '提出できない', value: 'adj_no_proof_ng', points: -2 },
    ],
  },
  {
    id: 'adj_grandparent',
    category: 'adjustment',
    label: '申込児童と同居の祖父母が65歳未満で保育が可能ですか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_grandparent_no', points: 0 },
      { label: 'はい', value: 'adj_grandparent_yes', points: -4 },
    ],
  },
  {
    id: 'adj_declined',
    category: 'adjustment',
    label: '正当な理由なく前年度・当該年度の入所内定を辞退したことがありますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_declined_no', points: 0 },
      { label: 'はい', value: 'adj_declined_yes', points: -5 },
    ],
  },
  {
    id: 'adj_rule_violation',
    category: 'adjustment',
    label: '保育所等の運営に支障を来すような行為を度々行ったことがありますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_rule_violation_no', points: 0 },
      { label: 'はい', value: 'adj_rule_violation_yes', points: -10 },
    ],
  },
  {
    id: 'adj_false_application',
    category: 'adjustment',
    label: '過去に虚偽による利用申込や変更届出を行わない等の行為がありましたか？',
    helpText: '公正な利用調整に支障を来すような行為が対象です',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_false_application_no', points: 0 },
      { label: 'はい', value: 'adj_false_application_yes', points: -10 },
    ],
  },
  {
    id: 'adj_arrears',
    category: 'adjustment',
    label: '納期限から3か月以上経過した保育料等の滞納がありますか？',
    helpText: '卒園児を含みます',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_arrears_no', points: 0 },
      { label: 'はい', value: 'adj_arrears_yes', points: -20 },
    ],
  },
  {
    id: 'adj_leave_extension',
    category: 'adjustment',
    label: '希望する施設を利用できないときは、育児休業の延長を許容できますか？',
    inputType: 'radio',
    options: [
      { label: 'いいえ', value: 'adj_leave_extension_no', points: 0 },
      { label: 'はい', value: 'adj_leave_extension_yes', points: -20 },
    ],
  },
];

export const nagahamaData: MunicipalityData = {
  municipality,
  questions: [...buildParentQuestions(1), ...buildParentQuestions(2), ...adjustmentQuestions],
};
