import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  // ===== 保活の基本 (1) =====
  {
    slug: "hokatsu-schedule",
    citySlug: "kobe",
    title: "神戸市の保活スケジュール　令和8年度4月入園の流れ",
    description:
      "神戸市の認可保育園の申込時期・選考の流れ・結果通知の時期をわかりやすく解説。令和8年度4月入園のスケジュールを中心にまとめました。",
    image:
      "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>令和8年度（2026年度）4月入園のスケジュール</h2>
<p>神戸市の4月入園の申込は秋に集中します。早めにスケジュールを把握して準備を始めましょう。</p>

<h3>4月入園の日程</h3>
<table>
<tr><th>項目</th><th>日程</th></tr>
<tr><td>申請書類の配布開始</td><td>令和7年9月19日（金）</td></tr>
<tr><td>郵送申込期間</td><td>令和7年10月20日（月）〜11月28日（金）必着</td></tr>
<tr><td>電子申請期間</td><td>令和7年10月20日（月）〜11月30日（日）23時59分</td></tr>
<tr><td>結果通知発送</td><td>令和8年2月27日（金）頃</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>郵送は受付期間最終日必着です。余裕を持って提出しましょう。電子申請は申請完了画面が表示されるまでが手続きとなります。</p>
</div>

<h2>いつから動き始めるべき？</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>4月〜6月：情報収集スタート</strong>
<p>神戸市の保育施設の種類やエリアごとの特徴を調べましょう。</p>
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
<strong>9月〜10月：書類の準備</strong>
<p>申請書類を入手し、就労証明書を勤務先に依頼します。</p>
</div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content">
<strong>10月〜11月：申込</strong>
<p>郵送または電子申請で提出します。</p>
</div>
</div>

<h2>申込先</h2>
<p>申込書類は、お住まいの区の<strong>区役所・支所の保健福祉課こども福祉担当</strong>で受け取るか、神戸市公式サイトからダウンロードできます。電子申請も利用可能です。</p>

<h2>途中入園（5月〜3月）の申込</h2>
<p>年度途中の入園も可能です。利用希望月の前月10日頃が締切の目安ですが、詳細は区役所に確認してください。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳しくは<a href="https://www.city.kobe.lg.jp/a65174/kosodate/shien/shinseido/riyomoshikomi/shinsehoho.html" target="_blank" rel="noopener">神戸市公式サイト「教育・保育給付認定（2・3号認定）の申請・利用申込」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-03-28",
  },

  // ===== 点数・選考 (4) =====
  {
    slug: "scoring-system-guide",
    citySlug: "kobe",
    title: "神戸市の入園点数のしくみ　基本点数と調整点数をやさしく解説",
    description:
      "神戸市の保育園入園選考で使われる「基本点数」と「調整点数」の仕組みを初めての方にもわかるように解説します。",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>利用調整点数とは？</h2>
<p>神戸市の保育園入園は「先着順」ではなく、<strong>利用調整点数</strong>の高い順に内定が決まります。利用調整点数は次の式で求められます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>利用調整点数 ＝ 基本点数（父）＋ 基本点数（母）＋ 調整点数</p>
</div>

<h2>基本点数とは？</h2>
<p>父母それぞれの「保育が必要な理由」を点数化したものです。1人あたり最大<span class="highlight">100点</span>で、父母合計の最大は<span class="highlight">200点</span>です。</p>
<p>最も多いのは「就労」で、フルタイム（月20日以上かつ週40時間以上、または週5日以上かつ1日8時間以上）の場合は満点の100点となります。</p>

<table>
<tr><th>就労条件</th><th>基本点数</th></tr>
<tr><td>月20日以上・週40時間以上（又は週5日以上・日8時間以上）</td><td>100</td></tr>
<tr><td>月20日以上・週30時間以上（又は週5日以上・日6時間以上）</td><td>90</td></tr>
<tr><td>月16日以上・週24時間以上（又は週4日以上・日6時間以上）</td><td>80</td></tr>
<tr><td>月16日以上・週16時間以上（又は週4日以上・日4時間以上）</td><td>70</td></tr>
</table>

<h2>調整点数とは？</h2>
<p>世帯の特別な事情に応じて加減される点数です。代表的なものは以下の通りです。</p>

<table>
<tr><th>項目</th><th>調整点数</th></tr>
<tr><td>ひとり親世帯</td><td><span class="highlight">+130</span></td></tr>
<tr><td>きょうだいが第一希望の園に在園中</td><td><span class="highlight">+15</span></td></tr>
<tr><td>きょうだいが在園中（第一希望以外）</td><td><span class="highlight">+8</span></td></tr>
<tr><td>きょうだい同時申込</td><td><span class="highlight">+5</span></td></tr>
<tr><td>認可外保育施設を利用中</td><td><span class="highlight">+5</span></td></tr>
<tr><td>単身赴任</td><td><span class="highlight">+6</span></td></tr>
<tr><td>生活保護世帯</td><td><span class="highlight">+10</span></td></tr>
<tr><td>65歳未満の祖父母が同居</td><td><span class="highlight">-3</span></td></tr>
<tr><td>育休延長を許容</td><td><span class="highlight">-90</span></td></tr>
</table>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>65歳未満の祖父母が同居していると-3点の減点対象になります。また、育休延長を許容する場合は-90点と非常に大きな減点があるため注意が必要です。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>点数の詳細は各区役所・支所の保健福祉課こども福祉担当で確認できます。利用調整基準は<a href="https://www.city.kobe.lg.jp/a65174/kosodate/shien/shinseido/riyomoshikomi/shinsehoho.html" target="_blank" rel="noopener">神戸市公式サイト</a>に掲載されています。</p>
</div>`,
    publishedAt: "2026-03-28",
  },
  {
    slug: "score-up-checklist",
    citySlug: "kobe",
    title: "神戸市で調整点数を最大化する方法　加点チェックリスト",
    description:
      "神戸市の保育園入園選考で調整点数の加点を最大限に活用するためのチェックリストです。",
    image:
      "https://images.unsplash.com/photo-1607453998774-d533f65dac99?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>調整点数の加点を取りこぼさない</h2>
<p>神戸市の利用調整ではフルタイム共働きの基本点数200点で横並びになる世帯が多いため、<strong>調整点数</strong>が選考の決め手になります。該当する項目を漏れなく申告しましょう。</p>

<h3>加点チェックリスト</h3>
<table>
<tr><th>チェック</th><th>項目</th><th>点数</th></tr>
<tr><td></td><td>ひとり親世帯</td><td>+130</td></tr>
<tr><td></td><td>きょうだいが第一希望の園に在園中</td><td>+15</td></tr>
<tr><td></td><td>きょうだいが在園中（第一希望以外）</td><td>+8</td></tr>
<tr><td></td><td>きょうだい同時申込</td><td>+5</td></tr>
<tr><td></td><td>認可外保育施設を利用中</td><td>+5</td></tr>
<tr><td></td><td>単身赴任</td><td>+6</td></tr>
<tr><td></td><td>生活保護世帯</td><td>+10</td></tr>
</table>

<h2>減点に注意</h2>
<table>
<tr><th>項目</th><th>点数</th></tr>
<tr><td>65歳未満の祖父母が同居</td><td>-3</td></tr>
<tr><td>育休延長を許容</td><td>-90</td></tr>
</table>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>育休延長を許容する場合の-90点は非常に大きな減点です。フルタイム共働き200点でも110点まで下がり、入園は事実上困難になります。</p>
</div>

<h2>点数を上げるためにできること</h2>
<ol>
<li><strong>基本点数を最大化する</strong>：就労時間が足りない方の親がフルタイム（週40時間以上）にできれば基本点数100点を確保できる</li>
<li><strong>きょうだい同園を狙う</strong>：上の子と同じ園を第一希望にすることで+15点</li>
<li><strong>認可外を利用する</strong>：認可外保育施設に通っている場合は+5点</li>
<li><strong>該当する加点を漏れなく申告する</strong>：証明書類を添付しなければ加点されない</li>
</ol>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>利用調整基準の詳細は<a href="https://www.city.kobe.lg.jp/a65174/kosodate/shien/shinseido/riyomoshikomi/shinsehoho.html" target="_blank" rel="noopener">神戸市公式サイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-03-28",
  },
  {
    slug: "tiebreaker-rules",
    citySlug: "kobe",
    title: "神戸市で同点の場合はどうなる？利用調整の優先順位を解説",
    description:
      "神戸市の保育園選考で利用調整点数が同じ場合、どのような基準で優先されるかを解説します。",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>同点の場合の優先順位</h2>
<p>神戸市では基本点数＋調整点数の合計が同じ場合、さらに細かい基準で優先順位が決まります。</p>

<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>保育の必要性がより高い世帯</strong>
<p>世帯の状況（ひとり親、疾病、障がいなど）が総合的に判断されます。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>世帯の所得が低い方</strong>
<p>市民税所得割額が低い世帯が優先される傾向にあります。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>その他の事情</strong>
<p>具体的な状況に応じて区長が総合的に判断します。</p>
</div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>フルタイム共働き200点＋きょうだい在園+15で215点の世帯は多いため、それ以外の加点項目や所得の差で明暗が分かれます。希望園を多く書くことで内定確率を上げることが最も現実的な対策です。</p>
</div>

<h2>同点対策のまとめ</h2>
<ul>
<li>加点項目は漏れなく申告する</li>
<li>希望園は通える範囲でできるだけ多く記入する</li>
<li>人気園だけでなく、定員に余裕のある園も候補に入れる</li>
<li>不明な点は区役所の保健福祉課こども福祉担当に相談する</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>利用調整の詳細は各区役所・支所の保健福祉課こども福祉担当にお問い合わせください。申込状況は<a href="https://www.city.kobe.lg.jp/a65174/kosodate/yochien/moshikomijokyo.html" target="_blank" rel="noopener">神戸市公式サイト「教育・保育施設の申込状況」</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-03-28",
  },
  {
    slug: "jitan-kinmu-score",
    citySlug: "kobe",
    title: "時短勤務だと基本点数はどうなる？神戸市の合算方式での影響",
    description:
      "育休復帰後に時短勤務を選ぶ場合、神戸市の基本点数にどう影響するかを解説します。",
    image:
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>時短勤務は基本点数に影響する</h2>
<p>神戸市の基本点数は就労時間で決まります。時短勤務を選ぶと、フルタイムに比べて基本点数が下がる可能性があります。</p>

<h2>就労時間と基本点数の関係</h2>
<table>
<tr><th>就労条件</th><th>基本点数</th><th>勤務時間の目安</th></tr>
<tr><td>週40時間以上（又は週5日・日8時間以上）</td><td>100点</td><td>フルタイム</td></tr>
<tr><td>週30時間以上（又は週5日・日6時間以上）</td><td>90点</td><td>6時間の時短勤務</td></tr>
<tr><td>週24時間以上（又は週4日・日6時間以上）</td><td>80点</td><td>週4日勤務</td></tr>
<tr><td>週16時間以上（又は週4日・日4時間以上）</td><td>70点</td><td>短時間パート</td></tr>
</table>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>神戸市は父母合算方式のため、片方が時短勤務で90点になると、もう片方が満点の100点でも合計は190点です。フルタイム共働き（200点）との差は10点で、きょうだい在園+15よりも大きな差になります。</p>
</div>

<h2>入園申込時は「復職後の勤務時間」で判定</h2>
<p>入園申込の時点で育休中の場合、就労証明書には復職後の予定勤務条件を記載してもらいます。復職後にフルタイムで働く予定なら、フルタイムの基本点数100点で利用調整を受けられます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>「入園申込時はフルタイム勤務で申告し、入園後に時短勤務に変更する」ことは可能です。ただし、変更後の勤務時間が神戸市の保育の必要性の基準を下回らないよう注意してください。</p>
</div>

<h2>時短でも基本点数を維持するには</h2>
<ul>
<li>週5日・1日6時間以上であれば基本点数90点を確保できる</li>
<li>勤務日数や時間を調整して上の区分に合わせる方法もある</li>
<li>勤務先と相談して、入園申込時点でのフルタイム復職を検討する</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>基本点数表の詳細は<a href="https://www.city.kobe.lg.jp/a65174/kosodate/shien/shinseido/riyomoshikomi/shinsehoho.html" target="_blank" rel="noopener">神戸市公式サイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-03-28",
  },

  // ===== 認可外 (2) =====
  {
    slug: "ninkagai-oyako",
    citySlug: "kobe",
    title: "認可園に落ちた場合の選択肢　神戸市の認可外・企業主導型活用法",
    description:
      "神戸市の認可保育園に入れなかった場合に検討すべき認可外保育施設や企業主導型保育の活用法を紹介します。",
    image:
      "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&h=400&fit=crop",
    category: "認可外",
    categoryColor: "purple",
    content: `<h2>認可園に入れなかったらどうする？</h2>
<p>神戸市の認可保育園に入れなかった場合でも、いくつかの選択肢があります。慌てずに次のステップを検討しましょう。</p>

<h2>選択肢1：二次選考を待つ</h2>
<p>一次選考後に辞退者が出た場合や、定員に空きが生じた場合は追加の選考が行われることがあります。</p>

<h2>選択肢2：認可外保育施設を利用する</h2>
<p>認可外保育施設は園と直接契約するため、点数による選考はありません。空きがあればすぐに入園できます。</p>

<h2>選択肢3：企業主導型保育の地域枠を利用する</h2>
<p>企業主導型保育施設の地域枠は、その企業の従業員でなくても利用可能です。保育料も比較的リーズナブルな施設が多いです。</p>

<h2>選択肢4：途中入園を毎月申し込む</h2>
<p>認可外に通いながら、毎月の途中入園の申込を続けることができます。辞退や転園で空きが出るタイミングで内定する可能性があります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>神戸市では認可外保育施設に通っている場合、利用調整で+5点の加点が得られます。認可外を「つなぎ」で利用しながら翌年4月の選考で加点を得る戦略も有効です。</p>
</div>

<h2>選択肢5：育休を延長する</h2>
<p>認可保育園に入れなかったことを理由に育児休業を最長2歳まで延長できます。ただし、育休延長を許容する場合は-90点の減点があるため、翌年度の選考で不利になる点に注意してください。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>市内の保育施設情報は<a href="https://www.city.kobe.lg.jp/z/kodomokatekyoku/shienbu/shisetsuichiran.html" target="_blank" rel="noopener">神戸市公式サイト「教育・保育施設一覧」</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-03-28",
  },
  {
    slug: "ninkagai-katen",
    citySlug: "kobe",
    title: "神戸市で認可外保育施設を利用して加点を得る方法",
    description:
      "神戸市で認可外保育施設を利用している場合の+5点の加点について、戦略的な活用法を解説します。",
    image:
      "https://images.unsplash.com/photo-1587654780860-5e6801e6e7f5?w=800&h=400&fit=crop",
    category: "認可外",
    categoryColor: "purple",
    content: `<h2>認可外保育施設の利用で+5点</h2>
<p>神戸市では、認可外保育施設を利用している場合に利用調整で<span class="highlight">+5点</span>の加点を受けることができます。これは他の自治体では珍しい制度で、認可外を経由して認可園を目指す戦略が有効です。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>フルタイム共働き200点に認可外利用の+5点を加えると205点。きょうだい在園がない世帯にとっては、この5点が選考の明暗を分けることがあります。</p>
</div>

<h2>認可外→認可の戦略</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>認可外保育施設に入園</strong>
<p>認可園の選考結果を待たずに、認可外に入園して復職します。園と直接契約するため、点数は不要です。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>認可園に途中入園または翌年4月に申込</strong>
<p>認可外利用中の+5点を加点した上で選考を受けられます。</p>
</div>
</div>

<h2>加点を受けるための条件</h2>
<p>認可外保育施設の利用加点を受けるには、申込時点で認可外保育施設に通っていることを証明する書類の提出が必要です。利用証明書を施設から発行してもらいましょう。</p>

<h2>認可外利用時の無償化</h2>
<p>認可外保育施設でも「保育の必要性」の認定（施設等利用給付認定）を受ければ無償化の対象になります。</p>
<table>
<tr><th>対象</th><th>月額上限</th></tr>
<tr><td>3〜5歳児</td><td>37,000円</td></tr>
<tr><td>0〜2歳児（住民税非課税世帯）</td><td>42,000円</td></tr>
</table>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>認可外保育施設の情報は<a href="https://www.city.kobe.lg.jp/z/kodomokatekyoku/shienbu/shisetsuichiran.html" target="_blank" rel="noopener">神戸市公式サイト「教育・保育施設一覧」</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-03-28",
  },

  // ===== 保育園選び (1) =====
  {
    slug: "area-guide",
    citySlug: "kobe",
    title: "神戸市の人気エリアと穴場エリア　区別の保育園入りやすさ",
    description:
      "神戸市9区の保育園事情を比較。人気が高く競争の激しいエリアと、比較的入りやすいエリアの特徴を解説します。",
    image:
      "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&h=400&fit=crop",
    category: "保育園選び",
    categoryColor: "rose",
    content: `<h2>神戸市9区の保育園事情</h2>
<p>神戸市は9つの区で構成されています。区によって保育施設の数や入りやすさに差があるため、申込前にエリアの特徴を把握しておきましょう。</p>

<h3>競争が激しいエリア</h3>
<table>
<tr><th>区</th><th>特徴</th></tr>
<tr><td>東灘区</td><td>子育て世帯に人気の住宅地。0〜1歳児クラスの競争が特に激しい</td></tr>
<tr><td>中央区</td><td>三宮周辺の都心部で保育ニーズが集中</td></tr>
<tr><td>灘区</td><td>阪急沿線を中心にファミリー層が多く、保育需要が高い</td></tr>
</table>

<h3>比較的入りやすいエリア</h3>
<table>
<tr><th>区</th><th>特徴</th></tr>
<tr><td>北区</td><td>郊外エリアで園数に比べて入園希望者が少ない傾向</td></tr>
<tr><td>西区</td><td>ニュータウンを中心に施設が整備されており、比較的余裕がある</td></tr>
<tr><td>垂水区</td><td>一部エリアでは空きがある施設も</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>神戸市は令和4年4月に待機児童ゼロを達成しましたが、東灘区などの人気エリアでは0〜1歳児クラスの競争が続いています。2025年度からは保育所・認定こども園の原則新設なしとなっており、既存園への集中が続く見込みです。</p>
</div>

<h2>申込状況の確認方法</h2>
<p>神戸市は教育・保育施設の申込状況を公式サイトで公開しています。希望園の申込倍率を事前に確認しておきましょう。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>申込状況は<a href="https://www.city.kobe.lg.jp/a65174/kosodate/yochien/moshikomijokyo.html" target="_blank" rel="noopener">神戸市公式サイト「教育・保育施設の申込状況」</a>で確認できます。施設一覧は<a href="https://www.city.kobe.lg.jp/z/kodomokatekyoku/shienbu/shisetsuichiran.html" target="_blank" rel="noopener">教育・保育施設一覧</a>をご覧ください。</p>
</div>`,
    publishedAt: "2026-03-28",
  },

  // ===== 最新情報 (1) =====
  {
    slug: "r8-changes",
    citySlug: "kobe",
    title: "令和8年度の変更点まとめ　神戸市の保育施設利用で知っておくべきこと",
    description:
      "令和8年度（2026年度）の神戸市の保育施設利用に関する変更点や最新情報をまとめました。",
    image:
      "https://images.unsplash.com/photo-1504711434969-e33886168d5c?w=800&h=400&fit=crop",
    category: "最新情報",
    categoryColor: "blue",
    content: `<h2>2025年度から保育所等の原則新設なし</h2>
<p>神戸市では保育需要の減少を受け、2025年度から保育所・認定こども園の<strong>原則新設なし</strong>の方針が打ち出されました。これにより、既存園の定員枠の取り合いが今後も続く見込みです。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>新設園が減ることで、人気エリアの競争は今後も緩和されにくい可能性があります。希望園を幅広く記入することがますます重要になっています。</p>
</div>

<h2>育休延長の審査厳格化</h2>
<p>全国的な制度改正として、2025年4月から育休延長の審査が厳格化されました。神戸市でも入園意思の確認が強化されています。</p>
<ul>
<li>ハローワークへの利用申込書の写しの提出が必要に</li>
<li>意図的に入園しにくい条件で申し込んだ場合、育休延長が認められない可能性</li>
</ul>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>神戸市では育休延長を許容すると-90点の大幅な減点があります。この制度と国の審査厳格化が重なるため、育休延長の判断は慎重に行ってください。</p>
</div>

<h2>電子申請の利用</h2>
<p>神戸市では電子申請による利用申込が可能です。郵送申込と締切日が異なるため（電子申請は11月30日まで、郵送は11月28日必着）、電子申請の方が若干猶予があります。</p>

<h2>保育料について</h2>
<p>3〜5歳児クラスは幼児教育・保育の無償化により保育料は無料です。0〜2歳児クラスは市民税所得割額に基づいた保育料がかかります。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新の申込情報は<a href="https://www.city.kobe.lg.jp/a65174/kosodate/shien/shinseido/riyomoshikomi/shinsehoho.html" target="_blank" rel="noopener">神戸市公式サイト「教育・保育給付認定の申請・利用申込」</a>をご確認ください。保育料は<a href="https://www.city.kobe.lg.jp/a65174/kosodate/shien/shinseido/riyomoshikomi/riyoshafutangaku.html" target="_blank" rel="noopener">利用者負担額のページ</a>でご確認ください。</p>
</div>`,
    publishedAt: "2026-03-28",
  },

  // ===== 育休・復職 (1) =====
  {
    slug: "ikukyu-enchou-warning",
    citySlug: "kobe",
    title: "育休延長許容-90点の注意点　神戸市で知っておくべきリスク",
    description:
      "神戸市で育休延長を許容した場合に発生する-90点の減点について、そのリスクと対処法を解説します。",
    image:
      "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?w=800&h=400&fit=crop",
    category: "育休・復職",
    categoryColor: "teal",
    content: `<h2>育休延長許容で-90点とは</h2>
<p>神戸市では、入園申込の際に「育休延長を許容する（入園できなくても構わない）」旨を申告した場合、調整点数で<span class="highlight">-90点</span>の大幅な減点が適用されます。</p>

<h2>具体的な影響</h2>
<table>
<tr><th>ケース</th><th>合計点数</th></tr>
<tr><td>フルタイム共働き（加点なし）</td><td>200点</td></tr>
<tr><td>フルタイム共働き＋育休延長許容</td><td><span class="highlight">110点</span></td></tr>
<tr><td>フルタイム共働き＋きょうだい在園</td><td>215点</td></tr>
</table>
<p>200点から110点に下がるため、パート勤務の世帯よりも低い点数になります。事実上、入園は極めて困難です。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>育休延長許容の-90点は、他の加点項目では到底カバーできない減点幅です。「入園したいが、もし落ちたら育休延長しよう」という軽い気持ちで申告すると、入園の可能性がほぼなくなります。</p>
</div>

<h2>なぜこの制度があるのか</h2>
<p>神戸市の利用調整は「保育の必要性が高い世帯」を優先する仕組みです。育休延長を許容するということは「今すぐ保育が必要ではない」と判断されるため、大きな減点が設定されています。</p>

<h2>育休を延長したい場合の対応</h2>
<ul>
<li><strong>入園の意思がある場合</strong>：育休延長許容にチェックを入れず、通常通り申込む。不承諾通知は自動的に届くため、それを使って育休延長の手続きが可能</li>
<li><strong>本当に入園を希望しない場合</strong>：申込自体をしないという選択肢もある。ただし不承諾通知が必要な場合は申込が必要</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>2025年4月以降、育休延長の審査が全国的に厳格化されています。「落選狙い」の申込は認められにくくなっています。入園を希望する園に誠実に申し込み、結果的に不承諾になった場合に育休延長するのが正しい対応です。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>育休延長の手続きについては<a href="https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/0000160564_00040.html" target="_blank" rel="noopener">厚生労働省の公式ページ</a>をご確認ください。利用調整基準の詳細は各区役所・支所の保健福祉課こども福祉担当にお問い合わせください。</p>
</div>`,
    publishedAt: "2026-03-28",
  },
];

registerArticles(articles);
