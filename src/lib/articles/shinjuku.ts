import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  {
    slug: "hokatsu-schedule",
    citySlug: "shinjuku",
    title: "新宿区の保活スケジュール　令和8年度4月入園の流れ",
    description:
      "新宿区の認可保育園の申込時期・選考の流れ・結果通知の時期をわかりやすく解説。令和8年度4月入園のスケジュールを中心にまとめました。",
    image:
      "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>令和8年度（2026年度）4月入園のスケジュール</h2>
<p>新宿区の4月入園は<strong>一次利用調整</strong>と<strong>二次利用調整</strong>の2回に分かれています。</p>

<h3>一次利用調整</h3>
<table>
<tr><th>項目</th><th>日程</th></tr>
<tr><td>申込受付期間</td><td>令和7年11月上旬〜12月上旬</td></tr>
<tr><td>結果通知</td><td>令和8年1月下旬〜2月上旬</td></tr>
</table>

<h3>二次利用調整</h3>
<table>
<tr><th>項目</th><th>日程</th></tr>
<tr><td>申込受付期間</td><td>一次結果後〜令和8年2月中旬</td></tr>
<tr><td>結果通知</td><td>令和8年2月下旬〜3月上旬</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>一次で不承諾だった方は自動的に二次の対象になります。希望園の変更も可能です。</p>
</div>

<h2>いつから動き始めるべき？</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>4月〜5月：情報収集スタート</strong>
<p>新宿区の保育園の種類やエリアを調べましょう。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>6月〜9月：保育園見学</strong>
<p>気になる園に電話して予約。見学のベストシーズンです。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>10月：「申込みの手引き」を入手</strong>
<p>区が発行する保活ガイドブック。必ず確認しましょう。</p>
</div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content">
<strong>11月〜12月：申込書類の準備・提出</strong>
<p>就労証明書などの書類を揃えて提出します。</p>
</div>
</div>

<p>詳しくは<a href="https://www.city.shinjuku.lg.jp/kodomo/hoiku01_002099_00001.html" target="_blank" rel="noopener">新宿区公式サイト「入園（転園）申込み」</a>をご確認ください。</p>`,
    publishedAt: "2026-03-28",
    popularity: 55,
  },
  {
    slug: "tensuu-shikumi",
    citySlug: "shinjuku",
    title: "新宿区の保育園点数はどう決まる？基本指数と調整指数の仕組み",
    description:
      "新宿区の認可保育園入園に必要な「点数」の仕組みをわかりやすく解説。基本指数20点満点の計算方法と、調整指数を説明します。",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "点数の仕組み",
    categoryColor: "blue",
    content: `<h2>新宿区の点数計算の基本</h2>
<p>新宿区の保育園入園選考は、<strong>基本指数</strong>と<strong>調整指数</strong>の合計で決まります。</p>

<div class="formula">選考指数 = 基本指数（保護者1） + 基本指数（保護者2） + 調整指数</div>

<h3>基本指数とは</h3>
<p>基本指数は保護者それぞれの状況に応じて算出される点数で、<strong>1人あたり最大20点</strong>です。新宿区のフルタイムの定義は「月20日以上かつ月160時間以上の就労」です。</p>

<h3>就労の基本指数</h3>
<table>
<tr><th>勤務状況</th><th>点数</th></tr>
<tr><td>月20日以上・月160時間以上</td><td>20点</td></tr>
<tr><td>月20日以上・月140〜160時間</td><td>18点</td></tr>
<tr><td>月16日以上・月140時間以上</td><td>17点</td></tr>
<tr><td>月20日以上・月120〜140時間</td><td>16点</td></tr>
<tr><td>月16日以上・月120〜140時間</td><td>15点</td></tr>
<tr><td>月12日以上・月120時間以上</td><td>14点</td></tr>
<tr><td>月48時間以上</td><td>8点</td></tr>
</table>

<div class="info-box">
<p><strong>新宿区の特徴</strong></p>
<p>新宿区は月の日数と時間数の組み合わせで点数が決まります。1日8時間、週5日で約160時間となり、20点を獲得できます。</p>
</div>

<h3>調整指数の主な項目</h3>
<table>
<tr><th>項目</th><th>点数</th></tr>
<tr><td>ひとり親世帯で就労</td><td>+5</td></tr>
<tr><td>育休後の再入園</td><td>+4</td></tr>
<tr><td>認可外保育施設の利用</td><td>+3</td></tr>
<tr><td>きょうだいが在園中</td><td>+2</td></tr>
<tr><td>育休・産休からの復帰</td><td>+2</td></tr>
<tr><td>単身赴任</td><td>+2</td></tr>
<tr><td>区内保育士として勤務</td><td>+1</td></tr>
</table>`,
    publishedAt: "2026-03-28",
    popularity: 80,
  },
  {
    slug: "hoikuen-shurui",
    citySlug: "shinjuku",
    title: "新宿区の保育園の種類を解説　認可・認証・子ども園の違い",
    description:
      "新宿区で利用できる保育施設の種類を解説。認可保育園・認証保育所・認定こども園・地域型保育事業の違いや特徴を比較します。",
    image:
      "https://images.unsplash.com/photo-1587654780541-7f3b5e1e2e1e?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>新宿区の保育施設の種類</h2>
<p>新宿区には多様な保育施設があります。それぞれの特徴を理解しましょう。</p>

<h3>認可保育園</h3>
<p>国が定めた基準を満たし、区が利用調整を行う保育施設です。区立・私立があります。</p>

<h3>認定こども園（保育園機能）</h3>
<p>幼稚園と保育園の機能を持つ施設です。保育園機能を利用する場合は認可保育園と同じ利用調整を経ます。</p>

<h3>地域型保育事業</h3>
<p>小規模保育事業（定員6〜19名）や家庭的保育事業（定員5名以下）があり、主に0〜2歳児が対象です。</p>

<h3>認証保育所</h3>
<p>東京都独自の制度。認可保育園と比べて保育時間が柔軟で、駅前に多いのが特徴です。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>新宿区では区内で保育士として勤務する保護者に+1点の加算があります。保育士の方は必ず申告しましょう。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 45,
  },
  {
    slug: "katen-technique",
    citySlug: "shinjuku",
    title: "新宿区の保活で加点を増やす方法　調整指数の攻略ポイント",
    description:
      "新宿区の保育園入園選考で有利になる加点方法を解説。認可外保育施設の利用やきょうだい加点など、加点テクニックを紹介します。",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "点数の仕組み",
    categoryColor: "blue",
    content: `<h2>加点を増やす具体的な方法</h2>
<p>新宿区では基本指数40点の家庭が多いため、調整指数の差が当落を分けます。</p>

<h3>1. 認可外保育施設を利用する（+3点）</h3>
<p>認証保育所などの認可外保育施設に月48時間以上、有償で預けている場合、+3点が加算されます。新宿区は他の区に比べて加点が大きいのが特徴です。</p>

<h3>2. 育休後の再入園を狙う（+4点）</h3>
<p>以前に認可保育園に在園していて育休取得後に退園し、再度入園を希望する場合に+4点が加算されます。</p>

<h3>3. きょうだい加点を活用する（+2点）</h3>
<p>きょうだいが認可保育園に在園中、または同時申込の場合に+2点が加算されます。</p>

<h3>4. 育休・産休から復帰する（+2点）</h3>
<p>入園月中に職場復帰する場合、+2点が加算されます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>新宿区の調整指数は17の加算項目と4の減算項目があります。減算の中で「区外住民登録」は-4点と大きいため、新宿区で保活をする場合は転入届を早めに出すことが重要です。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 70,
  },
  {
    slug: "hitsuyou-shorui",
    citySlug: "shinjuku",
    title: "新宿区の保育園申込に必要な書類一覧と準備のコツ",
    description:
      "新宿区の認可保育園に申し込むときに必要な書類を一覧で紹介。就労証明書の準備方法や提出方法を解説します。",
    image:
      "https://images.unsplash.com/photo-1568667256549-094345857637?w=800&h=400&fit=crop",
    category: "申込の準備",
    categoryColor: "amber",
    content: `<h2>申込に必要な書類</h2>

<h3>全員が提出する書類</h3>
<ul>
<li>入園申込書（エントリーシート）</li>
<li>保育を必要とすることを証明する書類（保護者それぞれ）</li>
<li>マイナンバー関連書類</li>
</ul>

<h3>就労している場合</h3>
<ul>
<li><strong>就労証明書</strong>（勤務先に記入してもらう）</li>
<li>自営業の場合は就労状況申告書と確定申告書の写し</li>
</ul>

<h3>提出方法</h3>
<p>新宿区では窓口・郵送のほか、電子申請にも対応しています。窓口は区役所本庁舎2階14番窓口（保育課入園・認定係）です。</p>

<div class="point-box">
<p><strong>就労証明書のコツ</strong></p>
<p>勤務先への依頼は2〜3週間前に行いましょう。新宿区の様式は区のホームページからダウンロードできます。</p>
</div>

<p>書式のダウンロードは<a href="https://www.city.shinjuku.lg.jp/kodomo/file18_00002.html" target="_blank" rel="noopener">新宿区公式サイト「申請書のダウンロード」</a>からどうぞ。</p>`,
    publishedAt: "2026-03-28",
    popularity: 50,
  },
  {
    slug: "hoikuryo",
    citySlug: "shinjuku",
    title: "新宿区の保育料はいくら？世帯年収別の目安と無償化の条件",
    description:
      "新宿区の認可保育園の保育料を世帯年収別にわかりやすく解説。3歳以上の無償化や多子世帯の軽減制度について説明します。",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "お金のこと",
    categoryColor: "amber",
    content: `<h2>保育料の決まり方</h2>
<p>新宿区の認可保育園の保育料は、<strong>世帯の住民税額</strong>と<strong>子どもの年齢</strong>に応じて決まります。</p>

<h3>保育料の目安</h3>
<table>
<tr><th>世帯年収の目安</th><th>0〜2歳児クラス（月額）</th></tr>
<tr><td>〜約260万円</td><td>0〜4,000円</td></tr>
<tr><td>約260万〜約470万円</td><td>8,000〜18,000円</td></tr>
<tr><td>約470万〜約640万円</td><td>18,000〜30,000円</td></tr>
<tr><td>約640万〜約930万円</td><td>30,000〜50,000円</td></tr>
<tr><td>約930万円〜</td><td>50,000〜69,000円</td></tr>
</table>

<h3>3歳以上は無償化</h3>
<p>3〜5歳児クラスの保育料は<strong>無料</strong>です。ただし給食費（副食費）は別途かかります。</p>

<h3>多子世帯の軽減</h3>
<p>きょうだいが保育施設を利用している場合、2人目は半額、3人目以降は無料です。</p>`,
    publishedAt: "2026-03-28",
    popularity: 60,
  },
  {
    slug: "ninki-area",
    citySlug: "shinjuku",
    title: "新宿区で保育園に入りやすいエリアは？地域別の競争率",
    description:
      "新宿区の保育園の入りやすさを地域別に解説。四谷・市谷・高田馬場・落合エリアなど、各地域の競争率の傾向を紹介します。",
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=400&fit=crop",
    category: "エリア情報",
    categoryColor: "purple",
    content: `<h2>新宿区の保育園事情</h2>
<p>新宿区は都心部に位置しますが、地域によって保育園の入りやすさには差があります。</p>

<h3>競争率が高い傾向のエリア</h3>
<ul>
<li><strong>四谷・市谷エリア</strong>：子育て世帯に人気のエリア</li>
<li><strong>神楽坂エリア</strong>：住環境が良く、園の数に対して申込が多い</li>
</ul>

<h3>比較的入りやすい傾向のエリア</h3>
<ul>
<li><strong>落合・中井エリア</strong>：住宅地で比較的競争率が穏やか</li>
<li><strong>高田馬場・戸山エリア</strong>：園の数が多く、選択肢が広い</li>
<li><strong>西新宿エリア</strong>：タワーマンション開発に伴い新設園も</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>新宿区では空き状況・申込み状況を公式サイトで公開しています。希望園を決める際の参考にしましょう。</p>
</div>

<p>最新の空き状況は<a href="https://www.city.shinjuku.lg.jp/kodomo/file04_07_00034.html" target="_blank" rel="noopener">新宿区公式サイト</a>で確認できます。</p>`,
    publishedAt: "2026-03-28",
    popularity: 65,
  },
  {
    slug: "0sai-nyuen",
    citySlug: "shinjuku",
    title: "新宿区の0歳児入園ガイド　生まれ月ごとの申込タイミング",
    description:
      "新宿区で0歳児クラスに入園するためのポイントを解説。生まれ月別の最適な申込タイミングを説明します。",
    image:
      "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=800&h=400&fit=crop",
    category: "年齢別ガイド",
    categoryColor: "rose",
    content: `<h2>0歳児入園の基本</h2>
<p>新宿区の認可保育園の0歳児クラスは、園により<strong>生後57日</strong>から、または<strong>生後5ヶ月</strong>から受入れています。</p>

<h3>生まれ月と申込タイミング</h3>
<table>
<tr><th>生まれ月</th><th>4月入園の場合</th></tr>
<tr><td>4〜9月生まれ</td><td>4月入園が可能。一次利用調整に申込できる</td></tr>
<tr><td>10〜12月生まれ</td><td>園の受入月齢を要確認。4月入園が可能な場合も</td></tr>
<tr><td>1〜3月生まれ</td><td>4月入園は難しい。途中入園か1歳4月を検討</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>0歳児枠は定員が少ないですが、1歳児枠は持ち上がりでさらに少なくなります。家庭の状況に合わせて、0歳入園も検討してみてください。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 50,
  },
  {
    slug: "tochuu-nyuen",
    citySlug: "shinjuku",
    title: "新宿区の保育園に途中入園するには？空き状況と手続き",
    description:
      "新宿区の保育園への途中入園について解説。空き状況の確認方法と申込の流れを紹介します。",
    image:
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>途中入園の申込方法</h2>
<p>4月以外の月に入園を希望する場合も、毎月受け付けています。</p>

<h3>申込の流れ</h3>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>空き状況を確認</strong>
<p>新宿区公式サイトで月ごとの空き状況が公開されています。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>必要書類を準備して提出</strong>
<p>4月入園と同じ書類が必要です。</p>
</div>
</div>

<h3>入りやすい時期</h3>
<ul>
<li><strong>5月〜6月</strong>：4月の辞退による空きが出やすい</li>
<li><strong>10月</strong>：転勤シーズンに伴う空きが出やすい</li>
</ul>

<p>空き状況は<a href="https://www.city.shinjuku.lg.jp/kodomo/file04_07_00034.html" target="_blank" rel="noopener">新宿区公式サイト</a>で確認できます。</p>`,
    publishedAt: "2026-03-28",
    popularity: 40,
  },
  {
    slug: "same-score-tiebreaker",
    citySlug: "shinjuku",
    title: "新宿区で同点のとき何で決まる？利用調整の優先順位",
    description:
      "新宿区の保育園選考で同じ点数になった場合の優先順位を解説。きょうだい在園の優先度が高い新宿区の特徴を説明します。",
    image:
      "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=800&h=400&fit=crop",
    category: "点数の仕組み",
    categoryColor: "blue",
    content: `<h2>同点の場合の優先順位</h2>
<p>新宿区の保育園入園選考では、指数が同点の場合、以下の基準で利用調整が行われます。</p>

<h3>主な優先基準</h3>
<ol>
<li>保育の必要度が高い世帯</li>
<li>新宿区在住の世帯</li>
<li>所得が低い世帯</li>
<li>きょうだいが在園している世帯</li>
<li>待機期間が長い世帯</li>
</ol>

<div class="info-box">
<p><strong>新宿区の特徴</strong></p>
<p>新宿区では、きょうだいが在園中の場合の優先度が比較的高く設定されています。上のお子さんと同じ園を希望する場合は有利になりやすい傾向があります。</p>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>基本指数40点＋認可外利用+3点 = 43点が多くの家庭のスタートラインです。育休復帰の+2点も加えた45点が内定の目安になります。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 75,
  },
];

registerArticles(articles);
