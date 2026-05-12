import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  {
    slug: "hokatsu-schedule",
    citySlug: "chuo",
    title: "中央区の保活スケジュール　申込から内定までの流れ",
    description:
      "中央区の認可保育園の申込時期・選考の流れをまとめました。令和8年度4月入園に向けた動き方を解説します。",
    image: "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>中央区の4月入園スケジュール</h2>
<p>中央区の認可保育園は毎年秋に翌年度4月入園の申込を受付けます。「保育園のごあんない」を入手するところからスタートしましょう。</p>

<h3>保活の全体スケジュール</h3>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>4月〜6月：情報収集</strong>
<p>区のホームページや前年度の案内で保育園の一覧を確認します。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>6月〜9月：保育園見学</strong>
<p>気になる園に連絡して見学を予約。中央区は園数が限られるため早めに動きましょう。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>9月〜10月：案内を入手・書類準備</strong>
<p>「保育園のごあんない」を入手し、就労証明書などの書類を揃えます。</p>
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
<p>中央区は基本指数が父母各最大20点（合計40点満点）です。出産による加点が20点と高いのも特徴です。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳しくは<a href="https://www.city.chuo.lg.jp/kosodate/kosodate/hoikuen/hoiku/ninkahoiku/index.html" target="_blank" rel="noopener">中央区公式サイト「保育園入園のご案内」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 55,
  },
  {
    slug: "scoring-system-guide",
    citySlug: "chuo",
    title: "中央区の入園点数のしくみ　基準指数と調整指数を解説",
    description:
      "中央区の保育園入園選考で使われる「基準指数」と「調整指数」のしくみを解説します。",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>中央区の選考指数とは</h2>
<p>中央区の認可保育園は「基準指数＋調整指数」の合計で選考されます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>選考指数 ＝ 基準指数（父＋母）＋ 調整指数</p>
</div>

<h2>基準指数（父母各最大20点、合計40点）</h2>
<p>父母それぞれの保育必要性を点数化します。就労の場合、月20日以上かつ1日7時間以上で満点の<span class="highlight">20点</span>です。</p>

<table>
<tr><th>就労の状況</th><th>指数</th></tr>
<tr><td>月20日以上・1日7時間以上</td><td>20</td></tr>
<tr><td>月20日以上・1日5時間以上7時間未満</td><td>18</td></tr>
<tr><td>月16日以上・1日7時間以上</td><td>16</td></tr>
<tr><td>月16日以上・1日5時間以上7時間未満</td><td>14</td></tr>
<tr><td>月12日以上・1日7時間以上</td><td>14</td></tr>
<tr><td>月12日以上・1日4時間以上7時間未満</td><td>12</td></tr>
<tr><td>月48時間以上（上記以外）</td><td>10</td></tr>
</table>

<h2>調整指数の代表例</h2>
<ul>
<li>ひとり親世帯：<span class="highlight">+5点</span></li>
<li>育休後の再申込：<span class="highlight">+4点</span></li>
<li>きょうだいが在園中の園を希望：<span class="highlight">+3点</span></li>
<li>家庭的保育事業（2歳児クラス卒園）：<span class="highlight">+3点</span></li>
<li>生活保護世帯：<span class="highlight">+3点</span></li>
<li>認可外保育施設に預けている：<span class="highlight">+2点</span></li>
<li>育休復帰（通常）：<span class="highlight">+2点</span></li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>全項目は<a href="https://www.city.chuo.lg.jp/kosodate/kosodate/hoikuen/hoiku/ninkahoiku/index.html" target="_blank" rel="noopener">中央区公式サイト「保育園のごあんない」</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 65,
  },
  {
    slug: "score-up-tips",
    citySlug: "chuo",
    title: "中央区で入園点数を上げるコツ　加点を最大化する方法",
    description:
      "中央区の保育園入園選考で調整指数の加点を最大限に活用する方法を解説します。",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>基準指数40点は出発点</h2>
<p>中央区ではフルタイム共働き世帯は基準指数<span class="highlight">40点</span>で並びます。差がつくのは調整指数です。</p>

<h2>加点チェックリスト</h2>
<table>
<tr><th>項目</th><th>点数</th><th>条件</th></tr>
<tr><td>ひとり親世帯</td><td>+5点</td><td>母子・父子家庭の場合</td></tr>
<tr><td>育休後の再申込</td><td>+4点</td><td>育休取得後に再度申込む場合</td></tr>
<tr><td>きょうだい在園（同園）</td><td>+3点</td><td>希望園にきょうだいが在園中</td></tr>
<tr><td>家庭的保育事業卒園（2歳児）</td><td>+3点</td><td>保育ママ等の2歳児クラス卒園</td></tr>
<tr><td>生活保護世帯</td><td>+3点</td><td>生活保護を受けている場合</td></tr>
<tr><td>認可外施設に預けている</td><td>+2点</td><td>認証保育所等に有償で預けている</td></tr>
<tr><td>育休復帰（通常）</td><td>+2点</td><td>入園月に職場復帰する場合</td></tr>
<tr><td>きょうだい同時申込</td><td>+1点</td><td>双子などで同時に申し込む場合</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>中央区では「育休後の再申込」が+4点と大きな加点です。一度不承諾になった後に育休を取得し、再度申し込む場合に該当します。</p>
</div>

<h2>就労時間の注意点</h2>
<p>中央区の満点基準は「月20日以上・1日7時間以上」です。8時間ではなく<span class="highlight">7時間</span>で満点になるのが特徴です。6時間台の時短勤務でも1日7時間以上なら20点です。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>就労証明書に記載された勤務時間で判定されます。実態と異なる記載は取消しの対象です。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 100,
  },
  {
    slug: "tiebreaker-rules",
    citySlug: "chuo",
    title: "中央区で同点になったらどうなる？優先順位のルール",
    description:
      "中央区の保育園入園選考で同点になった場合の優先順位を解説します。",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>同点の場合の判定</h2>
<p>中央区の入園選考で合計指数が同じ場合、優先順位で判定されます。タワーマンション建設などでフルタイム共働き世帯が多い中央区では、同点の世帯が多く発生します。</p>

<h2>同点時に考慮される要素</h2>
<ul>
<li>ひとり親世帯は優先</li>
<li>所得が低い世帯が優先</li>
<li>きょうだいが在園している園への申込は優先</li>
<li>保育の必要性がより高い世帯が優先</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>同点で並んだ場合は所得の低い世帯が優先される傾向があります。高所得世帯ほど同点時に不利になるため、1点でも多く加点を積むことが重要です。</p>
</div>

<h2>同点回避の戦略</h2>
<p>中央区では認可外利用（+2点）や育休復帰（+2〜4点）の加点を確実に取ることが大切です。特に「育休後の再申込」（+4点）は大きな加点です。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>中央区は人口増加が続いているエリアです。年度によって競争状況が大きく変わることがあります。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 85,
  },
  {
    slug: "part-time-work-score",
    citySlug: "chuo",
    title: "中央区で時短勤務だと点数はどう変わる？",
    description:
      "中央区の保育園入園選考で時短勤務の場合の基準指数への影響を解説します。",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>中央区の満点基準は1日7時間</h2>
<p>中央区は月20日以上・1日<span class="highlight">7時間以上</span>で基準指数が満点の20点になります。他区では8時間が満点基準であることが多い中、7時間で満点になるのは中央区の特徴です。</p>

<table>
<tr><th>勤務パターン（月20日以上）</th><th>基準指数</th></tr>
<tr><td>1日7時間以上</td><td>20点</td></tr>
<tr><td>1日5時間以上7時間未満</td><td>18点</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>育休復帰後に7時間勤務であれば満点の20点が維持されます。6時間台の時短勤務でも7時間以上なら影響なしです。</p>
</div>

<h2>5時間以上7時間未満の場合</h2>
<p>1日5時間以上7時間未満の時短勤務では基準指数は<span class="highlight">18点</span>です。父母で各2点下がるため、合計4点の差が生まれます。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>就労証明書に記載する勤務時間は復帰後の実態に合わせる必要があります。フルタイムで復帰予定であればフルタイムの時間で記載できます。</p>
</div>

<h2>月16日以上の場合</h2>
<p>勤務日数が月16日以上の場合は、1日7時間以上でも基準指数は16点に下がります。勤務日数と時間の両方を確認しましょう。</p>`,
    publishedAt: "2026-03-28",
    popularity: 90,
  },
  {
    slug: "rejection-options",
    citySlug: "chuo",
    title: "中央区で保育園に落ちたときの選択肢",
    description:
      "中央区の認可保育園に不承諾となった場合の対応策をまとめました。",
    image: "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>不承諾になったらどうする？</h2>
<p>中央区の一次選考で不承諾になっても複数の選択肢があります。</p>

<h3>1. 二次選考への申込</h3>
<p>一次で辞退者が出た枠を対象に二次選考が行われます。</p>

<h3>2. 認可外保育施設の利用</h3>
<p>認証保育所や企業主導型保育施設を探しましょう。中央区では認可外利用で<span class="highlight">+2点</span>の加点が得られます。</p>

<h3>3. 家庭的保育事業（保育ママ）の利用</h3>
<p>中央区では家庭的保育事業を利用して2歳児クラスを卒園すると<span class="highlight">+3点</span>の加点が得られます。3歳児クラスへの転所で有利になります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>中央区では「育休後の再申込」で+4点の加点があります。不承諾後に育休を取得し、翌年度に再度申し込むことで加点が見込めます。</p>
</div>

<h3>4. 途中入園</h3>
<p>転居などで空きが出ることがあります。区の空き情報を毎月チェックしましょう。</p>

<h3>5. 育休の延長</h3>
<p>不承諾通知があれば育休を最長2歳まで延長できます。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>空き状況は<a href="https://www.city.chuo.lg.jp/kosodate/kosodate/hoikuen/hoiku/ninkahoiku/index.html" target="_blank" rel="noopener">中央区公式サイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 80,
  },
  {
    slug: "unlicensed-nursery-bonus",
    citySlug: "chuo",
    title: "中央区で認可外保育施設を活用して加点を得る方法",
    description:
      "中央区の入園選考で認可外保育施設の利用がどう加点されるか、家庭的保育事業の活用法もあわせて解説します。",
    image: "https://images.unsplash.com/photo-1587654780291-39c9404d7dd0?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>認可外利用で+2点</h2>
<p>中央区では認証保育所等の認可外保育施設に月ぎめで預けている場合、調整指数で<span class="highlight">+2点</span>の加点が得られます。</p>

<h2>家庭的保育事業の卒園で+3点</h2>
<p>中央区の特徴的な制度として、家庭的保育事業（保育ママ）等の2歳児クラスを卒園して認可保育園に転所する場合、<span class="highlight">+3点</span>の加点が得られます。0・1歳児クラスの場合は+1点です。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>小規模保育や保育ママを0歳から利用し、2歳児クラス卒園のタイミングで認可保育園に申し込むのは有効な戦略です。</p>
</div>

<h2>認可外保育施設の探し方</h2>
<ul>
<li>認証保育所：東京都の認証を受けた施設</li>
<li>企業主導型保育施設：企業が設置する保育施設</li>
<li>区のホームページで一覧を確認</li>
</ul>

<h2>注意点</h2>
<p>中央区の認可外利用加点は+2点と、他区と比べるとやや小さめです。ただし同点が多い中央区では2点の差でも大きな意味を持ちます。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>認可外保育施設の保育料は認可より高額になることが一般的です。費用面も含めて検討しましょう。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 75,
  },
  {
    slug: "next-year-changes",
    citySlug: "chuo",
    title: "中央区の令和8年度入園　変更点と注意事項",
    description:
      "中央区の令和8年度保育園入園選考の注意点をまとめました。",
    image: "https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=800&h=400&fit=crop",
    category: "最新情報",
    categoryColor: "purple",
    content: `<h2>令和8年度の注意点</h2>
<p>中央区は人口増加が続いているエリアで、タワーマンションの建設に伴い保育需要も増え続けています。最新の「保育園のごあんない」で制度の変更点を確認しましょう。</p>

<h2>確認すべきポイント</h2>
<ul>
<li>新設園の情報（中央区は新設園が増えている傾向）</li>
<li>基準指数・調整指数の変更有無</li>
<li>申込方法の変更</li>
<li>定員の増減</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>中央区は新規開園が比較的多い区です。新設園は競争率が読みにくいため、希望園に入れる際は狙い目になる場合があります。</p>
</div>

<h2>晴海エリアの動向</h2>
<p>晴海フラッグなど大規模開発に伴い、晴海エリアでは保育施設の新設が進んでいます。新設園の定員や受入年齢は最新情報を確認してください。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新情報は<a href="https://www.city.chuo.lg.jp/kosodate/kosodate/hoikuen/hoiku/ninkahoiku/index.html" target="_blank" rel="noopener">中央区公式サイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 70,
  },
  {
    slug: "popular-areas",
    citySlug: "chuo",
    title: "中央区の人気エリアと入りやすい地域の傾向",
    description:
      "中央区内で保育園の競争率が高いエリアと比較的入りやすい地域の傾向を解説します。",
    image: "https://images.unsplash.com/photo-1524813686514-a57563d77965?w=800&h=400&fit=crop",
    category: "エリア情報",
    categoryColor: "teal",
    content: `<h2>中央区の保育園事情</h2>
<p>中央区はタワーマンションの建設ラッシュにより子育て世帯が急増しています。エリアによって保育園の充足状況に大きな差があります。</p>

<h2>競争率が高い傾向のエリア</h2>
<ul>
<li>勝どき・月島エリア：タワーマンションが多く子育て世帯が集中</li>
<li>晴海エリア：大規模開発に伴い急激に人口が増加</li>
<li>日本橋エリア：住宅開発が進み保育需要が増加</li>
</ul>

<h2>比較的入りやすい傾向のエリア</h2>
<ul>
<li>人形町・水天宮エリア：園数が比較的充実</li>
<li>八丁堀・新富町エリア：オフィス街に近く住宅が少なめ</li>
</ul>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>新設園の開園タイミングでエリアの難易度は大きく変動します。前年度の状況がそのまま当てはまるとは限りません。</p>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>中央区は面積が小さいため、自宅から通える園は多くなります。通勤経路も含めて幅広く希望園を記入しましょう。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 60,
  },
  {
    slug: "competition-reality",
    citySlug: "chuo",
    title: "中央区の保育園入園競争の実態",
    description:
      "中央区の保育園入園競争はどのくらい厳しいのか。タワマン増加の影響も含めて解説します。",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>中央区の入園競争の現状</h2>
<p>中央区は人口増加率が東京23区でもトップクラスです。タワーマンションの建設に伴い子育て世帯が急増しており、保育需要は高まり続けています。</p>

<h2>ボリュームゾーン</h2>
<p>フルタイム共働き世帯は基準指数<span class="highlight">40点</span>で横並びです。中央区の満点基準は1日7時間以上のため、多くの世帯が40点に到達します。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>基準指数40点に加えて、ひとり親（+5点）や育休後再申込（+4点）、きょうだい在園（+3点）などの加点がないと、人気園の入園は難しい状況です。</p>
</div>

<h2>年齢別の傾向</h2>
<ul>
<li>0歳児クラス：定員が少ない園が多い</li>
<li>1歳児クラス：最も競争が激しい年齢</li>
<li>2歳児クラス：空きが少なく厳しい</li>
<li>3歳児以上：新設園で枠が増えることがある</li>
</ul>

<h2>新設園の影響</h2>
<p>中央区は新設園が増えており、開園年度は比較的入りやすいことがあります。新設園の情報は早めにチェックしましょう。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>求職活動中の基準指数は8点で、就労中（最大20点）との差が非常に大きいです。求職中での入園は現実的に困難です。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 95,
  },
  {
    slug: "hoikuryo-keisan",
    citySlug: "chuo",
    title: "中央区の保育料計算【令和8年度版】年収別シミュレーション・早見表",
    description:
      "中央区の認可保育園の保育料を年収・子ども数別に詳しく解説。区民税所得割額に基づく階層区分早見表、無償化（3歳〜）の対象確認、副食費・第2子以降の減免制度まで。令和8年度対応。",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "お金・制度",
    categoryColor: "amber",
    content: `<h2>中央区の保育料はどうやって決まる？</h2>
<p>中央区の認可保育園の保育料（利用者負担額）は、<strong>世帯の区民税所得割額</strong>によって決まります。東京都の基準に基づき階層区分が設定されており、所得が高いほど保育料も高くなる応能負担方式です。</p>

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
<p class="text-xs text-muted-foreground">※上記は目安です。詳細は中央区の公式保育料表をご確認ください。</p>

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
<p>毎年6月ごろ、前年度の区民税額が確定した後に保育料が決定・通知されます。入園前に目安を知りたい場合は中央区担当課にお問い合わせください。</p>
<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新の保育料表は中央区公式サイトからご確認ください。</p>
</div>`,
    publishedAt: "2026-05-13",
    popularity: 42,
  },
  {
    slug: "shokuhi-jippi",
    citySlug: "chuo",
    title: "中央区の保育園の給食費（副食費）はいくら？【令和8年度版】免除条件と金額",
    description:
      "中央区の保育園の給食費（副食費）は月いくら？所得・子ども数による副食費免除の条件と申請方法、保育料無償化の範囲と実費負担の全額をわかりやすく解説。令和8年度対応。",
    image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&h=400&fit=crop",
    category: "お金・制度",
    categoryColor: "amber",
    content: `<h2>中央区の副食費とは？</h2>
<p>2019年10月の幼児教育・保育無償化により、<strong>3歳以上の保育料は無料</strong>になりました。ただし、給食の<strong>副食費（おかず代）は実費負担</strong>が残ります。中央区では副食費として月額4,500円程度が別途かかります。</p>

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
<p class="text-xs text-muted-foreground">※金額は目安です。詳細は中央区公式サイトでご確認ください。</p>

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
<p>副食費は園から直接請求されます。毎月口座引き落としまたは現金納付が一般的です。免除に該当する場合は入園時や毎年6月ごろに申請手続きが必要です。中央区担当課に確認してください。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新の副食費・実費負担の詳細は中央区公式サイトからご確認ください。</p>
</div>`,
    publishedAt: "2026-05-13",
    popularity: 40,
  },
];

registerArticles(articles);
