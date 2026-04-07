import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  {
    slug: "hokatsu-schedule",
    citySlug: "morioka",
    title: "盛岡市の保活スケジュール　令和8年度4月入園の流れ",
    description:
      "盛岡市の令和8年度（2026年度）4月入園の申込時期・必要書類・結果通知の時期をまとめました。",
    image:
      "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>令和8年度（2026年度）4月入園のスケジュール</h2>
<p>盛岡市の4月入園申込は例年11月から受け付けられます。申込先は子育てあんしん課入園係です。</p>

<h3>申込の流れ</h3>
<table>
<tr><th>項目</th><th>日程</th></tr>
<tr><td>1次選考受付</td><td>2025年11月4日〜12月26日</td></tr>
<tr><td>1次結果通知</td><td>2026年2月20日以降（郵送）</td></tr>
<tr><td>2次選考受付</td><td>2026年1月5日〜2月27日</td></tr>
<tr><td>2次結果通知</td><td>2026年3月中旬頃（郵送）</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>盛岡市では5月以降の年度途中入園も毎月受け付けています。入園希望月の前月上旬が締切で、結果は締切の約1週間後に電話で連絡されます。</p>
</div>

<h2>いつから動き始めるべき？</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content"><strong>4月〜6月：情報収集</strong><p>盛岡市の公式サイトで前年度の入園申込案内を参考に準備を始めます。</p></div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content"><strong>6月〜10月：保育園見学</strong><p>気になる園に電話して見学予約を入れましょう。盛岡市内には認可保育所・認定こども園・小規模保育事業所があります。</p></div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content"><strong>10月〜11月：書類準備</strong><p>就労証明書を勤務先に依頼します。入園申込書・健康状態調査票・教育保育給付受給資格認定申請書・マイナンバー確認書類が必要です。</p></div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content"><strong>11月〜12月：申込</strong><p>子育てあんしん課の窓口または郵送で期限内に提出します。</p></div>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新情報は<a href="https://www.city.morioka.iwate.jp/kosodate/kodomo_azukeru/1053010.html" target="_blank" rel="noopener">盛岡市公式サイト「令和8年度 保育施設入園・転園申込みについて」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 55,
  },
  {
    slug: "scoring-system-guide",
    citySlug: "morioka",
    title: "盛岡市の入園点数のしくみ　基本点数と調整点数をやさしく解説",
    description:
      "盛岡市の保育園入園選考で使われる点数制度の仕組みを、初めての方にもわかるように解説します。",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>点数制度の全体像</h2>
<p>盛岡市の認可保育施設は<strong>合計点数の高い世帯から優先</strong>して利用調整されます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>合計点数 ＝ 父の基本点数 ＋ 母の基本点数 ＋ 調整点数（加算・減算）</p>
</div>

<h2>基本点数とは</h2>
<p>保護者それぞれの「保育を必要とする事由」を点数化したものです。就労（外勤・自営業主）の場合、1人あたり<span class="highlight">最大20点</span>で、父母の合算が基本点数になります。</p>
<table>
<tr><th>就労時間（月あたり）</th><th>基本点数</th></tr>
<tr><td>160時間以上（フルタイム）</td><td>20</td></tr>
<tr><td>120時間以上160時間未満</td><td>18</td></tr>
<tr><td>80時間以上120時間未満</td><td>16</td></tr>
<tr><td>60時間以上80時間未満</td><td>14</td></tr>
<tr><td>48時間以上60時間未満</td><td>13</td></tr>
</table>

<h3>自営業専従者・家族従業者の場合</h3>
<p>自営業の専従者や家族従業者は外勤・自営業主よりやや低い点数になります。月160時間以上で17点です。</p>

<h3>内職の場合</h3>
<p>内職は月160時間以上で15点です。</p>

<h2>調整点数とは</h2>
<p>世帯の状況に応じて加算される点数です。複数の項目に該当する場合はすべて加算されます。</p>
<table>
<tr><th>項目</th><th>点数</th></tr>
<tr><td>盛岡市内の認可保育施設に勤務する保育士等</td><td>+30</td></tr>
<tr><td>きょうだいが入園中の施設のみ希望</td><td>+10</td></tr>
<tr><td>2歳クラスまでの保育施設の卒園児</td><td>+5</td></tr>
<tr><td>ひとり親家庭（母子・父子）</td><td>+3</td></tr>
<tr><td>きょうだいが保育施設に入園中（1人ごと）</td><td>+3</td></tr>
<tr><td>就学前児童がいる（1人ごと）</td><td>+2</td></tr>
</table>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳細な点数表は<a href="https://www.city.morioka.iwate.jp/_res/projects/default_project/_page_/001/053/010/R8tensuuhyou.pdf" target="_blank" rel="noopener">盛岡市保育施設利用調整基準 点数表（PDF）</a>からダウンロードできます。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 60,
  },
  {
    slug: "katen-no-kotsu",
    citySlug: "morioka",
    title: "盛岡市で加点を最大化するコツ　調整点数を積み上げる方法",
    description:
      "盛岡市の保育園入園選考で有利になる調整点数の加点項目と、活用のポイントを解説します。",
    image:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>基本点数40がスタートライン</h2>
<p>盛岡市では父母とも外勤フルタイム（月160時間以上）であれば基本点数は<span class="highlight">20＋20＝40</span>になります。多くの共働き家庭がこの水準になるため、差を分けるのは調整点数です。</p>

<h2>主な加点項目と活用のポイント</h2>

<h3>1. 保育施設勤務（+30点 / +28点）</h3>
<p>盛岡市内の認可保育施設に保育士・看護師等として勤務を開始する場合や育休から復帰する場合、<span class="highlight">+30点</span>という大きな加算があります。市外の場合は+28点です。</p>

<h3>2. きょうだい同園希望（+10点）</h3>
<p>きょうだいが入園している保育施設のみに入園を希望する場合、+10点が加算されます。同じ園に通わせたい場合に非常に有効です。</p>

<h3>3. 卒園児加算（+5点）</h3>
<p>2歳クラスまでの保育施設（小規模保育事業等）の卒園児には+5点が加算されます。3歳以降の認可保育園入園戦略として有効です。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>フルタイム共働き＋きょうだい同園希望＋きょうだい在園の場合：基本40＋同園希望10＋在園3＝<span class="highlight">合計53点</span>。この水準であれば多くの園で有利に選考が進みます。</p>
</div>

<h3>4. ひとり親家庭（+3点）</h3>
<p>母子または父子家庭の場合は+3点、準母子・準父子家庭の場合は+2点が加算されます。さらに60歳未満の健康な祖父母が同居していない場合は+1点が追加されます。</p>

<h2>盛岡市の特徴：保育士等への手厚い加点</h2>
<p>盛岡市は保育施設で働く保護者への加点が+30点と非常に大きいのが特徴です。保育人材の確保を重視している姿勢がうかがえます。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>保育料を正当な理由なく6か月以上滞納し、誠意ある対応がみられない場合は-3〜-10点の減算があります。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 55,
  },
  {
    slug: "ninka-vs-ninkagai",
    citySlug: "morioka",
    title: "盛岡市の認可保育園と認可外保育施設の違い　選び方ガイド",
    description:
      "盛岡市で保育園を選ぶとき知っておきたい、認可保育園と認可外保育施設の違いをまとめました。",
    image:
      "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&h=400&fit=crop",
    category: "保育園選び",
    categoryColor: "teal",
    content: `<h2>認可保育園とは</h2>
<p>国が定めた基準（面積、保育士数、設備など）を満たし、盛岡市が認可した保育施設です。保育料は世帯の所得に応じて決まり、3歳以上は無償化の対象です。</p>

<h3>盛岡市の認可保育施設の種類</h3>
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
<p>認可外保育施設は利用調整がないため、認可園に入れなかった場合のセーフティネットとして利用できます。盛岡市では0〜2歳の住民税非課税世帯は月額42,000円まで無償化の対象です。</p>
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
<p>盛岡市内の保育施設一覧は<a href="https://www.city.morioka.iwate.jp/kosodate/kodomo_azukeru/1034038/index.html" target="_blank" rel="noopener">盛岡市公式サイト「教育・保育施設一覧」</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 45,
  },
  {
    slug: "kengaku-checklist",
    citySlug: "morioka",
    title: "盛岡市の保育園見学チェックリスト　見るべきポイント15選",
    description:
      "盛岡市で保育園見学に行く前に知っておきたい、チェックすべきポイントをまとめました。",
    image:
      "https://images.unsplash.com/photo-1524813686514-a57563d77965?w=800&h=400&fit=crop",
    category: "保育園選び",
    categoryColor: "teal",
    content: `<h2>見学前の準備</h2>
<p>盛岡市では例年6月〜10月が見学シーズンです。希望する園に電話で見学予約を入れましょう。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>盛岡市は冬の寒さが厳しく、積雪もあります。冬場の通園を想定した園選びが重要です。駐車場の広さや除雪状況も確認しましょう。</p>
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

<div class="warn-box">
<p><strong>注意</strong></p>
<p>盛岡市は冬場に氷点下10℃以下になることもあります。暖房設備の種類や室温管理、冬場の送迎動線は必ず確認しましょう。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 45,
  },
  {
    slug: "ikukyu-hokatsu",
    citySlug: "morioka",
    title: "育休中の保活ガイド　盛岡市で育休明け入園を成功させるコツ",
    description:
      "盛岡市で育休中に保活を進めるスケジュールと、入園選考の仕組みを活かす方法を解説します。",
    image:
      "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>育休中でもフルタイムの基本点数が得られる</h2>
<p>盛岡市では育児休業中でも勤務先に在籍していれば、就労証明書に基づいて基本点数が算出されます。フルタイム勤務の方は<span class="highlight">20点</span>が基本点数になります。</p>

<h2>育休中の保活スケジュール</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content"><strong>産後〜6か月：情報収集</strong><p>盛岡市の公式サイトで保育施設一覧と前年度の入園申込案内を確認します。</p></div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content"><strong>生後6か月〜：保育園見学</strong><p>気になる園に電話して見学予約。3〜5園は見学しましょう。</p></div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content"><strong>10月頃：書類準備</strong><p>就労証明書を勤務先に依頼。育休中でも勤務先に在籍していることが必要です。</p></div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content"><strong>11月：申込</strong><p>子育てあんしん課の窓口または郵送で書類を提出します。</p></div>
</div>

<h2>2025年4月〜育休給付金延長の審査厳格化</h2>
<p>2025年4月から育児休業給付金の延長審査が厳格化されています。「速やかな職場復帰のために保育所の利用申込をした」と認められることが必要です。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>通勤可能な範囲の園を複数希望し、真剣に入園を目指している方は影響を受けません。盛岡市では利用調整の結果、入所できなかった場合の通知書で育休延長の手続きができます。</p>
</div>

<h2>育休延長許容の申し立てに注意</h2>
<p>盛岡市では「入園が保留となった場合、育児休業の延長を許容できる」旨の申し立てをすると、点数が1点になるよう減算されます。本当に入園を希望する場合はこの申し立てをしないようにしましょう。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>育休給付金延長の詳細は<a href="https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/0000160564_00040.html" target="_blank" rel="noopener">厚生労働省「育児休業給付金の支給対象期間延長手続き」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 50,
  },
  {
    slug: "shokibo-hoikuen",
    citySlug: "morioka",
    title: "盛岡市の小規模保育園ガイド　卒園後+5点の加点を活かす戦略",
    description:
      "盛岡市の小規模保育事業の特徴と、卒園後に+5点の調整加点が得られるメリットを解説します。",
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop",
    category: "保育園選び",
    categoryColor: "teal",
    content: `<h2>小規模保育事業とは</h2>
<p>0〜2歳児を対象とした定員6〜19人の小さな保育施設です。少人数のため手厚い保育が受けられるのが特徴です。</p>

<h2>卒園後のメリット：+5点</h2>
<p>盛岡市では2歳クラスまでの保育施設の卒園児に<span class="highlight">+5点</span>の調整点数が加算されます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>フルタイム共働き＋卒園児加点の場合：基本40＋卒園児5＝<span class="highlight">合計45点</span>。3歳以降の認可保育園への入園で有利になります。</p>
</div>

<h3>卒園児加点の種類</h3>
<table>
<tr><th>卒園元の施設</th><th>加点</th></tr>
<tr><td>小規模保育事業所等</td><td>+5</td></tr>
<tr><td>事業所内保育事業所（従業員枠）</td><td>+3</td></tr>
<tr><td>企業主導型保育所</td><td>+2</td></tr>
</table>

<h2>小規模保育園を選ぶ際の注意点</h2>
<ul>
<li>3歳以降は別の園に移る必要がある（転園先の準備が必要）</li>
<li>園庭がない施設もある（近隣の公園を利用）</li>
<li>連携施設が希望のエリアにあるか事前に確認</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>盛岡市内の保育施設一覧は<a href="https://www.city.morioka.iwate.jp/kosodate/kodomo_azukeru/1034038/index.html" target="_blank" rel="noopener">盛岡市公式サイト「教育・保育施設一覧」</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 40,
  },
  {
    slug: "futarime-hokatsu",
    citySlug: "morioka",
    title: "盛岡市で二人目の保活　きょうだい加点と同園希望を活用",
    description:
      "盛岡市で二人目の保活をする際のきょうだい在園加点（+3）や同園希望加点（+10）の仕組みを解説します。",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>きょうだい在園で+3点</h2>
<p>盛岡市ではすでに保育施設に入園中の兄弟姉妹がいる場合、1人ごとに<span class="highlight">+3点</span>の調整点数が加算されます。</p>

<h2>同園希望で+10点</h2>
<p>きょうだいが入園している保育施設のみに入園を希望する場合、さらに<span class="highlight">+10点</span>が加算されます。これは盛岡市の調整点数の中でも大きな加点項目です。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>フルタイム共働き＋きょうだい在園＋同園希望の場合：基本40＋在園3＋同園希望10＝<span class="highlight">合計53点</span>。同じ園に通わせたい場合は非常に有利になります。</p>
</div>

<h2>就学前児童加点</h2>
<p>申し込み児童のほかに就学前児童がいる場合、1人ごとに+2点が加算されます。きょうだい在園加点と併用できます。</p>

<h2>多子世帯加点</h2>
<p>小学生以下の児童が3人以上いる世帯には+1点が加算されます。</p>

<h2>保育料の多子軽減</h2>
<p>盛岡市では多子軽減制度があり、第2子以降の保育料が軽減されます。3歳以上は無償化、0〜2歳も第2子以降は保育料が減額されます。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>同園希望の+10点は、きょうだいが入園している保育施設「のみ」を希望する場合に限られます。他の園も併願する場合はこの加点は適用されません。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 50,
  },
  {
    slug: "hoikuryo-guide",
    citySlug: "morioka",
    title: "盛岡市の保育料ガイド　世帯年収別の目安と軽減制度",
    description:
      "盛岡市の保育料の決まり方、無償化の範囲、多子軽減やひとり親世帯向け軽減制度をわかりやすく解説します。",
    image:
      "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>保育料の決まり方</h2>
<p>盛岡市の保育料は<strong>市町村民税の所得割額</strong>に基づいて階層ごとに設定されます。世帯の課税状況によって月額が決まります。</p>

<h2>3歳以上は無償</h2>
<p>2019年10月からの幼児教育・保育の無償化により、3歳〜5歳児クラスの保育料は<span class="highlight">0円</span>です。ただし給食費（副食費）は別途かかります。</p>

<h2>0〜2歳の保育料</h2>
<p>0〜2歳の保育料は世帯の市町村民税所得割額に応じて決定されます。生活保護世帯・非課税世帯は0円、最高階層は月額7万円台になります。</p>

<h2>軽減制度</h2>
<h3>多子軽減</h3>
<p>きょうだいがいる場合、第2子以降の保育料が軽減されます。</p>

<h3>ひとり親世帯向け軽減</h3>
<p>ひとり親世帯は市町村民税の所得割額に応じて保育料が軽減されます。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>保育料の詳細は<a href="https://www.city.morioka.iwate.jp/_res/projects/default_project/_page_/001/053/010/R8riyousyahutangaku.pdf" target="_blank" rel="noopener">盛岡市「令和8年度利用者負担額表（PDF）」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 45,
  },
  {
    slug: "ochita-toki-sentakushi",
    citySlug: "morioka",
    title: "盛岡市で保育園に落ちたときの対処法　次にやるべきこと",
    description:
      "盛岡市の1次選考で入所できなかった場合の選択肢と、次にとるべきアクションをまとめました。",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>1次選考で入所できなかったら</h2>
<p>1次選考で入所できなくても、まだ選択肢はあります。落ち着いて次の手を打ちましょう。</p>

<h2>選択肢1：2次選考に申し込む</h2>
<p>1次で辞退が出た枠で再度利用調整が行われます。盛岡市では2次選考の受付は2026年1月5日〜2月27日です。希望園の変更・追加も可能です。</p>

<h2>選択肢2：年度途中入園を申し込む</h2>
<p>盛岡市では5月以降の毎月の利用調整があり、空きが出れば途中入園できます。入園希望月の前月上旬が締切なので、毎月忘れずに確認しましょう。</p>

<h2>選択肢3：認可外保育施設を利用する</h2>
<p>認可外保育施設は利用調整がないため、空きがあればすぐに入れます。復職して次年度に再挑戦する戦略として有効です。</p>

<h2>選択肢4：育児休業を延長する</h2>
<p>利用調整の結果、入所できなかった場合の通知書があれば育児休業を延長できます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>盛岡市では保育施設の空き状況が公式サイトで公開されています。途中入園のチャンスを逃さないよう定期的にチェックしましょう。</p>
</div>

<h2>次年度に向けた準備</h2>
<ul>
<li>希望園を見直す（人気園以外も検討）</li>
<li>小規模保育事業も視野に入れる（卒園後+5点の加点あり）</li>
<li>きょうだい同園希望の+10点加点が使える場合は活用する</li>
<li>家庭の状況変化（転職、引越し等）で点数が変わる可能性を確認</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>空き状況は<a href="https://www.city.morioka.iwate.jp/kosodate/kodomo_azukeru/1040441.html" target="_blank" rel="noopener">盛岡市公式サイト「保育施設の空き状況・入所選考結果について」</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 40,
  },
];

registerArticles(articles);
