import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  // ===== 保活の基本 (1) =====
  {
    slug: "hokatsu-schedule",
    citySlug: "hamamatsu",
    title: "浜松市の保活スケジュール　令和8年度4月入園の流れ",
    description:
      "浜松市の認可保育園の申込時期・選考の流れ・結果通知の時期をわかりやすく解説。令和8年度4月入園のスケジュールを中心にまとめました。",
    image:
      "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>令和8年度（2026年度）4月入園のスケジュール</h2>
<p>浜松市の4月入園は<strong>一次受付</strong>と<strong>二次受付</strong>の2回に分かれています。</p>

<h3>一次受付</h3>
<table>
<tr><th>項目</th><th>日程</th></tr>
<tr><td>募集人数（暫定値）の公表</td><td>令和7年10月1日（水）13時頃</td></tr>
<tr><td>郵送受付期間</td><td>令和7年10月1日〜10月15日（水）（当日消印有効）</td></tr>
<tr><td>募集人数（確定値）・申込状況の公表</td><td>令和7年11月25日（火）</td></tr>
<tr><td>希望園変更期間</td><td>令和7年11月26日〜28日（電話のみ）</td></tr>
<tr><td>結果発送日</td><td>令和8年1月9日（金）</td></tr>
</table>

<h3>二次受付</h3>
<table>
<tr><th>項目</th><th>日程</th></tr>
<tr><td>二次受付期間</td><td>令和8年1月26日（月）〜1月30日（金）（当日消印有効）</td></tr>
<tr><td>希望園変更期間</td><td>同上（電話のみ）</td></tr>
<tr><td>結果発送日</td><td>令和8年2月25日（水）</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>一次の申込状況が11月に公表されます。倍率を見て希望園を変更できる期間（11月26〜28日）があるのが浜松市の特徴です。</p>
</div>

<h2>いつから動き始めるべき？</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>4月〜6月：情報収集スタート</strong>
<p>浜松市の保育施設の種類やエリアの特徴を調べましょう。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>7月〜9月：保育園見学</strong>
<p>気になる園に電話して見学予約。夏場が見学のベストシーズンです。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>9月〜10月：書類の入手・準備</strong>
<p>各こども家庭センターや保育相談センターで書類を入手し、就労証明書などを準備します。</p>
</div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content">
<strong>10月上旬：申込書類の郵送</strong>
<p>10月15日の消印有効なので、余裕を持って投函しましょう。</p>
</div>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳しくは<a href="https://www.hamamatsu-pippi.net/contents/7769.html" target="_blank" rel="noopener">浜松市子育て情報サイト「ぴっぴ」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 55,
  },
  // ===== 選考のしくみ (2) =====
  {
    slug: "scoring-system-guide",
    citySlug: "hamamatsu",
    title: "浜松市の入園点数のしくみ　min方式と基準点・調整点を解説",
    description:
      "浜松市の保育園入園選考で使われる「min方式」「基準点」「調整点」のしくみを初めての方にもわかるように解説します。",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>浜松市の点数制度の特徴：min方式</h2>
<p>浜松市の入園選考は「利用調整基準点」の高い順に内定が決まります。最大の特徴は<span class="highlight">min方式</span>を採用している点です。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>選考に使われる点数 ＝ 父母それぞれの（基準点＋調整点）のうち、<strong>低い方</strong>の合計点</p>
</div>

<h2>基準点とは？</h2>
<p>保護者それぞれの「保育が必要な理由」を点数化したものです。1人あたり最大<span class="highlight">20点</span>です。</p>

<table>
<tr><th>就労状況</th><th>基準点</th></tr>
<tr><td>月120時間以上（フルタイム）</td><td>20点（満点）</td></tr>
<tr><td>月64時間以上120時間未満</td><td>16点</td></tr>
<tr><td>月48時間以上64時間未満</td><td>12点</td></tr>
</table>

<h2>調整点とは？</h2>
<p>世帯の状況に応じて加減される点数です。代表的な項目は以下の通りです。</p>
<ul>
<li>ひとり親世帯：<span class="highlight">+5点</span>または<span class="highlight">+3点</span></li>
<li>就労日数加点（月20日以上）：<span class="highlight">+3点</span></li>
<li>就労日数加点（月16日以上）：<span class="highlight">+2点</span></li>
<li>就労日数加点（月12日以上）：<span class="highlight">+1点</span></li>
<li>育休復帰：<span class="highlight">+3点</span></li>
<li>認可外保育施設の利用：<span class="highlight">+2点</span></li>
<li>保育士として就労：<span class="highlight">+4点</span></li>
</ul>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>育休延長を許容する場合は<span class="highlight">0点</span>（基準点が0点）となります。「入園できなくても育休延長でよい」と判断されるためです。</p>
</div>

<h2>フルタイム＋就労日数加点が標準</h2>
<p>フルタイム（20点）＋就労日数加点（+3点）＝<span class="highlight">23点</span>が浜松市の標準的な点数です。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新の利用調整基準表は<a href="https://www.hamamatsu-pippi.net/contents/7772.html" target="_blank" rel="noopener">浜松市子育て情報サイト「ぴっぴ」</a>でご確認ください。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 65,
  },
  // ===== 点数アップ (3) =====
  {
    slug: "score-up-checklist",
    citySlug: "hamamatsu",
    title: "浜松市で点数を上げるコツ　加点のチェックリスト",
    description:
      "浜松市の保育園入園選考で調整点を最大限に活用する方法を、チェックリスト形式で解説します。",
    image:
      "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>min方式だからこそ両親の点数がカギ</h2>
<p>浜松市のmin方式では、父母のうち<span class="highlight">低い方の点数</span>で選考されます。片方だけ高くても意味がないため、両親とも高い点数を確保しましょう。</p>

<h3>加点チェックリスト</h3>
<table>
<tr><th>加点項目</th><th>点数</th><th>条件</th></tr>
<tr><td>ひとり親世帯</td><td>+5点/+3点</td><td>ひとり親であること</td></tr>
<tr><td>保育士として就労</td><td>+4点</td><td>保育施設等で勤務</td></tr>
<tr><td>就労日数（月20日以上）</td><td>+3点</td><td>週5日以上勤務</td></tr>
<tr><td>就労日数（月16日以上）</td><td>+2点</td><td>週4日程度勤務</td></tr>
<tr><td>就労日数（月12日以上）</td><td>+1点</td><td>週3日程度勤務</td></tr>
<tr><td>育休復帰</td><td>+3点</td><td>育休明けに復職する場合</td></tr>
<tr><td>認可外保育施設の利用</td><td>+2点</td><td>有償で認可外に預けている場合</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>浜松市では<strong>就労日数加点</strong>が重要です。月20日以上の就労で+3点を得られるため、フルタイム（20点）＋就労日数（+3点）＝<span class="highlight">23点</span>が標準ラインです。</p>
</div>

<h2>育休復帰加点を活用しよう</h2>
<p>育休明けに復職する場合は<span class="highlight">+3点</span>の加点が得られます。フルタイム＋就労日数＋育休復帰で<span class="highlight">26点</span>を目指せます。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>「育休延長を許容する」と判断された場合は基準点が<span class="highlight">0点</span>になります。入園を本気で希望するなら、育休延長許容の意思表示をしないよう注意してください。</p>
</div>

<h2>認可外の利用で+2点</h2>
<p>認可外保育施設に有償で預けている場合は<span class="highlight">+2点</span>の加点です。フルタイム＋就労日数＋認可外利用で<span class="highlight">25点</span>になります。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>全項目の詳細は<a href="https://www.hamamatsu-pippi.net/contents/7772.html" target="_blank" rel="noopener">浜松市子育て情報サイト「ぴっぴ」</a>でご確認ください。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 100,
  },
  // ===== 同点時の優先順位 (4) =====
  {
    slug: "tiebreaker-rules",
    citySlug: "hamamatsu",
    title: "浜松市で同点になったらどうなる？優先順位を解説",
    description:
      "浜松市の保育園入園選考で同じ点数になった場合の優先順位のしくみを、わかりやすく解説します。",
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>同点のとき、どうやって決まるの？</h2>
<p>浜松市の入園選考では、利用調整基準点が同点の場合に<span class="highlight">優先段階</span>により総合的に判断されます。min方式では同点になりやすいため、この優先順位が重要です。</p>

<h3>浜松市の主な優先段階</h3>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>ひとり親世帯・生活保護世帯</strong>
<p>ひとり親世帯や生活保護受給中の世帯が優先されます。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>きょうだいが在園中</strong>
<p>申込先の園にきょうだいが在園している世帯が優先されます。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>認可外保育施設の利用実績</strong>
<p>認可外に有償で預けている実績がある世帯が優先されます。</p>
</div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content">
<strong>所得が低い世帯</strong>
<p>市民税の課税額が低い世帯が優先されます。</p>
</div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>浜松市は基準点が最大20点と幅が小さいため、同点勝負になるケースが多いです。認可外の利用実績が同点時のカギを握ります。</p>
</div>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>同じ優先段階の世帯が複数いる場合は、さらに細かい基準で判定されます。不明な点はこども家庭センターに問い合わせましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>優先段階の詳細は<a href="https://www.hamamatsu-pippi.net/contents/7772.html" target="_blank" rel="noopener">浜松市子育て情報サイト「ぴっぴ」</a>の利用調整基準表でご確認ください。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 85,
  },
  // ===== 時短勤務と点数 (5) =====
  {
    slug: "jitan-kinmu-score",
    citySlug: "hamamatsu",
    title: "浜松市で時短勤務だと点数はどうなる？就労日数加点に注意",
    description:
      "浜松市の保育園入園選考で時短勤務を取得した場合の点数への影響と、就労日数加点の重要性を解説します。",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>時短勤務で基準点はどう変わる？</h2>
<p>浜松市の基準点は就労時間の区分で決まります。時短勤務にした場合の影響を確認しましょう。</p>

<table>
<tr><th>就労時間</th><th>基準点</th><th>備考</th></tr>
<tr><td>月120時間以上</td><td>20点</td><td>フルタイム</td></tr>
<tr><td>月64〜120時間未満</td><td>16点</td><td>時短勤務で該当する場合</td></tr>
<tr><td>月48〜64時間未満</td><td>12点</td><td>短時間パートなど</td></tr>
</table>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>月120時間のラインを下回ると基準点が<span class="highlight">4点下がって16点</span>になります。1日6時間×週5日＝月約120時間がギリギリのラインです。</p>
</div>

<h2>就労日数加点への影響</h2>
<p>時短勤務で勤務日数が減ると、就労日数加点にも影響します。</p>
<table>
<tr><th>勤務日数</th><th>就労日数加点</th></tr>
<tr><td>月20日以上</td><td>+3点</td></tr>
<tr><td>月16日以上</td><td>+2点</td></tr>
<tr><td>月12日以上</td><td>+1点</td></tr>
<tr><td>月12日未満</td><td>0点</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>フルタイムなら基準点20点＋就労日数+3点＝<span class="highlight">23点</span>。週4日時短だと基準点16点＋就労日数+2点＝<span class="highlight">18点</span>。差は<span class="highlight">5点</span>にもなります。</p>
</div>

<h2>min方式では片方の時短が命取りに</h2>
<p>浜松市のmin方式では父母の低い方の点数が選考に使われます。仮に父が23点、母が18点だと、選考に使われるのは<span class="highlight">18点</span>です。</p>

<h2>時短でも点数を維持するコツ</h2>
<ul>
<li>勤務日数を<span class="highlight">月20日以上</span>維持して就労日数加点+3点を確保</li>
<li>就労時間を<span class="highlight">月120時間以上</span>維持して基準点20点を確保</li>
<li>1日の時間を減らしても日数は減らさないのが理想</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>利用調整基準表は<a href="https://www.hamamatsu-pippi.net/contents/7772.html" target="_blank" rel="noopener">浜松市子育て情報サイト「ぴっぴ」</a>でご確認ください。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 90,
  },
  // ===== 落ちたときの選択肢 (6) =====
  {
    slug: "ochita-sentakushi",
    citySlug: "hamamatsu",
    title: "浜松市で保育園に落ちたときの5つの選択肢",
    description:
      "浜松市の認可保育園の選考で保留になった場合に検討すべき5つの選択肢を具体的に紹介します。",
    image:
      "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=800&h=400&fit=crop",
    category: "入れなかったら",
    categoryColor: "rose",
    content: `<h2>保留になっても大丈夫。次の一手を考えましょう</h2>
<p>浜松市は待機児童ゼロを<span class="highlight">4年以上</span>維持していますが、特に3歳未満児は希望の園に入れないケースがあります。</p>

<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>二次受付に申し込む</strong>
<p>一次で保留の方は二次受付（1月下旬）に希望園の変更・追加が可能です。一次の申込状況を見て判断しましょう。</p>
</div>
</div>

<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>認可外保育施設を探す</strong>
<p>浜松市内にも認可外保育施設があります。認可外に預けながら翌年度の認可を再申請すれば、<span class="highlight">+2点</span>の加点が得られます。</p>
</div>
</div>

<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>小規模保育事業・地域型保育を利用する</strong>
<p>0〜2歳児対象の小規模保育は、認可保育園より比較的空きがあるケースがあります。定員割れしている施設もあるため、選択肢に入れましょう。</p>
</div>
</div>

<div class="step">
<div class="step-num">4</div>
<div class="step-content">
<strong>企業主導型保育施設を利用する</strong>
<p>企業主導型保育施設は国の助成を受けており保育料が比較的安価です。直接施設に申し込みます。</p>
</div>
</div>

<div class="step">
<div class="step-num">5</div>
<div class="step-content">
<strong>希望エリアを広げて途中入園を狙う</strong>
<p>浜松市は広い市域をもつため、エリアを広げれば空きのある園が見つかることもあります。途中入園の申込は入園希望月の前月に受け付けています。</p>
</div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>浜松市では申込園を<span class="highlight">5か所まで</span>希望できます。通える範囲の園をできるだけ多く書くのが保活の鉄則です。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>途中入園の申込方法は<a href="https://www.hamamatsu-pippi.net/contents/7770.html" target="_blank" rel="noopener">浜松市子育て情報サイト「ぴっぴ」</a>でご確認ください。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 80,
  },
  // ===== 認可外で加点を得る方法 (7) =====
  {
    slug: "ninkagai-katen",
    citySlug: "hamamatsu",
    title: "浜松市で認可外保育を活用して+2点を得る方法",
    description:
      "浜松市の保育園入園選考で認可外保育施設の利用による+2点の加点を得る方法を解説します。",
    image:
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>認可外利用で+2点の加点</h2>
<p>浜松市では、認可外保育施設に有償で預けている場合に<span class="highlight">+2点</span>の調整点が加算されます。基準点が最大20点の浜松市では、この2点は大きな差になります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>フルタイム＋就労日数＋認可外利用で、23点→<span class="highlight">25点</span>に。育休復帰との併用で<span class="highlight">28点</span>も狙えます。</p>
</div>

<h2>加点の条件</h2>
<ul>
<li>就労等の理由で認可外保育施設に<span class="highlight">有償で預けている</span>こと</li>
<li>申込時点で利用していることが必要</li>
<li>育児休業中の利用は対象外の場合があるので注意</li>
</ul>

<h2>認可外保育施設の種類</h2>
<table>
<tr><th>施設の種類</th><th>特徴</th></tr>
<tr><td>認可外保育施設</td><td>市への届出済みの施設。保育料は施設によりさまざま</td></tr>
<tr><td>企業主導型保育施設</td><td>国の助成で保育料が比較的安い。地域枠での利用が可能</td></tr>
<tr><td>小規模保育事業</td><td>認可の地域型保育。0〜2歳児対象で空きがあることも</td></tr>
</table>

<h2>認可外利用のタイミング</h2>
<p>加点を得るには、認可保育園の<span class="highlight">申込時点で利用していること</span>が必要です。4月入園の場合、10月の申込までに利用を開始する必要があります。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>育休延長を許容する場合は基準点が0点になるため、認可外利用の加点があっても意味がなくなります。入園を本気で希望する場合は育休延長許容としないようにしましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>利用調整基準の詳細は<a href="https://www.hamamatsu-pippi.net/contents/7772.html" target="_blank" rel="noopener">浜松市子育て情報サイト「ぴっぴ」</a>でご確認ください。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 75,
  },
  // ===== 来年度の変更点 (8) =====
  {
    slug: "r8-changes",
    citySlug: "hamamatsu",
    title: "浜松市の令和8年度入園　前年度からの変更点まとめ",
    description:
      "浜松市の令和8年度認可保育施設の利用申込みにおける前年度からの主な変更点をまとめました。",
    image:
      "https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=800&h=400&fit=crop",
    category: "最新情報",
    categoryColor: "purple",
    content: `<h2>令和8年度（2026年度）の主な変更・注目点</h2>
<p>浜松市の令和8年度の保育利用に関する注目ポイントをまとめました。</p>

<h3>1. 行政区の再編に注意</h3>
<p>浜松市は令和6年1月に行政区が再編され、7区から<span class="highlight">3区（中央区・浜名区・天竜区）</span>になりました。申込先や管轄のこども家庭センターが変更されている場合があります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>旧・中区、旧・東区、旧・西区、旧・南区は「中央区」に統合されました。申込書類の提出先を間違えないように注意しましょう。</p>
</div>

<h3>2. こども誰でも通園制度</h3>
<p>令和8年度の本格実施に向けて、浜松市でも「こども誰でも通園制度」の対象施設が拡大しています。保育所等に通っていない0歳6か月〜3歳未満の児童が対象です。</p>

<h3>3. 利用調整基準表の確認</h3>
<p>利用調整基準表は毎年度見直される可能性があります。令和8年度の基準表は10月の申込開始時に配布される冊子で確認してください。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>前年度と同じ点数でも、調整基準表の変更により順位が変わる可能性があります。必ず最新の基準表を確認しましょう。</p>
</div>

<h3>4. 申込状況の公表と希望変更</h3>
<p>一次受付後の申込状況が<span class="highlight">11月25日に公表</span>されます。その後11月26〜28日の3日間で電話による希望園の変更が可能です。この仕組みは前年度から継続されています。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新情報は<a href="https://www.hamamatsu-pippi.net/contents/7769.html" target="_blank" rel="noopener">浜松市子育て情報サイト「ぴっぴ」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 70,
  },
  // ===== 人気エリアと入りやすい地域 (9) =====
  {
    slug: "area-guide",
    citySlug: "hamamatsu",
    title: "浜松市の人気エリアと入りやすい地域ガイド",
    description:
      "浜松市内の区ごとの保育園入園難易度の違いや、比較的入りやすい地域を解説します。",
    image:
      "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&h=400&fit=crop",
    category: "エリア情報",
    categoryColor: "teal",
    content: `<h2>待機児童ゼロでも地域差あり</h2>
<p>浜松市は<span class="highlight">4年以上連続</span>で待機児童ゼロを維持しています。しかし、特に中央区（旧・中区周辺）の人気園は3歳未満児の入園が難しい状況です。</p>

<h2>エリアごとの入園難易度</h2>
<table>
<tr><th>難易度</th><th>エリア</th><th>特徴</th></tr>
<tr><td>激戦</td><td>中央区（旧・中区エリア）</td><td>商業・住宅地が集中し人気園が多い</td></tr>
<tr><td>やや激戦</td><td>中央区（旧・東区・南区エリア）</td><td>ファミリー層が多い住宅地</td></tr>
<tr><td>標準</td><td>中央区（旧・西区エリア）</td><td>園によって差がある</td></tr>
<tr><td>比較的入りやすい</td><td>浜名区・天竜区</td><td>郊外で空きが出やすい</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>旧・中区の中心部は人気園が集中しています。通勤ルートを見直して、少し郊外の園も候補に入れると選択肢が広がります。</p>
</div>

<h2>年齢による違い</h2>
<p>特に<span class="highlight">0〜2歳児クラス</span>の競争が激しいです。3歳以上は幼稚園や認定こども園の幼稚園部分も選択肢に加わるため、入りやすくなります。</p>

<h2>小規模保育・地域型保育の活用</h2>
<p>定員割れしている地域型保育事業所（小規模保育所、事業所内保育所）もあります。認可保育園にこだわらず、地域型保育も選択肢に入れましょう。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>浜松市は政令指定都市として広い市域をもちます。郊外の園は空きがあっても通勤距離が長くなることがあるため、実際の通園・通勤動線を確認しましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>各園の空き状況は<a href="https://www.hamamatsu-pippi.net/shiritai/yoho/nintei/hoikuen-search/" target="_blank" rel="noopener">浜松市子育て情報サイト「ぴっぴ」の募集人数検索</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 60,
  },
  // ===== 入園競争の実態/ボーダーライン (10) =====
  {
    slug: "competition-reality",
    citySlug: "hamamatsu",
    title: "浜松市の入園競争の実態　ボーダーラインは何点？",
    description:
      "浜松市の保育園入園選考における点数分布と実質的なボーダーラインを、min方式の特性とあわせて解説します。",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>浜松市のボーダーラインはmin方式で見る</h2>
<p>浜松市の入園選考はmin方式で、父母のうち低い方の点数が選考に使われます。基準点が最大20点と小さいため、調整点の差が勝負を分けます。</p>

<h2>標準的な点数パターン</h2>
<table>
<tr><th>世帯の状況</th><th>選考点数</th><th>内訳</th></tr>
<tr><td>フルタイム＋就労日数＋育休復帰＋認可外</td><td><span class="highlight">28点</span></td><td>20+3+3+2</td></tr>
<tr><td>フルタイム＋就労日数＋育休復帰</td><td><span class="highlight">26点</span></td><td>20+3+3</td></tr>
<tr><td>フルタイム＋就労日数（加点なし）</td><td>23点</td><td>20+3</td></tr>
<tr><td>フルタイム（就労日数加点なし）</td><td>20点</td><td>20+0</td></tr>
<tr><td>時短（月64〜120h）＋就労日数</td><td>18点</td><td>16+2</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>フルタイム＋就労日数加点の<span class="highlight">23点</span>が実質的なスタートライン。ここに育休復帰（+3点）や認可外利用（+2点）を加えた<span class="highlight">26〜28点</span>が人気園のボーダーラインです。</p>
</div>

<h2>3歳未満は至難の業？</h2>
<p>浜松市中央区（旧・中区周辺）では、特に0〜2歳児クラスの入園が厳しく、フルタイム共働きでも希望の園に入れないケースがあります。</p>

<h2>同点勝負の実態</h2>
<p>基準点が最大20点と幅が小さいmin方式のため、同点勝負になるケースが多いです。同点の場合は以下の要素で判定されます。</p>
<ul>
<li>ひとり親・生活保護世帯が優先</li>
<li>きょうだい在園中の世帯が優先</li>
<li>認可外保育施設の利用実績がある世帯が優先</li>
<li>所得が低い世帯が優先</li>
</ul>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>育休延長を許容する場合は基準点が<span class="highlight">0点</span>になります。入園を本気で希望する場合は、育休延長許容の意思表示をしないようにしてください。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>利用調整基準の詳細は<a href="https://www.hamamatsu-pippi.net/contents/7772.html" target="_blank" rel="noopener">浜松市子育て情報サイト「ぴっぴ」</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 95,
  },

  // ===== 以下 2026-04-07 追加分 40本 =====

  {
    slug: "nursery-visit-guide",
    citySlug: "hamamatsu",
    title: "浜松市の保育園見学ガイド　見学時に確認すべきポイント10選",
    description:
      "浜松市の保育園を見学する際にチェックすべき10のポイントを紹介。見学の予約方法や持ち物、質問例もまとめました。",
    image:
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>保育園見学はいつ行くべき？</h2>
<p>浜松市の保育園見学は<span class="highlight">7月〜9月</span>がベストシーズンです。10月の申込開始前に見学を済ませておきましょう。</p>

<h3>見学の予約方法</h3>
<p>各園に直接電話して見学日を予約します。午前中の保育の様子が見られる時間帯がおすすめです。</p>

<h2>見学時に確認すべき10のポイント</h2>
<ol>
<li><strong>保育士と子どもの接し方</strong>：声かけの仕方や表情を観察</li>
<li><strong>園庭の広さと遊具</strong>：外遊びの環境を確認</li>
<li><strong>室内の清潔さ</strong>：掃除が行き届いているか</li>
<li><strong>給食の内容</strong>：自園調理か外部委託か、アレルギー対応</li>
<li><strong>延長保育の時間と料金</strong>：通勤時間に合うか</li>
<li><strong>お迎え時の駐車場</strong>：台数や停めやすさ</li>
<li><strong>持ち物の多さ</strong>：布おむつか紙おむつか、布団持参の有無</li>
<li><strong>行事の頻度</strong>：保護者参加の行事がどのくらいあるか</li>
<li><strong>病児・病後児対応</strong>：発熱時の基準と呼び出しルール</li>
<li><strong>保育方針</strong>：のびのび系か教育系か</li>
</ol>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>浜松市は市域が広いため、自宅と職場の動線上にある園を優先して見学すると効率的です。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>保育施設の一覧は<a href="https://www.hamamatsu-pippi.net/shiritai/yoho/nintei/hoikuen-search/" target="_blank" rel="noopener">浜松市子育て情報サイト「ぴっぴ」</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 50,
  },
  {
    slug: "zero-vs-one-year",
    citySlug: "hamamatsu",
    title: "浜松市で0歳入園と1歳入園はどちらが有利？比較解説",
    description:
      "浜松市で0歳児クラスと1歳児クラスのどちらで入園するのが有利か、定員数や競争率の違いを比較します。",
    image:
      "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>0歳児クラスと1歳児クラスの違い</h2>
<p>浜松市の認可保育園では、0歳児クラスと1歳児クラスで募集人数や入りやすさが大きく異なります。</p>

<h3>定員の傾向</h3>
<table>
<tr><th>クラス</th><th>募集人数の傾向</th><th>競争率</th></tr>
<tr><td>0歳児（生後57日〜）</td><td>少ない（6〜9名程度）</td><td>比較的低い</td></tr>
<tr><td>1歳児</td><td>0歳からの持ち上がりで枠が少ない</td><td><span class="highlight">高い</span></td></tr>
</table>

<h2>0歳入園のメリット・デメリット</h2>
<h3>メリット</h3>
<ul>
<li>定員の全枠が新規募集のため入りやすい</li>
<li>早くから集団生活に慣れる</li>
</ul>
<h3>デメリット</h3>
<ul>
<li>育休を早めに切り上げる必要がある</li>
<li>0歳児を受け入れていない園もある</li>
</ul>

<h2>1歳入園のメリット・デメリット</h2>
<h3>メリット</h3>
<ul>
<li>育休を1年間取得できる</li>
<li>育休復帰加点（+3点）が使える</li>
</ul>
<h3>デメリット</h3>
<ul>
<li>0歳児からの持ち上がりで空き枠が少ない</li>
<li>人気園では最も競争が激しい年齢</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>浜松市では1歳児クラスが最も激戦です。育休復帰加点（+3点）を活用しても入れない場合は、0歳入園も検討しましょう。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 55,
  },
  {
    slug: "single-parent-guide",
    citySlug: "hamamatsu",
    title: "浜松市のひとり親世帯の保活ガイド　加点と優先措置を解説",
    description:
      "浜松市でひとり親世帯が保育園に申し込む際の加点や優先措置、利用できる支援制度をまとめました。",
    image:
      "https://images.unsplash.com/photo-1531983412531-1f49a365ffed?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>ひとり親世帯の加点</h2>
<p>浜松市ではひとり親世帯に<span class="highlight">+5点</span>または<span class="highlight">+3点</span>の調整点が加算されます。</p>

<h3>加点の内訳</h3>
<table>
<tr><th>状況</th><th>加点</th></tr>
<tr><td>ひとり親世帯（配偶者なし）</td><td>+5点</td></tr>
<tr><td>単身赴任等で実質ひとり親状態</td><td>+3点</td></tr>
</table>

<h2>同点時の優先</h2>
<p>ひとり親世帯は同点になった場合の<span class="highlight">優先段階でも最上位</span>に位置づけられています。加点＋同点優先の二重のメリットがあります。</p>

<h2>ひとり親向けの支援制度</h2>
<ul>
<li><strong>保育料の軽減</strong>：市民税非課税世帯は保育料が無料</li>
<li><strong>児童扶養手当</strong>：所得に応じて月額最大45,500円（2026年度、要確認）</li>
<li><strong>ひとり親家庭等医療費助成</strong>：医療費の自己負担を軽減</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>ひとり親世帯はフルタイム（20点）＋就労日数（+3点）＋ひとり親（+5点）＝<span class="highlight">28点</span>となり、非常に有利に選考を進められます。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>ひとり親支援制度は<a href="https://www.city.hamamatsu.shizuoka.jp/" target="_blank" rel="noopener">浜松市公式サイト</a>でご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 60,
  },
  {
    slug: "ikukyu-timing",
    citySlug: "hamamatsu",
    title: "浜松市で育休はいつまで取るべき？復帰タイミングと点数の関係",
    description:
      "浜松市での育休復帰のベストタイミングを、入園選考の点数制度とあわせて解説します。",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=400&fit=crop",
    category: "育休・復職",
    categoryColor: "purple",
    content: `<h2>育休復帰と保育園入園の関係</h2>
<p>浜松市では育休から復帰するタイミングが入園選考の点数に大きく影響します。</p>

<h3>育休復帰加点</h3>
<p>入園月に育休から復帰する場合、<span class="highlight">+3点</span>の調整点が加算されます。</p>

<h2>復帰タイミング別の比較</h2>
<table>
<tr><th>パターン</th><th>点数</th><th>メリット</th><th>デメリット</th></tr>
<tr><td>0歳4月入園→即復帰</td><td>23点＋育休復帰3点＝26点</td><td>育休復帰加点あり</td><td>育休が短い</td></tr>
<tr><td>1歳4月入園→即復帰</td><td>23点＋育休復帰3点＝26点</td><td>育休1年確保＋加点</td><td>1歳児は競争率高</td></tr>
<tr><td>育休延長→2歳4月</td><td>23点＋育休復帰3点＝26点</td><td>育休が長い</td><td>2歳児枠は少ない</td></tr>
</table>

<h2>育休延長許容に注意</h2>
<p>浜松市では「育休延長を許容する」と判断された場合、基準点が<span class="highlight">0点</span>になります。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>入園を本気で希望するなら「育休延長許容」の意思表示をしないでください。0点になると事実上入園不可能です。</p>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>1歳4月入園が最もバランスの良いタイミングです。育休を1年確保しつつ、育休復帰加点（+3点）も活用できます。ただし1歳児クラスは競争が激しいため、加点をしっかり積み上げましょう。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 58,
  },
  {
    slug: "ninkagai-selection",
    citySlug: "hamamatsu",
    title: "浜松市の認可外保育施設の選び方　加点狙いの注意点も",
    description:
      "浜松市の認可外保育施設の種類と選び方、認可入園の加点を狙う際の注意点を解説します。",
    image:
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=400&fit=crop",
    category: "施設選び",
    categoryColor: "teal",
    content: `<h2>浜松市の認可外保育施設の種類</h2>
<table>
<tr><th>種類</th><th>特徴</th></tr>
<tr><td>認可外保育施設</td><td>市に届出済み。保育料は施設により異なる</td></tr>
<tr><td>企業主導型保育施設</td><td>国の助成あり。地域枠で入所可能</td></tr>
<tr><td>一時預かり事業</td><td>リフレッシュや急な用事の際に利用可能</td></tr>
</table>

<h2>選び方のチェックポイント</h2>
<ul>
<li><strong>立入調査の結果</strong>：浜松市が実施する立入調査の結果を確認</li>
<li><strong>保育料と追加費用</strong>：月額だけでなく給食費や教材費も確認</li>
<li><strong>保育時間</strong>：早朝・延長の対応時間</li>
<li><strong>保育士の配置</strong>：有資格者の割合</li>
<li><strong>連携施設の有無</strong>：認可園への優先入園制度があるか</li>
</ul>

<h2>加点狙いの注意点</h2>
<p>認可外利用で<span class="highlight">+2点</span>の加点を得るには、申込時点で有償利用していることが必要です。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>加点目的だけで認可外に預けるのはコストがかかります。認可外保育料は月3〜8万円程度。家計への影響も考慮して判断しましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>認可外保育施設一覧は<a href="https://www.hamamatsu-pippi.net/" target="_blank" rel="noopener">浜松市子育て情報サイト「ぴっぴ」</a>でご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 48,
  },
  {
    slug: "futago-hokatsu",
    citySlug: "hamamatsu",
    title: "浜松市で双子の保活　同時入園のコツと注意点",
    description:
      "浜松市で双子（多胎児）の保育園入園を目指す場合のポイント、同じ園に入るコツを解説します。",
    image:
      "https://images.unsplash.com/photo-1491013516836-7db643ee125a?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>双子の保活で知っておくべきこと</h2>
<p>双子（多胎児）の保活は、1人の子どもの保活とは異なる悩みがあります。「同じ園に入れるか」が最大の関心事です。</p>

<h2>浜松市の多胎児に関する配慮</h2>
<p>浜松市では多胎児の同時申込について、利用調整の際に一定の配慮がなされています。具体的な取り扱いは年度によって異なる場合があるため、こども家庭センターに確認してください。</p>

<h3>同じ園に入るためのコツ</h3>
<ul>
<li><strong>定員に余裕のある園を選ぶ</strong>：2名同時入園が可能な園を探す</li>
<li><strong>希望園を多めに記入する</strong>：浜松市では最大5か所まで希望可能</li>
<li><strong>小規模保育も検討する</strong>：空きがある場合がある</li>
<li><strong>二次受付も活用する</strong>：一次で保留の場合は希望変更が可能</li>
</ul>

<h2>別々の園になった場合</h2>
<p>別々の園になると送迎の負担が大きくなります。その場合は翌年度の転園申請で同じ園を希望することができます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>多胎児の保活は早めの情報収集が重要です。こども家庭センターに相談すると、具体的なアドバイスがもらえます。</p>
</div>

<div class="info-box">
<p><strong>注意</strong></p>
<p>多胎児に対する加点や配慮の詳細は年度ごとに変わる可能性があります。最新の情報は<a href="https://www.hamamatsu-pippi.net/contents/7769.html" target="_blank" rel="noopener">浜松市子育て情報サイト「ぴっぴ」</a>でご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 42,
  },
  {
    slug: "hoiku-mama-interview",
    citySlug: "hamamatsu",
    title: "浜松市の保活体験談　先輩ママが語る成功のポイント",
    description:
      "浜松市で保活を経験した先輩ママの体験談をもとに、保活成功のポイントと失敗しがちな落とし穴を紹介します。",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>保活成功のポイント（体験談ベース）</h2>
<p>浜松市で保活を経験した先輩ママたちの声をもとに、成功のポイントをまとめました。</p>

<div class="point-box">
<p><strong>注意</strong></p>
<p>以下は一般的な体験談をもとにした参考情報です。年度や園によって状況は異なります。</p>
</div>

<h3>成功した人の共通点</h3>
<ul>
<li><strong>早めの情報収集</strong>：妊娠中から保育園の情報を集め始めた</li>
<li><strong>複数園を見学</strong>：3〜5か所は見学して比較した</li>
<li><strong>加点を最大限活用</strong>：就労日数加点や育休復帰加点を漏れなく申告</li>
<li><strong>希望園を5か所記入</strong>：人気園だけでなく空きのある園も候補に</li>
<li><strong>11月の申込状況公表を活用</strong>：倍率を見て希望園を変更した</li>
</ul>

<h3>よくある失敗パターン</h3>
<ul>
<li>就労証明書の依頼が遅れて締切に間に合わなかった</li>
<li>人気園1か所しか書かなかったため保留になった</li>
<li>育休延長許容にチェックしてしまい0点になった</li>
<li>min方式を知らず、片方の点数が低いまま申し込んだ</li>
</ul>

<h2>先輩ママからのアドバイス</h2>
<p>「浜松市はmin方式なので、夫婦で点数を揃えることが大事。就労証明書は早めに依頼して、加点できる項目を全部確認するのがコツです。」</p>`,
    publishedAt: "2026-04-07",
    popularity: 45,
  },
  {
    slug: "waiting-child-data",
    citySlug: "hamamatsu",
    title: "浜松市の待機児童数の推移　4年連続ゼロの実態",
    description:
      "浜松市の待機児童数の推移と、待機児童ゼロを維持できている背景、隠れ待機児童の実態を解説します。",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop",
    category: "最新情報",
    categoryColor: "purple",
    content: `<h2>浜松市の待機児童数の推移</h2>
<p>浜松市は<span class="highlight">4年以上連続</span>で待機児童ゼロを達成しています。</p>

<h3>待機児童ゼロの背景</h3>
<ul>
<li>保育施設の新設・増設を計画的に推進</li>
<li>小規模保育事業や企業主導型保育の活用</li>
<li>市域が広く、郊外に余裕のある施設が存在</li>
</ul>

<h2>「隠れ待機児童」の存在</h2>
<p>待機児童ゼロでも、希望の園に入れない「隠れ待機児童（保留児童）」は存在します。</p>
<ul>
<li>特定の園のみ希望して保留になったケース</li>
<li>認可外や企業主導型に預けているため待機にカウントされないケース</li>
<li>育休を延長して申込を見送ったケース</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>「待機児童ゼロ＝必ず入れる」ではありません。特に中央区の人気園は3歳未満の枠が限られています。希望園は複数記入しましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>待機児童数の最新データは<a href="https://www.city.hamamatsu.shizuoka.jp/" target="_blank" rel="noopener">浜松市公式サイト</a>で公表されています。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 52,
  },
  {
    slug: "small-nursery-guide",
    citySlug: "hamamatsu",
    title: "浜松市の小規模保育事業ガイド　メリットと3歳の壁対策",
    description:
      "浜松市の小規模保育事業の特徴やメリット、3歳の壁への対策方法を詳しく解説します。",
    image:
      "https://images.unsplash.com/photo-1587654780210-e3ca2d074509?w=800&h=400&fit=crop",
    category: "施設選び",
    categoryColor: "teal",
    content: `<h2>小規模保育事業とは</h2>
<p>0〜2歳児を対象とした定員6〜19名の保育施設です。浜松市内にも多くの小規模保育事業所があります。</p>

<h3>メリット</h3>
<ul>
<li>少人数できめ細かい保育が受けられる</li>
<li>認可保育園より入りやすい傾向</li>
<li>アットホームな雰囲気で子どもが安心しやすい</li>
</ul>

<h3>デメリット</h3>
<ul>
<li>2歳までしか利用できない</li>
<li>園庭がない施設もある</li>
<li>行事が少ない場合がある</li>
</ul>

<h2>3歳の壁の対策</h2>
<p>小規模保育は2歳までなので、3歳からの預け先を確保する必要があります。</p>
<ul>
<li><strong>連携施設がある園を選ぶ</strong>：卒園後に連携先に優先入園できる場合がある</li>
<li><strong>認定こども園を検討</strong>：3歳から幼稚園部分として利用可能</li>
<li><strong>幼稚園＋預かり保育</strong>：共働きでも利用可能な園が増えている</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>小規模保育は「3歳の壁」がありますが、連携施設がある園を選べば安心です。見学時に必ず連携先を確認しましょう。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 46,
  },
  {
    slug: "secondchild-hokatsu",
    citySlug: "hamamatsu",
    title: "浜松市の第2子保活ガイド　きょうだい加点と同園入園のコツ",
    description:
      "浜松市で第2子の保育園入園を目指す際のきょうだい加点の有無や同じ園に入るための戦略を解説します。",
    image:
      "https://images.unsplash.com/photo-1491013516836-7db643ee125a?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>浜松市のきょうだいに関する優先措置</h2>
<p>浜松市では、きょうだいが在園中の園に申し込む場合、同点時の<span class="highlight">優先段階</span>で有利になります。</p>

<h3>きょうだい在園中の優先</h3>
<p>同点の場合、きょうだいが在園中の世帯が優先されます。これは調整点の加点ではなく、同点時の優先順位として機能します。</p>

<h2>同じ園に入るための戦略</h2>
<ul>
<li><strong>上の子が在園中の園を第1希望にする</strong>：同点優先が働く</li>
<li><strong>加点を最大限に積む</strong>：育休復帰（+3点）や認可外利用（+2点）</li>
<li><strong>上の子の入園時に長く在籍できる園を選ぶ</strong>：第2子の保活を見据えた選択</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>浜松市のmin方式では、第2子申込時に育休復帰加点（+3点）が使えるため、フルタイム＋就労日数＋育休復帰＝<span class="highlight">26点</span>で申し込めます。きょうだい優先と合わせれば、同じ園に入れる可能性は高いです。</p>
</div>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>きょうだい優先は「同点の場合」にのみ機能します。点数自体を高く保つことが前提です。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 56,
  },
  {
    slug: "self-employed-score",
    citySlug: "hamamatsu",
    title: "浜松市で自営業・フリーランスの保育園点数は？必要書類も解説",
    description:
      "浜松市で自営業やフリーランスの方が保育園に申し込む際の点数の仕組みと必要書類を解説します。",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>自営業・フリーランスの基準点</h2>
<p>浜松市では自営業・フリーランスも会社員と同じ基準で点数が決まります。</p>

<table>
<tr><th>就労時間</th><th>基準点</th></tr>
<tr><td>月120時間以上</td><td>20点</td></tr>
<tr><td>月64〜120時間未満</td><td>16点</td></tr>
<tr><td>月48〜64時間未満</td><td>12点</td></tr>
</table>

<h2>必要書類</h2>
<ul>
<li><strong>就労証明書（自営用）</strong>：自分で記入する様式</li>
<li><strong>開業届のコピー</strong>または<strong>確定申告書のコピー</strong></li>
<li><strong>業務内容がわかる資料</strong>：ホームページの印刷や名刺など</li>
</ul>

<h2>自営業で注意すべきポイント</h2>
<ul>
<li>就労時間を客観的に証明する必要がある</li>
<li>確定申告をしていないと就労実態の証明が難しい</li>
<li>開業したばかりの場合は追加資料を求められることがある</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>自営業でも月120時間以上の就労実態があれば、フルタイム会社員と同じ20点を得られます。確定申告書や開業届でしっかり証明しましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>就労証明書の様式は<a href="https://www.hamamatsu-pippi.net/contents/7769.html" target="_blank" rel="noopener">浜松市子育て情報サイト「ぴっぴ」</a>からダウンロードできます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 50,
  },
  {
    slug: "naishoku-score",
    citySlug: "hamamatsu",
    title: "浜松市で内職・在宅ワークの保育園点数は？認定のポイント",
    description:
      "浜松市で内職や在宅ワークをしている場合の保育園入園の点数と、就労認定のポイントを解説します。",
    image:
      "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>在宅ワーク・内職の基準点</h2>
<p>浜松市では在宅ワークや内職も「就労」として認定されます。基準点は就労時間で決まります。</p>

<table>
<tr><th>就労時間</th><th>基準点</th></tr>
<tr><td>月120時間以上</td><td>20点</td></tr>
<tr><td>月64〜120時間未満</td><td>16点</td></tr>
<tr><td>月48〜64時間未満</td><td>12点</td></tr>
</table>

<h2>在宅ワークの就労証明</h2>
<ul>
<li><strong>雇用されている場合</strong>：勤務先に就労証明書を依頼</li>
<li><strong>業務委託の場合</strong>：発注元に就労証明書の記入を依頼、または自営業用の書式で申告</li>
<li><strong>フリーランスの場合</strong>：開業届＋確定申告書＋業務内容の資料</li>
</ul>

<h2>注意点</h2>
<ul>
<li>「居宅外就労」と「居宅内就労」で点数が異なる自治体もありますが、浜松市では就労時間で一律に判定されます</li>
<li>在宅ワークの場合、「本当に月120時間以上働いているか」を証明する客観的な資料が重要</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>在宅ワークでもフルタイム相当の時間働いていれば20点を得られます。就労時間の記録をつけておくと、書類作成時に役立ちます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 44,
  },
  {
    slug: "kyushoku-hokatsu",
    citySlug: "hamamatsu",
    title: "浜松市で求職中でも保育園に入れる？求職活動の点数と対策",
    description:
      "浜松市で求職活動中に保育園に申し込む場合の点数と、入園するための具体的な対策を解説します。",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>求職活動中の基準点</h2>
<p>浜松市では求職活動中も保育の必要性が認められますが、基準点は就労中より低くなります。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>求職活動中の具体的な点数は利用調整基準表で確認してください。一般的に就労中（最大20点）より大幅に低い点数になります。</p>
</div>

<h2>求職中に入園するための対策</h2>
<ul>
<li><strong>先に就職先を決める</strong>：内定があれば「就労内定」として申込可能</li>
<li><strong>パートでも就労開始する</strong>：週数日のパートでも就労として認定される</li>
<li><strong>認可外保育施設を利用する</strong>：求職活動中でも利用可能な施設がある</li>
<li><strong>一時預かりを活用する</strong>：就職活動中の預け先として利用可能</li>
</ul>

<h2>入園後の就職活動期間</h2>
<p>求職活動を理由に入園した場合、入園後一定期間内に就職する必要があります。期限内に就職できなかった場合は退園となる可能性があります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>求職中の点数は低いため、できれば内定を得てから「就労内定」として申し込むのが有利です。パートや派遣でもフルタイム相当の就労時間があれば高い点数になります。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 40,
  },
  {
    slug: "tenshoku-timing",
    citySlug: "hamamatsu",
    title: "浜松市で保活中に転職するとどうなる？点数への影響と注意点",
    description:
      "浜松市の保育園申込期間中や入園後に転職した場合の点数への影響、必要な手続きを解説します。",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=400&fit=crop",
    category: "育休・復職",
    categoryColor: "purple",
    content: `<h2>申込前に転職した場合</h2>
<p>申込前に転職を完了していれば、新しい勤務先の就労証明書を提出するだけです。フルタイムであれば基準点20点は変わりません。</p>

<h2>申込後〜入園前に転職した場合</h2>
<ul>
<li>速やかにこども家庭センターに届け出る必要がある</li>
<li>新しい就労証明書を提出する</li>
<li>就労時間が減ると基準点が下がる可能性がある</li>
</ul>

<h2>入園後に転職した場合</h2>
<ul>
<li>退職後、求職活動期間として一定期間は保育を継続できる</li>
<li>新しい勤務先が決まったら就労証明書を再提出</li>
<li>就労時間が大幅に減ると保育認定の変更が必要な場合がある</li>
</ul>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>転職による空白期間が長くなると退園の対象になる場合があります。転職を計画する場合は、空白期間ができないようにするのが安全です。</p>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>保活中の転職は、新しい勤務先でフルタイム以上の就労条件を確保できるなら問題ありません。就労時間が減る転職は、点数に直接影響するので注意が必要です。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 43,
  },
  {
    slug: "age2-nyuen",
    citySlug: "hamamatsu",
    title: "浜松市で2歳児入園を狙うには？枠の少なさと対策",
    description:
      "浜松市の2歳児クラスの入園事情と、枠が少ない中で入園するための具体的な対策を解説します。",
    image:
      "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>2歳児クラスの入園事情</h2>
<p>2歳児クラスは0歳・1歳からの在園児で枠が埋まっていることが多く、新規募集が<span class="highlight">極めて少ない</span>クラスです。</p>

<h3>年齢別の入りやすさ</h3>
<table>
<tr><th>クラス</th><th>入りやすさ</th><th>理由</th></tr>
<tr><td>0歳児</td><td>比較的入りやすい</td><td>全枠が新規募集</td></tr>
<tr><td>1歳児</td><td>激戦</td><td>0歳からの持ち上がりで枠が減る</td></tr>
<tr><td>2歳児</td><td>非常に厳しい</td><td>0・1歳からの持ち上がりでほぼ枠なし</td></tr>
<tr><td>3歳児</td><td>やや緩和</td><td>幼稚園に移る子が出て枠が増える場合がある</td></tr>
</table>

<h2>2歳児入園の対策</h2>
<ul>
<li><strong>定員増の園を狙う</strong>：2歳児クラスから定員が増える園がある</li>
<li><strong>新設園を狙う</strong>：新規開設の園は全枠が新規募集</li>
<li><strong>小規模保育からの卒園児枠</strong>：連携先の園で3歳枠が空く場合がある</li>
<li><strong>加点を最大限にする</strong>：認可外利用（+2点）や育休復帰（+3点）を活用</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>2歳児入園を狙うなら、それまでの間認可外に預けて加点（+2点）を確保しておくのが効果的です。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 47,
  },
  {
    slug: "age3-ikou",
    citySlug: "hamamatsu",
    title: "浜松市の3歳からの預け先　保育園・幼稚園・こども園の比較",
    description:
      "浜松市で3歳からの預け先として保育園・幼稚園・認定こども園を比較し、選び方のポイントを解説します。",
    image:
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=400&fit=crop",
    category: "施設選び",
    categoryColor: "teal",
    content: `<h2>3歳からの選択肢</h2>
<table>
<tr><th>施設</th><th>保育時間</th><th>費用</th><th>特徴</th></tr>
<tr><td>認可保育園</td><td>7:00〜19:00程度</td><td>無償化対象</td><td>長時間保育が可能</td></tr>
<tr><td>幼稚園</td><td>9:00〜14:00程度</td><td>無償化対象</td><td>教育カリキュラムが充実</td></tr>
<tr><td>認定こども園</td><td>利用区分による</td><td>無償化対象</td><td>教育と保育の一体提供</td></tr>
</table>

<h2>幼稚園＋預かり保育という選択</h2>
<p>3〜5歳児は幼児教育・保育の無償化の対象です。幼稚園の場合も預かり保育の利用料が月額11,300円まで無償化されます（保育の必要性の認定が必要）。</p>

<h3>幼稚園預かり保育のメリット</h3>
<ul>
<li>教育カリキュラムが充実している園が多い</li>
<li>保育園より入りやすい場合がある</li>
<li>利用調整（点数選考）がない園が多い</li>
</ul>

<h3>デメリット</h3>
<ul>
<li>預かり保育の時間が短い園がある</li>
<li>夏休み等の長期休暇中の預かりがない園がある</li>
<li>弁当持参の園が多い</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>3歳以降は選択肢が広がります。保育園だけにこだわらず、幼稚園やこども園も含めて検討しましょう。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 44,
  },
  {
    slug: "nyuyoji-age0",
    citySlug: "hamamatsu",
    title: "浜松市の0歳児保育　受入月齢と準備のポイント",
    description:
      "浜松市の0歳児保育の受入開始月齢、必要な持ち物、慣らし保育の流れを解説します。",
    image:
      "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>0歳児保育の受入月齢</h2>
<p>浜松市の認可保育園では、多くの園が<span class="highlight">生後57日（生後2か月）</span>から受入れています。ただし園によって受入開始月齢は異なります。</p>

<h3>受入月齢の目安</h3>
<table>
<tr><th>施設タイプ</th><th>受入開始月齢</th></tr>
<tr><td>認可保育園（多くの園）</td><td>生後57日〜</td></tr>
<tr><td>小規模保育</td><td>生後57日〜（園による）</td></tr>
<tr><td>認定こども園</td><td>園による（生後6か月〜が多い）</td></tr>
</table>

<h2>0歳児保育の準備</h2>
<ul>
<li><strong>持ち物</strong>：着替え、おむつ、タオル、哺乳瓶、連絡帳など</li>
<li><strong>慣らし保育</strong>：1〜2週間かけて徐々に保育時間を延ばす</li>
<li><strong>母乳・ミルク</strong>：搾乳対応の有無を確認</li>
<li><strong>離乳食</strong>：園での離乳食の進め方を相談</li>
</ul>

<h2>慣らし保育のスケジュール例</h2>
<table>
<tr><th>日程</th><th>保育時間</th></tr>
<tr><td>1〜2日目</td><td>2時間程度</td></tr>
<tr><td>3〜4日目</td><td>午前中（給食まで）</td></tr>
<tr><td>5日目〜1週間</td><td>午後まで（昼寝後）</td></tr>
<tr><td>2週目〜</td><td>通常保育</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>慣らし保育期間中は仕事を休むか時短にする必要があります。育休復帰のタイミングは、慣らし保育の期間を考慮して決めましょう。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 41,
  },
  {
    slug: "nintei-kodomoen",
    citySlug: "hamamatsu",
    title: "浜松市の認定こども園ガイド　保育園との違いと選び方",
    description:
      "浜松市にある認定こども園の特徴、保育園との違い、1号・2号・3号認定の仕組みを解説します。",
    image:
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=400&fit=crop",
    category: "施設選び",
    categoryColor: "teal",
    content: `<h2>認定こども園とは</h2>
<p>教育（幼稚園機能）と保育（保育園機能）を一体的に提供する施設です。浜松市にも多くの認定こども園があります。</p>

<h3>認定区分</h3>
<table>
<tr><th>区分</th><th>対象</th><th>利用時間</th></tr>
<tr><td>1号認定（教育）</td><td>3〜5歳、保育の必要なし</td><td>教育標準時間（4時間程度）</td></tr>
<tr><td>2号認定（保育）</td><td>3〜5歳、保育の必要あり</td><td>保育標準時間（最大11時間）</td></tr>
<tr><td>3号認定（保育）</td><td>0〜2歳、保育の必要あり</td><td>保育標準時間（最大11時間）</td></tr>
</table>

<h2>保育園との違い</h2>
<ul>
<li><strong>就労をやめても退園しなくてよい</strong>：1号認定に切り替え可能</li>
<li><strong>教育的なカリキュラム</strong>がある園が多い</li>
<li><strong>2号・3号認定は保育園と同じ利用調整基準</strong>で選考される</li>
</ul>

<h2>選び方のポイント</h2>
<ul>
<li>教育方針が家庭と合っているか</li>
<li>延長保育の時間帯と料金</li>
<li>給食の提供方法</li>
<li>通園バスの有無</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>認定こども園は転職や退職をしても退園しなくてよいのが大きなメリットです。将来のライフプラン変更に柔軟に対応できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 46,
  },
  {
    slug: "kigyou-shudogata",
    citySlug: "hamamatsu",
    title: "浜松市の企業主導型保育施設とは？メリットと利用方法",
    description:
      "浜松市にある企業主導型保育施設の特徴、メリット・デメリット、地域枠での利用方法を解説します。",
    image:
      "https://images.unsplash.com/photo-1587654780210-e3ca2d074509?w=800&h=400&fit=crop",
    category: "施設選び",
    categoryColor: "teal",
    content: `<h2>企業主導型保育施設とは</h2>
<p>企業が従業員の子どもを預けるために設置した保育施設で、国の助成を受けています。「従業員枠」と「地域枠」があり、地域の方も利用できます。</p>

<h3>認可保育園との違い</h3>
<table>
<tr><th></th><th>企業主導型</th><th>認可保育園</th></tr>
<tr><td>申込先</td><td>施設に直接</td><td>市（こども家庭センター）</td></tr>
<tr><td>選考方法</td><td>施設が独自に判定</td><td>利用調整基準点</td></tr>
<tr><td>保育料</td><td>施設ごとに設定</td><td>市民税額で決定</td></tr>
<tr><td>対象年齢</td><td>施設による</td><td>0〜5歳</td></tr>
</table>

<h2>メリット</h2>
<ul>
<li>利用調整（点数選考）がないため、点数が低くても入れる可能性がある</li>
<li>国の助成により保育料が比較的安い</li>
<li>少人数制の施設が多い</li>
</ul>

<h2>デメリット</h2>
<ul>
<li>園庭がない施設が多い</li>
<li>施設の質にばらつきがある</li>
<li>定員が少ないため空きがない場合もある</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>認可保育園に入れなかった場合の選択肢として有力です。企業主導型に預けながら翌年度の認可を申請すれば、認可外利用の加点（+2点）も得られます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 43,
  },
  {
    slug: "yakan-hoiku",
    citySlug: "hamamatsu",
    title: "浜松市の夜間保育・延長保育ガイド　遅い時間の預け先",
    description:
      "浜松市で夜間や延長保育が利用できる施設の情報と、利用条件・料金について解説します。",
    image:
      "https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=800&h=400&fit=crop",
    category: "施設選び",
    categoryColor: "teal",
    content: `<h2>延長保育の概要</h2>
<p>浜松市の認可保育園の多くでは延長保育を実施しています。通常の保育時間を超えて預けたい場合に利用できます。</p>

<h3>保育時間の区分</h3>
<table>
<tr><th>認定区分</th><th>利用可能時間</th></tr>
<tr><td>保育標準時間</td><td>最大11時間（例：7:00〜18:00）</td></tr>
<tr><td>保育短時間</td><td>最大8時間（例：8:30〜16:30）</td></tr>
<tr><td>延長保育</td><td>上記を超える時間（園により19:00〜20:00頃まで）</td></tr>
</table>

<h2>延長保育の料金</h2>
<p>延長保育の料金は園によって異なります。一般的に月額2,000〜5,000円程度、または日額200〜500円程度です。</p>

<h2>夜間保育について</h2>
<p>浜松市では認可の夜間保育所は限られています。夜間の就労がある方は、以下の選択肢を検討してください。</p>
<ul>
<li>延長保育で20時頃まで対応している園を探す</li>
<li>認可外保育施設の中で夜間対応している施設を探す</li>
<li>ファミリー・サポート・センターの夜間支援を利用する</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>各園の延長保育の実施状況は<a href="https://www.hamamatsu-pippi.net/shiritai/yoho/nintei/hoikuen-search/" target="_blank" rel="noopener">浜松市子育て情報サイト「ぴっぴ」</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 38,
  },
  {
    slug: "mushoka-seido",
    citySlug: "hamamatsu",
    title: "浜松市の幼児教育・保育無償化制度　対象と手続きを解説",
    description:
      "浜松市における幼児教育・保育の無償化制度の対象範囲、手続き方法、副食費の扱いについて解説します。",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "お金の話",
    categoryColor: "rose",
    content: `<h2>無償化の対象</h2>
<p>2019年10月から始まった幼児教育・保育の無償化制度について、浜松市での適用範囲をまとめます。</p>

<h3>対象施設と年齢</h3>
<table>
<tr><th>施設</th><th>対象年齢</th><th>無償化の内容</th></tr>
<tr><td>認可保育園</td><td>3〜5歳（全員）</td><td>保育料が無料</td></tr>
<tr><td>認可保育園</td><td>0〜2歳（非課税世帯）</td><td>保育料が無料</td></tr>
<tr><td>幼稚園</td><td>3〜5歳</td><td>月額25,700円まで無料</td></tr>
<tr><td>認可外保育施設</td><td>3〜5歳</td><td>月額37,000円まで無料</td></tr>
<tr><td>認可外保育施設</td><td>0〜2歳（非課税世帯）</td><td>月額42,000円まで無料</td></tr>
</table>

<h2>無償化でも必要な費用</h2>
<ul>
<li><strong>副食費（おかず代）</strong>：月額4,500円程度（園による）</li>
<li><strong>延長保育料</strong>：利用した場合</li>
<li><strong>行事費・教材費</strong>：園による</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>3〜5歳の保育料は無料ですが、副食費や延長保育料は自己負担です。年収360万円未満の世帯は副食費も免除される場合があります。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>無償化の詳細は<a href="https://www.city.hamamatsu.shizuoka.jp/" target="_blank" rel="noopener">浜松市公式サイト</a>でご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 52,
  },
  {
    slug: "shokuhi-jippi",
    citySlug: "hamamatsu",
    title: "浜松市の保育園の給食費・副食費はいくら？実費徴収の内訳",
    description:
      "浜松市の保育園で実費徴収される給食費（副食費）の目安や免除条件について解説します。",
    image:
      "https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=800&h=400&fit=crop",
    category: "お金の話",
    categoryColor: "rose",
    content: `<h2>保育園の給食費（副食費）</h2>
<p>3〜5歳児の保育料は無償化されていますが、<span class="highlight">副食費（おかず・おやつ代）</span>は実費徴収されます。</p>

<h3>副食費の目安</h3>
<table>
<tr><th>対象</th><th>金額の目安</th></tr>
<tr><td>3〜5歳児（2号認定）</td><td>月額4,500円程度</td></tr>
<tr><td>1号認定（認定こども園）</td><td>園により異なる</td></tr>
</table>

<h2>副食費の免除条件</h2>
<ul>
<li><strong>年収360万円未満相当の世帯</strong>：副食費が免除</li>
<li><strong>第3子以降</strong>：副食費が免除（一定の条件あり）</li>
</ul>

<h2>その他の実費徴収</h2>
<ul>
<li>延長保育料</li>
<li>行事費</li>
<li>日用品費・教材費</li>
<li>布団リース代（園による）</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>保育料が無料でも、副食費やその他の実費で月5,000〜10,000円程度かかります。入園前に園に確認しておきましょう。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 39,
  },
  {
    slug: "hoikuryo-keisan",
    citySlug: "hamamatsu",
    title: "浜松市の保育料はいくら？0〜2歳児の計算方法と目安",
    description:
      "浜松市の0〜2歳児の保育料の計算方法、市民税額との関係、保育料の軽減制度を解説します。",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "お金の話",
    categoryColor: "rose",
    content: `<h2>保育料の仕組み</h2>
<p>0〜2歳児の保育料は<span class="highlight">世帯の市民税所得割額</span>によって決まります。3〜5歳児は無償化により保育料無料です。</p>

<h3>保育料の決まり方</h3>
<ul>
<li>4月〜8月：前年度の市民税額をもとに決定</li>
<li>9月〜3月：当年度の市民税額をもとに決定</li>
</ul>

<h2>保育料の目安</h2>
<p>浜松市の保育料は所得に応じて段階的に設定されています。具体的な金額は浜松市が公表する保育料表で確認してください。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>保育料は毎年度改定される可能性があります。正確な金額は浜松市の最新の保育料表をご確認ください。</p>
</div>

<h2>保育料の軽減制度</h2>
<ul>
<li><strong>きょうだい同時利用</strong>：第2子は半額、第3子以降は無料（一定の条件あり）</li>
<li><strong>市民税非課税世帯</strong>：保育料が無料</li>
<li><strong>ひとり親世帯</strong>：保育料が軽減される場合がある</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>保育料は世帯の市民税額で決まるため、ふるさと納税や住宅ローン控除では下がりません（これらは所得税や住民税の税額控除であり、保育料算定に用いる市民税所得割額には影響しない場合があります）。詳しくは市に確認してください。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>保育料表は<a href="https://www.city.hamamatsu.shizuoka.jp/" target="_blank" rel="noopener">浜松市公式サイト</a>で公表されています。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 55,
  },
  {
    slug: "zeikin-koujo",
    citySlug: "hamamatsu",
    title: "浜松市で保育料を安くするには？税金控除と軽減制度",
    description:
      "浜松市で0〜2歳児の保育料を抑えるための税金の仕組みや軽減制度について解説します。",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "お金の話",
    categoryColor: "rose",
    content: `<h2>保育料と市民税の関係</h2>
<p>浜松市の0〜2歳児の保育料は世帯の市民税所得割額で決まります。市民税が低ければ保育料も安くなります。</p>

<h2>市民税所得割額を下げる方法</h2>
<ul>
<li><strong>iDeCo（個人型確定拠出年金）</strong>：掛金が全額所得控除になり、市民税が下がる</li>
<li><strong>医療費控除</strong>：出産費用や通院費が10万円を超えた場合に申告</li>
<li><strong>配偶者控除・扶養控除</strong>：適用漏れがないか確認</li>
<li><strong>生命保険料控除</strong>：保険に加入していれば控除対象</li>
</ul>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>ふるさと納税は税額控除であり、市民税所得割額の算定には影響しない場合があります。保育料の軽減には直接つながらないことがあるため、詳しくは市に確認してください。</p>
</div>

<h2>浜松市の軽減制度</h2>
<ul>
<li><strong>多子軽減</strong>：第2子半額、第3子以降無料（条件あり）</li>
<li><strong>非課税世帯</strong>：保育料無料</li>
<li><strong>ひとり親世帯</strong>：保育料軽減あり</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>保育料を下げるにはiDeCoが最も効果的です。毎月の掛金が全額所得控除になるため、市民税が下がり、結果的に保育料が安くなる可能性があります。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 48,
  },
  {
    slug: "shurou-shoumeisho",
    citySlug: "hamamatsu",
    title: "浜松市の就労証明書 記入例【令和8年度版】書き方と注意点まとめ",
    description:
      "浜松市の保育園申込みに必要な就労証明書の記入例を徹底解説。月間就労時間・日数の正しい書き方、よくある記入ミスTop5と対策チェックリスト、様式ダウンロード先まで網羅。令和8年度申込対応。",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "手続き",
    categoryColor: "rose",
    content: `<h2>就労証明書とは</h2>
<p>保育の必要性を証明する最も重要な書類です。勤務先に記入してもらう必要があります。</p>

<h2>入手方法</h2>
<ul>
<li>浜松市子育て情報サイト「ぴっぴ」からダウンロード</li>
<li>各こども家庭センターの窓口で入手</li>
</ul>

<h2>記入のポイント</h2>
<ul>
<li><strong>就労時間</strong>：月120時間以上であればフルタイム（20点）。正確に記入してもらう</li>
<li><strong>就労日数</strong>：月20日以上で就労日数加点（+3点）が得られる</li>
<li><strong>雇用期間</strong>：有期雇用の場合は契約期間の記入が必要</li>
<li><strong>育休からの復帰予定日</strong>：育休復帰加点（+3点）に影響</li>
</ul>

<h2>勤務先への依頼のコツ</h2>
<ul>
<li><strong>早めに依頼する</strong>：人事部門の処理に2〜3週間かかることがある</li>
<li><strong>記入例を添える</strong>：浜松市の記入例を一緒に渡すと間違いが減る</li>
<li><strong>締切を伝える</strong>：10月15日の申込締切から逆算して依頼</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>就労証明書は保育園の点数を決める最も重要な書類です。記入内容に誤りがあると点数が下がる可能性があるため、受け取ったら必ず確認しましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>様式は<a href="https://www.hamamatsu-pippi.net/contents/7769.html" target="_blank" rel="noopener">浜松市子育て情報サイト「ぴっぴ」</a>からダウンロードできます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 50,
  },
  {
    slug: "shinsei-shorui-list",
    citySlug: "hamamatsu",
    title: "浜松市の保育園申込に必要な書類チェックリスト",
    description:
      "浜松市の保育園申込に必要な書類を一覧にまとめました。状況別の追加書類や忘れがちな書類も解説します。",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "手続き",
    categoryColor: "rose",
    content: `<h2>全員が必要な書類</h2>
<ul>
<li>教育・保育給付認定申請書兼利用申込書</li>
<li>保育が必要であることの証明書（就労証明書等）</li>
<li>マイナンバー確認書類</li>
<li>本人確認書類のコピー</li>
</ul>

<h2>状況別の追加書類</h2>
<table>
<tr><th>状況</th><th>必要書類</th></tr>
<tr><td>就労中</td><td>就労証明書</td></tr>
<tr><td>自営業</td><td>就労証明書（自営用）＋開業届or確定申告書</td></tr>
<tr><td>育休中</td><td>就労証明書（育休期間の記載あり）</td></tr>
<tr><td>求職中</td><td>求職活動に関する申告書</td></tr>
<tr><td>疾病</td><td>医師の診断書</td></tr>
<tr><td>介護</td><td>介護状況の申告書＋関連書類</td></tr>
<tr><td>出産</td><td>母子健康手帳のコピー</td></tr>
<tr><td>就学中</td><td>在学証明書＋時間割</td></tr>
</table>

<h2>忘れがちな書類</h2>
<ul>
<li><strong>配偶者の就労証明書</strong>：父母双方の証明が必要</li>
<li><strong>課税証明書</strong>：転入者の場合に必要</li>
<li><strong>離婚関連書類</strong>：ひとり親加点を受ける場合</li>
</ul>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>書類に不備があると受付されない場合があります。提出前に必ずチェックリストで確認しましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>必要書類の詳細は<a href="https://www.hamamatsu-pippi.net/contents/7769.html" target="_blank" rel="noopener">浜松市子育て情報サイト「ぴっぴ」</a>でご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 53,
  },
  {
    slug: "niji-shinsei-flow",
    citySlug: "hamamatsu",
    title: "浜松市の二次受付の流れ　希望園変更のポイント",
    description:
      "浜松市の保育園入園の二次受付のスケジュール、希望園変更の手続き、二次で内定を勝ち取るコツを解説します。",
    image:
      "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "手続き",
    categoryColor: "rose",
    content: `<h2>二次受付とは</h2>
<p>一次受付で保留（不承諾）になった方が対象です。希望園の変更・追加ができます。</p>

<h3>二次受付のスケジュール</h3>
<table>
<tr><th>項目</th><th>日程</th></tr>
<tr><td>二次受付期間</td><td>令和8年1月26日（月）〜1月30日（金）</td></tr>
<tr><td>結果発送日</td><td>令和8年2月25日（水）</td></tr>
</table>

<h2>二次受付のポイント</h2>
<ul>
<li><strong>一次で空きが出た園を確認</strong>：一次の結果後に空きが出た園がある場合がある</li>
<li><strong>人気園を避ける</strong>：一次で埋まった園は二次でもほぼ空きがない</li>
<li><strong>希望園を広げる</strong>：通える範囲でできるだけ多くの園を記入</li>
</ul>

<h2>希望園変更の手続き</h2>
<p>二次受付期間中に電話またはこども家庭センターの窓口で変更を届け出ます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>一次の申込状況は11月に公表されます。この情報をもとに、二次で狙い目の園を検討しましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳しくは<a href="https://www.hamamatsu-pippi.net/contents/7769.html" target="_blank" rel="noopener">浜松市子育て情報サイト「ぴっぴ」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 48,
  },
  {
    slug: "tenkyo-hokatsu",
    citySlug: "hamamatsu",
    title: "浜松市に転居する場合の保活　市外からの申込方法",
    description:
      "浜松市に転居予定の方が市外から保育園に申し込む方法、必要書類、注意点を解説します。",
    image:
      "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&h=400&fit=crop",
    category: "手続き",
    categoryColor: "rose",
    content: `<h2>市外からの申込方法</h2>
<p>浜松市に転居予定で保育園に申し込む場合、転居先の住所が確定している必要があります。</p>

<h3>申込の流れ</h3>
<ol>
<li>転居先の住所がわかる書類（売買契約書、賃貸契約書等）を準備</li>
<li>現在お住まいの市区町村を通じて浜松市に申込書類を送付</li>
<li>浜松市の利用調整基準で選考される</li>
<li>内定の場合は入園月までに転入届を提出</li>
</ol>

<h2>必要な追加書類</h2>
<ul>
<li>転居先の住所がわかる書類のコピー</li>
<li>課税証明書（前住所地の市区町村が発行）</li>
</ul>

<h2>注意点</h2>
<ul>
<li>申込は現住所地の市区町村を経由する（広域利用）</li>
<li>転入が確認できない場合は内定取り消しになる可能性がある</li>
<li>浜松市のスケジュールに間に合うように申込む必要がある</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>市外からの申込は手続きが複雑になります。早めにこども家庭センターに相談して、必要な手続きを確認しましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳しくは<a href="https://www.hamamatsu-pippi.net/contents/7769.html" target="_blank" rel="noopener">浜松市子育て情報サイト「ぴっぴ」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 42,
  },
  {
    slug: "kyoiku-hoiku-chigai",
    citySlug: "hamamatsu",
    title: "浜松市の「教育」と「保育」の違い　1号・2号・3号認定とは",
    description:
      "浜松市の保育園・幼稚園・こども園で使われる1号・2号・3号認定の違いをわかりやすく解説します。",
    image:
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>認定区分とは</h2>
<p>保育園や幼稚園、こども園を利用するには、市から「認定」を受ける必要があります。</p>

<h3>3つの認定区分</h3>
<table>
<tr><th>区分</th><th>対象年齢</th><th>条件</th><th>利用できる施設</th></tr>
<tr><td>1号認定（教育）</td><td>3〜5歳</td><td>保育の必要なし</td><td>幼稚園、認定こども園</td></tr>
<tr><td>2号認定（保育）</td><td>3〜5歳</td><td>保育の必要あり</td><td>保育園、認定こども園</td></tr>
<tr><td>3号認定（保育）</td><td>0〜2歳</td><td>保育の必要あり</td><td>保育園、認定こども園、小規模保育</td></tr>
</table>

<h2>「保育の必要性」とは</h2>
<p>以下のいずれかに該当する場合、保育の必要性が認められます。</p>
<ul>
<li>就労（月48時間以上）</li>
<li>妊娠・出産</li>
<li>疾病・障害</li>
<li>介護・看護</li>
<li>求職活動</li>
<li>就学</li>
<li>災害復旧</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>共働き家庭は2号または3号認定を取得して保育園に申し込みます。専業主婦（夫）家庭は1号認定で幼稚園やこども園の教育部分を利用できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 45,
  },
  {
    slug: "hokatsu-calendar",
    citySlug: "hamamatsu",
    title: "浜松市の保活カレンダー　月別やることリスト",
    description:
      "浜松市で4月入園を目指す場合の月別の保活やることリスト。何をいつまでにやるべきかを時系列で整理しました。",
    image:
      "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>月別やることリスト</h2>

<h3>4月〜6月：情報収集</h3>
<ul>
<li>浜松市の保育制度を調べる</li>
<li>利用調整基準表で自分の点数を確認</li>
<li>候補となる園をリストアップ</li>
</ul>

<h3>7月〜9月：保育園見学</h3>
<ul>
<li>候補園に電話して見学予約</li>
<li>3〜5か所は見学する</li>
<li>見学メモを残して比較する</li>
</ul>

<h3>9月：書類準備開始</h3>
<ul>
<li>就労証明書を勤務先に依頼</li>
<li>その他必要書類を準備</li>
<li>書類の記入漏れをチェック</li>
</ul>

<h3>10月上旬：申込書類の郵送</h3>
<ul>
<li>10月15日の消印有効に間に合わせる</li>
<li>書類のコピーを手元に保管</li>
</ul>

<h3>11月：申込状況の確認</h3>
<ul>
<li>11月25日の申込状況公表をチェック</li>
<li>必要に応じて11月26〜28日に希望園を変更</li>
</ul>

<h3>1月：結果確認</h3>
<ul>
<li>1月9日の結果通知を確認</li>
<li>内定の場合は入園準備を開始</li>
<li>保留の場合は二次受付（1月26〜30日）の検討</li>
</ul>

<h3>2月〜3月：入園準備</h3>
<ul>
<li>入園説明会に参加</li>
<li>持ち物の準備</li>
<li>慣らし保育のスケジュール確認</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>就労証明書の依頼は9月には済ませましょう。人事部門の処理に時間がかかる場合があります。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 55,
  },
  {
    slug: "souba-tensuu",
    citySlug: "hamamatsu",
    title: "浜松市の保育園入園の相場点数　エリア別の目安",
    description:
      "浜松市のエリア別の保育園入園に必要な相場点数の目安と、点数が足りない場合の対策を解説します。",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>エリア別の相場点数</h2>
<p>浜松市の入園に必要な点数の目安をエリア別にまとめました。あくまで参考値であり、年度や園によって異なります。</p>

<table>
<tr><th>エリア</th><th>0〜2歳児の目安</th><th>3歳児以上の目安</th></tr>
<tr><td>中央区（旧・中区中心部）</td><td><span class="highlight">26〜28点</span></td><td>23〜26点</td></tr>
<tr><td>中央区（旧・東区・南区）</td><td>23〜26点</td><td>20〜23点</td></tr>
<tr><td>中央区（旧・西区）</td><td>23点前後</td><td>20点前後</td></tr>
<tr><td>浜名区</td><td>20〜23点</td><td>20点前後</td></tr>
<tr><td>天竜区</td><td>20点前後</td><td>20点以下でも可能性あり</td></tr>
</table>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>上記はあくまで一般的な目安です。浜松市は公式にボーダーラインを公表していません。実際の入園可否は年度の申込状況によって変動します。</p>
</div>

<h2>点数が足りない場合の対策</h2>
<ul>
<li>加点項目を漏れなく申告する</li>
<li>認可外利用で+2点を確保する</li>
<li>郊外の園も候補に入れる</li>
<li>小規模保育や企業主導型も検討する</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>中央区（旧・中区中心部）の0〜2歳児は26点以上がないと厳しい状況です。フルタイム＋就労日数＋育休復帰で26点を確保しましょう。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 60,
  },
  {
    slug: "ku-betsu-bairitsu",
    citySlug: "hamamatsu",
    title: "浜松市の区別保育園倍率　中央区・浜名区・天竜区を比較",
    description:
      "浜松市の3区（中央区・浜名区・天竜区）ごとの保育園の入りやすさを比較分析します。",
    image:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=400&fit=crop",
    category: "エリア情報",
    categoryColor: "teal",
    content: `<h2>3区の保育園事情</h2>
<p>浜松市は2024年1月の行政区再編で7区から<span class="highlight">3区（中央区・浜名区・天竜区）</span>になりました。</p>

<h3>区別の特徴</h3>
<table>
<tr><th>区</th><th>人口</th><th>保育園の入りやすさ</th><th>特徴</th></tr>
<tr><td>中央区</td><td>約57万人</td><td>激戦〜普通</td><td>旧中区・東区・西区・南区を含む。市の中心部は激戦</td></tr>
<tr><td>浜名区</td><td>約17万人</td><td>比較的入りやすい</td><td>旧浜北区・北区。郊外で空きが出やすい</td></tr>
<tr><td>天竜区</td><td>約3万人</td><td>入りやすい</td><td>山間部。定員に余裕がある園が多い</td></tr>
</table>

<h2>中央区の中でも差がある</h2>
<p>中央区は旧4区の統合で非常に広いエリアです。旧・中区周辺は激戦ですが、旧・西区や旧・南区の郊外部分は比較的入りやすいエリアもあります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>「中央区だから激戦」とは限りません。中央区内でも場所によって大きな差があります。11月の申込状況公表で園ごとの倍率を確認しましょう。</p>
</div>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>上記の人口は概数です。最新の人口データは浜松市公式サイトでご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 52,
  },
  {
    slug: "ikukyu-enchou-risk",
    citySlug: "hamamatsu",
    title: "浜松市で育休延長すると保育園に入れなくなる？リスクを解説",
    description:
      "浜松市で育休延長した場合の保育園入園への影響と、育休延長許容で0点になるリスクについて解説します。",
    image:
      "https://images.unsplash.com/photo-1531983412531-1f49a365ffed?w=800&h=400&fit=crop",
    category: "育休・復職",
    categoryColor: "purple",
    content: `<h2>育休延長と点数の関係</h2>
<p>浜松市では育休延長そのものは問題ありませんが、<span class="highlight">「育休延長を許容する」と判断された場合</span>に基準点が0点になります。</p>

<h3>0点になるケース</h3>
<ul>
<li>申込書で「育休延長許容」にチェックした場合</li>
<li>その他、育休延長を前提とした申込と判断された場合</li>
</ul>

<h2>育休延長と育休復帰加点</h2>
<p>育休を1年→1年半や2年に延長した場合でも、入園月に復帰する意思があれば<span class="highlight">育休復帰加点（+3点）</span>は適用されます。</p>

<div class="warn-box">
<p><strong>重要</strong></p>
<p>「育休延長許容」にチェックすると基準点0点＝事実上入園不可能です。雇用保険の育休給付金を延長する目的で不承諾通知を得たい場合のみチェックしてください。</p>
</div>

<h2>育休延長しても入園を目指すなら</h2>
<ul>
<li>「育休延長許容」にチェックしない</li>
<li>入園月に復帰する意思を明確にする</li>
<li>復帰予定の就労証明書を提出する</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>育休を2年まで延長しても、その後の4月入園で復帰する意思があれば通常の点数で選考されます。「延長許容」のチェックだけは絶対に避けましょう。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 58,
  },
  {
    slug: "fukushoku-junbi",
    citySlug: "hamamatsu",
    title: "浜松市で保育園内定後の復職準備　慣らし保育と職場復帰",
    description:
      "浜松市の保育園内定後にやるべき準備、慣らし保育のスケジュール、職場復帰に向けた段取りを解説します。",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=400&fit=crop",
    category: "育休・復職",
    categoryColor: "purple",
    content: `<h2>内定後のやることリスト</h2>
<ol>
<li><strong>入園説明会に参加</strong>：2〜3月に開催される</li>
<li><strong>持ち物の準備</strong>：園指定のサイズや名前つけ</li>
<li><strong>慣らし保育の日程調整</strong>：園と相談して決める</li>
<li><strong>職場への復帰日連絡</strong>：慣らし保育期間を考慮</li>
<li><strong>健康診断の受診</strong>：入園前に必要な場合がある</li>
</ol>

<h2>慣らし保育のスケジュール</h2>
<p>多くの園では1〜2週間の慣らし保育があります。</p>
<table>
<tr><th>期間</th><th>内容</th></tr>
<tr><td>1〜2日目</td><td>1〜2時間の短時間保育</td></tr>
<tr><td>3〜5日目</td><td>午前中〜給食まで</td></tr>
<tr><td>6日目〜1週間</td><td>午後（昼寝後）まで</td></tr>
<tr><td>2週目〜</td><td>通常保育</td></tr>
</table>

<h2>職場復帰のタイミング</h2>
<p>慣らし保育中は短時間しか預けられないため、復帰日は慣らし保育終了後にするのがベストです。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>4月1日に入園しても、慣らし保育が終わるのは4月中旬〜下旬です。職場には「4月中旬復帰」で調整しておくと安心です。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 45,
  },
  {
    slug: "sannin-me-hokatsu",
    citySlug: "hamamatsu",
    title: "浜松市で3人目の保活　多子世帯の優遇制度と注意点",
    description:
      "浜松市で3人目以降の子どもの保育園入園に関する優遇制度、保育料の軽減、きょうだい優先について解説します。",
    image:
      "https://images.unsplash.com/photo-1491013516836-7db643ee125a?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>3人目以降の保育料</h2>
<p>浜松市では多子世帯に対する保育料の軽減制度があります。</p>

<h3>保育料の軽減</h3>
<table>
<tr><th>対象</th><th>軽減内容</th></tr>
<tr><td>第2子</td><td>保育料半額</td></tr>
<tr><td>第3子以降</td><td>保育料無料</td></tr>
</table>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>多子軽減の対象範囲（カウントする子の年齢や条件）は制度によって異なります。最新の条件は浜松市にご確認ください。</p>
</div>

<h2>3人目の保活戦略</h2>
<ul>
<li><strong>上の子2人と同じ園を第1希望にする</strong>：きょうだい在園の同点優先が有利</li>
<li><strong>加点を積み上げる</strong>：育休復帰（+3点）や認可外利用（+2点）</li>
<li><strong>副食費も免除の可能性</strong>：第3子以降は副食費が免除される場合がある</li>
</ul>

<h2>きょうだい在園の優先</h2>
<p>同点時の優先段階で、きょうだいが在園中の世帯が有利になります。上の子2人が同じ園に在園していれば、3人目も同じ園に入りやすくなります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>3人目は保育料無料＋副食費免除の可能性があり、経済的なメリットが大きいです。きょうだい優先を活かして同じ園に入園を目指しましょう。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 44,
  },
  {
    slug: "tanshin-funin",
    citySlug: "hamamatsu",
    title: "浜松市で単身赴任中の保活　加点と注意点",
    description:
      "浜松市で配偶者が単身赴任中の場合の保育園入園の点数や加点、必要な手続きを解説します。",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>単身赴任中の保活</h2>
<p>配偶者が単身赴任で不在の場合、実質的にひとり親と同様の状況です。浜松市ではこの状況に対する調整点が設けられています。</p>

<h3>加点の目安</h3>
<p>単身赴任等でひとり親に準じる状況の場合、<span class="highlight">+3点</span>の調整点が加算される可能性があります。</p>

<h2>必要書類</h2>
<ul>
<li>単身赴任の事実を証明する書類（勤務先の辞令等）</li>
<li>配偶者の就労証明書（赴任先での就労を証明）</li>
<li>住民票（世帯の状況を確認するため）</li>
</ul>

<h2>min方式での注意点</h2>
<p>浜松市のmin方式では、父母の低い方の点数が選考に使われます。単身赴任中の配偶者の就労時間も基準点に反映されるため、配偶者の就労証明書も正確に記入してもらいましょう。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>単身赴任の加点が適用されるかどうかは個別の状況により判断されます。事前にこども家庭センターに相談することをおすすめします。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 36,
  },
  {
    slug: "sofu-sobo-doukyo",
    citySlug: "hamamatsu",
    title: "浜松市で祖父母と同居していると保育園に入りにくい？",
    description:
      "浜松市で祖父母と同居している場合の保育園入園への影響と、同居でも不利にならないケースを解説します。",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>祖父母同居は不利になる？</h2>
<p>浜松市では、<span class="highlight">祖父母の同居だけで直接的に減点されることはありません</span>。ただし、同居の祖父母が保育可能な状態にあるかどうかは、利用調整の際に考慮される場合があります。</p>

<h2>祖父母が就労中の場合</h2>
<p>同居の祖父母がフルタイムで就労している場合や、65歳以上の場合は「保育が困難」と判断されるのが一般的です。この場合、不利にはなりません。</p>

<h2>祖父母が専業の場合</h2>
<p>同居の祖父母が健康で就労しておらず、保育が可能と判断されると、選考で不利になる可能性があります。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>祖父母の同居状況に関する取り扱いは自治体によって異なります。浜松市の具体的な基準はこども家庭センターにお問い合わせください。</p>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>祖父母が就労中や健康上の理由で保育が困難な場合は、その状況を証明する書類を添付しましょう。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 40,
  },
  {
    slug: "fushoninchi-taiou",
    citySlug: "hamamatsu",
    title: "浜松市で保育園の不承諾通知が届いたらすべきこと",
    description:
      "浜松市の保育園入園選考で不承諾（保留）になった場合の対応手順と、次にやるべきことを解説します。",
    image:
      "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=800&h=400&fit=crop",
    category: "入れなかったら",
    categoryColor: "rose",
    content: `<h2>不承諾通知が届いたら</h2>
<p>一次受付の結果が「保留」だった場合、慌てずに次の行動を起こしましょう。</p>

<h3>すぐにやること</h3>
<ol>
<li><strong>二次受付の確認</strong>：1月26〜30日の二次受付で希望園を変更・追加</li>
<li><strong>認可外保育施設の空き確認</strong>：電話で空き状況を問い合わせ</li>
<li><strong>企業主導型保育施設の確認</strong>：直接施設に問い合わせ</li>
<li><strong>勤務先に状況を報告</strong>：育休延長が必要になる可能性を伝える</li>
</ol>

<h2>不承諾通知の活用</h2>
<p>不承諾通知は<span class="highlight">育児休業給付金の延長申請</span>に必要な書類です。大切に保管してください。</p>

<h2>翌年度に向けた準備</h2>
<ul>
<li>認可外に預けて加点（+2点）を確保</li>
<li>翌年度の申込に向けて点数を最大化する準備</li>
<li>転園申請で希望園の入園を目指す</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>不承諾は次年度への布石にもなります。認可外に預けて加点を得ながら、翌年度の申込で確実に入園を目指しましょう。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 55,
  },
  {
    slug: "taiki-jidou-taisaku",
    citySlug: "hamamatsu",
    title: "浜松市の待機児童対策と今後の保育施設整備計画",
    description:
      "浜松市が実施している待機児童対策や保育施設の整備計画、今後の見通しについて解説します。",
    image:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=400&fit=crop",
    category: "最新情報",
    categoryColor: "purple",
    content: `<h2>浜松市の待機児童対策</h2>
<p>浜松市は<span class="highlight">4年以上連続で待機児童ゼロ</span>を達成していますが、引き続き保育の質と量の確保に取り組んでいます。</p>

<h3>主な取り組み</h3>
<ul>
<li><strong>保育施設の新設・増設</strong>：子育て世帯の多いエリアを中心に</li>
<li><strong>小規模保育事業の推進</strong>：0〜2歳児の受け皿を拡充</li>
<li><strong>保育士の確保</strong>：処遇改善や就職支援</li>
<li><strong>こども誰でも通園制度</strong>：令和8年度の本格実施に向けた準備</li>
</ul>

<h2>今後の課題</h2>
<ul>
<li>中央区（旧・中区）の人気園の偏り</li>
<li>保育士不足による定員活用の課題</li>
<li>少子化による将来的な定員過剰の見込み</li>
</ul>

<h2>こども誰でも通園制度</h2>
<p>保育所等に通っていない0歳6か月〜3歳未満の児童を対象に、定期的に保育を利用できる制度です。浜松市でも対象施設が拡大中です。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新の保育施策は<a href="https://www.city.hamamatsu.shizuoka.jp/" target="_blank" rel="noopener">浜松市公式サイト</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 40,
  },
  {
    slug: "tennen-moshikomi",
    citySlug: "hamamatsu",
    title: "浜松市の転園申請の方法　希望園を変えたいときの手続き",
    description:
      "浜松市で通っている保育園から別の園に転園したい場合の申請方法、タイミング、注意点を解説します。",
    image:
      "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "手続き",
    categoryColor: "rose",
    content: `<h2>転園申請とは</h2>
<p>現在通っている保育園から別の園に移りたい場合に行う手続きです。引っ越しや通勤先の変更などが主な理由です。</p>

<h2>申請の手続き</h2>
<ol>
<li>こども家庭センターに転園希望を伝える</li>
<li>転園申請書を提出</li>
<li>通常の利用調整と同様に選考される</li>
<li>内定の場合は転園先の入園手続き</li>
</ol>

<h2>転園申請のタイミング</h2>
<ul>
<li><strong>4月転園</strong>：一次受付（10月）で新規申込と同時に選考</li>
<li><strong>途中転園</strong>：希望月の前月に申請</li>
</ul>

<h2>注意点</h2>
<ul>
<li>転園申請は新規申込と同じ利用調整基準で選考される</li>
<li>転園先が決まるまでは現在の園に通い続けられる</li>
<li>転園先に入れなかった場合も現在の園の在園は継続</li>
<li>人気園への転園は新規入園と同じくらい難しい</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>転園は新規申込と同じ基準で選考されるため、人気園への転園は簡単ではありません。4月の一斉入園のタイミングが最も転園しやすい時期です。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>転園の手続きは<a href="https://www.hamamatsu-pippi.net/contents/7770.html" target="_blank" rel="noopener">浜松市子育て情報サイト「ぴっぴ」</a>でご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 42,
  },
];

registerArticles(articles);
