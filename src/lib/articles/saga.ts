import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  // ========== 保活の基本 ==========
  {
    slug: "hokatsu-schedule",
    citySlug: "saga",
    title: "佐賀市の保活スケジュール　令和8年度4月入園の流れ",
    description:
      "佐賀市の令和8年度（2026年度）4月入園の申込時期・書類準備・結果通知の時期をまとめました。初めての保活でも迷わないスケジュールガイドです。",
    image:
      "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>令和8年度（2026年度）4月入園のスケジュール</h2>
<p>佐賀市の4月入所の申込受付は<strong>11月〜12月</strong>に行われます。佐賀市こども未来部保育幼稚園課が窓口です。</p>

<h3>主なスケジュール</h3>
<table>
<tr><th>項目</th><th>日程（目安）</th></tr>
<tr><td>入園申込みのご案内公開</td><td>2025年10月頃</td></tr>
<tr><td>4月入所の申込受付</td><td>2025年11月上旬〜12月中旬</td></tr>
<tr><td>結果通知</td><td>2026年2月頃</td></tr>
<tr><td>入園前面談・健康診断</td><td>2026年3月</td></tr>
</table>

<h3>5月以降の途中入所</h3>
<p>年度途中の入所は随時申込みを受け付けています。毎月の締切日までに申込むと、翌月の利用調整の対象になります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>佐賀市の問い合わせ先はこども未来部保育幼稚園課（0952-40-7286）です。申込書類は市役所窓口のほか、佐賀市公式サイトからもダウンロードできます。</p>
</div>

<h2>いつから動き始めるべき？</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content"><strong>6月〜8月：情報収集</strong><p>佐賀市の「保育所等利用のご案内」を市のホームページで確認します。市内には認可保育園が約40か所あります。</p></div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content"><strong>8月〜10月：保育園見学</strong><p>気になる園に直接電話して見学予約。佐賀市はコンパクトな市街地のため、複数園を効率よく回れます。</p></div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content"><strong>10月〜11月：書類準備</strong><p>就労証明書などの必要書類を勤務先に依頼し、期限に余裕を持って準備します。</p></div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content"><strong>11月〜12月：申込</strong><p>必要書類を揃え、市役所窓口またはバルーンプラザ等の出張受付で期限内に提出します。</p></div>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新の申込方法は<a href="https://www.city.saga.lg.jp/main/808.html" target="_blank" rel="noopener">佐賀市公式サイト「保育所等の利用について」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 55,
  },

  // ========== 点数・選考 ==========
  {
    slug: "scoring-system-guide",
    citySlug: "saga",
    title: "佐賀市の入園点数のしくみ　基本指数と調整指数をやさしく解説",
    description:
      "佐賀市の保育園入園選考で使われる「基本指数」と「調整指数」の仕組みを、初めての方にもわかるように解説します。",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>点数制度の全体像</h2>
<p>佐賀市の認可保育所等は「先着順」ではなく、<strong>選考点数の高い世帯から優先</strong>して利用調整（選考）されます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>選考点数 ＝ 基本指数（保護者1）＋ 基本指数（保護者2）＋ 調整指数</p>
</div>

<h2>基本指数とは</h2>
<p>保護者それぞれの「保育を必要とする事由」を点数化したものです。1人あたり<span class="highlight">最大20点</span>（就労の場合）、保護者2人の合計で<span class="highlight">最大40点</span>です。</p>
<table>
<tr><th>就労状況</th><th>基本指数</th></tr>
<tr><td>月160時間以上</td><td>20</td></tr>
<tr><td>月140時間以上160時間未満</td><td>18</td></tr>
<tr><td>月120時間以上140時間未満</td><td>16</td></tr>
<tr><td>月90時間以上120時間未満</td><td>12</td></tr>
<tr><td>月64時間以上90時間未満</td><td>8</td></tr>
</table>
<p>就労以外にも、妊娠・産後、疾病・障害、介護・看護、就学、求職活動などの事由ごとに基本指数が定められています。</p>

<h2>調整指数とは</h2>
<p>世帯の状況に応じて加点・減点される点数です。佐賀市は加点の幅が比較的小さいのが特徴で、基本指数の差がそのまま結果に影響しやすい制度です。</p>
<table>
<tr><th>項目</th><th>点数</th></tr>
<tr><td>ひとり親世帯</td><td>+5</td></tr>
<tr><td>きょうだいが認可園に在園中</td><td>+3</td></tr>
<tr><td>認可外保育施設に在園中</td><td>+3</td></tr>
<tr><td>生活保護受給中</td><td>+3</td></tr>
<tr><td>きょうだい同時入園申込</td><td>+2</td></tr>
<tr><td>育児休業から復帰予定</td><td>+2</td></tr>
<tr><td>65歳未満の祖父母と同居</td><td>-3</td></tr>
<tr><td>転園希望</td><td>-5</td></tr>
<tr><td>市外からの申込</td><td>-10</td></tr>
</table>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳細な選考基準表は<a href="https://www.city.saga.lg.jp/main/808.html" target="_blank" rel="noopener">佐賀市公式サイト</a>で公開されている利用調整基準表に掲載されています。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 60,
  },
  {
    slug: "fulltime-40-line",
    citySlug: "saga",
    title: "フルタイム共働き40点は安心？佐賀市のボーダーライン事情",
    description:
      "佐賀市でフルタイム共働き（基本40点）なら入園できるのか？実際の競争状況と加点の重要性を解説します。",
    image:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>基本40点がスタートライン</h2>
<p>佐賀市では保護者がともに月160時間以上のフルタイム勤務であれば、各20点ずつで<span class="highlight">基本40点</span>になります。多くの申込者がこの40点ラインに並ぶため、人気園では40点だけでは安心できない場合があります。</p>

<h2>同点の場合はどうなる？</h2>
<p>基本指数が同じ場合、調整指数の加点で差がつきます。佐賀市は調整指数の幅が小さいため、ひとり親（+5）やきょうだい在園（+3）、認可外利用（+3）といった加点の有無が合否を分けることがあります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>佐賀市は人口約23.5万人の地方都市であり、都市部ほどの激しい競争はありません。ただし佐賀駅周辺や中心市街地の人気園では40点でも入れないケースがあります。調整加点を1つでも多く確保しておくと安心です。</p>
</div>

<h2>点数が同じ場合の優先順位</h2>
<p>佐賀市では合計点数が同じ場合、以下の優先順位で判定されます。</p>
<ul>
<li>基本指数が高い世帯が優先</li>
<li>保育の必要性がより高いと認められる世帯</li>
<li>佐賀市に長く居住している世帯</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>佐賀市の利用調整基準の詳細は<a href="https://www.city.saga.lg.jp/main/808.html" target="_blank" rel="noopener">佐賀市公式サイト</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 55,
  },
  {
    slug: "jitan-kinmu-scoring",
    citySlug: "saga",
    title: "時短勤務だと点数は下がる？佐賀市の基本指数と勤務時間の関係",
    description:
      "佐賀市で時短勤務の場合、基本指数がどう変わるかを解説。フルタイムとの差や点数を最大化するポイントも紹介します。",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>時短勤務の基本指数</h2>
<p>佐賀市では月あたりの就労時間に応じて基本指数が決まります。フルタイム（月160時間以上）なら20点ですが、時短勤務で就労時間が短くなると点数が下がります。</p>

<table>
<tr><th>就労時間</th><th>基本指数</th></tr>
<tr><td>月160時間以上</td><td><span class="highlight">20点</span></td></tr>
<tr><td>月140時間以上160時間未満</td><td><span class="highlight">18点</span></td></tr>
<tr><td>月120時間以上140時間未満</td><td><span class="highlight">16点</span></td></tr>
<tr><td>月90時間以上120時間未満</td><td><span class="highlight">12点</span></td></tr>
<tr><td>月64時間以上90時間未満</td><td><span class="highlight">8点</span></td></tr>
</table>

<h2>時短勤務で両親合計はどうなる？</h2>
<p>たとえば母が月120時間の時短勤務、父がフルタイムの場合：</p>
<div class="point-box">
<p><strong>ポイント</strong></p>
<p>父20点 ＋ 母16点 ＝ <span class="highlight">基本36点</span>。フルタイム共働きの40点と比べて4点低くなります。</p>
</div>

<h2>4点の差は大きい？</h2>
<p>佐賀市は20点満点制のため、フルタイムと時短の点数差は4点です。調整加点の幅が小さい佐賀市では、この4点の差を挽回するにはひとり親加点（+5）やきょうだい在園（+3）＋認可外利用（+3）の組み合わせが必要です。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>就労証明書に記載される勤務時間がそのまま点数に反映されます。育休復帰後に時短勤務を予定している場合は、復帰後の勤務条件で就労証明書を作成してもらいましょう。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 50,
  },

  // ========== 認可外 ==========
  {
    slug: "ninkagai-katen",
    citySlug: "saga",
    title: "認可外保育施設の利用で+3点　佐賀市の加点を得る条件",
    description:
      "佐賀市で認可外保育施設の利用実績により調整指数+3点を得るための条件と注意点を解説します。",
    image:
      "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&h=400&fit=crop",
    category: "認可外",
    categoryColor: "rose",
    content: `<h2>認可外利用で+3点の加点</h2>
<p>佐賀市では、認可外保育施設に在園している場合、認可園の利用調整で<span class="highlight">+3点</span>の調整加点が得られます。</p>

<h2>加点を得るための条件</h2>
<ul>
<li>認可外保育施設に<strong>在園している</strong>こと（在園証明書で確認）</li>
<li>保護者が就労中など保育の必要性が認められること</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>基本40点のフルタイム共働き世帯が認可外加点+3を得ると43点に。さらにきょうだい在園（+3）と合わせれば46点となり、競争で有利になります。</p>
</div>

<h2>佐賀市の認可外保育施設</h2>
<p>佐賀市内には複数の認可外保育施設があります。月額保育料は施設により異なりますが、月3万〜5万円程度が目安です。認可園の入園待ちの間に利用するケースが多く見られます。</p>

<h2>費用対効果を考える</h2>
<p>佐賀市は20点満点制のため、3点の加点でも合否を左右する可能性があります。特にフルタイム共働きの40点世帯が多い人気園では、この3点が決め手になることがあります。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>佐賀市内の認可外保育施設の一覧は<a href="https://www.city.saga.lg.jp/main/808.html" target="_blank" rel="noopener">佐賀市公式サイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 50,
  },

  // ========== 保育園選び ==========
  {
    slug: "area-guide",
    citySlug: "saga",
    title: "佐賀市のエリア別保育園事情　入りやすい地域は？",
    description:
      "佐賀市の地域ごとの保育園の特徴と入りやすさの傾向を解説。人気エリアと比較的入りやすいエリアを紹介します。",
    image:
      "https://images.unsplash.com/photo-1524813686514-a57563d77965?w=800&h=400&fit=crop",
    category: "保育園選び",
    categoryColor: "teal",
    content: `<h2>エリアによって事情が異なる</h2>
<p>佐賀市は佐賀県の県庁所在地で約23.5万人が暮らしています。市内には約40の認可保育施設がありますが、エリアによって競争状況は異なります。</p>

<h2>エリアごとの傾向</h2>
<table>
<tr><th>エリア</th><th>特徴</th></tr>
<tr><td>佐賀駅周辺・中心市街地</td><td>交通の便がよく共働き世帯に人気。0〜1歳児クラスは競争がやや激しい</td></tr>
<tr><td>兵庫・鍋島エリア</td><td>新興住宅地で若い世帯が多い。園の数も比較的多い</td></tr>
<tr><td>本庄・西与賀エリア</td><td>住宅地として落ち着いた地域。比較的入りやすい傾向</td></tr>
<tr><td>大和・富士・三瀬エリア</td><td>旧町村部で園数は少ないが、競争も緩やか</td></tr>
<tr><td>諸富・川副・東与賀・久保田エリア</td><td>南部エリアは園数が限られるが、定員に余裕がある園も多い</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>佐賀市は車社会のため、自宅から車で10〜15分圏内の園を幅広く検討するのがおすすめです。中心部にこだわらず周辺エリアも候補に入れると選択肢が広がります。</p>
</div>

<h2>空き状況を確認しよう</h2>
<p>佐賀市は保育幼稚園課に問い合わせることで、各園の空き状況を確認できます。途中入所を検討している方は定期的に確認しましょう。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>保育施設の一覧や空き状況は<a href="https://www.city.saga.lg.jp/main/808.html" target="_blank" rel="noopener">佐賀市公式サイト「保育所等の利用について」</a>または保育幼稚園課（0952-40-7286）で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 45,
  },

  // ========== 育休・復職 ==========
  {
    slug: "ikukyu-fukki-tips",
    citySlug: "saga",
    title: "佐賀市での育休復帰と保育園入園　+2点の加点を活用しよう",
    description:
      "佐賀市で育児休業から復帰しながら保育園に入園するための準備とスケジュール、+2点の育休復帰加点について解説します。",
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop",
    category: "育休・復職",
    categoryColor: "purple",
    content: `<h2>育休復帰と保活の両立</h2>
<p>育児休業から復帰するタイミングで保育園に入園させたい場合、申込時期と復帰時期のすり合わせが重要です。</p>

<h2>育休復帰で+2点の加点</h2>
<p>佐賀市では育児休業を取得し、入所月中に復帰する場合、調整指数として<span class="highlight">+2点</span>が加算されます。佐賀市の調整指数の中では標準的な加点です。</p>

<h2>復帰のスケジュール</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content"><strong>入園月の前月まで</strong><p>就労証明書に復帰予定日を記載してもらいます。</p></div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content"><strong>入園月（4月）</strong><p>慣らし保育が始まります。通常1〜2週間程度です。</p></div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content"><strong>入園月中</strong><p>復帰届を提出します。入所月中に復帰しないと加点が取り消される場合があります。</p></div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>育休復帰加点（+2）と認可外加点（+3）は、条件を満たせば併用できる場合があります。詳細は保育幼稚園課に確認してください。</p>
</div>

<h2>慣らし保育の期間を考慮する</h2>
<p>多くの園では入園後1〜2週間程度の慣らし保育期間があります。復帰日は入園から2週間後以降に設定するのがおすすめです。勤務先と相談して余裕のあるスケジュールを組みましょう。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>育休復帰に関する手続きの詳細は<a href="https://www.city.saga.lg.jp/main/808.html" target="_blank" rel="noopener">佐賀市公式サイト</a>または保育幼稚園課（0952-40-7286）にお問い合わせください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 45,
  },

  // ========== 制度解説 ==========
  {
    slug: "hitorioya-katen",
    citySlug: "saga",
    title: "佐賀市のひとり親加点　+5点の加算を解説",
    description:
      "佐賀市でひとり親世帯に適用される+5点の調整加点について、適用条件と手続きを詳しく解説します。",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>ひとり親世帯の加点とは</h2>
<p>佐賀市では、ひとり親世帯の場合、調整指数として<span class="highlight">+5点</span>が加算されます。佐賀市の調整指数の中では最も大きい加点です。</p>

<h2>適用条件</h2>
<ul>
<li>離婚・死別等によりひとり親であること</li>
<li>児童扶養手当受給者証、戸籍謄本等で確認できること</li>
</ul>

<h2>ひとり親世帯の合計点数イメージ</h2>
<p>ひとり親でフルタイム就労（月160時間以上）の場合：</p>
<div class="point-box">
<p><strong>ポイント</strong></p>
<p>基本指数20点 ＋ ひとり親加点5点 ＝ <span class="highlight">合計25点</span>。両親フルタイム共働き世帯の40点には及びませんが、ひとり親世帯の中では最も有利な点数です。</p>
</div>

<h2>ひとり親向けの支援制度</h2>
<p>佐賀市ではひとり親世帯向けにさまざまな支援制度があります。</p>
<ul>
<li>児童扶養手当</li>
<li>ひとり親家庭等医療費助成</li>
<li>保育料の軽減措置</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>ひとり親世帯の支援制度については<a href="https://www.city.saga.lg.jp/main/808.html" target="_blank" rel="noopener">佐賀市公式サイト</a>のこども・子育てページをご確認ください。不明な点は保育幼稚園課（0952-40-7286）にお問い合わせください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 40,
  },

  // ========== 同居減点 ==========
  {
    slug: "doukyo-gentem",
    citySlug: "saga",
    title: "祖父母と同居で-3点　佐賀市の同居減点と対策",
    description:
      "佐賀市では65歳未満の祖父母と同居していると-3点の減点があります。減点の仕組みと対策を解説します。",
    image:
      "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>同居減点とは</h2>
<p>佐賀市では、65歳未満の祖父母と同居している場合、調整指数として<span class="highlight">-3点</span>の減点が適用されます。「祖父母が保育を代わりにできるのでは」という考え方に基づく制度です。</p>

<h2>減点が適用される条件</h2>
<ul>
<li>同一世帯に65歳未満の祖父母が同居していること</li>
<li>住民票で同一世帯であることが確認できること</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>佐賀市は地方都市のため、二世帯住宅や祖父母との同居が多い地域です。同居減点は佐賀市の保活において無視できない要素です。</p>
</div>

<h2>フルタイム共働きの場合の影響</h2>
<p>両親フルタイム（40点）＋ 同居減点（-3点）＝ <span class="highlight">37点</span>。同居していない40点の世帯と比べて3点のハンデがあります。きょうだい在園（+3）や認可外利用（+3）で挽回する必要があります。</p>

<h2>祖父母が65歳以上の場合</h2>
<p>祖父母が65歳以上であれば、同居していても減点は適用されません。祖父母の年齢が減点の分かれ目になります。</p>

<h2>同居の定義に注意</h2>
<p>同じ敷地内の別棟（二世帯住宅）でも、住民票が同一世帯であれば同居とみなされる場合があります。世帯分離をしている場合は同居に該当しないこともあるため、詳細は保育幼稚園課に確認してください。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>同居減点の詳細な適用条件は<a href="https://www.city.saga.lg.jp/main/808.html" target="_blank" rel="noopener">佐賀市公式サイト</a>の利用調整基準表をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 35,
  },

  // ========== 落ちたとき ==========
  {
    slug: "ochita-toki-sentakushi",
    citySlug: "saga",
    title: "佐賀市で保育園に落ちたときの選択肢　次にやるべきこと",
    description:
      "佐賀市の選考で保留になった場合の対処法を解説。途中入園・認可外・育休延長など、取れる選択肢をまとめました。",
    image:
      "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>保留通知が届いたら</h2>
<p>4月入所の選考で保留になっても、まだ選択肢はあります。落ち着いて次のステップを検討しましょう。</p>

<h2>選択肢1：途中入園（5月以降）を申し込む</h2>
<p>年度途中の入所申込は随時受け付けています。転勤や退園による空きが出ることがあるため、粘り強く申し込み続けることが大切です。佐賀市では年度途中でも空きが出やすい傾向があります。</p>

<h2>選択肢2：認可外保育施設を利用する</h2>
<p>認可外保育施設に預けて復職し、次年度の認可園申込では認可外利用の加点（+3点）を得る戦略があります。</p>

<h2>選択肢3：育児休業を延長する</h2>
<p>保留通知書があれば、育児休業を子どもが2歳になるまで延長でき、育児休業給付金も継続して受給できます。</p>

<div class="step">
<div class="step-num">1</div>
<div class="step-content"><strong>保留通知書を保管</strong><p>育休延長の手続きに必要です。勤務先に速やかに提出しましょう。</p></div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content"><strong>途中入所の申込を継続</strong><p>保留中でも毎月の利用調整の対象になります。改めて申込む必要はありませんが、希望園の変更がある場合は届出が必要です。</p></div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content"><strong>希望園を見直す</strong><p>人気園に絞りすぎていた場合は、郊外エリアや定員に余裕のある園も候補に加えましょう。</p></div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>佐賀市は都市部に比べて待機児童が少ない傾向にあります。希望園を広げれば途中入園で入れるケースも多いため、諦めずに情報収集を続けましょう。保育幼稚園課（0952-40-7286）に空き状況を問い合わせるのも有効です。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 30,
  },
];

registerArticles(articles);
