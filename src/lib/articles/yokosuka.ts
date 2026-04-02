import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  {
    slug: "hokatsu-schedule",
    citySlug: "yokosuka",
    title: "横須賀市の保活スケジュール　申込から内定までの流れ",
    description:
      "横須賀市の認可保育園の申込時期・選考の流れをまとめました。令和8年度4月入園の動き方を解説します。",
    image: "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>横須賀市の4月入園スケジュール</h2>
<p>横須賀市の認可保育園は毎年10月に翌年度4月入園の申込を受付けます。「保育施設入園案内」を入手して準備しましょう。</p>

<h3>保活の全体スケジュール</h3>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>4月〜6月：情報収集</strong>
<p>市のホームページで保育園の一覧を確認します。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>6月〜9月：保育園見学</strong>
<p>気になる園に連絡して見学を予約しましょう。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>9月〜10月：入園案内の入手・書類準備</strong>
<p>就労証明書などの必要書類を準備します。</p>
</div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content">
<strong>10月：申込書類の提出</strong>
<p>子育て支援課の窓口で提出します。申請期間は10月1日〜31日です。</p>
</div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>横須賀市は「基本指数」（5〜70点）と「優先利用指数」（0〜50点）の合算で選考されます。父母のうち低い方の基本指数がお子さんの指数になる「低い方採用」の制度です。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳しくは<a href="https://www.city.yokosuka.kanagawa.jp/2645/nyuuenn.html" target="_blank" rel="noopener">横須賀市公式サイト</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 55,
  },
  {
    slug: "scoring-system-guide",
    citySlug: "yokosuka",
    title: "横須賀市の入園点数のしくみ　基本指数と優先利用指数を解説",
    description:
      "横須賀市の保育園入園選考で使われる基本指数と優先利用指数のしくみを解説します。",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>横須賀市の選考指数とは</h2>
<p>横須賀市の保育施設入園審査は「基本指数＋優先利用指数」の合計で行われます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>合計指数 = 基本指数（低い方の保護者の指数を採用）+ 優先利用指数</p>
</div>

<h2>基本指数（5〜70点）</h2>
<p>父母それぞれに指数をつけ、低い方の指数がお子さんの基本指数になります。就労の場合：</p>

<table>
<tr><th>勤務の状況</th><th>指数</th></tr>
<tr><td>月20日以上・1日8時間以上（月160時間以上）</td><td>70</td></tr>
<tr><td>月20日以上・1日6時間以上（月120時間以上）</td><td>60</td></tr>
<tr><td>月16日以上・1日6時間以上（月96時間以上）</td><td>50</td></tr>
<tr><td>月16日以上・1日4時間以上（月64時間以上）</td><td>40</td></tr>
<tr><td>月12日以上・1日4時間以上（月48時間以上）</td><td>30</td></tr>
</table>

<h2>優先利用指数の代表例</h2>
<ul>
<li>ひとり親世帯：<span class="highlight">+10点</span></li>
<li>きょうだいが通う施設を第1希望にした：<span class="highlight">+10点</span></li>
<li>生活保護世帯：<span class="highlight">+10点</span></li>
<li>保護者が保育士で認可施設に勤務：<span class="highlight">+10点</span></li>
<li>認可外保育施設に預けている：<span class="highlight">+5点</span></li>
<li>きょうだい同時申込：<span class="highlight">+5点</span></li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>全項目は<a href="https://www.city.yokosuka.kanagawa.jp/2645/nyuuenn.html" target="_blank" rel="noopener">横須賀市公式サイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 65,
  },
  {
    slug: "score-up-tips",
    citySlug: "yokosuka",
    title: "横須賀市で入園点数を上げるコツ　優先利用指数を最大化する方法",
    description:
      "横須賀市の保育園入園選考で優先利用指数の加点を最大限に活用する方法を解説します。",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>基本指数70点は出発点</h2>
<p>横須賀市ではフルタイム共働き世帯は基本指数<span class="highlight">70点</span>で横並びです。「低い方採用」なので、両親ともフルタイムであることが前提です。</p>

<h2>加点チェックリスト</h2>
<table>
<tr><th>項目</th><th>点数</th><th>条件</th></tr>
<tr><td>ひとり親</td><td>+10</td><td>ひとり親世帯であること</td></tr>
<tr><td>きょうだい第1希望</td><td>+10</td><td>きょうだいが通う施設を第1希望にする</td></tr>
<tr><td>保育士</td><td>+10</td><td>保護者が認可保育施設に勤務する保育士</td></tr>
<tr><td>認可外利用</td><td>+5</td><td>認可外保育施設に預けている</td></tr>
<tr><td>きょうだい同時</td><td>+5</td><td>きょうだいで同じ施設を第1希望で同時申込</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>横須賀市は「低い方採用」の制度なので、片方の保護者がパートだとそちらの指数が世帯の基本指数になります。両親の勤務時間のバランスが重要です。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 60,
  },
  {
    slug: "tiebreaker-rules",
    citySlug: "yokosuka",
    title: "横須賀市の同点時の優先順位　点数が同じ場合どうなる？",
    description:
      "横須賀市の保育園入園選考で合計指数が同点になった場合の優先順位のルールを解説します。",
    image: "https://images.unsplash.com/photo-1590650153855-d9e808231d41?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>同点時の優先順位</h2>
<p>横須賀市では合計指数が同点の場合、以下の優先順位で入園が決まります。</p>

<h3>主な優先要素</h3>
<ul>
<li>横須賀市在住者が優先</li>
<li>保育の必要性が高い世帯</li>
<li>きょうだいの在園状況</li>
<li>世帯の所得が低い方</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>横須賀市は「低い方採用」制度のため、同点になる世帯が多くなりやすいです。優先利用指数をできるだけ多く確保することが重要です。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 45,
  },
  {
    slug: "part-time-work-score",
    citySlug: "yokosuka",
    title: "横須賀市のパート・時短勤務の点数　何時間で何点？",
    description:
      "横須賀市の保育園入園で、パートや時短勤務の場合にもらえる基本指数を解説します。",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>パート・時短勤務の基本指数</h2>
<p>横須賀市では勤務日数と1日の勤務時間の組み合わせで基本指数が決まります。</p>

<table>
<tr><th>勤務パターン</th><th>指数</th></tr>
<tr><td>月20日以上・1日8時間以上</td><td>70</td></tr>
<tr><td>月20日以上・1日6時間以上</td><td>60</td></tr>
<tr><td>月16日以上・1日6時間以上</td><td>50</td></tr>
<tr><td>月16日以上・1日4時間以上</td><td>40</td></tr>
<tr><td>月12日以上・1日4時間以上</td><td>30</td></tr>
</table>

<h2>「低い方採用」の注意点</h2>
<p>横須賀市では父母のうち低い方の基本指数がお子さんの指数になります。たとえば、片方がフルタイム（70点）でもう一方がパート（40点）の場合、世帯の基本指数は<span class="highlight">40点</span>です。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>パートの場合、できるだけ勤務時間を増やして基本指数を上げることが有効です。月96時間以上（月16日・1日6時間）で50点になります。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 55,
  },
  {
    slug: "rejection-options",
    citySlug: "yokosuka",
    title: "横須賀市で不承諾になったら　次にやるべきこと",
    description:
      "横須賀市の保育園入園で不承諾通知が届いた場合の対処法をまとめました。",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop",
    category: "不承諾対策",
    categoryColor: "rose",
    content: `<h2>不承諾通知が届いたら</h2>
<p>横須賀市では4月入園の結果が2月上旬に届きます。不承諾だった場合の選択肢を整理します。</p>

<h3>選択肢</h3>
<ul>
<li>二次募集に申し込む</li>
<li>5月以降の途中入園を申し込む</li>
<li>認可外保育施設を利用しながら翌年度に再申込する</li>
<li>横須賀市の小規模保育事業所を検討する</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>認可外保育施設に預けてから翌年度に再申込すると+5点の優先利用指数がもらえます。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 40,
  },
  {
    slug: "unlicensed-nursery-bonus",
    citySlug: "yokosuka",
    title: "横須賀市で認可外加点を取る方法　対象施設と条件",
    description:
      "横須賀市で認可外保育施設の利用による加点を得る方法と注意点を解説します。",
    image: "https://images.unsplash.com/photo-1587654780291-39c9404d7dd0?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>認可外加点とは</h2>
<p>横須賀市では申込時に認可外保育施設を利用している場合、優先利用指数が<span class="highlight">+5点</span>加算されます。</p>

<h2>対象となる条件</h2>
<ul>
<li>認可外保育施設を利用していること</li>
<li>申込時点で利用中であること</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>フルタイム共働き（基本指数70点）同士の勝負で+5点は大きな差になります。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 45,
  },
  {
    slug: "next-year-changes",
    citySlug: "yokosuka",
    title: "横須賀市の保育園事情　最新動向と今後の見通し",
    description:
      "横須賀市の保育園整備計画や待機児童の動向など、最新の保育園事情をまとめました。",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=400&fit=crop",
    category: "最新情報",
    categoryColor: "purple",
    content: `<h2>横須賀市の保育園事情</h2>
<p>横須賀市は三浦半島の中心都市で、近年は子育て支援の充実に力を入れています。</p>

<h2>最近の傾向</h2>
<ul>
<li>横須賀中央・久里浜エリアでの保育園整備</li>
<li>小規模保育事業の拡充</li>
<li>待機児童数は減少傾向</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新の情報は<a href="https://www.city.yokosuka.kanagawa.jp/2645/nyuuenn.html" target="_blank" rel="noopener">横須賀市公式サイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 30,
  },
  {
    slug: "popular-areas",
    citySlug: "yokosuka",
    title: "横須賀市の地域別・保育園の入りやすさ",
    description:
      "横須賀市内の地域別に保育園の入りやすさを比較し、保活の参考情報をまとめました。",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=400&fit=crop",
    category: "地域情報",
    categoryColor: "teal",
    content: `<h2>横須賀市の地域特性</h2>
<p>横須賀市は京急線沿線を中心に、地域によって保育園の競争率が異なります。</p>

<h3>競争が激しいエリア</h3>
<ul>
<li>横須賀中央駅周辺：商業施設が充実し共働き世帯が多い</li>
<li>久里浜駅周辺：ファミリー層に人気のエリア</li>
</ul>

<h3>比較的入りやすいエリア</h3>
<ul>
<li>衣笠・追浜エリア：園の数が一定数あり競争は穏やか</li>
<li>浦賀・北久里浜エリア：郊外で比較的余裕がある</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>横須賀市の保育施設の空き状況は市のホームページで毎月更新されています。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 40,
  },
  {
    slug: "competition-reality",
    citySlug: "yokosuka",
    title: "横須賀市で保育園に入れる点数の目安　何点あれば安心？",
    description:
      "横須賀市の保育園入園に必要な点数の目安を、過去の傾向をもとに解説します。",
    image: "https://images.unsplash.com/photo-1460518451285-97b6aa326961?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>内定に必要な点数の目安</h2>
<p>横須賀市は「低い方採用」制度のため、フルタイム共働きなら基本指数70点がベースです。</p>

<h3>目安（1歳児クラス）</h3>
<table>
<tr><th>エリア</th><th>目安の合計指数</th></tr>
<tr><td>横須賀中央周辺</td><td>75〜80点</td></tr>
<tr><td>久里浜周辺</td><td>70〜75点</td></tr>
<tr><td>衣笠・追浜</td><td>70点前後</td></tr>
</table>

<p>人気園ではフルタイム（70点）だけでは足りず、優先利用指数の加点が必要になることがあります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>上記は保護者の口コミ等をもとにした参考値です。公式情報ではありませんのでご了承ください。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 50,
  },
];

registerArticles(articles);
