import type { Article } from "./types";
import { registerArticles } from "./index";

const articles: Article[] = [
  // ========== 保活の基本 ==========
  {
    slug: "hokatsu-schedule",
    citySlug: "sasebo",
    title: "佐世保市の保活スケジュール　令和8年度4月入園の流れ",
    description:
      "佐世保市の令和8年度（2026年度）4月入園の申込時期・書類準備・結果通知の流れをまとめました。初めての保活でも迷わないスケジュールガイドです。",
    image:
      "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>令和8年度（2026年度）4月入園のスケジュール</h2>
<p>佐世保市の認可保育所・認定こども園の4月入園は、毎年11月に一斉受付が行われます。申込先は佐世保市役所の保育幼稚園課です。</p>

<h3>スケジュールの目安</h3>
<table>
<tr><th>項目</th><th>日程（目安）</th></tr>
<tr><td>申請書類配布開始</td><td>2025年10月頃〜</td></tr>
<tr><td>一斉申込受付</td><td>2025年11月1日〜11月30日</td></tr>
<tr><td>1次結果通知</td><td>2026年1月下旬〜2月頃</td></tr>
<tr><td>2次募集（空きがある場合）</td><td>2026年2月〜3月頃</td></tr>
</table>

<p>年度途中（5月〜11月）の入園は利用開始希望月の前々月の初日から末日まで、12月〜翌年3月の入園は10月1日〜10月31日が受付期間です。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>佐世保市では申請書類に不備がある場合は受付されません。就労証明書や必要書類を事前に確認し、余裕を持って準備しましょう。</p>
</div>

<h2>いつから動き始めるべき？</h2>
<div class="step">
<div class="step-num">1</div>
<div class="step-content"><strong>4月〜6月：情報収集</strong><p>佐世保市の「乳幼児施設の利用のしおり」を市のホームページまたは保育幼稚園課で入手しましょう。</p></div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content"><strong>6月〜9月：保育園見学</strong><p>気になる園に電話して見学予約。佐世保市は市域が広いため、通園距離も重要な検討ポイントです。</p></div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content"><strong>9月〜10月：書類準備</strong><p>就労証明書を勤務先に依頼。自営業の場合は「就労証明書（自営業等）」が必要です。</p></div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content"><strong>11月：申込</strong><p>必要書類を揃え、保育幼稚園課へ提出します。</p></div>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新の申込方法は<a href="https://www.city.sasebo.lg.jp/kodomomirai/hoyou/0903mousikomi.html" target="_blank" rel="noopener">佐世保市公式サイト「保育所等の利用申込」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 55,
  },

  // ========== 点数・選考 ==========
  {
    slug: "scoring-system-guide",
    citySlug: "sasebo",
    title: "佐世保市の入園点数のしくみ　基準点・世帯加算・児童加算をやさしく解説",
    description:
      "佐世保市の保育園入園選考で使われる「基準点」「世帯加算」「児童加算」の仕組みを、初めての方にもわかるように解説します。",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>点数制度の全体像</h2>
<p>佐世保市の認可保育所等は「先着順」ではなく、<strong>保育の必要性の高い世帯から優先</strong>して利用調整（選考）されます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>合計点数 ＝ 基準点（保護者1）＋ 基準点（保護者2）＋ 世帯加算 ＋ 児童加算</p>
</div>

<h2>基準点とは</h2>
<p>保護者それぞれの「保育を必要とする事由」を点数化したものです。就労の場合、1人あたり<span class="highlight">最大20点</span>、保護者2人の合計で<span class="highlight">最大40点</span>です。</p>
<table>
<tr><th>就労状況</th><th>基準点</th></tr>
<tr><td>月160時間以上</td><td>20</td></tr>
<tr><td>月150時間以上</td><td>19</td></tr>
<tr><td>月140時間以上</td><td>18</td></tr>
<tr><td>月120時間以上</td><td>16</td></tr>
<tr><td>月100時間以上</td><td>14</td></tr>
<tr><td>月60時間以上</td><td>10</td></tr>
</table>
<p>就労以外にも、疾病・障がい（最大20点）、介護・看護（最大20点）、出産（16点）、就学（最大18点）、求職活動（5点）が定められています。</p>

<h2>世帯加算とは</h2>
<p>世帯の状況に応じて加点される点数です。複数に該当する場合はそれぞれ加算されます。</p>
<table>
<tr><th>項目</th><th>点数</th></tr>
<tr><td>ひとり親世帯</td><td>+26</td></tr>
<tr><td>主たる生計維持者の失業（求職活動中）</td><td>+6</td></tr>
<tr><td>保護者の障害（重度）</td><td>+5</td></tr>
<tr><td>保護者の障害（その他）</td><td>+4</td></tr>
<tr><td>単身赴任中</td><td>+3</td></tr>
<tr><td>多胎児が同時に同一施設を希望</td><td>+2</td></tr>
<tr><td>育児休業を終了した場合</td><td>+1</td></tr>
</table>

<h2>児童加算とは</h2>
<p>利用希望のお子さんの状況に応じた加点です。</p>
<table>
<tr><th>項目</th><th>点数</th></tr>
<tr><td>特別児童扶養手当対象児童</td><td>+3</td></tr>
<tr><td>障害者手帳・療育手帳を所持</td><td>+2</td></tr>
<tr><td>地域型保育事業所の卒園児</td><td>+2</td></tr>
<tr><td>医師からの意見書あり</td><td>+1</td></tr>
</table>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>詳細は<a href="https://www.city.sasebo.lg.jp/kodomomirai/hoyou/riyoukijun.html" target="_blank" rel="noopener">佐世保市公式サイト「利用基準について」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 60,
  },

  // ========== 加点のコツ ==========
  {
    slug: "katen-no-kotsu",
    citySlug: "sasebo",
    title: "佐世保市で加点を増やすコツ　世帯加算・児童加算アップの具体策",
    description:
      "佐世保市の保育園入園選考で調整点数を上げるための具体的な方法を解説。ひとり親加算や育休復帰加点など、知っておきたいポイントをまとめました。",
    image:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>フルタイム共働き40点は安心？</h2>
<p>佐世保市では保護者がともにフルタイム勤務（月160時間以上）であれば、各20点ずつで<span class="highlight">基準40点</span>です。多くの申込者がこのラインに並ぶため、人気園では40点だけでは安心できない場合があります。</p>

<h2>加点を増やす具体策</h2>
<h3>1. 育児休業からの復帰（+1点）</h3>
<p>育児休業を終了して復帰する場合、世帯加算として+1点が加算されます。復帰時期を4月に合わせると加点が得られます。</p>

<h3>2. ひとり親世帯の加算（+26点）</h3>
<p>佐世保市のひとり親加算は<span class="highlight">+26点</span>と非常に大きく、他の自治体と比較しても手厚い加点です。該当する場合は必ず児童扶養手当証書等を提出しましょう。</p>

<h3>3. 就労時間を正確に申告する</h3>
<p>佐世保市は就労時間が10時間刻みで細かく点数化されています。月160時間以上で20点、月150時間以上で19点と差が出ます。残業を含めた実際の就労時間を正確に証明書に記載してもらうことが重要です。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>佐世保市は同点の場合、保育を必要とする事由の優先順位で判定されます。優先順位は「虐待・DV」＞「災害復旧」＞「疾病・障がい」＞「就労」＞「介護・看護」＞「妊娠・出産」＞「就学」＞「求職活動」の順です。</p>
</div>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>就労証明書に記載される就労時間がそのまま点数に反映されます。会社員の場合は休憩時間を含み通勤時間は除きます。自営業の場合は収入が保育料以上であることが目安となります。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 50,
  },

  // ========== 認可vs認可外 ==========
  {
    slug: "ninka-vs-ninkagai",
    citySlug: "sasebo",
    title: "佐世保市の認可保育園と認可外保育施設の違い　選び方ガイド",
    description:
      "佐世保市で認可保育園と認可外保育施設のどちらを選ぶべきか。費用・保育内容・入りやすさの違いをわかりやすく比較します。",
    image:
      "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&h=400&fit=crop",
    category: "保育園選び",
    categoryColor: "teal",
    content: `<h2>認可と認可外の基本的な違い</h2>
<table>
<tr><th>項目</th><th>認可保育園</th><th>認可外保育施設</th></tr>
<tr><td>設置基準</td><td>国の基準を満たす</td><td>都道府県に届出</td></tr>
<tr><td>保育料</td><td>所得に応じた負担</td><td>施設が独自に設定</td></tr>
<tr><td>申込先</td><td>佐世保市役所</td><td>施設に直接</td></tr>
<tr><td>選考</td><td>利用調整（点数制）</td><td>先着順が多い</td></tr>
</table>

<h2>佐世保市の認可外保育施設の特徴</h2>
<p>佐世保市内にも認可外保育施設があり、認可園に入れなかった場合の受け皿として利用されています。</p>

<h3>認可外を利用するメリット</h3>
<ul>
<li>先着順で入園しやすい</li>
<li>延長保育や休日保育に柔軟に対応する施設もある</li>
<li>認可園の空きを待つ間の預け先として活用できる</li>
</ul>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>佐世保市は年度後半（10月以降）は利用定員の制限が撤廃されるため、年度途中の入園チャンスもあります。認可外施設に預けながら認可園の空きを待つ戦略も有効です。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>佐世保市内の保育施設の一覧は<a href="https://www.city.sasebo.lg.jp/kodomomirai/hoyou/hoikuenakijokyo.html" target="_blank" rel="noopener">佐世保市公式サイト「保育施設一覧（空き状況）」</a>で確認できます。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 40,
  },

  // ========== 見学チェックリスト ==========
  {
    slug: "kengaku-checklist",
    citySlug: "sasebo",
    title: "佐世保市の保育園見学チェックリスト　確認すべき10のポイント",
    description:
      "佐世保市で保育園見学に行くとき確認すべきポイントを10項目のチェックリストにまとめました。広い市域ならではの注意点も紹介します。",
    image:
      "https://images.unsplash.com/photo-1524813686514-a57563d77965?w=800&h=400&fit=crop",
    category: "保育園選び",
    categoryColor: "teal",
    content: `<h2>見学で確認すべき10のポイント</h2>
<table>
<tr><th>No.</th><th>チェック項目</th></tr>
<tr><td>1</td><td>園の雰囲気（子どもたちの表情・先生の接し方）</td></tr>
<tr><td>2</td><td>保育方針と1日の流れ</td></tr>
<tr><td>3</td><td>給食の内容（アレルギー対応の有無）</td></tr>
<tr><td>4</td><td>延長保育の時間と料金</td></tr>
<tr><td>5</td><td>園庭の広さと遊具の充実度</td></tr>
<tr><td>6</td><td>通園路の交通事情（車での送迎が多いエリアか）</td></tr>
<tr><td>7</td><td>駐車場の有無と台数</td></tr>
<tr><td>8</td><td>保護者の行事参加の頻度</td></tr>
<tr><td>9</td><td>病児・病後児保育への対応</td></tr>
<tr><td>10</td><td>持ち物の準備（布団・おむつなど）</td></tr>
</table>

<h2>佐世保市ならではの注意点</h2>
<p>佐世保市は市域が広く、自動車での送迎が基本となるエリアが多いです。<strong>駐車場の広さや朝夕の混雑具合</strong>は見学時に必ず確認しましょう。</p>

<p>また、佐世保市には米軍基地があり、軍人・軍属の方の保育利用も行われています。多文化な環境が特徴の園もあります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>見学は6月〜9月がおすすめです。電話予約の際に「駐車場は何台分ありますか？」と聞いておくと当日スムーズです。</p>
</div>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>佐世保市では病児保育室が設置されています。万が一のときに利用できるよう、見学時に近隣の病児保育室の情報も確認しておくと安心です。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 40,
  },

  // ========== 育休中の保活 ==========
  {
    slug: "ikukyu-chu-hokatsu",
    citySlug: "sasebo",
    title: "育休中に始める佐世保市の保活　やるべきことリスト",
    description:
      "佐世保市で育児休業中に保活を進めるためのステップを時系列で解説。復帰時期の決め方や書類準備のコツも紹介します。",
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop",
    category: "育休・復職",
    categoryColor: "purple",
    content: `<h2>育休中の保活スケジュール</h2>
<p>育児休業中は赤ちゃんのお世話で忙しい時期ですが、保活は早めに動くほど有利です。佐世保市の4月入園を目指す場合のやるべきことを時系列で整理しました。</p>

<div class="step">
<div class="step-num">1</div>
<div class="step-content"><strong>出産後〜生後3か月：情報収集</strong><p>佐世保市の「乳幼児施設の利用のしおり」を入手し、自宅・職場周辺の保育園をリストアップします。</p></div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content"><strong>生後3〜6か月：保育園見学</strong><p>候補の園に電話して見学予約。3〜5園は見学するのが理想です。</p></div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content"><strong>9月〜10月：書類準備</strong><p>勤務先に就労証明書を依頼。育児休業期間が記載された就労証明書が必要です。</p></div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content"><strong>11月：申込</strong><p>書類を揃えて佐世保市役所の保育幼稚園課へ提出します。</p></div>
</div>

<h2>育休復帰で+1点の加点</h2>
<p>佐世保市では育児休業を終了した場合、世帯加算として<span class="highlight">+1点</span>が加算されます。復帰日を入園月に合わせるのがポイントです。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>2025年4月から育児休業給付金の延長審査が厳格化されました。給付金延長目的で「わざと落ちる」申込は認められません。通園可能な範囲で複数の園を希望しましょう。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 45,
  },

  // ========== 小規模保育園 ==========
  {
    slug: "shokibo-hoikuen",
    citySlug: "sasebo",
    title: "佐世保市の小規模保育園とは？メリットと3歳の壁の対策",
    description:
      "佐世保市の地域型保育事業所（小規模保育等、0〜2歳対象）の特徴やメリット、3歳以降の転園「3歳の壁」への対策を解説します。",
    image:
      "https://images.unsplash.com/photo-1587654780291-39c9404d7dd0?w=800&h=400&fit=crop",
    category: "保育園選び",
    categoryColor: "teal",
    content: `<h2>地域型保育事業所（小規模保育等）とは</h2>
<p>地域型保育事業所は定員6〜19人の少人数制で、0〜2歳児を対象とした保育施設です。佐世保市内にも複数設置されており、家庭的な雰囲気の中できめ細かい保育を受けられます。</p>

<h2>小規模保育のメリット</h2>
<ul>
<li>少人数なので一人ひとりに目が行き届く</li>
<li>認可保育園より入りやすい傾向がある</li>
<li>保育料は認可保育園と同じ（所得に応じた負担）</li>
</ul>

<h2>「3歳の壁」とは</h2>
<p>地域型保育事業所は2歳児クラスまでのため、3歳からは別の保育園や認定こども園に転園する必要があります。これが「3歳の壁」と呼ばれます。</p>

<h3>佐世保市の3歳の壁対策</h3>
<p>佐世保市では地域型保育事業所の卒園児に対して、児童加算として<span class="highlight">+2点</span>が加算されます。また、卒園者が連携施設を希望する場合は利用調整で最優先（点数選考よりも上位）で取り扱われます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>佐世保市では連携施設への優先入園制度があるため、3歳の壁は比較的乗り越えやすい仕組みになっています。入園時に連携施設がどこか確認しておきましょう。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 35,
  },

  // ========== 二人目の保活 ==========
  {
    slug: "futarime-hokatsu",
    citySlug: "sasebo",
    title: "佐世保市で二人目の保活　きょうだい同園のコツと多胎児加点",
    description:
      "佐世保市で二人目のお子さんの保活を進めるときのポイントを解説。きょうだい優先やきょうだい同時入園の仕組みを紹介します。",
    image:
      "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&h=400&fit=crop",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>きょうだい優先制度を活用しよう</h2>
<p>佐世保市では、前年度から既に利用中の児童のきょうだいが同一施設を希望する場合、年度当初の利用調整で<strong>点数選考よりも上位の優先順位</strong>で取り扱われます。これは非常に強力な優先制度です。</p>

<h2>多胎児（双子など）の加点</h2>
<p>多胎児が同時に同一施設を希望する場合、世帯加算として<span class="highlight">+2点</span>が加算されます。また、出産事由の基準点は通常16点ですが、多胎出産の場合は+3点で19点になります。</p>

<h2>同じ園に入るための戦略</h2>
<h3>第1希望はきょうだいの在園する園に</h3>
<p>きょうだい優先は在園中の園を希望した場合にのみ適用されます。別の園を第1希望にすると優先制度が使えないため注意が必要です。</p>

<h3>フルタイム共働き＋育休復帰で41点</h3>
<p>両親フルタイム（40点）に育休復帰加点（+1点）で<span class="highlight">合計41点</span>。さらにきょうだい優先制度が適用されれば、入園の可能性がかなり高まります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>佐世保市では第2子以降（同時在園の場合、1・2歳児）の保育料無償化が令和6年4月から始まっています。きょうだいで保育園に通う場合の家計の負担が軽減されています。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>第2子無償化の詳細は<a href="https://www.city.sasebo.lg.jp/kodomomirai/kodosei/m-magazine/dai2shihoikuryoumusyou.html" target="_blank" rel="noopener">佐世保市「第2子保育料無償化について」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 45,
  },

  // ========== 保育料 ==========
  {
    slug: "hoikuryou-guide",
    citySlug: "sasebo",
    title: "佐世保市の保育料はいくら？世帯年収別の目安と無償化制度",
    description:
      "佐世保市の認可保育園の保育料を世帯年収別にわかりやすく解説。3歳以上の無償化や第2子無償化についてもまとめました。",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    category: "制度解説",
    categoryColor: "amber",
    content: `<h2>佐世保市の保育料の決まり方</h2>
<p>認可保育園の保育料は、世帯の<strong>市町村民税所得割額</strong>に基づいて階層区分が決まり、子どもの年齢（3歳未満/3歳以上）と保育時間（標準時間/短時間）によって金額が異なります。</p>
<p>佐世保市では保育短時間認定者も保育標準時間の利用ができる独自の取り扱いがあります。</p>

<h2>保育料の目安（3歳未満・標準時間）</h2>
<table>
<tr><th>世帯年収の目安</th><th>月額保育料の目安</th></tr>
<tr><td>非課税世帯</td><td>0円</td></tr>
<tr><td>約300万円</td><td>約15,000〜25,000円</td></tr>
<tr><td>約500万円</td><td>約30,000〜40,000円</td></tr>
<tr><td>約700万円</td><td>約45,000〜55,000円</td></tr>
<tr><td>約1,000万円以上</td><td>約60,000円〜</td></tr>
</table>
<p>※上記は目安です。実際の金額は市町村民税額により異なります。</p>

<h2>3歳以上は無償化</h2>
<p>2019年10月から、3〜5歳児クラスの保育料は全国的に<span class="highlight">無償化</span>されています。ただし給食費（副食費）は別途負担が必要です。</p>

<h2>佐世保市の第2子保育料無償化</h2>
<p>佐世保市では令和6年4月から、同時在園における第2子以降（1・2歳児）の保育料無償化が始まっています。上のお子さんと同時に保育施設を利用している場合、第2子以降の保育料が無料になります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>保育料は毎年9月に切り替わります（前期4〜8月は前年度の市町村民税、後期9〜3月は当年度の市町村民税で算定）。</p>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>保育料の詳細は<a href="https://www.city.sasebo.lg.jp/kodomomirai/hoyou/hoikuryo.html" target="_blank" rel="noopener">佐世保市公式サイト「保育料（利用者負担額）の算定」</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 35,
  },

  // ========== 落ちたときの対処法 ==========
  {
    slug: "ochita-toki-taishohou",
    citySlug: "sasebo",
    title: "佐世保市で保育園に落ちたときの対処法　次にやるべきこと",
    description:
      "佐世保市の選考で保留になった場合の対処法を解説。2次募集・途中入園・認可外の活用・育休延長など、取れる選択肢をまとめました。",
    image:
      "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=800&h=400&fit=crop",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>保留通知が届いたら</h2>
<p>1次選考で保留になっても、まだ選択肢はあります。落ち着いて次のステップを検討しましょう。</p>

<h2>選択肢1：2次募集を待つ</h2>
<p>1次で辞退が出た枠や追加の空き枠で2次募集が行われることがあります。佐世保市の保育幼稚園課に問い合わせて、2次募集の有無と時期を確認しましょう。</p>

<h2>選択肢2：途中入園（5月以降）を申し込む</h2>
<p>年度途中の入園申込は随時受け付けています。佐世保市では年度後半（10月以降）は利用定員の制限が撤廃されるため、<span class="highlight">後半になるほど入園チャンスが広がります</span>。</p>

<h2>選択肢3：認可外保育施設を利用する</h2>
<p>認可外施設に預けて復職し、次の空きを待つ戦略があります。佐世保市の空き状況は市のホームページで確認できます。</p>

<h2>選択肢4：育児休業を延長する</h2>
<p>保留通知書があれば、育児休業を子どもが2歳になるまで延長でき、育児休業給付金も継続受給できます。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>2025年4月から育児休業給付金の延長審査が厳格化されています。給付金延長目的で「わざと落ちる」申込は認められなくなりました。通園可能な範囲で複数の園を希望してください。</p>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>佐世保市は年度当初（4月）は定員の115%、年度途中は125%、10月以降は制限撤廃と段階的に受入枠が広がります。諦めずに途中入園を狙いましょう。</p>
</div>`,
    publishedAt: "2026-04-05",
    popularity: 50,
  },
];

registerArticles(articles);
