import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  // ===== 点数・選考 (4) =====
  {
    slug: "scoring-system-guide",
    citySlug: "fukuoka",
    title: "福岡市の入園点数のしくみ｜基本点数と調整点数をやさしく解説",
    description:
      "福岡市の保育園入園選考で使われる「基本点数」と「調整点数」の仕組みを初めての方にもわかるように解説します。",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>利用調整点数とは？</h2>
<p>福岡市の保育園入園は「先着順」ではなく、<strong>利用調整点数</strong>の高い順に内定が決まります。利用調整点数は次の式で求められます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>利用調整点数 ＝ 基本点数（低い方の保護者） ＋ 調整点数</p>
</div>

<h2>基本点数とは？</h2>
<p>父母それぞれの「保育が必要な理由」を点数化したものです。福岡市の大きな特徴は、<span class="highlight">父母のうち低い方の基本点数が世帯の基本点数</span>になることです（min方式）。</p>

<p>就労の場合の基本点数は以下の通りです。</p>
<table>
<tr><th>月の勤務時間</th><th>基本点数</th></tr>
<tr><td>160時間以上</td><td>150</td></tr>
<tr><td>140時間以上160時間未満</td><td>140</td></tr>
<tr><td>120時間以上140時間未満</td><td>130</td></tr>
<tr><td>100時間以上120時間未満</td><td>110</td></tr>
<tr><td>80時間以上100時間未満</td><td>90</td></tr>
<tr><td>64時間以上80時間未満</td><td>70</td></tr>
</table>

<h2>調整点数とは？</h2>
<p>世帯の特別な事情に応じて加算される点数です。代表的なものは以下の通りです。</p>
<ul>
<li>ひとり親世帯：<span class="highlight">+75点</span></li>
<li>保育士・保育教諭として勤務：<span class="highlight">+75点</span></li>
<li>きょうだいが同一施設を利用中で同じ施設を希望：<span class="highlight">+70点</span></li>
<li>多胎児が同時に申込：<span class="highlight">+50点</span></li>
<li>きょうだいが同時に申込：<span class="highlight">+35点</span></li>
<li>育休明け復職予定：<span class="highlight">+15点</span></li>
<li>生活保護世帯：<span class="highlight">+15点</span></li>
<li>単身赴任：<span class="highlight">+15点</span></li>
</ul>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>調整点数は複数の項目に該当する場合、それぞれを加算します。ただし、きょうだい同一施設（+70点）ときょうだい同時申込（+35点）は、高い方のみ適用されます。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>利用調整基準表の全項目は<a href="https://kodomo.city.fukuoka.lg.jp/wp-content/uploads/2025/09/d202ed28904cd28e882f6ee0ec68dba8.pdf" target="_blank" rel="noopener">福岡市保育施設等利用調整基準表（PDF）</a>でご確認ください。</p>
</div>`,
    publishedAt: "2026-03-28",
  },
  {
    slug: "score-up-checklist",
    citySlug: "fukuoka",
    title: "福岡市で調整点数を最大化する方法｜加点チェックリスト",
    description:
      "福岡市の入園選考で調整点数の加点を最大限に活用する方法をチェックリスト形式で解説します。",
    image:
      "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>調整点数の加点を漏れなく確認しよう</h2>
<p>福岡市の入園選考では、基本点数が同じ世帯同士の競争になることが多いため、<span class="highlight">調整点数の1点</span>が合否を左右します。該当する項目がないか、一つずつ確認しましょう。</p>

<h3>加点チェックリスト</h3>
<table>
<tr><th>加点項目</th><th>点数</th><th>条件</th></tr>
<tr><td>ひとり親世帯</td><td>+75点</td><td>ひとり親であること</td></tr>
<tr><td>保育士・保育教諭として勤務</td><td>+75点</td><td>保育施設で保育士等として働いている（働く予定）</td></tr>
<tr><td>きょうだいが同一施設を利用中</td><td>+70点</td><td>在園中のきょうだいと同じ施設を希望</td></tr>
<tr><td>多胎児の同時申込</td><td>+50点</td><td>双子・三つ子などが同時に利用申込</td></tr>
<tr><td>きょうだいの同時申込</td><td>+35点</td><td>きょうだいが同時に利用を申し込む</td></tr>
<tr><td>育休明け復職予定</td><td>+15点</td><td>育児休業から復職予定であること</td></tr>
<tr><td>生活保護世帯</td><td>+15点</td><td>生活保護を受給中</td></tr>
<tr><td>単身赴任</td><td>+15点</td><td>配偶者が単身赴任中</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>複数の項目に該当する場合は、それぞれの点数が加算されます。見落としがないよう利用調整基準表を丁寧に確認しましょう。</p>
</div>

<h2>よくある見落とし</h2>
<ul>
<li><strong>育休明け復職の加点</strong>：産休・育休を取得中で、入園と同時に復職予定なら+15点。申告を忘れがち</li>
<li><strong>きょうだい関連の加点</strong>：上の子が在園中なら+70点は大きい。同一施設を希望園に入れること</li>
<li><strong>保育士加点</strong>：保育士資格を持っていて保育施設で勤務（予定）なら+75点と非常に大きい</li>
</ul>

<h2>減点にも注意</h2>
<p>調整点数には減点項目もあります。内定を辞退した場合などは減点の対象になることがあります。事前に基準表で確認しておきましょう。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>利用調整基準表の全項目は<a href="https://kodomo.city.fukuoka.lg.jp/wp-content/uploads/2025/09/d202ed28904cd28e882f6ee0ec68dba8.pdf" target="_blank" rel="noopener">福岡市保育施設等利用調整基準表（PDF）</a>でご確認ください。</p>
</div>`,
    publishedAt: "2026-03-28",
  },
  {
    slug: "150-point-line",
    citySlug: "fukuoka",
    title: "福岡市で150点は安心？フルタイム共働きの入園事情",
    description:
      "フルタイム共働きで基本点数150点の家庭が、福岡市の保育園に入れるかどうかの実態を解説します。",
    image:
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>150点はスタートライン</h2>
<p>福岡市でフルタイム共働き（父母ともに月160時間以上勤務）の場合、基本点数は<span class="highlight">150点</span>です。これは最も多い申込パターンであり、150点同士の競争になります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>150点はあくまで「スタートライン」。同じ150点の世帯が多いため、調整点数の差が合否を左右します。</p>
</div>

<h2>150点で入れるかはエリア次第</h2>
<p>福岡市全体では待機児童ゼロを達成していますが、エリアによって入りやすさに差があります。</p>
<ul>
<li><strong>比較的入りやすいエリア</strong>：施設数が多い博多区・中央区の一部</li>
<li><strong>激戦エリア</strong>：マンション開発が進む東区・早良区の一部</li>
</ul>

<h2>150点＋調整点数が勝負の分かれ目</h2>
<p>同じ基本点数150点の世帯間では、調整点数の有無が決め手になります。</p>
<table>
<tr><th>パターン</th><th>合計点数</th></tr>
<tr><td>150点のみ（調整点数なし）</td><td>150点</td></tr>
<tr><td>150点＋育休明け復職</td><td>165点</td></tr>
<tr><td>150点＋きょうだい同時申込</td><td>185点</td></tr>
<tr><td>150点＋きょうだい同一施設</td><td>220点</td></tr>
</table>

<h2>同点の場合はどうなる？</h2>
<p>利用調整点数が同点の場合は、福岡市が定める優先順位に基づいて判断されます。具体的には、世帯の所得が低い世帯や、ひとり親世帯などが優先されます。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>「隠れ待機児童」（希望園に入れず辞退した児童）は依然として存在します。希望園を多く記入することでリスクを下げましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>空き状況は<a href="https://kodomo-hoiku.city.fukuoka.lg.jp/search/" target="_blank" rel="noopener">ふくおか保育所案内板（空きマップ）</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-03-28",
  },
  {
    slug: "tiebreaker-rules",
    citySlug: "fukuoka",
    title: "福岡市で同点の場合はどうなる？利用調整の優先順位を解説",
    description:
      "福岡市の保育園入園選考で利用調整点数が同点になった場合の優先順位について解説します。",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>同点の場合の優先順位</h2>
<p>福岡市の利用調整では、利用調整点数が同じ場合に優先順位を判定するルールがあります。同点の世帯が多い人気園では、この優先順位が実質的な合否の分かれ目になります。</p>

<h2>優先される世帯の例</h2>
<p>利用調整点数が同点の場合、以下のような要素が優先判断に使われます。</p>
<ul>
<li>保育の必要性がより高い世帯</li>
<li>世帯の市民税所得割額が低い世帯（所得が低い世帯）</li>
<li>ひとり親世帯や障がい者がいる世帯</li>
<li>福岡市に居住している期間が長い世帯</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>同点の場合は「所得が低い世帯」が優先される傾向があります。世帯年収が高い家庭ほど、調整点数で差をつけることが重要です。</p>
</div>

<h2>同点を避けるための対策</h2>
<p>そもそも同点になりにくくするための対策を考えましょう。</p>

<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>調整点数の加点を最大化する</strong>
<p>育休明け復職（+15点）やきょうだい同時申込（+35点）など、使える加点は全て申告しましょう。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>希望園の選び方を工夫する</strong>
<p>倍率の高い園だけでなく、比較的空きのある園も希望に含めることで内定の確率が上がります。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>勤務時間を確認する</strong>
<p>基本点数の区分が1つ上がるだけで10〜20点の差が出ます。勤務時間が区分の境目にある場合は調整できないか検討しましょう。</p>
</div>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>利用調整の詳細は<a href="https://www.city.fukuoka.lg.jp/kodomo-mirai/hoiku/child/Index_R7.html" target="_blank" rel="noopener">福岡市公式サイト「保育施設等利用のご案内」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-03-28",
  },

  // ===== 落ちたとき・認可外 (2) =====
  {
    slug: "ninkagai-as-backup",
    citySlug: "fukuoka",
    title: "認可外保育施設を「つなぎ」で使う戦略｜福岡市の保活テクニック",
    description:
      "認可園に入れなかった場合に認可外保育施設を一時的に利用し、翌年度に認可園を目指す戦略を解説します。",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "認可外",
    categoryColor: "purple",
    content: `<h2>「つなぎ利用」とは</h2>
<p>認可保育園に入れなかった場合、認可外保育施設を一時的に利用しながら、次の利用調整で認可園を目指す方法です。仕事に復帰する必要がある場合の現実的な選択肢です。</p>

<h2>つなぎ利用のメリット</h2>
<ul>
<li>予定通り仕事に復帰できる</li>
<li>翌年度の利用調整で「保育を利用中」として申込できる</li>
<li>子どもが集団生活に慣れる</li>
</ul>

<h2>費用面の負担軽減</h2>
<p>認可外保育施設の利用でも、以下の補助を受けられます。</p>
<ul>
<li>3〜5歳児：月額37,000円まで無償化</li>
<li>0〜2歳児（住民税非課税世帯）：月額42,000円まで無償化</li>
<li>第2子以降：福岡市独自の無償化制度の対象</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>無償化の補助を受けるには「保育の必要性」の認定（新2号・新3号認定）が必要です。認可の不承諾通知を受けたら、すぐに区役所で認定の手続きを行いましょう。</p>
</div>

<h2>認可園への再申込</h2>
<p>認可外保育施設を利用しながら、翌年度の4月入園に改めて申込を行います。途中入園（5月〜3月）にも毎月申し込めます。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>認可外保育施設を選ぶ際は、「指導監督基準を満たす旨の証明書」が交付されている施設を優先しましょう。福岡市の認可外保育施設一覧で確認できます。</p>
</div>

<h2>企業主導型保育施設も検討を</h2>
<p>企業主導型保育施設は国の助成を受けており、比較的安い保育料で利用できます。地域枠が空いていれば、つなぎ利用の有力な選択肢になります。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>認可外保育施設の一覧は<a href="https://www.city.fukuoka.lg.jp/kodomo/shisetsu/hoikusyo/hoikusyo_list.htm" target="_blank" rel="noopener">福岡市公式サイト「認可外保育施設一覧」</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-03-28",
  },
  {
    slug: "ninkagai-guide",
    citySlug: "fukuoka",
    title: "福岡市の認可外保育施設ガイド｜届出施設の選び方と注意点",
    description:
      "福岡市の認可外保育施設（届出保育施設）の種類、選び方、利用時の注意点をまとめました。",
    image:
      "https://images.unsplash.com/photo-1587654780860-5e6801e6e7f5?w=800&h=400&fit=crop",
    category: "認可外",
    categoryColor: "purple",
    content: `<h2>認可外保育施設とは</h2>
<p>認可外保育施設は、国が定めた認可基準を満たしていないものの、福岡市に届出を行って運営している保育施設です。福岡市では「届出保育施設」とも呼ばれます。</p>

<h2>認可外のメリット</h2>
<ul>
<li><strong>利用調整なし</strong>：園と直接契約できるため、点数に関係なく利用可能</li>
<li><strong>空きがあればすぐ入園可能</strong>：申込時期の制約が少ない</li>
<li><strong>独自の保育プログラム</strong>：英語保育や延長保育など特色のある園がある</li>
<li><strong>認可園の「つなぎ」として利用</strong>：認可が決まるまでの一時的な利用にも</li>
</ul>

<h2>選ぶ際の注意点</h2>
<ul>
<li>「指導監督基準を満たす旨の証明書」が交付されているか確認する</li>
<li>見学して保育の質や安全対策を自分の目で確かめる</li>
<li>保育料や延長料金など費用の全体像を事前に確認する</li>
<li>保育士の配置人数を確認する</li>
</ul>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>福岡市の認可外保育施設一覧は区ごとに公開されています。一覧に載っていない施設は届出がされていない可能性があるため、利用を避けてください。</p>
</div>

<h2>無償化との関係</h2>
<p>認可外保育施設でも、「保育の必要性」の認定を受ければ無償化の対象になります。3〜5歳児は月額37,000円まで、0〜2歳児（住民税非課税世帯）は月額42,000円まで補助されます。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>認可外保育施設の一覧は<a href="https://www.city.fukuoka.lg.jp/kodomo/shisetsu/hoikusyo/hoikusyo_list.htm" target="_blank" rel="noopener">福岡市公式サイト「認可外保育施設一覧」</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-03-28",
  },

  // ===== 育休・復職 (1) =====
  {
    slug: "jitan-kinmu-score",
    citySlug: "fukuoka",
    title: "時短勤務だと基本点数はどうなる？福岡市のmin方式での影響",
    description:
      "育休復帰後に時短勤務を選ぶ場合、福岡市の基本点数にどう影響するかを解説します。",
    image:
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=400&fit=crop",
    category: "育休・復職",
    categoryColor: "teal",
    content: `<h2>時短勤務は基本点数に影響する</h2>
<p>福岡市の基本点数は「月の勤務時間」で決まります。時短勤務を選ぶと、フルタイムに比べて勤務時間が短くなるため、基本点数が下がる可能性があります。</p>

<h2>勤務時間と基本点数の関係</h2>
<table>
<tr><th>月の勤務時間</th><th>基本点数</th><th>1日の勤務時間の目安</th></tr>
<tr><td>160時間以上</td><td>150点</td><td>8時間×20日</td></tr>
<tr><td>140時間以上</td><td>140点</td><td>7時間×20日</td></tr>
<tr><td>120時間以上</td><td>130点</td><td>6時間×20日</td></tr>
<tr><td>100時間以上</td><td>110点</td><td>5時間×20日</td></tr>
</table>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>福岡市はmin方式のため、時短勤務をする保護者の基本点数が世帯の基本点数になります。片方がフルタイム（150点）でも、もう片方が時短（130点）なら世帯の基本点数は130点です。</p>
</div>

<h2>入園申込時は「復職後の勤務時間」で判定</h2>
<p>入園申込の時点では、実際にはまだ育休中です。就労証明書には復職後の予定勤務時間を記載してもらいます。復職後にフルタイムで働く予定なら、フルタイムの基本点数で利用調整を受けられます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>「入園申込時はフルタイム勤務で申告し、入園後に時短勤務に変更する」ことは可能です。ただし、変更後の勤務時間が月64時間未満になると保育の必要性がなくなるため注意してください。</p>
</div>

<h2>時短でも基本点数を維持するには</h2>
<ul>
<li>1日6時間×月20日＝120時間であれば基本点数130点を確保できる</li>
<li>勤務日数を増やすことで月の合計時間を上の区分に合わせる方法もある</li>
<li>勤務先と相談して、柔軟な働き方を検討する</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>基本点数表の詳細は<a href="https://kodomo.city.fukuoka.lg.jp/wp-content/uploads/2025/09/d202ed28904cd28e882f6ee0ec68dba8.pdf" target="_blank" rel="noopener">福岡市保育施設等利用調整基準表（PDF）</a>でご確認ください。</p>
</div>`,
    publishedAt: "2026-03-28",
  },

  // ===== 保育園選び (1) =====
  {
    slug: "area-guide",
    citySlug: "fukuoka",
    title: "福岡市の保育園激戦エリアと穴場エリア｜区別の入りやすさ",
    description:
      "福岡市の7区それぞれの保育園事情を、激戦エリアと比較的入りやすいエリアに分けて解説します。",
    image:
      "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&h=400&fit=crop",
    category: "保育園選び",
    categoryColor: "rose",
    content: `<h2>福岡市は7つの区がある</h2>
<p>福岡市は東区・博多区・中央区・南区・城南区・早良区・西区の7区で構成されています。区によって保育園の数や空き状況に差があるため、申込前にエリアの特性を把握しておくことが重要です。</p>

<h2>激戦エリア</h2>

<h3>東区</h3>
<p>マンション開発が進み、子育て世帯が急増しているエリアです。特に千早・香椎エリアは人気が高く、0〜1歳児クラスの競争が激しい傾向にあります。</p>

<h3>早良区</h3>
<p>室見・西新エリアを中心に、ファミリー層に人気の住宅地です。駅近の園は特に倍率が高くなります。</p>

<h2>比較的入りやすいエリア</h2>

<h3>博多区・中央区</h3>
<p>施設数が多く、企業主導型保育施設も充実しています。ただし、人気園は競争があるため油断はできません。</p>

<h3>南区・城南区・西区</h3>
<p>住宅地が広がるエリアで、施設数も一定数あります。駅から離れたエリアでは空きがある場合も。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>激戦エリアに住んでいても、隣接する区の保育園を希望することは可能です。通勤経路上の園も視野に入れましょう。</p>
</div>

<h2>空き状況の確認方法</h2>
<p>福岡市では「ふくおか保育所案内板（空きマップ）」で、リアルタイムの空き状況を地図上で確認できます。定期的にチェックして、途中入園のチャンスも逃さないようにしましょう。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>空き状況は<a href="https://kodomo-hoiku.city.fukuoka.lg.jp/search/" target="_blank" rel="noopener">ふくおか保育所案内板（空きマップ）</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-03-28",
  },

  // ===== 最新情報 (1) =====
  {
    slug: "r8-changes",
    citySlug: "fukuoka",
    title: "令和8年度の変更点まとめ｜福岡市の保育施設利用で知っておくべきこと",
    description:
      "令和8年度（2026年度）の福岡市の保育施設利用に関する変更点や最新情報をまとめました。",
    image:
      "https://images.unsplash.com/photo-1504711434969-e33886168d5c?w=800&h=400&fit=crop",
    category: "最新情報",
    categoryColor: "blue",
    content: `<h2>令和8年度の申込スケジュール</h2>
<p>令和8年度4月入園の利用調整スケジュールは以下の通りです。</p>
<table>
<tr><th>調整</th><th>申込締切</th><th>結果通知</th></tr>
<tr><td>一次調整</td><td>令和7年11月7日</td><td>令和8年1月15日</td></tr>
<tr><td>二次調整</td><td>令和8年1月29日</td><td>2月中旬</td></tr>
<tr><td>三次調整</td><td>令和8年2月27日</td><td>3月中旬</td></tr>
</table>

<h2>利用調整基準表の確認を</h2>
<p>令和8年4月1日利用調整分から適用される新しい利用調整基準表が公開されています。基本点数や調整点数に変更がないか、必ず最新の基準表を確認してください。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>利用調整基準は毎年度見直される可能性があります。前年度の情報を鵜呑みにせず、必ず最新の「保育施設等利用のご案内」を確認しましょう。</p>
</div>

<h2>オンライン申請の拡充</h2>
<p>福岡市ではマイナポータル（ぴったりサービス）を通じたオンライン申請が利用可能です。入園申込だけでなく、各種届出もオンラインで手続きできるようになっています。</p>

<h2>第2子以降の保育料無償化は継続</h2>
<p>令和5年度から開始された第2子以降の保育料無償化制度は、令和8年度も継続しています。認可保育施設だけでなく、認可外保育施設を利用する場合も対象です。</p>

<h2>空きマップの活用</h2>
<p>「ふくおか保育所案内板（空きマップ）」では、施設の空き状況をリアルタイムで確認できます。途中入園を検討している方は定期的にチェックしましょう。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>令和8年度の最新情報は<a href="https://kodomo.city.fukuoka.lg.jp/en/info/18258/" target="_blank" rel="noopener">福岡市「保育施設等利用のご案内（令和8年度）」</a>をご確認ください。利用調整基準表は<a href="https://kodomo.city.fukuoka.lg.jp/wp-content/uploads/2025/09/d202ed28904cd28e882f6ee0ec68dba8.pdf" target="_blank" rel="noopener">こちら（PDF）</a>からダウンロードできます。</p>
</div>`,
    publishedAt: "2026-03-28",
  },

  // ===== 保活の基本 (1) =====
  {
    slug: "hokatsu-schedule",
    citySlug: "fukuoka",
    title: "福岡市の保活スケジュール完全ガイド｜令和8年度4月入園",
    description:
      "福岡市の認可保育園の申込時期・選考の流れ・結果通知の時期をわかりやすく解説。令和8年度4月入園のスケジュールを中心にまとめました。",
    image:
      "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>令和8年度（2026年度）4月入園のスケジュール</h2>
<p>福岡市の4月入園は、<strong>一次調整</strong>から<strong>三次調整</strong>まで3回のチャンスがあります。早めの準備が保活成功のカギです。</p>

<h3>4月入園の日程</h3>
<table>
<tr><th>調整</th><th>申込締切</th><th>結果通知発送</th></tr>
<tr><td>一次調整</td><td>令和7年11月7日（金）</td><td>令和8年1月15日（木）</td></tr>
<tr><td>二次調整</td><td>令和8年1月29日（木）</td><td>令和8年2月中旬</td></tr>
<tr><td>三次調整</td><td>令和8年2月27日（金）</td><td>令和8年3月中旬</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>一次調整で枠の大部分が埋まります。4月入園を目指すなら一次の締切に間に合うように準備しましょう。</p>
</div>

<h2>提出場所と申込方法</h2>
<p>申込書類は、お住まいの区の<strong>区役所子育て支援課</strong>に提出します。マイナポータル（ぴったりサービス）を利用した<strong>オンライン申請</strong>も可能です。</p>

<h2>いつから動き始めるべき？</h2>

<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>4月〜6月：情報収集スタート</strong>
<p>「保育施設等利用のご案内」を確認し、保育園の種類やエリアを調べましょう。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>7月〜9月：保育園見学</strong>
<p>気になる園に電話して見学予約。園の雰囲気を直接確かめましょう。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>9月〜10月：書類の準備</strong>
<p>就労証明書を勤務先に依頼し、申込書類を揃えます。</p>
</div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content">
<strong>11月上旬：一次調整に申込</strong>
<p>締切日までに区役所またはオンラインで提出します。</p>
</div>
</div>

<h2>途中入園（5月〜3月）の申込</h2>
<p>途中入園の場合、利用を希望する月の<span class="highlight">前月の10日</span>が申込締切です（休日の場合は直前の開庁日）。空き状況は「ふくおか保育所案内板（空きマップ）」で確認できます。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新の申込スケジュールは<a href="https://www.city.fukuoka.lg.jp/kodomo-mirai/hoiku/child/Index_R7.html" target="_blank" rel="noopener">福岡市公式サイト「保育施設等利用のご案内」</a>でご確認ください。</p>
</div>`,
    publishedAt: "2026-03-28",
  },
];

registerArticles(articles);
