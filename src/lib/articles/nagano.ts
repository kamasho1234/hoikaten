import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  {
    slug: "hokatsu-schedule",
    citySlug: "nagano",
    title: "長野市の保活スケジュール　令和8年度4月入園の流れ",
    description:
      "長野市の令和8年度（2026年度）4月入園の申込時期・必要書類・結果通知の時期をまとめました。",
    image:
      "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>令和8年度（2026年度）4月入園のスケジュール</h2>
<p>長野市の4月入園は1次・2次の2回にわたって審査が行われます。</p>

<h3>申込から入所までの流れ</h3>
<table>
<tr><th>審査回</th><th>受付期間</th><th>結果通知</th></tr>
<tr><td>1次申込</td><td>10月20日〜11月10日</td><td>2月上旬</td></tr>
<tr><td>2次申込</td><td>2月25日〜3月5日</td><td>3月16日前後</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>長野市は1次申込と2次申込の2回です。1次申込に間に合うよう早めに準備しましょう。1次で枠が埋まると2次での入所は難しくなります。</p>
</div>

<h2>いつから動き始めるべき？</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content"><strong>4月〜6月：情報収集</strong><p>長野市の公式サイトで前年度の「保育利用版利用のご案内」を参考に準備を始めます。</p></div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content"><strong>6月〜9月：保育園見学</strong><p>気になる園に電話して見学予約を入れましょう。</p></div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content"><strong>9月〜10月：書類準備</strong><p>就労証明書を勤務先に依頼します。給付認定申請書兼利用申込書、マイナンバー記入用紙が必要です。</p></div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content"><strong>10月：1次申込</strong><p>保育・幼稚園課の窓口で書類を提出します。</p></div>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新情報は<a href="https://www.city.nagano.nagano.jp/n117000/kosodate/p001543.html" target="_blank" rel="noopener">長野市公式サイト「令和8年度保育施設の利用申し込み」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 55,
  },
  {
    slug: "scoring-system-guide",
    citySlug: "nagano",
    title: "長野市の入園点数のしくみ　基本点数と調整点数をやさしく解説",
    description:
      "長野市の保育園入園選考で使われる点数制度の仕組みを、初めての方にもわかるように解説します。",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>点数制度の全体像</h2>
<p>長野市の認可保育施設は<strong>利用調整点数の高い世帯から優先</strong>して入所が決まります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>利用調整点数 ＝ 保護者のうち基本点数の低い方 ＋ 調整点数</p>
</div>

<h2>基本点数とは</h2>
<p>保護者それぞれの「保育を必要とする事由」を点数化したものです。1人あたり<span class="highlight">最大100点</span>です。保護者のうち点数の低い方が基本点数になります。</p>
<table>
<tr><th>保育の事由</th><th>基本点</th></tr>
<tr><td>就労A（雇用）：月160時間以上</td><td>100</td></tr>
<tr><td>就労A（雇用）：月140〜160時間未満</td><td>95</td></tr>
<tr><td>就労A（雇用）：月120〜140時間未満</td><td>90</td></tr>
<tr><td>就労B（自営等）：月160時間以上</td><td>90</td></tr>
<tr><td>妊娠・出産（6週前〜8週後）</td><td>90</td></tr>
<tr><td>入院・常時臥床・障害（1・2級等）</td><td>100</td></tr>
<tr><td>災害復旧</td><td>100</td></tr>
<tr><td>求職活動中</td><td>20</td></tr>
</table>

<h2>調整点数とは</h2>
<p>世帯の状況に応じて加算される点数です。複数の項目に該当する場合は重複して加算されます。</p>
<table>
<tr><th>項目</th><th>調整点</th></tr>
<tr><td>ひとり親世帯</td><td>+40</td></tr>
<tr><td>育休明け（きょうだいが利用中の施設を希望）</td><td>+35</td></tr>
<tr><td>育休明け（きょうだい同時入所希望）</td><td>+25</td></tr>
<tr><td>保育士等として長野市内で勤務</td><td>+20</td></tr>
<tr><td>生計中心者の失業</td><td>+15</td></tr>
<tr><td>子どもが障がいの手帳交付を受けている</td><td>+10</td></tr>
<tr><td>第3子以降</td><td>+5</td></tr>
</table>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳細な基準表は<a href="https://www.city.nagano.nagano.jp/n117000/kosodate/p001543.html" target="_blank" rel="noopener">長野市公式サイト「令和8年度保育施設の利用申し込み」</a>からダウンロードできます。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 60,
  },
  {
    slug: "katen-no-kotsu",
    citySlug: "nagano",
    title: "長野市で加点を最大化するコツ　調整点数を積み上げる方法",
    description:
      "長野市の保育園入園選考で有利になる調整点数の加点項目と、活用のポイントを解説します。",
    image:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>基本点数100点がスタートライン</h2>
<p>長野市では父母ともフルタイム勤務（月160時間以上・雇用）であれば基本点数は<span class="highlight">100点</span>（低い方を採用するため100点）になります。多くの家庭がこの水準になるため、差を分けるのは調整点数です。</p>

<h2>主な加点項目と活用のポイント</h2>

<h3>1. ひとり親世帯（+40点）</h3>
<p>離婚・離婚調停中・未婚・死別・行方不明等の場合、最大の加点<span class="highlight">+40点</span>が加算されます。</p>

<h3>2. 育休明け＋きょうだいが利用中（+35点）</h3>
<p>育児休業明けで、きょうだいがすでに利用している施設を第1希望にして新規利用を希望する場合、<span class="highlight">+35点</span>と非常に大きな加点になります。</p>

<h3>3. 育休明け＋きょうだい同時入所（+25点）</h3>
<p>きょうだい（多胎児を含む）が同時に新規利用を希望する場合は<span class="highlight">+25点</span>です。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>フルタイム共働き＋育休明け＋きょうだい利用中の施設を第1希望の場合：基本100＋育休明け35＝<span class="highlight">合計135点</span>。この水準であれば多くの園で有利に選考が進みます。</p>
</div>

<h3>4. 保育士等として市内で勤務（+20点）</h3>
<p>月の就労時間が120時間未満の保育士・幼稚園教諭・保育教諭が長野市内の認可保育施設等で勤務（予定含む）の場合、<span class="highlight">+20点</span>の加点があります。</p>

<h3>5. 第3子以降（+5点）</h3>
<p>利用希望児童が出生順位第3子以降の場合、<span class="highlight">+5点</span>が加算されます。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>長野市では就労がA（雇用）とB（自営等）に分かれ、同じ就労時間でもA（雇用）の方が基本点数が高くなります。自営業の方は注意が必要です。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 50,
  },
  {
    slug: "ninka-vs-ninkagai",
    citySlug: "nagano",
    title: "長野市の認可保育園と認可外保育施設の違い　選び方ガイド",
    description:
      "長野市で保育園を選ぶとき知っておきたい、認可保育園と認可外保育施設の違いをまとめました。",
    image:
      "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&h=400&fit=crop",
    category: "保育園選び",
    categoryColor: "teal",
    content: `<h2>認可保育園とは</h2>
<p>国が定めた基準（面積、保育士数、設備など）を満たし、長野市が認可した保育施設です。保育料は世帯の所得に応じて決まり、3歳以上は無償化の対象です。</p>

<h3>長野市の認可保育施設の種類</h3>
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
<p>長野市内の保育施設一覧は<a href="https://www.city.nagano.nagano.jp/kosodate/menu/12/1/index.html" target="_blank" rel="noopener">長野市公式サイト「保育園・幼稚園・認定こども園・地域型保育事業」</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 45,
  },
  {
    slug: "kengaku-checklist",
    citySlug: "nagano",
    title: "長野市の保育園見学チェックリスト　見るべきポイント15選",
    description:
      "長野市で保育園見学に行く前に知っておきたい、チェックすべきポイントをまとめました。",
    image:
      "https://images.unsplash.com/photo-1524813686514-a57563d77965?w=800&h=400&fit=crop",
    category: "保育園選び",
    categoryColor: "teal",
    content: `<h2>見学前の準備</h2>
<p>長野市では例年6月〜9月が見学シーズンです。希望する園に電話で見学予約を入れましょう。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>長野市は冬の寒さが厳しく積雪もあるため、冬場の通園を想定した園選びが重要です。駐車場の広さや除雪状況も確認しましょう。</p>
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
<p>長野市は冬場の冷え込みが厳しい地域です。暖房設備の種類や室温管理、冬場の送迎動線は必ず確認しましょう。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 40,
  },
  {
    slug: "ikukyu-hokatsu",
    citySlug: "nagano",
    title: "育休中の保活ガイド　長野市で育休明け入園を成功させるコツ",
    description:
      "長野市で育休中に保活を進めるスケジュールと、育休明け加点（最大+35点）を活かす方法を解説します。",
    image:
      "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>育休明けの加点は最大+35点</h2>
<p>長野市では育児休業明けの場合、きょうだいの状況に応じて大きな調整点数が加算されます。</p>

<table>
<tr><th>パターン</th><th>調整点</th></tr>
<tr><td>きょうだいが利用中の施設を第1希望にして新規利用を希望</td><td>+35</td></tr>
<tr><td>きょうだい（多胎児含む）が同時に新規利用を希望</td><td>+25</td></tr>
<tr><td>きょうだいが利用していない施設を第1希望にして新規利用を希望</td><td>+15</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>上の子が既に利用中の施設を第1希望にすると+35点と非常に大きな加点になります。フルタイム共働きなら基本100＋育休明け35＝<span class="highlight">合計135点</span>が見込めます。</p>
</div>

<h2>育休中の保活スケジュール</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content"><strong>産後〜6か月：情報収集</strong><p>長野市の公式サイトで保育施設一覧と前年度の「保育利用版利用のご案内」を確認します。</p></div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content"><strong>生後6か月〜：保育園見学</strong><p>気になる園に電話して見学予約。3〜5園は見学しましょう。</p></div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content"><strong>9月頃：書類準備</strong><p>就労証明書を勤務先に依頼。育休中でも勤務先に在籍していることが必要です。</p></div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content"><strong>10月：1次申込</strong><p>保育・幼稚園課の窓口に書類を提出します。</p></div>
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
    citySlug: "nagano",
    title: "長野市の小規模保育園ガイド　卒所後の+10点加点を活かす戦略",
    description:
      "長野市の小規模保育事業の特徴と、卒所後に転所を希望する場合+10点の調整加点が得られるメリットを解説します。",
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop",
    category: "保育園選び",
    categoryColor: "teal",
    content: `<h2>小規模保育事業とは</h2>
<p>0〜2歳児を対象とした定員6〜19人の小さな保育施設です。少人数のため手厚い保育が受けられるのが特徴です。</p>

<h2>卒所後のメリット：+10点加点</h2>
<p>長野市では地域型保育事業の卒所児童が転所を希望する場合、<span class="highlight">+10点</span>の調整点数が加算されます（4月入所の調整時のみ適用）。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>フルタイム共働き＋地域型卒所児の場合：基本100＋卒所児10＝<span class="highlight">合計110点</span>。3歳以降の認可保育園への入園で有利になります。</p>
</div>

<h2>小規模保育園を選ぶ際の注意点</h2>
<ul>
<li>3歳以降は別の園に移る必要がある（転園先の準備が必要）</li>
<li>園庭がない施設もある（近隣の公園を利用）</li>
<li>卒所後の加点は+10点で、4月入所の調整時のみ適用</li>
<li>認可保育施設の閉鎖による転所（+30点）と比べると加点は小さいが、通常の転所よりは有利</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>長野市内の地域型保育事業所一覧は<a href="https://www.city.nagano.nagano.jp/kosodate/menu/12/1/index.html" target="_blank" rel="noopener">長野市公式サイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 35,
  },
  {
    slug: "futarime-hokatsu",
    citySlug: "nagano",
    title: "長野市で二人目の保活　きょうだい加点と育休明け加点を活用",
    description:
      "長野市で二人目の保活をする際のきょうだい加点（最大+35）や第3子以降加点の仕組みを解説します。",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>育休明け＋きょうだい利用中で+35点</h2>
<p>長野市では育児休業明けの場合、きょうだいが既に利用している施設を第1希望にして新規利用を希望すると<span class="highlight">+35点</span>の調整点数が加算されます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>フルタイム共働き＋育休明け＋きょうだい利用中の施設を第1希望の場合：基本100＋育休明き35＝<span class="highlight">合計135点</span>。同じ園を希望する場合は非常に有利に選考が進みます。</p>
</div>

<h2>育休明けでない場合のきょうだい加点</h2>
<table>
<tr><th>パターン</th><th>調整点</th></tr>
<tr><td>育休明け＋きょうだいが利用中の施設を第1希望</td><td>+35</td></tr>
<tr><td>育休明け＋きょうだい同時入所希望</td><td>+25</td></tr>
<tr><td>育休明け＋きょうだいが利用していない施設を第1希望</td><td>+15</td></tr>
<tr><td>育休明けでない＋きょうだいが利用中の施設を第1希望</td><td>+20</td></tr>
<tr><td>育休明けでない＋きょうだい同時入所希望</td><td>+15</td></tr>
</table>

<h2>第3子以降は+5点</h2>
<p>利用希望児童が出生順位第3子以降の場合、さらに<span class="highlight">+5点</span>が加算されます。きょうだい加点との併用が可能です。</p>

<h2>同点になった場合の優先順位</h2>
<p>長野市では同点の場合、以下の順に優先されます。</p>
<ol>
<li>基本点数が高い世帯</li>
<li>調整点数項目1〜3の合計が高い世帯</li>
<li>基本点数項目の類型間優先順位（災害復旧＞疾病＞就労＞介護＞妊娠・出産＞就学＞求職活動）</li>
<li>小学生以下の子どもが多い世帯</li>
<li>養育している子どもが多い世帯</li>
</ol>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>きょうだい加点は「育休明け」に該当するかどうかで点数が大きく異なります。育休明けの場合は育児休業明け（項目5）で、そうでない場合はきょうだい同一施設（項目6）で加点を受けます。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 45,
  },
  {
    slug: "hoikuryo-guide",
    citySlug: "nagano",
    title: "長野市の保育料ガイド　世帯年収別の目安と軽減制度",
    description:
      "長野市の保育料の決まり方、無償化の範囲、多子軽減やひとり親世帯向け軽減制度をわかりやすく解説します。",
    image:
      "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>保育料の決まり方</h2>
<p>長野市の保育料は<strong>市町村民税の所得割額</strong>に基づいて階層ごとに設定されます。世帯の課税状況によって月額が決まります。</p>

<h2>3歳以上は無償</h2>
<p>2019年10月からの幼児教育・保育の無償化により、3歳〜5歳児クラスの保育料は<span class="highlight">0円</span>です。ただし給食費（副食費）は別途かかります。</p>

<h2>0〜2歳の保育料の目安</h2>
<table>
<tr><th>階層</th><th>対象</th><th>月額（目安）</th></tr>
<tr><td>生活保護世帯</td><td>生活保護受給者</td><td>0円</td></tr>
<tr><td>非課税世帯</td><td>市町村民税非課税</td><td>0円</td></tr>
<tr><td>低所得層</td><td>所得割額の低い世帯</td><td>約5,000〜15,000円</td></tr>
<tr><td>中間層</td><td>所得割額が中程度の世帯</td><td>約20,000〜40,000円</td></tr>
<tr><td>高所得層</td><td>所得割額が高い世帯</td><td>約50,000〜70,000円</td></tr>
</table>

<h2>軽減制度</h2>
<h3>多子軽減</h3>
<p>きょうだいがいる場合、第2子以降の保育料が軽減されます。</p>

<h3>ひとり親世帯向け軽減</h3>
<p>ひとり親世帯は保育料が軽減される場合があります。詳細は保育・幼稚園課にお問い合わせください。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>保育料の詳細は<a href="https://www.city.nagano.nagano.jp/n117000/kosodate/p001543.html" target="_blank" rel="noopener">長野市公式サイト「令和8年度保育施設の利用申し込み」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 40,
  },
  {
    slug: "ochita-toki-sentakushi",
    citySlug: "nagano",
    title: "長野市で保育園に落ちたときの対処法　次にやるべきこと",
    description:
      "長野市の利用調整で入所できなかった場合の選択肢と、次にとるべきアクションをまとめました。",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>利用調整で入所できなかったら</h2>
<p>1次の審査で入所できなくても、まだ選択肢はあります。落ち着いて次の手を打ちましょう。</p>

<h2>選択肢1：2次申込を行う</h2>
<p>長野市は1次・2次の2回の審査があります。1次で入所できなかった場合、辞退や空きが出た枠で2次の選考が行われます。</p>
<table>
<tr><th>審査回</th><th>受付期間</th><th>結果通知</th></tr>
<tr><td>2次申込</td><td>2月25日〜3月5日</td><td>3月16日前後</td></tr>
</table>

<h2>選択肢2：年度途中入所を申し込む</h2>
<p>長野市では年度途中の入所も受け付けています。空きが出た施設に随時申し込みが可能です。</p>

<h2>選択肢3：認可外保育施設を利用する</h2>
<p>認可外保育施設は利用調整がないため、空きがあればすぐに入れます。復職して次年度に再挑戦する戦略として有効です。</p>

<h2>選択肢4：育児休業を延長する</h2>
<p>利用調整の結果、入所できなかった場合の通知書があれば育児休業を延長できます。ただし、給付認定申請書で「育児休業の延長も許容できる」にチェックした場合は基本点・調整点によらず20点となるため注意が必要です。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>長野市では「育休の延長も許容できる」にチェックすると点数が大幅に下がる（20点固定）ため、本気で入所を希望する場合はチェックしないようにしましょう。</p>
</div>

<h2>次年度に向けた準備</h2>
<ul>
<li>希望園を見直す（人気園以外も検討）</li>
<li>小規模保育事業も視野に入れる（卒所後に+10点の加点あり）</li>
<li>家庭の状況変化（転職、引越し等）で点数が変わる可能性を確認</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新の空き状況は<a href="https://www.city.nagano.nagano.jp/kosodate/menu/12/1/index.html" target="_blank" rel="noopener">長野市公式サイト「保育園・幼稚園・認定こども園・地域型保育事業」</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 30,
  },
];

registerArticles(articles);
