import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  {
    slug: "hokatsu-schedule",
    citySlug: "yamato",
    title: "大和市の保活スケジュール　申込から内定までの流れ",
    description:
      "大和市の認可保育園の申込時期・選考の流れをまとめました。令和8年度4月入園の動き方を解説します。",
    image: "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>大和市の4月入園スケジュール</h2>
<p>大和市の認可保育園は毎年秋に翌年度4月入園の申込を受付けます。大和市こども部ほいく課の案内を参考に準備しましょう。</p>

<h3>保活の全体スケジュール</h3>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>4月〜6月：情報収集</strong>
<p>大和市のホームページで保育園の一覧を確認します。大和市には認可保育園が約35か所あります。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>6月〜9月：保育園見学</strong>
<p>気になる園に連絡して見学を予約しましょう。「健康都市」を宣言する大和市は子育て支援にも力を入れています。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>9月〜10月：書類の入手・準備</strong>
<p>就労証明書などの必要書類を準備します。大和市の様式はホームページからダウンロードできます。</p>
</div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content">
<strong>10月〜11月：申込書類の提出</strong>
<p>ほいく課窓口または郵送で提出します。</p>
</div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>大和市は基本指数が父母各最大20点（合計40点満点）です。月あたりの日数と1日あたりの時間の組み合わせで判定されます。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳しくは<a href="https://www.city.yamato.lg.jp/section/ehon_no_machi/purpose/O/O_menu.html" target="_blank" rel="noopener">大和市こども部ほいく課</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 55,
  },
  {
    slug: "scoring-system-guide",
    citySlug: "yamato",
    title: "大和市の入園点数のしくみ　基本指数と調整指数を解説",
    description:
      "大和市の保育園入園選考で使われる基本指数と調整指数のしくみを解説します。",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>大和市の選考点数とは</h2>
<p>大和市の認可保育園の入園選考は「基本指数＋調整指数」の合計で行われます。人口約24万人の大和市では毎年多くの家庭が保育園を申し込むため、点数のしくみを理解することが重要です。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>選考点数 = 基本指数（保護者1 + 保護者2）+ 調整指数</p>
</div>

<h2>基本指数（父母各最大20点、合計40点）</h2>
<p>就労の場合、月20日以上かつ1日8時間以上で満点の<span class="highlight">20点</span>になります。</p>

<table>
<tr><th>就労日数・時間</th><th>点数</th></tr>
<tr><td>月20日以上かつ1日8時間以上</td><td>20</td></tr>
<tr><td>月20日以上かつ1日6時間以上</td><td>18</td></tr>
<tr><td>月16日以上かつ1日6時間以上</td><td>16</td></tr>
<tr><td>月16日以上かつ1日4時間以上</td><td>14</td></tr>
<tr><td>月12日以上かつ1日4時間以上</td><td>12</td></tr>
<tr><td>月64時間以上</td><td>10</td></tr>
</table>

<h2>調整指数の代表例</h2>
<ul>
<li>ひとり親世帯：<span class="highlight">+5点</span></li>
<li>きょうだい在園：<span class="highlight">+3点</span></li>
<li>認可外保育施設に預けている：<span class="highlight">+3点</span></li>
<li>生活保護受給世帯：<span class="highlight">+3点</span></li>
<li>育休復帰予定：<span class="highlight">+2点</span></li>
<li>きょうだい同時申込：<span class="highlight">+2点</span></li>
<li>市外からの申込：<span class="highlight">-10点</span></li>
<li>転園希望：<span class="highlight">-5点</span></li>
<li>保育可能な同居親族あり：<span class="highlight">-3点</span></li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>全項目は<a href="https://www.city.yamato.lg.jp/section/ehon_no_machi/purpose/O/O_menu.html" target="_blank" rel="noopener">大和市こども部ほいく課</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 65,
  },
  {
    slug: "score-up-tips",
    citySlug: "yamato",
    title: "大和市で入園点数を上げるコツ　加点を最大化する方法",
    description:
      "大和市の保育園入園選考で調整指数の加点を最大限に活用する方法を解説します。",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>基本指数40点は出発点</h2>
<p>大和市ではフルタイム共働き世帯は基本指数<span class="highlight">40点</span>で横並びです。差がつくのは調整指数です。</p>

<h2>加点チェックリスト</h2>
<table>
<tr><th>項目</th><th>点数</th><th>条件</th></tr>
<tr><td>ひとり親</td><td>+5</td><td>ひとり親世帯であること</td></tr>
<tr><td>きょうだい在園</td><td>+3</td><td>きょうだいが認可保育園に在園中</td></tr>
<tr><td>認可外利用</td><td>+3</td><td>月ぎめで認可外保育施設を利用中</td></tr>
<tr><td>生活保護</td><td>+3</td><td>生活保護受給世帯</td></tr>
<tr><td>育休復帰</td><td>+2</td><td>育休明けで復職予定</td></tr>
<tr><td>同時申込</td><td>+2</td><td>きょうだいと同時に申し込む</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>大和市はひとり親加点が+5点と大きいのが特徴です。認可外利用やきょうだい在園もそれぞれ+3点あるため、該当する場合は必ず申告しましょう。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 60,
  },
  {
    slug: "tiebreaker-rules",
    citySlug: "yamato",
    title: "大和市の同点時の優先順位　点数が同じ場合どうなる？",
    description:
      "大和市の保育園入園選考で点数が同点になった場合の優先順位のルールを解説します。",
    image: "https://images.unsplash.com/photo-1590650153855-d9e808231d41?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>同点時の優先順位</h2>
<p>大和市では選考点数が同じ場合、以下の優先順位に基づいて入園が決まります。</p>

<h3>主な優先要素</h3>
<ul>
<li>大和市に住民登録がある方が優先</li>
<li>保育の必要度が高い世帯</li>
<li>ひとり親世帯</li>
<li>きょうだいの在園状況</li>
<li>世帯の所得が低い方</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>大和市は神奈川県中央部に位置し、人口約24万人を抱えるベッドタウンです。大和駅・中央林間駅周辺の人気園は同点勝負になりやすいため、調整指数の加点を確実に取ることが重要です。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 45,
  },
  {
    slug: "part-time-work-score",
    citySlug: "yamato",
    title: "大和市のパート・時短勤務の点数　何日何時間で何点？",
    description:
      "大和市の保育園入園で、パートや時短勤務の場合にもらえる基本指数を解説します。",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>パート・時短勤務の基本指数</h2>
<p>大和市では月あたりの勤務日数と1日あたりの勤務時間の組み合わせで基本指数が決まります。フルタイムでなくても点数が付きます。</p>

<table>
<tr><th>勤務パターン</th><th>点数</th><th>パターン例</th></tr>
<tr><td>月20日以上かつ1日8時間以上</td><td>20</td><td>週5日・1日8時間のフルタイム</td></tr>
<tr><td>月20日以上かつ1日6時間以上</td><td>18</td><td>週5日・1日6時間の時短勤務</td></tr>
<tr><td>月16日以上かつ1日6時間以上</td><td>16</td><td>週4日・1日6時間以上</td></tr>
<tr><td>月16日以上かつ1日4時間以上</td><td>14</td><td>週4日・1日4時間以上</td></tr>
<tr><td>月12日以上かつ1日4時間以上</td><td>12</td><td>週3日・1日4時間以上</td></tr>
<tr><td>月64時間以上</td><td>10</td><td>上記以外で月64時間以上</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>大和市の入園要件は月64時間以上の就労です。週3日・1日6時間程度（月72時間）なら12点で申込み可能です。勤務日数と1日の時間の両方を満たす必要がある点に注意しましょう。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 50,
  },
  {
    slug: "rejection-options",
    citySlug: "yamato",
    title: "大和市で不承諾になったら　次にやるべきこと",
    description:
      "大和市の保育園入園で不承諾通知が届いた場合の対処法をまとめました。",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop",
    category: "不承諾対策",
    categoryColor: "rose",
    content: `<h2>不承諾通知が届いたら</h2>
<p>大和市では4月一次選考の結果は2月上旬に届きます。不承諾の場合の選択肢を整理します。</p>

<h3>選択肢</h3>
<ul>
<li>二次募集に申し込む</li>
<li>5月以降の途中入園を申し込む</li>
<li>認可外保育施設を利用しながら翌年度に再申込する（調整指数+3点の加点も得られる）</li>
<li>大和市の小規模保育事業所を検討する</li>
</ul>

<h2>認可外保育施設の活用</h2>
<p>大和市では認可外保育施設に月ぎめで預けていると調整指数+3点の加点があります。翌年度の再申込時に有利になるため、不承諾の場合は認可外の利用を検討しましょう。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>認可外保育施設の一覧は<a href="https://www.city.yamato.lg.jp/section/ehon_no_machi/purpose/O/O_menu.html" target="_blank" rel="noopener">大和市こども部ほいく課</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 40,
  },
  {
    slug: "unlicensed-nursery-bonus",
    citySlug: "yamato",
    title: "大和市で認可外保育施設の加点を取る方法",
    description:
      "大和市で認可外保育施設の利用による加点を得る方法を解説します。",
    image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>認可外保育施設の加点とは</h2>
<p>大和市では認可外保育施設に月ぎめで預けている場合、調整指数が<span class="highlight">+3点</span>加算されます。フルタイム共働き世帯が横並びになる中で、この3点は大きな差になります。</p>

<h2>対象となる条件</h2>
<ul>
<li>認可外保育施設に月ぎめ契約で預けていること</li>
<li>申込時点で利用実績があること</li>
<li>一時保育のみの利用は対象外</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>大和市の認可外加点+3と育休復帰+2を組み合わせれば合計+5点になります。フルタイム共働きの基本指数40点に加えて45点を狙えるため、人気園への入園可能性が高まります。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>対象施設については<a href="https://www.city.yamato.lg.jp/section/ehon_no_machi/purpose/O/O_menu.html" target="_blank" rel="noopener">大和市こども部ほいく課</a>にお問い合わせください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 55,
  },
  {
    slug: "next-year-changes",
    citySlug: "yamato",
    title: "大和市の保育園事情　最新動向と今後の見通し",
    description:
      "大和市の保育園整備計画や待機児童の動向など、最新の保育園事情をまとめました。",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=400&fit=crop",
    category: "最新情報",
    categoryColor: "purple",
    content: `<h2>大和市の保育園事情</h2>
<p>大和市は神奈川県のほぼ中央に位置する人口約24万人の都市です。「健康都市」を宣言し、子育て支援にも積極的に取り組んでいます。</p>

<h2>最近の傾向</h2>
<ul>
<li>認可保育園は約35か所が整備されている</li>
<li>小規模保育事業所の拡充が進んでいる</li>
<li>大和駅・中央林間駅周辺での保育需要が高い</li>
<li>こども部ほいく課が保育コンシェルジュを配置</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>大和市は小田急線・相鉄線・田園都市線の3路線が利用でき、通勤の利便性から子育て世代に人気です。新設園の情報は市のホームページでチェックしましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新の情報は<a href="https://www.city.yamato.lg.jp/section/ehon_no_machi/purpose/O/O_menu.html" target="_blank" rel="noopener">大和市こども部ほいく課</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 35,
  },
  {
    slug: "popular-areas",
    citySlug: "yamato",
    title: "大和市の地域別・保育園の入りやすさ",
    description:
      "大和市内の地域別に保育園の入りやすさを比較し、保活の参考情報をまとめました。",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=400&fit=crop",
    category: "地域情報",
    categoryColor: "teal",
    content: `<h2>大和市の地域特性</h2>
<p>大和市は小田急線・相鉄線・田園都市線が通り、エリアによって保育園の競争率が異なります。</p>

<h3>競争が激しいエリア</h3>
<ul>
<li>大和駅周辺：小田急線と相鉄線の乗換駅で利便性が高い</li>
<li>中央林間駅周辺：田園都市線の始発駅で通勤に便利なファミリー層に人気</li>
</ul>

<h3>比較的入りやすいエリア</h3>
<ul>
<li>桜ヶ丘・高座渋谷エリア：駅前に園があり、競争率がやや低め</li>
<li>南林間・鶴間エリア：住宅地で園の数が一定数ある</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>大和市の各園の入所状況はほいく課に問い合わせることで確認できます。希望園は5か所以上書くことをおすすめします。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 50,
  },
  {
    slug: "competition-reality",
    citySlug: "yamato",
    title: "大和市で保育園に入れる点数の目安　何点あれば安心？",
    description:
      "大和市の保育園入園に必要な点数の目安を、過去の傾向をもとに解説します。",
    image: "https://images.unsplash.com/photo-1460518451285-97b6aa326961?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>内定に必要な点数の目安</h2>
<p>大和市は基本指数が父母各最大20点（合計40点満点）で、調整指数を加えた合計点で選考されます。</p>

<h3>人気エリアの目安（1歳児クラス）</h3>
<table>
<tr><th>エリア</th><th>目安の点数</th></tr>
<tr><td>中央林間駅周辺</td><td>43〜45点</td></tr>
<tr><td>大和駅周辺</td><td>42〜44点</td></tr>
<tr><td>桜ヶ丘・高座渋谷エリア</td><td>40〜42点</td></tr>
</table>

<p>人気園ではフルタイム共働き（40点）だけでは足りず、認可外利用の+3点やきょうだい在園の+3点などの加点が必要になるケースがあります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>上記は過去の傾向をもとにした参考値です。最新の選考状況は大和市こども部ほいく課に問い合わせてください。希望園は人気園と比較的入りやすい園を組み合わせて書くのがおすすめです。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 60,
  },
];

registerArticles(articles);
