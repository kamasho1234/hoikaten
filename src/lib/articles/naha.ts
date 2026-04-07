import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  // ========== 保活の基本 ==========
  {
    slug: "hokatsu-schedule",
    citySlug: "naha",
    title: "那覇市の保活スケジュール　令和8年度4月入園の流れ",
    description:
      "那覇市の令和8年度（2026年度）4月入園の申込時期・書類準備・結果通知の時期をまとめました。初めての保活でも迷わないスケジュールガイドです。",
    image:
      "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>令和8年度（2026年度）4月入園のスケジュール</h2>
<p>那覇市の4月入所の申込受付は<strong>12月</strong>に行われます。オンライン申請にも対応しているため、窓口に行かなくても手続きが可能です。</p>

<h3>主なスケジュール</h3>
<table>
<tr><th>項目</th><th>日程（目安）</th></tr>
<tr><td>入園申込みのご案内公開</td><td>2025年10月〜11月頃</td></tr>
<tr><td>特別支援保育の面談申込</td><td>2025年10月下旬〜11月下旬</td></tr>
<tr><td>4月入所の申込受付</td><td>2025年12月1日〜12月28日</td></tr>
<tr><td>結果通知</td><td>2026年2月頃</td></tr>
</table>

<h3>5月以降の途中入所</h3>
<p>年度途中の入所は随時申込みを受け付けています。毎月の締切日までに申込むと、翌月の利用調整の対象になります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>那覇市ではオンライン申請が可能です。窓口での提出も引き続き受け付けています。問い合わせ先はこどもみらい課（098-861-6903）です。</p>
</div>

<h2>いつから動き始めるべき？</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content"><strong>6月〜8月：情報収集</strong><p>那覇市の「認可保育園・認定こども園入園申込みのご案内」を市のホームページで確認します。</p></div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content"><strong>8月〜10月：保育園見学</strong><p>気になる園に直接電話して見学予約。那覇市内は約90園の認可保育施設があり、選択肢が豊富です。</p></div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content"><strong>10月〜11月：書類準備</strong><p>就労証明書などの必要書類を勤務先に依頼し、期限に余裕を持って準備します。</p></div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content"><strong>12月：申込</strong><p>必要書類を揃え、オンラインまたは窓口で期限内に提出します。</p></div>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新の申込方法は<a href="https://www.city.naha.okinawa.jp/child/hoikuen/ninteikodomoen/R6hoikuen_moushikomi.html" target="_blank" rel="noopener">那覇市公式サイト「認可保育園・認定こども園入園申込み」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-04",
    popularity: 55,
  },

  // ========== 点数・選考 ==========
  {
    slug: "scoring-system-guide",
    citySlug: "naha",
    title: "那覇市の入園点数のしくみ　基本指数と調整指数をやさしく解説",
    description:
      "那覇市の保育園入園選考で使われる「基本指数」と「調整指数」の仕組みを、初めての方にもわかるように解説します。",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>点数制度の全体像</h2>
<p>那覇市の認可保育所等は「先着順」ではなく、<strong>選考点数の高い世帯から優先</strong>して利用調整（選考）されます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>選考点数 ＝ 基本指数（保護者1）＋ 基本指数（保護者2）＋ 調整指数</p>
</div>

<h2>基本指数とは</h2>
<p>保護者それぞれの「保育を必要とする事由」を点数化したものです。1人あたり<span class="highlight">最大30点</span>（就労の場合）、保護者2人の合計で<span class="highlight">最大60点</span>です。</p>
<table>
<tr><th>就労状況</th><th>基本指数</th></tr>
<tr><td>月160時間以上</td><td>30</td></tr>
<tr><td>月140時間以上160時間未満</td><td>26</td></tr>
<tr><td>月120時間以上140時間未満</td><td>22</td></tr>
<tr><td>月90時間以上120時間未満</td><td>19</td></tr>
<tr><td>月64時間以上90時間未満</td><td>15</td></tr>
</table>
<p>就労以外にも、妊娠・産後、疾病・障害、介護・看護、就学、求職活動などの事由ごとに基本指数が定められています。</p>

<h2>調整指数とは</h2>
<p>世帯の状況に応じて加点・減点される点数です。那覇市は調整指数の種類が多いのが特徴です。</p>
<table>
<tr><th>項目</th><th>点数</th></tr>
<tr><td>ひとり親世帯</td><td>+50</td></tr>
<tr><td>保育士等として認可園で就労中</td><td>+50</td></tr>
<tr><td>認可外保育施設に在園中</td><td>+11</td></tr>
<tr><td>育児休業からの復帰予定</td><td>+9</td></tr>
<tr><td>きょうだい在園中の園を第1希望</td><td>+7</td></tr>
<tr><td>きょうだい同時入所申込</td><td>+6</td></tr>
<tr><td>生活保護受給中</td><td>+3</td></tr>
<tr><td>保育料滞納あり</td><td>-20</td></tr>
</table>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳細な選考基準表は<a href="https://www.city.naha.okinawa.jp/child/hoikuen/ninteikodomoen/R6hoikuen_moushikomi.html" target="_blank" rel="noopener">那覇市公式サイト</a>で公開されている「選考基準表」PDFに掲載されています。</p>
</div>`,
    publishedAt: "2026-04-04",
    popularity: 60,
  },
  {
    slug: "fulltime-60-line",
    citySlug: "naha",
    title: "フルタイム共働き60点は安心？那覇市のボーダーライン事情",
    description:
      "那覇市でフルタイム共働き（基本60点）なら入園できるのか？実際の競争状況と加点の重要性を解説します。",
    image:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>基本60点がスタートライン</h2>
<p>那覇市では保護者がともに月160時間以上のフルタイム勤務であれば、各30点ずつで<span class="highlight">基本60点</span>になります。多くの申込者がこの60点ラインに並ぶため、人気園では60点だけでは安心できません。</p>

<h2>同点の場合はどうなる？</h2>
<p>基本指数が同じ場合、調整指数の加点で差がつきます。那覇市は調整指数の幅が大きいのが特徴で、認可外保育施設の利用（+11点）や育休復帰（+9点）、きょうだい加点（+7点）で明確な差がつきます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>那覇市は沖縄県の県庁所在地で人口が集中しており、特に新都心地区・おもろまち周辺や小禄地区では競争が激しくなります。認可外加点（+11）や育休復帰加点（+9）が合否を分けることが多いです。</p>
</div>

<h2>ボーダー点を確認しよう</h2>
<p>那覇市は園ごとのボーダー点（最低合格点数）を公開しています。公式サイトからPDFでダウンロードできるため、希望する園のボーダー点を事前に確認しておきましょう。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>ボーダー点は年度やクラスの年齢によって変動します。過去のボーダー点はあくまで参考値として活用してください。</p>
</div>`,
    publishedAt: "2026-04-04",
    popularity: 55,
  },
  {
    slug: "jitan-kinmu-scoring",
    citySlug: "naha",
    title: "時短勤務だと点数は下がる？那覇市の基本指数と勤務時間の関係",
    description:
      "那覇市で時短勤務の場合、基本指数がどう変わるかを解説。フルタイムとの差や点数を最大化するポイントも紹介します。",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>時短勤務の基本指数</h2>
<p>那覇市では月あたりの就労時間に応じて基本指数が決まります。フルタイム（月160時間以上）なら30点ですが、時短勤務で就労時間が短くなると点数が下がります。</p>

<table>
<tr><th>就労時間</th><th>基本指数</th></tr>
<tr><td>月160時間以上</td><td><span class="highlight">30点</span></td></tr>
<tr><td>月140時間以上160時間未満</td><td><span class="highlight">26点</span></td></tr>
<tr><td>月120時間以上140時間未満</td><td><span class="highlight">22点</span></td></tr>
<tr><td>月90時間以上120時間未満</td><td><span class="highlight">19点</span></td></tr>
<tr><td>月64時間以上90時間未満</td><td><span class="highlight">15点</span></td></tr>
</table>

<h2>時短勤務で両親合計はどうなる？</h2>
<p>たとえば母が月120時間の時短勤務、父がフルタイムの場合：</p>
<div class="point-box">
<p><strong>ポイント</strong></p>
<p>父30点 ＋ 母22点 ＝ <span class="highlight">基本52点</span>。フルタイム共働きの60点と比べて8点低くなります。</p>
</div>

<h2>8点の差は大きい？</h2>
<p>那覇市は30点満点制のため、フルタイムと時短の点数差が大きくなりやすいです。人気園では基本60点の世帯が多いため、52点では不利になる可能性があります。調整加点（認可外+11点、育休復帰+9点など）で挽回できるかどうかがポイントです。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>就労証明書に記載される勤務時間がそのまま点数に反映されます。育休復帰後に時短勤務を予定している場合は、復帰後の勤務条件で就労証明書を作成してもらいましょう。</p>
</div>`,
    publishedAt: "2026-04-04",
    popularity: 50,
  },

  // ========== 認可外 ==========
  {
    slug: "ninkagai-katen",
    citySlug: "naha",
    title: "認可外保育施設の利用で+11点　那覇市の加点を得る条件",
    description:
      "那覇市で認可外保育施設の利用実績により調整指数+11点を得るための条件と注意点を解説します。",
    image:
      "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&h=400&fit=crop",
    category: "認可外",
    categoryColor: "rose",
    content: `<h2>認可外利用で+11点の加点</h2>
<p>那覇市では、認可外保育施設に在園している場合、認可園の利用調整で<span class="highlight">+11点</span>の調整加点が得られます。</p>

<h2>加点を得るための条件</h2>
<ul>
<li>認可外保育施設に<strong>在園している</strong>こと（在園証明書で確認）</li>
<li>保護者両方が申込時点で<strong>就労中、病気・障害、看護介護、就学中</strong>のいずれかであること</li>
<li><strong>育児休業から復帰予定の場合は適用されない</strong></li>
</ul>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>認可外加点で内定した場合、その後の転所申込では認可外加点は認められません。あくまで初回の入所選考のみに適用される加点です。</p>
</div>

<h2>費用対効果を考える</h2>
<p>那覇市の認可外保育施設の月額保育料は施設により異なりますが、月3万〜6万円程度が目安です。30点満点制の那覇市では11点の加点は非常に大きな差になります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>基本60点のフルタイム共働き世帯が認可外加点+11を得ると71点に。きょうだい加点（+7）と合わせれば78点となり、かなり有利になります。</p>
</div>`,
    publishedAt: "2026-04-04",
    popularity: 50,
  },

  // ========== 保育園選び ==========
  {
    slug: "area-guide",
    citySlug: "naha",
    title: "那覇市のエリア別保育園事情　入りやすい地域は？",
    description:
      "那覇市の地域ごとの保育園の特徴と入りやすさの傾向を解説。人気エリアと比較的入りやすいエリアを紹介します。",
    image:
      "https://images.unsplash.com/photo-1524813686514-a57563d77965?w=800&h=400&fit=crop",
    category: "保育園選び",
    categoryColor: "teal",
    content: `<h2>エリアによって事情が異なる</h2>
<p>那覇市は沖縄県の県庁所在地で約32万人が暮らしています。市内には約90の認可保育施設がありますが、エリアによって競争状況は大きく異なります。</p>

<h2>エリアごとの傾向</h2>
<table>
<tr><th>エリア</th><th>特徴</th></tr>
<tr><td>新都心・おもろまち</td><td>マンション開発が進み若い世帯が多い。0〜1歳児クラスは競争が激しい</td></tr>
<tr><td>小禄・金城</td><td>モノレール沿線で利便性が高く人気。園の数は比較的多い</td></tr>
<tr><td>首里</td><td>住宅地として歴史があり園数も多い。やや落ち着いた競争状況</td></tr>
<tr><td>真嘉比・古島</td><td>新都心に近く需要が高いが、新設園も増えている</td></tr>
<tr><td>安謝・天久</td><td>商業地域に近いが住宅も多い。比較的入りやすい園もある</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>那覇市は沖縄都市モノレール（ゆいレール）沿線の利便性が高いエリアに人気が集中します。通勤経路上の園や、モノレール駅から少し離れた園も候補に入れると選択肢が広がります。</p>
</div>

<h2>空き状況を確認しよう</h2>
<p>那覇市は公式サイトで認可保育施設の空き状況一覧を公開しています。定期的に更新されるため、途中入所を検討している方は毎月チェックしましょう。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新の空き状況は<a href="https://www.city.naha.okinawa.jp/child/hoikuen/ninteikodomoen/nyuusyoakijyoukyou.html" target="_blank" rel="noopener">那覇市公式サイト「保育所等の空き状況」</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-04",
    popularity: 45,
  },

  // ========== 育休・復職 ==========
  {
    slug: "ikukyu-fukki-tips",
    citySlug: "naha",
    title: "那覇市での育休復帰と保育園入園　+9点の加点を活用しよう",
    description:
      "那覇市で育児休業から復帰しながら保育園に入園するための準備とスケジュール、+9点の育休復帰加点について解説します。",
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop",
    category: "育休・復職",
    categoryColor: "purple",
    content: `<h2>育休復帰と保活の両立</h2>
<p>育児休業から復帰するタイミングで保育園に入園させたい場合、申込時期と復帰時期のすり合わせが重要です。</p>

<h2>育休復帰で+9点の加点</h2>
<p>那覇市では育児休業を取得し、入所した翌月1日までに復帰する場合、調整指数として<span class="highlight">+9点</span>が加算されます。30点満点制の那覇市では大きな加点です。</p>

<h2>注意すべきルール</h2>
<ul>
<li>父母ともに育休取得している場合は、<strong>どちらか一方のみ</strong>適用</li>
<li>入所した翌月1日までに復帰すること（翌月1日が休みなら翌営業日）</li>
<li>育休復帰加点で内定した場合、<strong>その後の転所申込では育休復帰加点は認められない</strong></li>
</ul>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>「希望する園に入所できない場合は育休延長も許容できる」を選択すると、<strong>-500点</strong>という大幅な減点が適用されます。本気で入園を希望する場合は絶対に選択しないでください。</p>
</div>

<h2>慣らし保育の期間を考慮する</h2>
<p>多くの園では入園後1〜2週間程度の慣らし保育期間があります。復帰日は入園から2週間後以降に設定するのがおすすめです。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>育休復帰加点（+9）と認可外加点（+11）は併用できません。育休復帰予定の場合は認可外加点が適用外になるため、どちらが有利かを事前にシミュレーションしましょう。</p>
</div>`,
    publishedAt: "2026-04-04",
    popularity: 45,
  },

  // ========== 制度解説 ==========
  {
    slug: "hitorioya-katen",
    citySlug: "naha",
    title: "那覇市のひとり親加点　+50点の大きな加算を解説",
    description:
      "那覇市でひとり親世帯に適用される+50点の調整加点について、適用条件と手続きを詳しく解説します。",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>ひとり親世帯の加点とは</h2>
<p>那覇市では、ひとり親世帯の場合、調整指数として<span class="highlight">+50点</span>が加算されます。離婚調停中など「ひとり親とみなす場合」は+35点です。いずれも非常に大きな加点です。</p>

<h2>適用条件</h2>
<ul>
<li>離婚・死別等によりひとり親であること</li>
<li>児童扶養手当受給者証、戸籍謄本等で確認できること</li>
</ul>

<h2>ひとり親世帯の合計点数イメージ</h2>
<p>ひとり親でフルタイム就労（月160時間以上）の場合：</p>
<div class="point-box">
<p><strong>ポイント</strong></p>
<p>基本指数30点 ＋ ひとり親加点50点 ＝ <span class="highlight">合計80点</span>。両親フルタイム共働き世帯の60点を大きく上回ります。</p>
</div>

<h2>離婚調停中の場合</h2>
<p>正式に離婚が成立していなくても、離婚調停中で別居継続中と確認できれば「ひとり親とみなす場合」として+35点が適用されます。離婚調停が不調に終わっている場合でも、別居継続中と確認できれば適用されます。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>事実婚の場合はひとり親として認められない場合があります。不明な点は事前にこどもみらい課（098-861-6903）に確認してください。</p>
</div>`,
    publishedAt: "2026-04-04",
    popularity: 40,
  },

  // ========== 保育士加点 ==========
  {
    slug: "hoikushi-katen",
    citySlug: "naha",
    title: "保育士が自分の子を預けたい！那覇市の保育士加点+50点とは",
    description:
      "那覇市では認可保育所で働く保育士に+50点の大きな調整加点があります。対象条件と子育て支援員の加点も解説します。",
    image:
      "https://images.unsplash.com/photo-1587654780292-39c13ac048b7?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>保育士等への優遇加点</h2>
<p>那覇市では保育人材の確保を目的に、認可保育所・こども園で就労中（または採用予定）の保育士等に<span class="highlight">+50点</span>の調整加点を設けています。これはひとり親加点と並ぶ最大級の加点です。</p>

<h2>対象者と加点</h2>
<table>
<tr><th>区分</th><th>加点</th></tr>
<tr><td>保育士等（保育士証・免許状で確認）</td><td>+50</td></tr>
<tr><td>子育て支援員（修了証書で確認）</td><td>+20</td></tr>
</table>

<h2>対象となる「保育士等」の範囲</h2>
<ul>
<li>保育士</li>
<li>特例により保育士とみなす幼稚園教諭・小学校教諭・養護教諭</li>
<li>看護師・保健師</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>認可外保育施設での勤務は対象外です。あくまで市内または市外の認可保育所・こども園での勤務が条件です。就労証明書に加え、保育士証または免許状での確認が必要です。</p>
</div>

<h2>保育士フルタイムの合計点数イメージ</h2>
<p>保育士がフルタイム共働きの場合：</p>
<p>基本60点 ＋ 保育士加点50点 ＝ <span class="highlight">合計110点</span>。非常に高い点数となり、ほぼ確実に入園できます。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>那覇市の選考基準表の調整指数に詳細が記載されています。<a href="https://www.city.naha.okinawa.jp/child/hoikuen/ninteikodomoen/R6hoikuen_moushikomi.html" target="_blank" rel="noopener">那覇市公式サイト</a>からPDFをダウンロードしてご確認ください。</p>
</div>`,
    publishedAt: "2026-04-04",
    popularity: 35,
  },

  // ========== 落ちたとき ==========
  {
    slug: "ochita-toki-sentakushi",
    citySlug: "naha",
    title: "那覇市で保育園に落ちたときの選択肢　次にやるべきこと",
    description:
      "那覇市の選考で保留になった場合の対処法を解説。途中入園・認可外・育休延長など、取れる選択肢をまとめました。",
    image:
      "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>保留通知が届いたら</h2>
<p>4月入所の選考で保留になっても、まだ選択肢はあります。落ち着いて次のステップを検討しましょう。</p>

<h2>選択肢1：途中入園（5月以降）を申し込む</h2>
<p>年度途中の入所申込は随時受け付けています。転勤や退園による空きが出ることがあるため、粘り強く申し込み続けることが大切です。那覇市は公式サイトで空き状況を公開しているため、定期的にチェックしましょう。</p>

<h2>選択肢2：認可外保育施設を利用する</h2>
<p>認可外保育施設に預けて復職し、次年度の認可園申込では認可外利用の加点（+11点）を得る戦略があります。30点満点の那覇市では11点の加点は非常に大きいです。</p>

<h2>選択肢3：育児休業を延長する</h2>
<p>保留通知書があれば、育児休業を子どもが2歳になるまで延長でき、育児休業給付金も継続して受給できます。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>2025年4月から育児休業給付金の延長審査が厳格化されています。那覇市の申込でも「育休延長も許容できる」にチェックすると-500点になるため、本気で入園を希望する場合は選択しないでください。</p>
</div>

<h2>選択肢4：希望園を見直す</h2>
<p>人気園に絞りすぎていた場合は、郊外エリアや新設園を候補に加えることで入園の可能性が広がります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>保留になっても諦めないことが大切です。那覇市は年度途中の空きが出ることもあるため、途中入所で入園できるケースもあります。空き状況は毎月更新されるため、こまめにチェックしましょう。</p>
</div>`,
    publishedAt: "2026-04-04",
    popularity: 30,
  },
];

registerArticles(articles);
