import type { MunicipalityData, Question } from '../types';

// 出典: 西尾市「保育園・認定こども園（保育園コース） 入園のご案内」22ページ
//       「参考：令和9年度 西尾市保育園・認定こども園入園選考基準指数表」
// https://www.city.nishio.aichi.jp/_res/projects/default_project/_page_/001/002/368/r9_annai_20260729.pdf
// 掲載ページ: https://www.city.nishio.aichi.jp/kosodate/hoikuen/1005131/1002368.html
// 選考の説明: https://www.city.nishio.aichi.jp/kosodate/hoikuen/1005131/1012298.html
// 計算方式: avg方式（父母の調整後基準指数の平均）
//   指数表の集計欄が
//     ①基準指数（父・母それぞれ）
//     ②個人調整指数（父・母それぞれ）
//     ③調整後基準指数（①＋②。父・母それぞれ）
//     ④平均基準指数（③の合計 ／ 人数）   ← ここで父母を平均する
//     ⑤世帯調整指数
//     総合計（④＋⑤）
//   という構造になっており、④の算式が「（③の合計）／人数」と明記されている。
//   選考方法にも「上記指数表により総合計の多い順に入園を決定する」と記載がある。
// 最高基準指数: 15（父母それぞれ。平均するため世帯の平均基準指数も最高15）
// 注:
//  - ②個人調整指数は父母それぞれに加減算されるため、保護者ごとの設問として実装している
//    （engine は parent1_base / parent2_base の合計を③として扱い、avg で④を求める）。
//  - 「出産」（基準指数11）と「出産で、入園希望日が出産予定日より前の場合」（個人調整-1）は
//    原典の父欄が「－」のため、保護者2（母）にのみ設けている。
//  - 「適宜」とされている項目（災害復旧、ひとり親世帯等の求職中、虐待、その他前各号に類する
//    保育を必要とする状態）は点数が定まっていないため選択肢に含めていない（helpText で案内）。
//  - 個人調整指数4（市内）と5（市外）は排他のため単一select。
//  - 世帯調整指数2（祖父母同居なし+3）と3（祖父母同居あり+1）も排他のため単一select。
//  - 同一指数時の優先順位14項目は加減算ではないためシミュレーターでは表現していない。
//  - *1 健康保険の資格確認、源泉徴収票又は労働条件通知書で雇用実態を確認できない場合は
//    「その他」（内職・その他）で算定する。
//  - *2 育休中は復帰後の時間が月110時間未満の場合、時間による指数となる。
//  - *3 保護者が共に自営業専従者・家族従業者に該当する場合は、時間の長い方を自営主扱いとする。

const municipality = {
  id: 'nishio',
  name: '西尾市',
  slug: 'nishio',
  prefecture: '愛知県',
  maxBasePoints: 15,
  scoringMethod: 'avg',
} as const;

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `p${parentNum}`;
  const parentLabel = parentNum === 1 ? '父（保護者1）' : '母（保護者2）';
  const category = `parent${parentNum}_base` as const;

  const baseOptions = [
    // 1 就労（外勤・自営主・業務委託）
    { label: '就労（外勤・自営主・業務委託）：月155時間以上勤務', value: `${prefix}_work_155`, points: 15 },
    { label: '就労（外勤・自営主・業務委託）：月150時間以上勤務', value: `${prefix}_work_150`, points: 14 },
    { label: '就労（外勤・自営主・業務委託）：月140時間以上勤務', value: `${prefix}_work_140`, points: 13 },
    { label: '就労（外勤・自営主・業務委託）：月130時間以上勤務', value: `${prefix}_work_130`, points: 12 },
    { label: '就労（外勤・自営主・業務委託）：月120時間以上勤務', value: `${prefix}_work_120`, points: 11 },
    { label: '就労（外勤・自営主・業務委託）：月115時間以上勤務', value: `${prefix}_work_115`, points: 10 },
    { label: '就労（外勤・自営主・業務委託）：月110時間以上勤務', value: `${prefix}_work_110`, points: 9 },
    { label: '就労（外勤・自営主・業務委託）：月100時間以上勤務', value: `${prefix}_work_100`, points: 8 },
    { label: '就労（外勤・自営主・業務委託）：月90時間以上勤務', value: `${prefix}_work_90`, points: 7 },
    { label: '就労（外勤・自営主・業務委託）：月80時間以上勤務', value: `${prefix}_work_80`, points: 6 },
    { label: '就労（外勤・自営主・業務委託）：月70時間以上勤務', value: `${prefix}_work_70`, points: 5 },
    { label: '就労（外勤・自営主・業務委託）：月60時間以上勤務', value: `${prefix}_work_60`, points: 4 },
    { label: '育休中（入園年度中に職場復帰。3歳以上児のみ）', value: `${prefix}_ikukyu_fukki`, points: 9 },
    // 1 就労（自営業専従者・家族従業者）
    { label: '自営業専従者・家族従業者：月155時間以上従事', value: `${prefix}_family_155`, points: 11 },
    { label: '自営業専従者・家族従業者：月120時間以上従事', value: `${prefix}_family_120`, points: 8 },
    { label: '自営業専従者・家族従業者：月90時間以上従事', value: `${prefix}_family_90`, points: 6 },
    { label: '自営業専従者・家族従業者：月60時間以上従事', value: `${prefix}_family_60`, points: 3 },
    // 1 就労（内職・その他）
    { label: '内職・その他：月120時間以上従事', value: `${prefix}_naishoku_120`, points: 4 },
    { label: '内職・その他：月90時間以上従事', value: `${prefix}_naishoku_90`, points: 3 },
    { label: '内職・その他：月60時間以上従事', value: `${prefix}_naishoku_60`, points: 2 },
    // 2 出産（母のみ）
    { label: '出産', value: `${prefix}_birth`, points: 11 },
    // 3 病気・障害
    { label: '入院', value: `${prefix}_hosp`, points: 15 },
    { label: '自宅療養：常時寝たきり', value: `${prefix}_home_bed`, points: 15 },
    { label: '自宅療養：常時安静', value: `${prefix}_home_rest`, points: 10 },
    { label: '自宅療養：通院', value: `${prefix}_home_tsuin`, points: 6 },
    { label: '障害：身体障害者手帳1・2級、療育手帳A判定、精神障害者保健福祉手帳1級', value: `${prefix}_dis_1`, points: 11 },
    { label: '障害：療育手帳B判定・精神障害者保健福祉手帳2級', value: `${prefix}_dis_2`, points: 9 },
    { label: '障害：身体障害者手帳3級、療育手帳C判定、精神障害者保健福祉手帳3級', value: `${prefix}_dis_3`, points: 6 },
    { label: '介護認定：要介護度3〜5', value: `${prefix}_care_35`, points: 9 },
    { label: '介護認定：要介護度1〜2', value: `${prefix}_care_12`, points: 6 },
    // 4 介護等
    { label: '入院付添・自宅介護：月120時間以上の付添・介護が必要な場合', value: `${prefix}_kaigo_120`, points: 8 },
    { label: '入院付添・自宅介護：月60時間以上の付添・介護が必要な場合', value: `${prefix}_kaigo_60`, points: 5 },
    // 6 特例
    { label: '就学：月120時間以上就学', value: `${prefix}_school_120`, points: 6 },
    { label: '就学：月60時間以上就学', value: `${prefix}_school_60`, points: 4 },
    { label: '求職中（ひとり親世帯非該当）', value: `${prefix}_seek`, points: 1 },
    { label: '育児休業中（3歳以上児のみ）', value: `${prefix}_ikukyu`, points: 1 },
    // 該当なし
    { label: '該当なし（在宅）', value: `${prefix}_none`, points: 0 },
  ].filter((o) => parentNum === 2 || !o.value.endsWith('_birth'));

  const questions: Question[] = [
    {
      id: `${prefix}_situation`,
      category,
      label: `${parentLabel}の状況（①基準指数）`,
      helpText:
        parentNum === 2
          ? '当てはまる項目を1つ選んでください。「出産」は原典の父欄が「－」のため母の選択肢にのみあります。健康保険の資格確認・源泉徴収票・労働条件通知書で雇用実態を確認できない場合は「内職・その他」で算定されます。なお災害復旧、ひとり親世帯（離婚調停中で別居の場合を含む）・両親不存在世帯の求職中、虐待などは原典で「適宜」とされ点数が定まっていないため選択肢に含めていません。'
          : '当てはまる項目を1つ選んでください。健康保険の資格確認・源泉徴収票・労働条件通知書で雇用実態を確認できない場合は「内職・その他」で算定されます。なお災害復旧、ひとり親世帯（離婚調停中で別居の場合を含む）・両親不存在世帯の求職中、虐待などは原典で「適宜」とされ点数が定まっていないため選択肢に含めていません。',
      inputType: 'select',
      options: baseOptions,
    },
    {
      id: `${prefix}_adj_koyou`,
      category,
      label: `${parentLabel}の雇用開始日は申込日以前ですか？（②個人調整指数1）`,
      helpText: '就労実績を確認できない場合は対象外です。',
      inputType: 'radio',
      options: [
        { label: '雇用開始日が申込日以前（+2点）', value: `${prefix}_adj_koyou_yes`, points: 2 },
        { label: '該当なし', value: `${prefix}_adj_koyou_none`, points: 0 },
      ],
    },
    {
      id: `${prefix}_adj_hoikushi`,
      category,
      label: `${parentLabel}は保育士・幼稚園教諭・保育教諭として保育園等に従事していますか？（②個人調整指数4・5）`,
      inputType: 'select',
      options: [
        { label: '西尾市内の保育園等の施設に従事する（+2点）', value: `${prefix}_adj_hoikushi_in`, points: 2 },
        { label: '西尾市外の保育園等の施設に従事する（+1点）', value: `${prefix}_adj_hoikushi_out`, points: 1 },
        { label: '該当なし', value: `${prefix}_adj_hoikushi_none`, points: 0 },
      ],
    },
    {
      id: `${prefix}_adj_tanshin`,
      category,
      label: `${parentLabel}は入園月時点で会社都合による単身赴任をしていますか？（②個人調整指数6）`,
      inputType: 'radio',
      options: [
        { label: '会社都合による単身赴任をしている（+1点）', value: `${prefix}_adj_tanshin_yes`, points: 1 },
        { label: '該当なし', value: `${prefix}_adj_tanshin_none`, points: 0 },
      ],
    },
    {
      id: `${prefix}_adj_jigyou_shunyu`,
      category,
      label: `${parentLabel}は自営業主・業務委託で事業収入等が市の基準額を下回りますか？（②個人調整指数7）`,
      helpText:
        '確定申告書等により確認できる事業収入等を対象事業月数で除して算出した額が、愛知県最低賃金に60時間を乗じた額を下回る場合が対象です。',
      inputType: 'radio',
      options: [
        { label: '事業収入等の実績が市の定める基準額を下回る（-4点）', value: `${prefix}_adj_jigyou_shunyu_yes`, points: -4 },
        { label: '該当なし', value: `${prefix}_adj_jigyou_shunyu_none`, points: 0 },
      ],
    },
    {
      id: `${prefix}_adj_mikakutei`,
      category,
      label: `${parentLabel}は入園月以降の就労先・勤務日・勤務時間等を確認できますか？（②個人調整指数8）`,
      helpText:
        '派遣社員で就労先未確定（育休復帰予定で派遣先未決定を含む）、有期雇用で更新予定なしの場合が減点対象です。',
      inputType: 'radio',
      options: [
        { label: '入園月以降の就労先・勤務日・勤務時間等を確認できない（-5点）', value: `${prefix}_adj_mikakutei_yes`, points: -5 },
        { label: '確認できる（該当なし）', value: `${prefix}_adj_mikakutei_none`, points: 0 },
      ],
    },
    {
      id: `${prefix}_adj_kyogi`,
      category,
      label: `${parentLabel}に過去の虚偽申請・偽造書類の提出等がありますか？（②個人調整指数2）`,
      inputType: 'radio',
      options: [
        { label: '過去に虚偽の申請、偽造又は変造された証明書の提出等があった（-5点）', value: `${prefix}_adj_kyogi_yes`, points: -5 },
        { label: '該当なし', value: `${prefix}_adj_kyogi_none`, points: 0 },
      ],
    },
  ];

  if (parentNum === 2) {
    questions.push({
      id: `${prefix}_adj_shussan_mae`,
      category,
      label: '出産で、入園希望日が出産予定日より前ですか？（②個人調整指数3）',
      helpText: '原典の父欄が「－」のため、母のみの項目です。',
      inputType: 'radio',
      options: [
        { label: '入園希望日が出産予定日より前（-1点）', value: `${prefix}_adj_shussan_mae_yes`, points: -1 },
        { label: '該当なし', value: `${prefix}_adj_shussan_mae_none`, points: 0 },
      ],
    });
  }

  return questions;
}

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_single_parent',
    category: 'adjustment',
    label: 'ひとり親世帯ですか？（⑤世帯調整指数2・3）',
    helpText: '離婚調停中の場合は対象外です。',
    inputType: 'select',
    options: [
      { label: 'ひとり親世帯（祖父母同居なし）又は両親不存在世帯（+3点）', value: 'adj_single_parent_alone', points: 3 },
      { label: 'ひとり親世帯（祖父母同居あり）（+1点）', value: 'adj_single_parent_with', points: 1 },
      { label: '該当なし', value: 'adj_single_parent_none', points: 0 },
    ],
  },
  {
    id: 'adj_ikukyu_taien',
    category: 'adjustment',
    label: '育児休業取得に伴い退園した保育園等を第一希望としますか？（⑤世帯調整指数6）',
    helpText: '育児・介護休業法など法律で規定された育児休業が対象です。',
    inputType: 'radio',
    options: [
      { label: '育児休業取得に伴い退園した保育園等を第一希望とする（+3点）', value: 'adj_ikukyu_taien_yes', points: 3 },
      { label: '該当なし', value: 'adj_ikukyu_taien_none', points: 0 },
    ],
  },
  {
    id: 'adj_seikatsuhogo',
    category: 'adjustment',
    label: '生活保護世帯ですか？（⑤世帯調整指数1）',
    inputType: 'radio',
    options: [
      { label: '生活保護世帯（+2点）', value: 'adj_seikatsuhogo_yes', points: 2 },
      { label: '該当なし', value: 'adj_seikatsuhogo_none', points: 0 },
    ],
  },
  {
    id: 'adj_kyodai_zaien',
    category: 'adjustment',
    label: 'きょうだいが在園している園を第一希望としますか？（⑤世帯調整指数4）',
    helpText: '多胎児を含みます。',
    inputType: 'radio',
    options: [
      { label: '兄弟姉妹が在園している園を第一希望とする（+1点）', value: 'adj_kyodai_zaien_yes', points: 1 },
      { label: '該当なし', value: 'adj_kyodai_zaien_none', points: 0 },
    ],
  },
  {
    id: 'adj_tataiji',
    category: 'adjustment',
    label: '多胎児の同時申込ですか？（⑤世帯調整指数5）',
    inputType: 'radio',
    options: [
      { label: '多胎児同時申込（+1点）', value: 'adj_tataiji_yes', points: 1 },
      { label: '該当なし', value: 'adj_tataiji_none', points: 0 },
    ],
  },
  {
    id: 'adj_zaitaku_shogaiji',
    category: 'adjustment',
    label: '在宅障害児がいますか？（⑤世帯調整指数7）',
    inputType: 'radio',
    options: [
      { label: '在宅障害児がいる（+1点）', value: 'adj_zaitaku_shogaiji_yes', points: 1 },
      { label: '該当なし', value: 'adj_zaitaku_shogaiji_none', points: 0 },
    ],
  },
  {
    id: 'adj_sofubo',
    category: 'adjustment',
    label: '同一生計の祖父母（65歳未満）が3歳以上児の入園基準を満たしていますか？（⑤世帯調整指数8）',
    inputType: 'radio',
    options: [
      { label: '同一生計の祖父母（65歳未満）が3歳以上児の入園基準を満たしていない（-1点）', value: 'adj_sofubo_yes', points: -1 },
      { label: '該当なし', value: 'adj_sofubo_none', points: 0 },
    ],
  },
  {
    id: 'adj_tainou',
    category: 'adjustment',
    label: '利用者負担額の滞納がありますか？（⑤世帯調整指数9）',
    inputType: 'radio',
    options: [
      { label: '利用者負担額を正当な理由なく滞納しており、市の指導に従わない（-10点）', value: 'adj_tainou_yes', points: -10 },
      { label: '該当なし', value: 'adj_tainou_none', points: 0 },
    ],
  },
];

export const nishioData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
