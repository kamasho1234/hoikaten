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
<p>ひとり親家庭向けの支援制度は<a href="https://kosodate.city.sapporo.jp/" target="_blank" rel="noopener">札幌市子育てサイト「ひとり親家庭への支援」</a>で確認できます。</p>
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
<p>きょうだい加点の詳細は<a href="https://kosodate.city.sapporo.jp/mokuteki/azukeru/hoiku/ninka/835.html" target="_blank" rel="noopener">札幌市子育てサイト「認可保育所等への入所手続きについて」</a>で確認できます。第2子以降の保育料無償化については<a href="https://kosodate.city.sapporo.jp/mokuteki/azukeru/hoikuryou/gaiyou.html" target="_blank" rel="noopener">保育料のページ</a>をご覧ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 55,
  },

  // 21. 自営業・フリーランスの点数
  {
    slug: "self-employed-score",
    citySlug: "sapporo",
    title: "自営業・フリーランスの保活　札幌市での点数と必要書類",
    description:
      "札幌市で自営業やフリーランスとして保育園に申し込む場合の点数の付き方と、必要な証明書類を解説します。",
    image:
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>自営業・フリーランスでも点数は同じ？</h2>
<p>札幌市の利用調整基準では、会社員と自営業・フリーランスで基本点数の計算方法は<strong>同じ</strong>です。月の稼動日数と労働時間で点数が決まります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>自営業でも月20日以上・150時間以上の就労なら基本点数は<span class="highlight">100点</span>。会社員と同じ最高点です。</p>
</div>

<h3>自営業の基本点数の目安</h3>
<table>
<tr><th>稼動日数</th><th>月労働時間</th><th>基本点数</th></tr>
<tr><td>20日以上</td><td>150時間以上</td><td>100点</td></tr>
<tr><td>20日以上</td><td>120〜150時間未満</td><td>90点</td></tr>
<tr><td>16日以上</td><td>120〜150時間未満</td><td>80点</td></tr>
<tr><td>16日未満</td><td>64〜120時間未満</td><td>70点</td></tr>
</table>

<h2>必要な書類</h2>
<p>会社員は「就労証明書」を勤務先に記入してもらいますが、自営業・フリーランスは<strong>自分で就労状況を証明</strong>する必要があります。</p>

<div class="step">
<h3>ステップ1：就労証明書の自己記入</h3>
<p>札幌市の就労証明書は自営業者自身が記入できます。稼動日数・労働時間を正確に記入してください。</p>
</div>

<div class="step">
<h3>ステップ2：裏付け書類の準備</h3>
<p>以下のいずれかを添付します。</p>
<ul>
<li>開業届の写し（税務署の受付印付き）</li>
<li>確定申告書の写し（直近のもの）</li>
<li>営業許可証の写し</li>
<li>取引先との契約書の写し</li>
</ul>
</div>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>開業届を出していない場合や、収入がまだ少ない場合は「求職活動中」扱いになり、基本点数が大幅に低くなる可能性があります。保活前に開業届を提出しておくことを強くおすすめします。</p>
</div>

<h2>自営業特有の注意点</h2>
<ul>
<li><strong>居宅内労働と居宅外労働</strong>：札幌市の基準表では「居宅外労働」と「居宅内労働」で同じ点数ですが、在宅勤務の場合は実際の労働時間が問われやすい傾向があります</li>
<li><strong>開業直後の場合</strong>：実績がまだ少ない場合でも、事業計画書や契約書で就労予定を示せることが重要です</li>
<li><strong>育休制度がない</strong>：自営業には育休制度がないため、育休明け加点（+40点）は原則適用されません</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>就労証明書の様式は<a href="https://kosodate.city.sapporo.jp/mokuteki/azukeru/hoiku/ninka/835.html" target="_blank" rel="noopener">札幌市子育てサイト</a>からダウンロードできます。不明点はお住まいの区の保健センターへご相談ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 70,
  },

  // 22. 内職・在宅ワークの点数
  {
    slug: "naishoku-score",
    citySlug: "sapporo",
    title: "内職・在宅ワークで保育園に入れる？札幌市の点数と条件",
    description:
      "札幌市で内職や在宅ワークをしている場合の保育園入園の点数と、申請時の注意点を解説します。",
    image:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>内職・在宅ワークでも保育園に入れる</h2>
<p>札幌市では内職や在宅ワークでも「就労」として保育の必要性が認められます。基本点数は月の<strong>稼動日数と労働時間</strong>で決まるため、労働時間が多ければ会社員と同等の点数が得られます。</p>

<h3>在宅ワークの点数例</h3>
<table>
<tr><th>働き方</th><th>稼動日数</th><th>月労働時間</th><th>基本点数</th></tr>
<tr><td>フルタイム在宅ワーク</td><td>20日以上</td><td>150時間以上</td><td>100点</td></tr>
<tr><td>パートタイム在宅ワーク</td><td>16日以上</td><td>80〜120時間</td><td>75点</td></tr>
<tr><td>内職（短時間）</td><td>16日未満</td><td>64〜120時間</td><td>70点</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>在宅ワークでも月150時間以上・20日以上稼動なら<span class="highlight">100点</span>。外勤との点数差はありません。ただし労働時間の証明が重要です。</p>
</div>

<h2>申請時に必要なもの</h2>
<ul>
<li>就労証明書（自己記入の場合は開業届や確定申告書の写しを添付）</li>
<li>業務委託契約書や取引先からの発注書など、就労実態を裏付ける書類</li>
<li>クラウドソーシングの場合は、プラットフォームの取引履歴画面のスクリーンショットも有効</li>
</ul>

<h2>注意点</h2>
<ul>
<li><strong>労働時間の客観的証明</strong>：在宅ワークは勤務実態の確認が難しいため、タイムカードアプリの記録など客観的な証拠があると安心です</li>
<li><strong>収入の有無</strong>：収入がゼロの場合、就労ではなく「求職活動中」と判断される可能性があります</li>
<li><strong>保育の必要性</strong>：在宅＝子どもの面倒を見られる、と見なされるわけではありません。就労時間中は保育が必要であることを明確にしましょう</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>在宅ワークの取り扱いについて不明な点は、お住まいの区の保健センターにご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 55,
  },

  // 23. 求職中の保活
  {
    slug: "kyushoku-hokatsu",
    citySlug: "sapporo",
    title: "求職中でも保育園に入れる？札幌市の求職活動中の点数と注意点",
    description:
      "札幌市で求職活動中に保育園を申し込む場合の点数や入園後の条件を解説します。",
    image:
      "https://images.unsplash.com/photo-1507679799987-c73b1c7e2b64?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>求職活動中の基本点数</h2>
<p>札幌市では求職活動中でも「保育の必要性」が認められ、保育園の申し込みが可能です。ただし基本点数は就労中よりも低くなります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>求職活動中の基本点数は<span class="highlight">50点</span>です。フルタイム就労の100点と比べると大きな差があるため、人気園への入園は難しい傾向があります。</p>
</div>

<h2>求職中で入園するための戦略</h2>
<ul>
<li><strong>定員に余裕のある園を狙う</strong>：各区の空き状況は札幌市の公式サイトで公開されています</li>
<li><strong>小規模保育事業所を検討</strong>：0〜2歳対象の小規模保育は比較的空きがある場合があります</li>
<li><strong>4月入園の2次調整を活用</strong>：1次で定員割れした園があれば、求職中の点数でも入園の可能性があります</li>
<li><strong>年度途中の申込</strong>：年度途中は空きが出にくいですが、3歳以上のクラスは枠が増えるため可能性があります</li>
</ul>

<h2>入園後の就労期限</h2>
<p>求職活動中で入園した場合、入園後<strong>90日以内</strong>に就労を開始する必要があります。期限内に就労が確認できない場合は退園となる可能性があります。</p>

<div class="step">
<h3>ステップ1：入園決定</h3>
<p>求職活動中として入園が決まります。</p>
</div>

<div class="step">
<h3>ステップ2：就職活動</h3>
<p>入園後すぐに就職活動を本格化させましょう。</p>
</div>

<div class="step">
<h3>ステップ3：就労証明書の提出</h3>
<p>就労先が決まったら、速やかに就労証明書を区の保健センターに提出します。</p>
</div>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>求職活動中の保育認定は期限付きです。期限内に就労を開始できない場合は保育の必要性が認められなくなります。必ず期限を確認してください。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>求職活動中の保育認定については、お住まいの区の保健センターにお問い合わせください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 55,
  },

  // 24. 転職と保活のタイミング
  {
    slug: "tenshoku-timing",
    citySlug: "sapporo",
    title: "転職と保活を両立するには？札幌市での最適なタイミング",
    description:
      "札幌市で転職を考えている場合の保活への影響と、最適なタイミングを解説します。",
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>転職すると点数に影響する？</h2>
<p>札幌市の基本点数は「就労の状態」で決まるため、転職自体は点数に直接影響しません。ただし、転職のタイミングによっては<strong>一時的に求職活動中</strong>の扱いになり、点数が下がるリスクがあります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>転職するなら、入園申込の<strong>就労証明書の提出前</strong>に新しい勤務先を確定させるのがベストです。就労証明書は新しい勤務先に記入してもらいましょう。</p>
</div>

<h2>転職タイミング別のリスク</h2>
<table>
<tr><th>タイミング</th><th>リスク</th><th>対策</th></tr>
<tr><td>申込前に転職完了</td><td>低い</td><td>新勤務先の就労証明書を提出すればOK</td></tr>
<tr><td>申込後〜選考前に転職</td><td>中程度</td><td>就労証明書の再提出が必要。区の保健センターに連絡</td></tr>
<tr><td>入園決定後に転職</td><td>低い</td><td>新しい就労証明書を提出すれば継続利用可能</td></tr>
<tr><td>空白期間あり（無職期間）</td><td>高い</td><td>求職活動中扱いで点数50点に低下</td></tr>
</table>

<h2>入園後の転職について</h2>
<p>入園後に転職する場合は、新しい勤務先の就労証明書を速やかに区の保健センターに提出してください。転職による空白期間が長い場合は退園になる可能性があります。</p>

<ul>
<li>退職から再就職まで<strong>1か月以内</strong>が目安</li>
<li>退職の際は事前に区の保健センターに相談するのが安心</li>
<li>転職で勤務時間が大幅に減る場合は、保育認定区分の変更が必要になることもあります</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>入園後の変更届出については、お住まいの区の保健センターにお問い合わせください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 50,
  },

  // 25. 2歳からの入園
  {
    slug: "age2-nyuen",
    citySlug: "sapporo",
    title: "2歳からの保育園入園　札幌市の空き状況と入りやすさ",
    description:
      "札幌市で2歳から保育園に入園する場合の空き状況の傾向と、入園しやすい園の探し方を解説します。",
    image:
      "https://images.unsplash.com/photo-1587654780291-39c9404d7dd0?w=800&h=400&fit=crop",
    category: "年齢別",
    categoryColor: "purple",
    content: `<h2>2歳入園の特徴</h2>
<p>札幌市では0歳・1歳で入園した子どもがそのまま持ち上がるため、2歳クラスの新規受入枠は<strong>非常に少ない</strong>傾向があります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>2歳クラスの新規枠は「退園・転園で空いた枠」のみ。多くの園で新規受入数は0〜数名程度です。</p>
</div>

<h2>2歳入園を目指す戦略</h2>
<ul>
<li><strong>小規模保育事業所からの転園</strong>：0〜2歳対象の小規模保育を卒園する子の受け皿として、連携園には優先枠がある場合があります</li>
<li><strong>新設園を狙う</strong>：新設園は全クラスが空きのため、2歳クラスにも枠があります</li>
<li><strong>認定こども園の教育部分から保育部分への切り替え</strong>：3歳以降の受入枠が多い認定こども園を視野に入れましょう</li>
<li><strong>希望園を多く書く</strong>：2歳入園は枠が少ないため、通える範囲の園をできるだけ多く記入</li>
</ul>

<h2>2歳入園の注意点</h2>
<ul>
<li>小規模保育事業所は2歳までのため、3歳で再度「保活」が必要になります</li>
<li>認可外保育施設に通っている場合は、調整指数の加点対象にはなりません</li>
<li>2歳入園がどうしても難しい場合は、3歳の「幼児教育・保育の無償化」開始タイミングを見据えた計画も検討しましょう</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>各園の空き状況は<a href="https://kosodate.city.sapporo.jp/mokuteki/azukeru/hoiku/ninka/835.html" target="_blank" rel="noopener">札幌市子育てサイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 45,
  },

  // 26. 3歳以降の移行
  {
    slug: "age3-ikou",
    citySlug: "sapporo",
    title: "3歳の壁を乗り越える　札幌市での小規模保育卒園後の選択肢",
    description:
      "札幌市で小規模保育事業所を卒園した後の3歳児の進路と、連携施設の仕組みを解説します。",
    image:
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=400&fit=crop",
    category: "年齢別",
    categoryColor: "purple",
    content: `<h2>小規模保育卒園後の「3歳の壁」とは</h2>
<p>小規模保育事業所（0〜2歳対象）を卒園すると、3歳からは新たな保育施設に移る必要があります。これがいわゆる「3歳の壁」です。</p>

<h2>札幌市の連携施設の仕組み</h2>
<p>札幌市では小規模保育事業所に<strong>連携施設</strong>を設定しており、卒園児が優先的に入園できる仕組みがあります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>連携施設が設定されている小規模保育を選んでおくと、3歳以降の保活がスムーズになります。入園前に連携施設を確認しましょう。</p>
</div>

<h2>3歳以降の選択肢</h2>
<table>
<tr><th>進路</th><th>特徴</th></tr>
<tr><td>連携施設への優先入園</td><td>小規模保育の連携先に優先的に入れる</td></tr>
<tr><td>認可保育所への申込</td><td>通常の利用調整で申込。3歳クラスは受入枠が多い園も</td></tr>
<tr><td>認定こども園（保育部分）</td><td>3歳から定員が大幅に増える園が多い</td></tr>
<tr><td>幼稚園（預かり保育あり）</td><td>無償化の対象。預かり保育で夕方まで利用可能</td></tr>
</table>

<h2>3歳入園は意外と入りやすい</h2>
<p>3歳クラスは幼稚園への移行などで空きが出やすく、また認定こども園では3歳から定員が大幅に増えるため、0〜2歳と比べて<strong>入りやすい</strong>傾向があります。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>小規模保育事業所と連携施設の一覧は、各区の保健センターまたは<a href="https://kosodate.city.sapporo.jp/mokuteki/azukeru/hoiku/ninka/835.html" target="_blank" rel="noopener">札幌市子育てサイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 50,
  },

  // 27. 0歳児入園
  {
    slug: "nyuyoji-age0",
    citySlug: "sapporo",
    title: "0歳児入園のメリット・デメリット　札幌市の受入月齢と注意点",
    description:
      "札幌市で0歳児クラスに入園する場合の受入月齢、メリット・デメリット、準備すべきことを解説します。",
    image:
      "https://images.unsplash.com/photo-1544126592-807ade215a0b?w=800&h=400&fit=crop",
    category: "年齢別",
    categoryColor: "purple",
    content: `<h2>0歳入園の受入月齢</h2>
<p>札幌市の認可保育所では、園によって受入開始月齢が異なります。一般的には<strong>生後57日（産休明け）</strong>から、または<strong>生後5か月</strong>や<strong>生後6か月</strong>からの受入が多いです。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>4月入園を目指す場合、4月1日時点での月齢が受入開始月齢を満たしている必要があります。希望園の受入開始月齢を必ず事前に確認してください。</p>
</div>

<h2>0歳入園のメリット</h2>
<ul>
<li><strong>入りやすい</strong>：0歳クラスは全員が新規入園のため、1歳以降より枠が多い</li>
<li><strong>1歳の激戦を回避</strong>：1歳クラスは育休明けの申込が集中し、最も競争が激しい年齢</li>
<li><strong>育休明け加点が使える</strong>：産休明け・育休明けの調整指数+40点が加算</li>
<li><strong>持ち上がり</strong>：一度入園すれば、原則としてそのまま卒園まで在園できる</li>
</ul>

<h2>0歳入園のデメリット</h2>
<ul>
<li><strong>育児休業を短縮</strong>：特に秋〜冬生まれの場合、育休を大幅に短縮して復職する必要がある</li>
<li><strong>体調面の不安</strong>：月齢が低いほど体調を崩しやすく、入園直後は呼び出しが多い</li>
<li><strong>保育料がかかる</strong>：0〜2歳は保育料が発生（ただし第2子以降は札幌市の制度で無償）</li>
</ul>

<h2>0歳入園に必要な準備</h2>
<ul>
<li>希望園の受入開始月齢の確認</li>
<li>勤務先への復職時期の相談</li>
<li>就労証明書の準備（復職予定の内容で記入）</li>
<li>園見学（妊娠中からの見学がおすすめ）</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>各園の受入開始月齢は<a href="https://kosodate.city.sapporo.jp/mokuteki/azukeru/hoiku/ninka/835.html" target="_blank" rel="noopener">札幌市子育てサイト</a>の認可保育所一覧で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 60,
  },

  // 28. 認定こども園
  {
    slug: "nintei-kodomoen",
    citySlug: "sapporo",
    title: "認定こども園とは？札幌市での保育所との違いと選び方",
    description:
      "札幌市の認定こども園の特徴、保育所との違い、入園手続きの違いを解説します。",
    image:
      "https://images.unsplash.com/photo-1564429238961-bf8e8eb0fd47?w=800&h=400&fit=crop",
    category: "園の種類",
    categoryColor: "amber",
    content: `<h2>認定こども園とは</h2>
<p>認定こども園は、<strong>幼稚園と保育所の機能を併せ持つ</strong>施設です。教育と保育を一体的に提供し、保護者の就労状況が変わっても通い続けられるメリットがあります。</p>

<h2>札幌市の認定こども園の種類</h2>
<table>
<tr><th>類型</th><th>特徴</th></tr>
<tr><td>幼保連携型</td><td>幼稚園機能と保育所機能を一体的に運営。最も一般的</td></tr>
<tr><td>幼稚園型</td><td>幼稚園がベースで保育所機能を追加</td></tr>
<tr><td>保育所型</td><td>保育所がベースで幼稚園機能を追加</td></tr>
</table>

<h2>保育所との違い</h2>
<table>
<tr><th></th><th>認可保育所</th><th>認定こども園（保育部分）</th></tr>
<tr><td>対象年齢</td><td>0〜5歳</td><td>0〜5歳</td></tr>
<tr><td>利用時間</td><td>保育標準時間（最大11時間）</td><td>保育標準時間（最大11時間）</td></tr>
<tr><td>教育カリキュラム</td><td>園による</td><td>幼稚園教育要領に基づく教育あり</td></tr>
<tr><td>3歳以降の定員</td><td>持ち上がりが中心</td><td>教育部分から大幅に定員増</td></tr>
<tr><td>申込方法</td><td>区の保健センター経由</td><td>区の保健センター経由（保育部分）</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>認定こども園の<strong>保育部分</strong>（2号・3号認定）は認可保育所と同じ利用調整で入園が決まります。点数の計算方法も同じです。<strong>教育部分</strong>（1号認定）は園に直接申込です。</p>
</div>

<h2>認定こども園を選ぶメリット</h2>
<ul>
<li>退職しても教育部分（1号認定）に切り替えて通い続けられる</li>
<li>3歳クラスから定員が大幅に増えるため、入りやすい場合がある</li>
<li>教育内容が充実している園が多い</li>
</ul>

<h2>注意点</h2>
<ul>
<li>きょうだいが教育部分（1号認定）で在園している場合、保育部分の加点は+80点ではなく<span class="highlight">+60点</span></li>
<li>園によって保育時間や行事の方針が異なるため、見学で確認を</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>札幌市の認定こども園一覧は<a href="https://kosodate.city.sapporo.jp/mokuteki/azukeru/hoiku/ninka/835.html" target="_blank" rel="noopener">札幌市子育てサイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 55,
  },

  // 29. 企業主導型保育事業
  {
    slug: "kigyou-shudogata",
    citySlug: "sapporo",
    title: "企業主導型保育事業とは？札幌市での利用方法と認可保育所との違い",
    description:
      "札幌市にある企業主導型保育事業の特徴、利用方法、認可保育所との違いとメリット・デメリットを解説します。",
    image:
      "https://images.unsplash.com/photo-1497215842964-222b430dc094?w=800&h=400&fit=crop",
    category: "園の種類",
    categoryColor: "amber",
    content: `<h2>企業主導型保育事業とは</h2>
<p>企業主導型保育事業は、企業が従業員の子どもの保育のために設置する施設です。<strong>認可外保育施設</strong>ですが、国から運営費の補助を受けており、保育料は認可保育所と同水準です。</p>

<h2>認可保育所との主な違い</h2>
<table>
<tr><th></th><th>認可保育所</th><th>企業主導型</th></tr>
<tr><td>申込先</td><td>区の保健センター</td><td>施設に直接</td></tr>
<tr><td>選考方法</td><td>利用調整（点数順）</td><td>施設が独自に選考</td></tr>
<tr><td>保育料</td><td>所得に応じた額</td><td>施設が設定（認可並みが多い）</td></tr>
<tr><td>利用枠</td><td>-</td><td>従業員枠・地域枠</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>企業主導型保育には「従業員枠」と「地域枠」があります。設置企業の従業員でなくても<strong>地域枠</strong>で利用できる施設があります。</p>
</div>

<h2>メリット</h2>
<ul>
<li><strong>利用調整なしで申込可能</strong>：点数に関係なく、直接施設に申し込める</li>
<li><strong>認可保育所の併願先</strong>：認可の結果を待ちながら確保できる</li>
<li><strong>保育料が認可並み</strong>：国の補助があるため、一般の認可外より低額</li>
</ul>

<h2>デメリット・注意点</h2>
<ul>
<li>認可保育所の利用調整で加点対象にならない場合がある</li>
<li>施設によって保育の質にばらつきがある</li>
<li>突然の閉園リスクがゼロではない</li>
</ul>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>企業主導型保育を選ぶ際は、自治体の指導監査を受けているか、保育士の配置基準を満たしているかを確認してください。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>企業主導型保育事業の全国の施設検索は<a href="https://www.kigyounaihoiku.jp/" target="_blank" rel="noopener">企業主導型保育事業ポータル</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 40,
  },

  // 30. 夜間保育
  {
    slug: "yakan-hoiku",
    citySlug: "sapporo",
    title: "夜間保育・延長保育を利用するには？札幌市の対応状況",
    description:
      "札幌市で夜間保育や延長保育を利用する方法、対応園、費用について解説します。",
    image:
      "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?w=800&h=400&fit=crop",
    category: "園の種類",
    categoryColor: "amber",
    content: `<h2>札幌市の延長保育</h2>
<p>札幌市の認可保育所では、<strong>保育標準時間認定</strong>（最大11時間）を超える利用が必要な場合に<strong>延長保育</strong>を利用できます。</p>

<h3>延長保育の概要</h3>
<table>
<tr><th>項目</th><th>内容</th></tr>
<tr><td>利用条件</td><td>就労等で保育標準時間を超える保育が必要な場合</td></tr>
<tr><td>延長時間</td><td>園の開所時間により異なる（18時〜19時、または18時〜20時が一般的）</td></tr>
<tr><td>費用</td><td>園により異なる。月額制または日額制</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>延長保育の有無・時間帯は園によって異なります。シフト勤務や残業が多い方は、入園前に延長保育の体制を確認しておきましょう。</p>
</div>

<h2>夜間保育について</h2>
<p>札幌市には認可の<strong>夜間保育所</strong>があります。夜間勤務（医療従事者、飲食業、サービス業など）の保護者を対象に、夜間帯の保育を提供しています。</p>

<h2>利用する場合の手続き</h2>
<ul>
<li>延長保育は入園先の園に直接申し込みます</li>
<li>夜間保育所は通常の認可保育所と同じく、区の保健センター経由で申し込みます</li>
<li>就労証明書に夜間の勤務時間が記載されていることが必要です</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>延長保育・夜間保育の実施園は<a href="https://kosodate.city.sapporo.jp/mokuteki/azukeru/hoiku/ninka/835.html" target="_blank" rel="noopener">札幌市子育てサイト</a>で確認できます。各園の開所時間もこちらに掲載されています。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 35,
  },

  // 31. 無償化制度
  {
    slug: "mushoka-seido",
    citySlug: "sapporo",
    title: "保育料無償化の対象は？札幌市独自の第2子以降無償化も解説",
    description:
      "国の幼児教育・保育無償化と札幌市独自の第2子以降無償化制度の対象・条件・手続きを解説します。",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "費用・制度",
    categoryColor: "rose",
    content: `<h2>保育料無償化の全体像</h2>
<p>保育料の無償化には、<strong>国の制度</strong>と<strong>札幌市独自の制度</strong>の2つがあります。</p>

<h3>国の制度（2019年10月〜）</h3>
<table>
<tr><th>対象</th><th>内容</th></tr>
<tr><td>3〜5歳児</td><td>認可保育所・認定こども園の保育料が<span class="highlight">全額無償</span></td></tr>
<tr><td>0〜2歳児（住民税非課税世帯）</td><td>認可保育所・認定こども園の保育料が無償</td></tr>
<tr><td>認可外保育施設</td><td>3〜5歳児は月額37,000円まで、0〜2歳児（非課税世帯）は月額42,000円まで補助</td></tr>
</table>

<h3>札幌市独自の制度（2024年4月〜）</h3>
<div class="point-box">
<p><strong>ポイント</strong></p>
<p>札幌市では<strong>第2子以降の0〜2歳児の保育料が所得制限なしで無償</strong>です。上の子の年齢に関係なく、生計を同一にする子のうち第2子以降であれば対象になります。</p>
</div>

<h2>無償化の対象外になるもの</h2>
<p>保育料は無償になっても、以下の費用は<strong>自己負担</strong>です。</p>
<ul>
<li>給食費（3〜5歳児の副食費：月額4,500円程度が目安）</li>
<li>教材費・行事費</li>
<li>延長保育料</li>
<li>通園バス代（該当する園の場合）</li>
</ul>

<h2>手続きは必要？</h2>
<p>認可保育所・認定こども園に通う場合、無償化のための特別な手続きは不要です。入園手続きの中で自動的に適用されます。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>札幌市の保育料や無償化制度の詳細は<a href="https://kosodate.city.sapporo.jp/mokuteki/azukeru/hoikuryou/gaiyou.html" target="_blank" rel="noopener">札幌市子育てサイト「保育料について」</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 65,
  },

  // 32. 給食費（食費）の実費
  {
    slug: "shokuhi-jippi",
    citySlug: "sapporo",
    title: "保育園の給食費はいくら？札幌市の実費負担を解説",
    description:
      "札幌市の認可保育所・認定こども園の給食費（副食費）の金額と免除制度を解説します。",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=400&fit=crop",
    category: "費用・制度",
    categoryColor: "rose",
    content: `<h2>3〜5歳児の給食費</h2>
<p>3〜5歳児は保育料が無償化されていますが、<strong>給食費（食材料費）</strong>は保護者の実費負担です。</p>

<h3>給食費の内訳</h3>
<table>
<tr><th>費目</th><th>内容</th><th>金額目安</th></tr>
<tr><td>主食費</td><td>ご飯・パン等</td><td>月額1,000〜3,000円程度（園による）</td></tr>
<tr><td>副食費</td><td>おかず・おやつ等</td><td>月額4,500円程度</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>0〜2歳児の給食費は<strong>保育料に含まれている</strong>ため、別途の負担はありません。保育料が無償（第2子以降など）の場合は、給食費も含めて無償です。</p>
</div>

<h2>副食費の免除制度</h2>
<p>以下の世帯は副食費が免除されます。</p>
<ul>
<li>年収360万円未満相当の世帯</li>
<li>第3子以降の子ども（小学校就学前の子で数えて）</li>
</ul>

<h2>園によって異なる費用</h2>
<p>給食費の正確な金額は園ごとに異なります。入園前の説明会や園見学で確認することをおすすめします。その他、以下の費用も園によって異なります。</p>
<ul>
<li>教材費</li>
<li>行事費</li>
<li>帽子・制服代</li>
<li>布団リース代</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>副食費の免除制度については<a href="https://kosodate.city.sapporo.jp/mokuteki/azukeru/hoikuryou/gaiyou.html" target="_blank" rel="noopener">札幌市子育てサイト「保育料について」</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 45,
  },

  // 33. 保育料の計算方法
  {
    slug: "hoikuryo-keisan",
    citySlug: "sapporo",
    title: "札幌市の保育料はいくら？計算方法と階層区分を解説",
    description:
      "札幌市の認可保育所の保育料の計算方法、所得に応じた階層区分、減免制度を解説します。",
    image:
      "https://images.unsplash.com/photo-1554224154-22dec7ec8818?w=800&h=400&fit=crop",
    category: "費用・制度",
    categoryColor: "rose",
    content: `<h2>保育料の決まり方</h2>
<p>札幌市の認可保育所の保育料は、<strong>世帯の市民税所得割額</strong>に基づいて決まります。前年度の市民税を基に階層が決定されます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>3〜5歳児は<strong>全員無償</strong>（国の制度）。0〜2歳児は所得に応じた保育料ですが、<strong>第2子以降は札幌市の制度で無償</strong>です。</p>
</div>

<h2>0〜2歳児（第1子）の保育料の目安</h2>
<p>保育料は市民税の所得割額で決まります。以下は札幌市の階層区分の一部です。</p>
<table>
<tr><th>階層</th><th>市民税所得割額</th><th>保育標準時間</th></tr>
<tr><td>B（非課税）</td><td>0円</td><td>0円</td></tr>
<tr><td>C1</td><td>〜48,600円未満</td><td>9,000円</td></tr>
<tr><td>C2</td><td>48,600円〜97,000円未満</td><td>16,500円</td></tr>
<tr><td>D1</td><td>97,000円〜169,000円未満</td><td>27,000円</td></tr>
<tr><td>D2</td><td>169,000円〜301,000円未満</td><td>41,500円</td></tr>
<tr><td>D3</td><td>301,000円〜397,000円未満</td><td>55,500円</td></tr>
<tr><td>D4</td><td>397,000円以上</td><td>61,000円</td></tr>
</table>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>上記の金額は目安です。正確な保育料は年度や認定区分（標準時間・短時間）によって異なります。最新の保育料表は札幌市の公式サイトで確認してください。</p>
</div>

<h2>保育料の切り替え時期</h2>
<ul>
<li><strong>4月〜8月</strong>：前年度の市民税所得割額で計算</li>
<li><strong>9月〜3月</strong>：当年度の市民税所得割額で計算</li>
</ul>
<p>9月に保育料が変わることがあるため注意してください。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新の保育料表は<a href="https://kosodate.city.sapporo.jp/mokuteki/azukeru/hoikuryou/gaiyou.html" target="_blank" rel="noopener">札幌市子育てサイト「保育料について」</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 60,
  },

  // 34. 税金控除
  {
    slug: "zeikin-koujo",
    citySlug: "sapporo",
    title: "保育料と税金の関係　確定申告・年末調整で使える控除",
    description:
      "保育料の負担を軽くするために知っておきたい税金の控除制度と、保育料への影響を解説します。",
    image:
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6e?w=800&h=400&fit=crop",
    category: "費用・制度",
    categoryColor: "rose",
    content: `<h2>保育料は税金で決まる</h2>
<p>札幌市の認可保育所の保育料は<strong>市民税の所得割額</strong>で決まります。つまり、税金の控除を活用して所得割額を下げれば、保育料も下がる可能性があります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>保育料に影響する「市民税所得割額」は、各種控除を差し引いた後の金額で計算されます。使える控除は漏れなく申告しましょう。</p>
</div>

<h2>保育料に影響する主な控除</h2>
<table>
<tr><th>控除の種類</th><th>概要</th><th>手続き</th></tr>
<tr><td>医療費控除</td><td>年間医療費が10万円超の場合</td><td>確定申告</td></tr>
<tr><td>iDeCo（個人型確定拠出年金）</td><td>掛金が全額所得控除</td><td>年末調整 or 確定申告</td></tr>
<tr><td>ふるさと納税</td><td>寄附金控除</td><td>確定申告 or ワンストップ特例</td></tr>
<tr><td>住宅ローン控除</td><td>税額控除（所得割額から直接引かれる）</td><td>確定申告（初年度）</td></tr>
<tr><td>生命保険料控除</td><td>保険料に応じた所得控除</td><td>年末調整</td></tr>
</table>

<h2>注意点</h2>
<ul>
<li><strong>ふるさと納税</strong>は住民税の税額控除のため、所得割額が下がり保育料に影響する場合がありますが、効果は限定的です</li>
<li><strong>住宅ローン控除</strong>は所得税から引ききれない分が住民税から控除されるため、保育料に影響する可能性があります</li>
<li>控除の効果は世帯の所得状況によって異なります。保育料の階層の境目付近にいる場合に効果が大きくなります</li>
</ul>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>保育料は0〜2歳の第1子のみに発生します。3〜5歳児は無償、第2子以降は札幌市の制度で無償のため、すべての世帯に関係するわけではありません。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>保育料の階層区分と市民税所得割額の関係は<a href="https://kosodate.city.sapporo.jp/mokuteki/azukeru/hoikuryou/gaiyou.html" target="_blank" rel="noopener">札幌市子育てサイト「保育料について」</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 45,
  },

  // 35. 就労証明書
  {
    slug: "shurou-shoumeisho",
    citySlug: "sapporo",
    title: "就労証明書の書き方ガイド　札幌市の保育園申込に必要な記載項目",
    description:
      "札幌市の保育園入園に必要な就労証明書の記入方法、注意点、よくある間違いを解説します。",
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop",
    category: "申請・手続き",
    categoryColor: "teal",
    content: `<h2>就労証明書とは</h2>
<p>保育園の入園申込に必須の書類です。保護者の就労状況を勤務先が証明するもので、この内容をもとに<strong>基本点数</strong>が算出されます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>就労証明書の記載内容で点数が決まります。勤務先に正確に記入してもらうことが最も重要です。</p>
</div>

<h2>主な記載項目</h2>
<table>
<tr><th>項目</th><th>記載内容</th><th>点数への影響</th></tr>
<tr><td>雇用形態</td><td>正社員・パート・派遣等</td><td>直接の影響なし（労働時間で判定）</td></tr>
<tr><td>勤務日数</td><td>月の稼動日数</td><td>基本点数に直接影響</td></tr>
<tr><td>勤務時間</td><td>月の総労働時間</td><td>基本点数に直接影響</td></tr>
<tr><td>勤務先所在地</td><td>勤務先の住所</td><td>通勤時間の確認用</td></tr>
<tr><td>就労開始日</td><td>入社日・就労開始日</td><td>継続就労の確認</td></tr>
</table>

<h2>よくある間違い・注意点</h2>
<ul>
<li><strong>育休中の場合</strong>：「現在の勤務状況」は育休中と記載し、「復職予定日」を必ず記入</li>
<li><strong>シフト制の場合</strong>：最低勤務日数・時間ではなく、通常のシフトでの見込みを記入</li>
<li><strong>残業時間</strong>：残業は月の労働時間に含めないのが一般的。就業規則上の所定労働時間で記入</li>
<li><strong>勤務先の押印</strong>：事業主の記入欄には代表者名と押印（または電子署名）が必要</li>
</ul>

<div class="step">
<h3>ステップ1：様式のダウンロード</h3>
<p>札幌市指定の就労証明書をダウンロードします。</p>
</div>

<div class="step">
<h3>ステップ2：勤務先に依頼</h3>
<p>人事部門に記入を依頼します。余裕をもって1か月前には依頼しましょう。</p>
</div>

<div class="step">
<h3>ステップ3：内容の確認</h3>
<p>受け取ったら、稼動日数と月労働時間が実態と合っているか必ず確認してください。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>就労証明書の様式は<a href="https://kosodate.city.sapporo.jp/mokuteki/azukeru/hoiku/ninka/835.html" target="_blank" rel="noopener">札幌市子育てサイト</a>からダウンロードできます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 65,
  },

  // 36. 申請書類一覧
  {
    slug: "shinsei-shorui-list",
    citySlug: "sapporo",
    title: "札幌市の保育園申込に必要な書類一覧　チェックリスト付き",
    description:
      "札幌市で認可保育所に申し込む際に必要な書類を、チェックリスト形式で解説します。",
    image:
      "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=400&fit=crop",
    category: "申請・手続き",
    categoryColor: "teal",
    content: `<h2>必要書類チェックリスト</h2>
<p>札幌市の認可保育所等への入園申込に必要な書類です。お住まいの区の保健センターに提出します。</p>

<h3>全員が必要な書類</h3>
<table>
<tr><th>書類名</th><th>入手先</th><th>備考</th></tr>
<tr><td>教育・保育給付認定申請書</td><td>区の保健センターまたは公式サイト</td><td>子ども1人につき1枚</td></tr>
<tr><td>利用申込書</td><td>区の保健センターまたは公式サイト</td><td>希望園の順位を記入</td></tr>
<tr><td>就労証明書（父・母 各1通）</td><td>勤務先に記入依頼</td><td>直近のもの</td></tr>
</table>

<h3>該当する方のみ必要な書類</h3>
<table>
<tr><th>該当状況</th><th>必要書類</th></tr>
<tr><td>ひとり親家庭</td><td>児童扶養手当証書の写し、または戸籍謄本</td></tr>
<tr><td>障がい者がいる世帯</td><td>障害者手帳の写し</td></tr>
<tr><td>自営業・フリーランス</td><td>開業届の写し、確定申告書の写し等</td></tr>
<tr><td>求職活動中</td><td>求職活動申立書</td></tr>
<tr><td>妊娠・出産</td><td>母子健康手帳の写し</td></tr>
<tr><td>介護・看護</td><td>診断書、介護保険被保険者証の写し等</td></tr>
<tr><td>在学中</td><td>在学証明書、時間割表</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>書類の不備は選考に影響する可能性があります。締切の1週間前には書類を揃え、内容を確認してから提出しましょう。</p>
</div>

<div class="step">
<h3>ステップ1：書類の入手</h3>
<p>区の保健センター窓口または札幌市子育てサイトから様式をダウンロードします。</p>
</div>

<div class="step">
<h3>ステップ2：就労証明書の依頼</h3>
<p>勤務先に記入を依頼します。父母それぞれの分が必要です。1か月前には依頼を。</p>
</div>

<div class="step">
<h3>ステップ3：その他書類の準備</h3>
<p>該当する加点書類（ひとり親証明等）を準備します。</p>
</div>

<div class="step">
<h3>ステップ4：提出</h3>
<p>お住まいの区の保健センターに提出します。郵送も可能な場合がありますが、窓口提出が確実です。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新の必要書類は<a href="https://kosodate.city.sapporo.jp/mokuteki/azukeru/hoiku/ninka/835.html" target="_blank" rel="noopener">札幌市子育てサイト「認可保育所等への入所手続きについて」</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 70,
  },

  // 37. 二次申請の流れ
  {
    slug: "niji-shinsei-flow",
    citySlug: "sapporo",
    title: "二次調整の申請手続きを解説　札幌市で1次不承諾後にやること",
    description:
      "札幌市で1次調整の結果が不承諾だった場合の二次調整の申請手続き、希望園変更の方法を解説します。",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
    category: "申請・手続き",
    categoryColor: "teal",
    content: `<h2>1次不承諾後の流れ</h2>
<p>1次調整で不承諾になった場合、自動的に2次調整の対象になります。ただし、希望園の変更や追加をする場合は手続きが必要です。</p>

<div class="step">
<h3>ステップ1：結果通知の確認</h3>
<p>1次調整の結果通知を確認します。不承諾の場合、2次調整の案内が同封されています。</p>
</div>

<div class="step">
<h3>ステップ2：空き状況の確認</h3>
<p>1次調整後の空き状況を札幌市公式サイトで確認します。受入可能数が残っている園を探しましょう。</p>
</div>

<div class="step">
<h3>ステップ3：希望園の変更・追加</h3>
<p>希望園を変更・追加する場合は、変更届を区の保健センターに提出します。2次調整の締切日までに提出が必要です。</p>
</div>

<div class="step">
<h3>ステップ4：結果通知</h3>
<p>2次調整の結果は3月上旬に通知されます。</p>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>2次調整では、1次で辞退が出た園や定員割れした園に空きがあります。特に新設園や駅から遠い園は2次で枠が残っていることが多いです。</p>
</div>

<h2>2次でも不承諾の場合</h2>
<ul>
<li><strong>年度途中の空き待ち</strong>：申込を取り下げなければ、年度途中で空きが出た際に案内が来ます</li>
<li><strong>認可外保育施設の検討</strong>：企業主導型保育や認可外保育施設も選択肢に</li>
<li><strong>育休延長</strong>：不承諾通知は育休延長の手続きに使えます</li>
</ul>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>育休延長を目的として、あえて入れない園だけを希望する「特定の保育所等のみの利用申込」の場合、不承諾通知が育休延長の要件を満たさない場合があります。詳細はハローワークにご確認ください。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>2次調整の日程と手続きは<a href="https://kosodate.city.sapporo.jp/mokuteki/azukeru/hoiku/ninka/835.html" target="_blank" rel="noopener">札幌市子育てサイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 50,
  },

  // 38. 転居と保活
  {
    slug: "tenkyo-hokatsu",
    citySlug: "sapporo",
    title: "転居先で保育園に入るには？札幌市への転入・市内転居の手続き",
    description:
      "札幌市への転入や市内での転居に伴う保育園の手続き、広域利用の仕組みを解説します。",
    image:
      "https://images.unsplash.com/photo-1516156008625-3a9d6067fab5?w=800&h=400&fit=crop",
    category: "申請・手続き",
    categoryColor: "teal",
    content: `<h2>札幌市への転入の場合</h2>
<p>他の市区町村から札幌市に転入する場合、転入前でも保育園の申込が可能です。</p>

<div class="step">
<h3>ステップ1：申込</h3>
<p>転入予定であることを伝え、現在お住まいの市区町村を通じて札幌市に申込書類を提出します（広域利用申請）。</p>
</div>

<div class="step">
<h3>ステップ2：転入届の提出</h3>
<p>入園月の前月末までに札幌市に転入届を提出することが条件です。</p>
</div>

<div class="step">
<h3>ステップ3：入園</h3>
<p>利用調整の結果、内定が出れば入園できます。</p>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>4月入園の場合、申込締切日までに書類を提出する必要があります。転居時期が確定したら、早めに札幌市の保健センターに相談しましょう。</p>
</div>

<h2>札幌市内での転居の場合</h2>
<p>市内で区をまたいで転居する場合でも、通っている保育園を<strong>継続利用</strong>できます。通園が可能であれば転園の必要はありません。</p>
<ul>
<li>転居後の住所変更届を区の保健センターに提出</li>
<li>転園を希望する場合は、転入先の区で転園申込</li>
</ul>

<h2>札幌市から転出する場合</h2>
<p>他の市区町村に転出する場合は、札幌市の保育園は退園となります。転出先での保育園申込は、転出先の自治体の手続きに従ってください。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>転入・転居に伴う手続きは、お住まいの区（または転入予定の区）の保健センターにお問い合わせください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 45,
  },

  // 39. 教育と保育の違い
  {
    slug: "kyoiku-hoiku-chigai",
    citySlug: "sapporo",
    title: "1号認定と2号認定の違い　札幌市の教育認定と保育認定",
    description:
      "札幌市の保育園・幼稚園・認定こども園における認定区分（1号・2号・3号）の違いを解説します。",
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=400&fit=crop",
    category: "園の種類",
    categoryColor: "amber",
    content: `<h2>認定区分とは</h2>
<p>保育園や幼稚園を利用するには、お住まいの市区町村から<strong>認定</strong>を受ける必要があります。認定区分は3種類あります。</p>

<h3>認定区分の一覧</h3>
<table>
<tr><th>認定区分</th><th>年齢</th><th>保育の必要性</th><th>利用できる施設</th></tr>
<tr><td>1号認定（教育認定）</td><td>3〜5歳</td><td>不要</td><td>幼稚園、認定こども園（教育部分）</td></tr>
<tr><td>2号認定（保育認定）</td><td>3〜5歳</td><td>必要</td><td>保育所、認定こども園（保育部分）</td></tr>
<tr><td>3号認定（保育認定）</td><td>0〜2歳</td><td>必要</td><td>保育所、認定こども園、小規模保育等</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>「保育の必要性」とは、就労・妊娠出産・疾病・介護・求職活動などの事由があることです。共働き世帯は2号または3号認定になります。</p>
</div>

<h2>保育時間の違い</h2>
<table>
<tr><th></th><th>1号認定</th><th>2号・3号認定（標準時間）</th><th>2号・3号認定（短時間）</th></tr>
<tr><td>利用時間</td><td>教育標準時間（4時間程度）</td><td>最大11時間</td><td>最大8時間</td></tr>
<tr><td>預かり保育</td><td>利用可能（別料金）</td><td>-</td><td>-</td></tr>
</table>

<h2>認定の手続き</h2>
<ul>
<li><strong>2号・3号認定</strong>：保育園の入園申込と同時に、区の保健センターで認定申請</li>
<li><strong>1号認定</strong>：幼稚園・認定こども園に直接申込。認定は園を通じて手続き</li>
</ul>

<h2>認定区分の変更</h2>
<p>就労状況の変化（退職・就職など）に応じて、認定区分を変更することができます。例えば、退職して2号認定から1号認定に変更し、認定こども園の教育部分に切り替えることも可能です。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>認定区分の詳細は<a href="https://kosodate.city.sapporo.jp/mokuteki/azukeru/hoiku/ninka/835.html" target="_blank" rel="noopener">札幌市子育てサイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 50,
  },

  // 40. 保活カレンダー
  {
    slug: "hokatsu-calendar",
    citySlug: "sapporo",
    title: "札幌市の保活カレンダー　4月入園に向けた月別スケジュール",
    description:
      "札幌市で4月入園を目指す場合の保活スケジュールを月別にまとめました。",
    image:
      "https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>保活はいつから始める？</h2>
<p>札幌市の4月入園の場合、<strong>前年の春〜夏</strong>から保活を始めるのが理想的です。以下は典型的なスケジュールです。</p>

<h3>月別スケジュール（4月入園の場合）</h3>
<table>
<tr><th>時期</th><th>やること</th></tr>
<tr><td>4月〜6月</td><td>情報収集開始。前年度の空き状況や倍率を確認</td></tr>
<tr><td>7月〜8月</td><td>園見学。複数の園を見学し、候補をリストアップ</td></tr>
<tr><td>9月〜10月</td><td>申込書類の入手・準備。就労証明書を勤務先に依頼</td></tr>
<tr><td>11月</td><td><span class="highlight">1次調整の申込締切</span>（11月下旬頃）</td></tr>
<tr><td>12月〜1月</td><td>1次調整の選考期間</td></tr>
<tr><td>1月下旬</td><td><span class="highlight">1次調整の結果通知</span></td></tr>
<tr><td>1月下旬〜2月</td><td>不承諾の場合、2次調整の希望園変更</td></tr>
<tr><td>3月上旬</td><td><span class="highlight">2次調整の結果通知</span></td></tr>
<tr><td>3月中旬〜</td><td>入園準備（健康診断・面談・持ち物準備）</td></tr>
<tr><td>4月</td><td>入園・慣らし保育開始</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>園見学は夏がベストシーズン。秋以降は見学の予約が取りにくくなります。早めに動きましょう。</p>
</div>

<h2>年度途中の入園を目指す場合</h2>
<p>4月以外の月でも、空きがあれば入園可能です。毎月の空き状況は札幌市の公式サイトで更新されます。申込は随時受け付けています。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>上記の日程は目安です。年度によって異なる場合がありますので、必ず最新の日程を札幌市公式サイトで確認してください。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新の申込スケジュールは<a href="https://kosodate.city.sapporo.jp/mokuteki/azukeru/hoiku/ninka/835.html" target="_blank" rel="noopener">札幌市子育てサイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 75,
  },

  // 41. 相場点数
  {
    slug: "souba-tensuu",
    citySlug: "sapporo",
    title: "何点あれば入れる？札幌市の保育園入園に必要な点数の目安",
    description:
      "札幌市の保育園入園に必要な点数の目安を、区や年齢クラス別の傾向とともに解説します。",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>入園に必要な点数の目安</h2>
<p>札幌市は入園のボーダーライン点数を公式には公開していませんが、一般的な傾向として以下の目安があります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>フルタイム共働き（200点）＋育休明け加点（+40点）＝<span class="highlight">240点が標準的なライン</span>です。人気園では240点でも入れない場合があります。</p>
</div>

<h3>点数パターン別の入園見込み</h3>
<table>
<tr><th>合計点数</th><th>世帯の例</th><th>入園見込み</th></tr>
<tr><td>300点</td><td>フルタイム共働き＋育休明け＋きょうだい在園</td><td>ほぼ確実</td></tr>
<tr><td>240点</td><td>フルタイム共働き＋育休明け</td><td>多くの園で入園可能</td></tr>
<tr><td>200〜230点</td><td>フルタイム＋パートタイム</td><td>園・年齢による</td></tr>
<tr><td>200点未満</td><td>パートタイム同士、求職中含む</td><td>人気園は厳しい</td></tr>
</table>

<h2>区による傾向の違い</h2>
<p>札幌市は10区ありますが、区や地域によって保育園の競争率は異なります。</p>
<ul>
<li><strong>中央区・北区</strong>：人口が多く、特に駅周辺の園は競争率が高い傾向</li>
<li><strong>白石区・豊平区</strong>：子育て世帯が多く、1歳クラスは激戦</li>
<li><strong>手稲区・清田区・南区</strong>：郊外エリアは比較的入りやすい園もある</li>
</ul>

<h2>同点の場合はどうなる？</h2>
<p>同じ点数の場合は<strong>別表3（優先順位）</strong>で判断されます。主な優先項目は以下の通りです。</p>
<ul>
<li>ひとり親世帯</li>
<li>きょうだいが同一の保育所等に入所中</li>
<li>保育料の滞納がないこと</li>
<li>その他、世帯の状況に応じた総合的な判断</li>
</ul>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>上記の目安は一般的な傾向であり、年度や園によって大きく異なります。公式のボーダーラインは公開されていないため、参考程度にしてください。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>各園の受入予定数や申込状況は<a href="https://kosodate.city.sapporo.jp/mokuteki/azukeru/hoiku/ninka/835.html" target="_blank" rel="noopener">札幌市子育てサイト</a>で公開されています。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 80,
  },

  // 42. 区別の倍率
  {
    slug: "ku-betsu-bairitsu",
    citySlug: "sapporo",
    title: "札幌市10区の保育園倍率傾向　入りやすい区はどこ？",
    description:
      "札幌市の10区それぞれの保育園入園の競争率の傾向と、区ごとの特徴を解説します。",
    image:
      "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>札幌市10区の保育園事情</h2>
<p>札幌市は<strong>中央区・北区・東区・白石区・厚別区・豊平区・清田区・南区・西区・手稲区</strong>の10区からなります。区によって保育園の数、子どもの人口、競争率が異なります。</p>

<h3>区別の傾向（一般的な目安）</h3>
<table>
<tr><th>区</th><th>競争率の傾向</th><th>特徴</th></tr>
<tr><td>中央区</td><td>高め</td><td>人口密集。マンション増加で子育て世帯が多い</td></tr>
<tr><td>北区</td><td>高め</td><td>市内最多人口。地域差が大きい</td></tr>
<tr><td>東区</td><td>中程度</td><td>住宅地が多い。園の数も比較的多い</td></tr>
<tr><td>白石区</td><td>中〜高め</td><td>交通利便性が高く子育て世帯に人気</td></tr>
<tr><td>厚別区</td><td>中程度</td><td>新さっぽろ周辺は需要が高い</td></tr>
<tr><td>豊平区</td><td>中程度</td><td>地下鉄沿線は競争率が高い傾向</td></tr>
<tr><td>清田区</td><td>やや低め</td><td>郊外住宅地。車通勤なら選択肢が広がる</td></tr>
<tr><td>南区</td><td>低め</td><td>面積は広いが人口密度は低い</td></tr>
<tr><td>西区</td><td>中程度</td><td>地下鉄沿線は人気。琴似周辺は競争率高め</td></tr>
<tr><td>手稲区</td><td>やや低め</td><td>JR沿線は需要あり。郊外は比較的入りやすい</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>札幌市は区をまたいだ申込が可能です。自宅から通える範囲で、隣の区の園も候補に入れると選択肢が広がります。</p>
</div>

<h2>倍率を確認する方法</h2>
<p>札幌市は各園の受入予定数と申込数を公式サイトで公開しています。これを確認することで、実際の倍率の傾向がわかります。</p>

<h2>注意点</h2>
<ul>
<li>上記の傾向はあくまで一般的な目安です。年度や園によって大きく異なります</li>
<li>新設園がオープンすると、その年は周辺の園の倍率が下がることがあります</li>
<li>駅から離れた園は倍率が低い傾向がありますが、車での送迎が必要になる場合があります</li>
</ul>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>上記の競争率の傾向は一般的な目安であり、実際の倍率は年度・園・年齢クラスによって異なります。最新の情報は札幌市の公式データで確認してください。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>各園の受入予定数・申込状況は<a href="https://kosodate.city.sapporo.jp/mokuteki/azukeru/hoiku/ninka/835.html" target="_blank" rel="noopener">札幌市子育てサイト</a>で公開されています。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 70,
  },

  // 43. 育休延長のリスク
  {
    slug: "ikukyu-enchou-risk",
    citySlug: "sapporo",
    title: "育休延長で保活に不利になる？札幌市での影響と注意点",
    description:
      "育児休業を延長した場合の保活への影響、不承諾通知の取得、育休延長制度の改正予定を解説します。",
    image:
      "https://images.unsplash.com/photo-1493894473891-10fc1e5dbd22?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>育休延長の仕組み</h2>
<p>育児休業は原則として子どもが<strong>1歳になるまで</strong>ですが、保育園に入れない場合は<strong>1歳6か月まで</strong>、さらに入れない場合は<strong>2歳まで</strong>延長できます。</p>

<h2>延長に必要な「不承諾通知」</h2>
<p>育休延長にはハローワークに<strong>保育園の不承諾通知</strong>（利用保留通知書）を提出する必要があります。札幌市で申込をして不承諾になれば、この通知書が発行されます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>育休延長のための不承諾通知は、子どもの誕生日の前日時点で保育園の利用保留になっていることが必要です。申込のタイミングに注意してください。</p>
</div>

<h2>育休延長で点数はどうなる？</h2>
<p>育休延長自体は基本点数に影響しません。ただし、以下の点に注意が必要です。</p>
<ul>
<li><strong>育休明け加点</strong>（+40点）は、復職予定で申し込んだ場合に加算されます</li>
<li>育休を延長しても、次回の4月入園で復職予定なら育休明け加点は付きます</li>
<li>ただし、育休延長を繰り返す場合、復職の意思が問われる場合があります</li>
</ul>

<h2>育休延長制度の今後</h2>
<p>育児休業給付金の延長申請については、制度の見直しが議論されています。今後、申請手続きや要件が変わる可能性があります。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>育休延長のための保育園申込について、入所意思のない申込（特定の園のみ申込むなど）に対するチェックが強化される方向にあります。最新の情報はハローワークと勤務先にご確認ください。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>育児休業給付金の延長手続きについては<a href="https://www.hellowork.mhlw.go.jp/" target="_blank" rel="noopener">ハローワーク</a>にお問い合わせください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 60,
  },

  // 44. 復職準備
  {
    slug: "fukushoku-junbi",
    citySlug: "sapporo",
    title: "入園が決まったら始める復職準備　慣らし保育と職場復帰のコツ",
    description:
      "札幌市の保育園入園決定後に必要な復職準備、慣らし保育の期間、職場復帰のスケジュールを解説します。",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>入園決定後の流れ</h2>
<p>入園が決まったら、復職に向けた準備を始めましょう。4月入園の場合、3月中に入園準備と復職の段取りを進めます。</p>

<div class="step">
<h3>ステップ1：入園前面談・健康診断</h3>
<p>入園先の園で面談と健康診断があります。日程は園から通知されます。</p>
</div>

<div class="step">
<h3>ステップ2：勤務先への復職連絡</h3>
<p>入園が決まったら、勤務先に復職日を連絡します。慣らし保育の期間を考慮した復職日を相談しましょう。</p>
</div>

<div class="step">
<h3>ステップ3：慣らし保育</h3>
<p>4月の最初の1〜2週間は慣らし保育です。最初は数時間から始め、徐々に保育時間を延ばしていきます。</p>
</div>

<div class="step">
<h3>ステップ4：復職</h3>
<p>慣らし保育終了後に本格復職します。多くの方は4月中旬〜下旬に復職しています。</p>
</div>

<h2>慣らし保育の期間</h2>
<table>
<tr><th>期間</th><th>保育時間の目安</th></tr>
<tr><td>1〜2日目</td><td>1〜2時間</td></tr>
<tr><td>3〜4日目</td><td>午前中まで（給食あり）</td></tr>
<tr><td>5日目〜1週間</td><td>午後のおやつまで</td></tr>
<tr><td>2週目〜</td><td>通常保育時間</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>慣らし保育の期間は園やお子さんの様子によって異なります。最低でも<span class="highlight">2週間</span>は見ておきましょう。勤務先にはその分の有給休暇や復職日の調整を相談してください。</p>
</div>

<h2>復職前にやっておくこと</h2>
<ul>
<li>病児保育・病後児保育の登録（急な発熱時の預け先を確保）</li>
<li>ファミリーサポートの登録（送迎の補助が必要な場合）</li>
<li>かかりつけ小児科の確認</li>
<li>保育園の持ち物準備（名前付けなど）</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>札幌市の病児保育・ファミリーサポートは<a href="https://kosodate.city.sapporo.jp/" target="_blank" rel="noopener">札幌市子育てサイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 55,
  },

  // 45. 3人目の保活
  {
    slug: "sannin-me-hokatsu",
    citySlug: "sapporo",
    title: "3人目の保活ガイド　札幌市の多子世帯向け加点と保育料",
    description:
      "札幌市で3人目以降の子どもの保活に関する加点制度、保育料、入園戦略を解説します。",
    image:
      "https://images.unsplash.com/photo-1609220136736-443140cffec6?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>3人目の加点はどうなる？</h2>
<p>札幌市の利用調整基準では、子どもの人数による直接的な加点はありません。ただし、<strong>きょうだい在園加点</strong>が大きなアドバンテージになります。</p>

<h3>想定される加点</h3>
<table>
<tr><th>状況</th><th>調整指数</th></tr>
<tr><td>上の子2人が同じ認可保育所に在園＋育休明け</td><td>+100点（育休明け＋きょうだい在園の一括加算）</td></tr>
<tr><td>上の子が在園＋きょうだい同時入所</td><td>きょうだい在園+80点 ※同時入所+30点との重複不可</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>3人目の場合、フルタイム共働き200点＋育休明け＋きょうだい在園+100点＝<span class="highlight">300点</span>。これはほぼ最高水準の点数で、入園はかなり有利です。</p>
</div>

<h2>3人目の保育料</h2>
<p>札幌市では第2子以降の保育料が所得制限なしで無償化されています。3人目はもちろん<strong>保育料無料</strong>です。</p>

<h3>費用の比較</h3>
<table>
<tr><th></th><th>第1子</th><th>第2子</th><th>第3子</th></tr>
<tr><td>0〜2歳保育料</td><td>所得に応じた額</td><td>無料</td><td>無料</td></tr>
<tr><td>3〜5歳保育料</td><td>無料（国の制度）</td><td>無料</td><td>無料</td></tr>
<tr><td>副食費</td><td>月4,500円程度</td><td>月4,500円程度</td><td>免除の場合あり</td></tr>
</table>

<h2>3人を同じ園に入れるコツ</h2>
<ul>
<li>上の子2人と同じ園を第1希望にする</li>
<li>育休明け加点を確実に取る</li>
<li>3人目の年齢クラスの受入枠を事前に確認</li>
<li>送迎の動線を考慮し、別の園になっても対応できる計画を立てておく</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>多子世帯向けの保育料や制度は<a href="https://kosodate.city.sapporo.jp/mokuteki/azukeru/hoikuryou/gaiyou.html" target="_blank" rel="noopener">札幌市子育てサイト「保育料について」</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 45,
  },

  // 46. 単身赴任
  {
    slug: "tanshin-funin",
    citySlug: "sapporo",
    title: "単身赴任中の保活　札幌市での点数計算と必要書類",
    description:
      "配偶者が単身赴任中の場合の札幌市での保活、点数の計算方法、必要な書類を解説します。",
    image:
      "https://images.unsplash.com/photo-1507679799987-c73b1c7e2b64?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>単身赴任中の点数計算</h2>
<p>配偶者が単身赴任中の場合でも、基本点数は<strong>父母それぞれ</strong>の就労状況で計算されます。単身赴任であること自体による加点や減点はありません。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>単身赴任でも両親とも就労していれば、フルタイム共働きの200点がベースになります。単身赴任の配偶者も就労証明書の提出が必要です。</p>
</div>

<h2>必要書類</h2>
<ul>
<li><strong>就労証明書</strong>：単身赴任先の勤務先に記入してもらう</li>
<li><strong>住民票</strong>：世帯の状況を確認するため</li>
<li>勤務先が遠方の場合、就労証明書の郵送でのやり取りに時間がかかるため、早めに依頼を</li>
</ul>

<h2>送迎の現実的な問題</h2>
<p>単身赴任で片方の親がワンオペ育児になる場合、保育園選びでは以下の点が特に重要です。</p>
<ul>
<li><strong>自宅からの距離</strong>：毎日の送迎を1人で行うため、近い園が理想的</li>
<li><strong>延長保育の有無</strong>：急な残業に対応できるか</li>
<li><strong>病児保育の確保</strong>：子どもの急な体調不良時の預け先</li>
<li><strong>ファミリーサポート</strong>：送迎補助が必要な場合の登録</li>
</ul>

<h2>祖父母のサポートがある場合</h2>
<p>同居の祖父母がいる場合は、祖父母の状況も利用調整に影響する可能性があります。ただし、同居の祖父母が65歳以上や就労中であれば、保育の必要性には影響しないのが一般的です。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>世帯構成に関する質問は、お住まいの区の保健センターにお問い合わせください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 35,
  },

  // 47. 祖父母同居
  {
    slug: "sofu-sobo-doukyo",
    citySlug: "sapporo",
    title: "祖父母と同居していると不利？札幌市の保活への影響",
    description:
      "祖父母と同居している場合の札幌市の保活への影響と、同居・近居の定義について解説します。",
    image:
      "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>祖父母同居は不利になる？</h2>
<p>結論から言うと、札幌市では祖父母の同居・近居だけを理由に<strong>基本点数が減点されることはありません</strong>。基本点数はあくまで父母の就労状況で決まります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>札幌市の利用調整基準では、祖父母の存在は基本点数や調整指数に直接影響しません。ただし、同点時の優先順位判断で考慮される可能性はあります。</p>
</div>

<h2>祖父母に関する注意点</h2>
<ul>
<li><strong>同居の祖父母が無職・健康の場合</strong>：札幌市では祖父母の状況で減点されることは基本的にありませんが、自治体によって異なるルールがあるため、区の保健センターに確認すると安心です</li>
<li><strong>祖父母が保育できる場合</strong>：基本点数には影響しませんが、保育の必要性自体が問われる可能性はゼロではありません</li>
<li><strong>65歳以上の祖父母</strong>：高齢の祖父母については、保育の担い手とは見なされないのが一般的です</li>
</ul>

<h2>祖父母同居のメリット</h2>
<p>保活では不利にはなりませんが、実際の子育てでは大きなメリットがあります。</p>
<ul>
<li>子どもの急な発熱時のお迎え対応</li>
<li>保育園の送迎補助</li>
<li>慣らし保育期間中のサポート</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>世帯構成と保育の必要性の関係について詳しくは、お住まいの区の保健センターにお問い合わせください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 40,
  },

  // 48. 不承認時の対応
  {
    slug: "fushoninchi-taiou",
    citySlug: "sapporo",
    title: "保育園に落ちたらどうする？札幌市での不承諾後の5つの選択肢",
    description:
      "札幌市の保育園入園で不承諾になった場合の対応方法と、利用できる代替手段を解説します。",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>不承諾通知を受け取ったら</h2>
<p>1次調整で不承諾になっても、まだ選択肢はあります。落ち着いて次のアクションを考えましょう。</p>

<h2>5つの選択肢</h2>

<div class="step">
<h3>選択肢1：2次調整に申し込む</h3>
<p>1次で不承諾の方は自動的に2次調整の対象になります。希望園の変更・追加が可能です。1次で定員割れした園を狙いましょう。</p>
</div>

<div class="step">
<h3>選択肢2：認可外保育施設を利用する</h3>
<p>企業主導型保育、認可外保育園など、利用調整なしで申し込める施設があります。4月入園に間に合う施設を探しましょう。</p>
</div>

<div class="step">
<h3>選択肢3：育休を延長する</h3>
<p>不承諾通知をハローワークに提出すれば、育児休業給付金の延長が可能です。次の4月入園を目指します。</p>
</div>

<div class="step">
<h3>選択肢4：年度途中の入園を待つ</h3>
<p>申込を取り下げなければ、年度途中で空きが出た際に案内が来ます。転勤・引っ越しなどで退園者が出るタイミング（9月〜10月頃）にチャンスがあります。</p>
</div>

<div class="step">
<h3>選択肢5：幼稚園の預かり保育を利用する</h3>
<p>3歳以上なら、幼稚園の預かり保育も選択肢です。無償化の対象で、預かり保育料の補助もあります。</p>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>不承諾は「今回入れなかった」だけであり、保育の必要性が否定されたわけではありません。次の申込に向けて、加点の確認や希望園の見直しを行いましょう。</p>
</div>

<h2>次回の申込に向けて</h2>
<ul>
<li>今回の点数を確認し、加点の漏れがないか見直す</li>
<li>希望園の範囲を広げる（隣の区も含めて検討）</li>
<li>小規模保育事業所も候補に入れる</li>
<li>認可外に通いながら認可の空き待ちをする二段構えも有効</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>年度途中の空き状況は<a href="https://kosodate.city.sapporo.jp/mokuteki/azukeru/hoiku/ninka/835.html" target="_blank" rel="noopener">札幌市子育てサイト</a>で毎月更新されています。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 65,
  },

  // 49. 待機児童対策
  {
    slug: "taiki-jidou-taisaku",
    citySlug: "sapporo",
    title: "札幌市の待機児童の現状と対策　最新データで見る保活事情",
    description:
      "札幌市の待機児童数の推移、市の対策、保護者が知っておくべき最新情報を解説します。",
    image:
      "https://images.unsplash.com/photo-1560807707-8cc77767d783?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>札幌市の待機児童の現状</h2>
<p>札幌市は待機児童の解消に取り組んでおり、国の定義による待機児童数は近年大幅に減少しています。ただし、希望する園に入れない「隠れ待機児童」（利用保留児童）は一定数存在します。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>「待機児童ゼロ」でも、希望する園に入れるとは限りません。利用保留児童（特定の園のみ希望等で入れなかった児童）の数にも注目してください。</p>
</div>

<h2>札幌市の主な対策</h2>
<table>
<tr><th>対策</th><th>内容</th></tr>
<tr><td>保育定員の拡大</td><td>認可保育所・認定こども園の新設、定員増</td></tr>
<tr><td>小規模保育の推進</td><td>0〜2歳を対象とした小規模保育事業所の整備</td></tr>
<tr><td>保育士確保</td><td>保育士の処遇改善、就職支援</td></tr>
<tr><td>第2子以降の保育料無償化</td><td>2024年4月から所得制限なしで無償化</td></tr>
</table>

<h2>保護者ができること</h2>
<ul>
<li><strong>早めの情報収集</strong>：前年度の申込状況を確認し、競争率の低い園も候補に</li>
<li><strong>希望園を増やす</strong>：通える範囲の園をできるだけ多く書く</li>
<li><strong>加点を最大限活用</strong>：使える調整指数は漏れなく申請</li>
<li><strong>複数の選択肢を準備</strong>：認可外保育施設や幼稚園の預かり保育も並行して検討</li>
</ul>

<h2>年齢別の入りやすさ</h2>
<ul>
<li><strong>0歳</strong>：全員新規枠のため、枠数は多い。ただし園によっては受入月齢に制限</li>
<li><strong>1歳</strong>：育休明けが集中し<span class="highlight">最も競争が激しい</span>年齢</li>
<li><strong>2歳</strong>：持ち上がりが多く新規枠は少ない</li>
<li><strong>3歳以上</strong>：認定こども園の定員増や幼稚園の選択肢もあり、比較的入りやすい</li>
</ul>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>待機児童数や利用保留児童数は年度によって変動します。最新のデータは札幌市の公式発表で確認してください。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>札幌市の待機児童に関する最新情報は<a href="https://kosodate.city.sapporo.jp/" target="_blank" rel="noopener">札幌市子ども未来局</a>の公式ページで確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 55,
  },

  // 50. 転園申込
  {
    slug: "tennen-moshikomi",
    citySlug: "sapporo",
    title: "転園の申し込み方法　札幌市で別の保育園に移りたい場合",
    description:
      "札幌市で現在通っている保育園から別の園に転園する方法、手続き、注意点を解説します。",
    image:
      "https://images.unsplash.com/photo-1516156008625-3a9d6067fab5?w=800&h=400&fit=crop",
    category: "申請・手続き",
    categoryColor: "teal",
    content: `<h2>転園の仕組み</h2>
<p>現在認可保育所に通っている場合でも、別の園への転園を申し込むことができます。転園も通常の利用調整と同じく<strong>点数順</strong>で選考されます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>転園申込は新規入園と同じ利用調整で選考されます。現在在園中であることによる加点はないため、人気園への転園は簡単ではありません。</p>
</div>

<h2>転園の手続き</h2>

<div class="step">
<h3>ステップ1：転園希望の申込</h3>
<p>区の保健センターに転園の利用申込書を提出します。希望園と希望月を記入します。</p>
</div>

<div class="step">
<h3>ステップ2：利用調整</h3>
<p>新規入園の申込と合わせて利用調整が行われます。空きが出た場合に点数順で内定が決まります。</p>
</div>

<div class="step">
<h3>ステップ3：内定・転園</h3>
<p>内定が出たら、現在の園を退園し、新しい園に入園します。</p>
</div>

<h2>転園の注意点</h2>
<ul>
<li><strong>転園が決まるまで現在の園に在園できる</strong>：転園申込をしても、決まるまでは今の園を退園する必要はありません</li>
<li><strong>4月入園が最もチャンスが大きい</strong>：年度途中は空きが少ないため、4月の利用調整に合わせて申し込むのがおすすめ</li>
<li><strong>きょうだいがいる場合</strong>：上の子と同じ園に転園を希望する場合、きょうだい在園加点（+80点）が付きます</li>
<li><strong>慣らし保育が再度必要</strong>：新しい園でも慣らし保育が必要になる場合があります</li>
</ul>

<h2>転園を検討するケース</h2>
<ul>
<li>引っ越しで通園が困難になった</li>
<li>きょうだいと別々の園に通っており、同じ園にしたい</li>
<li>小規模保育を卒園し、3歳からの園を探している</li>
<li>園の方針や環境が合わない</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>転園の手続きについては、お住まいの区の保健センターにお問い合わせください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 40,
  },
];

registerArticles(articles);
