import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  {
    slug: "hokatsu-schedule",
    citySlug: "nara",
    title: "奈良市の保活スケジュール　申込から内定までの流れ",
    description:
      "奈良市の認可保育園の申込時期・選考の流れをまとめました。令和8年度4月入園の動き方を解説します。",
    image: "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>奈良市の4月入園スケジュール</h2>
<p>奈良市の認可保育園は毎年秋に翌年度4月入園の一次受付を行います。利用調整基準表を理解して準備を進めましょう。</p>

<h3>保活の全体スケジュール</h3>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>4月〜6月：情報収集</strong>
<p>奈良市のホームページで保育施設の一覧を確認します。入園のしおりの公開時期もチェックしましょう。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>6月〜9月：保育園見学</strong>
<p>気になる園に連絡して見学を予約しましょう。奈良市内には公立・私立保育園や認定こども園が多数あります。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>9月〜10月：書類準備</strong>
<p>就労証明書などの必要書類を準備します。就労時間は月160時間以上で満点の100点です。</p>
</div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content">
<strong>10月〜11月：申込書類の提出</strong>
<p>子ども給付課の窓口で申込みます。</p>
</div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>奈良市は基本指数が父母各最大100点（合計200点満点）です。就労時間が細かく10段階に区分されているのが特徴です。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳しくは<a href="https://www.city.nara.lg.jp/site/kosodate/10822.html" target="_blank" rel="noopener">奈良市公式サイト</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-04",
    popularity: 55,
  },
  {
    slug: "scoring-system-guide",
    citySlug: "nara",
    title: "奈良市の入園点数のしくみ　基本指数と調整指数を解説",
    description:
      "奈良市の保育園入園選考で使われる利用調整基準のしくみを解説します。",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>奈良市の選考指数とは</h2>
<p>奈良市の認可保育園は保育の必要性を指数化し、指数の高い世帯から優先的に利用内定となります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>利用調整指数 ＝ 基本指数（父＋母）＋ 加点その1 ＋ 加点その2</p>
</div>

<h2>基本指数（父母各最大100点、合計200点）</h2>
<p>就労の場合、月160時間以上で満点の<span class="highlight">100点</span>です。奈良市は就労時間が10段階に細分化されています。</p>

<table>
<tr><th>月の就労時間</th><th>指数</th></tr>
<tr><td>月160時間以上</td><td>100</td></tr>
<tr><td>月150〜159時間</td><td>95</td></tr>
<tr><td>月130〜149時間</td><td>90</td></tr>
<tr><td>月120〜129時間</td><td>85</td></tr>
<tr><td>月110〜119時間</td><td>80</td></tr>
<tr><td>月100〜109時間</td><td>75</td></tr>
<tr><td>月80〜99時間</td><td>70</td></tr>
<tr><td>月70〜79時間</td><td>65</td></tr>
<tr><td>月64〜69時間</td><td>63</td></tr>
</table>

<h2>調整指数の代表例</h2>
<h3>加点その1（最大1つのみ適用）</h3>
<ul>
<li>認可保育施設の保育士・看護師として勤務：<span class="highlight">+40点</span></li>
<li>ひとり親世帯：<span class="highlight">+30点</span></li>
<li>きょうだいが希望園に在園中：<span class="highlight">+25点</span></li>
<li>育児休業からの復帰：<span class="highlight">+14点</span></li>
<li>きょうだいが同じ園を希望：<span class="highlight">+11点</span></li>
</ul>
<h3>加点その2（重複可能）</h3>
<ul>
<li>認可外保育等を月64時間以上継続利用：<span class="highlight">+3点</span></li>
<li>保護者が単身赴任：<span class="highlight">+1点</span></li>
<li>65歳以上の祖父母同居（保育不要）：<span class="highlight">-5点</span></li>
<li>1年以内の内定辞退：<span class="highlight">-5点</span></li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>全項目は<a href="https://www.city.nara.lg.jp/site/kosodate/251831.html" target="_blank" rel="noopener">奈良市利用調整指数カリキュレーター</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-04",
    popularity: 65,
  },
  {
    slug: "score-up-tips",
    citySlug: "nara",
    title: "奈良市で入園点数を上げるコツ　加点チェックリスト",
    description:
      "奈良市の保育園入園選考で調整指数の加点を最大限に活用する方法を解説します。",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>基本指数200点は出発点</h2>
<p>奈良市ではフルタイム共働き世帯は基本指数<span class="highlight">200点</span>で横並びです。差がつくのは調整指数の加点です。</p>

<h2>加点チェックリスト</h2>
<table>
<tr><th>項目</th><th>点数</th><th>条件</th></tr>
<tr><td>保育士・看護師勤務</td><td>+40点</td><td>奈良市内の認可保育施設で勤務（予定含む）</td></tr>
<tr><td>ひとり親世帯</td><td>+30点</td><td>母子・父子家庭の場合</td></tr>
<tr><td>きょうだい在園</td><td>+25点</td><td>きょうだいが希望園に在園中</td></tr>
<tr><td>育児休業復帰</td><td>+14点</td><td>育児休業からの復帰に伴う申請</td></tr>
<tr><td>きょうだい同時申請</td><td>+11点</td><td>きょうだいが同じ園を希望して申請</td></tr>
<tr><td>認可外利用</td><td>+3点</td><td>認可外等を月64時間以上継続利用</td></tr>
<tr><td>単身赴任</td><td>+1点</td><td>保護者のどちらかが単身赴任</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>加点その1は最も高い1つだけが適用されます。保育士・看護師なら+40点が最大です。一般的な家庭ではきょうだい在園（+25点）や育休復帰（+14点）が大きな加点になります。</p>
</div>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>就労証明書の月間就労時間は正確に記載してください。奈良市は10段階の細かい区分があるため、数時間の差が点数に影響します。</p>
</div>`,
    publishedAt: "2026-04-04",
    popularity: 100,
  },
  {
    slug: "tiebreaker-rules",
    citySlug: "nara",
    title: "奈良市で同点になったらどうなる？優先順位を解説",
    description:
      "奈良市の保育園入園選考で同点だった場合の優先順位の判定方法を解説します。",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>同点時の判定方法</h2>
<p>奈良市の入園選考で合計指数が同点になった場合、さらに優先順位で判定されます。</p>

<h2>同点時に考慮される要素</h2>
<ul>
<li>保育の必要性がより高い世帯が優先</li>
<li>きょうだいが在園している園への申込は優先</li>
<li>ひとり親世帯は優先</li>
<li>待機期間が長い世帯が優先</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>奈良市は就労時間の区分が10段階と細かいため、他の自治体に比べて同点になりにくい制度設計です。ただし月160時間以上のフルタイム世帯同士は同点になりやすいため、加点その1の活用が鍵です。</p>
</div>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>同点時の優先順位の詳細は毎年の案内で確認してください。年度によって判定基準が変更されることがあります。</p>
</div>`,
    publishedAt: "2026-04-04",
    popularity: 85,
  },
  {
    slug: "part-time-work-score",
    citySlug: "nara",
    title: "奈良市で時短勤務だと点数はどう変わる？",
    description:
      "奈良市の保育園入園選考で時短勤務の場合の基本指数への影響を解説します。",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>奈良市は月の合計就労時間で判定</h2>
<p>奈良市の基本指数は月の合計就労時間で決まります。時短勤務の影響を確認しましょう。</p>

<table>
<tr><th>月の就労時間</th><th>基本指数</th></tr>
<tr><td>月160時間以上</td><td>100点</td></tr>
<tr><td>月150〜159時間</td><td>95点</td></tr>
<tr><td>月130〜149時間</td><td>90点</td></tr>
<tr><td>月120〜129時間</td><td>85点</td></tr>
<tr><td>月110〜119時間</td><td>80点</td></tr>
<tr><td>月100〜109時間</td><td>75点</td></tr>
<tr><td>月80〜99時間</td><td>70点</td></tr>
<tr><td>月70〜79時間</td><td>65点</td></tr>
<tr><td>月64〜69時間</td><td>63点</td></tr>
</table>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>月20日勤務で1日6時間の時短勤務の場合、月120時間で基本指数は<span class="highlight">85点</span>です。フルタイムの100点と比べて15点下がります。奈良市は就労時間の区分が細かいため、時短の影響が大きくなります。</p>
</div>

<h2>月160時間の壁</h2>
<p>満点の100点を得るには月160時間以上が必要です。1日8時間×20日＝160時間がちょうど満点ラインです。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>奈良市では月150時間台でも95点が確保できます。残業込みで月150時間を超えるなら、フルタイムとの差はわずか5点です。就労証明書の記載内容を確認しましょう。</p>
</div>`,
    publishedAt: "2026-04-04",
    popularity: 90,
  },
  {
    slug: "rejection-options",
    citySlug: "nara",
    title: "奈良市で保育園に落ちたときの選択肢",
    description:
      "奈良市の認可保育園に不承諾となった場合の対応策をまとめました。",
    image: "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>不承諾になったら</h2>
<p>奈良市で認可保育園に不承諾になった場合でも、複数の選択肢があります。</p>

<h3>1. 二次受付への申込</h3>
<p>一次受付後に空きが出た園について二次受付が行われます。</p>

<h3>2. 認可外保育施設の利用</h3>
<p>認可外保育施設を利用することで、翌年度の申込で<span class="highlight">+3点</span>の加点が見込めます（月64時間以上の継続利用が条件）。</p>

<h3>3. 企業主導型保育の利用</h3>
<p>企業主導型保育施設も認可外と同様に加点の対象です。月64時間以上の継続利用で+3点です。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>奈良市では認可外利用の加点は+3点と比較的小さいですが、育休復帰の加点（+14点）と合わせると大きな差になります。200点制では加点の積み上げが重要です。</p>
</div>

<h3>4. 途中入園</h3>
<p>空きが出た場合に途中入園が可能です。奈良市の受入可能状況は公式サイトで随時更新されています。</p>

<h3>5. 育休延長</h3>
<p>不承諾通知があれば育休を最長2歳まで延長できます。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>空き状況は<a href="https://www.city.nara.lg.jp/site/kosodate/10822.html" target="_blank" rel="noopener">奈良市公式サイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-04",
    popularity: 80,
  },
  {
    slug: "unlicensed-nursery-bonus",
    citySlug: "nara",
    title: "奈良市で認可外保育施設の利用で加点を得る方法",
    description:
      "奈良市では認可外保育施設の利用で+3点の加点が得られます。その条件を解説します。",
    image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>認可外利用の加点</h2>
<p>奈良市では企業主導型・認可外保育施設・一時預かり保育を月64時間以上継続利用している場合、加点その2で<span class="highlight">+3点</span>の加点が得られます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>奈良市の認可外利用の加点は+3点です。加点その2は重複加点が可能なため、単身赴任（+1点）と合わせれば+4点になります。</p>
</div>

<h2>対象となる施設</h2>
<ul>
<li>認可外保育施設</li>
<li>企業主導型保育施設</li>
<li>一時預かり保育（月64時間以上の継続利用）</li>
</ul>

<h2>加点その1との組み合わせ</h2>
<p>加点その1（最大1つ）と加点その2は併用できます。例えば育休復帰（+14点）と認可外利用（+3点）を合わせると<span class="highlight">+17点</span>が見込めます。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>月64時間以上の利用が条件です。利用証明書が必要になりますので、利用している施設に発行を依頼してください。</p>
</div>`,
    publishedAt: "2026-04-04",
    popularity: 75,
  },
  {
    slug: "next-year-changes",
    citySlug: "nara",
    title: "奈良市の令和8年度入園　変更点と注意事項",
    description:
      "奈良市の令和8年度保育園入園選考の注意点をまとめました。",
    image: "https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=800&h=400&fit=crop",
    category: "最新情報",
    categoryColor: "purple",
    content: `<h2>令和8年度の注意点</h2>
<p>奈良市の保育園入園制度は毎年見直しが行われます。最新の利用調整基準表を確認しましょう。</p>

<h2>確認すべきポイント</h2>
<ul>
<li>基本指数・調整指数の変更有無</li>
<li>新設園の情報</li>
<li>定員の増減</li>
<li>申込方法の変更</li>
</ul>

<h2>奈良市の特徴的な制度</h2>
<ul>
<li>就労時間が10段階と非常に細かく区分されている</li>
<li>加点その1は最大1つしか適用されない（最も高いものを選ぶ）</li>
<li>保育士・看護師への加点が+40点と全国的にも大きい</li>
<li>65歳以上の祖父母同居で-5点の減点がある</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>奈良市は公式サイトで利用調整指数カリキュレーターを提供しています。申込前に点数を試算してみましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新情報は<a href="https://www.city.nara.lg.jp/site/kosodate/10822.html" target="_blank" rel="noopener">奈良市公式サイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-04",
    popularity: 70,
  },
  {
    slug: "popular-areas",
    citySlug: "nara",
    title: "奈良市の人気エリアと入りやすい地域の傾向",
    description:
      "奈良市内で保育園の競争率が高いエリアと比較的入りやすい地域を解説します。",
    image: "https://images.unsplash.com/photo-1524813686514-a57563d77965?w=800&h=400&fit=crop",
    category: "エリア情報",
    categoryColor: "teal",
    content: `<h2>奈良市の保育園事情</h2>
<p>奈良市は奈良県の県庁所在地で中核市です。近鉄奈良線やJR大和路線沿線を中心に子育て世帯が多く住んでいます。</p>

<h2>競争率が高い傾向のエリア</h2>
<ul>
<li>近鉄奈良駅〜新大宮駅周辺：市の中心部で利便性が高い</li>
<li>学園前・登美ヶ丘エリア：住宅地として人気が高く子育て世帯が集中</li>
<li>大和西大寺駅周辺：近鉄の乗り換え駅で通勤に便利</li>
</ul>

<h2>比較的入りやすい傾向のエリア</h2>
<ul>
<li>東部エリア（田原・柳生方面）：郊外のため保育需要が低め</li>
<li>南部エリア（帯解・櫟本方面）：天理市寄りで園の選択肢がある</li>
<li>北部エリア（平城ニュータウン周辺）：新設園が増えている地域</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>奈良市は大阪のベッドタウンとしての側面があり、通勤経路上の園も含めて幅広く希望園を検討しましょう。</p>
</div>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>エリアの難易度は年度や年齢クラスによって変わります。最新の空き状況を市に確認してください。</p>
</div>`,
    publishedAt: "2026-04-04",
    popularity: 60,
  },
  {
    slug: "competition-reality",
    citySlug: "nara",
    title: "奈良市の保育園入園競争の実態",
    description:
      "奈良市の保育園入園はどのくらい厳しいのか。選考の実態を解説します。",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>奈良市の入園競争の現状</h2>
<p>奈良市は中核市の中では保育環境が比較的整っていますが、人気エリアでは依然として競争があります。</p>

<h2>ボリュームゾーン</h2>
<p>フルタイム共働き世帯は基本指数<span class="highlight">200点</span>で横並びです。ここに調整指数の加点で差がつきます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>きょうだい在園（+25点）や育休復帰（+14点）を加えた<span class="highlight">214〜225点</span>が人気園のボーダーラインとなることがあります。学園前エリアなどではこの水準が必要です。</p>
</div>

<h2>年齢別の傾向</h2>
<ul>
<li>0歳児クラス：園によっては入りやすい場合がある</li>
<li>1歳児クラス：最も競争が激しい年齢</li>
<li>2歳児クラス：空きが少ない</li>
<li>3歳児以上：認定こども園も含め枠が増えるため比較的入りやすい</li>
</ul>

<h2>減点に注意</h2>
<p>奈良市では65歳以上の祖父母が同居していて保育が不要な場合は<span class="highlight">-5点</span>、1年以内の内定辞退でも<span class="highlight">-5点</span>の減点があります。減点を避ける対策も重要です。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>求職活動中の基本指数は55点で、就労中（最大100点）の約半分です。求職中での入園は人気エリアでは困難です。</p>
</div>`,
    publishedAt: "2026-04-04",
    popularity: 95,
  },
  {
    slug: "nursery-visit-guide",
    citySlug: "nara",
    title: "奈良市の保育園見学のポイント　チェックリスト付き",
    description: "保育園見学で確認すべき開園時間・保育方針・駐車場・対応など、施設選びの重要ポイントをまとめました。",
    category: "園えらび",
    categoryColor: "teal",
    content: `<h2>見学前に確認すること</h2>
<p>奈良市の保育園見学は各施設に直接問い合わせて予約します。事前に最低限の情報を確認してから見学に臨みましょう。</p>

<h2>見学の予約と時期</h2>
<p>見学は各施設に直接申し込みます。4月入園の申請は12月なので、その前の秋までに回っておくと申込書に希望順を書きやすくなります。</p>

<h2>見学時にチェックすべき項目</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>基本情報</strong>
<p>開園時間・利用できる認定区分（標準時間11時間または短時間8時間）・お昼寝の対応・慣らし保育期間（通常10日前後〜1か月）。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>保育方針・発達対応</strong>
<p>園の保育理念・遊びや学びの方針・子どもの発達に応じた対応・特別な支援が必要な場合の相談体制。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>給食・アレルギー対応</strong>
<p>給食が自園調理か外部搬入か・アレルギー対応の詳細・食物アレルギーの診断書が必要か・栄養士の配置。</p>
</div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content">
<strong>病気・体調時の対応</strong>
<p>発熱時の対応（通常、発熱があると園から呼び出し）・投薬の可否・登園再開の条件・伝染病の連絡方法。</p>
</div>
</div>
<div class="step">
<div class="step-num">5</div>
<div class="step-content">
<strong>環境・安全面</strong>
<p>駐車場の有無と台数・送迎用駐車場利用料・園舎の清潔さ・安全管理・防犯体制。</p>
</div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>慣らし保育は園・お子さんによって10日前後〜1か月と幅があります。その間も保育料の減免はないため、復職時期の調整は事前に園に相談しておくと安心です。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>奈良市の施設一覧と詳細は<a href="https://www.city.nara.lg.jp/uploaded/attachment/216185.pdf" target="_blank" rel="noopener">奈良市「幼稚園・保育所・認定こども園・小規模保育事業一覧」（PDF）</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-09-14",
    popularity: 48,
  },
  {
    slug: "shurou-shoumeisho",
    citySlug: "nara",
    title: "奈良市の就労証明書の書き方　月間就労時間が点数を決める",
    description: "就労証明書の月間就労時間は1か月を4週として計算。時短勤務・内定者・自営業など、ケース別の記入方法を解説します。",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>月間就労時間は1か月＝4週で計算</h2>
<p>奈良市の基本指数は月の合計就労時間で決まります。<span class="highlight">1か月＝4週間として計算</span>されるため、実際のカレンダー日数ではありません。</p>

<h3>例：月160時間以上で満点100点</h3>
<p>1週間40時間×4週＝160時間。フルタイム勤務の場合、この計算で就労時間を記載します。</p>

<h2>時短勤務制度を使っている人へ</h2>
<p>短時間勤務制度を利用している場合は、<span class="highlight">制度を使う前の契約・規則上の就労時間</span>で判定されます。復帰後の予定勤務時間を記載することが重要です。</p>

<h2>内定者の就労証明書</h2>
<p>採用が決まっている場合、勤務先から次の内容が分かる採用通知書を提出します：</p>
<ul>
<li>採用日またはいつから勤務するか</li>
<li>その月の予定勤務時間</li>
<li>勤務先・部署</li>
</ul>

<h2>自営業の場合</h2>
<p>自営業等申立書に加えて、以下の書類を提出：</p>
<ul>
<li>前年の確定申告書（第一表・第二表）</li>
<li>法人登記簿</li>
<li>営業許可証</li>
<li>開廃業届など、事業開始を証明する書類</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>奈良市は就労時間が10段階に細かく分かれています。月150〜159時間と160時間以上では5点差がつきます。正確な時間を記載してください。</p>
</div>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>無報酬の仕事（家事など）は就労に含まれません。内職は「内職を含む」と指数表に記載されており、計上できます。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>就労時間の刻みと点数は<a href="https://www.city.nara.lg.jp/uploaded/attachment/209966.pdf" target="_blank" rel="noopener">奈良市の利用基本指数表（PDF）</a>、提出書類は<a href="https://www.city.nara.lg.jp/site/kosodate/261513.html" target="_blank" rel="noopener">利用の手引き</a>で確認できます。点数は<a href="/nara">奈良市の点数シミュレーター</a>でも試算できます。</p>
</div>`,
    publishedAt: "2026-09-14",
    popularity: 52,
  },
  {
    slug: "shinsei-shorui-list",
    citySlug: "nara",
    title: "奈良市の申込に必要な書類一覧　6点セットをまとめました",
    description: "奈良市の保育園申込に必要な6つの書類一覧。65歳未満の同居祖父母の書類・課税証明書の年度・電子申請の流れを解説します。",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>申込に必須の6つの書類</h2>
<p>奈良市の認可保育園に申し込むには、以下の6点を揃えて提出します。原則電子申請（LoGoフォーム）が推奨されています。</p>

<table>
<tr><th>書類</th><th>説明</th></tr>
<tr><td>1. 認定申請兼利用申込書</td><td>申込書の様式。転園の場合は転所申請書。</td></tr>
<tr><td>2. 本人確認書類</td><td>申請者（保護者）の運転免許証やマイナンバーカードの写し。</td></tr>
<tr><td>3. 保育必要性の証明書と確認書類</td><td>就労証明書や採用通知書（会社員等）、自営業申立書＋確定申告書（自営業）など。<span class="highlight">保護者全員分</span>。</td></tr>
<tr><td>4. 利用調整調査書・子どもの健康調査票</td><td>世帯構成や子どもの健康状況を確認する書類。</td></tr>
<tr><td>5. 確認書及び同意書</td><td>市の確認・同意事項に署名する書類。</td></tr>
<tr><td>6. 市区町村民税課税（非）課税証明書</td><td>保育料を決めるため、本年1月1日時点で奈良市外に住民票があった方が対象。保護者全員分。年度は申請時期による。</td></tr>
</table>

<h2>65歳未満の同居祖父母について</h2>
<p>祖父母と同居している場合、祖父母の保育の必要性がなくても<span class="highlight">祖父母の保育必要性の申立書と確認書類が必要</span>です。</p>

<h2>課税証明書の年度に注意</h2>
<p><span class="highlight">令和8年8月入所申請までは令和7年度</span>の課税証明書。<span class="highlight">9月入所申請以降は令和8年度</span>のもの。申請時期によって必要な年度が違うため、確認してから請求しましょう。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>原則電子申請（LoGoフォーム）での提出が推奨されています。書類に不備があると利用調整に間に合わない場合があるため、事前に子ども給付課の窓口で確認を受けるのがおすすめです。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳しくは<a href="https://www.city.nara.lg.jp/site/kosodate/261513.html" target="_blank" rel="noopener">奈良市「利用の手引き（案内ページ）」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-09-14",
    popularity: 56,
  },
  {
    slug: "niji-shinsei-flow",
    citySlug: "nara",
    title: "奈良市で保留になった後の流れ　再申請は不要です",
    description: "保留通知は前月25日に郵送。有効期限まで自動継続で毎月再申請は不要。変更があれば届出が必要。",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>保留（利用保留・不可）通知の受け取り</h2>
<p>奈良市では「保留」のことを「利用保留（不可）」と呼びます。保留の通知は<span class="highlight">初回のみ郵送</span>され、前月25日に郵送されます（例えば9月入園なら8月25日）。4月入園だけは2月16日頃の郵送です。</p>

<h2>有効期限内は自動継続</h2>
<p>重要なのが、保留になった場合でも<span class="highlight">有効期限まで自動的に利用調整が継続される</span>ということ。毎月の再申請は不要で、翌月以降の利用調整でも自動的に審査の対象になります。</p>

<h2>変更があれば届出が必要</h2>
<p>ただし以下の変更があった場合は速やかに届け出を：</p>
<ul>
<li>勤務先が変わった</li>
<li>就労時間が変わった</li>
<li>引越して住所が変わった</li>
<li>希望園を変更したい</li>
<li>その他申込内容に変更があった</li>
</ul>

<h2>保留から内定への道</h2>
<p>毎月の利用調整で順位が上がり、受入可能数に達すれば<span class="highlight">前月の20日前後に電話で内定通知</span>が来ます。その後、認定園で面談が行われます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>保留が続いても、自動継続されるため何もしなくて大丈夫です。ただし就労条件が変わったら、正確に届け出ることが大切。条件の変更を隠して申告するのは避けましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳細は<a href="https://www.city.nara.lg.jp/site/kosodate/245396.html" target="_blank" rel="noopener">奈良市「教育・保育給付認定申請兼施設利用申込」</a>ページで確認できます。</p>
</div>`,
    publishedAt: "2026-09-14",
    popularity: 54,
  },
  {
    slug: "hokatsu-calendar",
    citySlug: "nara",
    title: "奈良市の保活カレンダー　入園月ごとの申込時期・結果確認日まとめ",
    description: "5月～12月入所は3か月前～前月10日、1・2月は11月、3月は11月中旬、4月は12月中旬の申込。結果通知のタイミングも掲載。",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>令和8年度（2026年度）の入園スケジュール</h2>
<p>奈良市は入園希望月によって申込期間が決まっています。以下のカレンダーで動き始める時期を確認しましょう。</p>

<table>
<tr><th>入所希望月</th><th>申請期間（必着）</th></tr>
<tr><td>5月～12月</td><td>入所希望月の3か月前 から 前月10日 まで（10日が閉庁日なら直前の開庁日）</td></tr>
<tr><td>令和9年1月・2月</td><td>令和8年11月2日～11月30日（予定）</td></tr>
<tr><td>令和9年3月</td><td>令和8年11月16日～12月4日（予定）</td></tr>
<tr><td>令和9年4月</td><td>令和8年12月7日～12月18日（予定）</td></tr>
</table>

<h2>結果の通知方法</h2>
<p>内定は電話、保留（不可）は郵送で、通知の時期は入所希望月ごとに決まっています。保留通知は初回だけで、有効期限内は翌月以降も自動的に審査が続きます。</p>

<h2>電話で結果を確認できる日</h2>
<p>内定は前月の20日前後に<span class="highlight">電話で通知</span>。保留は前月25日に<span class="highlight">郵送で通知</span>（初回のみ）。電話での結果確認ができる日（申込ページ参照）：</p>
<ul>
<li>5月入所 → 4月27日</li>
<li>6月 → 5月25日、7月 → 6月25日、8月 → 7月27日、9月 → 8月25日</li>
<li>10月 → 9月25日、11月 → 10月26日、12月 → 11月25日</li>
<li>1月 → 12月25日、2月 → 12月25日、3月 → 1月15日、4月 → 2月16日</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>2月・3月・4月入園の申請期間が秋に集中しています。特に4月入園は競争が激しい時期。早めに書類を揃えておくと安心です。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳細な日程は<a href="https://www.city.nara.lg.jp/site/kosodate/245396.html" target="_blank" rel="noopener">奈良市「教育・保育給付認定申請兼施設利用申込」</a>で確認してください。</p>
</div>`,
    publishedAt: "2026-09-14",
    popularity: 58,
  },
  {
    slug: "tennen-moshikomi",
    citySlug: "nara",
    title: "奈良市の年度途中入所　毎月受付で対応、新生児は出生届後から",
    description: "年度途中入所は毎月受付。受入可能数は締切後に確認。新生児は出生届後に申込可。預けられるのは受入年齢到達の翌月1日から。",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>年度途中（5月～3月）の申込方法</h2>
<p>4月入園で入園できなかった場合、翌月5月以降も毎月申し込むことができます。毎月の申込締切日は<span class="highlight">前月10日（閉庁日なら直前の開庁日）</span>です。</p>

<h2>受入可能数の確認タイミング</h2>
<p>申込時に「この施設は何人入園できるか」という問い合わせには市は答えられません。申込締切の<span class="highlight">後に確認</span>するため、受入人数は締切日までは教えてもらえません。ただし前月の受入状況なら教えてもらえるため、参考にするのも方法です。</p>

<p>当サイトの<a href="/nara/vacancy">奈良市の空き状況</a>ページでは、受け入れがある施設を「○」「△」で表示しています。参考情報としてご活用ください。</p>

<h2>新生児の申込</h2>
<p>お子さんが0歳児の場合、生まれてから<span class="highlight">出生届を提出した後</span>から申し込みが可能です。出生届を出したあと、入所希望月の申請期間内に申し込む流れです。</p>

<h2>預けられるようになる時期</h2>
<p>重要なのが「預けることができるのは、受入年齢に到達した翌月1日」という規則です。例えば0歳児を対象とする施設でも、月齢が施設の受入対象に達した翌月1日から利用開始になります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>毎月受付される仕組みなので、4月入園で入園できなくても、その後も月ごとに新しい受付があります。希望する園の受入状況は毎月変わるため、複数月チャレンジするのも戦略です。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳しくは<a href="https://www.city.nara.lg.jp/site/kosodate/10822.html" target="_blank" rel="noopener">奈良市「利用手続の総合ページ」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-09-14",
    popularity: 50,
  },
  {
    slug: "tenkyo-hokatsu",
    citySlug: "nara",
    title: "奈良市の保活と転入・転出の手続き　広域利用の3条件を確認",
    description: "転入予定は転入申立書＋書類一式、利用開始月1日までに転入届と認定完了が条件。転出は月末退園。広域継続の3条件を解説。",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>転入予定で奈良市の園を希望する場合</h2>
<p>他県や市外から奈良市に転入予定で、奈良市の保育園に入園を希望する場合は、<span class="highlight">転入に関する申立書を提出</span>します。</p>

<h3>転入予定の申込手続</h3>
<ul>
<li>通常の書類一式（申込書・就労証明書など）＋転入に関する申立書を申込締切日までに直接提出</li>
<li>利用開始月の1日までに転入届と認定手続が完了していることが条件</li>
<li>未完了だと取消・審査対象外になる場合がある</li>
</ul>

<h2>転出する時の手続き</h2>
<p>奈良市から転出する場合、原則として転出日の属する月の月末で退園になります。ただし広域利用の手続を取れば、転出先でも継続利用できる場合があります。</p>

<h2>広域利用の3つの条件</h2>
<p>転出後も奈良市の園を使い続けるには、以下の3条件をすべて満たす必要があります：</p>
<ul>
<li>①奈良市の保育を必要とする理由の要件を満たしている</li>
<li>②転出先の自治体が広域利用を許可している</li>
<li>③在園している園が広域継続を許可している</li>
</ul>

<p>広域利用の期間は<span class="highlight">最大で入園した年度の年度末まで</span>。継続を希望する場合は再申込が必要で、継続できるとは限りません。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>転入予定で申し込むときは、転入先の奈良市へ直接申し込みます。逆に奈良市在住で市外の園を希望する場合は、希望する市区町村の締切日の1週間前までに奈良市の子ども給付課へ出します。</p>
</div>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>妊娠・出産を理由に入園している場合や育休中の場合、広域継続はできません。理由が終了したと判定される場合も退園になるため、詳しくは市に相談してください。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>広域利用について詳しくは<a href="https://www.city.nara.lg.jp/site/kosodate/261513.html" target="_blank" rel="noopener">奈良市「利用の手引き」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-09-14",
    popularity: 46,
  },
  {
    slug: "fushoninchi-taiou",
    citySlug: "nara",
    title: "奈良市で保留（不承諾）になった時の対応　認可外・一時預かりで加点",
    description: "市は「利用保留（不可）」と呼ぶ。通知は初回のみ。育休延長の条件・認可外月64時間以上で+3点について解説。",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>奈良市での「保留」の正式名称</h2>
<p>認可保育園の選考で入園できない場合、奈良市では「<span class="highlight">利用保留（不可）</span>」と呼びます。通知は初回のみ前月25日に郵送されます。</p>

<h2>有効期限内は自動継続</h2>
<p>保留になっても、<span class="highlight">有効期限の当月まで自動的に利用調整が継続</span>されます。毎月の再申請は不要で、翌月以降も自動で審査されます。変更があれば届出をしてください。</p>

<h2>育休延長の判断</h2>
<p>保留になった場合、育休を延長できるか判断する際は以下の規則を確認：</p>
<ul>
<li>上の子が「育児休業取得による継続」を理由に在園している場合、その認定は育休満了日の月末まで（<span class="highlight">最大で下の子が1歳に達する日の前日の月末まで</span>）です</li>
<li>期間内に保育園に入園できれば、育休から復帰します</li>
<li>育休要件で在園中に下の子が保留になったら、下の子を継続申込することを前提に上の子の継続も可能</li>
</ul>

<h2>認可外・一時預かりで加点する方法</h2>
<p>保留中に認可外保育施設・企業主導型保育・一時預かり保育を<span class="highlight">月64時間以上継続利用</span>していると、加点その2で<span class="highlight">+3点</span>が付きます（加点その2は他の加点と重複できます）。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>月64時間は、1日8時間×8日程度の利用に相当します。この水準を満たしていれば、毎月の調整で加点される仕組みです。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳しくは<a href="https://www.city.nara.lg.jp/site/kosodate/261513.html" target="_blank" rel="noopener">奈良市「利用の手引き」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-09-14",
    popularity: 52,
  },
  {
    slug: "taiki-jidou-taisaku",
    citySlug: "nara",
    title: "奈良市の待機児童　令和7年4月1日は14人、隠れ待機児童236人",
    description: "待機児童14人だが育児休業中236人・特定園のみ希望13人。認可外・企業主導型・一時預かりの選択肢を解説。",
    category: "データ",
    categoryColor: "purple",
    content: `<h2>令和7年4月1日の待機児童数</h2>
<p>奈良市の公式な待機児童数は<span class="highlight">14人</span>です。ただし、この数字だけでは保活の実態は分かりません。</p>

<h3>待機児童の内訳</h3>
<table>
<tr><th>年齢</th><th>人数</th></tr>
<tr><td>0歳児</td><td>1人</td></tr>
<tr><td>1歳児</td><td>6人</td></tr>
<tr><td>2歳児</td><td>6人</td></tr>
<tr><td>3歳以上児</td><td>1人</td></tr>
</table>

<h2>「隠れ待機児童」の存在</h2>
<p>実は、以下のケースは公式な待機児童にカウントされません：</p>
<ul>
<li><span class="highlight">育児休業中</span>：236人</li>
<li>特定の園のみを希望：13人</li>
<li>求職活動を休止中：14人</li>
</ul>

<p>つまり、実際に保育が必要で園を探している人数は、公式の14人より多いと読めます。</p>

<h2>保留になった時の選択肢</h2>
<p>認可保育園の内定がもらえない場合、以下の選択肢があります：</p>
<ul>
<li><strong>認可外保育施設</strong>：料金は施設ごと。月64時間以上の継続利用で+3点</li>
<li><strong>企業主導型保育</strong>：企業従業員向け。月64時間以上利用で+3点加点</li>
<li><strong>一時預かり保育</strong>：認可園の一時預かり。月64時間以上利用で+3点加点</li>
<li><strong>新2号認定を受ければ</strong>一時預かり保育が月額11,300円まで無償になる仕組みもあります</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>認可外などを活用して月64時間以上利用することで、翌月以降の利用調整で+3点の加点が入ります。これが入園に近づく戦略になる場合があります。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新の待機児童統計は<a href="https://www.cfa.go.jp/policies/hoiku/torimatome/r7" target="_blank" rel="noopener">こども家庭庁「保育所等関連状況取りまとめ（令和7年4月1日）」</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-09-14",
    popularity: 55,
  },
  {
    slug: "kyoiku-hoiku-chigai",
    citySlug: "nara",
    title: "幼稚園・こども園と保育所の違い　教育部分と保育部分の申込方法",
    description: "1号認定は各園へ直接申込。2・3号認定は市へ申込。教育部分は無償、保育は標準時間11時間または短時間8時間。",
    category: "園えらび",
    categoryColor: "teal",
    content: `<h2>認定区分による申込先の違い</h2>
<p>奈良市の「幼稚園・こども園・保育所」は、認定区分によって申込先が異なります。</p>

<h3>1号認定（主に教育）</h3>
<p>幼稚園や認定こども園の「教育部分」が対象。各園に直接申し込みます。市には申込みません。</p>

<h3>2号・3号認定（主に保育）</h3>
<p>保育所や認定こども園の「保育部分」が対象。奈良市（子ども給付課）に申し込みます。</p>

<h2>無償化の対象</h2>
<p><span class="highlight">1号認定の教育部分は全員無償</span>。3～5歳児クラスの<span class="highlight">2号認定の保育部分も全員無償</span>です。ただし0～2歳児の保育料は世帯の所得に応じて決まります。</p>

<h2>必要な保育時間で区分が決まる</h2>
<ul>
<li><strong>保育標準時間</strong>：父母ともに月120時間以上の就労が必要。1日最大11時間利用可能</li>
<li><strong>保育短時間</strong>：ひとりでも月64～120時間未満の就労。1日最大8時間利用可能</li>
</ul>

<h2>認定こども園の選び方のポイント</h2>
<p>認定こども園には「幼保連携型」「幼稚園型」「保育所型」があり、教育と保育の両方の入り口を持っています。希望する時間帯（教育のみか、教育＋保育か）で選択できます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>3～5歳児で「保育部分が必要な時間」がしっかり決まっていれば、保育所よりも対象園が増える場合があります。教育と保育の両方が必要なら、認定こども園という選択肢も視野に。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>施設一覧と詳細は<a href="https://www.city.nara.lg.jp/uploaded/attachment/216185.pdf" target="_blank" rel="noopener">奈良市「幼稚園・保育所・認定こども園・小規模保育事業一覧」（PDF）</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-09-14",
    popularity: 49,
  },
  {
    slug: "souba-tensuu",
    citySlug: "nara",
    title: "奈良市 世帯タイプ別の点数　共働き・片働き・ひとり親の計算例",
    description:
      "奈良市の保育園入園で、共働き・片働き・ひとり親など世帯タイプごとの基本指数を計算例で解説します。",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>奈良市の基本指数は父母各100点の合計200点満点</h2>
<p>奈良市の入園選考は父母ごとに基本指数を計算し、保護者ごとに最も高い指数を1つ計上します。父母それぞれ最大100点、合計200点が満点です。</p>

<h2>世帯タイプ別の計算例</h2>
<h3>共働き・フルタイムの場合</h3>
<p>父母ともに月160時間以上の就労で各100点です。</p>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>共働き・夫婦とも160時間以上</strong>
<p>父100点 ＋ 母100点 ＝ <span class="highlight">200点（満点）</span></p>
</div>
</div>

<h3>共働き・片方が短時間の場合</h3>
<p>一方が時短勤務や育児と両立している場合の例です。</p>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>父160時間・母100〜109時間（月100〜109時間は月75点）</strong>
<p>父100点 ＋ 母75点 ＝ <span class="highlight">175点</span></p>
</div>
</div>

<h3>ひとり親世帯の場合</h3>
<p>父・母どちらか一方がいない場合、不存在側は基本指数100点の扱いです。</p>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>ひとり親・フルタイム勤務（月160時間以上）</strong>
<p>在籍親100点 ＋ 不存在側100点 ＝ <span class="highlight">200点</span></p>
</div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>奈良市では不存在（離婚・死別・未婚等）は自動的に基本指数100点として扱われます。働いていない場合も100点です。つまりひとり親はフルタイム共働き世帯と同じ200点になります。</p>
</div>

<h2>調整指数で差をつける</h2>
<p>基本指数200点は共働きとひとり親で同じですが、加点その1の「ひとり親＋30点」を加えるとひとり親は<span class="highlight">230点</span>になり、その他の世帯を上回ります（ひとり親の加点は最も高い加点その1なので、きょうだい在園の+25点や育休復帰の+14点とは重複不可）。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>就労時間は就労証明書の記載で判断され、1か月を4週として計算します。時間の刻みは5点ずつ違うので、記載間違いは点数に直結します。就労証明書は事業主に正確に書いてもらいましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳細な計算例は<a href="https://www.city.nara.lg.jp/site/kosodate/251831.html" target="_blank" rel="noopener">奈良市利用調整指数カリキュレーター</a>で試算できます。</p>
</div>`,
    publishedAt: "2026-09-14",
    popularity: 45,
  },
  {
    slug: "self-employed-score",
    citySlug: "nara",
    title: "奈良市 自営業・フリーランスの入園点数と証明書の提出",
    description:
      "奈良市で自営業・フリーランスが保育園に申し込む際の就労証明と基本指数の考え方を解説します。",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>自営業・フリーランスは月の就労時間で判定</h2>
<p>奈良市では自営業やフリーランスも会社員と同じ基準で評価されます。給与ではなく月の就労時間が判定の基準です。</p>

<h2>必要な証明書類</h2>
<p>自営業・フリーランスが申し込む場合、単なる申立書だけでなく、複数の書類の提出が求められます。</p>
<ul>
<li><strong>自営業等申立書</strong>：勤務形態・就労時間を記載</li>
<li><strong>確定申告書</strong>：前年の第一表・第二表（所得と事業内容の確認）</li>
<li><strong>その他の証明書</strong>：法人登記簿・営業許可証・開廃業届など、事業の実在と継続を確認できる書類</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>単発の仕事ではなく<span class="highlight">月64時間以上の継続的な就労</span>が「保育を必要とする理由」として認められます。月単位の平均就労時間を計算して申立書に記入してください。</p>
</div>

<h2>月160時間以上のフリーランスの場合</h2>
<p>月の総就労時間が160時間以上なら、基本指数は満点の<span class="highlight">100点</span>です。ただし月によって就労時間が変動する場合は、安定的な見込み時間の提示が必要です。</p>

<h2>月64時間未満は対象外</h2>
<p>自営業・フリーランスで月64時間未満の場合は、保育を必要とする理由の要件を満たさないため、保育園の利用対象にはなりません。起業準備中でまだ就労実績がない場合は、「求職活動（起業準備を含む）」の理由で申し込む形になり、基本指数は55点です。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>収入金額と月間就労時間が見合っていることが重要です。確定申告書の売上と提示した時間が大きく乖離すると、審査で指摘される可能性があります。事実に基づいた申告をしましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>必要書類の詳細は<a href="https://www.city.nara.lg.jp/site/kosodate/261513.html" target="_blank" rel="noopener">奈良市利用の手引き</a>（PDF）をご確認ください。</p>
</div>`,
    publishedAt: "2026-09-14",
    popularity: 40,
  },
  {
    slug: "naishoku-score",
    citySlug: "nara",
    title: "奈良市 内職・在宅ワークは基本指数の対象　点数の付け方を解説",
    description:
      "奈良市の保育園入園選考で内職・在宅ワークの就労時間をどう扱うか、指数表の「内職を含む」の意味を解説します。",
    category: "制度を知る",
    categoryColor: "rose",
    content: `<h2>奈良市の指数表は「内職を含む」と明記</h2>
<p>奈良市では会社勤めと同等に<span class="highlight">内職・在宅ワークも就労に含まれます</span>。月の総就労時間で基本指数が決まります。</p>

<h2>内職・在宅ワークの時間カウント</h2>
<p>内職や在宅ワークの就労時間は、実際に作業に従事した時間として計算します。月160時間以上なら基本指数は満点の100点です。</p>

<table>
<thead>
<tr><th>月の就労時間（内職を含む）</th><th>基本指数</th></tr>
</thead>
<tbody>
<tr><td>月160時間以上</td><td>100点</td></tr>
<tr><td>月150〜159時間</td><td>95点</td></tr>
<tr><td>月130〜149時間</td><td>90点</td></tr>
<tr><td>月120〜129時間</td><td>85点</td></tr>
<tr><td>月110〜119時間</td><td>80点</td></tr>
<tr><td>月100〜109時間</td><td>75点</td></tr>
<tr><td>月80〜99時間</td><td>70点</td></tr>
<tr><td>月70〜79時間</td><td>65点</td></tr>
<tr><td>月64〜69時間</td><td>63点</td></tr>
</tbody>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>内職の時間刻みは会社員と同じです。月64時間以上の継続的な内職があれば、保育を必要とする要件を満たします。</p>
</div>

<h2>無報酬の作業は対象外</h2>
<p>見習いやボランティアなど<span class="highlight">無報酬の作業は保育を必要とする理由に含まれません</span>。報酬があること（給与・単価）が前提です。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>内職の証明も事業者からの就労証明書で行います。就労時間は「それに見合う収入があること」が指数表の条件になっているので、見込みだけの時間では認められません。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>指数表の詳細は<a href="https://www.city.nara.lg.jp/uploaded/attachment/209966.pdf" target="_blank" rel="noopener">奈良市 保育所等の利用基本指数表・調整指数表（PDF）</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-09-14",
    popularity: 38,
  },
  {
    slug: "tenshoku-timing",
    citySlug: "nara",
    title: "奈良市 転職・退職と保活のタイミング　いつやめてもいい？",
    description:
      "奈良市の保育園入園申込から入園後にかけて、転職や退職をする場合の注意点と手続きを解説します。",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>入園申込の段階で就労予定を申告できる</h2>
<p>奈良市では入園申込時点で「採用予定」であれば、採用通知書があれば申し込めます。採用日・月の勤務時間・勤務先が記載されていることが条件です。</p>

<h2>退職・転職と利用要件の変更</h2>
<p>入園後に退職する場合、保育が必要とされる理由が変わります。退職により就労要件を失うと、別の要件（求職活動等）への変更が必要です。</p>

<h3>退職後は求職活動要件へ変更</h3>
<p>退職した場合、<span class="highlight">求職活動を開始することで短時間認定に変更</span>できます。求職活動要件は基本指数<span class="highlight">55点</span>で、最大2か月間（求職活動開始から2か月後の月末まで）継続利用できます。</p>

<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>退職の決定</strong>
<p>市に認定変更の手続きをして、保育を必要とする理由を「求職活動」に変更します。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>2か月以内に再就職</strong>
<p>求職活動要件で利用を継続しながら、新しい就職先を探します。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>再就職後に要件を変更</strong>
<p>新しい勤務先が決まったら、就労要件に変更します。</p>
</div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>求職活動要件での継続は<span class="highlight">年度内1回のみ</span>です。一度求職活動要件を使ったら、その年度中に同じ理由での変更はできません。</p>
</div>

<h2>入園直後の退職は注意</h2>
<p>入園から短期間での退職は、保育の継続性に疑問を生じさせます。市の判断により退園を求められる場合があります。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>必要量の変更は毎月15日までに申請する必要があります。遡って変更することはできません。転職予定がある場合は早めに相談してください。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳細は<a href="https://www.city.nara.lg.jp/site/kosodate/10822.html" target="_blank" rel="noopener">奈良市 子育て支援サイト</a>でご確認ください。</p>
</div>`,
    publishedAt: "2026-09-14",
    popularity: 42,
  },
  {
    slug: "kyushoku-hokatsu",
    citySlug: "nara",
    title: "奈良市 求職活動中の保活　無職での申込手続きと継続条件",
    description:
      "奈良市で求職活動中（現在失業中・就職探索中）での保育園申込と利用継続の条件を解説します。",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>求職活動中でも保育園に申し込める</h2>
<p>奈良市では求職活動中（就職を探している状態）を保育を必要とする理由として認めています。ただし申込と継続に条件があります。</p>

<h2>求職活動要件の基本</h2>
<p>求職活動中の基本指数は<span class="highlight">55点</span>で、認定区分は<span class="highlight">保育短時間（月64時間以上120時間未満）</span>です。フルタイム就労（月120時間以上）とは異なります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>求職活動は年度内1回のみの利用です。一度求職活動要件で保育園を利用すると、その年度中は同じ理由での再利用はできません。計画的に利用しましょう。</p>
</div>

<h2>求職活動の期間は2か月</h2>
<p>求職活動の要件は<span class="highlight">求職活動開始から2か月後の月末まで</span>有効です。この間に再就職することが前提です。</p>

<h3>求職活動を開始した月の例</h3>
<ul>
<li>4月に求職活動開始 → 6月末まで利用可能</li>
<li>8月に求職活動開始 → 10月末まで利用可能</li>
</ul>

<h2>求職活動に含まれる活動</h2>
<ul>
<li>求職活動を常態としていること（積極的な求職活動が確認できるもの）</li>
<li>起業準備をしていること（準備内容が確認できるもの）</li>
<li>インターンシップ制度を利用する学生</li>
</ul>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>2か月経過時点で再就職できていない場合、保育園の利用は終了となります。認可外施設や一時預かりなど、事前に次のステップを検討しておきましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>求職活動の詳しい条件は<a href="https://www.city.nara.lg.jp/uploaded/attachment/212153.pdf" target="_blank" rel="noopener">奈良市 保育所等の利用のてびき（PDF）</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-09-14",
    popularity: 41,
  },
  {
    slug: "tanshin-funin",
    citySlug: "nara",
    title: "奈良市 単身赴任世帯の加点と就労認定　夫婦別居のとき",
    description:
      "奈良市の保育園入園選考で、夫婦のどちらかが単身赴任している場合の加点と就労の判定方法を解説します。",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>単身赴任は加点その2で+1点</h2>
<p>奈良市では保護者のどちらかが単身赴任している場合、加点その2で<span class="highlight">+1点</span>の加点が得られます。</p>

<h2>夫婦それぞれの就労時間で計算</h2>
<p>単身赴任の場合、基本指数は別々に計算されます。赴任先での勤務時間と、赴任していない方の時間をそれぞれ判定します。</p>

<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>赴任先での就労時間</strong>
<p>赴任先の就労証明書で月間就労時間を確認。月100時間以上なら75点以上の基本指数です。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>赴任していない方の就労時間</strong>
<p>子育てと仕事を両立している場合の月間就労時間で判定。月80時間以上なら70点以上の基本指数です。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>加点その2の+1点を加算</strong>
<p>基本指数の合計に加点その2の+1点が上乗せされます（加点その2は重複可能）。</p>
</div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>単身赴任は<span class="highlight">夫婦が別々の地域に住んでいる状態</span>が条件です。赴任先の就労証明書と、赴任していない方の就労証明書の両方が必要になります。</p>
</div>

<h2>標準時間認定への特例</h2>
<p>奈良市では就労時間が月120時間以上で標準時間、月64〜120時間未満で短時間認定となります。ただし施設から遠い勤務地などの特例により、月96〜120時間未満でも標準時間に認定される場合があります。単身赴任で赴任先が遠い場合も該当する可能性があります。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳細は<a href="https://www.city.nara.lg.jp/site/kosodate/251831.html" target="_blank" rel="noopener">奈良市利用調整指数カリキュレーター</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-09-14",
    popularity: 38,
  },
  {
    slug: "sofu-sobo-doukyo",
    citySlug: "nara",
    title: "奈良市 祖父母と同居するときの加点・減点と保育料への影響",
    description:
      "奈良市の保育園入園選考と保育料の計算で、同居する祖父母がどう影響するか解説します。",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>65歳以上の祖父母同居は−5点の減点</h2>
<p>奈良市では65歳以上の祖父母が同居していて、その祖父母に保育が必要な理由がない場合、加点その2で<span class="highlight">−5点</span>の減点があります。</p>

<h2>減点の意味</h2>
<p>祖父母が子どもを見守ることができると判断されるため、保育の必要性が低いと評価されます。ただし祖父母が介護や疾病で子どもを見る余裕がない場合は、その旨を証明することで減点が回避できます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>減点の対象になるのは<span class="highlight">「65歳以上」で「保育が必要な理由がない」祖父母</span>と同居している場合です。祖父母が就労・介護・療養中などで保育が必要な理由に当たるなら、その理由証明書を添えることで減点にはなりません。</p>
</div>

<h2>65歳未満の祖父母同居の場合</h2>
<p>65歳未満の祖父母が同居している場合も<span class="highlight">理由証明書の提出が必須</span>です。同居祖父母自身に就労や介護などの理由があり、子どもを見守る余裕がないことを示す必要があります。</p>

<h2>保育料への影響</h2>
<p>保育料は「家計の主宰者」をもとに決定されます。同居の祖父母が子ども・保護者を扶養にしている場合、または保護者の年収が約130万円未満の場合は、祖父母を家計の主宰者として<span class="highlight">税額を合算される可能性があります</span>。この場合、保育料が高くなることがあります。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>同居世帯の市民税所得割課税額は合算される場合があります。同居する祖父母の年収が高い場合、保育料の階層が上がる可能性を考慮しておきましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>家計の主宰者の判定条件は<a href="https://www.city.nara.lg.jp/uploaded/attachment/209236.pdf" target="_blank" rel="noopener">奈良市 保育料PDF</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-09-14",
    popularity: 39,
  },
  {
    slug: "single-parent-guide",
    citySlug: "nara",
    title: "奈良市 ひとり親の保活　入園点数・保育料・加点のルール",
    description:
      "奈良市でひとり親（母子・父子家庭）が保育園に申し込むときの基本指数、加点、保育料の扱いを解説します。",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>ひとり親は不存在側が自動100点</h2>
<p>奈良市ではひとり親世帯の場合、<span class="highlight">親がいない側は自動的に基本指数100点</span>として扱われます。つまり片親がいなくても、就労していなくても100点が確保されます。</p>

<h2>ひとり親の基本指数計算例</h2>
<ul>
<li><strong>ひとり親・フルタイム就労（月160時間以上）</strong>：就労親100点 ＋ 不存在側100点 ＝ 200点（満点）</li>
<li><strong>ひとり親・月100〜109時間</strong>：就労親75点 ＋ 不存在側100点 ＝ 175点</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>ひとり親はフルタイム共働き世帯と同じ200点が狙えます。加点その1の「ひとり親＋30点」を組み合わせると230点となり、通常世帯を上回ります。</p>
</div>

<h2>加点その1の「ひとり親+30点」は最も高い1つだけ</h2>
<p>ひとり親の+30点は加点その1に該当します。加点その1は「最も高い1つだけ」の原則があるため、以下の加点と重複できません。</p>
<ul>
<li>きょうだいが希望園に在園中（+25点）→ ひとり親の方が大きいので+30点が適用</li>
<li>育児休業からの復帰（+14点）→ ひとり親の方が大きいので+30点が適用</li>
<li>きょうだいが同じ園を希望（+11点）→ ひとり親の方が大きいので+30点が適用</li>
</ul>

<h2>ひとり親世帯の保育料階層</h2>
<p>保育料（0〜2歳児）はひとり親専用の階層が用意されています。同じ市民税所得割課税額でも、ひとり親はより低い保育料に設定されています。例えば市民税所得割57,700円未満の場合、ひとり親は月6,250円（標準時間）ですが、通常世帯は月12,500円です。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>保育料の算定では、同居のパートナーがいる場合はひとり親世帯として扱われません（パートナーの市町村民税も合算されます）。離婚調停中も原則ひとり親世帯にはなりません。詳しくは市に確認してください。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>保育料の詳細は<a href="https://www.city.nara.lg.jp/uploaded/attachment/209236.pdf" target="_blank" rel="noopener">奈良市 保育料PDF</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-09-14",
    popularity: 50,
  },
  {
    slug: "ninkagai-selection",
    citySlug: "nara",
    title: "奈良市 認可外・企業主導型の利用で加点と一時預かり無償化",
    description:
      "奈良市で認可外保育施設や企業主導型の利用による加点、新2号認定での一時預かり無償化を解説します。",
    category: "園えらび",
    categoryColor: "teal",
    content: `<h2>認可外・企業主導型・一時預かりは月64時間以上で+3点</h2>
<p>奈良市では企業主導型保育施設、認可外保育施設、一時預かり保育を月64時間以上継続利用している場合、加点その2で<span class="highlight">+3点</span>の加点が得られます。</p>

<h2>対象となる施設・サービス</h2>
<ul>
<li><strong>企業主導型保育施設</strong>：企業が主導して運営する保育施設</li>
<li><strong>認可外保育施設</strong>：認可を受けていない民間保育施設</li>
<li><strong>一時預かり保育</strong>：定期的に子どもを預けるサービス（月64時間以上の継続利用が条件）</li>
</ul>

<h2>加点の計算例</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>基本指数：共働き・月150〜159時間</strong>
<p>父95点 ＋ 母95点 ＝ 190点</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>加点その2：認可外・企業主導型の利用</strong>
<p>+3点</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>合計</strong>
<p>190点 ＋ 3点 ＝ <span class="highlight">193点</span></p>
</div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>加点その2は複数の条件が重複すれば加算されます。認可外利用（+3点）と単身赴任（+1点）を両立していれば、+4点の加点が得られます。</p>
</div>

<h2>新2号認定での一時預かり無償化</h2>
<p>奈良市の3〜5歳児が新2号認定を受けている場合、一時預かり保育は<span class="highlight">月額11,300円まで無償</span>です。この認定は申請が必要で、利用料そのものは施設ごとに違います。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>一時預かりの加点+3点を狙う場合は、月64時間以上の継続利用が条件です。利用していることを確認できる書類が要るので、何を出せばよいかは子ども給付課に確認しましょう。単発の利用では加点対象になりません。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>企業主導型保育の情報は<a href="https://www.cfa.go.jp/policies/hoiku/torimatome/r7" target="_blank" rel="noopener">こども家庭庁 保育所等関連状況取りまとめ</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-09-14",
    popularity: 43,
  },
  {
    slug: "kigyou-shudogata",
    citySlug: "nara",
    title: "奈良市 企業主導型保育施設の利用　申込から加点まで",
    description:
      "奈良市で企業主導型保育施設を利用する場合の申込方法、加点、支給認定証の手続きを解説します。",
    category: "園えらび",
    categoryColor: "teal",
    content: `<h2>企業主導型保育は施設と直接契約</h2>
<p>奈良市の認可保育園とは異なり、企業主導型保育施設は<span class="highlight">市への申込ではなく、施設と直接契約</span>します。市への認可保育園申込の対象外です。</p>

<h2>企業主導型保育の現状（令和7年4月1日）</h2>
<p>こども家庭庁の取りまとめによると、令和7年4月1日時点で奈良市には企業主導型保育の利用定員<span class="highlight">525人分</span>があります。</p>

<h2>企業主導型利用で認可園の加点</h2>
<p>企業主導型保育を月64時間以上継続利用している場合、その後に認可保育園に申し込む際に<span class="highlight">加点その2で+3点</span>の加点が得られます。つまり企業主導型から認可園への転園を目指す場合にも有利になります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>企業主導型保育は柔軟な保育時間や企業従業員向けのメリットがある場合が多いです。その上で認可園を目指す場合も、企業主導型での利用記録が加点対象になるため、認可園への転園を検討している家庭にも選択肢になります。</p>
</div>

<h2>支給認定証発行申請は電子申請</h2>
<p>企業主導型保育の利用を確認するために、市に支給認定証発行申請を行うことがあります。この手続きはLoGoフォーム（奈良市の電子申請システム）で対応しています。</p>

<h2>対象となる要件</h2>
<p>企業主導型保育で月64時間以上の継続利用と判定されるには、実際に利用している記録が必要です。確認書類は子ども給付課に確認してください。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>企業主導型保育は保育料が事業所ごとに異なります。保育が必要な理由（就労など）を満たすことが前提です。企業従業員枠と地域枠に分かれている場合があるため、事前に確認しましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>企業主導型保育の全国的な状況は<a href="https://www.cfa.go.jp/policies/hoiku/torimatome/r7" target="_blank" rel="noopener">こども家庭庁 保育所等関連状況取りまとめ（令和7年4月1日）</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-09-14",
    popularity: 36,
  },
  {
    slug: "ikukyu-timing",
    citySlug: "nara",
    title: "奈良市で育休から復帰するなら　申込時期と復職タイミング",
    description: "育児休業からの復帰に合わせて保活する場合の申込時期と注意点をまとめました。",
    category: "育休・復職",
    categoryColor: "blue",
    content: `<h2>育休満了日の当月1日に申込む</h2>
<p>奈良市では育児休業期間が満了する場合、「育児休業期間満了日の当月1日利用開始希望」で申込むことになります。例えば9月30日が育休満了日であれば、9月1日利用開始を希望して申込みます。</p>

<h2>育休短縮での申込も可能</h2>
<p>育休を短くして早めに復帰したい場合も申込可能です。ただし決定後は<span class="highlight">入所月または翌月1日に復帰</span>することが条件です。復帰日が決まるまでは慎重に判断しましょう。</p>

<h2>加点その1の育休復帰は最大</h2>
<p>育児休業からの復帰に伴う入所申請は調整指数の加点その1で<span class="highlight">+14点</span>になります。ただし加点その1は「最も高い1つだけ計上」となるため、保育士勤務（+40点）やひとり親（+30点）の人よりは加点額が小さくなります。</p>

<h2>申込期間に注意</h2>
<p>奈良市の申込は希望月の3か月前から前月10日までです。令和8年5月1日利用開始希望なら、2月1日から4月10日までが申込期間です。育休予定を確認し、期間内に申込書類を提出してください。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>育休明けは体力と精神面への負担が大きい時期です。慣らし保育期間（10日前後〜1か月）は家庭でのサポート体制も整えておくと良いでしょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>育休要件の詳細は<a href="https://www.city.nara.lg.jp/site/kosodate/261513.html" target="_blank" rel="noopener">奈良市「利用の手引き」</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-09-14",
    popularity: 48,
  },
  {
    slug: "ikukyu-enchou-risk",
    citySlug: "nara",
    title: "奈良市の育休延長を考えるなら　知っておくべき保活のリスク",
    description: "育休延長を見据えた申込時の注意点と、保留通知・内定辞退のルールをまとめました。",
    category: "育休・復職",
    categoryColor: "blue",
    content: `<h2>保留通知は初回のみ郵送・再発行できない</h2>
<p>奈良市では、入園できなかったときの「利用保留（不可）」の通知は<span class="highlight">初回のみ郵送</span>で、市の手引きには「利用保留（不可）通知は発行できません」と書かれています。有効期限内は翌月以降も自動的に利用調整が続くので、毎月あらためて通知が届くわけではありません。勤務先に提出する必要があるなら、届いた通知を保管しておきましょう。</p>

<h2>内定辞退は大きな減点につながる</h2>
<p>入園内定を受けた園から別の園に変更したい場合、内定を辞退することになります。ただしこの辞退は次回審査から<span class="highlight">−5点の減点</span>（加点その2）として扱われます。「育休を延ばすことにしたので今回は辞退」という選択をすると、1年以内の次の申込で減点されます。</p>

<h2>上の子の継続利用に制限がある</h2>
<p>上の子が育休要件で在園中に、下の子が満1歳で保留になった場合、下の子を継続して申し込むことを前提に上の子が在園し続けられます。しかし内定を辞退すると、やむを得ない事由（災害・入院など）がない限り、上の子の継続利用ができなくなってしまいます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>育休を延ばす可能性があるなら、内定が出たときに辞退するのか復帰するのかを先に決めておくことが大切です。内定辞退は1年以内の申込で−5点になり、上の子の継続利用にも影響します。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>育休中の手続きは<a href="https://www.city.nara.lg.jp/site/kosodate/261513.html" target="_blank" rel="noopener">奈良市「利用の手引き」6章</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-09-14",
    popularity: 45,
  },
  {
    slug: "fukushoku-junbi",
    citySlug: "nara",
    title: "奈良市で保育園入園が決まった後　復職前にやることリスト",
    description: "内定から入園までの準備と、慣らし保育期間中の家庭での対応をまとめました。",
    category: "育休・復職",
    categoryColor: "blue",
    content: `<h2>内定後は園での面談　子ども同伴が必須</h2>
<p>入園内定の電話を受けた後、内定した園で面談があります。この面談には<span class="highlight">子ども同伴</span>で参加します。園は集団保育に適さないと判断した場合、内定を取り消すこともあるため、この面談は重要です。園の様子を見学できる機会でもあるので、丁寧に対応しましょう。</p>

<h2>認定証は郵送で到着　現況届も用意</h2>
<p>面談後、認定証と利用決定通知が郵送で届きます。その後、毎年1回以上、園を通じて「現況届」で保育の必要性の継続を確認することになります。書類が届いたら、入園予定日、必要な持ち物などの情報を確認しておきましょう。</p>

<h2>慣らし保育は10日前後〜1か月</h2>
<p>入園後は慣らし保育期間があります。期間は<span class="highlight">10日前後から1か月程度</span>で、子どもの様子によって変わります。この期間は家庭でのサポートが重要です。なお慣らし保育期間中でも<span class="highlight">保育料は減免されません</span>。</p>

<h2>市立園なら延長保育料は時間帯100円</h2>
<p>奈良市立保育所・市立認定こども園では延長保育A・Bがあり、各時間帯<span class="highlight">100円</span>です。ただし延長保育Bは<span class="highlight">1歳児クラス以上が対象</span>のため、0歳児クラスでは使えません。復職時間に合わせて確認しましょう。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>復職後は家庭のスケジュール管理が大きく変わります。朝の登園準備時間、延長保育の利用方法、緊急時の対応など、事前に園と確認して計画を立てておくことが重要です。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>復職準備について詳しくは<a href="https://www.city.nara.lg.jp/site/kosodate/261513.html" target="_blank" rel="noopener">奈良市「利用の手引き」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-09-14",
    popularity: 52,
  },
  {
    slug: "zero-vs-one-year",
    citySlug: "nara",
    title: "奈良市の0歳児入園と1歳児入園　どちらを目指すべき？",
    description: "0歳児と1歳児の受け入れ状況、待機児童数、入園難度を比較します。",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>受け入れ可能数で0歳児と1歳児を比較</h2>
<p>奈良市の令和8年9月入所分（78施設）の受け入れ状況は大きく異なります。0歳児は受け入れ可能○1・△19・×43で、1歳児は○0・△19・×50です。<span class="highlight">0歳児は○の園が1つあるのに対し、1歳児は○がゼロ</span>となっており、1歳児の方が入園難度が高いといえます。</p>

<h2>待機児童もデータで見える差</h2>
<p>令和7年4月1日時点での待機児童数は合計14人です。内訳は0歳児1人、1歳児6人、2歳児6人、3歳以上児1人となっています。1歳児が最も待機児童が多く、入園が難しい年代であることが分かります。</p>

<h2>預けられるのは受入年齢到達の翌月1日</h2>
<p>もう1つ見落としやすいのが、施設一覧の注意書き「預けることができるのは、受入年齢に到達した翌月1日」です。園ごとに0歳児を受け入れ始める月齢が決まっていて、その月齢になった月ではなく翌月の1日から預けられます。0歳児入園を考えるときは、希望園の受入年齢と復職日を合わせて確認してください。</p>

<h2>0歳児利用と1歳児利用のメリット・デメリット</h2>
<p>0歳児で入園できれば、園での適応がゆっくり進むメリットがあります。一方1歳児は運動発達が進むため、園生活により参加しやすくなります。ただし1歳児入園は競争が激しく、希望園に入れない可能性も高いため、0歳児での入園も視野に入れた計画が重要です。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>受入可能数と待機児童の内訳を見るかぎり、奈良市では1歳児がいちばん入りにくいクラスです。0歳児での入園を第一候補にしつつ、1歳児で申し込む場合は4月入所（申請は12月）に狙いを絞り、年度途中の毎月の受付も並行して使うのが現実的です。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新の受け入れ状況は<a href="/nara/vacancy" target="_blank" rel="noopener">奈良市の空き状況</a>でも確認できます。待機児童データは<a href="https://www.cfa.go.jp/policies/hoiku/torimatome/r7" target="_blank" rel="noopener">こども家庭庁の保育所等関連状況取りまとめ</a>をご参照ください。</p>
</div>`,
    publishedAt: "2026-09-14",
    popularity: 55,
  },
  {
    slug: "nyuyoji-age0",
    citySlug: "nara",
    title: "奈良市の0歳児クラス　入園年齢と受け入れの条件",
    description: "0歳児クラスの対象年齢、新生児の手続き、延長保育利用可否などを解説します。",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>0歳児は令和7年4月2日以降生まれ</h2>
<p>奈良市の令和8年度における0歳児クラスの対象は「令和7年4月2日以降生まれ」です。4月1日生まれは1歳児クラスになってしまうため、生年月日には注意が必要です。出産予定日が3月下旬から4月上旬の方は特に、クラス分けを確認しておくことが重要です。</p>

<h2>新生児は出生届後に受付</h2>
<p>出生直後から保育園を申込むことも可能です。新生児の場合は<span class="highlight">出生届を提出した後に受付</span>が始まります。出生届を出したら、できるだけ早く市の子ども給付課に連絡して申込手続を進めましょう。</p>

<h2>受入年齢到達の翌月1日から預ける</h2>
<p>園ごとに0歳児を受け入れ始める月齢が決まっていて、実際に預けられるのは<span class="highlight">受入年齢に到達した翌月1日</span>からです。受入年齢は市の施設一覧に園ごとに載っているので、希望園の受入年齢と復職予定日を合わせて確認しておきましょう。</p>

<h2>市立園の延長保育Bは1歳児以上のみ</h2>
<p>市立保育所・市立認定こども園の延長保育は時間帯100円ですが、<span class="highlight">延長保育Bは1歳児クラス以上が対象</span>です。0歳児クラスの子どもはBは利用できないため、標準時間（最大11時間）の範囲での利用になります。短時間認定の場合は最大8時間となるため、復職時間を確認してから申込みましょう。</p>

<h2>離乳食対応は園ごと</h2>
<p>0歳児の大事な課題が離乳食です。対応方法は園によって異なります。持参なのか、園での対応なのか、時期ごとの進め方などは、事前に希望園に確認しておく必要があります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>0歳児入園は新生児からの対応が可能なため、育休期間を有効活用して、希望の園に申し込むことができます。出産予定を基準に、逆算して申込スケジュールを立てましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>0歳児クラスの詳しい条件は<a href="https://www.city.nara.lg.jp/site/kosodate/261513.html" target="_blank" rel="noopener">奈良市「利用の手引き」</a>でご確認ください。</p>
</div>`,
    publishedAt: "2026-09-14",
    popularity: 50,
  },
  {
    slug: "age2-nyuen",
    citySlug: "nara",
    title: "奈良市の2歳児クラス入園　小規模保育からの移行と注意点",
    description: "2歳児の入園難度、小規模保育から認可保育園への移行、無償化の条件を解説します。",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>2歳児は0・1歳児よりさらに難しい</h2>
<p>奈良市の令和8年9月入所分の受け入れ状況は、2歳児で受け入れ可能○1・△13・×56です。0歳児の○1・△19と比較すると、△（少人数受け入れ）の数も減り、×（受け入れなし）の数が大幅に増えています。2歳児での入園は0・1歳児より難度がさらに上がります。</p>

<h2>待機児童数も高い水準</h2>
<p>令和7年4月1日時点の待機児童は、2歳児で6人となっており、1歳児と同数です。保育を必要とする世帯が多い時期だからこそ、早めの対策が重要になります。</p>

<h2>小規模保育からの連携施設への移行</h2>
<p>小規模保育事業は0〜2歳児までの預かりが基本です。3歳児以降は連携施設へ移行することになります。移行に当たっては「優先的に利用できるよう配慮される」という表現になっており、確約ではありません。小規模保育を利用している場合は、3歳児クラスでの入園先を早めに確保する必要があります。</p>

<h2>年度途中に3歳になっても無償化対象外</h2>
<p>重要な点として、<span class="highlight">2歳児クラスで年度途中に3歳になっても、翌年度4月に3歳児クラスに進級するまで無償化の対象にはなりません</span>。例えば1月に3歳の誕生日を迎えても、その年度中は2歳児クラスの保育料を支払い続けることになります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>待機児童の内訳を見ると3歳以上児は1人で、2歳児までとは状況が違います。2歳児で入れなかった場合も、3歳児クラスでの入園や幼稚園・こども園の教育部分を含めて次の一手を用意しておくと落ち着いて動けます。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>小規模保育の連携施設や入園年齢は<a href="https://www.city.nara.lg.jp/site/kosodate/261513.html" target="_blank" rel="noopener">奈良市「利用の手引き」</a>でご確認ください。</p>
</div>`,
    publishedAt: "2026-09-14",
    popularity: 48,
  },
  {
    slug: "age3-ikou",
    citySlug: "nara",
    title: "奈良市の3歳児クラス入園　待機児童が減る理由と無償化のメリット",
    description: "3歳児クラスの受け入れ状況、保育料無償化、副食費の仕組みを解説します。",
    category: "制度を知る",
    categoryColor: "rose",
    content: `<h2>3歳児で空きが出やすくなる</h2>
<p>奈良市の令和8年9月入所分の受け入れ状況は、3歳児で受け入れ可能○3・△25・×40・◎1です。0歳児の○1、1歳児の○0、2歳児の○1と比較すると、3歳児の○3は大幅に増えています。このため入園難度が下がり、希望を叶えやすくなります。</p>

<h2>3〜5歳は全員保育料無償</h2>
<p>国の無償化制度により、<span class="highlight">3〜5歳児クラスは全員保育料が無償</span>です。3歳児クラスに進級すれば、毎月の家計負担がぐっと減ります。ただしこれは認可保育園の場合で、幼稚園・認定こども園の教育部分は別の無償化となります。</p>

<h2>副食費（おかず代）の仕組み</h2>
<p>無償化の対象外として副食費があります。3〜5歳の場合、所得に応じて免除制度があります。小学校就学前のきょうだいから数えて第3子以降なら免除になります。免除対象でない第3子以降も市独自助成で<span class="highlight">月5,100円まで軽減</span>されます。</p>

<h2>幼稚園・こども園教育部分も選択肢</h2>
<p>3歳児からは認可保育園だけではなく、認定こども園の教育部分や幼稚園（新制度）という選択肢も出てきます。これらも全員無償化の対象です。働き方や家庭のニーズに合わせて、入園先の類型を検討できるようになります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>3歳児は入園難度が下がり、保育料が無償になる大きなターニングポイントです。0〜2歳児での入園が難しい場合は、3歳児での入園を目指すという戦略も十分に検討する価値があります。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>保育料と副食費について詳しくは<a href="https://www.city.nara.lg.jp/site/kosodate/267264.html" target="_blank" rel="noopener">奈良市保育料シミュレーション</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-09-14",
    popularity: 56,
  },
  {
    slug: "secondchild-hokatsu",
    citySlug: "nara",
    title: "奈良市の第2子保活　きょうだい在園時のルールと費用",
    description: "第2子の加点ルール、第2子以降の保育料無償、上の子継続利用の条件を解説します。",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>きょうだい在園+25点と同時申込+11点の違い</h2>
<p>第2子申込時の加点は2つのパターンがあります。上の子がすでに園に在園していれば「きょうだいが希望園に在園している」で<span class="highlight">+25点</span>、上の子と同じ園を同時申込なら「きょうだいが同じ園を希望して入園申請」で<span class="highlight">+11点</span>です。ただし調整指数の加点その1は「最も高い1つだけ計上」のため、25点と11点の両方がもらえるわけではなく、25点の方が適用されます。</p>

<h2>0〜2歳の第2子以降は保育料無償</h2>
<p>奈良市独自の施策として、<span class="highlight">0〜2歳児クラスの同一世帯第2子以降が保育料無償</span>です。第1子だけが月額表に従った保育料を支払い、第2子以降は0円になります。この制度により、子どもが複数いる家庭の負担が大きく減ります。</p>

<h2>上の子が育休要件で在園する場合の継続条件</h2>
<p>育休を理由に上の子が在園している場合、下の子が満1歳で保留になった時点で重要な判断が迫られます。下の子を継続して申し込むことを前提とすれば、上の子も在園し続けられます。しかし下の子の内定を辞退すると、やむを得ない事由がない限り上の子も退園することになってしまいます。</p>

<h2>里帰り出産は最大2か月の休園</h2>
<p>第2子の出産で里帰りする場合、最大<span class="highlight">2か月間の休園</span>が可能です。この間も保育料の減免はないため、上の子分は支払い続けることになります。帰宅予定に合わせて休園届を提出してください。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>第2子がいる家庭は加点+無償化の二重のメリットがあります。上の子の安定的な在園を確保しつつ、第2子の入園機会を活用することが、全体の保活計画の成功に繋がります。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>第2子の手続きについて詳しくは<a href="https://www.city.nara.lg.jp/site/kosodate/261513.html" target="_blank" rel="noopener">奈良市「利用の手引き」</a>でご確認ください。</p>
</div>`,
    publishedAt: "2026-09-14",
    popularity: 51,
  },
  {
    slug: "sannin-me-hokatsu",
    citySlug: "nara",
    title: "奈良市の第3子以降の保活　副食費免除と助成のメリット",
    description: "第3子以降の加点、副食費の免除・軽減制度、同点時の優先ルールを解説します。",
    category: "お金の話",
    categoryColor: "rose",
    content: `<h2>第3子以降も同じ加点ルール</h2>
<p>第3子以降の加点については、第2子と変わりません。きょうだい在園時で+25点、同時申込で+11点です。ただし加点その1は「最も高い1つだけ計上」のため、この加点を最大限に活用することが重要です。</p>

<h2>0〜2歳も第2子以降無償</h2>
<p>第2子と同じく、<span class="highlight">0〜2歳児クラスの第2子以降は保育料無償</span>です。第1子のみが保育料を支払い、第2子、第3子と増えるにしたがって0円になっていきます。複数子がいる家庭の経済的負担が大幅に軽減されます。</p>

<h2>副食費（おかず代）の免除と軽減</h2>
<p>3〜5歳児の副食費について、<span class="highlight">小学校就学前のきょうだいから数えて第3子以降が免除</span>されます。数えるのは小学校就学前のきょうだいだけなので、例えば年長・年中・年少の3人なら年少が第3子として免除ですが、小学1年生・年長・年少の3人なら年少は第2子になり免除の対象外です。免除に当たらない第3子以降も、市独自の助成で副食費が<span class="highlight">月5,100円まで軽減</span>されます。</p>

<h2>同点時には「小学生以下のきょうだいが多数」が見られる</h2>
<p>もし他の保護者と入園選考で同点になった場合、奈良市の同点時の判定項目に「世帯に小学生以下の兄弟姉妹が多数」という要素が含まれています。きょうだいが多い家庭は、わずかな優先順位差で選考に有利に働く可能性があります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>第3子以降は加点、保育料無償化、副食費軽減の3つのメリットがあります。子どもが複数いる家庭を重視する奈良市の施策が、実際の月々の家計負担をぐっと減らしてくれます。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>副食費の詳細は<a href="https://www.city.nara.lg.jp/site/kosodate/267264.html" target="_blank" rel="noopener">奈良市保育料シミュレーション</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-09-14",
    popularity: 49,
  },
  {
    slug: "futago-hokatsu",
    citySlug: "nara",
    title: "奈良市の双子・多胎児保活　妊娠判定と加点のポイント",
    description: "双子・多胎児の妊娠判定基準、同時申込加点、同一園希望の注意点を解説します。",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>多胎児の妊娠有効期限は前3か月から</h2>
<p>奈良市で妊娠・出産を理由に保育を必要とする認定を受ける場合、通常は「出産予定月の前2か月〜出産月の後2か月」（最大5か月）が有効期限です。しかし<span class="highlight">多胎児（双子以上）の場合は「前3か月」から</span>に延長されます。出産予定月が4月なら、認定の有効期間が1月から始まるということです（申込自体は入所希望月ごとの申請期間内に行います）。</p>

<h2>双子申込は同時申込加点+11点</h2>
<p>双子を同じ園に申込む場合、「きょうだいが同じ園を希望して入園申請している」という理由で調整指数の加点その1で<span class="highlight">+11点</span>が付きます。ただしこの加点も「最も高い1つだけ計上」のため、ひとり親（+30点）などの加点がある場合は調整が必要です。</p>

<h2>指数表の項目名は「兄弟姉妹（多胎児を含む）」</h2>
<p>この加点の指数表での項目名は「兄弟姉妹（多胎児を含む）が同一の保育所等の利用を希望するもの」です。双子・三つ子も対象であることが明記されています。なお、上の子がすでに在園している園に双子を申し込む場合は、加点その1のうち高いほうの「きょうだいが希望園に在園」＋25点が使われます。</p>

<h2>受け入れ可能数△は1〜3人　○園を優先</h2>
<p>奈良市の空き状況表で「△」は1〜3人の受け入れを示します。双子の場合は△の園では満員になる可能性があるため、<span class="highlight">○（4人以上受け入れ可能）の園を優先</span>して希望すると、内定確度が高まります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>双子以上は、妊娠・出産を理由とする認定が出産予定月の3か月前から使えます。受入可能数は毎月変わるので、△（1〜3人）ではなく○（4人以上）の園を中心に希望順を組むと、2人そろって入れる可能性が上がります。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>多胎児の手続きについて詳しくは<a href="https://www.city.nara.lg.jp/site/kosodate/261513.html" target="_blank" rel="noopener">奈良市「利用の手引き」3章</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-09-14",
    popularity: 46,
  },
  {
    slug: "hoiku-mama-interview",
    citySlug: "nara",
    title: "奈良市で保活を終えた保護者のケース　第2子を4月入園させるまで",
    description:
      "共働きフルタイムの田中さん（仮名）が、奈良市で第2子の4月入園を決めるまでの流れを、申込時期・結果通知・慣らし保育の順に追います。",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>田中さん（仮名）のケース　共働きフルタイム</h2>
<p>田中さん夫婦はともに月160時間以上の勤務で、基本指数は父100点＋母100点の<span class="highlight">200点</span>です。上の子が在園している園を第1希望にしたので、加点その1の「きょうだいが希望園に在園」で＋25点、合計225点での申込になりました。育休からの復帰（＋14点）にも当てはまりますが、加点その1は最も高い1つだけなので＋25点のほうが使われます。</p>

<h2>12月に申込、2月中旬に郵送で結果</h2>
<p>4月入園の申請期間は例年12月です（令和9年4月入所は12月7日〜12月18日の予定）。田中さんは原則どおり電子申請で出しました。4月入園の結果は<span class="highlight">2月16日頃に郵送</span>で届く予定になっており、田中さんもその時期に内定の通知を受け取りました。</p>

<h2>面談から慣らし保育まで</h2>
<p>内定後は園で子ども同伴の面談があり、その後に認定証と利用決定通知が郵送で届きました。慣らし保育は<span class="highlight">10日前後から1か月</span>。この期間も保育料の減免はないので、復職日は慣らし保育の終わりに合わせて職場と相談しました。</p>

<h2>復職後は延長保育を組み合わせ</h2>
<p>夫婦とも月120時間以上なので保育標準時間（1日最大11時間）の認定です。それでも残業で超える日があり、市立園の延長保育を使っています。市立は各時間帯100円で、延長保育Bは1歳児クラス以上が対象です。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>田中さんのケースで効いたのは、基本指数200点に加えて「きょうだい在園＋25点」を第1希望に使ったことです。加点その1は1つしか使えないので、どの加点を、どの園で使うかを先に決めておくと申込がぶれません。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>申請期間と結果の通知時期は<a href="https://www.city.nara.lg.jp/site/kosodate/245396.html" target="_blank" rel="noopener">奈良市の申込ページ</a>で、点数は<a href="/nara">奈良市の点数シミュレーター</a>で確認できます。このケースは制度の流れを説明するための例で、個人の体験談ではありません。</p>
</div>`,
    publishedAt: "2026-09-14",
    popularity: 45,
  },
  {
    slug: "small-nursery-guide",
    citySlug: "nara",
    title: "奈良市の小規模保育事業とは　0〜2歳児対象の仕組み",
    description:
      "奈良市の小規模保育事業の基礎知識。0〜2歳児対象の施設の特徴、3歳児以降の進園先の仕組みを解説します。",
    category: "制度を知る",
    categoryColor: "rose",
    content: `<h2>小規模保育事業の基本</h2>
<p>小規模保育事業は、<span class="highlight">0〜2歳児のみ</span>を対象とした保育施設です。認可保育所より少人数で、きめ細かい保育が特徴です。</p>

<h2>3歳児以降はどうなる？</h2>
<p>小規模保育事業に入園した子どもが3歳になると、連携施設へ進園します。市は、<span class="highlight">優先的に利用できるよう配慮</span>していますが、進園を確約するものではありません。進園前に連携施設の入園条件を確認することが重要です。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>奈良市の地域型保育事業（小規模保育含む）の令和7年4月1日時点での利用定員は<span class="highlight">131人</span>です。どの施設がどの園と連携しているかは、市の施設一覧PDFの別表「小規模保育事業の連携施設について」で確認できます。</p>
</div>

<h2>選ぶときに確認したいこと</h2>
<p>市の施設一覧には、園ごとの連携施設のほか、給食が自園調理（○）か外部搬入のクックチル（□）かも載っています。0〜2歳の間だけ通う施設なので、3歳児クラスからどこへ移るのか、その園の受入状況はどうかを、入園前に<a href="/nara/vacancy">奈良市の空き状況</a>と合わせて見ておくと安心です。</p>

<h2>同点時の優先順位</h2>
<p>入園の選考で複数の家庭が同じ指数だった場合、指数表の同点時順位で判定されます。その項目の一つに「<span class="highlight">地域型保育事業の卒園児</span>」が含まれています。小規模保育事業を利用していた子どもが連携施設へ進園を希望する場合、一定の優先を受けることがあります。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>連携施設の詳細は<a href="https://www.city.nara.lg.jp/uploaded/attachment/212153.pdf" target="_blank" rel="noopener">奈良市の利用のてびき</a>に掲載されています。</p>
</div>`,
    publishedAt: "2026-09-14",
    popularity: 38,
  },
  {
    slug: "nintei-kodomoen",
    citySlug: "nara",
    title: "奈良市の認定こども園のしくみ　3つの類型と申込方法の違い",
    description:
      "奈良市の認定こども園について、幼保連携型・幼稚園型・保育所型の3つの類型と申込方法の違いを解説します。",
    category: "園えらび",
    categoryColor: "teal",
    content: `<h2>認定こども園とは</h2>
<p>認定こども園は、保育と幼児教育の両方を行う施設です。奈良市の施設一覧には<span class="highlight">3つの類型</span>が掲載されています。</p>

<h2>3つの類型</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>幼保連携型認定こども園</strong>
<p>保育所と幼稚園の機能を一体的に行う施設。保育部分と教育部分の両方を持ちます。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>幼稚園型認定こども園</strong>
<p>幼稚園を基礎として、保育機能を追加した施設。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>保育所型認定こども園</strong>
<p>保育所を基礎として、幼児教育機能を追加した施設。</p>
</div>
</div>

<h2>申込先が違う</h2>
<p>認定こども園でも、<span class="highlight">保育部分（2号・3号認定）は奈良市の子ども給付課へ申し込み</span>、利用調整の対象になります。一方、<span class="highlight">教育部分（1号認定）は各園へ直接の新規申込</span>です。同じ園でも入り口が2つあるので、どちらで申し込むかを先に決めておきましょう。</p>

<h2>保育部分で使える時間</h2>
<p>保育部分の認定は、父母ともに月120時間以上の就労等なら保育標準時間（1日最大11時間）、ひとりでも月64〜120時間未満なら保育短時間（1日最大8時間）です。教育部分はこの認定とは別で、教育標準時間を超える利用は幼稚園型一時預かりになります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>令和7年4月1日時点で、奈良市の幼保連携型認定こども園の利用定員は<span class="highlight">4,127人</span>です。また、教育部分の保育料は全員<span class="highlight">無償</span>です。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>認定こども園の一覧は<a href="https://www.city.nara.lg.jp/uploaded/attachment/216185.pdf" target="_blank" rel="noopener">奈良市の施設一覧（PDF）</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-09-14",
    popularity: 42,
  },
  {
    slug: "enchou-hoiku",
    citySlug: "nara",
    title: "奈良市の延長保育とは　料金・実施施設・注意点を解説",
    description:
      "奈良市の延長保育について、市立と私立の違い、料金、実施していない園のケースを解説します。",
    category: "制度を知る",
    categoryColor: "rose",
    content: `<h2>延長保育とは</h2>
<p>認定された保育の必要量（保育標準時間または保育短時間）を超えて保育を利用する場合、延長保育の料金が発生します。</p>

<h2>市立保育所・市立認定こども園の延長保育</h2>
<p>奈良市の市立施設は、<span class="highlight">開園7時30分・閉園18時30分</span>です。延長保育A・Bの2段階があり、<span class="highlight">各時間帯100円</span>の料金設定です。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>延長保育Bは<span class="highlight">1歳児クラス以上が対象</span>です。0歳児では利用できません。</p>
</div>

<h2>私立保育所・私立こども園の延長保育</h2>
<p>私立施設は、<span class="highlight">施設ごとに時間・料金・申込方法が異なります</span>。実施していない施設も存在するため、入園前に必ず各園に確認してください。</p>

<h2>短時間認定でも利用可能</h2>
<p>短時間認定を受けている家庭も、各園の延長保育を活用できます。ただし各園の開園時間内に限られ、料金は園ごとに決まっているので、事前に施設に確認しましょう。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>奈良市には<span class="highlight">夜間保育所がありません</span>。夜遅い時間まで預けたい場合は、私立園の延長保育の時間や、認可外保育施設の利用を検討することになります。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>延長保育の詳細は<a href="https://www.city.nara.lg.jp/uploaded/attachment/212153.pdf" target="_blank" rel="noopener">奈良市の利用のてびき</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-09-14",
    popularity: 45,
  },
  {
    slug: "mushoka-seido",
    citySlug: "nara",
    title: "奈良市の幼児教育・保育の無償化　対象と条件を完全解説",
    description:
      "奈良市における幼児教育・保育の無償化について、3〜5歳児、0〜2歳児、一時預かりの条件を詳しく解説します。",
    category: "お金の話",
    categoryColor: "rose",
    content: `<h2>無償化の対象者</h2>
<p>2019年10月から、以下のカテゴリーが無償化の対象となっています。</p>

<h2>3〜5歳児クラスは全員無償</h2>
<p><span class="highlight">3歳児クラス以上は全員保育料が無料</span>です。ただし、<strong>2歳児クラスで年度途中に3歳になっても、翌年度4月に3歳児クラスに進級するまで無償化の対象にはなりません</strong>。年度替わりで適用されることに注意しましょう。</p>

<h2>0〜2歳児クラスは奈良市独自で無償化</h2>
<p>国の無償化対象ではありませんが、奈良市は独自の支援として、<span class="highlight">同一世帯の第2子以降が無償</span>です。第1子は市町村民税所得割の階層に応じた保育料を負担します。</p>

<h2>幼稚園・認定こども園の教育部分も無償</h2>
<p>幼稚園（新制度）と認定こども園の教育部分の保育料は<span class="highlight">全員無償</span>です。</p>

<h2>新2号認定で一時預かりも無償</h2>
<p>3〜5歳児クラスの子どもを持つ家庭が、新2号認定を受けた場合、一時預かり保育の利用料が<span class="highlight">月額11,300円まで無償</span>になります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>無償化の対象であっても、給食費（副食費）や実費（通園バッグ、行事参加費など）は別途負担が必要です。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>無償化の詳細は<a href="https://www.city.nara.lg.jp/site/kosodate/10822.html" target="_blank" rel="noopener">奈良市公式サイト</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-09-14",
    popularity: 48,
  },
  {
    slug: "shokuhi-jippi",
    citySlug: "nara",
    title: "奈良市の給食費・実費の話　何にお金がかかるのか",
    description:
      "奈良市の認可保育施設利用時に必要な給食費と実費について、免除対象と市の支援制度を解説します。",
    category: "お金の話",
    categoryColor: "rose",
    content: `<h2>実費の種類</h2>
<p>保育料が無料または決まっていても、以下の実費負担が必要です。</p>
<ul>
<li>給食費（3〜5歳児の副食費、0〜2歳児は保育料に含まれることが多い）</li>
<li>通園送迎費</li>
<li>延長保育料</li>
<li>一時預かり料</li>
<li>文房具費・制服代など</li>
<li>行事参加費</li>
</ul>

<h2>副食費（3〜5歳児のおかず代）の免除条件</h2>
<p>3〜5歳児クラスの副食費の免除には条件があります。以下のいずれかに該当する場合は免除になります。</p>
<ul>
<li>2号認定で年収360万円未満相当（市町村民税所得割<span class="highlight">57,700円未満</span>）</li>
<li>ひとり親・障がい児世帯で市町村民税所得割<span class="highlight">77,101円未満</span></li>
<li>小学校就学前のきょうだいから数えて第3子以降</li>
</ul>

<h2>市独自の軽減制度</h2>
<p>第3子以降で上記の免除要件に該当しない家庭に対して、奈良市は独自に<span class="highlight">月5,100円まで軽減</span>しています。申請不要で自動適用されますが、別居の子がいる場合は届出が必要です。</p>

<h2>市立施設と私立施設の差</h2>
<p>市立保育所・市立認定こども園は<strong>特定負担額（上乗せ徴収）がありません</strong>。私立施設は園によって異なる可能性があるため、入園前に各園に確認してください。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>保育料の支払い先は、市立・私立保育所ともに奈良市です（原則口座振替。指定金融機関は南都銀行）。私立こども園の保育料は施設へ支払います。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>実費の詳細は<a href="https://www.city.nara.lg.jp/uploaded/attachment/209236.pdf" target="_blank" rel="noopener">奈良市の実費徴収について（PDF）</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-09-14",
    popularity: 50,
  },
  {
    slug: "hoikuryo-keisan",
    citySlug: "nara",
    title: "奈良市の保育料の計算のしかた　所得割で階層が決まる",
    description:
      "奈良市の保育料がどのように決まるのか、市町村民税所得割額の役割、月別の切り替わりを詳しく解説します。",
    category: "お金の話",
    categoryColor: "rose",
    content: `<h2>保育料は市町村民税所得割で決まる</h2>
<p>奈良市の保育料は、<span class="highlight">世帯の市町村民税所得割課税額の合算</span>で階層が決まります。父母それぞれの所得割を合わせた額で、保育料表の階層を照合します。</p>

<h2>注意：所得割額の計算方法</h2>
<p>所得割額は、以下の控除を<strong>適用する前の額</strong>で見ます。</p>
<ul>
<li>住宅ローン控除</li>
<li>配当割額控除</li>
<li>寄附金税額控除（ふるさと納税）</li>
</ul>
<p>これらの控除をしていても、保育料は下がりません。ただし、調整控除と定額減税は適用後の額を使用します。</p>

<h2>4月〜8月と9月〜3月で基準年度が異なる</h2>
<p>保育料は年に2回切り替わります。</p>
<ul>
<li><strong>4月〜8月</strong>：前年度の市町村民税で決定</li>
<li><strong>9月〜3月</strong>：当年度の市町村民税で決定</li>
</ul>
<p>例えば令和8年の場合、4月から8月までは令和7年度の市町村民税で、9月から3月までは令和8年度の市町村民税で決まります。</p>

<h2>市町村民税が決まっていない場合</h2>
<p>未申告の場合は、<span class="highlight">D9階層（最高額）で仮決定</span>されます。後に課税証明書が発行されたら修正されます。</p>

<h2>階層表の代表例</h2>
<table>
<tr><th>階層</th><th>所得割課税額</th><th>保育料（標準時間）</th></tr>
<tr><td>C2</td><td>48,600円未満</td><td>8,000円</td></tr>
<tr><td>D4</td><td>133,000円未満</td><td>30,500円</td></tr>
<tr><td>D9</td><td>397,000円以上</td><td>64,800円</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>市町村民税の計算が複雑な場合は、市の窓口に相談することが重要です。また、<a href="https://www.city.nara.lg.jp/site/kosodate/267264.html" target="_blank" rel="noopener">保育料シミュレーション</a>を利用することで、おおよその保育料を事前に確認できます。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>全階層の保育料表は<a href="https://www.city.nara.lg.jp/uploaded/attachment/209236.pdf" target="_blank" rel="noopener">奈良市の保育料表（PDF）</a>でご確認ください。</p>
</div>`,
    publishedAt: "2026-09-14",
    popularity: 52,
  },
  {
    slug: "zeikin-koujo",
    citySlug: "nara",
    title: "奈良市の保育料と税金控除の関係　ふるさと納税は影響しない",
    description:
      "奈良市の保育料決定時に使われる市町村民税所得割額と、各種税金控除の関係を詳しく解説します。",
    category: "制度を知る",
    categoryColor: "rose",
    content: `<h2>保育料に影響する所得割額とは</h2>
<p>奈良市の保育料は市町村民税所得割課税額で決まります。ただし、この「所得割額」がどの段階の計算値なのかを理解することが重要です。</p>

<h2>ふるさと納税しても保育料は下がらない</h2>
<p>寄附金税額控除（ふるさと納税）は、所得割額の決定<span class="highlight">後に適用</span>される控除です。そのため、ふるさと納税をしても、保育料に使われる所得割額は変わりません。</p>

<p>同様に、以下の控除も適用する<strong>前</strong>の所得割額を使用します。</p>
<ul>
<li>住宅ローン控除（住宅借入金等特別税額控除）</li>
<li>配当割額控除</li>
</ul>

<h2>調整控除と定額減税は適用後</h2>
<p>一方で、以下の控除・減税は適用<strong>後</strong>の額を使用します。</p>
<ul>
<li>調整控除</li>
<li>定額減税</li>
</ul>

<h2>政令市課税との違い</h2>
<p>政令指定都市では市民税所得割の税率が6%から8%に変わっています。父母が政令指定都市で課税されている場合、奈良市は所得割を<span class="highlight">従来の6%相当に換算</span>してから階層を決めます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>保育料の階層を確認する際は、決定通知書や課税証明書で「市町村民税所得割額」を確認してください。所得税の数字とは別なので、混同しないようにしましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>課税証明書は市役所の窓口で取得できます。詳細は<a href="https://www.city.nara.lg.jp/site/kosodate/10822.html" target="_blank" rel="noopener">奈良市公式サイト</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-09-14",
    popularity: 45,
  },
  {
    slug: "nursery-fees",
    citySlug: "nara",
    title: "奈良市の保育料はいくら？　上限額と決まり方",
    description:
      "奈良市の認可保育施設の保育料について、0〜2歳児クラスの上限額と決まり方を、市が公表している保育料表をもとに紹介します。",
    category: "お金の話",
    categoryColor: "rose",
    content: `<h2>3歳児クラス以上は保育料が無料</h2>
<p>2019年10月からの幼児教育・保育の無償化により、<span class="highlight">3歳児クラス以上</span>の保育料は無料です。ただし給食費（主食費・副食費）は別に必要です。</p>

<h2>0〜2歳児クラスの保育料の決まり方</h2>
<p>奈良市の認可保育施設の保育料は、<span class="highlight">世帯の市町村民税所得割額</span>と<span class="highlight">保育を利用する時間（保育標準時間・保育短時間）</span>で決まる階層表になっています。所得が高いほど階層が上がり、保育料も上がります。</p>

<h2>奈良市でいちばん高い階層はいくら？</h2>
<p>奈良市が公表している保育料表では、0〜2歳児クラス・保育標準時間のいちばん高い階層で<span class="highlight">月額64,800円</span>（D9）です。保育短時間の場合は<span class="highlight">月額63,700円</span>です。ここが上限で、これを超えることはありません。</p>

<h2>第2子以降は無料</h2>
<p>奈良市独自の支援として、同一世帯の第2子以降の0〜2歳児クラスは無料です。第1子だけが保育料表に基づく負担となります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>保育料は毎年9月に切り替わります。4月分から8月分は前年度の住民税額、9月分から翌年3月分は当年度の住民税額で決まるため、9月に金額が変わることがあります。</p>
</div>

<div class="info-box">
<p><strong>出典</strong></p>
<p>上記の金額は奈良市が公表している保育料表によります。階層ごとの正確な金額は<a href="https://www.city.nara.lg.jp/uploaded/attachment/209236.pdf" target="_blank" rel="noopener">奈良市の保育料表（PDF）</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-09-14",
    popularity: 55,
  },
  {
    slug: "waiting-child-data",
    citySlug: "nara",
    title: "奈良市の待機児童数のデータ　令和7年4月の現状",
    description:
      "奈良市の待機児童数の最新データと、「隠れ待機児童」の実情を解説します。",
    category: "データ",
    categoryColor: "purple",
    content: `<h2>令和7年4月1日のデータ</h2>
<p>こども家庭庁が公表している「保育所等関連状況取りまとめ」によると、奈良市の令和7年4月1日時点での待機児童数は以下の通りです。</p>

<table>
<thead>
<tr><th>項目</th><th>人数</th></tr>
</thead>
<tbody>
<tr><td>申込者数</td><td>6,548人</td></tr>
<tr><td>待機児童数</td><td>14人</td></tr>
<tr><td>　うち0歳児</td><td>1人</td></tr>
<tr><td>　うち1歳児</td><td>6人</td></tr>
<tr><td>　うち2歳児</td><td>6人</td></tr>
<tr><td>　うち3歳以上児</td><td>1人</td></tr>
</tbody>
</table>

<h2>待機児童に数えられない状況</h2>
<p>以下の状況にある児童は、待機児童の統計に含まれません。</p>
<ul>
<li>育児休業中：236人</li>
<li>特定の園のみ希望：13人</li>
<li>求職活動を休止中：14人</li>
</ul>

<h2>昨年度との比較</h2>
<p>令和6年4月1日時点では、申込者数6,382人に対して待機児童23人でした。1年間で待機児童は23人から14人に減っています。</p>

<h2>利用定員と利用児童</h2>
<p>令和7年4月1日時点での利用定員と利用児童数は以下の通りです。</p>

<table>
<thead>
<tr><th>施設種別</th><th>利用定員</th><th>利用児童</th></tr>
</thead>
<tbody>
<tr><td>保育所</td><td>2,873人</td><td>2,550人</td></tr>
<tr><td>幼保連携型認定こども園</td><td>4,127人</td><td>3,373人</td></tr>
<tr><td>幼稚園型認定こども園等</td><td>217人</td><td>257人</td></tr>
<tr><td>地域型保育事業</td><td>131人</td><td>103人</td></tr>
</tbody>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>待機児童が少ないことは良いニュースですが、同時に「特定の園のみ希望」という理由で希望園に入れていない家庭も存在します。複数の園を希望することが入園の近道となる可能性があります。</p>
</div>

<div class="info-box">
<p><strong>出典</strong></p>
<p>データは<a href="https://www.cfa.go.jp/policies/hoiku/torimatome/r7" target="_blank" rel="noopener">こども家庭庁「保育所等関連状況取りまとめ（令和7年4月1日）」</a>に基づいています。</p>
</div>`,
    publishedAt: "2026-09-14",
    popularity: 50,
  },
  {
    slug: "ukeire-kanousu-yomikata",
    citySlug: "nara",
    title: "奈良市の受入可能数（空き状況）○△×の見方",
    description:
      "奈良市の各保育施設の受入可能数を示す○△×◎の記号の意味と、2026年9月入所分のデータを解説します。",
    category: "データ",
    categoryColor: "purple",
    content: `<h2>受入可能数の記号の意味</h2>
<p>奈良市の各保育施設の受け入れ状況は、以下の記号で表示されます。</p>

<table>
<thead>
<tr><th>記号</th><th>意味</th></tr>
</thead>
<tbody>
<tr><td><span class="highlight">○</span></td><td>4人以上受け入れ可能</td></tr>
<tr><td><span class="highlight">△</span></td><td>1〜3人受け入れ可能</td></tr>
<tr><td><span class="highlight">×</span></td><td>受け入れがなかった</td></tr>
<tr><td><span class="highlight">◎</span></td><td>公式説明のない記号（3件のみ）</td></tr>
</tbody>
</table>

<h2>2026年9月入所分のデータ</h2>
<p>市が公表している受入可能数では、<span class="highlight">78施設（公立20・私立58）</span>がリストアップされています。年齢別の受入状況は以下の通りです。</p>

<table>
<thead>
<tr><th>年齢クラス</th><th>○</th><th>△</th><th>×</th><th>◎</th></tr>
</thead>
<tbody>
<tr><td>0歳児</td><td>1</td><td>19</td><td>43</td><td>0</td></tr>
<tr><td>1歳児</td><td>0</td><td>19</td><td>50</td><td>0</td></tr>
<tr><td>2歳児</td><td>1</td><td>13</td><td>56</td><td>0</td></tr>
<tr><td>3歳児</td><td>3</td><td>25</td><td>40</td><td>1</td></tr>
<tr><td>4歳児</td><td>4</td><td>13</td><td>51</td><td>1</td></tr>
<tr><td>5歳児</td><td>2</td><td>11</td><td>55</td><td>1</td></tr>
</tbody>
</table>

<h2>○か△が1つでもある施設</h2>
<p>上記の年齢別で○または△が1つでも表示されている施設は<span class="highlight">47施設</span>です。つまり、全78施設のうち47施設で何らかの受け入れが可能な状況にあります。</p>

<h2>注意点</h2>
<p>受入状況は<strong>申込締切後に確認される</strong>ため、申込期間中に受入人数を確認することはできません。市の FAQ では「前月の受入状況は伝えている」としています。</p>

<p>また、「◎」の記号の意味は公式には説明されていません。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>0〜2歳児は受け入れ人数が限定的な傾向です。特に1歳児では○が0件と厳しい状況ですが、△を合わせると19施設で受け入れがあります。複数の園を希望することが重要です。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳細な受入可能数データは<a href="https://www.city.nara.lg.jp/kosodate/ukeire/ukeire.pdf" target="_blank" rel="noopener">奈良市の受入可能数（PDF）</a>で確認できます。また、当サイトの<a href="/nara/vacancy" target="_blank" rel="noopener">奈良市空き状況ページ</a>でも情報をまとめています。</p>
</div>`,
    publishedAt: "2026-09-14",
    popularity: 48,
  },
];

registerArticles(articles);
