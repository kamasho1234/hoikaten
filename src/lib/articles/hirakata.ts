import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  {
    slug: "hokatsu-schedule",
    citySlug: "hirakata",
    title: "枚方市の保活スケジュール完全ガイド　申込から内定まで",
    description:
      "枚方市の認可保育園の申込時期・選考の流れをまとめました。令和8年度4月入園のスケジュールを解説します。",
    image: "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>枚方市の4月入園スケジュール</h2>
<p>枚方市の認可保育園は毎年秋に翌年度4月入園の一斉申込を受付けます。「保育所（園）等利用の手引き（募集要項）」を入手して準備しましょう。</p>

<h3>保活の全体スケジュール</h3>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>4月〜6月：情報収集</strong>
<p>市のホームページで保育園一覧や空き状況を確認します。枚方市には認可保育所・認定こども園・小規模保育事業所など多くの施設があります。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>6月〜9月：保育園見学</strong>
<p>気になる園に連絡して見学を予約しましょう。枚方市は京阪沿線を中心に施設が点在しています。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>9月〜10月：利用案内の入手・書類準備</strong>
<p>就労証明書などの必要書類を準備します。枚方市保育幼稚園入園課の窓口やホームページで入手できます。</p>
</div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content">
<strong>10月〜11月：申込書類の提出</strong>
<p>保育幼稚園入園課の窓口または郵送で提出します。</p>
</div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>枚方市は基本指数が父母各最大100点（合計200点満点）の制度です。フルタイム共働き世帯は基本指数200点が出発点となり、調整指数で差がつきます。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳しくは<a href="https://www.city.hirakata.osaka.jp/vod/0000033514.html" target="_blank" rel="noopener">枚方市公式サイト「保育所（園）等利用の手引き」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 55,
  },
  {
    slug: "scoring-system-guide",
    citySlug: "hirakata",
    title: "枚方市の点数の仕組みと計算方法　基本指数と調整指数を解説",
    description:
      "枚方市の保育園入園選考で使われる基本指数と調整指数の仕組みを解説します。",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>枚方市の選考指数とは</h2>
<p>枚方市の認可保育園の入園選考は「基本指数（父母それぞれ）＋ 調整指数」の合計で行われます。指数が同点の場合は8つの優先項目で判定されます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>選考指数 = 基本指数（保護者1 + 保護者2）+ 調整指数</p>
</div>

<h2>基本指数（父母各最大100点、合計200点）</h2>
<p>就労の場合、月160時間以上で満点の<span class="highlight">100点</span>です。</p>

<table>
<tr><th>勤務の状況</th><th>基本指数</th></tr>
<tr><td>月160時間以上</td><td>100</td></tr>
<tr><td>月140時間以上160時間未満</td><td>90</td></tr>
<tr><td>月120時間以上140時間未満</td><td>80</td></tr>
<tr><td>月96時間以上120時間未満</td><td>70</td></tr>
<tr><td>月64時間以上96時間未満</td><td>60</td></tr>
<tr><td>求職活動中</td><td>40</td></tr>
</table>

<h2>調整指数の代表例</h2>
<ul>
<li>ひとり親世帯：<span class="highlight">+15点</span></li>
<li>きょうだい在園中の施設を第1希望：<span class="highlight">+10点</span></li>
<li>多胎児の同時申込：<span class="highlight">+10点</span></li>
<li>単身赴任中：<span class="highlight">+10点</span></li>
<li>認可外保育施設利用：<span class="highlight">+5点</span></li>
<li>育児休業復帰：<span class="highlight">+5点</span></li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>全項目は<a href="https://www.city.hirakata.osaka.jp/vod/0000033514.html" target="_blank" rel="noopener">枚方市公式サイト「保育所（園）等利用の手引き」</a>の利用調整基準表（募集要項23ページ）で確認できます。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 60,
  },
  {
    slug: "score-up-tips",
    citySlug: "hirakata",
    title: "枚方市の加点のコツ　点数アップ戦略と調整指数の活用法",
    description:
      "枚方市の保育園入園選考で調整指数の加点を最大限に活用する方法を解説します。",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>基本指数200点は出発点</h2>
<p>枚方市ではフルタイム共働き世帯は基本指数<span class="highlight">200点</span>で横並びです。差がつくのは調整指数です。</p>

<h2>加点チェックリスト</h2>
<table>
<tr><th>項目</th><th>点数</th><th>条件</th></tr>
<tr><td>ひとり親世帯</td><td>+15</td><td>ひとり親世帯及びそれに準じる世帯</td></tr>
<tr><td>きょうだい在園</td><td>+10</td><td>きょうだいが在園中の施設を第1希望にする</td></tr>
<tr><td>多胎児同時申込</td><td>+10</td><td>双子等の同時申込</td></tr>
<tr><td>単身赴任</td><td>+10</td><td>保護者が単身赴任中</td></tr>
<tr><td>保育士加点（市内）</td><td>+10</td><td>枚方市内の保育施設に勤務</td></tr>
<tr><td>認可外利用</td><td>+5</td><td>認可外保育施設に月64時間以上預けている</td></tr>
<tr><td>育休復帰</td><td>+5</td><td>入園月に復帰する</td></tr>
<tr><td>きょうだい同時申込</td><td>+5</td><td>きょうだいと同時に申し込む</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>枚方市は京阪枚方市駅・枚方公園駅周辺が人気エリアです。きょうだい在園の+10点は非常に大きいため、上の子と同じ園を第1希望にすることが重要です。認可外に預けながら申込すると+5点が加算されます。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 58,
  },
  {
    slug: "licensed-vs-unlicensed",
    citySlug: "hirakata",
    title: "枚方市の認可保育園vs認可外　どっちがいい？違いを比較",
    description:
      "枚方市の認可保育園と認可外保育施設の違い、メリット・デメリットを比較解説します。",
    image: "https://images.unsplash.com/photo-1587654780291-39c9404d7dd0?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>認可保育園と認可外の違い</h2>
<p>枚方市には認可保育所・認定こども園・小規模保育事業所などの認可施設と、認可外保育施設があります。それぞれの特徴を比較します。</p>

<table>
<tr><th>項目</th><th>認可保育園</th><th>認可外保育施設</th></tr>
<tr><td>保育料</td><td>所得に応じて決定</td><td>施設が独自に設定</td></tr>
<tr><td>入園方法</td><td>市が選考</td><td>施設に直接申込</td></tr>
<tr><td>無償化</td><td>3〜5歳は無料</td><td>月3.7万円まで補助</td></tr>
<tr><td>選考</td><td>指数制</td><td>先着・面接など</td></tr>
</table>

<h3>枚方市の認可外を選ぶメリット</h3>
<ul>
<li>選考なしですぐに入れる場合がある</li>
<li>認可外に預けると翌年度の認可申込で<span class="highlight">+5点</span>の加点が得られる</li>
<li>保育の必要性が認められれば無償化の対象にもなる</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>枚方市では幼児教育・保育の無償化により、3〜5歳児は認可保育園の保育料が無料です。0〜2歳児は世帯の市民税額に応じた保育料がかかりますが、第2子以降は軽減措置があります。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳しくは<a href="https://www.city.hirakata.osaka.jp/kosodate/0000008077.html" target="_blank" rel="noopener">枚方市 入所（園）の手続き</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 45,
  },
  {
    slug: "nursery-visit-checklist",
    citySlug: "hirakata",
    title: "枚方市の保育園見学チェックリスト　見るべき10のポイント",
    description:
      "枚方市の保育園見学で確認すべきポイントをチェックリスト形式でまとめました。",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>見学前に知っておくこと</h2>
<p>枚方市には公立・私立合わせて多数の認可保育所・認定こども園・小規模保育事業所があります。見学は6月〜9月に集中するため、早めに予約しましょう。</p>

<h3>見学チェックリスト</h3>
<table>
<tr><th>チェック項目</th><th>確認ポイント</th></tr>
<tr><td>園庭の広さ</td><td>外遊びの頻度と場所</td></tr>
<tr><td>給食の内容</td><td>自園調理かどうか、アレルギー対応</td></tr>
<tr><td>保育士の雰囲気</td><td>子どもへの声かけの仕方</td></tr>
<tr><td>お迎え時間</td><td>延長保育の有無と時間（標準時間は最長11時間）</td></tr>
<tr><td>持ち物</td><td>おむつ・布団の持参が必要か</td></tr>
<tr><td>登園方法</td><td>自転車・ベビーカー置き場の有無</td></tr>
<tr><td>行事の頻度</td><td>平日の行事参加が必要か</td></tr>
<tr><td>慣らし保育</td><td>期間と進め方</td></tr>
<tr><td>病児対応</td><td>発熱時のお迎え基準</td></tr>
<tr><td>安全対策</td><td>門の施錠・防犯カメラの有無</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>枚方市は京阪本線沿線に園が多い一方、東部の丘陵地帯は園が少なめです。通勤ルートと自宅の位置を考慮して候補園を選びましょう。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 42,
  },
  {
    slug: "ikukyu-hokatsu",
    citySlug: "hirakata",
    title: "枚方市で育休中の保活でやるべきこと　復帰までの準備",
    description:
      "枚方市で育児休業中に進めるべき保活の手順と注意点をまとめました。",
    image: "https://images.unsplash.com/photo-1590650153855-d9e808231d41?w=800&h=400&fit=crop",
    category: "育休中の保活",
    categoryColor: "purple",
    content: `<h2>育休中にやるべきこと</h2>
<p>育児休業中の保活は時間との勝負です。枚方市の申込スケジュールに合わせて計画的に進めましょう。</p>

<h3>育休中の保活ステップ</h3>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>産後3か月頃：情報収集開始</strong>
<p>枚方市の「保育所（園）等利用の手引き」を入手し、近隣の保育園をリストアップします。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>産後5〜8か月頃：見学</strong>
<p>候補の園を見学します。枚方市では見学は随時受付の園が多いです。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>10月頃：申込書類の準備・提出</strong>
<p>就労証明書を会社に依頼し、申込書類を保育幼稚園入園課に提出します。</p>
</div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>枚方市では育休から復帰する場合、調整指数で<span class="highlight">+5点</span>の加点があります。入園月に復帰することが条件です。育休を延長できるのに希望園に入れない場合は調整で不利になることがあるため、希望順位は幅広く記載しましょう。</p>
</div>

<div class="info-box">
<p><strong>注意</strong></p>
<p>枚方市では年度途中の利用申込みも随時受付しています。4月入園に間に合わない場合は途中入所も検討しましょう。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 48,
  },
  {
    slug: "small-nursery",
    citySlug: "hirakata",
    title: "枚方市の小規模保育園という選択肢　連携施設の仕組みも解説",
    description:
      "枚方市の小規模保育事業所のメリットと卒園後の連携施設への進路を解説します。",
    image: "https://images.unsplash.com/photo-1576495199011-eb94736d05d6?w=800&h=400&fit=crop",
    category: "施設の種類",
    categoryColor: "teal",
    content: `<h2>小規模保育事業所とは</h2>
<p>枚方市には0〜2歳児を対象にした小規模保育事業所があります。定員6〜19名の少人数保育で、家庭的な雰囲気が特徴です。</p>

<h3>小規模保育のメリット</h3>
<ul>
<li>少人数で手厚い保育が受けられる</li>
<li>認可保育園より競争率が低い場合がある</li>
<li>3歳以降は連携施設への優先入園が可能</li>
</ul>

<h3>連携施設への進路</h3>
<p>枚方市では小規模保育事業所の卒園後、連携施設（認定こども園や保育所）への優先利用が設けられています。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>枚方市の小規模保育事業所は京阪沿線の各駅周辺を中心に増えています。0〜2歳児クラスは認可保育園の競争率が最も高いため、小規模保育を「保活の第一歩」として活用する家庭も多いです。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>施設一覧は<a href="https://www.city.hirakata.osaka.jp/kosodate/0000003234.html" target="_blank" rel="noopener">枚方市 保育所（園）一覧</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 40,
  },
  {
    slug: "second-child-hokatsu",
    citySlug: "hirakata",
    title: "枚方市で二人目の保活で注意すること　きょうだい加点を活用",
    description:
      "枚方市で二人目のお子さんの保活をする際の注意点ときょうだい加点の仕組みを解説します。",
    image: "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&h=400&fit=crop",
    category: "二人目の保活",
    categoryColor: "rose",
    content: `<h2>二人目の保活のポイント</h2>
<p>枚方市では二人目の保活では「きょうだい加点」を活用することが重要です。</p>

<h3>きょうだいに関する加点</h3>
<table>
<tr><th>条件</th><th>加点</th></tr>
<tr><td>きょうだいが在園中の施設を第1希望にする</td><td>+10</td></tr>
<tr><td>きょうだいと同時に申し込む</td><td>+5</td></tr>
<tr><td>多胎児（双子等）の同時申込</td><td>+10</td></tr>
</table>

<h3>同じ園に通わせるには</h3>
<p>上の子が通っている園を第1希望にすれば<span class="highlight">+10点</span>の加点がもらえます。フルタイム共働き世帯なら基本指数200点+きょうだい加点10点=210点となり、かなり有利になります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>きょうだい加点は第1希望の施設に対してのみ適用されます。第2希望以降では加点されないため、希望順位の記載に注意してください。送迎の利便性を考えても、きょうだいが同じ園に通えるのは大きなメリットです。</p>
</div>

<div class="info-box">
<p><strong>注意</strong></p>
<p>枚方市では多胎児の同時申込の場合は+10点の加点があります。双子以上のお子さんがいる場合は忘れずに申告しましょう。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 50,
  },
  {
    slug: "hoikuryo-guide",
    citySlug: "hirakata",
    title: "枚方市の保育料の決まり方と節約のコツ",
    description:
      "枚方市の認可保育園の保育料の算定方法と負担を軽減する方法を解説します。",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "保育料",
    categoryColor: "purple",
    content: `<h2>枚方市の保育料の決まり方</h2>
<p>枚方市の認可保育園の保育料（利用者負担額）は、世帯の市民税額と子どもの年齢によって決まります。</p>

<h3>保育料のポイント</h3>
<ul>
<li>3〜5歳児：幼児教育・保育無償化により<span class="highlight">無料</span></li>
<li>0〜2歳児：世帯の市民税所得割額に応じて決定</li>
<li>第2子以降の保育料は軽減あり</li>
<li>保育標準時間（最長11時間）と保育短時間（最長8時間）で区分</li>
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
<p>枚方市の保育料は14段階に分かれています。市民税の所得割額が基準となるため、前年の収入状況で保育料が変わります。4月〜8月は前年度の市民税額、9月〜3月は当年度の市民税額で算定されます。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>保育料の詳細は<a href="https://www.city.hirakata.osaka.jp/vod/0000033514.html" target="_blank" rel="noopener">枚方市「保育所（園）等利用の手引き」</a>の利用者負担額のページをご確認ください。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 38,
  },
  {
    slug: "rejection-options",
    citySlug: "hirakata",
    title: "枚方市で保育園に落ちたときの対処法　次にやるべきこと",
    description:
      "枚方市の保育園入園で不承諾になった場合の対処法と次のステップをまとめました。",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop",
    category: "不承諾対策",
    categoryColor: "rose",
    content: `<h2>不承諾通知が届いたら</h2>
<p>枚方市では4月一斉入所の1次選考結果が2月に届きます。不承諾だった場合でも、まだ選択肢はあります。</p>

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
<p>年度途中でも空きが出れば入所できます。枚方市では途中入所の申込みを随時受付しています。入所希望日の前月7日までに申込書類を提出してください。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>認可外保育施設を利用する</strong>
<p>認可外に預けながら翌年度に再申込すると、認可外利用加点<span class="highlight">+5点</span>が加算されます。</p>
</div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>枚方市のエリア別最低点は公式サイトで公表されています。自分の指数と比較して、入りやすいエリアや園を検討しましょう。人気エリア以外にも良い園はたくさんあります。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>途中入所や空き状況については<a href="https://www.city.hirakata.osaka.jp/0000046030.html" target="_blank" rel="noopener">枚方市 保育所（園）等の利用調整の受入れ枠等について</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 52,
  },
];

registerArticles(articles);
