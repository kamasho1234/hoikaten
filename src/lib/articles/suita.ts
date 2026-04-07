import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  {
    slug: "hokatsu-schedule",
    citySlug: "suita",
    title: "吹田市の保活スケジュール完全ガイド　申込から内定まで",
    description:
      "吹田市の認可保育園の申込時期・選考の流れをまとめました。令和8年度4月入園のスケジュールを解説します。",
    image: "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>吹田市の4月入園スケジュール</h2>
<p>吹田市の認可保育園は毎年秋に翌年度4月入園の一斉申込を受付けます。「保育所等利用申込案内」を入手して準備しましょう。</p>

<h3>保活の全体スケジュール</h3>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>4月〜6月：情報収集</strong>
<p>市のホームページで保育園一覧や空き状況を確認します。吹田市は認可保育所・認定こども園・小規模保育事業所・事業所内保育事業と多くの施設があります。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>6月〜9月：保育園見学</strong>
<p>気になる園に連絡して見学を予約しましょう。吹田市はJR・阪急・大阪メトロ沿線に多くの保育施設があり、通勤ルート上の園も候補になります。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>9月〜10月：利用案内の入手・書類準備</strong>
<p>勤務（内定）証明書などの必要書類を準備します。吹田市のホームページから書類をダウンロードできます。</p>
</div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content">
<strong>10月〜11月：申込書類の提出</strong>
<p>保育幼稚園室の窓口またはオンラインで提出します。</p>
</div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>吹田市は基本指数が父母各最大40点（合計80点満点）の制度です。雇用型勤務と自営業で点数が異なるのが特徴です。フルタイム共働き（雇用型）で80点が基準ラインになります。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳しくは<a href="https://www.city.suita.osaka.jp/kosodate/1018230/1018247/1022101/index.html" target="_blank" rel="noopener">吹田市公式サイト</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-04",
    popularity: 55,
  },
  {
    slug: "scoring-system-guide",
    citySlug: "suita",
    title: "吹田市の点数の仕組みと計算方法　基本指数と調整指数を解説",
    description:
      "吹田市の保育園入園選考で使われる基本指数と調整指数の仕組みを解説します。",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>吹田市の利用調整指数とは</h2>
<p>吹田市の認可保育園の入園選考は「父の基本指数 ＋ 母の基本指数 ＋ 調整指数」の合計で行われます。ひとり親世帯は基本指数に40点が加算されます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>利用調整指数 = 基本指数（保護者1 + 保護者2）+ 調整指数</p>
</div>

<h2>基本指数（父母各最大40点、合計80点）</h2>
<p>就労の場合、雇用型勤務で月160時間以上なら満点の<span class="highlight">40点</span>です。自営中心者は最大36点、自営協力者は最大32点と雇用形態によって上限が異なります。</p>

<table>
<tr><th>勤務形態</th><th>就労時間</th><th>基本指数</th></tr>
<tr><td>雇用型勤務</td><td>月160時間以上</td><td>40</td></tr>
<tr><td>雇用型勤務</td><td>月140〜160時間</td><td>36</td></tr>
<tr><td>雇用型勤務</td><td>月120〜140時間</td><td>32</td></tr>
<tr><td>雇用型勤務</td><td>月80〜120時間</td><td>28</td></tr>
<tr><td>雇用型勤務</td><td>月64〜80時間</td><td>24</td></tr>
<tr><td>自営中心者</td><td>月160時間以上</td><td>36</td></tr>
<tr><td>自営協力者</td><td>月160時間以上</td><td>32</td></tr>
<tr><td>内職</td><td>月120時間以上</td><td>20</td></tr>
<tr><td>求職活動中</td><td>—</td><td>12</td></tr>
</table>

<h2>調整指数の代表例</h2>
<ul>
<li>ひとり親世帯：<span class="highlight">+16点</span></li>
<li>地域型保育事業の卒園児：<span class="highlight">+16点</span></li>
<li>保育士加点（吹田市内施設勤務）：<span class="highlight">+12点</span></li>
<li>きょうだいが保育所等を利用中：<span class="highlight">+8点</span></li>
<li>単身赴任：<span class="highlight">+8点</span></li>
<li>育休復帰：<span class="highlight">+2点</span></li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>全項目は<a href="https://www.city.suita.osaka.jp/kosodate/1018230/1018247/1022101/index.html" target="_blank" rel="noopener">吹田市公式サイト「保育所等の利用申込」</a>の利用調整基準表で確認できます。</p>
</div>`,
    publishedAt: "2026-04-04",
    popularity: 60,
  },
  {
    slug: "score-up-tips",
    citySlug: "suita",
    title: "吹田市の加点のコツ　点数アップ戦略と調整指数の活用法",
    description:
      "吹田市の保育園入園選考で調整指数の加点を最大限に活用する方法を解説します。",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>基本指数80点は出発点</h2>
<p>吹田市ではフルタイム共働き世帯（雇用型）は基本指数<span class="highlight">80点</span>で横並びです。差がつくのは調整指数です。</p>

<h2>加点チェックリスト</h2>
<table>
<tr><th>項目</th><th>点数</th><th>条件</th></tr>
<tr><td>ひとり親世帯</td><td>+16</td><td>ひとり親家庭及びそれに準ずる世帯</td></tr>
<tr><td>地域型保育卒園児</td><td>+16</td><td>小規模保育等の卒園児（在籍半年以上）</td></tr>
<tr><td>保育士加点</td><td>+12</td><td>吹田市の保育所等に勤務する保育士等</td></tr>
<tr><td>きょうだい在園</td><td>+8</td><td>きょうだいが吹田市の保育所等を利用中</td></tr>
<tr><td>単身赴任</td><td>+8</td><td>保護者が長期間他の土地で就労</td></tr>
<tr><td>自営業実態証明</td><td>+4</td><td>開業届等で勤務実態を証明</td></tr>
<tr><td>幼稚園教諭加点</td><td>+4</td><td>吹田市の幼稚園等に勤務する幼稚園教諭</td></tr>
<tr><td>重複要件加点</td><td>+4</td><td>基本要件以外に疾病・障害・介護がある</td></tr>
<tr><td>認可外利用</td><td>+2</td><td>認可外保育施設に月64時間以上預けている</td></tr>
<tr><td>育休復帰</td><td>+2</td><td>育児休業から入園月に復帰</td></tr>
<tr><td>生活保護</td><td>+2</td><td>生活保護受給世帯</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>吹田市は北大阪急行延伸（箕面萱野駅開業）の影響で沿線人口が増加しており、江坂・千里ニュータウン周辺は特に競争率が高いエリアです。きょうだい加点+8は大きいため、上の子が通っている園を第1希望にすることが有利です。</p>
</div>`,
    publishedAt: "2026-04-04",
    popularity: 58,
  },
  {
    slug: "employment-type-difference",
    citySlug: "suita",
    title: "吹田市は雇用型と自営業で点数が違う！就労形態別の基本指数",
    description:
      "吹田市の保育園入園選考で雇用型・自営中心者・自営協力者・内職で異なる基本指数を詳しく解説します。",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>吹田市の就労形態別の点数</h2>
<p>吹田市の大きな特徴は、就労の形態によって基本指数の上限が異なることです。同じ月160時間以上の就労でも雇用型と自営業では点数が違います。</p>

<table>
<tr><th>就労形態</th><th>160時間以上</th><th>140〜160時間</th><th>120〜140時間</th><th>80〜120時間</th><th>64〜80時間</th></tr>
<tr><td>雇用型勤務</td><td>40</td><td>36</td><td>32</td><td>28</td><td>24</td></tr>
<tr><td>自営中心者</td><td>36</td><td>32</td><td>28</td><td>24</td><td>20</td></tr>
<tr><td>自営協力者</td><td>32</td><td>28</td><td>24</td><td>20</td><td>16</td></tr>
</table>

<h3>自営業者が点数を上げるには</h3>
<ul>
<li>開業届・営業許可証等で勤務実態を証明すると調整指数で<span class="highlight">+4点</span></li>
<li>自営中心者は最大36+4=40点で雇用型と同等に</li>
<li>居宅内労働の場合は<span class="highlight">-2点</span>の減点があるので注意</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>自営業の方は開業届等の書類を必ず提出しましょう。調整指数+4で雇用型との差を埋めることができます。ただし居宅内労働の減点-2もあるため、実質+2の差になる点に注意してください。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳しくは<a href="https://www.city.suita.osaka.jp/kosodate/1018230/1018247/1022101/index.html" target="_blank" rel="noopener">吹田市公式サイト</a>の利用調整基準表をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-04",
    popularity: 48,
  },
  {
    slug: "nursery-visit-checklist",
    citySlug: "suita",
    title: "吹田市の保育園見学チェックリスト　見るべき10のポイント",
    description:
      "吹田市の保育園見学で確認すべきポイントをチェックリスト形式でまとめました。",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>見学前に知っておくこと</h2>
<p>吹田市には認可保育所・認定こども園・小規模保育事業所・事業所内保育事業など多くの施設があります。見学は6月〜9月に集中するため、早めに予約しましょう。</p>

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
<p>吹田市は千里ニュータウン地区や江坂エリアで保育需要が高く、0〜2歳児クラスは特に競争率が高い傾向です。第1希望だけでなく複数の園を見学しておくことをおすすめします。</p>
</div>`,
    publishedAt: "2026-04-04",
    popularity: 42,
  },
  {
    slug: "ikukyu-hokatsu",
    citySlug: "suita",
    title: "吹田市で育休中の保活でやるべきこと　復帰までの準備",
    description:
      "吹田市で育児休業中に進めるべき保活の手順と注意点をまとめました。",
    image: "https://images.unsplash.com/photo-1590650153855-d9e808231d41?w=800&h=400&fit=crop",
    category: "育休中の保活",
    categoryColor: "purple",
    content: `<h2>育休中にやるべきこと</h2>
<p>育児休業中の保活は時間との勝負です。吹田市の申込スケジュールに合わせて計画的に進めましょう。</p>

<h3>育休中の保活ステップ</h3>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>産後3か月頃：情報収集開始</strong>
<p>吹田市の「保育所等利用申込案内」を入手し、近隣の保育園をリストアップします。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>産後5〜8か月頃：見学</strong>
<p>候補の園を見学します。吹田市では見学は随時受付の園が多いです。</p>
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
<p>吹田市では育休から復帰する場合、調整指数で<span class="highlight">+2点</span>の加点があります。父母の両方が育休から復職する場合でも+2のみです。なお育休中に認可外保育施設を利用している場合は認可外加点の対象外となるため注意が必要です。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>育児休業加点の詳細は<a href="https://www.city.suita.osaka.jp/kosodate/1018230/1018247/1022101/index.html" target="_blank" rel="noopener">吹田市公式サイト</a>の申込案内をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-04",
    popularity: 50,
  },
  {
    slug: "small-nursery",
    citySlug: "suita",
    title: "吹田市の小規模保育園という選択肢　卒園後+16点の加点が魅力",
    description:
      "吹田市の小規模保育事業所のメリットと卒園後の連携施設・加点の仕組みを解説します。",
    image: "https://images.unsplash.com/photo-1576495199011-eb94736d05d6?w=800&h=400&fit=crop",
    category: "施設の種類",
    categoryColor: "teal",
    content: `<h2>小規模保育事業所とは</h2>
<p>吹田市には0〜2歳児を対象にした小規模保育事業所があります。定員6〜19名の少人数保育で、家庭的な雰囲気が特徴です。</p>

<h3>小規模保育のメリット</h3>
<ul>
<li>少人数で手厚い保育が受けられる</li>
<li>認可保育園より競争率が低い場合がある</li>
<li>卒園後に調整指数で<span class="highlight">+16点</span>の大きな加点がもらえる</li>
</ul>

<h3>卒園後の進路</h3>
<p>吹田市では地域型保育事業（小規模保育等）の卒園児は、在籍期間が半年以上であれば調整指数+16点が加算されます。これは吹田市最大級の加点です。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>+16点は非常に大きな加点で、ひとり親加点と同じ点数です。0〜2歳は小規模保育に入園し、3歳以降は+16点を活かして人気の認可保育園に転園する戦略が有効です。連携施設への優先利用も調整されます。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>地域型保育事業の一覧と連携施設は<a href="https://www.city.suita.osaka.jp/kosodate/1018230/1018247/1022101/index.html" target="_blank" rel="noopener">吹田市公式サイト</a>に掲載されています。</p>
</div>`,
    publishedAt: "2026-04-04",
    popularity: 52,
  },
  {
    slug: "second-child-hokatsu",
    citySlug: "suita",
    title: "吹田市で二人目の保活で注意すること　きょうだい加点を活用",
    description:
      "吹田市で二人目のお子さんの保活をする際の注意点ときょうだい加点の仕組みを解説します。",
    image: "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&h=400&fit=crop",
    category: "二人目の保活",
    categoryColor: "rose",
    content: `<h2>二人目の保活のポイント</h2>
<p>吹田市では二人目の保活で「きょうだい加点」を活用することが重要です。</p>

<h3>きょうだいに関する加点</h3>
<table>
<tr><th>条件</th><th>加点</th></tr>
<tr><td>きょうだいが吹田市の保育所等を利用中・申込中</td><td>+8</td></tr>
<tr><td>申込児童以外に小学6年生までの児童が1人いる</td><td>+1</td></tr>
<tr><td>申込児童以外に小学6年生までの児童が2人以上いる</td><td>+2</td></tr>
<tr><td>多胎児（双子）の同時申込</td><td>+1</td></tr>
<tr><td>多胎児（3人以上）の同時申込</td><td>+2</td></tr>
</table>

<h3>同じ園に通わせるには</h3>
<p>上の子が通っている園を希望すれば<span class="highlight">+8点</span>の加点がもらえます。これに子どもの人数加点+1〜2も加わるため、二人目は有利になります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>吹田市のきょうだい加点+8は、利用施設が吹田市の保育所・認定こども園（保育部分）・小規模保育事業・事業所内保育事業（地域枠）の場合に適用されます。在園中の認定こども園・保育所に利用申込をする場合は+16点の加点も適用されます。</p>
</div>

<div class="info-box">
<p><strong>注意</strong></p>
<p>利用内定を辞退すると-8点の減点があります。内定を受けたら辞退しないよう、希望順位は慎重に検討してください。</p>
</div>`,
    publishedAt: "2026-04-04",
    popularity: 45,
  },
  {
    slug: "hoikuryo-guide",
    citySlug: "suita",
    title: "吹田市の保育料の決まり方と節約のコツ",
    description:
      "吹田市の認可保育園の保育料の算定方法と負担を軽減する方法を解説します。",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "保育料",
    categoryColor: "purple",
    content: `<h2>吹田市の保育料の決まり方</h2>
<p>吹田市の認可保育園の保育料（利用者負担額）は、世帯の市民税額と子どもの年齢によって決まります。</p>

<h3>保育料のポイント</h3>
<ul>
<li>3〜5歳児：幼児教育・保育無償化により<span class="highlight">無料</span></li>
<li>0〜2歳児：世帯の市民税所得割額に応じて決定</li>
<li>第2子以降の保育料は軽減あり</li>
<li>保育料の滞納が累積6か月以上ある場合は調整指数で<span class="highlight">-12点</span>の減点</li>
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
<p>吹田市では同点の場合、市区町村民税所得割額の低い方が優先されます。保育料の節約だけでなく、同点時の優先順位にも関わる重要なポイントです。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>保育料の詳細は<a href="https://www.city.suita.osaka.jp/kosodate/1018230/1018247/1005708.html" target="_blank" rel="noopener">吹田市「利用者負担額（保育料）」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-04",
    popularity: 38,
  },
  {
    slug: "rejection-options",
    citySlug: "suita",
    title: "吹田市で保育園に落ちたときの対処法　次にやるべきこと",
    description:
      "吹田市の保育園入園で不承諾になった場合の対処法と次のステップをまとめました。",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop",
    category: "不承諾対策",
    categoryColor: "rose",
    content: `<h2>不承諾通知が届いたら</h2>
<p>吹田市では4月一斉入所の1次選考結果が2月上旬に届きます。不承諾だった場合でも、まだ選択肢はあります。</p>

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
<p>認可外に預けながら翌年度に再申込すると、認可外利用加点<span class="highlight">+2点</span>が加算されます。</p>
</div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>吹田市では同点の場合「当初利用希望日からの経過期間が長い方」が最優先されます。早めに申込んでおくことで、同点時に有利になります。また利用内定を辞退すると-8点の減点があるため、辞退は避けましょう。</p>
</div>

<div class="info-box">
<p><strong>空き状況の確認</strong></p>
<p>最新の空き状況は<a href="https://www.city.suita.osaka.jp/kosodate/1018230/1005681.html" target="_blank" rel="noopener">吹田市「保育所等の空き状況」</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-04",
    popularity: 46,
  },
];

registerArticles(articles);
