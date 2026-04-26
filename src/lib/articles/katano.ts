import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  // ===== 保活の基本 (1) =====
  {
    slug: "hokatsu-schedule",
    citySlug: "katano",
    title: "交野市の保活スケジュール完全ガイド　申込から内定まで",
    description:
      "交野市の認可保育園の申込時期・選考の流れをまとめました。令和8年度4月入園のスケジュールを解説します。",
    image: "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>交野市の4月入園スケジュール</h2>
<p>交野市の認可保育園は毎年秋に翌年度4月入園の一斉申込を受付けます。「保育所（園）等利用の手引き（募集要項）」を入手して準備しましょう。</p>

<h3>保活の全体スケジュール</h3>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>4月〜6月：情報収集</strong>
<p>市のホームページで保育園一覧や空き状況を確認します。交野市には認可保育所・認定こども園・小規模保育事業所など多くの施設があります。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>6月〜9月：保育園見学</strong>
<p>気になる園に連絡して見学を予約しましょう。交野市は京阪沿線を中心に施設が点在しています。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>9月〜10月：利用案内の入手・書類準備</strong>
<p>就労証明書などの必要書類を準備します。交野市こども園課の窓口やホームページで入手できます。</p>
</div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content">
<strong>10月〜11月：申込書類の提出</strong>
<p>こども園課の窓口または郵送で提出します。</p>
</div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>交野市は基本指数が父母各最大100点（合計200点満点）の制度です。フルタイム共働き世帯は基本指数200点が出発点となり、調整指数で差がつきます。</p>
</div>`,
    publishedAt: "2026-04-26",
    popularity: 55,
  },
  {
    slug: "scoring-system-guide",
    citySlug: "katano",
    title: "交野市の点数の仕組みと計算方法　基本指数と調整指数を解説",
    description:
      "交野市の保育園入園選考で使われる基本指数と調整指数の仕組みを解説します。",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>交野市の選考指数とは</h2>
<p>交野市の認可保育園の入園選考は「基本指数（父母それぞれ）+ 調整指数」の合計で行われます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>選考指数 = 基本指数（保護者1 + 保護者2）+ 調整指数</p>
</div>

<h2>基本指数（父母各最大100点、合計200点）</h2>
<p>就労の場合、月160時間以上で満点の<span class="highlight">100点</span>です。</p>

<table>
<tr><th>勤務の状況</th><th>基本指数</th></tr>
<tr><td>月160時間以上</td><td>100</td></tr>
<tr><td>月140時間以上160時間未満</td><td>90</td></tr>
<tr><td>月120時間以上140時間未満</td><td>80</td></tr>
<tr><td>月96時間以上120時間未満</td><td>70</td></tr>
<tr><td>月64時間以上96時間未満</td><td>60</td></tr>
<tr><td>求職活動中</td><td>40</td></tr>
</table>

<h2>調整指数の代表例</h2>
<ul>
<li>ひとり親世帯：<span class="highlight">+15点</span></li>
<li>きょうだい在園中の施設を第1希望：<span class="highlight">+10点</span></li>
<li>多胎児の同時申込：<span class="highlight">+10点</span></li>
<li>単身赴任中：<span class="highlight">+10点</span></li>
<li>認可外保育施設利用：<span class="highlight">+5点</span></li>
<li>育児休業復帰：<span class="highlight">+5点</span></li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳しくは<a href="https://www.city.katano.osaka.jp/docs/2011061000043/" target="_blank" rel="noopener">交野市公式サイト</a>の「保育所のページ」をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-26",
    popularity: 65,
  },
  // ===== 点数アップ =====
  {
    slug: "score-up-tips",
    citySlug: "katano",
    title: "交野市で点数を上げる方法　調整指数の活用ガイド",
    description:
      "交野市の入園選考で調整指数を最大限に活用する方法をわかりやすく解説します。",
    image:
      "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>調整指数で着実に加点しよう</h2>
<p>交野市の基本指数は高めですが、調整指数でさらに有利になることができます。最大限に活用しましょう。</p>

<h3>加点チェックリスト</h3>

<ul>
<li>ひとり親世帯 → <span class="highlight">+15点</span></li>
<li>きょうだいが在園中の施設を第1希望 → <span class="highlight">+10点</span></li>
<li>多胎児（双子など）の同時申込 → <span class="highlight">+10点</span></li>
<li>保護者が単身赴任中 → <span class="highlight">+10点</span></li>
<li>認可外保育施設を月64時間以上利用 → <span class="highlight">+5点</span></li>
<li>育児休業を取得し、入園月に復帰予定 → <span class="highlight">+5点</span></li>
<li>保育士として勤務中（市内）→ <span class="highlight">+10点</span></li>
<li>保育士として勤務中（市外）→ <span class="highlight">+5点</span></li>
<li>生活保護世帯 → <span class="highlight">+5点</span></li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>交野市は高い基本指数が出発点のため、差をつけるには調整指数がカギになります。使える加点は全て活用しましょう。</p>
</div>`,
    publishedAt: "2026-04-26",
    popularity: 60,
  },
  // ===== 同点対策 =====
  {
    slug: "tiebreaker-rules",
    citySlug: "katano",
    title: "交野市で同点になったらどうなる？　選考優先順位の仕組み",
    description:
      "交野市の保育園入園選考で同点になった場合の優先順位のしくみを解説します。",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>同点時の優先順位（参考値）</h2>
<p>交野市では選考指数が同点の場合、いくつかの優先項目で判定されます。以下は大阪府の一般的な基準を参考にしたものです。詳細については、交野市こども園課にお問い合わせください。</p>

<ol>
<li>ひとり親世帯</li>
<li>希望する保育施設にきょうだいが在園している世帯</li>
<li>基本指数が高い世帯（調整指数による加点が少ない）</li>
<li>交野市の居住期間</li>
<li>所得が低い世帯</li>
</ol>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>きょうだいが在園中の園を希望に入れると、指数加算だけでなく同点時の優先順位でも有利になります。</p>
</div>

<h2>対策のポイント</h2>
<ul>
<li>調整指数で同点を避ける工夫をする</li>
<li>きょうだいが在園中の園を第1希望にする</li>
<li>複数の園を希望に入れる</li>
</ul>

<div class="info-box">
<p><strong>情報</strong></p>
<p>過去の入園選考結果については、交野市こども園課で確認できることがあります。参考にしてみましょう。</p>
</div>`,
    publishedAt: "2026-04-26",
    popularity: 48,
  },
  // ===== 働き方と加点 =====
  {
    slug: "part-time-work-score",
    citySlug: "katano",
    title: "交野市のパート・自営業の点数　働き方で基本指数が変わる",
    description:
      "交野市の保育園入園選考における、パートタイムや自営業の方の点数計算を詳しく解説します。",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>労働時間で決まる基本指数（参考値）</h2>
<p>交野市では労働時間に応じて細かく基本指数が設定されています。フルタイムでなくても月64時間以上あれば60点の基本指数が得られます。</p>

<h3>就労（雇用）の場合</h3>
<table>
<tr><th>月あたり労働時間</th><th>基本指数</th></tr>
<tr><td>月160時間以上</td><td>100</td></tr>
<tr><td>月140時間以上160時間未満</td><td>90</td></tr>
<tr><td>月120時間以上140時間未満</td><td>80</td></tr>
<tr><td>月96時間以上120時間未満</td><td>70</td></tr>
<tr><td>月64時間以上96時間未満</td><td>60</td></tr>
</table>

<h3>自営業の場合</h3>
<p>自営業（事業の中心者）の場合も同じ時間帯で判定されます。給与明細の代わりに、営業報告書や確定申告書で労働時間を証明します。</p>

<h2>パートタイムの方へ</h2>
<p>月64時間以上働いていれば基本指数60点が確保でき、そこに調整指数が加算されます。ダブルワークなどで時間を確保することで加点を狙えます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>就労証明書は正確に記入されるため、虚偽のないようにしましょう。</p>
</div>`,
    publishedAt: "2026-04-26",
    popularity: 50,
  },
  // ===== ひとり親加点 =====
  {
    slug: "single-parent-score",
    citySlug: "katano",
    title: "交野市のひとり親世帯の加点　シングルマザーの保活ガイド",
    description:
      "交野市のひとり親世帯（母子家庭・父子家庭）の入園選考について、高い加点制度と対策をまとめました。",
    image:
      "https://images.unsplash.com/photo-1542206395-5fee9e78416a?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>ひとり親世帯は+15点の高加点</h2>
<p>交野市では<strong>ひとり親世帯</strong>の場合、調整指数で<span class="highlight">+15点</span>の加点を受けられます。これは大きな優遇です。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>ひとり親でパート月96時間の就労があれば、基本指数70点+調整指数15点=85点となり、共働きフルタイムの100点に近い点数を確保できます。</p>
</div>

<h2>加点に必要な手続き</h2>
<ul>
<li>児童扶養手当の支給決定通知書</li>
<li>戸籍謄本（離婚等の事実を証明）</li>
<li>就労証明書（就労中であることの証明）</li>
</ul>

<h2>同点時の優先順位でも最優先</h2>
<p>同点になった場合、ひとり親世帯は最優先で選考されます。加点と優先順位の両面で有利です。</p>

<div class="info-box">
<p><strong>相談窓口</strong></p>
<p>ひとり親世帯の手当や支援について、交野市こども園課で相談できます。必要な書類の確認も可能です。</p>
</div>`,
    publishedAt: "2026-04-26",
    popularity: 45,
  },
  // ===== 育休タイミング =====
  {
    slug: "parental-leave-timing",
    citySlug: "katano",
    title: "交野市の育休からの復帰　入園月のタイミングが重要",
    description:
      "交野市の保育園入園と育休復帰のタイミングについて、加点を活かす戦略をまとめました。",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>育休復帰で+5点の加点</h2>
<p>交野市では<span class="highlight">育児休業を取得し、入園月に職場復帰する予定がある</span>場合、調整指数で+5点の加点を受けられます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>高い基本指数が出発点の交野市では、5点の加点も競争を左右する重要な要素です。入園月に合わせて復帰予定であれば必ず申告しましょう。</p>
</div>

<h2>加点に必要な書類</h2>
<ul>
<li>育休中であることを証明する書類</li>
<li>職場復帰の予定を示す通知書</li>
</ul>

<h2>育休の長さと入園タイミング</h2>
<p>子どもの月齢によって育休を取得します。一般的には：</p>
<ul>
<li>0歳4月生まれ → 生後10か月〜1歳での復帰（1歳4月入園が有利）</li>
<li>4月生まれ → 生後12か月での復帰（翌年4月が目安）</li>
</ul>

<div class="info-box">
<p><strong>大阪府の育児休業制度</strong></p>
<p>大阪府では育児休業給付金の制度があります。詳しくはハローワークにお問い合わせください。</p>
</div>`,
    publishedAt: "2026-04-26",
    popularity: 42,
  },
  // ===== 待機児童 =====
  {
    slug: "nursery-wait-time",
    citySlug: "katano",
    title: "交野市の待機児童状況　入園難易度を見極めるポイント",
    description:
      "交野市の待機児童数や入園競争率の実情、施設ごとの難易度を分析しました。",
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>交野市の待機児童状況</h2>
<p>交野市は大阪府北河内地域の人口約7.7万人の市です。京阪沿線で交通の便がよく、ファミリー層が集中しています。認可保育園・認定こども園が複数あります。</p>

<div class="point-box">
<p><strong>参考値</strong></p>
<p>以下は参考値です。最新の待機児童数については交野市こども園課にお問い合わせください。</p>
</div>

<h2>施設ごとの競争率（参考値）</h2>
<ul>
<li><strong>駅前・住宅地エリア</strong>：競争が激しい傾向</li>
<li><strong>周辺エリア</strong>：比較的空きがある施設も存在</li>
</ul>

<h2>0歳児vs1歳児以上</h2>
<p>一般的に0歳児クラスの方が入園しやすい傾向があります。月齢による定員制限があるためです。</p>

<div class="info-box">
<p><strong>最新情報の確認</strong></p>
<p>待機児童数や入園選考の状況は毎年変動します。正確な情報は交野市の公式サイトで最新のデータをご確認ください。</p>
</div>`,
    publishedAt: "2026-04-26",
    popularity: 40,
  },
  // ===== 申込チェックリスト =====
  {
    slug: "application-checklist",
    citySlug: "katano",
    title: "交野市の申込チェックリスト　書類の準備と提出方法",
    description:
      "交野市の保育園申込に必要な書類を、チェックリスト形式でまとめました。",
    image:
      "https://images.unsplash.com/photo-1454496537488-7a8e488e8606?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>申込に必要な書類（参考値）</h2>
<p>交野市の保育施設申込に必要な書類は、保育が必要な理由によって異なります。以下は参考値です。最新の書類要件は、交野市が発行する「保育所（園）等利用の手引き」でご確認ください。</p>

<h3>全員共通</h3>
<ul>
<li>保育施設入所申込書</li>
<li>世帯票</li>
<li>保護者の個人番号（マイナンバー）確認書類</li>
<li>本人確認書類</li>
</ul>

<h3>就労の場合</h3>
<ul>
<li>就労証明書（会社員の場合）</li>
<li>営業許可書等（自営業の場合）</li>
<li>確定申告書または給与明細</li>
</ul>

<h3>そのほかの場合</h3>
<ul>
<li>病気・障害の場合：診断書や手帳のコピー</li>
<li>出産予定の場合：母子健康手帳のコピー</li>
<li>就学の場合：在学証明書など</li>
</ul>

<h2>書類準備のコツ</h2>
<ul>
<li>就労証明書は勤務先に早めに依頼（1〜2週間かかる場合も）</li>
<li>必要書類は交野市のホームページで事前に確認</li>
<li>不備があると受理されないため、窓口での事前確認がおすすめ</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>申込期間は限定されています。書類の準備は余裕を持って進めましょう。</p>
</div>`,
    publishedAt: "2026-04-26",
    popularity: 38,
  },
  // ===== 認可外から認可へ =====
  {
    slug: "unlicensed-nursery",
    citySlug: "katano",
    title: "交野市で認可外から認可園への転園　ステップアップガイド",
    description:
      "認可外保育施設から交野市の認可園へのステップアップについて、加点制度と戦略をまとめました。",
    image:
      "https://images.unsplash.com/photo-1457364983758-510f8afa9f5f?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>認可外から認可へ　+5点の加点活用</h2>
<p>交野市では<span class="highlight">認可外保育施設に月64時間以上預けている場合、+5点の加点</span>を受けられます。これを活用して0歳児クラスを認可外で過ごし、翌年度に認可園へ転園するのは有効な戦略です。</p>

<h2>0歳児を認可外で過ごすメリット</h2>
<ul>
<li>認可外は入園しやすい（親面接が多い）</li>
<li>翌年度の認可園申込時に+5点の加点が受けられる</li>
<li>月64時間以上預けていれば加点対象になる</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>交野市は高い基本指数が出発点のため、5点の加点は大きなアドバンテージになります。認可外の保育料は高めですが、1年間で認可園への加点が得られると考えると、投資としての価値があります。</p>
</div>

<h2>加点に必要な証明</h2>
<ul>
<li>認可外保育施設の利用契約書</li>
<li>保育料の領収書（月ぎめで預けていることの証明）</li>
<li>保育施設からの在籍証明書</li>
</ul>

<h2>タイミングの注意点</h2>
<p>加点が有効になるには、月64時間以上の定期的な預託が必要です。単発の利用では加点対象外になる可能性があります。</p>

<div class="info-box">
<p><strong>相談</strong></p>
<p>認可外施設選びや加点の条件について不明な点は、交野市こども園課に相談してみましょう。</p>
</div>`,
    publishedAt: "2026-04-26",
    popularity: 35,
  },
];

registerArticles(articles);
