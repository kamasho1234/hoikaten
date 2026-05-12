import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  // ===== 保活の基本 (1) =====
  {
    slug: "hokatsu-schedule",
    citySlug: "meguro",
    title: "目黒区の保活スケジュール　令和8年度4月入園の流れ",
    description:
      "目黒区の認可保育園の申込時期・選考の流れ・結果通知の時期をわかりやすく解説。令和8年度4月入園のスケジュールを中心にまとめました。",
    image:
      "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>令和8年度（2026年度）4月入園のスケジュール</h2>
<p>目黒区の4月入園は<strong>一次利用調整</strong>と<strong>二次利用調整</strong>の2回に分かれています。</p>

<h3>一次利用調整</h3>
<table>
<tr><th>項目</th><th>日程</th></tr>
<tr><td>申込受付期間</td><td>令和7年10月下旬〜11月26日（水）</td></tr>
<tr><td>結果通知</td><td>令和8年1月下旬（全員に郵送）</td></tr>
</table>

<h3>二次利用調整</h3>
<table>
<tr><th>項目</th><th>日程</th></tr>
<tr><td>申込受付期間</td><td>令和8年1月下旬〜2月9日（月）</td></tr>
<tr><td>結果通知</td><td>令和8年2月下旬</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>一次で不承諾だった方は自動的に二次の対象になります。再申込は不要ですが、希望園の変更は可能です。</p>
</div>

<h2>いつから動き始めるべき？</h2>

<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>4月〜5月：情報収集スタート</strong>
<p>目黒区の保育園の種類やエリアを調べましょう。</p>
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
<strong>9月〜10月：「保育施設利用のご案内」を入手</strong>
<p>区が発行する保活ガイドブック。必ず確認しましょう。</p>
</div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content">
<strong>10月〜11月：申込書類の準備・提出</strong>
<p>就労証明書などの書類を揃えて提出します。</p>
</div>
</div>

<h2>途中入園（5月〜3月）の申込</h2>
<p>各月の申込締切日は、入園希望月の<span class="highlight">前月8日頃</span>です。ただし締切日が土日祝の場合は変更されます。</p>
<p>詳しくは<a href="https://www.city.meguro.tokyo.jp/hoiku/kosodatekyouiku/hoikuennado/nagare.html" target="_blank" rel="noopener">目黒区公式サイト「申込みから入所までの流れ」</a>をご確認ください。</p>`,
    publishedAt: "2026-03-28",
    popularity: 55,
  },
  // ===== 点数の仕組み (2) =====
  {
    slug: "tensuu-shikumi",
    citySlug: "meguro",
    title: "目黒区の保育園点数はどう決まる？基本指数と調整指数の仕組み",
    description:
      "目黒区の認可保育園入園に必要な「点数」の仕組みをわかりやすく解説。基本指数20点満点の計算方法と、加点・減点される調整指数を説明します。",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "点数の仕組み",
    categoryColor: "blue",
    content: `<h2>目黒区の点数計算の基本</h2>
<p>目黒区の保育園入園選考は、<strong>基本指数</strong>と<strong>調整指数</strong>の合計で決まります。</p>

<div class="formula">選考指数 = 基本指数（保護者1） + 基本指数（保護者2） + 調整指数</div>

<h3>基本指数とは</h3>
<p>基本指数は保護者それぞれの状況（就労・疾病・障害など）に応じて算出される点数で、<strong>1人あたり最大20点</strong>です。両親ともにフルタイム勤務の場合、20 + 20 = 40点が基本指数の合計になります。</p>

<h3>就労の基本指数</h3>
<table>
<tr><th>勤務状況</th><th>点数</th></tr>
<tr><td>週5日以上かつ1日7時間以上</td><td>20点</td></tr>
<tr><td>週5日以上かつ1日4〜7時間</td><td>18点</td></tr>
<tr><td>週4日かつ1日7時間以上</td><td>16点</td></tr>
<tr><td>週4日かつ1日4〜7時間</td><td>14点</td></tr>
<tr><td>週3日かつ1日7時間以上</td><td>12点</td></tr>
<tr><td>週3日かつ1日4〜7時間</td><td>10点</td></tr>
<tr><td>月48時間以上</td><td>8点</td></tr>
</table>

<div class="info-box">
<p><strong>目黒区の特徴</strong></p>
<p>目黒区のフルタイムの定義は「週5日かつ1日7時間以上」です。他の区が「1日8時間以上」としているケースが多いなか、目黒区は7時間からフルタイムとなるのが特徴です。</p>
</div>

<h3>調整指数とは</h3>
<p>家庭の状況に応じて加算・減算される点数です。</p>
<table>
<tr><th>項目</th><th>点数</th></tr>
<tr><td>ひとり親世帯</td><td>+10</td></tr>
<tr><td>認可外保育施設の利用</td><td>+2</td></tr>
<tr><td>きょうだい別園で転園希望</td><td>+2</td></tr>
<tr><td>生活保護・非課税世帯</td><td>+2</td></tr>
<tr><td>同居親族が保育可能</td><td>-2</td></tr>
<tr><td>利用内定辞退</td><td>-1</td></tr>
</table>

<p>詳しくは<a href="https://www1.g-reiki.net/meguro/reiki_honbun/g111RG00000664.html" target="_blank" rel="noopener">目黒区保育の利用の調整に関する規則</a>をご確認ください。</p>`,
    publishedAt: "2026-03-28",
    popularity: 80,
  },
  // ===== 保育園の種類 (3) =====
  {
    slug: "hoikuen-shurui",
    citySlug: "meguro",
    title: "目黒区の保育園の種類を解説　認可・認証・小規模の違い",
    description:
      "目黒区で利用できる保育施設の種類を解説。認可保育園・認証保育所・小規模保育・家庭的保育事業の違いや特徴を比較します。",
    image:
      "https://images.unsplash.com/photo-1587654780541-7f3b5e1e2e1e?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>目黒区の保育施設の種類</h2>
<p>目黒区には複数の種類の保育施設があります。それぞれの特徴を理解して、家庭に合った施設を選びましょう。</p>

<h3>認可保育園</h3>
<p>国が定めた基準を満たし、都道府県知事の認可を受けた保育施設です。区が利用調整（選考）を行います。</p>
<ul>
<li>保育料は世帯の住民税額に応じて決定</li>
<li>0歳〜5歳（施設により異なる）</li>
<li>区立・私立がある</li>
</ul>

<h3>認証保育所</h3>
<p>東京都独自の制度で、都が定めた基準を満たした保育施設です。</p>
<ul>
<li>保育料は施設が設定（上限あり）</li>
<li>目黒区では認可外保育施設保育料助成制度あり</li>
<li>認可保育園に入れなかった場合の選択肢として人気</li>
</ul>

<h3>小規模保育事業</h3>
<p>0〜2歳児を対象に、定員6〜19名の少人数で保育を行う施設です。</p>
<ul>
<li>認可保育園と同じ利用調整を経て入園</li>
<li>3歳以降の行き先（連携施設）の確認が重要</li>
</ul>

<h3>家庭的保育事業（保育ママ）</h3>
<p>家庭的保育者の自宅などで、0〜2歳の子どもを5名以下の少人数で保育します。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>小規模保育や家庭的保育は、認可保育園に比べて入りやすい傾向があります。3歳以降の転園を見据えたうえで検討しましょう。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 45,
  },
  // ===== 加点テクニック (4) =====
  {
    slug: "katen-technique",
    citySlug: "meguro",
    title: "目黒区の保活で加点を増やす方法　調整指数の攻略ポイント",
    description:
      "目黒区の保育園入園選考で有利になる加点方法を解説。認可外保育施設の利用やきょうだい加点など、合法的にできる加点テクニックを紹介します。",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "点数の仕組み",
    categoryColor: "blue",
    content: `<h2>加点を増やす具体的な方法</h2>
<p>基本指数が同点の家庭は多いため、<strong>調整指数</strong>の差が当落を分けます。目黒区で合法的に加点を増やす方法を解説します。</p>

<h3>1. 認可外保育施設を利用する（+2点）</h3>
<p>認可外保育施設（認証保育所・ベビーホテルなど）に<strong>週3日以上・1日4時間以上・1ヶ月以上</strong>有償で預けている場合、+2点が加算されます。</p>

<div class="info-box">
<p><strong>注意</strong></p>
<p>ベビーシッター利用は対象外です。施設型の認可外保育に月ぎめで預ける必要があります。</p>
</div>

<h3>2. きょうだい加点を活用する（+2点）</h3>
<p>きょうだいが<strong>複数の認可保育施設に分かれて在園</strong>しており、転園を希望する場合に+2点が加算されます。</p>

<h3>3. 家庭的保育事業の利用（+2点）</h3>
<p>家庭的保育事業（保育ママ）を1ヶ月以上利用している場合も+2点が加算されます。小規模保育事業も同様です。</p>

<h3>4. 減点を避ける</h3>
<p>以下に該当すると減点されるため注意が必要です。</p>
<ul>
<li>同居親族が保育可能な場合：-2点</li>
<li>就労開始1ヶ月未満：-1点</li>
<li>過去に利用内定を辞退した場合：-1点</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>目黒区ではひとり親世帯への加点が+10点と大きいのが特徴です。該当する場合は必ず申告しましょう。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 70,
  },
  // ===== 必要書類 (5) =====
  {
    slug: "hitsuyou-shorui",
    citySlug: "meguro",
    title: "目黒区の保育園申込に必要な書類一覧と準備のコツ",
    description:
      "目黒区の認可保育園に申し込むときに必要な書類を一覧で紹介。就労証明書の書き方や注意点もあわせて解説します。",
    image:
      "https://images.unsplash.com/photo-1568667256549-094345857637?w=800&h=400&fit=crop",
    category: "申込の準備",
    categoryColor: "amber",
    content: `<h2>申込に必要な書類</h2>
<p>目黒区の認可保育園への申込には、以下の書類が必要です。</p>

<h3>全員が提出する書類</h3>
<ul>
<li>保育施設利用申込書</li>
<li>保育を必要とすることを証明する書類（保護者それぞれ1通）</li>
<li>マイナンバー関連書類</li>
</ul>

<h3>就労している場合</h3>
<ul>
<li><strong>就労証明書</strong>（勤務先に記入してもらう）</li>
<li>自営業の場合は就労状況申告書と確定申告書の写し</li>
</ul>

<h3>その他、該当する場合に必要な書類</h3>
<ul>
<li>診断書（疾病・障害の場合）</li>
<li>在学証明書（就学の場合）</li>
<li>ひとり親であることを証明する書類（児童扶養手当証書など）</li>
<li>認可外保育施設の利用証明書（加点を希望する場合）</li>
</ul>

<div class="point-box">
<p><strong>就労証明書のコツ</strong></p>
<p>勤務先への依頼は早めに。繁忙期は2週間以上かかることもあります。目黒区の様式は区のホームページからダウンロードできます。</p>
</div>

<p>様式のダウンロードは<a href="https://www.city.meguro.tokyo.jp/hoiku/kosodatekyouiku/hoikuennado/moushikomiannai.html" target="_blank" rel="noopener">目黒区公式サイト「保育施設利用のご案内」</a>からどうぞ。</p>`,
    publishedAt: "2026-03-28",
    popularity: 50,
  },
  // ===== 保育料 (6) =====
  {
    slug: "hoikuryo",
    citySlug: "meguro",
    title: "目黒区の保育料はいくら？世帯年収別の目安と無償化の条件",
    description:
      "目黒区の認可保育園の保育料を世帯年収別にわかりやすく解説。3歳以上の無償化や、多子世帯の軽減制度についても説明します。",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "お金のこと",
    categoryColor: "amber",
    content: `<h2>保育料の決まり方</h2>
<p>目黒区の認可保育園の保育料は、<strong>世帯の住民税額</strong>と<strong>子どもの年齢</strong>に応じて決まります。</p>

<h3>保育料の目安</h3>
<table>
<tr><th>世帯年収の目安</th><th>0〜2歳児クラス（月額）</th></tr>
<tr><td>〜約260万円</td><td>0〜5,000円</td></tr>
<tr><td>約260万〜約470万円</td><td>10,000〜20,000円</td></tr>
<tr><td>約470万〜約640万円</td><td>20,000〜35,000円</td></tr>
<tr><td>約640万〜約930万円</td><td>35,000〜55,000円</td></tr>
<tr><td>約930万円〜</td><td>55,000〜77,000円</td></tr>
</table>

<h3>3歳以上は無償化</h3>
<p>3〜5歳児クラスの保育料は、幼児教育・保育の無償化により<strong>無料</strong>です。ただし、給食費（副食費）は別途かかります。</p>

<h3>多子世帯の軽減</h3>
<p>きょうだいが保育施設を利用している場合、2人目は半額、3人目以降は無料になる軽減制度があります。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳しい保育料の算定方法は、目黒区の「保育施設利用のご案内」に掲載されています。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 60,
  },
  // ===== 人気エリア (7) =====
  {
    slug: "ninki-area",
    citySlug: "meguro",
    title: "目黒区で保育園に入りやすいエリアは？地域別の競争率",
    description:
      "目黒区の保育園の入りやすさを地域別に解説。中目黒・自由が丘・学芸大学エリアなど、各地域の競争率の傾向を紹介します。",
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=400&fit=crop",
    category: "エリア情報",
    categoryColor: "purple",
    content: `<h2>目黒区の保育園事情</h2>
<p>目黒区は子育て世帯に人気の区のため、保育園の入園競争率は比較的高めです。ただし、地域によって差があります。</p>

<h3>競争率が高い傾向のエリア</h3>
<ul>
<li><strong>中目黒エリア</strong>：駅近の利便性が高く、人気の園が集中</li>
<li><strong>自由が丘エリア</strong>：住環境の良さから子育て世帯が多い</li>
<li><strong>学芸大学エリア</strong>：商店街が充実し、生活しやすい</li>
</ul>

<h3>比較的入りやすい傾向のエリア</h3>
<ul>
<li><strong>碑文谷・柿の木坂エリア</strong>：新設園の開園により改善傾向</li>
<li><strong>大岡山・洗足エリア</strong>：隣接区との境界付近で選択肢が広い</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>目黒区は令和8年4月入所の利用調整実施状況を公式サイトで公開しています。内定最低指数を確認することで、各園の入りやすさの目安がわかります。</p>
</div>

<p>最新の利用調整実施状況は<a href="https://www.city.meguro.tokyo.jp/hoiku/kosodatekyouiku/hoikuennado/r0204nyuusyoriyoutyousei.html" target="_blank" rel="noopener">目黒区公式サイト</a>で確認できます。</p>`,
    publishedAt: "2026-03-28",
    popularity: 65,
  },
  // ===== 0歳児入園 (8) =====
  {
    slug: "0sai-nyuen",
    citySlug: "meguro",
    title: "目黒区の0歳児入園ガイド　生まれ月ごとの申込タイミング",
    description:
      "目黒区で0歳児クラスに入園するためのポイントを解説。生まれ月別の最適な申込タイミングや産休・育休との関係を説明します。",
    image:
      "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=800&h=400&fit=crop",
    category: "年齢別ガイド",
    categoryColor: "rose",
    content: `<h2>0歳児入園の基本</h2>
<p>目黒区の認可保育園の0歳児クラスは、<strong>生後57日（生後2ヶ月）</strong>から受入れの園と、<strong>生後5ヶ月</strong>から、<strong>生後7ヶ月</strong>からの園があります。</p>

<h3>0歳児クラスの定員</h3>
<p>0歳児クラスの定員は各園6〜12名程度と少なく、最も競争率が高い年齢クラスです。</p>

<h3>生まれ月と申込タイミング</h3>
<table>
<tr><th>生まれ月</th><th>4月入園の場合</th></tr>
<tr><td>4〜9月生まれ</td><td>4月入園が可能。一次利用調整に申込できる</td></tr>
<tr><td>10〜12月生まれ</td><td>4月時点の月齢による。園の受入月齢を要確認</td></tr>
<tr><td>1〜3月生まれ</td><td>4月入園は難しい。途中入園か1歳児4月を狙う</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>0歳児枠は定員が少ないものの、1歳児枠は持ち上がりで埋まるため更に狭き門です。0歳での入園を検討する価値は十分あります。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 50,
  },
  // ===== 途中入園 (9) =====
  {
    slug: "tochuu-nyuen",
    citySlug: "meguro",
    title: "目黒区の保育園に途中入園するには？手続きと空き状況の確認方法",
    description:
      "目黒区の保育園への途中入園（年度途中の入園）について解説。空き状況の確認方法、申込の流れ、入りやすい時期を紹介します。",
    image:
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>途中入園の申込方法</h2>
<p>4月以外の月に入園を希望する場合の「途中入園」は、毎月受け付けています。</p>

<h3>申込の流れ</h3>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>空き状況を確認</strong>
<p>目黒区公式サイトで月ごとの空き状況が公開されています。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>必要書類を準備</strong>
<p>4月入園と同じ書類が必要です。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>入園希望月の前月8日頃までに申込</strong>
<p>窓口・郵送・電子申請のいずれかで提出します。</p>
</div>
</div>

<h3>入りやすい時期</h3>
<p>一般的に以下の時期は空きが出やすい傾向があります。</p>
<ul>
<li><strong>5月〜6月</strong>：4月の辞退や転出による空きが出ることがある</li>
<li><strong>10月</strong>：転勤シーズンに伴う空きが出やすい</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>空き状況は<a href="https://www.city.meguro.tokyo.jp/hoiku/kosodatekyouiku/hoikuennado/akijokyou.html" target="_blank" rel="noopener">目黒区公式サイト</a>で毎月更新されます。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 40,
  },
  // ===== 保活体験談 (10) =====
  {
    slug: "same-score-tiebreaker",
    citySlug: "meguro",
    title: "目黒区で同点のとき何で決まる？利用調整の優先順位",
    description:
      "目黒区の保育園選考で同じ点数になった場合の優先順位を解説。同点時にどのような基準で決定されるのかを説明します。",
    image:
      "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=800&h=400&fit=crop",
    category: "点数の仕組み",
    categoryColor: "blue",
    content: `<h2>同点の場合の優先順位</h2>
<p>目黒区の保育園入園選考では、指数が同点の場合、以下の優先順位で利用調整が行われます。</p>

<h3>主な優先基準</h3>
<ol>
<li>保育の必要度が高い世帯（両保護者の基本指数がともに高い）</li>
<li>目黒区在住の世帯が優先</li>
<li>所得が低い世帯</li>
<li>きょうだいが在園している世帯</li>
<li>待機期間が長い世帯</li>
</ol>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>両親フルタイムで基本指数40点の家庭同士が争うケースが多いため、調整指数での+2点の差が決定的になります。認可外保育施設の利用（+2点）は重要な戦略です。</p>
</div>

<h3>具体的な内定ライン</h3>
<p>目黒区では令和8年4月入所の利用調整実施状況を公開しています。園ごとの内定最低指数を見ることで、自分の点数で入れる可能性を判断できます。</p>

<p>内定指数一覧は<a href="https://www.city.meguro.tokyo.jp/hoiku/kosodatekyouiku/hoikuennado/r0204nyuusyoriyoutyousei.html" target="_blank" rel="noopener">目黒区公式サイト</a>で確認できます。</p>`,
    publishedAt: "2026-03-28",
    popularity: 75,
  },
  {
    slug: "hoikuryo-keisan",
    citySlug: "meguro",
    title: "目黒区の保育料計算【令和8年度版】年収別シミュレーション・早見表",
    description:
      "目黒区の認可保育園の保育料を年収・子ども数別に詳しく解説。区民税所得割額に基づく階層区分早見表、無償化（3歳〜）の対象確認、副食費・第2子以降の減免制度まで。令和8年度対応。",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "お金・制度",
    categoryColor: "amber",
    content: `<h2>目黒区の保育料はどうやって決まる？</h2>
<p>目黒区の認可保育園の保育料（利用者負担額）は、<strong>世帯の区民税所得割額</strong>によって決まります。東京都の基準に基づき階層区分が設定されており、所得が高いほど保育料も高くなる応能負担方式です。</p>

<h2>年齢ごとの基本ルール</h2>
<table>
<tr><th>年齢</th><th>保育料</th><th>注意点</th></tr>
<tr><td>0〜2歳児</td><td>有料（階層区分による）</td><td>世帯の所得割額で決定</td></tr>
<tr><td>3〜5歳児</td><td>無償（月額上限あり）</td><td>幼児教育・保育の無償化対象</td></tr>
</table>
<div class="point-box">
<p><strong>ポイント</strong></p>
<p>3歳以上は保育料が無償化されますが、<span class="highlight">副食費（給食の食材費）は別途負担</span>が必要です。低所得世帯や第3子以降は免除される場合があります。</p>
</div>

<h2>保育料の階層区分（0〜2歳の目安）</h2>
<table>
<tr><th>区民税所得割額（世帯合計）</th><th>保育料目安（月額・0歳）</th></tr>
<tr><td>非課税世帯</td><td>無料</td></tr>
<tr><td>〜約5万円</td><td>6,000〜9,000円</td></tr>
<tr><td>〜約10万円</td><td>12,000〜19,000円</td></tr>
<tr><td>〜約20万円</td><td>25,000〜38,000円</td></tr>
<tr><td>〜約30万円</td><td>42,000〜52,000円</td></tr>
<tr><td>30万円超</td><td>58,000〜77,000円</td></tr>
</table>
<p class="text-xs text-muted-foreground">※上記は目安です。詳細は目黒区の公式保育料表をご確認ください。</p>

<h2>多子世帯・ひとり親世帯の軽減</h2>
<ul>
<li><strong>第2子</strong>：同一世帯で保育所等を利用中の場合、半額</li>
<li><strong>第3子以降</strong>：無料</li>
<li><strong>ひとり親世帯・生活保護世帯</strong>：最低階層として算定（大幅減額）</li>
</ul>

<h2>副食費について（3歳以上）</h2>
<p>3歳以上は保育料が無償化されますが、副食費（おかず代）は月額4,500円程度の実費負担があります。以下の場合は免除されます。</p>
<ul>
<li>年収360万円未満相当の世帯</li>
<li>第3子以降の子ども</li>
</ul>

<h2>保育料の確認方法</h2>
<p>毎年6月ごろ、前年度の区民税額が確定した後に保育料が決定・通知されます。入園前に目安を知りたい場合は目黒区担当課にお問い合わせください。</p>
<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新の保育料表は目黒区公式サイトからご確認ください。</p>
</div>`,
    publishedAt: "2026-05-13",
    popularity: 42,
  },
  {
    slug: "shokuhi-jippi",
    citySlug: "meguro",
    title: "目黒区の保育園の給食費（副食費）はいくら？【令和8年度版】免除条件と金額",
    description:
      "目黒区の保育園の給食費（副食費）は月いくら？所得・子ども数による副食費免除の条件と申請方法、保育料無償化の範囲と実費負担の全額をわかりやすく解説。令和8年度対応。",
    image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&h=400&fit=crop",
    category: "お金・制度",
    categoryColor: "amber",
    content: `<h2>目黒区の副食費とは？</h2>
<p>2019年10月の幼児教育・保育無償化により、<strong>3歳以上の保育料は無料</strong>になりました。ただし、給食の<strong>副食費（おかず代）は実費負担</strong>が残ります。目黒区では副食費として月額4,500円程度が別途かかります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>3歳以上でも副食費は無償化の対象外です。ただし、低所得世帯・第3子以降は免除制度があります。</p>
</div>

<h2>副食費の月額目安</h2>
<table>
<tr><th>年齢</th><th>副食費（月額目安）</th></tr>
<tr><td>3〜5歳児</td><td>約4,500円</td></tr>
<tr><td>0〜2歳児</td><td>保育料に含む（副食費別途なし）</td></tr>
</table>
<p class="text-xs text-muted-foreground">※金額は目安です。詳細は目黒区公式サイトでご確認ください。</p>

<h2>副食費が免除される条件</h2>
<table>
<tr><th>免除条件</th><th>内容</th></tr>
<tr><td>年収360万円未満相当の世帯</td><td>区民税所得割額が一定以下の世帯は副食費が免除</td></tr>
<tr><td>第3子以降の子ども</td><td>小学3年生以下のきょうだいが2人以上いる場合、3人目以降は免除</td></tr>
<tr><td>生活保護世帯</td><td>副食費の負担なし</td></tr>
</table>

<h2>保育料無償化の対象範囲</h2>
<ul>
<li>無償化対象：<strong>保育料（基本利用料）</strong>のみ — 3歳〜5歳</li>
<li>実費負担が残るもの：副食費（おかず代）・主食費（ご飯代）・行事費・通園バス代など</li>
</ul>

<h2>副食費の支払い方法</h2>
<p>副食費は園から直接請求されます。毎月口座引き落としまたは現金納付が一般的です。免除に該当する場合は入園時や毎年6月ごろに申請手続きが必要です。目黒区担当課に確認してください。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新の副食費・実費負担の詳細は目黒区公式サイトからご確認ください。</p>
</div>`,
    publishedAt: "2026-05-13",
    popularity: 40,
  },
];

registerArticles(articles);
