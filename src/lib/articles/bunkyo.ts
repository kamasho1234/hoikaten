import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  {
    slug: "hokatsu-schedule",
    citySlug: "bunkyo",
    title: "文京区の保活スケジュール　いつから何を始める？",
    description:
      "文京区の認可保育園の申込時期・選考スケジュールをわかりやすく解説。令和8年度4月入園に向けた動き方をまとめました。",
    image: "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>文京区の4月入園スケジュール</h2>
<p>文京区の認可保育園は、毎年秋に翌年度4月入園の申込を受付けます。「ぶんきょう保育パンフレット」を入手して情報を整理するところからスタートしましょう。</p>

<h3>保活の全体スケジュール</h3>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>4月〜6月：情報収集</strong>
<p>区のホームページや前年度のパンフレットで保育園の種類・場所を把握します。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>6月〜9月：保育園見学</strong>
<p>気になる園に電話予約して見学へ。夏場は予約が取りやすい時期です。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>9月〜10月：パンフレット入手・書類準備</strong>
<p>最新の「ぶんきょう保育パンフレット」を入手し、就労証明書などの書類を準備します。</p>
</div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content">
<strong>10月〜11月：申込書類の提出</strong>
<p>窓口または郵送で提出します。締切日を必ず確認しましょう。</p>
</div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>文京区は基本指数が父母各最大10点（合計20点満点）のシンプルな制度です。調整指数の加点が合否を左右します。</p>
</div>

<h2>途中入園について</h2>
<p>5月以降の途中入園は、入園希望月の前月に申込を行います。空きがある園のみ選考が行われるため、4月入園に比べて選択肢は限られます。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳しくは<a href="https://www.city.bunkyo.lg.jp/b023/p001786.html" target="_blank" rel="noopener">文京区公式サイト「保育園入園のご案内」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 55,
  },
  {
    slug: "scoring-system-guide",
    citySlug: "bunkyo",
    title: "文京区の入園点数のしくみ　基本指数と調整指数を解説",
    description:
      "文京区の保育園入園選考で使われる「基本指数」と「調整指数」の仕組みをわかりやすく解説します。",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>文京区の選考指数とは</h2>
<p>文京区の認可保育園の入園選考は「基本指数＋調整指数」の合計点数で行われます。点数が高い世帯から順に内定が決まります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>選考指数 ＝ 基本指数（父＋母）＋ 調整指数</p>
</div>

<h2>基本指数（父母各最大10点、合計20点）</h2>
<p>父母それぞれの「保育が必要な理由」を点数化します。最も多い「就労」の場合、週5日以上かつ1日8時間以上の勤務で満点の<span class="highlight">10点</span>になります。</p>

<table>
<tr><th>就労の状況</th><th>指数</th></tr>
<tr><td>週5日以上・1日8時間以上（月20日以上）</td><td>10</td></tr>
<tr><td>週5日以上・1日6時間以上8時間未満</td><td>9</td></tr>
<tr><td>週5日以上・1日4時間以上6時間未満</td><td>8</td></tr>
<tr><td>週3日以上・1日6時間以上8時間未満</td><td>7</td></tr>
<tr><td>週3日以上・1日4時間以上6時間未満</td><td>6</td></tr>
<tr><td>月48時間以上（上記以外）</td><td>5</td></tr>
</table>

<h2>調整指数の代表例</h2>
<ul>
<li>文京区在住：<span class="highlight">+4点</span></li>
<li>生活保護世帯：<span class="highlight">+4点</span></li>
<li>ひとり親世帯：<span class="highlight">+3点</span></li>
<li>きょうだい在園：<span class="highlight">+2点</span></li>
<li>育休復帰予定：<span class="highlight">+1点</span></li>
<li>新規入所：<span class="highlight">+1点</span></li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>指数表の全項目は<a href="https://www.city.bunkyo.lg.jp/b023/p001786.html" target="_blank" rel="noopener">文京区公式サイト「ぶんきょう保育パンフレット」</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 65,
  },
  {
    slug: "score-up-tips",
    citySlug: "bunkyo",
    title: "文京区で入園点数を上げるコツ　調整指数の加点を活用しよう",
    description:
      "文京区の保育園入園選考で加点を取りこぼさないためのポイントを解説します。",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>基本指数20点は大前提</h2>
<p>文京区の基本指数は父母各10点の合計20点満点です。フルタイム共働き世帯は基本指数20点で並びます。差がつくのは<span class="highlight">調整指数</span>の部分です。</p>

<h2>加点チェックリスト</h2>
<table>
<tr><th>項目</th><th>点数</th><th>チェック</th></tr>
<tr><td>文京区在住</td><td>+4点</td><td>転入予定でも対象になる場合あり</td></tr>
<tr><td>ひとり親世帯</td><td>+3点</td><td>母子・父子家庭の場合</td></tr>
<tr><td>きょうだい在園</td><td>+2点</td><td>区内認可保育施設にきょうだいが在園</td></tr>
<tr><td>育休復帰予定</td><td>+1点</td><td>入園月中に復職する場合</td></tr>
<tr><td>新規入所</td><td>+1点</td><td>転園ではなく新規申込の場合</td></tr>
<tr><td>別居（単身赴任等）</td><td>+1点</td><td>保護者が別居状態にある場合</td></tr>
<tr><td>6ヶ月以上待機</td><td>+1点</td><td>過去に不承諾となり6ヶ月以上経過</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>文京区在住の加点（+4点）は非常に大きいです。区外から申込む場合はこの4点分のハンデがあることを意識しましょう。</p>
</div>

<h2>就労時間の見直し</h2>
<p>基本指数で9点（週5日・6〜8時間未満）の方は、勤務時間を8時間以上に調整できれば10点に上がります。1点の差が大きいので、勤務先と相談する価値があります。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>就労証明書の内容は実態と一致している必要があります。実態と異なる内容を記載すると取消しの対象になります。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 100,
  },
  {
    slug: "tiebreaker-rules",
    citySlug: "bunkyo",
    title: "文京区で同点になったらどうなる？優先順位のルール",
    description:
      "文京区の保育園入園選考で合計点が同点になった場合の優先順位の決まり方を解説します。",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>同点の場合はどうやって決まる？</h2>
<p>文京区の入園選考では、合計指数が同じ場合に<span class="highlight">優先順位</span>で判定されます。フルタイム共働き世帯は多くが同点になるため、この優先順位が合否を左右します。</p>

<h2>主な優先項目</h2>
<p>文京区では同点時に以下のような要素が考慮されます。</p>
<ul>
<li>世帯の所得が低い方が優先</li>
<li>保育の必要性がより高い世帯が優先</li>
<li>きょうだいが在園している園への申込は優先</li>
<li>待機期間が長い方が優先</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>同点の場合は「世帯の状況」で総合的に判断されます。調整指数で1点でも多く確保しておくことが最も確実な対策です。</p>
</div>

<h2>同点回避のためにできること</h2>
<p>基本指数20点＋調整指数で差をつけることが重要です。特に文京区在住（+4点）やきょうだい在園（+2点）の加点が大きな違いを生みます。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>優先順位の詳細な判定基準は非公開の部分もあります。確実なのは「1点でも多く加点を積む」ことです。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 85,
  },
  {
    slug: "part-time-work-score",
    citySlug: "bunkyo",
    title: "文京区で時短勤務だと点数はどうなる？",
    description:
      "文京区の保育園入園選考で時短勤務の場合の基本指数への影響を解説します。",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>時短勤務と基本指数の関係</h2>
<p>文京区の基本指数は「勤務日数」と「1日の勤務時間」の組み合わせで決まります。時短勤務で1日の勤務時間が短くなると、基本指数が下がる可能性があります。</p>

<table>
<tr><th>勤務パターン</th><th>基本指数</th></tr>
<tr><td>週5日・1日8時間以上</td><td>10点</td></tr>
<tr><td>週5日・1日6時間以上8時間未満</td><td>9点</td></tr>
<tr><td>週5日・1日4時間以上6時間未満</td><td>8点</td></tr>
<tr><td>週3日・1日6時間以上8時間未満</td><td>7点</td></tr>
</table>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>育休復帰後に6時間の時短勤務を予定している場合、基本指数は10点ではなく<span class="highlight">9点</span>になります。父母合計で1点下がることで入園が難しくなるケースもあります。</p>
</div>

<h2>申込時の勤務時間が基準</h2>
<p>基本指数は就労証明書に記載された勤務時間で判定されます。育休復帰後の勤務時間が就労証明書に記載されるため、復帰後に時短を予定している場合はその時間が反映されます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>フルタイムで復帰し、入園後に時短に切り替える方法も選択肢のひとつです。ただし勤務先との調整が必要です。就労証明書の内容は実態と一致させてください。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 90,
  },
  {
    slug: "rejection-options",
    citySlug: "bunkyo",
    title: "文京区で保育園に落ちたときの選択肢",
    description:
      "文京区の認可保育園に不承諾となった場合の対応策と代替手段をまとめました。",
    image: "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>不承諾通知が届いたら</h2>
<p>一次選考で不承諾になっても、まだ諦める必要はありません。以下の選択肢を検討しましょう。</p>

<h3>1. 二次選考に申し込む</h3>
<p>一次で不承諾の場合、二次選考に申し込めます。一次で辞退者が出た枠や新設園の枠が対象です。</p>

<h3>2. 認可外保育施設を探す</h3>
<p>認証保育所や企業主導型保育施設など、認可外の選択肢も視野に入れましょう。翌年度の申込で加点を得られる可能性もあります。</p>

<h3>3. 途中入園を狙う</h3>
<p>毎月の途中入園枠に申し込む方法です。転居などで空きが出ることがあります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>文京区では6ヶ月以上待機すると調整指数で<span class="highlight">+1点</span>が加算されます。認可外に預けながら翌年度に再挑戦するのが一般的な戦略です。</p>
</div>

<h3>4. 育休を延長する</h3>
<p>不承諾通知があれば育休を最長2歳まで延長できます。育児休業給付金も継続して受給できます。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>認可外保育施設の一覧は<a href="https://www.city.bunkyo.lg.jp/b023/p001786.html" target="_blank" rel="noopener">文京区公式サイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 80,
  },
  {
    slug: "unlicensed-nursery-bonus",
    citySlug: "bunkyo",
    title: "文京区で認可外保育施設の利用で加点を得る方法",
    description:
      "文京区の入園選考で認可外保育施設の利用がどのように加点されるかを解説します。",
    image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>認可外利用による加点はある？</h2>
<p>文京区の調整指数には、認可外保育施設の利用に対する直接的な加点項目は他区ほど明確ではありません。ただし、保育の必要性を示す要素として選考に影響する場合があります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>文京区の調整指数で確実に活用できるのは「6ヶ月以上の待機」による+1点です。認可外に預けながら待機実績を積むのが現実的な戦略です。</p>
</div>

<h2>認可外保育施設の種類</h2>
<ul>
<li>認証保育所（東京都の制度）</li>
<li>企業主導型保育施設</li>
<li>ベビーホテル</li>
<li>その他の認可外保育施設</li>
</ul>

<h2>認可外を利用するメリット</h2>
<p>加点の有無にかかわらず、認可外保育施設を利用することで以下のメリットがあります。</p>
<ul>
<li>育休を延長せず仕事に復帰できる</li>
<li>お子さんが集団生活に慣れる</li>
<li>翌年度の認可申込で「待機実績」を積める</li>
</ul>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>認可外保育施設は園によって質にばらつきがあります。見学して安全面を確認してから利用を決めましょう。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 75,
  },
  {
    slug: "next-year-changes",
    citySlug: "bunkyo",
    title: "文京区の令和8年度入園　変更点と注意事項",
    description:
      "文京区の令和8年度（2026年度）保育園入園選考における変更点や最新情報をまとめました。",
    image: "https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=800&h=400&fit=crop",
    category: "最新情報",
    categoryColor: "purple",
    content: `<h2>令和8年度の主な注意点</h2>
<p>文京区の令和8年度（2026年度）4月入園に向けて、最新のパンフレットを必ず確認しましょう。制度は毎年微調整が行われています。</p>

<h2>確認すべきポイント</h2>
<ul>
<li>基本指数の算定基準に変更がないか</li>
<li>調整指数の項目や点数に変更がないか</li>
<li>新設園や廃止園の情報</li>
<li>申込書類の様式変更</li>
<li>電子申請への対応状況</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>文京区の基本指数は父母各10点の合計20点満点です。制度がシンプルなぶん、調整指数の小さな変更が選考結果に直結します。</p>
</div>

<h2>最新パンフレットの入手方法</h2>
<p>「ぶんきょう保育パンフレット」は例年9月頃に発行されます。区役所の窓口や区のホームページからダウンロードできます。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新情報は<a href="https://www.city.bunkyo.lg.jp/b023/p001786.html" target="_blank" rel="noopener">文京区公式サイト</a>で随時更新されています。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 70,
  },
  {
    slug: "popular-areas",
    citySlug: "bunkyo",
    title: "文京区の人気エリアと比較的入りやすい地域",
    description:
      "文京区内で保育園の競争率が高いエリアと、比較的入りやすい地域の傾向を解説します。",
    image: "https://images.unsplash.com/photo-1524813686514-a57563d77965?w=800&h=400&fit=crop",
    category: "エリア情報",
    categoryColor: "teal",
    content: `<h2>文京区の保育園事情</h2>
<p>文京区は教育熱心なファミリー層に人気の高い地域です。区全体として保育需要が高く、エリアによって競争率に差があります。</p>

<h2>競争率が高い傾向のエリア</h2>
<ul>
<li>後楽・春日エリア：大規模マンションの開発で子育て世帯が増加</li>
<li>本郷・湯島エリア：交通利便性が高く人気</li>
<li>小石川エリア：住環境が良く子育て世帯に人気</li>
</ul>

<h2>比較的入りやすい傾向のエリア</h2>
<ul>
<li>大塚・千石エリア：保育園の数が充実</li>
<li>根津・千駄木エリア：地域密着型の園がある</li>
</ul>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>エリアごとの難易度は年度・年齢クラスによって大きく変わります。上記は一般的な傾向であり、年度によって逆転することもあります。</p>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>希望園を記入する際は、自宅の最寄りだけでなく通勤経路上の園も含めて幅広く検討しましょう。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 60,
  },
  {
    slug: "competition-reality",
    citySlug: "bunkyo",
    title: "文京区の保育園入園競争の実態",
    description:
      "文京区の保育園入園はどのくらい厳しいのか。入園選考の実態をデータにもとづいて解説します。",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>文京区の入園競争はどのくらい厳しい？</h2>
<p>文京区は東京23区の中でも保活の難易度が高いとされる地域のひとつです。教育環境を重視するファミリー層の流入が続いており、保育需要は高水準が続いています。</p>

<h2>ボリュームゾーンはどこ？</h2>
<p>基本指数は父母各10点の合計20点満点です。フルタイム共働き世帯は基本指数<span class="highlight">20点</span>で横並びになります。その上に調整指数が加算されるため、実質的には<span class="highlight">20点台前半</span>が激戦ゾーンです。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>文京区在住の加点（+4点）があるため、区民は最低でも24点からスタートします。区外からの申込は20点スタートとなり、4点のハンデがあります。</p>
</div>

<h2>年齢別の傾向</h2>
<ul>
<li>0歳児クラス：定員が少なく競争が激しい</li>
<li>1歳児クラス：最も申込が集中する年齢。最激戦</li>
<li>2歳児クラス：空きが少なく、1歳児並みに厳しい</li>
<li>3歳児クラス以上：持ち上がりが多く空きは限定的</li>
</ul>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>基本指数20点＋調整指数0点（つまり20点のみ）では、1歳児クラスの入園は難しい状況です。加点を1点でも積み上げる対策が必要です。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 95,
  },
  {
    slug: "hoikuryo-keisan",
    citySlug: "bunkyo",
    title: "文京区の保育料計算【令和8年度版】年収別シミュレーション・早見表",
    description:
      "文京区の認可保育園の保育料を年収・子ども数別に詳しく解説。区民税所得割額に基づく階層区分早見表、無償化（3歳〜）の対象確認、副食費・第2子以降の減免制度まで。令和8年度対応。",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "お金・制度",
    categoryColor: "amber",
    content: `<h2>文京区の保育料はどうやって決まる？</h2>
<p>文京区の認可保育園の保育料（利用者負担額）は、<strong>世帯の区民税所得割額</strong>によって決まります。東京都の基準に基づき階層区分が設定されており、所得が高いほど保育料も高くなる応能負担方式です。</p>

<h2>年齢ごとの基本ルール</h2>
<table>
<tr><th>年齢</th><th>保育料</th><th>注意点</th></tr>
<tr><td>0〜2歳児</td><td>有料（階層区分による）</td><td>世帯の所得割額で決定</td></tr>
<tr><td>3〜5歳児</td><td>無償（月額上限あり）</td><td>幼児教育・保育の無償化対象</td></tr>
</table>
<div class="point-box">
<p><strong>ポイント</strong></p>
<p>3歳以上は保育料が無償化されますが、<span class="highlight">副食費（給食の食材費）は別途負担</span>が必要です。低所得世帯や第3子以降は免除される場合があります。</p>
</div>

<h2>保育料の階層区分（0〜2歳の目安）</h2>
<table>
<tr><th>区民税所得割額（世帯合計）</th><th>保育料目安（月額・0歳）</th></tr>
<tr><td>非課税世帯</td><td>無料</td></tr>
<tr><td>〜約5万円</td><td>6,000〜9,000円</td></tr>
<tr><td>〜約10万円</td><td>12,000〜19,000円</td></tr>
<tr><td>〜約20万円</td><td>25,000〜38,000円</td></tr>
<tr><td>〜約30万円</td><td>42,000〜52,000円</td></tr>
<tr><td>30万円超</td><td>58,000〜77,000円</td></tr>
</table>
<p class="text-xs text-muted-foreground">※上記は目安です。詳細は文京区の公式保育料表をご確認ください。</p>

<h2>多子世帯・ひとり親世帯の軽減</h2>
<ul>
<li><strong>第2子</strong>：同一世帯で保育所等を利用中の場合、半額</li>
<li><strong>第3子以降</strong>：無料</li>
<li><strong>ひとり親世帯・生活保護世帯</strong>：最低階層として算定（大幅減額）</li>
</ul>

<h2>副食費について（3歳以上）</h2>
<p>3歳以上は保育料が無償化されますが、副食費（おかず代）は月額4,500円程度の実費負担があります。以下の場合は免除されます。</p>
<ul>
<li>年収360万円未満相当の世帯</li>
<li>第3子以降の子ども</li>
</ul>

<h2>保育料の確認方法</h2>
<p>毎年6月ごろ、前年度の区民税額が確定した後に保育料が決定・通知されます。入園前に目安を知りたい場合は文京区担当課にお問い合わせください。</p>
<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新の保育料表は文京区公式サイトからご確認ください。</p>
</div>`,
    publishedAt: "2026-05-13",
    popularity: 42,
  },
  {
    slug: "shokuhi-jippi",
    citySlug: "bunkyo",
    title: "文京区の保育園の給食費（副食費）はいくら？【令和8年度版】免除条件と金額",
    description:
      "文京区の保育園の給食費（副食費）は月いくら？所得・子ども数による副食費免除の条件と申請方法、保育料無償化の範囲と実費負担の全額をわかりやすく解説。令和8年度対応。",
    image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&h=400&fit=crop",
    category: "お金・制度",
    categoryColor: "amber",
    content: `<h2>文京区の副食費とは？</h2>
<p>2019年10月の幼児教育・保育無償化により、<strong>3歳以上の保育料は無料</strong>になりました。ただし、給食の<strong>副食費（おかず代）は実費負担</strong>が残ります。文京区では副食費として月額4,500円程度が別途かかります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>3歳以上でも副食費は無償化の対象外です。ただし、低所得世帯・第3子以降は免除制度があります。</p>
</div>

<h2>副食費の月額目安</h2>
<table>
<tr><th>年齢</th><th>副食費（月額目安）</th></tr>
<tr><td>3〜5歳児</td><td>約4,500円</td></tr>
<tr><td>0〜2歳児</td><td>保育料に含む（副食費別途なし）</td></tr>
</table>
<p class="text-xs text-muted-foreground">※金額は目安です。詳細は文京区公式サイトでご確認ください。</p>

<h2>副食費が免除される条件</h2>
<table>
<tr><th>免除条件</th><th>内容</th></tr>
<tr><td>年収360万円未満相当の世帯</td><td>区民税所得割額が一定以下の世帯は副食費が免除</td></tr>
<tr><td>第3子以降の子ども</td><td>小学3年生以下のきょうだいが2人以上いる場合、3人目以降は免除</td></tr>
<tr><td>生活保護世帯</td><td>副食費の負担なし</td></tr>
</table>

<h2>保育料無償化の対象範囲</h2>
<ul>
<li>無償化対象：<strong>保育料（基本利用料）</strong>のみ — 3歳〜5歳</li>
<li>実費負担が残るもの：副食費（おかず代）・主食費（ご飯代）・行事費・通園バス代など</li>
</ul>

<h2>副食費の支払い方法</h2>
<p>副食費は園から直接請求されます。毎月口座引き落としまたは現金納付が一般的です。免除に該当する場合は入園時や毎年6月ごろに申請手続きが必要です。文京区担当課に確認してください。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新の副食費・実費負担の詳細は文京区公式サイトからご確認ください。</p>
</div>`,
    publishedAt: "2026-05-13",
    popularity: 40,
  },
];

registerArticles(articles);
