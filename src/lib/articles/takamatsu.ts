import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  {
    slug: "hokatsu-schedule",
    citySlug: "takamatsu",
    title: "高松市の保活スケジュール　申込から内定までの流れ",
    description:
      "高松市の認可保育園の申込時期・選考の流れをまとめました。令和8年度4月入園の動き方を解説します。",
    image: "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>高松市の4月入園スケジュール</h2>
<p>高松市の認可保育園は毎年秋に翌年度4月入園の申込を受付けます。利用調整基準表を理解して準備を進めましょう。</p>

<h3>保活の全体スケジュール</h3>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>4月〜6月：情報収集</strong>
<p>市のホームページで保育施設等一覧と入所可能状況を確認します。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>6月〜9月：保育園見学</strong>
<p>気になる園に連絡して見学を予約しましょう。高松市内には認可保育所・認定こども園・小規模保育など多くの施設があります。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>9月〜10月：書類準備</strong>
<p>就労証明書などの必要書類を準備します。自営業の場合は就労証明書に加え実態確認書類も必要です。</p>
</div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content">
<strong>10月〜11月：申込書類の提出</strong>
<p>こども保育教育課の窓口で申込みます。</p>
</div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>高松市は基本指数が父母各最大20点で、低い方の点数が採用されます。フルタイム共働きなら基本指数は20点です。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳しくは<a href="https://www.city.takamatsu.kagawa.jp/kurashi/kosodate/youchien_hoiku/kodomoen/hoiku/h29riyou.html" target="_blank" rel="noopener">高松市公式サイト</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 55,
  },
  {
    slug: "scoring-system-guide",
    citySlug: "takamatsu",
    title: "高松市の入園点数のしくみ　利用調整基準を解説",
    description:
      "高松市の保育園入園選考で使われる利用調整基準のしくみを解説します。基本指数と調整指数の計算方法がわかります。",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>高松市の利用調整基準とは</h2>
<p>高松市の認可保育園は各家庭の保育の必要性を点数化し、合計点数の高い子どもから入園が決まります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>合計点数 ＝ 基準点数（父母の低い方）＋ 調整点数</p>
</div>

<h2>基本指数（父母各最大20点・低い方を採用）</h2>
<p>就労の場合、月160時間以上で満点の<span class="highlight">20点</span>です。高松市は父母それぞれに点数を出し、低い方の点数が基準点数になります。</p>

<table>
<tr><th>月の就労時間</th><th>基準点数</th></tr>
<tr><td>月160時間以上</td><td>20</td></tr>
<tr><td>月140時間以上160時間未満</td><td>18</td></tr>
<tr><td>月120時間以上140時間未満</td><td>16</td></tr>
<tr><td>月100時間以上120時間未満</td><td>14</td></tr>
<tr><td>月80時間以上100時間未満</td><td>12</td></tr>
<tr><td>月64時間以上80時間未満</td><td>10</td></tr>
</table>

<h2>調整点数の代表例</h2>
<ul>
<li>ひとり親世帯：<span class="highlight">+12点</span></li>
<li>きょうだいが在園中の園を希望：<span class="highlight">+8点</span></li>
<li>小規模保育事業の卒園児：<span class="highlight">+8点</span></li>
<li>育休復帰予定：<span class="highlight">+6点</span></li>
<li>生活保護世帯：<span class="highlight">+4点</span></li>
<li>障がい児保育希望：<span class="highlight">+4点</span></li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>全項目は<a href="https://www.city.takamatsu.kagawa.jp/kurashi/kosodate/youchien_hoiku/kodomoen/hoiku/h29riyou.html" target="_blank" rel="noopener">高松市公式サイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 60,
  },
  {
    slug: "score-up-tips",
    citySlug: "takamatsu",
    title: "高松市で入園点数を上げるコツ　加点チェックリスト",
    description:
      "高松市の保育園入園選考で調整点数の加点を最大限に活用する方法を解説します。",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>基本指数20点は出発点</h2>
<p>高松市ではフルタイム共働き世帯は基準点数<span class="highlight">20点</span>で横並びです。差がつくのは調整点数の加点です。</p>

<h2>加点チェックリスト</h2>
<table>
<tr><th>項目</th><th>点数</th><th>条件</th></tr>
<tr><td>ひとり親世帯</td><td>+12点</td><td>母子・父子家庭の場合</td></tr>
<tr><td>保育士等として勤務</td><td>+12点</td><td>市内の認可保育施設等で保育士として働く場合</td></tr>
<tr><td>きょうだい在園</td><td>+8点</td><td>在園中の園を希望</td></tr>
<tr><td>小規模保育卒園</td><td>+8点</td><td>地域型保育事業の卒園児</td></tr>
<tr><td>育休復帰予定</td><td>+6点</td><td>育児休業終了後に就労する場合</td></tr>
<tr><td>生活保護</td><td>+4点</td><td>就労による自立支援につながる場合</td></tr>
<tr><td>障がい児保育</td><td>+4点</td><td>障がい児保育を実施する施設を希望</td></tr>
<tr><td>きょうだい同時申込</td><td>+2点</td><td>きょうだいが同じ施設に同時入所を希望</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>高松市では育休復帰の加点が<span class="highlight">+6点</span>と大きいです。入園月に職場復帰する計画を立てましょう。</p>
</div>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>就労が内定段階（まだ働いていない）の場合は<span class="highlight">-2点</span>の減点があります。可能であれば入園前に就労を開始しましょう。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 55,
  },
  {
    slug: "tiebreaker-rules",
    citySlug: "takamatsu",
    title: "高松市で同点になったらどうなる？優先順位を解説",
    description:
      "高松市の保育園入園選考で同点だった場合の優先順位の判定方法を解説します。",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>同点時の判定方法</h2>
<p>高松市の入園選考で合計点数が同点になった場合、別表第3の順位表に基づいて判定されます。</p>

<h2>同点時の優先順位（上位から）</h2>
<table>
<tr><th>順位</th><th>条件</th></tr>
<tr><td>1位</td><td>虐待・DV</td></tr>
<tr><td>2位</td><td>災害復旧</td></tr>
<tr><td>3位</td><td>18歳未満の児童が多い世帯</td></tr>
<tr><td>4位</td><td>保育の事由（傷病→就労→出産→介護→内定→就学→就学予定→求職の順）</td></tr>
<tr><td>5位</td><td>希望園の提供区域内に住所がある場合</td></tr>
<tr><td>6位</td><td>希望順位が高い世帯</td></tr>
<tr><td>7位</td><td>所得が低い世帯</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>高松市では第1希望の園に対して合計点数16点以上の場合、第2希望以下の児童よりも優先されます。希望順位の付け方が重要です。</p>
</div>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>同点時の優先順位の詳細は年度によって変更されることがあります。最新の要綱を確認してください。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 50,
  },
  {
    slug: "part-time-work-score",
    citySlug: "takamatsu",
    title: "高松市で時短勤務だと点数はどう変わる？",
    description:
      "高松市の保育園入園選考で時短勤務の場合の基準点数への影響を解説します。",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>高松市は月の合計就労時間で判定</h2>
<p>高松市の基準点数は月の実働時間で決まります。時短勤務の影響を確認しましょう。</p>

<table>
<tr><th>月の就労時間</th><th>基準点数</th></tr>
<tr><td>月160時間以上</td><td>20点</td></tr>
<tr><td>月140時間以上160時間未満</td><td>18点</td></tr>
<tr><td>月120時間以上140時間未満</td><td>16点</td></tr>
<tr><td>月100時間以上120時間未満</td><td>14点</td></tr>
<tr><td>月80時間以上100時間未満</td><td>12点</td></tr>
<tr><td>月64時間以上80時間未満</td><td>10点</td></tr>
</table>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>月20日勤務で1日6時間の時短勤務の場合、月120時間で基準点数は<span class="highlight">16点</span>です。フルタイムの20点と比べて4点下がります。</p>
</div>

<h2>「低い方の点数」ルールに注意</h2>
<p>高松市は父母のうち低い方の基準点数が採用されます。片方がフルタイム（20点）でもう片方が時短（16点）の場合、基準点数は<span class="highlight">16点</span>です。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>高松市は20時間刻みで点数が変わります。復職時にフルタイムに戻す予定であれば、復職後の勤務条件を就労証明書に記載してもらいましょう。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 45,
  },
  {
    slug: "rejection-options",
    citySlug: "takamatsu",
    title: "高松市で保育園に落ちたときの選択肢",
    description:
      "高松市の認可保育園に不承諾となった場合の対応策をまとめました。",
    image: "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>不承諾になったら</h2>
<p>高松市で認可保育園に不承諾になった場合でも、複数の選択肢があります。</p>

<h3>1. 二次選考への申込</h3>
<p>一次選考後に空きが出た園について二次選考が行われます。入所可能状況は市のホームページで公開されています。</p>

<h3>2. 認可外保育施設の利用</h3>
<p>認可外保育施設を利用して就労実績を積むことで、翌年度の申込時に基準点数を維持できます。</p>

<h3>3. 小規模保育の利用</h3>
<p>小規模保育事業（地域型保育）を利用し、卒園時に認可保育園へ転所する方法があります。卒園児には<span class="highlight">+8点</span>の加点が得られます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>高松市では小規模保育卒園の加点（+8点）と育休復帰（+6点）の加点が大きいです。不承諾だった場合はこれらの加点を活用する戦略を考えましょう。</p>
</div>

<h3>4. 途中入園</h3>
<p>空きが出た場合に途中入園が可能です。高松市では入所可能状況を定期的に公表しています。</p>

<h3>5. 育休延長</h3>
<p>不承諾通知があれば育休を最長2歳まで延長できます。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>入所可能状況は<a href="https://www.city.takamatsu.kagawa.jp/kurashi/kosodate/youchien_hoiku/kodomoen/hoiku/nyusho.html" target="_blank" rel="noopener">高松市公式サイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 40,
  },
  {
    slug: "min-score-rule",
    citySlug: "takamatsu",
    title: "高松市の「低い方採用」ルールとは？基準点数の決まり方",
    description:
      "高松市独自の「父母の低い方の基準点数を採用」するルールを詳しく解説します。",
    image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>高松市の基準点数は「低い方」を採用</h2>
<p>高松市の利用調整では、父母それぞれの基準点数を算出し、<span class="highlight">低い方の点数</span>を基準点数として採用します。これは他の自治体とは異なる特徴です。</p>

<h2>具体例</h2>
<table>
<tr><th>ケース</th><th>父の点数</th><th>母の点数</th><th>基準点数</th></tr>
<tr><td>両方フルタイム</td><td>20点</td><td>20点</td><td>20点</td></tr>
<tr><td>父フルタイム・母時短</td><td>20点</td><td>16点</td><td>16点</td></tr>
<tr><td>父フルタイム・母求職</td><td>20点</td><td>4点</td><td>4点</td></tr>
<tr><td>父フルタイム・母出産</td><td>20点</td><td>16点</td><td>16点</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>多くの自治体が父母の点数を「合計」するのに対し、高松市は「低い方」を採用します。そのため片方の保護者の就労状況が基準点数を大きく左右します。</p>
</div>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>就労（区分1）と介護（区分4）、就労と就学（区分7）は合算が可能です。ただし合計が20点を超える場合は20点が上限です。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 50,
  },
  {
    slug: "nursery-worker-bonus",
    citySlug: "takamatsu",
    title: "高松市で保育士として働くと+12点の加点がもらえる",
    description:
      "高松市では保育士資格を持つ保護者が市内の保育施設で働く場合、+12点の大きな加点があります。",
    image: "https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>保育士等の加点制度</h2>
<p>高松市では保育士不足対策として、保育士・保健師・看護師・准看護師の資格を持つ保護者が市内の認可保育施設等で働いている（または働くことが決まっている）場合に、調整点数で<span class="highlight">+12点</span>の加点があります。</p>

<h2>対象となる条件</h2>
<ul>
<li>保育士、保健師、看護師、准看護師の資格を持っていること</li>
<li>高松市内の認可保育施設等または企業主導型保育施設で働いていること</li>
<li>保育士として勤務していること（保育士とみなされる場合を含む）</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>+12点はひとり親世帯と同じ最大級の加点です。保育士資格を持つ保護者が市内の保育施設に就職する場合、非常に有利に入園できます。</p>
</div>

<h2>フルタイム保育士の合計点数</h2>
<p>フルタイム共働きの基準点数20点に保育士加点+12点で、合計<span class="highlight">32点</span>になります。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>自分の子どもが通う園で働く場合でも加点は適用されます。ただし勤務先の園と希望園が同じ場合の取り扱いは事前に確認しましょう。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 35,
  },
  {
    slug: "popular-areas",
    citySlug: "takamatsu",
    title: "高松市の人気エリアと入りやすい地域の傾向",
    description:
      "高松市内で保育園の競争率が高いエリアと比較的入りやすい地域を解説します。",
    image: "https://images.unsplash.com/photo-1524813686514-a57563d77965?w=800&h=400&fit=crop",
    category: "エリア情報",
    categoryColor: "teal",
    content: `<h2>高松市の保育園事情</h2>
<p>高松市は香川県の県庁所在地で四国の玄関口です。市中心部と郊外で保育園の競争率に差があります。</p>

<h2>競争率が高い傾向のエリア</h2>
<ul>
<li>高松駅・瓦町周辺：市の中心地で子育て世帯に人気</li>
<li>栗林・太田エリア：住環境が良く保育需要が高い</li>
<li>仏生山・一宮エリア：ことでん沿線で住宅開発が進む地域</li>
</ul>

<h2>比較的入りやすい傾向のエリア</h2>
<ul>
<li>牟礼・庵治エリア：市東部で保育施設に比較的余裕がある</li>
<li>国分寺・香南エリア：市西部の郊外で定員に空きが出やすい</li>
<li>塩江エリア：山間部で競争率が低い傾向</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>高松市は車社会です。通勤経路上の園も含めて幅広く希望園を検討しましょう。第1希望の園は合計点数16点以上で優先されるルールがあります。</p>
</div>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>エリアの難易度は年度や年齢クラスによって変わります。最新の入所可能状況を市に確認してください。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 30,
  },
  {
    slug: "competition-reality",
    citySlug: "takamatsu",
    title: "高松市の保育園入園競争の実態",
    description:
      "高松市の保育園入園はどのくらい厳しいのか。選考の実態を解説します。",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>高松市の入園競争の現状</h2>
<p>高松市は四国の中核市として保育整備が進んでいますが、中心部の人気園では競争があります。高松市は「低い方採用」の20点制のため、フルタイム共働き世帯は基準点数20点で横並びです。</p>

<h2>ボリュームゾーン</h2>
<p>フルタイム共働き世帯の基準点数は<span class="highlight">20点</span>です。ここから調整点数の加点で差がつきます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>育休復帰（+6点）を積むと20点＋6点＝<span class="highlight">26点</span>がひとつの目安です。きょうだい在園の+8点が加わると28点で、中心部の人気園でも入園が期待できます。</p>
</div>

<h2>年齢別の傾向</h2>
<ul>
<li>0歳児クラス：定員が少なく地域差が大きい</li>
<li>1歳児クラス：最も競争が激しい年齢</li>
<li>2歳児クラス：空きが少ない</li>
<li>3歳児以上：認定こども園の枠が増え比較的入りやすい</li>
</ul>

<h2>高松市の特徴的なルール</h2>
<p>第1希望の園については合計点数16点以上であれば、第2希望以下の児童よりも優先されます。希望順位の付け方が非常に重要です。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>求職活動中の基準点数は4点で、就労中（最大20点）と大きな差があります。求職中での入園は中心部では困難です。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 45,
  },
];

registerArticles(articles);
