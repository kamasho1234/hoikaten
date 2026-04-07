import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  {
    slug: "hokatsu-schedule",
    citySlug: "minoh",
    title: "箕面市の保活スケジュール完全ガイド　申込から内定まで",
    description:
      "箕面市の認可保育園の申込時期・選考の流れをまとめました。令和8年度4月入園のスケジュールを解説します。",
    image: "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>箕面市の4月入園スケジュール</h2>
<p>箕面市の認可保育園は毎年秋に翌年度4月入園の一斉申込を受付けます。箕面市子ども未来創造局が窓口となっています。</p>

<h3>保活の全体スケジュール</h3>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>4月〜6月：情報収集</strong>
<p>市のホームページで保育園一覧や空き状況を確認します。箕面市には認可保育園が約25か所あり、北大阪急行延伸で箕面萱野駅・箕面船場阪大前駅周辺に新設園も増えています。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>6月〜9月：保育園見学</strong>
<p>気になる園に連絡して見学を予約しましょう。箕面市は北大阪急行・阪急箕面線沿線に保育施設が集中しています。通勤ルート上の園も候補にしましょう。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>9月〜10月：利用案内の入手・書類準備</strong>
<p>勤務（内定）証明書などの必要書類を準備します。箕面市子ども未来創造局の窓口またはホームページで書類を入手できます。</p>
</div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content">
<strong>10月〜11月：申込書類の提出</strong>
<p>子ども未来創造局の窓口または郵送で提出します。</p>
</div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>箕面市は基本指数が父母各最大20点（合計40点満点）の制度です。フルタイム共働きで40点が基準ラインになります。北大阪急行延伸で沿線人口が増加しているため、早めの準備が重要です。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳しくは<a href="https://www.city.minoh.lg.jp/kodomo/hoiku/index.html" target="_blank" rel="noopener">箕面市公式サイト</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 55,
  },
  {
    slug: "scoring-system-guide",
    citySlug: "minoh",
    title: "箕面市の点数の仕組みと計算方法　基本指数と調整指数を解説",
    description:
      "箕面市の保育園入園選考で使われる基本指数と調整指数の仕組みを解説します。",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>箕面市の利用調整指数とは</h2>
<p>箕面市の認可保育園の入園選考は「父の基本指数 + 母の基本指数 + 調整指数」の合計で行われます。基本指数は父母それぞれ最大20点で、合計40点が満点です。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>利用調整指数 = 基本指数（保護者1 + 保護者2）+ 調整指数</p>
</div>

<h2>基本指数（父母各最大20点、合計40点）</h2>
<p>就労の場合、月160時間以上で満点の<span class="highlight">20点</span>です。就労時間に応じて段階的に点数が下がります。</p>

<table>
<tr><th>保育の必要性</th><th>状況</th><th>基本指数</th></tr>
<tr><td>就労</td><td>月160時間以上</td><td>20</td></tr>
<tr><td>就労</td><td>月140〜160時間</td><td>18</td></tr>
<tr><td>就労</td><td>月120〜140時間</td><td>16</td></tr>
<tr><td>就労</td><td>月80〜120時間</td><td>12</td></tr>
<tr><td>就労</td><td>月64〜80時間</td><td>8</td></tr>
<tr><td>疾病</td><td>常時安静・入院</td><td>20</td></tr>
<tr><td>障害</td><td>重度</td><td>20</td></tr>
<tr><td>就学</td><td>週30時間以上</td><td>16</td></tr>
<tr><td>出産</td><td>出産前後各8週間</td><td>12</td></tr>
<tr><td>求職活動</td><td>求職中</td><td>6</td></tr>
</table>

<h2>調整指数の代表例</h2>
<ul>
<li>ひとり親世帯：<span class="highlight">+5点</span></li>
<li>きょうだい在園：<span class="highlight">+3点</span></li>
<li>認可外保育施設利用：<span class="highlight">+3点</span></li>
<li>生活保護世帯：<span class="highlight">+3点</span></li>
<li>きょうだい同時申込：<span class="highlight">+2点</span></li>
<li>育休復帰：<span class="highlight">+2点</span></li>
<li>同居祖父母（証明なし）：<span class="highlight">-3点</span></li>
<li>転園：<span class="highlight">-5点</span></li>
<li>市外在住：<span class="highlight">-10点</span></li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>全項目は<a href="https://www.city.minoh.lg.jp/kodomo/hoiku/index.html" target="_blank" rel="noopener">箕面市公式サイト「保育施設等の利用申込」</a>の利用調整基準表で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 60,
  },
  {
    slug: "score-up-tips",
    citySlug: "minoh",
    title: "箕面市の加点のコツ　点数アップ戦略と調整指数の活用法",
    description:
      "箕面市の保育園入園選考で調整指数の加点を最大限に活用する方法を解説します。",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>基本指数40点は出発点</h2>
<p>箕面市ではフルタイム共働き世帯は基本指数<span class="highlight">40点</span>で横並びです。差がつくのは調整指数です。</p>

<h2>加点チェックリスト</h2>
<table>
<tr><th>項目</th><th>点数</th><th>条件</th></tr>
<tr><td>ひとり親世帯</td><td>+5</td><td>ひとり親家庭及びそれに準ずる世帯</td></tr>
<tr><td>きょうだい在園</td><td>+3</td><td>きょうだいが箕面市の保育所等に在園中</td></tr>
<tr><td>認可外利用</td><td>+3</td><td>認可外保育施設に月64時間以上預けている</td></tr>
<tr><td>生活保護</td><td>+3</td><td>生活保護受給世帯</td></tr>
<tr><td>きょうだい同時申込</td><td>+2</td><td>同一世帯から2人以上同時に申込</td></tr>
<tr><td>育休復帰</td><td>+2</td><td>育児休業から入園月に復帰</td></tr>
</table>

<h3>現実的に狙える加点</h3>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>認可外保育施設の利用（+3点）</strong>
<p>4月入園に落ちた場合、認可外保育施設に預けながら翌年度に再申込すると+3点の加点が得られます。箕面市では大きな加点です。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>きょうだい在園（+3点）</strong>
<p>上の子が通っている園を希望すれば+3点の加点がもらえます。同じ園にきょうだいを通わせたい場合に有利です。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>育休復帰（+2点）</strong>
<p>育児休業を取得中で入園月に復職する場合に+2点が加算されます。復帰証明を忘れずに提出しましょう。</p>
</div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>箕面市は北大阪急行延伸（箕面萱野駅・箕面船場阪大前駅開業）で沿線に新しいマンションが増え、保育需要が急増しています。40点で横並びの場合、認可外+3点やきょうだい+3点が当落を分けます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 58,
  },
  {
    slug: "kitaosaka-kyuko-area",
    citySlug: "minoh",
    title: "北大阪急行延伸で変わる箕面市の保活事情　沿線エリア解説",
    description:
      "北大阪急行延伸で注目の箕面萱野駅・箕面船場阪大前駅周辺の保育園事情を解説します。",
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&h=400&fit=crop",
    category: "エリア情報",
    categoryColor: "blue",
    content: `<h2>北大阪急行延伸の影響</h2>
<p>2024年3月に開業した北大阪急行の延伸区間（千里中央〜箕面萱野）により、箕面市の交通利便性が大幅に向上しました。箕面萱野駅と箕面船場阪大前駅の2駅が新設され、大阪市内へのアクセスが便利になりました。</p>

<h3>エリア別の保育園事情</h3>
<table>
<tr><th>エリア</th><th>特徴</th><th>競争率</th></tr>
<tr><td>箕面萱野駅周辺</td><td>大型商業施設に近く新築マンション増加</td><td>高い</td></tr>
<tr><td>箕面船場阪大前駅周辺</td><td>大阪大学箕面キャンパス移転で開発進む</td><td>上昇中</td></tr>
<tr><td>阪急箕面駅周辺</td><td>古くからの住宅街、園の数が多い</td><td>やや高い</td></tr>
<tr><td>牧落・桜井エリア</td><td>閑静な住宅街、小規模園が点在</td><td>普通</td></tr>
<tr><td>彩都・粟生エリア</td><td>ニュータウン、比較的新しい園が多い</td><td>普通</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>北大阪急行沿線は子育て世帯の転入が続いており、0〜2歳児クラスは特に競争率が高くなっています。沿線エリアで保活する場合は、調整指数の加点を確実に押さえることが重要です。駅から少し離れた園も候補に入れると選択肢が広がります。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>保育施設の一覧と空き状況は<a href="https://www.city.minoh.lg.jp/kodomo/hoiku/index.html" target="_blank" rel="noopener">箕面市公式サイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 52,
  },
  {
    slug: "nursery-visit-checklist",
    citySlug: "minoh",
    title: "箕面市の保育園見学チェックリスト　見るべき10のポイント",
    description:
      "箕面市の保育園見学で確認すべきポイントをチェックリスト形式でまとめました。",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>見学前に知っておくこと</h2>
<p>箕面市には認可保育園が約25か所あります。見学は6月〜9月に集中するため、早めに予約しましょう。箕面市は自然豊かな環境で、箕面公園や箕面大滝に近い園では自然体験を取り入れた保育をしているところもあります。</p>

<h3>見学チェックリスト</h3>
<table>
<tr><th>チェック項目</th><th>確認ポイント</th></tr>
<tr><td>園庭の広さ</td><td>外遊びの頻度と場所</td></tr>
<tr><td>給食の内容</td><td>自園調理かどうか、アレルギー対応</td></tr>
<tr><td>保育士の雰囲気</td><td>子どもへの声かけの仕方</td></tr>
<tr><td>お迎え時間</td><td>延長保育の有無と時間</td></tr>
<tr><td>持ち物</td><td>おむつ・布団の持参が必要か</td></tr>
<tr><td>登園方法</td><td>自転車・ベビーカー置き場の有無</td></tr>
<tr><td>行事の頻度</td><td>平日の行事参加が必要か</td></tr>
<tr><td>慣らし保育</td><td>期間と進め方</td></tr>
<tr><td>病児対応</td><td>発熱時のお迎え基準</td></tr>
<tr><td>安全対策</td><td>門の施錠・防犯カメラの有無</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>箕面市は坂が多い地域もあるため、自転車での送迎を考えている場合は実際のルートを確認しておきましょう。北大阪急行沿線の園は駅近で通勤との両立がしやすいですが、競争率は高めです。複数の園を見学しておくことをおすすめします。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 42,
  },
  {
    slug: "ikukyu-hokatsu",
    citySlug: "minoh",
    title: "箕面市で育休中の保活でやるべきこと　復帰までの準備",
    description:
      "箕面市で育児休業中に進めるべき保活の手順と注意点をまとめました。",
    image: "https://images.unsplash.com/photo-1590650153855-d9e808231d41?w=800&h=400&fit=crop",
    category: "育休中の保活",
    categoryColor: "purple",
    content: `<h2>育休中にやるべきこと</h2>
<p>育児休業中の保活は時間との勝負です。箕面市の申込スケジュールに合わせて計画的に進めましょう。</p>

<h3>育休中の保活ステップ</h3>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>産後3か月頃：情報収集開始</strong>
<p>箕面市の「保育施設等利用申込案内」を入手し、近隣の保育園をリストアップします。箕面市子ども未来創造局に相談することもできます。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>産後5〜8か月頃：見学</strong>
<p>候補の園を見学します。箕面市では見学は随時受付の園が多いです。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>10月頃：申込書類の準備・提出</strong>
<p>勤務（内定）証明書を会社に依頼し、育児休業取得中であることがわかる書類とともに提出します。</p>
</div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>箕面市では育休から復帰する場合、調整指数で<span class="highlight">+2点</span>の加点があります。フルタイム共働き40点に+2点で42点になり、同じ条件の世帯と差をつけることができます。復帰証明書の提出を忘れないようにしましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>育児休業加点の詳細は<a href="https://www.city.minoh.lg.jp/kodomo/hoiku/index.html" target="_blank" rel="noopener">箕面市公式サイト</a>の申込案内をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 50,
  },
  {
    slug: "second-child-hokatsu",
    citySlug: "minoh",
    title: "箕面市で二人目の保活で注意すること　きょうだい加点を活用",
    description:
      "箕面市で二人目のお子さんの保活をする際の注意点ときょうだい加点の仕組みを解説します。",
    image: "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&h=400&fit=crop",
    category: "二人目の保活",
    categoryColor: "rose",
    content: `<h2>二人目の保活のポイント</h2>
<p>箕面市では二人目の保活で「きょうだい加点」を活用することが重要です。上の子が箕面市の認可保育所等に在園していれば+3点の加点が得られます。</p>

<h3>きょうだいに関する加点</h3>
<table>
<tr><th>条件</th><th>加点</th></tr>
<tr><td>きょうだいが箕面市の保育所等に在園中</td><td>+3</td></tr>
<tr><td>きょうだい同時申込（2人以上同時）</td><td>+2</td></tr>
</table>

<h3>同じ園に通わせるには</h3>
<p>上の子が通っている園を第1希望にすれば、きょうだい在園の<span class="highlight">+3点</span>が加算されます。さらに育休復帰の+2点も合わせると合計+5点となり、大きなアドバンテージです。</p>

<h3>双子・三つ子の場合</h3>
<p>きょうだい同時申込で<span class="highlight">+2点</span>が加算されます。同じ園に入れるよう希望順位は統一しておきましょう。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>箕面市の40点満点の配点では、きょうだい在園+3点は全体の約7.5%に相当する大きな加点です。上の子の入園先を選ぶ際は、二人目の保活も見据えて園を選びましょう。</p>
</div>

<div class="info-box">
<p><strong>注意</strong></p>
<p>転園を希望する場合は-5点の減点があります。きょうだいを同じ園にまとめるための転園でも減点の対象となるため、最初の園選びが重要です。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 45,
  },
  {
    slug: "hoikuryo-guide",
    citySlug: "minoh",
    title: "箕面市の保育料の決まり方と節約のコツ",
    description:
      "箕面市の認可保育園の保育料の算定方法と負担を軽減する方法を解説します。",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "保育料",
    categoryColor: "purple",
    content: `<h2>箕面市の保育料の決まり方</h2>
<p>箕面市の認可保育園の保育料（利用者負担額）は、世帯の市民税額と子どもの年齢によって決まります。箕面市は人口約14万人の北摂エリアの自治体で、子育て支援に力を入れています。</p>

<h3>保育料のポイント</h3>
<ul>
<li>3〜5歳児：幼児教育・保育無償化により<span class="highlight">無料</span></li>
<li>0〜2歳児：世帯の市民税所得割額に応じて決定</li>
<li>第2子以降の保育料は軽減あり</li>
</ul>

<h3>節約のコツ</h3>
<table>
<tr><th>方法</th><th>効果</th></tr>
<tr><td>iDeCo・ふるさと納税の活用</td><td>市民税を下げて保育料を抑える</td></tr>
<tr><td>育休のタイミング調整</td><td>算定年度の所得を抑える</td></tr>
<tr><td>認定こども園の1号認定</td><td>教育部分は無償化の対象</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>箕面市では同点の場合、市区町村民税所得割額の低い世帯が優先される場合があります。保育料の節約だけでなく、同点時の優先順位にも関わることがあるため、税額の確認は重要です。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>保育料の詳細は<a href="https://www.city.minoh.lg.jp/kodomo/hoiku/index.html" target="_blank" rel="noopener">箕面市公式サイト</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 38,
  },
  {
    slug: "rejection-options",
    citySlug: "minoh",
    title: "箕面市で保育園に落ちたときの対処法　次にやるべきこと",
    description:
      "箕面市の保育園入園で不承諾になった場合の対処法と次のステップをまとめました。",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop",
    category: "不承諾対策",
    categoryColor: "rose",
    content: `<h2>不承諾通知が届いたら</h2>
<p>箕面市では4月一斉入所の1次選考結果が2月頃に届きます。不承諾だった場合でも、まだ選択肢はあります。</p>

<h3>すぐにやること</h3>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>2次選考に申し込む</strong>
<p>1次選考で空きが出た園の2次募集があります。速やかに申し込みましょう。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>5月以降の途中入所を申し込む</strong>
<p>年度途中でも空きが出れば入所できます。毎月の選考に自動的にかかります。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>認可外保育施設を利用する</strong>
<p>認可外に預けながら翌年度に再申込すると、認可外利用加点<span class="highlight">+3点</span>が加算されます。箕面市では+3点は大きな加点です。</p>
</div>
</div>

<h3>その他の選択肢</h3>
<ul>
<li>箕面市の一時預かり事業を利用する</li>
<li>企業主導型保育施設を探す</li>
<li>近隣の豊中市・池田市・吹田市の認可外も視野に入れる</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>箕面市は40点満点の配点で、調整指数1点の重みが大きい制度です。不承諾になった場合は認可外を利用して+3点を獲得し、翌年度に備える戦略が有効です。北大阪急行沿線以外のエリアも視野に入れると、途中入所のチャンスが広がります。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新の空き状況は<a href="https://www.city.minoh.lg.jp/kodomo/hoiku/index.html" target="_blank" rel="noopener">箕面市公式サイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 46,
  },
  {
    slug: "minoh-nature-childcare",
    citySlug: "minoh",
    title: "箕面市の自然を活かした保育園の魅力　箕面大滝・箕面公園エリア",
    description:
      "箕面大滝や箕面公園に近い箕面市ならではの自然保育の魅力と園選びのポイントを解説します。",
    image: "https://images.unsplash.com/photo-1472162072942-cd5147eb3902?w=800&h=400&fit=crop",
    category: "施設の種類",
    categoryColor: "teal",
    content: `<h2>箕面市は自然豊かな子育て環境</h2>
<p>箕面市は大阪府の北摂エリアに位置し、人口約14万人の住宅都市です。箕面大滝や箕面公園に代表される豊かな自然環境が魅力で、子育て世帯に人気のある街です。</p>

<h3>箕面市の保育の特徴</h3>
<ul>
<li>箕面公園や近隣の公園を活用した自然体験プログラム</li>
<li>箕面市子ども未来創造局による子育て支援の充実</li>
<li>認可保育園約25か所と小規模保育事業所が運営</li>
</ul>

<h3>エリア別の園の特徴</h3>
<table>
<tr><th>エリア</th><th>特徴</th></tr>
<tr><td>箕面駅周辺</td><td>箕面公園に近く自然体験を取り入れた園が多い</td></tr>
<tr><td>萱野・西宿</td><td>商業施設に近く利便性が高い</td></tr>
<tr><td>彩都エリア</td><td>新しい園が多く施設がきれい</td></tr>
<tr><td>粟生・止々呂美</td><td>自然に囲まれた環境で少人数保育</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>箕面市は「子どもたちに最善の環境を」をモットーに保育環境の充実に取り組んでいます。園によって保育方針や自然体験の取り組み方が異なるため、見学時に直接確認することをおすすめします。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>箕面市の保育施設一覧は<a href="https://www.city.minoh.lg.jp/kodomo/hoiku/index.html" target="_blank" rel="noopener">箕面市公式サイト</a>に掲載されています。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 40,
  },
];

registerArticles(articles);
