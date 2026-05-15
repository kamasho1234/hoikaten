import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  {
    slug: "hokatsu-schedule",
    citySlug: "narashino",
    title: "習志野市の保活スケジュール　申込から内定までの流れ",
    description:
      "習志野市の認可保育園の申込時期・選考の流れをまとめました。令和8年度4月入園の動き方を解説します。",
    image: "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>習志野市の4月入園スケジュール</h2>
<p>習志野市の認可保育園は毎年秋に翌年度4月入園の申込を受付けます。こども部こども保育課が窓口です。</p>

<h3>保活の全体スケジュール</h3>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>4月〜6月：情報収集</strong>
<p>習志野市のホームページで保育園の一覧と空き状況を確認します。市内には認可保育園が約25か所あります。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>6月〜9月：保育園見学</strong>
<p>気になる園に連絡して見学を予約しましょう。津田沼駅周辺は人気が高いので早めの見学がおすすめです。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>9月〜10月：書類準備</strong>
<p>就労証明書などの必要書類を準備します。</p>
</div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content">
<strong>10月〜11月：申込書類の提出</strong>
<p>こども保育課窓口で提出します。</p>
</div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>習志野市は基準指数が父母各最大20点（合計40点満点）です。月の合計就労時間で判定されます。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳しくは<a href="https://www.city.narashino.lg.jp/soshiki/kodomo_hoiku/index.html" target="_blank" rel="noopener">習志野市公式サイト</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 55,
  },
  {
    slug: "scoring-system-guide",
    citySlug: "narashino",
    title: "習志野市の入園点数のしくみ　基準指数と調整指数を解説",
    description:
      "習志野市の保育園入園選考で使われる基準指数と調整指数のしくみを解説します。",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>習志野市の選考指数とは</h2>
<p>習志野市の認可保育園の入園選考は「基準指数＋調整指数」の合計で行われます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>選考指数 = 基準指数（保護者1 + 保護者2）+ 調整指数</p>
</div>

<h2>基準指数（父母各最大20点、合計40点）</h2>
<p>就労の場合、月160時間以上で満点の<span class="highlight">20点</span>になります。</p>

<table>
<tr><th>月の就労時間</th><th>指数</th></tr>
<tr><td>月160時間以上</td><td>20</td></tr>
<tr><td>月140〜160時間</td><td>18</td></tr>
<tr><td>月120〜140時間</td><td>16</td></tr>
<tr><td>月100〜120時間</td><td>14</td></tr>
<tr><td>月80〜100時間</td><td>12</td></tr>
<tr><td>月64〜80時間</td><td>10</td></tr>
</table>

<h2>調整指数の代表例</h2>
<ul>
<li>ひとり親世帯：<span class="highlight">+5点</span></li>
<li>きょうだいが認可保育園に在園中：<span class="highlight">+3点</span></li>
<li>認可外保育施設に月ぎめで利用中：<span class="highlight">+3点</span></li>
<li>生活保護世帯：<span class="highlight">+3点</span></li>
<li>育児休業から復帰予定：<span class="highlight">+2点</span></li>
<li>きょうだいと同時申込：<span class="highlight">+2点</span></li>
</ul>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>市外からの申込は<span class="highlight">-10点</span>、65歳未満の同居親族がいる場合は<span class="highlight">-3点</span>、転園希望は<span class="highlight">-5点</span>の減点があります。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>全項目は<a href="https://www.city.narashino.lg.jp/soshiki/kodomo_hoiku/index.html" target="_blank" rel="noopener">習志野市公式サイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 65,
  },
  {
    slug: "score-up-tips",
    citySlug: "narashino",
    title: "習志野市で入園点数を上げるコツ　加点を最大化する方法",
    description:
      "習志野市の保育園入園選考で調整指数の加点を最大限に活用する方法を解説します。",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>基準指数40点は出発点</h2>
<p>習志野市ではフルタイム共働き世帯は基準指数<span class="highlight">40点</span>で横並びです。差がつくのは調整指数です。</p>

<h2>加点チェックリスト</h2>
<table>
<tr><th>項目</th><th>点数</th><th>条件</th></tr>
<tr><td>ひとり親</td><td>+5</td><td>ひとり親世帯であること</td></tr>
<tr><td>きょうだい在園</td><td>+3</td><td>きょうだいが認可保育園に在園中</td></tr>
<tr><td>認可外利用</td><td>+3</td><td>認可外保育施設に月ぎめで預けている</td></tr>
<tr><td>生活保護</td><td>+3</td><td>生活保護を受けている</td></tr>
<tr><td>育休復帰</td><td>+2</td><td>育児休業を取得し復帰予定</td></tr>
<tr><td>同時申込</td><td>+2</td><td>きょうだいと同時に申し込む</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>習志野市は人口約17万人のコンパクトな市ですが、津田沼駅周辺は商業集積が進み子育て世帯にも人気です。加点がないと厳しい園もあります。</p>
</div>

<h2>減点に注意</h2>
<ul>
<li>市外からの申込：<span class="highlight">-10点</span></li>
<li>65歳未満の同居親族あり：<span class="highlight">-3点</span></li>
<li>転園希望：<span class="highlight">-5点</span></li>
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
    citySlug: "narashino",
    title: "習志野市の同点時の優先順位　点数が同じ場合どうなる？",
    description:
      "習志野市の保育園入園選考で指数が同点になった場合の優先順位のルールを解説します。",
    image: "https://images.unsplash.com/photo-1590650153855-d9e808231d41?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>同点時の優先順位</h2>
<p>習志野市では基準指数と調整指数の合計が同点の場合、以下の優先順位で入園が決まります。</p>

<h3>主な優先要素</h3>
<ul>
<li>習志野市在住者が優先</li>
<li>保育の必要性が高い世帯</li>
<li>ひとり親世帯は優先</li>
<li>きょうだいの在園状況</li>
<li>世帯の課税額が低い方</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>同点勝負では世帯の課税額（所得）が重要な要素になります。所得が低い方が優先される傾向があります。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>同点時の判定基準の詳細は毎年の案内で確認してください。年度によって変更されることがあります。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 45,
  },
  {
    slug: "part-time-work-score",
    citySlug: "narashino",
    title: "習志野市のパート・時短勤務の点数　何時間で何点？",
    description:
      "習志野市の保育園入園で、パートや時短勤務の場合にもらえる基準指数を解説します。",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>パート・時短勤務の基準指数</h2>
<p>習志野市では月あたりの就労時間で基準指数が決まります。就労時間には休憩時間を含みますが、通勤時間は含みません。</p>

<table>
<tr><th>月の就労時間</th><th>指数</th><th>勤務パターン例</th></tr>
<tr><td>月160時間以上</td><td>20</td><td>週5日・1日8時間</td></tr>
<tr><td>月140〜160時間</td><td>18</td><td>週5日・1日7時間</td></tr>
<tr><td>月120〜140時間</td><td>16</td><td>週5日・1日6時間</td></tr>
<tr><td>月100〜120時間</td><td>14</td><td>週5日・1日5時間</td></tr>
<tr><td>月80〜100時間</td><td>12</td><td>週4日・1日5時間</td></tr>
<tr><td>月64〜80時間</td><td>10</td><td>週4日・1日4時間</td></tr>
</table>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>月20日勤務で1日6時間の時短勤務の場合、月120時間で基準指数は<span class="highlight">16点</span>です。フルタイムの20点と比べて4点下がります。</p>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>入園要件は月64時間以上の就労です。複数の勤務先がある場合は就労時間を合算できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 90,
  },
  {
    slug: "rejection-options",
    citySlug: "narashino",
    title: "習志野市で不承諾になったら　次にやるべきこと",
    description:
      "習志野市の保育園入園で不承諾通知が届いた場合の対処法をまとめました。",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop",
    category: "不承諾対策",
    categoryColor: "rose",
    content: `<h2>不承諾通知が届いたら</h2>
<p>習志野市では4月一次選考の結果が2月上旬頃に届きます。不承諾だった場合の選択肢を整理します。</p>

<h3>選択肢</h3>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>二次募集に申し込む</strong>
<p>一次選考後の辞退者枠で二次募集が行われます。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>途中入園を申し込む</strong>
<p>5月以降に空きが出た場合に途中入園が可能です。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>認可外保育施設を利用する</strong>
<p>認可外を利用しながら翌年度に再申込すると+3点の加点が見込めます。</p>
</div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content">
<strong>育休を延長する</strong>
<p>不承諾通知があれば育休を最長2歳まで延長できます。</p>
</div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>認可外保育施設に預けてから翌年度に再申込すると+3点の加点がもらえます。長い目で見た戦略も大切です。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 80,
  },
  {
    slug: "unlicensed-nursery-bonus",
    citySlug: "narashino",
    title: "習志野市で認可外加点を取る方法　対象施設と条件",
    description:
      "習志野市で認可外保育施設の利用による加点を得る方法と注意点を解説します。",
    image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>認可外加点とは</h2>
<p>習志野市では認可外保育施設に月ぎめで預けている場合、調整指数が<span class="highlight">+3点</span>加算されます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>月ぎめの契約が必要です。一時預かりのみの利用は対象になりません。</p>
</div>

<h2>対象となる施設</h2>
<ul>
<li>認可外保育施設</li>
<li>企業主導型保育施設</li>
</ul>

<h2>費用の目安</h2>
<p>習志野市内の認可外保育施設の月額料金は施設によって異なりますが、月5万〜8万円程度が一般的です。</p>

<h2>翌年度への布石</h2>
<p>不承諾だった場合に認可外を利用すると、翌年度の申込で+3点の加点がつきます。育休復帰の+2点と合わせれば+5点の加算が見込めます。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>利用証明書が必要になりますので、利用している施設に発行を依頼してください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 75,
  },
  {
    slug: "next-year-changes",
    citySlug: "narashino",
    title: "習志野市の保育園事情　最新動向と今後の見通し",
    description:
      "習志野市の保育園整備計画や待機児童の動向など、最新の保育園事情をまとめました。",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=400&fit=crop",
    category: "最新情報",
    categoryColor: "purple",
    content: `<h2>習志野市の保育園事情</h2>
<p>習志野市は人口約17万人の千葉県北西部の都市です。津田沼駅周辺の商業集積や再開発により子育て世帯にも人気があります。</p>

<h2>最近の傾向</h2>
<ul>
<li>市内に認可保育園が約25か所</li>
<li>津田沼駅周辺の再開発に伴い保育需要が増加</li>
<li>小規模保育事業の整備も進んでいる</li>
<li>1歳児クラスは引き続き競争がある</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>習志野市は毎年、利用調整基準の見直しを行います。申込前に必ず最新の基準を確認しましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新の情報は<a href="https://www.city.narashino.lg.jp/soshiki/kodomo_hoiku/index.html" target="_blank" rel="noopener">習志野市公式サイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 35,
  },
  {
    slug: "popular-areas",
    citySlug: "narashino",
    title: "習志野市の地域別・保育園の入りやすさ",
    description:
      "習志野市内の地域別に保育園の入りやすさを比較し、保活の参考情報をまとめました。",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=400&fit=crop",
    category: "地域情報",
    categoryColor: "teal",
    content: `<h2>習志野市の地域特性</h2>
<p>習志野市はJR総武線・京成線が通り、津田沼駅を中心に商業施設が充実しています。地域によって保育園の競争率に差があります。</p>

<h3>競争が激しいエリア</h3>
<ul>
<li>津田沼駅周辺：商業施設が多く共働き世帯に人気</li>
<li>谷津・奏の杜エリア：再開発でファミリー層が増加</li>
</ul>

<h3>比較的入りやすいエリア</h3>
<ul>
<li>実籾・大久保エリア：園の数が一定数あり競争は穏やか</li>
<li>新習志野・秋津エリア：京葉線沿いで園の新設もある</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>習志野市は面積がコンパクトなため、自転車や車で通える範囲の園も含めて幅広く検討するのが得策です。</p>
</div>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>エリアの難易度は年度や年齢クラスによって変わります。最新の空き状況はこども保育課に確認してください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 50,
  },
  {
    slug: "competition-reality",
    citySlug: "narashino",
    title: "習志野市で保育園に入れる点数の目安　何点あれば安心？",
    description:
      "習志野市の保育園入園に必要な点数の目安を、過去の傾向をもとに解説します。",
    image: "https://images.unsplash.com/photo-1460518451285-97b6aa326961?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>内定に必要な点数の目安</h2>
<p>習志野市の人気園では基準指数40点（フルタイム共働き）に加え、調整指数の加点が必要になることがあります。</p>

<h3>目安（1歳児クラス）</h3>
<table>
<tr><th>エリア</th><th>目安の点数</th></tr>
<tr><td>津田沼駅周辺</td><td>43〜45点</td></tr>
<tr><td>谷津・奏の杜</td><td>42〜44点</td></tr>
<tr><td>実籾・大久保</td><td>40〜42点</td></tr>
<tr><td>新習志野・秋津</td><td>40〜42点</td></tr>
</table>

<p>0歳児クラスや3〜5歳児クラスは1歳児に比べて入りやすい傾向にあります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>認可外利用（+3点）と育休復帰（+2点）を積めば45点に到達できます。津田沼周辺を狙う場合はこの組み合わせを意識しましょう。</p>
</div>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>上記は保護者の口コミ等をもとにした参考値です。公式情報ではありませんのでご了承ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 95,
  },
];

registerArticles(articles);
