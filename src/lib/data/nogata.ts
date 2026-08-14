import type { MunicipalityData, Question } from '../types';

// 出典: 直方市「令和8年度認可保育所入園申込のご案内」P9-10「～ 保育所入所の判断基準表 ～」
// https://www.city.nogata.fukuoka.jp/library/data/kenkofukushikosodate/pdf/kosodate/202603262.pdf
// 掲載ページ: https://www.city.nogata.fukuoka.jp/kenko/_2051/_2055/_2057.html
// 計算方式: sum方式
//   原典の備考に「※ 父母それぞれの基準点数を合算し、さらに該当する調整事項の一番高い点数を
//   加えたものを合計点数とする。」と明記されている。
// 最高基準点数: 40（父母各20）
// 注:
//  - 調整点数は原典の「該当する調整事項の一番高い点数を加えた」に従い、
//    複数該当しても1つしか加算されないため単一selectで実装している。
//  - 「※ ひとり親の場合は、基準点数に20点を加点とする。」は調整点数表とは別の
//    基準点数への加点。保護者2が未回答になるひとり親でも加点を表現できるよう、
//    調整カテゴリの独立設問（adj_single_parent）として +20 で実装している。
//    調整点数表にも「ひとり親世帯である 6」があり、こちらは上記の一番高い1つを選ぶ
//    selectの中に含めている（原典上は両方が加算される）。
//  - 除外した項目:
//    「子ども・子育て支援法施行規則第1条の5第8項各号に該当」および
//    「直方市要保護児童対策協議会において保育の必要が認められると判断された場合」は
//    原典の点数欄が「最優先」であり固定点数を持たないため（日置市・須恵町と同じ扱い）。
//  - 原典のその他の備考: 「入園と転園が競合した場合は、入園が優先となる。」
//    「市内住民を優先とする（1日現在での住所地で判断する。）」

const municipality = {
  id: 'nogata',
  name: '直方市',
  slug: 'nogata',
  prefecture: '福岡県',
  maxBasePoints: 40,
  scoringMethod: 'sum',
} as const;

function buildParentQuestion(parentNum: 1 | 2): Question {
  const prefix = `p${parentNum}`;
  const parentLabel = parentNum === 1 ? '父（保護者1）' : '母（保護者2）';

  return {
    id: `parent${parentNum}_base`,
    category: `parent${parentNum}_base` as const,
    label: `${parentLabel}の状況（基準点数）`,
    helpText:
      '最も当てはまるものを1つ選んでください。父母それぞれの基準点数を合算した点数が世帯の基準点数になります（最高40点）。',
    inputType: 'select',
    options: [
      // 就労している：居宅外就労
      { label: '居宅外就労：月150時間以上', value: `${prefix}_out_150`, points: 20 },
      { label: '居宅外就労：月120時間以上150時間未満', value: `${prefix}_out_120`, points: 19 },
      { label: '居宅外就労：月90時間以上120時間未満', value: `${prefix}_out_90`, points: 18 },
      { label: '居宅外就労：月48時間以上90時間未満', value: `${prefix}_out_48`, points: 17 },
      // 就労している：居宅内就労（自営業・農業）
      { label: '居宅内就労（自営業・農業）：月150時間以上', value: `${prefix}_in_150`, points: 20 },
      { label: '居宅内就労（自営業・農業）：月120時間以上150時間未満', value: `${prefix}_in_120`, points: 19 },
      { label: '居宅内就労（自営業・農業）：月90時間以上120時間未満', value: `${prefix}_in_90`, points: 18 },
      { label: '居宅内就労（自営業・農業）：月48時間以上90時間未満', value: `${prefix}_in_48`, points: 17 },
      // 就労している：内職
      { label: '内職：月150時間以上', value: `${prefix}_naishoku_150`, points: 18 },
      { label: '内職：月120時間以上150時間未満', value: `${prefix}_naishoku_120`, points: 17 },
      { label: '内職：月90時間以上120時間未満', value: `${prefix}_naishoku_90`, points: 16 },
      { label: '内職：月48時間以上90時間未満', value: `${prefix}_naishoku_48`, points: 15 },
      // 就労している：内定・育休（当該年度に復帰予定の場合。自営の方を含む）
      { label: '内定・育休（当該年度に復帰予定）：月150時間以上', value: `${prefix}_naitei_150`, points: 12 },
      { label: '内定・育休（当該年度に復帰予定）：月120時間以上150時間未満', value: `${prefix}_naitei_120`, points: 11 },
      { label: '内定・育休（当該年度に復帰予定）：月90時間以上120時間未満', value: `${prefix}_naitei_90`, points: 10 },
      { label: '内定・育休（当該年度に復帰予定）：月48時間以上90時間未満', value: `${prefix}_naitei_48`, points: 9 },
      // 妊娠・出産
      { label: '妊娠・出産（産前6週産後8週の間）', value: `${prefix}_shussan`, points: 20 },
      // 疾病・負傷・障がい
      { label: '疾病・負傷：入院加療または常時臥床', value: `${prefix}_nyuin`, points: 20 },
      { label: '疾病・負傷：通院（居宅内で安静を要する）', value: `${prefix}_tsuin`, points: 15 },
      {
        label: '障がい：身体障害者手帳1〜3級、療育手帳重度または中度、精神障害者保健福祉手帳1〜2級',
        value: `${prefix}_shogai_jyudo`,
        points: 20,
      },
      { label: '障がい：精神または身体に障害を有する場合（上記以外）', value: `${prefix}_shogai_other`, points: 15 },
      // 介護・看護
      { label: '同居の親族を常時介護・看護している', value: `${prefix}_kaigo`, points: 12 },
      // 災害復旧
      { label: '災害復旧', value: `${prefix}_saigai`, points: 20 },
      // 求職活動
      { label: '求職活動（起業の準備を含む）を継続的に行っている', value: `${prefix}_kyushoku`, points: 5 },
      // 就学
      { label: '就学している（就労にむけての就学に限る）', value: `${prefix}_shugaku`, points: 8 },
      { label: '該当なし（在宅）', value: `${prefix}_none`, points: 0 },
    ],
  };
}

export const nogataData: MunicipalityData = {
  municipality,
  questions: [
    buildParentQuestion(1),
    {
      id: 'adj_single_parent',
      category: 'adjustment',
      label: 'ひとり親家庭ですか？（基準点数への加点）',
      helpText:
        '原典の備考「ひとり親の場合は、基準点数に20点を加点とする。」による加点です。調整点数表の「ひとり親世帯である（6点）」とは別枠のため、次の調整点数の設問でも該当する場合は選択してください。',
      inputType: 'radio',
      options: [
        { label: 'はい（ひとり親家庭／基準点数に+20点）', value: 'adj_single_parent_yes', points: 20 },
        { label: 'いいえ', value: 'adj_single_parent_no', points: 0 },
      ],
    },
    buildParentQuestion(2),
    {
      id: 'adj_chosei',
      category: 'adjustment',
      label: '調整点数（優先入所事由）',
      helpText:
        '原典は「該当する調整事項の一番高い点数を加えたものを合計点数とする」と定めているため、複数当てはまる場合でも最も点数の高いものを1つだけ選んでください。',
      inputType: 'select',
      options: [
        { label: '該当なし', value: 'adj_chosei_none', points: 0 },
        {
          label:
            '世帯の生計を維持するために就労していた保護者が失業し、当該保護者又はその他の保護者が速やかに就労することが必要な世帯に属している（+10点）',
          value: 'adj_chosei_shitsugyo',
          points: 10,
        },
        {
          label:
            '保育士、幼稚園教諭及び保育教諭、看護師及び調理員（直方市内での勤務のみ）（+10点）',
          value: 'adj_chosei_hoikushi',
          points: 10,
        },
        {
          label: '利用申込みをしている児童が障がいを有している（集団保育が可能とされた障がい児である場合）（+8点）',
          value: 'adj_chosei_shogaiji',
          points: 8,
        },
        { label: 'ひとり親世帯である（+6点）', value: 'adj_chosei_single_parent', points: 6 },
        {
          label: '家庭的保育事業、小規模保育事業、事業所内保育事業による保育を受け、その保育が終了する（+5点）',
          value: 'adj_chosei_chiikigata',
          points: 5,
        },
        {
          label:
            '満3歳に達する日以降の最初の3月31日までの間にある子どものみを保育する認可保育所で保育を受け、その保育が終了する（+5点）',
          value: 'adj_chosei_misatsuji',
          points: 5,
        },
        {
          label: '保育を受けようとする保育所等が、兄弟姉妹が保育を受けている又は受けようとする保育所等と同一である（+5点）',
          value: 'adj_chosei_kyodai',
          points: 5,
        },
        {
          label: '生活保護法の規定による生活扶助を受けている世帯のうち、保護者の就労により自立が見込まれる世帯に属している（+5点）',
          value: 'adj_chosei_seikatsuhogo',
          points: 5,
        },
      ],
    },
  ],
};
