import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  // ===== 保活の基本 (1) =====
  {
    slug: "hokatsu-schedule",
    citySlug: "okegawa",
    title: "桶川市の保活スケジュール　令和8年度4月入園の流れ",
    description:
      "桶川市の認可保育園の申込時期・選考の流れ・結果通知の時期をわかりやすく解説。令和8年度4月入園のスケジュールを中心にまとめました。",
    image:
      "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>令和8年度（2026年度）4月入園のスケジュール</h2>
<p>桶川市の4月入園は<strong>一次利用調整</strong>と<strong>二次利用調整</strong>の2回に分かれています。申込先は桶川市子ども未来部保育課です。</p>

<h3>一次利用調整</h3>
<table>
<tr><th>項目</th><th>日程</th></tr>
<tr><td>申込受付期間</td><td>令和7年11月上旬〜12月上旬</td></tr>
<tr><td>結果通知</td><td>令和8年1月下旬</td></tr>
</table>

<h3>二次利用調整</h3>
<table>
<tr><th>項目</th><th>日程</th></tr>
<tr><td>申込受付期間</td><td>令和8年2月上旬〜2月中旬</td></tr>
<tr><td>結果通知</td><td>令和8年3月上旬</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>一次で不承諾だった方は自動的に二次の対象になります。希望園の変更も可能です。</p>
</div>

<h2>いつから動き始めるべき？</h2>

<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>4月〜5月：情報収集スタート</strong>
<p>桶川市の認可保育園は約20か所。エリアや園の特徴を調べましょう。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>6月〜9月：保育園見学</strong>
<p>気になる園に電話して見学予約。見学のベストシーズンです。</p>
</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>10月：申込案内の入手</strong>
<p>桶川市が発行する「保育施設利用のご案内」を入手しましょう。</p>
</div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content">
<strong>11月〜12月：申込書類の準備・提出</strong>
<p>就労証明書などの書類を揃えて保育課へ提出します。</p>
</div>
</div>

<h2>途中入園（5月〜3月）の申込</h2>
<p>各月の申込締切日は、入園希望月の<span class="highlight">前月10日頃</span>です。詳しくは桶川市の公式サイトをご確認ください。</p>`,
    publishedAt: "2026-04-26",
    popularity: 55,
  },
  // ===== 選考のしくみ =====
  {
    slug: "scoring-system-guide",
    citySlug: "okegawa",
    title: "桶川市の点数のしくみ　基本指数と調整指数をやさしく解説",
    description:
      "桶川市の保育園入園選考で使われる基本指数と調整指数の仕組みを、初めての方にもわかるように解説します。",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>点数ってなに？</h2>
<p>桶川市の保育園入園は「先着順」ではなく「点数（指数）」の高い順に内定が決まります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>選考指数 = 基本指数（父）+ 基本指数（母）+ 調整指数</p>
</div>

<h2>基本指数とは？</h2>
<p>父母それぞれの「保育が必要な理由」を点数化したものです。1人あたり最大<span class="highlight">20点</span>で、父母合計の最大は<span class="highlight">40点</span>。</p>
<p>最も多い「就労」の場合、月160時間以上で満点の20点になります。</p>

<table>
<tr><th>就労状況</th><th>指数</th></tr>
<tr><td>月160時間以上</td><td>20</td></tr>
<tr><td>月120時間以上160時間未満</td><td>18</td></tr>
<tr><td>月100時間以上120時間未満</td><td>16</td></tr>
<tr><td>月80時間以上100時間未満</td><td>14</td></tr>
<tr><td>月64時間以上80時間未満</td><td>12</td></tr>
</table>

<h2>調整指数とは？</h2>
<p>世帯の特別な事情に応じて加減される点数です。加算項目と減算項目があります。</p>

<h3>主な加算項目</h3>
<ul>
<li>ひとり親世帯（就労中）：<span class="highlight">+5点</span></li>
<li>きょうだいが在園中：<span class="highlight">+3点</span></li>
<li>認可外保育施設の利用実績：<span class="highlight">+3点</span></li>
<li>生活保護世帯：<span class="highlight">+3点</span></li>
<li>育休明け復職予定：<span class="highlight">+2点</span></li>
</ul>

<h3>主な減算項目</h3>
<ul>
<li>市外からの申込：<span class="highlight">-10点</span></li>
<li>認可園からの転園希望：<span class="highlight">-5点</span></li>
<li>同居祖父母が保育可能：<span class="highlight">-3点</span></li>
</ul>`,
    publishedAt: "2026-04-26",
    popularity: 65,
  },
  // ===== 点数アップ =====
  {
    slug: "score-up-tips",
    citySlug: "okegawa",
    title: "桶川市で点数を1点でも上げる方法　加点のコツ",
    description:
      "桶川市の入園選考で調整指数の加点を最大限に活用する方法をまとめました。",
    image:
      "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>加点の取りこぼしをなくそう</h2>
<p>桶川市の入園選考では<span class="highlight">1点</span>の差が明暗を分けることも。使える加点は漏れなく活用しましょう。</p>

<h3>加点チェックリスト</h3>

<ul>
<li>ひとり親で就労中 → <span class="highlight">+5点</span></li>
<li>きょうだいが希望施設に在園中 → <span class="highlight">+3点</span></li>
<li>認可外保育施設に月ぎめで預けている → <span class="highlight">+3点</span></li>
<li>生活保護を受給中 → <span class="highlight">+3点</span></li>
<li>きょうだいを同時に申込 → <span class="highlight">+2点</span></li>
<li>育休・産休から入園月に復帰予定 → <span class="highlight">+2点</span></li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>認可外保育施設に預けながら翌年の4月入園を申し込むと、+3点の加点がつきます。0歳児クラスで認可外に預け、1歳児クラスで認可園を狙うのは桶川市でも有効な戦略です。</p>
</div>

<div class="info-box">
<p><strong>注意すべき減点項目</strong></p>
<p>桶川市外からの申込は-10点、認可園からの転園は-5点、同居祖父母が保育可能な場合は-3点の減点があります。特に市外からの申込は大幅な減点となるため要注意です。</p>
</div>`,
    publishedAt: "2026-04-26",
    popularity: 60,
  },
  // ===== 同点対策 =====
  {
    slug: "tiebreaker-rules",
    citySlug: "okegawa",
    title: "桶川市で同点になったらどうなる？　優先順位のしくみ",
    description:
      "桶川市の保育園入園選考で同点になった場合の優先順位と対策を解説します。",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>同点の場合の優先順位</h2>
<p>桶川市では選考指数が同点の場合、以下の順番で優先されます。</p>

<ol>
<li>ひとり親世帯</li>
<li>希望する保育施設にきょうだいが在園している世帯</li>
<li>基本指数が高い世帯（調整指数による加点が少ない=就労状況が安定）</li>
<li>桶川市の居住期間が長い世帯</li>
<li>所得が低い世帯</li>
</ol>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>きょうだいが在園中の園を希望に入れると、指数+3点だけでなく同点時の優先順位でも有利になります。</p>
</div>

<h2>対策のポイント</h2>
<ul>
<li>加点を1つでも積み上げて同点を避ける</li>
<li>きょうだいが在園中の園を第1希望にする</li>
<li>ボーダーラインが低い園も希望に入れる</li>
</ul>

<div class="info-box">
<p><strong>情報</strong></p>
<p>桶川市では過去の入園最低指数を公開していることがあります。保育課の窓口で確認してみましょう。</p>
</div>`,
    publishedAt: "2026-04-26",
    popularity: 48,
  },
  // ===== 働き方と加点 =====
  {
    slug: "part-time-work-score",
    citySlug: "okegawa",
    title: "桶川市のパート・フリーランスの点数　働き方で加点が変わる",
    description:
      "桶川市の保育園入園選考における、パートタイムやフリーランスの方の点数計算を詳しく解説します。",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>労働時間で変わる点数</h2>
<p>桶川市では労働時間が正確に判定されます。フルタイムではなくても、月64時間以上あれば<span class="highlight">12点</span>の加点が得られます。</p>

<h3>就労時間別の点数</h3>
<table>
<tr><th>月あたり労働時間</th><th>点数</th></tr>
<tr><td>月160時間以上</td><td>20</td></tr>
<tr><td>月120時間以上160時間未満</td><td>18</td></tr>
<tr><td>月100時間以上120時間未満</td><td>16</td></tr>
<tr><td>月80時間以上100時間未満</td><td>14</td></tr>
<tr><td>月64時間以上80時間未満</td><td>12</td></tr>
<tr><td>月48時間以上64時間未満</td><td>8</td></tr>
</table>

<h2>パートタイムの方へ</h2>
<p>月64時間以上働いていれば、認可保育園の入園選考で有利になります。時給800円として月8時間程度（週2日）のペースでも基準を満たします。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>就労証明書は給与明細や勤務表から正確に記入されるため、虚偽のないようにしましょう。</p>
</div>`,
    publishedAt: "2026-04-26",
    popularity: 50,
  },
  // ===== ひとり親加点 =====
  {
    slug: "single-parent-score",
    citySlug: "okegawa",
    title: "桶川市のひとり親世帯の加点　シングルマザーの保活ガイド",
    description:
      "桶川市のひとり親世帯（母子家庭・父子家庭）の入園選考について、加点制度と対策をまとめました。",
    image:
      "https://images.unsplash.com/photo-1542206395-5fee9e78416a?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>ひとり親世帯は+5点の加点対象</h2>
<p>桶川市では<strong>母子家庭または父子家庭で就労中</strong>の場合、調整指数で<span class="highlight">+5点</span>の加点を受けられます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>ひとり親で月48時間以上の就労があれば、基本指数8点+調整指数5点=13点となり、フルタイムの共働き世帯（20点）に近い点数を確保できます。</p>
</div>

<h2>加点に必要な手続き</h2>
<ul>
<li>児童扶養手当の支給決定通知書</li>
<li>戸籍謄本（離婚等の事実を証明）</li>
<li>就労証明書（就労中であることの証明）</li>
</ul>

<h2>同点時の優先順位でも有利</h2>
<p>同点になった場合、ひとり親世帯は最優先で選考されます。加点だけでなく、タイブレーク時にも有利です。</p>

<div class="info-box">
<p><strong>相談窓口</strong></p>
<p>ひとり親世帯の手当や支援について、桶川市子ども未来部保育課で相談できます。必要な書類の確認も可能です。</p>
</div>`,
    publishedAt: "2026-04-26",
    popularity: 45,
  },
  // ===== 育休タイミング =====
  {
    slug: "parental-leave-timing",
    citySlug: "okegawa",
    title: "桶川市の育休からの復帰　入園月のタイミングが重要",
    description:
      "桶川市の保育園入園と育休復帰のタイミングについて、加点を最大化する戦略をまとめました。",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>育休復帰で+2点の加点</h2>
<p>桶川市では<span class="highlight">入園月に職場復帰する予定がある</span>場合、調整指数で+2点の加点を受けられます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>+2点は小さく見えるかもしれませんが、競争が激しい0歳児クラスでは1点の差が合否を分けることもあります。入園月に合わせて復帰予定であれば必ず申告しましょう。</p>
</div>

<h2>加点に必要な書類</h2>
<ul>
<li>育休中であることを証明する書類（給与明細など）</li>
<li>職場復帰の予定を示す復帰予定通知書</li>
</ul>

<h2>育休の長さと入園タイミング</h2>
<p>子どもの月齢によって育休を取得します。一般的には：</p>
<ul>
<li>0歳4月生まれ → 生後10か月〜1歳での復帰（1歳4月入園が有利）</li>
<li>4月生まれ → 生後12か月での復帰（翌年4月が目安）</li>
</ul>

<div class="info-box">
<p><strong>注意</strong></p>
<p>育休中は「保育が必要」という理由になります。育休期間中に認可園への入園が決まった場合、復帰までは保育のニーズが高いと判断される傾向があります。</p>
</div>`,
    publishedAt: "2026-04-26",
    popularity: 42,
  },
  // ===== 待機児童 =====
  {
    slug: "nursery-wait-time",
    citySlug: "okegawa",
    title: "桶川市の待機児童状況　入園難易度を見極めるポイント",
    description:
      "桶川市の待機児童数や入園競争率の実情、エリアごとの難易度を分析しました。",
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>桶川市の待機児童状況</h2>
<p>桶川市は埼玉県中東部の人口約7.4万人の市です。認可保育園は約20か所。人口規模に比べて施設が限定的なため、特定のエリアで競争が激しい傾向があります。</p>

<div class="point-box">
<p><strong>参考値</strong></p>
<p>以下は参考値です。最新の待機児童数については桶川市子ども未来部保育課にお問い合わせください。</p>
</div>

<h2>エリアごとの競争率（参考値）</h2>
<ul>
<li><strong>駅前エリア</strong>：競争が激しい傾向（ニーズが高い）</li>
<li><strong>郊外エリア</strong>：比較的空きがある園も存在</li>
</ul>

<h2>0歳児vs1歳児以上</h2>
<p>一般的に0歳児クラスの方が入園しやすい傾向があります。月齢による定員制限があるためです。</p>

<div class="info-box">
<p><strong>最新情報の確認</strong></p>
<p>待機児童数や入園選考の状況は毎年変動します。正確な情報は桶川市の公式サイトで最新のデータをご確認ください。</p>
</div>`,
    publishedAt: "2026-04-26",
    popularity: 40,
  },
  // ===== 申込チェックリスト =====
  {
    slug: "application-checklist",
    citySlug: "okegawa",
    title: "桶川市の申込チェックリスト　書類の準備方法と注意点",
    description:
      "桶川市の保育園申込に必要な書類を、チェックリスト形式でまとめました。",
    image:
      "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>申込に必要な書類（参考値）</h2>
<p>桶川市の保育施設申込に必要な書類は、保育が必要な理由によって異なります。以下は参考値です。最新の書類要件は、桶川市が発行する「保育施設利用のご案内」でご確認ください。</p>

<h3>全員共通</h3>
<ul>
<li>保育施設入所申込書</li>
<li>世帯票</li>
<li>父母の指数証明書</li>
<li>マイナンバー確認書類と本人確認書類</li>
</ul>

<h3>就労の場合</h3>
<ul>
<li>就労証明書（会社員の場合）</li>
<li>事業開始届・営業許可書等（自営業の場合）</li>
<li>給与明細または営業報告書</li>
</ul>

<h3>そのほかの場合</h3>
<ul>
<li>病気・障害の場合：診断書や手帳のコピー</li>
<li>出産予定の場合：母子健康手帳のコピー</li>
<li>就学の場合：在学証明書など</li>
</ul>

<h2>書類準備のコツ</h2>
<ul>
<li>就労証明書は勤務先に早めに依頼する（1〜2週間かかる場合も）</li>
<li>必要書類は桶川市のホームページで事前に確認</li>
<li>不備があると受理されないため、窓口での事前確認が おすすめ</li>
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
    citySlug: "okegawa",
    title: "桶川市で認可外から認可園への転園　ステップアップガイド",
    description:
      "認可外保育施設から桶川市の認可園へのステップアップについて、加点制度と戦略をまとめました。",
    image:
      "https://images.unsplash.com/photo-1457364983758-510f8afa9f5f?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>認可外から認可へ　+3点の加点戦略</h2>
<p>桶川市では<span class="highlight">認可外保育施設に月ぎめで預けている場合、+3点の加点</span>を受けられます。これを活用して0歳児クラスを認可外で過ごし、翌年度に認可園へ転園するのは有効な戦略です。</p>

<h2>0歳児を認可外で過ごすメリット</h2>
<ul>
<li>認可外は入園しやすい（親面接が多い）</li>
<li>翌年度の認可園申込時に+3点の加点が受けられる</li>
<li>月64時間以上預けていれば加点対象になる</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>認可外の保育料は高めですが、1年間で認可園への加点が得られると考えると、長期的な投資としての価値があります。</p>
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
<p>認可外施設選びや加点の条件について不明な点は、桶川市子ども未来部保育課に相談してみましょう。</p>
</div>`,
    publishedAt: "2026-04-26",
    popularity: 35,
  },
];

registerArticles(articles);
