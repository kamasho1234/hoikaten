import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  {
    slug: "hokatsu-schedule",
    citySlug: "kure",
    title: "呉市の保活スケジュール　令和8年度4月入園の流れ",
    description:
      "呉市の令和8年度（2026年度）4月入園の申込時期・必要書類・結果通知の時期をまとめました。",
    image:
      "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>令和8年度（2026年度）4月入園のスケジュール</h2>
<p>呉市の4月入園申込は例年10月〜11月頃に受け付けられます。呉市は令和4年4月入所から<strong>電子申請（オンライン）</strong>での手続きに対応しています。</p>

<h3>申込の流れ</h3>
<table>
<tr><th>項目</th><th>日程（目安）</th></tr>
<tr><td>入所案内・申請書類配布</td><td>2025年10月頃〜</td></tr>
<tr><td>4月入所 一次申込受付</td><td>2025年10月〜11月頃</td></tr>
<tr><td>一次結果通知</td><td>2026年1月下旬〜2月頃</td></tr>
<tr><td>二次募集（空きがある園のみ）</td><td>2026年2月頃</td></tr>
<tr><td>途中入所（随時）</td><td>毎月受付（入所希望月の前月10日頃が締切目安）</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>呉市では「くれ子育てねっと」で入所案内や空き状況を確認できます。申込は電子申請が原則です。</p>
</div>

<h2>いつから動き始めるべき？</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content"><strong>4月〜6月：情報収集</strong><p>くれ子育てねっとで前年度の案内を参考に準備を始めましょう。</p></div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content"><strong>7月〜9月：保育園見学</strong><p>気になる園に電話で見学予約を入れましょう。呉市内には公立・私立合わせて約120施設あります。</p></div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content"><strong>9月〜10月：書類準備</strong><p>就労証明書を勤務先に依頼します。様式はくれ子育てねっとからダウンロードできます。</p></div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content"><strong>10月〜11月：電子申請で申込</strong><p>期限内にオンラインで申請します。</p></div>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新情報は<a href="https://kure-kosodate.com/service/3639.html" target="_blank" rel="noopener">くれ子育てねっと「保育所等入所申込み」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 60,
  },
  {
    slug: "scoring-system-guide",
    citySlug: "kure",
    title: "呉市の入園選考のしくみ　ランク制と調整指数をやさしく解説",
    description:
      "呉市の保育園入園選考で使われるランク制度の仕組みを、初めての方にもわかるように解説します。",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>選考制度の全体像</h2>
<p>呉市の認可保育施設は<strong>ランクの高い世帯から優先</strong>して利用調整されます。広島県内の多くの自治体と同様、ランク制を採用しています。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>世帯のランク ＝ 父母のうち低い方のランク<br>同ランクの場合は調整指数の高い世帯が優先</p>
</div>

<h2>ランクとは</h2>
<p>保護者それぞれの「保育を必要とする事由」をランクに変換したものです。ランクは<span class="highlight">S（最優先）〜G（求職活動）</span>まであります。</p>
<table>
<tr><th>ランク</th><th>主な条件例</th></tr>
<tr><td>S</td><td>転園（在園児の学年上がりに伴う措置）</td></tr>
<tr><td>A</td><td>月160時間以上の居宅外就労、重度障害、常時看護</td></tr>
<tr><td>B</td><td>月120時間以上160時間未満の就労、精神疾患等</td></tr>
<tr><td>C</td><td>月64時間以上120時間未満の就労、出産前後</td></tr>
<tr><td>D</td><td>月64時間未満の就労</td></tr>
<tr><td>E</td><td>居宅内労働（内職）月64時間未満</td></tr>
<tr><td>F</td><td>育児休業中（復帰予定あり）</td></tr>
<tr><td>G</td><td>求職活動中</td></tr>
</table>

<h2>調整指数とは</h2>
<p>世帯の状況に応じて加点・減点される指数です。同一ランク内の優先順位を決めるために使われます。</p>
<table>
<tr><th>項目</th><th>指数</th></tr>
<tr><td>ひとり親世帯</td><td>+20</td></tr>
<tr><td>きょうだいが同一施設に在園中</td><td>+4</td></tr>
<tr><td>認可外保育施設等を利用中</td><td>+3</td></tr>
<tr><td>育児休業からの復帰予定</td><td>+3</td></tr>
<tr><td>保育士として市内施設に勤務</td><td>+5</td></tr>
<tr><td>地域型保育事業の卒園児（連携施設）</td><td>+10</td></tr>
<tr><td>65歳未満の無職の祖父母等と同居</td><td>-2</td></tr>
</table>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳細は<a href="https://www.city.kure.lg.jp/soshiki/27/" target="_blank" rel="noopener">呉市こども施設課</a>（TEL: 0823-25-3144）にお問い合わせください。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 55,
  },
  {
    slug: "fulltime-rank-a",
    citySlug: "kure",
    title: "フルタイム共働きでランクAは安心？呉市のボーダーライン事情",
    description:
      "呉市でフルタイム共働き（ランクA）なら入園できるのか？競争状況と調整指数の重要性を解説します。",
    image:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>ランクAがスタートライン</h2>
<p>呉市では父母ともフルタイム勤務（月160時間以上）であれば世帯ランクは<span class="highlight">A</span>になります。これが就労世帯の最高ランクです。</p>

<h2>呉市の競争状況</h2>
<p>呉市は人口減少傾向にありますが、中心部（呉駅周辺・広地区）の人気園では依然として競争が発生します。特に0歳児クラスは定員が少なく、ランクAでも調整指数の差で入れないケースがあります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>認可外利用（+3）、きょうだい在園（+4）、育休復帰（+3）などの調整指数が差を分けます。該当する項目がないか確認しましょう。</p>
</div>

<h2>同ランクの場合はどうなる？</h2>
<p>同一ランク内では調整指数の合計が高い世帯が優先されます。調整指数も同点の場合は、世帯の所得額や就労時間の長さなどが比較されます。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>0歳児クラスは枠が少ないため、年齢によって入りやすさが大きく異なります。空き状況はくれ子育てねっとで定期的に公開されています。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 50,
  },
  {
    slug: "jitan-kinmu-rank",
    citySlug: "kure",
    title: "時短勤務だとランクは下がる？呉市のランク制と勤務時間の関係",
    description:
      "呉市で時短勤務の場合、ランクがどう変わるかを解説。フルタイムとの差や調整指数を最大化するポイントも紹介します。",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>時短勤務のランク</h2>
<p>呉市では月あたりの就労時間に応じてランクが決まります。</p>

<table>
<tr><th>就労時間（月あたり）</th><th>ランク</th></tr>
<tr><td>月160時間以上</td><td><span class="highlight">A</span></td></tr>
<tr><td>月120時間以上160時間未満</td><td><span class="highlight">B</span></td></tr>
<tr><td>月64時間以上120時間未満</td><td><span class="highlight">C</span></td></tr>
<tr><td>月64時間未満</td><td><span class="highlight">D</span></td></tr>
</table>

<h2>時短勤務で世帯ランクはどうなる？</h2>
<div class="point-box">
<p><strong>ポイント</strong></p>
<p>例：母が月100時間の時短勤務（ランクC）、父がフルタイム月160時間（ランクA）の場合、世帯ランクは<span class="highlight">低い方のC</span>になります。フルタイム同士のAと比べて大きく不利になります。</p>
</div>

<h2>内職・自営補助者の場合はさらに注意</h2>
<p>呉市では居宅内労働（内職・自営補助者）は居宅外就労よりもランクが低くなります。同じ月120時間でも居宅外ならランクB、居宅内ならランクCです。就労証明書の記載内容を確認しましょう。</p>`,
    publishedAt: "2026-04-05",
    popularity: 45,
  },
  {
    slug: "ochita-toki-sentakushi",
    citySlug: "kure",
    title: "呉市で保育園に落ちたときの選択肢　次にやるべきこと",
    description:
      "呉市の一次選考で保留になった場合の対処法を解説。取れる選択肢をまとめました。",
    image:
      "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>保留通知が届いたら</h2>
<p>一次選考で保留になっても、まだ選択肢はあります。</p>

<h2>選択肢1：二次募集に申し込む</h2>
<p>一次で辞退が出た枠で再度選考されます。希望園の変更・追加も可能です。空き状況はくれ子育てねっとで公開されます。</p>

<h2>選択肢2：途中入園を申し込む</h2>
<p>呉市では毎月の空き状況に応じて途中入園（随時入所）の受付があります。入所希望月の前月10日頃が申込締切の目安です。</p>

<h2>選択肢3：認可外保育施設を利用する</h2>
<p>認可外に預けて復職し、次年度は調整指数+3を得て再挑戦する戦略があります。</p>

<h2>選択肢4：育児休業を延長する</h2>
<p>保留通知書があれば育児休業を延長できます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>呉市は郊外エリア（音戸・倉橋・蒲刈など）では空きがある園も比較的多いです。通勤可能な範囲を広げて検討しましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>空き状況は<a href="https://kure-kosodate.com/" target="_blank" rel="noopener">くれ子育てねっと</a>で毎月更新されています。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 45,
  },
  {
    slug: "ninkagai-katen",
    citySlug: "kure",
    title: "認可外保育施設の利用で調整指数+3　呉市で加点を得る条件",
    description:
      "呉市で認可外保育施設の利用実績により調整指数+3を得るための条件を解説します。",
    image:
      "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&h=400&fit=crop",
    category: "認可外",
    categoryColor: "rose",
    content: `<h2>認可外利用で+3の調整指数</h2>
<p>呉市では認可外保育施設等を月64時間以上利用している実績があると<span class="highlight">+3</span>の調整指数が得られます。</p>

<h2>対象となる施設</h2>
<ul>
<li>認可外保育施設</li>
<li>企業主導型保育事業所</li>
<li>一時預かり事業（月64時間以上利用）</li>
</ul>

<h2>注意点</h2>
<div class="warn-box">
<p><strong>注意</strong></p>
<p>育児休業中に認可外施設を利用している場合は、調整指数の対象外となることがあります。育児休業から復帰した上での利用であることが必要です。</p>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>ランクA＋認可外利用+3で、同じランクAの中でも優位に立てます。人気園ではこの3点が当落を分けることがあります。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 40,
  },
  {
    slug: "area-guide",
    citySlug: "kure",
    title: "呉市のエリア別保育園事情　入りやすい地域は？",
    description:
      "呉市の地域ごとの保育園の特徴と入りやすさの傾向を解説します。",
    image:
      "https://images.unsplash.com/photo-1524813686514-a57563d77965?w=800&h=400&fit=crop",
    category: "保育園選び",
    categoryColor: "teal",
    content: `<h2>エリアによって事情が異なる</h2>
<p>呉市は旧市街地から島しょ部まで広いエリアをカバーしており、地域によって保育園の競争状況が大きく異なります。</p>

<table>
<tr><th>エリア</th><th>特徴</th></tr>
<tr><td>呉駅周辺（中央・宝町・西中央）</td><td>市の中心部。マンション開発もあり、人気園では競争が発生</td></tr>
<tr><td>広地区</td><td>住宅地として人気。子育て世帯が多く園の競争あり</td></tr>
<tr><td>焼山・昭和地区</td><td>郊外の住宅地。園の選択肢は比較的多い</td></tr>
<tr><td>天応・吉浦地区</td><td>広島市に近く通勤便利。園数はやや少ない</td></tr>
<tr><td>音戸・倉橋・蒲刈・安浦など</td><td>郊外・島しょ部。空きがある園も比較的多い</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>呉市は人口減少が続いていますが、中心部の人気園は依然として競争があります。通勤経路上の園も含めて幅広く検討しましょう。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 40,
  },
  {
    slug: "hitorioya-katen",
    citySlug: "kure",
    title: "呉市のひとり親加点　ランク引き上げ＋調整指数20を解説",
    description:
      "呉市でひとり親世帯に適用されるランク優遇と調整指数+20について解説します。",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>ひとり親世帯の優遇措置</h2>
<p>呉市ではひとり親世帯に対して<strong>調整指数+20</strong>が加算されます。これは調整指数の中で最も大きな加点です。</p>

<h2>ひとり親世帯の選考イメージ</h2>
<div class="point-box">
<p><strong>ポイント</strong></p>
<p>フルタイム就労のひとり親の場合：ランクA＋調整指数20。同じランクAのフルタイム共働き世帯（調整指数0）を大きく上回る水準になります。</p>
</div>

<h2>必要書類</h2>
<p>ひとり親であることを証明する書類（戸籍謄本、児童扶養手当証書の写しなど）が必要です。詳細は申込書類で確認してください。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳細は<a href="https://www.city.kure.lg.jp/soshiki/27/" target="_blank" rel="noopener">呉市こども施設課</a>（TEL: 0823-25-3144）にお問い合わせください。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 45,
  },
  {
    slug: "ikukyu-kyuufukin-genkakuka",
    citySlug: "kure",
    title: "2025年4月から育休給付金延長の審査が厳格化　呉市での影響",
    description:
      "2025年4月からの育児休業給付金の延長手続き厳格化について、呉市の保活にどう影響するかを解説します。",
    image:
      "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=800&h=400&fit=crop",
    category: "最新情報",
    categoryColor: "purple",
    content: `<h2>制度改正の概要</h2>
<p>2025年4月から、育児休業給付金の支給対象期間延長の審査が厳格化されました。「速やかな職場復帰のために保育所の利用申込をした」と認められることが必要です。</p>

<h2>呉市の保活への影響</h2>
<p>通勤可能な範囲の園を複数希望し、真剣に入園を目指している方は影響を受けません。ただし、育休延長目的で意図的に倍率の高い園のみを希望する場合は、給付金延長が認められない可能性があります。</p>

<h2>呉市の育休関連の調整指数</h2>
<ul>
<li>育児休業からの復帰予定：+3</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>呉市は郊外エリアに空きがある園も多いため、複数園を幅広く希望することで、真摯に保活をしている姿勢を示せます。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>制度改正の詳細は<a href="https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/0000160564_00040.html" target="_blank" rel="noopener">厚生労働省「育児休業給付金の支給対象期間延長手続き」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 35,
  },
  {
    slug: "chiikigata-sotsuenji",
    citySlug: "kure",
    title: "地域型保育の卒園児は+10　呉市の連携施設加点を解説",
    description:
      "呉市で小規模保育所等の卒園児に適用される調整指数+10（連携施設）について解説します。",
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "amber",
    content: `<h2>地域型保育事業の卒園児への加点</h2>
<p>呉市では小規模保育所・家庭的保育事業等の地域型保育事業を卒園（予定含む）する児童に対し、大きな調整指数が加算されます。</p>

<table>
<tr><th>条件</th><th>調整指数</th></tr>
<tr><td>連携施設への入所希望</td><td><span class="highlight">+10</span></td></tr>
<tr><td>連携施設以外への入所希望</td><td><span class="highlight">+5</span></td></tr>
</table>

<h2>連携施設とは</h2>
<p>地域型保育事業所が卒園後の受け皿として協定を結んでいる保育所・認定こども園のことです。連携施設への入所を希望する場合は最大の+10が適用されます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>ランクA＋連携施設加点10は非常に強力です。地域型保育事業は3歳以降の入園戦略として有効です。入所前に連携施設がどの園かを確認しておきましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>施設一覧は<a href="https://kure-kosodate.com/service/810.html" target="_blank" rel="noopener">くれ子育てねっと「保育所一覧」</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 30,
  },
];

registerArticles(articles);
