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
<p>ひとり親家庭への支援制度は<a href="https://www.city.fukuoka.lg.jp/kodomo-mirai/hitorioya/child/hitorioya_top.html" target="_blank" rel="noopener">福岡市公式サイト「ひとり親家庭への支援」</a>で確認できます。</p>
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
];

registerArticles(articles);
