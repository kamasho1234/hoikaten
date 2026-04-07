import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  {
    slug: "hokatsu-schedule",
    citySlug: "moriguchi",
    title: "守口市の保活スケジュール完全ガイド　申込から内定まで",
    description:
      "守口市の認可保育園の申込時期・選考の流れをまとめました。令和8年度4月入園のスケジュールを解説します。",
    image: "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>守口市の4月入園スケジュール</h2>
<p>守口市の認可保育園は毎年秋に翌年度4月入園の一斉申込を受付けます。守口市こども部保育幼稚園課が窓口です。「保育所等利用申込案内」を入手して準備しましょう。</p>

<h3>保活の全体スケジュール</h3>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>4月〜6月：情報収集</strong>
<p>市のホームページで保育園一覧や空き状況を確認します。守口市には認可保育所・認定こども園・小規模保育事業所など約25か所の施設があります。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>6月〜9月：保育園見学</strong>
<p>気になる園に連絡して見学を予約しましょう。守口市は京阪本線・地下鉄谷町線沿線に保育施設が多く、通勤ルート上の園も候補になります。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>9月〜10月：利用案内の入手・書類準備</strong>
<p>勤務（内定）証明書などの必要書類を準備します。守口市のホームページから書類をダウンロードできます。</p>
</div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content">
<strong>10月〜11月：申込書類の提出</strong>
<p>保育幼稚園課の窓口で提出します。締切に遅れないよう早めに準備しましょう。</p>
</div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>守口市は基本指数が父母各最大20点（合計40点満点）の制度です。フルタイム共働きで40点が基準ラインになります。調整指数の加点で差がつくため、該当する項目を確認しておきましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳しくは<a href="https://www.city.moriguchi.osaka.jp/" target="_blank" rel="noopener">守口市公式サイト</a>の保育所等利用申込案内をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 55,
  },
  {
    slug: "scoring-system-guide",
    citySlug: "moriguchi",
    title: "守口市の点数の仕組みと計算方法　基本指数と調整指数を解説",
    description:
      "守口市の保育園入園選考で使われる基本指数と調整指数の仕組みを解説します。",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>守口市の利用調整指数とは</h2>
<p>守口市の認可保育園の入園選考は「父の基本指数 + 母の基本指数 + 調整指数」の合計で行われます。基本指数は父母それぞれ最大20点で、合計40点満点です。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>利用調整指数 = 基本指数（保護者1 + 保護者2）+ 調整指数</p>
</div>

<h2>基本指数（父母各最大20点、合計40点）</h2>
<p>就労の場合、月160時間以上なら満点の<span class="highlight">20点</span>です。就労時間が短くなるにつれて点数が下がります。</p>

<table>
<tr><th>保育が必要な理由</th><th>条件</th><th>基本指数</th></tr>
<tr><td>就労</td><td>月160時間以上</td><td>20</td></tr>
<tr><td>就労</td><td>月120〜160時間</td><td>18</td></tr>
<tr><td>就労</td><td>月100〜120時間</td><td>16</td></tr>
<tr><td>就労</td><td>月80〜100時間</td><td>14</td></tr>
<tr><td>就労</td><td>月64〜80時間</td><td>12</td></tr>
<tr><td>疾病</td><td>入院・常時病臥</td><td>20</td></tr>
<tr><td>障害</td><td>身体1・2級／療育A</td><td>20</td></tr>
<tr><td>出産</td><td>産前2ヶ月〜産後8週</td><td>20</td></tr>
<tr><td>求職活動</td><td>就労内定あり</td><td>10</td></tr>
<tr><td>求職活動</td><td>求職活動中</td><td>5</td></tr>
</table>

<h2>調整指数の代表例</h2>
<ul>
<li>ひとり親世帯：<span class="highlight">+5点</span></li>
<li>きょうだい在園：<span class="highlight">+3点</span></li>
<li>認可外利用：<span class="highlight">+3点</span></li>
<li>生活保護：<span class="highlight">+3点</span></li>
<li>同時申込：<span class="highlight">+2点</span></li>
<li>育休復帰：<span class="highlight">+2点</span></li>
<li>同居祖父母：<span class="highlight">-3点</span></li>
<li>転園希望：<span class="highlight">-5点</span></li>
<li>市外在住：<span class="highlight">-10点</span></li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>全項目は<a href="https://www.city.moriguchi.osaka.jp/" target="_blank" rel="noopener">守口市公式サイト</a>の利用調整基準表で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 60,
  },
  {
    slug: "score-up-tips",
    citySlug: "moriguchi",
    title: "守口市の加点のコツ　点数アップ戦略と調整指数の活用法",
    description:
      "守口市の保育園入園選考で調整指数の加点を最大限に活用する方法を解説します。",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>基本指数40点は出発点</h2>
<p>守口市ではフルタイム共働き世帯は基本指数<span class="highlight">40点</span>で横並びです。差がつくのは調整指数の加点です。</p>

<h2>加点チェックリスト</h2>
<table>
<tr><th>項目</th><th>点数</th><th>条件</th></tr>
<tr><td>ひとり親世帯</td><td>+5</td><td>母子家庭・父子家庭で就労中</td></tr>
<tr><td>きょうだい在園</td><td>+3</td><td>希望園にきょうだいが在園中</td></tr>
<tr><td>認可外利用</td><td>+3</td><td>認可外保育施設に月極で預託中</td></tr>
<tr><td>生活保護</td><td>+3</td><td>生活保護受給世帯</td></tr>
<tr><td>同時申込</td><td>+2</td><td>きょうだいを同時に申し込む</td></tr>
<tr><td>育休復帰</td><td>+2</td><td>入園月中に職場復帰</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>守口市は0〜5歳児の保育料無償化で注目されている自治体です。近年は子育て世帯の流入が増えており、特に0〜2歳児クラスの競争率が上がっています。きょうだい加点+3や認可外利用+3を活用して差をつけましょう。</p>
</div>

<h2>減点に注意</h2>
<ul>
<li>市外在住：<span class="highlight">-10点</span></li>
<li>転園希望：<span class="highlight">-5点</span></li>
<li>同居祖父母：<span class="highlight">-3点</span></li>
</ul>
<p>同居の祖父母がいる場合は-3点の減点があります。祖父母に就労等の事情がある場合は証明書類を提出して減点を回避しましょう。</p>`,
    publishedAt: "2026-04-07",
    popularity: 58,
  },
  {
    slug: "free-childcare-system",
    citySlug: "moriguchi",
    title: "守口市の0〜5歳児保育料無償化制度を徹底解説",
    description:
      "守口市が独自に実施している0〜5歳児の保育料無償化制度の詳細と利用条件をまとめました。",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "保育料",
    categoryColor: "purple",
    content: `<h2>守口市の保育料無償化とは</h2>
<p>守口市は国の幼児教育・保育無償化（3〜5歳児）に加え、独自に<span class="highlight">0〜2歳児の保育料も無償化</span>している先進的な自治体です。この制度により、0〜5歳児すべての認可保育施設の保育料が無料になります。</p>

<h3>無償化の対象</h3>
<table>
<tr><th>年齢</th><th>制度</th><th>保育料</th></tr>
<tr><td>3〜5歳児</td><td>国の幼保無償化</td><td>無料</td></tr>
<tr><td>0〜2歳児</td><td>守口市独自制度</td><td>無料</td></tr>
</table>

<h3>注意点</h3>
<ul>
<li>給食費（副食費）は別途負担が必要な場合があります</li>
<li>延長保育料は無償化の対象外です</li>
<li>認可外保育施設は上限額までの補助となります</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>0〜2歳児の保育料無償化は全国的にも珍しい制度です。大阪市や門真市など近隣自治体から守口市への転入を検討する子育て世帯が増えています。保育料の負担が大きい0〜2歳児のうちに入園を目指す方にとって大きなメリットです。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳しくは<a href="https://www.city.moriguchi.osaka.jp/" target="_blank" rel="noopener">守口市公式サイト</a>の保育料無償化に関するページをご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 52,
  },
  {
    slug: "nursery-visit-checklist",
    citySlug: "moriguchi",
    title: "守口市の保育園見学チェックリスト　見るべき10のポイント",
    description:
      "守口市の保育園見学で確認すべきポイントをチェックリスト形式でまとめました。",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>見学前に知っておくこと</h2>
<p>守口市には認可保育所・認定こども園・小規模保育事業所など約25か所の施設があります。京阪守口市駅・地下鉄守口駅・大日駅周辺に施設が集中しています。見学は6月〜9月に集中するため、早めに予約しましょう。</p>

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
<p>守口市は保育料無償化の影響で近年人気が高まっています。0〜2歳児クラスは特に競争率が高い傾向です。第1希望だけでなく複数の園を見学して希望順位を検討しましょう。京阪沿線とモノレール大日駅周辺は特に人気エリアです。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 42,
  },
  {
    slug: "ikukyu-hokatsu",
    citySlug: "moriguchi",
    title: "守口市で育休中の保活でやるべきこと　復帰までの準備",
    description:
      "守口市で育児休業中に進めるべき保活の手順と注意点をまとめました。",
    image: "https://images.unsplash.com/photo-1590650153855-d9e808231d41?w=800&h=400&fit=crop",
    category: "育休中の保活",
    categoryColor: "purple",
    content: `<h2>育休中にやるべきこと</h2>
<p>育児休業中の保活は時間との勝負です。守口市の申込スケジュールに合わせて計画的に進めましょう。</p>

<h3>育休中の保活ステップ</h3>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>産後3か月頃：情報収集開始</strong>
<p>守口市の「保育所等利用申込案内」を入手し、近隣の保育園をリストアップします。守口市こども部保育幼稚園課に相談することもできます。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>産後5〜8か月頃：見学</strong>
<p>候補の園を見学します。守口市は京阪本線・谷町線・大阪モノレール沿線に施設が点在しています。通勤ルートを考慮して見学先を選びましょう。</p>
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
<p>守口市では育休から復帰する場合、調整指数で<span class="highlight">+2点</span>の加点があります。入園月中に職場復帰することが条件です。復帰日を会社と調整しておきましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>育児休業加点の詳細は<a href="https://www.city.moriguchi.osaka.jp/" target="_blank" rel="noopener">守口市公式サイト</a>の申込案内をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 50,
  },
  {
    slug: "small-nursery",
    citySlug: "moriguchi",
    title: "守口市の小規模保育園という選択肢　0〜2歳児の穴場",
    description:
      "守口市の小規模保育事業所のメリットと卒園後の進路について解説します。",
    image: "https://images.unsplash.com/photo-1576495199011-eb94736d05d6?w=800&h=400&fit=crop",
    category: "施設の種類",
    categoryColor: "teal",
    content: `<h2>小規模保育事業所とは</h2>
<p>守口市には0〜2歳児を対象にした小規模保育事業所があります。定員6〜19名の少人数保育で、家庭的な雰囲気が特徴です。</p>

<h3>小規模保育のメリット</h3>
<ul>
<li>少人数で手厚い保育が受けられる</li>
<li>認可保育園より競争率が低い場合がある</li>
<li>守口市の保育料無償化の対象で0〜2歳児も<span class="highlight">無料</span></li>
</ul>

<h3>卒園後の進路</h3>
<p>小規模保育事業所は2歳児までの施設のため、3歳以降は認可保育園や認定こども園への転園が必要です。守口市では連携施設への優先利用が調整されています。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>0〜2歳の間は小規模保育で手厚い保育を受け、3歳以降は認可保育園へ転園する戦略が有効です。守口市は保育料無償化により小規模保育でも費用負担が少ないのが魅力です。連携施設がどの園かを見学時に確認しておきましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>小規模保育事業所の一覧は<a href="https://www.city.moriguchi.osaka.jp/" target="_blank" rel="noopener">守口市公式サイト</a>に掲載されています。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 46,
  },
  {
    slug: "second-child-hokatsu",
    citySlug: "moriguchi",
    title: "守口市で二人目の保活で注意すること　きょうだい加点を活用",
    description:
      "守口市で二人目のお子さんの保活をする際の注意点ときょうだい加点の仕組みを解説します。",
    image: "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&h=400&fit=crop",
    category: "二人目の保活",
    categoryColor: "rose",
    content: `<h2>二人目の保活のポイント</h2>
<p>守口市では二人目の保活で「きょうだい加点」を活用することが重要です。上の子と同じ園に通わせたい場合はきょうだい加点が大きな味方になります。</p>

<h3>きょうだいに関する加点</h3>
<table>
<tr><th>条件</th><th>加点</th></tr>
<tr><td>希望する保育施設にきょうだいが在園中</td><td>+3</td></tr>
<tr><td>きょうだいを同時に申し込む</td><td>+2</td></tr>
</table>

<h3>同じ園に通わせるには</h3>
<p>上の子が通っている園を希望すれば<span class="highlight">+3点</span>の加点がもらえます。さらに同時申込なら+2点も加算されます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>守口市は保育料無償化で子育て世帯に人気があり、二人目・三人目を考える世帯も多い自治体です。きょうだい加点+3と同時申込+2を合わせると最大+5点になります。フルタイム共働き40点にこれらを加えて45点を確保できれば、かなり有利な状況です。</p>
</div>

<div class="info-box">
<p><strong>注意</strong></p>
<p>転園希望の場合は-5点の減点があります。上の子の園を変更したい場合は慎重に検討してください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 45,
  },
  {
    slug: "area-guide",
    citySlug: "moriguchi",
    title: "守口市のエリア別保育園ガイド　京阪・谷町線沿線の特徴",
    description:
      "守口市の京阪本線・地下鉄谷町線・大阪モノレール沿線のエリア別に保育園の状況をまとめました。",
    image: "https://images.unsplash.com/photo-1517732306149-e8f829eb588a?w=800&h=400&fit=crop",
    category: "エリア情報",
    categoryColor: "blue",
    content: `<h2>守口市の保育園エリア別ガイド</h2>
<p>守口市は大阪府北河内に位置し、人口約14.5万人のコンパクトな市です。京阪本線・地下鉄谷町線・大阪モノレールが通り、大阪市中心部へのアクセスが良好です。</p>

<h3>エリア別の特徴</h3>
<table>
<tr><th>エリア</th><th>最寄り駅</th><th>特徴</th></tr>
<tr><td>守口市駅周辺</td><td>京阪守口市駅</td><td>市の中心部。施設が多く選択肢が豊富</td></tr>
<tr><td>守口駅周辺</td><td>地下鉄守口駅</td><td>谷町線で梅田・天王寺方面に便利</td></tr>
<tr><td>大日駅周辺</td><td>地下鉄大日駅・モノレール大日駅</td><td>イオンモール大日があり子育て世帯に人気</td></tr>
<tr><td>南部エリア</td><td>太子橋今市駅</td><td>大阪市旭区に隣接。通勤利便性が高い</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>守口市は面積が約12.7平方キロメートルとコンパクトで、どのエリアからでも市内の保育園にアクセスしやすいのが特徴です。大日駅周辺は商業施設の充実と交通利便性から特に人気が高く、0歳児クラスの競争率が上がる傾向にあります。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>保育園の所在地は<a href="https://www.city.moriguchi.osaka.jp/" target="_blank" rel="noopener">守口市公式サイト</a>の保育施設一覧で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 40,
  },
  {
    slug: "rejection-options",
    citySlug: "moriguchi",
    title: "守口市で保育園に落ちたときの対処法　次にやるべきこと",
    description:
      "守口市の保育園入園で不承諾になった場合の対処法と次のステップをまとめました。",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop",
    category: "不承諾対策",
    categoryColor: "rose",
    content: `<h2>不承諾通知が届いたら</h2>
<p>守口市では4月一斉入所の1次選考結果が2月頃に届きます。不承諾だった場合でも、まだ選択肢はあります。</p>

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
<p>認可外に預けながら翌年度に再申込すると、認可外利用加点<span class="highlight">+3点</span>が加算されます。</p>
</div>
</div>

<h3>その他の選択肢</h3>
<ul>
<li>小規模保育事業所を検討する（0〜2歳児、保育料無償）</li>
<li>認定こども園の1号認定（教育部分）を利用する</li>
<li>企業主導型保育事業所を探す</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>守口市は保育料無償化の影響で人気が高まっており、不承諾になるケースもあります。認可外に預けながら翌年度に再申込すれば+3点の加点が得られます。早めに認可外の空きを確認しておくことが大切です。</p>
</div>

<div class="info-box">
<p><strong>空き状況の確認</strong></p>
<p>最新の空き状況は<a href="https://www.city.moriguchi.osaka.jp/" target="_blank" rel="noopener">守口市公式サイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 48,
  },
];

registerArticles(articles);
