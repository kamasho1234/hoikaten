import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  {
    slug: "hokatsu-schedule",
    citySlug: "odawara",
    title: "小田原市の保活スケジュール　申込から内定までの流れ",
    description:
      "小田原市の認可保育園の申込時期・選考の流れをまとめました。令和8年度4月入園の動き方を解説します。",
    image: "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>小田原市の4月入園スケジュール</h2>
<p>小田原市の認可保育園は毎年秋に翌年度4月入園の申込を受付けます。小田原市子ども青少年部保育課の案内を参考に準備しましょう。</p>

<h3>保活の全体スケジュール</h3>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>4月〜6月：情報収集</strong>
<p>小田原市のホームページで認可保育園約25か所の一覧を確認します。小田原城周辺や駅前エリアの園を中心にチェックしましょう。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>6月〜9月：保育園見学</strong>
<p>気になる園に連絡して見学を予約しましょう。小田原市は園によって特色が異なるため、複数園の見学をおすすめします。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>9月〜10月：申込書類の準備</strong>
<p>就労証明書などの必要書類を準備します。勤務先への依頼は早めに行いましょう。</p>
</div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content">
<strong>10月〜11月：申込書類の提出</strong>
<p>保育課窓口で提出します。書類に不備がないよう事前に確認しましょう。</p>
</div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>小田原市は基本指数が父母各最大20点（合計40点満点）です。月あたりの就労時間で判定されます。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳しくは<a href="https://www.city.odawara.kanagawa.jp/field/welfare/nursesc/" target="_blank" rel="noopener">小田原市子ども青少年部保育課</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 55,
  },
  {
    slug: "scoring-system-guide",
    citySlug: "odawara",
    title: "小田原市の入園点数のしくみ　基本指数と調整指数を解説",
    description:
      "小田原市の保育園入園選考で使われる基本指数と調整指数のしくみを解説します。",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>小田原市の選考点数とは</h2>
<p>小田原市の認可保育園の入園選考は「基本指数＋調整指数」の合計で行われます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>選考点数 = 基本指数（保護者1 + 保護者2）+ 調整指数</p>
</div>

<h2>基本指数（父母各最大20点、合計40点）</h2>
<p>就労の場合、月160時間以上で満点の<span class="highlight">20点</span>になります。</p>

<table>
<tr><th>月の就労時間</th><th>点数</th></tr>
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
<li>きょうだいが在園中の施設を希望：<span class="highlight">+3点</span></li>
<li>認可外保育施設に預けている：<span class="highlight">+3点</span></li>
<li>生活保護世帯：<span class="highlight">+3点</span></li>
<li>育休明けの復職：<span class="highlight">+2点</span></li>
<li>きょうだい同時申込：<span class="highlight">+2点</span></li>
<li>同居親族あり：<span class="highlight">-3点</span></li>
<li>転園希望：<span class="highlight">-5点</span></li>
<li>市外からの申込：<span class="highlight">-10点</span></li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>全項目は<a href="https://www.city.odawara.kanagawa.jp/field/welfare/nursesc/" target="_blank" rel="noopener">小田原市子ども青少年部保育課</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 65,
  },
  {
    slug: "score-up-tips",
    citySlug: "odawara",
    title: "小田原市で入園点数を上げるコツ　加点を最大化する方法",
    description:
      "小田原市の保育園入園選考で調整指数の加点を最大限に活用する方法を解説します。",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>基本指数40点は出発点</h2>
<p>小田原市ではフルタイム共働き世帯は基本指数<span class="highlight">40点</span>で横並びです。差がつくのは調整指数です。</p>

<h2>加点チェックリスト</h2>
<table>
<tr><th>項目</th><th>点数</th><th>条件</th></tr>
<tr><td>ひとり親</td><td>+5</td><td>ひとり親世帯であること</td></tr>
<tr><td>きょうだい在園</td><td>+3</td><td>きょうだいが在園中の施設を希望</td></tr>
<tr><td>認可外利用</td><td>+3</td><td>認可外保育施設に月ぎめで預けている</td></tr>
<tr><td>生活保護</td><td>+3</td><td>生活保護受給世帯</td></tr>
<tr><td>育休復帰</td><td>+2</td><td>育休明けで復職予定</td></tr>
<tr><td>同時申込</td><td>+2</td><td>きょうだいと同時に申し込む</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>小田原市はひとり親加点が+5点と大きいのが特徴です。認可外利用+3点、きょうだい在園+3点も重要な加点要素です。市外からの申込は-10点の大幅減点になるので注意しましょう。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 60,
  },
  {
    slug: "tiebreaker-rules",
    citySlug: "odawara",
    title: "小田原市の同点時の優先順位　点数が同じ場合どうなる？",
    description:
      "小田原市の保育園入園選考で点数が同点になった場合の優先順位のルールを解説します。",
    image: "https://images.unsplash.com/photo-1590650153855-d9e808231d41?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>同点時の優先順位</h2>
<p>小田原市では選考点数が同じ場合、以下の優先順位に基づいて入園が決まります。</p>

<h3>主な優先要素</h3>
<ul>
<li>小田原市に住民登録がある方が優先</li>
<li>保育の必要度が高い世帯</li>
<li>ひとり親世帯</li>
<li>きょうだいの在園状況</li>
<li>世帯の所得が低い方</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>小田原市は人口約19万人の中核都市です。小田原駅周辺の人気園では同点勝負になることがあります。希望順位の書き方も重要になるため、第5希望くらいまでしっかり記入しましょう。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 45,
  },
  {
    slug: "part-time-work-score",
    citySlug: "odawara",
    title: "小田原市のパート・時短勤務の点数　何時間で何点？",
    description:
      "小田原市の保育園入園で、パートや時短勤務の場合にもらえる基本指数を解説します。",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>パート・時短勤務の基本指数</h2>
<p>小田原市では月あたりの就労時間で基本指数が決まります。フルタイムでなくても点数が付きます。</p>

<table>
<tr><th>月の就労時間</th><th>点数</th><th>勤務パターン例</th></tr>
<tr><td>月160時間以上</td><td>20</td><td>週5日・1日8時間</td></tr>
<tr><td>月140〜160時間</td><td>18</td><td>週5日・1日7時間程度</td></tr>
<tr><td>月120〜140時間</td><td>16</td><td>週5日・1日6時間程度</td></tr>
<tr><td>月100〜120時間</td><td>14</td><td>週5日・1日5時間程度</td></tr>
<tr><td>月80〜100時間</td><td>12</td><td>週4日・1日5時間程度</td></tr>
<tr><td>月64〜80時間</td><td>10</td><td>週4日・1日4時間程度</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>入園要件は月64時間以上の就労です。週3日・1日6時間程度で月72時間なら10点で申込み可能です。パートでも時間数を増やせば点数が上がります。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 50,
  },
  {
    slug: "rejection-options",
    citySlug: "odawara",
    title: "小田原市で不承諾になったら　次にやるべきこと",
    description:
      "小田原市の保育園入園で不承諾通知が届いた場合の対処法をまとめました。",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop",
    category: "不承諾対策",
    categoryColor: "rose",
    content: `<h2>不承諾通知が届いたら</h2>
<p>小田原市では4月一次選考の結果は2月上旬ごろに届きます。不承諾の場合の選択肢を整理します。</p>

<h3>選択肢</h3>
<ul>
<li>二次募集に申し込む</li>
<li>5月以降の途中入園を申し込む</li>
<li>認可外保育施設を利用しながら翌年度に再申込する（認可外加点+3点が得られる）</li>
<li>小規模保育事業を検討する</li>
</ul>

<h2>認可外利用で翌年度の加点を狙う</h2>
<p>小田原市では認可外保育施設に預けていると調整指数が+3点加算されます。不承諾の場合は認可外を利用しながら翌年度に再挑戦するのも有効な戦略です。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>二次募集や途中入園の空き状況は<a href="https://www.city.odawara.kanagawa.jp/field/welfare/nursesc/" target="_blank" rel="noopener">小田原市子ども青少年部保育課</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 40,
  },
  {
    slug: "unlicensed-nursery-bonus",
    citySlug: "odawara",
    title: "小田原市で認可外保育施設の加点を取る方法",
    description:
      "小田原市で認可外保育施設の利用による加点を得る方法と条件を解説します。",
    image: "https://images.unsplash.com/photo-1587654780291-39c9404d7dd0?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>認可外保育施設の加点とは</h2>
<p>小田原市では認可外保育施設に預けている場合、調整指数が<span class="highlight">+3点</span>加算されます。フルタイム共働き同士の差がつきにくい中で、この3点は大きな差になります。</p>

<h2>対象となる条件</h2>
<ul>
<li>認可外保育施設に月ぎめ契約で預けていること</li>
<li>申込時点で利用実績があること</li>
<li>一時保育のみの利用は対象外</li>
</ul>

<h2>小田原市の認可外保育施設</h2>
<p>小田原市内には複数の認可外保育施設があります。施設の一覧は保育課や神奈川県のホームページで確認できます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>認可外加点を狙う場合は、入園申込前から認可外施設に預ける必要があります。早めの情報収集と申込が重要です。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 55,
  },
  {
    slug: "next-year-changes",
    citySlug: "odawara",
    title: "小田原市の保育園事情　最新動向と今後の見通し",
    description:
      "小田原市の保育園整備計画や待機児童の動向など、最新の保育園事情をまとめました。",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=400&fit=crop",
    category: "最新情報",
    categoryColor: "purple",
    content: `<h2>小田原市の保育園事情</h2>
<p>小田原市は人口約19万人、小田原城で有名な歴史ある都市です。東海道新幹線の停車駅があり、東京方面への通勤者も多く住んでいます。</p>

<h2>最近の傾向</h2>
<ul>
<li>小田原駅周辺の再開発に伴う保育需要の変化</li>
<li>小規模保育事業の整備が進んでいる</li>
<li>認可保育園は市内に約25か所</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>小田原駅周辺は特に人気が集中するエリアです。鴨宮や国府津方面の園も選択肢に入れると可能性が広がります。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新の情報は<a href="https://www.city.odawara.kanagawa.jp/field/welfare/nursesc/" target="_blank" rel="noopener">小田原市子ども青少年部保育課</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 35,
  },
  {
    slug: "popular-areas",
    citySlug: "odawara",
    title: "小田原市の地域別・保育園の入りやすさ",
    description:
      "小田原市内の地域別に保育園の入りやすさを比較し、保活の参考情報をまとめました。",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=400&fit=crop",
    category: "地域情報",
    categoryColor: "teal",
    content: `<h2>小田原市の地域特性</h2>
<p>小田原市は東西に広がる地形で、地域によって保育園の競争率が異なります。</p>

<h3>競争が激しいエリア</h3>
<ul>
<li>小田原駅周辺：交通の便がよく共働き世帯に人気。新幹線通勤者も多い</li>
<li>鴨宮駅周辺：商業施設が充実しファミリー層が増加</li>
</ul>

<h3>比較的入りやすいエリア</h3>
<ul>
<li>国府津・下曽我エリア：園の数は少ないが競争率も低め</li>
<li>富水・螢田エリア：小田急沿線で生活圏としては便利</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>小田原市は車社会の側面もあるため、駅から離れた園も送迎の負担が少ない場合があります。通勤経路に合わせた園選びが有効です。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 50,
  },
  {
    slug: "competition-reality",
    citySlug: "odawara",
    title: "小田原市で保育園に入れる点数の目安　何点あれば安心？",
    description:
      "小田原市の保育園入園に必要な点数の目安を解説します。",
    image: "https://images.unsplash.com/photo-1460518451285-97b6aa326961?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>内定に必要な点数の目安</h2>
<p>小田原市の認可保育園に入るために必要な点数の目安を、エリアやクラスごとに整理しました。</p>

<h3>人気エリアの目安（1歳児クラス）</h3>
<table>
<tr><th>エリア</th><th>目安の点数</th></tr>
<tr><td>小田原駅周辺</td><td>43〜45点</td></tr>
<tr><td>鴨宮駅周辺</td><td>42〜44点</td></tr>
<tr><td>国府津・下曽我</td><td>40〜42点</td></tr>
</table>

<p>人気園ではフルタイム共働き（40点）だけでは足りない場合があります。認可外利用の+3点やきょうだい在園の+3点が決め手になることがあります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>上記は過去の傾向をもとにした参考値です。0歳児クラスや3歳児クラスは比較的入りやすい傾向があります。最新の状況は小田原市の保育課に直接お問い合わせください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 60,
  },
];

registerArticles(articles);
