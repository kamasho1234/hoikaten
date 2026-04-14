import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  {
    slug: "hokatsu-schedule",
    citySlug: "chofu",
    title: "調布市の保活スケジュール　申込から内定までの流れ",
    description:
      "調布市の認可保育園の申込時期・選考の流れをまとめました。令和8年度4月入園の動き方を解説します。",
    image: "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>調布市の4月入園スケジュール</h2>
<p>調布市の認可保育園は毎年10月に翌年度4月入園の一次募集を受付けます。入園案内で制度を確認しましょう。</p>

<h3>保活の全体スケジュール</h3>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>4月〜6月：情報収集</strong>
<p>調布市公式サイトや子育て応援サイト「コサイト」で保育園の一覧や前年度の入園案内を確認します。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>6月〜9月：保育園見学</strong>
<p>気になる園に連絡して見学を予約しましょう。調布市には認可保育園が多数あります。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>9月〜10月：入園案内入手・書類準備</strong>
<p>最新の入園案内を入手し、就労証明書などを準備します。</p>
</div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content">
<strong>10月：申込書類の提出</strong>
<p>調布市子ども生活部保育課へ提出します。令和8年度は10月6日から受付開始です。</p>
</div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>調布市は基本指数が父母各最大30点（合計60点満点）です。週あたりの就労時間を約2時間刻みで判定します。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳しくは<a href="https://www.city.chofu.lg.jp/kosodatekyouiku/hoikuservice/index.html" target="_blank" rel="noopener">調布市公式サイト 保育園入園案内</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 60,
  },
  {
    slug: "scoring-system-guide",
    citySlug: "chofu",
    title: "調布市の入園点数のしくみ　基本指数と調整指数を解説",
    description:
      "調布市の保育園入園選考で使われる基本指数と調整指数のしくみを解説します。",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>調布市の選考指数とは</h2>
<p>調布市の認可保育園の入園選考は「基本指数＋調整指数」の合計で行われます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>選考指数 = 基本指数（保護者1 + 保護者2）+ 調整指数</p>
</div>

<h2>基本指数（父母各最大30点、合計60点）</h2>
<p>就労の場合、週40時間以上の就労で満点の<span class="highlight">30点</span>になります。週あたりの就労時間を約2時間刻みで細かく判定するのが調布市の特徴です。</p>

<table>
<tr><th>就労時間</th><th>指数</th></tr>
<tr><td>週40時間以上</td><td>30</td></tr>
<tr><td>週38〜40時間</td><td>28</td></tr>
<tr><td>週36〜38時間</td><td>26</td></tr>
<tr><td>週34〜36時間</td><td>24</td></tr>
<tr><td>週32〜34時間</td><td>22</td></tr>
<tr><td>週30〜32時間</td><td>20</td></tr>
<tr><td>週28〜30時間</td><td>18</td></tr>
<tr><td>週24〜28時間</td><td>16</td></tr>
<tr><td>週20〜24時間</td><td>14</td></tr>
<tr><td>週16〜20時間</td><td>12</td></tr>
<tr><td>週12〜16時間</td><td>10</td></tr>
</table>

<h2>調整指数の代表例</h2>
<ul>
<li>ひとり親世帯：<span class="highlight">+6点</span></li>
<li>きょうだい在園中：<span class="highlight">+4点</span></li>
<li>認可外保育施設に月160時間以上預けている：<span class="highlight">+4点</span></li>
<li>生活保護世帯：<span class="highlight">+4点</span></li>
<li>父母とも1年以上継続就労：<span class="highlight">+2点</span></li>
<li>育児休業から復帰予定：<span class="highlight">+2点</span></li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>全項目は<a href="https://www.city.chofu.lg.jp/kosodatekyouiku/hoikuservice/index.html" target="_blank" rel="noopener">調布市公式サイト 保育園入園案内</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 55,
  },
  {
    slug: "score-up-tips",
    citySlug: "chofu",
    title: "調布市で入園点数を上げるコツ　加点を最大化する方法",
    description:
      "調布市の保育園入園選考で調整指数の加点を最大限に活用する方法を解説します。",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>基本指数60点は出発点</h2>
<p>調布市ではフルタイム共働き世帯は基本指数<span class="highlight">60点</span>で横並びです。差がつくのは調整指数の部分です。</p>

<h2>加点チェックリスト</h2>
<table>
<tr><th>項目</th><th>点数</th><th>条件</th></tr>
<tr><td>ひとり親</td><td>+6</td><td>ひとり親世帯であること</td></tr>
<tr><td>きょうだい在園</td><td>+4</td><td>きょうだいが認可保育園に在園中</td></tr>
<tr><td>認可外利用</td><td>+4</td><td>認可外保育施設に月160時間以上預けている</td></tr>
<tr><td>生活保護</td><td>+4</td><td>生活保護を受給している</td></tr>
<tr><td>継続就労</td><td>+2</td><td>父母とも1年以上継続して就労</td></tr>
<tr><td>育休復帰</td><td>+2</td><td>育児休業を取得し入園月に復帰する</td></tr>
</table>

<h2>認可外保育施設の活用</h2>
<p>認可外保育施設に月160時間以上預けていると+4点の加点が得られます。月120〜160時間でも+2点です。認証保育所やベビーシッターの月ぎめ利用も対象になる場合があります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>調布市は2時間刻みで点数が変わるため、就労時間が週38時間だと基本指数28点になります。可能であれば週40時間以上にすることで2点アップできます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 50,
  },
  {
    slug: "tiebreaker-rules",
    citySlug: "chofu",
    title: "調布市の同点時の優先順位　点数が同じ場合どうなる？",
    description:
      "調布市の保育園入園選考で指数が同点になった場合の優先順位のルールを解説します。",
    image: "https://images.unsplash.com/photo-1590650153855-d9e808231d41?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>同点時の優先順位</h2>
<p>調布市では選考指数が同点になった場合、以下の優先順位で入園が決まります。</p>

<h3>主な優先要素</h3>
<ul>
<li>調布市在住者が優先</li>
<li>保育の必要性が高い世帯（ひとり親など）</li>
<li>きょうだいの在園状況</li>
<li>所得が低い世帯</li>
<li>希望園の順位が高い方</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>調布市では同点の場合に所得階層が考慮されます。世帯年収が高い場合は特に加点を確実に取ることが重要です。</p>
</div>

<h2>希望園数は多めに</h2>
<p>調布市では希望園を多く書いても不利にはなりません。通える範囲の園はすべて記入しましょう。</p>`,
    publishedAt: "2026-04-07",
    popularity: 40,
  },
  {
    slug: "part-time-work-score",
    citySlug: "chofu",
    title: "調布市のパート・時短勤務の点数　何時間で何点？",
    description:
      "調布市の保育園入園で、パートや時短勤務の場合にもらえる基本指数を解説します。",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>パート・時短勤務の基本指数</h2>
<p>調布市では週あたりの就労時間で基本指数が決まります。フルタイムでなくても点数が付きます。</p>

<table>
<tr><th>勤務パターン例</th><th>週の時間</th><th>指数</th></tr>
<tr><td>週5日×8時間</td><td>40時間以上</td><td>30</td></tr>
<tr><td>週5日×7時間</td><td>35時間</td><td>24</td></tr>
<tr><td>週5日×6時間</td><td>30時間</td><td>20</td></tr>
<tr><td>週4日×6時間</td><td>24時間</td><td>16</td></tr>
<tr><td>週3日×6時間</td><td>18時間</td><td>12</td></tr>
<tr><td>週3日×5時間</td><td>15時間</td><td>10</td></tr>
</table>

<h2>パートで入園するには</h2>
<p>週3日・1日6時間のパートなら週18時間で<span class="highlight">12点</span>です。フルタイム30点との差は18点。調整指数だけでは埋めにくい差ですが、0歳児クラスや新設園なら可能性があります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>調布市の入所要件は週12時間以上の就労です。これを下回ると申込みそのものができません。時短勤務でも週12時間を超えていれば申込可能です。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 45,
  },
  {
    slug: "rejection-options",
    citySlug: "chofu",
    title: "調布市で不承諾になったら　次にやるべきこと",
    description:
      "調布市の保育園入園で不承諾通知が届いた場合の対処法をまとめました。",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop",
    category: "不承諾対策",
    categoryColor: "rose",
    content: `<h2>不承諾通知が届いたら</h2>
<p>調布市では4月一次選考の結果が1月中旬以降に届きます。不承諾だった場合の選択肢を整理しましょう。</p>

<h3>選択肢</h3>
<ul>
<li>二次募集に申し込む（2月〜3月）</li>
<li>5月以降の途中入園を申し込む</li>
<li>認可外保育施設を利用しながら翌年度に再申込する</li>
<li>幼稚園の預かり保育を検討する</li>
</ul>

<h2>二次募集のポイント</h2>
<p>二次募集は辞退などで空きが出た園に申し込めます。一次募集で定員に達しなかった園や、内定辞退があった園が対象です。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>認可外保育施設に月160時間以上預けてから翌年度に再申込すると、+4点の加点がもらえます。長い目で見た戦略が大切です。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 35,
  },
  {
    slug: "unlicensed-nursery-bonus",
    citySlug: "chofu",
    title: "調布市で認可外加点を取る方法　対象施設と条件",
    description:
      "調布市で認可外保育施設の利用による加点を得る方法と注意点を解説します。",
    image: "https://images.unsplash.com/photo-1587654780291-39c9404d7dd0?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>認可外加点とは</h2>
<p>調布市では認可外保育施設に月ぎめで預けている場合、利用時間に応じて調整指数が加算されます。</p>

<table>
<tr><th>利用時間</th><th>加点</th></tr>
<tr><td>月160時間以上</td><td>+4点</td></tr>
<tr><td>月120時間以上160時間未満</td><td>+2点</td></tr>
</table>

<h2>対象となる施設</h2>
<ul>
<li>認証保育所</li>
<li>認可外保育施設（東京都に届出済みのもの）</li>
<li>ベビーシッター（月ぎめ契約の場合）</li>
</ul>

<h2>注意点</h2>
<p>一時保育やスポット利用は対象外です。月ぎめ契約であることが条件です。また、費用は全額自己負担となるため、加点のためだけに利用するかどうかは費用対効果を考えて判断しましょう。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>認可外保育施設の一覧は<a href="https://www.city.chofu.lg.jp/kosodatekyouiku/hoikuservice/index.html" target="_blank" rel="noopener">調布市公式サイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 40,
  },
  {
    slug: "popular-areas",
    citySlug: "chofu",
    title: "調布市の地域別・保育園の入りやすさ",
    description:
      "調布市内の地域別に保育園の入りやすさを比較し、保活の参考情報をまとめました。",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=400&fit=crop",
    category: "地域情報",
    categoryColor: "teal",
    content: `<h2>調布市の地域特性</h2>
<p>調布市は京王線・京王相模原線沿線を中心に住宅地が広がり、地域によって保育園の入りやすさに差があります。</p>

<h3>競争が激しいエリア</h3>
<ul>
<li>調布駅周辺：市の中心部で共働き世帯が多い</li>
<li>国領・布田エリア：マンション開発で若い世帯が増加</li>
</ul>

<h3>比較的入りやすいエリア</h3>
<ul>
<li>仙川エリア：新設園の増加で定員が拡大</li>
<li>深大寺・飛田給エリア：駅から離れるが競争は緩やか</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>調布市の4月一次募集の内定最低指数は園別・クラス別に公式サイトで公開されています。過去のデータを参考に希望園を選びましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>内定最低指数は<a href="https://www.city.chofu.lg.jp/050020/p028164.html" target="_blank" rel="noopener">調布市公式サイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 45,
  },
  {
    slug: "competition-reality",
    citySlug: "chofu",
    title: "調布市で保育園に入れる点数の目安　何点あれば安心？",
    description:
      "調布市の保育園入園に必要な点数の目安を、過去の内定最低指数をもとに解説します。",
    image: "https://images.unsplash.com/photo-1460518451285-97b6aa326961?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>内定に必要な点数の目安</h2>
<p>調布市では人気の園ではフルタイム共働き（基本指数60点）だけでは入れないケースもあります。調整指数の加点が勝負を分けます。</p>

<h3>目安</h3>
<table>
<tr><th>エリア・クラス</th><th>目安の点数</th></tr>
<tr><td>調布駅周辺（1歳児）</td><td>61〜62点以上</td></tr>
<tr><td>国領・布田エリア（1歳児）</td><td>60〜61点</td></tr>
<tr><td>仙川・深大寺エリア（1歳児）</td><td>60点前後</td></tr>
<tr><td>0歳児クラス</td><td>60点前後</td></tr>
</table>

<p>1歳児クラスは最も競争が激しいクラスです。0歳児や3歳児クラスは比較的入りやすい傾向にあります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>調布市は園別・クラス別の内定最低指数を公式サイトで公開しています。59点以下・60点・61点以上の3段階で確認できます。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新の内定最低指数は<a href="https://www.city.chofu.lg.jp/050020/p028164.html" target="_blank" rel="noopener">調布市 内定者の最低指数</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 50,
  },
  {
    slug: "next-year-changes",
    citySlug: "chofu",
    title: "調布市の保育園事情　最新動向と今後の見通し",
    description:
      "調布市の保育園整備計画や待機児童の動向など、最新の保育園事情をまとめました。",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=400&fit=crop",
    category: "最新情報",
    categoryColor: "purple",
    content: `<h2>調布市の保育園整備</h2>
<p>調布市は待機児童対策として認可保育所の新設や既存園の定員拡大を進めています。</p>

<h2>最近の傾向</h2>
<ul>
<li>駅前再開発に伴う新規保育施設の開設</li>
<li>小規模保育事業所の卒園児対策として連携園の拡充</li>
<li>保活指数シミュレーションの提供で保護者の利便性向上</li>
</ul>

<h2>調布市の公式シミュレーション</h2>
<p>調布市は公式の保活指数シミュレーションを提供しています。チャット形式で質問に答えるだけで自分の指数が試算できます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>新設園は初年度に空きが出やすいため、保活では要チェックです。調布市の最新の募集数は公式サイトで確認できます。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新の保育園情報は<a href="https://www.city.chofu.lg.jp/050020/p028155.html" target="_blank" rel="noopener">調布市公式サイト 募集数・スケジュール</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 30,
  },
];

registerArticles(articles);
