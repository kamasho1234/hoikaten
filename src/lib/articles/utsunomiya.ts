import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  {
    slug: "hokatsu-schedule",
    citySlug: "utsunomiya",
    title: "宇都宮市の保活スケジュール　令和8年度4月入園の流れ",
    description:
      "宇都宮市の令和8年度（2026年度）4月入園の申込時期・必要書類・結果通知の時期をまとめました。",
    image:
      "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>令和8年度（2026年度）4月入園のスケジュール</h2>
<p>宇都宮市の4月入園の申込は例年10月〜11月頃に受け付けられます。</p>

<h3>申込の流れ</h3>
<table>
<tr><th>項目</th><th>日程（目安）</th></tr>
<tr><td>申請書類配布</td><td>2025年9月頃〜</td></tr>
<tr><td>申込受付（1次）</td><td>2025年10月〜11月頃</td></tr>
<tr><td>1次結果通知</td><td>2026年1月下旬〜2月頃</td></tr>
<tr><td>2次申込受付</td><td>2026年2月頃</td></tr>
<tr><td>2次結果通知</td><td>2026年3月頃</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>宇都宮市では「教育・保育施設等入所のご案内」が公式サイトからダウンロードできます。申込前に必ず目を通しましょう。</p>
</div>

<h2>いつから動き始めるべき？</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content"><strong>4月〜6月：情報収集</strong><p>宇都宮市の保育課窓口または公式サイトで入所案内を入手。</p></div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content"><strong>6月〜9月：保育園見学</strong><p>気になる園に電話して見学予約。複数園の見学がおすすめです。</p></div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content"><strong>9月〜10月：書類準備</strong><p>就労証明書を勤務先に依頼。余裕を持って準備しましょう。</p></div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content"><strong>10月〜11月：申込</strong><p>期限内に必要書類を提出します。</p></div>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新情報は<a href="https://www.city.utsunomiya.lg.jp/kosodate/kosodate/1035002/hoiku/nyusho/1039264.html" target="_blank" rel="noopener">宇都宮市公式サイト「教育・保育施設等の入所申込」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 55,
  },
  {
    slug: "scoring-system-guide",
    citySlug: "utsunomiya",
    title: "宇都宮市の入園点数のしくみ　基準指数と調整指数をやさしく解説",
    description:
      "宇都宮市の保育園入所選考で使われる「基準指数」と「調整指数」の仕組みを、初めての方にもわかるように解説します。",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>点数制度の全体像</h2>
<p>宇都宮市の認可保育施設は「先着順」ではなく、<strong>指数の高いお子さまから優先</strong>して入所者が決定されます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>合計指数 ＝ 基準指数（父）＋ 基準指数（母）＋ 調整指数</p>
</div>

<h2>基準指数とは</h2>
<p>保護者それぞれの「保育を必要とする事由」を指数化したものです。1人あたり<span class="highlight">最大10点</span>、保護者2人の合計で<span class="highlight">最大20点</span>です。</p>
<table>
<tr><th>就労状況</th><th>基準指数</th></tr>
<tr><td>月160時間以上の就労を常態</td><td>10</td></tr>
<tr><td>月140時間以上160時間未満</td><td>9</td></tr>
<tr><td>月120時間以上140時間未満</td><td>8</td></tr>
<tr><td>月100時間以上120時間未満</td><td>7</td></tr>
<tr><td>月64時間以上100時間未満</td><td>6</td></tr>
</table>

<h2>調整指数とは</h2>
<p>世帯の状況に応じて加点・減点される指数です。</p>
<table>
<tr><th>項目</th><th>指数</th></tr>
<tr><td>ひとり親世帯</td><td>+5</td></tr>
<tr><td>産休・育休満了後の復帰予定</td><td>+3</td></tr>
<tr><td>地域型保育事業の卒園児</td><td>+3</td></tr>
<tr><td>きょうだい在園中（同じ園を希望）</td><td>+3</td></tr>
<tr><td>認可外保育施設を利用中</td><td>+2</td></tr>
<tr><td>生活保護受給世帯</td><td>+2</td></tr>
<tr><td>同居の祖父母（65歳未満）</td><td>-1</td></tr>
</table>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳細は<a href="https://www.city.utsunomiya.lg.jp/kosodate/kosodate/1035002/hoiku/nyusho/1039258/1039259.html" target="_blank" rel="noopener">宇都宮市公式サイト「入所選考基準」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 65,
  },
  {
    slug: "fulltime-20-line",
    citySlug: "utsunomiya",
    title: "フルタイム共働き20点は安心？宇都宮市のボーダーライン事情",
    description:
      "宇都宮市でフルタイム共働き（基準指数20点）なら入園できるのか？競争状況と加点の重要性を解説します。",
    image:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>基準指数20点がスタートライン</h2>
<p>宇都宮市では保護者がともに月160時間以上のフルタイム勤務であれば、各10点ずつで<span class="highlight">基準指数20点</span>になります。</p>

<h2>宇都宮市の競争状況</h2>
<p>宇都宮市は近年、待機児童対策として保育施設の整備を進めています。しかし中心部や人気エリアでは定員を超える申込があり、20点だけでは安心できない園もあります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>育休復帰の+3点、きょうだい在園の+3点、地域型保育卒園の+3点など、調整指数で差がつきます。該当する加点項目がないか確認しましょう。</p>
</div>

<h2>同点の場合の優先順位</h2>
<p>宇都宮市では合計指数が同点の場合、優先順位により決定されます。虐待やDV等の緊急性が最優先、次いで不存在（保護者がいない）、疾病・障害、就労の順に優先されます。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>人気園を第一希望にする場合は、複数の園を希望園として記入しておくことをおすすめします。第一希望に入れなくても、第二希望以降で入れるケースがあります。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 100,
  },
  {
    slug: "jitan-kinmu-scoring",
    citySlug: "utsunomiya",
    title: "時短勤務だと指数は下がる？宇都宮市の基準指数と勤務時間の関係",
    description:
      "宇都宮市で時短勤務の場合、基準指数がどう変わるかを解説。フルタイムとの差や指数を最大化するポイントも紹介します。",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>時短勤務の基準指数</h2>
<p>宇都宮市では月あたりの就労時間に応じて基準指数が決まります。フルタイム（月160時間以上）なら10点ですが、時短勤務で就労時間が短くなると指数が下がります。</p>

<table>
<tr><th>就労時間</th><th>基準指数</th></tr>
<tr><td>月160時間以上</td><td><span class="highlight">10点</span></td></tr>
<tr><td>月140時間以上160時間未満</td><td><span class="highlight">9点</span></td></tr>
<tr><td>月120時間以上140時間未満</td><td><span class="highlight">8点</span></td></tr>
<tr><td>月100時間以上120時間未満</td><td><span class="highlight">7点</span></td></tr>
<tr><td>月64時間以上100時間未満</td><td><span class="highlight">6点</span></td></tr>
</table>

<h2>時短勤務で両親合計はどうなる？</h2>
<div class="point-box">
<p><strong>ポイント</strong></p>
<p>例：母が月120時間の時短勤務、父がフルタイムの場合は、父10点＋母8点＝<span class="highlight">基準指数18点</span>。フルタイム共働きの20点と比べて2点低くなります。</p>
</div>

<h2>就労証明書の記載に注意</h2>
<p>時短勤務の場合、就労証明書に記載される勤務時間がそのまま指数に反映されます。育休復帰後に時短勤務を予定している場合は、復帰後の勤務条件で作成してもらいましょう。</p>`,
    publishedAt: "2026-03-28",
    popularity: 95,
  },
  {
    slug: "chiikigata-hoiku-sotsuenzi",
    citySlug: "utsunomiya",
    title: "地域型保育の卒園児に+3点　宇都宮市の連携施設と加点",
    description:
      "宇都宮市で小規模保育・家庭的保育等の地域型保育事業の卒園児に適用される+3点の加点について解説します。",
    image:
      "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>地域型保育事業とは</h2>
<p>小規模保育事業・家庭的保育事業・事業所内保育事業などの0〜2歳児を対象とした保育事業を指します。これらの施設は原則として2歳児クラスまでのため、3歳児以降の転園（いわゆる「3歳の壁」）が必要になります。</p>

<h2>卒園児への+3点の加点</h2>
<p>宇都宮市では地域型保育事業の卒園児が認可保育園に申し込む場合、調整指数として<span class="highlight">+3点</span>が加算されます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>フルタイム共働きの基準指数20点に地域型卒園+3点が加わると23点に。育休復帰の+3点も合わせれば26点と非常に有利になります。</p>
</div>

<h2>連携施設について</h2>
<p>多くの地域型保育事業所は「連携施設」を設定しており、卒園後の受け入れ先が優先的に確保されている場合があります。入園前に連携施設がどこかを確認しておきましょう。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>連携施設への優先入園と調整指数の加点は別の制度です。連携施設以外の園に申し込む場合でも+3点の加点は適用されます。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 80,
  },
  {
    slug: "ochita-toki-sentakushi",
    citySlug: "utsunomiya",
    title: "宇都宮市で保育園に落ちたときの選択肢　次にやるべきこと",
    description:
      "宇都宮市の1次選考で保留になった場合の対処法を解説。2次申込・途中入園・認可外など取れる選択肢をまとめました。",
    image:
      "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>保留通知が届いたら</h2>
<p>1次選考で保留になっても、まだ選択肢はあります。</p>

<h2>選択肢1：2次選考に申し込む</h2>
<p>1次で保留になった場合、2次選考に申し込めます。1次で辞退が出た枠で再度選考が行われます。</p>

<h2>選択肢2：途中入園を申し込む</h2>
<p>年度途中の入園申込は毎月受け付けています。空きが出れば入園できます。</p>

<h2>選択肢3：認可外保育施設を利用する</h2>
<p>認可外に預けて復職し、次年度は認可外利用の+2点加点を得て再挑戦する戦略があります。</p>

<h2>選択肢4：育児休業を延長する</h2>
<p>保留通知書があれば育児休業を延長できます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>宇都宮市では入所予約制度もあります。育児休業中に翌年度4月入所を予約できる場合があるので、保育課に確認してみましょう。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 75,
  },
  {
    slug: "area-guide",
    citySlug: "utsunomiya",
    title: "宇都宮市のエリア別保育園事情　入りやすい地域は？",
    description:
      "宇都宮市の地域ごとの保育園の特徴と入りやすさの傾向を解説します。",
    image:
      "https://images.unsplash.com/photo-1524813686514-a57563d77965?w=800&h=400&fit=crop",
    category: "保育園選び",
    categoryColor: "teal",
    content: `<h2>エリアによって事情が異なる</h2>
<p>宇都宮市は北関東最大の都市であり、中心部と郊外で保育園の競争状況が異なります。</p>

<table>
<tr><th>エリア</th><th>特徴</th></tr>
<tr><td>JR宇都宮駅周辺</td><td>共働き世帯が多く、0〜1歳児は競争率が高め</td></tr>
<tr><td>東武宇都宮駅周辺</td><td>商業地区で園数は多いが人気園は競争あり</td></tr>
<tr><td>インターパーク周辺</td><td>大型商業施設があり子育て世帯が増加中</td></tr>
<tr><td>雀宮・西川田</td><td>住宅地として発展中。比較的入りやすい傾向</td></tr>
<tr><td>河内・上河内</td><td>郊外エリアで定員に余裕がある園が多い</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>宇都宮市は車社会のため、通勤経路上の園も選択肢に入れると可能性が広がります。公式サイトで各園の受入れ状況一覧が公開されているので参考にしましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>各園の受入れ状況は<a href="https://www.city.utsunomiya.lg.jp/kosodate/kosodate/1035002/hoiku/nyusho/1039658/index.html" target="_blank" rel="noopener">宇都宮市公式サイト「受入れ状況一覧」</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 60,
  },
  {
    slug: "ikukyu-kyuufukin-genkakuka",
    citySlug: "utsunomiya",
    title: "2025年4月から育休給付金延長の審査が厳格化　宇都宮市での影響",
    description:
      "2025年4月からの育児休業給付金の延長手続き厳格化について、宇都宮市の保活にどう影響するかを解説します。",
    image:
      "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=800&h=400&fit=crop",
    category: "最新情報",
    categoryColor: "blue",
    content: `<h2>制度改正の概要</h2>
<p>2025年4月から、育児休業給付金の支給対象期間延長の審査が厳格化されました。「速やかな職場復帰のために保育所の利用申込をした」と認められることが必要になりました。</p>

<h2>宇都宮市の保活への影響</h2>
<p>通勤可能な範囲の園を複数希望し、真剣に入園を目指している方は影響を受けません。従来どおり、保留になった場合は育児休業給付金の延長が可能です。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>制度改正の詳細は<a href="https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/0000160564_00040.html" target="_blank" rel="noopener">厚生労働省「育児休業給付金の支給対象期間延長手続き」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 50,
  },
  {
    slug: "hitorioya-katen",
    citySlug: "utsunomiya",
    title: "宇都宮市のひとり親加点　+5点の加算を解説",
    description:
      "宇都宮市でひとり親世帯に適用される+5点の調整指数について、適用条件と手続きを詳しく解説します。",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>ひとり親世帯の加点</h2>
<p>宇都宮市では、ひとり親世帯の場合、調整指数として<span class="highlight">+5点</span>が加算されます。10点満点制の宇都宮市では大きな加点です。</p>

<h2>ひとり親世帯の合計指数イメージ</h2>
<p>ひとり親でフルタイム就労（月160時間以上）の場合：</p>
<div class="point-box">
<p><strong>ポイント</strong></p>
<p>基準指数10点 ＋ ひとり親加点5点 ＝ <span class="highlight">合計15点</span>。両親フルタイム共働き世帯（20点）より低くなりますが、他の加点（育休復帰+3、きょうだい+3など）を組み合わせることで差を縮められます。</p>
</div>

<h2>必要書類</h2>
<p>ひとり親であることを証明する書類（戸籍謄本、児童扶養手当証書の写しなど）が必要です。</p>`,
    publishedAt: "2026-03-28",
    popularity: 90,
  },
  {
    slug: "ikukyu-fukki-katen",
    citySlug: "utsunomiya",
    title: "育休復帰で+3点　宇都宮市の産休・育休満了後復帰加点",
    description:
      "宇都宮市で産休・育休満了後に職場復帰する場合に適用される+3点の調整指数を解説します。",
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop",
    category: "育休・復職",
    categoryColor: "purple",
    content: `<h2>育休復帰で+3点の加点</h2>
<p>宇都宮市では産休・育休期間満了後に入所を希望する場合、調整指数として<span class="highlight">+3点</span>が加算されます。</p>

<h2>適用条件</h2>
<ul>
<li>産前産後休暇または育児休業を取得していること</li>
<li>入園月に職場復帰すること</li>
<li>就労証明書に復帰予定日が記載されていること</li>
</ul>

<h2>フルタイム共働き＋育休復帰の合計</h2>
<div class="point-box">
<p><strong>ポイント</strong></p>
<p>父10点 ＋ 母10点 ＋ 育休復帰+3点 ＝ <span class="highlight">合計23点</span>。育休復帰の加点は非常に大きく、保活で有利に働きます。</p>
</div>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>入園が内定した後、予定どおり復帰しなかった場合は入園取り消しになる可能性があります。復帰日は慣らし保育期間を考慮して設定しましょう。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 50,
  },
];

registerArticles(articles);
