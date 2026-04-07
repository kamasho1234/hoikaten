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
];

registerArticles(articles);
