import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  {
    slug: "hokatsu-schedule",
    citySlug: "ibaraki",
    title: "茨木市の保活スケジュール　令和8年度4月入園の流れ",
    description:
      "茨木市の令和8年度（2026年度）4月入園の申込時期・必要書類・結果通知の時期をまとめました。",
    image:
      "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>令和8年度（2026年度）4月入園のスケジュール</h2>
<p>茨木市の4月入園申込は例年10月頃に受け付けが始まります。茨木市こども育成部が窓口です。</p>

<h3>申込の流れ</h3>
<table>
<tr><th>項目</th><th>日程（目安）</th></tr>
<tr><td>申請書類配布</td><td>2025年9月頃〜</td></tr>
<tr><td>1次申込受付</td><td>2025年10月〜11月頃</td></tr>
<tr><td>1次結果通知</td><td>2026年1月下旬〜2月頃</td></tr>
<tr><td>2次申込受付</td><td>2026年2月頃</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>茨木市では「保育施設等利用のしおり」が公式サイトからダウンロードできます。利用調整基準表も掲載されているので必ず確認しましょう。</p>
</div>

<h2>いつから動き始めるべき？</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content"><strong>4月〜6月：情報収集</strong><p>茨木市の公式サイトで前年度のしおりを参考にします。認可保育園は市内に約50か所あります。</p></div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content"><strong>6月〜9月：保育園見学</strong><p>気になる園に電話して見学予約。JR茨木駅・阪急茨木市駅の周辺は人気が高いため早めに動きましょう。</p></div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content"><strong>9月〜10月：書類準備</strong><p>就労証明書を勤務先に依頼します。記載内容が点数に直結するので正確に書いてもらいましょう。</p></div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content"><strong>10月〜11月：申込</strong><p>期限内に必要書類をこども育成部へ提出します。</p></div>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新情報は<a href="https://www.city.ibaraki.osaka.jp/kikou/kodomo/hoiku/" target="_blank" rel="noopener">茨木市公式サイト「保育施設等の利用」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 55,
  },
  {
    slug: "scoring-system-guide",
    citySlug: "ibaraki",
    title: "茨木市の入園点数のしくみ　基本点数と調整点数をやさしく解説",
    description:
      "茨木市の保育園入園選考で使われる点数制度の仕組みを、初めての方にもわかるように解説します。",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>点数制度の全体像</h2>
<p>茨木市の認可保育施設は<strong>父母の合計点数の高い世帯から優先</strong>して利用調整されます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>合計点数 ＝ 基本点数（父）＋ 基本点数（母）＋ 調整点数</p>
</div>

<h2>基本点数とは</h2>
<p>保護者それぞれの「保育を必要とする事由」を点数化したものです。1人あたり<span class="highlight">最大20点</span>、保護者2人の合計で<span class="highlight">最大40点</span>です。</p>
<table>
<tr><th>就労状況</th><th>基本点数</th></tr>
<tr><td>月20日以上かつ日8時間以上</td><td>20</td></tr>
<tr><td>月20日以上かつ日6時間以上</td><td>18</td></tr>
<tr><td>月16日以上かつ日6時間以上</td><td>16</td></tr>
<tr><td>月16日以上かつ日4時間以上</td><td>14</td></tr>
<tr><td>月12日以上かつ日4時間以上</td><td>12</td></tr>
<tr><td>月64時間以上（上記以外）</td><td>10</td></tr>
</table>

<h2>調整点数とは</h2>
<p>世帯の状況に応じて加点・減点される点数です。</p>
<table>
<tr><th>項目</th><th>点数</th></tr>
<tr><td>ひとり親世帯</td><td>+5</td></tr>
<tr><td>きょうだい在園中</td><td>+3</td></tr>
<tr><td>きょうだい同時申込</td><td>+2</td></tr>
<tr><td>認可外保育施設を利用中</td><td>+3</td></tr>
<tr><td>育児休業からの復帰予定</td><td>+2</td></tr>
<tr><td>生活保護受給世帯</td><td>+3</td></tr>
<tr><td>市外からの申込</td><td>-10</td></tr>
<tr><td>同居の祖父母（65歳未満）</td><td>-3</td></tr>
<tr><td>転園希望</td><td>-5</td></tr>
</table>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳細な利用調整基準表は<a href="https://www.city.ibaraki.osaka.jp/kikou/kodomo/hoiku/" target="_blank" rel="noopener">茨木市公式サイト</a>からダウンロードできます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 65,
  },
  {
    slug: "fulltime-40-line",
    citySlug: "ibaraki",
    title: "フルタイム共働き40点は安心？茨木市のボーダーライン事情",
    description:
      "茨木市でフルタイム共働き（基本40点）なら入園できるのか？北摂エリアの競争状況と加点の重要性を解説します。",
    image:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>基本40点がスタートライン</h2>
<p>茨木市では父母とも月20日以上・日8時間以上のフルタイム勤務であれば<span class="highlight">基本40点</span>になります。</p>

<h2>茨木市の競争状況</h2>
<p>茨木市は人口約28.5万人の大阪府北部・北摂エリアの中核市です。JR茨木駅や阪急茨木市駅の周辺はファミリー層に人気が高く、駅近の保育園では40点だけでは安心できないケースがあります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>きょうだい在園（+3）、認可外利用（+3）、育休復帰（+2）、ひとり親（+5）など調整加点が差を分けます。該当する項目がないか確認しましょう。</p>
</div>

<h2>同点の場合はどうなる？</h2>
<p>合計点数が同じ場合、茨木市が定める優先順位（所得の低い世帯が優先など）で決定されます。</p>

<div class="info-box">
<p><strong>注意</strong></p>
<p>0歳児クラスは枠が少ないため、年齢によって入りやすさが大きく異なります。受入れ状況は公式サイトで確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 100,
  },
  {
    slug: "jitan-kinmu-scoring",
    citySlug: "ibaraki",
    title: "時短勤務だと点数は下がる？茨木市の基本点数と勤務時間の関係",
    description:
      "茨木市で時短勤務の場合、基本点数がどう変わるかを解説。フルタイムとの差や点数を最大化するポイントも紹介します。",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>時短勤務の基本点数</h2>
<p>茨木市では月あたりの勤務日数・日あたりの勤務時間に応じて基本点数が決まります。</p>

<table>
<tr><th>勤務時間</th><th>基本点数</th></tr>
<tr><td>月20日以上かつ日8時間以上</td><td><span class="highlight">20点</span></td></tr>
<tr><td>月20日以上かつ日6時間以上</td><td><span class="highlight">18点</span></td></tr>
<tr><td>月16日以上かつ日6時間以上</td><td><span class="highlight">16点</span></td></tr>
<tr><td>月16日以上かつ日4時間以上</td><td><span class="highlight">14点</span></td></tr>
<tr><td>月12日以上かつ日4時間以上</td><td><span class="highlight">12点</span></td></tr>
</table>

<h2>時短勤務で両親合計はどうなる？</h2>
<div class="point-box">
<p><strong>ポイント</strong></p>
<p>例：母が日6時間・月20日の時短勤務、父がフルタイムの場合は、父20点＋母18点＝<span class="highlight">基本38点</span>。フルタイム共働き40点との差は2点ですが、調整加点での挽回が重要です。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 95,
  },
  {
    slug: "ochita-toki-sentakushi",
    citySlug: "ibaraki",
    title: "茨木市で保育園に落ちたときの選択肢　次にやるべきこと",
    description:
      "茨木市の1次選考で保留になった場合の対処法を解説。取れる選択肢をまとめました。",
    image:
      "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>保留通知が届いたら</h2>
<p>1次選考で保留になっても、まだ選択肢はあります。</p>

<h2>選択肢1：2次選考に申し込む</h2>
<p>1次で辞退が出た枠で再度選考されます。希望園の変更・追加も可能です。</p>

<h2>選択肢2：途中入園を申し込む</h2>
<p>毎月の空き状況に応じて途中入園の受付があります。茨木市こども育成部に相談しましょう。</p>

<h2>選択肢3：認可外保育施設を利用する</h2>
<p>認可外に預けて復職し、次年度は+3点の加点を得て再挑戦する戦略があります。</p>

<h2>選択肢4：育児休業を延長する</h2>
<p>保留通知書があれば育児休業を延長できます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>茨木市では受入れ状況（空き状況）が公式サイトで公開されています。途中入園のチャンスを逃さないよう定期的にチェックしましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>受入れ状況は<a href="https://www.city.ibaraki.osaka.jp/kikou/kodomo/hoiku/" target="_blank" rel="noopener">茨木市公式サイト「保育施設等の利用」</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 80,
  },
  {
    slug: "ninkagai-katen",
    citySlug: "ibaraki",
    title: "認可外保育施設の利用で+3点　茨木市の加点を得る条件",
    description:
      "茨木市で認可外保育施設の利用実績により調整点数+3を得るための条件を解説します。",
    image:
      "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&h=400&fit=crop",
    category: "認可外",
    categoryColor: "rose",
    content: `<h2>認可外利用で+3点の加点</h2>
<p>茨木市では認可外保育施設に月極で預けている実績があると<span class="highlight">+3点</span>の調整加点が得られます。</p>

<h2>加点を得るための条件</h2>
<ul>
<li>認可外保育施設に月極契約で利用していること</li>
<li>就労のために利用していること</li>
<li>申込時点で利用実績があること</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>40点＋認可外+3点＝43点に。JR茨木駅・阪急茨木市駅周辺の人気園ではこの3点が当落を分けることがあります。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 75,
  },
  {
    slug: "area-guide",
    citySlug: "ibaraki",
    title: "茨木市のエリア別保育園事情　入りやすい地域は？",
    description:
      "茨木市の地域ごとの保育園の特徴と入りやすさの傾向を解説します。",
    image:
      "https://images.unsplash.com/photo-1524813686514-a57563d77965?w=800&h=400&fit=crop",
    category: "保育園選び",
    categoryColor: "teal",
    content: `<h2>エリアによって事情が異なる</h2>
<p>茨木市は大阪府北部の北摂エリアに位置し、JR茨木駅と阪急茨木市駅の2つの主要駅を中心に発展しています。認可保育園は市内に約50か所あり、エリアによって競争状況が異なります。</p>

<table>
<tr><th>エリア</th><th>特徴</th></tr>
<tr><td>JR茨木駅周辺</td><td>再開発でマンションが増加。ファミリー層に人気が高く競争は激しい</td></tr>
<tr><td>阪急茨木市駅周辺</td><td>商業施設が充実。駅近の園は倍率が高い傾向</td></tr>
<tr><td>総持寺・庄栄エリア</td><td>JR総持寺駅の開業で利便性向上。新設園もあり比較的入りやすい</td></tr>
<tr><td>彩都・山手台エリア</td><td>新興住宅地。若い世帯が多く園の需要が高い</td></tr>
<tr><td>南茨木・沢良宜エリア</td><td>モノレール沿線。園数は一定数あり比較的入りやすい傾向</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>JR茨木駅周辺は特に人気が高いため、徒歩圏内だけでなく自転車圏内の園も含めて広く検討しましょう。総持寺・南茨木方面も含めると選択肢が広がります。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 60,
  },
  {
    slug: "ikukyu-kyuufukin-genkakuka",
    citySlug: "ibaraki",
    title: "2025年4月から育休給付金延長の審査が厳格化　茨木市での影響",
    description:
      "2025年4月からの育児休業給付金の延長手続き厳格化について、茨木市の保活にどう影響するかを解説します。",
    image:
      "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=800&h=400&fit=crop",
    category: "最新情報",
    categoryColor: "blue",
    content: `<h2>制度改正の概要</h2>
<p>2025年4月から、育児休業給付金の支給対象期間延長の審査が厳格化されました。「速やかな職場復帰のために保育所の利用申込をした」と認められることが必要です。</p>

<h2>茨木市の保活への影響</h2>
<p>茨木市で通勤可能な範囲の園を複数希望し、真剣に入園を目指している方は影響を受けません。北摂エリアは大阪市内への通勤利便性が高く、共働き世帯が多い地域です。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>制度改正の詳細は<a href="https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/0000160564_00040.html" target="_blank" rel="noopener">厚生労働省「育児休業給付金の支給対象期間延長手続き」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 50,
  },
  {
    slug: "hitorioya-katen",
    citySlug: "ibaraki",
    title: "茨木市のひとり親加点　+5点の調整加算を解説",
    description:
      "茨木市でひとり親世帯に適用される+5点の調整加点について解説します。",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>ひとり親世帯の加点</h2>
<p>茨木市ではひとり親世帯の場合、調整点数として<span class="highlight">+5点</span>が加算されます。</p>

<h2>ひとり親世帯の合計点数イメージ</h2>
<div class="point-box">
<p><strong>ポイント</strong></p>
<p>フルタイム就労の場合、基本点数20点 ＋ ひとり親加点5点 ＝ <span class="highlight">合計25点</span>。両親フルタイム共働き世帯（40点）とは差がありますが、ひとり親は片方の保護者のみで計算されるため、加点の意味は大きいです。</p>
</div>

<h2>必要書類</h2>
<p>ひとり親であることを証明する書類（戸籍謄本、児童扶養手当証書の写しなど）が必要です。茨木市こども育成部に事前に確認しましょう。</p>`,
    publishedAt: "2026-04-07",
    popularity: 90,
  },
  {
    slug: "kyoudai-katen",
    citySlug: "ibaraki",
    title: "きょうだい加点を活用　茨木市のきょうだい在園+3点を解説",
    description:
      "茨木市できょうだいが在園中の場合の加点（+2〜+3点）について、条件と活用法を解説します。",
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>きょうだい在園の加点</h2>
<p>茨木市ではきょうだいが認可保育施設に在園している場合、調整点数が加算されます。</p>

<table>
<tr><th>条件</th><th>加点</th></tr>
<tr><td>きょうだいが在園中</td><td><span class="highlight">+3</span></td></tr>
<tr><td>きょうだいと同時に申し込む（双子など）</td><td><span class="highlight">+2</span></td></tr>
</table>

<h2>加点を活用するポイント</h2>
<p>きょうだいが在園している園を希望することで、送り迎えの負担も軽減できます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>フルタイム共働き40点＋きょうだい加点3点＝43点。さらに認可外利用+3点があれば46点と非常に有利です。茨木市は40点満点の自治体なので、調整加点の1点1点が大きな意味を持ちます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 50,
  },
];

registerArticles(articles);
