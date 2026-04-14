import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  {
    slug: "hokatsu-schedule",
    citySlug: "obihiro",
    title: "帯広市の保活スケジュール　令和8年度4月入園の流れ",
    description:
      "帯広市の令和8年度（2026年度）4月入園の申込時期・必要書類・結果通知の時期をまとめました。",
    image:
      "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>令和8年度（2026年度）4月入園のスケジュール</h2>
<p>帯広市の4月入園申込は例年10月頃から受け付けられます。帯広市こども未来部子育て支援課が窓口です。</p>

<h3>申込の流れ</h3>
<table>
<tr><th>項目</th><th>日程（目安）</th></tr>
<tr><td>申請書類配布</td><td>2025年10月上旬〜</td></tr>
<tr><td>1次申込受付</td><td>2025年10月中旬〜11月中旬</td></tr>
<tr><td>1次結果通知</td><td>2026年1月下旬頃（郵送）</td></tr>
<tr><td>2次申込受付</td><td>2026年1月〜2月上旬</td></tr>
<tr><td>2次結果通知</td><td>2026年2月下旬〜3月上旬頃（郵送）</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>帯広市では年度途中の入所も毎月受け付けています。希望月の前月10日頃が申込期限になるため、早めの準備が大切です。</p>
</div>

<h2>いつから動き始めるべき？</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content"><strong>4月〜6月：情報収集</strong><p>帯広市こども未来部子育て支援課の公式サイトで前年度の資料を参考に準備を始めます。</p></div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content"><strong>6月〜9月：保育園見学</strong><p>気になる園に電話して見学予約を入れましょう。帯広市は認可保育園が約25か所あり、エリアを絞って効率よく回りましょう。</p></div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content"><strong>9月〜10月：書類準備</strong><p>就労証明書を勤務先に依頼します。保育の利用申込書と支給認定申請書が必要です。</p></div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content"><strong>10月〜11月：申込</strong><p>帯広市役所の窓口で期限内に必要書類を提出します。</p></div>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新情報は<a href="https://www.city.obihiro.hokkaido.jp/kyoiku/kosodate/hoiku/1010107.html" target="_blank" rel="noopener">帯広市公式サイト「保育所・認定こども園等」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 55,
  },
  {
    slug: "scoring-system-guide",
    citySlug: "obihiro",
    title: "帯広市の入園点数のしくみ　基本点数と調整点数をやさしく解説",
    description:
      "帯広市の保育園入園選考で使われる点数制度の仕組みを、初めての方にもわかるように解説します。",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>点数制度の全体像</h2>
<p>帯広市の認可保育施設は<strong>合計点数の高い世帯から優先</strong>して利用調整されます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>合計点数 ＝ 基本点数（父＋母）＋ 調整点数</p>
</div>

<h2>基本点数とは</h2>
<p>保護者それぞれの「保育を必要とする事由」を点数化したものです。1人あたり<span class="highlight">最大20点</span>（フルタイム就労の場合）で、父母の合算が基本点数になります。</p>
<table>
<tr><th>就労時間（月あたり）</th><th>基本点数</th></tr>
<tr><td>160時間以上（フルタイム）</td><td>20</td></tr>
<tr><td>120時間以上160時間未満</td><td>18</td></tr>
<tr><td>80時間以上120時間未満</td><td>16</td></tr>
<tr><td>64時間以上80時間未満</td><td>14</td></tr>
<tr><td>48時間以上64時間未満</td><td>12</td></tr>
</table>

<h2>調整点数とは</h2>
<p>世帯の状況に応じて加減される点数です。複数の項目に該当する場合はすべて加算されます。</p>
<table>
<tr><th>項目</th><th>点数</th></tr>
<tr><td>きょうだいと同じ施設のみ希望</td><td>+10</td></tr>
<tr><td>小規模保育事業等の卒園児</td><td>+5</td></tr>
<tr><td>保育士等として認可保育施設に勤務</td><td>+5</td></tr>
<tr><td>ひとり親家庭</td><td>+3</td></tr>
<tr><td>きょうだい在園（1人）</td><td>+3</td></tr>
<tr><td>就学前児童が他にいる（1人あたり）</td><td>+2</td></tr>
<tr><td>申し込み児童に障害等がある</td><td>+2</td></tr>
</table>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳細な利用調整基準は<a href="https://www.city.obihiro.hokkaido.jp/kyoiku/kosodate/hoiku/1010107.html" target="_blank" rel="noopener">帯広市こども未来部子育て支援課</a>にお問い合わせください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 60,
  },
  {
    slug: "katen-no-kotsu",
    citySlug: "obihiro",
    title: "帯広市で加点を最大化するコツ　調整点数を積み上げる方法",
    description:
      "帯広市の保育園入園選考で有利になる調整点数の加点項目と、活用のポイントを解説します。",
    image:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>基本点数40がスタートライン</h2>
<p>帯広市では父母ともフルタイム勤務（月160時間以上）であれば基本点数は<span class="highlight">20＋20＝40</span>になります。多くの家庭がこの水準になるため、差を分けるのは調整点数です。</p>

<h2>主な加点項目と活用のポイント</h2>

<h3>1. きょうだいと同じ施設のみ希望（+10点）</h3>
<p>上の子が在園中の保育施設のみを希望する場合、大きな加点があります。送迎の効率を考えても同じ園にまとめるメリットは大きいです。</p>

<h3>2. 小規模保育事業等の卒園児（+5点）</h3>
<p>地域型保育事業の卒園児には+5点が加算されます。0〜2歳で小規模保育園に入り、3歳以降の転園時に加点を活用する戦略が有効です。</p>

<h3>3. 保育士勤務（+5点）</h3>
<p>帯広市内の認可保育施設で保育士等として勤務する保護者には+5点の加算があります。</p>

<h3>4. きょうだい在園（+3〜6点）</h3>
<p>認可保育施設にきょうだいが在園中の場合、1人で+3点、2人以上で+6点が加算されます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>フルタイム共働き＋きょうだい同施設希望＋きょうだい在園の場合：基本40＋同施設10＋きょうだい3＝<span class="highlight">合計53点</span>。この水準であれば多くの園で有利に選考が進みます。</p>
</div>

<h2>同点の場合の優先順位</h2>
<p>合計点数が同じ場合は、以下のような要素で優先順位が決まります。</p>
<ol>
<li>ひとり親家庭</li>
<li>きょうだいが同一施設に在園中</li>
<li>保育の必要性が高い世帯</li>
<li>世帯状況等から総合的に判断</li>
</ol>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>同点時の優先順位の詳細は帯広市こども未来部子育て支援課（0155-65-4158）にお問い合わせください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 55,
  },
  {
    slug: "ninka-vs-ninkagai",
    citySlug: "obihiro",
    title: "帯広市の認可保育園と認可外保育施設の違い　選び方ガイド",
    description:
      "帯広市で保育園を選ぶとき知っておきたい、認可保育園と認可外保育施設の違いをまとめました。",
    image:
      "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&h=400&fit=crop",
    category: "保育園選び",
    categoryColor: "teal",
    content: `<h2>認可保育園とは</h2>
<p>国が定めた基準（面積、保育士数、設備など）を満たし、帯広市が認可した保育施設です。保育料は世帯の所得に応じて決まり、3歳以上は無償化の対象です。帯広市には認可保育園が約25か所あります。</p>

<h3>帯広市の認可保育施設の種類</h3>
<table>
<tr><th>種類</th><th>特徴</th></tr>
<tr><td>認可保育所</td><td>0〜5歳児。最も一般的な保育施設</td></tr>
<tr><td>認定こども園</td><td>教育と保育を一体的に提供。1号（教育）と2号・3号（保育）がある</td></tr>
<tr><td>小規模保育事業</td><td>0〜2歳児。定員6〜19人の少人数保育</td></tr>
<tr><td>事業所内保育事業</td><td>企業が主に従業員向けに設置。地域枠あり</td></tr>
</table>

<h2>認可外保育施設とは</h2>
<p>認可基準を満たしていないか、あえて認可を受けていない保育施設です。利用調整（選考）がなく、施設と直接契約します。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>認可外保育施設は利用調整がないため、認可園に入れなかった場合のセーフティネットとして利用できます。帯広市では0〜2歳の住民税非課税世帯は月額42,000円まで無償化の対象です。</p>
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
<p>帯広市内の保育施設一覧は<a href="https://www.city.obihiro.hokkaido.jp/kyoiku/kosodate/hoiku/1010107.html" target="_blank" rel="noopener">帯広市公式サイト「保育所・認定こども園等」</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 45,
  },
  {
    slug: "kengaku-checklist",
    citySlug: "obihiro",
    title: "帯広市の保育園見学チェックリスト　見るべきポイント15選",
    description:
      "帯広市で保育園見学に行く前に知っておきたい、チェックすべきポイントをまとめました。",
    image:
      "https://images.unsplash.com/photo-1524813686514-a57563d77965?w=800&h=400&fit=crop",
    category: "保育園選び",
    categoryColor: "teal",
    content: `<h2>見学前の準備</h2>
<p>帯広市では例年6月〜9月が見学シーズンです。希望する園に電話で見学予約を入れましょう。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>帯広市は十勝平野の中心に位置し、冬は厳しい寒さになります。冬場の通園を想定した園選びが重要です。駐車場の広さや除雪状況も確認しましょう。</p>
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
<p><strong>帯広市ならではの確認ポイント</strong></p>
<p>帯広市は冬場マイナス20℃以下になることもあります。暖房設備の種類や室温管理、冬場の送迎動線は必ず確認しましょう。また、十勝の食材を活かした給食を提供する園も多いので、食育への取り組みも聞いてみてください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 45,
  },
  {
    slug: "ikukyu-hokatsu",
    citySlug: "obihiro",
    title: "育休中の保活ガイド　帯広市で育休明け入園を成功させるコツ",
    description:
      "帯広市で育休中に保活を進めるスケジュールと、入園を有利にする方法を解説します。",
    image:
      "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>育休明けの入園戦略</h2>
<p>帯広市では父母ともフルタイム就労であれば基本点数は40点になります。育休中でも勤務先に在籍していれば就労として基本点数が計算されるため、復帰予定であることを申込書類で明確にしましょう。</p>

<h2>育休中の保活スケジュール</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content"><strong>産後〜6か月：情報収集</strong><p>帯広市こども未来部子育て支援課の公式サイトで保育施設一覧と前年度のしおりを確認します。</p></div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content"><strong>生後6か月〜：保育園見学</strong><p>気になる園に電話して見学予約。3〜5園は見学しましょう。帯広市は車社会なので、通勤経路上の園も含めて検討しましょう。</p></div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content"><strong>9月頃：書類準備</strong><p>就労証明書を勤務先に依頼。育休中でも勤務先に在籍していることが必要です。</p></div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content"><strong>10月〜11月：申込</strong><p>帯広市役所の窓口に書類を提出します。</p></div>
</div>

<h2>2025年4月〜育休給付金延長の審査厳格化</h2>
<p>2025年4月から育児休業給付金の延長審査が厳格化されています。「速やかな職場復帰のために保育所の利用申込をした」と認められることが必要です。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>通勤可能な範囲の園を複数希望し、真剣に入園を目指している方は影響を受けません。帯広市では利用調整の結果、入所できなかった場合の保留通知書を使って育休延長の手続きができます。</p>
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
    citySlug: "obihiro",
    title: "帯広市の小規模保育園ガイド　卒園後+5点の加点を活かす戦略",
    description:
      "帯広市の小規模保育事業の特徴と、卒園後に+5点の調整加点が得られるメリットを解説します。",
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop",
    category: "保育園選び",
    categoryColor: "teal",
    content: `<h2>小規模保育事業とは</h2>
<p>0〜2歳児を対象とした定員6〜19人の小さな保育施設です。少人数のため手厚い保育が受けられるのが特徴です。帯広市にも複数の小規模保育事業所があります。</p>

<h2>卒園後のメリット：+5点</h2>
<p>帯広市では地域型保育事業（小規模保育所など）の卒園児に<span class="highlight">+5点</span>の調整点数が加算されます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>フルタイム共働き＋卒園児加点の場合：基本40＋卒園児5＝<span class="highlight">合計45点</span>。3歳以降の認可保育園への転園時に有利になります。</p>
</div>

<h2>連携施設について</h2>
<p>帯広市では、地域型保育事業を卒園後に連携施設への入所を希望する場合、優先的に利用調整が行われます。入所前に連携施設がどの園かを必ず確認しておきましょう。</p>

<h2>小規模保育園を選ぶ際の注意点</h2>
<ul>
<li>3歳以降は別の園に移る必要がある（転園先の準備が必要）</li>
<li>園庭がない施設もある（近隣の公園を利用）</li>
<li>連携施設が希望のエリアにあるか事前に確認</li>
<li>冬場の送迎を考慮して自宅・職場からの距離を確認</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>帯広市内の保育施設一覧は<a href="https://www.city.obihiro.hokkaido.jp/kyoiku/kosodate/hoiku/1010107.html" target="_blank" rel="noopener">帯広市公式サイト「保育所・認定こども園等」</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 40,
  },
  {
    slug: "futarime-hokatsu",
    citySlug: "obihiro",
    title: "帯広市で二人目の保活　きょうだい加点+3と同施設希望+10を活用",
    description:
      "帯広市で二人目の保活をする際のきょうだい在園加点（+3）や同施設希望加点（+10）の仕組みを解説します。",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>きょうだい在園で+3点</h2>
<p>帯広市では上の子が認可保育施設にすでに入所している場合、下の子の利用調整で<span class="highlight">+3点</span>の調整点数が加算されます。2人以上在園中なら+6点です。</p>

<h2>同じ施設のみ希望で+10点</h2>
<p>きょうだいが在園中の施設のみを希望する場合、さらに<span class="highlight">+10点</span>が加算されます。これは帯広市の調整点数の中で最も大きな加点項目です。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>フルタイム共働き＋きょうだい在園＋同施設希望の場合：基本40＋きょうだい3＋同施設10＝<span class="highlight">合計53点</span>。非常に有利な点数になります。</p>
</div>

<h2>就学前児童の加点</h2>
<table>
<tr><th>条件</th><th>調整点数</th></tr>
<tr><td>申し込み児童以外に就学前児童が1人</td><td>+2</td></tr>
<tr><td>申し込み児童以外に就学前児童が2人</td><td>+4</td></tr>
<tr><td>申し込み児童以外に就学前児童が3人以上</td><td>+6</td></tr>
</table>
<p>きょうだい在園加点と就学前児童加点は併用できます。</p>

<h2>保育料の多子軽減</h2>
<p>帯広市では多子軽減制度があり、第2子以降の保育料が軽減されます。3歳以上は無償化の対象で、0〜2歳も第2子以降は保育料が減額されます。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>保育料の多子軽減の詳細は帯広市こども未来部子育て支援課（0155-65-4158）にお問い合わせください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 50,
  },
  {
    slug: "hoikuryo-guide",
    citySlug: "obihiro",
    title: "帯広市の保育料ガイド　世帯年収別の目安と軽減制度",
    description:
      "帯広市の保育料の決まり方、無償化の範囲、多子軽減やひとり親世帯向け軽減制度をわかりやすく解説します。",
    image:
      "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>保育料の決まり方</h2>
<p>帯広市の保育料は<strong>市町村民税の所得割額</strong>に基づいて階層ごとに設定されます。世帯の課税状況によって月額が決まります。</p>

<h2>3歳以上は無償</h2>
<p>2019年10月からの幼児教育・保育の無償化により、3歳〜5歳児クラスの保育料は<span class="highlight">0円</span>です。ただし給食費（副食費）は別途かかります。</p>

<h2>0〜2歳の保育料の目安</h2>
<table>
<tr><th>階層</th><th>所得割額の目安</th><th>月額（目安）</th></tr>
<tr><td>生活保護世帯</td><td>生活保護受給中</td><td>0円</td></tr>
<tr><td>非課税世帯</td><td>市民税非課税</td><td>0円</td></tr>
<tr><td>低所得層</td><td>所得割額48,600円未満</td><td>約7,000〜8,000円</td></tr>
<tr><td>中間層</td><td>所得割額97,000〜169,000円</td><td>約25,000〜44,000円</td></tr>
<tr><td>高所得層</td><td>所得割額397,000円以上</td><td>約60,000〜70,000円</td></tr>
</table>

<h2>軽減制度</h2>
<h3>多子軽減</h3>
<p>きょうだいがいる場合、第2子は半額、第3子以降は無料となります。</p>

<h3>ひとり親世帯向け軽減</h3>
<p>ひとり親世帯は保育料が軽減されます。市民税非課税世帯は0円、低所得のひとり親世帯も大幅に減額されます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>帯広市は豚丼やスイーツの街として知られていますが、子育て支援にも力を入れています。保育料の軽減制度を最大限活用しましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>保育料の詳細は<a href="https://www.city.obihiro.hokkaido.jp/kyoiku/kosodate/hoiku/1010107.html" target="_blank" rel="noopener">帯広市公式サイト「保育所・認定こども園等」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 45,
  },
  {
    slug: "ochita-toki-sentakushi",
    citySlug: "obihiro",
    title: "帯広市で保育園に落ちたときの対処法　次にやるべきこと",
    description:
      "帯広市の1次利用調整で入所できなかった場合の選択肢と、次にとるべきアクションをまとめました。",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>利用調整で入所できなかったら</h2>
<p>1次利用調整で入所できなくても、まだ選択肢はあります。落ち着いて次の手を打ちましょう。</p>

<h2>選択肢1：2次利用調整に申し込む</h2>
<p>1次で辞退が出た枠で再度利用調整が行われます。帯広市では2次の申込期限は1月〜2月頃、結果は2月末〜3月上旬に通知されます。希望園の変更・追加も可能です。</p>

<h2>選択肢2：年度途中入園を申し込む</h2>
<p>帯広市では毎月の利用調整があり、空きが出れば途中入園できます。前月10日頃が申込期限なので、毎月忘れずに確認しましょう。</p>

<h2>選択肢3：認可外保育施設を利用する</h2>
<p>認可外保育施設は利用調整がないため、空きがあればすぐに入れます。復職して次年度に再挑戦する戦略として有効です。</p>

<h2>選択肢4：育児休業を延長する</h2>
<p>利用調整の結果、入所できなかった場合の通知書があれば育児休業を延長できます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>帯広市は人口約16.5万人の都市で、認可保育園は約25か所あります。人気園に集中しがちですが、少し離れたエリアの園にも目を向けると空きが見つかることがあります。</p>
</div>

<h2>次年度に向けた準備</h2>
<ul>
<li>希望園を見直す（人気園以外も検討）</li>
<li>小規模保育事業も視野に入れる（卒園後+5点の加点あり）</li>
<li>家庭の状況変化（転職、引越し等）で点数が変わる可能性を確認</li>
<li>帯広市こども未来部子育て支援課に相談する</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>途中入園の空き状況は<a href="https://www.city.obihiro.hokkaido.jp/kyoiku/kosodate/hoiku/1010107.html" target="_blank" rel="noopener">帯広市公式サイト「保育所・認定こども園等」</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 40,
  },
];

registerArticles(articles);
