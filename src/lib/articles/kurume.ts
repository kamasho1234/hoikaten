import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  // ===== 点数・選考 (3) =====
  {
    slug: "scoring-system-guide",
    citySlug: "kurume",
    title: "久留米市の入園点数のしくみ｜基本点数と調整点数をやさしく解説",
    description:
      "久留米市の保育園入園選考で使われる「基本点数」と「調整点数」の仕組みを初めての方にもわかるように解説します。",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>利用調整点数とは？</h2>
<p>久留米市の保育園入園は「先着順」ではなく、<strong>久留米市保育利用選考基準</strong>に基づいて点数化し、保育を必要とする度合いの高い順に入所児童を選考・決定します。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>利用調整点数 ＝ 基本点数（低い方の保護者） ＋ 調整点数</p>
</div>

<h2>基本点数とは？</h2>
<p>父母それぞれの「保育が必要な理由」を点数化したものです。久留米市の特徴は、<span class="highlight">父母のうち低い方の基本点数が世帯の基本点数</span>になることです（min方式）。</p>

<p>就労の場合の基本点数は以下の通りです。</p>
<table>
<tr><th>月の勤務時間</th><th>基本点数</th></tr>
<tr><td>160時間以上</td><td>150</td></tr>
<tr><td>140時間以上160時間未満</td><td>140</td></tr>
<tr><td>120時間以上140時間未満</td><td>130</td></tr>
<tr><td>100時間以上120時間未満</td><td>120</td></tr>
<tr><td>80時間以上100時間未満</td><td>100</td></tr>
<tr><td>64時間以上80時間未満</td><td>80</td></tr>
</table>

<h2>調整点数とは？</h2>
<p>世帯の特別な事情に応じて加算される点数です。代表的なものは以下の通りです。</p>
<ul>
<li>ひとり親世帯：<span class="highlight">+70点</span></li>
<li>保育士・保育教諭として勤務：<span class="highlight">+70点</span></li>
<li>きょうだいが同一施設に在園：<span class="highlight">+60点</span></li>
<li>多胎児が同時に申込：<span class="highlight">+50点</span></li>
<li>きょうだいが同時に申込：<span class="highlight">+30点</span></li>
<li>育休明け復職予定：<span class="highlight">+15点</span></li>
<li>生活保護世帯：<span class="highlight">+15点</span></li>
<li>単身赴任：<span class="highlight">+15点</span></li>
</ul>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>調整点数は複数の項目に該当する場合、それぞれを加算します。ただし、きょうだい同一施設（+60点）ときょうだい同時申込（+30点）は、高い方のみ適用されます。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>選考基準の全項目は<a href="https://www.city.kurume.fukuoka.jp/1060manabi/2010kosodate/3090hoikusho/hoikusyoriyou0416.html" target="_blank" rel="noopener">久留米市公式サイト「保育所等の入所を希望される方」</a>でご確認ください。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 60,
  },
  {
    slug: "score-up-checklist",
    citySlug: "kurume",
    title: "久留米市で調整点数を最大化する方法｜加点チェックリスト",
    description:
      "久留米市の入園選考で調整点数の加点を最大限に活用する方法をチェックリスト形式で解説します。",
    image:
      "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>調整点数の加点を漏れなく確認しよう</h2>
<p>久留米市の入園選考では、基本点数が同じ世帯同士の競争になることが多いため、<span class="highlight">調整点数の1点</span>が合否を左右します。該当する項目がないか、一つずつ確認しましょう。</p>

<h3>加点チェックリスト</h3>
<table>
<tr><th>加点項目</th><th>点数</th><th>条件</th></tr>
<tr><td>ひとり親世帯</td><td>+70点</td><td>ひとり親であること</td></tr>
<tr><td>保育士・保育教諭として勤務</td><td>+70点</td><td>保育施設で保育士等として働いている（働く予定）</td></tr>
<tr><td>きょうだいが同一施設を利用中</td><td>+60点</td><td>在園中のきょうだいと同じ施設を希望</td></tr>
<tr><td>多胎児の同時申込</td><td>+50点</td><td>双子・三つ子などが同時に利用申込</td></tr>
<tr><td>きょうだいの同時申込</td><td>+30点</td><td>きょうだいが同時に利用を申し込む</td></tr>
<tr><td>育休明け復職予定</td><td>+15点</td><td>育児休業から復職予定であること</td></tr>
<tr><td>生活保護世帯</td><td>+15点</td><td>生活保護を受給中</td></tr>
<tr><td>単身赴任</td><td>+15点</td><td>配偶者が単身赴任中</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>複数の項目に該当する場合は、それぞれの点数が加算されます。見落としがないよう選考基準を丁寧に確認しましょう。</p>
</div>

<h2>よくある見落とし</h2>
<ul>
<li><strong>育休明け復職の加点</strong>：産休・育休を取得中で、入園と同時に復職予定なら+15点。申告を忘れがち</li>
<li><strong>きょうだい関連の加点</strong>：上の子が在園中なら+60点は大きい。同一施設を希望園に入れること</li>
<li><strong>保育士加点</strong>：保育士資格を持っていて保育施設で勤務（予定）なら+70点と非常に大きい</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>選考基準の全項目は<a href="https://www.city.kurume.fukuoka.jp/1060manabi/2010kosodate/3090hoikusho/hoikusyoriyou0416.html" target="_blank" rel="noopener">久留米市公式サイト</a>でご確認ください。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 55,
  },
  {
    slug: "150-point-line",
    citySlug: "kurume",
    title: "久留米市で150点は安心？フルタイム共働きの入園事情",
    description:
      "フルタイム共働きで基本点数150点の家庭が、久留米市の保育園に入れるかどうかの実態を解説します。",
    image:
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>150点はフルタイム共働きの基本ライン</h2>
<p>久留米市でフルタイム共働き（父母ともに月160時間以上勤務）の場合、基本点数は<span class="highlight">150点</span>です。これは最も多い申込パターンであり、150点同士の競争になります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>150点はあくまで「スタートライン」。同じ150点の世帯が多いため、調整点数の差が合否を左右します。</p>
</div>

<h2>150点で入れるかはエリア次第</h2>
<p>久留米市は人口約30万人の中核市で、エリアによって保育園の入りやすさに差があります。</p>
<ul>
<li><strong>比較的入りやすいエリア</strong>：北野・城島・三潴などの郊外エリア</li>
<li><strong>激戦エリア</strong>：JR久留米駅・西鉄久留米駅周辺の中心部</li>
</ul>

<h2>150点＋調整点数が勝負の分かれ目</h2>
<p>同じ基本点数150点の世帯間では、調整点数の有無が決め手になります。</p>
<table>
<tr><th>パターン</th><th>合計点数</th></tr>
<tr><td>150点のみ（調整点数なし）</td><td>150点</td></tr>
<tr><td>150点＋育休明け復職</td><td>165点</td></tr>
<tr><td>150点＋きょうだい同時申込</td><td>180点</td></tr>
<tr><td>150点＋きょうだい同一施設</td><td>210点</td></tr>
</table>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>空き状況は<a href="https://www.city.kurume.fukuoka.jp/1060manabi/2010kosodate/3090hoikusho/hoikuakijyoukyou.html" target="_blank" rel="noopener">久留米市公式サイト「保育所の空き状況」</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 50,
  },
  // ===== 保活の基本 (2) =====
  {
    slug: "hokatsu-schedule",
    citySlug: "kurume",
    title: "久留米市の保活スケジュール｜令和8年度4月入園の流れ",
    description:
      "久留米市の認可保育園の申込時期・選考の流れ・結果通知の時期をわかりやすく解説します。",
    image:
      "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>令和8年度（2026年度）4月入園のスケジュール</h2>
<p>久留米市の4月入園は<strong>1次</strong>と<strong>2次</strong>の2回に分かれています。秋から冬にかけてが保活の勝負どころです。</p>

<h3>1次利用調整</h3>
<table>
<tr><th>項目</th><th>日程（目安）</th></tr>
<tr><td>案内冊子配布開始</td><td>令和7年10月頃</td></tr>
<tr><td>申込受付期間（電子）</td><td>令和7年11月上旬〜11月下旬</td></tr>
<tr><td>申込受付期間（窓口）</td><td>令和7年11月上旬〜12月上旬</td></tr>
<tr><td>結果通知</td><td>令和8年2月頃</td></tr>
</table>

<h3>2次利用調整</h3>
<table>
<tr><th>項目</th><th>日程（目安）</th></tr>
<tr><td>申込受付</td><td>令和7年12月中旬〜令和8年2月中旬</td></tr>
<tr><td>結果通知</td><td>令和8年3月頃</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>1次で保留になった方は自動的に2次の対象になります。締切日までに提出がなければ調整点数に反映できないため、書類は早めに準備しましょう。</p>
</div>

<h2>いつから動き始めるべき？</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>4月〜6月：情報収集スタート</strong>
<p>久留米市の保育施設の種類やエリアの特徴を調べましょう。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>7月〜9月：保育園見学</strong>
<p>気になる園に電話して見学予約。園の雰囲気を直接確認しましょう。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>10月〜11月：書類準備・提出</strong>
<p>就労証明書などを勤務先に依頼し、申込書類を提出します。</p>
</div>
</div>

<h2>途中入園（5月以降）の申込</h2>
<p>途中入園の申込締切は、入園希望月の<span class="highlight">前月10日（17時15分まで）</span>です。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新の申込方法は<a href="https://www.city.kurume.fukuoka.jp/1060manabi/2010kosodate/3090hoikusho/hoikusyoriyou0416.html" target="_blank" rel="noopener">久留米市公式サイト</a>でご確認ください。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 45,
  },
  {
    slug: "required-documents",
    citySlug: "kurume",
    title: "久留米市の保育園申込に必要な書類一覧と入手方法",
    description:
      "久留米市の保育園入園申込に必要な書類の一覧と、それぞれの入手方法をまとめました。",
    image:
      "https://images.unsplash.com/photo-1568667256549-094345857637?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>必要な書類</h2>
<p>久留米市の認可保育園に申し込む際に必要な主な書類は以下の通りです。</p>

<h3>全員が必要な書類</h3>
<ul>
<li><strong>教育・保育給付認定申請書兼入所申込書</strong>：市役所・各総合支所で配布、またはホームページからダウンロード</li>
<li><strong>保育が必要であることを証明する書類</strong>：就労証明書・診断書など（父母それぞれ）</li>
</ul>

<h3>該当者のみ必要な書類</h3>
<ul>
<li>ひとり親の場合：戸籍謄本</li>
<li>障害がある場合：障害者手帳のコピー</li>
<li>生活保護受給中の場合：受給証明書</li>
<li>育休復帰の場合：育児休業取得証明書</li>
</ul>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>就労証明書は勤務先に記入を依頼する必要があるため、時間に余裕を持って準備しましょう。記入要領は久留米市公式サイトに掲載されています。</p>
</div>

<h2>書類の入手場所</h2>
<table>
<tr><th>場所</th><th>住所</th></tr>
<tr><td>久留米市役所 子ども保育課（16階）</td><td>城南町15-3</td></tr>
<tr><td>各総合支所 市民福祉課</td><td>田主丸・北野・城島・三潴</td></tr>
</table>

<p>電子申請（マイナポータル「ぴったりサービス」）での申込も可能です。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>申請書類は<a href="https://www.city.kurume.fukuoka.jp/1500soshiki/9053kodomo/3020shinsei/2025-0414-0938-323.html" target="_blank" rel="noopener">久留米市「保育所等利用に関する書類」</a>からダウンロードできます。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 40,
  },
  // ===== エリア・園選び (2) =====
  {
    slug: "area-guide",
    citySlug: "kurume",
    title: "久留米市の保育園エリア別ガイド｜入りやすさと特徴",
    description:
      "久留米市の主要エリア別に保育園の特徴と入りやすさを解説します。園選びの参考にどうぞ。",
    image:
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&h=400&fit=crop",
    category: "エリア・園選び",
    categoryColor: "purple",
    content: `<h2>久留米市のエリア別保育事情</h2>
<p>久留米市は福岡県南部の中核市で、中心市街地と郊外エリアで保育園の入りやすさに差があります。176を超える認可保育施設があり、エリアによって特色が異なります。</p>

<h3>中心部エリア（JR久留米駅・西鉄久留米駅周辺）</h3>
<ul>
<li>施設数は多いが、マンション建設に伴い申込者も多い</li>
<li>0〜1歳児クラスは激戦になりやすい</li>
<li>通勤の利便性が高く人気</li>
</ul>

<h3>東部エリア（東合川・上津・荒木）</h3>
<ul>
<li>新興住宅地が多く、若い世帯が増加中</li>
<li>大型ショッピングモール周辺は人気が高い</li>
</ul>

<h3>郊外エリア（北野・田主丸・城島・三潴）</h3>
<ul>
<li>比較的空きがあるケースが多い</li>
<li>車通勤の方には選択肢が広がる</li>
<li>自然豊かな環境の園が多い</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>久留米市では希望園を複数記入できます。通える範囲で第5〜6希望まで書くことで内定率がぐっと上がります。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新の空き状況は<a href="https://www.city.kurume.fukuoka.jp/1060manabi/2010kosodate/3090hoikusho/hoikuakijyoukyou.html" target="_blank" rel="noopener">久留米市公式サイト「保育所の空き状況」</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 45,
  },
  {
    slug: "nursery-types",
    citySlug: "kurume",
    title: "久留米市の保育施設の種類｜認可保育所・認定こども園・小規模の違い",
    description:
      "久留米市にある認可保育所・認定こども園・小規模保育施設・事業所内保育施設の違いをわかりやすく解説します。",
    image:
      "https://images.unsplash.com/photo-1587654780291-39c9404d7dd0?w=800&h=400&fit=crop",
    category: "エリア・園選び",
    categoryColor: "purple",
    content: `<h2>久留米市にある保育施設の種類</h2>
<p>久留米市では「認可保育所」「認定こども園」「小規模保育事業所」「事業所内保育事業所」「家庭的保育施設」の5種類の保育施設があります。いずれも市を通じて申込みます。</p>

<h3>認可保育所</h3>
<p>0歳〜就学前の子どもを預かる施設。久留米市で最も施設数が多い形態です。</p>

<h3>認定こども園（保育部分）</h3>
<p>教育と保育を一体的に提供する施設。保育認定（2号・3号）を受けた子どもが利用できます。</p>

<h3>小規模保育事業所</h3>
<p>定員6〜19名の少人数保育。<span class="highlight">0〜2歳児が対象</span>で、家庭的な雰囲気が特徴です。3歳以降は連携先の園に移行します。</p>

<h3>事業所内保育事業所（地域枠）</h3>
<p>企業が従業員向けに設置した保育所の地域枠。少人数で手厚い保育が受けられます。</p>

<h3>家庭的保育施設</h3>
<p>保育者の自宅等で少人数を保育する形態。0〜2歳児が対象です。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>小規模保育や家庭的保育は定員が少ないぶん競争率が低いこともあります。0〜2歳の入園を考えている方は選択肢に入れてみましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>施設一覧は<a href="https://www.city.kurume.fukuoka.jp/1060manabi/2010kosodate/3090hoikusho/hoikuenichiran.html" target="_blank" rel="noopener">久留米市「保育所・認定こども園等一覧」</a>でご確認ください。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 35,
  },
  // ===== 費用・制度 (2) =====
  {
    slug: "hoiku-fee-guide",
    citySlug: "kurume",
    title: "久留米市の保育料はいくら？無償化と自己負担額を解説",
    description:
      "久留米市の保育料の仕組みと幼児教育・保育の無償化について、年齢別にわかりやすく解説します。",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "費用・制度",
    categoryColor: "amber",
    content: `<h2>幼児教育・保育の無償化</h2>
<p>2019年10月から始まった幼児教育・保育の無償化により、<span class="highlight">3〜5歳児クラス</span>の保育料は無料です。</p>

<h2>0〜2歳児の保育料</h2>
<p>0〜2歳児クラスの保育料は、世帯の市民税所得割額に応じて決まります。久留米市の保育料基準表に基づき、所得に応じた階層区分で金額が設定されています。</p>

<table>
<tr><th>対象</th><th>保育料</th></tr>
<tr><td>3〜5歳児</td><td>無料（無償化対象）</td></tr>
<tr><td>0〜2歳児（住民税非課税世帯）</td><td>無料</td></tr>
<tr><td>0〜2歳児（課税世帯）</td><td>所得に応じて月額0円〜約48,900円</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>第2子以降の保育料は軽減される場合があります。きょうだいが保育園や幼稚園に通っている場合は確認しましょう。</p>
</div>

<h2>保育料以外にかかる費用</h2>
<ul>
<li>給食費（3〜5歳児は主食費・副食費が実費）</li>
<li>延長保育料（利用する場合）</li>
<li>教材費・行事費（園によって異なる）</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>保育料の詳細は<a href="https://www.city.kurume.fukuoka.jp/1060manabi/2010kosodate/3090hoikusho/hoikuryou.html" target="_blank" rel="noopener">久留米市「保育料について」</a>でご確認ください。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 40,
  },
  {
    slug: "parental-leave-strategy",
    citySlug: "kurume",
    title: "久留米市で育休中に保活するコツ｜復帰タイミングと加点",
    description:
      "久留米市で育児休業中に保活を進めるためのスケジュールと、育休復帰の加点を活用する方法を解説します。",
    image:
      "https://images.unsplash.com/photo-1531983412531-1f49a365ffed?w=800&h=400&fit=crop",
    category: "費用・制度",
    categoryColor: "amber",
    content: `<h2>育休中の保活スケジュール</h2>
<p>久留米市で4月入園を目指す場合、育休中にやるべきことを時系列で整理しました。</p>

<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>出産後〜夏：情報収集</strong>
<p>久留米市の入園案内を入手し、選考基準と必要書類を確認します。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>夏〜秋：園見学</strong>
<p>候補の園を見学。通勤経路や送迎時間も考慮しましょう。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>10月〜11月：申込</strong>
<p>就労証明書を勤務先に依頼し、申込書類を提出します。</p>
</div>
</div>

<h2>育休復帰の加点を活用する</h2>
<p>久留米市では、育児休業を取得し入園と同時に復帰する場合、<span class="highlight">+15点</span>の調整加点があります。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>育休延長が可能な場合に「延長して利用調整の点数を0点にする」ことに同意した方は、調整点数が0点になります。保留通知が必要で育休延長を希望する場合は、申込時にその旨を確認しましょう。</p>
</div>

<h2>復帰時期の考え方</h2>
<p>入園月に復帰する場合に加点が得られます。勤務先と相談して復帰時期を決めましょう。入園が決まったら速やかに勤務先に連絡し、復帰日を確定させることが大切です。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳細は<a href="https://www.city.kurume.fukuoka.jp/1060manabi/2010kosodate/3090hoikusho/hoikusyoriyou0416.html" target="_blank" rel="noopener">久留米市公式サイト</a>でご確認ください。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 35,
  },
  // ===== 入園準備 (1) =====
  {
    slug: "first-day-preparation",
    citySlug: "kurume",
    title: "久留米市で内定後にやること｜入園準備チェックリスト",
    description:
      "久留米市の保育園に内定した後の手続きや入園準備について、チェックリスト形式でまとめました。",
    image:
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=400&fit=crop",
    category: "入園準備",
    categoryColor: "rose",
    content: `<h2>内定後の流れ</h2>
<p>久留米市から入園の内定通知が届いたら、以下の手続きを進めましょう。</p>

<h3>内定後チェックリスト</h3>
<table>
<tr><th>時期</th><th>やること</th></tr>
<tr><td>通知後すぐ</td><td>入園承諾・辞退の回答</td></tr>
<tr><td>2月〜3月</td><td>健康診断の受診</td></tr>
<tr><td>3月上旬</td><td>入園説明会への参加</td></tr>
<tr><td>3月中</td><td>持ち物・名前つけの準備</td></tr>
<tr><td>入園直前</td><td>慣らし保育のスケジュール確認</td></tr>
</table>

<h2>持ち物の準備</h2>
<p>園によって異なりますが、一般的に必要なものは以下の通りです。</p>
<ul>
<li>着替え（上下各2〜3セット）</li>
<li>おむつ・おしりふき（0〜2歳児）</li>
<li>お昼寝布団セット</li>
<li>食事用エプロン・タオル</li>
<li>連絡帳</li>
<li>通園バッグ</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>すべての持ち物に名前を書く必要があります。名前スタンプやお名前シールを早めに用意すると楽です。</p>
</div>

<h2>慣らし保育について</h2>
<p>入園後1〜2週間程度、短い時間から徐々に保育時間を延ばしていく「慣らし保育」があります。育休復帰のタイミングは、慣らし保育の期間を考慮して設定しましょう。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>内定を辞退すると、次回の利用調整で減点の対象になる場合があります。辞退する場合は慎重に検討しましょう。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 30,
  },
];

registerArticles(articles);
