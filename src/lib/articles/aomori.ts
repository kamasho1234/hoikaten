import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  {
    slug: "hokatsu-schedule",
    citySlug: "aomori",
    title: "青森市の保活スケジュール　令和8年度4月入園の流れ",
    description:
      "青森市の令和8年度（2026年度）4月入園の申込時期・必要書類・結果通知の時期をまとめました。",
    image:
      "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>令和8年度（2026年度）4月入園のスケジュール</h2>
<p>青森市の4月入園申込は例年12月頃から受け付けられます。令和8年度の受付は令和7年12月1日から開始されています。</p>

<h3>申込の流れ</h3>
<table>
<tr><th>項目</th><th>日程（目安）</th></tr>
<tr><td>申請書類配布</td><td>2025年11月頃〜</td></tr>
<tr><td>1次申込受付</td><td>2025年12月1日〜</td></tr>
<tr><td>1次結果通知</td><td>2026年2月頃（郵送）</td></tr>
<tr><td>2次申込受付</td><td>2026年2月頃〜</td></tr>
<tr><td>2次結果通知</td><td>2026年3月頃（郵送）</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>青森市では年度途中の入所も毎月受け付けています。希望する月の前月初旬が締切になるため、早めの準備が大切です。</p>
</div>

<h2>いつから動き始めるべき？</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content"><strong>4月〜6月：情報収集</strong><p>青森市の公式サイトで前年度の資料を参考に準備を始めます。</p></div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content"><strong>6月〜10月：保育園見学</strong><p>気になる園に電話して見学予約を入れましょう。青森市は冬の積雪が多いため、秋までに見学を済ませておくと安心です。</p></div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content"><strong>10月〜11月：書類準備</strong><p>就労証明書を勤務先に依頼します。保育の利用申込書と支給認定申請書が必要です。</p></div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content"><strong>12月：申込</strong><p>青森市駅前庁舎の子育て支援課窓口で期限内に必要書類を提出します。電子申請にも対応しています。</p></div>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新情報は<a href="https://www.city.aomori.aomori.jp/kodomo_kyoiku/ninteikodomoen_youchien_hoikusho/1009841/1009844.html" target="_blank" rel="noopener">青森市公式サイト「令和8年度 保育所・認定こども園等への利用申込み」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 60,
  },
  {
    slug: "scoring-system-guide",
    citySlug: "aomori",
    title: "青森市の入園選考のしくみ　優先順位A〜Fをやさしく解説",
    description:
      "青森市の保育園入園選考で使われる優先順位制度の仕組みを、初めての方にもわかるように解説します。",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>選考制度の全体像</h2>
<p>青森市の認可保育施設は<strong>優先順位A〜Fの6段階</strong>で利用調整が行われます。優先順位Aが最も高く、Fが最も低くなります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>青森市は多くの自治体で採用されている「点数制」ではなく「優先順位制」です。保護者それぞれの状況で優先順位が決まり、総合的に判断されます。</p>
</div>

<h2>優先順位の一覧</h2>
<table>
<tr><th>優先順位</th><th>主な該当条件</th></tr>
<tr><td>A（最高）</td><td>月150時間以上の就労・就学、長期入院、重度障害</td></tr>
<tr><td>B</td><td>月120時間以上の就労・就学、短期入院、中程度障害、重度要介護者の介護、出産前後</td></tr>
<tr><td>C</td><td>月90時間以上の就労・就学、自宅療養、中程度要介護者の介護</td></tr>
<tr><td>D</td><td>月60時間以上の就労・就学</td></tr>
<tr><td>E</td><td>月60時間以上の内職、軽度要介護者の介護</td></tr>
<tr><td>F（最低）</td><td>求職活動中</td></tr>
</table>

<h2>加算条件（優先順位が上がる）</h2>
<p>以下の条件に該当すると、同じ優先順位内でさらに優先されます。</p>
<ul>
<li><strong>ひとり親家庭</strong></li>
<li><strong>産休・育休明けの復職</strong>（育休終了日が属する月の選考で優先）</li>
</ul>

<h2>同順位の場合の判断</h2>
<p>同じ優先順位の場合は、各家庭の諸事情を総合的に勘案して選考されます。きょうだいの在園状況や多子家庭であることなどが考慮されます。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳細は<a href="https://www.city.aomori.aomori.jp/kodomo_kyoiku/ninteikodomoen_youchien_hoikusho/1009841/1009844.html" target="_blank" rel="noopener">青森市公式サイト「令和8年度 保育所・認定こども園等への利用申込み」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 55,
  },
  {
    slug: "katen-no-kotsu",
    citySlug: "aomori",
    title: "青森市で優先順位を上げるコツ　入園選考を有利に進める方法",
    description:
      "青森市の保育園入園選考で有利になる加算条件と、優先順位を上げるポイントを解説します。",
    image:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>優先順位Aがスタートライン</h2>
<p>青森市では父母ともフルタイム勤務（月150時間以上）であれば優先順位は最高の<span class="highlight">A</span>になります。多くの共働き家庭がこの水準になるため、差を分けるのは加算条件です。</p>

<h2>主な加算条件と活用のポイント</h2>

<h3>1. 育休明け・産休明け</h3>
<p>育児休業や産休から復帰して入所を希望する場合、優先順位が高くなります。育休終了日が属する月（終了日が1〜13日の場合はその前月も含む、末日の場合は翌月も含む）の選考で優先されます。</p>

<h3>2. ひとり親家庭</h3>
<p>ひとり親家庭の場合も優先順位が高くなります。母子家庭・父子家庭いずれも対象です。</p>

<h3>3. きょうだい在園</h3>
<p>すでに兄弟姉妹が認可保育所等に入所している場合、同順位内で考慮されます。同じ園を希望すると有利に働きます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>フルタイム共働き＋育休明けの場合：優先順位A＋育休明け加算。この組み合わせであれば多くの園で有利に選考が進みます。</p>
</div>

<h2>就労時間を150時間以上にする</h2>
<p>青森市の最高優先順位Aは月150時間以上の就労が条件です。フルタイム（週5日×8時間＝月160時間）であれば条件を満たします。パートの場合は勤務時間を確認しましょう。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>内職は就労とは別区分で優先順位Eとなります。被雇用者・自営業者として働くほうが優先順位は高くなります。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 50,
  },
  {
    slug: "ninka-vs-ninkagai",
    citySlug: "aomori",
    title: "青森市の認可保育園と認可外保育施設の違い　選び方ガイド",
    description:
      "青森市で保育園を選ぶとき知っておきたい、認可保育園と認可外保育施設の違いをまとめました。",
    image:
      "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&h=400&fit=crop",
    category: "保育園選び",
    categoryColor: "teal",
    content: `<h2>認可保育園とは</h2>
<p>国が定めた基準（面積、保育士数、設備など）を満たし、青森市が認可した保育施設です。保育料は世帯の所得に応じて決まり、3歳以上は無償化の対象です。</p>

<h3>青森市の認可保育施設の種類</h3>
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
<p>認可外保育施設は利用調整がないため、認可園に入れなかった場合のセーフティネットとして利用できます。青森市では0〜2歳の住民税非課税世帯は月額42,000円まで無償化の対象です。</p>
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
<p>青森市内の保育施設一覧は<a href="https://www.city.aomori.aomori.jp/kodomo_kyoiku/kosodateshien/1003483/1007425.html" target="_blank" rel="noopener">青森市公式サイト「教育・保育施設等情報ファイル」</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 45,
  },
  {
    slug: "kengaku-checklist",
    citySlug: "aomori",
    title: "青森市の保育園見学チェックリスト　見るべきポイント15選",
    description:
      "青森市で保育園見学に行く前に知っておきたい、チェックすべきポイントをまとめました。",
    image:
      "https://images.unsplash.com/photo-1524813686514-a57563d77965?w=800&h=400&fit=crop",
    category: "保育園選び",
    categoryColor: "teal",
    content: `<h2>見学前の準備</h2>
<p>青森市では例年6月〜10月が見学シーズンです。希望する園に電話で見学予約を入れましょう。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>青森市は冬の積雪が多く、特に1月〜3月は豪雪になることもあります。冬場の通園を想定した園選びが重要です。駐車場の広さや除雪状況も必ず確認しましょう。</p>
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
<p>青森市は冬場に大量の積雪があります。暖房設備の種類や室温管理、冬場の送迎動線、除雪体制は必ず確認しましょう。バス通園の有無も重要なチェックポイントです。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 40,
  },
  {
    slug: "ikukyu-hokatsu",
    citySlug: "aomori",
    title: "育休中の保活ガイド　青森市で育休明け入園を成功させるコツ",
    description:
      "青森市で育休中に保活を進めるスケジュールと、育休明け加算を活かす方法を解説します。",
    image:
      "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>育休明けは優先順位が上がる</h2>
<p>青森市では育児休業から復帰して入所を希望する場合、選考の優先順位が高くなります。育休終了日が属する月（終了日が1〜13日の場合はその前月も含む、終了日が末日の場合は翌月も含む）の選考で優先されます。</p>

<h2>育休中の保活スケジュール</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content"><strong>産後〜6か月：情報収集</strong><p>青森市の公式サイトで保育施設一覧と前年度のしおりを確認します。</p></div>
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
<div class="step-content"><strong>12月：申込</strong><p>青森市の窓口に書類を提出します。電子申請も利用できます。</p></div>
</div>

<h2>2025年4月〜育休給付金延長の審査厳格化</h2>
<p>2025年4月から育児休業給付金の延長審査が厳格化されています。「速やかな職場復帰のために保育所の利用申込をした」と認められることが必要です。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>通勤可能な範囲の園を複数希望し、真剣に入園を目指している方は影響を受けません。青森市では利用調整の結果、入所できなかった場合の保留通知書を使って育休延長の手続きができます。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>育休給付金延長の詳細は<a href="https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/0000160564_00040.html" target="_blank" rel="noopener">厚生労働省「育児休業給付金の支給対象期間延長手続き」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 50,
  },
  {
    slug: "shokibo-hoikuen",
    citySlug: "aomori",
    title: "青森市の小規模保育園ガイド　0〜2歳児の少人数保育のメリット",
    description:
      "青森市の小規模保育事業の特徴と、卒園後の3歳以降の入園戦略について解説します。",
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop",
    category: "保育園選び",
    categoryColor: "teal",
    content: `<h2>小規模保育事業とは</h2>
<p>0〜2歳児を対象とした定員6〜19人の小さな保育施設です。少人数のため手厚い保育が受けられるのが特徴です。</p>

<h2>小規模保育園のメリット</h2>
<ul>
<li>少人数ならではの手厚いケア</li>
<li>認可保育所より入りやすい場合がある</li>
<li>卒園後の3歳入園では、地域型保育事業の卒園児として選考で考慮される</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>青森市では地域型保育事業の卒園児は3歳以降の入園選考で考慮されます。0〜2歳は小規模保育所に入り、3歳から認可保育所に移る戦略が有効です。</p>
</div>

<h2>連携施設について</h2>
<p>小規模保育所には連携施設が設定されている場合があります。卒園後に連携施設への入所を希望する場合、優先的に保育を提供されることがあります。入所前に連携施設がどの園かを確認しておきましょう。</p>

<h2>小規模保育園を選ぶ際の注意点</h2>
<ul>
<li>3歳以降は別の園に移る必要がある（転園先の準備が必要）</li>
<li>園庭がない施設もある（近隣の公園を利用）</li>
<li>連携施設が希望のエリアにあるか事前に確認</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>青森市内の保育施設一覧は<a href="https://www.city.aomori.aomori.jp/kodomo_kyoiku/kosodateshien/1003483/1007425.html" target="_blank" rel="noopener">青森市公式サイト「教育・保育施設等情報ファイル」</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 35,
  },
  {
    slug: "futarime-hokatsu",
    citySlug: "aomori",
    title: "青森市で二人目の保活　きょうだい在園の優先と多子軽減を活用",
    description:
      "青森市で二人目の保活をする際のきょうだい在園の優先や多子軽減制度の仕組みを解説します。",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>きょうだい在園は選考で考慮される</h2>
<p>青森市では上の子が認可保育所等にすでに入所している場合、下の子の利用調整で考慮されます。同じ園を希望するとさらに有利になります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>フルタイム共働き＋きょうだい在園＋育休明けの場合：優先順位A＋加算条件が複数。この組み合わせであれば多くの園で有利に選考が進みます。</p>
</div>

<h2>保育料の多子軽減</h2>
<p>青森市では多子軽減制度があり、きょうだいが保育所等に同時に入所している場合、保育料が軽減されます。</p>
<table>
<tr><th>条件</th><th>軽減内容</th></tr>
<tr><td>3歳以上</td><td>無償化により保育料0円</td></tr>
<tr><td>0〜2歳・第2子</td><td>保育料が半額</td></tr>
<tr><td>0〜2歳・第3子以降</td><td>保育料が無料</td></tr>
</table>

<h2>同じ園に入るためのポイント</h2>
<p>青森市では同順位の場合、きょうだいが該当施設にすでに入所していることが考慮されます。上の子と同じ園を第1希望にしましょう。</p>

<h2>保育料の軽減制度</h2>
<p>市民税の所得割額が一定額未満の世帯では、年齢に関係なく第2子以降の多子軽減が適用されます。ひとり親世帯や障害者のいる世帯では、さらに軽減の対象が広がります。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>保育料の詳細は<a href="https://www.city.aomori.aomori.jp/kodomo_kyoiku/ninteikodomoen_youchien_hoikusho/1003552.html" target="_blank" rel="noopener">青森市公式サイト「認定こども園・幼稚園・保育所などの利用料（保育料）」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 45,
  },
  {
    slug: "hoikuryo-guide",
    citySlug: "aomori",
    title: "青森市の保育料ガイド　世帯年収別の目安と軽減制度",
    description:
      "青森市の保育料の決まり方、無償化の範囲、多子軽減やひとり親世帯向け軽減制度をわかりやすく解説します。",
    image:
      "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>保育料の決まり方</h2>
<p>青森市の保育料は<strong>市町村民税の所得割額</strong>に基づいて階層別に設定されます。世帯の課税状況によって月額が決まります。</p>

<h2>3歳以上は無償</h2>
<p>2019年10月からの幼児教育・保育の無償化により、3歳〜5歳児クラスの保育料は<span class="highlight">0円</span>です。ただし給食費（副食費）は別途かかります。</p>

<h2>0〜2歳の保育料の目安</h2>
<table>
<tr><th>階層</th><th>条件</th><th>月額（目安）</th></tr>
<tr><td>生活保護世帯</td><td>生活保護受給世帯</td><td>0円</td></tr>
<tr><td>非課税世帯</td><td>市民税非課税</td><td>0円</td></tr>
<tr><td>低所得世帯</td><td>所得割額48,600円未満</td><td>約7,000〜8,000円</td></tr>
<tr><td>中間世帯</td><td>所得割額97,000〜169,000円</td><td>約25,000〜44,000円</td></tr>
<tr><td>高所得世帯</td><td>所得割額397,000円以上</td><td>約65,000〜72,000円</td></tr>
</table>

<h2>軽減制度</h2>
<h3>多子軽減</h3>
<p>きょうだいが保育所等に同時入所している場合、第2子は半額、第3子以降は無料になります。</p>

<h3>ひとり親世帯向け軽減</h3>
<p>所得割額が一定額未満のひとり親世帯は保育料がさらに軽減されます。</p>

<h3>幼児教育・保育の無償化</h3>
<p>0〜2歳の住民税非課税世帯も無償化の対象です。認可外保育施設を利用する場合は月額42,000円まで無償化されます。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>保育料の詳細は<a href="https://www.city.aomori.aomori.jp/kodomo_kyoiku/ninteikodomoen_youchien_hoikusho/1003552.html" target="_blank" rel="noopener">青森市公式サイト「認定こども園・幼稚園・保育所などの利用料（保育料）」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 45,
  },
  {
    slug: "ochita-toki-sentakushi",
    citySlug: "aomori",
    title: "青森市で保育園に落ちたときの対処法　次にやるべきこと",
    description:
      "青森市の1次利用調整で入所できなかった場合の選択肢と、次にとるべきアクションをまとめました。",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>利用調整で入所できなかったら</h2>
<p>1次利用調整で入所できなくても、まだ選択肢はあります。落ち着いて次の手を打ちましょう。</p>

<h2>選択肢1：2次利用調整に申し込む</h2>
<p>1次で辞退が出た枠で再度利用調整が行われます。希望園の変更・追加も可能です。</p>

<h2>選択肢2：年度途中入園を申し込む</h2>
<p>青森市では毎月の利用調整があり、空きが出れば途中入園できます。前月初旬が申込期限なので、毎月忘れずに確認しましょう。</p>

<h2>選択肢3：認可外保育施設を利用する</h2>
<p>認可外保育施設は利用調整がないため、空きがあればすぐに入れます。復職して次年度に再挑戦する戦略として有効です。</p>

<h2>選択肢4：育児休業を延長する</h2>
<p>利用調整の結果、入所できなかった場合の通知書があれば育児休業を延長できます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>青森市では保育所等の空き状況一覧が公式サイトで公開されています。途中入園のチャンスを逃さないよう定期的にチェックしましょう。</p>
</div>

<h2>次年度に向けた準備</h2>
<ul>
<li>希望園を見直す（人気園以外も検討）</li>
<li>小規模保育事業も視野に入れる（卒園後の選考で考慮される）</li>
<li>家庭の状況変化（転職、引越し等）で優先順位が変わる可能性を確認</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>空き状況は<a href="https://www.city.aomori.aomori.jp/kodomo_kyoiku/ninteikodomoen_youchien_hoikusho/1009841/1009920.html" target="_blank" rel="noopener">青森市公式サイト「令和8年度保育所等空き状況一覧」</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 30,
  },
];

registerArticles(articles);
