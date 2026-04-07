import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  // =========================================================================
  // 1. 保活スケジュール
  // =========================================================================
  {
    slug: "hokatsu-schedule",
    citySlug: "saitama",
    title: "さいたま市の保活スケジュール完全ガイド（令和8年度）",
    description:
      "さいたま市の認可保育園、令和8年度4月入園の申込時期・選考の流れ・結果通知のスケジュールをわかりやすくまとめました。",
    image:
      "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>令和8年度（2026年度）4月入園のスケジュール</h2>
<p>さいたま市の4月入園は<strong>一次利用調整</strong>と<strong>二次利用調整</strong>の2回に分かれています。早めのスケジュール把握が保活成功のカギです。</p>

<h3>一次利用調整</h3>
<table>
<tr><th>項目</th><th>日程</th></tr>
<tr><td>申込期間</td><td>令和7年10月17日（金）〜10月31日（金）17時</td></tr>
<tr><td>申込方法</td><td>電子申請・郵送・窓口（各区役所支援課）</td></tr>
<tr><td>結果通知</td><td>令和8年1月下旬〜2月上旬</td></tr>
</table>

<h3>二次利用調整</h3>
<table>
<tr><th>項目</th><th>日程</th></tr>
<tr><td>申込期間</td><td>令和8年2月19日（木）17時まで</td></tr>
<tr><td>結果通知</td><td>令和8年3月中旬</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>一次で不承諾の場合でも、希望変更届を出すことで二次利用調整の対象になります。</p>
</div>

<h2>いつから動き始めるべき？</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>4月〜6月：情報収集スタート</strong>
<p>「保育施設利用のてびき」は10月初旬配布ですが、前年度版をベースに調べ始めましょう。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>6月〜9月：保育園見学</strong>
<p>見学は電話予約制が基本。夏前に動くと選択肢が広がります。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>10月：てびき入手・書類準備</strong>
<p>就労証明書は勤務先に早めに依頼しましょう。</p>
</div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content">
<strong>10月中旬〜下旬：申込提出</strong>
<p>電子申請・郵送・窓口の3つの方法があります。</p>
</div>
</div>

<h2>途中入園（5月〜3月）の申込</h2>
<p>入園希望月の<span class="highlight">前月10日頃</span>が締切です。締切日が土日祝の場合は前倒しになるため、各区支援課で確認してください。</p>
<p>詳しくは<a href="https://www.city.saitama.lg.jp/003/001/015/001/p100639.html" target="_blank" rel="noopener">さいたま市公式サイト「保育施設利用の申込みについて」</a>をご確認ください。</p>`,
    publishedAt: "2026-03-28",
    popularity: 55,
  },

  // =========================================================================
  // 2. 入園点数のしくみ
  // =========================================================================
  {
    slug: "scoring-system-guide",
    citySlug: "saitama",
    title: "さいたま市の入園点数のしくみ、基本指数と調整指数をやさしく解説",
    description:
      "さいたま市の保育園入園選考で使われる「基本指数」と「調整指数」の仕組みを、初めての方にもわかるように解説します。",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>点数（指数）ってなに？</h2>
<p>さいたま市の保育園入園は「先着順」ではなく、「点数（利用調整指数）」の高い順に内定が決まります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>利用調整指数 ＝ 基本指数（父）＋ 基本指数（母）＋ 調整指数</p>
</div>

<h2>基本指数とは？</h2>
<p>父母それぞれの「保育が必要な理由」を点数化したものです。1人あたり最大<span class="highlight">26点</span>で、両親合計の最大は<span class="highlight">52点</span>。</p>
<p>最も多い「就労」の場合、月160時間以上で満点の26点になります。</p>

<table>
<tr><th>就労時間（月あたり）</th><th>基本指数</th></tr>
<tr><td>月160時間以上</td><td>26</td></tr>
<tr><td>月140〜160時間未満</td><td>24</td></tr>
<tr><td>月120〜140時間未満</td><td>22</td></tr>
<tr><td>月100〜120時間未満</td><td>20</td></tr>
<tr><td>月80〜100時間未満</td><td>18</td></tr>
<tr><td>月64〜80時間未満</td><td>17</td></tr>
</table>

<h2>調整指数とは？</h2>
<p>家庭の状況に応じた加点・減点です。主な加点項目は以下の通り。</p>
<table>
<tr><th>項目</th><th>加点</th></tr>
<tr><td>認可外保育施設に預けている</td><td>+7</td></tr>
<tr><td>育児休業中・産休中</td><td>+6</td></tr>
<tr><td>生活保護世帯</td><td>+5</td></tr>
<tr><td>単身赴任</td><td>+4</td></tr>
<tr><td>きょうだい同一園希望</td><td>+3</td></tr>
<tr><td>きょうだい在園（上記以外）</td><td>+2</td></tr>
</table>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>正確な基準表は<a href="https://www.city.saitama.lg.jp/003/001/015/001/p100639.html" target="_blank" rel="noopener">さいたま市「保育施設利用の申込みについて」</a>に掲載の「保育施設利用調整基準表」をご確認ください。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 65,
  },

  // =========================================================================
  // 3. 62点ボーダー
  // =========================================================================
  {
    slug: "62-point-border",
    citySlug: "saitama",
    title: "さいたま市の62点ボーダーとは？標準的な家庭の点数を計算",
    description:
      "さいたま市でよく言われる「62点ボーダー」の意味と、フルタイム共働き家庭の点数の内訳を具体的に解説します。",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>62点はどうやって計算される？</h2>
<p>さいたま市の保育園選考で「62点がボーダー」とよく言われます。この62点の内訳を見てみましょう。</p>

<table>
<tr><th>項目</th><th>点数</th></tr>
<tr><td>父：フルタイム就労（月160時間以上）</td><td>26点</td></tr>
<tr><td>母：フルタイム就労（月160時間以上）</td><td>26点</td></tr>
<tr><td>調整：育児休業中</td><td>+6点</td></tr>
<tr><td>調整：祖父母全員別居・不存在（4人分×各1点）</td><td>+4点</td></tr>
<tr><td colspan="2"><strong>合計：62点</strong></td></tr>
</table>

<p>つまり、<strong>フルタイム共働き＋育休中＋祖父母が全員別居</strong>という、よくある家庭の構成で62点になります。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>62点は入園できる最低ラインではなく、「同点の人が多い」ラインです。特に浦和区・南区・大宮区の1歳児クラスでは62点でも不承諾になるケースがあります。</p>
</div>

<h2>62点から差をつけるには？</h2>
<p>同点の場合、さいたま市では所得が低い世帯やひとり親世帯が優先されます。それ以外で加点を狙うなら以下が有効です。</p>

<table>
<tr><th>加点方法</th><th>追加点数</th></tr>
<tr><td>認可外保育施設に預ける</td><td>+7点（育休+6と同時適用不可。認可外の方が高い）</td></tr>
<tr><td>きょうだい同一園希望</td><td>+3点</td></tr>
<tr><td>きょうだいが認可園在園中</td><td>+2点</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>認可外に預けて復職すると育休+6が認可外+7に変わり、実質1点アップ。ただし認可外の費用負担も考慮が必要です。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 95,
  },

  // =========================================================================
  // 4. 加点戦略
  // =========================================================================
  {
    slug: "katten-strategy",
    citySlug: "saitama",
    title: "さいたま市で加点を増やす方法と注意点",
    description:
      "さいたま市の保育園選考で調整指数の加点を最大化する方法を解説。認可外利用やきょうだい加点の活用法をまとめました。",
    image:
      "https://images.unsplash.com/photo-1460518451285-97b6aa326961?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>調整指数で差がつく</h2>
<p>さいたま市の保育園選考では、基本指数が同じフルタイム共働き家庭が大半を占めます。差がつくのは<strong>調整指数</strong>です。</p>

<h2>主な加点項目と活用法</h2>

<h3>認可外保育施設に預けている：+7点</h3>
<p>最も大きな加点です。育休を切り上げて認可外に預け、復職してから認可に申し込む方法があります。ただし認可外の保育料は月5〜10万円程度かかるため、費用対効果を検討しましょう。</p>

<h3>育児休業中：+6点</h3>
<p>育休中に申し込む場合に加算されます。認可外に預けている場合は認可外加点（+7）が適用されるため、重複はしません。</p>

<h3>きょうだい加点：+2〜3点</h3>
<p>きょうだいが認可保育園に在園中なら+2点、さらにそのきょうだいと同じ園を第一希望にすると+3点です。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>加点を狙って無理に認可外に預けるかどうかは家庭ごとの判断です。費用面・通園の負担・お子さまの環境変化を総合的に考えましょう。</p>
</div>

<h3>その他の加点</h3>
<table>
<tr><th>項目</th><th>加点</th></tr>
<tr><td>生活保護世帯</td><td>+5</td></tr>
<tr><td>単身赴任</td><td>+4</td></tr>
<tr><td>祖父母が全員別居・不存在（4人分×各1点）</td><td>+4</td></tr>
<tr><td>自宅外にて保育中</td><td>+3</td></tr>
<tr><td>自宅にて保育中</td><td>+2</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>当サイトのシミュレーターを使えば、自分の加点を漏れなく確認できます。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 100,
  },

  // =========================================================================
  // 5. 激戦区（浦和・南・大宮）攻略
  // =========================================================================
  {
    slug: "激戦区-urawa-minami-omiya",
    citySlug: "saitama",
    title: "浦和区・南区・大宮区の保活事情、激戦区の攻略法",
    description:
      "さいたま市で特に競争が激しい浦和区・南区・大宮区の保活事情と、入園を勝ち取るための戦略を解説します。",
    image:
      "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>さいたま市の激戦区はどこ？</h2>
<p>さいたま市10区のうち、入園が難しいとされるのが<strong>浦和区・南区・大宮区</strong>です。令和7年度の一次利用調整では、南区の不承諾率が約26%、大宮区が約24%、浦和区が約24%と高い水準でした。</p>

<h2>各区の特徴</h2>

<h3>南区</h3>
<p>武蔵浦和・南浦和エリアの人気が高く、マンション開発も進んでいます。市立園の閉園予定が影響し、不承諾率が高止まりしています。</p>

<h3>浦和区</h3>
<p>浦和駅周辺は再開発が進行中。2026年10月には大規模マンション（525戸）の入居開始が予定されており、今後も競争が続く見込みです。</p>

<h3>大宮区</h3>
<p>ターミナル駅である大宮駅周辺は利便性が高く人気。不承諾率は改善傾向ですが、1歳児クラスは依然として厳しい状況です。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>激戦区では62点でも入れないケースがあります。認可外利用による加点（+7）や、隣接区の園も視野に入れた希望園の記入が有効です。</p>
</div>

<h2>激戦区での攻略法</h2>
<table>
<tr><th>戦略</th><th>内容</th></tr>
<tr><td>希望園を増やす</td><td>区をまたいで通える園も含め、できるだけ多く記入</td></tr>
<tr><td>0歳4月を狙う</td><td>1歳児クラスより0歳児クラスの方が入りやすい傾向</td></tr>
<tr><td>小規模保育も検討</td><td>0〜2歳対象。定員が少ないぶん倍率も低い場合あり</td></tr>
<tr><td>二次利用調整に備える</td><td>一次不承諾でも諦めず、希望変更届を提出</td></tr>
</table>`,
    publishedAt: "2026-03-28",
    popularity: 60,
  },

  // =========================================================================
  // 6. 時短勤務と点数
  // =========================================================================
  {
    slug: "jitan-scoring",
    citySlug: "saitama",
    title: "さいたま市、時短勤務だと点数はどうなる？",
    description:
      "さいたま市で育休後に時短勤務を予定している方向けに、点数への影響と対策をわかりやすく解説します。",
    image:
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=400&fit=crop",
    category: "育休・復職",
    categoryColor: "teal",
    content: `<h2>時短勤務だと基本指数が下がる？</h2>
<p>さいたま市の基本指数は「月あたりの就労時間」で決まります。時短勤務で就労時間が減ると、基本指数も連動して下がります。</p>

<table>
<tr><th>勤務形態の例</th><th>月の就労時間</th><th>基本指数</th></tr>
<tr><td>フルタイム（8時間 x 20日）</td><td>160時間</td><td>26点</td></tr>
<tr><td>時短6時間（6時間 x 20日）</td><td>120時間</td><td>22点</td></tr>
<tr><td>時短5時間（5時間 x 20日）</td><td>100時間</td><td>20点</td></tr>
</table>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>フルタイム26点と時短6時間22点の差は4点。両親とも時短なら8点の差になり、入園選考に大きく影響します。</p>
</div>

<h2>就労証明書はどう書く？</h2>
<p>就労証明書には<strong>復職後の勤務時間</strong>を記入します。育休中の申込では「復職後の予定勤務時間」を勤務先に記入してもらいます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>さいたま市では「就労証明書に記載された勤務時間」で基本指数が決まります。時短勤務を開始するタイミングによっては、就労証明書の記載内容が変わるため、勤務先の人事担当と事前に確認しましょう。</p>
</div>

<h2>時短でも有利にするには</h2>
<ul>
<li>就労証明書はフルタイムの契約内容で記入し、復職後に時短に変更する方法もあります（勤務先と要相談）</li>
<li>認可外利用の加点（+7）など調整指数で補う</li>
<li>希望園を多めに書いて選択肢を広げる</li>
</ul>`,
    publishedAt: "2026-03-28",
    popularity: 90,
  },

  // =========================================================================
  // 7. 小規模保育のメリデメ
  // =========================================================================
  {
    slug: "shokibo-hoiku",
    citySlug: "saitama",
    title: "さいたま市の小規模保育事業とは？メリットと注意点",
    description:
      "さいたま市の小規模保育事業の特徴やメリット、3歳の壁への対策をわかりやすく解説します。",
    image:
      "https://images.unsplash.com/photo-1577896852618-01da1dd79f7e?w=800&h=400&fit=crop",
    category: "保育園選び",
    categoryColor: "rose",
    content: `<h2>小規模保育事業とは</h2>
<p>小規模保育事業は、<strong>0〜2歳児</strong>を対象とした定員6〜19名の保育施設です。さいたま市内に多数設置されており、認可保育所と同じ利用調整（選考）で入園します。</p>

<h2>小規模保育のメリット</h2>
<table>
<tr><th>メリット</th><th>内容</th></tr>
<tr><td>少人数</td><td>1人ひとりに目が行き届きやすい</td></tr>
<tr><td>入りやすい</td><td>認可保育所より空きがある場合が多い</td></tr>
<tr><td>家庭的な雰囲気</td><td>マンションの一室等を利用し、アットホームな環境</td></tr>
<tr><td>駅近が多い</td><td>ビルのテナント等に設置され、通勤途中に預けやすい</td></tr>
</table>

<h2>「3歳の壁」に注意</h2>
<p>小規模保育は2歳児クラスまでのため、3歳になると<strong>転園</strong>が必要です。これを「3歳の壁」と呼びます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>さいたま市では小規模保育の卒園児に対して、連携先の認可保育所への優先入園枠を設けている場合があります。入園前に連携先の園を確認しましょう。</p>
</div>

<h2>小規模保育の選び方</h2>
<ul>
<li>連携先の園はどこか、希望する園と合っているか</li>
<li>園庭がない場合、近くの公園はあるか</li>
<li>給食は自園調理か外部搬入か</li>
<li>保育士の配置基準を上回っているか</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>小規模保育の施設一覧は「保育施設利用のてびき」や<a href="https://www.city.saitama.lg.jp/003/001/015/001/p003019.html" target="_blank" rel="noopener">さいたま市公式サイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 50,
  },

  // =========================================================================
  // 8. 0歳vs1歳入園
  // =========================================================================
  {
    slug: "0sai-vs-1sai",
    citySlug: "saitama",
    title: "さいたま市、0歳入園と1歳入園どちらが有利？",
    description:
      "さいたま市の保育園は0歳入園と1歳入園、どちらが入りやすい？メリット・デメリットを比較して解説します。",
    image:
      "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=800&h=400&fit=crop",
    category: "保育園選び",
    categoryColor: "rose",
    content: `<h2>0歳入園と1歳入園の比較</h2>
<p>さいたま市では、0歳児クラス（4月1日時点で0歳）と1歳児クラスのどちらで入園するかで競争率が大きく異なります。</p>

<table>
<tr><th></th><th>0歳児クラス</th><th>1歳児クラス</th></tr>
<tr><td>定員</td><td>6〜12名程度</td><td>新規枠は数名（持ち上がりが多い）</td></tr>
<tr><td>競争率</td><td>比較的入りやすい</td><td>最も厳しい</td></tr>
<tr><td>育休</td><td>早めに切り上げ必要</td><td>1年間取得可能</td></tr>
<tr><td>育休給付金</td><td>受給期間が短くなる</td><td>フルに受給できる</td></tr>
</table>

<h2>0歳入園のメリット・デメリット</h2>
<p><strong>メリット：</strong>入園しやすい、早期に復職でキャリアへの影響が小さい</p>
<p><strong>デメリット：</strong>育休給付金の受給期間が短い、生後数か月での通園は体力的に大変</p>

<h2>1歳入園のメリット・デメリット</h2>
<p><strong>メリット：</strong>育休を1年間取れる、子どもとの時間を長く持てる</p>
<p><strong>デメリット：</strong>1歳児クラスは最激戦。62点では不承諾になるリスクが高い</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>浦和区・南区・大宮区の1歳児クラスは特に厳しいため、0歳4月入園を検討する価値があります。0歳入園の場合、認可外加点（+7）は使えないため、62点で勝負するケースが多くなります。</p>
</div>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>0歳児クラスに入園する場合、入園した月の翌月末までに復職する必要があります。産後の体調と相談して決めましょう。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 50,
  },

  // =========================================================================
  // 9. 認可外利用で+7点の加点戦略
  // =========================================================================
  {
    slug: "ninkagai-katen-strategy",
    citySlug: "saitama",
    title: "認可外加点（+7点）で認可を狙う戦略と注意点",
    description:
      "さいたま市で認可外保育施設の利用による加点+7を活用して認可保育園に入る戦略と、知っておくべき注意点を解説します。",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>認可外加点を使う戦略とは</h2>
<p>さいたま市では、認可外保育施設に子どもを預けている場合に調整指数で<span class="highlight">+7点</span>が加算されます。育休中の+6点より1点高いため、以下のような戦略をとる家庭があります。</p>

<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>育休を切り上げて認可外に入園</strong>
<p>申込締切の数か月前に認可外に入園し、復職します。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>認可外に預けた状態で認可に申込</strong>
<p>「認可外保育施設に預けている」として+7の加点を得ます。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>認可に内定したら認可外を退園</strong>
<p>4月から認可保育園に転園します。</p>
</div>
</div>

<h2>費用シミュレーション</h2>
<p>認可外に3か月預けた場合の追加費用を試算します。</p>
<table>
<tr><th>項目</th><th>金額</th></tr>
<tr><td>認可外の保育料（月7万円 x 3か月）</td><td>210,000円</td></tr>
<tr><td>入園金（施設による）</td><td>30,000〜50,000円</td></tr>
<tr><td>合計</td><td>約240,000〜260,000円</td></tr>
</table>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>認可外加点を得ても、激戦区の1歳児クラスでは入れない場合があります。また、育休を切り上げると育児休業給付金が止まるため、収支をしっかり計算しましょう。</p>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>認可外に預けると0〜2歳・非課税世帯なら月42,000円、3〜5歳なら月37,000円の無償化補助を受けられる場合があります。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 75,
  },

  // =========================================================================
  // 10. 来年度の変更点
  // =========================================================================
  {
    slug: "latest-trends-2026",
    citySlug: "saitama",
    title: "さいたま市の保育園事情、2026年度の最新動向",
    description:
      "さいたま市の2026年度保育園入園に関する最新動向。新設園情報や待機児童の状況をまとめました。",
    image:
      "https://images.unsplash.com/photo-1504711434969-e33886168d5c?w=800&h=400&fit=crop",
    category: "最新情報",
    categoryColor: "blue",
    content: `<h2>2026年度の全体傾向</h2>
<p>さいたま市は保育園の新設ラッシュが続いており、全体的な待機児童数は減少傾向にあります。しかし、エリアや年齢によっては依然として入園が難しい状況が続いています。</p>

<h2>区ごとの動向</h2>
<table>
<tr><th>区</th><th>状況</th></tr>
<tr><td>南区</td><td>不承諾率約26%と高止まり。市立園3園の閉園予定が影響。南浦和・武蔵浦和周辺に新規園開園</td></tr>
<tr><td>浦和区</td><td>不承諾率は改善（約24%）。浦和駅前再開発で2026年10月に大規模マンション入居開始予定</td></tr>
<tr><td>大宮区</td><td>不承諾率が改善（約24%）。西大宮南口への新園開園に期待</td></tr>
</table>

<h2>注目のポイント</h2>
<h3>市立園の閉園</h3>
<p>南区を中心に市立園の閉園が予定されています。閉園予定の園を希望する場合は、在園中に閉園にならないかスケジュールを確認してください。</p>

<h3>幼稚園の認定こども園移行</h3>
<p>幼稚園が認定こども園に移行するケースも増えており、保育所部分の定員増加につながっています。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>最新の空き状況や新設園情報は、各区支援課の窓口で確認できます。公式サイトも定期的にチェックしましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新の利用調整結果は<a href="https://www.city.saitama.lg.jp/003/001/015/001/p100639.html" target="_blank" rel="noopener">さいたま市公式サイト</a>で公開されています。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 70,
  },
  // =========================================================================
  // 11. 園えらび：保育園見学ガイド
  // =========================================================================
  {
    slug: "nursery-visit-guide",
    citySlug: "saitama",
    title: "さいたま市の保育園見学ガイド　チェックリストと質問例",
    description:
      "さいたま市で保育園見学をする際の予約方法・見るべきポイント・先生への質問例をまとめました。園えらびで後悔しないために。",
    image:
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=400&fit=crop",
    category: "園えらび",
    categoryColor: "purple",
    content: `<h2>保育園見学はいつから始める？</h2>
<p>さいたま市の4月入園申込は10月中旬開始です。見学は<span class="highlight">6月〜9月</span>に集中して行うのがおすすめ。人気園は見学枠が埋まりやすいため、早めの予約が大切です。</p>

<h2>見学の予約方法</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>電話で予約</strong>
<p>園に直接電話して見学希望日を伝えます。「見学したい」と言えばOKです。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>見学日は平日午前が基本</strong>
<p>子どもたちの活動を見られる10時〜11時がベスト。園庭遊びや給食前の様子を確認できます。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>複数園を比較する</strong>
<p>最低3園は見学しましょう。さいたま市は10区あり園の数も多いため、区をまたいだ比較もおすすめです。</p>
</div>
</div>

<h2>見学時のチェックリスト</h2>
<table>
<tr><th>項目</th><th>チェックポイント</th></tr>
<tr><td>安全面</td><td>柵・施錠・プール監視体制</td></tr>
<tr><td>衛生面</td><td>トイレ・おむつ交換台・手洗い場の清潔さ</td></tr>
<tr><td>保育士の様子</td><td>子どもへの声かけが穏やかか、笑顔があるか</td></tr>
<tr><td>園庭</td><td>広さ・遊具の種類。園庭なしなら散歩先の公園を確認</td></tr>
<tr><td>給食</td><td>自園調理か外注か、アレルギー対応の有無</td></tr>
<tr><td>持ち物</td><td>布おむつか紙おむつか、布団持参の有無</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>浦和区・南区・大宮区の人気園は見学予約が集中します。妊娠中から動き始めると安心です。</p>
</div>

<h2>先生に聞くべき質問</h2>
<ul>
<li>慣らし保育の期間はどのくらいですか？</li>
<li>発熱時のお迎え基準は何度ですか？</li>
<li>延長保育は何時まで対応していますか？</li>
<li>保護者参加の行事はどのくらいありますか？</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>さいたま市の保育園一覧は<a href="https://www.city.saitama.lg.jp/003/001/015/001/p003019.html" target="_blank" rel="noopener">さいたま市子ども未来局の公式サイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 45,
  },
  // =========================================================================
  // 12. データ分析：0歳vs1歳
  // =========================================================================
  {
    slug: "zero-vs-one-year",
    citySlug: "saitama",
    title: "さいたま市、0歳入園と1歳入園を数字で比較分析",
    description:
      "さいたま市の0歳児クラスと1歳児クラスの受入枠・競争率・育休給付金への影響をデータで比較します。",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop",
    category: "データ分析",
    categoryColor: "teal",
    content: `<h2>0歳入園と1歳入園の数字を比較</h2>
<p>さいたま市では1歳児クラスの競争が最も激しくなっています。既存記事「0歳入園と1歳入園どちらが有利？」をさらに深掘りし、区別のデータを分析します。</p>

<h2>区別の入りやすさ比較</h2>
<table>
<tr><th>区</th><th>0歳児クラス</th><th>1歳児クラス</th></tr>
<tr><td>浦和区</td><td>やや厳しい</td><td>最激戦</td></tr>
<tr><td>南区</td><td>やや厳しい</td><td>最激戦</td></tr>
<tr><td>大宮区</td><td>標準</td><td>激戦</td></tr>
<tr><td>中央区</td><td>比較的入りやすい</td><td>やや厳しい</td></tr>
<tr><td>見沼区</td><td>入りやすい</td><td>標準</td></tr>
<tr><td>岩槻区</td><td>入りやすい</td><td>比較的入りやすい</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>0歳児クラスは定員枠がまるごと新規募集になるため、1歳児クラス（持ち上がりで枠が減る）より入りやすい傾向が全区共通です。</p>
</div>

<h2>育休給付金への影響</h2>
<table>
<tr><th>項目</th><th>0歳4月入園</th><th>1歳4月入園</th></tr>
<tr><td>育休期間の目安</td><td>産後約6〜10か月</td><td>約1年〜1年半</td></tr>
<tr><td>給付金の差額</td><td colspan="2">月額約15〜20万円 x 差分月数</td></tr>
<tr><td>認可外加点</td><td>使いにくい（月齢が低い）</td><td>活用可能（+7点）</td></tr>
</table>

<h2>データから見る最適戦略</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>激戦区（浦和・南・大宮）なら0歳4月を最優先</strong>
<p>1歳児クラスは62点でも不承諾のリスクがあります。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>それ以外の区なら1歳4月でも十分可能</strong>
<p>見沼区・岩槻区・桜区などは1歳児クラスでも空きが出やすい傾向です。</p>
</div>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>各園の年齢別空き状況は<a href="https://www.city.saitama.lg.jp/003/001/015/001/p003019.html" target="_blank" rel="noopener">さいたま市公式サイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 65,
  },
  // =========================================================================
  // 13. 制度を知る：ひとり親ガイド
  // =========================================================================
  {
    slug: "single-parent-guide",
    citySlug: "saitama",
    title: "さいたま市のひとり親家庭向け保活ガイド　優先制度と支援策",
    description:
      "さいたま市でひとり親世帯が保育園入園で優遇される仕組みと、利用できる支援制度をまとめました。",
    image:
      "https://images.unsplash.com/photo-1531983412531-1f49a365ffed?w=800&h=400&fit=crop",
    category: "制度を知る",
    categoryColor: "rose",
    content: `<h2>ひとり親世帯は入園選考で優先される</h2>
<p>さいたま市の入園選考では、ひとり親世帯に対して調整指数で<strong>加点</strong>があります。また同点の場合はひとり親世帯が優先されるルールになっています。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>ひとり親の加点を受けるには、申込時に「ひとり親であること」を証明する書類（児童扶養手当証書のコピー・戸籍謄本など）を提出する必要があります。</p>
</div>

<h2>利用できる支援制度</h2>
<table>
<tr><th>制度</th><th>内容</th></tr>
<tr><td>保育料の軽減</td><td>市民税非課税世帯は保育料無料。課税世帯も階層に応じて軽減</td></tr>
<tr><td>児童扶養手当</td><td>月額最大45,500円（令和7年度）。所得に応じて支給</td></tr>
<tr><td>ひとり親家庭等医療費助成</td><td>医療費の自己負担が軽減される</td></tr>
<tr><td>母子父子寡婦福祉資金</td><td>就学・就職・転宅等の資金貸付制度</td></tr>
<tr><td>JR通勤定期の割引</td><td>児童扶養手当受給世帯は3割引</td></tr>
</table>

<h2>申込時の注意点</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>証明書類を早めに準備</strong>
<p>児童扶養手当証書・戸籍謄本など、ひとり親であることを証明する書類が必要です。発行に時間がかかる場合があるため、余裕をもって準備しましょう。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>就労証明書はフルタイムで</strong>
<p>基本指数は就労時間で決まります。可能であればフルタイム（月160時間以上）の就労証明書を提出しましょう。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>各区支援課で相談</strong>
<p>ひとり親世帯向けの加点や優先措置について、お住まいの区の支援課で個別に相談できます。</p>
</div>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>ひとり親家庭向けの支援制度は<a href="https://www.city.saitama.lg.jp/003/001/015/" target="_blank" rel="noopener">さいたま市子ども未来局</a>のサイトで確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 50,
  },
  // =========================================================================
  // 14. 保活の基本：育休タイミング
  // =========================================================================
  {
    slug: "ikukyu-timing",
    citySlug: "saitama",
    title: "さいたま市で育休中に保活、復帰タイミングはいつがベスト？",
    description:
      "さいたま市で育休中に保活をする際の復帰タイミングと点数への影響を解説。育休延長のリスクも合わせてお伝えします。",
    image:
      "https://images.unsplash.com/photo-1493894473891-10fc1e5dbd22?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>育休中の申込と復帰タイミング</h2>
<p>さいたま市では育休中に保育園を申し込む方が多数います。育休中の申込では調整指数で<strong>+6点</strong>が加算されます。</p>

<h2>復帰タイミングの選択肢</h2>
<table>
<tr><th>パターン</th><th>メリット</th><th>デメリット</th></tr>
<tr><td>0歳4月で復帰</td><td>入園しやすい。キャリアへの影響が小さい</td><td>育休給付金が短い。体力的に大変</td></tr>
<tr><td>1歳4月で復帰</td><td>育休を1年取れる。給付金フル受給</td><td>1歳児クラスは最激戦</td></tr>
<tr><td>認可外経由で1歳4月</td><td>+7点の加点（育休+6より1点高い）</td><td>認可外の費用負担あり</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>さいたま市では入園月の翌月15日までに復職することが条件です。4月入園なら5月15日までに復帰する必要があります。</p>
</div>

<h2>育休延長の注意点</h2>
<p>1歳で入園できなかった場合、育休を延長できます。しかし令和7年度から全国的に<strong>育休延長の審査が厳格化</strong>されています。</p>

<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>「落選狙い」は危険</strong>
<p>わざと競争率の高い園だけ希望して不承諾通知を得る手法は、制度改正で通用しにくくなっています。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>入園意思の確認が強化</strong>
<p>自治体が「本当に入園する意思があるか」を確認するケースが増えています。さいたま市でも慎重に対応しましょう。</p>
</div>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>復職期限等の詳細は<a href="https://www.city.saitama.lg.jp/003/001/015/001/p100639.html" target="_blank" rel="noopener">さいたま市「保育施設利用の申込みについて」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 55,
  },
  // =========================================================================
  // 15. 園えらび：認可外選び
  // =========================================================================
  {
    slug: "ninkagai-selection",
    citySlug: "saitama",
    title: "さいたま市の認可外保育施設の選び方ガイド",
    description:
      "さいたま市で認可外保育施設を検討する方向けに、施設の種類・費用の目安・選ぶ際のチェックポイントを解説します。",
    image:
      "https://images.unsplash.com/photo-1576495199011-eb94736d05d6?w=800&h=400&fit=crop",
    category: "園えらび",
    categoryColor: "purple",
    content: `<h2>さいたま市の認可外保育施設とは</h2>
<p>認可外保育施設は、認可保育所の基準を満たしていないものの、さいたま市に届出をして運営されている保育施設です。認可園に入れなかった場合の受け皿として、また<strong>認可園申込時の加点（+7点）</strong>を得るために利用されることがあります。</p>

<h2>認可外施設の種類</h2>
<table>
<tr><th>種類</th><th>特徴</th></tr>
<tr><td>企業主導型保育</td><td>企業が設置。従業員枠と地域枠がある</td></tr>
<tr><td>認可外保育室</td><td>小規模で家庭的な雰囲気。0〜2歳が多い</td></tr>
<tr><td>ベビーホテル</td><td>夜間・休日対応。一時利用も可能</td></tr>
<tr><td>院内保育所</td><td>病院等の職員向け。地域枠があれば利用可能</td></tr>
</table>

<h2>費用の目安</h2>
<p>さいたま市内の認可外保育施設の保育料は<span class="highlight">月額5万〜10万円</span>程度が一般的です。入園金が別途2万〜5万円かかる施設もあります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>0〜2歳の非課税世帯は月額42,000円まで、3〜5歳は月額37,000円まで無償化の対象になる場合があります。認可外でも届出施設であれば対象です。</p>
</div>

<h2>選ぶ際のチェックリスト</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>さいたま市への届出があるか</strong>
<p>届出施設一覧はさいたま市子ども未来局の公式サイトで確認できます。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>立入調査の結果を確認</strong>
<p>さいたま市は年1回、認可外施設への立入調査を実施しています。結果は公開されています。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>保育士の配置と資格</strong>
<p>有資格者の割合が高いほど安心です。見学時に聞いてみましょう。</p>
</div>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>認可外施設一覧は<a href="https://www.city.saitama.lg.jp/003/001/015/" target="_blank" rel="noopener">さいたま市子ども未来局</a>のサイトで確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 40,
  },
  // =========================================================================
  // 16. 制度を知る：双子の保活
  // =========================================================================
  {
    slug: "futago-hokatsu",
    citySlug: "saitama",
    title: "さいたま市で双子・多胎児の保活、知っておきたい制度と戦略",
    description:
      "さいたま市で双子や三つ子を保育園に入れる際の加点制度や同時入園の配慮措置、多胎児ならではの注意点を解説します。",
    image:
      "https://images.unsplash.com/photo-1609220136736-443140cffec6?w=800&h=400&fit=crop",
    category: "制度を知る",
    categoryColor: "rose",
    content: `<h2>双子・多胎児の保活は2倍の大変さ</h2>
<p>双子や三つ子の場合、「2人とも同じ園に入れたい」という希望が強い一方で、空き枠が2名以上ある園は限られます。さいたま市の制度を正しく理解して戦略を立てましょう。</p>

<h2>さいたま市の多胎児向け配慮</h2>
<table>
<tr><th>項目</th><th>内容</th></tr>
<tr><td>きょうだい同一園希望</td><td>同じ園を希望する場合、+3点の加点</td></tr>
<tr><td>同時申込</td><td>双子を同時に申し込む場合、同一園への入園が配慮される</td></tr>
<tr><td>保育料の軽減</td><td>同時在園の場合、2人目は半額、3人目以降は無料</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>双子は2人とも新規入園のため、きょうだい在園の加点（+2点）は使えません。ただし同一園希望の+3点は利用可能です。必ず同じ園を第1希望に書きましょう。</p>
</div>

<h2>双子の保活を成功させるコツ</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>定員の大きい園を中心に希望</strong>
<p>2名以上の空きが出やすい大規模園を優先的に希望園に入れましょう。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>0歳4月入園を検討</strong>
<p>0歳児クラスは定員枠が大きいため、2名同時に入園できる可能性が高まります。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>「別々の園でもOK」の覚悟も</strong>
<p>同じ園に入れなかった場合の送迎ルートをシミュレーションしておきましょう。</p>
</div>
</div>

<h2>保育料の軽減は大きなメリット</h2>
<p>双子が同時に在園する場合、2人目の保育料は半額になります。月額3万円の保育料なら年間で<span class="highlight">約18万円</span>の軽減効果があります。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>多胎児への配慮措置については、各区の支援課窓口で直接お問い合わせください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 35,
  },
  // =========================================================================
  // 17. 保活の基本：先輩ママインタビュー
  // =========================================================================
  {
    slug: "hoiku-mama-interview",
    citySlug: "saitama",
    title: "さいたま市の保活体験談　先輩ママに聞く成功と失敗のリアル",
    description:
      "さいたま市で保活を経験した先輩ママの声を集めました。成功パターンと失敗パターンから学ぶ保活のリアルをお伝えします。",
    image:
      "https://images.unsplash.com/photo-1491013516836-7db643ee125a?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>先輩ママの保活体験を紹介</h2>
<p>さいたま市で実際に保活を経験した先輩ママの声をもとに、成功パターンと失敗パターンをまとめました。（個人が特定されないよう内容を一部編集しています）</p>

<h2>成功パターン</h2>
<h3>Aさん（南区・1歳4月入園・69点）</h3>
<div class="point-box">
<p><strong>認可外経由で+7点を確保</strong></p>
<p>南区は最激戦と聞き、生後6か月で認可外に入園。復職して認可外加点+7を得て69点に。第3希望の園に内定。「費用はかかったけど、認可外での経験も子どもにとって良かった」と振り返ります。</p>
</div>

<h3>Bさん（見沼区・1歳4月入園・62点）</h3>
<div class="point-box">
<p><strong>激戦区を避けて62点で内定</strong></p>
<p>実家に近い見沼区を選んだことで、62点（フルタイム共働き＋育休+6）で第1希望に内定。「区によって全然違うと実感しました」。</p>
</div>

<h2>失敗パターン</h2>
<h3>Cさん（浦和区・1歳4月入園・62点）</h3>
<div class="info-box">
<p><strong>62点で浦和区は不承諾</strong></p>
<p>フルタイム共働き＋育休+6の62点で浦和区の人気園5つに申込。一次で全滅。二次で空きが出た園に入れたものの、自宅から遠く毎日の送迎が大変だったそうです。</p>
</div>

<h3>Dさん（大宮区・1歳4月入園・62点）</h3>
<div class="info-box">
<p><strong>希望園を3つしか書かず保留に</strong></p>
<p>「この園以外は考えられない」と希望を3園に絞った結果、一次で保留。「もっと多く書いておけばよかった」と後悔しています。</p>
</div>

<h2>体験談から学ぶポイント</h2>
<ul>
<li>激戦区（浦和・南・大宮）は62点では足りない可能性がある</li>
<li>希望園はできるだけ多く書く（最低5園以上）</li>
<li>区選びも戦略のひとつ。隣接区の園も視野に入れる</li>
<li>認可外経由の加点は費用と効果を計算して判断する</li>
</ul>`,
    publishedAt: "2026-04-07",
    popularity: 60,
  },
  // =========================================================================
  // 18. データ分析：待機児童データ
  // =========================================================================
  {
    slug: "waiting-child-data",
    citySlug: "saitama",
    title: "さいたま市の待機児童データ分析　区別の実態を読み解く",
    description:
      "さいたま市10区の待機児童・保留児童の実態をデータで分析。区ごとの入りやすさの違いを解説します。",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop",
    category: "データ分析",
    categoryColor: "teal",
    content: `<h2>さいたま市の待機児童は減少傾向</h2>
<p>さいたま市の待機児童数は年々減少しています。しかし「希望する園に入れなかった」保留児童は依然として一定数存在します。</p>

<h2>区別の不承諾率（令和7年度一次）</h2>
<table>
<tr><th>区</th><th>不承諾率</th><th>傾向</th></tr>
<tr><td>南区</td><td>約26%</td><td>市内最高。武蔵浦和・南浦和が特に厳しい</td></tr>
<tr><td>浦和区</td><td>約24%</td><td>再開発で需要増加中</td></tr>
<tr><td>大宮区</td><td>約24%</td><td>改善傾向だが1歳は厳しい</td></tr>
<tr><td>中央区</td><td>約18%</td><td>さいたま新都心周辺で需要あり</td></tr>
<tr><td>北区</td><td>約15%</td><td>宮原周辺でやや混む</td></tr>
<tr><td>見沼区</td><td>約12%</td><td>比較的入りやすい</td></tr>
<tr><td>桜区</td><td>約10%</td><td>入りやすい</td></tr>
<tr><td>緑区</td><td>約14%</td><td>浦和美園で需要増</td></tr>
<tr><td>西区</td><td>約8%</td><td>最も入りやすい</td></tr>
<tr><td>岩槻区</td><td>約9%</td><td>入りやすい</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>不承諾率が10%未満の区なら、62点で十分に入園できる可能性が高いです。激戦区でも認可外加点（+7）を使えば安全圏に入れます。</p>
</div>

<h2>年齢別の傾向</h2>
<p>全区共通で<span class="highlight">1歳児クラス</span>の競争が最も激しくなっています。0歳児クラスは比較的空きがあり、3歳以上は幼稚園への流出もあって入りやすくなります。</p>

<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>データの見方</strong>
<p>不承諾率は「申込者数に対する不承諾者数の割合」です。人気園だけに申し込んだ人も含まれるため、希望園を増やせば実際の入園確率は上がります。</p>
</div>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新の利用調整結果は<a href="https://www.city.saitama.lg.jp/003/001/015/001/p100639.html" target="_blank" rel="noopener">さいたま市公式サイト</a>で公開されています。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 55,
  },
  // =========================================================================
  // 19. 園えらび：小規模保育ガイド
  // =========================================================================
  {
    slug: "small-nursery-guide",
    citySlug: "saitama",
    title: "さいたま市の小規模保育をもっと知る　連携園と3歳の壁",
    description:
      "さいたま市の小規模保育事業について、連携園の仕組み・3歳の壁への具体的な対策・選ぶ際の注意点を深掘り解説します。",
    image:
      "https://images.unsplash.com/photo-1577896852618-01da1dd79f7e?w=800&h=400&fit=crop",
    category: "園えらび",
    categoryColor: "purple",
    content: `<h2>小規模保育の「その先」を考える</h2>
<p>さいたま市の小規模保育事業は0〜2歳児対象です。入園のしやすさがメリットですが、3歳以降の行き先を事前に確認しておくことが重要です。</p>

<h2>連携園の仕組み</h2>
<p>さいたま市では多くの小規模保育事業所に<strong>連携先の認可保育所</strong>が設定されています。卒園時に連携先の園に優先的に入園できる枠があります。</p>

<table>
<tr><th>項目</th><th>内容</th></tr>
<tr><td>連携園の数</td><td>1園〜複数園が設定されている</td></tr>
<tr><td>優先枠</td><td>連携先の3歳児クラスに優先入園枠がある</td></tr>
<tr><td>注意点</td><td>連携園の定員に空きがない場合もある</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>入園前に「連携先はどこか」「過去に連携先に入れなかったケースはあるか」を園に直接聞いておきましょう。</p>
</div>

<h2>3歳の壁を乗り越える選択肢</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>連携先の認可園に進む</strong>
<p>最もスムーズな方法。連携園が希望に合うか入園前に見学しておくのがおすすめです。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>認定こども園の保育所部分へ</strong>
<p>幼稚園から移行した認定こども園は3歳からの受入枠が大きい場合があります。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>きょうだい加点を活用</strong>
<p>小規模保育に在園中でも、きょうだいの認可園申込時に+2〜3点の加点が付きます。</p>
</div>
</div>

<h2>小規模保育の注意点</h2>
<ul>
<li>園庭がない施設が多い。近くに公園があるか確認</li>
<li>給食は自園調理か外部搬入か</li>
<li>保育士の配置基準（有資格者の割合）</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>小規模保育の施設一覧と連携園情報は<a href="https://www.city.saitama.lg.jp/003/001/015/001/p003019.html" target="_blank" rel="noopener">さいたま市公式サイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 50,
  },
  // =========================================================================
  // 20. 点数アップ：2人目の保活
  // =========================================================================
  {
    slug: "secondchild-hokatsu",
    citySlug: "saitama",
    title: "さいたま市で2人目の保活、きょうだい加点を最大活用する方法",
    description:
      "さいたま市の保育園入園でのきょうだい加点（+2〜3点）を最大限に活かすための戦略と注意点を解説します。",
    image:
      "https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>2人目の保活はきょうだい加点が武器</h2>
<p>さいたま市では、上の子が認可保育園に在園中の場合に<strong>きょうだい加点</strong>が付きます。62点のボーダーラインを超える大きな武器になります。</p>

<h2>きょうだい加点の仕組み</h2>
<table>
<tr><th>条件</th><th>加点</th></tr>
<tr><td>きょうだいが在園中＋同一園を第1希望</td><td>+3点</td></tr>
<tr><td>きょうだいが在園中（別の園を希望）</td><td>+2点</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>フルタイム共働き52点＋育休+6＋祖父母別居+4＋きょうだい同一園+3＝<strong>65点</strong>。激戦区でもかなり有利になります。</p>
</div>

<h2>きょうだい加点を最大活用する戦略</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>上の子と同じ園を第1希望に</strong>
<p>同一園希望で+3点。別の園を希望すると+2点に下がります。1点の差が大きい激戦区では、同じ園を第1希望にしましょう。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>上の子が卒園する前に申し込む</strong>
<p>上の子が卒園するときょうだい加点がなくなります。年齢差3歳以上の場合は特に注意が必要です。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>保育料の軽減も活用</strong>
<p>同時在園の場合、2人目は保育料が半額になります。3人目以降は無料です。</p>
</div>
</div>

<h2>注意点：上の子が小規模保育の場合</h2>
<p>上の子が小規模保育に通っている場合、2歳児クラスで卒園するため、年齢差によってはきょうだい加点が使えなくなります。</p>

<h2>認可外加点との併用</h2>
<p>きょうだい加点（+2〜3）と認可外加点（+7）は併用可能です。両方を使えば62点＋7＋3＝<span class="highlight">72点</span>も理論上は可能です。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>きょうだい加点の詳細は<a href="https://www.city.saitama.lg.jp/003/001/015/001/p100639.html" target="_blank" rel="noopener">さいたま市の利用調整基準表</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 55,
  },

  // ========== 追加記事 2026-04-07 ==========
  {
    slug: "self-employed-score",
    citySlug: "saitama",
    title: "さいたま市で自営業・フリーランスが保育園に入るための点数戦略",
    description: "さいたま市で自営業やフリーランスの方が保育園入園選考で不利にならないための仕組みと対策を解説します。",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>自営業・フリーランスの基本指数</h2>
<p>さいたま市では自営業・フリーランスも会社員と同じ基本指数表が適用されます。月の就労日数と時間が基準を満たせば<span class="highlight">最大26点</span>を取得できます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>自営業の場合、「就労状況申告書」と「開業届の写し」または「確定申告書の写し」の提出が必要です。</p>
</div>

<h2>点数を最大化するコツ</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content"><strong>就労時間の記録を残す</strong><p>月20日以上・週40時間以上の就労実態を証明できるようにしましょう。</p></div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content"><strong>開業届を出しておく</strong><p>税務署への開業届は就労証明の基本です。</p></div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content"><strong>確定申告書を用意する</strong><p>事業実態の証明になります。</p></div>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>必要書類の詳細は<a href="https://www.city.saitama.lg.jp/003/001/015/001/p100639.html" target="_blank" rel="noopener">さいたま市公式サイト</a>でご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 40,
  },
  {
    slug: "naishoku-score",
    citySlug: "saitama",
    title: "さいたま市で内職・在宅ワークの場合の保育園入園点数",
    description: "さいたま市で内職や在宅ワークをしている場合の点数の扱いと注意点を解説します。",
    image: "https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>在宅ワーク・内職の点数</h2>
<p>さいたま市では在宅ワークも居宅外労働と<strong>同じ基本指数表</strong>が適用されます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>在宅ワークだからといって点数が下がることはありません。ただし就労実態の証明が重要です。</p>
</div>

<h2>必要な証明書類</h2>
<table>
<tr><th>働き方</th><th>必要書類</th></tr>
<tr><td>業務委託・フリーランス</td><td>就労状況申告書＋開業届＋契約書等</td></tr>
<tr><td>内職</td><td>就労状況申告書＋内職証明書</td></tr>
<tr><td>在宅勤務（会社員）</td><td>就労証明書（在宅勤務の旨を記載）</td></tr>
</table>

<h2>注意点</h2>
<ul>
<li>就労時間は実働時間で申告してください</li>
<li>就労実態と申告内容に相違がある場合、利用取消の可能性があります</li>
</ul>

<div class="info-box">
<p><strong>注意</strong></p>
<p>不明点は各区役所支援課にお問い合わせください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 35,
  },
  {
    slug: "kyushoku-hokatsu",
    citySlug: "saitama",
    title: "さいたま市で求職中に保育園に申し込む方法と点数",
    description: "さいたま市で求職活動中でも保育園に申し込めます。求職中の点数と就労開始期限を解説します。",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>求職中でも申し込める</h2>
<p>さいたま市では「求職活動中」も保育を必要とする事由として認可保育園に申し込めます。</p>

<h2>求職中の基本指数</h2>
<p>求職活動中の基本指数はフルタイム就労（26点）より大きく下がります。62点ボーダーの園では厳しい状況です。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>求職中の場合、入園後<strong>90日以内</strong>に就労を開始する必要があります。</p>
</div>

<h2>点数を上げる方法</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content"><strong>先に就職先を決める</strong><p>内定があれば就労同等の点数が適用されます。</p></div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content"><strong>認可外に預けて就労開始</strong><p>認可外利用＋就労で加点が得られます。</p></div>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳細は<a href="https://www.city.saitama.lg.jp/003/001/015/001/p100639.html" target="_blank" rel="noopener">さいたま市公式サイト</a>でご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 40,
  },
  {
    slug: "tenshoku-timing",
    citySlug: "saitama",
    title: "さいたま市で転職するタイミングと保育園への影響",
    description: "転職がさいたま市の保育園入園選考や在園継続に与える影響を解説します。",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>転職が入園選考に与える影響</h2>
<p>入園申込時の就労証明書は現在の勤務先のものが必要です。</p>

<h2>入園後に転職する場合</h2>
<div class="point-box">
<p><strong>ポイント</strong></p>
<p>入園後の転職は可能ですが、新しい就労証明書を速やかに区役所支援課に提出してください。退職から再就職まで<strong>90日以内</strong>に就労開始が必要です。</p>
</div>

<h2>注意点</h2>
<ul>
<li>就労時間が大幅に減ると保育の必要性が認められなくなる可能性があります</li>
<li>申込後〜入園前の転職は新しい就労証明書を速やかに提出してください</li>
</ul>

<div class="info-box">
<p><strong>注意</strong></p>
<p>詳細は各区役所支援課にご相談ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 35,
  },
  {
    slug: "age2-nyuen",
    citySlug: "saitama",
    title: "さいたま市で2歳児クラスから入園するメリットと注意点",
    description: "さいたま市で2歳児クラスから保育園に入るメリットと競争率の傾向を解説します。",
    image: "https://images.unsplash.com/photo-1587654780291-39c9404d7dd0?w=800&h=400&fit=crop",
    category: "年齢別対策",
    categoryColor: "amber",
    content: `<h2>2歳児クラスの特徴</h2>
<p>2歳児クラスは4月1日時点で2歳の子どもが対象です。</p>

<h2>メリット</h2>
<ul>
<li>1歳児クラスに比べて競争率が低い園がある</li>
<li>小規模保育からの転園組がいるため枠が増える園もある</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>2歳児クラスは持ち上がりが多く新規募集枠が少ない園もあります。さいたま市公式サイトで各園の募集予定数を確認しましょう。</p>
</div>

<h2>小規模保育からの連携枠</h2>
<p>さいたま市でも小規模保育の卒園児に連携先への優先枠が設けられている場合があります。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>各園の募集数は<a href="https://www.city.saitama.lg.jp/003/001/015/001/p100639.html" target="_blank" rel="noopener">さいたま市公式サイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 35,
  },
  {
    slug: "age3-ikou",
    citySlug: "saitama",
    title: "さいたま市で3歳児クラスへの移行・転園ガイド",
    description: "小規模保育からの3歳児クラスへの移行について、さいたま市の連携施設制度を解説します。",
    image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=400&fit=crop",
    category: "年齢別対策",
    categoryColor: "amber",
    content: `<h2>3歳児クラスへの移行</h2>
<p>小規模保育事業は原則0〜2歳が対象。3歳で卒園するため認可保育園等への移行が必要です。</p>

<h2>連携施設の優先枠</h2>
<p>さいたま市では小規模保育事業所ごとに連携施設が設定されている場合があります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>連携施設がない小規模保育もあります。入園前に連携先を確認しておきましょう。</p>
</div>

<h2>幼稚園の預かり保育も選択肢</h2>
<p>3歳からは幼稚園の預かり保育（新2号認定）も利用可能です。さいたま市内には預かり保育が充実した幼稚園もあります。</p>

<div class="info-box">
<p><strong>注意</strong></p>
<p>連携施設の情報は年度ごとに変わる場合があります。最新情報は子ども未来局にお問い合わせください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 30,
  },
  {
    slug: "nyuyoji-age0",
    citySlug: "saitama",
    title: "さいたま市の0歳児クラス入園ガイド",
    description: "さいたま市で0歳児クラスに入園する場合の月齢要件と注意点をまとめました。",
    image: "https://images.unsplash.com/photo-1544126592-807ade215a0b?w=800&h=400&fit=crop",
    category: "年齢別対策",
    categoryColor: "amber",
    content: `<h2>0歳児クラスの受入月齢</h2>
<p>さいたま市の認可保育園では多くの園が<span class="highlight">生後57日（産休明け）</span>から受入可能です。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>4月入園の場合、4月1日時点の月齢が受入条件を満たしている必要があります。</p>
</div>

<h2>0歳児クラスのメリット・デメリット</h2>
<ul>
<li>メリット：1歳児クラスより競争率が低い傾向</li>
<li>デメリット：育休を短縮する必要がある</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>各園の受入月齢は<a href="https://www.city.saitama.lg.jp/003/001/015/001/p100639.html" target="_blank" rel="noopener">さいたま市の保育施設一覧</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 40,
  },
  {
    slug: "nintei-kodomoen",
    citySlug: "saitama",
    title: "さいたま市の認定こども園ガイド　保育園との違い",
    description: "さいたま市の認定こども園の特徴と保育園との違いを解説します。",
    image: "https://images.unsplash.com/photo-1576495199011-eb94736d05d6?w=800&h=400&fit=crop",
    category: "施設の種類",
    categoryColor: "purple",
    content: `<h2>認定こども園とは</h2>
<p>保育園と幼稚園の機能を併せ持つ施設です。さいたま市内にも複数の認定こども園があります。</p>

<h2>保育園との主な違い</h2>
<table>
<tr><th>項目</th><th>認可保育園</th><th>認定こども園</th></tr>
<tr><td>対象年齢</td><td>0〜5歳</td><td>0〜5歳</td></tr>
<tr><td>保護者の就労要件</td><td>必要</td><td>保育利用は必要、教育利用は不要</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>保育利用の入園申込は認可保育園と同じく区役所を通じて行います。選考基準も同じです。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>一覧は<a href="https://www.city.saitama.lg.jp/003/001/015/001/p100639.html" target="_blank" rel="noopener">さいたま市公式サイト</a>でご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 35,
  },
  {
    slug: "kigyou-shudogata",
    citySlug: "saitama",
    title: "さいたま市の企業主導型保育園とは？認可との違い",
    description: "さいたま市にある企業主導型保育園の仕組みと活用法を解説します。",
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&h=400&fit=crop",
    category: "施設の種類",
    categoryColor: "purple",
    content: `<h2>企業主導型保育園とは</h2>
<p>企業が従業員のために設置する保育施設です。認可外ですが国から助成を受けています。</p>

<h2>認可保育園との違い</h2>
<table>
<tr><th>項目</th><th>認可保育園</th><th>企業主導型</th></tr>
<tr><td>申込先</td><td>区役所支援課</td><td>施設に直接</td></tr>
<tr><td>選考方法</td><td>指数制</td><td>施設が決定</td></tr>
<tr><td>入園時期</td><td>主に4月</td><td>随時可能な場合が多い</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>「地域枠」があれば企業の従業員でなくても利用可能です。62点に届かない場合の選択肢として有効です。</p>
</div>

<div class="info-box">
<p><strong>注意</strong></p>
<p>企業主導型は認可外です。見学時に保育の質を確認しましょう。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 30,
  },
  {
    slug: "yakan-hoiku",
    citySlug: "saitama",
    title: "さいたま市の延長保育・夜間保育ガイド",
    description: "さいたま市で延長保育や夜間保育を利用する方法と料金について解説します。",
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&h=400&fit=crop",
    category: "施設の種類",
    categoryColor: "purple",
    content: `<h2>延長保育とは</h2>
<p>さいたま市の認可保育園では通常の保育時間を超えて利用できる延長保育があります。</p>

<h2>延長保育の料金目安</h2>
<table>
<tr><th>区分</th><th>料金の目安</th></tr>
<tr><td>延長保育（1時間）</td><td>月額2,000〜4,000円程度</td></tr>
<tr><td>延長保育（2時間）</td><td>月額4,000〜6,000円程度</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>料金や実施時間は園ごとに異なります。入園前に希望園に確認しましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>延長保育の実施園は<a href="https://www.city.saitama.lg.jp/003/001/015/001/p100639.html" target="_blank" rel="noopener">さいたま市公式サイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 30,
  },
  {
    slug: "mushoka-seido",
    citySlug: "saitama",
    title: "さいたま市の幼児教育・保育無償化制度まとめ",
    description: "さいたま市における無償化制度の対象範囲と手続きを解説します。",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "お金・制度",
    categoryColor: "rose",
    content: `<h2>無償化の対象</h2>
<table>
<tr><th>対象</th><th>無償化の内容</th></tr>
<tr><td>3〜5歳児（認可保育園）</td><td>保育料が無料</td></tr>
<tr><td>0〜2歳児（非課税世帯）</td><td>保育料が無料</td></tr>
<tr><td>認可外（3〜5歳）</td><td>月額37,000円まで無償</td></tr>
<tr><td>認可外（0〜2歳、非課税世帯）</td><td>月額42,000円まで無償</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>無償化は「保育料」のみ。給食費・教材費等の実費は別途必要です。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳細は<a href="https://www.city.saitama.lg.jp/003/001/015/001/p100639.html" target="_blank" rel="noopener">さいたま市公式サイト</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 45,
  },
  {
    slug: "shokuhi-jippi",
    citySlug: "saitama",
    title: "さいたま市の保育園の給食費・実費負担はいくら？",
    description: "さいたま市の認可保育園で必要な給食費やその他の実費を解説します。",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=400&fit=crop",
    category: "お金・制度",
    categoryColor: "rose",
    content: `<h2>給食費の目安</h2>
<table>
<tr><th>年齢</th><th>主食費</th><th>副食費</th></tr>
<tr><td>0〜2歳児</td><td colspan="2">保育料に含まれる</td></tr>
<tr><td>3〜5歳児</td><td>月額約1,000〜3,000円</td><td>月額約4,500円</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>年収360万円未満相当の世帯や第3子以降は副食費が免除されます。</p>
</div>

<h2>その他の実費</h2>
<ul>
<li>教材費：月額数百円〜数千円</li>
<li>行事費：実費</li>
</ul>

<div class="info-box">
<p><strong>注意</strong></p>
<p>金額は園によって異なります。各園にお問い合わせください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 35,
  },
  {
    slug: "hoikuryo-keisan",
    citySlug: "saitama",
    title: "さいたま市の保育料の計算方法と目安",
    description: "さいたま市の保育料がどのように計算されるか、目安金額とともに解説します。",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "お金・制度",
    categoryColor: "rose",
    content: `<h2>保育料の計算の仕組み</h2>
<p>さいたま市の保育料は世帯の<strong>市民税所得割額</strong>（父母合算）で決定されます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>3〜5歳児は無償化で0円。以下は0〜2歳児に適用されます。</p>
</div>

<h2>保育料の目安（0〜2歳児）</h2>
<table>
<tr><th>市民税所得割額</th><th>月額保育料の目安</th></tr>
<tr><td>非課税世帯</td><td>0円</td></tr>
<tr><td>〜約57,700円未満</td><td>約6,000〜15,000円</td></tr>
<tr><td>〜約169,000円未満</td><td>約20,000〜40,000円</td></tr>
<tr><td>169,000円以上</td><td>約45,000〜58,000円</td></tr>
</table>

<h2>多子世帯の軽減</h2>
<ul>
<li>同時在園の2人目：半額</li>
<li>同時在園の3人目以降：無料</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>正確な保育料表は<a href="https://www.city.saitama.lg.jp/003/001/015/001/p100639.html" target="_blank" rel="noopener">さいたま市公式サイト</a>でご確認ください。上記は目安です。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 40,
  },
  {
    slug: "zeikin-koujo",
    citySlug: "saitama",
    title: "保育料と税金の関係　さいたま市で控除を活用する方法",
    description: "さいたま市の保育料は市民税額で決まります。控除を活用して保育料を下げる方法を解説します。",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "お金・制度",
    categoryColor: "rose",
    content: `<h2>保育料と市民税の関係</h2>
<p>さいたま市の保育料は「市民税所得割額」で決まります。</p>

<h2>活用できる主な控除</h2>
<table>
<tr><th>控除の種類</th><th>効果</th></tr>
<tr><td>医療費控除</td><td>年間10万円超の医療費で申告可能</td></tr>
<tr><td>iDeCo</td><td>掛金が全額所得控除</td></tr>
<tr><td>生命保険料控除</td><td>確定申告で追加可能</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>ふるさと納税は保育料計算の「所得割額」には影響しないことが一般的です。iDeCoや医療費控除が効果的です。</p>
</div>

<div class="info-box">
<p><strong>注意</strong></p>
<p>控除の適用は個別に異なります。税務署や区役所にご相談ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 30,
  },
  {
    slug: "shurou-shoumeisho",
    citySlug: "saitama",
    title: "さいたま市の就労証明書の書き方と注意点",
    description: "さいたま市の保育園申込に必要な就労証明書の記入ポイントを解説します。",
    image: "https://images.unsplash.com/photo-1568667256549-094345857637?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>就労証明書とは</h2>
<p>保護者の就労状況を証明する書類です。勤務先に作成を依頼します。</p>

<h2>記入のポイント</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content"><strong>さいたま市指定の様式を使う</strong><p>市公式サイトからダウンロードできます。</p></div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content"><strong>復職後の勤務予定を正確に記入</strong><p>勤務時間・日数が基本指数に直結します。</p></div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content"><strong>証明者の押印</strong><p>会社の代表者印または人事担当者印が必要です。</p></div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>就労証明書は申込日から遡って<strong>3か月以内</strong>に作成されたものが有効です。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>様式は<a href="https://www.city.saitama.lg.jp/003/001/015/001/p100639.html" target="_blank" rel="noopener">さいたま市公式サイト</a>からダウンロードできます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 45,
  },
  {
    slug: "shinsei-shorui-list",
    citySlug: "saitama",
    title: "さいたま市の保育園申込に必要な書類チェックリスト",
    description: "さいたま市の保育園入園申込に必要な書類をチェックリスト形式でまとめました。",
    image: "https://images.unsplash.com/photo-1568667256549-094345857637?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>全員必須の書類</h2>
<ul>
<li>教育・保育給付認定申請書兼利用申込書</li>
<li>就労証明書等（父母それぞれ）</li>
<li>マイナンバー確認書類</li>
</ul>

<h2>該当者のみ必要な書類</h2>
<table>
<tr><th>状況</th><th>追加書類</th></tr>
<tr><td>ひとり親</td><td>児童扶養手当証書の写し等</td></tr>
<tr><td>自営業</td><td>開業届・確定申告書の写し</td></tr>
<tr><td>育休中</td><td>育休期間のわかる書類</td></tr>
<tr><td>認可外利用中</td><td>在園証明書</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>書類の不備は選考に不利になります。提出前に区役所支援課で確認しましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳細は<a href="https://www.city.saitama.lg.jp/003/001/015/001/p100639.html" target="_blank" rel="noopener">さいたま市「保育施設利用のてびき」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 40,
  },
  {
    slug: "niji-shinsei-flow",
    citySlug: "saitama",
    title: "さいたま市の保育園2次利用調整の流れと対策",
    description: "さいたま市の1次で不承諾になった場合の2次利用調整の流れを解説します。",
    image: "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>2次利用調整とは</h2>
<p>1次で定員に達しなかった園について2次調整が行われます。</p>

<h2>2次の流れ</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content"><strong>1次結果通知を確認</strong><p>1月下旬〜2月上旬に届きます。</p></div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content"><strong>希望変更届の提出</strong><p>2月中旬が締切です。</p></div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content"><strong>2次結果通知</strong><p>3月中旬に届きます。</p></div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>2次で空きのある園は限られます。通える範囲で幅広く希望を出しましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>2次の詳細は1次結果通知に同封される案内をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 40,
  },
  {
    slug: "tenkyo-hokatsu",
    citySlug: "saitama",
    title: "さいたま市への転居を伴う保活ガイド",
    description: "他の自治体からさいたま市へ転居予定の場合の保育園申込方法を解説します。",
    image: "https://images.unsplash.com/photo-1516156008625-3a9d6067fab5?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>市外からの転入と保活</h2>
<p>さいたま市への転入予定がある場合、転入前でも保育園の申込が可能です。</p>

<h2>申込の流れ</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content"><strong>転入先の区役所支援課に相談</strong><p>電話で事前相談しましょう。</p></div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content"><strong>必要書類の準備</strong><p>転入を証明する書類が追加で必要です。</p></div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>入園月の前月末までにさいたま市に住民票を移す必要があります。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳細は転入予定の区役所支援課にお問い合わせください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 30,
  },
  {
    slug: "kyoiku-hoiku-chigai",
    citySlug: "saitama",
    title: "さいたま市の保育園と幼稚園の違い",
    description: "さいたま市の保育園と幼稚園の違いを比較します。",
    image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=400&fit=crop",
    category: "施設の種類",
    categoryColor: "purple",
    content: `<h2>保育園と幼稚園の基本的な違い</h2>
<table>
<tr><th>項目</th><th>保育園</th><th>幼稚園</th></tr>
<tr><td>対象年齢</td><td>0〜5歳</td><td>3〜5歳</td></tr>
<tr><td>利用時間</td><td>最大11時間</td><td>4〜5時間＋預かり保育</td></tr>
<tr><td>保護者の要件</td><td>就労等が必要</td><td>不要</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>共働きで長時間預ける必要がある場合は保育園、教育重視なら幼稚園が一般的です。認定こども園なら両方の機能を備えています。</p>
</div>

<h2>幼稚園の預かり保育（新2号認定）</h2>
<p>月額11,300円まで無償化の対象です。さいたま市内にも預かり保育が充実した幼稚園があります。</p>

<div class="info-box">
<p><strong>注意</strong></p>
<p>預かり保育の実施時間は園によって異なります。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 35,
  },
  {
    slug: "hokatsu-calendar",
    citySlug: "saitama",
    title: "さいたま市の保活カレンダー　月別やることリスト",
    description: "さいたま市で4月入園を目指す方のための月別保活カレンダーです。",
    image: "https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>保活カレンダー（4月入園の場合）</h2>
<table>
<tr><th>時期</th><th>やること</th></tr>
<tr><td>4〜6月</td><td>情報収集開始。前年度の「てびき」を参考に</td></tr>
<tr><td>6〜9月</td><td>保育園見学</td></tr>
<tr><td>10月初旬</td><td>「てびき」配布。就労証明書を依頼</td></tr>
<tr><td>10月中旬〜下旬</td><td>申込提出（電子申請・郵送・窓口）</td></tr>
<tr><td>1月下旬</td><td>1次結果通知</td></tr>
<tr><td>2月</td><td>2次の希望変更届提出</td></tr>
<tr><td>3月</td><td>2次結果通知・入園準備</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>さいたま市の申込期間は10月中旬〜下旬と短めです。書類は早めに準備しましょう。</p>
</div>

<div class="info-box">
<p><strong>注意</strong></p>
<p>日程は年度によって変わります。最新情報はさいたま市公式サイトでご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 45,
  },
  {
    slug: "souba-tensuu",
    citySlug: "saitama",
    title: "さいたま市の保育園入園に必要な点数の相場と目安",
    description: "さいたま市の保育園入園に必要な点数の目安をエリア別に解説します。",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>入園に必要な点数の目安</h2>
<p>さいたま市の認可保育園入園のボーダーラインは<span class="highlight">62点（父母ともフルタイム）</span>が一つの目安です。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>62点は共働きフルタイムの基本点です。浦和区・南区・大宮区などの激戦区では62点＋加点がないと厳しい園もあります。</p>
</div>

<h2>エリア別の傾向</h2>
<table>
<tr><th>エリア</th><th>競争率の傾向</th></tr>
<tr><td>浦和区</td><td>最も激戦。1歳児は特に厳しい</td></tr>
<tr><td>南区</td><td>武蔵浦和周辺は激戦</td></tr>
<tr><td>大宮区</td><td>駅周辺は競争率が高い</td></tr>
<tr><td>北区・西区</td><td>比較的入りやすい園がある</td></tr>
<tr><td>岩槻区</td><td>比較的入りやすい傾向</td></tr>
</table>

<div class="info-box">
<p><strong>注意</strong></p>
<p>上記は一般的な傾向です。最新情報は区役所支援課でご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 45,
  },
  {
    slug: "ku-betsu-bairitsu",
    citySlug: "saitama",
    title: "さいたま市の区別・保育園入園倍率の傾向",
    description: "さいたま市10区の保育園入園の競争率の傾向を紹介します。",
    image: "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=800&h=400&fit=crop",
    category: "エリア情報",
    categoryColor: "teal",
    content: `<h2>さいたま市10区の入園傾向</h2>
<table>
<tr><th>区</th><th>傾向</th></tr>
<tr><td>西区</td><td>比較的入りやすい</td></tr>
<tr><td>北区</td><td>宮原周辺はやや競争率高め</td></tr>
<tr><td>大宮区</td><td>駅周辺は激戦</td></tr>
<tr><td>見沼区</td><td>比較的入りやすい傾向</td></tr>
<tr><td>中央区</td><td>与野周辺は競争率高め</td></tr>
<tr><td>桜区</td><td>比較的入りやすい</td></tr>
<tr><td>浦和区</td><td>最も激戦のエリア</td></tr>
<tr><td>南区</td><td>武蔵浦和周辺は激戦</td></tr>
<tr><td>緑区</td><td>エリアにより差がある</td></tr>
<tr><td>岩槻区</td><td>比較的入りやすい傾向</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>区をまたいだ申込も可能です。隣の区の園も検討しましょう。</p>
</div>

<div class="info-box">
<p><strong>注意</strong></p>
<p>上記は一般的な傾向です。最新の情報は各区役所にお問い合わせください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 40,
  },
  {
    slug: "ikukyu-enchou-risk-detail",
    citySlug: "saitama",
    title: "さいたま市で育休延長する場合のリスクと保活への影響",
    description: "さいたま市で育休を延長する場合の保活への影響と注意点を解説します。",
    image: "https://images.unsplash.com/photo-1531983412531-1f49a365ffed?w=800&h=400&fit=crop",
    category: "育休・復職",
    categoryColor: "purple",
    content: `<h2>育休延長と不承諾通知</h2>
<p>育休延長には保育園の「不承諾通知」が必要です。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>2025年4月以降、育休延長目的での保育園申込についてハローワークの確認が厳格化されています。</p>
</div>

<h2>育休延長のリスク</h2>
<ul>
<li>1歳児クラスは最も激戦で延長後はさらに厳しくなる</li>
<li>さいたま市の62点ボーダーでは加点がないと入園困難</li>
</ul>

<h2>対策</h2>
<ul>
<li>入園可能な園があれば入園する方が安全</li>
<li>認可外保育施設も検討する</li>
</ul>

<div class="info-box">
<p><strong>注意</strong></p>
<p>最新の情報はハローワークおよび勤務先にご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 40,
  },
  {
    slug: "fukushoku-junbi",
    citySlug: "saitama",
    title: "さいたま市で保育園入園後の復職準備チェックリスト",
    description: "さいたま市で保育園内定後から復職までにやることを解説します。",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
    category: "育休・復職",
    categoryColor: "purple",
    content: `<h2>復職までのチェックリスト</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content"><strong>勤務先に復職日を連絡</strong><p>慣らし保育期間を考慮しましょう。</p></div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content"><strong>入園説明会に出席</strong><p>持ち物や生活の流れを確認します。</p></div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content"><strong>入園準備品の購入</strong><p>園のリストに従って準備します。</p></div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content"><strong>病児保育・ファミサポの登録</strong><p>バックアッププランを用意しましょう。</p></div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>慣らし保育（1〜2週間）中は仕事を休む必要があります。有給の残日数を確認しましょう。</p>
</div>

<div class="info-box">
<p><strong>注意</strong></p>
<p>準備品は園によって異なります。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 35,
  },
  {
    slug: "sannin-me-hokatsu",
    citySlug: "saitama",
    title: "さいたま市で3人目の保活　多子世帯の優遇制度",
    description: "さいたま市で3人目以降の保活における優遇制度と戦略を解説します。",
    image: "https://images.unsplash.com/photo-1475503572774-15a45e5d60b9?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>保育料の軽減</h2>
<table>
<tr><th>子ども</th><th>保育料</th></tr>
<tr><td>1人目</td><td>通常額</td></tr>
<tr><td>同時在園の2人目</td><td>半額</td></tr>
<tr><td>同時在園の3人目以降</td><td>無料</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>0〜2歳児の3人目以降は保育料が無料です。さいたま市ではきょうだい加点（+2〜3点）もあるので活用しましょう。</p>
</div>

<h2>3人目保活のコツ</h2>
<ul>
<li>上の子と同じ園を第一希望にしてきょうだい加点を最大化</li>
<li>送迎動線を考えて園を選ぶ</li>
</ul>

<div class="info-box">
<p><strong>注意</strong></p>
<p>制度は年度によって変更される場合があります。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 30,
  },
  {
    slug: "tanshin-funin",
    citySlug: "saitama",
    title: "さいたま市で単身赴任中の場合の保育園申込",
    description: "配偶者が単身赴任中の場合のさいたま市での保育園申込と点数を解説します。",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>単身赴任中の保育園申込</h2>
<p>配偶者が単身赴任で別居していても申込は可能です。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>単身赴任であっても「ひとり親世帯」の加点は適用されません。離婚・死別等の場合に限られます。</p>
</div>

<h2>必要な追加書類</h2>
<ul>
<li>配偶者の就労証明書</li>
<li>単身赴任であることがわかる書類</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳しくは区役所支援課にお問い合わせください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 25,
  },
  {
    slug: "sofu-sobo-doukyo",
    citySlug: "saitama",
    title: "さいたま市で祖父母と同居している場合の保育園入園への影響",
    description: "祖父母と同居している場合のさいたま市の保育園入園選考への影響を解説します。",
    image: "https://images.unsplash.com/photo-1475503572774-15a45e5d60b9?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>祖父母同居と保育の必要性</h2>
<p>さいたま市では祖父母と同居していることだけで保育の必要性が否定されることはありません。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>同居の祖父母が65歳未満で無職の場合、調整指数で減点される可能性があります。</p>
</div>

<h2>対策</h2>
<ul>
<li>祖父母が就労している場合は就労証明書を提出</li>
<li>祖父母が病気等の場合はその証明書を提出</li>
<li>65歳以上は減点対象外が一般的</li>
</ul>

<div class="info-box">
<p><strong>注意</strong></p>
<p>条件は年度によって変わります。区役所にお問い合わせください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 30,
  },
  {
    slug: "fushoninchi-taiou",
    citySlug: "saitama",
    title: "さいたま市で保育園に落ちた場合の対応策まとめ",
    description: "さいたま市の1次で不承諾になった場合の対応策を解説します。",
    image: "https://images.unsplash.com/photo-1494883759339-0b042055a4ee?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>不承諾になったら</h2>
<p>1次で不承諾でも選択肢はあります。</p>

<h2>対応策</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content"><strong>2次利用調整で希望変更</strong><p>空きのある園を追加しましょう。</p></div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content"><strong>認可外保育施設を探す</strong><p>企業主導型等を検討しましょう。</p></div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content"><strong>育休延長を検討</strong><p>不承諾通知で育休延長が可能です。</p></div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content"><strong>途中入園を待つ</strong><p>毎月空きが出る可能性があります。</p></div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>不承諾通知は大切に保管してください。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>2次の詳細は1次結果通知に同封される案内をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 45,
  },
  {
    slug: "taiki-jidou-taisaku",
    citySlug: "saitama",
    title: "さいたま市の待機児童の現状と対策（2026年版）",
    description: "さいたま市の待機児童の傾向と対策について解説します。",
    image: "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=800&h=400&fit=crop",
    category: "エリア情報",
    categoryColor: "teal",
    content: `<h2>さいたま市の待機児童の状況</h2>
<p>さいたま市は首都圏の中でも保育需要が高い自治体です。待機児童数は減少傾向ですが、浦和区・南区を中心に入園が厳しいエリアがあります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>特に浦和区・南区・大宮区の1歳児クラスは62点でも入れない園があります。加点の確保が重要です。</p>
</div>

<h2>市の対策</h2>
<ul>
<li>保育施設の新設・定員増</li>
<li>保育士の処遇改善</li>
<li>小規模保育の拡充</li>
</ul>

<h2>保護者側の対策</h2>
<ul>
<li>希望園を幅広く記入する</li>
<li>隣の区の園も検討する</li>
<li>認可外加点（+7点）を活用する</li>
</ul>

<div class="info-box">
<p><strong>注意</strong></p>
<p>最新データは子ども未来局の公式サイトでご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 40,
  },
  {
    slug: "tennen-moshikomi",
    citySlug: "saitama",
    title: "さいたま市の保育園への転園申込の方法",
    description: "さいたま市で保育園の転園を希望する場合の手続きを解説します。",
    image: "https://images.unsplash.com/photo-1516156008625-3a9d6067fab5?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>転園申込とは</h2>
<p>現在通っている保育園から別の園に移りたい場合の手続きです。</p>

<h2>流れ</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content"><strong>区役所支援課に相談</strong><p>転園希望を伝えます。</p></div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content"><strong>申込書類の提出</strong><p>新規入園と同じ書類が必要です。</p></div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content"><strong>利用調整</strong><p>新規と同じ基準で選考されます。</p></div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>転園が決まらなくても今の園に通い続けられます。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>手続きの詳細は区役所支援課にお問い合わせください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 30,
  },
];

registerArticles(articles);
