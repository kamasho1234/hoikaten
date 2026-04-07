import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  // 1. 点数を上げるコツ
  {
    slug: "score-up-checklist",
    citySlug: "sapporo",
    title: "札幌市で点数を上げる方法　調整指数の加点チェックリスト",
    description:
      "札幌市の入園選考で調整指数の加点を最大限に活用する方法を、チェックリスト形式で解説します。",
    image:
      "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>調整指数の加点を漏れなく確認しよう</h2>
<p>札幌市の入園選考では、基本点数が同じでも調整指数の差で合否が分かれます。使える加点は漏れなく活用しましょう。</p>

<h3>加点チェックリスト</h3>
<table>
<tr><th>項目</th><th>指数</th><th>条件</th></tr>
<tr><td>ひとり親家庭</td><td>+120</td><td>ひとり親であること</td></tr>
<tr><td>産休明け・育休明け</td><td>+40</td><td>産休・育休明けによる入所</td></tr>
<tr><td>きょうだい在園</td><td>+80</td><td>きょうだいが認可保育所等にすでに入所</td></tr>
<tr><td>きょうだい在園＋認定こども園（教育部分）</td><td>+60</td><td>きょうだいが当該認定こども園の教育機能部分に入所</td></tr>
<tr><td>産休明け・育休明け＋きょうだい在園</td><td>+100</td><td>育休明け入所かつきょうだいが在園中</td></tr>
<tr><td>きょうだい同時入所</td><td>+30</td><td>きょうだい同時に入所申請</td></tr>
<tr><td>障がい者のいる世帯</td><td>+10</td><td>世帯に障がい者がいる場合</td></tr>
<tr><td>低所得世帯</td><td>+10</td><td>所得割額が48,600円未満</td></tr>
<tr><td>自立更生世帯</td><td>+20</td><td>別表1-6該当かつ就労による自立更生が特に必要</td></tr>
<tr><td>保育士加点（150H以上）</td><td>+110</td><td>札幌市内の認可保育所等で保育業務に従事</td></tr>
</table>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>a)産休明け・育休明け、b)きょうだい在園、c)認定こども園きょうだい、d)育休明け＋きょうだいは<strong>重複加算できません</strong>。該当するいずれか1つのみ加算されます。また、b)〜d)とe)同時入所の両方に該当する場合はb)〜d)が優先されます。</p>
</div>

<h2>加点を最大化する戦略</h2>
<ul>
<li>育休明け加点（+40）は多くの方が該当するため、申請漏れのないように</li>
<li>きょうだいが在園中なら+80が加算されるので、第1希望をきょうだいの園にすると同点時にも有利</li>
<li>育休明けかつきょうだい在園の場合は+100が一括加算（+40と+80の合算ではない）</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新の利用調整基準表は<a href="https://kosodate.city.sapporo.jp/mokuteki/azukeru/hoiku/ninka/835.html" target="_blank" rel="noopener">札幌市子育てサイト</a>でPDFが公開されています。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 100,
  },

  // 2. 入園点数のしくみ
  {
    slug: "scoring-system-guide",
    citySlug: "sapporo",
    title: "札幌市の入園点数のしくみ　基本点数と調整指数をやさしく解説",
    description:
      "札幌市の保育園入園選考で使われる「基本点数」と「調整指数」の仕組みを、初めての方にもわかるように解説します。",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>点数（指数）とは？</h2>
<p>札幌市の保育園入園は「先着順」ではなく「利用調整基準表」に基づく<strong>指数の高い順</strong>に内定が決まります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>合計指数 ＝ 基本点数（別表1：父＋母）＋ 調整指数（別表2）</p>
</div>

<h2>基本点数（別表1）とは？</h2>
<p>父母それぞれの「保育が必要な理由」を点数化したものです。1人あたり最大<span class="highlight">100点</span>で、父母合計の最大は<span class="highlight">200点</span>。</p>
<p>最も多い「就労」の場合、勤務日数と月の労働時間数で点数が決まります。</p>

<table>
<tr><th>稼動日数</th><th>月労働時間</th><th>指数</th></tr>
<tr><td rowspan="4">20日以上</td><td>150時間以上</td><td>100</td></tr>
<tr><td>120時間以上150時間未満</td><td>90</td></tr>
<tr><td>80時間以上120時間未満</td><td>85</td></tr>
<tr><td>64時間以上80時間未満</td><td>80</td></tr>
<tr><td rowspan="4">16日以上20日未満</td><td>150時間以上</td><td>90</td></tr>
<tr><td>120時間以上150時間未満</td><td>80</td></tr>
<tr><td>80時間以上120時間未満</td><td>75</td></tr>
<tr><td>64時間以上80時間未満</td><td>70</td></tr>
<tr><td rowspan="3">16日未満</td><td>150時間以上</td><td>80</td></tr>
<tr><td>120時間以上150時間未満</td><td>75</td></tr>
<tr><td>64時間以上120時間未満</td><td>70</td></tr>
</table>

<h2>調整指数（別表2）とは？</h2>
<p>世帯の特別な事情に応じて加算される点数です。代表的なものは以下の通りです。</p>
<ul>
<li>ひとり親家庭：<span class="highlight">+120点</span></li>
<li>きょうだいが認可保育所等にすでに入所：<span class="highlight">+80点</span></li>
<li>産休明け・育休明けによる入所：<span class="highlight">+40点</span></li>
<li>産休明け・育休明け＋きょうだい在園：<span class="highlight">+100点</span></li>
<li>きょうだい同時入所申請：<span class="highlight">+30点</span></li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>利用調整基準表の全項目は<a href="https://kosodate.city.sapporo.jp/mokuteki/azukeru/hoiku/ninka/835.html" target="_blank" rel="noopener">札幌市子育てサイト「認可保育所等への入所手続きについて」</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 65,
  },

  // 3. 時短勤務と点数
  {
    slug: "jitan-kinmu-score",
    citySlug: "sapporo",
    title: "時短勤務だと点数は下がる？札幌市の時短勤務と保活",
    description:
      "札幌市で時短勤務の場合の基本点数の計算方法と、保活への影響を解説します。",
    image:
      "https://images.unsplash.com/photo-1516534775068-ba3e7458af70?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>時短勤務だと点数はどうなる？</h2>
<p>札幌市の基本点数は、月の<strong>労働時間数</strong>と<strong>稼動日数</strong>で決まります。時短勤務の場合、月の労働時間が減るため、基本点数が下がる可能性があります。</p>

<h3>稼動日20日以上の場合の基本点数</h3>
<table>
<tr><th>月労働時間</th><th>基本点数</th></tr>
<tr><td>150時間以上</td><td>100点</td></tr>
<tr><td>120時間以上150時間未満</td><td>90点</td></tr>
<tr><td>80時間以上120時間未満</td><td>85点</td></tr>
<tr><td>64時間以上80時間未満</td><td>80点</td></tr>
</table>

<h2>具体的なシミュレーション</h2>
<p>例えば、1日6時間・週5日勤務の場合、月の労働時間は約<span class="highlight">120〜130時間</span>となり、基本点数は<span class="highlight">90点</span>です。フルタイムの100点との差は10点になります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>父母の合計で考えると、一方が時短でも父100点＋母90点＝190点。育休明け加点+40で230点になります。フルタイム共働き240点との差は10点です。</p>
</div>

<h2>入園後の時短は影響しない</h2>
<p>重要なのは、<strong>入園選考時の点数</strong>です。入園が決まった後に時短勤務に切り替えても、退園になることはありません。</p>

<h3>入園時の申請はどうすれば？</h3>
<p>就労証明書には復職後の実際の勤務予定を記入してもらいます。入園選考の段階でフルタイムと記入し、入園後に時短に変更することは避けましょう。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>就労証明書の内容と実態が異なる場合、入所の取り消しになる可能性があります。正確な情報を記入してください。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>利用調整基準表は<a href="https://kosodate.city.sapporo.jp/mokuteki/azukeru/hoiku/ninka/835.html" target="_blank" rel="noopener">札幌市子育てサイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 90,
  },

  // 4. 二次募集
  {
    slug: "niji-boshu",
    citySlug: "sapporo",
    title: "札幌市の二次調整（2次募集）を徹底解説　1次で落ちても諦めない",
    description:
      "札幌市の保育園4月入園における二次調整の仕組み、対象者、申込方法、結果通知の時期を解説します。",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>二次調整とは？</h2>
<p>札幌市の4月入園は<strong>1次調整</strong>と<strong>2次調整</strong>の2回に分かれています。1次で不承諾になった方や、1次の締切に間に合わなかった方が2次調整に申込できます。</p>

<h3>令和8年度（2026年度）4月入園の日程</h3>
<table>
<tr><th></th><th>1次調整</th><th>2次調整</th></tr>
<tr><td>申込締切</td><td>令和7年11月28日（金）</td><td>令和8年1月30日（金）</td></tr>
<tr><td>結果通知</td><td>令和8年1月21日（水）</td><td>令和8年3月3日（火）</td></tr>
</table>

<h2>2次調整の対象者</h2>
<ul>
<li>1次調整で不承諾になった方（自動的に2次の対象になります）</li>
<li>1次の申込締切に間に合わなかった方</li>
<li>1次の結果を見て希望園を変更したい方</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>1次で不承諾だった方は、2次で希望園の追加・変更が可能です。1次で人気が集中した園を外し、空きのありそうな園を追加する戦略が有効です。</p>
</div>

<h2>2次調整のコツ</h2>
<ul>
<li>1次の受入予定数と申込数を札幌市公式サイトで確認し、空きのある園を狙う</li>
<li>新設園や小規模保育事業所は2次でも枠が残っている場合がある</li>
<li>区をまたいだ申込も可能なので、近隣の区も検討</li>
<li>希望園はできるだけ多く書く</li>
</ul>

<h2>2次でも落ちた場合</h2>
<p>2次でも不承諾の場合は、その後の途中入園（随時調整）に申込を継続できます。空きが出れば随時調整が行われますので、諦めずに申込を続けましょう。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>2次調整の申込も郵送が原則です。締切は「必着」のため、余裕をもって送付してください。郵送の不着・遅延について札幌市は責任を負いません。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>受入予定数・申込数は<a href="https://kosodate.city.sapporo.jp/mokuteki/azukeru/hoiku/ninka/7656.html" target="_blank" rel="noopener">札幌市子育てサイト「受入予定数・申込数について」</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 80,
  },

  // 5. 来年度の変更点
  {
    slug: "r8-latest-changes",
    citySlug: "sapporo",
    title: "令和8年度（2026年度）札幌市の保育園最新情報まとめ",
    description:
      "令和8年度の札幌市の保育園に関する最新の変更点、制度変更をまとめました。",
    image:
      "https://images.unsplash.com/photo-1504711434969-e33886168d6c?w=800&h=400&fit=crop",
    category: "最新情報",
    categoryColor: "blue",
    content: `<h2>令和8年度の主な変更点</h2>
<p>令和8年度（2026年度）の札幌市の保育園に関する最新情報をまとめました。</p>

<h3>育児休業復職期間の変更</h3>
<p>令和8年4月1日以降に入所する児童については、育児休業の復職期間が変更されました。<strong>入所する日を1日目として、その翌月前日までに育児休業を終了し、入所する日の翌月同日までに復職する</strong>必要があります。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>以前より復職期限が明確化されています。育休中の方は復職日の設定に注意してください。</p>
</div>

<h3>第2子以降の保育料無償化が継続</h3>
<p>令和6年4月から始まった第2子以降の保育料無償化（所得制限なし）は、令和8年度も継続しています。保護者の収入や上の子の年齢に関係なく、第2子以降は無料です。</p>

<h3>利用調整基準表の確認</h3>
<p>利用調整基準表は年度ごとに見直されることがあります。令和8年度の基準表が公開されていますので、必ず最新版で点数を計算してください。</p>

<h2>令和8年度4月入園のスケジュール</h2>
<table>
<tr><th></th><th>1次調整</th><th>2次調整</th></tr>
<tr><td>申込締切</td><td>令和7年11月28日（金）</td><td>令和8年1月30日（金）</td></tr>
<tr><td>結果通知</td><td>令和8年1月21日（水）</td><td>令和8年3月3日（火）</td></tr>
</table>

<h2>申込の注意事項</h2>
<ul>
<li>申込は原則郵送（お住まいの区の保健センター宛て）</li>
<li>郵送物到着日が受付日</li>
<li>不着・遅延の責任は札幌市は負わないため、余裕をもって送付</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新の入所案内は<a href="https://kosodate.city.sapporo.jp/mokuteki/azukeru/hoiku/ninka/8935.html" target="_blank" rel="noopener">札幌市子育てサイト「令和8年4月1日から保育所・認定こども園の利用を希望される方へ」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 70,
  },

  // 6. 同点時の優先順位
  {
    slug: "tie-breaking-rules",
    citySlug: "sapporo",
    title: "同点で並んだらどうなる？札幌市の同点時優先ルール",
    description:
      "札幌市の保育園選考で合計指数が同点になった場合のタイブレーク（優先順位）のルールを詳しく解説します。",
    image:
      "https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>同点時は別表3で決まる</h2>
<p>札幌市の入園選考では、合計指数が同じ場合、利用調整基準表の<strong>別表3</strong>に記載されている順に優先されます。</p>

<h3>優先順位（別表3）</h3>
<table>
<tr><th>順位</th><th>優先事項</th></tr>
<tr><td>1</td><td>当該希望園に、きょうだいがすでに入所している</td></tr>
<tr><td>2</td><td>きょうだいがすでに（別の園に）入所している</td></tr>
<tr><td>3</td><td>所得割額が低い世帯</td></tr>
<tr><td>4</td><td>均等割額が低い世帯</td></tr>
<tr><td>5</td><td>ひとり親世帯または障がい者同居世帯</td></tr>
<tr><td>6</td><td>申請児童が障がい児</td></tr>
<tr><td>7</td><td>多子世帯</td></tr>
<tr><td>8</td><td>核家族世帯</td></tr>
<tr><td>9</td><td>世帯の状況から総合的に判断</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>同点時に最も有利なのは「希望する園にきょうだいが在園している」ケースです。第1希望をきょうだいの園にすることで、同点勝負で優先されます。</p>
</div>

<h2>所得が低いほうが有利？</h2>
<p>3番目の優先事項が「所得割額が低い世帯」であるため、同点の場合は世帯年収が低いほうが有利になります。ただし、きょうだい在園の優先順位のほうが上なので、所得だけで決まるわけではありません。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>保育料の算定に使う市民税額は毎年変わります。4月〜8月は前年度、9月〜3月は当年度の税額が適用されるため、同点時の判定に影響する可能性があります。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>利用調整基準表の全文は<a href="https://kosodate.city.sapporo.jp/mokuteki/azukeru/hoiku/ninka/835.html" target="_blank" rel="noopener">札幌市子育てサイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 85,
  },

  // 7. 認可外で加点を得る
  {
    slug: "ninkagai-katen",
    citySlug: "sapporo",
    title: "認可外保育施設の活用で加点を得る？札幌市の保活戦略",
    description:
      "札幌市で認可外保育施設を活用した保活戦略と、認可外から認可への移行時に得られる大きな加点について解説します。",
    image:
      "https://images.unsplash.com/photo-1565538420870-da08ff96a207?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>認可外に預けると加点はある？</h2>
<p>札幌市の利用調整基準表では、<strong>認可外保育施設に預けているだけでは直接的な加点はありません</strong>。「認可外に預けて復職しているから有利」というのはよくある誤解です。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>一部の自治体では認可外利用で加点がありますが、札幌市にはその制度はありません。基本点数は就労時間と稼動日数で決まるため、認可外に預けて働いている場合もフルタイム=100点の扱いは同じです。</p>
</div>

<h2>認可外が有利に働くケース</h2>
<p>ただし、認可外保育施設が認可保育所等に<strong>移行する場合</strong>は、非常に大きな加点が得られます。</p>

<table>
<tr><th>ケース</th><th>指数</th></tr>
<tr><td>認可外が認可に移行する際に、同一施設に継続入所する場合</td><td><span class="highlight">700点</span></td></tr>
</table>

<p>移行する日の前日（認可外として運営する最終日）に在籍している児童が、当該施設での入所継続を第1希望とした場合にのみ適用されます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>認可移行が予定されている認可外保育施設に入れておくことで、移行時に700点という圧倒的な加点を得られる可能性があります。認可移行の予定がある施設かどうかを事前に確認しておきましょう。</p>
</div>

<h2>認可外を保活に活かすその他の戦略</h2>
<ul>
<li><strong>0歳児を認可外に預けて復職</strong>：育休明け加点（+40点）を確保しつつ、1歳4月に認可を申し込む</li>
<li><strong>企業主導型保育の活用</strong>：利用調整不要で入園でき、認可に空きが出るまでのつなぎになる</li>
<li><strong>地域型保育事業所</strong>：認可の枠組みで、3歳以降の連携施設への転園時に700点が付与される（認可外ではなく認可の一種）</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>認可外保育施設の情報は<a href="https://kosodate.city.sapporo.jp/mokuteki/azukeru/hoiku/ninnkagai/842.html" target="_blank" rel="noopener">札幌市子育てサイト「認可外保育施設について」</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 75,
  },

  // 8. 落ちたときの選択肢
  {
    slug: "ochita-sentakushi",
    citySlug: "sapporo",
    title: "保育園に落ちたらどうする？札幌市での選択肢と次の一手",
    description:
      "札幌市で認可保育所に不承諾になった場合の選択肢（二次調整・認可外・企業主導型・育休延長など）を整理します。",
    image:
      "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>不承諾でも選択肢はある</h2>
<p>札幌市の認可保育所に落ちてしまっても、慌てる必要はありません。いくつかの選択肢を整理しておきましょう。</p>

<h3>選択肢1：2次調整に申込む</h3>
<p>1次で不承諾になった場合、<strong>2次調整</strong>に自動的に申込が継続されます。希望園の変更・追加も可能です。1次で競争が激しかった園を外し、空きのある園を追加するのが有効です。</p>

<h3>選択肢2：途中入園（随時調整）を待つ</h3>
<p>2次でも入れなかった場合、退園する児童が出れば随時調整が行われます。申込を取り下げなければ、空きが出るたびに対象になります。</p>

<h3>選択肢3：認可外保育施設に入園</h3>
<p>認可外保育施設は施設に直接申込むため、利用調整（点数制）がありません。月額<span class="highlight">3万〜7万円</span>程度が目安です。認可に空きが出るまでのつなぎとして有効です。</p>

<h3>選択肢4：企業主導型保育施設</h3>
<p>企業主導型保育施設の「地域枠」は、その企業の従業員でなくても利用できます。こちらも施設に直接申込みで、利用調整はありません。</p>

<h3>選択肢5：育休延長</h3>
<p>保育園に入れなかった場合、不承諾通知を会社に提出することで<strong>育休を最長2歳まで延長</strong>できます。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>育休延長を目的として意図的に入園できないように申込む行為は、育児休業給付金の不支給につながるリスクがあります。ハローワークの審査が厳格化されています。</p>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>不承諾になっても申込を取り下げないことが重要です。随時調整の対象になるため、年度途中に空きが出れば声がかかる可能性があります。</p>
</div>

<h2>次の4月入園に向けてできること</h2>
<ul>
<li>点数を上げられる要素がないか利用調整基準表を再確認</li>
<li>希望園を増やして不承諾リスクを下げる</li>
<li>新設園の情報をチェック</li>
<li>0歳児クラスのほうが枠に余裕があるため、入園時期の見直しも検討</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>入所手続きの詳細は<a href="https://kosodate.city.sapporo.jp/mokuteki/azukeru/hoiku/ninka/835.html" target="_blank" rel="noopener">札幌市子育てサイト</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 80,
  },

  // 9. 入園競争の実態（フルタイム200点＋育休40点）
  {
    slug: "fulltime-dual-income",
    citySlug: "sapporo",
    title: "フルタイム共働き200点で入れる？札幌市の入園競争の実態",
    description:
      "札幌市でフルタイム共働き（基本点数200点）の場合の入園可能性と、育休明け加点40点を含めた競争の実態を解説します。",
    image:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>フルタイム共働きの基本点数は200点</h2>
<p>札幌市では、父母ともにフルタイム（月150時間以上・稼動日20日以上）で働いている場合、基本点数は父<span class="highlight">100点</span>＋母<span class="highlight">100点</span>＝<span class="highlight">200点</span>になります。</p>

<h2>200点だけで入れるのか？</h2>
<p>200点は基本点数の満点ですが、多くの申込者がフルタイム共働きのため、200点同士の競争になるケースが多いです。ここで差がつくのが<strong>調整指数</strong>です。</p>

<h3>典型的な点数パターン</h3>
<table>
<tr><th>パターン</th><th>合計指数</th></tr>
<tr><td>フルタイム共働き（加点なし）</td><td>200点</td></tr>
<tr><td>フルタイム＋育休明け</td><td>240点</td></tr>
<tr><td>フルタイム＋きょうだい在園</td><td>280点</td></tr>
<tr><td>フルタイム＋育休明け＋きょうだい在園</td><td>300点</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>育休明け加点<span class="highlight">+40点</span>は多くの方が該当するため、フルタイム共働きの標準的なラインは<span class="highlight">240点</span>と考えておきましょう。200点のままでは人気園への入園は厳しくなります。</p>
</div>

<h2>240点でも安心できない？</h2>
<p>きょうだい在園加点（+80点）を持つ世帯は280点になるため、人気園では240点では届かないこともあります。希望園を多めに書いてリスク分散することが大切です。</p>

<h2>同点の場合はどうなる？</h2>
<p>合計指数が同点の場合は、別表3の優先順位で決定されます。</p>
<ol>
<li>当該希望園にきょうだいがすでに入所</li>
<li>きょうだいがすでに入所（別の園）</li>
<li>所得割額が低い世帯</li>
<li>均等割額が低い世帯</li>
<li>ひとり親世帯または障がい者同居世帯</li>
</ol>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>同点時の優先順位は<a href="https://kosodate.city.sapporo.jp/mokuteki/azukeru/hoiku/ninka/835.html" target="_blank" rel="noopener">札幌市の利用調整基準表（別表3）</a>に記載されています。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 95,
  },

  // 10. 保活スケジュール
  {
    slug: "hokatsu-schedule",
    citySlug: "sapporo",
    title: "札幌市の保活スケジュール　令和8年度4月入園の流れを解説",
    description:
      "札幌市の認可保育所等の4月入園に向けた申込時期・選考の流れ・結果通知時期をわかりやすく解説します。",
    image:
      "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>令和8年度（2026年度）4月入園のスケジュール</h2>
<p>札幌市の4月入園は、<strong>1次調整</strong>と<strong>2次調整</strong>の2回に分かれています。早めにスケジュールを把握して動き出すことが保活成功のカギです。</p>

<h3>1次調整</h3>
<table>
<tr><th>項目</th><th>日程</th></tr>
<tr><td>申込締切</td><td>令和7年11月28日（金）17時15分</td></tr>
<tr><td>結果通知</td><td>令和8年1月21日（水）郵送</td></tr>
</table>

<h3>2次調整</h3>
<table>
<tr><th>項目</th><th>日程</th></tr>
<tr><td>申込締切</td><td>令和8年1月30日（金）</td></tr>
<tr><td>結果通知</td><td>令和8年3月3日（火）郵送</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>申込は原則郵送で、お住まいの区の保健センター（健康・子ども課 子ども家庭福祉係）に提出します。郵送物到着日が受付日となるため、余裕をもって送付しましょう。</p>
</div>

<h2>いつから動き始めるべき？</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>4月〜6月：情報収集スタート</strong>
<p>保育園の種類やエリアを調べましょう。札幌市子育てサイトで施設一覧を確認できます。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>7月〜9月：保育園見学</strong>
<p>気になる園に電話して予約。見学のベストシーズンです。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>10月：入所案内を入手</strong>
<p>札幌市が発行する「認可保育所等入所案内」は保活の必須資料です。</p>
</div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content">
<strong>10月〜11月：申込書類の準備・提出</strong>
<p>就労証明書などの書類を揃えて郵送で提出します。</p>
</div>
</div>

<h2>途中入園（5月〜3月）の申込</h2>
<p>途中入園を希望する場合は、随時お住まいの区の保健センターに申込ができます。空きのある施設への入所が可能です。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>申込方法の詳細は<a href="https://kosodate.city.sapporo.jp/mokuteki/azukeru/hoiku/ninka/835.html" target="_blank" rel="noopener">札幌市子育てサイト「認可保育所等への入所手続きについて」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 55,
  },

  // 11. 園見学ガイド
  {
    slug: "nursery-visit-guide",
    citySlug: "sapporo",
    title: "札幌市の保育園見学ガイド　見るべきポイントと質問リスト",
    description:
      "札幌市で保育園見学をする際にチェックすべきポイント、園への質問リスト、見学時期の目安をまとめました。",
    image:
      "https://images.unsplash.com/photo-1544776193-352d25ca82cd?w=800&h=400&fit=crop",
    category: "園えらび",
    categoryColor: "purple",
    content: `<h2>保育園見学はいつ行くべき？</h2>
<p>札幌市の4月入園を目指すなら、<strong>7月〜9月</strong>が見学のベストシーズンです。10月に入ると入所案内が配布され、11月末の申込締切に向けて慌ただしくなるため、早めに動きましょう。</p>

<h3>見学の申込方法</h3>
<p>園に直接電話して見学を予約します。多くの園では午前中（9:30〜11:00頃）の見学を推奨しています。子どもたちが活動している様子を見られる時間帯がおすすめです。</p>

<h2>見学時のチェックリスト</h2>
<table>
<tr><th>チェック項目</th><th>確認ポイント</th></tr>
<tr><td>園庭の広さ</td><td>札幌市は冬が長いため、室内の遊び場も重要</td></tr>
<tr><td>保育士の人数</td><td>配置基準を満たしているか、余裕があるか</td></tr>
<tr><td>給食の内容</td><td>自園調理か外部委託か、アレルギー対応の有無</td></tr>
<tr><td>延長保育</td><td>最大何時まで対応か、延長保育料はいくらか</td></tr>
<tr><td>冬場の対応</td><td>雪遊びの頻度、除雪の状況、送迎時の動線</td></tr>
<tr><td>持ち物</td><td>おむつの処理方法（持ち帰りか園処分か）、布団の有無</td></tr>
<tr><td>病児対応</td><td>体調不良時の連絡基準、お迎え要請の目安</td></tr>
</table>

<h2>園に聞くべき質問リスト</h2>
<ul>
<li>昨年度の申込倍率はどのくらいでしたか？</li>
<li>慣らし保育の期間と進め方は？</li>
<li>保護者参加の行事は年に何回ありますか？</li>
<li>土曜保育は利用しやすいですか？</li>
<li>駐車場・駐輪場の有無とルールは？</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>札幌市は10区あり、区をまたいだ申込も可能です。通勤経路上の隣接区にある園も候補に入れておくと選択肢が広がります。</p>
</div>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>見学時の印象だけで決めず、受入予定数と申込数のデータも確認しましょう。人気園に偏ると不承諾のリスクが高まります。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>札幌市内の認可保育所等の施設一覧は<a href="https://kosodate.city.sapporo.jp/mokuteki/azukeru/hoiku/ninka/835.html" target="_blank" rel="noopener">札幌市子育てサイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 45,
  },

  // 12. 0歳入園 vs 1歳入園
  {
    slug: "zero-vs-one-year",
    citySlug: "sapporo",
    title: "0歳入園と1歳入園どちらが有利？札幌市のデータで比較",
    description:
      "札幌市で0歳児クラスと1歳児クラスの入りやすさをデータで比較し、入園時期の選び方を解説します。",
    image:
      "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=800&h=400&fit=crop",
    category: "データ分析",
    categoryColor: "teal",
    content: `<h2>0歳と1歳、どちらが入りやすい？</h2>
<p>結論から言うと、札幌市では<strong>0歳児クラスのほうが入りやすい</strong>傾向があります。1歳児クラスは育休明けの申込が集中するため、競争率が高くなります。</p>

<h3>なぜ1歳児クラスは激戦なのか</h3>
<ul>
<li>育休は原則1年のため、1歳4月入園を目指す家庭が最も多い</li>
<li>0歳児クラスからの持ち上がりで、1歳児クラスの新規受入枠が少ない</li>
<li>札幌市の1歳児の定員は0歳児より多いが、申込者数はそれ以上に増える</li>
</ul>

<h2>0歳入園のメリット・デメリット</h2>
<table>
<tr><th></th><th>メリット</th><th>デメリット</th></tr>
<tr><td>0歳入園</td><td>競争率が低い / 1歳クラスへの持ち上がりが確実</td><td>育休を早めに切り上げる必要あり / 月齢によっては対応園が限られる</td></tr>
<tr><td>1歳入園</td><td>育休をフルに取得できる / 子どもとの時間が長い</td><td>競争率が高い / 不承諾リスクが高い</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>札幌市では0歳児の受入開始月齢が園によって異なります。「産休明け（生後57日）」から受け入れる園もあれば、「生後5か月」「生後6か月」からの園もあります。出産予定日と入園希望月から逆算して確認しましょう。</p>
</div>

<h2>データから見る判断のポイント</h2>
<p>札幌市は毎年、受入予定数と申込数を公表しています。希望するエリアの園ごとに、0歳児と1歳児の倍率を比較してみましょう。</p>

<h3>確認の手順</h3>
<ol>
<li>札幌市子育てサイトで受入予定数・申込数のPDFを入手</li>
<li>希望エリアの園をリストアップ</li>
<li>0歳児クラスと1歳児クラスの「受入予定数」と「申込数」を比較</li>
<li>申込数 ÷ 受入予定数で倍率を計算</li>
</ol>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>0歳入園を選ぶ場合、育休給付金の受給期間が短くなります。家計への影響も含めて検討しましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>受入予定数・申込数のデータは<a href="https://kosodate.city.sapporo.jp/mokuteki/azukeru/hoiku/ninka/7656.html" target="_blank" rel="noopener">札幌市子育てサイト「受入予定数・申込数について」</a>で公開されています。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 65,
  },

  // 13. ひとり親の保活ガイド
  {
    slug: "single-parent-guide",
    citySlug: "sapporo",
    title: "ひとり親家庭の保活ガイド　札幌市の加点と支援制度まとめ",
    description:
      "札幌市でひとり親家庭が保育園入園時に得られる加点や、利用できる支援制度を詳しく解説します。",
    image:
      "https://images.unsplash.com/photo-1531983412531-1f49a365ffed?w=800&h=400&fit=crop",
    category: "制度を知る",
    categoryColor: "rose",
    content: `<h2>ひとり親家庭は大きな加点がある</h2>
<p>札幌市の利用調整基準表では、ひとり親家庭に<strong>調整指数+120点</strong>が加算されます。これは全調整指数の中でも最大級の加点です。</p>

<h3>ひとり親の場合の点数シミュレーション</h3>
<table>
<tr><th>パターン</th><th>基本点数</th><th>調整指数</th><th>合計</th></tr>
<tr><td>フルタイム就労＋ひとり親</td><td>100点</td><td>+120点</td><td>220点</td></tr>
<tr><td>フルタイム就労＋ひとり親＋きょうだい在園</td><td>100点</td><td>+120点+80点</td><td>300点</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>ひとり親の場合、基本点数は片親分のみですが、+120点の調整指数により、共働き世帯（200点）を上回る合計指数になるケースが多いです。</p>
</div>

<h2>同点時の優先順位でも有利</h2>
<p>利用調整基準表の別表3（同点時の優先順位）では、「ひとり親世帯」は第5位に位置づけられています。同点の場合にも優先されやすくなっています。</p>

<h2>ひとり親家庭が利用できる支援制度</h2>
<h3>保育料の軽減</h3>
<ul>
<li><strong>第2子以降の保育料無償化</strong>：札幌市では所得制限なく第2子以降は無料</li>
<li><strong>市民税非課税世帯</strong>：0〜2歳児クラスの保育料が無料</li>
<li><strong>年収360万円未満相当世帯</strong>：副食費（おかず代）が免除</li>
</ul>

<h3>その他の支援</h3>
<ul>
<li><strong>児童扶養手当</strong>：月額最大45,500円（令和7年度）</li>
<li><strong>ひとり親家庭等医療費助成</strong>：医療費の自己負担が軽減</li>
<li><strong>母子父子寡婦福祉資金貸付</strong>：就学資金や生活資金の低利貸付</li>
</ul>

<h2>申請時に必要な書類</h2>
<p>ひとり親加点を受けるためには、入園申込時にひとり親であることを証明する書類が必要です。</p>
<ul>
<li>児童扶養手当証書の写し</li>
<li>戸籍謄本（離婚の記載があるもの）</li>
</ul>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>離婚協議中（別居中）の場合、ひとり親加点が適用されるかどうかは個別の判断になります。事前にお住まいの区の保健センターに相談してください。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>ひとり親家庭向けの支援制度は<a href="https://kosodate.city.sapporo.jp/mokuteki/teate/hitorioya/index.html" target="_blank" rel="noopener">札幌市子育てサイト「ひとり親家庭への支援」</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 50,
  },

  // 14. 育休のタイミング
  {
    slug: "ikukyu-timing",
    citySlug: "sapporo",
    title: "育休はいつまで取る？札幌市の保活から逆算する復職タイミング",
    description:
      "札幌市の保育園入園スケジュールから逆算した、育児休業の最適な取得期間と復職タイミングを解説します。",
    image:
      "https://images.unsplash.com/photo-1493894473891-10fc1e5dbd22?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>育休と保活の関係</h2>
<p>育児休業の取得期間は保活と密接に関係しています。札幌市の入園スケジュールから逆算して、最適な育休期間を計画しましょう。</p>

<h3>基本の考え方</h3>
<p>育休は原則<strong>子どもが1歳になるまで</strong>取得できます。保育園に入れない場合は最長<strong>2歳まで延長</strong>可能です。4月入園を目指すなら、お子さんの生まれ月によって戦略が変わります。</p>

<h2>生まれ月別の保活戦略</h2>
<table>
<tr><th>生まれ月</th><th>0歳4月入園</th><th>1歳4月入園</th><th>おすすめ</th></tr>
<tr><td>4月〜7月生まれ</td><td>生後8〜11か月</td><td>1歳8か月〜1歳11か月</td><td>どちらも選択可能</td></tr>
<tr><td>8月〜10月生まれ</td><td>生後5〜7か月</td><td>1歳5か月〜1歳7か月</td><td>0歳入園は月齢が低め</td></tr>
<tr><td>11月〜1月生まれ</td><td>生後2〜4か月</td><td>1歳2か月〜1歳4か月</td><td>1歳4月入園が現実的</td></tr>
<tr><td>2月〜3月生まれ</td><td>生後1〜2か月</td><td>1歳1か月〜1歳2か月</td><td>1歳4月入園一択</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>札幌市では園ごとに受入開始月齢が異なります。「産休明け（生後57日）」対応の園は限られるため、早生まれのお子さんの0歳入園は選択肢が少なくなります。</p>
</div>

<h2>復職期限に注意</h2>
<p>令和8年4月1日以降の入所では、<strong>入所日を1日目としてその翌月前日までに育休を終了し、入所日の翌月同日までに復職</strong>する必要があります。</p>

<h3>具体例</h3>
<p>4月1日入所の場合：</p>
<ul>
<li>育休終了期限：4月30日まで</li>
<li>復職期限：5月1日まで</li>
</ul>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>復職期限を過ぎると入所が取り消しになる可能性があります。会社との復職日調整は早めに行いましょう。慣らし保育の期間（1〜2週間程度）も考慮してください。</p>
</div>

<h2>育休明け加点を活用する</h2>
<p>育休明けで入所する場合、調整指数に<strong>+40点</strong>が加算されます。この加点は保活において非常に重要です。育休中に復職予定であることを就労証明書に明記してもらいましょう。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>復職期限の詳細は<a href="https://kosodate.city.sapporo.jp/mokuteki/azukeru/hoiku/ninka/8935.html" target="_blank" rel="noopener">札幌市子育てサイト「令和8年4月1日から保育所・認定こども園の利用を希望される方へ」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 55,
  },

  // 15. 認可外保育施設の選び方
  {
    slug: "ninkagai-selection",
    citySlug: "sapporo",
    title: "札幌市の認可外保育施設の選び方　安全にあずけるチェックポイント",
    description:
      "札幌市で認可外保育施設を選ぶ際に確認すべき安全基準、料金の目安、施設の種類を解説します。",
    image:
      "https://images.unsplash.com/photo-1587654780291-39c9404d7dd0?w=800&h=400&fit=crop",
    category: "園えらび",
    categoryColor: "purple",
    content: `<h2>認可外保育施設とは？</h2>
<p>認可外保育施設は、国の認可基準を満たしていない保育施設の総称です。ただし「認可外＝質が低い」わけではなく、独自の保育方針や特色ある教育を提供する施設も多くあります。</p>

<h3>札幌市の認可外保育施設の種類</h3>
<table>
<tr><th>種類</th><th>特徴</th></tr>
<tr><td>認可外保育施設（一般）</td><td>施設に直接申込。料金は施設ごとに設定</td></tr>
<tr><td>企業主導型保育施設</td><td>企業が運営。地域枠で一般利用も可能</td></tr>
<tr><td>事業所内保育施設</td><td>企業の従業員向けだが地域枠がある場合も</td></tr>
</table>

<h2>認可外を選ぶ際のチェックリスト</h2>
<ul>
<li><strong>指導監督基準を満たしているか</strong>：札幌市が毎年立入調査を実施し、結果を公表しています</li>
<li><strong>保育士の配置</strong>：保育従事者のうち保育士資格者が3分の1以上いるか</li>
<li><strong>避難経路</strong>：消防設備、避難訓練の実施状況</li>
<li><strong>SIDS対策</strong>：午睡時のブレスチェック（呼吸確認）を実施しているか</li>
<li><strong>保険加入</strong>：賠償責任保険に加入しているか</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>札幌市は認可外保育施設の立入調査結果を公開しています。「指導監督基準を満たす旨の証明書」が交付されている施設を選ぶと安心です。</p>
</div>

<h2>料金の目安</h2>
<p>認可外保育施設の保育料は施設ごとに異なりますが、札幌市内の目安は月額<span class="highlight">3万〜7万円</span>程度です。認可保育所のように所得に応じた料金ではないため、世帯年収が高い家庭にとっては割安になる場合もあります。</p>

<h3>無償化の対象になるケース</h3>
<p>3〜5歳児は月額<span class="highlight">37,000円</span>まで、0〜2歳児（住民税非課税世帯）は月額<span class="highlight">42,000円</span>まで無償化の対象です。ただし、認可保育所等に入所できなかったことを示す「保育の必要性の認定」が必要です。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>認可外保育施設は施設によって質のばらつきが大きいため、必ず見学し、スタッフの対応や施設の衛生状態を自分の目で確認してください。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>認可外保育施設の一覧と立入調査結果は<a href="https://kosodate.city.sapporo.jp/mokuteki/azukeru/hoiku/ninnkagai/842.html" target="_blank" rel="noopener">札幌市子育てサイト「認可外保育施設について」</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 40,
  },

  // 16. 双子の保活
  {
    slug: "futago-hokatsu",
    citySlug: "sapporo",
    title: "双子（多胎児）の保活ガイド　札幌市の加点と同園申込のコツ",
    description:
      "札幌市で双子や三つ子を保育園に入れる際の加点制度、同じ園に入るためのポイントを解説します。",
    image:
      "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=800&h=400&fit=crop",
    category: "制度を知る",
    categoryColor: "rose",
    content: `<h2>双子の保活は特有の悩みがある</h2>
<p>双子（多胎児）の保活では「同じ園に入れるか」「別々の園になったら送迎が大変」という不安がつきものです。札幌市の制度を正しく理解して対策しましょう。</p>

<h2>きょうだい同時入所の加点</h2>
<p>札幌市では、きょうだいを同時に入所申請する場合、調整指数に<strong>+30点</strong>が加算されます。双子の場合もこの加点が適用されます。</p>

<table>
<tr><th>ケース</th><th>調整指数</th></tr>
<tr><td>きょうだい同時入所申請</td><td>+30点</td></tr>
<tr><td>育休明け＋きょうだい同時入所</td><td>+40点（育休明け）+ +30点（同時入所）= +70点</td></tr>
</table>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>「きょうだい在園」加点（+80点）と「きょうだい同時入所」加点（+30点）は別の項目です。すでに上の子が在園している場合は+80点が優先され、+30点との重複加算はできません。</p>
</div>

<h2>同じ園に入るための戦略</h2>
<ul>
<li><strong>同一園を第1希望に</strong>：同点時の優先順位（別表3）で、きょうだいが同じ園を希望している場合に有利に働きます</li>
<li><strong>定員に余裕のある園を選ぶ</strong>：双子は2枠必要なため、受入予定数が多い園のほうが入りやすい</li>
<li><strong>新設園を狙う</strong>：開園初年度は全クラスの定員が空いているため、双子でも入りやすい</li>
<li><strong>希望園は多めに書く</strong>：双子2人が同じ園に入る確率を上げるため、選択肢を広げる</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>双子が別々の園に内定した場合でも、区の保健センターに相談すれば、可能な範囲で調整してもらえることがあります。結果通知が届いたら早めに相談しましょう。</p>
</div>

<h2>多胎児家庭の支援制度</h2>
<ul>
<li><strong>さっぽろ子育て応援事業</strong>：多胎児家庭向けの交流会やサポートがあります</li>
<li><strong>ファミリーサポート</strong>：送迎の補助を依頼できる制度です</li>
<li><strong>第2子以降保育料無償化</strong>：双子の2人目は保育料が無料です</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>入所申込の詳細は<a href="https://kosodate.city.sapporo.jp/mokuteki/azukeru/hoiku/ninka/835.html" target="_blank" rel="noopener">札幌市子育てサイト「認可保育所等への入所手続きについて」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 35,
  },

  // 17. 保育ママインタビュー
  {
    slug: "hoiku-mama-interview",
    citySlug: "sapporo",
    title: "札幌市で保活を乗り越えたママの体験談　成功のカギはここだった",
    description:
      "札幌市で実際に保活を経験したママたちの体験談から、成功のポイントと注意点をまとめました。",
    image:
      "https://images.unsplash.com/photo-1491013516836-7db643ee125a?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>保活成功ママたちの共通点</h2>
<p>札幌市で保活を乗り越えたママたちに話を聞くと、いくつかの共通する成功ポイントが見えてきます。</p>

<h3>体験談1：中央区・Aさん（1歳4月入園）</h3>
<div class="point-box">
<p><strong>Aさんの状況</strong></p>
<p>フルタイム共働き（200点）＋育休明け加点（+40点）＝合計240点。第1希望の園に内定。</p>
</div>
<p>「早い段階で希望園を10か所以上リストアップしました。7月から毎週1〜2園ずつ見学して、9月末には希望順位を決めていました。受入予定数と申込数のデータを見て、人気園は第3希望以降にしたのが良かったと思います。」</p>

<h3>体験談2：北区・Bさん（0歳4月入園）</h3>
<div class="point-box">
<p><strong>Bさんの状況</strong></p>
<p>フルタイム共働き（200点）＋育休明け加点（+40点）＝合計240点。0歳6月生まれで0歳入園を選択。</p>
</div>
<p>「1歳の激戦を避けて0歳入園を選びました。生後10か月での入園だったので不安もありましたが、園の先生方が丁寧にサポートしてくれました。育休を早く切り上げた分、0歳児クラスは競争率が低く、スムーズに内定しました。」</p>

<h3>体験談3：豊平区・Cさん（1歳4月入園・きょうだい加点あり）</h3>
<div class="point-box">
<p><strong>Cさんの状況</strong></p>
<p>フルタイム共働き（200点）＋育休明け加点（+40点）＋きょうだい在園（+80点）＝合計320点。</p>
</div>
<p>「上の子と同じ園に入れたかったので、第1希望をきょうだいの園にしました。きょうだい在園加点の+80点は本当に大きかったです。同点時の優先順位でもきょうだい在園が有利なので、安心感がありました。」</p>

<h2>先輩ママからのアドバイス</h2>
<ul>
<li><strong>情報収集は早めに</strong>：妊娠中から始めても早すぎることはない</li>
<li><strong>データを活用</strong>：受入予定数と申込数のデータは必ず確認する</li>
<li><strong>見学は複数園</strong>：最低5〜6園は見学して比較する</li>
<li><strong>希望園は多めに</strong>：書けるだけ書いてリスク分散</li>
<li><strong>区をまたぐことも検討</strong>：通勤経路上の隣接区にも良い園がある</li>
</ul>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>体験談はあくまで個人の経験です。制度や倍率は年度によって変わるため、最新の公式情報を必ず確認してください。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新の入所案内は<a href="https://kosodate.city.sapporo.jp/mokuteki/azukeru/hoiku/ninka/8935.html" target="_blank" rel="noopener">札幌市子育てサイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 60,
  },

  // 18. 待機児童データ
  {
    slug: "waiting-child-data",
    citySlug: "sapporo",
    title: "札幌市の待機児童・保留児童データを読み解く　区別の傾向と対策",
    description:
      "札幌市の待機児童数・保留児童数の推移と区別の傾向から、入りやすいエリアを分析します。",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop",
    category: "データ分析",
    categoryColor: "teal",
    content: `<h2>待機児童と保留児童の違い</h2>
<p>ニュースでよく聞く「待機児童」と「保留児童」は定義が異なります。正しく理解しましょう。</p>

<table>
<tr><th>用語</th><th>定義</th></tr>
<tr><td>待機児童</td><td>認可保育所等に申込をしたが入所できず、かつ認可外にも入っていない児童（国の定義）</td></tr>
<tr><td>保留児童</td><td>認可保育所等に申込をしたが入所できていない児童の総数（特定園のみ希望、認可外利用中を含む）</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>札幌市の「待機児童数」は近年ゼロまたは低水準ですが、「保留児童数」は数百人規模です。実態を知るには保留児童数を見ることが重要です。</p>
</div>

<h2>札幌市の10区別の傾向</h2>
<p>札幌市は中央区・北区・東区・白石区・豊平区・南区・西区・厚別区・手稲区・清田区の10区で構成されています。区によって保育園の入りやすさに差があります。</p>

<h3>比較的入りやすいエリア</h3>
<ul>
<li><strong>南区・厚別区・清田区</strong>：郊外エリアで新興住宅地が多く、保育施設の整備が進んでいる</li>
<li><strong>手稲区</strong>：定員に余裕のある園が比較的多い</li>
</ul>

<h3>競争が激しいエリア</h3>
<ul>
<li><strong>中央区</strong>：マンション開発で子育て世帯が増加し、人気園の倍率が高い</li>
<li><strong>北区・東区</strong>：人口が多く、1歳児クラスの競争が激しい傾向</li>
<li><strong>豊平区・白石区</strong>：地下鉄沿線の利便性が高いエリアで申込が集中</li>
</ul>

<h2>データの読み方</h2>
<p>札幌市は毎年、施設ごとの受入予定数と申込数を公開しています。</p>
<ol>
<li>札幌市子育てサイトからPDFをダウンロード</li>
<li>希望エリアの園を抽出</li>
<li>年齢別の「受入予定数」と「申込数」を比較</li>
<li>申込数が受入予定数を上回る園は激戦</li>
</ol>

<h2>入りやすい園を見つけるコツ</h2>
<ul>
<li><strong>新設園</strong>：開園初年度は全クラス空きがあるため狙い目</li>
<li><strong>小規模保育事業所</strong>：0〜2歳児のみのため、3歳以降の転園が必要だが入りやすい</li>
<li><strong>駅から離れた園</strong>：利便性は下がるが、倍率が低くなる傾向</li>
</ul>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>データはあくまで前年度の実績です。新設園の開設やマンション建設などで状況は年度ごとに変わります。最新の情報を確認してください。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>受入予定数・申込数のデータは<a href="https://kosodate.city.sapporo.jp/mokuteki/azukeru/hoiku/ninka/7656.html" target="_blank" rel="noopener">札幌市子育てサイト「受入予定数・申込数について」</a>で公開されています。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 55,
  },

  // 19. 小規模保育事業所ガイド
  {
    slug: "small-nursery-guide",
    citySlug: "sapporo",
    title: "札幌市の小規模保育事業所ガイド　メリット・デメリットと3歳の壁対策",
    description:
      "札幌市の小規模保育事業所の特徴、認可保育所との違い、3歳以降の連携施設への転園について解説します。",
    image:
      "https://images.unsplash.com/photo-1576495169037-d33bc5e71087?w=800&h=400&fit=crop",
    category: "園えらび",
    categoryColor: "purple",
    content: `<h2>小規模保育事業所とは？</h2>
<p>小規模保育事業所は、定員6〜19名の<strong>認可</strong>保育施設です。0〜2歳児のみを対象としており、家庭的な雰囲気の中できめ細かい保育が受けられます。</p>

<h3>認可保育所との違い</h3>
<table>
<tr><th></th><th>認可保育所</th><th>小規模保育事業所</th></tr>
<tr><td>定員</td><td>20名以上</td><td>6〜19名</td></tr>
<tr><td>対象年齢</td><td>0〜5歳</td><td>0〜2歳</td></tr>
<tr><td>保育料</td><td>市が設定（所得に応じる）</td><td>同左</td></tr>
<tr><td>利用調整</td><td>点数制</td><td>同左</td></tr>
<tr><td>3歳以降</td><td>そのまま在籍</td><td>連携施設等に転園</td></tr>
</table>

<h2>小規模保育のメリット</h2>
<ul>
<li><strong>入りやすい</strong>：認可保育所に比べて申込者が少なく、競争率が低い傾向</li>
<li><strong>きめ細かい保育</strong>：少人数のため、子ども一人ひとりに目が行き届く</li>
<li><strong>3歳転園時に700点の加点</strong>：連携施設への転園時は調整指数+700点が加算され、ほぼ確実に入園できる</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>小規模保育から連携施設への転園時の<span class="highlight">+700点</span>は圧倒的な加点です。0〜2歳は小規模保育、3歳から認可保育所という「2段階保活」は有効な戦略です。</p>
</div>

<h2>「3歳の壁」への対策</h2>
<p>小規模保育最大のデメリットは、3歳以降に転園が必要な「3歳の壁」です。しかし札幌市では以下の制度で対策されています。</p>

<h3>連携施設の設定</h3>
<p>多くの小規模保育事業所には「連携施設」が設定されており、卒園時に優先的に入園できます。連携施設への転園時は<strong>+700点</strong>の加点があるため、実質的にほぼ確実に入園できます。</p>

<h3>連携施設以外への転園</h3>
<p>連携施設以外の園を希望する場合も、小規模保育卒園児として一定の配慮がなされます。ただし+700点の加点は連携施設のみに適用されるため、人気園への転園は通常の利用調整となります。</p>

<h2>小規模保育を選ぶ際のチェックポイント</h2>
<ul>
<li>連携施設がどこに設定されているか</li>
<li>連携施設の場所（自宅や職場から通えるか）</li>
<li>連携施設の保育内容・評判</li>
<li>園庭の有無（小規模保育は園庭がない施設も多い）</li>
<li>給食体制（自園調理か外注か）</li>
</ul>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>連携施設が設定されていない小規模保育事業所もあります。入園前に必ず連携施設の有無と転園先を確認してください。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>小規模保育事業所の一覧と連携施設の情報は<a href="https://kosodate.city.sapporo.jp/mokuteki/azukeru/hoiku/ninka/835.html" target="_blank" rel="noopener">札幌市子育てサイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 50,
  },

  // 20. 第二子の保活
  {
    slug: "secondchild-hokatsu",
    citySlug: "sapporo",
    title: "第二子の保活は有利？札幌市のきょうだい加点と保育料無償化",
    description:
      "札幌市で第二子の保育園入園を目指す際のきょうだい在園加点、保育料無償化、同園入園のコツを解説します。",
    image:
      "https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>第二子の保活は有利な点が多い</h2>
<p>札幌市では、すでに上の子が認可保育所等に在園している場合、第二子の保活で大きなアドバンテージがあります。</p>

<h3>きょうだい在園加点</h3>
<table>
<tr><th>ケース</th><th>調整指数</th></tr>
<tr><td>きょうだいが認可保育所等にすでに入所</td><td><span class="highlight">+80点</span></td></tr>
<tr><td>育休明け＋きょうだい在園</td><td><span class="highlight">+100点</span>（一括加算）</td></tr>
<tr><td>きょうだい同時入所申請</td><td>+30点</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>フルタイム共働き（200点）＋育休明け＋きょうだい在園（+100点）＝<span class="highlight">合計300点</span>。第一子のときの240点から大幅にアップします。第二子は上の子と同じ園を第1希望にすれば、同点時の優先順位（別表3）でもトップに位置づけられます。</p>
</div>

<h2>育休明けときょうだい在園の加点の注意点</h2>
<p>育休明け加点（+40点）ときょうだい在園加点（+80点）は<strong>重複加算されません</strong>。両方に該当する場合は一括で+100点が加算されます（+40+80=120ではなく+100）。</p>

<h2>保育料は第二子から無償化</h2>
<p>札幌市では令和6年4月から、<strong>第2子以降の保育料が所得制限なしで無償化</strong>されています。上の子の年齢に関係なく、第2子以降であれば保育料は無料です。</p>

<h3>第二子の保育料比較</h3>
<table>
<tr><th></th><th>第1子</th><th>第2子以降</th></tr>
<tr><td>3〜5歳児</td><td>無償（国の制度）</td><td>無償（国の制度）</td></tr>
<tr><td>0〜2歳児</td><td>所得に応じた保育料</td><td><span class="highlight">無料（札幌市の制度）</span></td></tr>
</table>

<h2>上の子と同じ園に入るコツ</h2>
<ul>
<li><strong>第1希望を上の子と同じ園にする</strong>：きょうだい在園加点+80点（または育休明け込み+100点）が付く上、同点時の優先順位でも最上位</li>
<li><strong>0歳入園と1歳入園の枠を確認</strong>：上の子の園の受入予定数を年齢別に確認する</li>
<li><strong>年齢差を考慮</strong>：3歳差以上の場合、上の子の卒園と入園が重なる可能性に注意</li>
</ul>

<h2>注意すべき落とし穴</h2>
<ul>
<li><strong>上の子が認定こども園（教育部分）の場合</strong>：加点は+80点ではなく+60点になる</li>
<li><strong>上の子が小規模保育卒園済みの場合</strong>：卒園後は「きょうだい在園」に該当しない</li>
<li><strong>育休延長で上の子が退園になるケース</strong>：育休延長の場合、上の子の保育認定に影響する可能性があるため、区の保健センターに確認を</li>
</ul>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>育休中に上の子が退園になるルールは自治体によって異なります。札幌市では育休中でも在園継続が可能ですが、就労証明書の更新が必要な場合がありますので、区の保健センターに確認してください。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>きょうだい加点の詳細は<a href="https://kosodate.city.sapporo.jp/mokuteki/azukeru/hoiku/ninka/835.html" target="_blank" rel="noopener">札幌市子育てサイト「認可保育所等への入所手続きについて」</a>で確認できます。第2子以降の保育料無償化については<a href="https://kosodate.city.sapporo.jp/mokuteki/azukeru/hoiku/hoikuryo/index.html" target="_blank" rel="noopener">保育料のページ</a>をご覧ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 55,
  },
];

registerArticles(articles);
