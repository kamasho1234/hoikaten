import type { MunicipalityData, Question } from '../types';

// 出典: https://www.city.kizugawa.lg.jp/kosodate/cmsfiles/contents/0000001/1155/20250827-161122.pdf
//       （木津川市「令和8年度木津川市保育施設利用調整基準点表」）
// 木津川市（京都府）保育施設利用調整基準点表（基本点数＋調整点数）
// 計算方式: sum方式（基本点数表は父・母それぞれの列に点数を記入し、表の最下部に単一の
//           「基本点数合計」欄がある。加点「通勤時間1時間以上＋2」も父母それぞれに設定）。
// 最高基準点: 48（父母各24＝療養の入院、障害の身体1・2級等、災害復旧、不存在等、虐待・DV）
// 注:
//  - 基本点数は原典の注記どおり①〜⑬のいずれかの「主たる事由」で計算するため単一選択。
//  - 「妊娠・出産」は原典で父欄が斜線のため母（保護者2）のみに設定。
//  - 加点「通勤時間1時間以上」および減点「就労実績のないもの（内定）」は①外勤・②自営業に
//    付随する父母別の加減点のため、保護者ごとの設問として実装。
//  - 原典の注記「※2と3、6と9-5を重複し加点する運用はしない」に従い、調整点数の2（生活保護
//    受給世帯）と3（生計中心者の失業）を1つの設問に、6（産後休業・育児休業からの復帰）と
//    9-5（預かり保育等の利用実績）を1つの設問にまとめて排他選択としている。
//  - 調整点数表に9-9の項目は存在しない（原典で欠番）。

const municipality = {
  id: 'kizugawa',
  name: '木津川市',
  slug: 'kizugawa',
  prefecture: '京都府',
  maxBasePoints: 48,
  scoringMethod: 'sum',
} as const;

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `p${parentNum}`;
  const parentLabel = parentNum === 1 ? '父（保護者1）' : '母（保護者2）';
  const category = `parent${parentNum}_base` as const;

  const options = [
    // ①外勤
    { label: '外勤：月160時間以上', value: `${prefix}_gaikin_160`, points: 22 },
    { label: '外勤：月140時間以上', value: `${prefix}_gaikin_140`, points: 21 },
    { label: '外勤：月120時間以上', value: `${prefix}_gaikin_120`, points: 20 },
    { label: '外勤：月80時間以上', value: `${prefix}_gaikin_80`, points: 18 },
    { label: '外勤：月64時間以上', value: `${prefix}_gaikin_64`, points: 16 },
    // ②自営業
    { label: '自営業：月160時間以上', value: `${prefix}_jiei_160`, points: 22 },
    { label: '自営業：月140時間以上', value: `${prefix}_jiei_140`, points: 21 },
    { label: '自営業：月120時間以上', value: `${prefix}_jiei_120`, points: 20 },
    { label: '自営業：月80時間以上', value: `${prefix}_jiei_80`, points: 18 },
    { label: '自営業：月64時間以上', value: `${prefix}_jiei_64`, points: 16 },
    // ③内職
    { label: '内職', value: `${prefix}_naishoku`, points: 8 },
    // ④看護・介護
    { label: '看護・介護：同居の常時寝たきりの介護・看護', value: `${prefix}_care_bed`, points: 22 },
    { label: '看護・介護：同居の上記以外の介護・看護', value: `${prefix}_care_other`, points: 10 },
    // ⑥農業
    { label: '農業：月160時間以上', value: `${prefix}_nogyo_160`, points: 22 },
    { label: '農業：月140時間以上', value: `${prefix}_nogyo_140`, points: 21 },
    { label: '農業：月120時間以上', value: `${prefix}_nogyo_120`, points: 20 },
    { label: '農業：月80時間以上', value: `${prefix}_nogyo_80`, points: 18 },
    { label: '農業：月64時間以上', value: `${prefix}_nogyo_64`, points: 16 },
    // ⑦療養
    { label: '療養：入院', value: `${prefix}_ryoyo_hosp`, points: 24 },
    { label: '療養：通院し、常時病臥している', value: `${prefix}_ryoyo_bed`, points: 20 },
    { label: '療養：通院し、長期加療が必要で保育が不可能である', value: `${prefix}_ryoyo_visit`, points: 15 },
    // ⑧障害
    { label: '障害：身体障害者手帳1・2級、療育手帳、精神障害者保健福祉手帳1級', value: `${prefix}_dis_1`, points: 24 },
    { label: '障害：その他の身体障害者手帳、精神障害者保健福祉手帳', value: `${prefix}_dis_2`, points: 18 },
    // ⑨求職中・起業準備
    { label: '求職中又は起業準備', value: `${prefix}_seek`, points: 2 },
    // ⑩災害復旧
    { label: '災害復旧', value: `${prefix}_disaster`, points: 24 },
    // ⑪就学
    { label: '就学：就学・職業訓練により保育できない', value: `${prefix}_school`, points: 18 },
    // ⑫不存在等
    { label: '不存在等：死亡・離別・行方不明・拘禁・単身赴任', value: `${prefix}_absent`, points: 24 },
    // ⑬その他
    { label: 'その他：虐待・DV', value: `${prefix}_dv`, points: 24 },
    { label: 'その他：別居の家族の介護・看護', value: `${prefix}_care_bekkyo`, points: 8 },
    // 該当なし
    { label: '該当なし（在宅）', value: `${prefix}_none`, points: 0 },
  ];

  // ⑤妊娠・出産は母（保護者2）のみ（原典で父欄は斜線）
  if (parentNum === 2) {
    options.splice(13, 0,
      { label: '妊娠・出産', value: `${prefix}_birth`, points: 20 },
    );
  }

  return [
    {
      id: `${prefix}_situation`,
      category,
      label: `${parentLabel}の保育を必要とする主たる事由（基本点数）`,
      helpText: '最も当てはまる状況を1つ選んでください（基本点数は①〜⑬のいずれかの主たる事由での計算となります）。',
      inputType: 'select',
      options,
    },
    {
      id: `${prefix}_tsukin`,
      category,
      label: `${parentLabel}の通勤時間は1時間以上ですか？（基本点数の加点）`,
      helpText: '外勤・自営業の場合の加点です',
      inputType: 'radio',
      options: [
        { label: '通勤時間1時間以上（+2点）', value: `${prefix}_tsukin_yes`, points: 2 },
        { label: '該当なし', value: `${prefix}_tsukin_none`, points: 0 },
      ],
    },
    {
      id: `${prefix}_naitei`,
      category,
      label: `${parentLabel}は就労実績のない内定の段階ですか？（基本点数の減点）`,
      helpText: '外勤・自営業で就労実績のないもの（内定）の場合の減点です',
      inputType: 'radio',
      options: [
        { label: '就労実績のないもの（内定）（-2点）', value: `${prefix}_naitei_yes`, points: -2 },
        { label: '該当なし', value: `${prefix}_naitei_none`, points: 0 },
      ],
    },
  ];
}

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_hitorioya',
    category: 'adjustment',
    label: 'ひとり親家庭ですか？（調整点数）',
    inputType: 'radio',
    options: [
      { label: 'ひとり親家庭（+18点）', value: 'adj_hitorioya_yes', points: 18 },
      { label: '該当なし', value: 'adj_hitorioya_none', points: 0 },
    ],
  },
  {
    id: 'adj_hogo_shitsugyo',
    category: 'adjustment',
    label: '生活保護受給世帯または生計中心者の失業に該当しますか？（調整点数）',
    helpText: '原典の注記により、この2つは重複して加点されません。当てはまるものを1つ選んでください',
    inputType: 'select',
    options: [
      { label: '生活保護受給世帯（+6点）', value: 'adj_hogo_shitsugyo_hogo', points: 6 },
      { label: '生計中心者の失業により就労の必要性が高い（+6点）', value: 'adj_hogo_shitsugyo_shitsugyo', points: 6 },
      { label: '該当なし', value: 'adj_hogo_shitsugyo_none', points: 0 },
    ],
  },
  {
    id: 'adj_gyakutai',
    category: 'adjustment',
    label: '虐待やDVのおそれがありますか？（調整点数）',
    inputType: 'radio',
    options: [
      { label: '虐待やDVのおそれがある（+20点）', value: 'adj_gyakutai_yes', points: 20 },
      { label: '該当なし', value: 'adj_gyakutai_none', points: 0 },
    ],
  },
  {
    id: 'adj_shogaiji',
    category: 'adjustment',
    label: '申請する子どもに障害がありますか？（調整点数）',
    inputType: 'radio',
    options: [
      { label: '申請する子どもに障害がある（+4点）', value: 'adj_shogaiji_yes', points: 4 },
      { label: '該当なし', value: 'adj_shogaiji_none', points: 0 },
    ],
  },
  {
    id: 'adj_fukki_azukari',
    category: 'adjustment',
    label: '育児休業からの復帰、または預かり保育等の利用実績がありますか？（調整点数）',
    helpText: '原典の注記により、この2つは重複して加点されません。当てはまるものを1つ選んでください',
    inputType: 'select',
    options: [
      { label: '休業前と同一の職場に産後休業・育児休業から復帰する（+8点）', value: 'adj_fukki_azukari_fukki', points: 8 },
      { label: '預かり保育事業、一時預かり事業、認可外保育施設等の過去3か月平均月10日以上の利用実績がある（+4点）', value: 'adj_fukki_azukari_azukari', points: 4 },
      { label: '該当なし', value: 'adj_fukki_azukari_none', points: 0 },
    ],
  },
  {
    id: 'adj_kyodai_doitsu',
    category: 'adjustment',
    label: '兄弟姉妹が同一事業を利用していますか？（調整点数）',
    inputType: 'radio',
    options: [
      { label: '兄弟姉妹が同一事業利用（+11点）', value: 'adj_kyodai_doitsu_yes', points: 11 },
      { label: '該当なし', value: 'adj_kyodai_doitsu_none', points: 0 },
    ],
  },
  {
    id: 'adj_chiikigata',
    category: 'adjustment',
    label: '地域型保育事業の卒園児童ですか？（調整点数）',
    helpText: '小規模保育事業・家庭的保育事業等の卒園児童',
    inputType: 'select',
    options: [
      { label: '地域型保育事業の卒園児童で連携施設を希望している（+14点）', value: 'adj_chiikigata_renkei', points: 14 },
      { label: '地域型保育事業の卒園児童で連携施設以外の施設を希望している（+12点）', value: 'adj_chiikigata_other', points: 12 },
      { label: '該当なし', value: 'adj_chiikigata_none', points: 0 },
    ],
  },
  {
    id: 'adj_iryo_care',
    category: 'adjustment',
    label: '医療的ケアが必要ですか？（調整点数）',
    inputType: 'radio',
    options: [
      { label: '医療的ケアが必要である（+4点）', value: 'adj_iryo_care_yes', points: 4 },
      { label: '該当なし', value: 'adj_iryo_care_none', points: 0 },
    ],
  },
  {
    id: 'adj_bunen',
    category: 'adjustment',
    label: '木津保育園分園・清水保育園の卒園児童ですか？（調整点数）',
    inputType: 'radio',
    options: [
      { label: '木津保育園分園・清水保育園の卒園児童（+12点）', value: 'adj_bunen_yes', points: 12 },
      { label: '該当なし', value: 'adj_bunen_none', points: 0 },
    ],
  },
  {
    id: 'adj_hogosha_shogai',
    category: 'adjustment',
    label: '認定事由が障害以外の保護者に手帳の交付がありますか？（調整点数）',
    helpText: '身体障害者手帳1・2級、療育手帳、精神障害者保健福祉手帳1級のいずれかが交付されている場合',
    inputType: 'radio',
    options: [
      { label: '認定事由が障害以外の保護者で手帳の交付がある（+4点）', value: 'adj_hogosha_shogai_yes', points: 4 },
      { label: '該当なし', value: 'adj_hogosha_shogai_none', points: 0 },
    ],
  },
  {
    id: 'adj_hoikushi',
    category: 'adjustment',
    label: '市内保育園等に保育士として勤務していますか？（調整点数）',
    inputType: 'radio',
    options: [
      { label: '市内保育園等に保育士として勤務している（+5点）', value: 'adj_hoikushi_yes', points: 5 },
      { label: '該当なし', value: 'adj_hoikushi_none', points: 0 },
    ],
  },
  {
    id: 'adj_hellowork',
    category: 'adjustment',
    label: '求職中でハローワークの登録証が未提出ですか？（調整点数）',
    inputType: 'radio',
    options: [
      { label: '求職中でハローワークの登録証が未提出（-4点）', value: 'adj_hellowork_yes', points: -4 },
      { label: '該当なし', value: 'adj_hellowork_none', points: 0 },
    ],
  },
  {
    id: 'adj_mishinsei_kyodai',
    category: 'adjustment',
    label: '申請をしていない未就学児の兄弟姉妹がいますか？（調整点数）',
    helpText: '幼稚園、認定こども園等利用の場合をのぞく',
    inputType: 'radio',
    options: [
      { label: '未就学児の兄弟姉妹の申請なし（-4点）', value: 'adj_mishinsei_kyodai_yes', points: -4 },
      { label: '該当なし', value: 'adj_mishinsei_kyodai_none', points: 0 },
    ],
  },
  {
    id: 'adj_jitai',
    category: 'adjustment',
    label: '保育施設利用内定を辞退したことがありますか？（調整点数）',
    helpText: '正当な理由なく辞退した場合（利用調整中の辞退を含む）',
    inputType: 'radio',
    options: [
      { label: '正当な理由なく保育施設利用内定を辞退したことがある（-8点）', value: 'adj_jitai_yes', points: -8 },
      { label: '該当なし', value: 'adj_jitai_none', points: 0 },
    ],
  },
  {
    id: 'adj_tainou',
    category: 'adjustment',
    label: '施設利用料・保育料等の滞納がありますか？（調整点数）',
    inputType: 'radio',
    options: [
      { label: '施設利用料、保育料等を滞納している（-15点）', value: 'adj_tainou_yes', points: -15 },
      { label: '該当なし', value: 'adj_tainou_none', points: 0 },
    ],
  },
  {
    id: 'adj_ikukyu_encho',
    category: 'adjustment',
    label: '育児休業の延長も許容できますか？（調整点数）',
    inputType: 'radio',
    options: [
      { label: '育児休業の延長も許容できる（-80点）', value: 'adj_ikukyu_encho_yes', points: -80 },
      { label: '該当なし', value: 'adj_ikukyu_encho_none', points: 0 },
    ],
  },
];

export const kizugawaData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
