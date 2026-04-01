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
  },
];

registerArticles(articles);
