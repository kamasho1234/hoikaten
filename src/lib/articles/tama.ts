import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  {
    slug: "hokatsu-schedule",
    citySlug: "tama",
    title: "多摩市の保活スケジュール　申込から内定までの流れ",
    description:
      "多摩市の認可保育園の申込時期・選考の流れをまとめました。令和8年度4月入園の動き方を解説します。",
    image: "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>多摩市の4月入園スケジュール</h2>
<p>多摩市の認可保育園は毎年秋に翌年度4月入園の一次申込を受付けます。多摩ニュータウンを中心に約30か所の認可保育園があり、計画的な保活が重要です。</p>

<h3>保活の全体スケジュール</h3>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>4月〜6月：情報収集</strong>
<p>多摩市子ども青少年部児童青少年課のホームページで保育園の一覧や前年度の入園状況を確認します。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>7月〜9月：保育園見学</strong>
<p>多摩市内の保育園を見学して、通勤経路や多摩センター駅・永山駅との距離を確認しましょう。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>9月〜10月：書類準備</strong>
<p>就労証明書の就労日数・就労時間は正確に記載してもらいましょう。基本指数に直結します。</p>
</div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content">
<strong>11月：申込書類の提出</strong>
<p>4月一次の申込期限は例年11月中旬です。期限厳守で提出しましょう。</p>
</div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>多摩市の基本指数は父母各最大20点（合計40点満点）です。月の就労日数と1日の就労時間で判定されます。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳しくは<a href="https://www.city.tama.lg.jp/" target="_blank" rel="noopener">多摩市公式サイト</a>の児童青少年課ページをご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 60,
  },
  {
    slug: "scoring-system-guide",
    citySlug: "tama",
    title: "多摩市の入園点数のしくみ　基本指数と調整指数を解説",
    description:
      "多摩市の保育園入園選考で使われる基本指数と調整指数のしくみをわかりやすく解説します。",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "点数を知る",
    categoryColor: "blue",
    content: `<h2>多摩市の選考指数とは</h2>
<p>多摩市の認可保育園は「基本指数（父＋母）＋ 調整指数」の合計で選考されます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>利用調整指数 ＝ 基本指数（父＋母）＋ 調整指数</p>
</div>

<h2>基本指数（父母各最大20点、合計40点）</h2>
<p>就労の場合、月20日以上かつ日8時間以上の就労で満点の<span class="highlight">20点</span>です。</p>

<table>
<tr><th>就労条件</th><th>指数</th></tr>
<tr><td>月20日以上かつ日8時間以上</td><td>20</td></tr>
<tr><td>月20日以上かつ日6時間以上</td><td>18</td></tr>
<tr><td>月16日以上かつ日6時間以上</td><td>16</td></tr>
<tr><td>月16日以上かつ日4時間以上</td><td>14</td></tr>
<tr><td>月12日以上かつ日4時間以上</td><td>12</td></tr>
<tr><td>月64時間以上</td><td>10</td></tr>
</table>

<h2>調整指数の代表例</h2>
<ul>
<li>ひとり親世帯：<span class="highlight">+5点</span></li>
<li>きょうだい在園：<span class="highlight">+3点</span></li>
<li>認可外保育施設利用：<span class="highlight">+3点</span></li>
<li>生活保護世帯：<span class="highlight">+3点</span></li>
<li>きょうだい同時申込：<span class="highlight">+2点</span></li>
<li>育休復帰予定：<span class="highlight">+2点</span></li>
<li>市外からの申込：<span class="highlight">-10点</span></li>
<li>同居親族が保育可能：<span class="highlight">-3点</span></li>
<li>転園希望：<span class="highlight">-5点</span></li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>全項目は<a href="https://www.city.tama.lg.jp/" target="_blank" rel="noopener">多摩市公式サイト</a>の「保育所等利用申込みのご案内」で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 70,
  },
  {
    slug: "work-points-detail",
    citySlug: "tama",
    title: "多摩市の就労点数を詳しく解説　日数と時間の組み合わせ",
    description:
      "多摩市の保育園入園選考で就労の基本指数がどう決まるか、日数と時間の組み合わせを詳しく解説します。",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "点数を知る",
    categoryColor: "blue",
    content: `<h2>多摩市の就労指数は日数×時間で決まる</h2>
<p>多摩市の基本指数は月の就労日数と1日の就労時間の組み合わせで判定されます。他市のように月の合計就労時間だけで判定する方式とは異なるため注意が必要です。</p>

<h2>就労条件と指数の一覧</h2>
<table>
<tr><th>就労条件</th><th>基本指数</th></tr>
<tr><td>月20日以上かつ日8時間以上</td><td>20点</td></tr>
<tr><td>月20日以上かつ日6時間以上</td><td>18点</td></tr>
<tr><td>月16日以上かつ日6時間以上</td><td>16点</td></tr>
<tr><td>月16日以上かつ日4時間以上</td><td>14点</td></tr>
<tr><td>月12日以上かつ日4時間以上</td><td>12点</td></tr>
<tr><td>月64時間以上</td><td>10点</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>満点の20点を得るには月20日以上かつ1日8時間以上の就労が必要です。週5日×8時間のフルタイム勤務がこれに該当します。</p>
</div>

<h2>時短勤務の場合</h2>
<p>1日6時間の時短勤務で月20日以上働いている場合、基本指数は<span class="highlight">18点</span>です。フルタイムの20点と比べて2点下がります。</p>

<h2>パートタイムの場合</h2>
<p>週4日（月16日）×1日6時間の場合は<span class="highlight">16点</span>、週4日×1日4時間の場合は<span class="highlight">14点</span>です。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>就労証明書の記載内容で判定されます。勤務先に正確な記載を依頼しましょう。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 55,
  },
  {
    slug: "adjustment-points",
    citySlug: "tama",
    title: "多摩市で入園点数を上げるコツ　調整指数の加点チェックリスト",
    description:
      "多摩市の保育園入園選考で調整指数の加点を最大限に活用する方法を解説します。",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>基本指数40点は出発点</h2>
<p>多摩市ではフルタイム共働き世帯は基本指数<span class="highlight">40点</span>で横並びです。差がつくのは調整指数の加点です。</p>

<h2>加点チェックリスト</h2>
<table>
<tr><th>項目</th><th>点数</th><th>条件</th></tr>
<tr><td>ひとり親世帯</td><td>+5点</td><td>母子・父子家庭の場合</td></tr>
<tr><td>きょうだい在園</td><td>+3点</td><td>認可保育園にきょうだいが在園中</td></tr>
<tr><td>認可外保育施設利用</td><td>+3点</td><td>認可外に月ぎめで利用中</td></tr>
<tr><td>生活保護</td><td>+3点</td><td>生活保護を受けている場合</td></tr>
<tr><td>きょうだい同時申込</td><td>+2点</td><td>きょうだいと同時に入園申込</td></tr>
<tr><td>育休復帰予定</td><td>+2点</td><td>入園月に職場復帰する場合</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>多摩市はひとり親世帯への加点が+5点と大きいのが特徴です。また認可外保育施設の利用で+3点の加点も有効な手段です。</p>
</div>

<h2>減点に注意</h2>
<table>
<tr><th>項目</th><th>点数</th><th>条件</th></tr>
<tr><td>市外からの申込</td><td>-10点</td><td>多摩市外に在住の場合</td></tr>
<tr><td>転園希望</td><td>-5点</td><td>認可保育園から別の園への転園</td></tr>
<tr><td>同居親族が保育可能</td><td>-3点</td><td>65歳未満の同居親族がいる場合</td></tr>
</table>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>調整指数の全項目は<a href="https://www.city.tama.lg.jp/" target="_blank" rel="noopener">多摩市公式サイト</a>の「保育所等利用申込みのご案内」で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 65,
  },
  {
    slug: "required-documents",
    citySlug: "tama",
    title: "多摩市の保育園申込に必要な書類一覧",
    description:
      "多摩市の認可保育園の入園申込に必要な書類をまとめました。提出漏れがないよう確認しましょう。",
    image: "https://images.unsplash.com/photo-1568667256549-094345857637?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>多摩市の申込に必要な書類</h2>
<p>多摩市の認可保育園に申込む際に必要な書類を確認しましょう。書類の不備は選考に影響する場合があります。</p>

<h3>全員が提出する書類</h3>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>保育所等利用申込書</strong>
<p>子ども青少年部児童青少年課の窓口またはホームページからダウンロードできます。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>保育を必要とすることを証明する書類（父母それぞれ）</strong>
<p>就労の場合は就労証明書、疾病の場合は診断書など、保育が必要な理由に応じた書類が必要です。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>マイナンバー関連書類</strong>
<p>個人番号カードまたは通知カードのコピーが必要です。</p>
</div>
</div>

<h3>該当者のみ提出する書類</h3>
<ul>
<li>ひとり親世帯：児童扶養手当証書のコピーなど</li>
<li>認可外利用中：保育受託証明書</li>
<li>育休復帰予定：育児休業復帰に関する誓約書</li>
<li>障害がある場合：障害者手帳のコピー</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>就労証明書の就労日数・就労時間は基本指数に直結します。勤務先に正確な記載を依頼しましょう。月20日以上かつ日8時間以上で満点の20点です。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>書類の様式は<a href="https://www.city.tama.lg.jp/" target="_blank" rel="noopener">多摩市公式サイト</a>からダウンロードできます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 50,
  },
  {
    slug: "nursery-types",
    citySlug: "tama",
    title: "多摩市の保育施設の種類と特徴　認可園から小規模保育まで",
    description:
      "多摩市にある保育施設の種類と特徴を解説します。認可保育園、小規模保育、認証保育所の違いを知りましょう。",
    image: "https://images.unsplash.com/photo-1587654780291-39c9404d7dd0?w=800&h=400&fit=crop",
    category: "園えらび",
    categoryColor: "purple",
    content: `<h2>多摩市の保育施設の種類</h2>
<p>多摩市には約30か所の認可保育園をはじめ、さまざまな保育施設があります。多摩ニュータウンの各エリアに保育施設が整備されています。</p>

<h3>認可保育園</h3>
<p>市が利用調整を行う保育施設です。基本指数＋調整指数の合計点数で選考されます。0歳から5歳まで預けられる園が中心です。</p>

<h3>小規模保育事業</h3>
<p>定員19人以下の少人数制の保育施設です。0〜2歳が対象で、3歳になったら認可保育園への転園が必要です。</p>

<h3>認証保育所</h3>
<p>東京都独自の認証制度による保育施設です。認可保育園に入れなかった場合の受け皿となります。月ぎめ利用で翌年度の申込時に<span class="highlight">+3点</span>の加点が得られます。</p>

<h3>認可外保育施設</h3>
<p>都道府県に届出をしている保育施設です。認可保育園の選考を待つ間の利用にも活用できます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>多摩市は多摩センター駅・永山駅周辺に保育施設が集中しています。通勤経路と合わせて園を選びましょう。サンリオピューロランドのある多摩センター周辺は子育て世帯にも人気のエリアです。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>保育施設の一覧は<a href="https://www.city.tama.lg.jp/" target="_blank" rel="noopener">多摩市公式サイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 45,
  },
  {
    slug: "age-class-competition",
    citySlug: "tama",
    title: "多摩市の年齢別クラスの競争率　何歳が入りやすい？",
    description:
      "多摩市の保育園入園で年齢クラスごとの競争率の違いを解説します。入園しやすい年齢を知って保活に活かしましょう。",
    image: "https://images.unsplash.com/photo-1524813686514-a57563d77965?w=800&h=400&fit=crop",
    category: "データ分析",
    categoryColor: "teal",
    content: `<h2>多摩市の年齢別入園状況</h2>
<p>多摩市の認可保育園は年齢クラスによって競争率が大きく異なります。人口約15万人の多摩市では、多摩ニュータウンの世代交代に伴い保育需要が変化しています。</p>

<h2>年齢別の傾向</h2>
<h3>0歳児クラス</h3>
<p>受入枠が限られるため、園によっては競争が激しくなります。産後休暇中に申込む方が多い年齢です。</p>

<h3>1歳児クラス</h3>
<p>最も競争が激しい年齢クラスです。育休明けの1歳入園を目指す世帯が集中します。人気園ではフルタイム共働きの40点でも調整指数の加点がないと厳しい場合があります。</p>

<h3>2歳児クラス</h3>
<p>持ち上がりが多く新規受入枠が少ない園があります。小規模保育からの転園組も加わります。</p>

<h3>3歳児以上</h3>
<p>定員が増える園が多く、比較的入りやすい傾向があります。小規模保育事業の卒園児の受け皿としても機能します。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>1歳児クラスが最激戦です。0歳4月入園を狙うか、3歳まで小規模保育を利用してから認可保育園に転園する方法も有効です。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>各園の年齢別空き状況は<a href="https://www.city.tama.lg.jp/" target="_blank" rel="noopener">多摩市公式サイト</a>で公開されています。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 60,
  },
  {
    slug: "dual-income-strategy",
    citySlug: "tama",
    title: "多摩市の共働き世帯が点数を上げる戦略",
    description:
      "多摩市でフルタイム共働き40点から差をつけるための調整指数活用法を解説します。",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>フルタイム共働き40点がスタートライン</h2>
<p>多摩市ではフルタイム共働き世帯は基本指数<span class="highlight">40点</span>で横並びです。多摩ニュータウンエリアの人気園では40点でも入れないケースがあり、調整指数の加点が重要です。</p>

<h2>共働き世帯が狙える加点</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>認可外保育施設の利用（+3点）</strong>
<p>認可外保育施設に月ぎめで預けることで+3点の加点が得られます。育休中に認可外を利用開始し、認可の申込時に加点を得る方法です。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>きょうだい在園（+3点）</strong>
<p>上の子が認可保育園に在園中なら+3点です。第二子以降の保活では大きなアドバンテージです。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>育休復帰（+2点）</strong>
<p>入園月に育児休業から復帰する場合に+2点の加点があります。</p>
</div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content">
<strong>きょうだい同時申込（+2点）</strong>
<p>きょうだいを同時に申込む場合に+2点の加点です。</p>
</div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>認可外利用（+3点）と育休復帰（+2点）を組み合わせれば、基本指数40点に+5点で合計45点。これなら多くの園で内定が見込めます。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>前年度の入園内定ラインは<a href="https://www.city.tama.lg.jp/" target="_blank" rel="noopener">多摩市公式サイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 55,
  },
  {
    slug: "single-parent-support",
    citySlug: "tama",
    title: "多摩市のひとり親世帯向け保育園入園ガイド",
    description:
      "多摩市でひとり親世帯が保育園入園で受けられる優遇措置と支援制度を解説します。",
    image: "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&h=400&fit=crop",
    category: "制度を知る",
    categoryColor: "rose",
    content: `<h2>多摩市のひとり親世帯への優遇</h2>
<p>多摩市ではひとり親世帯に対して調整指数で<span class="highlight">+5点</span>の加点があります。これは多摩市の調整指数の中で最も大きな加点です。</p>

<h2>ひとり親世帯の入園点数の目安</h2>
<table>
<tr><th>保護者の就労状況</th><th>基本指数</th><th>調整指数</th><th>合計</th></tr>
<tr><td>フルタイム勤務（月20日以上・日8時間以上）</td><td>20点</td><td>+5点</td><td>25点</td></tr>
<tr><td>時短勤務（月20日以上・日6時間以上）</td><td>18点</td><td>+5点</td><td>23点</td></tr>
<tr><td>求職活動中</td><td>6点</td><td>+5点</td><td>11点</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>ひとり親世帯は保護者1人分の基本指数＋調整指数で選考されます。フルタイム勤務であれば25点となり、多くの園で入園が期待できます。</p>
</div>

<h2>多摩市のひとり親向け支援制度</h2>
<ul>
<li>児童扶養手当：所得に応じて支給</li>
<li>ひとり親家庭等医療費助成：健康保険の自己負担分を助成</li>
<li>母子・父子福祉資金貸付：就学資金や生活資金の貸付</li>
</ul>

<h2>必要書類</h2>
<p>ひとり親の加点を受けるには、児童扶養手当証書のコピーや戸籍謄本など、ひとり親であることを証明する書類の提出が必要です。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>ひとり親向けの支援制度は<a href="https://www.city.tama.lg.jp/" target="_blank" rel="noopener">多摩市公式サイト</a>で詳しく案内されています。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 40,
  },
  {
    slug: "waiting-child-status",
    citySlug: "tama",
    title: "多摩市の待機児童の現状と今後の見通し",
    description:
      "多摩市の待機児童数の推移と、今後の保育園整備の見通しを解説します。",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=400&fit=crop",
    category: "データ分析",
    categoryColor: "teal",
    content: `<h2>多摩市の待機児童の状況</h2>
<p>多摩市は人口約15万人の多摩地区の都市です。多摩ニュータウンの開発から50年以上が経過し、世代交代が進む中で保育需要も変化しています。</p>

<h2>待機児童数の推移</h2>
<p>多摩市は保育施設の整備を進めており、待機児童数は減少傾向にあります。ただし、1歳児クラスを中心に希望する園に入れないケースは依然としてあります。</p>

<h2>エリア別の状況</h2>
<ul>
<li>多摩センター駅周辺：サンリオピューロランドがある多摩市の中心地。子育て世帯に人気で競争率が高い傾向</li>
<li>永山駅周辺：ニュータウン初期の開発エリア。世代交代が進み保育需要が増加中</li>
<li>聖蹟桜ヶ丘駅周辺：京王線沿線の住宅地。駅近の園は人気が高い</li>
<li>南部エリア：比較的保育施設に余裕がある地域</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>多摩市は保育施設の整備を進めていますが、エリアや年齢によって入りやすさに差があります。希望園を複数挙げることが重要です。</p>
</div>

<h2>今後の見通し</h2>
<p>多摩ニュータウンの建替え事業やマンション開発により、今後も一定の保育需要が見込まれます。多摩市は子育て支援の充実を図っており、保育施設の整備は継続される見通しです。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新の待機児童数や保育施設の整備計画は<a href="https://www.city.tama.lg.jp/" target="_blank" rel="noopener">多摩市公式サイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 50,
  },
];

registerArticles(articles);
