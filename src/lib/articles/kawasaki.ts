import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  // ========== 保活の基本 (1) ==========
  {
    slug: "ku-betsu-tokucho",
    citySlug: "kawasaki",
    title: "川崎市の区別の保活事情｜中原区・高津区・宮前区など7区を比較",
    description:
      "川崎市7区それぞれの保活の特徴を解説。中原区が最激戦、高津区が穴場と言われる理由や、各区の入りやすさの傾向をまとめました。",
    image:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>川崎市7区の保活マップ</h2>
<p>川崎市は7つの区（川崎区・幸区・中原区・高津区・宮前区・多摩区・麻生区）で構成されています。区によって入園の競争率が大きく異なります。</p>

<h3>中原区（武蔵小杉エリア）：最激戦</h3>
<p>武蔵小杉のタワーマンション開発による子育て世代の急増で、川崎市で<span class="highlight">最も入園が厳しいエリア</span>です。ランクA-6以上でないと厳しい園も多く、加点対策は必須です。</p>

<h3>高津区：穴場の可能性あり</h3>
<p>溝の口・武蔵溝ノ口エリアを中心に施設整備が進んでおり、中原区と比較すると入りやすい傾向があります。中原区との区境に住んでいる方は高津区の園も検討しましょう。</p>

<h3>宮前区：住宅街で需要が安定</h3>
<p>鷺沼・宮前平エリアを中心に子育て世帯が多い地域です。園の数も充実していますが、人気園は競争率が高めです。</p>

<h3>幸区：新川崎エリアの開発に注目</h3>
<p>新川崎・鹿島田エリアの開発で人口が増加傾向にあります。ただし中原区ほどの激戦にはなっていません。</p>

<h3>川崎区：比較的入りやすい</h3>
<p>川崎駅周辺は施設数が多く、他の区と比べて入りやすい傾向があります。</p>

<h3>多摩区・麻生区：北部エリア</h3>
<p>登戸・新百合ヶ丘エリアを擁する北部2区は、南部エリアと比べると競争は穏やかです。ただし人気園には偏りがあります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>川崎市では区を越えての申込も可能です。自宅から通えるのであれば隣の区の園も希望に入れることで内定の可能性が広がります。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>各区の利用調整結果（内定指数など）は<a href="https://www.city.kawasaki.jp/450/page/0000030624.html" target="_blank" rel="noopener">川崎市公式サイト「認可保育所等の受入可能数及び利用調整結果」</a>で公開されています。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 60,
  },

  // ========== 点数・選考 (5) ==========
  {
    slug: "rank-system-guide",
    citySlug: "kawasaki",
    title: "川崎市のランク制を徹底解説｜A〜Hランクの決まり方",
    description:
      "川崎市の保育園入園選考で使われるランク制（A〜H）のしくみを解説。ランクの決まり方、調整指数、調整項目の3段階選考をわかりやすくまとめました。",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>川崎市の選考は3段階</h2>
<p>川崎市の保育園入園選考は、他の自治体とは異なる独自のしくみです。以下の3段階で入園の優先順位が決まります。</p>

<div class="step">
<div class="step-num">1</div>
<div class="step-content"><strong>ランク（A〜H）で分類</strong><p>父母それぞれの就労状況などから個別のランクが決まり、低い方のランクが世帯のランクになります。</p></div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content"><strong>同ランク内で調整指数の合計を比較</strong><p>ひとり親や就労実績などの加点・減点で順位を決めます。</p></div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content"><strong>同ランク同指数の場合は調整項目で判定</strong><p>さらに同点の場合は、3人以上の子どもがいる世帯、所得が低い世帯の順に優先されます。</p></div>
</div>

<h2>ランクの決まり方</h2>
<p>ランクは保育を必要とする理由と、その程度によって決まります。就労の場合は<strong>月あたりの就労時間</strong>が基準です。</p>

<table>
<tr><th>ランク</th><th>就労の場合の基準</th></tr>
<tr><td>A</td><td>月140時間以上（週35時間以上）</td></tr>
<tr><td>B</td><td>月120時間以上140時間未満</td></tr>
<tr><td>C</td><td>月100時間以上120時間未満</td></tr>
<tr><td>D</td><td>月80時間以上100時間未満</td></tr>
<tr><td>E〜H</td><td>月80時間未満、求職中など</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>父母の<strong>低い方のランク</strong>が世帯のランクになります。一方がフルタイム（ランクA）でも、もう一方がパート（ランクD）なら世帯はランクDです。</p>
</div>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>ランクが違えば、調整指数がいくら高くても上位ランクの方が優先されます。まずはランクAを確保することが最重要です。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>ランク表の詳細は<a href="https://www.city.kawasaki.jp/templates/faq/450/0000012748.html" target="_blank" rel="noopener">川崎市公式サイト「認可保育所の入所選考の方法」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 65,
  },
  {
    slug: "a-minus-6-wall",
    citySlug: "kawasaki",
    title: "川崎市「A-6」の壁とは？フルタイム共働きでも落ちる理由",
    description:
      "川崎市の保活でよく聞く「A-6の壁」の意味と、フルタイム共働きでも不承諾になるケースを解説。A-6を超えるための加点戦略も紹介します。",
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>A-6とは何か</h2>
<p>「A-6」とは、ランクAで調整指数が6点という意味です。これは川崎市のフルタイム共働き世帯の<span class="highlight">標準的なライン</span>です。</p>

<h3>A-6の内訳例</h3>
<table>
<tr><th>項目</th><th>加点</th></tr>
<tr><td>就労実績1年以上（父）</td><td>+2</td></tr>
<tr><td>就労実績1年以上（母）</td><td>+2</td></tr>
<tr><td>育休明け復職</td><td>+2</td></tr>
<tr><td>合計</td><td>+6</td></tr>
</table>

<p>フルタイム共働きで就労実績が1年以上あり、育休明けで復職する場合の典型的なパターンです。</p>

<h2>なぜA-6でも落ちるのか</h2>
<p>中原区をはじめとする激戦区では、A-6の世帯が大量に申し込むため同ランク同指数の競合が発生します。その場合は「調整項目表（別表3）」で優先順位が決まり、さらに同点なら<span class="highlight">3人以上の子どもがいる世帯</span>、その次に<span class="highlight">所得が低い世帯</span>が優先されます。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>世帯年収が高い共働き家庭ほど、A-6同士の競合で不利になる可能性があります。</p>
</div>

<h2>A-6を超えるには？</h2>
<p>調整指数をさらに上積みする方法を検討しましょう。</p>
<ul>
<li>きょうだいが同一施設を希望 → <strong>+7</strong></li>
<li>ひとり親世帯 → <strong>+10</strong></li>
<li>認可外保育施設に預けて復職する → <strong>+2</strong></li>
<li>単身赴任 → <strong>+2</strong></li>
</ul>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>「育休明け復職」の加点と「認可外保育施設を利用中」の加点は重複して加算されない場合があります。認可外に預けて復職した場合は認可外利用の+2が適用され、育休明けの+2とは併用できない可能性があるため、必ず最新の利用案内または区役所窓口で確認してください。</p>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>最も現実的な加点対策は「認可外施設の利用」です。育休中に認可外に預けて復職し、認可保育園の4月入園を目指すパターンが増えています。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 95,
  },
  {
    slug: "chosei-shisu-checklist",
    citySlug: "kawasaki",
    title: "川崎市の調整指数チェックリスト｜加点・減点を漏れなく確認",
    description:
      "川崎市の保育園入園選考で使われる調整指数の主要項目をチェックリスト形式でまとめました。該当する加点を見落としていないか確認しましょう。",
    image:
      "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>調整指数の主な加点項目</h2>
<p>以下の項目に該当するか、1つずつ確認してみましょう。</p>

<table>
<tr><th>項目</th><th>加点</th><th>該当？</th></tr>
<tr><td>ひとり親世帯</td><td>+10</td><td></td></tr>
<tr><td>きょうだいが同一施設を希望</td><td>+7</td><td></td></tr>
<tr><td>生活保護世帯</td><td>+7</td><td></td></tr>
<tr><td>就労実績1年以上（父）</td><td>+2</td><td></td></tr>
<tr><td>就労実績1年以上（母）</td><td>+2</td><td></td></tr>
<tr><td>育休明け復職</td><td>+2</td><td></td></tr>
<tr><td>認可外保育施設を利用中</td><td>+2</td><td></td></tr>
<tr><td>単身赴任</td><td>+2</td><td></td></tr>
</table>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>「育休明け復職」と「認可外保育施設を利用中」の加点は重複して加算されない場合があります。詳細は最新の利用案内で必ず確認してください。</p>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>就労実績の加点は父母それぞれに適用されるため、両方が1年以上の実績があれば最大<strong>+4</strong>になります。</p>
</div>

<h2>主な減点項目</h2>
<table>
<tr><th>項目</th><th>減点</th></tr>
<tr><td>65歳未満の同居親族がいる（保育可能な状態）</td><td>-3</td></tr>
</table>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>祖父母と同居している場合、65歳未満で就労していない方がいると<strong>-3</strong>の減点になる可能性があります。ただし、祖父母自身が就労中・疾病・介護などの理由がある場合は減点されません。</p>
</div>

<h2>加点を確実に得るために</h2>
<ul>
<li>就労証明書に就労開始日が正しく記載されているか確認する</li>
<li>認可外施設利用の加点は在園証明書が必要</li>
<li>ひとり親は児童扶養手当証書等の写しが必要</li>
</ul>

<p>利用案内に記載されている調整指数表の全項目を確認し、該当するものは証明書類を漏れなく添付してください。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>調整指数表の全項目は、各区で配布される「利用案内」、または<a href="https://www.city.kawasaki.jp/450/page/0000153863.html" target="_blank" rel="noopener">川崎市公式サイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 100,
  },
  {
    slug: "tie-breaking-rules",
    citySlug: "kawasaki",
    title: "川崎市の同点時の優先順位｜ランクも指数も同じ場合どうなる？",
    description:
      "川崎市の保育園選考で同ランク・同指数になった場合の優先順位を解説。調整項目表、多子世帯優先、所得順の3段階の判定基準をまとめました。",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>同ランク同指数は珍しくない</h2>
<p>川崎市の激戦区では、同じランク・同じ調整指数の世帯が複数申し込むケースが頻繁に発生します。特にA-6は最も多い層です。では、その場合どうやって優先順位が決まるのでしょうか。</p>

<h2>3段階の判定基準</h2>

<div class="step">
<div class="step-num">1</div>
<div class="step-content"><strong>調整項目表（別表3）で判定</strong><p>世帯の状況を別表3の項目に照らし合わせ、項目点の合計が高い世帯が優先されます。きょうだいの在園状況や世帯構成などが考慮されます。</p></div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content"><strong>3人以上の子どもがいる世帯を優先</strong><p>調整項目表でも差がつかない場合、養育している子どもが3人以上の世帯が優先されます。</p></div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content"><strong>所得が低い世帯を優先</strong><p>さらに判定が困難な場合、世帯の所得が低い方が優先されます。</p></div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>最終的に所得で決まることがあるため、世帯年収が高い共働き家庭はA-6では不利になり得ます。加点対策で指数を1点でも上げることが重要です。</p>
</div>

<h2>調整項目表（別表3）の主な項目</h2>
<p>調整項目表には以下のような項目が含まれます。</p>
<ul>
<li>きょうだいが在園中または同時申込</li>
<li>保護者の就労形態（正社員・パートなど）</li>
<li>通勤時間の長さ</li>
<li>世帯の特別な事情</li>
</ul>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>調整項目表の詳細は年度によって変更される可能性があります。最新の利用案内で必ず確認してください。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>利用調整の仕組みは<a href="https://www.city.kawasaki.jp/templates/faq/450/0000012748.html" target="_blank" rel="noopener">川崎市公式サイト「入所選考の方法」</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 85,
  },
  {
    slug: "niji-boshu",
    citySlug: "kawasaki",
    title: "川崎市の二次利用調整ガイド｜一次で落ちた場合の対策",
    description:
      "川崎市の二次利用調整の申込方法・スケジュール・内定の可能性を解説。一次で不承諾になった場合にやるべきことをまとめました。",
    image:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>二次利用調整とは</h2>
<p>一次利用調整で内定辞退や空きが発生した園について、改めて選考を行うのが二次利用調整です。一次で不承諾だった方は<strong>自動的に二次の対象</strong>になります。</p>

<h3>令和8年度二次利用調整のスケジュール</h3>
<table>
<tr><th>項目</th><th>日程</th></tr>
<tr><td>申込期間</td><td>令和7年11月6日〜令和8年1月30日</td></tr>
<tr><td>結果通知</td><td>令和8年2月下旬</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>一次で不承諾だった方は再申込は不要です。ただし、希望園を変更・追加したい場合は二次の申込期間中に届出が必要です。</p>
</div>

<h2>二次で内定を得るためのポイント</h2>

<h3>1. 希望園を見直す</h3>
<p>一次で不承諾だった場合、二次では人気園を外して<span class="highlight">空きが出やすい園</span>を追加するのが効果的です。新設園や小規模保育施設は比較的空きが出やすい傾向があります。</p>

<h3>2. 一次の利用調整結果を確認する</h3>
<p>川崎市は各園の内定最低ランク・指数を公開しています。これを参考に、自分のランク・指数で内定可能な園を絞り込みましょう。</p>

<h3>3. 認可外も並行して探す</h3>
<p>二次でも不承諾の可能性があるため、川崎認定保育園などの認可外施設も並行して申込んでおくことをおすすめします。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>二次の枠は一次に比べて大幅に少ないです。二次をあてにせず、一次の段階で希望園を多めに書いておくのが鉄則です。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>利用調整結果は<a href="https://www.city.kawasaki.jp/450/page/0000030624.html" target="_blank" rel="noopener">川崎市公式サイト「認可保育所等の受入可能数及び利用調整結果」</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 80,
  },

  // ========== 認可外 (2) ==========
  {
    slug: "ninkagai-katen",
    citySlug: "kawasaki",
    title: "認可外保育施設で加点を得る方法｜川崎市の保活戦略",
    description:
      "川崎市の保活で認可外施設を利用して調整指数の加点を得る方法を解説。いつから預けるか、どんな施設が対象かをまとめました。",
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=400&fit=crop",
    category: "認可外",
    categoryColor: "purple",
    content: `<h2>認可外利用で+2の加点</h2>
<p>川崎市では、認可外保育施設に児童を預けて<strong>就労している</strong>場合、調整指数で<span class="highlight">+2</span>の加点が得られます。A-6の壁を突破するための現実的な戦略です。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>「育休明け復職」の加点（+2）と「認可外保育施設を利用中」の加点（+2）は重複して加算されない場合があります。認可外に預けて復職すると育休明けではなく認可外利用の加点が適用される可能性があるため、必ず最新の利用案内または区役所窓口で確認してください。</p>
</div>

<h2>加点を得るための条件</h2>
<ul>
<li>認可外保育施設に実際に児童を預けていること</li>
<li>保護者が就労していること（育休中ではなく復職済み）</li>
<li>在園証明書を提出すること</li>
</ul>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>加点の対象となる施設や条件は年度によって変更される可能性があります。必ず最新の利用案内で確認してください。</p>
</div>

<h2>具体的なスケジュール例</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content"><strong>4月〜6月：認可外施設を探す</strong><p>川崎認定保育園や企業主導型保育を中心に、空きのある施設を探します。</p></div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content"><strong>7月〜9月：認可外に入園・復職</strong><p>認可外施設に児童を預けて、育休を終了して復職します。</p></div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content"><strong>10月：認可保育園の4月入園を申込</strong><p>認可外施設の在園証明書を添付して申込みます。</p></div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content"><strong>翌4月：認可保育園に転園</strong><p>内定が出たら認可外を退園し、認可保育園に入園します。</p></div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>認可外施設の保育料は月5〜8万円程度かかりますが、4月入園の加点を得るための「投資」と考える保護者が増えています。川崎認定保育園なら補助金も利用できます。</p>
</div>

<h2>注意点</h2>
<ul>
<li>認可外施設にも定員があるため、早めに探し始める</li>
<li>育休を予定より早く切り上げる必要がある</li>
<li>職場の理解と協力が不可欠</li>
</ul>`,
    publishedAt: "2026-03-28",
    popularity: 75,
  },
  {
    slug: "ochita-sentakushi",
    citySlug: "kawasaki",
    title: "川崎市の保育園に落ちたら？不承諾後の選択肢まとめ",
    description:
      "川崎市の認可保育園に不承諾になった場合の選択肢を整理。二次調整、認可外、育休延長など次に取るべきアクションを解説します。",
    image:
      "https://images.unsplash.com/photo-1516534775068-ba3e7458af70?w=800&h=400&fit=crop",
    category: "認可外",
    categoryColor: "purple",
    content: `<h2>不承諾通知が届いたらまずやること</h2>
<p>一次利用調整で不承諾になると、1月下旬に通知が届きます。ショックを受けるのは当然ですが、まだ選択肢はあります。落ち着いて次のアクションを考えましょう。</p>

<h2>選択肢1：二次利用調整に期待する</h2>
<p>一次で不承諾の場合、自動的に二次利用調整の対象になります。希望園の変更・追加がある場合は1月30日までに届出を。ただし<span class="highlight">二次の枠は少ない</span>ため、過度な期待は禁物です。</p>

<h2>選択肢2：認可外保育施設に入園する</h2>
<p>川崎認定保育園や企業主導型保育に申し込みましょう。認可外であれば利用調整なしで直接申し込めます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>認可外に預けて復職すれば、翌年度の4月入園で「認可外利用」の加点（+2）が得られます。不承諾を次の保活につなげましょう。</p>
</div>

<h2>選択肢3：育休を延長する</h2>
<p>不承諾通知は育休延長の根拠書類になります。最長2歳まで育休を延長できます（育児休業給付金も延長可能）。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>育休延長を目的として、入園意思がないのに申込む行為は避けてください。川崎市では申込内容の確認を行う場合があります。</p>
</div>

<h2>選択肢4：途中入園（5月以降）を狙う</h2>
<p>4月以降も毎月利用調整が行われます。転居や退園で空きが出る場合があるため、入園希望月の前月10日頃までに申込みましょう。</p>

<h2>選択肢5：ベビーシッターを利用する</h2>
<p>復職のために一時的にベビーシッターを利用する方法もあります。内閣府のベビーシッター割引券が使える事業者もあります。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>認可外施設の空き情報は<a href="https://www.city.kawasaki.jp/450/page/0000031247.html" target="_blank" rel="noopener">川崎市公式サイト</a>で随時更新されています。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 80,
  },

  // ========== 育休・復職 (1) ==========
  {
    slug: "jitan-kinmu-tensuu",
    citySlug: "kawasaki",
    title: "時短勤務だと点数は下がる？川崎市のランクへの影響",
    description:
      "川崎市で時短勤務をした場合のランクへの影響を解説。月140時間のラインを下回らないための計算方法をまとめました。",
    image:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=400&fit=crop",
    category: "育休・復職",
    categoryColor: "teal",
    content: `<h2>時短勤務のランクへの影響</h2>
<p>川崎市のランクは<strong>月あたりの就労時間</strong>で決まります。ランクAは月140時間以上（週35時間以上）です。時短勤務にすると就労時間が減り、ランクが下がる可能性があります。</p>

<h2>時短勤務の就労時間を計算してみよう</h2>
<table>
<tr><th>勤務形態</th><th>月の就労時間（目安）</th><th>ランク</th></tr>
<tr><td>フルタイム（8時間×週5日）</td><td>約160時間</td><td>A</td></tr>
<tr><td>7時間×週5日</td><td>約140時間</td><td>A</td></tr>
<tr><td>6時間×週5日</td><td>約120時間</td><td>B</td></tr>
<tr><td>5時間×週5日</td><td>約100時間</td><td>C</td></tr>
</table>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>1日6時間の時短勤務だと月約120時間となり、ランクAからランクBに下がります。ランクが異なると調整指数に関係なく選考で不利になります。</p>
</div>

<h2>ランクAを維持するには</h2>
<p>ランクAの基準は月140時間以上です。これを維持するための方法を考えましょう。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>1日<strong>7時間×週5日</strong>で月140時間をギリギリ確保できます。育児短時間勤務の時間を1日7時間に設定できないか、勤務先に相談してみましょう。</p>
</div>

<h2>時短勤務の就労証明書の書き方</h2>
<p>就労証明書には「現在の勤務時間」を記載します。育休復帰後に時短勤務を予定している場合は、時短勤務後の予定時間を記載する必要があります。</p>
<ul>
<li>復職後の勤務時間が月140時間以上になるよう調整する</li>
<li>就労証明書の「勤務時間」欄が正しいか確認する</li>
<li>不明な場合は区役所の児童家庭課に事前相談する</li>
</ul>

<h2>入園後に時短にする場合</h2>
<p>入園の申込時点ではフルタイムで申請し、入園後に時短勤務に変更することは可能です。ただし変更届の提出が必要で、次回の利用調整に影響する可能性があります。</p>`,
    publishedAt: "2026-03-28",
    popularity: 90,
  },

  // ========== 最新情報 (1) ==========
  {
    slug: "rainen-henkouten",
    citySlug: "kawasaki",
    title: "川崎市の保育園制度｜来年度に向けてチェックすべき変更点",
    description:
      "川崎市の保育園入園制度で確認しておくべき変更点や注目ポイントをまとめました。利用案内の更新に合わせて情報を確認しましょう。",
    image:
      "https://images.unsplash.com/photo-1504711434969-e33886168d6c?w=800&h=400&fit=crop",
    category: "最新情報",
    categoryColor: "blue",
    content: `<h2>毎年チェックすべきポイント</h2>
<p>川崎市の保育園制度は毎年度微調整が行われます。利用案内が公開されたら（例年9月末）、以下のポイントを確認しましょう。</p>

<h3>1. 利用調整基準の変更</h3>
<p>ランク表や調整指数の項目・配点は年度によって変更されることがあります。前年度と同じとは限りません。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>利用案内の「利用調整基準表」は毎年必ず最新版を確認してください。前年度の情報をもとに保活すると、想定外の結果になる可能性があります。</p>
</div>

<h3>2. 新設園の情報</h3>
<p>新しく開設される保育園は、初年度に空きが出やすい傾向があります。各区の新設園情報は利用案内や区役所で確認できます。</p>

<h3>3. 申込方法の変更</h3>
<p>川崎市では近年オンライン申請が導入されています。申請方法や必要書類の変更がないか確認しましょう。</p>

<h3>4. 保育料の改定</h3>
<p>保育料の階層区分や金額が変更されることがあります。多子軽減の対象範囲の拡大など、有利な変更もあります。</p>

<h3>5. 無償化制度の拡充</h3>
<p>国や川崎市独自の無償化・補助金制度が拡充される場合があります。最新の情報を確認しましょう。</p>

<h2>情報収集のおすすめ方法</h2>
<ul>
<li><strong>川崎市公式サイト</strong>：最も正確な一次情報源</li>
<li><strong>各区役所児童家庭課</strong>：窓口や電話で個別相談も可能</li>
<li><strong>利用案内（冊子）</strong>：毎年9月末から配布。保活のバイブル</li>
<li><strong>保活セミナー・説明会</strong>：各区で開催されることがある</li>
</ul>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>インターネット上のブログや口コミは古い情報や不正確な情報が含まれている場合があります。最終的な判断は必ず公式情報で確認してください。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新の利用案内は<a href="https://www.city.kawasaki.jp/450/page/0000153863.html" target="_blank" rel="noopener">川崎市公式サイト「保育所等の申込み手続き」</a>で公開されます。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 70,
  },
];

registerArticles(articles);
