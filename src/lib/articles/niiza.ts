import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  // =========================================================================
  // 1. 保活スケジュール
  // =========================================================================
  {
    slug: "hokatsu-schedule",
    citySlug: "niiza",
    title: "新座市の保活スケジュール　申込から内定までの流れ",
    description:
      "新座市の認可保育園の申込時期・選考の流れをまとめました。令和8年度4月入園の動き方を解説します。",
    image: "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>新座市の4月入園スケジュール</h2>
<p>新座市の認可保育園は毎年秋に翌年度4月入園の申込を受付けます。新座市こども未来部保育課の案内を確認して準備を進めましょう。</p>

<h3>保活の全体スケジュール</h3>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>4月〜6月：情報収集</strong>
<p>新座市のホームページで認可保育園（約25か所）の一覧を確認します。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>6月〜9月：保育園見学</strong>
<p>気になる園に連絡して見学を予約しましょう。新座市は志木駅・新座駅周辺に園が集中しています。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>9月〜10月：申込書類の準備</strong>
<p>就労証明書などの必要書類を準備します。</p>
</div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content">
<strong>10月〜11月：申込書類の提出</strong>
<p>こども未来部保育課の窓口または郵送で提出します。</p>
</div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>新座市は基本指数が父母各最大20点（合計40点満点）です。フルタイム共働きで40点が基本ラインになります。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳しくは<a href="https://www.city.niiza.lg.jp/soshiki/93/" target="_blank" rel="noopener">新座市こども未来部保育課</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 55,
  },

  // =========================================================================
  // 2. 入園点数のしくみ
  // =========================================================================
  {
    slug: "scoring-system-guide",
    citySlug: "niiza",
    title: "新座市の入園点数のしくみ　基本指数と調整指数を解説",
    description:
      "新座市の保育園入園選考で使われる基本指数と調整指数のしくみを解説します。",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>新座市の選考点数とは</h2>
<p>新座市の認可保育園の入園選考は「基本指数＋調整指数」の合計で行われます。点数が高い世帯から順に内定が決まります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>選考点数 = 基本指数（保護者1 + 保護者2）+ 調整指数</p>
</div>

<h2>基本指数（父母各最大20点、合計40点）</h2>
<p>就労の場合、月160時間以上で満点の<span class="highlight">20点</span>になります。</p>

<table>
<tr><th>月の就労時間</th><th>点数</th></tr>
<tr><td>月160時間以上</td><td>20点</td></tr>
<tr><td>月140〜160時間未満</td><td>18点</td></tr>
<tr><td>月120〜140時間未満</td><td>16点</td></tr>
<tr><td>月100〜120時間未満</td><td>14点</td></tr>
<tr><td>月80〜100時間未満</td><td>12点</td></tr>
<tr><td>月64〜80時間未満</td><td>10点</td></tr>
</table>

<h2>調整指数とは</h2>
<p>家庭の状況に応じた加点・減点です。主な項目は以下の通りです。</p>

<table>
<tr><th>項目</th><th>点数</th></tr>
<tr><td>ひとり親世帯</td><td>+5</td></tr>
<tr><td>きょうだいが認可園に在園</td><td>+3</td></tr>
<tr><td>認可外保育施設を利用</td><td>+3</td></tr>
<tr><td>生活保護世帯</td><td>+3</td></tr>
<tr><td>きょうだい同時申込</td><td>+2</td></tr>
<tr><td>育休からの復帰予定</td><td>+2</td></tr>
<tr><td>65歳未満の同居親族あり</td><td>-3</td></tr>
<tr><td>認可園からの転園希望</td><td>-5</td></tr>
<tr><td>市外からの申込</td><td>-10</td></tr>
</table>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>正確な基準表は<a href="https://www.city.niiza.lg.jp/soshiki/93/" target="_blank" rel="noopener">新座市こども未来部保育課</a>に掲載の利用調整基準表をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 65,
  },

  // =========================================================================
  // 3. 40点ボーダー
  // =========================================================================
  {
    slug: "40-point-border",
    citySlug: "niiza",
    title: "新座市の40点ボーダーとは？共働き家庭の点数を計算",
    description:
      "新座市でフルタイム共働き家庭の基本点数40点がボーダーになる理由と、差をつける方法を解説します。",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>40点はどうやって計算される？</h2>
<p>新座市の保育園選考で「40点がボーダー」とよく言われます。この40点の内訳を見てみましょう。</p>

<table>
<tr><th>項目</th><th>点数</th></tr>
<tr><td>保護者1：フルタイム就労（月160時間以上）</td><td>20点</td></tr>
<tr><td>保護者2：フルタイム就労（月160時間以上）</td><td>20点</td></tr>
<tr><td colspan="2"><strong>合計：40点</strong></td></tr>
</table>

<p>つまり<strong>フルタイム共働き</strong>で基本指数が満点の40点。多くの家庭がこの40点で横並びになります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>40点同士の勝負では、調整指数の加点が合否を分けます。+3〜5点の差が内定・不承諾の差になることがあります。</p>
</div>

<h2>40点から差をつけるには？</h2>
<table>
<tr><th>加点方法</th><th>追加点数</th></tr>
<tr><td>ひとり親世帯</td><td>+5</td></tr>
<tr><td>きょうだいが認可園に在園</td><td>+3</td></tr>
<tr><td>認可外保育施設を利用</td><td>+3</td></tr>
<tr><td>生活保護世帯</td><td>+3</td></tr>
<tr><td>きょうだい同時申込</td><td>+2</td></tr>
<tr><td>育休からの復帰予定</td><td>+2</td></tr>
</table>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>同点の場合の優先順位は新座市の利用調整基準で定められています。所得が低い世帯が優先されるケースが一般的です。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 95,
  },

  // =========================================================================
  // 4. 加点を増やす方法
  // =========================================================================
  {
    slug: "katten-strategy",
    citySlug: "niiza",
    title: "新座市で加点を増やす方法と注意点",
    description:
      "新座市の保育園選考で調整指数の加点を最大化する方法を解説。認可外利用やきょうだい加点の活用法をまとめました。",
    image: "https://images.unsplash.com/photo-1460518451285-97b6aa326961?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>調整指数で差がつく</h2>
<p>新座市の保育園選考では、基本指数が同じフルタイム共働き家庭が大半を占めます。合否の差をつけるのは<strong>調整指数</strong>です。</p>

<h2>主な加点項目と活用法</h2>

<h3>ひとり親世帯：+5点</h3>
<p>最も大きな加点です。ひとり親であることを証明する書類（戸籍謄本等）が必要になります。</p>

<h3>きょうだいが認可園に在園：+3点</h3>
<p>上のお子さんが認可保育園に在園中なら+3点が加算されます。2人目以降の保活では大きなアドバンテージです。</p>

<h3>認可外保育施設を利用：+3点</h3>
<p>月ぎめで認可外保育施設を利用している場合に加算されます。育休を切り上げて認可外に預け、復職してから認可に申し込む方法があります。</p>

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
<p>「認可外保育施設に預けている」として+3の加点を得ます。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>認可に内定したら認可外を退園</strong>
<p>4月から認可保育園に転園します。</p>
</div>
</div>

<h3>育休からの復帰予定：+2点</h3>
<p>育休中に申し込む場合に加算されます。認可外利用の加点と併用できるかは窓口で確認しましょう。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>当サイトのシミュレーターを使えば、自分の加点を漏れなく確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 100,
  },

  // =========================================================================
  // 5. 新座市の保育園選び
  // =========================================================================
  {
    slug: "hoikuen-erabi",
    citySlug: "niiza",
    title: "新座市の保育園選び　エリア別の特徴と見学ポイント",
    description:
      "新座市の保育園をエリア別に紹介。志木駅・新座駅周辺の園の特徴と見学時のチェックポイントを解説します。",
    image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800&h=400&fit=crop",
    category: "保育園選び",
    categoryColor: "rose",
    content: `<h2>新座市の保育園事情</h2>
<p>新座市は人口約16.5万人、埼玉県南部に位置し東京都に隣接するベッドタウンです。市内には認可保育園が約25か所あり、志木駅・新座駅を中心に分布しています。</p>

<h2>エリア別の特徴</h2>

<h3>志木駅周辺エリア</h3>
<p>東武東上線志木駅は新座市の中心的なエリアです。駅周辺にはマンションが多く、保育需要が高い地域です。通勤に便利な立地の園が多い反面、競争率も高めです。</p>

<h3>新座駅周辺エリア</h3>
<p>JR武蔵野線新座駅の周辺は比較的新しい園が増えています。志木駅エリアより競争がやや緩やかな傾向があります。</p>

<h3>ひばりヶ丘・大泉学園方面</h3>
<p>東京都との境界に近いエリアです。西武池袋線沿線で都内通勤に便利ですが、園の数はやや少なめです。</p>

<h2>見学時のチェックポイント</h2>
<table>
<tr><th>確認項目</th><th>内容</th></tr>
<tr><td>園庭の有無</td><td>園庭がない場合、近くの公園の場所と距離を確認</td></tr>
<tr><td>給食</td><td>自園調理か外部搬入か。アレルギー対応の有無</td></tr>
<tr><td>延長保育</td><td>延長保育の時間帯と料金を確認</td></tr>
<tr><td>保育士の雰囲気</td><td>子どもへの接し方や保護者対応の様子を観察</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>見学は電話予約制の園がほとんどです。夏前に動き始めると選択肢が広がります。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 60,
  },

  // =========================================================================
  // 6. 時短勤務と点数
  // =========================================================================
  {
    slug: "jitan-scoring",
    citySlug: "niiza",
    title: "新座市で時短勤務だと点数はどうなる？",
    description:
      "新座市で育休後に時短勤務を予定している方向けに、点数への影響と対策をわかりやすく解説します。",
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=400&fit=crop",
    category: "育休・復職",
    categoryColor: "teal",
    content: `<h2>時短勤務だと基本指数が下がる？</h2>
<p>新座市の基本指数は「月あたりの就労時間」で決まります。時短勤務で就労時間が減ると、基本指数も連動して下がります。</p>

<table>
<tr><th>勤務形態の例</th><th>月の就労時間</th><th>基本指数</th></tr>
<tr><td>フルタイム（8時間 x 20日）</td><td>160時間</td><td>20点</td></tr>
<tr><td>時短6時間（6時間 x 20日）</td><td>120時間</td><td>16点</td></tr>
<tr><td>時短5時間（5時間 x 20日）</td><td>100時間</td><td>14点</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>フルタイム20点と時短6時間16点の差は4点。両親とも時短なら8点の差になり、入園選考に大きく影響します。</p>
</div>

<h2>就労証明書はどう書く？</h2>
<p>就労証明書には<strong>復職後の勤務時間</strong>を記入します。育休中の申込では「復職後の予定勤務時間」を勤務先に記入してもらいます。</p>

<h2>時短でも有利にするには</h2>
<ul>
<li>就労証明書はフルタイムの契約内容で記入し、復職後に時短に変更する方法もあります（勤務先と要相談）</li>
<li>認可外利用の加点（+3）など調整指数で補う</li>
<li>希望園を多めに書いて選択肢を広げる</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>就労証明書の書式は<a href="https://www.city.niiza.lg.jp/soshiki/93/" target="_blank" rel="noopener">新座市こども未来部保育課</a>のページからダウンロードできます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 90,
  },

  // =========================================================================
  // 7. 小規模保育のメリデメ
  // =========================================================================
  {
    slug: "shokibo-hoiku",
    citySlug: "niiza",
    title: "新座市の小規模保育事業とは？メリットと注意点",
    description:
      "新座市の小規模保育事業の特徴やメリット、3歳の壁への対策をわかりやすく解説します。",
    image: "https://images.unsplash.com/photo-1577896852618-01da1dd79f7e?w=800&h=400&fit=crop",
    category: "保育園選び",
    categoryColor: "rose",
    content: `<h2>小規模保育事業とは</h2>
<p>小規模保育事業は<strong>0〜2歳児</strong>を対象とした定員6〜19名の保育施設です。新座市内にも複数設置されており、認可保育所と同じ利用調整（選考）で入園します。</p>

<h2>小規模保育のメリット</h2>
<table>
<tr><th>メリット</th><th>内容</th></tr>
<tr><td>少人数</td><td>1人ひとりに目が行き届きやすい</td></tr>
<tr><td>入りやすい</td><td>認可保育所より空きがある場合が多い</td></tr>
<tr><td>家庭的な雰囲気</td><td>マンションの一室等を利用し、アットホームな環境</td></tr>
<tr><td>駅近が多い</td><td>志木駅・新座駅の近くに設置されているケースもある</td></tr>
</table>

<h2>「3歳の壁」に注意</h2>
<p>小規模保育は2歳児クラスまでのため、3歳になると<strong>転園</strong>が必要です。これを「3歳の壁」と呼びます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>新座市では小規模保育の卒園児に対して、連携先の認可保育所への優先入園枠を設けている場合があります。入園前に連携先の園を確認しましょう。</p>
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
<p>小規模保育の施設一覧は<a href="https://www.city.niiza.lg.jp/soshiki/93/" target="_blank" rel="noopener">新座市こども未来部保育課</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 50,
  },

  // =========================================================================
  // 8. 0歳vs1歳入園
  // =========================================================================
  {
    slug: "0sai-vs-1sai",
    citySlug: "niiza",
    title: "新座市は0歳入園と1歳入園どちらが有利？",
    description:
      "新座市の保育園は0歳入園と1歳入園どちらが入りやすい？メリット・デメリットを比較して解説します。",
    image: "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=800&h=400&fit=crop",
    category: "保育園選び",
    categoryColor: "rose",
    content: `<h2>0歳入園と1歳入園の比較</h2>
<p>新座市では0歳児クラス（4月1日時点で0歳）と1歳児クラスのどちらで入園するかで競争率が異なります。</p>

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
<p><strong>デメリット：</strong>1歳児クラスは激戦。40点では不承諾になるリスクが高い</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>新座市は東京に隣接しており、通勤利便性の高いエリアでは1歳児クラスの競争が激しくなります。0歳4月入園を検討する価値があります。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>各園の空き状況は<a href="https://www.city.niiza.lg.jp/soshiki/93/" target="_blank" rel="noopener">新座市こども未来部保育課</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 50,
  },

  // =========================================================================
  // 9. 認可外を活用した加点戦略
  // =========================================================================
  {
    slug: "ninkagai-katen-strategy",
    citySlug: "niiza",
    title: "新座市で認可外加点（+3点）を活用して認可を狙う方法",
    description:
      "新座市で認可外保育施設の利用による加点+3を活用して認可保育園に入る戦略と注意点を解説します。",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>認可外加点を使う戦略とは</h2>
<p>新座市では認可外保育施設に子どもを預けている場合に調整指数で<span class="highlight">+3点</span>が加算されます。40点で横並びになる中、この3点の差は大きいです。</p>

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
<p>「認可外保育施設に預けている」として+3の加点を得ます。</p>
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

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>認可外に預けると0〜2歳・非課税世帯なら月42,000円、3〜5歳なら月37,000円の無償化補助を受けられる場合があります。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>新座市内の認可外保育施設の一覧は<a href="https://www.city.niiza.lg.jp/soshiki/93/" target="_blank" rel="noopener">新座市こども未来部保育課</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 75,
  },

  // =========================================================================
  // 10. 新座市の保育園事情2026年度
  // =========================================================================
  {
    slug: "latest-trends-2026",
    citySlug: "niiza",
    title: "新座市の保育園事情　2026年度の最新動向",
    description:
      "新座市の2026年度保育園入園に関する最新動向。待機児童の状況や新設園情報をまとめました。",
    image: "https://images.unsplash.com/photo-1504711434969-e33886168d5c?w=800&h=400&fit=crop",
    category: "最新情報",
    categoryColor: "blue",
    content: `<h2>新座市の全体傾向</h2>
<p>新座市は人口約16.5万人の埼玉県南部のベッドタウンです。東京都練馬区・西東京市に隣接し、東武東上線・JR武蔵野線が利用できる通勤利便性の高い地域です。市内には認可保育園が約25か所あります。</p>

<h2>待機児童の状況</h2>
<p>新座市は近年、保育施設の整備を進めており、待機児童数は減少傾向にあります。ただし志木駅周辺の1歳児クラスでは依然として入園が難しい状況が続いています。</p>

<h2>エリア別の動向</h2>
<table>
<tr><th>エリア</th><th>状況</th></tr>
<tr><td>志木駅周辺</td><td>マンション開発が続き保育需要が高い。1歳児クラスは競争が激しい</td></tr>
<tr><td>新座駅周辺</td><td>新規園の開園が進み、比較的入りやすい傾向</td></tr>
<tr><td>ひばりヶ丘方面</td><td>園の数は少ないが、競争率はやや緩やか</td></tr>
</table>

<h2>今後の見通し</h2>
<p>新座市では子育て支援の拡充を進めており、保育施設の新設や既存園の定員拡大が計画されています。一方で少子化の影響もあり、エリアによっては定員割れの園も出始めています。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>最新の空き状況や新設園情報は新座市こども未来部保育課の窓口で確認できます。公式サイトも定期的にチェックしましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新の利用調整結果は<a href="https://www.city.niiza.lg.jp/soshiki/93/" target="_blank" rel="noopener">新座市こども未来部保育課</a>で公開されています。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 70,
  },
];

registerArticles(articles);
