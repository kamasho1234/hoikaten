import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  // ===== 保活の基本 (1) =====
  {
    slug: "hokatsu-schedule",
    citySlug: "kitakyushu",
    title: "北九州市の保活スケジュール　令和8年度4月入園の流れ",
    description:
      "北九州市の認可保育園の申込時期・選考の流れ・結果通知の時期をわかりやすく解説。令和8年度4月入園のスケジュールを中心にまとめました。",
    image:
      "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>令和8年度（2026年度）4月入園のスケジュール</h2>
<p>北九州市の4月入園は<strong>1次利用調整</strong>と<strong>2次利用調整</strong>の2回に分かれています。秋から冬にかけてが勝負の時期です。</p>

<h3>1次利用調整</h3>
<table>
<tr><th>項目</th><th>日程</th></tr>
<tr><td>案内冊子配布開始</td><td>令和7年9月頃</td></tr>
<tr><td>申込受付期間</td><td>令和7年10月〜11月中旬</td></tr>
<tr><td>結果通知</td><td>令和8年2月下旬</td></tr>
</table>

<h3>2次利用調整</h3>
<table>
<tr><th>項目</th><th>日程</th></tr>
<tr><td>受入可能児童数の公開</td><td>令和8年3月4日（水）〜3月9日（月）</td></tr>
<tr><td>申込受付</td><td>令和8年3月上旬</td></tr>
<tr><td>結果通知</td><td>令和8年3月下旬</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>1次で保留になった方は自動的に2次の対象になります。2次受付前に受入可能児童数が公開されるので、希望園の変更を検討しましょう。</p>
</div>

<h2>いつから動き始めるべき？</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>4月〜6月：情報収集スタート</strong>
<p>北九州市の保育施設の種類やエリアの特徴を調べましょう。</p>
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
<strong>9月〜10月：案内冊子を入手・書類準備</strong>
<p>「保育所等の利用（入所）のごあんない」を入手し、就労証明書などを準備します。</p>
</div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content">
<strong>10月〜11月：申込書類の提出</strong>
<p>各区役所の子ども・家庭相談コーナーに提出します。</p>
</div>
</div>

<h2>途中入園（5月〜3月）の申込</h2>
<p>途中入園の申込締切は、入園希望月の<span class="highlight">前月10日頃</span>です。詳しくは<a href="https://www.city.kitakyushu.lg.jp/contents/12100069.html" target="_blank" rel="noopener">北九州市公式サイト「保育所等の利用のごあんない」</a>をご確認ください。</p>`,
    publishedAt: "2026-03-28",
    popularity: 55,
  },
  // ===== 選考のしくみ (2) =====
  {
    slug: "scoring-system-guide",
    citySlug: "kitakyushu",
    title: "北九州市の入園点数のしくみ　基本点数と調整点数を解説",
    description:
      "北九州市の保育園入園選考で使われる「基本点数」と「調整点数」のしくみを、初めての方にもわかるように解説します。",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>北九州市の点数制度の特徴：合算方式・高得点型</h2>
<p>北九州市の入園選考は「利用調整基準点」の高い順に内定が決まります。最大の特徴は、1人あたりの満点が<span class="highlight">220点</span>と非常に高いことです。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>利用調整基準点 ＝ 父の基本点数 ＋ 母の基本点数 ＋ 調整点数</p>
</div>

<h2>基本点数とは？</h2>
<p>保護者それぞれの「保育が必要な理由」を点数化したものです。1人あたり最大<span class="highlight">220点</span>で、父母合計の最大は<span class="highlight">440点</span>です。</p>

<table>
<tr><th>就労状況</th><th>基本点数</th></tr>
<tr><td>月120時間以上の就労</td><td>220点（満点）</td></tr>
<tr><td>月120時間未満の就労</td><td>130点</td></tr>
</table>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>北九州市の就労区分は<strong>2段階のみ</strong>です。月120時間以上ならすべて同じ220点。時間が長いからといってさらに加点されることはありません。</p>
</div>

<h2>調整点数とは？</h2>
<p>世帯の状況に応じて加減される点数です。代表的な項目は以下の通りです。</p>
<ul>
<li>ひとり親世帯：<span class="highlight">+230点</span></li>
<li>保育士として就労：<span class="highlight">+200点</span></li>
<li>きょうだいが在園中の園を希望：<span class="highlight">+170点</span></li>
<li>育休復帰（入園月に復帰）：<span class="highlight">+170点</span></li>
<li>育休復帰（入園翌月に復帰）：<span class="highlight">+140点</span></li>
<li>多子世帯（3人以上）：<span class="highlight">+10点</span></li>
</ul>

<p>北九州市は他の自治体と比べて<span class="highlight">1ポイントの値が大きい</span>のが特徴です。調整点数だけで数百点の差がつきます。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新の利用調整基準表は<a href="https://www.city.kitakyushu.lg.jp/contents/12100069.html" target="_blank" rel="noopener">北九州市公式サイト「保育所等の利用のごあんない」</a>でご確認ください。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 65,
  },
  // ===== 点数アップ (3) =====
  {
    slug: "score-up-checklist",
    citySlug: "kitakyushu",
    title: "北九州市で点数を上げるコツ　加点のチェックリスト",
    description:
      "北九州市の保育園入園選考で調整点数を最大限に活用する方法を、チェックリスト形式で解説します。",
    image:
      "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>北九州市は調整点数の幅がとにかく大きい</h2>
<p>北九州市の特徴は、調整点数が<span class="highlight">数十点〜数百点</span>単位と非常に大きいことです。1つの加点項目で勝負が決まることもあります。</p>

<h3>加点チェックリスト</h3>
<table>
<tr><th>加点項目</th><th>点数</th><th>条件</th></tr>
<tr><td>ひとり親世帯</td><td>+230点</td><td>ひとり親であること</td></tr>
<tr><td>保育士として就労</td><td>+200点</td><td>保育施設等で勤務</td></tr>
<tr><td>きょうだいが在園中</td><td>+170点</td><td>同一園への申込が条件</td></tr>
<tr><td>育休復帰（入園月）</td><td>+170点</td><td>入園月中に復職</td></tr>
<tr><td>育休復帰（入園翌月）</td><td>+140点</td><td>入園翌月に復職</td></tr>
<tr><td>多子世帯</td><td>+10点</td><td>18歳未満の子が3人以上</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>育休復帰の加点が<strong>+170点</strong>と非常に大きいです。入園月に復帰するか翌月に復帰するかで30点の差があるため、可能なら入園月に復帰しましょう。</p>
</div>

<h2>フルタイム共働き＋育休復帰が標準パターン</h2>
<p>父母ともに月120時間以上の就労（各220点＝合計440点）＋育休復帰加点（+170点）＝<span class="highlight">610点</span>が多くの家庭の到達ラインです。</p>

<h2>就労区分は2段階のみ</h2>
<p>北九州市は月120時間以上か未満かの<span class="highlight">2段階</span>です。月119時間だと130点、月120時間だと220点になり、<span class="highlight">90点もの差</span>がつきます。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>月120時間のラインは就労証明書で厳密に確認されます。勤務先に正確な時間数を記載してもらいましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>全項目の詳細は<a href="https://www.city.kitakyushu.lg.jp/contents/12100069.html" target="_blank" rel="noopener">北九州市公式サイト「保育所等の利用のごあんない」</a>でご確認ください。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 100,
  },
  // ===== 同点時の優先順位 (4) =====
  {
    slug: "tiebreaker-rules",
    citySlug: "kitakyushu",
    title: "北九州市で同点になったらどうなる？優先順位を解説",
    description:
      "北九州市の保育園入園選考で同じ点数になった場合の優先順位のしくみを、わかりやすく解説します。",
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>同点のとき、どうやって決まるの？</h2>
<p>北九州市の入園選考では、利用調整基準点が同点の場合に優先順位で判定されます。加点の幅が大きいため完全な同点は比較的少ないですが、同じ条件の世帯同士で並ぶことはあります。</p>

<h3>北九州市の主な優先順位</h3>
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
<strong>保育の必要性が高い世帯</strong>
<p>基本点数が高い（＝両親とも就労時間が長い）世帯が優先されます。</p>
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
<p>北九州市は調整点数の刻みが大きいため、他の自治体に比べて「完全な同点」は起きにくい仕組みです。ただし、育休復帰＋フルタイム同士の610点で並ぶケースはあります。</p>
</div>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>優先順位の全項目は公式の利用調整基準表に記載されています。不明な点は各区役所の子ども・家庭相談コーナーに問い合わせましょう。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳細は<a href="https://www.city.kitakyushu.lg.jp/contents/12100069.html" target="_blank" rel="noopener">北九州市公式サイト「保育所等の利用のごあんない」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 85,
  },
  // ===== 時短勤務と点数 (5) =====
  {
    slug: "jitan-kinmu-score",
    citySlug: "kitakyushu",
    title: "北九州市で時短勤務だと点数はどうなる？2段階制の注意点",
    description:
      "北九州市の保育園入園選考で時短勤務を取得した場合の点数への影響と、2段階制ならではの注意点を解説します。",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>北九州市の就労区分は2段階だけ</h2>
<p>北九州市の基本点数は、就労時間が月120時間以上か未満かの<span class="highlight">2段階</span>しかありません。この境界線が時短勤務で問題になります。</p>

<table>
<tr><th>就労時間</th><th>基本点数</th><th>差</th></tr>
<tr><td>月120時間以上</td><td>220点</td><td rowspan="2"><span class="highlight">90点差</span></td></tr>
<tr><td>月120時間未満</td><td>130点</td></tr>
</table>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>月120時間のラインを1時間でも下回ると、基本点数が<span class="highlight">90点も下がります</span>。時短勤務で120時間を切らないか、必ず確認してください。</p>
</div>

<h2>時短勤務の典型パターンで確認</h2>
<table>
<tr><th>勤務パターン</th><th>月の就労時間</th><th>基本点数</th></tr>
<tr><td>8時間×週5日（フルタイム）</td><td>約160時間</td><td>220点</td></tr>
<tr><td>7時間×週5日</td><td>約140時間</td><td>220点</td></tr>
<tr><td>6時間×週5日</td><td>約120時間</td><td>220点（ギリギリ）</td></tr>
<tr><td>5時間×週5日</td><td>約100時間</td><td>130点</td></tr>
<tr><td>6時間×週4日</td><td>約96時間</td><td>130点</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>1日6時間×週5日ならギリギリ月120時間に届きますが、祝日が多い月は下回る可能性があります。就労証明書の記載をよく確認しましょう。</p>
</div>

<h2>時短でも120時間を維持するコツ</h2>
<ul>
<li>1日の勤務時間を<span class="highlight">6時間以上</span>に設定する</li>
<li>週の勤務日数を<span class="highlight">5日</span>維持する</li>
<li>勤務先に「月120時間以上」と明記してもらう</li>
</ul>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>就労証明書の様式は<a href="https://www.city.kitakyushu.lg.jp/ko-katei/12100082.html" target="_blank" rel="noopener">北九州市公式サイト</a>からダウンロードできます。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 90,
  },
  // ===== 落ちたときの選択肢 (6) =====
  {
    slug: "ochita-sentakushi",
    citySlug: "kitakyushu",
    title: "北九州市で保育園に落ちたときの5つの選択肢",
    description:
      "北九州市の認可保育園の選考で保留になった場合に検討すべき5つの選択肢を具体的に紹介します。",
    image:
      "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=800&h=400&fit=crop",
    category: "入れなかったら",
    categoryColor: "rose",
    content: `<h2>保留になっても大丈夫。次の一手を考えましょう</h2>
<p>北九州市は待機児童ゼロを<span class="highlight">11年以上</span>継続していますが、希望する園に入れないケースはあります。</p>

<div class="step">
<div class="step-num">1</div>
<div class="step-content">
<strong>2次利用調整を待つ</strong>
<p>1次で保留の方は自動的に2次の対象です。2次の受入可能児童数は3月上旬に公開されるので、空きのある園への変更を検討しましょう。</p>
</div>
</div>

<div class="step">
<div class="step-num">2</div>
<div class="step-content">
<strong>認可外保育施設を探す</strong>
<p>北九州市内にも認可外保育施設があります。認可外に預けながら翌年度の認可を再申請する方法があります。</p>
</div>
</div>

<div class="step">
<div class="step-num">3</div>
<div class="step-content">
<strong>企業主導型保育施設を利用する</strong>
<p>企業主導型保育施設は認可外ですが、国の助成を受けており保育料が抑えられています。施設に直接申し込みます。</p>
</div>
</div>

<div class="step">
<div class="step-num">4</div>
<div class="step-content">
<strong>小規模保育事業を利用する</strong>
<p>0〜2歳児対象の小規模保育は、比較的空きがあることがあります。3歳以降の連携施設がある園もあります。</p>
</div>
</div>

<div class="step">
<div class="step-num">5</div>
<div class="step-content">
<strong>別のエリアの園を検討する</strong>
<p>小倉北区や八幡西区は激戦ですが、小倉南区や門司区には空きがある園もあります。通勤ルートを見直して検討しましょう。</p>
</div>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>北九州市は「待機児童ゼロ」ですが、希望する特定の園に入れない「隠れ待機児童」は存在します。エリアを広げて探すことが大切です。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>受入可能児童数は<a href="https://www.city.kitakyushu.lg.jp/contents/12100143.html" target="_blank" rel="noopener">北九州市公式サイト</a>で公開されています。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 80,
  },
  // ===== 認可外で加点を得る方法 (7) =====
  {
    slug: "ninkagai-katen",
    citySlug: "kitakyushu",
    title: "北九州市で認可外保育を活用して有利にする方法",
    description:
      "北九州市の保育園入園選考で認可外保育施設の利用がどう活きるのか、具体的な活用法を解説します。",
    image:
      "https://images.unsplash.com/photo-1587654780291-39c9404d7dd0?w=800&h=400&fit=crop",
    category: "点数アップ",
    categoryColor: "amber",
    content: `<h2>北九州市での認可外利用の位置づけ</h2>
<p>北九州市では、認可外保育施設の利用実績が同点時の優先順位に影響します。また、就労のために認可外に預けている場合は基本点数の算定で「就労中」として扱われます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>北九州市は加点の刻みが大きいため、完全な同点は比較的少ないですが、認可外の利用実績は同点時の差をつける重要な要素です。</p>
</div>

<h2>認可外保育施設を利用するメリット</h2>
<ul>
<li>同点時の優先順位で有利になる</li>
<li>お子さんが集団保育に慣れることができる</li>
<li>復職して就労実績を積むことができる（月120時間以上の就労で220点を確保）</li>
</ul>

<h2>認可外保育施設の種類</h2>
<table>
<tr><th>施設の種類</th><th>特徴</th></tr>
<tr><td>認可外保育施設</td><td>市への届出済みの施設。施設によって保育料はさまざま</td></tr>
<tr><td>企業主導型保育施設</td><td>国の助成で保育料が抑えめ。地域枠での利用が可能</td></tr>
<tr><td>一時預かり事業</td><td>短時間の利用が可能だが、継続的な加点には不向き</td></tr>
</table>

<h2>「月120時間」の壁を意識しよう</h2>
<p>認可外に預けて復職する場合、就労時間が月120時間以上であれば基本点数<span class="highlight">220点</span>を確保できます。月120時間未満だと130点に下がるため、勤務時間の調整が重要です。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>育休中に認可外を利用しても「就労のため」とは認められない場合があります。復職後の利用が基本です。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>北九州市内の保育施設一覧は<a href="https://www.city.kitakyushu.lg.jp/contents/12100074.html" target="_blank" rel="noopener">北九州市公式サイト「保育所等一覧」</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 75,
  },
  // ===== 来年度の変更点 (8) =====
  {
    slug: "r8-changes",
    citySlug: "kitakyushu",
    title: "北九州市の令和8年度入園　前年度からの変更点まとめ",
    description:
      "北九州市の令和8年度保育所等利用申込みにおける前年度からの主な変更点をまとめました。",
    image:
      "https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=800&h=400&fit=crop",
    category: "最新情報",
    categoryColor: "purple",
    content: `<h2>令和8年度（2026年度）の主な変更・注目点</h2>
<p>北九州市の令和8年度の保育利用に関する主な変更点・注目ポイントをまとめました。</p>

<h3>1. こども誰でも通園制度の実施</h3>
<p>令和8年度から「こども誰でも通園制度（乳児等通園支援事業）」が本格化します。保育所等に通っていない<span class="highlight">0歳6か月〜満3歳未満</span>の児童が対象で、月一定時間まで利用可能です。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>「こども誰でも通園制度」は保活の加点には直接つながりませんが、お子さんの保育園体験や保護者のリフレッシュに活用できます。</p>
</div>

<h3>2. オンライン申請の拡充</h3>
<p>北九州市では保育所等の利用申込みについて、オンライン申請の対象が拡大されています。窓口に行かずに手続きできるケースが増えました。</p>

<h3>3. 利用調整基準表の確認</h3>
<p>利用調整基準表は毎年度見直しが行われます。令和8年度の基準表は「保育所等の利用（入所）のごあんない」に掲載されています。前年度と比較して変更がないか確認しましょう。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>利用調整基準の点数配分は毎年度見直される可能性があります。必ず最新の基準表で確認してください。</p>
</div>

<h3>4. 受入可能児童数の公開スケジュール</h3>
<p>2次利用調整の受入可能児童数は<span class="highlight">令和8年3月4日〜9日</span>に公開予定です。1次で保留の方はこの情報をもとに希望園を見直しましょう。</p>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新情報は<a href="https://www.city.kitakyushu.lg.jp/contents/12100069.html" target="_blank" rel="noopener">北九州市公式サイト「保育所等の利用のごあんない」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 70,
  },
  // ===== 人気エリアと入りやすい地域 (9) =====
  {
    slug: "area-guide",
    citySlug: "kitakyushu",
    title: "北九州市の人気エリアと入りやすい地域ガイド",
    description:
      "北九州市内の区ごとの保育園入園難易度の違いや、比較的入りやすい地域を解説します。",
    image:
      "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&h=400&fit=crop",
    category: "エリア情報",
    categoryColor: "teal",
    content: `<h2>待機児童ゼロでも地域差は大きい</h2>
<p>北九州市は<span class="highlight">11年以上連続</span>で待機児童ゼロを維持しています。しかし、区によって入園の難しさには大きな差があります。</p>

<h2>区ごとの入園難易度</h2>
<table>
<tr><th>難易度</th><th>区名</th><th>特徴</th></tr>
<tr><td>激戦</td><td>小倉北区・八幡西区</td><td>商業・住宅地が集中し人気園が多い</td></tr>
<tr><td>やや激戦</td><td>小倉南区・戸畑区</td><td>ファミリー層が増加中</td></tr>
<tr><td>標準</td><td>八幡東区・若松区</td><td>園によって差がある</td></tr>
<tr><td>比較的入りやすい</td><td>門司区</td><td>大規模園もあり空きが出やすい</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>「待機児童ゼロ」は市全体の統計であり、「八幡西区は空きがないけど、門司区なら入れる」という状況は珍しくありません。</p>
</div>

<h2>年齢による違い</h2>
<p>特に<span class="highlight">0〜1歳児クラス</span>の競争が激しいです。3歳児以上は受入枠が増えるため入りやすくなる傾向があります。</p>

<h2>通勤ルートを考慮した園選び</h2>
<p>北九州市は東西に長い都市です。JR鹿児島本線沿線は通勤に便利なため人気が高い一方、バス便の園は比較的空きがあります。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>人気園に希望を集中させず、通える範囲の園を幅広く希望に入れましょう。「共働き子育てしやすい街ランキング」上位の北九州市でも、特定の園への集中は起こっています。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>各園の受入可能児童数は<a href="https://www.city.kitakyushu.lg.jp/contents/12100143.html" target="_blank" rel="noopener">北九州市公式サイト</a>で公開されています。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 60,
  },
  // ===== 入園競争の実態/ボーダーライン (10) =====
  {
    slug: "competition-reality",
    citySlug: "kitakyushu",
    title: "北九州市の入園競争の実態　ボーダーラインは何点？",
    description:
      "北九州市の保育園入園選考における点数分布と実質的なボーダーラインを解説します。",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop",
    category: "選考のしくみ",
    categoryColor: "blue",
    content: `<h2>北九州市の点数スケール</h2>
<p>北九州市は父母各最大220点の合算方式＋調整点数で、他の自治体と比べて点数の桁が大きいのが特徴です。標準的なパターンを確認しましょう。</p>

<h2>標準的な点数パターン</h2>
<table>
<tr><th>世帯の状況</th><th>基本点数</th><th>調整点数</th><th>合計</th></tr>
<tr><td>フルタイム共働き＋育休復帰（入園月）</td><td>440点</td><td>+170点</td><td><span class="highlight">610点</span></td></tr>
<tr><td>フルタイム共働き＋育休復帰（翌月）</td><td>440点</td><td>+140点</td><td>580点</td></tr>
<tr><td>フルタイム共働き（加点なし）</td><td>440点</td><td>0点</td><td>440点</td></tr>
<tr><td>片方がパート（月120h未満）</td><td>350点</td><td>+170点</td><td>520点</td></tr>
<tr><td>ひとり親＋フルタイム</td><td>220点</td><td>+230点</td><td>450点</td></tr>
</table>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>フルタイム共働き＋育休復帰の<span class="highlight">610点</span>が事実上のボーダーラインです。激戦区では610点同士の勝負になることもあります。</p>
</div>

<h2>きょうだい加点の威力</h2>
<p>きょうだい在園加点は<span class="highlight">+170点</span>。フルタイム＋育休復帰＋きょうだい加点で<span class="highlight">780点</span>に達し、ほぼ確実に入園できるラインです。</p>

<h2>440点（加点なし）では厳しい？</h2>
<p>フルタイム共働きでも加点なしの440点では、人気園は厳しい状況です。育休復帰加点（+170点）の有無が大きな分かれ目になります。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>月120時間未満の就労だと基本点数が90点下がります。片方でも月120時間を下回ると、合計点に大きく響きます。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>利用調整基準の詳細は<a href="https://www.city.kitakyushu.lg.jp/contents/12100069.html" target="_blank" rel="noopener">北九州市公式サイト「保育所等の利用のごあんない」</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-03-28",
    popularity: 95,
  },
];

registerArticles(articles);
