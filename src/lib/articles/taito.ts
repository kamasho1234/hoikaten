import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  {
    slug: "hokatsu-schedule",
    citySlug: "taito",
    title: "台東区の保活スケジュール　申込から内定までの流れ",
    description:
      "台東区の認可保育園の申込時期・選考の流れをわかりやすくまとめました。令和8年度4月入園に向けた動き方を解説します。",
    image: "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>台東区の4月入園スケジュール</h2>
<p>台東区の認可保育園は毎年秋に翌年度4月入園の申込を受付けます。「保育利用のご案内」を入手して制度を理解するところから始めましょう。</p>

<h3>保活の全体スケジュール</h3>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>4月〜6月：情報収集</strong>
<p>区のホームページで保育園の一覧や前年度の案内を確認します。</p>
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
<strong>9月〜10月：案内を入手・書類準備</strong>
<p>「保育利用のご案内」を入手し、就労証明書などを準備します。</p>
</div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content">
<strong>10月〜11月：申込書類の提出</strong>
<p>締切に余裕をもって提出しましょう。</p>
</div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>台東区は基本指数が父母各最大20点（合計40点満点）の制度です。勤務時間の細かい区分があるので、就労証明書の記載内容をよく確認しましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳しくは<a href="https://www.city.taito.lg.jp/kosodatekyouiku/kosodate/mokutei/hoiku_youjikyouiku/hoikutakuji/hoikuen/hoikuennogoannai/nyushokijyun.html" target="_blank" rel="noopener">台東区公式サイト</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 55,
  },
  {
    slug: "scoring-system-guide",
    citySlug: "taito",
    title: "台東区の入園点数のしくみ　基本指数と調整指数を解説",
    description:
      "台東区の保育園入園選考で使われる点数制度のしくみを解説します。父母各20点満点の基本指数と調整指数の全体像をまとめました。",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>台東区の選考指数とは</h2>
<p>台東区の認可保育園は「基本指数＋調整指数」の合計で選考されます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>選考指数 ＝ 基本指数（父＋母）＋ 調整指数</p>
</div>

<h2>基本指数（父母各最大20点、合計40点）</h2>
<p>台東区の基本指数は父母それぞれ最大<span class="highlight">20点</span>です。就労の場合、月20日以上かつ1日8時間以上で満点の20点になります。</p>

<table>
<tr><th>就労の状況</th><th>指数</th></tr>
<tr><td>月20日以上・1日8時間以上</td><td>20</td></tr>
<tr><td>月20日以上・1日7時間以上8時間未満</td><td>19</td></tr>
<tr><td>月20日以上・1日6時間以上7時間未満</td><td>18</td></tr>
<tr><td>月20日以上・1日5時間以上6時間未満</td><td>17</td></tr>
<tr><td>月16日以上・1日8時間以上</td><td>18</td></tr>
<tr><td>月16日以上・1日6時間以上8時間未満</td><td>16</td></tr>
<tr><td>月48時間以上（上記以外）</td><td>10</td></tr>
</table>

<h2>調整指数の代表例</h2>
<ul>
<li>ひとり親世帯：<span class="highlight">+20点</span></li>
<li>認可外保育施設に月ぎめで預けている：<span class="highlight">+8点</span></li>
<li>育休復帰予定：<span class="highlight">+7点</span></li>
<li>きょうだい在園（希望園に在園中）：<span class="highlight">+4点</span></li>
<li>生活保護世帯：<span class="highlight">+3点</span></li>
<li>単身赴任：<span class="highlight">+2点</span></li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>全項目は<a href="https://www.city.taito.lg.jp/kosodatekyouiku/kosodate/mokutei/hoiku_youjikyouiku/hoikutakuji/hoikuen/hoikuennogoannai/nyushokijyun.html" target="_blank" rel="noopener">台東区公式サイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 65,
  },
  {
    slug: "score-up-tips",
    citySlug: "taito",
    title: "台東区で入園点数を上げるコツ　加点チェックリスト",
    description:
      "台東区の保育園入園選考で調整指数の加点を最大限に活用する方法をチェックリスト形式で解説します。",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>フルタイム40点は大前提</h2>
<p>台東区ではフルタイム共働き世帯は基本指数<span class="highlight">40点</span>で横並びになります。差がつくのは調整指数です。</p>

<h2>加点チェックリスト</h2>
<table>
<tr><th>項目</th><th>点数</th><th>条件</th></tr>
<tr><td>ひとり親世帯</td><td>+20点</td><td>母子・父子家庭の場合</td></tr>
<tr><td>認可外施設の利用</td><td>+8点</td><td>週3日・昼間4時間以上、有償で預けている</td></tr>
<tr><td>育休復帰予定</td><td>+7点</td><td>入園月中に職場復帰する場合</td></tr>
<tr><td>きょうだい在園</td><td>+4点</td><td>希望する園にきょうだいが在園中</td></tr>
<tr><td>生活保護</td><td>+3点</td><td>生活保護を受けている場合</td></tr>
<tr><td>単身赴任</td><td>+2点</td><td>保護者の一方が単身赴任中</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>台東区では認可外保育施設の利用で<span class="highlight">+8点</span>、育休復帰で<span class="highlight">+7点</span>と大きな加点があります。この2つが該当する場合は合計15点の加算になり、非常に有利です。</p>
</div>

<h2>就労時間の最適化</h2>
<p>台東区は1時間刻みで基本指数が変わるため、勤務時間の記載内容が重要です。例えば1日7時間勤務の方が8時間に増やせれば、基本指数は19点から20点に上がります。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>就労証明書の内容は実態と一致させてください。虚偽の記載は入園取消しの対象になります。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 100,
  },
  {
    slug: "tiebreaker-rules",
    citySlug: "taito",
    title: "台東区で同点になったらどうなる？優先順位を解説",
    description:
      "台東区の保育園入園選考で同点だった場合の優先順位の決まり方を解説します。",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>同点時の判定方法</h2>
<p>台東区の入園選考で合計指数が同点になった場合、さらに細かい優先順位で判定が行われます。</p>

<h2>同点時に考慮される要素</h2>
<ul>
<li>ひとり親世帯は優先</li>
<li>世帯の課税額が低い方が優先</li>
<li>きょうだいが在園している園への申込は優先</li>
<li>保育の必要性がより高い世帯を優先</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>台東区のひとり親加点は<span class="highlight">+20点</span>と非常に大きく、該当する場合は大幅に有利になります。同点時の優先順位でもひとり親は考慮されます。</p>
</div>

<h2>同点回避の戦略</h2>
<p>フルタイム共働きで基本指数40点の世帯が大半です。その上で認可外利用（+8点）や育休復帰（+7点）の加点を積めるかが分かれ目です。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>同点時の詳細な判定基準は公開されていない部分もあります。確実に差をつけるには、1点でも多く調整指数を積むことが重要です。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 85,
  },
  {
    slug: "part-time-work-score",
    citySlug: "taito",
    title: "台東区で時短勤務だと点数はどうなる？",
    description:
      "台東区の保育園入園選考で時短勤務の場合の基本指数への影響を詳しく解説します。",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>時短勤務と基本指数の関係</h2>
<p>台東区の基本指数は1時間刻みで変わります。時短勤務で1日の勤務時間が短くなると基本指数が下がります。</p>

<table>
<tr><th>勤務パターン（月20日以上）</th><th>基本指数</th></tr>
<tr><td>1日8時間以上</td><td>20点</td></tr>
<tr><td>1日7時間以上8時間未満</td><td>19点</td></tr>
<tr><td>1日6時間以上7時間未満</td><td>18点</td></tr>
<tr><td>1日5時間以上6時間未満</td><td>17点</td></tr>
<tr><td>1日4時間以上5時間未満</td><td>16点</td></tr>
</table>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>育休復帰後に6時間の時短勤務を予定している場合、基本指数は20点ではなく<span class="highlight">18点</span>になります。夫婦で2点下がるため、合計4点の差が生まれる可能性があります。</p>
</div>

<h2>対策</h2>
<p>台東区では1時間の違いが1点の差になるため、時短の時間設定は慎重に検討しましょう。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>フルタイムで復帰して入園を確保し、その後に時短に切り替える方法もあります。ただし就労証明書の記載は実態に基づく必要があります。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 90,
  },
  {
    slug: "rejection-options",
    citySlug: "taito",
    title: "台東区で保育園に落ちたときの選択肢",
    description:
      "台東区の認可保育園に不承諾となった場合の対応策と代替手段をまとめました。",
    image: "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>不承諾になったら</h2>
<p>一次選考で不承諾だった場合でも、複数の選択肢があります。落ち着いて次の手を考えましょう。</p>

<h3>1. 二次選考に申し込む</h3>
<p>一次で辞退が出た枠や新設園の枠が対象です。一次で不承諾の場合は自動的に二次選考の対象になることが多いですが、区に確認しましょう。</p>

<h3>2. 認可外保育施設を利用する</h3>
<p>認証保育所や企業主導型保育施設を探しましょう。台東区では認可外利用で<span class="highlight">+8点</span>の加点が得られるため、翌年度の再挑戦で大幅に有利になります。</p>

<h3>3. 途中入園を狙う</h3>
<p>転居や退園で空きが出ることがあります。毎月の空き情報をチェックしましょう。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>台東区の認可外利用加点（+8点）と育休復帰加点（+7点）は大きな加点です。翌年度に再申込する際にこれらを積めば、大幅な点数アップが期待できます。</p>
</div>

<h3>4. 育休を延長する</h3>
<p>不承諾通知があれば育休を最長2歳まで延長でき、育児休業給付金の受給も継続されます。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>空き状況は<a href="https://www.city.taito.lg.jp/kosodatekyouiku/kosodate/mokutei/hoiku_youjikyouiku/hoikutakuji/hoikuen/hoikuennogoannai/nyushokijyun.html" target="_blank" rel="noopener">台東区公式サイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 80,
  },
  {
    slug: "unlicensed-nursery-bonus",
    citySlug: "taito",
    title: "台東区で認可外保育施設の利用による加点を得る方法",
    description:
      "台東区では認可外保育施設に月ぎめで預けると調整指数で+8点の加点が得られます。その条件と活用法を解説します。",
    image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>認可外利用で+8点の加点</h2>
<p>台東区では、認可外保育施設（認証保育所等）に<span class="highlight">週3日・昼間4時間以上</span>、有償で月ぎめ契約で預けている場合、調整指数で<span class="highlight">+8点</span>の加点が得られます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>+8点は台東区の調整指数の中でもひとり親（+20点）に次いで大きな加点です。活用できる場合は大きなアドバンテージになります。</p>
</div>

<h2>加点の条件</h2>
<ul>
<li>認証保育所などの認可外保育施設に預けていること</li>
<li>週3日以上、昼間4時間以上の利用であること</li>
<li>有償で月ぎめ契約を結んでいること</li>
</ul>

<h2>具体的な活用の流れ</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>認可外保育施設を探す</strong>
<p>台東区内または通勤圏内の認証保育所や企業主導型保育施設を探します。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>月ぎめ契約で預ける</strong>
<p>週3日・昼間4時間以上の条件を満たすプランで契約します。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>認可保育園に申し込む</strong>
<p>認可外の利用証明書を添えて申込みます。</p>
</div>
</div>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>認可外保育施設の空き状況は時期によって変わります。保活シーズンは認可外も埋まりやすいので早めに動きましょう。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 75,
  },
  {
    slug: "next-year-changes",
    citySlug: "taito",
    title: "台東区の令和8年度入園　変更点と注意事項",
    description:
      "台東区の令和8年度（2026年度）保育園入園選考の変更点や注意事項をまとめました。",
    image: "https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=800&h=400&fit=crop",
    category: "最新情報",
    categoryColor: "purple",
    content: `<h2>令和8年度の注意点</h2>
<p>台東区の保育園入園制度は毎年微調整が行われます。令和8年度（2026年度）に向けて、最新の「保育利用のご案内」を必ず確認しましょう。</p>

<h2>確認すべきポイント</h2>
<ul>
<li>基本指数の算定方法に変更がないか</li>
<li>調整指数の項目や配点に変更がないか</li>
<li>新設園の情報</li>
<li>廃止・統合される園がないか</li>
<li>申込方法の変更（電子申請の導入状況など）</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>台東区はひとり親加点が+20点と大きく、認可外利用が+8点、育休復帰が+7点です。この配点に変更がないか、毎年の案内で確認してください。</p>
</div>

<h2>最新情報の入手方法</h2>
<p>「保育利用のご案内」は例年9〜10月頃に発行されます。区役所の窓口や区のホームページで入手できます。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新情報は<a href="https://www.city.taito.lg.jp/kosodatekyouiku/kosodate/mokutei/hoiku_youjikyouiku/hoikutakuji/hoikuen/hoikuennogoannai/nyushokijyun.html" target="_blank" rel="noopener">台東区公式サイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 70,
  },
  {
    slug: "popular-areas",
    citySlug: "taito",
    title: "台東区の人気エリアと入りやすい地域の傾向",
    description:
      "台東区内で保育園の競争率が高いエリアと比較的入りやすい地域の傾向を解説します。",
    image: "https://images.unsplash.com/photo-1524813686514-a57563d77965?w=800&h=400&fit=crop",
    category: "エリア情報",
    categoryColor: "teal",
    content: `<h2>台東区の保育園事情</h2>
<p>台東区は面積が小さい一方、マンション開発が進んだエリアでは子育て世帯が急増しています。地域によって保育園の充足状況に差があります。</p>

<h2>競争率が高い傾向のエリア</h2>
<ul>
<li>蔵前・浅草橋エリア：大規模マンション建設が相次ぎ、子育て世帯が増加</li>
<li>上野・御徒町エリア：交通利便性が高く人気</li>
</ul>

<h2>比較的入りやすい傾向のエリア</h2>
<ul>
<li>千束・竜泉エリア：園の数が充実している地域</li>
<li>入谷・根岸エリア：比較的落ち着いた住宅地</li>
</ul>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>エリアの難易度は年度や年齢クラスによって大きく変わります。前年度の実績がそのまま適用されるとは限りません。</p>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>台東区は面積が小さいため、自宅から多くの園が通園圏内に入ります。希望園を幅広く記入するのが有利です。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 60,
  },
  {
    slug: "competition-reality",
    citySlug: "taito",
    title: "台東区の保育園入園競争の実態",
    description:
      "台東区の保育園入園はどのくらい厳しいのか。選考の実態を解説します。",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>台東区の入園競争の厳しさ</h2>
<p>台東区はマンション開発に伴い子育て世帯が増加しており、保育需要は高い水準が続いています。</p>

<h2>ボリュームゾーン</h2>
<p>フルタイム共働き世帯は基本指数<span class="highlight">40点</span>で横並びです。その上に調整指数が加算されるため、実質的な勝負は調整指数の大きさで決まります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>認可外利用（+8点）と育休復帰（+7点）の加点がある世帯は、合計<span class="highlight">55点</span>前後で入園できる可能性が高くなります。加点なしの40点では厳しい状況です。</p>
</div>

<h2>年齢別の傾向</h2>
<ul>
<li>0歳児クラス：定員が少なく厳しいが、申込者も少ない場合がある</li>
<li>1歳児クラス：最も申込が集中する年齢。最激戦</li>
<li>2歳児クラス：空きが少なく厳しい</li>
<li>3歳児以上：持ち上がりが多く空き枠は少ない</li>
</ul>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>台東区は求職活動中の基本指数が8点と、就労中（最大20点）との差が大きいです。求職中での入園は現実的に困難です。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 95,
  },
  {
    slug: "hoikuryo-keisan",
    citySlug: "taito",
    title: "台東区の保育料計算【令和8年度版】年収別シミュレーション・早見表",
    description:
      "台東区の認可保育園の保育料を年収・子ども数別に詳しく解説。区民税所得割額に基づく階層区分早見表、無償化（3歳〜）の対象確認、副食費・第2子以降の減免制度まで。令和8年度対応。",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "お金・制度",
    categoryColor: "amber",
    content: `<h2>台東区の保育料はどうやって決まる？</h2>
<p>台東区の認可保育園の保育料（利用者負担額）は、<strong>世帯の区民税所得割額</strong>によって決まります。東京都の基準に基づき階層区分が設定されており、所得が高いほど保育料も高くなる応能負担方式です。</p>

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
<p class="text-xs text-muted-foreground">※上記は目安です。詳細は台東区の公式保育料表をご確認ください。</p>

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
<p>毎年6月ごろ、前年度の区民税額が確定した後に保育料が決定・通知されます。入園前に目安を知りたい場合は台東区担当課にお問い合わせください。</p>
<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新の保育料表は台東区公式サイトからご確認ください。</p>
</div>`,
    publishedAt: "2026-05-13",
    popularity: 42,
  },
  {
    slug: "shokuhi-jippi",
    citySlug: "taito",
    title: "台東区の保育園の給食費（副食費）はいくら？【令和8年度版】免除条件と金額",
    description:
      "台東区の保育園の給食費（副食費）は月いくら？所得・子ども数による副食費免除の条件と申請方法、保育料無償化の範囲と実費負担の全額をわかりやすく解説。令和8年度対応。",
    image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&h=400&fit=crop",
    category: "お金・制度",
    categoryColor: "amber",
    content: `<h2>台東区の副食費とは？</h2>
<p>2019年10月の幼児教育・保育無償化により、<strong>3歳以上の保育料は無料</strong>になりました。ただし、給食の<strong>副食費（おかず代）は実費負担</strong>が残ります。台東区では副食費として月額4,500円程度が別途かかります。</p>

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
<p class="text-xs text-muted-foreground">※金額は目安です。詳細は台東区公式サイトでご確認ください。</p>

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
<p>副食費は園から直接請求されます。毎月口座引き落としまたは現金納付が一般的です。免除に該当する場合は入園時や毎年6月ごろに申請手続きが必要です。台東区担当課に確認してください。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新の副食費・実費負担の詳細は台東区公式サイトからご確認ください。</p>
</div>`,
    publishedAt: "2026-05-13",
    popularity: 40,
  },
];

registerArticles(articles);
