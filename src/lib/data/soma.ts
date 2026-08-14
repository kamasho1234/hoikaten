import type { MunicipalityData, Question } from '../types';

// 出典: 相馬市「相馬市保育の実施に関する事務取扱規則」別表第1「入所選考基準」・別表第2「調整点数」
// https://www1.g-reiki.net/city.soma/reiki_honbun/c510RG00000509.html
// 参考（申込案内）: 相馬市「令和8年度 相馬市保育施設 入所申し込みのご案内」
// https://www.city.soma.fukushima.jp/shinseishodownload/kosodate_kyouiku/7093.html
// 計算方式: sum方式
//   別表第1の注2に「別表第一において該当する項目の基準点数を保護者それぞれの点数とし、
//   その点数を合算して基準点数の合計を算出する。」と明記されている。
// 最高基準点数: 30（父母各15＝保育士等の最高点）
// 注:
//  - 注4「保護者の状況が複数の事由に該当する場合は、該当する基準点数のうち最も高い点数を
//    その保護者の点数とする」に従い、保護者の基準点数は単一selectで実装。
//  - 注3「保護者が一人であるときは、その保護者の点数に『11不存在調整』の該当する項目の
//    点数を合算して基準点数の合計を算出する」に従い、11不存在調整を adj_single_parent
//    （ひとり親等で保護者2の点数が付かないケース）として実装している。
//  - 別表第2の調整点数は、原典上は基準点数の合計が同一の場合の優先順位決定に用いられるが、
//    その注1が「基準点数と別表第二による調整点数の合計が高い順に利用の優先順位を決定する」
//    と定めているため、本シミュレーターでは基準点数に加減算して総合点として表示している。
//  - 別表第2の注2「複数の世帯の状況に該当する場合は、該当する全ての調整点数を合計し」に
//    従い、調整点数は項目ごとに独立した設問（重複加算あり）として実装している。
//  - 除外した項目（点数が範囲値または個別判断のもの）:
//    別表第1「7 就学：学校又は専修学校等に通学している場合は就労(被用者)に準ずる 5〜10」
//    （範囲値。同項目の「職業訓練等を受けている場合 6」は固定点数のため採用）、
//    「9 育休中継続利用 5〜10」「10 その他 5〜15」、
//    別表第2「優先的に入所の必要がある世帯(選考会議で認められたもの) 2」（選考会議の個別判断）。
//  - 同点時の順位は、別表第2の注3により
//    ①複数の事由に該当する者 ②相馬市民である者(転入予定者を含む) ③市の一時預かり保育に
//    児童を預け就労している者 ④保育可能な祖父母等親族がいない者 ⑤入所保留期間の長い者 の順。

const municipality = {
  id: 'soma',
  name: '相馬市',
  slug: 'soma',
  prefecture: '福島県',
  maxBasePoints: 30,
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
      '複数の事由に当てはまる場合は、最も点数の高いものを1つ選んでください（原典の注4）。父母それぞれの点数を合算した点数が世帯の基準点数になります。',
    inputType: 'select',
    options: [
      // 1 就労：被用者 月20日以上（週5日以上稼働）
      { label: '被用者：月20日以上／1日7時間以上（月140時間以上）', value: `${prefix}_emp20_7`, points: 10 },
      { label: '被用者：月20日以上／1日6時間以上（月120時間以上）', value: `${prefix}_emp20_6`, points: 9 },
      { label: '被用者：月20日以上／1日5時間以上（月100時間以上）', value: `${prefix}_emp20_5`, points: 8 },
      { label: '被用者：月20日以上／1日4時間以上（月80時間以上）', value: `${prefix}_emp20_4`, points: 7 },
      { label: '被用者：月20日以上／1日3時間以上（月64時間以上）', value: `${prefix}_emp20_3`, points: 6 },
      // 1 就労：被用者 月16日以上（週4日以上稼働）
      { label: '被用者：月16日以上／1日7時間以上（月112時間以上）', value: `${prefix}_emp16_7`, points: 8 },
      { label: '被用者：月16日以上／1日5時間以上（月80時間以上）', value: `${prefix}_emp16_5`, points: 7 },
      { label: '被用者：月16日以上／1日4時間以上（月64時間以上）', value: `${prefix}_emp16_4`, points: 6 },
      // 1 就労：被用者 月12日以上（週3日以上稼働）
      { label: '被用者：月12日以上／1日7時間以上（月84時間以上）', value: `${prefix}_emp12_7`, points: 7 },
      { label: '被用者：月12日以上／1日5時間以上（月64時間以上）', value: `${prefix}_emp12_5`, points: 6 },
      // 1 就労：被用者（保育士等）
      {
        label: '保育士等（市内の認可保育施設で保育士・保健師・看護師として就労）：月20日以上／1日7時間以上（月140時間以上）',
        value: `${prefix}_hoiku_7`,
        points: 15,
      },
      {
        label: '保育士等（市内の認可保育施設で保育士・保健師・看護師として就労）：月20日以上／1日4時間以上（月80時間以上）',
        value: `${prefix}_hoiku_4`,
        points: 12,
      },
      // 1 就労：自営業、農業、漁業等（中心者）
      { label: '自営業・農業・漁業等（中心者）：1日7時間以上（月140時間以上）', value: `${prefix}_self_7`, points: 10 },
      { label: '自営業・農業・漁業等（中心者）：1日6時間以上（月120時間以上）', value: `${prefix}_self_6`, points: 9 },
      { label: '自営業・農業・漁業等（中心者）：1日5時間以上（月100時間以上）', value: `${prefix}_self_5`, points: 8 },
      { label: '自営業・農業・漁業等（中心者）：1日4時間以上（月80時間以上）', value: `${prefix}_self_4`, points: 7 },
      // 1 就労：自営業等（中心者以外の者）
      { label: '自営業・農業・漁業等（中心者以外）：1日7時間以上（月140時間以上）', value: `${prefix}_sub_7`, points: 8 },
      { label: '自営業・農業・漁業等（中心者以外）：1日6時間以上（月120時間以上）', value: `${prefix}_sub_6`, points: 7 },
      { label: '自営業・農業・漁業等（中心者以外）：1日5時間以上（月100時間以上）', value: `${prefix}_sub_5`, points: 6 },
      { label: '自営業・農業・漁業等（中心者以外）：1日4時間以上（月80時間以上）', value: `${prefix}_sub_4`, points: 5 },
      // 1 就労：内職
      { label: '内職：1日7時間以上の就労を常態', value: `${prefix}_naishoku_7`, points: 7 },
      { label: '内職：1日4時間以上の就労を常態（月64時間以上）', value: `${prefix}_naishoku_4`, points: 4 },
      // 2 妊娠・出産
      {
        label: '妊娠・出産（出産予定日前8週（多胎の場合は前14週）と出産後8週）',
        value: `${prefix}_shussan`,
        points: 9,
      },
      // 3 保護者の疾病等
      { label: '疾病・負傷：おおむね1ヶ月以上の入院', value: `${prefix}_nyuin`, points: 10 },
      { label: '疾病・負傷：1ヶ月以上常時臥床状態', value: `${prefix}_garisho`, points: 10 },
      {
        label: '疾病・負傷：精神性疾患又は感染性疾患等により長期安静加療が必要',
        value: `${prefix}_seishin`,
        points: 8,
      },
      { label: '疾病・負傷：おおむね1ヶ月以上の安静加療が必要', value: `${prefix}_ippan`, points: 6 },
      {
        label: '心身障害（重度）：身体障害者手帳1級・2級、療育手帳A、精神障害者保健福祉手帳1級・2級またはこれと同程度',
        value: `${prefix}_shogai_jyudo`,
        points: 10,
      },
      {
        label: '心身障害（中度）：身体障害者手帳3級、療育手帳B、精神障害者保健福祉手帳3級またはこれと同程度',
        value: `${prefix}_shogai_chudo`,
        points: 7,
      },
      {
        label: '心身障害（軽度）：身体障害者手帳4級以下またはこれと同程度',
        value: `${prefix}_shogai_keido`,
        points: 5,
      },
      // 4 介護・看護
      {
        label: '常時介護・看護：入院など就床安静を要する、または日常生活全般で介助を要する同居親族等の介護・看護',
        value: `${prefix}_kaigo_joji`,
        points: 8,
      },
      {
        label: '一部介護・看護：頻繁な通院等の付き添い、または日常生活で頻繁に介助を要する同居親族の介護・看護',
        value: `${prefix}_kaigo_ichibu`,
        points: 6,
      },
      {
        label: '心身障害児者介護：心身障害児の介護、通園、通院、通学に従事',
        value: `${prefix}_kaigo_shogai`,
        points: 6,
      },
      // 5 災害復旧
      { label: '災害復旧：震災、風水害、火災その他の災害の復旧に当たっている', value: `${prefix}_saigai`, points: 10 },
      // 6 求職活動
      { label: '求職活動：就職先内定（就労証明書未提出）', value: `${prefix}_kyushoku_naitei`, points: 5 },
      { label: '求職活動：就職先未定', value: `${prefix}_kyushoku_mitei`, points: 3 },
      // 7 就学（職業訓練等のみ固定点数）
      { label: '職業訓練等を受けている', value: `${prefix}_kunren`, points: 6 },
      // 8 虐待・DV
      {
        label: '虐待やDVのおそれがあることに該当するなど、社会的養護が必要',
        value: `${prefix}_dv`,
        points: 15,
      },
      { label: '該当なし（在宅）', value: `${prefix}_none`, points: 0 },
    ],
  };
}

export const somaData: MunicipalityData = {
  municipality,
  questions: [
    buildParentQuestion(1),
    {
      id: 'adj_single_parent',
      category: 'adjustment',
      label: 'ひとり親家庭など、保護者が一人ですか？（別表第1「11 不存在調整」）',
      helpText:
        '原典の注3「保護者が一人であるときは、その保護者の点数に『11不存在調整』の該当する項目の点数を合算して基準点数の合計を算出する」による加点です。',
      inputType: 'radio',
      options: [
        {
          label: '死別、離別、未婚等によるひとり親家庭または両親のいない家庭（+15点）',
          value: 'adj_single_parent_hitorioya',
          points: 15,
        },
        {
          label: '離婚前提による別居、市外に単身赴任等により保護者の一方が不在（+10点）',
          value: 'adj_single_parent_fuzai',
          points: 10,
        },
        { label: 'いいえ（保護者は2人います）', value: 'adj_single_parent_no', points: 0 },
      ],
    },
    buildParentQuestion(2),
    {
      id: 'adj_seikatsuhogo',
      category: 'adjustment',
      label: '生活保護法による被保護世帯ですか？',
      inputType: 'radio',
      options: [
        { label: 'はい（+5点）', value: 'adj_seikatsuhogo_yes', points: 5 },
        { label: '該当なし', value: 'adj_seikatsuhogo_none', points: 0 },
      ],
    },
    {
      id: 'adj_shitsugyo',
      category: 'adjustment',
      label: '主たる生計維持者の失業により就労の必要性が高い世帯ですか？',
      inputType: 'radio',
      options: [
        { label: 'はい（+4点）', value: 'adj_shitsugyo_yes', points: 4 },
        { label: '該当なし', value: 'adj_shitsugyo_none', points: 0 },
      ],
    },
    {
      id: 'adj_shogaiji',
      category: 'adjustment',
      label:
        '特別児童扶養手当の支給対象障害児、または障害者手帳・療育手帳の交付を受けている等で障害児保育の必要がある世帯ですか？',
      inputType: 'radio',
      options: [
        { label: 'はい（+4点）', value: 'adj_shogaiji_yes', points: 4 },
        { label: '該当なし', value: 'adj_shogaiji_none', points: 0 },
      ],
    },
    {
      id: 'adj_ikukyu_saihairyo',
      category: 'adjustment',
      label: '育児休業取得により一時退所した児童が、育児休業満了に伴い同じ保育所等に再入所を希望しますか？',
      inputType: 'radio',
      options: [
        { label: 'はい（+4点）', value: 'adj_ikukyu_saihairyo_yes', points: 4 },
        { label: '該当なし', value: 'adj_ikukyu_saihairyo_none', points: 0 },
      ],
    },
    {
      id: 'adj_fukushoku',
      category: 'adjustment',
      label: '産後休業又は育児休業後に職場復帰する世帯ですか？',
      inputType: 'radio',
      options: [
        { label: 'はい（+3点）', value: 'adj_fukushoku_yes', points: 3 },
        { label: '該当なし', value: 'adj_fukushoku_none', points: 0 },
      ],
    },
    {
      id: 'adj_tashi',
      category: 'adjustment',
      label: '18歳到達後最初の3月31日までの間にある児童を3人以上養育している世帯ですか？',
      inputType: 'radio',
      options: [
        { label: 'はい（+3点）', value: 'adj_tashi_yes', points: 3 },
        { label: '該当なし', value: 'adj_tashi_none', points: 0 },
      ],
    },
    {
      id: 'adj_takujisho',
      category: 'adjustment',
      label: '保護者の勤務先に入所可能な託児所等がない世帯ですか？',
      inputType: 'radio',
      options: [
        { label: 'はい（+3点）', value: 'adj_takujisho_yes', points: 3 },
        { label: '該当なし', value: 'adj_takujisho_none', points: 0 },
      ],
    },
    {
      id: 'adj_kyodai_zaien',
      category: 'adjustment',
      label: '現に兄弟姉妹が入所している保育所等を希望しますか？',
      inputType: 'radio',
      options: [
        { label: 'はい（+2点）', value: 'adj_kyodai_zaien_yes', points: 2 },
        { label: '該当なし', value: 'adj_kyodai_zaien_none', points: 0 },
      ],
    },
    {
      id: 'adj_chiikigata',
      category: 'adjustment',
      label: '地域型保育事業（小規模保育事業等）の卒園児童の転園を希望する世帯ですか？',
      inputType: 'radio',
      options: [
        { label: 'はい（+2点）', value: 'adj_chiikigata_yes', points: 2 },
        { label: '該当なし', value: 'adj_chiikigata_none', points: 0 },
      ],
    },
    {
      id: 'adj_kyodai_doji',
      category: 'adjustment',
      label: '兄弟姉妹（多胎児を含む）の同時入所を希望しますか？',
      inputType: 'radio',
      options: [
        { label: 'はい（+1点）', value: 'adj_kyodai_doji_yes', points: 1 },
        { label: '該当なし', value: 'adj_kyodai_doji_none', points: 0 },
      ],
    },
    {
      id: 'adj_tainou',
      category: 'adjustment',
      label: '選考会議時において保育料の滞納がありますか？（誓約履行滞納者を含む）',
      inputType: 'select',
      options: [
        { label: '滞納なし', value: 'adj_tainou_none', points: 0 },
        { label: '3か月分以上6か月分未満（-2点）', value: 'adj_tainou_3', points: -2 },
        { label: '6か月分以上12か月分未満（-4点）', value: 'adj_tainou_6', points: -4 },
        { label: '12か月分以上（-5点）', value: 'adj_tainou_12', points: -5 },
      ],
    },
  ],
};
