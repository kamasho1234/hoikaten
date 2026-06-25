import type { Article } from "./types";
import { registerArticles } from "./index";

const handaArticles: Article[] = [
  {
    slug: "handa-guide",
    citySlug: "handa",
    title: "半田市の保活ガイド　令和8年度入園の流れ",
    description:
      "半田市の保育園入園に向けた基本的な流れ、スケジュール、必要な準備をまとめました。",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>半田市の保育園入園の基本流れ</h2>
<p>半田市では毎年秋に翌年度の4月入園申込を受け付けています。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>半田市の認可保育施設は<span class="highlight">Sum方式</span>で選考されます。父母の就労状況を合算した点数で優先順位が決まります。</p>
</div>

<h3>年間スケジュール（4月入園の場合）</h3>
<table>
<tr><th>時期</th><th>やること</th></tr>
<tr><td>6月〜7月</td><td>保育園情報の収集・見学</td></tr>
<tr><td>8月〜9月</td><td>申込書類の入手・就労証明書依頼</td></tr>
<tr><td>10月中旬</td><td>1次申込受付期限</td></tr>
<tr><td>1月中旬</td><td>1次結果通知</td></tr>
<tr><td>2月上旬</td><td>2次申込受付期限</td></tr>
<tr><td>2月下旬</td><td>2次結果通知</td></tr>
</table>

<div class="step">
<div class="step-num">1</div>
<div class="step-content"><strong>情報収集・見学</strong><p>半田市公式サイトで「保育施設利用のしおり」をダウンロードして、利用調整基準を確認します。</p></div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content"><strong>書類準備</strong><p>就労証明書を勤務先に依頼し、申込書類一式を揃えます。</p></div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content"><strong>申込</strong><p>期限までに必要書類を提出します。</p></div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content"><strong>結果確認</strong><p>通知日に指定の方法で結果を確認します。</p></div>
</div>

<div class="info-box">
<p><strong>公式情報</strong></p>
<p>最新情報は<a href="https://www.city.handa.lg.jp/" target="_blank" rel="noopener">半田市公式サイト</a>をご確認ください。</p>
</div>`,
    publishedAt: "2026-06-26",
    popularity: 72,
  },
  {
    slug: "handa-scoring-system",
    citySlug: "handa",
    title: "半田市の点数システム　Sum方式の仕組みを理解しよう",
    description:
      "半田市で採用されているSum方式（合算方式）の点数計算方法をやさしく解説します。",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>Sum方式とは</h2>
<p>半田市の認可保育施設は<strong>父母の基礎指数を合算した点数で優先順位を決める</strong>Sum方式を採用しています。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>選考指数 ＝ 父の基礎指数 ＋ 母の基礎指数（最大20点）</p>
<p>点数が高いほど優先的に入園できます。</p>
</div>

<h3>基礎指数の計算</h3>
<p>保護者1人あたりの基礎指数は、最大10点です。就労状況に応じた点数が付与されます。</p>

<table>
<tr><th>就労状況（保護者1人）</th><th>基礎指数</th></tr>
<tr><td>月150時間以上（フルタイム）</td><td>10</td></tr>
<tr><td>月120時間以上150時間未満</td><td>9</td></tr>
<tr><td>月100時間以上120時間未満</td><td>8</td></tr>
<tr><td>月90時間以上100時間未満</td><td>7</td></tr>
<tr><td>月60時間以上90時間未満</td><td>6</td></tr>
<tr><td>月60時間未満</td><td>0</td></tr>
</table>

<h2>調整指数（加点・減点）</h2>
<p>世帯の状況に応じて加点・減点される調整指数があります。</p>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>調整指数は点数を上げる場合もあれば、大きく下げる場合もあります。詳細は公式サイトで確認しましょう。</p>
</div>`,
    publishedAt: "2026-06-26",
    popularity: 70,
  },
  {
    slug: "handa-employment-score",
    citySlug: "handa",
    title: "半田市の就労点数　自宅と外での勤務で点数が違う",
    description:
      "半田市の点数システムにおける就労時間と就労形態ごとの点数の付き方をまとめました。",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>就労形態による点数の違い</h2>
<p>半田市では就労の場所によって基礎指数が異なります。同じ時間働いていても、外勤と内職では点数が異なるため注意が必要です。</p>

<div class="highlight">
<h3>居宅外就労（会社勤務など）</h3>
<table>
<tr><th>就労時間（月あたり）</th><th>基礎指数</th></tr>
<tr><td>150時間以上</td><td>10点</td></tr>
<tr><td>120時間以上150時間未満</td><td>9点</td></tr>
<tr><td>100時間以上120時間未満</td><td>8点</td></tr>
<tr><td>90時間以上100時間未満</td><td>7点</td></tr>
<tr><td>60時間以上90時間未満</td><td>6点</td></tr>
</table>
</div>

<div class="highlight">
<h3>居宅内就労（内職など）</h3>
<table>
<tr><th>就労時間（月あたり）</th><th>基礎指数</th></tr>
<tr><td>150時間以上</td><td>9点</td></tr>
<tr><td>120時間以上150時間未満</td><td>8点</td></tr>
<tr><td>100時間以上120時間未満</td><td>7点</td></tr>
<tr><td>90時間以上100時間未満</td><td>6点</td></tr>
<tr><td>60時間以上90時間未満</td><td>5点</td></tr>
</table>
</div>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>月60時間以上の内職であれば4点が付与されます。独立して自宅で事業をしている場合も、内職と同様に扱われることが多いです。</p>
</div>

<h3>その他の事由での点数</h3>
<ul>
<li><strong>出産</strong>：8点</li>
<li><strong>疾病（月20日以上通院または1月以上入院）</strong>：10点</li>
<li><strong>疾病（月15日以上通院）</strong>：6点</li>
<li><strong>育児休業中</strong>：3点</li>
<li><strong>求職中</strong>：1点</li>
</ul>`,
    publishedAt: "2026-06-26",
    popularity: 73,
  },
  {
    slug: "handa-adjustment-index",
    citySlug: "handa",
    title: "半田市の調整指数　加点・減点で優先順位が大きく変わる",
    description:
      "半田市の保育園選考における調整指数（加点・減点）の仕組みと具体例をまとめました。",
    category: "点数・選考",
    categoryColor: "blue",
    content: `<h2>調整指数の役割</h2>
<p>半田市では基礎指数に加えて、世帯の状況に応じた調整指数が加算・減算されます。この調整指数により最終的な選考点数が決定されます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>最終選考指数 = 基礎指数 + 調整指数（加点） - 減点</p>
</div>

<h3>主な加点事由</h3>
<ul>
<li><strong>ひとり親世帯</strong>：+15点</li>
<li><strong>きょうだい同施設入園</strong>：+8点</li>
<li><strong>育休復帰</strong>：+16点</li>
<li><strong>保育士（月120時間以上勤務）</strong>：+3点</li>
<li><strong>きょうだい同時申込</strong>：各申込に対して加点</li>
</ul>

<h3>減点事由と影響</h3>
<ul>
<li><strong>前年度滞納あり</strong>：-7点</li>
<li><strong>年度内転園</strong>：-5点</li>
<li><strong>市外勤務</strong>：-10点</li>
<li><strong>育休延長同意</strong>：-200点（大幅減点）</li>
</ul>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>育休延長に同意した場合は-200点という大幅な減点となります。入園タイミングは慎重に判断しましょう。</p>
</div>

<h3>障がいや介護がある場合</h3>
<p>保護者が障がいを持つ場合や、介護が必要な家族がいる場合も、身体障害等級や要介護状況に応じて基礎指数が決定されます。</p>
<table>
<tr><th>状況</th><th>基礎指数</th></tr>
<tr><td>身体1-2級・精神1級・療育A</td><td>10点</td></tr>
<tr><td>身体3-4級・精神2-3級・療育B</td><td>9点</td></tr>
<tr><td>その他の身体障がい</td><td>4点</td></tr>
</table>`,
    publishedAt: "2026-06-26",
    popularity: 71,
  },
  {
    slug: "handa-single-parent",
    citySlug: "handa",
    title: "半田市でひとり親は有利？　15点の加点で優先順位が上がる",
    description:
      "ひとり親世帯が半田市の保育園入園選考で受ける加点措置と、その他の支援制度をご紹介します。",
    category: "保活の基本",
    categoryColor: "green",
    content: `<h2>ひとり親世帯への加点</h2>
<p>半田市の保育園選考では、ひとり親世帯に対して<span class="highlight">調整指数で+15点</span>の加点があります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>両親揃った世帯と比べて大きなアドバンテージがあるため、ひとり親世帯は優先的に入園できる可能性が高まります。</p>
</div>

<h3>ひとり親と認定される要件</h3>
<ul>
<li>死別（死亡記載のある戸籍謄本）</li>
<li>離別（戸籍謄本・戸籍抄本）</li>
<li>未婚で出産（戸籍謄本）</li>
<li>配偶者が生死不明（公的書類）</li>
<li>配偶者からの遺棄等</li>
</ul>

<h3>ひとり親の申込時のポイント</h3>
<div class="step">
<div class="step-num">1</div>
<div class="step-content"><strong>証拠書類を準備</strong><p>戸籍謄本や戸籍抄本など、ひとり親であることを証明する書類が必須です。</p></div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content"><strong>就労証明書は正確に</strong><p>ひとり親世帯では保護者1人の就労状況で基礎指数が決まるため、就労時間を正確に証明書に記載してもらいます。</p></div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content"><strong>その他の支援制度も確認</strong><p>保育料減免や生活保護、母子父子寡婦福祉資金貸付などの制度も活用できる場合があります。</p></div>
</div>

<div class="info-box">
<p><strong>豆知識</strong></p>
<p>ひとり親の場合、保育料が世帯収入に応じて減免される場合があります。詳細は半田市役所の福祉部局に問い合わせましょう。</p>
</div>`,
    publishedAt: "2026-06-26",
    popularity: 74,
  },
  {
    slug: "handa-sibling-application",
    citySlug: "handa",
    title: "半田市で兄弟一緒に入園したい　加点と注意点",
    description:
      "半田市の保育園選考で兄弟姉妹の同時入園を目指す場合の加点措置と申込方法をまとめました。",
    category: "よくある質問",
    categoryColor: "rose",
    content: `<h2>兄弟姉妹の同時申込時の加点</h2>
<p>半田市では兄弟姉妹を同一施設に入園させる場合や、同時申込の場合に加点措置があります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p><strong>兄弟同施設加点：+8点</strong>（既に兄か姉が入園中で、もう一人を同じ施設に入園させる場合）</p>
<p><strong>同時申込加点：各申込に対して加算</strong></p>
</div>

<h3>同一施設への加点</h3>
<p>既に兄（または姉）が同じ保育園に入園中で、妹または弟を同じ施設に入園させたい場合、兄弟がいる子どもの基礎指数に+8点が加算されます。</p>

<h3>同時申込の場合</h3>
<p>上の子と下の子を同じ年度に複数の保育園に申し込む場合（例：第一希望の園に上の子、第二希望の園に下の子など）、申込数に応じた加点があります。</p>

<div class="step">
<div class="step-num">1</div>
<div class="step-content"><strong>希望順位を明確に</strong><p>複数の園に申し込む場合、どの園に兄を、どの園に弟を希望するかを明確に指定します。</p></div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content"><strong>申込書に記載</strong><p>申込書に「兄弟の同時申込」である旨を明記し、兄弟の氏名・生年月日を記入します。</p></div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content"><strong>戸籍謄本を提出</strong><p>兄弟関係を証明する戸籍謄本を提出します。</p></div>
</div>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>兄弟の同時申込で加点を受けるには、事前に市役所に相談し、申込方法を確認することが大切です。</p>
</div>`,
    publishedAt: "2026-06-26",
    popularity: 70,
  },
  {
    slug: "handa-nursery-worker-bonus",
    citySlug: "handa",
    title: "保育士さんは特別？　半田市の保育士加点について",
    description:
      "半田市の保育園選考で保育士資格を持つ保護者が受ける加点措置について解説します。",
    category: "よくある質問",
    categoryColor: "rose",
    content: `<h2>保育士加点の仕組み</h2>
<p>保育士資格を持ち、市内の保育施設で働いている保護者には、調整指数に+3点の加点があります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>月120時間以上の勤務実績が必須です。パート勤務では加点を受けられない場合があります。</p>
</div>

<h3>加点の対象要件</h3>
<ul>
<li>保育士資格を保有している</li>
<li>半田市内の認可保育施設で勤務している</li>
<li>月120時間以上の勤務実績がある</li>
<li>就労証明書に勤務時間が記載されている</li>
</ul>

<h3>加点が受けられない場合</h3>
<ul>
<li>市外の保育施設での勤務</li>
<li>月120時間未満の勤務</li>
<li>保育以外の職種での勤務</li>
<li>資格を持っていても実際には勤務していない</li>
</ul>

<div class="info-box">
<p><strong>豆知識</strong></p>
<p>保育士は子どもが小さいうちは育児休業を取得することが多いため、加点を活用して早めに入園を確保するのが一般的です。</p>
</div>

<h3>申込時のポイント</h3>
<p>保育士加点を受けるには、勤務先から正確な勤務時間が記載された就労証明書を発行してもらう必要があります。月120時間以上の記載があることを確認してから提出しましょう。</p>`,
    publishedAt: "2026-06-26",
    popularity: 69,
  },
  {
    slug: "handa-documents",
    citySlug: "handa",
    title: "半田市の申込書類　全チェックリスト",
    description:
      "半田市の保育園申込に必要な書類一式を、チェックリスト形式でまとめました。",
    category: "準備・書類",
    categoryColor: "amber",
    content: `<h2>申込時の必須書類</h2>
<p>半田市への保育園申込には、多くの書類が必要です。各書類の有効期限や入手方法を確認しましょう。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>書類不備があると申込が受け付けられない場合があります。提出前に必ずチェックしましょう。</p>
</div>

<h3>基本書類（全員必須）</h3>
<ul>
<li><strong>保育施設入園申込書</strong> - 市役所で配布</li>
<li><strong>世帯全員の住民票謄本</strong> - 発行後3ヶ月以内</li>
<li><strong>保育を必要とする事由を証明する書類</strong>
  <ul>
  <li>就労の場合：就労証明書（会社署名押印）</li>
  <li>自営業の場合：営業許可証のコピー</li>
  <li>求職の場合：特に不要（申請時記入）</li>
  <li>出産の場合：母子手帳コピー</li>
  </ul>
</li>
</ul>

<h3>世帯状況別の追加書類</h3>
<table>
<tr><th>世帯状況</th><th>必要書類</th></tr>
<tr><td>ひとり親世帯</td><td>戸籍謄本（死別・離別・未婚出産を証明）</td></tr>
<tr><td>兄弟同時申込</td><td>兄弟全員の戸籍謄本</td></tr>
<tr><td>障がいあり</td><td>身体障害者手帳・療育手帳・精神障害者保健福祉手帳のコピー</td></tr>
<tr><td>介護が必要</td><td>介護の状況を証明する書類</td></tr>
<tr><td>育休中</td><td>育休中であることを証明する書類</td></tr>
</table>

<div class="step">
<div class="step-num">1</div>
<div class="step-content"><strong>8月中に書類リスト確認</strong><p>半田市役所から配布される「保育施設利用のしおり」で、正確な書類リストを確認します。</p></div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content"><strong>9月に就労証明書依頼</strong><p>勤務先に就労証明書の作成を依頼します。</p></div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content"><strong>10月上旬に提出準備完了</strong><p>全書類を揃えて、提出期限に間に合わせます。</p></div>
</div>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>就労証明書は特定の書式が指定されている場合が多いです。勤務先に市役所の指定様式があるか確認しましょう。</p>
</div>`,
    publishedAt: "2026-06-26",
    popularity: 75,
  },
  {
    slug: "handa-facility-selection",
    citySlug: "handa",
    title: "半田市の保育園選び　失敗しない園選択のコツ",
    description:
      "半田市での保育園選びで重要な確認ポイントと、園見学時にチェックすべき項目をまとめました。",
    category: "施設選び",
    categoryColor: "purple",
    content: `<h2>保育園選びの基本</h2>
<p>希望する保育園の数が定員より多い場合、点数順に選考されます。そのため、第一希望園だけでなく複数の園を第二希望・第三希望に設定することが合格の可能性を高めます。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>複数の園に申し込むことで、入園できる可能性が大幅に上がります。</p>
</div>

<h3>園選びで確認すべき項目</h3>
<div class="step">
<div class="step-num">1</div>
<div class="step-content"><strong>立地・通園時間</strong><p>職場や自宅から近いか、通園路は安全かを確認します。</p></div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-content"><strong>保育方針と特色</strong><p>園のこだわりや特色的な教育活動について確認します。</p></div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-content"><strong>保育時間と延長保育</strong><p>通常保育の時間と延長保育の有無・時間を確認します。</p></div>
</div>
<div class="step">
<div class="step-num">4</div>
<div class="step-content"><strong>給食・栄養管理</strong><p>自園調理か仕出し弁当か、アレルギー対応体制を確認します。</p></div>
</div>
<div class="step">
<div class="step-num">5</div>
<div class="step-content"><strong>衛生・安全管理</strong><p>園舎の清潔さ、防犯体制、健康診断の有無を確認します。</p></div>
</div>

<h3>園見学の準備</h3>
<ul>
<li>事前に電話予約をする</li>
<li>見学時間は15分〜30分程度を予定</li>
<li>園の雰囲気を感じるため、できれば保育中の様子を見学</li>
<li>他の利用者の様子や園の掲示物もチェック</li>
</ul>

<div class="info-box">
<p><strong>豆知識</strong></p>
<p>半田市内には、認可保育園のほか、小規模保育施設や認定こども園もあります。複数の施設形態を検討することで選択肢が増えます。</p>
</div>`,
    publishedAt: "2026-06-26",
    popularity: 72,
  },
  {
    slug: "handa-timing",
    citySlug: "handa",
    title: "半田市への入園時期　4月入園と秋入園のメリット・デメリット",
    description:
      "半田市の保育園入園は4月だけではありません。入園時期ごとのメリットと注意点をまとめました。",
    category: "準備・書類",
    categoryColor: "amber",
    content: `<h2>入園時期の選択肢</h2>
<p>半田市では通常4月入園が基本ですが、欠員が出た場合は随時入園も可能です。ただし、入園時期によってメリット・デメリットが異なります。</p>

<div class="point-box">
<p><strong>ポイント</strong></p>
<p>自分たちの家族状況や仕事復帰のタイミングに合わせて、最適な入園時期を選びましょう。</p>
</div>

<h3>4月入園のメリット・デメリット</h3>
<h4>メリット</h4>
<ul>
<li>入園児童が一番多いため、園の新年度体制が整っている</li>
<li>新しい友達や先生との関係をリセットできる</li>
<li>4月から新年度なので、保育料も新年度基準になる</li>
</ul>

<h4>デメリット</h4>
<ul>
<li>申込数が最も多いため、倍率が高い</li>
<li>前年の秋の時点で申込が必要</li>
<li>育休満了に合わせると、タイミングがぴったりになるとは限らない</li>
</ul>

<h3>秋以降の随時入園のメリット・デメリット</h3>
<h4>メリット</h4>
<ul>
<li>定員に余裕がある場合、入園しやすい</li>
<li>育休満了のタイミングに合わせやすい</li>
<li>園の雰囲気をある程度観察してから入園できる</li>
</ul>

<h4>デメリット</h4>
<ul>
<li>既存の園児同士の関係が出来上がっているため、馴染みづらい可能性</li>
<li>欠員が出るまで待つ必要があり、時期が不確定</li>
<li>年度途中の入園は調整指数に減点される場合がある</li>
</ul>

<div class="warn-box">
<p><strong>注意</strong></p>
<p>年度内転園（同じ年度内に別の園へ移ること）には-5点の減点があります。一度決まった園から転園することを視野に入れるなら、慎重に検討しましょう。</p>
</div>

<h3>最適な時期の判断ポイント</h3>
<ul>
<li><strong>仕事復帰予定月</strong> - 育休満了時期に合わせる</li>
<li><strong>兄弟姉妹の有無</strong> - 既に兄弟が入園中なら同一施設に</li>
<li><strong>家族計画</strong> - 次の出産予定があるか</li>
<li><strong>経済状況</strong> - 保育料の支払い開始時期</li>
</ul>`,
    publishedAt: "2026-06-26",
    popularity: 71,
  },
];

registerArticles(handaArticles);
