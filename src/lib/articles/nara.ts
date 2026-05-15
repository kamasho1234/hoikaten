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
];

registerArticles(articles);
