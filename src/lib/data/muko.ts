import type { MunicipalityData, Question } from '../types';

// 出典: 向日市「向日市保育施設利用調整基準」（令和8年度保育所入所等申込みのしおり 10）
// https://www.city.muko.kyoto.jp/uploaded/attachment/19410.pdf
// 掲載ページ: https://www.city.muko.kyoto.jp/site/shinsei/14636.html
// 計算方式: sum方式
//   根拠1: 調整指数表の注記（※7）に「基本指数の合計が80点（居宅内就労等(主に個人事業主)の
//          場合については、基本指数及び項番3の合計）に満たない場合のみ適用する。」とあり、
//          基本指数の最高が父40・母40であることから「合計80点」＝父母合算の満点を指す。
//   根拠2: 調整指数表が「父」「母」「世帯」の3列で構成され、父母それぞれに加減算される項目
//          （項番1・2・3・23・27・28・32・33・34）が存在する。低い方を採る方式なら
//          保護者ごとの加減算は意味を持たない。
// 最高基本指数: 80（父母各40）
// 注:
//  - 基本指数表の注「複数の事由に該当する場合は、指数が高い方を採用します。」のため単一select。
//  - 「②妊娠・出産」は原典の父欄が「-」（母のみ30）のため保護者2（母）にのみ設定。
//  - 除外: 基本指数表 No.28「その他（児童福祉の観点から保育の必要性を市長が特に認める場合。
//    DV・虐待等を含む）」は※5「当該児童、世帯の状況に応じ、別途判断します」で固定点数なし。

const municipality = {
  id: 'muko',
  name: '向日市',
  slug: 'muko',
  prefecture: '京都府',
  maxBasePoints: 80,
  scoringMethod: 'sum',
} as const;

function buildParentQuestions(parentNum: 1 | 2): Question[] {
  const prefix = `p${parentNum}`;
  const parentLabel = parentNum === 1 ? '父（保護者1）' : '母（保護者2）';
  const category = `parent${parentNum}_base` as const;

  const baseOptions = [
    // ①就労 居宅外就労（主に法人が営む事業に従事する者）
    { label: '就労（居宅外・主に法人が営む事業に従事）：週40時間以上', value: `${prefix}_out_40`, points: 40 },
    { label: '就労（居宅外・主に法人が営む事業に従事）：週35時間以上40時間未満', value: `${prefix}_out_35`, points: 35 },
    { label: '就労（居宅外・主に法人が営む事業に従事）：週30時間以上35時間未満', value: `${prefix}_out_30`, points: 30 },
    { label: '就労（居宅外・主に法人が営む事業に従事）：週25時間以上30時間未満', value: `${prefix}_out_25`, points: 25 },
    { label: '就労（居宅外・主に法人が営む事業に従事）：週20時間以上25時間未満', value: `${prefix}_out_20`, points: 20 },
    { label: '就労（居宅外・主に法人が営む事業に従事）：月64時間以上（上記以外）', value: `${prefix}_out_64h`, points: 15 },
    // ①就労 居宅内就労等（上記区分以外で就労・主に個人事業主）
    { label: '就労（居宅内等・主に個人事業主）：週40時間以上', value: `${prefix}_in_40`, points: 36 },
    { label: '就労（居宅内等・主に個人事業主）：週35時間以上40時間未満', value: `${prefix}_in_35`, points: 31 },
    { label: '就労（居宅内等・主に個人事業主）：週30時間以上35時間未満', value: `${prefix}_in_30`, points: 26 },
    { label: '就労（居宅内等・主に個人事業主）：週25時間以上30時間未満', value: `${prefix}_in_25`, points: 21 },
    { label: '就労（居宅内等・主に個人事業主）：週20時間以上25時間未満', value: `${prefix}_in_20`, points: 16 },
    { label: '就労（居宅内等・主に個人事業主）：月64時間以上（上記以外）', value: `${prefix}_in_64h`, points: 11 },
    // ①就労 内職
    { label: '内職従事者である', value: `${prefix}_naishoku`, points: 10 },
    // ②妊娠・出産（母のみ。下でparent1から除外）
    { label: '妊娠・出産：出産予定日の前2ヶ月の属する月、出産日の後2ヶ月の属する月で保育を必要とする', value: `${prefix}_birth`, points: 30 },
    // ③疾病・障がい
    { label: '疾病：おおむね1か月以上の入院又は入院に相当する治療を要し、児童を保育できない（常時臥床）', value: `${prefix}_ill_hosp`, points: 40 },
    { label: '疾病：おおむね1か月以上の長期安静加療を要すると診断され、児童を保育できないと医師が判断', value: `${prefix}_ill_long`, points: 27 },
    { label: '疾病：おおむね1か月以内の加療を要すると診断され、児童を保育できないと医師が判断', value: `${prefix}_ill_short`, points: 15 },
    { label: '障がい：身体障害者手帳1〜2級、精神障害者保健福祉手帳1級、療育手帳Aの交付を受けている', value: `${prefix}_dis_1`, points: 40 },
    { label: '障がい：身体障害者手帳3級、精神障害者保健福祉手帳2級、療育手帳Bの交付を受けている', value: `${prefix}_dis_2`, points: 30 },
    { label: '障がい：身体障害者手帳4〜6級、精神障害者保健福祉手帳3級の交付を受けている', value: `${prefix}_dis_3`, points: 20 },
    // ④介護
    { label: '介護・看護：同居の常時臥床者、重度心身障がい者（児）の看護・介護や、入院の付添いをしている', value: `${prefix}_care_heavy`, points: 35 },
    { label: '介護・看護：同居の障がい者（児）の介護・通院・通所・通学の付添いをしている', value: `${prefix}_care_mid`, points: 25 },
    { label: '介護・看護：同居の家族の長期居宅療養等の介護にあたっている', value: `${prefix}_care_light`, points: 15 },
    // ⑤災害復旧
    { label: '災害復旧：震災・災害・風水害等により自宅の復旧にあたっている', value: `${prefix}_disaster`, points: 50 },
    // ⑥求職活動
    { label: '求職活動中（起業準備中を含む）である（原則3か月以内）', value: `${prefix}_seek`, points: 8 },
    // ⑦就学
    { label: '就学：学校教育法に定められた学校に就学している又は職業訓練を受けている', value: `${prefix}_school`, points: 28 },
    { label: '就学：上記に該当しない専修学校・各種学校等に月64時間以上就学している', value: `${prefix}_school_other`, points: 18 },
    // 該当なし
    { label: '該当なし（在宅）', value: `${prefix}_none`, points: 0 },
  ].filter((o) => parentNum === 2 || !o.value.endsWith('_birth'));

  return [
    {
      id: `${prefix}_situation`,
      category,
      label: `${parentLabel}の保育できない状況（基本指数）`,
      helpText:
        parentNum === 2
          ? '最も当てはまるものを1つ選んでください。複数の事由に該当する場合は指数が高い方が採用されます。就労時間には休憩時間を含み、変則勤務等の場合は月間就労時間÷4週で計算されます。'
          : '最も当てはまるものを1つ選んでください。複数の事由に該当する場合は指数が高い方が採用されます。就労時間には休憩時間を含み、変則勤務等の場合は月間就労時間÷4週で計算されます。妊娠・出産は原典の父欄が「-」（母のみ）のため保護者2の選択肢にのみ設けています。',
      inputType: 'select',
      options: baseOptions,
    },
    {
      id: `${prefix}_kojin_jigyonushi`,
      category,
      label: `${parentLabel}は個人事業主で開業届等の提出がありますか？（調整指数 項番3）`,
      helpText:
        '開業届（もしくは営業証明書）の写し及び確定申告書の写し等、事業の内容または実績を証明する書類の提出がある場合に加算されます。',
      inputType: 'radio',
      options: [
        { label: '個人事業主で開業届等の提出がある（+4点）', value: `${prefix}_kojin_yes`, points: 4 },
        { label: '該当なし', value: `${prefix}_kojin_none`, points: 0 },
      ],
    },
    {
      id: `${prefix}_shurou_jokyo`,
      category,
      label: `${parentLabel}の就労証明・内定の状況は？（調整指数 項番1・2）`,
      helpText:
        '項番2の「就労見込み・就労内定者」は、保育士等として保育施設で勤務予定の場合（項番4〜6）には適用されません。',
      inputType: 'select',
      options: [
        { label: '就労見込みの者・就労内定者（就労開始日が申請受付締切日の翌日以降）である（-5点）', value: `${prefix}_shurou_naitei`, points: -5 },
        { label: '就労の証明内容に対して、勤務実績及び収入実績に整合性がない（-3点）', value: `${prefix}_shurou_fuseigo`, points: -3 },
        { label: '該当なし', value: `${prefix}_shurou_none`, points: 0 },
      ],
    },
    {
      id: `${prefix}_shitsugyo`,
      category,
      label: `${parentLabel}は会社都合等で失業し求職中ですか？（調整指数 項番23）`,
      helpText:
        '要保育事由が「求職活動」の場合のみ調整されます。自己都合による退職は対象外です。',
      inputType: 'radio',
      options: [
        { label: '倒産・会社都合等、本人の意思に関わらず失業し、職業安定所を通じて求職している（+14点）', value: `${prefix}_shitsugyo_yes`, points: 14 },
        { label: '該当なし', value: `${prefix}_shitsugyo_none`, points: 0 },
      ],
    },
    {
      id: `${prefix}_shurou_jikan`,
      category,
      label: `${parentLabel}の就労時間による加算（調整指数 項番27・28）`,
      helpText:
        '要保育事由が「就労」の場合を除きます（就労以外の事由で申し込む保護者が、あわせて就労している場合の加算です）。',
      inputType: 'select',
      options: [
        { label: '週30時間以上、就労している（+2点）', value: `${prefix}_shurou_jikan_30ijo`, points: 2 },
        { label: '週30時間未満、就労している（+1点）', value: `${prefix}_shurou_jikan_30miman`, points: 1 },
        { label: '該当なし', value: `${prefix}_shurou_jikan_none`, points: 0 },
      ],
    },
    {
      id: `${prefix}_shinshin`,
      category,
      label: `${parentLabel}の心身の状況（調整指数 項番32・33）`,
      helpText:
        '要保育事由が「疾病・障がい」の場合を除きます。両方に該当する場合は高い指数で算定されます。',
      inputType: 'select',
      options: [
        { label: '要介護3〜5、障害支援区分4〜6、身体障害者手帳1・2級、療育手帳、精神障害者保健福祉手帳1・2級（+4点）', value: `${prefix}_shinshin_heavy`, points: 4 },
        { label: '要支援1・2、要介護1・2、障害支援区分1〜3、身体障害者手帳3級以下、精神障害者保健福祉手帳3級（+2点）', value: `${prefix}_shinshin_light`, points: 2 },
        { label: '該当なし', value: `${prefix}_shinshin_none`, points: 0 },
      ],
    },
    {
      id: `${prefix}_techo2`,
      category,
      label: `${parentLabel}は手帳を2つ以上交付されていますか？（調整指数 項番34）`,
      helpText: '要保育事由が「疾病・障がい」の場合を除きます。',
      inputType: 'radio',
      options: [
        { label: '身体障害者手帳、精神障害者保健福祉手帳及び療育手帳のうち2つ以上の交付を受けている（+2点）', value: `${prefix}_techo2_yes`, points: 2 },
        { label: '該当なし', value: `${prefix}_techo2_none`, points: 0 },
      ],
    },
  ];
}

const adjustmentQuestions: Question[] = [
  {
    id: 'adj_hoikushi',
    category: 'adjustment',
    label: '保育施設での勤務状況は？（調整指数 項番4〜6）',
    helpText:
      '保育士証・幼稚園教諭免許・看護師免許の写しが必要です。この加算が適用される場合、項番2「就労見込み・就労内定者」の減点は対象外となります。',
    inputType: 'select',
    options: [
      { label: '保育士・保育教諭・看護師として、向日市内の保育施設で勤務中（予定を含む）（+10点）', value: 'adj_hoikushi_shinai', points: 10 },
      { label: '市内の保育施設で保育士・保育教諭・看護師以外として勤務中（予定を含む）（+5点）', value: 'adj_hoikushi_shinai_other', points: 5 },
      { label: '保育士・保育教諭・看護師として、向日市外の保育施設で勤務中（予定を含む）（+3点）', value: 'adj_hoikushi_shigai', points: 3 },
      { label: '該当なし', value: 'adj_hoikushi_none', points: 0 },
    ],
  },
  {
    id: 'adj_fukushoku',
    category: 'adjustment',
    label: '育児休業又は産後休暇から同一の事業所に復職しますか？（調整指数 項番7）',
    inputType: 'radio',
    options: [
      { label: '育児休業法に基づく育児休業又は産後休暇から同一の事業所に復職する（+2点）', value: 'adj_fukushoku_yes', points: 2 },
      { label: '該当なし', value: 'adj_fukushoku_none', points: 0 },
    ],
  },
  {
    id: 'adj_daitai',
    category: 'adjustment',
    label: '認可外保育施設等を月極めで利用していますか？（調整指数 項番8）',
    helpText:
      '有料の認可外保育施設・職場託児所・幼稚園（認定こども園1号含む）を月極めで利用している場合、または転入前市町村で保育施設に入所していたが転出により退所し転入に伴い入所申請をした場合です。項番7（育休・産後休暇からの復職）に該当する場合は対象外です。',
    inputType: 'radio',
    options: [
      { label: '認可外保育施設等を月極めで利用している（+3点）', value: 'adj_daitai_yes', points: 3 },
      { label: '該当なし', value: 'adj_daitai_none', points: 0 },
    ],
  },
  {
    id: 'adj_tataiji',
    category: 'adjustment',
    label: '申込児童は多胎児ですか？（調整指数 項番9・10）',
    inputType: 'select',
    options: [
      { label: '多胎児（三つ子）である（+3点）', value: 'adj_tataiji_3', points: 3 },
      { label: '多胎児（双子）である（+1点）', value: 'adj_tataiji_2', points: 1 },
      { label: '該当なし', value: 'adj_tataiji_none', points: 0 },
    ],
  },
  {
    id: 'adj_kyodai',
    category: 'adjustment',
    label: 'きょうだいの申込・利用状況は？（調整指数 項番11・12）',
    helpText:
      '項番11は、申請時に兄弟姉妹が利用中であっても入所年度の4月1日時点で保育施設に在籍していない場合（卒園等）は対象外です。',
    inputType: 'select',
    options: [
      { label: '既に兄弟姉妹が利用中の保育施設と同じ施設を第1希望とする（+6点）', value: 'adj_kyodai_zaien', points: 6 },
      { label: '兄弟姉妹が同時に申込みをし、かつ、同じ保育施設を第1希望とする（+4点）', value: 'adj_kyodai_doji', points: 4 },
      { label: '該当なし', value: 'adj_kyodai_none', points: 0 },
    ],
  },
  {
    id: 'adj_horyu',
    category: 'adjustment',
    label: '前年度の年度当初選考で入所保留となっていますか？（調整指数 項番13）',
    inputType: 'radio',
    options: [
      { label: '前年度の年度当初選考で入所保留となっている（+1点）', value: 'adj_horyu_yes', points: 1 },
      { label: '該当なし', value: 'adj_horyu_none', points: 0 },
    ],
  },
  {
    id: 'adj_sotsuen',
    category: 'adjustment',
    label: '小規模保育事業所等の卒園時に市内認可施設への通園を希望しますか？（調整指数 項番14）',
    helpText: 'さくらキッズ保育園及び市内小規模保育事業所の卒園時のみが対象です。',
    inputType: 'radio',
    options: [
      { label: '卒園時に市内認可施設への通園を希望する（+12点）', value: 'adj_sotsuen_yes', points: 12 },
      { label: '該当なし', value: 'adj_sotsuen_none', points: 0 },
    ],
  },
  {
    id: 'adj_jido_jokyo',
    category: 'adjustment',
    label: '申込児童の心身の状況は？（調整指数 項番15〜18）',
    helpText:
      '項番16〜18は、基本指数の合計が80点（居宅内就労等の場合は基本指数及び項番3の合計）に満たない場合のみ適用されます。医療的ケアは同意書および専門機関等の意見書の提出があり、施設での医療的ケアにより保育が可能と判断された場合に適用されます。',
    inputType: 'select',
    options: [
      { label: '入所児童自身に医療的ケアを必要とする（+4点）', value: 'adj_jido_care', points: 4 },
      { label: '身体障害者手帳1・2級、療育手帳A相当、精神障害者保健福祉手帳1・2級のいずれか又は複数の交付がある（+3点）', value: 'adj_jido_techo1', points: 3 },
      { label: '各障害者手帳3級以下、療育手帳B相当の交付がある（+2点）', value: 'adj_jido_techo3', points: 2 },
      { label: '手帳の交付は受けていないが、障害福祉サービスの利用または療育施設へ通所している（+1点）', value: 'adj_jido_service', points: 1 },
      { label: '該当なし', value: 'adj_jido_none', points: 0 },
    ],
  },
  {
    id: 'adj_jitai',
    category: 'adjustment',
    label: '当該年度中に入所案内（内定）を辞退していますか？（調整指数 項番19）',
    inputType: 'radio',
    options: [
      { label: '当該年度中に入所案内（内定）を辞退している（-5点）', value: 'adj_jitai_yes', points: -5 },
      { label: '該当なし', value: 'adj_jitai_none', points: 0 },
    ],
  },
  {
    id: 'adj_tenen',
    category: 'adjustment',
    label: '年度途中での転園希望ですか？（調整指数 項番20）',
    helpText:
      '市内の保育所（園）、認定こども園又は小規模保育事業所からの転園希望が対象です。項番11（既に兄弟姉妹が利用中の施設を第1希望）に該当する場合は対象外です。',
    inputType: 'radio',
    options: [
      { label: '年度途中での市内保育施設からの転園希望である（-3点）', value: 'adj_tenen_yes', points: -3 },
      { label: '該当なし', value: 'adj_tenen_none', points: 0 },
    ],
  },
  {
    id: 'adj_hitorioya',
    category: 'adjustment',
    label: 'ひとり親世帯・生活保護受給世帯ですか？（調整指数 項番21・22）',
    helpText: '項番21と項番22は重複できません。',
    inputType: 'select',
    options: [
      { label: 'ひとり親（母子家庭・父子家庭）である（別居かつ離婚調停中の場合を含む）（+50点）', value: 'adj_hitorioya_yes', points: 50 },
      { label: '生活保護受給世帯で就労している、又は就労が見込まれる（就労証明書等の提出がある）（+20点）', value: 'adj_hitorioya_hogo', points: 20 },
      { label: '該当なし', value: 'adj_hitorioya_none', points: 0 },
    ],
  },
  {
    id: 'adj_tashi',
    category: 'adjustment',
    label: '子どもの人数は？（調整指数 項番24・25）',
    helpText: '項番24と項番25は重複できません。',
    inputType: 'select',
    options: [
      { label: '小学校入学前児童が3人以上いる（+2点）', value: 'adj_tashi_mishugaku3', points: 2 },
      { label: '小学生以下の子どもが3人以上いる（+1点）', value: 'adj_tashi_shogakusei3', points: 1 },
      { label: '該当なし', value: 'adj_tashi_none', points: 0 },
    ],
  },
  {
    id: 'adj_tanshin',
    category: 'adjustment',
    label: '保護者のいずれかが就労のために市外に別居していますか？（調整指数 項番26）',
    helpText: '単身赴任等の場合です。',
    inputType: 'radio',
    options: [
      { label: '保護者のいずれかが就労のために向日市外に別居している（単身赴任等）（+3点）', value: 'adj_tanshin_yes', points: 3 },
      { label: '該当なし', value: 'adj_tanshin_none', points: 0 },
    ],
  },
  {
    id: 'adj_setaiin',
    category: 'adjustment',
    label: '介護等が必要な世帯員はいますか？（調整指数 項番29・30）',
    helpText:
      '保護者及び申込児童を除く世帯員が対象です。要保育事由が「介護」の場合を除きます。重複時は高い指数で算定されます。',
    inputType: 'select',
    options: [
      { label: '要介護3〜5、障害支援区分4〜6、身体障害者手帳1・2級、療育手帳、精神障害者保健福祉手帳1・2級の世帯員がいる（+2点）', value: 'adj_setaiin_heavy', points: 2 },
      { label: '要支援1・2、要介護1・2、障害支援区分1〜3、身体障害者手帳3級以下、精神障害者保健福祉手帳3級の世帯員がいる（+1点）', value: 'adj_setaiin_light', points: 1 },
      { label: '該当なし', value: 'adj_setaiin_none', points: 0 },
    ],
  },
  {
    id: 'adj_setaiin_fukusu',
    category: 'adjustment',
    label: '介護等が必要な世帯員が複数いますか？（調整指数 項番31）',
    helpText:
      '要支援1・2、要介護1〜5、身体障害者手帳1〜4級、療育手帳、精神障害者保健福祉手帳1〜3級のいずれかに該当する世帯員（保護者及び申込児童を除く）が複数いる場合です。要保育事由が「介護」の場合を除きます。',
    inputType: 'radio',
    options: [
      { label: '該当する世帯員が複数いる（+2点）', value: 'adj_setaiin_fukusu_yes', points: 2 },
      { label: '該当なし', value: 'adj_setaiin_fukusu_none', points: 0 },
    ],
  },
  {
    id: 'adj_tainou',
    category: 'adjustment',
    label: '保育料等を3か月以上滞納していますか？（調整指数 項番35）',
    helpText: '卒園児・過去のものも含みます。',
    inputType: 'radio',
    options: [
      { label: '保育料等を3か月以上滞納している（-50点）', value: 'adj_tainou_yes', points: -50 },
      { label: '該当なし', value: 'adj_tainou_none', points: 0 },
    ],
  },
  {
    id: 'adj_fuzai',
    category: 'adjustment',
    label: '両親ともに不存在で別の者が養育していますか？（調整指数 項番36）',
    helpText: '里親・特別養子縁組は両親とみなします。',
    inputType: 'radio',
    options: [
      { label: '両親ともに死亡、離別及び行方不明等により不存在で別の者が養育を行っている（+50点）', value: 'adj_fuzai_yes', points: 50 },
      { label: '該当なし', value: 'adj_fuzai_none', points: 0 },
    ],
  },
];

export const mukoData: MunicipalityData = {
  municipality,
  questions: [
    ...buildParentQuestions(1),
    ...buildParentQuestions(2),
    ...adjustmentQuestions,
  ],
};
