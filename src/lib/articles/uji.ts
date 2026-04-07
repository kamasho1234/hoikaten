import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  // ===== 保活の基本 (1) =====
  {
    slug: "hokatsu-schedule",
    citySlug: "uji",
    title: "宇治市の保活スケジュール　令和8年度4月入園の流れ",
    description:
      "宇治市の認可保育園の申込時期・選考の流れ・結果通知の時期をわかりやすく解説。令和8年度4月入園のスケジュールを中心にまとめました。",
    image:
      "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>令和8年度（2026年度）4月入園のスケジュール</h2>
<p>宇治市の4月入園は<strong>一次選考</strong>と<strong>二次選考</strong>の2回に分かれています。宇治茶で有名な宇治市は京都府南部に位置し、人口約18万人のまちです。認可保育園は約30か所あり、秋に申込が集中するため早めの準備が大切です。</p>

<h3>一次選考</h3>
<table>
<tr><th>項目</th><th>日程</th></tr>
<tr><td>案内冊子配布・受付開始</td><td>令和7年10月上旬</td></tr>
<tr><td>申込受付期間</td><td>令和7年10月上旬〜11月中旬（必着）</td></tr>
<tr><td>結果通知発送</td><td>令和8年1月下旬〜2月上旬</td></tr>
</table>

<h3>二次選考</h3>
<table>
<tr><th>項目</th><th>日程</th></tr>
<tr><td>申込受付期間</td><td>令和8年2月上旬〜2月中旬</td></tr>
<tr><td>結果通知</td><td>令和8年3月上旬</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>一次選考で保留だった方は申請書の再提出は不要です。希望園の追加・変更がある場合のみ変更届を提出しましょう。</p>
</div>

<h2>いつから動き始めるべき？</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>4月〜6月：情報収集スタート</strong>
<p>宇治市こども福祉課のホームページや窓口で保育施設の一覧を入手しましょう。</p>
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
<strong>10月：申込書類の入手</strong>
<p>「保育施設利用申込みのご案内」を宇治市こども福祉課または各保育園で入手しましょう。</p>
</div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content">
<strong>10月〜11月：申込書類の準備・提出</strong>
<p>就労証明書などを揃え、宇治市こども福祉課に提出します。</p>
</div>
</div>

<h2>途中入園（5月〜3月）の申込</h2>
<p>各月の申込締切は、入園希望月の<span class="highlight">前月の中旬</span>です。詳しくは<a href="https://www.city.uji.kyoto.jp/soshiki/28/" target="_blank" rel="noopener">宇治市こども福祉課の公式サイト</a>をご確認ください。</p>`,
    publishedAt: "2026-04-07",
    popularity: 55,
  },
  // ===== 選考のしくみ (2) =====
  {
    slug: "scoring-system-guide",
    citySlug: "uji",
    title: "宇治市の入園点数のしくみ　基本指数・調整指数を解説",
    description:
      "宇治市の保育園入園選考で使われる「基本指数」「調整指数」のしくみを初めての方にもわかるように解説します。",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>宇治市の点数制度の特徴</h2>
<p>宇治市の入園選考は「ポイント制」で行われます。父母それぞれの基本指数（最大20点）を合計した<span class="highlight">最大40点満点</span>に、調整指数を加減して最終的な選考点数が決まります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>選考に使われる点数 ＝ 父母それぞれの基本指数のうち<strong>低い方</strong>の合計点 ＋ 調整指数</p>
</div>

<p>つまり、片方の保護者が満点でも、もう片方が低ければそちらの点数で選考されます。両親とも高い点数を確保することが重要です。</p>

<h2>基本指数とは？</h2>
<p>保護者それぞれの「保育が必要な理由」を点数化したものです。1人あたり最大<span class="highlight">20点</span>です。</p>
<table>
<tr><th>就労時間</th><th>基本指数</th></tr>
<tr><td>週40時間以上</td><td>20点（満点）</td></tr>
<tr><td>週35時間以上40時間未満</td><td>18点</td></tr>
<tr><td>週30時間以上35時間未満</td><td>16点</td></tr>
<tr><td>週25時間以上30時間未満</td><td>14点</td></tr>
<tr><td>週20時間以上25時間未満</td><td>12点</td></tr>
<tr><td>月64時間以上</td><td>8点</td></tr>
</table>

<h2>調整指数とは？</h2>
<p>世帯の状況に応じて加減される点数です。代表的な項目は以下の通りです。</p>
<ul>
<li>きょうだいが在園中の園を希望：<span class="highlight">+15点</span></li>
<li>ひとり親世帯：<span class="highlight">+5点</span></li>
<li>多胎児：<span class="highlight">+10点</span></li>
<li>育休復帰（入園月に復帰）：<span class="highlight">+2点</span></li>
<li>育休復帰（入園翌月に復帰）：<span class="highlight">+1点</span></li>
<li>保育士・保育教諭として就労：<span class="highlight">+10点</span></li>
<li>単身赴任：<span class="highlight">+3点</span></li>
<li>65歳未満の祖父母に預けている：<span class="highlight">-1点</span></li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新の指数表は<a href="https://www.city.uji.kyoto.jp/soshiki/28/" target="_blank" rel="noopener">宇治市こども福祉課の公式サイト</a>でご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 65,
  },
  // ===== 点数アップ (3) =====
  {
    slug: "score-up-checklist",
    citySlug: "uji",
    title: "宇治市で点数を上げるコツ　加点のチェックリスト",
    description:
      "宇治市の保育園入園選考で調整指数の加点を最大限に活用する方法を、チェックリスト形式で解説します。",
    image:
      "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>両親の点数バランスがカギ</h2>
<p>宇治市では父母のうち<span class="highlight">低い方の点数</span>で選考されます。片方だけ高くても意味がないため、両親とも満点に近づけることが最優先です。</p>

<h3>加点チェックリスト</h3>
<table>
<tr><th>加点項目</th><th>点数</th><th>条件</th></tr>
<tr><td>きょうだいが在園中の園を希望</td><td>+15点</td><td>同一園への申込が条件</td></tr>
<tr><td>多胎児</td><td>+10点</td><td>双子・三つ子など</td></tr>
<tr><td>保育士・保育教諭として就労</td><td>+10点</td><td>市内の保育施設等で勤務</td></tr>
<tr><td>ひとり親世帯</td><td>+5点</td><td>ひとり親であること</td></tr>
<tr><td>単身赴任</td><td>+3点</td><td>配偶者が単身赴任中</td></tr>
<tr><td>育休復帰（入園月に復帰）</td><td>+2点</td><td>入園月中に復職する場合</td></tr>
<tr><td>育休復帰（入園翌月に復帰）</td><td>+1点</td><td>入園翌月に復職する場合</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>きょうだい加点（+15点）は在園中の園を希望した場合のみ適用されます。別の園を希望する場合は加点されません。</p>
</div>

<h2>フルタイム共働き＋育休復帰が標準パターン</h2>
<p>父母ともにフルタイム（各20点）で基本指数<span class="highlight">20点</span>。ここに育休復帰加点（+2点）を加えた<span class="highlight">22点</span>が多くの家庭の到達ラインです。</p>

<h2>減点に注意</h2>
<p>65歳未満の祖父母に児童を預けている場合は<span class="highlight">-1点</span>の減点があります。就労内定で実績がない場合は<span class="highlight">-5点</span>です。該当しないか事前に確認しましょう。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>全項目の詳細は<a href="https://www.city.uji.kyoto.jp/soshiki/28/" target="_blank" rel="noopener">宇治市こども福祉課の公式サイト</a>でご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 100,
  },
  // ===== 同点時の優先順位 (4) =====
  {
    slug: "tiebreaker-rules",
    citySlug: "uji",
    title: "宇治市で同点になったらどうなる？優先順位を解説",
    description:
      "宇治市の保育園入園選考で同じ点数になった場合の優先順位のしくみを、わかりやすく解説します。",
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>同点のとき、どうやって決まるの？</h2>
<p>宇治市の入園選考では同じ点数の家庭が並ぶことが少なくありません。同点の場合は「優先順位」で判定されます。</p>

<h3>宇治市の主な優先順位</h3>
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
<p>認可外保育施設に有償で預けている実績がある世帯が、実績のない世帯より優先されます。</p>
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
<p>宇治市では同点になりやすいため、認可外の利用実績を作っておくことが同点時に有利に働く場合があります。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳細は<a href="https://www.city.uji.kyoto.jp/soshiki/28/" target="_blank" rel="noopener">宇治市こども福祉課の公式サイト</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 85,
  },
  // ===== 時短勤務と点数 (5) =====
  {
    slug: "jitan-kinmu-score",
    citySlug: "uji",
    title: "宇治市で時短勤務だと点数はどうなる？基本指数への影響",
    description:
      "宇治市の保育園入園選考で時短勤務を取得した場合の点数への影響と注意点を解説します。",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>時短勤務で基本指数はどう変わる？</h2>
<p>宇治市の基本指数は就労時間に連動しています。時短勤務にすると、就労時間の減少に応じて点数が下がります。</p>

<table>
<tr><th>就労時間</th><th>基本指数</th><th>備考</th></tr>
<tr><td>週40時間以上</td><td>20点</td><td>フルタイム</td></tr>
<tr><td>週35〜40時間未満</td><td>18点</td><td></td></tr>
<tr><td>週30〜35時間未満</td><td>16点</td><td>6時間勤務×5日の場合</td></tr>
<tr><td>週25〜30時間未満</td><td>14点</td><td></td></tr>
<tr><td>週20〜25時間未満</td><td>12点</td><td></td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>たとえば1日6時間×週5日＝週30時間の時短勤務だと基本指数は<span class="highlight">16点</span>です。フルタイムの20点から<span class="highlight">4点</span>下がります。</p>
</div>

<h2>片方の時短が選考点数を左右する</h2>
<p>宇治市では父母の低い方の点数が選考に使われます。仮に父がフルタイム20点、母が時短16点だとすると、選考に使われるのは<span class="highlight">16点</span>です。</p>

<h2>時短勤務でも点数を維持する方法</h2>
<ul>
<li>育児短時間勤務制度で取得前の就労時間が適用されるか宇治市こども福祉課に確認する</li>
<li>就労証明書に「本来の勤務時間」と「時短中の勤務時間」の両方を記載してもらう</li>
<li>入園後に時短勤務に切り替える場合は、申込時点ではフルタイムの点数で申請可能</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>就労証明書の記載方法は<a href="https://www.city.uji.kyoto.jp/soshiki/28/" target="_blank" rel="noopener">宇治市こども福祉課の公式サイト</a>でご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 90,
  },
  // ===== 落ちたときの選択肢 (6) =====
  {
    slug: "ochita-sentakushi",
    citySlug: "uji",
    title: "宇治市で保育園に落ちたときの5つの選択肢",
    description:
      "宇治市の認可保育園の選考で保留になった場合に検討すべき5つの選択肢を具体的に紹介します。",
    image:
      "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=800&h=400&fit=crop",
    category: "入れなかったら",
    categoryColor: "rose",
    content: `<h2>保留になっても慌てないで。次にできることを確認しましょう</h2>

<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>二次選考を待つ</strong>
<p>一次選考で保留の方は自動的に二次選考の対象です。希望園の追加・変更がある場合は期限までに届を提出しましょう。</p>
</div>
</div>

<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>認可外保育施設を探す</strong>
<p>宇治市内にも認可外保育施設があります。認可外に預けながら翌年度の認可を再申請すれば、同点時の優先順位で有利になる場合があります。</p>
</div>
</div>

<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>小規模保育事業を探す</strong>
<p>0〜2歳児対象の小規模保育は、認可保育園より比較的空きがあるケースがあります。3歳以降の転園先は連携施設が設定されている場合もあります。</p>
</div>
</div>

<div class="step">
<div class="step-num">4</div>
<div class="step-content">
<strong>企業主導型保育施設を利用する</strong>
<p>企業主導型保育施設は認可外ですが、国の助成を受けているため保育料が比較的抑えられています。直接施設に申し込みます。</p>
</div>
</div>

<div class="step">
<div class="step-num">5</div>
<div class="step-content">
<strong>育休を延長して翌年度に再挑戦する</strong>
<p>不承諾通知があれば育休延長の申請が可能です。翌年度に再挑戦する場合は、認可外の利用実績を作っておくと同点時に有利に働きます。</p>
</div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>宇治市は京都市のベッドタウンとしてファミリー層が多い地域です。人気園に入れなかった場合でも、近隣エリアまで視野を広げると選択肢が増えます。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>認可外保育施設の情報は<a href="https://www.city.uji.kyoto.jp/soshiki/28/" target="_blank" rel="noopener">宇治市こども福祉課の公式サイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 80,
  },
  // ===== 認可外で加点を得る方法 (7) =====
  {
    slug: "ninkagai-katen",
    citySlug: "uji",
    title: "宇治市で認可外保育を活用して有利にする方法",
    description:
      "宇治市の保育園入園選考で認可外保育施設の利用実績がどう活きるのか、具体的な活用法を解説します。",
    image:
      "https://images.unsplash.com/photo-1587654780291-39c9404d7dd0?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>宇治市では認可外利用が同点時の優先順位に影響</h2>
<p>宇治市の調整指数には、認可外利用による直接的な加点項目は設定されていません。しかし、<span class="highlight">同点時の優先順位</span>で認可外の利用実績がある世帯が優先されるため、実質的に有利になります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>宇治市では同点になりやすいため、認可外の利用実績は実質的な「加点」として機能します。</p>
</div>

<h2>認可外利用で優先されるための条件</h2>
<ul>
<li>就労等の理由で有償で定期的に預けていること</li>
<li>認可外保育施設やベビーシッター等が対象</li>
<li>育児休業中の利用は対象外の場合があるので注意</li>
</ul>

<h2>認可外保育施設の種類</h2>
<table>
<tr><th>施設の種類</th><th>特徴</th></tr>
<tr><td>認可外保育施設</td><td>京都府への届出済みの施設。月額保育料は施設によりさまざま</td></tr>
<tr><td>企業主導型保育施設</td><td>国の助成を受けており保育料が比較的安い</td></tr>
<tr><td>ベビーシッター</td><td>柔軟な利用が可能だが定期的な利用が望ましい</td></tr>
</table>

<h2>宇治市周辺の認可外施設も検討を</h2>
<p>宇治市内の認可外施設が見つからない場合は、隣接する京都市伏見区や城陽市の施設も検討してみましょう。通勤経路上にある施設なら利便性も高いです。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>認可外保育施設の一覧は<a href="https://www.city.uji.kyoto.jp/soshiki/28/" target="_blank" rel="noopener">宇治市こども福祉課の公式サイト</a>でご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 75,
  },
  // ===== 来年度の変更点 (8) =====
  {
    slug: "r8-changes",
    citySlug: "uji",
    title: "宇治市の令和8年度入園　前年度からの変更点まとめ",
    description:
      "宇治市の令和8年度保育利用申込みにおける前年度からの主な変更点をまとめました。",
    image:
      "https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=800&h=400&fit=crop",
    category: "最新情報",
    categoryColor: "purple",
    content: `<h2>令和8年度（2026年度）の主な変更点</h2>
<p>宇治市の令和8年度保育利用申込みでは、いくつかの制度変更があります。前年度との違いを確認しておきましょう。</p>

<h3>1. こども誰でも通園制度の本格実施</h3>
<p>2026年度から「こども誰でも通園制度」が本格的にスタートします。保育園に通っていない0歳6か月〜3歳未満の子どもが対象で、月10時間まで利用可能です。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>「こども誰でも通園制度」は保活の加点には直接つながりませんが、保育園の雰囲気を知る良い機会になります。</p>
</div>

<h3>2. 保育士確保のための加点継続</h3>
<p>保育士として市内の保育施設で勤務する保護者への加点（+10点）が引き続き適用されます。保育人材の確保を目的とした施策です。</p>

<h3>3. 保育料の算定方法</h3>
<p>保育料は4月〜8月分は前年度の市民税額、9月〜翌3月分は当該年度の市民税額で算定されます。年度途中で保育料が変わる点は変更ありません。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>令和8年度の詳細は<a href="https://www.city.uji.kyoto.jp/soshiki/28/" target="_blank" rel="noopener">宇治市こども福祉課の公式サイト</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 70,
  },
  // ===== 人気エリアと入りやすい地域 (9) =====
  {
    slug: "area-guide",
    citySlug: "uji",
    title: "宇治市の人気エリアと入りやすい地域ガイド",
    description:
      "宇治市内のエリアごとの保育園入園難易度の違いや、比較的入りやすい地域を解説します。",
    image:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&h=400&fit=crop",
    category: "エリア情報",
    categoryColor: "teal",
    content: `<h2>宇治市は京都府南部のベッドタウン</h2>
<p>宇治市は人口約18万人、平等院や宇治茶で知られる京都府南部の中核都市です。JR奈良線・京阪宇治線沿線にファミリー層が多く、認可保育園は約30か所あります。</p>

<h2>エリアごとの入園難易度</h2>
<table>
<tr><th>難易度</th><th>エリア</th><th>特徴</th></tr>
<tr><td>激戦</td><td>JR宇治駅・京阪宇治駅周辺</td><td>交通利便性が高くファミリー層に人気</td></tr>
<tr><td>やや激戦</td><td>小倉・伊勢田エリア</td><td>近鉄沿線で京都市内通勤者が多い</td></tr>
<tr><td>標準</td><td>木幡・六地蔵エリア</td><td>京阪・JR両路線が利用可能</td></tr>
<tr><td>比較的入りやすい</td><td>槇島・大久保エリア</td><td>大規模園もあり空きが出やすい</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>六地蔵エリアは京都市伏見区との境界に位置するため、宇治市と京都市の両方の園を検討できます。</p>
</div>

<h2>年齢による違い</h2>
<p>特に<span class="highlight">0〜1歳児クラス</span>の競争が激しいです。受入枠が少ないうえに申込が集中します。3歳児以上は幼稚園という選択肢もあるため、比較的空きが出やすくなります。</p>

<h2>隣接自治体も検討を</h2>
<p>宇治市に隣接する城陽市・久御山町・京都市伏見区の保育園も通勤ルートによっては選択肢になります。広域利用が可能な場合があるので、こども福祉課に相談してみましょう。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>各園の空き状況は<a href="https://www.city.uji.kyoto.jp/soshiki/28/" target="_blank" rel="noopener">宇治市こども福祉課の公式サイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 60,
  },
  // ===== 入園競争の実態/ボーダーライン (10) =====
  {
    slug: "competition-reality",
    citySlug: "uji",
    title: "宇治市の入園競争の実態　ボーダーラインは何点？",
    description:
      "宇治市の保育園入園選考における点数分布と実質的なボーダーラインを解説します。",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>宇治市のボーダーラインの目安</h2>
<p>宇治市の入園選考では、フルタイム共働きの場合、両親とも<span class="highlight">20点</span>がベースラインです。基本指数の合計が40点満点のうち、調整指数を加えた点数で選考されます。</p>

<h2>標準的な点数パターン</h2>
<table>
<tr><th>世帯の状況</th><th>選考点数</th><th>備考</th></tr>
<tr><td>フルタイム共働き＋育休復帰</td><td><span class="highlight">22点</span></td><td>最多パターン（20点+2点）</td></tr>
<tr><td>フルタイム共働き（加点なし）</td><td>20点</td><td>激戦エリアでは厳しい</td></tr>
<tr><td>片方時短（週30h）＋育休復帰</td><td>18点</td><td>16点+2点</td></tr>
<tr><td>きょうだい在園＋フルタイム</td><td>35点</td><td>20点+15点で圧倒的に有利</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>フルタイム共働き＋育休復帰の22点が事実上のボーダーラインです。これ未満だと人気エリアでは厳しい戦いになります。</p>
</div>

<h2>きょうだい加点の威力</h2>
<p>宇治市のきょうだい加点は<span class="highlight">+15点</span>と非常に大きく、2人目以降の入園では大きなアドバンテージになります。ただし、在園中の園を希望することが条件です。</p>

<h2>同点勝負の実態</h2>
<p>22点同士の同点勝負になることが多いです。その場合は以下の要素で判定されます。</p>
<ul>
<li>ひとり親・生活保護世帯が優先</li>
<li>きょうだい在園中の世帯が優先</li>
<li>認可外保育施設の利用実績がある世帯が優先</li>
<li>所得が低い世帯が優先</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>20点（フルタイム・加点なし）では、JR宇治駅周辺などの人気エリアはかなり厳しいです。育休復帰加点を活用して、1点でも上乗せしましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>受入枠と申込数のデータは<a href="https://www.city.uji.kyoto.jp/soshiki/28/" target="_blank" rel="noopener">宇治市こども福祉課の公式サイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 95,
  },
];

registerArticles(articles);
