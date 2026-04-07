import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  {
    slug: "hokatsu-schedule",
    citySlug: "ebetsu",
    title: "江別市の保活スケジュール　令和8年度4月入園の流れ",
    description:
      "江別市の令和8年度（2026年度）4月入園の申込時期・必要書類・結果通知の時期をまとめました。",
    image:
      "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>令和8年度（2026年度）4月入園のスケジュール</h2>
<p>江別市の4月入園申込は例年11月頃から受け付けられます。江別市子育て支援室が窓口です。</p>

<h3>申込の流れ</h3>
<table>
<tr><th>項目</th><th>日程（目安）</th></tr>
<tr><td>申請書類配布</td><td>2025年10月下旬〜</td></tr>
<tr><td>1次申込受付</td><td>2025年11月上旬〜12月上旬</td></tr>
<tr><td>1次結果通知</td><td>2026年2月上旬頃（郵送）</td></tr>
<tr><td>2次申込受付</td><td>2026年1月〜2月上旬</td></tr>
<tr><td>2次結果通知</td><td>2026年2月末〜3月上旬頃（郵送）</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>江別市では年度途中の入所も毎月受け付けています。希望する月の前月10日頃が締切になるため、早めの準備が大切です。</p>
</div>

<h2>いつから動き始めるべき？</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content"><strong>4月〜6月：情報収集</strong><p>江別市の公式サイトで前年度の資料を参考に準備を始めます。子育て支援室に相談するのもおすすめです。</p></div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content"><strong>6月〜10月：保育園見学</strong><p>気になる園に電話して見学予約を入れましょう。江別市は大麻・野幌・江別の3エリアに分かれるので、通勤経路も考慮して選びましょう。</p></div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content"><strong>10月〜11月：書類準備</strong><p>就労証明書を勤務先に依頼します。保育の利用申込書と支給認定申請書が必要です。</p></div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content"><strong>11月〜12月：申込</strong><p>江別市子育て支援室の窓口で期限内に必要書類を提出します。</p></div>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新情報は<a href="https://www.city.ebetsu.hokkaido.jp/site/kosodate/hoiku-riyou.html" target="_blank" rel="noopener">江別市公式サイト「保育所等の利用手続について」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 55,
  },
  {
    slug: "scoring-system-guide",
    citySlug: "ebetsu",
    title: "江別市の入園点数のしくみ　基本指数と調整指数をやさしく解説",
    description:
      "江別市の保育園入園選考で使われる点数制度の仕組みを、初めての方にもわかるように解説します。",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>点数制度の全体像</h2>
<p>江別市の認可保育施設は<strong>合計点数の高い世帯から優先</strong>して利用調整されます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>合計点数 ＝ 基本指数（父＋母）＋ 調整指数</p>
</div>

<h2>基本指数とは</h2>
<p>保護者それぞれの「保育を必要とする事由」を点数化したものです。1人あたり<span class="highlight">最大20点</span>（フルタイム就労の場合）で、父母の合算が基本指数になります。</p>
<table>
<tr><th>就労時間（月あたり）</th><th>基本指数</th></tr>
<tr><td>160時間以上（フルタイム）</td><td>20</td></tr>
<tr><td>140時間以上160時間未満</td><td>18</td></tr>
<tr><td>120時間以上140時間未満</td><td>16</td></tr>
<tr><td>100時間以上120時間未満</td><td>14</td></tr>
<tr><td>80時間以上100時間未満</td><td>12</td></tr>
<tr><td>64時間以上80時間未満</td><td>10</td></tr>
</table>

<h2>調整指数とは</h2>
<p>世帯の状況に応じて加点・減点される点数です。複数の項目に該当する場合はすべて加算されます。</p>
<table>
<tr><th>項目</th><th>点数</th></tr>
<tr><td>ひとり親世帯</td><td>+6</td></tr>
<tr><td>生活保護世帯</td><td>+6</td></tr>
<tr><td>小規模保育事業所等の卒園児</td><td>+8</td></tr>
<tr><td>保育士として認可保育施設に勤務</td><td>+6</td></tr>
<tr><td>きょうだいが希望園に在籍</td><td>+5</td></tr>
<tr><td>育休明け復職（入園月中）</td><td>+4</td></tr>
<tr><td>きょうだい同時申込み（同一園）</td><td>+3</td></tr>
<tr><td>65歳未満の祖父母と同居（保育可能）</td><td>-2</td></tr>
</table>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳細な利用調整基準は<a href="https://www.city.ebetsu.hokkaido.jp/site/kosodate/hoiku-riyou.html" target="_blank" rel="noopener">江別市公式サイト「保育所等の利用手続について」</a>からご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 60,
  },
  {
    slug: "katen-no-kotsu",
    citySlug: "ebetsu",
    title: "江別市で加点を最大化するコツ　調整指数を積み上げる方法",
    description:
      "江別市の保育園入園選考で有利になる調整指数の加点項目と、活用のポイントを解説します。",
    image:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>基本指数40がスタートライン</h2>
<p>江別市では父母ともフルタイム勤務（月160時間以上）であれば基本指数は<span class="highlight">20＋20＝40</span>になります。多くの家庭がこの水準になるため、差を分けるのは調整指数です。</p>

<h2>主な加点項目と活用のポイント</h2>

<h3>1. 小規模保育事業所等の卒園児（+8点）</h3>
<p>2歳児クラスまでの小規模保育事業所や事業所内保育を卒園して3歳児クラスに入園する場合、大きな加点が得られます。</p>

<h3>2. ひとり親世帯（+6点）</h3>
<p>児童扶養手当を受給（申請）している場合が対象です。</p>

<h3>3. 保育士として勤務（+6点）</h3>
<p>江別市内の認可保育施設で保育士・保育教諭として就労している、または就労予定の場合に加点されます。</p>

<h3>4. きょうだいが希望園に在籍（+5点）</h3>
<p>上の子が希望する園にすでに入所している場合に加算されます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>フルタイム共働き＋きょうだい在園＋育休明けの場合：基本指数40＋きょうだい5＋育休明け4＝<span class="highlight">合計49点</span>。この水準であれば多くの園で有利に選考が進みます。</p>
</div>

<h2>同点の場合の優先順位</h2>
<p>合計点数が同じ場合は、以下の順で優先されます。</p>
<ol>
<li>基本指数の合計が高い世帯</li>
<li>きょうだいが希望施設に在籍している</li>
<li>ひとり親世帯</li>
<li>多子世帯</li>
<li>世帯の状況を総合的に判断</li>
</ol>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>利用調整基準の詳細は<a href="https://www.city.ebetsu.hokkaido.jp/site/kosodate/hoiku-riyou.html" target="_blank" rel="noopener">江別市公式サイト</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 55,
  },
  {
    slug: "ninka-vs-ninkagai",
    citySlug: "ebetsu",
    title: "江別市の認可保育園と認可外保育施設の違い　選び方ガイド",
    description:
      "江別市で保育園を選ぶとき知っておきたい、認可保育園と認可外保育施設の違いをまとめました。",
    image:
      "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&h=400&fit=crop",
    category: "保育園選び",
    categoryColor: "teal",
    content: `<h2>認可保育園とは</h2>
<p>国が定めた基準（面積、保育士数、設備など）を満たし、江別市が認可した保育施設です。保育料は世帯の所得に応じて決まり、3歳以上は無償化の対象です。</p>

<h3>江別市の認可保育施設の種類</h3>
<table>
<tr><th>種類</th><th>特徴</th></tr>
<tr><td>認可保育所</td><td>0〜5歳児。最も一般的な保育施設</td></tr>
<tr><td>認定こども園</td><td>教育と保育を一体的に提供。1号（教育）と2号・3号（保育）がある</td></tr>
<tr><td>小規模保育事業</td><td>0〜2歳児。定員6〜19人の少人数保育</td></tr>
<tr><td>事業所内保育事業</td><td>企業が主に従業員向けに設置。地域枠あり</td></tr>
</table>

<p>江別市内には認可保育所・認定こども園を合わせて約20か所の保育施設があります。大麻地区、野幌地区、江別地区にそれぞれ分布しています。</p>

<h2>認可外保育施設とは</h2>
<p>認可基準を満たしていないか、あえて認可を受けていない保育施設です。利用調整（選考）がなく、施設と直接契約します。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>認可外保育施設は利用調整がないため、認可園に入れなかった場合のセーフティネットとして利用できます。0〜2歳の住民税非課税世帯は月額42,000円まで無償化の対象です。</p>
</div>

<h2>どちらを選ぶべき？</h2>
<ul>
<li><strong>保育料を抑えたい</strong> → 認可保育園（3歳以上は無償）</li>
<li><strong>すぐに預けたい</strong> → 認可外保育施設（選考なし）</li>
<li><strong>少人数保育を希望</strong> → 小規模保育事業や認可外</li>
<li><strong>教育も重視</strong> → 認定こども園</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>江別市内の保育施設一覧は<a href="https://www.city.ebetsu.hokkaido.jp/site/kosodate/hoiku-riyou.html" target="_blank" rel="noopener">江別市公式サイト「保育所等の利用手続について」</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 45,
  },
  {
    slug: "kengaku-checklist",
    citySlug: "ebetsu",
    title: "江別市の保育園見学チェックリスト　見るべきポイント15選",
    description:
      "江別市で保育園見学に行く前に知っておきたい、チェックすべきポイントをまとめました。",
    image:
      "https://images.unsplash.com/photo-1524813686514-a57563d77965?w=800&h=400&fit=crop",
    category: "保育園選び",
    categoryColor: "teal",
    content: `<h2>見学前の準備</h2>
<p>江別市では例年6月〜10月が見学シーズンです。希望する園に電話で見学予約を入れましょう。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>江別市は札幌市に隣接しており、JR函館本線で通勤する方も多い街です。駅からのアクセスや駐車場の広さ、冬場の除雪状況も園選びの重要なポイントです。</p>
</div>

<h2>見学チェックリスト</h2>
<h3>施設環境</h3>
<ul>
<li>園舎の清潔さ・安全対策（階段、窓、角）</li>
<li>園庭の広さ・遊具の状態</li>
<li>冬季の室内遊びスペース</li>
<li>駐車場の台数と冬場の除雪状況</li>
<li>セキュリティ（玄関施錠、防犯カメラ）</li>
</ul>

<h3>保育内容</h3>
<ul>
<li>1日のスケジュール</li>
<li>外遊びの頻度（冬場を含む）</li>
<li>給食の内容とアレルギー対応</li>
<li>お昼寝の環境と見守り体制</li>
<li>行事・イベントの年間予定</li>
</ul>

<h3>職員・運営</h3>
<ul>
<li>保育士の人数と年齢構成</li>
<li>先生の子どもへの接し方・雰囲気</li>
<li>延長保育の対応時間と料金</li>
<li>急な発熱時の対応方針</li>
<li>保護者との連絡方法（アプリ・連絡帳）</li>
</ul>

<div class="info-box">
<p><strong>江別市ならではのチェックポイント</strong></p>
<p>江別市は冬場の積雪が多い地域です。暖房設備の種類や室温管理に加え、冬場の送迎動線・玄関の雪対策は必ず確認しましょう。大学が多い学園都市のため、学生ボランティアを受け入れている園もあります。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 45,
  },
  {
    slug: "ikukyu-hokatsu",
    citySlug: "ebetsu",
    title: "育休中の保活ガイド　江別市で育休明け入園を成功させるコツ",
    description:
      "江別市で育休中に保活を進めるスケジュールと、育休明け加点（+4点）を活かす方法を解説します。",
    image:
      "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>育休明け加点は+4点</h2>
<p>江別市では入園月中に育児休業から復職する場合、調整指数として<span class="highlight">+4点</span>が加算されます。フルタイム共働き世帯なら基本指数40＋育休明け4＝<span class="highlight">合計44点</span>になります。</p>

<h2>育休中の保活スケジュール</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content"><strong>産後〜6か月：情報収集</strong><p>江別市の公式サイトで保育施設一覧と前年度のしおりを確認します。子育て支援室への相談もおすすめです。</p></div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content"><strong>生後6か月〜：保育園見学</strong><p>気になる園に電話して見学予約。3〜5園は見学しましょう。江別市内は大麻・野幌・江別の3エリアで選ぶのが効率的です。</p></div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content"><strong>10月頃：書類準備</strong><p>就労証明書を勤務先に依頼。育休中でも勤務先に在籍していることが必要です。</p></div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content"><strong>11月：申込</strong><p>江別市子育て支援室の窓口に書類を提出します。</p></div>
</div>

<h2>2025年4月〜育休給付金延長の審査厳格化</h2>
<p>2025年4月から育児休業給付金の延長審査が厳格化されています。「速やかな職場復帰のために保育所の利用申込をした」と認められることが必要です。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>通勤可能な範囲の園を複数希望し、真剣に入園を目指している方は影響を受けません。江別市では利用調整の結果、入所できなかった場合の保留通知書を使って育休延長の手続きができます。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>育休給付金延長の詳細は<a href="https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/0000160564_00040.html" target="_blank" rel="noopener">厚生労働省「育児休業給付金の支給対象期間延長手続き」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 50,
  },
  {
    slug: "shokibo-hoikuen",
    citySlug: "ebetsu",
    title: "江別市の小規模保育園ガイド　卒園後+8点の加点を活かす戦略",
    description:
      "江別市の小規模保育事業の特徴と、卒園後に+8点の調整加点が得られるメリットを解説します。",
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop",
    category: "保育園選び",
    categoryColor: "teal",
    content: `<h2>小規模保育事業とは</h2>
<p>0〜2歳児を対象とした定員6〜19人の小さな保育施設です。少人数のため手厚い保育が受けられるのが特徴です。</p>

<h2>卒園後の大きなメリット：+8点</h2>
<p>江別市では小規模保育事業所や事業所内保育の卒園児に<span class="highlight">+8点</span>の調整指数が加算されます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>フルタイム共働き＋卒園児加点の場合：基本指数40＋卒園児8＝<span class="highlight">合計48点</span>。江別市の利用調整では非常に高い点数となるため、3歳以降の認可保育園への入園がかなり有利になります。</p>
</div>

<h2>連携施設について</h2>
<p>江別市では、小規模保育事業所を卒園後に連携施設への入所を希望する場合、優先的に利用調整されます。入所前に連携施設がどの園かを確認しておきましょう。</p>

<h2>小規模保育園を選ぶ際の注意点</h2>
<ul>
<li>3歳以降は別の園に移る必要がある（転園先の準備が必要）</li>
<li>園庭がない施設もある（近隣の公園を利用）</li>
<li>連携施設が希望のエリアにあるか事前に確認</li>
<li>江別市は冬場の通園を考慮し、自宅や職場から近い園を選ぶのが重要</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>江別市内の保育施設一覧は<a href="https://www.city.ebetsu.hokkaido.jp/site/kosodate/hoiku-riyou.html" target="_blank" rel="noopener">江別市公式サイト「保育所等の利用手続について」</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 40,
  },
  {
    slug: "futarime-hokatsu",
    citySlug: "ebetsu",
    title: "江別市で二人目の保活　きょうだい加点+5と多子加点を活用",
    description:
      "江別市で二人目の保活をする際のきょうだい在園加点（+5）や多子家庭加点の仕組みを解説します。",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>きょうだい在園で+5点</h2>
<p>江別市では上の子が希望する園にすでに在籍している場合、下の子の利用調整で<span class="highlight">+5点</span>の調整指数が加算されます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>フルタイム共働き＋きょうだい在園＋育休明けの場合：基本指数40＋きょうだい5＋育休明け4＝<span class="highlight">合計49点</span>。同じ園を希望する場合は同点時の優先順位でも有利になります。</p>
</div>

<h2>きょうだい同時申込み加点</h2>
<p>きょうだいを同時に申込みし、同一園を希望する場合は+3点が加算されます。きょうだい在園加点とは別の項目です。</p>

<h2>多子家庭加点</h2>
<p>18歳未満の児童を3人以上養育している世帯の第3子以降は+2点が加算されます。きょうだい在園加点と併用できます。</p>

<h2>同じ園に入るためのポイント</h2>
<p>江別市では同点の場合の優先順位として「きょうだいが希望施設に在籍している」が上位に設定されています。上の子と同じ園を希望すると、同点の場合にも有利です。</p>

<h2>保育料の多子軽減</h2>
<p>江別市では多子軽減制度があり、第2子以降の保育料が軽減されます。3歳以上は無償化、0〜2歳も第2子以降は保育料が減額されます。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新の利用調整基準は<a href="https://www.city.ebetsu.hokkaido.jp/site/kosodate/hoiku-riyou.html" target="_blank" rel="noopener">江別市公式サイト「保育所等の利用手続について」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 50,
  },
  {
    slug: "hoikuryo-guide",
    citySlug: "ebetsu",
    title: "江別市の保育料ガイド　世帯年収別の目安と軽減制度",
    description:
      "江別市の保育料の決まり方、無償化の範囲、多子軽減やひとり親世帯向け軽減制度をわかりやすく解説します。",
    image:
      "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>保育料の決まり方</h2>
<p>江別市の保育料は<strong>市町村民税の所得割額</strong>に基づいて階層で設定されます。世帯の課税状況によって月額が決まります。</p>

<h2>3歳以上は無償</h2>
<p>2019年10月からの幼児教育・保育の無償化により、3歳〜5歳児クラスの保育料は<span class="highlight">0円</span>です。ただし給食費（副食費）は別途かかります。</p>

<h2>0〜2歳の保育料の目安</h2>
<table>
<tr><th>階層</th><th>所得割額の目安</th><th>月額（目安）</th></tr>
<tr><td>生活保護・非課税世帯</td><td>0円</td><td>0円</td></tr>
<tr><td>低所得層</td><td>所得割額48,600円未満</td><td>約7,000〜8,000円</td></tr>
<tr><td>中間層</td><td>所得割額97,000〜169,000円</td><td>約25,000〜44,000円</td></tr>
<tr><td>高所得層</td><td>所得割額397,000円以上</td><td>約60,000〜70,000円</td></tr>
</table>

<h2>軽減制度</h2>
<h3>多子軽減</h3>
<p>きょうだいがいる場合、第2子以降の保育料が軽減されます。</p>

<h3>ひとり親世帯向け軽減</h3>
<p>ひとり親世帯は保育料が大幅に軽減されます。住民税非課税世帯は0円、低所得層も減額の対象です。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>江別市は札幌市に比べて住居費が抑えられるため、子育て世帯にとって家計全体の負担が軽くなるメリットがあります。保育料と住居費を合わせてトータルで比較しましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>保育料の詳細は<a href="https://www.city.ebetsu.hokkaido.jp/site/kosodate/hoiku-riyou.html" target="_blank" rel="noopener">江別市公式サイト「保育所等の利用手続について」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 45,
  },
  {
    slug: "ochita-toki-sentakushi",
    citySlug: "ebetsu",
    title: "江別市で保育園に落ちたときの対処法　次にやるべきこと",
    description:
      "江別市の1次利用調整で入所できなかった場合の選択肢と、次にとるべきアクションをまとめました。",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>利用調整で入所できなかったら</h2>
<p>1次利用調整で入所できなくても、まだ選択肢はあります。落ち着いて次の手を打ちましょう。</p>

<h2>選択肢1：2次利用調整に申し込む</h2>
<p>1次で辞退が出た枠で再度利用調整が行われます。江別市では2次の申込期限は2月上旬頃、結果は2月末〜3月上旬に通知されます。希望園の変更・追加も可能です。</p>

<h2>選択肢2：年度途中入園を申し込む</h2>
<p>江別市では毎月の利用調整があり、空きが出れば途中入園できます。前月10日頃が申込期限なので、毎月忘れずに確認しましょう。</p>

<h2>選択肢3：認可外保育施設を利用する</h2>
<p>認可外保育施設は利用調整がないため、空きがあればすぐに入れます。復職して次年度に再挑戦する戦略として有効です。</p>

<h2>選択肢4：育児休業を延長する</h2>
<p>利用調整の結果、入所できなかった場合の通知書があれば育児休業を延長できます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>江別市は人口約12万人の中規模都市で、札幌市に比べると保育園の競争率はやや緩やかです。希望園を柔軟に見直せば、途中入園のチャンスは十分にあります。</p>
</div>

<h2>次年度に向けた準備</h2>
<ul>
<li>希望園を見直す（大麻・野幌・江別の各エリアで検討）</li>
<li>小規模保育事業も視野に入れる（卒園後+8点の加点あり）</li>
<li>家庭の状況変化（転職、引越し等）で点数が変わる可能性を確認</li>
<li>札幌市への通勤がメインなら、JR沿線の園を中心に検討</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新の空き状況は<a href="https://www.city.ebetsu.hokkaido.jp/site/kosodate/hoiku-riyou.html" target="_blank" rel="noopener">江別市公式サイト「保育所等の利用手続について」</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 40,
  },
];

registerArticles(articles);
