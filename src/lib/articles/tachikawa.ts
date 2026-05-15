import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  {
    slug: "hokatsu-schedule",
    citySlug: "tachikawa",
    title: "立川市の保活スケジュール　申込から内定までの流れ",
    description:
      "立川市の認可保育園の申込時期・選考の流れをまとめました。令和8年度4月入園の動き方を解説します。",
    image: "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>立川市の4月入園スケジュール</h2>
<p>立川市の認可保育園は毎年秋に翌年度4月入園の一次申込を受付けます。実施基準指数表を理解して準備を進めましょう。</p>

<h3>保活の全体スケジュール</h3>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>4月〜6月：情報収集</strong>
<p>立川市のホームページで保育園の一覧や前年度のボーダー（最低指数一覧）を確認します。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>7月〜9月：保育園見学</strong>
<p>立川市内の保育園を見学して、通勤経路との相性を確認しましょう。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>9月〜10月：書類準備</strong>
<p>就労証明書の月あたり就労時間は正確に記載してもらいましょう。指数に直結します。</p>
</div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content">
<strong>11月：申込書類の提出</strong>
<p>4月一次の申込期限は例年11月中旬です。期限厳守で提出しましょう。</p>
</div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>立川市の基準指数は父母各最大20点（合計40点満点）です。月の就労時間で判定される制度です。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳しくは<a href="https://www.city.tachikawa.lg.jp/kosodate/m-kosodate/1004946/1005097/1025412.html" target="_blank" rel="noopener">立川市公式サイト 保育施設の申し込み</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 55,
  },
  {
    slug: "scoring-system-guide",
    citySlug: "tachikawa",
    title: "立川市の入園点数のしくみ　基準指数と調整指数を解説",
    description:
      "立川市の保育園入園選考で使われる実施基準指数と調整指数のしくみをわかりやすく解説します。",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>立川市の選考指数とは</h2>
<p>立川市の認可保育園は「実施基準指数（父＋母）＋ 調整指数」の合計で選考されます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>利用調整指数 ＝ 基準指数（父＋母）＋ 調整指数</p>
</div>

<h2>基準指数（父母各最大20点、合計40点）</h2>
<p>就労の場合、月160時間以上の就労で満点の<span class="highlight">20点</span>です。</p>

<table>
<tr><th>月の就労時間</th><th>指数</th></tr>
<tr><td>月160時間以上</td><td>20</td></tr>
<tr><td>月140時間以上160時間未満</td><td>18</td></tr>
<tr><td>月120時間以上140時間未満</td><td>16</td></tr>
<tr><td>月100時間以上120時間未満</td><td>14</td></tr>
<tr><td>月80時間以上100時間未満</td><td>12</td></tr>
<tr><td>月64時間以上80時間未満</td><td>10</td></tr>
<tr><td>月48時間以上64時間未満</td><td>8</td></tr>
</table>

<h2>調整指数の代表例</h2>
<ul>
<li>地域型保育施設卒園に伴う転所：<span class="highlight">+3点</span></li>
<li>ひとり親世帯：<span class="highlight">+2点</span></li>
<li>認証保育所等に月ぎめ利用中：<span class="highlight">+2点</span></li>
<li>生活保護世帯：<span class="highlight">+2点</span></li>
<li>きょうだいが在園中：<span class="highlight">+1点</span></li>
<li>育休復帰予定：<span class="highlight">+1点</span></li>
<li>多子世帯（3人以上）：<span class="highlight">+1点</span></li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>全項目は<a href="https://www.city.tachikawa.lg.jp/kosodate/m-kosodate/1004946/1005097/1025412.html" target="_blank" rel="noopener">立川市公式サイト</a>の「申込みのしおり」で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 60,
  },
  {
    slug: "score-up-tips",
    citySlug: "tachikawa",
    title: "立川市で入園点数を上げるコツ　加点チェックリスト",
    description:
      "立川市の保育園入園選考で調整指数の加点を最大限に活用する方法を解説します。",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>基準指数40点は出発点</h2>
<p>立川市ではフルタイム共働き世帯は基準指数<span class="highlight">40点</span>で横並びです。差がつくのは調整指数の加点です。</p>

<h2>加点チェックリスト</h2>
<table>
<tr><th>項目</th><th>点数</th><th>条件</th></tr>
<tr><td>地域型保育施設卒園</td><td>+3点</td><td>小規模保育等の卒園に伴う転所</td></tr>
<tr><td>ひとり親世帯</td><td>+2点</td><td>母子・父子家庭の場合</td></tr>
<tr><td>認証保育所等利用</td><td>+2点</td><td>認証保育所・認可外に月ぎめで利用中</td></tr>
<tr><td>生活保護</td><td>+2点</td><td>生活保護を受けている場合</td></tr>
<tr><td>きょうだい在園</td><td>+1点</td><td>認可保育園にきょうだいが在園中</td></tr>
<tr><td>育休復帰予定</td><td>+1点</td><td>入園月に職場復帰する場合</td></tr>
<tr><td>多子世帯</td><td>+1点</td><td>きょうだいが3人以上</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>立川市は入所決定者の最低指数一覧を公開しています。園ごとのボーダーを確認して、自分の点数で入園できそうな園を探しましょう。</p>
</div>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>就労証明書の月あたり就労時間は正確に記載してください。実態と異なる記載は入園取消しの対象です。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 55,
  },
  {
    slug: "tiebreaker-rules",
    citySlug: "tachikawa",
    title: "立川市で同点になったらどうなる？優先順位を解説",
    description:
      "立川市の保育園入園選考で同点だった場合の優先順位の判定方法を解説します。",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>同点時の判定方法</h2>
<p>立川市の入園選考で利用調整指数が同点になった場合、さらに優先順位で判定されます。</p>

<h2>同点時に考慮される要素</h2>
<ul>
<li>虐待・DV等、児童福祉の観点から配慮が必要な世帯</li>
<li>両親不存在の世帯</li>
<li>ひとり親世帯</li>
<li>きょうだいが同じ園に在園中</li>
<li>認証保育所等に在所中</li>
<li>きょうだいが別々の保育施設を利用中（転所希望）</li>
<li>多子世帯（3人以上のきょうだい）</li>
<li>保護者の一方が遠隔地に単身赴任中</li>
<li>所得が低い世帯</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>立川市の40点制では、フルタイム共働きで40点が基本ラインです。調整指数の1点が当落を分けることがあります。</p>
</div>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>優先順位は年度によって変更される場合があります。最新の「申込みのしおり」で必ず確認しましょう。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 45,
  },
  {
    slug: "part-time-work-score",
    citySlug: "tachikawa",
    title: "立川市で時短勤務だと点数はどう変わる？",
    description:
      "立川市の保育園入園選考で時短勤務の場合の基準指数への影響を解説します。",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>立川市は月の就労時間で判定</h2>
<p>立川市の基準指数は月の就労時間で決まります。時短勤務の影響を確認しましょう。</p>

<table>
<tr><th>月の就労時間</th><th>基準指数</th></tr>
<tr><td>月160時間以上</td><td>20点</td></tr>
<tr><td>月140時間以上160時間未満</td><td>18点</td></tr>
<tr><td>月120時間以上140時間未満</td><td>16点</td></tr>
<tr><td>月100時間以上120時間未満</td><td>14点</td></tr>
<tr><td>月80時間以上100時間未満</td><td>12点</td></tr>
<tr><td>月64時間以上80時間未満</td><td>10点</td></tr>
<tr><td>月48時間以上64時間未満</td><td>8点</td></tr>
</table>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>1日6時間×週5日＝月約120時間の時短勤務の場合、基準指数は<span class="highlight">16点</span>です。フルタイムの20点と比べて4点下がります。</p>
</div>

<h2>月160時間の壁</h2>
<p>満点の20点を得るには月160時間以上が必要です。1日8時間×月20日＝160時間がちょうど満点ラインです。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>復職後のフルタイム勤務条件を就労証明書に記載してもらえるか、勤務先に確認しましょう。育休中でも復職後の勤務条件で指数が判定されます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 50,
  },
  {
    slug: "rejection-options",
    citySlug: "tachikawa",
    title: "立川市で保育園に落ちたときの選択肢",
    description:
      "立川市の認可保育園に不承諾となった場合の対応策をまとめました。",
    image: "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>不承諾になったら</h2>
<p>立川市で認可保育園に不承諾になった場合でも、複数の選択肢があります。</p>

<h3>1. 二次選考への申込</h3>
<p>一次選考後に空きが出た園について、二次選考が行われます。一次で不承諾の場合は自動的に二次選考の対象になります。</p>

<h3>2. 認証保育所の利用</h3>
<p>立川市内の認証保育所を利用することで、翌年度の申込で<span class="highlight">+2点</span>の加点が見込めます。</p>

<h3>3. 地域型保育施設の利用</h3>
<p>小規模保育事業を利用し、卒園時に認可保育園へ転所する方法があります。卒園に伴う転所で<span class="highlight">+3点</span>の加点が得られます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>立川駅周辺は競争率が高いですが、駅から少し離れた園には空きがある場合もあります。送迎範囲を広げることも検討しましょう。</p>
</div>

<h3>4. 途中入園</h3>
<p>年度途中に空きが出た場合、毎月の利用調整で入園が可能です。</p>

<h3>5. 育休延長</h3>
<p>不承諾通知があれば育児休業を最長2歳まで延長できます。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新情報は<a href="https://www.city.tachikawa.lg.jp/kosodate/m-kosodate/1004946/1005097/1025412.html" target="_blank" rel="noopener">立川市公式サイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 45,
  },
  {
    slug: "unlicensed-nursery-bonus",
    citySlug: "tachikawa",
    title: "立川市で認証保育所の利用で加点を得る方法",
    description:
      "立川市では認証保育所等の月ぎめ利用で+2点の加点が得られます。その条件を解説します。",
    image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>認証保育所等の利用による加点</h2>
<p>立川市では認証保育所等に月ぎめで預けている場合、調整指数で<span class="highlight">+2点</span>の加点が得られます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>月ぎめの契約が条件です。40点制の立川市では調整指数の2点は大きなアドバンテージです。</p>
</div>

<h2>対象となる施設</h2>
<ul>
<li>認証保育所（東京都の認証制度）</li>
<li>認可外保育施設</li>
<li>企業主導型保育施設</li>
</ul>

<h2>地域型保育施設卒園なら+3点</h2>
<p>地域型保育施設（小規模保育等）の卒園に伴う転所の場合は<span class="highlight">+3点</span>の加点があります。認証保育所利用（+2点）よりも大きな加点です。0〜2歳まで地域型保育施設に入園し、3歳で認可保育園に転所する作戦も有効です。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>保育受託証明書が必要です。利用している施設に発行を依頼してください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 40,
  },
  {
    slug: "popular-areas",
    citySlug: "tachikawa",
    title: "立川市の人気エリアと入りやすい地域の傾向",
    description:
      "立川市内で保育園の競争率が高いエリアと比較的入りやすい地域を解説します。",
    image: "https://images.unsplash.com/photo-1524813686514-a57563d77965?w=800&h=400&fit=crop",
    category: "エリア情報",
    categoryColor: "teal",
    content: `<h2>立川市の保育園事情</h2>
<p>立川市は東京都多摩地区の中核都市です。立川駅周辺の再開発で子育て世帯が増加しており、エリアによって保育園の競争率に差があります。</p>

<h2>競争率が高い傾向のエリア</h2>
<ul>
<li>立川駅周辺：市の中心地で子育て世帯に人気。特に南口エリアは激戦</li>
<li>西国立・柴崎エリア：JR南武線沿線の住宅密集地</li>
<li>高松町・錦町エリア：モノレール沿線で利便性が高い</li>
</ul>

<h2>比較的入りやすい傾向のエリア</h2>
<ul>
<li>砂川エリア：市の北部。新設園もあり受入枠に余裕がある場合も</li>
<li>幸町・栄町エリア：駅から離れた住宅地</li>
<li>西砂エリア：市の北西部で保育需要が比較的低め</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>立川市の入所決定者最低指数一覧を確認すれば、園ごとのボーダーがわかります。希望園選びの参考にしましょう。</p>
</div>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>エリアの難易度は年度や年齢クラスによって変わります。最低指数一覧を確認して最新の傾向を把握しましょう。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 35,
  },
  {
    slug: "next-year-changes",
    citySlug: "tachikawa",
    title: "立川市の令和8年度入園　変更点と注意事項",
    description:
      "立川市の令和8年度保育園入園選考の注意点をまとめました。",
    image: "https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=800&h=400&fit=crop",
    category: "最新情報",
    categoryColor: "purple",
    content: `<h2>令和8年度の注意点</h2>
<p>立川市の保育園入園制度は毎年見直しが行われます。最新の「申込みのしおり」で実施基準指数表を確認しましょう。</p>

<h2>確認すべきポイント</h2>
<ul>
<li>基準指数・調整指数の変更有無</li>
<li>新設園の情報</li>
<li>定員の増減</li>
<li>入所決定者最低指数一覧（前年度分）</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>立川市は入所決定者の最低指数一覧を毎年公開しています。前年度のボーダーを確認して、園選びの参考にしましょう。</p>
</div>

<h2>育児休業延長許容等同意書</h2>
<p>立川市では「育児休業延長許容等同意書」の提出も可能です。育休延長を希望する場合の仕組みが整備されています。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新情報は<a href="https://www.city.tachikawa.lg.jp/kosodate/m-kosodate/1004946/1005097/1025412.html" target="_blank" rel="noopener">立川市公式サイト 保育施設の申し込み</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 40,
  },
  {
    slug: "competition-reality",
    citySlug: "tachikawa",
    title: "立川市の保育園入園競争の実態",
    description:
      "立川市の保育園入園はどのくらい厳しいのか。40点制の選考の実態を解説します。",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>立川市の入園競争の現状</h2>
<p>立川市は多摩地区の中核都市として子育て世帯が多く、立川駅周辺の人気園では競争があります。</p>

<h2>ボリュームゾーン</h2>
<p>フルタイム共働き世帯は基準指数<span class="highlight">40点</span>で横並びです。調整指数の加点で差がつきます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>立川市は入所決定者の最低指数一覧を公開しています。園ごとの内定ラインを確認すれば、自分の点数で入園できそうな園が見えてきます。</p>
</div>

<h2>年齢別の傾向</h2>
<ul>
<li>0歳児クラス：受入枠が限られるため園によっては競争が激しい</li>
<li>1歳児クラス：最も競争が激しい年齢</li>
<li>2歳児クラス：空きが少ない園もある</li>
<li>3歳児以上：枠が増えるため比較的入りやすい</li>
</ul>

<h2>ボーダーの目安</h2>
<p>立川市の令和5年度のデータでは、利用決定者最低指数は<span class="highlight">36〜42点</span>の範囲です。人気園では40点以上が必要な場合もあります。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>求職活動中の基準指数は6点で、就労中（最大20点）の3分の1以下です。求職中での入園は人気園では困難です。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 30,
  },
  {
    slug: "hoikuryo-keisan",
    citySlug: "tachikawa",
    title: "立川市の保育料計算【令和8年度版】年収別シミュレーション・早見表",
    description:
      "立川市の認可保育園の保育料を年収・子ども数別に詳しく解説。市民税所得割額に基づく階層区分早見表、無償化（3歳〜）の対象確認、副食費・第2子以降の減免制度まで。令和8年度対応。",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "お金・制度",
    categoryColor: "amber",
    content: `<h2>立川市の保育料はどうやって決まる？</h2>
<p>立川市の認可保育園の保育料（利用者負担額）は、<strong>世帯の市民税所得割額</strong>によって決まります。東京都の基準に基づき階層区分が設定されており、所得が高いほど保育料も高くなる応能負担方式です。</p>

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
<tr><th>市民税所得割額（世帯合計）</th><th>保育料目安（月額・0歳）</th></tr>
<tr><td>非課税世帯</td><td>無料</td></tr>
<tr><td>〜約5万円</td><td>6,000〜9,000円</td></tr>
<tr><td>〜約10万円</td><td>12,000〜19,000円</td></tr>
<tr><td>〜約20万円</td><td>25,000〜38,000円</td></tr>
<tr><td>〜約30万円</td><td>42,000〜52,000円</td></tr>
<tr><td>30万円超</td><td>58,000〜77,000円</td></tr>
</table>
<p class="text-xs text-muted-foreground">※上記は目安です。詳細は立川市の公式保育料表をご確認ください。</p>

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
<p>毎年6月ごろ、前年度の市民税額が確定した後に保育料が決定・通知されます。入園前に目安を知りたい場合は立川市担当課にお問い合わせください。</p>
<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新の保育料表は立川市公式サイトからご確認ください。</p>
</div>`,
    publishedAt: "2026-05-13",
    popularity: 42,
  },
  {
    slug: "shokuhi-jippi",
    citySlug: "tachikawa",
    title: "立川市の保育園の給食費（副食費）はいくら？【令和8年度版】免除条件と金額",
    description:
      "立川市の保育園の給食費（副食費）は月いくら？所得・子ども数による副食費免除の条件と申請方法、保育料無償化の範囲と実費負担の全額をわかりやすく解説。令和8年度対応。",
    image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&h=400&fit=crop",
    category: "お金・制度",
    categoryColor: "amber",
    content: `<h2>立川市の副食費とは？</h2>
<p>2019年10月の幼児教育・保育無償化により、<strong>3歳以上の保育料は無料</strong>になりました。ただし、給食の<strong>副食費（おかず代）は実費負担</strong>が残ります。立川市では副食費として月額4,500円程度が別途かかります。</p>

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
<p class="text-xs text-muted-foreground">※金額は目安です。詳細は立川市公式サイトでご確認ください。</p>

<h2>副食費が免除される条件</h2>
<table>
<tr><th>免除条件</th><th>内容</th></tr>
<tr><td>年収360万円未満相当の世帯</td><td>市民税所得割額が一定以下の世帯は副食費が免除</td></tr>
<tr><td>第3子以降の子ども</td><td>小学3年生以下のきょうだいが2人以上いる場合、3人目以降は免除</td></tr>
<tr><td>生活保護世帯</td><td>副食費の負担なし</td></tr>
</table>

<h2>保育料無償化の対象範囲</h2>
<ul>
<li>無償化対象：<strong>保育料（基本利用料）</strong>のみ — 3歳〜5歳</li>
<li>実費負担が残るもの：副食費（おかず代）・主食費（ご飯代）・行事費・通園バス代など</li>
</ul>

<h2>副食費の支払い方法</h2>
<p>副食費は園から直接請求されます。毎月口座引き落としまたは現金納付が一般的です。免除に該当する場合は入園時や毎年6月ごろに申請手続きが必要です。立川市担当課に確認してください。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新の副食費・実費負担の詳細は立川市公式サイトからご確認ください。</p>
</div>`,
    publishedAt: "2026-05-13",
    popularity: 40,
  },
];

registerArticles(articles);
