import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  // ===== 保活の基本 (1) =====
  {
    slug: "hokatsu-schedule",
    citySlug: "kyoto",
    title: "京都市の保活スケジュール　令和8年度4月入園の流れ",
    description:
      "京都市の認可保育園の申込時期・選考の流れ・結果通知の時期をわかりやすく解説。令和8年度4月入園のスケジュールを中心にまとめました。",
    image:
      "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>令和8年度（2026年度）4月入園のスケジュール</h2>
<p>京都市の4月入園は<strong>一次調整</strong>と<strong>二次調整</strong>の2回に分かれています。申込は秋に集中するため、早めの準備が大切です。</p>

<h3>一次調整</h3>
<table>
<tr><th>項目</th><th>日程</th></tr>
<tr><td>案内冊子配布・受付開始</td><td>令和7年10月1日（水）</td></tr>
<tr><td>申込受付期間</td><td>令和7年10月1日〜11月14日（金）必着</td></tr>
<tr><td>不備書類の再提出・希望変更締切</td><td>令和7年12月12日（金）</td></tr>
<tr><td>結果通知発送</td><td>令和8年1月30日（金）</td></tr>
</table>

<h3>二次調整</h3>
<table>
<tr><th>項目</th><th>日程</th></tr>
<tr><td>希望変更届の提出期限</td><td>令和8年2月13日（金）必着</td></tr>
<tr><td>結果通知</td><td>令和8年3月上旬</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>一次調整で保留だった方は申請書の再提出は不要です。希望園の追加・変更がある場合のみ変更届を提出しましょう。</p>
</div>

<h2>いつから動き始めるべき？</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>4月〜6月：情報収集スタート</strong>
<p>京都市の保育施設の種類やエリアごとの特徴を調べましょう。</p>
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
<p>「保育利用申込みの御案内」を区役所・支所または第一希望の園で入手しましょう。</p>
</div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content">
<strong>10月〜11月：申込書類の準備・提出</strong>
<p>就労証明書などを揃え、第一希望の園または区役所・支所に提出します。</p>
</div>
</div>

<h2>途中入園（5月〜3月）の申込</h2>
<p>各月の申込締切は、入園希望月の<span class="highlight">前月の中旬</span>です。詳しくは<a href="https://www.city.kyoto.lg.jp/hagukumi/page/0000274712.html" target="_blank" rel="noopener">京都市公式サイト「保育利用申込みの御案内」</a>をご確認ください。</p>`,
    publishedAt: "2026-03-28",
    popularity: 55,
  },
  // ===== 選考のしくみ (2) =====
  {
    slug: "scoring-system-guide",
    citySlug: "kyoto",
    title: "京都市の入園点数のしくみ　min方式と基本指数・調整指数を解説",
    description:
      "京都市の保育園入園選考で使われる「min方式」「基本指数」「調整指数」のしくみを初めての方にもわかるように解説します。",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>京都市の点数制度の特徴：min方式</h2>
<p>京都市の入園選考は「ポイント制」で行われます。最大の特徴は<span class="highlight">min方式</span>を採用している点です。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>選考に使われる点数 ＝ 父母それぞれの（基本指数＋調整指数）のうち、<strong>低い方</strong>の合計点</p>
</div>

<p>つまり、片方の保護者が満点でも、もう片方が低ければそちらの点数で選考されます。両親とも高い点数を確保することが重要です。</p>

<h2>基本指数とは？</h2>
<p>保護者それぞれの「保育が必要な理由」を点数化したものです。1人あたり最大<span class="highlight">40点</span>です。</p>
<table>
<tr><th>就労時間</th><th>基本指数</th></tr>
<tr><td>週40時間以上</td><td>40点（満点）</td></tr>
<tr><td>週35時間以上40時間未満</td><td>35点</td></tr>
<tr><td>週30時間以上35時間未満</td><td>30点</td></tr>
<tr><td>週20時間以上30時間未満</td><td>20点</td></tr>
<tr><td>週20時間未満</td><td>15点</td></tr>
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
<p>最新の指数表は<a href="https://www.city.kyoto.lg.jp/hagukumi/page/0000274712.html" target="_blank" rel="noopener">京都市公式サイト「保育利用申込みの御案内」</a>でご確認ください。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 65,
  },
  // ===== 点数アップ (3) =====
  {
    slug: "score-up-checklist",
    citySlug: "kyoto",
    title: "京都市で点数を上げるコツ　加点のチェックリスト",
    description:
      "京都市の保育園入園選考で調整指数の加点を最大限に活用する方法を、チェックリスト形式で解説します。",
    image:
      "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>min方式だからこそ両親の点数がカギ</h2>
<p>京都市のmin方式では、父母のうち<span class="highlight">低い方の点数</span>で選考されます。片方だけ高くても意味がないため、両親とも満点に近づけることが最優先です。</p>

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
<tr><td>マイ保育園登録園を希望</td><td>+1点</td><td>マイ保育園に登録した園への申込</td></tr>
</table>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>きょうだい加点（+15点）は在園中の園を希望した場合のみ適用されます。別の園を希望する場合は加点されません。</p>
</div>

<h2>フルタイム共働き＋育休復帰が標準パターン</h2>
<p>父母ともにフルタイム（各40点）のmin方式で<span class="highlight">40点</span>。ここに育休復帰加点（+2点）を加えた<span class="highlight">42点</span>が多くの家庭の到達ラインです。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>入園月に復帰する場合は+2点、翌月復帰は+1点です。復帰時期を調整できるなら、入園月に合わせましょう。</p>
</div>

<h2>減点に注意</h2>
<p>65歳未満の祖父母に児童を預けている場合は<span class="highlight">-1点</span>の減点があります。職場で保育している場合は<span class="highlight">-2点</span>です。該当しないか事前に確認しましょう。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>全項目の詳細は<a href="https://www.city.kyoto.lg.jp/hagukumi/page/0000274712.html" target="_blank" rel="noopener">京都市公式サイト「保育利用申込みの御案内」</a>でご確認ください。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 100,
  },
  // ===== 同点時の優先順位 (4) =====
  {
    slug: "tiebreaker-rules",
    citySlug: "kyoto",
    title: "京都市で同点になったらどうなる？優先順位を解説",
    description:
      "京都市の保育園入園選考で同じ点数になった場合の優先順位のしくみを、わかりやすく解説します。",
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>同点のとき、どうやって決まるの？</h2>
<p>京都市のmin方式では、同じ点数の家庭が並ぶことが少なくありません。同点の場合は「優先順位」で判定されます。</p>

<h3>京都市の主な優先順位</h3>
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

<div class="warn-box">
<p><strong>注意</strong></p>
<p>同点の優先順位の詳細な順位表は、京都市では全項目が公開されていない場合があります。不明な点は区役所・支所の子どもはぐくみ室に直接お問い合わせください。</p>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>京都市のmin方式では点差がつきにくいため、同点勝負になるケースが多いです。認可外の利用実績を作っておくことが、同点時に有利に働きます。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳細は<a href="https://www.city.kyoto.lg.jp/hagukumi/page/0000274712.html" target="_blank" rel="noopener">京都市公式サイト「保育利用申込みの御案内」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 85,
  },
  // ===== 時短勤務と点数 (5) =====
  {
    slug: "jitan-kinmu-score",
    citySlug: "kyoto",
    title: "京都市で時短勤務だと点数はどうなる？min方式の注意点",
    description:
      "京都市の保育園入園選考で時短勤務を取得した場合の点数への影響と、min方式ならではの注意点を解説します。",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>時短勤務で基本指数はどう変わる？</h2>
<p>京都市の基本指数は就労時間に連動しています。時短勤務にすると、就労時間の減少に応じて点数が下がります。</p>

<table>
<tr><th>就労時間</th><th>基本指数</th><th>備考</th></tr>
<tr><td>週40時間以上</td><td>40点</td><td>フルタイム</td></tr>
<tr><td>週35〜40時間未満</td><td>35点</td><td></td></tr>
<tr><td>週30〜35時間未満</td><td>30点</td><td>6時間勤務×5日の場合</td></tr>
<tr><td>週20〜30時間未満</td><td>20点</td><td></td></tr>
</table>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>たとえば1日6時間×週5日＝週30時間の時短勤務だと基本指数は<span class="highlight">30点</span>です。フルタイムの40点から<span class="highlight">10点</span>も下がります。</p>
</div>

<h2>min方式では片方の時短が命取りに</h2>
<p>京都市のmin方式では父母の低い方の点数が選考に使われます。仮に父がフルタイム40点、母が時短30点だとすると、選考に使われるのは<span class="highlight">30点</span>です。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>京都市では、育児短時間勤務制度を利用する場合でも、<strong>取得前（本来）の就労時間</strong>で指数を算定するという規定があります。入園申込時に確認してください。</p>
</div>

<h2>時短勤務でも点数を維持する方法</h2>
<ul>
<li>育児短時間勤務制度で取得前の就労時間が適用されるか確認する</li>
<li>就労証明書に「本来の勤務時間」と「時短中の勤務時間」の両方を記載してもらう</li>
<li>入園後に時短勤務に切り替える場合は、申込時点ではフルタイムの点数で申請可能</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>就労証明書の記載方法は<a href="https://www.city.kyoto.lg.jp/hagukumi/page/0000172423.html" target="_blank" rel="noopener">京都市公式サイト「関係様式」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 90,
  },
  // ===== 落ちたときの選択肢 (6) =====
  {
    slug: "ochita-sentakushi",
    citySlug: "kyoto",
    title: "京都市で保育園に落ちたときの5つの選択肢",
    description:
      "京都市の認可保育園の選考で保留になった場合に検討すべき5つの選択肢を具体的に紹介します。",
    image:
      "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=800&h=400&fit=crop",
    category: "入れなかったら",
    categoryColor: "rose",
    content: `<h2>保留になっても慌てないで。次にできることを確認しましょう</h2>

<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>二次調整を待つ</strong>
<p>一次調整で保留の方は自動的に二次調整の対象です。希望園の追加・変更は2月13日までに変更届を提出しましょう。</p>
</div>
</div>

<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>認可外保育施設を探す</strong>
<p>京都市には認可外保育施設が多数あります。認可外に預けながら翌年度の認可を再申請すれば、同点時の優先順位で有利になります。</p>
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
<p>不承諾通知があれば育休延長の申請が可能です。翌年度に再挑戦する場合は、認可外の利用実績を作っておくと同点時に優先されます。</p>
</div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>京都市は待機児童ゼロを維持していますが、希望通りの園に入れるとは限りません。認可外も含めた幅広い選択肢を持つことが大切です。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>認可外保育施設の一覧は<a href="https://www.city.kyoto.lg.jp/hagukumi/page/0000194028.html" target="_blank" rel="noopener">京都市公式サイト「認可外保育施設について」</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 80,
  },
  // ===== 認可外で加点を得る方法 (7) =====
  {
    slug: "ninkagai-katen",
    citySlug: "kyoto",
    title: "京都市で認可外保育を活用して有利にする方法",
    description:
      "京都市の保育園入園選考で認可外保育施設の利用実績がどう活きるのか、具体的な活用法を解説します。",
    image:
      "https://images.unsplash.com/photo-1587654780291-39c9404d7dd0?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>京都市では認可外利用が同点時の優先順位に影響</h2>
<p>京都市の調整指数には、認可外利用による直接的な加点項目は設定されていません。しかし、<span class="highlight">同点時の優先順位</span>で認可外の利用実績がある世帯が優先されるため、実質的に有利になります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>京都市のmin方式では同点になりやすいため、認可外の利用実績は実質的な「加点」として機能します。</p>
</div>

<h2>認可外利用で加点を得るための条件</h2>
<ul>
<li>就労等の理由で<span class="highlight">週3日以上</span>の頻度で有償で預けていること（令和8年度から）</li>
<li>認可外保育施設やベビーシッター等が対象</li>
<li>育児休業中の利用は対象外の場合があるので注意</li>
</ul>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>令和8年度から、認可外利用による加点には<strong>週3日以上の頻度</strong>が必要になりました。週2日以下の場合は加点対象外です。</p>
</div>

<h2>認可外保育施設の種類</h2>
<table>
<tr><th>施設の種類</th><th>特徴</th></tr>
<tr><td>認可外保育施設</td><td>京都市への届出済みの施設。月額保育料は施設によりさまざま</td></tr>
<tr><td>企業主導型保育施設</td><td>国の助成を受けており保育料が比較的安い</td></tr>
<tr><td>ベビーシッター</td><td>柔軟な利用が可能だが週3日以上の頻度が必要</td></tr>
</table>

<h2>マイ保育園制度も活用しよう</h2>
<p>京都市には「マイ保育園・マイこども園」制度があります。登録した園への申込時に<span class="highlight">+1点</span>の加点が得られます。登録は無料なので、希望園が決まったら早めに登録しましょう。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>認可外保育施設の一覧は<a href="https://www.city.kyoto.lg.jp/hagukumi/page/0000194028.html" target="_blank" rel="noopener">京都市公式サイト</a>でご確認ください。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 75,
  },
  // ===== 来年度の変更点 (8) =====
  {
    slug: "r8-changes",
    citySlug: "kyoto",
    title: "京都市の令和8年度入園　前年度からの変更点まとめ",
    description:
      "京都市の令和8年度保育利用申込みにおける前年度からの主な変更点をまとめました。",
    image:
      "https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=800&h=400&fit=crop",
    category: "最新情報",
    categoryColor: "purple",
    content: `<h2>令和8年度（2026年度）の主な変更点</h2>
<p>京都市の令和8年度保育利用申込みでは、いくつかの制度変更があります。前年度との違いを確認しておきましょう。</p>

<h3>1. 認可外利用の加点に「週3日以上」の頻度要件</h3>
<p>認可外保育施設やベビーシッターの利用による加点は、令和8年度申込から<span class="highlight">週3日以上の頻度</span>が必要です。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>週2日以下の頻度では、認可外施設の利用記載があっても加点の対象になりません。</p>
</div>

<h3>2. マイ保育園・マイこども園制度が拡充</h3>
<p>令和7年度に始まった「マイ保育園・マイこども園」制度が2年目を迎え、登録園が大幅に増えました。登録園への申込時に<span class="highlight">+1点</span>の加点が得られます。</p>

<h3>3. こども誰でも通園制度の拡大</h3>
<p>2026年度の本格実施を見据え、「こども誰でも通園制度」の試行園が増加しています。保育園に通っていない0歳6か月〜3歳未満の子どもが対象で、月10時間まで利用可能です。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>「こども誰でも通園制度」は保活の加点には直接つながりませんが、保育園の雰囲気を知る良い機会になります。</p>
</div>

<h3>4. 保育料の算定方法</h3>
<p>保育料は4月〜8月分は前年度の市民税額、9月〜翌3月分は当該年度の市民税額で算定されます。年度途中で保育料が変わる点は変更ありません。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>令和8年度の詳細は<a href="https://www.city.kyoto.lg.jp/hagukumi/page/0000274712.html" target="_blank" rel="noopener">京都市公式サイト「令和8年度保育利用申込みの御案内」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 70,
  },
  // ===== 人気エリアと入りやすい地域 (9) =====
  {
    slug: "area-guide",
    citySlug: "kyoto",
    title: "京都市の人気エリアと入りやすい地域ガイド",
    description:
      "京都市内の区ごとの保育園入園難易度の違いや、比較的入りやすい地域を解説します。",
    image:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&h=400&fit=crop",
    category: "エリア情報",
    categoryColor: "teal",
    content: `<h2>京都市は待機児童ゼロ、でも地域差あり</h2>
<p>京都市は<span class="highlight">9年以上連続</span>で待機児童ゼロを維持しています。しかし「希望通りの園に入れるか」は別問題で、区によって入園の難しさに差があります。</p>

<h2>区ごとの入園難易度</h2>
<table>
<tr><th>難易度</th><th>区名</th><th>特徴</th></tr>
<tr><td>激戦</td><td>右京区・西京区</td><td>ファミリー層が多く人気園が集中</td></tr>
<tr><td>やや激戦</td><td>中京区・左京区</td><td>小規模保育も定員がほぼ満員</td></tr>
<tr><td>標準</td><td>北区・上京区・下京区</td><td>園によって差がある</td></tr>
<tr><td>比較的入りやすい</td><td>南区・伏見区・山科区</td><td>大規模園もあり空きが出やすい</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>洛西エリア（西京区の一部）は比較的入りやすいとの情報もありますが、車がないと通園が不便な地域もあります。</p>
</div>

<h2>年齢による違い</h2>
<p>特に<span class="highlight">0〜1歳児クラス</span>の競争が激しいです。受入枠が少ないうえに申込が集中します。3歳児以上は幼稚園という選択肢もあるため、比較的空きが出やすくなります。</p>

<h2>隠れ待機児童に注意</h2>
<p>京都市の「待機児童ゼロ」はあくまで統計上の数字です。希望する園に入れず保留となっている「隠れ待機児童」は<span class="highlight">約400人</span>存在するとされています。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>年度途中の入園は受入枠が限られるため、4月入園よりも難しくなります。途中入園を検討する場合は早めに窓口に相談しましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>各園の空き状況は<a href="https://www.city.kyoto.lg.jp/hagukumi/page/0000227761.html" target="_blank" rel="noopener">京都市公式サイト「利用状況及び受入枠」</a>で公開されています。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 60,
  },
  // ===== 入園競争の実態/ボーダーライン (10) =====
  {
    slug: "competition-reality",
    citySlug: "kyoto",
    title: "京都市の入園競争の実態　ボーダーラインは何点？",
    description:
      "京都市の保育園入園選考における点数分布と実質的なボーダーラインを、min方式の特性とあわせて解説します。",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>京都市のボーダーラインはmin方式で見る</h2>
<p>京都市の入園選考はmin方式のため、父母のうち低い方の点数が選考に使われます。フルタイム共働きの場合、両親とも<span class="highlight">40点</span>がベースラインです。</p>

<h2>標準的な点数パターン</h2>
<table>
<tr><th>世帯の状況</th><th>選考点数</th><th>備考</th></tr>
<tr><td>フルタイム共働き＋育休復帰</td><td><span class="highlight">42点</span></td><td>最多パターン（40点+2点）</td></tr>
<tr><td>フルタイム共働き（加点なし）</td><td>40点</td><td>激戦区では厳しい</td></tr>
<tr><td>片方時短（週30h）＋育休復帰</td><td>32点</td><td>30点+2点</td></tr>
<tr><td>きょうだい在園＋フルタイム</td><td>55点</td><td>40点+15点で圧倒的に有利</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>フルタイム共働き＋育休復帰の42点が事実上のボーダーラインです。これ未満だと激戦区では厳しい戦いになります。</p>
</div>

<h2>きょうだい加点の威力</h2>
<p>京都市のきょうだい加点は<span class="highlight">+15点</span>と非常に大きく、2人目以降の入園では大きなアドバンテージになります。ただし、在園中の園を希望することが条件です。</p>

<h2>同点勝負の実態</h2>
<p>min方式では点差がつきにくいため、42点同士の同点勝負になることが多いです。その場合は以下の要素で判定されます。</p>
<ul>
<li>ひとり親・生活保護世帯が優先</li>
<li>きょうだい在園中の世帯が優先</li>
<li>認可外保育施設の利用実績がある世帯が優先</li>
<li>所得が低い世帯が優先</li>
</ul>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>40点（フルタイム・加点なし）では、人気園はかなり厳しいです。育休復帰加点やマイ保育園加点を活用して、1点でも上乗せしましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>受入枠と申込数のデータは<a href="https://www.city.kyoto.lg.jp/hagukumi/page/0000227761.html" target="_blank" rel="noopener">京都市公式サイト</a>で公開されています。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 95,
  },
  // ===== 園えらび (11) =====
  {
    slug: "nursery-visit-guide",
    citySlug: "kyoto",
    title: "京都市の保育園見学ガイド　チェックリストと質問例",
    description:
      "京都市で保育園見学をする際の予約方法・見るべきポイント・先生への質問例をまとめました。園えらびに迷う方必見です。",
    image:
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=400&fit=crop",
    category: "園えらび",
    categoryColor: "purple",
    content: `<h2>保育園見学はいつから始める？</h2>
<p>京都市の4月入園申込は10月開始です。見学は<span class="highlight">6月〜9月</span>に集中して行うのがおすすめ。人気園は見学枠が埋まりやすいため、早めの予約が大切です。</p>

<h2>見学の予約方法</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>電話で予約</strong>
<p>園に直接電話して見学希望日を伝えます。「見学したい」と言えばOKです。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>見学日は平日午前が基本</strong>
<p>子どもたちの活動を見られる10時〜11時がベスト。園庭遊びや給食前の様子を確認できます。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>複数園を比較する</strong>
<p>最低3園は見学しましょう。比較することで「自分が大事にしたいこと」が見えてきます。</p>
</div>
</div>

<h2>見学時のチェックリスト</h2>
<table>
<tr><th>項目</th><th>チェックポイント</th></tr>
<tr><td>安全面</td><td>柵・施錠・プール監視体制</td></tr>
<tr><td>衛生面</td><td>トイレ・おむつ交換台・手洗い場の清潔さ</td></tr>
<tr><td>保育士の様子</td><td>子どもへの声かけが穏やかか、笑顔があるか</td></tr>
<tr><td>園庭</td><td>広さ・遊具の種類。園庭なしなら散歩先の公園を確認</td></tr>
<tr><td>給食</td><td>自園調理か外注か、アレルギー対応の有無</td></tr>
<tr><td>持ち物</td><td>布おむつか紙おむつか、布団持参の有無</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>京都市は11区あり園の雰囲気も多様です。口コミだけでなく、自分の目で確かめることが後悔しない園えらびにつながります。</p>
</div>

<h2>先生に聞くべき質問</h2>
<ul>
<li>慣らし保育の期間はどのくらいですか？</li>
<li>発熱時のお迎え基準は何度ですか？</li>
<li>延長保育は何時まで対応していますか？</li>
<li>保護者参加の行事はどのくらいありますか？</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>京都市の保育園一覧は<a href="https://www.city.kyoto.lg.jp/hagukumi/page/0000227761.html" target="_blank" rel="noopener">こども若者はぐくみ局の公式サイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 45,
  },
  // ===== データ分析 (12) =====
  {
    slug: "zero-vs-one-year",
    citySlug: "kyoto",
    title: "京都市、0歳入園と1歳入園を数字で比較",
    description:
      "京都市の保育園に0歳で入るか1歳で入るか迷っている方へ。受入枠・競争率・育休給付金への影響をデータで比較します。",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop",
    category: "データ分析",
    categoryColor: "teal",
    content: `<h2>0歳入園と1歳入園、どちらが有利？</h2>
<p>京都市でも全国と同様に<strong>1歳児クラス</strong>の競争が最も激しくなっています。0歳入園と1歳入園をデータで比較してみましょう。</p>

<h2>受入枠の違い</h2>
<table>
<tr><th></th><th>0歳児クラス</th><th>1歳児クラス</th></tr>
<tr><td>定員の目安</td><td>6〜9名</td><td>新規枠は数名（持ち上がりが多い）</td></tr>
<tr><td>競争率</td><td>比較的入りやすい</td><td>最も厳しい</td></tr>
<tr><td>対象生年月日</td><td>令和7年4月2日〜令和8年4月1日生</td><td>令和6年4月2日〜令和7年4月1日生</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>京都市のmin方式では0歳入園でも1歳入園でも点数の計算方法は同じです。ただし0歳の方が枠が多く、競争率が低い傾向にあります。</p>
</div>

<h2>育休給付金への影響</h2>
<table>
<tr><th>項目</th><th>0歳4月入園</th><th>1歳4月入園</th></tr>
<tr><td>育休期間</td><td>産後約6〜10か月</td><td>約1年〜1年半</td></tr>
<tr><td>給付金受給期間</td><td>短くなる</td><td>フル受給可能</td></tr>
<tr><td>給付金の差額目安</td><td colspan="2">月額約15〜20万円 x 差分月数</td></tr>
</table>

<h2>右京区・西京区の1歳児は特に注意</h2>
<p>京都市の激戦区である右京区・西京区では、1歳児クラスの受入枠がほぼ埋まるケースがあります。42点でも入れない園が出てくるため、0歳入園を検討する価値があります。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>各園の年齢別受入枠は<a href="https://www.city.kyoto.lg.jp/hagukumi/page/0000227761.html" target="_blank" rel="noopener">京都市の受入枠一覧</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 65,
  },
  // ===== 制度を知る (13) =====
  {
    slug: "single-parent-guide",
    citySlug: "kyoto",
    title: "京都市のひとり親家庭向け保活ガイド　優先制度と支援策",
    description:
      "京都市でひとり親世帯が保育園入園で優遇される仕組みと、利用できる支援制度をまとめました。",
    image:
      "https://images.unsplash.com/photo-1531983412531-1f49a365ffed?w=800&h=400&fit=crop",
    category: "制度を知る",
    categoryColor: "rose",
    content: `<h2>ひとり親世帯は入園選考で優先される</h2>
<p>京都市の入園選考では、ひとり親世帯に対して<strong>加点</strong>があります。min方式の基本点数に加点が上乗せされるため、同点の場合に有利になります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>ひとり親世帯の加点は京都市の利用調整基準に明記されています。申込時に「ひとり親であること」を証明する書類（児童扶養手当証書のコピーなど）を提出しましょう。</p>
</div>

<h2>利用できる支援制度</h2>
<table>
<tr><th>制度</th><th>内容</th></tr>
<tr><td>保育料の軽減</td><td>市民税非課税世帯は保育料無料。課税世帯も軽減あり</td></tr>
<tr><td>児童扶養手当</td><td>月額最大45,500円（令和7年度）</td></tr>
<tr><td>ひとり親家庭医療費助成</td><td>医療費の自己負担が軽減</td></tr>
<tr><td>母子父子寡婦福祉資金</td><td>就学・就職・転宅等の資金貸付</td></tr>
</table>

<h2>申込時の注意点</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>証明書類を早めに準備</strong>
<p>児童扶養手当証書・戸籍謄本など、ひとり親であることを証明する書類が必要です。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>就労証明書の確認</strong>
<p>就労時間が基本点数に直結します。パート・アルバイトでも就労証明書は必要です。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>窓口で相談する</strong>
<p>各区のこども若者はぐくみ室で個別に相談できます。加点の対象になるか事前に確認しましょう。</p>
</div>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>ひとり親家庭向けの支援制度は<a href="https://www.city.kyoto.lg.jp/hagukumi/" target="_blank" rel="noopener">京都市こども若者はぐくみ局</a>のサイトで確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 50,
  },
  // ===== 保活の基本 (14) =====
  {
    slug: "ikukyu-timing",
    citySlug: "kyoto",
    title: "京都市で育休中に保活、復帰タイミングはいつがベスト？",
    description:
      "京都市で育休中に保活をする際の復帰タイミングと点数への影響を解説。育休延長のリスクも合わせてお伝えします。",
    image:
      "https://images.unsplash.com/photo-1493894473891-10fc1e5dbd22?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>育休からの復帰タイミングが点数に影響する</h2>
<p>京都市のmin方式では、育休中に申し込むと<strong>育休復帰加点（+2点）</strong>が付きます。フルタイム共働きなら40点＋2点＝42点がボーダーラインです。</p>

<h2>復帰タイミングの選択肢</h2>
<table>
<tr><th>パターン</th><th>メリット</th><th>デメリット</th></tr>
<tr><td>0歳4月で復帰</td><td>入園しやすい、早期復帰でキャリア維持</td><td>育休給付金が短い、体力的に大変</td></tr>
<tr><td>1歳4月で復帰</td><td>育休を1年取れる、給付金フル受給</td><td>1歳児クラスは激戦</td></tr>
<tr><td>1歳途中で復帰</td><td>育休延長が不要</td><td>途中入園は枠が少ない</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>京都市では入園月の翌月末までに復職することが条件です。4月入園なら5月末までに復帰する必要があります。</p>
</div>

<h2>育休延長の注意点</h2>
<p>1歳で入園できなかった場合、育休を延長できます。しかし令和7年度から全国的に<strong>育休延長の審査が厳格化</strong>されています。</p>

<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>「落選狙い」は危険</strong>
<p>わざと競争率の高い園だけ希望して不承諾通知を得る手法は、制度改正で通用しにくくなっています。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>入園意思の確認が強化</strong>
<p>自治体が「本当に入園する意思があるか」を確認するケースが増えています。</p>
</div>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>育休延長に関する最新の運用は<a href="https://www.city.kyoto.lg.jp/hagukumi/" target="_blank" rel="noopener">京都市こども若者はぐくみ局</a>に確認してください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 55,
  },
  // ===== 園えらび (15) =====
  {
    slug: "ninkagai-selection",
    citySlug: "kyoto",
    title: "京都市の認可外保育施設の選び方ガイド",
    description:
      "京都市で認可外保育施設を検討する方向けに、施設の種類・費用の目安・選ぶ際のチェックポイントを解説します。",
    image:
      "https://images.unsplash.com/photo-1576495199011-eb94736d05d6?w=800&h=400&fit=crop",
    category: "園えらび",
    categoryColor: "purple",
    content: `<h2>京都市の認可外保育施設とは</h2>
<p>認可外保育施設は、認可保育所の基準を満たしていないものの、京都市に届出をして運営されている保育施設です。認可園に入れなかった場合の受け皿として、また認可園申込時の加点を得るために利用されることがあります。</p>

<h2>認可外施設の種類</h2>
<table>
<tr><th>種類</th><th>特徴</th></tr>
<tr><td>企業主導型保育</td><td>企業が設置。従業員枠と地域枠がある</td></tr>
<tr><td>認可外保育室</td><td>小規模で家庭的な雰囲気。0〜2歳が多い</td></tr>
<tr><td>ベビーホテル</td><td>夜間・休日対応。一時利用も可能</td></tr>
<tr><td>院内保育所</td><td>病院等の職員向け。地域枠があれば利用可能</td></tr>
</table>

<h2>費用の目安</h2>
<p>京都市内の認可外保育施設の保育料は<span class="highlight">月額5万〜10万円</span>程度が一般的です。入園金が別途かかる施設もあります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>0〜2歳の非課税世帯は月額42,000円まで、3〜5歳は月額37,000円まで無償化の対象になる場合があります。</p>
</div>

<h2>選ぶ際のチェックリスト</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>京都市への届出があるか</strong>
<p>届出施設一覧はこども若者はぐくみ局の公式サイトで公開されています。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>立入調査の結果を確認</strong>
<p>京都市は年1回、認可外施設への立入調査を実施しています。改善指導の有無を確認しましょう。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>保育士の配置人数</strong>
<p>有資格者の割合が高いほど安心です。見学時に聞いてみましょう。</p>
</div>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>届出施設一覧は<a href="https://www.city.kyoto.lg.jp/hagukumi/" target="_blank" rel="noopener">京都市こども若者はぐくみ局</a>のサイトで確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 40,
  },
  // ===== 制度を知る (16) =====
  {
    slug: "futago-hokatsu",
    citySlug: "kyoto",
    title: "京都市で双子・多胎児の保活、知っておきたい優遇制度",
    description:
      "京都市で双子や三つ子を保育園に入れる際の加点制度や同時入園の優先措置、多胎児ならではの注意点を解説します。",
    image:
      "https://images.unsplash.com/photo-1609220136736-443140cffec6?w=800&h=400&fit=crop",
    category: "制度を知る",
    categoryColor: "rose",
    content: `<h2>双子・多胎児の保活は特有の大変さがある</h2>
<p>双子や三つ子の場合、1人分の保活の大変さが2倍・3倍になります。「2人とも同じ園に入れたい」という希望が強い一方で、空き枠が2名以上ある園は限られます。</p>

<h2>京都市の多胎児向け優遇措置</h2>
<table>
<tr><th>項目</th><th>内容</th></tr>
<tr><td>きょうだい同時申込</td><td>同時に申し込む場合、同一園への入園が優先的に配慮される</td></tr>
<tr><td>きょうだい加点</td><td>すでに上の子が在園中なら+15点</td></tr>
<tr><td>保育料の軽減</td><td>同時在園の場合、2人目は半額、3人目以降は無料</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>双子の場合は2人とも新規入園のため、きょうだい在園の加点（+15点）は使えません。ただし「同時入園希望」として配慮される場合があります。窓口で必ず相談しましょう。</p>
</div>

<h2>双子の保活を成功させるコツ</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>希望園は定員の大きい園を中心に</strong>
<p>2名以上の空きが出やすい大規模園を優先的に希望園に入れましょう。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>「別々の園でもOK」という覚悟も</strong>
<p>同じ園に入れなかった場合の送迎ルートをシミュレーションしておきましょう。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>0歳4月入園を検討</strong>
<p>1歳児クラスより0歳児クラスの方が枠が多く、2名同時入園の可能性が高まります。</p>
</div>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>多胎児への配慮措置については、各区のこども若者はぐくみ室に直接お問い合わせください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 35,
  },
  // ===== 保活の基本 (17) =====
  {
    slug: "hoiku-mama-interview",
    citySlug: "kyoto",
    title: "京都市の保活体験談　先輩ママに聞く成功と失敗のリアル",
    description:
      "京都市で保活を経験した先輩ママの声を集めました。成功パターンと失敗パターンから学ぶ、リアルな保活事情をお伝えします。",
    image:
      "https://images.unsplash.com/photo-1491013516836-7db643ee125a?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>先輩ママの保活体験を紹介</h2>
<p>京都市で実際に保活を経験した先輩ママの声をもとに、成功パターンと失敗パターンをまとめました。（個人が特定されないよう内容を一部編集しています）</p>

<h2>成功パターン</h2>
<h3>Aさん（右京区・1歳4月入園）</h3>
<div class="point-box">
<p><strong>42点で人気園に内定</strong></p>
<p>フルタイム共働き＋育休復帰の42点で、第2希望の園に内定。「第1希望だけでなく、通える範囲の園を8園書いたのが良かった」と振り返ります。見学で雰囲気を確認した園だけを書いたので、どこに決まっても安心でした。</p>
</div>

<h3>Bさん（伏見区・0歳4月入園）</h3>
<div class="point-box">
<p><strong>0歳入園で余裕をもって入園</strong></p>
<p>1歳は厳しいと聞き、0歳4月で申込。第1希望の園に内定。「育休が短くなるのは寂しかったけど、希望の園に入れて結果的に良かった」とのこと。</p>
</div>

<h2>失敗パターン</h2>
<h3>Cさん（中京区・1歳4月入園）</h3>
<div class="info-box">
<p><strong>希望園を3つしか書かず保留に</strong></p>
<p>「この3園以外は考えられない」と希望を絞った結果、一次で保留に。二次で希望を追加して入園できたものの、慣らし保育の期間が短くなって大変だったそうです。</p>
</div>

<h3>Dさん（左京区・1歳4月入園）</h3>
<div class="info-box">
<p><strong>時短勤務で点数が下がってしまった</strong></p>
<p>就労証明書に時短勤務（週30時間）の時間を記載したところ、min方式で30点に。42点のボーダーに届かず、希望園すべて保留でした。「フルタイムの契約で出せばよかった」と悔やんでいます。</p>
</div>

<h2>体験談から学ぶポイント</h2>
<ul>
<li>希望園はできるだけ多く書く（最低5園以上推奨）</li>
<li>就労証明書の記載内容は点数に直結するので慎重に</li>
<li>見学は妊娠中から始めると余裕がある</li>
<li>激戦区なら0歳入園も選択肢に入れる</li>
</ul>`,
    publishedAt: "2026-04-07",
    popularity: 60,
  },
  // ===== データ分析 (18) =====
  {
    slug: "waiting-child-data",
    citySlug: "kyoto",
    title: "京都市の待機児童データ分析　数字の裏側を読み解く",
    description:
      "京都市は待機児童ゼロを維持していますが、隠れ待機児童は約400人。統計の読み方と実態を解説します。",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop",
    category: "データ分析",
    categoryColor: "teal",
    content: `<h2>京都市は待機児童ゼロ、でも油断禁物</h2>
<p>京都市は<span class="highlight">9年以上連続</span>で待機児童ゼロを達成しています。しかしこの数字には注意が必要です。</p>

<h2>「待機児童」と「保留児童」の違い</h2>
<table>
<tr><th>区分</th><th>定義</th><th>京都市の人数</th></tr>
<tr><td>待機児童</td><td>国の定義に基づく。特定園のみ希望・育休中などは除外</td><td>0人</td></tr>
<tr><td>保留児童（隠れ待機）</td><td>希望する園に入れずに待っている実数</td><td>約400人</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>「待機児童ゼロ＝誰でも入れる」ではありません。特に人気エリアの1歳児クラスは、保留になるケースが一定数あります。</p>
</div>

<h2>区別の保留児童の傾向</h2>
<table>
<tr><th>区</th><th>傾向</th></tr>
<tr><td>右京区</td><td>ファミリー層が多く保留が出やすい</td></tr>
<tr><td>西京区</td><td>洛西ニュータウン周辺で需要が高い</td></tr>
<tr><td>中京区</td><td>都心部で小規模園も満員になりやすい</td></tr>
<tr><td>伏見区・山科区</td><td>園の数が多く比較的余裕がある</td></tr>
</table>

<h2>データを保活に活かすには</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>各園の受入枠と申込数を比較</strong>
<p>京都市公式サイトで公開されている受入枠データを見て、倍率の低い園を探しましょう。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>年齢別に空き状況をチェック</strong>
<p>0歳は空きがあっても1歳は満員ということがよくあります。年齢ごとにチェックしましょう。</p>
</div>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新の受入枠・空き情報は<a href="https://www.city.kyoto.lg.jp/hagukumi/page/0000227761.html" target="_blank" rel="noopener">京都市公式サイト</a>で公開されています。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 55,
  },
  // ===== 園えらび (19) =====
  {
    slug: "small-nursery-guide",
    citySlug: "kyoto",
    title: "京都市の小規模保育事業とは？メリットと3歳の壁対策",
    description:
      "京都市の小規模保育事業の特徴・メリット・デメリットと、卒園後の3歳の壁への対策を解説します。",
    image:
      "https://images.unsplash.com/photo-1577896852618-01da1dd79f7e?w=800&h=400&fit=crop",
    category: "園えらび",
    categoryColor: "purple",
    content: `<h2>小規模保育事業とは</h2>
<p>小規模保育事業は<strong>0〜2歳児</strong>を対象とした定員6〜19名の保育施設です。京都市内には多数の小規模保育事業所があり、認可保育所と同じ利用調整で入園します。</p>

<h2>小規模保育のメリット</h2>
<table>
<tr><th>メリット</th><th>内容</th></tr>
<tr><td>少人数保育</td><td>保育士の目が行き届きやすい</td></tr>
<tr><td>入りやすい</td><td>認可園より空きがある場合が多い</td></tr>
<tr><td>アットホーム</td><td>家庭的な雰囲気で初めての集団生活に馴染みやすい</td></tr>
<tr><td>駅近が多い</td><td>ビルのテナント等に設置され、通勤途中に預けやすい</td></tr>
</table>

<h2>「3歳の壁」とは？</h2>
<p>小規模保育は2歳児クラスまでのため、3歳になると転園が必要です。これを「3歳の壁」と呼びます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>京都市では小規模保育の卒園児に対して、連携先の認可保育所が設定されている場合があります。入園前に連携先を確認しておくと安心です。</p>
</div>

<h2>3歳の壁を乗り越えるには</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>連携先の園を確認</strong>
<p>入園前に「卒園後の連携先はどこか」を園に確認しましょう。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>幼稚園（認定こども園）も選択肢に</strong>
<p>3歳以降は認定こども園の保育所部分に移ることも可能です。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>きょうだい加点を活用</strong>
<p>小規模保育に在園中の子がいると、きょうだいの認可園申込時に加点が付く場合があります。</p>
</div>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>小規模保育の施設一覧は<a href="https://www.city.kyoto.lg.jp/hagukumi/page/0000227761.html" target="_blank" rel="noopener">京都市公式サイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 50,
  },
  // ===== 点数アップ (20) =====
  {
    slug: "secondchild-hokatsu",
    citySlug: "kyoto",
    title: "京都市で2人目の保活、きょうだい加点+15を最大活用する方法",
    description:
      "京都市の保育園入園で強力なきょうだい加点+15点を最大限に活かすための戦略と注意点を解説します。",
    image:
      "https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>きょうだい加点は京都市最強の加点</h2>
<p>京都市のきょうだい加点は<span class="highlight">+15点</span>。min方式の基本点数に上乗せされるため、2人目の保活は圧倒的に有利です。</p>

<h2>きょうだい加点の条件</h2>
<table>
<tr><th>条件</th><th>内容</th></tr>
<tr><td>対象</td><td>上の子が認可保育所・認定こども園・小規模保育に在園中</td></tr>
<tr><td>加点</td><td>+15点</td></tr>
<tr><td>希望園の条件</td><td>上の子が在園している園を希望に含めること</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>フルタイム共働き40点＋育休復帰2点＋きょうだい加点15点＝<strong>57点</strong>。この点数であれば、ほぼ確実に希望園に入園できます。</p>
</div>

<h2>きょうだい加点を最大活用する戦略</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>上の子と同じ園を第1希望に</strong>
<p>きょうだい加点の条件である「在園中の園を希望」を必ず満たしましょう。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>上の子が卒園する前に申し込む</strong>
<p>上の子が卒園してしまうときょうだい加点がなくなります。年齢差に注意しましょう。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>保育料の軽減も確認</strong>
<p>同時在園の場合、2人目は保育料が半額になります（3人目以降は無料）。</p>
</div>
</div>

<h2>注意点：上の子が小規模保育の場合</h2>
<p>上の子が小規模保育に通っている場合、2歳児クラスで卒園するため、下の子の保活時にはきょうだい加点がなくなる可能性があります。年齢差とタイミングを計算しておきましょう。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>きょうだい加点の詳細は<a href="https://www.city.kyoto.lg.jp/hagukumi/page/0000227761.html" target="_blank" rel="noopener">京都市の利用調整基準</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 55,
  },

  // ===== 追加記事 2026-04-07 =====
  {
    slug: "self-employed-score",
    citySlug: "kyoto",
    title: "京都市で自営業・フリーランスが保育園に入るための点数戦略",
    description: "京都市で自営業やフリーランスの方が保育園入園の選考で不利にならないための点数の仕組みと対策を解説します。",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>自営業・フリーランスの基本指数</h2>
<p>京都市では自営業・フリーランスも会社員と同じ基本指数表が適用されます。週の就労時間が基準を満たせば、<span class="highlight">最大40点</span>を取得できます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>自営業の場合、「就労状況申告書」と「開業届の写し」または「確定申告書の写し」の提出が必要です。</p>
</div>

<h2>点数を最大化するコツ</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content"><strong>就労時間の記録を残す</strong><p>週40時間以上の就労実態を証明できるように業務日報等を残しましょう。</p></div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content"><strong>開業届を出しておく</strong><p>税務署への開業届は就労証明の基本です。</p></div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content"><strong>確定申告書を用意する</strong><p>直近の確定申告書は事業実態の証明になります。</p></div>
</div>

<h2>京都市のmin方式に注意</h2>
<p>京都市はmin方式（父母の低い方の点数で選考）のため、自営業の方は配偶者の点数も重要です。片方だけ高くても有利にはなりません。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>必要書類の詳細は<a href="https://www.city.kyoto.lg.jp/hagukumi/page/0000274712.html" target="_blank" rel="noopener">京都市公式サイト</a>でご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 40,
  },
  {
    slug: "naishoku-score",
    citySlug: "kyoto",
    title: "京都市で内職・在宅ワークの場合の保育園入園点数",
    description: "京都市で内職や在宅ワークをしている場合の保育園入園点数の扱いと申請時の注意点を解説します。",
    image: "https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>在宅ワーク・内職の点数</h2>
<p>京都市では在宅ワーク（居宅内労働）も居宅外労働と<strong>同じ基本指数表</strong>が適用されます。週の就労時間で点数が決まります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>在宅ワークだからといって点数が下がることはありません。ただし就労実態の証明が重要です。</p>
</div>

<h2>必要な証明書類</h2>
<table>
<tr><th>働き方</th><th>必要書類</th></tr>
<tr><td>業務委託・フリーランス</td><td>就労状況申告書＋開業届＋契約書など</td></tr>
<tr><td>内職</td><td>就労状況申告書＋内職証明書</td></tr>
<tr><td>在宅勤務（会社員）</td><td>就労証明書（在宅勤務の旨を記載）</td></tr>
</table>

<h2>注意点</h2>
<ul>
<li>就労時間は実働時間で申告してください</li>
<li>就労実態と申告内容に相違がある場合、利用取消になる可能性があります</li>
</ul>

<div class="info-box">
<p><strong>注意</strong></p>
<p>正確な申告を心がけましょう。不明点は区役所・支所の子どもはぐくみ室にお問い合わせください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 35,
  },
  {
    slug: "kyushoku-hokatsu",
    citySlug: "kyoto",
    title: "京都市で求職中に保育園に申し込む方法と点数の目安",
    description: "京都市で求職活動中でも保育園に申し込めます。求職中の点数や入園後の就労開始期限を解説します。",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>求職中でも申し込める</h2>
<p>京都市では「求職活動中」も保育を必要とする事由として認められ、認可保育園に申し込むことができます。</p>

<h2>求職中の基本指数</h2>
<p>求職活動中の基本指数は低く設定されており、フルタイム就労（40点）と比べると大きな差があります。激戦区での入園は厳しい場合が多いです。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>求職中の場合、入園後<strong>90日以内</strong>に就労を開始する必要があります。期限内に就労開始されない場合、退園になる可能性があります。</p>
</div>

<h2>求職中から点数を上げる方法</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content"><strong>先に就職先を決める</strong><p>内定があれば「就労内定」として就労同等の点数が適用されます。</p></div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content"><strong>認可外に預けて就労開始</strong><p>認可外利用＋就労で点数を上げてから認可に申し込む方法もあります。</p></div>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳細は<a href="https://www.city.kyoto.lg.jp/hagukumi/page/0000274712.html" target="_blank" rel="noopener">京都市公式サイト</a>でご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 40,
  },
  {
    slug: "tenshoku-timing",
    citySlug: "kyoto",
    title: "京都市で転職するタイミングと保育園への影響",
    description: "転職が保育園の入園選考や在園継続に与える影響、京都市でのベストな転職タイミングを解説します。",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>転職が入園選考に与える影響</h2>
<p>入園申込時の就労証明書は現在の勤務先のものが必要です。転職のタイミングによっては点数に影響します。</p>

<h2>申込前に転職する場合</h2>
<ul>
<li>新しい勤務先の就労証明書を提出すれば問題ありません</li>
<li>試用期間中でも就労証明書は発行可能です</li>
</ul>

<h2>入園後に転職する場合</h2>
<div class="point-box">
<p><strong>ポイント</strong></p>
<p>入園後の転職は可能ですが、転職後の就労証明書を速やかに区役所・支所に提出してください。退職から再就職まで<strong>90日以内</strong>に就労を開始する必要があります。</p>
</div>

<h2>注意点</h2>
<ul>
<li>就労時間が大幅に減ると保育の必要性が認められなくなる可能性があります</li>
<li>京都市はmin方式のため、転職で片方の点数が下がると世帯の選考点数に直結します</li>
</ul>

<div class="info-box">
<p><strong>注意</strong></p>
<p>転職に伴う手続きの詳細は区役所・支所の子どもはぐくみ室にご相談ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 35,
  },
  {
    slug: "age2-nyuen",
    citySlug: "kyoto",
    title: "京都市で2歳児クラスから入園するメリットと注意点",
    description: "京都市で2歳児クラスから保育園に入るメリット・デメリットと競争率の傾向を解説します。",
    image: "https://images.unsplash.com/photo-1587654780291-39c9404d7dd0?w=800&h=400&fit=crop",
    category: "年齢別対策",
    categoryColor: "amber",
    content: `<h2>2歳児クラスの特徴</h2>
<p>2歳児クラスは4月1日時点で2歳の子どもが対象です。京都市では園によって2歳児クラスの募集枠が大きく異なります。</p>

<h2>メリット</h2>
<ul>
<li>1歳児クラスに比べて競争率が低い園がある</li>
<li>小規模保育からの転園組がいるため枠が増える園もある</li>
<li>子どもの体力がつき集団生活に馴染みやすい</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>2歳児クラスは持ち上がりが多く新規募集枠が少ない園もあります。希望園の過去の募集人数を確認しましょう。</p>
</div>

<h2>小規模保育からの連携枠</h2>
<p>京都市でも小規模保育事業所ごとに連携施設が設定されている場合があります。連携先への入園は優先的に取り扱われます。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>各園の募集状況は<a href="https://www.city.kyoto.lg.jp/hagukumi/page/0000274712.html" target="_blank" rel="noopener">京都市公式サイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 35,
  },
  {
    slug: "age3-ikou",
    citySlug: "kyoto",
    title: "京都市で3歳児クラスへの移行・転園ガイド",
    description: "小規模保育からの3歳児クラスへの移行や転園の流れ、京都市の連携施設制度について解説します。",
    image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=400&fit=crop",
    category: "年齢別対策",
    categoryColor: "amber",
    content: `<h2>3歳児クラスへの移行とは</h2>
<p>小規模保育事業は原則0〜2歳が対象です。3歳になると卒園するため、認可保育園や認定こども園への移行が必要です。</p>

<h2>連携施設の優先枠</h2>
<p>京都市では小規模保育事業所ごとに連携施設が設定されている場合があり、優先的に入園できます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>連携施設が設定されていない小規模保育もあります。入園前に連携先の有無を確認しておきましょう。</p>
</div>

<h2>幼稚園の預かり保育という選択肢</h2>
<p>京都市は私立幼稚園が多く、預かり保育が充実している園もあります。3歳からは幼稚園の預かり保育（新2号認定）も選択肢になります。</p>

<div class="info-box">
<p><strong>注意</strong></p>
<p>連携施設の情報は年度ごとに変わる可能性があります。最新情報はこども若者はぐくみ局にお問い合わせください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 30,
  },
  {
    slug: "nyuyoji-age0",
    citySlug: "kyoto",
    title: "京都市の0歳児クラス入園ガイド　生後何か月から預けられる？",
    description: "京都市で0歳児クラスに入園する場合の月齢要件、申込時期、注意点をまとめました。",
    image: "https://images.unsplash.com/photo-1544126592-807ade215a0b?w=800&h=400&fit=crop",
    category: "年齢別対策",
    categoryColor: "amber",
    content: `<h2>0歳児クラスの受入月齢</h2>
<p>京都市の認可保育園では、多くの園が<span class="highlight">生後57日（産休明け）</span>から受入可能です。ただし園によって異なります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>4月入園の場合、4月1日時点の月齢が受入条件を満たしている必要があります。</p>
</div>

<h2>0歳児クラスのメリット</h2>
<ul>
<li>募集定員が比較的多い</li>
<li>1歳児クラスより競争率が低い傾向</li>
</ul>

<h2>0歳児クラスのデメリット</h2>
<ul>
<li>育休を短縮する必要がある</li>
<li>体調を崩しやすく呼び出しが多い傾向</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>各園の受入月齢は<a href="https://www.city.kyoto.lg.jp/hagukumi/page/0000274712.html" target="_blank" rel="noopener">京都市の保育施設一覧</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 40,
  },
  {
    slug: "nintei-kodomoen",
    citySlug: "kyoto",
    title: "京都市の認定こども園ガイド　保育園との違いと選び方",
    description: "京都市の認定こども園の特徴、保育園との違い、入園申込の方法を解説します。",
    image: "https://images.unsplash.com/photo-1576495199011-eb94736d05d6?w=800&h=400&fit=crop",
    category: "施設の種類",
    categoryColor: "purple",
    content: `<h2>認定こども園とは</h2>
<p>認定こども園は保育園と幼稚園の機能を併せ持つ施設です。京都市内にも多くの認定こども園があります。</p>

<h2>保育園との主な違い</h2>
<table>
<tr><th>項目</th><th>認可保育園</th><th>認定こども園</th></tr>
<tr><td>対象年齢</td><td>0〜5歳</td><td>0〜5歳</td></tr>
<tr><td>保護者の就労要件</td><td>必要</td><td>保育利用は必要、教育利用は不要</td></tr>
<tr><td>教育内容</td><td>園による</td><td>幼稚園教育要領に基づく教育あり</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>保育を必要とする場合の入園申込は認可保育園と同じく区役所・支所を通じて行います。選考基準も同じです。</p>
</div>

<h2>京都市の認定こども園の特徴</h2>
<p>京都市には幼稚園型・保育所型・幼保連携型など複数のタイプの認定こども園があります。希望園の選択肢を広げるために検討しましょう。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>一覧は<a href="https://www.city.kyoto.lg.jp/hagukumi/page/0000274712.html" target="_blank" rel="noopener">京都市公式サイト</a>でご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 35,
  },
  {
    slug: "kigyou-shudogata",
    citySlug: "kyoto",
    title: "京都市の企業主導型保育園とは？認可との違いと活用法",
    description: "京都市にある企業主導型保育園の仕組み、認可保育園との違い、入園方法を解説します。",
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&h=400&fit=crop",
    category: "施設の種類",
    categoryColor: "purple",
    content: `<h2>企業主導型保育園とは</h2>
<p>企業が従業員のために設置する保育施設です。認可外ですが国から助成を受けており、保育料は認可保育園と同程度のことが多いです。</p>

<h2>認可保育園との違い</h2>
<table>
<tr><th>項目</th><th>認可保育園</th><th>企業主導型</th></tr>
<tr><td>申込先</td><td>区役所・支所</td><td>施設に直接</td></tr>
<tr><td>選考方法</td><td>点数制（min方式）</td><td>施設が独自に決定</td></tr>
<tr><td>入園時期</td><td>主に4月</td><td>随時可能な場合が多い</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>「地域枠」なら企業の従業員でなくても利用可能です。認可の入園が難しい場合の選択肢として検討しましょう。</p>
</div>

<div class="info-box">
<p><strong>注意</strong></p>
<p>企業主導型保育園は認可外保育施設です。見学時に保育の質や設備を確認しましょう。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 30,
  },
  {
    slug: "yakan-hoiku",
    citySlug: "kyoto",
    title: "京都市の夜間保育・延長保育ガイド",
    description: "京都市で夜間保育や延長保育を利用する方法、対象施設、料金について解説します。",
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&h=400&fit=crop",
    category: "施設の種類",
    categoryColor: "purple",
    content: `<h2>延長保育とは</h2>
<p>京都市の認可保育園では通常の保育時間を超えて利用できる延長保育があります。</p>

<h2>延長保育の料金目安</h2>
<table>
<tr><th>区分</th><th>時間帯の目安</th><th>料金の目安</th></tr>
<tr><td>延長保育（1時間）</td><td>18:00〜19:00</td><td>月額2,000〜4,000円程度</td></tr>
<tr><td>延長保育（2時間）</td><td>18:00〜20:00</td><td>月額4,000〜6,000円程度</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>延長保育の料金や実施時間は園ごとに異なります。入園前に希望園に確認しましょう。</p>
</div>

<h2>夜間保育について</h2>
<p>京都市内で夜間保育に対応している施設は限られています。夜勤のある方はファミリーサポート等との併用も検討しましょう。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>延長保育の実施園は<a href="https://www.city.kyoto.lg.jp/hagukumi/page/0000274712.html" target="_blank" rel="noopener">京都市公式サイト</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 30,
  },
  {
    slug: "mushoka-seido",
    citySlug: "kyoto",
    title: "京都市の幼児教育・保育無償化制度まとめ",
    description: "京都市における幼児教育・保育の無償化制度の対象範囲、条件、手続きを解説します。",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "お金・制度",
    categoryColor: "rose",
    content: `<h2>無償化の対象</h2>
<table>
<tr><th>対象</th><th>無償化の内容</th></tr>
<tr><td>3〜5歳児（認可保育園・認定こども園）</td><td>保育料が無料</td></tr>
<tr><td>0〜2歳児（住民税非課税世帯）</td><td>保育料が無料</td></tr>
<tr><td>認可外（3〜5歳、保育の必要性あり）</td><td>月額37,000円まで無償</td></tr>
<tr><td>認可外（0〜2歳、非課税世帯）</td><td>月額42,000円まで無償</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>無償化されるのは「保育料」のみです。給食費（副食費）・教材費などの実費は別途負担が必要です。</p>
</div>

<h2>京都市独自の支援</h2>
<p>京都市では国の無償化制度に加えて、独自の保育料軽減策を実施している場合があります。最新情報はこども若者はぐくみ局にお問い合わせください。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>無償化制度の詳細は<a href="https://www.city.kyoto.lg.jp/hagukumi/page/0000227761.html" target="_blank" rel="noopener">京都市公式サイト</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 45,
  },
  {
    slug: "shokuhi-jippi",
    citySlug: "kyoto",
    title: "京都市の保育園の給食費・実費負担はいくら？",
    description: "京都市の認可保育園で必要な給食費やその他の実費負担を解説します。",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=400&fit=crop",
    category: "お金・制度",
    categoryColor: "rose",
    content: `<h2>保育園の実費負担</h2>
<p>保育料とは別に給食費やその他の実費が発生します。3〜5歳児クラスは保育料無償化ですが給食費は自己負担です。</p>

<h2>給食費の目安</h2>
<table>
<tr><th>年齢</th><th>主食費</th><th>副食費</th></tr>
<tr><td>0〜2歳児</td><td colspan="2">保育料に含まれる</td></tr>
<tr><td>3〜5歳児</td><td>月額約1,000〜3,000円</td><td>月額約4,500円</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>年収360万円未満相当の世帯や第3子以降は副食費が免除されます。</p>
</div>

<div class="info-box">
<p><strong>注意</strong></p>
<p>金額は園によって異なります。正確な金額は各園にお問い合わせください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 35,
  },
  {
    slug: "hoikuryo-keisan",
    citySlug: "kyoto",
    title: "京都市の保育料の計算方法　所得別の目安",
    description: "京都市の保育料がどのように計算されるか、市民税所得割額に基づく目安を解説します。",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "お金・制度",
    categoryColor: "rose",
    content: `<h2>保育料の計算の仕組み</h2>
<p>京都市の保育料は世帯の<strong>市民税所得割額</strong>（父母合算）に基づいて決定されます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>3〜5歳児クラスは無償化により保育料は0円です。以下は0〜2歳児クラスに適用されます。</p>
</div>

<h2>保育料の目安（0〜2歳児）</h2>
<table>
<tr><th>市民税所得割額（世帯合算）</th><th>月額保育料の目安</th></tr>
<tr><td>非課税世帯</td><td>0円</td></tr>
<tr><td>〜約77,101円未満</td><td>約9,000〜19,500円</td></tr>
<tr><td>〜約211,201円未満</td><td>約22,000〜44,500円</td></tr>
<tr><td>211,201円以上</td><td>約50,000〜56,000円</td></tr>
</table>

<h2>多子世帯の軽減</h2>
<ul>
<li>同時在園の2人目：半額</li>
<li>同時在園の3人目以降：無料</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>正確な保育料表は<a href="https://www.city.kyoto.lg.jp/hagukumi/page/0000227761.html" target="_blank" rel="noopener">京都市公式サイト</a>でご確認ください。上記はあくまで目安です。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 40,
  },
  {
    slug: "zeikin-koujo",
    citySlug: "kyoto",
    title: "保育料と税金の関係　京都市で控除を活用する方法",
    description: "京都市の保育料は市民税額で決まります。税控除を活用して保育料を下げる方法を解説します。",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "お金・制度",
    categoryColor: "rose",
    content: `<h2>保育料と市民税の関係</h2>
<p>京都市の保育料は「市民税所得割額」で決まります。税額が低くなれば保育料も下がる可能性があります。</p>

<h2>活用できる主な控除</h2>
<table>
<tr><th>控除の種類</th><th>効果</th></tr>
<tr><td>医療費控除</td><td>年間10万円超の医療費がある場合に申告可能</td></tr>
<tr><td>iDeCo</td><td>掛金が全額所得控除の対象</td></tr>
<tr><td>生命保険料控除</td><td>年末調整で控除されていない分を確定申告で追加</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>ふるさと納税は保育料の計算に使う「所得割額」には影響しないことが一般的です。iDeCoや医療費控除の方が効果的です。</p>
</div>

<div class="info-box">
<p><strong>注意</strong></p>
<p>控除の適用可否は個別の状況により異なります。税務署や区役所にご相談ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 30,
  },
  {
    slug: "shurou-shoumeisho",
    citySlug: "kyoto",
    title: "京都市の就労証明書の書き方と注意点",
    description: "京都市の保育園申込に必要な就労証明書の記入ポイントとよくある間違いを解説します。",
    image: "https://images.unsplash.com/photo-1568667256549-094345857637?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>就労証明書とは</h2>
<p>保護者の就労状況を証明する書類です。勤務先に作成を依頼します。</p>

<h2>記入のポイント</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content"><strong>京都市指定の様式を使う</strong><p>京都市公式サイトからダウンロードできる様式を使用してください。</p></div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content"><strong>復職後の勤務予定を正確に記入</strong><p>育休中の方は復職後の勤務時間が点数に直結します。</p></div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content"><strong>証明者の押印・署名</strong><p>会社の代表者印または人事担当者の署名が必要です。</p></div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>京都市はmin方式のため、父母双方の就労証明書の記載内容が重要です。両方とも週40時間以上の記載があれば満点になります。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>様式は<a href="https://www.city.kyoto.lg.jp/hagukumi/page/0000274712.html" target="_blank" rel="noopener">京都市公式サイト</a>からダウンロードできます。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 45,
  },
  {
    slug: "shinsei-shorui-list",
    citySlug: "kyoto",
    title: "京都市の保育園申込に必要な書類チェックリスト",
    description: "京都市の保育園入園申込に必要な書類をチェックリスト形式でまとめました。",
    image: "https://images.unsplash.com/photo-1568667256549-094345857637?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>全員必須の書類</h2>
<ul>
<li>保育利用申込書</li>
<li>保育を必要とする事由の証明書（就労証明書等）※父母それぞれ</li>
<li>マイナンバー確認書類</li>
</ul>

<h2>該当者のみ必要な書類</h2>
<table>
<tr><th>該当する状況</th><th>追加書類</th></tr>
<tr><td>ひとり親世帯</td><td>児童扶養手当証書の写し等</td></tr>
<tr><td>自営業</td><td>開業届・確定申告書の写し</td></tr>
<tr><td>育休中</td><td>育休期間のわかる書類</td></tr>
<tr><td>認可外利用中</td><td>在園証明書</td></tr>
<tr><td>転入予定</td><td>転入先の契約書の写し</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>提出先は第一希望の園または区役所・支所です。不備があると選考に間に合わない可能性があります。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳細は<a href="https://www.city.kyoto.lg.jp/hagukumi/page/0000274712.html" target="_blank" rel="noopener">京都市「保育利用申込みの御案内」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 40,
  },
  {
    slug: "niji-shinsei-flow",
    citySlug: "kyoto",
    title: "京都市の保育園2次調整の流れと対策",
    description: "京都市の保育園1次調整で保留になった場合の2次調整の流れと対策を解説します。",
    image: "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>2次調整とは</h2>
<p>1次調整で定員に達しなかった園について2次調整が行われます。1次で保留の方は申請書の再提出は不要です。</p>

<h2>2次調整の流れ</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content"><strong>1次結果通知を確認</strong><p>1月末頃に届きます。</p></div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content"><strong>希望変更届の提出</strong><p>希望園の追加・変更がある場合は2月中旬までに提出します。</p></div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content"><strong>2次結果通知</strong><p>3月上旬に届きます。</p></div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>2次調整で空きのある園は限られます。通える範囲で幅広く希望を出しましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>2次調整の詳細は1次結果通知に同封される案内をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 40,
  },
  {
    slug: "tenkyo-hokatsu",
    citySlug: "kyoto",
    title: "京都市への転居を伴う保活ガイド　市外からの申込方法",
    description: "他の自治体から京都市へ転居予定の場合の保育園申込方法を解説します。",
    image: "https://images.unsplash.com/photo-1516156008625-3a9d6067fab5?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>市外から京都市への転入と保活</h2>
<p>京都市への転入予定がある場合、転入前でも保育園の申込が可能です。</p>

<h2>申込の流れ</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content"><strong>転入先の区役所・支所に相談</strong><p>子どもはぐくみ室に電話で事前相談しましょう。</p></div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content"><strong>必要書類の準備</strong><p>通常の書類に加え、転入を証明する書類が必要です。</p></div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content"><strong>申込書の提出</strong><p>郵送での提出も可能です。</p></div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>入園月の前月末までに京都市に住民票を移す必要があります。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳細は転入予定の区役所・支所にお問い合わせください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 30,
  },
  {
    slug: "kyoiku-hoiku-chigai",
    citySlug: "kyoto",
    title: "京都市の保育園と幼稚園の違い　どちらを選ぶべき？",
    description: "京都市の保育園と幼稚園の違いを比較します。京都市ならではの私立幼稚園事情も解説。",
    image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=400&fit=crop",
    category: "施設の種類",
    categoryColor: "purple",
    content: `<h2>保育園と幼稚園の基本的な違い</h2>
<table>
<tr><th>項目</th><th>保育園</th><th>幼稚園</th></tr>
<tr><td>対象年齢</td><td>0〜5歳</td><td>3〜5歳</td></tr>
<tr><td>利用時間</td><td>最大11時間</td><td>4〜5時間＋預かり保育</td></tr>
<tr><td>保護者の要件</td><td>就労等が必要</td><td>不要</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>京都市は私立幼稚園が充実しており、預かり保育が充実した園も多いです。3歳以降は幼稚園＋預かり保育という選択肢も有力です。</p>
</div>

<h2>幼稚園の預かり保育（新2号認定）</h2>
<p>保育の必要性がある家庭は月額11,300円まで無償化の対象です。</p>

<div class="info-box">
<p><strong>注意</strong></p>
<p>幼稚園の預かり保育の実施時間は園によって大きく異なります。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 35,
  },
  {
    slug: "hokatsu-calendar",
    citySlug: "kyoto",
    title: "京都市の保活カレンダー　月別やることリスト",
    description: "京都市で4月入園を目指す方のための月別保活カレンダーです。",
    image: "https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>保活カレンダー（4月入園の場合）</h2>
<table>
<tr><th>時期</th><th>やること</th></tr>
<tr><td>4〜6月</td><td>情報収集。前年度の案内冊子をベースに調査開始</td></tr>
<tr><td>7〜9月</td><td>保育園見学。複数園を比較</td></tr>
<tr><td>10月</td><td>案内冊子配布・受付開始。書類準備</td></tr>
<tr><td>10〜11月</td><td>申込書類提出（11月中旬まで）</td></tr>
<tr><td>12月</td><td>不備書類の再提出・希望変更の最終締切</td></tr>
<tr><td>1月末</td><td>1次結果通知</td></tr>
<tr><td>2月</td><td>2次の希望変更届提出</td></tr>
<tr><td>3月</td><td>2次結果通知・入園準備</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>京都市の申込期間は10月〜11月中旬と短めです。就労証明書は早めに勤務先に依頼しましょう。</p>
</div>

<div class="info-box">
<p><strong>注意</strong></p>
<p>日程は年度によって変わります。最新情報は京都市公式サイトでご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 45,
  },
  {
    slug: "souba-tensuu",
    citySlug: "kyoto",
    title: "京都市の保育園入園に必要な点数の相場と目安",
    description: "京都市の保育園入園に実際に必要な点数の目安をエリア・年齢別に解説します。",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>入園に必要な点数の目安</h2>
<p>京都市はmin方式のため、父母の低い方の点数が選考に使われます。フルタイム共働きなら<span class="highlight">40点（満点）</span>が基本ラインです。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>基本指数40点に加えて調整指数（加点）の有無が合否を分けます。きょうだい加点や認可外利用の加点がある方が有利です。</p>
</div>

<h2>エリア別の傾向</h2>
<table>
<tr><th>エリア</th><th>競争率の傾向</th></tr>
<tr><td>中京区・下京区</td><td>人気エリア。1歳児は激戦</td></tr>
<tr><td>左京区・北区</td><td>エリアにより差がある</td></tr>
<tr><td>伏見区・山科区</td><td>比較的入りやすい園もある</td></tr>
<tr><td>右京区・西京区</td><td>新興住宅地は競争率高め</td></tr>
</table>

<div class="info-box">
<p><strong>注意</strong></p>
<p>上記は一般的な傾向です。年度や園によって異なりますので区役所でご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 45,
  },
  {
    slug: "ku-betsu-bairitsu",
    citySlug: "kyoto",
    title: "京都市の区別・保育園入園倍率の傾向",
    description: "京都市11区の保育園入園の競争率の傾向をエリアごとに紹介します。",
    image: "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=800&h=400&fit=crop",
    category: "エリア情報",
    categoryColor: "teal",
    content: `<h2>京都市11区の入園傾向</h2>
<table>
<tr><th>区</th><th>傾向</th></tr>
<tr><td>北区</td><td>住宅地で保育需要は安定</td></tr>
<tr><td>上京区</td><td>園の数が限られるため注意</td></tr>
<tr><td>左京区</td><td>大学周辺に園が集中。エリアにより差あり</td></tr>
<tr><td>中京区</td><td>中心部で人気。1歳児は激戦</td></tr>
<tr><td>東山区</td><td>園の数は少ないが人口も少なめ</td></tr>
<tr><td>下京区</td><td>マンション増加で需要増</td></tr>
<tr><td>南区</td><td>比較的入りやすい傾向</td></tr>
<tr><td>右京区</td><td>広いエリアで園も多い</td></tr>
<tr><td>伏見区</td><td>最も人口が多い区。エリアにより差が大きい</td></tr>
<tr><td>山科区</td><td>比較的入りやすい傾向</td></tr>
<tr><td>西京区</td><td>洛西ニュータウン周辺は需要あり</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>京都市では区をまたいだ申込も可能です。隣の区の園も検討しましょう。</p>
</div>

<div class="info-box">
<p><strong>注意</strong></p>
<p>上記は一般的な傾向です。最新の情報は各区役所・支所にお問い合わせください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 40,
  },
  {
    slug: "ikukyu-enchou-risk-detail",
    citySlug: "kyoto",
    title: "京都市で育休延長する場合のリスクと保活への影響",
    description: "京都市で育児休業を延長する場合の保活への影響と注意点を解説します。",
    image: "https://images.unsplash.com/photo-1531983412531-1f49a365ffed?w=800&h=400&fit=crop",
    category: "育休・復職",
    categoryColor: "purple",
    content: `<h2>育休延長と不承諾通知</h2>
<p>育休延長には保育園の「不承諾通知」が必要です。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>2025年4月以降、育休延長目的での保育園申込についてハローワークの確認が厳格化されています。入園意思のない申込と判断されると給付金が支給されない可能性があります。</p>
</div>

<h2>育休延長のリスク</h2>
<ul>
<li>1歳児クラスは最も激戦で延長後はさらに厳しくなる</li>
<li>2歳児クラスの枠は少ない</li>
<li>京都市はmin方式のため、復職後の勤務時間も重要</li>
</ul>

<h2>対策</h2>
<ul>
<li>入園可能な園があれば入園する方が安全</li>
<li>認可外保育施設も並行して検討する</li>
</ul>

<div class="info-box">
<p><strong>注意</strong></p>
<p>最新の情報はハローワークおよび勤務先にご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 40,
  },
  {
    slug: "fukushoku-junbi",
    citySlug: "kyoto",
    title: "京都市で保育園入園後の復職準備チェックリスト",
    description: "京都市で保育園の内定が出てから復職までにやるべきことを解説します。",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
    category: "育休・復職",
    categoryColor: "purple",
    content: `<h2>復職までのチェックリスト</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content"><strong>勤務先に復職日を連絡</strong><p>慣らし保育期間（1〜2週間）を考慮しましょう。</p></div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content"><strong>入園説明会に出席</strong><p>持ち物や生活の流れを確認します。</p></div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content"><strong>入園準備品の購入</strong><p>園の説明会で配られるリストに従って準備します。</p></div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content"><strong>病児保育・ファミサポの登録</strong><p>バックアッププランを用意しましょう。</p></div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>慣らし保育期間中は仕事を休む必要があります。有給休暇の残日数を確認しておきましょう。</p>
</div>

<div class="info-box">
<p><strong>注意</strong></p>
<p>入園準備品は園によって異なります。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 35,
  },
  {
    slug: "sannin-me-hokatsu",
    citySlug: "kyoto",
    title: "京都市で3人目の保活　多子世帯の優遇制度と戦略",
    description: "京都市で3人目以降の子どもの保活をする際の優遇制度と申込のコツを解説します。",
    image: "https://images.unsplash.com/photo-1475503572774-15a45e5d60b9?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>3人目以降の優遇制度</h2>
<h2>保育料の軽減</h2>
<table>
<tr><th>子ども</th><th>保育料</th></tr>
<tr><td>1人目</td><td>通常額</td></tr>
<tr><td>同時在園の2人目</td><td>半額</td></tr>
<tr><td>同時在園の3人目以降</td><td>無料</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>0〜2歳児の3人目以降は保育料が無料です。副食費も第3子以降は免除される場合があります。</p>
</div>

<h2>3人目保活のコツ</h2>
<ul>
<li>上の子と同じ園を第一希望にしてきょうだい加点を最大化</li>
<li>3人の送迎動線を考えて園を選ぶ</li>
</ul>

<div class="info-box">
<p><strong>注意</strong></p>
<p>制度は年度によって変更される場合があります。最新情報は区役所でご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 30,
  },
  {
    slug: "tanshin-funin",
    citySlug: "kyoto",
    title: "京都市で単身赴任中の場合の保育園申込と点数への影響",
    description: "配偶者が単身赴任中の場合の京都市での保育園申込と点数への影響を解説します。",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>単身赴任中の保育園申込</h2>
<p>配偶者が単身赴任で別居していても保育園の申込は可能です。</p>

<h2>京都市のmin方式と単身赴任</h2>
<p>京都市はmin方式のため、単身赴任中の配偶者の点数も重要です。配偶者の就労証明書を提出する必要があります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>単身赴任であっても「ひとり親世帯」の加点は適用されません。ひとり親加点は離婚・死別等の場合に限られます。</p>
</div>

<h2>必要な追加書類</h2>
<ul>
<li>配偶者の就労証明書</li>
<li>単身赴任であることがわかる書類（辞令の写し等）</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳しくは区役所・支所の子どもはぐくみ室にお問い合わせください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 25,
  },
  {
    slug: "sofu-sobo-doukyo",
    citySlug: "kyoto",
    title: "京都市で祖父母と同居している場合の保育園入園への影響",
    description: "祖父母と同居している場合の京都市の保育園入園選考への影響と対策を解説します。",
    image: "https://images.unsplash.com/photo-1475503572774-15a45e5d60b9?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>祖父母同居と保育の必要性</h2>
<p>京都市では祖父母と同居していることだけを理由に保育の必要性が否定されることはありません。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>同居の祖父母が65歳未満で無職の場合、調整指数で減点される可能性があります。事前に区役所に確認しましょう。</p>
</div>

<h2>対策</h2>
<ul>
<li>祖父母が就労していれば就労証明書を提出して減点回避</li>
<li>祖父母が病気等の場合はその証明書類を提出</li>
<li>65歳以上の場合は減点対象外が一般的</li>
</ul>

<div class="info-box">
<p><strong>注意</strong></p>
<p>条件は年度によって変更される場合があります。最新の基準は区役所にお問い合わせください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 30,
  },
  {
    slug: "fushoninchi-taiou",
    citySlug: "kyoto",
    title: "京都市で保育園に落ちた（保留）場合の対応策まとめ",
    description: "京都市の保育園1次調整で保留になった場合の対応策を解説します。",
    image: "https://images.unsplash.com/photo-1494883759339-0b042055a4ee?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>保留になったら</h2>
<p>1次調整で保留となっても選択肢はあります。</p>

<h2>取れる対応策</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content"><strong>2次調整で希望変更</strong><p>空きのある園を追加しましょう。</p></div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content"><strong>認可外保育施設を探す</strong><p>企業主導型保育園等を検討しましょう。</p></div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content"><strong>育休延長を検討する</strong><p>保留通知があれば育休延長が可能です。</p></div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content"><strong>途中入園を待つ</strong><p>毎月空きが出る可能性があります。</p></div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>保留通知は育休延長の手続きに必要です。大切に保管してください。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>2次調整の詳細は1次結果通知に同封される案内をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 45,
  },
  {
    slug: "taiki-jidou-taisaku",
    citySlug: "kyoto",
    title: "京都市の待機児童の現状と対策（2026年版）",
    description: "京都市の待機児童数の傾向と市が進めている対策について解説します。",
    image: "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=800&h=400&fit=crop",
    category: "エリア情報",
    categoryColor: "teal",
    content: `<h2>京都市の待機児童の状況</h2>
<p>京都市は全国的に見て保育環境が整っている自治体の一つですが、中心部の人気園では依然として入園が難しい状況が続いています。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>国定義の「待機児童」は減少傾向ですが、希望園に入れない「保留児童」は一定数存在します。特に中京区・下京区の1歳児クラスは競争率が高めです。</p>
</div>

<h2>市の対策</h2>
<ul>
<li>保育施設の整備・定員増</li>
<li>保育士の処遇改善</li>
<li>小規模保育の拡充</li>
</ul>

<h2>保護者側の対策</h2>
<ul>
<li>希望園を幅広く記入する</li>
<li>隣の区の園も検討する</li>
<li>0歳4月入園を検討する</li>
</ul>

<div class="info-box">
<p><strong>注意</strong></p>
<p>最新データはこども若者はぐくみ局の公式サイトでご確認ください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 40,
  },
  {
    slug: "tennen-moshikomi",
    citySlug: "kyoto",
    title: "京都市の保育園への転園申込の方法と注意点",
    description: "京都市で保育園の転園を希望する場合の手続きと注意点を解説します。",
    image: "https://images.unsplash.com/photo-1516156008625-3a9d6067fab5?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>転園申込とは</h2>
<p>現在通っている保育園から別の園に移りたい場合の手続きです。</p>

<h2>転園申込の流れ</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content"><strong>区役所・支所に相談</strong><p>子どもはぐくみ室に転園希望を伝えます。</p></div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content"><strong>申込書類の提出</strong><p>新規入園と同じ書類が必要です。</p></div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content"><strong>利用調整</strong><p>新規申込者と同じ基準で選考されます。</p></div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>転園が決まらなくても今の園に通い続けられます。</p>
</div>

<h2>注意点</h2>
<ul>
<li>転園は確実に移れる保証はありません</li>
<li>4月が最も枠が出やすいタイミングです</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>手続きの詳細は区役所・支所の子どもはぐくみ室にお問い合わせください。</p>
</div>`,
    publishedAt: "2026-04-07",
    popularity: 30,
  },
];

registerArticles(articles);
