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
];

registerArticles(articles);
