import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  {
    slug: "hokatsu-schedule",
    citySlug: "shibuya",
    title: "渋谷区の保活スケジュール　令和8年度4月入園の流れ",
    description:
      "渋谷区の認可保育園の申込時期・選考の流れ・結果通知の時期をわかりやすく解説。令和8年度4月入園のスケジュールを中心にまとめました。",
    image:
      "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>令和8年度（2026年度）4月入園のスケジュール</h2>
<p>渋谷区の4月入園は<strong>一次募集</strong>と<strong>二次募集</strong>の2回に分かれています。</p>

<h3>一次募集</h3>
<table>
<tr><th>項目</th><th>日程</th></tr>
<tr><td>入園案内配布開始</td><td>令和7年9月29日（月）</td></tr>
<tr><td>申込受付期間</td><td>令和7年10月23日（木）〜11月28日（金）</td></tr>
<tr><td>結果通知</td><td>令和8年2月2日（月）発送予定</td></tr>
</table>

<h3>二次募集</h3>
<table>
<tr><th>項目</th><th>日程</th></tr>
<tr><td>申込受付期間</td><td>一次結果発送後〜令和8年2月中旬</td></tr>
<tr><td>結果通知</td><td>令和8年2月下旬</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>一次で不承諾だった方は自動的に二次募集の対象になります。希望園の変更も可能です。</p>
</div>

<h2>いつから動き始めるべき？</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>4月〜5月：情報収集スタート</strong>
<p>渋谷区の保育園の種類やエリアを調べましょう。</p>
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
<strong>9月末〜10月：入園案内を入手</strong>
<p>区が発行する入園案内を入手し、しっかり読みましょう。</p>
</div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content">
<strong>10月〜11月：申込書類の準備・提出</strong>
<p>就労証明書などの書類を揃えて提出します。</p>
</div>
</div>

<p>詳しくは<a href="https://www.city.shibuya.tokyo.jp/kodomo/hoiku/hoikuen-nyuen/hoiku_boshu2026.html" target="_blank" rel="noopener">渋谷区公式サイト「令和8年度入園申し込み」</a>をご確認ください。</p>`,
    publishedAt: "2026-03-28",
    popularity: 55,
  },
  {
    slug: "tensuu-shikumi",
    citySlug: "shibuya",
    title: "渋谷区の保育園点数はどう決まる？基本指数と調整指数の仕組み",
    description:
      "渋谷区の認可保育園入園に必要な「点数」の仕組みをわかりやすく解説。基本指数20点満点の計算方法と、加点・減点される調整指数を説明します。",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "点数の仕組み",
    categoryColor: "blue",
    content: `<h2>渋谷区の点数計算の基本</h2>
<p>渋谷区の保育園入園選考は、<strong>基本指数</strong>と<strong>調整指数</strong>の合計で決まります。</p>

<div class="formula">選考指数 = 基本指数（保護者1） + 基本指数（保護者2） + 調整指数</div>

<h3>基本指数とは</h3>
<p>基本指数は保護者それぞれの状況に応じて算出される点数で、<strong>1人あたり最大20点</strong>です。両親ともにフルタイム勤務の場合、20 + 20 = 40点が基本指数の合計になります。</p>

<h3>就労の基本指数</h3>
<table>
<tr><th>勤務状況</th><th>点数</th></tr>
<tr><td>週5日以上・1日8時間以上（月20日以上）</td><td>20点</td></tr>
<tr><td>週5日以上・1日6〜8時間</td><td>18点</td></tr>
<tr><td>週4日・1日8時間以上</td><td>17点</td></tr>
<tr><td>週5日以上・1日4〜6時間</td><td>16点</td></tr>
<tr><td>週4日・1日6〜8時間</td><td>15点</td></tr>
<tr><td>週3日以上・1日8時間以上</td><td>14点</td></tr>
<tr><td>月48時間以上</td><td>8点</td></tr>
</table>

<h3>調整指数の主な項目</h3>
<table>
<tr><th>項目</th><th>点数</th></tr>
<tr><td>ひとり親世帯で就労</td><td>+6</td></tr>
<tr><td>常時介護が必要な同居親族あり</td><td>+4</td></tr>
<tr><td>認可外保育施設の利用</td><td>+2</td></tr>
<tr><td>きょうだいが在園中</td><td>+2</td></tr>
<tr><td>6ヶ月以上の就労実績</td><td>+1</td></tr>
</table>

<div class="info-box">
<p><strong>渋谷区の特徴</strong></p>
<p>渋谷区の調整指数は全22項目（加算18項目・減算4項目）と細かく設定されています。保育料の滞納は-6点と大きな減点になるため注意が必要です。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 80,
  },
  {
    slug: "hoikuen-shurui",
    citySlug: "shibuya",
    title: "渋谷区の保育園の種類を解説　認可・認証・幼保一元化施設の違い",
    description:
      "渋谷区で利用できる保育施設の種類を解説。認可保育園・認証保育所・幼保一元化施設・認定こども園の違いや特徴を比較します。",
    image:
      "https://images.unsplash.com/photo-1587654780541-7f3b5e1e2e1e?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>渋谷区の保育施設の種類</h2>
<p>渋谷区には独自の「幼保一元化施設」を含め、複数の種類の保育施設があります。</p>

<h3>認可保育園</h3>
<p>国が定めた基準を満たし、区が利用調整（選考）を行う保育施設です。区立・私立があります。</p>

<h3>認定こども園</h3>
<p>幼稚園と保育園の機能を併せ持つ施設です。長時間保育（保育園機能）を利用する場合は認可保育園と同じ利用調整を経ます。</p>

<h3>幼保一元化施設</h3>
<p>渋谷区独自の施設で、0〜5歳児の保育と幼児教育を一体的に行います。長時間保育を利用する場合は認可保育園と同じ利用調整の対象です。</p>

<h3>認証保育所</h3>
<p>東京都独自の制度による保育施設です。渋谷区では認可外保育施設の保育料助成制度があります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>渋谷区の幼保一元化施設は、認可保育園と同じ基準で選考されます。選択肢に入れると希望園の幅が広がります。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 45,
  },
  {
    slug: "katen-technique",
    citySlug: "shibuya",
    title: "渋谷区の保活で加点を増やす方法　調整指数の攻略ポイント",
    description:
      "渋谷区の保育園入園選考で有利になる加点方法を解説。認可外保育施設の利用や受託加算など、加点のテクニックを紹介します。",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "点数の仕組み",
    categoryColor: "blue",
    content: `<h2>加点を増やす具体的な方法</h2>
<p>渋谷区では基本指数40点の家庭が多いため、調整指数の差が当落を分けます。</p>

<h3>1. 認可外保育施設を利用する（+2点）</h3>
<p>認証保育所などの認可外保育施設に月ぎめで預けている場合、+2点が加算されます。</p>

<h3>2. 受託加算を狙う</h3>
<p>渋谷区には「受託加算」の条件があります。一定の条件を満たすと加算されます。詳細は渋谷区公式サイトで確認してください。</p>

<h3>3. 就労実績を積む（+1点）</h3>
<p>現在の勤務先で6ヶ月以上の就労実績がある場合、+1点が加算されます。転職のタイミングに注意が必要です。</p>

<h3>4. 減点を避ける</h3>
<ul>
<li>保育料の滞納：-6点（大きな減点）</li>
<li>同居祖父母が保育可能：-2点</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>渋谷区では保育料の滞納が-6点と非常に大きな減点になります。上のお子さんの保育料は必ず期限内に支払いましょう。</p>
</div>

<p>受託加算の詳細は<a href="https://www.city.shibuya.tokyo.jp/kodomo/hoiku/chosa-kijun/jutaku_joken.html" target="_blank" rel="noopener">渋谷区公式サイト「受託加算の条件」</a>をご確認ください。</p>`,
    publishedAt: "2026-03-28",
    popularity: 70,
  },
  {
    slug: "hitsuyou-shorui",
    citySlug: "shibuya",
    title: "渋谷区の保育園申込に必要な書類一覧と準備のコツ",
    description:
      "渋谷区の認可保育園に申し込むときに必要な書類を一覧で紹介。就労証明書の準備方法や提出方法について解説します。",
    image:
      "https://images.unsplash.com/photo-1568667256549-094345857637?w=800&h=400&fit=crop",
    category: "申込の準備",
    categoryColor: "amber",
    content: `<h2>申込に必要な書類</h2>
<p>渋谷区の認可保育園への申込には、以下の書類が必要です。</p>

<h3>全員が提出する書類</h3>
<ul>
<li>施設型給付費等教育・保育給付認定申請書兼保育利用申込書</li>
<li>保育を必要とすることを証明する書類（保護者それぞれ）</li>
<li>マイナンバー関連書類</li>
</ul>

<h3>就労している場合</h3>
<ul>
<li><strong>就労証明書</strong>（勤務先に記入してもらう）</li>
<li>自営業の場合は就労状況申告書と確定申告書の写し</li>
</ul>

<h3>提出方法</h3>
<p>渋谷区では<strong>郵送</strong>と<strong>窓口</strong>で受け付けています。令和8年度からはオンライン申請も対応しています。</p>

<div class="point-box">
<p><strong>就労証明書のコツ</strong></p>
<p>就労証明書は令和7年9月16日からダウンロード可能です。勤務先への依頼は早めに行いましょう。</p>
</div>

<p>書式のダウンロードは<a href="https://www.city.shibuya.tokyo.jp/kodomo/hoiku/hoikuen-nyuen/nyuen_syoshiki.html" target="_blank" rel="noopener">渋谷区公式サイト「入園案内・各種書式」</a>からどうぞ。</p>`,
    publishedAt: "2026-03-28",
    popularity: 50,
  },
  {
    slug: "hoikuryo",
    citySlug: "shibuya",
    title: "渋谷区の保育料はいくら？世帯年収別の目安と無償化の条件",
    description:
      "渋谷区の認可保育園の保育料を世帯年収別にわかりやすく解説。3歳以上の無償化や保育料軽減制度について説明します。",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "お金のこと",
    categoryColor: "amber",
    content: `<h2>保育料の決まり方</h2>
<p>渋谷区の認可保育園の保育料は、<strong>世帯の住民税額</strong>と<strong>子どもの年齢</strong>に応じて決まります。</p>

<h3>保育料の目安</h3>
<table>
<tr><th>世帯年収の目安</th><th>0〜2歳児クラス（月額）</th></tr>
<tr><td>〜約260万円</td><td>0〜5,000円</td></tr>
<tr><td>約260万〜約470万円</td><td>8,000〜18,000円</td></tr>
<tr><td>約470万〜約640万円</td><td>18,000〜32,000円</td></tr>
<tr><td>約640万〜約930万円</td><td>32,000〜50,000円</td></tr>
<tr><td>約930万円〜</td><td>50,000〜73,000円</td></tr>
</table>

<h3>3歳以上は無償化</h3>
<p>3〜5歳児クラスの保育料は、幼児教育・保育の無償化により<strong>無料</strong>です。ただし、給食費は別途かかります。</p>

<h3>保育料の軽減制度</h3>
<p>渋谷区では、認可外保育施設を利用する場合に保育料の助成制度があります。詳しくは<a href="https://www.city.shibuya.tokyo.jp/kodomo/kodomo-teate-josei/hoiku-josei/hoikuryo_keigen.html" target="_blank" rel="noopener">渋谷区公式サイト「保育利用料の軽減制度」</a>をご確認ください。</p>`,
    publishedAt: "2026-03-28",
    popularity: 60,
  },
  {
    slug: "ninki-area",
    citySlug: "shibuya",
    title: "渋谷区で保育園に入りやすいエリアは？地域別の競争率",
    description:
      "渋谷区の保育園の入りやすさを地域別に解説。恵比寿・代官山・神宮前・笹塚エリアなど、各地域の競争率の傾向を紹介します。",
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=400&fit=crop",
    category: "エリア情報",
    categoryColor: "purple",
    content: `<h2>渋谷区の保育園事情</h2>
<p>渋谷区は都心に位置し、保育園の入園競争率は東京23区の中でも高い区のひとつです。</p>

<h3>競争率が高い傾向のエリア</h3>
<ul>
<li><strong>恵比寿・代官山エリア</strong>：子育て世帯に人気で、園の数に対して申込が多い</li>
<li><strong>神宮前・表参道エリア</strong>：利便性が高く、希望者が集中しやすい</li>
</ul>

<h3>比較的入りやすい傾向のエリア</h3>
<ul>
<li><strong>笹塚・幡ヶ谷エリア</strong>：新設園の開園により改善傾向</li>
<li><strong>本町・初台エリア</strong>：比較的落ち着いたエリアで競争率が穏やか</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>渋谷区は全体的に競争率が高いため、希望園を多めに書くことが重要です。第10希望まで書ける場合は、できるだけ多く記入しましょう。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 65,
  },
  {
    slug: "0sai-nyuen",
    citySlug: "shibuya",
    title: "渋谷区の0歳児入園ガイド　生まれ月ごとの申込タイミング",
    description:
      "渋谷区で0歳児クラスに入園するためのポイントを解説。生まれ月別の最適な申込タイミングや産休・育休との関係を説明します。",
    image:
      "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=800&h=400&fit=crop",
    category: "年齢別ガイド",
    categoryColor: "rose",
    content: `<h2>0歳児入園の基本</h2>
<p>渋谷区の認可保育園の0歳児クラスは、園により受入月齢が異なります。<strong>生後57日（生後2ヶ月）</strong>から受入れの園が多いですが、生後5ヶ月からの園もあります。</p>

<h3>生まれ月と申込タイミング</h3>
<table>
<tr><th>生まれ月</th><th>4月入園の場合</th></tr>
<tr><td>4〜9月生まれ</td><td>4月入園が可能。一次募集に申込できる</td></tr>
<tr><td>10〜12月生まれ</td><td>4月時点の月齢による。園の受入月齢を要確認</td></tr>
<tr><td>1〜3月生まれ</td><td>4月入園は難しい。途中入園か1歳4月を狙う</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>渋谷区では0歳児枠の定員は少ないですが、1歳児枠は持ち上がりでさらに狭き門になります。早めの入園を検討する価値があります。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 50,
  },
  {
    slug: "tochuu-nyuen",
    citySlug: "shibuya",
    title: "渋谷区の保育園に途中入園するには？手続きと空き状況の確認方法",
    description:
      "渋谷区の保育園への途中入園について解説。空き状況の確認方法、申込の流れ、入りやすい時期を紹介します。",
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
<p>渋谷区公式サイトで月ごとの空き状況が公開されています。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>必要書類を準備して提出</strong>
<p>入園希望月の前月10日頃が締切です。</p>
</div>
</div>

<h3>入りやすい時期</h3>
<ul>
<li><strong>5月〜6月</strong>：4月の辞退による空きが出ることがある</li>
<li><strong>10月</strong>：転勤シーズンの空き</li>
</ul>

<p>空き状況は<a href="https://www.city.shibuya.tokyo.jp/kodomo/hoiku/hoikuen-nyuen/hoiku_aki.html" target="_blank" rel="noopener">渋谷区公式サイト</a>で確認できます。</p>`,
    publishedAt: "2026-03-28",
    popularity: 40,
  },
  {
    slug: "same-score-tiebreaker",
    citySlug: "shibuya",
    title: "渋谷区で同点のとき何で決まる？利用調整の優先順位",
    description:
      "渋谷区の保育園選考で同じ点数になった場合の優先順位を解説。渋谷区独自の11段階の優先基準を説明します。",
    image:
      "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=800&h=400&fit=crop",
    category: "点数の仕組み",
    categoryColor: "blue",
    content: `<h2>同点の場合の優先順位</h2>
<p>渋谷区では、指数が同点の場合、<strong>11段階の優先順位</strong>で利用調整が行われます。</p>

<h3>主な優先基準</h3>
<ol>
<li>渋谷区民で新規入園の方が優先</li>
<li>渋谷区民で転園の方</li>
<li>転入予定の方</li>
<li>保育の必要度が高い世帯</li>
<li>きょうだいが在園している世帯</li>
<li>所得が低い世帯</li>
</ol>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>渋谷区では「渋谷区民」であることが最も重要な優先基準です。転入予定の方は区民より不利になります。引っ越し予定がある場合は、転入届を早めに出すことを検討しましょう。</p>
</div>

<p>詳しくは<a href="https://www.city.shibuya.tokyo.jp/kodomo/hoiku/hoikuen-nyuen/hoiku_boshu2026.html" target="_blank" rel="noopener">渋谷区公式サイト</a>でご確認ください。</p>`,
    publishedAt: "2026-03-28",
    popularity: 75,
  },
];

registerArticles(articles);
