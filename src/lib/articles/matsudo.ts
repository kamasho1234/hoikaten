import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  {
    slug: "hokatsu-schedule",
    citySlug: "matsudo",
    title: "松戸市の保活スケジュール　申込から内定までの流れ",
    description:
      "松戸市の認可保育園の申込時期・選考の流れをまとめました。令和8年度4月入園の動き方を解説します。",
    image: "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>松戸市の4月入園スケジュール</h2>
<p>松戸市の認可保育園は毎年秋に翌年度4月入園の申込を受付けます。松戸市子ども部保育課が窓口です。</p>

<h3>保活の全体スケジュール</h3>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>4月〜6月：情報収集</strong>
<p>市のホームページで保育園の一覧と空き状況を確認します。松戸市には認可保育園が約70か所あります。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>6月〜9月：保育園見学</strong>
<p>気になる園に連絡して見学を予約しましょう。松戸市は常磐線・新京成線沿線に園が集中しています。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>9月〜10月：書類準備</strong>
<p>就労証明書などの必要書類を準備します。松戸市の様式は市のホームページからダウンロードできます。</p>
</div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content">
<strong>10月〜11月：申込書類の提出</strong>
<p>松戸市子ども部保育課の窓口で申込みます。郵送での受付も可能です。</p>
</div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>松戸市は基準指数が父母各最大100点（合計200点満点）で、調整指数を加算して選考されます。フルタイム共働きの200点がボリュームゾーンです。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳しくは<a href="https://www.city.matsudo.chiba.jp/kosodate/matsudodekosodate/kosodatenavi/hoikuenyouchien/index.html" target="_blank" rel="noopener">松戸市公式サイト</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 55,
  },
  {
    slug: "scoring-system-guide",
    citySlug: "matsudo",
    title: "松戸市の入園点数のしくみ　基準指数と調整指数を解説",
    description:
      "松戸市の保育園入園選考で使われる基準指数と調整指数のしくみを解説します。",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>松戸市の選考点数とは</h2>
<p>松戸市の認可保育園は「基準指数（父＋母）＋ 調整指数」の合計で選考されます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>選考点数 ＝ 基準指数（父＋母）＋ 調整指数</p>
</div>

<h2>基準指数（父母各最大100点、合計200点）</h2>
<p>就労の場合、月20日以上かつ週35時間以上で満点の<span class="highlight">100点</span>です。</p>

<table>
<tr><th>就労状況</th><th>基準指数</th></tr>
<tr><td>月20日以上 週35時間以上 週5日以上</td><td>100</td></tr>
<tr><td>週30時間以上 週5日以上</td><td>90</td></tr>
<tr><td>月16日以上 週24時間以上 週4日以上</td><td>70</td></tr>
<tr><td>週16時間以上 週4日以上</td><td>65</td></tr>
<tr><td>月64時間以上（その他）</td><td>60</td></tr>
</table>

<h2>調整指数の代表例</h2>
<ul>
<li>育休から復帰予定：<span class="highlight">+20点</span></li>
<li>きょうだいが同一園に在園中：<span class="highlight">+20点</span></li>
<li>保育士資格で市内保育施設勤務：<span class="highlight">+45点</span></li>
<li>ひとり親世帯（扶養児童2人以上）：<span class="highlight">+10点</span></li>
<li>きょうだいと同時申込：<span class="highlight">+13点</span></li>
<li>ひとり親世帯（扶養児童1人）：<span class="highlight">+5点</span></li>
</ul>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>市外からの申込は<span class="highlight">-10点</span>、65歳未満の同居親族がいる場合は<span class="highlight">-3点</span>、認可保育園からの転園希望は<span class="highlight">-5点</span>の減点になります。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>全項目は<a href="https://www.city.matsudo.chiba.jp/kosodate/matsudodekosodate/kosodatenavi/hoikuenyouchien/index.html" target="_blank" rel="noopener">松戸市公式サイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 65,
  },
  {
    slug: "score-up-tips",
    citySlug: "matsudo",
    title: "松戸市で入園点数を上げるコツ　加点チェックリスト",
    description:
      "松戸市の保育園入園選考で調整指数の加点を最大限に活用する方法を解説します。",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>基準指数40点は出発点</h2>
<p>松戸市ではフルタイム共働き世帯は基準指数<span class="highlight">40点</span>で横並びです。差がつくのは調整指数の加点です。</p>

<h2>加点チェックリスト</h2>
<table>
<tr><th>項目</th><th>点数</th><th>条件</th></tr>
<tr><td>ひとり親世帯</td><td>+5点</td><td>母子・父子家庭の場合</td></tr>
<tr><td>きょうだい在園</td><td>+3点</td><td>認可保育園にきょうだいが在園中</td></tr>
<tr><td>認可外利用</td><td>+3点</td><td>認可外保育施設に月ぎめで利用中</td></tr>
<tr><td>きょうだい同時申込</td><td>+2点</td><td>きょうだいと同時に申し込む場合</td></tr>
<tr><td>育休復帰予定</td><td>+2点</td><td>入園月に職場復帰する場合</td></tr>
<tr><td>生活保護</td><td>+3点</td><td>生活保護を受けている場合</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>松戸市では43点以上あれば多くの園で入園できる可能性が高いです。40点＋認可外利用（+3）＝<span class="highlight">43点</span>が一つの目安です。</p>
</div>

<h2>減点に注意</h2>
<ul>
<li>市外からの申込：<span class="highlight">-10点</span></li>
<li>認可保育園からの転園希望：<span class="highlight">-5点</span></li>
<li>65歳未満の同居親族がいる場合：<span class="highlight">-3点</span></li>
</ul>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>就労証明書の内容は正確に記載してください。実態と異なる記載は入園取消しの対象です。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 100,
  },
  {
    slug: "tiebreaker-rules",
    citySlug: "matsudo",
    title: "松戸市で同点になったらどうなる？優先順位を解説",
    description:
      "松戸市の保育園入園選考で同点だった場合の優先順位の判定方法を解説します。",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>同点時の判定方法</h2>
<p>松戸市の入園選考では、基準指数＋調整指数の合計が同点になった場合、優先順位で判定されます。</p>

<h2>優先順位の主な判定基準</h2>
<ul>
<li>ひとり親世帯は優先</li>
<li>基準指数が高い世帯が優先</li>
<li>きょうだいが在園中の園への申込は優先</li>
<li>保育の必要度が高い世帯が優先</li>
<li>所得が低い世帯が優先</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>松戸市の200点制では調整指数の幅が比較的大きいため、同点になるケースは少ない傾向にあります。ただし人気園では同点の判定になる場合もあります。</p>
</div>

<h2>同点を避けるために</h2>
<p>育休復帰（+20点）やきょうだい在園（+20点）などで加点を積むことが重要です。基本点に加点を1つでも多く積むことで同点回避につながります。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>同点時の優先順位の詳細は毎年の案内で確認してください。年度によって判定基準が変更されることがあります。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 85,
  },
  {
    slug: "part-time-work-score",
    citySlug: "matsudo",
    title: "松戸市で時短勤務だと点数はどう変わる？",
    description:
      "松戸市の保育園入園選考で時短勤務の場合の基準指数への影響を解説します。",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>松戸市は月の合計就労時間で判定</h2>
<p>松戸市の基準指数は月の合計就労時間で決まります。時短勤務の影響を確認しましょう。</p>

<table>
<tr><th>就労状況</th><th>基準指数（1人）</th></tr>
<tr><td>月20日以上 週35時間以上 週5日以上</td><td>100点</td></tr>
<tr><td>週30時間以上 週5日以上</td><td>90点</td></tr>
<tr><td>月16日以上 週24時間以上 週4日以上</td><td>70点</td></tr>
<tr><td>週16時間以上 週4日以上</td><td>65点</td></tr>
<tr><td>月64時間以上（その他）</td><td>60点</td></tr>
</table>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>月20日勤務で1日6時間の時短勤務の場合、月120時間で基準指数は<span class="highlight">70点</span>です。フルタイムの100点と比べて30点下がります。</p>
</div>

<h2>月の時間数が重要</h2>
<p>満点の100点を得るには月20日以上かつ週35時間以上が必要です。親1人あたり100点が基準指数の最大値です。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>時短勤務でも週30時間以上なら90点です。松戸市の200点制では、片方の親が時短の場合は合計170〜190点になり、フルタイム世帯の200点より10〜30点低くなります。育休復帰（+20点）などの加点でカバーを検討しましょう。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 90,
  },
  {
    slug: "rejection-options",
    citySlug: "matsudo",
    title: "松戸市で保育園に落ちたときの選択肢",
    description:
      "松戸市の認可保育園に不承諾となった場合の対応策をまとめました。",
    image: "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>不承諾になったら</h2>
<p>松戸市で認可保育園に不承諾になった場合でも、複数の選択肢があります。</p>

<h3>1. 二次選考への申込</h3>
<p>一次選考後の辞退者枠で二次選考が行われます。一次で不承諾だった方は自動的に二次選考の対象になります。</p>

<h3>2. 小規模保育の利用</h3>
<p>小規模保育事業を利用し、卒園時に認可保育園へ転所する方法があります。松戸市では小規模保育の卒園で+20点や+35点（連携園）の加点が得られます。</p>

<h3>3. 育休延長と計画的な再申込</h3>
<p>不承諾通知があれば育休を延長し、翌年度に育休復帰予定で再申し込むことで+20点の加点が見込めます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>育休復帰（+20点）やきょうだい在園（+20点）などの調整指数を組み合わせると、基本点に大きな加点が期待できます。これらの条件を計画的に整えることが重要です。</p>
</div>

<h3>4. 途中入園</h3>
<p>空きが出た場合に途中入園が可能です。松戸市では毎月空き状況を公表しています。定期的に確認することで入園のチャンスが増えます。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>空き状況は<a href="https://www.city.matsudo.chiba.jp/kosodate/matsudodekosodate/kosodatenavi/hoikuenyouchien/index.html" target="_blank" rel="noopener">松戸市公式サイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 80,
  },
  {
    slug: "unlicensed-nursery-bonus",
    citySlug: "matsudo",
    title: "松戸市で認可外保育施設の利用で加点を得る方法",
    description:
      "松戸市の保育園入園選考では、認可外保育施設の利用は加点対象になりません。代わりにどのような加点制度があるかを解説します。",
    image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>松戸市では認可外利用の加点はない</h2>
<p>松戸市の入園選考では、認可外保育施設の利用自体は調整指数の加点対象になりません。ただし、小規模保育事業の卒園は加点対象になります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>松戸市で加点が得られるのは、小規模保育事業から卒園する場合です。2歳児クラス卒園で+20点、連携園への転園で+35点の加点が見込めます。</p>
</div>

<h2>小規模保育を活用する戦略</h2>
<ul>
<li>0〜2歳で小規模保育を利用</li>
<li>2歳児クラス卒園のタイミングで認可保育園に申し込み</li>
<li>調整指数+20点（または+35点）で有利に</li>
</ul>

<h2>育休復帰で加点を獲得</h2>
<p>認可外利用では加点になりませんが、小規模保育卒園や育休復帰（+20点）、きょうだい在園（+20点）などの加点制度を活用することが重要です。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>松戸市の調整指数は制度改正により変更される可能性があります。申込時に最新の基準をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 75,
  },
  {
    slug: "next-year-changes",
    citySlug: "matsudo",
    title: "松戸市の令和8年度入園　変更点と注意事項",
    description:
      "松戸市の令和8年度保育園入園選考の注意点をまとめました。",
    image: "https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=800&h=400&fit=crop",
    category: "最新情報",
    categoryColor: "purple",
    content: `<h2>令和8年度の注意点</h2>
<p>松戸市の保育園入園制度は毎年見直しが行われます。最新の利用調整基準を確認しましょう。</p>

<h2>確認すべきポイント</h2>
<ul>
<li>基準指数・調整指数の変更有無</li>
<li>新設園の情報</li>
<li>定員の増減</li>
<li>認可外利用の加点条件の変更</li>
<li>同居親族の減点条件の変更</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>松戸市は「すぐやる課」で有名な行政サービスに積極的な自治体です。保育課への問い合わせにも丁寧に対応してもらえますので、不明点は電話で確認しましょう。</p>
</div>

<h2>松戸市の保育園整備状況</h2>
<p>松戸市は人口約50万人の千葉県北西部の中核市で、認可保育園は約70か所あります。待機児童対策として新設園の整備が進められています。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新情報は<a href="https://www.city.matsudo.chiba.jp/kosodate/matsudodekosodate/kosodatenavi/hoikuenyouchien/index.html" target="_blank" rel="noopener">松戸市公式サイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 70,
  },
  {
    slug: "popular-areas",
    citySlug: "matsudo",
    title: "松戸市の人気エリアと入りやすい地域の傾向",
    description:
      "松戸市内で保育園の競争率が高いエリアと比較的入りやすい地域を解説します。",
    image: "https://images.unsplash.com/photo-1524813686514-a57563d77965?w=800&h=400&fit=crop",
    category: "エリア情報",
    categoryColor: "teal",
    content: `<h2>松戸市の保育園事情</h2>
<p>松戸市は千葉県北西部に位置し、人口約50万人を擁する中核市です。常磐線・新京成線沿線を中心に保育需要が高い自治体です。</p>

<h2>競争率が高い傾向のエリア</h2>
<ul>
<li>松戸駅周辺：市の中心部で子育て世帯に人気</li>
<li>新松戸駅周辺：JR常磐線・武蔵野線の乗換駅で利便性が高い</li>
<li>北小金駅周辺：駅前にマンションが多く子育て世帯が集中</li>
</ul>

<h2>比較的入りやすい傾向のエリア</h2>
<ul>
<li>東部エリア（秋山・東松戸方面）：北総線沿線で新設園が増加</li>
<li>五香・常盤平方面：新京成線沿線の住宅地で園の数が多い</li>
<li>馬橋・新松戸の外周部：駅から離れた郊外エリア</li>
</ul>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>エリアの難易度は年度や年齢クラスによって変わります。最新の空き状況を市に確認してください。</p>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>松戸市は公式サイトで園ごとの空き状況を公開しています。常磐線・新京成線・北総線の沿線で通勤経路上の園も含めて幅広く希望園を検討しましょう。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 60,
  },
  {
    slug: "competition-reality",
    citySlug: "matsudo",
    title: "松戸市の保育園入園競争の実態",
    description:
      "松戸市の保育園入園はどのくらい厳しいのか。40点制の選考の実態を解説します。",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>松戸市の入園競争の現状</h2>
<p>松戸市は千葉県北西部の中核市で、東京都心へのアクセスが良いため子育て世帯が多い自治体です。特に1歳児クラスの競争が激しい傾向にあります。</p>

<h2>ボリュームゾーン</h2>
<p>フルタイム共働き世帯は基準指数<span class="highlight">200点</span>で横並びです。調整指数の加点で差がつきます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>220点以上あれば多くの園で入園できる可能性が高いです。200点＋育休復帰（+20点）＝<span class="highlight">220点</span>が一つの目安です。育休復帰ときょうだい在園（+20点）を合わせた<span class="highlight">240点</span>ならさらに安心です。</p>
</div>

<h2>年齢別の傾向</h2>
<ul>
<li>0歳児クラス：受入枠が少なく競争率が高い園もある</li>
<li>1歳児クラス：最も競争が激しい年齢</li>
<li>2歳児クラス：空きが少ない</li>
<li>3歳児以上：枠が増えるため比較的入りやすい</li>
</ul>

<h2>松戸市の特徴</h2>
<p>松戸市は待機児童対策に力を入れており、近年は新設園の整備が進んでいます。また「すぐやる課」で知られるように行政対応に積極的な自治体です。保育課への相談も気軽にできます。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>求職活動中の基準指数は40点で、就労中（最大100点）の40%です。求職中での入園は人気エリアでは困難な傾向にあります。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 95,
  },
];

registerArticles(articles);
