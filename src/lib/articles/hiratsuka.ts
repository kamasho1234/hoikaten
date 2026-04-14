import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  {
    slug: "hokatsu-schedule",
    citySlug: "hiratsuka",
    title: "平塚市の保活スケジュール　申込から内定までの流れ",
    description:
      "平塚市の認可保育園の申込時期・選考の流れをまとめました。令和8年度4月入園の動き方を解説します。",
    image: "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>平塚市の4月入園スケジュール</h2>
<p>平塚市の認可保育園は毎年秋に翌年度4月入園の申込を受付けます。平塚市こども家庭課が窓口です。</p>

<h3>保活の全体スケジュール</h3>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>4月〜6月：情報収集</strong>
<p>平塚市のホームページで認可保育園の一覧を確認します。市内には約40か所の認可保育園があります。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>6月〜9月：保育園見学</strong>
<p>気になる園に連絡して見学を予約しましょう。平塚市は湘南地域ならではの開放的な園が多いのが特徴です。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>10月〜11月：申込書類の準備・提出</strong>
<p>就労証明書などの必要書類を準備し、こども家庭課窓口に提出します。</p>
</div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content">
<strong>2月上旬：選考結果の通知</strong>
<p>内定または不承諾の通知が届きます。不承諾の場合は二次募集や途中入園を検討しましょう。</p>
</div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>平塚市は基本指数が父母各最大20点（合計40点満点）です。月あたりの勤務日数と1日の勤務時間で判定されます。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳しくは<a href="https://www.city.hiratsuka.kanagawa.jp/kodomo/page82_00017.html" target="_blank" rel="noopener">平塚市こども家庭課</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 60,
  },
  {
    slug: "scoring-system-guide",
    citySlug: "hiratsuka",
    title: "平塚市の入園点数のしくみ　基本指数と調整指数を解説",
    description:
      "平塚市の保育園入園選考で使われる基本指数と調整指数のしくみを解説します。",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "点数を知る",
    categoryColor: "blue",
    content: `<h2>平塚市の選考点数とは</h2>
<p>平塚市の認可保育園の入園選考は「基本指数＋調整指数」の合計で行われます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>選考点数 = 基本指数（保護者1 + 保護者2）+ 調整指数</p>
</div>

<h2>基本指数（父母各最大20点、合計40点）</h2>
<p>就労の場合、月20日以上かつ1日8時間以上の勤務で満点の<span class="highlight">20点</span>になります。</p>

<table>
<tr><th>勤務状況</th><th>点数</th></tr>
<tr><td>月20日以上・1日8時間以上</td><td>20</td></tr>
<tr><td>月20日以上・1日6時間以上</td><td>18</td></tr>
<tr><td>月16日以上・1日6時間以上</td><td>16</td></tr>
<tr><td>月16日以上・1日4時間以上</td><td>14</td></tr>
<tr><td>月12日以上・1日4時間以上</td><td>12</td></tr>
<tr><td>月64時間以上</td><td>10</td></tr>
</table>

<h2>調整指数の代表例</h2>
<ul>
<li>ひとり親世帯：<span class="highlight">+5点</span></li>
<li>きょうだい在園：<span class="highlight">+3点</span></li>
<li>認可外保育施設利用：<span class="highlight">+3点</span></li>
<li>生活保護世帯：<span class="highlight">+3点</span></li>
<li>育児休業復帰：<span class="highlight">+2点</span></li>
<li>きょうだい同時申込：<span class="highlight">+2点</span></li>
<li>同居親族が保育可能：<span class="highlight">-3点</span></li>
<li>転園希望：<span class="highlight">-5点</span></li>
<li>市外からの申込：<span class="highlight">-10点</span></li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>全項目は<a href="https://www.city.hiratsuka.kanagawa.jp/kodomo/page82_00017.html" target="_blank" rel="noopener">平塚市こども家庭課</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 70,
  },
  {
    slug: "work-points-detail",
    citySlug: "hiratsuka",
    title: "平塚市の就労点数を詳しく解説　勤務日数と時間の組み合わせ",
    description:
      "平塚市の保育園入園で就労の基本指数がどう決まるか、勤務日数と時間の組み合わせを詳しく解説します。",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "点数を知る",
    categoryColor: "blue",
    content: `<h2>就労の基本指数の決まり方</h2>
<p>平塚市では月あたりの勤務日数と1日あたりの勤務時間の組み合わせで基本指数が決まります。</p>

<table>
<tr><th>勤務状況</th><th>点数</th><th>勤務パターン例</th></tr>
<tr><td>月20日以上・1日8時間以上</td><td>20</td><td>週5日フルタイム</td></tr>
<tr><td>月20日以上・1日6時間以上</td><td>18</td><td>週5日・時短6時間</td></tr>
<tr><td>月16日以上・1日6時間以上</td><td>16</td><td>週4日・1日6時間</td></tr>
<tr><td>月16日以上・1日4時間以上</td><td>14</td><td>週4日・1日5時間</td></tr>
<tr><td>月12日以上・1日4時間以上</td><td>12</td><td>週3日・1日5時間</td></tr>
<tr><td>月64時間以上</td><td>10</td><td>上記に該当しないが月64時間以上</td></tr>
</table>

<h2>パート・時短勤務の場合</h2>
<p>パート勤務でも月12日以上かつ1日4時間以上であれば12点が付きます。週3日パートでも申込みは十分可能です。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>平塚市は勤務日数と勤務時間の「両方の条件」を満たす必要があります。例えば月20日以上働いていても、1日の勤務が6時間未満なら18点にはなりません。就労証明書の記載内容を事前に確認しましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳しくは<a href="https://www.city.hiratsuka.kanagawa.jp/kodomo/page82_00017.html" target="_blank" rel="noopener">平塚市こども家庭課</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 55,
  },
  {
    slug: "adjustment-points",
    citySlug: "hiratsuka",
    title: "平塚市で加点を最大化する方法　調整指数の活用術",
    description:
      "平塚市の保育園入園選考で調整指数の加点を最大限に活用する方法を解説します。",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>基本指数40点は出発点</h2>
<p>平塚市ではフルタイム共働き世帯は基本指数<span class="highlight">40点</span>で横並びです。差がつくのは調整指数です。</p>

<h2>加点チェックリスト</h2>
<table>
<tr><th>項目</th><th>点数</th><th>条件</th></tr>
<tr><td>ひとり親</td><td>+5</td><td>ひとり親世帯であること</td></tr>
<tr><td>きょうだい在園</td><td>+3</td><td>きょうだいが認可保育園に在園中</td></tr>
<tr><td>認可外利用</td><td>+3</td><td>認可外保育施設に月ぎめで預けている</td></tr>
<tr><td>生活保護</td><td>+3</td><td>生活保護受給世帯</td></tr>
<tr><td>育休復帰</td><td>+2</td><td>育児休業から復職予定</td></tr>
<tr><td>同時申込</td><td>+2</td><td>きょうだい2人以上を同時に申し込む</td></tr>
</table>

<h2>減点に注意</h2>
<table>
<tr><th>項目</th><th>点数</th><th>条件</th></tr>
<tr><td>市外申込</td><td>-10</td><td>平塚市に住民登録がない</td></tr>
<tr><td>転園</td><td>-5</td><td>認可園から別の認可園への転園希望</td></tr>
<tr><td>同居親族が保育可能</td><td>-3</td><td>65歳未満の同居親族が保育できる</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>認可外保育施設の利用で+3点は大きな加点です。4月入園前に認可外に預けておくことで、フルタイム共働きの基本40点に加点でき、競争力が上がります。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 65,
  },
  {
    slug: "required-documents",
    citySlug: "hiratsuka",
    title: "平塚市の保育園申込に必要な書類一覧",
    description:
      "平塚市の認可保育園に申し込む際に必要な書類をまとめました。準備のチェックリストとしてご活用ください。",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>必要書類の一覧</h2>
<p>平塚市の認可保育園に申し込む際に必要な書類です。こども家庭課の窓口で入手できます。</p>

<h3>全員が提出する書類</h3>
<ul>
<li>保育所等利用申込書</li>
<li>家庭状況調書</li>
<li>保育の必要性を証明する書類（就労証明書など）</li>
<li>マイナンバー確認書類</li>
</ul>

<h3>該当者のみ提出する書類</h3>
<ul>
<li>ひとり親の場合：児童扶養手当証書の写しなど</li>
<li>障害がある場合：障害者手帳の写し</li>
<li>認可外利用中の場合：在園証明書</li>
<li>育休復帰の場合：復職証明書（入園後に提出）</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>就労証明書は勤務先に依頼してから届くまで2〜3週間かかることがあります。早めに依頼しましょう。平塚市指定の様式を使う必要があります。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>書類の様式は<a href="https://www.city.hiratsuka.kanagawa.jp/kodomo/page82_00017.html" target="_blank" rel="noopener">平塚市こども家庭課</a>のページからダウンロードできます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 50,
  },
  {
    slug: "nursery-types",
    citySlug: "hiratsuka",
    title: "平塚市の保育施設の種類と選び方ガイド",
    description:
      "平塚市にある認可保育園・小規模保育・認定こども園などの種類と特徴を解説します。",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=400&fit=crop",
    category: "園えらび",
    categoryColor: "purple",
    content: `<h2>平塚市の保育施設の種類</h2>
<p>平塚市には約40か所の認可保育施設があります。施設の種類ごとに特徴を整理しました。</p>

<h3>認可保育園</h3>
<p>市内で最も多い施設タイプです。0歳〜5歳児を受け入れ、定員が比較的大きいのが特徴です。</p>

<h3>小規模保育事業</h3>
<p>0〜2歳児が対象で定員6〜19人の小さな施設です。家庭的な雰囲気で手厚い保育が受けられます。3歳以降は連携園や認可保育園に転園します。</p>

<h3>認定こども園</h3>
<p>保育園と幼稚園の機能を併せ持つ施設です。保護者の就労状況が変わっても通い続けられるメリットがあります。</p>

<h3>家庭的保育事業</h3>
<p>保育者の自宅などで少人数（5人以下）を預かる事業です。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>平塚市は湘南地域に位置し、海や公園が近い園も多いです。園見学では散歩コースや外遊びの環境もチェックしましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>施設の一覧は<a href="https://www.city.hiratsuka.kanagawa.jp/kodomo/page82_00017.html" target="_blank" rel="noopener">平塚市こども家庭課</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 45,
  },
  {
    slug: "age-class-competition",
    citySlug: "hiratsuka",
    title: "平塚市の年齢別・保育園の入りやすさ",
    description:
      "平塚市の認可保育園で年齢クラスごとの競争率の傾向を解説します。何歳で申し込むのが有利か考えます。",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=400&fit=crop",
    category: "データ分析",
    categoryColor: "teal",
    content: `<h2>年齢クラスごとの競争率</h2>
<p>平塚市では年齢クラスによって入園の競争率が大きく異なります。</p>

<h3>0歳児クラス</h3>
<p>募集枠が比較的あるため、1歳児に比べると入りやすい傾向があります。ただし園によっては生後57日から受け入れる園と、生後6か月からの園があるので注意が必要です。</p>

<h3>1歳児クラス</h3>
<p>最も競争が激しいクラスです。育児休業から復帰する家庭が集中するため、定員に対して申込者数が多くなります。人気園ではフルタイム共働き40点＋加点がないと厳しいケースもあります。</p>

<h3>2歳児クラス</h3>
<p>小規模保育事業からの転園組と新規申込が重なるクラスです。連携園がある場合はそちらが優先されることもあります。</p>

<h3>3歳児クラス以上</h3>
<p>小規模保育の卒園児を受け入れる枠があるため、新規で入れる枠は限定的です。ただし幼稚園からの転園もあり、空きが出ることもあります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>平塚市で最も競争が激しいのは1歳児クラスです。0歳児クラスで入園できれば競争を避けられますが、育休を早めに切り上げる必要があるためライフプランとの兼ね合いで検討しましょう。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 60,
  },
  {
    slug: "dual-income-strategy",
    citySlug: "hiratsuka",
    title: "平塚市の共働き世帯が入園するための戦略",
    description:
      "平塚市でフルタイム共働き世帯が保育園に入園するための点数戦略を解説します。",
    image: "https://images.unsplash.com/photo-1587654780291-39c9404d7dd0?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>フルタイム共働きの基本点数</h2>
<p>平塚市でフルタイム共働き（月20日以上・1日8時間以上）の場合、基本指数は父母各20点で合計<span class="highlight">40点</span>です。</p>

<h2>40点で足りるのか</h2>
<p>平塚市は人口約25.8万人の湘南地域の中心都市です。駅周辺の人気園では40点だけでは足りない場合もあります。加点で差をつけることが重要です。</p>

<h3>加点を積む方法</h3>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>認可外保育施設の利用（+3点）</strong>
<p>4月入園前に認可外保育施設に預けておくことで加点が得られます。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>育休復帰（+2点）</strong>
<p>育児休業から復帰予定であれば加点対象です。入園月の翌月末までに復帰する必要があります。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>きょうだい同時申込（+2点）</strong>
<p>2人以上のお子さんを同時に申し込む場合に加点されます。</p>
</div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>認可外利用+3点と育休復帰+2点を合わせれば合計45点になります。希望園を5〜6園以上書くことも内定率を上げるコツです。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 55,
  },
  {
    slug: "single-parent-support",
    citySlug: "hiratsuka",
    title: "平塚市のひとり親世帯の保育園入園ガイド",
    description:
      "平塚市でひとり親世帯が保育園に入園する際の加点や支援制度をまとめました。",
    image: "https://images.unsplash.com/photo-1590650153855-d9e808231d41?w=800&h=400&fit=crop",
    category: "制度を知る",
    categoryColor: "rose",
    content: `<h2>ひとり親世帯の加点</h2>
<p>平塚市ではひとり親世帯に調整指数<span class="highlight">+5点</span>が加算されます。これは平塚市の調整指数の中で最も大きな加点です。</p>

<h2>点数シミュレーション</h2>
<table>
<tr><th>項目</th><th>点数</th></tr>
<tr><td>基本指数（フルタイム就労）</td><td>20</td></tr>
<tr><td>ひとり親加点</td><td>+5</td></tr>
<tr><td>認可外利用中</td><td>+3</td></tr>
<tr><td>合計</td><td>28</td></tr>
</table>
<p>ひとり親世帯は保護者が1名のため基本指数は最大20点ですが、+5点の加点があるため多くの園で入園が見込めます。</p>

<h2>平塚市のひとり親支援制度</h2>
<ul>
<li>児童扶養手当</li>
<li>ひとり親家庭等医療費助成</li>
<li>母子父子寡婦福祉資金の貸付</li>
<li>保育料の減額・免除制度</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>ひとり親であることを証明する書類（児童扶養手当証書の写し、戸籍謄本など）を申込時に提出する必要があります。書類の準備は早めに行いましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>ひとり親支援については<a href="https://www.city.hiratsuka.kanagawa.jp/kodomo/page82_00017.html" target="_blank" rel="noopener">平塚市こども家庭課</a>にご相談ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 40,
  },
  {
    slug: "waiting-child-status",
    citySlug: "hiratsuka",
    title: "平塚市の待機児童数と保育園の空き状況",
    description:
      "平塚市の待機児童数の推移と、保育園の空き状況の確認方法をまとめました。",
    image: "https://images.unsplash.com/photo-1460518451285-97b6aa326961?w=800&h=400&fit=crop",
    category: "データ分析",
    categoryColor: "teal",
    content: `<h2>平塚市の待機児童の状況</h2>
<p>平塚市は神奈川県湘南地域の中心都市で、人口約25.8万人を擁します。平塚七夕まつりで全国的に知られる街ですが、子育て環境の整備にも力を入れています。</p>

<h2>待機児童の傾向</h2>
<p>平塚市では保育施設の整備を進めており、近年は待機児童数が減少傾向にあります。ただし1歳児クラスを中心に、駅周辺の人気園では依然として希望者が定員を上回る状況が続いています。</p>

<h2>空き状況の確認方法</h2>
<ul>
<li>平塚市のホームページで毎月の空き状況が公開されています</li>
<li>こども家庭課の窓口でも最新の空き情報を確認できます</li>
<li>年度途中の入園を希望する場合は毎月申込みが可能です</li>
</ul>

<h2>入りやすいタイミング</h2>
<p>4月入園が最も枠が多く、年度途中は退園や転居による空きが出た場合に限られます。途中入園を狙う場合は毎月申込みを継続しましょう。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>平塚市は新規の保育施設整備を継続しています。新設園は既存園に比べて競争率が低い傾向があるため、市のホームページで新設園の情報をチェックしましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新の待機児童数・空き状況は<a href="https://www.city.hiratsuka.kanagawa.jp/kodomo/page82_00017.html" target="_blank" rel="noopener">平塚市こども家庭課</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 50,
  },
];

registerArticles(articles);
