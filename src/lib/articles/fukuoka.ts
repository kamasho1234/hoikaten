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
    popularity: 65,
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
    popularity: 100,
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
    popularity: 95,
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
    popularity: 85,
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
    popularity: 75,
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
    popularity: 50,
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
    popularity: 90,
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
    popularity: 60,
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
    popularity: 70,
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
    popularity: 55,
  },

  // ===== 園えらび (3) =====
  {
    slug: "nursery-visit-guide",
    citySlug: "fukuoka",
    title: "福岡市の保育園見学ガイド｜見るべきポイントと質問リスト",
    description:
      "福岡市で保育園見学をする際にチェックすべきポイントや、先生に聞くべき質問をリストにまとめました。",
    image:
      "https://images.unsplash.com/photo-1587654780860-5e6801e6e7f5?w=800&h=400&fit=crop",
    category: "園えらび",
    categoryColor: "purple",
    content: `<h2>保育園見学は必ず行こう</h2>
<p>福岡市には認可保育園・認定こども園・地域型保育事業など多様な保育施設があります。希望園を決める前に、<span class="highlight">実際に見学して園の雰囲気を確かめること</span>が大切です。見学は電話で予約するのが一般的です。</p>

<h2>見学で確認すべきポイント</h2>
<table>
<tr><th>チェック項目</th><th>見るべきこと</th></tr>
<tr><td>保育室の環境</td><td>清潔さ・採光・広さ・安全対策</td></tr>
<tr><td>園庭の有無</td><td>園庭がなければ代替の外遊び場があるか</td></tr>
<tr><td>先生の様子</td><td>子どもへの声かけが穏やかか、笑顔があるか</td></tr>
<tr><td>給食</td><td>自園調理か外注か、アレルギー対応の有無</td></tr>
<tr><td>お迎え時間</td><td>延長保育の時間帯と追加料金</td></tr>
<tr><td>持ち物</td><td>おむつ・布団の持参が必要か、手ぶら登園に対応しているか</td></tr>
</table>

<h2>先生に聞くべき質問リスト</h2>
<ul>
<li>慣らし保育の期間はどのくらいですか？</li>
<li>発熱時のお迎え基準は何度ですか？</li>
<li>保護者参加の行事はどのくらいの頻度ですか？</li>
<li>連絡帳はアプリですか、手書きですか？</li>
<li>昨年度の途中退園（転園）はありましたか？</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>福岡市は7区にまたがり、通勤経路上の園も希望に書けます。自宅の区だけでなく、隣接区の園も見学候補に入れましょう。</p>
</div>

<h2>見学のベストタイミング</h2>
<p>7月〜9月が見学シーズンです。福岡市の一次調整締切は11月上旬のため、<span class="highlight">10月までに見学を終えておく</span>のが理想です。見学が集中する時期は予約が取りにくいため、早めに電話しましょう。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>保育施設の一覧と所在地は<a href="https://kodomo-hoiku.city.fukuoka.lg.jp/search/" target="_blank" rel="noopener">ふくおか保育所案内板（空きマップ）</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 45,
  },
  {
    slug: "ninkagai-selection",
    citySlug: "fukuoka",
    title: "福岡市の認可外保育施設の賢い選び方｜チェックポイント7つ",
    description:
      "福岡市で認可外保育施設を選ぶ際に確認すべき7つのポイントを、こども未来局の公開情報をもとに解説します。",
    image:
      "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&h=400&fit=crop",
    category: "園えらび",
    categoryColor: "purple",
    content: `<h2>認可外保育施設を選ぶ7つのチェックポイント</h2>
<p>福岡市には多くの認可外保育施設（届出保育施設）があります。認可園の選考に漏れた場合の「つなぎ利用」としても、長期的な利用先としても、<span class="highlight">安全で信頼できる施設を選ぶこと</span>が最も大切です。</p>

<h3>1. 指導監督基準適合証明書の有無</h3>
<p>福岡市が立入調査を行い、基準を満たした施設には「指導監督基準を満たす旨の証明書」が交付されます。この証明書がある施設を優先的に選びましょう。</p>

<h3>2. 保育士の配置人数</h3>
<p>認可外でも、保育に従事する職員の3分の1以上が保育士資格を持っていることが基準です。実際の配置人数を見学時に確認しましょう。</p>

<h3>3. 安全対策</h3>
<p>午睡時のブレスチェック（呼吸確認）を行っているか、避難経路が確保されているかなど、安全面を重点的に確認してください。</p>

<h3>4. 保育料の総額</h3>
<p>基本保育料のほか、延長保育料・教材費・給食費など追加費用を含めた月額総額を事前に確認しましょう。</p>

<h3>5. 無償化の対象か</h3>
<p>「保育の必要性」の認定を受ければ、3〜5歳児は月額37,000円まで、0〜2歳児（住民税非課税世帯）は月額42,000円まで補助されます。</p>

<h3>6. 送迎のしやすさ</h3>
<p>福岡市は7区に広がるため、自宅や職場からの距離・駐車場の有無は重要な判断基準です。</p>

<h3>7. 契約内容の確認</h3>
<p>退園時の手続きや違約金の有無など、契約書の内容を入園前にしっかり確認しましょう。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>福岡市の認可外保育施設一覧に掲載されていない施設は、届出がされていない可能性があります。必ず一覧で確認してください。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>認可外保育施設の一覧は<a href="https://www.city.fukuoka.lg.jp/kodomo/shisetsu/hoikusyo/hoikusyo_list.htm" target="_blank" rel="noopener">福岡市公式サイト「認可外保育施設一覧」</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 40,
  },
  {
    slug: "small-nursery-guide",
    citySlug: "fukuoka",
    title: "福岡市の小規模保育事業ガイド｜0〜2歳児の穴場選択肢",
    description:
      "福岡市の小規模保育事業（地域型保育A・B・C型）の特徴やメリット・デメリット、連携施設の仕組みを解説します。",
    image:
      "https://images.unsplash.com/photo-1504711434969-e33886168d5c?w=800&h=400&fit=crop",
    category: "園えらび",
    categoryColor: "purple",
    content: `<h2>小規模保育事業とは</h2>
<p>小規模保育事業は、<span class="highlight">定員6〜19名</span>の少人数で0〜2歳児を保育する認可事業です。福岡市では地域型保育事業の一つとして位置づけられ、認可保育園と同じ利用調整の仕組みで入園が決まります。</p>

<h2>A型・B型・C型の違い</h2>
<table>
<tr><th>類型</th><th>職員の資格</th><th>定員</th></tr>
<tr><td>A型</td><td>全員が保育士</td><td>6〜19名</td></tr>
<tr><td>B型</td><td>2分の1以上が保育士</td><td>6〜19名</td></tr>
<tr><td>C型</td><td>家庭的保育者</td><td>6〜10名</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>福岡市ではA型が最も多く、保育の質の面でも安心感があります。見学時にどの類型か確認しましょう。</p>
</div>

<h2>小規模保育のメリット</h2>
<ul>
<li><strong>少人数でアットホーム</strong>：子ども一人ひとりに目が行き届きやすい</li>
<li><strong>競争率が低い傾向</strong>：認可保育園に比べて希望者が少なく、入りやすいケースがある</li>
<li><strong>認可施設なので保育料が同じ</strong>：認可保育園と同じ保育料体系</li>
</ul>

<h2>3歳の壁と連携施設</h2>
<p>小規模保育は2歳児クラスまでのため、3歳以降は別の保育施設に移る必要があります（いわゆる「3歳の壁」）。福岡市では、多くの小規模保育施設に<span class="highlight">連携施設</span>が設定されており、連携先への優先入園の仕組みがあります。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>連携施設が設定されていない小規模保育もあります。入園前に必ず「連携施設はどこですか」と確認し、3歳以降の見通しを立てておきましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>小規模保育事業の施設一覧は<a href="https://kodomo-hoiku.city.fukuoka.lg.jp/search/" target="_blank" rel="noopener">ふくおか保育所案内板（空きマップ）</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 50,
  },

  // ===== データ分析 (2) =====
  {
    slug: "zero-vs-one-year",
    citySlug: "fukuoka",
    title: "福岡市で0歳入園と1歳入園はどちらが有利？データで比較",
    description:
      "福岡市の保育園入園で0歳4月と1歳4月のどちらが入りやすいか、定員数や競争率の観点から分析します。",
    image:
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=400&fit=crop",
    category: "データ分析",
    categoryColor: "teal",
    content: `<h2>0歳入園と1歳入園、どちらが有利？</h2>
<p>福岡市で保活を始める多くの家庭が悩むのが、<span class="highlight">0歳4月入園と1歳4月入園のどちらを狙うか</span>という問題です。結論から言うと、一般的には0歳4月入園の方が入りやすい傾向にあります。</p>

<h2>なぜ0歳の方が入りやすいのか</h2>
<table>
<tr><th>比較項目</th><th>0歳4月</th><th>1歳4月</th></tr>
<tr><td>募集枠</td><td>新規クラスのため全枠が空き</td><td>0歳からの持ち上がりで残枠が少ない</td></tr>
<tr><td>申込者数</td><td>比較的少ない</td><td>育休終了組が集中し多い</td></tr>
<tr><td>競争率</td><td>低め</td><td>高め</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>1歳4月入園の枠は、0歳児クラスからの進級分を差し引いた「純増枠」のみです。例えば1歳児の定員が15名で、0歳児から10名が進級する場合、新規枠はわずか5名になります。</p>
</div>

<h2>0歳入園のメリット・デメリット</h2>
<h3>メリット</h3>
<ul>
<li>競争率が低く入園しやすい</li>
<li>早期復職で収入を確保できる</li>
<li>子どもが早くから集団生活に慣れる</li>
</ul>
<h3>デメリット</h3>
<ul>
<li>育休を短縮する必要がある（手当の減少）</li>
<li>生後数か月で預けることへの心理的負担</li>
<li>4月1日時点で生後57日を経過している必要がある（福岡市の多くの園）</li>
</ul>

<h2>1歳入園のメリット・デメリット</h2>
<h3>メリット</h3>
<ul>
<li>育児休業給付金を最大限受給できる</li>
<li>1年間じっくり子どもと過ごせる</li>
</ul>
<h3>デメリット</h3>
<ul>
<li>競争率が高く、不承諾のリスクがある</li>
<li>不承諾の場合、認可外利用や育休延長が必要になる</li>
</ul>

<h2>福岡市の区別傾向</h2>
<p>東区・早良区など子育て世帯が多いエリアでは、1歳4月入園の競争が特に激しくなります。これらのエリアでは0歳4月入園の方が圧倒的に有利です。一方、比較的余裕のある南区・城南区では、1歳4月でも入れる園が見つかることがあります。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>各施設の年齢別空き状況は<a href="https://kodomo-hoiku.city.fukuoka.lg.jp/search/" target="_blank" rel="noopener">ふくおか保育所案内板（空きマップ）</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 65,
  },
  {
    slug: "waiting-child-data",
    citySlug: "fukuoka",
    title: "福岡市の待機児童データを読み解く｜数字の裏にある実態",
    description:
      "福岡市の待機児童数の推移と、数字に表れない「隠れ待機児童」の実態をデータから分析します。",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "データ分析",
    categoryColor: "teal",
    content: `<h2>福岡市の待機児童数の推移</h2>
<p>福岡市は人口約160万人の政令指定都市であり、こども未来局が保育行政を所管しています。市は待機児童ゼロを達成していますが、<span class="highlight">数字だけでは見えない実態</span>があります。</p>

<h2>「待機児童」と「保留児童」の違い</h2>
<table>
<tr><th>区分</th><th>内容</th></tr>
<tr><td>待機児童</td><td>国の定義に基づき、認可保育施設に入れなかった児童（特定園のみ希望等を除く）</td></tr>
<tr><td>保留児童</td><td>認可保育施設に申込をしたが利用できていない児童の総数</td></tr>
</table>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>「待機児童ゼロ」でも「保留児童」は存在します。特定の園だけを希望して入れなかった場合や、認可外を利用中の場合は待機児童にカウントされません。</p>
</div>

<h2>エリア別の傾向</h2>
<p>福岡市は7区（東区・博多区・中央区・南区・城南区・早良区・西区）で構成され、区によって保育事情が大きく異なります。</p>
<ul>
<li><strong>東区</strong>：千早・香椎エリアの開発に伴い、保留児童が集中しやすい</li>
<li><strong>早良区</strong>：西新・室見エリアで0〜1歳児の需要が高い</li>
<li><strong>博多区・中央区</strong>：企業主導型保育施設が多く、受け皿が比較的充実</li>
<li><strong>南区・城南区・西区</strong>：比較的余裕があるが、人気園は競争あり</li>
</ul>

<h2>隠れ待機児童の実態</h2>
<p>以下のケースは待機児童の数字に含まれません。</p>
<ul>
<li>第1希望の園にのみ申込し、不承諾となった場合</li>
<li>認可外保育施設を利用しながら認可園の空きを待っている場合</li>
<li>育児休業を延長した場合</li>
<li>求職活動を休止した場合</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>保活では「待機児童ゼロ」の数字を鵜呑みにせず、希望する園の年齢別の空き状況を個別に確認することが重要です。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新の待機児童数・保留児童数は<a href="https://www.city.fukuoka.lg.jp/kodomo-mirai/hoiku/child/Index_R7.html" target="_blank" rel="noopener">福岡市公式サイト「保育施設等利用のご案内」</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 55,
  },

  // ===== 制度を知る (2) =====
  {
    slug: "single-parent-guide",
    citySlug: "fukuoka",
    title: "福岡市のひとり親世帯向け保活ガイド｜+75点の加点と支援制度",
    description:
      "福岡市でひとり親世帯が保育園入園で有利になる加点制度と、利用できる支援制度をまとめました。",
    image:
      "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=400&fit=crop",
    category: "制度を知る",
    categoryColor: "rose",
    content: `<h2>ひとり親世帯の調整点数</h2>
<p>福岡市の利用調整では、ひとり親世帯に<span class="highlight">+75点</span>の調整点数が加算されます。これはきょうだい同一施設（+70点）を上回る、最大級の加点です。</p>

<h2>ひとり親世帯の基本点数の考え方</h2>
<p>福岡市の基本点数は「父母の低い方」を採用するmin方式ですが、ひとり親世帯の場合はその保護者1名の基本点数がそのまま適用されます。</p>

<table>
<tr><th>勤務パターン</th><th>基本点数</th><th>調整点数</th><th>合計</th></tr>
<tr><td>フルタイム（月160時間以上）</td><td>150点</td><td>+75点</td><td>225点</td></tr>
<tr><td>月140時間以上</td><td>140点</td><td>+75点</td><td>215点</td></tr>
<tr><td>月120時間以上</td><td>130点</td><td>+75点</td><td>205点</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>ひとり親世帯でフルタイム勤務なら合計225点。共働き世帯のフルタイム150点を大きく上回り、入園はかなり有利です。</p>
</div>

<h2>ひとり親世帯が使える支援制度</h2>
<ul>
<li><strong>保育料の軽減</strong>：市民税非課税世帯の場合、0〜2歳児の保育料が無料</li>
<li><strong>児童扶養手当</strong>：所得に応じて月額10,740円〜45,500円を受給可能</li>
<li><strong>ひとり親家庭等医療費助成</strong>：医療費の自己負担が軽減される</li>
<li><strong>福岡市ひとり親家庭自立支援給付金</strong>：資格取得の際に給付金を受けられる</li>
</ul>

<h2>同点の場合もひとり親が優先</h2>
<p>利用調整点数が同点の場合、福岡市ではひとり親世帯が優先される傾向にあります。加点と優先順位の両面で有利に働きます。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>ひとり親の加点を受けるには、申込時に必要書類（戸籍謄本等）の提出が求められます。書類の不備で加点が認められないことがないよう、事前に区役所で確認しましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>ひとり親家庭への支援制度は<a href="https://hitorioyanavi.city.fukuoka.lg.jp/" target="_blank" rel="noopener">福岡市公式サイト「ひとり親家庭への支援」</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 50,
  },
  {
    slug: "futago-hokatsu",
    citySlug: "fukuoka",
    title: "福岡市で双子・多胎児の保活｜+50点の加点と同園入園のコツ",
    description:
      "福岡市で双子や三つ子を持つ家庭向けに、多胎児の加点制度と同じ園に入るための戦略を解説します。",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "制度を知る",
    categoryColor: "rose",
    content: `<h2>多胎児世帯への加点</h2>
<p>福岡市では、双子・三つ子などの多胎児が同時に保育施設の利用を申し込む場合、<span class="highlight">+50点</span>の調整点数が加算されます。これはきょうだい同時申込（+35点）よりも高い加点です。</p>

<h2>多胎児世帯の合計点数シミュレーション</h2>
<table>
<tr><th>パターン</th><th>基本点数</th><th>調整点数</th><th>合計</th></tr>
<tr><td>フルタイム共働き＋多胎児同時申込</td><td>150点</td><td>+50点</td><td>200点</td></tr>
<tr><td>フルタイム共働き＋多胎児＋育休明け復職</td><td>150点</td><td>+50点+15点</td><td>215点</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>多胎児の加点（+50点）ときょうだい同時申込（+35点）は、高い方のみが適用されます。つまり、多胎児で同時申込の場合は+50点です。</p>
</div>

<h2>同じ園に入るためのコツ</h2>
<ul>
<li><strong>希望園の書き方</strong>：同じ園を第1希望にして申込む。福岡市では多胎児が同時申込の場合、同一施設への入園が考慮されます</li>
<li><strong>定員に余裕のある園を選ぶ</strong>：0歳児クラスの定員が多い園は、2名以上の受入れ余地が大きい</li>
<li><strong>小規模保育も検討</strong>：認可保育園だけでなく、小規模保育事業も同時申込の対象です</li>
</ul>

<h2>多胎児世帯の負担軽減策</h2>
<p>福岡市では以下の負担軽減策が利用できます。</p>
<ul>
<li>第2子以降の保育料無償化（福岡市独自制度）</li>
<li>多胎児家庭への育児ヘルパー派遣</li>
<li>ファミリー・サポート・センターの利用</li>
</ul>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>多胎児であっても、別々の園に入園が決まるケースはあります。同じ園を強く希望する場合は、希望順位の書き方について事前にこども未来局や区役所に相談しましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>利用調整の詳細は<a href="https://www.city.fukuoka.lg.jp/kodomo-mirai/hoiku/child/Index_R7.html" target="_blank" rel="noopener">福岡市公式サイト「保育施設等利用のご案内」</a>でご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 35,
  },

  // ===== 保活の基本 (2) =====
  {
    slug: "ikukyu-timing",
    citySlug: "fukuoka",
    title: "福岡市の保活と育休のタイミング｜いつ復職するのがベスト？",
    description:
      "福岡市で保育園入園を成功させるための育休取得・復職タイミングの考え方を解説します。",
    image:
      "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>育休と保活のタイミングが重要</h2>
<p>福岡市の保育園入園で最も枠が多いのは<span class="highlight">4月入園</span>です。育休からの復職タイミングを4月に合わせることが、入園成功の基本戦略になります。</p>

<h2>出産月別の保活スケジュール</h2>
<table>
<tr><th>出産時期</th><th>0歳4月入園</th><th>1歳4月入園</th></tr>
<tr><td>4〜6月生まれ</td><td>生後10〜12か月で入園（現実的）</td><td>1歳10〜12か月で入園</td></tr>
<tr><td>7〜9月生まれ</td><td>生後7〜9か月で入園（現実的）</td><td>1歳7〜9か月で入園</td></tr>
<tr><td>10〜12月生まれ</td><td>生後4〜6か月で入園（やや早い）</td><td>1歳4〜6か月で入園</td></tr>
<tr><td>1〜3月生まれ</td><td>生後1〜3か月で入園（難しい）</td><td>1歳1〜3か月で入園（現実的）</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>1〜3月生まれの場合、0歳4月入園は月齢が低すぎて現実的ではありません。1歳4月入園を基本戦略にしつつ、競争率の高さに備えましょう。</p>
</div>

<h2>育休明け復職で+15点の加点</h2>
<p>福岡市では、育児休業から復職予定の場合に<span class="highlight">+15点</span>の調整点数が加算されます。この加点を受けるには、入園と同時に復職する予定であることを就労証明書で示す必要があります。</p>

<h2>育休延長という選択肢</h2>
<p>1歳4月入園で不承諾となった場合、育児休業を最大2歳まで延長できます。不承諾通知書が育休延長の根拠書類になるため、大切に保管してください。</p>

<h2>途中入園（5月〜3月）も視野に</h2>
<p>4月入園に間に合わない場合や不承諾の場合は、途中入園の申込を毎月行いましょう。福岡市では利用希望月の前月10日が締切です。転園や退園で空きが出ることがあります。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>入園申込の詳細は<a href="https://www.city.fukuoka.lg.jp/kodomo-mirai/hoiku/child/Index_R7.html" target="_blank" rel="noopener">福岡市公式サイト「保育施設等利用のご案内」</a>でご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 55,
  },
  {
    slug: "hoiku-mama-interview",
    citySlug: "fukuoka",
    title: "福岡市で保活を乗り越えた先輩ママの体験談｜成功のコツ3選",
    description:
      "福岡市で保活を経験した先輩ママたちの体験談をもとに、入園を勝ち取るための実践的なコツを紹介します。",
    image:
      "https://images.unsplash.com/photo-1587654780860-5e6801e6e7f5?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>体験談から学ぶ保活成功のコツ</h2>
<p>福岡市は人口約160万人の大都市で、7区それぞれに保育事情が異なります。実際に保活を経験した先輩ママたちの声から、<span class="highlight">成功のカギとなる3つのポイント</span>をまとめました。</p>

<h2>コツ1：希望園は10園以上書く</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>「行ける範囲の園は全て書く」が鉄則</strong>
<p>東区で保活をしたAさんは、通勤経路上の園を含めて12園を記入。第8希望の園で内定が出ました。「第3希望までしか書かない人もいますが、それだと不承諾のリスクが高い」と語ります。</p>
</div>
</div>

<h2>コツ2：見学で園の雰囲気を確かめる</h2>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>ネットの口コミだけでは分からない</strong>
<p>早良区で保活をしたBさんは、7園を見学。「ネットで評判が良くても、実際に行ったら雰囲気が合わないと感じた園もあった。逆に、あまり知られていない園が素晴らしかった」と振り返ります。</p>
</div>
</div>

<h2>コツ3：区役所の窓口で相談する</h2>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>担当者から「生きた情報」をもらう</strong>
<p>南区で保活をしたCさんは、区役所の子育て支援課に3回通いました。「昨年の倍率の傾向や、比較的空きが出やすい園の情報は窓口でしか聞けない。丁寧に教えてもらえた」とのことです。</p>
</div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>福岡市のこども未来局や各区の子育て支援課は、保活の相談に丁寧に対応してくれます。「こんなことを聞いていいのかな」と遠慮せず、積極的に窓口を活用しましょう。</p>
</div>

<h2>先輩ママが「やっておけばよかった」と後悔したこと</h2>
<ul>
<li>見学を9月以降に始めてしまい、予約が取れない園があった</li>
<li>就労証明書の依頼を勤務先にギリギリで頼み、間に合うか心配だった</li>
<li>認可外保育施設を全くリサーチしておらず、不承諾後に慌てた</li>
<li>きょうだい加点の仕組みを知らず、上の子と別の園を希望してしまった</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>保育施設の申込手続きについては<a href="https://www.city.fukuoka.lg.jp/kodomo-mirai/hoiku/child/Index_R7.html" target="_blank" rel="noopener">福岡市公式サイト「保育施設等利用のご案内」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 60,
  },

  // ===== 点数アップ (1) =====
  {
    slug: "secondchild-hokatsu",
    citySlug: "fukuoka",
    title: "福岡市の第2子保活｜きょうだい加点+70点を活かす戦略",
    description:
      "福岡市で第2子の保活をする際に活用すべき「きょうだい加点」の仕組みと、同じ園に入るための戦略を解説します。",
    image:
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>第2子保活はきょうだい加点が最大の武器</h2>
<p>福岡市の利用調整では、きょうだいに関する調整点数が非常に大きな加点となります。第2子の保活では、<span class="highlight">この加点を最大限に活かす戦略</span>が成功のカギです。</p>

<h2>きょうだい関連の調整点数</h2>
<table>
<tr><th>条件</th><th>調整点数</th></tr>
<tr><td>きょうだいが同一施設を利用中で、同じ施設を希望</td><td><span class="highlight">+70点</span></td></tr>
<tr><td>きょうだいが同時に利用を申込</td><td>+35点</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>上の子が通っている園を第2子の希望園に入れるだけで+70点。フルタイム共働き（基本点数150点）なら合計220点となり、入園の可能性が大幅に高まります。</p>
</div>

<h2>+70点を活かすための戦略</h2>

<h3>戦略1：上の子の園を必ず希望に入れる</h3>
<p>きょうだい同一施設の+70点は、<span class="highlight">上の子が在園中の施設を希望園として記入した場合のみ</span>適用されます。他の園が第1希望でも、上の子の園は必ず希望リストに入れましょう。</p>

<h3>戦略2：上の子の転園を慎重に考える</h3>
<p>上の子を別の園に転園させると、+70点の加点が使えなくなります。第2子の保活が終わるまで、上の子の転園は慎重に判断してください。</p>

<h3>戦略3：年齢差を考慮する</h3>
<p>上の子が卒園する年に第2子が入園する場合、「在園中のきょうだい」に該当するか確認が必要です。4月1日時点の在園状況で判定されるため、区役所に確認しましょう。</p>

<h2>第2子の保育料は無償</h2>
<p>福岡市では独自の制度として、第2子以降の保育料が無償化されています。所得制限はありません。認可保育施設だけでなく、認可外保育施設を利用する場合も対象です。</p>

<h2>第2子保活の注意点</h2>
<ul>
<li>上の子が小規模保育（0〜2歳）を卒園済みの場合、同一施設加点は使えない</li>
<li>きょうだい同一施設（+70点）ときょうだい同時申込（+35点）は併用不可。高い方のみ適用</li>
<li>上の子が認可外保育施設の場合、きょうだい同一施設の加点対象外</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>きょうだい加点の詳細は<a href="https://kodomo.city.fukuoka.lg.jp/wp-content/uploads/2025/09/d202ed28904cd28e882f6ee0ec68dba8.pdf" target="_blank" rel="noopener">福岡市保育施設等利用調整基準表（PDF）</a>でご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 55,
  },

  // ===== 就労形態 (3) =====
  {
    slug: "self-employed-score",
    citySlug: "fukuoka",
    title: "福岡市で自営業・フリーランスの保活｜点数の出し方と必要書類",
    description:
      "福岡市で自営業やフリーランスが保育園に申し込む際の点数の決まり方や必要書類を解説します。",
    image:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>自営業・フリーランスの基本点数</h2>
<p>福岡市では、自営業やフリーランスの方も会社員と同じ基準で基本点数が算出されます。<span class="highlight">月の就労時間</span>が判定基準です。</p>

<table>
<tr><th>月の就労時間</th><th>基本点数</th></tr>
<tr><td>160時間以上</td><td>150</td></tr>
<tr><td>140時間以上160時間未満</td><td>140</td></tr>
<tr><td>120時間以上140時間未満</td><td>130</td></tr>
<tr><td>100時間以上120時間未満</td><td>110</td></tr>
<tr><td>64時間以上100時間未満</td><td>70〜90</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>自営業の方は「就労証明書」の代わりに「自営業申告書」を提出します。就労時間を客観的に証明できる資料（確定申告書の控え、開業届の写し等）を添付すると審査がスムーズです。</p>
</div>

<h2>必要書類</h2>
<ul>
<li>自営業申告書（福岡市所定の様式）</li>
<li>開業届の写し、または確定申告書（第一表）の控え</li>
<li>業務内容がわかる資料（名刺、ホームページのコピーなど）</li>
</ul>

<h2>注意点</h2>
<p>開業届を出してすぐに「就労中」として認められるわけではありません。実際に稼働していることを示す実績が求められます。開業したばかりの場合は、区役所の子育て支援課に事前相談しましょう。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>申請に必要な書類一覧は<a href="https://www.city.fukuoka.lg.jp/kodomo-mirai/hoiku/child/Index_R7.html" target="_blank" rel="noopener">福岡市「保育施設等利用のご案内」</a>でご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 45,
  },
  {
    slug: "naishoku-score",
    citySlug: "fukuoka",
    title: "福岡市で内職・在宅ワークの場合の点数｜居宅外就労との違い",
    description:
      "福岡市で内職や在宅ワークをしている場合の入園点数の扱いと、居宅外就労との違いを解説します。",
    image:
      "https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>在宅ワークと居宅外就労の点数差</h2>
<p>福岡市の利用調整では、就労場所が<strong>居宅外</strong>か<strong>居宅内</strong>かで基本点数の扱いが変わる場合があります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>福岡市では居宅内就労（在宅ワーク）でも、就労時間が同じであれば基本点数は居宅外就労と同じ点数が適用されます。ただし、調整点数で差がつく場合があるため、最新の利用調整基準表で確認してください。</p>
</div>

<h2>在宅ワーク（居宅内就労）の証明方法</h2>
<ul>
<li>雇用契約がある場合：就労証明書に「在宅勤務」と記載してもらう</li>
<li>フリーランスの場合：自営業申告書＋業務委託契約書など</li>
<li>内職の場合：内職証明書または委託元からの証明</li>
</ul>

<h2>在宅ワークで注意すべき点</h2>
<p>在宅ワークの場合、「自宅にいるなら保育は不要では？」と思われがちですが、福岡市では在宅勤務でも保育の必要性は認められています。就労時間の実態を正確に申告することが大切です。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>就労証明書の記入方法については、お住まいの区役所子育て支援課にお問い合わせください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 35,
  },

  // ===== 保活の基本 (5) =====
  {
    slug: "kyushoku-hokatsu",
    citySlug: "fukuoka",
    title: "福岡市で求職中の保活｜点数は低い？入園を成功させるコツ",
    description:
      "福岡市で求職活動中に保育園に申し込む場合の点数や、入園を成功させるための戦略を解説します。",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>求職中の基本点数</h2>
<p>福岡市では、求職活動中も保育の必要性が認められますが、基本点数は就労中と比べて低く設定されています。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>求職活動の基本点数は<span class="highlight">50点</span>前後です。フルタイム就労の150点と比べると大きな差があるため、4月の一斉入所で人気園に内定するのは難しいのが実情です。</p>
</div>

<h2>求職中でも入園を成功させる戦略</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content"><strong>不人気園・小規模保育を狙う</strong><p>定員割れしている園や、駅から遠い園は求職中の点数でも入園できる可能性があります。</p></div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content"><strong>途中入園を狙う</strong><p>4月以降の途中入園は競争が緩やかになることがあります。毎月の空き状況をチェックしましょう。</p></div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content"><strong>認可外保育施設を利用して就職活動</strong><p>認可外施設に一時的に預けて就労実績を作り、次の4月入所に備える方法もあります。</p></div>
</div>

<h2>入園後の注意点</h2>
<p>求職中で入園した場合、入園後<strong>90日以内</strong>に就労を開始する必要があります。期限内に就労を開始できない場合は退園となる可能性があるため注意してください。詳しくはお住まいの区役所にご確認ください。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>求職活動中の申込みについては<a href="https://www.city.fukuoka.lg.jp/kodomo-mirai/hoiku/child/Index_R7.html" target="_blank" rel="noopener">福岡市「保育施設等利用のご案内」</a>でご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 40,
  },
  {
    slug: "tenshoku-timing",
    citySlug: "fukuoka",
    title: "福岡市で転職と保活を両立する方法｜点数への影響と注意点",
    description:
      "福岡市で保活中や入園後に転職する場合の点数への影響、必要な手続きを解説します。",
    image:
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>転職が点数に与える影響</h2>
<p>保活中に転職すると、就労状況が変わるため基本点数に影響する場合があります。</p>

<h3>転職前後で注意すべき点</h3>
<ul>
<li><strong>就労時間が減る場合</strong>：基本点数が下がる可能性あり</li>
<li><strong>就労時間が増える場合</strong>：基本点数が上がる可能性あり</li>
<li><strong>転職活動中の空白期間</strong>：「求職中」扱いとなり、点数が大幅に下がるリスクあり</li>
</ul>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>入園申込後〜入園までの間に転職する場合、新しい就労証明書の提出が必要です。提出が遅れると内定取消になる場合もあります。</p>
</div>

<h2>ベストな転職タイミング</h2>
<div class="point-box">
<p><strong>ポイント</strong></p>
<p>保活への影響を最小限にするなら、<span class="highlight">入園が確定した後（4月以降）に転職する</span>のが安全です。就労証明書は入園時点の勤務先で発行してもらい、入園後に転職するのが理想です。</p>
</div>

<h2>入園後の転職手続き</h2>
<p>入園後に転職した場合は、速やかに新しい就労証明書を区役所に提出する必要があります。就労時間が月64時間を下回ると保育の必要性が認められなくなる可能性があるため、転職先の勤務条件に注意してください。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>入園後の変更届については、お住まいの区役所子育て支援課にお問い合わせください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 35,
  },
  {
    slug: "age2-nyuen",
    citySlug: "fukuoka",
    title: "福岡市の2歳児入園｜小規模保育卒園後の受け皿と点数",
    description:
      "福岡市で2歳児クラスから入園する方法と、小規模保育卒園後の連携施設・卒園加点について解説します。",
    image:
      "https://images.unsplash.com/photo-1587654780291-39c9404d7dd0?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>2歳児クラスの入園状況</h2>
<p>福岡市の2歳児クラスは、0・1歳からの持ち上がりで枠が埋まっていることが多く、新規入園は狭き門です。ただし、小規模保育事業の卒園児には<span class="highlight">卒園加点</span>が設けられています。</p>

<h2>小規模保育の卒園加点</h2>
<div class="point-box">
<p><strong>ポイント</strong></p>
<p>小規模保育事業（0〜2歳）を卒園する児童が3歳児クラス（年少）に申し込む場合、調整点数で加点があります。連携施設への申込みではさらに優先されます。詳しくはお住まいの区役所にご確認ください。</p>
</div>

<h2>2歳児入園の戦略</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content"><strong>小規模保育を経由する</strong><p>0〜1歳で小規模保育に入園し、卒園加点を活用して3歳児クラスで認可園に転園する「2段階方式」が有効です。</p></div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content"><strong>連携施設を確認する</strong><p>小規模保育事業には「連携施設」が設定されていることがあります。連携施設への転園は優先的に調整されます。</p></div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content"><strong>認定こども園も視野に</strong><p>認定こども園の2号認定枠（3歳以上）は定員が比較的多く、小規模保育卒園後の受け皿として有力です。</p></div>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>小規模保育の連携施設一覧は<a href="https://www.city.fukuoka.lg.jp/kodomo-mirai/hoiku/child/Index_R7.html" target="_blank" rel="noopener">福岡市「保育施設等利用のご案内」</a>に掲載されています。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 40,
  },
  {
    slug: "age3-ikou",
    citySlug: "fukuoka",
    title: "福岡市の3歳の壁｜小規模保育からの転園を成功させるには",
    description:
      "福岡市で小規模保育を卒園した後、3歳児クラスへの転園を成功させるための準備と戦略を解説します。",
    image:
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>「3歳の壁」とは</h2>
<p>小規模保育事業は0〜2歳児が対象のため、3歳になると卒園し、新たな預け先を探す必要があります。これが<span class="highlight">「3歳の壁」</span>と呼ばれる問題です。</p>

<h2>福岡市の3歳の壁対策</h2>
<p>福岡市では小規模保育の卒園児に対していくつかの支援策を設けています。</p>
<ul>
<li><strong>連携施設制度</strong>：小規模保育事業に連携施設（認可園等）が設定されており、卒園児は優先的に受け入れられます</li>
<li><strong>卒園加点</strong>：連携施設以外への申込みでも、利用調整で加点があります</li>
<li><strong>認定こども園の活用</strong>：3歳児以上の定員が多い認定こども園も受け皿として機能しています</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>小規模保育に入園する段階で、連携施設がどの園に設定されているかを必ず確認しましょう。連携施設がない、または希望に合わない場合は、卒園加点を活用した他園への申込みを早めに計画してください。</p>
</div>

<h2>3歳の壁を乗り越えるスケジュール</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content"><strong>入園前（0〜1歳）</strong><p>小規模保育を選ぶ際に連携施設を確認する</p></div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content"><strong>2歳児クラス在園中（秋頃）</strong><p>翌年度4月入所の申込みで連携施設・希望園を記入する</p></div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content"><strong>結果発表後</strong><p>内定が出なかった場合は二次募集に申込み、並行して認可外も検討する</p></div>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>連携施設の情報は各小規模保育事業所、または<a href="https://www.city.fukuoka.lg.jp/kodomo-mirai/hoiku/child/Index_R7.html" target="_blank" rel="noopener">福岡市「保育施設等利用のご案内」</a>でご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 40,
  },
  {
    slug: "nyuyoji-age0",
    citySlug: "fukuoka",
    title: "福岡市の0歳児入園｜生後何か月から？メリットとデメリット",
    description:
      "福岡市で0歳児クラスに入園するための条件や、0歳入園のメリット・デメリットを解説します。",
    image:
      "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>0歳児入園の条件</h2>
<p>福岡市の認可保育園では、<span class="highlight">生後57日（生後2か月）</span>から受入れ可能な園があります。ただし、園によって受入開始月齢が異なるため、必ず希望する園の受入月齢を確認してください。</p>

<h2>0歳児入園のメリット</h2>
<ul>
<li><strong>定員枠が多い</strong>：0歳児クラスは全員が新規入園のため、定員＝募集枠です</li>
<li><strong>1歳より競争が緩やか</strong>：1歳児クラスは持ち上がりがあるため募集枠が少なく、0歳の方が入りやすい傾向があります</li>
<li><strong>育休復帰の加点が使える</strong>：育休明けの復職予定として+15点の加点が得られます</li>
</ul>

<h2>0歳児入園のデメリット</h2>
<ul>
<li><strong>育休を短縮する必要がある</strong>：4月入園の場合、生後数か月で預けることになります</li>
<li><strong>体調を崩しやすい</strong>：集団生活で感染症にかかりやすく、慣らし保育にも時間がかかります</li>
<li><strong>持ち物の準備が多い</strong>：ミルク・離乳食対応など、0歳児特有の準備が必要です</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>福岡市では0歳児クラスの定員は園によって6〜15名程度と幅があります。定員が多い園を選ぶと入園の可能性が高まります。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>各園の受入月齢・定員は<a href="https://www.city.fukuoka.lg.jp/kodomo-mirai/hoiku/child/Index_R7.html" target="_blank" rel="noopener">福岡市「保育施設等利用のご案内」</a>でご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 45,
  },

  // ===== 園えらび (3) =====
  {
    slug: "nintei-kodomoen",
    citySlug: "fukuoka",
    title: "福岡市の認定こども園ガイド｜保育園との違いと選び方",
    description:
      "福岡市の認定こども園の特徴、保育園・幼稚園との違い、入園手続きの流れを解説します。",
    image:
      "https://images.unsplash.com/photo-1576495169037-3867b0cb0d46?w=800&h=400&fit=crop",
    category: "園えらび",
    categoryColor: "purple",
    content: `<h2>認定こども園とは</h2>
<p>認定こども園は、<strong>保育園と幼稚園の機能を一体化</strong>した施設です。保育を必要とする子ども（2号・3号認定）も、教育を希望する子ども（1号認定）も同じ施設で過ごせます。</p>

<h2>保育園との違い</h2>
<table>
<tr><th>項目</th><th>認可保育園</th><th>認定こども園</th></tr>
<tr><td>対象年齢</td><td>0〜5歳</td><td>0〜5歳</td></tr>
<tr><td>利用できる認定</td><td>2号・3号のみ</td><td>1号・2号・3号</td></tr>
<tr><td>教育カリキュラム</td><td>園による</td><td>幼稚園教育要領に基づく教育あり</td></tr>
<tr><td>保護者の就労要件</td><td>必要</td><td>1号認定は不要</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>福岡市内の認定こども園は年々増加しています。2号・3号認定（保育を必要とする子ども）の入園は、認可保育園と同じ利用調整の対象です。認定こども園だから入りやすい・入りにくいということはありません。</p>
</div>

<h2>認定こども園のメリット</h2>
<ul>
<li>就労状況が変わっても退園不要（2号→1号に変更可能な園もある）</li>
<li>教育的なカリキュラムが充実している園が多い</li>
<li>3歳以上の定員が多く、小規模保育卒園後の受け皿として有力</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>福岡市内の認定こども園の一覧は<a href="https://www.city.fukuoka.lg.jp/kodomo-mirai/hoiku/child/Index_R7.html" target="_blank" rel="noopener">福岡市「保育施設等利用のご案内」</a>に掲載されています。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 35,
  },
  {
    slug: "kigyou-shudogata",
    citySlug: "fukuoka",
    title: "福岡市の企業主導型保育園｜認可外だけど使えるメリットとは",
    description:
      "福岡市の企業主導型保育園の特徴、認可保育園との違い、保活における活用法を解説します。",
    image:
      "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?w=800&h=400&fit=crop",
    category: "園えらび",
    categoryColor: "purple",
    content: `<h2>企業主導型保育園とは</h2>
<p>企業主導型保育園は、企業が従業員の子どもを預けるために設置した保育施設です。<span class="highlight">認可外</span>ですが、国から運営費の助成を受けているため、認可保育園並みの保育料で利用できることが多いです。</p>

<h2>企業主導型保育園のメリット</h2>
<ul>
<li><strong>利用調整なし</strong>：園との直接契約のため、点数に関係なく入園できる</li>
<li><strong>保育料が安い</strong>：国の助成があり、認可外の一般的な保育施設より低額</li>
<li><strong>柔軟な受入れ</strong>：企業の従業員枠と地域枠があり、地域枠なら誰でも申し込める</li>
</ul>

<h2>注意点</h2>
<ul>
<li>地域枠には定員の上限（定員の50%以内）がある</li>
<li>園によって保育の質にばらつきがある</li>
<li>無償化の対象になるには保育の必要性の認定（施設等利用給付認定）が必要</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>認可保育園の選考に落ちた場合の「つなぎ」として企業主導型保育園を利用し、翌年度に認可保育園への転園を目指す保護者も多いです。福岡市内にも多数の企業主導型保育園があるので、選択肢として覚えておきましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>企業主導型保育園の検索は<a href="https://www.kigyounaihoiku.jp/" target="_blank" rel="noopener">企業主導型保育事業ポータルサイト</a>で行えます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 30,
  },
  {
    slug: "yakan-hoiku",
    citySlug: "fukuoka",
    title: "福岡市の夜間保育・延長保育ガイド｜対応園と利用条件",
    description:
      "福岡市で夜間保育や延長保育を利用する方法、対応している園の探し方を解説します。",
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=400&fit=crop",
    category: "園えらび",
    categoryColor: "purple",
    content: `<h2>夜間保育とは</h2>
<p>夜間保育は、おおむね<strong>午後6時以降</strong>も保育を行う施設です。夜勤やシフト勤務の保護者にとって重要な選択肢です。</p>

<h2>延長保育について</h2>
<p>福岡市の多くの認可保育園では延長保育を実施しています。通常の保育時間（標準時間認定で最大11時間）を超えて預ける場合に利用できます。</p>

<table>
<tr><th>認定区分</th><th>保育時間</th><th>延長保育</th></tr>
<tr><td>保育標準時間</td><td>最大11時間</td><td>11時間を超える部分が延長保育</td></tr>
<tr><td>保育短時間</td><td>最大8時間</td><td>8時間を超える部分が延長保育</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>延長保育の利用料は園によって異なります。月額制の園と、日額制の園があるので、見学時に確認しましょう。</p>
</div>

<h2>夜間保育園の探し方</h2>
<p>福岡市内の夜間保育対応園は限られています。お住まいの区役所子育て支援課に問い合わせるか、福岡市の保育施設一覧で「夜間保育」の対応状況を確認してください。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>延長保育・夜間保育の実施状況は<a href="https://www.city.fukuoka.lg.jp/kodomo-mirai/hoiku/child/Index_R7.html" target="_blank" rel="noopener">福岡市「保育施設等利用のご案内」</a>でご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 25,
  },

  // ===== 制度を知る (5) =====
  {
    slug: "mushoka-seido",
    citySlug: "fukuoka",
    title: "福岡市の保育料無償化｜対象範囲と手続きをわかりやすく解説",
    description:
      "福岡市の幼児教育・保育の無償化制度について、対象年齢や施設、手続き方法を解説します。",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "制度を知る",
    categoryColor: "rose",
    content: `<h2>保育料無償化とは</h2>
<p>2019年10月から始まった幼児教育・保育の無償化により、一定の条件を満たす子どもの保育料が無料になりました。</p>

<h2>無償化の対象</h2>
<table>
<tr><th>対象</th><th>無償化の内容</th></tr>
<tr><td>3〜5歳児クラス（全世帯）</td><td>認可保育園・認定こども園・幼稚園の保育料が無料</td></tr>
<tr><td>0〜2歳児クラス（住民税非課税世帯）</td><td>認可保育園の保育料が無料</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>福岡市の独自制度として、<span class="highlight">第2子以降の保育料は年齢・所得制限なく無償</span>です（認可・認可外ともに対象）。これは全国的にも手厚い制度です。</p>
</div>

<h2>無償化の対象外</h2>
<p>以下の費用は無償化の対象外です。</p>
<ul>
<li>給食費（主食費・副食費）</li>
<li>延長保育料</li>
<li>通園バス代</li>
<li>行事費、教材費など</li>
</ul>

<h2>認可外保育施設の無償化</h2>
<p>認可外保育施設を利用する場合、「施設等利用給付認定（新2号・新3号）」を受ければ、月額37,000円（3〜5歳児）または42,000円（0〜2歳住民税非課税世帯）を上限に無償化されます。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>無償化の手続きについては<a href="https://www.city.fukuoka.lg.jp/kodomo-mirai/hoiku/child/Index_R7.html" target="_blank" rel="noopener">福岡市「保育施設等利用のご案内」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 50,
  },
  {
    slug: "shokuhi-jippi",
    citySlug: "fukuoka",
    title: "福岡市の保育園の給食費｜実費負担の目安と免除条件",
    description:
      "福岡市の保育園で実費負担となる給食費（主食費・副食費）の金額の目安と免除条件を解説します。",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=400&fit=crop",
    category: "制度を知る",
    categoryColor: "rose",
    content: `<h2>給食費は実費負担</h2>
<p>保育料が無償化された3〜5歳児クラスでも、<span class="highlight">給食費（主食費＋副食費）は実費負担</span>です。園によって金額は異なりますが、月額4,500〜7,000円程度が目安です。</p>

<h2>主食費と副食費の内訳</h2>
<table>
<tr><th>項目</th><th>内容</th><th>月額目安</th></tr>
<tr><td>主食費</td><td>ごはん・パンなどの主食</td><td>1,000〜2,000円程度</td></tr>
<tr><td>副食費</td><td>おかず・おやつ</td><td>3,500〜5,000円程度</td></tr>
</table>

<h2>副食費の免除条件</h2>
<p>以下の条件に該当する場合、副食費が免除されます。</p>
<ul>
<li>年収360万円未満相当世帯の子ども</li>
<li>第3子以降の子ども（一定の条件あり）</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>副食費の免除対象かどうかは市町村民税の所得割額で判定されます。該当するかわからない場合は、お住まいの区役所にご確認ください。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>給食費の取扱いについては、各保育園に直接お問い合わせいただくか、<a href="https://www.city.fukuoka.lg.jp/kodomo-mirai/hoiku/child/Index_R7.html" target="_blank" rel="noopener">福岡市「保育施設等利用のご案内」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 30,
  },
  {
    slug: "hoikuryo-keisan",
    citySlug: "fukuoka",
    title: "福岡市の保育料計算【令和8年度版】年収別シミュレーション・早見表",
    description:
      "福岡市の認可保育園の保育料を年収・子ども数別に詳しく解説。市民税所得割額に基づく階層区分早見表、無償化（3歳〜）の対象確認、副食費・第2子以降の減免制度まで網羅。令和8年度対応。",
    image:
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6e?w=800&h=400&fit=crop",
    category: "制度を知る",
    categoryColor: "rose",
    content: `<h2>保育料の決まり方</h2>
<p>福岡市の認可保育園の保育料は、<span class="highlight">世帯の市町村民税の所得割額</span>に基づいて決定されます。</p>

<div class="step">
<div class="step-num">1</div>
<div class="step-content"><strong>市町村民税の所得割額を確認</strong><p>毎年6月頃に届く「市民税・県民税の決定通知書」で確認できます。</p></div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content"><strong>保育料表で階層を確認</strong><p>福岡市が公開する保育料表に所得割額の階層と保育料が記載されています。</p></div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content"><strong>子どもの年齢で保育料が変わる</strong><p>3歳未満児は3歳以上児より保育料が高く設定されています（ただし3歳以上は無償化）。</p></div>
</div>

<h2>保育料の目安</h2>
<p>福岡市の0〜2歳児クラスの保育料は、住民税非課税世帯で0円、最高階層で月額55,000円程度です。ただし、福岡市独自の制度として<span class="highlight">第2子以降は保育料が無償</span>です。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>保育料は毎年9月に切り替わります（4〜8月は前年度分、9〜3月は当年度分の税額で算定）。年度途中で保育料が変わることがあるので注意してください。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>保育料の階層表は<a href="https://www.city.fukuoka.lg.jp/kodomo-mirai/hoiku/child/Index_R7.html" target="_blank" rel="noopener">福岡市「保育施設等利用のご案内」</a>に掲載されています。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 45,
  },
  {
    slug: "zeikin-koujo",
    citySlug: "fukuoka",
    title: "福岡市の保育料に影響する税額控除｜ふるさと納税・住宅ローン控除",
    description:
      "福岡市の保育料算定に影響する税額控除の仕組みと、ふるさと納税や住宅ローン控除が保育料に与える効果を解説します。",
    image:
      "https://images.unsplash.com/photo-1554224154-22dec7ec8818?w=800&h=400&fit=crop",
    category: "制度を知る",
    categoryColor: "rose",
    content: `<h2>保育料の算定基準</h2>
<p>福岡市の保育料は<strong>市町村民税の所得割額</strong>で決まります。この所得割額に影響する税額控除を活用することで、保育料が下がる場合があります。</p>

<h2>保育料に影響する主な控除</h2>
<table>
<tr><th>控除の種類</th><th>保育料への影響</th></tr>
<tr><td>住宅ローン控除（住民税分）</td><td>所得割額が減るため保育料が下がる場合あり</td></tr>
<tr><td>ふるさと納税</td><td>住民税の税額控除で所得割額が減る場合あり</td></tr>
<tr><td>医療費控除</td><td>所得控除で課税所得が減るため影響あり</td></tr>
<tr><td>iDeCo（個人型確定拠出年金）</td><td>所得控除で課税所得が減るため影響あり</td></tr>
</table>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>ふるさと納税の保育料への影響は自治体によって計算方法が異なります。福岡市の具体的な取扱いについてはお住まいの区役所にご確認ください。一般的に、ふるさと納税による住民税の税額控除分は保育料算定の所得割額に反映されない場合があります。</p>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>住宅ローン控除は比較的確実に保育料を下げる効果があります。住宅購入と保活のタイミングが重なる方は、税額控除の効果を含めて試算してみましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>保育料の算定方法の詳細はお住まいの区役所子育て支援課にお問い合わせください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 30,
  },
  {
    slug: "shurou-shoumeisho",
    citySlug: "fukuoka",
    title: "福岡市の就労証明書の書き方｜記入例と注意点まとめ",
    description:
      "福岡市の保育園入園申込みに必要な就労証明書の書き方、よくある記入ミスと対策を解説します。",
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop",
    category: "制度を知る",
    categoryColor: "rose",
    content: `<h2>就労証明書とは</h2>
<p>就労証明書は、保護者が「保育を必要とする事由」を証明するための書類です。<span class="highlight">勤務先に記入・証明してもらう</span>必要があります。</p>

<h2>就労証明書の主な記入項目</h2>
<ul>
<li>勤務先の名称・所在地・連絡先</li>
<li>雇用形態（正社員・パート・派遣等）</li>
<li>就労日数・就労時間（月の勤務時間が基本点数に直結）</li>
<li>就労開始日</li>
<li>育児休業の取得状況・復職予定日</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>就労証明書の「月の就労時間」が基本点数を決定します。<span class="highlight">160時間以上で最高の150点</span>です。残業時間は含まれないため、契約上の就労時間を正確に記入してもらいましょう。</p>
</div>

<h2>よくある記入ミスと対策</h2>
<table>
<tr><th>ミスの内容</th><th>影響</th><th>対策</th></tr>
<tr><td>月の就労時間の計算間違い</td><td>基本点数が変わる</td><td>1週間の就労時間×4.3週で計算</td></tr>
<tr><td>復職予定日の未記入</td><td>育休復職の加点が得られない</td><td>復職予定日を必ず記入</td></tr>
<tr><td>勤務先の押印漏れ</td><td>書類不備で受付不可</td><td>提出前に押印を確認</td></tr>
</table>

<h2>提出期限に余裕を持とう</h2>
<p>就労証明書は勤務先に依頼してから受け取るまで1〜2週間かかることがあります。申込期限の1か月前には依頼しましょう。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>就労証明書の様式は<a href="https://www.city.fukuoka.lg.jp/kodomo-mirai/hoiku/child/Index_R7.html" target="_blank" rel="noopener">福岡市「保育施設等利用のご案内」</a>からダウンロードできます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 40,
  },

  // ===== 申込・手続き (5) =====
  {
    slug: "shinsei-shorui-list",
    citySlug: "fukuoka",
    title: "福岡市の保育園申込み｜必要書類チェックリスト",
    description:
      "福岡市の保育園入園申込みに必要な書類を一覧にまとめました。書類不備を防ぐためのチェックリストです。",
    image:
      "https://images.unsplash.com/photo-1568667256549-094345857637?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>申込みに必要な書類</h2>
<p>福岡市の保育園入園申込みには以下の書類が必要です。世帯の状況によって追加書類が必要になる場合があります。</p>

<h3>全員が提出する書類</h3>
<ul>
<li>保育施設等利用申込書（教育・保育給付認定申請書兼）</li>
<li>就労証明書（父母それぞれ）</li>
<li>マイナンバーがわかる書類</li>
<li>本人確認書類</li>
</ul>

<h3>該当する場合のみ追加で必要な書類</h3>
<table>
<tr><th>状況</th><th>追加書類</th></tr>
<tr><td>自営業・フリーランス</td><td>自営業申告書、開業届の写し等</td></tr>
<tr><td>求職中</td><td>求職活動申告書</td></tr>
<tr><td>ひとり親世帯</td><td>ひとり親であることを証明する書類</td></tr>
<tr><td>障がいのある子ども</td><td>障害者手帳の写し等</td></tr>
<tr><td>育休中</td><td>育児休業取得確認書</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>書類不備があると受付が遅れ、選考に影響する場合があります。提出前に区役所の窓口で事前確認することをおすすめします。</p>
</div>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>必要書類は年度によって変更される場合があります。必ず最新の利用案内で確認してください。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新の必要書類一覧は<a href="https://www.city.fukuoka.lg.jp/kodomo-mirai/hoiku/child/Index_R7.html" target="_blank" rel="noopener">福岡市「保育施設等利用のご案内」</a>でご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 50,
  },
  {
    slug: "niji-shinsei-flow",
    citySlug: "fukuoka",
    title: "福岡市の二次募集・追加募集の流れ｜一次で落ちても諦めない",
    description:
      "福岡市の保育園二次募集・追加募集のスケジュール、申込方法、内定の可能性について解説します。",
    image:
      "https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>二次募集とは</h2>
<p>一次利用調整で定員に達しなかった園や、内定辞退で空きが出た園について行われる追加の募集です。</p>

<h2>二次募集のスケジュール（目安）</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content"><strong>1月下旬〜2月上旬</strong><p>一次利用調整の結果通知</p></div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content"><strong>2月中旬</strong><p>二次募集の空き状況が公開される</p></div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content"><strong>2月下旬</strong><p>二次募集の申込期限</p></div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content"><strong>3月上旬</strong><p>二次利用調整の結果通知</p></div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>二次募集は一次で不人気だった園が中心ですが、内定辞退で人気園に空きが出ることもあります。二次募集の空き状況は必ず確認しましょう。</p>
</div>

<h2>一次で落ちた場合の対応</h2>
<ul>
<li>二次募集に申込む（希望園の変更可能）</li>
<li>認可外保育施設に申込む</li>
<li>企業主導型保育園を検討する</li>
<li>育休の延長を検討する</li>
</ul>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>上記のスケジュールは目安です。正確な日程は年度によって異なりますので、最新の案内で確認してください。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>二次募集の情報は<a href="https://www.city.fukuoka.lg.jp/kodomo-mirai/hoiku/child/Index_R7.html" target="_blank" rel="noopener">福岡市「保育施設等利用のご案内」</a>で公開されます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 45,
  },
  {
    slug: "tenkyo-hokatsu",
    citySlug: "fukuoka",
    title: "福岡市に転居予定の方の保活｜市外からの申込み手続き",
    description:
      "福岡市に引越し予定の方が保育園に申し込む方法、広域利用の手続き、転居のベストタイミングを解説します。",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>市外からの申込み方法</h2>
<p>福岡市外に住んでいて、福岡市内の保育園に入園を希望する場合は<strong>「広域利用」</strong>の手続きが必要です。</p>

<div class="step">
<div class="step-num">1</div>
<div class="step-content"><strong>現住所の自治体に相談</strong><p>まず、現在お住まいの自治体の保育課で福岡市への広域利用申込みについて相談します。</p></div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content"><strong>現住所の自治体経由で申込み</strong><p>申込書は現住所の自治体に提出し、自治体間で書類のやりとりが行われます。</p></div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content"><strong>転居の確約が必要</strong><p>入園月までに福岡市に転入することを証明する書類（売買契約書、賃貸契約書等）の提出が必要です。</p></div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>広域利用の申込締切は福岡市の通常の締切よりも早い場合があります。転居が決まったら早めに動きましょう。</p>
</div>

<h2>転居のベストタイミング</h2>
<p>4月入園を目指すなら、<span class="highlight">申込期限（10〜11月頃）までに転居先の契約を済ませておく</span>のが理想です。転居後に改めて福岡市内から直接申し込むこともできますが、スケジュールがタイトになります。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>広域利用の手続きについては、お住まいの自治体の保育課および福岡市のこども未来局にお問い合わせください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 30,
  },
  {
    slug: "kyoiku-hoiku-chigai",
    citySlug: "fukuoka",
    title: "福岡市の1号・2号・3号認定の違い｜保育認定の基礎知識",
    description:
      "福岡市の保育園入園に必要な「保育認定」（1号・2号・3号）の違いと、認定の受け方を解説します。",
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=400&fit=crop",
    category: "制度を知る",
    categoryColor: "rose",
    content: `<h2>保育認定（支給認定）とは</h2>
<p>保育園や幼稚園を利用するには、市から<strong>「支給認定」</strong>を受ける必要があります。認定区分は以下の3つです。</p>

<table>
<tr><th>認定区分</th><th>対象年齢</th><th>利用できる施設</th><th>保育の必要性</th></tr>
<tr><td>1号認定</td><td>3〜5歳</td><td>幼稚園・認定こども園（教育部分）</td><td>不要</td></tr>
<tr><td>2号認定</td><td>3〜5歳</td><td>保育園・認定こども園（保育部分）</td><td>必要</td></tr>
<tr><td>3号認定</td><td>0〜2歳</td><td>保育園・認定こども園・小規模保育等</td><td>必要</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>認可保育園に入園するには<span class="highlight">2号または3号認定</span>が必要です。「保育の必要性」とは、就労・妊娠出産・疾病・介護・求職活動などの事由を指します。</p>
</div>

<h2>認定の申請方法</h2>
<p>保育園の入園申込みと同時に、支給認定の申請を行います。別途手続きは不要で、入園申込書が認定申請を兼ねています。</p>

<h2>保育標準時間と保育短時間</h2>
<p>2号・3号認定の場合、さらに「保育標準時間」と「保育短時間」に分かれます。</p>
<table>
<tr><th>区分</th><th>月の就労時間</th><th>利用可能時間</th></tr>
<tr><td>保育標準時間</td><td>120時間以上</td><td>最大11時間</td></tr>
<tr><td>保育短時間</td><td>64時間以上120時間未満</td><td>最大8時間</td></tr>
</table>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>支給認定の詳細は<a href="https://www.city.fukuoka.lg.jp/kodomo-mirai/hoiku/child/Index_R7.html" target="_blank" rel="noopener">福岡市「保育施設等利用のご案内」</a>でご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 40,
  },
  {
    slug: "hokatsu-calendar",
    citySlug: "fukuoka",
    title: "福岡市の保活カレンダー｜申込みから入園までのスケジュール",
    description:
      "福岡市の保育園入園に向けた年間スケジュールを月別にまとめました。いつ何をすべきかが一目でわかります。",
    image:
      "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>保活カレンダー（4月入園の場合）</h2>
<p>福岡市で翌年4月の入園を目指す場合のスケジュールです。</p>

<div class="step">
<div class="step-num">1</div>
<div class="step-content"><strong>4〜6月：情報収集</strong><p>保育施設の種類・申込みの流れを把握する。前年度の利用調整結果（内定点数）を確認する。</p></div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content"><strong>7〜9月：園見学</strong><p>希望する園の見学を予約・実施する。9月頃に翌年度の利用案内が公開される。</p></div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content"><strong>10〜11月：申込み</strong><p>一次利用調整の申込期間。就労証明書などの書類を準備して区役所に提出する。</p></div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content"><strong>1月下旬〜2月：結果通知</strong><p>一次利用調整の結果が届く。不承諾の場合は二次募集に備える。</p></div>
</div>
<div class="step">
<div class="step-num">5</div>
<div class="step-content"><strong>2〜3月：入園準備</strong><p>内定園の説明会に参加、必要な持ち物を準備する。</p></div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>園見学は夏場に集中しがちです。人気園は見学予約が取りにくくなるため、<span class="highlight">7月上旬までに電話予約</span>を始めると安心です。</p>
</div>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>上記スケジュールは目安です。正確な日程は年度ごとに異なりますので、福岡市の最新の案内で確認してください。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新の申込みスケジュールは<a href="https://www.city.fukuoka.lg.jp/kodomo-mirai/hoiku/child/Index_R7.html" target="_blank" rel="noopener">福岡市「保育施設等利用のご案内」</a>でご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 55,
  },

  // ===== データ分析 (3) =====
  {
    slug: "souba-tensuu",
    citySlug: "fukuoka",
    title: "福岡市の入園ボーダー点数｜区・年齢別の内定相場まとめ",
    description:
      "福岡市の保育園入園に必要なボーダーライン（内定最低点数）を区別・年齢別に解説します。",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop",
    category: "データ分析",
    categoryColor: "teal",
    content: `<h2>入園ボーダー点数とは</h2>
<p>入園ボーダー点数とは、各園で内定が出た世帯のうち<strong>最も低い利用調整点数</strong>のことです。この点数を知ることで、自分の世帯が入園できそうかの目安がわかります。</p>

<h2>区別の傾向</h2>
<table>
<tr><th>区</th><th>競争の激しさ</th><th>ボーダーの傾向</th></tr>
<tr><td>中央区・博多区</td><td>激戦</td><td>フルタイム共働き（150点）＋加点が必要な園が多い</td></tr>
<tr><td>早良区・南区</td><td>やや激戦</td><td>150点前後で勝負になる園が中心</td></tr>
<tr><td>東区・西区・城南区</td><td>標準〜やや緩やか</td><td>エリアにより差が大きい</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>同じ区内でも園によってボーダーは大きく異なります。駅近の人気園は加点がないと厳しく、駅から離れた園では150点以下でも入園できるケースがあります。</p>
</div>

<h2>年齢別の傾向</h2>
<ul>
<li><strong>0歳児</strong>：募集枠が多く、比較的入りやすい</li>
<li><strong>1歳児</strong>：最も激戦。持ち上がりで枠が減るため、加点がないと厳しい</li>
<li><strong>2歳児</strong>：1歳からの持ち上がりでほぼ枠なし。途中入園狙いか小規模保育を検討</li>
<li><strong>3歳児</strong>：小規模保育卒園児の受け皿として一定の枠あり</li>
</ul>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>ボーダー点数は年度・園によって変動します。過去のデータはあくまで参考値として捉え、最新の情報はお住まいの区役所にお問い合わせください。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>過去の利用調整結果は区役所の窓口で確認できる場合があります。詳しくはお住まいの区役所子育て支援課にお問い合わせください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 50,
  },
  {
    slug: "ku-betsu-bairitsu",
    citySlug: "fukuoka",
    title: "福岡市7区の保育園倍率比較｜入りやすい区はどこ？",
    description:
      "福岡市の7区（東区・博多区・中央区・南区・城南区・早良区・西区）の保育園入園倍率の傾向を解説します。",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop",
    category: "データ分析",
    categoryColor: "teal",
    content: `<h2>福岡市7区の保育園事情</h2>
<p>福岡市は約<strong>160万人</strong>の人口を抱え、7つの区で構成されています。区によって待機児童数や入園のしやすさには差があります。</p>

<h2>区別の傾向</h2>

<h3>中央区：市内最激戦エリア</h3>
<p>天神・赤坂・大濠エリアを擁する中央区は、マンション開発と都心回帰の影響で子育て世帯が急増しています。<span class="highlight">フルタイム共働き（150点）でも加点なしでは厳しい園が多い</span>です。</p>

<h3>博多区：駅周辺は激戦</h3>
<p>博多駅・祇園エリアはオフィス街に近く共働き世帯の需要が高いです。一方、板付・那珂エリアなど住宅街は比較的落ち着いています。</p>

<h3>早良区：百道エリアが人気</h3>
<p>百道浜・西新エリアは子育て世帯に人気で競争が激しめです。内陸部に行くと緩やかになる傾向があります。</p>

<h3>南区・城南区：住宅街エリア</h3>
<p>大橋・高宮エリア（南区）、七隈・別府エリア（城南区）は住宅街で一定の需要があります。園によって差が大きいです。</p>

<h3>東区・西区：比較的入りやすい</h3>
<p>市の東西に位置するこの2区は、園の数も多く、比較的入りやすい傾向があります。特に郊外エリアは競争が穏やかです。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>福岡市では区を越えた申込みが可能です。通勤経路に近い隣の区の園も候補に入れることで、選択肢が広がります。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>各園の定員・空き状況は<a href="https://www.city.fukuoka.lg.jp/kodomo-mirai/hoiku/child/Index_R7.html" target="_blank" rel="noopener">福岡市「保育施設等利用のご案内」</a>や区役所の窓口でご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 50,
  },
  {
    slug: "ikukyu-enchou-risk",
    citySlug: "fukuoka",
    title: "福岡市で育休延長のリスクと対策｜不承諾通知書の注意点",
    description:
      "福岡市で育休延長を検討する場合のリスク、不承諾通知書の取得方法、制度変更の影響を解説します。",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "育休・復職",
    categoryColor: "teal",
    content: `<h2>育休延長のしくみ</h2>
<p>育児休業は原則1歳まで（最大2歳まで延長可能）です。延長するには<span class="highlight">「保育園に入れなかった」ことを証明する不承諾通知書</span>が必要です。</p>

<h2>育休延長の手順</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content"><strong>保育園に申込む</strong><p>育休が切れる月（1歳の誕生日の属する月）に保育園の入園申込みを行います。</p></div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content"><strong>不承諾通知書を受け取る</strong><p>入園できなかった場合、福岡市から「保留通知書（不承諾通知書）」が届きます。</p></div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content"><strong>勤務先に提出</strong><p>不承諾通知書を勤務先に提出して育休延長の手続きを行います。</p></div>
</div>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>2025年4月から育休延長の審査が厳格化されました。「本当に保育園に入れなかった」ことが要件であり、意図的に入園を回避していると判断された場合は延長が認められない場合があります。詳しくはハローワークや勤務先にご確認ください。</p>
</div>

<h2>育休延長のリスク</h2>
<ul>
<li>延長期間中に希望の園に空きが出る保証はない</li>
<li>1歳児クラスは0歳児より競争が激しい</li>
<li>育休給付金は延長中も支給されるが、給付率が下がる場合がある</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>育休延長を「意図的に」行うよりも、0歳4月入園で確実に入園する方がトータルで有利なケースが多いです。お住まいの区のボーダー点数を確認し、入園可能性を見極めましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>不承諾通知書の発行についてはお住まいの区役所子育て支援課にお問い合わせください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 40,
  },
  {
    slug: "fukushoku-junbi",
    citySlug: "fukuoka",
    title: "福岡市での復職準備｜入園決定後にやるべきことリスト",
    description:
      "福岡市で保育園の内定が出た後、復職までに準備すべきことをチェックリスト形式でまとめました。",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=400&fit=crop",
    category: "育休・復職",
    categoryColor: "teal",
    content: `<h2>入園決定後のやることリスト</h2>

<div class="step">
<div class="step-num">1</div>
<div class="step-content"><strong>勤務先に復職の連絡</strong><p>内定通知が届いたら速やかに勤務先に連絡し、復職日を調整します。</p></div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content"><strong>入園説明会に参加</strong><p>園から案内される説明会に参加し、持ち物や慣らし保育のスケジュールを確認します。</p></div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content"><strong>慣らし保育の期間を確認</strong><p>慣らし保育は1〜2週間が一般的です。この期間は復職前に済ませるのが理想です。</p></div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content"><strong>持ち物の準備</strong><p>布団カバー・着替え・食事用エプロンなど、園指定の持ち物を準備します。</p></div>
</div>
<div class="step">
<div class="step-num">5</div>
<div class="step-content"><strong>病児保育・ファミサポの登録</strong><p>子どもの体調不良に備えて、病児保育やファミリー・サポート・センターに事前登録しておきましょう。</p></div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>慣らし保育中は短時間保育のため、フルタイムで働けません。<span class="highlight">復職日は慣らし保育終了後</span>に設定するのがベストです。慣らし保育の期間は園や子どもの様子によって前後します。</p>
</div>

<h2>復職後に必要な届出</h2>
<ul>
<li>就労証明書の提出（復職後の勤務条件を反映したもの）</li>
<li>保育の必要性の変更届（就労時間が変わった場合）</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>入園後の手続きについてはお住まいの区役所子育て支援課にお問い合わせください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 35,
  },
  {
    slug: "sannin-me-hokatsu",
    citySlug: "fukuoka",
    title: "福岡市で3人目の保活｜多子世帯の加点と保育料の優遇",
    description:
      "福岡市で3人目以降の子どもの保活における加点制度、保育料の優遇措置を解説します。",
    image:
      "https://images.unsplash.com/photo-1609220136736-443140cffec6?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>3人目以降の保活の有利な点</h2>
<p>福岡市では多子世帯に対して、入園選考と保育料の両面で優遇措置があります。</p>

<h2>利用調整での優遇</h2>
<ul>
<li>多子世帯に対する調整点数の加点がある場合があります</li>
<li>きょうだいが同一施設を利用中の場合は+70点（2人目と同様）</li>
<li>同点で並んだ場合、子どもの数が多い世帯が優先される</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>3人目の保活で最も強力なのは<span class="highlight">きょうだい同一施設の加点（+70点）</span>です。上の子2人が同じ園に通っている場合、3人目も同じ園を希望すれば+70点が加算されます。</p>
</div>

<h2>保育料の優遇</h2>
<p>福岡市では独自制度として第2子以降の保育料が無償です。3人目はもちろん無償の対象です。</p>

<h2>副食費（おかず代）の免除</h2>
<p>3歳以上児クラスの副食費について、第3子以降は免除対象となる場合があります。免除の条件はお住まいの区役所にご確認ください。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>多子世帯の優遇措置については<a href="https://www.city.fukuoka.lg.jp/kodomo-mirai/hoiku/child/Index_R7.html" target="_blank" rel="noopener">福岡市「保育施設等利用のご案内」</a>でご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 30,
  },
  {
    slug: "tanshin-funin",
    citySlug: "fukuoka",
    title: "福岡市で単身赴任世帯の保活｜加点と注意すべきポイント",
    description:
      "福岡市で単身赴任中の世帯が保育園に申し込む場合の加点、必要書類、注意点を解説します。",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>単身赴任世帯の調整点数</h2>
<p>福岡市では、配偶者が単身赴任で別居している場合、調整点数として<span class="highlight">+15点</span>が加算されます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>単身赴任の加点を受けるには、実際に別居していることを証明する書類が必要です。会社からの辞令書や赴任先の住民票の写しなどを準備しましょう。</p>
</div>

<h2>必要書類</h2>
<ul>
<li>勤務先からの転勤辞令書の写し</li>
<li>赴任先の住民票または居住を証明する書類</li>
<li>就労証明書（単身赴任中の配偶者分も必要）</li>
</ul>

<h2>注意点</h2>
<ul>
<li>単身赴任先が福岡市外でも、福岡市に住んでいる保護者が申込者になります</li>
<li>基本点数は「低い方の保護者」で算定されるため、単身赴任中の配偶者も就労証明書が必要です</li>
<li>単身赴任が解消された場合は、速やかに届出が必要です</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>単身赴任の加点条件については<a href="https://kodomo.city.fukuoka.lg.jp/wp-content/uploads/2025/09/d202ed28904cd28e882f6ee0ec68dba8.pdf" target="_blank" rel="noopener">福岡市保育施設等利用調整基準表（PDF）</a>でご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 25,
  },
  {
    slug: "sofu-sobo-doukyo",
    citySlug: "fukuoka",
    title: "福岡市で祖父母同居は不利？｜点数への影響と対策",
    description:
      "福岡市で祖父母と同居している場合の入園選考への影響と、減点を避けるための対策を解説します。",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>祖父母同居は入園選考に影響する？</h2>
<p>福岡市では、祖父母が同居していることが直接的な減点要因になるわけではありません。ただし、利用調整で同点の場合の判定において、<span class="highlight">保育できる親族の有無</span>が考慮される可能性があります。</p>

<h2>祖父母同居のケース別対応</h2>
<table>
<tr><th>祖父母の状況</th><th>保活への影響</th></tr>
<tr><td>65歳以上で就労していない</td><td>「保育可能な同居親族あり」と判定される可能性あり</td></tr>
<tr><td>就労中（月64時間以上）</td><td>保育できないため影響は限定的</td></tr>
<tr><td>疾病・障がいがある</td><td>保育できないため影響なし（診断書等を添付）</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>祖父母が就労中や健康上の理由で保育ができない場合は、その状況を証明する書類を添付しましょう。就労証明書や診断書が有効です。</p>
</div>

<h2>同居と近居の違い</h2>
<p>「同居」と「近居（近くに住んでいるが別世帯）」では扱いが異なります。近居の場合は基本的に選考への影響はありません。同居の定義は住民票上の同一世帯かどうかで判断されます。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>同居親族の取扱いについて不明な点はお住まいの区役所子育て支援課にご相談ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 30,
  },
  {
    slug: "fushoninchi-taiou",
    citySlug: "fukuoka",
    title: "福岡市で保育園に落ちた場合の対処法｜不承諾後にやるべきこと",
    description:
      "福岡市で保育園の不承諾通知を受け取った後にできること、次のステップを解説します。",
    image:
      "https://images.unsplash.com/photo-1494599948593-3dafe8338d71?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>不承諾通知を受け取ったら</h2>
<p>保育園に落ちてしまっても、まだ打てる手はあります。落ち着いて以下のステップを確認しましょう。</p>

<div class="step">
<div class="step-num">1</div>
<div class="step-content"><strong>二次募集に申込む</strong><p>一次で定員に達しなかった園や辞退で空いた園の二次募集があります。希望園の変更も可能です。</p></div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content"><strong>認可外保育施設を探す</strong><p>認証保育所、企業主導型保育園、認可外保育施設を平行して探しましょう。</p></div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content"><strong>育休延長の手続き</strong><p>不承諾通知書を勤務先に提出し、育休の延長手続きを行います。</p></div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content"><strong>途中入園を待つ</strong><p>4月以降も毎月の空き枠に対して利用調整が行われます。申込みは有効なので、空きが出れば案内が届きます。</p></div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>不承諾になった理由（点数が足りなかったのか、希望園が少なかったのか等）を区役所に確認しましょう。次回の申込みに向けた改善点が見つかります。</p>
</div>

<h2>途中入園の可能性</h2>
<p>4月以降も転居や退園で空きが出ることがあります。特に<span class="highlight">5月・10月</span>は引越しシーズンで空きが出やすい傾向があります。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>毎月の空き状況は区役所の窓口で確認できます。二次募集の案内は<a href="https://www.city.fukuoka.lg.jp/kodomo-mirai/hoiku/child/Index_R7.html" target="_blank" rel="noopener">福岡市「保育施設等利用のご案内」</a>でご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 45,
  },
  {
    slug: "taiki-jidou-taisaku",
    citySlug: "fukuoka",
    title: "福岡市の待機児童の現状と対策｜最新データで読み解く",
    description:
      "福岡市の待機児童数の推移と、市が進めている待機児童対策の最新情報をまとめました。",
    image:
      "https://images.unsplash.com/photo-1529390079861-591de354faf5?w=800&h=400&fit=crop",
    category: "データ分析",
    categoryColor: "teal",
    content: `<h2>福岡市の待機児童の推移</h2>
<p>福岡市は政令指定都市の中でも子育て世帯の転入が多く、保育需要が高い自治体です。近年は保育施設の整備が進み、待機児童数は減少傾向にあります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>国の定義する「待機児童」は減少していますが、希望する園に入れない<span class="highlight">「隠れ待機児童」（特定園のみ希望、育休延長中など）</span>は依然として相当数存在します。</p>
</div>

<h2>福岡市の待機児童対策</h2>
<ul>
<li><strong>保育施設の新規整備</strong>：認可保育園・小規模保育事業所の新設を進めている</li>
<li><strong>保育士確保策</strong>：保育士の処遇改善、家賃補助、就職支援</li>
<li><strong>第2子以降の保育料無償化</strong>：子育てしやすい環境づくり</li>
<li><strong>企業主導型保育の推進</strong>：企業と連携した保育の受け皿拡大</li>
</ul>

<h2>待機児童が多いエリア</h2>
<p>一般的に中央区・博多区・早良区（百道エリア）は需要が高く、待機児童が発生しやすい傾向があります。ただし、最新の状況は毎年変動するため、直近のデータを確認してください。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>待機児童の集計方法は自治体によって異なります。福岡市が公表するデータの定義を確認した上で、他の自治体と比較してください。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新の待機児童数は<a href="https://www.city.fukuoka.lg.jp/kodomo-mirai/hoiku/child/Index_R7.html" target="_blank" rel="noopener">福岡市こども未来局</a>のホームページで公開されています。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 40,
  },
  {
    slug: "tennen-moshikomi",
    citySlug: "fukuoka",
    title: "福岡市の転園申込み｜手続きの流れと成功のコツ",
    description:
      "福岡市で保育園を転園したい場合の申込み方法、転園が認められる条件、成功のためのポイントを解説します。",
    image:
      "https://images.unsplash.com/photo-1473649085228-583485e6e4d7?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>転園の申込み方法</h2>
<p>福岡市では、現在認可保育園に通っている子どもが別の園に移る「転園」も、通常の入園申込みと同じ手続きで行います。</p>

<div class="step">
<div class="step-num">1</div>
<div class="step-content"><strong>区役所で転園申込書を入手</strong><p>お住まいの区役所子育て支援課で転園の申込用紙をもらいます。</p></div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content"><strong>必要書類を提出</strong><p>転園申込書、就労証明書（更新が必要な場合）を提出します。</p></div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content"><strong>利用調整を待つ</strong><p>新規入園の申込者と同じ利用調整の対象になります。</p></div>
</div>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>転園は新規入園と同じ利用調整で選考されるため、人気園への転園は簡単ではありません。転園が不承諾になっても、現在の園の在園資格は失われません。</p>
</div>

<h2>転園を成功させるコツ</h2>
<ul>
<li><strong>4月の一斉入所を狙う</strong>：卒園や退園で空きが出やすい4月が最もチャンス</li>
<li><strong>複数の園を希望に入れる</strong>：希望園が1つだけだと転園の可能性が低くなる</li>
<li><strong>きょうだいの在園を活用</strong>：上の子が通っている園を希望すればきょうだい加点が使える</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>転園の理由が「引越し」の場合は、転居先の近くの園を希望する合理的な理由があるため、区役所に相談すると良いでしょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>転園の手続きについてはお住まいの区役所子育て支援課にお問い合わせください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 30,
  },
];

registerArticles(articles);
