import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  // ===== 保活スケジュール (1) =====
  {
    slug: "hokatsu-schedule",
    citySlug: "toshima",
    title: "豊島区の保活スケジュール　令和8年度4月入園の流れ",
    description:
      "豊島区の認可保育園の申込時期・選考の流れ・結果通知の時期をわかりやすく解説。令和8年度4月入園のスケジュールを中心にまとめました。",
    image:
      "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>令和8年度（2026年度）4月入園のスケジュール</h2>
<p>豊島区の4月入園は<strong>一次利用調整</strong>と<strong>二次利用調整</strong>の2回に分かれています。</p>

<h3>一次利用調整</h3>
<table>
<tr><th>項目</th><th>日程</th></tr>
<tr><td>申込受付期間</td><td>令和7年10月中旬〜11月中旬</td></tr>
<tr><td>結果通知</td><td>令和8年1月下旬（全員に郵送）</td></tr>
</table>

<h3>二次利用調整</h3>
<table>
<tr><th>項目</th><th>日程</th></tr>
<tr><td>申込受付期間</td><td>令和8年1月下旬〜2月中旬</td></tr>
<tr><td>結果通知</td><td>令和8年3月上旬</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>一次で不承諾だった方は自動的に二次の対象になります。再申込は不要ですが、希望園の変更は可能です。保育課へのお問い合わせは03-3981-2140です。</p>
</div>

<h2>いつから動き始めるべき？</h2>

<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>4月〜5月：情報収集スタート</strong>
<p>豊島区の保育園の種類やエリアを調べましょう。池袋・要町・東池袋エリアなど利便性の高いエリアが人気です。</p>
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
<p>区が発行する保活ガイドブック。申込方法や点数の仕組みが詳しく書いています。</p>
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
<p>各月の申込締切日は、入園希望月の<span class="highlight">前月15日頃</span>です。ただし締切日が土日祝の場合は変更されます。</p>
<p>詳しくは<a href="https://www.city.toshima.lg.jp/260/kosodate/kosodate/hoikuen/nyuen/016786.html" target="_blank" rel="noopener">豊島区公式サイト「申込みから入所までの流れ」</a>をご確認ください。</p>`,
    publishedAt: "2026-06-08",
    popularity: 60,
  },
  // ===== 点数の仕組み (2) =====
  {
    slug: "tensuu-shikumi",
    citySlug: "toshima",
    title: "豊島区の保育園点数はどう決まる？基本指数と調整指数の仕組み",
    description:
      "豊島区の認可保育園入園に必要な「点数」の仕組みをわかりやすく解説。基本指数40点（両親合計）のsum方式と、加点される調整指数を説明します。",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "点数の仕組み",
    categoryColor: "blue",
    content: `<h2>豊島区の点数計算の基本</h2>
<p>豊島区の保育園入園選考は、<strong>基本指数</strong>と<strong>調整指数</strong>の合計で決まります。</p>

<div class="formula">選考指数 = 基本指数（父親） + 基本指数（母親） + 調整指数</div>

<h3>基本指数とは</h3>
<p>豊島区は<strong>sum方式</strong>を採用しています。保護者各自が月20日以上・月160時間以上の就労要件を満たす場合、各自20点が加算されます（最大40点）。</p>

<h3>就労の基本指数</h3>
<table>
<tr><th>勤務状況</th><th>点数</th></tr>
<tr><td>月20日以上かつ月160時間以上</td><td>20点</td></tr>
<tr><td>月20日以上かつ月120時間以上160時間未満</td><td>18点</td></tr>
<tr><td>月15日以上20日未満かつ月120時間以上</td><td>16点</td></tr>
<tr><td>月10日以上15日未満かつ月80時間以上</td><td>12点</td></tr>
<tr><td>月10日以上かつ月80時間未満</td><td>8点</td></tr>
</table>

<div class="info-box">
<p><strong>豊島区の特徴</strong></p>
<p>豊島区はsum方式を採用しており、両親がそれぞれ20点の要件を満たした場合、合計40点となります。この点が各区で異なるため、他区の情報と混同しないよう注意が必要です。</p>
</div>

<h3>調整指数とは</h3>
<p>家庭の状況に応じて加算される点数です。</p>
<table>
<tr><th>項目</th><th>点数</th></tr>
<tr><td>ひとり親世帯</td><td>+8</td></tr>
<tr><td>生活保護・非課税世帯</td><td>+8</td></tr>
<tr><td>再入園（3歳以上の転園等）</td><td>+6</td></tr>
<tr><td>きょうだい同園・別園希望</td><td>+2</td></tr>
<tr><td>育休からの復帰</td><td>+1</td></tr>
</table>

<h3>その他の事由</h3>
<table>
<tr><th>事由</th><th>点数</th></tr>
<tr><td>出産予定がある場合</td><td>14点</td></tr>
<tr><td>求職中</td><td>6点</td></tr>
</table>

<p>詳しくは<a href="https://www.city.toshima.lg.jp/260/kosodate/kosodate/hoikuen/nyuen/016786.html" target="_blank" rel="noopener">豊島区公式サイト</a>をご確認ください。</p>`,
    publishedAt: "2026-06-08",
    popularity: 80,
  },
  // ===== 保育園の種類 (3) =====
  {
    slug: "hoikuen-shurui",
    citySlug: "toshima",
    title: "豊島区の保育園の種類を解説　認可・認証・小規模の違い",
    description:
      "豊島区で利用できる保育施設の種類を解説。認可保育園・認証保育所・小規模保育・家庭的保育事業の違いや特徴を比較します。",
    image:
      "https://images.unsplash.com/photo-1587654780541-7f3b5e1e2e1e?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>豊島区の保育施設の種類</h2>
<p>豊島区には複数の種類の保育施設があります。それぞれの特徴を理解して、家庭に合った施設を選びましょう。</p>

<h3>認可保育園</h3>
<p>国が定めた基準を満たし、都道府県知事の認可を受けた保育施設です。区が利用調整（選考）を行います。</p>
<ul>
<li>保育料は世帯の住民税額に応じて決定</li>
<li>0歳〜5歳（施設により異なる）</li>
<li>区立・私立がある</li>
<li>3歳以上は保育料無償化対象</li>
</ul>

<h3>認証保育所</h3>
<p>東京都独自の制度で、都が定めた基準を満たした保育施設です。</p>
<ul>
<li>保育料は施設が設定（上限あり）</li>
<li>豊島区では認可外保育施設保育料助成制度あり</li>
<li>認可保育園に入れなかった場合の選択肢として活用</li>
</ul>

<h3>小規模保育事業</h3>
<p>0〜2歳児を対象に、定員6〜19名の少人数で保育を行う施設です。</p>
<ul>
<li>認可保育園と同じ利用調整を経て入園</li>
<li>3歳以降の行き先（連携施設）の確認が重要</li>
<li>定員が少ないため入りやすい傾向</li>
</ul>

<h3>家庭的保育事業（保育ママ）</h3>
<p>家庭的保育者の自宅などで、0〜2歳の子どもを5名以下の少人数で保育します。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>豊島区は小規模保育や家庭的保育の整備を進めています。3歳以降の転園を見据えたうえで、複数の選択肢を検討しましょう。</p>
</div>`,
    publishedAt: "2026-06-08",
    popularity: 55,
  },
  // ===== 加点テクニック (4) =====
  {
    slug: "katen-technique",
    citySlug: "toshima",
    title: "豊島区の保活で加点を増やす方法　調整指数の攻略ポイント",
    description:
      "豊島区の保育園入園選考で有利になる加点方法を解説。ひとり親加点や育休復帰加点など、豊島区固有の加点テクニックを紹介します。",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "点数の仕組み",
    categoryColor: "blue",
    content: `<h2>加点を増やす具体的な方法</h2>
<p>基本指数が同点の家庭が多いため、<strong>調整指数</strong>の差が当落を分けます。豊島区で合法的に加点を増やす方法を解説します。</p>

<h3>1. 出産予定のある場合（14点）</h3>
<p>出産予定がある場合、<strong>14点</strong>が加算されます。これは豊島区では最も大きな加点となります。妊娠中から申込する場合は必ず申告しましょう。</p>

<div class="info-box">
<p><strong>注意</strong></p>
<p>出産予定日を証明する診断書の提出が必要です。申込時に間に合うよう医療機関に早めに相談してください。</p>
</div>

<h3>2. ひとり親世帯（+8点）</h3>
<p>ひとり親世帯に該当する場合、<strong>+8点</strong>が加算されます。これは調整指数の中で最も大きな加点です。児童扶養手当証書など、ひとり親であることを証明する書類の提出が必要です。</p>

<h3>3. 生活保護・非課税世帯（+8点）</h3>
<p>生活保護を受給している世帯または市区町村民税が非課税の世帯に該当する場合、<strong>+8点</strong>が加算されます。</p>

<h3>4. 再入園（+6点）</h3>
<p>3歳以上で転園を希望する場合や、認可保育園を退園して再度入園を希望する場合に<strong>+6点</strong>が加算されます。きょうだい分園の場合にも適用される可能性があります。</p>

<h3>5. きょうだい加点（+2点）</h3>
<p>きょうだいが<strong>複数の認可保育施設に分かれて在園</strong>しており、同園を希望する場合に<strong>+2点</strong>が加算されます。</p>

<h3>6. 育休からの復帰（+1点）</h3>
<p>育休から復帰する場合、<strong>+1点</strong>が加算されます。育休中であることを証明する書類が必要です。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>豊島区では出産予定がある場合の加点（14点）が非常に大きいため、妊娠中からの保活が有利です。また、ひとり親加点と生活保護加点の両方に該当する場合は、より有利な条件を選択できることが多いです。</p>
</div>`,
    publishedAt: "2026-06-08",
    popularity: 75,
  },
  // ===== 必要書類 (5) =====
  {
    slug: "hitsuyou-shorui",
    citySlug: "toshima",
    title: "豊島区の保育園申込に必要な書類一覧と準備のコツ",
    description:
      "豊島区の認可保育園に申し込むときに必要な書類を一覧で紹介。就労証明書の書き方や注意点もあわせて解説します。",
    image:
      "https://images.unsplash.com/photo-1568667256549-094345857637?w=800&h=400&fit=crop",
    category: "申込の準備",
    categoryColor: "amber",
    content: `<h2>申込に必要な書類</h2>
<p>豊島区の認可保育園への申込には、以下の書類が必要です。</p>

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
<li>月20日以上・月160時間以上の勤務実績がわかる書類</li>
</ul>

<h3>その他、該当する場合に必要な書類</h3>
<ul>
<li>診断書（疾病・障害・妊娠の場合）</li>
<li>在学証明書（就学の場合）</li>
<li>児童扶養手当証書の写し（ひとり親の場合）</li>
<li>生活保護受給証明書（生活保護の場合）</li>
<li>母子手帳の写し（出産予定の場合）</li>
</ul>

<div class="point-box">
<p><strong>就労証明書のコツ</strong></p>
<p>勤務先への依頼は早めに。繁忙期は2週間以上かかることもあります。豊島区の様式は区のホームページからダウンロードできます。月160時間以上の勤務が確認できる資料を一緒に提出するとスムーズです。</p>
</div>

<p>様式のダウンロードは<a href="https://www.city.toshima.lg.jp/260/kosodate/kosodate/hoikuen/nyuen/016786.html" target="_blank" rel="noopener">豊島区公式サイト</a>からどうぞ。</p>`,
    publishedAt: "2026-06-08",
    popularity: 65,
  },
  // ===== 保育料 (6) =====
  {
    slug: "hoikuryo",
    citySlug: "toshima",
    title: "豊島区の保育料はいくら？世帯年収別の目安と無償化の条件",
    description:
      "豊島区の認可保育園の保育料を世帯年収別にわかりやすく解説。3歳以上の無償化や、多子世帯の軽減制度についても説明します。",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "お金のこと",
    categoryColor: "amber",
    content: `<h2>保育料の決まり方</h2>
<p>豊島区の認可保育園の保育料は、<strong>世帯の住民税額</strong>と<strong>子どもの年齢</strong>に応じて決まります。</p>

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
<p>詳しい保育料の算定方法は、豊島区の「保育施設利用のご案内」に掲載されています。03-3981-2140までお問い合わせください。</p>
</div>`,
    publishedAt: "2026-06-08",
    popularity: 70,
  },
  // ===== ボーダーラインと倍率 (7) =====
  {
    slug: "border-line",
    citySlug: "toshima",
    title: "豊島区の保育園ボーダーラインと倍率　入園難易度を解説",
    description:
      "豊島区の保育園の入園難易度を倍率・ボーダーラインで解説。池袋エリアなど人気地域と入りやすい園の選び方を紹介します。",
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=400&fit=crop",
    category: "エリア情報",
    categoryColor: "purple",
    content: `<h2>豊島区の保育園事情</h2>
<p>豊島区は山手線内の利便性の高いエリアのため、保育園の入園競争率は比較的高めです。ただし、地域によって差があります。</p>

<h3>競争率が高い傾向のエリア</h3>
<ul>
<li><strong>池袋エリア</strong>：駅近の利便性が高く、人気の園が集中</li>
<li><strong>要町エリア</strong>：新興住宅地で子育て世帯が多い</li>
<li><strong>東池袋エリア</strong>：商業施設が充実し、アクセスが良好</li>
</ul>

<h3>比較的入りやすい傾向のエリア</h3>
<ul>
<li><strong>大塚・北大塚エリア</strong>：駅から距離がある分、競争率が低め</li>
<li><strong>巣鴨・駒込エリア</strong>：隣接区との境界付近で選択肢が広い</li>
<li><strong>南長崎・椎名町エリア</strong>：新設園の開園により改善傾向</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>豊島区では年度ごとに入園難易度が変わります。複数の園に申込し、エリアの選択肢を広げることが有効です。小規模保育や認証保育所の活用も検討しましょう。</p>
</div>

<p>最新の利用調整実施状況は<a href="https://www.city.toshima.lg.jp/260/kosodate/kosodate/hoikuen/nyuen/016786.html" target="_blank" rel="noopener">豊島区公式サイト</a>で確認できます。</p>`,
    publishedAt: "2026-06-08",
    popularity: 68,
  },
  // ===== 認可外保育施設の活用 (8) =====
  {
    slug: "ninkaigai-nursery",
    citySlug: "toshima",
    title: "豊島区の認可外保育施設活用ガイド　認証保育所との使い分け",
    description:
      "豊島区の認可外保育施設（認証保育所・ベビーホテルなど）の選び方と、認可保育園の待機中の活用方法を解説。保育料助成制度も紹介します。",
    image:
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>認可外保育施設とは</h2>
<p>認可外保育施設には、認証保育所・ベビーホテル・事業所内保育施設などがあります。認可保育園に入園するまでの間、または認可保育園以外の選択肢として活用できます。</p>

<h3>豊島区の認証保育所</h3>
<p>東京都が定めた基準を満たした保育施設です。豊島区には複数の認証保育所があり、24時間対応の施設も多いのが特徴です。</p>
<ul>
<li>保育料は施設が設定（月額目安：50,000〜80,000円）</li>
<li>豊島区では認可外保育施設保育料助成制度あり</li>
<li>3歳以降も利用可能な施設が多い</li>
</ul>

<h3>豊島区の保育料助成制度</h3>
<p>豊島区では、認可外保育施設を利用する家庭に対して、保育料の一部を助成しています。</p>
<ul>
<li>月額上限5,000〜10,000円程度（世帯の所得により異なる）</li>
<li>生活保護世帯や低所得世帯は助成額が多い</li>
<li>申請手続きが必要です</li>
</ul>

<h3>認可外保育施設の選び方</h3>
<ol>
<li><strong>施設の安全性</strong>：定期的な指導検査を受けているか確認</li>
<li><strong>スタッフの質</strong>：保育士資格の保有率を確認</li>
<li><strong>保育内容</strong>：教育方針や日々の活動内容を確認</li>
<li><strong>営業時間</strong>：送迎時間に対応しているか確認</li>
</ol>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>認可外保育施設の利用は、認可保育園の申込時に加点される可能性があります。認可保育園に入園する意志がある場合でも、保育料助成制度を活用して認可外保育施設を利用することは有効な戦略です。</p>
</div>`,
    publishedAt: "2026-06-08",
    popularity: 50,
  },
  // ===== 妊娠中からの保活 (9) =====
  {
    slug: "ninshin-hokatsu",
    citySlug: "toshima",
    title: "豊島区の妊娠中からの保活　出産予定の加点と事前準備",
    description:
      "豊島区では妊娠中の申込で14点の出産予定加点が得られます。妊娠中から始める保活の流れと準備をわかりやすく解説。",
    image:
      "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=800&h=400&fit=crop",
    category: "年齢別ガイド",
    categoryColor: "rose",
    content: `<h2>豊島区の出産予定加点（14点）</h2>
<p>豊島区では、<strong>出産予定がある場合に14点</strong>が加算されます。これは調整指数の中で最も大きな加点であり、妊娠中からの申込は入園に非常に有利です。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>両親がフルタイム勤務の場合の基本指数は40点ですが、出産予定がある場合は追加で14点が加算されるため、合計54点となります。これは非常に競争力がある点数です。</p>
</div>

<h3>妊娠中の申込に必要な書類</h3>
<ul>
<li>保育施設利用申込書（出産予定欄に記入）</li>
<li><strong>母子手帳の写し</strong>（妊娠週数が確認できるページ）</li>
<li>医師の診断書（出産予定日の記載があるもの）</li>
<li>就労証明書（勤務している場合）</li>
</ul>

<h3>妊娠中からの保活スケジュール</h3>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>妊娠5〜6ヶ月：情報収集開始</strong>
<p>豊島区の保育園情報を集め、希望エリアを絞ります。体が楽な時期に見学の予約をしましょう。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>妊娠7〜8ヶ月：保育園見学</strong>
<p>複数の園を見学し、ニーズに合った園を選びます。安定期の終わりごろまでに見学を済ませます。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>妊娠8〜9ヶ月：申込書類の準備</strong>
<p>医師の診断書や母子手帳のコピーを用意します。就労証明書も早めに勤務先に依頼しましょう。</p>
</div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content">
<strong>出産予定月の前月：申込</strong>
<p>10月中旬〜11月中旬の一次申込に間に合うよう、早めに書類を提出します。</p>
</div>
</div>

<h3>出産予定の加点を受けるための注意点</h3>
<ul>
<li>医師の診断書は<strong>出産予定日の記載が必須</strong>です</li>
<li>出産予定日から生まれた日に変わったら、速やかに区に報告してください</li>
<li>出産後の入園時期の変更相談にも応じてくれます</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳しくは豊島区保育課（03-3981-2140）にお問い合わせください。</p>
</div>`,
    publishedAt: "2026-06-08",
    popularity: 72,
  },
  // ===== よくある質問 (10) =====
  {
    slug: "faq",
    citySlug: "toshima",
    title: "豊島区の保活Q&A　よくある質問と回答",
    description:
      "豊島区の保活に関するよくある質問をまとめました。点数・書類・スケジュール・加点など、申込前に確認しておきたい疑問を解決します。",
    image:
      "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=800&h=400&fit=crop",
    category: "よくある質問",
    categoryColor: "blue",
    content: `<h2>豊島区の保活Q&A</h2>

<h3>Q. 点数はいくらあれば入園できますか？</h3>
<p>A. 園によって異なります。人気の園は50点以上必要な場合もありますが、小規模保育施設なら40点程度で入園できることもあります。複数の園に申込することをおすすめします。</p>

<h3>Q. 基本指数のsum方式とは何ですか？</h3>
<p>A. 豊島区では、父親と母親の基本指数を足し合わせる「sum方式」を採用しています。他区では「max方式」（高い方のみを算出）を採用しているため、注意が必要です。両親がそれぞれ20点なら合計40点となります。</p>

<h3>Q. 月160時間の勤務時間はどうやって計算しますか？</h3>
<p>A. 月ごとの勤務時間を計算します。正社員であれば月160時間（週40時間×4週間）を超えることはほぼ確実です。パート・アルバイトの場合は、給与明細や勤務表で正確に計算してください。</p>

<h3>Q. 育休中に申込できますか？</h3>
<p>A. 育休中の申込は基本指数が低くなるため、あまりおすすめしません。ただし、出産予定がある場合や、育休からの復帰が見込まれる場合は相談してみてください。</p>

<h3>Q. 自営業の場合の点数はどうなりますか？</h3>
<p>A. 自営業の場合は、直近の確定申告書から平均月収を算出し、月160時間以上に相当する働きがあるかを判断します。就労状況申告書を提出し、個別に相談してください。</p>

<h3>Q. ひとり親加点は8点ですか？</h3>
<p>A. はい、豊島区ではひとり親世帯に+8点が加算されます。児童扶養手当証書などで証明する必要があります。</p>

<h3>Q. 認可外保育施設の加点は得られますか？</h3>
<p>A. 豊島区では、認可外保育施設の利用による調整指数の加点は設定されていないことが多いです。ただし、助成制度を活用することで、経済的な負担を軽減できます。</p>

<h3>Q. 0歳児入園は難しいですか？</h3>
<p>A. 0歳児クラスの定員は少なく、競争率が高い傾向です。ただし、出産予定加点や両親フルタイムの場合は入園の可能性が高まります。</p>

<h3>Q. 途中入園は入りやすいですか？</h3>
<p>A. 4月入園よりは入りやすい傾向がありますが、定員に空きがある園が限られています。複数の園に申込し、早めに動くことをおすすめします。</p>

<h3>Q. 申込時に園の選択順位は重要ですか？</h3>
<p>A. 非常に重要です。第1志望・第2志望の順で選考が進まず、指数に基づいて優先順位が決まります。複数の園を戦略的に選びましょう。</p>

<div class="info-box">
<p><strong>さらに詳しく知りたい方は</strong></p>
<p>豊島区保育課：03-3981-2140（平日9時〜17時）</p>
<p>公式サイト：<a href="https://www.city.toshima.lg.jp/260/kosodate/kosodate/hoikuen/nyuen/016786.html" target="_blank" rel="noopener">https://www.city.toshima.lg.jp/260/kosodate/kosodate/hoikuen/nyuen/016786.html</a></p>
</div>`,
    publishedAt: "2026-06-08",
    popularity: 78,
  },
];

registerArticles(articles);
