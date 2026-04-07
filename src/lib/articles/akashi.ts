import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  {
    slug: "hokatsu-schedule",
    citySlug: "akashi",
    title: "明石市の保活スケジュール　令和8年度4月入園の流れ",
    description:
      "明石市の令和8年度（2026年度）4月入園の申込時期・必要書類・結果通知の時期をまとめました。",
    image:
      "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>令和8年度（2026年度）4月入園のスケジュール</h2>
<p>明石市の4月入園申込は例年10月頃に受け付けられます。</p>

<h3>申込の流れ</h3>
<table>
<tr><th>項目</th><th>日程（目安）</th></tr>
<tr><td>申請書類配布</td><td>2025年9月頃〜</td></tr>
<tr><td>1次申込受付</td><td>2025年10月頃</td></tr>
<tr><td>1次結果通知</td><td>2026年1月下旬〜2月頃</td></tr>
<tr><td>2次申込受付</td><td>2026年2月頃</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>明石市では「保育施設利用のしおり」が公式サイトからダウンロードできます。利用調整基準表も掲載されているので必ず確認しましょう。</p>
</div>

<h2>いつから動き始めるべき？</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content"><strong>4月〜6月：情報収集</strong><p>明石市の公式サイトで前年度のしおりを参考に準備を始めます。</p></div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content"><strong>6月〜9月：保育園見学</strong><p>気になる園に電話して見学予約を入れましょう。</p></div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content"><strong>9月〜10月：書類準備</strong><p>就労証明書を勤務先に依頼します。</p></div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content"><strong>10月：申込</strong><p>期限内に必要書類を提出します。</p></div>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新情報は<a href="https://www.city.akashi.lg.jp/kodomo/ikusei_shitsu/kodomo-kyoiku/kosodate/hoikujo/ikusei-shitsu-hoiku.html" target="_blank" rel="noopener">明石市公式サイト「保育施設の申込み」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-04",
    popularity: 55,
  },
  {
    slug: "scoring-system-guide",
    citySlug: "akashi",
    title: "明石市の入園点数のしくみ　基礎指数と付加指数をやさしく解説",
    description:
      "明石市の保育園入園選考で使われる点数制度の仕組みを、初めての方にもわかるように解説します。",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>点数制度の全体像</h2>
<p>明石市の認可保育施設は<strong>選考指数の高い世帯から優先</strong>して利用調整されます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>基礎指数 ＝（父の基礎指数 ＋ 母の基礎指数）÷ 2<br>選考指数 ＝ 基礎指数 ± 付加指数</p>
</div>

<h2>基礎指数とは</h2>
<p>保護者それぞれの「保育を必要とする事由」を点数化したものです。1人あたり<span class="highlight">最大22点</span>（フルタイム就労の場合）で、父母の平均値が基礎指数になります。</p>
<table>
<tr><th>就労時間（月あたり）</th><th>基礎指数</th></tr>
<tr><td>160時間以上（フルタイム）</td><td>22</td></tr>
<tr><td>144時間以上160時間未満</td><td>21</td></tr>
<tr><td>128時間以上144時間未満</td><td>20</td></tr>
<tr><td>112時間以上128時間未満</td><td>19</td></tr>
<tr><td>96時間以上112時間未満</td><td>18</td></tr>
<tr><td>80時間以上96時間未満</td><td>17</td></tr>
<tr><td>64時間以上80時間未満</td><td>16</td></tr>
</table>

<h2>付加指数とは</h2>
<p>世帯の状況に応じて加点・減点される点数です。</p>
<table>
<tr><th>項目</th><th>指数</th></tr>
<tr><td>ひとり親世帯（片方不在）</td><td>+5</td></tr>
<tr><td>両親不在</td><td>+10</td></tr>
<tr><td>きょうだいが同一施設に在園中</td><td>+2</td></tr>
<tr><td>認可外保育施設等を利用中</td><td>+3</td></tr>
<tr><td>育児休業からの復帰予定</td><td>+2</td></tr>
<tr><td>地域型保育事業の卒園児（連携施設）</td><td>+10</td></tr>
<tr><td>地域型保育事業の卒園児（その他）</td><td>+5</td></tr>
<tr><td>保育士として市内施設に勤務</td><td>+10</td></tr>
<tr><td>65歳未満の無職の祖父母等と同居</td><td>-2</td></tr>
</table>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳細な利用調整基準表は<a href="https://www.city.akashi.lg.jp/kodomo/ikusei_shitsu/riyoukijunriyouchousei.html" target="_blank" rel="noopener">明石市公式サイト「利用調整基準表・利用調整結果」</a>からダウンロードできます。</p>
</div>`,
    publishedAt: "2026-04-04",
    popularity: 60,
  },
  {
    slug: "fulltime-22-line",
    citySlug: "akashi",
    title: "フルタイム共働きで基礎指数22は安心？明石市のボーダーライン事情",
    description:
      "明石市でフルタイム共働き（基礎指数22）なら入園できるのか？競争状況と付加指数の重要性を解説します。",
    image:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>基礎指数22がスタートライン</h2>
<p>明石市では父母ともフルタイム勤務（月160時間以上）であれば基礎指数は<span class="highlight">（22＋22）÷2＝22</span>になります。</p>

<h2>明石市の競争状況</h2>
<p>明石市は子育て支援が手厚いことで知られ、子育て世帯の転入が増加しています。JR明石駅・西明石駅周辺を中心に人気エリアでは競争が発生し、基礎指数22だけでは安心できない園もあります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>認可外施設利用（+3）、きょうだい在園（+2）、育休復帰（+2）などの付加指数が差を分けます。該当する項目がないか確認しましょう。</p>
</div>

<h2>同点の場合はどうなる？</h2>
<p>選考指数が同一の場合、明石市が定める優先順位表（表III）に基づき判定されます。基礎指数が高い順、認定事由の種別、就労時間の長さ、世帯の所得額などが比較されます。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>0歳児クラスは枠が少ないため、年齢によって入りやすさが大きく異なります。受入予定児童数は明石市の公式サイトで公開されています。</p>
</div>`,
    publishedAt: "2026-04-04",
    popularity: 55,
  },
  {
    slug: "jitan-kinmu-scoring",
    citySlug: "akashi",
    title: "時短勤務だと指数は下がる？明石市の基礎指数と勤務時間の関係",
    description:
      "明石市で時短勤務の場合、基礎指数がどう変わるかを解説。フルタイムとの差や付加指数を最大化するポイントも紹介します。",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>時短勤務の基礎指数</h2>
<p>明石市では月あたりの就労時間に応じて基礎指数が決まります。</p>

<table>
<tr><th>就労時間（月あたり）</th><th>基礎指数</th></tr>
<tr><td>月160時間以上</td><td><span class="highlight">22</span></td></tr>
<tr><td>月144時間以上160時間未満</td><td><span class="highlight">21</span></td></tr>
<tr><td>月128時間以上144時間未満</td><td><span class="highlight">20</span></td></tr>
<tr><td>月112時間以上128時間未満</td><td><span class="highlight">19</span></td></tr>
<tr><td>月96時間以上112時間未満</td><td><span class="highlight">18</span></td></tr>
</table>

<h2>時短勤務で基礎指数はどうなる？</h2>
<div class="point-box">
<p><strong>ポイント</strong></p>
<p>例：母が月120時間の時短勤務（指数20）、父がフルタイム月160時間（指数22）の場合は、基礎指数＝（22＋20）÷2＝<span class="highlight">21</span>。フルタイム同士の22より1点低くなります。</p>
</div>

<h2>自営協力者・内職の場合はさらに注意</h2>
<p>明石市では就労形態によって基礎指数が異なります。自営協力者は同じ時間でも2点低く、内職はさらに低くなります。就労証明書の記載内容を確認しましょう。</p>`,
    publishedAt: "2026-04-04",
    popularity: 50,
  },
  {
    slug: "ochita-toki-sentakushi",
    citySlug: "akashi",
    title: "明石市で保育園に落ちたときの選択肢　次にやるべきこと",
    description:
      "明石市の1次選考で保留になった場合の対処法を解説。取れる選択肢をまとめました。",
    image:
      "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>保留通知が届いたら</h2>
<p>1次選考で保留になっても、まだ選択肢はあります。</p>

<h2>選択肢1：2次選考に申し込む</h2>
<p>1次で辞退が出た枠で再度選考されます。希望園の変更・追加も可能です。</p>

<h2>選択肢2：途中入園を申し込む</h2>
<p>毎月の空き状況に応じて途中入園の受付があります。</p>

<h2>選択肢3：認可外保育施設を利用する</h2>
<p>認可外に預けて復職し、次年度は+3点の付加指数を得て再挑戦する戦略があります。</p>

<h2>選択肢4：育児休業を延長する</h2>
<p>保留通知書があれば育児休業を延長できます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>明石市では受入予定児童数一覧表が公式サイトで公開されています。途中入園のチャンスを逃さないよう定期的にチェックしましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>受入予定児童数は<a href="https://www.city.akashi.lg.jp/kodomo/ikusei_shitsu/kodomo-kyoiku/kosodate/hoikujo/ukeireyoteijidou.html" target="_blank" rel="noopener">明石市公式サイト「受入予定児童数一覧表」</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-04",
    popularity: 45,
  },
  {
    slug: "ninkagai-katen",
    citySlug: "akashi",
    title: "認可外保育施設の利用で+3点　明石市の付加指数を得る条件",
    description:
      "明石市で認可外保育施設の利用実績により付加指数+3を得るための条件を解説します。",
    image:
      "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&h=400&fit=crop",
    category: "認可外",
    categoryColor: "rose",
    content: `<h2>認可外利用で+3点の付加指数</h2>
<p>明石市では認可外保育施設等を月64時間以上利用している実績があると<span class="highlight">+3点</span>の付加指数が得られます。</p>

<h2>対象となる施設</h2>
<ul>
<li>認可外保育施設</li>
<li>保育所等の一時預かり（月64時間以上利用）</li>
<li>認可幼稚園（私学助成対象施設）</li>
<li>認可外幼稚園</li>
<li>企業主導型事業所内保育所</li>
</ul>

<h2>注意点</h2>
<div class="warn-box">
<p><strong>注意</strong></p>
<p>2025年12月選考から、保護者が育児休業中に認可外施設等を利用している場合は付加指数の対象外となりました。育児休業から復帰した上での利用であることが必要です。</p>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>基礎指数22＋認可外利用+3＝選考指数25に。人気園ではこの3点が当落を分けることがあります。</p>
</div>`,
    publishedAt: "2026-04-04",
    popularity: 45,
  },
  {
    slug: "area-guide",
    citySlug: "akashi",
    title: "明石市のエリア別保育園事情　入りやすい地域は？",
    description:
      "明石市の地域ごとの保育園の特徴と入りやすさの傾向を解説します。",
    image:
      "https://images.unsplash.com/photo-1524813686514-a57563d77965?w=800&h=400&fit=crop",
    category: "保育園選び",
    categoryColor: "teal",
    content: `<h2>エリアによって事情が異なる</h2>
<p>明石市は東西に細長い市で、エリアによって保育園の競争状況が異なります。</p>

<table>
<tr><th>エリア</th><th>特徴</th></tr>
<tr><td>JR明石駅周辺</td><td>市の中心部で子育て世帯が多い。マンション開発も盛んで競争は激しい</td></tr>
<tr><td>JR西明石駅周辺</td><td>新幹線停車駅で利便性が高い。ファミリー層に人気で競争あり</td></tr>
<tr><td>JR大久保駅周辺</td><td>住宅地として発展中。新しい保育施設も増えている</td></tr>
<tr><td>JR魚住駅周辺</td><td>比較的新しい住宅地。園の選択肢はやや少ない</td></tr>
<tr><td>山陽電鉄沿線</td><td>JR沿線と比べて競争は穏やか。通勤ルートに合わせて検討を</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>明石市は子育て支援の充実で転入者が増えています。希望する園だけでなく、通勤経路上の園も含めて幅広く検討しましょう。</p>
</div>`,
    publishedAt: "2026-04-04",
    popularity: 40,
  },
  {
    slug: "hitorioya-katen",
    citySlug: "akashi",
    title: "明石市のひとり親加点　基礎指数＋付加指数5点を解説",
    description:
      "明石市でひとり親世帯に適用される付加指数+5点と基礎指数の計算方法について解説します。",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>ひとり親世帯の基礎指数</h2>
<p>明石市では通常、基礎指数は父母の平均ですが、ひとり親世帯の場合は<strong>当該保護者の指数がそのまま基礎指数</strong>になります。さらに付加指数として<span class="highlight">+5点</span>が加算されます。</p>

<h2>ひとり親世帯の選考指数イメージ</h2>
<div class="point-box">
<p><strong>ポイント</strong></p>
<p>フルタイム就労のひとり親の場合：基礎指数22 ＋ ひとり親加点5 ＝ <span class="highlight">選考指数27</span>。フルタイム共働き世帯（基礎指数22）を上回る水準になります。</p>
</div>

<h2>両親不在の場合</h2>
<p>父母のいずれもが存しない場合は、付加指数が<span class="highlight">+10点</span>になります。祖父母などの保護者の基礎指数により選考されます。</p>

<h2>必要書類</h2>
<p>ひとり親であることを証明する書類（戸籍謄本、児童扶養手当証書の写しなど）が必要です。詳細は申込書類で確認してください。</p>`,
    publishedAt: "2026-04-04",
    popularity: 50,
  },
  {
    slug: "ikukyu-kyuufukin-genkakuka",
    citySlug: "akashi",
    title: "2025年4月から育休給付金延長の審査が厳格化　明石市での影響",
    description:
      "2025年4月からの育児休業給付金の延長手続き厳格化について、明石市の保活にどう影響するかを解説します。",
    image:
      "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=800&h=400&fit=crop",
    category: "最新情報",
    categoryColor: "blue",
    content: `<h2>制度改正の概要</h2>
<p>2025年4月から、育児休業給付金の支給対象期間延長の審査が厳格化されました。「速やかな職場復帰のために保育所の利用申込をした」と認められることが必要です。</p>

<h2>明石市の保活への影響</h2>
<p>通勤可能な範囲の園を複数希望し、真剣に入園を目指している方は影響を受けません。</p>

<h2>明石市の育休関連の付加指数</h2>
<p>明石市では育児休業からの復帰に関連する付加指数があります。</p>
<ul>
<li>育児休業からの復帰予定：+2点</li>
<li>入所できず勤務復帰した場合：+3点</li>
<li>産休から育休を取得せず復帰：+2点</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>制度改正の詳細は<a href="https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/0000160564_00040.html" target="_blank" rel="noopener">厚生労働省「育児休業給付金の支給対象期間延長手続き」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-04",
    popularity: 35,
  },
  {
    slug: "chiikigata-sotsuenji",
    citySlug: "akashi",
    title: "地域型保育の卒園児は+10点　明石市の連携施設加点を解説",
    description:
      "明石市で小規模保育所等の卒園児に適用される付加指数+10点（連携施設）について解説します。",
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>地域型保育事業の卒園児への加点</h2>
<p>明石市では小規模保育所・家庭的保育事業等の地域型保育事業を卒園（予定含む）する児童に対し、大きな付加指数が加算されます。</p>

<table>
<tr><th>条件</th><th>付加指数</th></tr>
<tr><td>連携施設への入所希望</td><td><span class="highlight">+10</span></td></tr>
<tr><td>連携施設以外への入所希望</td><td><span class="highlight">+5</span></td></tr>
</table>

<h2>連携施設とは</h2>
<p>地域型保育事業所が連携先として協定を結んでいる保育所・認定こども園のことです。卒園後の受け皿として設定されており、連携施設への入所を希望する場合は最大の+10点が適用されます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>基礎指数22＋連携施設加点10＝選考指数32。非常に高い選考指数となるため、地域型保育事業は3歳以降の入園戦略として有効です。連携施設がどの園か、入所前に確認しておきましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>各保育施設の概要と連携施設は<a href="https://www.city.akashi.lg.jp/kodomo/ikusei_shitsu/hoiku/hoikushoannai.html" target="_blank" rel="noopener">明石市公式サイト「各保育施設の概要」</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-04",
    popularity: 30,
  },
];

registerArticles(articles);
