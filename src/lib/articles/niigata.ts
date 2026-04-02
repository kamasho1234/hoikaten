import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  // ===== 保活の基本 (1) =====
  {
    slug: "hokatsu-schedule",
    citySlug: "niigata",
    title: "新潟市の保活スケジュール　令和8年度4月入園の流れを解説",
    description:
      "新潟市の認可保育施設の申込時期・選考の流れ・内定通知時期をわかりやすく解説。令和8年度4月入園のスケジュールを中心にまとめました。",
    image:
      "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>令和8年度（2026年度）4月入園のスケジュール</h2>
<p>新潟市の4月入園は、<strong>1次募集</strong>と<strong>2次募集</strong>の2段階で行われます。</p>

<h3>1次募集</h3>
<table>
<tr><th>項目</th><th>日程</th></tr>
<tr><td>てびき配布</td><td>令和7年10月1日〜</td></tr>
<tr><td>申込受付期間</td><td>令和7年10月上旬〜11月中旬</td></tr>
<tr><td>結果通知</td><td>令和8年1月下旬〜2月上旬</td></tr>
</table>

<h3>2次募集</h3>
<table>
<tr><th>項目</th><th>日程</th></tr>
<tr><td>申込受付期間</td><td>令和8年2月上旬〜2月中旬</td></tr>
<tr><td>結果通知</td><td>令和8年3月上旬</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>「令和8年度4月入園のてびき 新潟市認可保育施設（2号・3号認定用）」は10月1日から各区役所健康福祉課で配布されます。利用調整指数表も掲載されているので必ず入手しましょう。</p>
</div>

<h2>いつから動き始めるべき？</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>4月〜6月：情報収集スタート</strong>
<p>新潟市の保育施設の種類やエリアごとの空き状況を調べましょう。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>7月〜9月：保育園見学</strong>
<p>気になる園に電話して見学予約。夏場が見学のベストシーズンです。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>10月：てびきを入手・書類準備</strong>
<p>区役所で「てびき」をもらい、必要書類を準備しましょう。</p>
</div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content">
<strong>10月〜11月：申込書類の提出</strong>
<p>就労証明書などの書類を揃えて、お住まいの区の区役所健康福祉課に提出します。</p>
</div>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳しくは<a href="https://www.city.niigata.lg.jp/kosodate/ninshin/life_stage/azuketai/ninnkahoikushisetsu/R0804nyuen.html" target="_blank" rel="noopener">新潟市公式サイト「認可保育施設への新年度入園について」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 55,
  },

  // ===== 点数・選考 (3) =====
  {
    slug: "scoring-system",
    citySlug: "niigata",
    title: "新潟市の保育園の指数はどう決まる？基準指数と調整指数をやさしく解説",
    description:
      "新潟市の保育園入園の「利用調整指数」について、基準指数と調整指数の仕組みをわかりやすく解説します。",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>新潟市の指数の仕組み</h2>
<p>新潟市の保育園入園の選考は<strong>「基準指数（父母それぞれ）＋調整指数（世帯）＝合計指数」</strong>で行われます。</p>

<h3>基準指数とは？</h3>
<p>保護者それぞれの「保育が必要な理由」に応じた点数です。父母それぞれ最大10点です。</p>
<table>
<tr><th>就労形態</th><th>点数</th></tr>
<tr><td>外勤：週5日以上かつ週35時間以上</td><td>10点</td></tr>
<tr><td>外勤：週5日以上かつ週28時間以上</td><td>9点</td></tr>
<tr><td>外勤：週4日以上かつ週28時間以上</td><td>8点</td></tr>
<tr><td>外勤：週4日以上かつ週16時間以上</td><td>7点</td></tr>
<tr><td>外勤：週3日以上かつ週12時間以上</td><td>6点</td></tr>
<tr><td>内勤・自営：週5日以上かつ週35時間以上</td><td>9点</td></tr>
<tr><td>内勤・自営：週4日以上かつ週28時間以上</td><td>7点</td></tr>
<tr><td>内勤・自営：週3日以上かつ週12時間以上</td><td>5点</td></tr>
</table>

<div class="point-box">
<p><strong>重要ポイント</strong></p>
<p>新潟市では<strong>外勤（雇用）と内勤・自営で点数が異なります</strong>。同じ週35時間以上でも、外勤なら10点、内勤・自営なら9点です。</p>
</div>

<h3>調整指数とは？</h3>
<p>世帯の状況に応じてプラスまたはマイナスされる点数です。</p>
<table>
<tr><th>項目</th><th>点数</th></tr>
<tr><td>ひとり親</td><td>+6</td></tr>
<tr><td>単身赴任（県外）</td><td>+4</td></tr>
<tr><td>単身赴任（県内）</td><td>+2</td></tr>
<tr><td>きょうだい同一園希望</td><td>+4</td></tr>
<tr><td>きょうだい在園（別園）</td><td>+2</td></tr>
<tr><td>多胎児同時申込</td><td>+3</td></tr>
<tr><td>認可外利用</td><td>+2</td></tr>
<tr><td>育休復帰</td><td>+2</td></tr>
<tr><td>生活保護</td><td>+3</td></tr>
<tr><td>同居保育可能者あり</td><td>-2</td></tr>
</table>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新の指数表は新潟市の「入園のてびき」をご確認ください。各区役所で配布しています。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 90,
  },
  {
    slug: "douten-taisaku",
    citySlug: "niigata",
    title: "新潟市で同じ指数になったらどうなる？同点時の優先順位と対策",
    description:
      "新潟市の保育園入園で同じ指数になった場合の優先順位ルールと、差をつけるための具体的な対策を解説します。",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>同じ指数の場合の優先順位</h2>
<p>新潟市では合計指数が同じ場合、以下の順で優先されます。</p>

<ol>
<li><strong>きょうだいが在園中</strong></li>
<li><strong>ひとり親世帯</strong></li>
<li><strong>多子世帯</strong>（未就学児が多い）</li>
<li><strong>所得が低い世帯</strong></li>
</ol>

<h2>同点対策のポイント</h2>
<ul>
<li>調整指数の加点項目を全て漏れなく申告する</li>
<li>単身赴任がある場合は必ず申告する（県外+4は大きい）</li>
<li>きょうだいが在園中の園を希望すると優先される</li>
<li>認可外保育施設を利用して加点を得る（+2点）</li>
<li>希望園を多めに書いて内定確率を上げる</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>利用調整の詳細は各区役所の健康福祉課にお問い合わせください。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 80,
  },
  {
    slug: "fulltime-score",
    citySlug: "niigata",
    title: "新潟市でフルタイム共働きは何点？20点の内訳と加点のコツ",
    description:
      "新潟市でフルタイム共働き世帯が何点になるのか、20点の内訳と加点で差をつける方法を解説します。",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>フルタイム共働きの基本点数</h2>
<p>新潟市では、両親ともに<strong>外勤で週5日以上かつ週35時間以上</strong>の就労で、基準指数は<strong>父10点＋母10点＝20点</strong>になります。</p>

<h3>注意：内勤・自営は最大9点</h3>
<p>内勤や自営業の場合、同じ週35時間以上でも9点になります。夫婦とも自営業なら18点が上限です。</p>

<h3>フルタイム＋加点の例</h3>
<table>
<tr><th>状況</th><th>合計指数</th></tr>
<tr><td>外勤フルタイム共働き（加点なし）</td><td>20点</td></tr>
<tr><td>＋ きょうだい同一園希望</td><td>24点</td></tr>
<tr><td>＋ 単身赴任（県外）</td><td>24点</td></tr>
<tr><td>＋ ひとり親</td><td>26点</td></tr>
<tr><td>＋ きょうだい＋育休復帰＋認可外利用</td><td>28点</td></tr>
</table>

<h2>加点で差をつけるには</h2>
<ul>
<li><strong>ひとり親（+6）</strong>：最も大きな加点</li>
<li><strong>単身赴任・県外（+4）</strong>：県外赴任なら大きな加点</li>
<li><strong>きょうだい同一園（+4）</strong>：きょうだいが在園中なら大きな加点</li>
<li><strong>認可外利用（+2）</strong>：認可外に預けていれば忘れずに申告</li>
<li><strong>育休復帰（+2）</strong>：入園月に復帰するなら忘れずに申告</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>新潟市は政令指定都市の中では比較的入りやすいですが、中央区・西区の人気園では20点でも競争になります。加点を積み上げましょう。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 85,
  },

  // ===== 地域情報 (2) =====
  {
    slug: "popular-areas",
    citySlug: "niigata",
    title: "新潟市で保育園に入りやすいエリアは？区ごとの激戦度を分析",
    description:
      "新潟市8区の保育園の入りやすさを比較。激戦区と穴場エリアの特徴を解説します。",
    image:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=400&fit=crop",
    category: "地域情報",
    categoryColor: "amber",
    content: `<h2>新潟市の区ごとの保育園事情</h2>
<p>新潟市は8つの区で構成されており、エリアによって保育園の入りやすさが異なります。</p>

<h3>激戦度マップ</h3>
<table>
<tr><th>区</th><th>激戦度</th><th>特徴</th></tr>
<tr><td>中央区</td><td>激戦</td><td>市の中心部。駅周辺のマンション世帯が多い</td></tr>
<tr><td>西区</td><td>やや激戦</td><td>新興住宅地が多く子育て世帯が増加中</td></tr>
<tr><td>東区</td><td>普通</td><td>工業地域と住宅地が混在</td></tr>
<tr><td>江南区</td><td>普通</td><td>郊外の住宅地。亀田地区は人気</td></tr>
<tr><td>秋葉区</td><td>穴場</td><td>旧新津市エリア。比較的余裕あり</td></tr>
<tr><td>南区</td><td>穴場</td><td>農村部が多く定員に余裕あり</td></tr>
<tr><td>西蒲区</td><td>穴場</td><td>郊外で比較的入りやすい</td></tr>
<tr><td>北区</td><td>穴場</td><td>旧豊栄市エリア。空きがある園も多い</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>中央区は20点でも入れない園がありますが、秋葉区・南区・西蒲区なら比較的余裕があります。新潟市は車通勤が一般的なので、少し離れたエリアも視野に入れましょう。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 75,
  },
  {
    slug: "niigata-winter-hokatsu",
    citySlug: "niigata",
    title: "雪国・新潟市の保育園選びで見るべき冬の環境チェックポイント",
    description:
      "新潟市ならではの冬の保育園選びのポイント。送迎のしやすさ、駐車場、除雪状況などを解説します。",
    image:
      "https://images.unsplash.com/photo-1491002052546-bf38f186af56?w=800&h=400&fit=crop",
    category: "地域情報",
    categoryColor: "amber",
    content: `<h2>新潟市の冬の保育園選びのポイント</h2>
<p>新潟市は日本海側の気候で、冬は雪が積もります。保育園選びでは夏場の見学だけでなく、冬の環境も考慮しましょう。</p>

<h3>チェックポイント</h3>
<ul>
<li><strong>駐車場の広さ</strong>：冬は除雪で駐車スペースが狭くなることがあります。台数と広さを確認</li>
<li><strong>送迎ルートの除雪状況</strong>：幹線道路沿いの園は除雪が早く送迎しやすい</li>
<li><strong>園舎の入口</strong>：屋根のある入口やロードヒーティングがあると雪の日も安心</li>
<li><strong>室内の暖房設備</strong>：床暖房や加湿器があるか</li>
<li><strong>冬場の外遊び</strong>：雪遊びの環境があるか、室内遊びのスペースは十分か</li>
</ul>

<h3>通勤と送迎を考えた園選び</h3>
<p>新潟市は車通勤が一般的です。冬場は通勤に時間がかかるため、以下を考慮しましょう。</p>
<ul>
<li>自宅〜園〜職場の動線上にある園を選ぶ</li>
<li>幹線道路沿いの園は雪の日も通いやすい</li>
<li>駅近の園は電車通勤の場合に便利</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>見学は夏場だけでなく、可能なら冬場にも一度訪問して送迎のしやすさを確認するのがおすすめです。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 60,
  },

  // ===== 育休・復職 (1) =====
  {
    slug: "ikukyu-fukki",
    citySlug: "niigata",
    title: "新潟市で育休明けに保育園に入るには？復帰加点と注意点",
    description:
      "新潟市で育児休業から復帰する際の保育園申込のポイント。育休復帰加点の条件と申請の注意点を解説します。",
    image:
      "https://images.unsplash.com/photo-1531983412531-1f49a365ffed?w=800&h=400&fit=crop",
    category: "育休・復職",
    categoryColor: "purple",
    content: `<h2>育休復帰の加点（+2点）</h2>
<p>新潟市では、育児休業を取得し、<strong>入園する月に職場復帰する</strong>場合に+2点の調整指数が加算されます。</p>

<h3>加点の条件</h3>
<ul>
<li>育児休業を取得中であること</li>
<li>入園月に復帰すること</li>
<li>復帰後の勤務条件が確認できること</li>
</ul>

<h2>育休明けの基準指数</h2>
<p>育休からの復帰予定の場合、復帰後の勤務条件で基準指数が判定されます。フルタイム復帰なら10点です。</p>

<h3>育休明け＋加点の例</h3>
<table>
<tr><th>状況</th><th>合計指数</th></tr>
<tr><td>外勤フルタイム復帰（加点なし）</td><td>20点</td></tr>
<tr><td>＋ 育休復帰</td><td>22点</td></tr>
<tr><td>＋ 育休復帰＋きょうだい同一園</td><td>26点</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>新潟市では育休復帰加点は+2と比較的小さいですが、20点台の争いでは大きな差になります。忘れずに申告しましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳しくは各区役所の健康福祉課にお問い合わせください。育休延長については<a href="https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/0000160564_00040.html" target="_blank" rel="noopener">厚生労働省の公式ページ</a>もご参照ください。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 70,
  },

  // ===== 施設選び (1) =====
  {
    slug: "naikin-jieigyou-score",
    citySlug: "niigata",
    title: "新潟市で自営業・内勤だと何点？外勤との差と対策",
    description:
      "新潟市では外勤と内勤・自営で点数が違います。自営業や在宅勤務の場合の点数と、差を埋めるための対策を解説します。",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>外勤と内勤・自営の点数差</h2>
<p>新潟市では、同じ就労時間でも<strong>外勤（雇用）の方が内勤・自営より高い点数</strong>になります。</p>

<table>
<tr><th>就労条件</th><th>外勤</th><th>内勤・自営</th></tr>
<tr><td>週5日以上・35時間以上</td><td>10点</td><td>9点</td></tr>
<tr><td>週4日以上・28時間以上</td><td>8点</td><td>7点</td></tr>
<tr><td>週3日以上・12時間以上</td><td>6点</td><td>5点</td></tr>
</table>

<h3>最大2点の差が生まれる</h3>
<p>夫婦ともに自営業の場合、フルタイムでも18点（9+9）にしかなりません。外勤フルタイム共働きの20点（10+10）と比べて2点の差があります。</p>

<h2>差を埋めるための対策</h2>
<ul>
<li><strong>調整指数を積み上げる</strong>：きょうだい加点（+4）、育休復帰（+2）、認可外利用（+2）など</li>
<li><strong>単身赴任加点の確認</strong>：県外単身赴任なら+4と大きい</li>
<li><strong>就労証明書の書き方</strong>：就労時間を正確に記載してもらう。実態に即した時間を証明することが重要</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>自営業の場合、就労証明書は自分で記入することになります。実態の就労時間を正確に記載しましょう。虚偽の記載は入園取消しの対象になります。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 65,
  },

  // ===== 手続き (1) =====
  {
    slug: "hitsuyo-shorui",
    citySlug: "niigata",
    title: "新潟市の保育園申込に必要な書類リスト　忘れがちな書類も解説",
    description:
      "新潟市の保育園申込に必要な書類を一覧にまとめました。忘れがちな書類や注意点も解説します。",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "手続き",
    categoryColor: "rose",
    content: `<h2>必要書類一覧</h2>

<h3>全員が必要な書類</h3>
<ul>
<li>子どものための教育・保育給付認定申請書兼利用申込書</li>
<li>マイナンバー確認書類</li>
<li>本人確認書類</li>
</ul>

<h3>保育が必要な理由を証明する書類</h3>
<table>
<tr><th>理由</th><th>必要書類</th></tr>
<tr><td>就労（外勤）</td><td>就労証明書（勤務先に記入してもらう）</td></tr>
<tr><td>就労（内勤・自営）</td><td>就労証明書（自分で記入）＋確定申告書等の写し</td></tr>
<tr><td>疾病</td><td>診断書</td></tr>
<tr><td>障害</td><td>障害者手帳のコピー</td></tr>
<tr><td>介護</td><td>介護状況申告書＋対象者の証明書</td></tr>
<tr><td>出産</td><td>母子健康手帳のコピー</td></tr>
<tr><td>就学</td><td>在学証明書・時間割</td></tr>
<tr><td>求職活動</td><td>求職活動に関する申立書</td></tr>
</table>

<h3>忘れがちな書類</h3>
<ul>
<li><strong>就労証明書</strong>：勤務先に依頼してから届くまで2〜3週間かかることも。早めに依頼しましょう</li>
<li><strong>自営業の確定申告書</strong>：内勤・自営の場合、就労証明書だけでなく確定申告書のコピーが必要です</li>
<li><strong>課税証明書</strong>：転入の場合に必要になることがあります</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新の必要書類は<a href="https://www.city.niigata.lg.jp/kosodate/ninshin/life_stage/azuketai/ninnkahoikushisetsu/hoiku_yoshiki.html" target="_blank" rel="noopener">新潟市公式サイト「保育施設関係様式集」</a>からダウンロードできます。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 45,
  },
];

registerArticles(articles);
