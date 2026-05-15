import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  {
    slug: "hokatsu-schedule",
    citySlug: "neyagawa",
    title: "寝屋川市の保活スケジュール完全ガイド　申込から内定まで",
    description:
      "寝屋川市の認可保育園の申込時期・選考の流れをまとめました。令和8年度4月入園のスケジュールを解説します。",
    image: "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>寝屋川市の4月入園スケジュール</h2>
<p>寝屋川市の認可保育園は毎年秋に翌年度4月入園の一斉申込を受付けます。寝屋川市こどもを守る課が窓口です。人口約23万人の北河内地域の中核都市として、認可保育園は約35か所あります。</p>

<h3>保活の全体スケジュール</h3>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>4月〜6月：情報収集</strong>
<p>市のホームページで保育園一覧や空き状況を確認します。寝屋川市は京阪沿線に保育施設が集中しており、エリアごとの競争率を把握することが大切です。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>6月〜9月：保育園見学</strong>
<p>気になる園に連絡して見学を予約しましょう。寝屋川市内には認可保育所・認定こども園・小規模保育事業所など多くの施設があります。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>9月〜10月：利用案内の入手・書類準備</strong>
<p>就労証明書などの必要書類を準備します。こどもを守る課の窓口または市のホームページから入手できます。</p>
</div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content">
<strong>10月〜11月：申込書類の提出</strong>
<p>こどもを守る課の窓口で提出します。書類不備があると受付できないため、早めに準備しましょう。</p>
</div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>寝屋川市は基本指数が父母各最大20点（合計40点満点）の制度です。フルタイム共働きで40点が基本ラインとなり、調整指数で差がつきます。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳しくは<a href="https://www.city.neyagawa.osaka.jp/organization_list/kodomo/hoikuka/index.html" target="_blank" rel="noopener">寝屋川市公式サイト</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 55,
  },
  {
    slug: "scoring-system-guide",
    citySlug: "neyagawa",
    title: "寝屋川市の点数の仕組みと計算方法　基本指数と調整指数を解説",
    description:
      "寝屋川市の保育園入園選考で使われる基本指数と調整指数の仕組みを解説します。",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>寝屋川市の選考点数とは</h2>
<p>寝屋川市の認可保育園の入園選考は「基本指数（保護者1 + 保護者2）＋ 調整指数」の合計で行われます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>選考点数 = 基本指数（保護者1 + 保護者2）+ 調整指数</p>
</div>

<h2>基本指数（父母各最大20点、合計40点）</h2>
<p>就労の場合、月160時間以上（週40時間以上）で満点の<span class="highlight">20点</span>です。</p>

<table>
<tr><th>勤務の状況</th><th>基本指数</th></tr>
<tr><td>月160時間以上（週40時間以上）</td><td>20</td></tr>
<tr><td>月140時間以上（週35時間以上）</td><td>18</td></tr>
<tr><td>月120時間以上（週30時間以上）</td><td>16</td></tr>
<tr><td>月96時間以上（週24時間以上）</td><td>14</td></tr>
<tr><td>月64時間以上（週16時間以上）</td><td>12</td></tr>
<tr><td>月48時間以上（週12時間以上）</td><td>10</td></tr>
<tr><td>求職活動中</td><td>6</td></tr>
</table>

<h2>調整指数の代表例</h2>
<ul>
<li>ひとり親世帯：<span class="highlight">+5点</span></li>
<li>きょうだい在園中の施設を希望：<span class="highlight">+3点</span></li>
<li>認可外保育施設を利用中：<span class="highlight">+3点</span></li>
<li>生活保護受給世帯：<span class="highlight">+3点</span></li>
<li>きょうだい同時申込：<span class="highlight">+2点</span></li>
<li>育休復帰：<span class="highlight">+2点</span></li>
<li>同居祖父母あり：<span class="highlight">-3点</span></li>
<li>転園希望：<span class="highlight">-5点</span></li>
<li>市外からの申込：<span class="highlight">-10点</span></li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>全項目は<a href="https://www.city.neyagawa.osaka.jp/organization_list/kodomo/hoikuka/index.html" target="_blank" rel="noopener">寝屋川市公式サイト「保育施設等の利用案内」</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 60,
  },
  {
    slug: "score-up-tips",
    citySlug: "neyagawa",
    title: "寝屋川市の加点のコツ　点数アップ戦略と調整指数の活用法",
    description:
      "寝屋川市の保育園入園選考で調整指数の加点を最大限に活用する方法を解説します。",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>基本指数40点は出発点</h2>
<p>寝屋川市ではフルタイム共働き世帯は基本指数<span class="highlight">40点</span>で横並びです。差がつくのは調整指数です。</p>

<h2>加点チェックリスト</h2>
<table>
<tr><th>項目</th><th>点数</th><th>条件</th></tr>
<tr><td>ひとり親世帯</td><td>+5</td><td>ひとり親世帯である</td></tr>
<tr><td>きょうだい在園</td><td>+3</td><td>きょうだいが在園中の施設を希望</td></tr>
<tr><td>認可外利用</td><td>+3</td><td>認可外保育施設に預けている</td></tr>
<tr><td>生活保護受給</td><td>+3</td><td>生活保護受給世帯</td></tr>
<tr><td>きょうだい同時申込</td><td>+2</td><td>きょうだいと同時に申し込む</td></tr>
<tr><td>育休復帰</td><td>+2</td><td>入園月に育休から復帰する</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>寝屋川市は京阪寝屋川市駅・香里園駅周辺が人気エリアです。認可外保育施設に預けながら申込むと+3点の加点が得られます。きょうだい在園+3点と合わせれば合計+6点となり、かなり有利になります。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 58,
  },
  {
    slug: "licensed-vs-unlicensed",
    citySlug: "neyagawa",
    title: "寝屋川市の認可保育園vs認可外　どっちがいい？違いを比較",
    description:
      "寝屋川市の認可保育園と認可外保育施設の違い、メリット・デメリットを比較解説します。",
    image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>認可保育園と認可外の違い</h2>
<p>寝屋川市には認可保育所・認定こども園・小規模保育事業所などの認可施設と、認可外保育施設があります。それぞれの特徴を比較します。</p>

<table>
<tr><th>項目</th><th>認可保育園</th><th>認可外保育施設</th></tr>
<tr><td>保育料</td><td>所得に応じて決定</td><td>施設が独自に設定</td></tr>
<tr><td>入園方法</td><td>市が選考</td><td>施設に直接申込</td></tr>
<tr><td>無償化</td><td>3〜5歳は無料</td><td>月3.7万円まで補助</td></tr>
<tr><td>選考</td><td>点数制</td><td>先着・面接など</td></tr>
</table>

<h3>寝屋川市の認可外を選ぶメリット</h3>
<ul>
<li>選考なしですぐに入れる場合がある</li>
<li>認可外に預けると翌年度の認可申込で<span class="highlight">+3点</span>の加点が得られる</li>
<li>京阪沿線に認可外施設が多く通勤途中に預けやすい</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>寝屋川市は約35か所の認可保育園がありますが、0〜1歳児クラスは競争が激しいエリアもあります。認可外施設を「つなぎ」として利用し、翌年度に加点を得て認可に申込む戦略も有効です。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳しくは<a href="https://www.city.neyagawa.osaka.jp/organization_list/kodomo/hoikuka/index.html" target="_blank" rel="noopener">寝屋川市 保育施設の案内</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 45,
  },
  {
    slug: "nursery-visit-checklist",
    citySlug: "neyagawa",
    title: "寝屋川市の保育園見学チェックリスト　見るべき10のポイント",
    description:
      "寝屋川市の保育園見学で確認すべきポイントをチェックリスト形式でまとめました。",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>見学前に知っておくこと</h2>
<p>寝屋川市には認可保育所・認定こども園・小規模保育事業所など約35か所の施設があります。見学は6月〜9月に集中するため、早めに予約しましょう。</p>

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
<p>寝屋川市は京阪寝屋川市駅・香里園駅周辺に園が集中しています。駅近の園は人気が高いため、少し離れたエリアも候補に入れると選択肢が広がります。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 42,
  },
  {
    slug: "ikukyu-hokatsu",
    citySlug: "neyagawa",
    title: "寝屋川市で育休中の保活でやるべきこと　復帰までの準備",
    description:
      "寝屋川市で育児休業中に進めるべき保活の手順と注意点をまとめました。",
    image: "https://images.unsplash.com/photo-1590650153855-d9e808231d41?w=800&h=400&fit=crop",
    category: "育休中の保活",
    categoryColor: "purple",
    content: `<h2>育休中にやるべきこと</h2>
<p>育児休業中の保活は時間との勝負です。寝屋川市の申込スケジュールに合わせて計画的に進めましょう。</p>

<h3>育休中の保活ステップ</h3>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>産後3か月頃：情報収集開始</strong>
<p>寝屋川市こどもを守る課のホームページで保育施設の利用案内を入手し、近隣の保育園をリストアップします。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>産後5〜8か月頃：見学</strong>
<p>候補の園を見学します。寝屋川市では見学は随時受付の園が多いです。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>10月頃：申込書類の準備・提出</strong>
<p>就労証明書を会社に依頼し、こどもを守る課の窓口で申込書類を提出します。</p>
</div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>寝屋川市では育休から復帰する場合、調整指数で<span class="highlight">+2点</span>の加点があります。入園月に復帰することが条件です。フルタイム共働きの基本指数40点に育休復帰+2点で合計42点がベースラインになります。</p>
</div>

<div class="info-box">
<p><strong>注意</strong></p>
<p>寝屋川市では入園後に育休から復帰しなかった場合、退園となる可能性があります。復帰時期は勤務先とよく相談しましょう。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 48,
  },
  {
    slug: "small-nursery",
    citySlug: "neyagawa",
    title: "寝屋川市の小規模保育園という選択肢　連携施設の仕組みも解説",
    description:
      "寝屋川市の小規模保育事業所のメリットと卒園後の連携施設への進路を解説します。",
    image: "https://images.unsplash.com/photo-1576495199011-eb94736d05d6?w=800&h=400&fit=crop",
    category: "施設の種類",
    categoryColor: "teal",
    content: `<h2>小規模保育事業所とは</h2>
<p>寝屋川市には0〜2歳児を対象にした小規模保育事業所があります。定員6〜19名の少人数保育で、家庭的な雰囲気が特徴です。</p>

<h3>小規模保育のメリット</h3>
<ul>
<li>少人数で手厚い保育が受けられる</li>
<li>認可保育園より競争率が低い場合がある</li>
<li>3歳以降は連携施設への優先入園が可能</li>
</ul>

<h3>連携施設への進路</h3>
<p>寝屋川市では小規模保育事業所の卒園後、連携施設（認定こども園や保育所）への優先利用が設けられています。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>小規模保育の連携施設への優先枠は競争率が低いため、0〜2歳は小規模保育、3歳から連携施設へという流れは有効な戦略です。寝屋川市の京阪沿線エリアでは認可保育園の0歳児クラスが激戦になるため、小規模保育も候補に入れましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>連携施設の一覧は<a href="https://www.city.neyagawa.osaka.jp/organization_list/kodomo/hoikuka/index.html" target="_blank" rel="noopener">寝屋川市「保育施設等の利用案内」</a>に掲載されています。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 40,
  },
  {
    slug: "second-child-hokatsu",
    citySlug: "neyagawa",
    title: "寝屋川市で二人目の保活で注意すること　きょうだい加点を活用",
    description:
      "寝屋川市で二人目のお子さんの保活をする際の注意点ときょうだい加点の仕組みを解説します。",
    image: "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&h=400&fit=crop",
    category: "二人目の保活",
    categoryColor: "rose",
    content: `<h2>二人目の保活のポイント</h2>
<p>寝屋川市では二人目の保活では「きょうだい加点」を活用することが重要です。</p>

<h3>きょうだいに関する加点</h3>
<table>
<tr><th>条件</th><th>加点</th></tr>
<tr><td>きょうだいが在園中の施設を希望する</td><td>+3</td></tr>
<tr><td>きょうだいと同時に申し込む</td><td>+2</td></tr>
</table>

<h3>同じ園に通わせるには</h3>
<p>上の子が通っている園を希望すれば<span class="highlight">+3点</span>の加点がもらえます。フルタイム共働きの基本指数40点にきょうだい加点+3点で合計43点となり、かなり有利です。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>寝屋川市ではきょうだいが別々の園になると送迎が大変です。特に京阪沿線は朝の通勤ラッシュと重なるため、同じ園に通わせることで負担を大幅に減らせます。第1希望にきょうだい在園の施設を書くことを忘れないようにしましょう。</p>
</div>

<div class="info-box">
<p><strong>注意</strong></p>
<p>きょうだい加点は希望する施設にきょうだいが在園していることが条件です。卒園後は適用されないため、年齢差にも注意してください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 50,
  },
  {
    slug: "hoikuryo-guide",
    citySlug: "neyagawa",
    title: "寝屋川市の保育料の決まり方と節約のコツ",
    description:
      "寝屋川市の認可保育園の保育料の算定方法と負担を軽減する方法を解説します。",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "保育料",
    categoryColor: "purple",
    content: `<h2>寝屋川市の保育料の決まり方</h2>
<p>寝屋川市の認可保育園の保育料（利用者負担額）は、世帯の市民税額と子どもの年齢によって決まります。</p>

<h3>保育料のポイント</h3>
<ul>
<li>3〜5歳児：幼児教育・保育無償化により<span class="highlight">無料</span></li>
<li>0〜2歳児：世帯の市民税所得割額に応じて決定</li>
<li>第2子以降の保育料は軽減あり</li>
<li>寝屋川市独自の軽減措置もあり</li>
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
<p>寝屋川市の保育料は大阪府内でも標準的な水準です。0〜2歳児の保育料は家計への影響が大きいため、市民税の控除を活用して負担を軽減しましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>保育料の詳細は<a href="https://www.city.neyagawa.osaka.jp/organization_list/kodomo/hoikuka/index.html" target="_blank" rel="noopener">寝屋川市「保育施設等の利用案内」</a>の利用者負担額のページをご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 38,
  },
  {
    slug: "rejection-options",
    citySlug: "neyagawa",
    title: "寝屋川市で保育園に落ちたときの対処法　次にやるべきこと",
    description:
      "寝屋川市の保育園入園で不承諾になった場合の対処法と次のステップをまとめました。",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop",
    category: "不承諾対策",
    categoryColor: "rose",
    content: `<h2>不承諾通知が届いたら</h2>
<p>寝屋川市では4月一斉入所の1次選考結果が2月頃に届きます。不承諾だった場合でも、まだ選択肢はあります。</p>

<h3>すぐにやること</h3>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>2次選考に申し込む</strong>
<p>1次選考で空きが出た園の2次募集があります。速やかにこどもを守る課に相談しましょう。</p>
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
<p>認可外に預けながら翌年度に再申込すると、認可外利用加点<span class="highlight">+3点</span>が加算されます。</p>
</div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>寝屋川市では認可外利用の+3点は翌年度の申込で大きな武器になります。フルタイム共働きの基本指数40点に認可外利用+3点で合計43点となり、初回申込の40点世帯より有利に選考を受けられます。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>2次選考や途中入所については<a href="https://www.city.neyagawa.osaka.jp/organization_list/kodomo/hoikuka/index.html" target="_blank" rel="noopener">寝屋川市公式サイト</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 52,
  },
];

registerArticles(articles);
