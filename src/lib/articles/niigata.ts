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

  // ===== 追加記事 40本 (2026-04-07) =====
  {
    slug: "nursery-visit-guide",
    citySlug: "niigata",
    title: "新潟市の保育園見学ガイド　見るべきポイントと質問リスト",
    description:
      "新潟市で保育園見学をする際にチェックすべきポイントと、園に聞いておくべき質問リストをまとめました。",
    image:
      "https://images.unsplash.com/photo-1587654780210-e3ca2d074509?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>見学のタイミング</h2>
<p>新潟市の保育園見学は<strong>7月〜9月</strong>がベストシーズンです。10月の申込開始前に余裕をもって回りましょう。</p>

<h3>見学時にチェックすべきポイント</h3>
<ul>
<li><strong>園庭の広さ</strong>：子どもが十分に遊べるスペースがあるか</li>
<li><strong>保育士の対応</strong>：子どもへの声かけの様子、笑顔があるか</li>
<li><strong>衛生面</strong>：トイレや給食室の清潔さ</li>
<li><strong>駐車場</strong>：台数と広さ（新潟市は車送迎が多い）</li>
<li><strong>冬場の対策</strong>：除雪体制、屋根付きの送迎スペースの有無</li>
<li><strong>給食</strong>：自園調理か外部委託か、アレルギー対応の有無</li>
</ul>

<h3>園に聞いておくべき質問</h3>
<ul>
<li>延長保育の時間と料金</li>
<li>土曜保育の利用条件</li>
<li>慣らし保育の期間</li>
<li>持ち物（おむつ・布団など）の詳細</li>
<li>保護者参加の行事の頻度</li>
<li>病児・病後児保育への対応</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>新潟市は車通勤が一般的なので、自宅〜園〜職場の動線を実際に走ってみると通園のイメージがつかめます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 50,
  },
  {
    slug: "zero-vs-one-year",
    citySlug: "niigata",
    title: "新潟市で0歳入園と1歳入園どちらが有利？枠数と競争率を比較",
    description:
      "新潟市で0歳児クラスと1歳児クラスのどちらに申し込むべきか、定員枠と競争率の観点から比較解説します。",
    image:
      "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>0歳入園と1歳入園の違い</h2>
<p>新潟市の認可保育施設では、0歳児クラスと1歳児クラスで定員構成が異なります。</p>

<h3>0歳児クラスの特徴</h3>
<ul>
<li>定員が少ない（6〜9名程度の園が多い）</li>
<li>申込者も比較的少ない</li>
<li>入園月齢に制限がある園がある（生後57日〜、生後6か月〜など）</li>
<li>育休を早めに切り上げる必要がある</li>
</ul>

<h3>1歳児クラスの特徴</h3>
<ul>
<li>0歳からの持ち上がりがあるため、新規枠が限られる</li>
<li>育休明けの申込が集中しやすい</li>
<li>中央区・西区の人気園では競争が激しい</li>
</ul>

<h3>どちらが入りやすい？</h3>
<p>一般的には<strong>0歳入園の方が入りやすい傾向</strong>があります。1歳児クラスは持ち上がりがあるため新規枠が狭くなります。ただし新潟市は全体的に待機児童が少なく、エリアによっては1歳でも十分入れます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>中央区・西区の人気園を狙う場合は0歳入園が有利です。秋葉区・南区・西蒲区なら1歳入園でも余裕があることが多いです。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 55,
  },
  {
    slug: "single-parent-guide",
    citySlug: "niigata",
    title: "新潟市のひとり親家庭の保活ガイド　加点と優先制度を解説",
    description:
      "新潟市でひとり親家庭が保育園に申し込む際の加点（+6点）や優先制度、利用できる支援をまとめました。",
    image:
      "https://images.unsplash.com/photo-1476234251651-f353a9b85714?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>ひとり親家庭の加点</h2>
<p>新潟市ではひとり親家庭に<strong>調整指数+6点</strong>が加算されます。これは新潟市の調整指数の中で最大の加点です。</p>

<h3>加点の条件</h3>
<ul>
<li>戸籍上ひとり親であること（離婚・死別・未婚など）</li>
<li>戸籍謄本等の証明書類の提出が必要</li>
</ul>

<h3>ひとり親の点数シミュレーション</h3>
<table>
<tr><th>状況</th><th>合計指数</th></tr>
<tr><td>外勤フルタイム＋ひとり親</td><td>16点（10+6）</td></tr>
<tr><td>＋ きょうだい同一園希望</td><td>20点</td></tr>
<tr><td>＋ 認可外利用</td><td>18点</td></tr>
</table>

<h2>ひとり親が利用できる支援</h2>
<ul>
<li><strong>保育料の軽減</strong>：市民税非課税世帯は保育料無料</li>
<li><strong>同点時の優先</strong>：同じ指数の場合、ひとり親世帯が優先されます</li>
<li><strong>ファミリー・サポート・センター</strong>：送迎の援助を受けられます</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>ひとり親家庭向けの支援については<a href="https://www.city.niigata.lg.jp/kosodate/ninshin/shien/hitorioya/index.html" target="_blank" rel="noopener">新潟市公式サイト「ひとり親家庭への支援」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 60,
  },
  {
    slug: "ikukyu-timing",
    citySlug: "niigata",
    title: "新潟市で育休はいつまで取る？入園タイミングと育休期間の最適解",
    description:
      "新潟市の保育園申込スケジュールに合わせた育休期間の考え方と、4月入園に向けた最適なタイミングを解説します。",
    image:
      "https://images.unsplash.com/photo-1531983412531-1f49a365ffed?w=800&h=400&fit=crop",
    category: "育休・復職",
    categoryColor: "purple",
    content: `<h2>育休期間と入園タイミングの関係</h2>
<p>新潟市では4月入園が最も枠が多いため、<strong>4月入園に合わせた育休計画</strong>が基本です。</p>

<h3>生まれ月別の育休パターン</h3>
<table>
<tr><th>生まれ月</th><th>育休期間</th><th>入園時の月齢</th></tr>
<tr><td>4〜6月生まれ</td><td>約10〜12か月</td><td>0歳10か月〜1歳0か月</td></tr>
<tr><td>7〜9月生まれ</td><td>約7〜9か月</td><td>0歳7か月〜0歳9か月</td></tr>
<tr><td>10〜12月生まれ</td><td>約4〜6か月</td><td>0歳4か月〜0歳6か月</td></tr>
<tr><td>1〜3月生まれ</td><td>約13〜15か月</td><td>1歳1か月〜1歳3か月</td></tr>
</table>

<h3>育休復帰の加点（+2点）を活用</h3>
<p>新潟市では入園月に復帰する場合に+2点の加点があります。4月入園＋4月復帰で申請しましょう。</p>

<h2>育休延長が必要な場合</h2>
<p>1〜3月生まれの場合、翌年度4月入園だと育休が1年を超えます。育休延長の手続きについては勤務先と早めに相談してください。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>10〜12月生まれは0歳入園だと月齢が低いため、園によっては受入不可の場合があります。受入月齢を事前に確認しましょう。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 55,
  },
  {
    slug: "ninkagai-selection",
    citySlug: "niigata",
    title: "新潟市の認可外保育施設の選び方　チェックポイントと注意点",
    description:
      "新潟市で認可外保育施設を選ぶ際のチェックポイントと注意点を解説。認可園の加点（+2点）のための活用法もまとめました。",
    image:
      "https://images.unsplash.com/photo-1587654780210-e3ca2d074509?w=800&h=400&fit=crop",
    category: "施設選び",
    categoryColor: "amber",
    content: `<h2>新潟市の認可外保育施設</h2>
<p>新潟市には認可外保育施設があり、認可園に入れなかった場合の選択肢になります。また、認可外利用で認可園申込時に<strong>+2点の加点</strong>が得られます。</p>

<h3>選び方のチェックポイント</h3>
<ul>
<li><strong>立入検査の結果</strong>：新潟市が実施する立入検査の結果を確認</li>
<li><strong>保育士の配置</strong>：有資格者の割合を確認</li>
<li><strong>保育料</strong>：月額の費用と追加料金の有無</li>
<li><strong>開所時間</strong>：延長保育の対応</li>
<li><strong>給食</strong>：提供の有無と内容</li>
<li><strong>安全面</strong>：設備の状態、避難経路の確認</li>
</ul>

<h3>加点を得るための条件</h3>
<p>認可園申込時に認可外利用の加点（+2点）を得るには、認可外保育施設に預けていることを証明する書類の提出が必要です。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>認可外保育施設の一覧は各区役所の健康福祉課にお問い合わせください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 45,
  },
  {
    slug: "futago-hokatsu",
    citySlug: "niigata",
    title: "新潟市で双子の保活　多胎児加点（+3点）と同一園入園のコツ",
    description:
      "新潟市で双子・多胎児の保活を成功させるための加点制度と、同じ園に入るためのポイントを解説します。",
    image:
      "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>多胎児の加点制度</h2>
<p>新潟市では多胎児（双子・三つ子など）の同時申込で<strong>+3点の調整指数</strong>が加算されます。</p>

<h3>双子の点数シミュレーション</h3>
<table>
<tr><th>状況</th><th>合計指数</th></tr>
<tr><td>外勤フルタイム共働き＋多胎児</td><td>23点</td></tr>
<tr><td>＋ 育休復帰</td><td>25点</td></tr>
</table>

<h2>同一園に入るためのコツ</h2>
<ul>
<li><strong>希望園の定員を確認</strong>：0歳児クラス6名の園に双子で申し込むと枠の1/3を占めるため不利になることも</li>
<li><strong>定員の多い園を選ぶ</strong>：0歳児の定員が多い園なら双子でも入りやすい</li>
<li><strong>希望園を多めに記入</strong>：同一園に入れる確率を上げるため、希望園数を多く記入しましょう</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>新潟市では多胎児の同一園入園について配慮がなされています。詳しくは区役所の健康福祉課に相談しましょう。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 40,
  },
  {
    slug: "hoiku-mama-interview",
    citySlug: "niigata",
    title: "新潟市の保活体験談　先輩ママが語る成功のポイント",
    description:
      "新潟市で保活を経験した先輩ママの体験談をもとに、保活成功のポイントをまとめました。",
    image:
      "https://images.unsplash.com/photo-1476234251651-f353a9b85714?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>保活成功のポイント</h2>
<p>新潟市で実際に保活を経験したママたちの声をもとに、成功のポイントをまとめました。</p>

<h3>ポイント1：早めの情報収集</h3>
<p>妊娠中から情報収集を始めた方が多く、産後は忙しくなるため早めの行動が吉。新潟市の「入園のてびき」は10月配布ですが、前年度版を参考に事前準備できます。</p>

<h3>ポイント2：見学は複数園</h3>
<p>実際に見学すると園の雰囲気がわかります。新潟市内でも園によって方針が大きく異なるため、最低3〜5園は見学しましょう。</p>

<h3>ポイント3：希望園は多めに書く</h3>
<p>新潟市では希望園を複数記入できます。第1希望だけでなく、通える範囲の園を幅広く記入することで内定確率が上がります。</p>

<h3>ポイント4：加点の確認</h3>
<p>認可外利用（+2点）や育休復帰（+2点）など、該当する加点を全て申告しているか確認しましょう。</p>

<h3>ポイント5：冬の送迎シミュレーション</h3>
<p>新潟市は冬場の雪が大変です。実際に冬の朝に通園ルートを走ってみると、思った以上に時間がかかることがわかります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>新潟市は全国的に見ると保育園に入りやすい方ですが、中央区の人気園は競争があります。エリアを広げて検討しましょう。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 45,
  },
  {
    slug: "waiting-child-data",
    citySlug: "niigata",
    title: "新潟市の待機児童数の推移　最新データと傾向を分析",
    description:
      "新潟市の待機児童数の推移と最新データを分析。エリア別の傾向と今後の見通しを解説します。",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "地域情報",
    categoryColor: "amber",
    content: `<h2>新潟市の待機児童数の推移</h2>
<p>新潟市は待機児童対策に力を入れており、近年は待機児童数が大幅に減少しています。</p>

<h3>待機児童数の推移</h3>
<p>新潟市は政令指定都市の中でも待機児童が少ない自治体です。こども未来部が中心となって保育施設の整備を進めています。</p>

<h3>エリア別の傾向</h3>
<ul>
<li><strong>中央区</strong>：市の中心部で需要が高い。マンション開発に伴い保育ニーズが増加</li>
<li><strong>西区</strong>：新興住宅地で子育て世帯が増加中</li>
<li><strong>東区・江南区</strong>：比較的バランスが取れている</li>
<li><strong>秋葉区・南区・西蒲区・北区</strong>：定員に余裕がある園が多い</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>新潟市全体では待機児童は少ないですが、「希望する園に入れない」隠れ待機児童は存在します。人気エリアでは複数園を検討しましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新の待機児童数は<a href="https://www.city.niigata.lg.jp/kosodate/ninshin/life_stage/azuketai/ninnkahoikushisetsu/" target="_blank" rel="noopener">新潟市公式サイト</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 50,
  },
  {
    slug: "small-nursery-guide",
    citySlug: "niigata",
    title: "新潟市の小規模保育事業とは？特徴と3歳の壁への対処法",
    description:
      "新潟市の小規模保育事業（定員19人以下）の特徴と、卒園後の「3歳の壁」への対処法を解説します。",
    image:
      "https://images.unsplash.com/photo-1587654780210-e3ca2d074509?w=800&h=400&fit=crop",
    category: "施設選び",
    categoryColor: "amber",
    content: `<h2>小規模保育事業とは</h2>
<p>定員19人以下の小さな保育施設で、0〜2歳児を対象としています。新潟市内にも複数の小規模保育施設があります。</p>

<h3>メリット</h3>
<ul>
<li>少人数なので一人ひとりに目が届きやすい</li>
<li>家庭的な雰囲気で過ごせる</li>
<li>認可園より入りやすいことが多い</li>
</ul>

<h3>デメリット（3歳の壁）</h3>
<ul>
<li>2歳児クラスまでなので、3歳からの転園先を探す必要がある</li>
<li>連携施設が設定されている場合は優先的に転園可能</li>
</ul>

<h2>3歳の壁への対処法</h2>
<ul>
<li><strong>連携施設を確認</strong>：入園前に連携先の保育園や幼稚園を確認しましょう</li>
<li><strong>幼稚園も検討</strong>：3歳からは幼稚園の預かり保育も選択肢に</li>
<li><strong>認定こども園</strong>：0〜5歳まで通える認定こども園への転園も検討</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>新潟市では小規模保育施設の卒園児について、連携施設への優先入園が設定されている場合があります。入園前に必ず確認しましょう。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 45,
  },
  {
    slug: "secondchild-hokatsu",
    citySlug: "niigata",
    title: "新潟市の2人目保活　きょうだい加点（+4点）を最大活用する方法",
    description:
      "新潟市で2人目の保育園入園を目指す際のきょうだい加点（+4点）の仕組みと、同一園入園のための戦略を解説します。",
    image:
      "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>きょうだい加点の仕組み</h2>
<p>新潟市ではきょうだいに関する加点が2種類あります。</p>
<table>
<tr><th>条件</th><th>加点</th></tr>
<tr><td>きょうだいと同一園を希望</td><td>+4点</td></tr>
<tr><td>きょうだいが在園中（別園希望）</td><td>+2点</td></tr>
</table>

<h3>同一園希望の+4点は大きい</h3>
<p>フルタイム共働き20点＋きょうだい同一園+4点＝<strong>24点</strong>になります。ほとんどの園で安全圏に入る点数です。</p>

<h2>2人目保活の戦略</h2>
<ul>
<li><strong>上の子と同じ園の第1希望</strong>にして+4点を確保</li>
<li><strong>別園でもOKなら希望園を増やす</strong>（別園でも+2点あり）</li>
<li><strong>育休復帰（+2点）</strong>も合わせて申告</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>きょうだい同一園希望の+4点は同点時の優先順位でも有利に働きます。上の子と同じ園を狙うのが最も確実な戦略です。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 60,
  },
  {
    slug: "self-employed-score",
    citySlug: "niigata",
    title: "新潟市で自営業の保活　就労証明書の書き方と点数アップのコツ",
    description:
      "新潟市で自営業者が保育園に申し込む際の就労証明書の書き方と、点数を上げるための対策を解説します。",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>自営業の基準指数</h2>
<p>新潟市では自営業（内勤・自営）の基準指数は外勤より1〜2点低く設定されています。</p>
<table>
<tr><th>就労条件</th><th>外勤</th><th>内勤・自営</th></tr>
<tr><td>週5日以上・35時間以上</td><td>10点</td><td>9点</td></tr>
<tr><td>週4日以上・28時間以上</td><td>8点</td><td>7点</td></tr>
<tr><td>週3日以上・12時間以上</td><td>6点</td><td>5点</td></tr>
</table>

<h3>就労証明書の書き方</h3>
<ul>
<li>自営業の場合は<strong>自分で就労証明書を記入</strong>します</li>
<li>就労時間は実態に即して正確に記載する</li>
<li><strong>確定申告書の写し</strong>の添付が必要</li>
<li>開業届の写しがあると証明力が高まる</li>
</ul>

<h2>点数アップのコツ</h2>
<ul>
<li>調整指数で差を埋める（きょうだい+4、認可外+2など）</li>
<li>就労時間を正確に申告して最大限の基準指数を確保</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>虚偽の記載は入園取消しの対象になります。実態の就労時間を正確に記載しましょう。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 50,
  },
  {
    slug: "naishoku-score",
    citySlug: "niigata",
    title: "新潟市で在宅ワーク・内職の場合の点数は？保活の注意点",
    description:
      "新潟市で在宅ワークや内職をしている場合の保育園申込の点数と、申請時の注意点を解説します。",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>在宅ワーク・内職の点数</h2>
<p>新潟市では在宅ワークや内職は「内勤・自営」に分類され、外勤より基準指数が低くなります。</p>

<table>
<tr><th>就労条件</th><th>内勤・自営の点数</th></tr>
<tr><td>週5日以上・35時間以上</td><td>9点</td></tr>
<tr><td>週4日以上・28時間以上</td><td>7点</td></tr>
<tr><td>週3日以上・12時間以上</td><td>5点</td></tr>
</table>

<h3>在宅ワークの証明方法</h3>
<ul>
<li>雇用されている場合：勤務先に就労証明書を記入してもらう（在宅勤務と明記）</li>
<li>フリーランス・個人事業主の場合：自分で就労証明書を記入＋確定申告書等の写し</li>
<li>クラウドソーシング等の場合：報酬の証明書類も準備</li>
</ul>

<h2>注意点</h2>
<ul>
<li>在宅勤務でも実際に保育が必要な状況であることが求められます</li>
<li>「同居保育可能者あり」の減点（-2点）に該当しないか確認</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>在宅勤務であっても就労時間が週35時間以上なら9点です。調整指数を積み上げて差を補いましょう。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 45,
  },
  {
    slug: "kyushoku-hokatsu",
    citySlug: "niigata",
    title: "新潟市の保育園の給食事情　自園調理とアレルギー対応を解説",
    description:
      "新潟市の保育園の給食について、自園調理の割合やアレルギー対応、給食費の目安をまとめました。",
    image:
      "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "施設選び",
    categoryColor: "amber",
    content: `<h2>新潟市の保育園の給食</h2>
<p>新潟市の認可保育園では、基本的に<strong>自園調理の給食</strong>が提供されます。</p>

<h3>給食の特徴</h3>
<ul>
<li>0〜2歳児：完全給食（主食＋副食）</li>
<li>3〜5歳児：基本的に完全給食（園によって主食持参の場合あり）</li>
<li>新潟県産のお米を使用する園が多い</li>
<li>地元の食材を使った食育に力を入れる園も</li>
</ul>

<h3>アレルギー対応</h3>
<ul>
<li>多くの園で除去食・代替食の対応あり</li>
<li>医師の診断書（アレルギー疾患生活管理指導表）の提出が必要</li>
<li>対応範囲は園によって異なるため、見学時に確認を</li>
</ul>

<h3>給食費の目安</h3>
<p>3〜5歳児の給食費は月額5,000〜7,000円程度が目安です（園によって異なります）。0〜2歳児は保育料に含まれます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>食物アレルギーがある場合は、見学時に具体的な対応内容を確認しましょう。園によって対応レベルが異なります。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 40,
  },
  {
    slug: "tenshoku-timing",
    citySlug: "niigata",
    title: "新潟市で転職と保活を両立するには？点数への影響と最適タイミング",
    description:
      "新潟市で保活中に転職する場合の点数への影響と、転職のベストタイミングを解説します。",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=400&fit=crop",
    category: "育休・復職",
    categoryColor: "purple",
    content: `<h2>転職が点数に与える影響</h2>
<p>保育園申込後に転職した場合、就労証明書の再提出が必要です。転職先の勤務条件によって基準指数が変わる可能性があります。</p>

<h3>転職のタイミング別リスク</h3>
<table>
<tr><th>タイミング</th><th>リスク</th></tr>
<tr><td>申込前に転職完了</td><td>低い（新しい就労証明書で申込）</td></tr>
<tr><td>申込後〜選考前に転職</td><td>中（就労証明書の再提出が必要）</td></tr>
<tr><td>内定後に転職</td><td>高い（条件変更の届出が必要、場合により内定取消し）</td></tr>
</table>

<h2>最適なタイミング</h2>
<ul>
<li><strong>申込前に転職を完了</strong>させるのがベスト</li>
<li>転職先の勤務条件がフルタイムなら基準指数は変わらない</li>
<li>試用期間中でも就労証明書は発行してもらえる</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>転職で勤務条件が変わると点数も変わります。保活中の転職は、申込前に完了させるのが最も安全です。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 45,
  },
  {
    slug: "age2-nyuen",
    citySlug: "niigata",
    title: "新潟市で2歳児クラスに入園するには？途中入園の可能性と対策",
    description:
      "新潟市で2歳児クラスへの入園を目指す場合のポイント。年度途中入園の空き状況と申込方法を解説します。",
    image:
      "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>2歳児クラスの入園事情</h2>
<p>2歳児クラスは0〜1歳からの持ち上がりがあるため、4月入園の新規枠は限られます。ただし新潟市は全体的に待機児童が少ないため、エリアによっては空きがあります。</p>

<h3>4月入園と途中入園</h3>
<table>
<tr><th>入園時期</th><th>特徴</th></tr>
<tr><td>4月入園</td><td>新規枠が最も多い。申込は前年10〜11月</td></tr>
<tr><td>途中入園（5月〜3月）</td><td>退園や転園で空きが出た場合に入園可能。毎月受付</td></tr>
</table>

<h3>途中入園の申込方法</h3>
<ul>
<li>毎月の締切日までに申込書類を区役所健康福祉課に提出</li>
<li>空きがある園に限り利用調整が行われる</li>
<li>希望園に空きがなくても申込を出しておくと、空きが出た際に調整対象になる</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>2歳児で途中入園を目指す場合は、早めに申込を出しておくことが大切です。空き状況は区役所に問い合わせれば教えてもらえます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 40,
  },
  {
    slug: "age3-ikou",
    citySlug: "niigata",
    title: "新潟市で3歳から保育園・幼稚園に移行するには？選択肢と手続き",
    description:
      "新潟市で3歳児クラスからの入園や小規模保育からの転園について、選択肢と手続きを解説します。",
    image:
      "https://images.unsplash.com/photo-1587654780210-e3ca2d074509?w=800&h=400&fit=crop",
    category: "施設選び",
    categoryColor: "amber",
    content: `<h2>3歳からの選択肢</h2>
<p>3歳児クラスから入園・転園する場合、以下の選択肢があります。</p>

<h3>保育施設の種類</h3>
<table>
<tr><th>施設</th><th>特徴</th></tr>
<tr><td>認可保育園</td><td>就労等の保育の必要性あり。11時間保育</td></tr>
<tr><td>認定こども園</td><td>保育部分と教育部分あり。幼稚園的な活動も</td></tr>
<tr><td>幼稚園（預かり保育あり）</td><td>教育時間＋預かり保育で就労中も利用可能</td></tr>
</table>

<h3>小規模保育からの転園</h3>
<p>小規模保育事業は2歳児クラスまでのため、3歳からは転園が必要です。</p>
<ul>
<li>連携施設が設定されている場合は優先的に転園可能</li>
<li>連携施設がない場合は通常の申込と同じ選考</li>
<li>4月入園の申込スケジュールに合わせて手続き</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>3歳児クラスは幼稚園からの受入もあるため、認可保育園の3歳児枠は意外と多い場合があります。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 40,
  },
  {
    slug: "nyuyoji-age0",
    citySlug: "niigata",
    title: "新潟市の0歳児保育　受入月齢と園選びのポイント",
    description:
      "新潟市で0歳児を保育園に預ける場合の受入月齢の違いや、0歳児保育を選ぶ際の注意点を解説します。",
    image:
      "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=800&h=400&fit=crop",
    category: "施設選び",
    categoryColor: "amber",
    content: `<h2>0歳児の受入月齢</h2>
<p>新潟市の保育園では、園によって0歳児の受入開始月齢が異なります。</p>

<h3>受入月齢の目安</h3>
<table>
<tr><th>受入月齢</th><th>特徴</th></tr>
<tr><td>生後57日〜</td><td>産休明けから預けられる。対応園は限られる</td></tr>
<tr><td>生後3か月〜</td><td>首がすわる頃から。比較的多くの園で対応</td></tr>
<tr><td>生後6か月〜</td><td>離乳食が始まる頃から。最も多いパターン</td></tr>
</table>

<h3>0歳児保育のチェックポイント</h3>
<ul>
<li><strong>保育士の配置</strong>：0歳児は子ども3人に保育士1人が国の基準</li>
<li><strong>SIDS対策</strong>：午睡時のチェック体制を確認</li>
<li><strong>授乳・離乳食</strong>：冷凍母乳の対応、離乳食の進め方</li>
<li><strong>室内環境</strong>：ハイハイできるスペース、安全対策</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>受入月齢は園によって異なります。4月入園時点の月齢を計算して、受入可能な園をリストアップしましょう。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 45,
  },
  {
    slug: "nintei-kodomoen",
    citySlug: "niigata",
    title: "新潟市の認定こども園とは？保育園との違いと選び方",
    description:
      "新潟市の認定こども園の特徴と、保育園との違い、どちらを選ぶべきかの判断基準を解説します。",
    image:
      "https://images.unsplash.com/photo-1587654780210-e3ca2d074509?w=800&h=400&fit=crop",
    category: "施設選び",
    categoryColor: "amber",
    content: `<h2>認定こども園とは</h2>
<p>認定こども園は、保育園と幼稚園の機能を併せ持つ施設です。新潟市内にも多くの認定こども園があります。</p>

<h3>保育園との違い</h3>
<table>
<tr><th>項目</th><th>保育園</th><th>認定こども園</th></tr>
<tr><td>対象年齢</td><td>0〜5歳</td><td>0〜5歳</td></tr>
<tr><td>利用条件</td><td>保育の必要性あり</td><td>保育部分は必要性あり、教育部分は誰でも</td></tr>
<tr><td>教育活動</td><td>園による</td><td>幼稚園教育要領に基づく教育あり</td></tr>
<tr><td>保育時間</td><td>11時間（標準）</td><td>保育部分は11時間、教育部分は4時間</td></tr>
</table>

<h3>認定こども園を選ぶメリット</h3>
<ul>
<li>保育と教育の両方を受けられる</li>
<li>就労状況が変わっても退園しなくてよい</li>
<li>園行事が充実している傾向がある</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>認定こども園の保育部分（2号・3号認定）は、認可保育園と同じ選考基準で利用調整されます。点数の計算方法も同じです。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 45,
  },
  {
    slug: "kigyou-shudogata",
    citySlug: "niigata",
    title: "新潟市の企業主導型保育事業とは？メリットと利用方法",
    description:
      "新潟市にある企業主導型保育事業の特徴、メリット・デメリット、利用方法を解説します。",
    image:
      "https://images.unsplash.com/photo-1587654780210-e3ca2d074509?w=800&h=400&fit=crop",
    category: "施設選び",
    categoryColor: "amber",
    content: `<h2>企業主導型保育事業とは</h2>
<p>企業が従業員のために設置する保育施設で、地域枠として従業員以外も利用できます。認可外保育施設の一種ですが、国の助成を受けています。</p>

<h3>メリット</h3>
<ul>
<li>認可園の利用調整を経ずに直接契約で入園可能</li>
<li>認可園並みの保育料設定が多い</li>
<li>企業の従業員は優先的に利用可能</li>
<li>認可園に落ちた場合の受け皿になる</li>
</ul>

<h3>デメリット</h3>
<ul>
<li>認可園の利用調整の加点対象にならない場合がある</li>
<li>園によって保育の質にばらつきがある</li>
<li>経営状態によっては突然閉園のリスクも</li>
</ul>

<h2>新潟市での利用方法</h2>
<ul>
<li>直接施設に問い合わせて空き状況を確認</li>
<li>従業員枠と地域枠があり、地域枠は定員の一部</li>
<li>市の利用調整とは別の手続きになる</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>企業主導型保育事業の一覧は<a href="https://www.kigyounaihoiku.jp/" target="_blank" rel="noopener">企業主導型保育事業ポータル</a>で検索できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 35,
  },
  {
    slug: "yakan-hoiku",
    citySlug: "niigata",
    title: "新潟市の夜間保育・延長保育　対応園と利用条件",
    description:
      "新潟市で夜間保育や延長保育を利用したい場合の対応園と利用条件、料金の目安を解説します。",
    image:
      "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "施設選び",
    categoryColor: "amber",
    content: `<h2>延長保育</h2>
<p>新潟市の認可保育園では、通常の保育時間（標準時間11時間、短時間8時間）を超えて預ける延長保育を実施している園があります。</p>

<h3>延長保育の概要</h3>
<table>
<tr><th>項目</th><th>内容</th></tr>
<tr><td>対象</td><td>就労等で通常時間内にお迎えが間に合わない保護者</td></tr>
<tr><td>時間</td><td>園によって異なるが、最大19:00〜20:00頃まで</td></tr>
<tr><td>料金</td><td>月額または日額（園によって異なる）</td></tr>
</table>

<h3>夜間保育</h3>
<p>夜間保育（夜10時頃まで）を実施している園は新潟市では限られています。夜勤がある方は、区役所の健康福祉課に相談して対応園を確認しましょう。</p>

<h2>シフト勤務の方の対策</h2>
<ul>
<li>延長保育のある園を優先的に選ぶ</li>
<li>ファミリー・サポート・センターの利用を検討</li>
<li>祖父母など親族のサポート体制を確認</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>延長保育の実施状況は園によって異なります。見学時に具体的な時間と料金を確認しましょう。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 35,
  },
  {
    slug: "mushoka-seido",
    citySlug: "niigata",
    title: "新潟市の幼児教育・保育無償化　対象と手続きを解説",
    description:
      "新潟市での幼児教育・保育無償化の対象施設・対象年齢・手続き方法をわかりやすく解説します。",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "お金・制度",
    categoryColor: "green",
    content: `<h2>無償化の対象</h2>
<p>2019年10月から始まった幼児教育・保育の無償化は、新潟市でも適用されています。</p>

<h3>対象と無償化の範囲</h3>
<table>
<tr><th>対象</th><th>無償化の内容</th></tr>
<tr><td>3〜5歳児（全世帯）</td><td>認可保育園・認定こども園の保育料が無料</td></tr>
<tr><td>0〜2歳児（非課税世帯）</td><td>認可保育園・認定こども園の保育料が無料</td></tr>
<tr><td>認可外保育施設</td><td>3〜5歳：月額37,000円まで。0〜2歳（非課税世帯）：月額42,000円まで</td></tr>
</table>

<h3>無償化の対象外</h3>
<ul>
<li>給食費（3〜5歳児の副食費等）</li>
<li>延長保育料</li>
<li>教材費、行事費等の実費</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>3〜5歳児の保育料は無料ですが、給食費（月額5,000〜7,000円程度）は別途かかります。年収360万円未満世帯等は給食費も免除される場合があります。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳しくは<a href="https://www.city.niigata.lg.jp/kosodate/ninshin/life_stage/azuketai/ninnkahoikushisetsu/hoikuitiran.html" target="_blank" rel="noopener">新潟市公式サイト「幼児教育・保育の無償化」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 55,
  },
  {
    slug: "shokuhi-jippi",
    citySlug: "niigata",
    title: "新潟市の保育園でかかる実費　給食費・教材費・行事費の目安",
    description:
      "新潟市の保育園で保育料以外にかかる実費（給食費、教材費、行事費など）の目安をまとめました。",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "お金・制度",
    categoryColor: "green",
    content: `<h2>保育料以外にかかる費用</h2>
<p>保育料無償化後も、保育園では各種実費がかかります。</p>

<h3>主な実費の目安</h3>
<table>
<tr><th>費目</th><th>目安金額</th></tr>
<tr><td>給食費（3〜5歳児）</td><td>月額5,000〜7,000円</td></tr>
<tr><td>延長保育料</td><td>月額2,000〜5,000円</td></tr>
<tr><td>教材費</td><td>年額数千円〜1万円程度</td></tr>
<tr><td>行事費・遠足代</td><td>その都度数百円〜数千円</td></tr>
<tr><td>布団リース代</td><td>月額数百円〜（園による）</td></tr>
<tr><td>制服・体操服</td><td>園による（ない園も多い）</td></tr>
</table>

<h3>0〜2歳児の場合</h3>
<p>0〜2歳児は給食費が保育料に含まれているため、別途の給食費はかかりません。ただし保育料は世帯の所得に応じて決まります（非課税世帯は無料）。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>実費は園によってかなり差があります。見学時に具体的な金額を確認しておくと、家計の計画が立てやすくなります。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 40,
  },
  {
    slug: "hoikuryo-keisan",
    citySlug: "niigata",
    title: "新潟市の保育料の計算方法　所得別の目安額と軽減制度",
    description:
      "新潟市の保育料の計算方法と所得階層別の目安額、多子世帯の軽減制度を解説します。",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "お金・制度",
    categoryColor: "green",
    content: `<h2>保育料の決まり方</h2>
<p>新潟市の認可保育園の保育料は、<strong>世帯の市民税所得割額</strong>に基づいて決定されます。</p>

<h3>保育料の仕組み</h3>
<ul>
<li>3〜5歳児：<strong>無料</strong>（幼児教育・保育無償化）</li>
<li>0〜2歳児：世帯の所得に応じた保育料（非課税世帯は無料）</li>
</ul>

<h3>0〜2歳児の保育料の目安</h3>
<p>保育料は市民税所得割額によって階層が決まります。新潟市の保育料は国の基準額より低く設定されています。</p>

<h3>多子世帯の軽減</h3>
<ul>
<li>第2子：保育料が半額</li>
<li>第3子以降：保育料が無料</li>
<li>年収360万円未満世帯はきょうだいの年齢制限なし</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>保育料は前年度の所得で決まるため、育休中に所得が下がった翌年度は保育料が安くなることがあります。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>保育料の詳細は各区役所の健康福祉課にお問い合わせください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 50,
  },
  {
    slug: "zeikin-koujo",
    citySlug: "niigata",
    title: "保育料と税金控除の関係　新潟市で活用できる節税ポイント",
    description:
      "保育料に影響する税金の仕組みと、新潟市で活用できる税控除・節税のポイントを解説します。",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "お金・制度",
    categoryColor: "green",
    content: `<h2>保育料と税金の関係</h2>
<p>0〜2歳児の保育料は<strong>市民税所得割額</strong>で決まります。所得控除を適切に活用することで、保育料の軽減につながる場合があります。</p>

<h3>保育料に影響する主な控除</h3>
<ul>
<li><strong>医療費控除</strong>：年間の医療費が一定額を超えた場合</li>
<li><strong>iDeCo（個人型確定拠出年金）</strong>：掛金が全額所得控除</li>
<li><strong>ふるさと納税</strong>：住民税の税額控除のため、保育料の算定には影響しない点に注意</li>
<li><strong>生命保険料控除</strong>：上限あり</li>
</ul>

<h3>注意点</h3>
<ul>
<li>ふるさと納税は住民税の「税額控除」であり、「所得割額」自体を下げるわけではないため、保育料には基本的に影響しません</li>
<li>iDeCoは「所得控除」なので、所得割額を直接下げる効果があります</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>3〜5歳児は保育料無料のため、この節税効果は0〜2歳児の保育料にのみ影響します。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 40,
  },
  {
    slug: "shurou-shoumeisho",
    citySlug: "niigata",
    title: "新潟市の就労証明書 記入例【令和8年度版】書き方と注意点まとめ",
    description:
      "新潟市の保育園申込みに必要な就労証明書の記入例を徹底解説。月間就労時間・日数の正しい書き方、よくある記入ミスTop5と対策チェックリスト、様式ダウンロード先まで網羅。令和8年度申込対応。",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "手続き",
    categoryColor: "rose",
    content: `<h2>就労証明書とは</h2>
<p>保育園の申込にあたり、保護者の就労状況を証明する書類です。勤務先（または自分）が記入します。</p>

<h3>記入のポイント</h3>
<ul>
<li><strong>就労日数・時間</strong>：実態に即した数値を記入。これが基準指数に直結します</li>
<li><strong>雇用形態</strong>：正社員、パート、契約社員などを正確に</li>
<li><strong>勤務先の押印</strong>：代表者印または人事担当印が必要</li>
<li><strong>記入日</strong>：申込日に近い日付が望ましい</li>
</ul>

<h3>外勤と内勤・自営の違い</h3>
<table>
<tr><th>区分</th><th>記入者</th><th>添付書類</th></tr>
<tr><td>外勤（雇用）</td><td>勤務先</td><td>なし</td></tr>
<tr><td>内勤・自営</td><td>本人</td><td>確定申告書の写し等</td></tr>
</table>

<h2>よくある間違い</h2>
<ul>
<li>就労時間の記載が実態と異なる（残業込みの時間を記載してしまう等）</li>
<li>勤務先の住所・電話番号の記載漏れ</li>
<li>育休中の場合に復帰後の勤務条件を記載していない</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>就労証明書は勤務先に依頼してから届くまで2〜3週間かかることがあります。早めに依頼しましょう。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 45,
  },
  {
    slug: "shinsei-shorui-list",
    citySlug: "niigata",
    title: "新潟市の保育園申請書類チェックリスト　ダウンロード先と準備の流れ",
    description:
      "新潟市の保育園申込に必要な全書類のチェックリストと、各書類のダウンロード先・準備スケジュールをまとめました。",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "手続き",
    categoryColor: "rose",
    content: `<h2>申請書類チェックリスト</h2>

<h3>必須書類</h3>
<ul>
<li>子どものための教育・保育給付認定申請書兼利用申込書</li>
<li>保育が必要な理由を証明する書類（就労証明書等）</li>
<li>マイナンバー確認書類</li>
<li>本人確認書類</li>
</ul>

<h3>該当者のみ必要な書類</h3>
<ul>
<li>ひとり親の場合：戸籍謄本等</li>
<li>障害のある場合：障害者手帳のコピー</li>
<li>介護をしている場合：介護状況申告書</li>
<li>転入予定の場合：転入に関する誓約書</li>
<li>単身赴任の場合：単身赴任の証明書類</li>
</ul>

<h3>準備スケジュール</h3>
<table>
<tr><th>時期</th><th>やること</th></tr>
<tr><td>8〜9月</td><td>勤務先に就労証明書を依頼</td></tr>
<tr><td>10月</td><td>てびきを入手、書類をダウンロード</td></tr>
<tr><td>10月中旬</td><td>書類の記入・確認</td></tr>
<tr><td>10〜11月</td><td>区役所に提出</td></tr>
</table>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>書類は<a href="https://www.city.niigata.lg.jp/kosodate/ninshin/life_stage/azuketai/ninnkahoikushisetsu/hoiku_yoshiki.html" target="_blank" rel="noopener">新潟市公式サイト「保育施設関係様式集」</a>からダウンロードできます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 45,
  },
  {
    slug: "niji-shinsei-flow",
    citySlug: "niigata",
    title: "新潟市の2次募集とは？申込の流れと内定のコツ",
    description:
      "新潟市の保育園2次募集の仕組み、申込の流れ、内定のための戦略を解説します。",
    image:
      "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "手続き",
    categoryColor: "rose",
    content: `<h2>2次募集とは</h2>
<p>1次募集で定員に達しなかった園や、辞退により空きが出た園について行われる追加募集です。</p>

<h3>2次募集のスケジュール</h3>
<table>
<tr><th>項目</th><th>日程</th></tr>
<tr><td>空き状況の公表</td><td>令和8年2月上旬</td></tr>
<tr><td>申込受付</td><td>令和8年2月上旬〜2月中旬</td></tr>
<tr><td>結果通知</td><td>令和8年3月上旬</td></tr>
</table>

<h3>2次募集の特徴</h3>
<ul>
<li>1次で不承諾だった方も改めて申込可能</li>
<li>空きのある園のみが対象</li>
<li>人気園はほとんど空きがないことが多い</li>
<li>郊外の園や小規模保育は空きがある場合も</li>
</ul>

<h2>内定のコツ</h2>
<ul>
<li>空き状況を確認して、空きのある園を希望に追加する</li>
<li>エリアを広げて検討する</li>
<li>小規模保育事業も選択肢に入れる</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>1次で不承諾の場合、自動的に2次の対象にはなりません。改めて申込手続きが必要です。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 45,
  },
  {
    slug: "tenkyo-hokatsu",
    citySlug: "niigata",
    title: "新潟市への転入・引っ越しに伴う保活ガイド",
    description:
      "新潟市に転入する際の保育園申込の手続きと注意点。広域利用や転入前申込の方法を解説します。",
    image:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=400&fit=crop",
    category: "手続き",
    categoryColor: "rose",
    content: `<h2>転入時の保育園申込</h2>
<p>新潟市に転入（引っ越し）する場合でも、認可保育園に申し込むことができます。</p>

<h3>転入前の申込</h3>
<ul>
<li>新潟市に転入予定であることを証明する書類が必要</li>
<li>転入先の区の区役所健康福祉課に相談</li>
<li>入園月の前月末までに新潟市に住民登録が必要</li>
</ul>

<h3>広域利用（他市区町村からの申込）</h3>
<p>現住所が新潟市外でも、勤務先が新潟市内にある場合などは広域利用の申込が可能な場合があります。現住所の自治体を通じて申込みます。</p>

<h2>転入時の注意点</h2>
<ul>
<li>課税証明書が必要になる場合がある（転入前の自治体で取得）</li>
<li>転入前の自治体での保育園利用歴は引き継がれない</li>
<li>申込時期に注意（1次募集に間に合うよう早めに相談）</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>転入が決まったら、早めに転入先の区役所健康福祉課に相談しましょう。申込に必要な書類や手続きを案内してもらえます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 40,
  },
  {
    slug: "kyoiku-hoiku-chigai",
    citySlug: "niigata",
    title: "新潟市の保育園・幼稚園・認定こども園の違いを徹底比較",
    description:
      "新潟市にある保育園・幼稚園・認定こども園の違いを、対象年齢・利用条件・費用・教育内容の観点から比較します。",
    image:
      "https://images.unsplash.com/photo-1587654780210-e3ca2d074509?w=800&h=400&fit=crop",
    category: "施設選び",
    categoryColor: "amber",
    content: `<h2>3つの施設の比較</h2>
<table>
<tr><th>項目</th><th>保育園</th><th>幼稚園</th><th>認定こども園</th></tr>
<tr><td>対象年齢</td><td>0〜5歳</td><td>3〜5歳</td><td>0〜5歳</td></tr>
<tr><td>利用条件</td><td>保育の必要性あり</td><td>なし</td><td>保育部分は必要性あり</td></tr>
<tr><td>保育時間</td><td>11時間（標準）</td><td>4時間＋預かり保育</td><td>保育11時間/教育4時間</td></tr>
<tr><td>保育料（3〜5歳）</td><td>無料</td><td>無料（月25,700円まで）</td><td>無料</td></tr>
<tr><td>給食</td><td>あり</td><td>園による</td><td>あり</td></tr>
<tr><td>申込先</td><td>区役所</td><td>各園に直接</td><td>区役所（保育部分）</td></tr>
</table>

<h3>どれを選ぶべき？</h3>
<ul>
<li><strong>フルタイム共働き</strong>：保育園または認定こども園の保育部分</li>
<li><strong>パートタイム</strong>：幼稚園の預かり保育も選択肢に</li>
<li><strong>教育重視</strong>：認定こども園や教育カリキュラムのある保育園</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>新潟市では認定こども園が増えており、保育と教育の両方を受けられる選択肢が広がっています。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 50,
  },
  {
    slug: "hokatsu-calendar",
    citySlug: "niigata",
    title: "新潟市の保活カレンダー　月別やることリスト",
    description:
      "新潟市の保活を月別のカレンダー形式でまとめました。いつ何をすべきかが一目でわかります。",
    image:
      "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>保活カレンダー（4月入園の場合）</h2>

<h3>4月〜6月：情報収集期</h3>
<ul>
<li>新潟市の保育施設の種類を理解する</li>
<li>住んでいる区の保育園リストを確認</li>
<li>前年度の「入園のてびき」で制度を把握</li>
<li>自分の点数を概算してみる</li>
</ul>

<h3>7月〜9月：見学期</h3>
<ul>
<li>気になる園に電話して見学予約</li>
<li>最低3〜5園は見学する</li>
<li>駐車場や送迎のしやすさも確認</li>
<li>勤務先に就労証明書を依頼（9月中に）</li>
</ul>

<h3>10月：準備期</h3>
<ul>
<li>「入園のてびき」を区役所で入手</li>
<li>最新の指数表を確認して点数を計算</li>
<li>申込書類の記入</li>
</ul>

<h3>10月〜11月：申込期</h3>
<ul>
<li>書類を揃えて区役所健康福祉課に提出</li>
<li>不備がないか窓口で確認してもらう</li>
</ul>

<h3>1月〜2月：結果発表</h3>
<ul>
<li>1次の結果通知</li>
<li>不承諾の場合は2次募集を検討</li>
</ul>

<h3>3月：入園準備</h3>
<ul>
<li>入園説明会に参加</li>
<li>持ち物の準備</li>
<li>慣らし保育のスケジュール確認</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>就労証明書の依頼は早めが鉄則です。勤務先によっては発行に時間がかかります。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 55,
  },
  {
    slug: "souba-tensuu",
    citySlug: "niigata",
    title: "新潟市の保育園入園に必要な点数の相場　エリア別の目安",
    description:
      "新潟市の保育園に入るために必要な点数の相場をエリア別にまとめました。自分の点数で入れるかの目安に。",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>エリア別の必要点数の目安</h2>
<p>新潟市の保育園入園に必要な点数は、エリアと園の人気度によって大きく異なります。以下は一般的な目安です。</p>

<h3>区別の目安</h3>
<table>
<tr><th>区</th><th>0歳児</th><th>1歳児</th><th>3歳児</th></tr>
<tr><td>中央区（人気園）</td><td>20〜22点</td><td>20〜24点</td><td>18〜20点</td></tr>
<tr><td>西区（人気園）</td><td>20点前後</td><td>20〜22点</td><td>18〜20点</td></tr>
<tr><td>東区・江南区</td><td>18〜20点</td><td>18〜20点</td><td>16〜18点</td></tr>
<tr><td>秋葉区・南区</td><td>16〜18点</td><td>16〜18点</td><td>入りやすい</td></tr>
<tr><td>西蒲区・北区</td><td>入りやすい</td><td>入りやすい</td><td>入りやすい</td></tr>
</table>

<p>※あくまで目安です。年度や園によって変動します。</p>

<h2>点数が足りない場合の対策</h2>
<ul>
<li>希望エリアを広げる</li>
<li>小規模保育事業も検討する</li>
<li>調整指数の加点を全て申告しているか再確認</li>
<li>認可外保育施設を利用して加点（+2点）を得る</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>新潟市は車通勤が一般的なので、少し離れたエリアも通園圏内です。エリアを広げることで選択肢が大幅に増えます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 60,
  },
  {
    slug: "ku-betsu-bairitsu",
    citySlug: "niigata",
    title: "新潟市8区の保育園の倍率と空き状況　区ごとの傾向を分析",
    description:
      "新潟市の8区それぞれの保育園の倍率傾向と空き状況を分析。穴場の区と激戦の区を解説します。",
    image:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=400&fit=crop",
    category: "地域情報",
    categoryColor: "amber",
    content: `<h2>8区の保育園事情</h2>
<p>新潟市は北区・東区・中央区・江南区・秋葉区・南区・西区・西蒲区の8区で構成されています。区によって保育園の競争状況は大きく異なります。</p>

<h3>各区の特徴</h3>
<ul>
<li><strong>中央区</strong>：市の中心部で最も競争が激しい。万代・古町エリアのマンション世帯が多い</li>
<li><strong>西区</strong>：内野・寺尾エリアの新興住宅地で子育て世帯が増加。やや激戦</li>
<li><strong>東区</strong>：住宅地と商業地が混在。全体的に中程度の競争</li>
<li><strong>江南区</strong>：亀田駅周辺はやや人気。郊外は比較的余裕あり</li>
<li><strong>秋葉区</strong>：旧新津市。人口減少エリアで定員に余裕がある園が多い</li>
<li><strong>南区</strong>：農村部が多く、定員に余裕がある園が多い</li>
<li><strong>西蒲区</strong>：旧巻町等。郊外で入りやすい</li>
<li><strong>北区</strong>：旧豊栄市。定員に余裕がある園が多い</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>中央区の人気園にこだわらなければ、新潟市は比較的保育園に入りやすい自治体です。車通勤を活かして通園圏を広く検討しましょう。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 50,
  },
  {
    slug: "ikukyu-enchou-risk",
    citySlug: "niigata",
    title: "新潟市で育休延長するリスクと対策　不承諾通知の扱い",
    description:
      "新潟市で育休延長を検討する際のリスクと注意点。不承諾通知の取得方法と育休延長の手続きを解説します。",
    image:
      "https://images.unsplash.com/photo-1531983412531-1f49a365ffed?w=800&h=400&fit=crop",
    category: "育休・復職",
    categoryColor: "purple",
    content: `<h2>育休延長の仕組み</h2>
<p>育児休業は原則1歳まで（最長2歳まで）取得可能です。延長には「保育園に入れなかったこと」を証明する不承諾通知が必要です。</p>

<h3>育休延長の条件</h3>
<ul>
<li>保育園に申し込んだが入園できなかったこと</li>
<li>不承諾通知（保留通知）を勤務先に提出すること</li>
<li>1歳時点で延長→最長1歳6か月、1歳6か月時点で再延長→最長2歳</li>
</ul>

<h3>不承諾通知の取得方法</h3>
<p>新潟市では、保育園の申込をして不承諾（保留）となった場合に通知が届きます。この通知を勤務先に提出して育休延長の手続きを行います。</p>

<h2>注意すべきリスク</h2>
<ul>
<li><strong>意図的な不承諾狙い</strong>：入園意思がないのに申し込むことは推奨されません</li>
<li><strong>2歳までに入園できないリスク</strong>：育休は最長2歳まで。それまでに入園先を確保する必要があります</li>
<li><strong>1歳・2歳クラスの枠の少なさ</strong>：年齢が上がるほど新規枠は少なくなる傾向</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>育休延長を考えている場合でも、入園申込は必要です。不承諾通知がなければ育休延長の手続きができません。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 50,
  },
  {
    slug: "fukushoku-junbi",
    citySlug: "niigata",
    title: "新潟市で保育園入園後の復職準備　慣らし保育から復帰までの流れ",
    description:
      "新潟市で保育園に入園が決まった後の、慣らし保育の期間や復職までの準備の流れを解説します。",
    image:
      "https://images.unsplash.com/photo-1531983412531-1f49a365ffed?w=800&h=400&fit=crop",
    category: "育休・復職",
    categoryColor: "purple",
    content: `<h2>入園から復職までの流れ</h2>

<h3>3月：入園準備</h3>
<ul>
<li>入園説明会に参加</li>
<li>持ち物の準備（名前つけ等）</li>
<li>勤務先に復職日を連絡</li>
</ul>

<h3>4月前半：慣らし保育</h3>
<p>多くの園で1〜2週間の慣らし保育があります。</p>
<table>
<tr><th>日程</th><th>保育時間の目安</th></tr>
<tr><td>1〜2日目</td><td>1〜2時間</td></tr>
<tr><td>3〜4日目</td><td>午前中（給食まで）</td></tr>
<tr><td>5日目〜1週間</td><td>午後3時頃まで</td></tr>
<tr><td>2週目〜</td><td>通常保育</td></tr>
</table>

<h3>4月中旬〜：復職</h3>
<ul>
<li>慣らし保育が終わったら復職</li>
<li>新潟市では入園月中の復帰が育休復帰加点の条件</li>
</ul>

<h2>復職前にやっておくこと</h2>
<ul>
<li>病児保育の登録（事前登録が必要な施設が多い）</li>
<li>ファミリー・サポートの登録</li>
<li>緊急時のお迎え体制の確認</li>
<li>通勤・送迎ルートの確認（冬場も想定）</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>慣らし保育の期間は園や子どもの様子によって異なります。復職日は余裕を持って設定しましょう。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 45,
  },
  {
    slug: "sannin-me-hokatsu",
    citySlug: "niigata",
    title: "新潟市で3人目の保活　多子世帯の加点と保育料軽減",
    description:
      "新潟市で3人目の子どもの保育園入園を目指す際の加点制度と、保育料の軽減制度を解説します。",
    image:
      "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>3人目の加点</h2>
<p>新潟市では、きょうだいに関する加点が利用できます。</p>
<table>
<tr><th>条件</th><th>加点</th></tr>
<tr><td>きょうだいと同一園を希望</td><td>+4点</td></tr>
<tr><td>きょうだいが在園中（別園希望）</td><td>+2点</td></tr>
<tr><td>多胎児同時申込</td><td>+3点</td></tr>
</table>

<h3>上の子2人が在園中の場合</h3>
<p>上の子2人が同じ園に在園中であれば、きょうだい同一園希望で+4点の加点が得られます。同点時の優先順位でも多子世帯が優先されます。</p>

<h2>保育料の軽減</h2>
<ul>
<li><strong>第3子以降は保育料無料</strong>（0〜2歳児の場合）</li>
<li>3〜5歳児は全世帯で保育料無料（無償化）</li>
<li>給食費の免除対象になる場合もあり</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>3人目の保活は加点と保育料軽減の両方で有利になります。上の子と同じ園を希望すれば+4点で、ほとんどの園で安全圏です。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 40,
  },
  {
    slug: "tanshin-funin",
    citySlug: "niigata",
    title: "新潟市で単身赴任の場合の保活　加点と必要書類",
    description:
      "新潟市で配偶者が単身赴任中の場合の保育園申込の加点（県外+4、県内+2）と必要書類を解説します。",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>単身赴任の加点</h2>
<p>新潟市では配偶者が単身赴任中の場合、調整指数の加点があります。</p>
<table>
<tr><th>赴任先</th><th>加点</th></tr>
<tr><td>県外</td><td>+4点</td></tr>
<tr><td>県内</td><td>+2点</td></tr>
</table>

<h3>必要書類</h3>
<ul>
<li>配偶者の住民票（赴任先の住所が記載されたもの）</li>
<li>勤務先の辞令や赴任命令書のコピー</li>
<li>就労証明書（赴任先での勤務条件が記載）</li>
</ul>

<h2>単身赴任世帯のポイント</h2>
<ul>
<li>県外+4点は大きな加点。フルタイム共働き20点＋県外単身赴任4点＝24点</li>
<li>同点時の優先順位でもひとり親・単身赴任世帯が優先される場合あり</li>
<li>赴任中でも就労証明書の提出は必要</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>単身赴任の加点は忘れがちです。該当する方は必ず申告し、証明書類を揃えて提出しましょう。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 40,
  },
  {
    slug: "sofu-sobo-doukyo",
    citySlug: "niigata",
    title: "新潟市で祖父母と同居の場合の保育園申込　減点と対策",
    description:
      "新潟市で祖父母と同居している場合の保育園申込への影響（-2点の減点）と対策を解説します。",
    image:
      "https://images.unsplash.com/photo-1476234251651-f353a9b85714?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>同居保育可能者の減点</h2>
<p>新潟市では、<strong>65歳未満の同居の祖父母がいて保育が可能な場合</strong>、調整指数が<strong>-2点</strong>となります。</p>

<h3>減点の条件</h3>
<ul>
<li>同居の親族（65歳未満）が保育を行うことが可能と判断された場合</li>
<li>就労・疾病・介護等で保育ができない場合は減点されない</li>
</ul>

<h2>減点を回避する方法</h2>
<ul>
<li><strong>祖父母が就労中</strong>：就労証明書を提出して「保育できない」ことを証明</li>
<li><strong>祖父母が疾病・障害</strong>：診断書や障害者手帳を提出</li>
<li><strong>祖父母が介護中</strong>：介護状況申告書を提出</li>
<li><strong>65歳以上</strong>：65歳以上であれば減点対象外</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>同居の祖父母がいても、就労中など保育ができない事情があれば減点されません。証明書類を必ず提出しましょう。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 45,
  },
  {
    slug: "fushoninchi-taiou",
    citySlug: "niigata",
    title: "新潟市で保育園に落ちたら？不承諾後にやるべき5つのこと",
    description:
      "新潟市で保育園の不承諾通知が届いた場合に取るべき行動を、優先度順に5つ解説します。",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
    category: "手続き",
    categoryColor: "rose",
    content: `<h2>不承諾後にやるべき5つのこと</h2>

<h3>1. 2次募集に申し込む</h3>
<p>1次で不承諾の場合、2月の2次募集に申し込みましょう。空きのある園が公表されるので、希望園を見直して申込みます。</p>

<h3>2. 認可外保育施設を探す</h3>
<p>認可園に入れない場合の受け皿として、認可外保育施設や企業主導型保育事業を検討しましょう。認可外利用で翌年度の加点（+2点）にもなります。</p>

<h3>3. 育休延長の手続き</h3>
<p>不承諾通知を勤務先に提出して育休延長の手続きを行います。最長2歳まで延長可能です。</p>

<h3>4. 途中入園の申込をしておく</h3>
<p>年度途中で空きが出た場合に入園できるよう、毎月の利用調整の対象になるよう申込を継続しましょう。</p>

<h3>5. 翌年度に向けた準備</h3>
<p>翌年度の4月入園に向けて、認可外利用の加点を活用した申込戦略を立てましょう。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>不承諾は落ち込みますが、新潟市は2次募集や途中入園でも入れる可能性があります。諦めずに行動しましょう。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 50,
  },
  {
    slug: "taiki-jidou-taisaku",
    citySlug: "niigata",
    title: "新潟市の待機児童対策　市の取り組みと保護者ができること",
    description:
      "新潟市が行っている待機児童対策の取り組みと、保護者として入園確率を上げるためにできることを解説します。",
    image:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=400&fit=crop",
    category: "地域情報",
    categoryColor: "amber",
    content: `<h2>新潟市の取り組み</h2>
<p>新潟市はこども未来部を中心に、保育施設の整備と受入児童数の拡大に取り組んでいます。</p>

<h3>主な取り組み</h3>
<ul>
<li>認可保育園の定員拡大</li>
<li>小規模保育事業の整備</li>
<li>認定こども園への移行促進</li>
<li>保育士の確保・処遇改善</li>
<li>空き状況の情報提供</li>
</ul>

<h2>保護者ができること</h2>
<ul>
<li><strong>早めの情報収集と行動</strong>：スケジュールに余裕を持って準備</li>
<li><strong>希望園を多めに書く</strong>：通える範囲の園を幅広く記入</li>
<li><strong>加点を全て申告</strong>：使える加点は漏れなく</li>
<li><strong>エリアを広げて検討</strong>：新潟市は車通勤が一般的なので、隣の区も視野に</li>
<li><strong>小規模保育や認定こども園も検討</strong>：認可保育園以外の選択肢も</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>新潟市は全国的に見ると保育園に入りやすい自治体です。正しい情報を集めて計画的に動けば、入園の可能性は高いです。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 40,
  },
  {
    slug: "tennen-moshikomi",
    citySlug: "niigata",
    title: "新潟市の保育園の途中入園（年度途中申込）の方法と空き状況の確認方法",
    description:
      "新潟市で年度途中に保育園に入園する方法、空き状況の確認方法、申込の流れを解説します。",
    image:
      "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "手続き",
    categoryColor: "rose",
    content: `<h2>途中入園とは</h2>
<p>4月以外の月に保育園に入園することを途中入園（年度途中入園）といいます。退園や転園で空きが出た場合に利用調整が行われます。</p>

<h3>申込の流れ</h3>
<table>
<tr><th>ステップ</th><th>内容</th></tr>
<tr><td>1. 空き状況の確認</td><td>区役所健康福祉課に問い合わせ</td></tr>
<tr><td>2. 申込書類の提出</td><td>毎月の締切日までに区役所に提出</td></tr>
<tr><td>3. 利用調整</td><td>空きのある園について選考</td></tr>
<tr><td>4. 結果通知</td><td>入園月の前月末頃</td></tr>
</table>

<h3>途中入園のポイント</h3>
<ul>
<li>空きがある園に限り利用調整が行われる</li>
<li>4月に比べて空きは少ないが、転勤シーズン（9〜10月）は空きが出やすい</li>
<li>一度申込を出すと、空きが出た際に自動的に調整対象になる</li>
<li>毎月の締切日は区役所に確認</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>途中入園は空き次第なので、早めに申込を出しておくことが大切です。複数の園を希望に入れておきましょう。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 40,
  },
];

registerArticles(articles);
