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
      "https://images.unsplash.com/photo-1587654780291-39c9404d7dd0?w=800&h=400&fit=crop",
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
];

registerArticles(articles);
